<?php
####################################################
# @author   DanRotaru
# @info 	Отправка сообщений в чат
####################################################
if (!isset($_SESSION)) session_start();
require_once($_SERVER['DOCUMENT_ROOT']."/src/bd.php");
$OurLink = "https://chatto.ru";
$text = $_POST['text'];

if(empty($text) || !isset($text)){
    echo("alert('Введите сообщение!')");
    exit;
}else{
	require_once($_SERVER['DOCUMENT_ROOT']."/src/config.php");
}

$text   = stripslashes($text);
$text   = trim($text);
$text   = mysql_real_escape_string($text);

#Спец. символы
$text = str_replace("<<","«",$text);
$text = str_replace(">>","»",$text);
$text = str_replace("-->","→",$text);
$text = str_replace("<--","←",$text);
$text = str_replace('&#13;', '', $text);
//$text = str_replace("'","''",$text);

if (ctype_space($text) || $text == ""){
	echo("alert('Введите сообщение!')");
	exit;
}

#Возможность использовать HTML тэги
if ($alls['login'] !== "DanRotaru"){
    $text   = htmlspecialchars($text);
}

#Прочие настройки
$Ddate = date("H:i - d.m.y");
$ip = $_SERVER['REMOTE_ADDR'];
$myRanks = ModernUser($login);
$group = $alls['group'];

#Если чат включён
$enabled = mysql_fetch_array(mysql_query("SELECT `enabled` FROM `aconfigs` WHERE id='1' LIMIT 1"))[0];
#Загружаем функции
include("functions.php");

$text   = stripslashes($text);
$text   = trim($text);
$text   = mysql_real_escape_string($text);

#Старт/стоп чата
$start_clock = 9;
$stop_clock = 23;


#Пользователи которые могут общаться в чате пока он выключен
$userWhiteList = ['Q'];
$uCanWrite = false;
$chatWithModerators = false;


#Сколько символов можно использовать в сообщении
$msgLimitNr = 400;


#Провяем если чат запущен
if ($enabled == 0) {
    if($group == 3){$uCanWrite = true;}
    if($chatWithModerators && $group == 2){$uCanWrite = true;}

    if(!$uCanWrite){
        if (in_array($login, $userWhiteList)) $uCanWrite = true;
    }

    if(date("H") >= $stop_clock || date("H") <= $start_clock){
        if(!$uCanWrite){
			addMsg("Чат был автоматически выключен на ночь. Включение в 9 утра.",5);
        }
    }else{
        if(!$uCanWrite){
			addMsg("Подождите, чат остановлен!",3);
        }
    }
}

# Пс, не ставь анти-спам с баном перед этой проверкой, так как можно выйти из бана
#Проверяем бан
$ban = CheckUser();
if ($ban != ''){

$mybanreason = $alls['chatbanreason'];
if ($alls['chatbantime']-time() > 3000000){$mytimeban = "&infin; минут";}else{
    $mytimeban = remaining($alls['chatbantime']-time());
}

$msgBan = "Вы отключены от чата на $mytimeban. Причина: $mybanreason, см. <a onclick='rules()' style='color: #80ff80 !important;'>Правила</a>";
addMsg($msgBan);
}


/* Дублирование сообщений */
$last_m1 = $alls['last_message'];
mysql_query("UPDATE `users` SET `last_message`='$text',`last_message1`='$last_m1' WHERE `login`='$login'");

$ban_for_dublicate = true;

if ($ban_for_dublicate){
    $last_message = $alls['last_message'];

    if ($text == $last_message && $text == $last_m1 && $alls['group'] !== "3" && ($alls['group'] == "1" OR $alls['helper'] == "0")){
        addMsg("Ваше сообщение совпадает с предыдущим (дублирование).");
    }
}
/* Дублирование сообщений */

#EMOJI
$_GET['text'] = $text;
include("emoji.php");




#Запрещённые символы
$text1 = mb_strtolower($text);

if(strpos($text1,"ส็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็") !== false ||
    strpos($text1,"õ") !== false ||
    strpos($text1,"Õ") !== false ||
    strpos($text1,"À") !== false ||
    strpos($text1,"Ò") !== false ||
    strpos($text1,"ñ") !== false ||
    strpos($text1,"Ñ") !== false ||
    strpos($text1,"Í") !== false ||
    strpos($text1,"à") !== false ||
    strpos($text1,"å") !== false ||
    strpos($text1,"ð") !== false ||
    strpos($text1,"Â") !== false ||
    strpos($text1,"Ì") !== false ||
    strpos($text1,"Ê") !== false ||
    strpos($text1,"Å") !== false ||
    strpos($text1,"²") !== false ||
    strpos($text1,"Ð") !== false ||
    strpos($text1,"░") !== false ||
    strpos($text1,"▄") !== false ||
    strpos($text1,"█▄") !== false ||
    strpos($text1, "╲") !== false ||
    strpos($text1, "╭") !== false ||
    strpos($text1, "°͡") !== false ||
    strpos($text1, "ʖ") !== false ||
    strpos($text1,"╮") !== false ||
    strpos($text1,"╱") !== false){
		addMsg("Данный текст запрещён к вводу!");
}

if((strpos($text1,"админ") !== false && strpos($text1,"сук") !== false) || 
   (strpos($text1,"дан") !== false && strpos($text1,"сук") !== false) ||
   (strpos($text1,"дан") !== false && strpos($text1,"долбаёб") !== false) ||
   (strpos($text1,"дан") !== false && strpos($text1,"долбаеб") !== false) ||
   (strpos($text1,"дан") !== false && strpos($text1,"ебл") !== false) ||
   (strpos($text1,"админ") !== false && strpos($text1,"долбаеб") !== false) ||
   (strpos($text1,"админ") !== false && strpos($text1,"пизд") !== false) ||
   (strpos($text1,"дан") !== false && strpos($text1,"долбаеб") !== false) ||
   (strpos($text1,"админ") !== false && strpos($text1,"пидо") !== false) ||
   (strpos($text1,"дан") !== false && strpos($text1,"пидо") !== false) ||
   (strpos($text1,"админ") !== false && strpos($text1,"пида") !== false) ||
   (strpos($text1,"дан") !== false && strpos($text1,"пида") !== false) ||
   (strpos($text1,"админ") !== false && strpos($text1,"уёбок") !== false) ||
   (strpos($text1,"дан") !== false && strpos($text1,"уёбок") !== false) ||
   (strpos($text1,"админ") !== false && strpos($text1,"дебил") !== false) ||
   (strpos($text1,"дан") !== false && strpos($text1,"дебил") !== false)){
    
    mysql_query("DELETE FROM `chat` WHERE `login`='$login'");
    mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','u-$login')");
    $mmlog = ModernUser($login);
    ask("Пользователь $mmlog лишен права выхода в эфир НА 30 МИНУТ. Причина: Спам, бессмысленные сообщения, пункт 1.6, см. {chat:rules}");
    $chatbantime = time() + 1800;
    mysql_query("UPDATE users SET chatban='1',chatbantime='$chatbantime',ban_name='Система',chatbanreason='Спам, бессмысленные сообщения',ban_date='$Ddate' WHERE `login`='$login'");
    exit;
	   //exit;
	   //addMsg("Данный текст запрещён к вводу!");
}

#Какая-то дичь (запрещённые символы)
$text = str_replace("ᅠ ᅠ ᅠ ᅠ ᅠ ᅠᅠᅠ ᅠ ᅠ ᅠ ᅠ ᅠᅠ ᅠᅠᅠ ᅠ ᅠ ᅠ ᅠ ᅠᅠᅠ ᅠ ᅠ ᅠ ᅠ ᅠᅠ ᅠᅠᅠ ᅠ ᅠ ᅠ ᅠ ᅠᅠᅠ ᅠ ᅠ ᅠ ᅠ ᅠᅠ ᅠᅠᅠ ᅠ ᅠ ᅠ ᅠ ᅠᅠᅠ ᅠ ᅠ ᅠ ᅠ ᅠᅠ ᅠᅠᅠ ᅠ ᅠ ᅠ ᅠ ᅠᅠᅠ ᅠ ","",$text);
$text = str_replace(" ᅠ ","",$text);

$text = str_replace("ᅠᅠᅠᅠᅠᅠᅠᅠ","",$text);
$text = str_replace("ᅠᅠᅠᅠᅠᅠᅠᅠ","",$text);

$text = str_replace("ᅠᅠ","",$text);
$text = str_replace("ᅠ ","",$text);
$text = str_replace("ᅠ","",$text);


#Запрещённые символы (фразы, коды) (кроме администрации)
if ($group !== "3"){

	#Если все сообщения капсом (так же больше 15 символов)
	if(mb_strtoupper($text, 'utf-8') == $text && strlen($text) >= 15){
		exit;
		//addMsg("Данный текст запрещён к вводу!");
	}


    if(strpos($text1,"[:rank") !== false ||
        strpos($text1,"{:chatto-") !== false ||
        strpos($text1,"{:c") !== false){
			addMsg("Данный текст запрещён к вводу!");
    }
}

#Замена текста
$text = str_replace("https://www.youtube.com/watch?v=","https://youtu.be/",$text);
$text = str_replace("https://prntscr.com/","https://prnt.sc/",$text);
$text = str_replace("http://prntscr.com/","https://prnt.sc/",$text);


if(strpos($text, "https://youtu.be/") !== false){
	if(strpos($text, "&time=") !== false){
		$text = str_replace("&time=", "?time=", $text);
	}
	if(strpos($text, "?time=") !== false){
		$text = str_replace("?time=", "?t=", $text);
	}
	if(strpos($text, "&t=") !== false){
		$text = str_replace("&t=", "?t=", $text);
	}
}


$text_param = explode(" ", $text);

