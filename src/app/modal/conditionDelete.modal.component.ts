import { Component, TemplateRef, ViewChild } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private jsonpService: JsonpService) {}

  modalRef: BsModalRef;

  condList = [];
  condNm = "";
  rdoCondNm = ""
  // モーダル表示
  openModal(condName) {
    this.template.show();
    // パラメータの作成
    let ps = new URLSearchParams();
    // 検索項目の検索
    this.jsonpService.requestGet('IncidentListConditionDelete.php', ps)
    .subscribe(
    data => {
      // 通信成功時
      console.log('成功。');
      console.log(data);
      // 画面表示パラメータのセット処理
      this.setDspParam(data);
      if (condName == null || condName == "") {
        this.rdoCondNm = data[0].COND_NM;
      } else {
        this.rdoCondNm = condName;
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
        this.openModal(null);
      },
      error => {
        // 通信失敗もしくは、コールバック関数内でエラー
        console.log(error);
        console.log('サーバとのアクセスに失敗しました。');
        return false;
      }
      );

  }
}