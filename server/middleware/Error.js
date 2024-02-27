const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500

    err.message = err.message || 'Internal Server Error'

    //duplicate key error 

    if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400)
    }

    //wrong JWT

    if (err.name === 'JsonWebTokenError') {
        const message = 'Your Url is invalid'
        err = new ErrorHandler(message, 400)
    }

    //jwt expired

    if (err.name === 'TokenExpiredError') {
        const message = 'Your Url is Expired'
        err = new ErrorHandler(message, 400)
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}

