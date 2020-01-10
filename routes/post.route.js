//Core Import
const express = require('express');

//Relative import
const {
	getAllPost,
	createPost,

	setSubredditUserid
} = require('../controllers/post.controller');
const { protect, restrictTo } = require('../controllers/auth.controller');
const commentRouter = require('../routes/comment.route');

const router = express.Router({ mergeParams: true });

router.use('/:postId/comment', commentRouter);

router
	.route('/')
	.get(getAllPost)
	.post(protect, restrictTo('user'), setSubredditUserid, createPost);

module.exports = router;
