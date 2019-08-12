/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class FeatureStoreLoadingLayerStrategy extends FeatureStoreStrategy {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.options = options;
        /**
         * Subscription to the store's OL source changes
         */
        this.stores$$ = new Map();
    }
    /**
     * Bind this strategy to a store and start watching for Ol source changes
     * @param {?} store Feature store
     * @return {?}
     */
    bindStore(store) {
        super.bindStore(store);
        if (this.isActive() === true) {
            this.watchStore(store);
        }
    }
    /**
     * Unbind this strategy from a store and stop watching for Ol source changes
     * @param {?} store Feature store
     * @return {?}
     */
    unbindStore(store) {
        super.unbindStore(store);
        if (this.isActive() === true) {
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
     * Watch for a store's  OL source changes
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    watchStore(store) {
        if (this.stores$$.has(store)) {
            return;
        }
        this.onSourceChanges(store);
        /** @type {?} */
        const olSource = store.layer.ol.getSource();
        olSource.on('change', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.onSourceChanges(store);
        }));
    }
    /**
     * Stop watching for a store's OL source changes
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    unwatchStore(store) {
        /** @type {?} */
        const key = this.stores$$.get(store);
        if (key !== undefined) {
            unByKey(key);
            this.stores$$.delete(store);
        }
    }
    /**
     * Stop watching for OL source changes in all stores.
     * @private
     * @return {?}
     */
    unwatchAll() {
        Array.from(this.stores$$.entries()).forEach((/**
         * @param {?} entries
         * @return {?}
         */
        (entries) => {
            unByKey(entries[1]);
        }));
        this.stores$$.clear();
    }
    /**
     * Load features from an OL source into a  store or clear the store if the source is empty
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    onSourceChanges(store) {
        /** @type {?} */
        const olFeatures = store.layer.ol.getSource().getFeatures();
        if (olFeatures.length === 0) {
            store.clear();
        }
        else {
            store.setStoreOlFeatures(olFeatures);
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9zdHJhdGVnaWVzL2xvYWRpbmctbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLeEMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sWUFBWSxDQUFDOzs7Ozs7Ozs7QUFVbEQsTUFBTSxPQUFPLGdDQUFpQyxTQUFRLG9CQUFvQjs7OztJQU94RSxZQUFzQixPQUFnRDtRQUNwRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFESyxZQUFPLEdBQVAsT0FBTyxDQUF5Qzs7OztRQUY5RCxhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQXdCLENBQUM7SUFJbkQsQ0FBQzs7Ozs7O0lBTUQsU0FBUyxDQUFDLEtBQW1CO1FBQzNCLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7SUFDSCxDQUFDOzs7Ozs7SUFNRCxXQUFXLENBQUMsS0FBbUI7UUFDN0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7Ozs7Ozs7SUFNUyxVQUFVO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLENBQUMsS0FBbUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO0lBQ3ZFLENBQUM7Ozs7Ozs7SUFNUyxZQUFZO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7Ozs7O0lBTU8sVUFBVSxDQUFDLEtBQW1CO1FBQ3BDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Y0FDdEIsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRTtRQUMzQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVE7Ozs7UUFBRSxDQUFDLEtBQWMsRUFBRSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBTU8sWUFBWSxDQUFDLEtBQW1COztjQUNoQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3BDLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUM7Ozs7OztJQUtPLFVBQVU7UUFDaEIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTzs7OztRQUFDLENBQUMsT0FBK0IsRUFBRSxFQUFFO1lBQzlFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7OztJQU9PLGVBQWUsQ0FBQyxLQUFtQjs7Y0FDbkMsVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRTtRQUMzRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzNCLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNmO2FBQU07WUFDTCxLQUFLLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDO0NBQ0Y7Ozs7Ozs7SUEvRkMsb0RBQW1EOzs7OztJQUV2QyxtREFBMEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1bkJ5S2V5IH0gZnJvbSAnb2wvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IE9sRXZlbnQgfSBmcm9tICdvbC9ldmVudHMvRXZlbnQnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi4vc3RvcmUnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmVMb2FkaW5nTGF5ZXJTdHJhdGVneU9wdGlvbnMgfSBmcm9tICcuLi9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmVTdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ3knO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgc3RyYXRlZ3kgbG9hZHMgYSBsYXllcidzIGZlYXR1cmVzIGludG8gaXQncyBzdG9yZSBjb3VudGVycGFydC5cclxuICogVGhlIGxheWVyIC0+IHN0b3JlIGJpbmRpbmcgaXMgYSBvbmUtd2F5IGJpbmRpbmcuIFRoYXQgbWVhbnMgYW55IE9MIGZlYXR1cmVcclxuICogYWRkZWQgdG8gdGhlIGxheWVyIHdpbGwgYmUgYWRkZWQgdG8gdGhlIHN0b3JlIGJ1dCB0aGUgb3Bwb3NpdGUgaXMgZmFsc2UuXHJcbiAqXHJcbiAqIEltcG9ydGFudDogSW4gaXQncyBjdXJyZW50IHN0YXRlLCB0aGlzIHN0cmF0ZWd5IGlzIHRvIG1lYW50IHRvIGJlIGNvbWJpbmVkXHJcbiAqIHdpdGggYSBzdGFuZGFyZCBMb2FkaW5nIHN0cmF0ZWd5IGFuZCBpdCB3b3VsZCBwcm9iYWJseSBjYXVzZSByZWN1cnNpb24gaXNzdWVzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVTdG9yZUxvYWRpbmdMYXllclN0cmF0ZWd5IGV4dGVuZHMgRmVhdHVyZVN0b3JlU3RyYXRlZ3kge1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHN0b3JlJ3MgT0wgc291cmNlIGNoYW5nZXNcclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JlcyQkID0gbmV3IE1hcDxGZWF0dXJlU3RvcmUsIHN0cmluZz4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM6IEZlYXR1cmVTdG9yZUxvYWRpbmdMYXllclN0cmF0ZWd5T3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIHRoaXMgc3RyYXRlZ3kgdG8gYSBzdG9yZSBhbmQgc3RhcnQgd2F0Y2hpbmcgZm9yIE9sIHNvdXJjZSBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBiaW5kU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgc3VwZXIuYmluZFN0b3JlKHN0b3JlKTtcclxuICAgIGlmICh0aGlzLmlzQWN0aXZlKCkgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy53YXRjaFN0b3JlKHN0b3JlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuYmluZCB0aGlzIHN0cmF0ZWd5IGZyb20gYSBzdG9yZSBhbmQgc3RvcCB3YXRjaGluZyBmb3IgT2wgc291cmNlIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIHVuYmluZFN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIHN1cGVyLnVuYmluZFN0b3JlKHN0b3JlKTtcclxuICAgIGlmICh0aGlzLmlzQWN0aXZlKCkgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy51bndhdGNoU3RvcmUoc3RvcmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgd2F0Y2hpbmcgYWxsIHN0b3JlcyBhbHJlYWR5IGJvdW5kIHRvIHRoYXQgc3RyYXRlZ3kgYXQgb25jZS5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9BY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuc3RvcmVzLmZvckVhY2goKHN0b3JlOiBGZWF0dXJlU3RvcmUpID0+IHRoaXMud2F0Y2hTdG9yZShzdG9yZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB3YXRjaGluZyBhbGwgc3RvcmVzIGJvdW5kIHRvIHRoYXQgc3RyYXRlZ3lcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9EZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy51bndhdGNoQWxsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXYXRjaCBmb3IgYSBzdG9yZSdzICBPTCBzb3VyY2UgY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaFN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIGlmICh0aGlzLnN0b3JlcyQkLmhhcyhzdG9yZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub25Tb3VyY2VDaGFuZ2VzKHN0b3JlKTtcclxuICAgIGNvbnN0IG9sU291cmNlID0gc3RvcmUubGF5ZXIub2wuZ2V0U291cmNlKCk7XHJcbiAgICBvbFNvdXJjZS5vbignY2hhbmdlJywgKGV2ZW50OiBPbEV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMub25Tb3VyY2VDaGFuZ2VzKHN0b3JlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB3YXRjaGluZyBmb3IgYSBzdG9yZSdzIE9MIHNvdXJjZSBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBwcml2YXRlIHVud2F0Y2hTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBjb25zdCBrZXkgPSB0aGlzLnN0b3JlcyQkLmdldChzdG9yZSk7XHJcbiAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdW5CeUtleShrZXkpO1xyXG4gICAgICB0aGlzLnN0b3JlcyQkLmRlbGV0ZShzdG9yZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHdhdGNoaW5nIGZvciBPTCBzb3VyY2UgY2hhbmdlcyBpbiBhbGwgc3RvcmVzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW53YXRjaEFsbCgpIHtcclxuICAgIEFycmF5LmZyb20odGhpcy5zdG9yZXMkJC5lbnRyaWVzKCkpLmZvckVhY2goKGVudHJpZXM6IFtGZWF0dXJlU3RvcmUsIHN0cmluZ10pID0+IHtcclxuICAgICAgdW5CeUtleShlbnRyaWVzWzFdKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdG9yZXMkJC5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZCBmZWF0dXJlcyBmcm9tIGFuIE9MIHNvdXJjZSBpbnRvIGEgIHN0b3JlIG9yIGNsZWFyIHRoZSBzdG9yZSBpZiB0aGUgc291cmNlIGlzIGVtcHR5XHJcbiAgICogQHBhcmFtIGZlYXR1cmVzIFN0b3JlIGZpbHRlcmVkIGZlYXR1cmVzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBwcml2YXRlIG9uU291cmNlQ2hhbmdlcyhzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBjb25zdCBvbEZlYXR1cmVzID0gc3RvcmUubGF5ZXIub2wuZ2V0U291cmNlKCkuZ2V0RmVhdHVyZXMoKTtcclxuICAgIGlmIChvbEZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBzdG9yZS5jbGVhcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RvcmUuc2V0U3RvcmVPbEZlYXR1cmVzKG9sRmVhdHVyZXMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=