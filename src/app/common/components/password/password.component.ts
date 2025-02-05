import { Component, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { VisibilityIcon } from '../../ui/visibility-icon';

@Component({
  selector: 'visp-password',
  standalone: true,
  imports: [VisibilityIcon,],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
  providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PasswordComponent),
        multi: true,
      },
      {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => PasswordComponent),
        multi: true,
      },
    ],
})
export class PasswordComponent implements ControlValueAccessor, Validator {
  public crossed = true;
  private value: string = "";
  private touched = false;
  private onChange!: ((value: any) => void);

  onTouched = () => {};


  validate(control: AbstractControl): ValidationErrors | null {
    return control.value ? null : { required: true };
  }

  writeValue(value:string): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched(): void{
    if(!this.touched){
      this.onTouched();
      this.touched = true;
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
}
