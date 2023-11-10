const express = require('express');
const expressBrute = require('express-brute');
const store = new expressBrute.MemoryStore(); 
const bruteforce = new expressBrute(store);
const helmet = require('helmet');
const morgan = require('morgan');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../check-auth');

// Using helmet middleware to secure the Express app
router.use(helmet());

// Using morgan middleware for logging
router.use(morgan('combined'));

// POST API method to create a new user
router.post('/signup', (req, res) => {
    // Hash the user's password
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        // Create a new User instance
        const user = new User({
          username: req.body.username,
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          password: hash,
        });
  
        // Save the user to the database
        user.save()
          .then(result => {
            // Respond with a success message and the user data
            res.status(201).json({
              message: 'User created',
              result: result,
            });
          })
          .catch(err => {
            // Handle database save error
            res.status(500).json({
              error: err,
            });
          });
      });
  });

// POST API method used to verify a user's login credentials
router.post('/login', bruteforce.prevent, async (req, res) => {
    try {
      // Find the user in the database based on the provided username
      const user = await User.findOne({ username: req.body.username });
  
      // If the user is not found, return Authentication Failure
      if (!user) {
        return res.status(401).json({
          message: 'Authentication Failure',
        });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const valid = await bcrypt.compare(req.body.password, user.password);
  
      // If the password is not valid, return Authentication Failure
      if (!valid) {
        return res.status(401).json({
          message: 'Authentication Failure',
        });
      }
  
      // Generate a JWT token for the authenticated user
      const token = jwt.sign({
        username: user.username,
        userid: user._id,
      }, 'secret_this_should_be_longer_than_it_is', { expiresIn: '1h' });
  
      // Return the token as a response for successful authentication
      res.status(200).json({ token: token });
    } catch (error) {
      // Handle any errors during user lookup or password comparison
      console.error('Error during login:', error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  });
  


module.exports = router;
