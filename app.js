// Core Imports
const express = require('express');
const morgan = require('morgan');

// Relative Imports
const subredditRouter = require('./routes/subreddit.route');
const globalErrorController = require('./controllers/errorController');

//App Initialization
const app = express();

//MiddleWares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/v1/subreddit', subredditRouter);

app.use(globalErrorController);

module.exports = app;
