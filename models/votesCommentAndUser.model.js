//core import
const mongoose = require('mongoose');

//relative import
const Comment = require('./comment.model');

const votesCommentUserSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	comment: {
		type: mongoose.Schema.ObjectId,
		ref: 'Commnet',
		required: true
	},
	vote: {
		type: Number,
		enum: [1, -1]
	}
});

votesCommentUserSchema.statics.setVotes = async function(commentId) {
	const stats = await this.aggregate([
		{
			$match: { comment: commentId }
		},
		{
			$group: {
				_id: null,
				nVotes: { $sum: '$vote' }
			}
		}
	]);

	await Comment.findByIdAndUpdate(commentId, {
		votes: stats.length ? stats[0].nVotes : 0
	});
};

votesCommentUserSchema.post('save', function() {
	this.constructor.setVotes(this.comment);
});

votesCommentUserSchema.pre(/^findOneAnd/, async function(next) {
	this.c = await this.findOne();
	next();
});

votesCommentUserSchema.post(/^findOneAnd/, async function() {
	await this.c.constructor.setVotes(this.c.comment);
});

votesCommentUserSchema.index({ user: 1, comment: 1 }, { unique: true });

const VotesCommentUser = mongoose.model(
	'VotesCommentUser',
	votesCommentUserSchema
);

module.exports = VotesCommentUser;
