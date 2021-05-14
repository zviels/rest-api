// Import Modules

const express = require('express');
const morgan = require('morgan');

const { sequelize } = require('./models');
const apiRoutes = require('./routes');

// Create The Express App

const app = express();

// Enable JSON Parsing

app.use(express.json());

// Set Up Morgan For HTTP Request Logging

app.use(morgan('dev'));

// Set Up Root Route

app.get('/', (req, res) => {

    res.json({ message: 'Welcome To The REST API Project!' });

});

// Set Up API Routes

app.use('/api', apiRoutes);

// 404

app.use((req, res) => {

  res.status(404).json({ message: 'Route Not Found!' });

});

// Global Error Handler

app.use((error, req, res, next) => {

  const { name } = error;
  const { errors } = error;
  
  if (name === 'SequelizeValidationError' || name === 'SequelizeUniqueConstraintError') {

    const errorMessages = errors.map(error => error.message);
    return res.status(400).json(errorMessages);

  }
  
  // if (enableGlobalErrorLogging) 
  //   console.error('Global Error Handler: ' + JSON.stringify(error.stack));

  res.status(error.status || 500).json({

    message: error.message,
    error: {},

  });

});

// Set Port

const port = process.env.PORT || 5000;

// Start The Server

app.listen(port, () => console.log('Express Server Is Listening On Port ' + port + '..'));