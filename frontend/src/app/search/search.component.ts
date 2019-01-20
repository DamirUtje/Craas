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

    // TODO: implement api path
    //this.resultService.loadPopular().subscribe(result => this.favorites = result);
  }

  onSubmit(): void {
    this.inputString = this.selectedResult ?
      this.selectedResult.displayName :
      this.searchForm.get('userInput').value;

    if (this.inputString && this.inputString.trim())
      this.router.navigate(["/result", {term: this.inputString}])
        .then(() => this.selectedResult = null);
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
