<?php
include_once($_SERVER['DOCUMENT_ROOT']."/src/config.php");
require $_SERVER['DOCUMENT_ROOT'].'/src/t_chat/bot_msg.php';

if(!empty($bot_msg)){
  $tolog = $_POST['tolog'];

  $bot_enabled = mysql_fetch_array(mysql_query("SELECT `bot` FROM `aconfigs` WHERE `id`='1' LIMIT 1"));
  $bot_enabled = $bot_enabled['bot'];

  // Если пишут боту и бот включён
  if ($tolog == "ChatBot" && $bot_enabled == 1){
    $text = mb_strtolower($text);

    $return = '';
    for($i = 0; $i < count($bot_msg); $i++){
          for($k = 0; $k < count($bot_msg[$i]["word"]); $k++){
              if(preg_match('/'.$bot_msg[$i]["word"][$k].'/', $text)){
                $n = count($bot_msg[$i]["answers"]) - 1;
                $return = $bot_msg[$i]["answers"][rand(0, $n)]." ";
              }
          }
    }

    $_GET['return'] = $text;
    require $_SERVER['DOCUMENT_ROOT'].'/src/t_chat/bot_msg_regex.php';

    if(empty($return)){
        $return = $bot_dontUnderstand[rand(0,6)];
    }

      $bot_answer = $return;
      mysql_query("INSERT INTO `chat` (`login`, `text`, `tologin`, `group`) VALUES('ChatBot',' " . $bot_answer . "', '" . $login . "', '1')");
  }
}

?>