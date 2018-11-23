import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";

import { Observable, of, throwError } from "rxjs"
import { map, switchMap, catchError } from "rxjs/operators"

import { Result } from '../_model/result';


@Injectable()
export class ResultService {

  searchString: string;
  queryOptions: any;

  constructor(private router: Router, private http: HttpClient) {
  }

  getSearchString(): string {
    return this.searchString;
  }

  setSearchString(term: string) {
    this.searchString = term.trim();
  }

  // https://codecraft.tv/courses/angular/http/http-with-observables/
  getData(): Observable<Result[]> {
    return this.http.get<Result[]>('http://jsonplaceholder.typicode.com/posts');
  }

  search(): Observable<Result[]> {

    const options = { params: new HttpParams().set('term', this.searchString) };

    return this.http.get<Result[]>('/api/query', options);
  }


}

