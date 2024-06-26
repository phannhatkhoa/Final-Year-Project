import React, { useEffect, useState } from "react";
import {
  getCartAPI,
  deleteProductInCartAPI,
  updateCartAPI,
} from "../../api/cart.api";

import { useParams } from "react-router-dom";
import { getUserProfileFromLS } from "../../utils/localStorage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

// Utility function to format price in VND currency
const formatPriceVND = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
};

const ShoppingCart = () => {
  const userProfile = getUserProfileFromLS();
  const { user_id } = useParams();
  const { data: cartData, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartAPI(user_id),
  });

  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {

    if (cartData && cartData.cart && cartData.cart.products) {
      setCart(cartData.cart.products);
      updateSubtotal(cartData.cart.products);
    }
    const currentUrl = window.location.href;

    // Check if URL contains "error=true"
    if (currentUrl.includes("error=true")) {
      // If URL contains "error=true", show a toast for payment fail
      setMessage("Payment failed. Please try again!");
      setShowMessage(true);
    }

  }, [cartData]);

  const updateSubtotal = (cartProducts) => {
    const subTotalAmount = cartProducts.reduce(
      (acc, item) => acc + item.product_quantity * item.product_detail?.price,
      0
    );
    setSubtotal(subTotalAmount);
  };

  const handleDeliveryOptionChange = (event) => {
    const selectedDeliveryOption = event.target.value;
    switch (selectedDeliveryOption) {
      case "DPD":
        setShippingFee(45000);
        break;
      case "FedEx":
        setShippingFee(30000);
        break;
      case "USPS":
        setShippingFee(12000);
        break;
      default:
        setShippingFee(0);
        break;
    }
  };


  const totalAmount = subtotal + shippingFee;

  const deleteProduct = async (product_id) => {
    try {
      await deleteProductInCartAPI({
        user_id: userProfile.id,
        product_id: product_id,
      });
      toast.success("Product deleted successfully!");
      await refetch();
    } catch (error) {
      toast.error("Failed to delete product. Please try again!");
      console.error("Error deleting product:", error);
    }
  };

  const updateCart = async (product_id, quantity) => {
    try {
      await updateCartAPI({
        user_id: userProfile.id,
        product_id: product_id,
        product_quantity: quantity,
      });
      await refetch();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleQuantityChange = async (product_id, quantity) => {
    await updateCart(product_id, quantity);
  };

  const handleCheckout = async () => {
    await axios
      .post("http://localhost:5000/payment/create_payment_url/", {
        user_id: userProfile.id,
        amount: totalAmount,
        bankCode: "VNBANK",
      })
      .then((response) => {
        const paymentUrl = response.data;
        window.location.href = paymentUrl;
      })
      .catch((error) => {
        console.error("Error creating payment:", error);
        toast.error("Failed to create payment. Please try again!");
      });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Shopping Cart of {userProfile.full_name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="col-span-3 md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div>
              <div
                key={item.product_id}
                className="border border-gray-200 rounded-md p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product_detail?.image}
                    alt={item.product_detail?.name}
                    className="w-16 h-16 rounded-md shadow-md"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.product_detail?.name}
                    </h3>
                    <p className="text-gray-500">
                      {formatPriceVND(item.product_detail?.price)}
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.product_id,
                        item.product_quantity - 1
                      )
                    }
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-2 py-1 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 bg-gray-100 rounded-md">
                    {item.product_quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.product_id,
                        item.product_quantity + 1
                      )
                    }
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-2 py-1 rounded-r"
                  >
                    +
                  </button>
                  <button
                    onClick={() => deleteProduct(item.product_id)}
                    className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>

              </div>
              <div> {showMessage && (
                <div style={{ color: 'red' }}>{message}</div>
              )}</div>
            </div>
          ))}
        </div>
        <div className="col-span-3 md:col-span-1 space-y-4">
          <div className="border rounded-md p-4 bg-gray-100">
            <h2 className="text-lg font-semibold mb-4">Shipping</h2>
            <div className="mb-4">
              <label
                htmlFor="deliveryOption"
                className="block text-sm font-medium text-gray-700"
              >
                Select Delivery Option:
              </label>
              <select
                id="deliveryOption"
                name="deliveryOption"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-gray-500 focus:border-gray-500"
                onChange={handleDeliveryOptionChange}
              >
                <option value="DPD">
                  DPD Delivery - {formatPriceVND(45000)} (Delivery within 24 Hours)
                </option>
                <option value="FedEx">
                  FedEx Express - {formatPriceVND(30000)} (Delivery within 48 Hours)
                </option>
                <option value="USPS">
                  USPS Standard - {formatPriceVND(12000)} (Delivery within 5-7 Business Days)
                </option>
              </select>
            </div>
          </div>
          <div className="border rounded-md p-4 bg-gray-100 mb-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-semibold">
                {formatPriceVND(subtotal)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Shipping Fee:</span>
              <span className="font-semibold">
                {formatPriceVND(shippingFee)}
              </span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
              <span className="font-semibold text-lg">Total:</span>
              <span className="font-semibold text-lg">
                {formatPriceVND(totalAmount)}
              </span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md w-full mb-4"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
