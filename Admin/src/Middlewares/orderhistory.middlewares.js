const { checkSchema } = require("express-validator");
const validate = require("../Utils/validation");

const createOrderHistoryMiddleware = validate(checkSchema({
    user_id: {
        in: ['body'],
        isString: { errorMessage: 'User ID must be a string.' }
    },
    product_id: {
        in: ['body'],
        isString: { errorMessage: 'Product ID must be a string.' }
    },
    quantity: {
        in: ['body'],
        isInt: {
            options: { min: 0 },
            errorMessage: 'Quantity must be a non-negative integer.'
        }
    },
    total_price: {
        in: ['body'],
        isFloat: {
            options: { min: 0 },
            errorMessage: 'Total price must be a positive number.'
        }
    },
    order_date: {
        in: ['body'],
        isISO8601: {
            errorMessage: 'Invalid date format (ISO 8601 expected).'
        }
    }
}));

module.exports = createOrderHistoryMiddleware;