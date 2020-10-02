/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class FeatureStoreLoadingLayerStrategy extends EntityStoreStrategy {
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
        if (this.active === true) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9zdHJhdGVnaWVzL2xvYWRpbmctbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHeEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sY0FBYyxDQUFDOzs7Ozs7Ozs7QUFhbkQsTUFBTSxPQUFPLGdDQUFpQyxTQUFRLG1CQUFtQjs7OztJQU92RSxZQUFzQixPQUFnRDtRQUNwRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFESyxZQUFPLEdBQVAsT0FBTyxDQUF5Qzs7OztRQUY5RCxhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQXdCLENBQUM7SUFJbkQsQ0FBQzs7Ozs7O0lBTUQsU0FBUyxDQUFDLEtBQW1CO1FBQzNCLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsV0FBVyxDQUFDLEtBQW1CO1FBQzdCLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7Ozs7OztJQU1TLFVBQVU7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxLQUFtQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7SUFDdkUsQ0FBQzs7Ozs7OztJQU1TLFlBQVk7UUFDcEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7Ozs7SUFNTyxVQUFVLENBQUMsS0FBbUI7UUFDcEMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDOztjQUN0QixRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFO1FBQzNDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUTs7OztRQUFFLENBQUMsS0FBYyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFNTyxZQUFZLENBQUMsS0FBbUI7O2NBQ2hDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDcEMsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7Ozs7O0lBS08sVUFBVTtRQUNoQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxPQUErQixFQUFFLEVBQUU7WUFDOUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7Ozs7O0lBT08sZUFBZSxDQUFDLEtBQW1COztjQUNuQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFO1FBQzNELElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDM0IsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Y7YUFBTTtZQUNMLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN0QztJQUNILENBQUM7Q0FDRjs7Ozs7OztJQS9GQyxvREFBbUQ7Ozs7O0lBRXZDLG1EQUEwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgT2xFdmVudCB9IGZyb20gJ29sL2V2ZW50cy9FdmVudCc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZVN0cmF0ZWd5IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZSB9IGZyb20gJy4uL3N0b3JlJztcclxuaW1wb3J0IHsgRmVhdHVyZVN0b3JlTG9hZGluZ0xheWVyU3RyYXRlZ3lPcHRpb25zIH0gZnJvbSAnLi4vZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIHN0cmF0ZWd5IGxvYWRzIGEgbGF5ZXIncyBmZWF0dXJlcyBpbnRvIGl0J3Mgc3RvcmUgY291bnRlcnBhcnQuXHJcbiAqIFRoZSBsYXllciAtPiBzdG9yZSBiaW5kaW5nIGlzIGEgb25lLXdheSBiaW5kaW5nLiBUaGF0IG1lYW5zIGFueSBPTCBmZWF0dXJlXHJcbiAqIGFkZGVkIHRvIHRoZSBsYXllciB3aWxsIGJlIGFkZGVkIHRvIHRoZSBzdG9yZSBidXQgdGhlIG9wcG9zaXRlIGlzIGZhbHNlLlxyXG4gKlxyXG4gKiBJbXBvcnRhbnQ6IEluIGl0J3MgY3VycmVudCBzdGF0ZSwgdGhpcyBzdHJhdGVneSBpcyB0byBtZWFudCB0byBiZSBjb21iaW5lZFxyXG4gKiB3aXRoIGEgc3RhbmRhcmQgTG9hZGluZyBzdHJhdGVneSBhbmQgaXQgd291bGQgcHJvYmFibHkgY2F1c2UgcmVjdXJzaW9uIGlzc3Vlcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBGZWF0dXJlU3RvcmVMb2FkaW5nTGF5ZXJTdHJhdGVneSBleHRlbmRzIEVudGl0eVN0b3JlU3RyYXRlZ3kge1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHN0b3JlJ3MgT0wgc291cmNlIGNoYW5nZXNcclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JlcyQkID0gbmV3IE1hcDxGZWF0dXJlU3RvcmUsIHN0cmluZz4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM6IEZlYXR1cmVTdG9yZUxvYWRpbmdMYXllclN0cmF0ZWd5T3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIHRoaXMgc3RyYXRlZ3kgdG8gYSBzdG9yZSBhbmQgc3RhcnQgd2F0Y2hpbmcgZm9yIE9sIHNvdXJjZSBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBiaW5kU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgc3VwZXIuYmluZFN0b3JlKHN0b3JlKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLndhdGNoU3RvcmUoc3RvcmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5iaW5kIHRoaXMgc3RyYXRlZ3kgZnJvbSBhIHN0b3JlIGFuZCBzdG9wIHdhdGNoaW5nIGZvciBPbCBzb3VyY2UgY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgdW5iaW5kU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgc3VwZXIudW5iaW5kU3RvcmUoc3RvcmUpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMudW53YXRjaFN0b3JlKHN0b3JlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IHdhdGNoaW5nIGFsbCBzdG9yZXMgYWxyZWFkeSBib3VuZCB0byB0aGF0IHN0cmF0ZWd5IGF0IG9uY2UuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGRvQWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLnN0b3Jlcy5mb3JFYWNoKChzdG9yZTogRmVhdHVyZVN0b3JlKSA9PiB0aGlzLndhdGNoU3RvcmUoc3RvcmUpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3Agd2F0Y2hpbmcgYWxsIHN0b3JlcyBib3VuZCB0byB0aGF0IHN0cmF0ZWd5XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGRvRGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMudW53YXRjaEFsbCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2F0Y2ggZm9yIGEgc3RvcmUncyAgT0wgc291cmNlIGNoYW5nZXNcclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2F0Y2hTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBpZiAodGhpcy5zdG9yZXMkJC5oYXMoc3RvcmUpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9uU291cmNlQ2hhbmdlcyhzdG9yZSk7XHJcbiAgICBjb25zdCBvbFNvdXJjZSA9IHN0b3JlLmxheWVyLm9sLmdldFNvdXJjZSgpO1xyXG4gICAgb2xTb3VyY2Uub24oJ2NoYW5nZScsIChldmVudDogT2xFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm9uU291cmNlQ2hhbmdlcyhzdG9yZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3Agd2F0Y2hpbmcgZm9yIGEgc3RvcmUncyBPTCBzb3VyY2UgY2hhbmdlc1xyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1bndhdGNoU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgY29uc3Qga2V5ID0gdGhpcy5zdG9yZXMkJC5nZXQoc3RvcmUpO1xyXG4gICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHVuQnlLZXkoa2V5KTtcclxuICAgICAgdGhpcy5zdG9yZXMkJC5kZWxldGUoc3RvcmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB3YXRjaGluZyBmb3IgT0wgc291cmNlIGNoYW5nZXMgaW4gYWxsIHN0b3Jlcy5cclxuICAgKi9cclxuICBwcml2YXRlIHVud2F0Y2hBbGwoKSB7XHJcbiAgICBBcnJheS5mcm9tKHRoaXMuc3RvcmVzJCQuZW50cmllcygpKS5mb3JFYWNoKChlbnRyaWVzOiBbRmVhdHVyZVN0b3JlLCBzdHJpbmddKSA9PiB7XHJcbiAgICAgIHVuQnlLZXkoZW50cmllc1sxXSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3RvcmVzJCQuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWQgZmVhdHVyZXMgZnJvbSBhbiBPTCBzb3VyY2UgaW50byBhICBzdG9yZSBvciBjbGVhciB0aGUgc3RvcmUgaWYgdGhlIHNvdXJjZSBpcyBlbXB0eVxyXG4gICAqIEBwYXJhbSBmZWF0dXJlcyBTdG9yZSBmaWx0ZXJlZCBmZWF0dXJlc1xyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblNvdXJjZUNoYW5nZXMoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IHN0b3JlLmxheWVyLm9sLmdldFNvdXJjZSgpLmdldEZlYXR1cmVzKCk7XHJcbiAgICBpZiAob2xGZWF0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgc3RvcmUuY2xlYXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0b3JlLnNldFN0b3JlT2xGZWF0dXJlcyhvbEZlYXR1cmVzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19