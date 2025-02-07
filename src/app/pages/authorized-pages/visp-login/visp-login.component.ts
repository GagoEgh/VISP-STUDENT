import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
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

  public loginForm: FormGroup;
  public errorText:string = 'wrong email or password';
  public isError = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,emailValidator]],
      password: ['',[Validators.required,Validators.minLength(7)]],
    });
  }

  public showErrorMessage(controlName:string,validatorsName:string):boolean{
    return this.loginForm.controls[controlName].hasError(validatorsName) && this.loginForm.controls[controlName].touched
  }

  public send(): void {
    const student:StudentItnerface = this.loginForm.value;
    student.img = '';
    student.notifications=[];
    if (this.loginForm.valid) {
      // this.db.addInDb(student);
      // this.router.navigate(['home']);
      // this.loginForm.reset();
    }

    this.isError = true;
    this.cdr.detectChanges();
    
  }

  isErroreChange(ev:boolean){
    this.isError = ev
  }
  // private async findeEmailFromDb(email:string):Promise<StudentItnerface>{
  //   const students = await this.db.getAllStudent();
  //   return students.find((student:StudentItnerface)=>student.email===email)
  // }
}
