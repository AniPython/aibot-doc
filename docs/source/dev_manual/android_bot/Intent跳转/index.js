await androidBot.openUri("alipayqr://platformapi/startapp?saId=10000007");
//跳转uri
//参数一 字符串类型，跳转链接
//成功返回true，失败返回 false

await androidBot.callPhone("10086");
//拨打电话
//参数一 字符串类型，拨打的电话号码
//成功返回true，失败返回 false

await androidBot.sendMsg("10086", "123")
//发送短信
//参数一 字符串类型，发送的电话号码
//参数二 字符串类型，短信内容
//成功返回true，失败返回 false