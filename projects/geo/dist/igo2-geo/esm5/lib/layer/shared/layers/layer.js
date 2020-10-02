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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGVBQWUsRUFJZixhQUFhLEVBQ2QsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFTckMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7QUFJdkU7Ozs7SUFtR0UsZUFDUyxPQUFxQixFQUNsQixlQUFpQztRQURwQyxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQ2xCLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQWpHdEMsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBcURqQywwQkFBcUIsR0FFMUIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUF5QnRCLGFBQVEsR0FBNkIsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFLcEUsZUFBVSxHQUF3QixhQUFhLENBQUM7WUFDdkQsSUFBSSxDQUFDLHFCQUFxQjtZQUMxQixJQUFJLENBQUMsUUFBUTtTQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsS0FBeUIsSUFBSyxPQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQXBCLENBQW9CLEVBQUMsQ0FBQyxDQUFDO1FBVWhFLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUVqQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMvQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1B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QUMsYUFBYTtZQUN0RixJQUFJLENBQUMsb0JBQW9CLEdBQUcsVUFBVSxJQUFJLGFBQWEsSUFBSSxVQUFVLElBQUksYUFBYSxDQUFDO1NBQ3hGO2FBQU07WUFDTCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUNILFlBQUM7QUFBRCxDQUFDLEFBMUtELElBMEtDOzs7Ozs7O0lBektDLDBCQUEwQjs7SUFDMUIsMkJBQThCOztJQUM5Qix1QkFBd0I7O0lBQ3hCLGdDQUF1Qzs7SUFDdkMsbUNBQTBDOztJQUMxQyxvQkFBbUI7O0lBQ25CLG1CQUFtQjs7SUFDbkIsd0JBQXVDOzs7OztJQUV2Qyw2QkFBbUM7O0lBZ0RuQyxzQ0FFK0I7O0lBeUIvQix5QkFBNkU7O0lBSzdFLDJCQUdrRTs7SUFPaEUsd0JBQTRCOzs7OztJQUM1QixnQ0FBMkM7Ozs7OztJQW1DN0MsZ0RBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBCZWhhdmlvclN1YmplY3QsXHJcbiAgT2JzZXJ2YWJsZSxcclxuICBTdWJqZWN0LFxyXG4gIFN1YnNjcmlwdGlvbixcclxuICBjb21iaW5lTGF0ZXN0XHJcbn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCBvbExheWVyIGZyb20gJ29sL2xheWVyL0xheWVyJztcclxuXHJcbmltcG9ydCB7IEF1dGhJbnRlcmNlcHRvciB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5pbXBvcnQgeyBTdWJqZWN0U3RhdHVzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSwgTGVnZW5kIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgZ2V0UmVzb2x1dGlvbkZyb21TY2FsZSB9IGZyb20gJy4uLy4uLy4uL21hcC9zaGFyZWQvbWFwLnV0aWxzJztcclxuXHJcbmltcG9ydCB7IExheWVyT3B0aW9ucyB9IGZyb20gJy4vbGF5ZXIuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMYXllciB7XHJcbiAgcHVibGljIGNvbGxhcHNlZDogYm9vbGVhbjtcclxuICBwdWJsaWMgZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcclxuICBwdWJsaWMgbGVnZW5kOiBMZWdlbmRbXTtcclxuICBwdWJsaWMgbGVnZW5kQ29sbGFwc2VkOiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgZmlyc3RMb2FkQ29tcG9uZW50OiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgbWFwOiBJZ29NYXA7XHJcbiAgcHVibGljIG9sOiBvbExheWVyO1xyXG4gIHB1YmxpYyBzdGF0dXMkOiBTdWJqZWN0PFN1YmplY3RTdGF0dXM+O1xyXG5cclxuICBwcml2YXRlIHJlc29sdXRpb24kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaWQgfHwgdGhpcy5kYXRhU291cmNlLmlkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFsaWFzKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsaWFzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRpdGxlO1xyXG4gIH1cclxuXHJcbiAgc2V0IHRpdGxlKHRpdGxlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMub3B0aW9ucy50aXRsZSA9IHRpdGxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHpJbmRleCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMub2wuZ2V0WkluZGV4KCk7XHJcbiAgfVxyXG5cclxuICBzZXQgekluZGV4KHpJbmRleDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm9sLnNldFpJbmRleCh6SW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGJhc2VMYXllcigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYmFzZUxheWVyO1xyXG4gIH1cclxuXHJcbiAgc2V0IGJhc2VMYXllcihiYXNlTGF5ZXI6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMub3B0aW9ucy5iYXNlTGF5ZXIgPSBiYXNlTGF5ZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgb3BhY2l0eSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMub2wuZ2V0KCdvcGFjaXR5Jyk7XHJcbiAgfVxyXG5cclxuICBzZXQgb3BhY2l0eShvcGFjaXR5OiBudW1iZXIpIHtcclxuICAgIHRoaXMub2wuc2V0T3BhY2l0eShvcGFjaXR5KTtcclxuICB9XHJcblxyXG4gIHNldCBpc0luUmVzb2x1dGlvbnNSYW5nZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5pc0luUmVzb2x1dGlvbnNSYW5nZSQubmV4dCh2YWx1ZSk7XHJcbiAgfVxyXG4gIGdldCBpc0luUmVzb2x1dGlvbnNSYW5nZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmlzSW5SZXNvbHV0aW9uc1JhbmdlJC52YWx1ZTtcclxuICB9XHJcbiAgcmVhZG9ubHkgaXNJblJlc29sdXRpb25zUmFuZ2UkOiBCZWhhdmlvclN1YmplY3Q8XHJcbiAgICBib29sZWFuXHJcbiAgPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICBzZXQgbWF4UmVzb2x1dGlvbih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm9sLnNldE1heFJlc29sdXRpb24odmFsdWUgfHwgSW5maW5pdHkpO1xyXG4gICAgdGhpcy51cGRhdGVJblJlc29sdXRpb25zUmFuZ2UoKTtcclxuICB9XHJcbiAgZ2V0IG1heFJlc29sdXRpb24oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm9sLmdldE1heFJlc29sdXRpb24oKTtcclxuICB9XHJcblxyXG4gIHNldCBtaW5SZXNvbHV0aW9uKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMub2wuc2V0TWluUmVzb2x1dGlvbih2YWx1ZSB8fCAwKTtcclxuICAgIHRoaXMudXBkYXRlSW5SZXNvbHV0aW9uc1JhbmdlKCk7XHJcbiAgfVxyXG4gIGdldCBtaW5SZXNvbHV0aW9uKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5vbC5nZXRNaW5SZXNvbHV0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBzZXQgdmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5vbC5zZXRWaXNpYmxlKHZhbHVlKTtcclxuICAgIHRoaXMudmlzaWJsZSQubmV4dCh2YWx1ZSk7XHJcbiAgfVxyXG4gIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMudmlzaWJsZSQudmFsdWU7XHJcbiAgfVxyXG4gIHJlYWRvbmx5IHZpc2libGUkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XHJcblxyXG4gIGdldCBkaXNwbGF5ZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy52aXNpYmxlICYmIHRoaXMuaXNJblJlc29sdXRpb25zUmFuZ2U7XHJcbiAgfVxyXG4gIHJlYWRvbmx5IGRpc3BsYXllZCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSBjb21iaW5lTGF0ZXN0KFtcclxuICAgIHRoaXMuaXNJblJlc29sdXRpb25zUmFuZ2UkLFxyXG4gICAgdGhpcy52aXNpYmxlJFxyXG4gIF0pLnBpcGUobWFwKChidW5jaDogW2Jvb2xlYW4sIGJvb2xlYW5dKSA9PiBidW5jaFswXSAmJiBidW5jaFsxXSkpO1xyXG5cclxuICBnZXQgc2hvd0luTGF5ZXJMaXN0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zaG93SW5MYXllckxpc3QgIT09IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgb3B0aW9uczogTGF5ZXJPcHRpb25zLFxyXG4gICAgcHJvdGVjdGVkIGF1dGhJbnRlcmNlcHRvcj86IEF1dGhJbnRlcmNlcHRvclxyXG4gICkge1xyXG4gICAgdGhpcy5kYXRhU291cmNlID0gb3B0aW9ucy5zb3VyY2U7XHJcblxyXG4gICAgdGhpcy5vbCA9IHRoaXMuY3JlYXRlT2xMYXllcigpO1xyXG4gICAgaWYgKG9wdGlvbnMuekluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy56SW5kZXggPSBvcHRpb25zLnpJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5iYXNlTGF5ZXIgJiYgb3B0aW9ucy52aXNpYmxlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgb3B0aW9ucy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tYXhSZXNvbHV0aW9uID0gb3B0aW9ucy5tYXhSZXNvbHV0aW9uIHx8IGdldFJlc29sdXRpb25Gcm9tU2NhbGUoTnVtYmVyKG9wdGlvbnMubWF4U2NhbGVEZW5vbSkpO1xyXG4gICAgdGhpcy5taW5SZXNvbHV0aW9uID0gb3B0aW9ucy5taW5SZXNvbHV0aW9uIHx8IGdldFJlc29sdXRpb25Gcm9tU2NhbGUoTnVtYmVyKG9wdGlvbnMubWluU2NhbGVEZW5vbSkpO1xyXG5cclxuICAgIHRoaXMudmlzaWJsZSA9IG9wdGlvbnMudmlzaWJsZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdGlvbnMudmlzaWJsZTtcclxuICAgIHRoaXMub3BhY2l0eSA9IG9wdGlvbnMub3BhY2l0eSA9PT0gdW5kZWZpbmVkID8gMSA6IG9wdGlvbnMub3BhY2l0eTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIG9wdGlvbnMubGVnZW5kT3B0aW9ucyAmJlxyXG4gICAgICAob3B0aW9ucy5sZWdlbmRPcHRpb25zLnVybCB8fCBvcHRpb25zLmxlZ2VuZE9wdGlvbnMuaHRtbClcclxuICAgICkge1xyXG4gICAgICB0aGlzLmxlZ2VuZCA9IHRoaXMuZGF0YVNvdXJjZS5zZXRMZWdlbmQob3B0aW9ucy5sZWdlbmRPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxlZ2VuZENvbGxhcHNlZCA9IG9wdGlvbnMubGVnZW5kT3B0aW9uc1xyXG4gICAgICA/IG9wdGlvbnMubGVnZW5kT3B0aW9ucy5jb2xsYXBzZWRcclxuICAgICAgICA/IG9wdGlvbnMubGVnZW5kT3B0aW9ucy5jb2xsYXBzZWRcclxuICAgICAgICA6IHRydWVcclxuICAgICAgOiB0cnVlO1xyXG5cclxuICAgIHRoaXMub2wuc2V0KCdfbGF5ZXInLCB0aGlzLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVPbExheWVyKCk6IG9sTGF5ZXI7XHJcblxyXG4gIHNldE1hcChpZ29NYXA6IElnb01hcCB8IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5tYXAgPSBpZ29NYXA7XHJcblxyXG4gICAgdGhpcy51bm9ic2VydmVSZXNvbHV0aW9uKCk7XHJcbiAgICBpZiAoaWdvTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlUmVzb2x1dGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvYnNlcnZlUmVzb2x1dGlvbigpIHtcclxuICAgIHRoaXMucmVzb2x1dGlvbiQkID0gdGhpcy5tYXAudmlld0NvbnRyb2xsZXIucmVzb2x1dGlvbiQuc3Vic2NyaWJlKCgpID0+XHJcbiAgICAgIHRoaXMudXBkYXRlSW5SZXNvbHV0aW9uc1JhbmdlKClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVub2JzZXJ2ZVJlc29sdXRpb24oKSB7XHJcbiAgICBpZiAodGhpcy5yZXNvbHV0aW9uJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnJlc29sdXRpb24kJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLnJlc29sdXRpb24kJCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlSW5SZXNvbHV0aW9uc1JhbmdlKCkge1xyXG4gICAgaWYgKHRoaXMubWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc3QgcmVzb2x1dGlvbiA9IHRoaXMubWFwLnZpZXdDb250cm9sbGVyLmdldFJlc29sdXRpb24oKTtcclxuICAgICAgY29uc3QgbWluUmVzb2x1dGlvbiA9IHRoaXMubWluUmVzb2x1dGlvbjtcclxuICAgICAgY29uc3QgbWF4UmVzb2x1dGlvbiA9IHRoaXMubWF4UmVzb2x1dGlvbiA9PT0gdW5kZWZpbmVkID8gSW5maW5pdHkgOiB0aGlzLm1heFJlc29sdXRpb247XHJcbiAgICAgIHRoaXMuaXNJblJlc29sdXRpb25zUmFuZ2UgPSByZXNvbHV0aW9uID49IG1pblJlc29sdXRpb24gJiYgcmVzb2x1dGlvbiA8PSBtYXhSZXNvbHV0aW9uO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc0luUmVzb2x1dGlvbnNSYW5nZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=