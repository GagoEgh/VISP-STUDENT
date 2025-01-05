import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { UserIcon } from '../../common/ui/user-icon';
import { DatabaseService } from '../../core/services/datebase';
import { StudentItnerface } from '../../core/types/student.interface';
import { ClickOutsideDirective } from '../../core/directives/click-outside.directive';
import { CloseIcon } from '../../common/ui/close-icon';
import { UserpopupComponent } from '../../common/components/userpopup/userpopup.component';

@Component({
  selector: 'visp-dashboard',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NavComponent,UserIcon,ClickOutsideDirective,CloseIcon,UserpopupComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public openPopup = signal(false);
  public student:WritableSignal<StudentItnerface|null>= signal(null);
  public showPicture = signal(false);
  private db = inject(DatabaseService);
  constructor(){
    this.getStudent()
  }

  get userImage(): string {
    return this.student()?.img || 'images/user.png';
  }

  public showPopup(){
    this.openPopup.update(value=>value= !value);
  }

  public clickOutside():void{
    this.openPopup.set(false);
  }

  public onShowPicture(ev:boolean):void{
    this.showPicture.set(ev);
  }
  
  private getStudent():void{
    this.db.getStudent()
    .then((result)=>{
      this.student.set(result);
    })
    .catch((erore)=>{
      console.log('Error',erore);
    })
  }
}
