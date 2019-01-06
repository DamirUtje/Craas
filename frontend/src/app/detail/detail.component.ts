import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Result} from "../_model";
import {UtilService} from "../_service/util.service";
import {ResultService} from "../_service";
import {Observable} from "rxjs";
import * as jsPDF from "jspdf";

@Component({
  templateUrl: 'detail.component.html',
  selector: 'app-detail',
  styleUrls: ['detail.component.css']
})
export class DetailComponent implements OnInit {

  selectedResult: Result;
  attributeNames: string[] = [];
  @ViewChild('detailContent') detailContent: ElementRef;

  constructor(private utilService: UtilService, private resultService: ResultService) { }

  ngOnInit() {
    let result: Observable<Result> = this.resultService.getSelectedResult();
    if(result) {
      this.resultService.getSelectedResult().subscribe(
      result => this.selectedResult = result,
      _ => _,
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

  pdfExport() {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const content = this.detailContent.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('Craas_' + this.utilService.getFormattedTime()  + '.pdf');
  }
}

