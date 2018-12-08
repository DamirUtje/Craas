import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";

import {PagerService, ResultService} from '../_service';

import {Result} from '../_model';
import {SearchComponent} from "../search";
import {MatListOption, MatSelectionList, MatSidenav} from "@angular/material";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ResultComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav') sideNav: MatSidenav;
  @ViewChild('search') searchComponent: SearchComponent;
  @ViewChild('resultList') selectionList: MatSelectionList;

  allResults: Result[];
  pagedResults: Result[];
  pager: any = {};
  selectedResult: Result;

  constructor(
    private resultService: ResultService,
    private activeRoute: ActivatedRoute,
    private pagerService: PagerService,
    private router: Router) {
    this.router.events.subscribe((event: Event)  => {
      if (event instanceof NavigationStart) {
        this.loadResults();
      }
    });
  }

  ngOnInit(): void {
    this.selectionList.selectedOptions =
      new SelectionModel<MatListOption>(false);
  }

  ngAfterViewInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.searchComponent.setInput(params['term']);
    });
    this.loadResults();
  }

  loadResults(): void {
    let term: string = this.searchComponent.getInput();
    this.resultService.loadResults(term)
      .subscribe(results => this.allResults = results,
        () => {}, // error handling in service class
        () => { this.setPage(1); });
  }

  // https://stackblitz.com/edit/angular-material-autocomplete-async1?file=src%2Fapp%2Fapp.service.ts
  isMobile(): boolean {
    if(window.innerWidth <= 800 && window.innerHeight <= 600) {
      return true;
    } else {
      return false;
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      //return; TODO remove?
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allResults.length, page);

    // get current page of items
    this.pagedResults = this.allResults.slice(this.pager.startIndex, this.pager.endIndex + 1);

    // set current selection
    this.selectedResult = this.pagedResults[0];
  }

  onResultSelected(e): void {
    this.selectedResult = e.option.value as Result;
    if(this.isMobile())
      this.sideNav.toggle();
  }
}

