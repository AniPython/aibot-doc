# 使用须知
````javascript
Aibote是江西爱伯特科技自主研发的一款纯代码RPA办公自动化框架，支持Android、Browser和Windows 三大平台。框架免费、API和接口协议开源，个人、企业商用零费用
以socket tcp接口协议通信方式命令驱动，因此支持任何一门计算机语言调用，官方目前采用Node.js封装了一套SDK供开发者直接使用
Node.js拥有npm强大社区库，功能非常多，能够满足个人、企业办公自动化所有场景
OEM或特殊接口定制等商业合作联系QQ：1600381943

Aibote能力：
        1、AndroidBot，底层自主研发，支持安卓原生APP和H5界面元素和图色定位。元素元素定位速度是Appium框架的的10倍，2340*1080 图色定位仅需要50毫秒！
        2、WindowsBot，底层自主研发，支持Windows应用、.NET、WinForm、WPF、QT、JAVA(Swing和AWT等GUI库)和Electron 等语言开发的窗口界面元素和图色定位，独家xpath算法 简洁急速，
        元素/图色定位速度分别是可视化RPA的3倍和20倍！
        3、WebBot，底层自主研发，支持chromium内核的所有浏览器和应用。C/C++语言基于浏览器内核协议研发而成的一款web自动化框架。速度是selenium 10倍！
        4、Android远程投屏，底层自主研发，可在一台电脑监控观察多台安卓RPA机器人运行状态并批量管理操作
        5、自建OCR服务器，支持文字识别和定位，免费且不限制使用次数！
        6、自研AiboteScriptUI界面开发工具，提供人机交互功能，打包exe发布机器人可以在离线环境运行！

注意事项：
        1、下载Aibote全部解压出来，尽量不包含中文路径。第一次启动Aibote.exe会自动设置环境变量及Node依赖，开发者不必再安装Node
        2、Node.js SDK开源API存放 Aibote/Project/node_modules 目录下，涵盖AndroidBot、WebBot和WindowsBot，因此开发者应在Project目录下创建项目文件
        3、Node.js开发者建议使用Vs Code IDE作为开发工具，Windows 10/11系统必须以管理员权限启动Vs Code，否则因权限不足问题导致部分函数失效
        4、Node.js引入第三方库应当切入到Aibote根目录(非Project目录)，再使用 npm instll xxx  安装。
````

# 拾取元素工具使用方法
````javascript
Android 工具位置，Aibote/Aibote.exe->菜单项->脚本工具
Windows 工具位置，Aibote/WindowsTool.exe

Android 元素拾取工具，需要在手机端，勾选连接工具端选项

Windows 元素拾取工具，按下CTRL键，暂停拾取。支持鼠标左键/中键拾取

拾取元素注意窗口元素穿透现象

使用方法：
1、点击"+"按钮 单击手机投屏/windows 窗口，拾取元素和颜色信息。单击目标点会在右和下扩增20个像素点，用作放大目标位置。 再点击预览图片控件可拾取放大后 点的颜色值和坐标

2、点击"+"按钮 在手机投屏/windows 窗口滑动矩形大小，拾取元素和图片信息。截图前输入图片名称。Android端，图片保存在手机/storage/emulated/0/Android/data/com.aibot.client/files/
（根目录：/storage/emulated/0/）。Windows端，图片保存在指定路径目录，如果图片名称不包含路径，则默认保存在Aibote/Picture/windows

3、二值化阈值和最大值在0-255之间，阈值和最大值都为255时灰度化处理

4、BINARY算法，当前点值大于阈值thresh时，取最大值maxva，否则设置为0

5、BINARY_INV算法，当前点值大于阈值thresh时，设置为0，否则设置为最大值maxva

6、TOZERO算法，当前点值大于阈值thresh时，不改变，否则设置为0

7、TOZERO_INV算法，当前点值大于阈值thresh时，设置为0，否则不改变

8、TRUNC算法，当前点值大于阈值thresh时，设置为阈值thresh，否则不改变

9、ADAPTIVE_THRESH_MEAN_C算法，自适应阈值

10、ADAPTIVE_THRESH_GAUSSIAN_C算法，自适应阈值
````

# AndoridBot开发手册
## 主函数示例
````javascript
const AndroidBot = require('AndroidBot');//引用AndroidBot模块

//注册主函数，安卓端连接脚本会自动调用androidMain，并传递AndroidBot对象。设置服务端监听端口，手机端默认连接端口16678
AndroidBot.registerMain(androidMain, 16678);
/**用作代码提示，androidMain函数会被多次调用，注意使用全局变量
* @param {AndroidBot} androidBot
*/
async function androidMain(androidBot){
    await androidBot.setImplicitTimeout(3000);//设置隐式等待时间
	let point = await androidBot.findColor("#0e76b1");//查找指定颜色值坐标点
    console.log(point);
}
````
## 等待超时
````javascript
await androidBot.sleep(3000);
//显示等待
//参数一 整型，等待时间，单位毫秒

await androidBot.setImplicitTimeout(waitMs, intervalMs = 5);
//隐式等待
//参数一 整型，等待时间，单位毫秒
//参数二 整型，心跳间隔，单位毫秒。可选参数，默认5毫秒
//作用全局，程序起始设置一次即可。并发会影响实际等待时间
````

## 图片与颜色
````javascript
await androidBot.saveScreenshot(savePath, options = {});
//截图保存
//参数一 字符串类型，保存图片路径。建议存放在手机 /storage/emulated/0/Android/data/com.aibot.client/files/ 目录下
//参数二 JSON类型，可选参数{{region:[left:number, top:number, right:number, bottom:number], threshold:[thresholdType:number, thresh:number, maxval:number]}} options 
//region截图区域 [10, 20, 100, 200], 默认全屏
//threshold二值化图片, thresholdType算法类型：
//                                            0   THRESH_BINARY算法，当前点值大于阈值thresh时，取最大值maxva，否则设置为0
//                                            1   THRESH_BINARY_INV算法，当前点值大于阈值thresh时，设置为0，否则设置为最大值maxva
//                                            2   THRESH_TOZERO算法，当前点值大于阈值thresh时，不改变，否则设置为0
//                                            3   THRESH_TOZERO_INV算法，当前点值大于阈值thresh时，设置为0，否则不改变
//                                            4   THRESH_TRUNC算法，当前点值大于阈值thresh时，设置为阈值thresh，否则不改变
//                                            5   ADAPTIVE_THRESH_MEAN_C算法，自适应阈值
//                                            6   ADAPTIVE_THRESH_GAUSSIAN_C算法，自适应阈值
//                                            thresh阈值，maxval最大值，threshold默认保存原图。thresh和maxval同为255时灰度处理
//成功返回false，失败返回true

''' 代码示例
//截取全屏，图片保存至/storage/emulated/0/Android/data/com.aibot.client/files/1.png
let savePath = "/storage/emulated/0/Android/data/com.aibot.client/files/1.png";
await androidBot.saveScreenshot(savePath);

//二值化区域截图，区域起始坐标位置(10,20)，右下角坐标位置(100,200)。二值化使用THRESH_BINARY算法。阈值127，最大值255
let options = {region:[10, 20, 100, 100], threshold:[0, 127, 255]};
await androidBot.saveScreenshot(savePath, options);
'''


await androidBot.getColor(x, y);
//获取颜色值
//参数一 整型，横坐标
//参数二 整型，纵坐标
//成功返回#开头的颜色值，失败返回null

await androidBot.findImage(imagePath, options = {});
//找图
//参数一 字符串，小图片路径（手机）
//参数二 JSON类型，可选参数，{{region:[left:number, top:number, right:number, bottom:number], sim:number, threshold:[thresholdType:number, thresh:number, maxval:number]}} options
//region 指定区域找图 [10, 20, 100, 200]，region默认全屏
//sim浮点型 图片相似度 0.0-1.0，sim默认0.95
//threshold二值化图片, thresholdType算法类型：
//                                            0   THRESH_BINARY算法，当前点值大于阈值thresh时，取最大值maxva，否则设置为0
//                                            1   THRESH_BINARY_INV算法，当前点值大于阈值thresh时，设置为0，否则设置为最大值maxva
//                                            2   THRESH_TOZERO算法，当前点值大于阈值thresh时，不改变，否则设置为0
//                                            3   THRESH_TOZERO_INV算法，当前点值大于阈值thresh时，设置为0，否则不改变
//                                            4   THRESH_TRUNC算法，当前点值大于阈值thresh时，设置为阈值thresh，否则不改变
//                                            5   ADAPTIVE_THRESH_MEAN_C算法，自适应阈值
//                                            6   ADAPTIVE_THRESH_GAUSSIAN_C算法，自适应阈值
//                                            thresh阈值，maxval最大值，threshold默认保存原图。thresh和maxval同为255时灰度处理
//multi 找图数量，默认为1,找单个图片坐标
//成功返回，单个坐标点 [{x:number, y:number}]，多坐标点图[{x1:number, y1:number}, {x2:number, y2:number}...] 失败返回null
//纯黑色小图，有bug？

''' 代码示例
//全屏找图
let imagePath = "/storage/emulated/0/Android/data/com.aibot.client/files/1.png";
await androidBot.findImage(imagePath);

//区域+模糊 找图，区域起始坐标位置(10, 15)，右下角坐标位置(100, 100)。图片相似度设置为95%
let options = {region:[10, 15, 100, 100], sim:0.95};
await androidBot.findImage(imagePath, options);

//二值化，使用THRESH_BINARY算法，阈值127 最大值255。二值化找图需要在截图工具设置相同的算法、阈值和最大值
let options = {threshold:[0, 127, 255]};
await androidBot.findImage(imagePath, options);

//找多张相同图片坐标，返回坐标数组
let options = {multi:3};
await androidBot.findImage(imagePath, options);
'''


await androidBot.findAnimation(frameRate, options = {});
//找动态图
//参数一 整型，前后两张图相隔的时间，单位毫秒
//参数二 JSON类型，可选参数，{{region:[left:number, top:number, right:number, bottom:number]}} options
//region 指定区域找图 [10, 20, 100, 200]，region默认全屏
//成功返回，单个坐标点 [{x:number, y:number}]，多坐标点图[{x1:number, y1:number}, {x2:number, y2:number}...] 失败返回null

''' 代码示例
//在100毫秒内找出图片内变化的位置，其他参数参考findImage函数
await androidBot.findAnimation(100);
'''


await androidBot.findColor(mainColor, options = {});
//找色
//参数一 字符串，#开头的色值
//参数二 JSON类型，可选参数，{{subColors:[[offsetX:number, offsetY:number, strSubColor:string], ...], region:[left:number, top:number, right:number, bottom:numbe], sim:number}} options
//subColors 相对于mainColor 的子色值，[[offsetX, offsetY, "#FFFFFF"], ...]，subColors默认为null
//region 指定区域找图 [10, 20, 100, 200]，region默认全屏
//sim相似度0.0-1.0，sim默认为1
//成功返回{x:number, y:number} 失败返回null

''' 代码示例
//指定区域+模糊 找色。区域起始坐标位置(10, 20)，右下角坐标位置(100, 200)。颜色相似度设置为95%
let mainColor = "#ffff00";
let options = {region:[10, 20, 100, 200], sim:0.95};
await androidBot.findColor(mainColor, options);

//多点区域找色。区域起始坐标位置(10, 20)，右下角坐标位置(100, 200)。主颜色与3个子颜色 点的偏移坐标点。偏移点的计算(子颜色坐标点-主颜色坐标点)
let mainColor = "#ffff00";
let options = {region:[10, 20, 100, 200], subColors:[[8, 2, "#a09588"], [9, 5, "#ffffff"], [10, 6, "#ffdc92"]]};
await androidBot.findColor(mainColor, options);
'''


