import { MatDialogRef } from '@angular/material';
import { MeasurerDialogData } from '../shared/measure.interfaces';
import { MeasureAreaUnit, MeasureLengthUnit } from '../shared/measure.enum';
export declare class MeasurerDialogComponent {
    dialogRef: MatDialogRef<MeasurerDialogComponent>;
    data: MeasurerDialogData;
    measureAreaUnit: typeof MeasureAreaUnit;
    measureLengthUnit: typeof MeasureLengthUnit;
    constructor(dialogRef: MatDialogRef<MeasurerDialogComponent>, data: MeasurerDialogData);
    onNoClick(): void;
}
