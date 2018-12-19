import {Component} from '@angular/core';
import {Result} from "../_model";
import {UtilService} from "../_service/util.service";

@Component({
  templateUrl: 'detail.component.html',
  selector: 'app-detail',
  styleUrls: ['detail.component.css']
})
export class DetailComponent {

  selectedResult: { [id: string] : any; } = {};

  constructor(private utilService: UtilService) {

  }

  setResult(result: Result) {
    if(result) {
      for (let attribute in result) {

        let value = result[attribute];
        if(value)
          this.selectedResult[this.utilService.camelCaseToRegular(attribute)] = value;
      }
    } else {
      this.selectedResult = {};
      // todo message service log;
    }
  }
}

