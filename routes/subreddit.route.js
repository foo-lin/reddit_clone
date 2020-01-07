//Core Imports
const express = require('express');
const {
	createSubreddit,
	getAllSubreddit,
	getSubreddit,
	deleteSubreddit,
	updateSubreddit
} = require('../controllers/subreddit.controller');

const router = express.Router();

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
