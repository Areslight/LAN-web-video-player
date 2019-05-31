/**
 * Created by hao on 2016/1/28.
 */
$(function(){
    $(window).on('load',function(){
        var oArt=$('article .container');
        var dataImg={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"}]};
        var minHeight;
        var minIndex;
        var cols;
        imgLocation();
        setWrapWidth();
        window.onresize=function(){
            location.reload();
        };
        window.onscroll=function(){
            if(scrollside()){
                for(var i=0; i<dataImg.data.length; i++){
                    var oBox='<div class="box"><div class="content"><img src="images/'+dataImg.data[i].src+'"/></div></div>';
                    oArt.append(oBox);
                }
                imgLocation();
                setWrapWidth();
            }
        }
    })
});

function imgLocation(){
    var box=$('.box');
    var boxWidth=box.eq(0).width();
    cols=Math.floor($('.container').width()/boxWidth);
    var heightArr=[];
    console.log(cols);
    var containerPadding=parseInt($('.container').css('paddingTop'));
    box.each(function(index,value){
        var boxHeight=box.eq(index).height();
        if(index<cols){
            heightArr[index]=boxHeight;
        }
        else{
            minHeight=Math.min.apply(null,heightArr);
            minIndex=heightArr.indexOf(minHeight);
            console.log(minHeight+','+minIndex);
            box.eq(index).css({
                "position":"absolute",
                "top":minHeight+containerPadding,
                "left":box.eq(minIndex).position().left
            });
            heightArr[minIndex]+=box.eq(index).height();
        }
    });

}

function scrollside(){
    var box=$('.box');
    var lastHeight=box.last().offset().top+Math.floor(box.last().height()/2);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    return (lastHeight<document.documentElement.clientHeight+scrollTop)?true:false;
}

function setWrapWidth(){
    var wrapWidth=Math.ceil($('.box').outerWidth()*cols);
    $('.container').width(wrapWidth);
    console.log($('.box').outerWidth())
}

function getTop(obj) {
    var iTop = 0;
    while(obj) {
        iTop += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return iTop;
}
