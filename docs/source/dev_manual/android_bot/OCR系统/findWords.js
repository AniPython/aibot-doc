await androidBot.findWords(words, options = {})
// 参数一 字符串类型，要查找的文字
// 参数二 JSON类型，可选参数 {region:[left:number, top:number, right:number, bottom:number], scale:number}} options
// region 指定区域 [10, 20, 100, 200]，region默认全屏
// threshold二值化图片, thresholdType算法类型：
//   0   THRESH_BINARY算法，当前点值大于阈值thresh时，取最大值maxva，否则设置为0
//   1   THRESH_BINARY_INV算法，当前点值大于阈值thresh时，设置为0，否则设置为最大值maxva
//   2   THRESH_TOZERO算法，当前点值大于阈值thresh时，不改变，否则设置为0
//   3   THRESH_TOZERO_INV算法，当前点值大于阈值thresh时，设置为0，否则不改变
//   4   THRESH_TRUNC算法，当前点值大于阈值thresh时，设置为阈值thresh，否则不改变
//   5   ADAPTIVE_THRESH_MEAN_C算法，自适应阈值
//   6   ADAPTIVE_THRESH_GAUSSIAN_C算法，自适应阈值
// thresh阈值，maxval最大值，threshold默认保存原图。thresh和maxval同为255时灰度处理
// scale浮点型 图片缩放率, 默认为 1.0 原大小。大于1.0放大，小于1.0缩小，不能为负数。仅在区域识别有效
// 成功功返回数组[{x:number, y:number}, ...]，文字所在的坐标点， 失败返回null


// 代码示例
// 区域找字
await androidBot.findWords("rpa", {region: [10, 20, 100, 200]});

// 二值化处理后找字
await androidBot.findWords('rpa', {threshold: [0, 100, 255]});
