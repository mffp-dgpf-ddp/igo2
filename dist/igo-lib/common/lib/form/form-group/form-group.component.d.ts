import { FormGroup } from '@angular/forms';
import { FormField, FormFieldGroup } from '../shared/form.interfaces';
/**
 * A configurable form, optionnally bound to an entity
 * (for example in case of un update). Submitting that form
 * emits an event with the form data but no other operation is performed.
 */
export declare class FormGroupComponent {
    /**
     * Form field group
     */
    group: FormFieldGroup;
    /**
     * Field placeholder
     */
    errors: {
        [key: string]: string;
    };
    /**
     * Form group control
     */
    readonly formControl: FormGroup;
    constructor();
    /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * @param field Field
     * @returns Number of columns
     * @internal
     */
    getFieldColSpan(field: FormField): number;
    /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * @param field Field
     * @returns Number of columns
     * @internal
     */
    getFieldNgClass(field: FormField): {
        [key: string]: boolean;
    };
    /**
     * Get error message
     */
    getErrorMessage(): string;
}
