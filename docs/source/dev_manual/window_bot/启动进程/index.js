await windowsBot.startProcess(commandLine, showWindow = true, isWait = false);
// 参数一 字符串型，启动命令行
// 参数二 布尔型，是否显示窗口。可选参数,默认显示窗口
// 参数三 布尔型，是否等待程序结束。可选参数,默认不等待
// 成功返回true,失败返回false

// 代码示例
// 后台启动应用程序
await windowsBot.startProcess("d:\\Aibote\\Aibote.exe", false, false);

// 启动cmd.exe 指定启动参数
await windowsBot.startProcess("cmd.exe netstat-an", true, false);

// 启动cmd.exe 指定启动参数并且等待进程关闭
await windowsBot.startProcess("cmd.exe netstat-an", true, true);
