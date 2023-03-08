# Aibote(python)使用须知
```python
Aibote是江西爱伯特科技自主研发的一款纯代码RPA办公自动化框架，支持Android、Browser和Windows 三大平台。框架免费、API和接口协议开源，个人、企业商用零费用
以socket tcp接口协议通信方式命令驱动，支持任何一门计算机语言调用。OEM或特殊接口定制等商业合作联系QQ：1600381943

Aibote python是由 AiBot.py模块作者:河畔(810975099)制作而成，提供给python开发者调用
python版本是基于aibote底层api开源协议制作而成，封装格式以node.js为向导，涵盖aibote自动化平台所有功能。
```

# 拾取元素工具使用方法
````javascript
Android 工具位置，Aibote/Aibote.exe->菜单项->脚本工具
Windows 工具位置，Aibote/WindowsTool.exe

Android 元素拾取工具，需要在手机端，勾选连接工具端选项

Windows 元素拾取工具，按下CTRL键，暂停拾取。支持鼠标左键/中键拾取

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

# Aibote.py 使用方法说明

## 下载安装 Aibote.py

```shell
pip install AiBot.py
```

## 使用 AndroidBot 编写脚本

```python
# 1. 导入 AndroidBotMain 类
from AiBot import AndroidBotMain


# 2. 自定义一个脚本类，继承 AndroidBotMain
class CustomAndroidScript(AndroidBotMain):
    # 3. 设置等待参数
    # 3.1 设置等待时间
    wait_timeout = 3
    # 3.2 设置重试间隔时长
    interval_timeout = 0.5

    # 4. 设置日志等级
    log_level = "INFO"  # "DEBUG"

    # 5. 设置方法超时是否抛出异常
    raise_err = False  # True

    # 6. 重写方法，编写脚本
    # 注意：此方法是脚本执行入口
    def script_main(self):
        # 6.1 API 演示
        # 注意：Python 版本支持的 Api 与 Nodejs 基本相同
        # 教程中仅演示部分 Api，更多 Api 请自行探索，所有 Api 均包含详细的参数要求和返回值，请自行查看。

        # 截图
        self.save_screenshot("xxx.png")
        # 获取坐标点颜色
        self.get_color((100, 100))
        # 查找图片
        self.find_image("xxx.png")
        # 点击坐标
        self.click((100, 100))
        # 滑动
        self.swipe((100, 100), (200, 200), 3)


# 7. 执行脚本，Pycharm 中，直接右键执行
if __name__ == '__main__':
    # 注意：此处监听的端口号，必须和手机端的脚本端口号一致；
    # 监听 3333 号端口
    CustomAndroidScript.execute(3333)
```

> 教程中仅演示部分 Api，更多 Api 请自行探索，所有 Api 均包含详细的参数要求和返回值，请自行查看。

## 使用 WinBot 编写脚本

```python
# 1. 导入 WinBotMain 类
from AiBot import WinBotMain


# 2. 自定义一个脚本类，继承 WinBotMain
class CustomWinScript(WinBotMain):
    # 3. 设置等待参数
    # 3.1 设置等待时间
    wait_timeout = 3
    # 3.2 设置重试间隔时长
    interval_timeout = 0.5

    # 4. 设置日志等级
    log_level = "INFO"  # "DEBUG"

    # 5. 设置方法超时是否抛出异常
    raise_err = False  # True

    # 6. 重写方法，编写脚本
    # 注意：此方法是脚本执行入口
    def script_main(self):
        # 6.1 API 演示
        # 注意：Python 版本支持的 Api 与 Nodejs 基本相同
        # 教程中仅演示部分 Api，更多 Api 请自行探索，所有 Api 均包含详细的参数要求和返回值，请自行查看。

        # 查询所有窗口句柄
        result = self.find_windows()
        print(result)  # ["1050010", "1050011", "1050012"]

        # 查询指定窗口句柄
        result = self.find_window(window_name="Ai-Bot 2群等9个会话")
        print(result)  # "1050010"


# 7. 执行脚本，Pycharm 中，直接右键执行
if __name__ == '__main__':
    # 启动脚本，监听 6666 号端口

    # local=True 时，是本地运行脚本，会自动启动 WindowsDriver.exe 驱动；
    # 在远端部署脚本时，请设置 local=False，手动启动 WindowsDriver.exe，启动 WindowsDriver.exe 时需指定远端 IP 或端口号；

    CustomWinScript.execute(6666, local=True)
```

> 教程中仅演示部分 Api，更多 Api 请自行探索，所有 Api 均包含详细的参数要求和返回值，请自行查看。

## 使用 WebBot 编写脚本

```python
import time

# 1. 导入 WebBotMain 类
from AiBot import WebBotMain


# 2. 自定义一个脚本类，继承 WebBotMain
class CustomWebScript(WebBotMain):
    # 3. 设置等待参数
    # 3.1 设置等待时间
    wait_timeout = 3
    # 3.2 设置重试间隔时长
    interval_timeout = 0.5

    # 4. 设置日志等级
    log_level = "INFO"  # "DEBUG"

    # 5. 设置方法超时是否抛出异常
    raise_err = False  # True

    # 6. 重写方法，编写脚本
    # 注意：此方法是脚本执行入口
    def script_main(self):
        # 6. API 演示
        # 注意：Python 版本支持的 Api 与 Nodejs 基本相同
        # 教程中仅演示部分 Api，更多 Api 请自行探索，所有 Api 均包含详细的参数要求和返回值，请自行查看。

        self.goto("https://www.baidu.com")
        time.sleep(3)
        self.new_page("https://www.qq.com")
        time.sleep(3)

        result = self.execute_script('(()=>"aibote rpa")()')
        print(result)  # aibote rpa


# 7. 执行脚本，Pycharm 中，直接右键执行
if __name__ == '__main__':
    # 启动脚本，监听 9999 号端口
    # 默认使用 Chrome 浏览器

    # local=True 时，是本地运行脚本，会自动启动 WebDriver.exe 驱动；
    # 在远端部署脚本时，请设置 local=False，手动启动 WebDriver.exe，启动 WebDriver.exe 时需指定远端 IP 或端口号；

    # 如本地部署脚本，需要传递 WebDriver 启动参数时，参考下面方式，如不需传递启动参数，则忽略：
    driver_params = {
        "browserName": "chrome",
        "debugPort": 0,
        "userDataDir": "./UserData",
        "browserPath": None,
        "argument": None,
    }

    CustomWebScript.execute(9999, local=True, driver_params=driver_params)
```

