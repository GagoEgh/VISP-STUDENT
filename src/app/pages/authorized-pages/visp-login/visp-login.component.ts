import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { ArrowRightIcon } from '../../../common/ui/arrow-right-icon';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DatabaseService } from '../../../core/services/datebase';
import { StudentItnerface } from '../../../core/types/student.interface';
import { EmailComponent } from '../../../common/components/email/email.component';
import { PasswordComponent } from '../../../common/components/password/password.component';
import { emailValidator } from '../../../core/helpers/validators/emailValidator';
import { ErrorComponent } from '../../../common/components/error/error.component';
import { StudentDataService } from '../../../core/services/studentData.service';

@Component({
  selector: 'app-visp-login',
  standalone: true,
  imports: [
    ArrowRightIcon, 
    ReactiveFormsModule,
    RouterOutlet, 
    RouterLink,
    EmailComponent,
    PasswordComponent,
    ErrorComponent
  ],
  templateUrl: './visp-login.component.html',
  styleUrls:['./visp-login.component.scss','../authorized-pages.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private db = inject(DatabaseService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private studentData = inject(StudentDataService);

  public loginForm: FormGroup;
  public errorText:string = 'wrong email or password';
  public isError = signal(false);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,emailValidator]],
      password: ['',[Validators.required,Validators.minLength(7)]],
    });
  }

  public showErrorMessage(controlName:string,validatorsName:string):boolean{
    return this.loginForm.controls[controlName].hasError(validatorsName) && this.loginForm.controls[controlName].touched
  }

  public async send() {

    if (this.loginForm.valid) {
      const student:StudentItnerface = this.loginForm.value;
      const studentDate = await this.studentData.LogStudent(student);

      if(studentDate){
        this.db.addInDb(studentDate);
        this.router.navigate(['home']);
        this.loginForm.reset();
      }
    }

    this.isError.update((value)=>value = true);
    
    setTimeout(()=>{
      this.isError.set(false)
    },1000)
  }

}
