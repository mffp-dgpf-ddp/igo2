import { OnInit } from '@angular/core';
import { VectorLayer } from '../shared/layers';
import { VectorLayerOptions } from '../shared/layers/vector-layer.interface';
export declare class TrackFeatureButtonComponent implements OnInit {
    layer: VectorLayer;
    trackFeature: boolean;
    readonly options: VectorLayerOptions;
    color: string;
    constructor();
    ngOnInit(): void;
    toggleTrackFeature(): void;
}
