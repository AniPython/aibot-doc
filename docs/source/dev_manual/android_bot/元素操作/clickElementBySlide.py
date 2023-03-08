def click_element_by_slide(
        xpath,
        distance: int = 1000,
        duration: float = 0.5,
        direction: int = 1,
        count: int = 999,
        end_flag_xpath: str = None,
        wait_time: float = 600,
        interval_time: float = 0.5,
        raise_err: bool = None,
) -> bool:
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
