const express = require("express");
const signupController = require("../Controllers/signup");
const { loginController } = require("../Controllers/login");

const router = express.Router();

router.post("/register",signupController.createUser);
router.post("/login", loginController)


module.exports = router;