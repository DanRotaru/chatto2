/****************************************************************/
/** MAIN SCRIPTS TANKI CHAT by DanRotaru
/** Copyright http://vk.com/danrotaru
/****************************************************************/

console.log.apply(console, [
	'%c [ChatTO] Loading... ',
	'color: #fff; background: #47c; padding:3px 0;',
]);
var WARN = false;

function toggleFullScreen() {
	var doc = window.document;
	var docEl = doc.documentElement;

	var requestFullScreen =
		docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen;
	var cancelFullScreen =
		doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen;

	if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement) {
		requestFullScreen.call(docEl);
	} else {
		cancelFullScreen.call(doc);
	}
}

if (document.addEventListener) {
	document.addEventListener('webkitfullscreenchange', exitHandler, false);
	document.addEventListener('mozfullscreenchange', exitHandler, false);
	document.addEventListener('fullscreenchange', exitHandler, false);
	document.addEventListener('MSFullscreenChange', exitHandler, false);
}

function exitHandler() {
	if (
		document.webkitIsFullScreen ||
		document.mozFullScreen ||
		document.msFullscreenElement !== null
	) {
		if (document.webkitIsFullScreen == false) {
			// var w = document.body.clientWidth;
			// var ww = w - 925 - 8;
			// var container = document.getElementById('score_bar_senter');
			// container.style.width = ww + "px";

			chatresize();
		}
	}
}

var meVibrate = false;
var audio = new Audio();

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

function chattoresize() {
	let w, ww, rsize, finalresult;
	ww = document.body.clientWidth - 840;

	rsize = document.getElementById('score_bar_senter').style.width;
	rsize = parseInt(rsize.replace(/\D+/g, ''));

	if (rsize < 200) {
		finalresult = '290px';
	} else {
		finalresult = rsize + 90 + 'px';
	}

	$('#score_bar_senter').css('width', ww + 'px');
	$('.user-menu').css('left', finalresult);

	var chatheight = $('#chat-bg1').height() + 40;
	var chatwidth = $('#chat-bg1').width() + 4;
	$('#wifioff').css('height', chatheight + 'px');
	$('#wifioff').css('width', chatwidth + 'px');

	if ($('.btn_dropdown').length) {
		let left = $('.btn_dropdown').position().left;
		$('#list').css('left', 'calc(' + left + 'px + 4px)');
	}

	if ($('#p_helpers').length) {
		if ($('#score_bar_senter').length) {
			let left = $('#score_bar_senter').offset().left;
			$('#arrow-one').css('left', left + 'px');
		}
		if ($('.s-cry').length) {
			let left = $('.s-cry').offset().left;
			$('#arrow-two').css('left', left + 'px');
		}
		if ($(".nav-btn[tooltip='Покупка РУБ']").length) {
			let left = $(".nav-btn[tooltip='Покупка РУБ']").offset().left - 10;
			$('#arrow-three').css('left', left + 'px');
		}
		if ($('.btn_dropdown').length) {
			let left = $('.btn_dropdown').offset().left - 20;
			$('#arrow-four').css('left', left + 'px');
		}
	}
}

function chatresize() {
	let menu = $('.user-menu').width();
	let scoreW = document.body.clientWidth - menu - 100;
	let left = document.body.clientWidth - menu - 10;
	if (left < 290) left = 290;

	$('.user-menu').css('left', left + 'px');
	$('#score_bar_senter').css('width', scoreW + 'px');

	$('#wifioff').css('height', Number($('#chat-bg1').height() + 40) + 'px');
	$('#wifioff').css('width', Number($('#chat-bg1').width() + 4) + 'px');

	if ($('.btn_dropdown').length)
		$('#list').css('left', Number($('.btn_dropdown').position().left + 4) + 'px');

	if ($('#p_helpers').length) {
		if ($('#score_bar_senter').length) {
			let left = $('#score_bar_senter').offset().left;
			$('#arrow-one').css('left', left + 'px');
		}
		if ($('.s-cry').length) {
			let left = $('.s-cry').offset().left;
			$('#arrow-two').css('left', left + 'px');
		}
		if ($(".nav-btn[tooltip='Покупка РУБ']").length) {
			let left = $(".nav-btn[tooltip='Покупка РУБ']").offset().left - 10;
			$('#arrow-three').css('left', left + 'px');
		}
		if ($('.btn_dropdown').length) {
			let left = $('.btn_dropdown').offset().left - 20;
			$('#arrow-four').css('left', left + 'px');
		}
	}
}

$(document).ready(function () {
	chatresize();
});
$(window).resize(function () {
	chatresize();
});
$(document).ready(function () {
	$(window).load(function () {
		chatresize();
		setTimeout(chatresize, 500);
		setTimeout(chatresize, 1000);
		setTimeout(chatresize, 2000);
	});
});

function once(fn, context) {
	var result;

	return function () {
		if (fn) {
			result = fn.apply(context || this, arguments);
			fn = null;
		}

		return result;
	};
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
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

function alert(message_to_send, file, width, height, iFrame, title) {
	if (message_to_send == 'Fload' && iFrame == undefined) {
		$('#alert_content').load(file);
	} else if (message_to_send == 'Fload' && iFrame !== undefined) {
		var newIframe =
			'<iframe src="' +
			file +
			'" style="border:none;width:calc(100% + 20px);height:400px;margin: -10px;"></iframe>';
		$('#alert_content').html(newIframe);
	} else {
		$('#alert_content').html(message_to_send);
	}

	if (width !== 0 && width !== undefined) {
		$('#alert .alert .content').css('width', width);
	} else if (width == undefined) {
		$('#alert .alert .content').css('width', '350px');
	} else {
		//$(".alert").css("width","33.33333333%");
		//$(".alert").css("width","fit-content");
	}
	if (height !== 0 && height !== undefined) {
		$('#alert .alert .content').css('height', height);
	} else if (height == undefined) {
		$('#alert .alert .content').css('height', 'auto');
	} else {
		//$(".alert").css("height","33.33333333%");
		//$(".alert").css("height","fit-content");
	}
	$('#alert').fadeIn(50);

	if (title !== undefined) $('#alert .alert').attr('data-label', title);
	else $('#alert .alert').attr('data-label', 'Внимание');
}

function alertT(message, title, width, height) {
	alert(message, 0, width, height, 0, title);
}

function alertY1(msg) {
	$('.alertY1').fadeIn(100);
	$('.alertY1 p').html(msg);
}

function alertYc() {
	$('.alertY1').hide();
}

function alertMSG(title, msg) {
	$('#alert-speedmsg1').remove();
	if (msg == undefined) {
		msg = title;
		title = '';
	}
	//var iN = Math.floor(Math.random() * 1000) + 1;
	var iN = 1;
	var alertMSGName = 'alert-speedmsg' + iN;
	$('body').append(
		'' +
			"<div class='chatto-bg alert-speedmsg' id='" +
			alertMSGName +
			"'>" +
			"<div class='wide-bg'>" +
			"<div class='alert-speedmsg-title'>" +
			title +
			'</div>' +
			"<div class='alert-speedmsg-msg'>" +
			msg +
			'</div>' +
			'</div>' +
			'</div>',
	);
	$('#' + alertMSGName).fadeIn();

	setTimeout(function () {
		$('#' + alertMSGName).slideUp();
		setTimeout(function () {
			$('#' + alertMSGName).remove();
		}, 3500);
	}, 4000);
}

function alertMSGC() {
	$('#alert-speedmsg').slideUp();
}

function $load(id, file, func) {
	$('#userLoading').show();
	if (typeof LotoUpdates !== 'undefined') {
		clearInterval(LotoUpdates);
	}

	$(id).load(file, null, function () {
		$('#userLoading').hide();
		if (func !== undefined) {
			eval(func);
		}
	});

	if (id == '#garage') {
		$('#garlink').hide();
	}
	//$("#garlink").hide();
}

var ctrlKeyDown = false;

function alert_close() {
	$('#alert').fadeOut(50);
}

function game_exit() {
	$('#game_exit').fadeIn(50);
}

function logout() {
	document.location.href = '/logout';
}

function elStepper(e, el, price, callback) {
	let max = $(e).attr('max');
	if (max == undefined) max = 1000;
	max = parseInt(max);
	isInt(e, max);

	let val = $(e).val();
	if (el !== undefined) $(el).html(number_format(parseInt(val * price)));

	if (callback == 1)
		$('#open_k_num').attr(
			'onclick',
			'CHATTO_GARAGE.buy.cases_num(' + $(e).data('id') + ', ' + val + ')',
		);
	else if (callback !== undefined) callback();
}

function Stepper(e = '', el, toE, price, id) {
	$('.stepper').removeClass('up down');
	$('.stepper[data-id="' + id + '"]').addClass(e);
	if (e == 'up') {
		let max = $(el).attr('max');
		if (max == undefined) max = 1000;

		let current = parseInt($(el).val());
		if (current >= max) return false;
		$(el).val(current + 1);
		elStepper(el, toE, price, 1);
	} else if (e == 'down') {
		let current = parseInt($(el).val());
		$(el).val(current - 1);
		elStepper(el, toE, price, 1);
	}
}

function loadScript(src, callback) {
	var script;
	var scriptTag;
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src;
	script.onload = script.onreadystatechange = function () {
		if (!this.readyState || this.readyState == 'complete') {
			callback();
		}
	};
	scriptTag = document.getElementsByTagName('script')[0];
	scriptTag.parentNode.insertBefore(script, sriptTag);
}

function copyToClipboard(element) {
	var $temp = $('<input>');
	$('body').append($temp);
	$temp.val($(element).text()).select();
	document.execCommand('copy');
	$temp.remove();
}

function isInt(e, max, min = 1) {
	let n = $(e).val();
	if (isNaN(n)) $(e).val(n.replace(/\D/g, ''));

	if (max == undefined) max = 1000000;
	if (n > max) {
		$(e).val(max);
	} else if (n <= 0) {
		$(e).val(min);
	}
}

function sound(id) {
	if (id == 2) {
		audio.pause();
		$('#sound').removeClass('sound_2');
		$('#sound').addClass('sound_1');
		$('#sound').attr('onclick', 'sound()');
	} else {
		audio.src = audio.src;
		audio.play();
		$('#sound').removeClass('sound_1');
		$('#sound').addClass('sound_2');
		$('#sound').attr('onclick', 'sound(2)');
	}
}

function gold() {
	var audios = new Audio('../assets/js/gold.mp3');
	audios.volume = 0.1;
	audios.play();
	gold = function () {};
	$('#goldload').html('');
}

function golds() {
	var audios = new Audio('../assets/js/gold.mp3');
	audios.volume = 0.1;
	audios.play();
	golds = function () {};
}

function youtube_parser(url) {
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	var match = url.match(regExp);
	return match && match[7].length == 11 ? match[7] : url;
}

function makeScreen(id, url) {
	let content;

	content = ` <div class="garage" style="z-index:100;margin-top: -13px">
	<div class="LabelText" style="top: 2px;height: 25px;">Скриншот</div>
	<div class="chatto-bg" style="top: 20px;height:calc(100vh - 107px);">
	<div class="wide-bg" style="height: auto;padding: 10px;">
	Скрин: <a href="${url}" target="_blank">${url}</a>
	<a style="margin-left:50px" id="imgURL" href="" target="_blank">Открыть изображение в новом окне</a>
	</div>
	<div class="wide-bg" style="margin-top: 10px;height: calc(100% - 50px);padding: 2px;">
	<img src="../assets/img/1px.png" id="imgURL1" style="border-radius: 3px;max-height: 100%;max-width: 100%;">
	</div>
	</div>
	</div><style>#garlink{position:initial;top:initial;}</style>`;

	$('#garlink').html(content);

	$.get('../tmp/static/screen.php?type=' + id + '&url=' + url, function (data) {
		$('#imgURL').attr('href', data);
		$('#imgURL1').attr('src', data);
	});

	$('#garage').empty();
	$('#garlink').show();
	if ($('#garlink .LabelText').html() !== 'Скриншот') {
		$('#garlink .LabelText').html('Скриншот');
	}
	$('#nav-garage').removeClass('active');
	$('#nav-clans').removeClass('active');
}

function makeVideo(id, url) {
	let content;

	content = ` <div class="garage" style="z-index:100;margin-top:27px;">
	<div class="LabelText" style="top: 2px;height: 25px;">Скриншот</div>
	<div class="chatto-bg" style="top: 20px;height:calc(100vh - 106px);">
	<div class="wide-bg" style="height: auto;padding: 10px;">
	Видео: <a href="${url}" target="_blank">${url}</a>
	<a style="margin-left:50px" id="vidURL" href="" target="_blank">Открыть видео в новом окне</a>
	</div>
	<div class="wide-bg" style="margin-top: 10px;height: calc(100% - 50px);padding: 2px;">
	<video id="vidURL1" style="border-radius: 3px;max-height: 100%;max-width: 100%;" controls="" autoplay="" name="media"><source src="" type="video/mp4"></video>
	</div>
	</div>
	</div>`;

	$('#garlink').html(content);

	$.get('../tmp/static/screen.php?type=' + id + '&url=' + url, function (data) {
		data = data.replace('https://demo.cloudimg.io/v7/', '').replace('_prev.jpg', '.mp4');
		$('#vidURL').attr('href', data);
		$('#vidURL1').attr('src', data);
	});

	$('#garage').empty();
	$('#garlink').show();
	if ($('#garlink .LabelText').html() !== 'Видео') {
		$('#garlink .LabelText').html('Видео');
	}
	$('#nav-garage').removeClass('active');
	$('#nav-clans').removeClass('active');
}

function openlink(url) {
	console.log(url);
	if (typeof LotoUpdates !== 'undefined') {
		clearInterval(LotoUpdates);
	}
	var last4 = url.substr(url.length - 4);

	if (url.toString().search('chatto.ru/') !== -1) {
		window.open(url, '_blank');
		console.log('Err');
	}
	//Lightshot (4)
	else if (url.toString().search('prnt.sc/') !== -1) {
		makeScreen(1, url);
	} else if (url.toString().search('prntscr.com/') !== -1) {
		makeScreen(1, url);
	}
	// joxi (2)
	else if (url.toString().search('joxi.net/') !== -1) {
		$('#garage').empty();
		garlink(url);
	}
	// https://pastenow.ru/
	else if (url.toString().search('pastenow.ru/') !== -1) {
		makeScreen(2, url);
	}
	// https://imgur.com/
	else if (url.toString().search('imgur.com/') !== -1) {
		makeScreen(3, url);
	}
	// https://ru.imgbb.com/
	else if (url.toString().search('https://ibb.co/') !== -1) {
		makeScreen(4, url);
	}
	// http://skrinshoter.ru/ (2)
	else if (url.toString().search('skrinshoter.ru/s') !== -1) {
		makeScreen(5, url);
	} else if (url.toString().search('skr.sh/s') !== -1) {
		makeScreen(5, url);
	} else if (url.toString().search('skrinshoter.ru/v') !== -1) {
		makeVideo(5, url);
	} else if (url.toString().search('skr.sh/v') !== -1) {
		makeVideo(5, url);
	}

	// YouTube
	else if (url.toString().search('youtube.com/watch') !== -1) {
		if (url.toString().search('\\?') !== -1) {
			let sp = url.split('?');
			url = sp[0];
			let time = sp[1].replace('t=', '');
			let videoID = youtube_parser(url);
			ytframe(videoID, time);
		} else {
			let videoID = youtube_parser(url);
			ytframe(videoID);
		}
	} else if (url.toString().search('youtu.be/') !== -1) {
		if (url.toString().search('\\?') !== -1) {
			let sp = url.split('?');
			url = sp[0];
			let time = sp[1].replace('t=', '');
			let videoID = youtube_parser(url);
			ytframe(videoID, time);
		} else {
			let videoID = youtube_parser(url);
			ytframe(videoID);
		}
	}
	// Our group vk
	else if (url.toString().search('vk.com/chatto_ru') !== -1) {
		window.open(url, '_blank');
	} else if (url.toString().search('vk.com/wall-181835799') !== -1) {
		window.open(url, '_blank');
	} else if (url.toString().search('vk.com/topic-181835799') !== -1) {
		window.open(url, '_blank');
	} else if (url.toString().search('vk.com/topic-136870772') !== -1) {
		window.open(url, '_blank');
	} else if (url.toString().search('vk.com/danrotaru') !== -1) {
		window.open(url, '_blank');
	}
	// Tanki Online Resources
	else if (url.toString().search('tankionline.com/') !== -1) {
		window.open(url, '_blank');
	} else if (url.toString().search('ru.tankiwiki.com/') !== -1) {
		window.open(url, '_blank');
	} else {
		$('#url_exit').show();
		$('#url_exit input').val(url);
		$('#url_exit .btn.green').attr('onclick', "url_go('" + url + "')");
	}
}

function url_exit() {
	$('#url_exit').fadeOut(50);
}

function url_go(url) {
	window.open(url, '_blank');
	$('#url_exit').fadeOut(50);
}

var countdown_interval;
function countdown(elem, target) {
	let MINUTE = 60;
	let HOUR = 60 * MINUTE;
	let DAY = 24 * HOUR;
	let d = new Date();
	let remains_time = {
		days: 0,
		hours: 0,
		min: 0,
		sec: 0,
	};

	if (target == undefined) target = document.querySelector(elem).getAttribute('data-countdown');
	if (document.body.contains(document.querySelector(elem)) && target) {
		let remains = Math.floor(target - d.getTime() / 1000);

		remains_time.day = Math.floor(remains / DAY);
		remains_time.hours = Math.floor((remains - DAY * remains_time.day) / HOUR);
		remains_time.min = Math.floor(
			(remains - DAY * remains_time.day - HOUR * remains_time.hours) / MINUTE,
		);
		remains_time.sec =
			remains -
			DAY * remains_time.day -
			HOUR * remains_time.hours -
			MINUTE * remains_time.min;
		if (remains_time.sec < 10) remains_time.sec = '0' + remains_time.sec;

		remains_time.day = remains_time.day > 0 ? remains_time.day + 'д. ' : '';
		remains_time.hours = remains_time.hours > 0 ? remains_time.hours + 'ч. ' : '';
		remains_time.min = remains_time.min > 0 ? remains_time.min + 'м. ' : '';
		remains_time.sec = remains_time.sec > 0 ? remains_time.sec + 'сек.' : '';

		document.querySelector(
			elem,
		).innerHTML = `(${remains_time.day}${remains_time.hours}${remains_time.min}${remains_time.sec})`;
	}
}

/*** Cookie ***/
function setCookie(name, value, days) {
	var expires = '';
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
/*** Cookie ***/

/************************** FRIENDS **************************/
function friends() {
	if ($('#user_friends').length) {
	} else {
		$('#all_alerts').append("<div class='mask' id='user_friends'></div>");
	}
	$load('#user_friends', '../tmp/t_friends/window_friends.php');
	$('#user_friends').show();
}

function friends_close() {
	$('#user_friends').fadeOut(50);
}
/************************** FRIENDS **************************/

/************************** Shop **************************/
var SHOP_time = 0;
function shop(tab) {
	if (!$('#shoping').length) {
		$('#all_alerts').append("<div class='mask' id='shoping'></div>");
	}
	if (SHOP_time == 0) {
		$('#shoping').show();
		$('#userLoading').show();
		if (tab == undefined)
			$load('#shoping', '/chatto/0/chatto:shop', '$("#userLoading").hide();');
		else
			$load(
				'#shoping',
				'/chatto/0/chatto:shop',
				'shop_tab(' + tab + '); $("#userLoading").hide();',
			);
	} else {
		$.get('/chatto/' + SHOP_time + '/chatto:shop', function (e) {
			if (e !== '0') $('#shoping').html(e);
			if (tab !== undefined) shop_tab(tab);
		});
		$('#shoping').fadeIn(100);
	}
}

function shoping_close() {
	$('#shoping').hide();
}

function shope() {
	$('#shoping').show();
}

function updates() {
	$load('#garage', '../tmp/t_updates/index.php');
}
/************************** Shop **************************/

function window_settings() {
	if ($('#user_settings').length) {
	} else {
		$('#all_alerts').append("<div class='mask' id='user_settings'></div>");
	}
	$load('#user_settings', '../tmp/t_setting/window_settings.php');
	$('#user_settings').show();
}

function window_settings1() {
	if ($('#user_settings').length) {
	} else {
		$('#all_alerts').append("<div class='mask' id='user_settings'></div>");
	}
	$('#userLoading').show();
	//$load("#user_settings", "/setting");
	let data;
	data =
		'garage=' +
		settings.garage +
		'&font=' +
		settings.font +
		'&font_size=' +
		settings.font_size +
		'&show_menu=' +
		settings.show_menu +
		'&email=' +
		settings.email +
		'&email_activated=' +
		settings.email_activated +
		'&vk=' +
		settings.vk +
		'&bonus_time=' +
		settings.bonus_time +
		'&radio=' +
		settings.radio +
		'&radio_volume=' +
		settings.radio_volume;
	data = btoa(unescape(encodeURIComponent(data)));

	$.get('/setting/' + data + '/settings', function (e) {
		$('#user_settings').html(e);
		$('#userLoading').hide();
	});
	$('#user_settings').show();
}

function window_tasks() {
	if ($('#user_tasks').length) {
	} else {
		$('#all_alerts').append("<div class='mask' id='user_tasks'></div>");
	}
	$load('#user_tasks', '../tmp/t_tasks/window_task.php');
	$('#user_tasks').show();
}

function window_tasks_close() {
	$('#user_tasks').fadeOut(50);
}

function tasks_tournaments() {
	if ($('#user_tasks').length) {
	} else {
		$('#all_alerts').append("<div class='mask' id='user_tasks'></div>");
	}
	$load('#user_tasks', '../tmp/t_tasks/window_task.php', 'taskTab(2)');
	$('#user_tasks').show();
	$('#user_tasks1').show();
}

function tasks_challenges() {
	if ($('#user_tasks').length) {
	} else {
		$('#all_alerts').append("<div class='mask' id='user_tasks'></div>");
	}
	$load('#user_tasks', '../tmp/t_tasks/window_task.php', 'taskTab(3)');
	$('#user_tasks').show();
	$('#user_tasks1').show();
}

function p_challenges() {
	$load('#garage', '/chatP:uchallenges');
	$('.ctop, #chat_content').hide();
	$('#garage').empty();
	$('#btn_chat').show();
}

function uaudio(url) {
	audio.src = url;
	audio.volume = 0.1;
	audio.loop = true;
	audio.play();

	$('#sound').removeClass('sound_1');
	$('#sound').addClass('sound_2');
	$('#sound').attr('onclick', 'sound(2)');
}

function window_settings_close() {
	$('#user_settings').fadeOut(50);
}

function ch(id) {
	$('#radio').val(id);
	audio.pause();
	$('#sound').removeClass('sound_1');
	$('#sound').addClass('sound_2');
	$('#sound').attr('onclick', 'sound(2)');

	if (id == 1) {
		audio = new Audio('http://listen.181fm.com/181-uktop40_128k.mp3');
	}
	if (id == 2) {
		audio = new Audio('http://ic3.101.ru:8000/v1_1?userid=0');
	}
	if (id == 3) {
		audio = new Audio('https://19353.live.streamtheworld.com/977_HITS.mp3');
	}
	if (id == 4) {
		audio = new Audio('http://listen.181fm.com/181-classical_128k.mp3');
	}
	if (id == 5) {
		audio = new Audio('http://ep128.hostingradio.ru:8030/ep128');
	}
	if (id == 6) {
		audio = new Audio('http://online.radiorecord.ru:8101/rr_128');
	}
	if (id == 7) {
		audio = new Audio('http://live.muzfm.md:8000/muzfm');
	}
	if (id == 8) {
		audio = new Audio('https://tntradio.hostingradio.ru:8027/tntradio128.mp3');
	}

	audio.volume = '0.3';
	audio.loop = true;
	audio.play();
}

function prGR(data) {
	data = data.replace(
		/\{:cGR0==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)\:}/g,
		'<div class="item$1" garage-item-id="$2" onclick="CHATTO_GARAGE.bottom.info($3)" ondblclick="CHATTO_GARAGE.viewer.install($3)"> <div class="item-m"><div class="textl">$4</div><img src="$5" class="itemimg" oncontextmenu="return false" ondragstart="return false"></div></div>',
	);
	data = data.replace(
		/\{:cGR==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)\:}/g,
		'<div class="item$1" garage-item-id="$2" onclick="CHATTO_GARAGE.bottom.info($3)" ondblclick="CHATTO_GARAGE.viewer.install($3)"> <div class="item-m"><div class="textl">$4</div><div class="textr">$5</div><img src="$6" class="itemimg" oncontextmenu="return false" ondragstart="return false"></div>$7</div>',
	);
	//data = data.replace(/\{:cGR==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)\:}/g, '<div class="item$1" garage-item-id="$2" onclick="CHATTO_GARAGE.bottom.info($3)" ondblclick="CHATTO_GARAGE.viewer.install($3)"> <div class="item-m"><div class="textl">$4</div><div class="textr">$5</div><img src="$6" class="itemimg" oncontextmenu="return false" ondragstart="return false"></div></div>');

	data = data.replace(
		/\{:cGR1==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)\:}/g,
		'<div class="item$1" garage-item-id="$2" onclick="CHATTO_GARAGE.bottom.info($3)"><div class="item-m"><div class="textl">$4</div><div class="textr">$5</div><img style="margin-left: 0px;height: 102px;" src="$6" class="itemimg" oncontextmenu="return false" ondragstart="return false"><div class="item-label-count" id="item-$7">×$8</div></div></div>',
	);
	data = data.replace(
		/\{:cGR2==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)\:}/g,
		'<div class="item$1" garage-item-id="$2" onclick="CHATTO_GARAGE.bottom.info($3)"><div class="item-m"><div class="textl">$4</div><div class="textr">$5</div><img src="$6" class="itemimg" oncontextmenu="return false" ondragstart="return false"><div class="item-label-count" id="item-$7">×$8</div></div></div>',
	);
	data = data.replace(
		/\{:cGR3==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)==(.*?)\:}/g,
		'<div class="item$1" garage-item-id="$2" onclick="CHATTO_GARAGE.bottom.info($3)"><div class="item-m"><div class="textl">$4</div><div class="textr">$5</div><div class="item-background-img" style="background: url($6);background-size: 102px;$7"></div></div></div>',
	);

	return data;
}

function rules() {
	$('#garage').empty();
	$load('#garage', '/chatP:rules');
}

