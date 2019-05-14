$(document).ready(function(){
    document.documentElement.style.fontSize = innerWidth / 10 + "px";
    var cn = $('#shoppingcart>div')
    if (cn.html() !== '0'){
        cn.show()
    }
    //商品详情页内商品添加到购物车
    $('#addproduct').click(function () {
        var pid = $('#foot_num>span').attr('ga')
        $.post('/changecart/0/', {'productid':pid}, function (data) {
            if (data.status === 'success'){
                $('#foot_num>span').html(data.data)
                var img = $('#page-main>img')
                var flyer = $('<img class="u-flyer" src="'+img.attr('src')+'">')
                flyer.fly({
                    start: {
                        left: img.offset().left+innerWidth/10*((9-5)/2),
                        top: img.offset().top,
                    },
                    end: {
                        left: innerWidth-innerWidth/10*(0.3+1.8),
                        top: innerHeight-innerWidth/10*(0.3+1.8),
                        width: innerWidth/10*1.8,
                        height: innerWidth/10*1.8,
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

    //商品详情页内商品从购物车移除
    $('#subproduct').click(function () {
        var pid = $('#foot_num>span').attr('ga')
        $.post('/changecart/1/', {'productid':pid}, function (data) {
            if (data.status === 'success'){
                $('#foot_num>span').html(data.data)
                cn.html(data.carnum)
                if (data.carnum === 0) {
                    cn.hide()
                }
            }
            else if (data.data === -1) {
                window.location.href = 'http://127.0.0.1:8000/login/'
            }
        })
    })
})