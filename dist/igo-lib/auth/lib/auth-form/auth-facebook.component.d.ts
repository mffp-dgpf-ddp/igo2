import { ApplicationRef, EventEmitter } from '@angular/core';
import { ConfigService } from '@igo2/core';
import { AuthService } from '../shared/auth.service';
export declare class AuthFacebookComponent {
    private authService;
    private config;
    private appRef;
    private options;
    login: EventEmitter<boolean>;
    constructor(authService: AuthService, config: ConfigService, appRef: ApplicationRef);
    private subscribeEvents;
    private statusChangeCallback;
    private loginFacebook;
    private loadSDKFacebook;
}
