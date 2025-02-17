import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { UserIcon } from '../../common/ui/user-icon';
import { StudentItnerface } from '../../core/types/student.interface';
import { ClickOutsideDirective } from '../../core/directives/click-outside.directive';
import { CloseIcon } from '../../common/ui/close-icon';
import { UserpopupComponent } from '../../common/components/userpopup/userpopup.component';
import { StudentDataService } from '../../core/services/studentData.service';

@Component({
  selector: 'visp-dashboard',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NavComponent,UserIcon,ClickOutsideDirective,CloseIcon,UserpopupComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public isOpen:WritableSignal<boolean> = signal(false);
  public openPopup = signal(false);
  public student:WritableSignal<StudentItnerface|null>= signal(null);
  public showPicture = signal(false);
 
  private studentService = inject(StudentDataService);
  constructor(){
    this.studentService.getStudent(this.student)
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

  public isOpenChange(ev:boolean){
   this.isOpen.set(ev)
  }
}
