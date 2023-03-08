
WebBot.registerMain(webMain, "127.0.0.1", 36678, {browserName:"chrome"});
// 参数一 函数行，要注册的函数，必须含一个参数，用作接收WebBot对象
// 参数二 字符串型，脚本所在的地址，传递给WebDriver.exe。如果值为 "127.0.0.1"脚本会将参数 ip和port作为启动参数并启动WebDriver.exe，否则用户需要手动启动WebDriver.exe 并且提供启动参数。
// 命令行启动示例：WebDriver.exe "{\"serverIp\":\"127.0.0.1\", \"serverPort\":26678, \"browserName\":\"chrome\", \"debugPort\":0, \"userDataDir\":\"./UserData\", \"browserPath\":\"null\", \"argument\":\"null\"}"
// 参数三 整型，监听端口，传递给WebDriver.exe。脚本多进程需要指定不同的端口
// 参数四 json对象，{{browserName:string, debugPort:number, userDataDir:string, browserPath:string, argument:string}} 可选参数
// browserName 浏览器名称，默认 chrome 浏览器。edge和chrome会自动寻找浏览器路径，其他浏览器需要指定browserPath。
// debugPort 调试端口。默认 0 随机端口。指定端口则接管已打开的浏览器。启动浏览器指定的参数 --remote-debugging-port=19222 --user-data-dir=C:\\Users\\电脑用户名\\AppData\\Local\\Google\\Chrome\\User Data
// userDataDir 用户数据目录,默认./UserData。多进程同时操作多个浏览器数据目录不能相同。第一次指定数据目录路径会进入浏览器欢迎界面，第二次恢复正常操作
// browserPath 浏览器路径
// argument 浏览器启动参数。例如：无头模式: --headless   设置代理：--proxy-server=127.0.0.1:8080，多个启动参数空格隔开

`
// 代码示例
//指定调试端口，接管已打开的浏览器。启动浏览器指定的参数 --remote-debugging-port=19222 --user-data-dir=C:\\Users\\电脑用户名\\AppData\\Local\\Google\\Chrome\\User Data
await WebBot.registerMain(webMain, "127.0.0.1", 36678, {browserName:"chrome", debugPort:19222});//debugPort:19222 必须和 --remote-debugging-port=19222 端口对应

//指定浏览器路径
await WebBot.registerMain(webMain, "127.0.0.1", 36678, {browserName:"360浏览器", browserPath:"D:\\Program Files\\360se.exe"});

//启动参数指定User-Agent
await WebBot.registerMain(webMain, "127.0.0.1", 36678, {browserName:"chrome", argument:"--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"});

//云端远程部署
await WebBot.registerMain(webMain, "192.168.1.88", 36678, {browserName:"chrome"});
`