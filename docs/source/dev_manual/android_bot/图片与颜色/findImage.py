def find_image(
        image_name,
        region: _Region = None,
        algorithm: _Algorithm = None,
        similarity: float = 0.9,
        wait_time: float = None,
        interval_time: float = None,
        raise_err: bool = None,
) -> Optional[_Point]:
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


def find_image_by_opencv(
        image_name,
        region: _Region = None,
        algorithm: _Algorithm = None,
        similarity: float = 0.9,
        wait_time: float = None,
        interval_time: float = None,
        raise_err: bool = None,
) -> Optional[_Point]:
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


def find_images_by_opencv(
        image_name,
        region: _Region = None,
        algorithm: _Algorithm = None,
        similarity: float = 0.9,
        multi: int = 1,
        wait_time: float = None,
        interval_time: float = None,
        raise_err: bool = None,
) -> List[_Point]:
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
