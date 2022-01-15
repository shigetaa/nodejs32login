var BBS_USER = "JS-TESTER";
var BBS_PASS = "ipCU12ySxI";

var TARGET_URL = "https://uta.pw/sakusibbs/users.php?action=login";

// CaperJSのオブジェクトを作成
var casper = require('casper').create();
// 指定のWebサイトを開く
casper.start();
casper.open(TARGET_URL);

// ログインする
casper.then(function () {
	this.capture("1screen.png");
	// フォームに値を設定し投稿する
	// this.fill(セレクタ, 値オブジェクト [,投稿するか]])
	this.fill("form", {
		username_mmlbbs6: BBS_USER,
		password_mmlbbs6: BBS_PASS,
		mml_id: 0,
		back: "index.php"
	}, true);
}, 1000);
// マイページを開く
casper.then(function () {
	this.capture("2screen.png");
	// マイページのＵＲＬを取得する関数を定義
	var getLink = function () {
		var links = [];
		var list = document.querySelectorAll('#header_menu_linkbar a');
		for (var i = 0; i < list.length; i++) {
			var a = list[i];
			links.push(a.href);
		}
		return links;
		//var q = document.querySelector('#header_menu_linkbar a');
		//return q.href;
	};
	var links = this.evaluate(getLink);
	this.echo(links);
	// ページ内で関数を実行 this.evaluate()
	//var mypage_url = this.evaluate(getLink);
	//this.echo("mypage url=" + mypage_url);
	// マイページを開く
	//this.open(mypage_url);
});
// 最後にメッセージを表示
casper.then(function () {
	this.echo("OK");
});

// 処理を実行する
casper.run();