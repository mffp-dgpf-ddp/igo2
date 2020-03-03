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
        var dpi = 96;
        /** @type {?} */
        var mpu = olproj.METERS_PER_UNIT[units];
        /** @type {?} */
        var inchesPerMeter = 39.3701;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1zdHlsZS1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS91dGlscy9lc3JpLXN0eWxlLWdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFFbEM7SUFJRTtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLGVBQWUsQ0FBQztRQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxlQUFlLENBQUM7UUFDOUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUMsZUFBZSxDQUFDO1FBQzlELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLGVBQWUsQ0FBQztRQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxjQUFjLENBQUM7UUFDNUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ3hELENBQUM7Ozs7O0lBQ00sdUNBQW9COzs7O0lBQTNCLFVBQTRCLEtBQUs7UUFDL0IsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBQ00sa0NBQWU7Ozs7SUFBdEIsVUFBdUIsS0FB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MEJBQTBCLENBQUMsQ0FBQztTQUNwRTtRQUNELElBQUksY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUI7YUFBTTtZQUNMLE9BQU87OztZQUFDO2dCQUNOOzs7OztnQkFBTyxVQUFDLE9BQU8sRUFBRSxVQUFVOzt3QkFDckIsTUFBTSxHQUFHLEVBQUU7b0JBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTs7NEJBQ2pELE1BQU0sR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDO3dCQUNoRSxJQUFJLE1BQU0sRUFBRTs0QkFDVixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDaEM7cUJBQ0Y7b0JBQ0QsT0FBTyxNQUFNLENBQUM7Z0JBQ2hCLENBQUMsRUFBQztZQUNKLENBQUMsRUFBQyxFQUFFLENBQUM7U0FDTjtJQUNILENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFwWEQsSUFvWEM7Ozs7SUFuWEMseUNBQXdCOztJQUN4Qix3Q0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVzcmlTdHlsZUdlbmVyYXRvciB7XHJcbiAgcHVibGljIF9jb252ZXJ0ZXJzOiBhbnk7XHJcbiAgcHVibGljIF9yZW5kZXJlcnM6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9jb252ZXJ0ZXJzID0ge307XHJcbiAgICB0aGlzLl9jb252ZXJ0ZXJzLmVzcmlQTVMgPSBFc3JpU3R5bGVHZW5lcmF0b3IuX2NvbnZlcnRFc3JpUE1TO1xyXG4gICAgdGhpcy5fY29udmVydGVycy5lc3JpU0ZTID0gRXNyaVN0eWxlR2VuZXJhdG9yLl9jb252ZXJ0RXNyaVNGUztcclxuICAgIHRoaXMuX2NvbnZlcnRlcnMuZXNyaVNMUyA9IEVzcmlTdHlsZUdlbmVyYXRvci5fY29udmVydEVzcmlTTFM7XHJcbiAgICB0aGlzLl9jb252ZXJ0ZXJzLmVzcmlTTVMgPSBFc3JpU3R5bGVHZW5lcmF0b3IuX2NvbnZlcnRFc3JpU01TO1xyXG4gICAgdGhpcy5fY29udmVydGVycy5lc3JpVFMgPSBFc3JpU3R5bGVHZW5lcmF0b3IuX2NvbnZlcnRFc3JpVFM7XHJcbiAgICB0aGlzLl9yZW5kZXJlcnMgPSB7fTtcclxuICAgIHRoaXMuX3JlbmRlcmVycy51bmlxdWVWYWx1ZSA9IHRoaXMuX3JlbmRlclVuaXF1ZVZhbHVlO1xyXG4gICAgdGhpcy5fcmVuZGVyZXJzLnNpbXBsZSA9IHRoaXMuX3JlbmRlclNpbXBsZTtcclxuICAgIHRoaXMuX3JlbmRlcmVycy5jbGFzc0JyZWFrcyA9IHRoaXMuX3JlbmRlckNsYXNzQnJlYWtzO1xyXG4gIH1cclxuICBzdGF0aWMgX2NvbnZlcnRQb2ludFRvUGl4ZWwocG9pbnQpIHtcclxuICAgIHJldHVybiBwb2ludCAvIDAuNzU7XHJcbiAgfVxyXG4gIHN0YXRpYyBfdHJhbnNmb3JtQ29sb3IoY29sb3IpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XHJcbiAgICAvLyBhbHBoYSBjaGFubmVsIGlzIGRpZmZlcmVudCwgcnVucyBmcm9tIDAtMjU1IGJ1dCBpbiBvbDMgZnJvbSAwLTFcclxuICAgIHJldHVybiBbY29sb3JbMF0sIGNvbG9yWzFdLCBjb2xvclsyXSwgY29sb3JbM10gLyAyNTVdO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIF9nZXRSZXNvbHV0aW9uRm9yU2NhbGUoc2NhbGUsIHVuaXRzKSB7XHJcbiAgICBjb25zdCBkcGkgPSA5NjtcclxuICAgIGNvbnN0IG1wdSA9IG9scHJvai5NRVRFUlNfUEVSX1VOSVRbdW5pdHNdO1xyXG4gICAgY29uc3QgaW5jaGVzUGVyTWV0ZXIgPSAzOS4zNzAxO1xyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc2NhbGUpIC8gKG1wdSAqIGluY2hlc1Blck1ldGVyICogZHBpKTtcclxuICB9XHJcblxyXG4gIC8qIGNvbnZlcnQgYW4gRXNyaSBUZXh0IFN5bWJvbCAqL1xyXG4gIHN0YXRpYyBfY29udmVydEVzcmlUUyhzeW1ib2wpIHtcclxuICAgIGNvbnN0IHJvdGF0aW9uID0gRXNyaVN0eWxlR2VuZXJhdG9yLl90cmFuc2Zvcm1BbmdsZShzeW1ib2wuYW5nbGUpO1xyXG4gICAgY29uc3QgdGV4dCA9IHN5bWJvbC50ZXh0ICE9PSB1bmRlZmluZWQgPyBzeW1ib2wudGV4dCA6IHVuZGVmaW5lZDtcclxuICAgIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgIHRleHQ6IG5ldyBvbHN0eWxlLlRleHQoe1xyXG4gICAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgICAgICAgY29sb3I6IEVzcmlTdHlsZUdlbmVyYXRvci5fdHJhbnNmb3JtQ29sb3Ioc3ltYm9sLmNvbG9yKVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGZvbnQ6XHJcbiAgICAgICAgICBzeW1ib2wuZm9udC5zdHlsZSArXHJcbiAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgc3ltYm9sLmZvbnQud2VpZ2h0ICtcclxuICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICBzeW1ib2wuZm9udC5zaXplICtcclxuICAgICAgICAgICcgcHggJyArXHJcbiAgICAgICAgICBzeW1ib2wuZm9udC5mYW1pbHksXHJcbiAgICAgICAgdGV4dEJhc2VsaW5lOiBzeW1ib2wudmVydGljYWxBbGlnbm1lbnQsXHJcbiAgICAgICAgdGV4dEFsaWduOiBzeW1ib2wuaG9yaXpvbnRhbEFsaWdubWVudCxcclxuICAgICAgICBvZmZzZXRYOiBFc3JpU3R5bGVHZW5lcmF0b3IuX2NvbnZlcnRQb2ludFRvUGl4ZWwoc3ltYm9sLnhvZmZzZXQpLFxyXG4gICAgICAgIG9mZnNldFk6IEVzcmlTdHlsZUdlbmVyYXRvci5fY29udmVydFBvaW50VG9QaXhlbChzeW1ib2wueW9mZnNldCksXHJcbiAgICAgICAgcm90YXRpb24sXHJcbiAgICAgICAgdGV4dFxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qIGNvbnZlcnQgYW4gRXNyaSBQaWN0dXJlIE1hcmtlciBTeW1ib2wgKi9cclxuICBzdGF0aWMgX2NvbnZlcnRFc3JpUE1TKHN5bWJvbCkge1xyXG4gICAgY29uc3Qgc3JjID0gJ2RhdGE6JyArIHN5bWJvbC5jb250ZW50VHlwZSArICc7YmFzZTY0LCAnICsgc3ltYm9sLmltYWdlRGF0YTtcclxuICAgIGNvbnN0IHJvdGF0aW9uID0gRXNyaVN0eWxlR2VuZXJhdG9yLl90cmFuc2Zvcm1BbmdsZShzeW1ib2wuYW5nbGUpO1xyXG5cclxuICAgIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5JY29uKHtcclxuICAgICAgICBzcmMsXHJcbiAgICAgICAgcm90YXRpb25cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gIH1cclxuICAvKiBjb252ZXJ0IGFuIEVzcmkgU2ltcGxlIEZpbGwgU3ltYm9sICovXHJcbiAgc3RhdGljIF9jb252ZXJ0RXNyaVNGUyhzeW1ib2wpIHtcclxuICAgIC8vIHRoZXJlIGlzIG5vIHN1cHBvcnQgaW4gb3BlbmxheWVycyBjdXJyZW50bHkgZm9yIGZpbGwgcGF0dGVybnMsIHNvIHN0eWxlIGlzIG5vdCBpbnRlcnByZXRlZFxyXG4gICAgY29uc3QgZmlsbCA9IG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgICBjb2xvcjogRXNyaVN0eWxlR2VuZXJhdG9yLl90cmFuc2Zvcm1Db2xvcihzeW1ib2wuY29sb3IpXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHN0cm9rZSA9IHN5bWJvbC5vdXRsaW5lXHJcbiAgICAgID8gRXNyaVN0eWxlR2VuZXJhdG9yLl9jb252ZXJ0T3V0bGluZShzeW1ib2wub3V0bGluZSlcclxuICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICBmaWxsLFxyXG4gICAgICBzdHJva2VcclxuICAgIH0pO1xyXG4gIH1cclxuICBzdGF0aWMgX2NvbnZlcnRPdXRsaW5lKG91dGxpbmUpIHtcclxuICAgIGxldCBsaW5lRGFzaDtcclxuICAgIGNvbnN0IGNvbG9yID0gRXNyaVN0eWxlR2VuZXJhdG9yLl90cmFuc2Zvcm1Db2xvcihvdXRsaW5lLmNvbG9yKTtcclxuICAgIGlmIChvdXRsaW5lLnN0eWxlID09PSAnZXNyaVNMU0Rhc2gnKSB7XHJcbiAgICAgIGxpbmVEYXNoID0gWzVdO1xyXG4gICAgfSBlbHNlIGlmIChvdXRsaW5lLnN0eWxlID09PSAnZXNyaVNMU0Rhc2hEb3QnKSB7XHJcbiAgICAgIGxpbmVEYXNoID0gWzUsIDUsIDEsIDJdO1xyXG4gICAgfSBlbHNlIGlmIChvdXRsaW5lLnN0eWxlID09PSAnZXNyaVNMU0Rhc2hEb3REb3QnKSB7XHJcbiAgICAgIGxpbmVEYXNoID0gWzUsIDUsIDEsIDIsIDEsIDJdO1xyXG4gICAgfSBlbHNlIGlmIChvdXRsaW5lLnN0eWxlID09PSAnZXNyaVNMU0RvdCcpIHtcclxuICAgICAgbGluZURhc2ggPSBbMSwgMl07XHJcbiAgICB9IGVsc2UgaWYgKG91dGxpbmUuc3R5bGUgPT09ICdlc3JpU0xTTnVsbCcpIHtcclxuICAgICAgLy8gbGluZSBub3QgdmlzaWJsZSwgbWFrZSBjb2xvciBmdWxseSB0cmFuc3BhcmVudFxyXG4gICAgICBjb2xvclszXSA9IDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgY29sb3IsXHJcbiAgICAgIGxpbmVEYXNoLFxyXG4gICAgICB3aWR0aDogRXNyaVN0eWxlR2VuZXJhdG9yLl9jb252ZXJ0UG9pbnRUb1BpeGVsKG91dGxpbmUud2lkdGgpXHJcbiAgICB9KTtcclxuICB9XHJcbiAgLyogY29udmVydCBhbiBFc3JpIFNpbXBsZSBMaW5lIFN5bWJvbCAqL1xyXG4gIHN0YXRpYyBfY29udmVydEVzcmlTTFMoc3ltYm9sKSB7XHJcbiAgICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICBzdHJva2U6IEVzcmlTdHlsZUdlbmVyYXRvci5fY29udmVydE91dGxpbmUoc3ltYm9sKVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHN0YXRpYyBfdHJhbnNmb3JtQW5nbGUoYW5nbGUpIHtcclxuICAgIGlmIChhbmdsZSA9PT0gMCB8fCBhbmdsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCBub3JtYWxSYWQgPSAoYW5nbGUgKiBNYXRoLlBJKSAvIDE4MDtcclxuICAgIGNvbnN0IG9sM1JhZCA9IC1ub3JtYWxSYWQgKyBNYXRoLlBJIC8gMjtcclxuICAgIGlmIChvbDNSYWQgPCAwKSB7XHJcbiAgICAgIHJldHVybiAyICogTWF0aC5QSSArIG9sM1JhZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBvbDNSYWQ7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qIGNvbnZlcnQgYW4gRXNyaSBTaW1wbGUgTWFya2VyIFN5bWJvbCAqL1xyXG4gIHN0YXRpYyBfY29udmVydEVzcmlTTVMoc3ltYm9sKSB7XHJcbiAgICBjb25zdCBmaWxsID0gbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgIGNvbG9yOiBFc3JpU3R5bGVHZW5lcmF0b3IuX3RyYW5zZm9ybUNvbG9yKHN5bWJvbC5jb2xvcilcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgc3Ryb2tlID0gc3ltYm9sLm91dGxpbmVcclxuICAgICAgPyBFc3JpU3R5bGVHZW5lcmF0b3IuX2NvbnZlcnRPdXRsaW5lKHN5bWJvbC5vdXRsaW5lKVxyXG4gICAgICA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHJhZGl1cyA9IEVzcmlTdHlsZUdlbmVyYXRvci5fY29udmVydFBvaW50VG9QaXhlbChzeW1ib2wuc2l6ZSkgLyAyO1xyXG4gICAgY29uc3Qgcm90YXRpb24gPSBFc3JpU3R5bGVHZW5lcmF0b3IuX3RyYW5zZm9ybUFuZ2xlKHN5bWJvbC5hbmdsZSk7XHJcbiAgICBpZiAoc3ltYm9sLnN0eWxlID09PSAnZXNyaVNNU0NpcmNsZScpIHtcclxuICAgICAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICAgIHJhZGl1cyxcclxuICAgICAgICAgIGZpbGwsXHJcbiAgICAgICAgICBzdHJva2VcclxuICAgICAgICB9KVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoc3ltYm9sLnN0eWxlID09PSAnZXNyaVNNU0Nyb3NzJykge1xyXG4gICAgICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5SZWd1bGFyU2hhcGUoe1xyXG4gICAgICAgICAgZmlsbCxcclxuICAgICAgICAgIHN0cm9rZSxcclxuICAgICAgICAgIHBvaW50czogNCxcclxuICAgICAgICAgIHJhZGl1cyxcclxuICAgICAgICAgIHJhZGl1czI6IDAsXHJcbiAgICAgICAgICBhbmdsZTogMCxcclxuICAgICAgICAgIHJvdGF0aW9uXHJcbiAgICAgICAgfSlcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHN5bWJvbC5zdHlsZSA9PT0gJ2VzcmlTTVNEaWFtb25kJykge1xyXG4gICAgICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5SZWd1bGFyU2hhcGUoe1xyXG4gICAgICAgICAgZmlsbCxcclxuICAgICAgICAgIHN0cm9rZSxcclxuICAgICAgICAgIHBvaW50czogNCxcclxuICAgICAgICAgIHJhZGl1cyxcclxuICAgICAgICAgIHJvdGF0aW9uXHJcbiAgICAgICAgfSlcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHN5bWJvbC5zdHlsZSA9PT0gJ2VzcmlTTVNTcXVhcmUnKSB7XHJcbiAgICAgIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLlJlZ3VsYXJTaGFwZSh7XHJcbiAgICAgICAgICBmaWxsLFxyXG4gICAgICAgICAgc3Ryb2tlLFxyXG4gICAgICAgICAgcG9pbnRzOiA0LFxyXG4gICAgICAgICAgcmFkaXVzLFxyXG4gICAgICAgICAgYW5nbGU6IE1hdGguUEkgLyA0LFxyXG4gICAgICAgICAgcm90YXRpb25cclxuICAgICAgICB9KVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoc3ltYm9sLnN0eWxlID09PSAnZXNyaVNNU1gnKSB7XHJcbiAgICAgIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLlJlZ3VsYXJTaGFwZSh7XHJcbiAgICAgICAgICBmaWxsLFxyXG4gICAgICAgICAgc3Ryb2tlLFxyXG4gICAgICAgICAgcG9pbnRzOiA0LFxyXG4gICAgICAgICAgcmFkaXVzLFxyXG4gICAgICAgICAgcmFkaXVzMjogMCxcclxuICAgICAgICAgIGFuZ2xlOiBNYXRoLlBJIC8gNCxcclxuICAgICAgICAgIHJvdGF0aW9uXHJcbiAgICAgICAgfSlcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHN5bWJvbC5zdHlsZSA9PT0gJ2VzcmlTTVNUcmlhbmdsZScpIHtcclxuICAgICAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuUmVndWxhclNoYXBlKHtcclxuICAgICAgICAgIGZpbGwsXHJcbiAgICAgICAgICBzdHJva2UsXHJcbiAgICAgICAgICBwb2ludHM6IDMsXHJcbiAgICAgICAgICByYWRpdXMsXHJcbiAgICAgICAgICBhbmdsZTogMCxcclxuICAgICAgICAgIHJvdGF0aW9uXHJcbiAgICAgICAgfSlcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfY29udmVydExhYmVsaW5nSW5mbyhsYWJlbGluZ0luZm8sIG1hcFVuaXRzKSB7XHJcbiAgICBjb25zdCBzdHlsZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwLCBpaSA9IGxhYmVsaW5nSW5mby5sZW5ndGg7IGkgPCBpaTsgKytpKSB7XHJcbiAgICAgIGNvbnN0IGxhYmVsRXhwcmVzc2lvbiA9IGxhYmVsaW5nSW5mb1tpXS5sYWJlbEV4cHJlc3Npb247XHJcbiAgICAgIC8vIG9ubHkgbGltaXRlZCBzdXBwb3J0IGZvciBsYWJlbCBleHByZXNzaW9uc1xyXG4gICAgICBjb25zdCBmaWVsZCA9IGxhYmVsRXhwcmVzc2lvbi5zdWJzdHIoXHJcbiAgICAgICAgbGFiZWxFeHByZXNzaW9uLmluZGV4T2YoJ1snKSArIDEsXHJcbiAgICAgICAgbGFiZWxFeHByZXNzaW9uLmluZGV4T2YoJ10nKSAtIDFcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgc3ltYm9sID0gbGFiZWxpbmdJbmZvW2ldLnN5bWJvbDtcclxuICAgICAgY29uc3QgbWF4U2NhbGUgPSBsYWJlbGluZ0luZm9baV0ubWF4U2NhbGU7XHJcbiAgICAgIGNvbnN0IG1pblNjYWxlID0gbGFiZWxpbmdJbmZvW2ldLm1pblNjYWxlO1xyXG4gICAgICBsZXQgbWluUmVzb2x1dGlvbiA9IG51bGw7XHJcbiAgICAgIGlmIChtYXhTY2FsZSAhPT0gMCkge1xyXG4gICAgICAgIG1pblJlc29sdXRpb24gPSBFc3JpU3R5bGVHZW5lcmF0b3IuX2dldFJlc29sdXRpb25Gb3JTY2FsZShcclxuICAgICAgICAgIG1heFNjYWxlLFxyXG4gICAgICAgICAgbWFwVW5pdHNcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBtYXhSZXNvbHV0aW9uID0gbnVsbDtcclxuICAgICAgaWYgKG1pblNjYWxlICE9PSAwKSB7XHJcbiAgICAgICAgbWF4UmVzb2x1dGlvbiA9IEVzcmlTdHlsZUdlbmVyYXRvci5fZ2V0UmVzb2x1dGlvbkZvclNjYWxlKFxyXG4gICAgICAgICAgbWluU2NhbGUsXHJcbiAgICAgICAgICBtYXBVbml0c1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLl9jb252ZXJ0ZXJzW3N5bWJvbC50eXBlXS5jYWxsKHRoaXMsIHN5bWJvbCk7XHJcbiAgICAgIHN0eWxlcy5wdXNoKFxyXG4gICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oZmVhdHVyZSwgcmVzb2x1dGlvbikge1xyXG4gICAgICAgICAgICBsZXQgdmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblJlc29sdXRpb24gIT09IG51bGwgJiYgdGhpcy5tYXhSZXNvbHV0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgdmlzaWJsZSA9XHJcbiAgICAgICAgICAgICAgICByZXNvbHV0aW9uIDwgdGhpcy5tYXhSZXNvbHV0aW9uICYmXHJcbiAgICAgICAgICAgICAgICByZXNvbHV0aW9uID49IHRoaXMubWluUmVzb2x1dGlvbjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1pblJlc29sdXRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICB2aXNpYmxlID0gcmVzb2x1dGlvbiA+PSB0aGlzLm1pblJlc29sdXRpb247XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXhSZXNvbHV0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgdmlzaWJsZSA9IHJlc29sdXRpb24gPCB0aGlzLm1heFJlc29sdXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZpc2libGUpIHtcclxuICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGZlYXR1cmUuZ2V0KHRoaXMuZmllbGQpO1xyXG4gICAgICAgICAgICAgIHRoaXMuc3R5bGUuZ2V0VGV4dCgpLnNldFRleHQodmFsdWUpO1xyXG4gICAgICAgICAgICAgIHJldHVybiBbdGhpcy5zdHlsZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSkoKS5iaW5kKHtcclxuICAgICAgICAgIG1pblJlc29sdXRpb24sXHJcbiAgICAgICAgICBtYXhSZXNvbHV0aW9uLFxyXG4gICAgICAgICAgZmllbGQsXHJcbiAgICAgICAgICBzdHlsZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3R5bGVzO1xyXG4gIH1cclxuXHJcbiAgX3JlbmRlclNpbXBsZShyZW5kZXJlcikge1xyXG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLl9jb252ZXJ0ZXJzW3JlbmRlcmVyLnN5bWJvbC50eXBlXS5jYWxsKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICByZW5kZXJlci5zeW1ib2xcclxuICAgICk7XHJcbiAgICByZXR1cm4gKCgpID0+IHtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICByZXR1cm4gW3N0eWxlXTtcclxuICAgICAgfTtcclxuICAgIH0pKCk7XHJcbiAgfVxyXG4gIF9yZW5kZXJDbGFzc0JyZWFrcyhyZW5kZXJlcikge1xyXG4gICAgY29uc3QgZGVmYXVsdFN5bWJvbCA9IHJlbmRlcmVyLmRlZmF1bHRTeW1ib2w7XHJcbiAgICBjb25zdCBkZWZhdWx0U3R5bGUgPSB0aGlzLl9jb252ZXJ0ZXJzW2RlZmF1bHRTeW1ib2wudHlwZV0uY2FsbChcclxuICAgICAgdGhpcyxcclxuICAgICAgZGVmYXVsdFN5bWJvbFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGZpZWxkID0gcmVuZGVyZXIuZmllbGQ7XHJcbiAgICBjb25zdCBjbGFzc2VzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMCwgaWkgPSByZW5kZXJlci5jbGFzc0JyZWFrSW5mb3MubGVuZ3RoOyBpIDwgaWk7ICsraSkge1xyXG4gICAgICBjb25zdCBjbGFzc0JyZWFrSW5mbyA9IHJlbmRlcmVyLmNsYXNzQnJlYWtJbmZvc1tpXTtcclxuICAgICAgbGV0IG1pbjtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGNsYXNzQnJlYWtJbmZvLmNsYXNzTWluVmFsdWUgPT09IG51bGwgfHxcclxuICAgICAgICBjbGFzc0JyZWFrSW5mby5jbGFzc01pblZhbHVlID09PSB1bmRlZmluZWRcclxuICAgICAgKSB7XHJcbiAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgIG1pbiA9IHJlbmRlcmVyLm1pblZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtaW4gPSByZW5kZXJlci5jbGFzc0JyZWFrSW5mb3NbaSAtIDFdLmNsYXNzTWF4VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1pbiA9IGNsYXNzQnJlYWtJbmZvLmNsYXNzTWluVmFsdWU7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbWF4ID0gY2xhc3NCcmVha0luZm8uY2xhc3NNYXhWYWx1ZTtcclxuICAgICAgY29uc3Qgc3ltYm9sID0gY2xhc3NCcmVha0luZm8uc3ltYm9sO1xyXG4gICAgICBjb25zdCBzdHlsZSA9IHRoaXMuX2NvbnZlcnRlcnNbc3ltYm9sLnR5cGVdLmNhbGwodGhpcywgc3ltYm9sKTtcclxuICAgICAgY2xhc3Nlcy5wdXNoKHsgbWluLCBtYXgsIHN0eWxlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICgoKSA9PiB7XHJcbiAgICAgIHJldHVybiAoZmVhdHVyZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZmVhdHVyZS5nZXQoZmllbGQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBpaSA9IGNsYXNzZXMubGVuZ3RoOyBpIDwgaWk7ICsraSkge1xyXG4gICAgICAgICAgbGV0IGNvbmRpdGlvbjtcclxuICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbmRpdGlvbiA9IHZhbHVlID49IGNsYXNzZXNbaV0ubWluICYmIHZhbHVlIDw9IGNsYXNzZXNbaV0ubWF4O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uZGl0aW9uID0gdmFsdWUgPiBjbGFzc2VzW2ldLm1pbiAmJiB2YWx1ZSA8PSBjbGFzc2VzW2ldLm1heDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjb25kaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtjbGFzc2VzW2ldLnN0eWxlXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtkZWZhdWx0U3R5bGVdO1xyXG4gICAgICB9O1xyXG4gICAgfSkoKTtcclxuICB9XHJcbiAgX3JlbmRlclVuaXF1ZVZhbHVlKHJlbmRlcmVyKSB7XHJcbiAgICBjb25zdCBkZWZhdWx0U3ltYm9sID0gcmVuZGVyZXIuZGVmYXVsdFN5bWJvbDtcclxuICAgIGxldCBkZWZhdWx0U3R5bGUgPSBbXTtcclxuICAgIGlmIChkZWZhdWx0U3ltYm9sKSB7XHJcbiAgICAgIGRlZmF1bHRTdHlsZSA9IFtcclxuICAgICAgICB0aGlzLl9jb252ZXJ0ZXJzW2RlZmF1bHRTeW1ib2wudHlwZV0uY2FsbCh0aGlzLCBkZWZhdWx0U3ltYm9sKVxyXG4gICAgICBdO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZmllbGQgPSByZW5kZXJlci5maWVsZDE7XHJcbiAgICBjb25zdCBpbmZvcyA9IHJlbmRlcmVyLnVuaXF1ZVZhbHVlSW5mb3M7XHJcbiAgICBjb25zdCBtZSA9IHRoaXM7XHJcbiAgICByZXR1cm4gKCgpID0+IHtcclxuICAgICAgY29uc3QgaGFzaCA9IHt9O1xyXG4gICAgICBmb3IgKGxldCBpID0gMCwgaWkgPSBpbmZvcy5sZW5ndGg7IGkgPCBpaTsgKytpKSB7XHJcbiAgICAgICAgY29uc3QgaW5mbyA9IGluZm9zW2ldO1xyXG4gICAgICAgIGNvbnN0IHN5bWJvbCA9IGluZm8uc3ltYm9sO1xyXG4gICAgICAgIGhhc2hbaW5mby52YWx1ZV0gPSBbbWUuX2NvbnZlcnRlcnNbc3ltYm9sLnR5cGVdLmNhbGwobWUsIHN5bWJvbCldO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gKGZlYXR1cmUpID0+IHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IGhhc2hbZmVhdHVyZS5nZXQoZmllbGQpXTtcclxuICAgICAgICByZXR1cm4gc3R5bGUgPyBzdHlsZSA6IGRlZmF1bHRTdHlsZTtcclxuICAgICAgfTtcclxuICAgIH0pKCk7XHJcbiAgfVxyXG4gIGdlbmVyYXRlU3R5bGUobGF5ZXJJbmZvLCBtYXBVbml0cykge1xyXG4gICAgY29uc3QgZHJhd2luZ0luZm8gPSBsYXllckluZm8uZHJhd2luZ0luZm87XHJcbiAgICBsZXQgc3R5bGVGdW5jdGlvbnMgPSBbXTtcclxuICAgIGNvbnN0IGRyYXdpbmdJbmZvU3R5bGUgPSB0aGlzLl9yZW5kZXJlcnNbZHJhd2luZ0luZm8ucmVuZGVyZXIudHlwZV0uY2FsbChcclxuICAgICAgdGhpcyxcclxuICAgICAgZHJhd2luZ0luZm8ucmVuZGVyZXJcclxuICAgICk7XHJcbiAgICBpZiAoZHJhd2luZ0luZm9TdHlsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN0eWxlRnVuY3Rpb25zLnB1c2goZHJhd2luZ0luZm9TdHlsZSk7XHJcbiAgICB9XHJcbiAgICBpZiAobGF5ZXJJbmZvLmxhYmVsaW5nSW5mbykge1xyXG4gICAgICBjb25zdCBsYWJlbGluZ0luZm9TdHlsZUZ1bmN0aW9ucyA9IHRoaXMuX2NvbnZlcnRMYWJlbGluZ0luZm8oXHJcbiAgICAgICAgbGF5ZXJJbmZvLmxhYmVsaW5nSW5mbyxcclxuICAgICAgICBtYXBVbml0c1xyXG4gICAgICApO1xyXG4gICAgICBzdHlsZUZ1bmN0aW9ucyA9IHN0eWxlRnVuY3Rpb25zLmNvbmNhdChsYWJlbGluZ0luZm9TdHlsZUZ1bmN0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBpZiAoc3R5bGVGdW5jdGlvbnMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHJldHVybiBzdHlsZUZ1bmN0aW9uc1swXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoZmVhdHVyZSwgcmVzb2x1dGlvbikgPT4ge1xyXG4gICAgICAgICAgbGV0IHN0eWxlcyA9IFtdO1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlpID0gc3R5bGVGdW5jdGlvbnMubGVuZ3RoOyBpIDwgaWk7ICsraSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBzdHlsZUZ1bmN0aW9uc1tpXS5jYWxsKG51bGwsIGZlYXR1cmUsIHJlc29sdXRpb24pO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgc3R5bGVzID0gc3R5bGVzLmNvbmNhdChyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gc3R5bGVzO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==