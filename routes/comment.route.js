//core imports
const express = require('express');

//relative imports
const { protect } = require('../controllers/auth.controller');
const {
	createComment,
	getAllComments,
	getComment,
	setUserPostId
} = require('../controllers/comment.controller');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(getAllComments)
	.post(protect, setUserPostId, createComment);

router.route('/:id').get(getComment);
module.exports = router;
