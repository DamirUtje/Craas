import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing }        from './app-routing.module';

import { HomeComponent } from './home';
import { ResultComponent } from './result';
import { DetailComponent } from './detail';

import { PagerService } from './_service';

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
    FormsModule
  ],
  providers: [
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
