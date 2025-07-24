import { IOrderResponse } from "../../interfaces/cart/cart.interface";

export interface OrderState {
  order: IOrderResponse | null;
  orders: IOrderResponse[];
  error: string | null;
  isLoading: boolean;
}

// Estado inicial
export const initialOrderState: OrderState = {
  order: null,
  orders: [],
  error: null,
  isLoading: false,
};