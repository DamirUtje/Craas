import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home';
import {ResultComponent} from './result';
import {DetailComponent} from './detail';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'result', component: ResultComponent},
  {path: 'detail', component: DetailComponent},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routing = RouterModule.forRoot(routes, { useHash: true });
