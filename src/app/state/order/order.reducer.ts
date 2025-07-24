import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';
import { initialOrderState } from './order.state';

export const orderReducer = createReducer(
  initialOrderState, 

  on(OrderActions.placeOrder, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(OrderActions.setOrder, (state, { order }) => ({
    ...state,
    order,
    isLoading: false,
    error: null,
  })),

  on(OrderActions.error, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(OrderActions.setOrders, (state, { orders }) => ({
    ...state,
    orders,
    isLoading: false,
    error: null,
  })),

  on(OrderActions.getInfoOrder, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

);