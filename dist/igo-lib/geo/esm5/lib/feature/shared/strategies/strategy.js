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
var /**
 * Strategies or responsible of synchronizing a feature store and a layer.
 * A strategy can be shared among multiple stores. Sharing a strategy
 * is a good idea when multiple strategies would have on cancelling effect
 * on each other.
 *
 * At creation, strategy is inactive and needs to be manually activated.
 */
FeatureStoreStrategy = /** @class */ (function () {
    function FeatureStoreStrategy(options) {
        if (options === void 0) { options = {}; }
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
     */
    /**
     * Whether this strategy is active
     * @return {?}
     */
    FeatureStoreStrategy.prototype.isActive = /**
     * Whether this strategy is active
     * @return {?}
     */
    function () { return this.active; };
    /**
     * Activate the strategy. If it's already active, it'll be deactivated
     * and activated again.
     */
    /**
     * Activate the strategy. If it's already active, it'll be deactivated
     * and activated again.
     * @return {?}
     */
    FeatureStoreStrategy.prototype.activate = /**
     * Activate the strategy. If it's already active, it'll be deactivated
     * and activated again.
     * @return {?}
     */
    function () {
        if (this.active === true) {
            this.doDeactivate();
        }
        this.active = true;
        this.doActivate();
    };
    /**
     * Activate the strategy. If it's already active, it'll be deactivated
     * and activated again.
     */
    /**
     * Activate the strategy. If it's already active, it'll be deactivated
     * and activated again.
     * @return {?}
     */
    FeatureStoreStrategy.prototype.deactivate = /**
     * Activate the strategy. If it's already active, it'll be deactivated
     * and activated again.
     * @return {?}
     */
    function () {
        this.active = false;
        this.doDeactivate();
    };
    /**
     * Bind this strategy to a store
     * @param store Feature store
     */
    /**
     * Bind this strategy to a store
     * @param {?} store Feature store
     * @return {?}
     */
    FeatureStoreStrategy.prototype.bindStore = /**
     * Bind this strategy to a store
     * @param {?} store Feature store
     * @return {?}
     */
    function (store) {
        if (this.stores.indexOf(store) < 0) {
            this.stores.push(store);
        }
    };
    /**
     * Unbind this strategy from store
     * @param store Feature store
     */
    /**
     * Unbind this strategy from store
     * @param {?} store Feature store
     * @return {?}
     */
    FeatureStoreStrategy.prototype.unbindStore = /**
     * Unbind this strategy from store
     * @param {?} store Feature store
     * @return {?}
     */
    function (store) {
        /** @type {?} */
        var index = this.stores.indexOf(store);
        if (index >= 0) {
            this.stores.splice(index, 1);
        }
    };
    /**
     * Do the stataegy activation
     * @internal
     */
    /**
     * Do the stataegy activation
     * \@internal
     * @protected
     * @return {?}
     */
    FeatureStoreStrategy.prototype.doActivate = /**
     * Do the stataegy activation
     * \@internal
     * @protected
     * @return {?}
     */
    function () { };
    /**
     * Do the strategy deactivation
     * @internal
     */
    /**
     * Do the strategy deactivation
     * \@internal
     * @protected
     * @return {?}
     */
    FeatureStoreStrategy.prototype.doDeactivate = /**
     * Do the strategy deactivation
     * \@internal
     * @protected
     * @return {?}
     */
    function () { };
    return FeatureStoreStrategy;
}());
/**
 * Strategies or responsible of synchronizing a feature store and a layer.
 * A strategy can be shared among multiple stores. Sharing a strategy
 * is a good idea when multiple strategies would have on cancelling effect
 * on each other.
 *
 * At creation, strategy is inactive and needs to be manually activated.
 */
export { FeatureStoreStrategy };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyYXRlZ3kuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmVhdHVyZS9zaGFyZWQvc3RyYXRlZ2llcy9zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7O0lBY0UsOEJBQXNCLE9BQXlDO1FBQXpDLHdCQUFBLEVBQUEsWUFBeUM7UUFBekMsWUFBTyxHQUFQLE9BQU8sQ0FBa0M7Ozs7O1FBUnJELFdBQU0sR0FBbUIsRUFBRSxDQUFDOzs7OztRQU01QixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBR3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCx1Q0FBUTs7OztJQUFSLGNBQXNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFFM0M7OztPQUdHOzs7Ozs7SUFDSCx1Q0FBUTs7Ozs7SUFBUjtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILHlDQUFVOzs7OztJQUFWO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILHdDQUFTOzs7OztJQUFULFVBQVUsS0FBbUI7UUFDM0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCwwQ0FBVzs7Ozs7SUFBWCxVQUFZLEtBQW1COztZQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3hDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDTyx5Q0FBVTs7Ozs7O0lBQXBCLGNBQXdCLENBQUM7SUFFekI7OztPQUdHOzs7Ozs7O0lBQ08sMkNBQVk7Ozs7OztJQUF0QixjQUEwQixDQUFDO0lBRTdCLDJCQUFDO0FBQUQsQ0FBQyxBQTdFRCxJQTZFQzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF2RUMsc0NBQXNDOzs7Ozs7O0lBTXRDLHNDQUF5Qjs7Ozs7SUFFYix1Q0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGZWF0dXJlU3RvcmVTdHJhdGVneU9wdGlvbnMgfSBmcm9tICcuLi9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmUgfSBmcm9tICcuLi9zdG9yZSc7XHJcblxyXG4vKipcclxuICogU3RyYXRlZ2llcyBvciByZXNwb25zaWJsZSBvZiBzeW5jaHJvbml6aW5nIGEgZmVhdHVyZSBzdG9yZSBhbmQgYSBsYXllci5cclxuICogQSBzdHJhdGVneSBjYW4gYmUgc2hhcmVkIGFtb25nIG11bHRpcGxlIHN0b3Jlcy4gU2hhcmluZyBhIHN0cmF0ZWd5XHJcbiAqIGlzIGEgZ29vZCBpZGVhIHdoZW4gbXVsdGlwbGUgc3RyYXRlZ2llcyB3b3VsZCBoYXZlIG9uIGNhbmNlbGxpbmcgZWZmZWN0XHJcbiAqIG9uIGVhY2ggb3RoZXIuXHJcbiAqXHJcbiAqIEF0IGNyZWF0aW9uLCBzdHJhdGVneSBpcyBpbmFjdGl2ZSBhbmQgbmVlZHMgdG8gYmUgbWFudWFsbHkgYWN0aXZhdGVkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVTdG9yZVN0cmF0ZWd5IHtcclxuXHJcbiAgLyoqXHJcbiAgICogRmVhdHVyZSBzdG9yZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBzdG9yZXM6IEZlYXR1cmVTdG9yZVtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhpcyBzdHJhdGVneSBpcyBhY3RpdmVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcHRpb25zOiBGZWF0dXJlU3RvcmVTdHJhdGVneU9wdGlvbnMgPSB7fSkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhpcyBzdHJhdGVneSBpcyBhY3RpdmVcclxuICAgKi9cclxuICBpc0FjdGl2ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuYWN0aXZlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2YXRlIHRoZSBzdHJhdGVneS4gSWYgaXQncyBhbHJlYWR5IGFjdGl2ZSwgaXQnbGwgYmUgZGVhY3RpdmF0ZWRcclxuICAgKiBhbmQgYWN0aXZhdGVkIGFnYWluLlxyXG4gICAqL1xyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZG9EZWFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLmRvQWN0aXZhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2YXRlIHRoZSBzdHJhdGVneS4gSWYgaXQncyBhbHJlYWR5IGFjdGl2ZSwgaXQnbGwgYmUgZGVhY3RpdmF0ZWRcclxuICAgKiBhbmQgYWN0aXZhdGVkIGFnYWluLlxyXG4gICAqL1xyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5kb0RlYWN0aXZhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJpbmQgdGhpcyBzdHJhdGVneSB0byBhIHN0b3JlXHJcbiAgICogQHBhcmFtIHN0b3JlIEZlYXR1cmUgc3RvcmVcclxuICAgKi9cclxuICBiaW5kU3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgaWYgKHRoaXMuc3RvcmVzLmluZGV4T2Yoc3RvcmUpIDwgMCkge1xyXG4gICAgICB0aGlzLnN0b3Jlcy5wdXNoKHN0b3JlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuYmluZCB0aGlzIHN0cmF0ZWd5IGZyb20gc3RvcmVcclxuICAgKiBAcGFyYW0gc3RvcmUgRmVhdHVyZSBzdG9yZVxyXG4gICAqL1xyXG4gIHVuYmluZFN0b3JlKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zdG9yZXMuaW5kZXhPZihzdG9yZSk7XHJcbiAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICB0aGlzLnN0b3Jlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRG8gdGhlIHN0YXRhZWd5IGFjdGl2YXRpb25cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9BY3RpdmF0ZSgpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIERvIHRoZSBzdHJhdGVneSBkZWFjdGl2YXRpb25cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZG9EZWFjdGl2YXRlKCkge31cclxuXHJcbn1cclxuIl19