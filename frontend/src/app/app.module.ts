import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatNativeDateModule,
  MatProgressSpinnerModule, MatSelectModule, MatSidenavModule
} from "@angular/material";
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {routing} from './app-routing.module';

import {StartComponent} from './start';
import {ResultComponent} from './result';
import {DetailComponent} from './detail';
import {MessagesComponent} from './messages';
import {SearchComponent} from "./search";

import {ResultService} from './_service';
import {HttpErrorHandler} from './_service';
import {MessageService} from './_service';
import {PagerService} from "./_service";
import {UtilService} from "./_service/util.service";
import {FooterComponent} from "./footer";

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    ResultComponent,
    DetailComponent,
    MessagesComponent,
    SearchComponent,
    FooterComponent
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
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  providers: [
    ResultService,
    HttpErrorHandler,
    MessageService,
    PagerService,
    UtilService,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
