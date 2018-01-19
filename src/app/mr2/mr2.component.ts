import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { JsonpService } from '../jsonp.service';
import { WindowRefService } from '../windowRef.service';

@Component({
  selector: 'my-mr2',
  templateUrl: './mr2.component.html',
  styleUrls: ['./mr2.component.css']
})
export class Mr2Component implements OnInit {

  nativeWindow: any;
  constructor(private route: ActivatedRoute, private jsonpService: JsonpService, private winRef: WindowRefService) {
    this.nativeWindow = winRef.getNativeWindow();
  }

  mr2Data = [];

  ngOnInit() {

    this.route.data.subscribe(obj => console.log(obj['category']));

    let ps = new URLSearchParams();
    let mkbId = this.route.snapshot.paramMap.get('mkbId');
    if (mkbId) {
      ps.set('callNo', mkbId); // TODO API TEST用
      ps.set('mkbId', mkbId);
    }

    // 画面表示パラメータの取得処理
    this.jsonpService.pscApiRequestGet('mr2HeadData', ps)
      .subscribe(
      data => {
        // 通信成功時
        console.log("受付番号成功");
        console.log(data);
        // if (data[0]) {
        //   let list = data[0];
        //   if (list[0].result !== '' && list[0].result == true) {
        //     // 画面表示パラメータのセット処理
        //     this.setDspParam(list.slice(1)); // 配列1つ目は、サーバ処理成功フラグなので除外
        //   }
        // }
      },
      error => {
        // 通信失敗もしくは、コールバック関数内でエラー
        console.log("受付番号失敗");
        console.log(error);
        console.log('サーバとのアクセスに失敗しました。');
        return false;
      }
      );

    // 画面表示パラメータの取得処理
    this.jsonpService.pscApiRequestGet('mr2HeadData', ps)
      .subscribe(
      data => {
        // 通信成功時
        console.log("MKBID成功");
        console.log(data);
        // if (data[0]) {
        //   let list = data[0];
        //   if (list[0].result !== '' && list[0].result == true) {
        //     // 画面表示パラメータのセット処理
        //     this.setDspParam(list.slice(1)); // 配列1つ目は、サーバ処理成功フラグなので除外
        //   }
        // }
      },
      error => {
        // 通信失敗もしくは、コールバック関数内でエラー
        console.log("MKBID失敗");
        console.log(error);
        console.log('サーバとのアクセスに失敗しました。');
        return false;
      }
      );
  }


  // 画面表示パラメータのセット処理
  setDspParam(data) {
    this.mr2Data = data;
  }

}