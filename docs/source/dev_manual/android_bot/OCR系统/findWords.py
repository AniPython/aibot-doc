def find_text(text: str, region: _Region = None, scale: float = 1.0) -> List[_Point]:
    """
    查找文字所在的坐标，返回坐标列表（坐标是文本区域中心位置）
    :param text: 要查找的文字；
    :param region: 识别区域，默认全屏；
    :param scale: 图片缩放率，默认为 1.0，1.0 以下为缩小，1.0 以上为放大；
    :return:
    """