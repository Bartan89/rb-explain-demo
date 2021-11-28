import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Database } from '../database/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userLoggedIn$ = new BehaviorSubject(false);

  constructor() {}

  logIn(credetials: {
    username: string;
    password: string;
  }): Observable<string> {
    console.log(credetials);
    const credentialDatabaseMock = [
      { userName: 'Bart', password: 'Welkom123' },
      { userName: 'Robin', password: 'Welkom123' },
    ];

    const userInDb = credentialDatabaseMock.find(
      (user) => user.userName === credetials.username
    );

    if (userInDb) {
      const rightPassword = userInDb.password === credetials.password;
      console.log(
        'Is the password correct for user:',
        userInDb.userName,
        'passworden given:',
        credetials.password,
        'password expeced:',
        userInDb.password,
        'they are',
        rightPassword ? 'the same' : 'not the same'
      );
    }

    console.log(userInDb);

    // if(credetials)
    // this.userLoggedIn$.next(true)

    return of('string');
  }

  loggedIn(): boolean {
    return false;
  }
}

// interval(1000)
// ajax (een get request doet en obs teruggeeft)
// observable oftewel een 'waarde' waarop gesubcribed kan worden
// wij willen de waarde injecteren
// subject en behaviourSubject
