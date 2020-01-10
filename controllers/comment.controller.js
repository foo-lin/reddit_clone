//relative import
const Comment = require('../models/comment.model');
const { createOne } = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

//Utils

const commentFourLevelDeep = {
	path: 'children',
	options: { sort: { createdAt: 1 } },
	populate: {
		path: 'children',
		model: 'Comment',
		populate: {
			path: 'children',
			model: 'Comment',
			populate: {
				path: 'havechildren',
				model: 'Comment'
			}
		}
	}
};

//Contorllers
exports.setUserPostId = (req, res, next) => {
	if (!req.body.user) req.body.user = req.user._id;
	if (!req.body.post) req.body.post = req.params.postId;
	next();
};

exports.createComment = createOne(Comment, 'comment');

exports.getAllComments = catchAsync(async (req, res, next) => {
	let filter = {};
	if (req.params.postId) {
		filter = { post: req.params.postId, parent: null };
	}
	const comments = await Comment.find(filter).populate(commentFourLevelDeep);
	res.status(200).json({
		status: 'success',
		length: comments.length,
		data: {
			comments
		}
	});
});

exports.getComment = catchAsync(async (req, res, next) => {
	const comment = await Comment.findById(req.params.id).populate(
		commentFourLevelDeep
	);
	if (!comment) {
		return next(new AppError('Comment not found or deleted'));
	}
	res.status(200).json({
		status: 'success',
		data: {
			comment
		}
	});
});

// exports.deleteComment = catchAsync();
