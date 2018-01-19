import { Component, TemplateRef, ViewChild,Output,EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { JsonpService } from '../jsonp.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'incidentSearch-modal',
  templateUrl: './incidentSearch.modal.component.html',
  providers: [DatePipe],
  styleUrls: ['./modal.component.css']
})
export class IncidentSearchModalComponent {
  @ViewChild('template')
  template;
  modalRef: BsModalRef;

  // インシデント検索イベント
  @Output() incidentSearchSelect: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: BsModalService,private jsonpService: JsonpService,private datePipe: DatePipe) { }

  // 検索条件
  searchIncidentNo = "";
  searchCallContent = "";
  searchCallStartDateFrom = "";
  searchCallStartDateTo = "";
  searchIncidentType = "";
  searchIncidentTypeSyougai = "";
  searchIncidentTypeJiko = "";
  searchIncidentTypeClaim = "";
  searchIncidentTypeToiawase = "";
  searchIncidentTypeInfo = "";
  searchIncidentTypeOther = "";
  searchIncidentStatus = "";
  searchIncidentStatusCall = "";
  searchIncidentStatusTaio = "";
  searchIncidentStatusAct = "";

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

  // モーダル表示
  openModal() {
    this.clearIncidentSearch();
    this.template.show();
    this.search();
  }

  // 検索条件の初期化
  clearIncidentSearch() {
    this.searchIncidentNo = "";
    this.searchCallContent = "";
    this.searchCallStartDateFrom = "";
    this.searchCallStartDateTo = "";
    this.searchIncidentType = "";
    this.searchIncidentTypeSyougai = "";
    this.searchIncidentTypeJiko = "";
    this.searchIncidentTypeClaim = "";
    this.searchIncidentTypeToiawase = "";
    this.searchIncidentTypeInfo = "";
    this.searchIncidentTypeOther = "";
    this.searchIncidentStatus = "";
    this.searchIncidentStatusCall = "";
    this.searchIncidentStatusTaio = "";
    this.searchIncidentStatusAct = "";
  }
  // 検索処理
search() {
  // 検索パラメータの作成
  let ps = new URLSearchParams();
  
  ps.set("incidentNo", this.searchIncidentNo);
  ps.set("callContent", this.searchCallContent);
  ps.set("callStartDateFrom", this.datePipe.transform(this.searchCallStartDateFrom,'yyyy/MM/dd'));
  ps.set("callStartDateTo", this.datePipe.transform(this.searchCallStartDateTo,'yyyy/MM/dd'));
  ps.set("incidentType", this.searchIncidentType);
  ps.set("incidentTypeSyougai", this.searchIncidentTypeSyougai);
  ps.set("incidentTypeJiko", this.searchIncidentTypeJiko);
  ps.set("incidentTypeClaim", this.searchIncidentTypeClaim);
  ps.set("incidentTypeToiawase", this.searchIncidentTypeToiawase);
  ps.set("incidentTypeInfo", this.searchIncidentTypeInfo);
  ps.set("incidentTypeOther", this.searchIncidentTypeOther);
  ps.set("incidentStatus", this.searchIncidentStatus);
  ps.set("incidentStatusCall", this.searchIncidentStatusCall);
  ps.set("incidentStatusTaio", this.searchIncidentStatusTaio);
  ps.set("incidentStatusAct", this.searchIncidentStatusAct);

  // 検索
  this.jsonpService.commonRequestGet('IncidentListDataGet.php', ps)
    .subscribe(
    data => {
      // 通信成功時
      console.group("IncidentSearchModalComponent.search() success");
      console.log(data);
      console.groupEnd();
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
      console.group("IncidentSearchModalComponent.search() fail");
      console.log('サーバとのアクセスに失敗しました。');
      console.log(error);
      console.groupEnd();
      return false;
    }
    );
}

// インシデント情報検索結果リスト
incidentList = [];
// 画面表示パラメータのセット処理
setDspParam(data) {
  // ページングの設定
  this.bigTotalItems = data.length;
  // インシデント情報 リストをセット
  this.incidentList = data;
}

