<?php
####################################################
# @author 	DanRotaru
# @info    	Функции гаража
####################################################
//$_GET['hidesource'] = 1;
include_once($_SERVER['DOCUMENT_ROOT']."/src/config.php");

####################################################################
if(!function_exists("itemInstalled")){
  function itemInstalled($t=1){
    #$t ==> tab (turrets,hulls)
    if ($t == 1) {
      $ss = "Turret";
    }elseif ($t == 2) {
      $ss = "Hull";
    }elseif ($t == 3) {
      $ss = "Paint";
    }

    global $login;

    $e = mysql_fetch_array(mysql_query("SELECT `$ss` FROM `garages` WHERE `login`='$login' LIMIT 1"));
    return $e[$ss];
  }
}
####################################################################

#Функция получение предмета (пушки, корпуса) (BOTTOM GARAGE)
if (!function_exists('infoBottom')) {
function infoBottom($name, $z=0){
	# $tab == 1 => $items
	# $tab == 2 => $hulls
    global $login, $tab;

    if($tab == 1){
      $tab0 = "turrets";
    }elseif ($tab == 2) {
      $tab0 = "hulls";
    }else{exit;}
    $sales = $tab0."_sale";
	
	$ss = "";

    #Скидка 50%
	$sale = 0;
    $sale = mysql_fetch_array(mysql_query("SELECT `$sales` FROM `aconfigs` LIMIT 1"));
    $sale = $sale[$sales];
    if ($sale == 1){$is_sale = "<div style=\"background: url(../assets/img/sale50.png);width: 69px;height: 43px;position: absolute;top:80px;right:0px;\"></div>";}else{$is_sale = "";}
    $noIMG = ' oncontextmenu="return false" ondragstart="return false"';


    $m = mysql_fetch_array(mysql_query("SELECT `$name` FROM `garages` WHERE `login`='$login' LIMIT 1"));
    $m = $m[$name];

	$install = itemInstalled($tab);

	if($install == $name){
		$Installed = " dressed";
	}
	
	if($z == 1 && $m == 1){

    if (stripos($name, "_xt") !== false) {
        $m = 4;
    }elseif (stripos($name, "_lgc") !== false) {
        $m = 5;
    }elseif (stripos($name, "_lc") !== false) {
        $m = 5;
    }elseif (stripos($name, "_pr") !== false) {
        $m = 6;
    }elseif (stripos($name, "_p") !== false) {
        $m = 6;
    }elseif (stripos($name, "_dc") !== false) {
        $m = 7;
    }elseif (stripos($name, "_tc") !== false) {
        $m = 8;
    }elseif (stripos($name, "_ut") !== false) {
        $m = 10;
    }elseif (stripos($name, "jgr") !== false) {
        $m = 9;
    }
	  $a = mysql_fetch_array(mysql_query("SELECT `name`,`type`,`image` FROM `chatto_$tab0` WHERE `name1`='$name' AND `type`='$m' LIMIT 1"));
	
	
    if($m > 3){
      $mod = "";
      $right = "";
    }else{
      $mod = " М".$m;
      $right = '<div class="textr"><img src="../assets/img/garage/item-m'.$m.'.png"></div>';
      $right = '<img src="../assets/img/garage/item-m'.$m.'.png">';
    }
	if($a['type'] == 4){$n1 = " XT";}
	elseif($a['type'] == 5){$n1 = " LC";}
	elseif($a['type'] == 6){$n1 = " PR";}
	elseif($a['type'] == 7){$n1 = " DC";}
	elseif($a['type'] == 8){$n1 = " TC";}
	elseif($a['type'] == 10){$n1 = " UT";}
	elseif($a['type'] == 9 || $a['type'] == 11){$n1 = "";}
	else{$n1 = "";}
	$names = $a['name'].$n1.$mod;

  if($a['type'] > 3){
    $is_sale = "";
  }

    $e = '
	<div class="item is-active'.$Installed.'" onclick=\'CHATTO_GARAGE.bottom.info("'.$name.'",'.$tab.')\' garage-item-id="'.$name.'" ondblclick=\'CHATTO_GARAGE.viewer.install("'.$name.'",1)\'>
    <div class="item-m">'.$is_sale.'
    <div class="textl">'.$names.'</div>'.$right.'
    <img '.$ss.' src="'.$a['image'].'" class="itemimg"'.$noIMG.'>
    </div>
    </div>
	';
	
	$e = "{:cGR== is-active$Installed==$name=='$name',$tab==$names==$right==".$a['image']."==$is_sale:} ";
	
	}elseif($z == 0){

	  $a = mysql_fetch_array(mysql_query("SELECT `name`,`type`,`image` FROM `chatto_$tab0` WHERE `name1`='$name' AND `type`='$m' LIMIT 1"));
      $mod = ' М'.$m;
      $right = '<img src="../assets/img/garage/item-m'.$m.'.png">';
		
	if($a['type'] == 4){$n1 = " XT";}
	elseif($a['type'] == 5){$n1 = " LC";}
	elseif($a['type'] == 6){$n1 = " PR";}
	elseif($a['type'] == 7){$n1 = " DC";}
	elseif($a['type'] == 8){$n1 = " TC";}
	elseif($a['type'] == 10){$n1 = " UT";}
	elseif($a['type'] == 9 || $a['type'] == 11){$n1 = "";}
	else{$n1 = "";}
	$names = $a['name'].$n1.$mod;
    
  if($a['type'] > 3){
    $is_sale = "";
  }

		if($a['name'] == "Васп"){
			$ss = 'style="margin: 2px;"';
		}

    $e = '
	<div class="item is-active'.$Installed.'" onclick=\'CHATTO_GARAGE.bottom.info("'.$name.'",'.$tab.')\' garage-item-id="'.$name.'" ondblclick=\'CHATTO_GARAGE.viewer.install("'.$name.'",1)\'>
    <div class="item-m">'.$is_sale.'
    <div class="textl">'.$a['name'].$mod.'</div>'.$right.'
    <img '.$ss.' src="'.$a['image'].'" class="itemimg"'.$noIMG.'>
    </div>
    </div>
	';
	
	$e = "{:cGR== is-active$Installed==$name=='$name',$tab==$names==$right==".$a['image']."==$is_sale:} ";
	
	}
	echo $e;
}
}

