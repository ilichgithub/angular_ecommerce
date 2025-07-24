import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { LayoutComponent } from './components/layout/layout';
import { CartListComponent } from './components/cart-list/cart-list';
import { OrdersPageComponent } from './components/order-page/order-page';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'cart', 
        component: CartListComponent 
      }, 
      {
        path: 'orders', 
        component: OrdersPageComponent 
      }, 
    ]
  },
  { path: '**', redirectTo: '/dashboard' },
];