> 教程中仅演示部分 Api，更多 Api 请自行探索，所有 Api 均包含详细的参数要求和返回值，请自行查看。


# AndroidBot开发手册

## 图色

```python
def save_screenshot(image_name: str, region: _Region = None, algorithm: _Algorithm = None) -> Optional[str]:
    """
    保存截图，返回图片地址(手机中)或者 None
    :param image_name: 图片名称，保存在手机 /storage/emulated/0/Android/data/com.aibot.client/files/ 路径下；
    :param region: 截图区域，默认全屏；
    :param algorithm: 处理截图所用算法和参数，默认保存原图；
    :return:

    # 区域相关参数
    region = (0, 0, 0, 0) 按元素顺序分别代表：起点x、起点y、终点x、终点y，最终得到一个矩形。
    # 算法相关参数
    algorithm = (0, 0, 0) # 按元素顺序分别代表：algorithm_type 算法类型、threshold 阈值、max_val 最大值。
    threshold 和 max_val 同为 255 时灰度处理.
    0   THRESH_BINARY      算法，当前点值大于阈值 threshold 时，取最大值 max_val，否则设置为 0；
    1   THRESH_BINARY_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则设置为最大值 max_val；
    2   THRESH_TOZERO      算法，当前点值大于阈值 threshold 时，不改变，否则设置为 0；
    3   THRESH_TOZERO_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则不改变；
    4   THRESH_TRUNC       算法，当前点值大于阈值 threshold 时，设置为阈值 threshold，否则不改变；
    5   ADAPTIVE_THRESH_MEAN_C      算法，自适应阈值；
    6   ADAPTIVE_THRESH_GAUSSIAN_C  算法，自适应阈值；
    """


def save_element_screenshot(image_name, xpath) -> Optional[str]:
    """
    保存元素截图，返回图片地址(手机中)或者 None
    :return:
    """

def get_color(point: _Point_Tuple) -> Optional[str]:
    """
    获取指定坐标点的色值，返回色值字符串(#008577)或者 None
    :param point: 坐标点；
    :return:
    """
```

