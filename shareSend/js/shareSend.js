/**
 * Created by gzbugu on 2016-05-17.
 */
var sWidth=$('.shareSend').width(),
    oCodeWidth=260,
    oCodeHeight=215,
    oIW=70,
    oIH=70,
    oIT=69,
    oIL=96;
$(window).resize(function(){
    var sW=$('.shareSend').width();
    mov(sW);
});
function mov(sW){
    var h=(oCodeHeight*((oCodeWidth*sW)/sWidth))/oCodeWidth;
    var t=(((oCodeWidth*sW)/sWidth)*170)/oCodeWidth;
    var l=((oCodeWidth*sW)/sWidth)/2;
    var iH=(oIH*((oIW*sW)/sWidth))/oIW;
    var iT=(((oIW*sW)/sWidth)*Math.abs(oIT))/oIW;
    var iL=(((oIW*sW)/sWidth)*Math.abs(oIL))/oIW;
    $(".qr-code").css({'width':(oCodeWidth*sW)/sWidth+'px','height':h+'px','margin-top':-t+'px','margin-left': -l +'px'});
    $(".qr-code img.qr").css({'width':(oIW*sW)/sWidth+'px','height':iH+'px','margin-top':iT+'px','margin-left': iL +'px'});
    $(".qr-code img.messg").css({'width':(90*sW)/sWidth+'px','height':(36*((90*sW)/sWidth))/90+'px','top':(((90*sW)/sWidth)*Math.abs(100))/90+'px','left': (((90*sW)/sWidth)*Math.abs(160))/90 +'px'});
    $(".shareSend .footer").css({'margin-top':(((oIW*sW)/sWidth)*50)/oIW+'px'});
}
$('input.send').click(function(){
    $('.mask-panel').show();
    $fn.move($$('#sec'),'bottom',10,0);
});
$('input.close').click(function(){
    $fn.move($$('#sec'),'bottom',10,-174,function(){
        $('.mask-panel').hide();
    });
});
