import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule} from "@angular/material";
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {routing} from './app-routing.module';

import {HomeComponent} from './home';
import {ResultComponent} from './result';
import {DetailComponent} from './detail';
import {MessagesComponent} from './messages';

import {PagerService} from './_service/pager.service';
import {ResultService} from './_service/result.service';
import {HttpErrorHandler} from './_service/http-error-handler.service';
import {MessageService} from './_service/message.service';

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    ResultComponent,
    DetailComponent,
    MessagesComponent
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
    MatProgressSpinnerModule
  ],
  providers: [
    PagerService,
    ResultService,
    HttpErrorHandler,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
