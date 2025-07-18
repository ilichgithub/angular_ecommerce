import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router'; // Necesario para routerLink, routerLinkActive
import * as AuthActions from '../../state/auth/auth.actions';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    TranslateModule,
    RouterModule, // Para routerLink y routerLinkActive
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class LayoutComponent {
  isMenuOpen = false; // Estado para controlar si el menú móvil está abierto
  translate = inject(TranslateService);

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private store: Store,
  ) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // Cambia el estado del menú
  }

  closeMenu(): void {
    // Cierra el menú cuando se hace clic en un enlace (útil en móvil)
    this.store.dispatch(
      AuthActions.logout({
        user: { accessToken: '', refreshToken: '', username: '', password: '' },
      }),
    );
    this.isMenuOpen = false;
  }

  changeLanguage(event: Event): void {
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang); // Cambia el idioma actual de la aplicación

    // Ejemplo de cómo obtener una traducción en el código TypeScript
    /*
    this.translate.get('GREETING', { name: 'Juan' }).subscribe((res: string) => {
      console.log(res); // Imprimirá "Hola, Juan!" o "Hello, Juan!"
    });
    */
  }
}
