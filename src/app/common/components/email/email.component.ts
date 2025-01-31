import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";

@Component({
  selector: 'visp-email',
  standalone: true,
  imports: [],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailComponent),
      multi: true,
    },
  ],
})
export class EmailComponent implements ControlValueAccessor, Validator {
  private value: string = "";
  private touched = false;
  private onChange!: ((value: any) => void);
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private markAsTouched(): void{
    if(!this.touched){
      this.touched = true;
      this.onTouched();
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.markAsTouched();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value ? null : { required: true };
  }

}
