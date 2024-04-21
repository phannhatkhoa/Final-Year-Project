const { checkSchema } = require("express-validator");
const validate = require("../Utils/validation");

const addToCartMiddlewares = validate(checkSchema({
    user_id: {
        in: ['body'],
        isString: { errorMessage: 'User ID must be a string.' }
    },
    product_id: {
        in: ['body'],
        isString: { errorMessage: 'Product ID must be a string.' }
    },
    product_quantity: {
        in: ['body'],
        isInt: {
            options: { min: 1 },
            errorMessage: 'Quantity must be a non-negative integer.'
        }
    }
}));

const deleteProductInCartMiddlewares = validate(checkSchema({
    user_id: {
        in: ['body'],
        isString: { errorMessage: 'User ID must be a string.' }
    },
    product_id: {
        in: ['body'],
        isString: { errorMessage: 'Product ID must be a string.' }
    }
}));

const updateCartMiddlewares = validate(checkSchema({
    user_id: {
        in: ['body'],
        isString: { errorMessage: 'User ID must be a string.' }
    },
    product_id: {
        in: ['body'],
        isString: { errorMessage: 'Product ID must be a string.' }
    },
    product_quantity: {
        in: ['body'],
        isInt: {
            options: { min: 1 },
            errorMessage: 'Quantity must be a non-negative integer.'
        }
    }
}));
module.exports = {
    addToCartMiddlewares,
    deleteProductInCartMiddlewares,
    updateCartMiddlewares
}