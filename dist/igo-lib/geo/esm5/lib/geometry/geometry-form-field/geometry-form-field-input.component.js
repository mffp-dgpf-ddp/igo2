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
var GeometryFormFieldInputComponent = /** @class */ (function () {
    function GeometryFormFieldInputComponent(cdRef, ngControl) {
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
        function () { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
        if (this.ngControl !== undefined) {
            // Setting the value accessor directly (instead of using
            // the providers) to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }
    Object.defineProperty(GeometryFormFieldInputComponent.prototype, "geometryType", {
        get: /**
         * @return {?}
         */
        function () { return this._geometryType; },
        /**
         * The geometry type
         */
        set: /**
         * The geometry type
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._geometryType = value;
            if (this.ready === false) {
                return;
            }
            this.deactivateControl();
            this.createDrawControl();
            this.toggleControl();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeometryFormFieldInputComponent.prototype, "drawStyle", {
        get: /**
         * @return {?}
         */
        function () { return this._drawStyle; },
        /**
         * Style for the draw control (applies while the geometry is being drawn)
         */
        set: /**
         * Style for the draw control (applies while the geometry is being drawn)
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._drawStyle = value || createDrawInteractionStyle();
            if (this.isStyleWithRadius(this.drawStyle)) {
                this.defaultDrawStyleRadius = this.drawStyle.getImage().getRadius();
            }
            else {
                this.defaultDrawStyleRadius = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeometryFormFieldInputComponent.prototype, "overlayStyle", {
        get: /**
         * @return {?}
         */
        function () {
            return this._overlayStyle || this.drawStyle;
        },
        /**
         * Style for the overlay layer (applies once the geometry is added to the map)
         * If not specified, drawStyle applies
         */
        set: /**
         * Style for the overlay layer (applies once the geometry is added to the map)
         * If not specified, drawStyle applies
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._overlayStyle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeometryFormFieldInputComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this._value; },
        /**
         * The geometry value (GeoJSON)
         * Implemented as part of ControlValueAccessor.
         */
        set: /**
         * The geometry value (GeoJSON)
         * Implemented as part of ControlValueAccessor.
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeometryFormFieldInputComponent.prototype, "olOverlaySource", {
        /**
         * The vector source to add the geometry to
         * @internal
         */
        get: /**
         * The vector source to add the geometry to
         * \@internal
         * @return {?}
         */
        function () {
            return this.olOverlayLayer.getSource();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create an overlay layer, add the initial geometry to it (if any)
     * and toggle the right interaction.
     * @internal
     */
    /**
     * Create an overlay layer, add the initial geometry to it (if any)
     * and toggle the right interaction.
     * \@internal
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.ngOnInit = /**
     * Create an overlay layer, add the initial geometry to it (if any)
     * and toggle the right interaction.
     * \@internal
     * @return {?}
     */
    function () {
        this.addOlOverlayLayer();
        this.createMeasureTooltip();
        this.createDrawControl();
        this.createModifyControl();
        if (this.value) {
            this.addGeoJSONToOverlay(this.value);
        }
        this.toggleControl();
        this.ready = true;
    };
    /**
     * Clear the overlay layer and any interaction added by this component.
     * @internal
     */
    /**
     * Clear the overlay layer and any interaction added by this component.
     * \@internal
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.ngOnDestroy = /**
     * Clear the overlay layer and any interaction added by this component.
     * \@internal
     * @return {?}
     */
    function () {
        this.deactivateControl();
        this.olOverlaySource.clear();
        this.map.ol.removeLayer(this.olOverlayLayer);
    };
    /**
     * Implemented as part of ControlValueAccessor.
     */
    // tslint:disable-next-line:ban-types
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    // tslint:disable-next-line:ban-types
    GeometryFormFieldInputComponent.prototype.registerOnChange = /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    // tslint:disable-next-line:ban-types
    function (fn) {
        this.onChange = fn;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     */
    // tslint:disable-next-line:ban-types
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    // tslint:disable-next-line:ban-types
    GeometryFormFieldInputComponent.prototype.registerOnTouched = /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    // tslint:disable-next-line:ban-types
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     */
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.writeValue = /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * Add an overlay layer to the map
     */
    /**
     * Add an overlay layer to the map
     * @private
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.addOlOverlayLayer = /**
     * Add an overlay layer to the map
     * @private
     * @return {?}
     */
    function () {
        this.olOverlayLayer = new OlVectorLayer({
            source: new OlVectorSource(),
            zIndex: 500,
            style: null
        });
        this.map.ol.addLayer(this.olOverlayLayer);
    };
    /**
     * Create a draw control and subscribe to it's geometry
     */
    /**
     * Create a draw control and subscribe to it's geometry
     * @private
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.createDrawControl = /**
     * Create a draw control and subscribe to it's geometry
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.drawControl = new DrawControl({
            geometryType: this.geometryType || 'Point',
            layer: this.olOverlayLayer,
            drawStyle: (/**
             * @param {?} olFeature
             * @param {?} resolution
             * @return {?}
             */
            function (olFeature, resolution) {
                /** @type {?} */
                var style = _this.drawStyle;
                _this.updateDrawStyleWithDrawGuide(style, resolution);
                return style;
            })
        });
    };
    /**
     * Create a modify control and subscribe to it's geometry
     */
    /**
     * Create a modify control and subscribe to it's geometry
     * @private
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.createModifyControl = /**
     * Create a modify control and subscribe to it's geometry
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.modifyControl = new ModifyControl({
            layer: this.olOverlayLayer,
            drawStyle: (/**
             * @param {?} olFeature
             * @param {?} resolution
             * @return {?}
             */
            function (olFeature, resolution) {
                /** @type {?} */
                var style = _this.drawStyle;
                _this.updateDrawStyleWithDrawGuide(style, resolution);
                return style;
            })
        });
    };
    /**
     * Toggle the proper control (draw or modify)
     */
    /**
     * Toggle the proper control (draw or modify)
     * @private
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.toggleControl = /**
     * Toggle the proper control (draw or modify)
     * @private
     * @return {?}
     */
    function () {
        this.deactivateControl();
        if (!this.value && this.geometryType) {
            this.activateControl(this.drawControl);
        }
        else {
            this.activateControl(this.modifyControl);
        }
    };
    /**
     * Activate a given control
     * @param control Control
     */
    /**
     * Activate a given control
     * @private
     * @param {?} control Control
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.activateControl = /**
     * Activate a given control
     * @private
     * @param {?} control Control
     * @return {?}
     */
    function (control) {
        var _this = this;
        this.activeControl = control;
        this.olGeometryEnds$$ = control.end$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        function (olGeometry) { return _this.onOlGeometryEnds(olGeometry); }));
        if (this.measure === true && control === this.drawControl) {
            this.olGeometryChanges$$ = control.changes$
                .subscribe((/**
             * @param {?} olGeometry
             * @return {?}
             */
            function (olGeometry) { return _this.onOlGeometryChanges(olGeometry); }));
        }
        control.setOlMap(this.map.ol);
    };
    /**
     * Deactivate the active control
     */
    /**
     * Deactivate the active control
     * @private
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.deactivateControl = /**
     * Deactivate the active control
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * Update measures observables and map tooltips
     * @param olGeometry Ol linestring or polygon
     */
    /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.onOlGeometryEnds = /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    function (olGeometry) {
        this.removeMeasureTooltip();
        this.setOlGeometry(olGeometry);
    };
    /**
     * Update measures observables and map tooltips
     * @param olGeometry Ol linestring or polygon
     */
    /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.onOlGeometryChanges = /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    function (olGeometry) {
        if (olGeometry.getType() !== 'Point') {
            this.updateMeasureTooltip(olGeometry);
        }
    };
    /**
     * When drawing ends, convert the output value to GeoJSON and keep it.
     * Restore the double click interaction.
     * @param olGeometry OL geometry
     */
    /**
     * When drawing ends, convert the output value to GeoJSON and keep it.
     * Restore the double click interaction.
     * @private
     * @param {?} olGeometry OL geometry
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.setOlGeometry = /**
     * When drawing ends, convert the output value to GeoJSON and keep it.
     * Restore the double click interaction.
     * @private
     * @param {?} olGeometry OL geometry
     * @return {?}
     */
    function (olGeometry) {
        if (olGeometry === undefined) {
            return;
        }
        /** @type {?} */
        var value = this.olGeoJSON.writeGeometryObject(olGeometry, {
            featureProjection: this.map.projection,
            dataProjection: 'EPSG:4326'
        });
        this.writeValue(value);
    };
    /**
     * Add a GeoJSON geometry to the overlay
     * @param geometry GeoJSON geometry
     */
    /**
     * Add a GeoJSON geometry to the overlay
     * @private
     * @param {?} geometry GeoJSON geometry
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.addGeoJSONToOverlay = /**
     * Add a GeoJSON geometry to the overlay
     * @private
     * @param {?} geometry GeoJSON geometry
     * @return {?}
     */
    function (geometry) {
        /** @type {?} */
        var olGeometry = this.olGeoJSON.readGeometry(geometry, {
            dataProjection: 'EPSG:4326',
            featureProjection: this.map.projection
        });
        /** @type {?} */
        var olFeature = new OlFeature({
            geometry: olGeometry
        });
        olFeature.setStyle(this.overlayStyle);
        this.olOverlaySource.clear();
        this.olOverlaySource.addFeature(olFeature);
    };
    /**
     * Create the measure tooltip
     */
    /**
     * Create the measure tooltip
     * @private
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.createMeasureTooltip = /**
     * Create the measure tooltip
     * @private
     * @return {?}
     */
    function () {
        this.olTooltip = new OlOverlay({
            element: document.createElement('div'),
            offset: [-30, -10],
            className: [
                'igo-map-tooltip',
                'igo-map-tooltip-measure'
            ].join(' '),
            stopEvent: false
        });
    };
    /**
     * Update the measure tooltip of an OL geometry
     * @param olGeometry OL Geometry
     */
    /**
     * Update the measure tooltip of an OL geometry
     * @private
     * @param {?} olGeometry OL Geometry
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.updateMeasureTooltip = /**
     * Update the measure tooltip of an OL geometry
     * @private
     * @param {?} olGeometry OL Geometry
     * @return {?}
     */
    function (olGeometry) {
        /** @type {?} */
        var measure = measureOlGeometry(olGeometry, this.map.projection);
        /** @type {?} */
        var lengths = measure.lengths;
        /** @type {?} */
        var lastIndex = olGeometry.getType() === 'Polygon' ? lengths.length - 2 : lengths.length - 1;
        /** @type {?} */
        var lastLength = lengths[lastIndex];
        /** @type {?} */
        var olMidpoints = updateOlGeometryMidpoints(olGeometry);
        /** @type {?} */
        var olLastMidpoint = olMidpoints[lastIndex];
        if (olMidpoints.length === 0 || olLastMidpoint === undefined) {
            this.removeMeasureTooltip();
            return;
        }
        this.olTooltip.setPosition(olLastMidpoint.flatCoordinates);
        /** @type {?} */
        var innerHtml = formatMeasure(lastLength, {
            decimal: 1,
            unit: MeasureLengthUnit.Meters,
            unitAbbr: true,
            locale: 'fr'
        });
        this.olTooltip.getElement().innerHTML = innerHtml;
        if (this.olTooltip.getMap() === undefined) {
            this.map.ol.addOverlay(this.olTooltip);
        }
    };
    /**
     * Remove the measure tooltip from the map
     */
    /**
     * Remove the measure tooltip from the map
     * @private
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.removeMeasureTooltip = /**
     * Remove the measure tooltip from the map
     * @private
     * @return {?}
     */
    function () {
        if (this.olTooltip.getMap && this.olTooltip.getMap() !== undefined) {
            this.map.ol.removeOverlay(this.olTooltip);
            this.olTooltip.setMap(undefined);
        }
    };
    /**
     * Adjust the draw style with the specified draw guide distance, if possible
     * @param olStyle Draw style to update
     * @param resolution Resolution (to make the screen size of symbol fit the drawGuide value)
     */
    /**
     * Adjust the draw style with the specified draw guide distance, if possible
     * @private
     * @param {?} olStyle Draw style to update
     * @param {?} resolution Resolution (to make the screen size of symbol fit the drawGuide value)
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.updateDrawStyleWithDrawGuide = /**
     * Adjust the draw style with the specified draw guide distance, if possible
     * @private
     * @param {?} olStyle Draw style to update
     * @param {?} resolution Resolution (to make the screen size of symbol fit the drawGuide value)
     * @return {?}
     */
    function (olStyle, resolution) {
        if (this.isStyleWithRadius(olStyle)) {
            /** @type {?} */
            var drawGuide = this.drawGuide;
            /** @type {?} */
            var radius = void 0;
            if (drawGuide === null || drawGuide < 0) {
                radius = this.defaultDrawStyleRadius;
            }
            else {
                radius = drawGuide > 0 ? drawGuide / resolution : drawGuide;
            }
            olStyle.getImage().setRadius(radius);
        }
    };
    /**
     * Returns wether a given Open Layers style has a radius property that can be set (used to set draw guide)
     * @param olStyle The style on which to perform the check
     */
    /**
     * Returns wether a given Open Layers style has a radius property that can be set (used to set draw guide)
     * @private
     * @param {?} olStyle The style on which to perform the check
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.isStyleWithRadius = /**
     * Returns wether a given Open Layers style has a radius property that can be set (used to set draw guide)
     * @private
     * @param {?} olStyle The style on which to perform the check
     * @return {?}
     */
    function (olStyle) {
        return olStyle.getImage && olStyle.getImage().setRadius;
    };
    GeometryFormFieldInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-geometry-form-field-input',
                    template: "<ng-template></ng-template>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    GeometryFormFieldInputComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
    GeometryFormFieldInputComponent.propDecorators = {
        map: [{ type: Input }],
        geometryType: [{ type: Input }],
        drawGuide: [{ type: Input }],
        measure: [{ type: Input }],
        drawStyle: [{ type: Input }],
        overlayStyle: [{ type: Input }],
        value: [{ type: Input }]
    };
    return GeometryFormFieldInputComponent;
}());
export { GeometryFormFieldInputComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktZm9ybS1maWVsZC1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvZ2VvbWV0cnktZm9ybS1maWVsZC9nZW9tZXRyeS1mb3JtLWZpZWxkLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsUUFBUSxFQUNSLElBQUksRUFDSixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFJakUsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFFMUMsT0FBTyxjQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUVuQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIseUJBQXlCLEVBQ3pCLGFBQWEsRUFDYixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7OztBQVN0RTtJQW9IRSx5Q0FDVSxLQUF3QixFQUNMLFNBQW9CO1FBRHZDLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ0wsY0FBUyxHQUFULFNBQVMsQ0FBVztRQTlHekMsY0FBUyxH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LDhEQUEwQzs7Ozs7SUFDMUMsb0RBQThCOzs7Ozs7SUFNOUIsd0RBQWtEOzs7OztJQUtsRCw4Q0FBcUI7Ozs7O0lBZ0JyQix3REFBc0M7Ozs7O0lBS3RDLG9EQUFrQzs7Ozs7SUFLbEMsa0RBQWtDOzs7OztJQWVsQyxxREFBNEI7Ozs7O0lBYTVCLHdEQUErQjs7Ozs7SUF5Qi9CLGlEQUFnQzs7Ozs7SUF1RGhDLG1EQUFpQzs7Ozs7SUFTakMsb0RBQWtDOzs7OztJQXJEaEMsZ0RBQWdDOztJQUNoQyxvREFBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9wdGlvbmFsLFxyXG4gIFNlbGYsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdDb250cm9sLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0ICogYXMgT2xTdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCBPbEdlb0pTT04gZnJvbSAnb2wvZm9ybWF0L0dlb0pTT04nO1xyXG5pbXBvcnQgT2xHZW9tZXRyeSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5JztcclxuaW1wb3J0IE9sR2VvbWV0cnlUeXBlIGZyb20gJ29sL2dlb20vR2VvbWV0cnlUeXBlJztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IE9sVmVjdG9yU291cmNlIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xyXG5pbXBvcnQgT2xWZWN0b3JMYXllciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xyXG5pbXBvcnQgT2xPdmVybGF5IGZyb20gJ29sL092ZXJsYXknO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHtcclxuICBNZWFzdXJlTGVuZ3RoVW5pdCxcclxuICB1cGRhdGVPbEdlb21ldHJ5TWlkcG9pbnRzLFxyXG4gIGZvcm1hdE1lYXN1cmUsXHJcbiAgbWVhc3VyZU9sR2VvbWV0cnlcclxufSBmcm9tICcuLi8uLi9tZWFzdXJlJztcclxuaW1wb3J0IHsgRHJhd0NvbnRyb2wsIE1vZGlmeUNvbnRyb2wgfSBmcm9tICcuLi9zaGFyZWQvY29udHJvbHMnO1xyXG5pbXBvcnQgeyBjcmVhdGVEcmF3SW50ZXJhY3Rpb25TdHlsZSB9IGZyb20gJy4uL3NoYXJlZC9nZW9tZXRyeS51dGlscyc7XHJcbmltcG9ydCB7IEdlb0pTT05HZW9tZXRyeSB9IGZyb20gJy4uL3NoYXJlZC9nZW9tZXRyeS5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlucHV0IGFsbG93cyBhIHVzZXIgdG8gZHJhdyBhIG5ldyBnZW9tZXRyeSBvciB0byBlZGl0XHJcbiAqIGFuIGV4aXN0aW5nIG9uZSBvbiBhIG1hcC4gQSB0ZXh0IGlucHV0IGlzIGFsc28gZGlzcGxheWVkIGluIHRoZVxyXG4gKiBmb3JtIHdpdGggc29tZSBpbnN0cnVjdGlvbnMuXHJcbiAqIFRoaXMgaXMgc3RpbGwgV0lQLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tZ2VvbWV0cnktZm9ybS1maWVsZC1pbnB1dCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2dlb21ldHJ5LWZvcm0tZmllbGQtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHZW9tZXRyeUZvcm1GaWVsZElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgcHJpdmF0ZSBvbE92ZXJsYXlMYXllcjogT2xWZWN0b3JMYXllcjtcclxuICBwcml2YXRlIG9sR2VvSlNPTiA9IG5ldyBPbEdlb0pTT04oKTtcclxuICBwcml2YXRlIHJlYWR5ID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgZHJhd0NvbnRyb2w6IERyYXdDb250cm9sO1xyXG4gIHByaXZhdGUgbW9kaWZ5Q29udHJvbDogTW9kaWZ5Q29udHJvbDtcclxuICBwcml2YXRlIGRlZmF1bHREcmF3U3R5bGVSYWRpdXM6IG51bWJlcjtcclxuICBwcml2YXRlIG9sR2VvbWV0cnlFbmRzJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIG9sR2VvbWV0cnlDaGFuZ2VzJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIG9sVG9vbHRpcCA9IE9sT3ZlcmxheTtcclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZlIGNvbnRyb2xcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwdWJsaWMgYWN0aXZlQ29udHJvbDogRHJhd0NvbnRyb2wgfCBNb2RpZnlDb250cm9sO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWFwIHRvIGRyYXcgdGhlIGdlb21ldHJ5IG9uXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBnZW9tZXRyeSB0eXBlXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgZ2VvbWV0cnlUeXBlKHZhbHVlOiBPbEdlb21ldHJ5VHlwZSkge1xyXG4gICAgdGhpcy5fZ2VvbWV0cnlUeXBlID0gdmFsdWU7XHJcbiAgICBpZiAodGhpcy5yZWFkeSA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kZWFjdGl2YXRlQ29udHJvbCgpO1xyXG4gICAgdGhpcy5jcmVhdGVEcmF3Q29udHJvbCgpO1xyXG4gICAgdGhpcy50b2dnbGVDb250cm9sKCk7XHJcbiAgfVxyXG4gIGdldCBnZW9tZXRyeVR5cGUoKTogT2xHZW9tZXRyeVR5cGUgeyByZXR1cm4gdGhpcy5fZ2VvbWV0cnlUeXBlOyB9XHJcbiAgcHJpdmF0ZSBfZ2VvbWV0cnlUeXBlOiBPbEdlb21ldHJ5VHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGRyYXdHdWlkZSBhcm91bmQgdGhlIG1vdXNlIHBvaW50ZXIgdG8gaGVscCBkcmF3aW5nXHJcbiAgICovXHJcbiAgQElucHV0KCkgZHJhd0d1aWRlOiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgbWVhc3VyZSB0b29sdGlwIHNob3VsZCBiZSBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBASW5wdXQoKSBtZWFzdXJlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0eWxlIGZvciB0aGUgZHJhdyBjb250cm9sIChhcHBsaWVzIHdoaWxlIHRoZSBnZW9tZXRyeSBpcyBiZWluZyBkcmF3bilcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBkcmF3U3R5bGUodmFsdWU6IE9sU3R5bGUpIHtcclxuICAgIHRoaXMuX2RyYXdTdHlsZSA9IHZhbHVlIHx8IGNyZWF0ZURyYXdJbnRlcmFjdGlvblN0eWxlKCk7XHJcbiAgICBpZiAodGhpcy5pc1N0eWxlV2l0aFJhZGl1cyh0aGlzLmRyYXdTdHlsZSkpIHtcclxuICAgICAgdGhpcy5kZWZhdWx0RHJhd1N0eWxlUmFkaXVzID0gdGhpcy5kcmF3U3R5bGUuZ2V0SW1hZ2UoKS5nZXRSYWRpdXMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdERyYXdTdHlsZVJhZGl1cyA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldCBkcmF3U3R5bGUoKTogT2xTdHlsZSB7IHJldHVybiB0aGlzLl9kcmF3U3R5bGU7IH1cclxuICBwcml2YXRlIF9kcmF3U3R5bGU6IE9sU3R5bGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0eWxlIGZvciB0aGUgb3ZlcmxheSBsYXllciAoYXBwbGllcyBvbmNlIHRoZSBnZW9tZXRyeSBpcyBhZGRlZCB0byB0aGUgbWFwKVxyXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIGRyYXdTdHlsZSBhcHBsaWVzXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgb3ZlcmxheVN0eWxlKHZhbHVlOiBPbFN0eWxlKSB7XHJcbiAgICB0aGlzLl9vdmVybGF5U3R5bGUgPSB2YWx1ZTtcclxuICB9XHJcbiAgZ2V0IG92ZXJsYXlTdHlsZSgpOiBPbFN0eWxlIHtcclxuICAgIHJldHVybiB0aGlzLl9vdmVybGF5U3R5bGUgfHwgdGhpcy5kcmF3U3R5bGU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX292ZXJsYXlTdHlsZTogT2xTdHlsZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGdlb21ldHJ5IHZhbHVlIChHZW9KU09OKVxyXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgdmFsdWUodmFsdWU6IEdlb0pTT05HZW9tZXRyeSkge1xyXG4gICAgaWYgKHRoaXMucmVhZHkgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5hZGRHZW9KU09OVG9PdmVybGF5KHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5U291cmNlLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gICAgdGhpcy50b2dnbGVDb250cm9sKCk7XHJcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcbiAgZ2V0IHZhbHVlKCk6IEdlb0pTT05HZW9tZXRyeSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxyXG4gIHByaXZhdGUgX3ZhbHVlOiBHZW9KU09OR2VvbWV0cnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB2ZWN0b3Igc291cmNlIHRvIGFkZCB0aGUgZ2VvbWV0cnkgdG9cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgb2xPdmVybGF5U291cmNlKCk6IE9sVmVjdG9yU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLm9sT3ZlcmxheUxheWVyLmdldFNvdXJjZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sXHJcbiAgKSB7XHJcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyBTZXR0aW5nIHRoZSB2YWx1ZSBhY2Nlc3NvciBkaXJlY3RseSAoaW5zdGVhZCBvZiB1c2luZ1xyXG4gICAgICAvLyB0aGUgcHJvdmlkZXJzKSB0byBhdm9pZCBydW5uaW5nIGludG8gYSBjaXJjdWxhciBpbXBvcnQuXHJcbiAgICAgIHRoaXMubmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGFuIG92ZXJsYXkgbGF5ZXIsIGFkZCB0aGUgaW5pdGlhbCBnZW9tZXRyeSB0byBpdCAoaWYgYW55KVxyXG4gICAqIGFuZCB0b2dnbGUgdGhlIHJpZ2h0IGludGVyYWN0aW9uLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5hZGRPbE92ZXJsYXlMYXllcigpO1xyXG4gICAgdGhpcy5jcmVhdGVNZWFzdXJlVG9vbHRpcCgpO1xyXG4gICAgdGhpcy5jcmVhdGVEcmF3Q29udHJvbCgpO1xyXG4gICAgdGhpcy5jcmVhdGVNb2RpZnlDb250cm9sKCk7XHJcbiAgICBpZiAodGhpcy52YWx1ZSkge1xyXG4gICAgICB0aGlzLmFkZEdlb0pTT05Ub092ZXJsYXkodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnRvZ2dsZUNvbnRyb2woKTtcclxuICAgIHRoaXMucmVhZHkgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIG92ZXJsYXkgbGF5ZXIgYW5kIGFueSBpbnRlcmFjdGlvbiBhZGRlZCBieSB0aGlzIGNvbXBvbmVudC5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZUNvbnRyb2woKTtcclxuICAgIHRoaXMub2xPdmVybGF5U291cmNlLmNsZWFyKCk7XHJcbiAgICB0aGlzLm1hcC5vbC5yZW1vdmVMYXllcih0aGlzLm9sT3ZlcmxheUxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXHJcbiAgICovXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG4gIHByaXZhdGUgb25DaGFuZ2U6IGFueSA9ICgpID0+IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxyXG4gICAqL1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG4gIHByaXZhdGUgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cclxuICAgKi9cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBHZW9KU09OR2VvbWV0cnkpIHtcclxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhbiBvdmVybGF5IGxheWVyIHRvIHRoZSBtYXBcclxuICAgKi9cclxuICBwcml2YXRlIGFkZE9sT3ZlcmxheUxheWVyKCk6IE9sVmVjdG9yTGF5ZXIge1xyXG4gICAgdGhpcy5vbE92ZXJsYXlMYXllciA9IG5ldyBPbFZlY3RvckxheWVyKHtcclxuICAgICAgc291cmNlOiBuZXcgT2xWZWN0b3JTb3VyY2UoKSxcclxuICAgICAgekluZGV4OiA1MDAsXHJcbiAgICAgIHN0eWxlOiBudWxsXHJcbiAgICB9KTtcclxuICAgIHRoaXMubWFwLm9sLmFkZExheWVyKHRoaXMub2xPdmVybGF5TGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgZHJhdyBjb250cm9sIGFuZCBzdWJzY3JpYmUgdG8gaXQncyBnZW9tZXRyeVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlRHJhd0NvbnRyb2woKSB7XHJcbiAgICB0aGlzLmRyYXdDb250cm9sID0gbmV3IERyYXdDb250cm9sKHtcclxuICAgICAgZ2VvbWV0cnlUeXBlOiB0aGlzLmdlb21ldHJ5VHlwZSB8fCAnUG9pbnQnLFxyXG4gICAgICBsYXllcjogdGhpcy5vbE92ZXJsYXlMYXllcixcclxuICAgICAgZHJhd1N0eWxlOiAob2xGZWF0dXJlOiBPbEZlYXR1cmUsIHJlc29sdXRpb246IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5kcmF3U3R5bGU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEcmF3U3R5bGVXaXRoRHJhd0d1aWRlKHN0eWxlLCByZXNvbHV0aW9uKTtcclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbW9kaWZ5IGNvbnRyb2wgYW5kIHN1YnNjcmliZSB0byBpdCdzIGdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVNb2RpZnlDb250cm9sKCkge1xyXG4gICAgdGhpcy5tb2RpZnlDb250cm9sID0gbmV3IE1vZGlmeUNvbnRyb2woe1xyXG4gICAgICBsYXllcjogdGhpcy5vbE92ZXJsYXlMYXllcixcclxuICAgICAgZHJhd1N0eWxlOiAob2xGZWF0dXJlOiBPbEZlYXR1cmUsIHJlc29sdXRpb246IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5kcmF3U3R5bGU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEcmF3U3R5bGVXaXRoRHJhd0d1aWRlKHN0eWxlLCByZXNvbHV0aW9uKTtcclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlIHRoZSBwcm9wZXIgY29udHJvbCAoZHJhdyBvciBtb2RpZnkpXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0b2dnbGVDb250cm9sKCkge1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlQ29udHJvbCgpO1xyXG4gICAgaWYgKCF0aGlzLnZhbHVlICYmIHRoaXMuZ2VvbWV0cnlUeXBlKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVDb250cm9sKHRoaXMuZHJhd0NvbnRyb2wpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hY3RpdmF0ZUNvbnRyb2wodGhpcy5tb2RpZnlDb250cm9sKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2YXRlIGEgZ2l2ZW4gY29udHJvbFxyXG4gICAqIEBwYXJhbSBjb250cm9sIENvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIGFjdGl2YXRlQ29udHJvbChjb250cm9sOiBEcmF3Q29udHJvbCB8IE1vZGlmeUNvbnRyb2wpIHtcclxuICAgIHRoaXMuYWN0aXZlQ29udHJvbCA9IGNvbnRyb2w7XHJcbiAgICB0aGlzLm9sR2VvbWV0cnlFbmRzJCQgPSBjb250cm9sLmVuZCRcclxuICAgICAgLnN1YnNjcmliZSgob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkgPT4gdGhpcy5vbk9sR2VvbWV0cnlFbmRzKG9sR2VvbWV0cnkpKTtcclxuICAgIGlmICh0aGlzLm1lYXN1cmUgPT09IHRydWUgJiYgY29udHJvbCA9PT0gdGhpcy5kcmF3Q29udHJvbCkge1xyXG4gICAgICB0aGlzLm9sR2VvbWV0cnlDaGFuZ2VzJCQgPSBjb250cm9sLmNoYW5nZXMkXHJcbiAgICAgICAgLnN1YnNjcmliZSgob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkgPT4gdGhpcy5vbk9sR2VvbWV0cnlDaGFuZ2VzKG9sR2VvbWV0cnkpKTtcclxuICAgIH1cclxuICAgIGNvbnRyb2wuc2V0T2xNYXAodGhpcy5tYXAub2wpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVhY3RpdmF0ZSB0aGUgYWN0aXZlIGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIGRlYWN0aXZhdGVDb250cm9sKCkge1xyXG4gICAgdGhpcy5yZW1vdmVNZWFzdXJlVG9vbHRpcCgpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlQ29udHJvbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlQ29udHJvbC5zZXRPbE1hcCh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub2xHZW9tZXRyeUVuZHMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xHZW9tZXRyeUVuZHMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub2xHZW9tZXRyeUNoYW5nZXMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xHZW9tZXRyeUNoYW5nZXMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY3RpdmVDb250cm9sID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIG1lYXN1cmVzIG9ic2VydmFibGVzIGFuZCBtYXAgdG9vbHRpcHNcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBsaW5lc3RyaW5nIG9yIHBvbHlnb25cclxuICAgKi9cclxuICBwcml2YXRlIG9uT2xHZW9tZXRyeUVuZHMob2xHZW9tZXRyeTogT2xHZW9tZXRyeSB8IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5yZW1vdmVNZWFzdXJlVG9vbHRpcCgpO1xyXG4gICAgdGhpcy5zZXRPbEdlb21ldHJ5KG9sR2VvbWV0cnkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIG1lYXN1cmVzIG9ic2VydmFibGVzIGFuZCBtYXAgdG9vbHRpcHNcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBsaW5lc3RyaW5nIG9yIHBvbHlnb25cclxuICAgKi9cclxuICBwcml2YXRlIG9uT2xHZW9tZXRyeUNoYW5nZXMob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkge1xyXG4gICAgaWYgKG9sR2VvbWV0cnkuZ2V0VHlwZSgpICE9PSAnUG9pbnQnKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlTWVhc3VyZVRvb2x0aXAob2xHZW9tZXRyeSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGRyYXdpbmcgZW5kcywgY29udmVydCB0aGUgb3V0cHV0IHZhbHVlIHRvIEdlb0pTT04gYW5kIGtlZXAgaXQuXHJcbiAgICogUmVzdG9yZSB0aGUgZG91YmxlIGNsaWNrIGludGVyYWN0aW9uLlxyXG4gICAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIGdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRPbEdlb21ldHJ5KG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmIChvbEdlb21ldHJ5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLm9sR2VvSlNPTi53cml0ZUdlb21ldHJ5T2JqZWN0KG9sR2VvbWV0cnksIHtcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHRoaXMubWFwLnByb2plY3Rpb24sXHJcbiAgICAgIGRhdGFQcm9qZWN0aW9uOiAnRVBTRzo0MzI2J1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLndyaXRlVmFsdWUodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgR2VvSlNPTiBnZW9tZXRyeSB0byB0aGUgb3ZlcmxheVxyXG4gICAqIEBwYXJhbSBnZW9tZXRyeSBHZW9KU09OIGdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRHZW9KU09OVG9PdmVybGF5KGdlb21ldHJ5OiBHZW9KU09OR2VvbWV0cnkpIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSB0aGlzLm9sR2VvSlNPTi5yZWFkR2VvbWV0cnkoZ2VvbWV0cnksIHtcclxuICAgICAgZGF0YVByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxyXG4gICAgICBmZWF0dXJlUHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvblxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvbEZlYXR1cmUgPSBuZXcgT2xGZWF0dXJlKHtcclxuICAgICAgZ2VvbWV0cnk6IG9sR2VvbWV0cnlcclxuICAgIH0pO1xyXG4gICAgb2xGZWF0dXJlLnNldFN0eWxlKHRoaXMub3ZlcmxheVN0eWxlKTtcclxuICAgIHRoaXMub2xPdmVybGF5U291cmNlLmNsZWFyKCk7XHJcbiAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5hZGRGZWF0dXJlKG9sRmVhdHVyZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlIG1lYXN1cmUgdG9vbHRpcFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlTWVhc3VyZVRvb2x0aXAoKTogT2xPdmVybGF5IHtcclxuICAgIHRoaXMub2xUb29sdGlwID0gbmV3IE9sT3ZlcmxheSh7XHJcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICBvZmZzZXQ6IFstMzAsIC0xMF0sXHJcbiAgICAgIGNsYXNzTmFtZTogW1xyXG4gICAgICAgICdpZ28tbWFwLXRvb2x0aXAnLFxyXG4gICAgICAgICdpZ28tbWFwLXRvb2x0aXAtbWVhc3VyZSdcclxuICAgICAgXS5qb2luKCcgJyksXHJcbiAgICAgIHN0b3BFdmVudDogZmFsc2VcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBtZWFzdXJlIHRvb2x0aXAgb2YgYW4gT0wgZ2VvbWV0cnlcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPTCBHZW9tZXRyeVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlTWVhc3VyZVRvb2x0aXAob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkge1xyXG4gICAgY29uc3QgbWVhc3VyZSA9IG1lYXN1cmVPbEdlb21ldHJ5KG9sR2VvbWV0cnksIHRoaXMubWFwLnByb2plY3Rpb24pO1xyXG4gICAgY29uc3QgbGVuZ3RocyA9IG1lYXN1cmUubGVuZ3RocztcclxuICAgIGNvbnN0IGxhc3RJbmRleCA9IG9sR2VvbWV0cnkuZ2V0VHlwZSgpID09PSAnUG9seWdvbicgPyBsZW5ndGhzLmxlbmd0aCAtIDIgOiBsZW5ndGhzLmxlbmd0aCAtIDE7XHJcbiAgICBjb25zdCBsYXN0TGVuZ3RoID0gbGVuZ3Roc1tsYXN0SW5kZXhdO1xyXG5cclxuICAgIGNvbnN0IG9sTWlkcG9pbnRzID0gdXBkYXRlT2xHZW9tZXRyeU1pZHBvaW50cyhvbEdlb21ldHJ5KTtcclxuICAgIGNvbnN0IG9sTGFzdE1pZHBvaW50ID0gb2xNaWRwb2ludHNbbGFzdEluZGV4XTtcclxuICAgIGlmIChvbE1pZHBvaW50cy5sZW5ndGggPT09IDAgfHwgb2xMYXN0TWlkcG9pbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnJlbW92ZU1lYXN1cmVUb29sdGlwKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sVG9vbHRpcC5zZXRQb3NpdGlvbihvbExhc3RNaWRwb2ludC5mbGF0Q29vcmRpbmF0ZXMpO1xyXG5cclxuICAgIGNvbnN0IGlubmVySHRtbCA9IGZvcm1hdE1lYXN1cmUobGFzdExlbmd0aCwge1xyXG4gICAgICBkZWNpbWFsOiAxLFxyXG4gICAgICB1bml0OiBNZWFzdXJlTGVuZ3RoVW5pdC5NZXRlcnMsXHJcbiAgICAgIHVuaXRBYmJyOiB0cnVlLFxyXG4gICAgICBsb2NhbGU6ICdmcidcclxuICAgIH0pO1xyXG4gICAgdGhpcy5vbFRvb2x0aXAuZ2V0RWxlbWVudCgpLmlubmVySFRNTCA9IGlubmVySHRtbDtcclxuICAgIGlmICh0aGlzLm9sVG9vbHRpcC5nZXRNYXAoKSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWFwLm9sLmFkZE92ZXJsYXkodGhpcy5vbFRvb2x0aXApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIHRoZSBtZWFzdXJlIHRvb2x0aXAgZnJvbSB0aGUgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVNZWFzdXJlVG9vbHRpcCgpIHtcclxuICAgIGlmICh0aGlzLm9sVG9vbHRpcC5nZXRNYXAgJiYgdGhpcy5vbFRvb2x0aXAuZ2V0TWFwKCkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm1hcC5vbC5yZW1vdmVPdmVybGF5KHRoaXMub2xUb29sdGlwKTtcclxuICAgICAgdGhpcy5vbFRvb2x0aXAuc2V0TWFwKHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGp1c3QgdGhlIGRyYXcgc3R5bGUgd2l0aCB0aGUgc3BlY2lmaWVkIGRyYXcgZ3VpZGUgZGlzdGFuY2UsIGlmIHBvc3NpYmxlXHJcbiAgICogQHBhcmFtIG9sU3R5bGUgRHJhdyBzdHlsZSB0byB1cGRhdGVcclxuICAgKiBAcGFyYW0gcmVzb2x1dGlvbiBSZXNvbHV0aW9uICh0byBtYWtlIHRoZSBzY3JlZW4gc2l6ZSBvZiBzeW1ib2wgZml0IHRoZSBkcmF3R3VpZGUgdmFsdWUpXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVEcmF3U3R5bGVXaXRoRHJhd0d1aWRlKG9sU3R5bGU6IE9sU3R5bGUsIHJlc29sdXRpb246IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuaXNTdHlsZVdpdGhSYWRpdXMob2xTdHlsZSkpIHtcclxuICAgICAgY29uc3QgZHJhd0d1aWRlID0gdGhpcy5kcmF3R3VpZGU7XHJcbiAgICAgIGxldCByYWRpdXM7XHJcbiAgICAgIGlmIChkcmF3R3VpZGUgPT09IG51bGwgfHwgZHJhd0d1aWRlIDwgMCkge1xyXG4gICAgICAgIHJhZGl1cyA9IHRoaXMuZGVmYXVsdERyYXdTdHlsZVJhZGl1cztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByYWRpdXMgPSBkcmF3R3VpZGUgPiAwID8gZHJhd0d1aWRlIC8gcmVzb2x1dGlvbiA6IGRyYXdHdWlkZTtcclxuICAgICAgfVxyXG4gICAgICBvbFN0eWxlLmdldEltYWdlKCkuc2V0UmFkaXVzKHJhZGl1cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHdldGhlciBhIGdpdmVuIE9wZW4gTGF5ZXJzIHN0eWxlIGhhcyBhIHJhZGl1cyBwcm9wZXJ0eSB0aGF0IGNhbiBiZSBzZXQgKHVzZWQgdG8gc2V0IGRyYXcgZ3VpZGUpXHJcbiAgICogQHBhcmFtIG9sU3R5bGUgVGhlIHN0eWxlIG9uIHdoaWNoIHRvIHBlcmZvcm0gdGhlIGNoZWNrXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpc1N0eWxlV2l0aFJhZGl1cyhvbFN0eWxlOiBPbFN0eWxlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gb2xTdHlsZS5nZXRJbWFnZSAmJiBvbFN0eWxlLmdldEltYWdlKCkuc2V0UmFkaXVzO1xyXG4gIH1cclxufVxyXG4iXX0=