//Relative import
const Post = require('../models/post.model');
const { createOne, getAll } = require('./handlerFactory');

//Contorllers
exports.setSubredditUserid = (req, res, next) => {
	if (!req.body.user) req.body.user = req.user._id;
	if (!req.body.subreddit) req.body.subreddit = req.params.subredditId;
	next();
};

exports.setPopulateOption = (req, res, next) => {
	let populateOptions = null;
	if (req.user) {
		populateOptions = {
			path: 'hasVoted',
			select: 'vote',
			options: { find: { user: req.user._id } }
		};
	}
	console.log(req.user);
	req.populateOptions = populateOptions;
	next();
};

exports.getAllPost = getAll(Post, 'post', 'subredditId');

// exports.getAllPost = catchAsync(async (req, res, next) => {
// 	let filter = {};
// 	if (req.params.subredditId) {
// 		filter = { subreddit: req.params.subredditId };
// 	}
// 	const document = new APIFeatures(
// 		Post.find(filter),
// 		req.query
// 	).limitFields();
// 	const posts = await document.query.populate({
// 		path: 'hasVoted',
// 		select: 'vote',
// 		options: { find: { user: '5e157ad5c971450c82ba1610' } }
// 	});

// 	res.status(200).json({
// 		status: 'success',
// 		length: posts.length,
// 		data: {
// 			posts
// 		}
// 	});
// });

exports.createPost = createOne(Post, 'post');
