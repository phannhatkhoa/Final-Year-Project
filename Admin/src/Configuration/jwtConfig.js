const crypto = require('crypto');

// Generate a random secret key
const screctKey = crypto.randomBytes(32).toString('hex');
module.exports = {
    screctKey: screctKey
};