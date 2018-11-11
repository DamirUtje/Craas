import { Component, OnInit } from '@angular/core';

import { DataService } from '../_service/data.service';
import { PagerService } from '../_service';

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

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {

    this.inputString = this.dataService.getSearchString();
    this.allItems = this.dataService.getFakeData();
    this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onSubmit() {

    // TODO: fetch Data by searchString

    if(this.inputString){

    }
  }

}

