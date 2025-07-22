import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectProduct = createSelector(
  selectProductState,
  (state: ProductState) => state.product
);

export const selectProductError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

export const selectProductLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.isLoading
);

export const selectProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);