//core imports
const express = require('express');

// Relative Imports
const { signUp, login } = require('../controllers/auth.controller');
const { GetAllUser } = require('../controllers/user.controller');

const router = express.Router();

router.route('/signup').post(signUp);
router.route('/login').post(login);

router.route('/').get(GetAllUser);

module.exports = router;
