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
                        feature.meta.alias = _this.queryService.getAllowedFieldsAndAlias(layer);
                        feature.meta.title = feature.meta.title || _this.queryService.getQueryTitle(feature, layer);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3F1ZXJ5L3NoYXJlZC9xdWVyeS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdaLElBQUksRUFDTCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQTRCLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHekQsT0FBTyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFRaEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFbEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQVFyRTtJQTRERSx3QkFDa0IsU0FBOEIsRUFDdEMsWUFBMEI7UUFEbEIsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQWM7Ozs7UUF2RDVCLGNBQVMsR0FBbUIsRUFBRSxDQUFDOzs7O1FBb0I5QixrQkFBYSxHQUFZLEtBQUssQ0FBQzs7OztRQUsvQiw4QkFBeUIsR0FBVyxDQUFDLENBQUM7Ozs7UUFVdEMsc0JBQWlCLEdBQVksSUFBSSxDQUFDOzs7O1FBS2pDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFHOUIsQ0FBQztJQWFGLENBQUM7SUFQSixzQkFBSSwrQkFBRztRQUpQOzs7V0FHRzs7Ozs7O1FBQ0g7WUFDRSxPQUFPLG1CQUFBLENBQUMsbUJBQUEsSUFBSSxDQUFDLFNBQVMsQ0FB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QyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNLLDZDQUFvQjs7Ozs7SUFBNUI7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLEdBQWlCLElBQUssT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLEVBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDOztnQkF6TkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO2lCQUN2Qjs7OztnQkFmUSxtQkFBbUIsdUJBMEV2QixJQUFJO2dCQXRFQSxZQUFZOzs7Z0NBb0NsQixLQUFLOzRDQUtMLEtBQUs7eUNBS0wsS0FBSztvQ0FLTCxLQUFLO3dCQUtMLE1BQU07O0lBMktULHFCQUFDO0NBQUEsQUExTkQsSUEwTkM7U0F2TlksY0FBYzs7Ozs7OztJQUl6QixtQ0FBdUM7Ozs7OztJQUt2QywwQ0FBMkM7Ozs7OztJQUszQyw4Q0FBbUQ7Ozs7OztJQUtuRCxvREFBMkM7Ozs7O0lBSzNDLHVDQUF3Qzs7Ozs7SUFLeEMsbURBQStDOzs7OztJQUsvQyxnREFBK0Q7Ozs7O0lBSy9ELDJDQUEyQzs7Ozs7SUFLM0MsK0JBR0s7Ozs7O0lBV0gsbUNBQThDOzs7OztJQUM5QyxzQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRFbnRpdHlUaXRsZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25EZXN0cm95LFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgU2VsZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBvZiwgemlwIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgT2xSZW5kZXJGZWF0dXJlIGZyb20gJ29sL3JlbmRlci9GZWF0dXJlJztcclxuaW1wb3J0IE9sTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvTGF5ZXInO1xyXG5cclxuaW1wb3J0IE9sRHJhZ0JveEludGVyYWN0aW9uIGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYWdCb3gnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyUG9pbnRlckV2ZW50IGFzIE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7IExpc3RlbmVyRnVuY3Rpb24gfSBmcm9tICdvbC9ldmVudHMnO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbWFwL21hcC1icm93c2VyL21hcC1icm93c2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyByZW5kZXJGZWF0dXJlRnJvbU9sIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS51dGlscyc7XHJcbmltcG9ydCB7IGZlYXR1cmVGcm9tT2wgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLnV0aWxzJztcclxuaW1wb3J0IHsgUXVlcnlTZXJ2aWNlIH0gZnJvbSAnLi9xdWVyeS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgbGF5ZXJJc1F1ZXJ5YWJsZSwgb2xMYXllcklzUXVlcnlhYmxlIH0gZnJvbSAnLi9xdWVyeS51dGlscyc7XHJcbmltcG9ydCB7IEFueUxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9hbnktbGF5ZXInO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZGlyZWN0aXZlIG1ha2VzIGEgbWFwIHF1ZXJ5YWJsZSB3aXRoIGEgY2xpY2sgb2Ygd2l0aCBhIGRyYWcgYm94LlxyXG4gKiBCeSBkZWZhdWx0LCBhbGwgbGF5ZXJzIGFyZSBxdWVyeWFibGUgYnV0IHRoaXMgY2FuIGJlbiBjb250cm9sbGVkIGF0XHJcbiAqIHRoZSBsYXllciBsZXZlbC5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb1F1ZXJ5XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFF1ZXJ5RGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb25zIHRvIG9uZ29pbmcgcXVlcmllc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcXVlcmllcyQkOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0ZW5lciB0byB0aGUgbWFwIGNsaWNrIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXBDbGlja0xpc3RlbmVyOiBMaXN0ZW5lckZ1bmN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBPTCBkcmFnIGJveCBpbnRlcmFjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgb2xEcmFnQm94SW50ZXJhY3Rpb246IE9sRHJhZ0JveEludGVyYWN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBPbCBkcmFnIGJveCBcImVuZFwiIGV2ZW50IGtleVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb2xEcmFnQm94SW50ZXJhY3Rpb25FbmRLZXk6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogV2h0ZXIgdG8gcXVlcnkgZmVhdHVyZXMgb3Igbm90XHJcbiAgICovXHJcbiAgQElucHV0KCkgcXVlcnlGZWF0dXJlczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBGZWF0dXJlIHF1ZXJ5IGhpdCB0b2xlcmFuY2VcclxuICAgKi9cclxuICBASW5wdXQoKSBxdWVyeUZlYXR1cmVzSGl0VG9sZXJhbmNlOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBGZWF0dXJlIHF1ZXJ5IGhpdCB0b2xlcmFuY2VcclxuICAgKi9cclxuICBASW5wdXQoKSBxdWVyeUZlYXR1cmVzQ29uZGl0aW9uOiAob2xMYXllcjogT2xMYXllcikgPT4gYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhbGwgcXVlcnkgc2hvdWxkIGNvbXBsZXRlIGJlZm9yZSBlbWl0dGluZyBhbiBldmVudFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdhaXRGb3JBbGxRdWVyaWVzOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgcXVlcnkgKG9yIGFsbCBxdWVyaWVzKSBjb21wbGV0ZVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBxdWVyeSA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgZmVhdHVyZXM6IEZlYXR1cmVbXSB8IEZlYXR1cmVbXVtdO1xyXG4gICAgZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudDtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBJR08gbWFwXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuICh0aGlzLmNvbXBvbmVudC5tYXAgYXMgYW55KSBhcyBJZ29NYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgcHJpdmF0ZSBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIHF1ZXJ5U2VydmljZTogUXVlcnlTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydCBsaXN0ZW5pbmcgdG8gY2xpY2sgYW5kIGRyYWcgYm94IGV2ZW50c1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBsaXN0ZW5pbmcgdG8gY2xpY2sgYW5kIGRyYWcgYm94IGV2ZW50cyBhbmQgY2FuY2VsIG9uZ29pbmQgcmVxdWVzdHNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2FuY2VsT25nb2luZ1F1ZXJpZXMoKTtcclxuICAgIHRoaXMudW5saXN0ZW5Ub01hcENsaWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBtYXAgY2xpY2ssIGlzc3VlIHF1ZXJpZXNcclxuICAgKi9cclxuICBwcml2YXRlIGxpc3RlblRvTWFwQ2xpY2soKSB7XHJcbiAgICB0aGlzLm1hcENsaWNrTGlzdGVuZXIgPSB0aGlzLm1hcC5vbC5vbihcclxuICAgICAgJ3NpbmdsZWNsaWNrJyxcclxuICAgICAgKGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpID0+IHRoaXMub25NYXBFdmVudChldmVudClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIGxpc3RlbmluZyBmb3IgbWFwIGNsaWNrc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5saXN0ZW5Ub01hcENsaWNrKCkge1xyXG4gICAgdGhpcy5tYXAub2wudW4odGhpcy5tYXBDbGlja0xpc3RlbmVyLnR5cGUsIHRoaXMubWFwQ2xpY2tMaXN0ZW5lci5saXN0ZW5lcik7XHJcbiAgICB0aGlzLm1hcENsaWNrTGlzdGVuZXIgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJc3N1ZSBxdWVyaWVzIGZyb20gYSBtYXAgZXZlbnQgYW5kIGVtaXQgZXZlbnRzIHdpdGggdGhlIHJlc3VsdHNcclxuICAgKiBAcGFyYW0gZXZlbnQgT0wgbWFwIGJyb3dzZXIgcG9pbnRlciBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25NYXBFdmVudChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSB7XHJcbiAgICB0aGlzLmNhbmNlbE9uZ29pbmdRdWVyaWVzKCk7XHJcbiAgICBpZiAoIXRoaXMucXVlcnlTZXJ2aWNlLnF1ZXJ5RW5hYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcXVlcmllcyQgPSBbXTtcclxuICAgIGlmICh0aGlzLnF1ZXJ5RmVhdHVyZXMpIHtcclxuICAgICAgcXVlcmllcyQucHVzaCh0aGlzLmRvUXVlcnlGZWF0dXJlcyhldmVudCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc29sdXRpb24gPSB0aGlzLm1hcC5vbC5nZXRWaWV3KCkuZ2V0UmVzb2x1dGlvbigpO1xyXG4gICAgY29uc3QgcXVlcnlMYXllcnMgPSB0aGlzLm1hcC5sYXllcnMuZmlsdGVyKGxheWVySXNRdWVyeWFibGUpO1xyXG4gICAgcXVlcmllcyQucHVzaChcclxuICAgICAgLi4udGhpcy5xdWVyeVNlcnZpY2UucXVlcnkocXVlcnlMYXllcnMsIHtcclxuICAgICAgICBjb29yZGluYXRlczogZXZlbnQuY29vcmRpbmF0ZSxcclxuICAgICAgICBwcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICAgIHJlc29sdXRpb25cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHF1ZXJpZXMkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMud2FpdEZvckFsbFF1ZXJpZXMpIHtcclxuICAgICAgdGhpcy5xdWVyaWVzJCQucHVzaChcclxuICAgICAgICB6aXAoLi4ucXVlcmllcyQpLnN1YnNjcmliZSgocmVzdWx0czogRmVhdHVyZVtdW10pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZlYXR1cmVzID0gW10uY29uY2F0KC4uLnJlc3VsdHMpO1xyXG4gICAgICAgICAgdGhpcy5xdWVyeS5lbWl0KHsgZmVhdHVyZXMsIGV2ZW50IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnF1ZXJpZXMkJCA9IHF1ZXJpZXMkLm1hcCgocXVlcnkkOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT4pID0+IHtcclxuICAgICAgICByZXR1cm4gcXVlcnkkLnN1YnNjcmliZSgoZmVhdHVyZXM6IEZlYXR1cmVbXSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5xdWVyeS5lbWl0KHsgZmVhdHVyZXMsIGV2ZW50IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFF1ZXJ5IGZlYXR1cmVzIGFscmVhZHkgcHJlc2VudCBvbiB0aGUgbWFwXHJcbiAgICogQHBhcmFtIGV2ZW50IE9MIG1hcCBicm93c2VyIHBvaW50ZXIgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGRvUXVlcnlGZWF0dXJlcyhcclxuICAgIGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnRcclxuICApOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT4ge1xyXG4gICAgY29uc3QgY2xpY2tlZEZlYXR1cmVzID0gW107XHJcblxyXG4gICAgdGhpcy5tYXAub2wuZm9yRWFjaEZlYXR1cmVBdFBpeGVsKFxyXG4gICAgICBldmVudC5waXhlbCxcclxuICAgICAgKGZlYXR1cmVPTDogT2xGZWF0dXJlLCBsYXllck9MOiBPbExheWVyKSA9PiB7XHJcbiAgICAgICAgaWYgKGZlYXR1cmVPTCkge1xyXG4gICAgICAgICAgaWYgKGZlYXR1cmVPTC5nZXQoJ2ZlYXR1cmVzJykpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBmZWF0dXJlIG9mIGZlYXR1cmVPTC5nZXQoJ2ZlYXR1cmVzJykpIHtcclxuICAgICAgICAgICAgICBjb25zdCBuZXdGZWF0dXJlID0gZmVhdHVyZUZyb21PbChmZWF0dXJlLCB0aGlzLm1hcC5wcm9qZWN0aW9uKTtcclxuICAgICAgICAgICAgICBuZXdGZWF0dXJlLm1ldGEgPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogZmVhdHVyZS52YWx1ZXNfLm5vbSxcclxuICAgICAgICAgICAgICAgIGlkOiBmZWF0dXJlLmlkXyxcclxuICAgICAgICAgICAgICAgIGljb246IGZlYXR1cmUudmFsdWVzXy5faWNvbixcclxuICAgICAgICAgICAgICAgIHNvdXJjZVRpdGxlOiBsYXllck9MLnZhbHVlc18udGl0bGVcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgIGNsaWNrZWRGZWF0dXJlcy5wdXNoKG5ld0ZlYXR1cmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGZlYXR1cmVPTCBpbnN0YW5jZW9mIE9sUmVuZGVyRmVhdHVyZSkge1xyXG4gICAgICAgICAgICBjb25zdCBmZWF0dXJlRnJvbVJlbmRlcjogT2xGZWF0dXJlID0gZmVhdHVyZU9MO1xyXG4gICAgICAgICAgICBjb25zdCBmZWF0dXJlID0gcmVuZGVyRmVhdHVyZUZyb21PbChcclxuICAgICAgICAgICAgICBmZWF0dXJlT0wsXHJcbiAgICAgICAgICAgICAgdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgICAgICAgICBsYXllck9MXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNsaWNrZWRGZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgZmVhdHVyZSA9IGZlYXR1cmVGcm9tT2woXHJcbiAgICAgICAgICAgICAgZmVhdHVyZU9MLFxyXG4gICAgICAgICAgICAgIHRoaXMubWFwLnByb2plY3Rpb24sXHJcbiAgICAgICAgICAgICAgbGF5ZXJPTFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjbGlja2VkRmVhdHVyZXMucHVzaChmZWF0dXJlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBoaXRUb2xlcmFuY2U6IHRoaXMucXVlcnlGZWF0dXJlc0hpdFRvbGVyYW5jZSB8fCAwLFxyXG4gICAgICAgIGxheWVyRmlsdGVyOiB0aGlzLnF1ZXJ5RmVhdHVyZXNDb25kaXRpb25cclxuICAgICAgICAgID8gdGhpcy5xdWVyeUZlYXR1cmVzQ29uZGl0aW9uXHJcbiAgICAgICAgICA6IG9sTGF5ZXJJc1F1ZXJ5YWJsZVxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHF1ZXJ5YWJsZUxheWVycyA9IHRoaXMubWFwLmxheWVycy5maWx0ZXIobGF5ZXJJc1F1ZXJ5YWJsZSk7XHJcbiAgICBjbGlja2VkRmVhdHVyZXMuZm9yRWFjaCgoZmVhdHVyZTogRmVhdHVyZSkgPT4ge1xyXG4gICAgICBxdWVyeWFibGVMYXllcnMuZm9yRWFjaCgobGF5ZXI6IEFueUxheWVyKSA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBsYXllci5vbC5nZXRTb3VyY2UoKS5oYXNGZWF0dXJlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgaWYgKGxheWVyLm9sLmdldFNvdXJjZSgpLmhhc0ZlYXR1cmUoZmVhdHVyZS5vbCkpIHtcclxuICAgICAgICAgICAgZmVhdHVyZS5tZXRhLmFsaWFzID0gdGhpcy5xdWVyeVNlcnZpY2UuZ2V0QWxsb3dlZEZpZWxkc0FuZEFsaWFzKGxheWVyKTtcclxuICAgICAgICAgICAgZmVhdHVyZS5tZXRhLnRpdGxlID0gZmVhdHVyZS5tZXRhLnRpdGxlIHx8IHRoaXMucXVlcnlTZXJ2aWNlLmdldFF1ZXJ5VGl0bGUoZmVhdHVyZSwgbGF5ZXIpO1xyXG4gICAgICAgICAgICBmZWF0dXJlLm1ldGEuc291cmNlVGl0bGUgPSBsYXllci50aXRsZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG9mKGNsaWNrZWRGZWF0dXJlcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYW5jZWwgb25nb2luZyByZXF1ZXN0cywgaWYgYW55XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjYW5jZWxPbmdvaW5nUXVlcmllcygpIHtcclxuICAgIHRoaXMucXVlcmllcyQkLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XHJcbiAgICB0aGlzLnF1ZXJpZXMkJCA9IFtdO1xyXG4gIH1cclxufVxyXG4iXX0=