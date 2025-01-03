import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { UserIcon } from '../../common/ui/user-icon';
import { DatabaseService } from '../../core/services/datebase';

@Component({
  selector: 'visp-dashboard',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NavComponent,UserIcon],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private db = inject(DatabaseService);
  student:any= signal('');

  constructor(){

    this.db.getStudent()
    .then((result)=>{
      this.student.set(result)
    })
    .catch((erore)=>{
      console.log('eror',erore)
    })

  }
}