#Команды администратора
if ($alls['group'] == "3") {

	if ($text_param[0] == '/donates') {
		if ($text_param[1] == '1') {
			$paymentsText = 'Последние 10 неуспешных донатов:<br>';
			$i = 1;
			$awaitPayments = mysql_query("SELECT `login`, `rub`, `date` FROM `qiwi_payments` ORDER BY `id` DESC LIMIT 10");
			while ($awaitPayment = mysql_fetch_array($awaitPayments)) {
				$paymentDate = explode(' ', $awaitPayment['date']);
				$awaitPayment['date'] = $paymentDate[1].' '.$paymentDate[0];
				$paymentsText .= $i.'. '.$awaitPayment['login'].' пытался купить '.$awaitPayment['rub'].' руб ['.$awaitPayment['date'].'] <br>';
				$i++;
			}
		} elseif($text_param[1] == '2') {
			$earned = 0;
			$payments = mysql_query("SELECT `rub` FROM `payments` WHERE `date` REGEXP '^\[0-9]+\.".date("m")."\.".date("Y")."'");
			while($payment = mysql_fetch_array($payments)) $earned += $payment['rub'];
			$paymentsText = "Заработано за этот месяц: $earned рублей.";
		} elseif($text_param[1] == '3') {
			$earned = 0;
			$payments = mysql_query("SELECT `rub` FROM `payments` WHERE `date` REGEXP '^\[0-9]+\.".date("m",strtotime("-1 month"))."\.".date("Y")."'");
			while($payment = mysql_fetch_array($payments)) $earned += $payment['rub'];
			$paymentsText = "Заработано за прошлый месяц: $earned рублей.";
		} elseif($text_param[1] == '4') {
				$earned = 0;
				$payments = mysql_query("SELECT `rub` FROM `payments` WHERE `date` REGEXP '^\[0-9]+\.".date("m",strtotime("-2 month"))."\.".date("Y")."'");
				while($payment = mysql_fetch_array($payments)) $earned += $payment['rub'];
				$paymentsText = "Заработано за поза-прошлый месяц: $earned рублей.";
		} else {
			$paymentsText = 'Последние 10 донатов:<br>';
			$payments = mysql_query("SELECT `login`, `rub`, `date`, `time` FROM `payments` ORDER BY `id` DESC LIMIT 10");
			$i = 1;
			while ($payment = mysql_fetch_array($payments)) {
				$paymentsText .= $i.'. '.$payment['login'].' купил '.$payment['rub'].' руб ['.$payment['date'].' '.$payment['time'].']<br>';
				$i++;
			}
		}

		addMsg($paymentsText, 1);
	}

    #Сброс золотого ящика (быстро)
    if ($text == "/gold") {
        gold();
		exit;
    }
    
    #Сброс ультра-золотого (быстро)
    if ($text == "/megagold") {
        megagold();
        exit;
    }
    
    #Надпись (скоро будет сброшен золотой ящик)
    if ($text == "/golder") {
        $gold_text = "{:chatto-sgold-soon:}";
        ask($gold_text);
        exit;
    }
    
    #Надпись (скоро будет сброшен ультра-голд)
    if ($text == "/megagolder") {
        $gold_text = "{:chatto-smgold-soon:}";
        ask($gold_text);
        exit;
	}
	
	if ($text_param[0] == "/ufdel") {
        $ulogin = $text_param[1];
        #Параметр отображение в чате (по умолчанию - да, 1 - нет)
        $hide = $text_param[2];
        $exist  = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$ulogin' LIMIT 1"))['login'];
        if (empty($exist)){
			addMsg("Введённый вами пользователь не найден!");
		}
		$ulogin = $exist;
        $his_rank = ModernUser($ulogin);
        
        if (empty($hide)){
            $user_text = "Пользователь $his_rank удалён!";
            ask($user_text);
        }
        $text = "";
        exit;
    }
    
    #Удалить пользователя
    if ($text_param[0] == "/udel") {
        $ulogin = $text_param[1];
        #Параметр отображение в чате (по умолчанию - да, 1 - нет)
        $hide = $text_param[2];
        $exist  = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$ulogin' LIMIT 1"))['login'];
        if (empty($exist)){
			addMsg("Введённый вами пользователь не найден!");
		}
		$ulogin = $exist;
        $his_rank = ModernUser($ulogin);
        #Удаляем его
        UserDelete($ulogin,0);
        
        if (empty($hide)){
            $user_text = "Пользователь $his_rank удалён!";
            ask($user_text);
        }
        $text = "";
        exit;
    }
    
    #Удаление мулти аккаунтов (больше одного), логины через запятую - /udelm login1,login2,login3 ...
    if ($text_param[0] == "/udelm") {
        $logins = $text_param[1];
        echo("console.log('$logins');");
        UserDelete($logins,2);
    }
    
    #Писать от имени другого человека
    if ($text_param[0] == "/uwrite") {
        $ulogin = $text_param[1];
        $res  = mysql_fetch_array(mysql_query("SELECT `login`,`group` FROM `users` WHERE `login`='$ulogin' LIMIT 1"));
        if(!empty($res['login'])){
			$ulogin = $res['login'];
            $text = str_replace("/uwrite", "", $text);
            $text = str_replace($ulogin, "", $text);
            $group = $res['group'];
            mysql_query("INSERT INTO `chat`(`login` , `tologin`, `text`, `id`, `group`,`private`, `date`, `time`, `ip`) VALUES ('$ulogin','$tolog','$text',NULL,'$group','$private','$date', '$time','$ip')");
        }
        exit;
    }
    
    #Писать от имени другого человека другому человеку
    if ($text_param[0] == "/uwritet") {
        $ulogin = $text_param[1];
        #2-ой параметр будет ник (кому писать) - пример: /uwritet DanRotaru Q Привет Q:)
        $to_login=$text_param[2];
        $res  = mysql_fetch_array(mysql_query("SELECT `login`,`group` FROM `users` WHERE `login`='$ulogin' LIMIT 1"));
        if(!empty($res['login'])){
			$ulogin = $res['login'];
            $text = str_replace("/uwritet", "", $text);
            $text = str_replace($ulogin, "", $text);
            $text = str_replace($to_login, "", $text);
            $group = $res['group'];
            mysql_query("INSERT INTO `chat`(`login` , `tologin`, `text`, `id`, `group`,`private`, `date`, `time`, `ip`) VALUES ('$ulogin','$to_login','$text',NULL,'$group','$private','$date', '$time','$ip')");
        }
        exit;
    }
    
    
    #Отправить изображение в чат
    if ($text_param[0] == "/img") {
        #Ссылка на изображение
        $image = $text_param[1];
        #Длина изображении, по умолчанию 100% (во всю длину чата, 1 - auto (оригинальный размер изображении) )
        $width = $text_param[2];
        if ($width == "1"){$width = "auto";}
        if (empty($width)){
            $user_text = "<img src=\"$image\" style=\"width:100%\">";
        }
        else{
            $user_text = "<img src=\"$image\" style=\"width:$width\">";
        }
        ask($user_text);
        exit;
    }
    
    #Добавить себе кристаллов
    if ($text_param[0] == "/addcry") {
        $kry = $text_param[1];
        mysql_query("UPDATE `users` SET `kry`=`kry`+'$kry' WHERE `login`='$login'");
		addMsg("Вы успешно добавили себе на счет $kry кри!");
    }
    
    #Добавить себе опыта
    if ($text_param[0] == "/addscore") {
        $rang = $text_param[1];
        mysql_query("UPDATE `users` SET `rang`=`rang`+'$rang' WHERE `login`='$login'");
		addMsg("Вы успешно добавили себе на счет $rang опыта!");
    }
    
    if ($text_param[0] == "/ggssg") {
        botmsg("{:chatto-surl-buy:}");
        exit;
    }
    
    
    #Добавить обновление
    if ($text_param[0] == "/addupdate") {
        #$last_update - номер обновления (пример 1.0.0)
        $last_update = $text_param[1];
        #$updateTXT - изменять номер обновлении (по умолчанию нет, 1 - да) (это нужно для того чтобы вы смогли не раз писать в чате о новой обнове)
        $updateTXT = $text_param[2];
        
        #Путь файла релиза
        $newUpd = fopen("../../release.txt","w");
        fwrite($newUpd,$last_update . PHP_EOL);fclose($newUpd);
        
        if ($updateTXT == 1){
            $last_updateID = file_get_contents("updates.txt");
            $new_updateID = $last_updateID + 1;
            $newUpd1 = fopen("updates.txt","w");
            fwrite($newUpd1,$new_updateID . PHP_EOL);
            fclose($newUpd1);
        }
        $user_text = "<a onclick=\"updates()\" style=\"color:#00bcd4;\">Встречаем новое обновление - $last_update!</a>";
        sys($user_text);
        exit;
    }
    
    #Зачисление/изъятие кристаллов
    if ($text_param[0] == "/kry") {
        $ulogin = $text_param[1];
        $kry = $text_param[2];
        #Отображать в чате (по умолчанию - Да, 1 - нет)
        $kryoff = $text_param[3];
        $exist  = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$ulogin' LIMIT 1"))['login'];
        if (empty($exist)){
            addMsg("Введённый вами пользователь не найден!");
		}
		$ulogin = $exist;
        $usa_rang = ModernUser($ulogin);

        $kry_t = number_format($kry, 0, ' ', ' ');
        
        mysql_query("UPDATE `users` SET `kry`=`kry`+'$kry' WHERE `login`='$ulogin'");
        #Надпись если выдаём кристаллы
        if ($kry_t > 0){
            $user_text = "Пользователь $usa_rang получил <font color=\"yellow\">$kry_t</font> <img src=\"../assets/img/kry.png\">";
        }
        #Надпись если отбирем кристаллы
        if ($kry_t < 0){
            $kry_t = str_replace("-","",$kry_t);
            $user_text = "С аккаунта пользователя $usa_rang сняты <font color=\"yellow\">$kry_t</font> <img src=\"../assets/img/kry.png\">";
        }
        
        #Ввод в чате
        if (empty($kryoff)){
            ask($user_text);
        }
        exit;
    }
    
    #Зачисление/изъятие кристаллов
    if ($text_param[0] == "/bug") {
        $ulogin = $text_param[1];
        $kry = $text_param[2];
        #Отображать в чате (по умолчанию - Да, 1 - нет)
        $kryoff = $text_param[3];
        $exist  = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$ulogin' LIMIT 1"))['login'];
        if (empty($exist)){
			addMsg("Введённый вами пользователь не найден!");
		}
		$ulogin = $exist;
        $usa_rang = ModernUser($ulogin);
        
        $kry_t = number_format($kry, 0, ' ', ' ');
        mysql_query("UPDATE `users` SET `kry`=`kry`+'$kry' WHERE `login`='$ulogin'");
        
        #Надпись если выдаём кристаллы
        if ($kry_t > 0){
            $user_text = "Пользователь $usa_rang получил {:chatto-yellow=$kry_t :kry::} за найденный {:chatto-url=баг=https://vk.com/topic-142434787_41843852:}. Скажем все ему спасибо!";
		}
		
        #Ввод в чате
        if (empty($kryoff)){
            ask($user_text);
        }
        exit;
    }
    
    
    #Оштрафовать пользователя (отобрать кристаллы)
    if ($text_param[0] == "/fine") {
        $ulogin = $text_param[1];
        $kry = $text_param[2];
        #Причина (по умолчанию - Флуд)
        $reason = $text_param[3];
        $exist  = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$ulogin' LIMIT 1"))['login'];
        if (empty($exist)){
			addMsg("Введённый вами пользователь не найден!");
        }
        $ulogin = $exist;
        $usa_rang = ModernUser($ulogin);
        
        $kry_t = number_format($kry, 0, ' ', ' ');
        
        mysql_query("UPDATE users SET `kry`=`kry`-'$kry' WHERE `login`='$ulogin'");
        
        if (empty($reason)){$reason = "Неоднократный флуд, нарушение правил чата.";}
        $freason = "Причина: ".$reason;
        
        $user_text = "Пользователь $usa_rang был оштрафован на {:chatto-yellow=$kry_t кристаллов:}. $freason";
        ask($user_text);
        exit;
    }
    
    #Зачисление/изъятие кристаллов
    if ($text_param[0] == "/cup") {
        $ulogin = $text_param[1];
        $kry = $text_param[2];
        #Отображать в чате (по умолчанию - Да, 1 - нет)
        $country = "Францию";
        $exist  = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$ulogin' LIMIT 1"))['login'];
        if (empty($exist)){
			addMsg("Введённый вами пользователь не найден!");
		}
		$ulogin = $exist;

        $usa_rang = ModernUser($ulogin);
        
        $kry_t = number_format($kry, 0, ' ', ' ');
        
        mysql_query("UPDATE `users` SET `kry`=`kry`+'$kry' WHERE `login`='$ulogin'");
        
        
        $user_text = "Пользователь $usa_rang поставил $kry_t :kry: на $country и выиграл ещё $kry_t <img src=\"../assets/img/kry.png\">. Поздравляем!";
        ask($user_text);
        
        exit;
    }
    
    
    #Зачисление/изъятие РУБ
    if ($text_param[0] == "/rub") {
        $ulogin = $text_param[1];
        $rub = $text_param[2];
        #Отображать в чате (по умолчанию - Да, 1 - нет)
        $ruboff = $text_param[3];
        $exist  = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$ulogin' LIMIT 1"))['login'];
        if (empty($exist)){
			addMsg("Введённый вами пользователь не найден!");
		}
		$ulogin = $exist;
        $usa_rang = ModernUser($ulogin);
        
        $rub_t = number_format($rub, 0, ' ', ' ');
        
        $isX2 = mysql_fetch_array(mysql_query("SELECT `x2` FROM `aconfigs` WHERE `id`='1' LIMIT 1"));
        $isX2 = $isX2['x2'];
        if ($isX2 == "1"){$x2 = "[ <img src=\'../assets/img/x2.png\' style=\'height:11px\'> ] ";}else{$x2 = "";}
        
        #$alertDonat = "<script>donat('$ulogin','$rub_t');</script>";
        $alertDonat = "";
		mysql_query("UPDATE `users` SET `rub`=`rub`+'$rub' WHERE `login`='$ulogin'");
		
        #Надпись если выдаём РУБ
        if ($rub_t > 0){
            $user_text = $x2."Пользователь $usa_rang купил {:chatto-yellow=$rub_t РУБ:}. Поздравляем.$alertDonat";
        }
        
        #Надпись если отбирем РУБ
        if ($rub_t < 0){
            $rub_t = str_replace("-","",$rub_t);
            $user_text = "С аккаунта пользователя $usa_rang сняты {:chatto-yellow=$rub_t РУБ:}.";
        }
        
        #Ввод в чате
        if (empty($ruboff)){
            ask($user_text);
        }
        exit;
    }
    
    #Зачисление/изъятие РУБ
    if ($text_param[0] == "/erub") {
        $ulogin = $text_param[1];
        $rub = $text_param[2];
        $exist  = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$ulogin' LIMIT 1"))['login'];
        if (empty($exist)){
			addMsg("Введённый вами пользователь не найден!");
		}
		$ulogin = $exist;
        $usa_rang = ModernUser($ulogin);
        
        $rub_t = number_format($rub, 0, ' ', ' ');
        
        mysql_query("UPDATE `users` SET `rub`=`rub`+'$rub' WHERE `login`='$ulogin'");
        
        #$alertDonat = "<script>donat('$ulogin','$rub_t');</script>";
        $alertDonat = "";
        
        #Надпись если выдаём РУБ
        if ($rub_t > 0){
            $user_text = $x2."Пользователь $usa_rang купил {:chatto-yellow=$rub_t РУБ:} с помощью автоматической оплаты Qiwi.$alertDonat";
        }

        #Ввод в чате
        if (empty($ruboff)){
            ask($user_text);
        }
        exit;
    }
    
    
    #Зачисление/изъятие опыта
    if ($text_param[0] == "/score") {
        $ulogin = $text_param[1];
        $rang = $text_param[2];
        #Отображать в чате (по умолчанию - Да, 1 - нет)
        $rangoff = $text_param[3];
        $exist  = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$ulogin' LIMIT 1"))['login'];
        if (empty($exist)){
			addMsg("Введённый вами пользователь не найден!");
        }
        $usa_rang = ModernUser($ulogin);
        
        $rang_t = number_format($rang, 0, ' ', ' ');
		mysql_query("UPDATE `users` SET `rang`=`rang`+'$rang' WHERE `login`='$ulogin'");
		
        #Надпись если выдаём кристаллы
        if ($rang0 > 0){
            $user_text = "Пользователь $usa_rang получил <font color=\"yellow\">$rang_t</font> очков опыта";
        }
        #Надпись если отбирем кристаллы
        if ($rang0 < 0){
            $rang_t = str_replace("-","",$rang_t);
            $user_text = "С аккаунта пользователя $usa_rang снято <font color=\"yellow\">$rang_t</font> очков опыта";
        }
        
        #Ввод в чате
        if (empty($rangoff)){
        ask($user_text);
        }
        exit;
    }
    
    #Обновляем всем страницу
    if ($text_param[0] == "/reload") {
		#$reloadText - Параметр обновления (по умолчанию обновить без предупреждение, 1 - с (без обновления) )
		$reloadText = $text_param[1];
		if (empty($reloadText)){
			$user_text = "Обновляю... <script>ChatTOReload()</script>";
		}else{
			$user_text = "Обновление страницы через несколько секунд...";
		}
		ask($user_text);
		exit;
    }
    
    #Очистка какой-нибуть таблицы БД
    if ($text_param[0] == "/truncate") {
		$truncate_table = $text_param[1]; if($truncate_table == "users") exit;
		mysql_query("TRUNCATE TABLE `$truncate_table`");
		addMsg("Таблица `$truncate_table` была очищена!");
		exit;
    }
    
    #Удалять все активированные карты
    if ($text_param[0] == "/carddel") {
		$trunc = mysql_query("DELETE FROM bonus WHERE used='1'");
		ask(mysql_affected_rows() ." активированных карт были успешно удалены!");
	}
	
	#Узнать пароль от аккаунта
	if ($text_param[0] == "/password") {
		$ulogin = $text_param[1];
		$info  = mysql_fetch_array(mysql_query("SELECT `login`,`password` FROM `users` WHERE login='$ulogin'"));
		if (empty($info['password'])){exit("alert('Пользователь не найден!')");}
		$ulogin = $info['login'];
		$password = $info['password'];
		echo ("alert('Пароль пользователя $ulogin: $password')");
	exit;
	}
    
    #Включить/откючить чат-бота
    if ($text_param[0] == "/ibot") {
		#Вкл/Выкл бота (1 - вкл, 2 - выкл)
		$check = $text_param[1];
		if ($check == "1"){
			mysql_query("UPDATE `aconfigs` SET `bot`='1' WHERE `id`='1'");
			ask("Бот подключился к чату!");
		}
		if ($check == "2"){
			mysql_query("UPDATE `aconfigs` SET `bot`='0' WHERE `id`='1'");
			ask("Бот покинул чат!");
		}
		exit;
    }
    
    #Карта от чат-бота
    if ($text_param[0] == "/cardbybot") {
		card(1,"ChatBot");
		exit;
	}
	
    
    
    if ($text_param[0] == "/card1") {
		card(1);
		exit;
    }
    if ($text_param[0] == "/card2") {
		card(1);
		exit;
    }
    if ($text_param[0] == "/card3") {
		card(1);
		exit;
    }
    if ($text_param[0] == "/card4") {
		card(1);
		exit;
    }
    
    #Ввод в чате ссылку на файл
    if ($text_param[0] == "/ofile") {
		$file = $text_param[1];
		$tfile = $text_param[2];
		if (empty($tfile)){$tfile = "Открыть";}
		$text = "<a onclick=\"$('#garage').load('$file');\">$tfile</a>";
		ask($text);
		exit;
    }
    
    #$special_color = "yellow";
    #$special_color = "#00bcd4";
    $special_color = "#ff0";
    
    
    #Специальные команды
    if ($text_param[0] == "/ask") {
        $text = str_replace("/ask", "", $text);
        $loginA = "sys";
        $group = 0;
    }
    if ($text_param[0] == "/sctext") {
        $text = str_replace("/sctext", "", $text);
        $text = "{:chatto-ctext=".$text.":}";
        $loginA = $login;
        $group = 0;
    }
    if ($text_param[0] == "/ctext") {
        $text = str_replace("/ctext", "", $text);
        $text = "{:chatto-ctext=".$text.":}";
        $loginA = $login;
    }
    
    if ($text_param[0] == "/xtext") {
        $text = str_replace("/xtext", "", $text);
        $text = "`1`".$text."`1`";
        $loginA = $login;
    }
    
    if ($text_param[0] == "/atext") {
        $text = str_replace("/atext", "", $text);
        $text = "`99`".$text."`99`";
        $loginA = "sys";
        $group = 0;
    }
    
    
    if ($text_param[0] == "/ytext") {
        $text = str_replace("/ytext", "", $text);
        $text = '<div style="position:relative;background:url(https://magicalchristmasmovieexperience.com/assets/img/site-intro-2.png);width:100%;height:259px;background-size:100% 259px;"> <div style="position:absolute;left:50%;top:100px;transform:translate(-50%,-50%);font-size:16px;color:yellow;text-shadow:0 0 10px rgba(230,230,44,.7), 0 0 10px rgba(230,230,44,.7), 0 0 10px rgba(230,230,44,.7), 0 0 10px rgba(230,230,44,.7);">'.$text.'</div> </div>';
        $loginA = "sys";
        $group = 0;
    }
    if ($text_param[0] == "/ntext") {
        $text = str_replace("/ntext", "", $text);
        $text = '<div style="position:relative;background:url(https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/3/2016/10/19171356/new-years-eve1.jpg);width:100%;height:259px;background-size:100% 259px;"> <div style="position:absolute;left:50%;top:100px;transform:translate(-50%,-50%);font-size:24px;color:yellow;text-shadow:0 0 10px rgba(230,230,44,.7), 0 0 10px rgba(230,230,44,.7), 0 0 10px rgba(230,230,44,.7), 0 0 10px rgba(230,230,44,.7);">'.$text.'</div> </div>';
        $loginA = "sys";
        $group = 0;
    }
    
    if ($text_param[0] == "/music") {
        $text = str_replace("/music", "", $text);
        $text = '<div class="music"></div>'.$text.'<div class="music"></div>';
        $text = '<div class="muz">'.$text.'</div>';
        $loginA = "sys";
        $group = 0;
	}

	if ($text_param[0] == "/ytmusic" && $group == 3) {
		$link = $text_param[1];
		$link = str_replace("https://www.youtube.com/watch?v=","",$link);
		$link = str_replace("https://youtu.be/","",$link);
		if($text_param[2] == 1) ask('<div class="ytiframe"><iframe width="100%" height="232" src="https://www.youtube.com/embed/'.$link.'?rel=0&amp;controls=0&amp;start=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>');
		elseif($text_param[2] == 2) ask('<iframe width="100%" height="232" src="https://www.youtube.com/embed/'.$link.'?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;start=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="margin-left: -5px;width: calc(100% + 10px);"></iframe>');
		elseif($text_param[2] == 3) ask('<iframe width="100%" height="232" src="https://www.youtube.com/embed/'.$link.'?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;start=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="margin-left: -5px;width: calc(100% + 10px);position: absolute;left: 0px;top: 20px;"></iframe>');
		elseif($text_param[2] == 4) ask('<iframe width="100%" height="'.$text_param[3].'" src="https://www.youtube.com/embed/'.$link.'?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;start=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="margin-left: -5px;width: calc(100% + 10px);"></iframe>');
		elseif($text_param[2] == 5){
			if (strpos($text_param[3],":")!==false){
				$b = explode(":",$text_param[3]);
				$text_param[3] = $b[0] * 60;
				$text_param[3] += $b[1];
			  }
			  ask('<iframe width="100%" height="232" src="https://www.youtube.com/embed/'.$link.'?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;start='.$text_param[3].'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="margin-left: -5px;width: calc(100% + 10px);"></iframe>');
		}
		elseif($text_param[2] == 6) ask('<iframe width="100%" height="650px" src="https://www.youtube.com/embed/'.$link.'?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;start=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="margin-left: -5px;width: calc(100% + 10px);position: absolute;left: 0px;top: 20px;"></iframe>');
		elseif($text_param[1] == "-h") addMsg("Команда <u>/ytmusic</u>, возможности:<br/><i>/ytmusic YOUTUBE_URL</i><br/><i>/ytmusic YOUTUBE_URL 2 (без окна YouTube)</i><br/><i>/ytmusic YOUTUBE_URL 3 (под сообщениями, как фон)</i><br/><i>/ytmusic YOUTUBE_URL 4 height (с определённым height)</i><br/><i>/ytmusic YOUTUBE_URL 5 сек (в определённом моменте на видео, можно использовать как 90 так и 1:30 тайминг)</i><br/><i>/ytmusic YOUTUBE_URL 6 (вертикальное видео под сообщениями, как фон)</i><br/>");
		else ask('<div class="ytiframe"><iframe width="100%" height="232" src="https://www.youtube.com/embed/'.$link.'?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>');
		
		exit;
	}

	if ($text_param[0] == "/mz") {

		$text = str_replace("/mz", '', $text);
		
		$text = str_replace($text_param[1], "", $text);
		$text .= '<video style="display:none" controls="" autoplay="" name="media"><source src="'.$text_param[1].'" type="audio/mpeg"></video>';
	}
	if ($text_param[0] == "/mz1") {

		$text = str_replace("/mz1", '', $text);
		
		$text = str_replace($text_param[1], "", $text);
		$text .= '<video style="display:none" controls="" autoplay="" name="media"><source src="'.$text_param[1].'" type="audio/mpeg"></video>';
		$loginA = "sys";
        $group = 0;
	}
	if ($text_param[0] == "/mzy") {
		$link = $text_param[1];
		$link = str_replace("https://www.youtube.com/watch?v=","",$link);
		$link = str_replace("https://youtu.be/","",$link);

		$link_s = '<iframe id="ytplayer" type="text/html" width="0" height="0" src="https://www.youtube.com/embed/'.$link.'?autoplay=1&cc_load_policy=1&disablekb=1&enablejsapi=1&fs=0&loop=1&iv_load_policy=3" frameborder="0"></iframe>';
		$text = str_replace("/mzy", '', $text);
		
		$text = str_replace($text_param[1], "", $text);
		$text .= $link_s;
	}

	// https://www.youtube.com/watch?v=ayaxZLlqOU0
	
	if ($text_param[0] == "/voice") {
		$text = str_replace("/voice ","",$text);
		$text .= '<script>if(typeof SpeechSynthesisUtterance !== "undefined"){let vmsg = new SpeechSynthesisUtterance();vmsg.text = "'.$text.'";speechSynthesis.speak(vmsg);}</script>';
		mysql_query("INSERT INTO `chat` (`login`,`text`,`group`,`id`, `date`, `time`, `ip`,`f`) VALUES('ChatBot','{:chatto-yellow=ChatBot:}: $text','0',NULL,'".date("d.m.y")."','".date("H:i")."','".$_SERVER['REMOTE_ADDR']."','1')");
        exit;
	}

	if ($text_param[0] == "/garage") {
		$text = '<div style="margin: 10px 0;margin-top:0;text-align:center;font-size:18px">Гараж пользователя '.$text_param[1].'</div><iframe src="./assets/garage/html5/?user='.$text_param[1].'" style="width:100%;height:250px;border:none;border-radius: 5px;"></iframe>';
		ask($text);
		exit;
	}
	
	
	
	
	
	
	
    if ($text_param[0] == "/fixmsg") {
        $text = str_replace("/fixmsg", "", $text);
        
        mysql_query("INSERT INTO `chat` (`login`,`text`,`group`,`id`, `date`, `time`, `ip`,`f`) VALUES('sys','$text','0',NULL,'".date("d.m.y")."','".date("H:i")."','".$_SERVER['REMOTE_ADDR']."','1')");
        exit;
    }
    
    if ($text_param[0] == "/admin") {
        $text = str_replace("/admin", "{:cAdmin:}<font color=\"".$special_color."\">Администратор: </font>", $text);
        $loginA = "sys";
        $group = 0;
    }
    if ($text_param[0] == "/moder") {
        $text = str_replace("/moder", "{:cModer:}<font color=\"".$special_color."\">Модератор: </font>", $text);
        $loginA = "sys";
        $group = 0;
    }
    if ($text_param[0] == "/sys") {
        $text = str_replace("/sys", "{:cSystem:}<font color=\"".$special_color."\">[SYSTEM]: </font>", $text);
        $loginA = "sys";
        $group = 0;
    }
    if ($text_param[0] == "/sys") {
        $text = str_replace("/sys", "{:cSystem:}<font color=\"".$special_color."\">[SYSTEM]: </font>", $text);
        $loginA = "sys";
        $group = 0;
    }
    if ($text_param[0] == "/bota") {
        $text = str_replace("/bota", "{:chatto-bot:}: ", $text);
        $text = "<font color=\"#fff\">".$text."</font>";
        $loginA = "sys";
        $group = 0;
    }
    if ($text_param[0] == "/news") {
        $text = str_replace("/news", "<img src=\"../assets/img/news.png\"> <span style=\"".$special_color."\">Новости: </span>", $text);
        $loginA = "sys";
        $group = 0;
    }
    if ($text_param[0] == "/go") {
        $text = str_replace("/go", "<img src=\"../assets/img/go.png\"> <span style=\"".$special_color."\">Работаем над: </span>", $text);
        $loginA = "sys";
        $group = 0;
	}
	
    
    #Запуск чата
    if ($text_param[0] == "/start") {
    mysql_query("UPDATE `aconfigs` SET `enabled`='1' WHERE id='1'");
    ask("Чат запущен!");
    exit;
    }
    
    #Остановка чата
    if ($text_param[0] == "/stop" && ($alls['group'] == "3")) {
    mysql_query("UPDATE `aconfigs` SET `enabled`='0' WHERE id='1'");
    ask("Чат остановлен!");
    exit;
    }
    
    #Запуск чата
    if ($text_param[0] == "/nightchat") {
    mysql_query("UPDATE `aconfigs` SET `enabled`='1' WHERE id='1'");
    ask("<img src='https://xtanki.ru/wp-content/uploads/2016/09/100-2.jpg' style='width:100%'>");
    exit;
	}
    
    #Закрыть вручную (если не закроется через CRON)
    if ($text_param[0] == "/timestop") {
    mysql_query("UPDATE `aconfigs` SET `enabled`='0' WHERE `id`='1'");
    mysql_query("DELETE FROM `chat`");
    mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','all')");
    $timee = date("H:i");
    $itime = "Время $timee";
    ask("{:chatto-surl-vk:}");
    ask("{:chatto-surl-rules:}");
    ask("{:chatto-surl-help:}");
    ask("{:chatto-surl-help_us:}");
    ask("{:chatto-surl-shop:}");
    ask("{:chatto-surl-buy:}");
    ask("{:chatto-surl-ads:}");
    
    if($text_param[1] == "1"){
		ask("Время 23:00. Чат автоматически остановлен!");
	}else{
		ask($itime.". Чат остановлен!");
	}
    exit;
    }
    
    if ($text_param[0] == "/timestops") {
    ask("Время 23:00. Чат автоматически остановлен!");
    exit;
    }

    #Ввод в чате сообщение о приглашении друзей..
    if ($text_param[0] == "/invite") {
        invite();
        exit;
	}

    #Сообщения администрации
    if ($text_param[0] == "/chatto" || $text_param[0] == "/tc") {
        chatto();
        exit;
    }

    if ($text_param[0] == "/loto") {
        
        $newLT = $text_param[1];
        if(!is_numeric($newLT)){
            addMsg("Неверное значение!");
        }
        mysql_query("UPDATE `loto` SET `min`='$newLT' WHERE `id`='1'");
        $newLT = number_format($newLT, 0, ' ', ' ');
        ask("Минимальная ставка лотереи была изменена на ".$newLT. ":kry:");
        exit;
    }   
	
	if ($text_param[0] == "/s" && isset($text_param[1])) {
		if($text_param[2] == 1){
			$text_param[1] = "https://chatto.ru/".$text_param[1];
			addMsg("<script>document.location.href='".$text_param[1]."';</script>",1);
		}else{
			if(strpos($text_param[1], "http://") !== false || strpos($text_param[1], "https://") !== false){}
			else if(strpos($text_param[1], "http://") == false){
				$text_param[1] = "http://".$text_param[1];
			}
			else if(strpos($text_param[1], "https://") == false){
				$text_param[1] = "https://".$text_param[1];
			}
			addMsg("<script>document.location.href='".$text_param[1]."';</script>",1);
		}
        exit;
	}
	if ($text_param[0] == "/sd" && isset($text_param[1])) {
		$text_param[1] = "https://chatto.ru/".$text_param[1];
		addMsg("<script>document.location.href='".$text_param[1]."';</script>",1);
        exit;
    }
    ### Конец фукнции только администратора
}

