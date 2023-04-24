const costomiError = (httpStatus, errorMessage, next) => {
    const error = new Error(errorMessage);
    error.starusCode = httpStatus;
    error.isOperational = true;
    return error;
}

module.exports = costomiError;