import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { OnUpdateInputs, WidgetComponent } from '@igo2/common';
import { Layer } from '../../../layer/shared/layers/layer';
import { IgoMap } from '../../../map/shared/map';
export declare class OgcFilterComponent implements OnUpdateInputs, WidgetComponent {
    private cdRef;
    layer: Layer;
    map: IgoMap;
    /**
     * Event emitted on complete
     */
    complete: EventEmitter<void>;
    /**
     * Event emitted on cancel
     */
    cancel: EventEmitter<void>;
    constructor(cdRef: ChangeDetectorRef);
    /**
     * Implemented as part of OnUpdateInputs
     */
    onUpdateInputs(): void;
    /**
     * On close, emit the cancel event
     */
    onClose(): void;
}