### Команды администраторов/модераторов/кандидатов
if ($alls['group'] == "3" || $alls['group'] == "2" || $alls['helper'] == "1") {

	#Заблокировать пользователя в чате
	if ($text_param[0] == "/ban") {
	#Команда бана - /ban Login время причина
	$ulogin = $text_param[1];

	if($ulogin == "DanRotaru"){
		addMsg("Вы пытаетесь забанить DanRotaru!",1);
	}

	#Время (мин)
	$bantime = $text_param[2];

	#Причина (по умолчанию - флуд)
	$ban_reason = $text_param[3];

	if ($bantime == "0"){
		addMsg("Вы пытаетесь забанить на 0 минут!",1);
	}
	

	#Причины бана
	if (empty($ban_reason)){$ban_reason = "флуд, пункт 1.1";}
	if ($ban_reason == "1.1"){$ban_reason = "флуд, пункт 1.1";}
	if ($ban_reason == "1.2"){$ban_reason = "оскорбление, пункт 1.2";}
	if ($ban_reason == "1.3"){$ban_reason = "использование мата, пункт 1.3";}
	if ($ban_reason == "1.4"){$ban_reason = "троллинг, пункт 1.4";}
	if ($ban_reason == "1.5"){$ban_reason = "КАПС, недопустимые символы, пункт 1.5";}
	if ($ban_reason == "1.6"){$ban_reason = "спам, бессмысленные сообщения пункт 1.6";}
	if ($ban_reason == "1.7"){$ban_reason = "реклама (пиар), пункт 1.7";}
	if ($ban_reason == "1.8"){$ban_reason = "попрошайничество, пункт 1.8";}
	if ($ban_reason == "1.9"){$ban_reason = "выпрашивание прав, пункт 1.9";}
	if ($ban_reason == "1.101"){$ban_reason = "выдавать себя за администрации, пункт 1.10";}
	if ($ban_reason == "1.11"){$ban_reason = "передача аккаунта, пункт 1.11";}
	if ($ban_reason == "1.12"){$ban_reason = "недопустимый ник, пункт 1.12";}
	if ($ban_reason == "1.13"){$ban_reason = "продажа карт, пункт 1.13";}
	if ($ban_reason == "1.14"){$ban_reason = "Обсуждение действий модератора, пункт 1.14";}
	if ($ban_reason == "1.15"){$ban_reason = "неоднократный флуд, пункт 1.15";}
	if ($ban_reason == "1.16"){$ban_reason = "запрещено использовать более 5 аккаунтов, пункт 1.16";}
	if ($ban_reason == "1.17"){$ban_reason = "оскорбление администрации чата в любой форме, пункт 1.17";}
	if ($ban_reason == "1.18"){$ban_reason = "запрещено использовать VPN, пункт 1.18";}

	$info  = mysql_fetch_array(mysql_query("SELECT `id`,`login`,`chatban`,`vip`,`rang_id` FROM `users` WHERE `login`='$ulogin' LIMIT 1"));
	if (empty($info['id'])){
		addMsg("Введённый вами пользователь не найден!",1);
	}
	$ulogin = $info['login'];
	#Перебан (доступно только модераторам и администраторам)
	if($info['chatban'] == "1" && $alls['group'] !== "3"){
		if ($alls['group'] !== "2"){
			addMsg("Пользователь ".$info['login']." уже забанен!",1);
		}
	}
	#Бан на время (мин)
	if (!is_numeric($bantime) && $bantime !== "forever"){
		addMsg("Неверно было указано время бана.",1);
	}
	if($bantime == "forever"){
		$bantime = "9999999";
	}

	if($bantime < 1){
		addMsg("Неверное значение времени!",1);
	}

	$bantime = floor($bantime);
	$bantime_s = $bantime;
	

	if($bantime < 60){
		$bantime_t = $bantime;
		$bantime_s = getNumEnding($bantime, ['МИНУТУ', 'МИНУТЫ', 'МИНУТ']);
	}
	elseif($bantime >= 60 && $bantime < 1440){
		$bantime_ts = time() + ($bantime * 60);
		$bantime_s = remaining($bantime_ts-time());
	}
	elseif($bantime >= 1440){
		$bantime_ts = time() + ($bantime * 60);
		$bantime_s = remaining($bantime_ts - time());
	}

	$bantime_s = mb_strtoupper($bantime_s);

	$c = "НА $bantime_t $bantime_s";
	if ($bantime == "0"){$c = "ПРЕДУПРЕЖДЁН";}
	if ($bantime == "1"){$c = "НА МИНУТУ";}
	if ($bantime == "10080"){$c = "НА НЕДЕЛЮ";}
	if ($bantime == "43800"){$c = "НА МЕСЯЦ";}
	if ($bantime == "9999999"){$c = "НАВСЕГДА";}
	######################################
	$alls_id = $info['id'];
	if ($info['vip'] == "1"){$urang = "V".$info['rang_id'];}else{$urang = $info['rang_id'];}

	$date   = $bantime * 60;
	$data   = time() + $date;

	//ask("Пользователь $alls_rang лишен права выхода в эфир $c. Причина: $ban_reason, см. {chat:rules}.");
	ask("{:cUban=$urang=$ulogin=$c=$ban_reason:}");
	mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','u-$ulogin')");

	$my_login = $alls['login'];
	$result2 = mysql_query("DELETE FROM `chat` WHERE `login`='$ulogin'");
	$result  = mysql_query("UPDATE `users` SET `chatban`='1',`chatbantime`='$data',`ban_name`='$my_login',`ban_date`='$Ddate',`chatbanreason`='$ban_reason' WHERE `login`='$ulogin'");
	exit;
	}

### Конец фукнции только для администраторов/модераторов/кандидатов
}

