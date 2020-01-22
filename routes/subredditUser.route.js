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
router
	.route('/is')
	.get(protect, setSubredditUser, findSubscriptions, (req, res) => {
		res.json({
			status: 'success',
			data: { isSub: Boolean(req.subreddituser) }
		});
	});

module.exports = router;
