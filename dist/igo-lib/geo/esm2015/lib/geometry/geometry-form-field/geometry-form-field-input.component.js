/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Optional, Self, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as OlStyle from 'ol/style';
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
        this.drawGuide = null;
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
     * Style for the draw control (applies while the geometry is being drawn)
     * @param {?} value
     * @return {?}
     */
    set drawStyle(value) {
        this._drawStyle = value || createDrawInteractionStyle();
        if (this.isStyleWithRadius(this.drawStyle)) {
            this.defaultDrawStyleRadius = this.drawStyle.getImage().getRadius();
        }
        else {
            this.defaultDrawStyleRadius = null;
        }
    }
    /**
     * @return {?}
     */
    get drawStyle() { return this._drawStyle; }
    /**
     * Style for the overlay layer (applies once the geometry is added to the map)
     * If not specified, drawStyle applies
     * @param {?} value
     * @return {?}
     */
    set overlayStyle(value) {
        this._overlayStyle = value;
    }
    /**
     * @return {?}
     */
    get overlayStyle() {
        return this._overlayStyle || this.drawStyle;
    }
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
            zIndex: 500,
            style: null
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
            geometryType: this.geometryType || 'Point',
            layer: this.olOverlayLayer,
            drawStyle: (/**
             * @param {?} olFeature
             * @param {?} resolution
             * @return {?}
             */
            (olFeature, resolution) => {
                /** @type {?} */
                const style = this.drawStyle;
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
                const style = this.drawStyle;
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
        if (!this.value && this.geometryType) {
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
        const olFeature = new OlFeature({
            geometry: olGeometry
        });
        olFeature.setStyle(this.overlayStyle);
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
        if (this.olTooltip.getMap && this.olTooltip.getMap() !== undefined) {
            this.map.ol.removeOverlay(this.olTooltip);
            this.olTooltip.setMap(undefined);
        }
    }
    /**
     * Adjust the draw style with the specified draw guide distance, if possible
     * @private
     * @param {?} olStyle Draw style to update
     * @param {?} resolution Resolution (to make the screen size of symbol fit the drawGuide value)
     * @return {?}
     */
    updateDrawStyleWithDrawGuide(olStyle, resolution) {
        if (this.isStyleWithRadius(olStyle)) {
            /** @type {?} */
            const drawGuide = this.drawGuide;
            /** @type {?} */
            let radius;
            if (drawGuide === null || drawGuide < 0) {
                radius = this.defaultDrawStyleRadius;
            }
            else {
                radius = drawGuide > 0 ? drawGuide / resolution : drawGuide;
            }
            olStyle.getImage().setRadius(radius);
        }
    }
    /**
     * Returns wether a given Open Layers style has a radius property that can be set (used to set draw guide)
     * @private
     * @param {?} olStyle The style on which to perform the check
     * @return {?}
     */
    isStyleWithRadius(olStyle) {
        return olStyle.getImage && olStyle.getImage().setRadius;
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
    drawStyle: [{ type: Input }],
    overlayStyle: [{ type: Input }],
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
    GeometryFormFieldInputComponent.prototype._drawStyle;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype._overlayStyle;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktZm9ybS1maWVsZC1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvZ2VvbWV0cnktZm9ybS1maWVsZC9nZW9tZXRyeS1mb3JtLWZpZWxkLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsUUFBUSxFQUNSLElBQUksRUFDSixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFJakUsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFFMUMsT0FBTyxjQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUVuQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIseUJBQXlCLEVBQ3pCLGFBQWEsRUFDYixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7OztBQWN0RSxNQUFNLE9BQU8sK0JBQStCOzs7OztJQStHMUMsWUFDVSxLQUF3QixFQUNMLFNBQW9CO1FBRHZDLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ0wsY0FBUyxHQUFULFNB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QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBckNDLGlCQUFpQjtZQUdWLFNBQVMsdUJBb0piLFFBQVEsWUFBSSxJQUFJOzs7a0JBM0ZsQixLQUFLOzJCQUtMLEtBQUs7d0JBZ0JMLEtBQUs7c0JBS0wsS0FBSzt3QkFLTCxLQUFLOzJCQWdCTCxLQUFLO29CQWFMLEtBQUs7Ozs7Ozs7SUFoRk4seURBQXNDOzs7OztJQUN0QyxvREFBb0M7Ozs7O0lBQ3BDLGdEQUFzQjs7Ozs7SUFFdEIsc0RBQWlDOzs7OztJQUNqQyx3REFBcUM7Ozs7O0lBQ3JDLGlFQUF1Qzs7Ozs7SUFDdkMsMkRBQXVDOzs7OztJQUN2Qyw4REFBMEM7Ozs7O0lBQzFDLG9EQUE4Qjs7Ozs7O0lBTTlCLHdEQUFrRDs7Ozs7SUFLbEQsOENBQXFCOzs7OztJQWdCckIsd0RBQXNDOzs7OztJQUt0QyxvREFBa0M7Ozs7O0lBS2xDLGtEQUFrQzs7Ozs7SUFlbEMscURBQTRCOzs7OztJQWE1Qix3REFBK0I7Ozs7O0lBeUIvQixpREFBZ0M7Ozs7O0lBdURoQyxtREFBaUM7Ozs7O0lBU2pDLG9EQUFrQzs7Ozs7SUFyRGhDLGdEQUFnQzs7SUFDaEMsb0RBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPcHRpb25hbCxcclxuICBTZWxmLFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nQ29udHJvbCwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCAqIGFzIE9sU3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgT2xHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcclxuaW1wb3J0IE9sR2VvbWV0cnkgZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeSc7XHJcbmltcG9ydCBPbEdlb21ldHJ5VHlwZSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5VHlwZSc7XHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbFZlY3RvclNvdXJjZSBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0IE9sVmVjdG9yTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcclxuaW1wb3J0IE9sT3ZlcmxheSBmcm9tICdvbC9PdmVybGF5JztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7XHJcbiAgTWVhc3VyZUxlbmd0aFVuaXQsXHJcbiAgdXBkYXRlT2xHZW9tZXRyeU1pZHBvaW50cyxcclxuICBmb3JtYXRNZWFzdXJlLFxyXG4gIG1lYXN1cmVPbEdlb21ldHJ5XHJcbn0gZnJvbSAnLi4vLi4vbWVhc3VyZSc7XHJcbmltcG9ydCB7IERyYXdDb250cm9sLCBNb2RpZnlDb250cm9sIH0gZnJvbSAnLi4vc2hhcmVkL2NvbnRyb2xzJztcclxuaW1wb3J0IHsgY3JlYXRlRHJhd0ludGVyYWN0aW9uU3R5bGUgfSBmcm9tICcuLi9zaGFyZWQvZ2VvbWV0cnkudXRpbHMnO1xyXG5pbXBvcnQgeyBHZW9KU09OR2VvbWV0cnkgfSBmcm9tICcuLi9zaGFyZWQvZ2VvbWV0cnkuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogVGhpcyBpbnB1dCBhbGxvd3MgYSB1c2VyIHRvIGRyYXcgYSBuZXcgZ2VvbWV0cnkgb3IgdG8gZWRpdFxyXG4gKiBhbiBleGlzdGluZyBvbmUgb24gYSBtYXAuIEEgdGV4dCBpbnB1dCBpcyBhbHNvIGRpc3BsYXllZCBpbiB0aGVcclxuICogZm9ybSB3aXRoIHNvbWUgaW5zdHJ1Y3Rpb25zLlxyXG4gKiBUaGlzIGlzIHN0aWxsIFdJUC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWdlb21ldHJ5LWZvcm0tZmllbGQtaW5wdXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9nZW9tZXRyeS1mb3JtLWZpZWxkLWlucHV0LmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2VvbWV0cnlGb3JtRmllbGRJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gIHByaXZhdGUgb2xPdmVybGF5TGF5ZXI6IE9sVmVjdG9yTGF5ZXI7XHJcbiAgcHJpdmF0ZSBvbEdlb0pTT04gPSBuZXcgT2xHZW9KU09OKCk7XHJcbiAgcHJpdmF0ZSByZWFkeSA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIGRyYXdDb250cm9sOiBEcmF3Q29udHJvbDtcclxuICBwcml2YXRlIG1vZGlmeUNvbnRyb2w6IE1vZGlmeUNvbnRyb2w7XHJcbiAgcHJpdmF0ZSBkZWZhdWx0RHJhd1N0eWxlUmFkaXVzOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBvbEdlb21ldHJ5RW5kcyQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBvbEdlb21ldHJ5Q2hhbmdlcyQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBvbFRvb2x0aXAgPSBPbE92ZXJsYXk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2ZSBjb250cm9sXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHVibGljIGFjdGl2ZUNvbnRyb2w6IERyYXdDb250cm9sIHwgTW9kaWZ5Q29udHJvbDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1hcCB0byBkcmF3IHRoZSBnZW9tZXRyeSBvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZ2VvbWV0cnkgdHlwZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGdlb21ldHJ5VHlwZSh2YWx1ZTogT2xHZW9tZXRyeVR5cGUpIHtcclxuICAgIHRoaXMuX2dlb21ldHJ5VHlwZSA9IHZhbHVlO1xyXG4gICAgaWYgKHRoaXMucmVhZHkgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZGVhY3RpdmF0ZUNvbnRyb2woKTtcclxuICAgIHRoaXMuY3JlYXRlRHJhd0NvbnRyb2woKTtcclxuICAgIHRoaXMudG9nZ2xlQ29udHJvbCgpO1xyXG4gIH1cclxuICBnZXQgZ2VvbWV0cnlUeXBlKCk6IE9sR2VvbWV0cnlUeXBlIHsgcmV0dXJuIHRoaXMuX2dlb21ldHJ5VHlwZTsgfVxyXG4gIHByaXZhdGUgX2dlb21ldHJ5VHlwZTogT2xHZW9tZXRyeVR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkcmF3R3VpZGUgYXJvdW5kIHRoZSBtb3VzZSBwb2ludGVyIHRvIGhlbHAgZHJhd2luZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRyYXdHdWlkZTogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIG1lYXN1cmUgdG9vbHRpcCBzaG91bGQgYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWVhc3VyZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBTdHlsZSBmb3IgdGhlIGRyYXcgY29udHJvbCAoYXBwbGllcyB3aGlsZSB0aGUgZ2VvbWV0cnkgaXMgYmVpbmcgZHJhd24pXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgZHJhd1N0eWxlKHZhbHVlOiBPbFN0eWxlKSB7XHJcbiAgICB0aGlzLl9kcmF3U3R5bGUgPSB2YWx1ZSB8fCBjcmVhdGVEcmF3SW50ZXJhY3Rpb25TdHlsZSgpO1xyXG4gICAgaWYgKHRoaXMuaXNTdHlsZVdpdGhSYWRpdXModGhpcy5kcmF3U3R5bGUpKSB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdERyYXdTdHlsZVJhZGl1cyA9IHRoaXMuZHJhd1N0eWxlLmdldEltYWdlKCkuZ2V0UmFkaXVzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRlZmF1bHREcmF3U3R5bGVSYWRpdXMgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXQgZHJhd1N0eWxlKCk6IE9sU3R5bGUgeyByZXR1cm4gdGhpcy5fZHJhd1N0eWxlOyB9XHJcbiAgcHJpdmF0ZSBfZHJhd1N0eWxlOiBPbFN0eWxlO1xyXG5cclxuICAvKipcclxuICAgKiBTdHlsZSBmb3IgdGhlIG92ZXJsYXkgbGF5ZXIgKGFwcGxpZXMgb25jZSB0aGUgZ2VvbWV0cnkgaXMgYWRkZWQgdG8gdGhlIG1hcClcclxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBkcmF3U3R5bGUgYXBwbGllc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG92ZXJsYXlTdHlsZSh2YWx1ZTogT2xTdHlsZSkge1xyXG4gICAgdGhpcy5fb3ZlcmxheVN0eWxlID0gdmFsdWU7XHJcbiAgfVxyXG4gIGdldCBvdmVybGF5U3R5bGUoKTogT2xTdHlsZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3ZlcmxheVN0eWxlIHx8IHRoaXMuZHJhd1N0eWxlO1xyXG4gIH1cclxuICBwcml2YXRlIF9vdmVybGF5U3R5bGU6IE9sU3R5bGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBnZW9tZXRyeSB2YWx1ZSAoR2VvSlNPTilcclxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHZhbHVlKHZhbHVlOiBHZW9KU09OR2VvbWV0cnkpIHtcclxuICAgIGlmICh0aGlzLnJlYWR5ID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuYWRkR2VvSlNPTlRvT3ZlcmxheSh2YWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcclxuICAgIHRoaXMudG9nZ2xlQ29udHJvbCgpO1xyXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG4gIGdldCB2YWx1ZSgpOiBHZW9KU09OR2VvbWV0cnkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cclxuICBwcml2YXRlIF92YWx1ZTogR2VvSlNPTkdlb21ldHJ5O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdmVjdG9yIHNvdXJjZSB0byBhZGQgdGhlIGdlb21ldHJ5IHRvXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG9sT3ZlcmxheVNvdXJjZSgpOiBPbFZlY3RvclNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE92ZXJsYXlMYXllci5nZXRTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbFxyXG4gICkge1xyXG4gICAgaWYgKHRoaXMubmdDb250cm9sICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgLy8gU2V0dGluZyB0aGUgdmFsdWUgYWNjZXNzb3IgZGlyZWN0bHkgKGluc3RlYWQgb2YgdXNpbmdcclxuICAgICAgLy8gdGhlIHByb3ZpZGVycykgdG8gYXZvaWQgcnVubmluZyBpbnRvIGEgY2lyY3VsYXIgaW1wb3J0LlxyXG4gICAgICB0aGlzLm5nQ29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvdmVybGF5IGxheWVyLCBhZGQgdGhlIGluaXRpYWwgZ2VvbWV0cnkgdG8gaXQgKGlmIGFueSlcclxuICAgKiBhbmQgdG9nZ2xlIHRoZSByaWdodCBpbnRlcmFjdGlvbi5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYWRkT2xPdmVybGF5TGF5ZXIoKTtcclxuICAgIHRoaXMuY3JlYXRlTWVhc3VyZVRvb2x0aXAoKTtcclxuICAgIHRoaXMuY3JlYXRlRHJhd0NvbnRyb2woKTtcclxuICAgIHRoaXMuY3JlYXRlTW9kaWZ5Q29udHJvbCgpO1xyXG4gICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgdGhpcy5hZGRHZW9KU09OVG9PdmVybGF5KHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy50b2dnbGVDb250cm9sKCk7XHJcbiAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBvdmVybGF5IGxheWVyIGFuZCBhbnkgaW50ZXJhY3Rpb24gYWRkZWQgYnkgdGhpcyBjb21wb25lbnQuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVDb250cm9sKCk7XHJcbiAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5jbGVhcigpO1xyXG4gICAgdGhpcy5tYXAub2wucmVtb3ZlTGF5ZXIodGhpcy5vbE92ZXJsYXlMYXllcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxyXG4gICAqL1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbikge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuICBwcml2YXRlIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuICBwcml2YXRlIG9uVG91Y2hlZDogYW55ID0gKCkgPT4ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXHJcbiAgICovXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogR2VvSlNPTkdlb21ldHJ5KSB7XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYW4gb3ZlcmxheSBsYXllciB0byB0aGUgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbE92ZXJsYXlMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIHRoaXMub2xPdmVybGF5TGF5ZXIgPSBuZXcgT2xWZWN0b3JMYXllcih7XHJcbiAgICAgIHNvdXJjZTogbmV3IE9sVmVjdG9yU291cmNlKCksXHJcbiAgICAgIHpJbmRleDogNTAwLFxyXG4gICAgICBzdHlsZTogbnVsbFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm1hcC5vbC5hZGRMYXllcih0aGlzLm9sT3ZlcmxheUxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIGRyYXcgY29udHJvbCBhbmQgc3Vic2NyaWJlIHRvIGl0J3MgZ2VvbWV0cnlcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZURyYXdDb250cm9sKCkge1xyXG4gICAgdGhpcy5kcmF3Q29udHJvbCA9IG5ldyBEcmF3Q29udHJvbCh7XHJcbiAgICAgIGdlb21ldHJ5VHlwZTogdGhpcy5nZW9tZXRyeVR5cGUgfHwgJ1BvaW50JyxcclxuICAgICAgbGF5ZXI6IHRoaXMub2xPdmVybGF5TGF5ZXIsXHJcbiAgICAgIGRyYXdTdHlsZTogKG9sRmVhdHVyZTogT2xGZWF0dXJlLCByZXNvbHV0aW9uOiBudW1iZXIpID0+IHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMuZHJhd1N0eWxlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRHJhd1N0eWxlV2l0aERyYXdHdWlkZShzdHlsZSwgcmVzb2x1dGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG1vZGlmeSBjb250cm9sIGFuZCBzdWJzY3JpYmUgdG8gaXQncyBnZW9tZXRyeVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlTW9kaWZ5Q29udHJvbCgpIHtcclxuICAgIHRoaXMubW9kaWZ5Q29udHJvbCA9IG5ldyBNb2RpZnlDb250cm9sKHtcclxuICAgICAgbGF5ZXI6IHRoaXMub2xPdmVybGF5TGF5ZXIsXHJcbiAgICAgIGRyYXdTdHlsZTogKG9sRmVhdHVyZTogT2xGZWF0dXJlLCByZXNvbHV0aW9uOiBudW1iZXIpID0+IHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMuZHJhd1N0eWxlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRHJhd1N0eWxlV2l0aERyYXdHdWlkZShzdHlsZSwgcmVzb2x1dGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZSB0aGUgcHJvcGVyIGNvbnRyb2wgKGRyYXcgb3IgbW9kaWZ5KVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdG9nZ2xlQ29udHJvbCgpIHtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZUNvbnRyb2woKTtcclxuICAgIGlmICghdGhpcy52YWx1ZSAmJiB0aGlzLmdlb21ldHJ5VHlwZSkge1xyXG4gICAgICB0aGlzLmFjdGl2YXRlQ29udHJvbCh0aGlzLmRyYXdDb250cm9sKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVDb250cm9sKHRoaXMubW9kaWZ5Q29udHJvbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSBhIGdpdmVuIGNvbnRyb2xcclxuICAgKiBAcGFyYW0gY29udHJvbCBDb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhY3RpdmF0ZUNvbnRyb2woY29udHJvbDogRHJhd0NvbnRyb2wgfCBNb2RpZnlDb250cm9sKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUNvbnRyb2wgPSBjb250cm9sO1xyXG4gICAgdGhpcy5vbEdlb21ldHJ5RW5kcyQkID0gY29udHJvbC5lbmQkXHJcbiAgICAgIC5zdWJzY3JpYmUoKG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkpID0+IHRoaXMub25PbEdlb21ldHJ5RW5kcyhvbEdlb21ldHJ5KSk7XHJcbiAgICBpZiAodGhpcy5tZWFzdXJlID09PSB0cnVlICYmIGNvbnRyb2wgPT09IHRoaXMuZHJhd0NvbnRyb2wpIHtcclxuICAgICAgdGhpcy5vbEdlb21ldHJ5Q2hhbmdlcyQkID0gY29udHJvbC5jaGFuZ2VzJFxyXG4gICAgICAgIC5zdWJzY3JpYmUoKG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkpID0+IHRoaXMub25PbEdlb21ldHJ5Q2hhbmdlcyhvbEdlb21ldHJ5KSk7XHJcbiAgICB9XHJcbiAgICBjb250cm9sLnNldE9sTWFwKHRoaXMubWFwLm9sKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYWN0aXZhdGUgdGhlIGFjdGl2ZSBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkZWFjdGl2YXRlQ29udHJvbCgpIHtcclxuICAgIHRoaXMucmVtb3ZlTWVhc3VyZVRvb2x0aXAoKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZUNvbnRyb2wgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmFjdGl2ZUNvbnRyb2wuc2V0T2xNYXAodW5kZWZpbmVkKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9sR2VvbWV0cnlFbmRzJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sR2VvbWV0cnlFbmRzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9sR2VvbWV0cnlDaGFuZ2VzJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sR2VvbWV0cnlDaGFuZ2VzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuYWN0aXZlQ29udHJvbCA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBtZWFzdXJlcyBvYnNlcnZhYmxlcyBhbmQgbWFwIHRvb2x0aXBzXHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT2wgbGluZXN0cmluZyBvciBwb2x5Z29uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk9sR2VvbWV0cnlFbmRzKG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkgfCB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMucmVtb3ZlTWVhc3VyZVRvb2x0aXAoKTtcclxuICAgIHRoaXMuc2V0T2xHZW9tZXRyeShvbEdlb21ldHJ5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBtZWFzdXJlcyBvYnNlcnZhYmxlcyBhbmQgbWFwIHRvb2x0aXBzXHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT2wgbGluZXN0cmluZyBvciBwb2x5Z29uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk9sR2VvbWV0cnlDaGFuZ2VzKG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkpIHtcclxuICAgIGlmIChvbEdlb21ldHJ5LmdldFR5cGUoKSAhPT0gJ1BvaW50Jykge1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lYXN1cmVUb29sdGlwKG9sR2VvbWV0cnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBkcmF3aW5nIGVuZHMsIGNvbnZlcnQgdGhlIG91dHB1dCB2YWx1ZSB0byBHZW9KU09OIGFuZCBrZWVwIGl0LlxyXG4gICAqIFJlc3RvcmUgdGhlIGRvdWJsZSBjbGljayBpbnRlcmFjdGlvbi5cclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPTCBnZW9tZXRyeVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0T2xHZW9tZXRyeShvbEdlb21ldHJ5OiBPbEdlb21ldHJ5IHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAob2xHZW9tZXRyeSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5vbEdlb0pTT04ud3JpdGVHZW9tZXRyeU9iamVjdChvbEdlb21ldHJ5LCB7XHJcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICBkYXRhUHJvamVjdGlvbjogJ0VQU0c6NDMyNidcclxuICAgIH0pO1xyXG4gICAgdGhpcy53cml0ZVZhbHVlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIEdlb0pTT04gZ2VvbWV0cnkgdG8gdGhlIG92ZXJsYXlcclxuICAgKiBAcGFyYW0gZ2VvbWV0cnkgR2VvSlNPTiBnZW9tZXRyeVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkR2VvSlNPTlRvT3ZlcmxheShnZW9tZXRyeTogR2VvSlNPTkdlb21ldHJ5KSB7XHJcbiAgICBjb25zdCBvbEdlb21ldHJ5ID0gdGhpcy5vbEdlb0pTT04ucmVhZEdlb21ldHJ5KGdlb21ldHJ5LCB7XHJcbiAgICAgIGRhdGFQcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHRoaXMubWFwLnByb2plY3Rpb25cclxuICAgIH0pO1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlID0gbmV3IE9sRmVhdHVyZSh7XHJcbiAgICAgIGdlb21ldHJ5OiBvbEdlb21ldHJ5XHJcbiAgICB9KTtcclxuICAgIG9sRmVhdHVyZS5zZXRTdHlsZSh0aGlzLm92ZXJsYXlTdHlsZSk7XHJcbiAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5jbGVhcigpO1xyXG4gICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuYWRkRmVhdHVyZShvbEZlYXR1cmUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBtZWFzdXJlIHRvb2x0aXBcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZU1lYXN1cmVUb29sdGlwKCk6IE9sT3ZlcmxheSB7XHJcbiAgICB0aGlzLm9sVG9vbHRpcCA9IG5ldyBPbE92ZXJsYXkoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgb2Zmc2V0OiBbLTMwLCAtMTBdLFxyXG4gICAgICBjbGFzc05hbWU6IFtcclxuICAgICAgICAnaWdvLW1hcC10b29sdGlwJyxcclxuICAgICAgICAnaWdvLW1hcC10b29sdGlwLW1lYXN1cmUnXHJcbiAgICAgIF0uam9pbignICcpLFxyXG4gICAgICBzdG9wRXZlbnQ6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgbWVhc3VyZSB0b29sdGlwIG9mIGFuIE9MIGdlb21ldHJ5XHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT0wgR2VvbWV0cnlcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZU1lYXN1cmVUb29sdGlwKG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkpIHtcclxuICAgIGNvbnN0IG1lYXN1cmUgPSBtZWFzdXJlT2xHZW9tZXRyeShvbEdlb21ldHJ5LCB0aGlzLm1hcC5wcm9qZWN0aW9uKTtcclxuICAgIGNvbnN0IGxlbmd0aHMgPSBtZWFzdXJlLmxlbmd0aHM7XHJcbiAgICBjb25zdCBsYXN0SW5kZXggPSBvbEdlb21ldHJ5LmdldFR5cGUoKSA9PT0gJ1BvbHlnb24nID8gbGVuZ3Rocy5sZW5ndGggLSAyIDogbGVuZ3Rocy5sZW5ndGggLSAxO1xyXG4gICAgY29uc3QgbGFzdExlbmd0aCA9IGxlbmd0aHNbbGFzdEluZGV4XTtcclxuXHJcbiAgICBjb25zdCBvbE1pZHBvaW50cyA9IHVwZGF0ZU9sR2VvbWV0cnlNaWRwb2ludHMob2xHZW9tZXRyeSk7XHJcbiAgICBjb25zdCBvbExhc3RNaWRwb2ludCA9IG9sTWlkcG9pbnRzW2xhc3RJbmRleF07XHJcbiAgICBpZiAob2xNaWRwb2ludHMubGVuZ3RoID09PSAwIHx8IG9sTGFzdE1pZHBvaW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5yZW1vdmVNZWFzdXJlVG9vbHRpcCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbFRvb2x0aXAuc2V0UG9zaXRpb24ob2xMYXN0TWlkcG9pbnQuZmxhdENvb3JkaW5hdGVzKTtcclxuXHJcbiAgICBjb25zdCBpbm5lckh0bWwgPSBmb3JtYXRNZWFzdXJlKGxhc3RMZW5ndGgsIHtcclxuICAgICAgZGVjaW1hbDogMSxcclxuICAgICAgdW5pdDogTWVhc3VyZUxlbmd0aFVuaXQuTWV0ZXJzLFxyXG4gICAgICB1bml0QWJicjogdHJ1ZSxcclxuICAgICAgbG9jYWxlOiAnZnInXHJcbiAgICB9KTtcclxuICAgIHRoaXMub2xUb29sdGlwLmdldEVsZW1lbnQoKS5pbm5lckhUTUwgPSBpbm5lckh0bWw7XHJcbiAgICBpZiAodGhpcy5vbFRvb2x0aXAuZ2V0TWFwKCkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm1hcC5vbC5hZGRPdmVybGF5KHRoaXMub2xUb29sdGlwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgbWVhc3VyZSB0b29sdGlwIGZyb20gdGhlIG1hcFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlTWVhc3VyZVRvb2x0aXAoKSB7XHJcbiAgICBpZiAodGhpcy5vbFRvb2x0aXAuZ2V0TWFwICYmIHRoaXMub2xUb29sdGlwLmdldE1hcCgpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXAub2wucmVtb3ZlT3ZlcmxheSh0aGlzLm9sVG9vbHRpcCk7XHJcbiAgICAgIHRoaXMub2xUb29sdGlwLnNldE1hcCh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRqdXN0IHRoZSBkcmF3IHN0eWxlIHdpdGggdGhlIHNwZWNpZmllZCBkcmF3IGd1aWRlIGRpc3RhbmNlLCBpZiBwb3NzaWJsZVxyXG4gICAqIEBwYXJhbSBvbFN0eWxlIERyYXcgc3R5bGUgdG8gdXBkYXRlXHJcbiAgICogQHBhcmFtIHJlc29sdXRpb24gUmVzb2x1dGlvbiAodG8gbWFrZSB0aGUgc2NyZWVuIHNpemUgb2Ygc3ltYm9sIGZpdCB0aGUgZHJhd0d1aWRlIHZhbHVlKVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlRHJhd1N0eWxlV2l0aERyYXdHdWlkZShvbFN0eWxlOiBPbFN0eWxlLCByZXNvbHV0aW9uOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLmlzU3R5bGVXaXRoUmFkaXVzKG9sU3R5bGUpKSB7XHJcbiAgICAgIGNvbnN0IGRyYXdHdWlkZSA9IHRoaXMuZHJhd0d1aWRlO1xyXG4gICAgICBsZXQgcmFkaXVzO1xyXG4gICAgICBpZiAoZHJhd0d1aWRlID09PSBudWxsIHx8IGRyYXdHdWlkZSA8IDApIHtcclxuICAgICAgICByYWRpdXMgPSB0aGlzLmRlZmF1bHREcmF3U3R5bGVSYWRpdXM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmFkaXVzID0gZHJhd0d1aWRlID4gMCA/IGRyYXdHdWlkZSAvIHJlc29sdXRpb24gOiBkcmF3R3VpZGU7XHJcbiAgICAgIH1cclxuICAgICAgb2xTdHlsZS5nZXRJbWFnZSgpLnNldFJhZGl1cyhyYWRpdXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB3ZXRoZXIgYSBnaXZlbiBPcGVuIExheWVycyBzdHlsZSBoYXMgYSByYWRpdXMgcHJvcGVydHkgdGhhdCBjYW4gYmUgc2V0ICh1c2VkIHRvIHNldCBkcmF3IGd1aWRlKVxyXG4gICAqIEBwYXJhbSBvbFN0eWxlIFRoZSBzdHlsZSBvbiB3aGljaCB0byBwZXJmb3JtIHRoZSBjaGVja1xyXG4gICAqL1xyXG4gIHByaXZhdGUgaXNTdHlsZVdpdGhSYWRpdXMob2xTdHlsZTogT2xTdHlsZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG9sU3R5bGUuZ2V0SW1hZ2UgJiYgb2xTdHlsZS5nZXRJbWFnZSgpLnNldFJhZGl1cztcclxuICB9XHJcbn1cclxuIl19