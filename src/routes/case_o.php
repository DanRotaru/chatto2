<?php
####################################################
# @author DanRotaru
# @info Открытие элитного контейнера
####################################################

# Подключаем файл с настройками
include_once($_SERVER['DOCUMENT_ROOT']."/src/config.php");


$id = intval($_POST['id']);
if (!isset($id) || empty($id)) {
	exit();
}

/*
if($alls['login'] !== "DanRotaru"){
	exit("Идёт работа!");
}
*/


if (isset($_POST['check'])) {
	/*
if ($_SESSION['case_time_activate'] > time()){
	$ktime = $_SESSION['case_time_activate'] - time();
	exit("Ожидайте $ktime секунд для повторной открытие элитного контейнера.");
}else{
	exit("null");
}*/
	exit("null");
}



$date = date("d.m.y");
$time = date("H:i");
$ip = $_SERVER['REMOTE_ADDR'];



$mylogin = $alls['login'];
$mylogin1 = ModernUser($mylogin);


if ($id == 1) {
	$gID = 6;
}
if ($id == 2) {
	$gID = 7;
}
if ($id == 3) {
	$gID = 8;
}


if ($alls['k'.$gID] <= 0) {
	exit();
}



if ($id == 1) {
	$gName = '{:chatto-yellow=Элитный контейнер:}';

	$gID = 6;
    #Цена: 20 РУБ
	$price = 20;
    #Выбираем приз
	$prize = rand(1, 1000);


	if ($prize < 400) {
		#Кристаллы
		$prizeID = 1;

		#Генерируем количество кристаллов
		$kry = rand(2000, 40000);#Выдаём
		mysql_query("UPDATE users SET `kry`=`kry`+'$kry' WHERE login='$mylogin'");
	}
	elseif($prize >= 400 && $prize < 500) {
		#Премиум
		$prizeID = 2;

		#Генерируем время премиум аккаунта
		$vip_num = rand(1, 1000);

		if ($vip_num <= 500) {
			#	На 24 часа(сутки)
			$name = "1 день";
			$vip_time = 1440;
		}
		if ($vip_num > 500 && $vip_num <= 700) {
			#	На 48 часов(2 сутки)
			$name = "2 дня";
			$vip_time = 2880;
		}
		if ($vip_num > 700 && $vip_num <= 850) {
			#	На 72 часов(3 сутки)
			$name = "3 дня";
			$vip_time = 4320;
		}
		if ($vip_num > 850 && $vip_num <= 950) {
			#	На 8 часов
			$name = "8 часов";
			$vip_time = 480;
		}
		if ($vip_num > 950) {
			#	На 168 часа(неделю)
			$name = "неделю";
			$vip_time = 10080;
		}
		$vip_name = $name.
		" премиум аккаунта";
		$vip_name1 = $name.
		" премиум аккаунта";

		#Выдаём
		if ($alls['viptime'] !== 0) {
			$time = $alls['viptime'] - time();
		} else {
			$time = 0;
		}
		if ($time < 0) {
			$time = 0;
		}
		$viptime = $vip_time * 60 + time() + $time;
		mysql_query("UPDATE `users` SET `vip`='1',`viptime`='$viptime' WHERE `login`='$mylogin'");



	}
	elseif($prize >= 500 && $prize < 650) {
		#Обычные контейнеры
		$prizeID = 3;#Генерируем какой получить контейнер
		$box = rand(1, 100);

		if ($box <= 40) {
			$box = 1;
		}
		elseif($box > 40 && $box <= 70) {
			$box = 2;
		}
		elseif($box > 70 && $box <= 80) {
			$box = 3;
		}
		elseif($box > 80 && $box <= 95) {
			$box = 4;
		}
		elseif($box > 95) {
			$box = 5;
		}

		if ($box == 1) {
			$name = "«Контейнер 1»";
			$box_num = rand(5, 10);
		}
		elseif($box == 2) {
			$name = "«Контейнер 2»";
			$box_num = rand(2, 8);
		}
		elseif($box == 3) {
			$name = "«Контейнер 3»";
			$box_num = rand(2, 5);
		}
		elseif($box == 4) {
			$name = "Кейс «Кристаллы»";
			$box_num = rand(1, 3);
		}
		elseif($box == 5) {
			$name = "Кейс «Опыт»";
			$box_num = rand(1, 2);
		}

		if ($box_num == 1) {
			$keys_name = "1 ".$name;
		} else {
			$keys_name = $name.
			" в количестве $box_num штук";
		}

		if ($box <= 3) {
			$keys_img = "../assets/img/garage/keys.png";
		}
		elseif($box == 4) {
			$keys_img = "../assets/img/garage/keys1.png";
		}
		elseif($box == 5) {
			$keys_img = "../assets/img/garage/keys2.png";
		}


		# Выдаём
		mysql_query("UPDATE users SET `k$box`=`k$box`+'$box_num' WHERE login='$mylogin'");
	}
	elseif($prize >= 650 && $prize < 720) {
		#Опыт
		$prizeID = 4;

		#Генерируем количество кристаллов
		$rang_win = rand(2000, 7000);#Выдаём
		mysql_query("UPDATE users SET `rang`=`rang`+'$rang_win' WHERE login='$mylogin'");
	}
	elseif($prize >= 720 && $prize < 980) {
		#Золотые ящики
		$prizeID = 5;

		$golds_num = rand(2, 10);
		if ($golds_num <= 4) {
			$Gending = "а";
		}
		elseif($golds_num > 4) {
			$Gending = "ов";
		}

		$golds_name = "Набор в $golds_num золотых ящик$Gending";
		mysql_query("UPDATE users SET `pr1`=`pr1`+'$golds_num' WHERE login='$mylogin'");
	}
	elseif($prize >= 980) {
		#ХТ вооружения
		$prizeID = 6;

		$xtNames = "`hanter_xt`,`izida_xt`,`twins_xt`,`fire_dc`,`grom_lgc`,`shaft_xt`,`rik_xt`,`friz_xt`,`smoki_xt`,`viking_lgc`,`dik_xt`,`titan_xt`,`mamont_xt`,`viking_xt`,`wasp_xt`,`hornet_xt`,`vulkan_xt`,`grom_xt`,`fire_xt`,`railgun_xt`";
		$myG = mysql_fetch_array(mysql_query("SELECT $xtNames FROM `garages` WHERE login='$mylogin' LIMIT 1"));


		$xt = rand(1, 19);

		if ($xt == 1 && $myG['railgun_xt'] == "0") {
			$xt_name = "Рельсу ХТ";
			$xt_name1 = "railgun_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/0/00/Turret_railgun_xt_m3.png/160px-Turret_railgun_xt_m3.png";
		}
		elseif($xt == 2 && $myG['fire_xt'] == "0") {
			$xt_name = "Огнемёт ХТ";
			$xt_name1 = "fire_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/3/30/Turret_fire_xt_m3.png/160px-Turret_fire_xt_m3.png";
		}
		elseif($xt == 3 && $myG['grom_xt'] == "0") {
			$xt_name = "Гром ХТ";
			$xt_name1 = "grom_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/0/02/Turret_thunder_xt_m3.png/160px-Turret_thunder_xt_m3.png";
		}
		elseif($xt == 4 && $myG['vulkan_xt'] == "0") {
			$xt_name = "Вулкан ХТ";
			$xt_name1 = "vulkan_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/f/f3/Turret_vulcan_xt_m3.png/160px-Turret_vulcan_xt_m3.png";
		}
		elseif($xt == 5 && $myG['hornet_xt'] == "0") {
			$xt_name = "Хорнет ХТ";
			$xt_name1 = "hornet_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/f/f7/Hull_hornet_xt_m3.png/160px-Hull_hornet_xt_m3.png";
		}
		elseif($xt == 6 && $myG['wasp_xt'] == "0") {
			$xt_name = "Васп ХТ";
			$xt_name1 = "wasp_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/6/6f/Hull_wasp_xt_m3.png/160px-Hull_wasp_xt_m3.png";
		}
		elseif($xt == 7 && $myG['viking_xt'] == "0") {
			$xt_name = "Викинг ХТ";
			$xt_name1 = "viking_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/d/d3/Hull_viking_xt_m3.png/160px-Hull_viking_xt_m3.png";
		}
		elseif($xt == 8 && $myG['mamont_xt'] == "0") {
			$xt_name = "Мамонт ХТ";
			$xt_name1 = "mamont_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/f/fb/Hull_mammoth_xt_m3.png/160px-Hull_mammoth_xt_m3.png";
		}
		elseif($xt == 9 && $myG['titan_xt'] == "0") {
			$xt_name = "Титан ХТ";
			$xt_name1 = "titan_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/8/8f/Titanium_XT.png/160px-Titanium_XT.png";
		}
		elseif($xt == 10 && $myG['dik_xt'] == "0") {
			$xt_name = "Диктатор XT";
			$xt_name1 = "dik_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/9/9d/DikXT.png/160px-DikXT.png";
		}
		elseif($xt == 11 && $myG['viking_lgc'] == "0") {
			$xt_name = "Викинг Legacy";
			$xt_name1 = "viking_lgc";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/b/ba/Skin_viking_legacy.png/160px-Skin_viking_legacy.png";
		}
		elseif($xt == 12 && $myG['smoki_xt'] == "0") {
			$xt_name = "Смоки ХТ";
			$xt_name1 = "smoki_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/2/25/Skin_smoky_xt.png/160px-Skin_smoky_xt.png";
		}
		elseif($xt == 13 && $myG['friz_xt'] == "0") {
			$xt_name = "Фриз ХТ";
			$xt_name1 = "friz_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/7/72/Frieze.png/160px-Frieze.png";
		}
		elseif($xt == 14 && $myG['rik_xt'] == "0") {
			$xt_name = "Рикошет ХТ";
			$xt_name1 = "rik_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/6/66/Skin_rick.png/160px-Skin_rick.png";
		}
		elseif($xt == 15 && $myG['shaft_xt'] == "0") {
			$xt_name = "Шафт ХТ";
			$xt_name1 = "shaft_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/4/47/Shaft_xt.png/160px-Shaft_xt.png";
		}
		elseif($xt == 16 && $myG['grom_lgc'] == "0") {
			$xt_name = "Гром Legacy";
			$xt_name1 = "grom_lgc";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/f/f9/Thunder_m3_old.png/150px-Thunder_m3_old.png";
		}
		elseif($xt == 17 && $myG['fire_dc'] == "0") {
			$xt_name = "Огнемёт DC";
			$xt_name1 = "fire_dc";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/4/42/Skin_firebird_demonic_preview.png/160px-Skin_firebird_demonic_preview.png";
		}
		elseif($xt == 18 && $myG['izida_xt'] == "0") {
			$xt_name = "Изида ХТ";
			$xt_name1 = "izida_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/b/bb/Isida_xt.png/160px-Isida_xt.png";
		}
		elseif($xt == 19 && $myG['twins_xt'] == "0") {
			$xt_name = "Твинс ХТ";
			$xt_name1 = "twins_xt";
			mysql_query("UPDATE `garages` SET $xt_name1='1' WHERE login='$mylogin'");
			$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/e/ea/TwinsXT_skin.png/160px-TwinsXT_skin.png";
		} else {
			$xt_names = [
				"Рельсу ХТ",
				"Огнемёт ХТ",
				"Гром ХТ",
				"Вулкан ХТ",
				"Хорнет ХТ",
				"Васп ХТ",
				"Викинг ХТ",
				"Мамонт ХТ",
				"Титан ХТ",
				"Диктатор XT",
				"Викинг Legacy",
				"Смоки ХТ",
				"Фриз ХТ",
				"Рикошет ХТ",
				"Шафт ХТ",
				"Гром Legacy",
				"Огнемёт DC",
				"Изида ХТ",
				"Твинс ХТ"
			];
			$xt_name = $xt_names[array_rand($xt_names)];

			if ($xt_name == "Рельсу ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/0/00/Turret_railgun_xt_m3.png/160px-Turret_railgun_xt_m3.png";
			}
			elseif($xt_name == "Огнемёт ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/3/30/Turret_fire_xt_m3.png/160px-Turret_fire_xt_m3.png";
			}
			elseif($xt_name == "Гром ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/0/02/Turret_thunder_xt_m3.png/160px-Turret_thunder_xt_m3.png";
			}
			elseif($xt_name == "Вулкан ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/f/f3/Turret_vulcan_xt_m3.png/160px-Turret_vulcan_xt_m3.png";
			}
			elseif($xt_name == "Хорнет ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/f/f7/Hull_hornet_xt_m3.png/160px-Hull_hornet_xt_m3.png";
			}
			elseif($xt_name == "Васп ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/6/6f/Hull_wasp_xt_m3.png/160px-Hull_wasp_xt_m3.png";
			}
			elseif($xt_name == "Викинг ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/d/d3/Hull_viking_xt_m3.png/160px-Hull_viking_xt_m3.png";
			}
			elseif($xt_name == "Мамонт ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/f/fb/Hull_mammoth_xt_m3.png/160px-Hull_mammoth_xt_m3.png";
			}
			elseif($xt_name == "Титан ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/8/8f/Titanium_XT.png/160px-Titanium_XT.png";
			}
			elseif($xt_name == "Диктатор ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/9/9d/DikXT.png/160px-DikXT.png";
			}
			elseif($xt_name == "Викинг Legacy") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/b/ba/Skin_viking_legacy.png/160px-Skin_viking_legacy.png";
			}
			elseif($xt_name == "Смоки ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/2/25/Skin_smoky_xt.png/160px-Skin_smoky_xt.png";
			}
			elseif($xt_name == "Фриз ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/7/72/Frieze.png/160px-Frieze.png";
			}
			elseif($xt_name == "Рикошет ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/6/66/Skin_rick.png/160px-Skin_rick.png";
			}
			elseif($xt_name == "Шафт ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/4/47/Shaft_xt.png/160px-Shaft_xt.png";
			}
			elseif($xt_name == "Гром Legacy") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/f/f9/Thunder_m3_old.png/150px-Thunder_m3_old.png";
			}
			elseif($xt_name == "Огнемёт DC") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/4/42/Skin_firebird_demonic_preview.png/160px-Skin_firebird_demonic_preview.png";
			}
			elseif($xt_name == "Изида ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/b/bb/Isida_xt.png/160px-Isida_xt.png";
			}
			elseif($xt_name == "Твинс ХТ") {
				$xt_img = "https://ru.tankiwiki.com/images/ru/thumb/e/ea/TwinsXT_skin.png/160px-TwinsXT_skin.png";
			}


			$xt_name1 = 0;
			mysql_query("UPDATE users SET `kry`=`kry`+'500000' WHERE login='$mylogin'");
		}

		$xt_name2 = $xt_name;

		/*
		if ($xt_name1 !== "0"){
			mysql_query("UPDATE users SET `kry`=`kry`+'500000' WHERE login='$mylogin'");
		}else{
			mysql_query("UPDATE garages SET $xt_name1='1' WHERE login='$mylogin'");
		}
		*/

	}

	$vip_name = "<span style=\"color:#ff2d74\">$vip_name</span>";
	$keys_name = "<span style=\"color:#ff2d74\">$keys_name</span>";
	$golds_name = "<span style=\"color:#ff2d74\">$golds_name</span>";
	$xt_name = "<span style=\"color:#ff2d74\">$xt_name</span>";

	#Сообщения в чат
		if ($prizeID == 1) {
			#	Кристаллы
			$kry = number_format($kry, 0, ' ', ' ');
			ask("Пользователь $us_rang$mylogin1 открыл $gName и получил {:chatto-yellow=$kry:} :kry:");
		}

		if ($prizeID == 2) {
			#	Премиум
			ask("Пользователь $us_rang$mylogin1 открыл $gName и получил $vip_name");
		}

		if ($prizeID == 3) {
			#	Контейнеры
			ask("Пользователь $us_rang$mylogin1 открыл $gName и получил $keys_name");
		}

		if ($prizeID == 4) {
			#	Опыт
			$rang_win = number_format($rang_win, 0, ' ', ' ');
			ask("Пользователь $us_rang$mylogin1 открыл $gName и получил {:chatto-yellow=$rang_win опыта:}");
		}

		if ($prizeID == 5) {
			#	Золотые ящики
			ask("Пользователь $us_rang$mylogin1 открыл $gName и получил $golds_name");
		}

		if ($prizeID == 6) {
			#	ХТ вооружения
			if ($xt_name1 == "0") {
				$xt_name = "$xt_name2 -- 500 000 :kry:";
			}
			$xt_name = "<span style=\"color:#ff2d74\">$xt_name</span>";
			ask("Пользователь $us_rang$mylogin1 открыл $gName и получил $xt_name");
		}
	#}


	#Сообщение пользователю {
		if ($prizeID == 1) {
			#	Кристаллы
			$img = "../assets/img/big-cry.png";
			$prizeC = "Пакет $kry кристаллов";
		}

		if ($prizeID == 2) {
			#	Премиум
			$img = "../assets/img/premium.png";
			$prizeC = $vip_name1;
		}

		if ($prizeID == 3) {
			#	Контейнеры
			$img = $keys_img;
			$prizeC = $keys_name;
		}

		if ($prizeID == 4) {
			#	Опыт
			$img = "../assets/img/case/rang.png";
			$prizeC = "Пакет $rang_win опыта";
		}

		if ($prizeID == 5) {
			#	Золотые ящики
			$img = "../assets/img/big-golds.png";
			$prizeC = $golds_name;
		}

		if ($prizeID == 6) {
			#	ХТ вооружения
			$img = $xt_img;
			$xt_name = str_replace("--", "—", $xt_name);
			$xt_name = str_replace(":kry:", "<img src=\"../assets/img/mg-kry1.png\">", $xt_name);
			$prizeC = $xt_name;
		}
	#}
	$gID = 6;
	$prizeText = "<img src=\"$img\" style=\"max-width:300px\"><br/>Поздравляем, ваш приз <br/><br/><span style=\"font-size: 50px;\">$prizeC</span>";

	$_SESSION['case_time_activate'] = time() + 10;
	mysql_query("UPDATE users SET `k$gID`=`k$gID`-'1' WHERE login='$mylogin'");

	echo $img.
	" ".$prizeC;
	exit;


}

