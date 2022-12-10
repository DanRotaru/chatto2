// $(".loto-users-list.green .bank div").html(123)
function lotteryPage(id){
    page('lottery', function(){
        clearInterval(countdown_interval);
        $(".lottery .timer").addClass("hidden");
        socket.emit('getLottery', id);
        $("#loto-nav a").removeClass("active");
        $(`#loto-nav a[data-id="${id}"]`).addClass("active");
    });
}

socket.on('lottery', function (e) {
    if(!$("#page-lottery").is(":visible")) return;
    if(e.error){
        alertify(e.error, "Ошибка!", 2);
        return;
    }
    else if(e.success){
        let amount = Number($(`#loto-input`).val());
        let type = lottery.type;
        if(type == 1) type = 'Зелёный';
        else if(type == 2) type = 'Красный';
        else if(type == 3) type = 'Синий';

        alertify(`Вы успешно поставили ${number_format(amount)} кристаллов на ${type}`, "Успех!", 1);
        $(`#loto-input`).val("");
    }
    if(e.roomId){
        lottery.room = e.roomId;
        $(`.wheel .list li.green span[data-id="green"], .loto-users-list.green .bank div`).html(number_format(e.bank_green) + " <kry></kry>");
        $(`.wheel .list li.red span[data-id="red"], .loto-users-list.red .bank div`).html(number_format(e.bank_red) + " <kry></kry>");
        $(`.wheel .list li.blue span[data-id="blue"], .loto-users-list.blue .bank div`).html(number_format(e.bank_blue) + " <kry></kry>");
        $("#lottery_bank").text(number_format(e.current_bank));
        $("#lottery_totalbank").text(number_format(e.bank));
        $("#lottery_number").text(number_format(e.number));
        

        if(e.started == 1){
            let date = Math.floor((new Date(e.end).getTime() - Date.now()) / 1000);
            $(".lottery .timer").removeClass("hidden");
            countdown(date, (e) => $(".lottery .timer").text(e), () => $(".lottery .timer").addClass("hidden"));
        }

        $(`#loto-input`).attr("placeholder", `Минимальная ставка: ${number_format(e.min)} кристаллов`);

        let users_green = '';
        let users_red = '';
        let users_blue = '';
        
        for(let u of e.users){
            let data = `
            <tr>
                <td>
                    <div class="rank r${u.rank}"></div>
                    <span onclick="profile('${u.login}', '${u.rank}')" class="user">${u.login}</span>
                </td>
                <td>${number_format(u.kry)} <kry></kry></td>
            </tr>`;
            if(u.type == 1) users_green += data;
            else if(u.type == 2) users_red += data;
            else if(u.type == 3) users_blue += data;
        }
        $("#lottery-table-green tbody").html(users_green);
        $("#lottery-table-red tbody").html(users_red);
        $("#lottery-table-blue tbody").html(users_blue);
    }
    console.log(e);
});

socket.on('lotteryStarted', (date) => {
    date = Math.floor((new Date(date).getTime() - Date.now()) / 1000);
    $(".lottery .timer").removeClass("hidden");
    countdown(date, (e) => $(".lottery .timer").text(e), () => $(".lottery .timer").addClass("hidden"));
    console.log(date);
});

socket.on('lotteryEnd', (room) => {
    $(`.wheel .list li span, .loto-users-list .bank div`).html("0 <kry></kry>");
    $("#lottery_bank").text(0);
    $(".loto-users-wrapper table tbody").empty();
    $('.window').css("right", "0");
});
socket.on('lotteryWheel', (type) => {
    spin(type);
    console.log("Wins: "+type);
})

const lottery = {
    room: 1,
    type: 1,
}

function lotteryGo(id){
    let amount = Number($("#loto-input").val());
    if(amount <= 0) return;
    if(id <= 0 || id > 3) return;
    lottery.type = id;
    
    socket.emit("lottery", {
        room: lottery.room,
        type: id,
        kry: amount
    });
}
$(document).ready(function() {
    for (i = 0; i < 5; i++) {
        $(".list li").clone().appendTo(".list");
    }
});
function spin(id) {
    $('.window').css({
        right: "0"
    })
    // $('.list li').css({
    //     border: '4px solid transparent'
    // })

    // $('.list li:eq(' + x + ')').css({
    //     border: '4px solid #7eca3f',
    //     "border-radius": '10px'
    // })

    // border: 4px solid #7eca3f;
    // border-radius: 10px;

    let r = 0;
    if(id == 1) r = 2380;
    else if(id == 2) r = 2520;
    else if(id == 3) r = 2660;
    r += 0.4;
    $('.window').animate({
        // right: (x * 130) + (x * 96)
        right: r
    }, 2000);
}