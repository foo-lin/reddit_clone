// Core Imports
const express = require('express');
const morgan = require('morgan');

// Relative Imports
const subredditRouter = require('./routes/subreddit.route');

//App Initialization
const app = express();

//MiddleWares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/v1/subreddit', subredditRouter);

app.get('/', (req, res) => {
	return res.status(200).json({ status: 'success' });
});

module.exports = app;
