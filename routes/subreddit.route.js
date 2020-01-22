//Core Imports
const express = require('express');

//Relative imports
const {
	createSubreddit,
	getAllSubreddit,
	getSubreddit,
	deleteSubreddit,
	updateSubreddit,
	getSubredditBySlug
} = require('../controllers/subreddit.controller');
const { isLoggedIn } = require('../controllers/auth.controller');
const postRouter = require('./post.route');
const subredditUserRouter = require('./subredditUser.route');

const router = express.Router();

router.use('/:subredditId/posts', postRouter);
router.use('/:subredditId/subscribe', subredditUserRouter);

router
	.route('/')
	.get(isLoggedIn, getAllSubreddit)
	.post(createSubreddit);

router.route('/:subredditSlug/slug').get(isLoggedIn, getSubredditBySlug);

router
	.route('/:id')
	.get(getSubreddit)
	.patch(updateSubreddit)
	.delete(deleteSubreddit);

module.exports = router;
