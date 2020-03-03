/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * @abstract
 */
export class Layer {
    /**
     * @param {?} options
     * @param {?=} authInterceptor
     */
    constructor(options, authInterceptor) {
        this.options = options;
        this.authInterceptor = authInterceptor;
        this.legendCollapsed = true;
        this.firstLoadComponent = true;
        this.isInResolutionsRange$ = new BehaviorSubject(false);
        this.visible$ = new BehaviorSubject(undefined);
        this.displayed$ = combineLatest([
            this.isInResolutionsRange$,
            this.visible$
        ]).pipe(map((/**
         * @param {?} bunch
         * @return {?}
         */
        (bunch) => bunch[0] && bunch[1])));
        this.dataSource = options.source;
        this.ol = this.createOlLayer();
        if (options.zIndex !== undefined) {
            this.zIndex = options.zIndex;
        }
        if (options.baseLayer && options.visible === undefined) {
            options.visible = false;
        }
        if (options.maxResolution !== undefined) {
            this.maxResolution = options.maxResolution;
        }
        if (options.minResolution !== undefined) {
            this.minResolution = options.minResolution;
        }
        this.visible =
            options.visible === undefined ? true : options.visible;
        this.opacity =
            options.opacity === undefined ? 1 : options.opacity;
        if (options.legendOptions &&
            (options.legendOptions.url || options.legendOptions.html)) {
            this.legend = this.dataSource.setLegend(options.legendOptions);
        }
        this.legendCollapsed = options.legendOptions
            ? options.legendOptions.collapsed
                ? options.legendOptions.collapsed
                : true
            : true;
        this.ol.set('_layer', this, true);
    }
    /**
     * @return {?}
     */
    get id() {
        return this.options.id || this.dataSource.id;
    }
    /**
     * @return {?}
     */
    get alias() {
        return this.options.alias;
    }
    /**
     * @return {?}
     */
    get title() {
        return this.options.title;
    }
    /**
     * @param {?} title
     * @return {?}
     */
    set title(title) {
        this.options.title = title;
    }
    /**
     * @return {?}
     */
    get zIndex() {
        return this.ol.getZIndex();
    }
    /**
     * @param {?} zIndex
     * @return {?}
     */
    set zIndex(zIndex) {
        this.ol.setZIndex(zIndex);
    }
    /**
     * @return {?}
     */
    get baseLayer() {
        return this.options.baseLayer;
    }
    /**
     * @param {?} baseLayer
     * @return {?}
     */
    set baseLayer(baseLayer) {
        this.options.baseLayer = baseLayer;
    }
    /**
     * @return {?}
     */
    get opacity() {
        return this.ol.get('opacity');
    }
    /**
     * @param {?} opacity
     * @return {?}
     */
    set opacity(opacity) {
        this.ol.setOpacity(opacity);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isInResolutionsRange(value) { this.isInResolutionsRange$.next(value); }
    /**
     * @return {?}
     */
    get isInResolutionsRange() { return this.isInResolutionsRange$.value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxResolution(value) {
        this.ol.setMaxResolution(value);
        this.updateInResolutionsRange();
    }
    /**
     * @return {?}
     */
    get maxResolution() { return this.ol.getMaxResolution(); }
    /**
     * @param {?} value
     * @return {?}
     */
    set minResolution(value) {
        this.ol.setMinResolution(value);
        this.updateInResolutionsRange();
    }
    /**
     * @return {?}
     */
    get minResolution() { return this.ol.getMinResolution(); }
    /**
     * @param {?} value
     * @return {?}
     */
    set visible(value) {
        this.ol.setVisible(value);
        this.visible$.next(value);
    }
    /**
     * @return {?}
     */
    get visible() { return this.visible$.value; }
    /**
     * @return {?}
     */
    get displayed() { return this.visible && this.isInResolutionsRange; }
    /**
     * @return {?}
     */
    get showInLayerList() {
        return this.options.showInLayerList !== false;
    }
    /**
     * @param {?} igoMap
     * @return {?}
     */
    setMap(igoMap) {
        this.map = igoMap;
        this.unobserveResolution();
        if (igoMap !== undefined) {
            this.observeResolution();
        }
    }
    /**
     * @private
     * @return {?}
     */
    observeResolution() {
        this.resolution$$ = this.map.viewController.resolution$
            .subscribe((/**
         * @return {?}
         */
        () => this.updateInResolutionsRange()));
    }
    /**
     * @private
     * @return {?}
     */
    unobserveResolution() {
        if (this.resolution$$ !== undefined) {
            this.resolution$$.unsubscribe();
            this.resolution$$ = undefined;
        }
    }
    /**
     * @private
     * @return {?}
     */
    updateInResolutionsRange() {
        if (this.map !== undefined) {
            /** @type {?} */
            const resolution = this.map.viewController.getResolution();
            /** @type {?} */
            const minResolution = this.minResolution || 0;
            /** @type {?} */
            const maxResolution = this.maxResolution || Infinity;
            this.isInResolutionsRange = resolution >= minResolution && resolution <= maxResolution;
        }
        else {
            this.isInResolutionsRange = false;
        }
    }
}
if (false) {
    /** @type {?} */
    Layer.prototype.collapsed;
    /** @type {?} */
    Layer.prototype.dataSource;
    /** @type {?} */
    Layer.prototype.legend;
    /** @type {?} */
    Layer.prototype.legendCollapsed;
    /** @type {?} */
    Layer.prototype.firstLoadComponent;
    /** @type {?} */
    Layer.prototype.map;
    /** @type {?} */
    Layer.prototype.ol;
    /** @type {?} */
    Layer.prototype.status$;
    /**
     * @type {?}
     * @private
     */
    Layer.prototype.resolution$$;
    /** @type {?} */
    Layer.prototype.isInResolutionsRange$;
    /** @type {?} */
    Layer.prototype.visible$;
    /** @type {?} */
    Layer.prototype.displayed$;
    /** @type {?} */
    Layer.prototype.options;
    /**
     * @type {?}
     * @protected
     */
    Layer.prototype.authInterceptor;
    /**
     * @abstract
     * @protected
     * @return {?}
     */
    Layer.prototype.createOlLayer = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGVBQWUsRUFJZixhQUFhLEVBQ2QsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQWdCLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBV25ELE1BQU0sT0FBZ0IsS0FBSzs7Ozs7SUF1RnpCLFlBQW1CLE9BQXFCLEVBQVksZUFBaUM7UUFBbEUsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQUFZLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQW5GOUUsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBaURqQywwQkFBcUIsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFtQjdFLGFBQVEsR0FBNkIsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFHcEUsZUFBVSxHQUF3QixhQUFhLENBQUM7WUFDdkQsSUFBSSxDQUFDLHFCQUFxQjtZQUMxQixJQUFJLENBQUMsUUFBUTtTQUNkLENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRzs7OztRQUFDLENBQUMsS0FBeUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUN6RCxDQUFDO1FBT0EsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRWpDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQy9CLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1NBQzlCO1FBRUQsSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3RELE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxPQUFPLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtZQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7U0FDNUM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztTQUM1QztRQUVELElBQUksQ0FBQyxPQUFPO1lBQ1YsT0FBTyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUN6RCxJQUFJLENBQUMsT0FBTztZQUNWLE9BQU8sQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFFdEQsSUFDRSxPQUFPLENBQUMsYUFBYTtZQUNyQixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQ3pEO1lBQ0EsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDaEU7UUFFRCxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxhQUFhO1lBQzFDLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVM7Z0JBQy9CLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVM7Z0JBQ2pDLENBQUMsQ0FBQyxJQUFJO1lBQ1IsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVULElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7OztJQWpIRCxJQUFJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO0lBQy9DLENBQUM7Ozs7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELElBQUksTUFBTSxDQUFDLE1BQWM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7OztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCxJQUFJLFNBQVMsQ0FBQyxTQUFrQjtRQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDckMsQ0FBQzs7OztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCxJQUFJLE9BQU8sQ0FBQyxPQUFlO1FBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRUQsSUFBSSxvQkFBb0IsQ0FBQyxLQUFjLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDcEYsSUFBSSxvQkFBb0IsS0FBYyxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7OztJQUdoRixJQUFJLGFBQWEsQ0FBQyxLQUFhO1FBQzdCLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDbEMsQ0FBQzs7OztJQUNELElBQUksYUFBYSxLQUFhLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFbEUsSUFBSSxhQUFhLENBQUMsS0FBYTtRQUM3QixJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFDRCxJQUFJLGFBQWEsS0FBYSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRWxFLElBQUksT0FBTyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7OztJQUNELElBQUksT0FBTyxLQUFjLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7O0lBR3RELElBQUksU0FBUyxLQUFjLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDOzs7O0lBUTlFLElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxLQUFLLEtBQUssQ0FBQztJQUNoRCxDQUFDOzs7OztJQTRDRCxNQUFNLENBQUMsTUFBMEI7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7UUFFbEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxpQkFBaUI7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxXQUFXO2FBQ3BELFNBQVM7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxFQUFDLENBQUM7SUFDdEQsQ0FBQzs7Ozs7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtZQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7Ozs7SUFFTyx3QkFBd0I7UUFDOUIsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTs7a0JBQ3BCLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUU7O2tCQUNwRCxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDOztrQkFDdkMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksUUFBUTtZQUNwRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsVUFBVSxJQUFJLGFBQWEsSUFBSSxVQUFVLElBQUksYUFBYSxDQUFDO1NBQ3hGO2FBQU07WUFDTCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztDQUNGOzs7SUEvSkMsMEJBQTBCOztJQUMxQiwyQkFBOEI7O0lBQzlCLHVCQUF3Qjs7SUFDeEIsZ0NBQXVDOztJQUN2QyxtQ0FBMEM7O0lBQzFDLG9CQUFtQjs7SUFDbkIsbUJBQW1COztJQUNuQix3QkFBdUM7Ozs7O0lBRXZDLDZCQUFtQzs7SUE0Q25DLHNDQUFzRjs7SUFtQnRGLHlCQUE2RTs7SUFHN0UsMkJBS0U7O0lBTVUsd0JBQTRCOzs7OztJQUFFLGdDQUEyQzs7Ozs7O0lBd0NyRixnREFBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEJlaGF2aW9yU3ViamVjdCxcclxuICBPYnNlcnZhYmxlLFxyXG4gIFN1YmplY3QsXHJcbiAgU3Vic2NyaXB0aW9uLFxyXG4gIGNvbWJpbmVMYXRlc3RcclxufSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgb2xMYXllciBmcm9tICdvbC9sYXllci9MYXllcic7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlLCBMZWdlbmQgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IEF1dGhJbnRlcmNlcHRvciB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5pbXBvcnQgeyBTdWJqZWN0U3RhdHVzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBMYXllck9wdGlvbnMgfSBmcm9tICcuL2xheWVyLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGF5ZXIge1xyXG4gIHB1YmxpYyBjb2xsYXBzZWQ6IGJvb2xlYW47XHJcbiAgcHVibGljIGRhdGFTb3VyY2U6IERhdGFTb3VyY2U7XHJcbiAgcHVibGljIGxlZ2VuZDogTGVnZW5kW107XHJcbiAgcHVibGljIGxlZ2VuZENvbGxhcHNlZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIGZpcnN0TG9hZENvbXBvbmVudDogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIG1hcDogSWdvTWFwO1xyXG4gIHB1YmxpYyBvbDogb2xMYXllcjtcclxuICBwdWJsaWMgc3RhdHVzJDogU3ViamVjdDxTdWJqZWN0U3RhdHVzPjtcclxuXHJcbiAgcHJpdmF0ZSByZXNvbHV0aW9uJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmlkIHx8IHRoaXMuZGF0YVNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIGdldCBhbGlhcygpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGlhcztcclxuICB9XHJcblxyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50aXRsZTtcclxuICB9XHJcblxyXG4gIHNldCB0aXRsZSh0aXRsZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMudGl0bGUgPSB0aXRsZTtcclxuICB9XHJcblxyXG4gIGdldCB6SW5kZXgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm9sLmdldFpJbmRleCgpO1xyXG4gIH1cclxuXHJcbiAgc2V0IHpJbmRleCh6SW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5vbC5zZXRaSW5kZXgoekluZGV4KTtcclxuICB9XHJcblxyXG4gIGdldCBiYXNlTGF5ZXIoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmJhc2VMYXllcjtcclxuICB9XHJcblxyXG4gIHNldCBiYXNlTGF5ZXIoYmFzZUxheWVyOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMuYmFzZUxheWVyID0gYmFzZUxheWVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG9wYWNpdHkoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm9sLmdldCgnb3BhY2l0eScpO1xyXG4gIH1cclxuXHJcbiAgc2V0IG9wYWNpdHkob3BhY2l0eTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm9sLnNldE9wYWNpdHkob3BhY2l0eSk7XHJcbiAgfVxyXG5cclxuICBzZXQgaXNJblJlc29sdXRpb25zUmFuZ2UodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5pc0luUmVzb2x1dGlvbnNSYW5nZSQubmV4dCh2YWx1ZSk7IH1cclxuICBnZXQgaXNJblJlc29sdXRpb25zUmFuZ2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmlzSW5SZXNvbHV0aW9uc1JhbmdlJC52YWx1ZTsgfVxyXG4gIHJlYWRvbmx5IGlzSW5SZXNvbHV0aW9uc1JhbmdlJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIHNldCBtYXhSZXNvbHV0aW9uKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMub2wuc2V0TWF4UmVzb2x1dGlvbih2YWx1ZSk7XHJcbiAgICB0aGlzLnVwZGF0ZUluUmVzb2x1dGlvbnNSYW5nZSgpO1xyXG4gIH1cclxuICBnZXQgbWF4UmVzb2x1dGlvbigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5vbC5nZXRNYXhSZXNvbHV0aW9uKCk7IH1cclxuXHJcbiAgc2V0IG1pblJlc29sdXRpb24odmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5vbC5zZXRNaW5SZXNvbHV0aW9uKHZhbHVlKTtcclxuICAgIHRoaXMudXBkYXRlSW5SZXNvbHV0aW9uc1JhbmdlKCk7XHJcbiAgfVxyXG4gIGdldCBtaW5SZXNvbHV0aW9uKCk6IG51bWJlciB7IHJldHVybiB0aGlzLm9sLmdldE1pblJlc29sdXRpb24oKTsgfVxyXG5cclxuICBzZXQgdmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5vbC5zZXRWaXNpYmxlKHZhbHVlKTtcclxuICAgIHRoaXMudmlzaWJsZSQubmV4dCh2YWx1ZSk7XHJcbiAgfVxyXG4gIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy52aXNpYmxlJC52YWx1ZTsgfVxyXG4gIHJlYWRvbmx5IHZpc2libGUkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XHJcblxyXG4gIGdldCBkaXNwbGF5ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnZpc2libGUgJiYgdGhpcy5pc0luUmVzb2x1dGlvbnNSYW5nZTsgfVxyXG4gIHJlYWRvbmx5IGRpc3BsYXllZCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSBjb21iaW5lTGF0ZXN0KFtcclxuICAgIHRoaXMuaXNJblJlc29sdXRpb25zUmFuZ2UkLFxyXG4gICAgdGhpcy52aXNpYmxlJFxyXG4gIF0pLnBpcGUoXHJcbiAgICBtYXAoKGJ1bmNoOiBbYm9vbGVhbiwgYm9vbGVhbl0pID0+IGJ1bmNoWzBdICYmIGJ1bmNoWzFdKVxyXG4gICk7XHJcblxyXG4gIGdldCBzaG93SW5MYXllckxpc3QoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNob3dJbkxheWVyTGlzdCAhPT0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogTGF5ZXJPcHRpb25zLCBwcm90ZWN0ZWQgYXV0aEludGVyY2VwdG9yPzogQXV0aEludGVyY2VwdG9yKSB7XHJcbiAgICB0aGlzLmRhdGFTb3VyY2UgPSBvcHRpb25zLnNvdXJjZTtcclxuXHJcbiAgICB0aGlzLm9sID0gdGhpcy5jcmVhdGVPbExheWVyKCk7XHJcbiAgICBpZiAob3B0aW9ucy56SW5kZXggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnpJbmRleCA9IG9wdGlvbnMuekluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLmJhc2VMYXllciAmJiBvcHRpb25zLnZpc2libGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBvcHRpb25zLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5tYXhSZXNvbHV0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXhSZXNvbHV0aW9uID0gb3B0aW9ucy5tYXhSZXNvbHV0aW9uO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMubWluUmVzb2x1dGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWluUmVzb2x1dGlvbiA9IG9wdGlvbnMubWluUmVzb2x1dGlvbjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnZpc2libGUgPVxyXG4gICAgICBvcHRpb25zLnZpc2libGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRpb25zLnZpc2libGU7XHJcbiAgICB0aGlzLm9wYWNpdHkgPVxyXG4gICAgICBvcHRpb25zLm9wYWNpdHkgPT09IHVuZGVmaW5lZCA/IDEgOiBvcHRpb25zLm9wYWNpdHk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBvcHRpb25zLmxlZ2VuZE9wdGlvbnMgJiZcclxuICAgICAgKG9wdGlvbnMubGVnZW5kT3B0aW9ucy51cmwgfHwgb3B0aW9ucy5sZWdlbmRPcHRpb25zLmh0bWwpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5sZWdlbmQgPSB0aGlzLmRhdGFTb3VyY2Uuc2V0TGVnZW5kKG9wdGlvbnMubGVnZW5kT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sZWdlbmRDb2xsYXBzZWQgPSBvcHRpb25zLmxlZ2VuZE9wdGlvbnNcclxuICAgICAgPyBvcHRpb25zLmxlZ2VuZE9wdGlvbnMuY29sbGFwc2VkXHJcbiAgICAgICAgPyBvcHRpb25zLmxlZ2VuZE9wdGlvbnMuY29sbGFwc2VkXHJcbiAgICAgICAgOiB0cnVlXHJcbiAgICAgIDogdHJ1ZTtcclxuXHJcbiAgICB0aGlzLm9sLnNldCgnX2xheWVyJywgdGhpcywgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlT2xMYXllcigpOiBvbExheWVyO1xyXG5cclxuICBzZXRNYXAoaWdvTWFwOiBJZ29NYXAgfCB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMubWFwID0gaWdvTWFwO1xyXG5cclxuICAgIHRoaXMudW5vYnNlcnZlUmVzb2x1dGlvbigpO1xyXG4gICAgaWYgKGlnb01hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZVJlc29sdXRpb24oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb2JzZXJ2ZVJlc29sdXRpb24oKSB7XHJcbiAgICB0aGlzLnJlc29sdXRpb24kJCA9IHRoaXMubWFwLnZpZXdDb250cm9sbGVyLnJlc29sdXRpb24kXHJcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVJblJlc29sdXRpb25zUmFuZ2UoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVub2JzZXJ2ZVJlc29sdXRpb24oKSB7XHJcbiAgICBpZiAodGhpcy5yZXNvbHV0aW9uJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnJlc29sdXRpb24kJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLnJlc29sdXRpb24kJCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlSW5SZXNvbHV0aW9uc1JhbmdlKCkge1xyXG4gICAgaWYgKHRoaXMubWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc3QgcmVzb2x1dGlvbiA9IHRoaXMubWFwLnZpZXdDb250cm9sbGVyLmdldFJlc29sdXRpb24oKTtcclxuICAgICAgY29uc3QgbWluUmVzb2x1dGlvbiA9IHRoaXMubWluUmVzb2x1dGlvbiB8fCAwO1xyXG4gICAgICBjb25zdCBtYXhSZXNvbHV0aW9uID0gdGhpcy5tYXhSZXNvbHV0aW9uIHx8IEluZmluaXR5O1xyXG4gICAgICB0aGlzLmlzSW5SZXNvbHV0aW9uc1JhbmdlID0gcmVzb2x1dGlvbiA+PSBtaW5SZXNvbHV0aW9uICYmIHJlc29sdXRpb24gPD0gbWF4UmVzb2x1dGlvbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNJblJlc29sdXRpb25zUmFuZ2UgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19