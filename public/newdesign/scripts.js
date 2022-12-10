/****************************************************************/
/** MAIN SCRIPTS ChatTO by DanRotaru
/** Copyright http://vk.com/danrotaru
 *  New version design
/****************************************************************/

console.log.apply(console, ["%c [ChatTO] Loading... ", "color: #fff; background: #47c; padding:3px 0;"]);

/* CHAT */
function process(data) {
	/* Ranks */
	data = data.replace(/{:rank(\d.*?):}/g, " <i class=\"rank r$1\"></i> ");

	/* Ranks with logins */
	data = data.replace(/\{:chatto-rank=(\d.*?)=(.*?)\:}/g, "<i class=\"rank r$1\" onclick=\"profile('$2')\"></i>");
	data = data.replace(/\{:chatto-rank=V(\d.*?)=(.*?)\:}/g, "<i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>");

	/* Ranks with logins user */
	data = data.replace(/\{:chatto-urank=(\d.*?)=(.*?)\:}/g, "<user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user>");
	data = data.replace(/\{:chatto-urank=V(\d.*?)=(.*?)\:}/g, "<user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user>");

	data = data.replace(/\{:c-u=(\d.*?)=(.*?)\:}/g, "<user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user>");
	data = data.replace(/\{:c-u=V(\d.*?)=(.*?)\:}/g, "<user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user>");


	// Smart Shorcuts
	data = data.replace(/\{:cCont=(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user> открыл <b>«$3»</b> и получил <span style=\"color:yellow\">$4</span>");
	data = data.replace(/\{:cCont=V(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user> открыл <b>«$3»</b> и получил <span style=\"color:yellow\">$4</span>");

	data = data.replace(/\{:cShopB=(\d.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user> <a onclick=\"shop()\" style=\"color:#80FF80\">купил</a> <span style=\"color:yellow\">$3</span>");
	data = data.replace(/\{:cShopB=V(\d.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user> <a onclick=\"shop()\" style=\"color:#80FF80\">купил</a> <span style=\"color:yellow\">$3</span>");


	data = data.replace(/\{:cPromo=(\d.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user> активировал промо-код и получил <span style=\"color:yellow\">$3</span>");
	data = data.replace(/\{:cPromo=V(\d.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user> активировал промо-код и получил <span style=\"color:yellow\">$3</span>");

	data = data.replace(/\{:cPromoB=(\d.*?)=(.*?)=(.*?)\:}/g, "<user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user> купил подарочную карту номиналом в <span style=\"color:yellow\">$3</span>");
	data = data.replace(/\{:cPromoB=V(\d.*?)=(.*?)=(.*?)\:}/g, "<user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user> купил подарочную карту номиналом в <span style=\"color:yellow\">$3</span>");

	data = data.replace(/\{:cPromoA=(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user> активировал $3 подарочную карту и получил <span style=\"color:yellow\">$4</span>");
	data = data.replace(/\{:cPromoA=V(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user> активировал $3 подарочную карту и получил <span style=\"color:yellow\">$4</span>");

	data = data.replace(/\{:cPromoA1=(\d.*?)=(.*?)=V(\d.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user> активировал подарочную карту пользователя <user><i class=\"rank rv$3\" onclick=\"profile('$4')\"></i>$4</user> и получил <span style=\"color:yellow\">$5</span>");
	data = data.replace(/\{:cPromoA1=(\d.*?)=(.*?)=(\d.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user> активировал подарочную карту пользователя <user><i class=\"rank r$3\" onclick=\"profile('$4')\"></i>$4</user> и получил <span style=\"color:yellow\">$5</span>");

	data = data.replace(/\{:cPromoA1=V(\d.*?)=(.*?)=(\d.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user> активировал подарочную карту пользователя <user><i class=\"rank r$3\" onclick=\"profile('$4')\"></i>$4</user> и получил <span style=\"color:yellow\">$5</span>");
	data = data.replace(/\{:cPromoA1=V(\d.*?)=(.*?)=V(\d.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user> активировал подарочную карту пользователя <user><i class=\"rank rv$3\" onclick=\"profile('$4')\"></i>$4</user> и получил <span style=\"color:yellow\">$5</span>");

	/*
	data = data.replace(/\{:cTrnsf=(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)\:}/g,"Пользователь <user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user> перевёл <span style=\"color:yellow\">$3 <img src=\"../assets/img/kry.png\"></span> пользователю <user><i class=\"rank r$4\" onclick=\"profile('$5')\"></i>$5</user>");
	data = data.replace(/\{:cTrnsf=V(\d.*?)=(.*?)=(\d.*?)=V(\d.*?)=(.*?)\:}/g,"Пользователь <user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user> перевёл <span style=\"color:yellow\">$3 <img src=\"../assets/img/kry.png\"></span> пользователю <user><i class=\"rank rv$4\" onclick=\"profile('$5')\"></i>$5</user>");
	*/

	data = data.replace(/\{:cClanD=(\d.*?)=(.*?)=(.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user> пожертвовал <span style=\"color:yellow\">$3 <img src=\"../assets/img/kry.png\"></span> клану <a style=\"color:limegreen\" onclick=\"clan($5)\">$4</a>");
	data = data.replace(/\{:cClanD=V(\d.*?)=(.*?)=(.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user> пожертвовал <span style=\"color:yellow\">$3 <img src=\"../assets/img/kry.png\"></span> клану <a style=\"color:limegreen\" onclick=\"clan($5)\">$4</a>");

	data = data.replace(/\{:cClanG=(\d.*?)=(.*?)=(.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user> получил <span style=\"color:yellow\">$3 <img src=\"../assets/img/kry.png\"></span> из капитала <a style=\"color:limegreen\" onclick=\"clan($4)\">[$5]</a>");
	data = data.replace(/\{:cClanG=V(\d.*?)=(.*?)=(.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user> получил <span style=\"color:yellow\">$3 <img src=\"../assets/img/kry.png\"></span> из капитала <a style=\"color:limegreen\" onclick=\"clan($4)\">[$5]</a>");


	data = data.replace(/\{:cUban=(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user> лишен права выхода в эфир $3. Причина: $4, см. <a style=\"color:#80FF80\" onclick=\"rules()\">Правила</a>");
	data = data.replace(/\{:cUban=V(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user> лишен права выхода в эфир $3. Причина: $4, см. <a style=\"color:#80FF80\" onclick=\"rules()\">Правила</a>");

	data = data.replace(/\{:cDBonus=(\d.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user> получил ежедневный бонус в размере <span style=\"color:yellow\">$3</span>");
	data = data.replace(/\{:cDBonus=V(\d.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user> получил ежедневный бонус в размере <span style=\"color:yellow\">$3</span>");

	data = data.replace(/\{:cTask=(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user> выполнил ежедневное задание <b>«$3»</b> и получил <span style=\"color:yellow\">$4</span>");
	data = data.replace(/\{:cTask=V(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user> выполнил ежедневное задание <b>«$3»</b> и получил <span style=\"color:yellow\">$4</span>");

	data = data.replace(/\{:cLoto=(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$2</user> поставил <span style=\"color:yellow\">$3 <img src=\"../assets/img/kry.png\"></span> на <a style=\"color:limegreen\" onclick=\"LotoL()\">$4</a>");
	data = data.replace(/\{:cLoto=V(\d.*?)=(.*?)=(.*?)=(.*?)\:}/g, "Пользователь <user><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$2</user> поставил <span style=\"color:yellow\">$3 <img src=\"../assets/img/kry.png\"></span> на <a style=\"color:limegreen\" onclick=\"LotoL()\">$4</a>");

	// Smart Shorcuts OFF

	/* Another */

	//BOT
	data = data.replace(/\{:chatto-bot:}/g, "<img class=\"rank\" src=\"../assets/rank/smiles/starr.png\"><span style=\"color:#cddc39;font-weight:bold;\" onclick=\"tologin('ChatBot')\">ChatBot</span>");

	/* Ranks with logins url */
	data = data.replace(/\{:chatto-rank-(\d.*?)=(.*?)=(.*?)\:}/g, "<i class=\"rank r$1\" onclick=\"profile('$2')\"></i><span style=\"color:#12ff00;\" onclick=\"tologin('$2')\">$2 ($3)</span> <a onclick=\"pm('$2')\" class=\"name pm\">[PM]</a>");
	data = data.replace(/\{:chatto-rank-V(\d.*?)=(.*?)=(.*?)\:}/g, "<i class=\"rank rv$1\" onclick=\"profile('$2')\"></i><span style=\"color:#12ff00;\" onclick=\"tologin('$2')\">$2 ($3)</span> <a onclick=\"pm('$2')\" class=\"name pm\">[PM]</a>");


	// USER


	data = data.replace(/\{:chatto-user-(\d.*?)=(.*?)=(\d.*?)\:}/g, "<i class=\"rank r$1\" onclick=\"profile('$2')\"></i><span class=\"name\" onclick=\"tologin('$2')\">$2 ($3)</span> <a onclick=\"pm('$2')\" class=\"name pm\">[PM]</a>");
	data = data.replace(/\{:chatto-user-V(\d.*?)=(.*?)=(\d.*?)\:}/g, "<i class=\"rank rv$1\" onclick=\"profile('$2')\"></i><span class=\"name\" onclick=\"tologin('$2')\">$2 ($3)</span> <a onclick=\"pm('$2')\" class=\"name pm\">[PM]</a>");

	data = data.replace(/\{:cU-(\d.*?)=(.*?)=(\d.*?)\:}/g, "<i class=\"rank r$1\" onclick=\"profile('$2')\"></i><span class=\"name\" onclick=\"tologin('$2')\">$2 ($3)</span> <a onclick=\"pm('$2')\" class=\"name pm\">[PM]</a>");
	data = data.replace(/\{:cU-V(\d.*?)=(.*?)=(\d.*?)\:}/g, "<i class=\"rank rv$1\" onclick=\"profile('$2')\"></i><span class=\"name\" onclick=\"tologin('$2')\">$2 ($3)</span> <a onclick=\"pm('$2')\" class=\"name pm\">[PM]</a>");


	data = data.replace(/\{:cU1-(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)=(.*?)\:}/g, "<i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$6<div onclick=\"clan($4)\" class=\"clan\">[$5]</div><span class=\"name\" onclick=\"tologin('$2')\">$2 ($3)</span> <a onclick=\"pm('$2')\" class=\"name pm\">[PM]</a>");
	data = data.replace(/\{:cU1-V(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)=(.*?)\:}/g, "<i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$6<div onclick=\"clan($4)\" class=\"clan\">[$5]</div><span class=\"name\" onclick=\"tologin('$2')\">$2 ($3)</span> <a onclick=\"pm('$2')\" class=\"name pm\">[PM]</a>");

	data = data.replace(/\{:cU2-(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)\:}/g, "<i class=\"rank r$1\" onclick=\"profile('$2')\"></i><div onclick=\"clan($4)\" class=\"clan\">[$5]</div><span class=\"name\" onclick=\"tologin('$2')\">$2 ($3)</span> <a onclick=\"pm('$2')\" class=\"name pm\">[PM]</a>");
	data = data.replace(/\{:cU2-V(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)\:}/g, "<i class=\"rank rv$1\" onclick=\"profile('$2')\"></i><div onclick=\"clan($4)\" class=\"clan\">[$5]</div><span class=\"name\" onclick=\"tologin('$2')\">$2 ($3)</span> <a onclick=\"pm('$2')\" class=\"name pm\">[PM]</a>");


	data = data.replace(/\{:cU3-(\d.*?)=(.*?)=(\d.*?)=(.*?)\:}/g, "<i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$4<span class=\"name\" onclick=\"tologin('$2')\">$2 ($3)</span> <a onclick=\"pm('$2')\" class=\"name pm\">[PM]</a>");
	data = data.replace(/\{:cU3-V(\d.*?)=(.*?)=(\d.*?)=(.*?)\:}/g, "<i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$4<span class=\"name\" onclick=\"tologin('$2')\">$2 ($3)</span> <a onclick=\"pm('$2')\" class=\"name pm\">[PM]</a>");

	// USER MENU (NEW)
	data = data.replace(/\{:chatto-muser-(\d.*?)=(.*?)=(\d.*?)\:}/g, "<i class=\"rank r$1\" onclick=\"profile('$2')\"></i><span class=\"name\" onclick=\"tologin('$2',$1,0)\">$2 ($3)</span>");
	data = data.replace(/\{:chatto-muser-V(\d.*?)=(.*?)=(\d.*?)\:}/g, "<i class=\"rank rv$1\" onclick=\"profile('$2')\"></i><span class=\"name\" onclick=\"tologin('$2',$1,1)\">$2 ($3)</span>");


	data = data.replace(/\{:chatto-muser1-(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)=(.*?)\:}/g, "<i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$6<div onclick=\"clan($4)\" class=\"clan\">[$5]</div><span class=\"name\" onclick=\"tologin('$2',$1,0,'$5')\">$2 ($3)</span>");
	data = data.replace(/\{:chatto-muser1-V(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)=(.*?)\:}/g, "<i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$6<div onclick=\"clan($4)\" class=\"clan\">[$5]</div><span class=\"name\" onclick=\"tologin('$2',$1,1,'$5')\">$2 ($3)</span>");

	data = data.replace(/\{:chatto-muser2-(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)\:}/g, "<i class=\"rank r$1\" onclick=\"profile('$2')\"></i><div onclick=\"clan($4)\" class=\"clan\">[$5]</div><span class=\"name\" onclick=\"tologin('$2',$1,0,'$5')\">$2 ($3)</span>");
	data = data.replace(/\{:chatto-muser2-V(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)\:}/g, "<i class=\"rank rv$1\" onclick=\"profile('$2')\"></i><div onclick=\"clan($4)\" class=\"clan\">[$5]</div><span class=\"name\" onclick=\"tologin('$2',$1,1,'$5')\">$2 ($3)</span>");


	data = data.replace(/\{:chatto-muser3-(\d.*?)=(.*?)=(\d.*?)=(.*?)\:}/g, "<i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$4<span class=\"name\" onclick=\"tologin('$2',$1,0,'$5')\">$2 ($3)</span>");
	data = data.replace(/\{:chatto-muser3-V(\d.*?)=(.*?)=(\d.*?)=(.*?)\:}/g, "<i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$4<span class=\"name\" onclick=\"tologin('$2',$1,1,'$5')\">$2 ($3)</span>");


	//uuu
	data = data.replace(/\{:chatto-uuser-(\d.*?)=(.*?)=(\d.*?)\:}/g, "<i class=\"rank r$1\" onclick=\"profile('$2')\"></i><span class=\"name\" onclick=\"tologin('$2')\">$2</span>");
	data = data.replace(/\{:chatto-uuser-V(\d.*?)=(.*?)=(\d.*?)\:}/g, "<i class=\"rank rv$1\" onclick=\"profile('$2')\"></i><span class=\"name\" onclick=\"tologin('$2')\">$2</span>");


	data = data.replace(/\{:chatto-uuser1-(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)=(.*?)\:}/g, "<i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$6<div onclick=\"clan($4)\" class=\"clan\">[$5]</div><span class=\"name\" onclick=\"tologin('$2')\">$2</span>");
	data = data.replace(/\{:chatto-uuser1-V(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)=(.*?)\:}/g, "<i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$6<div onclick=\"clan($4)\" class=\"clan\">[$5]</div><span class=\"name\" onclick=\"tologin('$2')\">$2</span>");

	data = data.replace(/\{:chatto-uuser2-(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)\:}/g, "<i class=\"rank r$1\" onclick=\"profile('$2')\"></i><div onclick=\"clan($4)\" class=\"clan\">[$5]</div><span class=\"name\" onclick=\"tologin('$2')\">$2</span>");
	data = data.replace(/\{:chatto-uuser2-V(\d.*?)=(.*?)=(\d.*?)=(\d.*?)=(.*?)\:}/g, "<i class=\"rank rv$1\" onclick=\"profile('$2')\"></i><div onclick=\"clan($4)\" class=\"clan\">[$5]</div><span class=\"name\" onclick=\"tologin('$2')\">$2</span>");


	data = data.replace(/\{:chatto-uuser3-(\d.*?)=(.*?)=(\d.*?)=(.*?)\:}/g, "<i class=\"rank r$1\" onclick=\"profile('$2')\"></i>$4<span class=\"name\" onclick=\"tologin('$2')\">$2</span>");
	data = data.replace(/\{:chatto-uuser3-V(\d.*?)=(.*?)=(\d.*?)=(.*?)\:}/g, "<i class=\"rank rv$1\" onclick=\"profile('$2')\"></i>$4<span class=\"name\" onclick=\"tologin('$2')\">$2</span>");


	/* Ranks with logins to url */
	data = data.replace(/{:cUT-(\d.*?)=(.*?):}/g, "<i class=\"arrow\"></i><i class=\"rank r$1\" onclick=\"profile('$2')\"></i><span class=\"name\" onclick=\"tologin('$2',$1,0)\">$2:</span>");
	data = data.replace(/{:cUT-V(\d.*?)=(.*?):}/g, "<i class=\"arrow\"></i><i class=\"rank rv$1\" onclick=\"profile('$2')\"></i><span class=\"name\" onclick=\"tologin('$2',$1,1)\">$2:</span>");


	/* Smiles */
	data = data.replace(/:\)/g, " <img src=\"../assets/rank/smiles/smile1.png\"> ");
	data = data.replace(/\;\)/g, " <img src=\"../assets/rank/smiles/smile2.png\"> ");
	data = data.replace(/:\(/g, " <img src=\"../assets/rank/smiles/smile3.png\"> ");
	data = data.replace(/=\(/g, " <img src=\"../assets/rank/smiles/smile3.png\"> ");
	data = data.replace(/=\|/g, " <img src=\"../assets/rank/smiles/smile4.png\"> ");
	data = data.replace(/:\|/g, " <img src=\"../assets/rank/smiles/smile4.png\"> ");
	data = data.replace(/:P:/g, " <img src=\"../assets/rank/smiles/smile5.png\"> ");
	data = data.replace(/\/::\//g, " <img src=\"../assets/rank/smiles/smile6.png\"> ");
	data = data.replace(/=\//g, " <img src=\"../assets/rank/smiles/smile6.png\"> ");
	data = data.replace(/:O_o/g, " <img src=\"../assets/rank/smiles/smile7.png\"> ");
	data = data.replace(/:o_O/g, " <img src=\"../assets/rank/smiles/smile7.png\"> ");
	data = data.replace(/\/__\//g, " <img src=\"../assets/rank/smiles/smile8.png\"> ");
	data = data.replace(/\/___\//g, " <img src=\"../assets/rank/smiles/smile9.png\"> ");

	data = data.replace(/:00:/g, " <img src=\"../assets/rank/smiles/05.gif\"> ");
	data = data.replace(/:01:/g, " <img src=\"../assets/rank/smiles/02.gif\"> ");
	data = data.replace(/:02:/g, " <img src=\"../assets/rank/smiles/03.gif\"> ");
	data = data.replace(/:03:/g, " <img src=\"../assets/rank/smiles/04.gif\"> ");
	data = data.replace(/:04:/g, " <img src=\"../assets/rank/smiles/01.png\"> ");
	data = data.replace(/:05:/g, " <img src=\"../assets/rank/smiles/08.png\"> ");
	data = data.replace(/:06:/g, " <img src=\"../assets/rank/smiles/10.png\"> ");
	data = data.replace(/:like:/g, " <img src=\"../assets/rank/smiles/05.png\"> ");
	data = data.replace(/:dislike:/g, " <img src=\"../assets/rank/smiles/06.png\"> ");
	data = data.replace(/:hey:/g, " <img src=\"../assets/rank/smiles/07.png\"> ");
	data = data.replace(/:lol:/g, " <img src=\"../assets/rank/smiles/09.png\"> ");
	data = data.replace(/:love:/g, " <img src=\"../assets/rank/smiles/heart.png\"> ");
	data = data.replace(/:flower:/g, " <img src=\"../assets/rank/smiles/flower.png\"> ");
	data = data.replace(/:facepalm:/g, " <img src=\"../assets/rank/smiles/facepalm.png\"> ");
	data = data.replace(/:happy:/g, " <img src=\"../assets/rank/smiles/happy.png\"> ");
	data = data.replace(/:xD:/g, " <img src=\"../assets/rank/smiles/lol1.png\"> ");
	data = data.replace(/:xd:/g, " <img src=\"../assets/rank/smiles/lol1.png\"> ");
	data = data.replace(/:mm:/g, " <img src=\"../assets/rank/smiles/mm.png\"> ");
	data = data.replace(/:bravo:/g, " <img src=\"../assets/rank/smiles/11.png\"> ");
	data = data.replace(/:fire:/g, " <img src=\"../assets/rank/smiles/fire.png\"> ");
	data = data.replace(/:hearteyes:/g, " <img src=\"../assets/rank/smiles/hearteyes.png\"> ");
	data = data.replace(/:hm:/g, " <img src=\"../assets/rank/smiles/hm.png\"> ");
	data = data.replace(/:moon:/g, " <img src=\"../assets/rank/smiles/moon.png\"> ");
	data = data.replace(/:kiss:/g, " <img src=\"../assets/rank/smiles/kiss.png\"> ");
	data = data.replace(/:please:/g, " <img src=\"../assets/rank/smiles/please.png\"> ");
	data = data.replace(/:rainbow:/g, " <img src=\"../assets/rank/smiles/rainbow.png\"> ");
	data = data.replace(/:okey:/g, " <img src=\"../assets/rank/smiles/okey.png\"> ");
	data = data.replace(/:crying:/g, " <img src=\"../assets/rank/smiles/crying.png\"> ");
	data = data.replace(/:angel:/g, " <img src=\"../assets/rank/smiles/angel.png\"> ");
	data = data.replace(/:repost:/g, " <img src=\"../assets/rank/smiles/repost.png\"> ");
	data = data.replace(/:bee:/g, " <img src=\"../assets/rank/smiles/bee.png\"> ");
	data = data.replace(/:1st:/g, " <img src=\"../assets/rank/smiles/1st.png\"> ");
	data = data.replace(/:2rd:/g, " <img src=\"../assets/rank/smiles/2rd.png\"> ");
	data = data.replace(/:3rd:/g, " <img src=\"../assets/rank/smiles/3rd.png\"> ");
	data = data.replace(/:ghost:/g, " <img src=\"../assets/rank/smiles/ghost.png\"> ");
	data = data.replace(/:koko:/g, " <img src=\"../assets/rank/smiles/koko.png\"> ");
	data = data.replace(/:mouse:/g, " <img src=\"../assets/rank/smiles/mouse.png\"> ");
	data = data.replace(/:money:/g, " <img src=\"../assets/rank/smiles/money.png\"> ");
	data = data.replace(/:vs:/g, " <img src=\"../assets/rank/smiles/vs.png\"> ");
	data = data.replace(/:up:/g, " <img src=\"../assets/rank/smiles/up.png\"> ");
	data = data.replace(/:down:/g, " <img src=\"../assets/rank/smiles/down.png\"> ");
	data = data.replace(/:left:/g, " <img src=\"../assets/rank/smiles/left.png\"> ");
	data = data.replace(/:right:/g, " <img src=\"../assets/rank/smiles/right.png\"> ");
	data = data.replace(/:nowords:/g, " <img src=\"../assets/rank/smiles/nowords.png\"> ");
	data = data.replace(/:sun:/g, " <img src=\"../assets/rank/smiles/sun.png\"> ");
	data = data.replace(/:stars:/g, " <img src=\"../assets/rank/smiles/stars.png\"> ");
	data = data.replace(/:eyes:/g, " <img src=\"../assets/rank/smiles/eyes.png\"> ");
	data = data.replace(/:ura:/g, " <img src=\"../assets/rank/smiles/ura.png\"> ");
	data = data.replace(/:ops:/g, " <img src=\"../assets/rank/smiles/ops.png\"> ");
	data = data.replace(/:rock:/g, " <img src=\"../assets/rank/smiles/rock.png\"> ");
	data = data.replace(/:sos:/g, " <img src=\"../assets/rank/smiles/sos.png\"> ");
	data = data.replace(/:good:/g, " <img src=\"../assets/rank/smiles/good.png\"> ");
	data = data.replace(/:mobile:/g, " <img src=\"../assets/img/mob1.png\"> ");
	data = data.replace(/:100:/g, " <img src=\"../assets/rank/smiles/100.png\"> ");
	data = data.replace(/:omg:/g, " <img src=\"../assets/rank/smiles/omg.png\"> ");
	data = data.replace(/:bell:/g, " <img src=\"../assets/rank/smiles/bell.png\"> ");
	data = data.replace(/:bheart:/g, " <img src=\"../assets/rank/smiles/bheart.png\"> ");
	data = data.replace(/:brheart:/g, " <img src=\"../assets/rank/smiles/brheart.png\"> ");
	data = data.replace(/:hmm:/g, " <img src=\"../assets/rank/smiles/hmm.png\"> ");
	data = data.replace(/:hstop:/g, " <img src=\"../assets/rank/smiles/hstop.png\"> ");
	data = data.replace(/:hz:/g, " <img src=\"../assets/rank/smiles/hz.png\"> ");
	data = data.replace(/:uraa:/g, " <img src=\"../assets/rank/smiles/uraa.png\"> ");
	data = data.replace(/:uuu:/g, " <img src=\"../assets/rank/smiles/uuu.png\"> ");
	data = data.replace(/:tired:/g, " <img src=\"../assets/rank/smiles/tired.png\"> ");

	data = data.replace(/:kpass:/g, " <img src=\"../assets/img/garage/kpass.png\" height='16px'> ");

	data = data.replace(/:kry:/g, " <img src=\"../assets/img/kry.png\"> ");
	data = data.replace(/:premium:/g, " <img src=\"../assets/img/premium.png\" style=\"height:16px\"> ");
	/* Smiles */



	/* Icons */
	data = data.replace(/{:cPr1:}/g, "<div class='group-icon pr1' t='STAR иконка'></div>");
	data = data.replace(/{:cPr2:}/g, "<div class='group-icon pr2' t='Удивлён иконка'></div>");
	data = data.replace(/{:cPr3:}/g, "<div class='group-icon pr3' t='Весёлый иконка'></div>");
	data = data.replace(/{:cPr5:}/g, "<div class='group-icon pr5' t='Yin Yang иконка'></div>");
	data = data.replace(/{:cPr3=(.*?):}/g, "<div onclick=\"window.open('$1')\" class='group-icon pr4' t='YouTube иконка'></div>");
	data = data.replace(/{:cPr7:}/g, "<div class='group-icon pr7' t='iSTAR иконка'></div>");
	data = data.replace(/{:cPr8:}/g, "<div class='group-icon pr8' t='Panda иконка'></div>");
	data = data.replace(/{:cPr10:}/g, "<div class='group-icon pr10' t='Шпион иконка'></div>");

	data = data.replace(/{:cAdmin-dev:}/g, "<div class='group-icon icons icon-admin' t='Администратор чата'></div><div class='group-icon icon-dev' t='Разработчик'></div>");
	data = data.replace(/{:cAdminb:}/g, "<div class='group-icon icons icon-adminb' t='Администратор/создатель/разработчик чата'></div>");
	data = data.replace(/{:cAdmin:}/g, "<div class='group-icon icons icon-admin' t='Администратор чата'></div>");
	data = data.replace(/{:cAdmin0:}/g, "<div class='group-icon icons icon-adminb' t='Администратор чата'></div>");
	data = data.replace(/{:cModer:}/g, "<div class='group-icon icons icon-moderator' t='Модератор чата'></div>");
	data = data.replace(/{:cModerb:}/g, "<div class='group-icon icons icon-moderb' t='Модератор чата'></div>");
	data = data.replace(/{:cHelper:}/g, "<div class='group-icon icons icon-helper' t='Кандидат'></div>");
	data = data.replace(/{:cSystem:}/g, "<div class='group-icon icons icon-sys' t='System'></div>");

	data = data.replace(/{:cAdmin-dev}/g, "<div class='group-icon icons icon-admin' t='Администратор чата'></div><div class='group-icon icon-dev' t='Разработчик'></div>");
	data = data.replace(/{:cAdminb}/g, "<div class='group-icon icons icon-adminb' t='Администратор/создатель/разработчик чата'></div>");
	data = data.replace(/{:cAdmin0}/g, "<div class='group-icon icons icon-adminb' t='Администратор чата'></div>");
	data = data.replace(/{:cSystem}/g, "<div class='group-icon icons icon-sys' t='System'></div>");
	data = data.replace(/{:cAdmin}/g, "<div class='group-icon icons icon-admin' t='Администратор чата'></div>");
	data = data.replace(/{:cModer}/g, "<div class='group-icon icons icon-moderator' t='Модератор чата'></div>");
	data = data.replace(/{:cHelper}/g, "<div class='group-icon icons icon-helper' t='Кандидат'></div>");
	data = data.replace(/{:cModerb}/g, "<div class='group-icon icons icon-moderb' t='Модератор, старейшина'></div>");

	/* Icons */

	/* Other */
	data = data.replace(/\{:chatto-user=(.*?)\:}/g, "<span style=\"color:orange\">$1</span>");

	data = data.replace(/\{:chatto-color=(.*?)=(.*?)\:}/g, "<span style=\"color:$1\">$2</span>");
	data = data.replace(/\{:chatto-yellow=(.*?)\:}/g, "<span style=\"color:yellow\">$1</span>");
	data = data.replace(/\{:chatto-orange=(.*?)\:}/g, "<span style=\"color:orange\">$1</span>");

	data = data.replace(/\{:cYellow=(.*?)\:}/g, "<span style=\"color:yellow\">$1</span>");
	data = data.replace(/\{:cOrange=(.*?)\:}/g, "<span style=\"color:orange\">$1</span>");


	data = data.replace(/\{:chatto-url=(.*?)=(.*?)\:}/g, "<a href=\"$2\" style=\"color:limegreen\" target=\"_blank\">$1</a>");
	data = data.replace(/\{:chatto-urlc=(.*?)=(.*?)\:}/g, "<a onclick=\"$2\" style=\"color:limegreen\">$1</a>");

	data = data.replace(/\{:c-url=(.*?)=(.*?)\:}/g, "<a href=\"$2\" target=\"_blank\">$1</a>");
	data = data.replace(/\{:c-urlc=(.*?)=(.*?)\:}/g, "<a onclick=\"$2\">$1</a>");

	data = data.replace(/\{:c-o=(.*?)\:}/g, "<a onclick=\"openlink('$1')\" title=\"Переход по внешней ссылке\">$1</a>");


	// Shortcuts
	data = data.replace(/\{:c-w=(.*?)\:}/g, "<span style=\"color:yellow\">$1 <img src=\"../assets/img/kry.png\"></span>");
	data = data.replace(/\{:c-w1=(.*?)\:}/g, "<span style=\"color:yellow\">$1</span>");


	data = data.replace(/{:chatto-url-rules:}/g, "<a style=\"color:limegreen\" onclick=\"rules()\">Правила</a>");
	data = data.replace(/{:chatto-url-shop:}/g, "<a style=\"color:limegreen\" onclick=\"shop()();\">Магазин</a>");
	data = data.replace(/{:chatto-url-buy:}/g, "<a style=\"color:limegreen\" onclick=\"donat.window()\">Покупка РУБ</a>");
	data = data.replace(/{:chatto-url-vk:}/g, "<a style=\"color:limegreen\" href=\"https://vk.com/chatto_ru\" target=\"_BLANK\">Наша группа Вк</a>");
	data = data.replace(/{:chatto-url-help:}/g, "<a style=\"color:limegreen\" onclick=\"help()\">Помощь</a>");
	data = data.replace(/{:chatto-url-help_us:}/g, "<a style=\"color:limegreen\" onclick=\"help_us()\">Поддержи чат</a>");
	data = data.replace(/{:chatto-url-ads:}/g, "<a style=\"color:limegreen\" onclick=\"load_page(15,1);\">Реклама</a>");
	data = data.replace(/{:chatto-url-updates:}/g, "<a style=\"color:limegreen\" onclick=\"load_page(11,1);\">Обновления</a>");

	data = data.replace(/{:chatto-surl-rules:}/g, "<div class='group-icon icons icon-sys' t='System'></div><span style='color:yellow'>[SYSTEM]: </span> <a style=\"color:limegreen\" onclick=\"rules()\">Правила</a>");
	data = data.replace(/{:chatto-surl-shop:}/g, "<div class='group-icon icons icon-sys' t='System'></div><span style='color:yellow'>[SYSTEM]: </span> <a style=\"color:limegreen\" onclick=\"shop()();\">Магазин</a>");
	data = data.replace(/{:chatto-surl-buy:}/g, "<div class='group-icon icons icon-sys' t='System'></div><span style='color:yellow'>[SYSTEM]: </span> <a style=\"color:limegreen\" onclick=\"donat.window()\">Покупка РУБ</a>");
	data = data.replace(/{:chatto-surl-vk:}/g, "<div class='group-icon icons icon-sys' t='System'></div><span style='color:yellow'>[SYSTEM]: </span> <a style=\"color:limegreen\" href=\"https://vk.com/chatto_ru\" target=\"_BLANK\">Наша группа Вк</a>");
	data = data.replace(/{:chatto-surl-help:}/g, "<div class='group-icon icons icon-sys' t='System'></div><span style='color:yellow'>[SYSTEM]: </span> <a style=\"color:limegreen\" onclick=\"help()\">Помощь</a>");
	data = data.replace(/{:chatto-surl-help_us:}/g, "<div class='group-icon icons icon-sys' t='System'></div><span style='color:yellow'>[SYSTEM]: </span> <a style=\"color:limegreen\" onclick=\"help_us()\">Поддержи чат</a>");
	data = data.replace(/{:chatto-surl-ads:}/g, "<div class='group-icon icons icon-sys' t='System'></div><span style='color:yellow'>[SYSTEM]: </span> <a style=\"color:limegreen\" onclick=\"load_page(15,1);\">Реклама</a>");
	data = data.replace(/{:chatto-surl-review:}/g, "<div class='group-icon icons icon-sys' t='System'></div><span style='color:yellow'>[SYSTEM]: </span> <a style=\"color:limegreen\" href=\"https://play.google.com/store/apps/details?id=com.danrotaru.tankichat\" target=\"_BLANK\">Поставь оценку в 5 звёзд на Google Play</a>");
	data = data.replace(/{:chatto-surl-gplay:}/g, "<div class='group-icon icons icon-sys' t='System'></div><span style='color:yellow'>[SYSTEM]: </span> <a style=\"color:limegreen\" href=\"https://play.google.com/store/apps/details?id=com.danrotaru.tankichat\" target=\"_BLANK\">Наше приложение в Google Play</a>");


	data = data.replace(/{:chatto-rules:}/g, "<a onclick=\"rules()\">Правила</a>");
	data = data.replace(/{:chatto-shop:}/g, "<a onclick=\"shop()()\">Магазин</a>");
	data = data.replace(/{:chatto-buy:}/g, "<a onclick=\"donat.window()\">Покупка РУБ</a>");
	data = data.replace(/{:chatto-vk:}/g, "<a href=\"https://vk.com/chatto_ru\" target=\"_BLANK\">Наша группа Вк</a>");
	data = data.replace(/{:chatto-help:}/g, "<a onclick=\"help()\">Помощь</a>");
	data = data.replace(/{:chatto-help_us:}/g, "<a onclick=\"help_us()\">Поддержи чат</a>");
	data = data.replace(/{:chatto-ads:}/g, "<a onclick=\"load_page(15,1)\">Реклама</a>");
	data = data.replace(/{:chatto-ratings:}/g, "<a href=\"/ratings\" target=\"_BLANK\">Рейтинги</a>");


	data = data.replace(/{:chatto-r=(.*?)=(.*?):}/g, "<div class=\"icon-remove\" tooltip=\"Отправлено в $1\" onclick=\"delchat($2)\"></div>");
	data = data.replace(/{:chatto-b=(.*?):}/g, "<div tooltip=\"Дать бан пользователю $1 на 5 минут за флуд\" class=\"dr\" onclick=\"jjban('$1',5,'1.1');\"></div>");

	data = data.replace(/{:c-r=(.*?)=(.*?):}/g, "<div class=\"icon-remove\" tooltip=\"Отправлено в $1\" onclick=\"delchat($2)\"></div>");
	data = data.replace(/{:c-b=(.*?):}/g, "<div tooltip=\"Дать бан пользователю $1 на 5 минут за флуд\" class=\"dr\" onclick=\"jjban('$1',5,'1.1');\"></div>");


	data = data.replace(/{:chatto-ban=(.*?):}/g, "<div tooltip=\"Дать бан пользователю $1 на 5 минут за флуд\" class=\"dr\" onclick=\"jjban('$1',5,'1.1');\"></div>");
	data = data.replace(/{:chatto-clan=(.*?)\=(.*?)\:}/g, "<div onclick=\"clan($1)\" style=\"display:inline-block;cursor:pointer;position:relative;top:-3px;color:#12ff00;font-size:11px;\">[$2]</div> ");

	data = data.replace(/{:chatto-gold-soon:}/g, "<div style=\"background:#fff; display:inline-block;border-radius:8px;\"><div style=\"padding:2px 4px;font-family:Roboto;font-size:14px;font-weight:bold;text-shadow: none;background: linear-gradient(135deg, red 20%, yellow 80%);background: linear-gradient(orange, #ff0000);-webkit-background-clip: text;-webkit-text-fill-color: transparent;\">Скоро будет сброшен золотой ящик!</div></div>");
	data = data.replace(/{:chatto-megagold-soon:}/g, "<div style=\"background:#fff; display:inline-block;border-radius:8px;\"><div style=\"padding:2px 4px;font-family:Roboto;font-size:14px;font-weight:bold;text-shadow: none;background: linear-gradient(135deg, red 20%, yellow 80%);background: linear-gradient(orange, #ff0000);-webkit-background-clip: text;-webkit-text-fill-color: transparent;\">Скоро будет сброшен ультра-голд!</div></div>");

	data = data.replace(/{:chatto-sgold-soon:}/g, "<div class='chatto-gold soon'>Скоро будет сброшен золотой ящик!</div>");
	data = data.replace(/{:chatto-smgold-soon:}/g, "<div class='chatto-gold soon ultra'>Скоро будет сброшен УЛЬТРА-ГОЛД!</div>");


	data = data.replace(/{:chatto-ctext=(.*?):}/g, "<div style=\"background:#fff; display:inline-block;border-radius:8px;\"><div style=\"padding:2px 4px;font-family:Roboto;font-size:14px;font-weight:bold;text-shadow: none;background: linear-gradient(135deg, #b24592 20%, #f15f79 80%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;\">$1</div></div>");


	// {:chatto-sgold=img=rang=login=text:}
	data = data.replace(/{:chatto-sgold=(.*?)=(\d.*?)=(.*?)=(.*?):}/g, "<div class='chatto-gold'><img class='img' src='../../assets/img/gold$1.png'><div class='nickname'><i class=\"rank r$2\" onclick=\"profile('$3')\"></i> $3</div><div class='text'>$4</div></div>");

	// Ультра {:chatto-sugold=img=rang=login=text:}
	data = data.replace(/{:chatto-sugold=(.*?)=(\d.*?)=(.*?)=(.*?):}/g, "<div class='chatto-gold ultra'><img class='img' src='../../assets/img/gold$1.png'><div class='nickname'><i class=\"rank r$2\" onclick=\"profile('$3')\"></i> $3</div><div class='text'>$4</div></div>");
	data = data.replace(/{:chatto-sugoldV=(.*?)=(\d.*?)=(.*?)=(.*?):}/g, "<div class='chatto-gold ultra'><img class='img' src='../../assets/img/gold$1.png'><div class='nickname'><i class=\"rank rv$2\" onclick=\"profile('$3')\"></i> $3</div><div class='text'>$4</div></div>");

	// {:chatto-sgoldV=img=rang=login=text:}
	data = data.replace(/{:chatto-sgoldV=(.*?)=(\d.*?)=(.*?)=(.*?):}/g, "<div class='chatto-gold'><img class='img' src='../../assets/img/gold$1.png'><div class='nickname'><i class=\"rank rv$2\" onclick=\"profile('$3')\"></i> $3</div><div class='text'>$4</div></div>");

	// Ультра {:chatto-sugoldV=img=rang=login=text:}
	data = data.replace(/{:chatto-sugoldV=(.*?)=(\d.*?)=(.*?)=(.*?):}/g, "<div class='chatto-gold ultra'><img class='img' src='../../assets/img/gold$1.png'><div class='nickname'><i class=\"rank rv$2\" onclick=\"profile('$3')\"></i> $3</div><div class='text'>$4</div></div>");


	//data = data.replace(/{:chatto-sugold=(.*?)=V(\d.*?)=(.*?)=(.*?):}/g,"<div class='chatto-gold ultra'><img class='img' src='../../assets/img/gold$1.png'><div class='nickname'><i class=\"rank rv$2\" onclick=\"profile('$3')\"></i> $3</div><div class='text'>$4</div></div>");

	//var dates = '<div class="chtmsg" by="DanRotaru"><div class="icon-remove" title="Отправлено" onclick="delchat(136)"></div></div>';
	//dates.replace(/<div class="chtmsg" by="([^"]*)">(.*)<\/div>/, "<div>$1</div>");

	/* Other */

	//data = data.replace(/{\|(.*?)\|}/g, `<div class='message'>$1</div>`);


	return data;
}

function isEmoji(str) {
    if(str.search("cClanD") !== -1 || str == '[' || str == ']'){
        return false;
    }else{
        let ranges = ['(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])']; // U+1F680 to U+1F6FF];
        if (str.match(ranges.join('|'))) return true;
        else return false;
    }
}

window.msgload = 0;
window.msgid = 0;
window.isloaded = false;

// FUNCTION WITH LONG POOL
function load_messes(id) {
	window.isloaded = true;
	if (id == undefined) {
		id = window.msgid;
	}
	let time = Math.round(new Date().getTime() / 1000);
	let key = MY.key;
	let newmsg = $("#chat_messages msg:first").attr("id");
	if (newmsg === undefined) {
		newmsg = "";
	}
	newmsg = newmsg.toString().replace("msg", "");
	let loadkey = 'msgid=' + id  + '&time=' + time + '&key=' + key;
	loadkey = btoa(unescape(encodeURIComponent(loadkey)));
	
	$.get('https://chat.chatto.ru/chat/'+loadkey+'/chat:get', function(e) {
		window.isloaded = false;

		if (e == "null") {
			setTimeout(load_messes, 2000);
			console.warn("[ChatTO] ERROR: SERVER RETURNED NULL CODE!");
		} else {

			e = JSON.parse(e);
			for (let i = 0; i < e.length; i++) {
				let data = e[i].data;
				let all = e[i].a.split("|");
				let id = all[0];
				let g = all[1];
				let user = all[2];
				let clss = all[3];

				window.msgid = id;
				if(MY.group == '3' || MY.group == '2' || (MY.group == '1' && MY.helper == '1') || MY.login == "INTRICATION"){
					if(user !== 'sys' && g !== "9"){
						let banH = `<div tooltip="Дать бан пользователю ${user} на 5 минут за флуд" class="dr" onclick="jjban('${user}',5,'1.1');"></div>`;
						data = banH+data;
					}
					if((MY.group == '3' || MY.group == '2') && g !== "9"){
						let time = all[4];
						let del = `<div class="icon-remove" tooltip="Отправлено в ${time}" onclick="delchat(${id})"></div>`;
						data = del+data;
					}
					
				}

				let data1 = '';
				for(var j = 0;j < [...data].length;j++) {
					if(isEmoji([...data][j])) {
						data1 += '<b class="emoji">'+[...data][j]+'</b>';
					}else{
						data1 += [...data][j];
					}		
				}
				if(data1.length !== 0){
					data = data1;
				}

				data = process(data);
				
				


				if (clss === undefined || clss == "" || clss == "0") {
					clss = "";
				} else {
					clss = "class='" + clss + "'";
				}
				if (g !== "9") {
					$('#chat_messages').prepend('<msg by=' + user + ' ' + clss + ' id="msg' + id + '">' + data + '</msg>');
				} else {
					//console.log(data);
					if (data == "all") {
						$("#chat_messages").html("");
					} else if (data[0] == "u" && data[1] == "-") {
						let u = data.replace("u-", "");
						$("#chat_messages *[by='" + u + "']").remove();
					} else {
						$("#msg" + data).remove();
					}
				}

				if ($('#chat_messages msg').length > 70) $('#chat_messages msg').last().remove();
				$("#wifioff").hide();
			}

			setTimeout(load_messes, 500);
		}
	}).fail(function(){
		$("#wifioff").show();
		console.warn("[ChatTO] ERROR: ERR_INTERNET_DISCONNECTED!");
		setTimeout(load_messes, 5000);
	});
}

// FUNCTION WITHOUT LONG POOL
// function load_messes(id){
// 	if (id == undefined) {
// 		if(window.msgid == undefined) window.msgid = 0;
// 		id = window.msgid;
// 	}
// 	let newmsg = $("#chat_messages msg:first").attr("id");
// 	if (newmsg === undefined) {
// 		newmsg = "";
// 	}
	
// 	$.get('/chat/'+id+'/chat:get', function(e) {
		
// 		if (e == "null") {
// 			setTimeout(load_messes, 2000);
// 			console.warn("[ChatTO] ERROR: SERVER RETURNED NULL CODE!");
// 		} else {

// 			e = JSON.parse(e);
// 			for (let i = 0; i < e.length; i++) {
// 				let data = e[i].data;
// 				let all = e[i].a.split("|");
// 				let id = all[0];
// 				let g = all[1];
// 				let user = all[2];
// 				let clss = all[3];

// 				window.msgid = id;
// 				if(MY.group == '3' || MY.group == '2' || (MY.group == '1' && MY.helper == '1') || MY.login == "INTRICATION"){
// 					if(user !== 'sys' && g !== "9"){
// 						let banH = `<div tooltip="Дать бан пользователю ${user} на 5 минут за флуд" class="dr" onclick="jjban('${user}',5,'1.1');"></div>`;
// 						data = banH+data;
// 					}
// 					if((MY.group == '3' || MY.group == '2') && g !== "9"){
// 						let time = all[4];
// 						let del = `<div class="icon-remove" tooltip="Отправлено в ${time}" onclick="delchat(${id})"></div>`;
// 						data = del+data;
// 					}
					
// 				}
				
// 				let data1 = '';
// 				for(var j = 0;j < [...data].length;j++) {
// 					if(isEmoji([...data][j])) {
// 						data1 += '<b class="emoji">'+[...data][j]+'</b>';
// 					}else{
// 						data1 += [...data][j];
// 					}		
// 				}
// 				if(data1.length !== 0){
// 					data = data1;
// 				}

// 				data = process(data);
				
				


// 				if (clss === undefined || clss == "" || clss == "0") {
// 					clss = "";
// 				} else {
// 					clss = "class='" + clss + "'";
// 				}
// 				if (g !== "9") {
// 					$('#chat_messages').prepend('<msg by=' + user + ' ' + clss + ' id="msg' + id + '">' + data + '</msg>');
// 				} else {
// 					//console.log(data);
// 					if (data == "all") {
// 						$("#chat_messages").html("");
// 					} else if (data[0] == "u" && data[1] == "-") {
// 						let u = data.replace("u-", "");
// 						$("#chat_messages *[by='" + u + "']").remove();
// 					} else {
// 						$("#msg" + data).remove();
// 					}
// 				}

// 				if ($('#chat_messages msg').length > 70) $('#chat_messages msg').last().remove();
// 				$("#wifioff").hide();
// 			}

// 			setTimeout(load_messes, 1500);
// 		}
// 	}).fail(function(){
// 		$("#wifioff").show();
// 		console.warn("[ChatTO] ERROR: ERR_INTERNET_DISCONNECTED!");
// 		setTimeout(load_messes, 5000);
// 	});
// }

var load_messages1 = load_messes;
/* CHAT */
function ignore(login) {
	$("msg[by='" + login + "']").html("Скрытое сообщение пользователя " + login + "!");
	$("msg[by='" + login + "']").attr("style", "background-color:rgba(0,0,0,0.2);font-weight:bold;padding:3px;color:limegreen;");
}

function ignor(IgnorL) {
	alertify.prompt('Введите ник пользователя которого хотите игнорировать!', function(evt, value) {
		var IgnorL = $("#alertifytext").val();
		if (IgnorL) {
			if (IgnorL.length >= 30) {
				alert('Неверный логин!');
			} else if (IgnorL == MY.login) {
				alert("Вы пытаетесь себя игнорировать!");
			} else if (IgnorL == "sys") {
				alert("Вы пытаетесь игнорировать систему!");
			} else {
				var ggs = setInterval(function() {
					ignore(IgnorL)
				}, 0);
				alert("Пользователь " + IgnorL + " успешно добавлен в игнор!");
			}
		}
	});

}
function delchat(id) {
	if (id == "all") {
		$.ajax({
			type: "GET",
			url: "/chat:del",
			data: "id=1&all=1"
		});
	} else {
		$("#msg"+id).remove();
		$.ajax({
			type: "GET",
			url: "/chat:del",
			data: "id=" + id
		});
	}
}
function prJS(data) {
	data = data.replace(/\{:cPTH=(.*?)=(.*?)=(.*?)\:}/g, "<div class=\"item-green\" style=\"margin:5px 0px;\" id=\"item_aitem_$1\" onclick=\"garage_aitems('$1')\"> <div class=\"item-m\"> <div class=\"textl\">$2</div> <img src=\"$3\" class=\"itemimg\" oncontextmenu=\"return false\" ondragstart=\"return false\"> </div> </div>");
	data = data.replace(/\{:cPTH0=(.*?)=(.*?)=(.*?)\:}/g, "<div class=\"item-green\" style=\"margin:5px 0px;\" id=\"item_aitem_$1\" onclick=\"garage_aitems('$1')\"> <div class=\"item-m\"> <div class=\"textl\">$2</div> <img src=\"$3\" class=\"itemimg\" oncontextmenu=\"return false\" ondragstart=\"return false\"> </div> </div>");
	data = data.replace(/\{:cPTH1=(.*?)=(.*?)=(.*?)=(.*?)\:}/g, "<div class=\"item-green\" style=\"margin:5px 0px;\" id=\"item_aitem_$1\" onclick=\"garage_aitems('$1')\"> <div class=\"item-m\"> <div class=\"textl\">$2</div> <img style=\"margin:-5px;height:$4\" src=\"$3\" class=\"itemimg\" oncontextmenu=\"return false\" ondragstart=\"return false\"> </div> </div>");
	data = data.replace(/\{:cPTH2=(.*?)=(.*?)=(.*?)=(.*?)=(.*?)\:}/g, "<div class=\"item-green\" style=\"margin:5px 0px;\" id=\"item_aitem_$1\" onclick=\"garage_aitems('$1')\"> <div class=\"item-m\"> <div class=\"textl\">$2</div> <img style=\"margin:-5px;height:$4\" src=\"$3\" class=\"itemimg\" oncontextmenu=\"return false\" ondragstart=\"return false\"><div class=\"item-label-count\">×$5</div> </div> </div>");

	data = data.replace(/\{:cPi=(.*?)\:}/g, "<div style=\"font-size: 14px;margin-top: 5px;margin-bottom: 5px;\">$1: $2</div>");

	//{:cPU=login=messages=kry=rankname=group=last_date=reg_date=golds=clan=invited=premium=block=ranks=vk:}

	data = data.replace(/\{:cPU=(.*?)=(.*?)=(.*?)=(.*?)=(.*?)=(.*?)=(.*?)\:}/g, "<div style=\"font-size: 18px;\">$1 ($2)</div> <div style=\"font-size: 14px;margin-top: 5px;margin-bottom: 5px;\">Кристаллы: $3 <img src=\"../assets/img/kry1.png\"></div><div style=\"font-size: 14px;margin-top: 5px;margin-bottom: 5px;\">Звание: $5 $4</div> <div style=\"font-size: 14px;margin-top: 5px;margin-bottom: 5px;\">Последний вход: $6</div> <div style=\"font-size: 14px;margin-top: 5px;margin-bottom: 5px;\">Регистрация: $7</div>");

	return data;
}

function profile(login) {
	$("#nav-garage").removeClass("active");
	$("#nav-clans").removeClass("active");

	if (login === parseInt(login, 10)) {} else {
		login = login.replace("<s>", "").replace("</s>", "");
	}

	$("#garlink").hide();
	$.ajax({
		url: "/profile:" + login,
		type: "GET",
		success: function(html) {
			html = prJS(html);

			$("#garage").html(html);
		}
	});
}
function ugarage(login) {
	$load("#garage", "/chatP:user_garage?login=" + login);
}

function ptab(id) {
	for (let i = 1; i <= 8; i++) {
		$("#profile-" + i).hide();
		$("button[onclick='ptab(" + i + ")']").removeClass("green");
		$("button[onclick='ptab(" + i + ")']").removeClass("active");
		$("button[onclick='ptab(" + i + ")']").css("top", "0px");
	}

	$("#profile-" + id).show();
	$("button[onclick='ptab(" + id + ")']").addClass("green");
	$("button[onclick='ptab(" + id + ")']").addClass("active");
	$("button[onclick='ptab(" + id + ")']").css("top", "1px");
}

function garage_aitems(uniq) {
	$(".item-green").removeClass("item-active");
	$("#item_aitem_" + uniq).addClass("item-active");
}
function stopchat() {
	load_messes = function() {};
	rgtst = function() {};

	$("body").append("<div id='stopchat'></div>");
}