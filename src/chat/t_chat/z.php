<?php
include_once($_SERVER['DOCUMENT_ROOT']."/src/config.php");


$earned = 0;
$b = mysql_query("SELECT `rub` FROM `payments` WHERE `date` REGEXP '^\[0-9]+\.".date("m")."\.".date("Y")."'");
while($a = mysql_fetch_array($b)) $earned += $a['rub'];
echo "Заработано за этот месяц: ".$earned;
unset($earned);