import { Component, OnInit } from '@angular/core';

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

  allResults: Result[] = Result[0];
  pagedResults: Result[] = Result[0];
  pager: any = {};

  ngOnInit() {

    this.inputString = this.dataService.getSearchString();

    this.loadData();
  }

  loadData() {
    let tpmArray: Result[] = [];
    this.dataService.getData().subscribe(
      data => {
        for (var v in data)
          tpmArray.push(data[v]);
      },
      error=> {
        console.log("Error in recieving data");
      },
      () => {
        console.log("Fetching done");
        this.allResults = tpmArray;
        this.setPage(1);
      }
    );
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

