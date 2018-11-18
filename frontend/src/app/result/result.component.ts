import { Component, OnInit } from '@angular/core';

import { DataService } from '../_service/data.service';
import { PagerService } from '../_service';

import { Result } from '../_model/result';
import {Observable} from "rxjs";

@Component({
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.css']
})
export class ResultComponent implements OnInit {

  inputString: string;

  constructor(
    private pagerService: PagerService,
    private dataService: DataService
  ) { }

  allResults: Result[] = Result[0];
  pagedResults: Result[] = Result[0];
  pager: any = {};

    ngOnInit() {

    this.inputString = this.dataService.getSearchString();

    this.allResults = this.dataService.getResults();


    console.log(this.allResults);
    console.log(this.allResults.length);

    this.setPage(1);

  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allResults.length, page);

    // get current page of items
    this.pagedResults = this.allResults.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onSubmit() {

    // TODO: fetch Data by searchString

    if(this.inputString){

    }
  }

}

