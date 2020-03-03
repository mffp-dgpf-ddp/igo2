/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { EntityStoreStrategy } from '@igo2/common';
import { FeatureMotion } from '../feature.enums';
/**
 * This strategy loads a store's features into it's layer counterpart.
 * The store -> layer binding is a one-way binding. That means any entity
 * added to the store will be added to the layer but the opposite is false.
 *
 * Important: This strategy observes filtered entities, not raw entities. This
 * is not configurable yet.
 */
var /**
 * This strategy loads a store's features into it's layer counterpart.
 * The store -> layer binding is a one-way binding. That means any entity
 * added to the store will be added to the layer but the opposite is false.
 *
 * Important: This strategy observes filtered entities, not raw entities. This
 * is not configurable yet.
 */
FeatureStoreLoadingStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(FeatureStoreLoadingStrategy, _super);
    function FeatureStoreLoadingStrategy(options) {
        var _this = _super.call(this, options) || this;
        _this.options = options;
        /**
         * Subscription to the store's features
         */
        _this.stores$$ = new Map();
        return _this;
    }
    /**
     * Bind this strategy to a store and start watching for entities changes
     * @param store Feature store
     */
    /**
     * Bind this strategy to a store and start watching for entities changes
     * @param {?} store Feature store
     * @return {?}
     */
    FeatureStoreLoadingStrategy.prototype.bindStore = /**
     * Bind this strategy to a store and start watching for entities changes
     * @param {?} store Feature store
     * @return {?}
     */
    function (store) {
        _super.prototype.bindStore.call(this, store);
        if (this.active === true) {
            this.watchStore(store);
        }
    };
    /**
     * Unbind this strategy from a store and stop watching for entities changes
     * @param store Feature store
     */
    /**
     * Unbind this strategy from a store and stop watching for entities changes
     * @param {?} store Feature store
     * @return {?}
     */
    FeatureStoreLoadingStrategy.prototype.unbindStore = /**
     * Unbind this strategy from a store and stop watching for entities changes
     * @param {?} store Feature store
     * @return {?}
     */
    function (store) {
        _super.prototype.unbindStore.call(this, store);
        if (this.active === true) {
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
    FeatureStoreLoadingStrategy.prototype.doActivate = /**
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
    FeatureStoreLoadingStrategy.prototype.doDeactivate = /**
     * Stop watching all stores bound to that strategy
     * \@internal
     * @protected
     * @return {?}
     */
    function () {
        this.unwatchAll();
    };
    /**
     * Watch for entities changes in a store.
     * Important: Never observe a store's sorted entities. It makes no sense
     * to display sorted entities (instead of unsorted) on a layer and it
     * would potentially result in a lot of useless computation.
     * @param store Feature store
     */
    /**
     * Watch for entities changes in a store.
     * Important: Never observe a store's sorted entities. It makes no sense
     * to display sorted entities (instead of unsorted) on a layer and it
     * would potentially result in a lot of useless computation.
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    FeatureStoreLoadingStrategy.prototype.watchStore = /**
     * Watch for entities changes in a store.
     * Important: Never observe a store's sorted entities. It makes no sense
     * to display sorted entities (instead of unsorted) on a layer and it
     * would potentially result in a lot of useless computation.
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    function (store) {
        var _this = this;
        if (this.stores$$.has(store)) {
            return;
        }
        /** @type {?} */
        var subscription = store.view.all$()
            .subscribe((/**
         * @param {?} features
         * @return {?}
         */
        function (features) { return _this.onFeaturesChange(features, store); }));
        this.stores$$.set(store, subscription);
    };
    /**
     * Stop watching for entities changes in a store.
     * @param store Feature store
     */
    /**
     * Stop watching for entities changes in a store.
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    FeatureStoreLoadingStrategy.prototype.unwatchStore = /**
     * Stop watching for entities changes in a store.
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    function (store) {
        /** @type {?} */
        var subscription = this.stores$$.get(store);
        if (subscription !== undefined) {
            subscription.unsubscribe();
            this.stores$$.delete(store);
        }
    };
    /**
     * Stop watching for entities changes in all stores.
     */
    /**
     * Stop watching for entities changes in all stores.
     * @private
     * @return {?}
     */
    FeatureStoreLoadingStrategy.prototype.unwatchAll = /**
     * Stop watching for entities changes in all stores.
     * @private
     * @return {?}
     */
    function () {
        Array.from(this.stores$$.entries()).forEach((/**
         * @param {?} entries
         * @return {?}
         */
        function (entries) {
            entries[1].unsubscribe();
        }));
        this.stores$$.clear();
    };
    /**
     * Load features into a layer or clear the layer if the array of features is empty.
     * @param features Store filtered features
     * @param store Feature store
     */
    /**
     * Load features into a layer or clear the layer if the array of features is empty.
     * @private
     * @param {?} features Store filtered features
     * @param {?} store Feature store
     * @return {?}
     */
    FeatureStoreLoadingStrategy.prototype.onFeaturesChange = /**
     * Load features into a layer or clear the layer if the array of features is empty.
     * @private
     * @param {?} features Store filtered features
     * @param {?} store Feature store
     * @return {?}
     */
    function (features, store) {
        if (features.length === 0) {
            store.clearLayer();
        }
        else {
            store.setLayerFeatures(features, this.selectMotion(store), this.options.viewScale, this.options.areaRatio, this.options.getFeatureId);
        }
    };
    /**
     * Selects the best motion
     * @param store A FeatureStore to apply the motion
     * @returns The motion selected
     */
    /**
     * Selects the best motion
     * @private
     * @param {?} store A FeatureStore to apply the motion
     * @return {?} The motion selected
     */
    FeatureStoreLoadingStrategy.prototype.selectMotion = /**
     * Selects the best motion
     * @private
     * @param {?} store A FeatureStore to apply the motion
     * @return {?} The motion selected
     */
    function (store) {
        if (this.options.motion !== undefined) {
            return this.options.motion;
        }
        if (store.pristine === true) {
            // If features have just been loaded into the store, move/zoom on them
            return FeatureMotion.Default;
        }
        else if (store.count > store.view.count) {
            // If features have been filtered, move/zoom on the remaining ones
            return FeatureMotion.Default;
        }
        else {
            // On insert, update or delete, do nothing
            return FeatureMotion.None;
        }
    };
    return FeatureStoreLoadingStrategy;
}(EntityStoreStrategy));
/**
 * This strategy loads a store's features into it's layer counterpart.
 * The store -> layer binding is a one-way binding. That means any entity
 * added to the store will be added to the layer but the opposite is false.
 *
 * Important: This strategy observes filtered entities, not raw entities. This
 * is not configurable yet.
 */
