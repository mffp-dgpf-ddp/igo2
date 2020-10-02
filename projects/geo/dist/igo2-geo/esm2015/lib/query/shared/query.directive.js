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
                        feature.meta.alias = this.queryService.getAllowedFieldsAndAlias(layer);
                        feature.meta.title = feature.meta.title || this.queryService.getQueryTitle(feature, layer);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3F1ZXJ5L3NoYXJlZC9xdWVyeS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR1osSUFBSSxFQUNMLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBNEIsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd6RCxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQVFoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUVsRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBV3JFLE1BQU0sT0FBTyxjQUFjOzs7OztJQXlEekIsWUFDa0IsU0FBOEIsRUFDdEMsWUFBMEI7UUFEbEIsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQWM7Ozs7UUF2RDVCLGNBQVMsR0FBbUIsRUFBRSxDQUFDOzs7O1FBb0I5QixrQkFBYSxHQUFZLEtBQUssQ0FBQzs7OztRQUsvQiw4QkFBeUIsR0FBVyxDQUFDLENBQUM7Ozs7UUFVdEMsc0JBQWlCLEdBQVksSUFBSSxDQUFDOzs7O1FBS2pDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFHOUIsQ0FBQztJQWFGLENBQUM7Ozs7OztJQVBKLElBQUksR0FBRztRQUNMLE9BQU8sbUJBQUEsQ0FBQyxtQkFBQSxJQUFJLENBQUMsU0FBUyxDQUFD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QUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7WUF6TkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2FBQ3ZCOzs7O1lBZlEsbUJBQW1CLHVCQTBFdkIsSUFBSTtZQXRFQSxZQUFZOzs7NEJBb0NsQixLQUFLO3dDQUtMLEtBQUs7cUNBS0wsS0FBSztnQ0FLTCxLQUFLO29CQUtMLE1BQU07Ozs7Ozs7O0lBeENQLG1DQUF1Qzs7Ozs7O0lBS3ZDLDBDQUEyQzs7Ozs7O0lBSzNDLDhDQUFtRDs7Ozs7O0lBS25ELG9EQUEyQzs7Ozs7SUFLM0MsdUNBQXdDOzs7OztJQUt4QyxtREFBK0M7Ozs7O0lBSy9DLGdEQUErRDs7Ozs7SUFLL0QsMkNBQTJDOzs7OztJQUszQywrQkFHSzs7Ozs7SUFXSCxtQ0FBOEM7Ozs7O0lBQzlDLHNDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEVudGl0eVRpdGxlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkRlc3Ryb3ksXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBTZWxmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG9mLCB6aXAgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbFJlbmRlckZlYXR1cmUgZnJvbSAnb2wvcmVuZGVyL0ZlYXR1cmUnO1xyXG5pbXBvcnQgT2xMYXllciBmcm9tICdvbC9sYXllci9MYXllcic7XHJcblxyXG5pbXBvcnQgT2xEcmFnQm94SW50ZXJhY3Rpb24gZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhZ0JveCc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJQb2ludGVyRXZlbnQgYXMgT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50IH0gZnJvbSAnb2wvTWFwQnJvd3NlckV2ZW50JztcclxuaW1wb3J0IHsgTGlzdGVuZXJGdW5jdGlvbiB9IGZyb20gJ29sL2V2ZW50cyc7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9tYXAvbWFwLWJyb3dzZXIvbWFwLWJyb3dzZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IHJlbmRlckZlYXR1cmVGcm9tT2wgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLnV0aWxzJztcclxuaW1wb3J0IHsgZmVhdHVyZUZyb21PbCB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUudXRpbHMnO1xyXG5pbXBvcnQgeyBRdWVyeVNlcnZpY2UgfSBmcm9tICcuL3F1ZXJ5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBsYXllcklzUXVlcnlhYmxlLCBvbExheWVySXNRdWVyeWFibGUgfSBmcm9tICcuL3F1ZXJ5LnV0aWxzJztcclxuaW1wb3J0IHsgQW55TGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2FueS1sYXllcic7XHJcblxyXG4vKipcclxuICogVGhpcyBkaXJlY3RpdmUgbWFrZXMgYSBtYXAgcXVlcnlhYmxlIHdpdGggYSBjbGljayBvZiB3aXRoIGEgZHJhZyBib3guXHJcbiAqIEJ5IGRlZmF1bHQsIGFsbCBsYXllcnMgYXJlIHF1ZXJ5YWJsZSBidXQgdGhpcyBjYW4gYmVuIGNvbnRyb2xsZWQgYXRcclxuICogdGhlIGxheWVyIGxldmVsLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvUXVlcnldJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUXVlcnlEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbnMgdG8gb25nb2luZyBxdWVyaWVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBxdWVyaWVzJCQ6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3RlbmVyIHRvIHRoZSBtYXAgY2xpY2sgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG1hcENsaWNrTGlzdGVuZXI6IExpc3RlbmVyRnVuY3Rpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIE9MIGRyYWcgYm94IGludGVyYWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbERyYWdCb3hJbnRlcmFjdGlvbjogT2xEcmFnQm94SW50ZXJhY3Rpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIE9sIGRyYWcgYm94IFwiZW5kXCIgZXZlbnQga2V5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbERyYWdCb3hJbnRlcmFjdGlvbkVuZEtleTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBXaHRlciB0byBxdWVyeSBmZWF0dXJlcyBvciBub3RcclxuICAgKi9cclxuICBASW5wdXQoKSBxdWVyeUZlYXR1cmVzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZlYXR1cmUgcXVlcnkgaGl0IHRvbGVyYW5jZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHF1ZXJ5RmVhdHVyZXNIaXRUb2xlcmFuY2U6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZlYXR1cmUgcXVlcnkgaGl0IHRvbGVyYW5jZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHF1ZXJ5RmVhdHVyZXNDb25kaXRpb246IChvbExheWVyOiBPbExheWVyKSA9PiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGFsbCBxdWVyeSBzaG91bGQgY29tcGxldGUgYmVmb3JlIGVtaXR0aW5nIGFuIGV2ZW50XHJcbiAgICovXHJcbiAgQElucHV0KCkgd2FpdEZvckFsbFF1ZXJpZXM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYSBxdWVyeSAob3IgYWxsIHF1ZXJpZXMpIGNvbXBsZXRlXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHF1ZXJ5ID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBmZWF0dXJlczogRmVhdHVyZVtdIHwgRmVhdHVyZVtdW107XHJcbiAgICBldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50O1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIElHTyBtYXBcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gKHRoaXMuY29tcG9uZW50Lm1hcCBhcyBhbnkpIGFzIElnb01hcDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBwcml2YXRlIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgcXVlcnlTZXJ2aWNlOiBRdWVyeVNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IGxpc3RlbmluZyB0byBjbGljayBhbmQgZHJhZyBib3ggZXZlbnRzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5saXN0ZW5Ub01hcENsaWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIGxpc3RlbmluZyB0byBjbGljayBhbmQgZHJhZyBib3ggZXZlbnRzIGFuZCBjYW5jZWwgb25nb2luZCByZXF1ZXN0c1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jYW5jZWxPbmdvaW5nUXVlcmllcygpO1xyXG4gICAgdGhpcy51bmxpc3RlblRvTWFwQ2xpY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIG1hcCBjbGljaywgaXNzdWUgcXVlcmllc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlzdGVuVG9NYXBDbGljaygpIHtcclxuICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lciA9IHRoaXMubWFwLm9sLm9uKFxyXG4gICAgICAnc2luZ2xlY2xpY2snLFxyXG4gICAgICAoZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCkgPT4gdGhpcy5vbk1hcEV2ZW50KGV2ZW50KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgbGlzdGVuaW5nIGZvciBtYXAgY2xpY2tzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bmxpc3RlblRvTWFwQ2xpY2soKSB7XHJcbiAgICB0aGlzLm1hcC5vbC51bih0aGlzLm1hcENsaWNrTGlzdGVuZXIudHlwZSwgdGhpcy5tYXBDbGlja0xpc3RlbmVyLmxpc3RlbmVyKTtcclxuICAgIHRoaXMubWFwQ2xpY2tMaXN0ZW5lciA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIElzc3VlIHF1ZXJpZXMgZnJvbSBhIG1hcCBldmVudCBhbmQgZW1pdCBldmVudHMgd2l0aCB0aGUgcmVzdWx0c1xyXG4gICAqIEBwYXJhbSBldmVudCBPTCBtYXAgYnJvd3NlciBwb2ludGVyIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1hcEV2ZW50KGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpIHtcclxuICAgIHRoaXMuY2FuY2VsT25nb2luZ1F1ZXJpZXMoKTtcclxuICAgIGlmICghdGhpcy5xdWVyeVNlcnZpY2UucXVlcnlFbmFibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBxdWVyaWVzJCA9IFtdO1xyXG4gICAgaWYgKHRoaXMucXVlcnlGZWF0dXJlcykge1xyXG4gICAgICBxdWVyaWVzJC5wdXNoKHRoaXMuZG9RdWVyeUZlYXR1cmVzKGV2ZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzb2x1dGlvbiA9IHRoaXMubWFwLm9sLmdldFZpZXcoKS5nZXRSZXNvbHV0aW9uKCk7XHJcbiAgICBjb25zdCBxdWVyeUxheWVycyA9IHRoaXMubWFwLmxheWVycy5maWx0ZXIobGF5ZXJJc1F1ZXJ5YWJsZSk7XHJcbiAgICBxdWVyaWVzJC5wdXNoKFxyXG4gICAgICAuLi50aGlzLnF1ZXJ5U2VydmljZS5xdWVyeShxdWVyeUxheWVycywge1xyXG4gICAgICAgIGNvb3JkaW5hdGVzOiBldmVudC5jb29yZGluYXRlLFxyXG4gICAgICAgIHByb2plY3Rpb246IHRoaXMubWFwLnByb2plY3Rpb24sXHJcbiAgICAgICAgcmVzb2x1dGlvblxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocXVlcmllcyQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy53YWl0Rm9yQWxsUXVlcmllcykge1xyXG4gICAgICB0aGlzLnF1ZXJpZXMkJC5wdXNoKFxyXG4gICAgICAgIHppcCguLi5xdWVyaWVzJCkuc3Vic2NyaWJlKChyZXN1bHRzOiBGZWF0dXJlW11bXSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmVhdHVyZXMgPSBbXS5jb25jYXQoLi4ucmVzdWx0cyk7XHJcbiAgICAgICAgICB0aGlzLnF1ZXJ5LmVtaXQoeyBmZWF0dXJlcywgZXZlbnQgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucXVlcmllcyQkID0gcXVlcmllcyQubWFwKChxdWVyeSQ6IE9ic2VydmFibGU8RmVhdHVyZVtdPikgPT4ge1xyXG4gICAgICAgIHJldHVybiBxdWVyeSQuc3Vic2NyaWJlKChmZWF0dXJlczogRmVhdHVyZVtdKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnF1ZXJ5LmVtaXQoeyBmZWF0dXJlcywgZXZlbnQgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUXVlcnkgZmVhdHVyZXMgYWxyZWFkeSBwcmVzZW50IG9uIHRoZSBtYXBcclxuICAgKiBAcGFyYW0gZXZlbnQgT0wgbWFwIGJyb3dzZXIgcG9pbnRlciBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9RdWVyeUZlYXR1cmVzKFxyXG4gICAgZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudFxyXG4gICk6IE9ic2VydmFibGU8RmVhdHVyZVtdPiB7XHJcbiAgICBjb25zdCBjbGlja2VkRmVhdHVyZXMgPSBbXTtcclxuXHJcbiAgICB0aGlzLm1hcC5vbC5mb3JFYWNoRmVhdHVyZUF0UGl4ZWwoXHJcbiAgICAgIGV2ZW50LnBpeGVsLFxyXG4gICAgICAoZmVhdHVyZU9MOiBPbEZlYXR1cmUsIGxheWVyT0w6IE9sTGF5ZXIpID0+IHtcclxuICAgICAgICBpZiAoZmVhdHVyZU9MKSB7XHJcbiAgICAgICAgICBpZiAoZmVhdHVyZU9MLmdldCgnZmVhdHVyZXMnKSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZlYXR1cmUgb2YgZmVhdHVyZU9MLmdldCgnZmVhdHVyZXMnKSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IG5ld0ZlYXR1cmUgPSBmZWF0dXJlRnJvbU9sKGZlYXR1cmUsIHRoaXMubWFwLnByb2plY3Rpb24pO1xyXG4gICAgICAgICAgICAgIG5ld0ZlYXR1cmUubWV0YSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBmZWF0dXJlLnZhbHVlc18ubm9tLFxyXG4gICAgICAgICAgICAgICAgaWQ6IGZlYXR1cmUuaWRfLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogZmVhdHVyZS52YWx1ZXNfLl9pY29uLFxyXG4gICAgICAgICAgICAgICAgc291cmNlVGl0bGU6IGxheWVyT0wudmFsdWVzXy50aXRsZVxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgY2xpY2tlZEZlYXR1cmVzLnB1c2gobmV3RmVhdHVyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoZmVhdHVyZU9MIGluc3RhbmNlb2YgT2xSZW5kZXJGZWF0dXJlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZlYXR1cmVGcm9tUmVuZGVyOiBPbEZlYXR1cmUgPSBmZWF0dXJlT0w7XHJcbiAgICAgICAgICAgIGNvbnN0IGZlYXR1cmUgPSByZW5kZXJGZWF0dXJlRnJvbU9sKFxyXG4gICAgICAgICAgICAgIGZlYXR1cmVPTCxcclxuICAgICAgICAgICAgICB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICAgICAgICAgIGxheWVyT0xcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY2xpY2tlZEZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBmZWF0dXJlID0gZmVhdHVyZUZyb21PbChcclxuICAgICAgICAgICAgICBmZWF0dXJlT0wsXHJcbiAgICAgICAgICAgICAgdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgICAgICAgICBsYXllck9MXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNsaWNrZWRGZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGhpdFRvbGVyYW5jZTogdGhpcy5xdWVyeUZlYXR1cmVzSGl0VG9sZXJhbmNlIHx8IDAsXHJcbiAgICAgICAgbGF5ZXJGaWx0ZXI6IHRoaXMucXVlcnlGZWF0dXJlc0NvbmRpdGlvblxyXG4gICAgICAgICAgPyB0aGlzLnF1ZXJ5RmVhdHVyZXNDb25kaXRpb25cclxuICAgICAgICAgIDogb2xMYXllcklzUXVlcnlhYmxlXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgcXVlcnlhYmxlTGF5ZXJzID0gdGhpcy5tYXAubGF5ZXJzLmZpbHRlcihsYXllcklzUXVlcnlhYmxlKTtcclxuICAgIGNsaWNrZWRGZWF0dXJlcy5mb3JFYWNoKChmZWF0dXJlOiBGZWF0dXJlKSA9PiB7XHJcbiAgICAgIHF1ZXJ5YWJsZUxheWVycy5mb3JFYWNoKChsYXllcjogQW55TGF5ZXIpID0+IHtcclxuICAgICAgICBpZiAodHlwZW9mIGxheWVyLm9sLmdldFNvdXJjZSgpLmhhc0ZlYXR1cmUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICBpZiAobGF5ZXIub2wuZ2V0U291cmNlKCkuaGFzRmVhdHVyZShmZWF0dXJlLm9sKSkge1xyXG4gICAgICAgICAgICBmZWF0dXJlLm1ldGEuYWxpYXMgPSB0aGlzLnF1ZXJ5U2VydmljZS5nZXRBbGxvd2VkRmllbGRzQW5kQWxpYXMobGF5ZXIpO1xyXG4gICAgICAgICAgICBmZWF0dXJlLm1ldGEudGl0bGUgPSBmZWF0dXJlLm1ldGEudGl0bGUgfHwgdGhpcy5xdWVyeVNlcnZpY2UuZ2V0UXVlcnlUaXRsZShmZWF0dXJlLCBsYXllcik7XHJcbiAgICAgICAgICAgIGZlYXR1cmUubWV0YS5zb3VyY2VUaXRsZSA9IGxheWVyLnRpdGxlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gb2YoY2xpY2tlZEZlYXR1cmVzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbmNlbCBvbmdvaW5nIHJlcXVlc3RzLCBpZiBhbnlcclxuICAgKi9cclxuICBwcml2YXRlIGNhbmNlbE9uZ29pbmdRdWVyaWVzKCkge1xyXG4gICAgdGhpcy5xdWVyaWVzJCQuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcclxuICAgIHRoaXMucXVlcmllcyQkID0gW107XHJcbiAgfVxyXG59XHJcbiJdfQ==