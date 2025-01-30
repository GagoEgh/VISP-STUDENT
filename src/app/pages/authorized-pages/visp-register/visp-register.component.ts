import { Component, inject } from '@angular/core';
import { DatabaseService } from '../../../core/services/datebase';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ArrowRightIcon } from '../../../common/ui/arrow-right-icon';
import { VisibilityIcon } from '../../../common/ui/visibility-icon';
import { passwordMatchValidator } from '../../../core/helpers/validators/passwordMatchValidator';
import { emailValidator } from '../../../core/helpers/validators/emailValidator';

@Component({
  selector: 'visp-visp-register',
  standalone: true,
  imports: [ArrowRightIcon, VisibilityIcon, ReactiveFormsModule,RouterOutlet, RouterLink],
  templateUrl: './visp-register.component.html',
  styleUrls:['./visp-register.component.scss','../authorized-pages.scss']
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
      email: ['',[Validators.required,emailValidator]],
      password: ['',[Validators.required]],
      confirmPassword: ['',[Validators.required]],
      name:['', [Validators.required]],
      birthDate:['',[Validators.required]],
      gender:['', [Validators.required]],
    },{validators:[passwordMatchValidator('password','confirmPassword')]});
  }

  public showErrorMessage(controlName:string,validatorsName:string):boolean{
    return this.registerForm.controls[controlName].hasError(validatorsName) && this.registerForm.controls[controlName].touched
  }

  send(){
    console.log('form',this.registerForm.errors);
    console.log('form',this.registerForm.valid)
  }
}
