import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Result} from "../_model";
import {Observable, of} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ResultService} from "../_service";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {MatListOption} from "@angular/material";

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent implements OnInit {
  selectedResult: Result;
  suggestions: Observable<Result[]>;
  loading: boolean = false;
  searchForm: FormGroup;

  constructor(private router: Router,
              private resultService: ResultService,
              private formBuilder: FormBuilder,
              private changeDetector: ChangeDetectorRef) {
  }

  // https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/
  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      userInput: null
    });

    this.initSearch();
  }

  initSearch(): void {
    this.suggestions = this.searchForm.get('userInput').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(_ => (this.loading = true)),
        switchMap(input => input ?
          this.resultService.loadSuggestions(input) : of([])),
        tap(_ => (this.loading = false))
      );
  }

  onSubmit(): void {
    // https://stackblitz.com/angular/ooqemvjyqkb?file=src%2Fapp%2Fheroes%2Fheroes.service.ts
    let input = this.selectedResult ?
      this.selectedResult.vorname + " " + this.selectedResult.nachname :
      this.searchForm.get('userInput').value;

    if (input && input.trim())
      this.router.navigate(["/result", {term: input}]);
  }

  onSelect(e): void {
    this.selectedResult = e.option.value as Result;
    this.onSubmit();
  }

  setInput(param: any): void {
    this.searchForm.get('userInput').setValue(param);
    this.resetSearch();
    this.changeDetector.detectChanges();
  }

  resetSearch() {
    this.suggestions = of([]);
    this.initSearch();
  }
}
