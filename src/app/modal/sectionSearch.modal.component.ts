import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { JsonpService } from '../jsonp.service';

@Component({
  selector: 'sectionSearch-modal',
  templateUrl: './sectionSearch.modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class SectionSearchModalComponent {
  @ViewChild('template')
  template;

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  //検索条件
  searchPostCd="";
  searchSectionNm="";
  searchCompanyNm="";

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
  clearSectionSearch(){
    this.searchPostCd="";
    this.searchSectionNm="";
    this.searchCompanyNm="";
  }

  // TODO 一時表示用　固定部門情報 
  incidentList = [
    {
      "postCd": "65000", "sectionNm": "機器）シス機器）神戸", "companyNm": "FES神戸",
    }, 
       {
      "postCd": "65100", "sectionNm": "機器）シス機器）神戸）配電盤設計", "companyNm": "FES神戸",
    },
    {
      "postCd": "KOUNO", "sectionNm": "河野設計室", "companyNm": "河野設計室",
    },
    {
      "postCd": "Q1000", "sectionNm": "生産)東京工場", "companyNm": "FES東工",
    },
    {
      "postCd": "Q1100", "sectionNm": "生産)東工)生産部", "companyNm": "FES東工",
    },
    {
      "postCd": "Q110C", "sectionNm": "生産)東工)生産部)資材課", "companyNm": "FES東工",
    },
    {
      "postCd": "Q110D", "sectionNm": "生産)東工)生産部)作業研究課", "companyNm": "FES東工",
    },
    {
      "postCd": "Q110F", "sectionNm": "生産)東工)生産部)技能ソリューC", "companyNm": "FES東工",
    },
    {
      "postCd": "R5005", "sectionNm": "関西）総務部)大阪", "companyNm": "富士電機システムズ（株）",
    },
    {
      "postCd": "R5006", "sectionNm": "関西）総務部)神戸", "companyNm": "富士電機システムズ（株）",
    },
  ];
}