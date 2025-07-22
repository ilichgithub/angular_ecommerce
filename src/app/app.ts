import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './components/language-selector/language-selector';
import { NotificationComponent } from "./components/notification/notification";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SpinnerComponent,
    TranslateModule,
    CommonModule,
    LanguageSelectorComponent,
    NotificationComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('ecommerce-frontend');
  translate = inject(TranslateService);
  constructor() {
    // Establece los idiomas disponibles y el idioma predeterminado
    this.translate.addLangs(['es', 'en', 'fr']);
    const browserLang = this.translate.getBrowserLang();
    // Usa el idioma del navegador si está disponible, sino 'es'
    this.translate.setDefaultLang(
      browserLang && this.translate.langs.includes(browserLang)
        ? browserLang
        : 'es',
    );
  }

  ngOnInit(): void {
    // También puedes usar el idioma detectado por el navegador como el actual
    // Asegúrate de usar use(`lang`) para cargar el archivo de traducción
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(
      browserLang && this.translate.langs.includes(browserLang)
        ? browserLang
        : 'es',
    );
  }
}
