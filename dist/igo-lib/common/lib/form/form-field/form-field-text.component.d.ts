import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
/**
 * This component renders a text field
 */
export declare class FormFieldTextComponent implements OnInit {
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
