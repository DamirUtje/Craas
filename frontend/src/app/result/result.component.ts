import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

import {PagerService, DataService} from '../_service';

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
  entityTypes: string[];
  entityCtrl = new FormControl();
  listTypes: string[];
  listTypeCtrl = new FormControl();
  isMobile: boolean = false;
  countries: string[];
  countryCtrl = new FormControl();
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());
  deletedCount: number = 0;

  constructor(
    private dataService: DataService,
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
    if(this.isMobile && this.sideNav.opened)
      this.sideNav.toggle().then(/*nothing to do*/);
  }

  loadResults(): void {
    let term: string = this.searchComponent.getInput();
    this.dataService.loadResults(term)
      .subscribe(
        results => this.allResults = results,
        () => {}, // error handling in ResultService
        () => {
          this.results = this.allResults;
          this.createFilters();
          this.applyFilters();
      });
  }

  setPage(page: number): void {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.results.length, page);

    // get current page of items
    this.pagedResults =
      this.results.slice(this.pager.startIndex, this.pager.endIndex + 1);

    // set initial selection
    this.detailView.displayResult(this.pagedResults[0]);
  }

  onResultSelected(e): void {
    this.detailView.displayResult(e.option.value as Result);
    if(this.clientUtil.isMobile())
      this.sideNav.toggle().then(/*nothing to do*/);
  }

  showDetails(result: Result): void {
    this.dataService.setSelectedResult(result);
    this.router.navigate(["result/detail"]).then(/*nothing to do*/);
  }

  getIcon(entityType: string): string {
    switch (entityType) {
      case "Person": return "person";
      case "Entity": return "bubble_chart";
      case "Enterprise": return "domain";
      default: return '';
    }
  }

  createFilters(): void {
    this.createEntityFilter();
    this.createListFilter();
    this.createCountryFilter();
  }

  createEntityFilter(): void {
    let entities = [];
    this.allResults.filter(function(result) {
      return entities.indexOf(result.entityType) == -1 &&
        entities.push(result.entityType);
    });
    this.entityTypes = entities;
    this.entityCtrl.setValue(entities);
  }

  createListFilter(): void {
    let listTypes = [];
    this.allResults.filter(function(result) {
      return listTypes.indexOf(result.listType) == -1 &&
        listTypes.push(result.listType);
    });
    this.listTypes = listTypes;
    this.listTypeCtrl.setValue(listTypes);
  }

  createCountryFilter(): void {
    let countries = [];
    this.allResults.filter(function(result) {
      return countries.indexOf(result.country) == -1 &&
        countries.push(result.country);
    });
    this.countries = countries;
    this.countryCtrl.setValue(countries);
  }

  applyFilters(): void {
    this.results = this.allResults
      .filter((result) =>
        this.entityCtrl.value.indexOf(result.entityType) > -1)
      .filter((result) =>
        this.listTypeCtrl.value.indexOf(result.listType) > -1)
      .filter((result) =>
        this.countryCtrl.value.indexOf(result.country) > -1)
      .filter((result) => {
        if(result.deleted === true) {
          this.deletedCount++;
          let deletedDate: Date = new Date(result.deletedOn);
          return this.startDate.value <= deletedDate
            && deletedDate <= this.endDate.value;
        }
        else {
          return true;
        }
      });
    this.setPage(1);
  }

  resetAllFilters(): void {
    this.entityCtrl.reset();
    this.listTypeCtrl.reset();
    this.countryCtrl.reset();
    this.startDate.setValue(new Date());
    this.endDate.setValue(new Date());

    this.createFilters();
    this.applyFilters();
  }
}

