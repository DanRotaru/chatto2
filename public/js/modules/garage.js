const garage = {
    initgarage2: false,
    loaded: false,
    garage: false,
    premiumTimer: false,
    installed: {
        Turret: '',
        Hull: '',
        Paint: '',
    },
    selected: '',
    main: function(){
        $(".garage-intro").hide();
        $(".garage-main").show();
        $("#mygarage").hide();
        $("#mygarage1").show();
    },
    getRes: function(type, res, cb) {
        let data = '';;
        
        if(type == 'turrets'){
            for(let i of res){
                let have = i.have ? '' : ' not';
                let type = i.type;
                if(type == 4) type = 'XT';
                else if(type == 5) type = 'LC';
                else if(type == 6) type = 'PR';
                else if(type == 7) type = 'DC';
                else if(type == 8) type = 'TC';
                else if(type == 9 || type == 11) type = '';
                else if(type == 10) type = 'UT';
                else type = 'M'+type;

                let e = `
                <div class="garage__items-item${have}" onclick="garage.info('${i.name1}', 1)" ondblclick="garage.install('${i.name1}', 'turret')" data-item-name="${i.name1}" data-type="turret">
                    <div class="top">
                        <div class="name">${i.name}</div>
                        <div class="modification">${type}</div>
                    </div>
                    <img src="${i.image}" alt="img" oncontextmenu="return false" ondragstart="return false">
                </div>
                `;

                data += e;
            }
            return data;
        }
        else if(type == 'hulls'){
            for(let i of res){
                let have = i.have ? '' : ' not';
                let type = i.type;
                if(type == 4) type = 'XT';
                else if(type == 5) type = 'LC';
                else if(type == 6) type = 'PR';
                else if(type == 7) type = 'DC';
                else if(type == 8) type = 'TC';
                else if(type == 9 || type == 11) type = '';
                else if(type == 10) type = 'UT';
                else type = 'M'+type;
    
                let e = `
                <div class="garage__items-item${have}" onclick="garage.info('${i.name1}', 2)" ondblclick="garage.install('${i.name1}', 'hull')" data-item-name="${i.name1}" data-type="hull">
                    <div class="top">
                        <div class="name">${i.name}</div>
                        <div class="modification">${type}</div>
                    </div>
                    <img src="${i.image}" alt="img" oncontextmenu="return false" ondragstart="return false">
                </div>
                `;
    
                data += e;
            }
            return data;
        }
        else if(type == 'paints'){
            for(let i of res){
                let have = i.have ? '' : ' not';
                let price_text = '';
                let cryorcoin = '<kry></kry>';
                if(i.unic == 2) cryorcoin = '<coin></coin>';
                if(have == ' not') price_text = `${number_format(i.price)} ${cryorcoin}`;
                if(i.unic == 1) price_text = '';

                let e = `
                <div class="garage__items-item${have}" onclick="garage.info('p${i.id}', 3)" ondblclick="garage.install('${i.id}', 'paint')" data-item-name="p${i.id}" data-type="paint">
                    <div class="top">
                        <div class="name">${i.name}</div>
                    </div>
                    <div class="price">${price_text}</div>
                    <img src="${i.image}" loading="lazy" alt="img" oncontextmenu="return false" ondragstart="return false">
                </div>
                `;

                data += e;
            }
            return data;
        }
        else if(type == 'cases'){
            for(let i of res){
                let price_text = `${number_format(i.price)} <kry></kry>`;
                if(i.unic == 1 || i.unic == 2) price_text = '';
                let filter = '';
                if(i.id == 4) filter = `style="filter: hue-rotate(155deg)"`;
                else if(i.id == 5) filter = `style="filter: hue-rotate(245deg)"`;
                else if(i.id == 7) filter = `style="filter: hue-rotate(270deg)"`;
                data += `
                <div class="garage__items-item" onclick="garage.info('${i.id}', 5)" data-item-name="${i.id}" data-type="case">
                    <div class="top">
                        <div class="name">${i.name}</div>
                    </div>
                    <div class="count">${i.have}</div>
                    <div class="price">${price_text}</div>
                    <img src="${i.image}" ${filter}alt="img" oncontextmenu="return false" ondragstart="return false">
                </div>
                `;
            }
            return data;
        }
        else if(type == 'supply'){
            for(let i of res){
                let price_text = `${number_format(i.price)} <kry></kry>`;
                if(i.have > 0 && i.id > 1) {
                    price_text = '';
                }
                if(i.id == 2) price_text = '';
                let have = '', isDrone = '', haveDrone = '';
                if(i.id <= 2){
                    have = `<div class="count">${i.have}</div>`;
                }
                if(i.id > 2) {
                    isDrone = ' class="drone"';
                    if(i.have > 0) haveDrone = ' installed';
                }
                
                data += `
                <div class="garage__items-item${haveDrone}" onclick="garage.info('${i.id}', 6)" data-item-name="${i.id}" data-type="supply">
                    <div class="top">
                        <div class="name">${i.name}</div>
                    </div>
                    ${have}
                    <div class="price">${price_text}</div>
                    <img src="${i.image}"${isDrone} alt="img" oncontextmenu="return false" ondragstart="return false">
                </div>
                `;
            }
            return data;
        }
        else if(type == 'special'){
            for(let i of res){
                let special = '', price_text = '';
                if(i.price > 0) price_text = `<div class="price">${number_format(i.price)} <kry></kry></div>`;
                if(i.id == 'special_premium_promocard') special = ` style="filter: hue-rotate(255deg)"`;
                else if(i.id == 'special_premium') special = ` style="margin-top: 12px"`;
                data += `
                <div class="garage__items-item" onclick="garage.info('${i.id}', 7)" data-item-name="${i.id}" data-type="gifts">
                    <div class="top">
                        <div class="name">${i.name}</div>
                    </div>
                    ${price_text}
                    <img src="${i.image}"${special} alt="img" oncontextmenu="return false" ondragstart="return false">
                </div>
                `;
            }
            return data;
        }
        else if(type == 'gifts'){
            for(let i of res){
                data += `
                <div class="garage__items-item" onclick="garage.info('${i.id}', 8)" data-item-name="${i.id}" data-type="gifts">
                    <div class="top">
                        <div class="name">${i.name}</div>
                    </div>
                    <img src="${i.image}" alt="img" oncontextmenu="return false" ondragstart="return false">
                </div>
                `;
            }
            return data;
        }

        if(cb) cb();
    },
    
    get: {
        turrets: (cb) => {
            $.get("/api/garage/turrets", function(res){
                let data = garage.getRes('turrets', res);
                $("#garage_turrets").html(data);
                $(`.garage__items-item[data-item-name="${garage.installed.Turret}"]`).addClass("installed active");

                // number_format
                $(".btn-upgrade #upgrade-text").html(`${number_format(garage.installed.details.nextPrice)} <kry></kry>`);

                if(cb) cb(data);
            });
        },
        hulls: (cb) => {
            $.get("/api/garage/hulls", function(res){
                let data = garage.getRes('hulls', res);
                $("#garage_hulls").html(data);
                $(`.garage__items-item[data-item-name="${garage.installed.Hull}"]`).addClass("installed active");
                if(cb) cb(data);
            });
        },
        paints: (cb) => {
            $.get("/api/garage/paints", function(res){
                let data = garage.getRes('paints', res);
                $("#garage_paints").html(data);
                $(`.garage__items-item[data-item-name="${garage.installed.Paint}"]`).addClass("installed active");
                if(cb) cb(data);
            });
        },
        cases: (cb) => {
            $.get("/api/garage/cases", function(res){
                let data = garage.getRes('cases', res);
                $("#garage_containers").html(data);
                if(cb) cb(data);
            });
        },
        supply: (cb) => {
            $.get("/api/garage/supply", function(res){
                let data = garage.getRes('supply', res);
                $("#garage_supply").html(data);
                if(cb) cb(data);
            });
        },
        special: (cb) => {
            $.get("/api/garage/special", function(res){
                let data = garage.getRes('special', res);
                $("#garage_special").html(data);
                if(cb) cb(data);
            });
        },
        gifts: (cb) => {
            $.get("/api/garage/gifts", function(res){
                let data = garage.getRes('gifts', res);
                $("#garage_gifts").html(data);
                if(cb) cb(data);
            });
        },

        all: (cb) => {
            garage.loaded = true;
            $.get("/api/garage/all", function(res){
                // console.log(res);
                if(!res || !res.Installed) return false;

                garage.installed = {
                    Turret: res.Installed.Turret,
                    Hull: res.Installed.Hull,
                    Paint: res.Installed.Paint,
                    details: res.Installed.installedDetails
                }
                // console.log(res.Installed.installedDetails);
                $(".garage__information .info__description").html(garage.installed.details.description);
                $(".garage__information .info__title-title").html(garage.installed.details.name);
                $(".garage__information #gs-plus").text(garage.installed.details.plus);

                // getRes
                $("#garage_turrets").html(garage.getRes('turrets', res.Turrets));
                $("#garage_hulls").html(garage.getRes('hulls', res.Hulls));
                $("#garage_paints").html(garage.getRes('paints', res.Paints));
                $("#garage_containers").html(garage.getRes('cases', res.Cases));
                $("#garage_supply").html(garage.getRes('supply', res.Supplies));
                $("#garage_special").html(garage.getRes('special', res.Special));
                $("#garage_gifts").html(garage.getRes('gifts', res.Gifts));

                garage.garage = res;

                $(`.garage__items .garage__items-item[data-item-name="${garage.installed.Turret}"]`).addClass("installed active");
                $(`.garage__items-item[data-item-name="${garage.installed.Hull}"]`).addClass("installed active");
                $(`.garage__items-item[data-item-name="p${garage.installed.Paint}"]`).addClass("installed active");

                // number_format
                if(garage.installed.details.nextPrice == -1){
                    // console.log(garage.installed.details.nextPrice);
                    $(".btn-upgrade").attr('onclick', '');
                    $(".btn-upgrade").attr('disabled', 'true');
                    $(".btn-upgrade span").text('');
                }
                else $(".btn-upgrade #upgrade-text").html(`${number_format(garage.installed.details.nextPrice)} <kry></kry>`);


                if(garage.installed.details.installed == 1) $(".btn-install").text('Установлено').attr('disabled', 'true');
                
                $("#skins-btn .skin-btn.bts[data-skin]").click(function(){
                    let skin = $(this).attr("data-skin");
                    let skinMod = ['_xt', '_lc', '_p', '_dc', '_tc', '_ut'];
                    if(skin == 4) skin = skinMod[0];
                    else if(skin == 5) skin = skinMod[1];
                    else if(skin == 6) skin = skinMod[2];
                    else if(skin == 7) skin = skinMod[3];
                    else if(skin == 8) skin = skinMod[4];
                    else if(skin == 10) skin = skinMod[5];

                    for (let s of skinMod) {
                        garage.selected = garage.selected.replace(s, '');
                    }
                    
                    skin = garage.selected + skin;
                    let type = $(".garage__nav a.active").attr("data-id");
                    if(type == 'turrets') type = 'turret';
                    else if(type == 'hulls') type = 'hull'; 

                    if(type == 'turret' || type == 'hull') {
                        garage.info(skin, type);
                        garage.skinBtn1();

                        setTimeout(() => {
                            $("#skins-btn .skin-btn:not(.bts)").attr("onclick", "garage.skinBtn1()");
                        }, 100);
                    }
                    
                });
                
                if(cb) cb(res);
            });
        }
    },
    getItems: function(tab, loaditem){
        if(tab == undefined) tab = "turrets";
        if(loaditem) garage.get[tab]();
        garage_tab(tab);
        garage.main();
    },
    buy: function(item, type, cb){
        $.post(`/api/garage/${item}/${type}/buy`, function(res) {
            if(res.success){
                alertify('Вы успешно купили данный предмет!', 'УСПЕШНО', 1);
                socket.emit('getAccount');
                if(type == 'turret'){
                    garage.get.turrets(function(){
                        garage.info(item, type);
                        garage.install(item, type);
                    });
                }
                else if(type == 'hull'){
                    garage.get.hulls(function(){
                        garage.info(item, type);
                        garage.install(item, type);
                    });
                }
                else if(type == 'paint'){
                    garage.get.paints(function(){
                        garage.info(item, type);
                        garage.install(item, type);
                        $("#garage_paints").scrollLeft(0);
                        setTimeout(() => hScrollToEl('#garage_paints', 'p'+item), 100);
                    });
                }
                else if(type == 'supply'){
                    garage.get.supply(function(){
                        garage.info(item, type);
                    });
                }

                if(cb) cb();

                return false;
            }
            else{
                alertify(res.error, 'Ошибка', 2);
            }
        });
    },
    info: function(name, type){
        clearInterval(garage.premiumTimer);
        $(".garage__items-item").removeClass("active");
        $(`.garage__items-item[data-item-name="${name}"]`).addClass("active");
        this.selected = name;


        if(type == 1) type = 'turret';
        else if(type == 2) type = 'hull';
        else if(type == 3){
            type = 'paint';
            name = name.replace('p', '');
        }
        else if(type == 5) type = 'case';
        else if(type == 6) type = 'supply';
        else if(type == 7) type = 'special';
        else if(type == 8) type = 'gifts';
        
        if(type == 'hull' || type == 'turret' || type == 'gifts'){
            $(".btn-install").removeClass("hidden");
        }
        if(type == 'hull' || type == 'turret'){
            $("#skins-btn").removeClass("hidden");
        }
        else{
            $("#skins-btn").addClass("hidden");
        }

        $.get(`/api/garage/${name}/${type}`, function(res){
            // console.log(res);
            let price = res.nextPrice || res.price;
            if(type == 'paint' || type == 'turret' || type == 'hull'){
                if(res.installed){
                    $(".garage-button.btn-install").text('Установлено').attr('disabled', 'true').attr('onclick', ``).removeClass("warning");
                }
                else{
                    res.name1 = res.name1 || res.id;
                    if(res.have) $(".garage-button.btn-install").text('Установить').removeAttr('disabled').removeClass("warning").attr('onclick', `garage.install('${res.name1}', '${type}')`);
                    else $(".garage-button.btn-install").text('Установить').attr('disabled', 'true').removeClass("warning").attr('onclick', ``);
                   
                }

                res.plus = res.plus || 0;
                $(".garage__information .info .info__title .info__title-title").text(res.name);
            }
            
            if(type == 'paint'){
                if(res.have){
                    $(".garage-button.btn-upgrade").addClass("hidden");
                }
                else{
                    $(".garage-button.btn-upgrade").removeAttr('disabled');
                    $(".garage-button.btn-upgrade").removeClass("hidden");
                    $(".garage-button.btn-upgrade span:first-child").text(`Купить`);
                    
                    if(res.unic > 0) $(".garage-button.btn-upgrade #upgrade-text").html(`${number_format(price)} <coin></coin>`);
                    else $(".garage-button.btn-upgrade #upgrade-text").html(`${number_format(price)} <kry></kry>`);

                    let paintname = $(".info .info__title .info__title-title").text();
                    $(".garage-button.btn-upgrade").attr('onclick', `alertify_quest('Вы действительно хотите купить краску ${paintname}?', "garage.buy('${res.id}', 'paint')")`);

                    $(".garage-button.btn-install").text('Установить').attr('disabled', 'true').attr('onclick', ``).removeClass("warning");
                }

                if(res.unic == 1){
                    $(".garage-button.btn-upgrade").addClass("hidden");
                }

                $(".garage__information .info__title .gs").addClass("hidden");
                $(".garage__information .info .info__description").text(res.description + ` Данная краска даёт ${res.plus} ккоинов за одно сообщение.`);
            }
            else if(type == 'turret' || type == 'hull'){
                let modification = '';
                modification = res.type > 3 ? res.type : res.type + 1;
                $(".garage__information .info__title .gs").removeClass("hidden");
                $(".garage__information .info__title .gs div").html(`+<span id="gs-plus">${res.plus}</span> <kry></kry>`);

                
                if(res.skins){
                    $(`.skins-wrapper .skin-btn[data-skin]:not([disabled])`).addClass("hidden");
                    let skinN = 0, skinNr = 11, skinNe;
                    for (let skin of res.skins) {
                        skinN++;
                        $(`.skins-wrapper .skin-btn[data-skin="${skin}"]`).removeClass("hidden");
                    }
                    skinNe = skinNr - skinN;
                    $(`.skins-wrapper .skin-btn.bts[disabled][data-skin-h]`).addClass("hidden");
                    for(let x = 0; x < skinNe; x++) $(`.skins-wrapper .skin-btn.bts[disabled][data-skin-h="${x}"]`).removeClass("hidden");
                }
                

                // if(modification > 4) return false;
                let isSkin = false;
                let skinMod = ['_xt', '_lc', '_p', '_dc', '_tc', '_ut'];
                for (let s of skinMod) {
                    if(name.indexOf(s) > -1){
                        isSkin = true;
                        break;
                    }
                }
                
                // skin = garage.selected + skin;

                if(modification < 4){
                    modification = ` (М${modification}) `;
                    $(".garage-button.btn-upgrade").removeAttr('disabled');
                    $(".garage-button.btn-upgrade span:first-child").text(`Улучшить${modification}`);
                    $(".garage-button.btn-upgrade #upgrade-text").html(`${number_format(price)} <kry></kry>`);

                    let itemname = $(".info .info__title .info__title-title").text().split(" ")[0] + (modification.replace(/\(/, '').replace(/\)/, ''));
                    $(".garage-button.btn-upgrade").attr('onclick', `alertify_quest('Вы действительно хотите купить ${itemname}?', "garage.buy('${res.name1}', '${type}')")`);
                    // $(".garage-button.btn-upgrade").attr('onclick', `garage.buy('${res.name1}', '${type}')`);
                    $(".garage-button.btn-upgrade").removeClass("hidden");
                }
                else{
                    if(!isSkin || res.have){
                        $(".garage-button.btn-upgrade").attr('disabled', 'true');
                        $(".garage-button.btn-upgrade span").text('');
                    }

                    else{
                        let mtype = '';
                        if(modification == 4) mtype = 'XT';
                        else if(modification == 5) mtype = 'LC';
                        else if(modification == 6) mtype = 'PR';
                        else if(modification == 7) mtype = 'DC';
                        else if(modification == 8) mtype = 'TC';
                        else if(modification == 10) mtype = 'UT';
                        modification = ` (${mtype}) `;
                        price = res.price;
                        $(".garage-button.btn-upgrade").removeAttr('disabled');
                        $(".garage-button.btn-upgrade span:first-child").text(`Купить${modification}`);
                        $(".garage-button.btn-upgrade #upgrade-text").html(`${number_format(price)} <kry></kry>`);

                        let itemname = $(".info .info__title .info__title-title").text();
                        $(".garage-button.btn-upgrade").attr('onclick', `alertify_quest('Вы действительно хотите купить ${itemname}?', "garage.buy('${name}', '${type}')")`);
                        // $(".garage-button.btn-upgrade").attr('onclick', `garage.buy('${res.name1}', '${type}')`);
                        $(".garage-button.btn-upgrade").removeClass("hidden");
                    }
                }
                

                
                // if(modification > 3){
                //     let type = '';
                //     if(modification == 4) type = 'XT';
                //     else if(modification == 5) type = 'LC';
                //     else if(modification == 6) type = 'PR';
                //     else if(modification == 7) type = 'DC';
                //     else if(modification == 8) type = 'TC';
                //     else if(modification == 9 || type == 11) type = '';
                //     else if(modification == 10) type = 'UT';

                
                // }
                // else{
                    
    
                    
                // }
                $(".garage__information .info .info__description").text(res.description);
            }

            else if(type == 'supply'){
                if(res.unic == 2){
                    if(res.have == 1){
                        $(".garage-button.btn-upgrade").addClass("hidden");
                        $(".garage-button.btn-install").text('Используется').attr('disabled', 'true').removeClass("hidden warning").attr('onclick', ``);
                    }
                    else{
                        $(".garage-button.btn-install").addClass("hidden");
                        $(".garage-button.btn-upgrade").attr('onclick', `alertify_quest('Вы действительно хотите купить дрон ${res.name}?', "garage.buy('${res.id}', 'supply')")`).removeClass("hidden warning").removeClass("hidden").removeAttr('disabled');
                        $(".garage-button.btn-upgrade span:first-child").text(`Использовать`);
                        $(".garage-button.btn-upgrade #upgrade-text").html(`${number_format(res.price)} <kry></kry>`);
                    }
                }
                else if(res.unic == 0){
                    $(".garage-button.btn-install").removeClass("hidden");
                    if(res.have > 0){
                        $(".garage-button.btn-install").text('Сбросить').removeClass("hidden warning").removeAttr('disabled').attr('onclick',  `alertify_quest('Вы действительно сбросить ${res.name}?', "garage.install('${res.id}', 'supply')")`);
                    }
                    else{
                        $(".garage-button.btn-install").text('Сбросить').removeClass("hidden warning").attr('disabled', 'true');
                    }
                    
                    $(".garage-button.btn-upgrade").attr('onclick', `alertify_quest('Вы действительно хотите купить ${res.name}?', "garage.buy('${res.id}', 'supply')")`).removeClass("hidden").removeAttr('disabled');
                    $(".garage-button.btn-upgrade span:first-child").text(`Купить`);
                    $(".garage-button.btn-upgrade #upgrade-text").html(`${number_format(res.price)} <kry></kry>`);
                }
                else if(res.unic == 1){
                    $(".garage-button.btn-upgrade").addClass("hidden");
                    if(res.have > 0){
                        $(".garage-button.btn-install").text('Используется').removeClass("hidden warning").attr('disabled', 'true');
                    }
                    else{
                        $(".garage-button.btn-install").html(`Перейти в магазин`).removeClass("hidden").addClass("warning").removeAttr('disabled').attr('onclick', `pShop('batteries')`);
                    }
                }
                
                if(res.unic >= 2){
                    if(res.have > 0){
                        $(".garage-button.btn-install").text('Используется').removeClass("hidden warning").attr('disabled', 'true');
                    }

                    $(".garage__information .info .info__title .info__title-title").text(res.name);
                    $(".garage__information .info .info__description").text(`Дрон ${res.name} даёт дополнительные очки опыта за каждое сообщение, а именно ${res.description}.`);
                    $(".garage__information .info__title .gs").addClass("hidden");
                }
                else{
                    $(".garage__information .info .info__title .info__title-title").text(res.name);
                    $(".garage__information .info .info__description").text(res.description);
                    $(".garage__information .info__title .gs").addClass("hidden");
                }
            }
            else if(type == 'special'){
                $(".garage__information .info .info__title .info__title-title").text(res.name);
                $(".garage__information .info__title .gs").addClass("hidden");

                if(res.price > 0){
                    $(".garage-button.btn-upgrade").attr('onclick', `garage.giftSend(${res.id})`).removeClass("hidden").removeAttr('disabled');
                    $(".garage-button.btn-upgrade span:first-child").text(`Подарить`);
                    $(".garage-button.btn-upgrade #upgrade-text").html(`${number_format(res.price)} <kry></kry>`);
                    $(".garage-button.btn-install").addClass("hidden");
                }
                else{
                    $(".garage-button.btn-upgrade").addClass("hidden");
                    if(res.have > 0){
                        $(".garage-button.btn-install").text('Используется').removeClass("hidden warning").attr('disabled', 'true');
                    }
                    else{
                        $(".garage-button.btn-install").html(`Перейти в магазин`).removeClass("hidden").addClass("warning").removeAttr('disabled').attr('onclick', `pShop('others')`);
                    }
                    if(res.id == 'special_premium' && res.have !== 0){
                        garage.premiumTimer = setInterval(() => {
                            $("#premium-timer").text(`Заканчивается через ${remaining(res.have)}`);
                        }, 1000);
                        res.description = res.description + `<div id="premium-timer">Заканчивается через ${remaining(res.have)}</div>`;
                        $(".garage-button.btn-install").text('Используется').removeClass("hidden warning").attr('disabled', 'true');
                    }
                }
                $(".garage__information .info .info__description").html(res.description);
            }
            else if(type == 'gifts'){
                $(".garage__information .info .info__title .info__title-title").html(`${res.name} <div class="mt-10"><img src="${res.image}"/></div>`);
                $(".garage__information .info__title .gs").addClass("hidden");

                $(".garage-button").addClass("hidden");
                res.description = chat.emojitext(res.description);
                let ulogin = res.login.split("|");
                ulogin = `<a onclick="profile('${ulogin[1]}')"><i class="rank r${ulogin[0]}"></i> ${ulogin[1]}</a>`;
                $(".garage__information .info .info__description").html(`<div class="flex between center"><div>Прислал: ${ulogin}</div><div>Дата: ${res.date}</div></div><div class="mt-5">Текст:</div><div class="gift-text">${res.description}</div>`);
            }

            else if(type == 'case'){
                $(`.garage__information[data-garage="information1"] .info1 .info__title`).text(res.name);
                $(`.garage__information[data-garage="information1"] .info1 .info__description`).text(res.text);
                $(`.garage__information .case-container .caseImg`).attr('src', res.image.replace('.webp', '_x2.webp'));
                if(name == 4) $(".garage__information .case-container .caseImg").attr("style", "filter: hue-rotate(155deg);");
                else if(name == 5) $(".garage__information .case-container .caseImg").attr("style", "filter: hue-rotate(245deg);");
                else if(name == 7) $(".garage__information .case-container .caseImg").attr("style", "filter: hue-rotate(270deg);");
                else $(".garage__information .case-container .caseImg").removeAttr("style");

                // Open case
                $(".opencase").removeClass("loading opening opened");
                $(".case-buy").show();

                $("#case-buy-num").val(1);
                $(".case-buy .btn[data-c-btn]").html(`Купить 1 <span>${number_format(res.price)} <kry></kry>`);


                let haves = (el, i, oh, nr) => {
                    if(i == 0) $(el).removeClass("warning green").attr('disabled', 'true');
                    else $(el).addClass("warning").removeAttr("disabled").attr("onclick", `pShop('case')`);

                    let num = '';
                    if($(el).attr("data-c-btn") == "openx5") num = ', 5';
                    else if($(el).attr("data-c-btn") == "openx15") num = ', 15';
                    
                    if(oh) $(el).addClass("green").removeClass("warning").removeAttr("disabled").attr("onclick", `garage.openCase(${res.id}${num})`)
                }

                if(res.have == 0){
                    $(`.garage__information .case-container .btn[data-c-btn="open"]`).attr('disabled', 'true');
                    
                    haves(`.garage__information .case-container .btn[data-c-btn*="openx"]`, res.unic);
                }
                else{
                    $(`.garage__information .case-container .btn[data-c-btn="open"]`).removeAttr('disabled').addClass("green").attr("onclick", `garage.openCase(${res.id})`);
                    
                    if(res.have < 5){
                        haves(`.garage__information .case-container .btn[data-c-btn*="openx"]`, res.unic);
                    }
                    else if(res.have >= 5 && res.have < 15){
                        haves(`.garage__information .case-container .btn[data-c-btn="openx5"]`, res.unic, 1, 5);
                        haves(`.garage__information .case-container .btn[data-c-btn="openx15"]`, res.unic);
                    }
                    else if(res.have >= 15){
                        haves(`.garage__information .case-container .btn[data-c-btn="openx5"]`, res.unic, 1, 5);
                        haves(`.garage__information .case-container .btn[data-c-btn="openx15"]`, res.unic, 1, 15);
                    }
                }


                if(res.unic == 1){
                    $(".case-buy").removeClass("hidden").addClass("shop");
                }
                else if(res.unic == 2){
                    $(".case-buy").addClass("hidden");
                    $(`.garage__information .case-container .btn[data-c-btn*="openx"]`).attr("disabled", "true")
                }
                else{
                    $(".case-buy").removeClass("hidden shop");
                }
                if(name == 6) $(".case-buy .warning").attr("onclick", "pShop('case')");
                else if(name == 8) $(".case-buy .warning").attr("onclick", "pShop('ultracase')");
                

                $(".garage__information .possible-items").empty();
                if(name < 6){
                    let krys = 'crys2';
                    if(name == 2) krys = 'crys3';
                    else if(name == 3) krys = 'crys4';
                    else if(name == 4) krys = 'crys6';
                    for(let p of res.prize){
                        if(p.search("кристаллов") > -1){
                            $(".garage__information .possible-items").append(`
                                <div class="item">
                                    <div class="item__count">${p}</div>
                                    <img src="../img/shop/${krys}.webp">
                                </div>
                            `);
                        }
                        else if(p.search("опыта") > -1){
                            $(".garage__information .possible-items").append(`
                            <div class="item">
                                <div class="item__count">${p}</div>
                                <img src="../assets/img/score_big.webp">
                            </div>
                        `);
                        }
                    }
                }
                else if(name >= 6){
                    for(let p of res.prize){
                        let h = '';
                        if(p.img == 'img/svg/coinMedium.svg' || p.img == 'img/paints.svg') h = ' style="height:90px;max-height: 90px;"';
                        $(".garage__information .possible-items").append(`
                        <div class="item">
                            <div class="item__count">${p.name}</div>
                            <img src="${p.img}"${h}>
                        </div>
                    `);
                    }
                }

                if(res.prize.length == 1) $(".garage__information .possible-items").addClass("two").addClass("two-sm");
                else if(res.prize.length == 2) $(".garage__information .possible-items").addClass("two").removeClass("two-sm");
                else $(".garage__information .possible-items").removeClass("two").removeClass("two-sm");
            }
        });
        // console.log('load_info:',type);
    },
    install: function(item, type, closeAfter){
        $.post(`/api/garage/${type}/${item}/install`, function(res){
            if(res.error){
                if(res.error == 'Вам это не принадлежит!') return false;
                alertify(res.error, 'Ошибка', 2);
                return false;
            }

            garage.info(item, type);
            if(type == 'paint') item = 'p' + item;
            if(type == 'turret' || type == 'hull' || type == 'paint'){
                $(`.garage__items-item[data-item-name][data-type="${type}"]`).removeClass("active installed");
                $(`.garage__items-item[data-item-name="${item}"]`).addClass("active installed");
    
                $(`.garage-intro .bigitem[data-item="turrets"] img`).attr('src', res.info.turret);    
                $(`.garage-intro .bigitem[data-item="hulls"] img`).attr('src', res.info.hull);    
                $(`.garage-intro .garage-intro__items-item[data-item="paints"] img`).attr('src', res.info.color[2]);    
    
                res.info.turret = res.info.turret.replace('preview.webp', '');
                res.info.hull = res.info.hull.replace('preview.webp', '');
                garageObj = res.info;
                viewer2.install(garageObj);
                
                viewer1.continueAnimation = true;
                setTimeout(() => {
                    viewer1.install(garageObj);
                    setTimeout(() => viewer1.continueAnimation = false, 100);
                }, 500);
                
                garage.updateGarage();
            }
            else if(type == 'supply'){
                if(item == '1'){
                    let n = parseInt($(`.garage__items-item[data-item-name="1"][data-type="supply"] .count`).text());
                    $(`.garage__items-item[data-item-name="1"][data-type="supply"] .count`).text(n - 1);
                }
                alertify_close();
            }
        });
    },

    updateGarage: () => {
        $("#mygarage, #mygarage1").attr('src', '/garage-viewer');
    },
    openCase: (id, num) => {
        let i = $(".opencase .caseImg").attr('src').replace('open', 'x2');
        let i1 = i.replace('x2', 'open');
        $(".opencase").removeClass("loading opening opened");
        $(".modal-overlay").fadeIn(200);
        $(".case-container .opencase").css("z-index", "101");
        $(".opencase .caseImg").attr('src', i);
        let numT = num > 0 ? num + '/' : '';

        $(".case-buy").hide();
        $.post(`/api/garage/${id}/${numT}open-case`, function(res){
            if(res.error){
                alertify(res.error, "Ошибка", 2);
                return;
            }

            if(ME.settings.caseSound) new Audio('../assets/container.mp3').play();
            $(".opencase").addClass("loading caseanim");
            setTimeout(() => {
                $(".opencase").removeClass("caseanim");
                $(".opencase").addClass("opening");

                let img = '', prize_text;
                if(num > 0){

                    setTimeout(() => {
                        $(".opencase").addClass("opened");
                        $(".caseImg").attr('src', i1);
                    }, 200);


                    let i = 1, totalI = res.info.length * 1800;
                    setTimeout(() => {
                        $(".modal-overlay").fadeOut(200);
                        $(".opencase .prize, .case-container .opencase").removeAttr("style");
                    }, totalI);
                    for (let info of res.info) {
                        let ia = i == 1 ? 1 : (1800 * i) - 1800;
                        setTimeout(() => {
                            
                            $(".opencase .prize").hide();
                            setTimeout(() => {
                                if(info.type == 0){
                                    if(id == 1) img = 'img/shop/crys2.webp';
                                    else if(id == 2) img = 'img/shop/crys3.webp';
                                    else if(id == 3) img = 'img/shop/crys4.webp';
                                    else if(id == 4) img = 'img/shop/crys6.webp';
                                    else img = 'img/shop/crys3.webp';
                                    prize_text = info.amount + ' ' + getNumEnding(info.amount, ['кристалл', 'кристалла', 'кристаллов'])
                                }
                                else if(info.type == 1){
                                    img = 'assets/img/score_big.webp';
                                    prize_text = info.amount + ' очков опыта';
                                }

                                setTimeout(() => {
                                    if(ME.settings.caseSound) new Audio('../assets/container_item.mp3').play();
                                }, 200);
                                $(".opencase .prize").show();
                                $(".opencase .prize img").attr('src', img);
                                $(".opencase .prize div").text(prize_text);
                                let n = parseInt($(`.garage__items-item[data-item-name="${id}"][data-type="case"] .count`).text());
                                $(`.garage__items-item[data-item-name="${id}"][data-type="case"] .count`).text(n - 1);
                                if((n - 1) <= 0) {
                                    $(`.garage__information .case-container .btn[data-c-btn*="open"]`).attr('disabled', 'true');
                                    $(`.garage__information .case-container .btn[data-c-btn*="openx"]`).removeClass("green")
                                }
                                else if((n - 1) >= 5 && (n - 1) < 15){
                                    $(`.garage__information .case-container .btn[data-c-btn="openx15"]`).attr('disabled', 'true').removeClass("green");
                                    $(`.garage__information .case-container .btn[data-c-btn="openx5"]`).addClass("green")
                                }
                                else if((n - 1) > 0 && (n - 1) < 5){
                                    $(`.garage__information .case-container .btn[data-c-btn*="openx"]`).attr('disabled', 'true').removeClass("green");
                                }
            
                                socket.emit('getAccount');
                            }, 100);
                        }, ia);
                        i++;
                    }
                    
                }
                else{
                    if(res.info.type == 0){
                        if(id == 1) img = 'img/shop/crys2.webp';
                        else if(id == 2) img = 'img/shop/crys3.webp';
                        else if(id == 3) img = 'img/shop/crys4.webp';
                        else if(id == 4) img = 'img/shop/crys6.webp';
                        else img = 'img/shop/crys3.webp';
                        prize_text = res.info.amount + ' ' + getNumEnding(res.info.amount, ['кристалл', 'кристалла', 'кристаллов'])
                    }
                    else if(res.info.type == 1){
                        img = 'assets/img/score_big.webp';
                        prize_text = res.info.amount + ' очков опыта';
                    }

                    $(".opencase .prize img").attr('src', img);
                    $(".opencase .prize div").text(prize_text);
                    let n = parseInt($(`.garage__items-item[data-item-name="${id}"][data-type="case"] .count`).text());
                    $(`.garage__items-item[data-item-name="${id}"][data-type="case"] .count`).text(n - 1);
                    if((n - 1) <= 0) {
                        $(`.garage__information .case-container .btn[data-c-btn*="open"]`).attr('disabled', 'true');
                        $(`.garage__information .case-container .btn[data-c-btn*="openx"]`).removeClass("green")
                    }
                    else if((n - 1) >= 5 && (n - 1) < 15){
                        $(`.garage__information .case-container .btn[data-c-btn="openx15"]`).attr('disabled', 'true').removeClass("green");
                        $(`.garage__information .case-container .btn[data-c-btn="openx5"]`).addClass("green")
                    }
                    else if((n - 1) > 0 && (n - 1) < 5){
                        $(`.garage__information .case-container .btn[data-c-btn*="openx"]`).attr('disabled', 'true').removeClass("green");
                    }

                    setTimeout(() => {
                        setTimeout(() => {
                            if(ME.settings.caseSound) new Audio('../assets/container_item.mp3').play();
                        }, 200);
                        $(".opencase").addClass("opened");
                        $(".caseImg").attr('src', i1);
                        setTimeout(() => {
                            $(".modal-overlay").fadeOut(200);
                            $(".case-container .opencase").removeAttr("style");
                        }, 1500);
                    }, 200);

                    socket.emit('getAccount');
                }
                
            }, 1000);
        });
    },
    caseBuy: () => {
        let num = parseInt($("#case-buy-num").val());
        let id = $("#garage_containers .garage__items-item.active").attr('data-item-name');
        let name = $("#garage_containers .garage__items-item.active .name").text().replace('«', '').replace('»', '');
        alertify_quest(`Вы действительно хотите купить ${name} ?`, function(){
            $.get(`/api/garage/${id}/${num}/buy-case`, function(res){
                if(res.error){
                    alertify(res.error, "Ошибка", 2);
                    return;
                }
                else if(res.success){
                    $("#case-buy-num").val(1);
                    alertify(`Вы успешно купили «${name}»`, "Успех", 1);
                    let n = parseInt($(`.garage__items-item[data-item-name="${id}"][data-type="case"] .count`).text());
                    $(`.garage__items-item[data-item-name="${id}"][data-type="case"] .count`).text(n + num);
                    garage.info(id, 5);

                    socket.emit('getAccount');
                }
            });
        })
    },
    giftSend: (id, i) => {
        if(!i){
            let name = $(`#garage_special .garage__items-item.active[data-item-name="${id}"] .name`).text();
            let price = $(`#garage_special .garage__items-item.active[data-item-name="${id}"] .price`).html();
            let img = $(`#garage_special .garage__items-item.active[data-item-name="${id}"] img`).attr('src');
            alertify(`
            <div class="send-gift">
                <div class="item">
                    <div>${name}</div>
                    <div class="price">${price}</div>
                    <img src="${img}">
                </div>
                <input type="text" placeholder="Введите ник получателя" class="input" id="send-gift-user">
                <textarea class="input" placeholder="Введите текст к подарку" id="send-gift-text" maxlength="300"></textarea>
            </div>
            `, 'Отправить подарок', 0, `<button class="btn" onclick="alertify_close()">Отменить</button><button class="btn green" onclick="garage.giftSend(${id}, 1)">Отправить</button>`, 1);
            return;
        }
        let user = $("#send-gift-user").val();
        let text = $("#send-gift-text").val();
        if(!user.length){
            $("#send-gift-user").focus();
            return;
        }

        $.post("/api/garage/send-gift", {tologin: user, text: text, id: id}, function(res){
            if(res.error){
                alertify(res.error, 'Ошибка', 2);
            }
            else if(res.success){
                alertify(`Вы успешно отправили подарок пользователю ${user}!`, 'Успех', 1);
            }
        })
        
        
    },

    skinBtn1: () => {
        $("#skins-btn .skin-btn").removeAttr("onclick");
        $("#skins-btn .skin-btn:not(.bts), #skins-btn .bottom-btn-name").toggleClass("active");
    },

    skinBtn: () => {
        $("#skins-btn .skin-btn:not(.bts), #skins-btn .bottom-btn-name").toggleClass("active");
        setTimeout(() => {
            $("#skins-btn .skin-btn:not(.bts)").attr("onclick", "garage.skinBtn1()");
        }, 100);
    }
}
function resizeViewer(i){
    let viewer;
    if($("#garageViewer").is(":visible")) viewer = viewer1;
    else viewer = viewer2;

    if(i == 1) viewer = viewer1;
    else if(i == 2) viewer = viewer2;
    
    let w = viewer.element.offsetWidth;
    let h = viewer.element.offsetHeight;
    if(viewer.three.renderer){
        viewer.three.renderer.setSize(w, h);
        viewer.three.camera.aspect = w / h;
        viewer.three.camera.updateProjectionMatrix();
    }
}

