/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { getResolutionFromScale } from '../../../map/shared/map.utils';
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
        this.maxResolution = options.maxResolution || getResolutionFromScale(Number(options.maxScaleDenom));
        this.minResolution = options.minResolution || getResolutionFromScale(Number(options.minScaleDenom));
        this.visible = options.visible === undefined ? true : options.visible;
        this.opacity = options.opacity === undefined ? 1 : options.opacity;
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
    set isInResolutionsRange(value) {
        this.isInResolutionsRange$.next(value);
    }
    /**
     * @return {?}
     */
    get isInResolutionsRange() {
        return this.isInResolutionsRange$.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxResolution(value) {
        this.ol.setMaxResolution(value || Infinity);
        this.updateInResolutionsRange();
    }
    /**
     * @return {?}
     */
    get maxResolution() {
        return this.ol.getMaxResolution();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minResolution(value) {
        this.ol.setMinResolution(value || 0);
        this.updateInResolutionsRange();
    }
    /**
     * @return {?}
     */
    get minResolution() {
        return this.ol.getMinResolution();
    }
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
    get visible() {
        return this.visible$.value;
    }
    /**
     * @return {?}
     */
    get displayed() {
        return this.visible && this.isInResolutionsRange;
    }
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
        this.resolution$$ = this.map.viewController.resolution$.subscribe((/**
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
            const minResolution = this.minResolution;
            /** @type {?} */
            const maxResolution = this.maxResolution === undefined ? Infinity : this.maxResolution;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGVBQWUsRUFJZixhQUFhLEVBQ2QsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFTckMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7QUFJdkUsTUFBTSxPQUFnQixLQUFLOzs7OztJQW1HekIsWUFDUyxPQUFxQixFQUNsQixlQUFpQztRQURwQyxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQ2xCLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQWpHdEMsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBcURqQywwQkFBcUIsR0FFMUIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUF5QnRCLGFBQVEsR0FBNkIsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFLcEUsZUFBVSxHQUF3QixhQUFhLENBQUM7WUFDdkQsSUFBSSxDQUFDLHFCQUFxQjtZQUMxQixJQUFJLENBQUMsUUFBUTtTQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLENBQUMsS0FBeUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFVaEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRWpDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQy9CLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxP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SUFDSCxDQUFDO0NBQ0Y7OztJQXpLQywwQkFBMEI7O0lBQzFCLDJCQUE4Qjs7SUFDOUIsdUJBQXdCOztJQUN4QixnQ0FBdUM7O0lBQ3ZDLG1DQUEwQzs7SUFDMUMsb0JBQW1COztJQUNuQixtQkFBbUI7O0lBQ25CLHdCQUF1Qzs7Ozs7SUFFdkMsNkJBQW1DOztJQWdEbkMsc0NBRStCOztJQXlCL0IseUJBQTZFOztJQUs3RSwyQkFHa0U7O0lBT2hFLHdCQUE0Qjs7Ozs7SUFDNUIsZ0NBQTJDOzs7Ozs7SUFtQzdDLGdEQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQmVoYXZpb3JTdWJqZWN0LFxyXG4gIE9ic2VydmFibGUsXHJcbiAgU3ViamVjdCxcclxuICBTdWJzY3JpcHRpb24sXHJcbiAgY29tYmluZUxhdGVzdFxyXG59IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgb2xMYXllciBmcm9tICdvbC9sYXllci9MYXllcic7XHJcblxyXG5pbXBvcnQgeyBBdXRoSW50ZXJjZXB0b3IgfSBmcm9tICdAaWdvMi9hdXRoJztcclxuaW1wb3J0IHsgU3ViamVjdFN0YXR1cyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UsIExlZ2VuZCB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IGdldFJlc29sdXRpb25Gcm9tU2NhbGUgfSBmcm9tICcuLi8uLi8uLi9tYXAvc2hhcmVkL21hcC51dGlscyc7XHJcblxyXG5pbXBvcnQgeyBMYXllck9wdGlvbnMgfSBmcm9tICcuL2xheWVyLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGF5ZXIge1xyXG4gIHB1YmxpYyBjb2xsYXBzZWQ6IGJvb2xlYW47XHJcbiAgcHVibGljIGRhdGFTb3VyY2U6IERhdGFTb3VyY2U7XHJcbiAgcHVibGljIGxlZ2VuZDogTGVnZW5kW107XHJcbiAgcHVibGljIGxlZ2VuZENvbGxhcHNlZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIGZpcnN0TG9hZENvbXBvbmVudDogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIG1hcDogSWdvTWFwO1xyXG4gIHB1YmxpYyBvbDogb2xMYXllcjtcclxuICBwdWJsaWMgc3RhdHVzJDogU3ViamVjdDxTdWJqZWN0U3RhdHVzPjtcclxuXHJcbiAgcHJpdmF0ZSByZXNvbHV0aW9uJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmlkIHx8IHRoaXMuZGF0YVNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIGdldCBhbGlhcygpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGlhcztcclxuICB9XHJcblxyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50aXRsZTtcclxuICB9XHJcblxyXG4gIHNldCB0aXRsZSh0aXRsZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMudGl0bGUgPSB0aXRsZTtcclxuICB9XHJcblxyXG4gIGdldCB6SW5kZXgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm9sLmdldFpJbmRleCgpO1xyXG4gIH1cclxuXHJcbiAgc2V0IHpJbmRleCh6SW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5vbC5zZXRaSW5kZXgoekluZGV4KTtcclxuICB9XHJcblxyXG4gIGdldCBiYXNlTGF5ZXIoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmJhc2VMYXllcjtcclxuICB9XHJcblxyXG4gIHNldCBiYXNlTGF5ZXIoYmFzZUxheWVyOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMuYmFzZUxheWVyID0gYmFzZUxheWVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG9wYWNpdHkoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm9sLmdldCgnb3BhY2l0eScpO1xyXG4gIH1cclxuXHJcbiAgc2V0IG9wYWNpdHkob3BhY2l0eTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm9sLnNldE9wYWNpdHkob3BhY2l0eSk7XHJcbiAgfVxyXG5cclxuICBzZXQgaXNJblJlc29sdXRpb25zUmFuZ2UodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuaXNJblJlc29sdXRpb25zUmFuZ2UkLm5leHQodmFsdWUpO1xyXG4gIH1cclxuICBnZXQgaXNJblJlc29sdXRpb25zUmFuZ2UoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5pc0luUmVzb2x1dGlvbnNSYW5nZSQudmFsdWU7XHJcbiAgfVxyXG4gIHJlYWRvbmx5IGlzSW5SZXNvbHV0aW9uc1JhbmdlJDogQmVoYXZpb3JTdWJqZWN0PFxyXG4gICAgYm9vbGVhblxyXG4gID4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgc2V0IG1heFJlc29sdXRpb24odmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5vbC5zZXRNYXhSZXNvbHV0aW9uKHZhbHVlIHx8IEluZmluaXR5KTtcclxuICAgIHRoaXMudXBkYXRlSW5SZXNvbHV0aW9uc1JhbmdlKCk7XHJcbiAgfVxyXG4gIGdldCBtYXhSZXNvbHV0aW9uKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5vbC5nZXRNYXhSZXNvbHV0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBzZXQgbWluUmVzb2x1dGlvbih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm9sLnNldE1pblJlc29sdXRpb24odmFsdWUgfHwgMCk7XHJcbiAgICB0aGlzLnVwZGF0ZUluUmVzb2x1dGlvbnNSYW5nZSgpO1xyXG4gIH1cclxuICBnZXQgbWluUmVzb2x1dGlvbigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMub2wuZ2V0TWluUmVzb2x1dGlvbigpO1xyXG4gIH1cclxuXHJcbiAgc2V0IHZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMub2wuc2V0VmlzaWJsZSh2YWx1ZSk7XHJcbiAgICB0aGlzLnZpc2libGUkLm5leHQodmFsdWUpO1xyXG4gIH1cclxuICBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnZpc2libGUkLnZhbHVlO1xyXG4gIH1cclxuICByZWFkb25seSB2aXNpYmxlJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICBnZXQgZGlzcGxheWVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMudmlzaWJsZSAmJiB0aGlzLmlzSW5SZXNvbHV0aW9uc1JhbmdlO1xyXG4gIH1cclxuICByZWFkb25seSBkaXNwbGF5ZWQkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gY29tYmluZUxhdGVzdChbXHJcbiAgICB0aGlzLmlzSW5SZXNvbHV0aW9uc1JhbmdlJCxcclxuICAgIHRoaXMudmlzaWJsZSRcclxuICBdKS5waXBlKG1hcCgoYnVuY2g6IFtib29sZWFuLCBib29sZWFuXSkgPT4gYnVuY2hbMF0gJiYgYnVuY2hbMV0pKTtcclxuXHJcbiAgZ2V0IHNob3dJbkxheWVyTGlzdCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2hvd0luTGF5ZXJMaXN0ICE9PSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIG9wdGlvbnM6IExheWVyT3B0aW9ucyxcclxuICAgIHByb3RlY3RlZCBhdXRoSW50ZXJjZXB0b3I/OiBBdXRoSW50ZXJjZXB0b3JcclxuICApIHtcclxuICAgIHRoaXMuZGF0YVNvdXJjZSA9IG9wdGlvbnMuc291cmNlO1xyXG5cclxuICAgIHRoaXMub2wgPSB0aGlzLmNyZWF0ZU9sTGF5ZXIoKTtcclxuICAgIGlmIChvcHRpb25zLnpJbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuekluZGV4ID0gb3B0aW9ucy56SW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnMuYmFzZUxheWVyICYmIG9wdGlvbnMudmlzaWJsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG9wdGlvbnMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubWF4UmVzb2x1dGlvbiA9IG9wdGlvbnMubWF4UmVzb2x1dGlvbiB8fCBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKE51bWJlcihvcHRpb25zLm1heFNjYWxlRGVub20pKTtcclxuICAgIHRoaXMubWluUmVzb2x1dGlvbiA9IG9wdGlvbnMubWluUmVzb2x1dGlvbiB8fCBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKE51bWJlcihvcHRpb25zLm1pblNjYWxlRGVub20pKTtcclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSBvcHRpb25zLnZpc2libGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRpb25zLnZpc2libGU7XHJcbiAgICB0aGlzLm9wYWNpdHkgPSBvcHRpb25zLm9wYWNpdHkgPT09IHVuZGVmaW5lZCA/IDEgOiBvcHRpb25zLm9wYWNpdHk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBvcHRpb25zLmxlZ2VuZE9wdGlvbnMgJiZcclxuICAgICAgKG9wdGlvbnMubGVnZW5kT3B0aW9ucy51cmwgfHwgb3B0aW9ucy5sZWdlbmRPcHRpb25zLmh0bWwpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5sZWdlbmQgPSB0aGlzLmRhdGFTb3VyY2Uuc2V0TGVnZW5kKG9wdGlvbnMubGVnZW5kT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sZWdlbmRDb2xsYXBzZWQgPSBvcHRpb25zLmxlZ2VuZE9wdGlvbnNcclxuICAgICAgPyBvcHRpb25zLmxlZ2VuZE9wdGlvbnMuY29sbGFwc2VkXHJcbiAgICAgICAgPyBvcHRpb25zLmxlZ2VuZE9wdGlvbnMuY29sbGFwc2VkXHJcbiAgICAgICAgOiB0cnVlXHJcbiAgICAgIDogdHJ1ZTtcclxuXHJcbiAgICB0aGlzLm9sLnNldCgnX2xheWVyJywgdGhpcywgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlT2xMYXllcigpOiBvbExheWVyO1xyXG5cclxuICBzZXRNYXAoaWdvTWFwOiBJZ29NYXAgfCB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMubWFwID0gaWdvTWFwO1xyXG5cclxuICAgIHRoaXMudW5vYnNlcnZlUmVzb2x1dGlvbigpO1xyXG4gICAgaWYgKGlnb01hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZVJlc29sdXRpb24oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb2JzZXJ2ZVJlc29sdXRpb24oKSB7XHJcbiAgICB0aGlzLnJlc29sdXRpb24kJCA9IHRoaXMubWFwLnZpZXdDb250cm9sbGVyLnJlc29sdXRpb24kLnN1YnNjcmliZSgoKSA9PlxyXG4gICAgICB0aGlzLnVwZGF0ZUluUmVzb2x1dGlvbnNSYW5nZSgpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1bm9ic2VydmVSZXNvbHV0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMucmVzb2x1dGlvbiQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5yZXNvbHV0aW9uJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5yZXNvbHV0aW9uJCQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUluUmVzb2x1dGlvbnNSYW5nZSgpIHtcclxuICAgIGlmICh0aGlzLm1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IHJlc29sdXRpb24gPSB0aGlzLm1hcC52aWV3Q29udHJvbGxlci5nZXRSZXNvbHV0aW9uKCk7XHJcbiAgICAgIGNvbnN0IG1pblJlc29sdXRpb24gPSB0aGlzLm1pblJlc29sdXRpb247XHJcbiAgICAgIGNvbnN0IG1heFJlc29sdXRpb24gPSB0aGlzLm1heFJlc29sdXRpb24gPT09IHVuZGVmaW5lZCA/IEluZmluaXR5IDogdGhpcy5tYXhSZXNvbHV0aW9uO1xyXG4gICAgICB0aGlzLmlzSW5SZXNvbHV0aW9uc1JhbmdlID0gcmVzb2x1dGlvbiA+PSBtaW5SZXNvbHV0aW9uICYmIHJlc29sdXRpb24gPD0gbWF4UmVzb2x1dGlvbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNJblJlc29sdXRpb25zUmFuZ2UgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19