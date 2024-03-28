const { checkSchema } = require("express-validator");
const validate = require("../Utils/validation");

const cartMiddlewares = validate(checkSchema({ 
    product_id: {
        in: ['body'],
        isString: true,
        errorMessage: 'product_id is required'
    },
    product_name: {
        in: ['body'],
        isString: true,
        errorMessage: 'product_name is required'
    },
    product_price: {
        in: ['body'],
        isNumeric: true,
        errorMessage: 'product_price is required'
    },
    product_quantity: {
        in: ['body'],
        isInt: {
            options: { min: 1 },
            errorMessage: 'product_quantity must be at least 1'
        },
        errorMessage: 'product_quantity is required'
    },
    product_image: {
        in: ['body'],
        isString: true,
        errorMessage: 'product_image is required'
    },
    product_total_price: {
        in: ['body'],
        isNumeric: true,
        errorMessage: 'product_total_price is required'
    },
    user_id: {
        in: ['params'],
        isString: true,
        errorMessage: 'user_id is required'
    }
}));

module.exports = cartMiddlewares;