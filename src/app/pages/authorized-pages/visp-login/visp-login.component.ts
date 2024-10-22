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

interface LoginForm {
  registerNumber: FormControl<string>;
  email: FormControl<string>;
}

@Component({
  selector: 'app-visp-login',
  standalone: true,
  imports: [ArrowRightIcon, VisibilityIcon, ReactiveFormsModule],
  templateUrl: './visp-login.component.html',
  styleUrl: './visp-login.component.scss',
})
export class VispLoginComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  loginForm: FormGroup<LoginForm>;
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
      email: [
        '',
        {
          nonNullable: true,
          validators: [Validators.required, Validators.email],
        },
      ],
    });
  }

  public send(): void {
    if (this.loginForm.valid) {
      this.loginForm.reset();
    }
  }
}
