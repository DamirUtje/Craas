import {Component} from '@angular/core';
import {Result} from "../_model";

@Component({
  templateUrl: 'detail.component.html',
  selector: 'app-detail',
  styleUrls: ['detail.component.css']
})
export class DetailComponent {

  selectedResult: Result;

  setSelection(result: Result) {
    this.selectedResult = result;
  }
}

