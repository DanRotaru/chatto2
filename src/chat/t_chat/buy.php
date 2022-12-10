<?php
####################################################
# @author 	DanRotaru
# @info    	Покупка гаража
####################################################

# Подключаем файл с настройками

include_once($_SERVER['DOCUMENT_ROOT']."/src/config.php");

# Что за что отвечает
# $tab == 1 => пушки
# $tab == 2 => корпуса
# $tab == 3 => краски
$tab = $_POST['tab'];

# ИД предмета
$name       = mysql_real_escape_string(stripslashes(htmlspecialchars(trim($_POST['id']))));
if (empty($name) || empty($tab)) {exit;}

#Логин с званием
$mylogin = ModernUser($login);


if ($tab == 1) {
  #Пушки

  #Проверяем если предмет имеется (по имени)
  $n = mysql_fetch_array(mysql_query("SELECT id FROM `chatto_turrets` WHERE `name1`='$name' LIMIT 1"));
  if (empty($n['id'])){exit();}


  #Скидка 50%
  $sale = 0;
  $sale = mysql_fetch_array(mysql_query("SELECT `turrets_sale` FROM `aconfigs` WHERE `id`='1' LIMIT 1"));
  $sale = $sale['turrets_sale'];

  $MOD = mysql_fetch_array(mysql_query("SELECT `$name` FROM `garages` WHERE `login`='$login' LIMIT 1"));
  $m = $MOD[$name];
  $m = $m + 1;
  $mi = " м$m";

  #Уникальные предметы
  if (stripos($name, "_xt") !== false) {
      $m = 4;
      $mi = " XT";
      $uniq = 1;
  }elseif (stripos($name, "_lgc") !== false) {
      $m = 5;
      $mi = " LC";
      $uniq = 1;
  }elseif (stripos($name, "_lc") !== false) {
      $m = 5;
      $mi = " LC";
      $uniq = 1;
  }elseif (stripos($name, "_pr") !== false) {
      $m = 6;
      $mi = " PR";
      $uniq = 1;
  }elseif (stripos($name, "_p") !== false) {
      $m = 6;
      $mi = " PR";
      $uniq = 1;
  }elseif (stripos($name, "_dc") !== false) {
      $m = 7;
      $mi = " DC";
      $uniq = 1;
  }elseif (stripos($name, "_tc") !== false) {
      $m = 8;
      $mi = " TC";
      $uniq = 1;
  }elseif (stripos($name, "_tc") !== false) {
      $m = 8;
      $mi = " TC";
      $uniq = 1;
  }elseif (stripos($name, "_ut") !== false) {
      $m = 10;
      $mi = " UT";
      $uniq = 1;
  }elseif (stripos($name, "jgr") !== false) {
      $m = 9;
      $mi = "";
      $uniq = 1;
  }else{
    $uniq = 0;
  }

  if($m == 9){exit;}

  #Если предмет куплен
  if($uniq == 0){
    if($MOD[$name] == 3){
      echo "2";
      exit;
    }
    $ma = $m;
  }else{
    if($MOD[$name] == 1){
      echo "2";
      exit;
    }
    $ma = 1;
  }


  #О предмете
  $about = mysql_fetch_array(mysql_query("SELECT `name`,`image`,`price` FROM `chatto_turrets` WHERE `name1`='$name' AND `type`='$m' LIMIT 1"));
  $price = $about['price'];
  $name0 = $about['name'];
  $img = $about['image'];
  $img = "<img src=\"$img\"/><br/><br/>";

  #Вычитываем скидку
  if ($sale == 1 && $uniq !== 1){
  	$price = $price / 2;
  }

  #Если не хватает кристаллов
  if($price > $alls['kry']){
    echo "3";
    exit;
  }

  #Обновляем данные
  mysql_query("UPDATE `garages` SET `$name`='$ma' WHERE login='$login'");
  mysql_query("UPDATE `users` SET `kry`=`kry`-'$price' WHERE login='$login'");

  #Пишем в чат
  ask("Пользователь $mylogin купил {:chatto-yellow=$name0$mi:}. Поздравляем!");
  echo("$img Вы успешно купили $name0$mi.");
  exit;

}

