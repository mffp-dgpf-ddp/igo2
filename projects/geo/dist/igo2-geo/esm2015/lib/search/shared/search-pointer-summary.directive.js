/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Self, HostListener } from '@angular/core';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { SearchService } from './search.service';
import olFeature from 'ol/Feature';
import { transform } from 'ol/proj';
import * as olstyle from 'ol/style';
import * as olgeom from 'ol/geom';
import OlGeoJSON from 'ol/format/GeoJSON';
import { EntityStore } from '@igo2/common';
import { FeatureDataSource } from '../../datasource/shared/datasources/feature-datasource';
import { VectorLayer } from '../../layer/shared/layers/vector-layer';
import { take } from 'rxjs/operators';
import { tryBindStoreLayer } from '../../feature/shared/feature.utils';
import { FeatureStore } from '../../feature/shared/store';
import { FeatureMotion, FEATURE } from '../../feature/shared/feature.enums';
import { SearchSourceService } from './search-source.service';
import { sourceCanReverseSearchAsSummary } from './search.utils';
import { MediaService } from '@igo2/core';
/**
 * This directive makes the mouse coordinate trigger a reverse search on available search sources.
 * The search results are placed into a label, on a cross icon, representing the mouse coordinate.
 * By default, no search sources. Config in config file must be defined.
 * the layer level.
 */
