const express = require('express');
const app = express();
const urlprefix = '/api';
const mongoose = require('mongoose');
const User = require('./models/user');
const Message = require('./models/message');
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');
const options = { server: { sslCA: cert } };
//MongoDB connection string
const connString = 'mongodb+srv://ST10081994:Admin1206@cluster0.ooeaazr.mongodb.net/';

// Importing route handlers
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');

// Connecting to MongoDB
mongoose.connect(connString)
  .then(() => {
    console.log('Connected :-)');   
  })
  .catch((err) => {
    console.log('Not Connected :-(', err);
  }, options);

// Middleware to parse JSON requests
app.use(express.json());

// Cross-Origin Resource Sharing (CORS) middleware
const cors = require('cors');
app.use(cors());

// Basic route to test server functionality
app.get(urlprefix + '/', (req, res) => {
    res.send('Hello World');
});

// Routing for user-related API endpoints
app.use(urlprefix + '/user', userRoutes);

// Routing for message-related API endpoints
app.use(urlprefix + '/message', messageRoutes);

module.exports = app;
