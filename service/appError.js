const appError = (httpStatus, errorMessage, next) =>{
    const error = new Error(errorMesage);
    error.statusCode = httpStatus;
    error.message = errorMessage;
    error.isOperational = true;
    next(error);
}

module.exports = appError;