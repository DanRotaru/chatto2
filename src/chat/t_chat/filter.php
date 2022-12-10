<?php
if(!function_exists('AboutUser')){
    function AboutUser($id,$user){
        #Проверка пользователя
        #id == 1 => Ban
        #id == 2 => Rank
        if ($id == 1){
            $about = mysql_fetch_array(mysql_query("SELECT `chatban`,`chatbantime`,`login` FROM `users` WHERE `login` = '$user' LIMIT 1"));
            if ($about['chatban'] == 0) return false;
            elseif ($about['chatban'] == 1 && $about['chatbantime'] > time()) return true;
            else return false;
        }
        elseif ($id == 2){
            $about = mysql_fetch_array(mysql_query("SELECT `rang`,`vip` FROM `users` WHERE `login` = '$user' LIMIT 1"));
            $rang = getRank($about['rang']);
            if (empty($rang)) $rang = "01"; // если нет пользователя
            if($about['vip'] == 1) $rang = "V".$rang;
            #Проверка на премиум
            return $rang;
        }
    }
}

if (!function_exists('myrang')) {
    function myrang($ulogin){
        $info  = mysql_fetch_array(mysql_query("SELECT `vip`,`rang_id` FROM `users` WHERE `login`='$ulogin' LIMIT 1"));
        $his_rankID = $info['rang_id'];

        if ($info['vip'] == 1) return "{:chatto-rank=V$his_rankID=$ulogin:}";
        else return "{:chatto-rank=$his_rankID=$ulogin:}";
    }
}

