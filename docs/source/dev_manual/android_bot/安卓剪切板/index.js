await androidBot.setClipboardText(text);
// 设置剪切板内容
// 参数一 字符串型，设置的文本
// 成功返回true 失败返回 false

await androidBot.getClipboardText();
// 获取剪切板内容，需要打开aibote输入法。
// 成功返回剪切板文本，失败返回null