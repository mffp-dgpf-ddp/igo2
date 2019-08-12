/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olLayerVector from 'ol/layer/Vector';
import { unByKey } from 'ol/Observable';
import { easeOut } from 'ol/easing';
import { asArray as ColorAsArray } from 'ol/color';
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
}
if (false) {
    /** @type {?} */
    VectorLayer.prototype.dataSource;
    /** @type {?} */
    VectorLayer.prototype.options;
    /** @type {?} */
    VectorLayer.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9yLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL3NoYXJlZC9sYXllcnMvdmVjdG9yLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUU1QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxFQUFFLE9BQU8sSUFBSSxZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFRbkQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUdoQyxNQUFNLE9BQU8sV0FBWSxTQUFRLEtBQUs7Ozs7SUFVcEMsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUM7SUFDMUMsQ0FBQzs7OztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDO0lBQzNDLENBQUM7Ozs7SUFFRCxZQUFZLE9BQTJCO1FBQ3JDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQixDQUFDOzs7OztJQUVTLGFBQWE7O2NBQ2YsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEQsTUFBTSxFQUFFLG1CQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBa0I7U0FDakQsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUNuQixZQUFZLEVBQ1o7Ozs7WUFBQSxVQUFTLENBQUM7Z0JBQ1IsSUFBSSxDQUFDLEtBQUssQ0FB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RUFBRTt3QkFDbkMsVUFBVTs2QkFDUCxRQUFRLEVBQUU7NkJBQ1YsT0FBTyxFQUFFOzZCQUNULFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDdkI7b0JBQ0QsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQ3hCLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ3pDO29CQUNELE1BQU07YUFDVDtZQUVELGFBQWEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV0QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDckIsdUJBQXVCO2dCQUN2QixzRUFBc0U7Z0JBQ3RFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNyQixPQUFPO2FBQ1I7WUFDRCxvREFBb0Q7WUFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkIsQ0FBQztJQUNILENBQUM7Q0FDRjs7O0lBckhDLGlDQUtzQjs7SUFDdEIsOEJBQW1DOztJQUNuQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xMYXllclZlY3RvciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xyXG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgZWFzZU91dCB9IGZyb20gJ29sL2Vhc2luZyc7XHJcbmltcG9ydCB7IGFzQXJyYXkgYXMgQ29sb3JBc0FycmF5IH0gZnJvbSAnb2wvY29sb3InO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBXRlNEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBBcmNHSVNSZXN0RGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2FyY2dpc3Jlc3QtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFdlYlNvY2tldERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93ZWJzb2NrZXQtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvY2x1c3Rlci1kYXRhc291cmNlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi9sYXllcic7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyT3B0aW9ucyB9IGZyb20gJy4vdmVjdG9yLWxheWVyLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVmVjdG9yTGF5ZXIgZXh0ZW5kcyBMYXllciB7XHJcbiAgcHVibGljIGRhdGFTb3VyY2U6XHJcbiAgICB8IEZlYXR1cmVEYXRhU291cmNlXHJcbiAgICB8IFdGU0RhdGFTb3VyY2VcclxuICAgIHwgQXJjR0lTUmVzdERhdGFTb3VyY2VcclxuICAgIHwgV2ViU29ja2V0RGF0YVNvdXJjZVxyXG4gICAgfCBDbHVzdGVyRGF0YVNvdXJjZTtcclxuICBwdWJsaWMgb3B0aW9uczogVmVjdG9yTGF5ZXJPcHRpb25zO1xyXG4gIHB1YmxpYyBvbDogb2xMYXllclZlY3RvcjtcclxuXHJcbiAgZ2V0IGJyb3dzYWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYnJvd3NhYmxlICE9PSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldCBleHBvcnRhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5leHBvcnRhYmxlICE9PSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFZlY3RvckxheWVyT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xMYXllcigpOiBvbExheWVyVmVjdG9yIHtcclxuICAgIGNvbnN0IG9sT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucywge1xyXG4gICAgICBzb3VyY2U6IHRoaXMub3B0aW9ucy5zb3VyY2Uub2wgYXMgb2xTb3VyY2VWZWN0b3JcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYW5pbWF0aW9uKSB7XHJcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5vbC5vbihcclxuICAgICAgICAnYWRkZmVhdHVyZScsXHJcbiAgICAgICAgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgdGhpcy5mbGFzaChlLmZlYXR1cmUpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgb2xMYXllclZlY3RvcihvbE9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGZsYXNoKGZlYXR1cmUpIHtcclxuICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICBjb25zdCBsaXN0ZW5lcktleSA9IHRoaXMubWFwLm9sLm9uKCdwb3N0Y29tcG9zZScsIGFuaW1hdGUuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgZnVuY3Rpb24gYW5pbWF0ZShldmVudCkge1xyXG4gICAgICBjb25zdCB2ZWN0b3JDb250ZXh0ID0gZXZlbnQudmVjdG9yQ29udGV4dDtcclxuICAgICAgY29uc3QgZnJhbWVTdGF0ZSA9IGV2ZW50LmZyYW1lU3RhdGU7XHJcbiAgICAgIGNvbnN0IGZsYXNoR2VvbSA9IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5jbG9uZSgpO1xyXG4gICAgICBjb25zdCBlbGFwc2VkID0gZnJhbWVTdGF0ZS50aW1lIC0gc3RhcnQ7XHJcbiAgICAgIGNvbnN0IGVsYXBzZWRSYXRpbyA9IGVsYXBzZWQgLyB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uLmR1cmF0aW9uO1xyXG4gICAgICBjb25zdCBvcGFjaXR5ID0gZWFzZU91dCgxIC0gZWxhcHNlZFJhdGlvKTtcclxuICAgICAgY29uc3QgbmV3Q29sb3IgPSBDb2xvckFzQXJyYXkodGhpcy5vcHRpb25zLmFuaW1hdGlvbi5jb2xvciB8fCAncmVkJyk7XHJcbiAgICAgIG5ld0NvbG9yWzNdID0gb3BhY2l0eTtcclxuICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLm9sLmdldFN0eWxlRnVuY3Rpb24oKS5jYWxsKHRoaXMsIGZlYXR1cmUpWzBdO1xyXG4gICAgICBjb25zdCBzdHlsZUNsb25lID0gc3R5bGUuY2xvbmUoKTtcclxuXHJcbiAgICAgIHN3aXRjaCAoZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldFR5cGUoKSkge1xyXG4gICAgICAgIGNhc2UgJ1BvaW50JzpcclxuICAgICAgICAgIGNvbnN0IHJhZGl1cyA9XHJcbiAgICAgICAgICAgIGVhc2VPdXQoZWxhcHNlZFJhdGlvKSAqIChzdHlsZUNsb25lLmdldEltYWdlKCkuZ2V0UmFkaXVzKCkgKiAzKTtcclxuICAgICAgICAgIHN0eWxlQ2xvbmUuZ2V0SW1hZ2UoKS5zZXRSYWRpdXMocmFkaXVzKTtcclxuICAgICAgICAgIHN0eWxlQ2xvbmUuZ2V0SW1hZ2UoKS5zZXRPcGFjaXR5KG9wYWNpdHkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnTGluZVN0cmluZyc6XHJcbiAgICAgICAgICAvLyBUT0RPXHJcbiAgICAgICAgICBpZiAoc3R5bGVDbG9uZS5nZXRJbWFnZSgpLmdldFN0cm9rZSgpKSB7XHJcbiAgICAgICAgICAgIHN0eWxlQ2xvbmVcclxuICAgICAgICAgICAgICAuZ2V0SW1hZ2UoKVxyXG4gICAgICAgICAgICAgIC5nZXRTdHJva2UoKVxyXG4gICAgICAgICAgICAgIC5zZXRDb2xvcihuZXdDb2xvcik7XHJcbiAgICAgICAgICAgIHN0eWxlQ2xvbmVcclxuICAgICAgICAgICAgICAuZ2V0SW1hZ2UoKVxyXG4gICAgICAgICAgICAgIC5nZXRTdHJva2UoKVxyXG4gICAgICAgICAgICAgIC5zZXRXaWR0aChcclxuICAgICAgICAgICAgICAgIGVhc2VPdXQoZWxhcHNlZFJhdGlvKSAqXHJcbiAgICAgICAgICAgICAgICAgIChzdHlsZUNsb25lXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldEltYWdlKClcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0U3Ryb2tlKClcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0V2lkdGgoKSAqXHJcbiAgICAgICAgICAgICAgICAgICAgMylcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHN0eWxlQ2xvbmUuZ2V0U3Ryb2tlKCkpIHtcclxuICAgICAgICAgICAgc3R5bGVDbG9uZS5nZXRTdHJva2UoKS5zZXRDb2xvcihuZXdDb2xvcik7XHJcbiAgICAgICAgICAgIHN0eWxlQ2xvbmVcclxuICAgICAgICAgICAgICAuZ2V0U3Ryb2tlKClcclxuICAgICAgICAgICAgICAuc2V0V2lkdGgoXHJcbiAgICAgICAgICAgICAgICBlYXNlT3V0KGVsYXBzZWRSYXRpbykgKiAoc3R5bGVDbG9uZS5nZXRTdHJva2UoKS5nZXRXaWR0aCgpICogMylcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnUG9seWdvbic6XHJcbiAgICAgICAgICAvLyBUT0RPXHJcbiAgICAgICAgICBpZiAoc3R5bGVDbG9uZS5nZXRJbWFnZSgpLmdldEZpbGwoKSkge1xyXG4gICAgICAgICAgICBzdHlsZUNsb25lXHJcbiAgICAgICAgICAgICAgLmdldEltYWdlKClcclxuICAgICAgICAgICAgICAuZ2V0RmlsbCgpXHJcbiAgICAgICAgICAgICAgLnNldENvbG9yKG5ld0NvbG9yKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzdHlsZUNsb25lLmdldEZpbGwoKSkge1xyXG4gICAgICAgICAgICBzdHlsZUNsb25lLmdldEZpbGwoKS5zZXRDb2xvcihuZXdDb2xvcik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG5cclxuICAgICAgdmVjdG9yQ29udGV4dC5zZXRTdHlsZShzdHlsZUNsb25lKTtcclxuICAgICAgdmVjdG9yQ29udGV4dC5kcmF3R2VvbWV0cnkoZmxhc2hHZW9tKTtcclxuXHJcbiAgICAgIGlmIChlbGFwc2VkID4gdGhpcy5vcHRpb25zLmFuaW1hdGlvbi5kdXJhdGlvbikge1xyXG4gICAgICAgIHVuQnlLZXkobGlzdGVuZXJLZXkpO1xyXG4gICAgICAgIC8vIHJlbW92ZSBsYXN0IGdlb21ldHJ5XHJcbiAgICAgICAgLy8gdGhlcmUgaXMgYSBsaXR0bGUgZmxhc2ggYmVmb3JlIGZlYXR1cmUgZGlzYXBwZWFyLCBiZXR0ZXIgc29sdXRpb24gP1xyXG4gICAgICAgIHRoaXMubWFwLm9sLnJlbmRlcigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICAvLyB0ZWxsIE9wZW5MYXllcnMgdG8gY29udGludWUgcG9zdGNvbXBvc2UgYW5pbWF0aW9uXHJcbiAgICAgIHRoaXMubWFwLm9sLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=