####################################################################

if (!function_exists('infoBottom1')) {
function infoBottom1($name, $z=0){
	# $tab == 1 => $items
	# $tab == 2 => $hulls
    global $login, $tab;

    if($tab == 1){
      $tab0 = "turrets";
    }elseif ($tab == 2) {
      $tab0 = "hulls";
    }else{exit;}
    $sales = $tab0."_sale";
	
	$ss = "";

    #Скидка 50%
	$sale = 0;
    $sale = mysql_fetch_array(mysql_query("SELECT `$sales` FROM `aconfigs` LIMIT 1"));
    $sale = $sale[$sales];
    if ($sale == 1){$is_sale = "<div style=\"background: url(../assets/img/sale50.png);width: 69px;height: 43px;position: absolute;top:80px;right:0px;\"></div>";}else{$is_sale = "";}
    


    $m = mysql_fetch_array(mysql_query("SELECT `$name` FROM `garages` WHERE `login`='$login' LIMIT 1"));
    $m = $m[$name];
    $m01 = $m;
	
	$install = itemInstalled($tab);

	if($install == $name){
		$Installed = " dressed";
	}

	
	if (stripos($name, "jgr") !== false) {
        if($m !== 1){$m = 9;}
  }
  
	
	if($z == 1 && $m == 0){

    if (stripos($name, "_xt") !== false) {
        $m = 4;
    }elseif (stripos($name, "_lgc") !== false) {
        $m = 5;
    }elseif (stripos($name, "_lc") !== false) {
        $m = 5;
    }elseif (stripos($name, "_pr") !== false) {
        $m = 6;
    }elseif (stripos($name, "_p") !== false) {
        $m = 6;
    }elseif (stripos($name, "_dc") !== false) {
        $m = 7;
    }elseif (stripos($name, "_tc") !== false) {
        $m = 8;
    }elseif (stripos($name, "_ut") !== false) {
        $m = 10;
    }elseif (stripos($name, "jgr") !== false) {
        $m = 9;
    }elseif (stripos($name, "sonik") !== false) {
      $m = 9;
  }
	  $a = mysql_fetch_array(mysql_query("SELECT `name`,`type`,`image`,`price`,`name1` FROM `chatto_$tab0` WHERE `name1`='$name' AND `type`='$m' LIMIT 1"));
	  $price = number_format($a['price'], 0, ' ', ' ');
	  $name = $a['name1'];
	  
	  
	if($a['type'] == 4){$n1 = " XT";}
	elseif($a['type'] == 5){$n1 = " LC";}
	elseif($a['type'] == 6){$n1 = " PR";}
	elseif($a['type'] == 7){$n1 = " DC";}
	elseif($a['type'] == 8){$n1 = " TC";}
	elseif($a['type'] == 10){$n1 = " UT";}
	elseif($a['type'] == 9){$n1 = "";}
	else{$n1 = "";}
  $names = $a['name'].$n1;
  
  if($a['type'] > 3){
    $is_sale = "";
  }
		

	  
    if($m > 3){
      $mod = "";
      $right = "";
    }else{
      $mod = " М".$m;
      $right = '<div class="textr"><img src="../assets/img/garage/item-m'.$m.'.png"></div>';
    }
	
	if($m0 !== 1){
		$right = $price.' <cry/>';
	}

		if($a['name'] == "Васп"){
			$ss = 'style="margin: 2px;"';
		}

    
	$e = "{:cGR==$Installed==$name=='$name',$tab==$names==$right==".$a['image']."==$is_sale:} ";
	echo $e;
	
	
	}
}
}

