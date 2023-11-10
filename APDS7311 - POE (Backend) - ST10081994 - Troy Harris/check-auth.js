const jwt = require('jsonwebtoken');

// Middleware function for JWT verification
module.exports = (req, res, next) => {
    try {
        // Extracting the JWT from the Authorization header
        const token = req.headers.authorization.split(" ")[1];
        
        // Verifying the JWT using the secret key
        const decoded = jwt.verify(token, "secret_this_should_be_longer_than_it_is");

        // Adding the decoded user data to the request object
        req.userData = decoded;

        // Passing control to the next middleware or route handler
        next();
    } catch (error) {
        // Handling invalid or expired tokens
        res.status(401).json({
            message: "Invalid token"
        });
    }
};