if(!function_exists('filter')){
    function filter($text){
        #Ругательства, мат
        $mat  = array("пизда","сука","хyй","ебал","еблан","мудак","пидор","хуе","шлюха","ебало","ёбнул","заебал","заебись","наёб","пиздуй","пёзды","пиздец","пиздабол","порно","уёбок","пидарасы","ебать");
        $mat1 = array("п***а","с**а","х**","е**л","е***н","м***к","п***р","х**","ш***а","е***о","ё***л","з****л","з*****ь","н**б","п****й","п***ы","п****ц","п******л","п***о","у***к","п******ы","е***ь");
        $text = str_ireplace($mat, $mat1, $text);
        
        #Ругательства, мат #1
        $mat  = array("ПИЗДА","СУКА","ХYЙ","ЕБЛАН","ЕБАЛ","МУДАК","ПИДОР","ХУЕ","ШЛЮХА","БЛЯ","БЛЯТЬ","ЕБАЛО","ЕБАЛ","ЁБНУЛ","ЗАЕБАЛ","ЗАЕБИСЬ","НАЁБ","ПИЗДУЙ","ПЁЗДЫ","ПИЗДЕЦ","ПИЗДАБОЛ","ПОРНО","УЁБОК","ПИДАРАСЫ","ЕБАТЬ");
        $mat1 = array("П***А","С**А","Х**","Е***Н","Е**Л","М***К","П***Р","Х**","Ш***А","Б**","Б***Ь","Е***О","Е**Л","Ё***Л","З****Л","З*****Ь","Н**Б","П****Й","П***Ы","П****Ц","П******Л","П***О","У***К","П******Ы","Е***Ь");
        $text = str_ireplace($mat, $mat1, $text);
        
            
        #Кликабельные ссылки
        $links = array(
        '#page_reload',
        '#rules',
        '#radio',
        '#smiles',
        '##video',
        '#help_us',
        '#help',
        '#donat',
        '#rub',
        '#other',
        '#setting',
        '#shop',
        '#ads',
        '#updates',
        '#chatscreensize',
        '#online',
        '#friends',
        '#ranks',
        '#звания',
        '#Звания',
        '#admins',
        '#vk',
        '#b_vk',
        '#news',
        '#ratings',
        '#lottery',
        '#loto',
        '#challenges',
        '#tasks',
        '#tournaments',
        '#chatto_donations',
        '#crazyweekend',
        '#uchallenges',
        '#appapk'
        );
            
        $links1 = array(
        "<a onclick=\"document.location.reload()\">Обновить страницу</a>",
        "<a onclick=\"rules()\">Правила</a>",
        "<a onclick=\"sound()\">Радио</a>",
        "<a onclick=\"smiles()\">Смайлы</a>",
        "<a onclick=\"load_page(14,0)\">Видео</a>",
        "<a onclick=\"help_us()\">Поддержи чат</a>",
        "<a onclick=\"help()\">Помощь</a>",
        "<a onclick=\"donat.window()\">Покупка РУБ</a>",
        "<a onclick=\"donat.window()\">Покупка РУБ</a>",
        "<a onclick=\"load_page(4,0)\">Прочее</a>",
        "<a onclick=\"window_settings()\">Настройки</a>",
        "<a onclick=\"shop();\">Магазин</a>",
        "<a onclick=\"load_page(15,1)\">Реклама</a>",
        "<a onclick='load_page(11,0)'>Обновления</a>",
        "<a onclick='load_page(13,0)'>Разрешение экрана</a>",
        "<a onclick=\"load_page(5,0)\">Онлайн</a>",
        "<a onclick=\"invite()\">Друзья</a>",
        "<a onclick=\"load_page(12,0)\">Таблица званий</a>",
        "<a onclick=\"load_page(12,0)\">Таблица званий</a>",
        "<a onclick=\"load_page(12,0)\">Таблица званий</a>",
        "<a onclick=\"load_page(9,0)\">Администрация</a>",
        "<a href=\"https://vk.com/chatto_ru\" target=\"_BLANK\">Наша группа Вк</a>",
        "<a class=\"vkg\" href=\"https://vk.com/chatto_ru\" target=\"_BLANK\">Наша группа Вк</a>",
        "<a onclick=\"cChat(1)\">Новости</a>",
        "<a href=\"/ratings\" target=\"_BLANK\">Рейтинги</a>",
        "<a onclick=\"LotoL()\">Лотерея</a>",
        "<a onclick=\"LotoL()\">Лотерея</a>",
        "<a onclick=\"tasks_challenges()\">Челлендж</a>",
        "<a onclick=\"window_tasks()\">Задания</a>",
        "<a onclick=\"tasks_tournaments()\">Еженедельные турниры</a>",
        "<a href=\"/donations/\" target=\"_BLANK\">Пожертвования</a>",
        "<a href=\"/crazyweekend\" target=\"_BLANK\">Безумные выходные</a>",
        "<a onclick=\"p_challenges()\">Игроки в челленджах</a>",
        "<a href=\"/chatto.apk\">Приложение для андроид</a>"
        );
    
        $text   = str_replace($links, $links1, $text);
        
        #Звания (ярлыки)
        $Trangs = array('{rang:01}','{rang:02}','{rang:03}','{rang:04}','{rang:05}','{rang:06}','{rang:07}','{rang:08}','{rang:09}','{rang:10}','{rang:11}','{rang:12}','{rang:13}','{rang:14}','{rang:15}','{rang:16}','{rang:17}','{rang:18}','{rang:19}','{rang:20}','{rang:21}','{rang:22}','{rang:23}','{rang:24}','{rang:25}','{rang:26}','{rang:27}','{rang:28}','{rang:29}','{rang:30}','{rang:31}','{rangV:01}','{rangV:02}','{rangV:03}','{rangV:04}','{rangV:05}','{rangV:06}','{rangV:07}','{rangV:08}','{rangV:09}','{rangV:10}','{rangV:11}','{rangV:12}','{rangV:13}','{rangV:14}','{rangV:15}','{rangV:16}','{rangV:17}','{rangV:18}','{rangV:19}','{rangV:20}','{rangV:21}','{rangV:22}','{rangV:23}','{rangV:24}','{rangV:25}','{rangV:26}','{rangV:27}','{rangV:28}','{rangV:29}','{rangV:30}','{rangV:31}');
        $Trangs1  = array("../assets/rank/small_normal/01.png","../assets/rank/small_normal/02.png", "../assets/rank/small_normal/03.png", "../assets/rank/small_normal/04.png", "../assets/rank/small_normal/05.png", "../assets/rank/small_normal/06.png", "../assets/rank/small_normal/07.png", "../assets/rank/small_normal/08.png", "../assets/rank/small_normal/09.png", "../assets/rank/small_normal/10.png", "../assets/rank/small_normal/11.png", "../assets/rank/small_normal/12.png", "../assets/rank/small_normal/13.png", "../assets/rank/small_normal/14.png", "../assets/rank/small_normal/15.png", "../assets/rank/small_normal/16.png", "../assets/rank/small_normal/17.png", "../assets/rank/small_normal/18.png", "../assets/rank/small_normal/19.png","../assets/rank/small_normal/20.png","../assets/rank/small_normal/21.png","../assets/rank/small_normal/22.png","../assets/rank/small_normal/23.png","../assets/rank/small_normal/24.png","../assets/rank/small_normal/25.png","../assets/rank/small_normal/26.png","../assets/rank/small_normal/27.png","../assets/rank/small_normal/28.png","../assets/rank/small_normal/29.png","../assets/rank/small_normal/30.png","../assets/rank/small_normal/31.png","../assets/rank/small_vip/01.png","../assets/rank/small_vip/02.png","../assets/rank/small_vip/03.png","../assets/rank/small_vip/04.png","../assets/rank/small_vip/05.png","../assets/rank/small_vip/06.png","../assets/rank/small_vip/07.png","../assets/rank/small_vip/08.png","../assets/rank/small_vip/09.png","../assets/rank/small_vip/10.png","../assets/rank/small_vip/11.png","../assets/rank/small_vip/12.png","../assets/rank/small_vip/13.png","../assets/rank/small_vip/14.png","../assets/rank/small_vip/15.png","../assets/rank/small_vip/16.png","../assets/rank/small_vip/17.png","../assets/rank/small_vip/18.png","../assets/rank/small_vip/19.png","../assets/rank/small_vip/20.png","../assets/rank/small_vip/21.png","../assets/rank/small_vip/22.png","../assets/rank/small_vip/23.png","../assets/rank/small_vip/24.png","../assets/rank/small_vip/25.png","../assets/rank/small_vip/26.png","../assets/rank/small_vip/27.png","../assets/rank/small_vip/28.png","../assets/rank/small_vip/29.png","../assets/rank/small_vip/30.png","../assets/rank/small_vip/31.png");
    
        $text   = str_replace($Trangs, $Trangs1, $text);
        
        #Прочее
        $SysOther1 = array('{chat:rules}','{chat:admin}','{chat:system}','{chat:spectator}');
        $SysOther2 = array(
        "<a style=\"color:#80FF80\" onclick=\"rules()\">Правила</a>",
        "<div class=\"group-icon icon-admin\" title=\"Администратор\"></div><span style=\"color:yellow\">Администратор: </span>",
        "<div class=\"group-icon icon-system\" title=\"SYSTEM\"></div><span style=\"color:yellow\">[SYSTEM]: </span>",
        "<span style=\"color:yellow\">Наблюдатель: </span>");
    
        $text   = str_replace($SysOther1, $SysOther2, $text);
        
        #Ковычки
        $SysOther3 = array('-->','<--','--');
        $SysOther4 = array("→","←","—");
        $text   = str_replace($SysOther3, $SysOther4, $text);

        #Обновления
        if (is_numeric("$1")) $text = preg_replace('~#update (.*)(.*?)(.*)~', "<a onclick=\"p_update($1)\">Обновление #$1</a>" ,$text);


        #Красивые текста
        $cooltextpatern = '/\[cText\](.*?)\[\/cText\]/is';
        $text = preg_replace($cooltextpatern, "<div style=\"background:#fff; display:inline-block;border-radius:8px;\"><div style=\"padding:2px 4px;font-family:Roboto;font-size:14px;font-weight:bold;text-shadow: none;background: linear-gradient(135deg, #b24592 20%, #f15f79 80%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;\">$1</div></div>" ,$text);

        #3
        $abc = '<span style="background: linear-gradient(135deg, #3ca55f 20%, #b5ac59 80%);padding:2px 5px;border-radius:5px;">$1</span>';
        #$abc = '<span class="grad" style="padding:2px 5px;border-radius:5px;">$1</span>';
        #$abc = '<span  style="background:url(https://i.pinimg.com/originals/0c/6e/11/0c6e112c8a20034216df9cea26bc11ff.gif);padding:2px 5px;border-radius:5px;text-shadow:1px 1px 1px #000;">$1</span>';
        #$abc = '<span style="background: linear-gradient(135deg, #225e9e 20%, #712c69 80%);padding:2px 5px;border-radius:5px;color:#fff;">$1</span>';
        $text = preg_replace('/`1`(.*?)`1`/',$abc,$text);
        
        $abc = '<br><div style="background:#fff;border-radius:10px;text-align:center;color:#000;padding-top:10px;font-weight:bold;"><div style="font-size:24px;">$1</div><img src="https://bumper-stickers.ru/27585-thickbox_default/mem-mister-bin.jpg" width="100%"></div>';
        $text = preg_replace('/`2`(.*?)`2`/',$abc,$text);
        
        $abc = '<br><div style="float:right;font-size:24px;color:#fff;font-weight:bold;">$1</div><img src="https://i.ibb.co/rttvgpy/image.png" width="100%">';
        $text = preg_replace('/`3`(.*?)`3`/',$abc,$text);
        
        $abc = '<br><div style="float:right;font-size:24px;color:#fff;font-weight:bold;">$1</div><img src="https://s.tcdn.co/e9a/aa2/e9aaa284-5764-354f-9dbf-27b4d965ff49/23.png" width="100%">';
        $text = preg_replace('/`4`(.*?)`4`/',$abc,$text);
        
        $abc = '<br><div style="float:right;font-size:24px;color:#fff;font-weight:bold;">$1</div><img src="https://i.ibb.co/Hntgjv8/image.png" width="100%">';
        $text = preg_replace('/`5`(.*?)`5`/',$abc,$text);
        
        $abc = '<br><div style="float:right;font-size:24px;color:#fff;font-weight:bold;">$1</div><img src="https://vk.com/images/stickers/11039/512.png" width="100%">';
        $text = preg_replace('/`6`(.*?)`6`/',$abc,$text);
        
        $abc = '<br><div style="float:right;font-size:24px;color:#fff;font-weight:bold;">$1</div><img src="https://vk.com/images/stickers/11026/512.png" width="100%">';
        $text = preg_replace('/`7`(.*?)`7`/',$abc,$text);
        
        $abc = '<br><div style="float:right;font-size:24px;color:#fff;font-weight:bold;">$1</div><img src="https://s.tcdn.co/8df/4d8/8df4d8fc-5fcc-3713-b3cb-46cf18cbc342/11.png" width="100%">';
        $text = preg_replace('/`8`(.*?)`8`/',$abc,$text);
        
        $abc = '<br><div style="float:right;font-size:24px;color:#fff;font-weight:bold;">$1</div><img src="https://cdn160.picsart.com/upscale-276017286004211.png?r1024x1024" width="100%">';
        $text = preg_replace('/`9`(.*?)`9`/',$abc,$text);
        
        $abc = '<br><div style="float:right;font-size:24px;color:#fff;font-weight:bold;">$1</div><img src="https://i.pinimg.com/originals/2f/e4/38/2fe438cd401b5f7ac6f0ffb109ad87ff.png" width="100%">';
        $text = preg_replace('/`10`(.*?)`10`/',$abc,$text);
        
        
        
        
        $abc = '<br><div style="float:right;font-size:24px;color:#fff;font-weight:bold;">$1</div><img src="https://vk.com/images/stickers/8910/512.png" width="100%">';
        $text = preg_replace('/`11`(.*?)`11`/',$abc,$text);
        
        $abc = '<br><div style="float:left;font-size:13px;color:#fff;font-weight:bold;">$1</div><img src="https://static.life.ru/posts/2019/05/1216739/gr/north/3a01e6521da038d866463b07413c0004__1200x630.gif" width="100%">';
        $text = preg_replace('/`12`(.*?)`12`/',$abc,$text);
        
        
        $abc = '<br><div style="color:#fff!important;position: absolute;top: 20px;left: 50%;transform: translate(-50%);font-size: 18px;width: fit-content;text-shadow: 1px 1px 2px #000;">$1</div><img src="$2" width="100%">';
        $text = preg_replace('/`mem`(.*?)=(.*?)`mem`/',$abc,$text);

        $abc = '<span style="color:yellow;font-family:&quot;Myriad Pro&quot; !important;">$1</span>';
        $text = preg_replace('/`99`(.*?)`99`/',$abc,$text);

        //italic
        $text = preg_replace('/\*\*\*(.*?)\*\*\*/','<i>$1</i>',$text);
        //italic
        $text = preg_replace('/\*b\*\*(.*?)\*\*\*/','<b>$1</b>',$text);

        #Промо-коды
        $text = preg_replace('/CHATTO-(.*?)`99`/',$abc,$text);
        if(preg_match('/(CHATTO-[\w\d]{4}-[\w\d]{4}-[\w\d]{3})/is',$text,$matches)) {
             $text0 = str_replace($matches[1],"",$text);
             $text = '<span class="promocode">'.$matches[1].'</span>'.$text0;
        }

        # Ссылки
        $text = preg_replace("/(^|[\n ])([\w]*?)((ht|f)tp(s)?:\/\/[\w]+[^ \,\"\n\r\t<]*)/is", "$1$2{:c-o=$3:}", $text);
        $text = preg_replace("/(^|[\n ])([\w]*?)((www|ftp)\.[^ \,\"\t\n\r<]*)/is", "$1$2{:c-o=$3:}", $text);
        $text = preg_replace("/(^|[\n ])([a-z0-9&\-_\.]+?)@([\w\-]+\.([\w\-\.]+)+)/i", "$1<a onclick=\"openlink('mailto:$2@$3')\" title=\"Переход по внешней ссылке\">$2@$3</a> ", $text);
     
        return $text;
    }
}