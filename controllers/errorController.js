const sendErrorDev = (err, req, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		stack: err.stack
	});
};

const globalErrorHandler = (err, req, res, next) => {
	err.status = err.status || 'error';
	err.statusCode = err.statusCode || 500;
	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, req, res);
	}
};

module.exports = globalErrorHandler;
