const paymentService = require("../Services/payment.services");

const paymentController = async (req, res) => {
    const insertedData = await paymentService.createPayment(req.body);
    if (insertedData) {
        return res.status(201).json({ data: { message: 'Payment created successfully', payment: insertedData } });
    } else {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = paymentController;
