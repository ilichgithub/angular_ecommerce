import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf, ngClass
import { TranslateModule } from '@ngx-translate/core'; // Para el pipe de traducción
import { Subscription, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ErrorService } from '../../services/error/error.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule // Importa TranslateModule para usar el pipe 'translate'
  ],
  templateUrl: './notification.html',
  styleUrls: ['./notification.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  message = '';
  show = false;
  error = false;
  success = false;
  private errorSubscription: Subscription | undefined;
  private successSubscription: Subscription | undefined;
  private timerSubscription: Subscription | undefined;
  private readonly AUTO_HIDE_DELAY = 5000; // 5 segundos

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private errorService: ErrorService) { }

  ngOnInit(): void {
    // Suscribirse al mensaje de error del servicio
    this.errorSubscription = this.errorService.error$.pipe(
      // Usamos switchMap para cancelar el timer anterior si llega un nuevo error
      tap(() => {
        if (this.timerSubscription) {
          this.timerSubscription.unsubscribe(); // Cancela el timer si ya había uno activo
        }
      }),
      switchMap(msg => {
        if (msg) {
          this.message = msg;
          this.show = true;
          this.error = true;
          // Inicia un nuevo timer para ocultar automáticamente
          return timer(this.AUTO_HIDE_DELAY);
        } else {
          this.show = false; // Oculta si el mensaje es nulo/vacío
          this.error = false; 
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          return new Promise(() => {}); // Retorna un observable que nunca emite para no ocultar inmediatamente
        }
      })
    ).subscribe(() => {
      // Este bloque se ejecuta cuando el timer finaliza
      this.close();
    });
    // Suscribirse al mensaje de success del servicio
    this.successSubscription = this.errorService.success$.pipe(
      // Usamos switchMap para cancelar el timer anterior si llega un nuevo error
      tap(() => {
        if (this.timerSubscription) {
          this.timerSubscription.unsubscribe(); // Cancela el timer si ya había uno activo
        }
      }),
      switchMap(msg => {
        if (msg) {
          this.message = msg;
          this.show = true;
          this.success = true;
          // Inicia un nuevo timer para ocultar automáticamente
          return timer(this.AUTO_HIDE_DELAY);
        } else {
          this.show = false; // Oculta si el mensaje es nulo/vacío
          this.success = false; 
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          return new Promise(() => {}); // Retorna un observable que nunca emite para no ocultar inmediatamente
        }
      })
    ).subscribe(() => {
      // Este bloque se ejecuta cuando el timer finaliza
      this.close();
    });
  }

  close(): void {
    this.show = false;
    this.error = false;
    this.success = false;
    this.message = ''; // Limpiar el mensaje después de ocultar
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Asegúrate de limpiar el timer manualmente si se cierra antes
    }
    // Opcional: Reiniciar el estado del servicio de error
    // this.errorService.clearError();
  }

  ngOnDestroy(): void {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
    if (this.successSubscription) {
      this.successSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}