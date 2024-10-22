import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VispLoginComponent } from './pages/authorized-pages/visp-login/visp-login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,VispLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'visp-student';
}
