// Core Imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Relative Imports
const subredditRouter = require('./routes/subreddit.route');
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');
const voteCommentUserRouter = require('./routes/votesCommentuser.route');
const subredditUserRouter = require('./routes/subredditUser.route');
const votePostUserRouter = require('./routes/votesPostUser.route');
const globalErrorController = require('./controllers/errorController');

//App Initialization
const app = express();

//MiddleWares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/v1/subreddit', subredditRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/comment', commentRouter);
app.use('/api/v1/votes', voteCommentUserRouter);
app.use('/api/v1/subscribe', subredditUserRouter);
app.use('/api/v1/votePost', votePostUserRouter);
app.use(globalErrorController);

module.exports = app;
