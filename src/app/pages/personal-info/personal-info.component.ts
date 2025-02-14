import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../core/helpers/validators/emailValidator';
import { StudentItnerface } from '../../core/types/student.interface';
import { StudentDataService } from '../../core/services/studentData.service';
import { DatabaseService } from '../../core/services/datebase';

@Component({
  selector: 'visp-personal-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PersonalInfoComponent implements OnInit{
  public personalInfo!:FormGroup;
  public student:WritableSignal<StudentItnerface|null>= signal(null);


  private fb = inject(NonNullableFormBuilder);
  private db = inject(DatabaseService)
  private studentService = inject(StudentDataService);
  

  constructor(){
    this.studentService.getStudent(this.student);
    
    
  }

  ngOnInit(): void {
    this.initPersonalInfo()
  }

  public save():void{
    console.log('form',this.personalInfo)
    console.log('form',this.personalInfo.valid)
  }

  private initPersonalInfo(){
    this.personalInfo = this.fb.group({
      email: [this.student()?.email,[Validators.required,emailValidator]],
      name:['', [Validators.required]],
      birthDate:['',[Validators.required]],
      gender:['', [Validators.required]],
      nativeLanguager:[''],
      nativeState:[''],
      religion:[''],
      bloodGroup:[''],
    })
  }
}
