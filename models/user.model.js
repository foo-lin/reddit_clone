//Core Imports
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, 'A user must provide a username'],
		unique: [true, 'Username already taken']
	},
	email: {
		type: String,
		required: [true, 'A user must provide a email'],
		unique: [true, 'User with email already exists'],
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email']
	},
	photoColor: {
		type: String
	},
	role: {
		type: String,
		enum: ['user', 'moderator', 'admin', 'super-admin'],
		default: 'user'
	},
	password: {
		type: String,
		minlength: [4, 'Password must be atleast 4 characters long'],
		select: false
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please confirm your password'],
		validate: {
			message: 'Password do not match',
			validator: function(val) {
				return this.password === val;
			}
		}
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	active: {
		type: Boolean,
		default: true,
		select: false
	}
});

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 10);
	this.passwordConfirm = undefined;
	next();
});

userSchema.pre('save', function(next) {
	const randomColor = [
		'red',
		'blue',
		'orangered',
		'pink',
		'orchid',
		'green',
		'voilet',
		'yellowgreen'
	];
	this.photoColor =
		randomColor[Math.floor(Math.random() * randomColor.length)];
	next();
});

userSchema.pre('save', function(next) {
	this.username = slugify(this.username, '_');
	next();
});

userSchema.methods.correctPassword = async function(
	candidatePassord,
	userPassword
) {
	return await bcrypt.compare(candidatePassord, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
