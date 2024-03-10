const login = require('../Services/login');
const authServices = require('../Services/login');

async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        const token = await login(email, password);
        return res.status(200).json({ 
            message: "Login successful",
            data: token,
        });
    } catch (error) {
        res.status(401).json({ message: "Invalid credentials" });
    }
}

module.exports = { loginController };