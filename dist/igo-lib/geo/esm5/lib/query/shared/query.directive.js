/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter, Self } from '@angular/core';
import { of, zip } from 'rxjs';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { featureFromOl } from '../../feature/shared/feature.utils';
import { QueryService } from './query.service';
import { layerIsQueryable, olLayerIsQueryable } from './query.utils';
/**
 * This directive makes a map queryable with a click of with a drag box.
 * By default, all layers are queryable but this cna ben controlled at
 * the layer level.
 */
var QueryDirective = /** @class */ (function () {
    function QueryDirective(component, queryService) {
        this.component = component;
        this.queryService = queryService;
        /**
         * Subscriptions to ongoing queries
         */
        this.queries$$ = [];
        /**
         * Whter to query features or not
         */
        this.queryFeatures = true;
        /**
         * Feature query hit tolerance
         */
        this.queryFeaturesHitTolerance = 0;
        /**
         * Whether all query should complete before emitting an event
         */
        this.waitForAllQueries = false;
        /**
         * Event emitted when a query (or all queries) complete
         */
        this.query = new EventEmitter();
    }
    Object.defineProperty(QueryDirective.prototype, "map", {
        /**
         * IGO map
         * @internal
         */
        get: /**
         * IGO map
         * \@internal
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (((/** @type {?} */ (this.component.map)))));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Start listening to click and drag box events
     * @internal
     */
    /**
     * Start listening to click and drag box events
     * \@internal
     * @return {?}
     */
    QueryDirective.prototype.ngAfterViewInit = /**
     * Start listening to click and drag box events
     * \@internal
     * @return {?}
     */
    function () {
        this.listenToMapClick();
    };
    /**
     * Stop listening to click and drag box events and cancel ongoind requests
     * @internal
     */
    /**
     * Stop listening to click and drag box events and cancel ongoind requests
     * \@internal
     * @return {?}
     */
    QueryDirective.prototype.ngOnDestroy = /**
     * Stop listening to click and drag box events and cancel ongoind requests
     * \@internal
     * @return {?}
     */
    function () {
        this.cancelOngoingQueries();
        this.unlistenToMapClick();
    };
    /**
     * On map click, issue queries
     */
    /**
     * On map click, issue queries
     * @private
     * @return {?}
     */
    QueryDirective.prototype.listenToMapClick = /**
     * On map click, issue queries
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.mapClickListener = this.map.ol.on('singleclick', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onMapEvent(event); }));
    };
    /**
     * Stop listenig for map clicks
     */
    /**
     * Stop listenig for map clicks
     * @private
     * @return {?}
     */
    QueryDirective.prototype.unlistenToMapClick = /**
     * Stop listenig for map clicks
     * @private
     * @return {?}
     */
    function () {
        this.map.ol.un(this.mapClickListener.type, this.mapClickListener.listener);
        this.mapClickListener = undefined;
    };
    /**
     * Issue queries from a map event and emit events with the results
     * @param event OL map browser pointer event
     */
    /**
     * Issue queries from a map event and emit events with the results
     * @private
     * @param {?} event OL map browser pointer event
     * @return {?}
     */
    QueryDirective.prototype.onMapEvent = /**
     * Issue queries from a map event and emit events with the results
     * @private
     * @param {?} event OL map browser pointer event
     * @return {?}
     */
    function (event) {
        var _this = this;
        this.cancelOngoingQueries();
        if (!this.queryService.queryEnabled) {
            return;
        }
        /** @type {?} */
        var queries$ = [];
        if (this.queryFeatures) {
            queries$.push(this.doQueryFeatures(event));
        }
        console.log(queries$);
        /** @type {?} */
        var resolution = this.map.ol.getView().getResolution();
        /** @type {?} */
        var queryLayers = this.map.layers.filter(layerIsQueryable);
        queries$.push.apply(queries$, tslib_1.__spread(this.queryService.query(queryLayers, {
            coordinates: event.coordinate,
            projection: this.map.projection,
            resolution: resolution
        })));
        if (queries$.length === 0) {
            return;
        }
        if (this.waitForAllQueries) {
            this.queries$$.push(zip.apply(void 0, tslib_1.__spread(queries$)).subscribe((/**
             * @param {?} results
             * @return {?}
             */
            function (results) {
                /** @type {?} */
                var features = [].concat.apply([], tslib_1.__spread(results));
                console.log(results);
                console.log(features);
                _this.query.emit({ features: features, event: event });
            })));
        }
        else {
            this.queries$$ = queries$.map((/**
             * @param {?} query$
             * @return {?}
             */
            function (query$) {
                return query$.subscribe((/**
                 * @param {?} features
                 * @return {?}
                 */
                function (features) {
                    console.log(features);
                    _this.query.emit({ features: features, event: event });
                }));
            }));
        }
        console.log(this.queries$$);
        console.log(this.query);
    };
    /**
     * Query features already present on the map
     * @param event OL map browser pointer event
     */
    /**
     * Query features already present on the map
     * @private
     * @param {?} event OL map browser pointer event
     * @return {?}
     */
    QueryDirective.prototype.doQueryFeatures = /**
     * Query features already present on the map
     * @private
     * @param {?} event OL map browser pointer event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var feature;
        /** @type {?} */
        var featuresTileCoverage;
        /** @type {?} */
        var clickedFeatures = [];
        this.map.ol.forEachFeatureAtPixel(event.pixel, (/**
         * @param {?} featureOL
         * @param {?} layerOL
         * @return {?}
         */
        function (featureOL, layerOL) {
            var e_1, _a;
            if (featureOL) {
                if (featureOL.get('features')) {
                    featureOL = featureOL.get('features')[0];
                    console.log(featureOL);
                    if (featureOL.length > 1) {
                        return;
                    }
                }
                feature = featureFromOl(featureOL, _this.map.projection, layerOL);
                clickedFeatures.push(feature);
                console.log(layerOL);
                if (feature.meta.typeSource === 'mvt') {
                    /** @type {?} */
                    var sameDataTileFeatures = _this.sameDataTilesFeature(feature, layerOL);
                    try {
                        for (var sameDataTileFeatures_1 = tslib_1.__values(sameDataTileFeatures), sameDataTileFeatures_1_1 = sameDataTileFeatures_1.next(); !sameDataTileFeatures_1_1.done; sameDataTileFeatures_1_1 = sameDataTileFeatures_1.next()) {
                            var sameDataTileFeature = sameDataTileFeatures_1_1.value;
                            featuresTileCoverage = featureFromOl(sameDataTileFeature, _this.map.projection);
                            clickedFeatures.push(featuresTileCoverage);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (sameDataTileFeatures_1_1 && !sameDataTileFeatures_1_1.done && (_a = sameDataTileFeatures_1.return)) _a.call(sameDataTileFeatures_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
            else {
                feature = featureFromOl(featureOL, _this.map.projection, layerOL);
                clickedFeatures.push(feature);
            }
            console.log(layerOL);
            console.log(feature);
        }), {
            hitTolerance: this.queryFeaturesHitTolerance || 0,
            layerFilter: this.queryFeaturesCondition ? this.queryFeaturesCondition : olLayerIsQueryable
        });
        /** @type {?} */
        var clickedFeature = clickedFeatures.shift();
        clickedFeatures.shift();
        clickedFeatures.push(clickedFeature);
        console.log(clickedFeatures);
        return of(clickedFeatures);
    };
    /**
     * Cancel ongoing requests, if any
     */
    /**
     * Cancel ongoing requests, if any
     * @private
     * @return {?}
     */
    QueryDirective.prototype.cancelOngoingQueries = /**
     * Cancel ongoing requests, if any
     * @private
     * @return {?}
     */
    function () {
        this.queries$$.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
        this.queries$$ = [];
    };
    /**
     * @private
     * @param {?} tileCacheEntries
     * @param {?} olFeature
     * @param {?} data
     * @return {?}
     */
    QueryDirective.prototype.getTiles = /**
     * @private
     * @param {?} tileCacheEntries
     * @param {?} olFeature
     * @param {?} data
     * @return {?}
     */
    function (tileCacheEntries, olFeature, data) {
        /** @type {?} */
        var tile;
        /** @type {?} */
        var list = [];
        Object.keys(tileCacheEntries).forEach((/**
         * @param {?} tileCoord
         * @return {?}
         */
        function (tileCoord) {
            tile = tileCacheEntries[tileCoord];
            if (tile.features_ !== null) {
                tile.features_.forEach((/**
                 * @param {?} feature
                 * @return {?}
                 */
                function (feature) {
                    if (feature.get(data) === olFeature.properties[data]) {
                        list.push(feature);
                    }
                }));
            }
        }));
        return list;
    };
    /**
     * @private
     * @param {?} feature
     * @param {?} layer
     * @return {?}
     */
    QueryDirective.prototype.sameDataTilesFeature = /**
     * @private
     * @param {?} feature
     * @param {?} layer
     * @return {?}
     */
    function (feature, layer) {
        /** @type {?} */
        var sameDataTilesFeature;
        /** @type {?} */
        var tileCacheEntries;
        /** @type {?} */
        var data = layer.values_.sourceOptions.key;
        tileCacheEntries = layer.values_.source.tileCache.entries_;
        /** @type {?} */
        var tile = Object.keys(tileCacheEntries)[0];
        tileCacheEntries = tileCacheEntries[tile].value_.sourceTiles_;
        sameDataTilesFeature = this.getTiles(tileCacheEntries, feature, data);
        console.log(sameDataTilesFeature);
        return sameDataTilesFeature;
    };
    QueryDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoQuery]'
                },] }
    ];
    /** @nocollapse */
    QueryDirective.ctorParameters = function () { return [
        { type: MapBrowserComponent, decorators: [{ type: Self }] },
        { type: QueryService }
    ]; };
    QueryDirective.propDecorators = {
        queryFeatures: [{ type: Input }],
        queryFeaturesHitTolerance: [{ type: Input }],
        queryFeaturesCondition: [{ type: Input }],
        waitForAllQueries: [{ type: Input }],
        query: [{ type: Output }]
    };
    return QueryDirective;
}());
export { QueryDirective };
if (false) {
    /**
     * Subscriptions to ongoing queries
     * @type {?}
     * @private
     */
    QueryDirective.prototype.queries$$;
    /**
     * Listener to the map click event
     * @type {?}
     * @private
     */
    QueryDirective.prototype.mapClickListener;
    /**
     * OL drag box interaction
     * @type {?}
     * @private
     */
    QueryDirective.prototype.olDragBoxInteraction;
    /**
     * Ol drag box "end" event key
     * @type {?}
     * @private
     */
    QueryDirective.prototype.olDragBoxInteractionEndKey;
    /**
     * Whter to query features or not
     * @type {?}
     */
    QueryDirective.prototype.queryFeatures;
    /**
     * Feature query hit tolerance
     * @type {?}
     */
    QueryDirective.prototype.queryFeaturesHitTolerance;
    /**
     * Feature query hit tolerance
     * @type {?}
     */
    QueryDirective.prototype.queryFeaturesCondition;
    /**
     * Whether all query should complete before emitting an event
     * @type {?}
     */
    QueryDirective.prototype.waitForAllQueries;
    /**
     * Event emitted when a query (or all queries) complete
     * @type {?}
     */
    QueryDirective.prototype.query;
    /**
     * @type {?}
     * @private
     */
    QueryDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    QueryDirective.prototype.queryService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3F1ZXJ5L3NoYXJlZC9xdWVyeS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdaLElBQUksRUFDTCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQTRCLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFVekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFbEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQU9yRTtJQTRERSx3QkFDa0IsU0FBOEIsRUFDdEMsWUFBMEI7UUFEbEIsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQWM7Ozs7UUF2RDVCLGNBQVMsR0FBbUIsRUFBRSxDQUFDOzs7O1FBb0I5QixrQkFBYSxHQUFZLElBQUksQ0FBQzs7OztRQUs5Qiw4QkFBeUIsR0FBVyxDQUFDLENBQUM7Ozs7UUFVdEMsc0JBQWlCLEdBQVksS0FBSyxDQUFDOzs7O1FBS2xDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFHOUIsQ0FBQztJQWFGLENBQUM7SUFQSixzQkFBSSwrQkFBRztRQUpQOzs7V0FHRzs7Ozs7O1FBQ0g7WUFDRSxPQUFPLG1CQUFBLENBQUMsbUJBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQU8sQ0FBQyxFQUFVLENBQUM7UUFDL0MsQ0FBQzs7O09BQUE7SUFPRDs7O09BR0c7Ozs7OztJQUNILHdDQUFlOzs7OztJ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QUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDOUQsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sb0JBQW9CLENBQUM7SUFDOUIsQ0FBQzs7Z0JBN09GLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7Ozs7Z0JBYlEsbUJBQW1CLHVCQXdFdkIsSUFBSTtnQkFyRUEsWUFBWTs7O2dDQW1DbEIsS0FBSzs0Q0FLTCxLQUFLO3lDQUtMLEtBQUs7b0NBS0wsS0FBSzt3QkFLTCxNQUFNOztJQStMVCxxQkFBQztDQUFBLEFBOU9ELElBOE9DO1NBM09ZLGNBQWM7Ozs7Ozs7SUFJekIsbUNBQXVDOzs7Ozs7SUFLdkMsMENBQTJDOzs7Ozs7SUFLM0MsOENBQW1EOzs7Ozs7SUFLbkQsb0RBQTJDOzs7OztJQUszQyx1Q0FBdUM7Ozs7O0lBS3ZDLG1EQUErQzs7Ozs7SUFLL0MsZ0RBQTREOzs7OztJQUs1RCwyQ0FBNEM7Ozs7O0lBSzVDLCtCQUdLOzs7OztJQVdILG1DQUE4Qzs7Ozs7SUFDOUMsc0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkRlc3Ryb3ksXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBTZWxmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG9mLCB6aXAgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbExheWVyIGZyb20gJ29sL2xheWVyL0xheWVyJztcclxuXHJcbmltcG9ydCBPbERyYWdCb3hJbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmFnQm94JztcclxuaW1wb3J0IHsgTWFwQnJvd3NlclBvaW50ZXJFdmVudCBhcyBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQgfSBmcm9tICdvbC9NYXBCcm93c2VyRXZlbnQnO1xyXG5pbXBvcnQgeyBMaXN0ZW5lckZ1bmN0aW9uIH0gZnJvbSAnb2wvZXZlbnRzJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgTWFwQnJvd3NlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL21hcC9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgZmVhdHVyZUZyb21PbCB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUudXRpbHMnO1xyXG5pbXBvcnQgeyBRdWVyeVNlcnZpY2UgfSBmcm9tICcuL3F1ZXJ5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBsYXllcklzUXVlcnlhYmxlLCBvbExheWVySXNRdWVyeWFibGUgfSBmcm9tICcuL3F1ZXJ5LnV0aWxzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGRpcmVjdGl2ZSBtYWtlcyBhIG1hcCBxdWVyeWFibGUgd2l0aCBhIGNsaWNrIG9mIHdpdGggYSBkcmFnIGJveC5cclxuICogQnkgZGVmYXVsdCwgYWxsIGxheWVycyBhcmUgcXVlcnlhYmxlIGJ1dCB0aGlzIGNuYSBiZW4gY29udHJvbGxlZCBhdFxyXG4gKiB0aGUgbGF5ZXIgbGV2ZWwuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29RdWVyeV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBRdWVyeURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9ucyB0byBvbmdvaW5nIHF1ZXJpZXNcclxuICAgKi9cclxuICBwcml2YXRlIHF1ZXJpZXMkJDogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVuZXIgdG8gdGhlIG1hcCBjbGljayBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbWFwQ2xpY2tMaXN0ZW5lcjogTGlzdGVuZXJGdW5jdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogT0wgZHJhZyBib3ggaW50ZXJhY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIG9sRHJhZ0JveEludGVyYWN0aW9uOiBPbERyYWdCb3hJbnRlcmFjdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2wgZHJhZyBib3ggXCJlbmRcIiBldmVudCBrZXlcclxuICAgKi9cclxuICBwcml2YXRlIG9sRHJhZ0JveEludGVyYWN0aW9uRW5kS2V5OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdodGVyIHRvIHF1ZXJ5IGZlYXR1cmVzIG9yIG5vdFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHF1ZXJ5RmVhdHVyZXM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBGZWF0dXJlIHF1ZXJ5IGhpdCB0b2xlcmFuY2VcclxuICAgKi9cclxuICBASW5wdXQoKSBxdWVyeUZlYXR1cmVzSGl0VG9sZXJhbmNlOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBGZWF0dXJlIHF1ZXJ5IGhpdCB0b2xlcmFuY2VcclxuICAgKi9cclxuICBASW5wdXQoKSBxdWVyeUZlYXR1cmVzQ29uZGl0aW9uOiAob2xMYXllcjogT2xMYXllcikgPT4gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhbGwgcXVlcnkgc2hvdWxkIGNvbXBsZXRlIGJlZm9yZSBlbWl0dGluZyBhbiBldmVudFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdhaXRGb3JBbGxRdWVyaWVzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHF1ZXJ5IChvciBhbGwgcXVlcmllcykgY29tcGxldGVcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcXVlcnkgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGZlYXR1cmVzOiBGZWF0dXJlW10gfCBGZWF0dXJlW11bXTtcclxuICAgIGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQ7XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogSUdPIG1hcFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiAodGhpcy5jb21wb25lbnQubWFwIGFzIGFueSkgYXMgSWdvTWFwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIHByaXZhdGUgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBxdWVyeVNlcnZpY2U6IFF1ZXJ5U2VydmljZVxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgbGlzdGVuaW5nIHRvIGNsaWNrIGFuZCBkcmFnIGJveCBldmVudHNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLmxpc3RlblRvTWFwQ2xpY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgbGlzdGVuaW5nIHRvIGNsaWNrIGFuZCBkcmFnIGJveCBldmVudHMgYW5kIGNhbmNlbCBvbmdvaW5kIHJlcXVlc3RzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNhbmNlbE9uZ29pbmdRdWVyaWVzKCk7XHJcbiAgICB0aGlzLnVubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gbWFwIGNsaWNrLCBpc3N1ZSBxdWVyaWVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaXN0ZW5Ub01hcENsaWNrKCkge1xyXG4gICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyID0gdGhpcy5tYXAub2wub24oXHJcbiAgICAgICdzaW5nbGVjbGljaycsXHJcbiAgICAgIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB0aGlzLm9uTWFwRXZlbnQoZXZlbnQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBsaXN0ZW5pZyBmb3IgbWFwIGNsaWNrc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5saXN0ZW5Ub01hcENsaWNrKCkge1xyXG4gICAgdGhpcy5tYXAub2wudW4odGhpcy5tYXBDbGlja0xpc3RlbmVyLnR5cGUsIHRoaXMubWFwQ2xpY2tMaXN0ZW5lci5saXN0ZW5lcik7XHJcbiAgICB0aGlzLm1hcENsaWNrTGlzdGVuZXIgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJc3N1ZSBxdWVyaWVzIGZyb20gYSBtYXAgZXZlbnQgYW5kIGVtaXQgZXZlbnRzIHdpdGggdGhlIHJlc3VsdHNcclxuICAgKiBAcGFyYW0gZXZlbnQgT0wgbWFwIGJyb3dzZXIgcG9pbnRlciBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25NYXBFdmVudChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSB7XHJcbiAgICB0aGlzLmNhbmNlbE9uZ29pbmdRdWVyaWVzKCk7XHJcbiAgICBpZiAoIXRoaXMucXVlcnlTZXJ2aWNlLnF1ZXJ5RW5hYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcXVlcmllcyQgPSBbXTtcclxuICAgIGlmICh0aGlzLnF1ZXJ5RmVhdHVyZXMpIHtcclxuICAgICAgcXVlcmllcyQucHVzaCh0aGlzLmRvUXVlcnlGZWF0dXJlcyhldmVudCkpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2cocXVlcmllcyQpO1xyXG5cclxuICAgIGNvbnN0IHJlc29sdXRpb24gPSB0aGlzLm1hcC5vbC5nZXRWaWV3KCkuZ2V0UmVzb2x1dGlvbigpO1xyXG4gICAgY29uc3QgcXVlcnlMYXllcnMgPSB0aGlzLm1hcC5sYXllcnMuZmlsdGVyKGxheWVySXNRdWVyeWFibGUpO1xyXG4gICAgcXVlcmllcyQucHVzaCguLi50aGlzLnF1ZXJ5U2VydmljZS5xdWVyeShxdWVyeUxheWVycywge1xyXG4gICAgICBjb29yZGluYXRlczogZXZlbnQuY29vcmRpbmF0ZSxcclxuICAgICAgcHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgcmVzb2x1dGlvblxyXG4gICAgfSkpO1xyXG5cclxuICAgIGlmIChxdWVyaWVzJC5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLndhaXRGb3JBbGxRdWVyaWVzKSB7XHJcbiAgICAgIHRoaXMucXVlcmllcyQkLnB1c2goXHJcbiAgICAgICAgemlwKC4uLnF1ZXJpZXMkKS5zdWJzY3JpYmUoKHJlc3VsdHM6IEZlYXR1cmVbXVtdKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmZWF0dXJlcyA9IFtdLmNvbmNhdCguLi5yZXN1bHRzKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZmVhdHVyZXMpO1xyXG4gICAgICAgICAgdGhpcy5xdWVyeS5lbWl0KHsgZmVhdHVyZXMsIGV2ZW50IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnF1ZXJpZXMkJCA9IHF1ZXJpZXMkLm1hcCgocXVlcnkkOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT4pID0+IHtcclxuICAgICAgICByZXR1cm4gcXVlcnkkLnN1YnNjcmliZSgoZmVhdHVyZXM6IEZlYXR1cmVbXSkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZmVhdHVyZXMpO1xyXG4gICAgICAgICAgdGhpcy5xdWVyeS5lbWl0KHsgZmVhdHVyZXMsIGV2ZW50IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHRoaXMucXVlcmllcyQkKTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMucXVlcnkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUXVlcnkgZmVhdHVyZXMgYWxyZWFkeSBwcmVzZW50IG9uIHRoZSBtYXBcclxuICAgKiBAcGFyYW0gZXZlbnQgT0wgbWFwIGJyb3dzZXIgcG9pbnRlciBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9RdWVyeUZlYXR1cmVzKGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT4ge1xyXG5cclxuICAgIGxldCBmZWF0dXJlO1xyXG4gICAgbGV0IGZlYXR1cmVzVGlsZUNvdmVyYWdlO1xyXG4gICAgY29uc3QgY2xpY2tlZEZlYXR1cmVzID0gW107XHJcblxyXG4gICAgdGhpcy5tYXAub2wuZm9yRWFjaEZlYXR1cmVBdFBpeGVsKFxyXG4gICAgICBldmVudC5waXhlbCxcclxuICAgICAgKGZlYXR1cmVPTDogT2xGZWF0dXJlLCBsYXllck9MOiBPbExheWVyKSA9PiB7XHJcbiAgICAgICAgaWYgKGZlYXR1cmVPTCkge1xyXG4gICAgICAgICAgaWYgKGZlYXR1cmVPTC5nZXQoJ2ZlYXR1cmVzJykpIHtcclxuICAgICAgICAgICAgZmVhdHVyZU9MID0gZmVhdHVyZU9MLmdldCgnZmVhdHVyZXMnKVswXTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZmVhdHVyZU9MKTtcclxuICAgICAgICAgICAgaWYgKGZlYXR1cmVPTC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBmZWF0dXJlID0gZmVhdHVyZUZyb21PbChmZWF0dXJlT0wsIHRoaXMubWFwLnByb2plY3Rpb24sIGxheWVyT0wpO1xyXG4gICAgICAgICAgY2xpY2tlZEZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhsYXllck9MKTtcclxuXHJcbiAgICAgICAgICBpZiAoZmVhdHVyZS5tZXRhLnR5cGVTb3VyY2UgPT09ICdtdnQnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNhbWVEYXRhVGlsZUZlYXR1cmVzID0gdGhpcy5zYW1lRGF0YVRpbGVzRmVhdHVyZShmZWF0dXJlLCBsYXllck9MKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBzYW1lRGF0YVRpbGVGZWF0dXJlIG9mIHNhbWVEYXRhVGlsZUZlYXR1cmVzKSB7XHJcbiAgICAgICAgICAgICAgZmVhdHVyZXNUaWxlQ292ZXJhZ2UgPSBmZWF0dXJlRnJvbU9sKHNhbWVEYXRhVGlsZUZlYXR1cmUsIHRoaXMubWFwLnByb2plY3Rpb24pO1xyXG4gICAgICAgICAgICAgIGNsaWNrZWRGZWF0dXJlcy5wdXNoKGZlYXR1cmVzVGlsZUNvdmVyYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZmVhdHVyZSA9IGZlYXR1cmVGcm9tT2woZmVhdHVyZU9MLCB0aGlzLm1hcC5wcm9qZWN0aW9uLCBsYXllck9MKTtcclxuICAgICAgICAgIGNsaWNrZWRGZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhsYXllck9MKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmZWF0dXJlKTtcclxuICAgICAgfSxcclxuICAgIHtcclxuICAgICAgaGl0VG9sZXJhbmNlOiB0aGlzLnF1ZXJ5RmVhdHVyZXNIaXRUb2xlcmFuY2UgfHwgMCxcclxuICAgICAgbGF5ZXJGaWx0ZXI6IHRoaXMucXVlcnlGZWF0dXJlc0NvbmRpdGlvbiA/IHRoaXMucXVlcnlGZWF0dXJlc0NvbmRpdGlvbiA6IG9sTGF5ZXJJc1F1ZXJ5YWJsZVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY2xpY2tlZEZlYXR1cmUgPSBjbGlja2VkRmVhdHVyZXMuc2hpZnQoKTtcclxuICAgIGNsaWNrZWRGZWF0dXJlcy5zaGlmdCgpO1xyXG4gICAgY2xpY2tlZEZlYXR1cmVzLnB1c2goY2xpY2tlZEZlYXR1cmUpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGNsaWNrZWRGZWF0dXJlcyk7XHJcbiAgICByZXR1cm4gb2YoY2xpY2tlZEZlYXR1cmVzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbmNlbCBvbmdvaW5nIHJlcXVlc3RzLCBpZiBhbnlcclxuICAgKi9cclxuICBwcml2YXRlIGNhbmNlbE9uZ29pbmdRdWVyaWVzKCkge1xyXG4gICAgdGhpcy5xdWVyaWVzJCQuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcclxuICAgIHRoaXMucXVlcmllcyQkID0gW107XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFRpbGVzKHRpbGVDYWNoZUVudHJpZXMsIG9sRmVhdHVyZSwgZGF0YSk6IEZlYXR1cmVbXSB7XHJcbiAgICBsZXQgdGlsZTtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgIE9iamVjdC5rZXlzKHRpbGVDYWNoZUVudHJpZXMpLmZvckVhY2godGlsZUNvb3JkID0+IHtcclxuICAgICAgdGlsZSA9IHRpbGVDYWNoZUVudHJpZXNbdGlsZUNvb3JkXTtcclxuICAgICAgaWYgKHRpbGUuZmVhdHVyZXNfICE9PSBudWxsKSB7XHJcbiAgICAgICAgdGlsZS5mZWF0dXJlc18uZm9yRWFjaChmZWF0dXJlID0+IHtcclxuICAgICAgICAgIGlmIChmZWF0dXJlLmdldChkYXRhKSA9PT0gb2xGZWF0dXJlLnByb3BlcnRpZXNbZGF0YV0pIHtcclxuICAgICAgICAgICAgbGlzdC5wdXNoKGZlYXR1cmUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBsaXN0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzYW1lRGF0YVRpbGVzRmVhdHVyZShmZWF0dXJlOiBGZWF0dXJlLCBsYXllcjogYW55KTogRmVhdHVyZVtdIHtcclxuICAgIGxldCBzYW1lRGF0YVRpbGVzRmVhdHVyZTtcclxuICAgIGxldCB0aWxlQ2FjaGVFbnRyaWVzO1xyXG4gICAgY29uc3QgZGF0YSA9IGxheWVyLnZhbHVlc18uc291cmNlT3B0aW9ucy5rZXk7XHJcbiAgICB0aWxlQ2FjaGVFbnRyaWVzID0gbGF5ZXIudmFsdWVzXy5zb3VyY2UudGlsZUNhY2hlLmVudHJpZXNfO1xyXG4gICAgY29uc3QgdGlsZSA9IE9iamVjdC5rZXlzKHRpbGVDYWNoZUVudHJpZXMpWzBdO1xyXG4gICAgdGlsZUNhY2hlRW50cmllcyA9IHRpbGVDYWNoZUVudHJpZXNbdGlsZV0udmFsdWVfLnNvdXJjZVRpbGVzXztcclxuICAgIHNhbWVEYXRhVGlsZXNGZWF0dXJlID0gdGhpcy5nZXRUaWxlcyh0aWxlQ2FjaGVFbnRyaWVzLCBmZWF0dXJlLCBkYXRhKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhzYW1lRGF0YVRpbGVzRmVhdHVyZSk7XHJcbiAgICByZXR1cm4gc2FtZURhdGFUaWxlc0ZlYXR1cmU7XHJcbiAgfVxyXG59XHJcbiJdfQ==