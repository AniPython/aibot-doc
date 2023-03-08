await windowsBot.audioFileToText(filePath, language);
// 音频文件转文本
// 参数一 字符串型，音频文件路径
// 参数二 字符串型，语言
// 成功返回转换后的音频文本，失败返回null

await windowsBot.microphoneToText(language);
// 麦克风输入音频换文本
// 参数一 字符串型，语言
// 成功返回转换后的音频文本，失败返回null