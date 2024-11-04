import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { UserIcon } from '../../common/ui/user-icon';

@Component({
  selector: 'visp-dashboard',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NavComponent,UserIcon],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
