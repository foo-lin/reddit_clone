//Reletive import
const VotesCommentUser = require('../models/votesCommentAndUser.model');
const { getAll } = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.setCommentUser = async (req, res, next) => {
	const filter = { user: req.user._id, comment: req.params.commentId };
	const document = await VotesCommentUser.findOne(filter);
	if (document) {
		req.votesCommentUser = document;
	} else {
		req.body.user = req.user._id;
		req.body.comment = req.params.commentId;
	}
	next();
};

exports.upvote = catchAsync(async (req, res, next) => {
	if (req.votesCommentUser) {
		if (req.votesCommentUser.vote === 1) {
			await VotesCommentUser.findOneAndDelete({
				_id: req.votesCommentUser._id
			});
			return res.status(204).json({ status: 'success' });
		}
		await VotesCommentUser.findOneAndUpdate(
			{ _id: req.votesCommentUser._id },
			{
				vote: 1
			}
		);
		return res.status(202).json({ status: 'success' });
	}
	await VotesCommentUser.create({ ...req.body, vote: 1 });
	res.status(201).json({ status: 'success' });
});

exports.downvote = catchAsync(async (req, res, next) => {
	if (req.votesCommentUser) {
		if (req.votesCommentUser.vote === -1) {
			const s = await VotesCommentUser.findOneAndDelete({
				_id: req.votesCommentUser._id
			});
			return res.status(204).json({ status: 'success', s });
		}
		await VotesCommentUser.findByIdAndUpdate(
			{ _id: req.votesCommentUser._id },
			{
				vote: -1
			}
		);
		return res.status(202).json({ status: 'success' });
	}
	await VotesCommentUser.create({ ...req.body, vote: -1 });
	res.status(201).json({ status: 'success' });
});

exports.getAllvotes = getAll(VotesCommentUser, 'votes');
