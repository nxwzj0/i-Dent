import { Component, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { JsonpService } from '../jsonp.service';

@Component({
  selector: 'conditionDelete-modal',
  templateUrl: './conditionDelete.modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ConditionDeleteModalComponent {

  @ViewChild('template')
  template;

  // listイベント(親コンポーネントのメソッド呼び出し)
  @Output() conDelButtonshowDelFlg: EventEmitter<any> = new EventEmitter();

  constructor(private route: ActivatedRoute, private jsonpService: JsonpService) {}

  modalRef: BsModalRef;

  condList = [];
  condNm = "";
  rdoCondNm = "";
  showDelFlg = false;
  // モーダル表示
  openModal(condName) {

    // パラメータの作成
    let ps = new URLSearchParams();
    // 検索項目の検索
    this.jsonpService.requestGet('IncidentListConditionDelete.php', ps)
    .subscribe(
    data => {
      // 通信成功時
      console.log('成功。');
      console.log(data);
      if(data.length == 0 ){
        this.showDelFlg = false;
        this.conDelButtonshowDelFlg.emit({ "showDelFlg": this.showDelFlg});
        this.delULElement(data);
        this.template.hide();
      }else{
        this.template.show();
        // 画面表示パラメータのセット処理
        this.setDspParam(data);
        if (condName == null || condName == "") {
          this.rdoCondNm = data[0].COND_NM;
        } else {
          this.rdoCondNm = condName;
        }
        this.showDelFlg = true;
        this.conDelButtonshowDelFlg.emit({ "showDelFlg": this.showDelFlg});
        this.delULElement(data);
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

  // 削除検索条件名メニュー
  delULElement(data) {
    var list = document.getElementById("condNmUl");
    var t=list.childNodes.length;
    for (var i=t-1;i>=0;i--){
      list.removeChild(list.childNodes[i]);
    }
    this.addULElement(data);
  }

  // 増加検索条件名メニュー
  addULElement(data)
  {
    var s=document.getElementById('condNmUl');
    for(var i=0;i<data.length;i++){
      var li = "<li _ngcontent-c2=''><a _ngcontent-c2='' onclick='window.location.reload();' routerlinkactive='current' ng-reflect-router-link='/list/" + data[i]['COND_ID'] + 
      "' ng-reflect-router-link-active-options='[object Object]' ng-reflect-router-link-active='current' href='#/list/" + data[i]['COND_ID'] + 
      "' class='current'>" + data[i]['COND_NM'] + "</a></li>"
      s.insertAdjacentHTML('afterbegin',li);
    }
  }

  // 画面表示パラメータのセット処理
  setDspParam(data) {
      this.condList = data;
  }

  // 検索項目削除処理
  conditionDelete() {
    if (confirm("検索条件を削除します。よろしいですか？")) {
      this.conditionDeleteTrue();
    }
    else {
        window.close();
    }
  }

  // 検索項目削除処理True
  conditionDeleteTrue() {

    // 検索パラメータの作成
    let ps = new URLSearchParams();
    ps.set("condNm", this.rdoCondNm);
    // 検索項目削除
    this.jsonpService.requestGet('IncidentListConditionDeleteRun.php', ps)
      .subscribe(
      data => {
        // 通信成功時
        console.log('成功。');
        alert("削除完了");
        this.openModal(null);
      },
      error => {
        // 通信失敗もしくは、コールバック関数内でエラー
        console.log(error);
        console.log('サーバとのアクセスに失敗しました。');
        alert("削除に失敗しました");
        return false;
      }
      );

  }
}