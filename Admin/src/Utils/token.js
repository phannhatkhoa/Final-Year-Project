const jwt = require('jsonwebtoken');
const { secretKey } = require('./jwtUtils');

class TokenManager {
    constructor() {
        this.secretKey = secretKey;
    }

    generateTokens(user) {
        console.log('user', user);
        const accessTokenPayload = {
            id: user._id,
            email: user.email,
            full_name: user.full_name,
            role: user.role,
            expiresIn: '15m' // Thời gian hết hạn của Access Token
        };
        const accessToken = jwt.sign(accessTokenPayload, this.secretKey, { expiresIn: '15m' });

        // Tạo Refresh Token
        const refreshTokenPayload = {
            id: user._id,
            expiresIn: '7d' // Thời gian hết hạn của Refresh Token
        };
        const refreshToken = jwt.sign(refreshTokenPayload, this.secretKey, { expiresIn: '7d' });

        return { accessToken, refreshToken };
    }

     decryptAccessToken(accessToken) {
        try {
            const decoded = jwt.verify(accessToken, this.secretKey);
            return decoded;
        } catch (error) {
            // Handle invalid or expired token
            console.error('Error decoding access token:', error.message);
            return null;
        }
    }
}

const tokenManager = new TokenManager();
module.exports = tokenManager;