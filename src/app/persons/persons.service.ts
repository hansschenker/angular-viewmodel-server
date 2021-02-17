import { Person } from './types/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError, } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  constructor(private http: HttpClient) {}
  persons$: Observable<Person[]> = this.http
    .get<Person[]>("/api/persons")
    .pipe(catchError((err) => throwError(err)));
}
