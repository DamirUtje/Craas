import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {FormControl} from "@angular/forms";
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";

import {ResultService} from '../_service';
import {Result} from "../_model";

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  searchField: FormControl;
  results: Observable<Result[]>;
  loading: boolean = false;

  constructor(private router: Router, private resultService: ResultService) {
  }

  // https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/
  ngOnInit() {
    this.searchField = new FormControl();
    this.results = this.searchField.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      tap(_ => (this.loading = true)),
      switchMap(term => term ?
        this.resultService.loadSuggestions(term) : of([])),
      tap(_ => (this.loading = false))
    );
  }

  onSearch(input: string) {
    // https://stackblitz.com/angular/ooqemvjyqkb?file=src%2Fapp%2Fheroes%2Fheroes.service.ts
    if (input && input.trim())
      this.router.navigate(["/result", {term: input}]);
  }
}
