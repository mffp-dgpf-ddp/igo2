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
     * @protected
     */
    FeatureStoreLoadingStrategy.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9zdHJhdGVnaWVzL2xvYWRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7OztBQVlqRCxNQUFNLE9BQU8sMkJBQTRCLFNBQVEsbUJBQW1COzs7O0lBT2xFLFlBQXNCLE9BQTJDO1FBQy9ELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURLLFlBQU8sR0FBUCxPQUFPLENBQW9DOzs7O1FBRnpELGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBOEIsQ0FBQztJQUl6RCxDQUFDOzs7Ozs7SUFNRCxTQUFTLENBQUMsS0FBbUI7UUFDM0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7SUFDSCxDQUFDOzs7Ozs7SUFNRCxXQUFXLENBQUMsS0FBbUI7UUFDN0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7Ozs7O0lBTVMsVUFBVTtRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLEtBQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQztJQUN2RSxDQUFDOzs7Ozs7O0lBTVMsWUFBWTtRQUNwQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7Ozs7Ozs7OztJQVNPLFVBQVUsQ0FBQyxLQUFtQjtRQUNwQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVCLE9BQU87U0FDUjs7Y0FFSyxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7YUFDbkMsU0FBUzs7OztRQUFDLENBQUMsUUFBbUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBQztRQUM3RSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDekMsQ0FBQzs7Ozs7OztJQU1PLFlBQVksQ0FBQyxLQUFtQjs7Y0FDaEMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUM3QyxJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDOUIsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7Ozs7O0lBS08sVUFBVTtRQUNoQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxPQUFxQyxFQUFFLEVBQUU7WUFDcEYsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzNCLENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7Ozs7OztJQU9PLGdCQUFnQixDQUFDLFFBQW1CLEVBQUUsS0FBbUI7UUFDL0QsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN6QixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDcEI7YUFBTTtZQUNMLEtBQUssQ0FBQyxnQkFBZ0IsQ0FDcEIsUUFBUSxFQUNSLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQzFCLENBQUM7U0FDSDtJQUNILENBQUM7Ozs7Ozs7SUFPTyxZQUFZLENBQUMsS0FBbUI7UUFDdEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1NBQUU7UUFFdEUsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUMzQixzRUFBc0U7WUFDdEUsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDO1NBQzlCO2FBQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3pDLGtFQUFrRTtZQUNsRSxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUM7U0FDOUI7YUFBTTtZQUNMLDBDQUEwQztZQUMxQyxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUM7U0FDM0I7SUFDSCxDQUFDO0NBQ0Y7Ozs7Ozs7SUF6SEMsK0NBQXlEOzs7OztJQUU3Qyw4Q0FBcUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eVN0b3JlU3RyYXRlZ3kgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZU1vdGlvbiB9IGZyb20gJy4uL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlLCBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3lPcHRpb25zIH0gZnJvbSAnLi4vZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi4vc3RvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgc3RyYXRlZ3kgbG9hZHMgYSBzdG9yZSdzIGZlYXR1cmVzIGludG8gaXQncyBsYXllciBjb3VudGVycGFydC5cclxuICogVGhlIHN0b3JlIC0+IGxheWVyIGJpbmRpbmcgaXMgYSBvbmUtd2F5IGJpbmRpbmcuIFRoYXQgbWVhbnMgYW55IGVudGl0eVxyXG4gKiBhZGRlZCB0byB0aGUgc3RvcmUgd2lsbCBiZSBhZGRlZCB0byB0aGUgbGF5ZXIgYnV0IHRoZSBvcHBvc2l0ZSBpcyBmYWxzZS5cclxuICpcclxuICogSW1wb3J0YW50OiBUaGlzIHN0cmF0ZWd5IG9ic2VydmVzIGZpbHRlcmVkIGVudGl0aWVzLCBub3QgcmF3IGVudGl0aWVzLiBUaGlzXHJcbiAqIGlzIG5vdCBjb25maWd1cmFibGUgeWV0LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSBleHRlbmRzIEVudGl0eVN0b3JlU3RyYXRlZ3kge1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHN0b3JlJ3MgZmVhdHVyZXNcclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JlcyQkID0gbmV3IE1hcDxGZWF0dXJlU3RvcmUsIFN1YnNjcmlwdGlvbj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM6IEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCB0aGlzIHN0cmF0ZWd5IHRvIGEgc3RvcmUgYW5kIHN0YXJ0IHdhdGNoaW5nIGZvciBlbnRpdGllcyBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBiaW5kU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgc3VwZXIuYmluZFN0b3JlKHN0b3JlKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLndhdGNoU3RvcmUoc3RvcmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5iaW5kIHRoaXMgc3RyYXRlZ3kgZnJvbSBhIHN0b3JlIGFuZCBzdG9wIHdhdGNoaW5nIGZvciBlbnRpdGllcyBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICB1bmJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBzdXBlci51bmJpbmRTdG9yZShzdG9yZSk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy51bndhdGNoU3RvcmUoc3RvcmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgd2F0Y2hpbmcgYWxsIHN0b3JlcyBhbHJlYWR5IGJvdW5kIHRvIHRoYXQgc3RyYXRlZ3kgYXQgb25jZS5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9BY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuc3RvcmVzLmZvckVhY2goKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHRoaXMud2F0Y2hTdG9yZShzdG9yZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB3YXRjaGluZyBhbGwgc3RvcmVzIGJvdW5kIHRvIHRoYXQgc3RyYXRlZ3lcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9EZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy51bndhdGNoQWxsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXYXRjaCBmb3IgZW50aXRpZXMgY2hhbmdlcyBpbiBhIHN0b3JlLlxyXG4gICAqIEltcG9ydGFudDogTmV2ZXIgb2JzZXJ2ZSBhIHN0b3JlJ3Mgc29ydGVkIGVudGl0aWVzLiBJdCBtYWtlcyBubyBzZW5zZVxyXG4gICAqIHRvIGRpc3BsYXkgc29ydGVkIGVudGl0aWVzIChpbnN0ZWFkIG9mIHVuc29ydGVkKSBvbiBhIGxheWVyIGFuZCBpdFxyXG4gICAqIHdvdWxkIHBvdGVudGlhbGx5IHJlc3VsdCBpbiBhIGxvdCBvZiB1c2VsZXNzIGNvbXB1dGF0aW9uLlxyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaFN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIGlmICh0aGlzLnN0b3JlcyQkLmhhcyhzdG9yZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHN0b3JlLnZpZXcuYWxsJCgpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHRoaXMub25GZWF0dXJlc0NoYW5nZShmZWF0dXJlcywgc3RvcmUpKTtcclxuICAgIHRoaXMuc3RvcmVzJCQuc2V0KHN0b3JlLCBzdWJzY3JpcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB3YXRjaGluZyBmb3IgZW50aXRpZXMgY2hhbmdlcyBpbiBhIHN0b3JlLlxyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bndhdGNoU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gdGhpcy5zdG9yZXMkJC5nZXQoc3RvcmUpO1xyXG4gICAgaWYgKHN1YnNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLnN0b3JlcyQkLmRlbGV0ZShzdG9yZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHdhdGNoaW5nIGZvciBlbnRpdGllcyBjaGFuZ2VzIGluIGFsbCBzdG9yZXMuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bndhdGNoQWxsKCkge1xyXG4gICAgQXJyYXkuZnJvbSh0aGlzLnN0b3JlcyQkLmVudHJpZXMoKSkuZm9yRWFjaCgoZW50cmllczogW0ZlYXR1cmVTdG9yZSwgU3Vic2NyaXB0aW9uXSkgPT4ge1xyXG4gICAgICBlbnRyaWVzWzFdLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3RvcmVzJCQuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWQgZmVhdHVyZXMgaW50byBhIGxheWVyIG9yIGNsZWFyIHRoZSBsYXllciBpZiB0aGUgYXJyYXkgb2YgZmVhdHVyZXMgaXMgZW1wdHkuXHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIFN0b3JlIGZpbHRlcmVkIGZlYXR1cmVzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBwcml2YXRlIG9uRmVhdHVyZXNDaGFuZ2UoZmVhdHVyZXM6IEZlYXR1cmVbXSwgc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBzdG9yZS5jbGVhckxheWVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdG9yZS5zZXRMYXllckZlYXR1cmVzKFxyXG4gICAgICAgIGZlYXR1cmVzLFxyXG4gICAgICAgIHRoaXMuc2VsZWN0TW90aW9uKHN0b3JlKSxcclxuICAgICAgICB0aGlzLm9wdGlvbnMudmlld1NjYWxlLFxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5hcmVhUmF0aW8sXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmdldEZlYXR1cmVJZFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0cyB0aGUgYmVzdCBtb3Rpb25cclxuICAgKiBAcGFyYW0gc3RvcmUgQSBGZWF0dXJlU3RvcmUgdG8gYXBwbHkgdGhlIG1vdGlvblxyXG4gICAqIEByZXR1cm5zIFRoZSBtb3Rpb24gc2VsZWN0ZWRcclxuICAgKi9cclxuICBwcml2YXRlIHNlbGVjdE1vdGlvbihzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLm1vdGlvbiAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiB0aGlzLm9wdGlvbnMubW90aW9uOyB9XHJcblxyXG4gICAgaWYgKHN0b3JlLnByaXN0aW5lID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIElmIGZlYXR1cmVzIGhhdmUganVzdCBiZWVuIGxvYWRlZCBpbnRvIHRoZSBzdG9yZSwgbW92ZS96b29tIG9uIHRoZW1cclxuICAgICAgcmV0dXJuIEZlYXR1cmVNb3Rpb24uRGVmYXVsdDtcclxuICAgIH0gZWxzZSBpZiAoc3RvcmUuY291bnQgPiBzdG9yZS52aWV3LmNvdW50KSB7XHJcbiAgICAgIC8vIElmIGZlYXR1cmVzIGhhdmUgYmVlbiBmaWx0ZXJlZCwgbW92ZS96b29tIG9uIHRoZSByZW1haW5pbmcgb25lc1xyXG4gICAgICByZXR1cm4gRmVhdHVyZU1vdGlvbi5EZWZhdWx0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gT24gaW5zZXJ0LCB1cGRhdGUgb3IgZGVsZXRlLCBkbyBub3RoaW5nXHJcbiAgICAgIHJldHVybiBGZWF0dXJlTW90aW9uLk5vbmU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==