await androidBot.dispatchGestures(gesturesPath);
// 执行多个手势
// 参数一 JSON类型，手势路径 {[[duration:number, [x:number, y:number], [x1:number, y1:number]...],[duration:number, [x:number, y:number], [x1:number, y1:number]...],...]}
// duration 手势时长
// 成功返回true 失败返回false

// 代码示例
// 执行多个手势，手势1，起始坐标位置(100,100) 至(200, 200) 手势时间1000毫秒。手势2，起始坐标位置(300,300) 至(500, 500) 手势时间1000毫秒
let gesturesPath = [
    [1000, [100, 100], [200, 200]],
    [1000, [300, 300], [500, 500]]
];
await androidBot.dispatchGestures(gesturesPath);