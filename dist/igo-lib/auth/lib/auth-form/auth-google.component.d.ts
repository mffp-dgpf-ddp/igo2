import { ApplicationRef, EventEmitter } from '@angular/core';
import { ConfigService } from '@igo2/core';
import { AuthService } from '../shared/auth.service';
export declare class AuthGoogleComponent {
    private authService;
    private config;
    private appRef;
    private options;
    login: EventEmitter<boolean>;
    constructor(authService: AuthService, config: ConfigService, appRef: ApplicationRef);
    handleSignInClick(): void;
    handleSignOutClick(): void;
    private handleClientLoad;
    private initClient;
    private updateSigninStatus;
    private loginGoogle;
    private loadSDKGoogle;
    private loadPlatform;
}
