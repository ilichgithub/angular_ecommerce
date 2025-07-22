import { Component } from '@angular/core';
import { ProductsListComponent } from "../product-list/product-list";

@Component({
  selector: 'app-dashboard',
  imports: [ProductsListComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {

}