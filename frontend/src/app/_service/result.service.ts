import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from "@angular/router";

import {Observable, of, throwError} from "rxjs"
import {map, switchMap, catchError} from "rxjs/operators"

import {Result} from '../_model';
import {HandleError, HttpErrorHandler} from "./http-error-handler.service";

@Injectable()
export class ResultService {

  baseApiUrl: string = '/api/';
  handleError: HandleError;
  result: Observable<Result>;

  constructor(private router: Router,
              private http: HttpClient,
              httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ResultService');
  }

  // TODO: Documentation => https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/

  loadResults(term: string): Observable<Result[]> {
    const options = { params: new HttpParams().set('term', term) };
    return this.http.get<Result[]>(this.baseApiUrl + 'query', options)
      .pipe(
        catchError(this.handleError('loadResults', []))
      );
  }

  loadSuggestions(term: string): Observable<Result[]> {
    const options = { params: new HttpParams().set('term', term) };
    return this.http.get<Result[]>(this.baseApiUrl + 'suggest', options)
      .pipe(
        catchError(this.handleError('loadSuggestions', []))
      );
  }

  getSelectedResult(): Observable<Result> {
    return this.result;
  }

  setSelectedResult(result: Result) {
    this.result = of(result);
  }

  loadPopular(): Observable<Result[]> {
    return this.http.get<Result[]>(this.baseApiUrl + 'popular')
      .pipe(
        catchError(this.handleError('loadPopular', []))
      );
  }
}

