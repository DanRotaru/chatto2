<?php
####################################################
# @author 	DanRotaru
# @info	Функции чата
####################################################
include_once($_SERVER['DOCUMENT_ROOT']."/src/config.php");
#Прочие настройки
$date = date("d.m.y");
$time = date("H:i");
$Ddate = date("H:i - d.m.y");
$ip = $_SERVER['REMOTE_ADDR'];

########################### Функция голда ###########################
function gold(){
  global $mylogin;
  $dropped = false;


  if ($dropped) return '';
  $rand = rand(1,6);

  $info  = mysql_fetch_array(mysql_query("SELECT `login` FROM `chat` WHERE `login` <> 'sys' ORDER BY `id` DESC LIMIT 1"));
  $lastuser = $info['login'];

  if (empty($info['login'])){
    $lastuser = $mylogin;
  }else{
    $lastuser = $info['login'];
  }

  $guvip1 = mysql_fetch_array(mysql_query("SELECT `vip` FROM `users` WHERE login='$lastuser' LIMIT 1"));
  if ($guvip1['vip'] == "1"){$guvip = "V";}else{$guvip = "";}

  $ugoldes  = mysql_query("SELECT `quest1_go`,`quest1_id` FROM `users` WHERE login = '$lastuser' LIMIT 1");
  $ugolde = mysql_fetch_array($ugoldes);

  if ($ugolde['quest1_id'] == "6"){
  #Выполняем задание
  mysql_query("UPDATE `users` SET `quest1_go`=`quest1_go`+'1' WHERE login='$lastuser'");
  }

  if ($ugolde['quest1_id'] == "7"){
  #Выполняем задание
  mysql_query("UPDATE `users` SET `quest1_go`=`quest1_go`+'1' WHERE login='$lastuser'");
  }

  if ($ugolde['quest1_id'] == "8"){
  #Выполняем задание
  mysql_query("UPDATE `users` SET `quest1_go`=`quest1_go`+'1' WHERE login='$lastuser'");
  }

  $urank = UserRankID($lastuser);


  if ($rand == 1){
  #Золотой ящик на 1000 кристаллов
  $message = "{:chatto-sgold$guvip==$urank=$lastuser=Поймал золотой ящик и получил 1 000 кристаллов. <br/>Поздравляем!:}";
  ask($message);

  mysql_query("UPDATE users SET `kry`=`kry`+'1000' WHERE `login`='$lastuser'");
  mysql_query("UPDATE `users` SET `golds`=`golds`+'1' WHERE `login`='$lastuser'");

  }
  elseif ($rand == 2){
  #Золотой ящик на 2000 опыта
  $message = "{:chatto-sgold$guvip=1=$urank=$lastuser=Поймал золотой ящик и получил 2 000 очков опыта. <br/>Поздравляем!:}";
  ask($message);

  mysql_query("UPDATE users SET `rang`=`rang`+'2000' WHERE `login`='$lastuser'");
  mysql_query("UPDATE `users` SET `golds`=`golds`+'1' WHERE `login`='$lastuser'");

  }
  elseif ($rand == 3){
  #Золотой ящик на 2000 кристаллов
  $message = "{:chatto-sgold$guvip=3=$urank=$lastuser=Поймал золотой ящик и получил 2 000 кристаллов. <br/>Поздравляем!:}";
  ask($message);

  mysql_query("UPDATE users SET `kry`=`kry`+'2000' WHERE `login`='$lastuser'");
  mysql_query("UPDATE `users` SET `golds`=`golds`+'1' WHERE `login`='$lastuser'");

  }
  elseif ($rand == 4){
  #Золотой ящик на 100 кристаллов
  $message = "{:chatto-sgold$guvip=2=$urank=$lastuser=Поймал золотой ящик и получил 100 кристаллов. <br/>Поздравляем!:}";
  ask($message);

  mysql_query("UPDATE users SET `kry`=`kry`+'100' WHERE `login`='$lastuser'");
  mysql_query("UPDATE `users` SET `golds`=`golds`+'1' WHERE `login`='$lastuser'");

  }
  elseif ($rand == 5){
  #Золотой ящик на 10 кристаллов
  $message = "{:chatto-sgold$guvip=5=$urank=$lastuser=Поймал золотой ящик и получил 10 кристаллов. <br/>Поздравляем!:}";
  ask($message);

  mysql_query("UPDATE users SET `kry`=`kry`+'10' WHERE `login`='$lastuser'");
  mysql_query("UPDATE `users` SET `golds`=`golds`+'1' WHERE `login`='$lastuser'");

  }

  elseif ($rand == 6){
  #Золотой ящик с x кри или x опытом
  $rand_prize = rand(1,2);
  if ($rand_prize == 1){
  #Кристаллы
  $RPrize = rand(100,8000);
  $iText = " :kry:";
  $iName = "kry";
  }else{
  #Опыт
  $RPrize = rand(50,500);
  $iText = " очков опыта";
  $iName = "rang";
  }
  $RPrize1 = number_format($RPrize, 0, ' ', ' ');

  $message = "{:chatto-sgold$guvip=4=$urank=$lastuser=Поймал золотой ящик и получил $RPrize1$iText <br/>Поздравляем!:}";
  ask($message);

  mysql_query("UPDATE users SET `$iName`=`$iName`+'$RPrize' WHERE `login`='$lastuser'");
  mysql_query("UPDATE `users` SET `golds`=`golds`+'1' WHERE `login`='$lastuser'");

  $dropped = true;
  }
}

