import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/bs-moment';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { ja } from 'ngx-bootstrap/locale';

// datepikerの設定
defineLocale('ja', ja);

import { JsonpService } from '../jsonp.service';

import { OrderByParam } from '../pipe/order.by.pipe';

@Component({
  selector: 'my-app',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild('header')
  header;

  constructor(private route: ActivatedRoute, private jsonpService: JsonpService) {
    this.bsConfig = Object.assign({}, { locale: this.locale });
  }

  ngOnInit() {
    this.route.data.subscribe(obj => console.log(obj['category']));
    // ログイン情報設定
    this.userId = "userId";
    this.userName = "userName";
    this.sectionCd = "secCd";
    this.sectionName = "secName";
    // 検索条件のデフォルト設定
    this.setDefaultShow();
    this.searchCondition();
  }

  // 検索項目削除処理
  deleteCondition() {

  }

  // 検索項目追加処理
  addCondition() {
    let itemNm = this.selCondition;

    switch (itemNm) {
      case 'incidentNoShow':
        this.incidentNoShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
      case 'callContentShow':
        this.callContentShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
      case 'parentIncidentNoShow':
        this.parentIncidentNoShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
      case 'incidentStartDateTimeShow':
        this.incidentStartDateTimeShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
      case 'callDateShow':
        this.callDateShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
      case 'industryTypeShow':
        this.industryTypeShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
      case 'kijoNmShow':
        this.kijoNmShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
      case 'jigyosyutaiNmShow':
        this.jigyosyutaiNmShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
      case 'setubiNmShow':
        this.setubiNmShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
      case 'prefCdShow':
        this.prefCdShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
      case 'custNmShow':
        this.custNmShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
      case 'custTypeShow':
        this.custTypeShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
      case 'salesDeptNmShow':
        this.salesDeptNmShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
      case 'salesUserNmShow':
        this.salesUserNmShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
      case 'relateUserNmShow':
        this.relateUserNmShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
      default:
      break;
    }
  }

  // 検索項目チェック
  inputCheck() {
    if (this.incidentNoShow && !this.lengthCheck("インシデント番号",this.incidentNo,50)) {
      return false;
    }
    if (this.callContentShow && !this.lengthCheck("受付内容",this.callContent,100)) {
      return false;
    }
    if (this.parentIncidentNoShow && !this.lengthCheck("親インシデント番号",this.parentIncidentNo,50)) {
      return false;
    }
    if (this.incidentStartDateTimeShow && !this.lengthCheck("発生日時（開始）",this.incidentStartDateTimeFrom,20)) {
      return false;
    }
    if(this.incidentStartDateTimeFrom != null){
      if (this.incidentStartDateTimeShow && !this.dateFormatCheck("発生日時（開始）",this.incidentStartDateTimeFrom)) {
        return false;
      }
    }
    if (this.incidentStartDateTimeShow && !this.lengthCheck("発生日時（終了）",this.incidentStartDateTimeTo,20)) {
      return false;
    }
    if(this.incidentStartDateTimeTo != null){
      if (this.incidentStartDateTimeShow && !this.dateFormatCheck("発生日時（終了）",this.incidentStartDateTimeTo)) {
        return false;
      }
    }
    if (this.callDateShow && !this.lengthCheck("受付日（開始）",this.callStartDateFrom,20)) {
      return false;
    }
    if(this.callStartDateFrom != null){
      if (this.callDateShow && !this.dateFormatCheck("受付日（開始）",this.callStartDateFrom)) {
        return false;
      }
    }
    if (this.callDateShow && !this.lengthCheck("受付日（終了）",this.callStartDateTo,20)) {
      return false;
    }
    if(this.callStartDateTo != null){
      if (this.callDateShow && !this.dateFormatCheck("受付日（終了）",this.callStartDateTo)) {
        return false;
      }
    }
    if (this.kijoNmShow && !this.lengthCheck("機場",this.kijoNm,50)) {
      return false;
    }
    if (this.jigyosyutaiNmShow && !this.lengthCheck("事業主体",this.jigyosyutaiNm,50)) {
      return false;
    }
    if (this.setubiNmShow && !this.lengthCheck("設備",this.setubiNm,50)) {
      return false;
    }
    if (this.custNmShow && !this.lengthCheck("顧客",this.custNm,50)) {
      return false;
    }
    if (this.salesDeptNmShow && !this.lengthCheck("営業部門",this.salesDeptNm,50)) {
      return false;
    }
    if (this.salesUserNmShow && !this.lengthCheck("営業担当者",this.salesUserNm,50)) {
      return false;
    }
    if (this.relateUserNmShow && !this.lengthCheck("関係者",this.relateUserNm,50)) {
      return false;
    }
    return true;
  }

  // 検索項目取得処理
  getCondition(){
    var conditionArray = new Array();
    if (this.inputCheck()) {
      conditionArray[0] = true;

      // インシデント分類
      conditionArray[1] = this.incidentTypeSyougai;
      conditionArray[2] = this.incidentTypeJiko;
      conditionArray[3] = this.incidentTypeClaim;
      conditionArray[4] = this.incidentTypeToiawase;
      conditionArray[5] = this.incidentTypeInfo;
      conditionArray[6] = this.incidentTypeOther;
      // ステータス
      conditionArray[7] = this.incidentStatusCall;
      conditionArray[8] = this.incidentStatusTaio;
      conditionArray[9] = this.incidentStatusAct;
      // インシデント番号
      conditionArray[10] = this.incidentNo;
      // 受付内容
      conditionArray[11] = this.callContent;
      // 親インシデント番号
      conditionArray[12] = this.parentIncidentNo;
      // 発生日時
      conditionArray[13] = this.getDateStringFromDate(this.incidentStartDateTimeFrom);
      conditionArray[14] = this.getDateStringFromDate(this.incidentStartDateTimeTo);
      // 受付日
      conditionArray[15] = this.getDateStringFromDate(this.callStartDateFrom);
      conditionArray[16] = this.getDateStringFromDate(this.callStartDateTo);
      // 業種区分
      conditionArray[17] = this.industryTypeMachinery;
      conditionArray[18] = this.industryTypeElectricalMachinery;
      conditionArray[19] = this.industryTypeInstrumentation;
      conditionArray[20] = this.industryTypeInfo;
      conditionArray[21] = this.industryTypeEnvironment;
      conditionArray[22] = this.industryTypeWBC;
      conditionArray[23] = this.industryTypeOther;
      // 機場
      conditionArray[24] = this.kijoNm;
      // 事業主体
      conditionArray[25] = this.jigyosyutaiNm;
      // 設備
      conditionArray[26] = this.setubiNm;
      // 都道府県
      conditionArray[27] = this.prefCd;
      // 顧客
      conditionArray[28] = this.custNm;
      // 顧客分類
      conditionArray[29] = this.custTypeNenkan;
      conditionArray[30] = this.custTypeTenken;
      conditionArray[31] = this.custTypeNasi;
      conditionArray[32] = this.custTypeKasi;
      conditionArray[33] = this.custTypeOther;
      // 営業部門
      conditionArray[34] = this.salesDeptNm;
      // 営業担当者
      conditionArray[35] = this.salesUserNm;
      // 関係者
      conditionArray[36] = this.relateUserNm;
      // userId
      conditionArray[37] = this.userId;
      // userName
      conditionArray[38] = this.userName;
      // sectionCd
      conditionArray[39] = this.sectionCd;
      // sectionName
      conditionArray[40] = this.sectionName;

    } else {
      conditionArray[0] = false;
    }

    return conditionArray;
  }

  // 登録している検索条件が変更された
  changeCondition() {
    // ヘッダーの検索条件名の表示を更新する
    this.header.searchConditionName();
  }

  // 最大文字数チェック
  lengthCheck(name,val,length){
    if(val != null && val.length > length){
      alert(name + "の最大文字数は"　+ length + "です。");
      return false;
    }else{
      return true;
    }
  }

  // 日付フォーマットチェック
  dateFormatCheck(name,date){
    if(this.getDateStringFromDate(date) == null){
      alert(name + "は日付型でない。");
      return false;
    }
    return true;
  }

  selCondition = "0";
  showBackFlg = false;
  incidentTypeShow = false;
  incidentStsShow = false;
  incidentNoShow = false;
  callContentShow = false;
  parentIncidentNoShow = false;
  incidentStartDateTimeShow = false;
  callDateShow = false;
  industryTypeShow = false;
  kijoNmShow = false;
  jigyosyutaiNmShow = false;
  setubiNmShow = false;
  prefCdShow = false;
  custNmShow = false;
  custTypeShow = false;
  salesDeptNmShow = false;
  salesUserNmShow = false;
  relateUserNmShow = false;
  condList = [];
  condId = null;
  condNm = null;
  userId = null;
  userName = null;
  sectionCd = null;
  sectionName = null;
  incidentTypeSyougai = null;
  incidentTypeJiko = null;
  incidentTypeClaim = null;
  incidentTypeToiawase = null;
  incidentTypeInfo = null;
  incidentTypeOther = null;
  incidentStatusCall = null;
  incidentStatusTaio = null;
  incidentStatusAct = null;
  parentIncidentNo = null;
  incidentStartDateTimeFrom = null;
  incidentStartDateTimeTo = null;
  industryTypeMachinery = null;
  industryTypeElectricalMachinery = null;
  industryTypeInstrumentation = null;
  industryTypeInfo = null;
  industryTypeEnvironment = null;
  industryTypeWBC = null;
  industryTypeOther = null;
  jigyosyutaiNm = null;
  prefCd = null;
  custNm = null;
  custTypeNenkan = null;
  custTypeTenken = null;
  custTypeNasi = null;
  custTypeKasi = null;
  custTypeOther = null;
  salesDeptNm = null;
  salesUserNm = null;
  relateUserNm = null;

  // 検索条件のデフォルト設定
  setDefaultShow() {
    //インシデント分類
    this.incidentTypeShow = true;
    // ステータス
    this.incidentStsShow = true;
    // インシデント番号
    this.incidentNoShow = true;
    // 受付内容
    this.callContentShow = true;
    // 親インシデント番号
    this.parentIncidentNoShow = false;
    // 発生日時
    this.incidentStartDateTimeShow = false;
    // 受付日
    this.callDateShow = true;
    // 業種区分
    this.industryTypeShow = false;
    // 機場
    this.kijoNmShow = true;
    // 事業主体
    this.jigyosyutaiNmShow = false;
    // 設備
    this.setubiNmShow = true;
    // 都道府県
    this.prefCdShow = true;
    // 顧客
    this.custNmShow = false;
    // 顧客分類
    this.custTypeShow = false;
    // 営業部門
    this.salesDeptNmShow = false;
    // 営業担当者
    this.salesUserNmShow = false;
    // 関係者
    this.relateUserNmShow = false;
  }

  // 検索項目保存処理
  conditionSave() {

  }

  // 検索結果Excel出力処理
  excelOutput() {

  }

  incidentList = [];
  incidentNo = null;
  callContent = null;
  kijoNm = null;
  setubiNm = null;
  prefNm = null;
  callStartDateFrom = null;
  callStartDateTo = null;
  // 検索処理
  search() {
    // 検索パラメータの作成
    let ps = new URLSearchParams();
    ps.set("incidentNo", this.incidentNo);
    ps.set("callContent", this.callContent);
    ps.set("kijoNm", this.kijoNm);
    ps.set("setubiNm", this.setubiNm);
    ps.set("prefNm", this.prefNm);

    var callStartDateFromStr = this.getDateStringFromDate(this.callStartDateFrom);
    ps.set("callStartDateFrom", callStartDateFromStr);
    var callStartDateToStr = this.getDateStringFromDate(this.callStartDateTo);
    ps.set("callStartDateTo", callStartDateToStr);

    // 検索
    this.jsonpService.requestGet('IncidentListDataGet.php', ps)
      .subscribe(
      data => {
        // 通信成功時
        console.log(data);
        if (data[0]) {
          let list = data[0];
          if (list.result !== '' && list.result == true) {
            // 画面表示パラメータのセット処理
            this.setDspParam(data.slice(1)); // 配列1つ目は、サーバ処理成功フラグなので除外
          }
        }
      },
      error => {
        // 通信失敗もしくは、コールバック関数内でエラー
        console.log(error);
        console.log('サーバとのアクセスに失敗しました。');
        return false;
      }
      );
  }

  showDelFlg = true;
  condFld = null;
  conditionShowArray = [];
  // 検索処理
  searchCondition() {
    // 検索パラメータの作成
    let ps = new URLSearchParams();
    this.route.data.subscribe(obj => console.log(obj['category']));
    let condId = this.route.snapshot.paramMap.get('condId');
    ps.set("condId", condId);

    // 検索
    this.jsonpService.requestGet('IncidentListSearchConditionGet.php', ps)
      .subscribe(
      data => {
        // 通信成功時
        console.log(data);
        if(condId != '0'){
          this.conditionShowArray = data[data.length - 1];
          for(var i=0;i<this.conditionShowArray.length;i++){
            var condFld = null;
            var condVal = null;
            condFld = this.conditionShowArray[i]['COND_FLD'];
            condVal = this.conditionShowArray[i]['COND_VAL'];
            this.setConditionShowAndVal(condFld,condVal);
          }
        }

        if (data[0]) {
          let list = data[0];
          if (list.result !== '' && list.result == true) {
            // 画面表示パラメータのセット処理
            this.setDspParam(data.slice(1,-1)); // 配列1つ目は、サーバ処理成功フラグなので除外
          }
        }
      },
      error => {
        // 通信失敗もしくは、コールバック関数内でエラー
        console.log(error);
        console.log('サーバとのアクセスに失敗しました。');
        return false;
      }
      );
  }

  // 都道府県Array
  prefCdArray = [];
  // 設置表示条件と条件値
  setConditionShowAndVal(condFld,condVal){
    switch (condFld)
    {
    case "incidentTypeSyougai":// インシデント分類（障害）
        this.incidentTypeSyougai = true;
        break;
    case "incidentTypeJiko":// インシデント分類（事故）
        this.incidentTypeJiko = true;
        break;
    case "incidentTypeClaim":// インシデント分類（クレーム）
        this.incidentTypeClaim = true;
        break;
    case "incidentTypeToiawase":// インシデント分類（問合せ）
        this.incidentTypeToiawase = true;
        break;
    case "incidentTypeInfo":// インシデント分類（情報）
        this.incidentTypeInfo = true;
        break;
    case "incidentTypeOther":// インシデント分類（その他）
        this.incidentTypeOther = true;
        break;
    case "incidentStatusCall":// ステータス（受入済）
        this.incidentStatusCall = true;
        break;
    case "incidentStatusTaio":// ステータス（対応入力済）
        this.incidentStatusTaio = true;
        break;
    case "incidentStatusAct":// ステータス（処置入力済）
        this.incidentStatusAct = true;
        break;
    case "incidentNo":// インシデント番号
        this.incidentNo = condVal;
        break;
    case "callContent":// 受付内容
        this.callContent = condVal;
        break;
    case "parentIncidentNo":// 親インシデント番号
        this.parentIncidentNo = condVal;
        break;
    case "incidentStartDateTimeFrom":// 発生日時（開始）
        this.incidentStartDateTimeFrom = condVal;
        break;
    case "incidentStartDateTimeTo":// 発生日時（終了）
        this.incidentStartDateTimeTo = condVal;
        break;
    case "callStartDateFrom":// 受付日（開始）
        this.callStartDateFrom = condVal;
        break;
    case "callStartDateTo":// 受付日（終了）
        this.callStartDateTo = condVal;
        break;
    case "industryTypeMachinery":// 業種区分（機械）
        this.industryTypeShow = true;
        this.industryTypeMachinery = true;
        break;
    case "industryTypeElectricalMachinery":// 業種区分（電機（E））
        this.industryTypeShow = true;
        this.industryTypeElectricalMachinery = condVal;
        break;
    case "industryTypeInstrumentation":// 業種区分（計装（I））
    this.industryTypeShow = true;
        this.industryTypeInstrumentation = condVal;
        break;
    case "industryTypeInfo":// 業種区分（情報（C））
        this.industryTypeShow = true;
        this.industryTypeInfo = condVal;
        break;
    case "industryTypeEnvironment":// 業種区分（環境）
        this.industryTypeShow = true;
        this.industryTypeEnvironment = condVal;
        break;
    case "industryTypeWBC":// 業種区分（WBC）
        this.industryTypeShow = true;
        this.industryTypeWBC = condVal;
        break;
    case "industryTypeOther":// 業種区分（その他）
        this.industryTypeShow = true;
        this.industryTypeOther = condVal;
        break;
    case "kijoNm":// 機場
        this.kijoNm = condVal;
        break;
    case "jigyosyutaiNm":// 事業主体
        this.jigyosyutaiNm = condVal;
        break;
    case "setubiNm":// 設備
        this.setubiNm = condVal;
        break;
    case "prefCd":// 都道府県
        this.prefCd = condVal;
        break;
    case "custNm":// 顧客
        this.custNm = condVal;
        break;
    case "custTypeNenkan":// 顧客分類（年間契約）
        this.custTypeShow = true;
        this.custTypeNenkan = true;
        break;
    case "custTypeTenken":// 顧客分類（点検契約）
        this.custTypeShow = true;
        this.custTypeTenken = true;
        break;
    case "custTypeNasi":// 顧客分類（契約なし）
        this.custTypeShow = true;
        this.custTypeNasi = true;
        break;
    case "custTypeKasi":// 顧客分類（瑕疵期間中）
        this.custTypeShow = true;
        this.custTypeKasi = true;
        break;
    case "custTypeOther":// 顧客分類（その他）
        this.custTypeShow = true;
        this.custTypeOther = true;
        break;
    case "salesDeptNm":// 営業部門
        this.custNm = condVal;
        break;
    case "salesUserNm":// 営業担当者
        this.custNm = condVal;
        break;
    case "relateUserNm":// 関係者
        this.custNm = condVal;
        break;
    default:
        break;
    }
  }

  // 日付型を日付フォーマット文字列に変更
  getDateStringFromDate(date) {

    if(date && date.getFullYear()){
      var y:number = date.getFullYear();
      var m:number = date.getMonth();
      m++;
      var d:number = date.getDate();
      return  y + "-" + m + "-" + d + " 00:00:00";
    } else {
      // 日付型でない値の場合
      return null;
    }

  }

  // 詳細画面表示処理
  showDetail() {

  }

  // 画面表示パラメータのセット処理
  setDspParam(data) {
    // ページングの設定
    this.bigTotalItems = data.length;
    this.incidentList = data;
  }

  bsValue: Date;
  // date pikerの設定
  locale = 'ja';
  locales = listLocales();
  bsConfig: Partial<BsDatepickerConfig>;

  // this.(window).scroll(function () {
  //   // スクロールイベント
  //   let this_scrollTop = this.(this).scrollTop();

  //   if (this.("#search-list").offset().top - this_scrollTop < 10) {
  //       this.("#newTable").show();
  //   } else {
  //       this.("#newTable").hide();
  //   }
  // });

  // 設置「検索条件を削除」Flg
  setShowDelFlg($event: any) {
    if ($event) {
      this.showDelFlg = $event["showDelFlg"];
    }
  }

  // 並び替え処理宣言
  order = new OrderByParam();
  orderByParamArray = { // true:ソート有り false:ソート無し [column名 + 「Asc」or「Desc」]
    'incidentNoAsc': false, // インシデント番号のソートアイコン　昇順
    'incidentNoDesc': false // インシデント番号のソートアイコン　降順
  };
  // 並び替え処理(並び順指定)
  sort(column: string) {  // ←イベント発火地点
    var columnAsc = column + 'Asc';
    var columnDesc = column + 'Desc';
    this.changeOrderBy(columnAsc, columnDesc);
    var orderBy = this.getOrderBy(columnAsc, columnDesc);
    this.order.set(column, orderBy);  // ←ソートを行う

    // 切り替え処理
    for (var key in this.orderByParamArray) {
      if (key != columnAsc && key != columnDesc) {
        // 選択していない項目は全て初期化する
        this.orderByParamArray[key] = false;
      }
    }
  }

  // ソート順の取得
  getOrderBy(columnAsc: string, columnDesc: string) {
    if (this.orderByParamArray[columnAsc] && !this.orderByParamArray[columnDesc]) {
      return 'ASC';
    } else if (!this.orderByParamArray[columnAsc] && this.orderByParamArray[columnDesc]) {
      return 'DESC';
    }
    // 番兵
    this.orderByParamArray[columnAsc] = true;
    this.orderByParamArray[columnDesc] = false;
    return 'ASC';
  }
  // ソート順の変更
  changeOrderBy(columnAsc: string, columnDesc: string) {
    if (!this.orderByParamArray[columnAsc] && !this.orderByParamArray[columnDesc]) {
      // 初めて選択→昇順
      this.orderByParamArray[columnAsc] = true;
    } else if (this.orderByParamArray[columnAsc] && !this.orderByParamArray[columnDesc]) {
      // 昇順→降順
      this.orderByParamArray[columnAsc] = false;
      this.orderByParamArray[columnDesc] = true;
    } else if (!this.orderByParamArray[columnAsc] && this.orderByParamArray[columnDesc]) {
      // 降順→昇順
      this.orderByParamArray[columnAsc] = true;
      this.orderByParamArray[columnDesc] = false;
    } else {
      // 番兵
      this.orderByParamArray[columnAsc] = false;
      this.orderByParamArray[columnDesc] = false;
    }
  }

  // ページングの設定
  maxSize: number = 5; // ページングの表示ページ数
  bigTotalItems: number = 0; // 総数
  itemsPerPage: number = 10; // 1ページに表示する件数
  currentPage: number = 0; // 現在表示しているページ
  start: number = 0; // データ表示開始位置
  end: number = 10; // データ表示終了位置

  // ページング処理
  pageChanged(event: any): void {
    this.start = this.itemsPerPage * (this.currentPage - 1);
    let tmpStart: number = +this.start;
    let tmpItemsPerPage: number = +this.itemsPerPage;
    this.end = tmpStart + tmpItemsPerPage;
  }
}