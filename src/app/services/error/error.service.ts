import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  // BehaviorSubject para almacenar y emitir el mensaje de error
  private _error = new BehaviorSubject<string | null>(null);
  private _success = new BehaviorSubject<string | null>(null);

  // Observable público para que los componentes se suscriban a los errores
  public error$: Observable<string | null> = this._error.asObservable();
  public success$: Observable<string | null> = this._success.asObservable();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  /**
   * Muestra un mensaje de error en la notificación.
   * @param messageKey La clave de traducción del mensaje de error.
   */
  showError(messageKey: string): void {
    this._error.next(messageKey);
  }

  /**
   * Oculta el mensaje de error.
   */
  clearError(): void {
    this._error.next(null);
  }

  /**
   * Muestra un mensaje de success en la notificación.
   * @param messageKey La clave de traducción del mensaje de success.
   */
  showSuccess(messageKey: string): void {
    this._success.next(messageKey);
  }

  /**
   * Oculta el mensaje de success.
   */
  clearSuccess(): void {
    this._success.next(null);
  }
}