function megagold(){
  global $login;
$rand = rand(1,100);

$info  = mysql_fetch_array(mysql_query("SELECT login FROM `chat` WHERE `login` <> 'sys' ORDER BY `id` DESC"));
$lastuser = $info['login'];

if (empty($info['login'])){
	$lastuser = $login;
}else{
	$lastuser = $info['login'];
}

$guvip1 = mysql_fetch_array(mysql_query("SELECT `vip` FROM `users` WHERE login='$lastuser' LIMIT 1"));
if ($guvip1['vip'] == "1"){$guvip = "V";}else{$guvip = "";}

$ugoldes  = mysql_query("SELECT `quest1_go`,`quest1_id` FROM `users` WHERE login='$lastuser' LIMIT 1");
$ugolde = mysql_fetch_array($ugoldes);

if ($ugolde['quest1_id'] == "6"){
#Выполняем задание
mysql_query("UPDATE `users` SET `quest1_go`=`quest1_go`+'1' WHERE login='$lastuser'");
}

if ($ugolde['quest1_id'] == "7"){
#Выполняем задание
mysql_query("UPDATE `users` SET `quest1_go`=`quest1_go`+'1' WHERE login='$lastuser'");
}

if ($ugolde['quest1_id'] == "8"){
#Выполняем задание
mysql_query("UPDATE `users` SET `quest1_go`=`quest1_go`+'1' WHERE login='$lastuser'");
}

$urank = UserRankID($lastuser);

if ($rand <= 95){
#Ультра-золотой ящик
$message = "{:chatto-sugold$guvip=02=$urank=$lastuser=Поймал ультра-голд и получил 5 000 кристаллов и 2 000 опыта <br/>Поздравляем!:}";
ask($message);


mysql_query("UPDATE users SET `kry`=`kry`+'5000',`rang`=`rang`+'2000' WHERE `login`='$lastuser'");
mysql_query("UPDATE `users` SET `golds`=`golds`+'1' WHERE `login`='$lastuser'");

}else{
#Элитный контейнер
$message = "{:chatto-sugold$guvip=777=$urank=$lastuser=Поймал ультра-голд и получил 1 Элитный контейнер <br/>Поздравляем!:}";
ask($message);

mysql_query("UPDATE users SET `k6`=`k6`+'1' WHERE `login`='$lastuser'");
mysql_query("UPDATE `users` SET `golds`=`golds`+'1' WHERE `login`='$lastuser'");


}

}

########################### Функция голда ###########################
########################### Генерация карты ###########################

