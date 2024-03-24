const { checkSchema } = require('express-validator');
const validate = require('../Utils/validation');

const productCreateMiddleware = validate(checkSchema({
    name: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'Name is required and must be a string.'
    },
    price: {
        in: ['body'],
        isFloat: {
            options: { min: 0 },
            errorMessage: 'Price must be a positive number.'
        },
        notEmpty: true,
        errorMessage: 'Price is required.'
    },
    description: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'Description is required and must be a string.'
    },
    category: {
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
        isString: true,
        notEmpty: true,
        errorMessage: 'Image URL is required and must be a string.'
    },
    current_quantity: {
        in: ['body'],
        isInt: {
            options: { min: 0 },
            errorMessage: 'Current quantity must be a non-negative integer.'
        },
        notEmpty: true,
        errorMessage: 'Current quantity is required.'
    }
}));


const productUpdateMiddleware = validate(checkSchema( {
    name: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'Name is required and must be a string.'
    },
    price: {
        in: ['body'],
        isFloat: {
            options: { min: 0 },
            errorMessage: 'Price must be a positive number.'
        },
        notEmpty: true,
        errorMessage: 'Price is required.'
    },
    description: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'Description is required and must be a string.'
    },
    category: {
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
        isString: true,
        notEmpty: true,
        errorMessage: 'Image URL is required and must be a string.'
    },
    current_quantity: {
        in: ['body'],
        isInt: {
            options: { min: 0 },
            errorMessage: 'Current quantity must be a non-negative integer.'
        },
        notEmpty: true,
        errorMessage: 'Current quantity is required.'
    },
    quantity_sold: {
        in: ['body'],
        isInt: {
            options: { min: 0 },
            errorMessage: 'Quantity sold must be a non-negative integer.'
        },
        notEmpty: true,
        errorMessage: 'Quantity sold is required.'
    }
}));

module.exports = { productCreateMiddleware,productUpdateMiddleware};