await androidBot.compareColor(mainX, mainY, mainColor, options = {});
//比色
//参数一 整型，主颜色所在的X坐标
//参数二 整型，主颜色所在的Y坐标
//参数三 字符串，#开头的色值
//参数四 JSON类型，可选参数，{{subColors:[[offsetX:number, offsetY:number, strSubColor:string], ...], region:[left:number, top:number, right:number, bottom:number], sim:number}} options
//subColors 相对于mainColor 的子色值，[[offsetX, offsetY, "#FFFFFF"], ...]，subColors默认为null
//region 指定区域找图 [10, 20, 100, 200]，region默认全屏
//sim相似度0.0-1.0，sim默认为1
//成功返回true 失败返回 false

''' 代码示例
//多点+模糊比色，主颜色值"#ffff00" 坐标位置(100,150)。主颜色与3个子颜色 点的偏移坐标点。偏移点的计算(子颜色坐标点-主颜色坐标点)。颜色相似度98%
let options = {subColors:[[8, 2, "#a09588"], [9, 5, "#ffffff"], [10, 6, "#ffdc92"]], sim:0.98};
await androidBot.compareColor(100, 150, "#ffff00", options);
'''
````
## OCR系统
````javascript
await androidBot.findWords(words, options = {})
//找字
//参数一 字符串类型，要查找的文字
//参数二 JSON类型，可选参数 {region:[left:number, top:number, right:number, bottom:number], scale:number}} options
//region 指定区域 [10, 20, 100, 200]，region默认全屏
//threshold二值化图片, thresholdType算法类型：
//                                          0   THRESH_BINARY算法，当前点值大于阈值thresh时，取最大值maxva，否则设置为0
//                                          1   THRESH_BINARY_INV算法，当前点值大于阈值thresh时，设置为0，否则设置为最大值maxva
//                                          2   THRESH_TOZERO算法，当前点值大于阈值thresh时，不改变，否则设置为0
//                                          3   THRESH_TOZERO_INV算法，当前点值大于阈值thresh时，设置为0，否则不改变
//                                          4   THRESH_TRUNC算法，当前点值大于阈值thresh时，设置为阈值thresh，否则不改变
//                                          5   ADAPTIVE_THRESH_MEAN_C算法，自适应阈值
//                                          6   ADAPTIVE_THRESH_GAUSSIAN_C算法，自适应阈值
//                    thresh阈值，maxval最大值，threshold默认保存原图。thresh和maxval同为255时灰度处理
//scale浮点型 图片缩放率, 默认为 1.0 原大小。大于1.0放大，小于1.0缩小，不能为负数。仅在区域识别有效
//成功功返回数组[{x:number, y:number}, ...]，文字所在的坐标点， 失败返回null

''' 代码示例
//区域找字
await androidBot.findWords("rpa", {region:[10, 20, 100, 200]});

//二值化处理后找字
await androidBot.findWords('rpa', {threshold:[0, 100, 255]});
'''


await androidBot.getWords(options = {})
//获取屏幕文字
//参数一 JSON类型，可选参数 {region:[left:number, top:number, right:number, bottom:number], scale:number}} options
//region 指定区域 [10, 20, 100, 200]，region默认全屏
//threshold二值化图片, thresholdType算法类型：
//                                          0   THRESH_BINARY算法，当前点值大于阈值thresh时，取最大值maxva，否则设置为0
//                                          1   THRESH_BINARY_INV算法，当前点值大于阈值thresh时，设置为0，否则设置为最大值maxva
//                                          2   THRESH_TOZERO算法，当前点值大于阈值thresh时，不改变，否则设置为0
//                                          3   THRESH_TOZERO_INV算法，当前点值大于阈值thresh时，设置为0，否则不改变
//                                          4   THRESH_TRUNC算法，当前点值大于阈值thresh时，设置为阈值thresh，否则不改变
//                                          5   ADAPTIVE_THRESH_MEAN_C算法，自适应阈值
//                                          6   ADAPTIVE_THRESH_GAUSSIAN_C算法，自适应阈值
//                    thresh阈值，maxval最大值，threshold默认保存原图。thresh和maxval同为255时灰度处理
//scale浮点型 图片缩放率, 默认为 1.0 原大小。大于1.0放大，小于1.0缩小，不能为负数。仅在区域识别有效
//成功返回手机上的文字, 失败返回null
````
## 点击手势
````javascript
await androidBot.press(x, y, duration);
//手指按下
//参数一 整型，横坐标
//参数二 整型，纵坐标
//参数三 整型，按下时长，单位毫秒 
//成功返回true 失败返回false

await androidBot.move(x, y, duration);
//手指移动
//参数一 整型，横坐标
//参数二 整型，纵坐标
//参数三 整型，移动时长，单位毫秒 
//成功返回true 失败返回false

await androidBot.release();
//手指抬起
//成功返回true 失败返回false

''' 代码示例
//拖动操作，起始坐标位置(100,150) 拖动至(200, 300)， 拖动时间1000毫秒
await androidBot.press(100, 150, 10);
await androidBot.move(200, 300, 1000);
await androidBot.release();
'''


await androidBot.click(x, y);
//点击坐标
//参数一 整型，横坐标
//参数二 整型，纵坐标
//成功返回true 失败返回false

await androidBot.doubleClick(x, y);
//双击坐标
//参数一 整型，横坐标
//参数二 整型，纵坐标
//成功返回true 失败返回false

await androidBot.longClick(x, y, duration);
//长按坐标
//参数一 整型，横坐标
//参数二 整型，纵坐标
//参数三 整型，长按时长，单位毫秒 
//成功返回true 失败返回false

''' 代码示例
//在(100,150)坐标位置 长按3秒
await androidBot.longClick(100, 150, 3000);
'''


await androidBot.swipe(startX, startY, endX, endY, duration);
//滑动坐标
//参数一 整型，起始横坐标
//参数二 整型，起始纵坐标 
//参数三 整型，结束横坐标
//参数四 整型，结束纵坐标
//参数五 整型，滑动时长，单位毫秒 
//成功返回true 失败返回false

''' 代码示例
//滑动屏幕。起始坐标位置(100,150) 滑动至(200, 300)， 滑动时间2000毫秒
await androidBot.swipe(100, 150, 200, 300, 2000);
'''


await androidBot.dispatchGesture(gesturePath, duration);
//执行手势
//参数一 JSON类型，手势路径 {[[x:number, y:number], [x1:number, y1:number]...]}
//参数二 整型，手势时长，单位毫秒 
//成功返回true 失败返回false

''' 代码示例
//执行手势，起始坐标位置(100,150) 至(200, 300)最后滑动至(300, 500) 手势时间3000毫秒
let gesturePath = [[100, 150], [200, 300], [300, 500]];
await androidBot.dispatchGesture(gesturePath, 3000);
'''



await androidBot.dispatchGestures(gesturesPath);
//执行多个手势
//参数一 JSON类型，手势路径 {[[duration:number, [x:number, y:number], [x1:number, y1:number]...],[duration:number, [x:number, y:number], [x1:number, y1:number]...],...]}
//duration 手势时长
//成功返回true 失败返回false

''' 代码示例
//执行多个手势，手势1，起始坐标位置(100,100) 至(200, 200) 手势时间1000毫秒。手势2，起始坐标位置(300,300) 至(500, 500) 手势时间1000毫秒
let gesturesPath = [
    [1000, [100, 100], [200, 200]],
    [1000, [300, 300], [500, 500]]
];
await androidBot.dispatchGestures(gesturesPath);
'''
````
## 发送文本
````javascript
await androidBot.sendKeys(text);
//参数一 字符串类型，发送的文本，需要打开aibote输入法
//成功返回true 失败返回false
````
## 发送按键
````javascript
await androidBot.back();
//成功返回true 失败返回false

await androidBot.home();
//成功返回true 失败返回false

await androidBot.recents();
//成功返回true 失败返回false

await androidBot.sendVk(keyCode);
//参数一 整型，发送按键值，需要打开aibote输入法。例如：回车：66 
//按键对照表 https://blog.csdn.net/yaoyaozaiye/article/details/122826340
//成功返回true 失败返回false

''' 代码示例
//发送搜索键
await androidBot.sendVk(84);
'''
````
## 启动APP
````javascript
await androidBot.startApp(name);
//参数一 字符串类型，包名或者app名称
//成功返回true 失败返回false

''' 代码示例
//通过名称启动
await androidBot.startApp("aibote");

//通过包名启动
await androidBot.startApp("com.aibot.client");
'''
````
## 屏幕大小
````javascript
await androidBot.getWindowSize();
//成功返回{width:number, height:number}
````
## 图片大小
````javascript
await androidBot.getImageSize(imagePath);
//参数一 字符串类型，图片路径
//成功返回{width:number, height:number}
````
## 获取安卓ID
````javascript
await androidBot.getAndroidId();
//成功返回安卓手机ID
````
## URL请求
````javascript
await androidBot.urlRequest(url, requestType, contentType = "null", postData = "null")
//参数一 字符串类型，请求的地址，http:// 或者 https://开头
//参数二 字符串类型，请求类型，GET或者POST
//参数三 字符串类型，可选参数，用作POST 内容类型
//参数四 字符串类型，可选参数，用作POST 提交的数据
//返回请求数据内容

''' 代码示例
//GET请求
await androidBot.urlRequest("https://www.baidu.com/, "GET");

//POST请求
let url = "https://tool.chinaz.com/ajaxsync.aspx?callback=jQuery111308936882726209896_1669640902645";
let requestType = "POST";
let contentType = "application/x-www-form-urlencoded";
let postData = "toolbox_urls=www.aibote.com";
await androidBot.urlRequest(url, requestType, contentType, postData);

//POST请求 json格式数据
let url = "http://www.pushplus.plus/send";
let requestType = "POST";
let contentType = "application/json";
let token = "123456";
let title = "打卡结果通知";
let postData = `{"token":${token}, "title":${title}}`
await androidBot.urlRequest(url, requestType, contentType, postData);
'''
````
## Toast消息提示
````javascript
await androidBot.showToast(text, duration)
//参数一 字符串类型，Toast提示的内容
//参数二 整型，显示时长，最大时长3500毫秒
//成功返回true 失败返回false
````
## 验证码系统
````javascript
await androidBot.getCaptcha(filePath, username, password, softId, codeType, lenMin = 0);
//识别验证码
//参数一 字符串类型，图片文件路径
//参数二 字符串类型，用户名
//参数三 字符串类型，密码
//参数四 字符串类型，软件ID
//参数四 字符串类型，图片类型 参考https://www.chaojiying.com/price.html
//参数五 字符串类型，最小位数 默认0为不启用,图片类型为可变位长时可启用这个参数
//返回JSON类型{{err_no:number, err_str:string, pic_id:string, pic_str:string, md5:string}}
//err_no,(数值) 返回代码  为0 表示正常，错误代码 参考https://www.chaojiying.com/api-23.html
//err_str,(字符串) 中文描述的返回信息 
//pic_id,(字符串) 图片标识号，或图片id号
//pic_str,(字符串) 识别出的结果
//md5,(字符串) md5校验值,用来校验此条数据返回是否真实有效

''' 代码示例
//通过超级鹰第三方平台接口，识别验证码。username, password, softId由第三方平台提供
let filePath = "/storage/emulated/0/Android/data/com.aibot.client/files/1.png";
let code = await androidBot.getCaptcha(filePath, "username", "password", "123456", "1902");
if(code["err_no"] == 0)//没有错误信息，输出识别结果
    console.log(code["pic_str"]);
'''


await androidBot.errorCaptcha(username, password, softId, picId);
//识别报错返分
//参数一 字符串类型，用户名
//参数二 字符串类型，密码
//参数三 字符串类型，软件ID
//参数四 字符串类型，图片ID 对应 getCaptcha返回值的pic_id 字段
//返回JSON类型{{err_no:number, err_str:string}}
//err_no,(数值) 返回代码
//err_str,(字符串) 中文描述的返回信息

