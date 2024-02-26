const { body, checkSchema } = require('express-validator');
const validate = require('../Utils/Validation');

// Define the validation schema for the login route
const loginValidation = validate(checkSchema({
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
    }
}));

module.exports = { loginValidation };