function rules() {
	let html = `<div class="LabelText">Правила</div>
	<div class="chatto-bg" style="height: calc(100vh - 108px);margin-top: 3px;color:#fff;">
	  <div class="wide-bg" style="height:100%">
	  <div style="height:100%;overflow-y:auto;">
		<div style="font-size:14px;margin:10px;"><strong>1: Правила чата:</strong></div>
		<table class="mdn-table td-left">
		<tbody><tr>
	<th>Пункт</th>
	<th>Правило</th></tr>
	<tr>
	<td>1.1</td>
	<td>Пользователю запрещается использовать флуд, флейм, сообщений а так же их дублирования.</td>
	</tr><tr>
	<td>1.2</td>
	<td>Пользователю запрещается оскорблять а так же угрожать другим пользователям.</td>
	</tr><tr>
	<td>1.3</td>
	<td>Пользователю запрещается использовать нецензурную лексику (мат).</td>
	</tr><tr>
	<td>1.4</td>
	<td>Пользователю запрещено использовать троллинг при общении с другими пользователями чата.</td>
	</tr><tr>
	<td>1.5</td>
	<td>Пользователю запрещается КАПСИТЬ (сообщения только из заглавных букв) или недопустимые символы.</td>
	</tr><tr>
	<td>1.6</td>
	<td>Пользователю запрещено спамить или писать бессмысленные сообщения.</td>
	</tr><tr>
	<td>1.7</td>
	<td>Пользователю запрещается рекламировать посторонние сайты, группы, не касающиеся тематики чата.</td>
	</tr><tr>
	<td>1.8</td>
	<td>Пользователю запрещается отправлять назойливые просьбы о прокачке кристаллов/гаража.</td>
	</tr><tr>
	<td>1.9</td>
	<td>Пользователю запрещается выпрашивание прав модератора/администратора чата.</td>
	</tr><tr>
	<td>1.10</td>
	<td>Пользователю запрещается выдавать себя за тестера/модератора/администратора чата.</td>
	</tr><tr>
	<td>1.11</td>
	<td>Пользователю запрещается передача аккаунта.</td>
	</tr><tr>
	<td>1.12</td>
	<td>Пользователю запрещается регистрировать/использовать ники содержащие оскорбления/нецензурную брань, ники схожие с никами администрации чата.</td>
	</tr><tr>
	<td>1.13</td>
	<td>Пользователю запрещается продавать подарочные карты за деньги.</td>
	</tr><tr>
	<td>1.14</td>
	<td>Обсуждение действий модератора/администратора запрещено.</td>
	</tr><tr>
	<td>1.15</td>
	<td>При неоднократном флуде вы рискуете быть забаненым навсегда или же получить обнуление аккаунта</td>
	</tr><tr>
	<td>1.16</td>
	<td><b>[Важно]</b> Запрещено использовать более 5 аккаунтов, используя больше 5 аккаунтов вы рискуете быть забанены навсегда.</td>
	</tr><tr>
	<td>1.17</td>
	<td>Пользователю запрещается оскорбление администрации чата в любой форме(в т.ч. косвенной) на любых ресурсах(включая чат, вк, и т.д.)</td>
	</tr>
	<tr>
	<td>1.18</td>
	<td><b>[Важно]</b> Пользователю запрещается использовать VPN</td>
	</tr>
	</tbody>
	</table>
	
	<div style="font-size:14px;margin:10px;"><strong>2: Права администрации:</strong></div>
	
		<table class="mdn-table">
		<tbody><tr>
	<th>Пункт</th>
	<th>Правило</th></tr>
	<tr>
	<td>2.1</td>
	<td>Администрация имеет право отказать вам в выдаче доказательства нарушения.</td>
	</tr>
	</tbody>
	</table>
	
	<br/>
	<table class="mdn-table">
	<tbody><tr>
	<th>Используя данный сайт вы автоматически подтверждаете своё согласие с данными правилами, если вы не согласны с ними, пожалуйста немедленно покиньте сайт.</th></tr>
	</tbody>
	</table>
	
	
		<style>
		table.td-left td{text-align:left;}
		</style>
		</div>
		</div>
		
	 
	</div>`;
	$('#garage').html(html);
}
var updatesIndex = 0;
function load_page(id, menu) {
	$('#garlink, #garlinks').hide();
	$('#garlink, #garlinks').attr('src', '');

	if (menu == undefined) {
		zv();
	}

	// Обновляем кристаллы/звание
	u_update(2);

	if (typeof LotoUpdates !== 'undefined') {
		clearInterval(LotoUpdates);
	}
	$('#nav-garage, #nav-clans').removeClass('active');
	// Страница 1 - Гараж
	if (id == 1) {
		$('#nav-garage').addClass('active');
		$('#userLoading').show();

		CHATTO_GARAGE.v2.load.all();

		// $.get("/chatP:garage", function(data) {
		// 	data = prGR(data);

		// 	$("#garage").html(data);
		// 	$("#userLoading").hide();
		// });
	}
	// Страница 2 - Игроки
	else if (id == 2) {
		$load('#garage', '/chatP:users');
	}
	// Страница 3 - Правила
	else if (id == 3) {
		rules();
	}
	// Страница 4 - Прочее
	else if (id == 4) {
		$load('#garage', '/chatP:others');
	}
	// Страница 5 - Онлайн
	else if (id == 5) {
		//$load("#garage","/chatP:online");
		online();
	}
	// Страница 5 - Карты
	else if (id == 6) {
		// $load("#garage", "/chatP:cards");
		$load('#garage', '/chatP:cards?activate=1');
	}
	// Страница 7 - Активировать карту
	else if (id == 7) {
		$load('#garage', '/chatP:cards');
	}
	// Страница 8 - Бан ЛИСТ
	else if (id == 8) {
		$load('#garage', '/chatP:ban_list');
	}
	// Страница 9 - Администрация
	else if (id == 9) {
		$load('#garage', '/chatP:admins');
	}
	// Страница 10 - Кланы
	else if (id == 10) {
		$('#nav-clans').addClass('active');
		//$load("#garage", "../tmp/t_clan/window_clan.php");
		getclans();
	}
	// Страница 11 - Обновления
	else if (id == 11) {
		$.get('/get-updates', function (e) {
			let updN = e.substring(0, 3);
			updatesIndex = updN - 30;
			e = e.split('-@UPD@-');
			let html = '';
			for (let i = 0; i < e.length; i++) {
				let u = e[i].split('-@I@-');
				html += `<div class="upd" id="update${u[0]}">
					<div class="upd_title">Обновление #${u[0]} (релиз ${u[1]})</div>
					<ul>${u[2]}</ul>
					<div class="upd_time"><img src="../assets/img/clock.png"> ${u[3]}</div>
					</div>`;
				//console.log(e[i]);
			}
			let main = `
			<div class="LabelText">Обновления</div>
				<div class="chatto-bg" style="height: calc(100% - 50px);padding: 10px;top: 2px;width:initial !important;" data-page="updates">
				<div class="wide-bg" style="height: calc(100% - 5px);">
				<div class="update-header">
					Обновления чата
					<div class="ideasLink"><a href="https://vk.com/topic-181835799_39820665?offset=80" target="_blank">Если у вас есть предложения/новые идеи или же вы обнаружили баг отпишитесь в нашей группе вконтакте!</a></div>
				</div>
				<div class="update-lists">
					<div id="updates-list">${html}</div>
				<div style="text-align:center;"><button class="task-btn" onclick="loadUpdates()">Показать ещё</button></div>
				</div>
			</div>
		`;
			$('#garage').html(main);
		});
	}
	// Страница 12 - Таблица званий
	else if (id == 12) {
		$load('#garage', '/chatP:table-rang');
	}
	// Страница 12 - Разрешение экрана
	else if (id == 13) {
		$load('#garage', '../tmp/static/screensize.php');
	}
	// Страница 14 - Просмотр видео
	else if (id == 14) {
		ytframe();
	}
	// Страница 15 - Реклама
	else if (id == 15) {
		$load('#garage', '/chatP:ads');
	}
	// Страница 0 - Кейсы
	else if (id == 0) {
		$load('#garage', '/chatP:case');
	}
}

function loadUpdates() {
	$.get('../../tmp/t_updates/updates-n.php?p=' + updatesIndex, function (e) {
		updatesIndex -= 30;
		e = e.split('-@UPD@-');
		let html = '';
		for (let i = 0; i < e.length; i++) {
			let u = e[i].split('-@I@-');
			html += `<div class="upd" id="update${u[0]}">
				<div class="upd_title">Обновление #${u[0]} (релиз ${u[1]})</div>
				<ul>${u[2]}</ul>
				<div class="upd_time"><img src="../assets/img/clock.png"> ${u[3]}</div>
				</div>`;
		}
		$('#updates-list').append(html);
	});
}

function LotoL(id) {
	if (id == 1) {
		zv();
	}
	$('#garlink, #garlinks').hide();
	$('#garlink, #garlinks').attr('src', '');

	$load('#garage', '../tmp/static/loto/');
}
/*

if (src == "http://chatto.ru/" || src == "http://chatto.ru\\" || src == "http://chatto.ru\\\\" || src == "http://chatto.ru"){
alert("Вы пытаетесь открыть нашу ссылку.");
}
else{*/
function iFrame(src) {
	if (
		src[0] !== 'h' &&
		src[1] !== 't' &&
		src[2] !== 't' &&
		src[3] !== 'p' &&
		src[4] !== ':' &&
		src[5] !== '/' &&
		src[6] !== '/'
	) {
		src = 'http://' + src;
	}

	let e = `
<div class="LabelText">Внешняя ссылка</div>
<div class="chatto-bg" style="top: 3px;height:calc(100vh - 108px)">

<div class="wide-bg" style="height: calc(100vh - 110px);overflow:auto;position:relative;">
<iframe src="${src}" id="garlinks"></iframe>

</div>
</div>
`;

	$('#garage').html(e);
}

function garlink(link) {
	if (link == undefined) {
		var link = prompt('Введите ссылку. Пример (https://tankionline.com/)!');
		if (link) {
			iFrame(link);
		}
	} else {
		iFrame(link);
	}
}

function buy_vip() {
	$load('#vip_buyer', '../tmp/t_buy/window_vip.php');
	$('#alert_vip').show();
}

function vip_tab(id) {
	if (id == 1) {
		$('#vip_content1').show();
		$('#vip_content2').hide();
	}
	if (id == 2) {
		$('#vip_content2').show();
		$('#vip_content1').hide();
	}
}

var bonusCard = {
	enter: function (e) {
		if (e.keyCode == 13) {
			activate_card();
			return false;
		}
	},
	buy: function (id) {
		$.ajax({
			url: '../tmp/t_cards/bonus-card.php',
			type: 'POST',
			data: 'cardType=' + id,
			success: function (data) {
				eval(data);
			},
		});
	},
	activate: function (id) {
		if (id == 1) {
			$.ajax({
				url: '../tmp/t_cards/bonus-card-activate.php',
				type: 'POST',
				data: 'id=1&card=' + $('#bonus_card').val(),
				success: function (data) {
					eval(data);
				},
			});
		} else {
			let serial = $('#card_serial').val();
			let cvv = $('#card_cvv').val();
			if (serial == '' || cvv == '') {
				serial = $('#serial-b').html();
				cvv = $('#cvv-b').html();
			}
			$.ajax({
				url: '../tmp/t_cards/bonus-card-activate.php',
				type: 'POST',
				data: 'serial=' + serial + '&cvv=' + cvv,
				success: function (data) {
					eval(data);
				},
			});
		}
	},
	toChat: function () {
		$.ajax({
			url: '../tmp/t_cards/ccard.php',
			type: 'POST',
			data: 'hash=' + $('#hash-b').val(),
			success: function (data) {
				eval(data);
			},
		});
	},
	gift: function () {
		alertify.prompt('Введите ник получателя карты!', function () {
			var ulogin = $('#alertifytext').val();
			if (ulogin) {
				$.ajax({
					url: '../tmp/t_cards/card_send.php',
					type: 'POST',
					data: 'hash=' + $('#hash-b').val() + '&ulogin=' + ulogin,
					success: function (data) {
						eval(data);
					},
				});
			}
		});
	},
	show: function (a, b) {
		if (a == 1) {
			$('#activate-cards-div').show();
			$('#create-cards-div, #create-cards-div-new').hide();

			$(".btn[onclick='bonusCard.show(1)']").addClass('green active');
			$(".btn[onclick='bonusCard.show(1)']").attr('style', 'top:1px');

			$(".btn[onclick='bonusCard.show(2)']").removeClass('green active');
			$(".btn[onclick='bonusCard.show(2)']").attr('style', '');
		} else if (a == 2) {
			$('#create-cards-div').show();
			$('#activate-cards-div, #create-cards-div-new').hide();

			$(".btn[onclick='bonusCard.show(2)']").addClass('green active');
			$(".btn[onclick='bonusCard.show(2)']").attr('style', 'top:1px');

			$(".btn[onclick='bonusCard.show(1)']").removeClass('green active');
			$(".btn[onclick='bonusCard.show(1)']").attr('style', '');
		} else {
			$('#create-cards-div-new').show();
			$('#activate-cards-div, #create-cards-div').hide();

			$(".btn[onclick='bonusCard.show(2)']").addClass('green active');
			$(".btn[onclick='bonusCard.show(2)']").attr('style', 'top:1px');

			$(".btn[onclick='bonusCard.show(1)']").removeClass('green active');
			$(".btn[onclick='bonusCard.show(1)']").attr('style', '');

			if (b !== undefined) {
				b = b.split(':');
				let serial = b[0];
				let cvv = b[1];
				let hash = b[2];

				$('#serial-b').html(serial);
				$('#cvv-b').html(cvv);
				$('#hash-b').val(hash);
			}
		}
	},
};

function buy_case(id) {
	var kcomfirm = confirm('Вы действительно хостите купить данный кейс ?');
	if (kcomfirm == true) {
		$.ajax({
			url: '../tmp/t_shop/buy_case.php',
			type: 'POST',
			data: 'ids=' + id,
			success: function (data) {
				alert(data);
				u_update(1);
			},
		});
	}
}

function open_case(id) {
	if (id == 1) {
		$.ajax({
			url: '../tmp/t_case/case_c.php',
			type: 'POST',
			data: 'id=1',
			success: function (data) {
				if ($('#containerModal').length) {
					$('#containerModal').show();
				} else {
					$('#containerHTMLContent').html(data);
				}
			},
		});
	} else {
		$.ajax({
			url: '../tmp/t_case/case_o.php',
			type: 'POST',
			data: 'id=' + id,
			success: function (data) {
				eval(data);
			},
		});
	}
}

function buy_icase(id) {
	$.ajax({
		url: '../tmp/t_case/case_b.php',
		type: 'POST',
		data: 'id=' + id,
		success: function (data) {
			eval(data);
		},
	});
}

function buy_cases() {
	$('#cases').slideUp();
	$('.casesb').slideDown();
}

function imageError(id, img) {
	$('#' + id).attr('src', img);
}

/*******************************************************************************************************************
***********************************************Chat
/*******************************************************************************************************************/
//Чат системы //
/*
function answer(login){
$("#text").val("[b]"+login+"[/b], ")
}
function smile(id){
$('#text').val($('#text').val() + id);
}
*/

function smile(id) {
	$('#text').val($('#text').val() + id);
	document.getElementById('text').focus();
}

function smiles() {
	showsmiles(2);
}

function tologin(login) {
	login = login.toString();
	login = login.replace(/(<s>|<\/s>)/g, '');

	var txtv = $('#text').val();
	var tolog = txtv.split(' ');

	if (tolog[0] == '/to') {
		if (tolog[1] !== login) {
			let txt = txtv.replace('/to ' + tolog[1] + ' ', '');
			txt = '/to ' + login + ' ' + txt;
			$('#text').val(txt);
		} else {
			$('#text').val($('#text').val());
		}
	} else if (tolog[0] == '/pm') {
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
		$('#text').val('/to ' + login + ' ' + $('#text').val());
	}

	$('#text').focus();
}

var tologinOr = tologin;

function pm(login) {
	login = login.toString();
	login = login.replace(/(<s>|<\/s>)/g, '');

	var txtv = $('#text').val();
	var tolog = txtv.split(' ');
	if (tolog[0] == '/pm') {
		if (tolog[1] !== login) {
			let txt = txtv.replace('/pm ' + tolog[1] + ' ', '');
			txt = '/pm ' + login + ' ' + txt;
			$('#text').val(txt);
		} else {
			$('#text').val($('#text').val());
		}
	} else if (tolog[0] == '/to') {
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
		$('#text').val('/pm ' + login + ' ' + $('#text').val());
	}

	$('#text').focus();
}

function to(login) {
	tologin(login);
}

function ask(text) {
	$('#chat_messages').prepend(
		'<div><font color="lime"><strong>' + text + '</strong></font></div>',
	);
}

function MyLastMsg() {
	var text = lastmsg;
	$('#text').val(text);
	console.log('My Last msg: ' + text);
}

function batteries() {
	if ($('#item-batteries').is(':visible')) {
		var xbattery = '×';
		var battery = $('#item-batteries').html();
		battery = battery.replace(xbattery, '');

		if (battery !== '0') {
			battery = parseInt(battery - 1);
			$('#item-batteries').html(xbattery + battery);
		}
	}
}

function showhideI() {
	if (!$('#chatshowhideI').length) $('body').append("<style id='chatshowhideI'></style>");
	let one = '@-moz-document url-prefix() {.chat-container nav{margin-top: -8px}}';
	let two =
		'.dr,.icon-remove,#btn-clear,#btn-stop{display:none!important;}.chat-container.chat > div:nth-child(1){margin-top:2px!important;}';
	if ($('#chatshowhideI').html() !== one) $('#chatshowhideI').html(one);
	else $('#chatshowhideI').html(two);
}

if (MY.group > 1) showhideI();

window.mylastnickname = '';
window.lastmsg = '';
window.writeTo = '';
var sendlogsArr = [];
function send_m(e) {
	var text = $('#text').val();

	((msg) => {
		const toLoginRegExp = /^([a-zA-ZА-ЯЁё0-9_\-.]{1,30}); (.*)/gi;
		const toLoginPrvtRegExp = /^([a-zA-ZА-ЯЁё0-9_\-.]{1,30}): (.*)/gi;

		if (toLoginRegExp.test(msg)) {
			let tologin = msg.split(';');
			if (tologin !== 'SERIAL')
				text = '/to ' + tologin[0] + ' ' + msg.replace(tologin[0] + '; ', '');
		} else if (toLoginPrvtRegExp.test(msg)) {
			let tologin = msg.split(':');
			if (tologin !== 'SERIAL')
				text = '/pm ' + tologin[0] + ' ' + msg.replace(tologin[0] + ': ', '');
		}
	})(text);

	if (e == 1) {
		let str = text.split(' ');
		if (str[0] == '/pm' || str[0] == '/to') {
			let str = text.split(' ');
			let textWithoutLogin = text.replace(str[0] + ' ' + str[1] + ' ', '');
			if (
				!(
					textWithoutLogin[0] == 'h' &&
					textWithoutLogin[1] == 't' &&
					textWithoutLogin[2] == 't' &&
					textWithoutLogin[3] == 'p'
				) &&
				typeof textWithoutLogin[0] !== 'undefined'
			) {
				text =
					str[0] +
					' ' +
					str[1] +
					' ' +
					textWithoutLogin[0].toString().toUpperCase() +
					textWithoutLogin.slice(1);
			}
		} else {
			if (!(text[0] == 'h' && text[1] == 't' && text[2] == 't' && text[3] == 'p')) {
				text = text[0].toString().toUpperCase() + text.slice(1);
			}
		}
	}

	let how = '';
	if (text.toString().search('/to ') !== -1) {
		window.mylastnickname = text.toString().replace('/to ', '');
		window.mylastnickname = window.mylastnickname.split(' ')[0];
		how = '/to ';
	} /*else if(text.toString().search("; ") !== -1){
		let s = text.split(";");
		let login = s[0];
		text = "/to "+login+" "+text.split(login+"; ").join("");
		window.mylastnickname = login;
		how = "/to ";
	}*/ else if (text.toString().search('/pm ') !== -1) {
		window.mylastnickname = text.toString().replace('/pm ', '');
		window.mylastnickname = window.mylastnickname.split(' ')[0];
		how = '/pm ';
	} else {
		window.mylastnickaname = '';
	}

	window.writeTo = '';
	if (window.mylastnickname !== '') {
		writeTo = how + window.mylastnickname + ' ';
	} else {
		window.writeTo = '';
	}
	window.mylastnickname = '';
	window.lastmsg = text;
	$('#text').val(writeTo);

	// $("#chatform button").attr("disabled","");

	let start_time = new Date().getTime();
	$.ajax({
		type: 'POST',
		url: '/chat:post',
		data: { text: text },
		success: function (html) {
			let request_time = new Date().getTime() - start_time;
			sendlogsArr.push(request_time);
			let requestSum = 0;
			for (let i of sendlogsArr) requestSum += Number(i);
			let averageTime = parseFloat((requestSum / sendlogsArr.length).toFixed(2));
			$('#sendlogsA').html('Averange time: ' + averageTime + 'ms');
			$('#sendlogsA').show();
			$('#sendlogs').prepend('<div>Message sent in ' + request_time + 'ms');
			$('#chatform button').removeAttr('disabled');
			u_update(2);
			batteries();
			eval(html);
		},
	});
}

function wmsg(m) {
	$('#text').val($('#text').val() + m);
}

function updatelastmsg() {
	console.log('Edited!');
	//startchat();
	$('#msgeditv').val('');
	$(".btn[onclick='updatelastmsg()']").remove();
	var msg = $('#text').val();
	msg = encodeURIComponent(msg);
	$.ajax({
		type: 'POST',
		url: '../tmp/t_chat/message-upd.php',
		data: 'msg=' + msg,
		success: function () {
			$('#text').val('');
			lastmsg = msg;
		},
	});
}

function MsgEdit() {
	if ($('#msgeditv').length) {
	} else {
		$('.chat-container').append("<input type='hidden' id='msgeditv'/>");
	}
	var msgeditv = $('#msgeditv').val();
	if (msgeditv == undefined || msgeditv == '') {
		console.log('Editing...');
		//stopchat();
		if ($(".btn[onclick='updatelastmsg()']").length) {
		} else {
			$('.chat-container').append(
				"<button class='btn' style='top:-77px;width:100%;' onclick='updatelastmsg()'>Обновить</button>",
			);
		}
		var msg = lastmsg;
		msg = msg.replace(/\/to (.*?) (.*?)/g, '$2');
		msg = msg.replace(/\/pm (.*?) (.*?)/g, '$2');

		$('#text').val(msg);
		$('#msgeditv').val('1');
	} else {
		//startchat();
		$(".btn[onclick='updatelastmsg()']").remove();
		$('#msgeditv').val('');
	}
}

$(document).keydown(function (e) {
	if (event.ctrlKey && e.which == 219) {
		// ctrl + [
		$('#p_userban').fadeIn();
		return false;
	}

	if (event.ctrlKey && e.which == 38) {
		// ctrl + up
		MyLastMsg();
	}
	if (event.ctrlKey && e.which == 66) {
		// ctrl + b
		$('.modifying').toggle();
	}

	if (event.ctrlKey && e.which == 37) {
		// ctrl + left
		if ($('#text').val().toString().search('/to ') !== -1) {
			$('#text').val($('#text').val().replace(new RegExp('/to (.*?) (.*?)', 'gm'), '$2'));
		} else if ($('#text').val().toString().search('/pm ') !== -1) {
			$('#text').val($('#text').val().replace(new RegExp('/pm (.*?) (.*?)', 'gm'), '$2'));
		}
	}

	if (event.ctrlKey && e.which == 188) {
		// ctrl + ,
		showhideI();
		return false;
	}

	if (event.ctrlKey && e.which == 40) {
		// ctrl + b
		MsgEdit();
		return false;
	}
});

var donat = {
	webmoney: 'R317180445710',
	window: function () {
		if ($('#donat_window').length) {
		} else {
			$('#all_alerts').append("<div class='mask' id='donat_window'></div>");
		}

		let html = `
		<div class="LabelText" style="top: calc(50% - 206px);">Платежи</div>
		<div class="chatto-bg window_donat">
			<div class="panel-inset">
			<div>
				<div></div>
			</div>
			<div>
				Здесь вы можете приобрести валюту РУБ, которая используется при покупке кристаллов, премиум аккаунта и других вещей из магазина.
			</div>
			</div>
			<div style="margin-top:20px">
				<div style="margin-top: 10px; display: block;">
					<div class="input-value">
						<span>Способ оплаты:</span>
						<select class="select-option" oninput="donat.show(this.value)">
							<option selected="selected" value="1">Qiwi Wallet</option>
							<option value="2">WebMoney</option>
							<option value="1">Visa/MasterCard</option>
							<option value="3">Яндекс Деньги</option>
							<option value="4">Мегафон</option>
							<option value="5">МТС</option>
							<option value="6">Билайн</option>
							<option value="7">Теле2</option>
							<option value="8">Payeer</option>
							<option value="9">Другое</option>
						</select>
						<select class="select-option" oninput="donat.nick(this.value)">
							<option selected="selected" value="1">Себе</option>
							<option value="2">Ввести ник</option>
						</select>
					</div>
					<div id="donat_qiwi_wallet" class="input-value">
						<span>Сумма пополения: </span>
						<input placeholder="Желаемое количество РУБ" id="payment_value" type="text" class="text" oninput="isInt('#payment_value')" value="10" onclick="this.select()">
						<span>руб.</span>
					</div>
					
					<div style="margin-top: 5px;display:none;" id="donat_wm_wallet" class="input-value">
						<span>Сумма пополения: </span>
							<input placeholder="Желаемое количество РУБ" id="payment_value_wm" type="text" class="text" oninput="isInt('#payment_value_wm');donat.change(1)" value="10" onclick="this.select()">
							<span>руб.</span>
						</div>
						<div style="margin-top: 5px;display:none;" id="donat_nick" class="input-value">
							<span>Введите ник получателя: </span>
							<input placeholder="Кому вы хотите пополнить" id="payment_nick" type="text" class="text">
						</div>
					</div>
					
					<div id="payment_btn">
						<button class="btn green" onclick="donat.order(1)" style="top: 5px;display: block;width: 100%;padding-bottom: 3px;">Перейти к оплате</button>
					</div>
				</div>
				<div style="opacity: .5;position: absolute;bottom: 88px;right: 15px;">
					<a onclick="donat.kassa(1)" style="text-decoration: underline;color: #fff;text-shadow: none;">Kassa</a>
					<a onclick="donat.kassa()" style="text-decoration: underline;color: #fff;text-shadow: none;">?</a>
				</div>
				<div class="btn-inset">Если ваш платёж не дошёл или возникла проблема, сообщите об этом помощникам администрации.
	</div>
				<div style="position: absolute;bottom: 5px;width: calc(100% - 18px);">
					<a onclick="alert('Fload','../tmp/t_shop/ls.php','600px','auto')" style="color:#50de30;text-decoration: underline;text-transform: uppercase;font-family: 'PT SANS', sans-serif;position: relative;top: 15px;">Пользовательское соглашение</a>
					<button onclick="$('#donat_window').fadeOut(100)" class="btn_close" style="float:right;"></button>
				</div>
			</div>
		`;

		$('#donat_window').html(html);
		$('#donat_window').fadeIn(100);
		$('#userLoading').hide();
	},
	order: function (id) {
		if (id == 1) {
			//qiwi
			let amount = $('#payment_value').val();
			let to = '';
			if ($('#donat_nick').is(':visible') && $('#payment_nick').val() !== '') {
				to = '&login=' + $('#payment_nick').val();
			}
			let url = 'https://chatto.ru/pay?form=qiwi&amount=' + amount + to;
			window.open(url, '_blank');
		} else if (id == 2) {
		} //webmoney
		else if (id > 2) {
			// kassa

			let amount = $('#payment_value').val();
			let to = '';
			if ($('#donat_nick').is(':visible') && $('#payment_nick').val() !== '') {
				to = '&login=' + $('#payment_nick').val();
			}

			let payment_type = '';
			if (id == 3) payment_type = 45;
			else if (id == 4) payment_type = 82;
			else if (id == 5) payment_type = 84;
			else if (id == 6) payment_type = 83;
			else if (id == 7) payment_type = 132;
			else if (id == 8) payment_type = 114;

			let url =
				'https://chatto.ru/pay?form=kassa&amount=' +
				amount +
				to +
				'&method=' +
				payment_type;
			window.open(url, '_blank');

			// let payment_url = `http://www.free-kassa.ru/merchant/cash.php?m=52496&oa=${amount}&o=${to}&s=2d1da68e45189bd822069cf75ca6686e&lang=ru`;
			// window.open(payment_url, "_blank");
		}
	},
	show: function (id, to) {
		if (id == 1) {
			// qiwi
			$('#donat_qiwi_wallet').show();
			$('#donat_wm_wallet').hide();
			$('#payment_btn').html(
				`<button class="btn green" onclick="donat.order(1)" style="top: 5px;display: block;width: 100%;padding-bottom: 3px;">Перейти к оплате</button>`,
			);
			$('#payment_nick').attr('oninput', '');
			$('#payment_value').val($('#payment_value_wm').val());
		} else if (id == 2) {
			// webmoney
			$('#donat_wm_wallet').show();
			$('#donat_qiwi_wallet').hide();
			$('#payment_value_wm').val($('#payment_value').val());

			let donat_nick;
			if ($('#payment_nick').val() !== '') {
				donat_nick = $('#payment_nick').val();
			} else {
				donat_nick = MY.login;
			}

			$('#payment_btn')
				.html(`<form method="POST" action="https://chatto.ru/pay?form=wm&amount=1">
			<input type="hidden" name="LMI_PAYMENT_NO" value="1">
			<input type="hidden" name="LMI_PAYMENT_AMOUNT" value="10">
			<input type="hidden" name="LMI_PAYMENT_DESC_BASE64" value="">
			<input type="hidden" name="LMI_PAYEE_PURSE" value="${donat.webmoney}">
			<input type="hidden" name="login_user" value="${donat_nick}">
			<button class="btn green" style="top: 5px;display: block;width: 100%;padding-bottom: 3px;">Перейти к оплате</button></form>`);
			$('#payment_nick').attr('oninput', 'donat.change(2)');
		} else if (id > 2) {
			$('#payment_btn').html(
				`<button class="btn green" onclick="donat.order(${id})" style="top: 5px;display: block;width: 100%;padding-bottom: 3px;">Перейти к оплате</button>`,
			);
		}
	},
	change: function (e) {
		if (e == 1) {
			$('#payment_btn > form > input[type=hidden]:nth-child(2)').val(
				$('#payment_value_wm').val(),
			);
		} else if (e == 2) {
			$('#payment_btn > form > input[type=hidden]:nth-child(5)').val(
				$('#payment_nick').val(),
			);
		}
	},
	nick: function (e) {
		if (e == 1) {
			$('#donat_nick').hide();
			$('#payment_btn > form > input[type=hidden]:nth-child(5)').val(MY.login);
		} else {
			$('#donat_nick').show();

			let donat_nick;
			if ($('#payment_nick').val() !== '') {
				donat_nick = $('#payment_nick').val();
			} else {
				donat_nick = MY.login;
			}
			$('#payment_btn > form > input[type=hidden]:nth-child(5)').val(donat_nick);
		}
	},
	kassa: function (e) {
		if (e == 1) {
			var value = `<iframe src="https://www.free-kassa.ru/merchant/forms.php?gen_form=1&m=52496&default-sum=10&button-text=Оплатить&encoding=CP1251&type=v3&id=362894" width="590" height="260" frameBorder="0" target="_parent" style="margin:-20px"></iframe>`;
			alert(value, '', '585px', '300px');
		} else {
			let html2 = `• Для пользователей Payeer, на сайте есть выбор отправки на Qiwi кошелёк (номер кошелька: +37369020199).
			<br>
			• Если вы хотите купить РУБ с баланс мобильного телефона, вам стоит написать администрации, принимаются только: MTC, МегаФон, Билайн. Стоит так же упомянуть что при покупке берётся дополнительная комиссия.
			<br>
			• Вы так же можете отправить на карту (VISA), номер карты: <u>4890 4943 7807 9479</u>. После отправки на карту, сохраняйте чек. для дальнейшей проверки. Так же после оплаты (если нет возможности ввести примечание) свяжитесь с администрацией, она обязательно вам ответят и зачислят начисления.
			<br>
			• Если вы хотите купить другими способами оплаты (которые тут не указаны)(оплата с баланса других операторов, банковских карт или другие) вы так же можете написать администрации, возможно они решат ваш вопрос и помогут вам.
			<br>`;
			alert(html2, '', '600px');
		}
	},
};

