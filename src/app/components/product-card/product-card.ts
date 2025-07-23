import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, SlicePipe } from '@angular/common'; // CurrencyPipe y SlicePipe
import { TranslateModule } from '@ngx-translate/core'; // Para el pipe de traducción
import { IProduct } from '../../interfaces/product/product.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule, // Importa TranslateModule para usar el pipe 'translate'
    CurrencyPipe,    // Para formatear el precio
    SlicePipe,        // Para recortar la descripción
    FormsModule,  
  ],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: IProduct; // El producto que se mostrará en la tarjeta

  // Eventos de salida para las acciones del usuario
  @Output() addToCartClicked = new EventEmitter<IProduct>();
  @Output() viewDetailsClicked = new EventEmitter<number>();
  
  quantity = 1; // Cantidad por defecto inicializada a 1

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  ngOnInit(): void {
    // Asegura que la cantidad inicial sea 1 o 0 si no hay stock
    if (this.product.stockQuantity === 0) {
      this.quantity = 0;
    } else {
      this.quantity = 1;
    }
  }

  addToCart(): void {
    if (this.product.stockQuantity > 0 && this.quantity > 0) {
      //this.addToCartClicked.emit(this.product);
      this.addToCartClicked.emit({ ...this.product, quantity: this.quantity });
      // Aquí podrías añadir una notificación o un efecto visual
    } else {
      console.warn('Producto sin stock:', this.product.name);
    }
  }

  viewDetails(): void {
    this.viewDetailsClicked.emit(this.product.id);
    // Aquí podrías navegar a la página de detalles del producto
  }


  onQuantityChange(): void {
    // Asegura que la cantidad no sea menor que 1
    if (this.quantity < 1) {
      this.quantity = 1;
    }
    // Asegura que la cantidad no exceda el stock
    if (this.quantity > this.product.stockQuantity) {
      this.quantity = this.product.stockQuantity;
    }
    // Si el stock es 0, la cantidad debe ser 0
    if (this.product.stockQuantity === 0) {
      this.quantity = 0;
    }
  }
}