function card($card_id,$cardby = "DanRotaru") {

if ($card_id == 1){$cardType = 1;}
if ($card_id == 2){$cardType = 2;}
if ($card_id == 3){$cardType = 3;}
if ($card_id == 4){$cardType = 4;}
$type = intval($cardType);

$chars = array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K',
'L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
$serial = '';
$max = count($chars)-1;
for($i=0;$i<16;$i++)
$serial .= (!($i % 4) && $i ? '-' : '').$chars[rand(0, $max)]; // Генерация серии
$cvv = rand(10,99). "-" .rand(100,999);
$until = strtotime("+7 days");

if ($cardType == 1){$price = 5000;$rang_price = rand(10,30);};
if ($cardType == 2){$price = 7000;$rang_price = rand(30,50);};
if ($cardType == 3){$price = 10000;$rang_price = rand(50,100);};
if ($cardType == 4){$price = 50000;$rang_price = rand(100,200);};
$prize = $price . ":" . $rang_price;

$cardNames = array(
	0 => '5 000 :kry:',
	1 => '7 000 :kry:',
	2 => '10 000 :kry:',
	3 => '50 000 :kry:'
);
$cardName = $cardNames[$type-1];
$date = date("d.m.y");
$hash = md5($serial." ".$cvv);

if ($cardby == "ChatBot"){$bby = "{:chatto-bot:}: ";}else{$bby = "";}
mysql_query("INSERT INTO `bonus` (`serial`,`cvv`,`id`,`until`,`prize`,`created`,`date`,`hash`) VALUES('$serial','$cvv',NULL,'$until','$prize','$cardby','$date','$hash')");
ask("$bby Карта {:chatto-yellow=$cardName:}. <a onclick=\"gocard('$hash')\">Активировать подарочную карту</a>");
}

########################### Генерация карты ###########################

########################### Текст системы ###########################
if (!function_exists('ask')) {
   function ask($text) {
	$text = mysql_real_escape_string($text);
	mysql_query("INSERT INTO `chat` (`login`,`text`,`group`,`id`, `date`, `time`, `ip`) VALUES('sys','$text','0',NULL,".date("d.m.y").",".date("H:i").",".$_SERVER['REMOTE_ADDR'].")");
}
}
if (!function_exists('botmsg')) {
function botmsg($text){
  $text = mysql_real_escape_string($text);
	mysql_query("INSERT INTO `chat` (`login`,`text`,`group`,`id`, `date`, `time`, `ip`) VALUES('ChatBot','$text','1',NULL,".date("d.m.y").",".date("H:i").",".$_SERVER['REMOTE_ADDR'].")");
}
}

if (!function_exists('sys')) {
   function sys($text) {
    global $date, $ip, $time;
	$text = mysql_real_escape_string($text);
	$text = "<div class=\"group-icon icon-system\" title=\"SYSTEM\"></div><font color=\"#00bcd4\">[SYSTEM]: </font>".$text;
	mysql_query("INSERT INTO `chat` (`login`,`text`,`group`,`id`, `date`, `time`, `ip`) VALUES('sys','$text','0',NULL,".date("d.m.y").",".date("H:i").",".$_SERVER['REMOTE_ADDR'].")");
}
}

if (!function_exists('addMsg')) {
  function addMsg($text, $callback=0, $del=0, $exit=0) {
    if($callback == 0 && $del == 0){
      echo('addMsg("'.$text.'");');
    }
    elseif($callback !== 0 && $del == 0){
      echo('addMsg("'.$text.'",'.$callback.');');
    }
    else{
      echo('addMsg("'.$text.'",'.$callback.','.$del.');');
    }
    if($exit !== 1){exit;}
}
}

if (!function_exists('UserRank')) {
function UserRank($ulogin){
  $info  = mysql_fetch_array(mysql_query("SELECT vip,rang_id FROM `users` WHERE login='$ulogin' LIMIT 1"));
  $his_rankID = $info['rang_id'];
  if ($info['vip'] == 1){
  return "<img onclick=\"profile('$ulogin')\" src=\"{rangV:$his_rankID}\">";	}
  else{
  return "<img onclick=\"profile('$ulogin')\" src=\"{rang:$his_rankID}\">";
  }
}
}

