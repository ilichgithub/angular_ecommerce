import { createReducer, on } from '@ngrx/store';
import { initialCartState } from './cart.state';
import * as CartActions from './cart.actions';

export const cartReducer = createReducer(
  initialCartState, 

  on(CartActions.getByUser, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(CartActions.setCart, (state, { cart }) => ({
    ...state,
    cart,
    isLoading: false,
    error: null,
  })),

  on(CartActions.error, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(CartActions.addProductToCart, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(CartActions.updateProductToCart, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(CartActions.deleteProductToCart, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(CartActions.clearCart, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
);