
await webBot.executeScript(script);
// 执行JavaScript 代码
// 参数一 字符串型，注入的js代码
// 假如注入代码为函数且有return语句，则返回retrun 的值，否则返回null;  注入示例：(function () {return "aibote rpa"})();
// 注入的代码含有反斜杠"\"需要转义"\\"


` 
// 代码示例
// 注入js代码
await webBot.executeScript('alert("aibote")');

// 注入js代码并返回值
let ret = await webBot.executeScript('(function () {return "aibote rpa"})();');
console.log(ret);//输出aibote rpa
`