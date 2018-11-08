import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  searchString : string;

  constructor(
    private router: Router
  ) {
  }

  onSubmit() {

    // TODO: fetch Data

    this.router.navigate(['/result']);

  }
}
