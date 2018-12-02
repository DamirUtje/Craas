import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";

import {ResultService} from '../_service';
import {Result} from "../_model";

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  selectedResult: Result;
  suggestions: Observable<Result[]>;
  loading: boolean = false;
  startForm: FormGroup;

  constructor(private router: Router,
              private resultService: ResultService,
              private formBuilder: FormBuilder) {
  }

  // https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/
  ngOnInit() {

    this.startForm = this.formBuilder.group({
      userInput: null
    });

    this.suggestions = this.startForm.get('userInput').valueChanges
      .pipe(
      debounceTime(100),
      distinctUntilChanged(),
      tap(_ => (this.loading = true)),
      switchMap(input => input ?
        this.resultService.loadSuggestions(input) : of([])),
      tap(_ => (this.loading = false))
    );
  }

  onSubmit() {
    // https://stackblitz.com/angular/ooqemvjyqkb?file=src%2Fapp%2Fheroes%2Fheroes.service.ts
    let input = this.selectedResult ?
      this.selectedResult.vorname + " " + this.selectedResult.nachname :
      this.startForm.get('userInput').value;

    if (input && input.trim())
      this.router.navigate(["/result", {term: input}]);
  }

  displayFn(result: Result) {
    if (result) { return result.vorname + " " + result.nachname; }
  }

  onSelect(result: Result) {
    this.selectedResult = result;
    this.onSubmit();
  }
}
