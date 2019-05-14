$(document).ready(function () {
    setTimeout(function () {
        swiper1()
        swiper2()
    },100)
    $(".home span").css('background-image', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAFHUExURUxpcf/UAP/WAP/VAP/WAP/WAP/WAP/UAP/WAP/VAP/UAP/VAP/WAP/XAP/VAP/VAP/VAP/VAP/WAP/WAP/aAP/WAP/XAP/VAP/WAP/WAP+/AP/WAP/VAP/VAP/SAP/MAP/WAP/fAP/WAP/WAP/VAP/WAP/WAP/VAP/UAP/VAP//AP/TAP/dAP/WAP/XAP/VAP/VAP/YAP/WAP/VAP/VAP/VAP/WAP/WAP/VAP/VAP/VAP/UAP/UAP/UAP/VAP/XAP/VAP/WAP/WAP/VAP/WAP/WAP/XAP/VAP/WAP/VAP/VAP/VAP/UAP/WAP/WAP/XAP/VAP/WAP/XAP/WAP/UAP/XAP/VAP/ZAP/WAP/WAP/WAP/WAP/VAP/WAP/UAP/VAP/WAP/WAP/YAP/WAP/VAP/WAP/WAP/VAP/VAP/VAP/aAP/VAP/WAEyhgyoAAABsdFJOUwBhbPx4a/sSwoAG/kwte/1o2V/DFdYnMeJYBPTy0hcFvAjUUqfu4ENndAMvD+g0uuQhisDsaWpG5VZcTh5t0XPm7+1uf7ZBjBPxPUkqnPogiPkNcls6gRujeaRkmZck3dxeFJ2PfamNuHoOvrrt0pEAAAFVSURBVEjH7dXVcoNAFIDhBFqShhAIcbe6u7epu7u797z/dTskGxaCHGY67U3/y7PzzTCw7LpcP5VPevt8/3BEXuG7F58D8QxK23jDiBUCg1gh80AK4MRUqiZAlDBiLA1U7KS96O0BTSm/nRBuQdd8m7WYjkBdczErkQ2BQcEtc9HdB4ZlTk03VjOYNPRgLJKPYNrygSFZBYvOOg3EElh2lawTM6w1gT29uN8Bu3Rb1J+2FcCN0mKlBRDtH6ki1g+o1jeJiN4BsoWNihjIALp4l0JOwEEXCjmexYtI9YdbE65x4EkI115ZAEfK1HdpwpGGvyWc6Jzwzh+MZ7lqLI8kQUZ2K8lMEEnyOTLP5ZHE6yFzj/ef/DY5d046KDKCIwmK7A5jSDxLn7CH9FJIJZq70609xxfH1aVi7RwJF9Vp66X+togmJKZRiSkVyLBQIrP2iRsy/ALyxS1budp1wgAAAABJRU5ErkJggg==)')
})

function swiper1() {
    var mySwiper1 = new Swiper('#topSwiper', {
        direction: 'horizontal',
        loop: true,
        speed: 500,
        autoplay: 2000,
        pagination: '.swiper-pagination',
        control: true,
    });
};
function swiper2() {
    var mySwiper2 = new Swiper('#swiperMenu', {
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 2,
        loop: false,
    });
};