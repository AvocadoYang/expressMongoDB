const header = require("../header");
function successHandle(res, data){
    res.set(header);
    res.status(200).send({
        "status" : "success",
        data
    });
} 

module.exports = successHandle;