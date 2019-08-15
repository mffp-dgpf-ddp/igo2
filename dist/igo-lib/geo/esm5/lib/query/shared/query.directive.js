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
        var feature;
        /** @type {?} */
        var clickedFeatures = [];
        this.map.ol.forEachFeatureAtPixel(event.pixel, (/**
         * @param {?} featureOL
         * @param {?} layerOL
         * @return {?}
         */
        function (featureOL, layerOL) {
            if (featureOL) {
                if (featureOL.get('features')) {
                    featureOL = featureOL.get('features')[0];
                }
                feature = featureFromOl(featureOL, _this.map.projection, layerOL);
                clickedFeatures.push(feature);
            }
            else {
                feature = featureFromOl(featureOL, _this.map.projection, layerOL);
                clickedFeatures.push(feature);
            }
        }), {
            hitTolerance: this.queryFeaturesHitTolerance || 0,
            layerFilter: this.queryFeaturesCondition ? this.queryFeaturesCondition : olLayerIsQueryable
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3F1ZXJ5L3NoYXJlZC9xdWVyeS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdaLElBQUksRUFDTCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQTRCLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFVekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFbEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQU9yRTtJQTRERSx3QkFDa0IsU0FBOEIsRUFDdEMsWUFBMEI7UUFEbEIsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQWM7Ozs7UUF2RDVCLGNBQVMsR0FBbUIsRUFBRSxDQUFDOzs7O1FBb0I5QixrQkFBYSxHQUFZLEtBQUssQ0FBQzs7OztRQUsvQiw4QkFBeUIsR0FBVyxDQUFDLENBQUM7Ozs7UUFVdEMsc0JBQWlCLEdBQVksSUFBSSxDQUFDOzs7O1FBS2pDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFHOUIsQ0FBQztJQWFGLENBQUM7SUFQSixzQkFBSSwrQkFBRztRQUpQOzs7V0FHRzs7Ozs7O1FBQ0g7WUFDRSxPQUFPLG1CQUFBLENBQUMsbUJBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQU8sQ0FBQyxFQUFVLENBQUM7UUFDL0MsQ0FBQzs7O09BQUE7SUFPRDs7O09BR0c7Ozs7OztJQUNILHdDQUFlOzs7OztJ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QWlCLEVBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDOztnQkFyTEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO2lCQUN2Qjs7OztnQkFiUSxtQkFBbUIsdUJBd0V2QixJQUFJO2dCQXJFQSxZQUFZOzs7Z0NBbUNsQixLQUFLOzRDQUtMLEtBQUs7eUNBS0wsS0FBSztvQ0FLTCxLQUFLO3dCQUtMLE1BQU07O0lBdUlULHFCQUFDO0NBQUEsQUF0TEQsSUFzTEM7U0FuTFksY0FBYzs7Ozs7OztJQUl6QixtQ0FBdUM7Ozs7OztJQUt2QywwQ0FBMkM7Ozs7OztJQUszQyw4Q0FBbUQ7Ozs7OztJQUtuRCxvREFBMkM7Ozs7O0lBSzNDLHVDQUF3Qzs7Ozs7SUFLeEMsbURBQStDOzs7OztJQUsvQyxnREFBK0Q7Ozs7O0lBSy9ELDJDQUEyQzs7Ozs7SUFLM0MsK0JBR0s7Ozs7O0lBV0gsbUNBQThDOzs7OztJQUM5QyxzQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uRGVzdHJveSxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIFNlbGZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgb2YsIHppcCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IE9sTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvTGF5ZXInO1xyXG5cclxuaW1wb3J0IE9sRHJhZ0JveEludGVyYWN0aW9uIGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYWdCb3gnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyUG9pbnRlckV2ZW50IGFzIE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7IExpc3RlbmVyRnVuY3Rpb24gfSBmcm9tICdvbC9ldmVudHMnO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbWFwL21hcC1icm93c2VyL21hcC1icm93c2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBmZWF0dXJlRnJvbU9sIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS51dGlscyc7XHJcbmltcG9ydCB7IFF1ZXJ5U2VydmljZSB9IGZyb20gJy4vcXVlcnkuc2VydmljZSc7XHJcbmltcG9ydCB7IGxheWVySXNRdWVyeWFibGUsIG9sTGF5ZXJJc1F1ZXJ5YWJsZSB9IGZyb20gJy4vcXVlcnkudXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZGlyZWN0aXZlIG1ha2VzIGEgbWFwIHF1ZXJ5YWJsZSB3aXRoIGEgY2xpY2sgb2Ygd2l0aCBhIGRyYWcgYm94LlxyXG4gKiBCeSBkZWZhdWx0LCBhbGwgbGF5ZXJzIGFyZSBxdWVyeWFibGUgYnV0IHRoaXMgY25hIGJlbiBjb250cm9sbGVkIGF0XHJcbiAqIHRoZSBsYXllciBsZXZlbC5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb1F1ZXJ5XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFF1ZXJ5RGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb25zIHRvIG9uZ29pbmcgcXVlcmllc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcXVlcmllcyQkOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0ZW5lciB0byB0aGUgbWFwIGNsaWNrIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXBDbGlja0xpc3RlbmVyOiBMaXN0ZW5lckZ1bmN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBPTCBkcmFnIGJveCBpbnRlcmFjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgb2xEcmFnQm94SW50ZXJhY3Rpb246IE9sRHJhZ0JveEludGVyYWN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBPbCBkcmFnIGJveCBcImVuZFwiIGV2ZW50IGtleVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb2xEcmFnQm94SW50ZXJhY3Rpb25FbmRLZXk6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogV2h0ZXIgdG8gcXVlcnkgZmVhdHVyZXMgb3Igbm90XHJcbiAgICovXHJcbiAgQElucHV0KCkgcXVlcnlGZWF0dXJlczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBGZWF0dXJlIHF1ZXJ5IGhpdCB0b2xlcmFuY2VcclxuICAgKi9cclxuICBASW5wdXQoKSBxdWVyeUZlYXR1cmVzSGl0VG9sZXJhbmNlOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBGZWF0dXJlIHF1ZXJ5IGhpdCB0b2xlcmFuY2VcclxuICAgKi9cclxuICBASW5wdXQoKSBxdWVyeUZlYXR1cmVzQ29uZGl0aW9uOiAob2xMYXllcjogT2xMYXllcikgPT4gYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhbGwgcXVlcnkgc2hvdWxkIGNvbXBsZXRlIGJlZm9yZSBlbWl0dGluZyBhbiBldmVudFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdhaXRGb3JBbGxRdWVyaWVzOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgcXVlcnkgKG9yIGFsbCBxdWVyaWVzKSBjb21wbGV0ZVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBxdWVyeSA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgZmVhdHVyZXM6IEZlYXR1cmVbXSB8IEZlYXR1cmVbXVtdO1xyXG4gICAgZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudDtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBJR08gbWFwXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuICh0aGlzLmNvbXBvbmVudC5tYXAgYXMgYW55KSBhcyBJZ29NYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgcHJpdmF0ZSBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIHF1ZXJ5U2VydmljZTogUXVlcnlTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydCBsaXN0ZW5pbmcgdG8gY2xpY2sgYW5kIGRyYWcgYm94IGV2ZW50c1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBsaXN0ZW5pbmcgdG8gY2xpY2sgYW5kIGRyYWcgYm94IGV2ZW50cyBhbmQgY2FuY2VsIG9uZ29pbmQgcmVxdWVzdHNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2FuY2VsT25nb2luZ1F1ZXJpZXMoKTtcclxuICAgIHRoaXMudW5saXN0ZW5Ub01hcENsaWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBtYXAgY2xpY2ssIGlzc3VlIHF1ZXJpZXNcclxuICAgKi9cclxuICBwcml2YXRlIGxpc3RlblRvTWFwQ2xpY2soKSB7XHJcbiAgICB0aGlzLm1hcENsaWNrTGlzdGVuZXIgPSB0aGlzLm1hcC5vbC5vbihcclxuICAgICAgJ3NpbmdsZWNsaWNrJyxcclxuICAgICAgKGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpID0+IHRoaXMub25NYXBFdmVudChldmVudClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIGxpc3RlbmlnIGZvciBtYXAgY2xpY2tzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bmxpc3RlblRvTWFwQ2xpY2soKSB7XHJcbiAgICB0aGlzLm1hcC5vbC51bih0aGlzLm1hcENsaWNrTGlzdGVuZXIudHlwZSwgdGhpcy5tYXBDbGlja0xpc3RlbmVyLmxpc3RlbmVyKTtcclxuICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lciA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIElzc3VlIHF1ZXJpZXMgZnJvbSBhIG1hcCBldmVudCBhbmQgZW1pdCBldmVudHMgd2l0aCB0aGUgcmVzdWx0c1xyXG4gICAqIEBwYXJhbSBldmVudCBPTCBtYXAgYnJvd3NlciBwb2ludGVyIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1hcEV2ZW50KGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpIHtcclxuICAgIHRoaXMuY2FuY2VsT25nb2luZ1F1ZXJpZXMoKTtcclxuICAgIGlmICghdGhpcy5xdWVyeVNlcnZpY2UucXVlcnlFbmFibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBxdWVyaWVzJCA9IFtdO1xyXG4gICAgaWYgKHRoaXMucXVlcnlGZWF0dXJlcykge1xyXG4gICAgICBxdWVyaWVzJC5wdXNoKHRoaXMuZG9RdWVyeUZlYXR1cmVzKGV2ZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzb2x1dGlvbiA9IHRoaXMubWFwLm9sLmdldFZpZXcoKS5nZXRSZXNvbHV0aW9uKCk7XHJcbiAgICBjb25zdCBxdWVyeUxheWVycyA9IHRoaXMubWFwLmxheWVycy5maWx0ZXIobGF5ZXJJc1F1ZXJ5YWJsZSk7XHJcbiAgICBxdWVyaWVzJC5wdXNoKC4uLnRoaXMucXVlcnlTZXJ2aWNlLnF1ZXJ5KHF1ZXJ5TGF5ZXJzLCB7XHJcbiAgICAgIGNvb3JkaW5hdGVzOiBldmVudC5jb29yZGluYXRlLFxyXG4gICAgICBwcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICByZXNvbHV0aW9uXHJcbiAgICB9KSk7XHJcblxyXG4gICAgaWYgKHF1ZXJpZXMkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMud2FpdEZvckFsbFF1ZXJpZXMpIHtcclxuICAgICAgdGhpcy5xdWVyaWVzJCQucHVzaChcclxuICAgICAgICB6aXAoLi4ucXVlcmllcyQpLnN1YnNjcmliZSgocmVzdWx0czogRmVhdHVyZVtdW10pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZlYXR1cmVzID0gW10uY29uY2F0KC4uLnJlc3VsdHMpO1xyXG4gICAgICAgICAgdGhpcy5xdWVyeS5lbWl0KHsgZmVhdHVyZXMsIGV2ZW50IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnF1ZXJpZXMkJCA9IHF1ZXJpZXMkLm1hcCgocXVlcnkkOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT4pID0+IHtcclxuICAgICAgICByZXR1cm4gcXVlcnkkLnN1YnNjcmliZSgoZmVhdHVyZXM6IEZlYXR1cmVbXSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5xdWVyeS5lbWl0KHsgZmVhdHVyZXMsIGV2ZW50IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFF1ZXJ5IGZlYXR1cmVzIGFscmVhZHkgcHJlc2VudCBvbiB0aGUgbWFwXHJcbiAgICogQHBhcmFtIGV2ZW50IE9MIG1hcCBicm93c2VyIHBvaW50ZXIgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGRvUXVlcnlGZWF0dXJlcyhldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KTogT2JzZXJ2YWJsZTxGZWF0dXJlW10+IHtcclxuXHJcbiAgICBsZXQgZmVhdHVyZTtcclxuICAgIGNvbnN0IGNsaWNrZWRGZWF0dXJlcyA9IFtdO1xyXG5cclxuICAgIHRoaXMubWFwLm9sLmZvckVhY2hGZWF0dXJlQXRQaXhlbChcclxuICAgICAgZXZlbnQucGl4ZWwsXHJcbiAgICAgIChmZWF0dXJlT0w6IE9sRmVhdHVyZSwgbGF5ZXJPTDogT2xMYXllcikgPT4ge1xyXG4gICAgICAgIGlmIChmZWF0dXJlT0wpIHtcclxuICAgICAgICAgIGlmIChmZWF0dXJlT0wuZ2V0KCdmZWF0dXJlcycpKSB7XHJcbiAgICAgICAgICAgIGZlYXR1cmVPTCA9IGZlYXR1cmVPTC5nZXQoJ2ZlYXR1cmVzJylbMF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBmZWF0dXJlID0gZmVhdHVyZUZyb21PbChmZWF0dXJlT0wsIHRoaXMubWFwLnByb2plY3Rpb24sIGxheWVyT0wpO1xyXG4gICAgICAgICAgY2xpY2tlZEZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmZWF0dXJlID0gZmVhdHVyZUZyb21PbChmZWF0dXJlT0wsIHRoaXMubWFwLnByb2plY3Rpb24sIGxheWVyT0wpO1xyXG4gICAgICAgICAgY2xpY2tlZEZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAge1xyXG4gICAgICBoaXRUb2xlcmFuY2U6IHRoaXMucXVlcnlGZWF0dXJlc0hpdFRvbGVyYW5jZSB8fCAwLFxyXG4gICAgICBsYXllckZpbHRlcjogdGhpcy5xdWVyeUZlYXR1cmVzQ29uZGl0aW9uID8gdGhpcy5xdWVyeUZlYXR1cmVzQ29uZGl0aW9uIDogb2xMYXllcklzUXVlcnlhYmxlXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gb2YoY2xpY2tlZEZlYXR1cmVzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbmNlbCBvbmdvaW5nIHJlcXVlc3RzLCBpZiBhbnlcclxuICAgKi9cclxuICBwcml2YXRlIGNhbmNlbE9uZ29pbmdRdWVyaWVzKCkge1xyXG4gICAgdGhpcy5xdWVyaWVzJCQuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcclxuICAgIHRoaXMucXVlcmllcyQkID0gW107XHJcbiAgfVxyXG59XHJcbiJdfQ==