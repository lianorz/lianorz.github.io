<span id="hitokoto"></span>
<script>
function hitokoto(e){
    $("#hitokoto").stop().fadeOut(function(){$("#hitokoto").html(e.hitokoto);$("#hitokoto").stop().fadeIn()})
};
function genHitokoto(){
    var e=["a","b","c","d"],t=document.createElement("script");
    t.type="text/javascript";
    t.id="hitokotoko_js";
    t.src="http://api.hitokoto.us/rand?encode=jsc&charset=utf-8";
    //注释，这里的超链接根据需要自行修改，比如引用自己增添的句子，具体操作看一言网站，链接开头已给出。
    $("#hitokoto").append(t)
};
setInterval(genHitokoto,1e4);
genHitokoto();
</script>