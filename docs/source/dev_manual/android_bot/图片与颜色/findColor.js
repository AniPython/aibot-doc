// 找色
await androidBot.findColor(mainColor, options = {});
// 参数一 字符串，#开头的色值
// 参数二 JSON类型，可选参数，{{subColors:[[offsetX:number, offsetY:number, strSubColor:string], ...], region:[left:number, top:number, right:number, bottom:numbe], sim:number}} options
// subColors 相对于mainColor 的子色值，[[offsetX, offsetY, "#FFFFFF"], ...]，subColors默认为null
// region 指定区域找图 [10, 20, 100, 200]，region默认全屏
// sim相似度0.0-1.0，sim默认为1
// 成功返回{x:number, y:number} 失败返回null

// 找色代码示例1
// 指定区域+模糊 找色。区域起始坐标位置(10, 20)，右下角坐标位置(100, 200)。颜色相似度设置为95%
let mainColor = "#ffff00";
let options = {region: [10, 20, 100, 200], sim: 0.95};
await androidBot.findColor(mainColor, options);

// 找色代码示例2
// 多点区域找色。区域起始坐标位置(10, 20)，右下角坐标位置(100, 200)。主颜色与3个子颜色 点的偏移坐标点。偏移点的计算(子颜色坐标点-主颜色坐标点)
let mainColor = "#ffff00";
let options = {region: [10, 20, 100, 200], subColors: [[8, 2, "#a09588"], [9, 5, "#ffffff"], [10, 6, "#ffdc92"]]};
await androidBot.findColor(mainColor, options);