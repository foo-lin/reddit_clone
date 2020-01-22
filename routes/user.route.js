//core imports
const express = require('express');

// Relative Imports
const { signUp, login, isLoggedIn } = require('../controllers/auth.controller');
const { GetAllUser } = require('../controllers/user.controller');

const router = express.Router();

router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/isloggedin').get(isLoggedIn, (req, res, next) => {
	res.status(200).json({
		status: 'success',
		data: {
			user: req.user
		}
	});
});

router.route('/').get(GetAllUser);

module.exports = router;
