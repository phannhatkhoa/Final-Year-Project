const express = require('express');
const loginController = require('../Controllers/loginController');
const { loginValidation } = require('../Middlewares/loginMiddleware');
const loginRouter = express.Router();

loginRouter.post('/login',loginValidation ,loginController);

module.exports = loginRouter;