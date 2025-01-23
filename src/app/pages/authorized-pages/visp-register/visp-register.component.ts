import { Component, inject } from '@angular/core';
import { DatabaseService } from '../../../core/services/datebase';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ArrowRightIcon } from '../../../common/ui/arrow-right-icon';
import { VisibilityIcon } from '../../../common/ui/visibility-icon';

@Component({
  selector: 'visp-visp-register',
  standalone: true,
  imports: [ArrowRightIcon, VisibilityIcon, ReactiveFormsModule,RouterOutlet, RouterLink],
  templateUrl: './visp-register.component.html',
  styleUrl: './visp-register.component.scss'
})
export class VispRegisterComponent {
  private db = inject(DatabaseService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router)
  public registerForm!: FormGroup;
  public crossed = true;
 
 constructor() {
    this.initForm()
  }
  
  private initForm():void{
    this.registerForm = this.fb.group({
      password: [
        '',
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ],
      name:['',{
        nonNullable: true,
        validators:[Validators.required]
      }],
      birthDate:['',{
        nonNullable: true,
        validators:[Validators.required]
      }],
      gender:['',{
        nonNullable: true,
        validators:[Validators.required]
      }],
      language:['',{
        nonNullable: true,
        validators:[Validators.required]
      }],
      nativeState:['',{
        nonNullable: true,
        validators:[Validators.required]
      }],
      religion:['',{
        nonNullable: true,
        validators:[Validators.required]
      }]
    });
  }
  send(){

  }
}
