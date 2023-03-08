def element_exists(
        xpath: str,
        wait_time: float = None,
        interval_time: float = None,
        raise_err: bool = None,
) -> bool:
    """
    元素是否存在
    :param xpath: xpath 路径
    :param wait_time: 等待时间，默认取 .wait_timeout
    :param interval_time: 轮询间隔时间，默认取 .interval_timeout
    :param raise_err: 超时是否抛出异常；
    :return:
    """
