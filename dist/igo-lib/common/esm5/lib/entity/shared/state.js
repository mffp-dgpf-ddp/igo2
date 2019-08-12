/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ReplaySubject } from 'rxjs';
import { getEntityId } from './entity.utils';
/**
 * This class is used to track a store's entities state
 * @template E, S
 */
var /**
 * This class is used to track a store's entities state
 * @template E, S
 */
EntityStateManager = /** @class */ (function () {
    function EntityStateManager(options) {
        if (options === void 0) { options = {}; }
        /**
         * State index
         */
        this.index = new Map();
        /**
         * Change emitter
         */
        this.change$ = new ReplaySubject(1);
        this.store = options.store ? options.store : undefined;
        this.getKey = options.getKey
            ? options.getKey
            : (this.store ? this.store.getKey : getEntityId);
        this.next();
    }
    /**
     * Clear state
     */
    /**
     * Clear state
     * @return {?}
     */
    EntityStateManager.prototype.clear = /**
     * Clear state
     * @return {?}
     */
    function () {
        if (this.index.size > 0) {
            this.index.clear();
            this.next();
        }
    };
    /**
     * Get an entity's state
     * @param entity Entity
     * @returns State
     */
    /**
     * Get an entity's state
     * @param {?} entity Entity
     * @return {?} State
     */
    EntityStateManager.prototype.get = /**
     * Get an entity's state
     * @param {?} entity Entity
     * @return {?} State
     */
    function (entity) {
        return (/** @type {?} */ ((this.index.get(this.getKey(entity)) || {})));
    };
    /**
     * Set an entity's state
     * @param entity Entity
     * @param state State
     */
    /**
     * Set an entity's state
     * @param {?} entity Entity
     * @param {?} state State
     * @return {?}
     */
    EntityStateManager.prototype.set = /**
     * Set an entity's state
     * @param {?} entity Entity
     * @param {?} state State
     * @return {?}
     */
    function (entity, state) {
        this.setMany([entity], state);
    };
    /**
     * Set many entitie's state
     * @param entitie Entities
     * @param state State
     */
    /**
     * Set many entitie's state
     * @param {?} entities
     * @param {?} state State
     * @return {?}
     */
    EntityStateManager.prototype.setMany = /**
     * Set many entitie's state
     * @param {?} entities
     * @param {?} state State
     * @return {?}
     */
    function (entities, state) {
        var _this = this;
        entities.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        function (entity) {
            _this.index.set(_this.getKey(entity), Object.assign({}, state));
        }));
        this.next();
    };
    /**
     * Set state of all entities that already have a state. This is not
     * the same as setting the state of all the store's entities.
     * @param state State
     */
    /**
     * Set state of all entities that already have a state. This is not
     * the same as setting the state of all the store's entities.
     * @param {?} state State
     * @return {?}
     */
    EntityStateManager.prototype.setAll = /**
     * Set state of all entities that already have a state. This is not
     * the same as setting the state of all the store's entities.
     * @param {?} state State
     * @return {?}
     */
    function (state) {
        var _this = this;
        Array.from(this.index.keys()).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            _this.index.set(key, Object.assign({}, state));
        }));
        this.next();
    };
    /**
     * Update an entity's state
     * @param entity Entity
     * @param changes State changes
     */
    /**
     * Update an entity's state
     * @param {?} entity Entity
     * @param {?} changes State changes
     * @param {?=} exclusive
     * @return {?}
     */
    EntityStateManager.prototype.update = /**
     * Update an entity's state
     * @param {?} entity Entity
     * @param {?} changes State changes
     * @param {?=} exclusive
     * @return {?}
     */
    function (entity, changes, exclusive) {
        if (exclusive === void 0) { exclusive = false; }
        this.updateMany([entity], changes, exclusive);
    };
    /**
     * Update many entitie's state
     * @param entitie Entities
     * @param changes State changes
     */
    /**
     * Update many entitie's state
     * @param {?} entities
     * @param {?} changes State changes
     * @param {?=} exclusive
     * @return {?}
     */
    EntityStateManager.prototype.updateMany = /**
     * Update many entitie's state
     * @param {?} entities
     * @param {?} changes State changes
     * @param {?=} exclusive
     * @return {?}
     */
    function (entities, changes, exclusive) {
        var _this = this;
        if (exclusive === void 0) { exclusive = false; }
        if (exclusive === true) {
            return this.updateManyExclusive(entities, changes);
        }
        entities.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        function (entity) {
            /** @type {?} */
            var state = Object.assign({}, _this.get(entity), changes);
            _this.index.set(_this.getKey(entity), state);
        }));
        this.next();
    };
    /**
     * Reversee an entity's state
     * @param entity Entity
     * @param keys State keys to reverse
     */
    /**
     * Reversee an entity's state
     * @param {?} entity Entity
     * @param {?} keys State keys to reverse
     * @return {?}
     */
    EntityStateManager.prototype.reverse = /**
     * Reversee an entity's state
     * @param {?} entity Entity
     * @param {?} keys State keys to reverse
     * @return {?}
     */
    function (entity, keys) {
        this.reverseMany([entity], keys);
    };
    /**
     * Reverse many entitie's state
     * @param entitie Entities
     * @param keys State keys to reverse
     */
    /**
     * Reverse many entitie's state
     * @param {?} entities
     * @param {?} keys State keys to reverse
     * @return {?}
     */
    EntityStateManager.prototype.reverseMany = /**
     * Reverse many entitie's state
     * @param {?} entities
     * @param {?} keys State keys to reverse
     * @return {?}
     */
    function (entities, keys) {
        var _this = this;
        entities.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        function (entity) {
            /** @type {?} */
            var currentState = _this.get(entity);
            /** @type {?} */
            var changes = keys.reduce((/**
             * @param {?} acc
             * @param {?} key
             * @return {?}
             */
            function (acc, key) {
                acc[key] = currentState[key] || false;
                return acc;
            }), {});
            /** @type {?} */
            var reversedChanges = _this.reverseChanges(changes);
            /** @type {?} */
            var state = Object.assign({}, currentState, reversedChanges);
            _this.index.set(_this.getKey(entity), state);
        }));
        this.next();
    };
    /**
     * Update state of all entities that already have a state. This is not
     * the same as updating the state of all the store's entities.
     * @param changes State
     */
    /**
     * Update state of all entities that already have a state. This is not
     * the same as updating the state of all the store's entities.
     * @param {?} changes State
     * @return {?}
     */
    EntityStateManager.prototype.updateAll = /**
     * Update state of all entities that already have a state. This is not
     * the same as updating the state of all the store's entities.
     * @param {?} changes State
     * @return {?}
     */
    function (changes) {
        var _this = this;
        /** @type {?} */
        var allKeys = this.getAllKeys();
        Array.from(allKeys).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            /** @type {?} */
            var state = Object.assign({}, _this.index.get(key), changes);
            _this.index.set(key, state);
        }));
        this.next();
    };
    /**
     * When some state changes are flagged as 'exclusive', reverse
     * the state of all other entities. Changes are reversable when
     * they are boolean.
     * @param entitie Entities
     * @param changes State changes
     */
    /**
     * When some state changes are flagged as 'exclusive', reverse
     * the state of all other entities. Changes are reversable when
     * they are boolean.
     * @private
     * @param {?} entities
     * @param {?} changes State changes
     * @return {?}
     */
    EntityStateManager.prototype.updateManyExclusive = /**
     * When some state changes are flagged as 'exclusive', reverse
     * the state of all other entities. Changes are reversable when
     * they are boolean.
     * @private
     * @param {?} entities
     * @param {?} changes State changes
     * @return {?}
     */
    function (entities, changes) {
        var _this = this;
        /** @type {?} */
        var reverseChanges = this.reverseChanges(changes);
        /** @type {?} */
        var keys = entities.map((/**
         * @param {?} entity
         * @return {?}
         */
        function (entity) { return _this.getKey(entity); }));
        /** @type {?} */
        var allKeys = new Set(keys.concat(Array.from(this.getAllKeys())));
        allKeys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            /** @type {?} */
            var state = _this.index.get(key) || (/** @type {?} */ ({}));
            if (keys.indexOf(key) >= 0) {
                _this.index.set(key, Object.assign({}, state, changes));
            }
            else {
                _this.index.set(key, Object.assign({}, state, reverseChanges));
            }
        }));
        this.next();
    };
    /**
     * Compute a 'reversed' version of some state changes.
     * Changes are reversable when they are boolean.
     * @param changes State changes
     * @returns Reversed state changes
     */
    /**
     * Compute a 'reversed' version of some state changes.
     * Changes are reversable when they are boolean.
     * @private
     * @param {?} changes State changes
     * @return {?} Reversed state changes
     */
    EntityStateManager.prototype.reverseChanges = /**
     * Compute a 'reversed' version of some state changes.
     * Changes are reversable when they are boolean.
     * @private
     * @param {?} changes State changes
     * @return {?} Reversed state changes
     */
    function (changes) {
        return Object.entries(changes).reduce((/**
         * @param {?} reverseChanges
         * @param {?} bunch
         * @return {?}
         */
        function (reverseChanges, bunch) {
            var _a = tslib_1.__read(bunch, 2), changeKey = _a[0], value = _a[1];
            if (typeof value === typeof true) {
                reverseChanges[changeKey] = !value;
            }
            return reverseChanges;
        }), {});
    };
    /**
     * Return all the keys in that state and in the store it's bound to, if any.
     * @returns Set of keys
     */
    /**
     * Return all the keys in that state and in the store it's bound to, if any.
     * @private
     * @return {?} Set of keys
     */
    EntityStateManager.prototype.getAllKeys = /**
     * Return all the keys in that state and in the store it's bound to, if any.
     * @private
     * @return {?} Set of keys
     */
    function () {
        /** @type {?} */
        var storeKeys = this.store ? Array.from(this.store.index.keys()) : [];
        return new Set(Array.from(this.index.keys()).concat(storeKeys));
    };
    /**
     * Emit 'change' event
     */
    /**
     * Emit 'change' event
     * @private
     * @return {?}
     */
    EntityStateManager.prototype.next = /**
     * Emit 'change' event
     * @private
     * @return {?}
     */
    function () {
        this.change$.next();
    };
    return EntityStateManager;
}());
/**
 * This class is used to track a store's entities state
 * @template E, S
 */