## 找图
```python
def find_color(color: str, sub_colors: _SubColors = None, region: _Region = None, similarity: float = 0.9,
               wait_time: float = None, interval_time: float = None, raise_err: bool = None) -> Optional[_Point]:
    """
    获取指定色值的坐标点，返回坐标或者 None
    :param color: 颜色字符串，必须以 # 开头，例如：#008577；
    :param sub_colors: 辅助定位的其他颜色；
    :param region: 在指定区域内找色，默认全屏；
    :param similarity: 相似度，0-1 的浮点数，默认 0.9；
    :param wait_time: 等待时间，默认取 .wait_timeout；
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout；
    :param raise_err: 超时是否抛出异常；
    :return:

    # 区域相关参数
    region = (0, 0, 0, 0) 按元素顺序分别代表：起点x、起点y、终点x、终点y，最终得到一个矩形。
    # 算法相关参数
    algorithm = (0, 0, 0) # 按元素顺序分别代表：algorithm_type 算法类型、threshold 阈值、max_val 最大值。
    threshold 和 max_val 同为 255 时灰度处理.
    0   THRESH_BINARY      算法，当前点值大于阈值 threshold 时，取最大值 max_val，否则设置为 0；
    1   THRESH_BINARY_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则设置为最大值 max_val；
    2   THRESH_TOZERO      算法，当前点值大于阈值 threshold 时，不改变，否则设置为 0；
    3   THRESH_TOZERO_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则不改变；
    4   THRESH_TRUNC       算法，当前点值大于阈值 threshold 时，设置为阈值 threshold，否则不改变；
    5   ADAPTIVE_THRESH_MEAN_C      算法，自适应阈值；
    6   ADAPTIVE_THRESH_GAUSSIAN_C  算法，自适应阈值；
    """

def find_image(image_name, region: _Region = None, algorithm: _Algorithm = None, similarity: float = 0.9,
               wait_time: float = None, interval_time: float = None, raise_err: bool = None) -> Optional[_Point]:
    """
    寻找图片坐标，在当前屏幕中寻找给定图片中心点的坐标，返回坐标或者 None
    :param image_name: 图片名称（手机中）；
    :param region: 从指定区域中找图，默认全屏；
    :param algorithm: 处理屏幕截图所用的算法，默认原图，注意：给定图片处理时所用的算法，应该和此方法的算法一致；
    :param similarity: 相似度，0-1 的浮点数，默认 0.9；
    :param wait_time: 等待时间，默认取 .wait_timeout；
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout；
    :param raise_err: 超时是否抛出异常；
    :return:

    # 区域相关参数
    region = (0, 0, 0, 0) 按元素顺序分别代表：起点x、起点y、终点x、终点y，最终得到一个矩形。
    # 算法相关参数
    algorithm = (0, 0, 0) # 按元素顺序分别代表：algorithm_type 算法类型、threshold 阈值、max_val 最大值。
    threshold 和 max_val 同为 255 时灰度处理.
    0   THRESH_BINARY      算法，当前点值大于阈值 threshold 时，取最大值 max_val，否则设置为 0；
    1   THRESH_BINARY_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则设置为最大值 max_val；
    2   THRESH_TOZERO      算法，当前点值大于阈值 threshold 时，不改变，否则设置为 0；
    3   THRESH_TOZERO_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则不改变；
    4   THRESH_TRUNC       算法，当前点值大于阈值 threshold 时，设置为阈值 threshold，否则不改变；
    5   ADAPTIVE_THRESH_MEAN_C      算法，自适应阈值；
    6   ADAPTIVE_THRESH_GAUSSIAN_C  算法，自适应阈值；
    """


def find_image_by_opencv(image_name, region: _Region = None, algorithm: _Algorithm = None,
                         similarity: float = 0.9, wait_time: float = None, interval_time: float = None,
                         raise_err: bool = None) -> Optional[_Point]:
    """
    寻找图片坐标，在当前屏幕中寻找给定图片中心点的坐标，返回图片坐标或者 None
    与 .find_image() 基本一致，采用 OpenCV 算法
    :param image_name: 图片名称（手机中）；
    :param region: 从指定区域中找图，默认全屏；
    :param algorithm: 处理屏幕截图所用的算法，默认原图，注意：给定图片处理时所用的算法，应该和此方法的算法一致；
    :param similarity: 相似度，0-1 的浮点数，默认 0.9；
    :param wait_time: 等待时间，默认取 .wait_timeout
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout
    :param raise_err: 超时是否抛出异常；
    :return:

    # 区域相关参数
    region = (0, 0, 0, 0) 按元素顺序分别代表：起点x、起点y、终点x、终点y，最终得到一个矩形。
    # 算法相关参数
    algorithm = (0, 0, 0) # 按元素顺序分别代表：algorithm_type 算法类型、threshold 阈值、max_val 最大值。
    threshold 和 max_val 同为 255 时灰度处理.
    0   THRESH_BINARY      算法，当前点值大于阈值 threshold 时，取最大值 max_val，否则设置为 0；
    1   THRESH_BINARY_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则设置为最大值 max_val；
    2   THRESH_TOZERO      算法，当前点值大于阈值 threshold 时，不改变，否则设置为 0；
    3   THRESH_TOZERO_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则不改变；
    4   THRESH_TRUNC       算法，当前点值大于阈值 threshold 时，设置为阈值 threshold，否则不改变；
    5   ADAPTIVE_THRESH_MEAN_C      算法，自适应阈值；
    6   ADAPTIVE_THRESH_GAUSSIAN_C  算法，自适应阈值；
    """


def find_images_by_opencv(image_name, region: _Region = None, algorithm: _Algorithm = None,
                          similarity: float = 0.9, multi: int = 1, wait_time: float = None,
                          interval_time: float = None, raise_err: bool = None) -> List[_Point]:
    """
    寻找图片坐标，在当前屏幕中寻找给定图片中心点的坐标，返回坐标列表
    与 .find_image() 基本一致，采用 OpenCV 算法，并且可找多个目标。
    :param image_name: 图片名称（手机中）；
    :param region: 从指定区域中找图，默认全屏；
    :param algorithm: 处理屏幕截图所用的算法，默认原图，注意：给定图片处理时所用的算法，应该和此方法的算法一致；
    :param similarity: 相似度，0-1 的浮点数，默认 0.9；
    :param multi: 目标数量，默认为 1，找到 1 个目标后立即结束；
    :param wait_time: 等待时间，默认取 .wait_timeout
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout
    :param raise_err: 超时是否抛出异常；
    :return:

    # 区域相关参数
    region = (0, 0, 0, 0) 按元素顺序分别代表：起点x、起点y、终点x、终点y，最终得到一个矩形。
    # 算法相关参数
    algorithm = (0, 0, 0) # 按元素顺序分别代表：algorithm_type 算法类型、threshold 阈值、max_val 最大值。
    threshold 和 max_val 同为 255 时灰度处理.
    0   THRESH_BINARY      算法，当前点值大于阈值 threshold 时，取最大值 max_val，否则设置为 0；
    1   THRESH_BINARY_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则设置为最大值 max_val；
    2   THRESH_TOZERO      算法，当前点值大于阈值 threshold 时，不改变，否则设置为 0；
    3   THRESH_TOZERO_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则不改变；
    4   THRESH_TRUNC       算法，当前点值大于阈值 threshold 时，设置为阈值 threshold，否则不改变；
    5   ADAPTIVE_THRESH_MEAN_C      算法，自适应阈值；
    6   ADAPTIVE_THRESH_GAUSSIAN_C  算法，自适应阈值；
    """


def find_dynamic_image(interval_ti: int, region: _Region = None, wait_time: float = None,
                       interval_time: float = None, raise_err: bool = None) -> List[_Point]:
    """
    找动态图，对比同一张图在不同时刻是否发生变化，返回坐标列表
    :param interval_ti: 前后时刻的间隔时间，单位毫秒；
    :param region: 在指定区域找图，默认全屏；
    :param wait_time: 等待时间，默认取 .wait_timeout
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout
    :param raise_err: 超时是否抛出异常；
    :return:

    # 区域相关参数
    region = (0, 0, 0, 0) 按元素顺序分别代表：起点x、起点y、终点x、终点y，最终得到一个矩形。
    """
```

## 坐标操作
```python
def click(point: _Point_Tuple, offset_x: float = 0, offset_y: float = 0) -> bool:
    """
    点击坐标
    :param point: 坐标；
    :param offset_x: 坐标 x 轴偏移量；
    :param offset_y: 坐标 y 轴偏移量；
    :return:
    """


def double_click(point: _Point_Tuple, offset_x: float = 0, offset_y: float = 0) -> bool:
    """
    双击坐标
    :param point: 坐标；
    :param offset_x: 坐标 x 轴偏移量；
    :param offset_y: 坐标 y 轴偏移量；
    :return:
    """


def long_click(point: _Point_Tuple, duration: float, offset_x: float = 0, offset_y: float = 0) -> bool:
    """
    长按坐标
    :param point: 坐标；
    :param duration: 按住时长，单位秒；
    :param offset_x: 坐标 x 轴偏移量；
    :param offset_y: 坐标 y 轴偏移量；
    :return:
    """


def swipe(start_point: _Point_Tuple, end_point: _Point_Tuple, duration: float) -> bool:
    """
    滑动坐标
    :param start_point: 起始坐标；
    :param end_point: 结束坐标；
    :param duration: 滑动时长，单位秒；
    :return:
    """


def gesture(gesture_path: List[_Point_Tuple], duration: float) -> bool:
    """
    执行手势
    :param gesture_path: 手势路径，由一系列坐标点组成
    :param duration: 手势执行时长, 单位秒
    :return:
    """
```

## OCR
```python


def get_text(region: _Region = None, scale: float = 1.0) -> List[str]:
    """
    通过 OCR 识别屏幕中的文字，返回文字列表
    :param region: 识别区域，默认全屏；
    :param scale: 图片缩放率，默认为 1.0，1.0 以下为缩小，1.0 以上为放大；
    :return:
    """


def find_text(text: str, region: _Region = None, scale: float = 1.0) -> List[_Point]:
    """
    查找文字所在的坐标，返回坐标列表（坐标是文本区域中心位置）
    :param text: 要查找的文字；
    :param region: 识别区域，默认全屏；
    :param scale: 图片缩放率，默认为 1.0，1.0 以下为缩小，1.0 以上为放大；
    :return:
    """
```

