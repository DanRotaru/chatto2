const shop = {
    quest: function(desc, price, id){
        alertify_quest(`Вы действительно хотите купить ${desc} за ${number_format(price)} <coin></coin> ?`, `shop.buy(${price}, '${id}')`);
    },
    buy: function(id, type){
        $.post(`/api/shop/${type}/${id}/shop-buy`, function(res){
            if(res.success){
                alertify(`Вы успешно купили ${res.success}`, "УСПЕХ", 1);
                if(res.info.kry) $("#my-kry").text(number_format(res.info.kry));
                $("#my-coin").text(number_format(res.info.coin));
                
                if(res.info.rank){
                    let rank = "rm" + res.info.rank;
                    if ($(".user-details .rank").attr('class').indexOf(rank) == -1) {
                        $(".user-details .rank").removeClass($(".user-details .rank").attr('class').match(/(rm|rmv)\d+/)[0]);
                        $(".user-details .rank").addClass(rank);
                    }
                }
                
                return false;
            }
            else{
                alertify(res.error, "Ошибка", 2);
            }
        });
    }
}
$("#shop-nav a").click(function(){
    $("#shop-nav a").removeClass("active");

    $(this).addClass("active");
    let id = $(this).attr("data-id");
    document.querySelector(`.shop-section[data-shop-id="${id}"]`).scrollIntoView( {behavior: "smooth" })
});

function pShop(id){
    page('shop', function(){
        $(`#shop-nav a`).removeClass("active");
        $(`#shop-nav a[data-id="${id}"]`).addClass("active");
        document.querySelector(`.shop-section[data-shop-id="${id}"]`).scrollIntoView( {behavior: "smooth" })
    });
}


// $(".shop-wrapper__main").scroll(function(){
//     // console.log(e);
//     // let crystalls = $(`.shop-title[data-shop-id="crystalls"]`).offset().top;
//     // console.log(crystalls);

//     var sectionIds = $('#shop-nav a');

//     let scrollPosition = $(".shop-wrapper__main").scrollTop();
//     sectionIds.each(function(){
//         let container = $(this).attr('data-id');
//         let el = $(`.shop-section[data-shop-id="${container}"]`);
//         // let containerBottom = el.offset().top + 

//         let elH = el.offset().top + el.outerHeight();
        
//         if(scrollPosition < elH + 500 && scrollPosition >= el.offset().top){
//             $(this).addClass('active');
//         }
//         else{
//             $(this).removeClass('active');
//         }
        
//         // var containerOffset = $(`.shop-section[data-shop-id="${container}"]`).offset().top;
//         // var containerHeight = $(`.shop-section[data-shop-id="${container}"]`).outerHeight();
//         // var containerBottom = containerOffset + containerHeight;

//         // // console.log(this);
//         // if(scrollPosition < containerBottom + 100 && scrollPosition >= containerOffset + 100){
//         //     $(this).addClass('active');
//         // } else{
//         //     $(this).removeClass('active');
//         // }
//     });
// });