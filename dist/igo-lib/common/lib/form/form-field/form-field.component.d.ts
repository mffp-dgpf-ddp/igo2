import { FormField, FormFieldInputs } from '../shared/form.interfaces';
import { FormFieldService } from '../shared/form-field.service';
/**
 * This component renders the proper form input based on
 * the field configuration it receives.
 */
export declare class FormFieldComponent {
    private formFieldService;
    /**
     * Field configuration
     */
    field: FormField;
    constructor(formFieldService: FormFieldService);
    getFieldComponent(): any;
    getFieldInputs(): FormFieldInputs;
    getFieldSubscribers(): {
        [key: string]: ({ field: FormField, control: FormControl }: {
            field: any;
            control: any;
        }) => void;
    };
}
