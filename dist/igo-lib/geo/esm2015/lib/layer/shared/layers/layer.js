/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
export class Layer {
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
    get visible() {
        return this.ol.get('visible');
    }
    /**
     * @param {?} visibility
     * @return {?}
     */
    set visible(visibility) {
        this.ol.setVisible(visibility);
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
     * @return {?}
     */
    get isInResolutionsRange() {
        if (!this.map) {
            return false;
        }
        /** @type {?} */
        const resolution = this.map.viewController.getResolution();
        /** @type {?} */
        const minResolution = this.ol.getMinResolution();
        /** @type {?} */
        const maxResolution = this.ol.getMaxResolution();
        return resolution >= minResolution && resolution <= maxResolution;
    }
    /**
     * @return {?}
     */
    get showInLayerList() { return this.options.showInLayerList !== false; }
    /**
     * @param {?} options
     */
    constructor(options) {
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
    /**
     * @param {?} map
     * @return {?}
     */
    setMap(map) {
        this.map = map;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBVUEsTUFBTSxPQUFnQixLQUFLOzs7O0lBUXpCLElBQUksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7SUFDL0MsQ0FBQzs7OztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQzs7OztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsSUFBSSxNQUFNLENBQUMsTUFBYztRQUN2QixJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVELElBQUksU0FBUyxDQUFDLFNBQWtCO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUNyQyxDQUFDOzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVELElBQUksT0FBTyxDQUFDLFVBQW1CO1FBQzdCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7O0lBRUQsSUFBSSxPQUFPLENBQUMsT0FBZTtRQUN6QixJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsSUFBSSxvQkFBb0I7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDYixPQUFPLEtBQUssQ0FBQztTQUNkOztjQUVLLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUU7O2NBQ3BELGFBQWEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFOztjQUMxQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRTtRQUVoRCxPQUFPLFVBQVUsSUFBSSxhQUFhLElBQUksVUFBVSxJQUFJLGFBQWEsQ0FBQztJQUNwRSxDQUFDOzs7O0lBRUQsSUFBSSxlQUFlLEtBQWMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7O0lBRWpGLFlBQVksT0FBcUI7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUV0QyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMvQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1NBQ25DO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDaEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLE9BQU87WUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDbkUsSUFBSSxDQUFDLE9BQU87WUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFFaEUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUlELE1BQU0sQ0FBQyxHQUF1QjtRQUM1QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqQixDQUFDO0NBQ0Y7OztJQTlGQywwQkFBMEI7O0lBQzFCLDJCQUE4Qjs7SUFDOUIsb0JBQW1COztJQUNuQixtQkFBbUI7O0lBQ25CLHdCQUE2Qjs7SUFDN0Isd0JBQXVDOzs7Ozs7SUFvRnZDLGdEQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCBvbExheWVyIGZyb20gJ29sL2xheWVyL0xheWVyJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IFN1YmplY3RTdGF0dXMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IExheWVyT3B0aW9ucyB9IGZyb20gJy4vbGF5ZXIuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMYXllciB7XHJcbiAgcHVibGljIGNvbGxhcHNlZDogYm9vbGVhbjtcclxuICBwdWJsaWMgZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcclxuICBwdWJsaWMgbWFwOiBJZ29NYXA7XHJcbiAgcHVibGljIG9sOiBvbExheWVyO1xyXG4gIHB1YmxpYyBvcHRpb25zOiBMYXllck9wdGlvbnM7XHJcbiAgcHVibGljIHN0YXR1cyQ6IFN1YmplY3Q8U3ViamVjdFN0YXR1cz47XHJcblxyXG4gIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5pZCB8fCB0aGlzLmRhdGFTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBnZXQgYWxpYXMoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWxpYXM7XHJcbiAgfVxyXG5cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudGl0bGU7XHJcbiAgfVxyXG5cclxuICBzZXQgdGl0bGUodGl0bGU6IHN0cmluZykge1xyXG4gICAgdGhpcy5vcHRpb25zLnRpdGxlID0gdGl0bGU7XHJcbiAgfVxyXG5cclxuICBnZXQgekluZGV4KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5vbC5nZXRaSW5kZXgoKTtcclxuICB9XHJcblxyXG4gIHNldCB6SW5kZXgoekluZGV4OiBudW1iZXIpIHtcclxuICAgIHRoaXMub2wuc2V0WkluZGV4KHpJbmRleCk7XHJcbiAgfVxyXG5cclxuICBnZXQgYmFzZUxheWVyKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5iYXNlTGF5ZXI7XHJcbiAgfVxyXG5cclxuICBzZXQgYmFzZUxheWVyKGJhc2VMYXllcjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5vcHRpb25zLmJhc2VMYXllciA9IGJhc2VMYXllcjtcclxuICB9XHJcblxyXG4gIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub2wuZ2V0KCd2aXNpYmxlJyk7XHJcbiAgfVxyXG5cclxuICBzZXQgdmlzaWJsZSh2aXNpYmlsaXR5OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLm9sLnNldFZpc2libGUodmlzaWJpbGl0eSk7XHJcbiAgfVxyXG5cclxuICBnZXQgb3BhY2l0eSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMub2wuZ2V0KCdvcGFjaXR5Jyk7XHJcbiAgfVxyXG5cclxuICBzZXQgb3BhY2l0eShvcGFjaXR5OiBudW1iZXIpIHtcclxuICAgIHRoaXMub2wuc2V0T3BhY2l0eShvcGFjaXR5KTtcclxuICB9XHJcblxyXG4gIGdldCBpc0luUmVzb2x1dGlvbnNSYW5nZSgpOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy5tYXApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc29sdXRpb24gPSB0aGlzLm1hcC52aWV3Q29udHJvbGxlci5nZXRSZXNvbHV0aW9uKCk7XHJcbiAgICBjb25zdCBtaW5SZXNvbHV0aW9uID0gdGhpcy5vbC5nZXRNaW5SZXNvbHV0aW9uKCk7XHJcbiAgICBjb25zdCBtYXhSZXNvbHV0aW9uID0gdGhpcy5vbC5nZXRNYXhSZXNvbHV0aW9uKCk7XHJcblxyXG4gICAgcmV0dXJuIHJlc29sdXRpb24gPj0gbWluUmVzb2x1dGlvbiAmJiByZXNvbHV0aW9uIDw9IG1heFJlc29sdXRpb247XHJcbiAgfVxyXG5cclxuICBnZXQgc2hvd0luTGF5ZXJMaXN0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5vcHRpb25zLnNob3dJbkxheWVyTGlzdCAhPT0gZmFsc2U7IH1cclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogTGF5ZXJPcHRpb25zKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgdGhpcy5kYXRhU291cmNlID0gdGhpcy5vcHRpb25zLnNvdXJjZTtcclxuXHJcbiAgICB0aGlzLm9sID0gdGhpcy5jcmVhdGVPbExheWVyKCk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnpJbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmJhc2VMYXllciAmJiB0aGlzLm9wdGlvbnMudmlzaWJsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZpc2libGUgPVxyXG4gICAgICB0aGlzLm9wdGlvbnMudmlzaWJsZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHRoaXMub3B0aW9ucy52aXNpYmxlO1xyXG4gICAgdGhpcy5vcGFjaXR5ID1cclxuICAgICAgdGhpcy5vcHRpb25zLm9wYWNpdHkgPT09IHVuZGVmaW5lZCA/IDEgOiB0aGlzLm9wdGlvbnMub3BhY2l0eTtcclxuXHJcbiAgICB0aGlzLm9sLnNldCgnX2xheWVyJywgdGhpcywgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlT2xMYXllcigpOiBvbExheWVyO1xyXG5cclxuICBzZXRNYXAobWFwOiBJZ29NYXAgfCB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMubWFwID0gbWFwO1xyXG4gIH1cclxufVxyXG4iXX0=