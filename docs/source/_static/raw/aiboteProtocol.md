# 使用须知
````javascript
Aibote是江西爱伯特科技自主研发的一款纯代码RPA办公自动化框架，支持Android、Browser和Windows 三大平台。框架免费、API和接口协议开源，个人、企业商用零费用
以socket tcp接口协议通信方式命令驱动，支持任何一门计算机语言调用。OEM或特殊接口定制等商业合作联系QQ：1600381943

Aibote能力：
        1、AndroidBot，底层自主研发，支持安卓原生APP和H5界面元素和图色定位。元素元素定位速度是Appium框架的的10倍，2340*1080 图色定位仅需要50毫秒！
        2、WindowsBot，底层自主研发，支持Windows应用、.NET、WinForm、WPF、QT、JAVA(Swing和AWT等GUI库)和Electron 等语言开发的窗口界面元素和图色定位，独家xpath算法 简洁急速，
        元素/图色定位速度分别是可视化RPA的3倍和20倍！
        3、WebBot，底层自主研发，支持chromium内核的所有浏览器和应用。C/C++语言基于浏览器内核协议研发而成的一款web自动化框架。速度是selenium 10倍！
        4、Android远程投屏，底层自主研发，可在一台电脑监控观察多台安卓RPA机器人运行状态并批量管理操作
        5、自建OCR服务器，支持文字识别和定位，免费且不限制使用次数！
        6、自研AiboteScriptUI界面开发工具，提供人机交互功能，打包exe发布机器人可以在离线环境运行！
````

# 数据包收发格式
````javascript
框架封装作者应当考虑远程部署数据包传输完整性问题

发送命令协议格式：len/len/len...\ndata
//len：函数名和参数的(字节)长度，统一为十进制 字符串类型
//data：函数名和参数数据 类型为 字符串或字节类型(string/byte) 

接收命令协议格式：len/data
//len：返回数据包的(字节)长度
//data：返回的数据，类型为字符串或字节类型(string/byte) 
````

# AndoridBot开源协议
````javascript
Aibote安卓云端自动化框架，采用云端服务模式构建。由安卓手机客户端主动连接服务器/电脑服务端程序，
服务端应采用多线程TCP协议和多个安卓设备通信。构架模式决定了自动化代码部署在云端，能有效防止脚本被第三方恶意破解。
结合Aibote远程投屏技术，可直接连接远程用户设备做自动化机器人编写，完美解决远程自动化测试需求。独家图色定位算法，
50毫秒以内的速度遍历查找2340*1080分辨率的设备。为了让更多人体验到我们产品，我们决议在此公布框架协议，
希望有更多开发者能完善并封装成各种计算机语言，封装请参考nodejs版的函数说明

协议示例：
//截图保存
sendData("saveScreenshot", "/storage/emulated/0/Android/data/com.aibot.client/files/1.png", 80, 150, 30, 30, 0, 127, 255);
// 参数一：函数名称
// 参数二：保存的图片路径（手机）
// 参数三：矩形左上角x坐标
// 参数四：矩形左上角y坐标
// 参数五：矩形右下角x坐标
// 参数六：矩形右下角y坐标
// 参数七：二值化算法类型
// 参数八：二值化阈值
// 参数九：二值化最大值
发送数据包：14/61/2/3/2/2/1/3/3\nsaveScreenshot/storage/emulated/0/Android/data/com.aibot.client/files/1.png8015030300127255
返回数据包："false"或者 "true"

//获取色值
sendData("getColor", 100, 200);
// 参数一：函数名称
// 参数二：x坐标
// 参数三：y坐标
数据包：8/3/3\ngetColor100200
返回数据包：#000000

//找图
sendData("findImage", "/storage/emulated/0/Android/data/com.aibot.client/files/1.png", 0, 0, 0, 0, 0.95, 0, 0, 0, 1);
// 参数一：函数名称
// 参数二：保存的图片路径（手机）
// 参数三：矩形左上角x坐标
// 参数四：矩形左上角y坐标
// 参数五：矩形右下角x坐标
// 参数六：矩形右下角y坐标
// 参数七：相似度
// 参数八：二值化算法类型
// 参数九：二值化阈值
// 参数十：二值化最大值
// 参数十一：多个坐标点
数据包：9/61/1/1/1/1/4/1/1/1/1\nfindImage/storage/emulated/0/Android/data/com.aibot.client/files/1.png00000.950001
返回数据包：单坐标点成功"x|y"  多坐标点成功 "x1|y1/x2|y2..."  失败"-1.0|-1.0"

//找动态图
sendData("findAnimation", 100, 0, 0, 0, 0);
// 参数一：函数名称
// 参数二：前后两张图相隔的时间，单位毫秒
// 参数三：矩形左上角x坐标
// 参数四：矩形左上角y坐标
// 参数五：矩形右下角x坐标
// 参数六：矩形右下角y坐标
数据包：13/3/0/0/0/0\nfindAnimation1000000
返回数据包：单坐标点成功"x|y"  多坐标点成功 "x1|y1/x2|y2..."  失败"-1.0|-1.0"

//找色
sendData("findColor", "#e8f2f8", "10/20/#e7f0f7", 0, 0, 0, 0, 1);
// 参数一：函数名称
// 参数二：主颜色值
// 参数三：相对偏移的颜色点，以 "x坐标+y坐标+色值" 字符串形式
// 参数四：矩形左上角x坐标
// 参数五：矩形左上角y坐标
// 参数六：矩形右下角x坐标
// 参数七：矩形右下角y坐标
// 参数八：相似度
数据包：9/7/13/1/1/1/1/1\nfindColor#e8f2f810/20/#e7f0f700001
返回数据包：成功"x|y" 失败"-1.0|-1.0"

