<?php
include_once($_SERVER['DOCUMENT_ROOT']."/src/config.php");


if ($alls['group'] == "3" || $alls['group'] == "2" || $alls['login'] == "INTRICATION") {
	if($_GET['all'] == "1"){
        $id = (int)$_GET['id'];

        mysql_query("DELETE FROM `chat`");
        mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','all')");

        ask("Чат очищен !");
        ask("{:chatto-surl-vk:}");
        ask("{:chatto-surl-rules:}");
        ask("{:chatto-surl-help:}");
        ask("{:chatto-surl-shop:}");
        ask("{:chatto-surl-buy:}");
	
    }else{
        $id = (int)$_GET['id'];
        mysql_query("DELETE FROM `chat` WHERE `id` = '$id'");
        mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','$id')");
    }

}
?>