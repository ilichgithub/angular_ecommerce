import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error/error.service';
import * as CartActions from './cart.actions';
import { CartService } from '../../services/cart/cart.service';
import { ProductCartService } from '../../services/product-cart/product-cart.service';

@Injectable()
export class CartEffects {
  actions$ = inject(Actions);
  errorService = inject(ErrorService);
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    public cartService: CartService,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    public productCartService: ProductCartService,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    public router: Router,
  ) {}

  getByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.getByUser),
      mergeMap(() =>
        this.cartService.getCartByUser().pipe(
          map((response) =>
            CartActions.setCart({
              cart: response,
            }),
          ),
          catchError((error) =>
            of(
              CartActions.error({
                error: error.error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addProductToCart),
      mergeMap(({ productCart }) =>
        this.productCartService.addProductToCart(productCart).pipe(
          map(() => {
            this.errorService.showSuccess('Success');
            return CartActions.getByUser();
          }),
          catchError((error) => {
            this.errorService.showError(error);
            return of(
              CartActions.error({
                error: 'Error addProductToCart',
              }),
            );
          }),
        ),
      ),
    ),
  );
}