const WindowsBot = require('WindowsBot');//引用WindowsBot模块
const WebSocketBot = require('WebSocketBot');//引用WebSocketBot

let gWindowsBot = null;//定义全局变量，存放WindowsBot对象

//构建WebSocketBot
let webSocketBot = WebSocketBot.build(async (data, isBinary) => {
    //解析客户端字符串格式数据
    //let strMsg = data.toString();


    //通过全局windowsBot获取聊天窗口句柄
    let hwnd = await gWindowsBot.findWindow(null, "Ai-Bot 3群");

    //解析客户端json格式数据
    let jsonMsg = JSON.parse(data);
    let command = jsonMsg["command"];
    let msg = jsonMsg["data"];
    switch (command) {
        case "sendMessage":
            await gWindowsBot.sendKeysByHwnd(hwnd, msg);
            await gWindowsBot.clickElement(hwnd, "Button@name=发送(&S)", 1);
            webSocketBot.sendData("已发送" + msg);
            break;
    }
}, 8181);


//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);

/**用作代码提示，windowsMain函数会被多次调用，注意使用全局变量
 * @param {WindowsBot} windowsBot
 */
async function windowsMain(windowsBot) {
    //设置隐式等待
    await windowsBot.setImplicitTimeout(5000);

    gWindowsBot = windowsBot;//赋值给全局变量
}