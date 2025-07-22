import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe, SlicePipe } from '@angular/common'; // CurrencyPipe y SlicePipe
import { TranslateModule } from '@ngx-translate/core'; // Para el pipe de traducción
import { IProduct } from '../../interfaces/product/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule, // Importa TranslateModule para usar el pipe 'translate'
    CurrencyPipe,    // Para formatear el precio
    SlicePipe        // Para recortar la descripción
  ],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss']
})
export class ProductCardComponent {
  @Input() product!: IProduct; // El producto que se mostrará en la tarjeta

  // Eventos de salida para las acciones del usuario
  @Output() addToCartClicked = new EventEmitter<IProduct>();
  @Output() viewDetailsClicked = new EventEmitter<number>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  addToCart(): void {
    if (this.product.stockQuantity > 0) {
      this.addToCartClicked.emit(this.product);
      console.log('Añadir al carrito:', this.product.name);
      // Aquí podrías añadir una notificación o un efecto visual
    } else {
      console.warn('Producto sin stock:', this.product.name);
    }
  }

  viewDetails(): void {
    this.viewDetailsClicked.emit(this.product.id);
    console.log('Ver detalles de:', this.product.name);
    // Aquí podrías navegar a la página de detalles del producto
  }
}