/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { unByKey } from 'ol/Observable';
import { EntityStoreStrategy } from '@igo2/common';
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
        if (this.active === true) {
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
}(EntityStoreStrategy));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9zdHJhdGVnaWVzL2xvYWRpbmctbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3hDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7O0FBYW5EOzs7Ozs7Ozs7SUFBc0QsNERBQW1CO0lBT3ZFLDBDQUFzQixPQUFnRDtRQUF0RSxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUNmO1FBRnFCLGFBQU8sR0FBUCxPQUFPLENBQXlDOzs7O1FBRjlELGNBQVEsR0FBRyxJQUFJLEdBQUcsRUFBd0IsQ0FBQzs7SUFJbkQsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsb0RBQVM7Ozs7O0lBQVQsVUFBVSxLQUFtQjtRQUMzQixpQkFBTSxTQUFTLFlBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsc0RBQVc7Ozs7O0lBQVgsVUFBWSxLQUFtQjtRQUM3QixpQkFBTSxXQUFXLFlBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNPLHFEQUFVOzs7Ozs7SUFBcEI7UUFBQSxpQkFFQztRQURDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsS0FBbUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQXRCLENBQXNCLEVBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ08sdURBQVk7Ozs7OztJQUF0QjtRQUNFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0sscURBQVU7Ozs7OztJQUFsQixVQUFtQixLQUFtQjtRQUF0QyxpQkFVQztRQVRDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7WUFDdEIsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRTtRQUMzQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVE7Ozs7UUFBRSxVQUFDLEtBQWM7WUFDbkMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSyx1REFBWTs7Ozs7O0lBQXBCLFVBQXFCLEtBQW1COztZQUNoQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3BDLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0sscURBQVU7Ozs7O0lBQWxCO1FBQ0UsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsT0FBK0I7WUFDMUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNLLDBEQUFlOzs7Ozs7SUFBdkIsVUFBd0IsS0FBbUI7O1lBQ25DLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxXQUFXLEVBQUU7UUFDM0QsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMzQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZjthQUFNO1lBQ0wsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztJQUNILHVDQUFDO0FBQUQsQ0FBQyxBQXBHRCxDQUFzRCxtQkFBbUIsR0FvR3hFOzs7Ozs7Ozs7Ozs7Ozs7O0lBL0ZDLG9EQUFtRDs7Ozs7SUFFdkMsbURBQTBEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdW5CeUtleSB9IGZyb20gJ29sL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBPbEV2ZW50IH0gZnJvbSAnb2wvZXZlbnRzL0V2ZW50JztcclxuXHJcbmltcG9ydCB7IEVudGl0eVN0b3JlU3RyYXRlZ3kgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi4vc3RvcmUnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmVMb2FkaW5nTGF5ZXJTdHJhdGVneU9wdGlvbnMgfSBmcm9tICcuLi9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgc3RyYXRlZ3kgbG9hZHMgYSBsYXllcidzIGZlYXR1cmVzIGludG8gaXQncyBzdG9yZSBjb3VudGVycGFydC5cclxuICogVGhlIGxheWVyIC0+IHN0b3JlIGJpbmRpbmcgaXMgYSBvbmUtd2F5IGJpbmRpbmcuIFRoYXQgbWVhbnMgYW55IE9MIGZlYXR1cmVcclxuICogYWRkZWQgdG8gdGhlIGxheWVyIHdpbGwgYmUgYWRkZWQgdG8gdGhlIHN0b3JlIGJ1dCB0aGUgb3Bwb3NpdGUgaXMgZmFsc2UuXHJcbiAqXHJcbiAqIEltcG9ydGFudDogSW4gaXQncyBjdXJyZW50IHN0YXRlLCB0aGlzIHN0cmF0ZWd5IGlzIHRvIG1lYW50IHRvIGJlIGNvbWJpbmVkXHJcbiAqIHdpdGggYSBzdGFuZGFyZCBMb2FkaW5nIHN0cmF0ZWd5IGFuZCBpdCB3b3VsZCBwcm9iYWJseSBjYXVzZSByZWN1cnNpb24gaXNzdWVzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVTdG9yZUxvYWRpbmdMYXllclN0cmF0ZWd5IGV4dGVuZHMgRW50aXR5U3RvcmVTdHJhdGVneSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc3RvcmUncyBPTCBzb3VyY2UgY2hhbmdlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RvcmVzJCQgPSBuZXcgTWFwPEZlYXR1cmVTdG9yZSwgc3RyaW5nPigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgb3B0aW9uczogRmVhdHVyZVN0b3JlTG9hZGluZ0xheWVyU3RyYXRlZ3lPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJpbmQgdGhpcyBzdHJhdGVneSB0byBhIHN0b3JlIGFuZCBzdGFydCB3YXRjaGluZyBmb3IgT2wgc291cmNlIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIGJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci5iaW5kU3RvcmUoc3RvcmUpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMud2F0Y2hTdG9yZShzdG9yZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbmJpbmQgdGhpcyBzdHJhdGVneSBmcm9tIGEgc3RvcmUgYW5kIHN0b3Agd2F0Y2hpbmcgZm9yIE9sIHNvdXJjZSBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICB1bmJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci51bmJpbmRTdG9yZShzdG9yZSk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy51bndhdGNoU3RvcmUoc3RvcmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgd2F0Y2hpbmcgYWxsIHN0b3JlcyBhbHJlYWR5IGJvdW5kIHRvIHRoYXQgc3RyYXRlZ3kgYXQgb25jZS5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9BY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuc3RvcmVzLmZvckVhY2goKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHRoaXMud2F0Y2hTdG9yZShzdG9yZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB3YXRjaGluZyBhbGwgc3RvcmVzIGJvdW5kIHRvIHRoYXQgc3RyYXRlZ3lcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9EZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy51bndhdGNoQWxsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXYXRjaCBmb3IgYSBzdG9yZSdzICBPTCBzb3VyY2UgY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaFN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIGlmICh0aGlzLnN0b3JlcyQkLmhhcyhzdG9yZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub25Tb3VyY2VDaGFuZ2VzKHN0b3JlKTtcclxuICAgIGNvbnN0IG9sU291cmNlID0gc3RvcmUubGF5ZXIub2wuZ2V0U291cmNlKCk7XHJcbiAgICBvbFNvdXJjZS5vbignY2hhbmdlJywgKGV2ZW50OiBPbEV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMub25Tb3VyY2VDaGFuZ2VzKHN0b3JlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB3YXRjaGluZyBmb3IgYSBzdG9yZSdzIE9MIHNvdXJjZSBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBwcml2YXRlIHVud2F0Y2hTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBjb25zdCBrZXkgPSB0aGlzLnN0b3JlcyQkLmdldChzdG9yZSk7XHJcbiAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdW5CeUtleShrZXkpO1xyXG4gICAgICB0aGlzLnN0b3JlcyQkLmRlbGV0ZShzdG9yZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHdhdGNoaW5nIGZvciBPTCBzb3VyY2UgY2hhbmdlcyBpbiBhbGwgc3RvcmVzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW53YXRjaEFsbCgpIHtcclxuICAgIEFycmF5LmZyb20odGhpcy5zdG9yZXMkJC5lbnRyaWVzKCkpLmZvckVhY2goKGVudHJpZXM6IFtGZWF0dXJlU3RvcmUsIHN0cmluZ10pID0+IHtcclxuICAgICAgdW5CeUtleShlbnRyaWVzWzFdKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdG9yZXMkJC5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZCBmZWF0dXJlcyBmcm9tIGFuIE9MIHNvdXJjZSBpbnRvIGEgIHN0b3JlIG9yIGNsZWFyIHRoZSBzdG9yZSBpZiB0aGUgc291cmNlIGlzIGVtcHR5XHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIFN0b3JlIGZpbHRlcmVkIGZlYXR1cmVzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBwcml2YXRlIG9uU291cmNlQ2hhbmdlcyhzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBjb25zdCBvbEZlYXR1cmVzID0gc3RvcmUubGF5ZXIub2wuZ2V0U291cmNlKCkuZ2V0RmVhdHVyZXMoKTtcclxuICAgIGlmIChvbEZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBzdG9yZS5jbGVhcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RvcmUuc2V0U3RvcmVPbEZlYXR1cmVzKG9sRmVhdHVyZXMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=