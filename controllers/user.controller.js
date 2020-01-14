//Relative imports
const User = require('../models/user.model');
const { getAll } = require('./handlerFactory');

exports.GetAllUser = getAll(User, 'users');
