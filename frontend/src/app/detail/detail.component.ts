import {Component} from '@angular/core';
import {Result} from "../_model";
import {UtilService} from "../_service/util.service";

@Component({
  templateUrl: 'detail.component.html',
  selector: 'app-detail',
  styleUrls: ['detail.component.css']
})
export class DetailComponent {

  selectedResult: Result;
  attributeNames: string[] = [];

  constructor(private utilService: UtilService) { }

  setResult(result: Result) {
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

