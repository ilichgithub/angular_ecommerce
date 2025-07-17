import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// --- Importaciones de NgRx ---
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
// --- Fin Importaciones de NgRx ---
import { routes } from './app.routes';
import { tokenInterceptor } from './interceptor/token-interceptor';
import { authReducer } from './state/auth/auth.reducer';
import { AuthEffects } from './state/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideRouter(routes),
    // --- Configuración de NgRx ---
    provideStore({
      auth: authReducer,
    }),
    provideEffects([
      AuthEffects,
    ]),
    provideStoreDevtools({
      maxAge: 25, // Retiene un máximo de 25 estados en el historial
      logOnly: !isDevMode(), // Limita el registro de acciones cuando no estás en modo de desarrollo
      autoPause: true, // Pausa las notificaciones de estado cuando la ventana está inactiva
      trace: false, // Habilita el seguimiento de pila para errores
      traceLimit: 75, // Limita el seguimiento de pila a 75 llamadas
    }),
    // --- Fin Configuración de NgRx ---
  ],
};
