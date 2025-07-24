import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { IOrderResponse } from '../../interfaces/cart/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {
  
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    http: HttpClient,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private service: BaseService) {
    super(http);
  }

  placeOrder(productCart: IOrderResponse) {
    return this.service.post<IOrderResponse,IOrderResponse>("http://localhost:8080/api/orders",productCart);
  }

  getUserOrders(){
    return this.service.getAll<IOrderResponse>("http://localhost:8080/api/orders");
  }

  getInfoOrder(id: number){
    return this.service.get<IOrderResponse>("http://localhost:8080/api/orders/"+id);
  }
  
}
