import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { IUser } from '../../interfaces/user/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<IUser> {
  
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    http: HttpClient,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private service: BaseService<IUser>) {
    super(http);
  }

  login(user: IUser) {
    return this.service.post("http://localhost:8080/api/auth/login",user);
  }

  logout(user: IUser) {
    return this.service.post("http://localhost:8080/api/auth/logout",user);
  }
}