window.addEventListener('resize', resizeViewer, false);

// async function loadGarage(id){
//     document.getElementById("garage-preloader")?.classList.remove("hidden");
//     document.getElementById("garage-preloader2")?.classList.remove("hidden");
//     let imgs = ['../assets/garage/garage/bg1.webp','../assets/garage/garage/bl.webp','../assets/garage/garage/flr.jpg','../assets/garage/garage/gar1.jpg','../assets/garage/garage/pl1.webp','../assets/garage/garage/pl2.webp','../assets/garage/garage/race1.webp','../assets/garage/garage/sky1.webp'];
//     let j = 0;
//     let img = [];
//     for (let i = 0; i < imgs.length; i++) {
//         img[j] = new Image();
//         img[j].src = imgs[i];
//         j++;
//     }

//     if(id == 1){
//         img[7].onload = function () {
//             setTimeout(() => {
//                 document.getElementById("garage-preloader")?.classList.add("hidden");
//             }, 500);
//         }

//         garageObj.element = document.getElementById('garageViewer');
//         viewer1.init(garageObj);
//     }
//     else if(id == 2){
//         img[7].onload = function () {
//             setTimeout(() => {
//                 document.getElementById("garage-preloader2")?.classList.add("hidden");
//             }, 500);
//         }
//         viewer2.init(garageObj);
//     }
//     else{
//         img[7].onload = function () {
//             setTimeout(() => {
//                 document.getElementById("garage-preloader")?.classList.add("hidden");
//                 document.getElementById("garage-preloader2")?.classList.add("hidden");
//             }, 500);
//         }

