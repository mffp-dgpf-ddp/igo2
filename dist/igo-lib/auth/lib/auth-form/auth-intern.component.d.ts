import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
export declare class AuthInternComponent {
    auth: AuthService;
    allowAnonymous: boolean;
    private _allowAnonymous;
    error: string;
    form: FormGroup;
    login: EventEmitter<boolean>;
    constructor(auth: AuthService, fb: FormBuilder);
    loginUser(values: any): boolean;
    loginAnonymous(): void;
}
