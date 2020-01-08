//core imports
const express = require('express');

// Relative Imports
const { signUp, login } = require('../controllers/auth.controller');

const router = express.Router();

router.route('/signup').post(signUp);
router.route('/login').post(login);

module.exports = router;