## 元素操作
```python
def get_element_rect(xpath: str, wait_time: float = None, interval_time: float = None,
                     raise_err: bool = None) -> Optional[Tuple[_Point, _Point]]:
    """
    获取元素位置，返回元素区域左上角和右下角坐标
    :param xpath: xpath 路径
    :param wait_time: 等待时间，默认取 .wait_timeout
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout
    :param raise_err: 超时是否抛出异常；
    :return:
    """


def get_element_desc(xpath: str, wait_time: float = None, interval_time: float = None,
                     raise_err: bool = None) -> Optional[str]:
    """
    获取元素描述
    :param xpath: xpath 路径
    :param wait_time: 等待时间，默认取 .wait_timeout
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout
    :param raise_err: 超时是否抛出异常；
    :return:
    """


def get_element_text(xpath: str, wait_time: float = None, interval_time: float = None,
                     raise_err: bool = None) -> Optional[str]:
    """
    获取元素文本
    :param xpath: xpath 路径
    :param wait_time: 等待时间，默认取 .wait_timeout
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout
    :param raise_err: 超时是否抛出异常；
    :return:
    """


def set_element_text(xpath: str, text: str, wait_time: float = None, interval_time: float = None,
                     raise_err: bool = None) -> bool:
    """
    设置元素文本
    :param xpath:
    :param text:
    :param wait_time: 等待时间，默认取 .wait_timeout
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout
    :param raise_err: 超时是否抛出异常；
    :return:
    """


def click_element(xpath: str, wait_time: float = None, interval_time: float = None,
                  raise_err: bool = None) -> bool:
    """
    点击元素
    :param xpath:
    :param wait_time: 等待时间，默认取 .wait_timeout
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout
    :param raise_err: 超时是否抛出异常；
    :return:
    """


def click_any_elements(xpath_list: List[str], wait_time: float = None, interval_time: float = None,
                       raise_err: bool = None) -> bool:
    """
    遍历点击列表中的元素，直到任意一个元素返回 True
    :param xpath_list: xpath 列表
    :param wait_time: 等待时间，默认取 .wait_timeout
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout
    :param raise_err: 超时是否抛出异常；
    :return:
    """


def scroll_element(xpath: str, direction: int = 0) -> bool:
    """
    滚动元素，0 向上滑动，1 向下滑动
    :param xpath: xpath 路径
    :param direction: 滚动方向，0 向上滑动，1 向下滑动
    :return:
    """


def element_not_exists(xpath: str, wait_time: float = None, interval_time: float = None,
                       raise_err: bool = None) -> bool:
    """
    元素是否不存在
    :param xpath: xpath 路径
    :param wait_time: 等待时间，默认取 .wait_timeout
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout
    :param raise_err: 超时是否抛出异常；
    :return:
    """


def element_exists(xpath: str, wait_time: float = None, interval_time: float = None,
                   raise_err: bool = None) -> bool:
    """
    元素是否存在
    :param xpath: xpath 路径
    :param wait_time: 等待时间，默认取 .wait_timeout
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout
    :param raise_err: 超时是否抛出异常；
    :return:
    """


def any_elements_exists(xpath_list: List[str], wait_time: float = None, interval_time: float = None,
                        raise_err: bool = None) -> Optional[str]:
    """
    遍历列表中的元素，只要任意一个元素存在就返回 True
    :param xpath_list: xpath 列表
    :param wait_time: 等待时间，默认取 .wait_timeout
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout
    :param raise_err: 超时是否抛出异常；
    :return:
    """


def element_is_selected(xpath: str) -> bool:
    """
    元素是否存在
    :param xpath: xpath 路径
    :return:
    """


def click_element_by_slide(xpath, distance: int = 1000, duration: float = 0.5, direction: int = 1,
                           count: int = 999, end_flag_xpath: str = None, wait_time: float = 600,
                           interval_time: float = 0.5, raise_err: bool = None) -> bool:
    """
    滑动列表，查找并点击指定元素
    :param xpath:
    :param distance: 滑动距离，默认 1000
    :param duration: 滑动时间，默认 0.5 秒
    :param direction: 滑动方向，默认为 1； 1=上滑，2=下滑
    :param count: 滑动次数
    :param end_flag_xpath: 结束标志 xpath
    :param wait_time: 等待时间，默认 10 分钟
    :param interval_time: 轮询间隔时间，默认 0.5 秒
    :param raise_err: 超时是否抛出异常；
    :return:
    """
```

## 文件传输
```python

def push_file(origin_path: str, to_path: str) -> bool:
    """
    将电脑文件传输到手机端
    :param origin_path: 源文件路径
    :param to_path: 目标存储路径
    :return:

    ex:
    origin_path: /
    to_path: /storage/emulated/0/Android/data/com.aibot.client/files/code479259.png
    """


def pull_file(remote_path: str, local_path: str) -> bool:
    """
    将手机文件传输到电脑端
    :param remote_path: 手机端文件路径
    :param local_path: 电脑本地文件存储路径
    :return:

    ex:
    remote_path: /storage/emulated/0/Android/data/com.aibot.client/files/code479259.png
    local_path: /
    """
```

