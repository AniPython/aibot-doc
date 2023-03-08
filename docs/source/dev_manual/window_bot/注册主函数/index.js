WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);
// 参数一 回调函数，要注册的函数，必须含一个参数，用作接收WindowsBot对象
// 参数二 字符串型， 脚本所在的地址，传递给WindowsDriver.exe。如果值为 "127.0.0.1"脚本会将参数 ip和port作为启动参数并启动WindowsDriver.exe，否则用户需要手动启动WindowsDriver.exe 并且提供启动参数。
// 命令行启动示例：WindowsDriver.exe "192.168.1.88" 26678
// 脚本多进程需要指定不同的端口！
// 参数三 整型，监听端口, WindowsDriver.exe。默认26678。WindowsDriver.exe会通过ip和port 连接脚本

// 代码示例
// 远程云端部署
WindowsBot.registerMain(windowsMain, "192.168.1.88", 26678);
