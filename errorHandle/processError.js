
  process.on('unhandledRejection', (reason, promise) => {
    console.error('未捕捉到的 rejection：', promise, '原因：', reason);
    // 記錄於 log 上
  });

  process.on('uncaughtException', (err) => {
    // 記錄錯誤下來，等到服務都處理完後，停掉該 process
    console.error('Uncaughted Exception！');
    console.error(err.message);
    console.error(err.name);
    process.exit(1);
  });