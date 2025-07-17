import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  http = inject(HttpClient);
  constructor(){
    this.http.get("http://localhost:8080/api/product/getAll")
              .subscribe({
                next:(response)=>{
                  console.log(response);
                },
                error:(error)=>{
                  alert(error.error.message);
                }
              });
  }

}
