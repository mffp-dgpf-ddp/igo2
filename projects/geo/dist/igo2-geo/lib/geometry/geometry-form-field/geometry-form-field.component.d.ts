import { OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import OlGeometryType from 'ol/geom/GeometryType';
import { Style as OlStyle } from 'ol/style';
import { IgoMap } from '../../map';
import { GeoJSONGeometry } from '../shared/geometry.interfaces';
/**
 * This input allows a user to draw a new geometry or to edit
 * an existing one on a map.
 */
export declare class GeometryFormFieldComponent implements OnInit, OnDestroy {
    private cdRef;
    readonly value$: BehaviorSubject<GeoJSONGeometry>;
    private value$$;
    drawControlIsActive: boolean;
    freehandDrawIsActive: boolean;
    /**
     * The field's form control
     */
    formControl: FormControl;
    /**
     * The map to draw the geometry on
     */
    map: IgoMap;
    geometryType: OlGeometryType;
    readonly geometryType$: BehaviorSubject<OlGeometryType>;
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
    readonly drawGuide$: BehaviorSubject<number>;
    /**
     * Draw guide placeholder
     */
    drawGuidePlaceholder: string;
    /**
     * Whether a measure tooltip should be displayed
     */
    measure: boolean;
    /**
     * Style for the draw control (applies while the geometry is being drawn)
     */
    drawStyle: OlStyle;
    /**
     * Style for the overlay layer (applies once the geometry is added to the map)
     * If not specified, drawStyle applies
     */
    overlayStyle: OlStyle;
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
}
