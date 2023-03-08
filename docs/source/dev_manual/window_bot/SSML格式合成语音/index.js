await windowsBot.SSMLToBullhorn(ssmlPath, language, voiceName);
//SSML文本格式合成音频到扬声器
//参数一 字符串型，SSML文本路径
//参数二 字符串型，语言
//参数三 字符串型，发音人
//成功返回true，失败返回false

await windowsBot.SSMLToFile(ssmlPath, language, voiceName, audioPath);
//SSML文本格式合成音频到扬声器
//参数一 字符串型，SSML文本路径
//参数二 字符串型，语言
//参数三 字符串型，发音人
//参数四 字符串型，保存音频文件路径
//成功返回true，失败返回false