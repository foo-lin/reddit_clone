//Core Imports
const dotenv = require('dotenv');

//Configure env variables
dotenv.config({ path: './config.env' });

const app = require('./app');

app.listen(process.env.PORT, () => {
	console.log(`App running on port ${process.env.PORT}`);
});
