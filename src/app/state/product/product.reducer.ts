import { createReducer, on } from '@ngrx/store';
import { initialProductState } from './product.state';
import * as ProductActions from './product.actions';

export const productReducer = createReducer(
  initialProductState, 

  on(ProductActions.getAll, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(ProductActions.setAll, (state, { products }) => ({
    ...state,
    products,
    isLoading: false,
    error: null,
  })),

  on(ProductActions.error, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
);