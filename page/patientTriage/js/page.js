//滑轮
(function($){
    $(window).load(function(){
        $(".content_left_content").mCustomScrollbar();
        $(".content_right_content_message").mCustomScrollbar();
    });
})(jQuery);

//取出订单
function bringOrder(){
    var BO = document.getElementById('bringOrder');
    var NO = document.getElementById('noOrder');
    var AllContent = document.getElementsByClassName('content_left_content')[0];
    var content_left_content = document.getElementsByClassName('content_left_content')[1];
        if (BO.times) {
            console.log(BO.times);
            BO.setAttribute("icon","page/patientTriage/img/ico_bill.png");
            BO.setText("取出订单");
            backToQueue()
            AllContent.style.display = 'none';
            content_left_content.style.display = 'block';
            BO.times = false;
            NO.disabled = "disabled";
            NO.setAttribute("disabled","disabled");
        }else{
            BO.setAttribute("icon","page/patientTriage/img/ico_stop.png");
            BO.setText("暂停分诊")  ;
            baseMessage();
            Picture();
            AllContent.style.display = 'block';
            content_left_content .style.display = 'none';

            BO.times = true;
            NO.disabled = "";
            NO.setAttribute("disabled","false");

        }

}
//无法分诊
function noOrder(){
    var BO = document.getElementById('bringOrder');
    var NO = document.getElementById('noOrder');
    var AllContent = document.getElementsByClassName('content_left_content')[0];
    var content_left_content = document.getElementsByClassName('content_left_content')[1];
    AllContent.style.display = 'none';
    content_left_content.style.display = 'block';
    BO.setAttribute("icon","page/patientTriage/img/ico_bill.png");
    BO.setText("取出订单");
    NO.disabled = "disabled";
    NO.setAttribute("disabled","disabled");
    bringOrder();
    rejectTriage();
}
window.onload = function(){
    var search = document.getElementById('search');
    var replace = document.getElementById('replace');
    search.style.width = '30px';
    search.style.height = '16px';
    search.style.lineHeight ='16px';
    replace.style.width = '30px';
    replace.style.height = '16px';
    replace.style.lineHeight ='16px'
}


(function($){
    $(window).load(function(){
        $(".content_right_content_message").mCustomScrollbar();
    });
})(jQuery);
