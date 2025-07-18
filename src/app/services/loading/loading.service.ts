import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // BehaviorSubject emite el último valor a los nuevos suscriptores
  // y también permite emitir nuevos valores.
  private _isLoading = new BehaviorSubject<boolean>(false);

  // Observable público para que los componentes se suscriban
  public isLoading$: Observable<boolean> = this._isLoading.asObservable();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  /**
   * Muestra el spinner de carga.
   */
  show(): void {
    this._isLoading.next(true);
  }

  /**
   * Oculta el spinner de carga.
   */
  hide(): void {
    this._isLoading.next(false);
  }
}