import { ChangeDetectionStrategy, Component, inject,} from '@angular/core';
import { DatabaseService } from '../../../core/services/datebase';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ArrowRightIcon } from '../../../common/ui/arrow-right-icon';
import { VisibilityIcon } from '../../../common/ui/visibility-icon';
import { passwordMatchValidator } from '../../../core/helpers/validators/passwordMatchValidator';
import { emailValidator } from '../../../core/helpers/validators/emailValidator';
import { EmailComponent } from '../../../common/components/email/email.component';

@Component({
  selector: 'visp-visp-register',
  standalone: true,
  imports: [ArrowRightIcon, VisibilityIcon, ReactiveFormsModule,RouterOutlet, RouterLink, EmailComponent],
  templateUrl: './visp-register.component.html',
  styleUrls:['./visp-register.component.scss','../authorized-pages.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class VispRegisterComponent {
  private db = inject(DatabaseService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);

  public registerForm!: FormGroup;
  public crossed = true;

 constructor() {
    this.initForm();
  }
  
  private initForm():void{
    this.registerForm = this.fb.group({
      email: ['',[Validators.required,emailValidator]],
      password: ['',[Validators.required,Validators.minLength(7)]],
      confirmPassword: ['',[Validators.required, Validators.minLength(7)]],
      name:['', [Validators.required]],
      birthDate:['',[Validators.required]],
      gender:['', [Validators.required]],
    },{validators:[passwordMatchValidator('password','confirmPassword')]});
  }

  public showErrorMessage(controlName:string,validatorsName:string):boolean{
    return this.registerForm.controls[controlName].hasError(validatorsName) && this.registerForm.controls[controlName].touched
  }

  public isSamePassword():boolean{
    return this.registerForm.errors && this.registerForm.errors['passwordNoMatch'] &&  (this.registerForm.controls['confirmPassword'].valid && this.registerForm.controls['password'].valid)
  }

  public send(){
    if(this.registerForm.valid){
      this.db.addInDb(this.registerForm.value);
      this.router.navigate(['home']);
      this.registerForm.reset()
    }
  }

  public createMaxDate(): string {
    const date = new Date("2019-12-31");
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
  
    return `${year}-${formattedMonth}-${formattedDay}`;
  }
}