//比色
sendData("compareColor", 100, 200, "#e8f2f8", "10/20/#e7f0f7", 0, 0, 0, 0, 1);
// 参数一：函数名称
// 参数二：主颜色值所在的X坐标
// 参数三：主颜色值所在的Y坐标
// 参数四：主颜色值
// 参数五：相对偏移的颜色点，以 "x坐标+y坐标+色值" 字符串形式
// 参数六：矩形左上角x坐标
// 参数七：矩形左上角y坐标
// 参数八：矩形右下角x坐标
// 参数九：矩形右下角y坐标
// 参数十：相似度
数据包：12/3/3/7/13/1/1/1/1/1\ncompareColor100200#e8f2f810/20/#e7f0f700001
返回数据包："false"或者 "true"

//手指按下
sendData("press", 10, 20, 3000);
// 参数一：函数名称
// 参数二：x坐标
// 参数三：y坐标
// 参数四：按下持续时间
数据包：5/2/2/4\npress10203000
返回数据包："false"或者 "true"

//手指移动
sendData("move", 10, 20, 3000);
// 参数一：函数名称
// 参数二：x坐标
// 参数三：y坐标
// 参数四：移动持续时间
数据包：4/2/2/4\nmove10203000
返回数据包："false"或者 "true"

//手指抬起
sendData("release");
// 参数一：函数名称
数据包：7\nrelease
返回数据包："false"或者 "true"

//点击坐标
sendData("click", 200, 500);
// 参数一：函数名称
// 参数二：x坐标
// 参数三：y坐标
数据包：5/3/3\nclick200500
返回数据包："false"或者 "true"

//双击坐标
sendData("doubleClick", 200, 500);
// 参数一：函数名称
// 参数二：x坐标
// 参数三：y坐标
数据包：11/3/3\ndoubleClick200500
返回数据包："false"或者 "true"

//长按坐标
sendData("longClick", 10, 20, 3000);
// 参数一：函数名称
// 参数二：x坐标
// 参数三：y坐标
// 参数四：长按持续时间
数据包：9/2/2/4\nlongClick10203000
返回数据包："false"或者 "true"

//滑动坐标
sendData("swipe", 10, 10, 200, 200, 1000);
// 参数一：函数名称
// 参数二：开始x坐标
// 参数三：开始y坐标
// 参数四：结束x坐标
// 参数五：结束y坐标
// 参数六：滑动耗时
数据包：5/2/2/3/3/4\nswipe10102002001000
返回数据包："false"或者 "true"

//执行手势
sendData("dispatchGesture", "1000/1558\n100/100\n799/800\n234/89", 3000);
// 参数一：函数名称
// 参数二：执行手势坐标位， 以"/"分割横纵坐标 "\n"分割坐标点。注意：末尾坐标点没有\n结束
// 参数三：手势耗时
数据包：15/35/4\ndispatchGesture1000/1558\n100/100\n799/800\n234/893000
返回数据包："false"或者 "true"

//执行多个手势
sendData("dispatchGestures", "1000/100/100\n200/200\r\n2000/300/300\n500/500");
// 参数一：函数名称
// 参数二：执行手势坐标位， 以"/"分割手势时长、横纵和坐标 "\n"分割坐标点。"\r\n"分割多个手势
数据包：16/46\ndispatchGestures1000/100/100\n200/200\r\n2000/300/300\n500/500
返回数据包："false"或者 "true"

//发送文本
sendData("sendKeys", "aibot");
// 参数一：函数名称
// 参数二：文本内容
数据包：8/5\nsendKeysaibot
返回数据包："false"或者 "true"

//返回
sendData("back");
// 参数一：函数名称
数据包：4\nback
返回数据包："false"或者 "true"

//home
sendData("home");
// 参数一：函数名称
数据包：4\nhome
返回数据包："false"或者 "true"

//最近任务列表
sendData("recents");
// 参数一：函数名称
数据包：7\nrecents
返回数据包："false"或者 "true"

//发送按键
sendData("sendVk", 187);
// 参数一：函数名称
// 参数二：虚拟键值 按键对照表 https://blog.csdn.net/yaoyaozaiye/article/details/122826340
数据包：6/3\nsendVk187
返回数据包："false"或者 "true"

//启动App
sendData("startApp", "QQ");
// 参数一：函数名称
// 参数二：启动APP的名称或者包名
数据包：8/2\nstartAppQQ
返回数据包："false"或者 "true"

//屏幕大小
sendData("getWindowSize");
数据包：13\ngetWindowSize
返回数据包："width|height"

//图片大小
sendData("getImageSize", "/storage/emulated/0/Android/data/com.aibot.client/files/1.png");
数据包：12/61\nsaveScreenshot/storage/emulated/0/Android/data/com.aibot.client/files/1.png
返回数据包："width|height"

//获取安卓ID
sendData("getAndroidId");
数据包：12\ngetAndroidId
返回数据包："1f73c8f2f3b2f108"

//ocr
sendData("ocr", 0, 0, 0, 0, 0, 0, 0, 1.0);
数据包：3/1/1/1/1/1/1/1/3\nocr00000001.0
返回数据包：[[[7.0, 18.0], [61.0, 18.0], [61.0, 38.0], [7.0, 38.0]], ('办公自动化', 0.8806074261665344)][[[4.0, 94.0], [49.0, 94.0], [49.0, 118.0], [4.0, 118.0]], ('rpa', 0.978314220905304)]

//URL请求
sendData("urlRequest", "http://www.baidu.com", "GET", "null", "null");
数据包：10/20/3/4/4\nurlRequesthttp://www.baidu.comGETnullnull
返回数据包：返回请求数据内容

//Toast消息提示
sendData("showToast", "rpa", 1000);
数据包：9/2/4\nshowToastrpa1000
返回数据包："false"或者 "true"

