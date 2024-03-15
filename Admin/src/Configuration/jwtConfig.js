const jwt = require('jsonwebtoken');

function generateToken(user_id) {
    const secretKey = 'khoa111';
    const expiresIn = '7d'; // Set the expiration time as needed

    const payload = {
        user_id: user_id
    };

    const token = jwt.sign(payload, secretKey, { expiresIn });

    return token;
}

module.exports = { generateToken };
