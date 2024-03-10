const jwt = require('jsonwebtoken');

function generateToken(user_id) {
    const secretKey = 'khoa111'; // Replace with your actual secret key
    const expiresIn = '7d'; // Set the expiration time as needed

    const payload = {
        user_id: user_id
        // Add any other information you want to include in the payload
    };

    const token = jwt.sign(payload, secretKey, { expiresIn });

    return token;
}

module.exports = { generateToken };
