const jwt = require('jsonwebtoken');
const { screctKey } = require('../Configuration/jwtConfig');

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, screctKey, { expiresIn: '1h' });
};
module.exports = { generateToken };