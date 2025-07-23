import { createAction, props } from '@ngrx/store';
import { ICart, IProductCart } from '../../interfaces/cart/cart.interface';

export const getByUser = createAction(
  '[Cart] Get By User'
);

export const setCart = createAction(
  '[Cart] Set By User',
  props<{ cart : ICart }>() 
);

export const error = createAction(
  '[Cart] error service',
  props<{ error: string }>()
);

export const addProductToCart = createAction(
  '[Cart] add Product To Cart',
  props<{ productCart : IProductCart }>() 
);

export const updateProductToCart = createAction(
  '[Cart] update Product To Cart',
  props<{ productCart : IProductCart }>() 
);

export const deleteProductToCart = createAction(
  '[Cart] delete Product To Cart',
  props<{ productId : number }>() 
);

export const clearCart = createAction(
  '[Cart] clear Product To Cart'
);
