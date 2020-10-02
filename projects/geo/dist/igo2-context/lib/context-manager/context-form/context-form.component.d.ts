import { EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService, LanguageService } from '@igo2/core';
import { Context } from '../shared/context.interface';
export declare class ContextFormComponent implements OnInit {
    private formBuilder;
    private languageService;
    private messageService;
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
    constructor(formBuilder: FormBuilder, languageService: LanguageService, messageService: MessageService);
    ngOnInit(): void;
    handleFormSubmit(value: any): void;
    copyTextToClipboard(): void;
    private buildForm;
}