if (($text_param[0] == "/spectator" || $text_param[0] == "/spec")) {
	#Кто может использовать команду
	$whoHaveSpectator = ['INTRICATION', 'KpacuBbiu', 'Bucku_Co_JIbgoM', 'Inquisition', 'Danil2', 'Илья'];
	$uHaveSpectator = false;
	
	if ($alls['group'] == "3") {
		$uHaveSpectator = true;
	}
	
	if(!$uHaveSpectator){
		if (in_array($login, $whoHaveSpectator)) $uHaveSpectator = true;
	}

	if(!$uHaveSpectator){
		addMsg("У вас нет прав использовать эту команду!");
	}
	else{
		$text = str_replace("/spectator", "<span style=\"color:yellow;font-weight:bold;\">[Наблюдатель]: </span>", $text);
		$text = str_replace("/spec", "<span style=\"color:yellow;font-weight:bold;\">[Наблюдатель]: </span>", $text);
		$text = "<font color=\"#fff\">".$text."</font>";
		$loginA = "sys";
		$group = 0;
	}
}

if ($text_param[0] == "/konkurs") {
	$whoHaveSpectator = ['INTRICATION', 'KpacuBbiu', 'Bucku_Co_JIbgoM', 'Inquisition'];
	$uHaveSpectator = false;
	
	if(!$uHaveSpectator){
		if (in_array($login, $whoHaveSpectator)) $uHaveSpectator = true;
	}
	if ($alls['group'] == "3") {
		$uHaveSpectator = true;
	}
	if(!$uHaveSpectator){
		addMsg("У вас нет прав использовать эту команду!");
	}
	$text = str_replace("/konkurs", "<span style=\"color:yellow;font-weight:bold;\">[Конкурс]: </span>", $text);
	$text = "<font color=\"#fff\">".$text."</font>";
	$loginA = "sys";
	$group = 0;
}

if($alls['login'] == "INTRICATION"){
	$alls['group'] = 2;
}

### Команды администраторов/модераторов
if ($alls['group'] == "3" || $alls['group'] == "2") {

	#Разблокировка пользователя
	if ($text_param[0] == "/unban") {
		$ulogin = $text_param[1];
		#Отображение в чате (по умолчанию - Да)
		$off = $text_param[2];
		$exist  = mysql_fetch_array(mysql_query("SELECT `id` FROM `users` WHERE `login`='$ulogin' LIMIT 1"))['id'];
		if (empty($exist)){
			addMsg("Введённый вами пользователь не найден!",1);
		}

		$usa_rang = ModernUser($ulogin);
		mysql_query("UPDATE `users` SET `chatban`='0',`chatbantime`='0',`flood`='0' WHERE `login`='$ulogin'");

		if (empty($off) && $ulogin !== $alls['login']){
			$user_text = "Пользователь $usa_rang разбанен!";
			ask($user_text);
		}
		exit;
	}

	if ($text_param[0] == "/akkban") {
		$ulogin = $text_param[1];
		$exist  = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$ulogin' LIMIT 1"))['login'];
		if (empty($exist)){
			addMsg("Введённый вами пользователь не найден!",1);
		}
		$ulogin = $exist;
		$usa_rang = ModernUser($ulogin);
		mysql_query("UPDATE users SET ban='1',bantime='9999999',chatban='1',chatbantime='9999999' WHERE login='$ulogin'");
		
		$user_text = "Пользователь $usa_rang забанен!";
		ask($user_text);
		mysql_query("DELETE FROM `chat` WHERE login='$ulogin'");
		exit;
	}


	#Кикнуть пользователя
	if ($text_param[0] == "/kick") {
		$ulogin = $text_param[1];
		#Отображать в чате (по умолчанию - Да)
		$off = $text_param[2];
		$exist  = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$ulogin' LIMIT 1"))['login'];
		if (empty($exist)){
			addMsg("Введённый вами пользователь не найден!");
		}
		$ulogin = $exist;
		$usa_rang = ModernUser($ulogin);
		#Чтоб меня не кикнули случайно
		if ($ulogin !== "DanRotaru"){
			if (empty($off)){
				ask("Пользователь $usa_rang кикнут с чата!");
			}
			mysql_query("UPDATE `users` SET `kik`='1' WHERE `login`='$ulogin'");
			mysql_query("DELETE FROM `session` WHERE `user`='$ulogin'");
			exit;
		}
	}


	#Проверить аккаунты пользователя (не покидая чат)
	if ($text_param[0] == "/user_akks") {
		$ulogin = $text_param[1];
		if (empty($ulogin)){
			addMsg("Введённый вами пользователь не найден!");
		}
		else{
			$url = $URL."duser_akks/?login=".$ulogin;
			echo "iFrame('$url');";
		}
		exit;
	}

	if ($text_param[0] == "/clear") {
		#Очистить всё, без ввода новых сообщений (по умолчанию - Нет, 1 - Да)
		$clearAll = $text_param[1];
		mysql_query("DELETE FROM `chat`");
		mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','all')");

		ask("Чат очищен !");
		if (empty($clearAll)){
			ask("{:chatto-surl-vk:}");
			ask("{:chatto-surl-rules:}");
			ask("{:chatto-surl-help:}");
			ask("{:chatto-surl-shop:}");
			ask("{:chatto-surl-buy:}");
		}
		exit;
	}
	### Конец фукнции только для администраторов/модераторов
}

