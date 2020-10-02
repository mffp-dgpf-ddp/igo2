import { MatDialogRef } from '@angular/material';
import { AuthService } from '@igo2/auth';
export declare class UserDialogComponent {
    dialogRef: MatDialogRef<UserDialogComponent>;
    private auth;
    user: any;
    exp: any;
    constructor(dialogRef: MatDialogRef<UserDialogComponent>, auth: AuthService);
}
