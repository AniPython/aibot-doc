await androidBot.pushFile("d:\\1.png", "/storage/emulated/0/1.png");
//上传文件到手机
//参数一 字符串类型，电脑文件路径
//参数二 字符串类型，安卓文件保存路径, 安卓外部存储根目录 /storage/emulated/0/
//媒体文件会自动更新至相册
//成功返回true 失败返回false

await androidBot.pullFile("/storage/emulated/0/1.png", "d:\\1.png");
//拉取文件到电脑
//参数一 字符串类型，安卓文件路径, 安卓外部存储根目录 /storage/emulated/0/
//参数二 字符串类型，电脑文件保存路径
