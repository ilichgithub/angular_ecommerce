import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss'
})
export class SpinnerComponent implements OnInit {
  spinnerImageUrl = 'assets/img/spinner-preview.png'; 
  isLoading = false; 

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}