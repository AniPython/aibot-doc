await windowsBot.saveScreenshot(hwnd, savePath, options = {});
// 截图保存
// 参数一 字符串/整型，窗口句柄
// 参数二 字符串类型，保存图片路径。
// 参数三 JSON类型，可选参数{{region:[left:number, top:number, right:number, bottom:number], threshold:[thresholdType:number, thresh:number, maxval:number], mode:boolean}} options
// region截图区域 [10, 20, 100, 200], 默认 hwnd对应的窗口
// threshold二值化图片, thresholdType算法类型：
//  0   THRESH_BINARY算法，当前点值大于阈值thresh时，取最大值maxva，否则设置为0
//  1   THRESH_BINARY_INV算法，当前点值大于阈值thresh时，设置为0，否则设置为最大值maxva
//  2   THRESH_TOZERO算法，当前点值大于阈值thresh时，不改变，否则设置为0
//  3   THRESH_TOZERO_INV算法，当前点值大于阈值thresh时，设置为0，否则不改变
//  4   THRESH_TRUNC算法，当前点值大于阈值thresh时，设置为阈值thresh，否则不改变
//  5   ADAPTIVE_THRESH_MEAN_C算法，自适应阈值
//  6   ADAPTIVE_THRESH_GAUSSIAN_C算法，自适应阈值
//  thresh阈值，maxval最大值，threshold默认保存原图。thresh和maxval同为255时灰度处理
// mode操作模式，后台 true，前台 false。默认前台操作
// 成功返回false，失败返回true

// 代码示例
// 截取窗口全屏，图片保存至d:\\1.png
let savePath = "d:\\1.png";
await windowsBot.saveScreenshot(hwnd, savePath);

// 二值化区域截图，区域起始坐标位置(10,20)，右下角坐标位置(100,200)。二值化使用THRESH_BINARY算法。阈值127，最大值255
let options = {region: [10, 20, 100, 100], threshold: [0, 127, 255]};
await windowsBot.saveScreenshot(hwnd, savePath, options);


await windowsBot.getColor(hwnd, x, y, mode = false);
// 获取指定坐标点的色值
// 参数一 字符串/整型，窗口句柄
// 参数二 整型，横坐标
// 参数三 整型，纵坐标
// 参数四 布尔型，操作模式，可选参数，后台 true，前台 false。默认前台操作
// 成功返回#开头的颜色值，失败返回null

await windowsBot.findImage(hwnd, imagePath, options = {});
// 找图
// 参数一 字符串/整型，窗口句柄
// 参数二 字符串，小图片路径
// 参数三 JSON类型，可选参数，{{region:[left:number, top:number, right:number, bottom:number], sim:number, threshold:[thresholdType:number, thresh:number, maxval:number], mode:boolean}} options
// region 指定区域找图 [10, 20, 100, 200]，region默认 hwnd对应的窗口
// sim浮点型 图片相似度 0.0-1.0，sim默认0.95
// threshold二值化图片, thresholdType算法类型：
//   0   THRESH_BINARY算法，当前点值大于阈值thresh时，取最大值maxva，否则设置为0
//   1   THRESH_BINARY_INV算法，当前点值大于阈值thresh时，设置为0，否则设置为最大值maxva
//   2   THRESH_TOZERO算法，当前点值大于阈值thresh时，不改变，否则设置为0
//   3   THRESH_TOZERO_INV算法，当前点值大于阈值thresh时，设置为0，否则不改变
//   4   THRESH_TRUNC算法，当前点值大于阈值thresh时，设置为阈值thresh，否则不改变
//   5   ADAPTIVE_THRESH_MEAN_C算法，自适应阈值
//   6   ADAPTIVE_THRESH_GAUSSIAN_C算法，自适应阈值
//   thresh阈值，maxval最大值，threshold默认保存原图。thresh和maxval同为255时灰度处理
// multi 找图数量，默认为1,找单个图片坐标
// mode 操作模式，后台 true，前台 false。默认前台操作
// 成功返回，单个坐标点 [{x:number, y:number}]，多坐标点图[{x1:number, y1:number}, {x2:number, y2:number}...] 失败返回null

// 代码示例
//全屏找图
let imagePath = "d:\\1.png";
await windowsBot.findImage(hwnd, imagePath);

