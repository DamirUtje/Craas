import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatDatepickerModule, MatDividerModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatNativeDateModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatTooltipModule
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
import {FooterComponent} from "./footer";
import {LicenseComponent} from "./license";

import {DataService, HttpErrorHandler, MessageService, PagerService} from './_service';
import {UtilService} from "./_service/util.service";

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    ResultComponent,
    DetailComponent,
    MessagesComponent,
    SearchComponent,
    FooterComponent,
    LicenseComponent
  ],
  imports: [
    routing,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
  providers: [
    DataService,
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
