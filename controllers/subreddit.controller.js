//Relative Imports
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Subreddit = require('../models/subreddit.model');
const {
	getAll,
	createOne,
	getOne,
	updateOne,
	deleteOne
} = require('./handlerFactory');

//Desc: Get all Subreddits
//Route:GET  /api/v1/subreddit
//Access: private
exports.getAllSubreddit = getAll(Subreddit, 'subreddits');

//Desc: Create one Subreddits
//Route:POST /api/v1/subreddit
//Access: private
exports.createSubreddit = createOne(Subreddit, 'subreddit');

//Desc: Get one Subreddits
//Route:Get /api/v1/subreddit/id
//Access: public
exports.getSubreddit = getOne(Subreddit, 'subreddit', { path: 'posts' });

//Desc: Delete one Subreddits
//Route:Delete /api/v1/subreddit/id
//Access: private
exports.deleteSubreddit = deleteOne(Subreddit);

//Desc: Update one Subreddits
//Route:Patch /api/v1/subreddit/id
//Access: private
exports.updateSubreddit = updateOne(Subreddit, 'subreddit');

exports.getSubredditBySlug = catchAsync(async (req, res, next) => {
	const query = Subreddit.findOne({
		slug: req.params.subredditSlug
	}).populate({ path: 'modarators', select: '-__v -email' });

	const document = await query;
	if (!document) {
		return next(
			new AppError('Sorry, No commuity exist with that name', 404)
		);
	}
	res.json({
		status: 'success',
		data: {
			subreddit: document
		}
	});
});
