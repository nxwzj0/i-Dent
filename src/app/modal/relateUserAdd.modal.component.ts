import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { JsonpService } from '../jsonp.service';

@Component({
  selector: 'relateUserAdd-modal',
  templateUrl: './relateUserAdd.modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class RelateUserAddModalComponent {
  @ViewChild('template')
  template;

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  // ページングの設定
  maxSize: number = 5;
  bigTotalItems: number = 100;
  bigCurrentPage: number = 1;
  numPages: number = 0;
  itemsPerPage: number = 10;

  // ページング処理
  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  // モーダル表示
  openModal() {
    this.template.show();
  }


  // TODO 一時表示用　固定ユーザ情報 
  incidentList = [
    {
      "userNm": "担当者_1189", "mail": "kawamoto@adf.co.jp", "post": "部長", "sectionNm": "生産)東京工場",
    },
    {
      "userNm": "担当者_1043", "mail": "kawamoto@adf.co.jp", "post": "", "sectionNm": "生産)東工)盤装置部",
    },
    {
      "userNm": "担当者_5739", "mail": "kawamoto@adf.co.jp", "post": "", "sectionNm": "SIC）東京支店",
    },
    {
      "userNm": "担当者_0109", "mail": "kawamoto@adf.co.jp", "post": "副部長", "sectionNm": "富士電機XXXシステムズ（株）",
    },
    {
      "userNm": "担当者_0272", "mail": "kawamoto@adf.co.jp", "post": "", "sectionNm": "富士電機XXXシステムズ（株）",
    },
    {
      "userNm": "ＵＳ　０００１", "mail": "kawamoto@adf.co.jp", "post": "課長", "sectionNm": "ADF)第一システム部",
    },
    {
      "userNm": "ＵＳ　０００２", "mail": "kawamoto@adf.co.jp", "post": "", "sectionNm": "ADF)第一システム部",
    },
    {
      "userNm": "ＵＳ　０００３", "mail": "kawamoto@adf.co.jp", "post": "", "sectionNm": "ADF)第一システム部",
    },
    {
      "userNm": "ＵＳ　０００４", "mail": "kawamoto@adf.co.jp", "post": "", "sectionNm": "ADF)第一システム部",
    },
    {
      "userNm": "担当者_0111", "mail": "kawamoto@adf.co.jp", "post": "", "sectionNm": "ADF)第一システム部",
    },

  ];
}