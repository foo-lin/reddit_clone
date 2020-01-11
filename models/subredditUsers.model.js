//core imports
const mongoose = require('mongoose');

//relative imports
const Subreddit = require('./subreddit.model');

const subredditUserSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'A user is required to join a subreddit']
	},
	subreddit: {
		type: mongoose.Schema.ObjectId,
		ref: 'Subreddit',
		required: [true, 'A subreddit is required for a user to join']
	}
});

subredditUserSchema.index({ user: 1, subreddit: 1 }, { unique: true });

subredditUserSchema.statics.setNumUsers = async function(subredditId) {
	const stats = await this.aggregate([
		{ $match: { subreddit: subredditId } },
		{
			$group: {
				_id: null,
				nUsers: { $sum: 1 }
			}
		}
	]);
	await Subreddit.findByIdAndUpdate(subredditId, {
		numUsers: stats[0].nUsers
	});
};

subredditUserSchema.post('save', async function() {
	// console.log(this.constructor);
	await this.constructor.setNumUsers(this.subreddit);
});

subredditUserSchema.pre(/^findOneAnd/, async function(next) {
	this.s = await this.findOne();
	next();
});

subredditUserSchema.post(/^findOneAnd/, async function() {
	this.s.constructor.setNumUsers(this.s.subreddit);
});

const SubredditUser = mongoose.model('SubredditUser', subredditUserSchema);
module.exports = SubredditUser;
