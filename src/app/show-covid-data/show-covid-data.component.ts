import { Component, Input, OnInit } from '@angular/core';
import {
  catchError,
  delay,
  EMPTY,
  interval,
  map,
  mergeMap,
  of,
  share,
  take,
  tap,
  throwError,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

export type CatsTrivia = {
  text: string;
};
@Component({
  selector: 'app-show-covid-data',
  templateUrl: './show-covid-data.component.html',
  styleUrls: ['./show-covid-data.component.scss'],
})
export class ShowCovidDataComponent implements OnInit {
  @Input() name = '';

  cats: CatsTrivia[] | null = null;
  constructor() {}

  ngOnInit(): void {
    //op geboorte van component
    //data fetching:

    this.fetchCovidData();
  }

  // html ook wel de template
  // het component (deze file) logica van en naar het template (maar kan meer)
  // singletons (paradigm, object waarvan je zeker weet dat er maar 1 is).
  // lifecycle

  private fetchCovidData(): void {
    const apiData = ajax<CatsTrivia[]>('https://cat-fact.herokuapp.com/facts');

    // verwachtingen Observable (geen promise, geen object (nog niet))
    // op een observable kunnne we subscriben
    // een pipe methode kunnen invoegen
    // Observable.pipe(map(x => x + 1), tap(console.log)).subscribe)

    apiData.pipe(map((x) => x.response)).subscribe((catTrivia) => {
      this.cats = catTrivia;
    });
  }
}

//impliciet / expliciet

// runtime errors >
// runtime vs compiletime

// eerste probleem: we willen makkelijk straks kunnen mocken in de test
// tweede probleem: we maken de call nu n keer (naar de API).
// >
