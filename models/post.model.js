//Core imports
const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Please enter a post title'],
			maxlength: [10, 'Title length exceeded max limit']
		},
		postText: {
			type: String,
			required: [true, 'Please enter a post']
		},
		votes: {
			type: Number,
			default: 0
		},
		numComments: {
			type: Number,
			default: 0
		},
		createdAt: {
			type: Date,
			default: Date.now()
		},
		subreddit: {
			type: mongoose.Schema.ObjectId,
			ref: 'Subreddit',
			required: [true, 'A post must belong to subreddit']
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'A post must have a user']
		},
		slug: {
			type: String
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

// postSchema.pre(/^find/, function(next) {
// 	this.populate({
// 		path: 'subreddit',
// 		select: 'name'
// 	}).populate({
// 		path: 'user'
// 	});
// 	next();
// });

postSchema.virtual('hasVoted', {
	ref: 'VotesPostUser',
	foreignField: 'post',
	localField: '_id'
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
