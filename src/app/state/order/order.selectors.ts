import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from './order.state';

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const selectOrder = createSelector(
  selectOrderState,
  (state: OrderState) => state.order
);

export const selectOrderError = createSelector(
  selectOrderState,
  (state: OrderState) => state.error
);

export const selectOrderLoading = createSelector(
  selectOrderState,
  (state: OrderState) => state.isLoading
);

export const selectOrders = createSelector(
  selectOrderState,
  (state: OrderState) => state.orders
);