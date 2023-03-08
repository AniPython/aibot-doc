
await windowsBot.textToBullhorn(text, language, voiceName);
//文本合成语音输出到扬声器播放
//参数一 字符串型，要转换语音的文本
//参数二 字符串型，语言
//参数三 字符串型，发音人
//成功返回true，失败返回false

await windowsBot.textToAudioFile(text, language, voiceName, audioPath);
//文本合成语音保存到本地音频文件
//参数一 字符串型，要转换语音的文本
//参数二 字符串型，语言
//参数三 字符串型，发音人
//参数四 字符串型，保存音频文件路径，后缀必须为".mp3"或者".wav"
//成功返回true，失败返回false