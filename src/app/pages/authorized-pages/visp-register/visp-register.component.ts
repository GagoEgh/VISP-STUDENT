import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal,} from '@angular/core';
import { DatabaseService } from '../../../core/services/datebase';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ArrowRightIcon } from '../../../common/ui/arrow-right-icon';
import { VisibilityIcon } from '../../../common/ui/visibility-icon';
import { passwordMatchValidator } from '../../../core/helpers/validators/passwordMatchValidator';
import { emailValidator } from '../../../core/helpers/validators/emailValidator';
import { EmailComponent } from '../../../common/components/email/email.component';
import { PasswordComponent } from '../../../common/components/password/password.component';
import { StudentItnerface } from '../../../core/types/student.interface';
import { ErrorComponent } from '../../../common/components/error/error.component';

@Component({
  selector: 'visp-visp-register',
  standalone: true,
  imports: [
    ErrorComponent,
    ArrowRightIcon,
    VisibilityIcon, 
    ReactiveFormsModule,
    RouterOutlet, 
    RouterLink, 
    EmailComponent,
    PasswordComponent
  ],
  templateUrl: './visp-register.component.html',
  styleUrls:['./visp-register.component.scss','../authorized-pages.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class VispRegisterComponent {
  private db = inject(DatabaseService);
  private cdr = inject(ChangeDetectorRef);
  private readonly fb = inject(NonNullableFormBuilder);

  public registerForm!: FormGroup;
  public errorText = 'This mail is used';
  public isError = signal(false);

 constructor() {
    this.initForm();
  }

  public showErrorMessage(controlName:string,validatorsName:string):boolean{
    return this.registerForm.controls[controlName].hasError(validatorsName) && this.registerForm.controls[controlName].touched
  }

  public isSamePassword():boolean{
    return this.registerForm.errors && this.registerForm.errors['passwordNoMatch'] &&  (this.registerForm.controls['confirmPassword'].valid && this.registerForm.controls['password'].valid)
  }

  public async send(){
    const student = await this.findeEmailFromDb(this.registerForm.value.email);
    if(!student && this.registerForm.valid){
      const data= {...this.registerForm.value,notifications:[]}
      this.db.addInDb(data);
      this.registerForm.reset()
    }
    
    if(student && this.registerForm.valid){
      this.isError.set(true);
         
      setTimeout(()=>{
        this.isError.set(false)
      },1000)
    }
    this.cdr.detectChanges();
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

  private async findeEmailFromDb(email:string):Promise<StudentItnerface>{
    const students = await this.db.getAllStudent();
    return students.find((student:StudentItnerface)=>student.email===email)
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
}
