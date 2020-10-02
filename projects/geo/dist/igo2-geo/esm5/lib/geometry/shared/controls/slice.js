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
        this.olOverlaySource.clear(true);
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
            this.olOverlaySource.clear(true);
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
        this.drawLineControl.getSource().clear(true);
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
        this.drawLineControl.getSource().clear(true);
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
        this.drawLineControl.getSource().clear(true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvc2hhcmVkL2NvbnRyb2xzL3NsaWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBRW5DLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBSTVDLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7O0FBRXJDLHlDQUtDOzs7SUFKQyxxQ0FBd0I7O0lBQ3hCLG9DQUFzQjs7SUFDdEIseUNBQTJEOztJQUMzRCx3Q0FBMEQ7Ozs7O0FBTTVEOzs7O0lBNkNFLHNCQUFvQixPQUE0QjtRQUE1QixZQUFPLEdBQVAsT0FBTyxDQUFxQjs7OztRQXhDekMsU0FBSSxHQUEwQixJQUFJLE9BQU8sRUFBRSxDQUFDOzs7O1FBSzVDLFdBQU0sR0FBZ0MsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQW9DekQsSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7U0FDckM7YUFBTTtZQUNMLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBbEJELHNCQUFJLGdDQUFNO1FBSFY7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBTUQsc0JBQUkseUNBQWU7UUFKbkI7OztXQUdHOzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQVVEOzs7T0FHRzs7Ozs7O0lBQ0gsK0JBQVE7Ozs7O0lBQVIsVUFBUyxLQUF3QjtRQUMvQixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILGdDQUFTOzs7O0lBQVQ7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsb0NBQWE7Ozs7O0lBQWIsVUFBYyxVQUFzQjs7WUFDNUIsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssZ0RBQXlCOzs7OztJQUFqQztRQUNFLE9BQU8sSUFBSSxhQUFhLENBQUM7WUFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxjQUFjLEVBQUU7WUFDeEUsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVTtZQUM5QixNQUFNLEVBQUUsR0FBRztTQUNaLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssZ0RBQXlCOzs7OztJQUFqQztRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ2hFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssNkNBQXNCOzs7OztJQUE5QjtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssZ0RBQXlCOzs7OztJQUFqQztRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN6RSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0sseUNBQWtCOzs7OztJQUExQjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLFdBQVcsQ0FBQztZQUNyQyxZQUFZLEVBQUUsWUFBWTtZQUMxQixTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTO1lBQ2pDLFNBQVMsRUFBRSxDQUFDO1NBQ2IsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU07YUFDL0MsU0FBUzs7OztRQUFDLFVBQUMsTUFBb0IsSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQTVCLENBQTRCLEVBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSTthQUMzQyxTQUFTOzs7O1FBQUMsVUFBQyxNQUFvQixJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBMUIsQ0FBMEIsRUFBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNLLDRDQUFxQjs7Ozs7SUFBN0I7UUFDRSxJQUFJLElBQUksQ0FBQyxlQUFlLEtBQUssU0FBUyxFQUFFO1lBQ3RDLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0ssc0NBQWU7Ozs7OztJQUF2QixVQUF3QixNQUFvQjtRQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0ssb0NBQWE7Ozs7OztJQUFyQixVQUFzQixNQUFvQjtRQUExQyxpQkFrQ0M7O1lBakNPLGtCQUFrQixHQUFHLEVBQUU7O1lBQ3ZCLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFOztZQUUvQixrQkFBa0IsR0FBRyxFQUFFO1FBQzdCLElBQUk7WUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLFVBQVU7Ozs7WUFBRSxVQUFDLFNBQW9COztvQkFDckUsVUFBVSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUU7O29CQUNwQyxPQUFPLEdBQUcsZUFBZSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUM7Z0JBQ25ELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3RCLGtCQUFrQixDQUFDLElBQUksT0FBdkIsa0JBQWtCLG1CQUFTLE9BQU8sR0FBRTtvQkFDcEMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUNwQztZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxZQUFZLGtCQUFrQixFQUFFO2dCQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsT0FBTzthQUNSO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxDQUFDO2FBQ1Q7U0FDRjtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUM5QixrQkFBa0IsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxVQUFzQixJQUFLLE9BQUEsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQXpCLENBQXlCLEVBQUMsQ0FDOUUsQ0FBQztRQUNGLGtCQUFrQixDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLFNBQW9CO1lBQzlDLEtBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBM01ELElBMk1DOzs7Ozs7Ozs7O0lBdE1DLDRCQUFtRDs7Ozs7SUFLbkQsOEJBQTJEOzs7OztJQUUzRCw2QkFBcUI7Ozs7O0lBQ3JCLHNDQUFzQzs7Ozs7O0lBS3RDLHVDQUFxQzs7Ozs7O0lBS3JDLHVDQUFzQzs7Ozs7O0lBS3RDLHFDQUFvQzs7Ozs7SUFpQnhCLCtCQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPbE1hcCBmcm9tICdvbC9NYXAnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgT2xTdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCBPbFZlY3RvclNvdXJjZSBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0IE9sVmVjdG9yTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcclxuaW1wb3J0IE9sR2VvbWV0cnkgZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeSc7XHJcbmltcG9ydCBPbExpbmVTdHJpbmcgZnJvbSAnb2wvZ2VvbS9MaW5lU3RyaW5nJztcclxuXHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgR2VvbWV0cnlTbGljZUVycm9yIH0gZnJvbSAnLi4vZ2VvbWV0cnkuZXJyb3JzJztcclxuaW1wb3J0IHsgc2xpY2VPbEdlb21ldHJ5IH0gZnJvbSAnLi4vZ2VvbWV0cnkudXRpbHMnO1xyXG5pbXBvcnQgeyBEcmF3Q29udHJvbCB9IGZyb20gJy4vZHJhdyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNsaWNlQ29udHJvbE9wdGlvbnMge1xyXG4gIHNvdXJjZT86IE9sVmVjdG9yU291cmNlO1xyXG4gIGxheWVyPzogT2xWZWN0b3JMYXllcjtcclxuICBsYXllclN0eWxlPzogT2xTdHlsZSB8ICgob2xmZWF0dXJlOiBPbEZlYXR1cmUpID0+IE9sU3R5bGUpO1xyXG4gIGRyYXdTdHlsZT86IE9sU3R5bGUgfCAoKG9sZmVhdHVyZTogT2xGZWF0dXJlKSA9PiBPbFN0eWxlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnRyb2wgdG8gbW9kaWZ5IGdlb21ldHJpZXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTbGljZUNvbnRyb2wge1xyXG5cclxuICAvKipcclxuICAgKiBTbGljZSBlbmQgb2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBlbmQkOiBTdWJqZWN0PE9sR2VvbWV0cnlbXT4gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAvKipcclxuICAgKiBTbGljZSBlcnJvciwgaWYgYW55XHJcbiAgICovXHJcbiAgcHVibGljIGVycm9yJDogU3ViamVjdDxHZW9tZXRyeVNsaWNlRXJyb3I+ID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgcHJpdmF0ZSBvbE1hcDogT2xNYXA7XHJcbiAgcHJpdmF0ZSBvbE92ZXJsYXlMYXllcjogT2xWZWN0b3JMYXllcjtcclxuXHJcbiAgLyoqXHJcbiAgICogRHJhdyBsaW5lIGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIGRyYXdMaW5lQ29udHJvbDogRHJhd0NvbnRyb2w7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byBkcmF3IHN0YXJ0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkcmF3TGluZVN0YXJ0JCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIGRyYXcgZW5kXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkcmF3TGluZUVuZCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRlciB0aGUgY29udHJvbCBpcyBhY3RpdmVcclxuICAgKi9cclxuICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub2xNYXAgIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9MIG92ZXJsYXkgc291cmNlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG9sT3ZlcmxheVNvdXJjZSgpOiBPbFZlY3RvclNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE92ZXJsYXlMYXllci5nZXRTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3B0aW9uczogU2xpY2VDb250cm9sT3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMubGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sT3ZlcmxheUxheWVyID0gb3B0aW9ucy5sYXllcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub2xPdmVybGF5TGF5ZXIgPSB0aGlzLmNyZWF0ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBvciByZW1vdmUgdGhpcyBjb250cm9sIHRvL2Zyb20gYSBtYXAuXHJcbiAgICogQHBhcmFtIG1hcCBPTCBNYXBcclxuICAgKi9cclxuICBzZXRPbE1hcChvbE1hcDogT2xNYXAgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmIChvbE1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuY2xlYXJPbElubmVyT3ZlcmxheVNvdXJjZSgpO1xyXG4gICAgICB0aGlzLnJlbW92ZU9sSW5uZXJPdmVybGF5TGF5ZXIoKTtcclxuICAgICAgdGhpcy5yZW1vdmVEcmF3TGluZUNvbnRyb2woKTtcclxuICAgICAgdGhpcy5vbE1hcCA9IG9sTWFwO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbE1hcCA9IG9sTWFwO1xyXG4gICAgdGhpcy5hZGRPbElubmVyT3ZlcmxheUxheWVyKCk7XHJcbiAgICB0aGlzLmFkZERyYXdMaW5lQ29udHJvbCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSBvdmVybGF5IHNvdXJjZVxyXG4gICAqL1xyXG4gIGdldFNvdXJjZSgpOiBPbFZlY3RvclNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE92ZXJsYXlTb3VyY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYW4gT0wgZ2VvbWV0cnkgdG8gdGhlIG92ZXJsYXkgZm9yIHNsaWNpbmdcclxuICAgKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBHZW9tZXRyeVxyXG4gICAqL1xyXG4gIHNldE9sR2VvbWV0cnkob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkge1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlID0gbmV3IE9sRmVhdHVyZSh7Z2VvbWV0cnk6IG9sR2VvbWV0cnl9KTtcclxuICAgIHRoaXMub2xPdmVybGF5U291cmNlLmNsZWFyKHRydWUpO1xyXG4gICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuYWRkRmVhdHVyZShvbEZlYXR1cmUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGFuIG92ZXJsYXkgc291cmNlIGlmIG5vbmUgaXMgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlT2xJbm5lck92ZXJsYXlMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIHJldHVybiBuZXcgT2xWZWN0b3JMYXllcih7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5vcHRpb25zLnNvdXJjZSA/IHRoaXMub3B0aW9ucy5zb3VyY2UgOiBuZXcgT2xWZWN0b3JTb3VyY2UoKSxcclxuICAgICAgc3R5bGU6IHRoaXMub3B0aW9ucy5sYXllclN0eWxlLFxyXG4gICAgICB6SW5kZXg6IDUwMFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgb3ZlcmxheSBsYXllciBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT2xJbm5lck92ZXJsYXlMYXllcigpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCAmJiB0aGlzLm9sTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbE1hcC5yZW1vdmVMYXllcih0aGlzLm9sT3ZlcmxheUxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgb3ZlcmxheSBsYXllciBpZiBpdCB3YXNuJ3QgZGVmaW5lZCBpbiB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT2xJbm5lck92ZXJsYXlMYXllcigpOiBPbFZlY3RvckxheWVyIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sTWFwLmFkZExheWVyKHRoaXMub2xPdmVybGF5TGF5ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIG92ZXJsYXkgc291cmNlIGlmIGl0IHdhc24ndCBkZWZpbmVkIGluIHRoZSBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGVhck9sSW5uZXJPdmVybGF5U291cmNlKCkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXllciA9PT0gdW5kZWZpbmVkICYmIHRoaXMub3B0aW9ucy5zb3VyY2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5jbGVhcih0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIGRyYXcgbGluZSBjb250cm9sIGFuZCBhZGQgaXQgdG8gdGhlIG1hcFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkRHJhd0xpbmVDb250cm9sKCkge1xyXG4gICAgdGhpcy5kcmF3TGluZUNvbnRyb2wgPSBuZXcgRHJhd0NvbnRyb2woe1xyXG4gICAgICBnZW9tZXRyeVR5cGU6ICdMaW5lU3RyaW5nJyxcclxuICAgICAgZHJhd1N0eWxlOiB0aGlzLm9wdGlvbnMuZHJhd1N0eWxlLFxyXG4gICAgICBtYXhQb2ludHM6IDJcclxuICAgIH0pO1xyXG4gICAgdGhpcy5kcmF3TGluZVN0YXJ0JCQgPSB0aGlzLmRyYXdMaW5lQ29udHJvbC5zdGFydCRcclxuICAgICAgLnN1YnNjcmliZSgob2xMaW5lOiBPbExpbmVTdHJpbmcpID0+IHRoaXMub25EcmF3TGluZVN0YXJ0KG9sTGluZSkpO1xyXG4gICAgdGhpcy5kcmF3TGluZUVuZCQkID0gdGhpcy5kcmF3TGluZUNvbnRyb2wuZW5kJFxyXG4gICAgICAuc3Vic2NyaWJlKChvbExpbmU6IE9sTGluZVN0cmluZykgPT4gdGhpcy5vbkRyYXdMaW5lRW5kKG9sTGluZSkpO1xyXG4gICAgdGhpcy5kcmF3TGluZUNvbnRyb2wuc2V0T2xNYXAodGhpcy5vbE1hcCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgZHJhdyBsaW5lIGNvbnRyb2xcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZURyYXdMaW5lQ29udHJvbCgpIHtcclxuICAgIGlmICh0aGlzLmRyYXdMaW5lQ29udHJvbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRyYXdMaW5lU3RhcnQkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5kcmF3TGluZUVuZCQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLmRyYXdMaW5lQ29udHJvbC5nZXRTb3VyY2UoKS5jbGVhcih0cnVlKTtcclxuICAgIHRoaXMuZHJhd0xpbmVDb250cm9sLnNldE9sTWFwKHVuZGVmaW5lZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZHJhdyBzb3VyY2UgYW5kIHRyYWNrIHRoZSBnZW9tZXRyeSBiZWluZyBkcmF3XHJcbiAgICogQHBhcmFtIG9sTGluZSBPbCBsaW5lc3RyaW5nIG9yIHBvbHlnb25cclxuICAgKi9cclxuICBwcml2YXRlIG9uRHJhd0xpbmVTdGFydChvbExpbmU6IE9sTGluZVN0cmluZykge1xyXG4gICAgdGhpcy5kcmF3TGluZUNvbnRyb2wuZ2V0U291cmNlKCkuY2xlYXIodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTbGljZSB0aGUgZmlyc3QgZ2VvbWV0cnkgZW5jb3VudGVyZWQgd2l0aCB0aGUgZHJhd24gbGluZVxyXG4gICAqIEBwYXJhbSBvbExpbmUgT2wgbGluZXN0cmluZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EcmF3TGluZUVuZChvbExpbmU6IE9sTGluZVN0cmluZykge1xyXG4gICAgY29uc3Qgb2xTbGljZWRHZW9tZXRyaWVzID0gW107XHJcbiAgICBjb25zdCBsaW5lRXh0ZW50ID0gb2xMaW5lLmdldEV4dGVudCgpO1xyXG5cclxuICAgIGNvbnN0IG9sRmVhdHVyZXNUb1JlbW92ZSA9IFtdO1xyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UuZm9yRWFjaEZlYXR1cmVJbkV4dGVudChsaW5lRXh0ZW50LCAob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgICBjb25zdCBvbEdlb21ldHJ5ID0gb2xGZWF0dXJlLmdldEdlb21ldHJ5KCk7XHJcbiAgICAgICAgY29uc3Qgb2xQYXJ0cyA9IHNsaWNlT2xHZW9tZXRyeShvbEdlb21ldHJ5LCBvbExpbmUpO1xyXG4gICAgICAgIGlmIChvbFBhcnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIG9sU2xpY2VkR2VvbWV0cmllcy5wdXNoKC4uLm9sUGFydHMpO1xyXG4gICAgICAgICAgb2xGZWF0dXJlc1RvUmVtb3ZlLnB1c2gob2xGZWF0dXJlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEdlb21ldHJ5U2xpY2VFcnJvcikge1xyXG4gICAgICAgIHRoaXMuZXJyb3IkLm5leHQoZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRyYXdMaW5lQ29udHJvbC5nZXRTb3VyY2UoKS5jbGVhcih0cnVlKTtcclxuXHJcbiAgICB0aGlzLm9sT3ZlcmxheVNvdXJjZS5hZGRGZWF0dXJlcyhcclxuICAgICAgb2xTbGljZWRHZW9tZXRyaWVzLm1hcCgob2xHZW9tZXRyeTogT2xHZW9tZXRyeSkgPT4gbmV3IE9sRmVhdHVyZShvbEdlb21ldHJ5KSlcclxuICAgICk7XHJcbiAgICBvbEZlYXR1cmVzVG9SZW1vdmUuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgdGhpcy5vbE92ZXJsYXlTb3VyY2UucmVtb3ZlRmVhdHVyZShvbEZlYXR1cmUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5lcnJvciQubmV4dCh1bmRlZmluZWQpO1xyXG4gICAgdGhpcy5lbmQkLm5leHQob2xTbGljZWRHZW9tZXRyaWVzKTtcclxuICB9XHJcbn1cclxuIl19