import { Component, inject } from '@angular/core';
import { ArrowRightIcon } from '../../../common/ui/arrow-right-icon';
import { VisibilityIcon } from '../../../common/ui/visibility-icon';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DatabaseService } from '../../../core/services/datebase';
import { StudentItnerface } from '../../../core/types/student.interface';

@Component({
  selector: 'app-visp-login',
  standalone: true,
  imports: [ArrowRightIcon, VisibilityIcon, ReactiveFormsModule,RouterOutlet, RouterLink],
  templateUrl: './visp-login.component.html',
  styleUrl: './visp-login.component.scss',
})
export class LoginComponent {
  private db = inject(DatabaseService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router)
  public loginForm: FormGroup;
  public crossed = true;

  constructor() {
    this.loginForm = this.fb.group({
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
      }]
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
      this.db.addInDb(student);
      this.router.navigate(['home']);
      this.loginForm.reset();
    }
  }
}
