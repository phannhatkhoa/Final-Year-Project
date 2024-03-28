const Payment = require("../Class/payment.class");
const databaseServices = require("./database.connect");

class PaymentService {
    async createPayment( body) {
        try {
            const { user_id, cart_id, total_price, payment_method, payment_status, payment_date } = body;
            const newPayment = new Payment(user_id, cart_id, total_price, payment_method, payment_status, payment_date);
            // Insert the new payment into the database
            await databaseServices.paymentCollection.insertOne(newPayment);
            console.log(newPayment);
            return newPayment;
        } catch (error) {
            console.error('Error during payment creation:', error.message);
            return null;
        }
    }
}

const paymentService = new PaymentService();
module.exports = paymentService;