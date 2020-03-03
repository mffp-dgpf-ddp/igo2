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
var SearchPointerSummaryDirective = /** @class */ (function () {
    function SearchPointerSummaryDirective(component, searchService, searchSourceService, mediaService) {
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
    SearchPointerSummaryDirective.prototype.mouseout = /**
     * @return {?}
     */
    function () {
        clearTimeout(this.lastTimeoutRequest);
        this.clearLayer();
    };
    Object.defineProperty(SearchPointerSummaryDirective.prototype, "map", {
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
            return this.component.map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchPointerSummaryDirective.prototype, "mapProjection", {
        get: /**
         * @return {?}
         */
        function () {
            return ((/** @type {?} */ (this.component.map))).projection;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Start listening to pointermove and reverse search results.
     * @internal
     */
    /**
     * Start listening to pointermove and reverse search results.
     * \@internal
     * @return {?}
     */
    SearchPointerSummaryDirective.prototype.ngOnInit = /**
     * Start listening to pointermove and reverse search results.
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this.listenToMapPointerMove();
        this.subscribeToPointerStore();
        this.map.status$.pipe(take(1)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.store = new FeatureStore([], { map: _this.map });
            _this.initStore();
        }));
    };
    /**
     * Initialize the pointer position store
     * @internal
     */
    /**
     * Initialize the pointer position store
     * \@internal
     * @private
     * @return {?}
     */
    SearchPointerSummaryDirective.prototype.initStore = /**
     * Initialize the pointer position store
     * \@internal
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var store = this.store;
        /** @type {?} */
        var layer = new VectorLayer({
            title: 'searchPointerSummary',
            zIndex: 900,
            source: new FeatureDataSource(),
            showInLayerList: false,
            exportable: false,
            browsable: false,
            style: pointerPositionSummaryMarker
        });
        tryBindStoreLayer(store, layer);
    };
    /**
     * @return {?}
     */
    SearchPointerSummaryDirective.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        if (!this.searchSourceService.getEnabledSources().filter(sourceCanReverseSearchAsSummary).length) {
            this.hasPointerReverseSearchSource = false;
        }
        else {
            this.hasPointerReverseSearchSource = true;
        }
    };
    /**
     * Stop listening to pointermove and reverse search results.
     * @internal
     */
    /**
     * Stop listening to pointermove and reverse search results.
     * \@internal
     * @return {?}
     */
    SearchPointerSummaryDirective.prototype.ngOnDestroy = /**
     * Stop listening to pointermove and reverse search results.
     * \@internal
     * @return {?}
     */
    function () {
        this.unlistenToMapPointerMove();
        this.unsubscribeToPointerStore();
        this.unsubscribeReverseSearch();
    };
    /**
     * Subscribe to pointermove result store
     * @internal
     */
    /**
     * Subscribe to pointermove result store
     * \@internal
     * @return {?}
     */
    SearchPointerSummaryDirective.prototype.subscribeToPointerStore = /**
     * Subscribe to pointermove result store
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this.store$$ = this.pointerSearchStore.entities$.subscribe((/**
         * @param {?} resultsUnderPointerPosition
         * @return {?}
         */
        function (resultsUnderPointerPosition) {
            _this.entitiesToPointerOverlay(resultsUnderPointerPosition);
        }));
    };
    /**
     * Build an object based on the closest feature by type (base on type and distance properties )
     * @param results SearchResult[]
     * @returns OL style function
     */
    /**
     * Build an object based on the closest feature by type (base on type and distance properties )
     * @private
     * @param {?} results SearchResult[]
     * @return {?} OL style function
     */
    SearchPointerSummaryDirective.prototype.computeSummaryClosestFeature = /**
     * Build an object based on the closest feature by type (base on type and distance properties )
     * @private
     * @param {?} results SearchResult[]
     * @return {?} OL style function
     */
    function (results) {
        /** @type {?} */
        var closestResultByType = {};
        results.map((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            if (result.data.properties.type && result.data.properties.distance >= 0) {
                if (closestResultByType.hasOwnProperty(result.data.properties.type)) {
                    /** @type {?} */
                    var prevDistance = closestResultByType[result.data.properties.type].distance;
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
    };
    /**
     * convert store entities to a pointer position overlay with label summary on.
     * @param event OL map browser pointer event
     */
    /**
     * convert store entities to a pointer position overlay with label summary on.
     * @private
     * @param {?} resultsUnderPointerPosition
     * @return {?}
     */
    SearchPointerSummaryDirective.prototype.entitiesToPointerOverlay = /**
     * convert store entities to a pointer position overlay with label summary on.
     * @private
     * @param {?} resultsUnderPointerPosition
     * @return {?}
     */
    function (resultsUnderPointerPosition) {
        /** @type {?} */
        var closestResultByType = this.computeSummaryClosestFeature(resultsUnderPointerPosition);
        /** @type {?} */
        var summarizedClosestType = Object.keys(closestResultByType);
        /** @type {?} */
        var processedSummarizedClosestType = [];
        /** @type {?} */
        var summary = [];
        resultsUnderPointerPosition.map((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            /** @type {?} */
            var typeIndex = summarizedClosestType.indexOf(result.data.properties.type);
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
    };
    /**
     * On map pointermove
     */
    /**
     * On map pointermove
     * @private
     * @return {?}
     */
    SearchPointerSummaryDirective.prototype.listenToMapPointerMove = /**
     * On map pointermove
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.pointerMoveListener = this.map.ol.on('pointermove', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onMapEvent(event); }));
    };
    /**
     * Unsubscribe to pointer store.
     * @internal
     */
    /**
     * Unsubscribe to pointer store.
     * \@internal
     * @return {?}
     */
    SearchPointerSummaryDirective.prototype.unsubscribeToPointerStore = /**
     * Unsubscribe to pointer store.
     * \@internal
     * @return {?}
     */
    function () {
        this.store$$.unsubscribe();
    };
    /**
     * Unsubscribe to reverse seatch store.
     * @internal
     */
    /**
     * Unsubscribe to reverse seatch store.
     * \@internal
     * @return {?}
     */
    SearchPointerSummaryDirective.prototype.unsubscribeReverseSearch = /**
     * Unsubscribe to reverse seatch store.
     * \@internal
     * @return {?}
     */
    function () {
        this.reverseSearch$$.map((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.unsubscribe(); }));
        this.reverseSearch$$ = [];
    };
    /**
     * Stop listening for map pointermove
     * @internal
     */
    /**
     * Stop listening for map pointermove
     * \@internal
     * @private
     * @return {?}
     */
    SearchPointerSummaryDirective.prototype.unlistenToMapPointerMove = /**
     * Stop listening for map pointermove
     * \@internal
     * @private
     * @return {?}
     */
    function () {
        this.map.ol.un(this.pointerMoveListener.type, this.pointerMoveListener.listener);
        this.pointerMoveListener = undefined;
    };
    /**
     * Trigger reverse search when the mouse is motionless during the defined delay (pointerMoveDelay).
     * @param event OL map browser pointer event
     */
    /**
     * Trigger reverse search when the mouse is motionless during the defined delay (pointerMoveDelay).
     * @private
     * @param {?} event OL map browser pointer event
     * @return {?}
     */
    SearchPointerSummaryDirective.prototype.onMapEvent = /**
     * Trigger reverse search when the mouse is motionless during the defined delay (pointerMoveDelay).
     * @private
     * @param {?} event OL map browser pointer event
     * @return {?}
     */
    function (event) {
        var _this = this;
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
        function () {
            _this.onSearchCoordinate();
        }), this.igoSearchPointerSummaryDelay);
    };
    /**
     * @private
     * @return {?}
     */
    SearchPointerSummaryDirective.prototype.onSearchCoordinate = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.pointerSearchStore.clear();
        /** @type {?} */
        var results = this.searchService.reverseSearch(this.lonLat, { params: { geometry: 'false', icon: 'false' } }, true);
        var _loop_1 = function (i) {
            if (results.length > 0) {
                this_1.reverseSearch$$.push(results[i].request.subscribe((/**
                 * @param {?} _results
                 * @return {?}
                 */
                function (_results) {
                    _this.onSearch({ research: results[i], results: _results });
                })));
            }
        };
        var this_1 = this;
        for (var i in results) {
            _loop_1(i);
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    SearchPointerSummaryDirective.prototype.onSearch = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var results = event.results;
        /** @type {?} */
        var newResults = this.pointerSearchStore.all()
            .filter((/**
         * @param {?} result
         * @return {?}
         */
        function (result) { return result.source !== event.research.source; }))
            .concat(results);
        this.pointerSearchStore.load(newResults);
    };
    /**
     * Add a feature to the pointer store
     * @param text string
     */
    /**
     * Add a feature to the pointer store
     * @private
     * @param {?} text string
     * @return {?}
     */
    SearchPointerSummaryDirective.prototype.addPointerOverlay = /**
     * Add a feature to the pointer store
     * @private
     * @param {?} text string
     * @return {?}
     */
    function (text) {
        this.clearLayer();
        /** @type {?} */
        var geometry = new olgeom.Point(transform(this.lonLat, 'EPSG:4326', this.mapProjection));
        /** @type {?} */
        var feature = new olFeature({ geometry: geometry });
        /** @type {?} */
        var geojsonGeom = new OlGeoJSON().writeGeometryObject(geometry, {
            featureProjection: this.mapProjection,
            dataProjection: this.mapProjection
        });
        /** @type {?} */
        var f = {
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
    };
    /**
     * Clear the pointer store features
     */
    /**
     * Clear the pointer store features
     * @private
     * @return {?}
     */
    SearchPointerSummaryDirective.prototype.clearLayer = /**
     * Clear the pointer store features
     * @private
     * @return {?}
     */
    function () {
        if (this.store) {
            this.store.clearLayer();
        }
    };
    SearchPointerSummaryDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoSearchPointerSummary]'
                },] }
    ];
    /** @nocollapse */
    SearchPointerSummaryDirective.ctorParameters = function () { return [
        { type: MapBrowserComponent, decorators: [{ type: Self }] },
        { type: SearchService },
        { type: SearchSourceService },
        { type: MediaService }
    ]; };
    SearchPointerSummaryDirective.propDecorators = {
        igoSearchPointerSummaryDelay: [{ type: Input }],
        igoSearchPointerSummaryEnabled: [{ type: Input }],
        mouseout: [{ type: HostListener, args: ['mouseout',] }]
    };
    return SearchPointerSummaryDirective;
}());
export { SearchPointerSummaryDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXBvaW50ZXItc3VtbWFyeS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zZWFyY2gtcG9pbnRlci1zdW1tYXJ5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsSUFBSSxFQUVKLFlBQVksRUFFYixNQUFNLGVBQWUsQ0FBQztBQVF2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUVsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFHMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSwrQkFBK0Is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LENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIFNlbGYsXHJcbiAgT25Jbml0LFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBBZnRlckNvbnRlbnRDaGVja2VkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1hcEJyb3dzZXJQb2ludGVyRXZlbnQgYXMgT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50IH0gZnJvbSAnb2wvTWFwQnJvd3NlckV2ZW50JztcclxuaW1wb3J0IHsgTGlzdGVuZXJGdW5jdGlvbiB9IGZyb20gJ29sL2V2ZW50cyc7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9tYXAvbWFwLWJyb3dzZXIvbWFwLWJyb3dzZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCB7IHRyYW5zZm9ybSB9IGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0ICogYXMgb2xnZW9tIGZyb20gJ29sL2dlb20nO1xyXG5pbXBvcnQgT2xHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCwgUmVzZWFyY2ggfSBmcm9tICcuL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2ZlYXR1cmUtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy92ZWN0b3ItbGF5ZXInO1xyXG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyB0cnlCaW5kU3RvcmVMYXllciB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUudXRpbHMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9zdG9yZSc7XHJcbmltcG9ydCB7IEZlYXR1cmVNb3Rpb24sIEZFQVRVUkUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmVudW1zJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLXNvdXJjZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgc291cmNlQ2FuUmV2ZXJzZVNlYXJjaEFzU3VtbWFyeSB9IGZyb20gJy4vc2VhcmNoLnV0aWxzJztcclxuaW1wb3J0IHsgTWVkaWFTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG4vKipcclxuICogVGhpcyBkaXJlY3RpdmUgbWFrZXMgdGhlIG1vdXNlIGNvb3JkaW5hdGUgdHJpZ2dlciBhIHJldmVyc2Ugc2VhcmNoIG9uIGF2YWlsYWJsZSBzZWFyY2ggc291cmNlcy5cclxuICogVGhlIHNlYXJjaCByZXN1bHRzIGFyZSBwbGFjZWQgaW50byBhIGxhYmVsLCBvbiBhIGNyb3NzIGljb24sIHJlcHJlc2VudGluZyB0aGUgbW91c2UgY29vcmRpbmF0ZS5cclxuICogQnkgZGVmYXVsdCwgbm8gc2VhcmNoIHNvdXJjZXMuIENvbmZpZyBpbiBjb25maWcgZmlsZSBtdXN0IGJlIGRlZmluZWQuXHJcbiAqIHRoZSBsYXllciBsZXZlbC5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb1NlYXJjaFBvaW50ZXJTdW1tYXJ5XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaFBvaW50ZXJTdW1tYXJ5RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudENoZWNrZWQge1xyXG5cclxuICBwdWJsaWMgc3RvcmU6IEZlYXR1cmVTdG9yZTxGZWF0dXJlPjtcclxuICBwcml2YXRlIGxvbkxhdDogW251bWJlciwgbnVtYmVyXTtcclxuICBwcml2YXRlIHBvaW50ZXJTZWFyY2hTdG9yZTogRW50aXR5U3RvcmU8U2VhcmNoUmVzdWx0PiA9IG5ldyBFbnRpdHlTdG9yZTxTZWFyY2hSZXN1bHQ+KFtdKTtcclxuICBwcml2YXRlIGxhc3RUaW1lb3V0UmVxdWVzdDtcclxuICBwcml2YXRlIHN0b3JlJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIHJldmVyc2VTZWFyY2gkJDogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICBwcml2YXRlIGhhc1BvaW50ZXJSZXZlcnNlU2VhcmNoU291cmNlOiBib29sZWFuID0gIGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0ZW5lciB0byB0aGUgcG9pbnRlciBtb3ZlIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBwb2ludGVyTW92ZUxpc3RlbmVyOiBMaXN0ZW5lckZ1bmN0aW9uO1xyXG5cclxuICBwcml2YXRlIHNlYXJjaFBvaW50ZXJTdW1tYXJ5RmVhdHVyZUlkOiBzdHJpbmcgPSAnc2VhcmNoUG9pbnRlclN1bW1hcnlGZWF0dXJlSWQnO1xyXG4gIC8qKlxyXG4gICAqIFRoZSBkZWxheSB3aGVyZSB0aGUgbW91c2UgbXVzdCBiZSBtb3Rpb25sZXNzIGJlZm9yZSB0cmlnZ2VyIHRoZSByZXZlcnNlIHNlYXJjaFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGlnb1NlYXJjaFBvaW50ZXJTdW1tYXJ5RGVsYXk6IG51bWJlciA9IDEwMDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHRoZSB1c2VyIGhhcyBlbmFibGVkIG9yIG5vdCB0aGUgZGlyZWN0aXZlXHJcbiAgICovXHJcbiAgQElucHV0KCkgaWdvU2VhcmNoUG9pbnRlclN1bW1hcnlFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3V0JylcclxuICBtb3VzZW91dCgpIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLmxhc3RUaW1lb3V0UmVxdWVzdCk7XHJcbiAgICB0aGlzLmNsZWFyTGF5ZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIElHTyBtYXBcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnQubWFwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1hcFByb2plY3Rpb24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5jb21wb25lbnQubWFwIGFzIElnb01hcCkucHJvamVjdGlvbjtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBwcml2YXRlIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcclxuICAgIHByaXZhdGUgc2VhcmNoU291cmNlU2VydmljZTogU2VhcmNoU291cmNlU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVkaWFTZXJ2aWNlOiBNZWRpYVNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydCBsaXN0ZW5pbmcgdG8gcG9pbnRlcm1vdmUgYW5kIHJldmVyc2Ugc2VhcmNoIHJlc3VsdHMuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmxpc3RlblRvTWFwUG9pbnRlck1vdmUoKTtcclxuICAgIHRoaXMuc3Vic2NyaWJlVG9Qb2ludGVyU3RvcmUoKTtcclxuXHJcbiAgICB0aGlzLm1hcC5zdGF0dXMkLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5zdG9yZSA9IG5ldyBGZWF0dXJlU3RvcmU8RmVhdHVyZT4oW10sIHttYXA6IHRoaXMubWFwfSk7XHJcbiAgICAgIHRoaXMuaW5pdFN0b3JlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIHBvaW50ZXIgcG9zaXRpb24gc3RvcmVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcml2YXRlIGluaXRTdG9yZSgpIHtcclxuICAgIGNvbnN0IHN0b3JlID0gdGhpcy5zdG9yZTtcclxuXHJcbiAgICBjb25zdCBsYXllciA9IG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICAgIHRpdGxlOiAnc2VhcmNoUG9pbnRlclN1bW1hcnknLFxyXG4gICAgICB6SW5kZXg6IDkwMCxcclxuICAgICAgc291cmNlOiBuZXcgRmVhdHVyZURhdGFTb3VyY2UoKSxcclxuICAgICAgc2hvd0luTGF5ZXJMaXN0OiBmYWxzZSxcclxuICAgICAgZXhwb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgIGJyb3dzYWJsZTogZmFsc2UsXHJcbiAgICAgIHN0eWxlOiBwb2ludGVyUG9zaXRpb25TdW1tYXJ5TWFya2VyXHJcbiAgICB9KTtcclxuICAgIHRyeUJpbmRTdG9yZUxheWVyKHN0b3JlLCBsYXllcik7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XHJcbiAgICAgIGlmICghdGhpcy5zZWFyY2hTb3VyY2VTZXJ2aWNlLmdldEVuYWJsZWRTb3VyY2VzKCkuZmlsdGVyKHNvdXJjZUNhblJldmVyc2VTZWFyY2hBc1N1bW1hcnkpLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuaGFzUG9pbnRlclJldmVyc2VTZWFyY2hTb3VyY2UgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmhhc1BvaW50ZXJSZXZlcnNlU2VhcmNoU291cmNlID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIGxpc3RlbmluZyB0byBwb2ludGVybW92ZSBhbmQgcmV2ZXJzZSBzZWFyY2ggcmVzdWx0cy5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMudW5saXN0ZW5Ub01hcFBvaW50ZXJNb3ZlKCk7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9Qb2ludGVyU3RvcmUoKTtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVSZXZlcnNlU2VhcmNoKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gcG9pbnRlcm1vdmUgcmVzdWx0IHN0b3JlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgc3Vic2NyaWJlVG9Qb2ludGVyU3RvcmUoKSB7XHJcbiAgICB0aGlzLnN0b3JlJCQgPSB0aGlzLnBvaW50ZXJTZWFyY2hTdG9yZS5lbnRpdGllcyQuc3Vic2NyaWJlKHJlc3VsdHNVbmRlclBvaW50ZXJQb3NpdGlvbiA9PiB7XHJcbiAgICAgIHRoaXMuZW50aXRpZXNUb1BvaW50ZXJPdmVybGF5KHJlc3VsdHNVbmRlclBvaW50ZXJQb3NpdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJ1aWxkIGFuIG9iamVjdCBiYXNlZCBvbiB0aGUgY2xvc2VzdCBmZWF0dXJlIGJ5IHR5cGUgKGJhc2Ugb24gdHlwZSBhbmQgZGlzdGFuY2UgcHJvcGVydGllcyApXHJcbiAgICogQHBhcmFtIHJlc3VsdHMgU2VhcmNoUmVzdWx0W11cclxuICAgKiBAcmV0dXJucyBPTCBzdHlsZSBmdW5jdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29tcHV0ZVN1bW1hcnlDbG9zZXN0RmVhdHVyZShyZXN1bHRzOiBTZWFyY2hSZXN1bHRbXSk6IHt9IHtcclxuICAgIGNvbnN0IGNsb3Nlc3RSZXN1bHRCeVR5cGUgPSB7fTtcclxuXHJcbiAgICByZXN1bHRzLm1hcChyZXN1bHQgPT4ge1xyXG4gICAgICBpZiAocmVzdWx0LmRhdGEucHJvcGVydGllcy50eXBlICYmIHJlc3VsdC5kYXRhLnByb3BlcnRpZXMuZGlzdGFuY2UgPj0gMCkge1xyXG4gICAgICAgIGlmIChjbG9zZXN0UmVzdWx0QnlUeXBlLmhhc093blByb3BlcnR5KHJlc3VsdC5kYXRhLnByb3BlcnRpZXMudHlwZSkpIHtcclxuICAgICAgICAgIGNvbnN0IHByZXZEaXN0YW5jZSA9IGNsb3Nlc3RSZXN1bHRCeVR5cGVbcmVzdWx0LmRhdGEucHJvcGVydGllcy50eXBlXS5kaXN0YW5jZTtcclxuICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5wcm9wZXJ0aWVzLmRpc3RhbmNlIDwgcHJldkRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGNsb3Nlc3RSZXN1bHRCeVR5cGVbcmVzdWx0LmRhdGEucHJvcGVydGllcy50eXBlXSA9IHsgZGlzdGFuY2U6IHJlc3VsdC5kYXRhLnByb3BlcnRpZXMuZGlzdGFuY2UsIHRpdGxlOiByZXN1bHQubWV0YS50aXRsZSB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjbG9zZXN0UmVzdWx0QnlUeXBlW3Jlc3VsdC5kYXRhLnByb3BlcnRpZXMudHlwZV0gPSB7IGRpc3RhbmNlOiByZXN1bHQuZGF0YS5wcm9wZXJ0aWVzLmRpc3RhbmNlLCB0aXRsZTogcmVzdWx0Lm1ldGEudGl0bGUgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBjbG9zZXN0UmVzdWx0QnlUeXBlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY29udmVydCBzdG9yZSBlbnRpdGllcyB0byBhIHBvaW50ZXIgcG9zaXRpb24gb3ZlcmxheSB3aXRoIGxhYmVsIHN1bW1hcnkgb24uXHJcbiAgICogQHBhcmFtIGV2ZW50IE9MIG1hcCBicm93c2VyIHBvaW50ZXIgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGVudGl0aWVzVG9Qb2ludGVyT3ZlcmxheShyZXN1bHRzVW5kZXJQb2ludGVyUG9zaXRpb246IFNlYXJjaFJlc3VsdFtdKSB7XHJcbiAgICBjb25zdCBjbG9zZXN0UmVzdWx0QnlUeXBlID0gdGhpcy5jb21wdXRlU3VtbWFyeUNsb3Nlc3RGZWF0dXJlKHJlc3VsdHNVbmRlclBvaW50ZXJQb3NpdGlvbik7XHJcbiAgICBjb25zdCBzdW1tYXJpemVkQ2xvc2VzdFR5cGUgPSBPYmplY3Qua2V5cyhjbG9zZXN0UmVzdWx0QnlUeXBlKTtcclxuICAgIGNvbnN0IHByb2Nlc3NlZFN1bW1hcml6ZWRDbG9zZXN0VHlwZSA9IFtdO1xyXG4gICAgY29uc3Qgc3VtbWFyeSA9IFtdO1xyXG4gICAgcmVzdWx0c1VuZGVyUG9pbnRlclBvc2l0aW9uLm1hcChyZXN1bHQgPT4ge1xyXG4gICAgICBjb25zdCB0eXBlSW5kZXggPSBzdW1tYXJpemVkQ2xvc2VzdFR5cGUuaW5kZXhPZihyZXN1bHQuZGF0YS5wcm9wZXJ0aWVzLnR5cGUpO1xyXG4gICAgICBpZiAodHlwZUluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgIHN1bW1hcnkucHVzaChjbG9zZXN0UmVzdWx0QnlUeXBlW3Jlc3VsdC5kYXRhLnByb3BlcnRpZXMudHlwZV0udGl0bGUpO1xyXG4gICAgICAgIHN1bW1hcml6ZWRDbG9zZXN0VHlwZS5zcGxpY2UodHlwZUluZGV4LCAxKTtcclxuICAgICAgICBwcm9jZXNzZWRTdW1tYXJpemVkQ2xvc2VzdFR5cGUucHVzaChyZXN1bHQuZGF0YS5wcm9wZXJ0aWVzLnR5cGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChwcm9jZXNzZWRTdW1tYXJpemVkQ2xvc2VzdFR5cGUuaW5kZXhPZihyZXN1bHQuZGF0YS5wcm9wZXJ0aWVzLnR5cGUpID09PSAtMSkge1xyXG4gICAgICAgICAgc3VtbWFyeS5wdXNoKHJlc3VsdC5tZXRhLnRpdGxlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKHN1bW1hcnkubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuYWRkUG9pbnRlck92ZXJsYXkoc3VtbWFyeS5qb2luKCdcXG4nKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBtYXAgcG9pbnRlcm1vdmVcclxuICAgKi9cclxuICBwcml2YXRlIGxpc3RlblRvTWFwUG9pbnRlck1vdmUoKSB7XHJcbiAgICB0aGlzLnBvaW50ZXJNb3ZlTGlzdGVuZXIgPSB0aGlzLm1hcC5vbC5vbihcclxuICAgICAgJ3BvaW50ZXJtb3ZlJyxcclxuICAgICAgKGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpID0+IHRoaXMub25NYXBFdmVudChldmVudClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byBwb2ludGVyIHN0b3JlLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHVuc3Vic2NyaWJlVG9Qb2ludGVyU3RvcmUoKSB7XHJcbiAgICB0aGlzLnN0b3JlJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgdG8gcmV2ZXJzZSBzZWF0Y2ggc3RvcmUuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgdW5zdWJzY3JpYmVSZXZlcnNlU2VhcmNoKCkge1xyXG4gICAgdGhpcy5yZXZlcnNlU2VhcmNoJCQubWFwKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICAgIHRoaXMucmV2ZXJzZVNlYXJjaCQkID0gW107XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIGxpc3RlbmluZyBmb3IgbWFwIHBvaW50ZXJtb3ZlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bmxpc3RlblRvTWFwUG9pbnRlck1vdmUoKSB7XHJcbiAgICB0aGlzLm1hcC5vbC51bih0aGlzLnBvaW50ZXJNb3ZlTGlzdGVuZXIudHlwZSwgdGhpcy5wb2ludGVyTW92ZUxpc3RlbmVyLmxpc3RlbmVyKTtcclxuICAgIHRoaXMucG9pbnRlck1vdmVMaXN0ZW5lciA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyaWdnZXIgcmV2ZXJzZSBzZWFyY2ggd2hlbiB0aGUgbW91c2UgaXMgbW90aW9ubGVzcyBkdXJpbmcgdGhlIGRlZmluZWQgZGVsYXkgKHBvaW50ZXJNb3ZlRGVsYXkpLlxyXG4gICAqIEBwYXJhbSBldmVudCBPTCBtYXAgYnJvd3NlciBwb2ludGVyIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1hcEV2ZW50KGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpIHtcclxuICAgIGlmIChcclxuICAgICAgZXZlbnQuZHJhZ2dpbmcgfHwgIXRoaXMuaWdvU2VhcmNoUG9pbnRlclN1bW1hcnlFbmFibGVkIHx8XHJcbiAgICAgICF0aGlzLmhhc1BvaW50ZXJSZXZlcnNlU2VhcmNoU291cmNlIHx8IHRoaXMubWVkaWFTZXJ2aWNlLmlzVG91Y2hTY3JlZW4oKSkge1xyXG4gICAgICB0aGlzLmNsZWFyTGF5ZXIoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxhc3RUaW1lb3V0UmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gY2FuY2VsIHRpbWVvdXQgd2hlbiB0aGUgbW91c2UgbW92ZXNcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubGFzdFRpbWVvdXRSZXF1ZXN0KTtcclxuICAgICAgdGhpcy5jbGVhckxheWVyKCk7XHJcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVSZXZlcnNlU2VhcmNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sb25MYXQgPSB0cmFuc2Zvcm0oZXZlbnQuY29vcmRpbmF0ZSwgdGhpcy5tYXBQcm9qZWN0aW9uLCAnRVBTRzo0MzI2Jyk7XHJcblxyXG4gICAgdGhpcy5sYXN0VGltZW91dFJlcXVlc3QgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5vblNlYXJjaENvb3JkaW5hdGUoKTtcclxuICAgIH0sIHRoaXMuaWdvU2VhcmNoUG9pbnRlclN1bW1hcnlEZWxheSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uU2VhcmNoQ29vcmRpbmF0ZSgpIHtcclxuICAgIHRoaXMucG9pbnRlclNlYXJjaFN0b3JlLmNsZWFyKCk7XHJcbiAgICBjb25zdCByZXN1bHRzID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnJldmVyc2VTZWFyY2godGhpcy5sb25MYXQsIHsgcGFyYW1zOiB7IGdlb21ldHJ5OiAnZmFsc2UnLCBpY29uOiAnZmFsc2UnIH0gfSwgdHJ1ZSk7XHJcblxyXG4gICAgZm9yIChjb25zdCBpIGluIHJlc3VsdHMpIHtcclxuICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMucmV2ZXJzZVNlYXJjaCQkLnB1c2goXHJcbiAgICAgICAgICByZXN1bHRzW2ldLnJlcXVlc3Quc3Vic2NyaWJlKChfcmVzdWx0czogU2VhcmNoUmVzdWx0PEZlYXR1cmU+W10pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblNlYXJjaCh7IHJlc2VhcmNoOiByZXN1bHRzW2ldLCByZXN1bHRzOiBfcmVzdWx0cyB9KTtcclxuICAgICAgICAgIH0pKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblNlYXJjaChldmVudDogeyByZXNlYXJjaDogUmVzZWFyY2g7IHJlc3VsdHM6IFNlYXJjaFJlc3VsdFtdIH0pIHtcclxuICAgIGNvbnN0IHJlc3VsdHMgPSBldmVudC5yZXN1bHRzO1xyXG4gICAgY29uc3QgbmV3UmVzdWx0cyA9IHRoaXMucG9pbnRlclNlYXJjaFN0b3JlLmFsbCgpXHJcbiAgICAgIC5maWx0ZXIoKHJlc3VsdDogU2VhcmNoUmVzdWx0KSA9PiByZXN1bHQuc291cmNlICE9PSBldmVudC5yZXNlYXJjaC5zb3VyY2UpXHJcbiAgICAgIC5jb25jYXQocmVzdWx0cyk7XHJcbiAgICB0aGlzLnBvaW50ZXJTZWFyY2hTdG9yZS5sb2FkKG5ld1Jlc3VsdHMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgZmVhdHVyZSB0byB0aGUgcG9pbnRlciBzdG9yZVxyXG4gICAqIEBwYXJhbSB0ZXh0IHN0cmluZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkUG9pbnRlck92ZXJsYXkodGV4dDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmNsZWFyTGF5ZXIoKTtcclxuXHJcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBvbGdlb20uUG9pbnQoXHJcbiAgICAgIHRyYW5zZm9ybSh0aGlzLmxvbkxhdCwgJ0VQU0c6NDMyNicsIHRoaXMubWFwUHJvamVjdGlvbilcclxuICAgICk7XHJcbiAgICBjb25zdCBmZWF0dXJlID0gbmV3IG9sRmVhdHVyZSh7IGdlb21ldHJ5IH0pO1xyXG4gICAgY29uc3QgZ2VvanNvbkdlb20gPSBuZXcgT2xHZW9KU09OKCkud3JpdGVHZW9tZXRyeU9iamVjdChnZW9tZXRyeSwge1xyXG4gICAgICBmZWF0dXJlUHJvamVjdGlvbjogdGhpcy5tYXBQcm9qZWN0aW9uLFxyXG4gICAgICBkYXRhUHJvamVjdGlvbjogdGhpcy5tYXBQcm9qZWN0aW9uXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBmOiBGZWF0dXJlID0ge1xyXG4gICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICBnZW9tZXRyeTogZ2VvanNvbkdlb20sXHJcbiAgICAgIHByb2plY3Rpb246IHRoaXMubWFwUHJvamVjdGlvbixcclxuICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGlkOiB0aGlzLnNlYXJjaFBvaW50ZXJTdW1tYXJ5RmVhdHVyZUlkLFxyXG4gICAgICAgIHBvaW50ZXJTdW1tYXJ5OiB0ZXh0XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBpZDogdGhpcy5zZWFyY2hQb2ludGVyU3VtbWFyeUZlYXR1cmVJZFxyXG4gICAgICB9LFxyXG4gICAgICBvbDogZmVhdHVyZVxyXG4gICAgfTtcclxuICAgIHRoaXMuc3RvcmUuc2V0TGF5ZXJGZWF0dXJlcyhbZl0sIEZlYXR1cmVNb3Rpb24uTm9uZSk7XHJcbiAgfVxyXG5cclxuLyoqXHJcbiAqIENsZWFyIHRoZSBwb2ludGVyIHN0b3JlIGZlYXR1cmVzXHJcbiAqL1xyXG5wcml2YXRlIGNsZWFyTGF5ZXIoKSB7XHJcbiAgaWYgKHRoaXMuc3RvcmUpIHtcclxuICAgIHRoaXMuc3RvcmUuY2xlYXJMYXllcigpO1xyXG4gIH1cclxufVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGRlZmF1bHQgc3R5bGUgZm9yIHRoZSBwb2ludGVyIHBvc2l0aW9uIGFuZCBpdCdzIGxhYmVsIHN1bW1hcnkuXHJcbiAqIEBwYXJhbSBmZWF0dXJlIE9sRmVhdHVyZVxyXG4gKiBAcmV0dXJucyBPTCBzdHlsZSBmdW5jdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBvaW50ZXJQb3NpdGlvblN1bW1hcnlNYXJrZXIoZmVhdHVyZTogb2xGZWF0dXJlLCByZXNvbHV0aW9uOiBudW1iZXIpOiBvbHN0eWxlLlN0eWxlIHtcclxuICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkljb24oe1xyXG4gICAgICBzcmM6ICcuL2Fzc2V0cy9pZ28yL2dlby9pY29ucy9jcm9zc19ibGFja18xOHB4LnN2ZycsXHJcbiAgICAgIGltZ1NpemU6IFsxOCwgMThdLCAvLyBmb3IgaWVcclxuICAgIH0pLFxyXG5cclxuICAgIHRleHQ6IG5ldyBvbHN0eWxlLlRleHQoe1xyXG4gICAgICB0ZXh0OiBmZWF0dXJlLmdldCgncG9pbnRlclN1bW1hcnknKSxcclxuICAgICAgdGV4dEFsaWduOiAnbGVmdCcsXHJcbiAgICAgIHRleHRCYXNlbGluZTogJ2JvdHRvbScsXHJcbiAgICAgIGZvbnQ6ICcxMnB4IENhbGlicmksc2Fucy1zZXJpZicsXHJcbiAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoeyBjb2xvcjogJyMwMDAnIH0pLFxyXG4gICAgICBiYWNrZ3JvdW5kRmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7IGNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpJyB9KSxcclxuICAgICAgYmFja2dyb3VuZFN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHsgY29sb3I6ICdyZ2JhKDIwMCwgMjAwLCAyMDAsIDAuNzUpJywgd2lkdGg6IDIgfSksXHJcbiAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHsgY29sb3I6ICcjZmZmJywgd2lkdGg6IDMgfSksXHJcbiAgICAgIG92ZXJmbG93OiB0cnVlLFxyXG4gICAgICBvZmZzZXRYOiAxMCxcclxuICAgICAgb2Zmc2V0WTogLTEwLFxyXG4gICAgICBwYWRkaW5nOiBbMi41LCAyLjUsIDIuNSwgMi41XVxyXG4gICAgfSlcclxuICB9KTtcclxufVxyXG4iXX0=