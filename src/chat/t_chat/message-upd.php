<?php
####################################################
# @author 	DanRotaru
# @info    	
####################################################

# Подключаем файл с настройками
include($_SERVER['DOCUMENT_ROOT']."/src/config.php");

if($alls['group'] !== "3"){exit();}
$msg       = mysql_real_escape_string(stripslashes(htmlspecialchars(trim($_POST['msg']))));

$lastmsg1 = mysql_fetch_array(mysql_query("SELECT `text`,`id` FROM `chat` WHERE `login`='$login' ORDER BY `id` DESC"));
$lastmsg = $lastmsg1['text'];
$id = $lastmsg1['id'];

mysql_query("UPDATE `chat` SET `text`='$msg' WHERE `id`='$id'");

$text = $id."||".$msg;
mysql_query("INSERT INTO `chat` (`text`, `group`) VALUES ('$text', '10')");