function invite(){
	$user_text = "Приглашай друзей по ссылке {ref:url} , при 10 зарегистрированных пользователей по этой ссылке вы получите 100 000 кристаллов.";
	ask($user_text);
}
function chatto(){
$r = rand(1,6);

if ($r == 1){
ask("{:chatto-surl-vk:}");
}elseif($r == 2){
botmsg("#appapk");
}elseif($r == 3){
ask("{:chatto-surl-help:}");
}elseif($r == 4){
ask("{:chatto-surl-ads:}");
}elseif($r == 5){
ask("{:chatto-surl-buy:}");
}elseif($r == 6){
botmsg("{:chatto-url-updates:}");
}

}
########################### Текст системы ###########################

########################### Вывод фонда ###########################
function getfond(){
$res = mysql_fetch_array(mysql_query("SELECT fond FROM `aconfigs` WHERE id='1' LIMIT 1"));
return (int) $res['fond'];
}
########################### Вывод фонда ###########################

########################### BB Коды ###########################
function bbcodeParser($bbcode){
/*
 *   bbCode Parser
 *   Author DanRotaru
 */

/*
Различные команды
* bold
* italics
* underline
* typewriter text
* strikethough
* images
* urls
* quotations
* code (pre)
* colour
* size
*/

/* Matching codes */
$urlmatch = "([a-zA-Z]+[:\/\/]+[A-Za-z0-9\-_]+\\.+[A-Za-z0-9\.\/%&=\?\-_]+)";

/* Replace "special character" with it's unicode equivilant */
#$match["special"]   = "/\?/s";
#$replace["special"] = '&#65533;';

/* Bold text */
$match["b"]   = "/\[b\](.*?)\[\/b\]/is";
$replace["b"] = "<b>$1</b>";

/* Italics */
$match["i"]   = "/\[i\](.*?)\[\/i\]/is";
$replace["i"] = "<i>$1</i>";

	 /* New line */
$match["n"]   = "/\[n\](.*?)\[\/n\]/is";
$replace["n"] = "<br/>";

/* HyperLinks */

$match["url"]   = "/\[url=(.*?)\](.*?)\[\/url\]/is";
$replace["url"] = "<a target=\"_BLANK\" href='$1'>$2</a>";

/* Underline */
$match["u"]   = "/\[u\](.*?)\[\/u\]/is";
$replace["u"] = "<span style=\"text-decoration: underline\">$1</span>";

/* Typewriter text */
$match["tt"]   = "/\[tt\](.*?)\[\/tt\]/is";
$replace["tt"] = "<span style=\"font-family:monospace;\">$1</span>";

$match["ttext"]   = "/\[ttext\](.*?)\[\/ttext\]/is";
$replace["ttext"] = "<span style=\"font-family:monospace;\">$1</span>";

/* Strikethrough text */
$match["s"]   = "/\[s\](.*?)\[\/s\]/is";
$replace["s"] = "<span style=\"text-decoration: line-through;\">$1</span>";


	/* Color (or Colour) */
#$match["color"]   = "/\[color=([a-zA-Z]+|#[a-fA-F0-9]{3}[a-fA-F0-9]{0,3})\](.*?)\[\/color\]/is";
#$replace["color"] = "<span style=\"color: $1\">$2</span>";

	/* Color (or Colour) */
$match["link"]   = "/\[link=(.*?)\](.*?)\[\/link\]/is";
$replace["link"] = "<a href=\"$1\" target=\"blank\">$2</a>";



#$match["colour"]   = "/\[colour=([a-zA-Z]+|#[a-fA-F0-9]{3}[a-fA-F0-9]{0,3})\](.*?)\[\/colour\]/is";
#$replace["colour"] = $replace["color"];

/* Size */
#$match["size"]   = "/\[size=([0-9]+(%|px|em)?)\](.*?)\[\/size\]/is";
#$replace["size"] = "<span style=\"font-size: $1;\">$3</span>";

/* User */
//$match["user"]   = "/\[user\](.*?)\[\/user\]/is";
//$replace["user"] = "<span style=\"color: yellow\">$1</span>";

$match["surl"]   = "/\[url\]" . $urlmatch . "\[\/url\]/is";
$replace["surl"] = "<a href=\"$1\">$1</a>";


/* Quotes
$match["quote"]   = "/\[quote\](.*?)\[\/quote\]/ism";
$replace["quote"] = "<div class=\"bbcode-quote\">?$1?</div>";

$match["quote"]   = "/\[quote=(.*?)\](.*?)\[\/quote\]/ism";
$replace["quote"] = "<blockquote>$1<small><cite>$2</cite></small></blockquote>";
*/
	// Images
#$bbcode = preg_replace('#\[img\](.+)\[\/img\]#iUs', '<img unselectable=\"on\" onselectstart=\"return false\" onmousedown=\"return false\" style=\"max-width:100px;\" src="$1" alt="Image" />', $bbcode);

	#$bbcode = preg_replace('#\[img_300\](.+)\[\/img_300\]#iUs', '<br/><img unselectable=\"on\" onselectstart=\"return false\" onmousedown=\"return false\" style=\"max-width:300px;\" src="$1" alt="Image" />', $bbcode);
	#$bbcode = preg_replace('#\[img_400\](.+)\[\/img_400\]#iUs', '<br/><img unselectable=\"on\" onselectstart=\"return false\" onmousedown=\"return false\" style=\"max-width:400px;\" src="$1" alt="Image" />', $bbcode);
#$bbcode = preg_replace('#\[img_500\](.+)\[\/img_500\]#iUs', '<br/><img unselectable=\"on\" onselectstart=\"return false\" onmousedown=\"return false\" style=\"max-width:500px;\" src="$1" alt="Image" />', $bbcode);
#$bbcode = preg_replace('#\[img_1000\](.+)\[\/img_1000\]#iUs', '<br/><img unselectable=\"on\" onselectstart=\"return false\" onmousedown=\"return false\" style=\"max-width:1000px;\" src="$1" alt="Image" />', $bbcode);

/* Parse */
$bbcode = preg_replace($match, $replace, $bbcode);


/* New line to <br> tag */
$bbcode = nl2br($bbcode);
/* Code blocks - Need to specially remove breaks */
function pre_special($matches)
{
$prep = preg_replace("/\<br \/\>/", "", $matches[1]);
return "<pre>$prep</pre>?";
}


/* Remove <br> tags before quotes and code blocks */
$bbcode = str_replace("?<br />", "", $bbcode);
#$bbcode = str_replace("?", "", $bbcode); //Clean up any special characters that got misplaced...
	//$bbcode = preg_replace("#(https?|ftp)://\S+[^\s.,>)\];'\"!?]#", '<a href="\\0" target="_blank">\\0</a>', $bbcode);

/* Return parsed contents */
return $bbcode;
}
########################### Текст системы ###########################

