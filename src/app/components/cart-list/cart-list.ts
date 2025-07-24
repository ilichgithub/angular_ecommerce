import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; // CurrencyPipe para formatear precio
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // Para el pipe de traducción
import { RouterModule } from '@angular/router'; // Para navegación y routerLink
import { ICart, INITIAL_IORDERRESPONSE, IProductCart } from '../../interfaces/cart/cart.interface';
import { Store } from '@ngrx/store';
import { selectCart } from '../../state/cart/cart.selectors';
import { clearCart, deleteProductToCart, updateProductToCart } from '../../state/cart/cart.actions';
import { placeOrder } from '../../state/order/order.actions';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Para ngModel en el input de cantidad
    TranslateModule, // Para el pipe translate
    CurrencyPipe, // Para el pipe currency
    RouterModule, // Para routerLink en el botón "Go to Products"
  ],
  templateUrl: './cart-list.html',
  styleUrls: ['./cart-list.scss'],
})
export class CartListComponent {
  cart: ICart | null = null; // El carrito, puede ser null si no está cargado o vacío
  //translate = inject(TranslateModule)
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private store: Store,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private translate: TranslateService,
  ) {
    this.store
      .select(selectCart)
      .subscribe(
        (obj) =>
          (this.cart = {
            ...obj,
            total: obj?.total ? obj?.total : 0,
            cartId: obj?.cartId ? obj?.cartId : 0,
            items: obj?.items ? obj.items.map((item) => ({ ...item })) : [],
          }),
      );
  }

  /**
   * Maneja el cambio de cantidad de un ítem en el carrito.
   * @param item El ítem del carrito cuya cantidad ha cambiado.
   */
  onQuantityChange(item: IProductCart): void {
    // Asegurarse de que la cantidad sea un número válido y al menos 1
    if (item.quantity < 1 || isNaN(item.quantity)) {
      item.quantity = 1; // Forzar a 1 si es inválido
      return;
    }
    this.store.dispatch(
      updateProductToCart({
        productCart: item,
      }),
    );
  }

  /**
   * Elimina un ítem del carrito.
   * @param cartItemId El ID del ítem del carrito a eliminar.
   */
  removeItem(cartItemId: number): void {
    if (confirm(this.translate.instant('CART.CONFIRM_REMOVE_ITEM'))) {
      // Preguntar confirmación
      this.store.dispatch(
        deleteProductToCart({
          productId: cartItemId,
        }),
      );
    }
  }

  /**
   * Vacía todo el carrito.
   */
  clearCart(): void {
    if (confirm(this.translate.instant('CART.CONFIRM_CLEAR_CART'))) {
      // Preguntar confirmación
      this.store.dispatch(clearCart());
    }
  }

  /**
   * Simula el proceso de checkout.
   */
  checkout(): void {
    if (this.cart && this.cart.items.length > 0) {
      this.store.dispatch(placeOrder({ order: INITIAL_IORDERRESPONSE }));
    } else {
      alert(this.translate.instant('CART.EMPTY_CART_CHECKOUT_ERROR'));
    }
  }
}