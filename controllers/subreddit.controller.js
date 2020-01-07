//Relative Imports
const Subreddit = require('../models/subreddit.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

//Desc: Get all Subreddits
//Route:GET  /api/v1/subreddit
//Access: private
exports.getAllSubreddit = catchAsync(async (req, res, next) => {
	const documents = await Subreddit.find();
	res.status(200).json({
		status: 'success',
		length: documents.length,
		data: {
			subreddits: documents
		}
	});
});

//Desc: Create one Subreddits
//Route:POST /api/v1/subreddit
//Access: private
exports.createSubreddit = catchAsync(async (req, res, next) => {
	const document = await Subreddit.create(req.body);

	res.status(201).json({
		status: 'success',

		data: {
			subreddit: document
		}
	});
});

//Desc: Get one Subreddits
//Route:Get /api/v1/subreddit/id
//Access: public
exports.getSubreddit = catchAsync(async (req, res, next) => {
	// console.log(req.params);
	const document = await Subreddit.findById(req.params.id);
	if (!document) {
		return next(
			new AppError(`No Subreddit exist with id ${req.params.id}`, 404)
		);
	}
	res.status(200).json({
		status: 'success',
		data: {
			subreddit: document
		}
	});
});

//Desc: Delete one Subreddits
//Route:Delete /api/v1/subreddit/id
//Access: private
exports.deleteSubreddit = catchAsync(async (req, res, next) => {
	const document = await Subreddit.findByIdAndDelete(req.params.id);
	if (!document) {
		return next(new AppError('No tour found with that id', 404));
	}
	res.status(204).json({
		status: 'success',
		data: null
	});
});

//Desc: Update one Subreddits
//Route:Patch /api/v1/subreddit/id
//Access: private
exports.updateSubreddit = catchAsync(async (req, res, next) => {
	const updatedDocument = await Subreddit.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true
		}
	);
	if (!updatedDocument) {
		return next(new AppError(`No subreddit found with that id`, 404));
	}
	res.status(200).json({
		status: 'success',
		data: {
			subreddit: updatedDocument
		}
	});
});
