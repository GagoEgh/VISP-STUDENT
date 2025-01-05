import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { UserIcon } from '../../common/ui/user-icon';
import { DatabaseService } from '../../core/services/datebase';
import { StudentItnerface } from '../../core/types/student.interface';
import { ClickOutsideDirective } from '../../core/directives/click-outside.directive';

@Component({
  selector: 'visp-dashboard',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NavComponent,UserIcon,ClickOutsideDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public openPopup = signal(false);
  public showPicture = signal(false);
  public student:WritableSignal<StudentItnerface|null>= signal(null);
  private fileToUpload!: File;
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

  public handleFileInput(event:Event):void {
    const fileList: FileList = (event.target as HTMLInputElement).files!;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.fileToUpload = file;
    }

    this.upload(this.fileToUpload);
  }

  private upload(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      this.student.update((currentState:StudentItnerface|null)=>{
        if (!currentState) {
          return null; 
        }
        return{
          ...currentState,
          img:imageData
        }
      })

      this.db.updateStudentInfo(this.student()!);
      this.getStudent();
    };

    reader.onerror = (error) => {
        console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
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
