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

    // ヘッダーのキーワードを入力してエンターを押した
    onKeyWordEnter(value: string) {
      console.log("キーワード検索処理");
      console.log(value);
    }
  
    // ログアウト処理
    logout(){
      console.log("ログアウト処理");
    }

}