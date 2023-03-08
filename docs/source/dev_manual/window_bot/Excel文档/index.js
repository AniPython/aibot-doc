
await windowsBot.openExcel(excelPath);
// 打开excel文档
// 参数一 字符串，excle路径
// 成功返回excel对象，失败返回null

await windowsBot.openExcelSheet(excelObject, sheetName);
// 打开excel表格
// 参数一 对象，excel对象
// 参数二 字符串，表名
// 成功返回sheet对象，失败返回null

await windowsBot.saveExcel(excelObject);
// 保存/关闭excel文档
// 参数一 对象，excel对象
// 成功返回true，失败返回false

await windowsBot.writeExcelNum(sheetObject, row, col, value);
// 写入数字到excel表格
// 参数一 对象，sheet对象
// 参数二 整型，行
// 参数三 整型，列
// 参数四 数字型，写入的值
// 成功返回true，失败返回false

await windowsBot.writeExcelStr(sheetObject, row, col, strValue);
// 写入字串到excel表格
// 参数一 对象，sheet对象
// 参数二 整型，行
// 参数三 整型，列
// 参数四 字符串，写入的值
// 成功返回true，失败返回false

await windowsBot.readExcelNum(sheetObject, row, col);
// 读取excel表格数字
// 参数一 对象，sheet对象
// 参数二 整型，行
// 参数三 整型，列
// 返回读取到的数字

await windowsBot.readExcelStr(sheetObject, row, col);
// 读取excel表格字串
// 参数一 对象，sheet对象
// 参数二 整型，行
// 参数三 整型，列
// 返回读取到的字符

await windowsBot.removeExcelRow(sheetObject, rowFirst, rowLast);
// 删除excel表格行
// 参数一 对象，sheet对象
// 参数二 整型，起始行
// 参数三 整型，结束行
// 成功返回true，失败返回false

await windowsBot.removeExcelCol(sheetObject, colFirst, colLast);
// 删除excel表格列
// 参数一 对象，sheet对象
// 参数二 整型，起始列
// 参数三 整型，结束列
// 成功返回true，失败返回false

// 代码示例
// 打开excel
let excelPath = "d:\\1.xlsx";
let excelObject = await windowsBot.openExcel(excelPath);

// 打开/创建表
let sheetName = "第1张表";
let sheetObject = await windowsBot.openExcelSheet(excelObject, sheetName);

// 写入字符串到第一个表格
await windowsBot.writeExcelStr(sheetObject, 0, 0, "aibote RPA");

// 读取第一个表格内容
let text = await windowsBot.readExcelStr(sheetObject, 0, 0);
console.log(text);

// 保存/关闭excel。如果再次操作需要重新调用openExcel、openExcelSheet 函数
await windowsBot.saveExcel(excelObject);
