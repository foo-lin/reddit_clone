//Relative import
const Post = require('../models/post.model');
const { createOne } = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

//Contorllers
exports.setSubredditUserid = (req, res, next) => {
	if (!req.body.user) req.body.user = req.user._id;
	if (!req.body.subreddit) req.body.subreddit = req.params.subredditId;
	next();
};

exports.getAllPost = catchAsync(async (req, res, next) => {
	let filter = {};
	if (req.params.subredditId) {
		filter = { subreddit: req.params.subredditId };
	}
	const posts = await Post.find(filter);
	res.status(200).json({
		status: 'success',
		length: posts.length,
		data: {
			posts
		}
	});
});

exports.createPost = createOne(Post, 'post');
