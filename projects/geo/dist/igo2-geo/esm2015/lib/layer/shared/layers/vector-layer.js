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
        if (this.options.trackFeature) {
            this.enableTrackFeature(this.options.trackFeature);
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
            let style = this.ol
                .getStyleFunction()
                .call(this, feature)
                .find((/**
             * @param {?} style2
             * @return {?}
             */
            style2 => {
                return style2.getImage();
            }));
            if (!style) {
                style = this.ol.getStyleFunction().call(this, feature)[0];
            }
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
            if (this.visible) {
                this.flash(e.feature);
            }
        }).bind(this));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    enableTrackFeature(id) {
        this.trackFeatureListenerId = this.dataSource.ol.on('addfeature', this.trackFeature.bind(this, id));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    centerMapOnFeature(id) {
        /** @type {?} */
        const feat = this.dataSource.ol.getFeatureById(id);
        if (feat) {
            this.map.ol.getView().setCenter(feat.getGeometry().getCoordinates());
        }
    }
    /**
     * @param {?} id
     * @param {?} feat
     * @return {?}
     */
    trackFeature(id, feat) {
        if (feat.feature.getId() === id && this.visible) {
            this.centerMapOnFeature(id);
        }
    }
    /**
     * @param {?=} id
     * @return {?}
     */
    disableTrackFeature(id) {
        unByKey(this.trackFeatureListenerId);
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
    /**
     * @type {?}
     * @private
     */
    VectorLayer.prototype.trackFeatureListenerId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9yLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL3NoYXJlZC9sYXllcnMvdmVjdG9yLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUU1QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxFQUFFLE9BQU8sSUFBSSxZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFRbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUU1QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBR2hDLE1BQU0sT0FBTyxXQUFZLFNBQVEsS0FBSzs7OztJQVlwQyxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQztJQUMxQyxDQUFDOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUM7SUFDM0MsQ0FBQzs7OztJQUVELFlBQVksT0FBMkI7UUFDckMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ3RDLENBQUM7Ozs7O0lBRVMsYUFBYTs7Y0FDZixTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoRCxNQUFNLEVBQUUsbUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFr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OztjQUNyQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztRQUNsRCxJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUN0RTtJQUNILENBQUM7Ozs7OztJQUVNLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSTtRQUMxQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDL0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7Ozs7SUFFTSxtQkFBbUIsQ0FBQyxFQUFvQjtRQUM3QyxPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNGOzs7SUF0TEMsaUNBS3NCOztJQUN0Qiw4QkFBbUM7O0lBQ25DLHlCQUF5Qjs7Ozs7SUFDekIsOEJBQStCOzs7OztJQUMvQiw2Q0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xMYXllclZlY3RvciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xyXG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgZWFzZU91dCB9IGZyb20gJ29sL2Vhc2luZyc7XHJcbmltcG9ydCB7IGFzQXJyYXkgYXMgQ29sb3JBc0FycmF5IH0gZnJvbSAnb2wvY29sb3InO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBXRlNEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBBcmNHSVNSZXN0RGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2FyY2dpc3Jlc3QtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFdlYlNvY2tldERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93ZWJzb2NrZXQtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvY2x1c3Rlci1kYXRhc291cmNlJztcclxuXHJcbmltcG9ydCB7IFZlY3RvcldhdGNoZXIgfSBmcm9tICcuLi8uLi91dGlscyc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi9sYXllcic7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyT3B0aW9ucyB9IGZyb20gJy4vdmVjdG9yLWxheWVyLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVmVjdG9yTGF5ZXIgZXh0ZW5kcyBMYXllciB7XHJcbiAgcHVibGljIGRhdGFTb3VyY2U6XHJcbiAgICB8IEZlYXR1cmVEYXRhU291cmNlXHJcbiAgICB8IFdGU0RhdGFTb3VyY2VcclxuICAgIHwgQXJjR0lTUmVzdERhdGFTb3VyY2VcclxuICAgIHwgV2ViU29ja2V0RGF0YVNvdXJjZVxyXG4gICAgfCBDbHVzdGVyRGF0YVNvdXJjZTtcclxuICBwdWJsaWMgb3B0aW9uczogVmVjdG9yTGF5ZXJPcHRpb25zO1xyXG4gIHB1YmxpYyBvbDogb2xMYXllclZlY3RvcjtcclxuICBwcml2YXRlIHdhdGNoZXI6IFZlY3RvcldhdGNoZXI7XHJcbiAgcHJpdmF0ZSB0cmFja0ZlYXR1cmVMaXN0ZW5lcklkO1xyXG5cclxuICBnZXQgYnJvd3NhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5icm93c2FibGUgIT09IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGV4cG9ydGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmV4cG9ydGFibGUgIT09IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogVmVjdG9yTGF5ZXJPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIHRoaXMud2F0Y2hlciA9IG5ldyBWZWN0b3JXYXRjaGVyKHRoaXMpO1xyXG4gICAgdGhpcy5zdGF0dXMkID0gdGhpcy53YXRjaGVyLnN0YXR1cyQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xMYXllcigpOiBvbExheWVyVmVjdG9yIHtcclxuICAgIGNvbnN0IG9sT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucywge1xyXG4gICAgICBzb3VyY2U6IHRoaXMub3B0aW9ucy5zb3VyY2Uub2wgYXMgb2xTb3VyY2VWZWN0b3JcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYW5pbWF0aW9uKSB7XHJcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5vbC5vbihcclxuICAgICAgICAnYWRkZmVhdHVyZScsXHJcbiAgICAgICAgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgdGhpcy5mbGFzaChlLmZlYXR1cmUpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhY2tGZWF0dXJlKSB7XHJcbiAgICAgIHRoaXMuZW5hYmxlVHJhY2tGZWF0dXJlKHRoaXMub3B0aW9ucy50cmFja0ZlYXR1cmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgb2xMYXllclZlY3RvcihvbE9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGZsYXNoKGZlYXR1cmUpIHtcclxuICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICBjb25zdCBsaXN0ZW5lcktleSA9IHRoaXMubWFwLm9sLm9uKCdwb3N0Y29tcG9zZScsIGFuaW1hdGUuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgZnVuY3Rpb24gYW5pbWF0ZShldmVudCkge1xyXG4gICAgICBjb25zdCB2ZWN0b3JDb250ZXh0ID0gZXZlbnQudmVjdG9yQ29udGV4dDtcclxuICAgICAgY29uc3QgZnJhbWVTdGF0ZSA9IGV2ZW50LmZyYW1lU3RhdGU7XHJcbiAgICAgIGNvbnN0IGZsYXNoR2VvbSA9IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5jbG9uZSgpO1xyXG4gICAgICBjb25zdCBlbGFwc2VkID0gZnJhbWVTdGF0ZS50aW1lIC0gc3RhcnQ7XHJcbiAgICAgIGNvbnN0IGVsYXBzZWRSYXRpbyA9IGVsYXBzZWQgLyB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uLmR1cmF0aW9uO1xyXG4gICAgICBjb25zdCBvcGFjaXR5ID0gZWFzZU91dCgxIC0gZWxhcHNlZFJhdGlvKTtcclxuICAgICAgY29uc3QgbmV3Q29sb3IgPSBDb2xvckFzQXJyYXkodGhpcy5vcHRpb25zLmFuaW1hdGlvbi5jb2xvciB8fCAncmVkJyk7XHJcbiAgICAgIG5ld0NvbG9yWzNdID0gb3BhY2l0eTtcclxuICAgICAgbGV0IHN0eWxlID0gdGhpcy5vbFxyXG4gICAgICAgIC5nZXRTdHlsZUZ1bmN0aW9uKClcclxuICAgICAgICAuY2FsbCh0aGlzLCBmZWF0dXJlKVxyXG4gICAgICAgIC5maW5kKHN0eWxlMiA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gc3R5bGUyLmdldEltYWdlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIGlmICghc3R5bGUpIHtcclxuICAgICAgICBzdHlsZSA9IHRoaXMub2wuZ2V0U3R5bGVGdW5jdGlvbigpLmNhbGwodGhpcywgZmVhdHVyZSlbMF07XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgc3R5bGVDbG9uZSA9IHN0eWxlLmNsb25lKCk7XHJcblxyXG4gICAgICBzd2l0Y2ggKGZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRUeXBlKCkpIHtcclxuICAgICAgICBjYXNlICdQb2ludCc6XHJcbiAgICAgICAgICBjb25zdCByYWRpdXMgPVxyXG4gICAgICAgICAgICBlYXNlT3V0KGVsYXBzZWRSYXRpbykgKiAoc3R5bGVDbG9uZS5nZXRJbWFnZSgpLmdldFJhZGl1cygpICogMyk7XHJcbiAgICAgICAgICBzdHlsZUNsb25lLmdldEltYWdlKCkuc2V0UmFkaXVzKHJhZGl1cyk7XHJcbiAgICAgICAgICBzdHlsZUNsb25lLmdldEltYWdlKCkuc2V0T3BhY2l0eShvcGFjaXR5KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxyXG4gICAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICAgaWYgKHN0eWxlQ2xvbmUuZ2V0SW1hZ2UoKSkge1xyXG4gICAgICAgICAgICBzdHlsZUNsb25lXHJcbiAgICAgICAgICAgICAgLmdldEltYWdlKClcclxuICAgICAgICAgICAgICAuZ2V0U3Ryb2tlKClcclxuICAgICAgICAgICAgICAuc2V0Q29sb3IobmV3Q29sb3IpO1xyXG4gICAgICAgICAgICBzdHlsZUNsb25lXHJcbiAgICAgICAgICAgICAgLmdldEltYWdlKClcclxuICAgICAgICAgICAgICAuZ2V0U3Ryb2tlKClcclxuICAgICAgICAgICAgICAuc2V0V2lkdGgoXHJcbiAgICAgICAgICAgICAgICBlYXNlT3V0KGVsYXBzZWRSYXRpbykgKlxyXG4gICAgICAgICAgICAgICAgICAoc3R5bGVDbG9uZVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRJbWFnZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldFN0cm9rZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldFdpZHRoKCkgKlxyXG4gICAgICAgICAgICAgICAgICAgIDMpXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzdHlsZUNsb25lLmdldFN0cm9rZSgpKSB7XHJcbiAgICAgICAgICAgIHN0eWxlQ2xvbmUuZ2V0U3Ryb2tlKCkuc2V0Q29sb3IobmV3Q29sb3IpO1xyXG4gICAgICAgICAgICBzdHlsZUNsb25lXHJcbiAgICAgICAgICAgICAgLmdldFN0cm9rZSgpXHJcbiAgICAgICAgICAgICAgLnNldFdpZHRoKFxyXG4gICAgICAgICAgICAgICAgZWFzZU91dChlbGFwc2VkUmF0aW8pICogKHN0eWxlQ2xvbmUuZ2V0U3Ryb2tlKCkuZ2V0V2lkdGgoKSAqIDMpXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ1BvbHlnb24nOlxyXG4gICAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICAgaWYgKHN0eWxlQ2xvbmUuZ2V0SW1hZ2UoKSkge1xyXG4gICAgICAgICAgICBzdHlsZUNsb25lXHJcbiAgICAgICAgICAgICAgLmdldEltYWdlKClcclxuICAgICAgICAgICAgICAuZ2V0RmlsbCgpXHJcbiAgICAgICAgICAgICAgLnNldENvbG9yKG5ld0NvbG9yKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzdHlsZUNsb25lLmdldEZpbGwoKSkge1xyXG4gICAgICAgICAgICBzdHlsZUNsb25lLmdldEZpbGwoKS5zZXRDb2xvcihuZXdDb2xvcik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG5cclxuICAgICAgc3R5bGVDbG9uZS5zZXRUZXh0KCcnKTtcclxuICAgICAgdmVjdG9yQ29udGV4dC5zZXRTdHlsZShzdHlsZUNsb25lKTtcclxuICAgICAgdmVjdG9yQ29udGV4dC5kcmF3R2VvbWV0cnkoZmxhc2hHZW9tKTtcclxuXHJcbiAgICAgIGlmIChlbGFwc2VkID4gdGhpcy5vcHRpb25zLmFuaW1hdGlvbi5kdXJhdGlvbikge1xyXG4gICAgICAgIHVuQnlLZXkobGlzdGVuZXJLZXkpO1xyXG4gICAgICAgIC8vIHJlbW92ZSBsYXN0IGdlb21ldHJ5XHJcbiAgICAgICAgLy8gdGhlcmUgaXMgYSBsaXR0bGUgZmxhc2ggYmVmb3JlIGZlYXR1cmUgZGlzYXBwZWFyLCBiZXR0ZXIgc29sdXRpb24gP1xyXG4gICAgICAgIHRoaXMubWFwLm9sLnJlbmRlcigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICAvLyB0ZWxsIE9wZW5MYXllcnMgdG8gY29udGludWUgcG9zdGNvbXBvc2UgYW5pbWF0aW9uXHJcbiAgICAgIHRoaXMubWFwLm9sLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE1hcChtYXA6IElnb01hcCB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKG1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMud2F0Y2hlci51bnN1YnNjcmliZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy53YXRjaGVyLnN1YnNjcmliZSgoKSA9PiB7fSk7XHJcbiAgICB9XHJcbiAgICBzdXBlci5zZXRNYXAobWFwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblVud2F0Y2goKSB7XHJcbiAgICB0aGlzLmRhdGFTb3VyY2Uub25VbndhdGNoKCk7XHJcbiAgICB0aGlzLnN0b3BBbmltYXRpb24oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdG9wQW5pbWF0aW9uKCkge1xyXG4gICAgdGhpcy5kYXRhU291cmNlLm9sLnVuKFxyXG4gICAgICAnYWRkZmVhdHVyZScsXHJcbiAgICAgIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAodGhpcy52aXNpYmxlKSB7XHJcbiAgICAgICAgICB0aGlzLmZsYXNoKGUuZmVhdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZW5hYmxlVHJhY2tGZWF0dXJlKGlkOiBzdHJpbmcgfCBudW1iZXIpIHtcclxuICAgIHRoaXMudHJhY2tGZWF0dXJlTGlzdGVuZXJJZCA9IHRoaXMuZGF0YVNvdXJjZS5vbC5vbihcclxuICAgICAgJ2FkZGZlYXR1cmUnLFxyXG4gICAgICB0aGlzLnRyYWNrRmVhdHVyZS5iaW5kKHRoaXMsIGlkKVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHVibGljIGNlbnRlck1hcE9uRmVhdHVyZShpZDogc3RyaW5nIHwgbnVtYmVyKSB7XHJcbiAgICBjb25zdCBmZWF0ID0gdGhpcy5kYXRhU291cmNlLm9sLmdldEZlYXR1cmVCeUlkKGlkKTtcclxuICAgIGlmIChmZWF0KSB7XHJcbiAgICAgIHRoaXMubWFwLm9sLmdldFZpZXcoKS5zZXRDZW50ZXIoZmVhdC5nZXRHZW9tZXRyeSgpLmdldENvb3JkaW5hdGVzKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHRyYWNrRmVhdHVyZShpZCwgZmVhdCkge1xyXG4gICAgaWYgKGZlYXQuZmVhdHVyZS5nZXRJZCgpID09PSBpZCAmJiB0aGlzLnZpc2libGUpIHtcclxuICAgICAgdGhpcy5jZW50ZXJNYXBPbkZlYXR1cmUoaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc2FibGVUcmFja0ZlYXR1cmUoaWQ/OiBzdHJpbmcgfCBudW1iZXIpIHtcclxuICAgIHVuQnlLZXkodGhpcy50cmFja0ZlYXR1cmVMaXN0ZW5lcklkKTtcclxuICB9XHJcbn1cclxuIl19