/********************* Пользовательские команды ******************/

#Команда выдачи кристаллов (конкурсоводам, модераторам и администраторам)
if ($text_param[0] == "/win") {
	$uCanDoContests = false;

	#Кто может использовать команду
	$canDoContestsUsers = ["Adam","MILK_M","YouWin","Bucku_Co_JIbgoM","Mr_Agressor"];
	if ($alls['group'] == "3" || $alls['group'] == "2") {
		$uCanDoContests = true;
	}

	if(!$uCanDoContests){
		if (in_array($login, $canDoContestsUsers)) $uCanDoContests = true;
	}

	if(!$uCanDoContests){
		addMsg("У вас нет прав использовать эту команду!");
	}
	else{
		$ulogin = $text_param[1];
		$kry = $text_param[2];
		$link = $text_param[3];

		if ($kry < 1000){
			addMsg("Зачисление происходит от 1 000 кристаллов!");
		}

		$exist  = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$ulogin' LIMIT 1"))['login'];
		if (empty($exist)){
			addMsg("Введённый вами пользователь не найден!");
		}
		$ulogin = $exist;
		$usa_rang = ModernUser($ulogin);

		if ($alls['kry'] < $kry){
			addMsg("Недостаточно кристаллов!");
		}

		$kry_t = number_format($kry, 0, ' ', ' ');

		mysql_query("UPDATE `users` SET `kry`=`kry`+'$kry' WHERE `login`='$ulogin'");
		mysql_query("UPDATE users SET `kry`=`kry`-'$kry' WHERE `login`='$login'");

		if (empty($link)){
			$knk = "конкурсе";
		}
		else{
			$knk = "<a href=\"$link\" style=\"color:limegreen;font-weight:bold;\" target=\"_blank\">конкурсе</a>";
		}
		
		$user_text = "Пользователь $usa_rang выиграл в $knk и получил {:chatto-yellow=$kry_t:} :kry: Поздравляем!";
		ask($user_text);
		exit;
	}
}

#Игра в карму
if ($text_param[0] == "/karma2") {
	if ($alls['group'] == "3" || $alls['group'] == "2" || $alls['helper'] == "1" || $alls['group'] == 1){
		$kr = rand(0,100);
		$karma = $kr." %";
		$stavka = 1000;
		mysql_query("UPDATE users SET `kry`=`kry`-'$stavka' WHERE `login`='$login'");

		$my_rang = ModernUser($login);
		ask("Пользователь $my_rang имеет $karma");
		exit;
	}
}

#Просмотр профиля пользователя
if ($text_param[0] == "/u") {
	$ulogin = $text_param[1];
	echo("profile('$ulogin')");
	exit;
}

#Просмотр гаража пользователя
if ($text_param[0] == "/g") {
	$ulogin = $text_param[1];
	echo("ugarage('$ulogin')");
	exit;
}

#Чёрный фон
if ($text_param[0] == "/blackbg") {
	echo("$('body').css('background','#000');");
	exit;
}
#Просмотр погоды
if ($text_param[0] == "/weather") {
	echo('showWeather()');
	exit;
}
#Небольшой калькулятор
if ($text_param[0] == "/calc") {
	echo('showWeather()');
	exit;
}

#Кинуть видео (ссылку) в чате
if ($text_param[0] == "/video") {
	$videolink = $text_param[1];
	if (empty($videolink)){
		addMsg("Введите ссылку на видео!",3);
	}
	if ($videolink[4] !== "s"){
		addMsg("Неверно был указал адрес сайта!",3);
	}
	$user_text = "<a onclick=\"youtubel(\'$videolink\')\">Посмотреть видео</a>";
	mysql_query("INSERT INTO `chat` (`login`,`text`,`group`, `date`, `time`, `ip`) VALUES('$login','$user_text','$group','$date', '$time','$ip')");

	exit;
}

#Открыть другие сайты в нашем (ввод в чате)
if ($text_param[0] == "/iFrame") {
	$iFramelink = $text_param[1];
	if (empty($iFramelink)){
		addMsg("Введите ссылку на сайт!",3);
	}
	if ($iFramelink[4] !== "s"){
		addMsg("Адрес сайта должен начинатья с HTTPS!",3);
	}
	if (filter_var($iFramelink, FILTER_VALIDATE_URL) === FALSE) {
		addMsg("Неверно был указал адрес сайта!",3);
	}
	if (strpos($iFramelink, "chatto.ru") !== false || strpos($iFramelink, "tanki.chat") !== false) {
        addMsg("Неверно был указал адрес сайта!",3);
        exit;
	}

	$user_text = "<a onclick=\"iFrame(\'$iFramelink\')\">Открыть сайт</a>";
	mysql_query("INSERT INTO `chat` (`login`,`text`,`group`, `date`, `time`, `ip`) VALUES('$login','$user_text','$group','$date', '$time','$ip')");
	exit;
}

#Отображать текущее время сервера
if ($text_param[0] == "/time") {
	$nowtime = date("H:i &#8250; d.m.y");
	addMsg("Текущее время чата (МСК): $nowtime");
	exit;
}

#Создание промо-кодов
if ($text_param[0] == "/promocode") {
	if($alls['kcard1'] !== '1' && $alls['kcard2'] !== '1'){
		echo("alert('У вас не куплена карта создателя промо-кодов!')");
		exit;
	}else{
		echo("promo_create()");
		exit;
	}
}
// if ($text_param[0] == "/promocode") {
// 	$text = str_replace("/promocode", 'Новые ползователи чата, попрошу вас прочесть #help, а так-же #rules,
// 	если у вас будут какие-то вопросы можете задать их одному из Помощником Проекта', $text);
// }

#Отображать текущее время сервера
if ($text_param[0] == "/yt") {
	if(!empty($text_param[1])){
		echo("openYoutubeModal('".$text_param[1]."')");
		exit;
	}
	else{
		echo("openYoutubeModal()");
		exit;
	}
}

#Игроки челленджа
if ($text_param[0] == "/uchallenges") {
	echo("p_challenges()");
	exit;
}

#Игроки челленджа
if ($text_param[0] == "/dansupermusic") {
	if($_SESSION['mobile'] !== 1){exit;}
	echo("document.location.href='https://chatto.ru/tmuz/';");
	exit;
}

#Игроки челленджа
if ($text_param[0] == "/paint") {
	$n = $text_param[1];
	$c = mysql_fetch_array(mysql_query("SELECT `id` FROM `chatto_paints` WHERE `name`='$n' LIMIT 1"))['id'];
	if(empty($c)) addMsg("Краска не найдена!", 1);
	echo("CHATTO_GARAGE.bottom.info($n,3)");
	exit;
}

#Игнор
if ($text_param[0] == "/ignore") {
	$ulogin = $text_param[1];
	if (empty($ulogin)){
		addMsg("Введённый вами пользователь не найден!",3);
	}

	$exist = mysql_fetch_array(mysql_query("SELECT `login` FROM users WHERE login='$ulogin' LIMIT 1"))['login'];
	if(empty($exist)){
		addMsg("Введённый вами пользователь не найден!",3);
	}

	$ulogin = $exist;

	if ($ulogin == $alls['login']){
		addMsg("Вы пытаетесь себя игнорировать!",3);
	}

	echo("ignore('$ulogin');");

	addMsg("Пользователь $ulogin был успешно добавлен в игнор!",3);
}
#Игнор
if ($text_param[0] == "/ignoredel") {
	$ulogin = $text_param[1];
	if (empty($ulogin)){
		addMsg("Введённый вами пользователь не найден!",3);
	}

	$exist = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$ulogin' LIMIT 1"))['login'];
	if(empty($exist)){
		addMsg("Введённый вами пользователь не найден!",3);
	}

	$ulogin = $exist;

	if ($ulogin == $alls['login']){
		addMsg("Вы пытаетесь себя убрать из игнора!",3);
	}

	echo("removeIgnore('$ulogin');");

	addMsg("Пользователь $ulogin был успешно удален из списка игноров!",3);
}

#Перевод кристаллов (имея кристальную карту)
if ($text_param[0] == "/transfer" || $text_param[0] == "/trsf") {
	$ulogin = $text_param[1];
	$kry = $text_param[2];
	if ($alls['kcard'] == 0){
		addMsg("Для перевода кристаллов вы должны купить кристальную карту!",3);
	}
	if (empty($ulogin)){
		addMsg("Введённый вами пользователь не найден!",3);
	}

	if ($alls['login'] !== "DanRotaru"){
		if ($kry < 1000){
			addMsg("Вы можете перевести не меньше 1000 кристаллов!",3);
		}
	}
	$chatbantime = round(((int) $alls['chatbantime'] - time()) / 60);
    if ($chatbantime >= 1440) addMsg("Вы забанены в чате на <b>$mytimeban</b> и не можете делать переводы.");

	if ($_SESSION['transferTime'] > time()){
		$timetotransfer = $_SESSION['transferTime'] - time();
		addMsg("Подождите $timetotransfer сек. для повторного перевода кристаллов!",3);
	}

	$exist = mysql_fetch_array(mysql_query("SELECT login FROM users WHERE login='$ulogin' LIMIT 1"));
	if(empty($exist['login'])){
		addMsg("Ведённый вами пользователь не найден!",3);
	}
	$ulogin = $exist['login'];

	if ($ulogin == $alls['login']){
		addMsg("Вы пытаетесь себе перевести!",3);
	}

	$kryAndComission = $kry + (0.1 * $kry);
	$kryAndComission = floor($kryAndComission);

	if ($alls['kry'] < $kryAndComission){
		addMsg("Недостаточно кристаллов!",3);
	}

	mysql_query("UPDATE `users` SET `kry`=`kry`-'$kryAndComission' WHERE `login`='$login'");
	mysql_query("UPDATE `users` SET `kry`=`kry`+'$kry' WHERE `login`='$ulogin'");

	$u1 = ModernUser($login);
	$u2 = ModernUser($ulogin);

	$kryN = number_format($kry, 0, ' ', ' ');
	ask("Пользователь $u1 перевёл {:chatto-yellow=$kryN:}:kry: пользователю $u2");

	$_SESSION['transferTime'] = time()+30;
	exit;
}

#Сколько пользователь получает за сообщение
if ($text_param[0] == "/howmuch") {
	$ulogin = $text_param[1];
	if (empty($ulogin)){
		addMsg("Введённый вами пользователь не найден!");
	}
	$exist = mysql_fetch_array(mysql_query("SELECT `id`,`login`,`rang_id`,`vip` FROM users WHERE login='$ulogin' LIMIT 1"));
	if(empty($exist['login'])){
		addMsg("Введённый вами пользователь не найден!");
	}

	$ulogin = $exist['login'];
	$uid = $exist['id'];
	if($exist['vip'] == 1){$rID = "v".$exist['rang_id'];}else{$rID = $exist['rang_id'];}
	$howmuch = howmuch($ulogin);
	$howmuch = explode(",",$howmuch);
	$ukry = $howmuch[0];
	$urank = $howmuch[1];
	$ccoin = $howmuch[2];
	//$howmuch = '<div style="background: #184213; color: #59FF32; border-spacing: 20px; border-radius: 3px; text-align: center; border-radius: 5px; font-size: 14px; box-shadow: inset 0px 0px 5px 2px rgba(0, 0, 0, 0.5); padding: 7px; border-radius: 5px; border-bottom: rgba(194, 194, 194, 0.8) solid 1px; border-left: rgb(125, 125, 125) solid 1px; border-top: rgba(121, 121, 121, 0.7) solid 1px; border-right: rgba(162, 162, 162, 0.7) solid 1px; font-family: &quot;PT SANS&quot;; margin: -13px;">'.$howmuch.'</div>';
	$howmuch = '<table class=\"mdn-table\"><caption style=\"position: relative;top: -5px;color: #59FF32;\">Пользователь <div class=\"rank r'.$rID.'\" onclick=\"profile(\"'.$uid.'\")\"></div>'.$ulogin.' получает за одно сообщение: </caption><tbody><tr><th>Кристаллы:</th><td>'.$ukry.'</td></tr><tr><th>Опыт:</th><td>'.$urank.'</td></tr></tbody></table>';
	$howmuch = 'Пользователь <user><div class=\"rank r'.$rID.'\" onclick=\"profile('.$uid.')\"></div>'.$ulogin.'</user> получает за одно сообщение '.$ukry.' кристаллов, '.$urank.' опыта и '.$ccoin.' ккойнов.';
	addMsg($howmuch,4);
	exit;
}

