//core imports
const mongoose = require('mongoose');

//Relative imports
const Post = require('./post.model');

const votesPostUserSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'A user is requied to vote']
	},
	post: {
		type: mongoose.Schema.ObjectId,
		ref: 'Post',
		required: [true, 'A post is requied to vote']
	},
	vote: {
		type: Number,
		enum: [1, -1]
	}
});

votesPostUserSchema.statics.setVotes = async function(postId) {
	const stats = await this.aggregate([
		{
			$match: { post: postId }
		},
		{
			$group: {
				_id: null,
				nVotes: { $sum: '$vote' }
			}
		}
	]);
	await Post.findByIdAndUpdate(postId, {
		votes: stats.length ? stats[0].nVotes : 0
	});
};

votesPostUserSchema.post('save', async function() {
	await this.constructor.setVotes(this.post);
});

votesPostUserSchema.pre(/^findOneAnd/, async function(next) {
	this.p = await this.findOne();
	next();
});

votesPostUserSchema.post(/^findOneAnd/, async function() {
	await this.p.constructor.setVotes(this.p.post);
});

const VotesPostUser = mongoose.model('VotesPostUser', votesPostUserSchema);
module.exports = VotesPostUser;
