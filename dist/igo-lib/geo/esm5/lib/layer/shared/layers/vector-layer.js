/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olLayerVector from 'ol/layer/Vector';
import { unByKey } from 'ol/Observable';
import { easeOut } from 'ol/easing';
import { asArray as ColorAsArray } from 'ol/color';
import { Layer } from './layer';
var VectorLayer = /** @class */ (function (_super) {
    tslib_1.__extends(VectorLayer, _super);
    function VectorLayer(options) {
        return _super.call(this, options) || this;
    }
    Object.defineProperty(VectorLayer.prototype, "browsable", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.browsable !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VectorLayer.prototype, "exportable", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.exportable !== false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     * @return {?}
     */
    VectorLayer.prototype.createOlLayer = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var olOptions = Object.assign({}, this.options, {
            source: (/** @type {?} */ (this.options.source.ol))
        });
        if (this.options.animation) {
            this.dataSource.ol.on('addfeature', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                this.flash(e.feature);
            }).bind(this));
        }
        return new olLayerVector(olOptions);
    };
    /**
     * @protected
     * @param {?} feature
     * @return {?}
     */
    VectorLayer.prototype.flash = /**
     * @protected
     * @param {?} feature
     * @return {?}
     */
    function (feature) {
        /** @type {?} */
        var start = new Date().getTime();
        /** @type {?} */
        var listenerKey = this.map.ol.on('postcompose', animate.bind(this));
        /**
         * @param {?} event
         * @return {?}
         */
        function animate(event) {
            /** @type {?} */
            var vectorContext = event.vectorContext;
            /** @type {?} */
            var frameState = event.frameState;
            /** @type {?} */
            var flashGeom = feature.getGeometry().clone();
            /** @type {?} */
            var elapsed = frameState.time - start;
            /** @type {?} */
            var elapsedRatio = elapsed / this.options.animation.duration;
            /** @type {?} */
            var opacity = easeOut(1 - elapsedRatio);
            /** @type {?} */
            var newColor = ColorAsArray(this.options.animation.color || 'red');
            newColor[3] = opacity;
            /** @type {?} */
            var style = this.ol.getStyleFunction().call(this, feature)[0];
            /** @type {?} */
            var styleClone = style.clone();
            switch (feature.getGeometry().getType()) {
                case 'Point':
                    /** @type {?} */
                    var radius = easeOut(elapsedRatio) * (styleClone.getImage().getRadius() * 3);
                    styleClone.getImage().setRadius(radius);
                    styleClone.getImage().setOpacity(opacity);
                    break;
                case 'LineString':
                    // TODO
                    if (styleClone.getImage().getStroke()) {
                        styleClone
                            .getImage()
                            .getStroke()
                            .setColor(newColor);
                        styleClone
                            .getImage()
                            .getStroke()
                            .setWidth(easeOut(elapsedRatio) *
                            (styleClone
                                .getImage()
                                .getStroke()
                                .getWidth() *
                                3));
                    }
                    if (styleClone.getStroke()) {
                        styleClone.getStroke().setColor(newColor);
                        styleClone
                            .getStroke()
                            .setWidth(easeOut(elapsedRatio) * (styleClone.getStroke().getWidth() * 3));
                    }
                    break;
                case 'Polygon':
                    // TODO
                    if (styleClone.getImage().getFill()) {
                        styleClone
                            .getImage()
                            .getFill()
                            .setColor(newColor);
                    }
                    if (styleClone.getFill()) {
                        styleClone.getFill().setColor(newColor);
                    }
                    break;
            }
            vectorContext.setStyle(styleClone);
            vectorContext.drawGeometry(flashGeom);
            if (elapsed > this.options.animation.duration) {
                unByKey(listenerKey);
                // remove last geometry
                // there is a little flash before feature disappear, better solution ?
                this.map.ol.render();
                return;
            }
            // tell OpenLayers to continue postcompose animation
            this.map.ol.render();
        }
    };
    return VectorLayer;
}(Layer));
export { VectorLayer };
if (false) {
    /** @type {?} */
    VectorLayer.prototype.dataSource;
    /** @type {?} */
    VectorLayer.prototype.options;
    /** @type {?} */
    VectorLayer.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9yLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL3NoYXJlZC9sYXllcnMvdmVjdG9yLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFFNUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxPQUFPLElBQUksWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBUW5ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFHaEM7SUFBaUMsdUNBQUs7SUFrQnBDLHFCQUFZLE9BQTJCO2VBQ3JDLGtCQUFNLE9BQU8sQ0FBQztJQUNoQixDQUFDO0lBVkQsc0JBQUksa0NBQVM7Ozs7UUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksbUNBQVU7Ozs7UUFBZDtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDO1FBQzNDLENBQUM7OztPQUFBOzs7OztJQU1TLG1DQUFhOzs7O0lBQXZCOztZQUNRLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hELE1BQU0sRUFBRSxtQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQWtCO1NBQ2pELENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FDbkIsWUFBWSxFQUNaOzs7O1lBQUEsVUFBUyxDQUFDO2dCQUNSLElB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QyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDbkMsVUFBVTs2QkFDUCxRQUFRLEVBQUU7NkJBQ1YsT0FBTyxFQUFFOzZCQUNULFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDdkI7b0JBQ0QsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQ3hCLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ3pDO29CQUNELE1BQU07YUFDVDtZQUVELGFBQWEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV0QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDckIsdUJBQXVCO2dCQUN2QixzRUFBc0U7Z0JBQ3RFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNyQixPQUFPO2FBQ1I7WUFDRCxvREFBb0Q7WUFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkIsQ0FBQztJQUNILENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUF0SEQsQ0FBaUMsS0FBSyxHQXNIckM7Ozs7SUFySEMsaUNBS3NCOztJQUN0Qiw4QkFBbUM7O0lBQ25DLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbExheWVyVmVjdG9yIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XHJcbmltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0IHsgdW5CeUtleSB9IGZyb20gJ29sL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBlYXNlT3V0IH0gZnJvbSAnb2wvZWFzaW5nJztcclxuaW1wb3J0IHsgYXNBcnJheSBhcyBDb2xvckFzQXJyYXkgfSBmcm9tICdvbC9jb2xvcic7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2ZlYXR1cmUtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFdGU0RhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93ZnMtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IEFyY0dJU1Jlc3REYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvYXJjZ2lzcmVzdC1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgV2ViU29ja2V0RGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dlYnNvY2tldC1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgQ2x1c3RlckRhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9jbHVzdGVyLWRhdGFzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuL2xheWVyJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi92ZWN0b3ItbGF5ZXIuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3JMYXllciBleHRlbmRzIExheWVyIHtcclxuICBwdWJsaWMgZGF0YVNvdXJjZTpcclxuICAgIHwgRmVhdHVyZURhdGFTb3VyY2VcclxuICAgIHwgV0ZTRGF0YVNvdXJjZVxyXG4gICAgfCBBcmNHSVNSZXN0RGF0YVNvdXJjZVxyXG4gICAgfCBXZWJTb2NrZXREYXRhU291cmNlXHJcbiAgICB8IENsdXN0ZXJEYXRhU291cmNlO1xyXG4gIHB1YmxpYyBvcHRpb25zOiBWZWN0b3JMYXllck9wdGlvbnM7XHJcbiAgcHVibGljIG9sOiBvbExheWVyVmVjdG9yO1xyXG5cclxuICBnZXQgYnJvd3NhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5icm93c2FibGUgIT09IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGV4cG9ydGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmV4cG9ydGFibGUgIT09IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogVmVjdG9yTGF5ZXJPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbExheWVyKCk6IG9sTGF5ZXJWZWN0b3Ige1xyXG4gICAgY29uc3Qgb2xPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRpb25zLCB7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5vcHRpb25zLnNvdXJjZS5vbCBhcyBvbFNvdXJjZVZlY3RvclxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb24pIHtcclxuICAgICAgdGhpcy5kYXRhU291cmNlLm9sLm9uKFxyXG4gICAgICAgICdhZGRmZWF0dXJlJyxcclxuICAgICAgICBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICB0aGlzLmZsYXNoKGUuZmVhdHVyZSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbExheWVyVmVjdG9yKG9sT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZmxhc2goZmVhdHVyZSkge1xyXG4gICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIGNvbnN0IGxpc3RlbmVyS2V5ID0gdGhpcy5tYXAub2wub24oJ3Bvc3Rjb21wb3NlJywgYW5pbWF0ZS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhbmltYXRlKGV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IHZlY3RvckNvbnRleHQgPSBldmVudC52ZWN0b3JDb250ZXh0O1xyXG4gICAgICBjb25zdCBmcmFtZVN0YXRlID0gZXZlbnQuZnJhbWVTdGF0ZTtcclxuICAgICAgY29uc3QgZmxhc2hHZW9tID0gZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmNsb25lKCk7XHJcbiAgICAgIGNvbnN0IGVsYXBzZWQgPSBmcmFtZVN0YXRlLnRpbWUgLSBzdGFydDtcclxuICAgICAgY29uc3QgZWxhcHNlZFJhdGlvID0gZWxhcHNlZCAvIHRoaXMub3B0aW9ucy5hbmltYXRpb24uZHVyYXRpb247XHJcbiAgICAgIGNvbnN0IG9wYWNpdHkgPSBlYXNlT3V0KDEgLSBlbGFwc2VkUmF0aW8pO1xyXG4gICAgICBjb25zdCBuZXdDb2xvciA9IENvbG9yQXNBcnJheSh0aGlzLm9wdGlvbnMuYW5pbWF0aW9uLmNvbG9yIHx8ICdyZWQnKTtcclxuICAgICAgbmV3Q29sb3JbM10gPSBvcGFjaXR5O1xyXG4gICAgICBjb25zdCBzdHlsZSA9IHRoaXMub2wuZ2V0U3R5bGVGdW5jdGlvbigpLmNhbGwodGhpcywgZmVhdHVyZSlbMF07XHJcbiAgICAgIGNvbnN0IHN0eWxlQ2xvbmUgPSBzdHlsZS5jbG9uZSgpO1xyXG5cclxuICAgICAgc3dpdGNoIChmZWF0dXJlLmdldEdlb21ldHJ5KCkuZ2V0VHlwZSgpKSB7XHJcbiAgICAgICAgY2FzZSAnUG9pbnQnOlxyXG4gICAgICAgICAgY29uc3QgcmFkaXVzID1cclxuICAgICAgICAgICAgZWFzZU91dChlbGFwc2VkUmF0aW8pICogKHN0eWxlQ2xvbmUuZ2V0SW1hZ2UoKS5nZXRSYWRpdXMoKSAqIDMpO1xyXG4gICAgICAgICAgc3R5bGVDbG9uZS5nZXRJbWFnZSgpLnNldFJhZGl1cyhyYWRpdXMpO1xyXG4gICAgICAgICAgc3R5bGVDbG9uZS5nZXRJbWFnZSgpLnNldE9wYWNpdHkob3BhY2l0eSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdMaW5lU3RyaW5nJzpcclxuICAgICAgICAgIC8vIFRPRE9cclxuICAgICAgICAgIGlmIChzdHlsZUNsb25lLmdldEltYWdlKCkuZ2V0U3Ryb2tlKCkpIHtcclxuICAgICAgICAgICAgc3R5bGVDbG9uZVxyXG4gICAgICAgICAgICAgIC5nZXRJbWFnZSgpXHJcbiAgICAgICAgICAgICAgLmdldFN0cm9rZSgpXHJcbiAgICAgICAgICAgICAgLnNldENvbG9yKG5ld0NvbG9yKTtcclxuICAgICAgICAgICAgc3R5bGVDbG9uZVxyXG4gICAgICAgICAgICAgIC5nZXRJbWFnZSgpXHJcbiAgICAgICAgICAgICAgLmdldFN0cm9rZSgpXHJcbiAgICAgICAgICAgICAgLnNldFdpZHRoKFxyXG4gICAgICAgICAgICAgICAgZWFzZU91dChlbGFwc2VkUmF0aW8pICpcclxuICAgICAgICAgICAgICAgICAgKHN0eWxlQ2xvbmVcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0SW1hZ2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRTdHJva2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRXaWR0aCgpICpcclxuICAgICAgICAgICAgICAgICAgICAzKVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc3R5bGVDbG9uZS5nZXRTdHJva2UoKSkge1xyXG4gICAgICAgICAgICBzdHlsZUNsb25lLmdldFN0cm9rZSgpLnNldENvbG9yKG5ld0NvbG9yKTtcclxuICAgICAgICAgICAgc3R5bGVDbG9uZVxyXG4gICAgICAgICAgICAgIC5nZXRTdHJva2UoKVxyXG4gICAgICAgICAgICAgIC5zZXRXaWR0aChcclxuICAgICAgICAgICAgICAgIGVhc2VPdXQoZWxhcHNlZFJhdGlvKSAqIChzdHlsZUNsb25lLmdldFN0cm9rZSgpLmdldFdpZHRoKCkgKiAzKVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdQb2x5Z29uJzpcclxuICAgICAgICAgIC8vIFRPRE9cclxuICAgICAgICAgIGlmIChzdHlsZUNsb25lLmdldEltYWdlKCkuZ2V0RmlsbCgpKSB7XHJcbiAgICAgICAgICAgIHN0eWxlQ2xvbmVcclxuICAgICAgICAgICAgICAuZ2V0SW1hZ2UoKVxyXG4gICAgICAgICAgICAgIC5nZXRGaWxsKClcclxuICAgICAgICAgICAgICAuc2V0Q29sb3IobmV3Q29sb3IpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHN0eWxlQ2xvbmUuZ2V0RmlsbCgpKSB7XHJcbiAgICAgICAgICAgIHN0eWxlQ2xvbmUuZ2V0RmlsbCgpLnNldENvbG9yKG5ld0NvbG9yKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2ZWN0b3JDb250ZXh0LnNldFN0eWxlKHN0eWxlQ2xvbmUpO1xyXG4gICAgICB2ZWN0b3JDb250ZXh0LmRyYXdHZW9tZXRyeShmbGFzaEdlb20pO1xyXG5cclxuICAgICAgaWYgKGVsYXBzZWQgPiB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uLmR1cmF0aW9uKSB7XHJcbiAgICAgICAgdW5CeUtleShsaXN0ZW5lcktleSk7XHJcbiAgICAgICAgLy8gcmVtb3ZlIGxhc3QgZ2VvbWV0cnlcclxuICAgICAgICAvLyB0aGVyZSBpcyBhIGxpdHRsZSBmbGFzaCBiZWZvcmUgZmVhdHVyZSBkaXNhcHBlYXIsIGJldHRlciBzb2x1dGlvbiA/XHJcbiAgICAgICAgdGhpcy5tYXAub2wucmVuZGVyKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHRlbGwgT3BlbkxheWVycyB0byBjb250aW51ZSBwb3N0Y29tcG9zZSBhbmltYXRpb25cclxuICAgICAgdGhpcy5tYXAub2wucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==