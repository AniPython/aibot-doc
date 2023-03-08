await androidBot.sleep(3000);
// 显式等待
// 参数一 整型，等待时间，单位毫秒

await androidBot.setImplicitTimeout(waitMs, intervalMs = 5);
// 隐式等待
// 参数一 整型，等待时间，单位毫秒
// 参数二 整型，心跳间隔，单位毫秒。可选参数，默认5毫秒
// 作用全局，程序起始设置一次即可。并发会影响实际等待时间
