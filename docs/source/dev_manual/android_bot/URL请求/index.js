
await androidBot.urlRequest(url, requestType, contentType = "null", postData = "null")
// 参数一 字符串类型，请求的地址，http:// 或者 https://开头
// 参数二 字符串类型，请求类型，GET或者POST
// 参数三 字符串类型，可选参数，用作POST 内容类型
// 参数四 字符串类型，可选参数，用作POST 提交的数据
// 返回请求数据内容

// 代码示例
// GET请求
await androidBot.urlRequest("https://www.baidu.com/", "GET");

// POST请求
let url = "https://tool.chinaz.com/ajaxsync.aspx?callback=jQuery111308936882726209896_1669640902645";
let requestType = "POST";
let contentType = "application/x-www-form-urlencoded";
let postData = "toolbox_urls=www.aibote.com";
await androidBot.urlRequest(url, requestType, contentType, postData);

//POST请求 json格式数据
let url = "http://www.pushplus.plus/send";
let requestType = "POST";
let contentType = "application/json";
let token = "123456";
let title = "打卡结果通知";
let postData = `{"token":${token}, "title":${title}}`
await androidBot.urlRequest(url, requestType, contentType, postData);
