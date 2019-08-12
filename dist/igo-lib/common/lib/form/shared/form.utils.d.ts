import { AbstractControl } from '@angular/forms';
import { Form, FormField } from './form.interfaces';
export declare function formControlIsRequired(control: AbstractControl): boolean;
export declare function getDefaultErrorMessages(): {
    [key: string]: string;
};
export declare function getControlErrorMessage(control: AbstractControl, messages: {
    [key: string]: string;
}): string;
export declare function getAllFormFields(form: Form): FormField[];
