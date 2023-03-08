await androidBot.clickElement(xpath);
// 点击元素
// 参数一 字符串类型，元素路径
// 成功返回true 失败返回false

// 代码示例
// 相对路径点击元素
let xpath = "com.example.android.notepad/com.example.android.notepad:id=fab_add";
await androidBot.clickElement(xpath);

// 文本模糊匹配点击元素
xpath = "com.huawei.android.launcher/android.widget.TextView@containsText=ibote";
await androidBot.clickElement(xpath);

// 描述模糊匹配点击元素
xpath = "com.huawei.android.launcher/android.widget.TextView@containsDesc=ibote";
await androidBot.clickElement(xpath);