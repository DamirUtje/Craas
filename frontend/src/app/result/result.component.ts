import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

import {PagerService, ResultService} from '../_service';

import {Result} from '../_model';
import {SearchComponent} from "../search";
import {DateAdapter, MatListOption, MatSelectionList, MatSidenav} from "@angular/material";
import {SelectionModel} from "@angular/cdk/collections";
import {DetailComponent} from "../detail";
import {FormControl} from "@angular/forms";
import {UtilService} from "../_service/util.service";

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
  isMobile: boolean = false;

  startDate = new FormControl(new Date(1990, 0, 1));
  endDate = new FormControl(new Date());

  constructor(
    private resultService: ResultService,
    private activeRoute: ActivatedRoute,
    private pagerService: PagerService,
    private router: Router,
    private dateAdapter: DateAdapter<Date>,
    private clientUtil: UtilService) {
    this.router.events.subscribe((event)  => {
      if (event instanceof NavigationEnd) {
        // fires when input has been submitted from SearchComponent
        if(!!this.results) {
          // skip first load due to results will be loaded afterInit
          this.loadResults();
          this.searchComponent.resetSearch();
        }

      }
    });
    this.dateAdapter.setLocale(this.clientUtil.getLocale());
    this.isMobile = clientUtil.isMobile();
  }

  ngOnInit(): void {
    this.selectionList.selectedOptions =
      new SelectionModel<MatListOption>(false);
  }

  ngAfterViewInit(): void {
    let searchParam: string;
    this.activeRoute.params.subscribe(params => {
        searchParam = params['term'];
    });
    if(searchParam) {
      this.searchComponent.setInput(searchParam);
      this.loadResults();
    }
  }

  loadResults(): void {
    let term: string = this.searchComponent.getInput();
    this.resultService.loadResults(term)
      .subscribe(results => this.allResults = results,
        () => {}, // error handling in ResultService
        () => {
          this.results = this.allResults;
          this.applyFilters(); });
  }

  // https://stackblitz.com/edit/angular-material-autocomplete-async1?file=src%2Fapp%2Fapp.service.ts

  setPage(page: number): void {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.results.length, page);

    // get current page of items
    this.pagedResults =
      this.results.slice(this.pager.startIndex, this.pager.endIndex + 1);

    // set initial selection
    this.detailView.setResult(this.pagedResults[0]);
  }

  onResultSelected(e): void {
    this.detailView.setResult(e.option.value as Result);
    if(this.clientUtil.isMobile())
      this.sideNav.toggle().then(/*nothing to do*/);
  }

  getIcon(entityType: string): string {
    switch (entityType) {
      case "Person": return "person";
      case "Entity": return "bubble_chart";
      case "Enterprise": return "domain";
      default: return '';
    }
  }

  applyFilters(): void {
    this.results = this.allResults
      .filter((result) =>
        this.entities.value.indexOf(result.entityType) > -1)
      .filter((result) =>
        this.crimeLists.value.indexOf(result.listType) > -1)
      .filter((result) => {
        let listed = Date.parse(result.listedOn);
        return !isNaN(listed)
          && this.startDate.value <= listed && listed <= this.endDate.value;
      });

    this.setPage(1)
  }
}

