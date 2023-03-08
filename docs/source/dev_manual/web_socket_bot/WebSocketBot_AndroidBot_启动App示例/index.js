
const WebSocketBot = require('WebSocketBot');//引用WebSocketBot
const AndroidBot = require('AndroidBot');//引用AndroidBot模块

//构建WebSocketBot
let webSocketBot = WebSocketBot.build(async (data, isBinary) => {
    //解析客户端字符串格式数据
    //let strMsg = data.toString();

    //解析客户端json格式数据
    let jsonMsg = JSON.parse(data);
    let command = jsonMsg["command"];
    let msg = jsonMsg["data"];
    switch (command) {
        case "startApp":
            //遍历所有的androidBot 执行命令，可在循环内判断安卓androidId 选择设备执行
            for (let i = 0; i < webSocketBot.androidsBot.length; i++) {
                // let androidId = await webSocketBot.androidsBot[i].getAndroidId();
                // console.log(androidId);
                await webSocketBot.androidsBot[i].startApp(msg);
            }
            webSocketBot.sendData(command + "已执行");
            break;
    }
}, 8181);


//注册主函数，安卓端连接脚本会自动调用androidMain，并传递AndroidBot对象。设置服务端监听端口，手机端默认连接端口16678
AndroidBot.registerMain(androidMain, 16678);

/**用作代码提示，androidMain函数会被多次调用，注意使用全局变量
 * @param {AndroidBot} androidBot
 */
async function androidMain(androidBot) {
    //设置隐式等待
    await androidBot.setImplicitTimeout(5000);
    //获取安卓id
    let androidId = await androidBot.getAndroidId();

    //存入androidBot 和 androidId
    webSocketBot.androidsBot.push(androidBot);
    webSocketBot.androidsId.push(androidId);
}