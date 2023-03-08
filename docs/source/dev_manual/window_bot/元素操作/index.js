

await windowsBot.getElementName(hwnd, xpath);
// 获取元素名称
// 参数一 字符串/整型，窗口句柄。如果是java窗口并且窗口句柄和元素句柄不一致，需要使用getElementWindow获取窗口句柄。
// getElementWindow参数的xpath，Aibote Tool应当使用正常模式下获取的XPATH路径，不要 “勾选java窗口” 复选按钮。对话框子窗口，需要获取对应的窗口句柄操作
// 参数二 字符串型，元素路径
// 成功返回元素名称，失败返回null

// 代码示例
// 遍历xpath 获取所有兄弟节点name
for(let i = 0; ; i++){
    let text = await windowsBot.getElementName(hwnd, `Pane[2]/Pane/Pane/Pane/Pane[1]/Pane/Pane/Pane/Pane/Pane/Pane/Pane/Pane[2]/List/List/ListItem[${i}]`);//模板字符串
    if(text == null)
        break;

    console.log(text);
}


await windowsBot.getElementValue(hwnd, xpath);
// 获取元素文本
// 参数一 字符串/整型，窗口句柄
// 参数二 字符串型，元素路径
// 成功返回元素文本，失败返回null

await windowsBot.getElementRect(hwnd, xpath);
// 获取元素矩形大小
// 参数一 字符串/整型，窗口句柄。如果是java窗口并且窗口句柄和元素句柄不一致，需要使用getElementWindow获取窗口句柄。
// getElementWindow参数的xpath，Aibote Tool应当使用正常模式下获取的XPATH路径，不要 “勾选java窗口” 复选按钮。对话框子窗口，需要获取对应的窗口句柄操作
// 参数二 字符串型，元素路径
// 成功返回{left:number, top:number, right:number, bottom:number}，失败返回null

await windowsBot.getElementWindow(hwnd, xpath);
// 获取元素窗口句柄
// 参数一 字符串/整型，窗口句柄
// 参数二 字符串型，元素路径
// 成功返回窗口句柄，失败返回null

await windowsBot.clickElement(hwnd, xpath, msg);
// 点击元素
// 参数一 字符串/整型，窗口句柄。如果是java窗口并且窗口句柄和元素句柄不一致，需要使用getElementWindow获取窗口句柄。
// getElementWindow参数的xpath，Aibote Tool应当使用正常模式下获取的XPATH路径，不要 “勾选java窗口” 复选按钮。对话框子窗口，需要获取对应的窗口句柄操作
// 参数二 字符串型，元素路径
// 参数三 整型，点击类型，单击左键:1 单击右键:2 按下左键:3 弹起左键:4 按下右键:5 弹起右键:6 双击左键:7 双击右键:8
// 成功返回true 失败返回 false。如果此函数不能点击，可尝试使用invokeElement函数

await windowsBot.invokeElement(hwnd, xpath);
// 执行元素默认操作(一般是点击操作)
// 参数一 字符串/整型，窗口句柄。
// 参数二 字符串型，元素路径
// 成功返回true 失败返回 false。

await windowsBot.setElementFocus(hwnd, xpath);
// 设置元素作为焦点
// 参数一 字符串/整型，窗口句柄
// 参数二 字符串型，元素路径
// 成功返回true 失败返回 false

await windowsBot.setElementValue(hwnd, xpath, value);
// 设置元素文本
// 参数一 字符串/整型，窗口句柄。如果是java窗口并且窗口句柄和元素句柄不一致，需要使用getElementWindow获取窗口句柄。
// getElementWindow参数的xpath，Aibote Tool应当使用正常模式下获取的XPATH路径，不要 “勾选java窗口” 复选按钮。对话框子窗口，需要获取对应的窗口句柄操作
// 参数二 字符串型，元素路径
// 参数三 字符串型，要设置的内容
// 成功返回true 失败返回 false

await windowsBot.setElementScroll(hwnd, xpath, horizontalPercent, verticalPercent);
// 滚动元素
// 参数一 字符串/整型，窗口句柄
// 参数二 字符串型，元素路径
// 参数三 整型，水平百分比 -1不滚动
// 参数四 整型，垂直百分比 -1不滚动
// 成功返回true 失败返回 false

await windowsBot.isSelected(hwnd, xpath);
// 单/复选框是否选中
// 参数一 字符串/整型，窗口句柄
// 参数二 字符串型，元素路径
// 成功返回true 失败返回 false

await windowsBot.closeWindow(hwnd, xpath);
// 关闭窗口
// 参数一 字符串/整型，窗口句柄。如果是java窗口并且窗口句柄和元素句柄不一致，需要使用getElementWindow获取窗口句柄。
// getElementWindow参数的xpath，Aibote Tool应当使用正常模式下获取的XPATH路径，不要 “勾选java窗口” 复选按钮。对话框子窗口，需要获取对应的窗口句柄操作
// 参数二 字符串型，元素路径
// 成功返回true 失败返回 false

await windowsBot.setWindowState(hwnd, xpath, state);
// 设置窗口状态
// 参数一 字符串/整型，窗口句柄。如果是java窗口并且窗口句柄和元素句柄不一致，需要使用getElementWindow获取窗口句柄。
// getElementWindow参数的xpath，Aibote Tool应当使用正常模式下获取的XPATH路径，不要 “勾选java窗口” 复选按钮。对话框子窗口，需要获取对应的窗口句柄操作
// 参数二 字符串型，元素路径
// 参数三 整型，0正常 1最大化 2 最小化
// 成功返回true 失败返回 false