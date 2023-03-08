await androidBot.dispatchGesture(gesturePath, duration);
// 执行手势
// 参数一 JSON类型，手势路径 {[[x:number, y:number], [x1:number, y1:number]...]}
// 参数二 整型，手势时长，单位毫秒
// 成功返回true 失败返回false

// 代码示例
// 执行手势，起始坐标位置(100,150) 至(200, 300)最后滑动至(300, 500) 手势时间3000毫秒
let gesturePath = [[100, 150], [200, 300], [300, 500]];
await androidBot.dispatchGesture(gesturePath, 3000);
