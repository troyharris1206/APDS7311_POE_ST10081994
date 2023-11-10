const bcrypt = require('bcrypt');

// Asynchronous function to hash a password
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

// Asynchronous function to check if a password is valid
async function isValidPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// Export the functions for use in other modules
module.exports = { hashPassword, isValidPassword };
