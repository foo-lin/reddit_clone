//Core Imports
const dotenv = require('dotenv');

//Configure env variables
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

const db = process.env.DATABASE.replace(
	'<password>',
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Connected To DB');
	});

const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
});
