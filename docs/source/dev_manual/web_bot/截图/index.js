
await webBot.takeScreenshot(xpath = null);
//参数一 字符串型，可选参数，元素路径。 如果指定元素路径，则截取元素图片。默认截取全屏
//返回字符串 base-64 编码。 PNG 格式，失败返回null

`
// 代码示例
// 截图并且保存图片到电脑
// const fs = require("fs"); //导入fs模块
let base64 = await webBot.takeScreenshot();
base64 = base64.replace(/^data:image\/\w+;base64,/,"");
let data = new Buffer.from(base64, "base64");
await fs.writeFileSync("d:\\1.png", data);
`
