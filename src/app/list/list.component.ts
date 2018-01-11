import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/bs-moment';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { ja } from 'ngx-bootstrap/locale';
// datepikerの設定
defineLocale('ja', ja);

import { JsonpService } from '../jsonp.service';

@Component({
  selector: 'my-app',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private jsonpService: JsonpService) {
    this.bsConfig = Object.assign({}, { locale: this.locale });
  }

  ngOnInit() {
    console.log(11111111111);
    // ログイン情報設定
    this.userId = "userId";
    this.userName = "userName";
    this.sectionCd = "secCd";
    this.sectionName = "secName";
    // 検索条件のデフォルト設定
    this.setDefaultShow();
    this.route.data.subscribe(obj => console.log(obj['category']));
    let condId = this.route.snapshot.paramMap.get('condId');
    this.searchCondCondition(58);

    this.search();  }

  // 検索項目削除処理
  deleteCondition() {

  }

  // 検索項目追加処理
  addCondition() {
    let itemNm = this.selCondition;

    switch (itemNm) {
      case 'incidentTypeShow':
      this.incidentTypeShow = true;
      // 検索項目プルダウンを初期化
      this.selCondition = "0";
      break;
      case 'incidentStsShow':
        this.incidentStsShow = true;
        // 検索項目プルダウンを初期化
        this.selCondition = "0";
        break;
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
    if (this.incidentStartDateTimeShow && this.incidentStartDateTimeFrom != null && !this.dateFormatCheck("発生日時（開始）",this.incidentStartDateTimeFrom)) {
      return false;
    }
    if (this.incidentStartDateTimeShow && !this.lengthCheck("発生日時（終了）",this.incidentStartDateTimeTo,20)) {
      return false;
    }
    if (this.incidentStartDateTimeShow && this.incidentStartDateTimeTo != null && !this.dateFormatCheck("発生日時（終了）",this.incidentStartDateTimeTo)) {
      return false;
    }
    if (this.callDateShow && !this.lengthCheck("受付日（開始）",this.callStartDateFrom,20)) {
      return false;
    }
    if (this.callDateShow && this.callStartDateFrom != null && !this.dateFormatCheck("受付日（開始）",this.callStartDateFrom)) {
      return false;
    }
    if (this.callDateShow && !this.lengthCheck("受付日（終了）",this.callStartDateTo,20)) {
      return false;
    }
    if (this.callDateShow && this.callStartDateTo != null && !this.dateFormatCheck("受付日（終了）",this.callStartDateTo)) {
      return false;
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
  kijoNm 　= null;
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

  condFldShow = null;
  condFld = null;
  // 検索処理
  searchCondCondition(condId) {
    // 検索パラメータの作成
    let ps = new URLSearchParams();
    ps.set("condId", "58");

    // 検索
    this.jsonpService.requestGet('IncidentListSearchCondConditionGet.php', ps)
      .subscribe(
      data => {
        // 通信成功時
        console.log(data);
        for(var i=0;i<data.length;i++){
          var condFld = null;
          var condVal = null;
          var condFldShow = null;
          condFld = data[i]['COND_FLD'];
          condVal = data[i]['COND_VAL'];
        }

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

  //
  setShowAndVal(condFld,condVal){

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
    this.incidentList = data;
  }

  bsValue: Date;
  // date pikerの設定
  locale = 'ja';
  locales = listLocales();
  bsConfig: Partial<BsDatepickerConfig>;

  // $(window).scroll(function () {
  //   // スクロールイベント
  //   let this_scrollTop = $(this).scrollTop();

  //   if ($("#search-list").offset().top - this_scrollTop < 10) {
  //       $("#newTable").show();
  //   } else {
  //       $("#newTable").hide();
  //   }
  // });
}