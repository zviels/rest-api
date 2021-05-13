// Import Modules

const express = require('express');
const morgan = require('morgan');

// Enable Global Error Logging

const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// Create The Express App

const app = express();

// Set Up Morgan For HTTP Request Logging

app.use(morgan('dev'));

// Set Up Root Route

app.get('/', (req, res) => {

  res.json({ message: 'Welcome To The REST API Project!' });

});

// 404

app.use((req, res) => {

  res.status(404).json({ message: 'Route Not Found!' });

});

// Global Error Handler

app.use((error, req, res, next) => {

  if (enableGlobalErrorLogging) 
    console.error('Global Error Handler: ' + JSON.stringify(error.stack));

  res.status(error.status || 500).json({

    message: error.message,
    error: {},

  });

});

// Set Port

const port = process.env.PORT || 5000;

// Start The Server

app.listen(port, () => console.log('Express Server Is Listening On Port ' + port));