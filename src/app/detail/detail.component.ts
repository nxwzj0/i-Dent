import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { JsonpService } from '../jsonp.service';

import { environment } from '../../environments/environment.local';

@Component({
  selector: 'my-app',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private jsonpService: JsonpService) { }

  ngOnInit() {
    this.route.data.subscribe(obj => console.log(obj['category']));

    let ps = new URLSearchParams();
    let prmIncientId = this.route.snapshot.paramMap.get('incidentId');
    if(prmIncientId){
      ps.set('incidentId', prmIncientId);
    }

    // 画面表示パラメータの取得処理
    this.jsonpService.requestGet('IncidentDataGet.php', ps)
      .subscribe(
      data => {
        // 通信成功時
        if (data[0]) {
          let one = data[0];
          if (one.result !== '' && one.result == true) {
            // 画面表示パラメータのセット処理
            this.setDspParam(one);
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

  //新しいウィンドウを開く(パターン1)
  // CMN_openNewWindow1(url,name,sizex,sizey,top,left){
  CMN_openNewWindow1(url, name, sizex, sizey) {
    var style = "toolbar=0,location=0,directories=0,status=yes,menubar=0,scrollbars=1,resizable=1," +
      "width=" + sizex + ",height=" + sizey;
    // if( top ){
    // 	style += ",top="+top;
    // }  
    // if( left ){
    // 	style += ",left="+left;
    // }
    var win = window.open(url, name, style);
    if (win) {
      win.focus();
      return win;
    }
  }

  SUB_WIN = null;
  // 関連MR2表示処理
  showMr2() {
    if (this.SUB_WIN) this.SUB_WIN.close();
    this.SUB_WIN = this.CMN_openNewWindow1("./#/mr2", "sub_mr2", 1000, 760);
  }

  // 関連プロジェクト表示処理
  showPj() {
    if (this.SUB_WIN) this.SUB_WIN.close();
    this.SUB_WIN = this.CMN_openNewWindow1("./#/project", "sub_project", 1000, 760);
  }


  // 関連事故クレーム情報表示処理
  showJiko() {
    if (this.SUB_WIN) this.SUB_WIN.close();
    let url = environment.jikoPath + "jiko171211.html"; // 環境に合わせたURLを作成する TODO:固定値
    this.SUB_WIN = this.CMN_openNewWindow1(url, "sub_jiko", 1200, 800);
  }

  // 関連費用決済申請表示処理 TODO:固定値表示
  showHiyo(status, division, idno, bno, system_id, gougi_answer) {

    if (system_id == "") {
      system_id = "1282";
    }

    // var frm = window.document.fm1;
    var strurl;

    strurl = environment.hiyoPath + "wf_main_input.php";
    strurl += "?user_id=ADF";
    strurl += "&authority=9";
    //	strurl += "&system_id=1282";
    strurl += "&system_id=" + system_id;
    strurl += "&status=" + status;
    strurl += "&division=" + division;
    strurl += "&idno=" + idno;
    strurl += "&win_kbn=1";
    if (gougi_answer) strurl += "&gougi_answer_mode=Y";

    strurl += '&unit_flg=';
    strurl += '&main_system_id=';
    strurl += '&main_idno=';
    strurl += '&param1=';
    strurl += '&param2=';
    strurl += '&param3=';
    //	URLにBNOが含まれているかどうか？
    if (bno != "") {
      strurl = strurl.replace("BNO=&", "BNO=" + bno + "&");
    }

    this.SUB_WIN = this.CMN_openNewWindow1(strurl, "WF_EDIT", 1200, 800);
    return;

  }

  // 関連インシデント表示処理
  showRelateIncident() {

  }

  // TODO:サブウインドウから値を取得する時に使うかも
  onSelectOs(idx) {
    // let frm = window.document.frmList;
    let win = window.parent;
    console.log(win);
    // if (frm.ary_os_code.length) {
    // win.code = frm.ary_code[idx - 1].value;
    // win.oscode = frm.ary_os_code[idx - 1].value;
    // win.inqcode = frm.ary_inq_code[idx - 1].value;
    // win.osendcustomer = frm.ary_os_endcustomer[idx - 1].value;
    // win.ossoukatuhin = frm.ary_os_soukatuhin[idx - 1].value;
    // win.jcode = frm.ary_jcode[idx - 1].value;
    // win.seihinkeiretu = frm.ary_seihin_keiretu[idx - 1].value;
    // win.seihinkeiretu_cd = frm.ary_seihin_keiretu_cd[idx - 1].value;
    // win.oskeiyaku = frm.ary_os_keiyaku[idx - 1].value;
    // } else {
    // win.code = frm.ary_code.value;
    // win.oscode = frm.ary_os_code.value;
    // win.inqcode = frm.ary_inq_code.value;
    // win.osendcustomer = frm.ary_os_endcustomer.value;
    // win.ossoukatuhin = frm.ary_os_soukatuhin.value;
    // win.jcode = frm.ary_jcode.value;
    // win.seihinkeiretu = frm.ary_seihin_keiretu.value;
    // win.seihinkeiretu_cd = frm.ary_seihin_keiretu_cd.value;
    // win.oskeiyaku = frm.ary_os_keiyaku.value;
    // }
    // if (ExistsOpener(win)) {
    //   if (IsFunction(win.opener.onSubWinOK)) {
    //     win.opener.onSubWinOK(window.top); win.top.close();
    //   }
    // }
  }

  // 画面表示パラメータの初期化
  // １．メインパネル
  // １－１．ヘッダー
  incidentNo = ""; // インシデント番号
  incidentStatusCd = ""; // インシデントステータスCD
  incidentStatusNm = ""; // インシデントステータス名
  incidentTypeCd = ""; // インシデント分類CD
  incidentTypeNm = ""; // インシデント分類名
  insDate = ""; // 登録日
  insUserNm = ""; // 登録者
  updDate = "" // 更新日
  updUserNm = ""; // 更新者

  // １－２．メイン情報
  parentIncidentNo = ""; // 親インシデント番号
  incidentStartDateTime = ""; // 発生日時
  industryTypeNm = ""; // 業種区分名
  infoSourceCd = ""; // 情報提供元CD
  infoSourceNm = ""; // 情報提供元名
  infoProvider = ""; // 情報提供者
  infoProvidedTel = ""; //情報提供TEL  
  relateList = []; // 関係者
  memo = ""; //注記  
  kijoNm = ""; //機場名
  jigyosyutaiNm = ""; //事業主体名
  setubiNm = ""; //設備名
  prefNm = ""; //都道府県名
  custNm = ""; //顧客名
  custTypeNm = ""; //顧客分類名
  salesDeptCd = ""; //営業部門CD
  salesDeptNm = ""; //営業部門名
  salesUserId = ""; //営業担当者ID
  salesUserNm = ""; //営業担当者名
  deliveryPjNm = ""; //納入プロジェクト
  custDept = ""; //会社名・所属部署
  requester = ""; //依頼者
  contactTel = ""; //連絡先(TEL)
  contactFax = ""; //連絡先(FAX)
  contactMail = ""; //連絡先(E-mail)  
  skanDeptCd = ""; //主管部門CD
  skanDeptNm = ""; //主管部門名
  skanUserId = ""; //主管担当者ID
  skanUserNm = ""; //主管担当者名

  // １－３．受付情報
  callDate = ""; //受付日
  callStartDate = ""; //受付開始時刻
  callEndDate = ""; //受付終了時刻
  callDeptCd = ""; //受付部署CD
  callDeptNm = ""; //受付部署名
  callUserId = ""; //受付者ID
  callUserNm = ""; //受付者名
  callTel = ""; //受付電話番号
  callMail = ""; //受付メール
  callContent = ""; //受付内容

  // １－４．対応情報
  taioDate = ""; //対応日
  taioStartDate = ""; //対応開始時刻
  taioEndDate = ""; //対応終了時刻
  taioDeptCd = ""; //対応部署CD
  taioDeptNm = ""; //対応部署名
  taioUserId = ""; //対応者ID
  taioUserNm = ""; //対応者名  
  taioTel = ""; //対応電話番号
  taioMail = ""; //対応メール
  taioContent = ""; //対応内容

  // １－５．処置情報
  actDate = ""; //処置予定日
  actTypeNm = ""; //処置区分名
  actStartDateTime = ""; //処置開始日時
  actEndDateTime = ""; //処置終了日時
  actDeptCd = ""; //処置部署CD
  actDeptNm = ""; //処置部署名
  actUserId = ""; //処置者ID
  actUserNm = ""; //処置者名
  actTel = ""; //処置電話番号
  actMail = ""; //処置メール
  actContent = ""; //処置内容

  // １－６．製品情報
  productTypeCd = ""; //機種区分CD
  productTypeNm = ""; //機種区分名
  productTriggerCd = ""; //障害状況トリガーCD
  productTriggerNm = ""; //障害状況トリガー名
  productHindoCd = ""; //障害状況頻度CD
  productHindoNm = ""; //障害状況頻度名
  productGensyoCd = ""; //障害状況現象CD
  productGensyoNm = ""; //障害状況現象名
  productStatusCd = ""; //障害状況状態CD
  productStatusNm = ""; //障害状況状態名


  // 画面表示パラメータのセット処理
  setDspParam(data) {
    this.incidentNo = data.incidentNo; // インシデント番号
    this.incidentStatusCd = data.incidentStatusCd; // インシデントステータスCD
    this.incidentStatusNm = data.incidentStatusNm; // インシデントステータス名
    this.incidentTypeCd = data.incidentTypeCd // インシデント分類CD
    this.incidentTypeNm = data.incidentTypeNm // インシデント分類名
    this.insDate = data.insDate // 登録日
    this.insUserNm = data.insUserNm // 登録者
    this.updDate = data.updDate // 更新日
    this.updUserNm = data.updUserNm // 更新者

    // １－２．メイン情報    
    this.parentIncidentNo = data.parentIncidentNo; // 親インシデント番号
    this.incidentStartDateTime = data.incidentStartDateTime; // 発生日時
    this.industryTypeNm = data.industryTypeNm; // 業種区分名
    this.infoSourceCd = data.infoSourceCd; // 情報提供元CD
    this.infoSourceNm = data.infoSourceNm; // 情報提供元名
    this.infoProvider = data.infoProvider; // 情報提供者
    this.infoProvidedTel = data.infoProvidedTel; //情報提供TEL
    this.relateList = data.relateList; //関係者
    this.memo = data.memo; //注記    
    this.kijoNm = data.kijoNm; //機場名
    this.jigyosyutaiNm = data.jigyosyutaiNm; //事業主体名
    this.setubiNm = data.setubiNm; //設備名
    this.prefNm = data.prefNm; //都道府県名
    this.custNm = data.custNm; //顧客名
    this.custTypeNm = data.custTypeNm; //顧客分類名
    this.salesDeptCd = data.salesDeptCd; //営業部門CD
    this.salesDeptNm = data.salesDeptNm; //営業部門名
    this.salesUserId = data.salesUserId; //営業担当者ID
    this.salesUserNm = data.salesUserNm; //営業担当者名
    this.deliveryPjNm = data.deliveryPjNm; //納入プロジェクト
    this.custDept = data.custDept; //会社名・所属部署
    this.requester = data.requester; //依頼者
    this.contactTel = data.contactTel; //連絡先(TEL)
    this.contactFax = data.contactFax; //連絡先(FAX)
    this.contactMail = data.contactMail; //連絡先(E-mail)
    this.skanDeptCd = data.skanDeptCd; //主管部門CD
    this.skanDeptNm = data.skanDeptNm; //主管部門名
    this.skanUserId = data.skanUserId; //主管担当者CD
    this.skanUserNm = data.skanUserNm; //主管担当者名

    // １－３．受付情報
    this.callDate = data.callDate; //受付日
    this.callStartDate = data.callStartDate; //受付開始時刻
    this.callEndDate = data.callEndDate; //受付終了時刻
    this.callDeptCd = data.callDeptCd; //受付部署CD
    this.callDeptNm = data.callDeptNm; //受付部署名
    this.callUserId = data.callUserId; //受付者ID
    this.callUserNm = data.callUserNm; //受付者名
    this.callTel = data.callTel; //受付電話番号
    this.callMail = data.callMail; //受付メール
    this.callContent = data.callContent; //受付内容

    // １－４．対応情報
    this.taioDate = data.taioDate; //対応日
    this.taioStartDate = data.taioStartDate; //対応開始時刻
    this.taioEndDate = data.taioEndDate; //対応終了時刻
    this.taioDeptCd = data.taioDeptCd; //対応部署CD
    this.taioDeptNm = data.taioDeptNm; //対応部署名
    this.taioUserId = data.taioUserId; //対応者ID
    this.taioUserNm = data.taioUserNm; //対応者名    
    this.taioTel = data.taioTel; //対応電話番号
    this.taioMail = data.taioMail; //対応メール
    this.taioContent = data.taioContent; //対応内容

    // １－５．処置情報
    this.actDate = data.actDate; //処置予定日
    this.actTypeNm = data.actTypeNm; //処置区分名
    this.actStartDateTime = data.actStartDateTime; //処置開始日時
    this.actEndDateTime = data.actEndDateTime; //処置終了日時
    this.actDeptCd = data.actDeptCd; //処置部署CD
    this.actDeptNm = data.actDeptNm; //処置部署名
    this.actUserId = data.actUserId; //処置者ID
    this.actUserNm = data.actUserNm; //処置者名
    this.actTel = data.actTel; //処置電話番号
    this.actMail = data.actMail; //処置メール
    this.actContent = data.actContent; //処置内容

    // １－６．製品情報
    this.productTypeCd = data.productTypeCd; //機種区分CD
    this.productTypeNm = data.productTypeNm; //機種区分名
    this.productTriggerCd = data.productTriggerCd; //障害状況トリガーCD
    this.productTriggerNm = data.productTriggerNm; //障害状況トリガー名
    this.productHindoCd = data.productHindoCd; //障害状況頻度CD
    this.productHindoNm = data.productHindoNm; //障害状況頻度名
    this.productGensyoCd = data.productGensyoCd; //障害状況現象CD
    this.productGensyoNm = data.productGensyoNm; //障害状況現象名
    this.productStatusCd = data.productStatusCd; //障害状況状態CD
    this.productStatusNm = data.productStatusNm; //障害状況状態名


  }


  /**
   * 以下、削除予定の固定値
   * 
   */

  // ２．関連リンク
  // ２ー１．プロジェクト情報
  PJNo = ""; // プロジェクト番号
  PJRespDept = ""; // PJ主管部門
  PJName = ""; // プロジェクト名
  PJManager = ""; // PM
  PJKijo = ""; // 代表機場
  PJPref = ""; // 都道府県

  // ２ー２．障害対応報告(MR2)
  MR2Title = ""; // 件名
  MR2MakeDate = ""; // 作成日
  MR2Iraimoto = ""; // 依頼元
  MR2WorkRep = ""; // 作業担当者

  // ２ー３．労災・事故・クレーム連絡
  rjcStatus = ""; // 状態
  rjcType = ""; // 区分
  rjcOverView = ""; // 概要
  rjcCustName = ""; // 顧客名
  rjcKijoName = ""; // 機場名
  rjcHakkoDate = ""; // 発行日
  rjcHakkomoto = ""; // 発行元

  // ２－４．費用決済申請
  hiyoHakkomoto = ""; // 発行元
  hiyoStatus = ""; // ステータス
  hiyoType = ""; // 区分
  hiyoNo = ""; // 決裁番号
  hiyoTitle = ""; // 件名
  hiyoAmount = ""; // 概算金額

  // ３．関連インシデント
  // ３－１．同一機場インシデント
  sameKijoIncidents = ""; // 配列で保持

  // ３－２．同一顧客インシデント
  sameCustIncidents = ""; // 配列で保持

  // ４．変更履歴
  chanegeRev = ""; // 配列で保持

}