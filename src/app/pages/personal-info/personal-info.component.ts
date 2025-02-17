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
    this.loadStudent()
  }

  public save():void{
    console.log('form',this.personalInfo)
    console.log('form',this.personalInfo.valid)
  }

  private loadStudent(): void {
    this.studentService.getStudent(this.student);
  
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
