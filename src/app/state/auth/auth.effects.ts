import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { AuthService } from '../../services/user/auth.service';
import * as AuthConstants from '../../shared/constants/auth.constants';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    public authService: AuthService,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    public router: Router,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ user }) =>
        this.authService.login(user).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              user: response,
            }),
          ),
          catchError(() =>
            of(
              AuthActions.loginFailure({
                error: 'Credenciales inválidas o error de red.',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          localStorage.setItem(
            AuthConstants.NAME_ACCESS_TOKEN,
            user.accessToken,
          );
          localStorage.setItem(
            AuthConstants.NAME_REFRESH_TOKEN,
            user.refreshToken,
          );
          this.router.navigate(['/dashboard']);
        }),
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        mergeMap(({ user }) => {
          return this.authService.logout(user).pipe(
            map(() => {
              localStorage.removeItem(AuthConstants.NAME_ACCESS_TOKEN);
              localStorage.removeItem(AuthConstants.NAME_REFRESH_TOKEN);
              this.router.navigate(['/login']);
            }),
            catchError(() =>
              of(
                AuthActions.loginFailure({
                  error: 'Credenciales inválidas o error de red.',
                }),
              ),
            ),
          )},
        ),
      ),
    { dispatch: false }
  );
}