//         // console.log(garageObj);
//         await viewer1.init(garageObj);

//         // garageObj.element = document.getElementById('garageViewer2');
//         // console.log(garageObj1);
        
//     }

//     console.log(viewer1.three.element, viewer2.three.element);
    
// }

$(document).ready(() => {
    garage.get.all();

    // loadGarage();
});

// garage.get.all();
$(".garage-intro__items-item, .garage-intro .bigitem").click(function(){
    let id = $(this).attr("data-item");
    garage.getItems(id);
    if(!garage.initgarage2) {
        viewer2.init(garageObj);
        garage.initgarage2 = true;
    }
    pauseGarage(1);
    // loadGarage(2);
});
$('.garage__items').on('mousewheel DOMMouseScroll', function(event){

    // var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
    // if(delta > 0){
    //     $('.garage__items').kinetic('start', { velocity: 10 });
    //     setTimeout(() => $('.garage__items').kinetic('stop'), 1000);
    // }
    // else{
    //     $('.garage__items').kinetic('start', { velocity: -10 });
    //     setTimeout(() => $('.garage__items').kinetic('stop'), 1000);
    // }


    var delta = Math.max(-1, Math.min(1, (event.originalEvent.wheelDelta || -event.originalEvent.detail)));
    $(this).scrollLeft( $(this).scrollLeft() - ( delta * 40 ) );
    event.preventDefault();
});

