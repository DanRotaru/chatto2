const Users = require('../models/Users');

async function getUserInfo(userId){
    let needle = {id: 1, login: 1, group: 1, flood: 1, chatban: 1, chatbandate: 1};
    let user = Users.findOne({_id: userId}, needle);
    return user;
}

async function antiflood(userId){
    var info = await getUserInfo();
    
    if(info.flood > Date.now()){
        
    }


}




/**********Автобан пользователя за флуд**********/
if ($alls['flood'] > time() && ($alls['group'] != "3") && ($alls['group'] != "2") ) {
	$alls_rangs = $alls['rang_id'];
	$alls_rang = ModernUser($mlog);

	ask("Пользователь $alls_rang лишен права выхода в эфир НА 5 МИНУТ. Причина: флуд. см. #rules");
	$chatbantime = time() + 300;
	mysql_query("UPDATE `users` SET `chatban`='1',`chatbantime`='$chatbantime',`ban_name`='Система',`ban_date`='$Ddate',`chatbanreason`='Флуд' WHERE `login`='$login'");
	mysql_query("DELETE FROM `chat` WHERE login='$mlog'");
	mysql_query("INSERT INTO `chat` (`group`,`text`) VALUES('9','u-$mlog')");
	exit;
}

$flood = time() + 1;
mysql_query("UPDATE `users` SET `flood`='$flood' WHERE `login`='$mlog'");
/**********Автобан пользователя за флуд**********/