########################### Пользовательские функции ###########################
function UserExists($user){
$user = mysql_real_escape_string($user);
$res  = mysql_query("SELECT `id` FROM `users` WHERE `login`='$user'");
if (mysql_num_rows($res) == 0) {
return false;
} else {
return true;
}
}
function CheckUser(){
$login = $_SESSION['login'];
$rees  = mysql_fetch_array(mysql_query("SELECT `ban`,`chatban`,`chatbantime`,`vip`,`viptime` FROM users WHERE login='$login'"));

#Обновляем прем
if ((int) $rees['viptime'] < time()) {
mysql_query("UPDATE users SET vip='',viptime='' WHERE login='$login'");
}

#Если забанен то перенаправляем на страницу входа
if ($rees['ban'] != "") {
header("Locaton: /logout");
}
if ((int) $rees['chatban'] == 1 && (int) $rees['chatbantime'] > time()) {
return 'Banned';
}
elseif ((int) $rees['chatban'] == 1 && (int) $rees['chatbantime'] < time()) {
mysql_query("UPDATE users SET chatban='0',chatbantime='0' WHERE login = '$login'");
return '';
} else {
return '';
}
}


function InStr($haystack, $needle){
$pos = strpos($haystack, $needle);
if ($pos !== false) {
return $pos;
} else {
return -1;
}
}

function UserDelete($ulogin,$multi){
  if ($multi == 0){
  $uExist  = mysql_fetch_array(mysql_query("SELECT id FROM `users` WHERE login='$ulogin' LIMIT 1"));
  if (empty($uExist['id'])){exit("alert('Пользователь не найден!')");}

  # Удаление клана
  $UserClan = mysql_fetch_assoc(mysql_query("SELECT `id` FROM `clans` WHERE `created` = '$ulogin'"));
  if (!empty($UserClan['id'])) {
    $UserClanId = (int) $UserClan['id'];
    mysql_query("DELETE FROM `clans` WHERE `created` = '$ulogin'");
    mysql_query("DELETE FROM `clan_user` WHERE `clan_id` = '$UserClanId'");
  }
  # ==============

  mysql_query("UPDATE users SET kik='1' WHERE login='$ulogin'");
  mysql_query("DELETE FROM users WHERE login ='$ulogin'");
  mysql_query("DELETE FROM paints WHERE login ='$ulogin'");
  mysql_query("DELETE FROM garages WHERE login ='$ulogin'");
  mysql_query("DELETE FROM `friends` WHERE login1='$ulogin' OR login2='$ulogin'");
  mysql_query("DELETE FROM `friends_req` WHERE login='$ulogin' OR tologin='$ulogin'");
  mysql_query("DELETE FROM `gifts` WHERE login='$ulogin' OR tologin='$ulogin'");
  mysql_query("DELETE FROM `bonus` WHERE created='$ulogin'");
  mysql_query("DELETE FROM `clans` WHERE created='$ulogin'");
  mysql_query("DELETE FROM `chat` WHERE login='$ulogin'");
}

if ($multi == 2){
#Удаление мулти аккаунтов (больше одного), логины через запятую
$devide = explode(",",$ulogin);
$acc_n = count($devide);
$acc_t = "";
for ($i = 0;$i < $acc_n;$i++){
  # Удаление клана
  $UserClan = mysql_fetch_assoc(mysql_query("SELECT `id` FROM `clans` WHERE `created` = '".$devide[$i]."'"));
  if (!empty($UserClan['id'])) {
    $UserClanId = (int) $UserClan['id'];
    mysql_query("DELETE FROM `clans` WHERE `created` = '".$devide[$i]."'");
    mysql_query("DELETE FROM `clan_user` WHERE `clan_id` = '$UserClanId'");
  }
  # ==============

  mysql_query("UPDATE users SET `kik`='1' WHERE `login`='".$devide[$i]."'");
  mysql_query("DELETE FROM `users` WHERE `login`='".$devide[$i]."'");
  mysql_query("DELETE FROM `paints` WHERE `login`='".$devide[$i]."'");
  mysql_query("DELETE FROM `garages` WHERE `login`='".$devide[$i]."'");
  mysql_query("DELETE FROM `chat` WHERE `login`='".$devide[$i]."'");
  mysql_query("DELETE FROM `friends` WHERE `login1`='".$devide[$i]."' OR `login2`='".$devide[$i]."'");
  mysql_query("DELETE FROM `friends_req` WHERE `login`='".$devide[$i]."'' OR `tologin`='".$devide[$i]."'");
  mysql_query("DELETE FROM `gifts` WHERE `login`='".$devide[$i]."' OR `tologin`='".$devide[$i]."'");
  mysql_query("DELETE FROM `bonus` WHERE `created`='".$devide[$i]."'");

  $acc_t = $acc_t." ".$devide[$i];
}
	exit("alert('Пользователи были успешно удалены (".$acc_n.")<br/>Аккаунты: <b>$acc_t</b>')");

}
}




########################### Пользовательские функции ###########################


if (!function_exists('howmuch')) {
  function howmuch($ulogin, $update = 0){
    $ulogin      = mysql_real_escape_string(stripslashes(htmlspecialchars(trim($ulogin))));
    $info = mysql_fetch_array(mysql_query("SELECT `pri`,`pr3`,`vip` FROM `users` WHERE `login`='$ulogin' LIMIT 1"));
    if(!isset($info['vip'])) exit;

    #Гараж пользователя
    $garage = mysql_fetch_array(mysql_query("SELECT * FROM `garages` WHERE `login`='$ulogin' LIMIT 1"));

    #Сколько должен получать пользователь (default'ные значения) (кристаллов/опыта/ккойнов)
    $earn = [100, 5, 0];

    $turrets = mysql_query("SELECT DISTINCT `name1` FROM `chatto_turrets`");
    while($turret = mysql_fetch_array($turrets)){
        if(strpos($turret['name1'],"_xt") !== false && $garage[$turret['name1']] == 1) $earn[0] += 30;
        elseif(strpos($turret['name1'],"_lgc") !== false && $garage[$turret['name1']] == 1) $earn[0] += 40;
        elseif(strpos($turret['name1'],"_p") !== false && $garage[$turret['name1']] == 1) $earn[0] += 60;
        elseif(strpos($turret['name1'],"_dc") !== false && $garage[$turret['name1']] == 1) $earn[0] += 47;
        elseif(strpos($turret['name1'],"jgrT") !== false && $garage[$turret['name1']] == 1) $earn[0] += 150;
        elseif(strpos($turret['name1'],"_tc") !== false && $garage[$turret['name1']] == 1) $earn[0] += 46;
        elseif(strpos($turret['name1'],"_ut") !== false && $garage[$turret['name1']] == 1) $earn[0] += 120;

        if($garage[$turret['name1']] == 1 &&
        strpos($turret['name1'],"_ut") === false &&
        strpos($turret['name1'],"jgrT") === false &&
        strpos($turret['name1'],"_dc") === false &&
        strpos($turret['name1'],"_p") === false &&
        strpos($turret['name1'],"_tc") === false &&
        strpos($turret['name1'],"_lgc") === false &&
        strpos($turret['name1'],"_xt") === false) $earn[0] += 1;

        elseif($garage[$turret['name1']] == 2) $earn[0] += 2;
        elseif($garage[$turret['name1']] == 3) $earn[0] += 3;
    }
    $hulls = mysql_query("SELECT DISTINCT `name1` FROM `chatto_hulls`");
    while($hull = mysql_fetch_array($hulls)){
        if(strpos($hull['name1'],"_xt") !== false && $garage[$hull['name1']] == 1) $earn[0] += 30;
        elseif(strpos($hull['name1'],"_lgc") !== false && $garage[$hull['name1']] == 1) $earn[0] += 40;
        elseif(strpos($hull['name1'],"_p") !== false && $garage[$hull['name1']] == 1) $earn[0] += 60;
        elseif(strpos($hull['name1'],"_dc") !== false && $garage[$hull['name1']] == 1) $earn[0] += 47;
        elseif(strpos($hull['name1'],"jgrH") !== false && $garage[$hull['name1']] == 1) $earn[0] += 150;
        elseif(strpos($hull['name1'],"sonik") !== false && $garage[$hull['name1']] == 1) $earn[0] += 200;
        elseif(strpos($hull['name1'],"_tc") !== false && $garage[$hull['name1']] == 1) $earn[0] += 46;
        elseif(strpos($hull['name1'],"_ut") !== false && $garage[$hull['name1']] == 1) $earn[0] += 120;
        elseif(strpos($hull['name1'],"_n") !== false && $garage[$hull['name1']] == 1) $earn[0] += 120;

        if($garage[$hull['name1']] == 1 &&
        strpos($hull['name1'],"_ut") === false &&
        strpos($hull['name1'],"jgrH") === false &&
        strpos($hull['name1'],"sonik") === false &&
        strpos($hull['name1'],"_dc") === false &&
        strpos($hull['name1'],"_p") === false &&
        strpos($hull['name1'],"_tc") === false &&
        strpos($hull['name1'],"_lgc") === false &&
        strpos($hull['name1'],"_xt") === false &&
        strpos($hull['name1'],"_n") === false) $earn[0] += 1;

        elseif($garage[$hull['name1']] == 2) $earn[0] += 2;
        elseif($garage[$hull['name1']] == 3) $earn[0] += 3;
    }

    #Дополнительный опыт за дроны, иконки
    if ($info['pri'] == 2) $earn[1] += 1;
    elseif ($info['pri'] == 3) $earn[1] += 1;
    elseif ($info['pri'] == 4) $earn[1] += 1;
    elseif ($info['pri'] == 5) $earn[1] += 1;
    elseif ($info['pri'] == 6) $earn[1] += 4;
    elseif ($info['pri'] == 7) $earn[1] += 5;
    elseif ($info['pri'] == 8) $earn[1] += 5;
    elseif ($info['pri'] == 10) $earn[1] += 2;

    #Премиум аккаунт
    if ($info['vip'] == 1){
        $earn[0] += 100;
        $earn[1] += 5;
    }

    // #Ккоины
    $devider = 1000000;
    $mypaints = mysql_fetch_array(mysql_query("SELECT * FROM `paints` WHERE `login`='$ulogin' LIMIT 1"));
    $paints = mysql_query("SELECT `id`, `price`, `unic` FROM `chatto_paints`");

    while ($paint = mysql_fetch_array($paints)) {
      if ($mypaints['p'.$paint['id']] == 0) continue;

      if ($paint['unic'] == 0) $earn[2] += $paint['price'] / $devider;
      else if ($paint['unic'] == 1) $earn[2] += 2;
      else if ($paint['unic'] == 2) $earn[2] += 1;
      else continue;
    }

    #Обновляем пользователя или нет
    if($update == 1){
        #Дополнительный опыт или кристаллы за батарейки
        if ($info['pr3'] > 0){
            if (rand(1,2) == 1) $earn[0] += 10;
            else $earn[1] += 5;
            mysql_query("UPDATE `users` SET `pr3`=`pr3`-1 WHERE `login`='$ulogin'");
        }

        mysql_query("UPDATE `users` SET `kry` = `kry` + {$earn[0]}, `rang` = `rang` + {$earn[1]}, `paintcoin` = `paintcoin` + {$earn[2]} WHERE `login` = '$ulogin'");
    }

    return $earn[0].",".$earn[1].",".$earn[2];
  }
}

