/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Optional, Self, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgControl } from '@angular/forms';
import OlGeoJSON from 'ol/format/GeoJSON';
import OlGeometryType from 'ol/geom/GeometryType';
import OlFeature from 'ol/Feature';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlOverlay from 'ol/Overlay';
import { IgoMap } from '../../map';
import { MeasureLengthUnit, updateOlGeometryMidpoints, formatMeasure, measureOlGeometry } from '../../measure';
import { DrawControl, ModifyControl } from '../shared/controls';
import { createDrawInteractionStyle } from '../shared/geometry.utils';
/**
 * This input allows a user to draw a new geometry or to edit
 * an existing one on a map. A text input is also displayed in the
 * form with some instructions.
 * This is still WIP.
 */
export class GeometryFormFieldInputComponent {
    /**
     * @param {?} cdRef
     * @param {?} ngControl
     */
    constructor(cdRef, ngControl) {
        this.cdRef = cdRef;
        this.ngControl = ngControl;
        this.olGeoJSON = new OlGeoJSON();
        this.ready = false;
        this.olTooltip = OlOverlay;
        /**
         * The drawGuide around the mouse pointer to help drawing
         */
        this.drawGuide = 0;
        /**
         * Whether a measure tooltip should be displayed
         */
        this.measure = false;
        this.onChange = (/**
         * @return {?}
         */
        () => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        if (this.ngControl !== undefined) {
            // Setting the value accessor directly (instead of using
            // the providers) to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }
    /**
     * The geometry type
     * @param {?} value
     * @return {?}
     */
    set geometryType(value) {
        this._geometryType = value;
        if (this.ready === false) {
            return;
        }
        this.deactivateControl();
        this.createDrawControl();
        this.toggleControl();
    }
    /**
     * @return {?}
     */
    get geometryType() { return this._geometryType; }
    /**
     * The geometry value (GeoJSON)
     * Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (this.ready === false) {
            this._value = value;
            return;
        }
        if (value) {
            this.addGeoJSONToOverlay(value);
        }
        else {
            this.olOverlaySource.clear();
        }
        this._value = value;
        this.onChange(value);
        this.toggleControl();
        this.cdRef.detectChanges();
    }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * The vector source to add the geometry to
     * \@internal
     * @return {?}
     */
    get olOverlaySource() {
        return this.olOverlayLayer.getSource();
    }
    /**
     * Create an overlay layer, add the initial geometry to it (if any)
     * and toggle the right interaction.
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.addOlOverlayLayer();
        this.createMeasureTooltip();
        this.drawInteractionStyle = createDrawInteractionStyle();
        this.defaultDrawStyleRadius = this.drawInteractionStyle.getImage().getRadius();
        this.createDrawControl();
        this.createModifyControl();
        if (this.value) {
            this.addGeoJSONToOverlay(this.value);
        }
        this.toggleControl();
        this.ready = true;
    }
    /**
     * Clear the overlay layer and any interaction added by this component.
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.deactivateControl();
        this.olOverlaySource.clear();
        this.map.ol.removeLayer(this.olOverlayLayer);
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    // tslint:disable-next-line:ban-types
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    // tslint:disable-next-line:ban-types
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * Add an overlay layer to the map
     * @private
     * @return {?}
     */
    addOlOverlayLayer() {
        this.olOverlayLayer = new OlVectorLayer({
            source: new OlVectorSource(),
            zIndex: 500
        });
        this.map.ol.addLayer(this.olOverlayLayer);
    }
    /**
     * Create a draw control and subscribe to it's geometry
     * @private
     * @return {?}
     */
    createDrawControl() {
        this.drawControl = new DrawControl({
            geometryType: this.geometryType,
            layer: this.olOverlayLayer,
            drawStyle: (/**
             * @param {?} olFeature
             * @param {?} resolution
             * @return {?}
             */
            (olFeature, resolution) => {
                /** @type {?} */
                const style = this.drawInteractionStyle;
                this.updateDrawStyleWithDrawGuide(style, resolution);
                return style;
            })
        });
    }
    /**
     * Create a modify control and subscribe to it's geometry
     * @private
     * @return {?}
     */
    createModifyControl() {
        this.modifyControl = new ModifyControl({
            layer: this.olOverlayLayer,
            drawStyle: (/**
             * @param {?} olFeature
             * @param {?} resolution
             * @return {?}
             */
            (olFeature, resolution) => {
                /** @type {?} */
                const style = this.drawInteractionStyle;
                this.updateDrawStyleWithDrawGuide(style, resolution);
                return style;
            })
        });
    }
    /**
     * Toggle the proper control (draw or modify)
     * @private
     * @return {?}
     */
    toggleControl() {
        this.deactivateControl();
        if (!this.value) {
            this.activateControl(this.drawControl);
        }
        else {
            this.activateControl(this.modifyControl);
        }
    }
    /**
     * Activate a given control
     * @private
     * @param {?} control Control
     * @return {?}
     */
    activateControl(control) {
        this.activeControl = control;
        this.olGeometryEnds$$ = control.end$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => this.onOlGeometryEnds(olGeometry)));
        if (this.measure === true && control === this.drawControl) {
            this.olGeometryChanges$$ = control.changes$
                .subscribe((/**
             * @param {?} olGeometry
             * @return {?}
             */
            (olGeometry) => this.onOlGeometryChanges(olGeometry)));
        }
        control.setOlMap(this.map.ol);
    }
    /**
     * Deactivate the active control
     * @private
     * @return {?}
     */
    deactivateControl() {
        this.removeMeasureTooltip();
        if (this.activeControl !== undefined) {
            this.activeControl.setOlMap(undefined);
        }
        if (this.olGeometryEnds$$ !== undefined) {
            this.olGeometryEnds$$.unsubscribe();
        }
        if (this.olGeometryChanges$$ !== undefined) {
            this.olGeometryChanges$$.unsubscribe();
        }
        this.activeControl = undefined;
    }
    /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onOlGeometryEnds(olGeometry) {
        this.removeMeasureTooltip();
        this.setOlGeometry(olGeometry);
    }
    /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onOlGeometryChanges(olGeometry) {
        if (olGeometry.getType() !== 'Point') {
            this.updateMeasureTooltip(olGeometry);
        }
    }
    /**
     * When drawing ends, convert the output value to GeoJSON and keep it.
     * Restore the double click interaction.
     * @private
     * @param {?} olGeometry OL geometry
     * @return {?}
     */
    setOlGeometry(olGeometry) {
        if (olGeometry === undefined) {
            return;
        }
        /** @type {?} */
        const value = this.olGeoJSON.writeGeometryObject(olGeometry, {
            featureProjection: this.map.projection,
            dataProjection: 'EPSG:4326'
        });
        this.writeValue(value);
    }
    /**
     * Add a GeoJSON geometry to the overlay
     * @private
     * @param {?} geometry GeoJSON geometry
     * @return {?}
     */
    addGeoJSONToOverlay(geometry) {
        /** @type {?} */
        const olGeometry = this.olGeoJSON.readGeometry(geometry, {
            dataProjection: 'EPSG:4326',
            featureProjection: this.map.projection
        });
        /** @type {?} */
        const olFeature = new OlFeature({ geometry: olGeometry });
        this.olOverlaySource.clear();
        this.olOverlaySource.addFeature(olFeature);
    }
    /**
     * Create the measure tooltip
     * @private
     * @return {?}
     */
    createMeasureTooltip() {
        this.olTooltip = new OlOverlay({
            element: document.createElement('div'),
            offset: [-30, -10],
            className: [
                'igo-map-tooltip',
                'igo-map-tooltip-measure'
            ].join(' '),
            stopEvent: false
        });
    }
    /**
     * Update the measure tooltip of an OL geometry
     * @private
     * @param {?} olGeometry OL Geometry
     * @return {?}
     */
    updateMeasureTooltip(olGeometry) {
        /** @type {?} */
        const measure = measureOlGeometry(olGeometry, this.map.projection);
        /** @type {?} */
        const lengths = measure.lengths;
        /** @type {?} */
        const lastIndex = olGeometry.getType() === 'Polygon' ? lengths.length - 2 : lengths.length - 1;
        /** @type {?} */
        const lastLength = lengths[lastIndex];
        /** @type {?} */
        const olMidpoints = updateOlGeometryMidpoints(olGeometry);
        /** @type {?} */
        const olLastMidpoint = olMidpoints[lastIndex];
        if (olMidpoints.length === 0 || olLastMidpoint === undefined) {
            this.removeMeasureTooltip();
            return;
        }
        this.olTooltip.setPosition(olLastMidpoint.flatCoordinates);
        /** @type {?} */
        const innerHtml = formatMeasure(lastLength, {
            decimal: 1,
            unit: MeasureLengthUnit.Meters,
            unitAbbr: true,
            locale: 'fr'
        });
        this.olTooltip.getElement().innerHTML = innerHtml;
        if (this.olTooltip.getMap() === undefined) {
            this.map.ol.addOverlay(this.olTooltip);
        }
    }
    /**
     * Remove the measure tooltip from the map
     * @private
     * @return {?}
     */
    removeMeasureTooltip() {
        if (this.olTooltip.getMap() !== undefined) {
            this.map.ol.removeOverlay(this.olTooltip);
            this.olTooltip.setMap(undefined);
        }
    }
    /**
     * @private
     * @param {?} olStyle
     * @param {?} resolution
     * @return {?}
     */
    updateDrawStyleWithDrawGuide(olStyle, resolution) {
        /** @type {?} */
        const drawGuide = this.drawGuide;
        /** @type {?} */
        let radius;
        if (drawGuide === undefined || drawGuide < 0) {
            radius = this.defaultDrawStyleRadius;
        }
        else {
            radius = drawGuide > 0 ? drawGuide / resolution : drawGuide;
        }
        olStyle.getImage().setRadius(radius);
    }
}
GeometryFormFieldInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-geometry-form-field-input',
                template: "<ng-template></ng-template>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
GeometryFormFieldInputComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
];
GeometryFormFieldInputComponent.propDecorators = {
    map: [{ type: Input }],
    geometryType: [{ type: Input }],
    drawGuide: [{ type: Input }],
    measure: [{ type: Input }],
    value: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype.olOverlayLayer;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype.olGeoJSON;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype.ready;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype.drawControl;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype.modifyControl;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype.drawInteractionStyle;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype.defaultDrawStyleRadius;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype.olGeometryEnds$$;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype.olGeometryChanges$$;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype.olTooltip;
    /**
     * Active control
     * \@internal
     * @type {?}
     */
    GeometryFormFieldInputComponent.prototype.activeControl;
    /**
     * The map to draw the geometry on
     * @type {?}
     */
    GeometryFormFieldInputComponent.prototype.map;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype._geometryType;
    /**
     * The drawGuide around the mouse pointer to help drawing
     * @type {?}
     */
    GeometryFormFieldInputComponent.prototype.drawGuide;
    /**
     * Whether a measure tooltip should be displayed
     * @type {?}
     */
    GeometryFormFieldInputComponent.prototype.measure;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype._value;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype.cdRef;
    /** @type {?} */
    GeometryFormFieldInputComponent.prototype.ngControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktZm9ybS1maWVsZC1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvZ2VvbWV0cnktZm9ybS1maWVsZC9nZW9tZXRyeS1mb3JtLWZpZWxkLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsUUFBUSxFQUNSLElBQUksRUFDSixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFLakUsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFFMUMsT0FBTyxjQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUVuQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFDTCxpQkFBaUIsRUFFakIseUJBQXlCLEVBQ3pCLGFBQWEsRUFDYixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7OztBQWN0RSxNQUFNLE9BQU8sK0JBQStCOzs7OztJQXFGMUMsWUFDVSxLQUF3QixFQUNMLFNBQW9CO1FBRHZDLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ0wsY0FBUyxHQUFULFNBQVMsQ0FBVztRQXBGekMsY0FBUyxHQUFHLElBQUksU0FBUyxF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Q0FBQyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztTQUM3RDtRQUNELE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBaldGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsK0JBQStCO2dCQUN6Qyx1Q0FBeUQ7Z0JBQ3pELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBdENDLGlCQUFpQjtZQUdWLFNBQVMsdUJBMkhiLFFBQVEsWUFBSSxJQUFJOzs7a0JBL0RsQixLQUFLOzJCQUtMLEtBQUs7d0JBZ0JMLEtBQUs7c0JBS0wsS0FBSztvQkFNTCxLQUFLOzs7Ozs7O0lBdEROLHlEQUFzQzs7Ozs7SUFDdEMsb0RBQW9DOzs7OztJQUNwQyxnREFBc0I7Ozs7O0lBRXRCLHNEQUFpQzs7Ozs7SUFDakMsd0RBQXFDOzs7OztJQUNyQywrREFBc0M7Ozs7O0lBQ3RDLGlFQUF1Qzs7Ozs7SUFDdkMsMkRBQXVDOzs7OztJQUN2Qyw4REFBMEM7Ozs7O0lBRTFDLG9EQUE4Qjs7Ozs7O0lBTTlCLHdEQUFrRDs7Ozs7SUFLbEQsOENBQXFCOzs7OztJQWdCckIsd0RBQXNDOzs7OztJQUt0QyxvREFBdUI7Ozs7O0lBS3ZCLGtEQUFrQzs7Ozs7SUF5QmxDLGlEQUFnQzs7Ozs7SUF5RGhDLG1EQUFpQzs7Ozs7SUFTakMsb0RBQWtDOzs7OztJQXZEaEMsZ0RBQWdDOztJQUNoQyxvREFBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9wdGlvbmFsLFxyXG4gIFNlbGYsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdDb250cm9sLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgU3R5bGUgYXMgT2xTdHlsZSB9IGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IE9sR2VvSlNPTiBmcm9tICdvbC9mb3JtYXQvR2VvSlNPTic7XHJcbmltcG9ydCBPbEdlb21ldHJ5IGZyb20gJ29sL2dlb20vR2VvbWV0cnknO1xyXG5pbXBvcnQgT2xHZW9tZXRyeVR5cGUgZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeVR5cGUnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgT2xWZWN0b3JTb3VyY2UgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCBPbFZlY3RvckxheWVyIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XHJcbmltcG9ydCBPbE92ZXJsYXkgZnJvbSAnb2wvT3ZlcmxheSc7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQge1xyXG4gIE1lYXN1cmVMZW5ndGhVbml0LFxyXG4gIGNsZWFyT2xHZW9tZXRyeU1pZHBvaW50cyxcclxuICB1cGRhdGVPbEdlb21ldHJ5TWlkcG9pbnRzLFxyXG4gIGZvcm1hdE1lYXN1cmUsXHJcbiAgbWVhc3VyZU9sR2VvbWV0cnlcclxufSBmcm9tICcuLi8uLi9tZWFzdXJlJztcclxuaW1wb3J0IHsgRHJhd0NvbnRyb2wsIE1vZGlmeUNvbnRyb2wgfSBmcm9tICcuLi9zaGFyZWQvY29udHJvbHMnO1xyXG5pbXBvcnQgeyBjcmVhdGVEcmF3SW50ZXJhY3Rpb25TdHlsZSB9IGZyb20gJy4uL3NoYXJlZC9nZW9tZXRyeS51dGlscyc7XHJcbmltcG9ydCB7IEdlb0pTT05HZW9tZXRyeSB9IGZyb20gJy4uL3NoYXJlZC9nZW9tZXRyeS5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlucHV0IGFsbG93cyBhIHVzZXIgdG8gZHJhdyBhIG5ldyBnZW9tZXRyeSBvciB0byBlZGl0XHJcbiAqIGFuIGV4aXN0aW5nIG9uZSBvbiBhIG1hcC4gQSB0ZXh0IGlucHV0IGlzIGFsc28gZGlzcGxheWVkIGluIHRoZVxyXG4gKiBmb3JtIHdpdGggc29tZSBpbnN0cnVjdGlvbnMuXHJcbiAqIFRoaXMgaXMgc3RpbGwgV0lQLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tZ2VvbWV0cnktZm9ybS1maWVsZC1pbnB1dCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2dlb21ldHJ5LWZvcm0tZmllbGQtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHZW9tZXRyeUZvcm1GaWVsZElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgcHJpdmF0ZSBvbE92ZXJsYXlMYXllcjogT2xWZWN0b3JMYXllcjtcclxuICBwcml2YXRlIG9sR2VvSlNPTiA9IG5ldyBPbEdlb0pTT04oKTtcclxuICBwcml2YXRlIHJlYWR5ID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgZHJhd0NvbnRyb2w6IERyYXdDb250cm9sO1xyXG4gIHByaXZhdGUgbW9kaWZ5Q29udHJvbDogTW9kaWZ5Q29udHJvbDtcclxuICBwcml2YXRlIGRyYXdJbnRlcmFjdGlvblN0eWxlOiBPbFN0eWxlO1xyXG4gIHByaXZhdGUgZGVmYXVsdERyYXdTdHlsZVJhZGl1czogbnVtYmVyO1xyXG4gIHByaXZhdGUgb2xHZW9tZXRyeUVuZHMkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgb2xHZW9tZXRyeUNoYW5nZXMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIG9sVG9vbHRpcCA9IE9sT3ZlcmxheTtcclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZlIGNvbnRyb2xcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwdWJsaWMgYWN0aXZlQ29udHJvbDogRHJhd0NvbnRyb2wgfCBNb2RpZnlDb250cm9sO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWFwIHRvIGRyYXcgdGhlIGdlb21ldHJ5IG9uXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBnZW9tZXRyeSB0eXBlXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgZ2VvbWV0cnlUeXBlKHZhbHVlOiBPbEdlb21ldHJ5VHlwZSkge1xyXG4gICAgdGhpcy5fZ2VvbWV0cnlUeXBlID0gdmFsdWU7XHJcbiAgICBpZiAodGhpcy5yZWFkeSA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kZWFjdGl2YXRlQ29udHJvbCgpO1xyXG4gICAgdGhpcy5jcmVhdGVEcmF3Q29udHJvbCgpO1xyXG4gICAgdGhpcy50b2dnbGVDb250cm9sKCk7XHJcbiAgfVxyXG4gIGdldCBnZW9tZXRyeVR5cGUoKTogT2xHZW9tZXRyeVR5cGUgeyByZXR1cm4gdGhpcy5fZ2VvbWV0cnlUeXBlOyB9XHJcbiAgcHJpdmF0ZSBfZ2VvbWV0cnlUeXBlOiBPbEdlb21ldHJ5VHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGRyYXdHdWlkZSBhcm91bmQgdGhlIG1vdXNlIHBvaW50ZXIgdG8gaGVscCBkcmF3aW5nXHJcbiAgICovXHJcbiAgQElucHV0KCkgZHJhd0d1aWRlID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIG1lYXN1cmUgdG9vbHRpcCBzaG91bGQgYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWVhc3VyZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZ2VvbWV0cnkgdmFsdWUgKEdlb0pTT04pXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCB2YWx1ZSh2YWx1ZTogR2VvSlNPTkdlb21ldHJ5KSB7XHJcbiAgICBpZiAodGhpcy5yZWFkeSA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLmFkZEdlb0pTT05Ub092ZXJsYXkodmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XHJcbiAgICB0aGlzLnRvZ2dsZUNvbnRyb2woKTtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuICBnZXQgdmFsdWUoKTogR2VvSlNPTkdlb21ldHJ5IHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XHJcbiAgcHJpdmF0ZSBfdmFsdWU6IEdlb0pTT05HZW9tZXRyeTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHZlY3RvciBzb3VyY2UgdG8gYWRkIHRoZSBnZW9tZXRyeSB0b1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBvbE92ZXJsYXlTb3VyY2UoKTogT2xWZWN0b3JTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMub2xPdmVybGF5TGF5ZXIuZ2V0U291cmNlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2xcclxuICApIHtcclxuICAgIGlmICh0aGlzLm5nQ29udHJvbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIC8vIFNldHRpbmcgdGhlIHZhbHVlIGFjY2Vzc29yIGRpcmVjdGx5IChpbnN0ZWFkIG9mIHVzaW5nXHJcbiAgICAgIC8vIHRoZSBwcm92aWRlcnMpIHRvIGF2b2lkIHJ1bm5pbmcgaW50byBhIGNpcmN1bGFyIGltcG9ydC5cclxuICAgICAgdGhpcy5uZ0NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYW4gb3ZlcmxheSBsYXllciwgYWRkIHRoZSBpbml0aWFsIGdlb21ldHJ5IHRvIGl0IChpZiBhbnkpXHJcbiAgICogYW5kIHRvZ2dsZSB0aGUgcmlnaHQgaW50ZXJhY3Rpb24uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmFkZE9sT3ZlcmxheUxheWVyKCk7XHJcbiAgICB0aGlzLmNyZWF0ZU1lYXN1cmVUb29sdGlwKCk7XHJcbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvblN0eWxlID0gY3JlYXRlRHJhd0ludGVyYWN0aW9uU3R5bGUoKTtcclxuICAgIHRoaXMuZGVmYXVsdERyYXdTdHlsZVJhZGl1cyA9IHRoaXMuZHJhd0ludGVyYWN0aW9uU3R5bGUuZ2V0SW1hZ2UoKS5nZXRSYWRpdXMoKTtcclxuICAgIHRoaXMuY3JlYXRlRHJhd0NvbnRyb2woKTtcclxuICAgIHRoaXMuY3JlYXRlTW9kaWZ5Q29udHJvbCgpO1xyXG4gICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgdGhpcy5hZGRHZW9KU09OVG9PdmVybGF5KHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy50b2dnbGVDb250cm9sKCk7XHJcbiAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBvdmVybGF5IGxheWVyIGFuZCBhbnkgaW50ZXJhY3Rpb24gYWRkZWQgYnkgdGhpcyBjb21wb25lbnQuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVDb250cm9sKCk7XHJcbiAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5jbGVhcigpO1xyXG4gICAgdGhpcy5tYXAub2wucmVtb3ZlTGF5ZXIodGhpcy5vbE92ZXJsYXlMYXllcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxyXG4gICAqL1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbikge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuICBwcml2YXRlIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuICBwcml2YXRlIG9uVG91Y2hlZDogYW55ID0gKCkgPT4ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXHJcbiAgICovXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogR2VvSlNPTkdlb21ldHJ5KSB7XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYW4gb3ZlcmxheSBsYXllciB0byB0aGUgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbE92ZXJsYXlMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIHRoaXMub2xPdmVybGF5TGF5ZXIgPSBuZXcgT2xWZWN0b3JMYXllcih7XHJcbiAgICAgIHNvdXJjZTogbmV3IE9sVmVjdG9yU291cmNlKCksXHJcbiAgICAgIHpJbmRleDogNTAwXHJcbiAgICB9KTtcclxuICAgIHRoaXMubWFwLm9sLmFkZExheWVyKHRoaXMub2xPdmVybGF5TGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgZHJhdyBjb250cm9sIGFuZCBzdWJzY3JpYmUgdG8gaXQncyBnZW9tZXRyeVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlRHJhd0NvbnRyb2woKSB7XHJcbiAgICB0aGlzLmRyYXdDb250cm9sID0gbmV3IERyYXdDb250cm9sKHtcclxuICAgICAgZ2VvbWV0cnlUeXBlOiB0aGlzLmdlb21ldHJ5VHlwZSxcclxuICAgICAgbGF5ZXI6IHRoaXMub2xPdmVybGF5TGF5ZXIsXHJcbiAgICAgIGRyYXdTdHlsZTogKG9sRmVhdHVyZTogT2xGZWF0dXJlLCByZXNvbHV0aW9uOiBudW1iZXIpID0+IHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMuZHJhd0ludGVyYWN0aW9uU3R5bGU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEcmF3U3R5bGVXaXRoRHJhd0d1aWRlKHN0eWxlLCByZXNvbHV0aW9uKTtcclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbW9kaWZ5IGNvbnRyb2wgYW5kIHN1YnNjcmliZSB0byBpdCdzIGdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVNb2RpZnlDb250cm9sKCkge1xyXG4gICAgdGhpcy5tb2RpZnlDb250cm9sID0gbmV3IE1vZGlmeUNvbnRyb2woe1xyXG4gICAgICBsYXllcjogdGhpcy5vbE92ZXJsYXlMYXllcixcclxuICAgICAgZHJhd1N0eWxlOiAob2xGZWF0dXJlOiBPbEZlYXR1cmUsIHJlc29sdXRpb246IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5kcmF3SW50ZXJhY3Rpb25TdHlsZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZURyYXdTdHlsZVdpdGhEcmF3R3VpZGUoc3R5bGUsIHJlc29sdXRpb24pO1xyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGUgdGhlIHByb3BlciBjb250cm9sIChkcmF3IG9yIG1vZGlmeSlcclxuICAgKi9cclxuICBwcml2YXRlIHRvZ2dsZUNvbnRyb2woKSB7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVDb250cm9sKCk7XHJcbiAgICBpZiAoIXRoaXMudmFsdWUpIHtcclxuICAgICAgdGhpcy5hY3RpdmF0ZUNvbnRyb2wodGhpcy5kcmF3Q29udHJvbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFjdGl2YXRlQ29udHJvbCh0aGlzLm1vZGlmeUNvbnRyb2wpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZhdGUgYSBnaXZlbiBjb250cm9sXHJcbiAgICogQHBhcmFtIGNvbnRyb2wgQ29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWN0aXZhdGVDb250cm9sKGNvbnRyb2w6IERyYXdDb250cm9sIHwgTW9kaWZ5Q29udHJvbCkge1xyXG4gICAgdGhpcy5hY3RpdmVDb250cm9sID0gY29udHJvbDtcclxuICAgIHRoaXMub2xHZW9tZXRyeUVuZHMkJCA9IGNvbnRyb2wuZW5kJFxyXG4gICAgICAuc3Vic2NyaWJlKChvbEdlb21ldHJ5OiBPbEdlb21ldHJ5KSA9PiB0aGlzLm9uT2xHZW9tZXRyeUVuZHMob2xHZW9tZXRyeSkpO1xyXG4gICAgaWYgKHRoaXMubWVhc3VyZSA9PT0gdHJ1ZSAmJiBjb250cm9sID09PSB0aGlzLmRyYXdDb250cm9sKSB7XHJcbiAgICAgIHRoaXMub2xHZW9tZXRyeUNoYW5nZXMkJCA9IGNvbnRyb2wuY2hhbmdlcyRcclxuICAgICAgICAuc3Vic2NyaWJlKChvbEdlb21ldHJ5OiBPbEdlb21ldHJ5KSA9PiB0aGlzLm9uT2xHZW9tZXRyeUNoYW5nZXMob2xHZW9tZXRyeSkpO1xyXG4gICAgfVxyXG4gICAgY29udHJvbC5zZXRPbE1hcCh0aGlzLm1hcC5vbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWFjdGl2YXRlIHRoZSBhY3RpdmUgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGVhY3RpdmF0ZUNvbnRyb2woKSB7XHJcbiAgICB0aGlzLnJlbW92ZU1lYXN1cmVUb29sdGlwKCk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVDb250cm9sICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5hY3RpdmVDb250cm9sLnNldE9sTWFwKHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vbEdlb21ldHJ5RW5kcyQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbEdlb21ldHJ5RW5kcyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vbEdlb21ldHJ5Q2hhbmdlcyQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbEdlb21ldHJ5Q2hhbmdlcyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZUNvbnRyb2wgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgbWVhc3VyZXMgb2JzZXJ2YWJsZXMgYW5kIG1hcCB0b29sdGlwc1xyXG4gICAqIEBwYXJhbSBvbEdlb21ldHJ5IE9sIGxpbmVzdHJpbmcgb3IgcG9seWdvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25PbEdlb21ldHJ5RW5kcyhvbEdlb21ldHJ5OiBPbEdlb21ldHJ5IHwgdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLnJlbW92ZU1lYXN1cmVUb29sdGlwKCk7XHJcbiAgICB0aGlzLnNldE9sR2VvbWV0cnkob2xHZW9tZXRyeSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgbWVhc3VyZXMgb2JzZXJ2YWJsZXMgYW5kIG1hcCB0b29sdGlwc1xyXG4gICAqIEBwYXJhbSBvbEdlb21ldHJ5IE9sIGxpbmVzdHJpbmcgb3IgcG9seWdvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25PbEdlb21ldHJ5Q2hhbmdlcyhvbEdlb21ldHJ5OiBPbEdlb21ldHJ5KSB7XHJcbiAgICBpZiAob2xHZW9tZXRyeS5nZXRUeXBlKCkgIT09ICdQb2ludCcpIHtcclxuICAgICAgdGhpcy51cGRhdGVNZWFzdXJlVG9vbHRpcChvbEdlb21ldHJ5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gZHJhd2luZyBlbmRzLCBjb252ZXJ0IHRoZSBvdXRwdXQgdmFsdWUgdG8gR2VvSlNPTiBhbmQga2VlcCBpdC5cclxuICAgKiBSZXN0b3JlIHRoZSBkb3VibGUgY2xpY2sgaW50ZXJhY3Rpb24uXHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT0wgZ2VvbWV0cnlcclxuICAgKi9cclxuICBwcml2YXRlIHNldE9sR2VvbWV0cnkob2xHZW9tZXRyeTogT2xHZW9tZXRyeSB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKG9sR2VvbWV0cnkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMub2xHZW9KU09OLndyaXRlR2VvbWV0cnlPYmplY3Qob2xHZW9tZXRyeSwge1xyXG4gICAgICBmZWF0dXJlUHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgZGF0YVByb2plY3Rpb246ICdFUFNHOjQzMjYnXHJcbiAgICB9KTtcclxuICAgIHRoaXMud3JpdGVWYWx1ZSh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBHZW9KU09OIGdlb21ldHJ5IHRvIHRoZSBvdmVybGF5XHJcbiAgICogQHBhcmFtIGdlb21ldHJ5IEdlb0pTT04gZ2VvbWV0cnlcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEdlb0pTT05Ub092ZXJsYXkoZ2VvbWV0cnk6IEdlb0pTT05HZW9tZXRyeSkge1xyXG4gICAgY29uc3Qgb2xHZW9tZXRyeSA9IHRoaXMub2xHZW9KU09OLnJlYWRHZW9tZXRyeShnZW9tZXRyeSwge1xyXG4gICAgICBkYXRhUHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG9sRmVhdHVyZSA9IG5ldyBPbEZlYXR1cmUoe2dlb21ldHJ5OiBvbEdlb21ldHJ5fSk7XHJcbiAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5jbGVhcigpO1xyXG4gICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuYWRkRmVhdHVyZShvbEZlYXR1cmUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBtZWFzdXJlIHRvb2x0aXBcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZU1lYXN1cmVUb29sdGlwKCk6IE9sT3ZlcmxheSB7XHJcbiAgICB0aGlzLm9sVG9vbHRpcCA9IG5ldyBPbE92ZXJsYXkoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgb2Zmc2V0OiBbLTMwLCAtMTBdLFxyXG4gICAgICBjbGFzc05hbWU6IFtcclxuICAgICAgICAnaWdvLW1hcC10b29sdGlwJyxcclxuICAgICAgICAnaWdvLW1hcC10b29sdGlwLW1lYXN1cmUnXHJcbiAgICAgIF0uam9pbignICcpLFxyXG4gICAgICBzdG9wRXZlbnQ6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgbWVhc3VyZSB0b29sdGlwIG9mIGFuIE9MIGdlb21ldHJ5XHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT0wgR2VvbWV0cnlcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZU1lYXN1cmVUb29sdGlwKG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkpIHtcclxuICAgIGNvbnN0IG1lYXN1cmUgPSBtZWFzdXJlT2xHZW9tZXRyeShvbEdlb21ldHJ5LCB0aGlzLm1hcC5wcm9qZWN0aW9uKTtcclxuICAgIGNvbnN0IGxlbmd0aHMgPSBtZWFzdXJlLmxlbmd0aHM7XHJcbiAgICBjb25zdCBsYXN0SW5kZXggPSBvbEdlb21ldHJ5LmdldFR5cGUoKSA9PT0gJ1BvbHlnb24nID8gbGVuZ3Rocy5sZW5ndGggLSAyIDogbGVuZ3Rocy5sZW5ndGggLSAxO1xyXG4gICAgY29uc3QgbGFzdExlbmd0aCA9IGxlbmd0aHNbbGFzdEluZGV4XTtcclxuXHJcbiAgICBjb25zdCBvbE1pZHBvaW50cyA9IHVwZGF0ZU9sR2VvbWV0cnlNaWRwb2ludHMob2xHZW9tZXRyeSk7XHJcbiAgICBjb25zdCBvbExhc3RNaWRwb2ludCA9IG9sTWlkcG9pbnRzW2xhc3RJbmRleF07XHJcbiAgICBpZiAob2xNaWRwb2ludHMubGVuZ3RoID09PSAwIHx8IG9sTGFzdE1pZHBvaW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5yZW1vdmVNZWFzdXJlVG9vbHRpcCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbFRvb2x0aXAuc2V0UG9zaXRpb24ob2xMYXN0TWlkcG9pbnQuZmxhdENvb3JkaW5hdGVzKTtcclxuXHJcbiAgICBjb25zdCBpbm5lckh0bWwgPSBmb3JtYXRNZWFzdXJlKGxhc3RMZW5ndGgsIHtcclxuICAgICAgZGVjaW1hbDogMSxcclxuICAgICAgdW5pdDogTWVhc3VyZUxlbmd0aFVuaXQuTWV0ZXJzLFxyXG4gICAgICB1bml0QWJicjogdHJ1ZSxcclxuICAgICAgbG9jYWxlOiAnZnInXHJcbiAgICB9KTtcclxuICAgIHRoaXMub2xUb29sdGlwLmdldEVsZW1lbnQoKS5pbm5lckhUTUwgPSBpbm5lckh0bWw7XHJcbiAgICBpZiAodGhpcy5vbFRvb2x0aXAuZ2V0TWFwKCkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm1hcC5vbC5hZGRPdmVybGF5KHRoaXMub2xUb29sdGlwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgbWVhc3VyZSB0b29sdGlwIGZyb20gdGhlIG1hcFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlTWVhc3VyZVRvb2x0aXAoKSB7XHJcbiAgICBpZiAodGhpcy5vbFRvb2x0aXAuZ2V0TWFwKCkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm1hcC5vbC5yZW1vdmVPdmVybGF5KHRoaXMub2xUb29sdGlwKTtcclxuICAgICAgdGhpcy5vbFRvb2x0aXAuc2V0TWFwKHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZURyYXdTdHlsZVdpdGhEcmF3R3VpZGUob2xTdHlsZTogT2xTdHlsZSwgcmVzb2x1dGlvbjogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBkcmF3R3VpZGUgPSB0aGlzLmRyYXdHdWlkZTtcclxuICAgIGxldCByYWRpdXM7XHJcbiAgICBpZiAoZHJhd0d1aWRlID09PSB1bmRlZmluZWQgfHwgZHJhd0d1aWRlIDwgMCkge1xyXG4gICAgICByYWRpdXMgPSB0aGlzLmRlZmF1bHREcmF3U3R5bGVSYWRpdXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByYWRpdXMgPSBkcmF3R3VpZGUgPiAwID8gZHJhd0d1aWRlIC8gcmVzb2x1dGlvbiA6IGRyYXdHdWlkZTtcclxuICAgIH1cclxuICAgIG9sU3R5bGUuZ2V0SW1hZ2UoKS5zZXRSYWRpdXMocmFkaXVzKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==