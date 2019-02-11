import {ChangeDetectorRef, Component, Injectable, OnInit} from '@angular/core';
import {ISuggestion} from "../_model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {DataService} from "../_service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['search.component.css']
})
@Injectable()
export class SearchComponent implements OnInit {
  selectedResult: ISuggestion;
  suggestions: ISuggestion[];
  searchForm: FormGroup;
  inputString: string;

  constructor(private router: Router,
              private dataService: DataService,
              private formBuilder: FormBuilder,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      userInput: null
    });

    this.initSuggestions();
  }

  initSuggestions(): void {
    this.searchForm.get('userInput').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap(input => input ?
          this.dataService.loadSuggestions(input) :
          this.dataService.loadFavorites())
      ).subscribe(result => this.suggestions = result);
  }

  onSubmit(): void {
    this.inputString = this.selectedResult ?
      this.selectedResult.displayName :
      this.searchForm.get('userInput').value;

    if(this.inputString && this.inputString.trim())
      this.router.navigate(["/result", { term: this.inputString }])
        .then(() => {
          // reset search
          this.selectedResult = null;
        });
  }

  onSelect(e): void {
    this.selectedResult = e.option.value as ISuggestion;
    this.setInput(this.selectedResult.displayName);
    this.onSubmit();
  }

  setInput(param: string): void {
    this.inputString = param;
    this.searchForm.get('userInput')
      .setValue(this.inputString, { emitEvent: false });
    this.changeDetector.detectChanges();
  }

  getInput(): string {
    return this.inputString;
  }

  hideSuggestions(): void {
    this.suggestions = [];
  }

  onFocusInput(): void {
    if(this.searchForm.get('userInput').value) {
      // input already tipped in, no favorite suggestions needed
    } else {
      this.dataService.loadFavorites()
        .subscribe(res => this.suggestions = res);
    }
  }
}
