/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var /**
 * Control to modify geometries
 */
SliceControl = /** @class */ (function () {
    function SliceControl(options) {
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
    Object.defineProperty(SliceControl.prototype, "active", {
        /**
         * Wheter the control is active
         */
        get: /**
         * Wheter the control is active
         * @return {?}
         */
        function () {
            return this.olMap !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliceControl.prototype, "olOverlaySource", {
        /**
         * OL overlay source
         * @internal
         */
        get: /**
         * OL overlay source
         * \@internal
         * @return {?}
         */
        function () {
            return this.olOverlayLayer.getSource();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add or remove this control to/from a map.
     * @param map OL Map
     */
    /**
     * Add or remove this control to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    SliceControl.prototype.setOlMap = /**
     * Add or remove this control to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    function (olMap) {
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
    };
    /**
     * Return the overlay source
     */
    /**
     * Return the overlay source
     * @return {?}
     */
    SliceControl.prototype.getSource = /**
     * Return the overlay source
     * @return {?}
     */
    function () {
        return this.olOverlaySource;
    };
    /**
     * Add an OL geometry to the overlay for slicing
     * @param olGeometry Ol Geometry
     */
    /**
     * Add an OL geometry to the overlay for slicing
     * @param {?} olGeometry Ol Geometry
     * @return {?}
     */
    SliceControl.prototype.setOlGeometry = /**
     * Add an OL geometry to the overlay for slicing
     * @param {?} olGeometry Ol Geometry
     * @return {?}
     */
    function (olGeometry) {
        /** @type {?} */
        var olFeature = new OlFeature({ geometry: olGeometry });
        this.olOverlaySource.clear();
        this.olOverlaySource.addFeature(olFeature);
    };
    /**
     * Create an overlay source if none is defined in the options
     */
    /**
     * Create an overlay source if none is defined in the options
     * @private
     * @return {?}
     */
    SliceControl.prototype.createOlInnerOverlayLayer = /**
     * Create an overlay source if none is defined in the options
     * @private
     * @return {?}
     */
    function () {
        return new OlVectorLayer({
            source: this.options.source ? this.options.source : new OlVectorSource(),
            style: this.options.layerStyle,
            zIndex: 500
        });
    };
    /**
     * Clear the overlay layer if it wasn't defined in the options
     */
    /**
     * Clear the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    SliceControl.prototype.removeOlInnerOverlayLayer = /**
     * Clear the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    function () {
        if (this.options.layer === undefined && this.olMap !== undefined) {
            this.olMap.removeLayer(this.olOverlayLayer);
        }
    };
    /**
     * Add the overlay layer if it wasn't defined in the options
     */
    /**
     * Add the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    SliceControl.prototype.addOlInnerOverlayLayer = /**
     * Add the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    function () {
        if (this.options.layer === undefined) {
            this.olMap.addLayer(this.olOverlayLayer);
        }
    };
    /**
     * Clear the overlay source if it wasn't defined in the options
     */
    /**
     * Clear the overlay source if it wasn't defined in the options
     * @private
     * @return {?}
     */
    SliceControl.prototype.clearOlInnerOverlaySource = /**
     * Clear the overlay source if it wasn't defined in the options
     * @private
     * @return {?}
     */
    function () {
        if (this.options.layer === undefined && this.options.source === undefined) {
            this.olOverlaySource.clear();
        }
    };
    /**
     * Create a draw line control and add it to the map
     */
    /**
     * Create a draw line control and add it to the map
     * @private
     * @return {?}
     */
    SliceControl.prototype.addDrawLineControl = /**
     * Create a draw line control and add it to the map
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
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
        function (olLine) { return _this.onDrawLineStart(olLine); }));
        this.drawLineEnd$$ = this.drawLineControl.end$
            .subscribe((/**
         * @param {?} olLine
         * @return {?}
         */
        function (olLine) { return _this.onDrawLineEnd(olLine); }));
        this.drawLineControl.setOlMap(this.olMap);
    };
    /**
     * Remove draw line control
     */
    /**
     * Remove draw line control
     * @private
     * @return {?}
     */
    SliceControl.prototype.removeDrawLineControl = /**
     * Remove draw line control
     * @private
     * @return {?}
     */
    function () {
        if (this.drawLineControl === undefined) {
            return;
        }
        this.drawLineStart$$.unsubscribe();
        this.drawLineEnd$$.unsubscribe();
        this.drawLineControl.getSource().clear();
        this.drawLineControl.setOlMap(undefined);
    };
    /**
     * Clear the draw source and track the geometry being draw
     * @param olLine Ol linestring or polygon
     */
    /**
     * Clear the draw source and track the geometry being draw
     * @private
     * @param {?} olLine Ol linestring or polygon
     * @return {?}
     */
    SliceControl.prototype.onDrawLineStart = /**
     * Clear the draw source and track the geometry being draw
     * @private
     * @param {?} olLine Ol linestring or polygon
     * @return {?}
     */
    function (olLine) {
        this.drawLineControl.getSource().clear();
    };
    /**
     * Slice the first geometry encountered with the drawn line
     * @param olLine Ol linestring
     */
    /**
     * Slice the first geometry encountered with the drawn line
     * @private
     * @param {?} olLine Ol linestring
     * @return {?}
     */
    SliceControl.prototype.onDrawLineEnd = /**
     * Slice the first geometry encountered with the drawn line
     * @private
     * @param {?} olLine Ol linestring
     * @return {?}
     */
    function (olLine) {
        var _this = this;
        /** @type {?} */
        var olSlicedGeometries = [];
        /** @type {?} */
        var lineExtent = olLine.getExtent();
        /** @type {?} */
        var olFeaturesToRemove = [];
        try {
            this.olOverlaySource.forEachFeatureInExtent(lineExtent, (/**
             * @param {?} olFeature
             * @return {?}
             */
            function (olFeature) {
                /** @type {?} */
                var olGeometry = olFeature.getGeometry();
                /** @type {?} */
                var olParts = sliceOlGeometry(olGeometry, olLine);
                if (olParts.length > 0) {
                    olSlicedGeometries.push.apply(olSlicedGeometries, tslib_1.__spread(olParts));
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
        function (olGeometry) { return new OlFeature(olGeometry); })));
        olFeaturesToRemove.forEach((/**
         * @param {?} olFeature
         * @return {?}
         */
        function (olFeature) {
            _this.olOverlaySource.removeFeature(olFeature);
        }));
        this.error$.next(undefined);
        this.end$.next(olSlicedGeometries);
    };
    return SliceControl;
}());
/**
 * Control to modify geometries
 */
export { SliceControl };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvc2hhcmVkL2NvbnRyb2xzL3NsaWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBRW5DLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBSTVDLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7O0FBRXJDLHlDQUtDOzs7SUFKQyxxQ0FBd0I7O0lBQ3hCLG9DQUFzQjs7SUFDdEIseUNBQTJEOztJQUMzRCx3Q0FBMEQ7Ozs7O0FBTTVEOzs7O0lBNkNFLHNCQUFvQixPQUE0QjtRQUE1QixZQUFPLEdBQVAsT0FBTyxDQUFxQjs7OztRQXhDekMsU0FBSSxHQUEwQixJQUFJLE9BQU8sRUFBRSxDQUFDOzs7O1FBSzVDLFdBQU0sR0FBZ0MsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQW9DekQsSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7U0FDckM7YUFBTTtZQUNMLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBbEJELHNCQUFJLGdDQUFNO1FBSFY7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBTUQsc0JBQUkseUNBQWU7UUFKbkI7OztXQUdHOzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQVVEOzs7T0FHRzs7Ozs7O0lBQ0gsK0JBQVE7Ozs7O0lBQVIsVUFBUyxLQUF3QjtRQUMvQixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILGdDQUFTOzs7O0lBQVQ7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsb0NBQWE7Ozs7O0lBQWIsVUFBYyxVQUFzQjs7WUFDNUIsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSyxnREFBeUI7Ozs7O0lBQWpDO1FBQ0UsT0FBTyxJQUFJLGFBQWEsQ0FBQztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLGNBQWMsRUFBRTtZQUN4RSxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVO1lBQzlCLE1BQU0sRUFBRSxHQUFHO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSyxnREFBeUI7Ozs7O0lBQWpDO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDaEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSyw2Q0FBc0I7Ozs7O0lBQTlCO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSyxnREFBeUI7Ozs7O0lBQWpDO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3pFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNLLHlDQUFrQjs7Ozs7SUFBMUI7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxXQUFXLENBQUM7WUFDckMsWUFBWSxFQUFFLFlBQVk7WUFDMUIsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUztZQUNqQyxTQUFTLEVBQUUsQ0FBQztTQUNiLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNO2FBQy9DLFNBQVM7Ozs7UUFBQyxVQUFDLE1BQW9CLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUE1QixDQUE0QixFQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUk7YUFDM0MsU0FBUzs7OztRQUFDLFVBQUMsTUFBb0IsSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQTFCLENBQTBCLEVBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSyw0Q0FBcUI7Ozs7O0lBQTdCO1FBQ0UsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLFNBQVMsRUFBRTtZQUN0QyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0ssc0NBQWU7Ozs7OztJQUF2QixVQUF3QixNQUFvQjtRQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSyxvQ0FBYTs7Ozs7O0lBQXJCLFVBQXNCLE1BQW9CO1FBQTFDLGlCQWtDQzs7WUFqQ08sa0JBQWtCLEdBQUcsRUFBRTs7WUFDdkIsVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUU7O1lBRS9CLGtCQUFrQixHQUFHLEVBQUU7UUFDN0IsSUFBSTtZQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsc0JBQXNCLENBQUMsVUFBVTs7OztZQUFFLFVBQUMsU0FBb0I7O29CQUNyRSxVQUFVLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRTs7b0JBQ3BDLE9BQU8sR0FBRyxlQUFlLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQztnQkFDbkQsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDdEIsa0JBQWtCLENBQUMsSUFBSSxPQUF2QixrQkFBa0IsbUJBQVMsT0FBTyxHQUFFO29CQUNwQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3BDO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLFlBQVksa0JBQWtCLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixPQUFPO2FBQ1I7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLENBQUM7YUFDVDtTQUNGO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FDOUIsa0JBQWtCLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsVUFBc0IsSUFBSyxPQUFBLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUF6QixDQUF5QixFQUFDLENBQzlFLENBQUM7UUFDRixrQkFBa0IsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxTQUFvQjtZQUM5QyxLQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQTNNRCxJQTJNQzs7Ozs7Ozs7OztJQXRNQyw0QkFBbUQ7Ozs7O0lBS25ELDhCQUEyRDs7Ozs7SUFFM0QsNkJBQXFCOzs7OztJQUNyQixzQ0FBc0M7Ozs7OztJQUt0Qyx1Q0FBcUM7Ozs7OztJQUtyQyx1Q0FBc0M7Ozs7OztJQUt0QyxxQ0FBb0M7Ozs7O0lBaUJ4QiwrQkFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT2xNYXAgZnJvbSAnb2wvTWFwJztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IE9sU3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgT2xWZWN0b3JTb3VyY2UgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCBPbFZlY3RvckxheWVyIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XHJcbmltcG9ydCBPbEdlb21ldHJ5IGZyb20gJ29sL2dlb20vR2VvbWV0cnknO1xyXG5pbXBvcnQgT2xMaW5lU3RyaW5nIGZyb20gJ29sL2dlb20vTGluZVN0cmluZyc7XHJcblxyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEdlb21ldHJ5U2xpY2VFcnJvciB9IGZyb20gJy4uL2dlb21ldHJ5LmVycm9ycyc7XHJcbmltcG9ydCB7IHNsaWNlT2xHZW9tZXRyeSB9IGZyb20gJy4uL2dlb21ldHJ5LnV0aWxzJztcclxuaW1wb3J0IHsgRHJhd0NvbnRyb2wgfSBmcm9tICcuL2RyYXcnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTbGljZUNvbnRyb2xPcHRpb25zIHtcclxuICBzb3VyY2U/OiBPbFZlY3RvclNvdXJjZTtcclxuICBsYXllcj86IE9sVmVjdG9yTGF5ZXI7XHJcbiAgbGF5ZXJTdHlsZT86IE9sU3R5bGUgfCAoKG9sZmVhdHVyZTogT2xGZWF0dXJlKSA9PiBPbFN0eWxlKTtcclxuICBkcmF3U3R5bGU/OiBPbFN0eWxlIHwgKChvbGZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gT2xTdHlsZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb250cm9sIHRvIG1vZGlmeSBnZW9tZXRyaWVzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2xpY2VDb250cm9sIHtcclxuXHJcbiAgLyoqXHJcbiAgICogU2xpY2UgZW5kIG9ic2VydmFibGVcclxuICAgKi9cclxuICBwdWJsaWMgZW5kJDogU3ViamVjdDxPbEdlb21ldHJ5W10+ID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2xpY2UgZXJyb3IsIGlmIGFueVxyXG4gICAqL1xyXG4gIHB1YmxpYyBlcnJvciQ6IFN1YmplY3Q8R2VvbWV0cnlTbGljZUVycm9yPiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIHByaXZhdGUgb2xNYXA6IE9sTWFwO1xyXG4gIHByaXZhdGUgb2xPdmVybGF5TGF5ZXI6IE9sVmVjdG9yTGF5ZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIERyYXcgbGluZSBjb250cm9sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkcmF3TGluZUNvbnRyb2w6IERyYXdDb250cm9sO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gZHJhdyBzdGFydFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZHJhd0xpbmVTdGFydCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byBkcmF3IGVuZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZHJhd0xpbmVFbmQkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0ZXIgdGhlIGNvbnRyb2wgaXMgYWN0aXZlXHJcbiAgICovXHJcbiAgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPTCBvdmVybGF5IHNvdXJjZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBvbE92ZXJsYXlTb3VyY2UoKTogT2xWZWN0b3JTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMub2xPdmVybGF5TGF5ZXIuZ2V0U291cmNlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6IFNsaWNlQ29udHJvbE9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zLmxheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlMYXllciA9IG9wdGlvbnMubGF5ZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9sT3ZlcmxheUxheWVyID0gdGhpcy5jcmVhdGVPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgb3IgcmVtb3ZlIHRoaXMgY29udHJvbCB0by9mcm9tIGEgbWFwLlxyXG4gICAqIEBwYXJhbSBtYXAgT0wgTWFwXHJcbiAgICovXHJcbiAgc2V0T2xNYXAob2xNYXA6IE9sTWFwIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAob2xNYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmNsZWFyT2xJbm5lck92ZXJsYXlTb3VyY2UoKTtcclxuICAgICAgdGhpcy5yZW1vdmVPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICAgIHRoaXMucmVtb3ZlRHJhd0xpbmVDb250cm9sKCk7XHJcbiAgICAgIHRoaXMub2xNYXAgPSBvbE1hcDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xNYXAgPSBvbE1hcDtcclxuICAgIHRoaXMuYWRkT2xJbm5lck92ZXJsYXlMYXllcigpO1xyXG4gICAgdGhpcy5hZGREcmF3TGluZUNvbnRyb2woKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0aGUgb3ZlcmxheSBzb3VyY2VcclxuICAgKi9cclxuICBnZXRTb3VyY2UoKTogT2xWZWN0b3JTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMub2xPdmVybGF5U291cmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGFuIE9MIGdlb21ldHJ5IHRvIHRoZSBvdmVybGF5IGZvciBzbGljaW5nXHJcbiAgICogQHBhcmFtIG9sR2VvbWV0cnkgT2wgR2VvbWV0cnlcclxuICAgKi9cclxuICBzZXRPbEdlb21ldHJ5KG9sR2VvbWV0cnk6IE9sR2VvbWV0cnkpIHtcclxuICAgIGNvbnN0IG9sRmVhdHVyZSA9IG5ldyBPbEZlYXR1cmUoe2dlb21ldHJ5OiBvbEdlb21ldHJ5fSk7XHJcbiAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5jbGVhcigpO1xyXG4gICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuYWRkRmVhdHVyZShvbEZlYXR1cmUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGFuIG92ZXJsYXkgc291cmNlIGlmIG5vbmUgaXMgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlT2xJbm5lck92ZXJsYXlMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIHJldHVybiBuZXcgT2xWZWN0b3JMYXllcih7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5vcHRpb25zLnNvdXJjZSA/IHRoaXMub3B0aW9ucy5zb3VyY2UgOiBuZXcgT2xWZWN0b3JTb3VyY2UoKSxcclxuICAgICAgc3R5bGU6IHRoaXMub3B0aW9ucy5sYXllclN0eWxlLFxyXG4gICAgICB6SW5kZXg6IDUwMFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgb3ZlcmxheSBsYXllciBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xJbm5lck92ZXJsYXlMYXllcigpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCAmJiB0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5yZW1vdmVMYXllcih0aGlzLm9sT3ZlcmxheUxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgb3ZlcmxheSBsYXllciBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT2xJbm5lck92ZXJsYXlMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sTWFwLmFkZExheWVyKHRoaXMub2xPdmVybGF5TGF5ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIG92ZXJsYXkgc291cmNlIGlmIGl0IHdhc24ndCBkZWZpbmVkIGluIHRoZSBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGVhck9sSW5uZXJPdmVybGF5U291cmNlKCkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXllciA9PT0gdW5kZWZpbmVkICYmIHRoaXMub3B0aW9ucy5zb3VyY2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5jbGVhcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgZHJhdyBsaW5lIGNvbnRyb2wgYW5kIGFkZCBpdCB0byB0aGUgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGREcmF3TGluZUNvbnRyb2woKSB7XHJcbiAgICB0aGlzLmRyYXdMaW5lQ29udHJvbCA9IG5ldyBEcmF3Q29udHJvbCh7XHJcbiAgICAgIGdlb21ldHJ5VHlwZTogJ0xpbmVTdHJpbmcnLFxyXG4gICAgICBkcmF3U3R5bGU6IHRoaXMub3B0aW9ucy5kcmF3U3R5bGUsXHJcbiAgICAgIG1heFBvaW50czogMlxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmRyYXdMaW5lU3RhcnQkJCA9IHRoaXMuZHJhd0xpbmVDb250cm9sLnN0YXJ0JFxyXG4gICAgICAuc3Vic2NyaWJlKChvbExpbmU6IE9sTGluZVN0cmluZykgPT4gdGhpcy5vbkRyYXdMaW5lU3RhcnQob2xMaW5lKSk7XHJcbiAgICB0aGlzLmRyYXdMaW5lRW5kJCQgPSB0aGlzLmRyYXdMaW5lQ29udHJvbC5lbmQkXHJcbiAgICAgIC5zdWJzY3JpYmUoKG9sTGluZTogT2xMaW5lU3RyaW5nKSA9PiB0aGlzLm9uRHJhd0xpbmVFbmQob2xMaW5lKSk7XHJcbiAgICB0aGlzLmRyYXdMaW5lQ29udHJvbC5zZXRPbE1hcCh0aGlzLm9sTWFwKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBkcmF3IGxpbmUgY29udHJvbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlRHJhd0xpbmVDb250cm9sKCkge1xyXG4gICAgaWYgKHRoaXMuZHJhd0xpbmVDb250cm9sID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZHJhd0xpbmVTdGFydCQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLmRyYXdMaW5lRW5kJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuZHJhd0xpbmVDb250cm9sLmdldFNvdXJjZSgpLmNsZWFyKCk7XHJcbiAgICB0aGlzLmRyYXdMaW5lQ29udHJvbC5zZXRPbE1hcCh1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIGRyYXcgc291cmNlIGFuZCB0cmFjayB0aGUgZ2VvbWV0cnkgYmVpbmcgZHJhd1xyXG4gICAqIEBwYXJhbSBvbExpbmUgT2wgbGluZXN0cmluZyBvciBwb2x5Z29uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkRyYXdMaW5lU3RhcnQob2xMaW5lOiBPbExpbmVTdHJpbmcpIHtcclxuICAgIHRoaXMuZHJhd0xpbmVDb250cm9sLmdldFNvdXJjZSgpLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTbGljZSB0aGUgZmlyc3QgZ2VvbWV0cnkgZW5jb3VudGVyZWQgd2l0aCB0aGUgZHJhd24gbGluZVxyXG4gICAqIEBwYXJhbSBvbExpbmUgT2wgbGluZXN0cmluZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EcmF3TGluZUVuZChvbExpbmU6IE9sTGluZVN0cmluZykge1xyXG4gICAgY29uc3Qgb2xTbGljZWRHZW9tZXRyaWVzID0gW107XHJcbiAgICBjb25zdCBsaW5lRXh0ZW50ID0gb2xMaW5lLmdldEV4dGVudCgpO1xyXG5cclxuICAgIGNvbnN0IG9sRmVhdHVyZXNUb1JlbW92ZSA9IFtdO1xyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuZm9yRWFjaEZlYXR1cmVJbkV4dGVudChsaW5lRXh0ZW50LCAob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgICBjb25zdCBvbEdlb21ldHJ5ID0gb2xGZWF0dXJlLmdldEdlb21ldHJ5KCk7XHJcbiAgICAgICAgY29uc3Qgb2xQYXJ0cyA9IHNsaWNlT2xHZW9tZXRyeShvbEdlb21ldHJ5LCBvbExpbmUpO1xyXG4gICAgICAgIGlmIChvbFBhcnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIG9sU2xpY2VkR2VvbWV0cmllcy5wdXNoKC4uLm9sUGFydHMpO1xyXG4gICAgICAgICAgb2xGZWF0dXJlc1RvUmVtb3ZlLnB1c2gob2xGZWF0dXJlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEdlb21ldHJ5U2xpY2VFcnJvcikge1xyXG4gICAgICAgIHRoaXMuZXJyb3IkLm5leHQoZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRyYXdMaW5lQ29udHJvbC5nZXRTb3VyY2UoKS5jbGVhcigpO1xyXG5cclxuICAgIHRoaXMub2xPdmVybGF5U291cmNlLmFkZEZlYXR1cmVzKFxyXG4gICAgICBvbFNsaWNlZEdlb21ldHJpZXMubWFwKChvbEdlb21ldHJ5OiBPbEdlb21ldHJ5KSA9PiBuZXcgT2xGZWF0dXJlKG9sR2VvbWV0cnkpKVxyXG4gICAgKTtcclxuICAgIG9sRmVhdHVyZXNUb1JlbW92ZS5mb3JFYWNoKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5yZW1vdmVGZWF0dXJlKG9sRmVhdHVyZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmVycm9yJC5uZXh0KHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLmVuZCQubmV4dChvbFNsaWNlZEdlb21ldHJpZXMpO1xyXG4gIH1cclxufVxyXG4iXX0=