// src/app/state/auth/auth.actions.ts
import { createAction, props } from '@ngrx/store';
import { IUser } from '../../interfaces/user/user.interface';

export const login = createAction(
  '[Auth] Login',
  props<{ user : IUser }>() 
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user : IUser }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction(
  '[Auth] Logout',
  props<{ user : IUser }>()
);