export { EntityStateManager };
if (false) {
    /**
     * State index
     * @type {?}
     */
    EntityStateManager.prototype.index;
    /**
     * Change emitter
     * @type {?}
     */
    EntityStateManager.prototype.change$;
    /**
     * Method to get an entity's id
     * @type {?}
     */
    EntityStateManager.prototype.getKey;
    /**
     * @type {?}
     * @private
     */
    EntityStateManager.prototype.store;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZW50aXR5L3NoYXJlZC9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQU03Qzs7Ozs7SUFtQkUsNEJBQVksT0FBdUM7UUFBdkMsd0JBQUEsRUFBQSxZQUF1Qzs7OztRQWQxQyxVQUFLLEdBQUcsSUFBSSxHQUFHLEVBQWdCLENBQUM7Ozs7UUFLaEMsWUFBTyxHQUFHLElBQUksYUFBYSxDQUFPLENBQUMsQ0FBQyxDQUFDO1FBVTVDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU07WUFDMUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsa0NBQUs7Ozs7SUFBTDtRQUNFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7O0lBQ0gsZ0NBQUc7Ozs7O0lBQUgsVUFBSSxNQUFTO1FBQ1gs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QUFTLEVBQUUsYUFBYztZQUNoQyxJQUFJLE9BQU8sS0FBSyxLQUFLLE9BQU8sSUFBSSxFQUFFO2dCQUNoQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7YUFDcEM7WUFDRCxPQUFPLGNBQWMsQ0FBQztRQUN4QixDQUFDLEdBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSyx1Q0FBVTs7Ozs7SUFBbEI7O1lBQ1EsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN2RSxPQUFPLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssaUNBQUk7Ozs7O0lBQVo7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFSCx5QkFBQztBQUFELENBQUMsQUEzTUQsSUEyTUM7Ozs7Ozs7Ozs7O0lBdE1DLG1DQUF5Qzs7Ozs7SUFLekMscUNBQThDOzs7OztJQUs5QyxvQ0FBa0M7Ozs7O0lBRWxDLG1DQUErQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eUtleSwgRW50aXR5U3RhdGUsIEVudGl0eVN0YXRlTWFuYWdlck9wdGlvbnMgfSBmcm9tICcuL2VudGl0eS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgZ2V0RW50aXR5SWQgfSBmcm9tICcuL2VudGl0eS51dGlscyc7XHJcbmltcG9ydCB7IEVudGl0eVN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIHRyYWNrIGEgc3RvcmUncyBlbnRpdGllcyBzdGF0ZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVudGl0eVN0YXRlTWFuYWdlcjxFIGV4dGVuZHMgb2JqZWN0LCBTIGV4dGVuZHMgRW50aXR5U3RhdGUgPSBFbnRpdHlTdGF0ZT4ge1xyXG5cclxuICAvKipcclxuICAgKiBTdGF0ZSBpbmRleFxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGluZGV4ID0gbmV3IE1hcDxFbnRpdHlLZXksIFM+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZSBlbWl0dGVyXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgY2hhbmdlJCA9IG5ldyBSZXBsYXlTdWJqZWN0PHZvaWQ+KDEpO1xyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gZ2V0IGFuIGVudGl0eSdzIGlkXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgZ2V0S2V5OiAoRSkgPT4gRW50aXR5S2V5O1xyXG5cclxuICBwcml2YXRlIHN0b3JlOiBFbnRpdHlTdG9yZTxvYmplY3Q+IHwgdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBFbnRpdHlTdGF0ZU1hbmFnZXJPcHRpb25zID0ge30pIHtcclxuICAgIHRoaXMuc3RvcmUgPSBvcHRpb25zLnN0b3JlID8gb3B0aW9ucy5zdG9yZSA6IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZ2V0S2V5ID0gb3B0aW9ucy5nZXRLZXlcclxuICAgICAgPyBvcHRpb25zLmdldEtleVxyXG4gICAgICA6ICh0aGlzLnN0b3JlID8gdGhpcy5zdG9yZS5nZXRLZXkgOiBnZXRFbnRpdHlJZCk7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHN0YXRlXHJcbiAgICovXHJcbiAgY2xlYXIoKSB7XHJcbiAgICBpZiAodGhpcy5pbmRleC5zaXplID4gMCkge1xyXG4gICAgICB0aGlzLmluZGV4LmNsZWFyKCk7XHJcbiAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFuIGVudGl0eSdzIHN0YXRlXHJcbiAgICogQHBhcmFtIGVudGl0eSBFbnRpdHlcclxuICAgKiBAcmV0dXJucyBTdGF0ZVxyXG4gICAqL1xyXG4gIGdldChlbnRpdHk6IEUpOiBTIHtcclxuICAgIHJldHVybiAodGhpcy5pbmRleC5nZXQodGhpcy5nZXRLZXkoZW50aXR5KSkgfHwge30pIGFzIFM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgYW4gZW50aXR5J3Mgc3RhdGVcclxuICAgKiBAcGFyYW0gZW50aXR5IEVudGl0eVxyXG4gICAqIEBwYXJhbSBzdGF0ZSBTdGF0ZVxyXG4gICAqL1xyXG4gIHNldChlbnRpdHk6IEUsIHN0YXRlOiBTKSB7XHJcbiAgICB0aGlzLnNldE1hbnkoW2VudGl0eV0sIHN0YXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBtYW55IGVudGl0aWUncyBzdGF0ZVxyXG4gICAqIEBwYXJhbSBlbnRpdGllIEVudGl0aWVzXHJcbiAgICogQHBhcmFtIHN0YXRlIFN0YXRlXHJcbiAgICovXHJcbiAgc2V0TWFueShlbnRpdGllczogRVtdLCBzdGF0ZTogUykge1xyXG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5OiBFKSA9PiB7XHJcbiAgICAgIHRoaXMuaW5kZXguc2V0KHRoaXMuZ2V0S2V5KGVudGl0eSksIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHN0YXRlIG9mIGFsbCBlbnRpdGllcyB0aGF0IGFscmVhZHkgaGF2ZSBhIHN0YXRlLiBUaGlzIGlzIG5vdFxyXG4gICAqIHRoZSBzYW1lIGFzIHNldHRpbmcgdGhlIHN0YXRlIG9mIGFsbCB0aGUgc3RvcmUncyBlbnRpdGllcy5cclxuICAgKiBAcGFyYW0gc3RhdGUgU3RhdGVcclxuICAgKi9cclxuICBzZXRBbGwoc3RhdGU6IFMpIHtcclxuICAgIEFycmF5LmZyb20odGhpcy5pbmRleC5rZXlzKCkpLmZvckVhY2goKGtleTogRW50aXR5S2V5KSA9PiB7XHJcbiAgICAgIHRoaXMuaW5kZXguc2V0KGtleSwgT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgYW4gZW50aXR5J3Mgc3RhdGVcclxuICAgKiBAcGFyYW0gZW50aXR5IEVudGl0eVxyXG4gICAqIEBwYXJhbSBjaGFuZ2VzIFN0YXRlIGNoYW5nZXNcclxuICAgKi9cclxuICB1cGRhdGUoZW50aXR5OiBFLCBjaGFuZ2VzOiBQYXJ0aWFsPFM+LCBleGNsdXNpdmUgPSBmYWxzZSkge1xyXG4gICAgdGhpcy51cGRhdGVNYW55KFtlbnRpdHldLCBjaGFuZ2VzLCBleGNsdXNpdmUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIG1hbnkgZW50aXRpZSdzIHN0YXRlXHJcbiAgICogQHBhcmFtIGVudGl0aWUgRW50aXRpZXNcclxuICAgKiBAcGFyYW0gY2hhbmdlcyBTdGF0ZSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgdXBkYXRlTWFueShlbnRpdGllczogRVtdLCBjaGFuZ2VzOiBQYXJ0aWFsPFM+LCBleGNsdXNpdmUgPSBmYWxzZSkge1xyXG4gICAgaWYgKGV4Y2x1c2l2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy51cGRhdGVNYW55RXhjbHVzaXZlKGVudGl0aWVzLCBjaGFuZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBlbnRpdGllcy5mb3JFYWNoKChlbnRpdHk6IEUpID0+IHtcclxuICAgICAgY29uc3Qgc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmdldChlbnRpdHkpLCBjaGFuZ2VzKTtcclxuICAgICAgdGhpcy5pbmRleC5zZXQodGhpcy5nZXRLZXkoZW50aXR5KSwgc3RhdGUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldmVyc2VlIGFuIGVudGl0eSdzIHN0YXRlXHJcbiAgICogQHBhcmFtIGVudGl0eSBFbnRpdHlcclxuICAgKiBAcGFyYW0ga2V5cyBTdGF0ZSBrZXlzIHRvIHJldmVyc2VcclxuICAgKi9cclxuICByZXZlcnNlKGVudGl0eTogRSwga2V5czogc3RyaW5nW10pIHtcclxuICAgIHRoaXMucmV2ZXJzZU1hbnkoW2VudGl0eV0sIGtleXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV2ZXJzZSBtYW55IGVudGl0aWUncyBzdGF0ZVxyXG4gICAqIEBwYXJhbSBlbnRpdGllIEVudGl0aWVzXHJcbiAgICogQHBhcmFtIGtleXMgU3RhdGUga2V5cyB0byByZXZlcnNlXHJcbiAgICovXHJcbiAgcmV2ZXJzZU1hbnkoZW50aXRpZXM6IEVbXSwga2V5czogc3RyaW5nW10pIHtcclxuICAgIGVudGl0aWVzLmZvckVhY2goKGVudGl0eTogRSkgPT4ge1xyXG4gICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB0aGlzLmdldChlbnRpdHkpO1xyXG4gICAgICBjb25zdCBjaGFuZ2VzID0ga2V5cy5yZWR1Y2UoKGFjYzoge1trZXk6IHN0cmluZ106IGJvb2xlYW59LCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIGFjY1trZXldID0gY3VycmVudFN0YXRlW2tleV0gfHwgZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgfSwge30pO1xyXG4gICAgICBjb25zdCByZXZlcnNlZENoYW5nZXMgPSB0aGlzLnJldmVyc2VDaGFuZ2VzKGNoYW5nZXMpO1xyXG4gICAgICBjb25zdCBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIGN1cnJlbnRTdGF0ZSwgcmV2ZXJzZWRDaGFuZ2VzKTtcclxuICAgICAgdGhpcy5pbmRleC5zZXQodGhpcy5nZXRLZXkoZW50aXR5KSwgc3RhdGUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBzdGF0ZSBvZiBhbGwgZW50aXRpZXMgdGhhdCBhbHJlYWR5IGhhdmUgYSBzdGF0ZS4gVGhpcyBpcyBub3RcclxuICAgKiB0aGUgc2FtZSBhcyB1cGRhdGluZyB0aGUgc3RhdGUgb2YgYWxsIHRoZSBzdG9yZSdzIGVudGl0aWVzLlxyXG4gICAqIEBwYXJhbSBjaGFuZ2VzIFN0YXRlXHJcbiAgICovXHJcbiAgdXBkYXRlQWxsKGNoYW5nZXM6IFBhcnRpYWw8Uz4pIHtcclxuICAgIGNvbnN0IGFsbEtleXMgPSB0aGlzLmdldEFsbEtleXMoKTtcclxuICAgIEFycmF5LmZyb20oYWxsS2V5cykuZm9yRWFjaCgoa2V5OiBFbnRpdHlLZXkpID0+IHtcclxuICAgICAgY29uc3Qgc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmluZGV4LmdldChrZXkpLCBjaGFuZ2VzKTtcclxuICAgICAgdGhpcy5pbmRleC5zZXQoa2V5LCBzdGF0ZSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBzb21lIHN0YXRlIGNoYW5nZXMgYXJlIGZsYWdnZWQgYXMgJ2V4Y2x1c2l2ZScsIHJldmVyc2VcclxuICAgKiB0aGUgc3RhdGUgb2YgYWxsIG90aGVyIGVudGl0aWVzLiBDaGFuZ2VzIGFyZSByZXZlcnNhYmxlIHdoZW5cclxuICAgKiB0aGV5IGFyZSBib29sZWFuLlxyXG4gICAqIEBwYXJhbSBlbnRpdGllIEVudGl0aWVzXHJcbiAgICogQHBhcmFtIGNoYW5nZXMgU3RhdGUgY2hhbmdlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlTWFueUV4Y2x1c2l2ZShlbnRpdGllczogRVtdLCBjaGFuZ2VzOiBQYXJ0aWFsPFM+KSB7XHJcbiAgICBjb25zdCByZXZlcnNlQ2hhbmdlcyA9IHRoaXMucmV2ZXJzZUNoYW5nZXMoY2hhbmdlcyk7XHJcblxyXG4gICAgY29uc3Qga2V5cyA9IGVudGl0aWVzLm1hcCgoZW50aXR5OiBFKSA9PiB0aGlzLmdldEtleShlbnRpdHkpKTtcclxuICAgIGNvbnN0IGFsbEtleXMgPSBuZXcgU2V0KGtleXMuY29uY2F0KEFycmF5LmZyb20odGhpcy5nZXRBbGxLZXlzKCkpKSk7XHJcbiAgICBhbGxLZXlzLmZvckVhY2goKGtleTogRW50aXR5S2V5KSA9PiB7XHJcbiAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5pbmRleC5nZXQoa2V5KSB8fCB7fSBhcyBTO1xyXG4gICAgICBpZiAoa2V5cy5pbmRleE9mKGtleSkgPj0gMCkge1xyXG4gICAgICAgIHRoaXMuaW5kZXguc2V0KGtleSwgT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGNoYW5nZXMpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmluZGV4LnNldChrZXksIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCByZXZlcnNlQ2hhbmdlcykpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgYSAncmV2ZXJzZWQnIHZlcnNpb24gb2Ygc29tZSBzdGF0ZSBjaGFuZ2VzLlxyXG4gICAqIENoYW5nZXMgYXJlIHJldmVyc2FibGUgd2hlbiB0aGV5IGFyZSBib29sZWFuLlxyXG4gICAqIEBwYXJhbSBjaGFuZ2VzIFN0YXRlIGNoYW5nZXNcclxuICAgKiBAcmV0dXJucyBSZXZlcnNlZCBzdGF0ZSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXZlcnNlQ2hhbmdlcyhjaGFuZ2VzOiBQYXJ0aWFsPFM+KTogUGFydGlhbDxTPiB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMoY2hhbmdlcykucmVkdWNlKChyZXZlcnNlQ2hhbmdlczogUGFydGlhbDxTPiwgYnVuY2g6IFtzdHJpbmcsIGFueV0pID0+IHtcclxuICAgICAgY29uc3QgW2NoYW5nZUtleSwgdmFsdWVdID0gYnVuY2g7XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IHR5cGVvZiB0cnVlKSB7XHJcbiAgICAgICAgcmV2ZXJzZUNoYW5nZXNbY2hhbmdlS2V5XSA9ICF2YWx1ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmV2ZXJzZUNoYW5nZXM7XHJcbiAgICB9LCB7fSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gYWxsIHRoZSBrZXlzIGluIHRoYXQgc3RhdGUgYW5kIGluIHRoZSBzdG9yZSBpdCdzIGJvdW5kIHRvLCBpZiBhbnkuXHJcbiAgICogQHJldHVybnMgU2V0IG9mIGtleXNcclxuICAgKi9cclxuICBwcml2YXRlIGdldEFsbEtleXMoKTogU2V0PEVudGl0eUtleT4ge1xyXG4gICAgY29uc3Qgc3RvcmVLZXlzID0gdGhpcy5zdG9yZSA/IEFycmF5LmZyb20odGhpcy5zdG9yZS5pbmRleC5rZXlzKCkpIDogW107XHJcbiAgICByZXR1cm4gbmV3IFNldChBcnJheS5mcm9tKHRoaXMuaW5kZXgua2V5cygpKS5jb25jYXQoc3RvcmVLZXlzKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0ICdjaGFuZ2UnIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBuZXh0KCkge1xyXG4gICAgdGhpcy5jaGFuZ2UkLm5leHQoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==