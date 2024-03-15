const bcrypt = require("bcrypt");
const { generateToken } = require("../Configuration/jwtConfig");

async function login(email, password) {
    try {
        const existingUser = await User.findOne({
            email: email,
        });
        if (!existingUser) {
            throw new Error("Invalid email or password");
        }
        const isPasswordValid = await generateToken(existingUser)
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }
        const generateTokens = await generateToken(existingUser._id);
        console.log("Token generated:", generateTokens);
        return generateToken;
    } catch (error) {
        console.error("Error during login:", error.message);
        throw new Error("Invalid email or password");
    }
}

module.exports = login;
