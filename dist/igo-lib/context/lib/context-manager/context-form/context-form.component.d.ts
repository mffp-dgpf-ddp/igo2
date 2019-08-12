import { EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Context } from '../shared/context.interface';
export declare class ContextFormComponent implements OnInit {
    private formBuilder;
    form: FormGroup;
    prefix: string;
    btnSubmitText: string;
    private _btnSubmitText;
    context: Context;
    private _context;
    disabled: boolean;
    private _disabled;
    submitForm: EventEmitter<any>;
    clone: EventEmitter<any>;
    delete: EventEmitter<any>;
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
    handleFormSubmit(value: any): void;
    private buildForm;
}
