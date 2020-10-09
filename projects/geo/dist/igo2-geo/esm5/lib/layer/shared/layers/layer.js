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
var /**
 * @abstract
 */
Layer = /** @class */ (function () {
    function Layer(options, authInterceptor) {
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
        function (bunch) { return bunch[0] && bunch[1]; })));
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
    Object.defineProperty(Layer.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.id || this.dataSource.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.title;
        },
        set: /**
         * @param {?} title
         * @return {?}
         */
        function (title) {
            this.options.title = title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "zIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ol.getZIndex();
        },
        set: /**
         * @param {?} zIndex
         * @return {?}
         */
        function (zIndex) {
            this.ol.setZIndex(zIndex);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "baseLayer", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.baseLayer;
        },
        set: /**
         * @param {?} baseLayer
         * @return {?}
         */
        function (baseLayer) {
            this.options.baseLayer = baseLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "opacity", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ol.get('opacity');
        },
        set: /**
         * @param {?} opacity
         * @return {?}
         */
        function (opacity) {
            this.ol.setOpacity(opacity);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "isInResolutionsRange", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isInResolutionsRange$.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isInResolutionsRange$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "maxResolution", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ol.getMaxResolution();
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.ol.setMaxResolution(value || Infinity);
            this.updateInResolutionsRange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "minResolution", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ol.getMinResolution();
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.ol.setMinResolution(value || 0);
            this.updateInResolutionsRange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this.visible$.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.ol.setVisible(value);
            this.visible$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "displayed", {
        get: /**
         * @return {?}
         */
        function () {
            return this.visible && this.isInResolutionsRange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "showInLayerList", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.showInLayerList !== false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} igoMap
     * @return {?}
     */
    Layer.prototype.setMap = /**
     * @param {?} igoMap
     * @return {?}
     */
    function (igoMap) {
        this.map = igoMap;
        this.unobserveResolution();
        if (igoMap !== undefined) {
            this.observeResolution();
        }
    };
    /**
     * @private
     * @return {?}
     */
    Layer.prototype.observeResolution = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.resolution$$ = this.map.viewController.resolution$.subscribe((/**
         * @return {?}
         */
        function () {
            return _this.updateInResolutionsRange();
        }));
    };
    /**
     * @private
     * @return {?}
     */
    Layer.prototype.unobserveResolution = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.resolution$$ !== undefined) {
            this.resolution$$.unsubscribe();
            this.resolution$$ = undefined;
        }
    };
    /**
     * @private
     * @return {?}
     */
    Layer.prototype.updateInResolutionsRange = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.map !== undefined) {
            /** @type {?} */
            var resolution = this.map.viewController.getResolution();
            /** @type {?} */
            var minResolution = this.minResolution;
            /** @type {?} */
            var maxResolution = this.maxResolution === undefined ? Infinity : this.maxResolution;
            this.isInResolutionsRange = resolution >= minResolution && resolution <= maxResolution;
        }
        else {
            this.isInResolutionsRange = false;
        }
    };
    return Layer;
}());
/**
 * @abstract
 */
