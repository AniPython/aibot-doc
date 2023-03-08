await windowsBot.microphoneTranslationText(sourceLanguage, targetLanguage);
// 麦克风音频翻译成目标语言文本
// 参数一 字符串型，要翻译的语言
// 参数二 字符串型，翻译后的语言
// 成功返回翻译后的语言文本，失败返回null

await windowsBot.audioFileTranslationText(audioPath, sourceLanguage, targetLanguage);
// 音频文件翻译成目标语言文本
// 参数一 字符串型，要翻译的音频文件路径
// 参数二 字符串型，要翻译的语言
// 参数三 字符串型，翻译后的语言
// 成功返回翻译后的语言文本，失败返回null