####################################################################

if(!function_exists("itemPrice")){
  function itemPrice($name,$type=0,$t=1){
    #$t ==> tab (turrets,hulls)
    if ($t == 1) {
      $ss = "turrets";
    }elseif ($t == 2) {
      $ss = "hulls";
    }

    $sales = $ss."_sale";
    

    if($type == "a" || $type == 3 || $type == 2 || $type == 1){
  	  if($type == "a"){$type = 0;}
      $e = mysql_fetch_array(mysql_query("SELECT `price` FROM `chatto_$ss` WHERE `name1`='$name' AND `type`='$type' LIMIT 1"));
    }else{
      $e = mysql_fetch_array(mysql_query("SELECT `price` FROM `chatto_$ss` WHERE `name1`='$name' LIMIT 1"));
    }
    if($e['price'] == 0){$price = "0";}
    else{
      $price = number_format($e['price'], 0, ' ', ' ');
    }

    return $price;
  }
}

####################################################################

if(!function_exists("itemInfo")){
function itemInfo($id,$t=1,$ids=0){
	global $login, $alls;
  #$t ==> tab (turrets,hulls)
  if ($t == 1) {
    $ss = "turrets";
  }elseif ($t == 2) {
    $ss = "hulls";
  }else{
	  $ss = "";
  }

  $sales = $ss."_sale";
  #Скидка 50%
$echo = '';
$xt = 0;

$M = mysql_fetch_array(mysql_query("SELECT `$id` FROM `garages` WHERE `login`='$login' LIMIT 1"));
$M = $M[$id];

$M0 = $M + 1;

if (stripos($id, "_xt") !== false) {
        $as = 1;
    }elseif (stripos($id, "_lgc") !== false) {
        $as = 1;
    }elseif (stripos($id, "_lc") !== false) {
        $as = 1;
    }elseif (stripos($id, "_pr") !== false) {
        $as = 1;
    }elseif (stripos($id, "_p") !== false) {
        $as = 1;
    }elseif (stripos($id, "_dc") !== false) {
        $as = 1;
    }elseif (stripos($id, "_tc") !== false) {
        $as = 1;
    }elseif (stripos($id, "_ut") !== false) {
        $as = 1;
    }elseif (stripos($id, "jgr") !== false) {
        $as = 1;
    }elseif (stripos($id, "sonik") !== false) {
      $as = 1;
    }elseif (stripos($id, "_n") !== false) {
      $as = 1;
    }

if($as == 1){
	$item = mysql_fetch_array(mysql_query("SELECT `name`,`type`,`price`,`image`,`description` FROM `chatto_$ss` WHERE `name1`='$id' LIMIT 1"));
}else{
	if($M0 > 3){$M0 = 3;}
  $item = mysql_fetch_array(mysql_query("SELECT `name`,`type`,`price`,`image`,`description` FROM `chatto_$ss` WHERE `name1`='$id' AND `type`='$M0' LIMIT 1"));
}
#return $ss." ~~~ ".$id." ~~~ ".$item['name']." ~~~ ".$item['price'];
#global variables

$sale = 0;
  $sale = mysql_fetch_array(mysql_query("SELECT `$sales` FROM `aconfigs` LIMIT 1"));
  $sale = $sale[$sales];
  if ($sale == 1 && $as !== 1){$is_sale = "<div style=\"position: absolute;right: -1px;top: -1px;background: url(../assets/img/sale.png);background-size: 40px;width: 40px;height: 34px;\"></div>";}else{$is_sale = "";}


$name1 = $id;
$price = $item['price'];
if($sale == 1 && $as !== 1){$price = $item['price'] / 2;}

$price = number_format($price, 0, ' ', ' ');


if($item['type'] < 4){
#Имя корпуса
$name = $item['name']." М".$M;

#Стоимость
$p0 = itemPrice($id,"a",$t);
$p1 = itemPrice($id,1,$t);
$p2 = itemPrice($id,2,$t);
$p3 = itemPrice($id,3,$t);

#Бонус
$u0 = "+0";
$u1 = "+1";
$u2 = "+2";
$u3 = "+3";
}else{
#Имя корпуса
if($item['type'] == 4){$n1 = " XT";}
elseif($item['type'] == 5){$n1 = " LC";}
elseif($item['type'] == 6){$n1 = " PR";}
elseif($item['type'] == 7){$n1 = " DC";}
elseif($item['type'] == 8){$n1 = " TC";}
elseif($item['type'] == 10){$n1 = " UT";}
elseif($item['type'] == 9 || $item['type'] == 11){$n1 = "";}
$name = $item['name'].$n1;
$xt = 1;

#Стоимость
$p0 = itemPrice($id,"x",$t);
if($p0 == "999 999 999"){$p0 = "&infin;";}

#Бонус
$u0 = "+0";
if($item['type'] == 4){$u0 = "+30";}
elseif($item['type'] == 5){$u0 = "+40";}
elseif($item['type'] == 6){$u0 = "+60";}
elseif($item['type'] == 7){$u0 = "+47";}
elseif($item['type'] == 8){$u0 = "+46";}
elseif($item['type'] == 10){$u0 = "+120";}
elseif($item['type'] == 9){$u0 = "+150";}
elseif($item['type'] == 11){$u0 = "+30";}

if (stripos($id, "sonik") !== false) {
  $u0 = "+200";
}
}

$nice = $item['type'] == 9 ? "" : " nice";

#Текст
if($xt == 1){$text = "<center><img src='".$item['image']."'></center>";}else{$text = "";}
$text = $text.$item['description'];

if($ids == 0){
$d0 = "";$d1 = "";$d2 = "";$d3 = "";
if ($M == 0){$d0 = ' style="background:#1f9a11"';}else{$d0 = "";}
if ($M == 1){$d1 = ' style="background:#1f9a11"';}else{$d1 = "";}
if ($M == 2){$d2 = ' style="background:#1f9a11"';}else{$d2 = "";}
if ($M == 3){$d3 = ' style="background:#1f9a11"';}else{$d3 = "";}


$needle = [];

if($xt == 0){
	$needle[0] = '<tr'.$d0.'>
  <td><i class="icons icon-m0"></i></td>
  <td>'.$u0.' <cry/></td>
  <td>'.$p0.' <cry/></td>
  </tr>
  <tr'.$d1.'>
  <td><i class="icons icon-m1"></i></td>
  <td>'.$u1.' <cry/></td>
  <td>'.$p1.' <cry/></td>
  </tr>
  <tr'.$d2.'>
  <td><i class="icons icon-m2"></i></td>
  <td>'.$u2.' <cry/></td>
  <td>'.$p2.' <cry/></td>
  </tr>
  <tr'.$d3.'>
  <td><i class="icons icon-m3"></i></td>
  <td>'.$u3.' <cry/></td>
  <td>'.$p3.' <cry/></td>
  </tr>';
	
	$needle[1] = 'height:calc(100vh - 556px)';
}else{
	$needle[0] = '<tr>
  <td>'.$n1.'</td>
  <td>'.$u0.' <cry/></td>
  <td>'.$p0.' <cry/></td>
  </tr>';
		
	$needle[1] = 'height:calc(100vh - 490px)';
}

$echo = '<div class="text">'.$name.'</div>
<div class="garage-info-table">
<table class="table" style="font-size: 13px;">
<thead style="border-collapse: collapse;border-radius: 5px;border-style: hidden;">
<tr>
<th style="font-size: 13px;border-collapse: collapse;border-radius: 5px 0px 0px 0px;border-style: hidden;">М</th>
<th style="font-size: 13px;"><div class="resistance"><div class="krys"></div></div></th>
<th style="font-size: 13px;border-collapse: collapse;border-radius: 0px 5px 0px 0px;border-style: hidden;">Стоимость</th>
</tr>
</thead>
<tbody>
'.$needle[0].'
</tbody>
</table>
</div>
<div class="mini_text'.$nice.'" style="'.$needle[1].'">'.$text.'</div>';
}else{
  #footer
  if ($xt == 0){
$M0 = $M + 1;
$MOD = "м".$M0;
}else{$MOD = $n1;}

if($xt == 1 && $M == 1){
  $M = 4;
}

$price0 = str_replace(" ","",$price);
if ($price0 > $alls['kry']){
  $price1 = "<span style=\"color:#ff4e00;\">$price</span>";
  $action = "alert('Недостаточно кристаллов!')";
}else{$price1 = $price;

$nme = $item['name'];
$arg1 = "CHATTO_GARAGE.buy.".$ss."(\'$id\')";
$action = "alerty('".$arg1."','Вы действительно хотите купить ".$nme." ".$MOD."?')";

}

if ($M < 3){
$needle[3] = '<button class="garage_btn_buy" onclick="'.$action.'">Купить '.$MOD.'<br> '.$price1.' <cry/>'.$is_sale.'</button>';
}else{
	$needle[3] = '';
}

$installed = itemInstalled($t);

if ($M <= 3 && $xt == 0){
  if ($installed == $name1){
	$needle[3] = $needle[3].'<div class="garage_btn_installed" style="float: right;"></div>';
  }else{
	$needle[3] = $needle[3].'<button class="garage_btn_buy" onclick=\'CHATTO_GARAGE.viewer.install("'.$id.'",'.$t.')\' style="float: right;">Установить</button>';
  }
}


if ($xt == 1 && $M == 4){
	if ($installed == $name1){
		$needle[3] = $needle[3].'<div class="garage_btn_installed" style="float: right;"></div>';
	}else{
		$needle[3] = $needle[3].'<button class="garage_btn_buy" onclick=\'CHATTO_GARAGE.viewer.install("'.$id.'",'.$t.')\' style="float: right;">Установить</button>';
	}
}


$echo = $needle[3];
}

if(empty($echo)){$echo = '2';}
return $echo;

}
}

####################################################################
