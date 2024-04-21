const express = require("express");
const { signupController, signinController, profileController, updateProfileController } = require("../Controllers/auth.controller");
const { signupMiddleware, signinMiddleware, updateProfileMiddleware } = require("../Middlewares/auth.middlewares");


const router = express.Router();

// Register user route
// Path: /user/signup
// Method: POST
// Access: Public
// Request: { email, password, name, date_of_birth, phone_number, location}
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
router.get("/profile/:id", profileController);

// Update user profile
// Path: /user/profile/:id
// Method: PUT
// Access: Private
// Request: { updatedData }
// Response: { message: "Profile updated successfully" }
router.put("/profile/:id", updateProfileMiddleware, updateProfileController);

module.exports = router;