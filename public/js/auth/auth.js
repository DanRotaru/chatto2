function s(i){
    if(i == 1){
        $("#register").hide();
        $("#forget-password").hide();

        $("#authentication").show();
    }
    else if(i == 2){
        $("#authentication").hide();
        $("#forget-password").hide();
        
        $("#register").show();
    }
    else if(i == 3){
        $("#authentication").hide();
        $("#register").hide();
        
        $("#forget-password").show();
    }
}


function authModal(i){
    if(i == undefined || i == 'auth'){
        $("#register").hide();
        $("#forget-password").hide();
        $("#authentication").show();

        $(".nav .nav__item").removeClass("active");
        $(`.nav .nav__item[data-id="auth"]`).addClass("active");
    }
    else if(i == 'restore'){
        $("#authentication").hide();
        $("#register").hide();
        $("#forget-password").show();
    }
    else if(i == 'register'){
        $("#authentication").hide();
        $("#forget-password").hide();
        $("#register").show();

        $(".nav .nav__item").removeClass("active");
        $(`.nav .nav__item[data-id="register"]`).addClass("active");
    }
}

$(".nav .nav__item").click(function(){
    let i = $(this).attr("data-id");
    authModal(i);
})


$("#auth-form > div:nth-child(2) > label > a").click(function(){
    authModal('restore'); 
});

$("#forget-password > div.modal-body > div > div > button:nth-child(2)").click(function(){
    $("#forget-form").submit();
});

$("#forget-password > div.modal-body > div > div > button:nth-child(1), #register > div.modal-footer > div > button").click(function(){
    authModal('auth');
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function statusMsg(s, e, f){
    if(f == undefined){
        $("#register button:first").attr("disabled","disabled");

        if(s == 1){
            $("#wrong-00-1").removeClass("success");
            $("#wrong-00-1").addClass("wrong");
            $("#wrong1").html(e);
        }
        else if(s == 2){
            $("#wrong2").html(e);
        }
        else if(s == 3){
    
        }
        else if(s == 4){
    
        }
        else if(s == 0){
            $("#wrong-00-1").removeClass("wrong");
            $("#wrong-00-1").addClass("success");
            $("#wrong1").html("");
            $("#wrong2").html("");
        }else if(s == 9){
            $("#register button:first").removeAttr("disabled");
        }
    }else{
        $("#forget-password .cancel").attr("disabled","disabled");

        if(s == 1){
            $("#wrong-00-2").removeClass("success");
            $("#wrong-00-2").addClass("wrong");
            $("#wrong3").html(e);
        }else if(s == 2){
            $("#wrong-00-2").removeClass("wrong");
            $("#wrong-00-2").addClass("success");
            $("#wrong3").html("");
            $("#forget-password .cancel").removeAttr("disabled");
        }
    }
    
}

$("#reg_username").on("input", function(e){
    let username = e.currentTarget.value;
    if(/[а-яЁА-ЯЁ]|\s/g.test(username)){
        setTimeout(function(){
            username = username.replace(/[а-яЁА-ЯЁё]|\s/g, '');
            $("#reg_username").val(username);
        },50);
        }

    if(username.length < 4 || username.length > 20){
        statusMsg(1, "Недопустимое кол-во символов");
    }else if(username.length > 10 && /^\d+$/.test(username)){
        statusMsg(1, "Недопустимое имя");
    }else{
        if($("#reg_username").val() !== undefined || $("#reg_username").val() !== '' || $("#reg_username").val().length > 4){
            $.ajax({
                type: "POST",
                url: "/auth/name",
                data: "login="+$("#reg_username").val(),
                success: function (res) {
                    $("#auth-btn").html(`Войти`);
                    $("#auth-btn").prop("disabled", false);

                    if(res.success) statusMsg(0);
                    else statusMsg(1, res.error);
                }
            });
        }
    }
});

$("#reg_password2").on("input", function(e){
    let password = $("#reg_password").val();
    let password2 = $("#reg_password2").val();

    if(password !== password2){
        statusMsg(2, "Пароли не совпадают");
    }else{
        statusMsg(0);
        statusMsg(9);
    }
});

function resetCaptcha(){
    
}


$("#auth-form").submit(function (e){
    e.preventDefault();
    let username = e.currentTarget[0].value;
    let password = e.currentTarget[1].value;

    $("#auth-btn").html(`<span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"><path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="0.75s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform></path></svg> Войти</span>`);
    $("#auth-btn").prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "/auth/auth",
        data: "login="+username+"&password="+password,
        success: function (res) {
            $("#auth-btn").html(`Войти`);
            $("#auth-btn").prop("disabled", false);

            if(res.success){
                let redirectlink = '/';
                // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) redirectlink = "/mobile";
                // else redirectlink = "/";
                document.location.href = redirectlink;
            }
            else Swal.fire('Ошибка!', res.error, 'error');
        },
        error: function(){
            $("#auth-btn").html(`Войти`);
            $("#auth-btn").prop("disabled", false);
            Swal.fire('Ошибка!', 'Сервер не отвечает.', 'error');
        }
    });
});