export { Layer };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGVBQWUsRUFJZixhQUFhLEVBQ2QsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFTckMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7QUFJdkU7Ozs7SUErRkUsZUFDUyxPQUFxQixFQUNsQixlQUFpQztRQURwQyxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQ2xCLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQTdGdEMsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBaURqQywwQkFBcUIsR0FFMUIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUF5QnRCLGFBQVEsR0FBNkIsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFLcEUsZUFBVSxHQUF3QixhQUFhLENBQUM7WUFDdkQsSUFBSSxDQUFDLHFCQUFxQjtZQUMxQixJQUFJLENBQUMsUUFBUTtTQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsS0FBeUIsSUFBSyxPQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQXBCLENBQW9CLEVBQUMsQ0FBQyxDQUFDO1FBVWhFLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUVqQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMvQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1B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QUFNO1lBQ0wsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztTQUNuQztJQUNILENBQUM7SUFDSCxZQUFDO0FBQUQsQ0FBQyxBQXRLRCxJQXNLQzs7Ozs7OztJQXJLQywwQkFBMEI7O0lBQzFCLDJCQUE4Qjs7SUFDOUIsdUJBQXdCOztJQUN4QixnQ0FBdUM7O0lBQ3ZDLG1DQUEwQzs7SUFDMUMsb0JBQW1COztJQUNuQixtQkFBbUI7O0lBQ25CLHdCQUF1Qzs7Ozs7SUFFdkMsNkJBQW1DOztJQTRDbkMsc0NBRStCOztJQXlCL0IseUJBQTZFOztJQUs3RSwyQkFHa0U7O0lBT2hFLHdCQUE0Qjs7Ozs7SUFDNUIsZ0NBQTJDOzs7Ozs7SUFtQzdDLGdEQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQmVoYXZpb3JTdWJqZWN0LFxyXG4gIE9ic2VydmFibGUsXHJcbiAgU3ViamVjdCxcclxuICBTdWJzY3JpcHRpb24sXHJcbiAgY29tYmluZUxhdGVzdFxyXG59IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgb2xMYXllciBmcm9tICdvbC9sYXllci9MYXllcic7XHJcblxyXG5pbXBvcnQgeyBBdXRoSW50ZXJjZXB0b3IgfSBmcm9tICdAaWdvMi9hdXRoJztcclxuaW1wb3J0IHsgU3ViamVjdFN0YXR1cyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UsIExlZ2VuZCB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IGdldFJlc29sdXRpb25Gcm9tU2NhbGUgfSBmcm9tICcuLi8uLi8uLi9tYXAvc2hhcmVkL21hcC51dGlscyc7XHJcblxyXG5pbXBvcnQgeyBMYXllck9wdGlvbnMgfSBmcm9tICcuL2xheWVyLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGF5ZXIge1xyXG4gIHB1YmxpYyBjb2xsYXBzZWQ6IGJvb2xlYW47XHJcbiAgcHVibGljIGRhdGFTb3VyY2U6IERhdGFTb3VyY2U7XHJcbiAgcHVibGljIGxlZ2VuZDogTGVnZW5kW107XHJcbiAgcHVibGljIGxlZ2VuZENvbGxhcHNlZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIGZpcnN0TG9hZENvbXBvbmVudDogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIG1hcDogSWdvTWFwO1xyXG4gIHB1YmxpYyBvbDogb2xMYXllcjtcclxuICBwdWJsaWMgc3RhdHVzJDogU3ViamVjdDxTdWJqZWN0U3RhdHVzPjtcclxuXHJcbiAgcHJpdmF0ZSByZXNvbHV0aW9uJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmlkIHx8IHRoaXMuZGF0YVNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50aXRsZTtcclxuICB9XHJcblxyXG4gIHNldCB0aXRsZSh0aXRsZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMudGl0bGUgPSB0aXRsZTtcclxuICB9XHJcblxyXG4gIGdldCB6SW5kZXgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm9sLmdldFpJbmRleCgpO1xyXG4gIH1cclxuXHJcbiAgc2V0IHpJbmRleCh6SW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5vbC5zZXRaSW5kZXgoekluZGV4KTtcclxuICB9XHJcblxyXG4gIGdldCBiYXNlTGF5ZXIoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmJhc2VMYXllcjtcclxuICB9XHJcblxyXG4gIHNldCBiYXNlTGF5ZXIoYmFzZUxheWVyOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMuYmFzZUxheWVyID0gYmFzZUxheWVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG9wYWNpdHkoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm9sLmdldCgnb3BhY2l0eScpO1xyXG4gIH1cclxuXHJcbiAgc2V0IG9wYWNpdHkob3BhY2l0eTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm9sLnNldE9wYWNpdHkob3BhY2l0eSk7XHJcbiAgfVxyXG5cclxuICBzZXQgaXNJblJlc29sdXRpb25zUmFuZ2UodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuaXNJblJlc29sdXRpb25zUmFuZ2UkLm5leHQodmFsdWUpO1xyXG4gIH1cclxuICBnZXQgaXNJblJlc29sdXRpb25zUmFuZ2UoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5pc0luUmVzb2x1dGlvbnNSYW5nZSQudmFsdWU7XHJcbiAgfVxyXG4gIHJlYWRvbmx5IGlzSW5SZXNvbHV0aW9uc1JhbmdlJDogQmVoYXZpb3JTdWJqZWN0PFxyXG4gICAgYm9vbGVhblxyXG4gID4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgc2V0IG1heFJlc29sdXRpb24odmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5vbC5zZXRNYXhSZXNvbHV0aW9uKHZhbHVlIHx8IEluZmluaXR5KTtcclxuICAgIHRoaXMudXBkYXRlSW5SZXNvbHV0aW9uc1JhbmdlKCk7XHJcbiAgfVxyXG4gIGdldCBtYXhSZXNvbHV0aW9uKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5vbC5nZXRNYXhSZXNvbHV0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBzZXQgbWluUmVzb2x1dGlvbih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm9sLnNldE1pblJlc29sdXRpb24odmFsdWUgfHwgMCk7XHJcbiAgICB0aGlzLnVwZGF0ZUluUmVzb2x1dGlvbnNSYW5nZSgpO1xyXG4gIH1cclxuICBnZXQgbWluUmVzb2x1dGlvbigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMub2wuZ2V0TWluUmVzb2x1dGlvbigpO1xyXG4gIH1cclxuXHJcbiAgc2V0IHZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMub2wuc2V0VmlzaWJsZSh2YWx1ZSk7XHJcbiAgICB0aGlzLnZpc2libGUkLm5leHQodmFsdWUpO1xyXG4gIH1cclxuICBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnZpc2libGUkLnZhbHVlO1xyXG4gIH1cclxuICByZWFkb25seSB2aXNpYmxlJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICBnZXQgZGlzcGxheWVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMudmlzaWJsZSAmJiB0aGlzLmlzSW5SZXNvbHV0aW9uc1JhbmdlO1xyXG4gIH1cclxuICByZWFkb25seSBkaXNwbGF5ZWQkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gY29tYmluZUxhdGVzdChbXHJcbiAgICB0aGlzLmlzSW5SZXNvbHV0aW9uc1JhbmdlJCxcclxuICAgIHRoaXMudmlzaWJsZSRcclxuICBdKS5waXBlKG1hcCgoYnVuY2g6IFtib29sZWFuLCBib29sZWFuXSkgPT4gYnVuY2hbMF0gJiYgYnVuY2hbMV0pKTtcclxuXHJcbiAgZ2V0IHNob3dJbkxheWVyTGlzdCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2hvd0luTGF5ZXJMaXN0ICE9PSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIG9wdGlvbnM6IExheWVyT3B0aW9ucyxcclxuICAgIHByb3RlY3RlZCBhdXRoSW50ZXJjZXB0b3I/OiBBdXRoSW50ZXJjZXB0b3JcclxuICApIHtcclxuICAgIHRoaXMuZGF0YVNvdXJjZSA9IG9wdGlvbnMuc291cmNlO1xyXG5cclxuICAgIHRoaXMub2wgPSB0aGlzLmNyZWF0ZU9sTGF5ZXIoKTtcclxuICAgIGlmIChvcHRpb25zLnpJbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuekluZGV4ID0gb3B0aW9ucy56SW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnMuYmFzZUxheWVyICYmIG9wdGlvbnMudmlzaWJsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG9wdGlvbnMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubWF4UmVzb2x1dGlvbiA9IG9wdGlvbnMubWF4UmVzb2x1dGlvbiB8fCBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKE51bWJlcihvcHRpb25zLm1heFNjYWxlRGVub20pKTtcclxuICAgIHRoaXMubWluUmVzb2x1dGlvbiA9IG9wdGlvbnMubWluUmVzb2x1dGlvbiB8fCBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKE51bWJlcihvcHRpb25zLm1pblNjYWxlRGVub20pKTtcclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSBvcHRpb25zLnZpc2libGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRpb25zLnZpc2libGU7XHJcbiAgICB0aGlzLm9wYWNpdHkgPSBvcHRpb25zLm9wYWNpdHkgPT09IHVuZGVmaW5lZCA/IDEgOiBvcHRpb25zLm9wYWNpdHk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBvcHRpb25zLmxlZ2VuZE9wdGlvbnMgJiZcclxuICAgICAgKG9wdGlvbnMubGVnZW5kT3B0aW9ucy51cmwgfHwgb3B0aW9ucy5sZWdlbmRPcHRpb25zLmh0bWwpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5sZWdlbmQgPSB0aGlzLmRhdGFTb3VyY2Uuc2V0TGVnZW5kKG9wdGlvbnMubGVnZW5kT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sZWdlbmRDb2xsYXBzZWQgPSBvcHRpb25zLmxlZ2VuZE9wdGlvbnNcclxuICAgICAgPyBvcHRpb25zLmxlZ2VuZE9wdGlvbnMuY29sbGFwc2VkXHJcbiAgICAgICAgPyBvcHRpb25zLmxlZ2VuZE9wdGlvbnMuY29sbGFwc2VkXHJcbiAgICAgICAgOiB0cnVlXHJcbiAgICAgIDogdHJ1ZTtcclxuXHJcbiAgICB0aGlzLm9sLnNldCgnX2xheWVyJywgdGhpcywgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlT2xMYXllcigpOiBvbExheWVyO1xyXG5cclxuICBzZXRNYXAoaWdvTWFwOiBJZ29NYXAgfCB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMubWFwID0gaWdvTWFwO1xyXG5cclxuICAgIHRoaXMudW5vYnNlcnZlUmVzb2x1dGlvbigpO1xyXG4gICAgaWYgKGlnb01hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZVJlc29sdXRpb24oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb2JzZXJ2ZVJlc29sdXRpb24oKSB7XHJcbiAgICB0aGlzLnJlc29sdXRpb24kJCA9IHRoaXMubWFwLnZpZXdDb250cm9sbGVyLnJlc29sdXRpb24kLnN1YnNjcmliZSgoKSA9PlxyXG4gICAgICB0aGlzLnVwZGF0ZUluUmVzb2x1dGlvbnNSYW5nZSgpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1bm9ic2VydmVSZXNvbHV0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMucmVzb2x1dGlvbiQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5yZXNvbHV0aW9uJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5yZXNvbHV0aW9uJCQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUluUmVzb2x1dGlvbnNSYW5nZSgpIHtcclxuICAgIGlmICh0aGlzLm1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IHJlc29sdXRpb24gPSB0aGlzLm1hcC52aWV3Q29udHJvbGxlci5nZXRSZXNvbHV0aW9uKCk7XHJcbiAgICAgIGNvbnN0IG1pblJlc29sdXRpb24gPSB0aGlzLm1pblJlc29sdXRpb247XHJcbiAgICAgIGNvbnN0IG1heFJlc29sdXRpb24gPSB0aGlzLm1heFJlc29sdXRpb24gPT09IHVuZGVmaW5lZCA/IEluZmluaXR5IDogdGhpcy5tYXhSZXNvbHV0aW9uO1xyXG4gICAgICB0aGlzLmlzSW5SZXNvbHV0aW9uc1JhbmdlID0gcmVzb2x1dGlvbiA+PSBtaW5SZXNvbHV0aW9uICYmIHJlc29sdXRpb24gPD0gbWF4UmVzb2x1dGlvbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNJblJlc29sdXRpb25zUmFuZ2UgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19