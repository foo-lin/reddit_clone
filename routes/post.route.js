//Core Import
const express = require('express');

//Relative import
const {
	getAllPost,
	createPost,
	getPost,
	setPopulateOption,
	setSubredditUserid
} = require('../controllers/post.controller');
const {
	protect,
	restrictTo,
	isLoggedIn
} = require('../controllers/auth.controller');
const commentRouter = require('../routes/comment.route');
const votesPostUserRoute = require('../routes/votesPostUser.route');

const router = express.Router({ mergeParams: true });

router.use('/:postId/comment', commentRouter);
router.use('/:postId/vote', votesPostUserRoute);
router
	.route('/')
	.get(isLoggedIn, setPopulateOption, getAllPost)
	.post(protect, restrictTo('user'), setSubredditUserid, createPost);

router.route('/:id').get(isLoggedIn, setPopulateOption, getPost);

module.exports = router;
