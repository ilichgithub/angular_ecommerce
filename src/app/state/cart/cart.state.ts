import { ICart } from "../../interfaces/cart/cart.interface";

export interface CartState {
  cart: ICart | null;
  error: string | null;
  isLoading: boolean;
}

// Estado inicial
export const initialCartState: CartState = {
  cart: null,
  error: null,
  isLoading: false,
};