//Core Imports
const mongoose = require('mongoose');
const slugify = require('slugify');

const subredditSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Subreddit cannot be created without a name'],
		unique: true,
		trim: true,
		maxlength: [20, 'Subreddit name cannot be longer than 20 characters'],
		minlength: [3, 'Subreddit name must be atleast 3 characters long']
	},
	summary: {
		type: String,
		trim: true,
		required: [true, 'A Subreddit mush have a summay']
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	slug: {
		type: String
	},
	imageBackground: {
		type: String
	},
	imageLogo: {
		type: String
	}
});
subredditSchema.pre('save', function(next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

const Subreddit = mongoose.model('Subreddit', subredditSchema);
module.exports = Subreddit;