$(".garage__items").kinetic({
    filterTarget: function(target, e){
        if (!/down|start/.test(e.type)){
            return !(/area|a|input/i.test(target.tagName));
        }
    },
    cursor: 'default', y: false
});
function garage_tab(id){
    $(".garage__items").hide();
    if(id == 'containers'){
        $(".garage-main").addClass("big");
        pauseGarage(2);
    }
    else{
        $(".garage-main").removeClass("big");
        pauseGarage(1);
    }
    resizeViewer();
    $("#garage_"+id).show();
    $(".garage__nav .nav__item").removeClass("active");
    $(`.garage__nav .nav__item[data-id="${id}"]`).addClass("active");
    setTimeout(() => {
        if($(`#garage_${id} .garage__items-item.installed`).length){
            $(`#garage_${id} .garage__items-item.installed`).click();
        }
        else{
            $(`#garage_${id} .garage__items-item:first-child`).click();
        }
    }, 1);
}

$(".garage__nav .nav__item").click(function(){
    garage_tab($(this).attr("data-id"));  
})

function indecreaseNum(what){
    let price = parseInt($("#garage_containers .garage__items-item.active .price").text().replace(' ',''));
    let val = parseInt($("#case-buy-num").val());
    if(what == 1) { // increase
        if(val <= 1) {
            $("#case-buy-num").val(1);
            return false;
        }
        else {
            let v = val - 1;
            $("#case-buy-num").val(v);
            $(".case-buy .btn[data-c-btn]").html(`Купить ${v} <span>${number_format((v) * price)} <kry></kry>`);
        }
    }
    else{
        if(val >= 1000) {
            $("#case-buy-num").val(1000);
            return false;
        }
        else {
            let v = val + 1;
            $("#case-buy-num").val(v);
            $(".case-buy .btn[data-c-btn]").html(`Купить ${v} <span>${number_format((v) * price)} <kry></kry>`);
        }
    }
}

