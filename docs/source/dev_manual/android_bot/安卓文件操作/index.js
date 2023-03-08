
await androidBot.writeAndroidFile("/storage/emulated/0/1.txt", "aibote是一款非常优秀的RPA自动化平台", false);
// 写入安卓文件
// 参数一 字符串类型，安卓文件路径，安卓外部存储根目录 /storage/emulated/0/
// 参数二 字符串类型，写入的内容
// 参数三 布尔类型，可选参数，是否追加，默认覆盖文件内容
// 成功返回true 失败返回false

await androidBot.readAndroidFile("/storage/emulated/0/1.txt");
// 读取安卓文件
// 参数一 字符串类型，安卓文件路径，安卓外部存储根目录 /storage/emulated/0/
// 成功返回文件内容，失败返回 null

await androidBot.deleteAndroidFile("/storage/emulated/0/Android/data/com.aibot.client/files/1.png");
// 删除安卓文件
// 参数一 字符串类型，安卓文件路径，安卓外部存储根目录 /storage/emulated/0/
// 成功返回true 失败返回false

await androidBot.existsAndroidFile("/storage/emulated/0/Android/data/com.aibot.client/files/1.png");
// 判断文件是否存在
// 参数一 字符串类型，安卓文件路径，安卓外部存储根目录 /storage/emulated/0/
// 成功返回true 失败返回false