await androidBot.scoreCaptcha(username, password);
//查询验证码剩余题分
//参数一 字符串类型，用户名
//参数二 字符串类型，密码
//返回JSON类型{{err_no:number, err_str:string, tifen:string, tifen_lock:string}}
//err_no,(数值) 返回代码
//err_str,(字符串) 中文描述的返回信息
//tifen,(数值) 题分
//tifen_lock,(数值) 锁定题分
````
## 元素操作
````javascript
//文本、描述xpath 支持@containsText 和 @containsDesc 模糊定位
await androidBot.getElementRect(xpath);
//获取位置
//参数一 字符串类型，元素路径
//成功返回{left:number, top:number, right:number, bottom:number}，失败返回null

await androidBot.getElementDescription(xpath);
//获取元素描述
//参数一 字符串类型，元素路径
//成功返回元素描述内容，失败返回null

await androidBot.getElementText(xpath);
//获取文本
//参数一 字符串类型，元素路径
//成功返回元素内容，失败返回null

''' 代码示例
//遍历xpath 获取所有兄弟节点内容
for(let i = 0; ; i++){
    let text = await androidBot.getElementText(`com.android.settings/android:id=title[${i}]`);//模板字符串
    if(text == null)
        break;
    
    console.log(text);
}
'''



await androidBot.setElementText(xpath, text);
//设置文本
//参数一 字符串类型，元素路径
//参数一 字符串类型，设置的文本
//成功返回true 失败返回false

await androidBot.clickElement(xpath);
//点击元素
//参数一 字符串类型，元素路径
//成功返回true 失败返回false

''' 代码示例
//相对路径点击元素
let xpath = "com.example.android.notepad/com.example.android.notepad:id=fab_add";
await androidBot.clickElement(xpath);

//文本模糊匹配点击元素
xpath = "com.huawei.android.launcher/android.widget.TextView@containsText=ibote";
await androidBot.clickElement(xpath);

//描述模糊匹配点击元素
xpath = "com.huawei.android.launcher/android.widget.TextView@containsDesc=ibote";
await androidBot.clickElement(xpath);
'''



await androidBot.scrollElement(xpath, direction);
//滚动元素
//参数一 字符串类型，元素路径
//参数二 整型，0 向前滑动， 1 向后滑动
//成功返回true 失败返回false

await androidBot.existsElement(xpath);
//判断元素是否存在
//参数一 字符串类型，元素路径
//成功返回true 失败返回false

await androidBot.isSelectedElement(xpath);
//判断元素是否选中
//参数一 字符串类型，元素路径
//成功返回true 失败返回false
````

## 文件传输
````javascript
await androidBot.pushFile("d:\\1.png", "/storage/emulated/0/1.png");
//上传文件到手机
//参数一 字符串类型，电脑文件路径
//参数二 字符串类型，安卓文件保存路径, 安卓外部存储根目录 /storage/emulated/0/
//媒体文件会自动更新至相册
//成功返回true 失败返回false

await androidBot.pullFile("/storage/emulated/0/1.png", "d:\\1.png");
//拉取文件到电脑
//参数一 字符串类型，安卓文件路径, 安卓外部存储根目录 /storage/emulated/0/
//参数二 字符串类型，电脑文件保存路径
````

## 安卓文件操作
````javascript
await androidBot.writeAndroidFile("/storage/emulated/0/1.txt", "aibote是一款非常优秀的RPA自动化平台", false);
//写入安卓文件
//参数一 字符串类型，安卓文件路径，安卓外部存储根目录 /storage/emulated/0/
//参数二 字符串类型，写入的内容
//参数三 布尔类型，可选参数，是否追加，默认覆盖文件内容
//成功返回true 失败返回false

await androidBot.readAndroidFile("/storage/emulated/0/1.txt");
//读取安卓文件
//参数一 字符串类型，安卓文件路径，安卓外部存储根目录 /storage/emulated/0/
//成功返回文件内容，失败返回 null

await androidBot.deleteAndroidFile("/storage/emulated/0/Android/data/com.aibot.client/files/1.png");
//删除安卓文件
//参数一 字符串类型，安卓文件路径，安卓外部存储根目录 /storage/emulated/0/
//成功返回true 失败返回false

await androidBot.existsAndroidFile("/storage/emulated/0/Android/data/com.aibot.client/files/1.png");
//判断文件是否存在
//参数一 字符串类型，安卓文件路径，安卓外部存储根目录 /storage/emulated/0/
//成功返回true 失败返回false
````

## Intent跳转
````javascript
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
````

## 获取包名/窗口
````javascript
await androidBot.getActivity();
//成功返回当前activity

await androidBot.getPackage();
//成功返回当前package
````

## 安卓剪切板
````javascript
await androidBot.setClipboardText(text);
//设置剪切板内容
//参数一 字符串型，设置的文本
//成功返回true 失败返回 false

await androidBot.getClipboardText();
//获取剪切板内容，需要打开aibote输入法。
//成功返回剪切板文本，失败返回null
````

## 创建脚本控件
````javascript
await androidBot.createTextView(id, text, x, y, width, height);
//创建TextView控件
//参数一 整型，控件ID，不可与其他控件重复
//参数二 字符串型，控件文本
//参数三 整型，控件在屏幕上x坐标
//参数四 整型，控件在屏幕上y坐标
//参数五 整型，控件宽度
//参数六 整型，控件高度
//成功返回true，失败返回 false

await androidBot.createEditText(id, hintText, x, y, width, height);
//创建EditText控件
//参数一 整型，控件ID，不可与其他控件重复
//参数二 字符串型，提示文本
//参数三 整型，控件在屏幕上x坐标
//参数四 整型，控件在屏幕上y坐标
//参数五 整型，控件宽度
//参数六 整型，控件高度
//成功返回true，失败返回 false

await androidBot.createCheckBox(id, text, x, y, width, height);
//创建CheckBox控件
//参数一 整型，控件ID，不可与其他控件重复
//参数二 字符串型，控件文本
//参数三 整型，控件在屏幕上x坐标
//参数四 整型，控件在屏幕上y坐标
//参数五 整型，控件宽度
//参数六 整型，控件高度
//成功返回true，失败返回 false

await androidBot.createWebView(id, url, x, y, width, height);
//创建WebView控件
//参数一 整型，控件ID，不可与其他控件重复
//参数二 字符串型，加载的链接
//参数三 整型，控件在屏幕上x坐标，值为-1时自动填充宽高
//参数四 整型，控件在屏幕上y坐标，值为-1时自动填充宽高
//参数五 整型，控件宽度，值为-1时自动填充宽高
//参数六 整型，控件高度，值为-1时自动填充宽高
//成功返回true，失败返回 false

await androidBot.clearScriptControl();
//清除脚本控件
//成功返回true，失败返回 false

await androidBot.getScriptParam();
//获取脚本配置参数，用户点击安卓端 "提交参数"按钮 触发
//成功返回{"id":"text", "id":"isSelect"} 此类对象，失败返回null。

''' 代码示例
//创建TextView 和 EditText 控件
await androidBot.createTextView(100, "输入参数", 10, 10, 400, 200);
await androidBot.createEditText(101, "", 450, 10, 500, 200);

//等待用户提交，获取参数
let retParams = await androidBot.getScriptParam();
param = retParams["101"];
console.log("用户输入的参数是：", param);
'''
````

# WindowsBot开发手册
## 主函数示例
````javascript
const WindowsBot = require('WindowsBot');//引用WindowsBot模块

//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);

/**用作代码提示，windowsMain函数会被多次调用，注意使用全局变量
* @param {WindowsBot} windowsBot
*/
async function windowsMain(windowsBot){
    //设置隐式等待
    await windowsBot.setImplicitTimeout(5000);

    let hwnd = await windowsBot.findWindow(null, "运行");
    await windowsBot.clickElement(hwnd, "Window/Button[2]", 1);
}
````
## 注册主函数
````javascript
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);
//参数一 回调函数，要注册的函数，必须含一个参数，用作接收WindowsBot对象
//参数二 字符串型， 脚本所在的地址，传递给WindowsDriver.exe。如果值为 "127.0.0.1"脚本会将参数 ip和port作为启动参数并启动WindowsDriver.exe，否则用户需要手动启动WindowsDriver.exe 并且提供启动参数。
//命令行启动示例：WindowsDriver.exe "192.168.1.88" 26678
//脚本多进程需要指定不同的端口！
//参数三 整型，监听端口, WindowsDriver.exe。默认26678。WindowsDriver.exe会通过ip和port 连接脚本

''' 代码示例
//远程云端部署
WindowsBot.registerMain(windowsMain, "192.168.1.88", 26678);
'''
````

## 等待超时
````javascript
await windowsBot.sleep(3000);
//显示等待
//参数一 整型，等待时间，单位毫秒

await windowsBot.setImplicitTimeout(waitMs, intervalMs = 5);
//隐式等待
//参数一 整型，等待时间，单位毫秒
//参数二 整型，心跳间隔，单位毫秒。可选参数，默认5毫秒
//作用全局，程序起始设置一次即可。并发会影响实际等待时间
````
## 查找句柄
````javascript
await windowsBot.findWindow(className, windowName);
//查找窗口句柄，仅查找顶级窗口，不包含子窗口
//参数一 字符串型，窗口类名
//参数二 字符串型，窗口名
//成功返回窗口句柄，失败返回null

''' 代码示例
//不同的应用中相同窗口类名比较常见，使用类名查找句柄要确保窗口类名唯一性
//通过类名查找句柄
let hwnd = await windowsBot.findWindow("#32770", null);

//通过窗口名称查找句柄
let hwnd = await windowsBot.findWindow(null, "运行");

//通过窗口名称和类名查找句柄
let hwnd = await windowsBot.findWindow("#32770", "运行");
'''


await windowsBot.findWindows(className, windowName);
//查找窗口句柄数组，仅查找顶级窗口，不包含子窗口。className和windowNmae都为null，则返回所有窗口句柄
//参数一 字符串型，窗口类名
//参数二 字符串型，窗口名
//成功返回窗口句柄数组，失败返回null

''' 代码示例
//通过类名查找句柄数组
let hwnds = await windowsBot.findWindow("Chrome_WidgetWin_1", null);
'''


await windowsBot.findSubWindow(curHwnd, className, windowName);
//查找子窗口句柄
//参数一 字符串/整型，当前窗口句柄
//参数二 字符串型，窗口类名
//参数三 字符串型，窗口名
//成功返回窗口句柄，失败返回null

''' 代码示例
//查找指定窗口的子窗口句柄
let hwnd = await windowsBot.findWindow("#32770", "设备投屏1");
let subHwnd = await windowsBot.findSubWindow(hwnd, null, "001  GDBNW19A45831389");
'''


await windowsBot.findParentWindow(curHwnd);
//查找父窗口句柄
//参数一 字符串/整型，当前窗口句柄
//成功返回窗口句柄，失败返回null

await windowsBot.findDesktopWindow();
//查找桌面窗口句柄
//成功返回窗口句柄，失败返回null
````
## 获取窗口名称
````javascript
await windowsBot.getWindowName(hwnd);
//参数一 字符串/整型，窗口句柄
//成功返回窗口名称，失败返回null
````
## 窗口操作
````javascript
await windowsBot.showWindow(hwnd, isShow);
//参数一 字符串/整型，窗口句柄
//参数二 布尔型，显示窗口 true， 隐藏窗口 false
//成功返回true，失败返回false

await windowsBot.setWindowTop(hwnd, isTop);
//设置窗口到最顶层
//参数一 字符串/整型，窗口句柄
//参数二 整型，是否置顶。true置顶， false取消置顶
//成功返回true，失败返回false

await windowsBot.getWindowPos(hwnd);
//获取窗口位置
//参数一 字符串/整型，窗口句柄
//成功返回窗口位置，失败返回null

