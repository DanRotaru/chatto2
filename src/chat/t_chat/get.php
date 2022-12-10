<?php

####################################################

# @author 	DanRotaru

# @info    	Получение сообщений в чате

# @version  2.0.0

####################################################

#Подключаем базу данных
#Запускаем сессию
if (!isset($_SESSION)) session_start();
require_once $_SERVER['DOCUMENT_ROOT']."/src/bd.php";
if(empty($_SESSION['login']) || empty($_SESSION['password'])) exit;





if (!isset($_GET['msgid'])) exit;

$msg = (int) $_GET['msgid'];

$msg = mysql_real_escape_string(stripslashes(htmlspecialchars(trim($msg))));

#Функции

require "filter.php";



#Сколько сообщений загружать

$msg_limit = 70;



$URL = "https://chatto.ru";

#Вывод самих сообщений



if($msg == 0){

    //Первый запрос

    $query = mysql_query("SELECT * FROM `chat` ORDER BY `id` DESC LIMIT $msg_limit");

}else{

    // смотрим, есть ли новые сообщения

    $query = mysql_query("SELECT * FROM `chat` WHERE `id` > ".$msg." LIMIT $msg_limit");

}



// если есть новые сообщения

if (mysql_num_rows($query) > 0) {
    require_once $_SERVER['DOCUMENT_ROOT']."/src/config.php";
    while($info = mysql_fetch_array($query)){

        $ulogin = $info['login'];

        

        $tologin  = $info['tologin'];

        $group  = $info['group'];

        $text   = $info['text'];





        #Берём информацию о пользователя

        if($ulogin !== "sys"){

            $uInfo = mysql_fetch_array(mysql_query("SELECT `helper`,`group`,`pri`,`pr2_link`,`rang_id`,`vip`,`dev`,`messages`,`id`,`color` FROM `users` WHERE `login`='$ulogin' LIMIT 1"));

            

            $uilogin = $ulogin;

            $icon = $uInfo['pri'];

            $pr2link = $uInfo['pr2_link'];if ($pr2link == "0"){$pr2link = "https://youtube.com/";}

            $rang   = AboutUser(2, $ulogin);

            $uMsg   = $uInfo['messages'];

        }



        #Проверка если написанное сообщение адресовано вам (msg - /to , prvt - /pm (классы))

        if (mb_strtolower($info['tologin']) == mb_strtolower($alls['login'])) $msg_to = $info['private'] == 0 ? "msg" : "prvt";

        else $msg_to = "";



        if (mb_strtolower($info['login']) == mb_strtolower($alls['login']) && $info['private'] == 1) $msg_to = $info['private'] == 0 ? "msg" : "prvt";

        

        #Скрытый модератор

        if($alls['login'] == "INTRICATION") $alls['group'] = 2;



        



        #Возможность видеть личные сообщения администраторам/модераторам

        if ($info['private'] == 1 && ($alls['group'] == 3 || $alls['group'] == 2)) $msg_to = "prvt";

        



        $to = ''; $king = ''; $teg = ''; $ket = ': ';

        #Если есть tologin

        if (!empty($info['tologin'])) {

            $ket = '';

            if($info['private'] == 0){

                $to       = $info['tologin'];

                $ban      = AboutUser(1,$to);

                $hisrang  = AboutUser(2,$to);

        

                #Вычёркиваем логин если в бане

                if ($ban) $to = "<s>".$to."</s>";

                

                #Выводим ник/звание пользователя

                $to   = "{:cUT-$hisrang=$to:}";

            }

            elseif($info['private'] == 1 && mb_strtolower($alls['login'] == $info['tologin'])){

                $to       = $info['tologin'];

                $ban      = AboutUser(1,$to);

                $hisrang  = AboutUser(2,$to);

        

                #Вычёркиваем логин если в бане

                if ($ban) $to = "<s>".$to."</s>";

                

                #Выводим ник/звание пользователя

                $to   = "{:cUT-$hisrang=$to:}";

            }

            elseif($info['private'] == 0 && mb_strtolower($alls['login'] !== $info['tologin'])){

                $to       = $info['tologin'];

                $ban      = AboutUser(1,$to);

                $hisrang  = AboutUser(2,$to);

        

                #Вычёркиваем логин если в бане

                if ($ban) $to = "<s>".$to."</s>";

                

                #Выводим ник/звание пользователя

                $to   = "{:cUT-$hisrang=$to:}";

            }elseif($info['private'] == 0 && mb_strtolower($alls['login'] !== $info['tologin'])){

                $to       = $info['tologin'];

                $ban      = AboutUser(1,$to);

                $hisrang  = AboutUser(2,$to);

        

                #Вычёркиваем логин если в бане

                if ($ban) $to = "<s>".$to."</s>";

                

                #Выводим ник/звание пользователя

                $to   = "{:cUT-$hisrang=$to:}";

            }elseif($info['login'] == $alls['login'] || $alls['group'] == 3 || $alls['group'] == 2){

                $to       = $info['tologin'];

                $ban      = AboutUser(1,$to);

                $hisrang  = AboutUser(2,$to);

        

                #Вычёркиваем логин если в бане

                if ($ban) $to = "<s>".$to."</s>";

                

                #Выводим ник/звание пользователя

                $to   = "{:cUT-$hisrang=$to:}";

            }else continue;

        }



        #Иконка ютубер

        if($icon == 5) $icon = "{:cPr3=$pr2link:}";

        else $icon = '';

        

        #Проверка если пользователь состоит в клане	

        $clanID = mysql_fetch_array(mysql_query("SELECT `clan_id` FROM `clan_user` WHERE `login`='$ulogin' AND `in_clan`='1' LIMIT 1"))['clan_id'];

        if (!empty($clanID)){

            $teg = mysql_fetch_array(mysql_query("SELECT `teg` FROM `clans` WHERE `id`='$clanID' LIMIT 1"))['teg'];

            $teg = "$clanID=$teg";

        }else{

            $teg = "";

        }

        



        #Проверяем группу отправителя

        switch ($group) {

            case '0': $king = ""; break;

            case '1': $king = ""; break;

            case '2': $king = "{:cModer}"; break;

            case '3': $king = "{:cAdmin0}"; break;

            case '5': $king = "<div class='group-icon icon-moderator_new' title='Новый модератор чата'></div>"; break;

            default: $king = ""; break;

        }

        if ($uInfo['helper'] == 1){

            $king = "{:cHelper}";

        }

        if ($group == 3 && $uInfo['dev'] == 1){

            $king = "{:cAdminb}";

        }



        #Применяем фильтры текста

        $text = filter($text);



        #Вывод id пользователя (каждому выводит свой ID)

        $text = str_replace("{:URL:}",$URL,$text);

        #Вывод id пользователя (каждому выводит свой ID)

        $text = str_replace("{user_id}",$alls['id'],$text);

        $text = str_replace("{:time:}",date("H:i"),$text);

        #Страницу реф

        $text = str_replace("{ref:url}",'{:c-o='.$URL.'/login?ref='.$alls['id'].':}',$text);

        #Вывод логина

        $text = str_replace("{:chatto-user_login}",$alls['login'],$text);

        $text = str_replace("{:chatto-user_rang}",myrang($alls['login']),$text);

        $text = str_replace("{:chatto-user_password}",$alls['password'],$text);

        $text = str_replace("{:chatto-user_fpassword}",$alls['password'][0],$text);

        $text = str_replace("{:chatto-user_f1password}",$alls['password'][1],$text);

        $text = str_replace("{:chatto-user_msg}",number_format($alls['messages'], 0, ' ', ' '),$text);

        $text = str_replace("{:chatto-user_kry}",number_format($alls['kry'], 0, ' ', ' '),$text);

        

        $text = str_replace("{:chatto-user_lg_msg}","Пользователь ".$alls['login']." написал ".number_format($alls['messages'], 0, ' ', ' ')." сообщений!",$text);

        $text = str_replace("{:chatto-user_lg_kry}","Пользователь ".$alls['login']." имеет ".number_format($alls['kry'], 0, ' ', ' ')." {::kry::}",$text);

        $text = str_replace("{:chatto-user_lg_pass}","Пароль пользователя ".$alls['login'].": ".$alls['password']." (лучше в чат скрин не кидай))",$text);

        #Вывод логина с ссылкой

        $text = str_replace("{:chatto-user_loginL}",'<a onclick="profile(\"'.$alls['login'].'\")">Мой профиль</a>',$text);

        

        if($alls['vip'] == 1) $showmyrank = "{:chatto-rank=V".$alls['rang_id']."=".$alls['login'].":}";

        else $showmyrank = "{:chatto-rank=".$alls['rang_id']."=".$alls['login'].":}";

        $text = str_replace("{:chatto-user_rank}",$showmyrank,$text);





        #Вывод профиль пользователя @login (ссылкой)

        if ($text[0] == "@" && $text[1] !== "@"){

            $qlogin = str_replace("@",'',$text);

            $qlogin = explode(" ",$qlogin); $qlogin = $qlogin[0];

            $s = mysql_fetch_array(mysql_query("SELECT `id`,`login` FROM `users` WHERE `login`='$qlogin' LIMIT 1"));

            if (!empty($s['id'])){

                $sid = $s['id'];

                $text = str_replace("@",'',$text);

                $text = str_replace($qlogin,'',$text);

                $text = str_replace($s['login'],'',$text);

                $text = '<a onclick="profile('.$sid.')">Танкист '.$s['login'].'</a>'.$text;

            }else $text = "@".$qlogin;

        }



        # @@login

            if ($text[0] == "@" && $text[1] == "@" && $text[2] !== "@"){

            $qlogin = str_replace("@@",'',$text);

            $qlogin = explode(" ",$qlogin); $qlogin = $qlogin[0];

            $s = mysql_fetch_array(mysql_query("SELECT `id`,`login` FROM `users` WHERE `login`='$qlogin' LIMIT 1"));

            if (!empty($s['id'])){

                $text = str_replace("@@",'',$text);

                $text = str_replace($qlogin,'',$text);

                $text = str_replace($s['login'],'',$text);

                $text = '<span onclick="profile('.$s['id'].')" style="cursor:pointer;background: linear-gradient(135deg, #225e9e 20%, #712c69 80%);padding:2px 5px;border-radius:5px;">'.$s['login'].'</span>'.$text;

            }else $text = "@@".$qlogin;

        }

        

        #Вывод гаража пользователя #g user

        if ($text[0] == "#" && $text[1] == "g"){

            $qlogin = str_replace("#g ",'',$text);

            $qlogin = explode(" ",$qlogin);$qlogin = $qlogin[0];

            $s = mysql_fetch_array(mysql_query("SELECT `id`,`login` FROM `users` WHERE `login`='$qlogin' LIMIT 1"));

            if (!empty($s['id'])){

                $text = str_replace("#g",'',$text);

                $text = str_replace($qlogin,'',$text);

                $text = str_replace($s['id'],'',$text);

                $text = '<a onclick="ugarage('.$s['id'].')">Гараж пользователя '.$s['login'].'</a>'.$text;

            }else $text = "#g ".$qlogin;

        }



        #Вывод определённой обновы (ссылкой)

        $text_param = explode(" ", $text);

        if ($text_param[0] == "#update") {

            if (is_numeric($text_param[1])){

                $last_updateID = @file_get_contents("updates.txt");

                if ($last_updateID < $text_param[1]){

                    $text_param[1] = $last_updateID;

                    $text = "#update ".$last_updateID;

                }

                elseif ($text_param[1] < 0){

                    $text_param[1] = 0;

                    $text = "#update 0";

                }



                $text = str_replace("#update ".$text_param[1],'<a onclick="p_update('.$text_param[1].')">Обновление #'.$text_param[1].'</a>',$text);

            }

        }

        $msgtime = '';

        if($alls['group'] == "3" || $alls['group'] == "2"){

            $msgtime = "|".$info['time'];

        }



        #Старейшена

        if($uilogin == "Кирилл") $king = "{:cModerb}";



        #Меню

        $menuStyle = $alls['s4'];

        if($menuStyle == 1){

            $icon = "";

        }else{

            $menuStyle = 0;

        }



        #Отображаем

        if(empty($king) && !empty($teg)){

            $echo = "{:cU2-$rang=$uilogin=$uMsg=$teg:}";

            if($menuStyle == 1){

                $echo = "{:chatto-muser2-$rang=$uilogin=$uMsg=$teg:}";

            }

        }

        elseif(empty($teg) && !empty($king)){

            $echo = "{:cU3-$rang=$uilogin=$uMsg=$king:}";

            if($menuStyle == 1){

                $echo = "{:cU3-$rang=$uilogin=$uMsg=$king:}";

            }

        }elseif((empty($teg) && empty($king)) || $teg == '' && $king == ''){

            $echo = "{:cU-$rang=$uilogin=$uMsg:}";

            if($menuStyle == 1){

                $echo = "{:chatto-muser-$rang=$uilogin=$uMsg:}";

            }

        }else{

            $echo = "{:cU1-$rang=$uilogin=$uMsg=$teg=$king:}";      

            if($menuStyle == 1){

                $echo = "{:chatto-muser1-$rang=$uilogin=$uMsg=$teg=$king:}";

            }

        }



        #Цвет ника

        if($uInfo['color'] !== "0"){

            switch ($uInfo['color']) {

                case '1': $uInfo['color'] = "color1";break;

                case '2': $uInfo['color'] = "color2";break;

                case '3': $uInfo['color'] = "color3";break;

                case '4': $uInfo['color'] = "color4";break;

                case '5': $uInfo['color'] = "color5";break;

                case '6': $uInfo['color'] = "color6";break;

                case '7': $uInfo['color'] = "color7";break;

                case '8': $uInfo['color'] = "color8";break;

                case '9': $uInfo['color'] = "color9";break;

                case '10': $uInfo['color'] = "color10";break;

                default: $uInfo['color'] = "";

            }

        }



        if(!empty($msg_to)) $class = $msg_to." ".$uInfo['color'];

        else $class = $uInfo['color'];



        #NickChanger

        if ($login == "ChatBot") $echo = "{:chatto-bot:}";

        



        #Собираем всё в кучу

        if ($group == 0 || $group == 9) $getchat = $text;

        else $getchat = $icon.$echo.$ket.$to.$text;

        

        #Выводим результат

        $response[] = [

            'a' => $info['id']."|".$info['group']."|".$info['login']."|".$class.$msgtime,

            'data' => $getchat

        ];



    }



    if(!isset($response)) $response = [];

    die(json_encode($response));

}



die(json_encode([]));

?>