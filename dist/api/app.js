require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const { sequelize } = require('../models');

// Basic Configuration
const port = process.env.PORT || 3000;

// register view engine
app.set('view engine', 'ejs');

// adding express static files
app.use(express.static(path.join(__dirname, '../../views/public')));

// Initialize the Express Body Parser
app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: false}));

// Initialize the Cookie Parser
app.use(cookieParser());

// Set Static File
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// authentication verification middleware
app.use(require('../middleware/authVerif'));

// importing router from the backend
app.use(require('./routers'));

// error handler middleware
app.use(require('../middleware/errorHandler'));

// Start the Server Listening
app.listen(port, async() => {
    console.log(`Listening on port ${port}`);

        // initializing the database
    await sequelize.authenticate();
    console.log('database on ');
});
  