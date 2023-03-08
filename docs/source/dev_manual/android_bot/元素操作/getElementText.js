await androidBot.getElementText(xpath);
// 获取文本
// 参数一 字符串类型，元素路径
// 成功返回元素内容，失败返回null

// 代码示例
// 遍历xpath 获取所有兄弟节点内容
for (let i = 0; ; i++) {
    let text = await androidBot.getElementText(`com.android.settings/android:id=title[${i}]`);//模板字符串
    if (text == null)
        break;

    console.log(text);
}