/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class QueryDirective {
    /**
     * @param {?} component
     * @param {?} queryService
     */
    constructor(component, queryService) {
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
    /**
     * IGO map
     * \@internal
     * @return {?}
     */
    get map() {
        return (/** @type {?} */ (((/** @type {?} */ (this.component.map)))));
    }
    /**
     * Start listening to click and drag box events
     * \@internal
     * @return {?}
     */
    ngAfterViewInit() {
        this.listenToMapClick();
    }
    /**
     * Stop listening to click and drag box events and cancel ongoind requests
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.cancelOngoingQueries();
        this.unlistenToMapClick();
    }
    /**
     * On map click, issue queries
     * @private
     * @return {?}
     */
    listenToMapClick() {
        this.mapClickListener = this.map.ol.on('singleclick', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onMapEvent(event)));
    }
    /**
     * Stop listenig for map clicks
     * @private
     * @return {?}
     */
    unlistenToMapClick() {
        this.map.ol.un(this.mapClickListener.type, this.mapClickListener.listener);
        this.mapClickListener = undefined;
    }
    /**
     * Issue queries from a map event and emit events with the results
     * @private
     * @param {?} event OL map browser pointer event
     * @return {?}
     */
    onMapEvent(event) {
        this.cancelOngoingQueries();
        if (!this.queryService.queryEnabled) {
            return;
        }
        /** @type {?} */
        const queries$ = [];
        if (this.queryFeatures) {
            queries$.push(this.doQueryFeatures(event));
        }
        /** @type {?} */
        const resolution = this.map.ol.getView().getResolution();
        /** @type {?} */
        const queryLayers = this.map.layers.filter(layerIsQueryable);
        queries$.push(...this.queryService.query(queryLayers, {
            coordinates: event.coordinate,
            projection: this.map.projection,
            resolution
        }));
        if (queries$.length === 0) {
            return;
        }
        if (this.waitForAllQueries) {
            this.queries$$.push(zip(...queries$).subscribe((/**
             * @param {?} results
             * @return {?}
             */
            (results) => {
                /** @type {?} */
                const features = [].concat(...results);
                this.query.emit({ features, event });
            })));
        }
        else {
            this.queries$$ = queries$.map((/**
             * @param {?} query$
             * @return {?}
             */
            (query$) => {
                return query$.subscribe((/**
                 * @param {?} features
                 * @return {?}
                 */
                (features) => {
                    this.query.emit({ features, event });
                }));
            }));
        }
    }
    /**
     * Query features already present on the map
     * @private
     * @param {?} event OL map browser pointer event
     * @return {?}
     */
    doQueryFeatures(event) {
        /** @type {?} */
        const olFeatures = event.map.getFeaturesAtPixel(event.pixel, {
            hitTolerance: this.queryFeaturesHitTolerance || 0,
            layerFilter: this.queryFeaturesCondition ? this.queryFeaturesCondition : olLayerIsQueryable
        });
        /** @type {?} */
        const features = (olFeatures || []).map((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => {
            return featureFromOl(olFeature, this.map.projection);
        }));
        return of(features);
    }
    /**
     * Cancel ongoing requests, if any
     * @private
     * @return {?}
     */
    cancelOngoingQueries() {
        this.queries$$.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
        this.queries$$ = [];
    }
}
QueryDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoQuery]'
            },] }
];
/** @nocollapse */
QueryDirective.ctorParameters = () => [
    { type: MapBrowserComponent, decorators: [{ type: Self }] },
    { type: QueryService }
];
QueryDirective.propDecorators = {
    queryFeatures: [{ type: Input }],
    queryFeaturesHitTolerance: [{ type: Input }],
    queryFeaturesCondition: [{ type: Input }],
    waitForAllQueries: [{ type: Input }],
    query: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3F1ZXJ5L3NoYXJlZC9xdWVyeS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR1osSUFBSSxFQUNMLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBNEIsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVV6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUVsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBVXJFLE1BQU0sT0FBTyxjQUFjOzs7OztJQXlEekIsWUFDa0IsU0FBOEIsRUFDdEMsWUFBMEI7UUFEbEIsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQWM7Ozs7UUF2RDVCLGNBQVMsR0FBbUIsRUFBRSxDQUFDOzs7O1FBb0I5QixrQkFBYSxHQUFZLEtBQUssQ0FBQzs7OztRQUsvQiw4QkFBeUIsR0FBVyxDQUFDLENBQUM7Ozs7UUFVdEMsc0JBQWlCLEdBQVksSUFBSSxDQUFDOzs7O1FBS2pDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFHOUIsQ0FBQztJQWFGLENBQUM7Ozs7OztJQVBKLElBQUksR0FBRztRQUNMLE9BQU8sbUJBQUEsQ0FBQyxtQkFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBTyxDQUFDLEVBQVUsQ0FBQztJQUMvQyxDQUFDOzs7Ozs7SUFXRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGdCQUFnQixFQUFF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QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtTQUM1RixDQUFDOztjQUNJLFFBQVEsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxTQUFvQixFQUFFLEVBQUU7WUFDL0QsT0FBTyxhQUFhLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsQ0FBQyxFQUFDO1FBQ0YsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEIsQ0FBQzs7Ozs7O0lBS08sb0JBQW9CO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTzs7OztRQUFDLENBQUMsR0FBaUIsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7O1lBcEtGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTthQUN2Qjs7OztZQWJRLG1CQUFtQix1QkF3RXZCLElBQUk7WUFyRUEsWUFBWTs7OzRCQW1DbEIsS0FBSzt3Q0FLTCxLQUFLO3FDQUtMLEtBQUs7Z0NBS0wsS0FBSztvQkFLTCxNQUFNOzs7Ozs7OztJQXhDUCxtQ0FBdUM7Ozs7OztJQUt2QywwQ0FBMkM7Ozs7OztJQUszQyw4Q0FBbUQ7Ozs7OztJQUtuRCxvREFBMkM7Ozs7O0lBSzNDLHVDQUF3Qzs7Ozs7SUFLeEMsbURBQStDOzs7OztJQUsvQyxnREFBK0Q7Ozs7O0lBSy9ELDJDQUEyQzs7Ozs7SUFLM0MsK0JBR0s7Ozs7O0lBV0gsbUNBQThDOzs7OztJQUM5QyxzQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uRGVzdHJveSxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIFNlbGZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgb2YsIHppcCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IE9sTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvTGF5ZXInO1xyXG5cclxuaW1wb3J0IE9sRHJhZ0JveEludGVyYWN0aW9uIGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYWdCb3gnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyUG9pbnRlckV2ZW50IGFzIE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7IExpc3RlbmVyRnVuY3Rpb24gfSBmcm9tICdvbC9ldmVudHMnO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbWFwL21hcC1icm93c2VyL21hcC1icm93c2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBmZWF0dXJlRnJvbU9sIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS51dGlscyc7XHJcbmltcG9ydCB7IFF1ZXJ5U2VydmljZSB9IGZyb20gJy4vcXVlcnkuc2VydmljZSc7XHJcbmltcG9ydCB7IGxheWVySXNRdWVyeWFibGUsIG9sTGF5ZXJJc1F1ZXJ5YWJsZSB9IGZyb20gJy4vcXVlcnkudXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZGlyZWN0aXZlIG1ha2VzIGEgbWFwIHF1ZXJ5YWJsZSB3aXRoIGEgY2xpY2sgb2Ygd2l0aCBhIGRyYWcgYm94LlxyXG4gKiBCeSBkZWZhdWx0LCBhbGwgbGF5ZXJzIGFyZSBxdWVyeWFibGUgYnV0IHRoaXMgY25hIGJlbiBjb250cm9sbGVkIGF0XHJcbiAqIHRoZSBsYXllciBsZXZlbC5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb1F1ZXJ5XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFF1ZXJ5RGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb25zIHRvIG9uZ29pbmcgcXVlcmllc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcXVlcmllcyQkOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0ZW5lciB0byB0aGUgbWFwIGNsaWNrIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXBDbGlja0xpc3RlbmVyOiBMaXN0ZW5lckZ1bmN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBPTCBkcmFnIGJveCBpbnRlcmFjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgb2xEcmFnQm94SW50ZXJhY3Rpb246IE9sRHJhZ0JveEludGVyYWN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBPbCBkcmFnIGJveCBcImVuZFwiIGV2ZW50IGtleVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb2xEcmFnQm94SW50ZXJhY3Rpb25FbmRLZXk6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogV2h0ZXIgdG8gcXVlcnkgZmVhdHVyZXMgb3Igbm90XHJcbiAgICovXHJcbiAgQElucHV0KCkgcXVlcnlGZWF0dXJlczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBGZWF0dXJlIHF1ZXJ5IGhpdCB0b2xlcmFuY2VcclxuICAgKi9cclxuICBASW5wdXQoKSBxdWVyeUZlYXR1cmVzSGl0VG9sZXJhbmNlOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBGZWF0dXJlIHF1ZXJ5IGhpdCB0b2xlcmFuY2VcclxuICAgKi9cclxuICBASW5wdXQoKSBxdWVyeUZlYXR1cmVzQ29uZGl0aW9uOiAob2xMYXllcjogT2xMYXllcikgPT4gYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhbGwgcXVlcnkgc2hvdWxkIGNvbXBsZXRlIGJlZm9yZSBlbWl0dGluZyBhbiBldmVudFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdhaXRGb3JBbGxRdWVyaWVzOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgcXVlcnkgKG9yIGFsbCBxdWVyaWVzKSBjb21wbGV0ZVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBxdWVyeSA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgZmVhdHVyZXM6IEZlYXR1cmVbXSB8IEZlYXR1cmVbXVtdO1xyXG4gICAgZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudDtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBJR08gbWFwXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuICh0aGlzLmNvbXBvbmVudC5tYXAgYXMgYW55KSBhcyBJZ29NYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgcHJpdmF0ZSBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIHF1ZXJ5U2VydmljZTogUXVlcnlTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydCBsaXN0ZW5pbmcgdG8gY2xpY2sgYW5kIGRyYWcgYm94IGV2ZW50c1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBsaXN0ZW5pbmcgdG8gY2xpY2sgYW5kIGRyYWcgYm94IGV2ZW50cyBhbmQgY2FuY2VsIG9uZ29pbmQgcmVxdWVzdHNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2FuY2VsT25nb2luZ1F1ZXJpZXMoKTtcclxuICAgIHRoaXMudW5saXN0ZW5Ub01hcENsaWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBtYXAgY2xpY2ssIGlzc3VlIHF1ZXJpZXNcclxuICAgKi9cclxuICBwcml2YXRlIGxpc3RlblRvTWFwQ2xpY2soKSB7XHJcbiAgICB0aGlzLm1hcENsaWNrTGlzdGVuZXIgPSB0aGlzLm1hcC5vbC5vbihcclxuICAgICAgJ3NpbmdsZWNsaWNrJyxcclxuICAgICAgKGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpID0+IHRoaXMub25NYXBFdmVudChldmVudClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIGxpc3RlbmlnIGZvciBtYXAgY2xpY2tzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bmxpc3RlblRvTWFwQ2xpY2soKSB7XHJcbiAgICB0aGlzLm1hcC5vbC51bih0aGlzLm1hcENsaWNrTGlzdGVuZXIudHlwZSwgdGhpcy5tYXBDbGlja0xpc3RlbmVyLmxpc3RlbmVyKTtcclxuICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lciA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIElzc3VlIHF1ZXJpZXMgZnJvbSBhIG1hcCBldmVudCBhbmQgZW1pdCBldmVudHMgd2l0aCB0aGUgcmVzdWx0c1xyXG4gICAqIEBwYXJhbSBldmVudCBPTCBtYXAgYnJvd3NlciBwb2ludGVyIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1hcEV2ZW50KGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpIHtcclxuICAgIHRoaXMuY2FuY2VsT25nb2luZ1F1ZXJpZXMoKTtcclxuICAgIGlmICghdGhpcy5xdWVyeVNlcnZpY2UucXVlcnlFbmFibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBxdWVyaWVzJCA9IFtdO1xyXG4gICAgaWYgKHRoaXMucXVlcnlGZWF0dXJlcykge1xyXG4gICAgICBxdWVyaWVzJC5wdXNoKHRoaXMuZG9RdWVyeUZlYXR1cmVzKGV2ZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzb2x1dGlvbiA9IHRoaXMubWFwLm9sLmdldFZpZXcoKS5nZXRSZXNvbHV0aW9uKCk7XHJcbiAgICBjb25zdCBxdWVyeUxheWVycyA9IHRoaXMubWFwLmxheWVycy5maWx0ZXIobGF5ZXJJc1F1ZXJ5YWJsZSk7XHJcbiAgICBxdWVyaWVzJC5wdXNoKC4uLnRoaXMucXVlcnlTZXJ2aWNlLnF1ZXJ5KHF1ZXJ5TGF5ZXJzLCB7XHJcbiAgICAgIGNvb3JkaW5hdGVzOiBldmVudC5jb29yZGluYXRlLFxyXG4gICAgICBwcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICByZXNvbHV0aW9uXHJcbiAgICB9KSk7XHJcblxyXG4gICAgaWYgKHF1ZXJpZXMkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMud2FpdEZvckFsbFF1ZXJpZXMpIHtcclxuICAgICAgdGhpcy5xdWVyaWVzJCQucHVzaChcclxuICAgICAgICB6aXAoLi4ucXVlcmllcyQpLnN1YnNjcmliZSgocmVzdWx0czogRmVhdHVyZVtdW10pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZlYXR1cmVzID0gW10uY29uY2F0KC4uLnJlc3VsdHMpO1xyXG4gICAgICAgICAgdGhpcy5xdWVyeS5lbWl0KHsgZmVhdHVyZXMsIGV2ZW50IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnF1ZXJpZXMkJCA9IHF1ZXJpZXMkLm1hcCgocXVlcnkkOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT4pID0+IHtcclxuICAgICAgICByZXR1cm4gcXVlcnkkLnN1YnNjcmliZSgoZmVhdHVyZXM6IEZlYXR1cmVbXSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5xdWVyeS5lbWl0KHsgZmVhdHVyZXMsIGV2ZW50IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFF1ZXJ5IGZlYXR1cmVzIGFscmVhZHkgcHJlc2VudCBvbiB0aGUgbWFwXHJcbiAgICogQHBhcmFtIGV2ZW50IE9MIG1hcCBicm93c2VyIHBvaW50ZXIgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGRvUXVlcnlGZWF0dXJlcyhldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KTogT2JzZXJ2YWJsZTxGZWF0dXJlW10+IHtcclxuICAgIGNvbnN0IG9sRmVhdHVyZXMgPSBldmVudC5tYXAuZ2V0RmVhdHVyZXNBdFBpeGVsKGV2ZW50LnBpeGVsLCB7XHJcbiAgICAgIGhpdFRvbGVyYW5jZTogdGhpcy5xdWVyeUZlYXR1cmVzSGl0VG9sZXJhbmNlIHx8IDAsXHJcbiAgICAgIGxheWVyRmlsdGVyOiB0aGlzLnF1ZXJ5RmVhdHVyZXNDb25kaXRpb24gPyB0aGlzLnF1ZXJ5RmVhdHVyZXNDb25kaXRpb24gOiBvbExheWVySXNRdWVyeWFibGVcclxuICAgIH0pO1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSAob2xGZWF0dXJlcyB8fCBbXSkubWFwKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICByZXR1cm4gZmVhdHVyZUZyb21PbChvbEZlYXR1cmUsIHRoaXMubWFwLnByb2plY3Rpb24pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gb2YoZmVhdHVyZXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FuY2VsIG9uZ29pbmcgcmVxdWVzdHMsIGlmIGFueVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2FuY2VsT25nb2luZ1F1ZXJpZXMoKSB7XHJcbiAgICB0aGlzLnF1ZXJpZXMkJC5mb3JFYWNoKChzdWI6IFN1YnNjcmlwdGlvbikgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgdGhpcy5xdWVyaWVzJCQgPSBbXTtcclxuICB9XHJcbn1cclxuIl19