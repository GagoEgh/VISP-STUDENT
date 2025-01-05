import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { StudentItnerface } from '../../../core/types/student.interface';
import { DatabaseService } from '../../../core/services/datebase';

@Component({
  selector: 'visp-userpopup',
  standalone: true,
  imports: [],
  templateUrl: './userpopup.component.html',
  styleUrl: './userpopup.component.scss'
})
export class UserpopupComponent {
  private db = inject(DatabaseService);
  private fileToUpload!: File;
  public showPicture = signal(false);
  @Input()student:WritableSignal<StudentItnerface|null> = signal(null);
  @Output()showPictureEvent=new EventEmitter<boolean>()

  public handleFileInput(event:Event):void {
    const fileList: FileList = (event.target as HTMLInputElement).files!;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.fileToUpload = file;
    }

    this.upload(this.fileToUpload);
  }

  public onShowPicture(){
    this.showPicture.set(true);
    this.showPictureEvent.emit(true)
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
