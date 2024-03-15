const express = require("express");
const {signupController, signinController} = require("../Controllers/auth.controller");
const { signupMiddleware, signinMiddleware } = require("../Middlewares/auth.middlewares");


const router = express.Router();

// Register user route
// Path: /user/signup
// Method: POST
// Access: Public
// Request: { email, password, name, date_of_birth, gender}
// Response: { message: "User created successfully"}
router.post("/signup", signupMiddleware, signupController)

// Sign-in route
// Path: /user/signin
// Method: POST
// Access: Public
// Request: { email, password }
// Response: { message: "Sign-in successful", token: "your_authentication_token" }
router.post("/signin", signinMiddleware, signinController);

// Get user profile id
// Path: /user/profile
// Method: GET
// Access: Private
// Request: { token }
// Response: { message: "User profile", user: { name, email}
router.get("/profile", (req, res) => {
    res.json({ message: "User profile", user: req.user });
});


module.exports = router;