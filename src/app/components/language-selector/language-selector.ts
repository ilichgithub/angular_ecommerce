import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngFor, ngModel
import { TranslateService } from '@ngx-translate/core'; // Para interactuar con ngx-translate
import { FormsModule } from '@angular/forms'; // Necesario para ngModel ([(ngModel)])

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Agrega FormsModule para usar ngModel
  ],
  templateUrl: './language-selector.html',
  styleUrls: ['./language-selector.scss']
})
export class LanguageSelectorComponent implements OnInit {
  availableLangs: string[] = []; // Idiomas disponibles
  currentLang = '';     // Idioma actualmente seleccionado

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    // Obtiene los idiomas que has añadido a translate.addLangs()
    this.availableLangs = this.translate.getLangs();
    // Establece el idioma actual basándose en lo que ngx-translate tiene configurado
    this.currentLang = this.translate.currentLang;

    // Escucha los cambios de idioma desde el servicio de traducción
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
    });
  }

  changeLanguage(event: Event): void {
    const selectedLang = (event.target as HTMLSelectElement).value;
    this.translate.use(selectedLang); // Cambia el idioma de la aplicación

    // Ejemplo de cómo obtener una traducción en el código TypeScript
    /*
    this.translate.get('GREETING', { name: 'Juan' }).subscribe((res: string) => {
      console.log(res); // Imprimirá "Hola, Juan!" o "Hello, Juan!"
    });
    */
  }
}