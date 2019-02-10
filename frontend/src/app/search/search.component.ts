import {ChangeDetectorRef, Component, Injectable, OnInit} from '@angular/core';
import {ISuggestion, SearchInquiry} from "../_model";
import {Observable, of} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {DataService} from "../_service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {UtilService} from "../_service/util.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['search.component.css']
})
@Injectable()
export class SearchComponent implements OnInit {
  selectedResult: ISuggestion;
  suggestions: Observable<ISuggestion[]>;
  searchForm: FormGroup;
  inputString: string;

  constructor(private router: Router,
              private dataService: DataService,
              private formBuilder: FormBuilder,
              private changeDetector: ChangeDetectorRef,
              private clientUtil: UtilService) {
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
        switchMap(input => {
          if(input) {
            return this.dataService.loadSuggestions(input);
          }
          else{
            return this.dataService.loadFavorites();
          }
        }
      ));
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

          // save search inquiry
          const newInquiry: SearchInquiry = {
            id: undefined,
            displayName: this.inputString,
            browserLanguage: this.clientUtil.getLocale(),
            mobileDevice: this.clientUtil.isMobile()
          };
          this.dataService.saveInquiry(newInquiry);
        });
  }

  onSelect(e): void {
    this.selectedResult = e.option.value as ISuggestion;
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

  onSuggest(): void {
    let currentInput = this.searchForm.get('userInput').value;
    if(currentInput) {
      // input already entered, no favorite suggestions needed
    } else {
      this.suggestions = this.dataService.loadFavorites();
      this.initSearch();
    }
  }
}
