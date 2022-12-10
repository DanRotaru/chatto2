	
const CHATTO_smiles = [
    ":)&01.png",
    ":-)&08.png",
    ";)&02.png",
    ":(&03.png",
    "=)&09.png",
    "=|&04.png",
    ":P:&05.png",
    ":xD:&lol.png",
    ":xd:&lol.png",
    "=/&07.png",
    ":cool:&cool.png",
    ":good:&good.png",
    ":O_o&06.png",
    ":sleep:&sleep.png",
    "\\__\\&10.png",
    "\\___\\&11.png",
    ":like:&like.png",
    ":dislike:&dislike.png",
    ":power:&power.png",
    ":hey:&hey.png",
    ":lol:&lol.png",
    ":love:&heart.png",
    ":flower:&flower.png",
    ":facepalm:&facepalm.png",
    ":mm:&mm.png",
    ":bravo:&bravo.png",
    ":fire:&fire.png",
    ":hearteyes:&hearteyes.png",
    ":hm:&hm.png",
    ":moon:&moon.png",
    ":kiss:&kiss.png",
    ":please:&please.png",
    ":rainbow:&rainbow.png",
    ":okey:&okey.png",
    ":crying:&crying.png",
    ":angel:&angel.png",
    ":repost:&repost.png",
    ":bee:&bee.png",
    ":1st:&1st.png",
    ":2rd:&2rd.png",
    ":3rd:&3rd.png",
    ":ghost:&ghost.png",
    ":koko:&koko.png",
    ":mouse:&mouse.png",
    ":money:&money.png",
    ":vs:&vs.png",
    ":up:&up.png",
    ":down:&down.png",
    ":left:&left.png",
    ":right:&right.png",
    ":nowords:&nowords.png",
    ":sun:&sun.png",
    ":stars:&stars.png",
    ":eyes:&eyes.png",
    ":ura:&ura.png",
    ":ops:&ops.png",
    ":rock:&rock.png",
    ":sos:&sos.png",
    ":mobile:&mob1.png",
    ":omg:&omg.png",
    ":bell:&bell.png",
    ":bheart:&bheart.png",
    ":brheart:&brheart.png",
    ":hmm:&hmm.png",
    ":hstop:&hstop.png",
    ":hz:&hz.png",
    ":uraa:&uraa.png",
    ":uuu:&uuu.png",
    ":tired:&tired.png",
    ":heh:&heh.png",
    ":sad:&sad.png",
    ":wow:&wow.png",
    ":drunk:&drunk.png",
    ":yee:&yee.png",
    ":moneyy:&moneyy.png",
    ":think:&think.png",
    ":funny:&funny.png",
    ":stone:&stone.png",
    ":eyy:&eyy.png",
    ":pin:&pin.png",
    ":boom:&boom.png",
    ":100:&100.png",
    ":00:&05.gif",
    ":01:&02.gif",
    ":02:&03.gif",
    ":03:&04.gif",
];

