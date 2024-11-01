import { Component, inject } from '@angular/core';
import { ArrowRightIcon } from '../../../common/ui/arrow-right-icon';
import { VisibilityIcon } from '../../../common/ui/visibility-icon';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { onlyNumbersValidators } from '../../../core/config/only-numbers-validator';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-visp-login',
  standalone: true,
  imports: [ArrowRightIcon, VisibilityIcon, ReactiveFormsModule,RouterOutlet, RouterLink],
  templateUrl: './visp-login.component.html',
  styleUrl: './visp-login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router)
  loginForm: FormGroup;
  crossed = true;

  constructor() {
    this.loginForm = this.fb.group({
      registerNumber: [
        '',
        {
          nonNullable: true,
          validators: [Validators.required, onlyNumbersValidators],
        },
      ],
      password: [
        '',
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ],
    });
  }

  public showErrorMessage(controlName:string,validatorsName:string):boolean{
    return this.loginForm.controls[controlName].hasError(validatorsName) && this.loginForm.controls[controlName].touched
  }

  public send(): void {
    if (this.loginForm.valid) {
      this.router.navigate(['home']);
      this.loginForm.reset();
    }
  }
}
