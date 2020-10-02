/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class FeatureStoreLoadingStrategy extends EntityStoreStrategy {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.options = options;
        /**
         * Subscription to the store's features
         */
        this.stores$$ = new Map();
        this.setMotion(options.motion);
    }
    /**
     * Bind this strategy to a store and start watching for entities changes
     * @param {?} store Feature store
     * @return {?}
     */
    bindStore(store) {
        super.bindStore(store);
        if (this.active === true) {
            this.watchStore(store);
        }
    }
    /**
     * Unbind this strategy from a store and stop watching for entities changes
     * @param {?} store Feature store
     * @return {?}
     */
    unbindStore(store) {
        super.unbindStore(store);
        if (this.active === true) {
            this.unwatchStore(store);
        }
    }
    /**
     * Define the motion to apply on load
     * @param {?} motion Feature motion
     * @return {?}
     */
    setMotion(motion) {
        this.motion = motion;
    }
    /**
     * Start watching all stores already bound to that strategy at once.
     * \@internal
     * @protected
     * @return {?}
     */
    doActivate() {
        this.stores.forEach((/**
         * @param {?} store
         * @return {?}
         */
        (store) => this.watchStore(store)));
    }
    /**
     * Stop watching all stores bound to that strategy
     * \@internal
     * @protected
     * @return {?}
     */
    doDeactivate() {
        this.unwatchAll();
    }
    /**
     * Watch for entities changes in a store.
     * Important: Never observe a store's sorted entities. It makes no sense
     * to display sorted entities (instead of unsorted) on a layer and it
     * would potentially result in a lot of useless computation.
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    watchStore(store) {
        if (this.stores$$.has(store)) {
            return;
        }
        /** @type {?} */
        const subscription = store.view.all$()
            .subscribe((/**
         * @param {?} features
         * @return {?}
         */
        (features) => this.onFeaturesChange(features, store)));
        this.stores$$.set(store, subscription);
    }
    /**
     * Stop watching for entities changes in a store.
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    unwatchStore(store) {
        /** @type {?} */
        const subscription = this.stores$$.get(store);
        if (subscription !== undefined) {
            subscription.unsubscribe();
            this.stores$$.delete(store);
        }
    }
    /**
     * Stop watching for entities changes in all stores.
     * @private
     * @return {?}
     */
    unwatchAll() {
        Array.from(this.stores$$.entries()).forEach((/**
         * @param {?} entries
         * @return {?}
         */
        (entries) => {
            entries[1].unsubscribe();
        }));
        this.stores$$.clear();
    }
    /**
     * Load features into a layer or clear the layer if the array of features is empty.
     * @private
     * @param {?} features Store filtered features
     * @param {?} store Feature store
     * @return {?}
     */
    onFeaturesChange(features, store) {
        if (features.length === 0) {
            store.clearLayer();
        }
        else {
            store.setLayerFeatures(features, this.selectMotion(store), this.options.viewScale, this.options.areaRatio, this.options.getFeatureId);
        }
    }
    /**
     * Selects the best motion
     * @private
     * @param {?} store A FeatureStore to apply the motion
     * @return {?} The motion selected
     */
    selectMotion(store) {
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9zdHJhdGVnaWVzL2xvYWRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7OztBQVlqRCxNQUFNLE9BQU8sMkJBQTRCLFNBQVEsbUJBQW1COzs7O0lBU2xFLFlBQXNCLE9BQTJDO1FBQy9ELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURLLFlBQU8sR0FBUCxPQUFPLENBQW9DOzs7O1FBSnpELGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBOEIsQ0FBQztRQU12RCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7SUFNRCxTQUFTLENBQUMsS0FBbUI7UUFDM0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7SUFDSCxDQUFDOzs7Ozs7SUFNRCxXQUFXLENBQUMsS0FBbUI7UUFDN0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7Ozs7SUFNRCxTQUFTLENBQUMsTUFBcUI7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQzs7Ozs7OztJQU1TLFVBQVU7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxLQUFtQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7SUFDdkUsQ0FBQzs7Ozs7OztJQU1TLFlBQVk7UUFDcEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7Ozs7Ozs7SUFTTyxVQUFVLENBQUMsS0FBbUI7UUFDcEMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPO1NBQ1I7O2NBRUssWUFBWSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2FBQ25DLFNBQVM7Ozs7UUFBQyxDQUFDLFFBQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUM7UUFDN0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7Ozs7SUFNTyxZQUFZLENBQUMsS0FBbUI7O2NBQ2hDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDN0MsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQzlCLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUM7Ozs7OztJQUtPLFVBQVU7UUFDaEIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTzs7OztRQUFDLENBQUMsT0FBcUMsRUFBRSxFQUFFO1lBQ3BGLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7Ozs7SUFPTyxnQkFBZ0IsQ0FBQyxRQUFtQixFQUFFLEtBQW1CO1FBQy9ELElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDekIsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3BCO2FBQU07WUFDTCxLQUFLLENBQUMsZ0JBQWdCLENBQ3BCLFFBQVEsRUFDUixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUMxQixDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7Ozs7O0lBT08sWUFBWSxDQUFDLEtBQW1CO1FBQ3RDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FBRTtRQUV0RCxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQzNCLHNFQUFzRTtZQUN0RSxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUM7U0FDOUI7YUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDekMsa0VBQWtFO1lBQ2xFLE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQztTQUM5QjthQUFNO1lBQ0wsMENBQTBDO1lBQzFDLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQztTQUMzQjtJQUNILENBQUM7Q0FDRjs7Ozs7OztJQXBJQywrQ0FBeUQ7Ozs7O0lBRXpELDZDQUE4Qjs7Ozs7SUFFbEIsOENBQXFEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZVN0cmF0ZWd5IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmVNb3Rpb24gfSBmcm9tICcuLi9mZWF0dXJlLmVudW1zJztcclxuaW1wb3J0IHsgRmVhdHVyZSwgRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5T3B0aW9ucyB9IGZyb20gJy4uL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZSB9IGZyb20gJy4uL3N0b3JlJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIHN0cmF0ZWd5IGxvYWRzIGEgc3RvcmUncyBmZWF0dXJlcyBpbnRvIGl0J3MgbGF5ZXIgY291bnRlcnBhcnQuXHJcbiAqIFRoZSBzdG9yZSAtPiBsYXllciBiaW5kaW5nIGlzIGEgb25lLXdheSBiaW5kaW5nLiBUaGF0IG1lYW5zIGFueSBlbnRpdHlcclxuICogYWRkZWQgdG8gdGhlIHN0b3JlIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGxheWVyIGJ1dCB0aGUgb3Bwb3NpdGUgaXMgZmFsc2UuXHJcbiAqXHJcbiAqIEltcG9ydGFudDogVGhpcyBzdHJhdGVneSBvYnNlcnZlcyBmaWx0ZXJlZCBlbnRpdGllcywgbm90IHJhdyBlbnRpdGllcy4gVGhpc1xyXG4gKiBpcyBub3QgY29uZmlndXJhYmxlIHlldC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3kgZXh0ZW5kcyBFbnRpdHlTdG9yZVN0cmF0ZWd5IHtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBzdG9yZSdzIGZlYXR1cmVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdG9yZXMkJCA9IG5ldyBNYXA8RmVhdHVyZVN0b3JlLCBTdWJzY3JpcHRpb24+KCk7XHJcblxyXG4gIHByaXZhdGUgbW90aW9uOiBGZWF0dXJlTW90aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgb3B0aW9uczogRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5T3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB0aGlzLnNldE1vdGlvbihvcHRpb25zLm1vdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIHRoaXMgc3RyYXRlZ3kgdG8gYSBzdG9yZSBhbmQgc3RhcnQgd2F0Y2hpbmcgZm9yIGVudGl0aWVzIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIGJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci5iaW5kU3RvcmUoc3RvcmUpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMud2F0Y2hTdG9yZShzdG9yZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbmJpbmQgdGhpcyBzdHJhdGVneSBmcm9tIGEgc3RvcmUgYW5kIHN0b3Agd2F0Y2hpbmcgZm9yIGVudGl0aWVzIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIHVuYmluZFN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIHN1cGVyLnVuYmluZFN0b3JlKHN0b3JlKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnVud2F0Y2hTdG9yZShzdG9yZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmUgdGhlIG1vdGlvbiB0byBhcHBseSBvbiBsb2FkXHJcbiAgICogQHBhcmFtIG1vdGlvbiBGZWF0dXJlIG1vdGlvblxyXG4gICAqL1xyXG4gIHNldE1vdGlvbihtb3Rpb246IEZlYXR1cmVNb3Rpb24pIHtcclxuICAgIHRoaXMubW90aW9uID0gbW90aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgd2F0Y2hpbmcgYWxsIHN0b3JlcyBhbHJlYWR5IGJvdW5kIHRvIHRoYXQgc3RyYXRlZ3kgYXQgb25jZS5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9BY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuc3RvcmVzLmZvckVhY2goKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHRoaXMud2F0Y2hTdG9yZShzdG9yZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB3YXRjaGluZyBhbGwgc3RvcmVzIGJvdW5kIHRvIHRoYXQgc3RyYXRlZ3lcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9EZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy51bndhdGNoQWxsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXYXRjaCBmb3IgZW50aXRpZXMgY2hhbmdlcyBpbiBhIHN0b3JlLlxyXG4gICAqIEltcG9ydGFudDogTmV2ZXIgb2JzZXJ2ZSBhIHN0b3JlJ3Mgc29ydGVkIGVudGl0aWVzLiBJdCBtYWtlcyBubyBzZW5zZVxyXG4gICAqIHRvIGRpc3BsYXkgc29ydGVkIGVudGl0aWVzIChpbnN0ZWFkIG9mIHVuc29ydGVkKSBvbiBhIGxheWVyIGFuZCBpdFxyXG4gICAqIHdvdWxkIHBvdGVudGlhbGx5IHJlc3VsdCBpbiBhIGxvdCBvZiB1c2VsZXNzIGNvbXB1dGF0aW9uLlxyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaFN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIGlmICh0aGlzLnN0b3JlcyQkLmhhcyhzdG9yZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHN0b3JlLnZpZXcuYWxsJCgpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHRoaXMub25GZWF0dXJlc0NoYW5nZShmZWF0dXJlcywgc3RvcmUpKTtcclxuICAgIHRoaXMuc3RvcmVzJCQuc2V0KHN0b3JlLCBzdWJzY3JpcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB3YXRjaGluZyBmb3IgZW50aXRpZXMgY2hhbmdlcyBpbiBhIHN0b3JlLlxyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bndhdGNoU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gdGhpcy5zdG9yZXMkJC5nZXQoc3RvcmUpO1xyXG4gICAgaWYgKHN1YnNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLnN0b3JlcyQkLmRlbGV0ZShzdG9yZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHdhdGNoaW5nIGZvciBlbnRpdGllcyBjaGFuZ2VzIGluIGFsbCBzdG9yZXMuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bndhdGNoQWxsKCkge1xyXG4gICAgQXJyYXkuZnJvbSh0aGlzLnN0b3JlcyQkLmVudHJpZXMoKSkuZm9yRWFjaCgoZW50cmllczogW0ZlYXR1cmVTdG9yZSwgU3Vic2NyaXB0aW9uXSkgPT4ge1xyXG4gICAgICBlbnRyaWVzWzFdLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3RvcmVzJCQuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWQgZmVhdHVyZXMgaW50byBhIGxheWVyIG9yIGNsZWFyIHRoZSBsYXllciBpZiB0aGUgYXJyYXkgb2YgZmVhdHVyZXMgaXMgZW1wdHkuXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIFN0b3JlIGZpbHRlcmVkIGZlYXR1cmVzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBwcml2YXRlIG9uRmVhdHVyZXNDaGFuZ2UoZmVhdHVyZXM6IEZlYXR1cmVbXSwgc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBzdG9yZS5jbGVhckxheWVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdG9yZS5zZXRMYXllckZlYXR1cmVzKFxyXG4gICAgICAgIGZlYXR1cmVzLFxyXG4gICAgICAgIHRoaXMuc2VsZWN0TW90aW9uKHN0b3JlKSxcclxuICAgICAgICB0aGlzLm9wdGlvbnMudmlld1NjYWxlLFxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5hcmVhUmF0aW8sXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmdldEZlYXR1cmVJZFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0cyB0aGUgYmVzdCBtb3Rpb25cclxuICAgKiBAcGFyYW0gc3RvcmUgQSBGZWF0dXJlU3RvcmUgdG8gYXBwbHkgdGhlIG1vdGlvblxyXG4gICAqIEByZXR1cm5zIFRoZSBtb3Rpb24gc2VsZWN0ZWRcclxuICAgKi9cclxuICBwcml2YXRlIHNlbGVjdE1vdGlvbihzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBpZiAodGhpcy5tb3Rpb24gIT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdGhpcy5tb3Rpb247IH1cclxuXHJcbiAgICBpZiAoc3RvcmUucHJpc3RpbmUgPT09IHRydWUpIHtcclxuICAgICAgLy8gSWYgZmVhdHVyZXMgaGF2ZSBqdXN0IGJlZW4gbG9hZGVkIGludG8gdGhlIHN0b3JlLCBtb3ZlL3pvb20gb24gdGhlbVxyXG4gICAgICByZXR1cm4gRmVhdHVyZU1vdGlvbi5EZWZhdWx0O1xyXG4gICAgfSBlbHNlIGlmIChzdG9yZS5jb3VudCA+IHN0b3JlLnZpZXcuY291bnQpIHtcclxuICAgICAgLy8gSWYgZmVhdHVyZXMgaGF2ZSBiZWVuIGZpbHRlcmVkLCBtb3ZlL3pvb20gb24gdGhlIHJlbWFpbmluZyBvbmVzXHJcbiAgICAgIHJldHVybiBGZWF0dXJlTW90aW9uLkRlZmF1bHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBPbiBpbnNlcnQsIHVwZGF0ZSBvciBkZWxldGUsIGRvIG5vdGhpbmdcclxuICAgICAgcmV0dXJuIEZlYXR1cmVNb3Rpb24uTm9uZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19