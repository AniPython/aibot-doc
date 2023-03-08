// 比色
await androidBot.compareColor(mainX, mainY, mainColor, options = {});
// 参数一 整型，主颜色所在的X坐标
// 参数二 整型，主颜色所在的Y坐标
// 参数三 字符串，#开头的色值
// 参数四 JSON类型，可选参数，{{subColors:[[offsetX:number, offsetY:number, strSubColor:string], ...], region:[left:number, top:number, right:number, bottom:number], sim:number}} options
// subColors 相对于mainColor 的子色值，[[offsetX, offsetY, "#FFFFFF"], ...]，subColors默认为null
// region 指定区域找图 [10, 20, 100, 200]，region默认全屏
// sim相似度0.0-1.0，sim默认为1
// 成功返回true 失败返回 false

// 比色代码示例
// 多点+模糊比色，主颜色值"#ffff00" 坐标位置(100,150)。主颜色与3个子颜色 点的偏移坐标点。偏移点的计算(子颜色坐标点-主颜色坐标点)。颜色相似度98%
let options = {subColors: [[8, 2, "#a09588"], [9, 5, "#ffffff"], [10, 6, "#ffdc92"]], sim: 0.98};
await androidBot.compareColor(100, 150, "#ffff00", options);