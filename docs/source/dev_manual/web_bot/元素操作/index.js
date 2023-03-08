

await webBot.clickElement(xpath);
//点击元素
//参数一 字符串型，元素路径
//成功返回true 失败返回false

await webBot.setElementValue(xpath, value);
//设置编辑框内容
//参数一 字符串型，元素路径
//参数二 字符串型，输入的值
//成功返回true 失败返回false

await webBot.getElementText(xpath);
//获取文本
//参数一 字符串型，元素路径
//成功返回元素文本内容，一般指元素innerText属性的值，失败返回null


// 代码示例
// 遍历xpath 获取所有兄弟节点内容
for(let i = 1; ; i++){
    let text = await webBot.getElementText(`//*[@id="s-top-left"]/a[${i}]`); //模板字符串
    if(text == null) {
        break;
    }

    console.log(text);
}


await webBot.getElementOuterHTML(xpath);
//获取outerHTML
//参数一 字符串型，元素路径
//成功返回元素outerHTML，失败返回null

await webBot.getElementInnerHTML(xpath);
//获取innerHTML
//参数一 字符串型，元素路径
//成功返回元素outerHTML，失败返回null

await webBot.setElementAttribute(xpath, attributeName, value);
//设置属性值
//参数一 字符串型，元素路径
//参数二 字符串型，指定的属性名
//参数三 字符串型，属性值
//成功返回true，失败返回false

await webBot.getElementAttribute(xpath, attributeName);
//获取属性值
//参数一 字符串型，元素路径
//参数二 字符串型，指定的属性名
//成功返回元素属性值，失败返回null

await webBot.getElementRect(xpath);
//获取矩形位置
//参数一 字符串型，元素路径
//返回 {left:number, top:number, right:number, bottom:number, width:number, height:number}，失败返回null

await webBot.isSelected(xpath);
//判断该元素是否选中
//参数一 字符串型，元素路径
//返回true 或 false

await webBot.isDisplayed(xpath);
//判断该元素是否可见
//参数一 字符串型，元素路径
//返回true 或 false

await webBot.isEnabled(xpath);
//判断元素是否可用
//参数一 字符串型，元素路径
//返回true 或 false

await webBot.clearElement(xpath);
//清除元素值
//参数一 字符串型，元素路径
//成功返回true 失败返回false

await webBot.setElementFocus(xpath);
//设置元素焦点
//参数一 字符串型，元素路径
//成功返回true 失败返回false

await webBot.uploadFile(xpath, filePath);
//通过元素上传文件
//参数一 字符串型，元素路径
//参数二 字符串型，本地文件路径，路径不存在会导致网页崩溃
//成功返回true 失败返回false
