/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
     * Stop listening for map clicks
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
        const clickedFeatures = [];
        this.map.ol.forEachFeatureAtPixel(event.pixel, (/**
         * @param {?} featureOL
         * @param {?} layerOL
         * @return {?}
         */
        (featureOL, layerOL) => {
            if (featureOL) {
                if (featureOL.get('features')) {
                    for (const feature of featureOL.get('features')) {
                        /** @type {?} */
                        const newFeature = featureFromOl(feature, this.map.projection);
                        newFeature.meta = {
                            title: feature.values_.nom,
                            id: feature.id_,
                            icon: feature.values_._icon,
                            sourceTitle: layerOL.values_.title
                        };
                        clickedFeatures.push(newFeature);
                    }
                }
                else if (featureOL instanceof OlRenderFeature) {
                    /** @type {?} */
                    const featureFromRender = featureOL;
                    /** @type {?} */
                    const feature = renderFeatureFromOl(featureOL, this.map.projection, layerOL);
                    clickedFeatures.push(feature);
                }
                else {
                    /** @type {?} */
                    const feature = featureFromOl(featureOL, this.map.projection, layerOL);
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
        const queryableLayers = this.map.layers.filter(layerIsQueryable);
        clickedFeatures.forEach((/**
         * @param {?} feature
         * @return {?}
         */
        (feature) => {
            queryableLayers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => {
                if (typeof layer.ol.getSource().hasFeature !== 'undefined') {
                    if (layer.ol.getSource().hasFeature(feature.ol)) {
                        (feature.meta.id = feature.ol._id),
                            (feature.meta.alias = this.queryService.getAllowedFieldsAndAlias(layer));
                        feature.meta.title =
                            feature.meta.title ||
                                this.queryService.getQueryTitle(feature, layer);
                        feature.meta.sourceTitle = layer.title;
                    }
                }
            }));
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3F1ZXJ5L3NoYXJlZC9xdWVyeS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR1osSUFBSSxFQUNMLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBNEIsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd6RCxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQVFoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUVsRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBV3JFLE1BQU0sT0FBTyxjQUFjOzs7OztJQXlEekIsWUFDa0IsU0FBOEIsRUFDdEMsWUFBMEI7UUFEbEIsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQWM7Ozs7UUF2RDVCLGNBQVMsR0FBbUIsRUFBRSxDQUFDOzs7O1FBb0I5QixrQkFBYSxHQUFZLEtBQUssQ0FBQzs7OztRQUsvQiw4QkFBeUIsR0FBVyxDQUFDLENBQUM7Ozs7UUFVdEMsc0JBQWlCLEdBQVksSUFBSSxDQUFDOzs7O1FBS2pDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFHOUIsQ0FBQztJQWFGLENBQUM7Ozs7OztJQVBKLElBQUksR0FBRztRQUNMLE9BQU8sbUJBQUEsQ0FBQyxtQkFBQSxJQUFJLENBQUMsU0FBUyxDQUFD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U0FBUyxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLEdBQWlCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7OztZQTlORixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7YUFDdkI7Ozs7WUFmUSxtQkFBbUIsdUJBMEV2QixJQUFJO1lBdEVBLFlBQVk7Ozs0QkFvQ2xCLEtBQUs7d0NBS0wsS0FBSztxQ0FLTCxLQUFLO2dDQUtMLEtBQUs7b0JBS0wsTUFBTTs7Ozs7Ozs7SUF4Q1AsbUNBQXVDOzs7Ozs7SUFLdkMsMENBQTJDOzs7Ozs7SUFLM0MsOENBQW1EOzs7Ozs7SUFLbkQsb0RBQTJDOzs7OztJQUszQyx1Q0FBd0M7Ozs7O0lBS3hDLG1EQUErQzs7Ozs7SUFLL0MsZ0RBQStEOzs7OztJQUsvRCwyQ0FBMkM7Ozs7O0lBSzNDLCtCQUdLOzs7OztJQVdILG1DQUE4Qzs7Ozs7SUFDOUMsc0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0RW50aXR5VGl0bGUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uRGVzdHJveSxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIFNlbGZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgb2YsIHppcCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IE9sUmVuZGVyRmVhdHVyZSBmcm9tICdvbC9yZW5kZXIvRmVhdHVyZSc7XHJcbmltcG9ydCBPbExheWVyIGZyb20gJ29sL2xheWVyL0xheWVyJztcclxuXHJcbmltcG9ydCBPbERyYWdCb3hJbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmFnQm94JztcclxuaW1wb3J0IHsgTWFwQnJvd3NlclBvaW50ZXJFdmVudCBhcyBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQgfSBmcm9tICdvbC9NYXBCcm93c2VyRXZlbnQnO1xyXG5pbXBvcnQgeyBMaXN0ZW5lckZ1bmN0aW9uIH0gZnJvbSAnb2wvZXZlbnRzJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgTWFwQnJvd3NlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL21hcC9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgcmVuZGVyRmVhdHVyZUZyb21PbCB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUudXRpbHMnO1xyXG5pbXBvcnQgeyBmZWF0dXJlRnJvbU9sIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS51dGlscyc7XHJcbmltcG9ydCB7IFF1ZXJ5U2VydmljZSB9IGZyb20gJy4vcXVlcnkuc2VydmljZSc7XHJcbmltcG9ydCB7IGxheWVySXNRdWVyeWFibGUsIG9sTGF5ZXJJc1F1ZXJ5YWJsZSB9IGZyb20gJy4vcXVlcnkudXRpbHMnO1xyXG5pbXBvcnQgeyBBbnlMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvYW55LWxheWVyJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGRpcmVjdGl2ZSBtYWtlcyBhIG1hcCBxdWVyeWFibGUgd2l0aCBhIGNsaWNrIG9mIHdpdGggYSBkcmFnIGJveC5cclxuICogQnkgZGVmYXVsdCwgYWxsIGxheWVycyBhcmUgcXVlcnlhYmxlIGJ1dCB0aGlzIGNhbiBiZW4gY29udHJvbGxlZCBhdFxyXG4gKiB0aGUgbGF5ZXIgbGV2ZWwuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29RdWVyeV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBRdWVyeURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9ucyB0byBvbmdvaW5nIHF1ZXJpZXNcclxuICAgKi9cclxuICBwcml2YXRlIHF1ZXJpZXMkJDogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVuZXIgdG8gdGhlIG1hcCBjbGljayBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbWFwQ2xpY2tMaXN0ZW5lcjogTGlzdGVuZXJGdW5jdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogT0wgZHJhZyBib3ggaW50ZXJhY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIG9sRHJhZ0JveEludGVyYWN0aW9uOiBPbERyYWdCb3hJbnRlcmFjdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2wgZHJhZyBib3ggXCJlbmRcIiBldmVudCBrZXlcclxuICAgKi9cclxuICBwcml2YXRlIG9sRHJhZ0JveEludGVyYWN0aW9uRW5kS2V5OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdodGVyIHRvIHF1ZXJ5IGZlYXR1cmVzIG9yIG5vdFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHF1ZXJ5RmVhdHVyZXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRmVhdHVyZSBxdWVyeSBoaXQgdG9sZXJhbmNlXHJcbiAgICovXHJcbiAgQElucHV0KCkgcXVlcnlGZWF0dXJlc0hpdFRvbGVyYW5jZTogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogRmVhdHVyZSBxdWVyeSBoaXQgdG9sZXJhbmNlXHJcbiAgICovXHJcbiAgQElucHV0KCkgcXVlcnlGZWF0dXJlc0NvbmRpdGlvbjogKG9sTGF5ZXI6IE9sTGF5ZXIpID0+IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYWxsIHF1ZXJ5IHNob3VsZCBjb21wbGV0ZSBiZWZvcmUgZW1pdHRpbmcgYW4gZXZlbnRcclxuICAgKi9cclxuICBASW5wdXQoKSB3YWl0Rm9yQWxsUXVlcmllczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHF1ZXJ5IChvciBhbGwgcXVlcmllcykgY29tcGxldGVcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcXVlcnkgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGZlYXR1cmVzOiBGZWF0dXJlW10gfCBGZWF0dXJlW11bXTtcclxuICAgIGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQ7XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogSUdPIG1hcFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiAodGhpcy5jb21wb25lbnQubWFwIGFzIGFueSkgYXMgSWdvTWFwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIHByaXZhdGUgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBxdWVyeVNlcnZpY2U6IFF1ZXJ5U2VydmljZVxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgbGlzdGVuaW5nIHRvIGNsaWNrIGFuZCBkcmFnIGJveCBldmVudHNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLmxpc3RlblRvTWFwQ2xpY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgbGlzdGVuaW5nIHRvIGNsaWNrIGFuZCBkcmFnIGJveCBldmVudHMgYW5kIGNhbmNlbCBvbmdvaW5kIHJlcXVlc3RzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNhbmNlbE9uZ29pbmdRdWVyaWVzKCk7XHJcbiAgICB0aGlzLnVubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gbWFwIGNsaWNrLCBpc3N1ZSBxdWVyaWVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaXN0ZW5Ub01hcENsaWNrKCkge1xyXG4gICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyID0gdGhpcy5tYXAub2wub24oXHJcbiAgICAgICdzaW5nbGVjbGljaycsXHJcbiAgICAgIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB0aGlzLm9uTWFwRXZlbnQoZXZlbnQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBsaXN0ZW5pbmcgZm9yIG1hcCBjbGlja3NcclxuICAgKi9cclxuICBwcml2YXRlIHVubGlzdGVuVG9NYXBDbGljaygpIHtcclxuICAgIHRoaXMubWFwLm9sLnVuKHRoaXMubWFwQ2xpY2tMaXN0ZW5lci50eXBlLCB0aGlzLm1hcENsaWNrTGlzdGVuZXIubGlzdGVuZXIpO1xyXG4gICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSXNzdWUgcXVlcmllcyBmcm9tIGEgbWFwIGV2ZW50IGFuZCBlbWl0IGV2ZW50cyB3aXRoIHRoZSByZXN1bHRzXHJcbiAgICogQHBhcmFtIGV2ZW50IE9MIG1hcCBicm93c2VyIHBvaW50ZXIgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uTWFwRXZlbnQoZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkge1xyXG4gICAgdGhpcy5jYW5jZWxPbmdvaW5nUXVlcmllcygpO1xyXG4gICAgaWYgKCF0aGlzLnF1ZXJ5U2VydmljZS5xdWVyeUVuYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHF1ZXJpZXMkID0gW107XHJcbiAgICBpZiAodGhpcy5xdWVyeUZlYXR1cmVzKSB7XHJcbiAgICAgIHF1ZXJpZXMkLnB1c2godGhpcy5kb1F1ZXJ5RmVhdHVyZXMoZXZlbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNvbHV0aW9uID0gdGhpcy5tYXAub2wuZ2V0VmlldygpLmdldFJlc29sdXRpb24oKTtcclxuICAgIGNvbnN0IHF1ZXJ5TGF5ZXJzID0gdGhpcy5tYXAubGF5ZXJzLmZpbHRlcihsYXllcklzUXVlcnlhYmxlKTtcclxuICAgIHF1ZXJpZXMkLnB1c2goXHJcbiAgICAgIC4uLnRoaXMucXVlcnlTZXJ2aWNlLnF1ZXJ5KHF1ZXJ5TGF5ZXJzLCB7XHJcbiAgICAgICAgY29vcmRpbmF0ZXM6IGV2ZW50LmNvb3JkaW5hdGUsXHJcbiAgICAgICAgcHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgICByZXNvbHV0aW9uXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChxdWVyaWVzJC5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLndhaXRGb3JBbGxRdWVyaWVzKSB7XHJcbiAgICAgIHRoaXMucXVlcmllcyQkLnB1c2goXHJcbiAgICAgICAgemlwKC4uLnF1ZXJpZXMkKS5zdWJzY3JpYmUoKHJlc3VsdHM6IEZlYXR1cmVbXVtdKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmZWF0dXJlcyA9IFtdLmNvbmNhdCguLi5yZXN1bHRzKTtcclxuICAgICAgICAgIHRoaXMucXVlcnkuZW1pdCh7IGZlYXR1cmVzLCBldmVudCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5xdWVyaWVzJCQgPSBxdWVyaWVzJC5tYXAoKHF1ZXJ5JDogT2JzZXJ2YWJsZTxGZWF0dXJlW10+KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHF1ZXJ5JC5zdWJzY3JpYmUoKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHtcclxuICAgICAgICAgIHRoaXMucXVlcnkuZW1pdCh7IGZlYXR1cmVzLCBldmVudCB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBRdWVyeSBmZWF0dXJlcyBhbHJlYWR5IHByZXNlbnQgb24gdGhlIG1hcFxyXG4gICAqIEBwYXJhbSBldmVudCBPTCBtYXAgYnJvd3NlciBwb2ludGVyIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkb1F1ZXJ5RmVhdHVyZXMoXHJcbiAgICBldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50XHJcbiAgKTogT2JzZXJ2YWJsZTxGZWF0dXJlW10+IHtcclxuICAgIGNvbnN0IGNsaWNrZWRGZWF0dXJlcyA9IFtdO1xyXG5cclxuICAgIHRoaXMubWFwLm9sLmZvckVhY2hGZWF0dXJlQXRQaXhlbChcclxuICAgICAgZXZlbnQucGl4ZWwsXHJcbiAgICAgIChmZWF0dXJlT0w6IE9sRmVhdHVyZSwgbGF5ZXJPTDogT2xMYXllcikgPT4ge1xyXG4gICAgICAgIGlmIChmZWF0dXJlT0wpIHtcclxuICAgICAgICAgIGlmIChmZWF0dXJlT0wuZ2V0KCdmZWF0dXJlcycpKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmVhdHVyZSBvZiBmZWF0dXJlT0wuZ2V0KCdmZWF0dXJlcycpKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgbmV3RmVhdHVyZSA9IGZlYXR1cmVGcm9tT2woZmVhdHVyZSwgdGhpcy5tYXAucHJvamVjdGlvbik7XHJcbiAgICAgICAgICAgICAgbmV3RmVhdHVyZS5tZXRhID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGZlYXR1cmUudmFsdWVzXy5ub20sXHJcbiAgICAgICAgICAgICAgICBpZDogZmVhdHVyZS5pZF8sXHJcbiAgICAgICAgICAgICAgICBpY29uOiBmZWF0dXJlLnZhbHVlc18uX2ljb24sXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VUaXRsZTogbGF5ZXJPTC52YWx1ZXNfLnRpdGxlXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICBjbGlja2VkRmVhdHVyZXMucHVzaChuZXdGZWF0dXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChmZWF0dXJlT0wgaW5zdGFuY2VvZiBPbFJlbmRlckZlYXR1cmUpIHtcclxuICAgICAgICAgICAgY29uc3QgZmVhdHVyZUZyb21SZW5kZXI6IE9sRmVhdHVyZSA9IGZlYXR1cmVPTDtcclxuICAgICAgICAgICAgY29uc3QgZmVhdHVyZSA9IHJlbmRlckZlYXR1cmVGcm9tT2woXHJcbiAgICAgICAgICAgICAgZmVhdHVyZU9MLFxyXG4gICAgICAgICAgICAgIHRoaXMubWFwLnByb2plY3Rpb24sXHJcbiAgICAgICAgICAgICAgbGF5ZXJPTFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjbGlja2VkRmVhdHVyZXMucHVzaChmZWF0dXJlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZlYXR1cmUgPSBmZWF0dXJlRnJvbU9sKFxyXG4gICAgICAgICAgICAgIGZlYXR1cmVPTCxcclxuICAgICAgICAgICAgICB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICAgICAgICAgIGxheWVyT0xcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY2xpY2tlZEZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaGl0VG9sZXJhbmNlOiB0aGlzLnF1ZXJ5RmVhdHVyZXNIaXRUb2xlcmFuY2UgfHwgMCxcclxuICAgICAgICBsYXllckZpbHRlcjogdGhpcy5xdWVyeUZlYXR1cmVzQ29uZGl0aW9uXHJcbiAgICAgICAgICA/IHRoaXMucXVlcnlGZWF0dXJlc0NvbmRpdGlvblxyXG4gICAgICAgICAgOiBvbExheWVySXNRdWVyeWFibGVcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBxdWVyeWFibGVMYXllcnMgPSB0aGlzLm1hcC5sYXllcnMuZmlsdGVyKGxheWVySXNRdWVyeWFibGUpO1xyXG4gICAgY2xpY2tlZEZlYXR1cmVzLmZvckVhY2goKGZlYXR1cmU6IEZlYXR1cmUpID0+IHtcclxuICAgICAgcXVlcnlhYmxlTGF5ZXJzLmZvckVhY2goKGxheWVyOiBBbnlMYXllcikgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbGF5ZXIub2wuZ2V0U291cmNlKCkuaGFzRmVhdHVyZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIGlmIChsYXllci5vbC5nZXRTb3VyY2UoKS5oYXNGZWF0dXJlKGZlYXR1cmUub2wpKSB7XHJcbiAgICAgICAgICAgIChmZWF0dXJlLm1ldGEuaWQgPSBmZWF0dXJlLm9sLl9pZCksXHJcbiAgICAgICAgICAgICAgKGZlYXR1cmUubWV0YS5hbGlhcyA9IHRoaXMucXVlcnlTZXJ2aWNlLmdldEFsbG93ZWRGaWVsZHNBbmRBbGlhcyhcclxuICAgICAgICAgICAgICAgIGxheWVyXHJcbiAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIGZlYXR1cmUubWV0YS50aXRsZSA9XHJcbiAgICAgICAgICAgICAgZmVhdHVyZS5tZXRhLnRpdGxlIHx8XHJcbiAgICAgICAgICAgICAgdGhpcy5xdWVyeVNlcnZpY2UuZ2V0UXVlcnlUaXRsZShmZWF0dXJlLCBsYXllcik7XHJcbiAgICAgICAgICAgIGZlYXR1cmUubWV0YS5zb3VyY2VUaXRsZSA9IGxheWVyLnRpdGxlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gb2YoY2xpY2tlZEZlYXR1cmVzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbmNlbCBvbmdvaW5nIHJlcXVlc3RzLCBpZiBhbnlcclxuICAgKi9cclxuICBwcml2YXRlIGNhbmNlbE9uZ29pbmdRdWVyaWVzKCkge1xyXG4gICAgdGhpcy5xdWVyaWVzJCQuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcclxuICAgIHRoaXMucXVlcmllcyQkID0gW107XHJcbiAgfVxyXG59XHJcbiJdfQ==