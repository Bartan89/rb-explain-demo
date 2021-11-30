import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Database } from '../database/local-storage.service';
import { PasswordEncryptorService } from '../encryption/password-encryptor.service';

type fullCredetials = {
  name: string;
  lastname: string;
  username: string;
  password: string;
};

type credentials = Pick<fullCredetials, 'username' | 'password'>;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userLoggedIn$ = new BehaviorSubject(false);

  public userDidNotSignUp$ = new BehaviorSubject(false);

  constructor(
    private passwordPasswordEncryptorService: PasswordEncryptorService
  ) {}

  logIn(credetials: credentials): void {
    const credentialDatabaseMock = [
      { userName: 'Bart', password: 'Welkom123' },
      { userName: 'Robin', password: 'Welkom123' },
    ];

    // vind de gebruiker
    if (localStorage.getItem(credetials.username)) {
      this.userLoggedIn$.next(true);
      this.userDidNotSignUp$.next(false);
    } else {
      /// TODO
      console.log('deze logica afgevuurd');
      this.userDidNotSignUp$.next(true);
    }

    // if(credetials)
    // this.userLoggedIn$.next(true)
  }

  loggedInSessionStillValid(): void {
    // een gebruiker mag een paar dagen ingelogt zijn via local storage

    const userLocalStorageState = '"timerStart", "1638189425633"';

    const userAuthState = {
      timeSinceAuth: 12312309090,
    };

    const timeLeft = this.fromLocalStorageStringToObject<{
      timerStart: number;
    }>(localStorage.getItem('currentUserAuthValid') as string);

    const userAuthValid = localStorage.getItem('currentUserAuthValid');
    if (Boolean(userAuthValid)) {
      this.userLoggedIn$.next(false);
    }

    // const userAllowedIn = Date.now() - Number(timeLeft.timerStart) < 1000000;
    // if (!userAllowedIn) {
    //   this.userLoggedIn$.next(false);
    // }
  }

  signUp(fullCredetials: fullCredetials): any {
    const encryptedPaswoord =
      this.passwordPasswordEncryptorService.encryptPasword(
        fullCredetials.password
      );

    localStorage.setItem(
      `${fullCredetials.username}`,
      `"${fullCredetials.username}", "${fullCredetials.name}", "${fullCredetials?.lastname}", "${encryptedPaswoord}"`
    );

    localStorage.setItem(
      'currentUserAuthValid',
      `+|timerStart|, |${Date.now()}|+,+|TESTKEY1|, |TESTVALUE1|+", "+|TESTKEY2|, |TESTVALUE2|+"`
    );
    // { timeStart : 23423434,  }

    this.userLoggedIn$.next(true);
  }

  doesUserExsist(username: string): { user: string; userExsists: boolean } {
    // null
    // of key value pair vanuit local storage
    const localStorageQuery = localStorage.getItem(username);

    return { user: username, userExsists: Boolean(localStorageQuery) };
  }

  fromLocalStorageStringToObject<T>(str: string): T {
    const intermediate = str
      .split('+')
      .filter((x, i) => (i % 2 == 1 ? true : false));

    const result = intermediate.reduce((prev, cur, index) => {
      const key = cur.split('|')[1];
      const val = intermediate[index]
        .split('|')
        .filter((x, i) => (i % 2 == 1 ? true : false))[1];
      return { ...prev, [key]: val };
    }, {});

    return result as T;
  }
}

// interval(1000)
// ajax (een get request doet en obs teruggeeft)
// observable oftewel een 'waarde' waarop gesubcribed kan worden
// wij willen de waarde injecteren
// subject en behaviourSubject

// specifiek -> itereren naar generieke service voor loosely coupled architecture

// unique identifier
// nummer 0, 1
// username
