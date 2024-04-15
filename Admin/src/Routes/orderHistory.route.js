const express = require("express");
const { createOrderHistory, getOrderHistoryByUserId } = require("../Controllers/orderHistory.controller");
const router = express.Router();

// createOrderHistory
// path: /orderHistory/create
// method: POST
// access: Private
// Request: { user_id, product_id, quantity, total_price, status, order_date, delivery_date }
// Response: { message: 'Order history created successfully', orderHistory }
router.post("/create", createOrderHistory);

// getOrderHistoryByUserId
// path: /orderHistory/getOrderHistoryByUserId/:userId
// method: GET
// access: Private
// Request: { userId }
// Response: { message: 'Order history retrieved successfully', orderHistory }
router.get("/getOrderHistoryByUserId/:user_id", getOrderHistoryByUserId);

module.exports = router;