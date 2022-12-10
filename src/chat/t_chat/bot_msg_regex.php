<?php
$changes = 0;

if(!empty($_GET['return'])){
    $txt = $_GET['return'];
    if(preg_match('/[\d][+][\d]/', $txt)){
        $n = explode("+",$txt);
        if (!is_numeric($n[0]) || !is_numeric($n[1])){exit;}
        $sum = $n[0] + $n[1];
        
        //$sum = number_format($sum, 0, ' ', ' ');
        $txt = "Я посчитал: ".$n[0]." + ".$n[1]." = ".$sum;
        $changes = 1;
    }elseif(preg_match('/[\d][-][\d]/', $txt)){
        $n = explode("-",$txt);
        if (!is_numeric($n[0]) || !is_numeric($n[1])){exit;}
        $sum = $n[0] - $n[1];
        
        //$sum = number_format($sum, 0, ' ', ' ');
        $txt = "Я посчитал: ".$n[0]." - ".$n[1]." = ".$sum;
        $changes = 1;
    }elseif(preg_match('/[\d][*][\d]/', $txt)){
        $n = explode("*",$txt);
        if (!is_numeric($n[0]) || !is_numeric($n[1])){exit;}
        $sum = $n[0] * $n[1];
        
        //$sum = number_format($sum, 0, ' ', ' ');
        $txt = "Я посчитал: ".$n[0]." * ".$n[1]." = ".$sum;
        $changes = 1;
    }elseif(preg_match('/[\d][\/][\d]/', $txt)){
        $n = explode("/",$txt);
        if (!is_numeric($n[0]) || !is_numeric($n[1])){exit;}
        $sum = $n[0] / $n[1];
        
        //$sum = number_format($sum, 0, ' ', ' ');
        $txt = "Я посчитал: ".$n[0]." / ".$n[1]." = ".$sum;
        $changes = 1;
    }
    // elseif(preg_match('/рандомное/', $txt)){
    //     $txt = "Лови рандомное число: ".rand(1,100000);
    //     $changes = 1;
    // }
    elseif(preg_match('/погода (.*?)/', $txt)){
        $n = explode(" ",$txt);
        // $txt = $n[2];
        $txt = '<a href="https://www.google.com/search?q=погода+'.$n[2].'" target="_blank">Погода '.$n[2].'</a>';
        $changes = 1;
    }

    if($changes == 1){
        $return = $txt;
    }

    // $txt = 'ggggg';
}
?>