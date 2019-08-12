import { EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Context, ContextPermission, ContextPermissionsList } from '../shared/context.interface';
export declare class ContextPermissionsComponent implements OnInit {
    private formBuilder;
    form: FormGroup;
    context: Context;
    private _context;
    permissions: ContextPermissionsList;
    private _permissions;
    addPermission: EventEmitter<ContextPermission>;
    removePermission: EventEmitter<ContextPermission>;
    scopeChanged: EventEmitter<Context>;
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
    handleFormSubmit(value: any): void;
    private buildForm;
}