## 设备操作
```python

def start_app(name: str, wait_time: float = None, interval_time: float = None) -> bool:
    """
    启动 APP
    :param name: APP名字或者包名
    :param wait_time: 等待时间，默认取 .wait_timeout
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout
    :return:
    """


def get_device_ip() -> str:
    """
    获取设备IP地址
    :return:
    """


def get_android_id() -> str:
    """
    获取 Android 设备 ID
    :return:
    """


def get_window_size() -> Dict[str, float]:
    """
    获取屏幕大小
    :return:
    """


def get_image_size(image_path) -> Dict[str, float]:
    """
    获取图片大小
    :param image_path: 图片路径；
    :return:
    """


def show_toast(text: str) -> bool:
    """
    Toast 弹窗
    :param text: 弹窗内容；
    :return:
    """


def send_keys(text: str) -> bool:
    """
    发送文本，需要打开 AiBot 输入法
    :param text: 文本内容
    :return:
    """


def send_vk(vk: int) -> bool:
    """
    发送文本，需要打开 AiBot 输入法
    :param vk: 虚拟键值
    :return:

    虚拟键值按键对照表 https://blog.csdn.net/yaoyaozaiye/article/details/122826340
    """


def back() -> bool:
    """
    返回
    :return:
    """


def home() -> bool:
    """
    返回桌面
    :return:
    """


def recent_tasks() -> bool:
    """
    显示最近任务
    :return:
    """


def open_uri(uri: str) -> bool:
    """
    唤起 app
    :param uri: app 唤醒协议
    :return:

    open_uri("alipayqr://platformapi/startapp?saId=10000007")
    """


def call_phone(mobile: str) -> bool:
    """
    拨打电话
    :param mobile: 手机号码
    :return:
    """


def send_msg(mobile, text) -> bool:
    """
    发送短信
    :param mobile: 手机号码
    :param text: 短信内容
    :return:
    """


def get_activity() -> str:
    """
    获取活动页
    :return:
    """


def get_package() -> str:
    """
    获取包名
    :return:
    """


def set_clipboard_text(text: str) -> bool:
    """
    设置剪切板文本
    :param text:
    :return:
    """


def get_clipboard_text() -> str:
    """
    获取剪切板内容
    :return:
    """
```

## 控件与参数
```python
def create_text_view(_id: int, text: str, x: int, y: int, width: int = 400, height: int = 60):
    """
    创建文本框控件
    :param _id:  控件ID，不可与其他控件重复
    :param text:  控件文本
    :param x:  控件在屏幕上x坐标
    :param y:  控件在屏幕上y坐标
    :param width:  控件宽度，默认 400
    :param height:  控件高度，默认 60
    :return:
    """


def create_edit_view(_id: int, text: str, x: int, y: int, width: int = 400, height: int = 150):
    """
    创建编辑框控件
    :param _id:  控件ID，不可与其他控件重复
    :param text:  控件文本
    :param x:  控件在屏幕上x坐标
    :param y:  控件在屏幕上y坐标
    :param width:  控件宽度，默认 400
    :param height:  控件高度，默认 150
    :return:
    """


def create_check_box(_id: int, text: str, x: int, y: int, width: int = 400, height: int = 60):
    """
    创建复选框控件
    :param _id:  控件ID，不可与其他控件重复
    :param text:  控件文本
    :param x:  控件在屏幕上x坐标
    :param y:  控件在屏幕上y坐标
    :param width:  控件宽度，默认 400
    :param height:  控件高度，默认 60
    :return:
    """


def get_script_params() -> Optional[dict]:
    """
    获取脚本参数
    :return:
    """
```
# WinBot开发手册

## 窗口操作
```python
def find_window(class_name: str = None, window_name: str = None) -> Optional[str]:
    """
    查找窗口句柄，仅查找顶级窗口，不包含子窗口
    :param class_name: 窗口类名
    :param window_name: 窗口名
    :return:
    """


def find_windows(class_name: str = None, window_name: str = None) -> List[str]:
    """
    查找窗口句柄数组，仅查找顶级窗口，不包含子窗口
    class_name 和 window_name 都为 None，则返回所有窗口句柄
    :param class_name: 窗口类名
    :param window_name: 窗口名
    :return:
    """


def find_sub_window(hwnd: str, class_name: str = None, window_name: str = None) -> Optional[str]:
    """
    查找子窗口句柄
    :param hwnd: 当前窗口句柄
    :param class_name: 窗口类名
    :param window_name: 窗口名
    :return:
    """


def find_parent_window(hwnd: str) -> Optional[str]:
    """
    查找父窗口句柄
    :param hwnd: 当前窗口句柄
    :return:
    """


def get_window_name(hwnd: str) -> Optional[str]:
    """
    获取窗口名称
    :param hwnd: 当前窗口句柄
    :return:
    """


def show_window(hwnd: str, show: bool) -> bool:
    """
    显示/隐藏窗口
    :param hwnd: 当前窗口句柄
    :param show: 是否显示窗口
    :return:
    """


def set_window_top(hwnd: str) -> bool:
    """
    设置窗口到最顶层
    :param hwnd: 当前窗口句柄
    :return:
    """
```

## 键鼠操作
```python
def move_mouse(hwnd: str, x: float, y: float, mode: bool = False, ele_hwnd: str = "0") -> bool:
    """
    移动鼠标
    :param hwnd: 当前窗口句柄
    :param x: 横坐标
    :param y: 纵坐标
    :param mode: 操作模式，后台 true，前台 false, 默认前台操作
    :param ele_hwnd: 元素句柄，如果 mode=True 且目标控件有单独的句柄，则需要通过 get_element_window 获得元素句柄，指定 ele_hwnd 的值(极少应用窗口由父窗口响应消息，则无需指定);
    :return:
    """


def scroll_mouse(hwnd: str, x: float, y: float, count: int, mode: bool = False) -> bool:
    """
    滚动鼠标
    :param hwnd: 当前窗口句柄
    :param x: 横坐标
    :param y: 纵坐标
    :param count: 鼠标滚动次数, 负数下滚鼠标, 正数上滚鼠标
    :param mode: 操作模式，后台 true，前台 false, 默认前台操作
    :return:
    """


def click_mouse(hwnd: str, x: float, y: float, typ: int, mode: bool = False, ele_hwnd: str = "0") -> bool:
    """
    鼠标点击
    :param hwnd: 当前窗口句柄
    :param x: 横坐标
    :param y: 纵坐标
    :param typ: 点击类型，单击左键:1 单击右键:2 按下左键:3 弹起左键:4 按下右键:5 弹起右键:6 双击左键:7 双击右键:8
    :param mode: 操作模式，后台 true，前台 false, 默认前台操作
    :param ele_hwnd: 元素句柄，如果 mode=True 且目标控件有单独的句柄，则需要通过 get_element_window 获得元素句柄，指定 ele_hwnd 的值(极少应用窗口由父窗口响应消息，则无需指定);
    :return:
    """


def send_keys(text: str) -> bool:
    """
    输入文本
    :param text: 输入的文本
    :return:
    """


def send_keys_by_hwnd(hwnd: str, text: str) -> bool:
    """
    后台输入文本(杀毒软件可能会拦截)
    :param hwnd: 窗口句柄
    :param text: 输入的文本
    :return:
    """


def send_vk(vk: int, typ: int) -> bool:
    """
    输入虚拟键值(VK)
    :param vk: VK键值
    :param typ: 输入类型，按下弹起:1 按下:2 弹起:3
    :return:
    """


def send_vk_by_hwnd(hwnd: str, vk: int, typ: int) -> bool:
    """
    后台输入虚拟键值(VK)
    :param hwnd: 窗口句柄
    :param vk: VK键值
    :param typ: 输入类型，按下弹起:1 按下:2 弹起:3
    :return:
    """
```

