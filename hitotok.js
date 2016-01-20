// 加载一言的容器。所以直接用了 document.write
document.write('<div id="hitokotojs"></div>');
// 指定用于显示的元素
var hkField = document.getElementById("hitokoto");
// 指定加载容器
var hkCache = document.getElementById("hitokotojs");
// 等待时间，按毫秒计算
var waitTime = 3500;
// 一个方向过渡用的帧数，每帧 1000 / 60 秒
var fadingFrames = 18;
// 控制动画状态的 Flags
var isAnim = false;
var isFadeout = false;
var isLoaded = false;
var animProgress = 0;
var i = 0;
// 逐帧动画控制
hkAnim = function() {
    // 当前进度步进
    animProgress++;
    curAlphaStep = animProgress / fadingFrames;
    curAlpha = isFadeout ? (1 - curAlphaStep) : curAlphaStep;
    // 设置元素透明度
    hkField.style.filter = "alpha(opacity=" + Math.round(curAlpha * 100) + ")";
    hkField.style.opacity = curAlpha;
    // 如果一部分动画结束
    if (animProgress >= fadingFrames) {
        // 如果是刚刚淡出
        if (isFadeout) {
            // 准备加载下一条内容
            hkAnimNext()
        } else {
            // 否则等待若干时间后进行下一组动画
            setTimeout("hkAnimPre()", waitTime)
        }
    } else {
        window.requestAnimationFrame(hkAnim)
    }
}
// 加载一言内容，将返回 retrieveHitokoto(xxxxxx) 指令
hkAnimNext = function() {
    isLoaded = false;
    var hkLoader = document.createElement('script');
    hkLoader.setAttribute('id', 'hkLoader');
    hkLoader.setAttribute('src', 'http://api.hitokoto.us/rand?encode=jsc&fun=retrieveHitokoto');
    hkCache.appendChild(hkLoader)
    setTimeout("checkLoaded()", (waitTime / 2));
}
// 取回内容
retrieveHitokoto = function(result) {
    isLoaded = true;
    var retrieved = eval(result);
    isFadeout = false;
    animProgress = 0;
    hkField.innerHTML = retrieved.hitokoto;
    hkCache.removeChild(document.getElementById("hkLoader"));
    hkAnim()
}
// 容错处理
checkLoaded = function() {
    if(!isLoaded) {
        hkCache.removeChild(document.getElementById("hkLoader"));
        hkAnimNext();
    }
}
// 准备下一轮内容的展示
hkAnimPre = function() {
    isFadeout = true;
    animProgress = 0;
    window.requestAnimationFrame(hkAnim)
}
// 开始首次加载
hkAnimNext();