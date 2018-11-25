import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";

import { Observable, of, throwError } from "rxjs"
import { map, switchMap, catchError } from "rxjs/operators"

import { Result } from '../_model';

@Injectable()
export class ResultService {

  baseApiUrl: string = '/api/';

  constructor(private router: Router, private http: HttpClient) {
  }

  // TODO: Documentation => https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/

  loadResults(term: string): Observable<Result[]> {
    const options = { params: new HttpParams().set('term', term) };
    return this.http.get<Result[]>(this.baseApiUrl + 'query', options);
  }

  loadSuggestions(term: string): Observable<Result[]> {
    const options = { params: new HttpParams().set('term', term) };
    return this.http.get<Result[]>(this.baseApiUrl + 'suggest', options);
  }

  loadPopular(): Observable<Result[]> {
    return this.http.get<Result[]>(this.baseApiUrl + 'popular');
  }
}

