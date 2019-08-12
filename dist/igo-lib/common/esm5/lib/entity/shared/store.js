/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject } from 'rxjs';
import { EntityStateManager } from './state';
import { EntityView } from './view';
import { getEntityId, getEntityProperty } from './entity.utils';
/**
 * An entity store class holds any number of entities
 * as well as their state. It can be observed, filtered and sorted and
 * provides methods to insert, update or delete entities.
 * @template E, S
 */
var /**
 * An entity store class holds any number of entities
 * as well as their state. It can be observed, filtered and sorted and
 * provides methods to insert, update or delete entities.
 * @template E, S
 */
EntityStore = /** @class */ (function () {
    function EntityStore(entities, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        /**
         * Observable of the raw entities
         */
        this.entities$ = new BehaviorSubject([]);
        /**
         * Number of entities
         */
        this.count$ = new BehaviorSubject(0);
        /**
         * Whether the store is empty
         */
        this.empty$ = new BehaviorSubject(true);
        this._pristine = true;
        this.getKey = options.getKey ? options.getKey : getEntityId;
        this.getProperty = options.getProperty ? options.getProperty : getEntityProperty;
        this.state = new EntityStateManager({ store: this });
        this.view = new EntityView(this.entities$);
        this.stateView = new EntityView(this.view.all$()).join({
            source: this.state.change$,
            reduce: (/**
             * @param {?} entity
             * @return {?}
             */
            function (entity) {
                return { entity: entity, state: _this.state.get(entity) };
            })
        });
        this.view.lift();
        this.stateView.lift();
        if (entities.length > 0) {
            this.load(entities);
        }
        else {
            this._index = this.generateIndex(entities);
        }
    }
    Object.defineProperty(EntityStore.prototype, "count", {
        get: /**
         * @return {?}
         */
        function () { return this.count$.value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityStore.prototype, "empty", {
        get: /**
         * @return {?}
         */
        function () { return this.empty$.value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityStore.prototype, "index", {
        /**
         * Store index
         */
        get: /**
         * Store index
         * @return {?}
         */
        function () { return this._index; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityStore.prototype, "pristine", {
        /**
         * Store index
         */
        get: /**
         * Store index
         * @return {?}
         */
        function () { return this._pristine; },
        enumerable: true,
        configurable: true
    });
    /**
     * Get an entity from the store by key
     * @param key Key
     * @returns Entity
     */
    /**
     * Get an entity from the store by key
     * @param {?} key Key
     * @return {?} Entity
     */
    EntityStore.prototype.get = /**
     * Get an entity from the store by key
     * @param {?} key Key
     * @return {?} Entity
     */
    function (key) {
        return this.index.get(key);
    };
    /**
     * Get all entities in the store
     * @returns Array of entities
     */
    /**
     * Get all entities in the store
     * @return {?} Array of entities
     */
    EntityStore.prototype.all = /**
     * Get all entities in the store
     * @return {?} Array of entities
     */
    function () {
        return this.entities$.value;
    };
    /**
     * Set this store's entities
     * @param entities Entities
     */
    /**
     * Set this store's entities
     * @param {?} entities Entities
     * @param {?=} pristine
     * @return {?}
     */
    EntityStore.prototype.load = /**
     * Set this store's entities
     * @param {?} entities Entities
     * @param {?=} pristine
     * @return {?}
     */
    function (entities, pristine) {
        if (pristine === void 0) { pristine = true; }
        this._index = this.generateIndex(entities);
        this._pristine = pristine;
        this.next();
    };
    /**
     * Clear the store's entities but keep the state and views intact.
     * Views won't return any data but future data will be subject to the
     * current views filter and sort
     */
    /**
     * Clear the store's entities but keep the state and views intact.
     * Views won't return any data but future data will be subject to the
     * current views filter and sort
     * @return {?}
     */
    EntityStore.prototype.softClear = /**
     * Clear the store's entities but keep the state and views intact.
     * Views won't return any data but future data will be subject to the
     * current views filter and sort
     * @return {?}
     */
    function () {
        if (this.index && this.index.size > 0) {
            this.index.clear();
            this._pristine = true;
            this.next();
        }
        else if (this.index) {
            this.updateCount();
        }
    };
    /**
     * Clear the store's entities, state and views
     */
    /**
     * Clear the store's entities, state and views
     * @return {?}
     */
    EntityStore.prototype.clear = /**
     * Clear the store's entities, state and views
     * @return {?}
     */
    function () {
        this.stateView.clear();
        this.view.clear();
        this.state.clear();
        this.softClear();
    };
    /**
     * @return {?}
     */
    EntityStore.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.stateView.destroy();
        this.view.destroy();
        this.clear();
    };
    /**
     * Insert an entity into the store
     * @param entity Entity
     */
    /**
     * Insert an entity into the store
     * @param {?} entity Entity
     * @return {?}
     */
    EntityStore.prototype.insert = /**
     * Insert an entity into the store
     * @param {?} entity Entity
     * @return {?}
     */
    function (entity) {
        this.insertMany([entity]);
    };
    /**
     * Insert many entities into the store
     * @param entities Entities
     */
    /**
     * Insert many entities into the store
     * @param {?} entities Entities
     * @return {?}
     */
    EntityStore.prototype.insertMany = /**
     * Insert many entities into the store
     * @param {?} entities Entities
     * @return {?}
     */
    function (entities) {
        var _this = this;
        entities.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        function (entity) { return _this.index.set(_this.getKey(entity), entity); }));
        this._pristine = false;
        this.next();
    };
    /**
     * Update or insert an entity into the store
     * @param entity Entity
     */
    /**
     * Update or insert an entity into the store
     * @param {?} entity Entity
     * @return {?}
     */
    EntityStore.prototype.update = /**
     * Update or insert an entity into the store
     * @param {?} entity Entity
     * @return {?}
     */
    function (entity) {
        this.updateMany([entity]);
    };
    /**
     * Update or insert many entities into the store
     * @param entities Entities
     */
    /**
     * Update or insert many entities into the store
     * @param {?} entities Entities
     * @return {?}
     */
    EntityStore.prototype.updateMany = /**
     * Update or insert many entities into the store
     * @param {?} entities Entities
     * @return {?}
     */
    function (entities) {
        var _this = this;
        entities.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        function (entity) { return _this.index.set(_this.getKey(entity), entity); }));
        this._pristine = false;
        this.next();
    };
    /**
     * Delete an entity from the store
     * @param entity Entity
     */
    /**
     * Delete an entity from the store
     * @param {?} entity Entity
     * @return {?}
     */
    EntityStore.prototype.delete = /**
     * Delete an entity from the store
     * @param {?} entity Entity
     * @return {?}
     */
    function (entity) {
        this.deleteMany([entity]);
    };
    /**
     * Delete many entities from the store
     * @param entities Entities
     */
    /**
     * Delete many entities from the store
     * @param {?} entities Entities
     * @return {?}
     */
    EntityStore.prototype.deleteMany = /**
     * Delete many entities from the store
     * @param {?} entities Entities
     * @return {?}
     */
    function (entities) {
        var _this = this;
        entities.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        function (entity) { return _this.index.delete(_this.getKey(entity)); }));
        this._pristine = false;
        this.next();
    };
    /**
     * Generate a complete index of all the entities
     * @param entities Entities
     * @returns Index
     */
    /**
     * Generate a complete index of all the entities
     * @private
     * @param {?} entities Entities
     * @return {?} Index
     */
    EntityStore.prototype.generateIndex = /**
     * Generate a complete index of all the entities
     * @private
     * @param {?} entities Entities
     * @return {?} Index
     */
    function (entities) {
        var _this = this;
        /** @type {?} */
        var entries = entities.map((/**
         * @param {?} entity
         * @return {?}
         */
        function (entity) { return [_this.getKey(entity), entity]; }));
        return new Map((/** @type {?} */ (entries)));
    };
    /**
     * Push the index's entities into the entities$ observable
     */
    /**
     * Push the index's entities into the entities$ observable
     * @private
     * @return {?}
     */
    EntityStore.prototype.next = /**
     * Push the index's entities into the entities$ observable
     * @private
     * @return {?}
     */
    function () {
        this.entities$.next(Array.from(this.index.values()));
        this.updateCount();
    };
    /**
     * Update the store's count and empty
     */
    /**
     * Update the store's count and empty
     * @private
     * @return {?}
     */
    EntityStore.prototype.updateCount = /**
     * Update the store's count and empty
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var count = this.index.size;
        /** @type {?} */
        var empty = count === 0;
        this.count$.next(count);
        this.empty$.next(empty);
    };
    return EntityStore;
}());
/**
 * An entity store class holds any number of entities
 * as well as their state. It can be observed, filtered and sorted and
 * provides methods to insert, update or delete entities.
 * @template E, S
 */
