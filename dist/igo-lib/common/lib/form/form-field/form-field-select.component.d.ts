import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormFieldSelectChoice } from '../shared/form.interfaces';
/**
 * This component renders a select field
 */
export declare class FormFieldSelectComponent {
    choices$: Observable<FormFieldSelectChoice[]>;
    disabled$: BehaviorSubject<boolean>;
    /**
     * The field's form control
     */
    formControl: FormControl;
    /**
     * Field placeholder
     */
    placeholder: string;
    /**
     * Select input choices
     */
    choices: Observable<FormFieldSelectChoice[]> | FormFieldSelectChoice[];
    /**
     * Field placeholder
     */
    errors: {
        [key: string]: string;
    };
    /**
     * Wheter a disable switch should be available
     */
    disableSwitch: boolean;
    /**
     * Whether the field is required
     */
    readonly required: boolean;
    ngOnInit(): void;
    /**
     * Get error message
     */
    getErrorMessage(): string;
    onDisableSwitchClick(): void;
    private toggleDisabled;
}
