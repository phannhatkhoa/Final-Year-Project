const validate = require("../Utils/validation");

const paymentMiddleware = validate(checkSchema({
    user_id: {
        isMongoId: true,
        errorMessage: 'Invalid user_id',
    },
    cart_id: {
        isMongoId: true,
        errorMessage: 'Invalid cart_id',
    },
    payment_method: {
        isString: true,
        errorMessage: 'Invalid payment_method',
    },
    total_price: {
        isNumeric: true,
        errorMessage: 'Invalid total_price',
    },
    payment_status: {
        isString: true,
        errorMessage: 'Invalid payment_status',
    },
    payment_date: {
        isDate: true,
        errorMessage: 'Invalid payment_date',
    },
}));
module.exports = paymentMiddleware;