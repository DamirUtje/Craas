import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from "@angular/router";

import {Observable, of} from "rxjs"
import {catchError} from "rxjs/operators"

import {ISuggestion, Result} from '../_model';
import {HandleError, HttpErrorHandler} from "./http-error-handler.service";
import {SearchInquiry} from "../_model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {

  baseApiUrl: string = '/api';
  handleError: HandleError;
  result: Observable<Result>;

  constructor(private router: Router,
              private http: HttpClient,
              httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ResultService');
  }

  loadResults(term: string): Observable<Result[]> {
    const options = { params: new HttpParams().set('term', term) };
    return this.http.get<Result[]>(this.baseApiUrl + '/query', options)
      .pipe(
        catchError(this.handleError('loadResults', []))
      );
  }

  loadSuggestions(term: string): Observable<ISuggestion[]> {
    const options = { params: new HttpParams().set('term', term) };
    return this.http.get<ISuggestion[]>(this.baseApiUrl + '/suggest', options)
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

  loadFavorites(): Observable<ISuggestion[]> {
    return this.http.get<ISuggestion[]>(this.baseApiUrl + '/favorites')
      .pipe(
        catchError(this.handleError('loadFavorites', []))
      );
  }

  saveInquiry(inquiry: SearchInquiry): void {
    this.http.post(this.baseApiUrl + '/inquiry', inquiry, httpOptions)
      .pipe(
        catchError(this.handleError('saveInquiry'))
      ).subscribe();
  }
}

