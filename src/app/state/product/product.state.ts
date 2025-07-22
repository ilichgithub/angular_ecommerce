import { IProduct } from "../../interfaces/product/product.interface";

export interface ProductState {
  product: IProduct | null;
  products: IProduct[];
  error: string | null;
  isLoading: boolean;
}

// Estado inicial
export const initialProductState: ProductState = {
  product: null,
  products: [],
  error: null,
  isLoading: false,
};