$(document).ready(function(){
    cn = $('.cart>dl>dt>div')
    cn.show()
    if (cn.html() === '0'){
        cn.hide()
    }
    document.documentElement.style.fontSize = innerWidth / 10 + "px";
})