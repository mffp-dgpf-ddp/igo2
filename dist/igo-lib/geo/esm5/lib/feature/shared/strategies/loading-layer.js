/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { unByKey } from 'ol/Observable';
import { FeatureStoreStrategy } from './strategy';
/**
 * This strategy loads a layer's features into it's store counterpart.
 * The layer -> store binding is a one-way binding. That means any OL feature
 * added to the layer will be added to the store but the opposite is false.
 *
 * Important: In it's current state, this strategy is to meant to be combined
 * with a standard Loading strategy and it would probably cause recursion issues.
 */
var /**
 * This strategy loads a layer's features into it's store counterpart.
 * The layer -> store binding is a one-way binding. That means any OL feature
 * added to the layer will be added to the store but the opposite is false.
 *
 * Important: In it's current state, this strategy is to meant to be combined
 * with a standard Loading strategy and it would probably cause recursion issues.
 */
FeatureStoreLoadingLayerStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(FeatureStoreLoadingLayerStrategy, _super);
    function FeatureStoreLoadingLayerStrategy(options) {
        var _this = _super.call(this, options) || this;
        _this.options = options;
        /**
         * Subscription to the store's OL source changes
         */
        _this.stores$$ = new Map();
        return _this;
    }
    /**
     * Bind this strategy to a store and start watching for Ol source changes
     * @param store Feature store
     */
    /**
     * Bind this strategy to a store and start watching for Ol source changes
     * @param {?} store Feature store
     * @return {?}
     */
    FeatureStoreLoadingLayerStrategy.prototype.bindStore = /**
     * Bind this strategy to a store and start watching for Ol source changes
     * @param {?} store Feature store
     * @return {?}
     */
    function (store) {
        _super.prototype.bindStore.call(this, store);
        if (this.isActive() === true) {
            this.watchStore(store);
        }
    };
    /**
     * Unbind this strategy from a store and stop watching for Ol source changes
     * @param store Feature store
     */
    /**
     * Unbind this strategy from a store and stop watching for Ol source changes
     * @param {?} store Feature store
     * @return {?}
     */
    FeatureStoreLoadingLayerStrategy.prototype.unbindStore = /**
     * Unbind this strategy from a store and stop watching for Ol source changes
     * @param {?} store Feature store
     * @return {?}
     */
    function (store) {
        _super.prototype.unbindStore.call(this, store);
        if (this.isActive() === true) {
            this.unwatchStore(store);
        }
    };
    /**
     * Start watching all stores already bound to that strategy at once.
     * @internal
     */
    /**
     * Start watching all stores already bound to that strategy at once.
     * \@internal
     * @protected
     * @return {?}
     */
    FeatureStoreLoadingLayerStrategy.prototype.doActivate = /**
     * Start watching all stores already bound to that strategy at once.
     * \@internal
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        this.stores.forEach((/**
         * @param {?} store
         * @return {?}
         */
        function (store) { return _this.watchStore(store); }));
    };
    /**
     * Stop watching all stores bound to that strategy
     * @internal
     */
    /**
     * Stop watching all stores bound to that strategy
     * \@internal
     * @protected
     * @return {?}
     */
    FeatureStoreLoadingLayerStrategy.prototype.doDeactivate = /**
     * Stop watching all stores bound to that strategy
     * \@internal
     * @protected
     * @return {?}
     */
    function () {
        this.unwatchAll();
    };
    /**
     * Watch for a store's  OL source changes
     * @param store Feature store
     */
    /**
     * Watch for a store's  OL source changes
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    FeatureStoreLoadingLayerStrategy.prototype.watchStore = /**
     * Watch for a store's  OL source changes
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    function (store) {
        var _this = this;
        if (this.stores$$.has(store)) {
            return;
        }
        this.onSourceChanges(store);
        /** @type {?} */
        var olSource = store.layer.ol.getSource();
        olSource.on('change', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.onSourceChanges(store);
        }));
    };
    /**
     * Stop watching for a store's OL source changes
     * @param store Feature store
     */
    /**
     * Stop watching for a store's OL source changes
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    FeatureStoreLoadingLayerStrategy.prototype.unwatchStore = /**
     * Stop watching for a store's OL source changes
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    function (store) {
        /** @type {?} */
        var key = this.stores$$.get(store);
        if (key !== undefined) {
            unByKey(key);
            this.stores$$.delete(store);
        }
    };
    /**
     * Stop watching for OL source changes in all stores.
     */
    /**
     * Stop watching for OL source changes in all stores.
     * @private
     * @return {?}
     */
    FeatureStoreLoadingLayerStrategy.prototype.unwatchAll = /**
     * Stop watching for OL source changes in all stores.
     * @private
     * @return {?}
     */
    function () {
        Array.from(this.stores$$.entries()).forEach((/**
         * @param {?} entries
         * @return {?}
         */
        function (entries) {
            unByKey(entries[1]);
        }));
        this.stores$$.clear();
    };
    /**
     * Load features from an OL source into a  store or clear the store if the source is empty
     * @param features Store filtered features
     * @param store Feature store
     */
    /**
     * Load features from an OL source into a  store or clear the store if the source is empty
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    FeatureStoreLoadingLayerStrategy.prototype.onSourceChanges = /**
     * Load features from an OL source into a  store or clear the store if the source is empty
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    function (store) {
        /** @type {?} */
        var olFeatures = store.layer.ol.getSource().getFeatures();
        if (olFeatures.length === 0) {
            store.clear();
        }
        else {
            store.setStoreOlFeatures(olFeatures);
        }
    };
    return FeatureStoreLoadingLayerStrategy;
}(FeatureStoreStrategy));
/**
 * This strategy loads a layer's features into it's store counterpart.
 * The layer -> store binding is a one-way binding. That means any OL feature
 * added to the layer will be added to the store but the opposite is false.
 *
 * Important: In it's current state, this strategy is to meant to be combined
 * with a standard Loading strategy and it would probably cause recursion issues.
 */
