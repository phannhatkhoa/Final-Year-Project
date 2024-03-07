const express = require('express');
const { register } = require('../Controllers/authController');

const router = express.Router();

router1.post('/register', register);

module.exports = router;
