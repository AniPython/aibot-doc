
await webBot.sendKeys(xpath, text);
// 发送文本
// 参数一 字符串型，元素路径
// 参数二 字符串型，要输入的文本，例如sendKeys('//*[@id="kw"]', 'aibote\r'); aibote换行
// 成功返回true 失败返回false

`
// 代码示例
// 输入 aibote换行
await webBot.sendKeys("//*[@id=\"kw\"]", "aibote\r");
`

await webBot.sendVk(vkCode);
// 发送Vk虚拟键
// 参数一 整型，VK键值，仅支持 回退键:8  制表键:9  回车键:13  空格键:32  方向左键:37  方向上键:38  方向右键:39  方向下键:40  删除键:46
// 成功返回true 失败返回false

await webBot.clickMouse(x, y, msg);
// 点击鼠标
// 参数一 整型，横坐标，非Windows坐标，页面左上角为起始坐标
// 参数二 整型，纵坐标，非Windows坐标，页面左上角为起始坐标
// 参数三 整型，单击左键:1  单击右键:2  按下左键:3  弹起左键:4  按下右键:5  弹起右键:6  双击左键:7
// 成功返回true 失败返回false

await webBot.moveMouse(x, y);
// 移动鼠标
// 参数一 整型，横坐标，非Windows坐标，页面左上角为起始坐标
// 参数二 整型，纵坐标，非Windows坐标，页面左上角为起始坐标
// 成功返回true 失败返回false

await webBot.wheelMouse(deltaX, deltaY, x, y);
// 滚动鼠标
// 参数一 整型，水平滚动条移动的距离
// 参数二 整型，垂直滚动条移动的距离
// 参数三 整型，可选参数，鼠标横坐标位置， 默认为0
// 参数四 整型，可选参数，鼠标纵坐标位置， 默认为0
// 成功返回true 失败返回false

await webBot.clickMouseByXpath(xpath, msg);
// 通过xpath 点击鼠标(元素中心点)
// 参数一 字符串型，元素路径
// 参数二 整型，单击左键:1  单击右键:2  按下左键:3  弹起左键:4  按下右键:5  弹起右键:6  双击左键:7
// 成功返回true 失败返回false

await webBot.moveMouseByXpath(xpath);
// 通过xpath 移动鼠标(元素中心点)
// 参数一 字符串型，元素路径
// 成功返回true 失败返回false

await webBot.wheelMouseByXpath(xpath, deltaX, deltaY);
// 通过xpath 滚动鼠标
// 参数一 字符串型，元素路径
// 参数二 整型，水平滚动条移动的距离
// 参数三 整型，垂直滚动条移动的距离
// 成功返回true 失败返回false