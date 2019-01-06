import {Component, OnInit} from '@angular/core';
import {Result} from "../_model";
import {UtilService} from "../_service/util.service";
import {ResultService} from "../_service";
import {Observable} from "rxjs";

@Component({
  templateUrl: 'detail.component.html',
  selector: 'app-detail',
  styleUrls: ['detail.component.css']
})
export class DetailComponent implements OnInit {

  selectedResult: Result;
  attributeNames: string[] = [];

  constructor(private utilService: UtilService, private resultService: ResultService) { }

  ngOnInit() {
    //this.selectedResult

    let res: Observable<Result> = this.resultService.getSelectedResult();

    if(res) {
    this.resultService.getSelectedResult().subscribe(
      result => this.selectedResult = result,
      err => console.error('Observer got an error: ' + err),
      () => this.displayResult(this.selectedResult )
    );
    }
  }

  displayResult(result: Result) {
    this.attributeNames = [];
    if(result) {
      this.selectedResult = result;
      for (let attribute in result) {
        if (result[attribute])
          this.attributeNames.push(attribute);
      }
    }
  }

  getRegular(attribute: string): string {
    return this.utilService.camelCaseToRegular(attribute);
  }
}

