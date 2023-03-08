
await webBot.getWindowPos();
// 获取窗口位置和状态
// 成功返回矩形位置和窗口状态，失败返回null

await webBot.setWindowPos(windowState, rect = {left:0, top:0, width:0, height:0});
// 设置窗口位置和状态
// 参数一 字符串型，窗口状态，正常:"normal"  最小化:"minimized"  最大化:"maximized"  全屏:"fullscreen"
// 参数二 json类型，可选参数，浏览器窗口位置，此参数仅windowState 值为 "normal" 时有效
// 成功返回true，失败返回false
