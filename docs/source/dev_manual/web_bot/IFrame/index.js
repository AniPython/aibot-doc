await webBot.switchFrame(xpath);
// 切换frame
// 参数一 字符串型，要切换frame的元素路径。
// 成功返回true，失败返回false

`
// 代码示例
// 切换iframe
let xpath = "/html/body/div[3]/div[3]/div[1]/div/div[3]/div[1]/div[1]/iframe";
await webBot.switchFrame(xpath);
`

await webBot.switchMainFrame();
// 切换主frame，人为关闭/切换页面也需要通过此函数切换到当前页面
// 成功返回true，失败返回false

