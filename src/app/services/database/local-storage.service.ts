import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements Database {
  constructor() {}

  logIn(username: string, pasword: string): Observable<string> {
    return of('logged in succesfully');
  }
  loggedIn(): Observable<boolean> {
    return of(true);
  }
}

export interface Database {
  logIn(username: string, pasword: string): Observable<string>;

  loggedIn(): Observable<boolean>;
}
