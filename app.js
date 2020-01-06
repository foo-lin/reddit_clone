// Core Imports
const express = require('express');
const morgan = require('morgan');

//App Initialization
const app = express();

//MiddleWares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes

app.get('/', (req, res) => {
	return res.status(200).json({ status: 'success' });
});

module.exports = app;
