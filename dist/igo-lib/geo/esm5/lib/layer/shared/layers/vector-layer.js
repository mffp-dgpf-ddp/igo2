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
            this.flash(e.feature);
        }).bind(this));
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9yLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL3NoYXJlZC9sYXllcnMvdmVjdG9yLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFFNUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxPQUFPLElBQUksWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBUW5ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFNUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUdoQztJQUFpQyx1Q0FBSztJQWNwQyxxQkFBWSxPQUEyQjtRQUF2QyxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUdmO1FBRkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGFBQWEsQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUN2QyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDOztJQUN0QyxDQUFDO0lBWkQsc0JBQUksa0NBQVM7Ozs7UUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksbUNBQVU7Ozs7UUFBZDtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDO1FBQzNDLENBQUM7OztPQUFBOzs7OztJQVFTLG1DQUFhOzs7O0lBQXZCOztZQUNRLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hELE1BQU0sRUFBRSxtQkFBQSxJQUFJLENBQUMsT0FB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LGNBQU8sQ0FBQyxFQUFDLENBQUM7U0FDbEM7UUFDRCxpQkFBTSxNQUFNLFlBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVNLCtCQUFTOzs7SUFBaEI7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7O0lBRU0sbUNBQWE7OztJQUFwQjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FDbkIsWUFBWSxFQUNaOzs7O1FBQUEsVUFBUyxDQUFDO1lBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO0lBQ0osQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQTNJRCxDQUFpQyxLQUFLLEdBMklyQzs7OztJQTFJQyxpQ0FBc0g7O0lBQ3RILDhCQUFtQzs7SUFDbkMseUJBQXlCOzs7OztJQUN6Qiw4QkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xMYXllclZlY3RvciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xyXG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgZWFzZU91dCB9IGZyb20gJ29sL2Vhc2luZyc7XHJcbmltcG9ydCB7IGFzQXJyYXkgYXMgQ29sb3JBc0FycmF5IH0gZnJvbSAnb2wvY29sb3InO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBXRlNEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBBcmNHSVNSZXN0RGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2FyY2dpc3Jlc3QtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFdlYlNvY2tldERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93ZWJzb2NrZXQtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvY2x1c3Rlci1kYXRhc291cmNlJztcclxuXHJcbmltcG9ydCB7IFZlY3RvcldhdGNoZXIgfSBmcm9tICcuLi8uLi91dGlscyc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi9sYXllcic7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyT3B0aW9ucyB9IGZyb20gJy4vdmVjdG9yLWxheWVyLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVmVjdG9yTGF5ZXIgZXh0ZW5kcyBMYXllciB7XHJcbiAgcHVibGljIGRhdGFTb3VyY2U6IEZlYXR1cmVEYXRhU291cmNlIHwgV0ZTRGF0YVNvdXJjZSB8IEFyY0dJU1Jlc3REYXRhU291cmNlIHwgV2ViU29ja2V0RGF0YVNvdXJjZSB8IENsdXN0ZXJEYXRhU291cmNlO1xyXG4gIHB1YmxpYyBvcHRpb25zOiBWZWN0b3JMYXllck9wdGlvbnM7XHJcbiAgcHVibGljIG9sOiBvbExheWVyVmVjdG9yO1xyXG4gIHByaXZhdGUgd2F0Y2hlcjogVmVjdG9yV2F0Y2hlcjtcclxuXHJcbiAgZ2V0IGJyb3dzYWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYnJvd3NhYmxlICE9PSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldCBleHBvcnRhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5leHBvcnRhYmxlICE9PSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFZlY3RvckxheWVyT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB0aGlzLndhdGNoZXIgPSBuZXcgVmVjdG9yV2F0Y2hlcih0aGlzKTtcclxuICAgIHRoaXMuc3RhdHVzJCA9IHRoaXMud2F0Y2hlci5zdGF0dXMkO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sTGF5ZXIoKTogb2xMYXllclZlY3RvciB7XHJcbiAgICBjb25zdCBvbE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMsIHtcclxuICAgICAgc291cmNlOiB0aGlzLm9wdGlvbnMuc291cmNlLm9sIGFzIG9sU291cmNlVmVjdG9yXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmFuaW1hdGlvbikge1xyXG4gICAgICB0aGlzLmRhdGFTb3VyY2Uub2wub24oXHJcbiAgICAgICAgJ2FkZGZlYXR1cmUnLFxyXG4gICAgICAgIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIHRoaXMuZmxhc2goZS5mZWF0dXJlKTtcclxuICAgICAgICB9LmJpbmQodGhpcylcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IG9sTGF5ZXJWZWN0b3Iob2xPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBmbGFzaChmZWF0dXJlKSB7XHJcbiAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgY29uc3QgbGlzdGVuZXJLZXkgPSB0aGlzLm1hcC5vbC5vbigncG9zdGNvbXBvc2UnLCBhbmltYXRlLmJpbmQodGhpcykpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFuaW1hdGUoZXZlbnQpIHtcclxuICAgICAgY29uc3QgdmVjdG9yQ29udGV4dCA9IGV2ZW50LnZlY3RvckNvbnRleHQ7XHJcbiAgICAgIGNvbnN0IGZyYW1lU3RhdGUgPSBldmVudC5mcmFtZVN0YXRlO1xyXG4gICAgICBjb25zdCBmbGFzaEdlb20gPSBmZWF0dXJlLmdldEdlb21ldHJ5KCkuY2xvbmUoKTtcclxuICAgICAgY29uc3QgZWxhcHNlZCA9IGZyYW1lU3RhdGUudGltZSAtIHN0YXJ0O1xyXG4gICAgICBjb25zdCBlbGFwc2VkUmF0aW8gPSBlbGFwc2VkIC8gdGhpcy5vcHRpb25zLmFuaW1hdGlvbi5kdXJhdGlvbjtcclxuICAgICAgY29uc3Qgb3BhY2l0eSA9IGVhc2VPdXQoMSAtIGVsYXBzZWRSYXRpbyk7XHJcbiAgICAgIGNvbnN0IG5ld0NvbG9yID0gQ29sb3JBc0FycmF5KHRoaXMub3B0aW9ucy5hbmltYXRpb24uY29sb3IgfHwgJ3JlZCcpO1xyXG4gICAgICBuZXdDb2xvclszXSA9IG9wYWNpdHk7XHJcbiAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5vbC5nZXRTdHlsZUZ1bmN0aW9uKCkuY2FsbCh0aGlzLCBmZWF0dXJlKVswXTtcclxuICAgICAgY29uc3Qgc3R5bGVDbG9uZSA9IHN0eWxlLmNsb25lKCk7XHJcblxyXG4gICAgICBzd2l0Y2ggKGZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRUeXBlKCkpIHtcclxuICAgICAgICBjYXNlICdQb2ludCc6XHJcbiAgICAgICAgICBjb25zdCByYWRpdXMgPVxyXG4gICAgICAgICAgICBlYXNlT3V0KGVsYXBzZWRSYXRpbykgKiAoc3R5bGVDbG9uZS5nZXRJbWFnZSgpLmdldFJhZGl1cygpICogMyk7XHJcbiAgICAgICAgICBzdHlsZUNsb25lLmdldEltYWdlKCkuc2V0UmFkaXVzKHJhZGl1cyk7XHJcbiAgICAgICAgICBzdHlsZUNsb25lLmdldEltYWdlKCkuc2V0T3BhY2l0eShvcGFjaXR5KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxyXG4gICAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICAgaWYgKHN0eWxlQ2xvbmUuZ2V0SW1hZ2UoKS5nZXRTdHJva2UoKSkge1xyXG4gICAgICAgICAgICBzdHlsZUNsb25lXHJcbiAgICAgICAgICAgICAgLmdldEltYWdlKClcclxuICAgICAgICAgICAgICAuZ2V0U3Ryb2tlKClcclxuICAgICAgICAgICAgICAuc2V0Q29sb3IobmV3Q29sb3IpO1xyXG4gICAgICAgICAgICBzdHlsZUNsb25lXHJcbiAgICAgICAgICAgICAgLmdldEltYWdlKClcclxuICAgICAgICAgICAgICAuZ2V0U3Ryb2tlKClcclxuICAgICAgICAgICAgICAuc2V0V2lkdGgoXHJcbiAgICAgICAgICAgICAgICBlYXNlT3V0KGVsYXBzZWRSYXRpbykgKlxyXG4gICAgICAgICAgICAgICAgICAoc3R5bGVDbG9uZVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRJbWFnZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldFN0cm9rZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldFdpZHRoKCkgKlxyXG4gICAgICAgICAgICAgICAgICAgIDMpXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzdHlsZUNsb25lLmdldFN0cm9rZSgpKSB7XHJcbiAgICAgICAgICAgIHN0eWxlQ2xvbmUuZ2V0U3Ryb2tlKCkuc2V0Q29sb3IobmV3Q29sb3IpO1xyXG4gICAgICAgICAgICBzdHlsZUNsb25lXHJcbiAgICAgICAgICAgICAgLmdldFN0cm9rZSgpXHJcbiAgICAgICAgICAgICAgLnNldFdpZHRoKFxyXG4gICAgICAgICAgICAgICAgZWFzZU91dChlbGFwc2VkUmF0aW8pICogKHN0eWxlQ2xvbmUuZ2V0U3Ryb2tlKCkuZ2V0V2lkdGgoKSAqIDMpXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ1BvbHlnb24nOlxyXG4gICAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICAgaWYgKHN0eWxlQ2xvbmUuZ2V0SW1hZ2UoKS5nZXRGaWxsKCkpIHtcclxuICAgICAgICAgICAgc3R5bGVDbG9uZVxyXG4gICAgICAgICAgICAgIC5nZXRJbWFnZSgpXHJcbiAgICAgICAgICAgICAgLmdldEZpbGwoKVxyXG4gICAgICAgICAgICAgIC5zZXRDb2xvcihuZXdDb2xvcik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc3R5bGVDbG9uZS5nZXRGaWxsKCkpIHtcclxuICAgICAgICAgICAgc3R5bGVDbG9uZS5nZXRGaWxsKCkuc2V0Q29sb3IobmV3Q29sb3IpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZlY3RvckNvbnRleHQuc2V0U3R5bGUoc3R5bGVDbG9uZSk7XHJcbiAgICAgIHZlY3RvckNvbnRleHQuZHJhd0dlb21ldHJ5KGZsYXNoR2VvbSk7XHJcblxyXG4gICAgICBpZiAoZWxhcHNlZCA+IHRoaXMub3B0aW9ucy5hbmltYXRpb24uZHVyYXRpb24pIHtcclxuICAgICAgICB1bkJ5S2V5KGxpc3RlbmVyS2V5KTtcclxuICAgICAgICAvLyByZW1vdmUgbGFzdCBnZW9tZXRyeVxyXG4gICAgICAgIC8vIHRoZXJlIGlzIGEgbGl0dGxlIGZsYXNoIGJlZm9yZSBmZWF0dXJlIGRpc2FwcGVhciwgYmV0dGVyIHNvbHV0aW9uID9cclxuICAgICAgICB0aGlzLm1hcC5vbC5yZW5kZXIoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgLy8gdGVsbCBPcGVuTGF5ZXJzIHRvIGNvbnRpbnVlIHBvc3Rjb21wb3NlIGFuaW1hdGlvblxyXG4gICAgICB0aGlzLm1hcC5vbC5yZW5kZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRNYXAobWFwOiBJZ29NYXAgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmIChtYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLndhdGNoZXIudW5zdWJzY3JpYmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMud2F0Y2hlci5zdWJzY3JpYmUoKCkgPT4ge30pO1xyXG4gICAgfVxyXG4gICAgc3VwZXIuc2V0TWFwKG1hcCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25VbndhdGNoKCkge1xyXG4gICAgdGhpcy5kYXRhU291cmNlLm9uVW53YXRjaCgpO1xyXG4gICAgdGhpcy5zdG9wQW5pbWF0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RvcEFuaW1hdGlvbigpIHtcclxuICAgIHRoaXMuZGF0YVNvdXJjZS5vbC51bihcclxuICAgICAgJ2FkZGZlYXR1cmUnLFxyXG4gICAgICBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdGhpcy5mbGFzaChlLmZlYXR1cmUpO1xyXG4gICAgICB9LmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==