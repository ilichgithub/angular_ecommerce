import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NAME_ACCESS_TOKEN } from '../shared/constants/auth.constants';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isToken = localStorage.getItem(NAME_ACCESS_TOKEN);
  if(isToken!=null){
    return true;
  }else{
    router.navigateByUrl('/login');
    return false;
  }
};
