import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emailValidator(control:AbstractControl):null|ValidationErrors{
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return  emailReg.test(control.value)?null:{incorrectMail:true}
}