export { EntityStore };
if (false) {
    /**
     * Observable of the raw entities
     * @type {?}
     */
    EntityStore.prototype.entities$;
    /**
     * Number of entities
     * @type {?}
     */
    EntityStore.prototype.count$;
    /**
     * Whether the store is empty
     * @type {?}
     */
    EntityStore.prototype.empty$;
    /**
     * Entity store state
     * @type {?}
     */
    EntityStore.prototype.state;
    /**
     * View of all the entities
     * @type {?}
     */
    EntityStore.prototype.view;
    /**
     * View of all the entities and their state
     * @type {?}
     */
    EntityStore.prototype.stateView;
    /**
     * Method to get an entity's id
     * @type {?}
     */
    EntityStore.prototype.getKey;
    /**
     * Method to get an entity's named property
     * @type {?}
     */
    EntityStore.prototype.getProperty;
    /**
     * @type {?}
     * @private
     */
    EntityStore.prototype._index;
    /**
     * @type {?}
     * @private
     */
    EntityStore.prototype._pristine;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZW50aXR5L3NoYXJlZC9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUVwQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFPaEU7Ozs7Ozs7SUF3REUscUJBQVksUUFBYSxFQUFFLE9BQWdDO1FBQWhDLHdCQUFBLEVBQUEsWUFBZ0M7UUFBM0QsaUJBcUJDOzs7O1FBeEVRLGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBTSxFQUFFLENBQUMsQ0FBQzs7OztRQUt6QyxXQUFNLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7UUFNeEMsV0FBTSxHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxDQUFDO1FBc0M3QyxjQUFTLEdBQVksSUFBSSxDQUFDO1FBR2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQzVELElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7UUFFakYsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGtCQUFrQixDQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBSSxJQUFJLENBQUMsU0FBUyxDQUFD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QUFLLENBQUMsSUFBSTs7WUFDdkIsS0FBSyxHQUFHLEtBQUssS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFSCxrQkFBQztBQUFELENBQUMsQUEzTkQsSUEyTkM7Ozs7Ozs7Ozs7Ozs7SUF0TkMsZ0NBQWtEOzs7OztJQUtsRCw2QkFBaUQ7Ozs7O0lBTWpELDZCQUFxRDs7Ozs7SUFNckQsNEJBQXlDOzs7OztJQUt6QywyQkFBNkI7Ozs7O0lBSzdCLGdDQUFzRDs7Ozs7SUFLdEQsNkJBQWtDOzs7OztJQUtsQyxrQ0FBK0M7Ozs7O0lBTS9DLDZCQUFrQzs7Ozs7SUFNbEMsZ0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdGF0ZU1hbmFnZXIgfSBmcm9tICcuL3N0YXRlJztcclxuaW1wb3J0IHsgRW50aXR5VmlldyB9IGZyb20gJy4vdmlldyc7XHJcbmltcG9ydCB7IEVudGl0eUtleSwgRW50aXR5U3RhdGUsIEVudGl0eVJlY29yZCwgRW50aXR5U3RvcmVPcHRpb25zIH0gZnJvbSAnLi9lbnRpdHkuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IGdldEVudGl0eUlkLCBnZXRFbnRpdHlQcm9wZXJ0eSB9IGZyb20gJy4vZW50aXR5LnV0aWxzJztcclxuXHJcbi8qKlxyXG4gKiBBbiBlbnRpdHkgc3RvcmUgY2xhc3MgaG9sZHMgYW55IG51bWJlciBvZiBlbnRpdGllc1xyXG4gKiBhcyB3ZWxsIGFzIHRoZWlyIHN0YXRlLiBJdCBjYW4gYmUgb2JzZXJ2ZWQsIGZpbHRlcmVkIGFuZCBzb3J0ZWQgYW5kXHJcbiAqIHByb3ZpZGVzIG1ldGhvZHMgdG8gaW5zZXJ0LCB1cGRhdGUgb3IgZGVsZXRlIGVudGl0aWVzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVudGl0eVN0b3JlPEUgZXh0ZW5kcyBvYmplY3QsIFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZSA9IEVudGl0eVN0YXRlPiB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIHJhdyBlbnRpdGllc1xyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGVudGl0aWVzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RVtdPihbXSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlciBvZiBlbnRpdGllc1xyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGNvdW50JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcclxuICBnZXQgY291bnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY291bnQkLnZhbHVlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIHN0b3JlIGlzIGVtcHR5XHJcbiAgICovXHJcbiAgcmVhZG9ubHkgZW1wdHkkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcclxuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmVtcHR5JC52YWx1ZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBFbnRpdHkgc3RvcmUgc3RhdGVcclxuICAgKi9cclxuICByZWFkb25seSBzdGF0ZTogRW50aXR5U3RhdGVNYW5hZ2VyPEUsIFM+O1xyXG5cclxuICAvKipcclxuICAgKiBWaWV3IG9mIGFsbCB0aGUgZW50aXRpZXNcclxuICAgKi9cclxuICByZWFkb25seSB2aWV3OiBFbnRpdHlWaWV3PEU+O1xyXG5cclxuICAvKipcclxuICAgKiBWaWV3IG9mIGFsbCB0aGUgZW50aXRpZXMgYW5kIHRoZWlyIHN0YXRlXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgc3RhdGVWaWV3OiBFbnRpdHlWaWV3PEUsIEVudGl0eVJlY29yZDxFLCBTPj47XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byBnZXQgYW4gZW50aXR5J3MgaWRcclxuICAgKi9cclxuICByZWFkb25seSBnZXRLZXk6IChFKSA9PiBFbnRpdHlLZXk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byBnZXQgYW4gZW50aXR5J3MgbmFtZWQgcHJvcGVydHlcclxuICAgKi9cclxuICByZWFkb25seSBnZXRQcm9wZXJ0eTogKEUsIHByb3A6IHN0cmluZykgPT4gYW55O1xyXG5cclxuICAvKipcclxuICAgKiBTdG9yZSBpbmRleFxyXG4gICAqL1xyXG4gIGdldCBpbmRleCgpOiBNYXA8RW50aXR5S2V5LCBFPiB7IHJldHVybiB0aGlzLl9pbmRleDsgfVxyXG4gIHByaXZhdGUgX2luZGV4OiBNYXA8RW50aXR5S2V5LCBFPjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcmUgaW5kZXhcclxuICAgKi9cclxuICBnZXQgcHJpc3RpbmUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9wcmlzdGluZTsgfVxyXG4gIHByaXZhdGUgX3ByaXN0aW5lOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoZW50aXRpZXM6IEVbXSwgb3B0aW9uczogRW50aXR5U3RvcmVPcHRpb25zID0ge30pIHtcclxuICAgIHRoaXMuZ2V0S2V5ID0gb3B0aW9ucy5nZXRLZXkgPyBvcHRpb25zLmdldEtleSA6IGdldEVudGl0eUlkO1xyXG4gICAgdGhpcy5nZXRQcm9wZXJ0eSA9IG9wdGlvbnMuZ2V0UHJvcGVydHkgPyBvcHRpb25zLmdldFByb3BlcnR5IDogZ2V0RW50aXR5UHJvcGVydHk7XHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IG5ldyBFbnRpdHlTdGF0ZU1hbmFnZXI8RSwgUz4oe3N0b3JlOiB0aGlzfSk7XHJcbiAgICB0aGlzLnZpZXcgPSBuZXcgRW50aXR5VmlldzxFPih0aGlzLmVudGl0aWVzJCk7XHJcbiAgICB0aGlzLnN0YXRlVmlldyA9IG5ldyBFbnRpdHlWaWV3PEUsIEVudGl0eVJlY29yZDxFLCBTPj4odGhpcy52aWV3LmFsbCQoKSkuam9pbih7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5zdGF0ZS5jaGFuZ2UkLFxyXG4gICAgICByZWR1Y2U6IChlbnRpdHk6IEUpOiBFbnRpdHlSZWNvcmQ8RSwgUz4gPT4ge1xyXG4gICAgICAgIHJldHVybiB7ZW50aXR5LCBzdGF0ZTogdGhpcy5zdGF0ZS5nZXQoZW50aXR5KX07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudmlldy5saWZ0KCk7XHJcbiAgICB0aGlzLnN0YXRlVmlldy5saWZ0KCk7XHJcblxyXG4gICAgaWYgKGVudGl0aWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5sb2FkKGVudGl0aWVzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2luZGV4ID0gdGhpcy5nZW5lcmF0ZUluZGV4KGVudGl0aWVzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhbiBlbnRpdHkgZnJvbSB0aGUgc3RvcmUgYnkga2V5XHJcbiAgICogQHBhcmFtIGtleSBLZXlcclxuICAgKiBAcmV0dXJucyBFbnRpdHlcclxuICAgKi9cclxuICBnZXQoa2V5OiBFbnRpdHlLZXkpOiBFIHtcclxuICAgIHJldHVybiB0aGlzLmluZGV4LmdldChrZXkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFsbCBlbnRpdGllcyBpbiB0aGUgc3RvcmVcclxuICAgKiBAcmV0dXJucyBBcnJheSBvZiBlbnRpdGllc1xyXG4gICAqL1xyXG4gIGFsbCgpOiBFW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuZW50aXRpZXMkLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoaXMgc3RvcmUncyBlbnRpdGllc1xyXG4gICAqIEBwYXJhbSBlbnRpdGllcyBFbnRpdGllc1xyXG4gICAqL1xyXG4gIGxvYWQoZW50aXRpZXM6IEVbXSwgcHJpc3RpbmU6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICB0aGlzLl9pbmRleCA9IHRoaXMuZ2VuZXJhdGVJbmRleChlbnRpdGllcyk7XHJcbiAgICB0aGlzLl9wcmlzdGluZSA9IHByaXN0aW5lO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgc3RvcmUncyBlbnRpdGllcyBidXQga2VlcCB0aGUgc3RhdGUgYW5kIHZpZXdzIGludGFjdC5cclxuICAgKiBWaWV3cyB3b24ndCByZXR1cm4gYW55IGRhdGEgYnV0IGZ1dHVyZSBkYXRhIHdpbGwgYmUgc3ViamVjdCB0byB0aGVcclxuICAgKiBjdXJyZW50IHZpZXdzIGZpbHRlciBhbmQgc29ydFxyXG4gICAqL1xyXG4gIHNvZnRDbGVhcigpIHtcclxuICAgIGlmICh0aGlzLmluZGV4ICYmIHRoaXMuaW5kZXguc2l6ZSA+IDApIHtcclxuICAgICAgdGhpcy5pbmRleC5jbGVhcigpO1xyXG4gICAgICB0aGlzLl9wcmlzdGluZSA9IHRydWU7XHJcbiAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmluZGV4KSB7XHJcbiAgICAgIHRoaXMudXBkYXRlQ291bnQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBzdG9yZSdzIGVudGl0aWVzLCBzdGF0ZSBhbmQgdmlld3NcclxuICAgKi9cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMuc3RhdGVWaWV3LmNsZWFyKCk7XHJcbiAgICB0aGlzLnZpZXcuY2xlYXIoKTtcclxuICAgIHRoaXMuc3RhdGUuY2xlYXIoKTtcclxuICAgIHRoaXMuc29mdENsZWFyKCk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5zdGF0ZVZpZXcuZGVzdHJveSgpO1xyXG4gICAgdGhpcy52aWV3LmRlc3Ryb3koKTtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluc2VydCBhbiBlbnRpdHkgaW50byB0aGUgc3RvcmVcclxuICAgKiBAcGFyYW0gZW50aXR5IEVudGl0eVxyXG4gICAqL1xyXG4gIGluc2VydChlbnRpdHk6IEUpIHtcclxuICAgIHRoaXMuaW5zZXJ0TWFueShbZW50aXR5XSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnNlcnQgbWFueSBlbnRpdGllcyBpbnRvIHRoZSBzdG9yZVxyXG4gICAqIEBwYXJhbSBlbnRpdGllcyBFbnRpdGllc1xyXG4gICAqL1xyXG4gIGluc2VydE1hbnkoZW50aXRpZXM6IEVbXSkge1xyXG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5OiBFKSA9PiB0aGlzLmluZGV4LnNldCh0aGlzLmdldEtleShlbnRpdHkpLCBlbnRpdHkpKTtcclxuICAgIHRoaXMuX3ByaXN0aW5lID0gZmFsc2U7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBvciBpbnNlcnQgYW4gZW50aXR5IGludG8gdGhlIHN0b3JlXHJcbiAgICogQHBhcmFtIGVudGl0eSBFbnRpdHlcclxuICAgKi9cclxuICB1cGRhdGUoZW50aXR5OiBFKSB7XHJcbiAgICB0aGlzLnVwZGF0ZU1hbnkoW2VudGl0eV0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIG9yIGluc2VydCBtYW55IGVudGl0aWVzIGludG8gdGhlIHN0b3JlXHJcbiAgICogQHBhcmFtIGVudGl0aWVzIEVudGl0aWVzXHJcbiAgICovXHJcbiAgdXBkYXRlTWFueShlbnRpdGllczogRVtdKSB7XHJcbiAgICBlbnRpdGllcy5mb3JFYWNoKChlbnRpdHk6IEUpID0+IHRoaXMuaW5kZXguc2V0KHRoaXMuZ2V0S2V5KGVudGl0eSksIGVudGl0eSkpO1xyXG4gICAgdGhpcy5fcHJpc3RpbmUgPSBmYWxzZTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVsZXRlIGFuIGVudGl0eSBmcm9tIHRoZSBzdG9yZVxyXG4gICAqIEBwYXJhbSBlbnRpdHkgRW50aXR5XHJcbiAgICovXHJcbiAgZGVsZXRlKGVudGl0eTogRSkge1xyXG4gICAgdGhpcy5kZWxldGVNYW55KFtlbnRpdHldKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlbGV0ZSBtYW55IGVudGl0aWVzIGZyb20gdGhlIHN0b3JlXHJcbiAgICogQHBhcmFtIGVudGl0aWVzIEVudGl0aWVzXHJcbiAgICovXHJcbiAgZGVsZXRlTWFueShlbnRpdGllczogRVtdKSB7XHJcbiAgICBlbnRpdGllcy5mb3JFYWNoKChlbnRpdHk6IEUpID0+IHRoaXMuaW5kZXguZGVsZXRlKHRoaXMuZ2V0S2V5KGVudGl0eSkpKTtcclxuICAgIHRoaXMuX3ByaXN0aW5lID0gZmFsc2U7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlbmVyYXRlIGEgY29tcGxldGUgaW5kZXggb2YgYWxsIHRoZSBlbnRpdGllc1xyXG4gICAqIEBwYXJhbSBlbnRpdGllcyBFbnRpdGllc1xyXG4gICAqIEByZXR1cm5zIEluZGV4XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZUluZGV4KGVudGl0aWVzOiBFW10pOiBNYXA8RW50aXR5S2V5LCBFPiB7XHJcbiAgICBjb25zdCBlbnRyaWVzID0gZW50aXRpZXMubWFwKChlbnRpdHk6IEUpID0+IFt0aGlzLmdldEtleShlbnRpdHkpLCBlbnRpdHldKTtcclxuICAgIHJldHVybiBuZXcgTWFwKGVudHJpZXMgYXMgW0VudGl0eUtleSwgRV1bXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQdXNoIHRoZSBpbmRleCdzIGVudGl0aWVzIGludG8gdGhlIGVudGl0aWVzJCBvYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBuZXh0KCkge1xyXG4gICAgdGhpcy5lbnRpdGllcyQubmV4dChBcnJheS5mcm9tKHRoaXMuaW5kZXgudmFsdWVzKCkpKTtcclxuICAgIHRoaXMudXBkYXRlQ291bnQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgc3RvcmUncyBjb3VudCBhbmQgZW1wdHlcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZUNvdW50KCkge1xyXG4gICAgY29uc3QgY291bnQgPSB0aGlzLmluZGV4LnNpemU7XHJcbiAgICBjb25zdCBlbXB0eSA9IGNvdW50ID09PSAwO1xyXG4gICAgdGhpcy5jb3VudCQubmV4dChjb3VudCk7XHJcbiAgICB0aGlzLmVtcHR5JC5uZXh0KGVtcHR5KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==