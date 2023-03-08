await webBot.getCookies(url);
// 获取指定url匹配的cookies
// 参数一 字符串型，指定的url http:// 或https:// 起头
// 成功返回json格式的字符串，失败返回null

await webBot.getAllCookies();
// 获取指定url匹配的cookies
// 成功返回json格式的字符串，失败返回null

await webBot.setCookie(cookieParam);
// 设置cooki
// 参数一 json类型，{"name":string, "value":string, "url":string, "domain":string, "path":string, "secure":boolean, "httpOnly":boolean, "sameSite":string, "expires":number, "priority":string, "sameParty":boolean, "sourceScheme":string, "sourcePort":number, "partitionKey":string}  name、value和url必填参数，其他参数可选
// 成功返回true，失败返回false

await webBot.deleteCookies(name, options = {});
// 删除指定cookies
// 参数一 字符串型，要删除的 Cookie 的名称。
// 参数二 json类型，{{url:string, domain:string, path:string}} 可选参数
// url 如果指定，则删除所有匹配 url 和 name的Cookie
// domain 如果指定，则删除所有匹配 domain 和 name的Cookie
// path 如果指定，则删除所有匹配 path 和 name的Cookie
// 成功返回true，失败返回false

await webBot.deleteAllCookies();
// 删除所有cookies
// 成功返回true，失败返回false

await webBot.clearCache();
// 清除缓存
// 成功返回true，失败返回false