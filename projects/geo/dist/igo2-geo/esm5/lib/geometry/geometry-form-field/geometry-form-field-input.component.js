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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktZm9ybS1maWVsZC1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvZ2VvbWV0cnktZm9ybS1maWVsZC9nZW9tZXRyeS1mb3JtLWZpZWxkLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsUUFBUSxFQUNSLElBQUksRUFDSixpQkFBaUIsRUFDakIsdUJBQXVCLEVBR3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFJakUsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFFMUMsT0FBTyxjQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUVuQyxPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEtBQUssTUFBTSxlQUFlLENBQUM7QUFFbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHlCQUF5QixFQUN6QixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7QUFTdEU7SUEwTEUseUNBQ1UsS0FBd0IsRUFDTCxTQUFv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QUs7dUNBbUJMLEtBQUs7NEJBeUJMLEtBQUs7K0JBeUJMLEtBQUs7d0JBU0wsS0FBSzt5QkEyQkwsS0FBSzs7SUF1VlIsc0NBQUM7Q0FBQSxBQTVmRCxJQTRmQztTQXZmWSwrQkFBK0I7Ozs7OztJQUUxQyx5REFBc0M7Ozs7O0lBQ3RDLG9EQUFvQzs7Ozs7SUFDcEMsZ0RBQXNCOzs7OztJQUV0QixzREFBaUM7Ozs7O0lBQ2pDLHdEQUFxQzs7Ozs7SUFDckMsaUVBQXVDOzs7OztJQUN2QywyREFBdUM7Ozs7O0lBQ3ZDLDhEQUEwQzs7Ozs7SUFDMUMsb0RBQThCOzs7Ozs7SUFNOUIsd0RBQWtEOzs7OztJQUtsRCw4Q0FBcUI7Ozs7O0lBa0JyQix3REFBc0M7Ozs7O0lBS3RDLG9EQUFrQzs7Ozs7SUFLbEMsa0RBQWtDOzs7OztJQW1CbEMsK0RBQXNDOzs7OztJQXlCdEMsZ0VBQXVDOzs7OztJQXdCdkMscURBQTRCOzs7OztJQVM1Qix3REFBK0I7Ozs7O0lBdUIvQixpREFBZ0M7Ozs7O0lBNEZoQyxtREFBaUM7Ozs7O0lBU2pDLG9EQUFrQzs7Ozs7SUFyRWhDLGdEQUFnQzs7SUFDaEMsb0RBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2xNb2RpZnkgfSBmcm9tICdvbC9pbnRlcmFjdGlvbi9Nb2RpZnknO1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9wdGlvbmFsLFxyXG4gIFNlbGYsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ0NvbnRyb2wsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBPbFN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IE9sR2VvSlNPTiBmcm9tICdvbC9mb3JtYXQvR2VvSlNPTic7XHJcbmltcG9ydCBPbEdlb21ldHJ5IGZyb20gJ29sL2dlb20vR2VvbWV0cnknO1xyXG5pbXBvcnQgT2xHZW9tZXRyeVR5cGUgZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeVR5cGUnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgT2xWZWN0b3JTb3VyY2UgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCBPbFZlY3RvckxheWVyIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XHJcbmltcG9ydCBPbE92ZXJsYXkgZnJvbSAnb2wvT3ZlcmxheSc7XHJcbmltcG9ydCAqIGFzIHBvbHkgZnJvbSAnb2wvZ2VvbS9Qb2x5Z29uJztcclxuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQge1xyXG4gIE1lYXN1cmVMZW5ndGhVbml0LFxyXG4gIHVwZGF0ZU9sR2VvbWV0cnlNaWRwb2ludHMsXHJcbiAgZm9ybWF0TWVhc3VyZSxcclxuICBtZWFzdXJlT2xHZW9tZXRyeVxyXG59IGZyb20gJy4uLy4uL21lYXN1cmUnO1xyXG5pbXBvcnQgeyBEcmF3Q29udHJvbCwgTW9kaWZ5Q29udHJvbCB9IGZyb20gJy4uL3NoYXJlZC9jb250cm9scyc7XHJcbmltcG9ydCB7IGNyZWF0ZURyYXdJbnRlcmFjdGlvblN0eWxlIH0gZnJvbSAnLi4vc2hhcmVkL2dlb21ldHJ5LnV0aWxzJztcclxuaW1wb3J0IHsgR2VvSlNPTkdlb21ldHJ5IH0gZnJvbSAnLi4vc2hhcmVkL2dlb21ldHJ5LmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaW5wdXQgYWxsb3dzIGEgdXNlciB0byBkcmF3IGEgbmV3IGdlb21ldHJ5IG9yIHRvIGVkaXRcclxuICogYW4gZXhpc3Rpbmcgb25lIG9uIGEgbWFwLiBBIHRleHQgaW5wdXQgaXMgYWxzbyBkaXNwbGF5ZWQgaW4gdGhlXHJcbiAqIGZvcm0gd2l0aCBzb21lIGluc3RydWN0aW9ucy5cclxuICogVGhpcyBpcyBzdGlsbCBXSVAuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1nZW9tZXRyeS1mb3JtLWZpZWxkLWlucHV0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZ2VvbWV0cnktZm9ybS1maWVsZC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEdlb21ldHJ5Rm9ybUZpZWxkSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICBwcml2YXRlIG9sT3ZlcmxheUxheWVyOiBPbFZlY3RvckxheWVyO1xyXG4gIHByaXZhdGUgb2xHZW9KU09OID0gbmV3IE9sR2VvSlNPTigpO1xyXG4gIHByaXZhdGUgcmVhZHkgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBkcmF3Q29udHJvbDogRHJhd0NvbnRyb2w7XHJcbiAgcHJpdmF0ZSBtb2RpZnlDb250cm9sOiBNb2RpZnlDb250cm9sO1xyXG4gIHByaXZhdGUgZGVmYXVsdERyYXdTdHlsZVJhZGl1czogbnVtYmVyO1xyXG4gIHByaXZhdGUgb2xHZW9tZXRyeUVuZHMkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgb2xHZW9tZXRyeUNoYW5nZXMkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgb2xUb29sdGlwID0gT2xPdmVybGF5O1xyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmUgY29udHJvbFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBhY3RpdmVDb250cm9sOiBEcmF3Q29udHJvbCB8IE1vZGlmeUNvbnRyb2w7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXAgdG8gZHJhdyB0aGUgZ2VvbWV0cnkgb25cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGdlb21ldHJ5IHR5cGVcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBnZW9tZXRyeVR5cGUodmFsdWU6IE9sR2VvbWV0cnlUeXBlKSB7XHJcbiAgICB0aGlzLl9nZW9tZXRyeVR5cGUgPSB2YWx1ZTtcclxuICAgIGlmICh0aGlzLnJlYWR5ID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kZWFjdGl2YXRlQ29udHJvbCgpO1xyXG4gICAgdGhpcy5jcmVhdGVEcmF3Q29udHJvbCgpO1xyXG4gICAgdGhpcy5kcmF3Q29udHJvbC5mcmVlaGFuZCQubmV4dCh0aGlzLmZyZWVoYW5kRHJhd0lzQWN0aXZlKTtcclxuICAgIHRoaXMudG9nZ2xlQ29udHJvbCgpO1xyXG4gIH1cclxuICBnZXQgZ2VvbWV0cnlUeXBlKCk6IE9sR2VvbWV0cnlUeXBlIHsgcmV0dXJuIHRoaXMuX2dlb21ldHJ5VHlwZTsgfVxyXG4gIHByaXZhdGUgX2dlb21ldHJ5VHlwZTogT2xHZW9tZXRyeVR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkcmF3R3VpZGUgYXJvdW5kIHRoZSBtb3VzZSBwb2ludGVyIHRvIGhlbHAgZHJhd2luZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRyYXdHdWlkZTogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIG1lYXN1cmUgdG9vbHRpcCBzaG91bGQgYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWVhc3VyZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGRyYXcgY29udHJvbCBzaG91bGQgYmUgYWN0aXZlIG9yIG5vdFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRyYXdDb250cm9sSXNBY3RpdmUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kcmF3Q29udHJvbElzQWN0aXZlOyB9XHJcbiAgc2V0IGRyYXdDb250cm9sSXNBY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2RyYXdDb250cm9sSXNBY3RpdmUgPSB2YWx1ZTtcclxuICAgIGlmICh0aGlzLnJlYWR5ID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVDb250cm9sKCk7XHJcbiAgICBpZiAoIXRoaXMuX2RyYXdDb250cm9sSXNBY3RpdmUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50b2dnbGVDb250cm9sKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX2RyYXdDb250cm9sSXNBY3RpdmU6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgZnJlZWhhbmQgZHJhdyBjb250cm9sIHNob3VsZCBiZSBhY3RpdmUgb3Igbm90XHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBnZXQgZnJlZWhhbmREcmF3SXNBY3RpdmUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9mcmVlaGFuZERyYXdJc0FjdGl2ZTsgfVxyXG4gIHNldCBmcmVlaGFuZERyYXdJc0FjdGl2ZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZnJlZWhhbmREcmF3SXNBY3RpdmUgPSB2YWx1ZTtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZUNvbnRyb2woKTtcclxuXHJcbiAgICB0aGlzLmNyZWF0ZURyYXdDb250cm9sKCk7XHJcbiAgICB0aGlzLmNyZWF0ZU1vZGlmeUNvbnRyb2woKTtcclxuXHJcbiAgICB0aGlzLmRyYXdDb250cm9sLmZyZWVoYW5kJC5uZXh0KHRoaXMuZnJlZWhhbmREcmF3SXNBY3RpdmUpO1xyXG5cclxuICAgIGlmICh0aGlzLnJlYWR5ID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmRyYXdDb250cm9sSXNBY3RpdmUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy50b2dnbGVDb250cm9sKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2ZyZWVoYW5kRHJhd0lzQWN0aXZlOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBTdHlsZSBmb3IgdGhlIGRyYXcgY29udHJvbCAoYXBwbGllcyB3aGlsZSB0aGUgZ2VvbWV0cnkgaXMgYmVpbmcgZHJhd24pXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgZHJhd1N0eWxlKHZhbHVlOiBPbFN0eWxlKSB7XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB2YWx1ZSA9IGNyZWF0ZURyYXdJbnRlcmFjdGlvblN0eWxlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9kcmF3U3R5bGUgPSB2YWx1ZTtcclxuICAgIGlmICh2YWx1ZSAmJiB0aGlzLmlzU3R5bGVXaXRoUmFkaXVzKHZhbHVlKSkge1xyXG4gICAgICB0aGlzLmRlZmF1bHREcmF3U3R5bGVSYWRpdXMgPSB2YWx1ZS5nZXRJbWFnZSgpLmdldFJhZGl1cygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kZWZhdWx0RHJhd1N0eWxlUmFkaXVzID0gbnVsbDtcclxuICAgIH1cclxuICAgIHRoaXMuZGVhY3RpdmF0ZUNvbnRyb2woKTtcclxuICAgIHRoaXMuY3JlYXRlRHJhd0NvbnRyb2woKTtcclxuICAgIHRoaXMuY3JlYXRlTW9kaWZ5Q29udHJvbCgpO1xyXG5cclxuICAgIHRoaXMuZHJhd0NvbnRyb2wuZnJlZWhhbmQkLm5leHQodGhpcy5mcmVlaGFuZERyYXdJc0FjdGl2ZSk7XHJcbiAgICB0aGlzLnRvZ2dsZUNvbnRyb2woKTtcclxuICB9XHJcbiAgZ2V0IGRyYXdTdHlsZSgpOiBPbFN0eWxlIHsgcmV0dXJuIHRoaXMuX2RyYXdTdHlsZTsgfVxyXG4gIHByaXZhdGUgX2RyYXdTdHlsZTogT2xTdHlsZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3R5bGUgZm9yIHRoZSBvdmVybGF5IGxheWVyIChhcHBsaWVzIG9uY2UgdGhlIGdlb21ldHJ5IGlzIGFkZGVkIHRvIHRoZSBtYXApXHJcbiAgICogSWYgbm90IHNwZWNpZmllZCwgZHJhd1N0eWxlIGFwcGxpZXNcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBvdmVybGF5U3R5bGUodmFsdWU6IE9sU3R5bGUpIHsgdGhpcy5fb3ZlcmxheVN0eWxlID0gdmFsdWU7IH1cclxuICBnZXQgb3ZlcmxheVN0eWxlKCk6IE9sU3R5bGUgeyByZXR1cm4gdGhpcy5fb3ZlcmxheVN0eWxlOyB9XHJcbiAgcHJpdmF0ZSBfb3ZlcmxheVN0eWxlOiBPbFN0eWxlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZ2VvbWV0cnkgdmFsdWUgKEdlb0pTT04pXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCB2YWx1ZSh2YWx1ZTogR2VvSlNPTkdlb21ldHJ5KSB7XHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgaWYgKHRoaXMucmVhZHkgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5hZGRHZW9KU09OVG9PdmVybGF5KHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5U291cmNlLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcclxuICAgIHRoaXMudG9nZ2xlQ29udHJvbCgpO1xyXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG4gIGdldCB2YWx1ZSgpOiBHZW9KU09OR2VvbWV0cnkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cclxuICBwcml2YXRlIF92YWx1ZTogR2VvSlNPTkdlb21ldHJ5O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdmVjdG9yIHNvdXJjZSB0byBhZGQgdGhlIGdlb21ldHJ5IHRvXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG9sT3ZlcmxheVNvdXJjZSgpOiBPbFZlY3RvclNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE92ZXJsYXlMYXllci5nZXRTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHJhZGl1cyh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodGhpcy5yZWFkeSA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubW9kaWZ5Q29udHJvbC5nZXRTb3VyY2UoKSkge1xyXG4gICAgICB0aGlzLm1vZGlmeUNvbnRyb2wuZ2V0U291cmNlKCkucmVmcmVzaCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZnJlZWhhbmREcmF3SXNBY3RpdmUpIHtcclxuICAgICAgbGV0IG9sTW9kaWZ5O1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBvbE1vZGlmeSA9IHRoaXMubW9kaWZ5Q29udHJvbC5vbE1vZGlmeUludGVyYWN0aW9uO1xyXG4gICAgICAgIGlmIChvbE1vZGlmeSkge1xyXG4gICAgICAgICAgaWYgKG9sTW9kaWZ5LmZlYXR1cmVzXykge1xyXG4gICAgICAgICAgICBvbE1vZGlmeS5mZWF0dXJlc18uY2xlYXIoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sXHJcbiAgKSB7XHJcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyBTZXR0aW5nIHRoZSB2YWx1ZSBhY2Nlc3NvciBkaXJlY3RseSAoaW5zdGVhZCBvZiB1c2luZ1xyXG4gICAgICAvLyB0aGUgcHJvdmlkZXJzKSB0byBhdm9pZCBydW5uaW5nIGludG8gYSBjaXJjdWxhciBpbXBvcnQuXHJcbiAgICAgIHRoaXMubmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGFuIG92ZXJsYXkgbGF5ZXIsIGFkZCB0aGUgaW5pdGlhbCBnZW9tZXRyeSB0byBpdCAoaWYgYW55KVxyXG4gICAqIGFuZCB0b2dnbGUgdGhlIHJpZ2h0IGludGVyYWN0aW9uLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuZHJhd1N0eWxlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5kcmF3U3R5bGUgPSBjcmVhdGVEcmF3SW50ZXJhY3Rpb25TdHlsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm92ZXJsYXlTdHlsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub3ZlcmxheVN0eWxlID0gdGhpcy5kcmF3U3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hZGRPbE92ZXJsYXlMYXllcigpO1xyXG4gICAgdGhpcy5jcmVhdGVNZWFzdXJlVG9vbHRpcCgpO1xyXG4gICAgdGhpcy5jcmVhdGVEcmF3Q29udHJvbCgpO1xyXG4gICAgdGhpcy5jcmVhdGVNb2RpZnlDb250cm9sKCk7XHJcblxyXG4gICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgdGhpcy5hZGRHZW9KU09OVG9PdmVybGF5KHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy50b2dnbGVDb250cm9sKCk7XHJcblxyXG4gICAgdGhpcy5yZWFkeSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgb3ZlcmxheSBsYXllciBhbmQgYW55IGludGVyYWN0aW9uIGFkZGVkIGJ5IHRoaXMgY29tcG9uZW50LlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgLy8gVGhpcyBpcyBtYW5kYXRvcnkgd2hlbiB0aGUgZm9ybSBjb250cm9sIGlzIHJldXNlZCBhZnRlclxyXG4gICAgLy8gdGhpcyBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiBJdCBzZWVtcyBsaWtlIHRoZSBjb250cm9sXHJcbiAgICAvLyBrZWVwcyBhIHJlZmVyZW5jZSB0byB0aGlzIGNvbXBvbmVudCBldmVuIGFmdGVyIGl0J3MgZGVzdHJveWVkXHJcbiAgICAvLyBhbmQgaXQgYXR0ZW1wdHMgdG8gc2V0IGl0J3MgdmFsdWVcclxuICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmRlYWN0aXZhdGVDb250cm9sKCk7XHJcbiAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5jbGVhcigpO1xyXG4gICAgdGhpcy5tYXAub2wucmVtb3ZlTGF5ZXIodGhpcy5vbE92ZXJsYXlMYXllcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxyXG4gICAqL1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbikge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuICBwcml2YXRlIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuICBwcml2YXRlIG9uVG91Y2hlZDogYW55ID0gKCkgPT4ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXHJcbiAgICovXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogR2VvSlNPTkdlb21ldHJ5KSB7XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYW4gb3ZlcmxheSBsYXllciB0byB0aGUgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRPbE92ZXJsYXlMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIHRoaXMub2xPdmVybGF5TGF5ZXIgPSBuZXcgT2xWZWN0b3JMYXllcih7XHJcbiAgICAgIHNvdXJjZTogbmV3IE9sVmVjdG9yU291cmNlKCksXHJcbiAgICAgIHpJbmRleDogNTAwLFxyXG4gICAgICBzdHlsZTogbnVsbFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm1hcC5vbC5hZGRMYXllcih0aGlzLm9sT3ZlcmxheUxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIGRyYXcgY29udHJvbCBhbmQgc3Vic2NyaWJlIHRvIGl0J3MgZ2VvbWV0cnlcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZURyYXdDb250cm9sKCkge1xyXG4gICAgdGhpcy5kcmF3Q29udHJvbCA9IG5ldyBEcmF3Q29udHJvbCh7XHJcbiAgICAgIGdlb21ldHJ5VHlwZTogdGhpcy5nZW9tZXRyeVR5cGUgfHwgJ1BvaW50JyxcclxuICAgICAgbGF5ZXI6IHRoaXMub2xPdmVybGF5TGF5ZXIsXHJcbiAgICAgIGRyYXdTdHlsZTogdHlwZW9mIHRoaXMuZHJhd1N0eWxlID09PSAnZnVuY3Rpb24nID8gdGhpcy5kcmF3U3R5bGUgOiAob2xGZWF0dXJlOiBPbEZlYXR1cmUsIHJlc29sdXRpb246IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5kcmF3U3R5bGU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEcmF3U3R5bGVXaXRoRHJhd0d1aWRlKHN0eWxlLCByZXNvbHV0aW9uKTtcclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbW9kaWZ5IGNvbnRyb2wgYW5kIHN1YnNjcmliZSB0byBpdCdzIGdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVNb2RpZnlDb250cm9sKCkge1xyXG4gICAgdGhpcy5tb2RpZnlDb250cm9sID0gbmV3IE1vZGlmeUNvbnRyb2woe1xyXG4gICAgICBsYXllcjogdGhpcy5vbE92ZXJsYXlMYXllcixcclxuICAgICAgZHJhd1N0eWxlOiB0eXBlb2YgdGhpcy5kcmF3U3R5bGUgPT09ICdmdW5jdGlvbicgPyB0aGlzLmRyYXdTdHlsZSA6IChvbEZlYXR1cmU6IE9sRmVhdHVyZSwgcmVzb2x1dGlvbjogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLmRyYXdTdHlsZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZURyYXdTdHlsZVdpdGhEcmF3R3VpZGUoc3R5bGUsIHJlc29sdXRpb24pO1xyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGUgdGhlIHByb3BlciBjb250cm9sIChkcmF3IG9yIG1vZGlmeSlcclxuICAgKi9cclxuICBwcml2YXRlIHRvZ2dsZUNvbnRyb2woKSB7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVDb250cm9sKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmRyYXdDb250cm9sSXNBY3RpdmUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnZhbHVlICYmIHRoaXMuZ2VvbWV0cnlUeXBlKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVDb250cm9sKHRoaXMuZHJhd0NvbnRyb2wpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hY3RpdmF0ZUNvbnRyb2wodGhpcy5tb2RpZnlDb250cm9sKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2YXRlIGEgZ2l2ZW4gY29udHJvbFxyXG4gICAqIEBwYXJhbSBjb250cm9sIENvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIGFjdGl2YXRlQ29udHJvbChjb250cm9sOiBEcmF3Q29udHJvbCB8IE1vZGlmeUNvbnRyb2wpIHtcclxuICAgIHRoaXMuYWN0aXZlQ29udHJvbCA9IGNvbnRyb2w7XHJcbiAgICB0aGlzLm9sR2VvbWV0cnlFbmRzJCQgPSBjb250cm9sLmVuZCRcclxuICAgICAgLnN1YnNjcmliZSgob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkgPT4gdGhpcy5vbk9sR2VvbWV0cnlFbmRzKG9sR2VvbWV0cnkpKTtcclxuICAgIGlmICh0aGlzLm1lYXN1cmUgPT09IHRydWUgJiYgY29udHJvbCA9PT0gdGhpcy5kcmF3Q29udHJvbCkge1xyXG4gICAgICB0aGlzLm9sR2VvbWV0cnlDaGFuZ2VzJCQgPSBjb250cm9sLmNoYW5nZXMkXHJcbiAgICAgICAgLnN1YnNjcmliZSgob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkgPT4gdGhpcy5vbk9sR2VvbWV0cnlDaGFuZ2VzKG9sR2VvbWV0cnkpKTtcclxuICAgIH1cclxuICAgIGNvbnRyb2wuc2V0T2xNYXAodGhpcy5tYXAub2wpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVhY3RpdmF0ZSB0aGUgYWN0aXZlIGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIGRlYWN0aXZhdGVDb250cm9sKCkge1xyXG4gICAgdGhpcy5yZW1vdmVNZWFzdXJlVG9vbHRpcCgpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlQ29udHJvbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlQ29udHJvbC5zZXRPbE1hcCh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub2xHZW9tZXRyeUVuZHMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xHZW9tZXRyeUVuZHMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub2xHZW9tZXRyeUNoYW5nZXMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xHZW9tZXRyeUNoYW5nZXMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY3RpdmVDb250cm9sID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIG1lYXN1cmVzIG9ic2VydmFibGVzIGFuZCBtYXAgdG9vbHRpcHNcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBsaW5lc3RyaW5nIG9yIHBvbHlnb25cclxuICAgKi9cclxuICBwcml2YXRlIG9uT2xHZW9tZXRyeUVuZHMob2xHZW9tZXRyeTogT2xHZW9tZXRyeSB8IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5yZW1vdmVNZWFzdXJlVG9vbHRpcCgpO1xyXG4gICAgdGhpcy5zZXRPbEdlb21ldHJ5KG9sR2VvbWV0cnkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIG1lYXN1cmVzIG9ic2VydmFibGVzIGFuZCBtYXAgdG9vbHRpcHNcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBsaW5lc3RyaW5nIG9yIHBvbHlnb25cclxuICAgKi9cclxuICBwcml2YXRlIG9uT2xHZW9tZXRyeUNoYW5nZXMob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkge1xyXG4gICAgaWYgKG9sR2VvbWV0cnkuZ2V0VHlwZSgpICE9PSAnUG9pbnQnKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlTWVhc3VyZVRvb2x0aXAob2xHZW9tZXRyeSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGRyYXdpbmcgZW5kcywgY29udmVydCB0aGUgb3V0cHV0IHZhbHVlIHRvIEdlb0pTT04gYW5kIGtlZXAgaXQuXHJcbiAgICogUmVzdG9yZSB0aGUgZG91YmxlIGNsaWNrIGludGVyYWN0aW9uLlxyXG4gICAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIGdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRPbEdlb21ldHJ5KG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkgfCB1bmRlZmluZWQpIHtcclxuICAgIGxldCB2YWx1ZTtcclxuICAgIGlmIChvbEdlb21ldHJ5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvbEdlb21ldHJ5LmdldFR5cGUoKSA9PT0gJ0NpcmNsZScpIHsgLy8gQmVjYXVzZSBDaXJjbGUgZG9lc24ndCBleGlzdCBhcyBhIEdlb0pTT04gb2JqZWN0XHJcbiAgICAgIG9sR2VvbWV0cnkgPSB0aGlzLmNpcmNsZVRvUG9pbnQob2xHZW9tZXRyeSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsdWUgPSB0aGlzLm9sR2VvSlNPTi53cml0ZUdlb21ldHJ5T2JqZWN0KG9sR2VvbWV0cnksIHtcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHRoaXMubWFwLnByb2plY3Rpb24sXHJcbiAgICAgIGRhdGFQcm9qZWN0aW9uOiAnRVBTRzo0MzI2J1xyXG4gICAgfSk7XHJcbiAgICBpZiAob2xHZW9tZXRyeS5nZXQoJ3JhZGl1cycpKSB7XHJcbiAgICAgIHZhbHVlLnJhZGl1cyA9IG9sR2VvbWV0cnkuZ2V0KCdyYWRpdXMnKTtcclxuICAgICAgb2xHZW9tZXRyeS5fcmFkaXVzID0gdmFsdWUucmFkaXVzO1xyXG4gICAgfVxyXG4gICAgdGhpcy53cml0ZVZhbHVlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2lyY2xlVG9Qb2ludChvbEdlb21ldHJ5KSB7XHJcbiAgICBjb25zdCBjZW50ZXIgPSBvbEdlb21ldHJ5LmdldENlbnRlcigpO1xyXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBvbHByb2oudHJhbnNmb3JtKGNlbnRlciwgdGhpcy5tYXAucHJvamVjdGlvbiwgJ0VQU0c6NDMyNicpO1xyXG4gICAgY29uc3QgcmFkaXVzID0gTWF0aC5yb3VuZChvbEdlb21ldHJ5LmdldFJhZGl1cygpICogKE1hdGguY29zKChNYXRoLlBJIC8gMTgwKSAqIGNvb3JkaW5hdGVzWzFdKSkpO1xyXG5cclxuICAgIC8vIENvbnZlcnQgaXQgdG8gYSBwb2ludCBvYmplY3RcclxuICAgIG9sR2VvbWV0cnkgPSBuZXcgUG9pbnQoY2VudGVyKTtcclxuICAgIG9sR2VvbWV0cnkuc2V0KCdyYWRpdXMnLCByYWRpdXMsIHRydWUpO1xyXG4gICAgcmV0dXJuIG9sR2VvbWV0cnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBHZW9KU09OIGdlb21ldHJ5IHRvIHRoZSBvdmVybGF5XHJcbiAgICogQHBhcmFtIGdlb21ldHJ5IEdlb0pTT04gZ2VvbWV0cnlcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEdlb0pTT05Ub092ZXJsYXkoZ2VvbWV0cnk6IEdlb0pTT05HZW9tZXRyeSkge1xyXG4gICAgY29uc3Qgb2xHZW9tZXRyeSA9IHRoaXMub2xHZW9KU09OLnJlYWRHZW9tZXRyeShnZW9tZXRyeSwge1xyXG4gICAgICBkYXRhUHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG9sRmVhdHVyZSA9IG5ldyBPbEZlYXR1cmUoe1xyXG4gICAgICBnZW9tZXRyeTogb2xHZW9tZXRyeVxyXG4gICAgfSk7XHJcbiAgICBvbEZlYXR1cmUuc2V0U3R5bGUodGhpcy5vdmVybGF5U3R5bGUpO1xyXG4gICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuY2xlYXIoKTtcclxuICAgIHRoaXMub2xPdmVybGF5U291cmNlLmFkZEZlYXR1cmUob2xGZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0aGUgbWVhc3VyZSB0b29sdGlwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVNZWFzdXJlVG9vbHRpcCgpOiBPbE92ZXJsYXkge1xyXG4gICAgdGhpcy5vbFRvb2x0aXAgPSBuZXcgT2xPdmVybGF5KHtcclxuICAgICAgZWxlbWVudDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIG9mZnNldDogWy0zMCwgLTEwXSxcclxuICAgICAgY2xhc3NOYW1lOiBbXHJcbiAgICAgICAgJ2lnby1tYXAtdG9vbHRpcCcsXHJcbiAgICAgICAgJ2lnby1tYXAtdG9vbHRpcC1tZWFzdXJlJ1xyXG4gICAgICBdLmpvaW4oJyAnKSxcclxuICAgICAgc3RvcEV2ZW50OiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIG1lYXN1cmUgdG9vbHRpcCBvZiBhbiBPTCBnZW9tZXRyeVxyXG4gICAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIEdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVNZWFzdXJlVG9vbHRpcChvbEdlb21ldHJ5OiBPbEdlb21ldHJ5KSB7XHJcbiAgICBjb25zdCBtZWFzdXJlID0gbWVhc3VyZU9sR2VvbWV0cnkob2xHZW9tZXRyeSwgdGhpcy5tYXAucHJvamVjdGlvbik7XHJcbiAgICBjb25zdCBsZW5ndGhzID0gbWVhc3VyZS5sZW5ndGhzO1xyXG4gICAgY29uc3QgbGFzdEluZGV4ID0gb2xHZW9tZXRyeS5nZXRUeXBlKCkgPT09ICdQb2x5Z29uJyA/IGxlbmd0aHMubGVuZ3RoIC0gMiA6IGxlbmd0aHMubGVuZ3RoIC0gMTtcclxuICAgIGNvbnN0IGxhc3RMZW5ndGggPSBsZW5ndGhzW2xhc3RJbmRleF07XHJcblxyXG4gICAgY29uc3Qgb2xNaWRwb2ludHMgPSB1cGRhdGVPbEdlb21ldHJ5TWlkcG9pbnRzKG9sR2VvbWV0cnkpO1xyXG4gICAgY29uc3Qgb2xMYXN0TWlkcG9pbnQgPSBvbE1pZHBvaW50c1tsYXN0SW5kZXhdO1xyXG4gICAgaWYgKG9sTWlkcG9pbnRzLmxlbmd0aCA9PT0gMCB8fCBvbExhc3RNaWRwb2ludCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlTWVhc3VyZVRvb2x0aXAoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xUb29sdGlwLnNldFBvc2l0aW9uKG9sTGFzdE1pZHBvaW50LmZsYXRDb29yZGluYXRlcyk7XHJcblxyXG4gICAgY29uc3QgaW5uZXJIdG1sID0gZm9ybWF0TWVhc3VyZShsYXN0TGVuZ3RoLCB7XHJcbiAgICAgIGRlY2ltYWw6IDEsXHJcbiAgICAgIHVuaXQ6IE1lYXN1cmVMZW5ndGhVbml0Lk1ldGVycyxcclxuICAgICAgdW5pdEFiYnI6IHRydWUsXHJcbiAgICAgIGxvY2FsZTogJ2ZyJ1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9sVG9vbHRpcC5nZXRFbGVtZW50KCkuaW5uZXJIVE1MID0gaW5uZXJIdG1sO1xyXG4gICAgaWYgKHRoaXMub2xUb29sdGlwLmdldE1hcCgpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXAub2wuYWRkT3ZlcmxheSh0aGlzLm9sVG9vbHRpcCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIG1lYXN1cmUgdG9vbHRpcCBmcm9tIHRoZSBtYXBcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU1lYXN1cmVUb29sdGlwKCkge1xyXG4gICAgaWYgKHRoaXMub2xUb29sdGlwLmdldE1hcCAmJiB0aGlzLm9sVG9vbHRpcC5nZXRNYXAoKSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWFwLm9sLnJlbW92ZU92ZXJsYXkodGhpcy5vbFRvb2x0aXApO1xyXG4gICAgICB0aGlzLm9sVG9vbHRpcC5zZXRNYXAodW5kZWZpbmVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkanVzdCB0aGUgZHJhdyBzdHlsZSB3aXRoIHRoZSBzcGVjaWZpZWQgZHJhdyBndWlkZSBkaXN0YW5jZSwgaWYgcG9zc2libGVcclxuICAgKiBAcGFyYW0gb2xTdHlsZSBEcmF3IHN0eWxlIHRvIHVwZGF0ZVxyXG4gICAqIEBwYXJhbSByZXNvbHV0aW9uIFJlc29sdXRpb24gKHRvIG1ha2UgdGhlIHNjcmVlbiBzaXplIG9mIHN5bWJvbCBmaXQgdGhlIGRyYXdHdWlkZSB2YWx1ZSlcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZURyYXdTdHlsZVdpdGhEcmF3R3VpZGUob2xTdHlsZTogT2xTdHlsZSwgcmVzb2x1dGlvbjogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5pc1N0eWxlV2l0aFJhZGl1cyhvbFN0eWxlKSkge1xyXG4gICAgICBjb25zdCBkcmF3R3VpZGUgPSB0aGlzLmRyYXdHdWlkZTtcclxuICAgICAgbGV0IHJhZGl1cztcclxuICAgICAgaWYgKCFkcmF3R3VpZGUgfHwgZHJhd0d1aWRlIDwgMCkge1xyXG4gICAgICAgIHJhZGl1cyA9IHRoaXMuZGVmYXVsdERyYXdTdHlsZVJhZGl1cztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByYWRpdXMgPSBkcmF3R3VpZGUgPiAwID8gZHJhd0d1aWRlIC8gcmVzb2x1dGlvbiA6IGRyYXdHdWlkZTtcclxuICAgICAgfVxyXG4gICAgICBvbFN0eWxlLmdldEltYWdlKCkuc2V0UmFkaXVzKHJhZGl1cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHdldGhlciBhIGdpdmVuIE9wZW4gTGF5ZXJzIHN0eWxlIGhhcyBhIHJhZGl1cyBwcm9wZXJ0eSB0aGF0IGNhbiBiZSBzZXQgKHVzZWQgdG8gc2V0IGRyYXcgZ3VpZGUpXHJcbiAgICogQHBhcmFtIG9sU3R5bGUgVGhlIHN0eWxlIG9uIHdoaWNoIHRvIHBlcmZvcm0gdGhlIGNoZWNrXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpc1N0eWxlV2l0aFJhZGl1cyhvbFN0eWxlOiBPbFN0eWxlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHlwZW9mIG9sU3R5bGUgIT09ICdmdW5jdGlvbicgJiYgb2xTdHlsZS5nZXRJbWFnZSAmJiBvbFN0eWxlLmdldEltYWdlKCkuc2V0UmFkaXVzO1xyXG4gIH1cclxufVxyXG4iXX0=