export class SearchPointerSummaryDirective {
    /**
     * @param {?} component
     * @param {?} searchService
     * @param {?} searchSourceService
     * @param {?} mediaService
     */
    constructor(component, searchService, searchSourceService, mediaService) {
        this.component = component;
        this.searchService = searchService;
        this.searchSourceService = searchSourceService;
        this.mediaService = mediaService;
        this.pointerSearchStore = new EntityStore([]);
        this.reverseSearch$$ = [];
        this.hasPointerReverseSearchSource = false;
        this.searchPointerSummaryFeatureId = 'searchPointerSummaryFeatureId';
        /**
         * The delay where the mouse must be motionless before trigger the reverse search
         */
        this.igoSearchPointerSummaryDelay = 1000;
        /**
         * If the user has enabled or not the directive
         */
        this.igoSearchPointerSummaryEnabled = false;
    }
    /**
     * @return {?}
     */
    mouseout() {
        clearTimeout(this.lastTimeoutRequest);
        this.clearLayer();
    }
    /**
     * IGO map
     * \@internal
     * @return {?}
     */
    get map() {
        return this.component.map;
    }
    /**
     * @return {?}
     */
    get mapProjection() {
        return ((/** @type {?} */ (this.component.map))).projection;
    }
    /**
     * Start listening to pointermove and reverse search results.
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.listenToMapPointerMove();
        this.subscribeToPointerStore();
        this.map.status$.pipe(take(1)).subscribe((/**
         * @return {?}
         */
        () => {
            this.store = new FeatureStore([], { map: this.map });
            this.initStore();
        }));
    }
    /**
     * Initialize the pointer position store
     * \@internal
     * @private
     * @return {?}
     */
    initStore() {
        /** @type {?} */
        const store = this.store;
        /** @type {?} */
        const layer = new VectorLayer({
            title: 'searchPointerSummary',
            zIndex: 900,
            source: new FeatureDataSource(),
            showInLayerList: false,
            exportable: false,
            browsable: false,
            style: pointerPositionSummaryMarker
        });
        tryBindStoreLayer(store, layer);
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        if (!this.searchSourceService.getEnabledSources().filter(sourceCanReverseSearchAsSummary).length) {
            this.hasPointerReverseSearchSource = false;
        }
        else {
            this.hasPointerReverseSearchSource = true;
        }
    }
    /**
     * Stop listening to pointermove and reverse search results.
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.unlistenToMapPointerMove();
        this.unsubscribeToPointerStore();
        this.unsubscribeReverseSearch();
    }
    /**
     * Subscribe to pointermove result store
     * \@internal
     * @return {?}
     */
    subscribeToPointerStore() {
        this.store$$ = this.pointerSearchStore.entities$.subscribe((/**
         * @param {?} resultsUnderPointerPosition
         * @return {?}
         */
        resultsUnderPointerPosition => {
            this.entitiesToPointerOverlay(resultsUnderPointerPosition);
        }));
    }
    /**
     * Build an object based on the closest feature by type (base on type and distance properties )
     * @private
     * @param {?} results SearchResult[]
     * @return {?} OL style function
     */
    computeSummaryClosestFeature(results) {
        /** @type {?} */
        const closestResultByType = {};
        results.map((/**
         * @param {?} result
         * @return {?}
         */
        result => {
            if (result.data.properties.type && result.data.properties.distance >= 0) {
                if (closestResultByType.hasOwnProperty(result.data.properties.type)) {
                    /** @type {?} */
                    const prevDistance = closestResultByType[result.data.properties.type].distance;
                    if (result.data.properties.distance < prevDistance) {
                        closestResultByType[result.data.properties.type] = { distance: result.data.properties.distance, title: result.meta.title };
                    }
                }
                else {
                    closestResultByType[result.data.properties.type] = { distance: result.data.properties.distance, title: result.meta.title };
                }
            }
        }));
        return closestResultByType;
    }
    /**
     * convert store entities to a pointer position overlay with label summary on.
     * @private
     * @param {?} resultsUnderPointerPosition
     * @return {?}
     */
    entitiesToPointerOverlay(resultsUnderPointerPosition) {
        /** @type {?} */
        const closestResultByType = this.computeSummaryClosestFeature(resultsUnderPointerPosition);
        /** @type {?} */
        const summarizedClosestType = Object.keys(closestResultByType);
        /** @type {?} */
        const processedSummarizedClosestType = [];
        /** @type {?} */
        const summary = [];
        resultsUnderPointerPosition.map((/**
         * @param {?} result
         * @return {?}
         */
        result => {
            /** @type {?} */
            const typeIndex = summarizedClosestType.indexOf(result.data.properties.type);
            if (typeIndex !== -1) {
                summary.push(closestResultByType[result.data.properties.type].title);
                summarizedClosestType.splice(typeIndex, 1);
                processedSummarizedClosestType.push(result.data.properties.type);
            }
            else {
                if (processedSummarizedClosestType.indexOf(result.data.properties.type) === -1) {
                    summary.push(result.meta.title);
                }
            }
        }));
        if (summary.length) {
            this.addPointerOverlay(summary.join('\n'));
        }
    }
    /**
     * On map pointermove
     * @private
     * @return {?}
     */
    listenToMapPointerMove() {
        this.pointerMoveListener = this.map.ol.on('pointermove', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onMapEvent(event)));
    }
    /**
     * Unsubscribe to pointer store.
     * \@internal
     * @return {?}
     */
    unsubscribeToPointerStore() {
        this.store$$.unsubscribe();
    }
    /**
     * Unsubscribe to reverse seatch store.
     * \@internal
     * @return {?}
     */
    unsubscribeReverseSearch() {
        this.reverseSearch$$.map((/**
         * @param {?} s
         * @return {?}
         */
        s => s.unsubscribe()));
        this.reverseSearch$$ = [];
    }
    /**
     * Stop listening for map pointermove
     * \@internal
     * @private
     * @return {?}
     */
    unlistenToMapPointerMove() {
        this.map.ol.un(this.pointerMoveListener.type, this.pointerMoveListener.listener);
        this.pointerMoveListener = undefined;
    }
    /**
     * Trigger reverse search when the mouse is motionless during the defined delay (pointerMoveDelay).
     * @private
     * @param {?} event OL map browser pointer event
     * @return {?}
     */
    onMapEvent(event) {
        if (event.dragging || !this.igoSearchPointerSummaryEnabled ||
            !this.hasPointerReverseSearchSource || this.mediaService.isTouchScreen()) {
            this.clearLayer();
            return;
        }
        if (typeof this.lastTimeoutRequest !== 'undefined') { // cancel timeout when the mouse moves
            clearTimeout(this.lastTimeoutRequest);
            this.clearLayer();
            this.unsubscribeReverseSearch();
        }
        this.lonLat = transform(event.coordinate, this.mapProjection, 'EPSG:4326');
        this.lastTimeoutRequest = setTimeout((/**
         * @return {?}
         */
        () => {
            this.onSearchCoordinate();
        }), this.igoSearchPointerSummaryDelay);
    }
    /**
     * @private
     * @return {?}
     */
    onSearchCoordinate() {
        this.pointerSearchStore.clear();
        /** @type {?} */
        const results = this.searchService.reverseSearch(this.lonLat, { params: { geometry: 'false', icon: 'false' } }, true);
        for (const i in results) {
            if (results.length > 0) {
                this.reverseSearch$$.push(results[i].request.subscribe((/**
                 * @param {?} _results
                 * @return {?}
                 */
                (_results) => {
                    this.onSearch({ research: results[i], results: _results });
                })));
            }
        }
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    onSearch(event) {
        /** @type {?} */
        const results = event.results;
        /** @type {?} */
        const newResults = this.pointerSearchStore.all()
            .filter((/**
         * @param {?} result
         * @return {?}
         */
        (result) => result.source !== event.research.source))
            .concat(results);
        this.pointerSearchStore.load(newResults);
    }
    /**
     * Add a feature to the pointer store
     * @private
     * @param {?} text string
     * @return {?}
     */
    addPointerOverlay(text) {
        this.clearLayer();
        /** @type {?} */
        const geometry = new olgeom.Point(transform(this.lonLat, 'EPSG:4326', this.mapProjection));
        /** @type {?} */
        const feature = new olFeature({ geometry });
        /** @type {?} */
        const geojsonGeom = new OlGeoJSON().writeGeometryObject(geometry, {
            featureProjection: this.mapProjection,
            dataProjection: this.mapProjection
        });
        /** @type {?} */
        const f = {
            type: FEATURE,
            geometry: geojsonGeom,
            projection: this.mapProjection,
            properties: {
                id: this.searchPointerSummaryFeatureId,
                pointerSummary: text
            },
            meta: {
                id: this.searchPointerSummaryFeatureId
            },
            ol: feature
        };
        this.store.setLayerFeatures([f], FeatureMotion.None);
    }
    /**
     * Clear the pointer store features
     * @private
     * @return {?}
     */
    clearLayer() {
        if (this.store) {
            this.store.clearLayer();
        }
    }
}
SearchPointerSummaryDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoSearchPointerSummary]'
            },] }
];
/** @nocollapse */
SearchPointerSummaryDirective.ctorParameters = () => [
    { type: MapBrowserComponent, decorators: [{ type: Self }] },
    { type: SearchService },
    { type: SearchSourceService },
    { type: MediaService }
];
SearchPointerSummaryDirective.propDecorators = {
    igoSearchPointerSummaryDelay: [{ type: Input }],
    igoSearchPointerSummaryEnabled: [{ type: Input }],
    mouseout: [{ type: HostListener, args: ['mouseout',] }]
};
if (false) {
    /** @type {?} */
    SearchPointerSummaryDirective.prototype.store;
    /**
     * @type {?}
     * @private
     */
    SearchPointerSummaryDirective.prototype.lonLat;
    /**
     * @type {?}
     * @private
     */
    SearchPointerSummaryDirective.prototype.pointerSearchStore;
    /**
     * @type {?}
     * @private
     */
    SearchPointerSummaryDirective.prototype.lastTimeoutRequest;
    /**
     * @type {?}
     * @private
     */
    SearchPointerSummaryDirective.prototype.store$$;
    /**
     * @type {?}
     * @private
     */
    SearchPointerSummaryDirective.prototype.reverseSearch$$;
    /**
     * @type {?}
     * @private
     */
    SearchPointerSummaryDirective.prototype.hasPointerReverseSearchSource;
    /**
     * Listener to the pointer move event
     * @type {?}
     * @private
     */
    SearchPointerSummaryDirective.prototype.pointerMoveListener;
    /**
     * @type {?}
     * @private
     */
    SearchPointerSummaryDirective.prototype.searchPointerSummaryFeatureId;
    /**
     * The delay where the mouse must be motionless before trigger the reverse search
     * @type {?}
     */
    SearchPointerSummaryDirective.prototype.igoSearchPointerSummaryDelay;
    /**
     * If the user has enabled or not the directive
     * @type {?}
     */
    SearchPointerSummaryDirective.prototype.igoSearchPointerSummaryEnabled;
    /**
     * @type {?}
     * @private
     */
    SearchPointerSummaryDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    SearchPointerSummaryDirective.prototype.searchService;
    /**
     * @type {?}
     * @private
     */
    SearchPointerSummaryDirective.prototype.searchSourceService;
    /**
     * @type {?}
     * @private
     */
    SearchPointerSummaryDirective.prototype.mediaService;
}
/**
 * Create a default style for the pointer position and it's label summary.
 * @param {?} feature OlFeature
 * @param {?} resolution
 * @return {?} OL style function
 */
