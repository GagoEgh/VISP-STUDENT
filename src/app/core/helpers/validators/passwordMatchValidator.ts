import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(pass1:string,pass2:string): ValidatorFn{
  return (control:AbstractControl):null|ValidationErrors=>{
    return control.value[pass1] === control.value[pass2]? null:{passwordNoMatch : true }
  }
}