const CHATTO_COMMANDS = [
    "#rules&Правила&rules()",
    "#smiles&Смайлы&smiles()",
    "#help&Помощь&help()",
    "#vk&Наша группа вк&window.open('https://vk.com/chatto_ru','_blank')",
    "#shop&Магазин&shop()",
    "#rub&Покупка РУБ&donat.window()",
    "#donat&Покупка РУБ&donat.window()",
    "#settings&Настройки&window_settings()",
    "#updates&Обновления&updates()",
    "#online&Онлайн&online()",
    "#admins&Администрация&load_page(9,0)",
    "#lottery&Лотерея&LotoL()",
    "#loto&Лотерея&LotoL()",
    "#news&Новости&cChat(1)",
    "#friends&Друзья&friends()",
    "#clans&Кланы&getclans()",
    "#fullscreen&Войти в полноэкранный режим&toggleFullScreen()",
    "#ranks&Таблица званий&load_page(12,0)",
    "#звания&Таблица званий&load_page(12,0)",
    "#ads&Реклама&load_page(15,1)",
    "#chatscreensize&Разрешение экрана&load_page(13,0)",
    "#other&Прочее&load_page(4,0)",
    "#youtube&YouTube&load_page(14,0)",
    "#ratings&Рейтинги&window.open('/ratings','_blank')",
    "#challenges&Челлендж&tasks_challenges()",
    "#uchallenges&Игроки в челлендже&p_challenges()",
    "#tasks&Задания&window_tasks()",
    "#tournaments&Еженедельные турниры&tasks_tournaments()",
    "#chatto_donations&Пожертвования&window.open('/donations','_blank')",
    "#crazyweekend&Безумные выходные&window.open('/crazyweekend','_blank')",
    "#exit&Выйти&game_exit()",
    "#appapk&Приложение для андроид&document.location.href='/chatto.apk'",
    "#вshop&Магазине&shop()",
    "#вadmins&Администрацию&load_page(9,0)",
    "@Ник&Профиль пользователя&profile('chatto.ru')",
    "@@Ник&Профиль пользователя&profile('chatto.ru')",
];
const CHATTO_COMMANDS1 = [
    "/rules&Открыть правила",
    "/smiles&Открыть смайлы",
    "/u логин&Просмотр профиля пользователя",
    "/g логин&Просмотр гараж пользователя",
    "/ignore логин&Игнорирование пользователя",
    "/promocode&Открыть окно создание промокодов",
    "/transfer логин кри&Перевод кристаллов",
    "/trsf логин кри&Перевод кристаллов",
    "/time&Показать текущее время чата",
    "/howmuch логин&Узнать сколько зарабатывает пользователь за сообщение",
    "/paint имя&Быстрый поиск по краскам в гараже",
    "/vibrate значение&Включить вибрацию когда поступают новые смс (работает только в приложении), в качестве второго параметра указывайте 1 или 0 (вкл. или откл.)",
    "/blackbg&Делает фон чата чёрным",
    "/video link&Создать ссылку для просмотра видео",
    "/iFrame link&Создать ссылку для просмотра внешних ссылок в чате",
    "/uchallenges&Открыть список игроков с челленджа",
    "/showgarage&Показать viewer гаража в независимости скрыт ли он в настройках или нет",
    "/msvol значение&Изменить громкость песен в чате, в качестве второго параметра указывайте громкость (от 0 до 100) (в процентах)"
];

for(let smile of CHATTO_smiles){
    let sm = smile.split("&");
    $(".smiles__wrapper").append(`<button class="btn" title="${sm[0]}" onclick="chat.aText('${sm[0]}')"><img src="../assets/smiles/${sm[1]}" loading="lazy"></button>`)
}

