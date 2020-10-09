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
import * as olproj from 'ol/proj';
import Point from 'ol/geom/Point';
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
        this._drawControlIsActive = true;
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
            this.drawControl.freehand$.next(this.freehandDrawIsActive);
            this.toggleControl();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeometryFormFieldInputComponent.prototype, "drawControlIsActive", {
        /**
         * Whether draw control should be active or not
         */
        get: /**
         * Whether draw control should be active or not
         * @return {?}
         */
        function () { return this._drawControlIsActive; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._drawControlIsActive = value;
            if (this.ready === false) {
                return;
            }
            this.deactivateControl();
            if (!this._drawControlIsActive) {
                return;
            }
            else {
                this.toggleControl();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeometryFormFieldInputComponent.prototype, "freehandDrawIsActive", {
        /**
         * Whether freehand draw control should be active or not
         */
        get: /**
         * Whether freehand draw control should be active or not
         * @return {?}
         */
        function () { return this._freehandDrawIsActive; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._freehandDrawIsActive = value;
            this.deactivateControl();
            this.createDrawControl();
            this.createModifyControl();
            this.drawControl.freehand$.next(this.freehandDrawIsActive);
            if (this.ready === false) {
                return;
            }
            if (!this.drawControlIsActive) {
                return;
            }
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
            if (value === undefined) {
                value = createDrawInteractionStyle();
            }
            this._drawStyle = value;
            if (value && this.isStyleWithRadius(value)) {
                this.defaultDrawStyleRadius = value.getImage().getRadius();
            }
            else {
                this.defaultDrawStyleRadius = null;
            }
            this.deactivateControl();
            this.createDrawControl();
            this.createModifyControl();
            this.drawControl.freehand$.next(this.freehandDrawIsActive);
            this.toggleControl();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeometryFormFieldInputComponent.prototype, "overlayStyle", {
        get: /**
         * @return {?}
         */
        function () { return this._overlayStyle; },
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
        function (value) { this._overlayStyle = value; },
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
            this._value = value;
            if (this.ready === false) {
                return;
            }
            if (value) {
                this.addGeoJSONToOverlay(value);
            }
            else {
                this.olOverlaySource.clear();
            }
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
    Object.defineProperty(GeometryFormFieldInputComponent.prototype, "radius", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (this.ready === false) {
                return;
            }
            if (this.modifyControl.getSource()) {
                this.modifyControl.getSource().refresh();
            }
            if (this.freehandDrawIsActive) {
                /** @type {?} */
                var olModify_1;
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    olModify_1 = _this.modifyControl.olModifyInteraction;
                    if (olModify_1) {
                        if (olModify_1.features_) {
                            olModify_1.features_.clear();
                        }
                    }
                }), 0);
            }
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
        if (this.drawStyle === undefined) {
            this.drawStyle = createDrawInteractionStyle();
        }
        if (this.overlayStyle === undefined) {
            this.overlayStyle = this.drawStyle;
        }
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
        // This is mandatory when the form control is reused after
        // this component has been destroyed. It seems like the control
        // keeps a reference to this component even after it's destroyed
        // and it attempts to set it's value
        this.ready = false;
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
            drawStyle: typeof this.drawStyle === 'function' ? this.drawStyle : (/**
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
            drawStyle: typeof this.drawStyle === 'function' ? this.drawStyle : (/**
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
        if (!this.drawControlIsActive) {
            return;
        }
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
        /** @type {?} */
        var value;
        if (olGeometry === undefined) {
            return;
        }
        if (olGeometry.getType() === 'Circle') { // Because Circle doesn't exist as a GeoJSON object
            olGeometry = this.circleToPoint(olGeometry);
        }
        value = this.olGeoJSON.writeGeometryObject(olGeometry, {
            featureProjection: this.map.projection,
            dataProjection: 'EPSG:4326'
        });
        if (olGeometry.get('radius')) {
            value.radius = olGeometry.get('radius');
            olGeometry._radius = value.radius;
        }
        this.writeValue(value);
    };
    /**
     * @private
     * @param {?} olGeometry
     * @return {?}
     */
    GeometryFormFieldInputComponent.prototype.circleToPoint = /**
     * @private
     * @param {?} olGeometry
     * @return {?}
     */
    function (olGeometry) {
        /** @type {?} */
        var center = olGeometry.getCenter();
        /** @type {?} */
        var coordinates = olproj.transform(center, this.map.projection, 'EPSG:4326');
        /** @type {?} */
        var radius = Math.round(olGeometry.getRadius() * (Math.cos((Math.PI / 180) * coordinates[1])));
        // Convert it to a point object
        olGeometry = new Point(center);
        olGeometry.set('radius', radius, true);
        return olGeometry;
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
            if (!drawGuide || drawGuide < 0) {
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
        return typeof olStyle !== 'function' && olStyle.getImage && olStyle.getImage().setRadius;
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
        drawControlIsActive: [{ type: Input }],
        freehandDrawIsActive: [{ type: Input }],
        drawStyle: [{ type: Input }],
        overlayStyle: [{ type: Input }],
        value: [{ type: Input }],
        radius: [{ type: Input }]
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
    GeometryFormFieldInputComponent.prototype._drawControlIsActive;
    /**
     * @type {?}
     * @private
     */
    GeometryFormFieldInputComponent.prototype._freehandDrawIsActive;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktZm9ybS1maWVsZC1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvZ2VvbWV0cnktZm9ybS1maWVsZC9nZW9tZXRyeS1mb3JtLWZpZWxkLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsUUFBUSxFQUNSLElBQUksRUFDSixpQkFBaUIsRUFDakIsdUJBQXVCLEVBR3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFJakUsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFFMUMsT0FBTyxjQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUVuQyxPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEtBQUssTUFBTSxlQUFlLENBQUM7QUFFbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHlCQUF5QixFQUN6QixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7QUFTdEU7SUEwTEUseUNBQ1UsS0FBd0IsRUFDTCxTQUFv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QWtCTCxLQUFLOzBCQUtMLEtBQUs7c0NBS0wsS0FBSzt1Q0FtQkwsS0FBSzs0QkF5QkwsS0FBSzsrQkF5QkwsS0FBSzt3QkFTTCxLQUFLO3lCQTJCTCxLQUFLOztJQXVWUixzQ0FBQztDQUFBLEFBNWZELElBNGZDO1NBdmZZLCtCQUErQjs7Ozs7O0lBRTFDLHlEQUFzQzs7Ozs7SUFDdEMsb0RBQW9DOzs7OztJQUNwQyxnREFBc0I7Ozs7O0lBRXRCLHNEQUFpQzs7Ozs7SUFDakMsd0RBQXFDOzs7OztJQUNyQyxpRUFBdUM7Ozs7O0lBQ3ZDLDJEQUF1Qzs7Ozs7SUFDdkMsOERBQTBDOzs7OztJQUMxQyxvREFBOEI7Ozs7OztJQU05Qix3REFBa0Q7Ozs7O0lBS2xELDhDQUFxQjs7Ozs7SUFrQnJCLHdEQUFzQzs7Ozs7SUFLdEMsb0RBQWtDOzs7OztJQUtsQyxrREFBa0M7Ozs7O0lBbUJsQywrREFBNkM7Ozs7O0lBeUI3QyxnRUFBdUM7Ozs7O0lBd0J2QyxxREFBNEI7Ozs7O0lBUzVCLHdEQUErQjs7Ozs7SUF1Qi9CLGlEQUFnQzs7Ozs7SUE0RmhDLG1EQUFpQzs7Ozs7SUFTakMsb0RBQWtDOzs7OztJQXJFaEMsZ0RBQWdDOztJQUNoQyxvREFBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbE1vZGlmeSB9IGZyb20gJ29sL2ludGVyYWN0aW9uL01vZGlmeSc7XHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3B0aW9uYWwsXHJcbiAgU2VsZixcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nQ29udHJvbCwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCAqIGFzIE9sU3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgT2xHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcclxuaW1wb3J0IE9sR2VvbWV0cnkgZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeSc7XHJcbmltcG9ydCBPbEdlb21ldHJ5VHlwZSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5VHlwZSc7XHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbFZlY3RvclNvdXJjZSBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0IE9sVmVjdG9yTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcclxuaW1wb3J0IE9sT3ZlcmxheSBmcm9tICdvbC9PdmVybGF5JztcclxuaW1wb3J0ICogYXMgcG9seSBmcm9tICdvbC9nZW9tL1BvbHlnb24nO1xyXG5pbXBvcnQgKiBhcyBvbHByb2ogZnJvbSAnb2wvcHJvaic7XHJcbmltcG9ydCBQb2ludCBmcm9tICdvbC9nZW9tL1BvaW50JztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7XHJcbiAgTWVhc3VyZUxlbmd0aFVuaXQsXHJcbiAgdXBkYXRlT2xHZW9tZXRyeU1pZHBvaW50cyxcclxuICBmb3JtYXRNZWFzdXJlLFxyXG4gIG1lYXN1cmVPbEdlb21ldHJ5XHJcbn0gZnJvbSAnLi4vLi4vbWVhc3VyZSc7XHJcbmltcG9ydCB7IERyYXdDb250cm9sLCBNb2RpZnlDb250cm9sIH0gZnJvbSAnLi4vc2hhcmVkL2NvbnRyb2xzJztcclxuaW1wb3J0IHsgY3JlYXRlRHJhd0ludGVyYWN0aW9uU3R5bGUgfSBmcm9tICcuLi9zaGFyZWQvZ2VvbWV0cnkudXRpbHMnO1xyXG5pbXBvcnQgeyBHZW9KU09OR2VvbWV0cnkgfSBmcm9tICcuLi9zaGFyZWQvZ2VvbWV0cnkuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogVGhpcyBpbnB1dCBhbGxvd3MgYSB1c2VyIHRvIGRyYXcgYSBuZXcgZ2VvbWV0cnkgb3IgdG8gZWRpdFxyXG4gKiBhbiBleGlzdGluZyBvbmUgb24gYSBtYXAuIEEgdGV4dCBpbnB1dCBpcyBhbHNvIGRpc3BsYXllZCBpbiB0aGVcclxuICogZm9ybSB3aXRoIHNvbWUgaW5zdHJ1Y3Rpb25zLlxyXG4gKiBUaGlzIGlzIHN0aWxsIFdJUC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWdlb21ldHJ5LWZvcm0tZmllbGQtaW5wdXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9nZW9tZXRyeS1mb3JtLWZpZWxkLWlucHV0LmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2VvbWV0cnlGb3JtRmllbGRJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gIHByaXZhdGUgb2xPdmVybGF5TGF5ZXI6IE9sVmVjdG9yTGF5ZXI7XHJcbiAgcHJpdmF0ZSBvbEdlb0pTT04gPSBuZXcgT2xHZW9KU09OKCk7XHJcbiAgcHJpdmF0ZSByZWFkeSA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIGRyYXdDb250cm9sOiBEcmF3Q29udHJvbDtcclxuICBwcml2YXRlIG1vZGlmeUNvbnRyb2w6IE1vZGlmeUNvbnRyb2w7XHJcbiAgcHJpdmF0ZSBkZWZhdWx0RHJhd1N0eWxlUmFkaXVzOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBvbEdlb21ldHJ5RW5kcyQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBvbEdlb21ldHJ5Q2hhbmdlcyQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBvbFRvb2x0aXAgPSBPbE92ZXJsYXk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2ZSBjb250cm9sXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHVibGljIGFjdGl2ZUNvbnRyb2w6IERyYXdDb250cm9sIHwgTW9kaWZ5Q29udHJvbDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1hcCB0byBkcmF3IHRoZSBnZW9tZXRyeSBvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZ2VvbWV0cnkgdHlwZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGdlb21ldHJ5VHlwZSh2YWx1ZTogT2xHZW9tZXRyeVR5cGUpIHtcclxuICAgIHRoaXMuX2dlb21ldHJ5VHlwZSA9IHZhbHVlO1xyXG4gICAgaWYgKHRoaXMucmVhZHkgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlYWN0aXZhdGVDb250cm9sKCk7XHJcbiAgICB0aGlzLmNyZWF0ZURyYXdDb250cm9sKCk7XHJcbiAgICB0aGlzLmRyYXdDb250cm9sLmZyZWVoYW5kJC5uZXh0KHRoaXMuZnJlZWhhbmREcmF3SXNBY3RpdmUpO1xyXG4gICAgdGhpcy50b2dnbGVDb250cm9sKCk7XHJcbiAgfVxyXG4gIGdldCBnZW9tZXRyeVR5cGUoKTogT2xHZW9tZXRyeVR5cGUgeyByZXR1cm4gdGhpcy5fZ2VvbWV0cnlUeXBlOyB9XHJcbiAgcHJpdmF0ZSBfZ2VvbWV0cnlUeXBlOiBPbEdlb21ldHJ5VHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGRyYXdHdWlkZSBhcm91bmQgdGhlIG1vdXNlIHBvaW50ZXIgdG8gaGVscCBkcmF3aW5nXHJcbiAgICovXHJcbiAgQElucHV0KCkgZHJhd0d1aWRlOiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgbWVhc3VyZSB0b29sdGlwIHNob3VsZCBiZSBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBASW5wdXQoKSBtZWFzdXJlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgZHJhdyBjb250cm9sIHNob3VsZCBiZSBhY3RpdmUgb3Igbm90XHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBnZXQgZHJhd0NvbnRyb2xJc0FjdGl2ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2RyYXdDb250cm9sSXNBY3RpdmU7IH1cclxuICBzZXQgZHJhd0NvbnRyb2xJc0FjdGl2ZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZHJhd0NvbnRyb2xJc0FjdGl2ZSA9IHZhbHVlO1xyXG4gICAgaWYgKHRoaXMucmVhZHkgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZGVhY3RpdmF0ZUNvbnRyb2woKTtcclxuICAgIGlmICghdGhpcy5fZHJhd0NvbnRyb2xJc0FjdGl2ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRvZ2dsZUNvbnRyb2woKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBfZHJhd0NvbnRyb2xJc0FjdGl2ZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgZnJlZWhhbmQgZHJhdyBjb250cm9sIHNob3VsZCBiZSBhY3RpdmUgb3Igbm90XHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBnZXQgZnJlZWhhbmREcmF3SXNBY3RpdmUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9mcmVlaGFuZERyYXdJc0FjdGl2ZTsgfVxyXG4gIHNldCBmcmVlaGFuZERyYXdJc0FjdGl2ZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZnJlZWhhbmREcmF3SXNBY3RpdmUgPSB2YWx1ZTtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZUNvbnRyb2woKTtcclxuXHJcbiAgICB0aGlzLmNyZWF0ZURyYXdDb250cm9sKCk7XHJcbiAgICB0aGlzLmNyZWF0ZU1vZGlmeUNvbnRyb2woKTtcclxuXHJcbiAgICB0aGlzLmRyYXdDb250cm9sLmZyZWVoYW5kJC5uZXh0KHRoaXMuZnJlZWhhbmREcmF3SXNBY3RpdmUpO1xyXG5cclxuICAgIGlmICh0aGlzLnJlYWR5ID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmRyYXdDb250cm9sSXNBY3RpdmUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy50b2dnbGVDb250cm9sKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2ZyZWVoYW5kRHJhd0lzQWN0aXZlOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBTdHlsZSBmb3IgdGhlIGRyYXcgY29udHJvbCAoYXBwbGllcyB3aGlsZSB0aGUgZ2VvbWV0cnkgaXMgYmVpbmcgZHJhd24pXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgZHJhd1N0eWxlKHZhbHVlOiBPbFN0eWxlKSB7XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB2YWx1ZSA9IGNyZWF0ZURyYXdJbnRlcmFjdGlvblN0eWxlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9kcmF3U3R5bGUgPSB2YWx1ZTtcclxuICAgIGlmICh2YWx1ZSAmJiB0aGlzLmlzU3R5bGVXaXRoUmFkaXVzKHZhbHVlKSkge1xyXG4gICAgICB0aGlzLmRlZmF1bHREcmF3U3R5bGVSYWRpdXMgPSB2YWx1ZS5nZXRJbWFnZSgpLmdldFJhZGl1cygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kZWZhdWx0RHJhd1N0eWxlUmFkaXVzID0gbnVsbDtcclxuICAgIH1cclxuICAgIHRoaXMuZGVhY3RpdmF0ZUNvbnRyb2woKTtcclxuICAgIHRoaXMuY3JlYXRlRHJhd0NvbnRyb2woKTtcclxuICAgIHRoaXMuY3JlYXRlTW9kaWZ5Q29udHJvbCgpO1xyXG5cclxuICAgIHRoaXMuZHJhd0NvbnRyb2wuZnJlZWhhbmQkLm5leHQodGhpcy5mcmVlaGFuZERyYXdJc0FjdGl2ZSk7XHJcbiAgICB0aGlzLnRvZ2dsZUNvbnRyb2woKTtcclxuICB9XHJcbiAgZ2V0IGRyYXdTdHlsZSgpOiBPbFN0eWxlIHsgcmV0dXJuIHRoaXMuX2RyYXdTdHlsZTsgfVxyXG4gIHByaXZhdGUgX2RyYXdTdHlsZTogT2xTdHlsZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3R5bGUgZm9yIHRoZSBvdmVybGF5IGxheWVyIChhcHBsaWVzIG9uY2UgdGhlIGdlb21ldHJ5IGlzIGFkZGVkIHRvIHRoZSBtYXApXHJcbiAgICogSWYgbm90IHNwZWNpZmllZCwgZHJhd1N0eWxlIGFwcGxpZXNcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBvdmVybGF5U3R5bGUodmFsdWU6IE9sU3R5bGUpIHsgdGhpcy5fb3ZlcmxheVN0eWxlID0gdmFsdWU7IH1cclxuICBnZXQgb3ZlcmxheVN0eWxlKCk6IE9sU3R5bGUgeyByZXR1cm4gdGhpcy5fb3ZlcmxheVN0eWxlOyB9XHJcbiAgcHJpdmF0ZSBfb3ZlcmxheVN0eWxlOiBPbFN0eWxlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZ2VvbWV0cnkgdmFsdWUgKEdlb0pTT04pXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCB2YWx1ZSh2YWx1ZTogR2VvSlNPTkdlb21ldHJ5KSB7XHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgaWYgKHRoaXMucmVhZHkgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5hZGRHZW9KU09OVG9PdmVybGF5KHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5U291cmNlLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcclxuICAgIHRoaXMudG9nZ2xlQ29udHJvbCgpO1xyXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG4gIGdldCB2YWx1ZSgpOiBHZW9KU09OR2VvbWV0cnkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cclxuICBwcml2YXRlIF92YWx1ZTogR2VvSlNPTkdlb21ldHJ5O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdmVjdG9yIHNvdXJjZSB0byBhZGQgdGhlIGdlb21ldHJ5IHRvXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG9sT3ZlcmxheVNvdXJjZSgpOiBPbFZlY3RvclNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE92ZXJsYXlMYXllci5nZXRTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHJhZGl1cyh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodGhpcy5yZWFkeSA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubW9kaWZ5Q29udHJvbC5nZXRTb3VyY2UoKSkge1xyXG4gICAgICB0aGlzLm1vZGlmeUNvbnRyb2wuZ2V0U291cmNlKCkucmVmcmVzaCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZnJlZWhhbmREcmF3SXNBY3RpdmUpIHtcclxuICAgICAgbGV0IG9sTW9kaWZ5O1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBvbE1vZGlmeSA9IHRoaXMubW9kaWZ5Q29udHJvbC5vbE1vZGlmeUludGVyYWN0aW9uO1xyXG4gICAgICAgIGlmIChvbE1vZGlmeSkge1xyXG4gICAgICAgICAgaWYgKG9sTW9kaWZ5LmZlYXR1cmVzXykge1xyXG4gICAgICAgICAgICBvbE1vZGlmeS5mZWF0dXJlc18uY2xlYXIoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sXHJcbiAgKSB7XHJcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyBTZXR0aW5nIHRoZSB2YWx1ZSBhY2Nlc3NvciBkaXJlY3RseSAoaW5zdGVhZCBvZiB1c2luZ1xyXG4gICAgICAvLyB0aGUgcHJvdmlkZXJzKSB0byBhdm9pZCBydW5uaW5nIGludG8gYSBjaXJjdWxhciBpbXBvcnQuXHJcbiAgICAgIHRoaXMubmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGFuIG92ZXJsYXkgbGF5ZXIsIGFkZCB0aGUgaW5pdGlhbCBnZW9tZXRyeSB0byBpdCAoaWYgYW55KVxyXG4gICAqIGFuZCB0b2dnbGUgdGhlIHJpZ2h0IGludGVyYWN0aW9uLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuZHJhd1N0eWxlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5kcmF3U3R5bGUgPSBjcmVhdGVEcmF3SW50ZXJhY3Rpb25TdHlsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm92ZXJsYXlTdHlsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub3ZlcmxheVN0eWxlID0gdGhpcy5kcmF3U3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hZGRPbE92ZXJsYXlMYXllcigpO1xyXG4gICAgdGhpcy5jcmVhdGVNZWFzdXJlVG9vbHRpcCgpO1xyXG4gICAgdGhpcy5jcmVhdGVEcmF3Q29udHJvbCgpO1xyXG4gICAgdGhpcy5jcmVhdGVNb2RpZnlDb250cm9sKCk7XHJcblxyXG4gICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgdGhpcy5hZGRHZW9KU09OVG9PdmVybGF5KHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy50b2dnbGVDb250cm9sKCk7XHJcblxyXG4gICAgdGhpcy5yZWFkeSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgb3ZlcmxheSBsYXllciBhbmQgYW55IGludGVyYWN0aW9uIGFkZGVkIGJ5IHRoaXMgY29tcG9uZW50LlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgLy8gVGhpcyBpcyBtYW5kYXRvcnkgd2hlbiB0aGUgZm9ybSBjb250cm9sIGlzIHJldXNlZCBhZnRlclxyXG4gICAgLy8gdGhpcyBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiBJdCBzZWVtcyBsaWtlIHRoZSBjb250cm9sXHJcbiAgICAvLyBrZWVwcyBhIHJlZmVyZW5jZSB0byB0aGlzIGNvbXBvbmVudCBldmVuIGFmdGVyIGl0J3MgZGVzdHJveWVkXHJcbiAgICAvLyBhbmQgaXQgYXR0ZW1wdHMgdG8gc2V0IGl0J3MgdmFsdWVcclxuICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmRlYWN0aXZhdGVDb250cm9sKCk7XHJcbiAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5jbGVhcigpO1xyXG4gICAgdGhpcy5tYXAub2wucmVtb3ZlTGF5ZXIodGhpcy5vbE92ZXJsYXlMYXllcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxyXG4gICAqL1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbikge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuICBwcml2YXRlIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuICBwcml2YXRlIG9uVG91Y2hlZDogYW55ID0gKCkgPT4ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXHJcbiAgICovXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogR2VvSlNPTkdlb21ldHJ5KSB7XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYW4gb3ZlcmxheSBsYXllciB0byB0aGUgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbE92ZXJsYXlMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIHRoaXMub2xPdmVybGF5TGF5ZXIgPSBuZXcgT2xWZWN0b3JMYXllcih7XHJcbiAgICAgIHNvdXJjZTogbmV3IE9sVmVjdG9yU291cmNlKCksXHJcbiAgICAgIHpJbmRleDogNTAwLFxyXG4gICAgICBzdHlsZTogbnVsbFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm1hcC5vbC5hZGRMYXllcih0aGlzLm9sT3ZlcmxheUxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIGRyYXcgY29udHJvbCBhbmQgc3Vic2NyaWJlIHRvIGl0J3MgZ2VvbWV0cnlcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZURyYXdDb250cm9sKCkge1xyXG4gICAgdGhpcy5kcmF3Q29udHJvbCA9IG5ldyBEcmF3Q29udHJvbCh7XHJcbiAgICAgIGdlb21ldHJ5VHlwZTogdGhpcy5nZW9tZXRyeVR5cGUgfHwgJ1BvaW50JyxcclxuICAgICAgbGF5ZXI6IHRoaXMub2xPdmVybGF5TGF5ZXIsXHJcbiAgICAgIGRyYXdTdHlsZTogdHlwZW9mIHRoaXMuZHJhd1N0eWxlID09PSAnZnVuY3Rpb24nID8gdGhpcy5kcmF3U3R5bGUgOiAob2xGZWF0dXJlOiBPbEZlYXR1cmUsIHJlc29sdXRpb246IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5kcmF3U3R5bGU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEcmF3U3R5bGVXaXRoRHJhd0d1aWRlKHN0eWxlLCByZXNvbHV0aW9uKTtcclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbW9kaWZ5IGNvbnRyb2wgYW5kIHN1YnNjcmliZSB0byBpdCdzIGdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVNb2RpZnlDb250cm9sKCkge1xyXG4gICAgdGhpcy5tb2RpZnlDb250cm9sID0gbmV3IE1vZGlmeUNvbnRyb2woe1xyXG4gICAgICBsYXllcjogdGhpcy5vbE92ZXJsYXlMYXllcixcclxuICAgICAgZHJhd1N0eWxlOiB0eXBlb2YgdGhpcy5kcmF3U3R5bGUgPT09ICdmdW5jdGlvbicgPyB0aGlzLmRyYXdTdHlsZSA6IChvbEZlYXR1cmU6IE9sRmVhdHVyZSwgcmVzb2x1dGlvbjogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLmRyYXdTdHlsZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZURyYXdTdHlsZVdpdGhEcmF3R3VpZGUoc3R5bGUsIHJlc29sdXRpb24pO1xyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGUgdGhlIHByb3BlciBjb250cm9sIChkcmF3IG9yIG1vZGlmeSlcclxuICAgKi9cclxuICBwcml2YXRlIHRvZ2dsZUNvbnRyb2woKSB7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVDb250cm9sKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmRyYXdDb250cm9sSXNBY3RpdmUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnZhbHVlICYmIHRoaXMuZ2VvbWV0cnlUeXBlKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVDb250cm9sKHRoaXMuZHJhd0NvbnRyb2wpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hY3RpdmF0ZUNvbnRyb2wodGhpcy5tb2RpZnlDb250cm9sKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2YXRlIGEgZ2l2ZW4gY29udHJvbFxyXG4gICAqIEBwYXJhbSBjb250cm9sIENvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIGFjdGl2YXRlQ29udHJvbChjb250cm9sOiBEcmF3Q29udHJvbCB8IE1vZGlmeUNvbnRyb2wpIHtcclxuICAgIHRoaXMuYWN0aXZlQ29udHJvbCA9IGNvbnRyb2w7XHJcbiAgICB0aGlzLm9sR2VvbWV0cnlFbmRzJCQgPSBjb250cm9sLmVuZCRcclxuICAgICAgLnN1YnNjcmliZSgob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkgPT4gdGhpcy5vbk9sR2VvbWV0cnlFbmRzKG9sR2VvbWV0cnkpKTtcclxuICAgIGlmICh0aGlzLm1lYXN1cmUgPT09IHRydWUgJiYgY29udHJvbCA9PT0gdGhpcy5kcmF3Q29udHJvbCkge1xyXG4gICAgICB0aGlzLm9sR2VvbWV0cnlDaGFuZ2VzJCQgPSBjb250cm9sLmNoYW5nZXMkXHJcbiAgICAgICAgLnN1YnNjcmliZSgob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkgPT4gdGhpcy5vbk9sR2VvbWV0cnlDaGFuZ2VzKG9sR2VvbWV0cnkpKTtcclxuICAgIH1cclxuICAgIGNvbnRyb2wuc2V0T2xNYXAodGhpcy5tYXAub2wpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVhY3RpdmF0ZSB0aGUgYWN0aXZlIGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIGRlYWN0aXZhdGVDb250cm9sKCkge1xyXG4gICAgdGhpcy5yZW1vdmVNZWFzdXJlVG9vbHRpcCgpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlQ29udHJvbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlQ29udHJvbC5zZXRPbE1hcCh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub2xHZW9tZXRyeUVuZHMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xHZW9tZXRyeUVuZHMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub2xHZW9tZXRyeUNoYW5nZXMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xHZW9tZXRyeUNoYW5nZXMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY3RpdmVDb250cm9sID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIG1lYXN1cmVzIG9ic2VydmFibGVzIGFuZCBtYXAgdG9vbHRpcHNcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBsaW5lc3RyaW5nIG9yIHBvbHlnb25cclxuICAgKi9cclxuICBwcml2YXRlIG9uT2xHZW9tZXRyeUVuZHMob2xHZW9tZXRyeTogT2xHZW9tZXRyeSB8IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5yZW1vdmVNZWFzdXJlVG9vbHRpcCgpO1xyXG4gICAgdGhpcy5zZXRPbEdlb21ldHJ5KG9sR2VvbWV0cnkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIG1lYXN1cmVzIG9ic2VydmFibGVzIGFuZCBtYXAgdG9vbHRpcHNcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBsaW5lc3RyaW5nIG9yIHBvbHlnb25cclxuICAgKi9cclxuICBwcml2YXRlIG9uT2xHZW9tZXRyeUNoYW5nZXMob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkge1xyXG4gICAgaWYgKG9sR2VvbWV0cnkuZ2V0VHlwZSgpICE9PSAnUG9pbnQnKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlTWVhc3VyZVRvb2x0aXAob2xHZW9tZXRyeSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGRyYXdpbmcgZW5kcywgY29udmVydCB0aGUgb3V0cHV0IHZhbHVlIHRvIEdlb0pTT04gYW5kIGtlZXAgaXQuXHJcbiAgICogUmVzdG9yZSB0aGUgZG91YmxlIGNsaWNrIGludGVyYWN0aW9uLlxyXG4gICAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIGdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRPbEdlb21ldHJ5KG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkgfCB1bmRlZmluZWQpIHtcclxuICAgIGxldCB2YWx1ZTtcclxuICAgIGlmIChvbEdlb21ldHJ5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvbEdlb21ldHJ5LmdldFR5cGUoKSA9PT0gJ0NpcmNsZScpIHsgLy8gQmVjYXVzZSBDaXJjbGUgZG9lc24ndCBleGlzdCBhcyBhIEdlb0pTT04gb2JqZWN0XHJcbiAgICAgIG9sR2VvbWV0cnkgPSB0aGlzLmNpcmNsZVRvUG9pbnQob2xHZW9tZXRyeSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsdWUgPSB0aGlzLm9sR2VvSlNPTi53cml0ZUdlb21ldHJ5T2JqZWN0KG9sR2VvbWV0cnksIHtcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHRoaXMubWFwLnByb2plY3Rpb24sXHJcbiAgICAgIGRhdGFQcm9qZWN0aW9uOiAnRVBTRzo0MzI2J1xyXG4gICAgfSk7XHJcbiAgICBpZiAob2xHZW9tZXRyeS5nZXQoJ3JhZGl1cycpKSB7XHJcbiAgICAgIHZhbHVlLnJhZGl1cyA9IG9sR2VvbWV0cnkuZ2V0KCdyYWRpdXMnKTtcclxuICAgICAgb2xHZW9tZXRyeS5fcmFkaXVzID0gdmFsdWUucmFkaXVzO1xyXG4gICAgfVxyXG4gICAgdGhpcy53cml0ZVZhbHVlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2lyY2xlVG9Qb2ludChvbEdlb21ldHJ5KSB7XHJcbiAgICBjb25zdCBjZW50ZXIgPSBvbEdlb21ldHJ5LmdldENlbnRlcigpO1xyXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBvbHByb2oudHJhbnNmb3JtKGNlbnRlciwgdGhpcy5tYXAucHJvamVjdGlvbiwgJ0VQU0c6NDMyNicpO1xyXG4gICAgY29uc3QgcmFkaXVzID0gTWF0aC5yb3VuZChvbEdlb21ldHJ5LmdldFJhZGl1cygpICogKE1hdGguY29zKChNYXRoLlBJIC8gMTgwKSAqIGNvb3JkaW5hdGVzWzFdKSkpO1xyXG5cclxuICAgIC8vIENvbnZlcnQgaXQgdG8gYSBwb2ludCBvYmplY3RcclxuICAgIG9sR2VvbWV0cnkgPSBuZXcgUG9pbnQoY2VudGVyKTtcclxuICAgIG9sR2VvbWV0cnkuc2V0KCdyYWRpdXMnLCByYWRpdXMsIHRydWUpO1xyXG4gICAgcmV0dXJuIG9sR2VvbWV0cnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBHZW9KU09OIGdlb21ldHJ5IHRvIHRoZSBvdmVybGF5XHJcbiAgICogQHBhcmFtIGdlb21ldHJ5IEdlb0pTT04gZ2VvbWV0cnlcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEdlb0pTT05Ub092ZXJsYXkoZ2VvbWV0cnk6IEdlb0pTT05HZW9tZXRyeSkge1xyXG4gICAgY29uc3Qgb2xHZW9tZXRyeSA9IHRoaXMub2xHZW9KU09OLnJlYWRHZW9tZXRyeShnZW9tZXRyeSwge1xyXG4gICAgICBkYXRhUHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG9sRmVhdHVyZSA9IG5ldyBPbEZlYXR1cmUoe1xyXG4gICAgICBnZW9tZXRyeTogb2xHZW9tZXRyeVxyXG4gICAgfSk7XHJcbiAgICBvbEZlYXR1cmUuc2V0U3R5bGUodGhpcy5vdmVybGF5U3R5bGUpO1xyXG4gICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuY2xlYXIoKTtcclxuICAgIHRoaXMub2xPdmVybGF5U291cmNlLmFkZEZlYXR1cmUob2xGZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0aGUgbWVhc3VyZSB0b29sdGlwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVNZWFzdXJlVG9vbHRpcCgpOiBPbE92ZXJsYXkge1xyXG4gICAgdGhpcy5vbFRvb2x0aXAgPSBuZXcgT2xPdmVybGF5KHtcclxuICAgICAgZWxlbWVudDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIG9mZnNldDogWy0zMCwgLTEwXSxcclxuICAgICAgY2xhc3NOYW1lOiBbXHJcbiAgICAgICAgJ2lnby1tYXAtdG9vbHRpcCcsXHJcbiAgICAgICAgJ2lnby1tYXAtdG9vbHRpcC1tZWFzdXJlJ1xyXG4gICAgICBdLmpvaW4oJyAnKSxcclxuICAgICAgc3RvcEV2ZW50OiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIG1lYXN1cmUgdG9vbHRpcCBvZiBhbiBPTCBnZW9tZXRyeVxyXG4gICAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIEdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVNZWFzdXJlVG9vbHRpcChvbEdlb21ldHJ5OiBPbEdlb21ldHJ5KSB7XHJcbiAgICBjb25zdCBtZWFzdXJlID0gbWVhc3VyZU9sR2VvbWV0cnkob2xHZW9tZXRyeSwgdGhpcy5tYXAucHJvamVjdGlvbik7XHJcbiAgICBjb25zdCBsZW5ndGhzID0gbWVhc3VyZS5sZW5ndGhzO1xyXG4gICAgY29uc3QgbGFzdEluZGV4ID0gb2xHZW9tZXRyeS5nZXRUeXBlKCkgPT09ICdQb2x5Z29uJyA/IGxlbmd0aHMubGVuZ3RoIC0gMiA6IGxlbmd0aHMubGVuZ3RoIC0gMTtcclxuICAgIGNvbnN0IGxhc3RMZW5ndGggPSBsZW5ndGhzW2xhc3RJbmRleF07XHJcblxyXG4gICAgY29uc3Qgb2xNaWRwb2ludHMgPSB1cGRhdGVPbEdlb21ldHJ5TWlkcG9pbnRzKG9sR2VvbWV0cnkpO1xyXG4gICAgY29uc3Qgb2xMYXN0TWlkcG9pbnQgPSBvbE1pZHBvaW50c1tsYXN0SW5kZXhdO1xyXG4gICAgaWYgKG9sTWlkcG9pbnRzLmxlbmd0aCA9PT0gMCB8fCBvbExhc3RNaWRwb2ludCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlTWVhc3VyZVRvb2x0aXAoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xUb29sdGlwLnNldFBvc2l0aW9uKG9sTGFzdE1pZHBvaW50LmZsYXRDb29yZGluYXRlcyk7XHJcblxyXG4gICAgY29uc3QgaW5uZXJIdG1sID0gZm9ybWF0TWVhc3VyZShsYXN0TGVuZ3RoLCB7XHJcbiAgICAgIGRlY2ltYWw6IDEsXHJcbiAgICAgIHVuaXQ6IE1lYXN1cmVMZW5ndGhVbml0Lk1ldGVycyxcclxuICAgICAgdW5pdEFiYnI6IHRydWUsXHJcbiAgICAgIGxvY2FsZTogJ2ZyJ1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9sVG9vbHRpcC5nZXRFbGVtZW50KCkuaW5uZXJIVE1MID0gaW5uZXJIdG1sO1xyXG4gICAgaWYgKHRoaXMub2xUb29sdGlwLmdldE1hcCgpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXAub2wuYWRkT3ZlcmxheSh0aGlzLm9sVG9vbHRpcCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIG1lYXN1cmUgdG9vbHRpcCBmcm9tIHRoZSBtYXBcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU1lYXN1cmVUb29sdGlwKCkge1xyXG4gICAgaWYgKHRoaXMub2xUb29sdGlwLmdldE1hcCAmJiB0aGlzLm9sVG9vbHRpcC5nZXRNYXAoKSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWFwLm9sLnJlbW92ZU92ZXJsYXkodGhpcy5vbFRvb2x0aXApO1xyXG4gICAgICB0aGlzLm9sVG9vbHRpcC5zZXRNYXAodW5kZWZpbmVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkanVzdCB0aGUgZHJhdyBzdHlsZSB3aXRoIHRoZSBzcGVjaWZpZWQgZHJhdyBndWlkZSBkaXN0YW5jZSwgaWYgcG9zc2libGVcclxuICAgKiBAcGFyYW0gb2xTdHlsZSBEcmF3IHN0eWxlIHRvIHVwZGF0ZVxyXG4gICAqIEBwYXJhbSByZXNvbHV0aW9uIFJlc29sdXRpb24gKHRvIG1ha2UgdGhlIHNjcmVlbiBzaXplIG9mIHN5bWJvbCBmaXQgdGhlIGRyYXdHdWlkZSB2YWx1ZSlcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZURyYXdTdHlsZVdpdGhEcmF3R3VpZGUob2xTdHlsZTogT2xTdHlsZSwgcmVzb2x1dGlvbjogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5pc1N0eWxlV2l0aFJhZGl1cyhvbFN0eWxlKSkge1xyXG4gICAgICBjb25zdCBkcmF3R3VpZGUgPSB0aGlzLmRyYXdHdWlkZTtcclxuICAgICAgbGV0IHJhZGl1cztcclxuICAgICAgaWYgKCFkcmF3R3VpZGUgfHwgZHJhd0d1aWRlIDwgMCkge1xyXG4gICAgICAgIHJhZGl1cyA9IHRoaXMuZGVmYXVsdERyYXdTdHlsZVJhZGl1cztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByYWRpdXMgPSBkcmF3R3VpZGUgPiAwID8gZHJhd0d1aWRlIC8gcmVzb2x1dGlvbiA6IGRyYXdHdWlkZTtcclxuICAgICAgfVxyXG4gICAgICBvbFN0eWxlLmdldEltYWdlKCkuc2V0UmFkaXVzKHJhZGl1cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHdldGhlciBhIGdpdmVuIE9wZW4gTGF5ZXJzIHN0eWxlIGhhcyBhIHJhZGl1cyBwcm9wZXJ0eSB0aGF0IGNhbiBiZSBzZXQgKHVzZWQgdG8gc2V0IGRyYXcgZ3VpZGUpXHJcbiAgICogQHBhcmFtIG9sU3R5bGUgVGhlIHN0eWxlIG9uIHdoaWNoIHRvIHBlcmZvcm0gdGhlIGNoZWNrXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpc1N0eWxlV2l0aFJhZGl1cyhvbFN0eWxlOiBPbFN0eWxlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHlwZW9mIG9sU3R5bGUgIT09ICdmdW5jdGlvbicgJiYgb2xTdHlsZS5nZXRJbWFnZSAmJiBvbFN0eWxlLmdldEltYWdlKCkuc2V0UmFkaXVzO1xyXG4gIH1cclxufVxyXG4iXX0=