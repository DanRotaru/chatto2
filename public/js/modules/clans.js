const Clan = {
    id: 0,
    access: 0,
    exit: (i) => {
        if(!i){
            if(Clan.access == 5) alertify_quest(`Вы действительно хотите выйти из клана? Если вы выйдите из клана клан будет без возвратно удалён!`, `Clan.exit(1)`);
            else alertify_quest(`Вы действительно хотите выйти из клана?`, `Clan.exit(1)`);
            return;
        }

        $.post(`/api/clans/${Clan.id}/leave`, function(res){
            if(res.error){
                alertify(res.error, "Ошибка", 2);
            }
            else if(res.success){
                page('clans');
                alertify(res.success, "Успех", 1);
            }
        });
        
    },
    donate: (i) => {
        if(!i){
            alertify(`<div class="font-13 mtn-20 text-left">Сколько кристаллов вы хотите пожертвовать клану?</div> <input id="donation-input" class="input" type="number" placeholder="От 1000">`, 'Пожертвование', 0, `<div class="flex between mtn-20 gap-10 w-full p-0-10"><button class="btn w-full" onclick="alertify_close()">Отменить</button><button class="btn green" onclick="Clan.donate(1)">Пожертвовать</button></div>`);
            return;
        }
        let amount = $("#donation-input").val();
        if(amount < 1000 || isNaN(amount)){
            alertify("Минимальное пожертвование: 1000 кристаллов!", "Ошибка", 2);
            return;
        }
        else if(amount > 100000){
            alertify("Максимальное разовое пожертвование составляет: 100 000 кристаллов!", "Ошибка", 2);
            return;
        }
        $.post(`/api/clans/${Clan.id}/${amount}/donate`, function(res){
            if(res.error){
                alertify(res.error, "Ошибка", 2);
            }
            else if(res.success){
                let current = parseInt($(".clan-kry").text().replace(' ', ''));
                current += parseInt(amount);
                $(".clan-kry").text(number_format(current));
                alertify(res.success, "Успех", 1);
            }
            $("#donation-input").val("");
        });
        
    }, 
    sendRequest: () => {
        $("#clan-action").off("click");
        $.post(`/api/clans/${Clan.id}/request`, function(res){
            if(res.error){
                alertify(res.error, "Ошибка", 2);
            }
            else if(res.success){
                alertify("Вы успешно подали заявку в клан!", "Успех", 1);
                $("#clan-action").text("Заявка отправлена").attr("disabled", "disabled");
            }
        });
    },
    getRequests: () => {

    },
    changeRequest: (id, login) => {
        $.post(`/api/clans/${Clan.id}/${id}/${login}/request`, function(res){
            if(res.error){
                alertify(res.error, "Ошибка", 2);
            }
            else if(res.success){
                if(id == 1) {
                    $("#clanRequest-"+login).remove();
                    alertify(`Вы успешно приняли пользователя ${login} в клан!`, "Успех", 1);
                    clan(Clan.id);
                }
                else {
                    $("#clanRequest-"+login).remove();
                    let n = parseInt($(`#oneclan-nav a[data-id="2"]`).text().replace('Заявки (', '').replace(')', ''));
                    n--;
                    $(`#oneclan-nav a[data-id="2"]`).text(`Заявки (${n})`);
                }
            }
        });
    },
    changeRank: (id, login) => {
        $.post(`/api/clans/${Clan.id}/${login}/${id}/clan-rank`, function(res){
            if(res.error){
                alertify(res.error, "Ошибка", 2);
            }
            else if(res.success){
                let s = res.success.split("|");
                if(s[0] == "Кик"){
                    $(`#clan-usersIn-${login}`).remove();
                    let current = $("#clan-users").text();
                }
                else{
                    let rank;
                    if(s[0] == 0) rank = "Рядовой";
                    else if(s[0] == 1) rank = "Офицер";
                    else if(s[0] == 2) rank = "Сержант";
                    else if(s[0] == 3) rank = "Ветеран";
                    else if(s[0] == 4) rank = "Командир";
                    // clan-usersIn-user
                    let rank1 = s[0] == 0 ? rank = "Рядового" : rank + "a";
                    s[1] = s[1].replace(`<<${s[0]}>>`, rank1);
                    $(`#clan-usersIn-${login} td:nth-child(2)`).text(rank);
                    
                    if(s[0] == 0) $(`#clan-usersIn-${login} td:last-child .text-danger`).text("Кикнуть");
                    else $(`#clan-usersIn-${login} td:last-child .text-danger`).text("Понизить");
                    
                    if(s[0] >= 4 || (Clan.access == 4 && s[0] >= 3)) $(`#clan-usersIn-${login} td:last-child .text-success`).attr("disabled", "disabled")
                    else $(`#clan-usersIn-${login} td:last-child .text-success`).removeAttr("disabled");
                }
                alertify(s[1], "Успех", 1);
            }
        });
    },
    getClan: (id) => {
        $.get(`/api/clans/${id}/getclan`, function(res){

            if(res.error){
                alertify(res.error, "Ошибка!", 2);
                return;
            }

            Clan.id = res.clanId;
            Clan.access = res.access;
            let imgCache = 'https://awpbajxiyo.cloudimg.io/height/200/n/';
            $("#oneclan .clan-info .clan-title").text(res.name);
            $("#oneclan .clan-info #clan-teg b").text("["+res.teg+"]");
            $("#oneclan .clan-info #clan-date").text("Создан: " + res.date);
            $("#oneclan .clan-info #clan-users").text("Игроки: " + res.users.length + "/" + res.maxUsers);
            $("#oneclan .clan-info .clan-messages").text(res.messages);
            let by = res.by.split("|");
            $("#oneclan .clan-info .clan-by a").html(`<i class="rank r${by[0]}"></i>${by[1]}`).attr("onclick", `profile('${by[1]}', '${by[0]}')`);
            $("#oneclan .clan-info .clan-kry").text(number_format(res.kry));
            $("#oneclan .clan-info .clan-bans").text(res.violations);
            $("#oneclan .clan-info .description").html(res.description);
            $("#oneclan .clan-info .clan-logo").attr("src", imgCache + res.logo);
            
            $("#clans").addClass("hidden");
            $("#oneclan").removeClass("hidden");
    
            if(res.in_clan == 1) $("#clan-action").text("Покинуть клан").removeAttr("disabled").attr("onclick", "Clan.exit()");
            else {
                if(res.myRequest) $("#clan-action").text("Заявка отправлена").attr("disabled", "disabled");
                else $("#clan-action").text("Подать заявку").removeAttr("disabled").attr("onclick", "Clan.sendRequest()");
            }


            let action = '';
            if(res.access > 3){
                $("#clan-usersAction").removeClass("hidden");
                $("#oneclan-nav").removeClass("hidden");
                $(`#oneclan-nav a[data-id="2"]`).click(() => {
                    $("#table-clanUsers").addClass("hidden");
                    $("#table-clanRequests").removeClass("hidden");
                    $(`#oneclan-nav a`).removeClass("active");
                    $(`#oneclan-nav a[data-id="2"]`).addClass("active");
                });
                $(`#oneclan-nav a[data-id="1"]`).click(() => {
                    $("#table-clanRequests").addClass("hidden");
                    $("#table-clanUsers").removeClass("hidden");
                    $(`#oneclan-nav a`).removeClass("active");
                    $(`#oneclan-nav a[data-id="1"]`).addClass("active");
                });
                let requestsData = '';
                let requestsNum = 0;
                if(res.requests){
                    requestsNum = res.requests.length;
                    for (let request of res.requests) {
                        let u = request.login.split("|");
                        let rank = `<i class="rank r${u[0]}"></i>`;
                        requestsData += `
                        <tr id="clanRequest-${u[1]}">
                            <td>
                                <a class="user" onclick="profile('${u[1]}', '${u[0]}')">${rank} ${u[1]}</a>
                            </td>
                        <td>${request.date}</td>
                        <td class="flex gap-10">
                            <button class="btn btn-sm text-success" onclick="Clan.changeRequest(1, '${u[1]}')">Принять</button>
                            <button class="btn btn-sm text-danger" onclick="Clan.changeRequest(2, '${u[1]}')">Отклонить</button>
                        </td>
                        </tr>
                        `;
                    }
                    $("#table-clanRequests tbody").html(requestsData);
                }
                $(`#oneclan-nav a[data-id="2"]`).text(`Заявки (${requestsNum})`);
            }
    
            $("#clan-donation").attr("onclick", "Clan.donate()");
    
            let data = '';
            for (const user of res.users) {
                let u = user.login.split("|");
                let rank = `<i class="rank r${u[0]}"></i>`;

                let action = '';
                if(res.access > 3){
                    let action_text = 'Кикнуть';
                    if(user.group > 0) action_text = 'Понизить';

                    let preaction = '';
                    if(user.group >= 4 || (res.access == 4 && user.group >= 3)) preaction = `disabled="disabled" `;

                    action = `
                    <td class="flex gap-10">
                        <button ${preaction}class="btn btn-sm text-success" onclick="Clan.changeRank(1, '${u[1]}')">Повысить</button>
                        <button class="btn btn-sm text-danger" onclick="Clan.changeRank(2, '${u[1]}')">${action_text}</button>
                    </td>
                    `;

                    if(ME.login == u[1]) action = '<td></td>';
                }
    
                let group = user.group;
                if(!group || group == 0) group = "Рядовой";
                else if(group == 1) group = "Офицер";
                else if(group == 2) group = "Сержант";
                else if(group == 3) group = "Ветеран";
                else if(group == 4) group = "Командир";
                else if(group == 5) group = "Главнокомандующий";
                data += `
                <tr id="clan-usersIn-${u[1]}">
                    <td>
                        <a class="user" onclick="profile('${u[1]}', '${u[0]}')">${rank} ${u[1]}</a>
                    </td>
                    <td>${group}</td>
                    <td>${number_format(user.earned)} <kry></kry></td>
                    <td>${user.lastAuth}</td>
                    <td>${user.lastAuth}</td>
                    ${action}
                </tr>
                `;
            }
            $("#table-clanUsers tbody").html(data);
            page('clansOne');
        });
    }
}

const clan = id => {
    Clan.getClan(id);
}