const chat = {
    loaded: false,
    aText: function(text){
        if(ME.settings.smilesclose) $(".smiles").toggleClass("shown");
        $("#text").val($("#text").val() + text);
    },
    send: function(){
        let text = $("#text").val();
        if(!text) return false;
        let upperCaseFirst = 0;
        if(ME.upperCase == 1) upperCaseFirst = 1;

        (msg => {
            const toLoginRegExp = /^([a-zA-ZА-ЯЁё0-9_\-.]{1,30}); (.*)/gi;
            const toLoginPrvtRegExp = /^([a-zA-ZА-ЯЁё0-9_\-.]{1,30}): (.*)/gi;
    
            if (toLoginRegExp.test(msg)) {
                let tologin = msg.split(';');
                if(tologin !== "SERIAL") text = '/to ' + tologin[0] + ' ' + msg.replace(tologin[0] + '; ', '');
            }
            else if (toLoginPrvtRegExp.test(msg)) {
                let tologin = msg.split(':');
                if(tologin !== "SERIAL") text = '/pm ' + tologin[0] + ' ' + msg.replace(tologin[0] + ': ', '');
            }
        })(text);

        if(upperCaseFirst){
            let str = text.split(' ');
            if (str[0] == '/pm' || str[0] == '/to') {
                let str = text.split(' ');
                let textWithoutLogin = text.replace(str[0] + ' ' + str[1] + ' ', '');
                if(!(textWithoutLogin[0] == "h" && textWithoutLogin[1] == "t" && textWithoutLogin[2] == "t" && textWithoutLogin[3] == "p") && typeof textWithoutLogin[0] !== 'undefined'){
                    text = str[0] + ' ' + str[1] + ' ' + textWithoutLogin[0].toString().toUpperCase() + textWithoutLogin.slice(1);
                }
            } else {
                if(!(text[0] == "h" && text[1] == "t" && text[2] == "t" && text[3] == "p")){
                    text = text[0].toString().toUpperCase() + text.slice(1);
                }
            }
        }

        let how = "";
        if(text.toString().search("/to ") !== -1){
            mylastnickname = text.toString().replace("/to ","")
            mylastnickname = mylastnickname.split(" ")[0];
            how = "/to ";
        }else if(text.toString().search("/pm ") !== -1){
            mylastnickname = text.toString().replace("/pm ","")
            mylastnickname = mylastnickname.split(" ")[0];
            how = "/pm ";
        }
        else mylastnickname = '';

        writeTo = '';
        if(mylastnickname !== ''){
            writeTo = how + mylastnickname + " ";
        }
        else writeTo = '';
        mylastnickname = '';
        lastmsg = text;
        $("#text").val(writeTo);

        if(ME.settings.uppercase) {
            if(!(text[0] == "h" && text[1] == "t" && text[2] == "t" && text[3] == "p")){
				text = text[0].toString().toUpperCase() + text.slice(1);
			}
        }

        socket.emit('ChatMsg', text);
    },
    ask: function(data, type){
        let id = + new Date();
        $("#chat_messages").prepend(`
        <msg by="sys" id="msg-sys-${id}">
            <text>${data}</text>
        </msg>
        `);
    
        let timeout = 5000;
        if(type == 2) timeout = 5000; 
        else if(type == 3) timeout = 1000; 
        else if(type == 4) timeout = 20000;
        setTimeout(() => $(`#msg-sys-${id}`).remove(), timeout);
    },

    emojitext: function(data){
        let smiles_len = CHATTO_smiles.length;
        for (let i = 0; i < smiles_len; i++) {
            let j = CHATTO_smiles[i].split("&");
            j[0] = j[0].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            let re = new RegExp(j[0], "g");
            data = data.replace(re, ` <img src="../assets/smiles/${j[1]}" title="${j[0]}"/> `);
        }
        return data;
    },

    process: function(data){
        // Rank with profile action
        data = data.replace(/{:rank(.*?)=(.*?):}/g, ' <i class="rank r$1$2" onclick="profile(\'$3\', \'$1$2\')"></i> ');
        // Rank
        data = data.replace(/{:rank(.*?):}/g, ' <i class="rank r$1"></i> ');
        // Banned user
        data = data.replace(/{:cUban=(.*?)=(.*?)=(.*?)=(.*?):}/, 'Пользователь {:c-u$1=$2:} лишен права выхода в эфир $3. Причина: $4, см. #rules ');
        // Buy
        data = data.replace(/{:cBuy=(.*?)=(.*?)=(.*?)=(.*?):}/, 'Пользователь {:c-u$1=$2:} купил $3 <y>$4</y>');
        data = data.replace(/{:cBuy=(.*?)=(.*?)=(.*?):}/, 'Пользователь {:c-u$1=$2:} купил <y>$3</y>');
        data = data.replace(/{:cBuyS=(.*?)=(.*?)=(.*?):}/, 'Пользователь {:c-u$1=$2:} <a onclick="page(\'shop\')">купил</a> <y>$3</y>');
        
        // Loto
        data = data.replace(/{:cLoto=(.*?)=(.*?)=(.*?)=(.*?)-(.*?):}/, 'Пользователь {:c-u$1=$2:} поставил <y>$3</y> <kry></kry> на <a onclick="lotteryPage($4)">$5</a>');
        data = data.replace(/{:cLotoE=(.*?)=(.*?)=(.*?)=(.*?)=(.*?):}/, '<a onclick="page(\'lottery\')">Лотерея</a> завершена, счастливое число: $1 (<b>$2</b>). Победителей: $3, каждый получает по <y>$4</y> <kry></kry><div class="users-msg">$5</div>');
        data = data.replace(/{:cLotoE1=(.*?)=(.*?)=(.*?)=(.*?)=(.*?):}/, '<a onclick="page(\'lottery\')">Лотерея</a> завершена, счастливое число: $1 (<b>$2</b>). Победитель: $3, он получает <y>$4</y> <kry></kry><div class="users-msg">$5</div>');
        // data = data.replace(/{:cLotoE1=(.*?)=(.*?)=(.*?)=(.*?)=(.*?):}/, 'Пользователь $5 получает <y>$4</y> <kry></kry><br><a onclick="page(\'lottery\')">Лотерея</a> завершена, счастливое число: $1 (<b>$2</b>). Победитель: $3');
        data = data.replace(/{:cLotoE=(.*?)=(.*?):}/, '<a onclick="page(\'lottery\')">Лотерея</a> завершена, счастливое число: $1 (<b>$2</b>). Победителей нет.');

        // Tasks
        data = data.replace(/{:cTask=(.*?)=(.*?)=(.*?)=(.*?):}/, 'Пользователь {:c-u$1=$2:} выполнил ежедневное задание <b>«$3»</b> и получил <y>$4</y>');

        //Gift
        data = data.replace(/{:cGiftSend=(.*?)=(.*?)=(.*?)=(.*?)=(.*?):}/, 'Пользователь {:c-u$1=$2:} отправил подарок <y>«$5»</y> пользователю {:c-u$3=$4:}');
        
        // Clans
        data = data.replace(/{:cClanBuy=(.*?)=(.*?)=(.*?)=(.*?):}/, 'Пользователь {:c-u$1=$2:} создал клан <a onclick="clan($5)">$3</a>');
        data = data.replace(/{:cClanDonate=(.*?)=(.*?)=(.*?)=(.*?)=(.*?):}/, 'Пользователь {:c-u$1=$2:} пожертвовал <y>$3</y> :kry: клану <a onclick="clan($5)">$4</a>');
        data = data.replace(/{:cClanRemove=(.*?)=(.*?)=(.*?):}/, 'Пользователь {:c-u$1=$2:} удалил клан <y>$3</y>');
        
        // Gold
        data = data.replace(/{:chatto-gold-soon=(.*?)=(.*?):}/g, '<div class="chatto-gold soon"> <div> <div class="gold-user"> <i class="rank r$1" onclick="profile(\'$2\')"></i> <user>$2</user></div> Сбросил золотой ящик! </div> </div>');
        
        data = data.replace(/{:chatto-gold-soon:}/g, '<div class="chatto-gold soon">Скоро будет сброшен золотой ящик!</div>');
        data = data.replace(/{:chatto-ugold-soon:}/g, '<div class="chatto-gold soon ultra">Скоро будет сброшен УЛЬТРА-ГОЛД!</div>');
        data = data.replace(/{:chatto-gold=(.*?)=(.*?)=(.*?):}/g, `<div class="chatto-gold"><div> <div class="gold-user"> <i class="rank r$1" onclick="profile(\'$2\')"></i> <user>$2</user></div> Поймал золотой ящик и получил $3 <kry></kry> </div></div>`);
        data = data.replace(/{:chatto-ugold=(.*?)=(.*?)=(.*?):}/g, `<div class="chatto-gold"><div> <div class="gold-user"> <i class="rank r$1" onclick="profile(\'$2\')"></i> <user>$2</user></div> Поймал УЛЬТРА-ГОЛД и получил $3 <kry></kry> </div></div>`);

        // User
        data = data.replace(/{:c-user=(.*?):}/g, '<user ondblclick="profile(\'$1\')">$1</user>');
        data = data.replace(/{:c-u(.*?)=(.*?):}/g, '<user><i class="rank r$1" onclick="profile(\'$2\', \'$1\')"></i>$2</user>');

        //Container
        data = data.replace(/{:cCont=(.*?)=(.*?)=(.*?)=(.*?):}/, 'Пользователь <user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user> открыл <b>«$3»</b> и получил <y>$4</y>');

        // External link
        data = data.replace(/\{:c-y=(.*?)\:}/g, '<span class="yellow">$1</span>');
        data = data.replace(/\{:c-o=(.*?)\:}/g, "<a onclick=\"openlink('$1')\" title=\"Переход по внешней ссылке\">$1</a>");

        data = data.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a onclick="openlink(\'$1\')">$1</a> ');
        data = data.replace(/#rules/, '<a onclick="rules()">Правила</a>');


        // Smiles
        data = this.emojitext(data);
        data = data.replace(/:kry:/, '<kry></kry>');
        return data;
    },

    firstLoad: true,
    add: function(msgs){
        // console.log(msgs);
        if(msgs.error){
            msgs.error = chat.process(msgs.error);
            chat.ask(msgs.error);
            return false;
        }
        for(let msg of msgs){
            let id = msg._id;

            if($(`#msg${id}`).length) continue;

            let res;
            let username = msg.login;
            let text = chat.process(msg.text);
            let user_msg = msg.user_msg;
            let rank = msg.user_rank;
            let rank1 = msg.user1_rank;
            let vip = msg.user_vip;
            if(vip > 0) rank = 'v'+rank;
            let time = new Date(msg.time);
            let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
            let m = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
            time = h + ':' + m;

            let tologin = msg.tologin;
            let tologinClass = '';
            if(tologin) tologinClass = ' class="tologin"';
            if(tologin == ME.login) tologinClass = ' class="tologin to"';
            if(msg.pm == 1) tologinClass = ' class="tologin pm"';
            let group = msg.group, groupText = '';
            if(group == '4') groupText = `<span class="group-icon icon-helper" tooltip="Кандидат" flow="right"></span>`;
            else if(group == '3') groupText = `<span class="group-icon icon-adminb" tooltip="Администратор/создатель/разработчик чата" flow="right"></span>`;
            else if(group == '2') groupText = `<span class="group-icon icon-moderator" tooltip="Модератор чата" flow="right"></span>`;
            
            let hisclan = '';
            if(msg.clan){
                let clan = msg.clan.split("|");
                hisclan = `<span class="name" onclick="clan(${clan[0]})">[${clan[1]}]</span> `;
            }
            


            let groupFunction = '';
            if(ME.group > 1){
                groupFunction = `
                    <div class="icon-remove" tooltip="Отправлено в ${time}" flow="right" onclick="chat.del(${id})"></div>
                `;
                if(username !== 'sys')
                    groupFunction += `<div class="icon-ban" tooltip="Забанить ${username} на 5 минут за флуд" flow="right" onclick="chat.ban('${username}',5,'1.1');"></div>`;
            }

            if(tologin){
                res = `
                <msg by="${username}" id="msg${id}"${tologinClass}>
                    ${groupFunction}
                    <i class="rank r${rank}" onclick="profile('${username}', '${rank}')"></i>
                    <span class="name" onclick="profile('${username}', '${rank}')">${username} (${user_msg})</span>
                    <span class="devider"> — </span>
                    <i class="rank r${rank1}" onclick="profile('${tologin}', '${rank}')"></i>
                    <span class="name" onclick="profile('${tologin}',10,0)">${tologin}</span>
                    <text>${text}</text>
                </msg>
                `;
            }
            else{
                res = `
                <msg by="${username}" id="msg${id}">
                    ${groupFunction}
                    <i class="rank r${rank}" onclick="profile('${username}', '${rank}')"></i>${groupText}${hisclan}
                    <span class="name" onclick="profile('${username}', '${rank}')">${username} (${user_msg})</span>
                    <text>${text}</text>
                </msg>
                `;
                // tologin('${username}')
                // <span onclick="pm('${username}')" class="name pm">[PM]</span>
            }

            if(msg.group == 9){ //sys
                res = `
                <msg by="${username}" id="msg${id}">
                    ${groupFunction}
                    <text>${text}</text>
                </msg>
                `;
            }

            if(chat.firstLoad) $("#chat_messages").append(res);
            else $("#chat_messages").prepend(res);

            if($("#chat_messages msg").length > 50) $("#chat_messages msg:last")[0].remove();
            chat.loaded = true;
        }
        if(chat.firstLoad) chat.firstLoad = false;
        autoIgnore();
    },
    del: function(id){
        if(ME.group < 2) alertify('Нет доступа!');
        else socket.emit('ChatMsgDel', id);
    },
    ban: function(login, time, reason){
        if(ME.group < 2) alertify('Нет доступа!');
        else socket.emit('ChatMsg', `/ban ${login} ${time} ${reason}`);
    }
}

// Load all messages
socket.on('ChatMsg', function(msgs){
    chat.add(msgs);
});

socket.on('ChatMsgDel', function(e){
    console.log("ChatMsgDel:", e);
    if(e) {
        if(e.login == false){
            if(e.id == 'all') $("msg").remove();
            else $(`#msg${e.id}`).remove();
        }
        else $(`msg[by="${e.login}"]`).remove();
    }
});
socket.on('ChatMsgSys', function(e){
    console.log("ChatMsgSys:", e);
    if(e) chat.ask(e.message, 5);
});

// Send message on key Enter
$("#text").on('keyup', (e) => {if (e.key === 'Enter' || e.keyCode === 13) chat.send()});
$("#chat-send").click(chat.send);

function tologin(login) {
    login = login.toString();
    login = login.replace(/(<s>|<\/s>)/g, '');

    var txtv = $('#text').val();
	var tolog = txtv.split(" ");

    if (tolog[0] == "/to") {
        if (tolog[1] !== login) {
			let txt = txtv.replace('/to ' + tolog[1] + ' ', '');
            txt = '/to ' + login + ' ' + txt;
            $('#text').val(txt);
        } else {
            $('#text').val($('#text').val());
        }
    } else if (tolog[0] == "/pm") {
        if (tolog[1] !== login) {
			let txt = txtv.replace('/pm ' + tolog[1] + ' ', '');
            txt = '/to ' + login + ' ' + txt;
            $('#text').val(txt);
        } else {
            let txt = txtv.replace('/pm ' + login + ' ', '');
            txt = '/to ' + login + ' ' + txt;
            $('#text').val(txt);
        }
    } else {
        $('#text').val("/to " + login + " " + $('#text').val());
    }

    $("#text").focus();
}

function pm(login) {
    login = login.toString();
    login = login.replace(/(<s>|<\/s>)/g, '');

    var txtv = $('#text').val();
    var tolog = txtv.split(" ");
    if (tolog[0] == "/pm") {
        if (tolog[1] !== login) {
			let txt = txtv.replace('/pm ' + tolog[1] + ' ', '');
            txt = '/pm ' + login + ' ' + txt;
            $('#text').val(txt);
        } else {
            $('#text').val($('#text').val());
        }
    } else if (tolog[0] == "/to") {
        if (tolog[1] !== login) {
			let txt = txtv.replace('/to ' + tolog[1] + ' ', '');
            txt = '/pm ' + login + ' ' + txt;
            $('#text').val(txt);
        } else {
            let txt = txtv.replace('/to ' + login + ' ', '');
            txt = '/pm ' + login + ' ' + txt;
            $('#text').val(txt);
        }
    } else {
        $('#text').val("/pm " + login + " " + $('#text').val());
    }

    $("#text").focus();
}

function to(login) {
	tologin(login);
}
function MyLastMsg() {
	var text = lastmsg;
	$("#text").val(text);
	console.log("My Last msg: " + text);
}

$("#aside-select").on('change', function(){
    let val = $(this).val();
    if(val == "1"){
        $("#aside-news").hide();
        $("#aside-chat").show();
    }
    else{
        $("#aside-chat").hide();
        $("#aside-news").show();
    }
});


$("#smiles").click(() => {
    $(".smiles").toggleClass("shown");
});