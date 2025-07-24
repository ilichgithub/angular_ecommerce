import { Injectable } from '@angular/core';
import { IProduct } from '../../interfaces/product/product.interface';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService  {
  
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    http: HttpClient,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private service: BaseService) {
    super(http);
  }
  
  getProductAll() {
    return this.service.getAll<IProduct>("http://localhost:8080/api/product/getAll");
  }
  
}
