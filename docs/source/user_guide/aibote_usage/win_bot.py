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
