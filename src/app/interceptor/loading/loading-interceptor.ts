import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../../services/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Muestra el spinner al inicio de cada petición HTTP
    this.loadingService.show();

    // Continúa con la petición y oculta el spinner cuando la petición se complete o falle
    return next.handle(request).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}