function window_buy() {
	$('#userLoading').show();
	if ($('#kry_buy').length) {
	} else {
		$('#all_alerts').append("<div class='mask' id='kry_buy'></div>");
	}

	let e = `

<div class="LabelText" style="top:16px">Платежи</div>
  <div class="chatto-bg window_donat">
  <div class="panel-inset">
  <div>
  <div></div>
  </div>
  <div style="position: relative;top: 8px;font-size: 14px;font-family: 'PT Sans',Arial,sans-serif;left: 10px;">Здесь вы можете приобрести валюту <span onclick="$('#buy_id_name').hide();">РУБ</span>, которая используется при покупке кристаллов, премиум аккаунта, золотых ящиков или другие платные вещи из магазина.</div>
  </div>
 
  <div style="margin-top:20px">
  <div class="buy_btns">
  <button class="btn_buy_qiwi_active" onclick="buy_tabs(1)"></button>
  <button class="btn_buy_wm" onclick="buy_tabs(2)"></button>
  <button class="btn_buy_yd" onclick="buy_tabs(3)"></button>
  <button class="btn_buy_other" onclick="buy_tabs(4)"></button>
  </div>

<div id="qiwi_content" style="margin-top:10px">

<div id="qiwiInstruction" style="display:none;">
<div style="font-family:'PT SANS',sans-serif;font-size:14px;">
<h2>Инструкция мгновенной оплаты QIWI</h2>
<div>
<div style="margin-top:5px">1. Выбирайте желаемое количество РУБ</div>
<div style="margin-top:5px">2. Нажмите Далее</div>
<div style="margin-top:5px">3. Оплачивайте</div>
<div style="margin-top:5px">4. После чего платеж сам проверяется и зачисляется на аккаунт!</div>
</div>
</div>
</div>
 
 
 
<div style="font-size:18px;font-family:'PT SANS';padding-bottom:5px;padding-left:5px;">Qiwi <span style="font-size: 14px;opacity: 0.6;">(автоматическое пополнение)</span></div>
<div class="wide-bg" style="width:100%;height: 14vh;overflow:hidden;font-size:13px;font-family:&quot;PT SANS&quot;;">
 <div style="padding:10px">
 <div style="
    background: url(../../assets/img/shop/qiwi.png);
    width: 90px;
    height: 90px;
    display: inline-block;
    float: left;margin-top:-10px;position: relative;
    left: -10px;
    margin-right: -10px;
"></div><div>«QIWI» – ведущий провайдер платёжных и финансовых сервисов нового поколения в России и странах СНГ. Qiwi Кошелёк легко пополнить в терминалах QIWI и партнёров, салонах сотовой связи, супермаркетах, банкоматах или через онлайн-банк. Оплачивать можно как кошельком так и картой.<br/>Внимание! Пополнение Qiwi осуществляется автоматически, вот подробная <a onclick="qiwi_instruction()">Инструкция</a>.<br/>Рекомендуем вам прочитать, по скольку это очень важно.</div></div>
 </div>
<div style="position:relative;">
<span style="position:absolute;left:8px;font-size:11px;top:20px;">Кол. РУБ: </span>
<input placeholder="Желаемое количество РУБ" id="Qnum" type="number" style="width:calc(100% - 105px);margin-bottom:5px;padding-left:80px;" class="text" min="1" max="1000000" oninput="Damount(this.value,'Qnum')" value="10" onclick="this.select()">	
<button class="btn_next1" onclick="qiwi_pay()" style="top:10px"></button>


</div>

<div style="display:none">
<a onclick="alert('<center><div style=\'color: #fff;font-size: 1.1em;position: relative;top: -10px;padding:5px;\'>Покупка РУБ</div></center><div><a style=\'font-size:15px\' target=\'_blank\' href=\'https://qiwi.me/tankichat?sum=100&amp;source=mobile&amp;ref=widget\'>• С баланса мобильного телефона</a><br/><a style=\'font-size:15px\' target=\'_blank\' href=\'https://qiwi.me/tankichat?sum=100&amp;source=qw&amp;ref=widget\'>• Visa QIWI Кошелек</a><br/><a style=\'font-size:15px\' target=\'_blank\' href=\'https://qiwi.me/tankichat?sum=100&amp;source=card&amp;ref=widget\'>• Банковской картой</a></div>');" style="top:10px;position:relative;float:right;">Оплатить через другие способы</a>
</div>
</div>

<div id="wm_content" style="display:none;margin-top:10px">
<div style="font-size:18px;font-family:'PT SANS';padding-bottom:5px;padding-left:5px;">WebMoney</div>
<div class="wide-bg" style="width:100%;height: 14vh;overflow:hidden;font-size:13px;font-family:&quot;PT SANS&quot;;">
 <div style="padding:20px;padding-top:15px;">
 <div style="
    background: url(../../assets/img/shop/webmoney.png);
    width: 65px;
    height: 65px;
    display: inline-block;
    float: left;margin-top:-5px;
    position: relative;
    left: -10px;
"></div><div>«WebMoney или WebMoney Transfer» — электронная система расчётов, основанная в 1998 году и принадлежащая WM Transfer Ltd. Нажмите на кнопку Далее и вы будете перенаправлены на сайт платежной системы, где нужно произвести оплату, указав сумму и самое важное комментарий (примечание) (если не указано).</div>
 </div>
 </div>
<div>
<span style="position:relative;left:8px;font-size:11px;top:20px;">Примечание: </span>
<input placeholder="Желаемое количество РУБ" type="text" style="width:100%;margin-bottom:5px;padding-left:80px;" class="text" value="[${MY.login}] Покупка РУБ для ChatTO!" onclick="this.select()" readonly=""/>
</div>
<div>
<span style="
position:  relative;
left: 8px;
font-size:  11px;
">Кошелек: </span>
<select class="select-option" style="margin-left: -51px;padding-left: 65px;" oninput="WMchange(this.value)">
          <option selected="selected" value="R317180445710">R317180445710</option>
          <option value="Z214364381103">Z214364381103</option>
          <option value="E20517099630">E20517099630</option>
          <option value="U264998132865">U264998132865</option>
          <option value="B205637436885">B205637436885</option>
      </select>
<span style="position:relative;left:8px;font-size:11px;">Кол. РУБ: </span>
<input id="Wnum" oninput="Damount(this.value,'Wnum');Wnum(this.value)" type="number" style="width:calc(100% - 205px);margin-bottom:5px;padding-left:70px;margin-left:-50px;" class="text" min="1" max="9999" value="10" onclick="this.select()">	
</div>

<div>
<form target="_blank" id="pay" name="pay" accept-charset="windows-1251" method="POST" action="https://merchant.wmtransfer.com/lmi/payment.asp">
    <input type="hidden" id="LMI_PAYMENT_AMOUNT" name="LMI_PAYMENT_AMOUNT" value="20.0">
    <input type="hidden" name="LMI_PAYMENT_DESC" value="[${MY.login}] Покупка РУБ для ChatTO!">
    <input type="hidden" id="LMI_PAYEE_PURSE" name="LMI_PAYEE_PURSE" value="R317180445710">
    <input type="submit" class="btn_next1" value="">
</form>
</div>
</div>

<div id="yd_content" style="display:none;margin-top:10px">
<div style="font-size:18px;font-family:'PT SANS';padding-bottom:5px;padding-left:5px;">Яндекс Деньги</div>
<div class="wide-bg" style="width:100%;height:14vh;overflow:hidden;font-size:13px;font-family:&quot;PT SANS&quot;;">
 <div style="padding:10px;">
 <div style="
    background: url(../../assets/img/shop/yandex.png);
    width: 49px;
    height: 65px;
    display: inline-block;
    float: left;margin-right:10px;margin-top: 0px;
    
"></div><div>«Яндекс.Деньги» — сервис электронных платежей в Рунете. Он позволяет принимать оплату электронными деньгами, наличными, с банковских карт. Пользоваться некоторыми возможностями можно также через мобильные приложения для Android, IOS, Windows Phone, а также приложением для Windows 8 и Windows RT. Нажмите на кнопку Далее и вы будете перенаправлены на сайт платежной системы, где нужно произвести оплату, указав сумму и самое важное комментарий (примечание) (если не указано).</div>
 </div>
 </div>
<div>
<span style="position:relative;left:8px;font-size:11px;top:20px;">Примечание: </span>
<input type="text" style="width:100%;margin-bottom:5px;padding-left:80px;" class="text" value="[${MY.login}] Покупка РУБ для ChatTO!" onclick="this.select()" readonly=""/>
</div>
<div style="margin-top:-12px">
<span style="position:relative;left:8px;font-size:11px;top:20px;">Кол. РУБ: </span>
<input placeholder="Желаемое количество РУБ" id="Ynum" type="number" style="width:100%;margin-bottom:5px;padding-left:80px;" class="text" min="1" max="9999" value="10" oninput="Damount(this.value,'Ynum');" onclick="this.select()">
</div>

<div>
<button class="btn_next1" onclick="yandex_pay()"></button>
</div>
</div>

<div id="other_content" style="display:none;margin-top:10px">
<div style="font-size:18px;font-family:'PT SANS';padding-bottom:5px;padding-left:5px;">Другое</div>
<div class="wide-bg" style="width:100%;height: 14vh;overflow:hidden;font-size:13px;font-family:&quot;PT SANS&quot;;">
 <div style="padding:10px;overflow: auto;height: calc(100% - 20px);">
 &bull; Для пользователей Payeer, на сайте есть выбор отправки на Qiwi кошелёк (номер кошелька: +37369020199) и не забываем про примечание.
 <br/>
 &bull; Если вы хотите купить РУБ с баланс мобильного телефона, вам стоит написать администрации, принимаются только: MTC, МегаФон, Билайн. Стоит так же упомянуть что при покупке берётся дополнительная комиссия.
 <br/>
 &bull; Вы так же можете отправить на карту (VISA), номер карты: <u>4890 4943 7807 9479</u>. После отправки на карту, сохраняйте чек. для дальнейшей проверки. Так же после оплаты (если нет возможности ввести примечание) свяжитесь с администрацией, она обязательно вам ответят и зачислят начисления.
 <br/>
 &bull; Если вы хотите купить другими способами оплаты (которые тут не указаны)(оплата с баланса других операторов, банковских карт или другие) вы так же можете написать администрации, возможно они решат ваш вопрос и помогут вам.
 <br/>
 
 <button class="btn" onclick="kassa()">Kassa</button>
 
 <script>
 function kassa(){
	 var value = '<iframe src="https://www.free-kassa.ru/merchant/forms.php?gen_form=1&m=52496&default-sum=10&button-text=Оплатить&encoding=CP1251&type=v3&id=362894" width="590" height="320" frameBorder="0" target="_parent" style="margin:-20px"></iframe>';
	 alert(value,'','600px','350px')
 }
 </script>
 
 </div>
 </div>
 
 <div>
<span style="position:relative;left:8px;font-size:11px;top:20px;">Примечание: </span>
<input type="text" style="width:100%;margin-bottom:5px;padding-left:80px;" class="text" value="[${MY.login}] Покупка РУБ для ChatTO!" onclick="this.select()" readonly=""/>
</div>
 <div>
 </div>
</div>
</div>
<div class="btn-inset" style="position: absolute;bottom: 40px;width: calc(100% - 60px);">
У вас проблема? Пишите в чат в обращение к администраторам или модераторам!
</div>

<div style="position: absolute;bottom: 5px;width: calc(100% - 18px);">
<a onclick="alert('Fload','../tmp/t_shop/ls.php','600px')" style="color:#50de30;text-decoration: underline;text-transform: uppercase;font-family: 'PT SANS', sans-serif;position: relative;top: 15px;">Пользовательское соглашение</a>

<button onclick="$('#kry_buy').hide();" class="btn_close" style="float:right;"></button>

</div>
</div>
<div onclick="$('#kry_buy').hide();" id="close_wbci" style="position: fixed;right: 12px;top: 12px;width: 30px;height: 30px;color: #fff;display:none;font-size: 40px;cursor:pointer;"><span style="position: relative;top: -5px;left: 2px;">&times;</span></div>
<script src="../assets/js/t_buy/index.js"></script>
`;

	//$load("#kry_buy","../../tmp/t_buy/window_buy_cry.php");
	$('#kry_buy').html(e);
	$('#kry_buy').fadeIn(100);
	$('#userLoading').hide();
}

function addMessage(id, msg) {
	if ($('.chtmsg[did="' + id + '"]').length !== 1) {
		$('#chat_messages').append(msg);
	}
}

function msgRemove(id, e) {
	if (e == 1) {
		$('#msg-' + id).remove();
	} else {
		$('#mymsg-' + id).remove();
	}
}

const CHATTO_smiles = [
	':)&smile1.png',
	';)&smile2.png',
	':(&smile3.png',
	'=|&smile4.png',
	':|&smile4.png',
	':P:&smile5.png',
	'=/&smile6.png',
	':O_o&smile7.png',
	':o_O&smile7.png',
	'/__/&smile8.png',
	'/___/&smile9.png',
	':00:&05.gif',
	':01:&02.gif',
	':02:&03.gif',
	':03:&04.gif',
	':04:&01.png',
	':05:&08.png',
	':06:&10.png',
	':like:&05.png',
	':dislike:&06.png',
	':power:&power.png',
	':hey:&07.png',
	':lol:&09.png',
	':love:&heart.png',
	':flower:&flower.png',
	':facepalm:&facepalm.png',
	':happy:&happy.png',
	':xD:&lol1.png',
	':xd:&lol1.png',
	':mm:&mm.png',
	':bravo:&11.png',
	':fire:&fire.png',
	':hearteyes:&hearteyes.png',
	':hm:&hm.png',
	':moon:&moon.png',
	':kiss:&kiss.png',
	':please:&please.png',
	':rainbow:&rainbow.png',
	':okey:&okey.png',
	':crying:&crying.png',
	':angel:&angel.png',
	':repost:&repost.png',
	':bee:&bee.png',
	':1st:&1st.png',
	':2rd:&2rd.png',
	':3rd:&3rd.png',
	':ghost:&ghost.png',
	':koko:&koko.png',
	':mouse:&mouse.png',
	':money:&money.png',
	':vs:&vs.png',
	':up:&up.png',
	':down:&down.png',
	':left:&left.png',
	':right:&right.png',
	':nowords:&nowords.png',
	':sun:&sun.png',
	':stars:&stars.png',
	':eyes:&eyes.png',
	':ura:&ura.png',
	':ops:&ops.png',
	':rock:&rock.png',
	':sos:&sos.png',
	':good:&good.png',
	':mobile:&mob1.png',
	':100:&100.png',
	':omg:&omg.png',
	':bell:&bell.png',
	':bheart:&bheart.png',
	':brheart:&brheart.png',
	':hmm:&hmm.png',
	':hstop:&hstop.png',
	':hz:&hz.png',
	':uraa:&uraa.png',
	':uuu:&uuu.png',
	':tired:&tired.png',
	':heh:&heh.png',
	':sad:&sad.png',
	':wow:&wow.png',
	':drunk:&drunk.png',
	':yee:&yee.png',
	':moneyy:&moneyy.png',
	':think:&think.png',
	':funny:&funny.png',
	':stone:&stone.png',
	':eyy:&eyy.png',
	':pin:&pin.png',
	':boom:&boom.png',
	':100:&100.png',
];

const CHATTO_COMMANDS = [
	'#rules&Правила&rules()',
	'#smiles&Смайлы&smiles()',
	'#help&Помощь&help()',
	"#vk&Наша группа вк&window.open('https://vk.com/chatto_ru','_blank')",
	'#shop&Магазин&shop()',
	'#rub&Покупка РУБ&donat.window()',
	'#donat&Покупка РУБ&donat.window()',
	'#settings&Настройки&window_settings()',
	'#updates&Обновления&updates()',
	'#online&Онлайн&online()',
	'#admins&Администрация&load_page(9,0)',
	'#lottery&Лотерея&LotoL()',
	'#loto&Лотерея&LotoL()',
	'#news&Новости&cChat(1)',
	'#friends&Друзья&friends()',
	'#clans&Кланы&getclans()',
	'#fullscreen&Войти в полноэкранный режим&toggleFullScreen()',
	'#ranks&Таблица званий&load_page(12,0)',
	'#звания&Таблица званий&load_page(12,0)',
	'#ads&Реклама&load_page(15,1)',
	'#chatscreensize&Разрешение экрана&load_page(13,0)',
	'#other&Прочее&load_page(4,0)',
	'#youtube&YouTube&load_page(14,0)',
	"#ratings&Рейтинги&window.open('/ratings','_blank')",
	'#challenges&Челлендж&tasks_challenges()',
	'#uchallenges&Игроки в челлендже&p_challenges()',
	'#tasks&Задания&window_tasks()',
	'#tournaments&Еженедельные турниры&tasks_tournaments()',
	"#chatto_donations&Пожертвования&window.open('/donations','_blank')",
	"#crazyweekend&Безумные выходные&window.open('/crazyweekend','_blank')",
	'#exit&Выйти&game_exit()',
	"#appapk&Приложение для андроид&document.location.href='/chatto.apk'",
	'#вshop&Магазине&shop()',
	'#вadmins&Администрацию&load_page(9,0)',
	"@Ник&Профиль пользователя&profile('chatto.ru')",
	"@@Ник&Профиль пользователя&profile('chatto.ru')",
];

const CHATTO_COMMANDS1 = [
	'/rules&Открыть правила',
	'/smiles&Открыть смайлы',
	'/u логин&Просмотр профиля пользователя',
	'/g логин&Просмотр гараж пользователя',
	'/ignore логин&Игнорирование пользователя',
	'/promocode&Открыть окно создание промокодов',
	'/transfer логин кри&Перевод кристаллов',
	'/trsf логин кри&Перевод кристаллов',
	'/time&Показать текущее время чата',
	'/howmuch логин&Узнать сколько зарабатывает пользователь за сообщение',
	'/paint имя&Быстрый поиск по краскам в гараже',
	'/vibrate значение&Включить вибрацию когда поступают новые смс (работает только в приложении), в качестве второго параметра указывайте 1 или 0 (вкл. или откл.)',
	'/blackbg&Делает фон чата чёрным',
	'/video link&Создать ссылку для просмотра видео',
	'/iFrame link&Создать ссылку для просмотра внешних ссылок в чате',
	'/uchallenges&Открыть список игроков с челленджа',
	'/showgarage&Показать viewer гаража в независимости скрыт ли он в настройках или нет',
	'/msvol значение&Изменить громкость песен в чате, в качестве второго параметра указывайте громкость (от 0 до 100) (в процентах)',
];

function showWeather() {
	addMsg(
		'<iframe src="https://chatto.ru/tests/weather.html" style="width:100%;height: 50px;border-radius:5px;border:none;"></iframe>',
	);
}

var ignore_users = [];

function ignore(login) {
	if (ignore_users.indexOf(login) > 0) {
		alert('Данный пользователь уже добавлен в игнор!');
		return false;
	}

	if (ignore_users.indexOf(login) === -1) ignore_users.push(login);

	$("msg[by='" + login + "']").html('Скрытое сообщение пользователя ' + login + '!');
	$("msg[by='" + login + "']").attr(
		'style',
		'background-color:rgba(0,0,0,0.2);font-weight:bold;padding:3px;color:limegreen;',
	);
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
			'Скрытое сообщение пользователя ' + ignore_users[i] + '!',
		);
		$("msg[by='" + ignore_users[i] + "']").attr(
			'style',
			'background-color:rgba(0,0,0,0.2);font-weight:bold;padding:3px;color:limegreen;',
		);
	}
}

function ignor(id) {
	let igU = '';
	for (let e in ignore_users) {
		if (ignore_users[e] == undefined) continue;
		igU += `<tr id="ignore-${ignore_users[e]}"><td style="text-align:left;padding:8px;"><a onclick="profile('${ignore_users[e]}')">${ignore_users[e]}</a></td>
		<td><a onclick="removeIgnore('${ignore_users[e]}',1)" style="color:#12ff00;text-decoration:none;">Удалить</a></td></tr>`;
	}
	let d = `<table class="mdn-table"><thead><tr><th style="text-align:left;">Пользователь</th><th style="width: 100px;">Действия</th></tr></thead><tbody>${igU}</tbody></table>
 
 <div class="chatto-bg" style="height: auto;margin: -10px;margin-bottom: -15px;margin-top: 20px;">
<button class="btn green" onclick="ignor(1)" style="width: 100%;">Добавить</button>
</div>
 `;

	if (id == 1) {
		alertify.prompt(
			'Введите ник пользователя которого хотите игнорировать!',
			function (evt, value) {
				let IgnorL = $('#alertifytext').val();
				if (IgnorL) {
					if (IgnorL.length >= 30) {
						alert('Неверный логин!');
					} else if (IgnorL == MY.login) {
						alert('Вы пытаетесь себя игнорировать!');
					} else if (IgnorL == 'sys') {
						alert('Вы пытаетесь игнорировать систему!');
					} else {
						ignore(IgnorL);
						alert('Пользователь ' + IgnorL + ' успешно добавлен в игнор!');
					}
				}
			},
		);
	} else {
		alert(d);
	}
}

var highlight_user;
function highlight(login) {
	if (login !== 0) {
		$("msg[by='" + login + "']:not(.hightlight)").addClass('hightlight');
		highlight_user = login;
	} else {
		$("msg[by='" + login + "']:not(.hightlight)").removeClass('hightlight');
		highlight_user = '';
	}
}

function autoHightlight() {
	if (highlight_user)
		$("msg[by='" + highlight_user + "']:not(.hightlight)").addClass('hightlight');
}

