const express = require("express");
const paymentController = require("../Controllers/payment.controller");
const router = express.Router();


// create payement route
// path: 'cart/payment'
// method: POST
// access: Private
// Request: { user_id, cart_id, payment_method, total_price, payment_status, payment_date }
// Response: { message: 'Payment created', newPayment }
router.post('/payment', paymentController);

module.exports = router;
