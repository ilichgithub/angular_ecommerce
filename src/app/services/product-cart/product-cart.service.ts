import { Injectable } from '@angular/core';
import { IProductCart } from '../../interfaces/cart/cart.interface';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService extends BaseService  {
  
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    http: HttpClient,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private service: BaseService) {
    super(http);
  }

  addProductToCart(productCart: IProductCart) {
    return this.service.post<IProductCart,IProductCart>("http://localhost:8080/api/cart/add",productCart);
  }

  updateProductToCart(productCart: IProductCart) {
    return this.service.put<IProductCart,IProductCart>("http://localhost:8080/api/cart/update",productCart);
  }

  deleteProductToCart(productId: number) {
    return this.service.delete<IProductCart>("http://localhost:8080/api/cart/remove/"+productId);
  }

  clearCart() {
    return this.service.delete<IProductCart>("http://localhost:8080/api/cart/clear");
  }
  
}
