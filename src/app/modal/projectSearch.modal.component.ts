import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { JsonpService } from '../jsonp.service';

@Component({
  selector: 'projectSearch-modal',
  templateUrl: './projectSearch.modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ProjectSearchModalComponent {
  @ViewChild('template')
  template;

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  // 検索条件
  searchPjNo = "";
  searchInqNo = "";
  searchConsumerNm = "";
  searchSummaryNm = "";

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

  // 検索条件の初期化
  clearProjectSearch() {
    this.searchPjNo = "";
    this.searchInqNo = "";
    this.searchConsumerNm = "";
    this.searchSummaryNm = "";
  }

  // TODO 一時表示用　固定インシデント情報 
  projectList = [
    {
      "pjNo": "1",
      "inqNo": "2",
      "consumerNm": "3",
      "summaryNm": "4"
    }
  ];
}