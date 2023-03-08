await windowsBot.uploadTrainFile(filePath);
// 上传训练文件到服务器
// 参数一 字符串型, 文件路径，不支持中文路径
// 成功返回文件id，失败返回null

await windowsBot.listTrainFiles();
// 列出所有训练文件信息
// 返回json对象数组 {Promise.<[{bytes:number, fileName:string, fileId:string, purpose:string}] || null>}
// bytes 训练数据文件的大小
// fileName 训练数据文件的名称
// fileId 训练数据文件的id
// purpose 文件的意图 例如："fine-tune" 意图为 用作微调模型

await windowsBot.listTrainFile(fileId);
// 参数一 字符串型， 文件id
// 返回json对象 {Promise.<{bytes:number, fileName:string, fileId:string, purpose:string} || null>}
// bytes 训练数据文件的大小
// fileName 训练数据文件的名称
// fileId 训练数据文件的id
// purpose 文件的意图 例如："fine-tune" 意图为 用作微调模型

await windowsBot.downloadTrainFile(fileId);
// 下载训练文件内容
// 参数一 字符串型， =文件id
// 成功返回文件内容，失败返回null

await windowsBot.deleteTrainFile(fileId);
// 删除训练文件
// 参数一 字符串型， =文件id
// 成功返回文件内容，失败返回null