$("#reg-form").submit(function (e){ 
    e.preventDefault();
    let username = e.currentTarget[0].value;
    let password = e.currentTarget[1].value;
    let password1 = e.currentTarget[2].value;
    let ref = $("#ref").val();
    
    $("#reg-btn").html(`<span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"><path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="0.75s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform></path></svg> Регистрация</span>`);
    $("#reg-btn").prop("disabled", true);

    if(password !== password1){
        statusMsg(2, "Пароли не совпадают");
        return false;
    }

    // "&password2="+password1+"&ref="+ref+"&recaptcha_response="+grecaptcha.getResponse()
    $.ajax({
        type: "POST",
        url: "/auth/reg",
        data: "login="+username+"&password="+password,
        success: function (res) {
            try {
                res = JSON.parse(res);
            } catch (error) {}
            $("#reg-btn").html(`Регистрация`);
            $("#reg-btn").prop("disabled", false);

            console.log(res);
            if(res.success){
                Swal.fire('Успех!',"Вы успешно зарегистировались в ChatTO!",'success');
                let redirectlink = "/";
                // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))redirectlink = "/mobile";
                // else redirectlink = "/";
                setTimeout(function(){
                    document.location.href = redirectlink;
                },1000);
            }
            else Swal.fire('Ошибка!', res.error, 'error');
        },
        error: function(){
            $("#reg-btn").html(`Регистрация`);
            $("#reg-btn").prop("disabled", false);
            Swal.fire('Ошибка!', 'Сервер не отвечает.', 'error');
        }
    });
});

$("#restore_email").on("input", function(e){
    let email = e.currentTarget.value;
    if(email == undefined || email == '' || !validateEmail(email)){
        statusMsg(1, "Некорректный email", 1);
    }else{
        statusMsg(2, 1, 1);
    }
});

$("#forget-form").submit(function (e){
    e.preventDefault();
    let email = e.currentTarget[0].value;
    if(email == undefined || email == '' || !validateEmail(email)){
        statusMsg(1, "Некорректный email", 1);
    }else{
        statusMsg(2, 1, 1);
    }

    statusMsg(1, "Временно недоступно!", 1);
    return;

    $.ajax({
        type: "POST",
        url: "/auth/forget",
        data: "email="+email+"&recaptcha_response="+grecaptcha.getResponse(),
        success: function (e) {
            if(e == "1"){
                Swal.fire('Успех!',"Письмо с инструкциями отправлено на ваш почтовой ящик!",'success');

                $("#register").hide();
                $("#forget-password").hide();
                $("#authentication").show();

                $("#restore_email").val("");
                $("#wrong-00-2").removeClass("success");
            }else{
                resetCaptcha();
                if(e == 2){
                    Swal.fire('Ошибка!',"Некорректный email",'error');
                }else if(e == 3){
                    Swal.fire('Ошибка!',"Пользователь с такой почтой не найден!",'error');
                }else if(e == 4){
                    Swal.fire('Ошибка!',"Вы не подтвердили почту!",'error');
                }else if(e == 5){
                    Swal.fire('Ошибка!',"Вы не прошли проверку капчи!",'error');
                }
            }
        }
    });
});

// $(document).ready(function () {
//     $(".ulogin-button-vkontakte").attr("title","Войти с помощью Вконтакте");
//     $("window").load(function(){
//         $(".ulogin-button-vkontakte").attr("title","Войти с помощью Вконтакте");
//     });
//     setTimeout(() => {
//         $(".ulogin-button-vkontakte").attr("title","Войти с помощью Вконтакте");
//     }, 1000);
// });

