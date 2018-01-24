import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { JsonpService } from '../jsonp.service';

@Component({
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(private route: ActivatedRoute, private jsonpService: JsonpService) {}

    ngOnInit() {
      this.searchConditionName();
    }

    condList = [];

    // 検索条件名の検索
    searchConditionName() {

      // パラメータの作成
      let ps = new URLSearchParams();

      // 検索項目の検索
      this.jsonpService.requestGet('IncidentListConditionDelete.php', ps)
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

    // 画面表示パラメータのセット処理
    setDspParam(data) {
      this.condList = data;
    }

    // ログアウト処理
    logout() {
      console.log("ログアウト処理");
    }

    // リロード
    reload() {
      window.location.reload();
    }

    // ヘッダーのキーワードを入力してエンターを押した
    onKeyWordEnter(value: string) {
      console.log("キーワード検索処理");
      console.log(value);
      value= this.encodeUnicode(value);
      window.location.href = window.location.protocol + '//' + window.location.host + '/#/list/k/'+value;
      window.location.reload();
    }

    // コードは16位に変換する
    encodeUnicode(str) {
      var res = [];
      for ( var i=0; i<str.length; i++ ) {
        res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
      }
      return res.join("\\u");
    }
}