await windowsBot.setWindowPos(hwnd, left, top, width, height);
//设置窗口位置
//参数一 字符串/整型，窗口句柄
//参数二 整型，左上角横坐标
//参数三 整型，左上角纵坐标
//参数四 整型，窗口宽度
//参数五 整型，窗口高度
//成功返回true，失败返回 false
````
## 鼠标键盘
````javascript
await windowsBot.moveMouse(hwnd, x, y, options = {});
//移动鼠标
//参数一 字符串/整型，窗口句柄
//参数二 整型，横坐标
//参数三 整型，纵坐标
//参数四 JSON类型，可选参数{{mode:boolean, elementHwnd:string|number}} options 操作模式，后台 true，前台 false。默认前台操作。
//如果mode值为true且目标控件有单独的句柄，则需要通过getElementWindow获得元素句柄，指定elementHwnd的值(极少应用窗口由父窗口响应消息，则无需指定)
//总是返回true

''' 代码示例
//前台移动鼠标
await windowsBot.moveMouse(hwnd, 100, 200);

//后台移动鼠标
await windowsBot.moveMouse(hwnd, 100, 200, {mode:true});
'''


await windowsBot.moveMouseRelative(hwnd, x, y, mode = false);
//移动鼠标(相对坐标)
//参数一 字符串/整型，窗口句柄
//参数二 整型，相对横坐标
//参数三 整型，相对纵坐标
//参数四 布尔型，操作模式，后台 true，前台 false。默认前台操作
//总是返回true

await windowsBot.rollMouse(hwnd, x, y, dwData, mode = false);
//滚动鼠标
//参数一 字符串/整型，窗口句柄
//参数二 整型，横坐标
//参数三 整型，纵坐标
//参数四 整型，鼠标滚动次数,负数下滚鼠标,正数上滚鼠标
//参数五 布尔型，操作模式，后台 true，前台 false。默认前台操作
//总是返回true

await windowsBot.clickMouse(hwnd, x, y, msg, options = {});
//鼠标点击
//参数一 字符串/整型，窗口句柄
//参数二 整型，横坐标
//参数三 整型，纵坐标
//参数四 整型，点击类型，单击左键:1 单击右键:2 按下左键:3 弹起左键:4 按下右键:5 弹起右键:6 双击左键:7 双击右键:8
//参数五 JSON类型，可选参数{{mode:boolean, elementHwnd:string|number}} options 操作模式，后台 true，前台 false。默认前台操作。
//如果mode值为true且目标控件有单独的句柄，则需要通过getElementWindow获得元素句柄，指定elementHwnd的值(极少应用窗口由父窗口响应消息，则无需指定)
//总是返回true。

''' 代码示例
//前台单击左键
let hwnd = await windowsBot.findWindow(null, "运行");
await windowsBot.clickMouse(hwnd, 100, 200, 1);

//后台单击左键(目标坐标点没有单独的句柄)
await windowsBot.clickMouse(hwnd, 100, 200, 1, {mode:true});

//后台单击左键(目标坐标点有单独的句柄)
let subHwnd = await windowsBot.getElementWindow(hwnd, "Window/Button[2]"); 
await windowsBot.clickMouse(hwnd, 100, 200, 1, {mode:true, elementHwnd:subHwnd});
'''


await windowsBot.sendKeys(text);
//输入文本
//参数一 字符串型，输入的文本
//总是返回true

await windowsBot.sendKeysByHwnd(hwnd, text);
//后台输入文本(杀毒软件可能会拦截)
//参数一 字符串/整型，窗口句柄，如果目标控件有单独的句柄，需要通过getElementWindow获得句柄
//参数二 字符串型，输入的文本
//总是返回true

''' 代码示例
//后台输入文本(目标坐标点有单独的句柄)
let hwnd = await windowsBot.findWindow(null, "运行");
let subHwnd = await windowsBot.getElementWindow(hwnd, "ComboBox/Edit"); 
await windowsBot.sendKeysByHwnd(subHwnd, "cmd");
'''


await windowsBot.sendVk(bVk, msg);
//输入虚拟键值(VK)
//参数一 整型，VK键值
//参数二 整型，输入类型，按下弹起:1 按下:2 弹起:3
//总是返回true

await windowsBot.sendVkByHwnd(hwnd, bVk, msg);
//后台输入虚拟键值(VK) (杀毒软件可能会拦截)
//参数一 字符串/整型，窗口句柄，如果目标控件有单独的句柄，需要通过getElementWindow获得句柄
//参数二 整型，VK键值
//参数三 整型，输入类型，按下弹起:1 按下:2 弹起:3
//总是返回true。若是后台组合键，可使用sendVk 按下控制键(Alt、Shift、Ctrl...)，再组合其他按键

''' 代码示例
//后台输入键盘"A"(目标坐标点有单独的句柄)
let hwnd = await windowsBot.findWindow(null, "运行");
let subHwnd = await windowsBot.getElementWindow(hwnd, "ComboBox/Edit"); 
await windowsBot.sendVkByHwnd(subHwnd, 0x41, 1);
'''
````
## 图色操作
````javascript
await windowsBot.saveScreenshot(hwnd, savePath, options = {});
//截图保存
//参数一 字符串/整型，窗口句柄
//参数二 字符串类型，保存图片路径。
//参数三 JSON类型，可选参数{{region:[left:number, top:number, right:number, bottom:number], threshold:[thresholdType:number, thresh:number, maxval:number], mode:boolean}} options 
//region截图区域 [10, 20, 100, 200], 默认 hwnd对应的窗口
//threshold二值化图片, thresholdType算法类型：
//                                            0   THRESH_BINARY算法，当前点值大于阈值thresh时，取最大值maxva，否则设置为0
//                                            1   THRESH_BINARY_INV算法，当前点值大于阈值thresh时，设置为0，否则设置为最大值maxva
//                                            2   THRESH_TOZERO算法，当前点值大于阈值thresh时，不改变，否则设置为0
//                                            3   THRESH_TOZERO_INV算法，当前点值大于阈值thresh时，设置为0，否则不改变
//                                            4   THRESH_TRUNC算法，当前点值大于阈值thresh时，设置为阈值thresh，否则不改变
//                                            5   ADAPTIVE_THRESH_MEAN_C算法，自适应阈值
//                                            6   ADAPTIVE_THRESH_GAUSSIAN_C算法，自适应阈值
//                                            thresh阈值，maxval最大值，threshold默认保存原图。thresh和maxval同为255时灰度处理
//mode操作模式，后台 true，前台 false。默认前台操作     
//成功返回false，失败返回true

''' 代码示例
//截取窗口全屏，图片保存至d:\\1.png
let savePath = "d:\\1.png";
await windowsBot.saveScreenshot(hwnd, savePath);

//二值化区域截图，区域起始坐标位置(10,20)，右下角坐标位置(100,200)。二值化使用THRESH_BINARY算法。阈值127，最大值255
let options = {region:[10, 20, 100, 100], threshold:[0, 127, 255]};
await windowsBot.saveScreenshot(hwnd, savePath, options);
'''


await windowsBot.getColor(hwnd, x, y, mode = false);
//获取指定坐标点的色值
//参数一 字符串/整型，窗口句柄
//参数二 整型，横坐标
//参数三 整型，纵坐标
//参数四 布尔型，操作模式，可选参数，后台 true，前台 false。默认前台操作
//成功返回#开头的颜色值，失败返回null

await windowsBot.findImage(hwnd, imagePath, options = {});
//找图
//参数一 字符串/整型，窗口句柄
//参数二 字符串，小图片路径
//参数三 JSON类型，可选参数，{{region:[left:number, top:number, right:number, bottom:number], sim:number, threshold:[thresholdType:number, thresh:number, maxval:number], mode:boolean}} options
//region 指定区域找图 [10, 20, 100, 200]，region默认 hwnd对应的窗口
//sim浮点型 图片相似度 0.0-1.0，sim默认0.95
//threshold二值化图片, thresholdType算法类型：
//                                            0   THRESH_BINARY算法，当前点值大于阈值thresh时，取最大值maxva，否则设置为0
//                                            1   THRESH_BINARY_INV算法，当前点值大于阈值thresh时，设置为0，否则设置为最大值maxva
//                                            2   THRESH_TOZERO算法，当前点值大于阈值thresh时，不改变，否则设置为0
//                                            3   THRESH_TOZERO_INV算法，当前点值大于阈值thresh时，设置为0，否则不改变
//                                            4   THRESH_TRUNC算法，当前点值大于阈值thresh时，设置为阈值thresh，否则不改变
//                                            5   ADAPTIVE_THRESH_MEAN_C算法，自适应阈值
//                                            6   ADAPTIVE_THRESH_GAUSSIAN_C算法，自适应阈值
//                                            thresh阈值，maxval最大值，threshold默认保存原图。thresh和maxval同为255时灰度处理
//multi 找图数量，默认为1,找单个图片坐标
//mode 操作模式，后台 true，前台 false。默认前台操作   
//成功返回，单个坐标点 [{x:number, y:number}]，多坐标点图[{x1:number, y1:number}, {x2:number, y2:number}...] 失败返回null

''' 代码示例
//全屏找图
let imagePath = "d:\\1.png";
await windowsBot.findImage(hwnd, imagePath);

//区域+模糊 找图，区域起始坐标位置(10, 15)，右下角坐标位置(100, 100)。图片相似度设置为95%
let options = {region:[10, 15, 100, 100], sim:0.95};
await windowsBot.findImage(hwnd, imagePath, options);

//二值化，使用THRESH_BINARY算法，阈值127 最大值255。二值化找图需要在截图工具设置相同的算法、阈值和最大值
let options = {threshold:[0, 127, 255]};
await windowsBot.findImage(hwnd, imagePath, options);

//找多张相同图片坐标，返回坐标数组。
let options = {multi:3};
await windowsBot.findImage(hwnd, imagePath, options);
'''


await windowsBot.findAnimation(hwnd, frameRate, options = {});
//找动态图
//参数一 字符串/整型，窗口句柄
//参数二 整型，前后两张图相隔的时间，单位毫秒
//参数三 JSON类型，可选参数，{{region:[left:number, top:number, right:number, bottom:number], mode:boolean}} options
//region 指定区域找图 [10, 20, 100, 200]，region默认 hwnd对应的窗口
//mode 操作模式，后台 true，前台 false。默认前台操作   
//成功返回，单个坐标点 [{x:number, y:number}]，多坐标点图[{x1:number, y1:number}, {x2:number, y2:number}...] 失败返回null

''' 代码示例
//在100毫秒内找出图片内变化的位置，其他参数参考findImage函数
await windowsBot.findAnimation(hwnd, 100);
'''


await windowsBot.findColor(hwnd, mainColor, options = {});
//查找指定色值的坐标点
//参数一 字符串/整型，窗口句柄
//参数二 字符串，#开头的色值
//参数三 JSON类型，可选参数，{{subColors:[[offsetX:number, offsetY:number, strSubColor:string], ...], region:[left:number, top:number, right:number, bottom:numbe], sim:number, mode:boolean}} options
//subColors 相对于mainColor 的子色值，[[offsetX, offsetY, "#FFFFFF"], ...]，subColors默认为null
//region 指定区域找图 [10, 20, 100, 200]，region默认 hwnd对应的窗口
//sim相似度0.0-1.0，sim默认为1
//mode 操作模式，后台 true，前台 false。默认前台操作   
//成功返回{x:number, y:number} 失败返回null

''' 代码示例
//指定区域+模糊 找色。区域起始坐标位置(10, 20)，右下角坐标位置(100, 200)。颜色相似度设置为95%
let mainColor = "#ffff00";
let options = {region:[10, 20, 100, 200], sim:0.95};
await windowsBot.findColor(hwnd, mainColor, options);

//多点区域找色。区域起始坐标位置(10, 20)，右下角坐标位置(100, 200)。主颜色与3个子颜色 点的偏移坐标点。偏移点的计算(子颜色坐标点-主颜色坐标点)
let mainColor = "#ffff00";
let options = {region:[10, 20, 100, 200], subColors:[[8, 2, "#a09588"], [9, 5, "#ffffff"], [10, 6, "#ffdc92"]]};
await windowsBot.findColor(hwnd, mainColor, options);
'''


