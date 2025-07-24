// src/app/pages/orders/order-list/order-list.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para NgFor, NgIf, DatePipe, CurrencyPipe
import { MatButtonModule } from '@angular/material/button'; // Ejemplo para botones de Material
import { MatCardModule } from '@angular/material/card';   // Ejemplo para tarjetas de Material
import { MatIconModule } from '@angular/material/icon';   // Ejemplo para iconos de Material
import { IOrderResponse } from '../../interfaces/cart/cart.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    TranslateModule,
    MatCardModule,
    MatIconModule // Si usas iconos en tus botones
  ],
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // Optimiza el rendimiento para componentes solo de entrada
})
export class OrderListComponent {
  @Input() orders: IOrderResponse[] | null = []; // Input para recibir la lista de órdenes

  // Eventos de salida para las acciones
  @Output() cancelOrder = new EventEmitter<number>();   // Emite orderId para cancelar
  @Output() viewDetails = new EventEmitter<number>();   // Emite orderId para ver detalles
  @Output() payOrder = new EventEmitter<number>();      // Emite orderId para pagar

  /**
   * Emite el orderId a ser cancelado.
   * @param orderId El ID de la orden a cancelar.
   */
  onCancel(orderId: number): void {
    this.cancelOrder.emit(orderId);
  }

  /**
   * Emite el orderId para ver sus detalles.
   * @param orderId El ID de la orden a ver.
   */
  onViewDetails(order: IOrderResponse): void {
    order.viewInfo = !order.viewInfo;
    this.viewDetails.emit(order.orderId);
  }

  /**
   * Emite el orderId para proceder con el pago.
   * @param orderId El ID de la orden a pagar.
   */
  onPay(orderId: number): void {
    this.payOrder.emit(orderId);
  }

  /**
   * Determina si el botón "Pagar" debe ser visible/habilitado para una orden.
   * @param status El estado de la orden.
   * @returns Verdadero si la orden puede pagarse, falso en caso contrario.
   */
  canPay(status: string): boolean {
    return status === 'PENDING'; // Solo permitir pago para órdenes PENDIENTES
  }

  /**
   * Determina si el botón "Cancelar" debe ser visible/habilitado para una orden.
   * @param status El estado de la orden.
   * @returns Verdadero si la orden puede cancelarse, falso en caso contrario.
   */
  canCancel(status: string): boolean {
    return status === 'PENDING'; // Solo permitir cancelación para órdenes PENDIENTES
  }
}