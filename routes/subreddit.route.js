//Core Imports
const express = require('express');
const { createSubreddit } = require('../controllers/subreddit.controller');

const router = express.Router();

router
	.route('/')
	.get()
	.post(createSubreddit);

router
	.route('/:id')
	.get()
	.patch()
	.delete();

module.exports = router;