if ($text_param[0] == "/paintcoin") {
	$paints_len = mysql_num_rows(mysql_query("SELECT `id` FROM `chatto_paints`"));
	$earn = 0;
	$devider = 1000000;
	$mypaints = mysql_fetch_array(mysql_query("SELECT * FROM `paints` WHERE `login`='$login' LIMIT 1"));
	$paints = mysql_query("SELECT `id`, `price`, `unic` FROM `chatto_paints`");

	while ($paint = mysql_fetch_array($paints)) {
		if ($mypaints['p'.$paint['id']] == 0) continue;

		if ($paint['unic'] == 0) $earn += $paint['price'] / $devider;
		else if ($paint['unic'] == 1) $earn += 2;
		else if ($paint['unic'] == 2) $earn += 1;
		else continue;
	}
	
	addMsg("Вы получаете $earn ккоин за все имеющие краски!",4);
	exit;
}
if ($text_param[0] == "/sharepaintcoin") {
	if ($_SESSION['sharepaintcoin'] > time()){
		$sharepaintcoin = $_SESSION['sharepaintcoin'] - time();
		addMsg("Подождите $sharepaintcoin сек!",3);
	}
	
	$earn = 0;
	$devider = 1000000;
	$mypaints = mysql_fetch_array(mysql_query("SELECT * FROM `paints` WHERE `login`='$login' LIMIT 1"));
	$paints = mysql_query("SELECT `id`, `price`, `unic` FROM `chatto_paints`");

	while ($paint = mysql_fetch_array($paints)) {
		if ($mypaints['p'.$paint['id']] == 0) continue;

		if ($paint['unic'] == 0) $earn += $paint['price'] / $devider;
		else if ($paint['unic'] == 1) $earn += 2;
		else if ($paint['unic'] == 2) $earn += 1;
		else continue;
	}
	$_SESSION['sharepaintcoin'] = time() + 120;
	ask("Пользователь ".ModernUser($login)." получает $earn ккоин за все имеющие краски!");
	exit;
}
if ($text_param[0] == "/sharemypaintcoin") {
	if ($_SESSION['sharemypaintcoin'] > time()){
		$sharemypaintcoin = $_SESSION['sharemypaintcoin'] - time();
		addMsg("Подождите $sharemypaintcoin сек!",3);
	}
	$_SESSION['sharemypaintcoin'] = time() + 120;
	ask("Пользователь ".ModernUser($login)." имеет ".number_format($alls['paintcoin'], 0, ' ', ' ')." ккоинов!");
	exit;
}
if ($text_param[0] == "/mypaintcoin") addMsg("У вас ".number_format($alls['paintcoin'], 0, ' ', ' ')." ккоинов!");
if ($text_param[0] == "/mzz" && ($alls['group'] == "3" || $login == "RSKF" || $login == "Илья")) {
	$text_prm = explode("-",$text);
	if($text_param[1] == "-h"){
		addMsg("/mzz Ссылка на youtube песню => Название исполнителя => Название песни => Обложка",1);
	}
	// addMsg($text_prm[0]." = ".$text_prm[1]." = ".$text_prm[2]." = ".$text_prm[3]." = ".$text_prm[4]." = ".$text_prm[5]);

	if(empty($text_param[1])) exit;
	if(empty($text_param[4])) $text_param[4] = '<div class="no-cover"></div>';
	else $text_param[4] = '<img src="'.$text_param[4].'"/>';

	if(strpos($text_param[1], "youtube") !== false){
		$text_param[1] = str_replace("https://www.youtube.com/watch?v=","",$text_param[1]);
		$text_param[1] = str_replace("https://youtu.be/","",$text_param[1]);
		// $text_param[1] = '<iframe id="ytplayer" type="text/html" width="0" height="0" src="https://www.youtube.com/embed/'.$text_param[1].'?autoplay=1&cc_load_policy=1&disablekb=1&enablejsapi=1&fs=0&loop=1&iv_load_policy=3" frameborder="0"></iframe>';
	}else if(strpos($text_param[1], "youtu.be") !== false){
		$text_param[1] = str_replace("https://www.youtube.com/watch?v=","",$text_param[1]);
		$text_param[1] = str_replace("https://youtu.be/","",$text_param[1]);
		// $text_param[1] = '<iframe id="ytplayer" type="text/html" width="0" height="0" src="https://www.youtube.com/embed/'.$text_param[1].'?autoplay=1&cc_load_policy=1&disablekb=1&enablejsapi=1&fs=0&loop=1&iv_load_policy=3" frameborder="0"></iframe>';
	}else{
		// $text_param[1] = '<video style="display:none" autoplay id="mzzaudio"><source src="'.$text_param[1].'" type="audio/mpeg"></video>';
	}
	
	$text_param[3] = str_replace("_"," ",$text_param[3]);
	$text_param[3] = str_replace("_"," ",$text_param[3]);
	$text_param[3] = str_replace("\'","'",$text_param[3]);
	
	$text_param[2] = str_replace("_"," ",$text_param[2]);
	$text_param[2] = str_replace("--"," ",$text_param[2]);
	$text_param[2] = str_replace("\'","'",$text_param[2]);

	// ask('<div class="music-card">
	// 	'.$text_param[1].'
	// 	<div class="pause" onclick="playPause()"></div>
	// 	<div class="cover">'.$text_param[4].'</div>
	// 	<div class="mname">'.$text_param[3].'</div>
	// 	<div class="muser">'.$text_param[2].'</div>
	// 	<script>mzzv()</script>
	// 	</div>');
	ask('{:c-mzz='.$text_param[1].'==='.$text_param[4].'==='.$text_param[3].'==='.$text_param[2].':}');
	exit;
}

if ($text_param[0] == "/msvol" && !empty($text_param[1])) {
	$vol = (int) $text_param[1];
	if($vol < 0 || $vol > 100) addMsg("Укажите громкость песни в диапазоне 0 - 100%", 1);

	addMsg("Громкость песни изменена на $vol%!", 1, 0, 1);
	$vol = $vol / 100;
	echo("mzzv($vol)");
	exit;
}

if ($text_param[0] == "/hss") {
	$vol = (int) $text_param[1];
	if($vol == 1)echo("halloween.play();");
	else echo("halloween.stop();");
	
	exit;
}
if ($text_param[0] == "/hsi") {
	$vol = (int) $text_param[1];
	if($vol == 1) echo("$('#halloweenInterface').show();");
	else echo("$('#halloweenInterface').hide();");
	
	exit;
}
if ($text_param[0] == "/chatshowmsg" && !empty($text_param[1])) {
	$num = (int) $text_param[1];
	if($num < 50 || $num > 1000) addMsg("Укажите количество сообщений в диапазоне 50 - 1000", 1);

	echo("addMsg('Вы успешно поменяли количество сообщений на $num');MY.load = $num;");
	exit;
}
if ($text_param[0] == "/highlight" && !empty($text_param[1])) {
	if($text_param[1] == "1"){
		echo('addMsg("Вы успешно удалили все выбранные сообщения!");');
		echo("highlight_user = '';");
	}else{
		echo('addMsg("Все сообщения пользователя '.$text_param[1].' были выделены!");');
		echo("highlight('".$text_param[1]."')");
	}
	exit;
}

if ($text_param[0] == "/isEmoji") {
	$t1 = $text_param[1];
	$t0 = isEmoji($t1);
	if($t0) addMsg("Да, это эмоджи! $t0", 1);
	else addMsg("Нет!", 1);
	exit;
}
#Пользовательские команды
if ($text_param[0] == "/smiles") {
	exit("smiles()");
}
if ($text_param[0] == "/rules") {
	exit("rules()");
}
if ($text_param[0] == "/vibrate_on") {
	exit("window.navigator.vibrate(50);");
}
if ($text_param[0] == "/vibrate" && $text_param[1] == "1") {
	echo("meVibrate = true;");
	addMsg("Вибрация при поступлении новых сообщений включена!");
}

if ($text_param[0] == "/vibrate" && $text_param[1] == "0") {
	echo("meVibrate = false;");
	addMsg("Вибрация при поступлении новых сообщений отключена!");
}
if ($text_param[0] == "/showgarage") {
	if($text_param[1] == "1" || $text_param[1] == "session"){
		exit("MY.showgarage = 2;CHATTO_GARAGE.viewer.showAnyway();");
	}else{
		exit("CHATTO_GARAGE.viewer.showAnyway()");	
	}
	
}
/*
#Специальный текст
if(substr($text, 0, 2) == '``' && substr($text, -2) == '``'){
	$text = str_replace("``","",$text);
	$text = "<div class=\"tinytext\">".$text."</div>";
}
*/

if(substr($text, 0, 2) == '``' && substr($text, -2) == '``'){
	exit;
}

########################### Команды чата #####################################

/**********Автобан пользователя за флуд**********/
if ($alls['flood'] > time() && ($alls['group'] != "3") && ($alls['group'] != "2") ) {
	$alls_rangs = $alls['rang_id'];
	$alls_rang = ModernUser($mlog);

	ask("Пользователь $alls_rang лишен права выхода в эфир НА 5 МИНУТ. Причина: флуд. см. #rules");
	$chatbantime = time() + 300;
	mysql_query("UPDATE `users` SET `chatban`='1',`chatbantime`='$chatbantime',`ban_name`='Система',`ban_date`='$Ddate',`chatbanreason`='Флуд' WHERE `login`='$login'");
	mysql_query("DELETE FROM `chat` WHERE login='$mlog'");
	mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','u-$mlog')");
	exit;
}

$flood = time() + 1;
mysql_query("UPDATE `users` SET `flood`='$flood' WHERE `login`='$mlog'");
/**********Автобан пользователя за флуд**********/

# Писать /to, /pm
$login = $alls['login'];
$private = false;


#Писать /to
if ($text_param[0] == "/to" && isset($text_param[1]) && isset($text_param[2])) {
	if ($text_param[1] !== "SERIAL"){
		$tolog = $text_param[1];
		$tolog = str_replace(":"," ",$tolog);

		if (mb_strtolower($alls['login']) == mb_strtolower($tolog)){
			addMsg("Вы пытаетесь писать себе!",1);
		}
		if (!UserExists($tolog)) {
			addMsg("Введённый вами пользователь не найден!",1);
		}

		$tolog = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$tolog' LIMIT 1"))['login'];
		$text = str_replace("/to ".$tolog, '', $text);
		$text = str_replace("/to ".mb_strtolower($tolog), '', $text);
	}

} elseif ($text_param[0] == "/pm" && isset($text_param[1]) && isset($text_param[2])) {
	#Писать /pm
	if ($text_param[1] !== "SERIAL"){
		$tolog = $text_param[1];
		$tolog = str_replace(":"," ",$tolog);

		$private = true;
		if (mb_strtolower($alls['login']) == mb_strtolower($tolog)){
			addMsg("Вы пытаетесь писать себе!",1);
		}
		if (!UserExists($tolog)) {
			addMsg("Введённый вами пользователь не найден!",1);
		}
		
		$tolog = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$tolog' LIMIT 1"))['login'];
		$text = str_replace("/pm ".$tolog, '', $text);
		$text = str_replace("/pm ".mb_strtolower($tolog), '', $text);
	}
}

/*

# Ссылки
$text= preg_replace("/(^|[\n ])([\w]*?)((ht|f)tp(s)?:\/\/[\w]+[^ \,\"\n\r\t<]*)/is", "$1$2<a onclick=\"openlink(\'$3\')\" title=\"Переход по внешней ссылке\" >$3</a>", $text);
$text= preg_replace("/(^|[\n ])([\w]*?)((www|ftp)\.[^ \,\"\t\n\r<]*)/is", "$1$2<a onclick=\"openlink(\'$3\')\" title=\"Переход по внешней ссылке\">$3</a>", $text);
$text= preg_replace("/(^|[\n ])([a-z0-9&\-_\.]+?)@([\w\-]+\.([\w\-\.]+)+)/i", "$1<a onclick=\"openlink(\'mailto:$2@$3\')\" title=\"Переход по внешней ссылке\">$2@$3</a>", $text);
*/
############################ Подарочная карта #############################
/*
Пример:
SERIAL: RLLJ-T3F2-ZHM4-YO3Y
CVV: 54-845

*/
if ((preg_match('/([\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4})/is',$text) && preg_match('/(\d{2}-\d{3})/is',$text))) {
	$serial = preg_match('/([\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4})/is',$text,$smatches);
	$cvv = preg_match('/(\d{2}-\d{3})/is',$text,$cmatches);
	$serial = $smatches[1];
	$cvv = $cmatches[1];
	$hash = md5($serial." ".$cvv);

	$crd = mysql_fetch_array(mysql_query("SELECT `id`,`used` FROM `bonus` WHERE `hash`='$hash' LIMIT 1"));
	if (empty($crd['id'])){
		addMsg("Введённая вами подарочная карта не найдена!",3);
	}
	if ($crd['used'] == "1"){
		addMsg("Данная подарочная карта уже активирована!",3);
	}

	$text = " <a onclick=\"gocard(\'$hash\')\">Подарочная карта</a>";
}

// CHATTO-8396-YKJV-55O

if ((preg_match('/(CHATTO-[\w\d]{4}-[\w\d]{4}-[\w\d]{3})/is',$text))) {
	$promocode = preg_match('/(CHATTO-[\w\d]{4}-[\w\d]{4}-[\w\d]{3})/is',$text, $smatches);
	$promocode = $smatches[1];

	$crd = mysql_fetch_array(mysql_query("SELECT `id`,`used` FROM `bonus` WHERE `serial`='$promocode' LIMIT 1"));
	if (empty($crd['id'])){
		addMsg("Введённый вами промокод не найден!",3);
	}
	if ($crd['used'] == "1"){
		addMsg("Данный промокод уже активирован!",3);
	}
}

