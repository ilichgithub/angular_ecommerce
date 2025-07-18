import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para ngClass, ngIf
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router'; // Necesario para routerLink, routerLinkActive
import * as AuthActions  from '../../state/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-layout',
  standalone: true, // Si usas componentes independientes
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule, // Para *ngIf y [ngClass]
    RouterModule // Para routerLink y routerLinkActive
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class LayoutComponent {
  isMenuOpen = false; // Estado para controlar si el menú móvil está abierto
  
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private store: Store,
  ) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // Cambia el estado del menú
  }

  closeMenu(): void {
    // Cierra el menú cuando se hace clic en un enlace (útil en móvil)
    this.store.dispatch(AuthActions.logout({ user: { accessToken:"", refreshToken: "", username:"", password:"" }}));
    this.isMenuOpen = false;
  }
}