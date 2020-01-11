//core import
const express = require('express');

//relative import
const {
	getAllSubredditUsers,
	createSubredditUser,
	deleteSubredditUser,
	findSubscriptions,
	isSubscriped,
	isUnsubscriped,
	setSubredditUser
} = require('../controllers/subredditUser.controller');
const { protect } = require('../controllers/auth.controller');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(getAllSubredditUsers)
	.post(
		protect,
		setSubredditUser,
		findSubscriptions,
		isSubscriped,
		createSubredditUser
	)
	.delete(
		protect,
		setSubredditUser,
		findSubscriptions,
		isUnsubscriped,
		deleteSubredditUser
	);

module.exports = router;
