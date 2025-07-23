import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card';
import { IProduct } from '../../interfaces/product/product.interface';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../state/product/product.actions';
import * as ProductSelectors from '../../state/product/product.selectors';
import { addProductToCart } from '../../state/cart/cart.actions';
import { INITIAL_IPRODUCTCART, IProductCart } from '../../interfaces/cart/cart.interface';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent], // Asegúrate de importar ProductCardComponent
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductsListComponent {
  products: IProduct[] = []; // Array para almacenar tus productos

  http = inject(HttpClient);
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private store: Store,
  ) {
    this.store.dispatch(ProductActions.getAll());
    this.store
      .select(ProductSelectors.selectProducts)
      .subscribe((obj) => (this.products = obj));
  }

  onAddToCart(product: IProduct): void {
    const cart : IProductCart = {
      ...INITIAL_IPRODUCTCART,
      productId: product.id,
      quantity: product.quantity,
    };
    this.store.dispatch(
      addProductToCart({
        productCart: cart,
      }),
    );
  }

  onViewDetails(productId: number): void {
    // Aquí usarías Router para navegar a /products/:id
    alert(`Navegar a detalles del producto con ID: ${productId}`);
  }
}