await windowsBot.compareColor(hwnd, mainX, mainY, mainColor, options = {});
//比较指定坐标点的颜色值
//参数一 字符串/整型，窗口句柄
//参数二 整型，主颜色所在的X坐标
//参数三 整型，主颜色所在的Y坐标
//参数四 字符串，#开头的色值
//参数五 JSON类型，可选参数，{{subColors:[[offsetX:number, offsetY:number, strSubColor:string], ...], region:[left:number, top:number, right:number, bottom:number], sim:number, mode:boolean}} options
//subColors 相对于mainColor 的子色值，[[offsetX, offsetY, "#FFFFFF"], ...]，subColors默认为null
//region 指定区域找图 [10, 20, 100, 200]，region默认 hwnd对应的窗口
//sim相似度0.0-1.0，sim默认为1
//成功返回true 失败返回 false

''' 代码示例
//多点+模糊比色，主颜色值"#ffff00" 坐标位置(100,150)。主颜色与3个子颜色 点的偏移坐标点。偏移点的计算(子颜色坐标点-主颜色坐标点)。颜色相似度98%
let options = {subColors:[[8, 2, "#a09588"], [9, 5, "#ffffff"], [10, 6, "#ffdc92"]], sim:0.98};
await windowsBot.compareColor(hwnd, 100, 150, "#ffff00", options);
'''
````
## OCR系统
````javascript
await windowsBot.findWords(hwndOrImagePath, words, options = {})
//找字
//参数一 字符串/整型，窗口句柄或者图片路径
//参数二 字符串类型，要查找的文字
//参数三 JSON类型，可选参数 {region:[left:number, top:number, right:number, bottom:number], threshold:[thresholdType:number, thresh:number, maxval:number], mode:boolean} options
//region 指定区域 [10, 20, 100, 200]，region默认全图
//threshold二值化图片, thresholdType算法类型：
//                                          0   THRESH_BINARY算法，当前点值大于阈值thresh时，取最大值maxva，否则设置为0
//                                          1   THRESH_BINARY_INV算法，当前点值大于阈值thresh时，设置为0，否则设置为最大值maxva
//                                          2   THRESH_TOZERO算法，当前点值大于阈值thresh时，不改变，否则设置为0
//                                          3   THRESH_TOZERO_INV算法，当前点值大于阈值thresh时，设置为0，否则不改变
//                                          4   THRESH_TRUNC算法，当前点值大于阈值thresh时，设置为阈值thresh，否则不改变
//                                          5   ADAPTIVE_THRESH_MEAN_C算法，自适应阈值
//                                          6   ADAPTIVE_THRESH_GAUSSIAN_C算法，自适应阈值
//                    thresh阈值，maxval最大值，threshold默认保存原图。thresh和maxval同为255时灰度处理
//mode 操作模式，后台 true，前台 false。默认前台操作, 仅适用于hwnd
//成功功返回数组[{x:number, y:number}, ...]，文字所在的坐标点， 失败返回null

''' 代码示例
//后台区域找字
await windowsBot.findWords(hwnd, "rpa", {region:[10, 20, 100, 200], mode:true});

//二值化处理后找字
await windowsBot.findWords(hwnd, 'rpa', {threshold:[0, 100, 255]});
'''


await windowsBot.getWords(hwndOrImagePath, options = {})
//获取屏幕文字
//参数一 字符串/整型，窗口句柄或者图片路径
//参数二 JSON类型，可选参数 {region:[left:number, top:number, right:number, bottom:number], threshold:[thresholdType:number, thresh:number, maxval:number], mode:boolean} options
//region 指定区域 [10, 20, 100, 200]，region默认全图
//threshold二值化图片, thresholdType算法类型：
//                                          0   THRESH_BINARY算法，当前点值大于阈值thresh时，取最大值maxva，否则设置为0
//                                          1   THRESH_BINARY_INV算法，当前点值大于阈值thresh时，设置为0，否则设置为最大值maxva
//                                          2   THRESH_TOZERO算法，当前点值大于阈值thresh时，不改变，否则设置为0
//                                          3   THRESH_TOZERO_INV算法，当前点值大于阈值thresh时，设置为0，否则不改变
//                                          4   THRESH_TRUNC算法，当前点值大于阈值thresh时，设置为阈值thresh，否则不改变
//                                          5   ADAPTIVE_THRESH_MEAN_C算法，自适应阈值
//                                          6   ADAPTIVE_THRESH_GAUSSIAN_C算法，自适应阈值
//                    thresh阈值，maxval最大值，threshold默认保存原图。thresh和maxval同为255时灰度处理
//mode 操作模式，后台 true，前台 false。默认前台操作, 仅适用于hwnd
//成功返回手机上的文字, 失败返回null

''' 代码示例
//获取图片上的文字
let words = await windowsBot.getWords("d:\\1.png");
console.log(words);
'''
````
## 元素操作
````javascript
await windowsBot.getElementName(hwnd, xpath);
//获取元素名称
//参数一 字符串/整型，窗口句柄。如果是java窗口并且窗口句柄和元素句柄不一致，需要使用getElementWindow获取窗口句柄。
//getElementWindow参数的xpath，Aibote Tool应当使用正常模式下获取的XPATH路径，不要 “勾选java窗口” 复选按钮。对话框子窗口，需要获取对应的窗口句柄操作
//参数二 字符串型，元素路径
//成功返回元素名称，失败返回null

''' 代码示例
//遍历xpath 获取所有兄弟节点name
for(let i = 0; ; i++){
    let text = await windowsBot.getElementName(hwnd, `Pane[2]/Pane/Pane/Pane/Pane[1]/Pane/Pane/Pane/Pane/Pane/Pane/Pane/Pane[2]/List/List/ListItem[${i}]`);//模板字符串
    if(text == null)
        break;
    
    console.log(text);
}
'''


await windowsBot.getElementValue(hwnd, xpath);
//获取元素文本
//参数一 字符串/整型，窗口句柄
//参数二 字符串型，元素路径
//成功返回元素文本，失败返回null

await windowsBot.getElementRect(hwnd, xpath);
//获取元素矩形大小
//参数一 字符串/整型，窗口句柄。如果是java窗口并且窗口句柄和元素句柄不一致，需要使用getElementWindow获取窗口句柄。
//getElementWindow参数的xpath，Aibote Tool应当使用正常模式下获取的XPATH路径，不要 “勾选java窗口” 复选按钮。对话框子窗口，需要获取对应的窗口句柄操作
//参数二 字符串型，元素路径
//成功返回{left:number, top:number, right:number, bottom:number}，失败返回null

await windowsBot.getElementWindow(hwnd, xpath);
//获取元素窗口句柄
//参数一 字符串/整型，窗口句柄
//参数二 字符串型，元素路径
//成功返回窗口句柄，失败返回null

await windowsBot.clickElement(hwnd, xpath, msg);
//点击元素
//参数一 字符串/整型，窗口句柄。如果是java窗口并且窗口句柄和元素句柄不一致，需要使用getElementWindow获取窗口句柄。
//getElementWindow参数的xpath，Aibote Tool应当使用正常模式下获取的XPATH路径，不要 “勾选java窗口” 复选按钮。对话框子窗口，需要获取对应的窗口句柄操作
//参数二 字符串型，元素路径
//参数三 整型，点击类型，单击左键:1 单击右键:2 按下左键:3 弹起左键:4 按下右键:5 弹起右键:6 双击左键:7 双击右键:8
//成功返回true 失败返回 false。如果此函数不能点击，可尝试使用invokeElement函数

await windowsBot.invokeElement(hwnd, xpath);
//执行元素默认操作(一般是点击操作)
//参数一 字符串/整型，窗口句柄。
//参数二 字符串型，元素路径
//成功返回true 失败返回 false。

await windowsBot.setElementFocus(hwnd, xpath);
//设置元素作为焦点
//参数一 字符串/整型，窗口句柄
//参数二 字符串型，元素路径
//成功返回true 失败返回 false

await windowsBot.setElementValue(hwnd, xpath, value);
//设置元素文本
//参数一 字符串/整型，窗口句柄。如果是java窗口并且窗口句柄和元素句柄不一致，需要使用getElementWindow获取窗口句柄。
//getElementWindow参数的xpath，Aibote Tool应当使用正常模式下获取的XPATH路径，不要 “勾选java窗口” 复选按钮。对话框子窗口，需要获取对应的窗口句柄操作
//参数二 字符串型，元素路径
//参数三 字符串型，要设置的内容
//成功返回true 失败返回 false

await windowsBot.setElementScroll(hwnd, xpath, horizontalPercent, verticalPercent);
//滚动元素
//参数一 字符串/整型，窗口句柄
//参数二 字符串型，元素路径
//参数三 整型，水平百分比 -1不滚动
//参数四 整型，垂直百分比 -1不滚动
//成功返回true 失败返回 false

await windowsBot.isSelected(hwnd, xpath);
//单/复选框是否选中
//参数一 字符串/整型，窗口句柄
//参数二 字符串型，元素路径
//成功返回true 失败返回 false

await windowsBot.closeWindow(hwnd, xpath);
//关闭窗口
//参数一 字符串/整型，窗口句柄。如果是java窗口并且窗口句柄和元素句柄不一致，需要使用getElementWindow获取窗口句柄。
//getElementWindow参数的xpath，Aibote Tool应当使用正常模式下获取的XPATH路径，不要 “勾选java窗口” 复选按钮。对话框子窗口，需要获取对应的窗口句柄操作
//参数二 字符串型，元素路径
//成功返回true 失败返回 false

await windowsBot.setWindowState(hwnd, xpath, state);
//设置窗口状态
//参数一 字符串/整型，窗口句柄。如果是java窗口并且窗口句柄和元素句柄不一致，需要使用getElementWindow获取窗口句柄。
//getElementWindow参数的xpath，Aibote Tool应当使用正常模式下获取的XPATH路径，不要 “勾选java窗口” 复选按钮。对话框子窗口，需要获取对应的窗口句柄操作
//参数二 字符串型，元素路径
//参数三 整型，0正常 1最大化 2 最小化
//成功返回true 失败返回 false
````
## 系统剪切板
````javascript
await windowsBot.setClipboardText(text);
//设置剪切板内容
//参数一 字符串型，设置的文本
//成功返回true 失败返回 false

await windowsBot.getClipboardText();
//获取剪切板内容
//返回剪切板文本
````
## 启动进程
````javascript
await windowsBot.startProcess(commandLine, showWindow = true, isWait = false);
//参数一 字符串型，启动命令行
//参数二 布尔型，是否显示窗口。可选参数,默认显示窗口
//参数三 布尔型，是否等待程序结束。可选参数,默认不等待
//成功返回true,失败返回false

''' 代码示例
//后台启动应用程序
await windowsBot.startProcess("d:\\Aibote\\Aibote.exe",  false, false);

//启动cmd.exe 指定启动参数
await windowsBot.startProcess("cmd.exe netstat-an",  true, false);

//启动cmd.exe 指定启动参数并且等待进程关闭
await windowsBot.startProcess("cmd.exe netstat-an",  true, true);
'''
````
## 执行cmd命令
````javascript
await windowsBot.executeCommand(command, waitTimeout = 300);
//此函数用于获取cmd执行结果，函数执行完毕会自动关闭启动的相关进程
//参数一 字符串型，cmd命令，不能含 "cmd"字串
//参数二 整型，可选参数，等待结果返回超时，单位毫秒，默认300毫秒
//返回cmd执行结果

''' 代码示例
//执行cmd 等待3000毫秒返回结果
await windowsBot.executeCommand("ping www.baidu.com", 3000);
'''
````
## 指定url下载文件
````javascript
await windowsBot.downloadFile(url, filePath, isWait);
//参数一 字符串型，文件地址
//参数二 字符串型，文件保存的路径
//参数三 布尔型，是否等待.为true时,等待下载完成
//总是返回true
````
## Excel文档
````javascript
await windowsBot.openExcel(excelPath);
//打开excel文档
//参数一 字符串，excle路径
//成功返回excel对象，失败返回null

