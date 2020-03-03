/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as olstyle from 'ol/style';
import * as olproj from 'ol/proj';
export class EsriStyleGenerator {
    constructor() {
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
    static _convertPointToPixel(point) {
        return point / 0.75;
    }
    /**
     * @param {?} color
     * @return {?}
     */
    static _transformColor(color) {
        // alpha channel is different, runs from 0-255 but in ol3 from 0-1
        return [color[0], color[1], color[2], color[3] / 255];
    }
    /**
     * @param {?} scale
     * @param {?} units
     * @return {?}
     */
    static _getResolutionForScale(scale, units) {
        /** @type {?} */
        const dpi = 96;
        /** @type {?} */
        const mpu = olproj.METERS_PER_UNIT[units];
        /** @type {?} */
        const inchesPerMeter = 39.3701;
        return parseFloat(scale) / (mpu * inchesPerMeter * dpi);
    }
    /* convert an Esri Text Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    static _convertEsriTS(symbol) {
        /** @type {?} */
        const rotation = EsriStyleGenerator._transformAngle(symbol.angle);
        /** @type {?} */
        const text = symbol.text !== undefined ? symbol.text : undefined;
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
                rotation,
                text
            })
        });
    }
    /* convert an Esri Picture Marker Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    static _convertEsriPMS(symbol) {
        /** @type {?} */
        const src = 'data:' + symbol.contentType + ';base64, ' + symbol.imageData;
        /** @type {?} */
        const rotation = EsriStyleGenerator._transformAngle(symbol.angle);
        return new olstyle.Style({
            image: new olstyle.Icon({
                src,
                rotation
            })
        });
    }
    /* convert an Esri Simple Fill Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    static _convertEsriSFS(symbol) {
        // there is no support in openlayers currently for fill patterns, so style is not interpreted
        /** @type {?} */
        const fill = new olstyle.Fill({
            color: EsriStyleGenerator._transformColor(symbol.color)
        });
        /** @type {?} */
        const stroke = symbol.outline
            ? EsriStyleGenerator._convertOutline(symbol.outline)
            : undefined;
        return new olstyle.Style({
            fill,
            stroke
        });
    }
    /**
     * @param {?} outline
     * @return {?}
     */
    static _convertOutline(outline) {
        /** @type {?} */
        let lineDash;
        /** @type {?} */
        const color = EsriStyleGenerator._transformColor(outline.color);
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
            color,
            lineDash,
            width: EsriStyleGenerator._convertPointToPixel(outline.width)
        });
    }
    /* convert an Esri Simple Line Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    static _convertEsriSLS(symbol) {
        return new olstyle.Style({
            stroke: EsriStyleGenerator._convertOutline(symbol)
        });
    }
    /**
     * @param {?} angle
     * @return {?}
     */
    static _transformAngle(angle) {
        if (angle === 0 || angle === undefined) {
            return undefined;
        }
        /** @type {?} */
        const normalRad = (angle * Math.PI) / 180;
        /** @type {?} */
        const ol3Rad = -normalRad + Math.PI / 2;
        if (ol3Rad < 0) {
            return 2 * Math.PI + ol3Rad;
        }
        else {
            return ol3Rad;
        }
    }
    /* convert an Esri Simple Marker Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    static _convertEsriSMS(symbol) {
        /** @type {?} */
        const fill = new olstyle.Fill({
            color: EsriStyleGenerator._transformColor(symbol.color)
        });
        /** @type {?} */
        const stroke = symbol.outline
            ? EsriStyleGenerator._convertOutline(symbol.outline)
            : undefined;
        /** @type {?} */
        const radius = EsriStyleGenerator._convertPointToPixel(symbol.size) / 2;
        /** @type {?} */
        const rotation = EsriStyleGenerator._transformAngle(symbol.angle);
        if (symbol.style === 'esriSMSCircle') {
            return new olstyle.Style({
                image: new olstyle.Circle({
                    radius,
                    fill,
                    stroke
                })
            });
        }
        else if (symbol.style === 'esriSMSCross') {
            return new olstyle.Style({
                image: new olstyle.RegularShape({
                    fill,
                    stroke,
                    points: 4,
                    radius,
                    radius2: 0,
                    angle: 0,
                    rotation
                })
            });
        }
        else if (symbol.style === 'esriSMSDiamond') {
            return new olstyle.Style({
                image: new olstyle.RegularShape({
                    fill,
                    stroke,
                    points: 4,
                    radius,
                    rotation
                })
            });
        }
        else if (symbol.style === 'esriSMSSquare') {
            return new olstyle.Style({
                image: new olstyle.RegularShape({
                    fill,
                    stroke,
                    points: 4,
                    radius,
                    angle: Math.PI / 4,
                    rotation
                })
            });
        }
        else if (symbol.style === 'esriSMSX') {
            return new olstyle.Style({
                image: new olstyle.RegularShape({
                    fill,
                    stroke,
                    points: 4,
                    radius,
                    radius2: 0,
                    angle: Math.PI / 4,
                    rotation
                })
            });
        }
        else if (symbol.style === 'esriSMSTriangle') {
            return new olstyle.Style({
                image: new olstyle.RegularShape({
                    fill,
                    stroke,
                    points: 3,
                    radius,
                    angle: 0,
                    rotation
                })
            });
        }
    }
    /**
     * @param {?} labelingInfo
     * @param {?} mapUnits
     * @return {?}
     */
    _convertLabelingInfo(labelingInfo, mapUnits) {
        /** @type {?} */
        const styles = [];
        for (let i = 0, ii = labelingInfo.length; i < ii; ++i) {
            /** @type {?} */
            const labelExpression = labelingInfo[i].labelExpression;
            // only limited support for label expressions
            /** @type {?} */
            const field = labelExpression.substr(labelExpression.indexOf('[') + 1, labelExpression.indexOf(']') - 1);
            /** @type {?} */
            const symbol = labelingInfo[i].symbol;
            /** @type {?} */
            const maxScale = labelingInfo[i].maxScale;
            /** @type {?} */
            const minScale = labelingInfo[i].minScale;
            /** @type {?} */
            let minResolution = null;
            if (maxScale !== 0) {
                minResolution = EsriStyleGenerator._getResolutionForScale(maxScale, mapUnits);
            }
            /** @type {?} */
            let maxResolution = null;
            if (minScale !== 0) {
                maxResolution = EsriStyleGenerator._getResolutionForScale(minScale, mapUnits);
            }
            /** @type {?} */
            const style = this._converters[symbol.type].call(this, symbol);
            styles.push(((/**
             * @return {?}
             */
            () => {
                return (/**
                 * @param {?} feature
                 * @param {?} resolution
                 * @return {?}
                 */
                function (feature, resolution) {
                    /** @type {?} */
                    let visible = true;
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
                        const value = feature.get(this.field);
                        this.style.getText().setText(value);
                        return [this.style];
                    }
                });
            }))().bind({
                minResolution,
                maxResolution,
                field,
                style
            }));
        }
        return styles;
    }
    /**
     * @param {?} renderer
     * @return {?}
     */
    _renderSimple(renderer) {
        /** @type {?} */
        const style = this._converters[renderer.symbol.type].call(this, renderer.symbol);
        return ((/**
         * @return {?}
         */
        () => {
            return (/**
             * @return {?}
             */
            () => {
                return [style];
            });
        }))();
    }
    /**
     * @param {?} renderer
     * @return {?}
     */
    _renderClassBreaks(renderer) {
        /** @type {?} */
        const defaultSymbol = renderer.defaultSymbol;
        /** @type {?} */
        const defaultStyle = this._converters[defaultSymbol.type].call(this, defaultSymbol);
        /** @type {?} */
        const field = renderer.field;
        /** @type {?} */
        const classes = [];
        for (let i = 0, ii = renderer.classBreakInfos.length; i < ii; ++i) {
            /** @type {?} */
            const classBreakInfo = renderer.classBreakInfos[i];
            /** @type {?} */
            let min;
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
            const max = classBreakInfo.classMaxValue;
            /** @type {?} */
            const symbol = classBreakInfo.symbol;
            /** @type {?} */
            const style = this._converters[symbol.type].call(this, symbol);
            classes.push({ min, max, style });
        }
        return ((/**
         * @return {?}
         */
        () => {
            return (/**
             * @param {?} feature
             * @return {?}
             */
            (feature) => {
                /** @type {?} */
                const value = feature.get(field);
                for (let i = 0, ii = classes.length; i < ii; ++i) {
                    /** @type {?} */
                    let condition;
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
    }
    /**
     * @param {?} renderer
     * @return {?}
     */
    _renderUniqueValue(renderer) {
        /** @type {?} */
        const defaultSymbol = renderer.defaultSymbol;
        /** @type {?} */
        let defaultStyle = [];
        if (defaultSymbol) {
            defaultStyle = [
                this._converters[defaultSymbol.type].call(this, defaultSymbol)
            ];
        }
        /** @type {?} */
        const field = renderer.field1;
        /** @type {?} */
        const infos = renderer.uniqueValueInfos;
        /** @type {?} */
        const me = this;
        return ((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const hash = {};
            for (let i = 0, ii = infos.length; i < ii; ++i) {
                /** @type {?} */
                const info = infos[i];
                /** @type {?} */
                const symbol = info.symbol;
                hash[info.value] = [me._converters[symbol.type].call(me, symbol)];
            }
            return (/**
             * @param {?} feature
             * @return {?}
             */
            (feature) => {
                /** @type {?} */
                const style = hash[feature.get(field)];
                return style ? style : defaultStyle;
            });
        }))();
    }
    /**
     * @param {?} layerInfo
     * @param {?} mapUnits
     * @return {?}
     */
    generateStyle(layerInfo, mapUnits) {
        /** @type {?} */
        const drawingInfo = layerInfo.drawingInfo;
        /** @type {?} */
        let styleFunctions = [];
        /** @type {?} */
        const drawingInfoStyle = this._renderers[drawingInfo.renderer.type].call(this, drawingInfo.renderer);
        if (drawingInfoStyle !== undefined) {
            styleFunctions.push(drawingInfoStyle);
        }
        if (layerInfo.labelingInfo) {
            /** @type {?} */
            const labelingInfoStyleFunctions = this._convertLabelingInfo(layerInfo.labelingInfo, mapUnits);
            styleFunctions = styleFunctions.concat(labelingInfoStyleFunctions);
        }
        if (styleFunctions.length === 1) {
            return styleFunctions[0];
        }
        else {
            return ((/**
             * @return {?}
             */
            () => {
                return (/**
                 * @param {?} feature
                 * @param {?} resolution
                 * @return {?}
                 */
                (feature, resolution) => {
                    /** @type {?} */
                    let styles = [];
                    for (let i = 0, ii = styleFunctions.length; i < ii; ++i) {
                        /** @type {?} */
                        const result = styleFunctions[i].call(null, feature, resolution);
                        if (result) {
                            styles = styles.concat(result);
                        }
                    }
                    return styles;
                });
            }))();
        }
    }
}
if (false) {
    /** @type {?} */
    EsriStyleGenerator.prototype._converters;
    /** @type {?} */
    EsriStyleGenerator.prototype._renderers;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1zdHlsZS1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS91dGlscy9lc3JpLXN0eWxlLWdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFFbEMsTUFBTSxPQUFPLGtCQUFrQjtJQUk3QjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLGVBQWUsQ0FBQztRQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxlQUFlLENBQUM7UUFDOUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUMsZUFBZSxDQUFDO1FBQzlELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLGVBQWUsQ0FBQztRQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxjQUFjLENBQUM7UUFDNUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ3hELENBQUM7Ozs7O0lBQ0QsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEtBQUs7UUFDL0IsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBQ0QsTUFBTSxD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LEVBQUUsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7OzhCQUNqRCxNQUFNLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQzt3QkFDaEUsSUFBSSxNQUFNLEVBQUU7NEJBQ1YsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ2hDO3FCQUNGO29CQUNELE9BQU8sTUFBTSxDQUFDO2dCQUNoQixDQUFDLEVBQUM7WUFDSixDQUFDLEVBQUMsRUFBRSxDQUFDO1NBQ047SUFDSCxDQUFDO0NBQ0Y7OztJQW5YQyx5Q0FBd0I7O0lBQ3hCLHdDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9sc3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgKiBhcyBvbHByb2ogZnJvbSAnb2wvcHJvaic7XHJcblxyXG5leHBvcnQgY2xhc3MgRXNyaVN0eWxlR2VuZXJhdG9yIHtcclxuICBwdWJsaWMgX2NvbnZlcnRlcnM6IGFueTtcclxuICBwdWJsaWMgX3JlbmRlcmVyczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX2NvbnZlcnRlcnMgPSB7fTtcclxuICAgIHRoaXMuX2NvbnZlcnRlcnMuZXNyaVBNUyA9IEVzcmlTdHlsZUdlbmVyYXRvci5fY29udmVydEVzcmlQTVM7XHJcbiAgICB0aGlzLl9jb252ZXJ0ZXJzLmVzcmlTRlMgPSBFc3JpU3R5bGVHZW5lcmF0b3IuX2NvbnZlcnRFc3JpU0ZTO1xyXG4gICAgdGhpcy5fY29udmVydGVycy5lc3JpU0xTID0gRXNyaVN0eWxlR2VuZXJhdG9yLl9jb252ZXJ0RXNyaVNMUztcclxuICAgIHRoaXMuX2NvbnZlcnRlcnMuZXNyaVNNUyA9IEVzcmlTdHlsZUdlbmVyYXRvci5fY29udmVydEVzcmlTTVM7XHJcbiAgICB0aGlzLl9jb252ZXJ0ZXJzLmVzcmlUUyA9IEVzcmlTdHlsZUdlbmVyYXRvci5fY29udmVydEVzcmlUUztcclxuICAgIHRoaXMuX3JlbmRlcmVycyA9IHt9O1xyXG4gICAgdGhpcy5fcmVuZGVyZXJzLnVuaXF1ZVZhbHVlID0gdGhpcy5fcmVuZGVyVW5pcXVlVmFsdWU7XHJcbiAgICB0aGlzLl9yZW5kZXJlcnMuc2ltcGxlID0gdGhpcy5fcmVuZGVyU2ltcGxlO1xyXG4gICAgdGhpcy5fcmVuZGVyZXJzLmNsYXNzQnJlYWtzID0gdGhpcy5fcmVuZGVyQ2xhc3NCcmVha3M7XHJcbiAgfVxyXG4gIHN0YXRpYyBfY29udmVydFBvaW50VG9QaXhlbChwb2ludCkge1xyXG4gICAgcmV0dXJuIHBvaW50IC8gMC43NTtcclxuICB9XHJcbiAgc3RhdGljIF90cmFuc2Zvcm1Db2xvcihjb2xvcik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIC8vIGFscGhhIGNoYW5uZWwgaXMgZGlmZmVyZW50LCBydW5zIGZyb20gMC0yNTUgYnV0IGluIG9sMyBmcm9tIDAtMVxyXG4gICAgcmV0dXJuIFtjb2xvclswXSwgY29sb3JbMV0sIGNvbG9yWzJdLCBjb2xvclszXSAvIDI1NV07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgX2dldFJlc29sdXRpb25Gb3JTY2FsZShzY2FsZSwgdW5pdHMpIHtcclxuICAgIGNvbnN0IGRwaSA9IDk2O1xyXG4gICAgY29uc3QgbXB1ID0gb2xwcm9qLk1FVEVSU19QRVJfVU5JVFt1bml0c107XHJcbiAgICBjb25zdCBpbmNoZXNQZXJNZXRlciA9IDM5LjM3MDE7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzY2FsZSkgLyAobXB1ICogaW5jaGVzUGVyTWV0ZXIgKiBkcGkpO1xyXG4gIH1cclxuXHJcbiAgLyogY29udmVydCBhbiBFc3JpIFRleHQgU3ltYm9sICovXHJcbiAgc3RhdGljIF9jb252ZXJ0RXNyaVRTKHN5bWJvbCkge1xyXG4gICAgY29uc3Qgcm90YXRpb24gPSBFc3JpU3R5bGVHZW5lcmF0b3IuX3RyYW5zZm9ybUFuZ2xlKHN5bWJvbC5hbmdsZSk7XHJcbiAgICBjb25zdCB0ZXh0ID0gc3ltYm9sLnRleHQgIT09IHVuZGVmaW5lZCA/IHN5bWJvbC50ZXh0IDogdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgdGV4dDogbmV3IG9sc3R5bGUuVGV4dCh7XHJcbiAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICBjb2xvcjogRXNyaVN0eWxlR2VuZXJhdG9yLl90cmFuc2Zvcm1Db2xvcihzeW1ib2wuY29sb3IpXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgZm9udDpcclxuICAgICAgICAgIHN5bWJvbC5mb250LnN0eWxlICtcclxuICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICBzeW1ib2wuZm9udC53ZWlnaHQgK1xyXG4gICAgICAgICAgJyAnICtcclxuICAgICAgICAgIHN5bWJvbC5mb250LnNpemUgK1xyXG4gICAgICAgICAgJyBweCAnICtcclxuICAgICAgICAgIHN5bWJvbC5mb250LmZhbWlseSxcclxuICAgICAgICB0ZXh0QmFzZWxpbmU6IHN5bWJvbC52ZXJ0aWNhbEFsaWdubWVudCxcclxuICAgICAgICB0ZXh0QWxpZ246IHN5bWJvbC5ob3Jpem9udGFsQWxpZ25tZW50LFxyXG4gICAgICAgIG9mZnNldFg6IEVzcmlTdHlsZUdlbmVyYXRvci5fY29udmVydFBvaW50VG9QaXhlbChzeW1ib2wueG9mZnNldCksXHJcbiAgICAgICAgb2Zmc2V0WTogRXNyaVN0eWxlR2VuZXJhdG9yLl9jb252ZXJ0UG9pbnRUb1BpeGVsKHN5bWJvbC55b2Zmc2V0KSxcclxuICAgICAgICByb3RhdGlvbixcclxuICAgICAgICB0ZXh0XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICB9XHJcbiAgLyogY29udmVydCBhbiBFc3JpIFBpY3R1cmUgTWFya2VyIFN5bWJvbCAqL1xyXG4gIHN0YXRpYyBfY29udmVydEVzcmlQTVMoc3ltYm9sKSB7XHJcbiAgICBjb25zdCBzcmMgPSAnZGF0YTonICsgc3ltYm9sLmNvbnRlbnRUeXBlICsgJztiYXNlNjQsICcgKyBzeW1ib2wuaW1hZ2VEYXRhO1xyXG4gICAgY29uc3Qgcm90YXRpb24gPSBFc3JpU3R5bGVHZW5lcmF0b3IuX3RyYW5zZm9ybUFuZ2xlKHN5bWJvbC5hbmdsZSk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkljb24oe1xyXG4gICAgICAgIHNyYyxcclxuICAgICAgICByb3RhdGlvblxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qIGNvbnZlcnQgYW4gRXNyaSBTaW1wbGUgRmlsbCBTeW1ib2wgKi9cclxuICBzdGF0aWMgX2NvbnZlcnRFc3JpU0ZTKHN5bWJvbCkge1xyXG4gICAgLy8gdGhlcmUgaXMgbm8gc3VwcG9ydCBpbiBvcGVubGF5ZXJzIGN1cnJlbnRseSBmb3IgZmlsbCBwYXR0ZXJucywgc28gc3R5bGUgaXMgbm90IGludGVycHJldGVkXHJcbiAgICBjb25zdCBmaWxsID0gbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgIGNvbG9yOiBFc3JpU3R5bGVHZW5lcmF0b3IuX3RyYW5zZm9ybUNvbG9yKHN5bWJvbC5jb2xvcilcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgc3Ryb2tlID0gc3ltYm9sLm91dGxpbmVcclxuICAgICAgPyBFc3JpU3R5bGVHZW5lcmF0b3IuX2NvbnZlcnRPdXRsaW5lKHN5bWJvbC5vdXRsaW5lKVxyXG4gICAgICA6IHVuZGVmaW5lZDtcclxuICAgIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgIGZpbGwsXHJcbiAgICAgIHN0cm9rZVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHN0YXRpYyBfY29udmVydE91dGxpbmUob3V0bGluZSkge1xyXG4gICAgbGV0IGxpbmVEYXNoO1xyXG4gICAgY29uc3QgY29sb3IgPSBFc3JpU3R5bGVHZW5lcmF0b3IuX3RyYW5zZm9ybUNvbG9yKG91dGxpbmUuY29sb3IpO1xyXG4gICAgaWYgKG91dGxpbmUuc3R5bGUgPT09ICdlc3JpU0xTRGFzaCcpIHtcclxuICAgICAgbGluZURhc2ggPSBbNV07XHJcbiAgICB9IGVsc2UgaWYgKG91dGxpbmUuc3R5bGUgPT09ICdlc3JpU0xTRGFzaERvdCcpIHtcclxuICAgICAgbGluZURhc2ggPSBbNSwgNSwgMSwgMl07XHJcbiAgICB9IGVsc2UgaWYgKG91dGxpbmUuc3R5bGUgPT09ICdlc3JpU0xTRGFzaERvdERvdCcpIHtcclxuICAgICAgbGluZURhc2ggPSBbNSwgNSwgMSwgMiwgMSwgMl07XHJcbiAgICB9IGVsc2UgaWYgKG91dGxpbmUuc3R5bGUgPT09ICdlc3JpU0xTRG90Jykge1xyXG4gICAgICBsaW5lRGFzaCA9IFsxLCAyXTtcclxuICAgIH0gZWxzZSBpZiAob3V0bGluZS5zdHlsZSA9PT0gJ2VzcmlTTFNOdWxsJykge1xyXG4gICAgICAvLyBsaW5lIG5vdCB2aXNpYmxlLCBtYWtlIGNvbG9yIGZ1bGx5IHRyYW5zcGFyZW50XHJcbiAgICAgIGNvbG9yWzNdID0gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICBjb2xvcixcclxuICAgICAgbGluZURhc2gsXHJcbiAgICAgIHdpZHRoOiBFc3JpU3R5bGVHZW5lcmF0b3IuX2NvbnZlcnRQb2ludFRvUGl4ZWwob3V0bGluZS53aWR0aClcclxuICAgIH0pO1xyXG4gIH1cclxuICAvKiBjb252ZXJ0IGFuIEVzcmkgU2ltcGxlIExpbmUgU3ltYm9sICovXHJcbiAgc3RhdGljIF9jb252ZXJ0RXNyaVNMUyhzeW1ib2wpIHtcclxuICAgIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgIHN0cm9rZTogRXNyaVN0eWxlR2VuZXJhdG9yLl9jb252ZXJ0T3V0bGluZShzeW1ib2wpXHJcbiAgICB9KTtcclxuICB9XHJcbiAgc3RhdGljIF90cmFuc2Zvcm1BbmdsZShhbmdsZSkge1xyXG4gICAgaWYgKGFuZ2xlID09PSAwIHx8IGFuZ2xlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGNvbnN0IG5vcm1hbFJhZCA9IChhbmdsZSAqIE1hdGguUEkpIC8gMTgwO1xyXG4gICAgY29uc3Qgb2wzUmFkID0gLW5vcm1hbFJhZCArIE1hdGguUEkgLyAyO1xyXG4gICAgaWYgKG9sM1JhZCA8IDApIHtcclxuICAgICAgcmV0dXJuIDIgKiBNYXRoLlBJICsgb2wzUmFkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG9sM1JhZDtcclxuICAgIH1cclxuICB9XHJcbiAgLyogY29udmVydCBhbiBFc3JpIFNpbXBsZSBNYXJrZXIgU3ltYm9sICovXHJcbiAgc3RhdGljIF9jb252ZXJ0RXNyaVNNUyhzeW1ib2wpIHtcclxuICAgIGNvbnN0IGZpbGwgPSBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgY29sb3I6IEVzcmlTdHlsZUdlbmVyYXRvci5fdHJhbnNmb3JtQ29sb3Ioc3ltYm9sLmNvbG9yKVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBzdHJva2UgPSBzeW1ib2wub3V0bGluZVxyXG4gICAgICA/IEVzcmlTdHlsZUdlbmVyYXRvci5fY29udmVydE91dGxpbmUoc3ltYm9sLm91dGxpbmUpXHJcbiAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgcmFkaXVzID0gRXNyaVN0eWxlR2VuZXJhdG9yLl9jb252ZXJ0UG9pbnRUb1BpeGVsKHN5bWJvbC5zaXplKSAvIDI7XHJcbiAgICBjb25zdCByb3RhdGlvbiA9IEVzcmlTdHlsZUdlbmVyYXRvci5fdHJhbnNmb3JtQW5nbGUoc3ltYm9sLmFuZ2xlKTtcclxuICAgIGlmIChzeW1ib2wuc3R5bGUgPT09ICdlc3JpU01TQ2lyY2xlJykge1xyXG4gICAgICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICAgICAgcmFkaXVzLFxyXG4gICAgICAgICAgZmlsbCxcclxuICAgICAgICAgIHN0cm9rZVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChzeW1ib2wuc3R5bGUgPT09ICdlc3JpU01TQ3Jvc3MnKSB7XHJcbiAgICAgIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLlJlZ3VsYXJTaGFwZSh7XHJcbiAgICAgICAgICBmaWxsLFxyXG4gICAgICAgICAgc3Ryb2tlLFxyXG4gICAgICAgICAgcG9pbnRzOiA0LFxyXG4gICAgICAgICAgcmFkaXVzLFxyXG4gICAgICAgICAgcmFkaXVzMjogMCxcclxuICAgICAgICAgIGFuZ2xlOiAwLFxyXG4gICAgICAgICAgcm90YXRpb25cclxuICAgICAgICB9KVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoc3ltYm9sLnN0eWxlID09PSAnZXNyaVNNU0RpYW1vbmQnKSB7XHJcbiAgICAgIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLlJlZ3VsYXJTaGFwZSh7XHJcbiAgICAgICAgICBmaWxsLFxyXG4gICAgICAgICAgc3Ryb2tlLFxyXG4gICAgICAgICAgcG9pbnRzOiA0LFxyXG4gICAgICAgICAgcmFkaXVzLFxyXG4gICAgICAgICAgcm90YXRpb25cclxuICAgICAgICB9KVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoc3ltYm9sLnN0eWxlID09PSAnZXNyaVNNU1NxdWFyZScpIHtcclxuICAgICAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuUmVndWxhclNoYXBlKHtcclxuICAgICAgICAgIGZpbGwsXHJcbiAgICAgICAgICBzdHJva2UsXHJcbiAgICAgICAgICBwb2ludHM6IDQsXHJcbiAgICAgICAgICByYWRpdXMsXHJcbiAgICAgICAgICBhbmdsZTogTWF0aC5QSSAvIDQsXHJcbiAgICAgICAgICByb3RhdGlvblxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChzeW1ib2wuc3R5bGUgPT09ICdlc3JpU01TWCcpIHtcclxuICAgICAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuUmVndWxhclNoYXBlKHtcclxuICAgICAgICAgIGZpbGwsXHJcbiAgICAgICAgICBzdHJva2UsXHJcbiAgICAgICAgICBwb2ludHM6IDQsXHJcbiAgICAgICAgICByYWRpdXMsXHJcbiAgICAgICAgICByYWRpdXMyOiAwLFxyXG4gICAgICAgICAgYW5nbGU6IE1hdGguUEkgLyA0LFxyXG4gICAgICAgICAgcm90YXRpb25cclxuICAgICAgICB9KVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoc3ltYm9sLnN0eWxlID09PSAnZXNyaVNNU1RyaWFuZ2xlJykge1xyXG4gICAgICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5SZWd1bGFyU2hhcGUoe1xyXG4gICAgICAgICAgZmlsbCxcclxuICAgICAgICAgIHN0cm9rZSxcclxuICAgICAgICAgIHBvaW50czogMyxcclxuICAgICAgICAgIHJhZGl1cyxcclxuICAgICAgICAgIGFuZ2xlOiAwLFxyXG4gICAgICAgICAgcm90YXRpb25cclxuICAgICAgICB9KVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9jb252ZXJ0TGFiZWxpbmdJbmZvKGxhYmVsaW5nSW5mbywgbWFwVW5pdHMpIHtcclxuICAgIGNvbnN0IHN0eWxlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIGlpID0gbGFiZWxpbmdJbmZvLmxlbmd0aDsgaSA8IGlpOyArK2kpIHtcclxuICAgICAgY29uc3QgbGFiZWxFeHByZXNzaW9uID0gbGFiZWxpbmdJbmZvW2ldLmxhYmVsRXhwcmVzc2lvbjtcclxuICAgICAgLy8gb25seSBsaW1pdGVkIHN1cHBvcnQgZm9yIGxhYmVsIGV4cHJlc3Npb25zXHJcbiAgICAgIGNvbnN0IGZpZWxkID0gbGFiZWxFeHByZXNzaW9uLnN1YnN0cihcclxuICAgICAgICBsYWJlbEV4cHJlc3Npb24uaW5kZXhPZignWycpICsgMSxcclxuICAgICAgICBsYWJlbEV4cHJlc3Npb24uaW5kZXhPZignXScpIC0gMVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBzeW1ib2wgPSBsYWJlbGluZ0luZm9baV0uc3ltYm9sO1xyXG4gICAgICBjb25zdCBtYXhTY2FsZSA9IGxhYmVsaW5nSW5mb1tpXS5tYXhTY2FsZTtcclxuICAgICAgY29uc3QgbWluU2NhbGUgPSBsYWJlbGluZ0luZm9baV0ubWluU2NhbGU7XHJcbiAgICAgIGxldCBtaW5SZXNvbHV0aW9uID0gbnVsbDtcclxuICAgICAgaWYgKG1heFNjYWxlICE9PSAwKSB7XHJcbiAgICAgICAgbWluUmVzb2x1dGlvbiA9IEVzcmlTdHlsZUdlbmVyYXRvci5fZ2V0UmVzb2x1dGlvbkZvclNjYWxlKFxyXG4gICAgICAgICAgbWF4U2NhbGUsXHJcbiAgICAgICAgICBtYXBVbml0c1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IG1heFJlc29sdXRpb24gPSBudWxsO1xyXG4gICAgICBpZiAobWluU2NhbGUgIT09IDApIHtcclxuICAgICAgICBtYXhSZXNvbHV0aW9uID0gRXNyaVN0eWxlR2VuZXJhdG9yLl9nZXRSZXNvbHV0aW9uRm9yU2NhbGUoXHJcbiAgICAgICAgICBtaW5TY2FsZSxcclxuICAgICAgICAgIG1hcFVuaXRzXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBzdHlsZSA9IHRoaXMuX2NvbnZlcnRlcnNbc3ltYm9sLnR5cGVdLmNhbGwodGhpcywgc3ltYm9sKTtcclxuICAgICAgc3R5bGVzLnB1c2goXHJcbiAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbihmZWF0dXJlLCByZXNvbHV0aW9uKSB7XHJcbiAgICAgICAgICAgIGxldCB2aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluUmVzb2x1dGlvbiAhPT0gbnVsbCAmJiB0aGlzLm1heFJlc29sdXRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICB2aXNpYmxlID1cclxuICAgICAgICAgICAgICAgIHJlc29sdXRpb24gPCB0aGlzLm1heFJlc29sdXRpb24gJiZcclxuICAgICAgICAgICAgICAgIHJlc29sdXRpb24gPj0gdGhpcy5taW5SZXNvbHV0aW9uO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWluUmVzb2x1dGlvbiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHZpc2libGUgPSByZXNvbHV0aW9uID49IHRoaXMubWluUmVzb2x1dGlvbjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1heFJlc29sdXRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICB2aXNpYmxlID0gcmVzb2x1dGlvbiA8IHRoaXMubWF4UmVzb2x1dGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZmVhdHVyZS5nZXQodGhpcy5maWVsZCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zdHlsZS5nZXRUZXh0KCkuc2V0VGV4dCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFt0aGlzLnN0eWxlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KSgpLmJpbmQoe1xyXG4gICAgICAgICAgbWluUmVzb2x1dGlvbixcclxuICAgICAgICAgIG1heFJlc29sdXRpb24sXHJcbiAgICAgICAgICBmaWVsZCxcclxuICAgICAgICAgIHN0eWxlXHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHlsZXM7XHJcbiAgfVxyXG5cclxuICBfcmVuZGVyU2ltcGxlKHJlbmRlcmVyKSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IHRoaXMuX2NvbnZlcnRlcnNbcmVuZGVyZXIuc3ltYm9sLnR5cGVdLmNhbGwoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHJlbmRlcmVyLnN5bWJvbFxyXG4gICAgKTtcclxuICAgIHJldHVybiAoKCkgPT4ge1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBbc3R5bGVdO1xyXG4gICAgICB9O1xyXG4gICAgfSkoKTtcclxuICB9XHJcbiAgX3JlbmRlckNsYXNzQnJlYWtzKHJlbmRlcmVyKSB7XHJcbiAgICBjb25zdCBkZWZhdWx0U3ltYm9sID0gcmVuZGVyZXIuZGVmYXVsdFN5bWJvbDtcclxuICAgIGNvbnN0IGRlZmF1bHRTdHlsZSA9IHRoaXMuX2NvbnZlcnRlcnNbZGVmYXVsdFN5bWJvbC50eXBlXS5jYWxsKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBkZWZhdWx0U3ltYm9sXHJcbiAgICApO1xyXG4gICAgY29uc3QgZmllbGQgPSByZW5kZXJlci5maWVsZDtcclxuICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwLCBpaSA9IHJlbmRlcmVyLmNsYXNzQnJlYWtJbmZvcy5sZW5ndGg7IGkgPCBpaTsgKytpKSB7XHJcbiAgICAgIGNvbnN0IGNsYXNzQnJlYWtJbmZvID0gcmVuZGVyZXIuY2xhc3NCcmVha0luZm9zW2ldO1xyXG4gICAgICBsZXQgbWluO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgY2xhc3NCcmVha0luZm8uY2xhc3NNaW5WYWx1ZSA9PT0gbnVsbCB8fFxyXG4gICAgICAgIGNsYXNzQnJlYWtJbmZvLmNsYXNzTWluVmFsdWUgPT09IHVuZGVmaW5lZFxyXG4gICAgICApIHtcclxuICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgbWluID0gcmVuZGVyZXIubWluVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG1pbiA9IHJlbmRlcmVyLmNsYXNzQnJlYWtJbmZvc1tpIC0gMV0uY2xhc3NNYXhWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWluID0gY2xhc3NCcmVha0luZm8uY2xhc3NNaW5WYWx1ZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBtYXggPSBjbGFzc0JyZWFrSW5mby5jbGFzc01heFZhbHVlO1xyXG4gICAgICBjb25zdCBzeW1ib2wgPSBjbGFzc0JyZWFrSW5mby5zeW1ib2w7XHJcbiAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5fY29udmVydGVyc1tzeW1ib2wudHlwZV0uY2FsbCh0aGlzLCBzeW1ib2wpO1xyXG4gICAgICBjbGFzc2VzLnB1c2goeyBtaW4sIG1heCwgc3R5bGUgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKCgpID0+IHtcclxuICAgICAgcmV0dXJuIChmZWF0dXJlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBmZWF0dXJlLmdldChmaWVsZCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlpID0gY2xhc3Nlcy5sZW5ndGg7IGkgPCBpaTsgKytpKSB7XHJcbiAgICAgICAgICBsZXQgY29uZGl0aW9uO1xyXG4gICAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgY29uZGl0aW9uID0gdmFsdWUgPj0gY2xhc3Nlc1tpXS5taW4gJiYgdmFsdWUgPD0gY2xhc3Nlc1tpXS5tYXg7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25kaXRpb24gPSB2YWx1ZSA+IGNsYXNzZXNbaV0ubWluICYmIHZhbHVlIDw9IGNsYXNzZXNbaV0ubWF4O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGNvbmRpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW2NsYXNzZXNbaV0uc3R5bGVdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW2RlZmF1bHRTdHlsZV07XHJcbiAgICAgIH07XHJcbiAgICB9KSgpO1xyXG4gIH1cclxuICBfcmVuZGVyVW5pcXVlVmFsdWUocmVuZGVyZXIpIHtcclxuICAgIGNvbnN0IGRlZmF1bHRTeW1ib2wgPSByZW5kZXJlci5kZWZhdWx0U3ltYm9sO1xyXG4gICAgbGV0IGRlZmF1bHRTdHlsZSA9IFtdO1xyXG4gICAgaWYgKGRlZmF1bHRTeW1ib2wpIHtcclxuICAgICAgZGVmYXVsdFN0eWxlID0gW1xyXG4gICAgICAgIHRoaXMuX2NvbnZlcnRlcnNbZGVmYXVsdFN5bWJvbC50eXBlXS5jYWxsKHRoaXMsIGRlZmF1bHRTeW1ib2wpXHJcbiAgICAgIF07XHJcbiAgICB9XHJcbiAgICBjb25zdCBmaWVsZCA9IHJlbmRlcmVyLmZpZWxkMTtcclxuICAgIGNvbnN0IGluZm9zID0gcmVuZGVyZXIudW5pcXVlVmFsdWVJbmZvcztcclxuICAgIGNvbnN0IG1lID0gdGhpcztcclxuICAgIHJldHVybiAoKCkgPT4ge1xyXG4gICAgICBjb25zdCBoYXNoID0ge307XHJcbiAgICAgIGZvciAobGV0IGkgPSAwLCBpaSA9IGluZm9zLmxlbmd0aDsgaSA8IGlpOyArK2kpIHtcclxuICAgICAgICBjb25zdCBpbmZvID0gaW5mb3NbaV07XHJcbiAgICAgICAgY29uc3Qgc3ltYm9sID0gaW5mby5zeW1ib2w7XHJcbiAgICAgICAgaGFzaFtpbmZvLnZhbHVlXSA9IFttZS5fY29udmVydGVyc1tzeW1ib2wudHlwZV0uY2FsbChtZSwgc3ltYm9sKV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAoZmVhdHVyZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlID0gaGFzaFtmZWF0dXJlLmdldChmaWVsZCldO1xyXG4gICAgICAgIHJldHVybiBzdHlsZSA/IHN0eWxlIDogZGVmYXVsdFN0eWxlO1xyXG4gICAgICB9O1xyXG4gICAgfSkoKTtcclxuICB9XHJcbiAgZ2VuZXJhdGVTdHlsZShsYXllckluZm8sIG1hcFVuaXRzKSB7XHJcbiAgICBjb25zdCBkcmF3aW5nSW5mbyA9IGxheWVySW5mby5kcmF3aW5nSW5mbztcclxuICAgIGxldCBzdHlsZUZ1bmN0aW9ucyA9IFtdO1xyXG4gICAgY29uc3QgZHJhd2luZ0luZm9TdHlsZSA9IHRoaXMuX3JlbmRlcmVyc1tkcmF3aW5nSW5mby5yZW5kZXJlci50eXBlXS5jYWxsKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBkcmF3aW5nSW5mby5yZW5kZXJlclxyXG4gICAgKTtcclxuICAgIGlmIChkcmF3aW5nSW5mb1N0eWxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3R5bGVGdW5jdGlvbnMucHVzaChkcmF3aW5nSW5mb1N0eWxlKTtcclxuICAgIH1cclxuICAgIGlmIChsYXllckluZm8ubGFiZWxpbmdJbmZvKSB7XHJcbiAgICAgIGNvbnN0IGxhYmVsaW5nSW5mb1N0eWxlRnVuY3Rpb25zID0gdGhpcy5fY29udmVydExhYmVsaW5nSW5mbyhcclxuICAgICAgICBsYXllckluZm8ubGFiZWxpbmdJbmZvLFxyXG4gICAgICAgIG1hcFVuaXRzXHJcbiAgICAgICk7XHJcbiAgICAgIHN0eWxlRnVuY3Rpb25zID0gc3R5bGVGdW5jdGlvbnMuY29uY2F0KGxhYmVsaW5nSW5mb1N0eWxlRnVuY3Rpb25zKTtcclxuICAgIH1cclxuICAgIGlmIChzdHlsZUZ1bmN0aW9ucy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgcmV0dXJuIHN0eWxlRnVuY3Rpb25zWzBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChmZWF0dXJlLCByZXNvbHV0aW9uKSA9PiB7XHJcbiAgICAgICAgICBsZXQgc3R5bGVzID0gW107XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaWkgPSBzdHlsZUZ1bmN0aW9ucy5sZW5ndGg7IGkgPCBpaTsgKytpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHN0eWxlRnVuY3Rpb25zW2ldLmNhbGwobnVsbCwgZmVhdHVyZSwgcmVzb2x1dGlvbik7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMuY29uY2F0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBzdHlsZXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSkoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19