import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as ProductActions from './product.actions';
import { ProductService } from '../../services/product/product.service';

@Injectable()
export class ProductEffects {
  actions$ = inject(Actions);
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    public productService: ProductService,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    public router: Router,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getAll),
      mergeMap(() =>
        this.productService.getAll().pipe(
          map((response) =>
            ProductActions.setAll({
              products: response,
            }),
          ),
          catchError((error) =>
            of(
              ProductActions.error({
                error: error.error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );
  
}