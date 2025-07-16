import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module'; // <-- Importa el módulo de enrutamiento
import { LoginComponent } from './components/login/login.component'; // <-- Importa el componente autónomo

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // <-- Añade AppRoutingModule aquí
    HttpClientModule,
    LoginComponent // <-- Añade el componente autónomo aquí
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }