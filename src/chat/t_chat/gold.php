<?php
####################################################
# @author 	DanRotaru
# @info	Функции чата
####################################################
include_once("../../src/config.php");
#Прочие настройки
$date = date("d.m.y");
$time = date("H:i");
$Ddate = date("H:i - d.m.y");
$ip = $_SERVER['REMOTE_ADDR'];

function gold(){
$rand = rand(1,6);

$info  = mysql_fetch_array(mysql_query("SELECT login FROM `chat` WHERE `login` <> 'sys' ORDER BY `id` DESC"));
$lastuser = $info['login'];


$ugoldes  = mysql_query("SELECT `quest1_go` FROM `users` WHERE login = '$lastuser' LIMIT 1");
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

$urank = UserRank($lastuser);


if ($rand == 1){
#Золотой ящик на 1000 кристаллов
$gold = "<div class=\"gold\"></div>";

$message = "Пользователь $urank<span style=\"color:orange\">$lastuser</span> поймал золотой ящик и получил <b><span style=\"color:yellow\">1000</span></b>:kry: <br/>$gold";
ask($message);

mysql_query("UPDATE users SET `kry`=`kry`+'1000' WHERE `login`='$lastuser'");
mysql_query("UPDATE `users` SET `golds`=`golds`+'1' WHERE `login`='$lastuser'");

}
elseif ($rand == 2){
#Золотой ящик на 2000 опыта
$gold = "<div class=\"gold1\"></div>";

$message = "Пользователь $urank<span style=\"color:orange\">$lastuser</span> поймал золотой ящик и получил <b><span style=\"color:yellow\">2000</span></b> очков опыта <br/>$gold";
ask($message);

mysql_query("UPDATE users SET `rang`=`rang`+'2000' WHERE `login`='$lastuser'");
mysql_query("UPDATE `users` SET `golds`=`golds`+'1' WHERE `login`='$lastuser'");

}
elseif ($rand == 3){
#Золотой ящик на 2000 кристаллов
$gold = "<div class=\"gold3\"></div>";

$message = "Пользователь $urank<span style=\"color:orange\">$lastuser</span> поймал золотой ящик и получил <b><span style=\"color:yellow\">2000</span></b>:kry: <br/>$gold";
ask($message);

mysql_query("UPDATE users SET `kry`=`kry`+'2000' WHERE `login`='$lastuser'");
mysql_query("UPDATE `users` SET `golds`=`golds`+'1' WHERE `login`='$lastuser'");

}
elseif ($rand == 4){
#Золотой ящик на 100 кристаллов
$gold = "<div class=\"gold2\"></div>";

$message = "Пользователь $urank<span style=\"color:orange\">$lastuser</span> поймал золотой ящик и получил <b><span style=\"color:yellow\">100</span></b>:kry: <br/>$gold";
ask($message);

mysql_query("UPDATE users SET `kry`=`kry`+'100' WHERE `login`='$lastuser'");
mysql_query("UPDATE `users` SET `golds`=`golds`+'1' WHERE `login`='$lastuser'");

}
elseif ($rand == 5){
#Золотой ящик на 10 кристаллов
$gold = "<div class=\"gold5\"></div>";

$message = "Пользователь $urank<span style=\"color:orange\">$lastuser</span> поймал золотой ящик и получил <b><span style=\"color:yellow\">10</span></b>:kry: <br/>$gold";
ask($message);

mysql_query("UPDATE users SET `kry`=`kry`+'10' WHERE `login`='$lastuser'");
mysql_query("UPDATE `users` SET `golds`=`golds`+'1' WHERE `login`='$lastuser'");

}

elseif ($rand == 6){
#Золотой ящик с x кри или x опытом
$gold = "<div class=\"gold4\"></div>";

$rand_prize = rand(1,2);
if ($rand_prize == 1){
#Кристаллы
$RPrize = rand(100,8000);
$iText = " :kry:";
$iName = "kry";
}else{
#Опыт
$RPrize = rand(50,1000);
$iText = " очков опыта";
$iName = "rang";
}
$RPrize1 = number_format($RPrize, 0, ' ', ' ');

$message = "Пользователь $urank<span style=\"color:orange\">$lastuser</span> поймал золотой ящик и получил <b><span style=\"color:yellow\">$RPrize1$iText</span></b> <br/>$gold";
ask($message);

mysql_query("UPDATE users SET `$iName`=`$iName`+'$RPrize' WHERE `login`='$lastuser'");
mysql_query("UPDATE `users` SET `golds`=`golds`+'1' WHERE `login`='$lastuser'");

}
}

gold();

function ask($text) {
	$text = mysql_real_escape_string($text);
	mysql_query("INSERT INTO `chat` (`login`,`text`,`group`,`id`, `date`, `time`, `ip`) VALUES('sys','$text','0',NULL,'$date', '$time','$ip')");
}

function UserRank($ulogin){
  $info  = mysql_fetch_array(mysql_query("SELECT vip,rang_id FROM `users` WHERE login='$ulogin' LIMIT 1"));
  $his_rankID = $info['rang_id'];
  if ($info['vip'] == 1){
  return "<img onclick=\"profile('$ulogin')\" src=\"{rangV:$his_rankID}\">";	}
  else{
  return "<img onclick=\"profile('$ulogin')\" src=\"{rang:$his_rankID}\">";
  }
}