/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olLayerVector from 'ol/layer/Vector';
import { unByKey } from 'ol/Observable';
import { easeOut } from 'ol/easing';
import { asArray as ColorAsArray } from 'ol/color';
import { VectorWatcher } from '../../utils';
import { Layer } from './layer';
export class VectorLayer extends Layer {
    /**
     * @return {?}
     */
    get browsable() {
        return this.options.browsable !== false;
    }
    /**
     * @return {?}
     */
    get exportable() {
        return this.options.exportable !== false;
    }
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.watcher = new VectorWatcher(this);
        this.status$ = this.watcher.status$;
    }
    /**
     * @protected
     * @return {?}
     */
    createOlLayer() {
        /** @type {?} */
        const olOptions = Object.assign({}, this.options, {
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
    }
    /**
     * @protected
     * @param {?} feature
     * @return {?}
     */
    flash(feature) {
        /** @type {?} */
        const start = new Date().getTime();
        /** @type {?} */
        const listenerKey = this.map.ol.on('postcompose', animate.bind(this));
        /**
         * @param {?} event
         * @return {?}
         */
        function animate(event) {
            /** @type {?} */
            const vectorContext = event.vectorContext;
            /** @type {?} */
            const frameState = event.frameState;
            /** @type {?} */
            const flashGeom = feature.getGeometry().clone();
            /** @type {?} */
            const elapsed = frameState.time - start;
            /** @type {?} */
            const elapsedRatio = elapsed / this.options.animation.duration;
            /** @type {?} */
            const opacity = easeOut(1 - elapsedRatio);
            /** @type {?} */
            const newColor = ColorAsArray(this.options.animation.color || 'red');
            newColor[3] = opacity;
            /** @type {?} */
            const style = this.ol.getStyleFunction().call(this, feature)[0];
            /** @type {?} */
            const styleClone = style.clone();
            switch (feature.getGeometry().getType()) {
                case 'Point':
                    /** @type {?} */
                    const radius = easeOut(elapsedRatio) * (styleClone.getImage().getRadius() * 3);
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
    }
    /**
     * @param {?} map
     * @return {?}
     */
    setMap(map) {
        if (map === undefined) {
            this.watcher.unsubscribe();
        }
        else {
            this.watcher.subscribe((/**
             * @return {?}
             */
            () => { }));
        }
        super.setMap(map);
    }
    /**
     * @return {?}
     */
    onUnwatch() {
        this.dataSource.onUnwatch();
        this.stopAnimation();
    }
    /**
     * @return {?}
     */
    stopAnimation() {
        this.dataSource.ol.un('addfeature', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.flash(e.feature);
        }).bind(this));
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9yLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL3NoYXJlZC9sYXllcnMvdmVjdG9yLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUU1QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxFQUFFLE9BQU8sSUFBSSxZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFRbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUU1QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBR2hDLE1BQU0sT0FBTyxXQUFZLFNBQVEsS0FBSzs7OztJQU1wQyxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQztJQUMxQyxDQUFDOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUM7SUFDM0MsQ0FBQzs7OztJQUVELFlBQVksT0FBMkI7UUFDckMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ3RDLENBQUM7Ozs7O0lBRVMsYUFBYTs7Y0FDZixTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoRCxNQUFNLEVBQUUsbUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFr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LENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFFTSxTQUFTO1FBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVNLGFBQWE7UUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUNuQixZQUFZLEVBQ1o7Ozs7UUFBQSxVQUFTLENBQUM7WUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQUM7SUFDSixDQUFDO0NBQ0Y7OztJQTFJQyxpQ0FBc0g7O0lBQ3RILDhCQUFtQzs7SUFDbkMseUJBQXlCOzs7OztJQUN6Qiw4QkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xMYXllclZlY3RvciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xyXG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgZWFzZU91dCB9IGZyb20gJ29sL2Vhc2luZyc7XHJcbmltcG9ydCB7IGFzQXJyYXkgYXMgQ29sb3JBc0FycmF5IH0gZnJvbSAnb2wvY29sb3InO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBXRlNEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBBcmNHSVNSZXN0RGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2FyY2dpc3Jlc3QtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFdlYlNvY2tldERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93ZWJzb2NrZXQtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvY2x1c3Rlci1kYXRhc291cmNlJztcclxuXHJcbmltcG9ydCB7IFZlY3RvcldhdGNoZXIgfSBmcm9tICcuLi8uLi91dGlscyc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi9sYXllcic7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyT3B0aW9ucyB9IGZyb20gJy4vdmVjdG9yLWxheWVyLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVmVjdG9yTGF5ZXIgZXh0ZW5kcyBMYXllciB7XHJcbiAgcHVibGljIGRhdGFTb3VyY2U6IEZlYXR1cmVEYXRhU291cmNlIHwgV0ZTRGF0YVNvdXJjZSB8IEFyY0dJU1Jlc3REYXRhU291cmNlIHwgV2ViU29ja2V0RGF0YVNvdXJjZSB8IENsdXN0ZXJEYXRhU291cmNlO1xyXG4gIHB1YmxpYyBvcHRpb25zOiBWZWN0b3JMYXllck9wdGlvbnM7XHJcbiAgcHVibGljIG9sOiBvbExheWVyVmVjdG9yO1xyXG4gIHByaXZhdGUgd2F0Y2hlcjogVmVjdG9yV2F0Y2hlcjtcclxuXHJcbiAgZ2V0IGJyb3dzYWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYnJvd3NhYmxlICE9PSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldCBleHBvcnRhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5leHBvcnRhYmxlICE9PSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFZlY3RvckxheWVyT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB0aGlzLndhdGNoZXIgPSBuZXcgVmVjdG9yV2F0Y2hlcih0aGlzKTtcclxuICAgIHRoaXMuc3RhdHVzJCA9IHRoaXMud2F0Y2hlci5zdGF0dXMkO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sTGF5ZXIoKTogb2xMYXllclZlY3RvciB7XHJcbiAgICBjb25zdCBvbE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMsIHtcclxuICAgICAgc291cmNlOiB0aGlzLm9wdGlvbnMuc291cmNlLm9sIGFzIG9sU291cmNlVmVjdG9yXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmFuaW1hdGlvbikge1xyXG4gICAgICB0aGlzLmRhdGFTb3VyY2Uub2wub24oXHJcbiAgICAgICAgJ2FkZGZlYXR1cmUnLFxyXG4gICAgICAgIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIHRoaXMuZmxhc2goZS5mZWF0dXJlKTtcclxuICAgICAgICB9LmJpbmQodGhpcylcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IG9sTGF5ZXJWZWN0b3Iob2xPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBmbGFzaChmZWF0dXJlKSB7XHJcbiAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgY29uc3QgbGlzdGVuZXJLZXkgPSB0aGlzLm1hcC5vbC5vbigncG9zdGNvbXBvc2UnLCBhbmltYXRlLmJpbmQodGhpcykpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFuaW1hdGUoZXZlbnQpIHtcclxuICAgICAgY29uc3QgdmVjdG9yQ29udGV4dCA9IGV2ZW50LnZlY3RvckNvbnRleHQ7XHJcbiAgICAgIGNvbnN0IGZyYW1lU3RhdGUgPSBldmVudC5mcmFtZVN0YXRlO1xyXG4gICAgICBjb25zdCBmbGFzaEdlb20gPSBmZWF0dXJlLmdldEdlb21ldHJ5KCkuY2xvbmUoKTtcclxuICAgICAgY29uc3QgZWxhcHNlZCA9IGZyYW1lU3RhdGUudGltZSAtIHN0YXJ0O1xyXG4gICAgICBjb25zdCBlbGFwc2VkUmF0aW8gPSBlbGFwc2VkIC8gdGhpcy5vcHRpb25zLmFuaW1hdGlvbi5kdXJhdGlvbjtcclxuICAgICAgY29uc3Qgb3BhY2l0eSA9IGVhc2VPdXQoMSAtIGVsYXBzZWRSYXRpbyk7XHJcbiAgICAgIGNvbnN0IG5ld0NvbG9yID0gQ29sb3JBc0FycmF5KHRoaXMub3B0aW9ucy5hbmltYXRpb24uY29sb3IgfHwgJ3JlZCcpO1xyXG4gICAgICBuZXdDb2xvclszXSA9IG9wYWNpdHk7XHJcbiAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5vbC5nZXRTdHlsZUZ1bmN0aW9uKCkuY2FsbCh0aGlzLCBmZWF0dXJlKVswXTtcclxuICAgICAgY29uc3Qgc3R5bGVDbG9uZSA9IHN0eWxlLmNsb25lKCk7XHJcblxyXG4gICAgICBzd2l0Y2ggKGZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRUeXBlKCkpIHtcclxuICAgICAgICBjYXNlICdQb2ludCc6XHJcbiAgICAgICAgICBjb25zdCByYWRpdXMgPVxyXG4gICAgICAgICAgICBlYXNlT3V0KGVsYXBzZWRSYXRpbykgKiAoc3R5bGVDbG9uZS5nZXRJbWFnZSgpLmdldFJhZGl1cygpICogMyk7XHJcbiAgICAgICAgICBzdHlsZUNsb25lLmdldEltYWdlKCkuc2V0UmFkaXVzKHJhZGl1cyk7XHJcbiAgICAgICAgICBzdHlsZUNsb25lLmdldEltYWdlKCkuc2V0T3BhY2l0eShvcGFjaXR5KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxyXG4gICAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICAgaWYgKHN0eWxlQ2xvbmUuZ2V0SW1hZ2UoKS5nZXRTdHJva2UoKSkge1xyXG4gICAgICAgICAgICBzdHlsZUNsb25lXHJcbiAgICAgICAgICAgICAgLmdldEltYWdlKClcclxuICAgICAgICAgICAgICAuZ2V0U3Ryb2tlKClcclxuICAgICAgICAgICAgICAuc2V0Q29sb3IobmV3Q29sb3IpO1xyXG4gICAgICAgICAgICBzdHlsZUNsb25lXHJcbiAgICAgICAgICAgICAgLmdldEltYWdlKClcclxuICAgICAgICAgICAgICAuZ2V0U3Ryb2tlKClcclxuICAgICAgICAgICAgICAuc2V0V2lkdGgoXHJcbiAgICAgICAgICAgICAgICBlYXNlT3V0KGVsYXBzZWRSYXRpbykgKlxyXG4gICAgICAgICAgICAgICAgICAoc3R5bGVDbG9uZVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRJbWFnZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldFN0cm9rZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldFdpZHRoKCkgKlxyXG4gICAgICAgICAgICAgICAgICAgIDMpXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzdHlsZUNsb25lLmdldFN0cm9rZSgpKSB7XHJcbiAgICAgICAgICAgIHN0eWxlQ2xvbmUuZ2V0U3Ryb2tlKCkuc2V0Q29sb3IobmV3Q29sb3IpO1xyXG4gICAgICAgICAgICBzdHlsZUNsb25lXHJcbiAgICAgICAgICAgICAgLmdldFN0cm9rZSgpXHJcbiAgICAgICAgICAgICAgLnNldFdpZHRoKFxyXG4gICAgICAgICAgICAgICAgZWFzZU91dChlbGFwc2VkUmF0aW8pICogKHN0eWxlQ2xvbmUuZ2V0U3Ryb2tlKCkuZ2V0V2lkdGgoKSAqIDMpXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ1BvbHlnb24nOlxyXG4gICAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICAgaWYgKHN0eWxlQ2xvbmUuZ2V0SW1hZ2UoKS5nZXRGaWxsKCkpIHtcclxuICAgICAgICAgICAgc3R5bGVDbG9uZVxyXG4gICAgICAgICAgICAgIC5nZXRJbWFnZSgpXHJcbiAgICAgICAgICAgICAgLmdldEZpbGwoKVxyXG4gICAgICAgICAgICAgIC5zZXRDb2xvcihuZXdDb2xvcik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc3R5bGVDbG9uZS5nZXRGaWxsKCkpIHtcclxuICAgICAgICAgICAgc3R5bGVDbG9uZS5nZXRGaWxsKCkuc2V0Q29sb3IobmV3Q29sb3IpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZlY3RvckNvbnRleHQuc2V0U3R5bGUoc3R5bGVDbG9uZSk7XHJcbiAgICAgIHZlY3RvckNvbnRleHQuZHJhd0dlb21ldHJ5KGZsYXNoR2VvbSk7XHJcblxyXG4gICAgICBpZiAoZWxhcHNlZCA+IHRoaXMub3B0aW9ucy5hbmltYXRpb24uZHVyYXRpb24pIHtcclxuICAgICAgICB1bkJ5S2V5KGxpc3RlbmVyS2V5KTtcclxuICAgICAgICAvLyByZW1vdmUgbGFzdCBnZW9tZXRyeVxyXG4gICAgICAgIC8vIHRoZXJlIGlzIGEgbGl0dGxlIGZsYXNoIGJlZm9yZSBmZWF0dXJlIGRpc2FwcGVhciwgYmV0dGVyIHNvbHV0aW9uID9cclxuICAgICAgICB0aGlzLm1hcC5vbC5yZW5kZXIoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgLy8gdGVsbCBPcGVuTGF5ZXJzIHRvIGNvbnRpbnVlIHBvc3Rjb21wb3NlIGFuaW1hdGlvblxyXG4gICAgICB0aGlzLm1hcC5vbC5yZW5kZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRNYXAobWFwOiBJZ29NYXAgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmIChtYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLndhdGNoZXIudW5zdWJzY3JpYmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMud2F0Y2hlci5zdWJzY3JpYmUoKCkgPT4ge30pO1xyXG4gICAgfVxyXG4gICAgc3VwZXIuc2V0TWFwKG1hcCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25VbndhdGNoKCkge1xyXG4gICAgdGhpcy5kYXRhU291cmNlLm9uVW53YXRjaCgpO1xyXG4gICAgdGhpcy5zdG9wQW5pbWF0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RvcEFuaW1hdGlvbigpIHtcclxuICAgIHRoaXMuZGF0YVNvdXJjZS5vbC51bihcclxuICAgICAgJ2FkZGZlYXR1cmUnLFxyXG4gICAgICBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdGhpcy5mbGFzaChlLmZlYXR1cmUpO1xyXG4gICAgICB9LmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==