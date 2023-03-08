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
