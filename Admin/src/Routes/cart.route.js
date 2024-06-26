const express = require("express");
const { addToCartController, getCartController, deleteCartController, updateCartController, deleteProductInCartController } = require("../Controllers/cart.controller");
const { route } = require("./auth.route");
const { addToCartMiddlewares, deleteProductInCartMiddlewares, updateCartMiddlewares } = require("../Middlewares/cart.middlewares");
const router = express.Router();

// add to cart
// path: cart/addToCart
// method: POST
// access: Private
// Request: { product_id, quantity }
// Response: { message: "Product added to cart", cart: { user_id, products: [{ product_id, quantity }] } }
router.post("/addToCart", addToCartMiddlewares, addToCartController);

// get cart
// path: cart/getCart
// method: GET
// access: Private
// Request: { user_id }
// Response: { message: "Cart", cart: { user_id, products: [{ product_id, quantity }] } }
router.get("/getCart/:user_id", getCartController);

// delete cart
// path: cart/deleteCart
// method: DELETE
// access: Private
// Request: { cart_id }
// Response: { message: "Cart deleted", cart: { user_id, products: [{ product_id, quantity }] } }
router.delete("/deleteCart/:id", deleteCartController);

// update cart
// path: cart/updateCart
// method: PUT
// access: Private
// Request: { user_id, products: [{ product_id, quantity }] }
// Response: { message: "Cart updated", cart: { user_id, products: [{ product_id, quantity }] } }
router.put("/updateCart", updateCartMiddlewares, updateCartController);

router.delete("/deleteProductInCart", deleteProductInCartMiddlewares, deleteProductInCartController);

module.exports = router;