import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { JsonpService } from '../jsonp.service';

import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'my-app',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css'],
})
export class TopComponent implements OnInit {

  constructor(private route: ActivatedRoute, private jsonpService: JsonpService) { }

  isLoading: boolean = true;
  incidentList = [];

  ngOnInit() {
    this.route.data.subscribe(obj => console.log(obj['category']));

    // 画面表示パラメータの取得処理
    this.isLoading = true;
    this.jsonpService.requestGet('IncidentListDataGet.php', new URLSearchParams())
    .subscribe(
    data => {
      // 通信成功時
      if (data[0]) {
        let list = data[0];
        if (list.result !== '' && list.result == true) {
          // 画面表示パラメータのセット処理
          this.setDspParam(data.slice(1)); // 配列1つ目は、サーバ処理成功フラグなので除外
        }
      }
      this.isLoading = false;
    },
    error => {
      // 通信失敗もしくは、コールバック関数内でエラー
      console.log(error);
      console.log('サーバとのアクセスに失敗しました。');
      this.isLoading = false;
      return false;
    }
    );
  } 

  // 詳細画面表示処理
  showDetail() {
    
  }

  // 画面表示パラメータのセット処理
  setDspParam(data) {
    this.incidentList = data;
  }

}