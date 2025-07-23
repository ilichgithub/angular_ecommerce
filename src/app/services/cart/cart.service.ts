import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { ICart } from '../../interfaces/cart/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService<ICart>  {
  
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    http: HttpClient,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private service: BaseService<ICart>) {
    super(http);
  }
  
  getCartByUser() {
    return this.service.get("http://localhost:8080/api/cart");
  }
  
}
