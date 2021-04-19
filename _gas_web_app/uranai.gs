const SHEET_NAME = 'uranai';
const START_DATA_ROW = 2;
const COL_URANAI = 1;
const COL_MESSAGE = 2;
const COL_COLOR = 3;


//HTTP GETをハンドリングする
function doGet(){
  let out;
  let result;
  
  // 占い結果を取得
  result = uranai();
  console.log(result); //デバッグ用

  //Mime TypeをJSONに設定
  out = ContentService.createTextOutput();
  out.setMimeType(ContentService.MimeType.JSON);
  out.setContent(JSON.stringify(result));

  return out;
}

function uranai() {
  let sh =  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  let lastRow = sh.getLastRow();
  let result;
  let resultID;
  let resultMessage;
  let resultColor;
  
  // データ行の数
  let numData = lastRow - START_DATA_ROW + 1;

  if(numData > 0){
    // 占い結果を取得する（占いロジック：今回はランダム）
    result = Math.floor((Math.random() * numData) + START_DATA_ROW);

    // 結果をもとにシートから情報を取得
    resultID =  sh.getRange(result, COL_URANAI).getValue();
    resultMessage = sh.getRange(result, COL_MESSAGE).getValue();
    resultColor = sh.getRange(result, COL_COLOR).getValue();

    // 情報をJSONで返す
    return {id: resultID, message: resultMessage, color: resultColor};
  }
  return '';
}
