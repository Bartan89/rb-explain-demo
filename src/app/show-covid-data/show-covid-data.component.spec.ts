import {
  discardPeriodicTasks,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { filter, interval, of, pipe, take, tap } from 'rxjs';
import { FetchCatServiceService } from '../services/fetch-cat-service.service';
import { MockCatTrivia } from './mock-data';
import { ShowCovidDataComponent } from './show-covid-data.component';

describe('kat weetjes component', () => {
  it('should pipe cat trivia data from a service to the cats field', () => {
    const Mock: FetchCatServiceService = {
      apiData: of(MockCatTrivia),
      nummer: 1,
    };

    const component = new ShowCovidDataComponent(Mock);

    component.ngOnInit();

    console.log('wat krijg ik hier te zien?', component.cats);

    // assertion
    expect(component.cats?.length).toEqual(2);
  });

  it('test async as sync', fakeAsync(() => {
    // undefined kan je observeren
    // null kan meegeven
    let stopwatch: number | null = null;
    interval(1000)
      .pipe(filterFunction)
      .subscribe((timer) => {
        // 0 1 2 3 4 5 (iedere x 1 seconden)
        stopwatch = timer;
      });

    // na 5 seconden
    flush();
    tick(1000);
    console.log(stopwatch);
    expect(stopwatch).toBe(null);

    // na 10 seconden
    tick(10000);
    console.log(stopwatch);
    expect(stopwatch as unknown as number).toBe(10);
    discardPeriodicTasks();
  }));
  // asserten
});

// it('test async as it normally behaves', () => {
//   interval(1000)
//     .pipe(filterFunction)
//     .subscribe((timer) => {
//       console.log(timer);
//     });
// });

const filterFunction = pipe(filter((teller: number) => teller > 2));

// mocken data
// we willen een klein gedeelte isoleren om te testen.
// dummy is < domweg object waar we 'tegenaan' kunnen testen
// stub

// loosely coupled architecture
// dmv dependecy injection

//
