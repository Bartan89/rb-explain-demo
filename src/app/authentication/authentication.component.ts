import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  pipe,
  tap,
  throttleTime,
} from 'rxjs';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  showSignIn = true;
  userNameExsistsMessage = '';

  userLoggedIn$ = this.userService.userLoggedIn$;

  notValid = false;
  // dit stuk code > programmeur a. iets veranderd
  authFormSignIn = this.formBuilder.group({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  authFormSignUp = this.formBuilder.group({
    name: new FormControl('testuserName', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new FormControl('testuserLastname', [
      Validators.required,
      Validators.minLength(3),
    ]),
    username: new FormControl('testuserUserName', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('04051989', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // dit wordt maar 1 keer afgevuurd in de huidige vorm
    // ook alleen maar als je het component binnenkomt.
    this.userService.loggedInSessionStillValid();
    this.checkUserNameExsists();
  }

  // dit stuk code heel ergens anders dan. Waardoor b in de knoei komt.
  onSignIn(): void {
    if (
      this.authFormSignIn.valid &&
      this.authFormSignIn.get('username')?.value &&
      this.authFormSignIn.get('password')?.value
    ) {
      const input = {
        username: this.authFormSignIn.get('username')?.value,
        password: this.authFormSignIn.get('password')?.value,
      };
      this.userService.logIn(input);
    }
  }

  onSignUp(): void {
    if (this.authFormSignUp.valid) {
      const input = {
        username: this.authFormSignUp.get('username')?.value,
        password: this.authFormSignUp.get('password')?.value,
        name: this.authFormSignUp.get('name')?.value,
        lastname: this.authFormSignUp.get('lastname')?.value,
      };

      // @ts-ignore
      this.userService.signUp(input);
      this.notValid = false;
    } else {
      this.notValid = true;
    }
  }

  checkUserNameExsists() {
    const obs: Observable<string> | undefined =
      this.authFormSignUp.get('username')?.valueChanges;
    obs
      ?.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((username: string) => this.userService.doesUserExsist(username))
      )
      .subscribe((queryLocalStorage) => {
        if (queryLocalStorage.userExsists) {
          this.userNameExsistsMessage = `Sorry ${queryLocalStorage.user} is taken`;
        } else {
          this.userNameExsistsMessage = ``;
        }
      });
  }

  toggleToSignUp() {
    this.showSignIn = !this.showSignIn;
  }
}

// compile team type checking
// runtime

// isn't that expensive?
// duur / expensive
