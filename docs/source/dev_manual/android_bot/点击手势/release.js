await androidBot.release();
// 手指抬起
// 成功返回true 失败返回false

// 代码示例
// 拖动操作，起始坐标位置(100,150) 拖动至(200, 300)， 拖动时间1000毫秒
await androidBot.press(100, 150, 10);
await androidBot.move(200, 300, 1000);
await androidBot.release();