//识别验证码
sendData("getCaptcha", "/storage/emulated/0/Android/data/com.aibot.client/files/1.png", "username", "password", "123456", "1004", "0");
数据包：10/61/8/8/6/4/1\n/storage/emulated/0/Android/data/com.aibot.client/files/1.pngusernamepassword12345610040
返回数据包："{"err_no":0,"err_str":"OK","pic_id":"9160109360600112681","pic_str":"8vka","md5":"35d5c7f6f53223fbdc5b72783db0c2c0"}"

//识别报错返分
sendData("errorCaptcha", "username", "password", "123456", "9160109360600112681");
数据包：12/8/8/6/19\nerrorCaptchausernamepassword1234569160109360600112681
返回数据包："{"err_no":0,"err_str":"OK"}"

//查询验证码剩余题分
sendData("scoreCaptcha", "username", "password");
数据包：12/8/8\nscoreCaptchausernamepassword
返回数据包："{"err_no":0,"err_str":"OK","tifen":821690,"tifen_lock":0}"

//获取元素位置
sendData("getElementRect", "com.aibot.client/com.aibot.client:id=inputServer");
数据包：14/48\ngetElementRectcom.aibot.client/com.aibot.client:id=inputServer
返回数据包："239|628|989|764"

//获取元素描述内容
sendData("getElementDescription", "com.aibot.client/com.aibot.client:id=inputServer");
数据包：21/48\ngetElementDescriptioncom.aibot.client/com.aibot.client:id=inputServer
返回数据包："192.168.2.7"

//获取元素文本
sendData("getElementText", "com.aibot.client/com.aibot.client:id=inputServer");
数据包：14/48\ngetElementTextcom.aibot.client/com.aibot.client:id=inputServer
返回数据包："192.168.2.7"

//设置元素文本
sendData("setElementText", "com.aibot.client/com.aibot.client:id=inputServer", "rpa");
数据包：14/48/3\nsetElementTextcom.aibot.client/com.aibot.client:id=inputServerrpa
返回数据包："false"或者 "true"

//点击元素
sendData("clickElement", "com.aibot.client/com.aibot.client:id=inputServer");
数据包：12/48\nclickElementcom.aibot.client/com.aibot.client:id=inputServer
返回数据包："false"或者 "true"

//滚动元素
sendData("scrollElement", "com.aibot.client/com.aibot.client:id=inputServer", 0);
数据包：13/48/1\nclickElementcom.aibot.client/com.aibot.client:id=inputServer0
返回数据包："false"或者 "true"

//判断元素是否存在
sendData("existsElement", "com.aibot.client/com.aibot.client:id=inputServer");
数据包：13/48\nexistsElementcom.aibot.client/com.aibot.client:id=inputServer
返回数据包："false"或者 "true"

//判断元素是否选中
sendData("isSelectedElement", "com.aibot.client/com.aibot.client:id=inputServer");
数据包：17/48\nisSelectedElementcom.aibot.client/com.aibot.client:id=inputServer
返回数据包："false"或者 "true"

//上传文件
sendData("pushFile", "/storage/emulated/0/1.png", fileData);
//fileData 文件字节数据
数据包：8/25/655423\npushFile/storage/emulated/0/1.pngfileData
返回数据包："false"或者 "true"

//拉取文件
sendData("pullFile", "/storage/emulated/0/1.png", "d:/1.png");
数据包：8/25/8\npullFile/storage/emulated/0/1.pngd:/1.png
返回数据包：文件字节数据

//写入安卓文件
sendData("writeAndroidFile", "/storage/emulated/0/1.txt", "aibote rpa", false);
数据包：16/25/10/5\nwriteAndroidFile/storage/emulated/0/1.txtaibote rpafalse
返回数据包："false"或者 "true"

//读取安卓文件
sendData("readAndroidFile", "/storage/emulated/0/1.txt");
数据包：15/25\nreadAndroidFile/storage/emulated/0/1.txt
返回数据包："aibote rpa"

//删除安卓文件
sendData("deleteAndroidFile", "/storage/emulated/0/Android/data/com.aibot.client/files/1.png");
数据包：17/61\ndeleteAndroidFile/storage/emulated/0/Android/data/com.aibot.client/files/1.png
返回数据包："false"或者 "true"

//判断文件是否存在
sendData("existsAndroidFile", "/storage/emulated/0/Android/data/com.aibot.client/files/1.png");
数据包：17/61\nexistsAndroidFile/storage/emulated/0/Android/data/com.aibot.client/files/1.png
返回数据包："false"或者 "true"

//跳转uri
sendData("openUri", "alipayqr://platformapi/startapp?saId=10000007");
数据包：7/45\nopenUrialipayqr://platformapi/startapp?saId=10000007
返回数据包："false"或者 "true"

//拨打电话
sendData("callPhone", "10086");
数据包：9/5\ncallPhone10086
返回数据包："false"或者 "true"

//发送短信
sendData("sendMsg", "10086", "123");
数据包：7/5/3\nsendMsg10086123
返回数据包："false"或者 "true"

//获取活动窗口(activity)
sendData("getActivity");
数据包：11\ngetActivity
返回数据包：".MainActivity"

//获取活动包名(package)
sendData("getPackage");
数据包：10\ngetPackage
返回数据包："com.aibot.client"

//设置剪切板文本
sendData("setClipboardText", "aibote");
数据包：16/6\nsetClipboardTextaibote
返回数据包："false"或者 "true"

//获取剪切板文本
sendData("getClipboardText");
数据包：16\ngetClipboardText
返回数据包："aibote"

//创建TextView控件
sendData("createTextView", 100, "Aibote TextView", 10, 10, 300, 100);
数据包：14/3/15/2/2/3/3\ngetcreateTextView100Aibote TextView1010300100
返回数据包："false"或者 "true"

//创建EditText控件
sendData("createEditText", 101, "Aibote EditText", 10, 10, 300, 100);
数据包：14/3/15/2/2/3/3\ngetcreateExitView101Aibote ExitView1010300100
返回数据包："false"或者 "true"

