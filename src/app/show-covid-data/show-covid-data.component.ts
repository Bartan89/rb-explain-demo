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
import { FetchCatServiceService } from '../services/fetch-cat-service.service';

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

  constructor(private fetchCatServiceService: FetchCatServiceService) {}

  ngOnInit(): void {
    //op geboorte van component
    //data fetching:

    //hoe het niet moet om uit te leggen hoe het wel moet.

    this.fetchCatServiceService.apiData
      .pipe()
      .subscribe((fromApiCatsTrivia) => (this.cats = fromApiCatsTrivia));
  }

  // html ook wel de template
  // het component (deze file) logica van en naar het template (maar kan meer)
  // singletons (paradigm, object waarvan je zeker weet dat er maar 1 is).
  // lifecycle
}

//impliciet / expliciet

// runtime errors >
// runtime vs compiletime

// eerste probleem: we willen makkelijk straks kunnen mocken in de test
// tweede probleem: we maken de call nu n keer (naar de API).
// >