## 图色操作
```python
def save_screenshot(hwnd: str, save_path: str, region: _Region = None, algorithm: _Algorithm = None, mode: bool = False) -> bool:
    """
    截图
    :param hwnd: 窗口句柄；
    :param save_path: 图片存储路径；
    :param region: 截图区域，默认全屏；
    :param algorithm: 处理截图所用算法和参数，默认保存原图；
    :param mode: 操作模式，后台 true，前台 false, 默认前台操作；
    :return:

    # 区域相关参数
    region = (0, 0, 0, 0) 按元素顺序分别代表：起点x、起点y、终点x、终点y，最终得到一个矩形。
    # 算法相关参数
    algorithm = (0, 0, 0) # 按元素顺序分别代表：algorithm_type 算法类型、threshold 阈值、max_val 最大值。
    threshold 和 max_val 同为 255 时灰度处理.
    0   THRESH_BINARY      算法，当前点值大于阈值 threshold 时，取最大值 max_val，否则设置为 0；
    1   THRESH_BINARY_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则设置为最大值 max_val；
    2   THRESH_TOZERO      算法，当前点值大于阈值 threshold 时，不改变，否则设置为 0；
    3   THRESH_TOZERO_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则不改变；
    4   THRESH_TRUNC       算法，当前点值大于阈值 threshold 时，设置为阈值 threshold，否则不改变；
    5   ADAPTIVE_THRESH_MEAN_C      算法，自适应阈值；
    6   ADAPTIVE_THRESH_GAUSSIAN_C  算法，自适应阈值；
    """


def get_color(hwnd: str, x: float, y: float, mode: bool = False) -> Optional[str]:
    """
    获取指定坐标点的色值，返回色值字符串(#008577)或者 None
    :param hwnd: 窗口句柄；
    :param x: x 坐标；
    :param y: y 坐标；
    :param mode: 操作模式，后台 true，前台 false, 默认前台操作；
    :return:
    """


def find_color(hwnd: str, color: str, sub_colors: _SubColors = None, region: _Region = None,
               similarity: float = 0.9, mode: bool = False, wait_time: float = None,
               interval_time: float = None):
    """
    获取指定色值的坐标点，返回坐标或者 None
    :param hwnd: 窗口句柄；
    :param color: 颜色字符串，必须以 # 开头，例如：#008577；
    :param sub_colors: 辅助定位的其他颜色；
    :param region: 在指定区域内找色，默认全屏；
    :param similarity: 相似度，0-1 的浮点数，默认 0.9；
    :param mode: 操作模式，后台 true，前台 false, 默认前台操作；
    :param wait_time: 等待时间，默认取 .wait_timeout；
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout；
    :return:

    # 区域相关参数
    region = (0, 0, 0, 0) 按元素顺序分别代表：起点x、起点y、终点x、终点y，最终得到一个矩形。
    # 算法相关参数
    algorithm = (0, 0, 0) # 按元素顺序分别代表：algorithm_type 算法类型、threshold 阈值、max_val 最大值。
    threshold 和 max_val 同为 255 时灰度处理.
    0   THRESH_BINARY      算法，当前点值大于阈值 threshold 时，取最大值 max_val，否则设置为 0；
    1   THRESH_BINARY_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则设置为最大值 max_val；
    2   THRESH_TOZERO      算法，当前点值大于阈值 threshold 时，不改变，否则设置为 0；
    3   THRESH_TOZERO_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则不改变；
    4   THRESH_TRUNC       算法，当前点值大于阈值 threshold 时，设置为阈值 threshold，否则不改变；
    5   ADAPTIVE_THRESH_MEAN_C      算法，自适应阈值；
    6   ADAPTIVE_THRESH_GAUSSIAN_C  算法，自适应阈值；
    """


def find_images(hwnd: str, image_path: str, region: _Region = None, algorithm: _Algorithm = None,
                similarity: float = 0.9, mode: bool = False, multi: int = 1, wait_time: float = None,
                interval_time: float = None) -> List[_Point]:
    """
    寻找图片坐标，在当前屏幕中寻找给定图片中心点的坐标，返回坐标列表
    :param hwnd: 窗口句柄；
    :param image_path: 图片的绝对路径；
    :param region: 从指定区域中找图，默认全屏；
    :param algorithm: 处理屏幕截图所用的算法，默认原图，注意：给定图片处理时所用的算法，应该和此方法的算法一致；
    :param similarity: 相似度，0-1 的浮点数，默认 0.9；
    :param mode: 操作模式，后台 true，前台 false, 默认前台操作；
    :param multi: 返回图片数量，默认1张；
    :param wait_time: 等待时间，默认取 .wait_timeout；
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout；
    :return:

    # 区域相关参数
    region = (0, 0, 0, 0) 按元素顺序分别代表：起点x、起点y、终点x、终点y，最终得到一个矩形。
    # 算法相关参数
    algorithm = (0, 0, 0) # 按元素顺序分别代表：algorithm_type 算法类型、threshold 阈值、max_val 最大值。
    threshold 和 max_val 同为 255 时灰度处理.
    0   THRESH_BINARY      算法，当前点值大于阈值 threshold 时，取最大值 max_val，否则设置为 0；
    1   THRESH_BINARY_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则设置为最大值 max_val；
    2   THRESH_TOZERO      算法，当前点值大于阈值 threshold 时，不改变，否则设置为 0；
    3   THRESH_TOZERO_INV  算法，当前点值大于阈值 threshold 时，设置为 0，否则不改变；
    4   THRESH_TRUNC       算法，当前点值大于阈值 threshold 时，设置为阈值 threshold，否则不改变；
    5   ADAPTIVE_THRESH_MEAN_C      算法，自适应阈值；
    6   ADAPTIVE_THRESH_GAUSSIAN_C  算法，自适应阈值；
    """


def find_dynamic_image(hwnd: str, interval_ti: int, region: _Region = None, mode: bool = False,
                       wait_time: float = None, interval_time: float = None) -> List[_Point]:
    """
    找动态图，对比同一张图在不同时刻是否发生变化，返回坐标列表
    :param hwnd: 窗口句柄；
    :param interval_ti: 前后时刻的间隔时间，单位毫秒；
    :param region: 在指定区域找图，默认全屏；
    :param mode: 操作模式，后台 true，前台 false, 默认前台操作；
    :param wait_time: 等待时间，默认取 .wait_timeout；
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout；
    :return:
    """
```

