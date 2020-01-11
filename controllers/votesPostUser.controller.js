//Relative import
const VotesPostUser = require('../models/votesPostUser.model');
const catchAsync = require('../utils/catchAsync');
const { getAll } = require('./handlerFactory');

exports.setPostUser = async (req, res, next) => {
	const filter = { user: req.user._id, post: req.params.postId };
	const document = await VotesPostUser.findOne(filter);
	if (document) {
		req.votesPostUser = document;
	} else {
		req.body.user = req.user._id;
		req.body.post = req.params.postId;
	}
	next();
};

exports.upvote = catchAsync(async (req, res, next) => {
	if (req.votesPostUser) {
		if (req.votesPostUser.vote === 1) {
			await VotesPostUser.findOneAndDelete({
				_id: req.votesPostUser._id
			});
			return res.status(204).json({ status: 'success' });
		}
		await VotesPostUser.findOneAndUpdate(
			{ _id: req.votesPostUser._id },
			{
				vote: 1
			}
		);
		return res.status(202).json({ status: 'success' });
	}
	await VotesPostUser.create({ ...req.body, vote: 1 });
	res.status(201).json({ status: 'success' });
});

exports.downvote = catchAsync(async (req, res, next) => {
	if (req.votesPostUser) {
		if (req.votesPostUser.vote === -1) {
			await VotesPostUser.findOneAndDelete({
				_id: req.votesPostUser._id
			});
			return res.status(204).json({ status: 'success' });
		}
		await VotesPostUser.findOneAndUpdate(
			{ _id: req.votesPostUser._id },
			{
				vote: -1
			}
		);
		return res.status(202).json({ status: 'success' });
	}
	await VotesPostUser.create({ ...req.body, vote: -1 });
	res.status(201).json({ status: 'success' });
});

exports.getAllPostVotes = getAll(VotesPostUser, 'post_votes');
