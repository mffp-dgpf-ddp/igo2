/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import OlFeature from 'ol/Feature';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import { Subject } from 'rxjs';
import { GeometrySliceError } from '../geometry.errors';
import { sliceOlGeometry } from '../geometry.utils';
import { DrawControl } from './draw';
/**
 * @record
 */
export function SliceControlOptions() { }
if (false) {
    /** @type {?|undefined} */
    SliceControlOptions.prototype.source;
    /** @type {?|undefined} */
    SliceControlOptions.prototype.layer;
    /** @type {?|undefined} */
    SliceControlOptions.prototype.layerStyle;
    /** @type {?|undefined} */
    SliceControlOptions.prototype.drawStyle;
}
/**
 * Control to modify geometries
 */
export class SliceControl {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = options;
        /**
         * Slice end observable
         */
        this.end$ = new Subject();
        /**
         * Slice error, if any
         */
        this.error$ = new Subject();
        if (options.layer !== undefined) {
            this.olOverlayLayer = options.layer;
        }
        else {
            this.olOverlayLayer = this.createOlInnerOverlayLayer();
        }
    }
    /**
     * Wheter the control is active
     * @return {?}
     */
    get active() {
        return this.olMap !== undefined;
    }
    /**
     * OL overlay source
     * \@internal
     * @return {?}
     */
    get olOverlaySource() {
        return this.olOverlayLayer.getSource();
    }
    /**
     * Add or remove this control to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    setOlMap(olMap) {
        if (olMap === undefined) {
            this.clearOlInnerOverlaySource();
            this.removeOlInnerOverlayLayer();
            this.removeDrawLineControl();
            this.olMap = olMap;
            return;
        }
        this.olMap = olMap;
        this.addOlInnerOverlayLayer();
        this.addDrawLineControl();
    }
    /**
     * Return the overlay source
     * @return {?}
     */
    getSource() {
        return this.olOverlaySource;
    }
    /**
     * Add an OL geometry to the overlay for slicing
     * @param {?} olGeometry Ol Geometry
     * @return {?}
     */
    setOlGeometry(olGeometry) {
        /** @type {?} */
        const olFeature = new OlFeature({ geometry: olGeometry });
        this.olOverlaySource.clear();
        this.olOverlaySource.addFeature(olFeature);
    }
    /**
     * Create an overlay source if none is defined in the options
     * @private
     * @return {?}
     */
    createOlInnerOverlayLayer() {
        return new OlVectorLayer({
            source: this.options.source ? this.options.source : new OlVectorSource(),
            style: this.options.layerStyle,
            zIndex: 500
        });
    }
    /**
     * Clear the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    removeOlInnerOverlayLayer() {
        if (this.options.layer === undefined && this.olMap !== undefined) {
            this.olMap.removeLayer(this.olOverlayLayer);
        }
    }
    /**
     * Add the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    addOlInnerOverlayLayer() {
        if (this.options.layer === undefined) {
            this.olMap.addLayer(this.olOverlayLayer);
        }
    }
    /**
     * Clear the overlay source if it wasn't defined in the options
     * @private
     * @return {?}
     */
    clearOlInnerOverlaySource() {
        if (this.options.layer === undefined && this.options.source === undefined) {
            this.olOverlaySource.clear();
        }
    }
    /**
     * Create a draw line control and add it to the map
     * @private
     * @return {?}
     */
    addDrawLineControl() {
        this.drawLineControl = new DrawControl({
            geometryType: 'LineString',
            drawStyle: this.options.drawStyle,
            maxPoints: 2
        });
        this.drawLineStart$$ = this.drawLineControl.start$
            .subscribe((/**
         * @param {?} olLine
         * @return {?}
         */
        (olLine) => this.onDrawLineStart(olLine)));
        this.drawLineEnd$$ = this.drawLineControl.end$
            .subscribe((/**
         * @param {?} olLine
         * @return {?}
         */
        (olLine) => this.onDrawLineEnd(olLine)));
        this.drawLineControl.setOlMap(this.olMap);
    }
    /**
     * Remove draw line control
     * @private
     * @return {?}
     */
    removeDrawLineControl() {
        if (this.drawLineControl === undefined) {
            return;
        }
        this.drawLineStart$$.unsubscribe();
        this.drawLineEnd$$.unsubscribe();
        this.drawLineControl.getSource().clear();
        this.drawLineControl.setOlMap(undefined);
    }
    /**
     * Clear the draw source and track the geometry being draw
     * @private
     * @param {?} olLine Ol linestring or polygon
     * @return {?}
     */
    onDrawLineStart(olLine) {
        this.drawLineControl.getSource().clear();
    }
    /**
     * Slice the first geometry encountered with the drawn line
     * @private
     * @param {?} olLine Ol linestring
     * @return {?}
     */
    onDrawLineEnd(olLine) {
        /** @type {?} */
        const olSlicedGeometries = [];
        /** @type {?} */
        const lineExtent = olLine.getExtent();
        /** @type {?} */
        const olFeaturesToRemove = [];
        try {
            this.olOverlaySource.forEachFeatureInExtent(lineExtent, (/**
             * @param {?} olFeature
             * @return {?}
             */
            (olFeature) => {
                /** @type {?} */
                const olGeometry = olFeature.getGeometry();
                /** @type {?} */
                const olParts = sliceOlGeometry(olGeometry, olLine);
                if (olParts.length > 0) {
                    olSlicedGeometries.push(...olParts);
                    olFeaturesToRemove.push(olFeature);
                }
            }));
        }
        catch (e) {
            if (e instanceof GeometrySliceError) {
                this.error$.next(e);
                return;
            }
            else {
                throw e;
            }
        }
        this.drawLineControl.getSource().clear();
        this.olOverlaySource.addFeatures(olSlicedGeometries.map((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => new OlFeature(olGeometry))));
        olFeaturesToRemove.forEach((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => {
            this.olOverlaySource.removeFeature(olFeature);
        }));
        this.error$.next(undefined);
        this.end$.next(olSlicedGeometries);
    }
}
if (false) {
    /**
     * Slice end observable
     * @type {?}
     */
    SliceControl.prototype.end$;
    /**
     * Slice error, if any
     * @type {?}
     */
    SliceControl.prototype.error$;
    /**
     * @type {?}
     * @private
     */
    SliceControl.prototype.olMap;
    /**
     * @type {?}
     * @private
     */
    SliceControl.prototype.olOverlayLayer;
    /**
     * Draw line control
     * @type {?}
     * @private
     */
    SliceControl.prototype.drawLineControl;
    /**
     * Subscription to draw start
     * @type {?}
     * @private
     */
    SliceControl.prototype.drawLineStart$$;
    /**
     * Subscription to draw end
     * @type {?}
     * @private
     */
    SliceControl.prototype.drawLineEnd$$;
    /**
     * @type {?}
     * @private
     */
    SliceControl.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvc2hhcmVkL2NvbnRyb2xzL3NsaWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFFbkMsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFJNUMsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxRQUFRLENBQUM7Ozs7QUFFckMseUNBS0M7OztJQUpDLHFDQUF3Qjs7SUFDeEIsb0NBQXNCOztJQUN0Qix5Q0FBMkQ7O0lBQzNELHdDQUEwRDs7Ozs7QUFNNUQsTUFBTSxPQUFPLFlBQVk7Ozs7SUE2Q3ZCLFlBQW9CLE9BQTRCO1FBQTVCLFlBQU8sR0FBUCxPQUFPLENBQXFCOzs7O1FBeEN6QyxTQUFJLEdBQTBCLElBQUksT0FBTyxFQUFFLENBQUM7Ozs7UUFLNUMsV0FBTSxHQUFnQyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBb0N6RCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUNyQzthQUFNO1lBQ0wsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztTQUN4RDtJQUNILENBQUM7Ozs7O0lBbEJELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7SUFDbEMsQ0FBQzs7Ozs7O0lBTUQsSUFBSSxlQUFlO1FBQ2pCLE9B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LEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixPQUFPO2FBQ1I7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLENBQUM7YUFDVDtTQUNGO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FDOUIsa0JBQWtCLENBQUMsR0FBRzs7OztRQUFDLENBQUMsVUFBc0IsRUFBRSxFQUFFLENBQUMsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUMsQ0FDOUUsQ0FBQztRQUNGLGtCQUFrQixDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLFNBQW9CLEVBQUUsRUFBRTtZQUNsRCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNGOzs7Ozs7SUF0TUMsNEJBQW1EOzs7OztJQUtuRCw4QkFBMkQ7Ozs7O0lBRTNELDZCQUFxQjs7Ozs7SUFDckIsc0NBQXNDOzs7Ozs7SUFLdEMsdUNBQXFDOzs7Ozs7SUFLckMsdUNBQXNDOzs7Ozs7SUFLdEMscUNBQW9DOzs7OztJQWlCeEIsK0JBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9sTWFwIGZyb20gJ29sL01hcCc7XHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbFN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IE9sVmVjdG9yU291cmNlIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xyXG5pbXBvcnQgT2xWZWN0b3JMYXllciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xyXG5pbXBvcnQgT2xHZW9tZXRyeSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5JztcclxuaW1wb3J0IE9sTGluZVN0cmluZyBmcm9tICdvbC9nZW9tL0xpbmVTdHJpbmcnO1xyXG5cclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBHZW9tZXRyeVNsaWNlRXJyb3IgfSBmcm9tICcuLi9nZW9tZXRyeS5lcnJvcnMnO1xyXG5pbXBvcnQgeyBzbGljZU9sR2VvbWV0cnkgfSBmcm9tICcuLi9nZW9tZXRyeS51dGlscyc7XHJcbmltcG9ydCB7IERyYXdDb250cm9sIH0gZnJvbSAnLi9kcmF3JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2xpY2VDb250cm9sT3B0aW9ucyB7XHJcbiAgc291cmNlPzogT2xWZWN0b3JTb3VyY2U7XHJcbiAgbGF5ZXI/OiBPbFZlY3RvckxheWVyO1xyXG4gIGxheWVyU3R5bGU/OiBPbFN0eWxlIHwgKChvbGZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gT2xTdHlsZSk7XHJcbiAgZHJhd1N0eWxlPzogT2xTdHlsZSB8ICgob2xmZWF0dXJlOiBPbEZlYXR1cmUpID0+IE9sU3R5bGUpO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udHJvbCB0byBtb2RpZnkgZ2VvbWV0cmllc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNsaWNlQ29udHJvbCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNsaWNlIGVuZCBvYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHVibGljIGVuZCQ6IFN1YmplY3Q8T2xHZW9tZXRyeVtdPiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNsaWNlIGVycm9yLCBpZiBhbnlcclxuICAgKi9cclxuICBwdWJsaWMgZXJyb3IkOiBTdWJqZWN0PEdlb21ldHJ5U2xpY2VFcnJvcj4gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICBwcml2YXRlIG9sTWFwOiBPbE1hcDtcclxuICBwcml2YXRlIG9sT3ZlcmxheUxheWVyOiBPbFZlY3RvckxheWVyO1xyXG5cclxuICAvKipcclxuICAgKiBEcmF3IGxpbmUgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZHJhd0xpbmVDb250cm9sOiBEcmF3Q29udHJvbDtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIGRyYXcgc3RhcnRcclxuICAgKi9cclxuICBwcml2YXRlIGRyYXdMaW5lU3RhcnQkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gZHJhdyBlbmRcclxuICAgKi9cclxuICBwcml2YXRlIGRyYXdMaW5lRW5kJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGVyIHRoZSBjb250cm9sIGlzIGFjdGl2ZVxyXG4gICAqL1xyXG4gIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT0wgb3ZlcmxheSBzb3VyY2VcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgb2xPdmVybGF5U291cmNlKCk6IE9sVmVjdG9yU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLm9sT3ZlcmxheUxheWVyLmdldFNvdXJjZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvcHRpb25zOiBTbGljZUNvbnRyb2xPcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucy5sYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5TGF5ZXIgPSBvcHRpb25zLmxheWVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlMYXllciA9IHRoaXMuY3JlYXRlT2xJbm5lck92ZXJsYXlMYXllcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIG9yIHJlbW92ZSB0aGlzIGNvbnRyb2wgdG8vZnJvbSBhIG1hcC5cclxuICAgKiBAcGFyYW0gbWFwIE9MIE1hcFxyXG4gICAqL1xyXG4gIHNldE9sTWFwKG9sTWFwOiBPbE1hcCB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKG9sTWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5jbGVhck9sSW5uZXJPdmVybGF5U291cmNlKCk7XHJcbiAgICAgIHRoaXMucmVtb3ZlT2xJbm5lck92ZXJsYXlMYXllcigpO1xyXG4gICAgICB0aGlzLnJlbW92ZURyYXdMaW5lQ29udHJvbCgpO1xyXG4gICAgICB0aGlzLm9sTWFwID0gb2xNYXA7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sTWFwID0gb2xNYXA7XHJcbiAgICB0aGlzLmFkZE9sSW5uZXJPdmVybGF5TGF5ZXIoKTtcclxuICAgIHRoaXMuYWRkRHJhd0xpbmVDb250cm9sKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGhlIG92ZXJsYXkgc291cmNlXHJcbiAgICovXHJcbiAgZ2V0U291cmNlKCk6IE9sVmVjdG9yU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLm9sT3ZlcmxheVNvdXJjZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhbiBPTCBnZW9tZXRyeSB0byB0aGUgb3ZlcmxheSBmb3Igc2xpY2luZ1xyXG4gICAqIEBwYXJhbSBvbEdlb21ldHJ5IE9sIEdlb21ldHJ5XHJcbiAgICovXHJcbiAgc2V0T2xHZW9tZXRyeShvbEdlb21ldHJ5OiBPbEdlb21ldHJ5KSB7XHJcbiAgICBjb25zdCBvbEZlYXR1cmUgPSBuZXcgT2xGZWF0dXJlKHtnZW9tZXRyeTogb2xHZW9tZXRyeX0pO1xyXG4gICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuY2xlYXIoKTtcclxuICAgIHRoaXMub2xPdmVybGF5U291cmNlLmFkZEZlYXR1cmUob2xGZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvdmVybGF5IHNvdXJjZSBpZiBub25lIGlzIGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKTogT2xWZWN0b3JMYXllciB7XHJcbiAgICByZXR1cm4gbmV3IE9sVmVjdG9yTGF5ZXIoe1xyXG4gICAgICBzb3VyY2U6IHRoaXMub3B0aW9ucy5zb3VyY2UgPyB0aGlzLm9wdGlvbnMuc291cmNlIDogbmV3IE9sVmVjdG9yU291cmNlKCksXHJcbiAgICAgIHN0eWxlOiB0aGlzLm9wdGlvbnMubGF5ZXJTdHlsZSxcclxuICAgICAgekluZGV4OiA1MDBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIG92ZXJsYXkgbGF5ZXIgaWYgaXQgd2Fzbid0IGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyID09PSB1bmRlZmluZWQgJiYgdGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xNYXAucmVtb3ZlTGF5ZXIodGhpcy5vbE92ZXJsYXlMYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdGhlIG92ZXJsYXkgbGF5ZXIgaWYgaXQgd2Fzbid0IGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZE9sSW5uZXJPdmVybGF5TGF5ZXIoKTogT2xWZWN0b3JMYXllciB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5hZGRMYXllcih0aGlzLm9sT3ZlcmxheUxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBvdmVybGF5IHNvdXJjZSBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXJPbElubmVyT3ZlcmxheVNvdXJjZSgpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCAmJiB0aGlzLm9wdGlvbnMuc291cmNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuY2xlYXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIGRyYXcgbGluZSBjb250cm9sIGFuZCBhZGQgaXQgdG8gdGhlIG1hcFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkRHJhd0xpbmVDb250cm9sKCkge1xyXG4gICAgdGhpcy5kcmF3TGluZUNvbnRyb2wgPSBuZXcgRHJhd0NvbnRyb2woe1xyXG4gICAgICBnZW9tZXRyeVR5cGU6ICdMaW5lU3RyaW5nJyxcclxuICAgICAgZHJhd1N0eWxlOiB0aGlzLm9wdGlvbnMuZHJhd1N0eWxlLFxyXG4gICAgICBtYXhQb2ludHM6IDJcclxuICAgIH0pO1xyXG4gICAgdGhpcy5kcmF3TGluZVN0YXJ0JCQgPSB0aGlzLmRyYXdMaW5lQ29udHJvbC5zdGFydCRcclxuICAgICAgLnN1YnNjcmliZSgob2xMaW5lOiBPbExpbmVTdHJpbmcpID0+IHRoaXMub25EcmF3TGluZVN0YXJ0KG9sTGluZSkpO1xyXG4gICAgdGhpcy5kcmF3TGluZUVuZCQkID0gdGhpcy5kcmF3TGluZUNvbnRyb2wuZW5kJFxyXG4gICAgICAuc3Vic2NyaWJlKChvbExpbmU6IE9sTGluZVN0cmluZykgPT4gdGhpcy5vbkRyYXdMaW5lRW5kKG9sTGluZSkpO1xyXG4gICAgdGhpcy5kcmF3TGluZUNvbnRyb2wuc2V0T2xNYXAodGhpcy5vbE1hcCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgZHJhdyBsaW5lIGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZURyYXdMaW5lQ29udHJvbCgpIHtcclxuICAgIGlmICh0aGlzLmRyYXdMaW5lQ29udHJvbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRyYXdMaW5lU3RhcnQkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5kcmF3TGluZUVuZCQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLmRyYXdMaW5lQ29udHJvbC5nZXRTb3VyY2UoKS5jbGVhcigpO1xyXG4gICAgdGhpcy5kcmF3TGluZUNvbnRyb2wuc2V0T2xNYXAodW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBkcmF3IHNvdXJjZSBhbmQgdHJhY2sgdGhlIGdlb21ldHJ5IGJlaW5nIGRyYXdcclxuICAgKiBAcGFyYW0gb2xMaW5lIE9sIGxpbmVzdHJpbmcgb3IgcG9seWdvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EcmF3TGluZVN0YXJ0KG9sTGluZTogT2xMaW5lU3RyaW5nKSB7XHJcbiAgICB0aGlzLmRyYXdMaW5lQ29udHJvbC5nZXRTb3VyY2UoKS5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2xpY2UgdGhlIGZpcnN0IGdlb21ldHJ5IGVuY291bnRlcmVkIHdpdGggdGhlIGRyYXduIGxpbmVcclxuICAgKiBAcGFyYW0gb2xMaW5lIE9sIGxpbmVzdHJpbmdcclxuICAgKi9cclxuICBwcml2YXRlIG9uRHJhd0xpbmVFbmQob2xMaW5lOiBPbExpbmVTdHJpbmcpIHtcclxuICAgIGNvbnN0IG9sU2xpY2VkR2VvbWV0cmllcyA9IFtdO1xyXG4gICAgY29uc3QgbGluZUV4dGVudCA9IG9sTGluZS5nZXRFeHRlbnQoKTtcclxuXHJcbiAgICBjb25zdCBvbEZlYXR1cmVzVG9SZW1vdmUgPSBbXTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5U291cmNlLmZvckVhY2hGZWF0dXJlSW5FeHRlbnQobGluZUV4dGVudCwgKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb2xHZW9tZXRyeSA9IG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgICAgIGNvbnN0IG9sUGFydHMgPSBzbGljZU9sR2VvbWV0cnkob2xHZW9tZXRyeSwgb2xMaW5lKTtcclxuICAgICAgICBpZiAob2xQYXJ0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBvbFNsaWNlZEdlb21ldHJpZXMucHVzaCguLi5vbFBhcnRzKTtcclxuICAgICAgICAgIG9sRmVhdHVyZXNUb1JlbW92ZS5wdXNoKG9sRmVhdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBHZW9tZXRyeVNsaWNlRXJyb3IpIHtcclxuICAgICAgICB0aGlzLmVycm9yJC5uZXh0KGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kcmF3TGluZUNvbnRyb2wuZ2V0U291cmNlKCkuY2xlYXIoKTtcclxuXHJcbiAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5hZGRGZWF0dXJlcyhcclxuICAgICAgb2xTbGljZWRHZW9tZXRyaWVzLm1hcCgob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkgPT4gbmV3IE9sRmVhdHVyZShvbEdlb21ldHJ5KSlcclxuICAgICk7XHJcbiAgICBvbEZlYXR1cmVzVG9SZW1vdmUuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UucmVtb3ZlRmVhdHVyZShvbEZlYXR1cmUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5lcnJvciQubmV4dCh1bmRlZmluZWQpO1xyXG4gICAgdGhpcy5lbmQkLm5leHQob2xTbGljZWRHZW9tZXRyaWVzKTtcclxuICB9XHJcbn1cclxuIl19