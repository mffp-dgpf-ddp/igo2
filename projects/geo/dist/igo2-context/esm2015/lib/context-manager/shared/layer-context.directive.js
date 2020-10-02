/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Optional, Input } from '@angular/core';
import { merge } from 'rxjs';
import { buffer, debounceTime, filter } from 'rxjs/operators';
import { RouteService, ConfigService } from '@igo2/core';
import { MapBrowserComponent, LayerService, StyleListService, StyleService } from '@igo2/geo';
import { ContextService } from './context.service';
import { addImportedFeaturesToMap, addImportedFeaturesStyledToMap } from '../../context-import-export/shared/context-import.utils';
import GeoJSON from 'ol/format/GeoJSON';
export class LayerContextDirective {
    /**
     * @param {?} component
     * @param {?} contextService
     * @param {?} layerService
     * @param {?} configService
     * @param {?} styleListService
     * @param {?} styleService
     * @param {?} route
     */
    constructor(component, contextService, layerService, configService, styleListService, styleService, route) {
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
    /**
     * @return {?}
     */
    get map() {
        return this.component.map;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.context$$ = this.contextService.context$
            .pipe(filter((/**
         * @param {?} context
         * @return {?}
         */
        (context) => context !== undefined)))
            .subscribe((/**
         * @param {?} context
         * @return {?}
         */
        (context) => this.handleContextChange(context)));
        if (this.route &&
            this.route.options.visibleOnLayersKey &&
            this.route.options.visibleOffLayersKey &&
            this.route.options.contextKey) {
            /** @type {?} */
            const queryParams$$ = this.route.queryParams.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            (params) => {
                if (Object.keys(params).length > 0) {
                    this.queryParams = params;
                    queryParams$$.unsubscribe();
                }
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.context$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    handleContextChange(context) {
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
        const layersAndIndex$ = merge(...context.layers.map((/**
         * @param {?} layerOptions
         * @param {?} index
         * @return {?}
         */
        (layerOptions, index) => {
            return this.layerService.createAsyncLayer(layerOptions);
        })));
        layersAndIndex$
            .pipe(buffer(layersAndIndex$.pipe(debounceTime(500))))
            .subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        (layers) => {
            layers = layers
                .filter((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => layer !== undefined))
                .map((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => {
                layer.visible = this.computeLayerVisibilityFromUrl(layer);
                layer.zIndex = layer.zIndex;
                return layer;
            }));
            this.contextLayers.concat(layers);
            this.map.addLayers(layers);
            if (context.extraFeatures) {
                context.extraFeatures.forEach((/**
                 * @param {?} featureCollection
                 * @return {?}
                 */
                (featureCollection) => {
                    /** @type {?} */
                    const format = new GeoJSON();
                    /** @type {?} */
                    const title = featureCollection.name;
                    featureCollection = JSON.stringify(featureCollection);
                    featureCollection = format.readFeatures(featureCollection, {
                        dataProjection: 'EPSG:4326',
                        featureProjection: 'EPSG:3857'
                    });
                    if (!this.configService.getConfig('importWithStyle')) {
                        addImportedFeaturesToMap(featureCollection, this.map, title);
                    }
                    else {
                        addImportedFeaturesStyledToMap(featureCollection, this.map, title, this.styleListService, this.styleService);
                    }
                }));
            }
        }));
    }
    /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    computeLayerVisibilityFromUrl(layer) {
        /** @type {?} */
        const params = this.queryParams;
        /** @type {?} */
        const currentContext = this.contextService.context$.value.uri;
        /** @type {?} */
        const currentLayerid = layer.id;
        /** @type {?} */
        let visible = layer.visible;
        if (!params || !currentLayerid) {
            return visible;
        }
        /** @type {?} */
        const contextParams = params[(/** @type {?} */ (this.route.options.contextKey))];
        if (contextParams === currentContext || !contextParams) {
            /** @type {?} */
            let visibleOnLayersParams = '';
            /** @type {?} */
            let visibleOffLayersParams = '';
            /** @type {?} */
            let visiblelayers = [];
            /** @type {?} */
            let invisiblelayers = [];
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
    }
}
LayerContextDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoLayerContext]'
            },] }
];
/** @nocollapse */
LayerContextDirective.ctorParameters = () => [
    { type: MapBrowserComponent },
    { type: ContextService },
    { type: LayerService },
    { type: ConfigService },
    { type: StyleListService },
    { type: StyleService },
    { type: RouteService, decorators: [{ type: Optional }] }
];
LayerContextDirective.propDecorators = {
    removeLayersOnContextChange: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItY29udGV4dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWFuYWdlci9zaGFyZWQvbGF5ZXItY29udGV4dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFnQixLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekQsT0FBTyxFQUVMLG1CQUFtQixFQUVuQixZQUFZLEVBRVosZ0JBQWdCLEVBQ2hCLFlBQVksRUFDYixNQUFNLFdBQVcsQ0FBQztBQUVuQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQsT0FBTyxFQUNMLHdCQUF3QixFQUN4Qiw4QkFBOEIsRUFDL0IsTUFBTSx5REFBeUQsQ0FBQztBQUNqRSxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUt4QyxNQUFNLE9BQU8scUJBQXFCOzs7Ozs7Ozs7O0lBWWhDLFlBQ1UsU0FBOEIsRUFDOUIsY0FBOEIsRUFDOUIsWUFBMEIsRUFDMUIsYUFBNEIsRUFDNUIsZ0JBQWtDLEVBQ2xDLFlBQTBCLEVBQ2QsS0FBbUI7UUFOL0IsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFD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RyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEQsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUM5QyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ2hCO1lBQ0QsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNoRCxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ2pCO1NBQ0Y7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7WUEvSkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7YUFDOUI7Ozs7WUFsQkMsbUJBQW1CO1lBUVosY0FBYztZQU5yQixZQUFZO1lBTFMsYUFBYTtZQU9sQyxnQkFBZ0I7WUFDaEIsWUFBWTtZQVJMLFlBQVksdUJBeUNoQixRQUFROzs7MENBYlYsS0FBSzs7Ozs7OztJQUxOLDBDQUFnQzs7Ozs7SUFDaEMsNENBQXlCOzs7OztJQUV6Qiw4Q0FBb0M7O0lBRXBDLDREQUFxRDs7Ozs7SUFPbkQsMENBQXNDOzs7OztJQUN0QywrQ0FBc0M7Ozs7O0lBQ3RDLDZDQUFrQzs7Ozs7SUFDbEMsOENBQW9DOzs7OztJQUNwQyxpREFBMEM7Ozs7O0lBQzFDLDZDQUFrQzs7Ozs7SUFDbEMsc0NBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQsIE9uRGVzdHJveSwgT3B0aW9uYWwsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGJ1ZmZlciwgZGVib3VuY2VUaW1lLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZVNlcnZpY2UsIENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHtcclxuICBJZ29NYXAsXHJcbiAgTWFwQnJvd3NlckNvbXBvbmVudCxcclxuICBMYXllcixcclxuICBMYXllclNlcnZpY2UsXHJcbiAgTGF5ZXJPcHRpb25zLFxyXG4gIFN0eWxlTGlzdFNlcnZpY2UsXHJcbiAgU3R5bGVTZXJ2aWNlXHJcbn0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IENvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi9jb250ZXh0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEZXRhaWxlZENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHtcclxuICBhZGRJbXBvcnRlZEZlYXR1cmVzVG9NYXAsXHJcbiAgYWRkSW1wb3J0ZWRGZWF0dXJlc1N0eWxlZFRvTWFwXHJcbn0gZnJvbSAnLi4vLi4vY29udGV4dC1pbXBvcnQtZXhwb3J0L3NoYXJlZC9jb250ZXh0LWltcG9ydC51dGlscyc7XHJcbmltcG9ydCBHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb0xheWVyQ29udGV4dF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYXllckNvbnRleHREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBjb250ZXh0JCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIHF1ZXJ5UGFyYW1zOiBhbnk7XHJcblxyXG4gIHByaXZhdGUgY29udGV4dExheWVyczogTGF5ZXJbXSA9IFtdO1xyXG5cclxuICBASW5wdXQoKSByZW1vdmVMYXllcnNPbkNvbnRleHRDaGFuZ2U6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnQubWFwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgY29udGV4dFNlcnZpY2U6IENvbnRleHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYXllclNlcnZpY2U6IExheWVyU2VydmljZSxcclxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgc3R5bGVMaXN0U2VydmljZTogU3R5bGVMaXN0U2VydmljZSxcclxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlOiBSb3V0ZVNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5jb250ZXh0JCQgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHQkXHJcbiAgICAgIC5waXBlKGZpbHRlcigoY29udGV4dCkgPT4gY29udGV4dCAhPT0gdW5kZWZpbmVkKSlcclxuICAgICAgLnN1YnNjcmliZSgoY29udGV4dCkgPT4gdGhpcy5oYW5kbGVDb250ZXh0Q2hhbmdlKGNvbnRleHQpKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMucm91dGUgJiZcclxuICAgICAgdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPbkxheWVyc0tleSAmJlxyXG4gICAgICB0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9mZkxheWVyc0tleSAmJlxyXG4gICAgICB0aGlzLnJvdXRlLm9wdGlvbnMuY29udGV4dEtleVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zJCQgPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHBhcmFtcykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5xdWVyeVBhcmFtcyA9IHBhcmFtcztcclxuICAgICAgICAgIHF1ZXJ5UGFyYW1zJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNvbnRleHQkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVDb250ZXh0Q2hhbmdlKGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgaWYgKGNvbnRleHQubGF5ZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucmVtb3ZlTGF5ZXJzT25Db250ZXh0Q2hhbmdlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMubWFwLnJlbW92ZUFsbExheWVycygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXJzKHRoaXMuY29udGV4dExheWVycyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbnRleHRMYXllcnMgPSBbXTtcclxuXHJcbiAgICBjb25zdCBsYXllcnNBbmRJbmRleCQgPSBtZXJnZShcclxuICAgICAgLi4uY29udGV4dC5sYXllcnMubWFwKChsYXllck9wdGlvbnM6IExheWVyT3B0aW9ucywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxheWVyU2VydmljZS5jcmVhdGVBc3luY0xheWVyKGxheWVyT3B0aW9ucyk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGxheWVyc0FuZEluZGV4JFxyXG4gICAgICAucGlwZShidWZmZXIobGF5ZXJzQW5kSW5kZXgkLnBpcGUoZGVib3VuY2VUaW1lKDUwMCkpKSlcclxuICAgICAgLnN1YnNjcmliZSgobGF5ZXJzOiBMYXllcltdKSA9PiB7XHJcbiAgICAgICAgbGF5ZXJzID0gbGF5ZXJzXHJcbiAgICAgICAgICAuZmlsdGVyKChsYXllcjogTGF5ZXIpID0+IGxheWVyICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAubWFwKChsYXllcikgPT4ge1xyXG4gICAgICAgICAgICBsYXllci52aXNpYmxlID0gdGhpcy5jb21wdXRlTGF5ZXJWaXNpYmlsaXR5RnJvbVVybChsYXllcik7XHJcbiAgICAgICAgICAgIGxheWVyLnpJbmRleCA9IGxheWVyLnpJbmRleDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBsYXllcjtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHRMYXllcnMuY29uY2F0KGxheWVycyk7XHJcbiAgICAgICAgdGhpcy5tYXAuYWRkTGF5ZXJzKGxheWVycyk7XHJcblxyXG4gICAgICAgIGlmIChjb250ZXh0LmV4dHJhRmVhdHVyZXMpIHtcclxuICAgICAgICAgIGNvbnRleHQuZXh0cmFGZWF0dXJlcy5mb3JFYWNoKChmZWF0dXJlQ29sbGVjdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXQgPSBuZXcgR2VvSlNPTigpO1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGZlYXR1cmVDb2xsZWN0aW9uLm5hbWU7XHJcbiAgICAgICAgICAgIGZlYXR1cmVDb2xsZWN0aW9uID0gSlNPTi5zdHJpbmdpZnkoZmVhdHVyZUNvbGxlY3Rpb24pO1xyXG4gICAgICAgICAgICBmZWF0dXJlQ29sbGVjdGlvbiA9IGZvcm1hdC5yZWFkRmVhdHVyZXMoZmVhdHVyZUNvbGxlY3Rpb24sIHtcclxuICAgICAgICAgICAgICBkYXRhUHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgICAgICAgICAgZmVhdHVyZVByb2plY3Rpb246ICdFUFNHOjM4NTcnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWcoJ2ltcG9ydFdpdGhTdHlsZScpKSB7XHJcbiAgICAgICAgICAgICAgYWRkSW1wb3J0ZWRGZWF0dXJlc1RvTWFwKGZlYXR1cmVDb2xsZWN0aW9uLCB0aGlzLm1hcCwgdGl0bGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFkZEltcG9ydGVkRmVhdHVyZXNTdHlsZWRUb01hcChcclxuICAgICAgICAgICAgICAgIGZlYXR1cmVDb2xsZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXAsXHJcbiAgICAgICAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVMaXN0U2VydmljZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZUxheWVyVmlzaWJpbGl0eUZyb21VcmwobGF5ZXI6IExheWVyKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLnF1ZXJ5UGFyYW1zO1xyXG4gICAgY29uc3QgY3VycmVudENvbnRleHQgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHQkLnZhbHVlLnVyaTtcclxuICAgIGNvbnN0IGN1cnJlbnRMYXllcmlkOiBzdHJpbmcgPSBsYXllci5pZDtcclxuXHJcbiAgICBsZXQgdmlzaWJsZSA9IGxheWVyLnZpc2libGU7XHJcbiAgICBpZiAoIXBhcmFtcyB8fCAhY3VycmVudExheWVyaWQpIHtcclxuICAgICAgcmV0dXJuIHZpc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udGV4dFBhcmFtcyA9IHBhcmFtc1t0aGlzLnJvdXRlLm9wdGlvbnMuY29udGV4dEtleSBhcyBzdHJpbmddO1xyXG4gICAgaWYgKGNvbnRleHRQYXJhbXMgPT09IGN1cnJlbnRDb250ZXh0IHx8ICFjb250ZXh0UGFyYW1zKSB7XHJcbiAgICAgIGxldCB2aXNpYmxlT25MYXllcnNQYXJhbXMgPSAnJztcclxuICAgICAgbGV0IHZpc2libGVPZmZMYXllcnNQYXJhbXMgPSAnJztcclxuICAgICAgbGV0IHZpc2libGVsYXllcnM6IHN0cmluZ1tdID0gW107XHJcbiAgICAgIGxldCBpbnZpc2libGVsYXllcnM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPbkxheWVyc0tleSAmJlxyXG4gICAgICAgIHBhcmFtc1t0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9uTGF5ZXJzS2V5IGFzIHN0cmluZ11cclxuICAgICAgKSB7XHJcbiAgICAgICAgdmlzaWJsZU9uTGF5ZXJzUGFyYW1zID1cclxuICAgICAgICAgIHBhcmFtc1t0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9uTGF5ZXJzS2V5IGFzIHN0cmluZ107XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT2ZmTGF5ZXJzS2V5ICYmXHJcbiAgICAgICAgcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT2ZmTGF5ZXJzS2V5IGFzIHN0cmluZ11cclxuICAgICAgKSB7XHJcbiAgICAgICAgdmlzaWJsZU9mZkxheWVyc1BhcmFtcyA9XHJcbiAgICAgICAgICBwYXJhbXNbdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPZmZMYXllcnNLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLyogVGhpcyBvcmRlciBpcyBpbXBvcnRhbnQgYmVjYXVzZSB0byBjb250cm9sIHdoaWNoZXZlclxyXG4gICAgICAgdGhlIG9yZGVyIG9mICogcGFyYW0uIEZpcnN0IHdoZSBvcGVuIGFuZCBjbG9zZSBldmVyeXRoaW5nLiovXHJcbiAgICAgIGlmICh2aXNpYmxlT25MYXllcnNQYXJhbXMgPT09ICcqJykge1xyXG4gICAgICAgIHZpc2libGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh2aXNpYmxlT2ZmTGF5ZXJzUGFyYW1zID09PSAnKicpIHtcclxuICAgICAgICB2aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFmdGVyLCBtYW5hZ2luZyBuYW1lZCBsYXllciBieSBpZCAoY29udGV4dC5qc29uIE9SIGlkIGZyb20gZGF0YXNvdXJjZSlcclxuICAgICAgdmlzaWJsZWxheWVycyA9IHZpc2libGVPbkxheWVyc1BhcmFtcy5zcGxpdCgnLCcpO1xyXG4gICAgICBpbnZpc2libGVsYXllcnMgPSB2aXNpYmxlT2ZmTGF5ZXJzUGFyYW1zLnNwbGl0KCcsJyk7XHJcbiAgICAgIGlmICh2aXNpYmxlbGF5ZXJzLmluZGV4T2YoY3VycmVudExheWVyaWQpID4gLTEpIHtcclxuICAgICAgICB2aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaW52aXNpYmxlbGF5ZXJzLmluZGV4T2YoY3VycmVudExheWVyaWQpID4gLTEpIHtcclxuICAgICAgICB2aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmlzaWJsZTtcclxuICB9XHJcbn1cclxuIl19