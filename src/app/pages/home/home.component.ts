import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../core/api-config/api-service';

@Component({
  selector: 'visp-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private apiService = inject(ApiService);
  public weekday = toSignal(this.apiService.getWeekday());

}


