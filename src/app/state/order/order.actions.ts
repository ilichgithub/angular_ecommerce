import { createAction, props } from '@ngrx/store';
import { IOrderResponse } from '../../interfaces/cart/cart.interface';

export const placeOrder = createAction(
  '[Order] place order',
  props<{ order : IOrderResponse }>() 
);

export const setOrder = createAction(
  '[Order] Set order',
  props<{ order : IOrderResponse }>() 
);

export const error = createAction(
  '[Order] error service',
  props<{ error: string }>()
);

export const getUserOrders = createAction(
  '[Order] get user orders'
);

export const setOrders = createAction(
  '[Order] Set orders',
  props<{ orders : IOrderResponse[] }>() 
);

export const getInfoOrder = createAction(
  '[Order] get info order',
  props<{ id : number }>()
);
