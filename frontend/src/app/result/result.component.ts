import { Component, OnInit } from '@angular/core';

import { PagerService } from '../_service';

@Component({
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(
    private pagerService: PagerService
  ) { }

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {
    this.allItems = [
      {
        "name": "Item 1"
      },
      {
        "name": "Item 2"
      },
      {
        "name": "Item 3"
      },
      {
        "name": "Item 4"
      },
      {
        "name": "Item 5"
      },
      {
        "name": "Item 6"
      },
      {
        "name": "Item 7"
      },
      {
        "name": "Item 8"
      },
      {
        "name": "Item 9"
      },
      {
        "name": "Item 10"
      },
      {
        "name": "Item 11"
      },
      {
        "name": "Item 12"
      },
      {
        "name": "Item 13"
      },
      {
        "name": "Item 14"
      },
      {
        "name": "Item 15"
      }];

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

}

