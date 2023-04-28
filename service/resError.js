const ErrorProd = (err, res) => {
    if(err.isOperational){
        res.status(err.statusCode).send({
            message : err.message
        });
    } else {
        console.log("uncaughtError!!!");
        res.status(500).send({
            status : 'error',
            message : "聯繫客服" 
        });
    }
}


const ErrorDev = (err, res) =>{
    res.status(err.statusCode).send({
        message : err.message,
        error : err,
        stack : err.stack
    })
};

module.exports = {ErrorProd, ErrorDev};

