const resErrorProd = (err, res) =>{
    if(err.isOprational){
        res.status(err.statusCode).send({
            message : err.message
        });
    } else {
        console.error("出現重大錯誤", err)
        res.status(500).send({
            status : 'error',
            message : '系統錯誤'
        });
    }
};

const resErroDe = (err, res) => {
    res.status(err.statusCode).send({
        message : err.message,
        error : err,
        stack : err.stack
    })
};


module.exports = { resErrorProd, resErroDe};
