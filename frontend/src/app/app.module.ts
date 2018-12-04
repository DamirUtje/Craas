import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatProgressSpinnerModule, MatSelectModule, MatSidenavModule
} from "@angular/material";
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {routing} from './app-routing.module';

import {HomeComponent} from './home';
import {ResultComponent} from './result';
import {DetailComponent} from './detail';
import {MessagesComponent} from './messages';
import {SearchComponent} from "./search";

import {ResultService} from './_service/result.service';
import {HttpErrorHandler} from './_service/http-error-handler.service';
import {MessageService} from './_service/message.service';
import {PagerService} from "./_service/pager.service";

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    ResultComponent,
    DetailComponent,
    MessagesComponent,
    SearchComponent
  ],
  imports: [
    routing,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule
  ],
  providers: [
    ResultService,
    HttpErrorHandler,
    MessageService,
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
