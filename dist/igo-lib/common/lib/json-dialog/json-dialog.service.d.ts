import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
export declare class JsonDialogService {
    private dialog;
    constructor(dialog: MatDialog);
    open(title: any, data: any, ignoreKeys?: string[]): Observable<any>;
}
