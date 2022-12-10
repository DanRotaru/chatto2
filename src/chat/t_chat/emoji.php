<?php
$text = $_GET['text'];

$emojiList = [
    // People
	"😄" => ":happy:",
	"😆" => ":lol:",
	"😉" => ":06:",
	"😂" => ":xD:",
	"😜" => ":bee:",
	"😎" => ":05:",
	"😭" => ":crying:",
	"😇" => ":angel:",
    "😍" => ":hearteyes:",
    "🤔" => ":think:",
    "😏" => ":heh:",
    
    // Gestures
	"✌" => ":hey:",
	"👍" => ":like:",
	"👎" => ":dislike:",
	"👏🏻" => ":bravo:",
	"🙏" => ":please:",
    "🤦" => ":facepalm:",
    
    // Other
    "🌷" => ":flower:",
    "🌚" => ":moon:",
    "🔥" => ":fire:",
    "📢" => ":repost:",
    "💎" => ":kry:"
];

foreach($emojiList as $key => $value) $text = str_replace($key, $value, $text);

