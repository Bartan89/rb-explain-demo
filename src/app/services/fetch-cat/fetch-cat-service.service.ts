import { Injectable } from '@angular/core';
import { map, Observable, tap, share, shareReplay } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { CatsTrivia } from '../../show-covid-data/show-covid-data.component';

// decorator >
// injecten (dependecy injection)
// loosely coupled kunnen werken

@Injectable({
  providedIn: 'root',
})
export class FetchCatServiceService {
  nummer = 5;

  constructor() {}

  // state management > redux
  apiData = ajax<CatsTrivia[]>('https://cat-fact.herokuapp.com/facts').pipe(
    map((x) => x.response),
    share()
  );
}
