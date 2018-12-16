import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";

import {PagerService, ResultService} from '../_service';

import {Result} from '../_model';
import {SearchComponent} from "../search";
import {MatListOption, MatSelectionList, MatSidenav} from "@angular/material";
import {SelectionModel} from "@angular/cdk/collections";
import {DetailComponent} from "../detail";
import {forEach} from "@angular/router/src/utils/collection";
import {FormControl} from "@angular/forms";

@Component({
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.css']
})
export class ResultComponent implements OnInit, AfterViewInit {

  @ViewChild('search') searchComponent: SearchComponent;
  @ViewChild('detail') detailView: DetailComponent;

  @ViewChild('sidenav') sideNav: MatSidenav;
  @ViewChild('resultList') selectionList: MatSelectionList;

  allResults: Result[];
  pagedResults: Result[];
  results: Result[];
  pager: any = {};
  entityTypes: string[] = ["Person", "Enterprise", "Entity"];
  entities = new FormControl(this.entityTypes);
  listTypes: string[] = ["UN List", "EU_SANCTION_LIST", "US_TREASURY_SANCTION_LIST"];
  crimeLists = new FormControl(this.listTypes);

  constructor(
    private resultService: ResultService,
    private activeRoute: ActivatedRoute,
    private pagerService: PagerService,
    private router: Router) {
    this.router.events.subscribe((event)  => {
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
        () => {
        this.results = this.allResults;
        this.setPage(1);

        console.log("loading done"); });
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
    // get pager object from service
    this.pager = this.pagerService.getPager(this.results.length, page);

    // get current page of items
    this.pagedResults = this.results.slice(this.pager.startIndex, this.pager.endIndex + 1);

    // set current selection
    this.detailView.setSelection(this.pagedResults[0]);
  }

  onResultSelected(e): void {
    this.detailView.setSelection(e.option.value as Result);
    if(this.isMobile())
      this.sideNav.toggle().then(/*nothing to do*/);
  }

  getIcon(entityType: string): string {
    let icon: string;
    switch (entityType) {
      case "Person":
        icon = "person";
        break;
      case "Entity":
        icon = "bubble_chart";
        break;
      case "Enterprise":
        icon = "domain";
        break;
      default:
        break;
    }
    return icon;
  }

  onFilterEntity(e): void {
    this.results =
      this.allResults.filter((result) =>
        e.value.indexOf(result.entityType) > -1);

    this.setPage(1);
  }

  onFilterList(e): void {
    this.results =
      this.allResults.filter((result) =>
        e.value.indexOf(result.listType) > -1);

    this.setPage(1);
  }
}

