import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ResultService } from '../_service/result.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent {

  inputString : string;

  constructor(private router: Router, private resultService: ResultService) {
  }

  onSubmit() {

    if(this.inputString) {

      // https://stackblitz.com/angular/ooqemvjyqkb?file=src%2Fapp%2Fheroes%2Fheroes.service.ts

      this.resultService.setSearchString(this.inputString);
      this.router.navigate(['/result']);
    }
    else { }
  }
}