$("footer .item:nth-child(2)").click(function(){
    let title = `О чате`;
    let data = `<div class="questions"><div class="quest">1. Что это за место?</div><div class="answer">ChatTO - это фан чат ТО в котором нужно общаться с друзьями, завести новых друзей, а так же наслаждаться игровым процессом (прокачивая свой гараж и вооружение).</div><div class="quest">2. Что ещё интересного есть в проекте?</div><div class="answer">По мимо основного чата (в котором вы общаетесь и получаете кристаллы и опыт), в чате вы сможете: прокачать свой гараж (пушки, корпуса, краски, дроны, и различные предметы). Так же в чате присудтвеуют контейнеры, золотые ящики (которые падают прямо в чате), лотерея (испытай свою удачу с другими игроками), подарочные карты, промо-коды, магазин (в котором ты сможешь купить уникальные предметы), зал славы, рейтинги (докажи что ты лучший), друзья, ежедневные задания, кланы, турниры и челленджи.</div><div class="quest">3. Как зарабатывать?</div><div class="answer">Чтобы заработать кристаллы и опыт вам просто нужно общаться в чате. 1 сообщение в чате = 100 кристаллов и 5 опыта, для премиум аккаунта = 200 кристаллов и 10 опыта, так же прокачивая свой гараж вы будете получать больше кристаллов и опыта.</div></div>`;
    Swal.fire(title,data,'question');
});

// $("footer .item:nth-child(2)").click(function(){
//     window.open('https://vk.com/chatto_ru','_blank');
// });

$("footer .item:nth-child(1)").click(function(){
    let title = `Правила проекта`;
    let data = `<table><tbody><tr><th>Пункт</th><th>Правило</th></tr><tr><td>1.1</td><td>Пользователю запрещается использовать флуд, флейм, сообщений а так же их дублирования.</td></tr><tr><td>1.2</td><td>Пользователю запрещается оскорблять а так же угрожать другим пользователям.</td></tr><tr><td>1.3</td><td>Пользователю запрещается использовать нецензурную лексику (мат).</td></tr><tr><td>1.4</td><td>Пользователю запрещено использовать троллинг при общении с другими пользователями чата.</td></tr><tr><td>1.5</td><td>Пользователю запрещается КАПСИТЬ (сообщения только из заглавных букв) или недопустимые символы.</td></tr><tr><td>1.6</td><td>Пользователю запрещено спамить или писать бессмысленные сообщения.</td></tr><tr><td>1.7</td><td>Пользователю запрещается рекламировать посторонние сайты, группы, не касающиеся тематики чата.</td></tr><tr><td>1.8</td><td>Пользователю запрещается отправлять назойливые просьбы о прокачке кристаллов/гаража.</td></tr><tr><td>1.9</td><td>Пользователю запрещается выпрашивание прав модератора/администратора чата.</td></tr><tr><td>1.10</td><td>Пользователю запрещается выдавать себя за тестера/модератора/администратора чата.</td></tr><tr><td>1.11</td><td>Пользователю запрещается передача аккаунта.</td></tr><tr><td>1.12</td><td>Пользователю запрещается регистрировать/использовать ники содержащие оскорбления/нецензурную брань, ники схожие с никами администрации чата.</td></tr><tr><td>1.13</td><td>Пользователю запрещается продавать подарочные карты за деньги.</td></tr><tr><td>1.14</td><td>Обсуждение действий модератора/администратора запрещено.</td></tr><tr><td>1.15</td><td>При неоднократном флуде вы рискуете быть забаненым навсегда или же получить обнуление аккаунта</td></tr><tr><td>1.16</td><td><b>[Важно]</b> Запрещено использовать более 5 аккаунтов, используя больше 5 аккаунтов вы рискуете быть забанены навсегда.</td></tr><tr><td>1.17</td><td>Пользователю запрещается оскорбление администрации чата в любой форме(в т.ч. косвенной) на любых ресурсах(включая чат, вк, и т.д.)</td></tr><tr><td>1.18</td><td><b>[Важно]</b> Пользователю запрещается использовать VPN</td></tr></tbody></table>`;

    Swal.fire({
        icon: 'info',
        title: title,
        html: data,
        width: 700
    });
});

if (typeof Website2APK !== "undefined") Website2APK.enableShowBannerAd(false);