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
        _this.setMotion(options.motion);
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
     * Define the motion to apply on load
     * @param motion Feature motion
     */
    /**
     * Define the motion to apply on load
     * @param {?} motion Feature motion
     * @return {?}
     */
    FeatureStoreLoadingStrategy.prototype.setMotion = /**
     * Define the motion to apply on load
     * @param {?} motion Feature motion
     * @return {?}
     */
    function (motion) {
        this.motion = motion;
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
        if (this.motion !== undefined) {
            return this.motion;
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
     * @private
     */
    FeatureStoreLoadingStrategy.prototype.motion;
    /**
     * @type {?}
     * @protected
     */
    FeatureStoreLoadingStrategy.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9zdHJhdGVnaWVzL2xvYWRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7QUFZakQ7Ozs7Ozs7OztJQUFpRCx1REFBbUI7SUFTbEUscUNBQXNCLE9BQTJDO1FBQWpFLFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBRWY7UUFIcUIsYUFBTyxHQUFQLE9BQU8sQ0FBb0M7Ozs7UUFKekQsY0FBUSxHQUFHLElBQUksR0FBRyxFQUE4QixDQUFDO1FBTXZELEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztJQUNqQyxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCwrQ0FBUzs7Ozs7SUFBVCxVQUFVLEtBQW1CO1FBQzNCLGlCQUFNLFNBQVMsWUFBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxpREFBVzs7Ozs7SUFBWCxVQUFZLEtBQW1CO1FBQzdCLGlCQUFNLFdBQVcsWUFBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCwrQ0FBUzs7Ozs7SUFBVCxVQUFVLE1BQXFCO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lB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LGFBQWEsQ0FBQyxJQUFJLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBQ0gsa0NBQUM7QUFBRCxDQUFDLEFBeklELENBQWlELG1CQUFtQixHQXlJbkU7Ozs7Ozs7Ozs7Ozs7Ozs7SUFwSUMsK0NBQXlEOzs7OztJQUV6RCw2Q0FBOEI7Ozs7O0lBRWxCLDhDQUFxRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5U3RvcmVTdHJhdGVneSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlTW90aW9uIH0gZnJvbSAnLi4vZmVhdHVyZS5lbnVtcyc7XHJcbmltcG9ydCB7IEZlYXR1cmUsIEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneU9wdGlvbnMgfSBmcm9tICcuLi9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmUgfSBmcm9tICcuLi9zdG9yZSc7XHJcblxyXG4vKipcclxuICogVGhpcyBzdHJhdGVneSBsb2FkcyBhIHN0b3JlJ3MgZmVhdHVyZXMgaW50byBpdCdzIGxheWVyIGNvdW50ZXJwYXJ0LlxyXG4gKiBUaGUgc3RvcmUgLT4gbGF5ZXIgYmluZGluZyBpcyBhIG9uZS13YXkgYmluZGluZy4gVGhhdCBtZWFucyBhbnkgZW50aXR5XHJcbiAqIGFkZGVkIHRvIHRoZSBzdG9yZSB3aWxsIGJlIGFkZGVkIHRvIHRoZSBsYXllciBidXQgdGhlIG9wcG9zaXRlIGlzIGZhbHNlLlxyXG4gKlxyXG4gKiBJbXBvcnRhbnQ6IFRoaXMgc3RyYXRlZ3kgb2JzZXJ2ZXMgZmlsdGVyZWQgZW50aXRpZXMsIG5vdCByYXcgZW50aXRpZXMuIFRoaXNcclxuICogaXMgbm90IGNvbmZpZ3VyYWJsZSB5ZXQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5IGV4dGVuZHMgRW50aXR5U3RvcmVTdHJhdGVneSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc3RvcmUncyBmZWF0dXJlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RvcmVzJCQgPSBuZXcgTWFwPEZlYXR1cmVTdG9yZSwgU3Vic2NyaXB0aW9uPigpO1xyXG5cclxuICBwcml2YXRlIG1vdGlvbjogRmVhdHVyZU1vdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM6IEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5zZXRNb3Rpb24ob3B0aW9ucy5tb3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCB0aGlzIHN0cmF0ZWd5IHRvIGEgc3RvcmUgYW5kIHN0YXJ0IHdhdGNoaW5nIGZvciBlbnRpdGllcyBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBiaW5kU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgc3VwZXIuYmluZFN0b3JlKHN0b3JlKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLndhdGNoU3RvcmUoc3RvcmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5iaW5kIHRoaXMgc3RyYXRlZ3kgZnJvbSBhIHN0b3JlIGFuZCBzdG9wIHdhdGNoaW5nIGZvciBlbnRpdGllcyBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICB1bmJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci51bmJpbmRTdG9yZShzdG9yZSk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy51bndhdGNoU3RvcmUoc3RvcmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lIHRoZSBtb3Rpb24gdG8gYXBwbHkgb24gbG9hZFxyXG4gICAqIEBwYXJhbSBtb3Rpb24gRmVhdHVyZSBtb3Rpb25cclxuICAgKi9cclxuICBzZXRNb3Rpb24obW90aW9uOiBGZWF0dXJlTW90aW9uKSB7XHJcbiAgICB0aGlzLm1vdGlvbiA9IG1vdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IHdhdGNoaW5nIGFsbCBzdG9yZXMgYWxyZWFkeSBib3VuZCB0byB0aGF0IHN0cmF0ZWd5IGF0IG9uY2UuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGRvQWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLnN0b3Jlcy5mb3JFYWNoKChzdG9yZTogRmVhdHVyZVN0b3JlKSA9PiB0aGlzLndhdGNoU3RvcmUoc3RvcmUpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3Agd2F0Y2hpbmcgYWxsIHN0b3JlcyBib3VuZCB0byB0aGF0IHN0cmF0ZWd5XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGRvRGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMudW53YXRjaEFsbCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2F0Y2ggZm9yIGVudGl0aWVzIGNoYW5nZXMgaW4gYSBzdG9yZS5cclxuICAgKiBJbXBvcnRhbnQ6IE5ldmVyIG9ic2VydmUgYSBzdG9yZSdzIHNvcnRlZCBlbnRpdGllcy4gSXQgbWFrZXMgbm8gc2Vuc2VcclxuICAgKiB0byBkaXNwbGF5IHNvcnRlZCBlbnRpdGllcyAoaW5zdGVhZCBvZiB1bnNvcnRlZCkgb24gYSBsYXllciBhbmQgaXRcclxuICAgKiB3b3VsZCBwb3RlbnRpYWxseSByZXN1bHQgaW4gYSBsb3Qgb2YgdXNlbGVzcyBjb21wdXRhdGlvbi5cclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2F0Y2hTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBpZiAodGhpcy5zdG9yZXMkJC5oYXMoc3RvcmUpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBzdG9yZS52aWV3LmFsbCQoKVxyXG4gICAgICAuc3Vic2NyaWJlKChmZWF0dXJlczogRmVhdHVyZVtdKSA9PiB0aGlzLm9uRmVhdHVyZXNDaGFuZ2UoZmVhdHVyZXMsIHN0b3JlKSk7XHJcbiAgICB0aGlzLnN0b3JlcyQkLnNldChzdG9yZSwgc3Vic2NyaXB0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3Agd2F0Y2hpbmcgZm9yIGVudGl0aWVzIGNoYW5nZXMgaW4gYSBzdG9yZS5cclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW53YXRjaFN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHRoaXMuc3RvcmVzJCQuZ2V0KHN0b3JlKTtcclxuICAgIGlmIChzdWJzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5zdG9yZXMkJC5kZWxldGUoc3RvcmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB3YXRjaGluZyBmb3IgZW50aXRpZXMgY2hhbmdlcyBpbiBhbGwgc3RvcmVzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW53YXRjaEFsbCgpIHtcclxuICAgIEFycmF5LmZyb20odGhpcy5zdG9yZXMkJC5lbnRyaWVzKCkpLmZvckVhY2goKGVudHJpZXM6IFtGZWF0dXJlU3RvcmUsIFN1YnNjcmlwdGlvbl0pID0+IHtcclxuICAgICAgZW50cmllc1sxXS51bnN1YnNjcmliZSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN0b3JlcyQkLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMb2FkIGZlYXR1cmVzIGludG8gYSBsYXllciBvciBjbGVhciB0aGUgbGF5ZXIgaWYgdGhlIGFycmF5IG9mIGZlYXR1cmVzIGlzIGVtcHR5LlxyXG4gICAqIEBwYXJhbSBmZWF0dXJlcyBTdG9yZSBmaWx0ZXJlZCBmZWF0dXJlc1xyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkZlYXR1cmVzQ2hhbmdlKGZlYXR1cmVzOiBGZWF0dXJlW10sIHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgc3RvcmUuY2xlYXJMYXllcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RvcmUuc2V0TGF5ZXJGZWF0dXJlcyhcclxuICAgICAgICBmZWF0dXJlcyxcclxuICAgICAgICB0aGlzLnNlbGVjdE1vdGlvbihzdG9yZSksXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnZpZXdTY2FsZSxcclxuICAgICAgICB0aGlzLm9wdGlvbnMuYXJlYVJhdGlvLFxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5nZXRGZWF0dXJlSWRcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbGVjdHMgdGhlIGJlc3QgbW90aW9uXHJcbiAgICogQHBhcmFtIHN0b3JlIEEgRmVhdHVyZVN0b3JlIHRvIGFwcGx5IHRoZSBtb3Rpb25cclxuICAgKiBAcmV0dXJucyBUaGUgbW90aW9uIHNlbGVjdGVkXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZWxlY3RNb3Rpb24oc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgaWYgKHRoaXMubW90aW9uICE9PSB1bmRlZmluZWQpIHsgcmV0dXJuIHRoaXMubW90aW9uOyB9XHJcblxyXG4gICAgaWYgKHN0b3JlLnByaXN0aW5lID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIElmIGZlYXR1cmVzIGhhdmUganVzdCBiZWVuIGxvYWRlZCBpbnRvIHRoZSBzdG9yZSwgbW92ZS96b29tIG9uIHRoZW1cclxuICAgICAgcmV0dXJuIEZlYXR1cmVNb3Rpb24uRGVmYXVsdDtcclxuICAgIH0gZWxzZSBpZiAoc3RvcmUuY291bnQgPiBzdG9yZS52aWV3LmNvdW50KSB7XHJcbiAgICAgIC8vIElmIGZlYXR1cmVzIGhhdmUgYmVlbiBmaWx0ZXJlZCwgbW92ZS96b29tIG9uIHRoZSByZW1haW5pbmcgb25lc1xyXG4gICAgICByZXR1cm4gRmVhdHVyZU1vdGlvbi5EZWZhdWx0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gT24gaW5zZXJ0LCB1cGRhdGUgb3IgZGVsZXRlLCBkbyBub3RoaW5nXHJcbiAgICAgIHJldHVybiBGZWF0dXJlTW90aW9uLk5vbmU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==