if ($id == 2) {
	$rand = rand(1, 100);
	if ($rand <= 60) {
		#25 000 кри
$prize = 25000;

		mysql_query("UPDATE users SET `kry`=`kry`+'$prize' WHERE login='$login'");
		ask("Пользователь $mylogin1 открыл Контейнер опыта и получил {:chatto-yellow=25 000:kry::}");
		$text = "Вы успешно открыли контейнер опыта и получили 25 000 кристаллов.";
	}
	if ($rand > 60 && $rand <= 80) {
		#24 часа премиума
if ($alls['viptime'] !== 0) {
		$viptime = $alls['viptime'] - time();
	} else {
		$viptime = 0;
	}
	if ($viptime < 0) {
		$viptime = 0;
	}

	$prize = 1440 * 60 + time() + $viptime;

	mysql_query("UPDATE users SET vip='1',viptime='$prize' WHERE login='$login'");

	ask("Пользователь $mylogin1 открыл Контейнер опыта и получил {:chatto-yellow=24 часа премиум аккаунта:}");
	$text = "Вы успешно открыли контейнер опыта и получили 24 часа премиум аккаунта.";

}
if ($rand > 80 && $rand <= 95) {
	#50 000 кри
$prize = 50000;

	mysql_query("UPDATE users SET `kry`=`kry`+'$prize' WHERE login='$login'");
	ask("Пользователь $mylogin1 открыл Контейнер опыта и получил {:chatto-yellow=50 000:kry::}");
	$text = "Вы успешно открыли контейнер опыта и получили 50 000 кристаллов.";
}
if ($rand > 95 && $rand <= 98) {
	#5 РУБ
$prize = 5;

	mysql_query("UPDATE users SET `rub`=`rub`+'$prize' WHERE login='$login'");
	ask("Пользователь $mylogin1 открыл Контейнер опыта и получил {:chatto-yellow=5 РУБ:}");
	$text = "Вы успешно открыли контейнер опыта и получили 5 РУБ.";
}
if ($rand > 98) {
	#10 РУБ
$prize = 10;

	mysql_query("UPDATE users SET `rub`=`rub`+'$prize' WHERE login='$login'");
	ask("Пользователь $mylogin1 открыл Контейнер опыта и получил {:chatto-yellow=10 РУБ:}");
	$text = "Вы успешно открыли контейнер опыта и получили 10 РУБ.";
}


mysql_query("UPDATE users SET `k7`=`k7`-'1' WHERE login='$login'");
echo("alert_anim('$text');");
exit;
}

