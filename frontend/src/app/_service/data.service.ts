import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";

import { Observable, of, throwError } from "rxjs"
import { map, catchError } from "rxjs/operators"

import { Result } from '../_model/result';
import { LoadOptions } from '../_model/loadOptions';
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";

@Injectable()
export class DataService {

  searchString : string;

  constructor(private router: Router, private http: HttpClient) {
  }

  setSearchString(searchString: string) {
    this.searchString = searchString;
  }

  getSearchString(): string {
    return this.searchString;
  }

  getFakeData() {
    return [
      {
        "name": "Item 1"
      },
      {
        "name": "Item 2"
      },
      {
        "name": "Item 3"
      },
      {
        "name": "Item 4"
      },
      {
        "name": "Item 5"
      },
      {
        "name": "Item 6"
      },
      {
        "name": "Item 7"
      },
      {
        "name": "Item 8"
      },
      {
        "name": "Item 9"
      },
      {
        "name": "Item 10"
      },
      {
        "name": "Item 11"
      },
      {
        "name": "Item 12"
      },
      {
        "name": "Item 13"
      },
      {
        "name": "Item 14"
      },
      {
        "name": "Item 15"
      }];
  }

  // https://codecraft.tv/courses/angular/http/http-with-observables/
  getResults(): Result[] {

    var tempArray: Result[] = [];
    this.http.get('http://jsonplaceholder.typicode.com/posts').subscribe(
      data => {
        for (var v in data)
          tempArray.push(data[v]);
      },
      error=> {
        console.log("Error in recieving data");
      },
      () => {
        //console.log(tempArray);
      }
    );

    return tempArray;
    //return this.http.get('https://jsonplaceholder.typicode.com/posts/');
  }

  getByOptions(loadOptions: LoadOptions): Observable<Result[]> {

    return this.http.get<Result[]>('/result');
  }

  getByString(searchString: string): Observable<Result[]> {

    const options = searchString ?
      { params: new HttpParams().set('name', searchString) } : {};

    return this.http.get<Result[]>('/result', options);
  }
}

