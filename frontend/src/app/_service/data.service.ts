import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";

import { Observable, of, throwError } from "rxjs"
import { map, switchMap, catchError } from "rxjs/operators"

import { Result } from '../_model/result';
import { LoadOptions } from '../_model/loadOptions';


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

  // https://codecraft.tv/courses/angular/http/http-with-observables/
  getData(): Observable<Result[]> {
    return this.http.get('http://jsonplaceholder.typicode.com/posts');
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

