//Core imports
const mongoose = require('mongoose');

//Relative import
const Post = require('./post.model');

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
		votes: {
			type: Number,
			default: 0
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

commentSchema.statics.calcNumOfComments = async function(postId) {
	const stats = await this.aggregate([
		{
			$match: { post: postId }
		},
		{
			$group: {
				_id: null,
				nComments: { $sum: 1 }
			}
		}
	]);
	await Post.findByIdAndUpdate(postId, { numComments: stats[0].nComments });
};

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

commentSchema.virtual('hasUserVoted', {
	ref: 'VotesCommentUser',
	foreignField: 'comment',
	localField: '_id'
});

commentSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user',
		select: 'username photoColor'
	});
	next();
});

commentSchema.post('save', function() {
	this.constructor.calcNumOfComments(this.post);
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
