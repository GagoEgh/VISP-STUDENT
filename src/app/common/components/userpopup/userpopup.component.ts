import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { StudentItnerface } from '../../../core/types/student.interface';
import { StudentDataService } from '../../../core/services/studentData.service';
import { DatabaseService } from '../../../core/services/datebase';

@Component({
  selector: 'visp-userpopup',
  standalone: true,
  imports: [],
  templateUrl: './userpopup.component.html',
  styleUrl: './userpopup.component.scss'
})
export class UserpopupComponent {
  private fileToUpload!: File;
  private studentService = inject(StudentDataService);
  private db = inject(DatabaseService)
  
  public showPicture = signal(false);
  @Input()student:WritableSignal<StudentItnerface|null> = signal(null);
  @Output()showPictureEvent=new EventEmitter<boolean>();


  public handleFileInput(event:Event):void {
    const fileList: FileList = (event.target as HTMLInputElement).files!;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.fileToUpload = file;
    }

    this.upload(this.fileToUpload);
  }

  public onShowPicture():void{
    this.showPicture.set(true);
    this.showPictureEvent.emit(true)
  }

  private upload(file: File):void {
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      this.studentService.updateStudentDate(imageData,'img');
      this.student = this.studentService.student;
    };

    reader.onerror = (error) => {
        console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
  }

  public async logOut():Promise<void>{
   await this.db.studentLogOut()
  }

}