export function pointerPositionSummaryMarker(feature, resolution) {
    return new olstyle.Style({
        image: new olstyle.Icon({
            src: './assets/igo2/geo/icons/cross_black_18px.svg',
            imgSize: [18, 18],
        }),
        text: new olstyle.Text({
            text: feature.get('pointerSummary'),
            textAlign: 'left',
            textBaseline: 'bottom',
            font: '12px Calibri,sans-serif',
            fill: new olstyle.Fill({ color: '#000' }),
            backgroundFill: new olstyle.Fill({ color: 'rgba(255, 255, 255, 0.5)' }),
            backgroundStroke: new olstyle.Stroke({ color: 'rgba(200, 200, 200, 0.75)', width: 2 }),
            stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
            overflow: true,
            offsetX: 10,
            offsetY: -10,
            padding: [2.5, 2.5, 2.5, 2.5]
        })
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXBvaW50ZXItc3VtbWFyeS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zZWFyY2gtcG9pbnRlci1zdW1tYXJ5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsSUFBSSxFQUVKLFlBQVksRUFFYixNQUFNLGVBQWUsQ0FBQztBQVF2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUVsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFHMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSwrQkFBK0Is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QUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1lBQ3pDLGNBQWMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQztZQUN2RSxnQkFBZ0IsRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsMkJBQTJCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3RGLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN2RCxRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNaLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztTQUM5QixDQUFDO0tBQ0gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBTZWxmLFxyXG4gIE9uSW5pdCxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNYXBCcm93c2VyUG9pbnRlckV2ZW50IGFzIE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7IExpc3RlbmVyRnVuY3Rpb24gfSBmcm9tICdvbC9ldmVudHMnO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbWFwL21hcC1icm93c2VyL21hcC1icm93c2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2guc2VydmljZSc7XHJcblxyXG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgeyB0cmFuc2Zvcm0gfSBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCAqIGFzIG9sZ2VvbSBmcm9tICdvbC9nZW9tJztcclxuaW1wb3J0IE9sR2VvSlNPTiBmcm9tICdvbC9mb3JtYXQvR2VvSlNPTic7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQsIFJlc2VhcmNoIH0gZnJvbSAnLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEVudGl0eVN0b3JlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvdmVjdG9yLWxheWVyJztcclxuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgdHJ5QmluZFN0b3JlTGF5ZXIgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLnV0aWxzJztcclxuaW1wb3J0IHsgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvc3RvcmUnO1xyXG5pbXBvcnQgeyBGZWF0dXJlTW90aW9uLCBGRUFUVVJFIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5lbnVtcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZVNlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC1zb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IHNvdXJjZUNhblJldmVyc2VTZWFyY2hBc1N1bW1hcnkgfSBmcm9tICcuL3NlYXJjaC51dGlscyc7XHJcbmltcG9ydCB7IE1lZGlhU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZGlyZWN0aXZlIG1ha2VzIHRoZSBtb3VzZSBjb29yZGluYXRlIHRyaWdnZXIgYSByZXZlcnNlIHNlYXJjaCBvbiBhdmFpbGFibGUgc2VhcmNoIHNvdXJjZXMuXHJcbiAqIFRoZSBzZWFyY2ggcmVzdWx0cyBhcmUgcGxhY2VkIGludG8gYSBsYWJlbCwgb24gYSBjcm9zcyBpY29uLCByZXByZXNlbnRpbmcgdGhlIG1vdXNlIGNvb3JkaW5hdGUuXHJcbiAqIEJ5IGRlZmF1bHQsIG5vIHNlYXJjaCBzb3VyY2VzLiBDb25maWcgaW4gY29uZmlnIGZpbGUgbXVzdCBiZSBkZWZpbmVkLlxyXG4gKiB0aGUgbGF5ZXIgbGV2ZWwuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29TZWFyY2hQb2ludGVyU3VtbWFyeV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hQb2ludGVyU3VtbWFyeURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlckNvbnRlbnRDaGVja2VkIHtcclxuXHJcbiAgcHVibGljIHN0b3JlOiBGZWF0dXJlU3RvcmU8RmVhdHVyZT47XHJcbiAgcHJpdmF0ZSBsb25MYXQ6IFtudW1iZXIsIG51bWJlcl07XHJcbiAgcHJpdmF0ZSBwb2ludGVyU2VhcmNoU3RvcmU6IEVudGl0eVN0b3JlPFNlYXJjaFJlc3VsdD4gPSBuZXcgRW50aXR5U3RvcmU8U2VhcmNoUmVzdWx0PihbXSk7XHJcbiAgcHJpdmF0ZSBsYXN0VGltZW91dFJlcXVlc3Q7XHJcbiAgcHJpdmF0ZSBzdG9yZSQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSByZXZlcnNlU2VhcmNoJCQ6IFN1YnNjcmlwdGlvbltdID0gW107XHJcbiAgcHJpdmF0ZSBoYXNQb2ludGVyUmV2ZXJzZVNlYXJjaFNvdXJjZTogYm9vbGVhbiA9ICBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVuZXIgdG8gdGhlIHBvaW50ZXIgbW92ZSBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcG9pbnRlck1vdmVMaXN0ZW5lcjogTGlzdGVuZXJGdW5jdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBzZWFyY2hQb2ludGVyU3VtbWFyeUZlYXR1cmVJZDogc3RyaW5nID0gJ3NlYXJjaFBvaW50ZXJTdW1tYXJ5RmVhdHVyZUlkJztcclxuICAvKipcclxuICAgKiBUaGUgZGVsYXkgd2hlcmUgdGhlIG1vdXNlIG11c3QgYmUgbW90aW9ubGVzcyBiZWZvcmUgdHJpZ2dlciB0aGUgcmV2ZXJzZSBzZWFyY2hcclxuICAgKi9cclxuICBASW5wdXQoKSBpZ29TZWFyY2hQb2ludGVyU3VtbWFyeURlbGF5OiBudW1iZXIgPSAxMDAwO1xyXG5cclxuICAvKipcclxuICAgKiBJZiB0aGUgdXNlciBoYXMgZW5hYmxlZCBvciBub3QgdGhlIGRpcmVjdGl2ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGlnb1NlYXJjaFBvaW50ZXJTdW1tYXJ5RW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZW91dCcpXHJcbiAgbW91c2VvdXQoKSB7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5sYXN0VGltZW91dFJlcXVlc3QpO1xyXG4gICAgdGhpcy5jbGVhckxheWVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJR08gbWFwXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Lm1hcDtcclxuICB9XHJcblxyXG4gIGdldCBtYXBQcm9qZWN0aW9uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMuY29tcG9uZW50Lm1hcCBhcyBJZ29NYXApLnByb2plY3Rpb247XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgcHJpdmF0ZSBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNlYXJjaFNvdXJjZVNlcnZpY2U6IFNlYXJjaFNvdXJjZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lZGlhU2VydmljZTogTWVkaWFTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgbGlzdGVuaW5nIHRvIHBvaW50ZXJtb3ZlIGFuZCByZXZlcnNlIHNlYXJjaCByZXN1bHRzLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5saXN0ZW5Ub01hcFBvaW50ZXJNb3ZlKCk7XHJcbiAgICB0aGlzLnN1YnNjcmliZVRvUG9pbnRlclN0b3JlKCk7XHJcblxyXG4gICAgdGhpcy5tYXAuc3RhdHVzJC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmUgPSBuZXcgRmVhdHVyZVN0b3JlPEZlYXR1cmU+KFtdLCB7bWFwOiB0aGlzLm1hcH0pO1xyXG4gICAgICB0aGlzLmluaXRTdG9yZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBwb2ludGVyIHBvc2l0aW9uIHN0b3JlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpbml0U3RvcmUoKSB7XHJcbiAgICBjb25zdCBzdG9yZSA9IHRoaXMuc3RvcmU7XHJcblxyXG4gICAgY29uc3QgbGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgICB0aXRsZTogJ3NlYXJjaFBvaW50ZXJTdW1tYXJ5JyxcclxuICAgICAgekluZGV4OiA5MDAsXHJcbiAgICAgIHNvdXJjZTogbmV3IEZlYXR1cmVEYXRhU291cmNlKCksXHJcbiAgICAgIHNob3dJbkxheWVyTGlzdDogZmFsc2UsXHJcbiAgICAgIGV4cG9ydGFibGU6IGZhbHNlLFxyXG4gICAgICBicm93c2FibGU6IGZhbHNlLFxyXG4gICAgICBzdHlsZTogcG9pbnRlclBvc2l0aW9uU3VtbWFyeU1hcmtlclxyXG4gICAgfSk7XHJcbiAgICB0cnlCaW5kU3RvcmVMYXllcihzdG9yZSwgbGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xyXG4gICAgICBpZiAoIXRoaXMuc2VhcmNoU291cmNlU2VydmljZS5nZXRFbmFibGVkU291cmNlcygpLmZpbHRlcihzb3VyY2VDYW5SZXZlcnNlU2VhcmNoQXNTdW1tYXJ5KS5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLmhhc1BvaW50ZXJSZXZlcnNlU2VhcmNoU291cmNlID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5oYXNQb2ludGVyUmV2ZXJzZVNlYXJjaFNvdXJjZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBsaXN0ZW5pbmcgdG8gcG9pbnRlcm1vdmUgYW5kIHJldmVyc2Ugc2VhcmNoIHJlc3VsdHMuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnVubGlzdGVuVG9NYXBQb2ludGVyTW92ZSgpO1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVRvUG9pbnRlclN0b3JlKCk7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlUmV2ZXJzZVNlYXJjaCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIHBvaW50ZXJtb3ZlIHJlc3VsdCBzdG9yZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHN1YnNjcmliZVRvUG9pbnRlclN0b3JlKCkge1xyXG4gICAgdGhpcy5zdG9yZSQkID0gdGhpcy5wb2ludGVyU2VhcmNoU3RvcmUuZW50aXRpZXMkLnN1YnNjcmliZShyZXN1bHRzVW5kZXJQb2ludGVyUG9zaXRpb24gPT4ge1xyXG4gICAgICB0aGlzLmVudGl0aWVzVG9Qb2ludGVyT3ZlcmxheShyZXN1bHRzVW5kZXJQb2ludGVyUG9zaXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCdWlsZCBhbiBvYmplY3QgYmFzZWQgb24gdGhlIGNsb3Nlc3QgZmVhdHVyZSBieSB0eXBlIChiYXNlIG9uIHR5cGUgYW5kIGRpc3RhbmNlIHByb3BlcnRpZXMgKVxyXG4gICAqIEBwYXJhbSByZXN1bHRzIFNlYXJjaFJlc3VsdFtdXHJcbiAgICogQHJldHVybnMgT0wgc3R5bGUgZnVuY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIGNvbXB1dGVTdW1tYXJ5Q2xvc2VzdEZlYXR1cmUocmVzdWx0czogU2VhcmNoUmVzdWx0W10pOiB7fSB7XHJcbiAgICBjb25zdCBjbG9zZXN0UmVzdWx0QnlUeXBlID0ge307XHJcblxyXG4gICAgcmVzdWx0cy5tYXAocmVzdWx0ID0+IHtcclxuICAgICAgaWYgKHJlc3VsdC5kYXRhLnByb3BlcnRpZXMudHlwZSAmJiByZXN1bHQuZGF0YS5wcm9wZXJ0aWVzLmRpc3RhbmNlID49IDApIHtcclxuICAgICAgICBpZiAoY2xvc2VzdFJlc3VsdEJ5VHlwZS5oYXNPd25Qcm9wZXJ0eShyZXN1bHQuZGF0YS5wcm9wZXJ0aWVzLnR5cGUpKSB7XHJcbiAgICAgICAgICBjb25zdCBwcmV2RGlzdGFuY2UgPSBjbG9zZXN0UmVzdWx0QnlUeXBlW3Jlc3VsdC5kYXRhLnByb3BlcnRpZXMudHlwZV0uZGlzdGFuY2U7XHJcbiAgICAgICAgICBpZiAocmVzdWx0LmRhdGEucHJvcGVydGllcy5kaXN0YW5jZSA8IHByZXZEaXN0YW5jZSkge1xyXG4gICAgICAgICAgICBjbG9zZXN0UmVzdWx0QnlUeXBlW3Jlc3VsdC5kYXRhLnByb3BlcnRpZXMudHlwZV0gPSB7IGRpc3RhbmNlOiByZXN1bHQuZGF0YS5wcm9wZXJ0aWVzLmRpc3RhbmNlLCB0aXRsZTogcmVzdWx0Lm1ldGEudGl0bGUgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2xvc2VzdFJlc3VsdEJ5VHlwZVtyZXN1bHQuZGF0YS5wcm9wZXJ0aWVzLnR5cGVdID0geyBkaXN0YW5jZTogcmVzdWx0LmRhdGEucHJvcGVydGllcy5kaXN0YW5jZSwgdGl0bGU6IHJlc3VsdC5tZXRhLnRpdGxlIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY2xvc2VzdFJlc3VsdEJ5VHlwZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNvbnZlcnQgc3RvcmUgZW50aXRpZXMgdG8gYSBwb2ludGVyIHBvc2l0aW9uIG92ZXJsYXkgd2l0aCBsYWJlbCBzdW1tYXJ5IG9uLlxyXG4gICAqIEBwYXJhbSBldmVudCBPTCBtYXAgYnJvd3NlciBwb2ludGVyIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBlbnRpdGllc1RvUG9pbnRlck92ZXJsYXkocmVzdWx0c1VuZGVyUG9pbnRlclBvc2l0aW9uOiBTZWFyY2hSZXN1bHRbXSkge1xyXG4gICAgY29uc3QgY2xvc2VzdFJlc3VsdEJ5VHlwZSA9IHRoaXMuY29tcHV0ZVN1bW1hcnlDbG9zZXN0RmVhdHVyZShyZXN1bHRzVW5kZXJQb2ludGVyUG9zaXRpb24pO1xyXG4gICAgY29uc3Qgc3VtbWFyaXplZENsb3Nlc3RUeXBlID0gT2JqZWN0LmtleXMoY2xvc2VzdFJlc3VsdEJ5VHlwZSk7XHJcbiAgICBjb25zdCBwcm9jZXNzZWRTdW1tYXJpemVkQ2xvc2VzdFR5cGUgPSBbXTtcclxuICAgIGNvbnN0IHN1bW1hcnkgPSBbXTtcclxuICAgIHJlc3VsdHNVbmRlclBvaW50ZXJQb3NpdGlvbi5tYXAocmVzdWx0ID0+IHtcclxuICAgICAgY29uc3QgdHlwZUluZGV4ID0gc3VtbWFyaXplZENsb3Nlc3RUeXBlLmluZGV4T2YocmVzdWx0LmRhdGEucHJvcGVydGllcy50eXBlKTtcclxuICAgICAgaWYgKHR5cGVJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICBzdW1tYXJ5LnB1c2goY2xvc2VzdFJlc3VsdEJ5VHlwZVtyZXN1bHQuZGF0YS5wcm9wZXJ0aWVzLnR5cGVdLnRpdGxlKTtcclxuICAgICAgICBzdW1tYXJpemVkQ2xvc2VzdFR5cGUuc3BsaWNlKHR5cGVJbmRleCwgMSk7XHJcbiAgICAgICAgcHJvY2Vzc2VkU3VtbWFyaXplZENsb3Nlc3RUeXBlLnB1c2gocmVzdWx0LmRhdGEucHJvcGVydGllcy50eXBlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAocHJvY2Vzc2VkU3VtbWFyaXplZENsb3Nlc3RUeXBlLmluZGV4T2YocmVzdWx0LmRhdGEucHJvcGVydGllcy50eXBlKSA9PT0gLTEpIHtcclxuICAgICAgICAgIHN1bW1hcnkucHVzaChyZXN1bHQubWV0YS50aXRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChzdW1tYXJ5Lmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmFkZFBvaW50ZXJPdmVybGF5KHN1bW1hcnkuam9pbignXFxuJykpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gbWFwIHBvaW50ZXJtb3ZlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaXN0ZW5Ub01hcFBvaW50ZXJNb3ZlKCkge1xyXG4gICAgdGhpcy5wb2ludGVyTW92ZUxpc3RlbmVyID0gdGhpcy5tYXAub2wub24oXHJcbiAgICAgICdwb2ludGVybW92ZScsXHJcbiAgICAgIChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSA9PiB0aGlzLm9uTWFwRXZlbnQoZXZlbnQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgdG8gcG9pbnRlciBzdG9yZS5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICB1bnN1YnNjcmliZVRvUG9pbnRlclN0b3JlKCkge1xyXG4gICAgdGhpcy5zdG9yZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIHRvIHJldmVyc2Ugc2VhdGNoIHN0b3JlLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHVuc3Vic2NyaWJlUmV2ZXJzZVNlYXJjaCgpIHtcclxuICAgIHRoaXMucmV2ZXJzZVNlYXJjaCQkLm1hcChzID0+IHMudW5zdWJzY3JpYmUoKSk7XHJcbiAgICB0aGlzLnJldmVyc2VTZWFyY2gkJCA9IFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBsaXN0ZW5pbmcgZm9yIG1hcCBwb2ludGVybW92ZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5saXN0ZW5Ub01hcFBvaW50ZXJNb3ZlKCkge1xyXG4gICAgdGhpcy5tYXAub2wudW4odGhpcy5wb2ludGVyTW92ZUxpc3RlbmVyLnR5cGUsIHRoaXMucG9pbnRlck1vdmVMaXN0ZW5lci5saXN0ZW5lcik7XHJcbiAgICB0aGlzLnBvaW50ZXJNb3ZlTGlzdGVuZXIgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmlnZ2VyIHJldmVyc2Ugc2VhcmNoIHdoZW4gdGhlIG1vdXNlIGlzIG1vdGlvbmxlc3MgZHVyaW5nIHRoZSBkZWZpbmVkIGRlbGF5IChwb2ludGVyTW92ZURlbGF5KS5cclxuICAgKiBAcGFyYW0gZXZlbnQgT0wgbWFwIGJyb3dzZXIgcG9pbnRlciBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25NYXBFdmVudChldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGV2ZW50LmRyYWdnaW5nIHx8ICF0aGlzLmlnb1NlYXJjaFBvaW50ZXJTdW1tYXJ5RW5hYmxlZCB8fFxyXG4gICAgICAhdGhpcy5oYXNQb2ludGVyUmV2ZXJzZVNlYXJjaFNvdXJjZSB8fCB0aGlzLm1lZGlhU2VydmljZS5pc1RvdWNoU2NyZWVuKCkpIHtcclxuICAgICAgdGhpcy5jbGVhckxheWVyKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgdGhpcy5sYXN0VGltZW91dFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7IC8vIGNhbmNlbCB0aW1lb3V0IHdoZW4gdGhlIG1vdXNlIG1vdmVzXHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmxhc3RUaW1lb3V0UmVxdWVzdCk7XHJcbiAgICAgIHRoaXMuY2xlYXJMYXllcigpO1xyXG4gICAgICB0aGlzLnVuc3Vic2NyaWJlUmV2ZXJzZVNlYXJjaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9uTGF0ID0gdHJhbnNmb3JtKGV2ZW50LmNvb3JkaW5hdGUsIHRoaXMubWFwUHJvamVjdGlvbiwgJ0VQU0c6NDMyNicpO1xyXG5cclxuICAgIHRoaXMubGFzdFRpbWVvdXRSZXF1ZXN0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMub25TZWFyY2hDb29yZGluYXRlKCk7XHJcbiAgICB9LCB0aGlzLmlnb1NlYXJjaFBvaW50ZXJTdW1tYXJ5RGVsYXkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblNlYXJjaENvb3JkaW5hdGUoKSB7XHJcbiAgICB0aGlzLnBvaW50ZXJTZWFyY2hTdG9yZS5jbGVhcigpO1xyXG4gICAgY29uc3QgcmVzdWx0cyA9IHRoaXMuc2VhcmNoU2VydmljZS5yZXZlcnNlU2VhcmNoKHRoaXMubG9uTGF0LCB7IHBhcmFtczogeyBnZW9tZXRyeTogJ2ZhbHNlJywgaWNvbjogJ2ZhbHNlJyB9IH0sIHRydWUpO1xyXG5cclxuICAgIGZvciAoY29uc3QgaSBpbiByZXN1bHRzKSB7XHJcbiAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLnJldmVyc2VTZWFyY2gkJC5wdXNoKFxyXG4gICAgICAgICAgcmVzdWx0c1tpXS5yZXF1ZXN0LnN1YnNjcmliZSgoX3Jlc3VsdHM6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25TZWFyY2goeyByZXNlYXJjaDogcmVzdWx0c1tpXSwgcmVzdWx0czogX3Jlc3VsdHMgfSk7XHJcbiAgICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25TZWFyY2goZXZlbnQ6IHsgcmVzZWFyY2g6IFJlc2VhcmNoOyByZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSB9KSB7XHJcbiAgICBjb25zdCByZXN1bHRzID0gZXZlbnQucmVzdWx0cztcclxuICAgIGNvbnN0IG5ld1Jlc3VsdHMgPSB0aGlzLnBvaW50ZXJTZWFyY2hTdG9yZS5hbGwoKVxyXG4gICAgICAuZmlsdGVyKChyZXN1bHQ6IFNlYXJjaFJlc3VsdCkgPT4gcmVzdWx0LnNvdXJjZSAhPT0gZXZlbnQucmVzZWFyY2guc291cmNlKVxyXG4gICAgICAuY29uY2F0KHJlc3VsdHMpO1xyXG4gICAgdGhpcy5wb2ludGVyU2VhcmNoU3RvcmUubG9hZChuZXdSZXN1bHRzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGZlYXR1cmUgdG8gdGhlIHBvaW50ZXIgc3RvcmVcclxuICAgKiBAcGFyYW0gdGV4dCBzdHJpbmdcclxuICAgKi9cclxuICBwcml2YXRlIGFkZFBvaW50ZXJPdmVybGF5KHRleHQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5jbGVhckxheWVyKCk7XHJcblxyXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgb2xnZW9tLlBvaW50KFxyXG4gICAgICB0cmFuc2Zvcm0odGhpcy5sb25MYXQsICdFUFNHOjQzMjYnLCB0aGlzLm1hcFByb2plY3Rpb24pXHJcbiAgICApO1xyXG4gICAgY29uc3QgZmVhdHVyZSA9IG5ldyBvbEZlYXR1cmUoeyBnZW9tZXRyeSB9KTtcclxuICAgIGNvbnN0IGdlb2pzb25HZW9tID0gbmV3IE9sR2VvSlNPTigpLndyaXRlR2VvbWV0cnlPYmplY3QoZ2VvbWV0cnksIHtcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHRoaXMubWFwUHJvamVjdGlvbixcclxuICAgICAgZGF0YVByb2plY3Rpb246IHRoaXMubWFwUHJvamVjdGlvblxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgZjogRmVhdHVyZSA9IHtcclxuICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgZ2VvbWV0cnk6IGdlb2pzb25HZW9tLFxyXG4gICAgICBwcm9qZWN0aW9uOiB0aGlzLm1hcFByb2plY3Rpb24sXHJcbiAgICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBpZDogdGhpcy5zZWFyY2hQb2ludGVyU3VtbWFyeUZlYXR1cmVJZCxcclxuICAgICAgICBwb2ludGVyU3VtbWFyeTogdGV4dFxyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgaWQ6IHRoaXMuc2VhcmNoUG9pbnRlclN1bW1hcnlGZWF0dXJlSWRcclxuICAgICAgfSxcclxuICAgICAgb2w6IGZlYXR1cmVcclxuICAgIH07XHJcbiAgICB0aGlzLnN0b3JlLnNldExheWVyRmVhdHVyZXMoW2ZdLCBGZWF0dXJlTW90aW9uLk5vbmUpO1xyXG4gIH1cclxuXHJcbi8qKlxyXG4gKiBDbGVhciB0aGUgcG9pbnRlciBzdG9yZSBmZWF0dXJlc1xyXG4gKi9cclxucHJpdmF0ZSBjbGVhckxheWVyKCkge1xyXG4gIGlmICh0aGlzLnN0b3JlKSB7XHJcbiAgICB0aGlzLnN0b3JlLmNsZWFyTGF5ZXIoKTtcclxuICB9XHJcbn1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBkZWZhdWx0IHN0eWxlIGZvciB0aGUgcG9pbnRlciBwb3NpdGlvbiBhbmQgaXQncyBsYWJlbCBzdW1tYXJ5LlxyXG4gKiBAcGFyYW0gZmVhdHVyZSBPbEZlYXR1cmVcclxuICogQHJldHVybnMgT0wgc3R5bGUgZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwb2ludGVyUG9zaXRpb25TdW1tYXJ5TWFya2VyKGZlYXR1cmU6IG9sRmVhdHVyZSwgcmVzb2x1dGlvbjogbnVtYmVyKTogb2xzdHlsZS5TdHlsZSB7XHJcbiAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgIGltYWdlOiBuZXcgb2xzdHlsZS5JY29uKHtcclxuICAgICAgc3JjOiAnLi9hc3NldHMvaWdvMi9nZW8vaWNvbnMvY3Jvc3NfYmxhY2tfMThweC5zdmcnLFxyXG4gICAgICBpbWdTaXplOiBbMTgsIDE4XSwgLy8gZm9yIGllXHJcbiAgICB9KSxcclxuXHJcbiAgICB0ZXh0OiBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgdGV4dDogZmVhdHVyZS5nZXQoJ3BvaW50ZXJTdW1tYXJ5JyksXHJcbiAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxyXG4gICAgICB0ZXh0QmFzZWxpbmU6ICdib3R0b20nLFxyXG4gICAgICBmb250OiAnMTJweCBDYWxpYnJpLHNhbnMtc2VyaWYnLFxyXG4gICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHsgY29sb3I6ICcjMDAwJyB9KSxcclxuICAgICAgYmFja2dyb3VuZEZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoeyBjb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC41KScgfSksXHJcbiAgICAgIGJhY2tncm91bmRTdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7IGNvbG9yOiAncmdiYSgyMDAsIDIwMCwgMjAwLCAwLjc1KScsIHdpZHRoOiAyIH0pLFxyXG4gICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7IGNvbG9yOiAnI2ZmZicsIHdpZHRoOiAzIH0pLFxyXG4gICAgICBvdmVyZmxvdzogdHJ1ZSxcclxuICAgICAgb2Zmc2V0WDogMTAsXHJcbiAgICAgIG9mZnNldFk6IC0xMCxcclxuICAgICAgcGFkZGluZzogWzIuNSwgMi41LCAyLjUsIDIuNV1cclxuICAgIH0pXHJcbiAgfSk7XHJcbn1cclxuIl19