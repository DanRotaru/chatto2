socket.on('account', function (e) {
    $("#my-coin").text(number_format(e.coin));
    $("#my-kry").text(number_format(e.kry));

    $("#rank_name").text(e.rank_name);
    $("#rank_text").text(e.rank_text);
    $("header .navbar .user-details .progress div").width(parseInt(e.rank_progress) + "%");


    let rank = "rm" + e.rank;
    if ($(".user-details .rank").attr('class').indexOf(rank) == -1) {
        let m = $(".user-details .rank").attr('class').match(/(rm|rmv)\d+/);
        console.log(m);
        if(m) {
            $(".user-details .rank").removeClass(m[0]);
            $(".user-details .rank").addClass(rank);

            if($(".cong-rank").length){
                $(".cong-rank").show();
                $(".cong-rank .rank").removeClass(m[0]);
                $(".cong-rank .rank").addClass(rank);
            }
            else{
                $(".garage").append(`
                <div class="cong-rank">
                    <div class="rank ${rank}"></div>
                    <div>Поздравляем! Вы получили новое звание!</div>
                    <button class="btn" onclick="alertify_close();$('.cong-rank').hide()">Спасибо!</button>
                </div>
                `);
                $(".modal-overlay").fadeIn(200);
            }
        }
    }

    $(".user-details .rank").on('classChanged', function () {
        console.log('Поздавляем с новым званием!');
    });

    let howmuch = e.howmuch.split("|").map(Number);
    let howmuch_1 = 5 + howmuch[2];
    let howmuch_2 = 100 + howmuch[0] + howmuch[1];
    $(".gear-score .score div:first-child").text(`${howmuch_1}/${howmuch_2}`);
    $(".gear-score .item-name:eq(0) div:last-child").html(`+ ${howmuch[0]} <kry></kry>`);
    $(".gear-score .item-name:eq(1) div:last-child").html(`+ ${howmuch[1]} <kry></kry>`);
    $(".gear-score .item-name:eq(2) div:last-child").html(`+ ${howmuch[2]} опыта`);
    $(".gear-score .item-name:eq(3) div:last-child").html(`+ ${howmuch[3]} ккойна`);

});
socket.on('checkUser', function(e){
    if(e == ME.login) document.location.href = '/logout';
});
socket.on('onlineUsers', function(e){
    $("#onlineNum").text(e);
});

