await windowsBot.findWindow(className, windowName);
// 查找窗口句柄，仅查找顶级窗口，不包含子窗口
// 参数一 字符串型，窗口类名
// 参数二 字符串型，窗口名
// 成功返回窗口句柄，失败返回null

// 代码示例
// 不同的应用中相同窗口类名比较常见，使用类名查找句柄要确保窗口类名唯一性
// 通过类名查找句柄
let hwnd = await windowsBot.findWindow("#32770", null);

//通过窗口名称查找句柄
let hwnd = await windowsBot.findWindow(null, "运行");

//通过窗口名称和类名查找句柄
let hwnd = await windowsBot.findWindow("#32770", "运行");


await windowsBot.findWindows(className, windowName);
// 查找窗口句柄数组，仅查找顶级窗口，不包含子窗口。className和windowNmae都为null，则返回所有窗口句柄
// 参数一 字符串型，窗口类名
// 参数二 字符串型，窗口名
// 成功返回窗口句柄数组，失败返回null

// 代码示例
//通过类名查找句柄数组
let hwnds = await windowsBot.findWindow("Chrome_WidgetWin_1", null);


await windowsBot.findSubWindow(curHwnd, className, windowName);
// 查找子窗口句柄
// 参数一 字符串/整型，当前窗口句柄
// 参数二 字符串型，窗口类名
// 参数三 字符串型，窗口名
// 成功返回窗口句柄，失败返回null

// 代码示例
// 查找指定窗口的子窗口句柄
let hwnd = await windowsBot.findWindow("#32770", "设备投屏1");
let subHwnd = await windowsBot.findSubWindow(hwnd, null, "001  GDBNW19A45831389");


await windowsBot.findParentWindow(curHwnd);
// 查找父窗口句柄
// 参数一 字符串/整型，当前窗口句柄
// 成功返回窗口句柄，失败返回null

await windowsBot.findDesktopWindow();
// 查找桌面窗口句柄
// 成功返回窗口句柄，失败返回null