// 区域+模糊 找图，区域起始坐标位置(10, 15)，右下角坐标位置(100, 100)。图片相似度设置为95%
let options = {region: [10, 15, 100, 100], sim: 0.95};
await windowsBot.findImage(hwnd, imagePath, options);

// 二值化，使用THRESH_BINARY算法，阈值127 最大值255。二值化找图需要在截图工具设置相同的算法、阈值和最大值
let options = {threshold: [0, 127, 255]};
await windowsBot.findImage(hwnd, imagePath, options);

// 找多张相同图片坐标，返回坐标数组。
let options = {multi: 3};
await windowsBot.findImage(hwnd, imagePath, options);


await windowsBot.findAnimation(hwnd, frameRate, options = {});
// 找动态图
// 参数一 字符串/整型，窗口句柄
// 参数二 整型，前后两张图相隔的时间，单位毫秒
// 参数三 JSON类型，可选参数，{{region:[left:number, top:number, right:number, bottom:number], mode:boolean}} options
// region 指定区域找图 [10, 20, 100, 200]，region默认 hwnd对应的窗口
// mode 操作模式，后台 true，前台 false。默认前台操作
// 成功返回，单个坐标点 [{x:number, y:number}]，多坐标点图[{x1:number, y1:number}, {x2:number, y2:number}...] 失败返回null

// 代码示例
// 在100毫秒内找出图片内变化的位置，其他参数参考findImage函数
await windowsBot.findAnimation(hwnd, 100);


await windowsBot.findColor(hwnd, mainColor, options = {});
// 查找指定色值的坐标点
// 参数一 字符串/整型，窗口句柄
// 参数二 字符串，#开头的色值
// 参数三 JSON类型，可选参数，{{subColors:[[offsetX:number, offsetY:number, strSubColor:string], ...], region:[left:number, top:number, right:number, bottom:numbe], sim:number, mode:boolean}} options
// subColors 相对于mainColor 的子色值，[[offsetX, offsetY, "#FFFFFF"], ...]，subColors默认为null
// region 指定区域找图 [10, 20, 100, 200]，region默认 hwnd对应的窗口
// sim相似度0.0-1.0，sim默认为1
// mode 操作模式，后台 true，前台 false。默认前台操作
// 成功返回{x:number, y:number} 失败返回null

// 代码示例
// 指定区域+模糊 找色。区域起始坐标位置(10, 20)，右下角坐标位置(100, 200)。颜色相似度设置为95%
let mainColor = "#ffff00";
let options = {region: [10, 20, 100, 200], sim: 0.95};
await windowsBot.findColor(hwnd, mainColor, options);

// 多点区域找色。区域起始坐标位置(10, 20)，右下角坐标位置(100, 200)。主颜色与3个子颜色 点的偏移坐标点。偏移点的计算(子颜色坐标点-主颜色坐标点)
let mainColor = "#ffff00";
let options = {region: [10, 20, 100, 200], subColors: [[8, 2, "#a09588"], [9, 5, "#ffffff"], [10, 6, "#ffdc92"]]};
await windowsBot.findColor(hwnd, mainColor, options);


await windowsBot.compareColor(hwnd, mainX, mainY, mainColor, options = {});
// 比较指定坐标点的颜色值
// 参数一 字符串/整型，窗口句柄
// 参数二 整型，主颜色所在的X坐标
// 参数三 整型，主颜色所在的Y坐标
// 参数四 字符串，#开头的色值
// 参数五 JSON类型，可选参数，{{subColors:[[offsetX:number, offsetY:number, strSubColor:string], ...], region:[left:number, top:number, right:number, bottom:number], sim:number, mode:boolean}} options
// subColors 相对于mainColor 的子色值，[[offsetX, offsetY, "#FFFFFF"], ...]，subColors默认为null
// region 指定区域找图 [10, 20, 100, 200]，region默认 hwnd对应的窗口
// sim相似度0.0-1.0，sim默认为1
// 成功返回true 失败返回 false

// 代码示例
// 多点+模糊比色，主颜色值"#ffff00" 坐标位置(100,150)。主颜色与3个子颜色 点的偏移坐标点。偏移点的计算(子颜色坐标点-主颜色坐标点)。颜色相似度98%
let options = {subColors: [[8, 2, "#a09588"], [9, 5, "#ffffff"], [10, 6, "#ffdc92"]], sim: 0.98};
await windowsBot.compareColor(hwnd, 100, 150, "#ffff00", options);
