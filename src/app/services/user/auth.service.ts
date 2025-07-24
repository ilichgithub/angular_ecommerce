import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { IUser, IUserResponse } from '../../interfaces/user/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    http: HttpClient,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private service: BaseService) {
    super(http);
  }

  login(user: IUser) {
    return this.service.post<IUser,IUserResponse>("http://localhost:8080/api/auth/login",user);
  }

  logout(user: IUser) {
    return this.service.post<IUser,IUserResponse>("http://localhost:8080/api/auth/logout",user);
  }

  create(user: IUser) {
    return this.service.post<IUser,IUserResponse>("http://localhost:8080/api/auth/register",user);
  }
}