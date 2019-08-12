import { MatDialog } from '@angular/material';
import { ConfigService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { IgoMap } from '@igo2/geo';
export declare class UserButtonComponent {
    private dialog;
    private config;
    auth: AuthService;
    map: IgoMap;
    private _map;
    color: string;
    private _color;
    expand: boolean;
    visible: boolean;
    constructor(dialog: MatDialog, config: ConfigService, auth: AuthService);
    accountClick(): void;
    logout(): void;
    infoUser(): void;
}