export { FeatureStoreLoadingLayerStrategy };
if (false) {
    /**
     * Subscription to the store's OL source changes
     * @type {?}
     * @private
     */
    FeatureStoreLoadingLayerStrategy.prototype.stores$$;
    /**
     * @type {?}
     * @protected
     */
    FeatureStoreLoadingLayerStrategy.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9zdHJhdGVnaWVzL2xvYWRpbmctbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS3hDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLFlBQVksQ0FBQzs7Ozs7Ozs7O0FBVWxEOzs7Ozs7Ozs7SUFBc0QsNERBQW9CO0lBT3hFLDBDQUFzQixPQUFnRDtRQUF0RSxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUNmO1FBRnFCLGFBQU8sR0FBUCxPQUFPLENBQXlDOzs7O1FBRjlELGNBQVEsR0FBRyxJQUFJLEdBQUcsRUFBd0IsQ0FBQzs7SUFJbkQsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsb0RBQVM7Ozs7O0lBQVQsVUFBVSxLQUFtQjtRQUMzQixpQkFBTSxTQUFTLFlBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxzREFBVzs7Ozs7SUFBWCxVQUFZLEtBQW1CO1FBQzdCLGlCQUFNLFdBQVcsWUFBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDTyxxREFBVTs7Ozs7O0lBQXBCO1FBQUEsaUJBRUM7UUFEQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLEtBQW1CLElBQUssT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUF0QixDQUFzQixFQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNPLHVEQUFZOzs7Ozs7SUFBdEI7UUFDRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNLLHFEQUFVOzs7Ozs7SUFBbEIsVUFBbUIsS0FBbUI7UUFBdEMsaUJBVUM7UUFUQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBQ3RCLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUU7UUFDM0MsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7O1FBQUUsVUFBQyxLQUFjO1lBQ25DLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0ssdURBQVk7Ozs7OztJQUFwQixVQUFxQixLQUFtQjs7WUFDaEMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUNwQyxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNLLHFEQUFVOzs7OztJQUFsQjtRQUNFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLE9BQStCO1lBQzFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSywwREFBZTs7Ozs7O0lBQXZCLFVBQXdCLEtBQW1COztZQUNuQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFO1FBQzNELElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDM0IsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Y7YUFBTTtZQUNMLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN0QztJQUNILENBQUM7SUFDSCx1Q0FBQztBQUFELENBQUMsQUFwR0QsQ0FBc0Qsb0JBQW9CLEdBb0d6RTs7Ozs7Ozs7Ozs7Ozs7OztJQS9GQyxvREFBbUQ7Ozs7O0lBRXZDLG1EQUEwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgT2xFdmVudCB9IGZyb20gJ29sL2V2ZW50cy9FdmVudCc7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmUgfSBmcm9tICcuLi9zdG9yZSc7XHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZUxvYWRpbmdMYXllclN0cmF0ZWd5T3B0aW9ucyB9IGZyb20gJy4uL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZVN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVneSc7XHJcblxyXG4vKipcclxuICogVGhpcyBzdHJhdGVneSBsb2FkcyBhIGxheWVyJ3MgZmVhdHVyZXMgaW50byBpdCdzIHN0b3JlIGNvdW50ZXJwYXJ0LlxyXG4gKiBUaGUgbGF5ZXIgLT4gc3RvcmUgYmluZGluZyBpcyBhIG9uZS13YXkgYmluZGluZy4gVGhhdCBtZWFucyBhbnkgT0wgZmVhdHVyZVxyXG4gKiBhZGRlZCB0byB0aGUgbGF5ZXIgd2lsbCBiZSBhZGRlZCB0byB0aGUgc3RvcmUgYnV0IHRoZSBvcHBvc2l0ZSBpcyBmYWxzZS5cclxuICpcclxuICogSW1wb3J0YW50OiBJbiBpdCdzIGN1cnJlbnQgc3RhdGUsIHRoaXMgc3RyYXRlZ3kgaXMgdG8gbWVhbnQgdG8gYmUgY29tYmluZWRcclxuICogd2l0aCBhIHN0YW5kYXJkIExvYWRpbmcgc3RyYXRlZ3kgYW5kIGl0IHdvdWxkIHByb2JhYmx5IGNhdXNlIHJlY3Vyc2lvbiBpc3N1ZXMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRmVhdHVyZVN0b3JlTG9hZGluZ0xheWVyU3RyYXRlZ3kgZXh0ZW5kcyBGZWF0dXJlU3RvcmVTdHJhdGVneSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc3RvcmUncyBPTCBzb3VyY2UgY2hhbmdlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RvcmVzJCQgPSBuZXcgTWFwPEZlYXR1cmVTdG9yZSwgc3RyaW5nPigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgb3B0aW9uczogRmVhdHVyZVN0b3JlTG9hZGluZ0xheWVyU3RyYXRlZ3lPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJpbmQgdGhpcyBzdHJhdGVneSB0byBhIHN0b3JlIGFuZCBzdGFydCB3YXRjaGluZyBmb3IgT2wgc291cmNlIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIGJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci5iaW5kU3RvcmUoc3RvcmUpO1xyXG4gICAgaWYgKHRoaXMuaXNBY3RpdmUoKSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLndhdGNoU3RvcmUoc3RvcmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5iaW5kIHRoaXMgc3RyYXRlZ3kgZnJvbSBhIHN0b3JlIGFuZCBzdG9wIHdhdGNoaW5nIGZvciBPbCBzb3VyY2UgY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgdW5iaW5kU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgc3VwZXIudW5iaW5kU3RvcmUoc3RvcmUpO1xyXG4gICAgaWYgKHRoaXMuaXNBY3RpdmUoKSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnVud2F0Y2hTdG9yZShzdG9yZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydCB3YXRjaGluZyBhbGwgc3RvcmVzIGFscmVhZHkgYm91bmQgdG8gdGhhdCBzdHJhdGVneSBhdCBvbmNlLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBkb0FjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5zdG9yZXMuZm9yRWFjaCgoc3RvcmU6IEZlYXR1cmVTdG9yZSkgPT4gdGhpcy53YXRjaFN0b3JlKHN0b3JlKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHdhdGNoaW5nIGFsbCBzdG9yZXMgYm91bmQgdG8gdGhhdCBzdHJhdGVneVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBkb0RlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLnVud2F0Y2hBbGwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdhdGNoIGZvciBhIHN0b3JlJ3MgIE9MIHNvdXJjZSBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBwcml2YXRlIHdhdGNoU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgaWYgKHRoaXMuc3RvcmVzJCQuaGFzKHN0b3JlKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vblNvdXJjZUNoYW5nZXMoc3RvcmUpO1xyXG4gICAgY29uc3Qgb2xTb3VyY2UgPSBzdG9yZS5sYXllci5vbC5nZXRTb3VyY2UoKTtcclxuICAgIG9sU291cmNlLm9uKCdjaGFuZ2UnLCAoZXZlbnQ6IE9sRXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5vblNvdXJjZUNoYW5nZXMoc3RvcmUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHdhdGNoaW5nIGZvciBhIHN0b3JlJ3MgT0wgc291cmNlIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW53YXRjaFN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIGNvbnN0IGtleSA9IHRoaXMuc3RvcmVzJCQuZ2V0KHN0b3JlKTtcclxuICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB1bkJ5S2V5KGtleSk7XHJcbiAgICAgIHRoaXMuc3RvcmVzJCQuZGVsZXRlKHN0b3JlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3Agd2F0Y2hpbmcgZm9yIE9MIHNvdXJjZSBjaGFuZ2VzIGluIGFsbCBzdG9yZXMuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bndhdGNoQWxsKCkge1xyXG4gICAgQXJyYXkuZnJvbSh0aGlzLnN0b3JlcyQkLmVudHJpZXMoKSkuZm9yRWFjaCgoZW50cmllczogW0ZlYXR1cmVTdG9yZSwgc3RyaW5nXSkgPT4ge1xyXG4gICAgICB1bkJ5S2V5KGVudHJpZXNbMV0pO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN0b3JlcyQkLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMb2FkIGZlYXR1cmVzIGZyb20gYW4gT0wgc291cmNlIGludG8gYSAgc3RvcmUgb3IgY2xlYXIgdGhlIHN0b3JlIGlmIHRoZSBzb3VyY2UgaXMgZW1wdHlcclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgU3RvcmUgZmlsdGVyZWQgZmVhdHVyZXNcclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Tb3VyY2VDaGFuZ2VzKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIGNvbnN0IG9sRmVhdHVyZXMgPSBzdG9yZS5sYXllci5vbC5nZXRTb3VyY2UoKS5nZXRGZWF0dXJlcygpO1xyXG4gICAgaWYgKG9sRmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHN0b3JlLmNsZWFyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdG9yZS5zZXRTdG9yZU9sRmVhdHVyZXMob2xGZWF0dXJlcyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==