## OCR
```python
def get_text(hwnd_or_image_path: str, region: _Region = None, mode: bool = False) -> List[str]:
    """
    通过 OCR 识别窗口/图片中的文字，返回文字列表
    :param hwnd_or_image_path: 窗口句柄或者图片路径；
    :param region: 识别区域，默认全屏；
    :param mode: 操作模式，后台 true，前台 false, 默认前台操作；
    :return:
    """


def find_text(hwnd_or_image_path: str, text: str, region: _Region = None, mode: bool = False) -> List[_Point]:
    """
    通过 OCR 识别窗口/图片中的文字，返回文字列表
    :param hwnd_or_image_path: 识别区域，默认全屏；
    :param text: 要查找的文字；
    :param region: 识别区域，默认全屏；
    :param mode: 操作模式，后台 true，前台 false, 默认前台操作；
    :return:
    """
```

## 元素操作
```python

def get_element_name(hwnd: str, xpath: str, wait_time: float = None, interval_time: float = None) -> Optional[str]:
    """
    获取元素名称
    :param hwnd: 窗口句柄
    :param xpath: 元素路径
    :param wait_time: 等待时间，默认取 .wait_timeout；
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout；
    :return:
    """


def get_element_value(hwnd: str, xpath: str, wait_time: float = None, interval_time: float = None) -> Optional[str]:
    """
    获取元素文本
    :param hwnd: 窗口句柄
    :param xpath: 元素路径
    :param wait_time: 等待时间，默认取 .wait_timeout；
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout；
    :return:
    """


def get_element_rect(hwnd: str, xpath: str, wait_time: float = None, interval_time: float = None) -> Optional[Tuple[_Point, _Point]]:
    """
    获取元素矩形，返回左上和右下坐标
    :param hwnd: 窗口句柄
    :param xpath: 元素路径
    :param wait_time: 等待时间，默认取 .wait_timeout；
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout；
    :return:
    """


def get_element_window(hwnd: str, xpath: str, wait_time: float = None, interval_time: float = None) -> Optional[str]:
    """
    获取元素窗口句柄
    :param hwnd: 窗口句柄
    :param xpath: 元素路径
    :param wait_time: 等待时间，默认取 .wait_timeout；
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout；
    :return:
    """


def click_element(hwnd: str, xpath: str, typ: int, wait_time: float = None,
                  interval_time: float = None) -> bool:
    """
    获取元素窗口句柄
    :param hwnd: 窗口句柄
    :param xpath: 元素路径
    :param typ: 操作类型，单击左键:1 单击右键:2 按下左键:3 弹起左键:4 按下右键:5 弹起右键:6 双击左键:7 双击右键:8
    :param wait_time: 等待时间，默认取 .wait_timeout；
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout；
    :return:
    """


def set_element_focus(hwnd: str, xpath: str, wait_time: float = None,
                      interval_time: float = None) -> bool:
    """
    设置元素作为焦点
    :param hwnd: 窗口句柄
    :param xpath: 元素路径
    :param wait_time: 等待时间，默认取 .wait_timeout；
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout；
    :return:
    """


def set_element_value(hwnd: str, xpath: str, value: str,
                      wait_time: float = None, interval_time: float = None) -> bool:
    """
    设置元素文本
    :param hwnd: 窗口句柄
    :param xpath: 元素路径
    :param value: 要设置的内容
    :param wait_time: 等待时间，默认取 .wait_timeout；
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout；
    :return:
    """


def scroll_element(hwnd: str, xpath: str, horizontal: int, vertical: int,
                   wait_time: float = None, interval_time: float = None) -> bool:
    """
    滚动元素
    :param hwnd: 窗口句柄
    :param xpath: 元素路径
    :param horizontal: 水平百分比 -1不滚动
    :param vertical: 垂直百分比 -1不滚动
    :param wait_time: 等待时间，默认取 .wait_timeout；
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout；
    :return:
    """


def close_window(hwnd: str, xpath: str) -> bool:
    """
    关闭窗口
    :param hwnd: 窗口句柄
    :param xpath: 元素路径
    :return:
    """


def set_element_state(hwnd: str, xpath: str, state: str) -> bool:
    """
    设置窗口状态
    :param hwnd: 窗口句柄
    :param xpath: 元素路径
    :param state: 0正常 1最大化 2 最小化
    :return:
    """
```

## 系统剪切板
```python
def set_clipboard_text(text: str) -> bool:
    """
    设置剪切板内容
    :param text: 要设置的内容
    :return:
    """


def get_clipboard_text() -> str:
    """
    设置剪切板内容
    :return:
    """
```

## 启动进程
```python

def start_process(cmd: str, show_window=True, is_wait=False) -> bool:
    """
    执行cmd命令
    :param cmd: 命令
    :param show_window: 是否显示窗口，默认显示
    :param is_wait: 是否等待程序结束， 默认不等待
    :return:
    """


def download_file(url: str, file_path: str, is_wait: bool) -> bool:
    """

    :param url: 文件地址
    :param file_path: 文件保存的路径
    :param is_wait: 是否等待下载完成
    :return:
    """

```


# WebBot开发手册

