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
        /**
         * Control options
         */
        this.controlOptions = {};
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
            /** @type {?} */
            var olGuideStyle = this.getGuideStyleFromDrawStyle(value);
            if (olGuideStyle !== undefined) {
                this.defaultDrawStyleRadius = olGuideStyle.getImage().getRadius();
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
                this.olOverlaySource.clear(true);
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
        /** @type {?} */
        var controlOptions = Object.assign({}, this.controlOptions, {
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
        this.drawControl = new DrawControl(controlOptions);
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
        /** @type {?} */
        var controlOptions = Object.assign({}, this.controlOptions, {
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
        this.modifyControl = new ModifyControl(controlOptions);
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
        /** @type {?} */
        var activate;
        if (!this.value && this.geometryType) {
            activate = this.drawControl;
        }
        else {
            activate = this.modifyControl;
        }
        // If the control that should be activated
        // is not the same as the current active control,
        // deactivate the current control and activate the new one
        // Otherwise, do nothing and keep the current control active
        if (activate !== this.activeControl) {
            this.deactivateControl();
            this.activateControl(activate);
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
        /** @type {?} */
        var olGuideStyle = this.getGuideStyleFromDrawStyle(olStyle);
        if (olGuideStyle === undefined) {
            return;
        }
        /** @type {?} */
        var drawGuide = this.drawGuide;
        /** @type {?} */
        var radius;
        if (!drawGuide || drawGuide < 0) {
            radius = this.defaultDrawStyleRadius;
        }
        else {
            radius = drawGuide > 0 ? drawGuide / resolution : drawGuide;
        }
        olGuideStyle.getImage().setRadius(radius);
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
    GeometryFormFieldInputComponent.prototype.getGuideStyleFromDrawStyle = /**
     * Returns wether a given Open Layers style has a radius property that can be set (used to set draw guide)
     * @private
     * @param {?} olStyle The style on which to perform the check
     * @return {?}
     */
    function (olStyle) {
        if (Array.isArray(olStyle)) {
            olStyle = olStyle[0];
        }
        if (this.isStyleWithRadius(olStyle)) {
            return olStyle;
        }
        return undefined;
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
        controlOptions: [{ type: Input }],
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
     * Control options
     * @type {?}
     */
    GeometryFormFieldInputComponent.prototype.controlOptions;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktZm9ybS1maWVsZC1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvZ2VvbWV0cnktZm9ybS1maWVsZC9nZW9tZXRyeS1mb3JtLWZpZWxkLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsUUFBUSxFQUNSLElBQUksRUFDSixpQkFBaUIsRUFDakIsdUJBQXVCLEVBR3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFJakUsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFFMUMsT0FBTyxjQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUVuQyxPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEtBQUssTUFBTSxlQUFlLENBQUM7QUFFbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHlCQUF5QixFQUN6QixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7QUFTdEU7SUFpTUUseUNBQ1UsS0FBd0IsRUFDTCxTQUFv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OENBQXFCOzs7OztJQWtCckIsd0RBQXNDOzs7OztJQUt0QyxvREFBa0M7Ozs7O0lBS2xDLGtEQUFrQzs7Ozs7SUFtQmxDLCtEQUE2Qzs7Ozs7SUF5QjdDLGdFQUF1Qzs7Ozs7SUFLdkMseURBQW1EOzs7OztJQTBCbkQscURBQTRCOzs7OztJQVM1Qix3REFBK0I7Ozs7O0lBdUIvQixpREFBZ0M7Ozs7O0lBNEZoQyxtREFBaUM7Ozs7O0lBU2pDLG9EQUFrQzs7Ozs7SUFyRWhDLGdEQUFnQzs7SUFDaEMsb0RBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2xNb2RpZnkgfSBmcm9tICdvbC9pbnRlcmFjdGlvbi9Nb2RpZnknO1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9wdGlvbmFsLFxyXG4gIFNlbGYsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ0NvbnRyb2wsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBPbFN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IE9sR2VvSlNPTiBmcm9tICdvbC9mb3JtYXQvR2VvSlNPTic7XHJcbmltcG9ydCBPbEdlb21ldHJ5IGZyb20gJ29sL2dlb20vR2VvbWV0cnknO1xyXG5pbXBvcnQgT2xHZW9tZXRyeVR5cGUgZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeVR5cGUnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgT2xWZWN0b3JTb3VyY2UgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCBPbFZlY3RvckxheWVyIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XHJcbmltcG9ydCBPbE92ZXJsYXkgZnJvbSAnb2wvT3ZlcmxheSc7XHJcbmltcG9ydCAqIGFzIHBvbHkgZnJvbSAnb2wvZ2VvbS9Qb2x5Z29uJztcclxuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQge1xyXG4gIE1lYXN1cmVMZW5ndGhVbml0LFxyXG4gIHVwZGF0ZU9sR2VvbWV0cnlNaWRwb2ludHMsXHJcbiAgZm9ybWF0TWVhc3VyZSxcclxuICBtZWFzdXJlT2xHZW9tZXRyeVxyXG59IGZyb20gJy4uLy4uL21lYXN1cmUnO1xyXG5pbXBvcnQgeyBEcmF3Q29udHJvbCwgTW9kaWZ5Q29udHJvbCB9IGZyb20gJy4uL3NoYXJlZC9jb250cm9scyc7XHJcbmltcG9ydCB7IGNyZWF0ZURyYXdJbnRlcmFjdGlvblN0eWxlIH0gZnJvbSAnLi4vc2hhcmVkL2dlb21ldHJ5LnV0aWxzJztcclxuaW1wb3J0IHsgR2VvSlNPTkdlb21ldHJ5IH0gZnJvbSAnLi4vc2hhcmVkL2dlb21ldHJ5LmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaW5wdXQgYWxsb3dzIGEgdXNlciB0byBkcmF3IGEgbmV3IGdlb21ldHJ5IG9yIHRvIGVkaXRcclxuICogYW4gZXhpc3Rpbmcgb25lIG9uIGEgbWFwLiBBIHRleHQgaW5wdXQgaXMgYWxzbyBkaXNwbGF5ZWQgaW4gdGhlXHJcbiAqIGZvcm0gd2l0aCBzb21lIGluc3RydWN0aW9ucy5cclxuICogVGhpcyBpcyBzdGlsbCBXSVAuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1nZW9tZXRyeS1mb3JtLWZpZWxkLWlucHV0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZ2VvbWV0cnktZm9ybS1maWVsZC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEdlb21ldHJ5Rm9ybUZpZWxkSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICBwcml2YXRlIG9sT3ZlcmxheUxheWVyOiBPbFZlY3RvckxheWVyO1xyXG4gIHByaXZhdGUgb2xHZW9KU09OID0gbmV3IE9sR2VvSlNPTigpO1xyXG4gIHByaXZhdGUgcmVhZHkgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBkcmF3Q29udHJvbDogRHJhd0NvbnRyb2w7XHJcbiAgcHJpdmF0ZSBtb2RpZnlDb250cm9sOiBNb2RpZnlDb250cm9sO1xyXG4gIHByaXZhdGUgZGVmYXVsdERyYXdTdHlsZVJhZGl1czogbnVtYmVyO1xyXG4gIHByaXZhdGUgb2xHZW9tZXRyeUVuZHMkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgb2xHZW9tZXRyeUNoYW5nZXMkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgb2xUb29sdGlwID0gT2xPdmVybGF5O1xyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmUgY29udHJvbFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBhY3RpdmVDb250cm9sOiBEcmF3Q29udHJvbCB8IE1vZGlmeUNvbnRyb2w7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXAgdG8gZHJhdyB0aGUgZ2VvbWV0cnkgb25cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGdlb21ldHJ5IHR5cGVcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBnZW9tZXRyeVR5cGUodmFsdWU6IE9sR2VvbWV0cnlUeXBlKSB7XHJcbiAgICB0aGlzLl9nZW9tZXRyeVR5cGUgPSB2YWx1ZTtcclxuICAgIGlmICh0aGlzLnJlYWR5ID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kZWFjdGl2YXRlQ29udHJvbCgpO1xyXG4gICAgdGhpcy5jcmVhdGVEcmF3Q29udHJvbCgpO1xyXG4gICAgdGhpcy5kcmF3Q29udHJvbC5mcmVlaGFuZCQubmV4dCh0aGlzLmZyZWVoYW5kRHJhd0lzQWN0aXZlKTtcclxuICAgIHRoaXMudG9nZ2xlQ29udHJvbCgpO1xyXG4gIH1cclxuICBnZXQgZ2VvbWV0cnlUeXBlKCk6IE9sR2VvbWV0cnlUeXBlIHsgcmV0dXJuIHRoaXMuX2dlb21ldHJ5VHlwZTsgfVxyXG4gIHByaXZhdGUgX2dlb21ldHJ5VHlwZTogT2xHZW9tZXRyeVR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkcmF3R3VpZGUgYXJvdW5kIHRoZSBtb3VzZSBwb2ludGVyIHRvIGhlbHAgZHJhd2luZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRyYXdHdWlkZTogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIG1lYXN1cmUgdG9vbHRpcCBzaG91bGQgYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWVhc3VyZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGRyYXcgY29udHJvbCBzaG91bGQgYmUgYWN0aXZlIG9yIG5vdFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRyYXdDb250cm9sSXNBY3RpdmUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kcmF3Q29udHJvbElzQWN0aXZlOyB9XHJcbiAgc2V0IGRyYXdDb250cm9sSXNBY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2RyYXdDb250cm9sSXNBY3RpdmUgPSB2YWx1ZTtcclxuICAgIGlmICh0aGlzLnJlYWR5ID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVDb250cm9sKCk7XHJcbiAgICBpZiAoIXRoaXMuX2RyYXdDb250cm9sSXNBY3RpdmUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50b2dnbGVDb250cm9sKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX2RyYXdDb250cm9sSXNBY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGZyZWVoYW5kIGRyYXcgY29udHJvbCBzaG91bGQgYmUgYWN0aXZlIG9yIG5vdFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGZyZWVoYW5kRHJhd0lzQWN0aXZlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZnJlZWhhbmREcmF3SXNBY3RpdmU7IH1cclxuICBzZXQgZnJlZWhhbmREcmF3SXNBY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2ZyZWVoYW5kRHJhd0lzQWN0aXZlID0gdmFsdWU7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVDb250cm9sKCk7XHJcblxyXG4gICAgdGhpcy5jcmVhdGVEcmF3Q29udHJvbCgpO1xyXG4gICAgdGhpcy5jcmVhdGVNb2RpZnlDb250cm9sKCk7XHJcblxyXG4gICAgdGhpcy5kcmF3Q29udHJvbC5mcmVlaGFuZCQubmV4dCh0aGlzLmZyZWVoYW5kRHJhd0lzQWN0aXZlKTtcclxuXHJcbiAgICBpZiAodGhpcy5yZWFkeSA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5kcmF3Q29udHJvbElzQWN0aXZlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMudG9nZ2xlQ29udHJvbCgpO1xyXG4gIH1cclxuICBwcml2YXRlIF9mcmVlaGFuZERyYXdJc0FjdGl2ZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29udHJvbCBvcHRpb25zXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29udHJvbE9wdGlvbnM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0eWxlIGZvciB0aGUgZHJhdyBjb250cm9sIChhcHBsaWVzIHdoaWxlIHRoZSBnZW9tZXRyeSBpcyBiZWluZyBkcmF3bilcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBkcmF3U3R5bGUodmFsdWU6IE9sU3R5bGUpIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHZhbHVlID0gY3JlYXRlRHJhd0ludGVyYWN0aW9uU3R5bGUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2RyYXdTdHlsZSA9IHZhbHVlO1xyXG5cclxuICAgIGNvbnN0IG9sR3VpZGVTdHlsZSA9IHRoaXMuZ2V0R3VpZGVTdHlsZUZyb21EcmF3U3R5bGUodmFsdWUpO1xyXG4gICAgaWYgKG9sR3VpZGVTdHlsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdERyYXdTdHlsZVJhZGl1cyA9IG9sR3VpZGVTdHlsZS5nZXRJbWFnZSgpLmdldFJhZGl1cygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kZWZhdWx0RHJhd1N0eWxlUmFkaXVzID0gbnVsbDtcclxuICAgIH1cclxuICAgIHRoaXMuZGVhY3RpdmF0ZUNvbnRyb2woKTtcclxuICAgIHRoaXMuY3JlYXRlRHJhd0NvbnRyb2woKTtcclxuICAgIHRoaXMuY3JlYXRlTW9kaWZ5Q29udHJvbCgpO1xyXG5cclxuICAgIHRoaXMuZHJhd0NvbnRyb2wuZnJlZWhhbmQkLm5leHQodGhpcy5mcmVlaGFuZERyYXdJc0FjdGl2ZSk7XHJcbiAgICB0aGlzLnRvZ2dsZUNvbnRyb2woKTtcclxuICB9XHJcbiAgZ2V0IGRyYXdTdHlsZSgpOiBPbFN0eWxlIHsgcmV0dXJuIHRoaXMuX2RyYXdTdHlsZTsgfVxyXG4gIHByaXZhdGUgX2RyYXdTdHlsZTogT2xTdHlsZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3R5bGUgZm9yIHRoZSBvdmVybGF5IGxheWVyIChhcHBsaWVzIG9uY2UgdGhlIGdlb21ldHJ5IGlzIGFkZGVkIHRvIHRoZSBtYXApXHJcbiAgICogSWYgbm90IHNwZWNpZmllZCwgZHJhd1N0eWxlIGFwcGxpZXNcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBvdmVybGF5U3R5bGUodmFsdWU6IE9sU3R5bGUpIHsgdGhpcy5fb3ZlcmxheVN0eWxlID0gdmFsdWU7IH1cclxuICBnZXQgb3ZlcmxheVN0eWxlKCk6IE9sU3R5bGUgeyByZXR1cm4gdGhpcy5fb3ZlcmxheVN0eWxlOyB9XHJcbiAgcHJpdmF0ZSBfb3ZlcmxheVN0eWxlOiBPbFN0eWxlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZ2VvbWV0cnkgdmFsdWUgKEdlb0pTT04pXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCB2YWx1ZSh2YWx1ZTogR2VvSlNPTkdlb21ldHJ5KSB7XHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgaWYgKHRoaXMucmVhZHkgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5hZGRHZW9KU09OVG9PdmVybGF5KHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5U291cmNlLmNsZWFyKHRydWUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XHJcbiAgICB0aGlzLnRvZ2dsZUNvbnRyb2woKTtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuICBnZXQgdmFsdWUoKTogR2VvSlNPTkdlb21ldHJ5IHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XHJcbiAgcHJpdmF0ZSBfdmFsdWU6IEdlb0pTT05HZW9tZXRyeTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHZlY3RvciBzb3VyY2UgdG8gYWRkIHRoZSBnZW9tZXRyeSB0b1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBvbE92ZXJsYXlTb3VyY2UoKTogT2xWZWN0b3JTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMub2xPdmVybGF5TGF5ZXIuZ2V0U291cmNlKCk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCByYWRpdXModmFsdWU6IGFueSkge1xyXG4gICAgaWYgKHRoaXMucmVhZHkgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm1vZGlmeUNvbnRyb2wuZ2V0U291cmNlKCkpIHtcclxuICAgICAgdGhpcy5tb2RpZnlDb250cm9sLmdldFNvdXJjZSgpLnJlZnJlc2goKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmZyZWVoYW5kRHJhd0lzQWN0aXZlKSB7XHJcbiAgICAgIGxldCBvbE1vZGlmeTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgb2xNb2RpZnkgPSB0aGlzLm1vZGlmeUNvbnRyb2wub2xNb2RpZnlJbnRlcmFjdGlvbjtcclxuICAgICAgICBpZiAob2xNb2RpZnkpIHtcclxuICAgICAgICAgIGlmIChvbE1vZGlmeS5mZWF0dXJlc18pIHtcclxuICAgICAgICAgICAgb2xNb2RpZnkuZmVhdHVyZXNfLmNsZWFyKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbFxyXG4gICkge1xyXG4gICAgaWYgKHRoaXMubmdDb250cm9sICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgLy8gU2V0dGluZyB0aGUgdmFsdWUgYWNjZXNzb3IgZGlyZWN0bHkgKGluc3RlYWQgb2YgdXNpbmdcclxuICAgICAgLy8gdGhlIHByb3ZpZGVycykgdG8gYXZvaWQgcnVubmluZyBpbnRvIGEgY2lyY3VsYXIgaW1wb3J0LlxyXG4gICAgICB0aGlzLm5nQ29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvdmVybGF5IGxheWVyLCBhZGQgdGhlIGluaXRpYWwgZ2VvbWV0cnkgdG8gaXQgKGlmIGFueSlcclxuICAgKiBhbmQgdG9nZ2xlIHRoZSByaWdodCBpbnRlcmFjdGlvbi5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmRyYXdTdHlsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZHJhd1N0eWxlID0gY3JlYXRlRHJhd0ludGVyYWN0aW9uU3R5bGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vdmVybGF5U3R5bGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm92ZXJsYXlTdHlsZSA9IHRoaXMuZHJhd1N0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkT2xPdmVybGF5TGF5ZXIoKTtcclxuICAgIHRoaXMuY3JlYXRlTWVhc3VyZVRvb2x0aXAoKTtcclxuICAgIHRoaXMuY3JlYXRlRHJhd0NvbnRyb2woKTtcclxuICAgIHRoaXMuY3JlYXRlTW9kaWZ5Q29udHJvbCgpO1xyXG5cclxuICAgIGlmICh0aGlzLnZhbHVlKSB7XHJcbiAgICAgIHRoaXMuYWRkR2VvSlNPTlRvT3ZlcmxheSh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIHRoaXMudG9nZ2xlQ29udHJvbCgpO1xyXG5cclxuICAgIHRoaXMucmVhZHkgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIG92ZXJsYXkgbGF5ZXIgYW5kIGFueSBpbnRlcmFjdGlvbiBhZGRlZCBieSB0aGlzIGNvbXBvbmVudC5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIC8vIFRoaXMgaXMgbWFuZGF0b3J5IHdoZW4gdGhlIGZvcm0gY29udHJvbCBpcyByZXVzZWQgYWZ0ZXJcclxuICAgIC8vIHRoaXMgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gSXQgc2VlbXMgbGlrZSB0aGUgY29udHJvbFxyXG4gICAgLy8ga2VlcHMgYSByZWZlcmVuY2UgdG8gdGhpcyBjb21wb25lbnQgZXZlbiBhZnRlciBpdCdzIGRlc3Ryb3llZFxyXG4gICAgLy8gYW5kIGl0IGF0dGVtcHRzIHRvIHNldCBpdCdzIHZhbHVlXHJcbiAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5kZWFjdGl2YXRlQ29udHJvbCgpO1xyXG4gICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuY2xlYXIoKTtcclxuICAgIHRoaXMubWFwLm9sLnJlbW92ZUxheWVyKHRoaXMub2xPdmVybGF5TGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pIHtcclxuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICB9XHJcbiAgcHJpdmF0ZSBvbkNoYW5nZTogYW55ID0gKCkgPT4ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXHJcbiAgICovXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbikge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcbiAgcHJpdmF0ZSBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxyXG4gICAqL1xyXG4gIHdyaXRlVmFsdWUodmFsdWU6IEdlb0pTT05HZW9tZXRyeSkge1xyXG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGFuIG92ZXJsYXkgbGF5ZXIgdG8gdGhlIG1hcFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT2xPdmVybGF5TGF5ZXIoKTogT2xWZWN0b3JMYXllciB7XHJcbiAgICB0aGlzLm9sT3ZlcmxheUxheWVyID0gbmV3IE9sVmVjdG9yTGF5ZXIoe1xyXG4gICAgICBzb3VyY2U6IG5ldyBPbFZlY3RvclNvdXJjZSgpLFxyXG4gICAgICB6SW5kZXg6IDUwMCxcclxuICAgICAgc3R5bGU6IG51bGxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5tYXAub2wuYWRkTGF5ZXIodGhpcy5vbE92ZXJsYXlMYXllcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBkcmF3IGNvbnRyb2wgYW5kIHN1YnNjcmliZSB0byBpdCdzIGdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVEcmF3Q29udHJvbCgpIHtcclxuICAgIGNvbnN0IGNvbnRyb2xPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb250cm9sT3B0aW9ucywge1xyXG4gICAgICBnZW9tZXRyeVR5cGU6IHRoaXMuZ2VvbWV0cnlUeXBlIHx8ICdQb2ludCcsXHJcbiAgICAgIGxheWVyOiB0aGlzLm9sT3ZlcmxheUxheWVyLFxyXG4gICAgICBkcmF3U3R5bGU6IHR5cGVvZiB0aGlzLmRyYXdTdHlsZSA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuZHJhd1N0eWxlIDogKG9sRmVhdHVyZTogT2xGZWF0dXJlLCByZXNvbHV0aW9uOiBudW1iZXIpID0+IHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMuZHJhd1N0eWxlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRHJhd1N0eWxlV2l0aERyYXdHdWlkZShzdHlsZSwgcmVzb2x1dGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuZHJhd0NvbnRyb2wgPSBuZXcgRHJhd0NvbnRyb2woY29udHJvbE9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbW9kaWZ5IGNvbnRyb2wgYW5kIHN1YnNjcmliZSB0byBpdCdzIGdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVNb2RpZnlDb250cm9sKCkge1xyXG4gICAgY29uc3QgY29udHJvbE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbnRyb2xPcHRpb25zLCB7XHJcbiAgICAgIGxheWVyOiB0aGlzLm9sT3ZlcmxheUxheWVyLFxyXG4gICAgICBkcmF3U3R5bGU6IHR5cGVvZiB0aGlzLmRyYXdTdHlsZSA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuZHJhd1N0eWxlIDogKG9sRmVhdHVyZTogT2xGZWF0dXJlLCByZXNvbHV0aW9uOiBudW1iZXIpID0+IHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMuZHJhd1N0eWxlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRHJhd1N0eWxlV2l0aERyYXdHdWlkZShzdHlsZSwgcmVzb2x1dGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMubW9kaWZ5Q29udHJvbCA9IG5ldyBNb2RpZnlDb250cm9sKGNvbnRyb2xPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZSB0aGUgcHJvcGVyIGNvbnRyb2wgKGRyYXcgb3IgbW9kaWZ5KVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdG9nZ2xlQ29udHJvbCgpIHtcclxuICAgIGxldCBhY3RpdmF0ZTtcclxuICAgIGlmICghdGhpcy52YWx1ZSAmJiB0aGlzLmdlb21ldHJ5VHlwZSkge1xyXG4gICAgICBhY3RpdmF0ZSA9IHRoaXMuZHJhd0NvbnRyb2w7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhY3RpdmF0ZSA9IHRoaXMubW9kaWZ5Q29udHJvbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiB0aGUgY29udHJvbCB0aGF0IHNob3VsZCBiZSBhY3RpdmF0ZWRcclxuICAgIC8vIGlzIG5vdCB0aGUgc2FtZSBhcyB0aGUgY3VycmVudCBhY3RpdmUgY29udHJvbCxcclxuICAgIC8vIGRlYWN0aXZhdGUgdGhlIGN1cnJlbnQgY29udHJvbCBhbmQgYWN0aXZhdGUgdGhlIG5ldyBvbmVcclxuICAgIC8vIE90aGVyd2lzZSwgZG8gbm90aGluZyBhbmQga2VlcCB0aGUgY3VycmVudCBjb250cm9sIGFjdGl2ZVxyXG4gICAgaWYgKGFjdGl2YXRlICE9PSB0aGlzLmFjdGl2ZUNvbnRyb2wpIHtcclxuICAgICAgdGhpcy5kZWFjdGl2YXRlQ29udHJvbCgpO1xyXG4gICAgICB0aGlzLmFjdGl2YXRlQ29udHJvbChhY3RpdmF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSBhIGdpdmVuIGNvbnRyb2xcclxuICAgKiBAcGFyYW0gY29udHJvbCBDb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhY3RpdmF0ZUNvbnRyb2woY29udHJvbDogRHJhd0NvbnRyb2wgfCBNb2RpZnlDb250cm9sKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUNvbnRyb2wgPSBjb250cm9sO1xyXG4gICAgdGhpcy5vbEdlb21ldHJ5RW5kcyQkID0gY29udHJvbC5lbmQkXHJcbiAgICAgIC5zdWJzY3JpYmUoKG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkpID0+IHRoaXMub25PbEdlb21ldHJ5RW5kcyhvbEdlb21ldHJ5KSk7XHJcbiAgICBpZiAodGhpcy5tZWFzdXJlID09PSB0cnVlICYmIGNvbnRyb2wgPT09IHRoaXMuZHJhd0NvbnRyb2wpIHtcclxuICAgICAgdGhpcy5vbEdlb21ldHJ5Q2hhbmdlcyQkID0gY29udHJvbC5jaGFuZ2VzJFxyXG4gICAgICAgIC5zdWJzY3JpYmUoKG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkpID0+IHRoaXMub25PbEdlb21ldHJ5Q2hhbmdlcyhvbEdlb21ldHJ5KSk7XHJcbiAgICB9XHJcbiAgICBjb250cm9sLnNldE9sTWFwKHRoaXMubWFwLm9sKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYWN0aXZhdGUgdGhlIGFjdGl2ZSBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkZWFjdGl2YXRlQ29udHJvbCgpIHtcclxuICAgIHRoaXMucmVtb3ZlTWVhc3VyZVRvb2x0aXAoKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZUNvbnRyb2wgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmFjdGl2ZUNvbnRyb2wuc2V0T2xNYXAodW5kZWZpbmVkKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9sR2VvbWV0cnlFbmRzJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sR2VvbWV0cnlFbmRzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9sR2VvbWV0cnlDaGFuZ2VzJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sR2VvbWV0cnlDaGFuZ2VzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuYWN0aXZlQ29udHJvbCA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBtZWFzdXJlcyBvYnNlcnZhYmxlcyBhbmQgbWFwIHRvb2x0aXBzXHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT2wgbGluZXN0cmluZyBvciBwb2x5Z29uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk9sR2VvbWV0cnlFbmRzKG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkgfCB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMucmVtb3ZlTWVhc3VyZVRvb2x0aXAoKTtcclxuICAgIHRoaXMuc2V0T2xHZW9tZXRyeShvbEdlb21ldHJ5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBtZWFzdXJlcyBvYnNlcnZhYmxlcyBhbmQgbWFwIHRvb2x0aXBzXHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT2wgbGluZXN0cmluZyBvciBwb2x5Z29uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk9sR2VvbWV0cnlDaGFuZ2VzKG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkpIHtcclxuICAgIGlmIChvbEdlb21ldHJ5LmdldFR5cGUoKSAhPT0gJ1BvaW50Jykge1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lYXN1cmVUb29sdGlwKG9sR2VvbWV0cnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBkcmF3aW5nIGVuZHMsIGNvbnZlcnQgdGhlIG91dHB1dCB2YWx1ZSB0byBHZW9KU09OIGFuZCBrZWVwIGl0LlxyXG4gICAqIFJlc3RvcmUgdGhlIGRvdWJsZSBjbGljayBpbnRlcmFjdGlvbi5cclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPTCBnZW9tZXRyeVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0T2xHZW9tZXRyeShvbEdlb21ldHJ5OiBPbEdlb21ldHJ5IHwgdW5kZWZpbmVkKSB7XHJcbiAgICBsZXQgdmFsdWU7XHJcbiAgICBpZiAob2xHZW9tZXRyeSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob2xHZW9tZXRyeS5nZXRUeXBlKCkgPT09ICdDaXJjbGUnKSB7IC8vIEJlY2F1c2UgQ2lyY2xlIGRvZXNuJ3QgZXhpc3QgYXMgYSBHZW9KU09OIG9iamVjdFxyXG4gICAgICBvbEdlb21ldHJ5ID0gdGhpcy5jaXJjbGVUb1BvaW50KG9sR2VvbWV0cnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbHVlID0gdGhpcy5vbEdlb0pTT04ud3JpdGVHZW9tZXRyeU9iamVjdChvbEdlb21ldHJ5LCB7XHJcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICBkYXRhUHJvamVjdGlvbjogJ0VQU0c6NDMyNidcclxuICAgIH0pO1xyXG4gICAgaWYgKG9sR2VvbWV0cnkuZ2V0KCdyYWRpdXMnKSkge1xyXG4gICAgICB2YWx1ZS5yYWRpdXMgPSBvbEdlb21ldHJ5LmdldCgncmFkaXVzJyk7XHJcbiAgICAgIG9sR2VvbWV0cnkuX3JhZGl1cyA9IHZhbHVlLnJhZGl1cztcclxuICAgIH1cclxuICAgIHRoaXMud3JpdGVWYWx1ZSh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNpcmNsZVRvUG9pbnQob2xHZW9tZXRyeSkge1xyXG4gICAgY29uc3QgY2VudGVyID0gb2xHZW9tZXRyeS5nZXRDZW50ZXIoKTtcclxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gb2xwcm9qLnRyYW5zZm9ybShjZW50ZXIsIHRoaXMubWFwLnByb2plY3Rpb24sICdFUFNHOjQzMjYnKTtcclxuICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgucm91bmQob2xHZW9tZXRyeS5nZXRSYWRpdXMoKSAqIChNYXRoLmNvcygoTWF0aC5QSSAvIDE4MCkgKiBjb29yZGluYXRlc1sxXSkpKTtcclxuXHJcbiAgICAvLyBDb252ZXJ0IGl0IHRvIGEgcG9pbnQgb2JqZWN0XHJcbiAgICBvbEdlb21ldHJ5ID0gbmV3IFBvaW50KGNlbnRlcik7XHJcbiAgICBvbEdlb21ldHJ5LnNldCgncmFkaXVzJywgcmFkaXVzLCB0cnVlKTtcclxuICAgIHJldHVybiBvbEdlb21ldHJ5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgR2VvSlNPTiBnZW9tZXRyeSB0byB0aGUgb3ZlcmxheVxyXG4gICAqIEBwYXJhbSBnZW9tZXRyeSBHZW9KU09OIGdlb21ldHJ5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRHZW9KU09OVG9PdmVybGF5KGdlb21ldHJ5OiBHZW9KU09OR2VvbWV0cnkpIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSB0aGlzLm9sR2VvSlNPTi5yZWFkR2VvbWV0cnkoZ2VvbWV0cnksIHtcclxuICAgICAgZGF0YVByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxyXG4gICAgICBmZWF0dXJlUHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvblxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvbEZlYXR1cmUgPSBuZXcgT2xGZWF0dXJlKHtcclxuICAgICAgZ2VvbWV0cnk6IG9sR2VvbWV0cnlcclxuICAgIH0pO1xyXG4gICAgb2xGZWF0dXJlLnNldFN0eWxlKHRoaXMub3ZlcmxheVN0eWxlKTtcclxuICAgIHRoaXMub2xPdmVybGF5U291cmNlLmNsZWFyKCk7XHJcbiAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5hZGRGZWF0dXJlKG9sRmVhdHVyZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlIG1lYXN1cmUgdG9vbHRpcFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlTWVhc3VyZVRvb2x0aXAoKTogT2xPdmVybGF5IHtcclxuICAgIHRoaXMub2xUb29sdGlwID0gbmV3IE9sT3ZlcmxheSh7XHJcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICBvZmZzZXQ6IFstMzAsIC0xMF0sXHJcbiAgICAgIGNsYXNzTmFtZTogW1xyXG4gICAgICAgICdpZ28tbWFwLXRvb2x0aXAnLFxyXG4gICAgICAgICdpZ28tbWFwLXRvb2x0aXAtbWVhc3VyZSdcclxuICAgICAgXS5qb2luKCcgJyksXHJcbiAgICAgIHN0b3BFdmVudDogZmFsc2VcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBtZWFzdXJlIHRvb2x0aXAgb2YgYW4gT0wgZ2VvbWV0cnlcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPTCBHZW9tZXRyeVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlTWVhc3VyZVRvb2x0aXAob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkge1xyXG4gICAgY29uc3QgbWVhc3VyZSA9IG1lYXN1cmVPbEdlb21ldHJ5KG9sR2VvbWV0cnksIHRoaXMubWFwLnByb2plY3Rpb24pO1xyXG4gICAgY29uc3QgbGVuZ3RocyA9IG1lYXN1cmUubGVuZ3RocztcclxuICAgIGNvbnN0IGxhc3RJbmRleCA9IG9sR2VvbWV0cnkuZ2V0VHlwZSgpID09PSAnUG9seWdvbicgPyBsZW5ndGhzLmxlbmd0aCAtIDIgOiBsZW5ndGhzLmxlbmd0aCAtIDE7XHJcbiAgICBjb25zdCBsYXN0TGVuZ3RoID0gbGVuZ3Roc1tsYXN0SW5kZXhdO1xyXG5cclxuICAgIGNvbnN0IG9sTWlkcG9pbnRzID0gdXBkYXRlT2xHZW9tZXRyeU1pZHBvaW50cyhvbEdlb21ldHJ5KTtcclxuICAgIGNvbnN0IG9sTGFzdE1pZHBvaW50ID0gb2xNaWRwb2ludHNbbGFzdEluZGV4XTtcclxuICAgIGlmIChvbE1pZHBvaW50cy5sZW5ndGggPT09IDAgfHwgb2xMYXN0TWlkcG9pbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnJlbW92ZU1lYXN1cmVUb29sdGlwKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sVG9vbHRpcC5zZXRQb3NpdGlvbihvbExhc3RNaWRwb2ludC5mbGF0Q29vcmRpbmF0ZXMpO1xyXG5cclxuICAgIGNvbnN0IGlubmVySHRtbCA9IGZvcm1hdE1lYXN1cmUobGFzdExlbmd0aCwge1xyXG4gICAgICBkZWNpbWFsOiAxLFxyXG4gICAgICB1bml0OiBNZWFzdXJlTGVuZ3RoVW5pdC5NZXRlcnMsXHJcbiAgICAgIHVuaXRBYmJyOiB0cnVlLFxyXG4gICAgICBsb2NhbGU6ICdmcidcclxuICAgIH0pO1xyXG4gICAgdGhpcy5vbFRvb2x0aXAuZ2V0RWxlbWVudCgpLmlubmVySFRNTCA9IGlubmVySHRtbDtcclxuICAgIGlmICh0aGlzLm9sVG9vbHRpcC5nZXRNYXAoKSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWFwLm9sLmFkZE92ZXJsYXkodGhpcy5vbFRvb2x0aXApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIHRoZSBtZWFzdXJlIHRvb2x0aXAgZnJvbSB0aGUgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVNZWFzdXJlVG9vbHRpcCgpIHtcclxuICAgIGlmICh0aGlzLm9sVG9vbHRpcC5nZXRNYXAgJiYgdGhpcy5vbFRvb2x0aXAuZ2V0TWFwKCkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm1hcC5vbC5yZW1vdmVPdmVybGF5KHRoaXMub2xUb29sdGlwKTtcclxuICAgICAgdGhpcy5vbFRvb2x0aXAuc2V0TWFwKHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGp1c3QgdGhlIGRyYXcgc3R5bGUgd2l0aCB0aGUgc3BlY2lmaWVkIGRyYXcgZ3VpZGUgZGlzdGFuY2UsIGlmIHBvc3NpYmxlXHJcbiAgICogQHBhcmFtIG9sU3R5bGUgRHJhdyBzdHlsZSB0byB1cGRhdGVcclxuICAgKiBAcGFyYW0gcmVzb2x1dGlvbiBSZXNvbHV0aW9uICh0byBtYWtlIHRoZSBzY3JlZW4gc2l6ZSBvZiBzeW1ib2wgZml0IHRoZSBkcmF3R3VpZGUgdmFsdWUpXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVEcmF3U3R5bGVXaXRoRHJhd0d1aWRlKG9sU3R5bGU6IE9sU3R5bGUsIHJlc29sdXRpb246IG51bWJlcikge1xyXG4gICAgY29uc3Qgb2xHdWlkZVN0eWxlID0gdGhpcy5nZXRHdWlkZVN0eWxlRnJvbURyYXdTdHlsZShvbFN0eWxlKTtcclxuICAgIGlmIChvbEd1aWRlU3R5bGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZHJhd0d1aWRlID0gdGhpcy5kcmF3R3VpZGU7XHJcbiAgICBsZXQgcmFkaXVzO1xyXG4gICAgaWYgKCFkcmF3R3VpZGUgfHwgZHJhd0d1aWRlIDwgMCkge1xyXG4gICAgICByYWRpdXMgPSB0aGlzLmRlZmF1bHREcmF3U3R5bGVSYWRpdXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByYWRpdXMgPSBkcmF3R3VpZGUgPiAwID8gZHJhd0d1aWRlIC8gcmVzb2x1dGlvbiA6IGRyYXdHdWlkZTtcclxuICAgIH1cclxuICAgIG9sR3VpZGVTdHlsZS5nZXRJbWFnZSgpLnNldFJhZGl1cyhyYWRpdXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB3ZXRoZXIgYSBnaXZlbiBPcGVuIExheWVycyBzdHlsZSBoYXMgYSByYWRpdXMgcHJvcGVydHkgdGhhdCBjYW4gYmUgc2V0ICh1c2VkIHRvIHNldCBkcmF3IGd1aWRlKVxyXG4gICAqIEBwYXJhbSBvbFN0eWxlIFRoZSBzdHlsZSBvbiB3aGljaCB0byBwZXJmb3JtIHRoZSBjaGVja1xyXG4gICAqL1xyXG4gIHByaXZhdGUgaXNTdHlsZVdpdGhSYWRpdXMob2xTdHlsZTogT2xTdHlsZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBvbFN0eWxlICE9PSAnZnVuY3Rpb24nICYmIG9sU3R5bGUuZ2V0SW1hZ2UgJiYgb2xTdHlsZS5nZXRJbWFnZSgpLnNldFJhZGl1cztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgd2V0aGVyIGEgZ2l2ZW4gT3BlbiBMYXllcnMgc3R5bGUgaGFzIGEgcmFkaXVzIHByb3BlcnR5IHRoYXQgY2FuIGJlIHNldCAodXNlZCB0byBzZXQgZHJhdyBndWlkZSlcclxuICAgKiBAcGFyYW0gb2xTdHlsZSBUaGUgc3R5bGUgb24gd2hpY2ggdG8gcGVyZm9ybSB0aGUgY2hlY2tcclxuICAgKi9cclxuICBwcml2YXRlIGdldEd1aWRlU3R5bGVGcm9tRHJhd1N0eWxlKG9sU3R5bGU6IE9sU3R5bGUgfCAgT2xTdHlsZVtdKTogT2xTdHlsZSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvbFN0eWxlKSkge1xyXG4gICAgICBvbFN0eWxlID0gb2xTdHlsZVswXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzU3R5bGVXaXRoUmFkaXVzKG9sU3R5bGUpKSB7XHJcbiAgICAgIHJldHVybiBvbFN0eWxlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbn1cclxuIl19