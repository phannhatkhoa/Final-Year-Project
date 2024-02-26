const { body, checkSchema } = require('express-validator');
const validate = require('../Utils/Validation');

// Define the validation schema for the registration route
const registerValidation = validate(checkSchema({
    username: {
        in: 'body',
        notEmpty: {
            errorMessage: 'Username cannot be empty'
        },
        trim: true
    },
    email: {
        in: 'body',
        isEmail: {
            errorMessage: 'Invalid email format'
        },
        notEmpty: {
            errorMessage: 'Email cannot be empty'
        },
        normalizeEmail: true,
        trim: true
    },
    password: {
        in: 'body',
        notEmpty: {
            errorMessage: 'Password cannot be empty'
        },
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password must be at least 8 characters long'
        },
    },
    re_pass: {
        in: 'body',
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password confirmation does not match password');
                }
                return true;
            }
        },
        errorMessage: 'Password confirmation does not match password'
    }
}));

module.exports = { registerValidation };
