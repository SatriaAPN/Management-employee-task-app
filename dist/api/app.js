require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { sequelize } = require('../models');

// Basic Configuration
const port = process.env.PORT || 3000;

// Import the Router
app.use(require('./routers'));

// Set Static File
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Initialize the Database
require('../config/database');

// Start the Server Listening
app.listen(port, async() => {
    console.log(`Listening on port ${port}`);

        // initializing the database
    await sequelize.authenticate();
    console.log('database on');
});
  