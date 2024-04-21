const { checkSchema } = require('express-validator');
const validate = require('../Utils/validation');

const productCreateMiddleware = validate(checkSchema({
    name: {
        in: ['body'],
        isString: { errorMessage: 'Name must be a string.' }
    },
    price: {
        in: ['body'],
        isFloat: {
            options: { min: 0 },
            errorMessage: 'Price must be a positive number.'
        }
    },
    description: {
        in: ['body'],
        isString: { errorMessage: 'Description must be a string.' }
    },
    category_id: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'Category is required and must be a string.'
    },
    usage_status: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'Usage status is required and must be a string.'
    },
    image: {
        in: ['body'],
        isString: { errorMessage: 'Image URL must be a string.' }
    },
    current_quantity: {
        in: ['body'],
        isInt: {
            options: { min: 0 },
            errorMessage: 'Current quantity must be a non-negative integer.'
        }
    },
    quantity_sold: {
        in: ['body'],
        isInt: {
            options: { min: 0 },
            errorMessage: 'Quantity sold must be a non-negative integer.'
        }
    },
    brand_id: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'Brand is required and must be a string.'
    }
}));

const productUpdateMiddleware = validate(checkSchema({
    name: {
        in: ['body'],
        isString: { errorMessage: 'Name must be a string.' },
        optional: true
    },
    price: {
        in: ['body'],
        isFloat: {
            options: { min: 0 },
            errorMessage: 'Price must be a positive number.'
        },
        optional: true
    },
    usage_status: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'Usage status is required and must be a string.'
    },
    current_quantity: {
        in: ['body'],
        isInt: {
            options: { min: 0 },
            errorMessage: 'Current quantity must be a non-negative integer.'
        },
        optional: true
    },
    quantity_sold: {
        in: ['body'],
        isInt: {
            options: { min: 0 },
            errorMessage: 'Quantity sold must be a non-negative integer.'
        },
        optional: true
    }
}));

const deleteProductMiddleware = validate(checkSchema({
    id: {
        in: ['params'],
        isString: { errorMessage: 'Product ID must be a string.' }
    }
}));


module.exports = { productCreateMiddleware, productUpdateMiddleware, deleteProductMiddleware };
