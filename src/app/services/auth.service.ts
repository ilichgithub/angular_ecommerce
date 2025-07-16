import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login'; // URL de tu endpoint de login

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private http: HttpClient) { }

  login(credentials: unknown): Observable<unknown> {
    return this.http.post(this.apiUrl, credentials);
  }

  // Aquí puedes añadir más métodos, como guardar el token, cerrar sesión, etc.
}