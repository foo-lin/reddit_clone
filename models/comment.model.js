//Core imports
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
	{
		commentText: {
			type: String,
			required: [true, 'Please enter text']
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'A comment must belong to a user']
		},
		post: {
			type: mongoose.Schema.ObjectId,
			ref: 'Post',
			required: [true, 'A comment must belong to a Post']
		},
		createdAt: {
			type: Date,
			default: Date.now()
		},
		parent: {
			type: mongoose.Schema.ObjectId,
			ref: 'Comment',
			default: null
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

commentSchema.virtual('children', {
	ref: 'Comment',
	foreignField: 'parent',
	localField: '_id'
});
commentSchema.virtual('havechildren', {
	ref: 'Comment',
	foreignField: 'parent',
	localField: '_id',
	count: true
});

commentSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user',
		select: 'username'
	});
	next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