if ($id == 3) {
	$rand = mt_rand(1, 100);

	// crystals (20000 - 50000)
	if ($rand <= 50) {
		$prize = mt_rand(20000, 50000);
		mysql_query("UPDATE `users` SET `kry` = `kry` + $prize WHERE `login` = '$login'");
		$img = "../assets/img/big-cry.png";
		$prizeC = "Пакет из ".number_format($prize, 0, ' ', ' ').
		" кристаллов";
	}

	// premium account
	elseif($rand > 50 && $rand <= 76) {
		$img = "../assets/img/premium.png";
		$randVip = mt_rand(1, 100);

		if ($randVip <= 20) { // 5h
			$prizeC = "5 часов премиум аккаунта";
			$vip_time = 300;
		}
		elseif($randVip > 20 && $randVip <= 40) { // 1d
			$prizeC = "1 день премиум аккаунта";
			$vip_time = 1440;
		}
		elseif($randVip > 40 && $randVip <= 48) { // 1h
			$prizeC = "1 час премиум аккаунта";
			$vip_time = 60;
		}
		elseif($randVip > 48 && $randVip <= 52) { // 7d
			$prizeC = "7 дней премиум аккаунта";
			$vip_time = 10080;
		}
		elseif($randVip > 52 && $randVip <= 55) { // 2h
			$prizeC = "2 часа премиум аккаунта";
			$vip_time = 120;
		}
		elseif($randVip > 55 && $randVip <= 60) { // 3h
			$prizeC = "3 часа премиум аккаунта";
			$vip_time = 180;
		}
		elseif($randVip > 60 && $randVip <= 65) { // 2d
			$prizeC = "2 дня премиум аккаунта";
			$vip_time = 2880;
		}
		elseif($randVip > 65 && $randVip <= 70) { // 3d
			$prizeC = "3 дня премиум аккаунта";
			$vip_time = 4320;
		}
		elseif($randVip > 70 && $randVip <= 75) { // 4d
			$prizeC = "4 дня премиум аккаунта";
			$vip_time = 5760;
		}
		elseif($randVip > 75 && $randVip <= 80) { // 5d
			$prizeC = "5 дней премиум аккаунта";
			$vip_time = 7200;
		}
		elseif($randVip > 80) { // 6d
			$prizeC = "6 дней премиум аккаунта";
			$vip_time = 8640;
		}

		$time = 0;
		if ($alls['viptime'] !== 0) {
			$time = $alls['viptime'] - time();
		}
		if ($time < 0) {
			$time = 0;
		}
		$viptime = $vip_time * 60 + time() + $time;
		mysql_query("UPDATE `users` SET `vip` = 1, `viptime` = $viptime WHERE `login`='$login'");
	}

	// gold boxes or batteries
	elseif($rand > 76 && $rand <= 91) {
		$prizeType = mt_rand(0, 1);

		if ($prizeType == 0) { // gold boxes
			$img = "../assets/img/big-golds.png";
			$prize = mt_rand(5, 15);
			$prizeC = "Набор из $prize ".getNumEnding($prize, ['золотой ящик', 'золотых ящика', 'золотых ящиков']);
			mysql_query("UPDATE `users` SET `pr1` = `pr1` + $prize WHERE `login` = '$login'");
		} else { // batteries
			$img = "../assets/img/batteries.png";
			$prize = mt_rand(50, 150);
			$prizeC = "Набор из $prize ".getNumEnding($prize, ['батареи', 'батарей', 'батарей']);
			mysql_query("UPDATE `users` SET `pr3` = `pr3` + $prize WHERE `login` = '$login'");
		}
	}

	// elite containers
	elseif($rand > 91 && $rand <= 96) {
		$img = "../assets/img/tanki-case.png";
		$prize = mt_rand(2, 7);
		$prizeC = "Элитные контейнеры в количестве $prize штук";
		mysql_query("UPDATE `users` SET `k6` = `k6` + $prize WHERE `login` = '$login'");
	}

	// crystals (100000 - 500000)
	elseif($rand > 96 && $rand <= 99) {
		$kryRand = rand(0, 100);
		if ($kryRand < 30) $prize = 1;
		if ($kryRand >= 30 && $kryRand < 46) $prize = 2;
		if ($kryRand >= 46 && $kryRand < 61) $prize = 3;
		if ($kryRand >= 61 && $kryRand < 75) $prize = 4;
		if ($kryRand >= 75 && $kryRand < 83) $prize = 5;
		if ($kryRand >= 83 && $kryRand < 89) $prize = 6;
		if ($kryRand >= 89 && $kryRand < 94) $prize = 7;
		if ($kryRand >= 94 && $kryRand < 97) $prize = 8;
		if ($kryRand >= 97 && $kryRand < 99) $prize = 9;
		if ($kryRand > 99) $prize = 10;
		$prize *= 100000;
		mysql_query("UPDATE `users` SET `kry` = `kry` + $prize WHERE `login` = '$login'");
		$img = "../assets/img/big-cry.png";
		$prizeC = "Пакет из ".number_format($prize, 0, ' ', ' ').
		" кристаллов";
	}

	// rub
	elseif($rand == 100) {
		$prize = mt_rand(2, 7);
		mysql_query("UPDATE `users` SET `rub` = `rub` + $prize WHERE `login` = '$login'");
		$img = "../assets/img/rub.png";
		$prizeC = "$prize РУБ";
	}

	$gID = 8;
	$prizeText = '<img src="'.$img.
	'" style="max-width:300px"><br/>Поздравляем, ваш приз <br/><br/><span style="font-size: 50px;">'.$prizeC.
	'</span>';

	mysql_query("UPDATE users SET `k$gID`=`k$gID`-'1' WHERE login='$mylogin'");
	ask("Пользователь $mylogin1 открыл {:chatto-yellow=Ккоин контейнер:} и получил {:chatto-yellow=".mb_strtolower($prizeC).
		":}");

	echo $img.
	" ".$prizeC;
	exit;
}


function TestIt() {
	$n1 = 0;
	$n2 = 0;
	$n3 = 0;
	$n4 = 0;
	$n5 = 0;
	$n6 = 0;
	for ($i = 1; $i < 100; $i++) {
		$rand = rand(1, 1000);
		if ($rand < 400) {
			#	Kry
			$n1++;
		}
		elseif($rand > 400 && $rand < 500) {
			#	VIP
			$n2++;
		}
		elseif($rand > 500 && $rand < 650) {
			#	Boxes
			$n3++;
		}
		elseif($rand > 650 && $rand < 700) {
			#	Simple paints
			$n4++;
		}
		elseif($rand > 700 && $rand < 980) {
			#	Golds
			$n5++;
		}
		elseif($rand > 980) {
			#	XT
			$n6++;
		}
	}

	echo "Final: $n1/$i";
	echo "\n";
	echo "Final: $n2/$i";
	echo "\n";
	echo "Final: $n3/$i";
	echo "\n";
	echo "Final: $n4/$i";
	echo "\n";
	echo "Final: $n5/$i";
	echo "\n";
	echo "Final: $n6/$i";
	echo "\n";
}