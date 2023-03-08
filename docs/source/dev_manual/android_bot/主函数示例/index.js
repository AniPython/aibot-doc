const AndroidBot = require('AndroidBot');  // 引用AndroidBot模块

// 注册主函数，安卓端连接脚本会自动调用androidMain，并传递AndroidBot对象。设置服务端监听端口，手机端默认连接端口16678
AndroidBot.registerMain(androidMain, 16678);

/**用作代码提示，androidMain函数会被多次调用，注意使用全局变量
 * @param {AndroidBot} androidBot
 */
async function androidMain(androidBot) {
    await androidBot.setImplicitTimeout(3000);  // 设置隐式等待时间
    let point = await androidBot.findColor("#0e76b1");  // 查找指定颜色值坐标点
    console.log(point);
}