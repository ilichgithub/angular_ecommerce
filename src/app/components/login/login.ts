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
import { AuthService } from '../../services/user/auth.service';
import { IUser } from '../../interfaces/user/user.interface';
import * as AuthConstants from '../../shared/constants/auth.constants';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  credentialForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  http = inject(HttpClient);
  router = inject(Router);

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private authService: AuthService,
  ) {}

  onSubmit(): void {
    console.log(this.credentialForm.value);
    this.authService.login(this.credentialForm.value).subscribe(
      (response: IUser) => {
        localStorage.setItem(AuthConstants.NAME_ACCESS_TOKEN, response.accessToken);
        localStorage.setItem(AuthConstants.NAME_REFRESH_TOKEN, response.refreshToken);
        this.router.navigateByUrl('/dashboard');
      },
      (error) => {
        console.error('Error al crear usuario:', error);
      },
    );
  }
}
