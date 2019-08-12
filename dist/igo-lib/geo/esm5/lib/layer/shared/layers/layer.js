/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
Layer = /** @class */ (function () {
    function Layer(options) {
        this.options = options;
        this.dataSource = this.options.source;
        this.ol = this.createOlLayer();
        if (this.options.zIndex !== undefined) {
            this.zIndex = this.options.zIndex;
        }
        if (this.options.baseLayer && this.options.visible === undefined) {
            this.options.visible = false;
        }
        this.visible =
            this.options.visible === undefined ? true : this.options.visible;
        this.opacity =
            this.options.opacity === undefined ? 1 : this.options.opacity;
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
    Object.defineProperty(Layer.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ol.get('visible');
        },
        set: /**
         * @param {?} visibility
         * @return {?}
         */
        function (visibility) {
            this.ol.setVisible(visibility);
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
            if (!this.map) {
                return false;
            }
            /** @type {?} */
            var resolution = this.map.viewController.getResolution();
            /** @type {?} */
            var minResolution = this.ol.getMinResolution();
            /** @type {?} */
            var maxResolution = this.ol.getMaxResolution();
            return resolution >= minResolution && resolution <= maxResolution;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "showInLayerList", {
        get: /**
         * @return {?}
         */
        function () { return this.options.showInLayerList !== false; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} map
     * @return {?}
     */
    Layer.prototype.setMap = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        this.map = map;
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
    Layer.prototype.map;
    /** @type {?} */
    Layer.prototype.ol;
    /** @type {?} */
    Layer.prototype.options;
    /** @type {?} */
    Layer.prototype.status$;
    /**
     * @abstract
     * @protected
     * @return {?}
     */
    Layer.prototype.createOlLayer = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBVUE7Ozs7SUFzRUUsZUFBWSxPQUFxQjtRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRXRDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDbkM7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUNoRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDOUI7UUFDRCxJQUFJLENBQUMsT0FBTztZQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNuRSxJQUFJLENBQUMsT0FBTztZQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUVoRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFoRkQsc0JBQUkscUJBQUU7Ozs7UUFBTjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7UUFDL0MsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx3QkFBSzs7OztRQUFUO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHdCQUFLOzs7O1FBQVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzVCLENBQUM7Ozs7O1FBRUQsVUFBVSxLQUFhO1lBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDOzs7T0FKQTtJQU1ELHNCQUFJLHlCQUFNOzs7O1FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0IsQ0FBQzs7Ozs7UUFFRCxVQUFXLE1BQWM7WUFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQzs7O09BSkE7SUFNRCxzQkFBSSw0QkFBUzs7OztRQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUNoQyxDQUFDOzs7OztRQUVELFVBQWMsU0FBa0I7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3JDLENBQUM7OztPQUpBO0lBTUQsc0JBQUksMEJBQU87Ozs7UUFBWDtZQUNFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsQ0FBQzs7Ozs7UUFFRCxVQUFZLFVBQW1CO1lBQzdCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7OztPQUpBO0lBTUQsc0JBQUksMEJBQU87Ozs7UUFBWDtZQUNFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsQ0FBQzs7Ozs7UUFFRCxVQUFZLE9BQWU7WUFDekIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsQ0FBQzs7O09BSkE7SUFNRCxzQkFBSSx1Q0FBb0I7Ozs7UUFBeEI7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDYixPQUFPLEtBQUssQ0FBQzthQUNkOztnQkFFSyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFOztnQkFDcEQsYUFBYSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7O2dCQUMxQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRTtZQUVoRCxPQUFPLFVBQVUsSUFBSSxhQUFhLElBQUksVUFBVSxJQUFJLGFBQWEsQ0FBQztRQUNwRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGtDQUFlOzs7O1FBQW5CLGNBQWlDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7Ozs7O0lBd0JqRixzQkFBTTs7OztJQUFOLFVBQU8sR0FBdUI7UUFDNUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDakIsQ0FBQztJQUNILFlBQUM7QUFBRCxDQUFDLEFBL0ZELElBK0ZDOzs7Ozs7O0lBOUZDLDBCQUEwQjs7SUFDMUIsMkJBQThCOztJQUM5QixvQkFBbUI7O0lBQ25CLG1CQUFtQjs7SUFDbkIsd0JBQTZCOztJQUM3Qix3QkFBdUM7Ozs7OztJQW9GdkMsZ0RBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IG9sTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvTGF5ZXInO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi8uLi9tYXAnO1xyXG5cclxuaW1wb3J0IHsgU3ViamVjdFN0YXR1cyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi9sYXllci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExheWVyIHtcclxuICBwdWJsaWMgY29sbGFwc2VkOiBib29sZWFuO1xyXG4gIHB1YmxpYyBkYXRhU291cmNlOiBEYXRhU291cmNlO1xyXG4gIHB1YmxpYyBtYXA6IElnb01hcDtcclxuICBwdWJsaWMgb2w6IG9sTGF5ZXI7XHJcbiAgcHVibGljIG9wdGlvbnM6IExheWVyT3B0aW9ucztcclxuICBwdWJsaWMgc3RhdHVzJDogU3ViamVjdDxTdWJqZWN0U3RhdHVzPjtcclxuXHJcbiAgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmlkIHx8IHRoaXMuZGF0YVNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIGdldCBhbGlhcygpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGlhcztcclxuICB9XHJcblxyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50aXRsZTtcclxuICB9XHJcblxyXG4gIHNldCB0aXRsZSh0aXRsZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMudGl0bGUgPSB0aXRsZTtcclxuICB9XHJcblxyXG4gIGdldCB6SW5kZXgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm9sLmdldFpJbmRleCgpO1xyXG4gIH1cclxuXHJcbiAgc2V0IHpJbmRleCh6SW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5vbC5zZXRaSW5kZXgoekluZGV4KTtcclxuICB9XHJcblxyXG4gIGdldCBiYXNlTGF5ZXIoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmJhc2VMYXllcjtcclxuICB9XHJcblxyXG4gIHNldCBiYXNlTGF5ZXIoYmFzZUxheWVyOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMuYmFzZUxheWVyID0gYmFzZUxheWVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vbC5nZXQoJ3Zpc2libGUnKTtcclxuICB9XHJcblxyXG4gIHNldCB2aXNpYmxlKHZpc2liaWxpdHk6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMub2wuc2V0VmlzaWJsZSh2aXNpYmlsaXR5KTtcclxuICB9XHJcblxyXG4gIGdldCBvcGFjaXR5KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5vbC5nZXQoJ29wYWNpdHknKTtcclxuICB9XHJcblxyXG4gIHNldCBvcGFjaXR5KG9wYWNpdHk6IG51bWJlcikge1xyXG4gICAgdGhpcy5vbC5zZXRPcGFjaXR5KG9wYWNpdHkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzSW5SZXNvbHV0aW9uc1JhbmdlKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCF0aGlzLm1hcCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzb2x1dGlvbiA9IHRoaXMubWFwLnZpZXdDb250cm9sbGVyLmdldFJlc29sdXRpb24oKTtcclxuICAgIGNvbnN0IG1pblJlc29sdXRpb24gPSB0aGlzLm9sLmdldE1pblJlc29sdXRpb24oKTtcclxuICAgIGNvbnN0IG1heFJlc29sdXRpb24gPSB0aGlzLm9sLmdldE1heFJlc29sdXRpb24oKTtcclxuXHJcbiAgICByZXR1cm4gcmVzb2x1dGlvbiA+PSBtaW5SZXNvbHV0aW9uICYmIHJlc29sdXRpb24gPD0gbWF4UmVzb2x1dGlvbjtcclxuICB9XHJcblxyXG4gIGdldCBzaG93SW5MYXllckxpc3QoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm9wdGlvbnMuc2hvd0luTGF5ZXJMaXN0ICE9PSBmYWxzZTsgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBMYXllck9wdGlvbnMpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB0aGlzLmRhdGFTb3VyY2UgPSB0aGlzLm9wdGlvbnMuc291cmNlO1xyXG5cclxuICAgIHRoaXMub2wgPSB0aGlzLmNyZWF0ZU9sTGF5ZXIoKTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuekluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYmFzZUxheWVyICYmIHRoaXMub3B0aW9ucy52aXNpYmxlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vcHRpb25zLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMudmlzaWJsZSA9XHJcbiAgICAgIHRoaXMub3B0aW9ucy52aXNpYmxlID09PSB1bmRlZmluZWQgPyB0cnVlIDogdGhpcy5vcHRpb25zLnZpc2libGU7XHJcbiAgICB0aGlzLm9wYWNpdHkgPVxyXG4gICAgICB0aGlzLm9wdGlvbnMub3BhY2l0eSA9PT0gdW5kZWZpbmVkID8gMSA6IHRoaXMub3B0aW9ucy5vcGFjaXR5O1xyXG5cclxuICAgIHRoaXMub2wuc2V0KCdfbGF5ZXInLCB0aGlzLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVPbExheWVyKCk6IG9sTGF5ZXI7XHJcblxyXG4gIHNldE1hcChtYXA6IElnb01hcCB8IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5tYXAgPSBtYXA7XHJcbiAgfVxyXG59XHJcbiJdfQ==