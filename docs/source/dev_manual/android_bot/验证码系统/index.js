await androidBot.getCaptcha(filePath, username, password, softId, codeType, lenMin = 0);
// 识别验证码
// 参数一 字符串类型，图片文件路径
// 参数二 字符串类型，用户名
// 参数三 字符串类型，密码
// 参数四 字符串类型，软件ID
// 参数四 字符串类型，图片类型 参考https://www.chaojiying.com/price.html
// 参数五 字符串类型，最小位数 默认0为不启用,图片类型为可变位长时可启用这个参数
// 返回JSON类型{{err_no:number, err_str:string, pic_id:string, pic_str:string, md5:string}}
// err_no,(数值) 返回代码  为0 表示正常，错误代码 参考https://www.chaojiying.com/api-23.html
// err_str,(字符串) 中文描述的返回信息
// pic_id,(字符串) 图片标识号，或图片id号
// pic_str,(字符串) 识别出的结果
// md5,(字符串) md5校验值,用来校验此条数据返回是否真实有效

// 代码示例
// 通过超级鹰第三方平台接口，识别验证码。username, password, softId由第三方平台提供
let filePath = "/storage/emulated/0/Android/data/com.aibot.client/files/1.png";
let code = await androidBot.getCaptcha(filePath, "username", "password", "123456", "1902");
if (code["err_no"] == 0) {  // 没有错误信息，输出识别结果
    console.log(code["pic_str"]);
}

await androidBot.errorCaptcha(username, password, softId, picId);
// 识别报错返分
// 参数一 字符串类型，用户名
// 参数二 字符串类型，密码
// 参数三 字符串类型，软件ID
// 参数四 字符串类型，图片ID 对应 getCaptcha返回值的pic_id 字段
// 返回JSON类型{{err_no:number, err_str:string}}
// err_no,(数值) 返回代码
// err_str,(字符串) 中文描述的返回信息

await androidBot.scoreCaptcha(username, password);
// 查询验证码剩余题分
// 参数一 字符串类型，用户名
// 参数二 字符串类型，密码
// 返回JSON类型{{err_no:number, err_str:string, tifen:string, tifen_lock:string}}
// err_no,(数值) 返回代码
// err_str,(字符串) 中文描述的返回信息
// tifen,(数值) 题分
// tifen_lock,(数值) 锁定题分