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
        console.log(queries$);
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
                console.log(results);
                console.log(features);
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
                    console.log(features);
                    this.query.emit({ features, event });
                }));
            }));
        }
        console.log(this.queries$$);
        console.log(this.query);
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
        let featuresTileCoverage;
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
                    console.log(featureOL);
                    if (featureOL.length > 1) {
                        return;
                    }
                }
                feature = featureFromOl(featureOL, this.map.projection, layerOL);
                clickedFeatures.push(feature);
                console.log(layerOL);
                if (feature.meta.typeSource === 'mvt') {
                    /** @type {?} */
                    const sameDataTileFeatures = this.sameDataTilesFeature(feature, layerOL);
                    for (const sameDataTileFeature of sameDataTileFeatures) {
                        featuresTileCoverage = featureFromOl(sameDataTileFeature, this.map.projection);
                        clickedFeatures.push(featuresTileCoverage);
                    }
                }
            }
            else {
                feature = featureFromOl(featureOL, this.map.projection, layerOL);
                clickedFeatures.push(feature);
            }
            console.log(layerOL);
            console.log(feature);
        }), {
            hitTolerance: this.queryFeaturesHitTolerance || 0,
            layerFilter: this.queryFeaturesCondition ? this.queryFeaturesCondition : olLayerIsQueryable
        });
        /** @type {?} */
        const clickedFeature = clickedFeatures.shift();
        clickedFeatures.shift();
        clickedFeatures.push(clickedFeature);
        console.log(clickedFeatures);
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
    /**
     * @private
     * @param {?} tileCacheEntries
     * @param {?} olFeature
     * @param {?} data
     * @return {?}
     */
    getTiles(tileCacheEntries, olFeature, data) {
        /** @type {?} */
        let tile;
        /** @type {?} */
        const list = [];
        Object.keys(tileCacheEntries).forEach((/**
         * @param {?} tileCoord
         * @return {?}
         */
        tileCoord => {
            tile = tileCacheEntries[tileCoord];
            if (tile.features_ !== null) {
                tile.features_.forEach((/**
                 * @param {?} feature
                 * @return {?}
                 */
                feature => {
                    if (feature.get(data) === olFeature.properties[data]) {
                        list.push(feature);
                    }
                }));
            }
        }));
        return list;
    }
    /**
     * @private
     * @param {?} feature
     * @param {?} layer
     * @return {?}
     */
    sameDataTilesFeature(feature, layer) {
        /** @type {?} */
        let sameDataTilesFeature;
        /** @type {?} */
        let tileCacheEntries;
        /** @type {?} */
        const data = layer.values_.sourceOptions.key;
        tileCacheEntries = layer.values_.source.tileCache.entries_;
        /** @type {?} */
        const tile = Object.keys(tileCacheEntries)[0];
        tileCacheEntries = tileCacheEntries[tile].value_.sourceTiles_;
        sameDataTilesFeature = this.getTiles(tileCacheEntries, feature, data);
        console.log(sameDataTilesFeature);
        return sameDataTilesFeature;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3F1ZXJ5L3NoYXJlZC9xdWVyeS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR1osSUFBSSxFQUNMLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBNEIsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVV6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUVsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBVXJFLE1BQU0sT0FBTyxjQUFjOzs7OztJQXlEekIsWUFDa0IsU0FBOEIsRUFDdEMsWUFBMEI7UUFEbEIsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQWM7Ozs7UUF2RDVCLGNBQVMsR0FBbUIsRUFBRSxDQUFDOzs7O1FBb0I5QixrQkFBYSxHQUFZLElBQUksQ0FBQzs7OztRQUs5Qiw4QkFBeUIsR0FBVyxDQUFDLENBQUM7Ozs7UUFVdEMsc0JBQWlCLEdBQVksS0FBSyxDQUFDOzs7O1FBS2xDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFHOUIsQ0FBQztJQWFGLENBQUM7Ozs7OztJQVBKLElBQUksR0FBRztRQUNMLE9BQU8sbUJBQUEsQ0FBQyxtQkFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBTyxDQUFDLEVBQVUsQ0FBQztJQUMvQyxDQUFDOzs7Ozs7SUFXRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGdCQUFnQixFQUFF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UUFBUSxFQUFFLFlBQVk7YUFDdkI7Ozs7WUFiUSxtQkFBbUIsdUJBd0V2QixJQUFJO1lBckVBLFlBQVk7Ozs0QkFtQ2xCLEtBQUs7d0NBS0wsS0FBSztxQ0FLTCxLQUFLO2dDQUtMLEtBQUs7b0JBS0wsTUFBTTs7Ozs7Ozs7SUF4Q1AsbUNBQXVDOzs7Ozs7SUFLdkMsMENBQTJDOzs7Ozs7SUFLM0MsOENBQW1EOzs7Ozs7SUFLbkQsb0RBQTJDOzs7OztJQUszQyx1Q0FBdUM7Ozs7O0lBS3ZDLG1EQUErQzs7Ozs7SUFLL0MsZ0RBQTREOzs7OztJQUs1RCwyQ0FBNEM7Ozs7O0lBSzVDLCtCQUdLOzs7OztJQVdILG1DQUE4Qzs7Ozs7SUFDOUMsc0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkRlc3Ryb3ksXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBTZWxmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG9mLCB6aXAgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbExheWVyIGZyb20gJ29sL2xheWVyL0xheWVyJztcclxuXHJcbmltcG9ydCBPbERyYWdCb3hJbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmFnQm94JztcclxuaW1wb3J0IHsgTWFwQnJvd3NlclBvaW50ZXJFdmVudCBhcyBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQgfSBmcm9tICdvbC9NYXBCcm93c2VyRXZlbnQnO1xyXG5pbXBvcnQgeyBMaXN0ZW5lckZ1bmN0aW9uIH0gZnJvbSAnb2wvZXZlbnRzJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgTWFwQnJvd3NlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL21hcC9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgZmVhdHVyZUZyb21PbCB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUudXRpbHMnO1xyXG5pbXBvcnQgeyBRdWVyeVNlcnZpY2UgfSBmcm9tICcuL3F1ZXJ5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBsYXllcklzUXVlcnlhYmxlLCBvbExheWVySXNRdWVyeWFibGUgfSBmcm9tICcuL3F1ZXJ5LnV0aWxzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGRpcmVjdGl2ZSBtYWtlcyBhIG1hcCBxdWVyeWFibGUgd2l0aCBhIGNsaWNrIG9mIHdpdGggYSBkcmFnIGJveC5cclxuICogQnkgZGVmYXVsdCwgYWxsIGxheWVycyBhcmUgcXVlcnlhYmxlIGJ1dCB0aGlzIGNuYSBiZW4gY29udHJvbGxlZCBhdFxyXG4gKiB0aGUgbGF5ZXIgbGV2ZWwuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29RdWVyeV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBRdWVyeURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9ucyB0byBvbmdvaW5nIHF1ZXJpZXNcclxuICAgKi9cclxuICBwcml2YXRlIHF1ZXJpZXMkJDogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVuZXIgdG8gdGhlIG1hcCBjbGljayBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbWFwQ2xpY2tMaXN0ZW5lcjogTGlzdGVuZXJGdW5jdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogT0wgZHJhZyBib3ggaW50ZXJhY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIG9sRHJhZ0JveEludGVyYWN0aW9uOiBPbERyYWdCb3hJbnRlcmFjdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2wgZHJhZyBib3ggXCJlbmRcIiBldmVudCBrZXlcclxuICAgKi9cclxuICBwcml2YXRlIG9sRHJhZ0JveEludGVyYWN0aW9uRW5kS2V5OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdodGVyIHRvIHF1ZXJ5IGZlYXR1cmVzIG9yIG5vdFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHF1ZXJ5RmVhdHVyZXM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBGZWF0dXJlIHF1ZXJ5IGhpdCB0b2xlcmFuY2VcclxuICAgKi9cclxuICBASW5wdXQoKSBxdWVyeUZlYXR1cmVzSGl0VG9sZXJhbmNlOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBGZWF0dXJlIHF1ZXJ5IGhpdCB0b2xlcmFuY2VcclxuICAgKi9cclxuICBASW5wdXQoKSBxdWVyeUZlYXR1cmVzQ29uZGl0aW9uOiAob2xMYXllcjogT2xMYXllcikgPT4gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhbGwgcXVlcnkgc2hvdWxkIGNvbXBsZXRlIGJlZm9yZSBlbWl0dGluZyBhbiBldmVudFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdhaXRGb3JBbGxRdWVyaWVzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHF1ZXJ5IChvciBhbGwgcXVlcmllcykgY29tcGxldGVcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcXVlcnkgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGZlYXR1cmVzOiBGZWF0dXJlW10gfCBGZWF0dXJlW11bXTtcclxuICAgIGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQ7XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogSUdPIG1hcFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiAodGhpcy5jb21wb25lbnQubWFwIGFzIGFueSkgYXMgSWdvTWFwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIHByaXZhdGUgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBxdWVyeVNlcnZpY2U6IFF1ZXJ5U2VydmljZVxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgbGlzdGVuaW5nIHRvIGNsaWNrIGFuZCBkcmFnIGJveCBldmVudHNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLmxpc3RlblRvTWFwQ2xpY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgbGlzdGVuaW5nIHRvIGNsaWNrIGFuZCBkcmFnIGJveCBldmVudHMgYW5kIGNhbmNlbCBvbmdvaW5kIHJlcXVlc3RzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNhbmNlbE9uZ29pbmdRdWVyaWVzKCk7XHJcbiAgICB0aGlzLnVubGlzdGVuVG9NYXBDbGljaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gbWFwIGNsaWNrLCBpc3N1ZSBxdWVyaWVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaXN0ZW5Ub01hcENsaWNrKCkge1xyXG4gICAgdGhpcy5tYXBDbGlja0xpc3RlbmVyID0gdGhpcy5tYXAub2wub24oXHJcbiAgICAgICdzaW5nbGVjbGljaycsXHJcbiAgICAgIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB0aGlzLm9uTWFwRXZlbnQoZXZlbnQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBsaXN0ZW5pZyBmb3IgbWFwIGNsaWNrc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5saXN0ZW5Ub01hcENsaWNrKCkge1xyXG4gICAgdGhpcy5tYXAub2wudW4odGhpcy5tYXBDbGlja0xpc3RlbmVyLnR5cGUsIHRoaXMubWFwQ2xpY2tMaXN0ZW5lci5saXN0ZW5lcik7XHJcbiAgICB0aGlzLm1hcENsaWNrTGlzdGVuZXIgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJc3N1ZSBxdWVyaWVzIGZyb20gYSBtYXAgZXZlbnQgYW5kIGVtaXQgZXZlbnRzIHdpdGggdGhlIHJlc3VsdHNcclxuICAgKiBAcGFyYW0gZXZlbnQgT0wgbWFwIGJyb3dzZXIgcG9pbnRlciBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25NYXBFdmVudChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSB7XHJcbiAgICB0aGlzLmNhbmNlbE9uZ29pbmdRdWVyaWVzKCk7XHJcbiAgICBpZiAoIXRoaXMucXVlcnlTZXJ2aWNlLnF1ZXJ5RW5hYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcXVlcmllcyQgPSBbXTtcclxuICAgIGlmICh0aGlzLnF1ZXJ5RmVhdHVyZXMpIHtcclxuICAgICAgcXVlcmllcyQucHVzaCh0aGlzLmRvUXVlcnlGZWF0dXJlcyhldmVudCkpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2cocXVlcmllcyQpO1xyXG5cclxuICAgIGNvbnN0IHJlc29sdXRpb24gPSB0aGlzLm1hcC5vbC5nZXRWaWV3KCkuZ2V0UmVzb2x1dGlvbigpO1xyXG4gICAgY29uc3QgcXVlcnlMYXllcnMgPSB0aGlzLm1hcC5sYXllcnMuZmlsdGVyKGxheWVySXNRdWVyeWFibGUpO1xyXG4gICAgcXVlcmllcyQucHVzaCguLi50aGlzLnF1ZXJ5U2VydmljZS5xdWVyeShxdWVyeUxheWVycywge1xyXG4gICAgICBjb29yZGluYXRlczogZXZlbnQuY29vcmRpbmF0ZSxcclxuICAgICAgcHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgcmVzb2x1dGlvblxyXG4gICAgfSkpO1xyXG5cclxuICAgIGlmIChxdWVyaWVzJC5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLndhaXRGb3JBbGxRdWVyaWVzKSB7XHJcbiAgICAgIHRoaXMucXVlcmllcyQkLnB1c2goXHJcbiAgICAgICAgemlwKC4uLnF1ZXJpZXMkKS5zdWJzY3JpYmUoKHJlc3VsdHM6IEZlYXR1cmVbXVtdKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmZWF0dXJlcyA9IFtdLmNvbmNhdCguLi5yZXN1bHRzKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZmVhdHVyZXMpO1xyXG4gICAgICAgICAgdGhpcy5xdWVyeS5lbWl0KHsgZmVhdHVyZXMsIGV2ZW50IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnF1ZXJpZXMkJCA9IHF1ZXJpZXMkLm1hcCgocXVlcnkkOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT4pID0+IHtcclxuICAgICAgICByZXR1cm4gcXVlcnkkLnN1YnNjcmliZSgoZmVhdHVyZXM6IEZlYXR1cmVbXSkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZmVhdHVyZXMpO1xyXG4gICAgICAgICAgdGhpcy5xdWVyeS5lbWl0KHsgZmVhdHVyZXMsIGV2ZW50IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHRoaXMucXVlcmllcyQkKTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMucXVlcnkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUXVlcnkgZmVhdHVyZXMgYWxyZWFkeSBwcmVzZW50IG9uIHRoZSBtYXBcclxuICAgKiBAcGFyYW0gZXZlbnQgT0wgbWFwIGJyb3dzZXIgcG9pbnRlciBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9RdWVyeUZlYXR1cmVzKGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT4ge1xyXG5cclxuICAgIGxldCBmZWF0dXJlO1xyXG4gICAgbGV0IGZlYXR1cmVzVGlsZUNvdmVyYWdlO1xyXG4gICAgY29uc3QgY2xpY2tlZEZlYXR1cmVzID0gW107XHJcblxyXG4gICAgdGhpcy5tYXAub2wuZm9yRWFjaEZlYXR1cmVBdFBpeGVsKFxyXG4gICAgICBldmVudC5waXhlbCxcclxuICAgICAgKGZlYXR1cmVPTDogT2xGZWF0dXJlLCBsYXllck9MOiBPbExheWVyKSA9PiB7XHJcbiAgICAgICAgaWYgKGZlYXR1cmVPTCkge1xyXG4gICAgICAgICAgaWYgKGZlYXR1cmVPTC5nZXQoJ2ZlYXR1cmVzJykpIHtcclxuICAgICAgICAgICAgZmVhdHVyZU9MID0gZmVhdHVyZU9MLmdldCgnZmVhdHVyZXMnKVswXTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZmVhdHVyZU9MKTtcclxuICAgICAgICAgICAgaWYgKGZlYXR1cmVPTC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBmZWF0dXJlID0gZmVhdHVyZUZyb21PbChmZWF0dXJlT0wsIHRoaXMubWFwLnByb2plY3Rpb24sIGxheWVyT0wpO1xyXG4gICAgICAgICAgY2xpY2tlZEZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhsYXllck9MKTtcclxuXHJcbiAgICAgICAgICBpZiAoZmVhdHVyZS5tZXRhLnR5cGVTb3VyY2UgPT09ICdtdnQnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNhbWVEYXRhVGlsZUZlYXR1cmVzID0gdGhpcy5zYW1lRGF0YVRpbGVzRmVhdHVyZShmZWF0dXJlLCBsYXllck9MKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBzYW1lRGF0YVRpbGVGZWF0dXJlIG9mIHNhbWVEYXRhVGlsZUZlYXR1cmVzKSB7XHJcbiAgICAgICAgICAgICAgZmVhdHVyZXNUaWxlQ292ZXJhZ2UgPSBmZWF0dXJlRnJvbU9sKHNhbWVEYXRhVGlsZUZlYXR1cmUsIHRoaXMubWFwLnByb2plY3Rpb24pO1xyXG4gICAgICAgICAgICAgIGNsaWNrZWRGZWF0dXJlcy5wdXNoKGZlYXR1cmVzVGlsZUNvdmVyYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZmVhdHVyZSA9IGZlYXR1cmVGcm9tT2woZmVhdHVyZU9MLCB0aGlzLm1hcC5wcm9qZWN0aW9uLCBsYXllck9MKTtcclxuICAgICAgICAgIGNsaWNrZWRGZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhsYXllck9MKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmZWF0dXJlKTtcclxuICAgICAgfSxcclxuICAgIHtcclxuICAgICAgaGl0VG9sZXJhbmNlOiB0aGlzLnF1ZXJ5RmVhdHVyZXNIaXRUb2xlcmFuY2UgfHwgMCxcclxuICAgICAgbGF5ZXJGaWx0ZXI6IHRoaXMucXVlcnlGZWF0dXJlc0NvbmRpdGlvbiA/IHRoaXMucXVlcnlGZWF0dXJlc0NvbmRpdGlvbiA6IG9sTGF5ZXJJc1F1ZXJ5YWJsZVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY2xpY2tlZEZlYXR1cmUgPSBjbGlja2VkRmVhdHVyZXMuc2hpZnQoKTtcclxuICAgIGNsaWNrZWRGZWF0dXJlcy5zaGlmdCgpO1xyXG4gICAgY2xpY2tlZEZlYXR1cmVzLnB1c2goY2xpY2tlZEZlYXR1cmUpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGNsaWNrZWRGZWF0dXJlcyk7XHJcbiAgICByZXR1cm4gb2YoY2xpY2tlZEZlYXR1cmVzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbmNlbCBvbmdvaW5nIHJlcXVlc3RzLCBpZiBhbnlcclxuICAgKi9cclxuICBwcml2YXRlIGNhbmNlbE9uZ29pbmdRdWVyaWVzKCkge1xyXG4gICAgdGhpcy5xdWVyaWVzJCQuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcclxuICAgIHRoaXMucXVlcmllcyQkID0gW107XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFRpbGVzKHRpbGVDYWNoZUVudHJpZXMsIG9sRmVhdHVyZSwgZGF0YSk6IEZlYXR1cmVbXSB7XHJcbiAgICBsZXQgdGlsZTtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgIE9iamVjdC5rZXlzKHRpbGVDYWNoZUVudHJpZXMpLmZvckVhY2godGlsZUNvb3JkID0+IHtcclxuICAgICAgdGlsZSA9IHRpbGVDYWNoZUVudHJpZXNbdGlsZUNvb3JkXTtcclxuICAgICAgaWYgKHRpbGUuZmVhdHVyZXNfICE9PSBudWxsKSB7XHJcbiAgICAgICAgdGlsZS5mZWF0dXJlc18uZm9yRWFjaChmZWF0dXJlID0+IHtcclxuICAgICAgICAgIGlmIChmZWF0dXJlLmdldChkYXRhKSA9PT0gb2xGZWF0dXJlLnByb3BlcnRpZXNbZGF0YV0pIHtcclxuICAgICAgICAgICAgbGlzdC5wdXNoKGZlYXR1cmUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBsaXN0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzYW1lRGF0YVRpbGVzRmVhdHVyZShmZWF0dXJlOiBGZWF0dXJlLCBsYXllcjogYW55KTogRmVhdHVyZVtdIHtcclxuICAgIGxldCBzYW1lRGF0YVRpbGVzRmVhdHVyZTtcclxuICAgIGxldCB0aWxlQ2FjaGVFbnRyaWVzO1xyXG4gICAgY29uc3QgZGF0YSA9IGxheWVyLnZhbHVlc18uc291cmNlT3B0aW9ucy5rZXk7XHJcbiAgICB0aWxlQ2FjaGVFbnRyaWVzID0gbGF5ZXIudmFsdWVzXy5zb3VyY2UudGlsZUNhY2hlLmVudHJpZXNfO1xyXG4gICAgY29uc3QgdGlsZSA9IE9iamVjdC5rZXlzKHRpbGVDYWNoZUVudHJpZXMpWzBdO1xyXG4gICAgdGlsZUNhY2hlRW50cmllcyA9IHRpbGVDYWNoZUVudHJpZXNbdGlsZV0udmFsdWVfLnNvdXJjZVRpbGVzXztcclxuICAgIHNhbWVEYXRhVGlsZXNGZWF0dXJlID0gdGhpcy5nZXRUaWxlcyh0aWxlQ2FjaGVFbnRyaWVzLCBmZWF0dXJlLCBkYXRhKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhzYW1lRGF0YVRpbGVzRmVhdHVyZSk7XHJcbiAgICByZXR1cm4gc2FtZURhdGFUaWxlc0ZlYXR1cmU7XHJcbiAgfVxyXG59XHJcbiJdfQ==