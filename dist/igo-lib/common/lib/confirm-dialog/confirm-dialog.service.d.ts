import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
export declare class ConfirmDialogService {
    private dialog;
    constructor(dialog: MatDialog);
    open(message: string): Observable<any>;
}
