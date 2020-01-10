//Core imports
const express = require('express');
//Relative imports
const {
	upvote,
	downvote,
	setCommentUser,
	getAllvotes
} = require('../controllers/votesCommentUser.controller');
const { protect } = require('../controllers/auth.controller');

const router = express.Router({ mergeParams: true });

router.route('/upvote').patch(protect, setCommentUser, upvote);
router.route('/downvote').patch(protect, setCommentUser, downvote);

router.route('/').get(getAllvotes);

module.exports = router;