export { FeatureStoreLoadingStrategy };
if (false) {
    /**
     * Subscription to the store's features
     * @type {?}
     * @private
     */
    FeatureStoreLoadingStrategy.prototype.stores$$;
    /**
     * @type {?}
     * @protected
     */
    FeatureStoreLoadingStrategy.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9zdHJhdGVnaWVzL2xvYWRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7QUFZakQ7Ozs7Ozs7OztJQUFpRCx1REFBbUI7SUFPbEUscUNBQXNCLE9BQTJDO1FBQWpFLFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBQ2Y7UUFGcUIsYUFBTyxHQUFQLE9BQU8sQ0FBb0M7Ozs7UUFGekQsY0FBUSxHQUFHLElBQUksR0FBRyxFQUE4QixDQUFDOztJQUl6RCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCwrQ0FBUzs7Ozs7SUFBVCxVQUFVLEtBQW1CO1FBQzNCLGlCQUFNLFNBQVMsWUFBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxpREFBVzs7Ozs7SUFBWCxVQUFZLEtBQW1CO1FBQzdCLGlCQUFNLFdBQVcsWUFBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ08sZ0RBQVU7Ozs7OztJQUFwQjtRQUFBLGlCQUVDO1FBREMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxLQUFtQixJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENB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cUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eVN0b3JlU3RyYXRlZ3kgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZU1vdGlvbiB9IGZyb20gJy4uL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlLCBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3lPcHRpb25zIH0gZnJvbSAnLi4vZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi4vc3RvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgc3RyYXRlZ3kgbG9hZHMgYSBzdG9yZSdzIGZlYXR1cmVzIGludG8gaXQncyBsYXllciBjb3VudGVycGFydC5cclxuICogVGhlIHN0b3JlIC0+IGxheWVyIGJpbmRpbmcgaXMgYSBvbmUtd2F5IGJpbmRpbmcuIFRoYXQgbWVhbnMgYW55IGVudGl0eVxyXG4gKiBhZGRlZCB0byB0aGUgc3RvcmUgd2lsbCBiZSBhZGRlZCB0byB0aGUgbGF5ZXIgYnV0IHRoZSBvcHBvc2l0ZSBpcyBmYWxzZS5cclxuICpcclxuICogSW1wb3J0YW50OiBUaGlzIHN0cmF0ZWd5IG9ic2VydmVzIGZpbHRlcmVkIGVudGl0aWVzLCBub3QgcmF3IGVudGl0aWVzLiBUaGlzXHJcbiAqIGlzIG5vdCBjb25maWd1cmFibGUgeWV0LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSBleHRlbmRzIEVudGl0eVN0b3JlU3RyYXRlZ3kge1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHN0b3JlJ3MgZmVhdHVyZXNcclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JlcyQkID0gbmV3IE1hcDxGZWF0dXJlU3RvcmUsIFN1YnNjcmlwdGlvbj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM6IEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCB0aGlzIHN0cmF0ZWd5IHRvIGEgc3RvcmUgYW5kIHN0YXJ0IHdhdGNoaW5nIGZvciBlbnRpdGllcyBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBiaW5kU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgc3VwZXIuYmluZFN0b3JlKHN0b3JlKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLndhdGNoU3RvcmUoc3RvcmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5iaW5kIHRoaXMgc3RyYXRlZ3kgZnJvbSBhIHN0b3JlIGFuZCBzdG9wIHdhdGNoaW5nIGZvciBlbnRpdGllcyBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICB1bmJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci51bmJpbmRTdG9yZShzdG9yZSk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy51bndhdGNoU3RvcmUoc3RvcmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgd2F0Y2hpbmcgYWxsIHN0b3JlcyBhbHJlYWR5IGJvdW5kIHRvIHRoYXQgc3RyYXRlZ3kgYXQgb25jZS5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9BY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuc3RvcmVzLmZvckVhY2goKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHRoaXMud2F0Y2hTdG9yZShzdG9yZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB3YXRjaGluZyBhbGwgc3RvcmVzIGJvdW5kIHRvIHRoYXQgc3RyYXRlZ3lcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9EZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy51bndhdGNoQWxsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXYXRjaCBmb3IgZW50aXRpZXMgY2hhbmdlcyBpbiBhIHN0b3JlLlxyXG4gICAqIEltcG9ydGFudDogTmV2ZXIgb2JzZXJ2ZSBhIHN0b3JlJ3Mgc29ydGVkIGVudGl0aWVzLiBJdCBtYWtlcyBubyBzZW5zZVxyXG4gICAqIHRvIGRpc3BsYXkgc29ydGVkIGVudGl0aWVzIChpbnN0ZWFkIG9mIHVuc29ydGVkKSBvbiBhIGxheWVyIGFuZCBpdFxyXG4gICAqIHdvdWxkIHBvdGVudGlhbGx5IHJlc3VsdCBpbiBhIGxvdCBvZiB1c2VsZXNzIGNvbXB1dGF0aW9uLlxyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaFN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIGlmICh0aGlzLnN0b3JlcyQkLmhhcyhzdG9yZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHN0b3JlLnZpZXcuYWxsJCgpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHRoaXMub25GZWF0dXJlc0NoYW5nZShmZWF0dXJlcywgc3RvcmUpKTtcclxuICAgIHRoaXMuc3RvcmVzJCQuc2V0KHN0b3JlLCBzdWJzY3JpcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB3YXRjaGluZyBmb3IgZW50aXRpZXMgY2hhbmdlcyBpbiBhIHN0b3JlLlxyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bndhdGNoU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gdGhpcy5zdG9yZXMkJC5nZXQoc3RvcmUpO1xyXG4gICAgaWYgKHN1YnNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLnN0b3JlcyQkLmRlbGV0ZShzdG9yZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHdhdGNoaW5nIGZvciBlbnRpdGllcyBjaGFuZ2VzIGluIGFsbCBzdG9yZXMuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bndhdGNoQWxsKCkge1xyXG4gICAgQXJyYXkuZnJvbSh0aGlzLnN0b3JlcyQkLmVudHJpZXMoKSkuZm9yRWFjaCgoZW50cmllczogW0ZlYXR1cmVTdG9yZSwgU3Vic2NyaXB0aW9uXSkgPT4ge1xyXG4gICAgICBlbnRyaWVzWzFdLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3RvcmVzJCQuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWQgZmVhdHVyZXMgaW50byBhIGxheWVyIG9yIGNsZWFyIHRoZSBsYXllciBpZiB0aGUgYXJyYXkgb2YgZmVhdHVyZXMgaXMgZW1wdHkuXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIFN0b3JlIGZpbHRlcmVkIGZlYXR1cmVzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBwcml2YXRlIG9uRmVhdHVyZXNDaGFuZ2UoZmVhdHVyZXM6IEZlYXR1cmVbXSwgc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBzdG9yZS5jbGVhckxheWVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdG9yZS5zZXRMYXllckZlYXR1cmVzKFxyXG4gICAgICAgIGZlYXR1cmVzLFxyXG4gICAgICAgIHRoaXMuc2VsZWN0TW90aW9uKHN0b3JlKSxcclxuICAgICAgICB0aGlzLm9wdGlvbnMudmlld1NjYWxlLFxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5hcmVhUmF0aW8sXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmdldEZlYXR1cmVJZFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0cyB0aGUgYmVzdCBtb3Rpb25cclxuICAgKiBAcGFyYW0gc3RvcmUgQSBGZWF0dXJlU3RvcmUgdG8gYXBwbHkgdGhlIG1vdGlvblxyXG4gICAqIEByZXR1cm5zIFRoZSBtb3Rpb24gc2VsZWN0ZWRcclxuICAgKi9cclxuICBwcml2YXRlIHNlbGVjdE1vdGlvbihzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLm1vdGlvbiAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiB0aGlzLm9wdGlvbnMubW90aW9uOyB9XHJcblxyXG4gICAgaWYgKHN0b3JlLnByaXN0aW5lID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIElmIGZlYXR1cmVzIGhhdmUganVzdCBiZWVuIGxvYWRlZCBpbnRvIHRoZSBzdG9yZSwgbW92ZS96b29tIG9uIHRoZW1cclxuICAgICAgcmV0dXJuIEZlYXR1cmVNb3Rpb24uRGVmYXVsdDtcclxuICAgIH0gZWxzZSBpZiAoc3RvcmUuY291bnQgPiBzdG9yZS52aWV3LmNvdW50KSB7XHJcbiAgICAgIC8vIElmIGZlYXR1cmVzIGhhdmUgYmVlbiBmaWx0ZXJlZCwgbW92ZS96b29tIG9uIHRoZSByZW1haW5pbmcgb25lc1xyXG4gICAgICByZXR1cm4gRmVhdHVyZU1vdGlvbi5EZWZhdWx0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gT24gaW5zZXJ0LCB1cGRhdGUgb3IgZGVsZXRlLCBkbyBub3RoaW5nXHJcbiAgICAgIHJldHVybiBGZWF0dXJlTW90aW9uLk5vbmU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==