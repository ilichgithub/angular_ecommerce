import { Injectable } from '@angular/core';
import { IProductCart } from '../../interfaces/cart/cart.interface';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService extends BaseService<IProductCart>  {
  
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    http: HttpClient,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private service: BaseService<IProductCart>) {
    super(http);
  }

  addProductToCart(productCart: IProductCart) {
    return this.service.post("http://localhost:8080/api/cart/add",productCart);
  }
  
}