//创建CheckBox控件
sendData("createCheckBox", 102, "Aibote CheckBox", 10, 10, 300, 100);
数据包：14/3/15/2/2/3/3\ngetcreateCheckBox102Aibote CheckBox1010300100
返回数据包："false"或者 "true"

//创建WebView控件
sendData("createWebView", 103, "http://www.aibote.net", -1, -1, -1, -1);
数据包：13/3/22/2/2/2/2\ncreateWebView103http://www.aibote.net-1-1-1-1
返回数据包："false"或者 "true"

//清除脚本控件
sendData("clearScriptControl");
数据包：18\nclearScriptControl
返回数据包："false"或者 "true"

//获取脚本配置参数
sendData("getScriptParam");
数据包：14\ngetScriptParam
返回数据包：{"100":"Aibote TextView"}
````

# WindowsBot开源协议
````javascript
Aibote Windows自动化框架，由WindowsDriver.exe客户端驱动程序连接脚本服务端，采用TCP协议传输命令。
全国领先xpath元素定位算法，一键拾取控件元素、图色 坐标等属性。与安卓端代码统一书写格式，降低用户学习成本。
独家图色定位算法，50毫秒以内的速度遍历查找1920*1080分辨率的设备。为了让更多人体验到我们产品，
我们决议在此公布框架协议，希望有更多开发者能完善并封装成各种计算机语言，封装请参考nodejs版的函数说明

协议示例：
//查找句柄
sendData("findWindow", "className", "windowName");
// 参数一：函数名称
// 参数二：窗口类名
// 参数三：窗口名
发送数据包：10/9/10\nfindWindowclassNamewindowNmae
返回数据包：成功"65862"，失败 "null"

//查找句柄数组
sendData("findWindows", "className", "windowName");
// 参数一：函数名称
// 参数二：窗口类名
// 参数三：窗口名
发送数据包：11/9/10\nfindWindowsclassNamewindowNmae
返回数据包：成功返回多个句柄"65862|65863|65864"，失败 "null"

//查找子句柄
sendData("findSubWindow", 65862, "className", "windowName");
// 参数一：函数名称
// 参数二：当前窗口句柄
// 参数三：窗口类名
// 参数四：窗口名
发送数据包：13/5/9/10\nfindSubWindow65862classNamewindowNmae
返回数据包：成功"460538"，失败 "null"

//查找父句柄
sendData("findParentWindow", 460538);
// 参数一：函数名称
// 参数二：当前窗口句柄
发送数据包：16/6/\nfindParentWindow460538
返回数据包：成功"65862"，失败 "null"

//查找桌面窗口句柄
sendData("findDesktopWindow");
// 参数一：函数名称
发送数据包：17/\nfindDesktopWindow
返回数据包：成功"100011"，失败 "null"

//获取窗口名称
sendData("getWindowName", 65862);
// 参数一：函数名称
// 参数二：窗口句柄
发送数据包：13/5\ngetWindowName65862
返回数据包：成功"aibote"，失败 "null"

//显示/隐藏窗口
sendData("showWindow", 65862, true);
// 参数一：函数名称
// 参数二：窗口句柄
// 参数三：显示窗口 true， 隐藏窗口 false
发送数据包：10/5/4\nshowWindow65862true
返回数据包："false"或者 "true"

//设置窗口到最顶层
sendData("setWindowTop", 65862, true);
// 参数一：函数名称
// 参数二：窗口句柄
// 参数三：是否置顶
发送数据包：12/5/4\nsetWindowTop65862true
返回数据包："false"或者 "true"

//获取窗口位置
sendData("getWindowPos", 65862);
// 参数一：函数名称
// 参数二：窗口句柄
发送数据包：12/5\ngetWindowPos65862
返回数据包："239|628|989|764"

//设置窗口位置
sendData("setWindowPos", 65862, 10, 10, 200, 200);
// 参数一：函数名称
// 参数二：窗口句柄
// 参数三 整型，左上角横坐标
// 参数四 整型，左上角纵坐标
// 参数五 整型，窗口宽度
// 参数六 整型，窗口高度
发送数据包：12/5/2/2/3/3\nsetWindowPos658621010200200
返回数据包："false"或者 "true"

//移动鼠标
sendData("moveMouse", 65862, 100, 100, false, 0);
// 参数一：函数名称
// 参数二：窗口句柄
// 参数三：x坐标
// 参数四：y坐标
// 参数五：操作模式
// 参数六：元素句柄
发送数据包：9/5/3/3/5/1\nmoveMouse65862100100false0
返回数据包："true"

//移动鼠标(相对坐标)
sendData("moveMouseRelative", 65862, 100, 100, false);
// 参数一：函数名称
// 参数二：窗口句柄
// 参数三：x坐标
// 参数四：y坐标
// 参数五：操作模式
发送数据包：17/5/3/3/5\nmoveMouseRelative65862100100false
返回数据包："true"

//滚动鼠标
sendData("rollMouse", 65862, 100, 100, 10, false);
// 参数一：函数名称
// 参数二：窗口句柄
// 参数三：x坐标
// 参数四：y坐标
// 参数五：鼠标滚动次数,负数下滚鼠标,正数上滚鼠标
// 参数六：操作模式
发送数据包：9/5/3/3/2/5\nrollMouse658621001002false
返回数据包："true"

//点击鼠标
sendData("clickMouse", 65862, 100, 100, 1, false, 0);
// 参数一：函数名称
// 参数二：窗口句柄
// 参数三：x坐标
// 参数四：y坐标
// 参数五：点击类型，单击左键:1 单击右键:2 按下左键:3 弹起左键:4 按下右键:5 弹起右键:6 双击左键:7 双击右键:8
// 参数六：操作模式
// 参数七：元素句柄
发送数据包：9/5/3/3/1/5/1\nclickMouse658621001001false0
返回数据包："true"