elseif ($tab == 2) {
  if ($name == 'ares_n' && $alls['group'] != 3) exit;
  #Корпуса

  #Проверяем если предмет имеется (по имени)
  $n = mysql_fetch_array(mysql_query("SELECT id FROM `chatto_hulls` WHERE `name1`='$name' LIMIT 1"));
  if (empty($n['id'])){exit();}


  #Скидка 50%
  $sale = 0;
  $sale = mysql_fetch_array(mysql_query("SELECT `hulls_sale` FROM `aconfigs` WHERE `id`='1' LIMIT 1"));
  $sale = $sale['hulls_sale'];

  $MOD = mysql_fetch_array(mysql_query("SELECT `$name` FROM `garages` WHERE `login`='$login' LIMIT 1"));
  $m = $MOD[$name];
  $m = $m + 1;
  $mi = " м$m";

  #Уникальные предметы
  if (stripos($name, "_xt") !== false) {
      $m = 4;
      $mi = " XT";
      $uniq = 1;
  }elseif (stripos($name, "_lgc") !== false) {
      $m = 5;
      $mi = " LC";
      $uniq = 1;
  }elseif (stripos($name, "_lc") !== false) {
      $m = 5;
      $mi = " LC";
      $uniq = 1;
  }elseif (stripos($name, "_pr") !== false) {
      $m = 6;
      $mi = " PR";
      $uniq = 1;
  }elseif (stripos($name, "_p") !== false) {
      $m = 6;
      $mi = " PR";
      $uniq = 1;
  }elseif (stripos($name, "_dc") !== false) {
      $m = 7;
      $mi = " DC";
      $uniq = 1;
  }elseif (stripos($name, "_tc") !== false) {
      $m = 8;
      $mi = " TC";
      $uniq = 1;
  }elseif (stripos($name, "_ut") !== false) {
      $m = 10;
      $mi = " UT";
      $uniq = 1;
  }elseif (stripos($name, "jgr") !== false) {
      $m = 9;
      $mi = "";
      $uniq = 1;
  }elseif (stripos($name, "jgr") !== false) {
      $m = 11;
      $mi = "";
      $uniq = 1;
  }else{
    $uniq = 0;
  }

  if($m == 9){exit;}


  #Если предмет куплен
  if($uniq == 0){
    if($MOD[$name] == 3){
      echo "2";
      exit;
    }
    $ma = $m;
  }else{
    if($MOD[$name] == 1){
      echo "2";
      exit;
    }
    $ma = 1;
  }


  #О предмете
  $about = mysql_fetch_array(mysql_query("SELECT `name`,`image`,`price` FROM `chatto_hulls` WHERE `name1`='$name' AND `type`='$m' LIMIT 1"));
  $price = $about['price'];
  $name0 = $about['name'];
  $img = $about['image'];
  $img = "<img src=\"$img\"/><br/><br/>";

  #Вычитываем скидку
  if ($sale == 1 && $uniq !== 1){
  	$price = $price / 2;
  }

  #Если не хватает кристаллов
  if($price > $alls['kry']){
    echo "3";
    exit;
  }

  #Обновляем данные
  mysql_query("UPDATE `garages` SET `$name`='$ma' WHERE login='$login'");
  mysql_query("UPDATE `users` SET `kry`=`kry`-'$price' WHERE login='$login'");

  #Пишем в чат
  ask("Пользователь $mylogin купил {:chatto-yellow=$name0$mi:}. Поздравляем!");
  echo("$img Вы успешно купили $name0$mi.");
  exit;

}

elseif ($tab == 3) {
  #Краски

  #Проверяем если предмет имеется (по имени)
  $n = mysql_num_rows(mysql_query("SELECT id FROM `chatto_paints`"));
  if ($name < 1 || $name > $n){exit();}


  #Скидка 50%
  $sale = 0;
  $sale = mysql_fetch_array(mysql_query("SELECT `paints_sale` FROM `aconfigs` WHERE `id`='1' LIMIT 1"));
  $sale = $sale['paints_sale'];

  $MOD = mysql_fetch_array(mysql_query("SELECT `$name` FROM `paints` WHERE `login`='$login' LIMIT 1"));
  $m = $MOD[$name];
  $m = $m + 1;
  $mi = " м$m";

  $have = mysql_fetch_array(mysql_query("SELECT `p$id` FROM `paints` WHERE login='$login' LIMIT 1"));
  if ($have["p$id"] == 1){
  	echo "2";
  	exit;
  }

  #О предмете
  $paint = mysql_fetch_array(mysql_query("SELECT `name`,`price`,`image`,`unic` FROM `chatto_paints` WHERE `id`='$name'"));
  $pID = "p$name";
  $name = $paint['name'];
  $price = $paint['price'];
  $unic = $paint['unic'];
  $img = $paint['image'];
  $img = "<img src=\"$img\"/><br/><br/>";

  #Если краска уникальная или с магазина
  if ($unic == "1" || $unic == "2"){
  	exit;
  }

  #Скидки на краски
  if ($sale == 1){
  	if ($unic !== "1" || $unic !== "2"){
  		$price = $price / 2;
  	}
  }

  #Если не хватает кристаллов
  if($price > $alls['kry']){
    echo "3";
    exit;
  }

  #Обновляем данные
  mysql_query("UPDATE `paints` SET `$pID`='1' WHERE login='$login'");
  mysql_query("UPDATE `users` SET `kry`=`kry`-'$price' WHERE login='$login'");

  #Пишем в чат
  ask("Пользователь $mylogin купил краску {:chatto-yellow=$name:}. Поздравляем!");
  echo("[1] $img Вы успешно купили краску $name.");
  exit;
}
