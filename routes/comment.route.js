//core imports
const express = require('express');

//relative imports
const { protect, isLoggedIn } = require('../controllers/auth.controller');
const {
	createComment,
	getAllComments,
	getComment,
	setUserPostId
} = require('../controllers/comment.controller');
const votesCommentUserRoute = require('./votesCommentuser.route');

const router = express.Router({ mergeParams: true });

router.use('/:commentId/vote', votesCommentUserRoute);
router
	.route('/')
	.get(isLoggedIn, getAllComments)
	.post(protect, setUserPostId, createComment);

router.route('/:id').get(isLoggedIn, getComment);
module.exports = router;
