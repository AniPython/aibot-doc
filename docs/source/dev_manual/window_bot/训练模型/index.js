await windowsBot.createFineTune(fileId, baseModel, suffix);
// 创建微调模型
// 参数一 字符串型，文件id，可通过 uploadTrainFile函数上传并获取文件id
// 参数二 字符串型，基础模型，可以是以下参数之一，"ada", "babbage", "curie", "davinci"和自定义微调模型
// 参数三 字符串型  微调生成的模型名称后缀，不建议使用中文
// 成功返回微调id，失败返回null

await windowsBot.listFineTunes();
// 列出所有微调信息
// 返回json对象数组 {[{baseModel:string, object:string, fineTuneId:string, fineTunedModel:string, fineTuneStatus:string, fileName:string, fileId:strinig, fileStatus:string}, ...] || null}
// baseModel 基础模型，一般是"ada", "babbage", "curie", "davinci"
// object
// fineTuneId 微调id
// fineTunedModel 微调模型的名称
// fineTuneStatus 正在微调模型的进度状态
// fileName 训练数据文件的名称
// fileId 训练数据文件的id
// fileStatus 训练数据文件的状态

await windowsBot.listFineTune(fineTuneId);
// 获取指定微调id的详细信息
// 参数一 字符串型 微调id
// 返回json对象 {{baseModel:string, fineTuneCosts:string, fineTunedModel:string, fineTuneStatus:string, fileName:string, fileId:string,  fileStatus:string} || null}
// baseModel 基础模型，一般是"ada", "babbage", "curie", "davinci"
// fineTuneCosts 训练该模型消耗的$
// fineTunedModel 微调模型的名称
// fineTuneStatus 正在微调模型的进度状态
// fileName 训练数据文件的名称
// fileId 训练数据文件的id
// fileStatus 训练数据文件的状态

await windowsBot.cancelFineTune(fineTuneId);
// 取消正在微调的作业
// 参数一 字符串型, 微调id
// 成功返回true，失败返回false

await windowsBot.deleteFineTuneModel(fineTuneId);
// 删除微调模型
// 参数一 字符串型, 微调id
// 成功返回true，失败返回false