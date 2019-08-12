/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { skip } from 'rxjs/operators';
import { ObjectUtils } from '@igo2/utils';
/**
 * This class is used to synchronize a component's changes
 * detection with an EntityStore changes. For example, it is frequent
 * to have a component subscribe to a store's selected entity and, at the same time,
 * this component provides a way to select an entity with, let's say, a click.
 *
 * This class automatically handles those case and triggers the compoent's
 * change detection when needed.
 *
 * Note: If the component observes the store's stateView, a workspace is
 * probably not required because the stateView catches any changes to the
 * entities and their state.
 * @template E
 */
var /**
 * This class is used to synchronize a component's changes
 * detection with an EntityStore changes. For example, it is frequent
 * to have a component subscribe to a store's selected entity and, at the same time,
 * this component provides a way to select an entity with, let's say, a click.
 *
 * This class automatically handles those case and triggers the compoent's
 * change detection when needed.
 *
 * Note: If the component observes the store's stateView, a workspace is
 * probably not required because the stateView catches any changes to the
 * entities and their state.
 * @template E
 */
EntityStoreWatcher = /** @class */ (function () {
    function EntityStoreWatcher(store, cdRef) {
        /**
         * Component inner state
         */
        this.innerStateIndex = new Map();
        this.setChangeDetector(cdRef);
        this.setStore(store);
    }
    /**
     * @return {?}
     */
    EntityStoreWatcher.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.setChangeDetector(undefined);
        this.setStore(undefined);
    };
    /**
     * Bind this workspace to a store and start watching for changes
     * @param store Entity store
     */
    /**
     * Bind this workspace to a store and start watching for changes
     * @param {?=} store Entity store
     * @return {?}
     */
    EntityStoreWatcher.prototype.setStore = /**
     * Bind this workspace to a store and start watching for changes
     * @param {?=} store Entity store
     * @return {?}
     */
    function (store) {
        if (store === undefined) {
            this.teardownObservers();
            this.innerStateIndex.clear();
            this.store = undefined;
            return;
        }
        this.setStore(undefined);
        this.store = store;
        this.setupObservers();
        this.detectChanges();
    };
    /**
     * Bind this workspace to a component's change detector
     * @param cdRef Change detector
     */
    /**
     * Bind this workspace to a component's change detector
     * @param {?=} cdRef Change detector
     * @return {?}
     */
    EntityStoreWatcher.prototype.setChangeDetector = /**
     * Bind this workspace to a component's change detector
     * @param {?=} cdRef Change detector
     * @return {?}
     */
    function (cdRef) {
        this.cdRef = cdRef;
    };
    /**
     * Set up observers on a store's entities and their state
     * @param store Entity store
     */
    /**
     * Set up observers on a store's entities and their state
     * @private
     * @return {?}
     */
    EntityStoreWatcher.prototype.setupObservers = /**
     * Set up observers on a store's entities and their state
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.teardownObservers();
        this.entities$$ = this.store.entities$
            .subscribe((/**
         * @param {?} entities
         * @return {?}
         */
        function (entities) { return _this.onEntitiesChange(entities); }));
        this.state$$ = this.store.state.change$
            .pipe(skip(1))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.onStateChange(); }));
    };
    /**
     * Teardown store observers
     */
    /**
     * Teardown store observers
     * @private
     * @return {?}
     */
    EntityStoreWatcher.prototype.teardownObservers = /**
     * Teardown store observers
     * @private
     * @return {?}
     */
    function () {
        if (this.entities$$ !== undefined) {
            this.entities$$.unsubscribe();
        }
        if (this.state$$ !== undefined) {
            this.state$$.unsubscribe();
        }
        this.entities$$ = undefined;
        this.state$$ = undefined;
    };
    /**
     * When the entities change, always trigger the changes detection
     */
    /**
     * When the entities change, always trigger the changes detection
     * @private
     * @param {?} entities
     * @return {?}
     */
    EntityStoreWatcher.prototype.onEntitiesChange = /**
     * When the entities change, always trigger the changes detection
     * @private
     * @param {?} entities
     * @return {?}
     */
    function (entities) {
        this.detectChanges();
    };
    /**
     * When the entities state change, trigger the change detection
     * only if the component has not handled these changes yet. For example,
     * the component might have initiated thoses changes itself.
     */
    /**
     * When the entities state change, trigger the change detection
     * only if the component has not handled these changes yet. For example,
     * the component might have initiated thoses changes itself.
     * @private
     * @return {?}
     */
    EntityStoreWatcher.prototype.onStateChange = /**
     * When the entities state change, trigger the change detection
     * only if the component has not handled these changes yet. For example,
     * the component might have initiated thoses changes itself.
     * @private
     * @return {?}
     */
    function () {
        var e_1, _a;
        /** @type {?} */
        var changesDetected = false;
        /** @type {?} */
        var storeIndex = this.store.state.index;
        /** @type {?} */
        var innerIndex = this.innerStateIndex;
        if (storeIndex.size !== innerIndex.size) {
            changesDetected = this.detectChanges();
        }
        /** @type {?} */
        var storeKeys = Array.from(storeIndex.keys());
        try {
            for (var storeKeys_1 = tslib_1.__values(storeKeys), storeKeys_1_1 = storeKeys_1.next(); !storeKeys_1_1.done; storeKeys_1_1 = storeKeys_1.next()) {
                var key = storeKeys_1_1.value;
                /** @type {?} */
                var storeValue = storeIndex.get(key);
                /** @type {?} */
                var innerValue = innerIndex.get(key);
                if (changesDetected === false) {
                    if (innerValue === undefined) {
                        changesDetected = this.detectChanges();
                    }
                    else if (!ObjectUtils.objectsAreEquivalent(storeValue, innerValue)) {
                        changesDetected = this.detectChanges();
                    }
                }
                this.innerStateIndex.set(key, Object.assign({}, storeValue));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (storeKeys_1_1 && !storeKeys_1_1.done && (_a = storeKeys_1.return)) _a.call(storeKeys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Trigger the change detection of the workspace is bound to a change detector
     */
    /**
     * Trigger the change detection of the workspace is bound to a change detector
     * @private
     * @return {?}
     */
    EntityStoreWatcher.prototype.detectChanges = /**
     * Trigger the change detection of the workspace is bound to a change detector
     * @private
     * @return {?}
     */
    function () {
        if (this.cdRef !== undefined) {
            this.cdRef.detectChanges();
        }
        return true;
    };
    return EntityStoreWatcher;
}());
/**
 * This class is used to synchronize a component's changes
 * detection with an EntityStore changes. For example, it is frequent
 * to have a component subscribe to a store's selected entity and, at the same time,
 * this component provides a way to select an entity with, let's say, a click.
 *
 * This class automatically handles those case and triggers the compoent's
 * change detection when needed.
 *
 * Note: If the component observes the store's stateView, a workspace is
 * probably not required because the stateView catches any changes to the
 * entities and their state.
 * @template E
 */
export { EntityStoreWatcher };
if (false) {
    /**
     * Component change detector
     * @type {?}
     * @private
     */
    EntityStoreWatcher.prototype.cdRef;
    /**
     * Entity store
     * @type {?}
     * @private
     */
    EntityStoreWatcher.prototype.store;
    /**
     * Component inner state
     * @type {?}
     * @private
     */
    EntityStoreWatcher.prototype.innerStateIndex;
    /**
     * Subscription to the store's entities
     * @type {?}
     * @private
     */
    EntityStoreWatcher.prototype.entities$$;
    /**
     * Subscription to the store's state
     * @type {?}
     * @private
     */
    EntityStoreWatcher.prototype.state$$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9lbnRpdHkvc2hhcmVkL3dhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBa0IxQzs7Ozs7Ozs7Ozs7Ozs7O0lBMkJFLDRCQUFZLEtBQXNCLEVBQUUsS0FBeUI7Ozs7UUFackQsb0JBQWUsR0FBRyxJQUFJLEdBQUcsRUFBbUMsQ0FBQztRQWFuRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDOzs7O0lBRUQsb0NBQU87OztJQUFQO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gscUNBQVE7Ozs7O0lBQVIsVUFBUyxLQUFzQjtRQUM3QixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUN2QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7T0FH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QUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzVCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUgseUJBQUM7QUFBRCxDQUFDLEFBM0lELElBMklDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdElDLG1DQUFpQzs7Ozs7O0lBS2pDLG1DQUE4Qjs7Ozs7O0lBSzlCLDZDQUFxRTs7Ozs7O0lBS3JFLHdDQUFpQzs7Ozs7O0lBS2pDLHFDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgc2tpcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBFbnRpdHlLZXkgfSBmcm9tICcuL2VudGl0eS5pbnRlcmZhY2VzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eVN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIHN5bmNocm9uaXplIGEgY29tcG9uZW50J3MgY2hhbmdlc1xyXG4gKiBkZXRlY3Rpb24gd2l0aCBhbiBFbnRpdHlTdG9yZSBjaGFuZ2VzLiBGb3IgZXhhbXBsZSwgaXQgaXMgZnJlcXVlbnRcclxuICogdG8gaGF2ZSBhIGNvbXBvbmVudCBzdWJzY3JpYmUgdG8gYSBzdG9yZSdzIHNlbGVjdGVkIGVudGl0eSBhbmQsIGF0IHRoZSBzYW1lIHRpbWUsXHJcbiAqIHRoaXMgY29tcG9uZW50IHByb3ZpZGVzIGEgd2F5IHRvIHNlbGVjdCBhbiBlbnRpdHkgd2l0aCwgbGV0J3Mgc2F5LCBhIGNsaWNrLlxyXG4gKlxyXG4gKiBUaGlzIGNsYXNzIGF1dG9tYXRpY2FsbHkgaGFuZGxlcyB0aG9zZSBjYXNlIGFuZCB0cmlnZ2VycyB0aGUgY29tcG9lbnQnc1xyXG4gKiBjaGFuZ2UgZGV0ZWN0aW9uIHdoZW4gbmVlZGVkLlxyXG4gKlxyXG4gKiBOb3RlOiBJZiB0aGUgY29tcG9uZW50IG9ic2VydmVzIHRoZSBzdG9yZSdzIHN0YXRlVmlldywgYSB3b3Jrc3BhY2UgaXNcclxuICogcHJvYmFibHkgbm90IHJlcXVpcmVkIGJlY2F1c2UgdGhlIHN0YXRlVmlldyBjYXRjaGVzIGFueSBjaGFuZ2VzIHRvIHRoZVxyXG4gKiBlbnRpdGllcyBhbmQgdGhlaXIgc3RhdGUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW50aXR5U3RvcmVXYXRjaGVyPEUgZXh0ZW5kcyBvYmplY3Q+IHtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcG9uZW50IGNoYW5nZSBkZXRlY3RvclxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmO1xyXG5cclxuICAvKipcclxuICAgKiBFbnRpdHkgc3RvcmVcclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JlOiBFbnRpdHlTdG9yZTxFPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcG9uZW50IGlubmVyIHN0YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpbm5lclN0YXRlSW5kZXggPSBuZXcgTWFwPEVudGl0eUtleSwge1trZXk6IHN0cmluZ106IGFueX0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc3RvcmUncyBlbnRpdGllc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZW50aXRpZXMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHN0b3JlJ3Mgc3RhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRlJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3Ioc3RvcmU/OiBFbnRpdHlTdG9yZTxFPiwgY2RSZWY/OiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgdGhpcy5zZXRDaGFuZ2VEZXRlY3RvcihjZFJlZik7XHJcbiAgICB0aGlzLnNldFN0b3JlKHN0b3JlKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnNldENoYW5nZURldGVjdG9yKHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLnNldFN0b3JlKHVuZGVmaW5lZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIHRoaXMgd29ya3NwYWNlIHRvIGEgc3RvcmUgYW5kIHN0YXJ0IHdhdGNoaW5nIGZvciBjaGFuZ2VzXHJcbiAgICogQHBhcmFtIHN0b3JlIEVudGl0eSBzdG9yZVxyXG4gICAqL1xyXG4gIHNldFN0b3JlKHN0b3JlPzogRW50aXR5U3RvcmU8RT4pIHtcclxuICAgIGlmIChzdG9yZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudGVhcmRvd25PYnNlcnZlcnMoKTtcclxuICAgICAgdGhpcy5pbm5lclN0YXRlSW5kZXguY2xlYXIoKTtcclxuICAgICAgdGhpcy5zdG9yZSA9IHVuZGVmaW5lZDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0U3RvcmUodW5kZWZpbmVkKTtcclxuICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcclxuICAgIHRoaXMuc2V0dXBPYnNlcnZlcnMoKTtcclxuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCB0aGlzIHdvcmtzcGFjZSB0byBhIGNvbXBvbmVudCdzIGNoYW5nZSBkZXRlY3RvclxyXG4gICAqIEBwYXJhbSBjZFJlZiBDaGFuZ2UgZGV0ZWN0b3JcclxuICAgKi9cclxuICBzZXRDaGFuZ2VEZXRlY3RvcihjZFJlZj86IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICB0aGlzLmNkUmVmID0gY2RSZWY7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdXAgb2JzZXJ2ZXJzIG9uIGEgc3RvcmUncyBlbnRpdGllcyBhbmQgdGhlaXIgc3RhdGVcclxuICAgKiBAcGFyYW0gc3RvcmUgRW50aXR5IHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXR1cE9ic2VydmVycygpIHtcclxuICAgIHRoaXMudGVhcmRvd25PYnNlcnZlcnMoKTtcclxuXHJcbiAgICB0aGlzLmVudGl0aWVzJCQgPSB0aGlzLnN0b3JlLmVudGl0aWVzJFxyXG4gICAgICAuc3Vic2NyaWJlKChlbnRpdGllczogRVtdKSA9PiB0aGlzLm9uRW50aXRpZXNDaGFuZ2UoZW50aXRpZXMpKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlJCQgPSB0aGlzLnN0b3JlLnN0YXRlLmNoYW5nZSRcclxuICAgICAgLnBpcGUoc2tpcCgxKSlcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uU3RhdGVDaGFuZ2UoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUZWFyZG93biBzdG9yZSBvYnNlcnZlcnNcclxuICAgKi9cclxuICBwcml2YXRlIHRlYXJkb3duT2JzZXJ2ZXJzKCkge1xyXG4gICAgaWYgKHRoaXMuZW50aXRpZXMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZW50aXRpZXMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc3RhdGUkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RhdGUkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5lbnRpdGllcyQkID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5zdGF0ZSQkID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgZW50aXRpZXMgY2hhbmdlLCBhbHdheXMgdHJpZ2dlciB0aGUgY2hhbmdlcyBkZXRlY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIG9uRW50aXRpZXNDaGFuZ2UoZW50aXRpZXM6IEVbXSkge1xyXG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBlbnRpdGllcyBzdGF0ZSBjaGFuZ2UsIHRyaWdnZXIgdGhlIGNoYW5nZSBkZXRlY3Rpb25cclxuICAgKiBvbmx5IGlmIHRoZSBjb21wb25lbnQgaGFzIG5vdCBoYW5kbGVkIHRoZXNlIGNoYW5nZXMgeWV0LiBGb3IgZXhhbXBsZSxcclxuICAgKiB0aGUgY29tcG9uZW50IG1pZ2h0IGhhdmUgaW5pdGlhdGVkIHRob3NlcyBjaGFuZ2VzIGl0c2VsZi5cclxuICAgKi9cclxuICBwcml2YXRlIG9uU3RhdGVDaGFuZ2UoKSB7XHJcbiAgICBsZXQgY2hhbmdlc0RldGVjdGVkID0gZmFsc2U7XHJcbiAgICBjb25zdCBzdG9yZUluZGV4ID0gdGhpcy5zdG9yZS5zdGF0ZS5pbmRleDtcclxuICAgIGNvbnN0IGlubmVySW5kZXggPSB0aGlzLmlubmVyU3RhdGVJbmRleDtcclxuXHJcbiAgICBpZiAoc3RvcmVJbmRleC5zaXplICE9PSBpbm5lckluZGV4LnNpemUpIHtcclxuICAgICAgY2hhbmdlc0RldGVjdGVkID0gdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RvcmVLZXlzID0gQXJyYXkuZnJvbShzdG9yZUluZGV4LmtleXMoKSk7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBzdG9yZUtleXMpIHtcclxuICAgICAgY29uc3Qgc3RvcmVWYWx1ZSA9IHN0b3JlSW5kZXguZ2V0KGtleSk7XHJcbiAgICAgIGNvbnN0IGlubmVyVmFsdWUgPSBpbm5lckluZGV4LmdldChrZXkpO1xyXG4gICAgICBpZiAoY2hhbmdlc0RldGVjdGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChpbm5lclZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGNoYW5nZXNEZXRlY3RlZCA9IHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIU9iamVjdFV0aWxzLm9iamVjdHNBcmVFcXVpdmFsZW50KHN0b3JlVmFsdWUsIGlubmVyVmFsdWUpKSB7XHJcbiAgICAgICAgICBjaGFuZ2VzRGV0ZWN0ZWQgPSB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuaW5uZXJTdGF0ZUluZGV4LnNldChrZXksIE9iamVjdC5hc3NpZ24oe30sIHN0b3JlVmFsdWUpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyaWdnZXIgdGhlIGNoYW5nZSBkZXRlY3Rpb24gb2YgdGhlIHdvcmtzcGFjZSBpcyBib3VuZCB0byBhIGNoYW5nZSBkZXRlY3RvclxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGV0ZWN0Q2hhbmdlcygpIHtcclxuICAgIGlmICh0aGlzLmNkUmVmICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==