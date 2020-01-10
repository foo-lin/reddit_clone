//core imports
const jwt = require('jsonwebtoken');
const util = require('util');
//relative imports
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

//Utily Functions

const signToken = _id => {
	return jwt.sign({ id: _id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
};

const createAndSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);
	user.password = undefined;
	res.status(statusCode).json({
		status: 'success',
		data: {
			token,
			user
		}
	});
};

//Controllers
exports.signUp = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm
	});
	createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new AppError(`Please provide email or password`, 400));
	}
	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError('Incorrent Password or email', 401));
	}
	createAndSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}
	if (!token) {
		return next(
			new AppError('You are not logged in,Please log in to access')
		);
	}
	const decode = await util.promisify(jwt.verify)(
		token,
		process.env.JWT_SECRET
	);
	const currentUser = await User.findById(decode.id);
	req.user = currentUser;
	next();
});

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError(
					'You are not authorize to perform this action',
					403
				)
			);
		}
		next();
	};
};
