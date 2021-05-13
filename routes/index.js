const express = require('express');

const authenticateUser = require('../functions/auth-user');
const handleAsyncOperation = require('../functions/handle-async-operation');

// Variables

const router = express.Router();

// Routes

// GET Users Route

router.get('/users', authenticateUser, handleAsyncOperation (async (req, res, next) => {

    const user = req.currentUser;

    res.status(200).json({

        emailAddress: user.emailAddress,
        password: user.password

    });
    
}));

// Export Router

module.exports = router;