//发送文本
sendData("sendKeys", "rpa");
// 参数一：函数名称
// 参数二：输入的文本
发送数据包：8/3\nsendKeysrpa
返回数据包："true"

//后台发送文本
sendData("sendKeysByHwnd", 65862, "rpa");
// 参数一：函数名称
// 参数二：窗口句柄
// 参数三：输入的文本
发送数据包：14/5/3\nsendKeysByHwnd65862rpa
返回数据包："true"

//输入虚拟键值(VK)
sendData("sendVk", 13, 1);
// 参数一：函数名称
// 参数二：虚拟键值 回车对应 VK键值 13
// 参数三：输入类型，按下弹起:1 按下:2 弹起:3
发送数据包：6/2/1\nsendVk131
返回数据包："true"

//后台输入虚拟键值(VK)
sendData("sendVkByHwnd", 65862, 13, 1);
// 参数一：函数名称
// 参数二：窗口句柄
// 参数三：虚拟键值 回车对应 VK键值 13
// 参数四：输入类型，按下弹起:1 按下:2 弹起:3
发送数据包：12/5/2/1\nsendVkByHwnd65862131
返回数据包："true"

//截图保存
sendData("saveScreenshot", 65862, "d:/1.png", 80, 150, 30, 30, 0, 127, 255, false);
// 参数一：函数名称
// 参数二：窗口句柄
// 参数三：保存的图片路径（手机）
// 参数四：矩形左上角x坐标
// 参数五：矩形左上角y坐标
// 参数六：矩形右下角x坐标
// 参数七：矩形右下角y坐标
// 参数八：二值化算法类型
// 参数九：二值化阈值
// 参数十：二值化最大值
// 参数十一：前后台截图
发送数据包：14/5/8/2/3/2/2/1/3/3/5\nsaveScreenshot65862d:/1.png8015030300127255false
返回数据包："false"或者 "true"

//获取色值
sendData("getColor", 65862, 100, 200, false);
// 参数一：函数名称
// 参数二：窗口句柄
// 参数三：x坐标
// 参数四：y坐标
// 参数五：前后台获取颜色值
数据包：8/5/3/3/5\ngetColor65862100200false
返回数据包：#000000

//找图
sendData("findImage", 65862, "d:/1.png", 0, 0, 0, 0, 0.95, 0, 0, 0, 1, false);
// 参数一：函数名称
// 参数二：窗口句柄
// 参数三：图片路径
// 参数四：矩形左上角x坐标
// 参数五：矩形左上角y坐标
// 参数六：矩形右下角x坐标
// 参数七：矩形右下角y坐标
// 参数八：相似度
// 参数九：二值化算法类型
// 参数十：二值化阈值
// 参数十一：二值化最大值
// 参数十二：多个坐标点
// 参数十三：前后台找图
数据包：9/5/8/1/1/1/1/4/1/1/1/1/5\nfindImage65862d:/1.png00000.950001false
返回数据包：单坐标点成功"x|y"  多坐标点成功 "x1|y1/x2|y2..."  失败"-1|-1"

//找动态图
sendData("findAnimation", 65862, 100, 0, 0, 0, 0, false);
// 参数一：函数名称
// 参数二：窗口句柄
// 参数三：前后两张图相隔的时间，单位毫秒
// 参数四：矩形左上角x坐标
// 参数五：矩形左上角y坐标
// 参数六：矩形右下角x坐标
// 参数七：矩形右下角y坐标
// 参数八：前后台找动态图
数据包：13/5/3/0/0/0/0/5\nfindAnimation658621000000false
返回数据包：单坐标点成功"x|y"  多坐标点成功 "x1|y1/x2|y2..."  失败"-1|-1"

//找色
sendData("findColor", 65862, "#e8f2f8", "10/20/#e7f0f7", 0, 0, 0, 0, 1, false);
// 参数一：函数名称
// 参数二：窗口句柄
// 参数三：主颜色值
// 参数四：相对偏移的颜色点，以 "x坐标+y坐标+色值" 字符串形式
// 参数五：矩形左上角x坐标
// 参数六：矩形左上角y坐标
// 参数七：矩形右下角x坐标
// 参数八：矩形右下角y坐标
// 参数九：相似度
// 参数十：前后台找色
数据包：9/5/7/13/1/1/1/1/1/5\nfindColor65862#e8f2f810/20/#e7f0f700001false
返回数据包：成功"x|y" 失败"-1|-1"

//比色
sendData("compareColor", 65862, 100, 200, "#e8f2f8", "10/20/#e7f0f7", 0, 0, 0, 0, 1, false);
// 参数一：函数名称
// 参数二：窗口句柄
// 参数三：主颜色值所在的X坐标
// 参数四：主颜色值所在的Y坐标
// 参数五：主颜色值
// 参数六：相对偏移的颜色点，以 "x坐标+y坐标+色值" 字符串形式
// 参数七：矩形左上角x坐标
// 参数八：矩形左上角y坐标
// 参数九：矩形右下角x坐标
// 参数十：矩形右下角y坐标
// 参数十一：相似度
// 参数十二：前后台比色
数据包：12/5/3/3/7/11/1/1/1/1/1/5\ncompareColor65862100200#e8f2f810/20/#e7f0f700001false
返回数据包："false"或者 "true"

//ocr
sendData("ocr", 65862,  0, 0, 0, 0, 0, 0, 0, false);
数据包：3/5/1/1/1/1/1/1/1/5\nocr658620000000false
返回数据包：[[[7.0, 18.0], [61.0, 18.0], [61.0, 38.0], [7.0, 38.0]], ('办公自动化', 0.8806074261665344)][[[4.0, 94.0], [49.0, 94.0], [49.0, 118.0], [4.0, 118.0]], ('rpa', 0.978314220905304)]