await windowsBot.openExcelSheet(excelObject, sheetName);
//打开excel表格
//参数一 对象，excel对象
//参数二 字符串，表名
//成功返回sheet对象，失败返回null

await windowsBot.saveExcel(excelObject);
//保存/关闭excel文档
//参数一 对象，excel对象
//成功返回true，失败返回false

await windowsBot.writeExcelNum(sheetObject, row, col, value);
//写入数字到excel表格
//参数一 对象，sheet对象
//参数二 整型，行
//参数三 整型，列
//参数四 数字型，写入的值
//成功返回true，失败返回false

await windowsBot.writeExcelStr(sheetObject, row, col, strValue);
//写入字串到excel表格
//参数一 对象，sheet对象
//参数二 整型，行
//参数三 整型，列
//参数四 字符串，写入的值
//成功返回true，失败返回false

await windowsBot.readExcelNum(sheetObject, row, col);
//读取excel表格数字
//参数一 对象，sheet对象
//参数二 整型，行
//参数三 整型，列
//返回读取到的数字

await windowsBot.readExcelStr(sheetObject, row, col);
//读取excel表格字串
//参数一 对象，sheet对象
//参数二 整型，行
//参数三 整型，列
//返回读取到的字符

await windowsBot.removeExcelRow(sheetObject, rowFirst, rowLast);
//删除excel表格行
//参数一 对象，sheet对象
//参数二 整型，起始行
//参数三 整型，结束行
//成功返回true，失败返回false

await windowsBot.removeExcelCol(sheetObject, colFirst, colLast);
//删除excel表格列
//参数一 对象，sheet对象
//参数二 整型，起始列
//参数三 整型，结束列
//成功返回true，失败返回false

''' 代码示例
//打开excel
let excelPath = "d:\\1.xlsx";
let excelObject = await windowsBot.openExcel(excelPath);

//打开/创建表
let sheetName = "第1张表";
let sheetObject = await windowsBot.openExcelSheet(excelObject, sheetName);

//写入字符串到第一个表格
await windowsBot.writeExcelStr(sheetObject, 0, 0, "aibote RPA");

//读取第一个表格内容
let text = await windowsBot.readExcelStr(sheetObject, 0, 0);
console.log(text);

//保存/关闭excel。如果再次操作需要重新调用openExcel、openExcelSheet 函数
await windowsBot.saveExcel(excelObject);
'''
````
## 验证码系统
````javascript
await windowsBot.getCaptcha(filePath, username, password, softId, codeType, lenMin = 0);
//识别验证码
//参数一 字符串类型，图片文件路径
//参数二 字符串类型，用户名
//参数三 字符串类型，密码
//参数四 字符串类型，软件ID
//参数四 字符串类型，图片类型 参考https://www.chaojiying.com/price.html
//参数五 字符串类型，最小位数 默认0为不启用,图片类型为可变位长时可启用这个参数
//返回JSON类型{{err_no:number, err_str:string, pic_id:string, pic_str:string, md5:string}}
//err_no,(数值) 返回代码  为0 表示正常，错误代码 参考https://www.chaojiying.com/api-23.html
//err_str,(字符串) 中文描述的返回信息 
//pic_id,(字符串) 图片标识号，或图片id号
//pic_str,(字符串) 识别出的结果
//md5,(字符串) md5校验值,用来校验此条数据返回是否真实有效

''' 代码示例
//通过超级鹰第三方平台接口，识别验证码。username, password, softId由第三方平台提供
let filePath = "d:\\1.png";
let code = await androidBot.getCaptcha(filePath, "username", "password", "123456", "1902");
if(code["err_no"] == 0)//没有错误信息，输出识别结果
    console.log(code["pic_str"]);
'''


await windowsBot.errorCaptcha(username, password, softId, picId);
//识别报错返分
//参数一 字符串类型，用户名
//参数二 字符串类型，密码
//参数三 字符串类型，软件ID
//参数四 字符串类型，图片ID 对应 getCaptcha返回值的pic_id 字段
//返回JSON类型{{err_no:number, err_str:string}}
//err_no,(数值) 返回代码
//err_str,(字符串) 中文描述的返回信息

await windowsBot.scoreCaptcha(username, password);
//查询验证码剩余题分
//参数一 字符串类型，用户名
//参数二 字符串类型，密码
//返回JSON类型{{err_no:number, err_str:string, tifen:string, tifen_lock:string}}
//err_no,(数值) 返回代码
//err_str,(字符串) 中文描述的返回信息
//tifen,(数值) 题分
//tifen_lock,(数值) 锁定题分
````

## 自然语言处理(NLP)
### 初始化openAi
````javascript
await windowsBot.initOpenAi(aipKey);
//初始化openAi
//参数一 字符串型，"sk-"开头的密钥
//成功返回true，失败返回false
````

### chatgpt的使用
````javascript
await windowsBot.chatgpt(model, prompt, maxTokens, temperature, stop = "");
//使用chatgpt
//参数一 字符串型，指定使用的模型,"text-davinci-003"、text-curie-001、text-babbage-001、text-ada-001和自定义微调模型
//参数二 字符串型，提出的问题
//参数三 最大令牌书，大约 3个字符1个令牌，1个汉字2个令牌
//参数四 浮点型，调节结果的创意程度，0为单一结果， 1创意度更高
//参数五 字符串型，可选参数，停止结果输出标志，一般用在微调模型上，例如 stop = '["END"]'
//返回json类型，{{text:string, finish:boolean} || null}
//text 返回的答案内容
//finish 为true回答结束，false 还有未输出的答案。我们可以继续 prompt + 输出的答案 获取后续内容，直到finish为true

await windowsBot.chatgptEdit(model, input, instruction, maxTokens, temperature);
//使用chatgpt编辑模式
//参数一 字符串型，指定使用的模型,"text-davinci-edit-001"、"code-davinci-edit-001"
//参数二 字符串型，要编辑的文本
//参数三 字符串型，提示如何去编辑修改
//参数四 最大令牌书，大约 3个字符1个令牌，1个汉字2个令牌
//参数五 浮点型，调节结果的创意程度，0为单一结果， 1创意度更高
//返回json类型，{{text:string, finish:boolean} || null}
//text 返回的答案内容
//finish 为true回答结束，false 还有未输出的答案。我们可以继续 prompt + 输出的答案 获取后续内容，直到finish为true

''' 代码示例
//初始化
let bRet = await windowsBot.initOpenAi("sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
if(!bRet)
    return ;

//chatgpt
let result = await windowsBot.chatgpt("text-davinci-003", "怎么称呼你？", 256, 0.7);
console.log(result["text"]);

//chatgpt 循环获取答案
let prompt = "请介绍下Aibote的应用场景，不少于500字";
let isFinish;
do{
    let result = await windowsBot.chatgpt("text-davinci-003", prompt, 256, 0.7);
    isFinish = result["finish"];
    if(!isFinish)
        prompt += result["text"];
    
    console.log(result["text"]);
}while(!isFinish)

//chatgptEdit
let result = await windowsBot.chatgptEdit("text-davinci-edit-001", "你好码？","修正错误文字" 256, 0);
console.log(result["text"]);
'''
````

### 训练模型
````javascript
await windowsBot.createFineTune(fileId, baseModel, suffix);
//创建微调模型
//参数一 字符串型，文件id，可通过 uploadTrainFile函数上传并获取文件id
//参数二 字符串型，基础模型，可以是以下参数之一，"ada", "babbage", "curie", "davinci"和自定义微调模型
//参数三 字符串型  微调生成的模型名称后缀，不建议使用中文
//成功返回微调id，失败返回null

await windowsBot.listFineTunes();
//列出所有微调信息
//返回json对象数组 {[{baseModel:string, object:string, fineTuneId:string, fineTunedModel:string, fineTuneStatus:string, fileName:string, fileId:strinig, fileStatus:string}, ...] || null}
//baseModel 基础模型，一般是"ada", "babbage", "curie", "davinci"
//object 
//fineTuneId 微调id
//fineTunedModel 微调模型的名称
//fineTuneStatus 正在微调模型的进度状态
//fileName 训练数据文件的名称
//fileId 训练数据文件的id
//fileStatus 训练数据文件的状态

await windowsBot.listFineTune(fineTuneId);
//获取指定微调id的详细信息
//参数一 字符串型 微调id
//返回json对象 {{baseModel:string, fineTuneCosts:string, fineTunedModel:string, fineTuneStatus:string, fileName:string, fileId:string,  fileStatus:string} || null} 
//baseModel 基础模型，一般是"ada", "babbage", "curie", "davinci"
//fineTuneCosts 训练该模型消耗的$
//fineTunedModel 微调模型的名称
//fineTuneStatus 正在微调模型的进度状态
//fileName 训练数据文件的名称
//fileId 训练数据文件的id
//fileStatus 训练数据文件的状态

await windowsBot.cancelFineTune(fineTuneId);
//取消正在微调的作业
//参数一 字符串型, 微调id
//成功返回true，失败返回false

await windowsBot.deleteFineTuneModel(fineTuneId);
//删除微调模型
//参数一 字符串型, 微调id
//成功返回true，失败返回false
````

### 训练数据文件
````javascript
await windowsBot.uploadTrainFile(filePath);
//上传训练文件到服务器
//参数一 字符串型, 文件路径，不支持中文路径
//成功返回文件id，失败返回null

await windowsBot.listTrainFiles();
//列出所有训练文件信息
//返回json对象数组 {Promise.<[{bytes:number, fileName:string, fileId:string, purpose:string}] || null>}
//bytes 训练数据文件的大小
//fileName 训练数据文件的名称
//fileId 训练数据文件的id
//purpose 文件的意图 例如："fine-tune" 意图为 用作微调模型

await windowsBot.listTrainFile(fileId);
//参数一 字符串型， 文件id
//返回json对象 {Promise.<{bytes:number, fileName:string, fileId:string, purpose:string} || null>}
//bytes 训练数据文件的大小
//fileName 训练数据文件的名称
//fileId 训练数据文件的id
//purpose 文件的意图 例如："fine-tune" 意图为 用作微调模型

await windowsBot.downloadTrainFile(fileId);
//下载训练文件内容
//参数一 字符串型， =文件id
//成功返回文件内容，失败返回null

await windowsBot.deleteTrainFile(fileId);
//删除训练文件
//参数一 字符串型， =文件id
//成功返回文件内容，失败返回null
````

## 关闭WindowsDriver.exe驱动程序
````javascript
await windowsBot.closeDriver();
````

# WebBot开发手册
## 主函数示例
````javascript
const WebBot = require('WebBot');//引用WebBot模块

//注册主函数
WebBot.registerMain(webMain, "127.0.0.1", 36678, {browserName:"chrome"});

/**用作代码提示，webMain函数会被多次调用，注意使用全局变量
* @param {WebBot} webBot
*/
async function webMain(webBot){
    //设置隐式等待
    await webBot.setImplicitTimeout(5000);

    await webBot.goto("https://www.baidu.com/");
    await webBot.sendKeys('//*[@id="kw"]', "Aibote\r");
}
````
## 注册主函数
````javascript
WebBot.registerMain(webMain, "127.0.0.1", 36678, {browserName:"chrome"});
//参数一 函数行，要注册的函数，必须含一个参数，用作接收WebBot对象
//参数二 字符串型，脚本所在的地址，传递给WebDriver.exe。如果值为 "127.0.0.1"脚本会将参数 ip和port作为启动参数并启动WebDriver.exe，否则用户需要手动启动WebDriver.exe 并且提供启动参数。
//命令行启动示例：WebDriver.exe "{\"serverIp\":\"127.0.0.1\", \"serverPort\":26678, \"browserName\":\"chrome\", \"debugPort\":0, \"userDataDir\":\"./UserData\", \"browserPath\":\"null\", \"argument\":\"null\"}"
//参数三 整型，监听端口，传递给WebDriver.exe。脚本多进程需要指定不同的端口
//参数四 json对象，{{browserName:string, debugPort:number, userDataDir:string, browserPath:string, argument:string}} 可选参数
//browserName 浏览器名称，默认 chrome 浏览器。edge和chrome会自动寻找浏览器路径，其他浏览器需要指定browserPath。
//debugPort 调试端口。默认 0 随机端口。指定端口则接管已打开的浏览器。启动浏览器指定的参数 --remote-debugging-port=19222 --user-data-dir=C:\\Users\\电脑用户名\\AppData\\Local\\Google\\Chrome\\User Data
//userDataDir 用户数据目录,默认./UserData。多进程同时操作多个浏览器数据目录不能相同。第一次指定数据目录路径会进入浏览器欢迎界面，第二次恢复正常操作
//browserPath 浏览器路径
//argument 浏览器启动参数。例如：无头模式: --headless   设置代理：--proxy-server=127.0.0.1:8080，多个启动参数空格隔开

