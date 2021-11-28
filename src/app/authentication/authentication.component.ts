import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  showSignIn = true;
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
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  // dit stuk code heel ergens anders dan. Waardoor b in de knoei komt.
  onSubmit(): void {
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

  toggleToSignUp() {
    this.showSignIn = !this.showSignIn;
  }
}

// opiniated
// Google (angular) bepaald voor ons hoe we iets moeten doen
// voordeel is consistentie
// veel out the box

// nadelen
// minder zelf nadenkt
// voelt soms als magie
// bootstrapping

// type guarding
// guarding -> validatie
// validatie voor programmeur
