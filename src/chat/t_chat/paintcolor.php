<?php
include_once($_SERVER['DOCUMENT_ROOT']."/src/config.php");

$paints_len = mysql_num_rows(mysql_query("SELECT `id` FROM `chatto_paints`"));
$login = "test";
function PaintEarning($id){
    $a = mysql_fetch_array(mysql_query("SELECT `price`,`unic` FROM `chatto_paints` WHERE `id`='$id' LIMIT 1"));
    $devider = 1000000;
    if($a['unic'] == 0) $r = $a['price'] / $devider;
    else if($a['unic'] == 1) $r = 2;
    else if($a['unic'] == 2) $r = 1;
    else $r = 0;
    return $r;
}

// echo PaintEarning($_GET['a']);
// exit;

$earn = 0;

for($i = 0; $i <= $paints_len; $i++){
    $paint = mysql_fetch_array(mysql_query("SELECT `p$i` FROM `paints` WHERE `login`='$login' LIMIT 1"));
    if($paint["p".$i] == 1) $earn += PaintEarning($i);
}

echo("User $login earns $earn coins!");
exit;
mysql_query("UPDATE `users` SET `paintcoin`=`paintcoin`+'$earn' WHERE `login`='$login'");
