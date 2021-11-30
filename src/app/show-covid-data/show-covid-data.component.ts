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
import { FetchCatServiceService } from '../services/fetch-cat/fetch-cat-service.service';
import { UserService } from '../services/user/user.service';

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
  userLoggedIn$ = this.userService.userLoggedIn$;

  constructor(
    private fetchCatServiceService: FetchCatServiceService,
    private userService: UserService
  ) {}

  cats: CatsTrivia[] | null = null;

  ngOnInit(): void {
    this.userService.userLoggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        this.getCat();
      }
    });
  }

  getCat() {
    this.fetchCatServiceService.apiData.subscribe(
      (fromApiCatsTrivia) => (this.cats = fromApiCatsTrivia)
    );
  }
}

// WAAROM TESTEN

// mutatie er niet voor zorgt dat de applicatie kapot gaat
// guarding logica
// typo's kunnen testen laten falen

// je gaat je eigen code bevragen, klopt het wel?
// je krijgt meer inzicht..

// SCOPE BEPALEN

// 1001 testen
// 'Unit' test
// Waarom testen we maar een unit. Klein gedeelte van de flow van data.

// MOCKEN

// neppe data

// digitale schuld
// schuld: ik gebruik wel dependecy injection maar ik weet eigenlijk niet wat het is.
// Ik gebruik rxjs maar ik weet niet precies wat er gebeurd
// ik gebruik typescript for runtime type checking maar ik snap het niet.
// asynchroniteit
