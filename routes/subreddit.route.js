//Core Imports
const express = require('express');

//Relative imports
const {
	createSubreddit,
	getAllSubreddit,
	getSubreddit,
	deleteSubreddit,
	updateSubreddit
} = require('../controllers/subreddit.controller');
const postRouter = require('./post.route');

const router = express.Router();

router.use('/:subredditId/posts', postRouter);

router
	.route('/')
	.get(getAllSubreddit)
	.post(createSubreddit);

router
	.route('/:id')
	.get(getSubreddit)
	.patch(updateSubreddit)
	.delete(deleteSubreddit);

module.exports = router;
