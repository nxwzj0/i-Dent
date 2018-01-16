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

import { OrderByParam } from '../pipe/order.by.pipe';

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
    this.route.data.subscribe(obj => console.log(obj['category']));

    this.search();
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
      default:
        break;
    }
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

  // 日付型を日付フォーマット文字列に変更
  getDateStringFromDate(date) {

    if (date && date.getFullYear()) {
      var y: number = date.getFullYear();
      var m: number = date.getMonth();
      m++;
      var d: number = date.getDate();
      return y + "-" + m + "-" + d + " 00:00:00";
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

  selCondition = "0";
  incidentNoShow = true;
  callContentShow = true;

  // $(window).scroll(function () {
  //   // スクロールイベント
  //   let this_scrollTop = $(this).scrollTop();

  //   if ($("#search-list").offset().top - this_scrollTop < 10) {
  //       $("#newTable").show();
  //   } else {
  //       $("#newTable").hide();
  //   }
  // });

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