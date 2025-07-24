import { Component, OnDestroy } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions  from '../../state/auth/auth.actions';
import { Observable, Subject } from 'rxjs';
import * as AuthSelectors from '../../state/auth/auth.selectors';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs/operators'; // y takeUntil

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, TranslateModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent implements OnDestroy {
  isLoading = false;
  isLoggedIn$: Observable<boolean>;
  authError$: Observable<string | null>;
  credentialForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  isCreate = false;
  private destroy$ = new Subject<void>(); // Para gestionar la desuscripción

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private store: Store,
  ) {
    this.store.select(AuthSelectors.selectAuthLoading)
      .pipe(takeUntil(this.destroy$)) // Usa takeUntil para desuscribirte
      .subscribe(
      (obj) => { console.log("AuthSelectors.selectAuthLoading",obj); this.isLoading = obj; }
    );
    this.isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
    this.authError$ = this.store.select(AuthSelectors.selectAuthError);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  notIsCreate(): void {
    this.isCreate = !this.isCreate;
  }

  onCreate(): void {
    this.store.dispatch(AuthActions.create({ user: this.credentialForm.value }));
  }

  onSubmit(): void {
    this.store.dispatch(AuthActions.login({ user: this.credentialForm.value }));
  }

}
