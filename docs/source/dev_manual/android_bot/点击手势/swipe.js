await androidBot.swipe(startX, startY, endX, endY, duration);
// 滑动坐标
// 参数一 整型，起始横坐标
// 参数二 整型，起始纵坐标
// 参数三 整型，结束横坐标
// 参数四 整型，结束纵坐标
// 参数五 整型，滑动时长，单位毫秒
// 成功返回true 失败返回false

// 代码示例
// 滑动屏幕。起始坐标位置(100,150) 滑动至(200, 300)， 滑动时间2000毫秒
await androidBot.swipe(100, 150, 200, 300, 2000);
