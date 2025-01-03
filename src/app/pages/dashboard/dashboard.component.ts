import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { UserIcon } from '../../common/ui/user-icon';
import { DatabaseService } from '../../core/services/datebase';
import { StudentItnerface } from '../../core/types/student.interface';

@Component({
  selector: 'visp-dashboard',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NavComponent,UserIcon],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private db = inject(DatabaseService);
  student:WritableSignal<StudentItnerface|null>= signal(null);

  constructor(){

    this.db.getStudent()
    .then((result)=>{
      this.student.set(result);
    })
    .catch((erore)=>{
      console.log('Error',erore);
    })

  }
}
