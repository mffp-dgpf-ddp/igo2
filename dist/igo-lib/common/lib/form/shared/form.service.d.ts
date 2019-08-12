import { FormBuilder } from '@angular/forms';
import { Form, FormField, FormFieldConfig, FormFieldGroup, FormFieldGroupConfig } from './form.interfaces';
export declare class FormService {
    private formBuilder;
    constructor(formBuilder: FormBuilder);
    form(fields: FormField[], groups: FormFieldGroup[]): Form;
    group(config: FormFieldGroupConfig, fields: FormField[]): FormFieldGroup;
    field(config: FormFieldConfig): FormField;
    extendFieldConfig(config: FormFieldConfig, partial: Partial<FormFieldConfig>): FormFieldConfig;
}
