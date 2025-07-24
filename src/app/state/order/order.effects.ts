import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error/error.service';
import { OrderService } from '../../services/order/order.service';
import * as OrderActions from './order.actions';
import * as CartActions from '../cart/cart.actions';

@Injectable()
export class OrderEffects {
  actions$ = inject(Actions);
  errorService = inject(ErrorService);
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    public orderService: OrderService,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    public router: Router,
  ) {}

  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.placeOrder),
      mergeMap(({ order }) =>
        this.orderService.placeOrder(order).pipe(
          mergeMap((response) => {
            this.errorService.showSuccess('Success');
            return of(
              OrderActions.setOrder({ order: response }),
              CartActions.getByUser(),
              OrderActions.getUserOrders()
            );
          }),
          catchError((error) => {
            this.errorService.showError(error);
            return of(
              OrderActions.error({
                error: 'Error placeOrder',
              }),
            );
          }),
        ),
      ),
    ),
  );
  
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.getUserOrders),
      mergeMap(() =>
        this.orderService.getUserOrders().pipe(
          map((response) =>
            OrderActions.setOrders({
              orders: response,
            }),
          ),
          catchError((error) =>
            of(
              OrderActions.error({
                error: error.error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );
  
  getInfoOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.getInfoOrder),
      mergeMap(({id}) =>
        this.orderService.getInfoOrder(id).pipe(
          map((response) =>
            OrderActions.setOrder({
              order: response,
            }),
          ),
          catchError((error) =>
            of(
              OrderActions.error({
                error: error.error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}