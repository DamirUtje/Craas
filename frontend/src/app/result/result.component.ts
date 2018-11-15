import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { DataService } from '../_service/data.service';
import { PagerService } from '../_service';

import { Result } from '../_model/result';

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

  private allResults: Result[];
  private pagedResults: Result[];
  private allItems: any[];
  private pagedItems: any[];
  private pager: any = {};

    ngOnInit() {

    this.inputString = this.dataService.getSearchString();
    this.allItems = this.dataService.getFakeData();
    this.setPage(1);

    this.loadData();

    console.log(JSON.stringify(this.allResults));

  }

  loadData(): void {
    this.allResults = this.dataService.getResults();
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    //this.pager = this.pagerService.getPager(this.allItems.length, page);
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    //this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onSubmit() {

    // TODO: fetch Data by searchString

    if(this.inputString){

    }
  }

}

