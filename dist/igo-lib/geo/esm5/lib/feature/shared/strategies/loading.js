/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FeatureMotion } from '../feature.enums';
import { FeatureStoreStrategy } from './strategy';
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
        if (this.isActive() === true) {
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
}(FeatureStoreStrategy));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9zdHJhdGVnaWVzL2xvYWRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFHakQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sWUFBWSxDQUFDOzs7Ozs7Ozs7QUFVbEQ7Ozs7Ozs7OztJQUFpRCx1REFBb0I7SUFPbkUscUNBQXNCLE9BQTJDO1FBQWpFLFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBQ2Y7UUFGcUIsYUFBTyxHQUFQLE9BQU8sQ0FBb0M7Ozs7UUFGekQsY0FBUSxHQUFHLElBQUksR0FBRyxFQUE4QixDQUFDOztJQUl6RCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCwrQ0FBUzs7Ozs7SUFBVCxVQUFVLEtBQW1CO1FBQzNCLGlCQUFNLFNBQVMsWUFBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILGlEQUFXOzs7OztJQUFYLFVBQVksS0FBbUI7UUFDN0IsaUJBQU0sV0FBVyxZQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksRUFBRTtZQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNPLGdEQUFVOzs7Ozs7SUFBcEI7UUFBQSxpQkFFQztRQURDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsS0FBbUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENB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SUFFN0MsOENBQXFEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlTW90aW9uIH0gZnJvbSAnLi4vZmVhdHVyZS5lbnVtcyc7XHJcbmltcG9ydCB7IEZlYXR1cmUsIEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneU9wdGlvbnMgfSBmcm9tICcuLi9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmUgfSBmcm9tICcuLi9zdG9yZSc7XHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZVN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVneSc7XHJcblxyXG4vKipcclxuICogVGhpcyBzdHJhdGVneSBsb2FkcyBhIHN0b3JlJ3MgZmVhdHVyZXMgaW50byBpdCdzIGxheWVyIGNvdW50ZXJwYXJ0LlxyXG4gKiBUaGUgc3RvcmUgLT4gbGF5ZXIgYmluZGluZyBpcyBhIG9uZS13YXkgYmluZGluZy4gVGhhdCBtZWFucyBhbnkgZW50aXR5XHJcbiAqIGFkZGVkIHRvIHRoZSBzdG9yZSB3aWxsIGJlIGFkZGVkIHRvIHRoZSBsYXllciBidXQgdGhlIG9wcG9zaXRlIGlzIGZhbHNlLlxyXG4gKlxyXG4gKiBJbXBvcnRhbnQ6IFRoaXMgc3RyYXRlZ3kgb2JzZXJ2ZXMgZmlsdGVyZWQgZW50aXRpZXMsIG5vdCByYXcgZW50aXRpZXMuIFRoaXNcclxuICogaXMgbm90IGNvbmZpZ3VyYWJsZSB5ZXQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5IGV4dGVuZHMgRmVhdHVyZVN0b3JlU3RyYXRlZ3kge1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHN0b3JlJ3MgZmVhdHVyZXNcclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JlcyQkID0gbmV3IE1hcDxGZWF0dXJlU3RvcmUsIFN1YnNjcmlwdGlvbj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM6IEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCB0aGlzIHN0cmF0ZWd5IHRvIGEgc3RvcmUgYW5kIHN0YXJ0IHdhdGNoaW5nIGZvciBlbnRpdGllcyBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBiaW5kU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgc3VwZXIuYmluZFN0b3JlKHN0b3JlKTtcclxuICAgIGlmICh0aGlzLmlzQWN0aXZlKCkgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy53YXRjaFN0b3JlKHN0b3JlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuYmluZCB0aGlzIHN0cmF0ZWd5IGZyb20gYSBzdG9yZSBhbmQgc3RvcCB3YXRjaGluZyBmb3IgZW50aXRpZXMgY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgdW5iaW5kU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgc3VwZXIudW5iaW5kU3RvcmUoc3RvcmUpO1xyXG4gICAgaWYgKHRoaXMuaXNBY3RpdmUoKSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnVud2F0Y2hTdG9yZShzdG9yZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydCB3YXRjaGluZyBhbGwgc3RvcmVzIGFscmVhZHkgYm91bmQgdG8gdGhhdCBzdHJhdGVneSBhdCBvbmNlLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBkb0FjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5zdG9yZXMuZm9yRWFjaCgoc3RvcmU6IEZlYXR1cmVTdG9yZSkgPT4gdGhpcy53YXRjaFN0b3JlKHN0b3JlKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHdhdGNoaW5nIGFsbCBzdG9yZXMgYm91bmQgdG8gdGhhdCBzdHJhdGVneVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBkb0RlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLnVud2F0Y2hBbGwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdhdGNoIGZvciBlbnRpdGllcyBjaGFuZ2VzIGluIGEgc3RvcmUuXHJcbiAgICogSW1wb3J0YW50OiBOZXZlciBvYnNlcnZlIGEgc3RvcmUncyBzb3J0ZWQgZW50aXRpZXMuIEl0IG1ha2VzIG5vIHNlbnNlXHJcbiAgICogdG8gZGlzcGxheSBzb3J0ZWQgZW50aXRpZXMgKGluc3RlYWQgb2YgdW5zb3J0ZWQpIG9uIGEgbGF5ZXIgYW5kIGl0XHJcbiAgICogd291bGQgcG90ZW50aWFsbHkgcmVzdWx0IGluIGEgbG90IG9mIHVzZWxlc3MgY29tcHV0YXRpb24uXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBwcml2YXRlIHdhdGNoU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgaWYgKHRoaXMuc3RvcmVzJCQuaGFzKHN0b3JlKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gc3RvcmUudmlldy5hbGwkKClcclxuICAgICAgLnN1YnNjcmliZSgoZmVhdHVyZXM6IEZlYXR1cmVbXSkgPT4gdGhpcy5vbkZlYXR1cmVzQ2hhbmdlKGZlYXR1cmVzLCBzdG9yZSkpO1xyXG4gICAgdGhpcy5zdG9yZXMkJC5zZXQoc3RvcmUsIHN1YnNjcmlwdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHdhdGNoaW5nIGZvciBlbnRpdGllcyBjaGFuZ2VzIGluIGEgc3RvcmUuXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBwcml2YXRlIHVud2F0Y2hTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSB0aGlzLnN0b3JlcyQkLmdldChzdG9yZSk7XHJcbiAgICBpZiAoc3Vic2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMuc3RvcmVzJCQuZGVsZXRlKHN0b3JlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3Agd2F0Y2hpbmcgZm9yIGVudGl0aWVzIGNoYW5nZXMgaW4gYWxsIHN0b3Jlcy5cclxuICAgKi9cclxuICBwcml2YXRlIHVud2F0Y2hBbGwoKSB7XHJcbiAgICBBcnJheS5mcm9tKHRoaXMuc3RvcmVzJCQuZW50cmllcygpKS5mb3JFYWNoKChlbnRyaWVzOiBbRmVhdHVyZVN0b3JlLCBTdWJzY3JpcHRpb25dKSA9PiB7XHJcbiAgICAgIGVudHJpZXNbMV0udW5zdWJzY3JpYmUoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdG9yZXMkJC5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZCBmZWF0dXJlcyBpbnRvIGEgbGF5ZXIgb3IgY2xlYXIgdGhlIGxheWVyIGlmIHRoZSBhcnJheSBvZiBmZWF0dXJlcyBpcyBlbXB0eS5cclxuICAgKiBAcGFyYW0gZmVhdHVyZXMgU3RvcmUgZmlsdGVyZWQgZmVhdHVyZXNcclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25GZWF0dXJlc0NoYW5nZShmZWF0dXJlczogRmVhdHVyZVtdLCBzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHN0b3JlLmNsZWFyTGF5ZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0b3JlLnNldExheWVyRmVhdHVyZXMoXHJcbiAgICAgICAgZmVhdHVyZXMsXHJcbiAgICAgICAgdGhpcy5zZWxlY3RNb3Rpb24oc3RvcmUpLFxyXG4gICAgICAgIHRoaXMub3B0aW9ucy52aWV3U2NhbGUsXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmFyZWFSYXRpbyxcclxuICAgICAgICB0aGlzLm9wdGlvbnMuZ2V0RmVhdHVyZUlkXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWxlY3RzIHRoZSBiZXN0IG1vdGlvblxyXG4gICAqIEBwYXJhbSBzdG9yZSBBIEZlYXR1cmVTdG9yZSB0byBhcHBseSB0aGUgbW90aW9uXHJcbiAgICogQHJldHVybnMgVGhlIG1vdGlvbiBzZWxlY3RlZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2VsZWN0TW90aW9uKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubW90aW9uICE9PSB1bmRlZmluZWQpIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5tb3Rpb247IH1cclxuXHJcbiAgICBpZiAoc3RvcmUucHJpc3RpbmUgPT09IHRydWUpIHtcclxuICAgICAgLy8gSWYgZmVhdHVyZXMgaGF2ZSBqdXN0IGJlZW4gbG9hZGVkIGludG8gdGhlIHN0b3JlLCBtb3ZlL3pvb20gb24gdGhlbVxyXG4gICAgICByZXR1cm4gRmVhdHVyZU1vdGlvbi5EZWZhdWx0O1xyXG4gICAgfSBlbHNlIGlmIChzdG9yZS5jb3VudCA+IHN0b3JlLnZpZXcuY291bnQpIHtcclxuICAgICAgLy8gSWYgZmVhdHVyZXMgaGF2ZSBiZWVuIGZpbHRlcmVkLCBtb3ZlL3pvb20gb24gdGhlIHJlbWFpbmluZyBvbmVzXHJcbiAgICAgIHJldHVybiBGZWF0dXJlTW90aW9uLkRlZmF1bHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBPbiBpbnNlcnQsIHVwZGF0ZSBvciBkZWxldGUsIGRvIG5vdGhpbmdcclxuICAgICAgcmV0dXJuIEZlYXR1cmVNb3Rpb24uTm9uZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19