## 页面和导航
```python
def goto(url: str) -> bool:
    """
    跳转页面
    :param url:
    :return:
    """


def new_page(url: str) -> bool:
    """
    新建 Tab 并跳转页面
    :param url:
    :return:
    """


def back() -> bool:
    """
    后退
    :return:
    """


def forward() -> bool:
    """
    前进
    :return:
    """


def refresh() -> bool:
    """
    刷新
    :return:
    """


def save_screenshot(xpath: str = None) -> Optional[str]:
    """
    截图，返回 PNG 格式的 base64
    :param xpath: 元素路径，如果指定该参数则截取元素图片；
    :return:
    """


def get_current_page_id() -> Optional[str]:
    """
    获取当前页面 ID
    :return:
    """


def get_all_page_id() -> list:
    """
    获取所有页面 ID
    :return:
    """


def switch_to_page(page_id: str) -> bool:
    """
    切换到指定页面
    :param page_id:
    :return:
    """


def close_current_page() -> bool:
    """
    关闭当前页面
    :return:
    """


def ger_current_url() -> Optional[str]:
    """
    获取当前页面 URL
    :return:
    """


def get_current_title() -> Optional[str]:
    """
    获取当前页面标题
    :return:
    """
```

## iframe 操作
```python

def switch_to_frame(xpath) -> bool:
    """
    切换到指定 frame
    :param xpath:
    :return:
    """


def switch_to_main_frame() -> bool:
    """
    切回主 frame
    :return:
    """
```

## 元素操作
```python
def click_element(xpath: str) -> bool:
    """
    点击元素
    :param xpath:
    :return:
    """


def get_element_text(xpath: str) -> Optional[str]:
    """
    获取元素文本
    :param xpath:
    :return:
    """


def get_element_rect(xpath: str) -> Optional[Tuple[_Point, _Point]]:
    """
    获取元素矩形坐标
    :param xpath:
    :return:
    """


def get_element_attr(xpath: str, attr_name: str) -> Optional[str]:
    """
    获取元素的属性
    :param xpath:
    :param attr_name:
    :return:
    """


def get_element_outer_html(xpath: str) -> Optional[str]:
    """
    获取元素的 outerHtml
    :param xpath:
    :return:
    """


def get_element_inner_html(xpath: str) -> Optional[str]:
    """
    获取元素的 innerHtml
    :param xpath:
    :return:
    """


def is_selected(xpath: str) -> bool:
    """
    元素是否已选中
    :param xpath:
    :return:
    """


def is_displayed(xpath: str) -> bool:
    """
    元素是否可见
    :param xpath:
    :return:
    """


def is_available(xpath: str) -> bool:
    """
    元素是否可用
    :param xpath:
    :return:
    """


def clear_element(xpath: str) -> bool:
    """
    清除元素值
    :param xpath:
    :return:
    """


def set_element_focus(xpath: str) -> bool:
    """
    设置元素焦点
    :param xpath:
    :return:
    """


def upload_file_by_element(xpath: str, file_path: str) -> bool:
    """
    通过元素上传文件
    :param xpath:
    :param file_path:
    :return:
    """


def send_keys(xpath: str, value: str) -> bool:
    """
    输入值
    :param xpath:
    :param value:
    :return:
    """


def set_element_value(xpath: str, value: str) -> bool:
    """
    设置元素值
    :param xpath:
    :param value:
    :return:
    """


def set_element_attr(xpath: str, attr_name: str, attr_value: str) -> bool:
    """
    设置元素属性
    :param xpath:
    :param attr_name:
    :param attr_value:
    :return:
    """


def send_vk(vk: str) -> bool:
    """
    输入值
    :param vk:
    :return:
    """
```

## 键鼠操作
```python
def click_mouse(point: _Point_Tuple) -> bool:
    """
    点击鼠标
    :param point: 坐标点
    :return:
    """


def move_mouse(point: _Point_Tuple) -> bool:
    """
    移动鼠标
    :param point: 坐标点
    :return:
    """


def scroll_mouse(start_p: _Point_Tuple, end_p: _Point_Tuple) -> bool:
    """
    滚动鼠标
    :param start_p: 开始坐标点
    :param end_p: 结束坐标点
    :return:
    """


def click_mouse_by_element(xpath: str) -> bool:
    """
    根据元素位置点击鼠标
    :param xpath:
    :return:
    """


def move_to_element(xpath: str) -> bool:
    """
    移动鼠标到元素位置
    :param xpath:
    :return:
    """


def scroll_to_element(xpath: str) -> bool:
    """
    滚动鼠标到元素位置
    :param xpath:
    :return:
    """
```

## Alert
```python
def click_alert(accept: bool, prompt_text: str) -> bool:
    """
    点击警告框
    :param accept: 确认或取消
    :param prompt_text: 警告框文本
    :return:
    """


def get_alert_text() -> Optional[str]:
    """
    获取警告框文本
    :return:
    """
```

## 窗口操作
```python
def get_window_pos():
    """
    获取窗口位置和状态
    :return:
    """
```

## Cookies
```python

def get_cookies(url: str) -> Optional[list]:
    """
    获取指定 url 的 Cookies
    :param url:
    :return:
    """


def get_all_cookies() -> Optional[list]:
    """
    获取所有的 Cookies
    :return:
    """


def set_cookies(url: str, name: str, value: str, options: dict = None) -> bool:
    """
    设置指定 url 的 Cookies
    :param url: 要设置 Cookie 的域
    :param name: Cookie 名
    :param value: Cookie 值
    :param options: 其他属性
    :return:
    """


def delete_cookies(name: str, url: str = "", domain: str = "", path: str = "") -> bool:
    """
    删除指定 Cookie
    :param name: 要删除的 Cookie 的名称
    :param url: 删除所有匹配 url 和 name 的 Cookie
    :param domain: 删除所有匹配 domain 和 name 的 Cookie
    :param path: 删除所有匹配 path 和 name 的 Cookie
    :return:
    """


def delete_all_cookies() -> bool:
    """
    删除所有 Cookie
    :return:
    """


def clear_cache() -> bool:
    """
    清除缓存
    :return:
    """
```

## JS 注入
```python
def execute_script(script: str) -> Optional[Any]:
    """
    注入执行 JS
    :param script: 要执行的 JS 代码
    :return: 假如注入代码有返回值，则返回此值，否则返回 None;

    result = execute_script('(()=>"aibote rpa")()')
    print(result)  # "aibote rpa"
    """
```