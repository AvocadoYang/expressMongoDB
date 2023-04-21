
//程式出現重大錯誤
process.on('uncaughtException', (err) => {
    console.error("Uncaughted Exception !");
    console.error(err);
    process.exit(1);
})


process.on('unhandledRejection', (err, promise) => {
    console.log("AJAX false", promise, "reason : ", err);
})