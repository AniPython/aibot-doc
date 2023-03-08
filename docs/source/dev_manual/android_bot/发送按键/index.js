
await androidBot.back();
// 成功返回true 失败返回false

await androidBot.home();
// 成功返回true 失败返回false

await androidBot.recents();
// 成功返回true 失败返回false

await androidBot.sendVk(keyCode);
// 参数一 整型，发送按键值，需要打开aibote输入法。例如：回车：66
// 按键对照表 https://blog.csdn.net/yaoyaozaiye/article/details/122826340
// 成功返回true 失败返回false

// 代码示例
// 发送搜索键
await androidBot.sendVk(84);