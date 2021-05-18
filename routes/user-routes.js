const express = require('express');

const { User } = require('../models');
const authenticateUser = require('../functions/auth-user');
const handleAsyncOperation = require('../functions/handle-async-operation');

// Variables

const router = express.Router();

// User Routes

// GET Users Route

router.get('/', authenticateUser, handleAsyncOperation (async (req, res, next) => {

    // Extract Authenticated User Data

    const user = req.currentUser;

    // Set Status Code To '200' & Send User Data Back
    
    res.status(200).json({

        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress

    });
    
}));

// POST Users Route

router.post('/', handleAsyncOperation (async (req, res, next) => {
    
    // Extract New User Data

    const newUser = req.body;

    // Create The New User

    await User.create(newUser);

    // Set Status Code To '201', Redirect User Back To The Root Route & Return No Content 

    res.status(201).location('/').end();

}));

// Export User Routes

module.exports = router;