await windowsBot.showWindow(hwnd, isShow);
// 参数一 字符串/整型，窗口句柄
// 参数二 布尔型，显示窗口 true， 隐藏窗口 false
// 成功返回true，失败返回false

await windowsBot.setWindowTop(hwnd, isTop);
// 设置窗口到最顶层
// 参数一 字符串/整型，窗口句柄
// 参数二 整型，是否置顶。true置顶， false取消置顶
// 成功返回true，失败返回false

await windowsBot.getWindowPos(hwnd);
// 获取窗口位置
// 参数一 字符串/整型，窗口句柄
// 成功返回窗口位置，失败返回null

await windowsBot.setWindowPos(hwnd, left, top, width, height);
// 设置窗口位置
// 参数一 字符串/整型，窗口句柄
// 参数二 整型，左上角横坐标
// 参数三 整型，左上角纵坐标
// 参数四 整型，窗口宽度
// 参数五 整型，窗口高度
// 成功返回true，失败返回 false