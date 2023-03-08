const WindowsBot = require('WindowsBot');//引用WindowsBot模块
const WebBot = require('WebBot');//引用WebBot模块

//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);
WebBot.registerMain(webMain, "127.0.0.1", 36678, {browserName: "chrome"});

//bot 存放全局变量
let gWindowsBot;
let gWebBot;

//回调函数接受存放驱动Bot
async function windowsMain(windowsBot) {
    gWindowsBot = windowsBot;
}

async function webMain(webBot) {
    gWebBot = webBot;
}


/**用作代码提示
 * @param {WindowsBot} windowsBot
 * @param {WebBot} webBot
 */
async function main(windowsBot, webBot) {
    //WebBot和WindowsBot 大多数都是本地启动驱动程序，因此只有一个驱动对象，我们可以采用此方式处理。
    //如果WebBot或者WindowsBot其中有采用云端远程连接方式，我们可以参考下面的 WindowsBot & AndroidBot 实现方案

    //为null，等待再赋值
    if (windowsBot == null || webBot == null) {
        await WindowsBot.sleep(3000);
        windowsBot = gWindowsBot;
        webBot = gWebBot;
    }

    //设置隐式等待
    await windowsBot.setImplicitTimeout(5000);
    await webBot.setImplicitTimeout(5000);

    //实现功能...
}

main(gWindowsBot, gWebBot);//自定义主函数，并且传递windowsBot 和webBot