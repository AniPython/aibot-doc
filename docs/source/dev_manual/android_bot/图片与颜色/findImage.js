await androidBot.findImage(imagePath, options = {});
// 找图
// 参数一 字符串，小图片路径（手机）
// 参数二 JSON类型，可选参数，{{region:[left:number, top:number, right:number, bottom:number], sim:number, threshold:[thresholdType:number, thresh:number, maxval:number]}} options
// region 指定区域找图 [10, 20, 100, 200]，region默认全屏
// sim浮点型 图片相似度 0.0-1.0，sim默认0.95
// threshold二值化图片, thresholdType算法类型：
//  0   THRESH_BINARY算法，当前点值大于阈值thresh时，取最大值maxva，否则设置为0
//  1   THRESH_BINARY_INV算法，当前点值大于阈值thresh时，设置为0，否则设置为最大值maxva
//  2   THRESH_TOZERO算法，当前点值大于阈值thresh时，不改变，否则设置为0
//  3   THRESH_TOZERO_INV算法，当前点值大于阈值thresh时，设置为0，否则不改变
//  4   THRESH_TRUNC算法，当前点值大于阈值thresh时，设置为阈值thresh，否则不改变
//  5   ADAPTIVE_THRESH_MEAN_C算法，自适应阈值
//  6   ADAPTIVE_THRESH_GAUSSIAN_C算法，自适应阈值
// thresh阈值，maxval最大值，threshold默认保存原图。thresh和maxval同为255时灰度处理
// multi 找图数量，默认为1,找单个图片坐标
// 成功返回，单个坐标点 [{x:number, y:number}]，多坐标点图[{x1:number, y1:number}, {x2:number, y2:number}...] 失败返回null
// 纯黑色小图，有bug？

// 获取颜色值代码示例
// 全屏找图
let imagePath = "/storage/emulated/0/Android/data/com.aibot.client/files/1.png";
await androidBot.findImage(imagePath);

// 区域+模糊 找图，区域起始坐标位置(10, 15)，右下角坐标位置(100, 100)。图片相似度设置为95%
let options = {region: [10, 15, 100, 100], sim: 0.95};
await androidBot.findImage(imagePath, options);

// 二值化，使用THRESH_BINARY算法，阈值127 最大值255。二值化找图需要在截图工具设置相同的算法、阈值和最大值
let options = {threshold: [0, 127, 255]};
await androidBot.findImage(imagePath, options);

// 找多张相同图片坐标，返回坐标数组
let options = {multi: 3};
await androidBot.findImage(imagePath, options);
