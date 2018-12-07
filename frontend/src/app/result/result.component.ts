import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {PagerService, ResultService} from '../_service';

import {Result} from '../_model';
import {SearchComponent} from "../search";
import {MatListOption, MatSelectionList} from "@angular/material";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.css']
})
export class ResultComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav') sideNav;
  @ViewChild('search') searchComponent: SearchComponent;
  @ViewChild('resultList') selectionList: MatSelectionList;

  allResults: Result[];
  pagedResults: Result[];
  pager: any = {};
  selectedResult: Result;

  constructor(
    private resultService: ResultService,
    private activeRoute: ActivatedRoute,
    private pagerService: PagerService) {
  }

  ngOnInit(): void {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
  }

  ngAfterViewInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.searchComponent.setInput(params['term']);
    });
    this.loadResults();
  }

  // https://stackblitz.com/edit/angular-material-autocomplete-async1?file=src%2Fapp%2Fapp.service.ts
  loadResults(): void {
    let tpmArray: Result[] = [];
    let term: string = this.searchComponent.searchForm.get('userInput').value;
    this.resultService.loadResults(term).subscribe(
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
        this.selectedResult = tpmArray[0];
      }
    );
  }

  isMobile(): boolean {
    if(window.innerWidth <= 800 && window.innerHeight <= 600) {
      return true;
    } else {
      return false;
    }
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

  onResultSelected(e): void {
    this.selectedResult = e.option.value as Result;
    if(this.isMobile())
      this.sideNav.toggle();
  }
}

