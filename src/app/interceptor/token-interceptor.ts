import { HttpInterceptorFn } from '@angular/common/http';
import { NAME_ACCESS_TOKEN } from '../shared/constants/auth.constants';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(NAME_ACCESS_TOKEN);
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}` 
    }
  });
  return next(newReq);
};
