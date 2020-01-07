//Relative Imports
const Subreddit = require('../models/subreddit.model');

//Desc: Get all Subreddits
//Route:GET  /api/v1/subreddits
//Access: private
exports.getAllSubreddit = async (req, res, next) => {};

//Desc: Get all Subreddits
//Route:POST /api/v1/subreddits
//Access: private
exports.createSubreddit = async (req, res, next) => {
	try {
		// throw Error('Sdf');
		const document = await Subreddit.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				subreddit: document
			}
		});
	} catch (error) {
		res.status(400).json({
			status: 'errir',
			data: {
				error: error.message
			}
		});
	}
};
