import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultComponent } from './result';
import { DetailComponent } from './detail';

const routes: Routes = [
  { path: 'result', component: ResultComponent },
  { path: 'detail', component: DetailComponent },
  // otherwise redirect to home
  //{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
