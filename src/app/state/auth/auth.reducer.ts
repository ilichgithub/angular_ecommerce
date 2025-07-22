import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState, 

  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    isLoading: false,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    userEmail: null,
    isLoading: false,
    error,
  })),

  on(AuthActions.logout, () => ({
    ...initialAuthState,
  })),
  
  on(AuthActions.create, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(AuthActions.createSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  })),
);