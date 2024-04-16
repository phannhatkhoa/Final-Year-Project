const express = require("express");
const router = express.Router();
let $ = require("jquery");
const request = require("request");
const moment = require("moment");
const { log } = require("console");
const databaseServices = require("../Services/database.connect");
const { ObjectId } = require("mongodb");
const OrderHistory = require("../Class/orderHistory.class");
const { body } = require("express-validator");

router.post("/create_payment_url", function (req, res, next) {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let config = require("config");

  let tmnCode = config.get("vnp_TmnCode");
  let secretKey = config.get("vnp_HashSecret");
  let vnpUrl = config.get("vnp_Url");
  let returnUrl = config.get("vnp_ReturnUrl");
  let orderId = moment(date).format("DDHHmmss");
  let amount = req.body.amount;
  let bankCode = req.body.bankCode;
  let userId = req.body.user_id;

  // let locale = req.body.language;
  // if (locale === null || locale === '') {
  //     locale = 'vn';
  // }
  let locale = "vn";
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = userId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  res.json(vnpUrl);
});
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

router.get("/vnpay_return", async function (req, res, next) {
  let vnp_Params = req.query;

  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  let config = require("config");
  let tmnCode = config.get("vnp_TmnCode");
  let secretKey = config.get("vnp_HashSecret");

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    const userId = new ObjectId(vnp_Params["vnp_OrderInfo"]);
    const cart = await databaseServices.cartCollection.findOne({
      user_id: userId,
    });
    const existingOrder = await databaseServices.orderHistoryCollection.findOne(
      { user_id: userId }
    );

    if (cart) {
      const orderAmount = vnp_Params["vnp_Amount"] / 100;
      const orderDate = new Date();

      if (existingOrder) {
        // Update existing order history
        const updatedOrder = {
          $set: {
            products: cart.products,
            total_price: orderAmount,
            order_date: orderDate,
          },
        };
        await databaseServices.orderHistoryCollection.updateOne(
          { user_id: userId },
          updatedOrder
        );
      } else {
        // Create new order history
        const newOrderHistory = new OrderHistory(
          userId,
          cart.products,
          orderAmount,
          orderDate
        );
        await databaseServices.orderHistoryCollection.insertOne(
          newOrderHistory
        );
      }

      // Delete the cart
      await databaseServices.cartCollection.deleteOne({ user_id: userId });

      // Redirect to order history page
      res.redirect(
        `http://localhost:3000/orderHistory/getOrderHistoryByUserId/${userId}`
      );
    } else {
      res.json({ message: "Payment failed" });
    }
  }
});
module.exports = router;
