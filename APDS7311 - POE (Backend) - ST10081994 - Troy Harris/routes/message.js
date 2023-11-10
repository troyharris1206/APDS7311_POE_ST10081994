const express = require('express')
const router = express.Router();
const Message = require('../models/message')
const checkAuth = require('../check-auth')

//POST API method that posts the message entered by the user 
router.post('', checkAuth, (req, res) => {
    // Parse the dateTime string into a Date object
    const dateTime = new Date(req.body.dateTime);

    // Adding the message info added by the user to a message object
    const message = new Message({
        title: req.body.title,
        body: req.body.body,
        dateTime: dateTime, // Use the parsed Date object
        importance: req.body.importance,
        username: req.body.username
    });

    // Saves the message
    message.save()
        .then(result => {
            res.status(201).json({
                message: 'Message created',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


//GET API method to fetch all the messages posted by users
router.get('', checkAuth, (req, res) => {
    Message.find()
        .then(messages => {
            res.status(200).json({
                messages: messages
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

//DELETE API method used to delete a specific message 
router.delete('/:messageId', checkAuth, (req, res) => {
    //_id of the message 
    const messageId = req.params.messageId;

    //Deleting the instance of the message with the _id received
    Message.deleteOne({_id: req.params.messageId})
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: 'Message deleted'
                });
            } else {
                res.status(404).json({
                    message: 'Message not found'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
