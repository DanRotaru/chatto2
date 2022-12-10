function menu(){
    // $("#menu").toggleClass("shown");
    
    if($("#menu").is(":visible")) {
        $("#menu").slideUp(100);
        $(".garage .garage__nav").removeClass('not');
        $(".garage-page__main-page").removeClass("top");
    }
    else {
        $(".garage .garage__nav").addClass('not');
        $("#menu").slideDown({
            duration: 50,
            start: function () {
                $(this).css({
                    display: "flex"
                })
            }
        });

        $(".garage-page__main-page").addClass("top");
    }
}

$("header .navbar .navbar__btn[action]").click(function(){
    let action = $(this).attr('action');
    
    if(action == 'fullscreen') toggleFullScreen();
    else if(action == 'logout') document.location.href='/logout';
    else if(action == 'quests'){
        page('quests');
    }
    else if(action == 'shop'){
        page('shop');
    }
    else if(action == 'lottery'){
        page('lottery', function(){
            socket.emit('getLottery', 1);
        });
    }
    else if(action == 'settings'){
        page('settings', function(){
            console.log('settings');
        });
    }
    else if(action == 'home'){
        page('main');
    }
});

$("header .navbar .navbar__item .item-number").click(function(){
    page('shop');
});

$("#menu a").click(function(){
    menu();
    let id = $(this).attr("data-nav");
    page(id);
    setTimeout(() => {
        $("#menu .nav__item").removeClass("active");
        $(this).addClass("active");
    }, 500);
});