
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Servicio genérico para operaciones CRUD básicas (GET, POST, PUT, DELETE).
 * Utiliza genéricos de TypeScript para trabajar con cualquier tipo de entidad (T).
 *
 * @param T El tipo de entidad con la que trabajará este servicio (ej. Usuario, Producto).
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class BaseService<T> { 

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(protected http: HttpClient) { }

  /**
   * Maneja errores HTTP.
   * @param error El HttpErrorResponse.
   * @returns Un Observable que emite un error.
   */
  protected handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error?.error?.message) {
      // Error del lado del cliente o de red
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error del servidor: Código ${error.status}, Mensaje: ${error.message}`;
      // Aquí puedes loggear el error a un servicio de log externo
      console.error(`Backend error: ${JSON.stringify(error.error)}`);
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // --- Métodos CRUD ---

  /**
   * Obtiene todos los recursos.
   * @returns Un Observable de un array de entidades (T[]).
   */
  get(apiUrl: string): Observable<T[]> {
    return this.http.get<T[]>(apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Crea un nuevo recurso.
   * @param item La entidad a crear.
   * @returns Un Observable de la entidad creada (T).
   */
  post(apiUrl: string, item: T): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<T>(apiUrl, item, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Actualiza un recurso existente.
   * @param id El ID del recurso a actualizar.
   * @param item La entidad con los datos actualizados.
   * @returns Un Observable de la entidad actualizada (T).
   */
  put(apiUrl: string, item: T): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<T>(apiUrl, item, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Elimina un recurso por su ID.
   * @param id El ID del recurso a eliminar.
   * @returns Un Observable de cualquier tipo (generalmente vacío o un mensaje de confirmación).
   */
  delete(apiUrl: string): Observable<T> {
    return this.http.delete<T>(apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
}