await windowsBot.moveMouse(hwnd, x, y, options = {});
// 移动鼠标
// 参数一 字符串/整型，窗口句柄
// 参数二 整型，横坐标
// 参数三 整型，纵坐标
// 参数四 JSON类型，可选参数{{mode:boolean, elementHwnd:string|number}} options 操作模式，后台 true，前台 false。默认前台操作。
// 如果mode值为true且目标控件有单独的句柄，则需要通过getElementWindow获得元素句柄，指定elementHwnd的值(极少应用窗口由父窗口响应消息，则无需指定)
// 总是返回true

// 代码示例
// 前台移动鼠标
await windowsBot.moveMouse(hwnd, 100, 200);

// 后台移动鼠标
await windowsBot.moveMouse(hwnd, 100, 200, {mode: true});


await windowsBot.moveMouseRelative(hwnd, x, y, mode = false);
// 移动鼠标(相对坐标)
// 参数一 字符串/整型，窗口句柄
// 参数二 整型，相对横坐标
// 参数三 整型，相对纵坐标
// 参数四 布尔型，操作模式，后台 true，前台 false。默认前台操作
// 总是返回true

await windowsBot.rollMouse(hwnd, x, y, dwData, mode = false);
// 滚动鼠标
// 参数一 字符串/整型，窗口句柄
// 参数二 整型，横坐标
// 参数三 整型，纵坐标
// 参数四 整型，鼠标滚动次数,负数下滚鼠标,正数上滚鼠标
// 参数五 布尔型，操作模式，后台 true，前台 false。默认前台操作
// 总是返回true

await windowsBot.clickMouse(hwnd, x, y, msg, options = {});
// 鼠标点击
// 参数一 字符串/整型，窗口句柄
// 参数二 整型，横坐标
// 参数三 整型，纵坐标
// 参数四 整型，点击类型，单击左键:1 单击右键:2 按下左键:3 弹起左键:4 按下右键:5 弹起右键:6 双击左键:7 双击右键:8
// 参数五 JSON类型，可选参数{{mode:boolean, elementHwnd:string|number}} options 操作模式，后台 true，前台 false。默认前台操作。
// 如果mode值为true且目标控件有单独的句柄，则需要通过getElementWindow获得元素句柄，指定elementHwnd的值(极少应用窗口由父窗口响应消息，则无需指定)
// 总是返回true。

// 代码示例
// 前台单击左键
let hwnd = await windowsBot.findWindow(null, "运行");
await windowsBot.clickMouse(hwnd, 100, 200, 1);

// 后台单击左键(目标坐标点没有单独的句柄)
await windowsBot.clickMouse(hwnd, 100, 200, 1, {mode: true});

// 后台单击左键(目标坐标点有单独的句柄)
let subHwnd = await windowsBot.getElementWindow(hwnd, "Window/Button[2]");
await windowsBot.clickMouse(hwnd, 100, 200, 1, {mode: true, elementHwnd: subHwnd});


await windowsBot.sendKeys(text);
// 输入文本
// 参数一 字符串型，输入的文本
// 总是返回true

await windowsBot.sendKeysByHwnd(hwnd, text);
// 后台输入文本(杀毒软件可能会拦截)
// 参数一 字符串/整型，窗口句柄，如果目标控件有单独的句柄，需要通过getElementWindow获得句柄
// 参数二 字符串型，输入的文本
// 总是返回true

// 代码示例
// 后台输入文本(目标坐标点有单独的句柄)
let hwnd = await windowsBot.findWindow(null, "运行");
let subHwnd = await windowsBot.getElementWindow(hwnd, "ComboBox/Edit");
await windowsBot.sendKeysByHwnd(subHwnd, "cmd");


await windowsBot.sendVk(bVk, msg);
// 输入虚拟键值(VK)
// 参数一 整型，VK键值
// 参数二 整型，输入类型，按下弹起:1 按下:2 弹起:3
// 总是返回true

await windowsBot.sendVkByHwnd(hwnd, bVk, msg);
// 后台输入虚拟键值(VK) (杀毒软件可能会拦截)
// 参数一 字符串/整型，窗口句柄，如果目标控件有单独的句柄，需要通过getElementWindow获得句柄
// 参数二 整型，VK键值
// 参数三 整型，输入类型，按下弹起:1 按下:2 弹起:3
// 总是返回true。若是后台组合键，可使用sendVk 按下控制键(Alt、Shift、Ctrl...)，再组合其他按键

// 代码示例
// 后台输入键盘"A"(目标坐标点有单独的句柄)
let hwnd = await windowsBot.findWindow(null, "运行");
let subHwnd = await windowsBot.getElementWindow(hwnd, "ComboBox/Edit");
await windowsBot.sendVkByHwnd(subHwnd, 0x41, 1);
