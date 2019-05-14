$(document).ready(function(){
    $(".cart span").css('background-image', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAGMUExURUxpcf+/AP/VAP/VAP/UAP/WAP/XAP/XAP/WAP/VAP/WAP/WAP/VAP/VAP/UAP/VAP/VAP//AP/WAP/WAP/WAP/VAP/VAP/VAP/VAP/VAP/PAP/XAP/WAP/VAP/WAP/VAP/VAP//AP/UAP/WAP/VAP/WAP/WAP/iAP/WAP/VAP/WAP/VAP/VAP/WAP/VAP/WAP/ZAP/VAP/VAP/WAP/YAP/VAP/VAP/SAP/VAP/dAP/WAP/VAP/WAP/UAP/VAP/WAP/WAP//AP/XAP/YAP/WAP/VAP/RAP/VAP/VAP/UAP/UAP/VAP/UAP/TAP/VAP/UAP/TAP/WAP/WAP/VAP/WAP/XAP/VAP/VAP/WAP/QAP/XAP/XAP/aAP/VAP/VAP/VAP/VAP/UAP/WAP/VAP/VAP/WAP/VAP/WAP/WAP/WAP/VAP/WAP/WAP/TAP/WAP/VAP/UAP/XAP/VAP/WAP/VAP/VAP/WAP/VAP/ZAP/WAP/WAP/VAP/TAP/WAP/WAP/WAP/VAP/VAP/WAP/WALqBt7wAAACDdFJOUwAEoP4wkCBg49mo4MDdBoeaA9b60OtixvCAEECw/ZLN+AEecvaRUQle5IqtaK/8wht2zL0h17oR2A/037Eky4U5Akco4dEcufEYTuxtKVxhNdvaVZhaPnp/Cy1zB1c996US3LLF7ZsZTO+OeBMjcYhnJzfU0+r5vyJfnq4diei85adwoYS74wAAAapJREFUSMfF1mVXwzAUBuAxNgasc3dlzJji7u7u7u7u+eOsK5y2aUeSwwfej7fnaZvcNKlEQp4PAFzvb+kUAXGBfG7T+OQzS2VeaRQie7tUFIAKwhEdA1BOSIpcIFj2k0mVshROt0rfYzR6NGrW7AC8aFliwSRelmgxSSNLljAJxZJBTBJlSRcmmWKJOgGKccgApzMqLFLPbWYf1ntNc4kbi4xyyTAW6eWSToAxmCbewqzGeYiUR3QGDDLGX/96DNLCJ1VoEYG+Mg2awB+uAj1lcYi0o58yApE6pDD54C1jCEVigl1mG0UCArKLIjIBCSBEf4eA7BN2JZcTAJLxc7NCLGazYmVBZJM1gCTp6aQHN6QktzDthOQs12DlldFCUXdOp/NJmsujnMmLzWY72hOSMPmUVcqz18qI1ZooQA5/PaHs9ucSOvey7zgcjkud5N/S4J6oaVsWlB8yythFgSG00qNshsundPWgRJSEmJkZh25kzVfF/wvmGBLmV/1MtVaUzDAXV/lV9Rp8fHN7uUlfs/jEdjjvovj4/VuG4PoGXNXNm4Bn9i+d+AJkpzFHFaFP9QAAAABJRU5ErkJggg==)')
    if ($('.cart div').html() === '0'){
        $('.full').hide()
        $('#noproduct').show()
    }
    // 修改购物车
    $('.addShopping').each(function () {
        $(this).click(function () {
            var pid = $(this).siblings('span').attr('id')
            $.post('/changecart/0/', {'productid':pid}, function (data) {
                if (data.status === 'success'){
                    $('#'+pid).html(data.data)
                    $('#allprice').html(data.totalprice)
                    cn.html(data.carnum)
                    cn.show()
                }
            })
        })
    });

    $('.subShopping').each(function () {
        $(this).click(function () {
            var pid = $(this).siblings('span').attr('id')
            $.post('/changecart/1/', {'productid':pid}, function (data) {
                if (data.status === 'success') {
                    $('#' + pid).html(data.data)
                    $('#allprice').html(data.totalprice)
                    if (data.allchose) {
                        $('#allc').attr('class','ischose')
                    }
                    else {
                        $('#allc').attr('class','nochose')
                    }
                    if (data.data === 0) {
                        $('#' + pid + 'li').remove()
                    }
                    cn.html(data.carnum)
                    if (data.carnum === 0) {
                        cn.hide()
                        $('.full').hide()
                        $('#noproduct').show()
                    }
                }
            })
        })
    });

    $('.menuList>.confirm').each(function () {
        $(this).click(function () {
            var pid = $(this).parent().attr('id').slice(0,-2)
            var pthis = $(this)
            $.post("/changecart/2/", {"productid":pid}, function(data){
                if (data.status === "success"){
                    console.log(typeof (data.totalprice))
                    if (data.data) {
                        pthis.children().attr('class','ischose')
                    }
                    else{
                        pthis.children().attr('class','nochose')
                    }
                    if (data.allchose) {
                        $('#allc').attr('class','ischose')
                    }
                    else {
                        $('#allc').attr('class','nochose')
                    }
                    $('#allprice').html(data.totalprice)
                }
            })
        })
    })

    $('.payTheBill>.confirm').click(function () {
        var chosespan = $(this).find('span')
        $.post('/changecart/3/', {'chose':chosespan.attr('class')}, function(data){
            if (data.status === 'success'){
                if (data.allchose) {
                    chosespan.attr('class','ischose')
                }
                else {
                    chosespan.attr('class','nochose')
                }
                if (data.data) {
                    $('.menuList>.confirm>span').attr('class','ischose')
                }
                else {
                    $('.menuList>.confirm>span').attr('class','nochose')
                }
                $('#allprice').html(data.totalprice)
            }
        })
    })
    
    $('#ok').click(function () {
        var f = confirm('是否')
    })
    // var ok = document.getElementById("ok")
    // ok.addEventListener("click", function(){
    //     var f = confirm("是否确认下单？")
    //     if (f){
    //         $.post("/saveorder/", function(data){
    //             if (data.status === "success"){
    //                 window.location.href = "http://127.0.0.1:8000/cart/"
    //             }
    //         })
    //     }
    // },false)
})