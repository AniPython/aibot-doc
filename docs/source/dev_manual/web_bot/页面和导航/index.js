
await webBot.goto('http://www.ai-bot.net');
// 参数一 字符串型，打开指定URL，http:// 或者 https:// 开头
// 总是返回true

await webBot.newPage('https:// www.baidu.com');
// 参数一 字符串型，新建tab页面并跳转到指定url
// 成功返回true，失败返回false

await webBot.back();
// 后退

await webBot.forward();
// 前进

await webBot.refresh();
// 刷新

await webBot.getCurPageId();
// 获取当前页面ID

await webBot.getAllPageId();
// 成功返回页面ID数组,失败返回null

await webBot.switchPage(pageId);
// 切换指定页面
// 参数一 字符串型，要切换的页面ID
// 成功返回true，失败返回false。如果失败继续操作，会造成不可知的错误

await webBot.closePage();
// 关闭当前页面

await webBot.getCurrentUrl();
// 获取URL

await webBot.getTitle();
// 获取页面标题