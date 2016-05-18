/**
 * SWH Javascript The plug-in
 * http://suwenhao.cn/swh/
 *
 * Copyright 2016, WenHao Su
 * Released under the WenHao Su Licenses.
 * Date: May 3 2016 -0400
 */
var $fn={
    //obj 运动对象
    //attr属性[上，下，左，右]方向横竖
    //speed移动一步的距离，剩时间其实就是速度
    //target总距离==总距
    //endfn回调函数
    move: function(obj,attr,dir,target,endFn,time){
        dir=parseInt(getStyle(obj,attr))<target?dir:-dir;
        clearInterval(obj.timer);
        obj.timer=setInterval(function(){
            var speed=parseInt(getStyle(obj,attr))+dir;
            if(speed >= target && dir > 0 || speed <= target && dir < 0 ){
                speed = target;
                clearInterval(obj.timer);
                endFn&&endFn();
            }
            else{
                obj.style[attr]=speed+"px";
            }
        },(time||30))
    },
    //抖动
    //obj 抖动对象
    //attr 抖动方向横竖
    //endFn回调函数
    shake:function(obj,attr,n,endFn){
        var pos=parseInt(getStyle(obj,attr));
        var arr=[];
        var num=0;
        for(var i=n;i>0;i-=2){
            arr.push(i,-i);
        }
        arr.push(0);
        clearInterval(obj.shake);
        obj.shake=setInterval(function(){
            obj.style[attr]=pos+arr[num]+"px";
            num++;
            if(num===arr.length){
                clearInterval(obj.shake);
                endFn&&endFn();
            }
        },50)
    },
    //计算x~y的随机数
    //x~y的随机数 公式 Math.round(Math.random()*(y-x) + x)
    random : function (arr){
        var max = Math.max(arr[0],arr[1]);
        var min = Math.min(arr[0],arr[1]);
        var b = max - min;
        var n = Math.round(Math.random()*b + min);
        return n
    },
    /*
     opacity 函数
     e : 操作对象(元素)
     n : 透明度 0~1
     */
    opacity : function (obj,attr){  //  0.6
        var t = getStyle(obj,'opacity')*100; // 0
        var b = 0.1*100;
        n = n*100;
        b = t < n ? Math.abs(b) : -Math.abs(b);
        e.timer = setInterval(function(){
            if(b > 0 && t >= n || b < 0 && t <= n ){
                t = n/100;
                clearInterval(e.timer)
            }else{
                t += b;
                e.style.opacity = t/100
            }
        },50)
    }
};
//getStyle 获取DOM对象的属性
function getStyle(obj,attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
//$获取DOM对象
function $$(obj){
    if(typeof obj === 'string'){
        if(obj.slice(0,1) === '#'){
            return document.getElementById(obj.slice(1));
        }else if(obj.slice(0,1) != '#'){
            return document.getElementsByTagName(obj.slice(0));
        }
    }else if(typeof obj ==='function'){
        return window.onload=obj;
    }
    else if(typeof obj ==='object'){
        return obj;
    }
}
//绝对位置和对象总宽/高度 == width + padding + border
function offset(obj,attr){
    attr=(attr.slice(0,1)).toUpperCase()+attr.slice(1);
    if(attr=='Left'||attr=='Top'||attr=='Bottom'||attr=='Right'){
        var iTop=0;
        var obj=obj;
        while(obj){
            iTop+=obj['offset'+attr];
            obj=obj.offsetParent;
        }
        return iTop;
    }else{
        return obj['offset'+attr];
    }
}
//获取class DOM ，obj传入类型为对象
function getElementsByClassName(obj){
    var arr=[];
    if(typeof obj==='object'){
        var defaults=obj.tagName||"*";
        var aEbl=(obj.parent||document).getElementsByTagName(defaults);
        for(var k=0;k<aEbl.length;k++){
            var cN=aEbl[k].className.split(' ');
            for(var g=0;g<cN.length;g++){
                if(cN[g]==obj.className){
                    arr.push(aEbl[k]);
                    break;
                }
            }
        }
    }else{
        return undefined;
    }
    return arr;
}
function addClass(obj,className){
    if(obj.className==''){
        obj.className=className;
    }else{
        var arrClassName=obj.className.split(' ');
        var _index=arrIndexOf(arrClassName,className);
        if(_index==-1){
            obj.className+=' '+className;
        }
    }
}
function removeClass(obj,className){
    if(obj.className==''){

    }else{
        var arrClassName=obj.className.split(' ');
        var _index=arrIndexOf(arrClassName,className);
        if(_index!=-1){
            arrClassName.splice(_index,1);
            obj.className=arrClassName.join('');
        }
    }
}
function arrIndexOf(arr,v){
    for(var i=0;i<arr.length;i++){
        if(arr[i]==v){
            return i;
        }
    }
    return -1;
}