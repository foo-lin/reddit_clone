const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

//Get All
exports.getAll = (Model, propertyName) =>
	catchAsync(async (req, res, next) => {
		// let filter;
		// if (req.params.tourId) {
		// 	filter = { tour: req.params.tourId };
		// }
		// const document = new APIFeatures(Model.find(filter), req.query)
		// 	.filter()
		// 	.sort()
		// 	.limitFields()
		// .paginations();
		const document = await Model.find();

		// const doc = await document.query;
		res.status(200).json({
			status: 'success',
			results: document.length,
			data: {
				[propertyName]: document
			}
		});
	});

// Create one
exports.createOne = (Model, propertyName) =>
	catchAsync(async (req, res, next) => {
		const newDocument = await Model.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				[propertyName]: newDocument
			}
		});
	});

// Get One
exports.getOne = (Model, propertyName) =>
	catchAsync(async (req, res, next) => {
		const query = Model.findById(req.params.id);
		// if (popOptions) {
		// 	query = query.populate(popOptions);
		// }
		const document = await query;
		if (!document) {
			return next(
				new AppError(`No ${propertyName} found with that id`, 404)
			);
		}
		res.status(200).json({
			status: 'success',
			data: {
				[propertyName]: document
			}
		});
	});

//Update One
exports.updateOne = (Model, propertyName) =>
	catchAsync(async (req, res, next) => {
		const updatedDocument = await Model.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true
			}
		);
		if (!updatedDocument) {
			return next(
				new AppError(`No ${propertyName} found with that id`, 404)
			);
		}
		res.status(201).json({
			status: 'success',
			data: {
				[propertyName]: updatedDocument
			}
		});
	});

//Delete One
exports.deleteOne = Model =>
	catchAsync(async (req, res, next) => {
		const document = await Model.findByIdAndDelete(req.params.id);
		if (!document) {
			return next(new AppError('No tour found with that id', 404));
		}
		res.status(204).json({
			status: 'success',
			data: null
		});
	});
