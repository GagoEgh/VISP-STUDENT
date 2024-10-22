import { AbstractControl, ValidationErrors } from '@angular/forms';

export function onlyNumbersValidators(
  control: AbstractControl
): ValidationErrors | null {
  const reg = new RegExp('^\\d+$');
  return reg.test(control.value) ? null : { invalidSymbols: true };
}
