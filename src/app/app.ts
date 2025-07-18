import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from "./components/spinner/spinner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ecommerce-frontend');
}
