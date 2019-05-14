$(document).ready(function () {
    $(".market span").css('background-image', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAGeUExURUxpcf/VAP/VAP/VAP/WAP/VAP/VAP/UAP//AP/UAP/VAP/WAP/VAP/MAP/VAP/VAP/VAP/WAP/VAP/UAP/XAP/WAP/WAP/VAP/WAP/WAP+/AP/XAP/VAP/YAP/VAP/WAP/WAP/VAP/UAP/VAP/VAP/VAP/YAP/WAP/VAP/WAP/XAP/WAP/WAP/VAP/XAP/VAP/WAP/VAP/WAP/WAP/aAP/VAP/UAP/WAP/RAP/WAP/UAP/VAP/VAP/VAP/WAP/WAP/UAP/WAP/VAP/WAP//AP/TAP/WAP/VAP/WAP/VAP/VAP/WAP/XAP/VAP/VAP/WAP/VAP/WAP/TAP/WAP/WAP/VAP/VAP/WAP/WAP/VAP/UAP/WAP/VAP/WAP/UAP/VAP/UAP/UAP/XAP/VAP/WAP/WAP/VAP/VAP/WAP/fAP/WAP/WAP/WAP/VAP/WAP/YAP/VAP/WAP/VAP/WAP/VAP/XAP/VAP/WAP/WAP/XAP/WAP/WAP/YAP/SAP/WAP/VAP/UAP/VAP/VAP/WAP/WAP/WAP/WAP/VAP/VAP/WAPHOwxkAAACJdFJOUwDL8ur08IwkAgbT4OsFgqH87Wg2QLbjtNvvBDr3KOTUEyUwh+zdFPPHnSCS598z19a4q5AHSVRYHEUSiJrE7oUevXr5AyNlj2q/N3gnoJOp0WspJumNULtxlGf7McgY8U4MDf0ZintjtwjJUmyVsS6OTP4/pjR1nIRBl847F+HNYczFwryipLOuaqyWQgAAAZtJREFUSMe11ldTAkEMAGCQwwNsKAiIoAiC9Gbvvffee++99+79ax8cR+82mz1mNO/f5PaSSaJQ/EmEH4pf3+If77GX56fH+2gkdBdUqTlOd3VJAX6fWqBE0ZkGEh6lgEQ5RNYwIXQCoiETJWqAuFAhuEnBm3CSQZJ6XNhKCdGaipNJMkkyLpRzhCjIQ4VlKNEkKgMpevCarAM1aUfFLtBf9hFM7G0CSQKY2HIAYqYOEXmngND4sCQb+wBxzqOPL4znJlp4Qcg5lIiWWRYRgryYLHJMIrSJiTXKJjWSLztgk25pF1tYYpn4Z86YDSfpZGWsx658RPSVQDNMSx97KVPwbN05ogkzDwt7EgWkZqXBQntCEdlh2o7YpvRWk5YmKiKgqO2iL6JqCCStVtGFEXq7rhJZdtpxEuhHHdh+nCDFwBi6UYdDUjCdsYIv4X6pMJUx1vZCs0T08gyxJOnglEHmbdChFzcIzz4nzKKJRetBUah+iUajrKPF/XNypGvk3Tnn38JrkHsa+b1fp8OFR/45dVt8zekCN4r/ik+DZnjg5r5JBAAAAABJRU5ErkJggg==)')

    //分类和排序的点击事件
    $('#alltypebtn,#showsortbtn').click(function () {
        var sdiv = $('#'+$(this).attr('id').slice(-7,-3)+'div')
        $(this).parent().siblings().find('style').remove()
        if (sdiv.css('display')==='block') {
            $(this).find('style').remove()
            sdiv.css('display','none')
        }else{
            var spanid = '#'+$(this).attr('id')+'>span'
            $(this).children().append("<style>"+spanid+":before{content: '\\e113';}</style>")
            sdiv.css('display','block')
            sdiv.siblings('div').css('display','none')
        }
    })
    $('#typediv,#sortdiv').click(function () {
        $('nav>ul>li>span').find('style').remove()
        $(this).css('display','none')
    })

    //商品添加到购物车
    var offset = $('.cart>dl span').offset()
    $('.addShopping,.shoppingcart').each(function () {
        $(this).click(function () {
            var pid = $(this).attr('ga')
            $.post('/changecart/0/', {'productid':pid}, function (data) {
                if (data.status === 'success'){
                    $('#'+pid).html(data.data)
                    var img = $("a[ga='"+pid+"']>img")
                    var flyer = $('<img class="u-flyer" src="'+img.attr('src')+'">')
                    flyer.fly({
                        start: {
                            left: img.offset().left,
                            top: img.offset().top,
                        },
                        end: {
                            left: offset.left,
                            top: offset.top,
                            width: innerWidth/10*0.65,
                            height: innerWidth/10*0.65,
                        },
                        speed: 1.2,
                        onEnd: function () {
                            this.destory();
                        }
                    });
                    cn.html(data.carnum)
                    cn.show()
                }
                else if (data.data === -1) {
                    window.location.href = 'http://127.0.0.1:8000/login/'
                }
            })
        })
    });

    //商品从购物车移除
    $('.subShopping').each(function () {
        $(this).click(function () {
            var pid = $(this).attr('ga')
            $.post('/changecart/1/', {'productid':pid}, function (data) {
                if (data.status === 'success'){
                    $('#'+pid).html(data.data)
                    cn.html(data.carnum)
                    if (data.carnum === 0) {
                        cn.hide()
                    }
                }
            })
        })
    });

    setInterval(function () {
        $('.productnum>span').each(function () {
            if ($(this).text() === '0'){
                $(this).parent().hide()
                $(this).parent().next().show()
            }
            else {
                $(this).parent().next().hide()
                $(this).parent().show()
            }
        })
    },10)

})