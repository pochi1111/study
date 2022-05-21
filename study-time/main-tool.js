let kyouka = document.getElementById('pull-down-menu');
let sub_time = document.getElementById('subject');
let touroku = document.getElementById('touroku');
let h = document.getElementById('hour');
let min = document.getElementById('minute');
let sec = document.getElementById('second');
let his_math = document.getElementById('day-math');
let his_japanese = document.getElementById('day-japanese');
let his_rika = document.getElementById('day-science');
let his_shakai = document.getElementById('day-social-studies');
let his_sonohoka = document.getElementById('day-sonohoka');
let week_math = document.getElementById('week-math');
let week_japanese = document.getElementById('week-japanese');
let week_rika = document.getElementById('week-science');
let week_shakai = document.getElementById('week-social-studies');
let week_sonohoka = document.getElementById('week-sonohoka');
//変数の指定
let kyouka_sitei;
let memo;
let memo2;
let memo3;
let tuduiteru = false;
let torikesi_suruka;
let time = 0;
let h_time = 0;
let min_time = 0;
let sec_time = 0;
let start_stop = false;
let hatu = true;
let date = new Date();
let start_date;
let now_date;
let day = String(date.getFullYear()) + String(date.getMonth()) + String(date.getDate());
//初めてかどうかを調べる
if (localStorage.getItem("hatu") === null) {
    hatu = false;
    localStorage.setItem("hatu", true);
    localStorage.setItem("hull_math", 0);
    localStorage.setItem("hull_japanese", 0);
    localStorage.setItem("hull_rika", 0);
    localStorage.setItem("hull_shakai", 0);
    localStorage.setItem("hull_sonohoka",0);
     if (confirm("操作説明をしますか？") == true){
        sousasetumei();
    }

}
//今日アクセスしたかを調べ、もしアクセスしていなかったらデータを作成または更新する
if (day != localStorage.getItem("day")) {
    localStorage.setItem("day", day);
    localStorage.setItem("history_math", 0);
    localStorage.setItem("history_japanese", 0);
    localStorage.setItem("history_rika", 0);
    localStorage.setItem("history_shakai", 0);
    localStorage.setItem("history_sonohoka",0);
}
his_kousin();
//この後は即時実行プログラム
function touroku_click() {
    if (start_stop == false) {
        tuduiteru = false;
        start_stop = false;
        switch (kyouka_sitei) {
            case "2":
                memo = time + Number(localStorage.getItem("history_math"));
                memo2 = time + Number(localStorage.getItem("hull_math"));
                localStorage.setItem("history_math", memo);
                localStorage.setItem("hull_math", memo2);
                break;
            case "1":
                memo = time + Number(localStorage.getItem("history_japanese"));
                memo2 = time + Number(localStorage.getItem("hull_japanese"));
                localStorage.setItem("history_japanese", memo);
                localStorage.setItem("hull_japanese", memo2);
                break;
            case "3":
                memo = time + Number(localStorage.getItem("history_rika"));
                memo2 = time + Number(localStorage.getItem("hull_rika"));
                localStorage.setItem("history_rika", memo);
                localStorage.setItem("hull_rika", memo2);
                break;
            case "4":
                memo = time + Number(localStorage.getItem("history_shakai"));
                memo2 = time + Number(localStorage.getItem("hull_shakai"));
                localStorage.setItem("history_shakai", memo);
                localStorage.setItem("hull_shakai", memo2);
                break;
            case "5":
                memo = time + Number(localStorage.getItem("history_sonohoka"));
                memo2 = time + Number(localStorage.getItem("hull_sonohoka"));
                localStorage.setItem("history_sonohoka",memo);
                localStorage.setItem("hull_sonohoka",memo2);
                break;
            default:
                console.error("エラーが発生しました。エラーコード：001");
                alert("エラーが発生しました。\n再読み込みを推奨します")
                break;
        }
        kyouka_sitei = "教科";
        time = 0;
        kousin();
        his_kousin();
    } else {
        alert("ストップさせてからにして")
    }
}

function torikesi_click() {
    if (tuduiteru == true && start_stop == false) {
        torikesi_suruka = confirm("本当に取り消しますか？");
        if (torikesi_suruka == true) {
            start_stop = false;
            tuduiteru = false;
            time = 0;
            kyouka_sitei = "教科";
            kousin();
            his_kousin();
        }
    } else {
        alert("開始してない\n又はストップしてないよ")
    }
}

function mainasu() {
    time = 0;
}

function sousasetumei(){
    alert("操作説明\nプルダウンメニューから勉強する教科を指定\nスタートで開始、ストップで一時停止。\n登録・取り消しはストップしながら。\n※リロードやタブを閉じたりしない限りカウントアップは続きます。");
}
function his_kousin() {
    //his
    his_math.innerHTML = time_hyouji_change(localStorage.getItem("history_math"));
    his_japanese.innerHTML = time_hyouji_change(localStorage.getItem("history_japanese"));
    his_rika.innerHTML = time_hyouji_change(localStorage.getItem("history_rika"));
    his_shakai.innerHTML = time_hyouji_change(localStorage.getItem("history_shakai"));
    his_sonohoka.innerHTML = time_hyouji_change(localStorage.getItem("history_sonohoka"));
    //week
    week_math.innerHTML = time_hyouji_change(localStorage.getItem("hull_math"));
    week_japanese.innerHTML = time_hyouji_change(localStorage.getItem("hull_japanese"));
    week_rika.innerHTML = time_hyouji_change(localStorage.getItem("hull_rika"));
    week_shakai.innerHTML = time_hyouji_change(localStorage.getItem("hull_shakai"));
    week_sonohoka.innerHTML = time_hyouji_change(localStorage.getItem("hull_sonohoka"));
}

function time_hyouji_change(score){
    memo3 =  Math.floor(score /3600) + "時間" + Math.floor((score % 3600) / 60) + "分" + Math.floor(score % 60) + "秒";
    return memo3;
}

function start_click() {
    if (start_stop == false) {
        //始めるときのプログラム
        start_stop = true;
        start_date = Date.now();
        setTimeout(purasu, 1000);
    }
    if (tuduiteru == false) {
        tuduiteru = true;
        kyouka_sitei = kyouka.value;
    }
}

function purasu() {
    //時間を+していく
    now_date = Date.now();
    time = Math.floor((now_date-start_date)/1000);
    if (start_stop == true) {
        kousin();
    }
}

function kousin() {
    //画面の表示を更新する
    h_time = Math.floor(time / 3600);
    min_time = Math.floor((time % 3600) / 60);
    sec_time = Math.floor(time % 60);
    h.innerHTML = h_time;
    min.innerHTML = min_time;
    sec.innerHTML = sec_time;
    switch (kyouka_sitei) {
        case "1":
            sub_time.innerHTML = "国語";
            break;
        case "2":
            sub_time.innerHTML = "算数";
            break;
        case "3":
            sub_time.innerHTML = "理科";
            break;
        case "4":
            sub_time.innerHTML = "社会";
            break;
        case "5":
            sub_time.innerHTML = "その他";
            break;
        default:
            sub_time.innerHTML = "教科";
    };
    if (start_stop == true) {
        setTimeout(purasu, 1000);
    }
}

function stop_click() {
    if (start_stop == true) {
        //一時停止のプログラム
        start_stop = false;
    }
}
