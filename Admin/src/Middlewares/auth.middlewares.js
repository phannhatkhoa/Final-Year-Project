const { checkSchema } = require("express-validator");
const validate = require("../Utils/validation");
const databaseServices = require("../Services/database.connect");
const passwordHash = require('password-hash');
const { ObjectId } = require("mongodb");

const signupMiddleware = validate(checkSchema({
  email: {
    isEmail: true,
    normalizeEmail: true,
    errorMessage: 'Invalid email address',
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long',
    },
    isStrongPassword:{
      errorMessage: 'Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character',
      negated: {
      }
    }
  },
  confirm_password: {
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      },
      errorMessage: 'Passwords do not match',
    },
  },
  full_name: {
    notEmpty: true,
    isLength: {
      options: { min: 1 },
      errorMessage: 'Full name is required',
    },
  },
  date_of_birth: {
    isISO8601: {
      errorMessage: 'Invalid date format (ISO 8601 expected)',
    },
    notEmpty: true,
  },
  location: {
    notEmpty: {
      errorMessage: 'Location is required',
    },
    isLength: {
      options: { min: 1, max: 60 },
      errorMessage: 'Location must be at most 60 characters long',
    },
  },
  gender: {
    isIn: {
      options: [['male', 'female', 'other']],
      errorMessage: 'Invalid gender value',
    },
    notEmpty: {
      errorMessage: 'Gender is required',
    }
  },
}));

const signinMiddleware = validate(checkSchema({
  email: {
    isEmail: true,
    normalizeEmail: true,
    custom: {
      options: async (value) => {
        const user = await databaseServices.userCollection.findOne({ email: value });
        if (!user) {
          throw new Error('Email does not exist');
        }
        return true;
      },
    },
    errorMessage: 'Invalid email address',
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long',
    },
    custom: {
      options: async (value, { req }) => {
        const user = await databaseServices.userCollection.findOne({ email: req.body.email });
        if (!user) {
          throw new Error('Email does not exist');
        }

        const isPasswordValid = passwordHash.verify(value, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }
        return true;
      },
      errorMessage: 'Invalid password',
    }
  },
}));

const profileMiddleware = validate(checkSchema({
  id:{
    in: ['body'],
    notEmpty: true,
    isLength: {
      options: { min: 1 },
      errorMessage: 'Id is required',
    },
    isMongoId: {
      errorMessage: 'Invalid id'
    },
    custom: {
      options: async (value) => {
        const user = await databaseServices.userCollection.findOne({ _id: new ObjectId(value) });
        if (!user) {
          throw new Error('User not found');
        }
        return true;
      },
      errorMessage: 'User not found'
    },
  }
}));



module.exports = {
  signupMiddleware,
  signinMiddleware,
  profileMiddleware
};
