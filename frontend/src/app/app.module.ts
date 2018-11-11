import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing }        from './app-routing.module';

import { HomeComponent } from './home';
import { ResultComponent } from './result';
import { DetailComponent } from './detail';

import { PagerService } from './_service/pager.service';
import { DataService } from './_service/data.service';

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    ResultComponent,
    DetailComponent
  ],
  imports: [
    routing,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    PagerService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
