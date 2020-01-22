//relative import
const Comment = require('../models/comment.model');
const { createOne } = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

//Utils

const commentFourLevelDeep = userId => {
	return {
		path: 'children',
		options: { sort: { createdAt: 1 }, userId },
		populate: {
			path: 'children',
			model: 'Comment',
			options: { userId },
			populate: {
				path: 'children',
				model: 'Comment',
				options: { userId },
				populate: {
					path: 'havechildren',
					model: 'Comment'
				}
			}
		}
	};
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
	const query = Comment.find(filter);
	if (req.user) {
		query.userId = req.user._id;
	}

	const comments = await query.populate(
		commentFourLevelDeep(req.user && req.user._id)
	);
	res.status(200).json({
		status: 'success',
		length: comments.length,
		data: {
			comments
		}
	});
});

exports.getComment = catchAsync(async (req, res, next) => {
	const query = Comment.findById(req.params.id);
	if (req.user) {
		query.userId = req.user._id;
	}

	const comment = await query.populate(
		commentFourLevelDeep(req.user && req.user._id)
	);

	if (!comment) {
		return next(new AppError('Comment not found or deleted', 400));
	}
	res.status(200).json({
		status: 'success',
		data: {
			comment
		}
	});
});

// exports.deleteComment = catchAsync();
