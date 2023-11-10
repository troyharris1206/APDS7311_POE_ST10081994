const mongoose = require('mongoose');
const Joi = require('joi');

//Creating the schema for users
const userSchema = new mongoose.Schema(
    {
        username: String,
        firstName: String,
        lastName: String,
        password: String
    }
);

//Used to export the schema
module.exports = mongoose.model('User', userSchema);