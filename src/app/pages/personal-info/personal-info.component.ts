import { ChangeDetectionStrategy, Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../core/helpers/validators/emailValidator';
import { StudentItnerface } from '../../core/types/student.interface';
import { StudentDataService } from '../../core/services/studentData.service';

@Component({
  selector: 'visp-personal-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PersonalInfoComponent {
  public personalInfo!:FormGroup;
  public student:WritableSignal<StudentItnerface|null>= signal(null);

  private fb = inject(NonNullableFormBuilder);
  private studentService = inject(StudentDataService);

  constructor(){
    this.initPersonalInfo();
    this.loadStudent();
  }

  public save():void{
    this.updateStudentState();
    this.studentService.updatePersonalInfo();
  }

  public handleFileInput(event:Event):void {
    const fileList: FileList = (event.target as HTMLInputElement).files!;
    let fileToUpload!: File;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      fileToUpload = file;
    }

    this.upload(fileToUpload);
  }

  private updateStudentState(){
    this.student.update((currentState:StudentItnerface|null)=>{
      if (!currentState) {
        return null; 
      }
      return{
        ...currentState,
        ...this.personalInfo.value
      }
    })
  }

  private upload(file: File):void {
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      this.personalInfo.get('img')?.patchValue(imageData);
      this.updateStudentState();
    };

    reader.onerror = (error) => {
        console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
  }

  private loadStudent(): void {
    this.student = this.studentService.student;
    effect(() => {
      const student = this.student();
      if (student) {
        this.personalInfo.patchValue(student);
      }
    });
  }

  private initPersonalInfo(){
    this.personalInfo = this.fb.group({
      email: ['',[Validators.required,emailValidator]],
      name:['', [Validators.required]],
      birthDate:['',[Validators.required]],
      gender:['', [Validators.required]],
      nativeLanguager:[''],
      nativeState:[''],
      religion:[''],
      bloodGroup:[''],
      img:['']
    })
  }
}
