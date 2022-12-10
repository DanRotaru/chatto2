// console.log.apply(console, ["%c [ChatTO] Loading... ", "color: #fff; background: #47c; padding:3px 0;"]);
var WARN = false;

var n = document.URL.replace('https://', '').replace('http://', '').replace('/', '');

// var socket = io();
var socket = io(n, { auth: { token: ME.id } });

function toggleFullScreen() {
	let doc = window.document;
	let docEl = doc.documentElement;

	let requestFullScreen =
		docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen;
	let cancelFullScreen =
		doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen;

	if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement)
		requestFullScreen.call(docEl);
	else cancelFullScreen.call(doc);
}

function number_format(e, n, t, i) {
	e = (e + '').replace(/[^0-9+\-Ee.]/g, '');
	var r,
		a,
		o,
		d = isFinite(+e) ? +e : 0,
		h = isFinite(+n) ? Math.abs(n) : 0,
		l = void 0 === i ? ' ' : i,
		g = void 0 === t ? ' ' : t,
		u = '';
	return (
		3 <
			(u = (
				h
					? ((r = d),
					  (a = h),
					  (o = Math.pow(10, a)),
					  '' + (Math.round(r * o) / o).toFixed(a))
					: '' + Math.round(d)
			).split('.'))[0].length && (u[0] = u[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, l)),
		(u[1] || '').length < h &&
			((u[1] = u[1] || ''), (u[1] += new Array(h - u[1].length + 1).join('0'))),
		u.join(g)
	);
}
function rand(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
var countdown_interval;
function countdown(sec, cb1, cb2) {
	clearInterval(countdown_interval);
	let fn = () => {
		if (cb1) cb1(sec);
		if (sec <= 0) {
			if (cb2) cb2(sec);
			clearInterval(countdown_interval);
		}
		sec--;
	};
	fn();
	countdown_interval = setInterval(fn, 1000);
}

window.smoothScroll = function (target) {
	var scrollContainer = target;
	do {
		//find scroll container
		scrollContainer = scrollContainer.parentNode;
		if (!scrollContainer) return;
		scrollContainer.scrollTop += 1;
	} while (scrollContainer.scrollTop == 0);

	var targetY = 0;
	do {
		//find the top of target relatively to the container
		if (target == scrollContainer) break;
		targetY += target.offsetTop;
	} while ((target = target.offsetParent));

	scroll = function (c, a, b, i) {
		i++;
		if (i > 30) return;
		c.scrollTop = a + ((b - a) / 30) * i;
		setTimeout(function () {
			scroll(c, a, b, i);
		}, 20);
	};
	// start scrolling
	scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
};

function getNumEnding(number, endingArray) {
	let ending;
	number = number % 100;
	if (number >= 11 && number <= 19) ending = endingArray[2];
	else {
		i = number % 10;
		if (i == 1) ending = endingArray[0];
		else if (i == 4) ending = endingArray[1];
		else ending = endingArray[2];
	}
	return ending;
}

function remaining(timer, hideSec) {
	let res = '';
	let day, dayt, hr, hrt, min, mint, sec, sect;
	timer = Math.floor((new Date(timer).getTime() - Date.now()) / 1000);

	day = Math.floor(timer / 86400);
	dayt = getNumEnding(day, ['день', 'дня', 'дней']);

	hr = Math.floor((timer % 86400) / 3600);
	hrt = getNumEnding(hr, ['час', 'часа', 'часов']);

	min = Math.floor((timer % 3600) / 60);
	mint = getNumEnding(min, ['минута', 'минуты', 'минут']);

	sec = timer % 60;
	sect = getNumEnding(sec, ['секунда', 'секунды', 'секунд']);

	if (day) res = `${day} ${dayt}`;
	if (hr) res += ` ${hr} ${hrt}`;
	if (min) res += ` ${min} ${mint}`;
	if (hideSec == undefined) if (sec) res += ` ${sec} ${sect}`;

	return res;
}

function hScrollToEl(container, item) {
	let container_width = $(container).width() / 2 + 100;
	$(`${container}`).animate(
		{
			scrollLeft:
				$(`${container} div[data-item-name="${item}"]`).position().left - container_width,
		},
		500,
	);
}

function isEmoji(str) {
	let ranges = [
		'(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])',
	]; // U+1F680 to U+1F6FF];
	if (str.match(ranges.join('|'))) return true;
	else return false;
}

var back,
	back1,
	oneback = false;
function page(id, cb) {
	let id0 = id;
	$(`.navbar__btn[action="home"]`).removeClass('hidden');
	$(`.navbar__btn[action="logout"]`).addClass('hidden');

	if (id == 0 || id == undefined) {
		page(back1, cb);
		back1 = 'main';
		return;
	} else if (id == 'main') {
		$('.garage-page, .garage-page__main-page').addClass('hidden');
		$('.garage-main').hide();
		$('.garage-intro').show();
		$('#menu a').removeClass('active');
		$('#mygarage').show();

		$(`.navbar__btn[action="logout"]`).removeClass('hidden');
		$(`.navbar__btn[action="home"]`).addClass('hidden');

		back = 'main';
		back1 = 'main';
		pauseGarage();
		if (cb) cb();
		return;
	} else if (id == 'online') {
		$.get('/api/online', function (res) {
			$('#online-table').empty();
			let onlinecount = 0;
			for (const e of res) {
				onlinecount++;
				$('#online-table').append(`
				<div class="table-view-item" onclick="profile('${e.login}', '${e.rank}')">
					<div class="user">
						<div class="rank rm${e.rank}"></div>
						<div class="name">${e.login} (${e.messages})</div>
					</div>
					<div class="user-kry">
						${number_format(e.kry)} <kry></kry>
					</div>
				</div>
				`);
			}

			$('#online-title-count').text(`Онлайн (${onlinecount})`);
		});
	} else if (id == 'ratings') {
		ratings_page();
	} else if (id == 'shop') {
		$.get('/api/shop-paints', function (res) {
			let data = '';
			for (const item of res) {
				let n = `paintShopBuy(${item.id}, '${item.name}')`;
				data += `
                    <div class="card" onclick="${n}">
                        <div class="card__title" title="${item.name}">${item.name}</div>
                        <div class="img">
                            <img src="${item.image}" loading="lazy">
                        </div>
                        <div class="card__price">
                            ${item.price} <coin1></coin1>
                        </div>
                    </div>
                `;
			}
			$('#shopping-paints').html(data);
		});
	} else if (id == 'clans') {
		clans_page();
	} else if (id == 'clansOne') {
		$('#clans').addClass('hidden');
		$('#oneclan').removeClass('hidden');
		id = 'clans';
	} else if (id === 'quests') {
		if (ME.hasTasks) {
			Tasks.load();
		} else {
			// TODO: показать пользователю кнопку "получить задания"
		}
	} else $('#mygarage').hide();

	// console.log(id);
	$('.garage-page__main-page').addClass('hidden');
	$('.garage-page, .garage-page__main').removeClass('hidden');
	$('.garage-intro, .garage-main').hide();

	$('#page-' + id).removeClass('hidden');
	back1 = back || 'main';
	if (id0 == 'clansOne') back = 'clansOne';
	else back = id;
	pauseGarage();
	if (cb) cb();
}

$('.garage-page__back').click(() => page());

$(document).ready(function () {
	$('.progress').addClass('init');

	// $("img").on("contextmenu", function() {
	//     return false;
	// });
	// $("body").on("contextmenu", "img", function() {
	//     return false;
	// });
});

$(document).keydown(function (e) {
	if (e.ctrlKey && e.which == 38) {
		// ctrl + up
		MyLastMsg();
	}
});
function openlink(link) {
	window.open(link, '_blank');
}
function rules() {
	page('rules', function () {
		$(`#menu a`).removeClass('active');
		$(`#menu a[data-nav="rules"]`).addClass('active');
	});
}

function alertify(text, title, type, footer, middle) {
	if (title == undefined) title = 'ИНФОРМАЦИЯ';
	$('.modal-overlay, .modal').show();
	$('.modal .modal-title span').text(title);
	$('.modal .modal-text').html(text);

	$('.modal .modal-title').removeClass('success error');

	if (type) {
		if (type == 1) type = 'success';
		else if (type == 2) type = 'error';
		$('.modal .modal-title').addClass(type);

		if (type == 0) $('.modal .modal-title').removeClass('success error');
	}

	if (middle) $('.modal').css('top', '50%');
	else $('.modal').attr('style', 'display: block;');

	if (footer) $('.modal .modal-footer').html(footer);
	else $('.modal .modal-footer').empty();
}

function alertify_close() {
	$('.modal-overlay, .modal').hide();
}
function alertify_quest(text, action) {
	if (typeof action == 'function') {
		alertify(
			text,
			'ПОДТВЕРЖДЕНИЕ',
			false,
			`
        <button class="btn" onclick="alertify_close()">Нет</button>
        <button class="btn green">Да</button>
        `,
		);
		$(".modal .modal-footer .btn:contains('Да')").click(action);
	} else {
		alertify(
			text,
			'ПОДТВЕРЖДЕНИЕ',
			false,
			`
        <button class="btn" onclick="alertify_close()">Нет</button>
        <button class="btn green" onclick="${action}">Да</button>
        `,
		);
	}
}
/**
 * @param {object} options Options
 - title: specify modal title,
 - text: specify modal text/question,
 - inputType: specify input type (text || number..),
 - inputPlaceholder: specify input placeholder
 - footerBtn1Text: specify button1 (cancel) text, default Отменить
 - footerBtn2Text: specify button2 (submit) text, default Отправить
 - footerBtn1Action: specify button1 (cancel) action, default alertify_close()
*/
function alertify_prompt(options) {
	let o = {
		title: '',
		text: '',
		inputType: 'text',
		inputPlaceholder: '',
		footerBtn1Text: 'Отменить',
		footerBtn2Text: 'Отправить',
		footerBtn1Action: 'alertify_close()',
		footerBtn2Action: '',
	};
	if (typeof options !== 'object') return;
	o.title = options.title || o.title;
	o.text = options.text || o.text;
	o.inputType = options.inputType || o.inputType;
	o.inputPlaceholder = options.inputPlaceholder || o.inputPlaceholder;
	o.footerBtn1Text = options.footerBtn1Text || o.footerBtn1Text;
	o.footerBtn2Text = options.footerBtn2Text || o.footerBtn2Text;
	o.footerBtn1Action = options.footerBtn1Action || o.footerBtn1Action;
	o.footerBtn2Action = options.footerBtn2Action || o.footerBtn2Action;
	alertify(
		`<div class="font-13 mtn-20 text-left">${o.text}</div> <input id="alertify_prompt-text" class="input" type="${o.inputType}" placeholder="${o.inputPlaceholder}">`,
		o.title,
		0,
		`<div class="flex between mtn-20 gap-10 w-full p-0-10"><button class="btn w-full" onclick="${o.footerBtn1Action}">${o.footerBtn1Text}</button><button class="btn green" onclick="${o.footerBtn2Action}">${o.footerBtn2Text}</button></div>`,
	);
}

$('.online-count').click(function () {
	page('online', function () {
		$('#menu a').removeClass('active');
		$('#menu a[data-nav="online"]').addClass('active');
	});
});

var mylastnickname = '',
	lastmsg = '',
	writeTo = '';

var usersCount = 0;
function ratingsNewAll() {
	$.get('/user-stats/new1', function (res) {
		$('#ratings-page table tbody').empty();
		let n = 0;
		for (const i of res) {
			n++;
			$('#ratings-page #table-1 tbody').append(`
            <tr>
                <td>${n}</td>
                <td><div class="rank r${i.rank}"></div> <span onclick="profile('${i.login}', '${
				i.rank
			}')" class="user">${i.login} (${i.messages})</span></td>
                <td class="text-center">${number_format(i.score)}</td>
                <td class="text-center">${number_format(i.kry)} <kry></kry></td>
            </tr>
            `);
		}
	});
}
function ratings_page() {
	$.get('/user-stats/all', function (res) {
		$('#ratings-page table tbody').empty();
		let n = 0;
		for (const i of res.score) {
			n++;
			$('#ratings-page #table-1 tbody').append(`
            <tr>
                <td>${n}</td>
                <td><div class="rank r${i.rank}"></div> <span onclick="profile('${i.login}', '${
				i.rank
			}')" class="user">${i.login} (${i.messages})</span></td>
                <td class="text-center">${number_format(i.score)}</td>
                <td class="text-center">${number_format(i.kry)} <kry></kry></td>
            </tr>
            `);
		}
		n = 0;
		for (const i of res.kry) {
			n++;
			$('#ratings-page #table-2 tbody').append(`
            <tr>
                <td>${n}</td>
                <td><div class="rank r${i.rank}"></div> <span onclick="profile('${i.login}', '${
				i.rank
			}')" class="user">${i.login} (${i.messages})</span></td>
                <td class="text-center">${number_format(i.score)}</td>
                <td class="text-center">${number_format(i.kry)} <kry></kry></td>
            </tr>
            `);
		}
		n = 0;
		for (const i of res.messages) {
			n++;
			$('#ratings-page #table-3 tbody').append(`
            <tr>
                <td>${n}</td>
                <td><div class="rank r${i.rank}"></div> <span onclick="profile('${i.login}', '${
				i.rank
			}')" class="user">${i.login}</span></td>
                <td class="text-center">${number_format(i.messages)}</td>
                <td class="text-center">${number_format(i.score)}</td>
                <td class="text-center">${number_format(i.kry)} <kry></kry></td>
            </tr>
            `);
		}

		n = 0;
		for (const i of res.golds) {
			n++;
			$('#ratings-page #table-4 tbody').append(`
            <tr>
                <td>${n}</td>
                <td><div class="rank r${i.rank}"></div> <span onclick="profile('${i.login}', '${
				i.rank
			}')" class="user">${i.login} (${i.messages})</span></td>
                <td class="text-center">${number_format(i.golds)}</td>
                <td class="text-center">${number_format(i.kry)} <kry></kry></td>
            </tr>
            `);
		}
		n = 0;
		for (const i of res.loto) {
			n++;
			$('#ratings-page #table-5 tbody').append(`
            <tr>
                <td>${n}</td>
                <td><div class="rank r${i.rank}"></div> <span onclick="profile('${i.login}', '${
				i.rank
			}')" class="user">${i.login} (${i.messages})</span></td>
                <td class="text-center">${number_format(i.lotoWins)}</td>
                <td class="text-center">${number_format(i.kry)} <kry></kry></td>
            </tr>
            `);
		}
		n = 0;
		for (const i of res.new) {
			n++;
			let date = new Date(i.reg_date);
			let m = date.getMonth() + 1;
			if (m < 10) m = '0' + m;
			let y = date.getFullYear().toString().substring(2);
			let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
			let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
			let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
			$('#ratings-page #table-6 tbody').append(`
            <tr>
                <td>${n}</td>
                <td><div class="rank r${i.rank}"></div> <span onclick="profile('${i.login}', '${
				i.rank
			}')" class="user">${i.login} (${i.messages})</span></td>
                <td class="text-center">${number_format(i.score)}</td>
                <td class="text-center">${number_format(i.kry)} <kry></kry></td>
                <td class="text-center">${day}.${m}.${y} в ${h}:${min}</td>
            </tr>
            `);
		}

		usersCount = res.count;
	});

	$('#ratings-nav a').click(function () {
		let id = $(this).attr('data-id');
		$('#ratings-nav a').removeClass('active');
		$(this).addClass('active');
		$('#ratings-page table').addClass('hidden');
		$('#ratings-page #table-' + id).removeClass('hidden');

		if (id == 1) $('#ratings-info span').text('Топ 15 пользователей по количеству опыта');
		else if (id == 2)
			$('#ratings-info span').text('Топ 15 пользователей по количеству кристаллов');
		else if (id == 3)
			$('#ratings-info span').text(
				'Топ 15 пользователей по количеству отправленных сообщений',
			);
		else if (id == 4)
			$('#ratings-info span').text(
				'Топ 15 пользователей по количеству пойманных золотых ящиков',
			);
		else if (id == 5)
			$('#ratings-info span').text('Топ 15 пользователей по количеству побед в лотереи');
		else if (id == 6) {
			$('#ratings-info span').text(
				'Последние 15 зарегистрированных пользователей. Всего зарегистрированных: ' +
					number_format(usersCount),
			);
		}
	});
}

function clans_page() {
	$('#oneclan').addClass('hidden');
	$('#clans').removeClass('hidden');
	$('.clans-top').kinetic({
		filterTarget: function (target, e) {
			if (!/down|start/.test(e.type)) {
				return !/area|a|input/i.test(target.tagName);
			}
		},
		cursor: 'default',
		y: false,
	});

	$.get('/api/clans/getclans', function (res) {
		let data = '',
			data1 = '';
		let i = 0;
		let totalKry = 0;
		myclan = res.myclan;
		for (const clan of res.clans) {
			i++;
			let u = clan.by.split('|');
			data += `
            <tr>
                <td>${i}</td>
                <td>${clan.level}</td>
                <td>${clan.teg}</td>
                <td><a class="clan" onclick="clan(${clan.clanId})">${clan.name}</a></td>
                <td style="text-align:left;">
                    <a class="user" onclick="profile('${u[1]}', '${u[0]}')">
                        <i class="rank r${u[0]}"></i>
                        ${u[1]}
                    </a>
                </td>
                <td>${clan.users}/${clan.maxUsers}</td>
                <td>${clan.date}</td>
                <td>${number_format(clan.kry)} <kry></kry>
                </td>
            </tr>
            `;
			data1 += `
            <div class="clan" onclick="clan(${clan.clanId})">
                <div>[${clan.teg}] - ${number_format(clan.kry)} <kry></kry></div>
                <img src="https://awpbajxiyo.cloudimg.io/height/200/n/${clan.logo}">
            </div>
            `;
			totalKry += clan.kry;
		}
		$('#clans-page #table-1 tbody').html(data);
		$('#page-clans .clans-top').html(data1);
		// $("#clans-page table tbody").empty();
		$('.clans-top-title div:first-child').text(`Список кланов (${i})`);
		$('.clans-top-title div:last-child').html(
			`Общий капитал: ${number_format(totalKry)} <kry></kry>`,
		);

		$('#page-clans img').on('error', function () {
			$(this).attr('src', '../img/broken.svg');
		});
	});
}

function menuHide() {
	$(document).mouseup(function (e) {
		let n = $('#usermenu');
		// n.is(":visible") && (n.is(e.target) || 0 !== n.has(e.target).length || n.hide())
		n.is(':visible') && (n.is(e.target) || n.hide());
	});
}
function MenuTOP() {
	$('#usermenu').show();
	var e = document.getElementById('usermenu').clientHeight,
		n = event.clientY;
	document.documentElement.clientHeight < e + n
		? $('#usermenu').css('top', 'calc(100% - ' + (e + 8) + 'px)')
		: $('#usermenu').css('top', event.clientY),
		$('#usermenu').css('left', event.clientX);
}

function copyText(text) {
	navigator.clipboard.writeText(text);
}

function userProfile(login) {
	$.get('/api/profile/' + login, (e) => {
		page('profile', function () {
			console.log(e);
		});
	});
	console.log(login);
}

function profile(login, rank) {
	$('#usermenu .header div').text(login);
	if (rank) $('#usermenu .header i').attr('class', 'rank r' + rank);
	else $('#usermenu .header i').attr('class', 'rank r1');
	$('#usermenu .items-list div:first-child').attr('onclick', `tologin('${login}')`);
	$('#usermenu .items-list div:last-child').attr('onclick', `pm('${login}')`);
	$(`#usermenu .menu div[tooltip="Скопировать ник"]`).attr('onclick', `copyText('${login}')`);
	$(`#usermenu .menu div[tooltip="Профиль пользователя"]`).attr(
		'onclick',
		`userProfile('${login}')`,
	);

	MenuTOP();
	menuHide();
}

var ignore_users = [];

function ignore(login) {
	if (ignore_users.indexOf(login) > 0) {
		alert('Данный пользователь уже добавлен в игнор!');
		return false;
	}

	if (ignore_users.indexOf(login) === -1) ignore_users.push(login);

	autoIgnore();
}

function removeIgnore(login, s) {
	let n = ignore_users.indexOf(login);
	ignore_users.splice(n, 1);
	if (s == 1) {
		alert('Пользователь ' + login + ' был успешно снят с игнора!');
		$('#ignore-' + login).remove();
	}
}
function autoIgnore() {
	for (let i in ignore_users) {
		$("msg[by='" + ignore_users[i] + "']").html(
			`Скрытое сообщение пользователя ${ignore_users[i]}`,
		);
		$("msg[by='" + ignore_users[i] + "']").addClass('isHidden');
	}
}

const vAudio = (volume, loop) => {
	let audio = new Audio();
	audio.volume = volume || 0.2;
	if (loop) audio.loop = true;
	return audio;
};

const sounds = {
	caseSound: vAudio(),
	caseItemSound: vAudio(),
	ambientSound: vAudio(0.15, 1),
	goldSound: vAudio(),
};

if (ME.settings.caseSound) {
	sounds.caseSound.src = '../assets/container.mp3';
	sounds.caseItemSound.src = '../assets/container_item.mp3';
}
function ambientSoundP() {
	const promise = sounds.ambientSound.play();
	if (promise !== undefined) {
		promise
			.then(() => {
				// Autoplay started
			})
			.catch((error) => {
				// Autoplay was prevented.
				setTimeout(() => {
					ambientSoundP();
				}, 1000);
			});
	}
}
if (ME.settings.ambientSound) {
	sounds.ambientSound.src = '../assets/ambient_garage.mp3';
	ambientSoundP();
}
if (ME.settings.goldSound) {
	sounds.goldSound.src = '../assets/container.mp3';
}

function playSound(sound, src, volume) {
	sounds[sound].src = src;
	sounds[sound].volume = volume || 0.4;
	sounds.play();
}