############################ Подарочная карта #############################
$rang_id = getRank($alls['rang']);


if ($group == 3 || $alls['login'] == "DanRotaru"){
	$text = bbcodeParser($text);
}
if ($alls['group'] !== "3"){
	if (strlen($text) > $msgLimitNr || mb_strlen($text) > $msgLimitNr || iconv_strlen($text) > $msgLimitNr) {
		addMsg("Слишком длинный текст!",3);
	}
}

$my_rang = UserRank($alls['login']);
$myRank = ModernUser($login);


if($text[0] == "/") addMsg("Введённая вами команда не найдена!",3);


####################### Анти спам №1 #########################

if ($alls['group'] !== "3"){
	#Небольшая антиспам система
	$antispam1 = ['ыфв','ывф','фыв','вфы','вфа','пывафв','йцфсва','фофыв','цуйце','апавпва','пвапвапвап','аваывав','фвфывф','йцуйцу','ячясч','кеуеуке','рпрапр','вапро','ваплвадп','пвапролшнаьаа','арпаф','долпавв','fxrd','fsds','fdadsa','dasgfda','ыдв','хвэц','вхы','аласв','вочцло','ахажад','уцас','ладвоп','аувм','кмал','','йук','фуц','ахажад','впвлпр','Фыыыф','уамовс','авпмтаовспыуа','вфыв','ыфвф','Ыьв','кцк','пуавп','урщ','ажв','ыжв','ывл','ашыщы','вхв','ыхыэы','ывыв','воллчтв','ыов','влвлвот','олылф','оылылы','вжацдвщ','вшыдаоц','ововов','алвтв','ыоы','ылышвщцт','ылы','ыхыз','вщфдыдв','вщылыл','ововт','овлул','овлуь','урщ','влылагц','хвжцоа','шулйрв','влцр','пуавп','лытц','ашищы','ылф','skjt','asdasd','hsjsw','hdj','hdnebqjs','hxehqju','bsdhej','ndndjs','jssuwu','djjjejd','hshz','henehzhwj','xkksj','hdjdd','пуавп','урщ'];

	if (in_array(mb_strtolower($text), $antispam1)){
		addMsg("Был обнаружен спам! Вы написали: $text",4);
	}

	#Бан за дублирование сообщений
	/*$ban_for_dublicate = 1;

	if ($ban_for_dublicate == 1){
		$last_message = $alls['last_message'];

		if ($text == $last_message && $text == $last_m1){
			if ($alls['group'] == "1" || $alls['helper'] == "0"){
				addMsg("Ваше сообщение совпадает с предыдущим (дублирование)!",1);
			}
		}
	}*/

	#Антифлуд №1
	#Проверка последних 10 сообщений в БД
	$floodmsg = $alls['floodmsg'];
	$last10msg = mysql_query("SELECT `login` FROM `chat` WHERE `login`<>'sys' ORDER BY `id` DESC LIMIT 10");
	$MyLastMSG = $floodmsg;
	while($last10 = mysql_fetch_array($last10msg)){
		if ($last10['login'] == $login){
			$MyLastMSG = $MyLastMSG + 1;
		}else{
			$MyLastMSG = 0;
		}
	}

	if ($MyLastMSG >= 10){

		$chatbantime = time() + 600;
		mysql_query("UPDATE `users` SET `chatban`='1',`chatbantime`='$chatbantime',`ban_name`='Система',`chatbanreason`='Флуд, пункт 1.1',ban_date='$date' WHERE `login`='$login'");
		mysql_query("DELETE FROM `chat` WHERE `login`='$login'");
		mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','u-$login')");
		mysql_query("UPDATE `users` SET `floodmsg`='0' WHERE `login`='$login'");

		#Штраф (в зависимости от кол. кри)
		if ($alls['kry'] > 1000 && $alls['kry'] <= 2000){
			$nkry = 1000;
		}elseif ($alls['kry'] > 2000){
			$nkry = 2000;
		}elseif ($alls['kry'] == 1000){
			$nkry = 1000;
		}elseif ($alls['kry'] > 1000){
			$nkry = $alls['kry'];
		}else{
			if ($alls['kry'] < $nkry){
				$nkry = $alls['kry'];
			}else{
				$nkry = 1000;
			}
		}

		$nkry1 = number_format($nkry, 0, ' ', ' ');
		ask("Пользователь $myRank лишен права выхода в эфир НА 10 МИНУТ а так же был оштрафован на {:chatto-yellow=$nkry1 кристаллов:}. Причина: Флуд, пункт 1.1, см. #rules");
		mysql_query("UPDATE users SET `kry`=`kry`-'$nkry' WHERE `login`='$login'");
	}
	else{
		mysql_query("UPDATE `users` SET `floodmsg`='$MyLastMSG' WHERE `login`='$login'");
	}

	#Анти-спам №2
	#Если человек пишет 5 сообщений меньше 3-х символов то блокируем пользователя на 5 минут за спам
	if (strlen($text) <= 3){
		if (empty($_SESSION['anti_flood2'])) $_SESSION['anti_flood2'] = 0;

		$_SESSION['anti_flood2'] = $_SESSION['anti_flood2'] + 1;
	}
	else{
		$_SESSION['anti_flood2'] = 0;
	}

	if ($_SESSION['anti_flood2'] == 5){
		mysql_query("UPDATE users SET `floodmsg`='0' WHERE login='$login'");

		$chatbantime = time() + 300;
		mysql_query("UPDATE `users` SET `chatban`='1',`chatbantime`='$chatbantime',`ban_name`='Система',`chatbanreason`='Спам, бессмысленные сообщения пункт 1.6',ban_date='$date' WHERE `login`='$login'");
		mysql_query("DELETE FROM `chat` WHERE `login`='$login'");
		mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','u-$login')");

		#Штраф в 500 кристаллов
		$nkry = 500;
		if ($alls['kry'] < $nkry){
			$nkry = $alls['kry'];
		}

		$nkry1 = number_format($nkry, 0, ' ', ' ');
		ask("Пользователь $myRank лишен права выхода в эфир НА 5 МИНУТ а так же был оштрафован на {:chatto-yellow=$nkry1 кристаллов:}. Причина: Спам, бессмысленные сообщения пункт 1.6, см. {:chatto-url-rules:}");
		mysql_query("UPDATE `users` SET `kry`=`kry`-'$nkry' WHERE `login`='$login'");

		$_SESSION['anti_flood2'] = 0;
		exit;
	}
	#Анти-спам №3
	// Если длина сообщении >= 150 так же если сообщений написано 5 (таких) то баним на 2 минуты
	if(strlen($text) >= 150){
		if(empty($_SESSION['anti_flood3'])) $_SESSION['anti_flood3'] = 0;

		if($_SESSION['anti_flood3'] >= 5){
			mysql_query("DELETE FROM `chat` WHERE `login`='$login'");
			mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','u-$login')");
			$mmlog = ModernUser($login);
			ask("Пользователь $mmlog лишен права выхода в эфир НА 2 МИНУТЫ. Причина: Флуд, пункт 1.1, см. {chat:rules}");
			$chatbantime = time() + 120;
			mysql_query("UPDATE users SET `chatban`='1',`chatbantime`='$chatbantime',ban_name='Система',`chatbanreason`='Флуд',`ban_date`='$Ddate' WHERE `login`='$login'");
			$_SESSION['anti_flood3'] = 0;
			exit;
		}

		$_SESSION['anti_flood3'] = $_SESSION['anti_flood3'] + 1;
	}else{
		$_SESSION['anti_flood3'] = 0;
	}

}


####################### Антифлуд №1 #########################



/*
if (!isset($_SESSION['b'])){
	$_SESSION['b'] = time()+300;
}
	$mba = round(($_SESSION['b']-time())/60);
	if ($mba == "1"){$mbm = "минута";}
	if ($mba == "2"){$mbm = "минуты";}
	if ($mba == "3"){$mbm = "минуты";}
	if ($mba == "4"){$mbm = "минуты";}
	if ($mba == "5"){$mbm = "минут";}
	if ($_SESSION['b'] >= time()){
		echo ("alert('Вы были заблокированы на: $mba $mbm! Причина: Флуд.')");
	}
	if ($_SESSION['b'] <= time()){
		unset($_SESSION['b']);
		echo ("alert('Вы были разблокированы. Приятного общения !')");
		mysql_query("UPDATE users SET las_mes='0' WHERE login='$login'");
	}

	exit;
	else{
		if (isset($_SESSION['b'])){
			unset($_SESSION['b']);
		}
	}


####################### Антифлуд №2 #########################

####################### Антифлуд №3 #########################
# Если человек пишет 3 смс. заглавнымы буквами(Капсом)
# Блокируем пользователя на 5 минут за капс

# $_SESSION['msgcaps'];
if ($alls['group'] !== "1"){
#if(preg_match("/([A-ZА-Я0-9 ])$/",$text) && strlen($text) > 2) {
if (mb_strtoupper($text) === $text && !is_numeric($text)){
	if (empty($_SESSION['msgcaps'])){
		$_SESSION['msgcaps'] = 0;
	}
	
	$_SESSION['msgcaps'] = $_SESSION['msgcaps'] + 1;
}else{
	$_SESSION['msgcaps'] = 0;
}

if ($_SESSION['msgcaps'] == 3 && $alls['group'] !== 3){

$chatbantime = time() + 60;
mysql_query("UPDATE users SET chatban='1',chatbantime='$chatbantime',ban_name='Система',chatbanreason='Капс пункт 1.5',ban_date='$date' WHERE login='$login'");
mysql_query("DELETE FROM `chat` WHERE login='$login'");
mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','u-$login')");
ask("Пользователь $myRanks лишен права выхода в эфир НА МИНУТУ. Причина: Капс пункт 1.5, см. {:chatto-url-rules:}");

$_SESSION['msgcaps'] = 0;

echo("alert('Вы были заблокированы и сможете вернутся в эфир через 60 секунд. Причина: КАПС, недопустимые символы, пункт 1.5, см. <a onclick=\"rules()\">правила</a>')");
exit;
}
}
*/
####################### Антифлуд №3 #########################


// Если длина сообщении >= 100 так же было отправлено 5 сообщений за 10 сек
// 5 сообщений по 100 симв. с интервалом в 10 сек

// if(empty($_SESSION['anti_flood2'])) $_SESSION['anti_flood2'] = 0;
// if(empty($_SESSION['anti_flood2_t'])) $_SESSION['anti_flood2_t'] = time() + 10;

// if($group !== 3){
// 	if(strlen($text) >= 100){

// 		if($_SESSION['anti_flood2_t'] > time()){
// 			if($_SESSION['anti_flood2'] >= 5){
				
// 			}else{
// 				$_SESSION['anti_flood2'] = $_SESSION['anti_flood2'] + 1;
// 			}
// 		}else{
// 			$_SESSION['anti_flood2'] = 0;
// 		}
// 	}
// }
	/*
if($alls['login'] == "DanRotaru"){
	$i = 1;
	$LastToLogin = '';
	$LastId = 0;
	
	$MyMsg = mysql_query("SELECT `id`, `login`, `tologin` FROM `chat` WHERE `login` = '$login' AND `private` = 1 ORDER BY `id` DESC LIMIT 10");
	while ($PM = mysql_fetch_array($MyMsg)) {
		
		if ($LastToLogin == $PM['tologin']) {
			$LastId = (int) $PM['id'];
			$i++;
			if($i > 8){
				$i = 1;
				mysql_query("INSERT INTO `chat` (`group`,`login`,`tologin`,`private`,`text`) VALUES('1','Q','Q','1',' yeah')");
				$ToLoginMsg = mysql_fetch_array(mysql_query("SELECT `id` FROM `chat` WHERE `login` = '$login' AND `private` = 1 AND `tologin` = '$LastToLogin' ORDER BY `id` DESC LIMIT 1"))['id'];
				if ($LastId > 0 && $LastId < $ToLoginMsg) {
					mysql_query("INSERT INTO `chat` (`group`,`login`,`tologin`,`private`,`text`) VALUES('1','Q','Q','1',' ---------------------------------------')");
					$i = 1;
				}
				break;
			}
		}$LastToLogin = $PM['tologin'];
	}
	mysql_query("INSERT INTO `chat` (`group`,`login`,`tologin`,`private`,`text`) VALUES('1','Q','Q','1',' $ToLoginMsg = $LastId = $i $LastToLogin')");
	/*
	mysql_query("INSERT INTO `chat` (`group`,`login`,`tologin`,`private`,`text`) VALUES('1','Q','Q','1',' $si $LastToLogin')");


	if ($i > 8) {
		$i = 1;
		mysql_query("INSERT INTO `chat` (`group`,`login`,`tologin`,`private`,`text`) VALUES('1','Q','Q','1',' GREAT')");
		
		$ToLoginMsg = mysql_query("SELECT `id`, `login`, `tologin` FROM `chat` WHERE `login` = '$LastToLogin' AND `private` = 1 AND `tologin` = '$login' ORDER BY `id` DESC LIMIT 10");
		$ToLoginMsgData = mysql_fetch_array($ToLoginMsg);
		if ($LastId > 0 && $LastId < (int) $ToLoginMsgData['id']) {
			ask("G0as");
		}
		
	}
	
}
*/

