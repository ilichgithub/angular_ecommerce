import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../interfaces/product/product.interface';

export const getAll = createAction(
  '[Product] Get All'
);

export const setAll = createAction(
  '[Product] Set All',
  props<{ products : IProduct[] }>() 
);

export const error = createAction(
  '[Product] error service',
  props<{ error: string }>()
);
