//Core imports
const express = require('express');

//Relative imports
const { protect } = require('../controllers/auth.controller');
const {
	setPostUser,
	upvote,
	downvote,
	getAllPostVotes
} = require('../controllers/votesPostUser.controller');

const router = express.Router({ mergeParams: true });

router.use(protect);
router.route('/upvote').patch(setPostUser, upvote);
router.route('/downvote').patch(setPostUser, downvote);
router.route('/').get(getAllPostVotes);

module.exports = router;
