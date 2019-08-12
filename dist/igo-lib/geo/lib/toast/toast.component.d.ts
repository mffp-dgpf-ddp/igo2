import { EventEmitter } from '@angular/core';
import { FlexibleState } from '@igo2/common';
import { Feature } from '../feature/shared/feature.interfaces';
import { IgoMap } from '../map/shared/map';
export declare class ToastComponent {
    static SWIPE_ACTION: {
        UP: string;
        DOWN: string;
    };
    private format;
    expanded: boolean;
    private _expanded;
    map: IgoMap;
    private _map;
    feature: Feature;
    private _feature;
    opened: EventEmitter<boolean>;
    state: FlexibleState;
    /**
     * @internal
     */
    readonly title: string;
    constructor();
    toggle(): void;
    zoomToFeatureExtent(): void;
    swipe(action: string): void;
}
