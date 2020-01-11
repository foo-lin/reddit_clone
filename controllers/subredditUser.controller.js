//relative Import
const { getAll, createOne, deleteOne } = require('./handlerFactory');
const SubredditUser = require('../models/subredditUsers.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.setSubredditUser = (req, res, next) => {
	if (!req.body.subreddit) req.body.subreddit = req.params.subredditId;
	if (!req.body.user) req.body.user = req.user._id;
	next();
};

exports.findSubscriptions = catchAsync(async (req, res, next) => {
	const document = await SubredditUser.findOne(req.body);
	req.subreddituser = document;
	next();
});

exports.isSubscriped = (req, res, next) => {
	if (req.subreddituser) {
		return next(new AppError('Already Subsciped to this subreddit', 400));
	}

	next();
};
exports.isUnsubscriped = (req, res, next) => {
	if (!req.subreddituser) {
		return next(
			new AppError('Already unsubcriped from this subreddit', 400)
		);
	}
	req.params.id = req.subreddituser._id;
	next();
};

exports.getAllSubredditUsers = getAll(SubredditUser, 'users');
exports.createSubredditUser = createOne(SubredditUser, 'user');
exports.deleteSubredditUser = deleteOne(SubredditUser, 'user');
