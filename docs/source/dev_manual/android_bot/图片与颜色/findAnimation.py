def find_dynamic_image(
        interval_ti: int,
        region: _Region = None,
        wait_time: float = None,
        interval_time: float = None,
        raise_err: bool = None,
) -> List[_Point]:
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
