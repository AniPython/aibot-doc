await androidBot.saveScreenshot(savePath, options = {});
// 参数一 字符串类型，保存图片路径。建议存放在手机 /storage/emulated/0/Android/data/com.aibot.client/files/ 目录下
// 参数二 JSON类型，可选参数{{region:[left:number, top:number, right:number, bottom:number], threshold:[thresholdType:number, thresh:number, maxval:number]}} options
// region截图区域 [10, 20, 100, 200], 默认全屏
// threshold二值化图片, thresholdType算法类型：
//   0 THRESH_BINARY算法，当前点值大于阈值thresh时，取最大值maxva，否则设置为0
//   1 THRESH_BINARY_INV算法，当前点值大于阈值thresh时，设置为0，否则设置为最大值maxva
//   2 THRESH_TOZERO算法，当前点值大于阈值thresh时，不改变，否则设置为0
//   3 THRESH_TOZERO_INV算法，当前点值大于阈值thresh时，设置为0，否则不改变
//   4 THRESH_TRUNC算法，当前点值大于阈值thresh时，设置为阈值thresh，否则不改变
//   5 ADAPTIVE_THRESH_MEAN_C算法，自适应阈值
//   6 ADAPTIVE_THRESH_GAUSSIAN_C算法，自适应阈值
// thresh阈值，maxval最大值，threshold默认保存原图。thresh和maxval同为255时灰度处理
// 成功返回false，失败返回true

// 截图保存代码示例
// 截取全屏，图片保存至/storage/emulated/0/Android/data/com.aibot.client/files/1.png
let savePath = "/storage/emulated/0/Android/data/com.aibot.client/files/1.png";
await androidBot.saveScreenshot(savePath);

// 二值化区域截图，区域起始坐标位置(10,20)，右下角坐标位置(100,200)。二值化使用THRESH_BINARY算法。阈值127，最大值255
let options = {region: [10, 20, 100, 100], threshold: [0, 127, 255]};
await androidBot.saveScreenshot(savePath, options);
