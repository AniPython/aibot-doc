
await androidBot.createTextView(id, text, x, y, width, height);
// 创建TextView控件
// 参数一 整型，控件ID，不可与其他控件重复
// 参数二 字符串型，控件文本
// 参数三 整型，控件在屏幕上x坐标
// 参数四 整型，控件在屏幕上y坐标
// 参数五 整型，控件宽度
// 参数六 整型，控件高度
// 成功返回true，失败返回 false

await androidBot.createEditText(id, hintText, x, y, width, height);
// 创建EditText控件
// 参数一 整型，控件ID，不可与其他控件重复
// 参数二 字符串型，提示文本
// 参数三 整型，控件在屏幕上x坐标
// 参数四 整型，控件在屏幕上y坐标
// 参数五 整型，控件宽度
// 参数六 整型，控件高度
// 成功返回true，失败返回 false

await androidBot.createCheckBox(id, text, x, y, width, height);
// 创建CheckBox控件
// 参数一 整型，控件ID，不可与其他控件重复
// 参数二 字符串型，控件文本
// 参数三 整型，控件在屏幕上x坐标
// 参数四 整型，控件在屏幕上y坐标
// 参数五 整型，控件宽度
// 参数六 整型，控件高度
// 成功返回true，失败返回 false

await androidBot.createWebView(id, url, x, y, width, height);
// 创建WebView控件
// 参数一 整型，控件ID，不可与其他控件重复
// 参数二 字符串型，加载的链接
// 参数三 整型，控件在屏幕上x坐标，值为-1时自动填充宽高
// 参数四 整型，控件在屏幕上y坐标，值为-1时自动填充宽高
// 参数五 整型，控件宽度，值为-1时自动填充宽高
// 参数六 整型，控件高度，值为-1时自动填充宽高
// 成功返回true，失败返回 false

await androidBot.clearScriptControl();
// 清除脚本控件
// 成功返回true，失败返回 false

await androidBot.getScriptParam();
// 获取脚本配置参数，用户点击安卓端 "提交参数"按钮 触发
// 成功返回{"id":"text", "id":"isSelect"} 此类对象，失败返回null。

// 代码示例
// 创建TextView 和 EditText 控件
await androidBot.createTextView(100, "输入参数", 10, 10, 400, 200);
await androidBot.createEditText(101, "", 450, 10, 500, 200);

// 等待用户提交，获取参数
let retParams = await androidBot.getScriptParam();
param = retParams["101"];
console.log("用户输入的参数是：", param);
