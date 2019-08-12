/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Strategies or responsible of synchronizing a feature store and a layer.
 * A strategy can be shared among multiple stores. Sharing a strategy
 * is a good idea when multiple strategies would have on cancelling effect
 * on each other.
 *
 * At creation, strategy is inactive and needs to be manually activated.
 */
export class FeatureStoreStrategy {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        this.options = options;
        /**
         * Feature store
         * \@internal
         */
        this.stores = [];
        /**
         * Whether this strategy is active
         * \@internal
         */
        this.active = false;
        this.options = options;
    }
    /**
     * Whether this strategy is active
     * @return {?}
     */
    isActive() { return this.active; }
    /**
     * Activate the strategy. If it's already active, it'll be deactivated
     * and activated again.
     * @return {?}
     */
    activate() {
        if (this.active === true) {
            this.doDeactivate();
        }
        this.active = true;
        this.doActivate();
    }
    /**
     * Activate the strategy. If it's already active, it'll be deactivated
     * and activated again.
     * @return {?}
     */
    deactivate() {
        this.active = false;
        this.doDeactivate();
    }
    /**
     * Bind this strategy to a store
     * @param {?} store Feature store
     * @return {?}
     */
    bindStore(store) {
        if (this.stores.indexOf(store) < 0) {
            this.stores.push(store);
        }
    }
    /**
     * Unbind this strategy from store
     * @param {?} store Feature store
     * @return {?}
     */
    unbindStore(store) {
        /** @type {?} */
        const index = this.stores.indexOf(store);
        if (index >= 0) {
            this.stores.splice(index, 1);
        }
    }
    /**
     * Do the stataegy activation
     * \@internal
     * @protected
     * @return {?}
     */
    doActivate() { }
    /**
     * Do the strategy deactivation
     * \@internal
     * @protected
     * @return {?}
     */
    doDeactivate() { }
}
if (false) {
    /**
     * Feature store
     * \@internal
     * @type {?}
     * @protected
     */
    FeatureStoreStrategy.prototype.stores;
    /**
     * Whether this strategy is active
     * \@internal
     * @type {?}
     * @protected
     */
    FeatureStoreStrategy.prototype.active;
    /**
     * @type {?}
     * @protected
     */
    FeatureStoreStrategy.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyYXRlZ3kuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmVhdHVyZS9zaGFyZWQvc3RyYXRlZ2llcy9zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFXQSxNQUFNLE9BQU8sb0JBQW9COzs7O0lBYy9CLFlBQXNCLFVBQXVDLEVBQUU7UUFBekMsWUFBTyxHQUFQLE9BQU8sQ0FBa0M7Ozs7O1FBUnJELFdBQU0sR0FBbUIsRUFBRSxDQUFDOzs7OztRQU01QixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBR3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBS0QsUUFBUSxLQUFjLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7OztJQU0zQyxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7Ozs7O0lBTUQsVUFBVTtRQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7Ozs7SUFNRCxTQUFTLENBQUMsS0FBbUI7UUFDM0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDOzs7Ozs7SUFNRCxXQUFXLENBQUMsS0FBbUI7O2NBQ3ZCLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDeEMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQzs7Ozs7OztJQU1TLFVBQVUsS0FBSSxDQUFDOzs7Ozs7O0lBTWYsWUFBWSxLQUFJLENBQUM7Q0FFNUI7Ozs7Ozs7O0lBdkVDLHNDQUFzQzs7Ozs7OztJQU10QyxzQ0FBeUI7Ozs7O0lBRWIsdUNBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmVhdHVyZVN0b3JlU3RyYXRlZ3lPcHRpb25zIH0gZnJvbSAnLi4vZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi4vc3RvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFN0cmF0ZWdpZXMgb3IgcmVzcG9uc2libGUgb2Ygc3luY2hyb25pemluZyBhIGZlYXR1cmUgc3RvcmUgYW5kIGEgbGF5ZXIuXHJcbiAqIEEgc3RyYXRlZ3kgY2FuIGJlIHNoYXJlZCBhbW9uZyBtdWx0aXBsZSBzdG9yZXMuIFNoYXJpbmcgYSBzdHJhdGVneVxyXG4gKiBpcyBhIGdvb2QgaWRlYSB3aGVuIG11bHRpcGxlIHN0cmF0ZWdpZXMgd291bGQgaGF2ZSBvbiBjYW5jZWxsaW5nIGVmZmVjdFxyXG4gKiBvbiBlYWNoIG90aGVyLlxyXG4gKlxyXG4gKiBBdCBjcmVhdGlvbiwgc3RyYXRlZ3kgaXMgaW5hY3RpdmUgYW5kIG5lZWRzIHRvIGJlIG1hbnVhbGx5IGFjdGl2YXRlZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBGZWF0dXJlU3RvcmVTdHJhdGVneSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZlYXR1cmUgc3RvcmVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgc3RvcmVzOiBGZWF0dXJlU3RvcmVbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoaXMgc3RyYXRlZ3kgaXMgYWN0aXZlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgb3B0aW9uczogRmVhdHVyZVN0b3JlU3RyYXRlZ3lPcHRpb25zID0ge30pIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoaXMgc3RyYXRlZ3kgaXMgYWN0aXZlXHJcbiAgICovXHJcbiAgaXNBY3RpdmUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmFjdGl2ZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSB0aGUgc3RyYXRlZ3kuIElmIGl0J3MgYWxyZWFkeSBhY3RpdmUsIGl0J2xsIGJlIGRlYWN0aXZhdGVkXHJcbiAgICogYW5kIGFjdGl2YXRlZCBhZ2Fpbi5cclxuICAgKi9cclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmRvRGVhY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5kb0FjdGl2YXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSB0aGUgc3RyYXRlZ3kuIElmIGl0J3MgYWxyZWFkeSBhY3RpdmUsIGl0J2xsIGJlIGRlYWN0aXZhdGVkXHJcbiAgICogYW5kIGFjdGl2YXRlZCBhZ2Fpbi5cclxuICAgKi9cclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuZG9EZWFjdGl2YXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIHRoaXMgc3RyYXRlZ3kgdG8gYSBzdG9yZVxyXG4gICAqIEBwYXJhbSBzdG9yZSBGZWF0dXJlIHN0b3JlXHJcbiAgICovXHJcbiAgYmluZFN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIGlmICh0aGlzLnN0b3Jlcy5pbmRleE9mKHN0b3JlKSA8IDApIHtcclxuICAgICAgdGhpcy5zdG9yZXMucHVzaChzdG9yZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbmJpbmQgdGhpcyBzdHJhdGVneSBmcm9tIHN0b3JlXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICB1bmJpbmRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc3RvcmVzLmluZGV4T2Yoc3RvcmUpO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgdGhpcy5zdG9yZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERvIHRoZSBzdGF0YWVneSBhY3RpdmF0aW9uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGRvQWN0aXZhdGUoKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBEbyB0aGUgc3RyYXRlZ3kgZGVhY3RpdmF0aW9uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGRvRGVhY3RpdmF0ZSgpIHt9XHJcblxyXG59XHJcbiJdfQ==