''' 代码示例
//指定调试端口，接管已打开的浏览器。启动浏览器指定的参数 --remote-debugging-port=19222 --user-data-dir=C:\\Users\\电脑用户名\\AppData\\Local\\Google\\Chrome\\User Data
await WebBot.registerMain(webMain, "127.0.0.1", 36678, {browserName:"chrome", debugPort:19222});//debugPort:19222 必须和 --remote-debugging-port=19222 端口对应

//指定浏览器路径
await WebBot.registerMain(webMain, "127.0.0.1", 36678, {browserName:"360浏览器", browserPath:"D:\\Program Files\\360se.exe"});

//启动参数指定User-Agent
await WebBot.registerMain(webMain, "127.0.0.1", 36678, {browserName:"chrome", argument:"--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"});

//云端远程部署
await WebBot.registerMain(webMain, "192.168.1.88", 36678, {browserName:"chrome"});
'''
````

## 等待超时
````javascript
await webBot.sleep(3000);
//显示等待
//参数一 整型，等待时间，单位毫秒

await webBot.setImplicitTimeout(waitMs, intervalMs = 100);
//隐式等待
//参数一 整型，等待时间，单位毫秒
//参数二 整型，心跳间隔，单位毫秒。可选参数，默认100毫秒
//作用全局，程序起始设置一次即可。并发会影响实际等待时间
````
## 页面和导航
````javascript
await webBot.goto('http://www.ai-bot.net');
//参数一 字符串型，打开指定URL，http://或者 https://开头
//总是返回true

await webBot.newPage('https://www.baidu.com');
//参数一 字符串型，新建tab页面并跳转到指定url
//成功返回true，失败返回false

await webBot.back();
//后退

await webBot.forward();
//前进

await webBot.refresh();
//刷新

await webBot.getCurPageId();
//获取当前页面ID

await webBot.getAllPageId();
//成功返回页面ID数组,失败返回null

await webBot.switchPage(pageId);
//切换指定页面
//参数一 字符串型，要切换的页面ID
//成功返回true，失败返回false。如果失败继续操作，会造成不可知的错误

await webBot.closePage();
//关闭当前页面

await webBot.getCurrentUrl();
//获取URL

await webBot.getTitle();
//获取页面标题
````
## IFrame
````javascript
await webBot.switchFrame(xpath);
//切换frame
//参数一 字符串型，要切换frame的元素路径。
//成功返回true，失败返回false

''' 代码示例
//切换iframe
let xpath = "/html/body/div[3]/div[3]/div[1]/div/div[3]/div[1]/div[1]/iframe";
await webBot.switchFrame(xpath);
'''


await webBot.switchMainFrame();
//切换主frame，人为关闭/切换页面也需要通过此函数切换到当前页面
//成功返回true，失败返回false
````
## 元素操作
````javascript
await webBot.clickElement(xpath);
//点击元素
//参数一 字符串型，元素路径
//成功返回true 失败返回false

await webBot.setElementValue(xpath, value);
//设置编辑框内容
//参数一 字符串型，元素路径
//参数二 字符串型，输入的值
//成功返回true 失败返回false

await webBot.getElementText(xpath);
//获取文本
//参数一 字符串型，元素路径
//成功返回元素文本内容，一般指元素innerText属性的值，失败返回null

''' 代码示例
//遍历xpath 获取所有兄弟节点内容
for(let i = 1; ; i++){
    let text = await webBot.getElementText(`//*[@id="s-top-left"]/a[${i}]`);//模板字符串
    if(text == null)
        break;
    
    console.log(text);
}
'''



await webBot.getElementOuterHTML(xpath);
//获取outerHTML
//参数一 字符串型，元素路径
//成功返回元素outerHTML，失败返回null

await webBot.getElementInnerHTML(xpath);
//获取innerHTML
//参数一 字符串型，元素路径
//成功返回元素outerHTML，失败返回null

await webBot.setElementAttribute(xpath, attributeName, value);
//设置属性值
//参数一 字符串型，元素路径
//参数二 字符串型，指定的属性名
//参数三 字符串型，属性值
//成功返回true，失败返回false

await webBot.getElementAttribute(xpath, attributeName);
//获取属性值
//参数一 字符串型，元素路径
//参数二 字符串型，指定的属性名
//成功返回元素属性值，失败返回null

await webBot.getElementRect(xpath);
//获取矩形位置
//参数一 字符串型，元素路径
//返回 {left:number, top:number, right:number, bottom:number, width:number, height:number}，失败返回null

await webBot.isSelected(xpath);
//判断该元素是否选中
//参数一 字符串型，元素路径
//返回true 或 false

await webBot.isDisplayed(xpath);
//判断该元素是否可见
//参数一 字符串型，元素路径
//返回true 或 false

await webBot.isEnabled(xpath);
//判断元素是否可用
//参数一 字符串型，元素路径
//返回true 或 false

await webBot.clearElement(xpath);
//清除元素值
//参数一 字符串型，元素路径
//成功返回true 失败返回false

await webBot.setElementFocus(xpath);
//设置元素焦点
//参数一 字符串型，元素路径
//成功返回true 失败返回false

await webBot.uploadFile(xpath, filePath);
//通过元素上传文件
//参数一 字符串型，元素路径
//参数二 字符串型，本地文件路径，路径不存在会导致网页崩溃
//成功返回true 失败返回false
````
## 鼠标键盘
````javascript
await webBot.sendKeys(xpath, text);
//发送文本
//参数一 字符串型，元素路径
//参数二 字符串型，要输入的文本，例如sendKeys('//*[@id="kw"]', 'aibote\r'); aibote换行
//成功返回true 失败返回false

''' 代码示例
//输入 aibote换行
await webBot.sendKeys("//*[@id=\"kw\"]", "aibote\r");
'''


await webBot.sendVk(vkCode);
//发送Vk虚拟键
//参数一 整型，VK键值，仅支持 回退键:8  制表键:9  回车键:13  空格键:32  方向左键:37  方向上键:38  方向右键:39  方向下键:40  删除键:46
//成功返回true 失败返回false

await webBot.clickMouse(x, y, msg);
//点击鼠标
//参数一 整型，横坐标，非Windows坐标，页面左上角为起始坐标
//参数二 整型，纵坐标，非Windows坐标，页面左上角为起始坐标
//参数三 整型，单击左键:1  单击右键:2  按下左键:3  弹起左键:4  按下右键:5  弹起右键:6  双击左键:7 
//成功返回true 失败返回false

await webBot.moveMouse(x, y);
//移动鼠标
//参数一 整型，横坐标，非Windows坐标，页面左上角为起始坐标
//参数二 整型，纵坐标，非Windows坐标，页面左上角为起始坐标
//成功返回true 失败返回false

await webBot.wheelMouse(deltaX, deltaY, x, y);
//滚动鼠标
//参数一 整型，水平滚动条移动的距离
//参数二 整型，垂直滚动条移动的距离
//参数三 整型，可选参数，鼠标横坐标位置， 默认为0
//参数四 整型，可选参数，鼠标纵坐标位置， 默认为0
//成功返回true 失败返回false

await webBot.clickMouseByXpath(xpath, msg);
//通过xpath 点击鼠标(元素中心点)
//参数一 字符串型，元素路径
//参数二 整型，单击左键:1  单击右键:2  按下左键:3  弹起左键:4  按下右键:5  弹起右键:6  双击左键:7 
//成功返回true 失败返回false

await webBot.moveMouseByXpath(xpath);
//通过xpath 移动鼠标(元素中心点)
//参数一 字符串型，元素路径
//成功返回true 失败返回false

await webBot.wheelMouseByXpath(xpath, deltaX, deltaY);
//通过xpath 滚动鼠标
//参数一 字符串型，元素路径
//参数二 整型，水平滚动条移动的距离
//参数三 整型，垂直滚动条移动的距离
//成功返回true 失败返回false
````
## 截图
````javascript
await webBot.takeScreenshot(xpath = null);
//参数一 字符串型，可选参数，元素路径。 如果指定元素路径，则截取元素图片。默认截取全屏
//返回字符串 base-64 编码。 PNG 格式，失败返回null

''' 代码示例
//截图并且保存图片到电脑
//const fs = require("fs"); //导入fs模块
let base64 = await webBot.takeScreenshot();
base64 = base64.replace(/^data:image\/\w+;base64,/,"");
let data = new Buffer.from(base64, "base64");
await fs.writeFileSync("d:\\1.png", data);
'''
````
## alert/prompt弹窗
````javascript
await webBot.clickAlert(acceptOrCancel, promptText = "");
//点击警告框
//参数一 布尔型，true接受, false取消
//参数二 字符串型，可选参数，输入prompt警告框文本
//成功返回true，失败返回false

await webBot.getAlertText();
//获取警告框内容
//返回警告框内容
````
## cookie操作
````javascript
await webBot.getCookies(url);
//获取指定url匹配的cookies
//参数一 字符串型，指定的url http://或https:// 起头
//成功返回json格式的字符串，失败返回null

await webBot.getAllCookies();
//获取指定url匹配的cookies
//成功返回json格式的字符串，失败返回null

await webBot.setCookie(cookieParam);
//设置cooki
//参数一 json类型，{"name":string, "value":string, "url":string, "domain":string, "path":string, "secure":boolean, "httpOnly":boolean, "sameSite":string, "expires":number, "priority":string, "sameParty":boolean, "sourceScheme":string, "sourcePort":number, "partitionKey":string}  name、value和url必填参数，其他参数可选
//成功返回true，失败返回false

await webBot.deleteCookies(name, options = {});
//删除指定cookies
//参数一 字符串型，要删除的 Cookie 的名称。
//参数二 json类型，{{url:string, domain:string, path:string}} 可选参数
                //url 如果指定，则删除所有匹配 url 和 name的Cookie
                //domain 如果指定，则删除所有匹配 domain 和 name的Cookie
                //path 如果指定，则删除所有匹配 path 和 name的Cookie
//成功返回true，失败返回false

await webBot.deleteAllCookies();
//删除所有cookies
//成功返回true，失败返回false

await webBot.clearCache();
//清除缓存
//成功返回true，失败返回false

````
## 注入JavaScript
````javascript
await webBot.executeScript(script);
//执行JavaScript 代码
//参数一 字符串型，注入的js代码
//假如注入代码为函数且有return语句，则返回retrun 的值，否则返回null;  注入示例：(function () {return "aibote rpa"})();
//注入的代码含有反斜杠"\"需要转义"\\"

''' 代码示例
//注入js代码
await webBot.executeScript('alert("aibote")');

//注入js代码并返回值
let ret = await webBot.executeScript('(function () {return "aibote rpa"})();');
console.log(ret);//输出aibote rpa
'''
````
## 浏览器窗口
````javascript
await webBot.getWindowPos();
//获取窗口位置和状态
//成功返回矩形位置和窗口状态，失败返回null

