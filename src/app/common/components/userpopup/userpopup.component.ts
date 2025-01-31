import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { StudentItnerface } from '../../../core/types/student.interface';
import { StudentDataService } from '../../../core/services/studentData.service';

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

  public onShowPicture():void{
    this.showPicture.set(true);
    this.showPictureEvent.emit(true)
  }

  private upload(file: File):void {
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      this.studentService.updateStudentDate(this.student,imageData,'img');
    };

    reader.onerror = (error) => {
        console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
  }

}
