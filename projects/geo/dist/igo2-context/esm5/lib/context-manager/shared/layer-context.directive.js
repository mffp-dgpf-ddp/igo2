/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Optional, Input } from '@angular/core';
import { merge } from 'rxjs';
import { buffer, debounceTime, filter } from 'rxjs/operators';
import { RouteService, ConfigService } from '@igo2/core';
import { MapBrowserComponent, LayerService, StyleListService, StyleService } from '@igo2/geo';
import { ContextService } from './context.service';
import { addImportedFeaturesToMap, addImportedFeaturesStyledToMap } from '../../context-import-export/shared/context-import.utils';
import GeoJSON from 'ol/format/GeoJSON';
var LayerContextDirective = /** @class */ (function () {
    function LayerContextDirective(component, contextService, layerService, configService, styleListService, styleService, route) {
        this.component = component;
        this.contextService = contextService;
        this.layerService = layerService;
        this.configService = configService;
        this.styleListService = styleListService;
        this.styleService = styleService;
        this.route = route;
        this.contextLayers = [];
        this.removeLayersOnContextChange = true;
    }
    Object.defineProperty(LayerContextDirective.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this.component.map;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    LayerContextDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.context$$ = this.contextService.context$
            .pipe(filter((/**
         * @param {?} context
         * @return {?}
         */
        function (context) { return context !== undefined; })))
            .subscribe((/**
         * @param {?} context
         * @return {?}
         */
        function (context) { return _this.handleContextChange(context); }));
        if (this.route &&
            this.route.options.visibleOnLayersKey &&
            this.route.options.visibleOffLayersKey &&
            this.route.options.contextKey) {
            /** @type {?} */
            var queryParams$$_1 = this.route.queryParams.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            function (params) {
                if (Object.keys(params).length > 0) {
                    _this.queryParams = params;
                    queryParams$$_1.unsubscribe();
                }
            }));
        }
    };
    /**
     * @return {?}
     */
    LayerContextDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.context$$.unsubscribe();
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    LayerContextDirective.prototype.handleContextChange = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        if (context.layers === undefined) {
            return;
        }
        if (this.removeLayersOnContextChange === true) {
            this.map.removeAllLayers();
        }
        else {
            this.map.removeLayers(this.contextLayers);
        }
        this.contextLayers = [];
        /** @type {?} */
        var layersAndIndex$ = merge.apply(void 0, tslib_1.__spread(context.layers.map((/**
         * @param {?} layerOptions
         * @param {?} index
         * @return {?}
         */
        function (layerOptions, index) {
            return _this.layerService.createAsyncLayer(layerOptions);
        }))));
        layersAndIndex$
            .pipe(buffer(layersAndIndex$.pipe(debounceTime(500))))
            .subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        function (layers) {
            layers = layers
                .filter((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) { return layer !== undefined; }))
                .map((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) {
                layer.visible = _this.computeLayerVisibilityFromUrl(layer);
                layer.zIndex = layer.zIndex;
                return layer;
            }));
            _this.contextLayers.concat(layers);
            _this.map.addLayers(layers);
            if (context.extraFeatures) {
                context.extraFeatures.forEach((/**
                 * @param {?} featureCollection
                 * @return {?}
                 */
                function (featureCollection) {
                    /** @type {?} */
                    var format = new GeoJSON();
                    /** @type {?} */
                    var title = featureCollection.name;
                    featureCollection = JSON.stringify(featureCollection);
                    featureCollection = format.readFeatures(featureCollection, {
                        dataProjection: 'EPSG:4326',
                        featureProjection: 'EPSG:3857'
                    });
                    if (!_this.configService.getConfig('importWithStyle')) {
                        addImportedFeaturesToMap(featureCollection, _this.map, title);
                    }
                    else {
                        addImportedFeaturesStyledToMap(featureCollection, _this.map, title, _this.styleListService, _this.styleService);
                    }
                }));
            }
        }));
    };
    /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    LayerContextDirective.prototype.computeLayerVisibilityFromUrl = /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var params = this.queryParams;
        /** @type {?} */
        var currentContext = this.contextService.context$.value.uri;
        /** @type {?} */
        var currentLayerid = layer.id;
        /** @type {?} */
        var visible = layer.visible;
        if (!params || !currentLayerid) {
            return visible;
        }
        /** @type {?} */
        var contextParams = params[(/** @type {?} */ (this.route.options.contextKey))];
        if (contextParams === currentContext || !contextParams) {
            /** @type {?} */
            var visibleOnLayersParams = '';
            /** @type {?} */
            var visibleOffLayersParams = '';
            /** @type {?} */
            var visiblelayers = [];
            /** @type {?} */
            var invisiblelayers = [];
            if (this.route.options.visibleOnLayersKey &&
                params[(/** @type {?} */ (this.route.options.visibleOnLayersKey))]) {
                visibleOnLayersParams =
                    params[(/** @type {?} */ (this.route.options.visibleOnLayersKey))];
            }
            if (this.route.options.visibleOffLayersKey &&
                params[(/** @type {?} */ (this.route.options.visibleOffLayersKey))]) {
                visibleOffLayersParams =
                    params[(/** @type {?} */ (this.route.options.visibleOffLayersKey))];
            }
            /* This order is important because to control whichever
             the order of * param. First whe open and close everything.*/
            if (visibleOnLayersParams === '*') {
                visible = true;
            }
            if (visibleOffLayersParams === '*') {
                visible = false;
            }
            // After, managing named layer by id (context.json OR id from datasource)
            visiblelayers = visibleOnLayersParams.split(',');
            invisiblelayers = visibleOffLayersParams.split(',');
            if (visiblelayers.indexOf(currentLayerid) > -1) {
                visible = true;
            }
            if (invisiblelayers.indexOf(currentLayerid) > -1) {
                visible = false;
            }
        }
        return visible;
    };
    LayerContextDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoLayerContext]'
                },] }
    ];
    /** @nocollapse */
    LayerContextDirective.ctorParameters = function () { return [
        { type: MapBrowserComponent },
        { type: ContextService },
        { type: LayerService },
        { type: ConfigService },
        { type: StyleListService },
        { type: StyleService },
        { type: RouteService, decorators: [{ type: Optional }] }
    ]; };
    LayerContextDirective.propDecorators = {
        removeLayersOnContextChange: [{ type: Input }]
    };
    return LayerContextDirective;
}());
export { LayerContextDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.context$$;
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.queryParams;
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.contextLayers;
    /** @type {?} */
    LayerContextDirective.prototype.removeLayersOnContextChange;
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.contextService;
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.layerService;
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.configService;
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.styleListService;
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.styleService;
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItY29udGV4dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWFuYWdlci9zaGFyZWQvbGF5ZXItY29udGV4dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlFLE9BQU8sRUFBZ0IsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlELE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pELE9BQU8sRUFFTCxtQkFBbUIsRUFFbkIsWUFBWSxFQUVaLGdCQUFnQixFQUNoQixZQUFZLEVBQ2IsTUFBTSxXQUFXLENBQUM7QUFFbkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5ELE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsOEJBQThCLEVBQy9CLE1BQU0seURBQXlELENBQUM7QUFDakUsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEM7SUFlRSwrQkFDVSxTQUE4QixFQUM5QixjQUE4QixFQUM5QixZQUEwQixFQUMxQixhQUE0QixFQUM1QixnQkFBa0MsRUFDbEMsWUFBMEIsRUFDZCxLQUFtQjtRQU4vQixjQUFTLEdBQVQsU0FBUyxDQUFxQjtRQUM5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNkLFVBQUssR0FBTCxLQUFLLENBQWM7UUFm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LENBQUM7WUFDakQsZUFBZSxHQUFHLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwRCxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzlDLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDaEI7WUFDRCxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2hELE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDakI7U0FDRjtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O2dCQS9KRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtpQkFDOUI7Ozs7Z0JBbEJDLG1CQUFtQjtnQkFRWixjQUFjO2dCQU5yQixZQUFZO2dCQUxTLGFBQWE7Z0JBT2xDLGdCQUFnQjtnQkFDaEIsWUFBWTtnQkFSTCxZQUFZLHVCQXlDaEIsUUFBUTs7OzhDQWJWLEtBQUs7O0lBdUpSLDRCQUFDO0NBQUEsQUFoS0QsSUFnS0M7U0E3SlkscUJBQXFCOzs7Ozs7SUFDaEMsMENBQWdDOzs7OztJQUNoQyw0Q0FBeUI7Ozs7O0lBRXpCLDhDQUFvQzs7SUFFcEMsNERBQXFEOzs7OztJQU9uRCwwQ0FBc0M7Ozs7O0lBQ3RDLCtDQUFzQzs7Ozs7SUFDdEMsNkNBQWtDOzs7OztJQUNsQyw4Q0FBb0M7Ozs7O0lBQ3BDLGlEQUEwQzs7Ozs7SUFDMUMsNkNBQWtDOzs7OztJQUNsQyxzQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uSW5pdCwgT25EZXN0cm95LCBPcHRpb25hbCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgYnVmZmVyLCBkZWJvdW5jZVRpbWUsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IFJvdXRlU2VydmljZSwgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIElnb01hcCxcclxuICBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gIExheWVyLFxyXG4gIExheWVyU2VydmljZSxcclxuICBMYXllck9wdGlvbnMsXHJcbiAgU3R5bGVMaXN0U2VydmljZSxcclxuICBTdHlsZVNlcnZpY2VcclxufSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuL2NvbnRleHQuc2VydmljZSc7XHJcbmltcG9ydCB7IERldGFpbGVkQ29udGV4dCB9IGZyb20gJy4vY29udGV4dC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQge1xyXG4gIGFkZEltcG9ydGVkRmVhdHVyZXNUb01hcCxcclxuICBhZGRJbXBvcnRlZEZlYXR1cmVzU3R5bGVkVG9NYXBcclxufSBmcm9tICcuLi8uLi9jb250ZXh0LWltcG9ydC1leHBvcnQvc2hhcmVkL2NvbnRleHQtaW1wb3J0LnV0aWxzJztcclxuaW1wb3J0IEdlb0pTT04gZnJvbSAnb2wvZm9ybWF0L0dlb0pTT04nO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvTGF5ZXJDb250ZXh0XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIExheWVyQ29udGV4dERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIGNvbnRleHQkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgcXVlcnlQYXJhbXM6IGFueTtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZXh0TGF5ZXJzOiBMYXllcltdID0gW107XHJcblxyXG4gIEBJbnB1dCgpIHJlbW92ZUxheWVyc09uQ29udGV4dENoYW5nZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBjb250ZXh0U2VydmljZTogQ29udGV4dFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdHlsZUxpc3RTZXJ2aWNlOiBTdHlsZUxpc3RTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGU6IFJvdXRlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQkJCA9IHRoaXMuY29udGV4dFNlcnZpY2UuY29udGV4dCRcclxuICAgICAgLnBpcGUoZmlsdGVyKChjb250ZXh0KSA9PiBjb250ZXh0ICE9PSB1bmRlZmluZWQpKVxyXG4gICAgICAuc3Vic2NyaWJlKChjb250ZXh0KSA9PiB0aGlzLmhhbmRsZUNvbnRleHRDaGFuZ2UoY29udGV4dCkpO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgdGhpcy5yb3V0ZSAmJlxyXG4gICAgICB0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9uTGF5ZXJzS2V5ICYmXHJcbiAgICAgIHRoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT2ZmTGF5ZXJzS2V5ICYmXHJcbiAgICAgIHRoaXMucm91dGUub3B0aW9ucy5jb250ZXh0S2V5XHJcbiAgICApIHtcclxuICAgICAgY29uc3QgcXVlcnlQYXJhbXMkJCA9IHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMocGFyYW1zKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLnF1ZXJ5UGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICAgICAgcXVlcnlQYXJhbXMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY29udGV4dCQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUNvbnRleHRDaGFuZ2UoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICBpZiAoY29udGV4dC5sYXllcnMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5yZW1vdmVMYXllcnNPbkNvbnRleHRDaGFuZ2UgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5tYXAucmVtb3ZlQWxsTGF5ZXJzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcnModGhpcy5jb250ZXh0TGF5ZXJzKTtcclxuICAgIH1cclxuICAgIHRoaXMuY29udGV4dExheWVycyA9IFtdO1xyXG5cclxuICAgIGNvbnN0IGxheWVyc0FuZEluZGV4JCA9IG1lcmdlKFxyXG4gICAgICAuLi5jb250ZXh0LmxheWVycy5tYXAoKGxheWVyT3B0aW9uczogTGF5ZXJPcHRpb25zLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXJTZXJ2aWNlLmNyZWF0ZUFzeW5jTGF5ZXIobGF5ZXJPcHRpb25zKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgbGF5ZXJzQW5kSW5kZXgkXHJcbiAgICAgIC5waXBlKGJ1ZmZlcihsYXllcnNBbmRJbmRleCQucGlwZShkZWJvdW5jZVRpbWUoNTAwKSkpKVxyXG4gICAgICAuc3Vic2NyaWJlKChsYXllcnM6IExheWVyW10pID0+IHtcclxuICAgICAgICBsYXllcnMgPSBsYXllcnNcclxuICAgICAgICAgIC5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgIC5tYXAoKGxheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIGxheWVyLnZpc2libGUgPSB0aGlzLmNvbXB1dGVMYXllclZpc2liaWxpdHlGcm9tVXJsKGxheWVyKTtcclxuICAgICAgICAgICAgbGF5ZXIuekluZGV4ID0gbGF5ZXIuekluZGV4O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGxheWVyO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29udGV4dExheWVycy5jb25jYXQobGF5ZXJzKTtcclxuICAgICAgICB0aGlzLm1hcC5hZGRMYXllcnMobGF5ZXJzKTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRleHQuZXh0cmFGZWF0dXJlcykge1xyXG4gICAgICAgICAgY29udGV4dC5leHRyYUZlYXR1cmVzLmZvckVhY2goKGZlYXR1cmVDb2xsZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IG5ldyBHZW9KU09OKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZmVhdHVyZUNvbGxlY3Rpb24ubmFtZTtcclxuICAgICAgICAgICAgZmVhdHVyZUNvbGxlY3Rpb24gPSBKU09OLnN0cmluZ2lmeShmZWF0dXJlQ29sbGVjdGlvbik7XHJcbiAgICAgICAgICAgIGZlYXR1cmVDb2xsZWN0aW9uID0gZm9ybWF0LnJlYWRGZWF0dXJlcyhmZWF0dXJlQ29sbGVjdGlvbiwge1xyXG4gICAgICAgICAgICAgIGRhdGFQcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICAgICAgICBmZWF0dXJlUHJvamVjdGlvbjogJ0VQU0c6Mzg1NydcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZygnaW1wb3J0V2l0aFN0eWxlJykpIHtcclxuICAgICAgICAgICAgICBhZGRJbXBvcnRlZEZlYXR1cmVzVG9NYXAoZmVhdHVyZUNvbGxlY3Rpb24sIHRoaXMubWFwLCB0aXRsZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWRkSW1wb3J0ZWRGZWF0dXJlc1N0eWxlZFRvTWFwKFxyXG4gICAgICAgICAgICAgICAgZmVhdHVyZUNvbGxlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcCxcclxuICAgICAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZUxpc3RTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZVNlcnZpY2VcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlTGF5ZXJWaXNpYmlsaXR5RnJvbVVybChsYXllcjogTGF5ZXIpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMucXVlcnlQYXJhbXM7XHJcbiAgICBjb25zdCBjdXJyZW50Q29udGV4dCA9IHRoaXMuY29udGV4dFNlcnZpY2UuY29udGV4dCQudmFsdWUudXJpO1xyXG4gICAgY29uc3QgY3VycmVudExheWVyaWQ6IHN0cmluZyA9IGxheWVyLmlkO1xyXG5cclxuICAgIGxldCB2aXNpYmxlID0gbGF5ZXIudmlzaWJsZTtcclxuICAgIGlmICghcGFyYW1zIHx8ICFjdXJyZW50TGF5ZXJpZCkge1xyXG4gICAgICByZXR1cm4gdmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb250ZXh0UGFyYW1zID0gcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy5jb250ZXh0S2V5IGFzIHN0cmluZ107XHJcbiAgICBpZiAoY29udGV4dFBhcmFtcyA9PT0gY3VycmVudENvbnRleHQgfHwgIWNvbnRleHRQYXJhbXMpIHtcclxuICAgICAgbGV0IHZpc2libGVPbkxheWVyc1BhcmFtcyA9ICcnO1xyXG4gICAgICBsZXQgdmlzaWJsZU9mZkxheWVyc1BhcmFtcyA9ICcnO1xyXG4gICAgICBsZXQgdmlzaWJsZWxheWVyczogc3RyaW5nW10gPSBbXTtcclxuICAgICAgbGV0IGludmlzaWJsZWxheWVyczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9uTGF5ZXJzS2V5ICYmXHJcbiAgICAgICAgcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT25MYXllcnNLZXkgYXMgc3RyaW5nXVxyXG4gICAgICApIHtcclxuICAgICAgICB2aXNpYmxlT25MYXllcnNQYXJhbXMgPVxyXG4gICAgICAgICAgcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT25MYXllcnNLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPZmZMYXllcnNLZXkgJiZcclxuICAgICAgICBwYXJhbXNbdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPZmZMYXllcnNLZXkgYXMgc3RyaW5nXVxyXG4gICAgICApIHtcclxuICAgICAgICB2aXNpYmxlT2ZmTGF5ZXJzUGFyYW1zID1cclxuICAgICAgICAgIHBhcmFtc1t0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9mZkxheWVyc0tleSBhcyBzdHJpbmddO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKiBUaGlzIG9yZGVyIGlzIGltcG9ydGFudCBiZWNhdXNlIHRvIGNvbnRyb2wgd2hpY2hldmVyXHJcbiAgICAgICB0aGUgb3JkZXIgb2YgKiBwYXJhbS4gRmlyc3Qgd2hlIG9wZW4gYW5kIGNsb3NlIGV2ZXJ5dGhpbmcuKi9cclxuICAgICAgaWYgKHZpc2libGVPbkxheWVyc1BhcmFtcyA9PT0gJyonKSB7XHJcbiAgICAgICAgdmlzaWJsZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHZpc2libGVPZmZMYXllcnNQYXJhbXMgPT09ICcqJykge1xyXG4gICAgICAgIHZpc2libGUgPSBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQWZ0ZXIsIG1hbmFnaW5nIG5hbWVkIGxheWVyIGJ5IGlkIChjb250ZXh0Lmpzb24gT1IgaWQgZnJvbSBkYXRhc291cmNlKVxyXG4gICAgICB2aXNpYmxlbGF5ZXJzID0gdmlzaWJsZU9uTGF5ZXJzUGFyYW1zLnNwbGl0KCcsJyk7XHJcbiAgICAgIGludmlzaWJsZWxheWVycyA9IHZpc2libGVPZmZMYXllcnNQYXJhbXMuc3BsaXQoJywnKTtcclxuICAgICAgaWYgKHZpc2libGVsYXllcnMuaW5kZXhPZihjdXJyZW50TGF5ZXJpZCkgPiAtMSkge1xyXG4gICAgICAgIHZpc2libGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpbnZpc2libGVsYXllcnMuaW5kZXhPZihjdXJyZW50TGF5ZXJpZCkgPiAtMSkge1xyXG4gICAgICAgIHZpc2libGUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2aXNpYmxlO1xyXG4gIH1cclxufVxyXG4iXX0=