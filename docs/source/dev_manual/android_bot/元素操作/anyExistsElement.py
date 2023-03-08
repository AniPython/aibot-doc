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