class Ban{
	private static function deleteUserMsg($login){
		mysql_query("DELETE FROM `chat` WHERE `login`='$login'");
		mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','u-$login')");
	}
	public static function get($login){
		$u = mysql_fetch_array(mysql_query("SELECT `chatban`,`chatbantime` FROM `users` WHERE `login`='$login' LIMIT 1"));
		if($u['chatban'] == 1 && $u['chatbantime'] > time()){
			return true;
		}else{
			return false;
		}
	}

	public static function set($login, $time, $reason, $who=0, $chat=0){
		$login = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$login' LIMIT 1"))['login'];
		if(empty($login)) return false;
		
		self::deleteUserMsg($login);
		$chatbantime = time() + ($time * 60);
		if($who == 0) $who = "Система";
		$Ddate = date("d.m.Y H:i");
		mysql_query("UPDATE users SET `chatban`='1',`chatbantime`='$chatbantime',`ban_name`='$who',`chatbanreason`='$reason',`ban_date`='$Ddate' WHERE `login`='$login'");
		if($chat == 1){
			$mmlog = ModernUser($login);
			ask("Пользователь $mmlog лишен права выхода в эфир НА $time МИНУТ. Причина: $reason, см. {chat:rules}");
		}
		
		
	}
}

#Очередная анти-флуд система
#Описание: анализируются кол. сообщений которые написаны за 2 сек
#Если их 10 то бан
if(empty($_SESSION['anti_flood5'])) $_SESSION['anti_flood5'] = 0;

if($_SESSION['anti_flood5_time'] > time()){
	$_SESSION['anti_flood5_time'] = time() + 2;
	$_SESSION['anti_flood5']++;
}else{
	$_SESSION['anti_flood5'] = 0;
	$_SESSION['anti_flood5_time'] = time() + 2;
}

if($_SESSION['anti_flood5'] > 10){
	$_SESSION['anti_flood5'] = 0;
	$_SESSION['anti_flood5_time'] = time();
	
	mysql_query("DELETE FROM `chat` WHERE `login`='$login'");
	mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','u-$login')");
	$mmlog = ModernUser($login);
	ask("Пользователь $mmlog лишен права выхода в эфир НА 10 МИНУТ. Причина: флуд, флейм, пункт 1.1, см. {chat:rules}");
	$chatbantime = time() + 600;
	mysql_query("UPDATE users SET `chatban`='1',`chatbantime`='$chatbantime',`ban_name`='Система',`chatbanreason`='Реклама (пиар)',`ban_date`='$Ddate' WHERE `login`='$login'");
	exit;
}
///////////////////////////////////
if(strlen($text) >= 250){
	if(empty($_SESSION['anti_flood6'])) $_SESSION['anti_flood6'] = 0;

	if($_SESSION['anti_flood6_time'] > time()){
		$_SESSION['anti_flood6_time'] = time() + 10;
		$_SESSION['anti_flood6']++;
	}else{
		$_SESSION['anti_flood6'] = 0;
		$_SESSION['anti_flood6_time'] = time() + 10;
	}
	
	if($_SESSION['anti_flood6'] > 5){
		$_SESSION['anti_flood6'] = 0;
		$_SESSION['anti_flood6_time'] = time();
		
		mysql_query("DELETE FROM `chat` WHERE `login`='$login'");
		mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','u-$login')");
		$mmlog = ModernUser($login);
		ask("Пользователь $mmlog лишен права выхода в эфир НА 5 МИНУТ. Причина: Флуд, флейм, пункт 1.1, см. {chat:rules}");
		$chatbantime = time() + 300;
		mysql_query("UPDATE users SET `chatban`='1',`chatbantime`='$chatbantime',`ban_name`='Система',`chatbanreason`='Реклама (пиар)',`ban_date`='$Ddate' WHERE `login`='$login'");
		exit;
	}
}

#################### Автобан за спам смайлами ###################
if(isEmoji($text)){
	mysql_query("UPDATE `users` SET `chatsmiles`=`chatsmiles`+'1' WHERE `login`='$login'");
	if($alls['chatsmiles'] > 5){
		Ban::set($login, 10, "Бессмысленные сообщения, спам (пункт 1.6)", 0, 1);
		mysql_query("UPDATE `users` SET `chatsmiles`='0' WHERE `login`='$login'");
		exit;
	}
}else{
	mysql_query("UPDATE `users` SET `chatsmiles`='0' WHERE `login`='$login'");
}
#################### Автобан за спам смайлами ###################


####################### Автобан за пиар #########################
if(strpos($text1,"tanki.chat") !== false ||
    strpos($text1,"megatanks.fun") !== false ||
    strpos($text1,"u69262.onhh.ru") !== false){
		mysql_query("DELETE FROM `chat` WHERE `login`='$login'");
		mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','u-$login')");
		$mmlog = ModernUser($login);
		ask("Пользователь $mmlog лишен права выхода в эфир НА 30 МИНУТ. Причина: Реклама (пиар), пункт 1.7, см. {chat:rules}");
		$chatbantime = time() + 1800;
		mysql_query("UPDATE users SET chatban='1',chatbantime='$chatbantime',ban_name='Система',chatbanreason='Реклама (пиар)',ban_date='$Ddate' WHERE `login`='$login'");
		exit;
}


####################### Автобан за пиар #########################


$chatms = mysql_fetch_array(mysql_query("SELECT `login` FROM `chat` ORDER BY `id` DESC LIMIT 1"))['login'];
if ($chatms == $login){
	$lmn = $alls['las_mes'] + 1;
	mysql_query("UPDATE `users` SET `las_mes`='$lmn' WHERE `login`='$login'");
}else{
	mysql_query("UPDATE `users` SET `las_mes`='0' WHERE `login`='$login'");
}

#Даём кристаллы/опыт за сообщение
howmuch($alls['login'], 1);
mysql_query("UPDATE users SET `messages`=`messages`+'1',`rang_id`='$rang_id' WHERE `login`='$login'");



#Кристаллы в капитал клана
$clan_id = mysql_fetch_array(mysql_query("SELECT `clan_id` FROM `clan_user` WHERE `login`='$login' AND `in_clan`='1' LIMIT 1"))['clan_id'];
if (!empty($clan_id)){
	mysql_query("UPDATE `clans` SET `kry`=`kry`+'5' WHERE `id`='$clan_id'");
}



mysql_query("UPDATE `aconfigs` SET `messages`=`messages`+1");

#Выполняем задания
include($_SERVER['DOCUMENT_ROOT']."/src/t_tasks/task-execute.php");


#Коины за краски
// include($_SERVER['DOCUMENT_ROOT']."/src/garage/paintcoin.php");

#Crazy Weekend
$crazyweekend = mysql_fetch_array(mysql_query("SELECT `cweekend` FROM `aconfigs` WHERE `id`='1' LIMIT 1"))['cweekend'];
if ($crazyweekend == "1"){
	$CrazyExist = mysql_fetch_array(mysql_query("SELECT `id` FROM `crazyweekend` WHERE `login`='$login' LIMIT 1"))['id'];
	if (!empty($CrazyExist)){
		mysql_query("UPDATE `crazyweekend` SET `messages`=`messages`+'1' WHERE `login`='$login'");
	}
}


#echo time() + (43200 * 60);
#exit;
/**/
if($private == false){
	#Турниры
	$IamIn = mysql_fetch_array(mysql_query("SELECT `id` FROM `tournaments_u` WHERE `login`='$login' LIMIT 1"))['id'];
	if (!empty($IamIn)){
		mysql_query("UPDATE `tournaments_u` SET `msg`=`msg`+1 WHERE `login`='$login'");
	}

	#Челлендж
	$checkChallenge = mysql_fetch_array(mysql_query("SELECT `challenge_run`,`challenge` FROM `aconfigs` WHERE `id`='1' LIMIT 1"));
	if($checkChallenge['challenge_run'] == 1){
		if(time() - $checkChallenge['challenge'] < 0){
			$_GET['aaa'] = 'yes';
			include($_SERVER['DOCUMENT_ROOT']."/src/t_tasks/challenges_check.php");
		}
	}
}

####################### UPDATES #########################
if (empty($loginA)){$loginA = $login;}

/*
function endsWith($haystack, $needle){
	$length = strlen($needle);
	if ($length == 0) {
		return true;
	}
	return (substr($haystack, -$length) === $needle);
}
*/

function endsWith($fond, $needle){
    $num = strlen($needle);
	if($needle == substr($fond, -$num)){
		return true;
	}else{
		return false;
	}
}

// $msgto = false;
// if(preg_match("/^((.*)\/(.*))$/", $text, $matches)) {
// 	$msgto = $matches[1];
// 	if($msgto){
// 		$msgto = preg_replace("/^(.*?)\((.*?)\/(.*?)\)(.*?)$/", "$1>>>$2/$3>>>$4", $msgto);
// 		$exploded = explode(">>>", $msgto);
// 		$m0 = $exploded[0];
// 		$mm = explode("/", $exploded[1]);
// 		$m1 = $mm[0];
// 		$m2 = $mm[1];
// 		$m3 = $exploded[2];
// 		$exist = mysql_fetch_array(mysql_query("SELECT `id` FROM `users` WHERE `login`='$m1' LIMIT 1"))['id'];
// 		if(!empty($exist)){
// 			$m1 = $exist;
// 			$r = '{:c-up='.$m1.'='.$m2.':}';
// 			$text = $m0.$r.$m3;
// 		}
// 	}
// }

if (preg_match_all('/@([а-яёa-z0-9\-_.]+)/ui', $text, $matches)) {
    for($i = 0; $i < count($matches); $i++){
		$m1 = $matches[1][$i];
		$m1 = preg_replace('/[.,\-_]$/', '', $m1);

		$exist = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$m1' LIMIT 1"))['login'];
		if(!empty($exist)){
			$r = '{:c-up1='.$exist.':}';
			$text = str_replace("@@$m1", $r, $text);
		}
    }
}

if (preg_match_all('/@cl-([а-яёa-z0-9\-_.]+)/ui', $text, $matches)) {
    for($i = 0; $i < count($matches); $i++){
		$m1 = $matches[1][$i];
		$m1 = preg_replace('/[.,\-_]$/', '', $m1);

		$exist = mysql_fetch_array(mysql_query("SELECT `teg`,`name` FROM `clans` WHERE `teg`='$m1' LIMIT 1"));
		if(!empty($exist['teg'])){
			$r = '{:c-cl='.$exist['teg'].'='.$exist['name'].':}';
			$text = str_replace("@cl-$m1", $r, $text);
		}
    }
}

if (preg_match_all('/@([а-яёa-z0-9\-_.]+)/ui', $text, $matches)) {
    for($i = 0; $i < count($matches); $i++){
		$m1 = $matches[1][$i];
		$m1 = preg_replace('/[.,\-_]$/', '', $m1);

		$exist = mysql_fetch_array(mysql_query("SELECT `login` FROM `users` WHERE `login`='$m1' LIMIT 1"))['login'];
		if(!empty($exist)){
			$r = '{:c-up3='.$exist.':}';
			$text = str_replace("@$m1", $r, $text);
		}
    }
}


#########################################################
$fond = getfond();
$private = $private == true ? 1 : 0;
$text   = stripslashes($text);
$text   = trim($text);
$text   = mysql_real_escape_string($text);
if(!empty($tolog)) $text = " ".$text;
#Ввод самого сообщения
mysql_query("INSERT INTO `chat` (`login` , `tologin`, `text`, `id`, `group`,`private`, `date`, `time`, `ip`) VALUES ('$loginA','$tolog','$text',NULL,'$group','$private','$date', '$time','$ip')");

#Обновляем последние сообщения
$last_m1 = $alls['last_message'];
mysql_query("UPDATE `users` SET `last_message1`='$last_m1',`last_message`='$text' WHERE `login`='$login'");


#Обновляем фонд
if ($private == 0) mysql_query("UPDATE `aconfigs` SET `fond`=`fond`+2");

#Золотые ящики (если сообщение не PM)
if($private == 0){
	$crazy_golds = mysql_fetch_array(mysql_query("SELECT `cgolds` FROM `aconfigs` WHERE id='1' LIMIT 1"))['cgolds'];
	if ($crazy_golds == "1"){
		#Золотые ящики x10
		if (endsWith($fond, '89') && !endsWith($fond, '489')) ask("{:chatto-sgold-soon:}");
		if (endsWith($fond, '489')) ask("{:chatto-smgold-soon:}");

		if (endsWith($fond, '01') && !endsWith($fond, '501')) gold();
		if (endsWith($fond, '501')) megagold();
	}
	else{
		#Обычные золотые ящики
		if (endsWith($fond, '489')) ask("{:chatto-sgold-soon:}");
		if (endsWith($fond, '189')) ask("{:chatto-smgold-soon:}");

		if (endsWith($fond, '501')) gold();
		if (endsWith($fond, '201')) megagold();
	}

	#Бросаем карты в чат
	if (endsWith($fond, '999')) card(1);
	if (endsWith($fond, '181')) card(1);

	#Сообщения администрации
	if (endsWith($fond, '123')) chatto();
	if (endsWith($fond, '733')) invite();
}


# Чат Бот
$_POST['tolog'] = $tolog;
include("bot.php");


echo 1;
exit;