await webBot.setWindowPos(windowState, rect = {left:0, top:0, width:0, height:0});
//设置窗口位置和状态
//参数一 字符串型，窗口状态，正常:"normal"  最小化:"minimized"  最大化:"maximized"  全屏:"fullscreen"
//参数二 json类型，可选参数，浏览器窗口位置，此参数仅windowState 值为 "normal" 时有效
//成功返回true，失败返回false
````
## 手机浏览器仿真
````javascript
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

''' 代码示例
//模拟 Android 7.0  地理位置 上海
await webBot.mobileEmulation(500, 800, "Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36", 
                            "Android", "7.0", "zh-Hans-CN", "Asia/Shanghai", 31.230416, 121.473701, 1111);
'''
````
## 关闭浏览器
````javascript
await webBot.closeBrowser();
//总是返回true
````

## 关闭WebDriver.exe驱动程序
````javascript
await webBot.closeDriver();
````

# WebSocketBot开发手册
## WebSocketBot&AndroidBot 启动App示例
### 服务端node.js
````javascript
const WebSocketBot = require('WebSocketBot');//引用WebSocketBot
const AndroidBot = require('AndroidBot');//引用AndroidBot模块

//构建WebSocketBot
let webSocketBot = WebSocketBot.build(async (data, isBinary)=>{
    //解析客户端字符串格式数据
    //let strMsg = data.toString();

    //解析客户端json格式数据
    let jsonMsg = JSON.parse(data);
    let command = jsonMsg["command"];
    let msg = jsonMsg["data"];
    switch(command){
        case "startApp":
            //遍历所有的androidBot 执行命令，可在循环内判断安卓androidId 选择设备执行
            for(let i = 0; i < webSocketBot.androidsBot.length; i++){
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
async function androidMain(androidBot){
    //设置隐式等待
    await androidBot.setImplicitTimeout(5000);
    //获取安卓id
    let androidId = await androidBot.getAndroidId();

    //存入androidBot 和 androidId
    webSocketBot.androidsBot.push(androidBot);
    webSocketBot.androidsId.push(androidId);
}
````

### 客户端html
````javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Aibote中控</title>

<style>
    .aiboteLog{
        width: 480px;
        height: 200px;
    }
    body{width: 500px; height: 300px;}
</style>

</head>
<body>
    <textarea class="aiboteLog" id="aiboteLog" placeholder="Aibote 执行日志"></textarea>
    <br><br>
    <input id="appName" placeholder="输入App名称">
    <br><br>
    <button id="startApp">打开App</button>
</body>

<script type="text/javascript">
    let ws = new WebSocket('ws://localhost:8181');//服务端端口8181 对应WebSocketBot.build第二个参数
    ws.onopen = function(){
        console.log("连接服务器成功");
    }

    ws.onclose = function(e){
        console.log("服务器关闭");
    }

    ws.onerror = function(e){
        console.log("连接出错");
    }
    
    let aiboteLog = document.getElementById("aiboteLog");
    ws.onmessage = function(msg){
        //接收服务端的数据
        let message = msg.data;
        aiboteLog.value += message + "\n";
    }

    let startApp = document.getElementById("startApp");
    startApp.onclick = function(){
        let appName = document.getElementById("appName").value;
        //发送json数据格式
        let jsonMsg = {
            "command":"startApp",
            "data":appName
        }
        //json格式转换成字符串
        let strMsg = JSON.stringify(jsonMsg);
        ws.send(strMsg);//发送数据到服务端
    }
</script>
</html>
````
## WebSocketBot&WebBot url跳转示例
### 服务端node.js
````javascript
const WebBot = require('WebBot');//引用WebBot模块
const WebSocketBot = require('WebSocketBot');//引用WebSocketBot

let gWebBot = null;//定义全局变量，存放WebBot对象

//构建WebSocketBot
let webSocketBot = WebSocketBot.build(async (data, isBinary)=>{
    //解析客户端字符串格式数据
    //let strMsg = data.toString();

    //解析客户端json格式数据
    let jsonMsg = JSON.parse(data);
    let command = jsonMsg["command"];
    let msg = jsonMsg["data"];
    switch(command){
        case "openUrl":
            await gWebBot.goto(msg);
            webSocketBot.sendData("已打开" + msg);
            break;
    }
}, 8181);


//注册主函数
WebBot.registerMain(webMain, "127.0.0.1", 36678, {browserName:"chrome"});

/**用作代码提示，webMain函数会被多次调用，注意使用全局变量
* @param {WebBot} webBot
*/
async function webMain(webBot){
    //设置隐式等待
    await webBot.setImplicitTimeout(5000);

    gWebBot = webBot;//赋值给全局变量
}
````

### 客户端html
````javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Aibote中控</title>

<style>
    .aiboteLog{
        width: 480px;
        height: 200px;
    }
    body{width: 500px; height: 300px;}
</style>

</head>
<body>
    <textarea class="aiboteLog" id="aiboteLog" placeholder="Aibote 执行日志"></textarea>
    <br><br>
    <input id="valUrl" placeholder="输入url">
    <br><br>
    <button id="btnOpen">跳转网址</button>
</body>

<script type="text/javascript">
    let ws = new WebSocket('ws://localhost:8181');//服务端端口8181 对应WebSocketBot.build第二个参数
    ws.onopen = function(){
        console.log("连接服务器成功");
    }

    ws.onclose = function(e){
        console.log("服务器关闭");
    }

    ws.onerror = function(e){
        console.log("连接出错");
    }
    
    let aiboteLog = document.getElementById("aiboteLog");
    ws.onmessage = function(msg){
        //接收服务端的数据
        let message = msg.data;
        aiboteLog.value += message + "\n";
    }

    let btnOpen = document.getElementById("btnOpen");
    btnOpen.onclick = function(){
        let url = document.getElementById("valUrl").value;
        //发送json数据格式
        let jsonMsg = {
            "command":"openUrl",
            "data":url
        }
        //json格式转换成字符串
        let strMsg = JSON.stringify(jsonMsg);
        ws.send(strMsg);//发送数据到服务端
    }
</script>
</html>
````

## WebSocketBot&WindowsBot QQ发送消息示例
### 服务端node.js
````javascript
const WindowsBot = require('WindowsBot');//引用WindowsBot模块
const WebSocketBot = require('WebSocketBot');//引用WebSocketBot

let gWindowsBot = null;//定义全局变量，存放WindowsBot对象

//构建WebSocketBot
let webSocketBot = WebSocketBot.build(async (data, isBinary)=>{
    //解析客户端字符串格式数据
    //let strMsg = data.toString();


    //通过全局windowsBot获取聊天窗口句柄
    let hwnd = await gWindowsBot.findWindow(null, "Ai-Bot 3群");

    //解析客户端json格式数据
    let jsonMsg = JSON.parse(data);
    let command = jsonMsg["command"];
    let msg = jsonMsg["data"];
    switch(command){
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
async function windowsMain(windowsBot){
    //设置隐式等待
    await windowsBot.setImplicitTimeout(5000);

    gWindowsBot = windowsBot;//赋值给全局变量
}
````
### 客户端html
````javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Aibote中控</title>

<style>
    .aiboteLog{
        width: 480px;
        height: 200px;
    }
    body{width: 500px; height: 300px;}
</style>

</head>
<body>
    <textarea class="aiboteLog" id="aiboteLog" placeholder="Aibote 执行日志"></textarea>
    <br><br>
    <input id="valText" placeholder="输入发送的内容">
    <br><br>
    <button id="btnSend">发送消息</button>
</body>

<script type="text/javascript">
    let ws = new WebSocket('ws://localhost:8181');//服务端端口8181 对应WebSocketBot.build第二个参数
    ws.onopen = function(){
        console.log("连接服务器成功");
    }

    ws.onclose = function(e){
        console.log("服务器关闭");
    }

    ws.onerror = function(e){
        console.log("连接出错");
    }
    
    let aiboteLog = document.getElementById("aiboteLog");
    ws.onmessage = function(msg){
        //接收服务端的数据
        let message = msg.data;
        aiboteLog.value += message + "\n";
    }

    let btnSend = document.getElementById("btnSend");
    btnSend.onclick = function(){
        let text = document.getElementById("valText").value;
        //发送json数据格式
        let jsonMsg = {
            "command":"sendMessage",
            "data":text
        }
        //json格式转换成字符串
        let strMsg = JSON.stringify(jsonMsg);
        ws.send(strMsg);//发送数据到服务端
    }
</script>
</html>
````

# 多模块混合开发
## WindowsBot & WebBot
````javascript
const WindowsBot = require('WindowsBot');//引用WindowsBot模块
const WebBot = require('WebBot');//引用WebBot模块

//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);
WebBot.registerMain(webMain, "127.0.0.1", 36678, {browserName:"chrome"});

//bot 存放全局变量
let gWindowsBot;
let gWebBot;

//回调函数接受存放驱动Bot
async function windowsMain(windowsBot){
    gWindowsBot = windowsBot;
}
async function webMain(webBot){
    gWebBot = webBot;
}


/**用作代码提示
 * @param {WindowsBot} windowsBot
 * @param {WebBot} webBot
*/
async function main(windowsBot, webBot){
    //WebBot和WindowsBot 大多数都是本地启动驱动程序，因此只有一个驱动对象，我们可以采用此方式处理。
    //如果WebBot或者WindowsBot其中有采用云端远程连接方式，我们可以参考下面的 WindowsBot & AndroidBot 实现方案

    //为null，等待再赋值
    if(windowsBot == null || webBot == null){
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
````

## WindowsBot & AndroidBot
````javascript
const WindowsBot = require('WindowsBot');//引用WindowsBot模块
const AndroidBot = require('AndroidBot');//引用AndroidBot模块

//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);//windowsMain 应当在 androidMain之前注册，以防在androidMain 函数内，出现gWindowsBot未赋值情况
AndroidBot.registerMain(androidMain, 16678);

//bot 存放全局变量
let gWindowsBot = null;

//回调 函数接受存放驱动Bot
async function windowsMain(windowsBot){
    gWindowsBot = windowsBot;
}

/**用作代码提示，androidMain函数会被多次调用，注意使用全局变量
* @param {AndroidBot} androidBot
*/
async function androidMain(androidBot){
    //AndroidBot较为特殊，它是纯云端构架，只能远程等待连接。不像WebBot和WindowsBot 可以本地执行驱动，也可以远程等待驱动连接
    //AndroidBot 云端构架多设备连接的特殊性，我们直接在回到函数处理
    //用户也可以将androidBot存入数组，在其他函数调用。可参考WebSocketBot&AndroidBot 服务端node.js 代码

    //为null，等待gWindowsBot赋值
    if(gWindowsBot == null)
        await androidBot.sleep(3000);

    //这里直接使用gWindowsBot。
    await gWindowsBot.setImplicitTimeout(5000);
    await androidBot.setImplicitTimeout(3000);

    //实现功能
}
````

# 界面开发手册
````javascript
AiboteScriptUI底层基于chromium内核，可使用html、ccs等语言开发界面。另外我们底层添加四个函数用于实现脚本执行和传参。
启动AiboteScriptUI.exe程序会自动附加当前目录下index.html文件，界面开发工作主要在这个文件
````
## 界面宽高
````javascript
SetAiboteSize(width, height);
//AiboteScriptUI 宽高 由document.body.offsetHeight 和 document.body.offsetWidth决定
//此函数脚本作者不可见，内部自动执行。脚本作者需要设定页面 body 宽高
````
## 启动脚本
````javascript
StartScript("../testAibote.js", true);
//参数一 字符串型。要启动脚本的路径，空格分隔脚本参数。 脚本可通过 let args = process.argv.splice(2); 接收参数
//参数二 布尔类型。是否显示控制台日志，true 显示控制台日志
//返回值 脚本进程ID
````
## 停止脚本
````javascript
StopScript(processId);
//参数一 数字型。脚本进程ID
//成功返回true 失败返回false
````
## 输出日志
````javascript
PrintAiboteLog();
//当StartScript第二个参数为 false 时有效，可以使用 setInterval 循环输出，输出10000字节时，会自动清空内容
//返回脚本输出内容
````