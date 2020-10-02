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
        this.olOverlaySource.clear(true);
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
            this.olOverlaySource.clear(true);
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
        this.drawLineControl.getSource().clear(true);
        this.drawLineControl.setOlMap(undefined);
    }
    /**
     * Clear the draw source and track the geometry being draw
     * @private
     * @param {?} olLine Ol linestring or polygon
     * @return {?}
     */
    onDrawLineStart(olLine) {
        this.drawLineControl.getSource().clear(true);
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
        this.drawLineControl.getSource().clear(true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvc2hhcmVkL2NvbnRyb2xzL3NsaWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFFbkMsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFJNUMsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxRQUFRLENBQUM7Ozs7QUFFckMseUNBS0M7OztJQUpDLHFDQUF3Qjs7SUFDeEIsb0NBQXNCOztJQUN0Qix5Q0FBMkQ7O0lBQzNELHdDQUEwRDs7Ozs7QUFNNUQsTUFBTSxPQUFPLFlBQVk7Ozs7SUE2Q3ZCLFlBQW9CLE9BQTRCO1FBQTVCLFlBQU8sR0FBUCxPQUFPLENBQXFCOzs7O1FBeEN6QyxTQUFJLEdBQTBCLElBQUksT0FBTyxFQUFFLENBQUM7Ozs7UUFLNUMsV0FBTSxHQUFnQyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBb0N6RCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUNyQzthQUFNO1lBQ0wsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztTQUN4RDtJQUNILENBQUM7Ozs7O0lBbEJELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7SUFDbEMsQ0FBQzs7Ozs7O0lBTUQsSUFBSSxlQUFlO1FBQ2pCLE9B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QUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxZQUFZLGtCQUFrQixFQUFFO2dCQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsT0FBTzthQUNSO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxDQUFDO2FBQ1Q7U0FDRjtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUM5QixrQkFBa0IsQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxVQUFzQixFQUFFLEVBQUUsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBQyxDQUM5RSxDQUFDO1FBQ0Ysa0JBQWtCLENBQUMsT0FBTzs7OztRQUFDLENBQUMsU0FBb0IsRUFBRSxFQUFFO1lBQ2xELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0Y7Ozs7OztJQXRNQyw0QkFBbUQ7Ozs7O0lBS25ELDhCQUEyRDs7Ozs7SUFFM0QsNkJBQXFCOzs7OztJQUNyQixzQ0FBc0M7Ozs7OztJQUt0Qyx1Q0FBcUM7Ozs7OztJQUtyQyx1Q0FBc0M7Ozs7OztJQUt0QyxxQ0FBb0M7Ozs7O0lBaUJ4QiwrQkFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT2xNYXAgZnJvbSAnb2wvTWFwJztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IE9sU3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgT2xWZWN0b3JTb3VyY2UgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCBPbFZlY3RvckxheWVyIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XHJcbmltcG9ydCBPbEdlb21ldHJ5IGZyb20gJ29sL2dlb20vR2VvbWV0cnknO1xyXG5pbXBvcnQgT2xMaW5lU3RyaW5nIGZyb20gJ29sL2dlb20vTGluZVN0cmluZyc7XHJcblxyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEdlb21ldHJ5U2xpY2VFcnJvciB9IGZyb20gJy4uL2dlb21ldHJ5LmVycm9ycyc7XHJcbmltcG9ydCB7IHNsaWNlT2xHZW9tZXRyeSB9IGZyb20gJy4uL2dlb21ldHJ5LnV0aWxzJztcclxuaW1wb3J0IHsgRHJhd0NvbnRyb2wgfSBmcm9tICcuL2RyYXcnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTbGljZUNvbnRyb2xPcHRpb25zIHtcclxuICBzb3VyY2U/OiBPbFZlY3RvclNvdXJjZTtcclxuICBsYXllcj86IE9sVmVjdG9yTGF5ZXI7XHJcbiAgbGF5ZXJTdHlsZT86IE9sU3R5bGUgfCAoKG9sZmVhdHVyZTogT2xGZWF0dXJlKSA9PiBPbFN0eWxlKTtcclxuICBkcmF3U3R5bGU/OiBPbFN0eWxlIHwgKChvbGZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gT2xTdHlsZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb250cm9sIHRvIG1vZGlmeSBnZW9tZXRyaWVzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2xpY2VDb250cm9sIHtcclxuXHJcbiAgLyoqXHJcbiAgICogU2xpY2UgZW5kIG9ic2VydmFibGVcclxuICAgKi9cclxuICBwdWJsaWMgZW5kJDogU3ViamVjdDxPbEdlb21ldHJ5W10+ID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2xpY2UgZXJyb3IsIGlmIGFueVxyXG4gICAqL1xyXG4gIHB1YmxpYyBlcnJvciQ6IFN1YmplY3Q8R2VvbWV0cnlTbGljZUVycm9yPiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIHByaXZhdGUgb2xNYXA6IE9sTWFwO1xyXG4gIHByaXZhdGUgb2xPdmVybGF5TGF5ZXI6IE9sVmVjdG9yTGF5ZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIERyYXcgbGluZSBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkcmF3TGluZUNvbnRyb2w6IERyYXdDb250cm9sO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gZHJhdyBzdGFydFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZHJhd0xpbmVTdGFydCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byBkcmF3IGVuZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZHJhd0xpbmVFbmQkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0ZXIgdGhlIGNvbnRyb2wgaXMgYWN0aXZlXHJcbiAgICovXHJcbiAgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPTCBvdmVybGF5IHNvdXJjZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBvbE92ZXJsYXlTb3VyY2UoKTogT2xWZWN0b3JTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMub2xPdmVybGF5TGF5ZXIuZ2V0U291cmNlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6IFNsaWNlQ29udHJvbE9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zLmxheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlMYXllciA9IG9wdGlvbnMubGF5ZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9sT3ZlcmxheUxheWVyID0gdGhpcy5jcmVhdGVPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgb3IgcmVtb3ZlIHRoaXMgY29udHJvbCB0by9mcm9tIGEgbWFwLlxyXG4gICAqIEBwYXJhbSBtYXAgT0wgTWFwXHJcbiAgICovXHJcbiAgc2V0T2xNYXAob2xNYXA6IE9sTWFwIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAob2xNYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmNsZWFyT2xJbm5lck92ZXJsYXlTb3VyY2UoKTtcclxuICAgICAgdGhpcy5yZW1vdmVPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICAgIHRoaXMucmVtb3ZlRHJhd0xpbmVDb250cm9sKCk7XHJcbiAgICAgIHRoaXMub2xNYXAgPSBvbE1hcDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xNYXAgPSBvbE1hcDtcclxuICAgIHRoaXMuYWRkT2xJbm5lck92ZXJsYXlMYXllcigpO1xyXG4gICAgdGhpcy5hZGREcmF3TGluZUNvbnRyb2woKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0aGUgb3ZlcmxheSBzb3VyY2VcclxuICAgKi9cclxuICBnZXRTb3VyY2UoKTogT2xWZWN0b3JTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMub2xPdmVybGF5U291cmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGFuIE9MIGdlb21ldHJ5IHRvIHRoZSBvdmVybGF5IGZvciBzbGljaW5nXHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT2wgR2VvbWV0cnlcclxuICAgKi9cclxuICBzZXRPbEdlb21ldHJ5KG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkpIHtcclxuICAgIGNvbnN0IG9sRmVhdHVyZSA9IG5ldyBPbEZlYXR1cmUoe2dlb21ldHJ5OiBvbEdlb21ldHJ5fSk7XHJcbiAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5jbGVhcih0cnVlKTtcclxuICAgIHRoaXMub2xPdmVybGF5U291cmNlLmFkZEZlYXR1cmUob2xGZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvdmVybGF5IHNvdXJjZSBpZiBub25lIGlzIGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKTogT2xWZWN0b3JMYXllciB7XHJcbiAgICByZXR1cm4gbmV3IE9sVmVjdG9yTGF5ZXIoe1xyXG4gICAgICBzb3VyY2U6IHRoaXMub3B0aW9ucy5zb3VyY2UgPyB0aGlzLm9wdGlvbnMuc291cmNlIDogbmV3IE9sVmVjdG9yU291cmNlKCksXHJcbiAgICAgIHN0eWxlOiB0aGlzLm9wdGlvbnMubGF5ZXJTdHlsZSxcclxuICAgICAgekluZGV4OiA1MDBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIG92ZXJsYXkgbGF5ZXIgaWYgaXQgd2Fzbid0IGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyID09PSB1bmRlZmluZWQgJiYgdGhpcy5vbE1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2xNYXAucmVtb3ZlTGF5ZXIodGhpcy5vbE92ZXJsYXlMYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdGhlIG92ZXJsYXkgbGF5ZXIgaWYgaXQgd2Fzbid0IGRlZmluZWQgaW4gdGhlIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZE9sSW5uZXJPdmVybGF5TGF5ZXIoKTogT2xWZWN0b3JMYXllciB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5hZGRMYXllcih0aGlzLm9sT3ZlcmxheUxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBvdmVybGF5IHNvdXJjZSBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXJPbElubmVyT3ZlcmxheVNvdXJjZSgpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCAmJiB0aGlzLm9wdGlvbnMuc291cmNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuY2xlYXIodHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBkcmF3IGxpbmUgY29udHJvbCBhbmQgYWRkIGl0IHRvIHRoZSBtYXBcclxuICAgKi9cclxuICBwcml2YXRlIGFkZERyYXdMaW5lQ29udHJvbCgpIHtcclxuICAgIHRoaXMuZHJhd0xpbmVDb250cm9sID0gbmV3IERyYXdDb250cm9sKHtcclxuICAgICAgZ2VvbWV0cnlUeXBlOiAnTGluZVN0cmluZycsXHJcbiAgICAgIGRyYXdTdHlsZTogdGhpcy5vcHRpb25zLmRyYXdTdHlsZSxcclxuICAgICAgbWF4UG9pbnRzOiAyXHJcbiAgICB9KTtcclxuICAgIHRoaXMuZHJhd0xpbmVTdGFydCQkID0gdGhpcy5kcmF3TGluZUNvbnRyb2wuc3RhcnQkXHJcbiAgICAgIC5zdWJzY3JpYmUoKG9sTGluZTogT2xMaW5lU3RyaW5nKSA9PiB0aGlzLm9uRHJhd0xpbmVTdGFydChvbExpbmUpKTtcclxuICAgIHRoaXMuZHJhd0xpbmVFbmQkJCA9IHRoaXMuZHJhd0xpbmVDb250cm9sLmVuZCRcclxuICAgICAgLnN1YnNjcmliZSgob2xMaW5lOiBPbExpbmVTdHJpbmcpID0+IHRoaXMub25EcmF3TGluZUVuZChvbExpbmUpKTtcclxuICAgIHRoaXMuZHJhd0xpbmVDb250cm9sLnNldE9sTWFwKHRoaXMub2xNYXApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGRyYXcgbGluZSBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVEcmF3TGluZUNvbnRyb2woKSB7XHJcbiAgICBpZiAodGhpcy5kcmF3TGluZUNvbnRyb2wgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kcmF3TGluZVN0YXJ0JCQudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuZHJhd0xpbmVFbmQkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5kcmF3TGluZUNvbnRyb2wuZ2V0U291cmNlKCkuY2xlYXIodHJ1ZSk7XHJcbiAgICB0aGlzLmRyYXdMaW5lQ29udHJvbC5zZXRPbE1hcCh1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIGRyYXcgc291cmNlIGFuZCB0cmFjayB0aGUgZ2VvbWV0cnkgYmVpbmcgZHJhd1xyXG4gICAqIEBwYXJhbSBvbExpbmUgT2wgbGluZXN0cmluZyBvciBwb2x5Z29uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYXdMaW5lU3RhcnQob2xMaW5lOiBPbExpbmVTdHJpbmcpIHtcclxuICAgIHRoaXMuZHJhd0xpbmVDb250cm9sLmdldFNvdXJjZSgpLmNsZWFyKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2xpY2UgdGhlIGZpcnN0IGdlb21ldHJ5IGVuY291bnRlcmVkIHdpdGggdGhlIGRyYXduIGxpbmVcclxuICAgKiBAcGFyYW0gb2xMaW5lIE9sIGxpbmVzdHJpbmdcclxuICAgKi9cclxuICBwcml2YXRlIG9uRHJhd0xpbmVFbmQob2xMaW5lOiBPbExpbmVTdHJpbmcpIHtcclxuICAgIGNvbnN0IG9sU2xpY2VkR2VvbWV0cmllcyA9IFtdO1xyXG4gICAgY29uc3QgbGluZUV4dGVudCA9IG9sTGluZS5nZXRFeHRlbnQoKTtcclxuXHJcbiAgICBjb25zdCBvbEZlYXR1cmVzVG9SZW1vdmUgPSBbXTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5U291cmNlLmZvckVhY2hGZWF0dXJlSW5FeHRlbnQobGluZUV4dGVudCwgKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb2xHZW9tZXRyeSA9IG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgICAgIGNvbnN0IG9sUGFydHMgPSBzbGljZU9sR2VvbWV0cnkob2xHZW9tZXRyeSwgb2xMaW5lKTtcclxuICAgICAgICBpZiAob2xQYXJ0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBvbFNsaWNlZEdlb21ldHJpZXMucHVzaCguLi5vbFBhcnRzKTtcclxuICAgICAgICAgIG9sRmVhdHVyZXNUb1JlbW92ZS5wdXNoKG9sRmVhdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBHZW9tZXRyeVNsaWNlRXJyb3IpIHtcclxuICAgICAgICB0aGlzLmVycm9yJC5uZXh0KGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kcmF3TGluZUNvbnRyb2wuZ2V0U291cmNlKCkuY2xlYXIodHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuYWRkRmVhdHVyZXMoXHJcbiAgICAgIG9sU2xpY2VkR2VvbWV0cmllcy5tYXAoKG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkpID0+IG5ldyBPbEZlYXR1cmUob2xHZW9tZXRyeSkpXHJcbiAgICApO1xyXG4gICAgb2xGZWF0dXJlc1RvUmVtb3ZlLmZvckVhY2goKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5U291cmNlLnJlbW92ZUZlYXR1cmUob2xGZWF0dXJlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZXJyb3IkLm5leHQodW5kZWZpbmVkKTtcclxuICAgIHRoaXMuZW5kJC5uZXh0KG9sU2xpY2VkR2VvbWV0cmllcyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==