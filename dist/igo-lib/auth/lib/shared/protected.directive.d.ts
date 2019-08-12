import { ElementRef } from '@angular/core';
import { AuthService } from './auth.service';
export declare class ProtectedDirective {
    constructor(authentication: AuthService, el: ElementRef);
}
