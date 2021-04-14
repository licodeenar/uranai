function getNoteList() {
    const resultDispId = 'note_result';
    const api_key = 'AKfycby4sHr0UXHPG3E_oJ5sNSVywDcFjVlNl6qEMCwD3QHaiEDkGkG1r_zEzrAbbZV_Vawy';
    let req = new XMLHttpRequest();
    let url = 'https://script.google.com/macros/s/' + api_key + '/exec';

    //テーブルをクリア＆フォームをロック
    document.getElementById(resultDispId).innerHTML = '占っています。。。';
    setFormDisabled(true);

    req.open("GET", url, true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            //ロックを解除
            setFormDisabled(false);
            if (req.status == 200) {
                //結果を出力
                drawTable(req.responseText, resultDispId);
            } else {
                drawTable('', resultDispId);
            }
        }
    };
    req.send(null);
}

function setFormDisabled(lock) {
    document.getElementById('note_exe').disabled = lock;
}

function drawTable(jasons, elementId) {
    let obj;
    let html = '';

    if (jasons == '""' || jasons == '') {
        document.getElementById(elementId).innerHTML = '情報を取得できませんでした。';
    } else {
        obj = JSON.parse(jasons);
        html = '';
        html += '<img src="img/' + obj.id + '.png" width="200"><br><br><br>';
        html += '' + obj.message + '<br><br>';
        html += '【ラッキーカラー】<br>' + obj.color;


        document.getElementById(elementId).innerHTML = html;
    }
}