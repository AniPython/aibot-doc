// 找动态图
await androidBot.findAnimation(frameRate, options = {});
// 参数一 整型，前后两张图相隔的时间，单位毫秒
// 参数二 JSON类型，可选参数，{{region:[left:number, top:number, right:number, bottom:number]}} options
// region 指定区域找图 [10, 20, 100, 200]，region默认全屏
// 成功返回，单个坐标点 [{x:number, y:number}]，多坐标点图[{x1:number, y1:number}, {x2:number, y2:number}...] 失败返回null

// 找动态图代码示例
// 在100毫秒内找出图片内变化的位置，其他参数参考findImage函数
await androidBot.findAnimation(100);