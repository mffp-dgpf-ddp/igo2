import { OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import OlGeometryType from 'ol/geom/GeometryType';
import { IgoMap } from '../../map';
import { GeoJSONGeometry } from '../shared/geometry.interfaces';
/**
 * This input allows a user to draw a new geometry or to edit
 * an existing one on a map.
 */
export declare class GeometryFormFieldComponent implements OnInit, OnDestroy {
    private cdRef;
    geometryType$: BehaviorSubject<OlGeometryType>;
    drawGuide$: BehaviorSubject<number>;
    value$: BehaviorSubject<GeoJSONGeometry>;
    private value$$;
    /**
     * The field's form control
     */
    formControl: FormControl;
    /**
     * The map to draw the geometry on
     */
    map: IgoMap;
    /**
     * The geometry type
     */
    geometryType: OlGeometryType;
    /**
     * Whether a geometry type toggle should be displayed
     */
    geometryTypeField: boolean;
    /**
     * Available geometry types
     */
    geometryTypes: string[];
    /**
     * Whether a draw guide field should be displayed
     */
    drawGuideField: boolean;
    /**
     * The drawGuide around the mouse pointer to help drawing
     */
    drawGuide: number;
    /**
     * Draw guide placeholder
     */
    drawGuidePlaceholder: string;
    /**
     * Whether a measure tooltip should be displayed
     */
    measure: boolean;
    /**
     * The geometry type model
     */
    geometryTypeModel: OlGeometryType;
    /**
     * The draw guide model
     */
    drawGuideModel: number;
    constructor(cdRef: ChangeDetectorRef);
    /**
     * Set up a value stream
     * @internal
     */
    ngOnInit(): void;
    /**
     * Unsubscribe to the value stream
     * @internal
     */
    ngOnDestroy(): void;
    onGeometryTypeChange(geometryType: OlGeometryType): void;
    onDrawGuideChange(value: number): void;
}
