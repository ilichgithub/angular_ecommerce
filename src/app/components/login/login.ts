import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions  from '../../state/auth/auth.actions';
import { Observable } from 'rxjs';
import * as AuthSelectors from '../../state/auth/auth.selectors';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  isLoggedIn$: Observable<boolean>;
  authError$: Observable<string | null>;
  credentialForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  http = inject(HttpClient);
  router = inject(Router);

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private store: Store,
  ) {
    this.isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
    this.authError$ = this.store.select(AuthSelectors.selectAuthError);
  }

  onSubmit(): void {
    console.log(this.credentialForm.value);
    this.store.dispatch(AuthActions.login({ user: this.credentialForm.value }));
  }
}
