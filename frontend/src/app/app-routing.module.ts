import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {StartComponent} from './start';
import {ResultComponent} from './result';
import {DetailComponent} from './detail';
import {LicenseComponent} from './license';

const routes: Routes = [
  {path: '', component: StartComponent},
  {path: 'result', component: ResultComponent},
  {path: 'license', component: LicenseComponent},
  {path: 'result/detail', component: DetailComponent},
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