// 選択ボタンクリック
onSelect(incidentNo: any,incidentType: any,incidentStatus :any,incidentStatusString :any,callDate:any) {
  // インシデント情報 
  this.incidentSearchSelect.emit({
    "incidentNo": incidentNo
    ,"incidentType":incidentType
    ,"incidentStatus":incidentStatus
    ,"incidentStatusString":incidentStatusString
    ,"callDate":  this.datePipe.transform(callDate,'yyyy/MM/dd')
    ,"callDateTime": this.datePipe.transform(callDate,'HH:mm')
  });
  // モーダルの非表示
  this.template.hide();
}

  // TODO 一時表示用　固定インシデント情報 
  // incidentList = [
  //   {
  //     "incidentNo": "2017091000", "incidentStatus": "処置入力済", "incidentType": "障害", "incidentTypeValue": 1,
  //     "memo": "中央監視装置の障害。西浄化センターにて、10時過ぎから中央監視装置全てからの操作・監視ができなくなった。なお、エラー表示、メッセージ等は出ていない。当方現場に向かっている最中なので詳細は分からない。監視装置(LCD)は4台である。連絡先は、事務所へ願いたい。特に担当者は指定しない。",
  //     "kijoNm": "秋田市仁井田浄水場", "setubiNm": "XXポンプ",
  //     "prefNm": "秋田県", "incidentStartDateTime": "2017/09/20", "callDate": "2017/09/20",
  //     "relatePj": "有", "relateJiko": "", "relateMr2": "有", "relateHiyo": "",
  //   },
  //   {
  //     "incidentNo": "2017091020", "incidentStatus": "処置入力済", "incidentType": "問合せ", "incidentTypeValue": 3,
  //     "memo": "中央監視装置の障害。",
  //     "kijoNm": "万世橋浄水場", "setubiNm": "XYポンプ",
  //     "prefNm": "東京都", "incidentStartDateTime": "2017/09/20", "callDate": "2017/09/20",
  //     "relatePj": "", "relateJiko": "有", "relateMr2": "有", "relateHiyo": "",
  //   },
  //   {
  //     "incidentNo": "2017091750", "incidentStatus": "対応入力済", "incidentType": "障害", "incidentTypeValue": 1,
  //     "memo": "中央監視装置の障害。",
  //     "kijoNm": "秋田浄水場", "setubiNm": "ポンプ",
  //     "prefNm": "秋田県", "incidentStartDateTime": "2017/09/19", "callDate": "2017/09/19",
  //     "relatePj": "", "relateJiko": "", "relateMr2": "", "relateHiyo": "有",
  //   },
  //   {
  //     "incidentNo": "2017092050", "incidentStatus": "処置入力済", "incidentType": "問合せ", "incidentTypeValue": 3,
  //     "memo": "中央監視装置の障害。西浄化センターにて、10時過ぎから中央監視装置全てからの操作・監視ができなくなった。なお、エラー表示、メッセージ等は出ていない。当方現場に向かっている最中なので詳細は分からない。監視装置(LCD)は4台である。連絡先は、事務所へ願いたい。特に担当者は指定しない。",
  //     "kijoNm": "愛知浄水場", "setubiNm": "ポンプ",
  //     "prefNm": "愛知県", "incidentStartDateTime": "2017/09/18", "callDate": "2017/09/18",
  //     "relatePj": "有", "relateJiko": "有", "relateMr2": "", "relateHiyo": "",
  //   },
  //   {
  //     "incidentNo": "2017096020", "incidentStatus": "受付済", "incidentType": "障害", "incidentTypeValue": 1,
  //     "memo": "中央監視装置の障害。西浄化センターにて、10時過ぎから中央監視装置全てからの操作・監視ができなくなった。なお、エラー表示、メッセージ等は出ていない。当方現場に向かっている最中なので詳細は分からない。監視装置(LCD)は4台である。連絡先は、事務所へ願いたい。特に担当者は指定しない。",
  //     "kijoNm": "神奈川浄水場", "setubiNm": "ポンプ",
  //     "prefNm": "神奈川県", "incidentStartDateTime": "2017/09/17", "callDate": "2017/09/17",
  //     "relatePj": "", "relateJiko": "", "relateMr2": "有", "relateHiyo": "",
  //   },
  //   {
  //     "incidentNo": "2017093000", "incidentStatus": "処置入力済", "incidentType": "障害", "incidentTypeValue": 1,
  //     "memo": "",
  //     "kijoNm": "山梨浄水場", "setubiNm": "ポンプ",
  //     "prefNm": "山梨県", "incidentStartDateTime": "2017/09/16", "callDate": "2017/09/16",
  //     "relatePj": "", "relateJiko": "", "relateMr2": "有", "relateHiyo": "",
  //   },
  //   {
  //     "incidentNo": "2017091310", "incidentStatus": "受付済", "incidentType": "障害", "incidentTypeValue": 1,
  //     "memo": "中央監視装置の障害。西浄化センターにて、10時過ぎから中央監視装置全てからの操作・監視ができなくなった。なお、エラー表示、メッセージ等は出ていない。当方現場に向かっている最中なので詳細は分からない。監視装置(LCD)は4台である。連絡先は、事務所へ願いたい。特に担当者は指定しない。",
  //     "kijoNm": "釧路浄水場", "setubiNm": "送水ポンプ",
  //     "prefNm": "北海道", "incidentStartDateTime": "2017/09/15", "callDate": "2017/09/15",
  //     "relatePj": "有", "relateJiko": "有", "relateMr2": "有", "relateHiyo": "",
  //   },
  //   {
  //     "incidentNo": "2017097562", "incidentStatus": "処置入力済", "incidentType": "障害", "incidentTypeValue": 1,
  //     "memo": "中央監視装置の障害。西浄化センターにて、10時過ぎから中央監視装置全てからの操作・監視ができなくなった。なお、エラー表示、メッセージ等は出ていない。当方現場に向かっている最中なので詳細は分からない。監視装置(LCD)は4台である。連絡先は、事務所へ願いたい。特に担当者は指定しない。",
  //     "kijoNm": "釧路浄水場", "setubiNm": "送水ポンプ",
  //     "prefNm": "東京都", "incidentStartDateTime": "2017/09/10", "callDate": "2017/09/10",
  //     "relatePj": "", "relateJiko": "", "relateMr2": "有", "relateHiyo": "",
  //   },
  //   {
  //     "incidentNo": "2017090534", "incidentStatus": "処置入力済", "incidentType": "事故", "incidentTypeValue": 2,
  //     "memo": "中央監視装置の障害。西浄化センターにて、10時過ぎから中央監視装置全てからの操作・監視ができなくなった。なお、エラー表示、メッセージ等は出ていない。当方現場に向かっている最中なので詳細は分からない。監視装置(LCD)は4台である。連絡先は、事務所へ願いたい。特に担当者は指定しない。",
  //     "kijoNm": "北総浄水場", "setubiNm": "床排水ポンプ",
  //     "prefNm": "千葉県", "incidentStartDateTime": "2017/09/05", "callDate": "2017/09/05",
  //     "relatePj": "有", "relateJiko": "有", "relateMr2": "", "relateHiyo": "",
  //   },
  //   {
  //     "incidentNo": "2017092234", "incidentStatus": "受付済", "incidentType": "クレーム", "incidentTypeValue": 4,
  //     "memo": "中央監視装置の障害。西浄化センターにて、10時過ぎから中央監視装置全てからの操作・監視ができなくなった。なお、エラー表示、メッセージ等は出ていない。当方現場に向かっている最中なので詳細は分からない。監視装置(LCD)は4台である。連絡先は、事務所へ願いたい。特に担当者は指定しない。",
  //     "kijoNm": "福井浄水場", "setubiNm": "送水ポンプ",
  //     "prefNm": "福井県", "incidentStartDateTime": "2017/09/01", "callDate": "2017/09/01",
  //     "relatePj": "有", "relateJiko": "", "relateMr2": "有", "relateHiyo": "有",
  //   }
  // ];
}