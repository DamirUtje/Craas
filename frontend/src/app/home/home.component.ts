import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../_service/data.service';
import { LoadOptions } from '../_model/loadOptions';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent {

  searchString : string;

  constructor(private router: Router, private dataService: DataService) {
  }

  onSubmit() {

    if(this.searchString) {

      // https://stackblitz.com/angular/ooqemvjyqkb?file=src%2Fapp%2Fheroes%2Fheroes.service.ts

      this.dataService.setSearchString(this.searchString.trim());

      this.router.navigate(['/result']);
    }
    else { }
  }
}
