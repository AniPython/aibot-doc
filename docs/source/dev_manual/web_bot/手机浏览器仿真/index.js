
await webBot.mobileEmulation(width, height, userAgent, platform, platformVersion, acceptLanguage = "", timezoneId = "", latitude = 0, longitude = 0, accuracy = 0);
//参数一 整型，宽度
//参数二 整型，高度
//参数三 字符串型，用户代理
//参数四 字符串型，系统平台
//参数五 字符串型，系统平台版本号
//参数六 字符串型，可选参数，语言
//参数七 字符串型，可选参数，时区标识
//参数八 浮点型，可选参数，纬度
//参数九 浮点型，可选参数，经度
//参数十 浮点型，可选参数，准确度
//成功返回true，失败返回false

`
// 代码示例
// 模拟 Android 7.0  地理位置 上海
await webBot.mobileEmulation(500, 800, "Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36",
                            "Android", "7.0", "zh-Hans-CN", "Asia/Shanghai", 31.230416, 121.473701, 1111);
`