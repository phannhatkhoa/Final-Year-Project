const validate = require("../Utils/validation");

const paymentMiddleware = validate(checkSchema({
    payment_method: {
        in: ['body'],
        isString: { errorMessage: 'Payment method must be a string.' }
    },
    payment_status: {
        in: ['body'],
        isString: { errorMessage: 'Payment status must be a string.' }
    },
    total_price: {
        in: ['body'],
        isFloat: {
            options: { min: 0 },
            errorMessage: 'Total price must be a positive number.'
        }
    },
    user_id: {
        in: ['body'],
        isString: { errorMessage: 'User ID must be a string.' }
    },
    products: {
        in: ['body'],
        isArray: true,
        errorMessage: 'Products must be an array.'
    }
}));
module.exports = paymentMiddleware;