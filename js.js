// ����һ�Ե�����������ֱ������ document.write
document.write('<div id="hitokotojs"></div>');
// ָ��������ʾ��Ԫ��
var hkField = document.getElementById("hitokoto");
// ָ����������
var hkCache = document.getElementById("hitokotojs");
// �ȴ�ʱ�䣬���������
var waitTime = 3500;
// һ����������õ�֡����ÿ֡ 1000 / 60 ��
var fadingFrames = 18;
// ���ƶ���״̬�� Flags
var isAnim = false;
var isFadeout = false;
var isLoaded = false;
var animProgress = 0;
var i = 0;
// ��֡��������
hkAnim = function() {
    // ��ǰ���Ȳ���
    animProgress++;
    curAlphaStep = animProgress / fadingFrames;
    curAlpha = isFadeout ? (1 - curAlphaStep) : curAlphaStep;
    // ����Ԫ��͸����
    hkField.style.filter = "alpha(opacity=" + Math.round(curAlpha * 100) + ")";
    hkField.style.opacity = curAlpha;
    // ���һ���ֶ�������
    if (animProgress >= fadingFrames) {
        // ����Ǹոյ���
        if (isFadeout) {
            // ׼��������һ������
            hkAnimNext()
        } else {
            // ����ȴ�����ʱ��������һ�鶯��
            setTimeout("hkAnimPre()", waitTime)
        }
    } else {
        window.requestAnimationFrame(hkAnim)
    }
}
// ����һ�����ݣ������� retrieveHitokoto(xxxxxx) ָ��
hkAnimNext = function() {
    isLoaded = false;
    var hkLoader = document.createElement('script');
    hkLoader.setAttribute('id', 'hkLoader');
    hkLoader.setAttribute('src', 'http://api.hitokoto.us/rand?encode=jsc&fun=retrieveHitokoto');
    hkCache.appendChild(hkLoader)
    setTimeout("checkLoaded()", (waitTime / 2));
}
// ȡ������
retrieveHitokoto = function(result) {
    isLoaded = true;
    var retrieved = eval(result);
    isFadeout = false;
    animProgress = 0;
    hkField.innerHTML = retrieved.hitokoto;
    hkCache.removeChild(document.getElementById("hkLoader"));
    hkAnim()
}
// �ݴ���
checkLoaded = function() {
    if(!isLoaded) {
        hkCache.removeChild(document.getElementById("hkLoader"));
        hkAnimNext();
    }
}
// ׼����һ�����ݵ�չʾ
hkAnimPre = function() {
    isFadeout = true;
    animProgress = 0;
    window.requestAnimationFrame(hkAnim)
}
// ��ʼ�״μ���
hkAnimNext();