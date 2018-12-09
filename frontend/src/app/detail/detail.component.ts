import {Component} from '@angular/core';
import {Result} from "../_model";

@Component({
  templateUrl: 'detail.component.html',
  selector: 'app-detail',
  styleUrls: ['detail.component.css']
})
export class DetailComponent {


  selectedResult: { [id: string] : any; } = {};

  setSelection(result: Result) {

    if(result) {

      for (let attribute in result) {
        let value = result[attribute];
        if(value)
          this.selectedResult[attribute] = value;
      }
    }

  }
}

