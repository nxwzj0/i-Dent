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

    // 检索条件名の検索
    searchConditionName() {

      // パラメータの作成
      let ps = new URLSearchParams();

      // 検索項目の検索
      this.jsonpService.requestGet('IncidentListConditionDelete.php', ps)
      .subscribe(
      data => {
        // 通信成功時
        console.log('成功。');
       
        // 画面表示パラメータのセット処理
        this.setDspParam(data);
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

    // ヘッダーのキーワードを入力してエンターを押した
    onKeyWordEnter(value: string) {
      console.log("キーワード検索処理");
      console.log(value);
    }
  
    // ログアウト処理
    logout(){
      console.log("ログアウト処理");
    }

    // リロード
    reload() {
      window.location.reload();
    }

}