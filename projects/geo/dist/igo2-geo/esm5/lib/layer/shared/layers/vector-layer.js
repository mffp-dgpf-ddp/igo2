/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olLayerVector from 'ol/layer/Vector';
import { unByKey } from 'ol/Observable';
import { easeOut } from 'ol/easing';
import { asArray as ColorAsArray } from 'ol/color';
import { VectorWatcher } from '../../utils';
import { Layer } from './layer';
var VectorLayer = /** @class */ (function (_super) {
    tslib_1.__extends(VectorLayer, _super);
    function VectorLayer(options) {
        var _this = _super.call(this, options) || this;
        _this.watcher = new VectorWatcher(_this);
        _this.status$ = _this.watcher.status$;
        return _this;
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
        if (this.options.trackFeature) {
            this.enableTrackFeature(this.options.trackFeature);
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
            var style = this.ol
                .getStyleFunction()
                .call(this, feature)
                .find((/**
             * @param {?} style2
             * @return {?}
             */
            function (style2) {
                return style2.getImage();
            }));
            if (!style) {
                style = this.ol.getStyleFunction().call(this, feature)[0];
            }
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
                    if (styleClone.getImage()) {
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
                    if (styleClone.getImage()) {
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
            styleClone.setText('');
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
    /**
     * @param {?} map
     * @return {?}
     */
    VectorLayer.prototype.setMap = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        if (map === undefined) {
            this.watcher.unsubscribe();
        }
        else {
            this.watcher.subscribe((/**
             * @return {?}
             */
            function () { }));
        }
        _super.prototype.setMap.call(this, map);
    };
    /**
     * @return {?}
     */
    VectorLayer.prototype.onUnwatch = /**
     * @return {?}
     */
    function () {
        this.dataSource.onUnwatch();
        this.stopAnimation();
    };
    /**
     * @return {?}
     */
    VectorLayer.prototype.stopAnimation = /**
     * @return {?}
     */
    function () {
        this.dataSource.ol.un('addfeature', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (this.visible) {
                this.flash(e.feature);
            }
        }).bind(this));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    VectorLayer.prototype.enableTrackFeature = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        this.trackFeatureListenerId = this.dataSource.ol.on('addfeature', this.trackFeature.bind(this, id));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    VectorLayer.prototype.centerMapOnFeature = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var feat = this.dataSource.ol.getFeatureById(id);
        if (feat) {
            this.map.ol.getView().setCenter(feat.getGeometry().getCoordinates());
        }
    };
    /**
     * @param {?} id
     * @param {?} feat
     * @return {?}
     */
    VectorLayer.prototype.trackFeature = /**
     * @param {?} id
     * @param {?} feat
     * @return {?}
     */
    function (id, feat) {
        if (feat.feature.getId() === id && this.visible) {
            this.centerMapOnFeature(id);
        }
    };
    /**
     * @param {?=} id
     * @return {?}
     */
    VectorLayer.prototype.disableTrackFeature = /**
     * @param {?=} id
     * @return {?}
     */
    function (id) {
        unByKey(this.trackFeatureListenerId);
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
    /**
     * @type {?}
     * @private
     */
    VectorLayer.prototype.watcher;
    /**
     * @type {?}
     * @private
     */
    VectorLayer.prototype.trackFeatureListenerId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9yLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL3NoYXJlZC9sYXllcnMvdmVjdG9yLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFFNUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxPQUFPLElBQUksWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBUW5ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFNUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUdoQztJQUFpQyx1Q0FBSztJQW9CcEMscUJBQVksT0FBMkI7UUFBdkMsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FHZjtRQUZDLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxhQUFhLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDdkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzs7SUFDdEMsQ0FBQztJQVpELHNCQUFJLGtDQUFTOzs7O1FBQWI7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG1DQUFVOzs7O1FBQWQ7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTs7Ozs7SUFRUyxtQ0FBYTs7OztJQUF2Qjs7WUFDUSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoRCxNQUFNLEVBQUUsbUJBQUEsSUFBSSxDQUFDLE9B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QUUsQ0FBQyxDQUNqQyxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFDTSx3Q0FBa0I7Ozs7SUFBekIsVUFBMEIsRUFBbUI7O1lBQ3JDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO1FBQ2xELElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0gsQ0FBQzs7Ozs7O0lBRU0sa0NBQVk7Ozs7O0lBQW5CLFVBQW9CLEVBQUUsRUFBRSxJQUFJO1FBQzFCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUMvQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs7OztJQUVNLHlDQUFtQjs7OztJQUExQixVQUEyQixFQUFvQjtRQUM3QyxPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQXZMRCxDQUFpQyxLQUFLLEdBdUxyQzs7OztJQXRMQyxpQ0FLc0I7O0lBQ3RCLDhCQUFtQzs7SUFDbkMseUJBQXlCOzs7OztJQUN6Qiw4QkFBK0I7Ozs7O0lBQy9CLDZDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbExheWVyVmVjdG9yIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XHJcbmltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0IHsgdW5CeUtleSB9IGZyb20gJ29sL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBlYXNlT3V0IH0gZnJvbSAnb2wvZWFzaW5nJztcclxuaW1wb3J0IHsgYXNBcnJheSBhcyBDb2xvckFzQXJyYXkgfSBmcm9tICdvbC9jb2xvcic7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2ZlYXR1cmUtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFdGU0RhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93ZnMtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IEFyY0dJU1Jlc3REYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvYXJjZ2lzcmVzdC1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgV2ViU29ja2V0RGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dlYnNvY2tldC1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgQ2x1c3RlckRhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9jbHVzdGVyLWRhdGFzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgVmVjdG9yV2F0Y2hlciB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuL2xheWVyJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi92ZWN0b3ItbGF5ZXIuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3JMYXllciBleHRlbmRzIExheWVyIHtcclxuICBwdWJsaWMgZGF0YVNvdXJjZTpcclxuICAgIHwgRmVhdHVyZURhdGFTb3VyY2VcclxuICAgIHwgV0ZTRGF0YVNvdXJjZVxyXG4gICAgfCBBcmNHSVNSZXN0RGF0YVNvdXJjZVxyXG4gICAgfCBXZWJTb2NrZXREYXRhU291cmNlXHJcbiAgICB8IENsdXN0ZXJEYXRhU291cmNlO1xyXG4gIHB1YmxpYyBvcHRpb25zOiBWZWN0b3JMYXllck9wdGlvbnM7XHJcbiAgcHVibGljIG9sOiBvbExheWVyVmVjdG9yO1xyXG4gIHByaXZhdGUgd2F0Y2hlcjogVmVjdG9yV2F0Y2hlcjtcclxuICBwcml2YXRlIHRyYWNrRmVhdHVyZUxpc3RlbmVySWQ7XHJcblxyXG4gIGdldCBicm93c2FibGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmJyb3dzYWJsZSAhPT0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXQgZXhwb3J0YWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZXhwb3J0YWJsZSAhPT0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBWZWN0b3JMYXllck9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy53YXRjaGVyID0gbmV3IFZlY3RvcldhdGNoZXIodGhpcyk7XHJcbiAgICB0aGlzLnN0YXR1cyQgPSB0aGlzLndhdGNoZXIuc3RhdHVzJDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbExheWVyKCk6IG9sTGF5ZXJWZWN0b3Ige1xyXG4gICAgY29uc3Qgb2xPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRpb25zLCB7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5vcHRpb25zLnNvdXJjZS5vbCBhcyBvbFNvdXJjZVZlY3RvclxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb24pIHtcclxuICAgICAgdGhpcy5kYXRhU291cmNlLm9sLm9uKFxyXG4gICAgICAgICdhZGRmZWF0dXJlJyxcclxuICAgICAgICBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICB0aGlzLmZsYXNoKGUuZmVhdHVyZSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmFja0ZlYXR1cmUpIHtcclxuICAgICAgdGhpcy5lbmFibGVUcmFja0ZlYXR1cmUodGhpcy5vcHRpb25zLnRyYWNrRmVhdHVyZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbExheWVyVmVjdG9yKG9sT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZmxhc2goZmVhdHVyZSkge1xyXG4gICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIGNvbnN0IGxpc3RlbmVyS2V5ID0gdGhpcy5tYXAub2wub24oJ3Bvc3Rjb21wb3NlJywgYW5pbWF0ZS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhbmltYXRlKGV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IHZlY3RvckNvbnRleHQgPSBldmVudC52ZWN0b3JDb250ZXh0O1xyXG4gICAgICBjb25zdCBmcmFtZVN0YXRlID0gZXZlbnQuZnJhbWVTdGF0ZTtcclxuICAgICAgY29uc3QgZmxhc2hHZW9tID0gZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmNsb25lKCk7XHJcbiAgICAgIGNvbnN0IGVsYXBzZWQgPSBmcmFtZVN0YXRlLnRpbWUgLSBzdGFydDtcclxuICAgICAgY29uc3QgZWxhcHNlZFJhdGlvID0gZWxhcHNlZCAvIHRoaXMub3B0aW9ucy5hbmltYXRpb24uZHVyYXRpb247XHJcbiAgICAgIGNvbnN0IG9wYWNpdHkgPSBlYXNlT3V0KDEgLSBlbGFwc2VkUmF0aW8pO1xyXG4gICAgICBjb25zdCBuZXdDb2xvciA9IENvbG9yQXNBcnJheSh0aGlzLm9wdGlvbnMuYW5pbWF0aW9uLmNvbG9yIHx8ICdyZWQnKTtcclxuICAgICAgbmV3Q29sb3JbM10gPSBvcGFjaXR5O1xyXG4gICAgICBsZXQgc3R5bGUgPSB0aGlzLm9sXHJcbiAgICAgICAgLmdldFN0eWxlRnVuY3Rpb24oKVxyXG4gICAgICAgIC5jYWxsKHRoaXMsIGZlYXR1cmUpXHJcbiAgICAgICAgLmZpbmQoc3R5bGUyID0+IHtcclxuICAgICAgICAgIHJldHVybiBzdHlsZTIuZ2V0SW1hZ2UoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgaWYgKCFzdHlsZSkge1xyXG4gICAgICAgIHN0eWxlID0gdGhpcy5vbC5nZXRTdHlsZUZ1bmN0aW9uKCkuY2FsbCh0aGlzLCBmZWF0dXJlKVswXTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBzdHlsZUNsb25lID0gc3R5bGUuY2xvbmUoKTtcclxuXHJcbiAgICAgIHN3aXRjaCAoZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldFR5cGUoKSkge1xyXG4gICAgICAgIGNhc2UgJ1BvaW50JzpcclxuICAgICAgICAgIGNvbnN0IHJhZGl1cyA9XHJcbiAgICAgICAgICAgIGVhc2VPdXQoZWxhcHNlZFJhdGlvKSAqIChzdHlsZUNsb25lLmdldEltYWdlKCkuZ2V0UmFkaXVzKCkgKiAzKTtcclxuICAgICAgICAgIHN0eWxlQ2xvbmUuZ2V0SW1hZ2UoKS5zZXRSYWRpdXMocmFkaXVzKTtcclxuICAgICAgICAgIHN0eWxlQ2xvbmUuZ2V0SW1hZ2UoKS5zZXRPcGFjaXR5KG9wYWNpdHkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnTGluZVN0cmluZyc6XHJcbiAgICAgICAgICAvLyBUT0RPXHJcbiAgICAgICAgICBpZiAoc3R5bGVDbG9uZS5nZXRJbWFnZSgpKSB7XHJcbiAgICAgICAgICAgIHN0eWxlQ2xvbmVcclxuICAgICAgICAgICAgICAuZ2V0SW1hZ2UoKVxyXG4gICAgICAgICAgICAgIC5nZXRTdHJva2UoKVxyXG4gICAgICAgICAgICAgIC5zZXRDb2xvcihuZXdDb2xvcik7XHJcbiAgICAgICAgICAgIHN0eWxlQ2xvbmVcclxuICAgICAgICAgICAgICAuZ2V0SW1hZ2UoKVxyXG4gICAgICAgICAgICAgIC5nZXRTdHJva2UoKVxyXG4gICAgICAgICAgICAgIC5zZXRXaWR0aChcclxuICAgICAgICAgICAgICAgIGVhc2VPdXQoZWxhcHNlZFJhdGlvKSAqXHJcbiAgICAgICAgICAgICAgICAgIChzdHlsZUNsb25lXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldEltYWdlKClcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0U3Ryb2tlKClcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0V2lkdGgoKSAqXHJcbiAgICAgICAgICAgICAgICAgICAgMylcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHN0eWxlQ2xvbmUuZ2V0U3Ryb2tlKCkpIHtcclxuICAgICAgICAgICAgc3R5bGVDbG9uZS5nZXRTdHJva2UoKS5zZXRDb2xvcihuZXdDb2xvcik7XHJcbiAgICAgICAgICAgIHN0eWxlQ2xvbmVcclxuICAgICAgICAgICAgICAuZ2V0U3Ryb2tlKClcclxuICAgICAgICAgICAgICAuc2V0V2lkdGgoXHJcbiAgICAgICAgICAgICAgICBlYXNlT3V0KGVsYXBzZWRSYXRpbykgKiAoc3R5bGVDbG9uZS5nZXRTdHJva2UoKS5nZXRXaWR0aCgpICogMylcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnUG9seWdvbic6XHJcbiAgICAgICAgICAvLyBUT0RPXHJcbiAgICAgICAgICBpZiAoc3R5bGVDbG9uZS5nZXRJbWFnZSgpKSB7XHJcbiAgICAgICAgICAgIHN0eWxlQ2xvbmVcclxuICAgICAgICAgICAgICAuZ2V0SW1hZ2UoKVxyXG4gICAgICAgICAgICAgIC5nZXRGaWxsKClcclxuICAgICAgICAgICAgICAuc2V0Q29sb3IobmV3Q29sb3IpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHN0eWxlQ2xvbmUuZ2V0RmlsbCgpKSB7XHJcbiAgICAgICAgICAgIHN0eWxlQ2xvbmUuZ2V0RmlsbCgpLnNldENvbG9yKG5ld0NvbG9yKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdHlsZUNsb25lLnNldFRleHQoJycpO1xyXG4gICAgICB2ZWN0b3JDb250ZXh0LnNldFN0eWxlKHN0eWxlQ2xvbmUpO1xyXG4gICAgICB2ZWN0b3JDb250ZXh0LmRyYXdHZW9tZXRyeShmbGFzaEdlb20pO1xyXG5cclxuICAgICAgaWYgKGVsYXBzZWQgPiB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uLmR1cmF0aW9uKSB7XHJcbiAgICAgICAgdW5CeUtleShsaXN0ZW5lcktleSk7XHJcbiAgICAgICAgLy8gcmVtb3ZlIGxhc3QgZ2VvbWV0cnlcclxuICAgICAgICAvLyB0aGVyZSBpcyBhIGxpdHRsZSBmbGFzaCBiZWZvcmUgZmVhdHVyZSBkaXNhcHBlYXIsIGJldHRlciBzb2x1dGlvbiA/XHJcbiAgICAgICAgdGhpcy5tYXAub2wucmVuZGVyKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHRlbGwgT3BlbkxheWVycyB0byBjb250aW51ZSBwb3N0Y29tcG9zZSBhbmltYXRpb25cclxuICAgICAgdGhpcy5tYXAub2wucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0TWFwKG1hcDogSWdvTWFwIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAobWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy53YXRjaGVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLndhdGNoZXIuc3Vic2NyaWJlKCgpID0+IHt9KTtcclxuICAgIH1cclxuICAgIHN1cGVyLnNldE1hcChtYXApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHtcclxuICAgIHRoaXMuZGF0YVNvdXJjZS5vblVud2F0Y2goKTtcclxuICAgIHRoaXMuc3RvcEFuaW1hdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0b3BBbmltYXRpb24oKSB7XHJcbiAgICB0aGlzLmRhdGFTb3VyY2Uub2wudW4oXHJcbiAgICAgICdhZGRmZWF0dXJlJyxcclxuICAgICAgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnZpc2libGUpIHtcclxuICAgICAgICAgIHRoaXMuZmxhc2goZS5mZWF0dXJlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0uYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBlbmFibGVUcmFja0ZlYXR1cmUoaWQ6IHN0cmluZyB8IG51bWJlcikge1xyXG4gICAgdGhpcy50cmFja0ZlYXR1cmVMaXN0ZW5lcklkID0gdGhpcy5kYXRhU291cmNlLm9sLm9uKFxyXG4gICAgICAnYWRkZmVhdHVyZScsXHJcbiAgICAgIHRoaXMudHJhY2tGZWF0dXJlLmJpbmQodGhpcywgaWQpXHJcbiAgICApO1xyXG4gIH1cclxuICBwdWJsaWMgY2VudGVyTWFwT25GZWF0dXJlKGlkOiBzdHJpbmcgfCBudW1iZXIpIHtcclxuICAgIGNvbnN0IGZlYXQgPSB0aGlzLmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQoaWQpO1xyXG4gICAgaWYgKGZlYXQpIHtcclxuICAgICAgdGhpcy5tYXAub2wuZ2V0VmlldygpLnNldENlbnRlcihmZWF0LmdldEdlb21ldHJ5KCkuZ2V0Q29vcmRpbmF0ZXMoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdHJhY2tGZWF0dXJlKGlkLCBmZWF0KSB7XHJcbiAgICBpZiAoZmVhdC5mZWF0dXJlLmdldElkKCkgPT09IGlkICYmIHRoaXMudmlzaWJsZSkge1xyXG4gICAgICB0aGlzLmNlbnRlck1hcE9uRmVhdHVyZShpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzYWJsZVRyYWNrRmVhdHVyZShpZD86IHN0cmluZyB8IG51bWJlcikge1xyXG4gICAgdW5CeUtleSh0aGlzLnRyYWNrRmVhdHVyZUxpc3RlbmVySWQpO1xyXG4gIH1cclxufVxyXG4iXX0=