//ocrByFile
sendData("ocrByFile", "d:/1.png",  0, 0, 0, 0, 0, 0, 0);
数据包：9/8/1/1/1/1/1/1/1\nocrByFiled:/1.png0000000
返回数据包：[[[7.0, 18.0], [61.0, 18.0], [61.0, 38.0], [7.0, 38.0]], ('办公自动化', 0.8806074261665344)][[[4.0, 94.0], [49.0, 94.0], [49.0, 118.0], [4.0, 118.0]], ('rpa', 0.978314220905304)]

//获取指定元素名称
sendData("getElementName", 65862, "Window/Text");
数据包：14/5/11\ngetElementName65862Window/Text
返回数据包："aibote is pure code RPA"

//获取指定元素文本
sendData("getElementValue", 65862, "Window/Edit");
数据包：15/5/11\ngetElementValue65862Window/Edit
返回数据包："aibote RPA"

//获取指定元素矩形大小
sendData("getElementRect", 65862, "Window/Button");
数据包：14/5/13\ngetElementRect65862Window/Button
返回数据包："239|628|989|764"

//获取指定元素窗口句柄
sendData("getElementWindow", 65862, "Window/Button");
数据包：16/5/13\ngetElementWindow65862Window/Button
返回数据包："460538"

//点击元素
sendData("clickElement", 65862, "Window/Button", 1);
数据包：12/5/13/1\nclickElement65862Window/Button1
返回数据包："false"或者 "true"

//执行元素默认操作(一般是点击操作)
sendData("invokeElement", 65862, "Window/Button");
数据包：13/5/13\ninvokeElement65862Window/Button
返回数据包："false"或者 "true"

//设置指定元素作为焦点
sendData("setElementFocus", 65862, "Window/Button");
数据包：15/5/13\nsetElementFocus65862Window/Button
返回数据包："false"或者 "true"

//设置元素文本
sendData("setElementValue", 65862, "Window/Button", "rpa");
数据包：15/5/13/3\nsetElementValue65862Window/Buttonrpa
返回数据包："false"或者 "true"

//滚动元素
sendData("setElementScroll", 65862, "Window", -1, 0.1);
数据包：16/5/6/2/3\nsetElementScroll65862Window-10.1
返回数据包："false"或者 "true"

//单/复选框是否选中
sendData("isSelected", 65862, "Window/CheckBox");
数据包：10/5/15\nisSelected65862Window/CheckBox
返回数据包：未找到元素返回"false" 选中返回"selected" 未选中返回 "unselected"

//关闭窗口
sendData("closeWindow", 65862, "Window");
数据包：11/5/6\ncloseWindow65862Window
返回数据包："false"或者 "true"

//设置窗口状态
sendData("setWindowState", 65862, "Window", 2);
数据包：14/5/6/1\nsetWindowState65862Window2
返回数据包："false"或者 "true"

//设置剪切板文本
sendData("setClipboardText", "rpa");
数据包：16/3\nsetClipboardTextrpa
返回数据包："false"或者 "true"

//获取剪切板文本
sendData("getClipboardText");
数据包：16\ngetClipboardText
返回数据包："rpa"

//启动指定程序
sendData("startProcess", "cmd", true, false);
数据包：12/3/4/5\nstartProcesscmdtruefalse
返回数据包："false"或者 "true"

//执行cmd命令
sendData("executeCommand", "ipconfig", 300);
数据包：14/8/3\nexecuteCommandipconfig300
返回数据包：返回cmd执行结果

//指定url下载文件
sendData("downloadFile", "http://www.gogo.com/rpa.rar", "d:/rpa.rar", true);
数据包：12/27/10/4\ndownloadFilehttp://www.gogo.com/rpa.rard:/rpa.rartrue
返回数据包："true"

//打开excle
sendData("openExcel", "D:/rpa.xlsx");
数据包：9/11\nopenExcelD:/rpa.xlsx
返回数据包："null"或者 {"book":"088173SDFU13","path":"D:/rpa.xlsx"}

//打开excel表格
sendData("openExcelSheet", "088173SDFU13", "D:/rpa.xlsx", "sheet1");
数据包：14/12/11/6\nopenExcelSheet088173SDFU13D:/rpa.xlsxsheet1
返回数据包："null"或者 "A123HHI123F132"

//保存/关闭excel
sendData("saveExcel", "088173SDFU13", "D:/rpa.xlsx");
数据包：9/12/11\nsaveExcel088173SDFU13D:/rpa.xlsx
返回数据包："false"或者 "true"

//写入数字到表格
sendData("writeExcelNum", "A123HHI123F132", 0, 0, 123);
数据包：13/14/1/1/3\nwriteExcelNumA123HHI123F13200123
返回数据包："false"或者 "true"

//写入字符串到表格
sendData("writeExcelStr", "A123HHI123F132", 0, 0, "rpa");
数据包：13/14/1/1/3\nwriteExcelStrA123HHI123F13200rpa
返回数据包："false"或者 "true"

//读取excel表格数字
sendData("readExcelNum", "A123HHI123F132", 0, 0);
数据包：12/14/1/1\nreadExcelNumA123HHI123F13200
返回数据包：123

//读取excel表格字串
sendData("readExcelStr", "A123HHI123F132", 0, 0);
数据包：12/14/1/1\nreadExcelStrA123HHI123F13200
返回数据包："rpa"

删除excel表格行
sendData("removeExcelRow",  0, 0);
数据包：14/1/1\nremoveExcelRow00
返回数据包："false"或者 "true"

删除excel表格列
sendData("removeExcelCol", 0, 0);
数据包：14/1/1\nremoveExcelCol00
返回数据包："false"或者 "true"

//关闭驱动程序
sendData("closeDriver");
发送数据包：11\ncloseDriver
````

