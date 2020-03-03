/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter, Self } from '@angular/core';
import { of, zip } from 'rxjs';
import OlRenderFeature from 'ol/render/Feature';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { renderFeatureFromOl } from '../../feature/shared/feature.utils';
import { featureFromOl } from '../../feature/shared/feature.utils';
import { QueryService } from './query.service';
import { layerIsQueryable, olLayerIsQueryable } from './query.utils';
/**
 * This directive makes a map queryable with a click of with a drag box.
 * By default, all layers are queryable but this can ben controlled at
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
        this.queryFeatures = false;
        /**
         * Feature query hit tolerance
         */
        this.queryFeaturesHitTolerance = 0;
        /**
         * Whether all query should complete before emitting an event
         */
        this.waitForAllQueries = true;
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
     * Stop listening for map clicks
     */
    /**
     * Stop listening for map clicks
     * @private
     * @return {?}
     */
    QueryDirective.prototype.unlistenToMapClick = /**
     * Stop listening for map clicks
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
                    _this.query.emit({ features: features, event: event });
                }));
            }));
        }
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
                    try {
                        for (var _b = tslib_1.__values(featureOL.get('features')), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var feature = _c.value;
                            /** @type {?} */
                            var newFeature = featureFromOl(feature, _this.map.projection);
                            newFeature.meta = {
                                title: feature.values_.nom,
                                id: feature.id_,
                                icon: feature.values_._icon,
                                sourceTitle: layerOL.values_.title
                            };
                            clickedFeatures.push(newFeature);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else if (featureOL instanceof OlRenderFeature) {
                    /** @type {?} */
                    var featureFromRender = featureOL;
                    /** @type {?} */
                    var feature = renderFeatureFromOl(featureOL, _this.map.projection, layerOL);
                    clickedFeatures.push(feature);
                }
                else {
                    /** @type {?} */
                    var feature = featureFromOl(featureOL, _this.map.projection, layerOL);
                    clickedFeatures.push(feature);
                }
            }
        }), {
            hitTolerance: this.queryFeaturesHitTolerance || 0,
            layerFilter: this.queryFeaturesCondition
                ? this.queryFeaturesCondition
                : olLayerIsQueryable
        });
        /** @type {?} */
        var queryableLayers = this.map.layers.filter(layerIsQueryable);
        clickedFeatures.forEach((/**
         * @param {?} feature
         * @return {?}
         */
        function (feature) {
            queryableLayers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) {
                if (typeof layer.ol.getSource().hasFeature !== 'undefined') {
                    if (layer.ol.getSource().hasFeature(feature.ol)) {
                        (feature.meta.id = feature.ol._id),
                            (feature.meta.alias = _this.queryService.getAllowedFieldsAndAlias(layer));
                        feature.meta.title =
                            feature.meta.title ||
                                _this.queryService.getQueryTitle(feature, layer);
                        feature.meta.sourceTitle = layer.title;
                    }
                }
            }));
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3F1ZXJ5L3NoYXJlZC9xdWVyeS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdaLElBQUksRUFDTCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQTRCLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHekQsT0FBTyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFRaEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFbEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQVFyRTtJQTRERSx3QkFDa0IsU0FBOEIsRUFDdEMsWUFBMEI7UUFEbEIsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQWM7Ozs7UUF2RDVCLGNBQVMsR0FBbUIsRUFBRSxDQUFDOzs7O1FBb0I5QixrQkFBYSxHQUFZLEtBQUssQ0FBQzs7OztRQUsvQiw4QkFBeUIsR0FBVyxDQUFDLENBQUM7Ozs7UUFVdEMsc0JBQWlCLEdBQVksSUFBSSxDQUFDOzs7O1FBS2pDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFHOUIsQ0FBQztJQWFGLENBQUM7SUFQSixzQkFBSSwrQkFBRztRQUpQOzs7V0FHRzs7Ozs7O1FBQ0g7WUFDRSxPQUFPLG1CQUFBLENBQUMsbUJBQUEsSUFBSSxDQUFDLFNBQVMsQ0FB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QUM7d0JBQ2xELE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7cUJBQ3hDO2lCQUNGO1lBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssNkNBQW9COzs7OztJQUE1QjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsR0FBaUIsSUFBSyxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsRUFBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7O2dCQTlORixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7aUJBQ3ZCOzs7O2dCQWZRLG1CQUFtQix1QkEwRXZCLElBQUk7Z0JBdEVBLFlBQVk7OztnQ0FvQ2xCLEtBQUs7NENBS0wsS0FBSzt5Q0FLTCxLQUFLO29DQUtMLEtBQUs7d0JBS0wsTUFBTTs7SUFnTFQscUJBQUM7Q0FBQSxBQS9ORCxJQStOQztTQTVOWSxjQUFjOzs7Ozs7O0lBSXpCLG1DQUF1Qzs7Ozs7O0lBS3ZDLDBDQUEyQzs7Ozs7O0lBSzNDLDhDQUFtRDs7Ozs7O0lBS25ELG9EQUEyQzs7Ozs7SUFLM0MsdUNBQXdDOzs7OztJQUt4QyxtREFBK0M7Ozs7O0lBSy9DLGdEQUErRDs7Ozs7SUFLL0QsMkNBQTJDOzs7OztJQUszQywrQkFHSzs7Ozs7SUFXSCxtQ0FBOEM7Ozs7O0lBQzlDLHNDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEVudGl0eVRpdGxlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkRlc3Ryb3ksXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBTZWxmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG9mLCB6aXAgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbFJlbmRlckZlYXR1cmUgZnJvbSAnb2wvcmVuZGVyL0ZlYXR1cmUnO1xyXG5pbXBvcnQgT2xMYXllciBmcm9tICdvbC9sYXllci9MYXllcic7XHJcblxyXG5pbXBvcnQgT2xEcmFnQm94SW50ZXJhY3Rpb24gZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhZ0JveCc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJQb2ludGVyRXZlbnQgYXMgT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50IH0gZnJvbSAnb2wvTWFwQnJvd3NlckV2ZW50JztcclxuaW1wb3J0IHsgTGlzdGVuZXJGdW5jdGlvbiB9IGZyb20gJ29sL2V2ZW50cyc7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9tYXAvbWFwLWJyb3dzZXIvbWFwLWJyb3dzZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IHJlbmRlckZlYXR1cmVGcm9tT2wgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLnV0aWxzJztcclxuaW1wb3J0IHsgZmVhdHVyZUZyb21PbCB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUudXRpbHMnO1xyXG5pbXBvcnQgeyBRdWVyeVNlcnZpY2UgfSBmcm9tICcuL3F1ZXJ5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBsYXllcklzUXVlcnlhYmxlLCBvbExheWVySXNRdWVyeWFibGUgfSBmcm9tICcuL3F1ZXJ5LnV0aWxzJztcclxuaW1wb3J0IHsgQW55TGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2FueS1sYXllcic7XHJcblxyXG4vKipcclxuICogVGhpcyBkaXJlY3RpdmUgbWFrZXMgYSBtYXAgcXVlcnlhYmxlIHdpdGggYSBjbGljayBvZiB3aXRoIGEgZHJhZyBib3guXHJcbiAqIEJ5IGRlZmF1bHQsIGFsbCBsYXllcnMgYXJlIHF1ZXJ5YWJsZSBidXQgdGhpcyBjYW4gYmVuIGNvbnRyb2xsZWQgYXRcclxuICogdGhlIGxheWVyIGxldmVsLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvUXVlcnldJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUXVlcnlEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbnMgdG8gb25nb2luZyBxdWVyaWVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBxdWVyaWVzJCQ6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3RlbmVyIHRvIHRoZSBtYXAgY2xpY2sgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG1hcENsaWNrTGlzdGVuZXI6IExpc3RlbmVyRnVuY3Rpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIE9MIGRyYWcgYm94IGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbERyYWdCb3hJbnRlcmFjdGlvbjogT2xEcmFnQm94SW50ZXJhY3Rpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIE9sIGRyYWcgYm94IFwiZW5kXCIgZXZlbnQga2V5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbERyYWdCb3hJbnRlcmFjdGlvbkVuZEtleTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBXaHRlciB0byBxdWVyeSBmZWF0dXJlcyBvciBub3RcclxuICAgKi9cclxuICBASW5wdXQoKSBxdWVyeUZlYXR1cmVzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZlYXR1cmUgcXVlcnkgaGl0IHRvbGVyYW5jZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHF1ZXJ5RmVhdHVyZXNIaXRUb2xlcmFuY2U6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZlYXR1cmUgcXVlcnkgaGl0IHRvbGVyYW5jZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHF1ZXJ5RmVhdHVyZXNDb25kaXRpb246IChvbExheWVyOiBPbExheWVyKSA9PiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGFsbCBxdWVyeSBzaG91bGQgY29tcGxldGUgYmVmb3JlIGVtaXR0aW5nIGFuIGV2ZW50XHJcbiAgICovXHJcbiAgQElucHV0KCkgd2FpdEZvckFsbFF1ZXJpZXM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYSBxdWVyeSAob3IgYWxsIHF1ZXJpZXMpIGNvbXBsZXRlXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHF1ZXJ5ID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBmZWF0dXJlczogRmVhdHVyZVtdIHwgRmVhdHVyZVtdW107XHJcbiAgICBldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50O1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIElHTyBtYXBcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gKHRoaXMuY29tcG9uZW50Lm1hcCBhcyBhbnkpIGFzIElnb01hcDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBwcml2YXRlIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgcXVlcnlTZXJ2aWNlOiBRdWVyeVNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IGxpc3RlbmluZyB0byBjbGljayBhbmQgZHJhZyBib3ggZXZlbnRzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5saXN0ZW5Ub01hcENsaWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIGxpc3RlbmluZyB0byBjbGljayBhbmQgZHJhZyBib3ggZXZlbnRzIGFuZCBjYW5jZWwgb25nb2luZCByZXF1ZXN0c1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jYW5jZWxPbmdvaW5nUXVlcmllcygpO1xyXG4gICAgdGhpcy51bmxpc3RlblRvTWFwQ2xpY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIG1hcCBjbGljaywgaXNzdWUgcXVlcmllc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlzdGVuVG9NYXBDbGljaygpIHtcclxuICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lciA9IHRoaXMubWFwLm9sLm9uKFxyXG4gICAgICAnc2luZ2xlY2xpY2snLFxyXG4gICAgICAoZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkgPT4gdGhpcy5vbk1hcEV2ZW50KGV2ZW50KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgbGlzdGVuaW5nIGZvciBtYXAgY2xpY2tzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bmxpc3RlblRvTWFwQ2xpY2soKSB7XHJcbiAgICB0aGlzLm1hcC5vbC51bih0aGlzLm1hcENsaWNrTGlzdGVuZXIudHlwZSwgdGhpcy5tYXBDbGlja0xpc3RlbmVyLmxpc3RlbmVyKTtcclxuICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lciA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIElzc3VlIHF1ZXJpZXMgZnJvbSBhIG1hcCBldmVudCBhbmQgZW1pdCBldmVudHMgd2l0aCB0aGUgcmVzdWx0c1xyXG4gICAqIEBwYXJhbSBldmVudCBPTCBtYXAgYnJvd3NlciBwb2ludGVyIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1hcEV2ZW50KGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpIHtcclxuICAgIHRoaXMuY2FuY2VsT25nb2luZ1F1ZXJpZXMoKTtcclxuICAgIGlmICghdGhpcy5xdWVyeVNlcnZpY2UucXVlcnlFbmFibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBxdWVyaWVzJCA9IFtdO1xyXG4gICAgaWYgKHRoaXMucXVlcnlGZWF0dXJlcykge1xyXG4gICAgICBxdWVyaWVzJC5wdXNoKHRoaXMuZG9RdWVyeUZlYXR1cmVzKGV2ZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzb2x1dGlvbiA9IHRoaXMubWFwLm9sLmdldFZpZXcoKS5nZXRSZXNvbHV0aW9uKCk7XHJcbiAgICBjb25zdCBxdWVyeUxheWVycyA9IHRoaXMubWFwLmxheWVycy5maWx0ZXIobGF5ZXJJc1F1ZXJ5YWJsZSk7XHJcbiAgICBxdWVyaWVzJC5wdXNoKFxyXG4gICAgICAuLi50aGlzLnF1ZXJ5U2VydmljZS5xdWVyeShxdWVyeUxheWVycywge1xyXG4gICAgICAgIGNvb3JkaW5hdGVzOiBldmVudC5jb29yZGluYXRlLFxyXG4gICAgICAgIHByb2plY3Rpb246IHRoaXMubWFwLnByb2plY3Rpb24sXHJcbiAgICAgICAgcmVzb2x1dGlvblxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocXVlcmllcyQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy53YWl0Rm9yQWxsUXVlcmllcykge1xyXG4gICAgICB0aGlzLnF1ZXJpZXMkJC5wdXNoKFxyXG4gICAgICAgIHppcCguLi5xdWVyaWVzJCkuc3Vic2NyaWJlKChyZXN1bHRzOiBGZWF0dXJlW11bXSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmVhdHVyZXMgPSBbXS5jb25jYXQoLi4ucmVzdWx0cyk7XHJcbiAgICAgICAgICB0aGlzLnF1ZXJ5LmVtaXQoeyBmZWF0dXJlcywgZXZlbnQgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucXVlcmllcyQkID0gcXVlcmllcyQubWFwKChxdWVyeSQ6IE9ic2VydmFibGU8RmVhdHVyZVtdPikgPT4ge1xyXG4gICAgICAgIHJldHVybiBxdWVyeSQuc3Vic2NyaWJlKChmZWF0dXJlczogRmVhdHVyZVtdKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnF1ZXJ5LmVtaXQoeyBmZWF0dXJlcywgZXZlbnQgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUXVlcnkgZmVhdHVyZXMgYWxyZWFkeSBwcmVzZW50IG9uIHRoZSBtYXBcclxuICAgKiBAcGFyYW0gZXZlbnQgT0wgbWFwIGJyb3dzZXIgcG9pbnRlciBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9RdWVyeUZlYXR1cmVzKFxyXG4gICAgZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudFxyXG4gICk6IE9ic2VydmFibGU8RmVhdHVyZVtdPiB7XHJcbiAgICBjb25zdCBjbGlja2VkRmVhdHVyZXMgPSBbXTtcclxuXHJcbiAgICB0aGlzLm1hcC5vbC5mb3JFYWNoRmVhdHVyZUF0UGl4ZWwoXHJcbiAgICAgIGV2ZW50LnBpeGVsLFxyXG4gICAgICAoZmVhdHVyZU9MOiBPbEZlYXR1cmUsIGxheWVyT0w6IE9sTGF5ZXIpID0+IHtcclxuICAgICAgICBpZiAoZmVhdHVyZU9MKSB7XHJcbiAgICAgICAgICBpZiAoZmVhdHVyZU9MLmdldCgnZmVhdHVyZXMnKSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZlYXR1cmUgb2YgZmVhdHVyZU9MLmdldCgnZmVhdHVyZXMnKSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IG5ld0ZlYXR1cmUgPSBmZWF0dXJlRnJvbU9sKGZlYXR1cmUsIHRoaXMubWFwLnByb2plY3Rpb24pO1xyXG4gICAgICAgICAgICAgIG5ld0ZlYXR1cmUubWV0YSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBmZWF0dXJlLnZhbHVlc18ubm9tLFxyXG4gICAgICAgICAgICAgICAgaWQ6IGZlYXR1cmUuaWRfLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogZmVhdHVyZS52YWx1ZXNfLl9pY29uLFxyXG4gICAgICAgICAgICAgICAgc291cmNlVGl0bGU6IGxheWVyT0wudmFsdWVzXy50aXRsZVxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgY2xpY2tlZEZlYXR1cmVzLnB1c2gobmV3RmVhdHVyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoZmVhdHVyZU9MIGluc3RhbmNlb2YgT2xSZW5kZXJGZWF0dXJlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZlYXR1cmVGcm9tUmVuZGVyOiBPbEZlYXR1cmUgPSBmZWF0dXJlT0w7XHJcbiAgICAgICAgICAgIGNvbnN0IGZlYXR1cmUgPSByZW5kZXJGZWF0dXJlRnJvbU9sKFxyXG4gICAgICAgICAgICAgIGZlYXR1cmVPTCxcclxuICAgICAgICAgICAgICB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICAgICAgICAgIGxheWVyT0xcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY2xpY2tlZEZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBmZWF0dXJlID0gZmVhdHVyZUZyb21PbChcclxuICAgICAgICAgICAgICBmZWF0dXJlT0wsXHJcbiAgICAgICAgICAgICAgdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgICAgICAgICBsYXllck9MXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNsaWNrZWRGZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGhpdFRvbGVyYW5jZTogdGhpcy5xdWVyeUZlYXR1cmVzSGl0VG9sZXJhbmNlIHx8IDAsXHJcbiAgICAgICAgbGF5ZXJGaWx0ZXI6IHRoaXMucXVlcnlGZWF0dXJlc0NvbmRpdGlvblxyXG4gICAgICAgICAgPyB0aGlzLnF1ZXJ5RmVhdHVyZXNDb25kaXRpb25cclxuICAgICAgICAgIDogb2xMYXllcklzUXVlcnlhYmxlXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgcXVlcnlhYmxlTGF5ZXJzID0gdGhpcy5tYXAubGF5ZXJzLmZpbHRlcihsYXllcklzUXVlcnlhYmxlKTtcclxuICAgIGNsaWNrZWRGZWF0dXJlcy5mb3JFYWNoKChmZWF0dXJlOiBGZWF0dXJlKSA9PiB7XHJcbiAgICAgIHF1ZXJ5YWJsZUxheWVycy5mb3JFYWNoKChsYXllcjogQW55TGF5ZXIpID0+IHtcclxuICAgICAgICBpZiAodHlwZW9mIGxheWVyLm9sLmdldFNvdXJjZSgpLmhhc0ZlYXR1cmUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICBpZiAobGF5ZXIub2wuZ2V0U291cmNlKCkuaGFzRmVhdHVyZShmZWF0dXJlLm9sKSkge1xyXG4gICAgICAgICAgICAoZmVhdHVyZS5tZXRhLmlkID0gZmVhdHVyZS5vbC5faWQpLFxyXG4gICAgICAgICAgICAgIChmZWF0dXJlLm1ldGEuYWxpYXMgPSB0aGlzLnF1ZXJ5U2VydmljZS5nZXRBbGxvd2VkRmllbGRzQW5kQWxpYXMoXHJcbiAgICAgICAgICAgICAgICBsYXllclxyXG4gICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICBmZWF0dXJlLm1ldGEudGl0bGUgPVxyXG4gICAgICAgICAgICAgIGZlYXR1cmUubWV0YS50aXRsZSB8fFxyXG4gICAgICAgICAgICAgIHRoaXMucXVlcnlTZXJ2aWNlLmdldFF1ZXJ5VGl0bGUoZmVhdHVyZSwgbGF5ZXIpO1xyXG4gICAgICAgICAgICBmZWF0dXJlLm1ldGEuc291cmNlVGl0bGUgPSBsYXllci50aXRsZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG9mKGNsaWNrZWRGZWF0dXJlcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYW5jZWwgb25nb2luZyByZXF1ZXN0cywgaWYgYW55XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjYW5jZWxPbmdvaW5nUXVlcmllcygpIHtcclxuICAgIHRoaXMucXVlcmllcyQkLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XHJcbiAgICB0aGlzLnF1ZXJpZXMkJCA9IFtdO1xyXG4gIH1cclxufVxyXG4iXX0=