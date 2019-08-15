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
        let feature;
        /** @type {?} */
        const clickedFeatures = [];
        this.map.ol.forEachFeatureAtPixel(event.pixel, (/**
         * @param {?} featureOL
         * @param {?} layerOL
         * @return {?}
         */
        (featureOL, layerOL) => {
            if (featureOL) {
                if (featureOL.get('features')) {
                    featureOL = featureOL.get('features')[0];
                }
                feature = featureFromOl(featureOL, this.map.projection, layerOL);
                clickedFeatures.push(feature);
            }
            else {
                feature = featureFromOl(featureOL, this.map.projection, layerOL);
                clickedFeatures.push(feature);
            }
        }), {
            hitTolerance: this.queryFeaturesHitTolerance || 0,
            layerFilter: this.queryFeaturesCondition ? this.queryFeaturesCondition : olLayerIsQueryable
        });
        return of(clickedFeatures);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3F1ZXJ5L3NoYXJlZC9xdWVyeS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR1osSUFBSSxFQUNMLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBNEIsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVV6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUVsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBVXJFLE1BQU0sT0FBTyxjQUFjOzs7OztJQXlEekIsWUFDa0IsU0FBOEIsRUFDdEMsWUFBMEI7UUFEbEIsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQWM7Ozs7UUF2RDVCLGNBQVMsR0FBbUIsRUFBRSxDQUFDOzs7O1FBb0I5QixrQkFBYSxHQUFZLEtBQUssQ0FBQzs7OztRQUsvQiw4QkFBeUIsR0FBVyxDQUFDLENBQUM7Ozs7UUFVdEMsc0JBQWlCLEdBQVksSUFBSSxDQUFDOzs7O1FBS2pDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFHOUIsQ0FBQztJQWFGLENBQUM7Ozs7OztJQVBKLElBQUksR0FBRztRQUNMLE9BQU8sbUJBQUEsQ0FBQyxtQkFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBTyxDQUFDLEVBQVUsQ0FBQztJQUMvQyxDQUFDOzs7Ozs7SUFXRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGdCQUFnQixFQUFF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S0wsTUFBTTs7Ozs7Ozs7SUF4Q1AsbUNBQXVDOzs7Ozs7SUFLdkMsMENBQTJDOzs7Ozs7SUFLM0MsOENBQW1EOzs7Ozs7SUFLbkQsb0RBQTJDOzs7OztJQUszQyx1Q0FBd0M7Ozs7O0lBS3hDLG1EQUErQzs7Ozs7SUFLL0MsZ0RBQStEOzs7OztJQUsvRCwyQ0FBMkM7Ozs7O0lBSzNDLCtCQUdLOzs7OztJQVdILG1DQUE4Qzs7Ozs7SUFDOUMsc0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkRlc3Ryb3ksXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBTZWxmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG9mLCB6aXAgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbExheWVyIGZyb20gJ29sL2xheWVyL0xheWVyJztcclxuXHJcbmltcG9ydCBPbERyYWdCb3hJbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmFnQm94JztcclxuaW1wb3J0IHsgTWFwQnJvd3NlclBvaW50ZXJFdmVudCBhcyBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQgfSBmcm9tICdvbC9NYXBCcm93c2VyRXZlbnQnO1xyXG5pbXBvcnQgeyBMaXN0ZW5lckZ1bmN0aW9uIH0gZnJvbSAnb2wvZXZlbnRzJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgTWFwQnJvd3NlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL21hcC9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgZmVhdHVyZUZyb21PbCB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUudXRpbHMnO1xyXG5pbXBvcnQgeyBRdWVyeVNlcnZpY2UgfSBmcm9tICcuL3F1ZXJ5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBsYXllcklzUXVlcnlhYmxlLCBvbExheWVySXNRdWVyeWFibGUgfSBmcm9tICcuL3F1ZXJ5LnV0aWxzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGRpcmVjdGl2ZSBtYWtlcyBhIG1hcCBxdWVyeWFibGUgd2l0aCBhIGNsaWNrIG9mIHdpdGggYSBkcmFnIGJveC5cclxuICogQnkgZGVmYXVsdCwgYWxsIGxheWVycyBhcmUgcXVlcnlhYmxlIGJ1dCB0aGlzIGNuYSBiZW4gY29udHJvbGxlZCBhdFxyXG4gKiB0aGUgbGF5ZXIgbGV2ZWwuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29RdWVyeV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBRdWVyeURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9ucyB0byBvbmdvaW5nIHF1ZXJpZXNcclxuICAgKi9cclxuICBwcml2YXRlIHF1ZXJpZXMkJDogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVuZXIgdG8gdGhlIG1hcCBjbGljayBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbWFwQ2xpY2tMaXN0ZW5lcjogTGlzdGVuZXJGdW5jdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogT0wgZHJhZyBib3ggaW50ZXJhY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIG9sRHJhZ0JveEludGVyYWN0aW9uOiBPbERyYWdCb3hJbnRlcmFjdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2wgZHJhZyBib3ggXCJlbmRcIiBldmVudCBrZXlcclxuICAgKi9cclxuICBwcml2YXRlIG9sRHJhZ0JveEludGVyYWN0aW9uRW5kS2V5OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdodGVyIHRvIHF1ZXJ5IGZlYXR1cmVzIG9yIG5vdFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHF1ZXJ5RmVhdHVyZXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRmVhdHVyZSBxdWVyeSBoaXQgdG9sZXJhbmNlXHJcbiAgICovXHJcbiAgQElucHV0KCkgcXVlcnlGZWF0dXJlc0hpdFRvbGVyYW5jZTogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogRmVhdHVyZSBxdWVyeSBoaXQgdG9sZXJhbmNlXHJcbiAgICovXHJcbiAgQElucHV0KCkgcXVlcnlGZWF0dXJlc0NvbmRpdGlvbjogKG9sTGF5ZXI6IE9sTGF5ZXIpID0+IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYWxsIHF1ZXJ5IHNob3VsZCBjb21wbGV0ZSBiZWZvcmUgZW1pdHRpbmcgYW4gZXZlbnRcclxuICAgKi9cclxuICBASW5wdXQoKSB3YWl0Rm9yQWxsUXVlcmllczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHF1ZXJ5IChvciBhbGwgcXVlcmllcykgY29tcGxldGVcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcXVlcnkgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGZlYXR1cmVzOiBGZWF0dXJlW10gfCBGZWF0dXJlW11bXTtcclxuICAgIGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQ7XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogSUdPIG1hcFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiAodGhpcy5jb21wb25lbnQubWFwIGFzIGFueSkgYXMgSWdvTWFwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIHByaXZhdGUgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBxdWVyeVNlcnZpY2U6IFF1ZXJ5U2VydmljZVxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgbGlzdGVuaW5nIHRvIGNsaWNrIGFuZCBkcmFnIGJveCBldmVudHNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLmxpc3RlblRvTWFwQ2xpY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgbGlzdGVuaW5nIHRvIGNsaWNrIGFuZCBkcmFnIGJveCBldmVudHMgYW5kIGNhbmNlbCBvbmdvaW5kIHJlcXVlc3RzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNhbmNlbE9uZ29pbmdRdWVyaWVzKCk7XHJcbiAgICB0aGlzLnVubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gbWFwIGNsaWNrLCBpc3N1ZSBxdWVyaWVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaXN0ZW5Ub01hcENsaWNrKCkge1xyXG4gICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyID0gdGhpcy5tYXAub2wub24oXHJcbiAgICAgICdzaW5nbGVjbGljaycsXHJcbiAgICAgIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB0aGlzLm9uTWFwRXZlbnQoZXZlbnQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBsaXN0ZW5pZyBmb3IgbWFwIGNsaWNrc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5saXN0ZW5Ub01hcENsaWNrKCkge1xyXG4gICAgdGhpcy5tYXAub2wudW4odGhpcy5tYXBDbGlja0xpc3RlbmVyLnR5cGUsIHRoaXMubWFwQ2xpY2tMaXN0ZW5lci5saXN0ZW5lcik7XHJcbiAgICB0aGlzLm1hcENsaWNrTGlzdGVuZXIgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJc3N1ZSBxdWVyaWVzIGZyb20gYSBtYXAgZXZlbnQgYW5kIGVtaXQgZXZlbnRzIHdpdGggdGhlIHJlc3VsdHNcclxuICAgKiBAcGFyYW0gZXZlbnQgT0wgbWFwIGJyb3dzZXIgcG9pbnRlciBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25NYXBFdmVudChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSB7XHJcbiAgICB0aGlzLmNhbmNlbE9uZ29pbmdRdWVyaWVzKCk7XHJcbiAgICBpZiAoIXRoaXMucXVlcnlTZXJ2aWNlLnF1ZXJ5RW5hYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcXVlcmllcyQgPSBbXTtcclxuICAgIGlmICh0aGlzLnF1ZXJ5RmVhdHVyZXMpIHtcclxuICAgICAgcXVlcmllcyQucHVzaCh0aGlzLmRvUXVlcnlGZWF0dXJlcyhldmVudCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc29sdXRpb24gPSB0aGlzLm1hcC5vbC5nZXRWaWV3KCkuZ2V0UmVzb2x1dGlvbigpO1xyXG4gICAgY29uc3QgcXVlcnlMYXllcnMgPSB0aGlzLm1hcC5sYXllcnMuZmlsdGVyKGxheWVySXNRdWVyeWFibGUpO1xyXG4gICAgcXVlcmllcyQucHVzaCguLi50aGlzLnF1ZXJ5U2VydmljZS5xdWVyeShxdWVyeUxheWVycywge1xyXG4gICAgICBjb29yZGluYXRlczogZXZlbnQuY29vcmRpbmF0ZSxcclxuICAgICAgcHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgcmVzb2x1dGlvblxyXG4gICAgfSkpO1xyXG5cclxuICAgIGlmIChxdWVyaWVzJC5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLndhaXRGb3JBbGxRdWVyaWVzKSB7XHJcbiAgICAgIHRoaXMucXVlcmllcyQkLnB1c2goXHJcbiAgICAgICAgemlwKC4uLnF1ZXJpZXMkKS5zdWJzY3JpYmUoKHJlc3VsdHM6IEZlYXR1cmVbXVtdKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmZWF0dXJlcyA9IFtdLmNvbmNhdCguLi5yZXN1bHRzKTtcclxuICAgICAgICAgIHRoaXMucXVlcnkuZW1pdCh7IGZlYXR1cmVzLCBldmVudCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5xdWVyaWVzJCQgPSBxdWVyaWVzJC5tYXAoKHF1ZXJ5JDogT2JzZXJ2YWJsZTxGZWF0dXJlW10+KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHF1ZXJ5JC5zdWJzY3JpYmUoKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHtcclxuICAgICAgICAgIHRoaXMucXVlcnkuZW1pdCh7IGZlYXR1cmVzLCBldmVudCB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBRdWVyeSBmZWF0dXJlcyBhbHJlYWR5IHByZXNlbnQgb24gdGhlIG1hcFxyXG4gICAqIEBwYXJhbSBldmVudCBPTCBtYXAgYnJvd3NlciBwb2ludGVyIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkb1F1ZXJ5RmVhdHVyZXMoZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCk6IE9ic2VydmFibGU8RmVhdHVyZVtdPiB7XHJcblxyXG4gICAgbGV0IGZlYXR1cmU7XHJcbiAgICBjb25zdCBjbGlja2VkRmVhdHVyZXMgPSBbXTtcclxuXHJcbiAgICB0aGlzLm1hcC5vbC5mb3JFYWNoRmVhdHVyZUF0UGl4ZWwoXHJcbiAgICAgIGV2ZW50LnBpeGVsLFxyXG4gICAgICAoZmVhdHVyZU9MOiBPbEZlYXR1cmUsIGxheWVyT0w6IE9sTGF5ZXIpID0+IHtcclxuICAgICAgICBpZiAoZmVhdHVyZU9MKSB7XHJcbiAgICAgICAgICBpZiAoZmVhdHVyZU9MLmdldCgnZmVhdHVyZXMnKSkge1xyXG4gICAgICAgICAgICBmZWF0dXJlT0wgPSBmZWF0dXJlT0wuZ2V0KCdmZWF0dXJlcycpWzBdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZmVhdHVyZSA9IGZlYXR1cmVGcm9tT2woZmVhdHVyZU9MLCB0aGlzLm1hcC5wcm9qZWN0aW9uLCBsYXllck9MKTtcclxuICAgICAgICAgIGNsaWNrZWRGZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZmVhdHVyZSA9IGZlYXR1cmVGcm9tT2woZmVhdHVyZU9MLCB0aGlzLm1hcC5wcm9qZWN0aW9uLCBsYXllck9MKTtcclxuICAgICAgICAgIGNsaWNrZWRGZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgIHtcclxuICAgICAgaGl0VG9sZXJhbmNlOiB0aGlzLnF1ZXJ5RmVhdHVyZXNIaXRUb2xlcmFuY2UgfHwgMCxcclxuICAgICAgbGF5ZXJGaWx0ZXI6IHRoaXMucXVlcnlGZWF0dXJlc0NvbmRpdGlvbiA/IHRoaXMucXVlcnlGZWF0dXJlc0NvbmRpdGlvbiA6IG9sTGF5ZXJJc1F1ZXJ5YWJsZVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG9mKGNsaWNrZWRGZWF0dXJlcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYW5jZWwgb25nb2luZyByZXF1ZXN0cywgaWYgYW55XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjYW5jZWxPbmdvaW5nUXVlcmllcygpIHtcclxuICAgIHRoaXMucXVlcmllcyQkLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XHJcbiAgICB0aGlzLnF1ZXJpZXMkJCA9IFtdO1xyXG4gIH1cclxufVxyXG4iXX0=