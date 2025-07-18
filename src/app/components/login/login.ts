import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions  from '../../state/auth/auth.actions';
import { Observable } from 'rxjs';
import * as AuthSelectors from '../../state/auth/auth.selectors';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, TranslateModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  isLoading = false;
  isLoggedIn$: Observable<boolean>;
  authError$: Observable<string | null>;
  credentialForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private store: Store,
  ) {
    this.store.select(AuthSelectors.selectAuthLoading).subscribe(
      (obj) => this.isLoading = obj
    );
    this.isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
    this.authError$ = this.store.select(AuthSelectors.selectAuthError);
  }

  onSubmit(): void {
    console.log(this.credentialForm.value);
    this.store.dispatch(AuthActions.login({ user: this.credentialForm.value }));
  }
}
