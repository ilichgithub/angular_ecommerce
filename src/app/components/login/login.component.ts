import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Importa este
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true, // <-- El componente es autónomo
  imports: [
    FormsModule // <-- Añade FormsModule aquí
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe(
      response => {
        // Manejar la respuesta exitosa (ej. guardar el token, redirigir)
        console.log('Login exitoso', response);
      },
      error => {
        // Manejar el error (ej. mostrar un mensaje de error al usuario)
        console.error('Error en el login', error);
      }
    );
  }
}
