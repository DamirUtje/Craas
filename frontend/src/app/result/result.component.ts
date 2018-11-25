import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {ResultService, PagerService} from '../_service';

import {Result} from '../_model';

@Component({
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.css']
})
export class ResultComponent implements OnInit {

  searchTerm: string;

  constructor(
    private pagerService: PagerService,
    private dataService: ResultService,
    private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      this.searchTerm = params['term'];
    });
  }

  allResults: Result[];
  pagedResults: Result[];
  pager: any = {};

  ngOnInit() {
    this.loadResults();
  }

  loadResults(): void {
    let tpmArray: Result[] = [];
    this.dataService.loadResults(this.searchTerm).subscribe(
      data => {
        for (var v in data)
          tpmArray.push(data[v]);
      },
      error => {
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

    if (this.searchTerm) {

    }
  }

}

