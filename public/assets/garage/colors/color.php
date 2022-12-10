<?php
include_once($_SERVER['DOCUMENT_ROOT']."/src/config.php");

header ('Content-type: image/png');
$url = "https://ru.tankiwiki.com/data/paints/garage/Red_texture.jpg";

$garage = mysql_fetch_array(mysql_query("SELECT `Paint` FROM garages WHERE login='$login' LIMIT 1"));
$installedP = $garage['Paint'];

#Определяем краску
$paints = mysql_fetch_array(mysql_query("SELECT `imageV` FROM `chatto_paints` WHERE id='$installedP' LIMIT 1"));
$color = $paints['imageV'];

if($color[0] !== "h"){
	$color = str_replace("../../","",$color);
	$color = $_SERVER['REQUEST_SCHEME']."://".$_SERVER['HTTP_HOST']."/".$color;	
}

echo file_get_contents($color);
exit;