# WebBot开源协议
````javascript
Aibote web自动化框架，由WebDriver.exe客户端驱动程序连接脚本服务端，采用TCP协议传输命令。
WebBot 基于chromium内核研发而成的一款web自动化框架，因此支持chromium内核的所有浏览器和应用程序。框架稳定，运行速度非常快！
为了让更多人体验到我们产品，我们决议在此公布框架协议，希望有更多开发者能完善并封装成各种计算机语言，封装请参考nodejs版的函数说明

协议示例：
//跳转url
sendData("goto", "http://www.ai-bot.net);
数据包：4/21\ngotohttp://www.ai-bot.net
返回数据包："false"或者 "true"

//新建tab页面并跳转到指定url
sendData("newPage", "http://www.ai-bot.net);
数据包：7/21\nnewPagehttp://www.ai-bot.net
返回数据包："false"或者 "true"

//返回
sendData("back");
数据包：4\nback
返回数据包："false"或者 "true"

//前进
sendData("forward");
数据包：7\nforward
返回数据包："false"或者 "true"

//刷新
sendData("refresh");
数据包：7\nrefresh
返回数据包："false"或者 "true"

//获取当前页面id
sendData("getCurPageId");
数据包：12\ngetCurPageId
返回数据包："E2DB8A0856D83C4C3C194B79BBC2235F"

//获取所有页面id
sendData("getAllPageId");
数据包：12\ngetAllPageId
返回数据包："E2DB8A0856D83C4C3C194B79BBC2235F|E2DB8A0856D83C4C3C194B79BBC22352"

//切换指定页面
sendData("switchPage", "E2DB8A0856D83C4C3C194B79BBC2235F");
数据包：10/32\nswitchPageE2DB8A0856D83C4C3C194B79BBC2235F
返回数据包："false"或者 "true"

//关闭当前页面
sendData("closePage");
数据包：9\nclosePage
返回数据包："false"或者 "true"

//获取当前url
sendData("getCurrentUrl");
数据包：13\ngetCurrentUrl
返回数据包："http://www.ai-bot.net"，失败返回 "webdriver error"

//获取当前标题
sendData("getTitle");
数据包：8\ngetTitle
返回数据包："RPA自动化平台"，失败返回 "webdriver error"

//切换frame
sendData("switchFrame", "/html/body/div[3]/div[3]/div[1]/div/div[3]/div[1]/div[1]/iframe");
数据包：11/63\nswitchFrame/html/body/div[3]/div[3]/div[1]/div/div[3]/div[1]/div[1]/iframe
返回数据包："false"或者 "true"

//切换到主frame
sendData("switchMainFrame");
数据包：15\nswitchMainFrame
返回数据包："false"或者 "true"

//点击元素
sendData("clickElement", "/html/body/header/div/nav/ul/li[5]/a");
数据包：12/36\nclickElement/html/body/header/div/nav/ul/li[5]/a
返回数据包："false"或者 "true"

//设置编辑框值
sendData("setElementValue", "/html/body/header/div/nav/ul/li[5]/a", "rpa");
数据包：15/36/3\nclickElement/html/body/header/div/nav/ul/li[5]/arpa
返回数据包："false"或者 "true"

//获取文本
sendData("getElementText", "/html/body/header/div/nav/ul/li[5]/a");
数据包：14/36\ngetElementText/html/body/header/div/nav/ul/li[5]/a
返回数据包："rpa"

//获取outerHTML
sendData("getElementOuterHTML", "/html/body/div[2]/div/div/div/div[2]/p");
数据包：19/38\ngetElementOuterHTML/html/body/div[2]/div/div/div/div[2]/p
返回数据包：'<p class="info">Aibote</p>'

//获取innerHTML
sendData("getElementInnerHTML", "/html/body/div[2]/div/div/div/div[2]/p");
数据包：19/38\ngetElementInnerHTML/html/body/div[2]/div/div/div/div[2]/p
返回数据包："Aibote"

//设置属性值
sendData("setElementAttribute", "/html/body/header/div/nav/ul/li[5]/a", "src", "http://www.ai-bot.net");
数据包：19/36/3/22\nsetElementAttribute/html/body/header/div/nav/ul/li[5]/asrchttp://www.ai-bot.net
返回数据包："false"或者 "true"

//获取指定属性的值
sendData("getElementAttribute", "/html/body/header/div/nav/ul/li[5]/a", "src");
数据包：19/36/3\ngetElementAttribute/html/body/header/div/nav/ul/li[5]/asrc
返回数据包："http://www.ai-bot.net"

//获取矩形位置
sendData("getElementRect", "/html/body/header/div/nav/ul/li[5]/a");
数据包：14/36\ngetElementRect/html/body/header/div/nav/ul/li[5]/a
返回数据包：'{"left":74,"top":19,"right":117, "bottom":42,"width":43, "height":23}'

//判断元素是否选中
sendData("isSelected", "/html/body/header/div/nav/ul/li[5]/a");
数据包：10/36\nisSelected/html/body/header/div/nav/ul/li[5]/a
返回数据包：成功返回"true"，失败返回"webdriver error"

//判断元素是否可见
sendData("isDisplayed", "/html/body/header/div/nav/ul/li[5]/a");
数据包：11/36\nisDisplayed/html/body/header/div/nav/ul/li[5]/a
返回数据包：成功返回"true"，失败返回"webdriver error"

//判断元素是否可用
sendData("isEnabled", "/html/body/header/div/nav/ul/li[5]/a");
数据包：9/36\nisEnabled/html/body/header/div/nav/ul/li[5]/a
返回数据包：成功返回"true"，失败返回"webdriver error"

//清空元素
sendData("clearElement", "/html/body/header/div/nav/ul/li[5]/a");
数据包：12/36\nclearElement/html/body/header/div/nav/ul/li[5]/a
返回数据包："false"或者 "true"

//设置元素焦点
sendData("setElementFocus", "/html/body/header/div/nav/ul/li[5]/a");
数据包：15/36\nsetElementFocus/html/body/header/div/nav/ul/li[5]/a
返回数据包："false"或者 "true"

//通过元素上传文件
sendData("uploadFile", "/html/body/header/div/nav/ul/li[5]/a", "d:\\1.png");
数据包：10/36/8\nuploadFile/html/body/header/div/nav/ul/li[5]/ad:\\1.png
返回数据包："false"或者 "true"

//输入文本
sendData("sendKeys", "/html/body/header/div/nav/ul/li[5]/a", "aibote");
数据包：8/36/6\nsendKeys/html/body/header/div/nav/ul/li[5]/aaibote
返回数据包："false"或者 "true"

//发送Vk虚拟键
sendData("sendVk", "13");
数据包：6/2\nsendVk13
返回数据包："false"或者 "true"

//点击鼠标
sendData("clickMouse", "100", "200", 1);
数据包：10/3/3/1\nclickMouse1002001
返回数据包："false"或者 "true"

//移动鼠标
sendData("moveMouse", "100", "200");
数据包：9/3/3\nmoveMouse100200
返回数据包："false"或者 "true"

//滚动鼠标
sendData("wheelMouse", "0", "100", "0", "0");
数据包：10/1/3/1/1\nwheelMouse010000
返回数据包："false"或者 "true"

//xpath点击鼠标
sendData("clickMouseByXpath", "/html/body/header/div/nav/ul/li[5]/a", 1);
数据包：17/36/1\nclickMouseByXpath/html/body/header/div/nav/ul/li[5]/a1
返回数据包："false"或者 "true"

//xpath移动鼠标(元素中心点)
sendData("moveMouseByXpath", "/html/body/header/div/nav/ul/li[5]/a");
数据包：16/36\nmoveMouseByXpath/html/body/header/div/nav/ul/li[5]/a
返回数据包："false"或者 "true"

//xpath滚动鼠标
sendData("wheelMouseByXpath", "0", "100", "/html/body/header/div/nav/ul/li[5]/a");
数据包：17/1/3/36\nwheelMouseByXpath0100/html/body/header/div/nav/ul/li[5]/a
返回数据包："false"或者 "true"

//截图
sendData("takeScreenshot");
数据包：14\ntakeScreenshot
返回数据包：成功返回PNG图片格式 base64 字符串，失败返回null

//元素截图
sendData("takeScreenshot", "/html/body/header/div/nav/ul/li[5]/a");
数据包：14/36\ntakeScreenshot/html/body/header/div/nav/ul/li[5]/a
返回数据包：成功返回PNG图片格式 base64 字符串，失败返回null

//点击警告框
sendData("clickAlert", "true", "promptText");
数据包：10/4/10\nclickAlerttruepromptText
返回数据包："false"或者 "true"

//获取警告框文本
sendData("getAlertText");
数据包：12\ngetAlertText
返回数据包："aibote rpa"

//获取指定url匹配的cookies
sendData("getCookies", "http://www.ai-bot.net");
数据包：10/21\ngetCookieshttp://www.ai-bot.net
返回数据包：成功返回json格式的字符串，失败返回null

//获取所有cookies
sendData("getAllCookies");
数据包：13\ngetAllCookies
返回数据包：成功返回json格式的字符串，失败返回null

//设置cookies
sendData("setCookie", "aibote", "rpa", "http://www.aibote.net", "", "", false, false, "", 0, "", false, "", 0, "");
数据包：9/6/3/21/0/0/5/5/0/1/0/5/0/1\0nsetCookiesetCookieaiboterpahttp://www.aibote.netfalsefalse0false0
返回数据包："false"或者 "true"

//删除指定cookies
sendData("deleteCookies", "rpa", "", "", "");
数据包：13/3/0/0/0\ndeleteCookiesrpa
返回数据包："false"或者 "true"

//删除所有cookies
sendData("deleteAllCookies");
数据包：16\ndeleteAllCookies
返回数据包："false"或者 "true"

//清除缓存
sendData("clearCache");
数据包：10\nclearCache
返回数据包："false"或者 "true"

//注入JavaScript
sendData("executeScript", "(function () {return 'aibote rpa'})();");
数据包：13/38\nexecuteScript(function () {return 'aibote rpa'})();
返回数据包："aibote rpa"  假如注入代码为函数且有return语句，则返回retrun 的值，否则返回null;

//获取窗口位置和状态
sendData("getWindowPos");
数据包：12\ngetWindowPos
返回数据包："{height: 300, left: 20, top: 20, width: 516, windowState: 'normal'}"

//设置窗口位置和状态
sendData("setWindowPos", "normal", 10, 10, 200, 300);
数据包：12/6/2/2/3/3\nsetWindowPosnormal1010200300
返回数据包："false"或者 "true"

//手机浏览器仿真
sendData("mobileEmulation", 500, 800, "Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36", 
                "Android", "7.0", "", "", 0, 0, 0);
//参数一 字符串型，函数名称
//参数二 整型，宽度
//参数三 整型，高度
//参数四 字符串型，用户代理
//参数五 字符串型，系统平台
//参数六 字符串型，系统平台版本号
//参数七 字符串型，可选参数，语言
//参数八 字符串型，可选参数，时区标识
//参数九 浮点型，可选参数，纬度
//参数十 浮点型，可选参数，经度
//参数十一 浮点型，可选参数，准确度
数据包：15/3/3/135/7/3/0/0/1/1/1\nmobileEmulation500800Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36Android7.0
返回数据包："false"或者 "true"

//关闭浏览器
sendData("closeBrowser");
数据包：12\ncloseBrowser
返回数据包："true"

//关闭驱动程序
sendData("closeDriver");
发送数据包：11\ncloseDriver
````