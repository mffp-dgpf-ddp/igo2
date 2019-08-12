/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as olstyle from 'ol/style';
import * as olproj from 'ol/proj';
var EsriStyleGenerator = /** @class */ (function () {
    function EsriStyleGenerator() {
        this._converters = {};
        this._converters.esriPMS = EsriStyleGenerator._convertEsriPMS;
        this._converters.esriSFS = EsriStyleGenerator._convertEsriSFS;
        this._converters.esriSLS = EsriStyleGenerator._convertEsriSLS;
        this._converters.esriSMS = EsriStyleGenerator._convertEsriSMS;
        this._converters.esriTS = EsriStyleGenerator._convertEsriTS;
        this._renderers = {};
        this._renderers.uniqueValue = this._renderUniqueValue;
        this._renderers.simple = this._renderSimple;
        this._renderers.classBreaks = this._renderClassBreaks;
    }
    /**
     * @param {?} point
     * @return {?}
     */
    EsriStyleGenerator._convertPointToPixel = /**
     * @param {?} point
     * @return {?}
     */
    function (point) {
        return point / 0.75;
    };
    /**
     * @param {?} color
     * @return {?}
     */
    EsriStyleGenerator._transformColor = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        // alpha channel is different, runs from 0-255 but in ol3 from 0-1
        return [color[0], color[1], color[2], color[3] / 255];
    };
    /**
     * @param {?} scale
     * @param {?} units
     * @return {?}
     */
    EsriStyleGenerator._getResolutionForScale = /**
     * @param {?} scale
     * @param {?} units
     * @return {?}
     */
    function (scale, units) {
        /** @type {?} */
        var dpi = 25.4 / 0.28;
        /** @type {?} */
        var mpu = olproj.METERS_PER_UNIT[units];
        /** @type {?} */
        var inchesPerMeter = 39.37;
        return parseFloat(scale) / (mpu * inchesPerMeter * dpi);
    };
    /* convert an Esri Text Symbol */
    /* convert an Esri Text Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    EsriStyleGenerator._convertEsriTS = /* convert an Esri Text Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    function (symbol) {
        /** @type {?} */
        var rotation = EsriStyleGenerator._transformAngle(symbol.angle);
        /** @type {?} */
        var text = symbol.text !== undefined ? symbol.text : undefined;
        return new olstyle.Style({
            text: new olstyle.Text({
                fill: new olstyle.Fill({
                    color: EsriStyleGenerator._transformColor(symbol.color)
                }),
                font: symbol.font.style +
                    ' ' +
                    symbol.font.weight +
                    ' ' +
                    symbol.font.size +
                    ' px ' +
                    symbol.font.family,
                textBaseline: symbol.verticalAlignment,
                textAlign: symbol.horizontalAlignment,
                offsetX: EsriStyleGenerator._convertPointToPixel(symbol.xoffset),
                offsetY: EsriStyleGenerator._convertPointToPixel(symbol.yoffset),
                rotation: rotation,
                text: text
            })
        });
    };
    /* convert an Esri Picture Marker Symbol */
    /* convert an Esri Picture Marker Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    EsriStyleGenerator._convertEsriPMS = /* convert an Esri Picture Marker Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    function (symbol) {
        /** @type {?} */
        var src = 'data:' + symbol.contentType + ';base64, ' + symbol.imageData;
        /** @type {?} */
        var rotation = EsriStyleGenerator._transformAngle(symbol.angle);
        return new olstyle.Style({
            image: new olstyle.Icon({
                src: src,
                rotation: rotation
            })
        });
    };
    /* convert an Esri Simple Fill Symbol */
    /* convert an Esri Simple Fill Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    EsriStyleGenerator._convertEsriSFS = /* convert an Esri Simple Fill Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    function (symbol) {
        // there is no support in openlayers currently for fill patterns, so style is not interpreted
        /** @type {?} */
        var fill = new olstyle.Fill({
            color: EsriStyleGenerator._transformColor(symbol.color)
        });
        /** @type {?} */
        var stroke = symbol.outline
            ? EsriStyleGenerator._convertOutline(symbol.outline)
            : undefined;
        return new olstyle.Style({
            fill: fill,
            stroke: stroke
        });
    };
    /**
     * @param {?} outline
     * @return {?}
     */
    EsriStyleGenerator._convertOutline = /**
     * @param {?} outline
     * @return {?}
     */
    function (outline) {
        /** @type {?} */
        var lineDash;
        /** @type {?} */
        var color = EsriStyleGenerator._transformColor(outline.color);
        if (outline.style === 'esriSLSDash') {
            lineDash = [5];
        }
        else if (outline.style === 'esriSLSDashDot') {
            lineDash = [5, 5, 1, 2];
        }
        else if (outline.style === 'esriSLSDashDotDot') {
            lineDash = [5, 5, 1, 2, 1, 2];
        }
        else if (outline.style === 'esriSLSDot') {
            lineDash = [1, 2];
        }
        else if (outline.style === 'esriSLSNull') {
            // line not visible, make color fully transparent
            color[3] = 0;
        }
        return new olstyle.Stroke({
            color: color,
            lineDash: lineDash,
            width: EsriStyleGenerator._convertPointToPixel(outline.width)
        });
    };
    /* convert an Esri Simple Line Symbol */
    /* convert an Esri Simple Line Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    EsriStyleGenerator._convertEsriSLS = /* convert an Esri Simple Line Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    function (symbol) {
        return new olstyle.Style({
            stroke: EsriStyleGenerator._convertOutline(symbol)
        });
    };
    /**
     * @param {?} angle
     * @return {?}
     */
    EsriStyleGenerator._transformAngle = /**
     * @param {?} angle
     * @return {?}
     */
    function (angle) {
        if (angle === 0 || angle === undefined) {
            return undefined;
        }
        /** @type {?} */
        var normalRad = (angle * Math.PI) / 180;
        /** @type {?} */
        var ol3Rad = -normalRad + Math.PI / 2;
        if (ol3Rad < 0) {
            return 2 * Math.PI + ol3Rad;
        }
        else {
            return ol3Rad;
        }
    };
    /* convert an Esri Simple Marker Symbol */
    /* convert an Esri Simple Marker Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    EsriStyleGenerator._convertEsriSMS = /* convert an Esri Simple Marker Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    function (symbol) {
        /** @type {?} */
        var fill = new olstyle.Fill({
            color: EsriStyleGenerator._transformColor(symbol.color)
        });
        /** @type {?} */
        var stroke = symbol.outline
            ? EsriStyleGenerator._convertOutline(symbol.outline)
            : undefined;
        /** @type {?} */
        var radius = EsriStyleGenerator._convertPointToPixel(symbol.size) / 2;
        /** @type {?} */
        var rotation = EsriStyleGenerator._transformAngle(symbol.angle);
        if (symbol.style === 'esriSMSCircle') {
            return new olstyle.Style({
                image: new olstyle.Circle({
                    radius: radius,
                    fill: fill,
                    stroke: stroke
                })
            });
        }
        else if (symbol.style === 'esriSMSCross') {
            return new olstyle.Style({
                image: new olstyle.RegularShape({
                    fill: fill,
                    stroke: stroke,
                    points: 4,
                    radius: radius,
                    radius2: 0,
                    angle: 0,
                    rotation: rotation
                })
            });
        }
        else if (symbol.style === 'esriSMSDiamond') {
            return new olstyle.Style({
                image: new olstyle.RegularShape({
                    fill: fill,
                    stroke: stroke,
                    points: 4,
                    radius: radius,
                    rotation: rotation
                })
            });
        }
        else if (symbol.style === 'esriSMSSquare') {
            return new olstyle.Style({
                image: new olstyle.RegularShape({
                    fill: fill,
                    stroke: stroke,
                    points: 4,
                    radius: radius,
                    angle: Math.PI / 4,
                    rotation: rotation
                })
            });
        }
        else if (symbol.style === 'esriSMSX') {
            return new olstyle.Style({
                image: new olstyle.RegularShape({
                    fill: fill,
                    stroke: stroke,
                    points: 4,
                    radius: radius,
                    radius2: 0,
                    angle: Math.PI / 4,
                    rotation: rotation
                })
            });
        }
        else if (symbol.style === 'esriSMSTriangle') {
            return new olstyle.Style({
                image: new olstyle.RegularShape({
                    fill: fill,
                    stroke: stroke,
                    points: 3,
                    radius: radius,
                    angle: 0,
                    rotation: rotation
                })
            });
        }
    };
    /**
     * @param {?} labelingInfo
     * @param {?} mapUnits
     * @return {?}
     */
    EsriStyleGenerator.prototype._convertLabelingInfo = /**
     * @param {?} labelingInfo
     * @param {?} mapUnits
     * @return {?}
     */
    function (labelingInfo, mapUnits) {
        /** @type {?} */
        var styles = [];
        for (var i = 0, ii = labelingInfo.length; i < ii; ++i) {
            /** @type {?} */
            var labelExpression = labelingInfo[i].labelExpression;
            // only limited support for label expressions
            /** @type {?} */
            var field = labelExpression.substr(labelExpression.indexOf('[') + 1, labelExpression.indexOf(']') - 1);
            /** @type {?} */
            var symbol = labelingInfo[i].symbol;
            /** @type {?} */
            var maxScale = labelingInfo[i].maxScale;
            /** @type {?} */
            var minScale = labelingInfo[i].minScale;
            /** @type {?} */
            var minResolution = null;
            if (maxScale !== 0) {
                minResolution = EsriStyleGenerator._getResolutionForScale(maxScale, mapUnits);
            }
            /** @type {?} */
            var maxResolution = null;
            if (minScale !== 0) {
                maxResolution = EsriStyleGenerator._getResolutionForScale(minScale, mapUnits);
            }
            /** @type {?} */
            var style = this._converters[symbol.type].call(this, symbol);
            styles.push(((/**
             * @return {?}
             */
            function () {
                return (/**
                 * @param {?} feature
                 * @param {?} resolution
                 * @return {?}
                 */
                function (feature, resolution) {
                    /** @type {?} */
                    var visible = true;
                    if (this.minResolution !== null && this.maxResolution !== null) {
                        visible =
                            resolution < this.maxResolution &&
                                resolution >= this.minResolution;
                    }
                    else if (this.minResolution !== null) {
                        visible = resolution >= this.minResolution;
                    }
                    else if (this.maxResolution !== null) {
                        visible = resolution < this.maxResolution;
                    }
                    if (visible) {
                        /** @type {?} */
                        var value = feature.get(this.field);
                        this.style.getText().setText(value);
                        return [this.style];
                    }
                });
            }))().bind({
                minResolution: minResolution,
                maxResolution: maxResolution,
                field: field,
                style: style
            }));
        }
        return styles;
    };
    /**
     * @param {?} renderer
     * @return {?}
     */
    EsriStyleGenerator.prototype._renderSimple = /**
     * @param {?} renderer
     * @return {?}
     */
    function (renderer) {
        /** @type {?} */
        var style = this._converters[renderer.symbol.type].call(this, renderer.symbol);
        return ((/**
         * @return {?}
         */
        function () {
            return (/**
             * @return {?}
             */
            function () {
                return [style];
            });
        }))();
    };
    /**
     * @param {?} renderer
     * @return {?}
     */
    EsriStyleGenerator.prototype._renderClassBreaks = /**
     * @param {?} renderer
     * @return {?}
     */
    function (renderer) {
        /** @type {?} */
        var defaultSymbol = renderer.defaultSymbol;
        /** @type {?} */
        var defaultStyle = this._converters[defaultSymbol.type].call(this, defaultSymbol);
        /** @type {?} */
        var field = renderer.field;
        /** @type {?} */
        var classes = [];
        for (var i = 0, ii = renderer.classBreakInfos.length; i < ii; ++i) {
            /** @type {?} */
            var classBreakInfo = renderer.classBreakInfos[i];
            /** @type {?} */
            var min = void 0;
            if (classBreakInfo.classMinValue === null ||
                classBreakInfo.classMinValue === undefined) {
                if (i === 0) {
                    min = renderer.minValue;
                }
                else {
                    min = renderer.classBreakInfos[i - 1].classMaxValue;
                }
            }
            else {
                min = classBreakInfo.classMinValue;
            }
            /** @type {?} */
            var max = classBreakInfo.classMaxValue;
            /** @type {?} */
            var symbol = classBreakInfo.symbol;
            /** @type {?} */
            var style = this._converters[symbol.type].call(this, symbol);
            classes.push({ min: min, max: max, style: style });
        }
        return ((/**
         * @return {?}
         */
        function () {
            return (/**
             * @param {?} feature
             * @return {?}
             */
            function (feature) {
                /** @type {?} */
                var value = feature.get(field);
                for (var i = 0, ii = classes.length; i < ii; ++i) {
                    /** @type {?} */
                    var condition = void 0;
                    if (i === 0) {
                        condition = value >= classes[i].min && value <= classes[i].max;
                    }
                    else {
                        condition = value > classes[i].min && value <= classes[i].max;
                    }
                    if (condition) {
                        return [classes[i].style];
                    }
                }
                return [defaultStyle];
            });
        }))();
    };
    /**
     * @param {?} renderer
     * @return {?}
     */
    EsriStyleGenerator.prototype._renderUniqueValue = /**
     * @param {?} renderer
     * @return {?}
     */
    function (renderer) {
        /** @type {?} */
        var defaultSymbol = renderer.defaultSymbol;
        /** @type {?} */
        var defaultStyle = [];
        if (defaultSymbol) {
            defaultStyle = [
                this._converters[defaultSymbol.type].call(this, defaultSymbol)
            ];
        }
        /** @type {?} */
        var field = renderer.field1;
        /** @type {?} */
        var infos = renderer.uniqueValueInfos;
        /** @type {?} */
        var me = this;
        return ((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var hash = {};
            for (var i = 0, ii = infos.length; i < ii; ++i) {
                /** @type {?} */
                var info = infos[i];
                /** @type {?} */
                var symbol = info.symbol;
                hash[info.value] = [me._converters[symbol.type].call(me, symbol)];
            }
            return (/**
             * @param {?} feature
             * @return {?}
             */
            function (feature) {
                /** @type {?} */
                var style = hash[feature.get(field)];
                return style ? style : defaultStyle;
            });
        }))();
    };
    /**
     * @param {?} layerInfo
     * @param {?} mapUnits
     * @return {?}
     */
    EsriStyleGenerator.prototype.generateStyle = /**
     * @param {?} layerInfo
     * @param {?} mapUnits
     * @return {?}
     */
    function (layerInfo, mapUnits) {
        /** @type {?} */
        var drawingInfo = layerInfo.drawingInfo;
        /** @type {?} */
        var styleFunctions = [];
        /** @type {?} */
        var drawingInfoStyle = this._renderers[drawingInfo.renderer.type].call(this, drawingInfo.renderer);
        if (drawingInfoStyle !== undefined) {
            styleFunctions.push(drawingInfoStyle);
        }
        if (layerInfo.labelingInfo) {
            /** @type {?} */
            var labelingInfoStyleFunctions = this._convertLabelingInfo(layerInfo.labelingInfo, mapUnits);
            styleFunctions = styleFunctions.concat(labelingInfoStyleFunctions);
        }
        if (styleFunctions.length === 1) {
            return styleFunctions[0];
        }
        else {
            return ((/**
             * @return {?}
             */
            function () {
                return (/**
                 * @param {?} feature
                 * @param {?} resolution
                 * @return {?}
                 */
                function (feature, resolution) {
                    /** @type {?} */
                    var styles = [];
                    for (var i = 0, ii = styleFunctions.length; i < ii; ++i) {
                        /** @type {?} */
                        var result = styleFunctions[i].call(null, feature, resolution);
                        if (result) {
                            styles = styles.concat(result);
                        }
                    }
                    return styles;
                });
            }))();
        }
    };
    return EsriStyleGenerator;
}());
export { EsriStyleGenerator };
if (false) {
    /** @type {?} */
    EsriStyleGenerator.prototype._converters;
    /** @type {?} */
    EsriStyleGenerator.prototype._renderers;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1zdHlsZS1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS91dGlscy9lc3JpLXN0eWxlLWdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFFbEM7SUFJRTtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLGVBQWUsQ0FBQztRQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxlQUFlLENBQUM7UUFDOUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUMsZUFBZSxDQUFDO1FBQzlELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLGVBQWUsQ0FBQztRQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxjQUFjLENBQUM7UUFDNUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ3hELENBQUM7Ozs7O0lBQ00sdUNBQW9COzs7O0lBQTNCLFVBQTRCLEtBQUs7UUFDL0IsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBQ00sa0NBQWU7Ozs7SUFBdEIsVUFBdUIsS0FB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LE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1NBQ3BFO1FBQ0QsSUFBSSxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMvQixPQUFPLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQjthQUFNO1lBQ0wsT0FBTzs7O1lBQUM7Z0JBQ047Ozs7O2dCQUFPLFVBQUMsT0FBTyxFQUFFLFVBQVU7O3dCQUNyQixNQUFNLEdBQUcsRUFBRTtvQkFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFOzs0QkFDakQsTUFBTSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUM7d0JBQ2hFLElBQUksTUFBTSxFQUFFOzRCQUNWLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUNoQztxQkFDRjtvQkFDRCxPQUFPLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQyxFQUFDO1lBQ0osQ0FBQyxFQUFDLEVBQUUsQ0FBQztTQUNOO0lBQ0gsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQXBYRCxJQW9YQzs7OztJQW5YQyx5Q0FBd0I7O0lBQ3hCLHdDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9sc3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgKiBhcyBvbHByb2ogZnJvbSAnb2wvcHJvaic7XHJcblxyXG5leHBvcnQgY2xhc3MgRXNyaVN0eWxlR2VuZXJhdG9yIHtcclxuICBwdWJsaWMgX2NvbnZlcnRlcnM6IGFueTtcclxuICBwdWJsaWMgX3JlbmRlcmVyczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX2NvbnZlcnRlcnMgPSB7fTtcclxuICAgIHRoaXMuX2NvbnZlcnRlcnMuZXNyaVBNUyA9IEVzcmlTdHlsZUdlbmVyYXRvci5fY29udmVydEVzcmlQTVM7XHJcbiAgICB0aGlzLl9jb252ZXJ0ZXJzLmVzcmlTRlMgPSBFc3JpU3R5bGVHZW5lcmF0b3IuX2NvbnZlcnRFc3JpU0ZTO1xyXG4gICAgdGhpcy5fY29udmVydGVycy5lc3JpU0xTID0gRXNyaVN0eWxlR2VuZXJhdG9yLl9jb252ZXJ0RXNyaVNMUztcclxuICAgIHRoaXMuX2NvbnZlcnRlcnMuZXNyaVNNUyA9IEVzcmlTdHlsZUdlbmVyYXRvci5fY29udmVydEVzcmlTTVM7XHJcbiAgICB0aGlzLl9jb252ZXJ0ZXJzLmVzcmlUUyA9IEVzcmlTdHlsZUdlbmVyYXRvci5fY29udmVydEVzcmlUUztcclxuICAgIHRoaXMuX3JlbmRlcmVycyA9IHt9O1xyXG4gICAgdGhpcy5fcmVuZGVyZXJzLnVuaXF1ZVZhbHVlID0gdGhpcy5fcmVuZGVyVW5pcXVlVmFsdWU7XHJcbiAgICB0aGlzLl9yZW5kZXJlcnMuc2ltcGxlID0gdGhpcy5fcmVuZGVyU2ltcGxlO1xyXG4gICAgdGhpcy5fcmVuZGVyZXJzLmNsYXNzQnJlYWtzID0gdGhpcy5fcmVuZGVyQ2xhc3NCcmVha3M7XHJcbiAgfVxyXG4gIHN0YXRpYyBfY29udmVydFBvaW50VG9QaXhlbChwb2ludCkge1xyXG4gICAgcmV0dXJuIHBvaW50IC8gMC43NTtcclxuICB9XHJcbiAgc3RhdGljIF90cmFuc2Zvcm1Db2xvcihjb2xvcik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIC8vIGFscGhhIGNoYW5uZWwgaXMgZGlmZmVyZW50LCBydW5zIGZyb20gMC0yNTUgYnV0IGluIG9sMyBmcm9tIDAtMVxyXG4gICAgcmV0dXJuIFtjb2xvclswXSwgY29sb3JbMV0sIGNvbG9yWzJdLCBjb2xvclszXSAvIDI1NV07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgX2dldFJlc29sdXRpb25Gb3JTY2FsZShzY2FsZSwgdW5pdHMpIHtcclxuICAgIGNvbnN0IGRwaSA9IDI1LjQgLyAwLjI4O1xyXG4gICAgY29uc3QgbXB1ID0gb2xwcm9qLk1FVEVSU19QRVJfVU5JVFt1bml0c107XHJcbiAgICBjb25zdCBpbmNoZXNQZXJNZXRlciA9IDM5LjM3O1xyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc2NhbGUpIC8gKG1wdSAqIGluY2hlc1Blck1ldGVyICogZHBpKTtcclxuICB9XHJcblxyXG4gIC8qIGNvbnZlcnQgYW4gRXNyaSBUZXh0IFN5bWJvbCAqL1xyXG4gIHN0YXRpYyBfY29udmVydEVzcmlUUyhzeW1ib2wpIHtcclxuICAgIGNvbnN0IHJvdGF0aW9uID0gRXNyaVN0eWxlR2VuZXJhdG9yLl90cmFuc2Zvcm1BbmdsZShzeW1ib2wuYW5nbGUpO1xyXG4gICAgY29uc3QgdGV4dCA9IHN5bWJvbC50ZXh0ICE9PSB1bmRlZmluZWQgPyBzeW1ib2wudGV4dCA6IHVuZGVmaW5lZDtcclxuICAgIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgIHRleHQ6IG5ldyBvbHN0eWxlLlRleHQoe1xyXG4gICAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgICAgICAgY29sb3I6IEVzcmlTdHlsZUdlbmVyYXRvci5fdHJhbnNmb3JtQ29sb3Ioc3ltYm9sLmNvbG9yKVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGZvbnQ6XHJcbiAgICAgICAgICBzeW1ib2wuZm9udC5zdHlsZSArXHJcbiAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgc3ltYm9sLmZvbnQud2VpZ2h0ICtcclxuICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICBzeW1ib2wuZm9udC5zaXplICtcclxuICAgICAgICAgICcgcHggJyArXHJcbiAgICAgICAgICBzeW1ib2wuZm9udC5mYW1pbHksXHJcbiAgICAgICAgdGV4dEJhc2VsaW5lOiBzeW1ib2wudmVydGljYWxBbGlnbm1lbnQsXHJcbiAgICAgICAgdGV4dEFsaWduOiBzeW1ib2wuaG9yaXpvbnRhbEFsaWdubWVudCxcclxuICAgICAgICBvZmZzZXRYOiBFc3JpU3R5bGVHZW5lcmF0b3IuX2NvbnZlcnRQb2ludFRvUGl4ZWwoc3ltYm9sLnhvZmZzZXQpLFxyXG4gICAgICAgIG9mZnNldFk6IEVzcmlTdHlsZUdlbmVyYXRvci5fY29udmVydFBvaW50VG9QaXhlbChzeW1ib2wueW9mZnNldCksXHJcbiAgICAgICAgcm90YXRpb24sXHJcbiAgICAgICAgdGV4dFxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qIGNvbnZlcnQgYW4gRXNyaSBQaWN0dXJlIE1hcmtlciBTeW1ib2wgKi9cclxuICBzdGF0aWMgX2NvbnZlcnRFc3JpUE1TKHN5bWJvbCkge1xyXG4gICAgY29uc3Qgc3JjID0gJ2RhdGE6JyArIHN5bWJvbC5jb250ZW50VHlwZSArICc7YmFzZTY0LCAnICsgc3ltYm9sLmltYWdlRGF0YTtcclxuICAgIGNvbnN0IHJvdGF0aW9uID0gRXNyaVN0eWxlR2VuZXJhdG9yLl90cmFuc2Zvcm1BbmdsZShzeW1ib2wuYW5nbGUpO1xyXG5cclxuICAgIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5JY29uKHtcclxuICAgICAgICBzcmMsXHJcbiAgICAgICAgcm90YXRpb25cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gIH1cclxuICAvKiBjb252ZXJ0IGFuIEVzcmkgU2ltcGxlIEZpbGwgU3ltYm9sICovXHJcbiAgc3RhdGljIF9jb252ZXJ0RXNyaVNGUyhzeW1ib2wpIHtcclxuICAgIC8vIHRoZXJlIGlzIG5vIHN1cHBvcnQgaW4gb3BlbmxheWVycyBjdXJyZW50bHkgZm9yIGZpbGwgcGF0dGVybnMsIHNvIHN0eWxlIGlzIG5vdCBpbnRlcnByZXRlZFxyXG4gICAgY29uc3QgZmlsbCA9IG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgICBjb2xvcjogRXNyaVN0eWxlR2VuZXJhdG9yLl90cmFuc2Zvcm1Db2xvcihzeW1ib2wuY29sb3IpXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHN0cm9rZSA9IHN5bWJvbC5vdXRsaW5lXHJcbiAgICAgID8gRXNyaVN0eWxlR2VuZXJhdG9yLl9jb252ZXJ0T3V0bGluZShzeW1ib2wub3V0bGluZSlcclxuICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICBmaWxsLFxyXG4gICAgICBzdHJva2VcclxuICAgIH0pO1xyXG4gIH1cclxuICBzdGF0aWMgX2NvbnZlcnRPdXRsaW5lKG91dGxpbmUpIHtcclxuICAgIGxldCBsaW5lRGFzaDtcclxuICAgIGNvbnN0IGNvbG9yID0gRXNyaVN0eWxlR2VuZXJhdG9yLl90cmFuc2Zvcm1Db2xvcihvdXRsaW5lLmNvbG9yKTtcclxuICAgIGlmIChvdXRsaW5lLnN0eWxlID09PSAnZXNyaVNMU0Rhc2gnKSB7XHJcbiAgICAgIGxpbmVEYXNoID0gWzVdO1xyXG4gICAgfSBlbHNlIGlmIChvdXRsaW5lLnN0eWxlID09PSAnZXNyaVNMU0Rhc2hEb3QnKSB7XHJcbiAgICAgIGxpbmVEYXNoID0gWzUsIDUsIDEsIDJdO1xyXG4gICAgfSBlbHNlIGlmIChvdXRsaW5lLnN0eWxlID09PSAnZXNyaVNMU0Rhc2hEb3REb3QnKSB7XHJcbiAgICAgIGxpbmVEYXNoID0gWzUsIDUsIDEsIDIsIDEsIDJdO1xyXG4gICAgfSBlbHNlIGlmIChvdXRsaW5lLnN0eWxlID09PSAnZXNyaVNMU0RvdCcpIHtcclxuICAgICAgbGluZURhc2ggPSBbMSwgMl07XHJcbiAgICB9IGVsc2UgaWYgKG91dGxpbmUuc3R5bGUgPT09ICdlc3JpU0xTTnVsbCcpIHtcclxuICAgICAgLy8gbGluZSBub3QgdmlzaWJsZSwgbWFrZSBjb2xvciBmdWxseSB0cmFuc3BhcmVudFxyXG4gICAgICBjb2xvclszXSA9IDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgY29sb3IsXHJcbiAgICAgIGxpbmVEYXNoLFxyXG4gICAgICB3aWR0aDogRXNyaVN0eWxlR2VuZXJhdG9yLl9jb252ZXJ0UG9pbnRUb1BpeGVsKG91dGxpbmUud2lkdGgpXHJcbiAgICB9KTtcclxuICB9XHJcbiAgLyogY29udmVydCBhbiBFc3JpIFNpbXBsZSBMaW5lIFN5bWJvbCAqL1xyXG4gIHN0YXRpYyBfY29udmVydEVzcmlTTFMoc3ltYm9sKSB7XHJcbiAgICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICBzdHJva2U6IEVzcmlTdHlsZUdlbmVyYXRvci5fY29udmVydE91dGxpbmUoc3ltYm9sKVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHN0YXRpYyBfdHJhbnNmb3JtQW5nbGUoYW5nbGUpIHtcclxuICAgIGlmIChhbmdsZSA9PT0gMCB8fCBhbmdsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCBub3JtYWxSYWQgPSAoYW5nbGUgKiBNYXRoLlBJKSAvIDE4MDtcclxuICAgIGNvbnN0IG9sM1JhZCA9IC1ub3JtYWxSYWQgKyBNYXRoLlBJIC8gMjtcclxuICAgIGlmIChvbDNSYWQgPCAwKSB7XHJcbiAgICAgIHJldHVybiAyICogTWF0aC5QSSArIG9sM1JhZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBvbDNSYWQ7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qIGNvbnZlcnQgYW4gRXNyaSBTaW1wbGUgTWFya2VyIFN5bWJvbCAqL1xyXG4gIHN0YXRpYyBfY29udmVydEVzcmlTTVMoc3ltYm9sKSB7XHJcbiAgICBjb25zdCBmaWxsID0gbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgIGNvbG9yOiBFc3JpU3R5bGVHZW5lcmF0b3IuX3RyYW5zZm9ybUNvbG9yKHN5bWJvbC5jb2xvcilcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgc3Ryb2tlID0gc3ltYm9sLm91dGxpbmVcclxuICAgICAgPyBFc3JpU3R5bGVHZW5lcmF0b3IuX2NvbnZlcnRPdXRsaW5lKHN5bWJvbC5vdXRsaW5lKVxyXG4gICAgICA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHJhZGl1cyA9IEVzcmlTdHlsZUdlbmVyYXRvci5fY29udmVydFBvaW50VG9QaXhlbChzeW1ib2wuc2l6ZSkgLyAyO1xyXG4gICAgY29uc3Qgcm90YXRpb24gPSBFc3JpU3R5bGVHZW5lcmF0b3IuX3RyYW5zZm9ybUFuZ2xlKHN5bWJvbC5hbmdsZSk7XHJcbiAgICBpZiAoc3ltYm9sLnN0eWxlID09PSAnZXNyaVNNU0NpcmNsZScpIHtcclxuICAgICAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICAgIHJhZGl1cyxcclxuICAgICAgICAgIGZpbGwsXHJcbiAgICAgICAgICBzdHJva2VcclxuICAgICAgICB9KVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoc3ltYm9sLnN0eWxlID09PSAnZXNyaVNNU0Nyb3NzJykge1xyXG4gICAgICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5SZWd1bGFyU2hhcGUoe1xyXG4gICAgICAgICAgZmlsbCxcclxuICAgICAgICAgIHN0cm9rZSxcclxuICAgICAgICAgIHBvaW50czogNCxcclxuICAgICAgICAgIHJhZGl1cyxcclxuICAgICAgICAgIHJhZGl1czI6IDAsXHJcbiAgICAgICAgICBhbmdsZTogMCxcclxuICAgICAgICAgIHJvdGF0aW9uXHJcbiAgICAgICAgfSlcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHN5bWJvbC5zdHlsZSA9PT0gJ2VzcmlTTVNEaWFtb25kJykge1xyXG4gICAgICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5SZWd1bGFyU2hhcGUoe1xyXG4gICAgICAgICAgZmlsbCxcclxuICAgICAgICAgIHN0cm9rZSxcclxuICAgICAgICAgIHBvaW50czogNCxcclxuICAgICAgICAgIHJhZGl1cyxcclxuICAgICAgICAgIHJvdGF0aW9uXHJcbiAgICAgICAgfSlcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHN5bWJvbC5zdHlsZSA9PT0gJ2VzcmlTTVNTcXVhcmUnKSB7XHJcbiAgICAgIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLlJlZ3VsYXJTaGFwZSh7XHJcbiAgICAgICAgICBmaWxsLFxyXG4gICAgICAgICAgc3Ryb2tlLFxyXG4gICAgICAgICAgcG9pbnRzOiA0LFxyXG4gICAgICAgICAgcmFkaXVzLFxyXG4gICAgICAgICAgYW5nbGU6IE1hdGguUEkgLyA0LFxyXG4gICAgICAgICAgcm90YXRpb25cclxuICAgICAgICB9KVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoc3ltYm9sLnN0eWxlID09PSAnZXNyaVNNU1gnKSB7XHJcbiAgICAgIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLlJlZ3VsYXJTaGFwZSh7XHJcbiAgICAgICAgICBmaWxsLFxyXG4gICAgICAgICAgc3Ryb2tlLFxyXG4gICAgICAgICAgcG9pbnRzOiA0LFxyXG4gICAgICAgICAgcmFkaXVzLFxyXG4gICAgICAgICAgcmFkaXVzMjogMCxcclxuICAgICAgICAgIGFuZ2xlOiBNYXRoLlBJIC8gNCxcclxuICAgICAgICAgIHJvdGF0aW9uXHJcbiAgICAgICAgfSlcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHN5bWJvbC5zdHlsZSA9PT0gJ2VzcmlTTVNUcmlhbmdsZScpIHtcclxuICAgICAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuUmVndWxhclNoYXBlKHtcclxuICAgICAgICAgIGZpbGwsXHJcbiAgICAgICAgICBzdHJva2UsXHJcbiAgICAgICAgICBwb2ludHM6IDMsXHJcbiAgICAgICAgICByYWRpdXMsXHJcbiAgICAgICAgICBhbmdsZTogMCxcclxuICAgICAgICAgIHJvdGF0aW9uXHJcbiAgICAgICAgfSlcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfY29udmVydExhYmVsaW5nSW5mbyhsYWJlbGluZ0luZm8sIG1hcFVuaXRzKSB7XHJcbiAgICBjb25zdCBzdHlsZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwLCBpaSA9IGxhYmVsaW5nSW5mby5sZW5ndGg7IGkgPCBpaTsgKytpKSB7XHJcbiAgICAgIGNvbnN0IGxhYmVsRXhwcmVzc2lvbiA9IGxhYmVsaW5nSW5mb1tpXS5sYWJlbEV4cHJlc3Npb247XHJcbiAgICAgIC8vIG9ubHkgbGltaXRlZCBzdXBwb3J0IGZvciBsYWJlbCBleHByZXNzaW9uc1xyXG4gICAgICBjb25zdCBmaWVsZCA9IGxhYmVsRXhwcmVzc2lvbi5zdWJzdHIoXHJcbiAgICAgICAgbGFiZWxFeHByZXNzaW9uLmluZGV4T2YoJ1snKSArIDEsXHJcbiAgICAgICAgbGFiZWxFeHByZXNzaW9uLmluZGV4T2YoJ10nKSAtIDFcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgc3ltYm9sID0gbGFiZWxpbmdJbmZvW2ldLnN5bWJvbDtcclxuICAgICAgY29uc3QgbWF4U2NhbGUgPSBsYWJlbGluZ0luZm9baV0ubWF4U2NhbGU7XHJcbiAgICAgIGNvbnN0IG1pblNjYWxlID0gbGFiZWxpbmdJbmZvW2ldLm1pblNjYWxlO1xyXG4gICAgICBsZXQgbWluUmVzb2x1dGlvbiA9IG51bGw7XHJcbiAgICAgIGlmIChtYXhTY2FsZSAhPT0gMCkge1xyXG4gICAgICAgIG1pblJlc29sdXRpb24gPSBFc3JpU3R5bGVHZW5lcmF0b3IuX2dldFJlc29sdXRpb25Gb3JTY2FsZShcclxuICAgICAgICAgIG1heFNjYWxlLFxyXG4gICAgICAgICAgbWFwVW5pdHNcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBtYXhSZXNvbHV0aW9uID0gbnVsbDtcclxuICAgICAgaWYgKG1pblNjYWxlICE9PSAwKSB7XHJcbiAgICAgICAgbWF4UmVzb2x1dGlvbiA9IEVzcmlTdHlsZUdlbmVyYXRvci5fZ2V0UmVzb2x1dGlvbkZvclNjYWxlKFxyXG4gICAgICAgICAgbWluU2NhbGUsXHJcbiAgICAgICAgICBtYXBVbml0c1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLl9jb252ZXJ0ZXJzW3N5bWJvbC50eXBlXS5jYWxsKHRoaXMsIHN5bWJvbCk7XHJcbiAgICAgIHN0eWxlcy5wdXNoKFxyXG4gICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oZmVhdHVyZSwgcmVzb2x1dGlvbikge1xyXG4gICAgICAgICAgICBsZXQgdmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblJlc29sdXRpb24gIT09IG51bGwgJiYgdGhpcy5tYXhSZXNvbHV0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgdmlzaWJsZSA9XHJcbiAgICAgICAgICAgICAgICByZXNvbHV0aW9uIDwgdGhpcy5tYXhSZXNvbHV0aW9uICYmXHJcbiAgICAgICAgICAgICAgICByZXNvbHV0aW9uID49IHRoaXMubWluUmVzb2x1dGlvbjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1pblJlc29sdXRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICB2aXNpYmxlID0gcmVzb2x1dGlvbiA+PSB0aGlzLm1pblJlc29sdXRpb247XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXhSZXNvbHV0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgdmlzaWJsZSA9IHJlc29sdXRpb24gPCB0aGlzLm1heFJlc29sdXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZpc2libGUpIHtcclxuICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGZlYXR1cmUuZ2V0KHRoaXMuZmllbGQpO1xyXG4gICAgICAgICAgICAgIHRoaXMuc3R5bGUuZ2V0VGV4dCgpLnNldFRleHQodmFsdWUpO1xyXG4gICAgICAgICAgICAgIHJldHVybiBbdGhpcy5zdHlsZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSkoKS5iaW5kKHtcclxuICAgICAgICAgIG1pblJlc29sdXRpb24sXHJcbiAgICAgICAgICBtYXhSZXNvbHV0aW9uLFxyXG4gICAgICAgICAgZmllbGQsXHJcbiAgICAgICAgICBzdHlsZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3R5bGVzO1xyXG4gIH1cclxuXHJcbiAgX3JlbmRlclNpbXBsZShyZW5kZXJlcikge1xyXG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLl9jb252ZXJ0ZXJzW3JlbmRlcmVyLnN5bWJvbC50eXBlXS5jYWxsKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICByZW5kZXJlci5zeW1ib2xcclxuICAgICk7XHJcbiAgICByZXR1cm4gKCgpID0+IHtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICByZXR1cm4gW3N0eWxlXTtcclxuICAgICAgfTtcclxuICAgIH0pKCk7XHJcbiAgfVxyXG4gIF9yZW5kZXJDbGFzc0JyZWFrcyhyZW5kZXJlcikge1xyXG4gICAgY29uc3QgZGVmYXVsdFN5bWJvbCA9IHJlbmRlcmVyLmRlZmF1bHRTeW1ib2w7XHJcbiAgICBjb25zdCBkZWZhdWx0U3R5bGUgPSB0aGlzLl9jb252ZXJ0ZXJzW2RlZmF1bHRTeW1ib2wudHlwZV0uY2FsbChcclxuICAgICAgdGhpcyxcclxuICAgICAgZGVmYXVsdFN5bWJvbFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGZpZWxkID0gcmVuZGVyZXIuZmllbGQ7XHJcbiAgICBjb25zdCBjbGFzc2VzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMCwgaWkgPSByZW5kZXJlci5jbGFzc0JyZWFrSW5mb3MubGVuZ3RoOyBpIDwgaWk7ICsraSkge1xyXG4gICAgICBjb25zdCBjbGFzc0JyZWFrSW5mbyA9IHJlbmRlcmVyLmNsYXNzQnJlYWtJbmZvc1tpXTtcclxuICAgICAgbGV0IG1pbjtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGNsYXNzQnJlYWtJbmZvLmNsYXNzTWluVmFsdWUgPT09IG51bGwgfHxcclxuICAgICAgICBjbGFzc0JyZWFrSW5mby5jbGFzc01pblZhbHVlID09PSB1bmRlZmluZWRcclxuICAgICAgKSB7XHJcbiAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgIG1pbiA9IHJlbmRlcmVyLm1pblZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtaW4gPSByZW5kZXJlci5jbGFzc0JyZWFrSW5mb3NbaSAtIDFdLmNsYXNzTWF4VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1pbiA9IGNsYXNzQnJlYWtJbmZvLmNsYXNzTWluVmFsdWU7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbWF4ID0gY2xhc3NCcmVha0luZm8uY2xhc3NNYXhWYWx1ZTtcclxuICAgICAgY29uc3Qgc3ltYm9sID0gY2xhc3NCcmVha0luZm8uc3ltYm9sO1xyXG4gICAgICBjb25zdCBzdHlsZSA9IHRoaXMuX2NvbnZlcnRlcnNbc3ltYm9sLnR5cGVdLmNhbGwodGhpcywgc3ltYm9sKTtcclxuICAgICAgY2xhc3Nlcy5wdXNoKHsgbWluLCBtYXgsIHN0eWxlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICgoKSA9PiB7XHJcbiAgICAgIHJldHVybiAoZmVhdHVyZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZmVhdHVyZS5nZXQoZmllbGQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBpaSA9IGNsYXNzZXMubGVuZ3RoOyBpIDwgaWk7ICsraSkge1xyXG4gICAgICAgICAgbGV0IGNvbmRpdGlvbjtcclxuICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbmRpdGlvbiA9IHZhbHVlID49IGNsYXNzZXNbaV0ubWluICYmIHZhbHVlIDw9IGNsYXNzZXNbaV0ubWF4O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uZGl0aW9uID0gdmFsdWUgPiBjbGFzc2VzW2ldLm1pbiAmJiB2YWx1ZSA8PSBjbGFzc2VzW2ldLm1heDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjb25kaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtjbGFzc2VzW2ldLnN0eWxlXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtkZWZhdWx0U3R5bGVdO1xyXG4gICAgICB9O1xyXG4gICAgfSkoKTtcclxuICB9XHJcbiAgX3JlbmRlclVuaXF1ZVZhbHVlKHJlbmRlcmVyKSB7XHJcbiAgICBjb25zdCBkZWZhdWx0U3ltYm9sID0gcmVuZGVyZXIuZGVmYXVsdFN5bWJvbDtcclxuICAgIGxldCBkZWZhdWx0U3R5bGUgPSBbXTtcclxuICAgIGlmIChkZWZhdWx0U3ltYm9sKSB7XHJcbiAgICAgIGRlZmF1bHRTdHlsZSA9IFtcclxuICAgICAgICB0aGlzLl9jb252ZXJ0ZXJzW2RlZmF1bHRTeW1ib2wudHlwZV0uY2FsbCh0aGlzLCBkZWZhdWx0U3ltYm9sKVxyXG4gICAgICBdO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZmllbGQgPSByZW5kZXJlci5maWVsZDE7XHJcbiAgICBjb25zdCBpbmZvcyA9IHJlbmRlcmVyLnVuaXF1ZVZhbHVlSW5mb3M7XHJcbiAgICBjb25zdCBtZSA9IHRoaXM7XHJcbiAgICByZXR1cm4gKCgpID0+IHtcclxuICAgICAgY29uc3QgaGFzaCA9IHt9O1xyXG4gICAgICBmb3IgKGxldCBpID0gMCwgaWkgPSBpbmZvcy5sZW5ndGg7IGkgPCBpaTsgKytpKSB7XHJcbiAgICAgICAgY29uc3QgaW5mbyA9IGluZm9zW2ldO1xyXG4gICAgICAgIGNvbnN0IHN5bWJvbCA9IGluZm8uc3ltYm9sO1xyXG4gICAgICAgIGhhc2hbaW5mby52YWx1ZV0gPSBbbWUuX2NvbnZlcnRlcnNbc3ltYm9sLnR5cGVdLmNhbGwobWUsIHN5bWJvbCldO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gKGZlYXR1cmUpID0+IHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IGhhc2hbZmVhdHVyZS5nZXQoZmllbGQpXTtcclxuICAgICAgICByZXR1cm4gc3R5bGUgPyBzdHlsZSA6IGRlZmF1bHRTdHlsZTtcclxuICAgICAgfTtcclxuICAgIH0pKCk7XHJcbiAgfVxyXG4gIGdlbmVyYXRlU3R5bGUobGF5ZXJJbmZvLCBtYXBVbml0cykge1xyXG4gICAgY29uc3QgZHJhd2luZ0luZm8gPSBsYXllckluZm8uZHJhd2luZ0luZm87XHJcbiAgICBsZXQgc3R5bGVGdW5jdGlvbnMgPSBbXTtcclxuICAgIGNvbnN0IGRyYXdpbmdJbmZvU3R5bGUgPSB0aGlzLl9yZW5kZXJlcnNbZHJhd2luZ0luZm8ucmVuZGVyZXIudHlwZV0uY2FsbChcclxuICAgICAgdGhpcyxcclxuICAgICAgZHJhd2luZ0luZm8ucmVuZGVyZXJcclxuICAgICk7XHJcbiAgICBpZiAoZHJhd2luZ0luZm9TdHlsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN0eWxlRnVuY3Rpb25zLnB1c2goZHJhd2luZ0luZm9TdHlsZSk7XHJcbiAgICB9XHJcbiAgICBpZiAobGF5ZXJJbmZvLmxhYmVsaW5nSW5mbykge1xyXG4gICAgICBjb25zdCBsYWJlbGluZ0luZm9TdHlsZUZ1bmN0aW9ucyA9IHRoaXMuX2NvbnZlcnRMYWJlbGluZ0luZm8oXHJcbiAgICAgICAgbGF5ZXJJbmZvLmxhYmVsaW5nSW5mbyxcclxuICAgICAgICBtYXBVbml0c1xyXG4gICAgICApO1xyXG4gICAgICBzdHlsZUZ1bmN0aW9ucyA9IHN0eWxlRnVuY3Rpb25zLmNvbmNhdChsYWJlbGluZ0luZm9TdHlsZUZ1bmN0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBpZiAoc3R5bGVGdW5jdGlvbnMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHJldHVybiBzdHlsZUZ1bmN0aW9uc1swXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoZmVhdHVyZSwgcmVzb2x1dGlvbikgPT4ge1xyXG4gICAgICAgICAgbGV0IHN0eWxlcyA9IFtdO1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlpID0gc3R5bGVGdW5jdGlvbnMubGVuZ3RoOyBpIDwgaWk7ICsraSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBzdHlsZUZ1bmN0aW9uc1tpXS5jYWxsKG51bGwsIGZlYXR1cmUsIHJlc29sdXRpb24pO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgc3R5bGVzID0gc3R5bGVzLmNvbmNhdChyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gc3R5bGVzO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==