// $(`.case-buy .btn[data-btn="decrease"]`).click(() => indecreaseNum(1));
// $(`.case-buy .btn[data-btn="increase"]`).click(indecreaseNum);

var pressTimer, pressTimer1;
$(`.case-buy .btn[data-btn="increase"]`).mouseup(function(){
    clearInterval(pressTimer);
    clearTimeout(pressTimer1);
}).mousedown(function(){
    indecreaseNum();
    pressTimer1 = setTimeout(() => {
        pressTimer = setInterval(indecreaseNum, 100);
    }, 100);
});
$(`.case-buy .btn[data-btn="decrease"]`).mouseup(function(){
    clearInterval(pressTimer);
    clearTimeout(pressTimer1);
}).mousedown(function(){
    indecreaseNum(1);
    pressTimer1 = setTimeout(() => {
        pressTimer = setInterval(() => indecreaseNum(1), 100);
    }, 100);
});
$("#case-buy-num").on("input", function(){
    let e = parseInt($(this).val())
    if(e > 1000 || e <= 0) return;
    let price = parseInt($("#garage_containers .garage__items-item.active .price").text().replace(' ',''));
    $(".case-buy .btn[data-c-btn]").html(`Купить ${e} <span>${number_format(e * price)} <kry></kry>`);
});





