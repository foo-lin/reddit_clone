// Core Imports
const express = require('express');
const morgan = require('morgan');

// Relative Imports
const subredditRouter = require('./routes/subreddit.route');
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');
const globalErrorController = require('./controllers/errorController');

//App Initialization
const app = express();

//MiddleWares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/v1/subreddit', subredditRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/comment', commentRouter);

app.use(globalErrorController);

module.exports = app;
