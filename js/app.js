'use strict';
{
  //選択した手
  const gu = document.getElementById('gu');
  const tyo = document.getElementById('tyo');
  const pa = document.getElementById('pa');

  //勝った回数
  let my_count = 0;
  let cp_count = 0;
  //勝ち☆★の表示
  let my_win_star ='';
  let cp_win_star ='';

  //結果表示ＤＯＭ
  let result = document.getElementById('result');
  
  //途中経過メッセージ
  let playMes = document.createElement('p');
  playMes.classList.add('center');

  //各々の選択した手のイメージ
  let my_selection;
  let cp_selection;
  
  //結果メッセージ
  let resMes = document.createElement('p'); 
  let btn = document.querySelector('.btn');
  
  //途中経過メッセージの連結
  const span1 = document.createElement('span');
  span1.textContent = 'あなたの手は';
  const span2 = document.createElement('span');
  span2.textContent = 'です。ＰＣの手は';
  const span3 = document.createElement('span');
  span3.textContent = 'です。';


  //こっからfunction類


  //初期化処理
  function reset() {
    result.innerHTML = "";
    playMes.innerHTML = "";
    resMes.innerHTML = "";
    my_win_star ='';
    cp_win_star ='';
  }

  //相手の手のイメージを作成
  function selectImage(cp_select_number) {

    //イメージを作成
    cp_selection = document.createElement('img');

    if(cp_select_number == 0) {
      cp_selection.setAttribute('src', 'img/0.jpg');
    } else if(cp_select_number == 1) {
      cp_selection.setAttribute('src', 'img/1.jpg');
    } else {
      cp_selection.setAttribute('src', 'img/2.jpg');
    }
    //イメージのスタイリング
    cp_selection.classList.add('playImg');

    return cp_selection;
  }


  //勝ち負けの判定
  function judge(my_select_number,cp_select_number) {
    let message = "";
    if(my_select_number == cp_select_number) {
      message = "あいこです。"; 
    }
    else if(
        (my_select_number == 0 && cp_select_number ==1) ||
        (my_select_number == 1 && cp_select_number ==2) ||
        (my_select_number == 2 && cp_select_number ==0) 
      ) {
      message = "かちです。";
      //勝利数カウントアップ
      my_count++;
    }
    else if(
        (my_select_number == 0 && cp_select_number ==2) ||
        (my_select_number == 1 && cp_select_number ==0) ||
        (my_select_number == 2 && cp_select_number ==1) 
      ) {
      message = "まけです。";
      //敗北数カウントアップ
			cp_count++;
    } else {
      message = "error";
    }

    return message;
  }


  //結果の作成
  function createResult(my_select_number,cp_select_number,my_selection, cp_selection) {
    //途中経過メッセージ部品を連結
    playMes.appendChild(span1);
    playMes.appendChild(my_selection);
    playMes.appendChild(span2);
    playMes.appendChild(cp_selection);
    playMes.appendChild(span3);

    //途中経過メッセージを挿入
    result.insertBefore(playMes, null);
    
    //結果判定処理 ⇒ 結果メッセージ
    resMes.textContent = judge(my_select_number,cp_select_number);

    //結果メッセージを挿入
    result.insertBefore(resMes, null);

    //勝ち★作成
    for (let i=0; i<my_count; i++) {
      my_win_star += '☆';
    }
    for (let i=0; i<cp_count; i++) {
      cp_win_star += '★';
    }

    //勝ち星結果メッセージ作成
    let my_win = document.createElement('p');
    my_win.textContent = `あなたの勝ち数：${my_win_star}`;
    let cp_win = document.createElement('p');
    cp_win.textContent = `ＰＣの勝ち数：${cp_win_star}`;

    //勝ち星結果メッセージを挿入
    result.insertBefore(my_win, null);
    result.insertBefore(cp_win, null);
  }


  //最終結果 後処理
  function finish() {
    //傍線
    const hr = document.createElement('hr');
    const finMes = document.createElement('p');
    
    if(my_count == 5) {
      finMes.textContent = 'あなたの勝ちです';
    }
    if(cp_count == 5) {
      finMes.textContent = 'ＰＣの勝ちです';
    }

    //傍線挿入
    result.insertBefore(hr, null);
    //最終結果挿入
    result.insertBefore(finMes, null);
    //もう一度ボタンを表示
    btn.style.display = "block";
  }
 

  
  /* グー処理 */
	gu.addEventListener('click', () => {
    
    //カウント数がどちらか 5 なら処理を行わない
    if(my_count == 5 || cp_count == 5) {
      return;
    }

    //初期化処理
    reset();
    
    //グーのイメージを作成
    my_selection = document.createElement('img');
    my_selection.setAttribute('src', 'img/0.jpg');
    my_selection.classList.add('playImg');

    //相手が選んだ手 0：gu 1：tyo 2：pa
    let my_select_number = 0;
    let cp_select_number = Math.floor(Math.random() * 3);
    
    //相手の手のイメージを作成
    cp_selection = selectImage(cp_select_number);

    //結果を作成
    createResult(my_select_number,cp_select_number,my_selection, cp_selection);

    //終了
    if(my_count == 5 || cp_count == 5) {
      finish();
    }
  });

  /* チョキ処理 */
	tyo.addEventListener('click', () => {
    
    //カウント数がどちらか 5 なら処理を行わない
    if(my_count == 5 || cp_count == 5) {
      return;
    }

    //初期化処理
    reset();
    
    //チョキのイメージを作成
    my_selection = document.createElement('img');
    my_selection.setAttribute('src', 'img/1.jpg');
    my_selection.classList.add('playImg');

    //相手が選んだ手 0：gu 1：tyo 2：pa
    let my_select_number = 1;
    let cp_select_number = Math.floor(Math.random() * 3);
    
    //相手の手のイメージを作成
    cp_selection = selectImage(cp_select_number);

    //結果を作成
    createResult(my_select_number,cp_select_number,my_selection, cp_selection);

    //終了
    if(my_count == 5 || cp_count == 5) {
      finish();
    }
  });

  /* パー処理 */
	pa.addEventListener('click', () => {
    
    //カウント数がどちらか 5 なら処理を行わない
    if(my_count == 5 || cp_count == 5) {
      return;
    }

    //初期化処理
    reset();
    
    //パーのイメージを作成
    my_selection = document.createElement('img');
    my_selection.setAttribute('src', 'img/2.jpg');
    my_selection.classList.add('playImg');

    //相手が選んだ手 0：gu 1：tyo 2：pa
    let my_select_number = 2;
    let cp_select_number = Math.floor(Math.random() * 3);
    
    //相手の手のイメージを作成
    cp_selection = selectImage(cp_select_number);

    //結果を作成
    createResult(my_select_number,cp_select_number,my_selection, cp_selection);

    //終了
    if(my_count == 5 || cp_count == 5) {
      finish();
    }
  });


  /* もう一度 ボタン押下時の処理 (初期化) */
  btn.addEventListener('click', () => {
    //結果とカウントを初期化
    result.innerHTML = "";
    my_count = 0;
    cp_count = 0;

    //ボタン消す
    btn.style.display = "none";
  });


}