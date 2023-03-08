await windowsBot.executeCommand(command, waitTimeout = 300);
// 此函数用于获取cmd执行结果，函数执行完毕会自动关闭启动的相关进程
// 参数一 字符串型，cmd命令，不能含 "cmd"字串
// 参数二 整型，可选参数，等待结果返回超时，单位毫秒，默认300毫秒
// 返回cmd执行结果

// 代码示例
// 执行cmd 等待3000毫秒返回结果
await windowsBot.executeCommand("ping www.baidu.com", 3000);
