import { EventEmitter, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { Form } from '../shared/form.interfaces';
/**
 * A configurable form
 */
export declare class FormComponent implements OnChanges {
    /**
     * Form
     */
    form: Form;
    /**
     * Input data
     */
    formData: {
        [key: string]: any;
    };
    /**
     * Event emitted when the form is submitted
     */
    submitForm: EventEmitter<{
        [key: string]: any;
    }>;
    buttons: ElementRef;
    readonly hasButtons: boolean;
    constructor();
    /**
     * Is the entity or the template change, recreate the form or repopulate it.
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Transform the form data to a feature and emit an event
     * @param event Form submit event
     * @internal
     */
    onSubmit(): void;
    private setData;
    private getData;
    private updateDataWithFormField;
    /**
     * Clear form
     */
    private clear;
}