if (!function_exists('getNumEnding')) {
  function getNumEnding($number, $endingArray){
    $number = $number % 100;if ($number>=11 && $number<=19) {$ending=$endingArray[2];}else {$i = $number % 10;switch ($i){case (1): $ending = $endingArray[0]; break;case (2):case (3):case (4): $ending = $endingArray[1]; break;default: $ending=$endingArray[2];}}
    return $ending;
  }
}

if (!function_exists('remaining')) {
  function remaining($timer){
      $return = "";
      $rem = (time()+$timer)-time();
      $day = floor($rem / 86400);$dayt = getNumEnding($day, ['день', 'дня', 'дней']);
      $hr  = floor(($rem % 86400) / 3600);$hrt = getNumEnding($hr, ['час', 'часа', 'часов']);
      $min = floor(($rem % 3600) / 60);$mint = getNumEnding($min, ['минута', 'минуты', 'минут']);
      $sec = ($rem % 60); $sect = getNumEnding($sec, ['секунды', 'секунд', 'секунд']);
      if($day) $return = "$day ".$dayt;
      if($hr) $return = $return." $hr ".$hrt;
      if($min) $return = $return." $min ".$mint;
      if($sec) $return = $return." $sec ".$sect;

      return $return;
  }
}

if (!function_exists('isEmoji')) {
  function isEmoji($text){
    $CHATTO_smiles = [
      ":)&smile1.png",
      ";)&smile2.png",
      ":(&smile3.png",
      "=|&smile4.png",
      ":|&smile4.png",
      ":P:&smile5.png",
      "=/&smile6.png",
      ":O_o&smile7.png",
      ":o_O&smile7.png",
      "/__/&smile8.png",
      "/___/&smile9.png",
      ":00:&05.gif",
      ":01:&02.gif",
      ":02:&03.gif",
      ":03:&04.gif",
      ":04:&01.png",
      ":05:&08.png",
      ":06:&10.png",
      ":like:&05.png",
      ":dislike:&06.png",
      ":power:&power.png",
      ":hey:&07.png",
      ":lol:&09.png",
      ":love:&heart.png",
      ":flower:&flower.png",
      ":facepalm:&facepalm.png",
      ":happy:&happy.png",
      ":xD:&lol1.png",
      ":xd:&lol1.png",
      ":mm:&mm.png",
      ":bravo:&11.png",
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
      ":good:&good.png",
      ":mobile:&mob1.png",
      ":100:&100.png",
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
      ":think:&think.png"
    ];

    for($i = 0; $i < count($CHATTO_smiles); $i++){
      $j = explode("&", $CHATTO_smiles[$i]);
      if(strpos($text, $j[0]) !== false) return true;
    }
    return false;
  }
}