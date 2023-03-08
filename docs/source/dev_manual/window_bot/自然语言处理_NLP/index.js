// 初始化NLP
await windowsBot.initNLP(aipKey);
// 初始化NLP
// 参数一 字符串型，密钥
// 成功返回true，失败返回false


// chatgpt的使用
await windowsBot.chatgpt(model, prompt, maxTokens, temperature, stop = "");
// 使用chatgpt
// 参数一 字符串型，指定使用的模型,"text-davinci-003"、text-curie-001、text-babbage-001、text-ada-001和自定义微调模型
// 参数二 字符串型，提出的问题
// 参数三 最大令牌书，大约 3个字符1个令牌，1个汉字2个令牌
// 参数四 浮点型，调节结果的创意程度，0为单一结果， 1创意度更高
// 参数五 字符串型，可选参数，停止结果输出标志，一般用在微调模型上，例如 stop = '["END"]'
// 返回json类型，{{text:string, finish:boolean} || null}
// text 返回的答案内容
// finish 为true回答结束，false 还有未输出的答案。我们可以继续 prompt + 输出的答案 获取后续内容，直到finish为true

await windowsBot.chatgptEdit(model, input, instruction, maxTokens, temperature);
// 使用chatgpt编辑模式
// 参数一 字符串型，指定使用的模型,"text-davinci-edit-001"、"code-davinci-edit-001"
// 参数二 字符串型，要编辑的文本
// 参数三 字符串型，提示如何去编辑修改
// 参数四 最大令牌书，大约 3个字符1个令牌，1个汉字2个令牌
// 参数五 浮点型，调节结果的创意程度，0为单一结果， 1创意度更高
// 返回json类型，{{text:string, finish:boolean} || null}
// text 返回的答案内容
// finish 为true回答结束，false 还有未输出的答案。我们可以继续 prompt + 输出的答案 获取后续内容，直到finish为true

// 代码示例
// 初始化
let bRet = await windowsBot.initNLP("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
if (!bRet)
    // return;

// chatgpt
let result = await windowsBot.chatgpt("text-davinci-003", "怎么称呼你？", 256, 0.7);
console.log(result["text"]);

// chatgpt 循环获取答案
let prompt = "请介绍下Aibote的应用场景，不少于500字";
let isFinish;
do {
    let result = await windowsBot.chatgpt("text-davinci-003", prompt, 256, 0.7);
    isFinish = result["finish"];
    if (!isFinish)
        prompt += result["text"];

    console.log(result["text"]);
} while (!isFinish)

// chatgptEdit
let result = await windowsBot.chatgptEdit("text-davinci-edit-001", "你好码？", "修正错误文字", 256, 0);
console.log(result["text"]);


// 训练模型
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

// 训练数据文件
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