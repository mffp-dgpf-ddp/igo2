/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
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
    Object.defineProperty(Layer.prototype, "alias", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.alias;
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
        function () { return this.isInResolutionsRange$.value; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.isInResolutionsRange$.next(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "maxResolution", {
        get: /**
         * @return {?}
         */
        function () { return this.ol.getMaxResolution(); },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.ol.setMaxResolution(value);
            this.updateInResolutionsRange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "minResolution", {
        get: /**
         * @return {?}
         */
        function () { return this.ol.getMinResolution(); },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.ol.setMinResolution(value);
            this.updateInResolutionsRange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () { return this.visible$.value; },
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
        function () { return this.visible && this.isInResolutionsRange; },
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
        this.resolution$$ = this.map.viewController.resolution$
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.updateInResolutionsRange(); }));
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
            var minResolution = this.minResolution || 0;
            /** @type {?} */
            var maxResolution = this.maxResolution || Infinity;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGVBQWUsRUFJZixhQUFhLEVBQ2QsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQWdCLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBV25EOzs7O0lBdUZFLGVBQW1CLE9BQXFCLEVBQVksZUFBaUM7UUFBbEUsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQUFZLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQW5GOUUsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBaURqQywwQkFBcUIsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFtQjdFLGFBQVEsR0FBNkIsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFHcEUsZUFBVSxHQUF3QixhQUFhLENBQUM7WUFDdkQsSUFBSSxDQUFDLHFCQUFxQjtZQUMxQixJQUFJLENBQUMsUUFBUTtTQUNkLENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRzs7OztRQUFDLFVBQUMsS0FBeUIsSUFBSyxPQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQXBCLENBQW9CLEVBQUMsQ0FDekQsQ0FBQztRQU9BLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUVqQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMvQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUM5QjtRQUVELElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxP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LEtBQUssQ0FBQztTQUNuQztJQUNILENBQUM7SUFDSCxZQUFDO0FBQUQsQ0FBQyxBQWhLRCxJQWdLQzs7Ozs7OztJQS9KQywwQkFBMEI7O0lBQzFCLDJCQUE4Qjs7SUFDOUIsdUJBQXdCOztJQUN4QixnQ0FBdUM7O0lBQ3ZDLG1DQUEwQzs7SUFDMUMsb0JBQW1COztJQUNuQixtQkFBbUI7O0lBQ25CLHdCQUF1Qzs7Ozs7SUFFdkMsNkJBQW1DOztJQTRDbkMsc0NBQXNGOztJQW1CdEYseUJBQTZFOztJQUc3RSwyQkFLRTs7SUFNVSx3QkFBNEI7Ozs7O0lBQUUsZ0NBQTJDOzs7Ozs7SUF3Q3JGLGdEQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQmVoYXZpb3JTdWJqZWN0LFxyXG4gIE9ic2VydmFibGUsXHJcbiAgU3ViamVjdCxcclxuICBTdWJzY3JpcHRpb24sXHJcbiAgY29tYmluZUxhdGVzdFxyXG59IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCBvbExheWVyIGZyb20gJ29sL2xheWVyL0xheWVyJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UsIExlZ2VuZCB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi8uLi9tYXAnO1xyXG5cclxuaW1wb3J0IHsgQXV0aEludGVyY2VwdG9yIH0gZnJvbSAnQGlnbzIvYXV0aCc7XHJcbmltcG9ydCB7IFN1YmplY3RTdGF0dXMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IExheWVyT3B0aW9ucyB9IGZyb20gJy4vbGF5ZXIuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMYXllciB7XHJcbiAgcHVibGljIGNvbGxhcHNlZDogYm9vbGVhbjtcclxuICBwdWJsaWMgZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcclxuICBwdWJsaWMgbGVnZW5kOiBMZWdlbmRbXTtcclxuICBwdWJsaWMgbGVnZW5kQ29sbGFwc2VkOiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgZmlyc3RMb2FkQ29tcG9uZW50OiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgbWFwOiBJZ29NYXA7XHJcbiAgcHVibGljIG9sOiBvbExheWVyO1xyXG4gIHB1YmxpYyBzdGF0dXMkOiBTdWJqZWN0PFN1YmplY3RTdGF0dXM+O1xyXG5cclxuICBwcml2YXRlIHJlc29sdXRpb24kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaWQgfHwgdGhpcy5kYXRhU291cmNlLmlkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFsaWFzKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsaWFzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRpdGxlO1xyXG4gIH1cclxuXHJcbiAgc2V0IHRpdGxlKHRpdGxlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMub3B0aW9ucy50aXRsZSA9IHRpdGxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHpJbmRleCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMub2wuZ2V0WkluZGV4KCk7XHJcbiAgfVxyXG5cclxuICBzZXQgekluZGV4KHpJbmRleDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm9sLnNldFpJbmRleCh6SW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGJhc2VMYXllcigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYmFzZUxheWVyO1xyXG4gIH1cclxuXHJcbiAgc2V0IGJhc2VMYXllcihiYXNlTGF5ZXI6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMub3B0aW9ucy5iYXNlTGF5ZXIgPSBiYXNlTGF5ZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgb3BhY2l0eSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMub2wuZ2V0KCdvcGFjaXR5Jyk7XHJcbiAgfVxyXG5cclxuICBzZXQgb3BhY2l0eShvcGFjaXR5OiBudW1iZXIpIHtcclxuICAgIHRoaXMub2wuc2V0T3BhY2l0eShvcGFjaXR5KTtcclxuICB9XHJcblxyXG4gIHNldCBpc0luUmVzb2x1dGlvbnNSYW5nZSh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLmlzSW5SZXNvbHV0aW9uc1JhbmdlJC5uZXh0KHZhbHVlKTsgfVxyXG4gIGdldCBpc0luUmVzb2x1dGlvbnNSYW5nZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaXNJblJlc29sdXRpb25zUmFuZ2UkLnZhbHVlOyB9XHJcbiAgcmVhZG9ubHkgaXNJblJlc29sdXRpb25zUmFuZ2UkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgc2V0IG1heFJlc29sdXRpb24odmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5vbC5zZXRNYXhSZXNvbHV0aW9uKHZhbHVlKTtcclxuICAgIHRoaXMudXBkYXRlSW5SZXNvbHV0aW9uc1JhbmdlKCk7XHJcbiAgfVxyXG4gIGdldCBtYXhSZXNvbHV0aW9uKCk6IG51bWJlciB7IHJldHVybiB0aGlzLm9sLmdldE1heFJlc29sdXRpb24oKTsgfVxyXG5cclxuICBzZXQgbWluUmVzb2x1dGlvbih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm9sLnNldE1pblJlc29sdXRpb24odmFsdWUpO1xyXG4gICAgdGhpcy51cGRhdGVJblJlc29sdXRpb25zUmFuZ2UoKTtcclxuICB9XHJcbiAgZ2V0IG1pblJlc29sdXRpb24oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMub2wuZ2V0TWluUmVzb2x1dGlvbigpOyB9XHJcblxyXG4gIHNldCB2aXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLm9sLnNldFZpc2libGUodmFsdWUpO1xyXG4gICAgdGhpcy52aXNpYmxlJC5uZXh0KHZhbHVlKTtcclxuICB9XHJcbiAgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnZpc2libGUkLnZhbHVlOyB9XHJcbiAgcmVhZG9ubHkgdmlzaWJsZSQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcclxuXHJcbiAgZ2V0IGRpc3BsYXllZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMudmlzaWJsZSAmJiB0aGlzLmlzSW5SZXNvbHV0aW9uc1JhbmdlOyB9XHJcbiAgcmVhZG9ubHkgZGlzcGxheWVkJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IGNvbWJpbmVMYXRlc3QoW1xyXG4gICAgdGhpcy5pc0luUmVzb2x1dGlvbnNSYW5nZSQsXHJcbiAgICB0aGlzLnZpc2libGUkXHJcbiAgXSkucGlwZShcclxuICAgIG1hcCgoYnVuY2g6IFtib29sZWFuLCBib29sZWFuXSkgPT4gYnVuY2hbMF0gJiYgYnVuY2hbMV0pXHJcbiAgKTtcclxuXHJcbiAgZ2V0IHNob3dJbkxheWVyTGlzdCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2hvd0luTGF5ZXJMaXN0ICE9PSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBMYXllck9wdGlvbnMsIHByb3RlY3RlZCBhdXRoSW50ZXJjZXB0b3I/OiBBdXRoSW50ZXJjZXB0b3IpIHtcclxuICAgIHRoaXMuZGF0YVNvdXJjZSA9IG9wdGlvbnMuc291cmNlO1xyXG5cclxuICAgIHRoaXMub2wgPSB0aGlzLmNyZWF0ZU9sTGF5ZXIoKTtcclxuICAgIGlmIChvcHRpb25zLnpJbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuekluZGV4ID0gb3B0aW9ucy56SW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnMuYmFzZUxheWVyICYmIG9wdGlvbnMudmlzaWJsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG9wdGlvbnMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLm1heFJlc29sdXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm1heFJlc29sdXRpb24gPSBvcHRpb25zLm1heFJlc29sdXRpb247XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucy5taW5SZXNvbHV0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5taW5SZXNvbHV0aW9uID0gb3B0aW9ucy5taW5SZXNvbHV0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmlzaWJsZSA9XHJcbiAgICAgIG9wdGlvbnMudmlzaWJsZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdGlvbnMudmlzaWJsZTtcclxuICAgIHRoaXMub3BhY2l0eSA9XHJcbiAgICAgIG9wdGlvbnMub3BhY2l0eSA9PT0gdW5kZWZpbmVkID8gMSA6IG9wdGlvbnMub3BhY2l0eTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIG9wdGlvbnMubGVnZW5kT3B0aW9ucyAmJlxyXG4gICAgICAob3B0aW9ucy5sZWdlbmRPcHRpb25zLnVybCB8fCBvcHRpb25zLmxlZ2VuZE9wdGlvbnMuaHRtbClcclxuICAgICkge1xyXG4gICAgICB0aGlzLmxlZ2VuZCA9IHRoaXMuZGF0YVNvdXJjZS5zZXRMZWdlbmQob3B0aW9ucy5sZWdlbmRPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxlZ2VuZENvbGxhcHNlZCA9IG9wdGlvbnMubGVnZW5kT3B0aW9uc1xyXG4gICAgICA/IG9wdGlvbnMubGVnZW5kT3B0aW9ucy5jb2xsYXBzZWRcclxuICAgICAgICA/IG9wdGlvbnMubGVnZW5kT3B0aW9ucy5jb2xsYXBzZWRcclxuICAgICAgICA6IHRydWVcclxuICAgICAgOiB0cnVlO1xyXG5cclxuICAgIHRoaXMub2wuc2V0KCdfbGF5ZXInLCB0aGlzLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVPbExheWVyKCk6IG9sTGF5ZXI7XHJcblxyXG4gIHNldE1hcChpZ29NYXA6IElnb01hcCB8IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5tYXAgPSBpZ29NYXA7XHJcblxyXG4gICAgdGhpcy51bm9ic2VydmVSZXNvbHV0aW9uKCk7XHJcbiAgICBpZiAoaWdvTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlUmVzb2x1dGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvYnNlcnZlUmVzb2x1dGlvbigpIHtcclxuICAgIHRoaXMucmVzb2x1dGlvbiQkID0gdGhpcy5tYXAudmlld0NvbnRyb2xsZXIucmVzb2x1dGlvbiRcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZUluUmVzb2x1dGlvbnNSYW5nZSgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdW5vYnNlcnZlUmVzb2x1dGlvbigpIHtcclxuICAgIGlmICh0aGlzLnJlc29sdXRpb24kJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMucmVzb2x1dGlvbiQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMucmVzb2x1dGlvbiQkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVJblJlc29sdXRpb25zUmFuZ2UoKSB7XHJcbiAgICBpZiAodGhpcy5tYXAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCByZXNvbHV0aW9uID0gdGhpcy5tYXAudmlld0NvbnRyb2xsZXIuZ2V0UmVzb2x1dGlvbigpO1xyXG4gICAgICBjb25zdCBtaW5SZXNvbHV0aW9uID0gdGhpcy5taW5SZXNvbHV0aW9uIHx8IDA7XHJcbiAgICAgIGNvbnN0IG1heFJlc29sdXRpb24gPSB0aGlzLm1heFJlc29sdXRpb24gfHwgSW5maW5pdHk7XHJcbiAgICAgIHRoaXMuaXNJblJlc29sdXRpb25zUmFuZ2UgPSByZXNvbHV0aW9uID49IG1pblJlc29sdXRpb24gJiYgcmVzb2x1dGlvbiA8PSBtYXhSZXNvbHV0aW9uO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc0luUmVzb2x1dGlvbnNSYW5nZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=