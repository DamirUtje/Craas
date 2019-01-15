import {ChangeDetectorRef, Component, Injectable, OnInit} from '@angular/core';
import {Result} from "../_model";
import {Observable, of} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ResultService} from "../_service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['search.component.css']
})
@Injectable()
export class SearchComponent implements OnInit {
  selectedResult: Result;
  suggestions: Observable<Result[]>;
  favorites: Result[];
  searchForm: FormGroup;
  inputString: string;

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
        switchMap(input => input ?
          this.resultService.loadSuggestions(input) : of([]))
      );

    this.resultService.loadPopular()
      .subscribe(
        result => this.favorites = result,
        error1 => {},
        () => {}
      );
  }

  onSubmit(): void {
    // https://stackblitz.com/angular/ooqemvjyqkb?file=src%2Fapp%2Fheroes%2Fheroes.service.ts
    this.inputString = this.selectedResult ?
      this.selectedResult.displayName :
      this.searchForm.get('userInput').value;

    if (this.inputString && this.inputString.trim()) {
      this.router.navigate(["/result", {term: this.inputString}])
        .then(/*nothing to do*/);
    }
  }

  onSelect(e): void {
    this.selectedResult = e.option.value as Result;
    this.setInput(this.selectedResult.displayName);
    this.onSubmit();
  }

  setInput(param: string): void {
    this.inputString = param;
    this.searchForm.get('userInput').setValue(this.inputString);
    this.resetSearch();
    this.changeDetector.detectChanges();
  }

  getInput(): string {
    return this.inputString;
  }

  resetSearch(): void {
    this.suggestions = of([]);
    this.initSearch();
  }
}
