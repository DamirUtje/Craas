import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {ResultService, PagerService} from '../_service';

import {Result} from '../_model';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Component({
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.css']
})
export class ResultComponent implements OnInit {

  searchField: FormControl = new FormControl();
  suggestions: Observable<Result[]>;
  loading: boolean = false;

  constructor(
    private pagerService: PagerService,
    private resultService: ResultService,
    private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      this.searchField.setValue(params['term']);
    });
  }

  allResults: Result[];
  pagedResults: Result[];
  pager: any = {};
  selectedResult: Result;

  ngOnInit() {
    this.suggestions = this.searchField.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      tap(_ => (this.loading = true)),
      switchMap(term => term ?
        this.resultService.loadSuggestions(term) : of([])),
      tap(_ => (this.loading = false))
    );
    this.loadResults();
  }

  // https://stackblitz.com/edit/angular-material-autocomplete-async1?file=src%2Fapp%2Fapp.service.ts
  loadResults(): void {
    let tpmArray: Result[] = [];
    this.resultService.loadResults(this.searchField.value).subscribe(
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

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allResults.length, page);

    // get current page of items
    this.pagedResults = this.allResults.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onResultSelected(result: Result){
    this.selectedResult = result;
  }

  onSuggestionSelected(result: Result){
    if (result) {

      //alert(result.vorname);
      this.searchField.setValue(result.vorname + " " + result.nachname);
      // start search

    }
  }

  onKeyDown(event) {

    alert(event);
    if (event.keyCode == 40) {

    }
  }

  onFocus(event) {

    alert(event);
    if (event.keyCode == 40) {

    }
  }

  onSubmit(result: Result) {

    if (result) {
      this.onSuggestionSelected(result);
      // start search


    }
  }

}