function process(data) {
	/* Ranks */
	data = data.replace(/{:rank(\d.*?):}/g, ' <i class="rank r$1"></i> ');

	/* Ranks with logins */
	data = data.replace(
		/\{:chatto-rank=(\d.*?)=(.*?)\:}/g,
		'<i class="rank r$1" onclick="profile(\'$2\')"></i>',
	);
	data = data.replace(
		/\{:chatto-rank=V(\d.*?)=(.*?)\:}/g,
		'<i class="rank rv$1" onclick="profile(\'$2\')"></i>',
	);

	/* Ranks with logins user */
	data = data.replace(
		/\{:chatto-urank=(\d.*?)=(.*?)\:}/g,
		'<user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user>',
	);
	data = data.replace(
		/\{:chatto-urank=V(\d.*?)=(.*?)\:}/g,
		'<user><i class="rank rv$1" onclick="profile(\'$2\')"></i>$2</user>',
	);

	data = data.replace(
		/\{:c-u=(\d.*?)=(.*?)\:}/g,
		'<user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user>',
	);
	data = data.replace(
		/\{:c-u=V(\d.*?)=(.*?)\:}/g,
		'<user><i class="rank rv$1" onclick="profile(\'$2\')"></i>$2</user>',
	);

	// Smart Shorcuts
	data = data.replace(
		/\{:cCont=(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user> открыл <b>«$3»</b> и получил <span style="color:yellow">$4</span>',
	);
	data = data.replace(
		/\{:cCont=V(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank rv$1" onclick="profile(\'$2\')"></i>$2</user> открыл <b>«$3»</b> и получил <span style="color:yellow">$4</span>',
	);

	data = data.replace(
		/\{:cShopB=(\d.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user> <a onclick="shop()" style="color:#80FF80">купил</a> <span style="color:yellow">$3</span>',
	);
	data = data.replace(
		/\{:cShopB=V(\d.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank rv$1" onclick="profile(\'$2\')"></i>$2</user> <a onclick="shop()" style="color:#80FF80">купил</a> <span style="color:yellow">$3</span>',
	);

	data = data.replace(
		/\{:cPromo=(\d.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user> активировал промо-код и получил <span style="color:yellow">$3</span>',
	);
	data = data.replace(
		/\{:cPromo=V(\d.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank rv$1" onclick="profile(\'$2\')"></i>$2</user> активировал промо-код и получил <span style="color:yellow">$3</span>',
	);

	data = data.replace(
		/\{:cPromoB=(\d.*?)=(.*?)=(.*?)\:}/g,
		'<user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user> купил подарочную карту номиналом в <span style="color:yellow">$3</span>',
	);
	data = data.replace(
		/\{:cPromoB=V(\d.*?)=(.*?)=(.*?)\:}/g,
		'<user><i class="rank rv$1" onclick="profile(\'$2\')"></i>$2</user> купил подарочную карту номиналом в <span style="color:yellow">$3</span>',
	);

	data = data.replace(
		/\{:cPromoA=(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user> активировал $3 подарочную карту и получил <span style="color:yellow">$4</span>',
	);
	data = data.replace(
		/\{:cPromoA=V(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank rv$1" onclick="profile(\'$2\')"></i>$2</user> активировал $3 подарочную карту и получил <span style="color:yellow">$4</span>',
	);

	data = data.replace(
		/\{:cPromoA1=(\d.*?)=(.*?)=V(\d.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user> активировал подарочную карту пользователя <user><i class="rank rv$3" onclick="profile(\'$4\')"></i>$4</user> и получил <span style="color:yellow">$5</span>',
	);
	data = data.replace(
		/\{:cPromoA1=(\d.*?)=(.*?)=(\d.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user> активировал подарочную карту пользователя <user><i class="rank r$3" onclick="profile(\'$4\')"></i>$4</user> и получил <span style="color:yellow">$5</span>',
	);

	data = data.replace(
		/\{:cPromoA1=V(\d.*?)=(.*?)=(\d.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank rv$1" onclick="profile(\'$2\')"></i>$2</user> активировал подарочную карту пользователя <user><i class="rank r$3" onclick="profile(\'$4\')"></i>$4</user> и получил <span style="color:yellow">$5</span>',
	);
	data = data.replace(
		/\{:cPromoA1=V(\d.*?)=(.*?)=V(\d.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank rv$1" onclick="profile(\'$2\')"></i>$2</user> активировал подарочную карту пользователя <user><i class="rank rv$3" onclick="profile(\'$4\')"></i>$4</user> и получил <span style="color:yellow">$5</span>',
	);

	/*
	data = data.replace(/\{:cTrnsf=(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)\:}/g,"Пользователь <user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user> перевёл <span style=\"color:yellow\">$3 <img src=\"../assets/img/kry.png\"></span> пользователю <user><i class=\"rank r$4\" onclick=\"profile('$5')\"></i>$5</user>");
	data = data.replace(/\{:cTrnsf=V(\d.*?)=(.*?)=(\d.*?)=V(\d.*?)=(.*?)\:}/g,"Пользователь <user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user> перевёл <span style=\"color:yellow\">$3 <img src=\"../assets/img/kry.png\"></span> пользователю <user><i class=\"rank rv$4\" onclick=\"profile('$5')\"></i>$5</user>");
	*/

	data = data.replace(
		/\{:cClanD=(\d.*?)=(.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user> пожертвовал <span style="color:yellow">$3 <img src="../assets/img/kry.png"></span> клану <a style="color:limegreen" onclick="clan($5)">$4</a>',
	);
	data = data.replace(
		/\{:cClanD=V(\d.*?)=(.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank rv$1" onclick="profile(\'$2\')"></i>$2</user> пожертвовал <span style="color:yellow">$3 <img src="../assets/img/kry.png"></span> клану <a style="color:limegreen" onclick="clan($5)">$4</a>',
	);

	data = data.replace(
		/\{:cClanG=(\d.*?)=(.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user> получил <span style="color:yellow">$3 <img src="../assets/img/kry.png"></span> из капитала <a style="color:limegreen" onclick="clan($4)">[$5]</a>',
	);
	data = data.replace(
		/\{:cClanG=V(\d.*?)=(.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank rv$1" onclick="profile(\'$2\')"></i>$2</user> получил <span style="color:yellow">$3 <img src="../assets/img/kry.png"></span> из капитала <a style="color:limegreen" onclick="clan($4)">[$5]</a>',
	);

	data = data.replace(
		/\{:cUban=(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user> лишен права выхода в эфир $3. Причина: $4, см. <a style="color:#80FF80" onclick="rules()">Правила</a>',
	);
	data = data.replace(
		/\{:cUban=V(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank rv$1" onclick="profile(\'$2\')"></i>$2</user> лишен права выхода в эфир $3. Причина: $4, см. <a style="color:#80FF80" onclick="rules()">Правила</a>',
	);

	data = data.replace(
		/\{:cDBonus=(\d.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user> получил ежедневный бонус в размере <span style="color:yellow">$3</span>',
	);
	data = data.replace(
		/\{:cDBonus=V(\d.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank rv$1" onclick="profile(\'$2\')"></i>$2</user> получил ежедневный бонус в размере <span style="color:yellow">$3</span>',
	);

	data = data.replace(
		/\{:cTask=(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user> выполнил ежедневное задание <b>«$3»</b> и получил <span style="color:yellow">$4</span>',
	);
	data = data.replace(
		/\{:cTask=V(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank rv$1" onclick="profile(\'$2\')"></i>$2</user> выполнил ежедневное задание <b>«$3»</b> и получил <span style="color:yellow">$4</span>',
	);

	data = data.replace(
		/\{:cLoto=(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank r$1" onclick="profile(\'$2\')"></i>$2</user> поставил <span style="color:yellow">$3 <img src="../assets/img/kry.png"></span> на <a style="color:limegreen" onclick="LotoL()">$4</a>',
	);
	data = data.replace(
		/\{:cLoto=V(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'Пользователь <user><i class="rank rv$1" onclick="profile(\'$2\')"></i>$2</user> поставил <span style="color:yellow">$3 <img src="../assets/img/kry.png"></span> на <a style="color:limegreen" onclick="LotoL()">$4</a>',
	);

	// Smart Shorcuts OFF

	/* Another */

	//BOT
	data = data.replace(
		/\{:chatto-bot:}/g,
		'<img class="rank" src="../assets/rank/smiles/starr.png"><span style="color:#cddc39;font-weight:bold;" onclick="tologin(\'ChatBot\')">ChatBot</span>',
	);

	/* Ranks with logins url */
	data = data.replace(
		/\{:chatto-rank-(\d.*?)=(.*?)=(.*?)\:}/g,
		'<i class="rank r$1" onclick="profile(\'$2\')"></i><span style="color:#12ff00;" onclick="tologin(\'$2\')">$2 ($3)</span> <a onclick="pm(\'$2\')" class="name pm">[PM]</a>',
	);
	data = data.replace(
		/\{:chatto-rank-V(\d.*?)=(.*?)=(.*?)\:}/g,
		'<i class="rank rv$1" onclick="profile(\'$2\')"></i><span style="color:#12ff00;" onclick="tologin(\'$2\')">$2 ($3)</span> <a onclick="pm(\'$2\')" class="name pm">[PM]</a>',
	);

	// USER

	data = data.replace(
		/\{:chatto-user-(\d.*?)=(.*?)=(\d.*?)\:}/g,
		'<i class="rank r$1" onclick="profile(\'$2\')"></i><span class="name" onclick="tologin(\'$2\')">$2 ($3)</span> <a onclick="pm(\'$2\')" class="name pm">[PM]</a>',
	);
	data = data.replace(
		/\{:chatto-user-V(\d.*?)=(.*?)=(\d.*?)\:}/g,
		'<i class="rank rv$1" onclick="profile(\'$2\')"></i><span class="name" onclick="tologin(\'$2\')">$2 ($3)</span> <a onclick="pm(\'$2\')" class="name pm">[PM]</a>',
	);

	data = data.replace(
		/\{:cU-(\d.*?)=(.*?)=(\d.*?)\:}/g,
		'<i class="rank r$1" onclick="profile(\'$2\')"></i><span class="name" onclick="tologin(\'$2\')">$2 ($3)</span> <a onclick="pm(\'$2\')" class="name pm">[PM]</a>',
	);
	data = data.replace(
		/\{:cU-V(\d.*?)=(.*?)=(\d.*?)\:}/g,
		'<i class="rank rv$1" onclick="profile(\'$2\')"></i><span class="name" onclick="tologin(\'$2\')">$2 ($3)</span> <a onclick="pm(\'$2\')" class="name pm">[PM]</a>',
	);

	data = data.replace(
		/\{:cU1-(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)=(.*?)\:}/g,
		'<i class="rank r$1" onclick="profile(\'$2\')"></i>$6<div onclick="clan($4)" class="clan">[$5]</div><span class="name" onclick="tologin(\'$2\')">$2 ($3)</span> <a onclick="pm(\'$2\')" class="name pm">[PM]</a>',
	);
	data = data.replace(
		/\{:cU1-V(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)=(.*?)\:}/g,
		'<i class="rank rv$1" onclick="profile(\'$2\')"></i>$6<div onclick="clan($4)" class="clan">[$5]</div><span class="name" onclick="tologin(\'$2\')">$2 ($3)</span> <a onclick="pm(\'$2\')" class="name pm">[PM]</a>',
	);

	data = data.replace(
		/\{:cU2-(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)\:}/g,
		'<i class="rank r$1" onclick="profile(\'$2\')"></i><div onclick="clan($4)" class="clan">[$5]</div><span class="name" onclick="tologin(\'$2\')">$2 ($3)</span> <a onclick="pm(\'$2\')" class="name pm">[PM]</a>',
	);
	data = data.replace(
		/\{:cU2-V(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)\:}/g,
		'<i class="rank rv$1" onclick="profile(\'$2\')"></i><div onclick="clan($4)" class="clan">[$5]</div><span class="name" onclick="tologin(\'$2\')">$2 ($3)</span> <a onclick="pm(\'$2\')" class="name pm">[PM]</a>',
	);

	data = data.replace(
		/\{:cU3-(\d.*?)=(.*?)=(\d.*?)=(.*?)\:}/g,
		'<i class="rank r$1" onclick="profile(\'$2\')"></i>$4<span class="name" onclick="tologin(\'$2\')">$2 ($3)</span> <a onclick="pm(\'$2\')" class="name pm">[PM]</a>',
	);
	data = data.replace(
		/\{:cU3-V(\d.*?)=(.*?)=(\d.*?)=(.*?)\:}/g,
		'<i class="rank rv$1" onclick="profile(\'$2\')"></i>$4<span class="name" onclick="tologin(\'$2\')">$2 ($3)</span> <a onclick="pm(\'$2\')" class="name pm">[PM]</a>',
	);

	// USER MENU (NEW)
	data = data.replace(
		/\{:chatto-muser-(\d.*?)=(.*?)=(\d.*?)\:}/g,
		'<i class="rank r$1" onclick="profile(\'$2\')"></i><span class="name" onclick="tologin(\'$2\',$1,0)">$2 ($3)</span>',
	);
	data = data.replace(
		/\{:chatto-muser-V(\d.*?)=(.*?)=(\d.*?)\:}/g,
		'<i class="rank rv$1" onclick="profile(\'$2\')"></i><span class="name" onclick="tologin(\'$2\',$1,1)">$2 ($3)</span>',
	);

	data = data.replace(
		/\{:chatto-muser1-(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)=(.*?)\:}/g,
		'<i class="rank r$1" onclick="profile(\'$2\')"></i>$6<div onclick="clan($4)" class="clan">[$5]</div><span class="name" onclick="tologin(\'$2\',$1,0,\'$5\')">$2 ($3)</span>',
	);
	data = data.replace(
		/\{:chatto-muser1-V(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)=(.*?)\:}/g,
		'<i class="rank rv$1" onclick="profile(\'$2\')"></i>$6<div onclick="clan($4)" class="clan">[$5]</div><span class="name" onclick="tologin(\'$2\',$1,1,\'$5\')">$2 ($3)</span>',
	);

	data = data.replace(
		/\{:chatto-muser2-(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)\:}/g,
		'<i class="rank r$1" onclick="profile(\'$2\')"></i><div onclick="clan($4)" class="clan">[$5]</div><span class="name" onclick="tologin(\'$2\',$1,0,\'$5\')">$2 ($3)</span>',
	);
	data = data.replace(
		/\{:chatto-muser2-V(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)\:}/g,
		'<i class="rank rv$1" onclick="profile(\'$2\')"></i><div onclick="clan($4)" class="clan">[$5]</div><span class="name" onclick="tologin(\'$2\',$1,1,\'$5\')">$2 ($3)</span>',
	);

	data = data.replace(
		/\{:chatto-muser3-(\d.*?)=(.*?)=(\d.*?)=(.*?)\:}/g,
		'<i class="rank r$1" onclick="profile(\'$2\')"></i>$4<span class="name" onclick="tologin(\'$2\',$1,0,\'$5\')">$2 ($3)</span>',
	);
	data = data.replace(
		/\{:chatto-muser3-V(\d.*?)=(.*?)=(\d.*?)=(.*?)\:}/g,
		'<i class="rank rv$1" onclick="profile(\'$2\')"></i>$4<span class="name" onclick="tologin(\'$2\',$1,1,\'$5\')">$2 ($3)</span>',
	);

	//uuu
	data = data.replace(
		/\{:chatto-uuser-(\d.*?)=(.*?)=(\d.*?)\:}/g,
		'<i class="rank r$1" onclick="profile(\'$2\')"></i><span class="name" onclick="tologin(\'$2\')">$2</span>',
	);
	data = data.replace(
		/\{:chatto-uuser-V(\d.*?)=(.*?)=(\d.*?)\:}/g,
		'<i class="rank rv$1" onclick="profile(\'$2\')"></i><span class="name" onclick="tologin(\'$2\')">$2</span>',
	);

	data = data.replace(
		/\{:chatto-uuser1-(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)=(.*?)\:}/g,
		'<i class="rank r$1" onclick="profile(\'$2\')"></i>$6<div onclick="clan($4)" class="clan">[$5]</div><span class="name" onclick="tologin(\'$2\')">$2</span>',
	);
	data = data.replace(
		/\{:chatto-uuser1-V(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)=(.*?)\:}/g,
		'<i class="rank rv$1" onclick="profile(\'$2\')"></i>$6<div onclick="clan($4)" class="clan">[$5]</div><span class="name" onclick="tologin(\'$2\')">$2</span>',
	);

	data = data.replace(
		/\{:chatto-uuser2-(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)\:}/g,
		'<i class="rank r$1" onclick="profile(\'$2\')"></i><div onclick="clan($4)" class="clan">[$5]</div><span class="name" onclick="tologin(\'$2\')">$2</span>',
	);
	data = data.replace(
		/\{:chatto-uuser2-V(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)\:}/g,
		'<i class="rank rv$1" onclick="profile(\'$2\')"></i><div onclick="clan($4)" class="clan">[$5]</div><span class="name" onclick="tologin(\'$2\')">$2</span>',
	);

	data = data.replace(
		/\{:chatto-uuser3-(\d.*?)=(.*?)=(\d.*?)=(.*?)\:}/g,
		'<i class="rank r$1" onclick="profile(\'$2\')"></i>$4<span class="name" onclick="tologin(\'$2\')">$2</span>',
	);
	data = data.replace(
		/\{:chatto-uuser3-V(\d.*?)=(.*?)=(\d.*?)=(.*?)\:}/g,
		'<i class="rank rv$1" onclick="profile(\'$2\')"></i>$4<span class="name" onclick="tologin(\'$2\')">$2</span>',
	);

	/* Ranks with logins to url */
	data = data.replace(
		/{:cUT-(\d.*?)=(.*?):}/g,
		'<font color="#12ff00"> &ndash; </font><i class="rank r$1" onclick="profile(\'$2\')"></i><span class="name" onclick="tologin(\'$2\',$1,0)">$2:</span>',
	);
	data = data.replace(
		/{:cUT-V(\d.*?)=(.*?):}/g,
		'<font color="#12ff00"> &ndash; </font><i class="rank rv$1" onclick="profile(\'$2\')"></i><span class="name" onclick="tologin(\'$2\',$1,1)">$2:</span>',
	);

	/* Smiles */
	let smiles_len = CHATTO_smiles.length;
	for (let i = 0; i < smiles_len; i++) {
		let j = CHATTO_smiles[i].split('&');
		j[0] = j[0].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
		let re = new RegExp(j[0], 'g');
		data = data.replace(re, ` <img src="../assets/rank/smiles/${j[1]}"/> `);
	}

	data = data.replace(/:kpass:/g, ' <img src="../assets/img/garage/kpass.png" height=\'16px\'> ');
	data = data.replace(/:kry:/g, ' <img src="../assets/img/kry.png"> ');
	data = data.replace(
		/:premium:/g,
		' <img src="../assets/img/premium.png" style="height:16px"> ',
	);
	/* Smiles */

	/* Icons */
	data = data.replace(/{:cPr1:}/g, "<div class='group-icon pr1' t='STAR иконка'></div>");
	data = data.replace(/{:cPr2:}/g, "<div class='group-icon pr2' t='Удивлён иконка'></div>");
	data = data.replace(/{:cPr3:}/g, "<div class='group-icon pr3' t='Весёлый иконка'></div>");
	data = data.replace(/{:cPr5:}/g, "<div class='group-icon pr5' t='Yin Yang иконка'></div>");
	data = data.replace(
		/{:cPr3=(.*?):}/g,
		"<div onclick=\"window.open('$1')\" class='group-icon pr4' t='YouTube иконка'></div>",
	);
	data = data.replace(/{:cPr7:}/g, "<div class='group-icon pr7' t='iSTAR иконка'></div>");
	data = data.replace(/{:cPr8:}/g, "<div class='group-icon pr8' t='Panda иконка'></div>");
	data = data.replace(/{:cPr10:}/g, "<div class='group-icon pr10' t='Шпион иконка'></div>");

	data = data.replace(
		/{:cAdmin-dev:}/g,
		"<div class='group-icon icons icon-admin' t='Администратор чата'></div><div class='group-icon icon-dev' t='Разработчик'></div>",
	);
	data = data.replace(
		/{:cAdminb:}/g,
		"<div class='group-icon icons icon-adminb' t='Администратор/создатель/разработчик чата'></div>",
	);
	data = data.replace(
		/{:cAdmin:}/g,
		"<div class='group-icon icons icon-admin' t='Администратор чата'></div>",
	);
	data = data.replace(
		/{:cAdmin0:}/g,
		"<div class='group-icon icons icon-adminb' t='Администратор чата'></div>",
	);
	data = data.replace(
		/{:cModer:}/g,
		"<div class='group-icon icons icon-moderator' t='Модератор чата'></div>",
	);
	data = data.replace(
		/{:cModerb:}/g,
		"<div class='group-icon icons icon-moderb' t='Модератор чата'></div>",
	);
	data = data.replace(
		/{:cHelper:}/g,
		"<div class='group-icon icons icon-helper' t='Кандидат'></div>",
	);
	data = data.replace(/{:cSystem:}/g, "<div class='group-icon icons icon-sys' t='System'></div>");

	data = data.replace(
		/{:cAdmin-dev}/g,
		"<div class='group-icon icons icon-admin' t='Администратор чата'></div><div class='group-icon icon-dev' t='Разработчик'></div>",
	);
	data = data.replace(
		/{:cAdminb}/g,
		"<div class='group-icon icons icon-adminb' t='Администратор/создатель/разработчик чата'></div>",
	);
	data = data.replace(
		/{:cAdmin0}/g,
		"<div class='group-icon icons icon-adminb' t='Администратор чата'></div>",
	);
	data = data.replace(/{:cSystem}/g, "<div class='group-icon icons icon-sys' t='System'></div>");
	data = data.replace(
		/{:cAdmin}/g,
		"<div class='group-icon icons icon-admin' t='Администратор чата'></div>",
	);
	data = data.replace(
		/{:cModer}/g,
		"<div class='group-icon icons icon-moderator' t='Модератор чата'></div>",
	);
	data = data.replace(
		/{:cHelper}/g,
		"<div class='group-icon icons icon-helper' t='Кандидат'></div>",
	);
	data = data.replace(
		/{:cModerb}/g,
		"<div class='group-icon icons icon-moderb' t='Модератор, старейшина'></div>",
	);

	/* Icons */

	/* Other */
	data = data.replace(/\{:chatto-user=(.*?)\:}/g, '<span style="color:orange">$1</span>');

	data = data.replace(/\{:chatto-color=(.*?)=(.*?)\:}/g, '<span style="color:$1">$2</span>');
	data = data.replace(/\{:chatto-yellow=(.*?)\:}/g, '<span style="color:yellow">$1</span>');
	data = data.replace(/\{:chatto-orange=(.*?)\:}/g, '<span style="color:orange">$1</span>');

	data = data.replace(/\{:cYellow=(.*?)\:}/g, '<span style="color:yellow">$1</span>');
	data = data.replace(/\{:cOrange=(.*?)\:}/g, '<span style="color:orange">$1</span>');

	// Links
	data = data.replace(/{:cAclck=(.*?)=(.*?)}/g, '<a onclick="$1">$2</a>');
	data = data.replace(/{:cAhrefB=(.*?)=(.*?)}/g, '<a href="$1" target=\'_blank\'>$2</a>');
	data = data.replace(/{:cAhref=(.*?)=(.*?)}/g, '<a href="$1">$2</a>');

	data = data.replace(
		/\{:chatto-url=(.*?)=(.*?)\:}/g,
		'<a href="$2" style="color:limegreen" target="_blank">$1</a>',
	);
	data = data.replace(
		/\{:chatto-urlc=(.*?)=(.*?)\:}/g,
		'<a onclick="$2" style="color:limegreen">$1</a>',
	);

	data = data.replace(/\{:c-url=(.*?)=(.*?)\:}/g, '<a href="$2" target="_blank">$1</a>');
	data = data.replace(/\{:c-urlc=(.*?)=(.*?)\:}/g, '<a onclick="$2">$1</a>');

	data = data.replace(
		/\{:c-o=(.*?)\:}/g,
		'<a onclick="openlink(\'$1\')" title="Переход по внешней ссылке">$1</a>',
	);

	data = data.replace(
		/\{:c-cl=(.*?)=(.*?)\:}/g,
		'<a onclick="clan(\'$1\')" style="color:#a8f352">$2</a>',
	);

	data = data.replace(
		/\{:c-up1=(.*?)\:}/g,
		'<span class="m-us" onclick="profile(\'$1\')">$1</span>',
	);
	data = data.replace(
		/\{:c-up2=(.*?)=(.*?)\:}/g,
		'<span class="m-us" onclick="profile(\'$1\')">$2</span>',
	);
	data = data.replace(
		/\{:c-up3=(.*?)\:}/g,
		'<a onclick="profile(\'$1\')" style="color:orange;">$1</a>',
	);
	data = data.replace(/\{:c-up=(.*?)\:}/g, '<a onclick="profile(\'$1\')">$1</a>');

	// Shortcuts
	data = data.replace(
		/\{:c-w=(.*?)\:}/g,
		'<span style="color:yellow">$1 <img src="../assets/img/kry.png"></span>',
	);
	data = data.replace(/\{:c-w1=(.*?)\:}/g, '<span style="color:yellow">$1</span>');

	data = data.replace(
		/{:chatto-url-rules:}/g,
		'<a style="color:limegreen" onclick="rules()">Правила</a>',
	);
	data = data.replace(
		/{:chatto-url-shop:}/g,
		'<a style="color:limegreen" onclick="shop();">Магазин</a>',
	);
	data = data.replace(
		/{:chatto-url-buy:}/g,
		'<a style="color:limegreen" onclick="donat.window()">Покупка РУБ</a>',
	);
	data = data.replace(
		/{:chatto-url-vk:}/g,
		'<a style="color:limegreen" href="https://vk.com/chatto_ru" target="_BLANK">Наша группа Вк</a>',
	);
	data = data.replace(
		/{:chatto-url-help:}/g,
		'<a style="color:limegreen" onclick="help()">Помощь</a>',
	);
	data = data.replace(
		/{:chatto-url-help_us:}/g,
		'<a style="color:limegreen" onclick="help_us()">Поддержи чат</a>',
	);
	data = data.replace(
		/{:chatto-url-ads:}/g,
		'<a style="color:limegreen" onclick="load_page(15,1);">Реклама</a>',
	);
	data = data.replace(
		/{:chatto-url-updates:}/g,
		'<a style="color:limegreen" onclick="load_page(11,1);">Обновления</a>',
	);

	data = data.replace(
		/{:chatto-surl-rules:}/g,
		"<div class='group-icon icons icon-sys' t='System'></div><span style='color:yellow'>[SYSTEM]: </span> <a style=\"color:limegreen\" onclick=\"rules()\">Правила</a>",
	);
	data = data.replace(
		/{:chatto-surl-shop:}/g,
		"<div class='group-icon icons icon-sys' t='System'></div><span style='color:yellow'>[SYSTEM]: </span> <a style=\"color:limegreen\" onclick=\"shop();\">Магазин</a>",
	);
	data = data.replace(
		/{:chatto-surl-buy:}/g,
		"<div class='group-icon icons icon-sys' t='System'></div><span style='color:yellow'>[SYSTEM]: </span> <a style=\"color:limegreen\" onclick=\"donat.window()\">Покупка РУБ</a>",
	);
	data = data.replace(
		/{:chatto-surl-vk:}/g,
		'<div class=\'group-icon icons icon-sys\' t=\'System\'></div><span style=\'color:yellow\'>[SYSTEM]: </span> <a style="color:limegreen" href="https://vk.com/chatto_ru" target="_BLANK">Наша группа Вк</a>',
	);
	data = data.replace(
		/{:chatto-surl-help:}/g,
		"<div class='group-icon icons icon-sys' t='System'></div><span style='color:yellow'>[SYSTEM]: </span> <a style=\"color:limegreen\" onclick=\"help()\">Помощь</a>",
	);
	data = data.replace(
		/{:chatto-surl-help_us:}/g,
		"<div class='group-icon icons icon-sys' t='System'></div><span style='color:yellow'>[SYSTEM]: </span> <a style=\"color:limegreen\" onclick=\"help_us()\">Поддержи чат</a>",
	);
	data = data.replace(
		/{:chatto-surl-ads:}/g,
		"<div class='group-icon icons icon-sys' t='System'></div><span style='color:yellow'>[SYSTEM]: </span> <a style=\"color:limegreen\" onclick=\"load_page(15,1);\">Реклама</a>",
	);
	data = data.replace(
		/{:chatto-surl-review:}/g,
		'<div class=\'group-icon icons icon-sys\' t=\'System\'></div><span style=\'color:yellow\'>[SYSTEM]: </span> <a style="color:limegreen" href="https://play.google.com/store/apps/details?id=com.danrotaru.tankichat" target="_BLANK">Поставь оценку в 5 звёзд на Google Play</a>',
	);
	data = data.replace(
		/{:chatto-surl-gplay:}/g,
		'<div class=\'group-icon icons icon-sys\' t=\'System\'></div><span style=\'color:yellow\'>[SYSTEM]: </span> <a style="color:limegreen" href="https://play.google.com/store/apps/details?id=com.danrotaru.tankichat" target="_BLANK">Наше приложение в Google Play</a>',
	);

	data = data.replace(/{:chatto-rules:}/g, '<a onclick="rules()">Правила</a>');
	data = data.replace(/{:chatto-shop:}/g, '<a onclick="shop()()">Магазин</a>');
	data = data.replace(/{:chatto-buy:}/g, '<a onclick="donat.window()">Покупка РУБ</a>');
	data = data.replace(
		/{:chatto-vk:}/g,
		'<a href="https://vk.com/chatto_ru" target="_BLANK">Наша группа Вк</a>',
	);
	data = data.replace(/{:chatto-help:}/g, '<a onclick="help()">Помощь</a>');
	data = data.replace(/{:chatto-help_us:}/g, '<a onclick="help_us()">Поддержи чат</a>');
	data = data.replace(/{:chatto-ads:}/g, '<a onclick="load_page(15,1)">Реклама</a>');
	data = data.replace(/{:chatto-ratings:}/g, '<a href="/ratings" target="_BLANK">Рейтинги</a>');

	data = data.replace(
		/{:chatto-r=(.*?)=(.*?):}/g,
		'<div class="icon-remove" tooltip="Отправлено в $1" onclick="delchat($2)"></div>',
	);
	data = data.replace(
		/{:chatto-b=(.*?):}/g,
		'<div tooltip="Дать бан пользователю $1 на 5 минут за флуд" class="dr" onclick="jjban(\'$1\',5,\'1.1\');"></div>',
	);

	data = data.replace(
		/{:c-r=(.*?)=(.*?):}/g,
		'<div class="icon-remove" tooltip="Отправлено в $1" onclick="delchat($2)"></div>',
	);
	data = data.replace(
		/{:c-b=(.*?):}/g,
		'<div tooltip="Дать бан пользователю $1 на 5 минут за флуд" class="dr" onclick="jjban(\'$1\',5,\'1.1\');"></div>',
	);

	data = data.replace(
		/{:chatto-ban=(.*?):}/g,
		'<div tooltip="Дать бан пользователю $1 на 5 минут за флуд" class="dr" onclick="jjban(\'$1\',5,\'1.1\');"></div>',
	);
	data = data.replace(
		/{:chatto-clan=(.*?)\=(.*?)\:}/g,
		'<div onclick="clan($1)" style="display:inline-block;cursor:pointer;position:relative;top:-3px;color:#12ff00;font-size:11px;">[$2]</div> ',
	);

	data = data.replace(
		/{:chatto-gold-soon:}/g,
		'<div style="background:#fff; display:inline-block;border-radius:8px;"><div style="padding:2px 4px;font-family:Roboto;font-size:14px;font-weight:bold;text-shadow: none;background: linear-gradient(135deg, red 20%, yellow 80%);background: linear-gradient(orange, #ff0000);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">Скоро будет сброшен золотой ящик!</div></div>',
	);
	data = data.replace(
		/{:chatto-megagold-soon:}/g,
		'<div style="background:#fff; display:inline-block;border-radius:8px;"><div style="padding:2px 4px;font-family:Roboto;font-size:14px;font-weight:bold;text-shadow: none;background: linear-gradient(135deg, red 20%, yellow 80%);background: linear-gradient(orange, #ff0000);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">Скоро будет сброшен ультра-голд!</div></div>',
	);

	//data = data.replace(/{:chatto-sgold-soon:}/g, "<div class='chatto-gold soon'>Скоро будет сброшен золотой ящик!</div>");
	//data = data.replace(/{:chatto-smgold-soon:}/g, "<div class='chatto-gold soon ultra'>Скоро будет сброшен УЛЬТРА-ГОЛД!</div>");

	let randomize = rand(0, 7);
	switch (randomize) {
		case 0:
			data = data.replace(
				/{:chatto-sgold-soon:}/g,
				"<div class='chatto-gold soon'>Скоро будет сброшен золотой ящик!</div>",
			);
			data = data.replace(
				/{:chatto-smgold-soon:}/g,
				"<div class='chatto-gold soon ultra'>Скоро будет сброшен УЛЬТРА-ГОЛД!</div>",
			);
			break;
		case 1:
			data = data.replace(
				/{:chatto-sgold-soon:}/g,
				"<div class='chatto-gold soon'>Это КЕБАБ? ЭТО ХОТ-ДОГ?! НЕТ! ЭТО СУПЕР-ГОЛД!</div>",
			);
			data = data.replace(
				/{:chatto-smgold-soon:}/g,
				"<div class='chatto-gold soon ultra'>ЭТО КЕБАБ? ЭТО ХОТ-ДОГ?! НЕТ! ЭТО УЛЬТРА-ГОЛД!</div>",
			);
			break;
		case 2:
			data = data.replace(
				/{:chatto-sgold-soon:}/g,
				"<div class='chatto-gold soon'>Это ШАШЛЫК? ЭТО ПИРОГ?! НЕТ! ЭТО СУПЕР-ГОЛД!</div>",
			);
			data = data.replace(
				/{:chatto-smgold-soon:}/g,
				"<div class='chatto-gold soon ultra'>ЭТО ШАШЛЫК? ЭТО ПИРОГ?! НЕТ! ЭТО УЛЬТРА-ГОЛД!</div>",
			);
			break;
		case 3:
			data = data.replace(
				/{:chatto-sgold-soon:}/g,
				"<div class='chatto-gold soon'>Это КАРТОН? ЭТО МЕШОК?! НЕТ! ЭТО СУПЕР-ГОЛД!</div>",
			);
			data = data.replace(
				/{:chatto-smgold-soon:}/g,
				"<div class='chatto-gold soon ultra'>ЭТО КАРТОН? ЭТО МЕШОК?! НЕТ! ЭТО УЛЬТРА-ГОЛД!</div>",
			);
			break;
		case 4:
			data = data.replace(
				/{:chatto-sgold-soon:}/g,
				"<div class='chatto-gold soon'>Это КАРТОН? ЭТО МЕШОК?! НЕТ! ЭТО СУПЕР-ГОЛД!</div>",
			);
			data = data.replace(
				/{:chatto-smgold-soon:}/g,
				"<div class='chatto-gold soon ultra'>ЭТО КАРТОН? ЭТО МЕШОК?! НЕТ! ЭТО УЛЬТРА-ГОЛД!</div>",
			);
			break;
		case 5:
			data = data.replace(
				/{:chatto-sgold-soon:}/g,
				"<div class='chatto-gold soon'>ЭТО ПТИЦА? ЭТО САМОЛЁТ?! НЕТ! ЭТО СУПЕР-ГОЛД!</div>",
			);
			data = data.replace(
				/{:chatto-smgold-soon:}/g,
				"<div class='chatto-gold soon ultra'>ЭТО ПТИЦА? ЭТО САМОЛЁТ?! НЕТ! ЭТО УЛЬТРА-ГОЛД!</div>",
			);
			break;
		case 6:
			data = data.replace(
				/{:chatto-sgold-soon:}/g,
				"<div class='chatto-gold soon'>ТЕБЕ СКУЧНО? ТЫ ОДИНОК? ЛОВИ СУПЕР-ГОЛД!</div>",
			);
			data = data.replace(
				/{:chatto-smgold-soon:}/g,
				"<div class='chatto-gold soon ultra'>ТЕБЕ СКУЧНО? ТЫ ОДИНОК? ЛОВИ УЛЬТРА-ГОЛД!</div>",
			);
			break;

		default:
			data = data.replace(
				/{:chatto-sgold-soon:}/g,
				"<div class='chatto-gold soon'>ЭТО ПТИЦА? ЭТО САМОЛЁТ?! НЕТ! ЭТО СУПЕР-ГОЛД!</div>",
			);
			data = data.replace(
				/{:chatto-smgold-soon:}/g,
				"<div class='chatto-gold soon ultra'>ЭТО ПТИЦА? ЭТО САМОЛЁТ?! НЕТ! ЭТО УЛЬТРА-ГОЛД!</div>",
			);
			break;
	}

	data = data.replace(
		/{:chatto-ctext=(.*?):}/g,
		'<div style="background:#fff; display:inline-block;border-radius:8px;"><div style="padding:2px 4px;font-family:Roboto;font-size:14px;font-weight:bold;text-shadow: none;background: linear-gradient(135deg, #b24592 20%, #f15f79 80%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">$1</div></div>',
	);

	// {:chatto-sgold=img=rang=login=text:}
	data = data.replace(
		/{:chatto-sgold=(.*?)=(\d.*?)=(.*?)=(.*?):}/g,
		"<div class='chatto-gold'><img class='img' src='../../assets/img/gold$1.png'><div class='nickname'><i class=\"rank r$2\" onclick=\"profile('$3')\"></i> $3</div><div class='text'>$4</div></div>",
	);

	// Ультра {:chatto-sugold=img=rang=login=text:}
	data = data.replace(
		/{:chatto-sugold=(.*?)=(\d.*?)=(.*?)=(.*?):}/g,
		"<div class='chatto-gold ultra'><img class='img' src='../../assets/img/gold$1.png'><div class='nickname'><i class=\"rank r$2\" onclick=\"profile('$3')\"></i> $3</div><div class='text'>$4</div></div>",
	);
	data = data.replace(
		/{:chatto-sugoldV=(.*?)=(\d.*?)=(.*?)=(.*?):}/g,
		"<div class='chatto-gold ultra'><img class='img' src='../../assets/img/gold$1.png'><div class='nickname'><i class=\"rank rv$2\" onclick=\"profile('$3')\"></i> $3</div><div class='text'>$4</div></div>",
	);

	// {:chatto-sgoldV=img=rang=login=text:}
	data = data.replace(
		/{:chatto-sgoldV=(.*?)=(\d.*?)=(.*?)=(.*?):}/g,
		"<div class='chatto-gold'><img class='img' src='../../assets/img/gold$1.png'><div class='nickname'><i class=\"rank rv$2\" onclick=\"profile('$3')\"></i> $3</div><div class='text'>$4</div></div>",
	);

	// Ультра {:chatto-sugoldV=img=rang=login=text:}
	data = data.replace(
		/{:chatto-sugoldV=(.*?)=(\d.*?)=(.*?)=(.*?):}/g,
		"<div class='chatto-gold ultra'><img class='img' src='../../assets/img/gold$1.png'><div class='nickname'><i class=\"rank rv$2\" onclick=\"profile('$3')\"></i> $3</div><div class='text'>$4</div></div>",
	);

	//data = data.replace(/{:chatto-sugold=(.*?)=V(\d.*?)=(.*?)=(.*?):}/g,"<div class='chatto-gold ultra'><img class='img' src='../../assets/img/gold$1.png'><div class='nickname'><i class=\"rank rv$2\" onclick=\"profile('$3')\"></i> $3</div><div class='text'>$4</div></div>");

	//var dates = '<div class="chtmsg" by="DanRotaru"><div class="icon-remove" title="Отправлено" onclick="delchat(136)"></div></div>';
	//dates.replace(/<div class="chtmsg" by="([^"]*)">(.*)<\/div>/, "<div>$1</div>");

	/* Other */

	//data = data.replace(/{\|(.*?)\|}/g, `<div class='message'>$1</div>`);
	data = data.replace(
		/{:c-mzz=(.*?)===(.*?)===(.*?)===(.*?):}/g,
		'<div class="music-card"><video style="display:none" autoplay id="mzzaudio"><source src="$1" type="audio/mpeg"></video><div class="pause" onclick="playPause()"></div><div class="cover" ondblclick="window.open(\'https://www.youtube.com/results?search_query=$4 - $3\', \'_blank\')">$2</div><div class="mname">$3</div><div class="muser">$4</div><div id="mzVol"><div></div></div><script>mzzv();RangeSlider("#mzVol", 70, function(val) {document.getElementById("mzzaudio").volume = val / 100;});</script></div>',
	);
	data = data.replace(
		/{:c-mzzY=(.*?)===(.*?)===(.*?)===(.*?):}/g,
		'<div class="music-card"><iframe id="ytplayer" type="text/html" width="0" height="0" src="https://www.youtube.com/embed/$1?autoplay=1&cc_load_policy=1&disablekb=1&enablejsapi=1&fs=0&loop=1&iv_load_policy=3" frameborder="0"></iframe><div class="pause" onclick="playPause()"></div><div class="cover" ondblclick="window.open(\'https://www.youtube.com/results?search_query=$4 - $3\', \'_blank\')">$2</div><div class="mname">$3</div><div class="muser">$4</div><div id="mzVol"><div></div></div><script>mzzv();RangeSlider("#mzVol", 70, function(val) {document.getElementById("mzzaudio").volume = val / 100;});</script></div>',
	);

	return data;
}

function addMsg(msg, callback, del) {
	// callback = 1 => скрыть сообщение через 5 сек
	// callback = 2 => скрыть сообщение через 2 сек
	// callback = 3 => скрыть сообщение через 10 сек
	// callback = 4 => скрыть сообщение через 30 сек
	// callback = 5 => скрыть сообщение через 60 сек
	msg = process(msg);
	let id;
	if ($('msg[mymsg]').length) {
		id = parseInt($('msg[mymsg]').first().attr('id').replace('mymsg-', ''));
		id++;
	} else {
		id = 0;
	}

	let me = '';

	if (del == 1) {
		if (MY.group == '3') {
			me = `<div class="icon-remove" onclick="msgRemove(${id})"></div>`;
		}
	}

	msg = `<msg by="sys" mymsg id='mymsg-${id}'>${me}${msg}</msg>`;
	$('#chat_messages').prepend(msg);

	if (callback !== undefined) {
		if (callback == 1) {
			setTimeout(function () {
				msgRemove(id);
			}, 5000);
		} else if (callback == 2) {
			setTimeout(function () {
				msgRemove(id);
			}, 2000);
		} else if (callback == 3) {
			setTimeout(function () {
				msgRemove(id);
			}, 10000);
		} else if (callback == 4) {
			setTimeout(function () {
				msgRemove(id);
			}, 30000);
		} else if (callback == 5) {
			setTimeout(function () {
				msgRemove(id);
			}, 60000);
		} else if (callback == 0) {
		} else {
			callback();
		}
	}
}

function isEmoji(str) {
	if (str.search('cClanD') !== -1 || str == '[' || str == ']') {
		return false;
	} else {
		let ranges = [
			'(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])',
		]; // U+1F680 to U+1F6FF];
		if (str.match(ranges.join('|'))) return true;
		else return false;
	}
}

var msgload = 0;
window.msgid = 0;
window.isloaded = false;

// FUNCTION WITH LONG POOL
// function load_messes(id) {
// 	window.isloaded = true;
// 	if (id == undefined) {
// 		id = window.msgid;
// 	}
// 	let time = Math.round(new Date().getTime() / 1000);
// 	let key = MY.key;
// 	let newmsg = $("#chat_messages msg:first").attr("id");
// 	if (newmsg === undefined) {
// 		newmsg = "";
// 	}
// 	newmsg = newmsg.toString().replace("msg", "");
// 	let loadkey = 'msgid=' + id  + '&time=' + time + '&key=' + key;
// 	loadkey = btoa(unescape(encodeURIComponent(loadkey)));

// 	$.get('https://chat.chatto.ru/chat/'+loadkey+'/chat:get', function(e) {
// 		window.isloaded = false;

// 		if (e == "null") {
// 			setTimeout(load_messes, 2000);
// 			console.warn("[ChatTO] ERROR: SERVER RETURNED NULL CODE!");
// 		} else if(e == "-3"){
// 			document.location.href = 'https://chatto.ru/login';
// 		} else {

// 			e = JSON.parse(e);
// 			for (let i = 0; i < e.length; i++) {
// 				if(meVibrate) window.navigator.vibrate(20);
// 				let data = e[i].data;
// 				let all = e[i].a.split("|");
// 				let id = all[0];
// 				let g = all[1];
// 				let user = all[2];
// 				let clss = all[3];

// 				if(MY.login == "DanRotaru"){
// 					if(data.search("{:c-up3=DanRotaru:}") !== -1){
// 						console.log('Нашёл 1 Dan');
// 					}
// 				}

// 				window.msgid = id;
// 				if(MY.group == '3' || MY.group == '2' || (MY.group == '1' && MY.helper == '1')){
// 					if(user !== 'sys' && g !== "9"){
// 						let banH = `<div tooltip="Дать бан пользователю ${user} на 5 минут за флуд" class="dr" onclick="jjban('${user}',5,'1.1');"></div>`;
// 						data = banH+data;
// 					}
// 					if((MY.group == '3' || MY.group == '2') && g !== "9"){
// 						let time = all[4];
// 						let del = `<div class="icon-remove" tooltip="Отправлено в ${time}" onclick="delchat(${id})"></div>`;
// 						data = del+data;
// 					}

// 				}

// 				data = process(data);

// 				let data1 = '';
// 				for(var j = 0;j < [...data].length;j++) {
// 					if(isEmoji([...data][j])) {
// 						data1 += '<b class="emoji">'+[...data][j]+'</b>';
// 					}else{
// 						data1 += [...data][j];
// 					}
// 				}
// 				if(data1.length !== 0){
// 					data = data1;
// 				}

// 				if (clss === undefined || clss == "" || clss == "0") {
// 					clss = "";
// 				} else {
// 					clss = "class='" + clss + "'";
// 				}
// 				if (g !== "9") {
// 					$('#chat_messages').prepend('<msg by=' + user + ' ' + clss + ' id="msg' + id + '">' + data + '</msg>');
// 				} else {
// 					//console.log(data);
// 					if (data == "all") {
// 						$("#chat_messages").html("");
// 					} else if (data[0] == "u" && data[1] == "-") {
// 						let u = data.replace("u-", "");
// 						$("#chat_messages *[by='" + u + "']").remove();
// 					} else {
// 						$("#msg" + data).remove();
// 					}
// 				}

// 				if ($('#chat_messages msg').length > MY.load) $('#chat_messages msg').last().remove();
// 				$("#wifioff").hide();
// 			}

// 			setTimeout(load_messes, 500);
// 			autoIgnore();
// 			autoHightlight();
// 		}
// 	}).fail(function(){
// 		$("#wifioff").show();
// 		console.warn("[ChatTO] ERROR: ERR_INTERNET_DISCONNECTED!");
// 		setTimeout(load_messes, 5000);
// 	});
// }

// FUNCTION WITHOUT LONG POOL
function load_messes(id) {
	if (id == undefined) {
		if (window.msgid == undefined) window.msgid = 0;
		id = window.msgid;
	}
	let newmsg = $('#chat_messages msg:first').attr('id');
	if (newmsg === undefined) {
		newmsg = '';
	}

	$.get('/chat/' + id + '/chat:get', function (e) {
		if (e == 'null') {
			setTimeout(load_messes, 2000);
			console.warn('[ChatTO] ERROR: SERVER RETURNED NULL CODE!');
		} else {
			e = JSON.parse(e);
			for (let i = 0; i < e.length; i++) {
				let data = e[i].data;
				let all = e[i].a.split('|');
				let id = all[0];
				let g = all[1];
				let user = all[2];
				let clss = all[3];

				window.msgid = id;
				if (
					MY.group == '3' ||
					MY.group == '2' ||
					(MY.group == '1' && MY.helper == '1') ||
					MY.login == 'INTRICATION'
				) {
					if (user !== 'sys' && g !== '9') {
						let banH = `<div tooltip="Дать бан пользователю ${user} на 5 минут за флуд" class="dr" onclick="jjban('${user}',5,'1.1');"></div>`;
						data = banH + data;
					}
					if ((MY.group == '3' || MY.group == '2') && g !== '9') {
						let time = all[4];
						let del = `<div class="icon-remove" tooltip="Отправлено в ${time}" onclick="delchat(${id})"></div>`;
						data = del + data;
					}
				}

				let data1 = '';
				for (var j = 0; j < [...data].length; j++) {
					if (isEmoji([...data][j])) {
						data1 += '<b class="emoji">' + [...data][j] + '</b>';
					} else {
						data1 += [...data][j];
					}
				}
				if (data1.length !== 0) {
					data = data1;
				}

				data = process(data);

				if (clss === undefined || clss == '' || clss == '0') {
					clss = '';
				} else {
					clss = "class='" + clss + "'";
				}
				if (g !== '9') {
					$('#chat_messages').prepend(
						'<msg by=' + user + ' ' + clss + ' id="msg' + id + '">' + data + '</msg>',
					);
				} else {
					//console.log(data);
					if (data == 'all') {
						$('#chat_messages').html('');
					} else if (data[0] == 'u' && data[1] == '-') {
						let u = data.replace('u-', '');
						$("#chat_messages *[by='" + u + "']").remove();
					} else {
						$('#msg' + data).remove();
					}
				}

				if ($('#chat_messages msg').length > 70) $('#chat_messages msg').last().remove();
				$('#wifioff').hide();
			}

			setTimeout(load_messes, 1500);
		}
	}).fail(function () {
		$('#wifioff').show();
		console.warn('[ChatTO] ERROR: ERR_INTERNET_DISCONNECTED!');
		setTimeout(load_messes, 5000);
	});
}

var load_messages1 = load_messes;

/*
function load_messes(a){
	if(a == 1){a = "?f=1";}else{a = "";}
$.ajax({
    url: "../chat:get"+a,
    type: "GET",
    async: true,
    success: function(html) {
		if(html == "" || html == undefined || html == "0"){return false;}
		html = process(html);

		if($("#wifioff").css("display") == "block"){
		$("#wifioff").hide();
		}
		if ($("#chat_messages")[0].old == undefined) {
		$("#chat_messages").html(html);
		$("#chat_messages")[0].old = html;
		} else if ($("#chat_messages")[0].old != html) {
		$("#chat_messages").html(html);
		$("#chat_messages")[0].old = html;
		}
    },
    error: function() {
       $("#wifioff").show();
    }
 });
}*/

var check = setInterval(function () {
	if ($('#stopchat').length) {
	} else {
		if (document.hidden) {
			//console.log("Page was hidden!");
			//load_messes = function(){return false;}
		} else {
			//console.log("Page is active!");
		}
	}
}, 1000);

function cChat(i) {
	if (i == 1) {
		$('.chat-container nav .btn').removeClass('green active');
		$('#btn_news').addClass('green active');
		$('#btn_news').attr('style', 'top:1px');
		$('#btn_chat').removeAttr('style');
		$('#show-radio').removeAttr('style');

		$('#chat-bg2').show();
		$('#chat-bg1, #btn-smiles, #chatform').hide();

		$('#chat-bg2').css('height', 'calc(100vh - 140px)');
		$('#chat-bg2 .chat-scroll').load('/tmp/t_updates/p_news.php');
		$('#chattomusicradio').hide();
	} else if (i == 2) {
		$('.chat-container nav .btn').removeClass('green active');
		$('#btn_chat').addClass('green active');
		$('#btn_chat').attr('style', 'top:1px');
		$('#btn_news').removeAttr('style');
		$('#show-radio').removeAttr('style');
		$('#chat-bg2').hide();

		$('#btn-smiles, #chatform, #chat-bg1').show();
		$('#chat-bg2').css('height', 'calc(100vh - 175px)');
		$('#chattomusicradio').hide();
	}
}

$('#btn_news').click(function () {
	cChat(1);
});

$('#btn_chat').click(function () {
	cChat(2);
});

$('#btn-smiles').click(function () {
	$('#smiles').toggle();
});

function alert_anim(text, aa, bb) {
	$('#alert-animation').hide();

	if (aa == undefined) $("button[onclick='anim_close()']").parent().show();
	else if (aa == 7) $("button[onclick='anim_close()']").parent().show();
	else $("button[onclick='anim_close()']").parent().hide();

	$('#alert-anim').html(text);
	if (bb == undefined) {
		$('#alert-animation').show();
		$('#alert-anim0').addClass('animated tada');
	} else {
		$('#alert-animation').fadeIn(100);
		$('#alert-anim0').removeClass('animated tada');
	}
}

function anim_close() {
	$('#alert-animation').fadeOut(100);
}

function caseOpenNum(name, id) {
	let max = 10;
	let data = `<div style="margin: -30px -20px;margin-bottom: -20px;">
		<div style="background:rgba(0,0,0,0.4);margin:-10px;padding:10px;font-family:'PT SANS';">${name}</div>
		<div style="margin-top: 20px;">
			<div class="with-stepper">
				<input type="number" value="1" class="text" data-id="${id}" id="kv1" max="${max}" oninput="elStepper('#kv1', 0, 0, 1)">
				<div class="stepper" data-id="2">
					<div class="up" onmousedown="Stepper('up','#kv1', 0, 1, 2)" onmouseup="Stepper()"></div>
					<div class="down" onmousedown="Stepper('down','#kv1', 0, 1, 2)" onmouseup="Stepper()"></div>
				</div>
			</div>
			<button class="garage_btn_buy" id="open_k_num" onclick="CHATTO_GARAGE.buy.cases_num(${id}, 1)" style="margin-left: 10px;">Открыть</button>
		</div>
	</div>`;
	alert_anim(data, 7, 0);
}

function delchat(id) {
	if (id == 'all') {
		$.ajax({
			type: 'GET',
			url: '/chat:del',
			data: 'id=1&all=1',
		});
	} else {
		$('#msg' + id).remove();
		$.ajax({
			type: 'GET',
			url: '/chat:del',
			data: 'id=' + id,
		});
	}
}

function zv() {
	$('#list').toggle();
	navigator.vibrate(1);
}

function profile0(login) {
	$('#garlink').hide();
	$('#userLoading').show();
	$load('#garage', '/profile:' + login);

	$.get('/profile:' + login, function (html) {
		/*Оптимизация кода*/
		var html = html.replace(
			'{:profile::paint:Зелёный:}',
			'<div class="profile_weap"><div class="profile_weap_text">Зелёный</div><div class="profile_weap_img"><img style="height:100px"src="http://ru.tankiwiki.com/images/ru/d/dc/Coloring_green_paint.png"></div></div>',
			html,
		);

		$('#userLoading').hide();
		$('#garage').html(html);
	});
}

function prJS(data) {
	data = data.replace(
		/\{:cPTH=(.*?)=(.*?)=(.*?)\:}/g,
		'<div class="item-green" style="margin:5px 0px;" id="item_aitem_$1" onclick="garage_aitems(\'$1\')"> <div class="item-m"> <div class="textl">$2</div> <img src="$3" class="itemimg" oncontextmenu="return false" ondragstart="return false"> </div> </div>',
	);
	data = data.replace(
		/\{:cPTH0=(.*?)=(.*?)=(.*?)\:}/g,
		'<div class="item-green" style="margin:5px 0px;" id="item_aitem_$1" onclick="garage_aitems(\'$1\')"> <div class="item-m"> <div class="textl">$2</div> <img src="$3" class="itemimg" oncontextmenu="return false" ondragstart="return false"> </div> </div>',
	);
	data = data.replace(
		/\{:cPTH1=(.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'<div class="item-green" style="margin:5px 0px;" id="item_aitem_$1" onclick="garage_aitems(\'$1\')"> <div class="item-m"> <div class="textl">$2</div> <img style="margin:-5px;height:$4" src="$3" class="itemimg" oncontextmenu="return false" ondragstart="return false"> </div> </div>',
	);
	data = data.replace(
		/\{:cPTH2=(.*?)=(.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'<div class="item-green" style="margin:5px 0px;" id="item_aitem_$1" onclick="garage_aitems(\'$1\')"> <div class="item-m"> <div class="textl">$2</div> <img style="margin:-5px;height:$4" src="$3" class="itemimg" oncontextmenu="return false" ondragstart="return false"><div class="item-label-count">×$5</div> </div> </div>',
	);

	data = data.replace(
		/\{:cPi=(.*?)\:}/g,
		'<div style="font-size: 14px;margin-top: 5px;margin-bottom: 5px;">$1: $2</div>',
	);

	//{:cPU=login=messages=kry=rankname=group=last_date=reg_date=golds=clan=invited=premium=block=ranks=vk:}

	data = data.replace(
		/\{:cPU=(.*?)=(.*?)=(.*?)=(.*?)=(.*?)=(.*?)=(.*?)\:}/g,
		'<div style="font-size: 18px;">$1 ($2)</div> <div style="font-size: 14px;margin-top: 5px;margin-bottom: 5px;">Кристаллы: $3 <img src="../assets/img/kry1.png"></div><div style="font-size: 14px;margin-top: 5px;margin-bottom: 5px;">Звание: $5 $4</div> <div style="font-size: 14px;margin-top: 5px;margin-bottom: 5px;">Последний вход: $6</div> <div style="font-size: 14px;margin-top: 5px;margin-bottom: 5px;">Регистрация: $7</div>',
	);

	return data;
}

function profile_old(login) {
	$('#nav-garage').removeClass('active');
	$('#nav-clans').removeClass('active');

	if (login === parseInt(login, 10)) {
	} else {
		login = login.replace('<s>', '').replace('</s>', '');
	}

	$('#garlink').hide();
	$.ajax({
		url: '/profile:' + login,
		type: 'GET',
		success: function (html) {
			html = prJS(html);

			$('#garage').html(html);
		},
	});
}
function profile(login) {
	$('#nav-garage').removeClass('active');
	$('#nav-clans').removeClass('active');
	$('#garlink').hide();

	login = login.toString().replace('<s>', '').replace('</s>', '');

	$.get('/profile:' + login, function (e) {
		if (e == '0') {
			let html = `<div id="p_profile" style="width: 100%;">
			<div class="LabelText" data-label="profile" style="top: -11px;">Профиль</div>
				<div class="garage-info chatto-bg" style="
				width: calc(100% - 20px);
				height: 100px;
				margin-top: 3px;
				padding: 7px;
				"><div class="wide-bg" style="
				height: 30;
				position: relative;
				text-align:center;
				padding-top: 20px;
			">Пользователь не найден. Проверьте правильность ввода.
			</div>
			<div style="position: absolute;right: 6px;bottom: 0px;"><button class="tobtn" onclick="load_page(1,1)">Закрыть</button></div>
			</div></div>`;
			$('#garage').html(html);
		} else {
			let login = e.user.login;
			let login1 = login;
			if (login1 == 'INTRICATION')
				login1 =
					'INTRICATION <svg viewBox="0 0 24 24" style="width: 20px;"> <path fill="currentColor" d="M12 3V13.55A4 4 0 1 0 14 17V7H18V3M10 19A2 2 0 1 1 12 17A2 2 0 0 1 10 19Z"></path> </svg>';

			let rang = e.user.rang.split('|');
			let rangBar = '0%';
			rangBar = rang[4] > 95 ? `calc(${rang[4]}% - 5px)` : rang[4] + '%';
			let messages = number_format(e.user.messages);
			let kry = number_format(e.user.kry);
			let rub = number_format(e.user.rub);
			let banned = e.user.banned[0] == '1' ? 'Да' : 'Нет';
			let bannedI, banBy, banDate, banTime, banReason;
			if (banned == 'Да') {
				bannedI = e.user.banned.split('|');
				banBy = bannedI[1];
				banDate = bannedI[2];
				banTime = bannedI[3];
				banReason = bannedI[4];
			}
			let ip = e.user.ip;
			let last_date = e.user.last_date;
			let reg_date = e.user.reg_date;
			let golds = e.user.golds;
			let invited = e.user.invited.split('|');
			let activated = e.user.activated;
			activated =
				activated == 1
					? '<img title="Подтвержденный аккаунт" src="../../assets/img/verify.png" style="margin-right: 2px;">'
					: '';
			let mob = e.user.mob;
			mob =
				mob == 1
					? '<img title="С мобильного телефона" src="../../assets/img/mob1.png" style="vertical-align: text-bottom;">'
					: '';
			let earning = e.garage.earning.split('|');
			let eKry = earning[0];
			let eRang = earning[1];
			let eCcoin = earning[2];
			let eCcoins = earning[3];
			let drone = e.user.drone;
			if (drone == 0) drone = '';
			else if (drone[0] == '5') {
				drone = drone.split('|');
				drone = `
				<div class="item-green" style="margin:5px 0px;" id="item_aitem_cicon" onclick="garage_aitems('cicon')">
					<div class="item-m">
						<div class="textl">Текущая иконка</div>
						<img onclick="window.open('${drone[1]}','_blank');" style="margin-left: 0px;height: 102px;" src="../../assets/img/garage/pr5.png" class="itemimg" oncontextmenu="return false" ondragstart="return false">
					</div>
				</div>`;
			} else {
				drone = `
				<div class="item-green" style="margin:5px 0px;" id="item_aitem_cicon" onclick="garage_aitems('cicon')">
					<div class="item-m">
						<div class="textl">Текущий дрон</div>
						<img style="margin-left: 0px;height: 102px;" src="../../assets/garage/drone/${drone}.webp" class="itemimg" oncontextmenu="return false" ondragstart="return false">
					</div>
				</div>`;
			}

			let vk = e.user.vk;
			vk =
				vk !== 0
					? `<div onclick="window.open('https://vk.com/id${vk}','_blank');" style="
			background: #4680C2;
			position: absolute;
			right: 0;
			bottom: 0;
			width: 75px;
			height: 10px;
			font-family: 'PT SANS';
			letter-spacing: 1px;
			font-size: 11px;
			font-weight: bold;
			display: inline-flex;
			padding: 5px;
			border-top-left-radius: 5px;
			cursor: pointer;
		"><svg style="
			vertical-align: top;
			filter: invert(1);
			margin-right: 4px;
		" xml:space="preserve" viewBox="0 0 548.358 548.358" height="11px" width="14px" y="0px" x="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1">
		<g>
			<path d="M545.451,400.298c-0.664-1.431-1.283-2.618-1.858-3.569c-9.514-17.135-27.695-38.167-54.532-63.102l-0.567-0.571
				l-0.284-0.28l-0.287-0.287h-0.288c-12.18-11.611-19.893-19.418-23.123-23.415c-5.91-7.614-7.234-15.321-4.004-23.13
				c2.282-5.9,10.854-18.36,25.696-37.397c7.807-10.089,13.99-18.175,18.556-24.267c32.931-43.78,47.208-71.756,42.828-83.939
				l-1.701-2.847c-1.143-1.714-4.093-3.282-8.846-4.712c-4.764-1.427-10.853-1.663-18.278-0.712l-82.224,0.568
				c-1.332-0.472-3.234-0.428-5.712,0.144c-2.475,0.572-3.713,0.859-3.713,0.859l-1.431,0.715l-1.136,0.859
				c-0.952,0.568-1.999,1.567-3.142,2.995c-1.137,1.423-2.088,3.093-2.848,4.996c-8.952,23.031-19.13,44.444-30.553,64.238
				c-7.043,11.803-13.511,22.032-19.418,30.693c-5.899,8.658-10.848,15.037-14.842,19.126c-4,4.093-7.61,7.372-10.852,9.849
				c-3.237,2.478-5.708,3.525-7.419,3.142c-1.715-0.383-3.33-0.763-4.859-1.143c-2.663-1.714-4.805-4.045-6.42-6.995
				c-1.622-2.95-2.714-6.663-3.285-11.136c-0.568-4.476-0.904-8.326-1-11.563c-0.089-3.233-0.048-7.806,0.145-13.706
				c0.198-5.903,0.287-9.897,0.287-11.991c0-7.234,0.141-15.085,0.424-23.555c0.288-8.47,0.521-15.181,0.716-20.125
				c0.194-4.949,0.284-10.185,0.284-15.705s-0.336-9.849-1-12.991c-0.656-3.138-1.663-6.184-2.99-9.137
				c-1.335-2.95-3.289-5.232-5.853-6.852c-2.569-1.618-5.763-2.902-9.564-3.856c-10.089-2.283-22.936-3.518-38.547-3.71
				c-35.401-0.38-58.148,1.906-68.236,6.855c-3.997,2.091-7.614,4.948-10.848,8.562c-3.427,4.189-3.905,6.475-1.431,6.851
				c11.422,1.711,19.508,5.804,24.267,12.275l1.715,3.429c1.334,2.474,2.666,6.854,3.999,13.134c1.331,6.28,2.19,13.227,2.568,20.837
				c0.95,13.897,0.95,25.793,0,35.689c-0.953,9.9-1.853,17.607-2.712,23.127c-0.859,5.52-2.143,9.993-3.855,13.418
				c-1.715,3.426-2.856,5.52-3.428,6.28c-0.571,0.76-1.047,1.239-1.425,1.427c-2.474,0.948-5.047,1.431-7.71,1.431
				c-2.667,0-5.901-1.334-9.707-4c-3.805-2.666-7.754-6.328-11.847-10.992c-4.093-4.665-8.709-11.184-13.85-19.558
				c-5.137-8.374-10.467-18.271-15.987-29.691l-4.567-8.282c-2.855-5.328-6.755-13.086-11.704-23.267
				c-4.952-10.185-9.329-20.037-13.134-29.554c-1.521-3.997-3.806-7.04-6.851-9.134l-1.429-0.859c-0.95-0.76-2.475-1.567-4.567-2.427
				c-2.095-0.859-4.281-1.475-6.567-1.854l-78.229,0.568c-7.994,0-13.418,1.811-16.274,5.428l-1.143,1.711
				C0.288,140.146,0,141.668,0,143.763c0,2.094,0.571,4.664,1.714,7.707c11.42,26.84,23.839,52.725,37.257,77.659
				c13.418,24.934,25.078,45.019,34.973,60.237c9.897,15.229,19.985,29.602,30.264,43.112c10.279,13.515,17.083,22.176,20.412,25.981
				c3.333,3.812,5.951,6.662,7.854,8.565l7.139,6.851c4.568,4.569,11.276,10.041,20.127,16.416
				c8.853,6.379,18.654,12.659,29.408,18.85c10.756,6.181,23.269,11.225,37.546,15.126c14.275,3.905,28.169,5.472,41.684,4.716h32.834
				c6.659-0.575,11.704-2.669,15.133-6.283l1.136-1.431c0.764-1.136,1.479-2.901,2.139-5.276c0.668-2.379,1-5,1-7.851
				c-0.195-8.183,0.428-15.558,1.852-22.124c1.423-6.564,3.045-11.513,4.859-14.846c1.813-3.33,3.859-6.14,6.136-8.418
				c2.282-2.283,3.908-3.666,4.862-4.142c0.948-0.479,1.705-0.804,2.276-0.999c4.568-1.522,9.944-0.048,16.136,4.429
				c6.187,4.473,11.99,9.996,17.418,16.56c5.425,6.57,11.943,13.941,19.555,22.124c7.617,8.186,14.277,14.271,19.985,18.274
				l5.708,3.426c3.812,2.286,8.761,4.38,14.853,6.283c6.081,1.902,11.409,2.378,15.984,1.427l73.087-1.14
				c7.229,0,12.854-1.197,16.844-3.572c3.998-2.379,6.373-5,7.139-7.851c0.764-2.854,0.805-6.092,0.145-9.712
				C546.782,404.25,546.115,401.725,545.451,400.298z"></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g> </g></svg><div>Вконтакте</div></div>`
					: '';

			let group = e.user.group;
			if (group == 2)
				group = '<div class="group-icon icons icon-moderator" t="Модератор чата"></div>';
			else if (group == 3)
				group = '<div class="group-icon icons icon-adminb" t="Администратор чата"></div>';
			else if (group == 4)
				group = '<div class="group-icon icons icon-helper" t="Кандидат"></div>';
			else if (group == 5)
				group =
					'<div class="group-icon icons icon-moderb" t="Модератор, старейшина"></div>';
			else group = '';

			let vip = e.user.vip;
			if (vip[0] == '1') {
				vip = vip.split('|');
				rang[1] = 'v' + rang[1];
				clearInterval(countdown_interval);
				countdown_interval = setInterval(() => {
					countdown('#profile-vip', Number(vip[1]));
				}, 1000);
				uVip = "Да <span id='profile-vip'></span>";
			} else uVip = 'Нет';

			let clan = e.user.clan;
			if (clan == 0) clan = ' &mdash; ';
			else {
				clan = clan.split('|');
				clan = `<a style="font-size: 14px;text-shadow:1px 1px 1px transparent !important;" onclick="clan(${clan[0]})">${clan[1]}</a>`;
			}

			let paints = '';
			for (let i = 0; i < e.paints.length; i++) {
				let paint = e.paints[i].split('|');
				paints += `
				<div class="item-green" style="margin:5px 0px;" id="item_aitem_${paint[0]}" onclick="garage_aitems('${paint[0]}')">
					<div class="item-m">
						<div class="textl">${paint[0]}</div>
						<img src="${paint[1]}" class="itemimg" oncontextmenu="return false" ondragstart="return false">
					</div>
				</div>
				`;
			}

			let turrets = '';
			for (let i = 0; i < e.garage.turrets.length; i++) {
				let turret = e.garage.turrets[i].split('|');
				turrets += `
				<div class="item-green" style="margin:5px 0px;" id="item_aitem_${turret[2]}" onclick="garage_aitems('${turret[2]}')">
					<div class="item-m">
						<div class="textl">${turret[0]} М${turret[1]}</div>
						<img src="../../assets/garage/turrets/${turret[2]}/m${turret[1]}/preview.webp" class="itemimg" oncontextmenu="return false" ondragstart="return false">
					</div>
				</div>
				`;
			}

			let hulls = '';
			for (let i = 0; i < e.garage.hulls.length; i++) {
				let hull = e.garage.hulls[i].split('|');
				hulls += `
				<div class="item-green" style="margin:5px 0px;" id="item_aitem_${hull[2]}" onclick="garage_aitems('${hull[2]}')">
					<div class="item-m">
						<div class="textl">${hull[0]} М${hull[1]}</div>
						<img src="../../assets/garage/hulls/${hull[2]}/m${hull[1]}/preview.webp" class="itemimg" oncontextmenu="return false" ondragstart="return false">
					</div>
				</div>
				`;
			}

			let specialGarage = '';
			if (e.garage.special.length !== 0) {
				specialGarage = `<div style="background: linear-gradient(135deg, #76ad39 20%, #cdff8a 80%);padding: 10px 0;border-radius: 10px;margin: 0 5px;color: #000;font-size: 18px;font-family: 'PT SANS'">Специальные</div>`;
				for (let i = 0; i < e.garage.special.length; i++) {
					let special = e.garage.special[i].split('|');
					let special1 = special[1].split('_');
					special[2] = special[2] == 1 ? 'hulls' : 'turrets';
					specialGarage += `
					<div class="item-green" style="margin:5px 0px;" id="item_aitem_${special[1]}" onclick="garage_aitems('${special[1]}')">
						<div class="item-m">
							<div class="textl">${special[0]}</div>
							<img src="../../assets/garage/${special[2]}/${special1[0]}/${special1[1]}/preview.webp" class="itemimg" oncontextmenu="return false" ondragstart="return false">
						</div>
					</div>
					`;
				}
			}
			let epicGarage = '';
			if (e.garage.epic.length !== 0) {
				epicGarage = `<div style=" background: linear-gradient(135deg, #9C27B0 20%, #607D8B 80%); padding: 10px 0; border-radius: 10px; margin: 0 5px; color: #fff; font-size: 18px; font-family:'PT SANS'">Эпическое</div>`;
				for (let i = 0; i < e.garage.epic.length; i++) {
					let epic = e.garage.epic[i].split('|');
					epic[3] = epic[1].replace('jgrH', 'special').replace('jgrT', 'special');
					epic[2] = epic[2] == 1 ? 'hulls' : 'turrets';
					epicGarage += `
					<div class="item-green" style="margin:5px 0px;" id="item_aitem_${epic[1]}" onclick="garage_aitems('${epic[1]}')">
						<div class="item-m">
							<div class="textl">${epic[0]}</div>
							<img src="../../assets/garage/${epic[2]}/${epic[3]}/preview.webp" class="itemimg" oncontextmenu="return false" ondragstart="return false">
						</div>
					</div>
					`;
				}
			}

			let gifts = '';
			for (let i = 1; i < e.gifts.length; i++) {
				let gift = e.gifts[i].split('|');
				gifts += `
				<div class="item-green" style="margin:5px 0px;" id="item_aitem_gift1" onclick="garage_aitems('gift1')">
					<div class="item-m">
						<div class="textl">${gift[1]}</div> <img style="margin:-5px;height:auto" src="${gift[2]}" class="itemimg" oncontextmenu="return false" ondragstart="return false">
						<div class="item-label-count">×${gift[0]}</div>
					</div>
				</div>
				`;
			}
			let gift_sent = e.gifts[0].split('|')[0];
			let gift_received = e.gifts[0].split('|')[1];

			let openIP =
				MY.group == '2' || MY.group == '3' ? `onclick="window.open('../ip?ip=${ip}')"` : '';
			let adminF =
				MY.group == '3' ? `ondblclick="$('#btn-udel').show();$('#btn-uinfo').show();"` : '';
			let moderF =
				MY.group == '3' || MY.group == '2'
					? `<button class="btn" style="padding: 2px 25px; top: 0px;" onclick="ptab(8)">М</button>`
					: '';
			let moderF1 =
				MY.group == '2' || MY.group == '3'
					? `
			<div id="profile-8">
				<div class="profile_i" style="height:100%!important;margin-top:0px;">
					<div style="width: 100%;height: 100%;margin:0px auto;">
						<iframe src="https://chatto.ru/ip?ip=${ip}&p=1" style="width: 100%;height: 100%;border: none;"></iframe>
					</div>
				</div>
			</div>`
					: '';

			let banPanel2 =
				banned == 'Да'
					? `
			<div class="item-green profile-ban-panel">
				<div style="text-align:left;padding:0px 10px 10px 10px;color:#fff;">
				<div>Забанил: <a style="font-size: 14px;font-weight:bold;color:#c6ffba;" onclick="profile('${banBy}');">${banBy}</a></div>
				<div title="Дата бана: ${banDate}">Бан на/за: <b>${banTime}</b>, причина: ${banReason}, <a style="font-size: 14px;color:#c6ffba;font-weight:bold;" onclick="rules()">Правила</a></div>
						
						<div id="profile-ban-panel-01" style="display:none;">
							<div class="ChatBtn-wrapper" style="width: calc(100% - 300px);margin-left:5px;">
								<select class="Chatbtn" id="banreason" style="width: 100%;padding-left: 0px;">
									<option value="0">Выберите причину бана</option>
									<option value="1.1">1.1.флуд,флейм,дублирование сообщений запрещены.</option>
									<option value="1.2">1.2.оскорбление администрации сайта и других пользователей запрещены.</option>
									<option value="1.3">1.3.мат,оскорбления запрещены.</option>
									<option value="1.4">1.4.троллинг запрещён.</option>
									<option value="1.5">1.5.капс, недопустимые символы запрещёны.</option>
									<option value="1.6">1.6.спам и бессмысленные сообщения запрещены.</option>
									<option value="1.7">1.7.реклама сторонних сайтов/групп/разных ресурсах запрещена.</option>
									<option value="1.8">1.8.выпрашивание кристаллов/карт/голдов запрещено.</option>
									<option value="1.9">1.9.выпрашивание прав модератора/администатора запрещено.</option>
									<option value="1.10">1.10.выдача себя за администрацию запрещена.</option>
									<option value="1.11">1.11.передача аккаунта запрещена.</option>
									<option value="1.12">1.12.запрещено регистрировать ники схожие с никами администрации сайта,ники содережащие оскорбления,ругань</option>
									<option value="1.13">1.13.запрещено продавать подарочные карты за деньги.</option>
									<option value="1.14">1.14.обсуждение действий модератора.</option>
									<option value="1.15">1.15.неоднократный флуд.</option>
									<option value="1.16">1.16.запрещено использовать более 5 аккаунтов.</option>
									<option value="1.17">1.17.оскорбление администрации чата в любой форме.</option>
									<option value="1.18">1.18.запрещено использовать VPN.</option>
									<option value="999">Своя причина</option>
								</select>
							</div>
							<div class="ChatBtn-wrapper">
								<select class="Chatbtn" id="bantime" style="padding-left: 0px;">
									<option value="1231234">Предупредить</option>
									<option value="1">минуту</option>
									<option value="5">5</option>
									<option value="10">10</option>
									<option value="15">15</option>
									<option value="30">30</option>
									<option value="60">час</option>
									<option value="120">2 часа</option>
									<option value="180">3 часа</option>
									<option value="300">5 часа</option>
									<option value="1440">сутки</option>
									<option value="2880">2 сутки</option>
									<option value="4320">3 сутки</option>
									<option value="10080">неделю</option>
									<option value="43800">месяц</option>
									<option value="9999999">навсегда</option>
								</select>
							</div>
							<button class="btn" style="width: 130px;top:-1px;" onclick="bbban()">Забанить</button>
						</div>
						<div id="profile-ban-panel-1" style="">
							<div style="margin-top:5px;margin-bottom:5px;">
								<button class="btn" style="padding: 0px 30px;" onclick="unban('${login}')">Разбанить</button>
								<button class="btn" style="padding: 0px 30px;" onclick="unban('${login}',1)">Тихий разбан</button>
								<button class="btn" style="padding: 0px 30px;" onclick="kick('${login}')">Кикнуть</button>
								<button class="btn" style="padding: 0px 30px;" onclick="kick('${login}',1)">Тихий кик</button>
								<button class="btn" style="padding: 0px 30px;" onclick="uUban()">Перебан</button>
								<button class="btn" style="padding: 0px 30px;" onclick="pclose()">Закрыть панель</button>
							</div>
						</div>
					</div>
					</div>
			`
					: `
			<div class="item-green profile-ban-panel">
					<div>
						<div id="profile-ban-panel-01" style="">
							<div class="ChatBtn-wrapper" style="width: calc(100% - 300px);margin-left:5px;">
								<select class="Chatbtn" id="banreason" style="width: 100%;padding-left: 0px;">
									<option value="0">Выберите причину бана</option>
									<option value="1.1">1.1.флуд,флейм,дублирование сообщений запрещены.</option>
									<option value="1.2">1.2.оскорбление администрации сайта и других пользователей запрещены.</option>
									<option value="1.3">1.3.мат,оскорбления запрещены.</option>
									<option value="1.4">1.4.троллинг запрещён.</option>
									<option value="1.5">1.5.капс, недопустимые символы запрещёны.</option>
									<option value="1.6">1.6.спам и бессмысленные сообщения запрещены.</option>
									<option value="1.7">1.7.реклама сторонних сайтов/групп/разных ресурсах запрещена.</option>
									<option value="1.8">1.8.выпрашивание кристаллов/карт/голдов запрещено.</option>
									<option value="1.9">1.9.выпрашивание прав модератора/администатора запрещено.</option>
									<option value="1.10">1.10.выдача себя за администрацию запрещена.</option>
									<option value="1.11">1.11.передача аккаунта запрещена.</option>
									<option value="1.12">1.12.запрещено регистрировать ники схожие с никами администрации сайта,ники содережащие оскорбления,ругань</option>
									<option value="1.13">1.13.запрещено продавать подарочные карты за деньги.</option>
									<option value="1.14">1.14.обсуждение действий модератора.</option>
									<option value="1.15">1.15.неоднократный флуд.</option>
									<option value="1.16">1.16.запрещено использовать более 5 аккаунтов.</option>
									<option value="1.17">1.17.оскорбление администрации чата в любой форме.</option>
									<option value="1.18">1.18.запрещено использовать VPN.</option>
									<option value="999">Своя причина</option>
								</select>
							</div>
							<div class="ChatBtn-wrapper">
								<select class="Chatbtn" id="bantime" style="padding-left: 0px;">
									<option value="1231234">Предупредить</option>
									<option value="1">минуту</option>
									<option value="5">5</option>
									<option value="10">10</option>
									<option value="15">15</option>
									<option value="30">30</option>
									<option value="60">час</option>
									<option value="120">2 часа</option>
									<option value="180">3 часа</option>
									<option value="300">5 часа</option>
									<option value="1440">сутки</option>
									<option value="2880">2 сутки</option>
									<option value="4320">3 сутки</option>
									<option value="10080">неделю</option>
									<option value="43800">месяц</option>
									<option value="9999999">навсегда</option>
								</select>
							</div>
							<button class="btn" style="width: 130px;top:-1px;" onclick="bbban()">Забанить</button>
							<div style="margin-top:5px;margin-bottom:5px;">
								<button id="ukick1" class="btn" onclick="kick('${login}')" style="padding: 0px 30px;">Кикнуть</button>
								<button id="ukick2" class="btn" onclick="kick('${login}',1)" style="padding: 0px 30px;">Тихий кик</button>
								<button id="btn-panel-close-profile" class="btn" style="padding: 0px 30px;" onclick="pclose()">Закрыть панель</button>
								<button id="btn-udel" style="display:none;padding:0px 30px;" class="btn" onclick="u_del('${login}')">Удалить</button>
								<button id="btn-uinfo" style="display:none;padding:0px 30px;" class="btn" onclick="$('#profile').fadeOut(50);">Информация</button>
							</div>
						</div>
					</div>
					</div>
			`;
			let banPanel =
				MY.group == '2' || MY.group == '3'
					? `<div style="margin-top: 10px;" id="prof-top-gr">
			<div id="profile-ban-panel">
				${banPanel2}
				</div>
			</div>
			<script>
	function uUban(){
	if ( $("#profile-ban-panel-01").css('display') == 'none' ){
		$("#profile-ban-panel-01").show();
	
		$("#ukick1").remove();
		$("#ukick2").remove();
		$("#btn-panel-close-profile").remove();
	
		$(".profile-ban-panel-title").remove();
		$("#profile-ban-panel-01").css("margin-top","10px");
		$("#uclose1").hide();
	}else{
		$("#profile-ban-panel-01").hide();
	}
	
	}
	function kick(login,id){
	if (id == 1){
	$("#text").val("/kick "+login+ " 1");send_m();
	}
	else{
	$("#text").val("/kick "+login);send_m();
	}
	}
	
	function bbban(){
			bantime = $("#bantime").val();
			banreason = $("#banreason").val();
	
	if(banreason == 999){
	alertify.prompt('Введите свою причину бана!', function(evt, value) {
	var banreason = $("#alertifytext").val();
	if (banreason){
	$.ajax({
	type:"POST",
	url:"../tmp/t_user/u_ban.php",
	data:"bantime="+bantime+"&login=${login}&banreason="+banreason,
	success: function(html){
	if (html !== "null"){
	alert(html);
	}
	}
	});
	}
	});
	}else{
	if (banreason){
	$.ajax({
	type:"POST",
	url:"../tmp/t_user/u_ban.php",
	data:"bantime="+bantime+"&login=${login}&banreason="+banreason,
	success: function(html){
	if (html !== "null"){
	alert(html);
	}
	}
	});
	}
	}
	}
	function unban(login,id){
		if (id == 1){
	  /*$("#text").val("/unban "+login+ " 1");send_m();*/
	  $.get("../../tmp/t_user/unban.php?id=1&login="+login);
		}
		else{
	  /*$("#text").val("/unban "+login);send_m();*/
	  $.get("../../tmp/t_user/unban.php?login="+login);
		}
	}
	function pclose(){
		$('#profile-ban-panel').hide();
		$('#profile-ban-panel-1').hide();
	}
	</script>
	<style>
	.profile-ban-panel{
		cursor: auto;
		height: auto;
		position: absolute;
		bottom: 14px;
		user-select: auto;
		background-color: #585858;
		background: url(../assets/img/m_bg.png);
		border: none;
		border-top: 1px solid #9c9c9c;
		/* border-left: 1px solid #6c6c6c; */
		left: 9px;
		border-radius: 3px;
		width: calc(100% - 18px);
		padding-top:10px;
	}
	</style>
	<?}if ($alls['group'] == "3"){?>
	<script>
		function referals(){
		$("#ref_p").load("../tmp/t_user/u_ref.php?login=${login}");
	}
	function u_delete(login){
		$.ajax({
						type:"GET",
						url:"../tmp/t_user/u_delete.php",
						data:"login=" + login,
						success: function(html){
							alert(html);
						}
					});
	}
	function u_del(login){
	var agree = confirm("Вы уверены что хотите удалить пользователя "+login+" ?");
	if (agree){
	u_delete(login);
	}
	}
	</script>
			`
					: '';

			let casesT = e.cases.split('|');
			let specialT = e.special.split('|');

			let special1 = '';
			if (specialT[2] == 1)
				special1 += `
			<div class="item-green" style="margin:5px 0px;" id="item_aitem_kcard" onclick="garage_aitems('kcard')">
				<div class="item-m">
					<div class="textl">Кристальная карта</div>
					<img style="margin:-5px;height:100px" src="../assets/img/card_kry.png" class="itemimg" oncontextmenu="return false" ondragstart="return false">
				</div>
			</div>`;
			if (specialT[3] == 1)
				special1 += `
			<div class="item-green" style="margin:5px 0px;" id="item_aitem_kcard1" onclick="garage_aitems('kcard1')">
				<div class="item-m">
					<div class="textl">Карта создателя промо-кодов</div>
					<img style="margin:-5px;height:100px" src="../assets/img/card-create.png" class="itemimg" oncontextmenu="return false" ondragstart="return false">
				</div>
			</div>`;
			if (specialT[5] == 1)
				special1 += `
			<div class="item-green" style="margin:5px 0px;" id="item_aitem_kcard2" onclick="garage_aitems('kcard2')">
				<div class="item-m">
					<div class="textl">Карта премиум создателя промо-кодов</div>
					<img style="margin:-5px;height:100px;filter: hue-rotate(255deg);" src="../assets/img/card-create.png" class="itemimg" oncontextmenu="return false" ondragstart="return false">
				</div>
			</div>`;

			special1 += drone;

			let html = `
			<div id="p_profile" style="width: 100%;">
		<div class="LabelText" data-label="chat" style="top: -11px;">Профиль</div>
		<div class="garage-info chatto-bg" style="font-family:'PT SANS',sans-serif !important;width: calc(100% - 20px);height: 150px;margin-top: 3px;padding: 7px;">
			<div class="header">
				<style>
					.btn {
						height: 32px;
						border-radius: 10px;
					}
				</style>
				<button class="btn green active" style="top: 0px; margin-left: 0px; padding: 2px 25px;" onclick="ptab(1)">Профиль</button>
				<button class="btn" style="padding: 2px 25px; top: 0px;" onclick="ptab(2)">Пушки/Корпуса</button>
				<button class="btn" style="padding: 2px 25px; top: 1px;" onclick="ptab(3)">Краски</button>
				<button class="btn" style="padding: 2px 25px; top: 0px;" onclick="ptab(4)">Особое</button>
				<button class="btn" style="padding: 2px 25px; top: 0px;" onclick="ptab(5)">Контейнеры</button>
				<button class="btn" style="padding: 2px 25px; top: 0px;" onclick="ptab(6)">Подарки</button>
				<button class="btn" style="padding: 2px 25px; top: 0px;" onclick="ptab(7)">Гараж</button>
				${moderF}
			</div>
			<div class="wide-bg" style="height: calc(100% - 50px);position: relative;">
				<div style="display:inline-block; cursor:pointer;" ${openIP}><i class="rank bigger r${
				rang[1]
			}"></i></div>
				<div style="display:inline-block;vertical-align:top;margin-left: 10px;">
					<div style="position: absolute;right: -1px;top: -1px;">
						<div class="pv_bar_placeholder" style="height: 16px;width: 150px;display: inline-block;border-top-left-radius: 0px;border-top-right-radius: 0px;border-bottom-right-radius: 0px; border-top: 0px;border-right: 0px;">
							<div class="pv_name" style="height: 16px;margin: inherit;line-height: 16px;top: 1px;"><span>${number_format(
								rang[0],
							)}/${rang[2]}</span>
							</div>
							<div class="pv_bar" id="pv-bar" style="width: ${rangBar};height:16px;"></div>
						</div>
					</div>
					<div style="font-size: 18px;">
					${activated}
					<span id="uloginP">${login1}</span> (${messages})
					</div>
					<div style="font-size: 14px;margin-top: 5px;margin-bottom: 5px;" tooltip="${rub} РУБ" flow="down" ondblclick="alert('${rub} РУБ')">Кристаллы: ${kry} <img src="../assets/img/kry1.png">
					</div>
					<div style="font-size: 14px;margin-top: 5px;margin-bottom: 5px;">Звание:
						${group}
						${rang[3]}
					</div>
					<div style="font-size: 14px;margin-top: 5px;margin-bottom: 5px;">${mob}Последний вход: ${last_date}</div>
					<div style="font-size: 14px;margin-top: 5px;margin-bottom: 5px;">Регистрация: ${reg_date}</div>
				</div>
				<div style="display:inline-block;vertical-align:top;margin-left: 18%;">
					<div style="font-size: 14px;margin-top: 5px;margin-bottom: 5px;" ${adminF}>Поймано золотых ящиков: ${golds}</div>
					<div style="font-size: 14px;margin-top: 5px;margin-bottom: 5px;">Клан: ${clan}</div>
					<div style="font-size: 14px;margin-top: 5px;margin-bottom: 5px;">Пригласил(<span t="Кол. приглашеных пользователей">${
						invited[0]
					}</span>): <a style="font-size: 14px;text-shadow:1px 1px 1px transparent !important;" onclick="profile('${
				invited[1]
			}');">${invited[1]}</a>
					</div>
					<div style="font-size: 14px;margin-top: 5px;margin-bottom: 5px;">Премиум аккаунт: ${uVip}</div>
					<div style="font-size: 14px;margin-top: 5px;margin-bottom: 5px;">Заблокирован: ${banned}</div>
				</div>
				${vk}
			</div>
		</div>
		<div class="garage-info chatto-bg" style="width: calc(100% - 20px);height: 200px;position: relative;top: 20px;height: calc(100% - 218px);padding: 7px;">
			<div class="wide-bg" style="height: calc(100% - 17px);">
				<div id="profile-1" style="display: block;">
					<div style="background: #4CAF50; padding: 10px; border-radius: 10px; margin: 5px;">Личное дело пользователя <b>${login}</b>, да-да оно самое!</div>
					<div style=" background: url(https://ru.tankiwiki.com/images/ru/b/be/Crazy_weekend_gift3.png); width: 164px; height: 106px;"></div>
					${banPanel}
					
				</div>
				<div id="profile-2">
					<div class="profile_i" style="height:100%!important;margin-top:0px;">
						${turrets}
						${hulls}
						${specialGarage}
						${epicGarage}
						<br>
						<table class="mdn-table" style="border: 1px solid rgba(89, 255, 50, 1);border-radius: 5px;padding: 2px;margin: 5px auto;color: white;background: rgba(9, 83, 0, 1);width: calc(100% - 10px);padding-top: 30px;">
							<caption style="position: relative;top: 25px;color: #59FF32;">Пользователь ${login} получает за одно сообщение: </caption>
							<tbody>
								<tr>
									<th>Кристаллы:</th>
									<td style="background: #0e6b03;">${eKry}</td>
								</tr>
								<tr>
									<th>Опыт:</th>
									<td style="background: #0e6b03;">${eRang}</td>
								</tr>
								<tr>
									<th>Ккоинов:</th>
									<td style="background: #0e6b03;">${eCcoin}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div id="profile-3">
					<div class="profile_i" style="height:100%!important;margin-top:0px;">
					<div style="background: rgba(0,0,0,0.2);padding: 6px;border-radius: 5px;border: 1px solid rgb(28, 62, 29);position: relative;margin-right: 10px;text-align: left;font: 13px &quot;PT SANS&quot;,sans-serif;">Ккойнов: ${eCcoins}</div>
						${paints}
						<br>
						<br>
					</div>
				</div>
				<div id="profile-4">
					<div class="profile_i" style="height:100%!important;margin-top:0px;">
					<div class="item-green" style="margin:5px 0px;" id="item_aitem_gold" onclick="garage_aitems('gold')">
						<div class="item-m">
							<div class="textl">Золотой ящик</div> <img style="margin:-5px;height:102px" src="../assets/img/gold_garage.png" class="itemimg" oncontextmenu="return false" ondragstart="return false">
							<div class="item-label-count">×${specialT[0]}</div>
						</div>
					</div>
					<div class="item-green" style="margin:5px 0px;" id="item_aitem_battery" onclick="garage_aitems('battery')">
						<div class="item-m">
							<div class="textl">Батарея</div> <img style="margin:-5px;height:102px" src="../assets/img/battery.png" class="itemimg" oncontextmenu="return false" ondragstart="return false">
							<div class="item-label-count">×${specialT[1]}</div>
						</div>
					</div>
					${special1}
					<br>
					<br>
				</div>
				</div>
				<div id="profile-5">
					<div class="profile_i" style="height:100%!important;margin-top:0px;">
							<div class="item-green" style="margin:5px 0px;" id="item_aitem_k1" onclick="garage_aitems('k1')">
							<div class="item-m">
								<div class="textl">Контейнер 1</div>
								<img style="margin:-5px;height:102px" src="../assets/img/garage/keys.png" class="itemimg" oncontextmenu="return false" ondragstart="return false">
								<div class="item-label-count">×${casesT[0]}</div>
							</div>
						</div>
						<div class="item-green" style="margin:5px 0px;" id="item_aitem_k1" onclick="garage_aitems('k2')">
							<div class="item-m">
								<div class="textl">Контейнер 2</div>
								<img style="margin:-5px;height:102px" src="../assets/img/garage/keys.png" class="itemimg" oncontextmenu="return false" ondragstart="return false">
								<div class="item-label-count">×${casesT[1]}</div>
							</div>
						</div>
						<div class="item-green" style="margin:5px 0px;" id="item_aitem_k1" onclick="garage_aitems('k3')">
							<div class="item-m">
								<div class="textl">Контейнер 3</div>
								<img style="margin:-5px;height:102px" src="../assets/img/garage/keys.png" class="itemimg" oncontextmenu="return false" ondragstart="return false">
								<div class="item-label-count">×${casesT[2]}</div>
							</div>
						</div>
						<div class="item-green" style="margin:5px 0px;" id="item_aitem_k1" onclick="garage_aitems('k4')">
							<div class="item-m">
								<div class="textl">Кейс «Кри»</div>
								<img style="margin:-5px;height:102px" src="../assets/img/garage/keys1.png" class="itemimg" oncontextmenu="return false" ondragstart="return false">
								<div class="item-label-count">×${casesT[3]}</div>
							</div>
						</div>
						<div class="item-green" style="margin:5px 0px;" id="item_aitem_k1" onclick="garage_aitems('k5')">
							<div class="item-m">
								<div class="textl">Кейс «Опыт»</div>
								<img style="margin:-5px;height:102px" src="../assets/img/garage/keys2.png" class="itemimg" oncontextmenu="return false" ondragstart="return false">
								<div class="item-label-count">×${casesT[4]}</div>
							</div>
						</div>
						<div class="item-green" style="margin:5px 0px;" id="item_aitem_k1" onclick="garage_aitems('k6')">
							<div class="item-m">
								<div class="textl">Элитный контейнер</div>
								<img style="margin:-5px;height:102px" src="../assets/img/tanki-case.png" class="itemimg" oncontextmenu="return false" ondragstart="return false">
								<div class="item-label-count">×${casesT[5]}</div>
							</div>
						</div>
						<div class="item-green" style="margin:5px 0px;" id="item_aitem_k1" onclick="garage_aitems('k7')">
							<div class="item-m">
								<div class="textl">Контейнер опыта</div>
								<img style="margin:-5px;height:102px;filter: hue-rotate(270deg);" src="../assets/img/tanki-case.png" class="itemimg" oncontextmenu="return false" ondragstart="return false">
								<div class="item-label-count">×${casesT[6]}</div>
							</div>
						</div>
						<div class="item-green" style="margin:5px 0px;" id="item_aitem_k1" onclick="garage_aitems('k6')">
							<div class="item-m">
								<div class="textl">Ккоин контейнер</div>
								<img style="margin:-5px;height:102px" src="../assets/img/tanki-coinbox.png" class="itemimg" oncontextmenu="return false" ondragstart="return false">
								<div class="item-label-count">×${casesT[7]}</div>
							</div>
						</div>
						<br>
						<br>
					</div>
				</div>
				<div id="profile-6">
					<div class="profile_i" style="height:100%!important;margin-top:0px;">
						<div style="display: inline-block;font-size: 15px;background: rgba(0,0,0,0.2);width: fit-content;padding: 6px;border-radius: 5px;border: 1px solid rgb(28, 62, 29);position: relative;left: -20%;">Всего полученных подарков: ${gift_received}</div>
						<div class="right" style="display: inline-block;font-size: 15px;background: rgba(0,0,0,0.2);width: fit-content;padding: 6px;border-radius: 5px;border: 1px solid rgb(28, 62, 29);position: relative;margin-right: 10px;">Всего отправленных подарков: ${gift_sent}</div>
						<div>
							${gifts}
						</div>
						<br>
						<br>
					</div>
				</div>
				<div id="profile-7">
					<div class="profile_i" style="height:100%!important; background: #0C220D;margin: -4px;padding: 4px;">
						<div style="width:100%;height:100%;margin:0px auto;"> </div>
					</div>
				</div>
				${moderF1}
			</div>
		</div>
		<style>
			#p_profile .Chatbtn {
				padding: 0px 30px;
			}
			#p_profile .header {
				margin-bottom: 5px;
				user-select: none;
				overflow: hidden;
				white-space: nowrap;
			}
			#p_profile .header .Chatbtn {
				font-size: 11px;
				user-select: none;
				padding: 0px 30px;
			}
			#p_profile select option {
				background: rgb(52, 52, 52);
				color: #fff;
				z-index: 1;
			}
			.profile-ban-panel-title {
				padding: 10px 0px;
				text-align: center;
				color: #fff;
				font-weight: bold;
				border-bottom: 1px solid #333;
				line-height: initial;
				margin-bottom: 5px;
			}
			#p_profile {
				min-width: 717px;
			}
			#profile-2,
			#profile-3,
			#profile-4,
			#profile-5,
			#profile-6,
			#profile-7 {
				display: none;
			}
			#profile-8 {
				display: none;
			}
		</style>
		<style>
			.profile-ban-panel {
				cursor: auto;
				height: auto;
				position: absolute;
				bottom: 14px;
				user-select: auto;
				background-color: #585858;
				background: url(../assets/img/m_bg.png);
				border: none;
				border-top: 1px solid #9c9c9c;
				/* border-left: 1px solid #6c6c6c; */
				
				left: 9px;
				border-radius: 3px;
				width: calc(100% - 18px);
				padding-top: 10px;
			}
		</style>
	</div>
	<script>
	function ggey(i){
		console.log(i * 2);
	}
	</script>
			`;
			$('#garage').html(html);
		}
	});
}

function newprofile(login) {}

function ugarage(login) {
	$load('#garage', '/chatP:user_garage?login=' + login);
}

function ptab(id) {
	for (let i = 1; i <= 8; i++) {
		$('#profile-' + i).hide();
		$("button[onclick='ptab(" + i + ")']").removeClass('green active');
		$("button[onclick='ptab(" + i + ")']").css('top', '0px');
	}

	$('#profile-' + id).show();
	$("button[onclick='ptab(" + id + ")']").addClass('green active');
	$("button[onclick='ptab(" + id + ")']").css('top', '1px');
	if (id == 7) {
		$('#profile-7 .profile_i div').empty();
		$('#profile-7 .profile_i div').html(
			`<iframe src="./assets/garage/html5/?user=${$(
				'#uloginP',
			).html()}" style="width:100%;height:100%;border:none;margin: -10px;position: relative;left: -5px;border-radius: 5px;height: calc(100% + 14px);width: calc(100% + 15px);"></iframe>`,
		);
	}
}

function garage_aitems(uniq) {
	$('.item-green').removeClass('item-active');
	$('#item_aitem_' + uniq).addClass('item-active');
}

function search_user() {
	alertify.prompt('Введите ник пользователя!', function (evt, value) {
		var login = $('#alertifytext').val();
		if (login) {
			profile(login);
		}
	});
}

function online() {
	$('#nav-garage').removeClass('active');
	$('#nav-clans').removeClass('active');
	$('#online_U').html($('#online_U').html() + '...');
	//$("#userLoading").show();
	$.get('/chatP:online', function (e) {
		let html = `
    <div class="LabelText">Онлайн</div>
    <div class="chatto-bg" style="height: calc(100vh - 108px);margin-top: 3px;color:#fff;">
       <div class="wide-bg" style="height:100%">
          <div style="padding:10px">
             <div id="p_online" style="margin: -9px;padding: 10px;background: linear-gradient(135deg, #F44336 20%, #009688 80%);border-top-right-radius: 3px;border-top-left-radius: 3px;text-align: center;font-family: 'PT SANS';font-weight: lighter;font-size: 2em;">Онлайн пользователи <span style="font-size:0.7em;">(<span id='online_U'></span>)</span></div>
          </div>
          <div style="height: calc(100% - 50px);overflow-y: auto;padding:1px;">
             <table class="mdn-table">
                <thead>
                   <tr>
                      <th style="width: 30px;text-align:center;">Ранг</th>
                      <th style="text-align:left;">Пользователь</th>
                      <th style="width: 100px;">Кристаллы</th>
                      <th style="width: 125px;">В сети</th>
                      <th style="width: 45px;text-align:center;">Клан</th>
                      <th style="width: 60px;">Написать</th>
                   </tr>
                </thead>
                <tbody id="online_users_log">
                </tbody>
             </table>
          </div>
       </div>
    </div>
    `;

		$('#garage').html(html);

		e = JSON.parse(e);

		let len = e.length - 1;

		$('#online_U').html(len + 1);

		for (let i = 0; i <= len; i++) {
			let login = e[i].login;
			let kry = e[i].kry;
			let messages = e[i].msg;
			let group = e[i].group;
			let vip = e[i].vip;
			let rang_id = e[i].rang_id;
			let mob = e[i].mob;
			let active = e[i].active;

			let clan = e[i].clan;
			if (clan !== '&mdash;') {
				clan = clan.split(';');
				let clan_id = clan[0];
				let clan_name = clan[1];
				clan = `<a onclick="clan(${clan_id})">[${clan_name}]</a>`;
			}

			let style, rank;

			if (mob == 1) {
				mob = "<img style='float: right;' src='../../assets/img/mob.png?1'>";
			} else {
				mob = '';
			}

			if (vip == 1) rank = `<i class='rank rv${rang_id}'></i>`;
			else rank = `<i class='rank r${rang_id}'></i>`;

			if (group == 1) {
				group = '';
				style = '';
			} else if (group == 2) {
				group = "<div class='group-icon icons icon-moderator'></div>";
				style = 'style="color:#ffc107;"';
			} else if (group == 3) {
				group = "<div class='group-icon icons icon-adminb'></div>";
				style = 'style="color:#2196F3;"';
			} else if (group == 4) {
				group = "<div class='group-icon icons icon-moderb'></div>";
				style = 'style="color:#ffc107;"';
			} else if (group == 5) {
				group = "<div class='group-icon icons icon-helper'></div>";
				style = 'style="color:yellow;"';
			}

			let html1 = `
<tr>
<td style="text-align:center;">${rank}</td>
<td style="text-align:left;padding:8px;">${group}<a ${style} onclick="profile('${login}')">${login} (${messages})</a></td>
<td style="width:130px">${kry} <cry/></td>
<td style="text-align:left;">${mob} ${active}</td>
<td style="text-align:center;">${clan}</td>
<td><a onclick="to('${login}')" style="color:#12ff00;text-decoration:none;">/to</a> <a onclick="pm('${login}')" style="color:#12ff00;text-decoration:none;">[PM]</a></td>
</tr>
      `;
			$('#online_users_log').append(html1);
		}

		$('#userLoading').hide();
	});
}

function newonline() {
	$('#nav-garage').removeClass('active');
	$('#nav-clans').removeClass('active');
	$('#online_U').html($('#online_U').html() + '...');
	//$("#userLoading").show();
	$.get('/chatP:online', function (e) {
		let html = `
    <div class="LabelText">Онлайн</div>
    <div class="chatto-bg" style="height: calc(100vh - 108px);margin-top: 3px;color:#fff;">
       <div class="wide-bg" style="height:100%">
          <div style="padding:10px">
             <div id="p_online" style="margin: -9px;padding: 10px;background: linear-gradient(135deg, #F44336 20%, #009688 80%);border-top-right-radius: 3px;border-top-left-radius: 3px;text-align: center;font-family: 'PT SANS';font-weight: lighter;font-size: 2em;">Онлайн пользователи <span style="font-size:0.7em;">(<span id='online_U'></span>)</span></div>
          </div>
          <div style="height: calc(100% - 50px);overflow-y: auto;padding:1px;">
			 <div class="online_users" id="online_users_log"></div>
          </div>
       </div>
    </div>
    `;

		$('#garage').html(html);

		e = JSON.parse(e);

		let len = e.length - 1;

		$('#online_U').html(len + 1);

		for (let i = 0; i <= len; i++) {
			let login = e[i].login;
			let kry = e[i].kry;
			let messages = e[i].msg;
			let group = e[i].group;
			let vip = e[i].vip;
			let rang_id = e[i].rang_id;
			let mob = e[i].mob;
			let active = e[i].active;

			let clan = e[i].clan;
			if (clan !== '&mdash;') {
				clan = clan.split(';');
				let clan_id = clan[0];
				let clan_name = clan[1];
				clan = `<a onclick="clan(${clan_id})">[${clan_name}]</a>`;
			}

			let style, rank;

			if (mob == 1) {
				mob = "<img style='float: right;' src='../../assets/img/mob1.png'>";
			} else {
				mob = '';
			}

			if (vip == 1)
				rank = `<div class="rank bigger rv${rang_id}" onclick="profile('${login}')"></div>`;
			else rank = `<div class="rank bigger r${rang_id}" onclick="profile('${login}')"></div>`;

			if (group == 1) {
				group = '';
				style = '';
			} else if (group == 2) {
				group = "<i class='group-icon icons icon-moderator'></i>";
				style = 'style="color:#ffc107;"';
			} else if (group == 3) {
				group = "<i class='group-icon icons icon-adminb'></i>";
				style = 'style="color:#2196F3;"';
			} else if (group == 4) {
				group = "<i class='group-icon icons icon-moderb'></i>";
				style = 'style="color:#ffc107;"';
			} else if (group == 5) {
				group = "<i class='group-icon icons icon-helper'></i>";
				style = 'style="color:yellow;"';
			}

			let html1 = `
			<div class="user">
			${rank}
			<div class="name">${group}<a ${style}>${login} (${messages})</a></div>
			<table>
				<tbody>
					<tr>
						<td>В сети</td>
						<td>${mob} ${active}</td>
					</tr>
					<tr>
						<td>Кристаллы</td>
						<td>${kry} <cry/></td>
					</tr>
					<tr>
						<td>Клан</td>
						<td>${clan}</td>
					</tr>
					<tr>
						<td>Написать</td>
						<td>
							<a onclick="to('${login}')" style="color:#12ff00;text-decoration:none;">/to</a>
							<a onclick="pm('${login}')" style="color:#12ff00;text-decoration:none;">[PM]</a>	
						</td>
					</tr>
				</tbody>
			</table>
		</div>
      `;
			$('#online_users_log').append(html1);
		}

		$('#userLoading').hide();
	});
}

function getclans() {
	$('#userLoading').show();
	$.get('/clans/', function (e) {
		let html = `
    <div class="LabelText">Кланы</div>
	<div class="window_clan chatto-bg" data-page="clans" style="height: calc(100vh - 297px);margin-top:3px;">
    <div class="garage_list" style="position: relative;">
        <div class="clan_all">
            <div class="wide-bg clan-bg">
                <div style="height: calc(100vh - 320px);padding-top: 15px;overflow-y: auto;" id="clan_c">
                    <table class="mdn-table" style="width:100%;margin-top:-15px;">
                        <thead style="text-align:left">
                            <tr>
                                <th style="width: 35px;">Место</th>
                                <th style="width: 50px;">Тэг</th>
                                <th>Название клана</th>
                                <th style="width: 130px;">Основатель</th>
                                <th style="width: 60px;">Участников</th>
                                <th style="width: 65px;">Создан</th>
                                <th style="width: 80px;">Капитал</th>
                            </tr>
                        </thead>
                        <tbody style="text-align:left" id="clan_top_content">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<style>
.window_clan{font-family:'Myriad Pro',Roboto,sans-serif}.clan-scroll{width:100%;overflow:hidden}.clan-scroll img{max-height:100px}.clan_text{display:inline-block;vertical-align:top;margin-left:20px;position:absolute;right:5px;width:400px;height:100px;overflow-y:auto;font-size:14px;white-space:normal;padding-right:10px}.clan_text::-webkit-scrollbar{width:.5em;transition:1s;height:2px;position:relative;left:-100px}.clan_text::-webkit-scrollbar-thumb{background:#0f0;border-radius:5px;outline:0 solid #708090;border:2px solid #136d0e;height:2px;position:relative;left:-100px}.clan_text::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px #136d0e;height:2px;border-radius:5px;position:relative;left:-100px}.window_clan .table td{text-align:left;padding-left:5px;border-left:1px solid transparent;border-right:1px solid transparent;border-bottom:1px solid transparent}.clan_bottom{position:relative;top:27px}.clan_top{position:absolute;z-index:100;top:6px;left:10px}.btn-clanp{background:url(../assets/img/clan_btns.png);background-repeat:no-repeat;text-align:center;cursor:pointer;width:100px;height:30px;color:#f9f9f9!important;position:relative}.btn-clanp:hover{background-position:0 -30px}.btn-clanp:active{background-position:0 -60px}.btn-clanp.active{background-position:0 -60px}.btn-exit{background:url(../assets/img/clan_btns.png);background-repeat:no-repeat;background-position:-536px 0;text-align:center;cursor:pointer;width:100px;height:30px;color:#f9f9f9!important;position:relative}.btn-exit:hover{background-position:-536px -30px}.btn-exit:active{background-position:-536px -60px}.btn-cl-create{background:url(../assets/img/clan_btns1.png);background-repeat:no-repeat;text-align:center;cursor:pointer;width:120px;height:50px;position:relative}.btn-cl-create:hover{background-position:0 -50px}.btn-cl-create:active{background-position:0 -100px}.btn-cl-join{background:url(../assets/img/clan_btns1.png);background-repeat:no-repeat;background-position:-120px 0;text-align:center;cursor:pointer;width:120px;height:50px;position:relative}.btn-cl-join:hover{background-position:-120px -50px}.btn-cl-join:active{background-position:-120px -100px}.clans_top{overflow:scroll;overflow-y:hidden;overflow-x:auto;width:100%;height:auto}.one-clan{width:120px;height:110px;display:inline-block;border:1px solid #32cd32;background:0 0;cursor:pointer;text-align:center}.one-clan:active,.one-clan:focus{border:1px solid #0f0;background:rgba(0,255,0,.09)}.clan-bg{height:inherit!important;padding:2px}.title_list{font-size:13px;margin-left:2px;margin-top:-10px;padding-bottom:5px}.clan-bga{background:#102e12;width:192px;height:162px;display:inline-block;vertical-align:top;text-align:center;position:relative;top:3px}.clan-bga.active{background:url(../assets/img/tasks/dce.png);width:192px;height:150px;top:10px}.clan-bga.active:before{content:url(../assets/img/tasks/dto.png);width:192px;height:6px;position:absolute;top:-6px;left:0}.clan-bga.active:after{content:url(../assets/img/tasks/dbt.png);width:192px;height:6px;position:absolute;bottom:-6px;left:0}.clan-bga.bga1{border:1px solid #2a4a2c;border-radius:8px;margin-left:2px}.clan-bga.bga2{background:#004603;border:1px solid #2a4a2c;border-radius:8px;margin-left:2px;box-shadow:inset 0 0 10px #2e8c32}.clan-bga .cllogo{cursor:pointer;margin:10px auto;width:100px;height:100px}.clan-bga .clname{font-family:"PT SANS",sans-serif;font-size:17px;margin-top:-5px}.clan-bga .umsg{margin-top:5px;opacity:.9}.clan-bga .num{opacity:.6;position:absolute;bottom:2px;left:50%;font-size:10px}.clan-bga-tournaments{width:444px;height:55px;position:absolute;left:50%;transform:translate(-50%);background:url(../../assets/img/tasks/tournaments.png);top:45px}
</style>
    `;

		$('#garage').html(html);
		let capital = 0;
		e = JSON.parse(e);
		//let capital = e.capital;
		let len = e.clans.length - 1;

		let html2 = `
		
<div class="window_clan chatto-bg" data-page="clans2" style="margin-top: 7px;height: calc(100vh - 659px);min-height: 161px;">
<div style="position: relative;top: 5px;">
	<div class="title_list">Список кланов (${len})</div>
	<div style="position: absolute;right: 0;top: -2px;">Общий капитал: <l>${capital}</l> <cry/></div>
	<div class="wide-bg clan-bg" style="margin-top:-2px">
		<div class="garage_list" style="height: 118px;position:relative;">
			<div class="clans_top dragscroll" id="clans_bottom"></div>
		</div>
	</div>
</div>

<div class="clan_bottom">
	<div style="margin-top: -10px;">
		<button class="tobtn" onclick="load_page(1,1)">Закрыть</button>
		<button class="tobtn" onclick="cclan()">Найти</button>
		<button class="tobtn" onclick="clan_t(1)">Создать</button>
	</div>
</div>
</div>
`;
		$('#garage').append(html2);

		for (let i = 0; i <= len; i++) {
			capital += parseInt(e.clans[i].kry.split(' ').join(''));
			let id = e.clans[i].id;
			let teg = e.clans[i].teg;
			let name = e.clans[i].name;
			let logo = 'https://awpbajxiyo.cloudimg.io/height/100/n/' + e.clans[i].logo;
			let created = e.clans[i].created;
			let date = e.clans[i].date;
			let users = e.clans[i].users;
			let kry = e.clans[i].kry + ' <cry/>';

			created = created.split(';');
			let created_login = created[0];
			let created_vip = created[1];
			let created_rank = created[2];
			if (created_vip == 1) created_vip = 'v';
			else created_vip = '';

			created = `<i style="vertical-align: middle;margin-right: 2px;" class="rank r${created_vip}${created_rank}" onclick="profile('${created_login}')"></i> <a onclick="profile('${created_login}')">${created_login}</a>`;

			let clan = `<a onclick="clan(${id})">${name}</a>`;

			let top;
			if (i == 1) {
				top = 'class="tTop1"';
			} else if (i == 2) {
				top = 'class="tTop2"';
			} else if (i == 3) {
				top = 'class="tTop3"';
			} else {
				top = '';
			}

			if (i !== 0) {
				let html1 = `
				<tr ${top}>
				<td style="text-align:center;">${i}</td>
				<td style="text-align:center;">${teg}</td>
				<td style="text-align:center;">${clan}</td>
				<td style="text-align:left;">${created}</td>
				<td style="text-align:center;">${users}</td>
				<td style="text-align:center;">${date}</td>
				<td>${kry}</td>
				</tr>
			  `;
				$('#clan_top_content').append(html1);
			}

			let html3 = `
			<div class="one-clan" onclick="clan(${id})">
					<img src="${logo}" style="height: 90px;max-width:118px;">
					<br>
					<div style="font-size:12px;color: lime;">[${teg}] - ${kry}</div>
				</div>`;
			$('#clans_bottom').append(html3);
		}
		$('.window_clan[data-page="clans2"] l').html(number_format(capital));

		let scripts = `<script src="../../assets/js/drag.js"></script>
		<script>
		   $(".clans_top").mousewheel(function(event, delta) {
			  this.scrollLeft -= (delta * 30);
			  event.preventDefault();
		   });
		
		function ccreate(id){
			var i = 1;
			var i1 = 1;
		
			if (id == 1){
				if (i == 1){
					$("#clan").show();
					$load("#clan","../tmp/t_clan/window_clan1.php?i=1");
				}
				else{alert('У вас не достаточно кристаллов.');}
			}
			if (id == 2){
				if (i1 == 1){
					$("#clan").show();
					$load("#clan","../tmp/t_clan/window_clan1.php?i=2");
				}
				else{alert('У вас не достаточно РУБ.');}
			}
		}
		$('img').error(function(){
			$(this).attr('src', '../assets/img/broken.png');
		});
		</script>`;
		$('#garage').append(scripts);

		$('#userLoading').hide();
	});
}

function utopt(id) {
	$('#users_all').empty();
	$('#users_all').load('/chatP:users_top?id=' + id);

	for (var i = 1; i <= 5; i++) {
		$('#btn-top-' + i).removeClass('green');
		$('#btn-top-' + i).removeClass('active');
		$('#btn-top-' + i).css('top', '0px');
	}

	$('#btn-top-' + id).addClass('green');
	$('#btn-top-' + id).addClass('active');
	$('#btn-top-' + id).css('top', '1px');
}

function nick_c() {
	var nick = $('#nick_c').val();
	$.ajax({
		url: '../tmp/t_user/nick_c.php',
		type: 'POST',
		data: 'nick_c=' + nick,
		success: function (data) {
			if (data !== 'Неверный формат логина!' || data !== 'Заполните поле логина!') {
				$("#tank param[name='flashvars']").attr(
					'value',
					'userName=' +
						data +
						'&mountedItemsXmlUrl=http://ratings.tankionline.com/get_stat/mounteditems/',
				);
				$('#tank').attr('data', '');
				setTimeout(function () {
					$('#tank').attr('data', 'http://ratings.tankionline.com/swf/viewer2.swf?v=1.2');
				}, 100);
			} else {
				alert(data);
			}
		},
	});
}

function help(id) {
	if (MY.mobile) {
		alert(
			`<div style="margin: -10px;overflow-y: auto;height: 300px;">${$(
				'#arrow-simple .wide-bg',
			).html()}</div>`,
		);
	} else {
		$('#p_helpers').toggle(0, function () {
			$('#arrow').toggle();
		});
		//$("#arrow-one").show();
		if (id == 1) {
			rules();
		}
	}
}

function help_us() {
	/*alert('Помоги нам в развитии, отправь сколько сможешь на:<br/>' +
		'Qiwi (<a href="http://qiwi.com/" target="_blank">ссылка</a>)<br/> <input type="text" value="+37369020199" readonly="" onclick="this.select()" style="background: #0a170b;width: 80%;border-radius: 5px;border: 1px solid lime;height: 33px;color: #fff;margin-top: 1px;padding-left: 10px;padding-right: 10px;">' +
		'<button style="top:10px;left:5px;" class="btn_next" onclick="window.open(\'https://qiwi.com/payment/form.action?provider=99&extra[%27account%27]=+37369020199&amountInteger=100&amountFraction=00\',\'_blank\');"></button><br/><br/>' +
		'Webmoney (<a href="http://webmoney.ru/" target="_blank">ссылка</a>) <input type="text" value="R317180445710 | Z912195768320 | E704446223823 | U217718571365 | B205637436885 | 37369020199" readonly="" onclick="this.select()" style="background: #0a170b;width: 80%;border-radius: 5px;border: 1px solid lime;height: 33px;color: #fff;margin-top: 1px;padding-left: 10px;padding-right: 10px;">' +
		'<button style="top:10px;left:5px;" class="btn_next" onclick="window.open(\'https://mini.webmoney.ru/SendWebMoney.aspx\',\'_blank\');"></button><br/>' +
		'<div><div style="width: 45%;font-size:  12px;display:  inline-block;margin-bottom:  10px;">Или через другие способы: </div><button style="top:10px;left:5px;" class="btn_next" onclick="window.open(\'https://qiwi.me/tankichat\',\'_blank\');"></button></div></div>'
	)*/

	window.open('/donations', '_blank');
}

function dragger(id) {
	//navbar
	$('.navbar-cry, .nav-btn, .right_content, .my_rang_n, .score_bar_senter').draggable();

	//chat
	$('.chat-container').draggable();

	//garage
	$('#garage').draggable();
	$('.garageInfoTank>div:nth-child(1), .garageInfoTank>div:nth-child(2)').draggable();
	$('.garage_list').draggable();

	$('.chat').css('z-index', '100000');
	$('.chat').css('cursor', 'move');

	if (id == 1) {
		$('.chat').draggable('disable');
		$('.chat').css('cursor', 'default');

		$(
			'.navbar-cry, .nav-btn, .right_content, .my_rang_n, .score_bar_senter, .chat-container, #garage, .garageInfoTank>div:nth-child(1), .garageInfoTank>div:nth-child(2), .garage_list',
		).draggable('disable');
	}
}

/******************** CLAN Functions ******************/
function clan(id) {
	$('#nav-garage').removeClass('active');
	$('#nav-clans').addClass('active');
	$('#garlink').hide();
	$load('#garage', '../tmp/t_clan/clan1.php?id=' + id);
}

function clan_t(id) {
	if (id == 1) {
		$('#nav-garage').removeClass('active');
		$('#nav-clans').addClass('active');
		$load('#clan_c', '../tmp/t_clan/clan_c.php?id=1');
	}
	if (id == 2) {
		$('#nav-garage').removeClass('active');
		$('#nav-clans').addClass('active');
		$load('#clan_c', '../tmp/t_clan/clan_c.php?id=2');
	}
}

function cclan() {
	var name = prompt('Введите тэг клана ! (Пример: A)');
	if (name) {
		clan(name);
	}
}

function create_clan_close() {
	$('#clan').hide();
}

function crr() {
	$('#cld').serialize();
	var cli = $('#cli').val();
	var cln = $('#cln').val();
	var clt = $('#clt').val();
	var cld = $('#cld').val();
	var cll = $('#cll').val();

	$.ajax({
		url: '../tmp/t_clan/clan_create.php',
		type: 'POST',
		data: 'i=' + cli + '&cln=' + cln + '&clt=' + clt + '&cld=' + cld + '&cll=' + cll,
		success: function (data) {
			alert(data);
		},
	});
}

function cltab(id) {
	if (id == 1) {
		$('#clan_content1').show();
		$('#clan_content2, #clan_content3, #clan_content4, #clan_content5').hide();
		$('.btn-clanp').addClass('active');
	}
	if (id == 2) {
		$('#clan_content1, #clan_content3, #clan_content4, #clan_content5').hide();
		$('#clan_content2').show();
		$('.btn-clanp').removeClass('active');
	}
	if (id == 3) {
		$('#clan_content1, #clan_content2, #clan_content4, #clan_content5').hide();
		$('#clan_content3').show();
		$('.btn-clanp').removeClass('active');
	}
	if (id == 4) {
		$('#clan_content3, #clan_content2, #clan_content1, #clan_content5').hide();
		$('#clan_content4').show();
		$('.btn-clanp').removeClass('active');
	}
	if (id == 5) {
		$('#clan_content3, #clan_content2, #clan_content1, #clan_content4').hide();
		$('#clan_content5').show();
		$('.btn-clanp').removeClass('active');
	}
}

function bidgo(id) {
	$.ajax({
		url: '../tmp/t_clan/clan_c1.php',
		type: 'POST',
		data: 'id=' + id + '&i=1',
		success: function (data) {
			alert(data);
		},
	});
}

function clanexit() {
	alertify.confirm('Вы действительно хотите выйти из клана?', function () {
		$.ajax({
			url: '../tmp/t_clan/clan_c1.php',
			type: 'POST',
			data: '&i=4',
			success: function (data) {
				if (data == 'Вы успешно вышли из клана!') {
					getclans();
					alert(data);
				} else {
					alert(data);
				}
			},
		});
	});
}

function capclan(id, ids, capital) {
	if (ids == 1 || ids == undefined || ids == null) {
		alertify.prompt(
			'Сколько кристаллов вы хотите пожертвовать клану? (от 1000)',
			function (evt, value) {
				var capital = $('#alertifytext').val();
				if (capital < 1000) {
					alert('Пожертвовать можно с 1000 кристаллов!');
				} else {
					capclan(id, 2, capital);
				}
			},
		);
	}
	if (ids == 2) {
		if (capital < 1000) {
			alert('Пожертвовать можно с 1000 кристаллов!');
		}
		$.ajax({
			url: '../tmp/t_clan/clan_c1.php',
			type: 'POST',
			data: 'id=' + id + '&i=6&ids=' + capital,
			success: function (data) {
				if (data == 'Вы успешно пожертвовали кристаллы клану!') {
					getclans();
					alert(data);
				} else {
					alert(data);
				}
			},
		});
	}
}

function clan_close() {
	load_page(1, 0);
}
/******************** CLAN Functions ******************/
function PromoCalc(ajax) {
	let kry = Number($('#promo_kry').val());
	kry = Math.floor(kry + 0.1 * kry); // +10%
	let kry1 = Number($('#promo_kry').val());
	if ($('#promo-gift').val() !== '0') kry += Number($('#promo-gift').val().split('|')[1]);

	let golds = Number($('#promo-golds').val());
	let rub = Number($('#promo-rub').val());
	let orRub = Number($('#promo-rub').val());
	if ($('#promo-premium').val() !== '0') rub += Number($('#promo-premium').val().split('|')[1]);
	if ($('#promo-batteries').val() !== '0')
		rub += Number($('#promo-batteries').val().split('|')[1]);

	let batteries = 0;
	if ($('#promo-batteries').val() !== '0')
		batteries = Number($('#promo-batteries').val().split('|')[0]);

	let premium = 0;
	if ($('#promo-premium').val() !== '0')
		premium = Number($('#promo-premium').val().split('|')[0]);

	let gift = 0;
	if ($('#promo-gift').val() !== '0') gift = Number($('#promo-gift').val().split('|')[0]);

	let gift_text = $('#promo-gift-text textarea').val();

	let keys = Number($('#promo-keysNum').val());
	let keysType = $('#promo-keys').val();

	let myRub = Number($('#rubr').html().replace(/ /g, ''));
	if (myRub < rub) {
		alert('Недостаточно РУБ!');
		return false;
	}

	// console.log(kry);
	// console.log(golds);
	// console.log(rub);
	// console.log(batteries);
	// console.log(keys);
	// console.log(keysType);

	$('#promo-need').html(kry);
	if (rub > 0) {
		$('#promo-needRub').html(rub + ' РУБ');
		$('#promo-needRub').show();
	} else {
		$('#promo-needRub').hide();
	}
	if (golds > 0) {
		$('#promo-needGolds').html(
			golds + ' ' + getNumEnding(golds, ['золотой ящик', 'золотых ящика', 'золотых ящиков']),
		);
		$('#promo-needGolds').show();
	} else {
		$('#promo-needGolds').hide();
	}
	if (keys > 0) {
		$('#promo-needKeys').html(
			keys + ' ' + getNumEnding(keys, ['контейнер', 'контейнера', 'контейнеров']),
		);
		$('#promo-needKeys').show();
	} else {
		$('#promo-needKeys').hide();
	}

	if (ajax == 1) {
		var show;
		if ($('#promocreateS').is(':checked')) show = 1;
		else show = 0;

		alertify.confirm(
			'Вы действительно хотите хотите создать промо-код с такими призами?',
			function () {
				$.ajax({
					url: '../tmp/t_cards/newpromocreate.php',
					type: 'GET',
					data:
						'kry=' +
						kry1 +
						'&show=' +
						show +
						'&golds=' +
						golds +
						'&rub=' +
						orRub +
						'&batteries=' +
						batteries +
						'&vip=' +
						premium +
						'&keys=' +
						keysType +
						'|' +
						keys +
						'&gift=' +
						gift +
						'&gift_text=' +
						gift_text,
					success: function (r) {
						if (r[0] == '0') {
							r = r.substring(1);
							$('.promo-input').html(r);
							$('.promo-input').show();
						} else {
							alert(r);
						}
					},
				});
			},
		);
	}
}

function promo_create(i) {
	if ($('#user_promocode').length) {
	} else {
		$('#all_alerts').append("<div class='mask' id='user_promocode'></div>");
	}

	if (i == undefined) {
		$('#user_promocode').load('tmp/t_cards/window_promo.php');
		$('#user_promocode').show();
	} else if (i == 1) {
		$('#user_promocode').hide();
	} else if (i == 2) {
		// обычный
		var num = $('#promo_kry').val();
		if ($('#promocreateS').is(':checked')) {
			var show = 1;
		} else {
			var show = 0;
		}
		alertify.confirm(
			'Вы действительно хотите хотите создать промо-код на ' + num + ' кристаллов?',
			function () {
				$.ajax({
					url: '../tmp/t_cards/promo-create.php',
					type: 'GET',
					data: 'kry=' + num + '&show=' + show,
					success: function (r) {
						if (r[0] == '0') {
							r = r.substring(1);
							$('.promo-input').html(r);
							$('.promo-input').show();
						} else {
							alert(r);
						}
					},
				});
			},
		);
	} else if (i == 3) {
		// premium
		PromoCalc(1);
	}
}

function promokryInt(n) {
	n = parseInt(n);
	var kry = parseInt(n + 0.1 * n);
	kry = Math.floor(kry);
	PromoCalc();

	if (n > 1000000) {
		$('#promo_kry').val('1000000');
	} else if (n <= 0) {
		$('#promo_kry').val('1');
	} else {
	}
}

function pkryInt(n) {
	n = parseInt(n);
	let kry = parseInt(n + 0.1 * n);
	kry = number_format(Math.floor(kry));
	$('#kryComission').val(kry);
}

function prub(id) {
	if (id == 2) {
		var ulogin = $('#prublogin').val();
		var rub = $('#prubnum').val();

		if (ulogin == '' || rub == '') {
			alert('Проверьте валидность данных!');
		} else {
			$.ajax({
				url: '../tmp/t_setting/transfer.php',
				type: 'POST',
				data: 'ulogin=' + ulogin + '&rub=' + rub,
				success: function (data) {
					alert(data);
					u_update(1);
					$('#user_prub').hide();
					window_settings_close();
				},
			});
		}
	} else {
		if ($('#user_prub').length) {
		} else {
			let data = `
	<div class="mask" id="user_prub">
    <div class="user_settingsP" style="height:110px">
        <div class="LabelText" style="top: -41px;">Передача РУБ</div>
        <form action="javascript:prub(2)">
            <div class="wide-bg" style="font-size:12px;margin-top: -40px;padding: 10px;height: auto;">
                <span style="opacity: .7;">Комиссия составляет 5 РУБ в не зависимости от суммы.</span>
            </div>
            <div style="margin-top: 5px;width: calc(100% - 180px);display: inline-block;" class="input-value">
                <span>Ник получателя: </span>
                <input placeholder="Получатель" id="prublogin" autocomplete="off" required type="text" class="text" style="padding-left: 90px !important;width: 100%;">
            </div>
            <div style="margin-top: 5px;display: inline-block;width: 176px;" class="input-value">
                <span>Количество:</span>
                <input placeholder="Кол. руб" id="prubnum" required type="number" class="text" style="padding-left: 70px !important;width: 100%;">
                <span>руб.</span>
            </div>
            <br>
            <div style="text-align: right;margin-top: 10px;">
                <button class="btn green" style="width:100px">Отправить</button>
                <button class="btn" onclick="$('#user_prub').hide();return false;" style="left:3px;width:100px">Отмена</button>
            </div>
        </form>
    </div>
</div>`;

			$('#all_alerts').append(data);
		}

		$('#user_prub').show();
	}
}

function pkry(id) {
	if (id == 2) {
		var ulogin = $('#pkrylogin').val();
		var kry = Number($('#pkrynum1').val());
		var percent = parseInt(kry + 0.1 * kry);
		percent = Math.floor(percent);
		if (ulogin == '' || kry == '') {
			alert('Проверьте валидность данных!');
		} else if (kry < 1000) {
			alert('Вы можете перевести не меньше 1000 кристаллов!');
		} else {
			$.ajax({
				url: '../tmp/t_setting/transfer1.php',
				type: 'POST',
				data: 'ulogin=' + ulogin + '&kry=' + kry,
				success: function (data) {
					alert(data);
					u_update(1);
					$('#user_pkry').hide();
				},
			});
		}
	} else {
		if ($('#user_pkry').length) {
		} else {
			let data = `
			<div class="mask" id="user_pkry" style="display: none;">
			<div class="user_settingsP" style="height: 145px;">
    <div class="LabelText" style="top: -41px;">Передача кристаллов</div>
    <form action="javascript:pkry(2)">
        <div class="wide-bg" style="font-size:12px;margin-top: -40px;padding: 10px;height: auto;">
            <span style="opacity: .7;">Комиссия составляет 10% в зависимости от суммы.</span>
        </div>
        <div style="margin-top: 5px;width: calc(100% - 180px);display: inline-block;" class="input-value">
            <span>Ник получателя: </span>
            <input placeholder="Получатель" id="pkrylogin" autocomplete="off" required type="text" class="text" style="padding-left: 90px !important;width: 100%;">
        </div>
        <div style="margin-top: 5px;display: inline-block;width: 176px;" class="input-value">
            <span>Количество:</span>
            <input placeholder="Кол. кри" id="pkrynum1" autocomplete="off" oninput="pkryInt(this.value)" required type="number" class="text" style="padding-left: 70px !important;width: 100%;">
            <span><cry></cry></span>
        </div>
        <div style="margin-top: 5px;width: 100%;display: inline-block;" class="input-value">
            <span>Всего необходимо иметь: </span>
            <input placeholder="Кол. кристаллов которых вы должны иметь" readonly="" type="text" class="text" style="padding-left: 135px !important;width: 100%;" id="kryComission">
            <span><cry></cry></span>
        </div>

        <div style="text-align: right;margin-top: 10px;">
            <button class="btn green" style="width:100px">Отправить</button>
			<button class="btn" onclick="$('#user_pkry').hide();return false;" style="left:3px;width:100px">Отмена</button>
        </div>
    </form>
</div>
		</div>`;

			$('#all_alerts').append(data);
		}
		$('#user_pkry').show();
	}
}

function gocard(hash) {
	$('#garlink').hide();
	$load('#garage', '/chatP:cards?hash=' + hash);
}

function gotask() {
	$.ajax({
		url: '../tmp/t_tasks/task-fexec.php',
		type: 'POST',
		data: 'o=1',
		success: function (data) {
			window_tasks();
		},
	});
}

function changetask(id) {
	alertify.confirm('Вы действительно хотите поменять задание за 5000 кристаллов?', function () {
		$.ajax({
			url: '../tmp/t_tasks/task-fexec.php',
			type: 'POST',
			data: 'o=2&id=' + id,
			success: function (data) {
				eval(data);
				window_tasks();
			},
		});
	});
}

function task_success(id) {
	alert('Задание выполено !');
	$.ajax({
		url: '../tmp/t_tasks/task-success.php',
		type: 'POST',
		data: 'id=' + id,
		success: function (data) {
			window_tasks();
		},
	});
	setTimeout(function () {
		//window_tasks();
	}, 100);
}

function govideo(link, time) {
	if (link == undefined) link = $('#ytlink').val();
	if (time == undefined) time = $('#yttime').val();
	if (time == undefined || time == '') time = '';
	else {
		if (time.search(':') !== -1) {
			let a = time.split(':');
			let sec = a[0] * 60;
			sec += Number(a[1]);
			time = sec;
		} else {
			time = time;
		}
	}
	let ytl = youtube_parser(link);
	$('#ytcont').html(
		`<iframe width="100%" height="100%" style="border-radius: 5px;" src="https://www.youtube.com/embed/${ytl}?start=${time}" frameborder="0" allowfullscreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>`,
	);
}

function ytframe(url, time) {
	$('#garage').empty();
	$('#garurl, #garlink').hide();
	$('#nav-garage').removeClass('active');
	$('#nav-clans').removeClass('active');
	let atime = '';
	if (url == undefined) url = 'CIe9flZD7iQ';
	if (time !== undefined) {
		if (time.search(':') !== -1) {
			let a = time.split(':');
			let sec = a[0] * 60;
			sec += Number(a[1]);
			time = sec;
		} else {
			time = time;
		}
		atime = `?start=${time}`;
		time = `value="${time}"`;
	}
	url = url.replace('https://youtu.be/', '');
	let html = `
		<div class="LabelText" style="text-transform: none;">YouTube</div>
		<div class="chatto-bg" style="top: 2px;height:calc(100vh - 108px)">
		<div>
		<form action="javascript:govideo()">
		<input type="text" class="text" id="ytlink" value="https://www.youtube.com/watch?v=${url}" placeholder="Вставьте ссылку на youtube видео" style="width: calc(100% - 195px);padding-left: 5px;display:inline-block;">
		<input type="text" class="text" id="yttime" autocomplete="off" placeholder="Время" ${time} style="width: 90px;text-align: center;">
		<button class="tobtn" style="top:0px">Смотреть</button>
		</form>
		</div>
		<div class="wide_block wide-bg" style="height: calc(100vh - 155px);margin-top: 10px;padding: 1px;width: inherit;border-radius: 5px;">
		<div id="ytcont" style="width:100%;height:100%;border-radius: 5px;">
		<iframe width="100%" height="100%" style="border-radius: 5px;" src="https://www.youtube.com/embed/${url}${atime}" frameborder="0" allowfullscreen></iframe>
		</div>
		</div>
		</div>
		`;
	$('#garage').html(html);
}

function youtubel(link, time) {
	$('#garlink').hide();
	$('#garlinks').hide();
	$load('#garage', '../tmp/t_pages/u_video.php');
	setTimeout(function () {
		govideo(link, time);
	}, 500);
}

function alerty(evaled, value) {
	if (value == undefined || value == '') {
		value = 'Вы действительно подтверждаете это действие ?';
	}
	alertify.confirm(value, function () {
		eval(evaled);
	});
}

function cacheImg() {
	$.when($('body').append("<div id='imagecache'></div>")).then(function () {
		// General
		$('#imagecache').append('<img src="../assets/img/m_bg.png">');
		$('#imagecache').append('<img src="../assets/img/update.png">');

		//buttons
		$('#imagecache').append('<img src="../assets/img/btn/btn_c.png">');
		$('#imagecache').append('<img src="../assets/img/btn/btn_l.png">');
		$('#imagecache').append('<img src="../assets/img/btn/btn_r.png">');

		$('#imagecache').append('<img src="../assets/img/btn/green/btn_c.png">');
		$('#imagecache').append('<img src="../assets/img/btn/green/btn_l.png">');
		$('#imagecache').append('<img src="../assets/img/btn/green/btn_r.png">');

		$('#imagecache').append('<img src="../assets/img/btn/red/btn_c.png">');
		$('#imagecache').append('<img src="../assets/img/btn/red/btn_l.png">');
		$('#imagecache').append('<img src="../assets/img/btn/red/btn_r.png">');

		$('#imagecache').append('<img src="../assets/img/btn_cancel.png">');
		$('#imagecache').append('<img src="../assets/img/btn_close.png">');

		$('#imagecache').append('<img src="../assets/img/garage/item.png">');
		$('#imagecache').append('<img src="../assets/img/greenbg.png">');
		$('#imagecache').append('<img src="../assets/img/kry.png">');
		$('#imagecache').append('<img src="../assets/img/kry1.png">');
		$('#imagecache').append('<img src="../assets/img/kry_r.png">');
		$('#imagecache').append('<img src="../assets/img/tobtn.png">');

		$('#imagecache').append('<img src="../assets/img/wifi.png">');
		$('#imagecache').append('<img src="../assets/img/m_title.png">');

		// Garage
		$('#imagecache').append('<img src="../assets/img/case/case-bg.png">');

		// Shop
		$('#imagecache').append('<img src="../assets/img/krys1.png">');
		$('#imagecache').append('<img src="../assets/img/krys2.png">');
		$('#imagecache').append('<img src="../assets/img/krys3.png">');
		$('#imagecache').append('<img src="../assets/img/krys4.png">');
		$('#imagecache').append('<img src="../assets/img/krys5.png">');

		$('#imagecache').append('<img src="../assets/img/mg-kry1.png">');
		$('#imagecache').append('<img src="../assets/img/mg-kry2.png">');
		$('#imagecache').append('<img src="../assets/img/krybig.png">');

		$('#imagecache').append('<img src="../assets/img/mg-card.png">');
		$('#imagecache').append('<img src="../assets/img/mg-card1.png">');
		$('#imagecache').append('<img src="../assets/img/mg-card2.png">');
		$('#imagecache').append('<img src="../assets/img/mg-card3.png">');
		$('#imagecache').append('<img src="../assets/img/mg-card4.png">');
		$('#imagecache').append('<img src="../assets/img/mg-card5.png">');
		$('#imagecache').append('<img src="../assets/img/mg-big.png">');
		$('#imagecache').append('<img src="../assets/img/mg-big1.png">');

		// Tasks
		$('#imagecache').append('<img src="../assets/img/premium.png">');
		$('#imagecache').append('<img src="../assets/img/chats.png">');
		$('#imagecache').append('<img src="../assets/img/qopt.png">');

		// Clan
		$('#imagecache').append('<img src="../assets/img/clan_w.png">');

		// Friends
		$('#imagecache').append('<img src="../assets/img/friends_btns.png">');

		// Other
		$('#imagecache').append('<img src="../assets/img/gift_send.png">');

		$('#imagecache').append(
			'<img src="https://s.eu.tankionline.com//545/14626/172/151/26243145633661/image.tnk">',
		);
		$('#imagecache').append(
			'<img src="https://s.eu.tankionline.com//545/41212/53/32/26250570045425/image.tnk">',
		);
		$('#imagecache').append(
			'<img src="https://s.eu.tankionline.com//544/131131/227/262/26226226607477/image.tnk">',
		);
		$('#imagecache').append(
			'<img src="https://s.eu.tankionline.com//0/16723/260/206/25741226202510/image.tnk">',
		);
	});

	setTimeout(function () {
		$('#imagecache').remove();
	}, 5000);
}

/*

function ignore(login){
 $("div[by='"+login+"']").html("Скрытое сообщение пользователя "+login+" !");
$("div[by='"+login+"']").attr("style","background-color:rgba(0,0,0,0.2);font-weight:bold;padding:3px;color:limegreen;");
}

var msgignore = setInterval(function(){ignore("Тут логин")},0);
*/

function snoww() {
	if ($('.snowing').length) {
		$('.snowing').remove();
		//alert('Снег был успешно отключён!');
	} else {
		$('body').append("<div class='snowing'></div>");
		//alert('Снег был успешно включён!');
	}
}
function snoww() {
	if ($('.snowing').length) {
		$('.snowing').remove();
		//alert('Снег был успешно отключён!');
	} else {
		$('body').append("<div class='snowing'></div>");
		setTimeout(() => {
			for (let i = 1; i <= 200; i++) {
				$('.snowing').append('<div class="snow"></div>');
			}
		}, 100);
		//alert('Снег был успешно включён!');
	}
}

$(document).keyup(function (e) {
	if (MY.escToExit) {
		if (e.keyCode == 27) {
			if ($('.mask').is(':visible')) {
				$('.mask').fadeOut(50);
			} else {
				if ($('#game_exit').is(':visible')) {
					$('#game_exit').fadeOut(50);
				} else {
					game_exit();
				}
			}
		}
	}

	if (e.keyCode == 113) {
		$load('#profile_content1', '/chatP:rules');
		$('#profile').show();
	}
	if (e.keyCode == 120) {
		$.get('/chatP:online', function (e) {
			let html = `
      <div class="LabelText">Онлайн</div>
      <div class="chatto-bg" style="height: calc(100vh - 108px);margin-top: 3px;color:#fff;">
         <div class="wide-bg" style="height:100%">
            <div style="padding:10px">
               <div style="margin: -9px;padding: 10px;background: linear-gradient(135deg, #904e95 20%, #e96450 80%);border-top-right-radius: 3px;border-top-left-radius: 3px;text-align: center;font-family: 'PT SANS';font-weight: lighter;font-size: 2em;">Онлайн пользователи <span style="font-size:0.7em;">(<span id='online_Ue'></span>)</span></div>
            </div>
            <div style="height: 90%;overflow-y: auto;padding:1px;">
               <table class="mdn-table">
                  <thead>
                     <tr>
                        <th style="width: 30px;text-align:center;">Ранг</th>
                        <th style="text-align:left;">Пользователь</th>
                        <th style="width: 100px;">Кристаллы</th>
                        <th style="width: 125px;">В сети</th>
                        <th style="width: 45px;text-align:center;">Клан</th>
                        <th style="width: 60px;">Написать</th>
                     </tr>
                  </thead>
                  <tbody id="online_users_logE">
                  </tbody>
               </table>
            </div>
         </div>
      </div>
      `;

			$('#profile_content1').html(html);

			e = JSON.parse(e);

			let len = e.length - 1;

			$('#online_Ue').html(len);

			for (let i = 0; i <= len; i++) {
				let login = e[i].login;
				let kry = e[i].kry;
				let messages = e[i].msg;
				let group = e[i].group;
				let vip = e[i].vip;
				let rang_id = e[i].rang_id;
				let mob = e[i].mob;
				let active = e[i].active;

				let clan = e[i].clan;
				if (clan !== '&mdash;') {
					clan = clan.split(';');
					let clan_id = clan[0];
					let clan_name = clan[1];
					clan = `<a onclick="clan(${clan_id})">[${clan_name}]</a>`;
				}

				let style, rank;

				if (mob == 1) {
					mob = "<img style='float: right;' src='../../assets/img/mob.png?1'>";
				} else {
					mob = '';
				}

				if (vip == 1) rank = `<div class='rank rv${rang_id}'></div>`;
				else rank = `<div class='rank r${rang_id}'></div>`;

				if (group == 1) {
					group = '';
					style = '';
				} else if (group == 2) {
					group = "<div class='group-icon icons icon-moderator'></div>";
					style = 'style="color:#ffc107;"';
				} else if (group == 3) {
					group = "<div class='group-icon icons icon-adminb'></div>";
					style = 'style="color:#2196F3;"';
				} else if (group == 4) {
					group = "<div class='group-icon icons icon-moderb'></div>";
					style = 'style="color:#ffc107;"';
				} else if (group == 5) {
					group = "<div class='group-icon icons icon-helper'></div>";
					style = 'style="color:yellow;"';
				}

				let html1 = `
  <tr>
  <td style="text-align:center;">${rank}</td>
  <td style="text-align:left;">${group}<a ${style} onclick="profile('${login}')">${login} (${messages})</a></td>
  <td style="width:130px">${kry} <img src="../assets/img/kry.png"></td>
  <td style="text-align:left;">${mob} ${active}</td>
  <td style="text-align:center;">${clan}</td>
  <td><a onclick="to('${login}')" style="color:#12ff00;text-decoration:none;">/to</a> <a onclick="pm('${login}')" style="color:#12ff00;text-decoration:none;">[PM]</a></td>
  </tr>
        `;
				$('#online_users_logE').append(html1);
			}

			$('#userLoading').hide();
		});
		$('#profile').show();
	}
	if (e.keyCode == 118) {
		// F7
		snoww();
		e.preventDefault();
		return false;
	}
});
/*******************************************************************************************************************
***********************************************Updates
/*******************************************************************************************************************/

/* JS RELOAD */
function reloadJS() {
	$("script[sv='js']").remove();
	var i = rand(100000, 9999999);
	$('body').append("<script sv='js' src='assets/js/scripts.js?" + i + "'></script>");
}
/* JS RELOAD */

function u_update() {
	$.get('/userInfo-' + MY.rank + '/user', function (e) {
		e = JSON.parse(e);
		let kry = e.kry;
		let rub = e.rub;
		let rank_img = e.rank_img;
		rank_img = rank_img.split(';');
		rank_img =
			'<div class="rank big r' +
			rank_img[0] +
			rank_img[1] +
			'" onclick="profile(\'' +
			rank_img[2] +
			'\')"></div>';
		let rank_text = e.rank_text.split(';');
		rank_text =
			"<span id='myrangnow'>" +
			rank_text[0] +
			"</span>/<span id='myrangnext'>" +
			rank_text[1] +
			'</span> ' +
			rank_text[2];
		let fond = e.fond;
		let rankid = e.rank_img.split(';')[1];

		$('#kry').html(kry);
		$('#rubr').html(rub);
		$('#n_rang').html(rank_text);
		$('.my_rang_n').html(rank_img);
		$('#fond').html(fond);

		MY.score = e.rank_text[0];

		// RANG
		rank_text = e.rank_text.split(';');
		let Rnow = rank_text[0];
		let Rnext = rank_text[1];
		let Rprev = rank_text[3];

		$('.now_rangs').css(
			'width',
			'calc(' + ((Rnow - Rprev) / (Rnext - Rprev)) * 100 + '% + 5px)',
		);

		if (e.rank_img.split(';')[1] == MY.rank) {
		} else {
			alert_anim(
				"<div style='margin-top: -100px;'><img src='assets/rank/cong/" +
					rankid +
					".png'><br/>Вы получили новое звание! <br/> <img src='../assets/img/cong.png'></div>",
			);
		}
		MY.rank = e.rank_img.split(';')[1];
		chatresize();
	});
}

function p_update(id, load) {
	$('#garlink').hide();
	var ids = id - 1;
	if (load == undefined) {
		$load('#garage', '../tmp/t_updates/index.php');
	} else {
	}
	setTimeout(function () {
		smoothScrolls(document.getElementById('update' + id));
		$('#update' + ids).attr('class', 'upd updactive');
	}, 500);
}

function CheckChatLoading() {
	if (window.isloaded == false) {
		let newmsg = $('#chat_messages msg:first').attr('id');
		if (newmsg === undefined) {
			newmsg = '';
		}
		newmsg = newmsg.toString().replace('msg', '');
		console.log('CHAT FALSE!');
	}
}

/*
var goldload = setInterval(function(){
$("#goldload").load("../assets/js/gold.js");
console.clear();
console.log.apply(console, ["\n%c [ChatTO] Console was cleared. %c%c Created by DanRotaru with ❤ \n","color: #fff; background: #222; padding:3px 0;","padding:3px 1px;","color: #fff; background: #47c; padding:3px 0;"]);
},60000);
*/

var mzz = {
	status: false,
	audio: new Audio(),
	volume: 0.7,
	vol: function (n) {
		this.audio.volume = n;
	},
	toggle: function () {
		if (this.audio.paused) this.audio.play();
		else this.audio.pause();
	},
	play: function (src) {
		if (this.status) this.toggle();
		this.audio.src = src;
		this.audio.volume = this.volume;
		this.toggle();
		this.status = true;
	},
};

function playPause() {
	let el = document.querySelector('.music-card #mzzaudio');
	if (el.paused) {
		$('.music-card .play').addClass('pause');
		$('.music-card .play').removeClass('play');
		el.play();
	} else {
		$('.music-card .pause').addClass('play');
		$('.music-card .pause').removeClass('pause');
		el.pause();
	}
}
function mzzv(a) {
	// if($("#mzzaudio").length) document.getElementById("mzzaudio").pause();
	if (a == undefined) a = mzz.volume;
	if (document.getElementById('mzzaudio') !== null) {
		document.getElementById('mzzaudio').volume = a;
		mzz.volume = a;
	}
}

setInterval(function () {
	if ($('#list').css('display', 'block')) {
		$('#list').hide();
	}
}, 180000);

function network_state(e) {
	if (e == 1) {
		$('#wifioff').hide();
	} else {
		$('#wifioff').show();
	}
}

window.addEventListener('online', function () {
	network_state(1);
});
window.addEventListener('offline', function () {
	network_state(2);
});

function stopchat() {
	load_messes = function () {};
	rgtst = function () {};

	$('body').append("<div id='stopchat'></div>");
}

function startchat() {
	$('#stopchat').remove();
}

function clearDefChat() {
	stopchat();
	$('.chat').remove();
	$('body').append(
		`<style>.garage{left:5px!important;width: calc(100vw - 10px) !important;margin-left: 0px !important;}</style>`,
	);
}

function consoleChat() {
	if (document.location.search !== '?dev=1') {
		console.clear();
		console.log.apply(console, [
			'\n%c [ChatTO] Console was cleared. %c%c Created by DanRotaru with ❤ \n',
			'color: #fff; background: #222; padding:3px 0;',
			'padding:3px 1px;',
			'color: #fff; background: #47c; padding:3px 0;',
		]);
	}
}

function showsmiles(i) {
	let smiles = CHATTO_smiles;
	let len = smiles.length;

	if (i == undefined) {
		for (let i = 0; i < len; i++) {
			let j = smiles[i].split('&');
			$('#smiles-div').append(
				`<button class="btn" onclick="wmsg('${j[0]}')"><img src="../assets/rank/smiles/${j[1]}"></button>`,
			);
		}
	} else {
		let html1 = `<div style="overflow-y: auto;height: 300px;margin: -12px -7px;overflow-x: hidden;"><table class="mdn-table"><thead><tr><th style="position: sticky;top: 0px">Код</th><th style="width:70px;position: sticky;top: 0px">Значение</th></tr></thead><tbody>`;
		let html2 = `</tbody></table></div>`;
		let html3 = '';

		for (let i = 0; i < len; i++) {
			let j = smiles[i].split('&');
			html3 += `<tr><td><b style="color:#fff"> ${j[0]} </b></td><td><img src="../assets/rank/smiles/${j[1]}"></td></tr>`;
		}

		let html = html1 + html3 + html2;
		let alert = `<div class="chatto-alert" id="alertA" style="z-index:99999999;display: block;"><div class="alert" data-label="Внимание"><div class="content" style="width: 260px;min-width: 100px;"><div class="msg">${html}</div><nav><button onclick="$('#alertA').fadeOut(50)" class="btn_close"></button></nav></div></div></div>`;
		if ($('#alertA').length) {
		} else {
			$('#all_alerts').append(alert);
		}
		$('#alertA').fadeIn(50);
	}
}

function getNumEnding(number, endingArray) {
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

const RangeSlider = (elem, value = 0, onDrag) => {
	const updateDragger = (e) => {
		if (down && e.pageX >= rangeLeft && e.pageX <= rangeLeft + rangeWidth) {
			dragger.style.left = e.pageX - rangeLeft - draggerWidth + 'px';
			if (typeof onDrag == 'function') {
				onDrag(Math.round(((e.pageX - rangeLeft) / rangeWidth) * 100));
				e.preventDefault();
			}
		}
	};

	let range = document.querySelector(elem),
		dragger = range.children[0],
		draggerWidth = 10, // width of your dragger
		down = false,
		rangeWidth,
		rangeLeft;

	dragger.style.left = -draggerWidth + 'px';
	// dragger.style.marginLeft = (draggerWidth / 2) + 'px';

	if (value) dragger.style.left = value + '%';

	range.addEventListener('mousedown', function (e) {
		rangeWidth = this.offsetWidth;
		rangeLeft = this.offsetLeft;
		down = true;
		updateDragger(e);
		return false;
	});

	document.addEventListener('mousemove', (e) => updateDragger(e));
	document.addEventListener('mouseup', () => (down = false));
};

$('#ModifyingBtn').click(function () {
	let msg = $('#text').val();
	$.ajax({
		type: 'POST',
		url: '../tmp/t_chat/message-upd.php',
		data: 'msg=' + msg,
		success: function (e) {
			console.log(e);
		},
	});
});

function openYoutubeModal() {
	if (!$('#YoutubeModal').length) {
		$('#all_alerts').append(`
			<div id="YoutubeModal">
				<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
				<div class="LabelText">YouTube</div>
				<div class="chatto-bg">
					<input placeholder="YouTube URL" class="text">
					<button class="btn">Открыть</button>
					<div id="ytModalIframe"></div>
				</div>
				<script>
				$(function() {
					//$("#YoutubeModal").draggable();
					$("#YoutubeModal").resizable();
				});
					$("#YoutubeModal .btn").click(function(){
						let yt = youtube_parser($("#YoutubeModal input").val());
						$("#ytModalIframe").html('<iframe width="100%" height="100%" style="border-radius: 5px;" src="https://www.youtube.com/embed/'+yt+'" frameborder="0" allowfullscreen=""></iframe>');
					});
				</script>
			</div>
		`);
	} else {
		$('#YoutubeModal').show();
	}
}

////////////////////////////////////////////////////////////////////////////////

// window resize
$(window).resize(function () {
	chatresize();
});

// ready events
$(document).ready(function () {
	//resize chat
	chatresize();

	//load chat
	load_messes();

	//post screen resolution
	$.post('/', { s: 1, width: screen.width, height: screen.height });

	//onsubmit chatform
	$('#chatform').submit(function (e) {
		e.preventDefault();
		let m;
		if (MY.upper == 1) m = 1;
		else m = 0;
		send_m(m);
	});

	//if is not mobile load garage
	if (MY.mobile == 0 && MY.mobileDesktop == 0) {
		load_page(1, 0);
		$('#g-img').remove();
	} else if (MY.mobile == 1 && MY.mobileDesktop == 1) {
		load_page(1, 0);
		$('#g-img').remove();
	}

	//loading additional setup
	$('#p_helpers').load('../tmp/t_pages/helps.php');
	$('.user-menu').load('../tmp/t_index/index_menu.php');
	$('#p_newsC').load('../tmp/t_updates/p_news.php');

	//put some images in cache
	cacheImg();

	//loading smiles
	setTimeout(showsmiles, 1500);

	//onclick fond (what to open)
	if (MY.login == 'DanRotaru') {
		$('.fond').click(function () {
			$('#garlink').hide();
			online();
		});
	} else {
		$('.fond').dblclick(function () {
			$('#garlink').hide();
			online();
		});
	}

	//additional page setup (appending some elements)

	//alert-animation modal
	$('#all_alerts').append(
		`<div desc="Анимации появлении" class="mask" id="alert-animation" style="display:none"><div id="alert-anim0" class="chatto-bg" style="margin: 15% auto;text-align: center;width:fit-content;padding:5px;height:fit-content;"><div id="alert-anim"></div><div><button style="margin-top:10px" class="btn-closer" onclick="anim_close()"></button></div></div></div>`,
	);

	//profile modal
	$('#all_alerts').append(
		`<div class="mask" id="profile"><div id="profile_content1" style="width: 65%;min-width: 850px;height: 90vh;margin: 30px auto;"></div><div style="position: absolute;top: 60px;right: calc(19vw - 10px);"><button onclick="$('#profile').fadeOut(50);" class="btn red">Закрыть</button></div></div>	`,
	);

	//alertY1 modal
	$('#all_alerts').append(
		`<div desc="Альтернативные окна" class="alertY1"><div class="dialog"><div><p>Msg</p><nav><button class="btn_close" onclick="alertYc()"></button></nav></div></div></div>`,
	);

	// exit modal
	$('#all_alerts').append(
		`<div desc="Выход из игры" class="mask" id="game_exit"><div class="exit-alert exit-alert"><div class="alert_content"><div class="alert_content1"><div class="alertifymsg">Выйти из игры?</div><div class="alert_footer"><button onclick="$('#game_exit').fadeOut(50);logout()" class="btn_yes"></button><button onclick="$('#game_exit').fadeOut(50);" style="left: 10px;" class="btn_no"></button></div></div></div></div></div>`,
	);

	//openlink modal
	$('#all_alerts').append(
		`<div id="url_exit" class="chatto-alert"><div class="alert"><div class="content"><div><img src="../../assets/img/url_external.webp" style="width: 100%;"></div><div class="wide-bg">Внимание! Вы собираетесь перейти по внешней ссылке:</div><input type="text" readonly onclick="this.select()" class="text"><nav><button class="btn green" style="top: 2px;margin-right: 10px;width: 100px;">Открыть</button><button onclick="url_exit()" class="btn_close"></button></nav></div></div></div>`,
	);

	//clan modal
	$('#all_alerts').append(`<div class="mask" id="clan"></div>`);

	//garage loading animaation
	$('.all_garage').append(`<div id="userLoading" class="progress"></div>`);

	//iframe/image links
	$('.all_garage').append(`<div id="garlink"></div>`);

	//smiles load
	$('.chat-container').append(
		`<div id="smiles"><div class="chatto-bg smiles-div"><div style="height: 100%;"><div><div id="smiles-div"></div></div></div></div></div>`,
	);

	//firefox
	if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
		$('#chat_messages').css('scrollbar-width', 'thin');
	}

	//img
	$('img').error(function () {
		$(this).attr('src', '../assets/img/broken.png');
	});
	$('img').on('contextmenu', function () {
		return false;
	});
	$('body').on('contextmenu', 'img', function () {
		return false;
	});

	//final loading
	$(window).load(function () {
		//resize
		chatresize();

		//successfuly loading consoleLog
		consoleChat();
		//setInterval(CheckChatLoading, 2000);

		//create Audio Striming (if is ON)
		if (typeof settings !== 'undefined') {
			if (settings.radio !== 'off') {
				audio.src = settings.radio;
				audio.volume = Number(settings.radio_volume.replace('%', '')) / 100;
				audio.loop = true;
			}
		}

		//clear console after 3 seconds when page was loaded
		setTimeout(consoleChat, 3000);
	});
});
WARN = true;
