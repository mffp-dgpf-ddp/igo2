import { MatDialogRef } from '@angular/material';
export declare class JsonDialogComponent {
    dialogRef: MatDialogRef<JsonDialogComponent>;
    title: string;
    data: any;
    ignoreKeys: string[];
    constructor(dialogRef: MatDialogRef<JsonDialogComponent>);
    isObject(val: any): boolean;
    getKey(baseKey: any, key: any): string;
}
