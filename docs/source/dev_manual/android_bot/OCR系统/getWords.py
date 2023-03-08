def get_text(region: _Region = None, scale: float = 1.0) -> List[str]:
    """
    通过 OCR 识别屏幕中的文字，返回文字列表
    :param region: 识别区域，默认全屏；
    :param scale: 图片缩放率，默认为 1.0，1.0 以下为缩小，1.0 以上为放大；
    :return:
    """