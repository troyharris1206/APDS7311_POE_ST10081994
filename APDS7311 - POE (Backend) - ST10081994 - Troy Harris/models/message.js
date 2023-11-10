const mongoose = require('mongoose');
const Joi = require('joi');

//Creating the schema for the messages
const messageSchema = new mongoose.Schema(
    {
        title: String,
        body: String,
        dateTime: String,
        importance: String,
        username: String
    }
);

//Used to export the message schema
module.exports = mongoose.model('Message', messageSchema);