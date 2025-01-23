// Error message function:
function handleErrorResponse(responseObject, errorObj, statusCode = 500) {
    responseObject.status(statusCode).json({
        message: 'failure', 
        payload: errorObj
    });
    console.log(errorObj);
};

module.exports = handleErrorResponse;