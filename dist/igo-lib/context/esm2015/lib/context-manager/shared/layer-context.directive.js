/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Optional } from '@angular/core';
import { of, zip } from 'rxjs';
import { withLatestFrom, skip, filter } from 'rxjs/operators';
import { RouteService } from '@igo2/core';
import { MapBrowserComponent, LayerService } from '@igo2/geo';
import { ContextService } from './context.service';
export class LayerContextDirective {
    /**
     * @param {?} component
     * @param {?} contextService
     * @param {?} layerService
     * @param {?} route
     */
    constructor(component, contextService, layerService, route) {
        this.component = component;
        this.contextService = contextService;
        this.layerService = layerService;
        this.route = route;
        this.contextLayers = [];
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
        context => context !== undefined)))
            .subscribe((/**
         * @param {?} context
         * @return {?}
         */
        context => this.handleContextChange(context)));
        if (this.route &&
            this.route.options.visibleOnLayersKey &&
            this.route.options.visibleOffLayersKey &&
            this.route.options.contextKey) {
            /** @type {?} */
            const queryParams$$ = this.route.queryParams
                .pipe(skip(1))
                .subscribe((/**
             * @param {?} params
             * @return {?}
             */
            params => {
                this.queryParams = params;
                queryParams$$.unsubscribe();
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
        this.map.removeLayers(this.contextLayers);
        this.contextLayers = [];
        /** @type {?} */
        const layersAndIndex$ = zip(...context.layers.map((/**
         * @param {?} layerOptions
         * @param {?} index
         * @return {?}
         */
        (layerOptions, index) => {
            return this.layerService.createAsyncLayer(layerOptions).pipe(withLatestFrom(of(index)));
        })));
        layersAndIndex$.subscribe((/**
         * @param {?} layersAndIndex
         * @return {?}
         */
        (layersAndIndex) => {
            /** @type {?} */
            const layers = layersAndIndex.reduce((/**
             * @param {?} acc
             * @param {?} bunch
             * @return {?}
             */
            (acc, bunch) => {
                const [layer, index] = bunch;
                layer.visible = this.computeLayerVisibilityFromUrl(layer);
                layer.zIndex = layer.zIndex || index + 1; // Map indexes start at 1
                acc[index] = layer;
                return acc;
            }), new Array(layersAndIndex.length));
            this.contextLayers = layers;
            this.map.addLayers(layers);
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
    { type: RouteService, decorators: [{ type: Optional }] }
];
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
    LayerContextDirective.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItY29udGV4dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWFuYWdlci9zaGFyZWQvbGF5ZXItY29udGV4dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEVBQWdCLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMxQyxPQUFPLEVBRUwsbUJBQW1CLEVBRW5CLFlBQVksRUFFYixNQUFNLFdBQVcsQ0FBQztBQUVuQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFNbkQsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7OztJQVdoQyxZQUNVLFNBQThCLEVBQzlCLGNBQThCLEVBQzlCLFlBQTBCLEVBQ2QsS0FBbUI7UUFIL0IsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBYztRQVZqQyxrQkFBYSxHQUFZLEVBQUUsQ0FBQztJQVdqQyxDQUFDOzs7O0lBVEosSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztJQUM1QixDQUFDOzs7O0lBU0QsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRO2FBQzFDLElBQUksQ0FBQyxNQUFNOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEtBQUss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QyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUM5QyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ2hCO1lBQ0QsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNoRCxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ2pCO1NBQ0Y7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7WUEzSEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7YUFDOUI7Ozs7WUFYQyxtQkFBbUI7WUFNWixjQUFjO1lBSnJCLFlBQVk7WUFMTCxZQUFZLHVCQThCaEIsUUFBUTs7Ozs7OztJQWJYLDBDQUFnQzs7Ozs7SUFDaEMsNENBQXlCOzs7OztJQUV6Qiw4Q0FBb0M7Ozs7O0lBT2xDLDBDQUFzQzs7Ozs7SUFDdEMsK0NBQXNDOzs7OztJQUN0Qyw2Q0FBa0M7Ozs7O0lBQ2xDLHNDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgT25Jbml0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIG9mLCB6aXAgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgd2l0aExhdGVzdEZyb20sIHNraXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IFJvdXRlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIElnb01hcCxcclxuICBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gIExheWVyLFxyXG4gIExheWVyU2VydmljZSxcclxuICBMYXllck9wdGlvbnNcclxufSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuL2NvbnRleHQuc2VydmljZSc7XHJcbmltcG9ydCB7IERldGFpbGVkQ29udGV4dCB9IGZyb20gJy4vY29udGV4dC5pbnRlcmZhY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvTGF5ZXJDb250ZXh0XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIExheWVyQ29udGV4dERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZXh0JCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIHF1ZXJ5UGFyYW1zOiBhbnk7XHJcblxyXG4gIHByaXZhdGUgY29udGV4dExheWVyczogTGF5ZXJbXSA9IFtdO1xyXG5cclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnQubWFwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgY29udGV4dFNlcnZpY2U6IENvbnRleHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYXllclNlcnZpY2U6IExheWVyU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGU6IFJvdXRlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQkJCA9IHRoaXMuY29udGV4dFNlcnZpY2UuY29udGV4dCRcclxuICAgICAgLnBpcGUoZmlsdGVyKGNvbnRleHQgPT4gY29udGV4dCAhPT0gdW5kZWZpbmVkKSlcclxuICAgICAgLnN1YnNjcmliZShjb250ZXh0ID0+IHRoaXMuaGFuZGxlQ29udGV4dENoYW5nZShjb250ZXh0KSk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJvdXRlICYmXHJcbiAgICAgIHRoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT25MYXllcnNLZXkgJiZcclxuICAgICAgdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPZmZMYXllcnNLZXkgJiZcclxuICAgICAgdGhpcy5yb3V0ZS5vcHRpb25zLmNvbnRleHRLZXlcclxuICAgICkge1xyXG4gICAgICBjb25zdCBxdWVyeVBhcmFtcyQkID0gdGhpcy5yb3V0ZS5xdWVyeVBhcmFtc1xyXG4gICAgICAgIC5waXBlKHNraXAoMSkpXHJcbiAgICAgICAgLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy5xdWVyeVBhcmFtcyA9IHBhcmFtcztcclxuICAgICAgICAgIHF1ZXJ5UGFyYW1zJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jb250ZXh0JCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlQ29udGV4dENoYW5nZShjb250ZXh0OiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIGlmIChjb250ZXh0LmxheWVycyA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgIHRoaXMubWFwLnJlbW92ZUxheWVycyh0aGlzLmNvbnRleHRMYXllcnMpO1xyXG4gICAgdGhpcy5jb250ZXh0TGF5ZXJzID0gW107XHJcblxyXG4gICAgY29uc3QgbGF5ZXJzQW5kSW5kZXgkID0gemlwKC4uLmNvbnRleHQubGF5ZXJzLm1hcCgobGF5ZXJPcHRpb25zOiBMYXllck9wdGlvbnMsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMubGF5ZXJTZXJ2aWNlLmNyZWF0ZUFzeW5jTGF5ZXIobGF5ZXJPcHRpb25zKS5waXBlKFxyXG4gICAgICAgIHdpdGhMYXRlc3RGcm9tKG9mKGluZGV4KSlcclxuICAgICAgKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBsYXllcnNBbmRJbmRleCQuc3Vic2NyaWJlKChsYXllcnNBbmRJbmRleDogW0xheWVyLCBudW1iZXJdW10pID0+IHtcclxuICAgICAgY29uc3QgbGF5ZXJzID0gbGF5ZXJzQW5kSW5kZXgucmVkdWNlKChhY2M6IExheWVyW10sIGJ1bmNoOiBbTGF5ZXIsIG51bWJlcl0pID0+IHtcclxuICAgICAgICBjb25zdCBbbGF5ZXIsIGluZGV4XSA9IGJ1bmNoO1xyXG4gICAgICAgIGxheWVyLnZpc2libGUgPSB0aGlzLmNvbXB1dGVMYXllclZpc2liaWxpdHlGcm9tVXJsKGxheWVyKTtcclxuICAgICAgICBsYXllci56SW5kZXggPSBsYXllci56SW5kZXggfHwgaW5kZXggKyAxOyAgLy8gTWFwIGluZGV4ZXMgc3RhcnQgYXQgMVxyXG4gICAgICAgIGFjY1tpbmRleF0gPSBsYXllcjtcclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICB9LCBuZXcgQXJyYXkobGF5ZXJzQW5kSW5kZXgubGVuZ3RoKSk7XHJcbiAgICAgIHRoaXMuY29udGV4dExheWVycyA9IGxheWVycztcclxuICAgICAgdGhpcy5tYXAuYWRkTGF5ZXJzKGxheWVycyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZUxheWVyVmlzaWJpbGl0eUZyb21VcmwobGF5ZXI6IExheWVyKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLnF1ZXJ5UGFyYW1zO1xyXG4gICAgY29uc3QgY3VycmVudENvbnRleHQgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHQkLnZhbHVlLnVyaTtcclxuICAgIGNvbnN0IGN1cnJlbnRMYXllcmlkOiBzdHJpbmcgPSBsYXllci5pZDtcclxuXHJcbiAgICBsZXQgdmlzaWJsZSA9IGxheWVyLnZpc2libGU7XHJcbiAgICBpZiAoIXBhcmFtcyB8fCAhY3VycmVudExheWVyaWQpIHtcclxuICAgICAgcmV0dXJuIHZpc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udGV4dFBhcmFtcyA9IHBhcmFtc1t0aGlzLnJvdXRlLm9wdGlvbnMuY29udGV4dEtleSBhcyBzdHJpbmddO1xyXG4gICAgaWYgKGNvbnRleHRQYXJhbXMgPT09IGN1cnJlbnRDb250ZXh0IHx8ICFjb250ZXh0UGFyYW1zKSB7XHJcbiAgICAgIGxldCB2aXNpYmxlT25MYXllcnNQYXJhbXMgPSAnJztcclxuICAgICAgbGV0IHZpc2libGVPZmZMYXllcnNQYXJhbXMgPSAnJztcclxuICAgICAgbGV0IHZpc2libGVsYXllcnM6IHN0cmluZ1tdID0gW107XHJcbiAgICAgIGxldCBpbnZpc2libGVsYXllcnM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPbkxheWVyc0tleSAmJlxyXG4gICAgICAgIHBhcmFtc1t0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9uTGF5ZXJzS2V5IGFzIHN0cmluZ11cclxuICAgICAgKSB7XHJcbiAgICAgICAgdmlzaWJsZU9uTGF5ZXJzUGFyYW1zID1cclxuICAgICAgICAgIHBhcmFtc1t0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9uTGF5ZXJzS2V5IGFzIHN0cmluZ107XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT2ZmTGF5ZXJzS2V5ICYmXHJcbiAgICAgICAgcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT2ZmTGF5ZXJzS2V5IGFzIHN0cmluZ11cclxuICAgICAgKSB7XHJcbiAgICAgICAgdmlzaWJsZU9mZkxheWVyc1BhcmFtcyA9XHJcbiAgICAgICAgICBwYXJhbXNbdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPZmZMYXllcnNLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLyogVGhpcyBvcmRlciBpcyBpbXBvcnRhbnQgYmVjYXVzZSB0byBjb250cm9sIHdoaWNoZXZlclxyXG4gICAgICAgdGhlIG9yZGVyIG9mICogcGFyYW0uIEZpcnN0IHdoZSBvcGVuIGFuZCBjbG9zZSBldmVyeXRoaW5nLiovXHJcbiAgICAgIGlmICh2aXNpYmxlT25MYXllcnNQYXJhbXMgPT09ICcqJykge1xyXG4gICAgICAgIHZpc2libGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh2aXNpYmxlT2ZmTGF5ZXJzUGFyYW1zID09PSAnKicpIHtcclxuICAgICAgICB2aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFmdGVyLCBtYW5hZ2luZyBuYW1lZCBsYXllciBieSBpZCAoY29udGV4dC5qc29uIE9SIGlkIGZyb20gZGF0YXNvdXJjZSlcclxuICAgICAgdmlzaWJsZWxheWVycyA9IHZpc2libGVPbkxheWVyc1BhcmFtcy5zcGxpdCgnLCcpO1xyXG4gICAgICBpbnZpc2libGVsYXllcnMgPSB2aXNpYmxlT2ZmTGF5ZXJzUGFyYW1zLnNwbGl0KCcsJyk7XHJcbiAgICAgIGlmICh2aXNpYmxlbGF5ZXJzLmluZGV4T2YoY3VycmVudExheWVyaWQpID4gLTEpIHtcclxuICAgICAgICB2aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaW52aXNpYmxlbGF5ZXJzLmluZGV4T2YoY3VycmVudExheWVyaWQpID4gLTEpIHtcclxuICAgICAgICB2aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmlzaWJsZTtcclxuICB9XHJcbn1cclxuIl19