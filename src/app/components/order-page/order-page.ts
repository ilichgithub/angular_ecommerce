
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs'; // Importa Observable y of para datos de ejemplo
import { MatSnackBar } from '@angular/material/snack-bar'; // Para feedback al usuario
import { OrderListComponent } from '../order-list/order-list';
import { IOrderResponse } from '../../interfaces/cart/cart.interface';
import { Store } from '@ngrx/store';
import { selectOrders } from '../../state/order/order.selectors';
import { getUserOrders } from '../../state/order/order.actions';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [CommonModule, OrderListComponent],
  templateUrl: './order-page.html',
  styleUrls: ['./order-page.scss']
})
export class OrdersPageComponent {
  orders$: Observable<IOrderResponse[]>;
  orders: IOrderResponse[] = [];

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private snackBar: MatSnackBar,        // Inyecta MatSnackBar para el feedback
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private store: Store,
  ) {
    // Inicializa con un array vacío o un estado de carga
    this.orders$ = of([]);
    this.store.dispatch(getUserOrders());
    this.orders$ = this.store.select(selectOrders);
    this.orders$.subscribe((ord)=>{ 
      console.log("orders$",ord)
      return this.orders = ord.map((o)=>{ return { ...o, viewInfo: false } });
    });
      //.subscribe((obj) => (this.orders$ = obj));
  }

  handleCancelOrder(orderId: number): void {
    console.log('Cancelando orden:', orderId);
    // Llama a tu servicio para cancelar la orden
    // this.orderService.cancelOrder(orderId).subscribe(() => {
    //   this.snackBar.open(`Orden ${orderId} cancelada.`, 'Cerrar', { duration: 3000 });
    //   this.loadOrders(); // Recargar órdenes después de la acción
    // });
    this.snackBar.open(`Orden ${orderId} cancelada (mock).`, 'Cerrar', { duration: 3000 });
  }

  handleViewDetails(orderId: number): void {
    console.log('Viendo detalles para la orden:', orderId);
    // Navega a una página de detalles, abre un diálogo, etc.
    this.snackBar.open(`Viendo detalles para la orden ${orderId} (mock).`, 'Cerrar', { duration: 3000 });
    //this.store.dispatch(getInfoOrder({ id: orderId }));
    // Ejemplo: Navegar a '/orders/:id'
    // this.router.navigate(['/orders', orderId]);
  }

  handlePayOrder(orderId: number): void {
    console.log('Pagando orden:', orderId);
    // Llama a tu servicio para procesar el pago
    // this.orderService.payOrder(orderId).subscribe(() => {
    //   this.snackBar.open(`Pago de la orden ${orderId} iniciado.`, 'Cerrar', { duration: 3000 });
    //   this.loadOrders(); // Recargar órdenes después de la acción
    // });
    this.snackBar.open(`Pago de la orden ${orderId} iniciado (mock).`, 'Cerrar', { duration: 3000 });

  }
}