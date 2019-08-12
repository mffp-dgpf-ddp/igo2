/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ReplaySubject } from 'rxjs';
import { getEntityId } from './entity.utils';
/**
 * This class is used to track a store's entities state
 * @template E, S
 */
export class EntityStateManager {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
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
     * @return {?}
     */
    clear() {
        if (this.index.size > 0) {
            this.index.clear();
            this.next();
        }
    }
    /**
     * Get an entity's state
     * @param {?} entity Entity
     * @return {?} State
     */
    get(entity) {
        return (/** @type {?} */ ((this.index.get(this.getKey(entity)) || {})));
    }
    /**
     * Set an entity's state
     * @param {?} entity Entity
     * @param {?} state State
     * @return {?}
     */
    set(entity, state) {
        this.setMany([entity], state);
    }
    /**
     * Set many entitie's state
     * @param {?} entities
     * @param {?} state State
     * @return {?}
     */
    setMany(entities, state) {
        entities.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        (entity) => {
            this.index.set(this.getKey(entity), Object.assign({}, state));
        }));
        this.next();
    }
    /**
     * Set state of all entities that already have a state. This is not
     * the same as setting the state of all the store's entities.
     * @param {?} state State
     * @return {?}
     */
    setAll(state) {
        Array.from(this.index.keys()).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            this.index.set(key, Object.assign({}, state));
        }));
        this.next();
    }
    /**
     * Update an entity's state
     * @param {?} entity Entity
     * @param {?} changes State changes
     * @param {?=} exclusive
     * @return {?}
     */
    update(entity, changes, exclusive = false) {
        this.updateMany([entity], changes, exclusive);
    }
    /**
     * Update many entitie's state
     * @param {?} entities
     * @param {?} changes State changes
     * @param {?=} exclusive
     * @return {?}
     */
    updateMany(entities, changes, exclusive = false) {
        if (exclusive === true) {
            return this.updateManyExclusive(entities, changes);
        }
        entities.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        (entity) => {
            /** @type {?} */
            const state = Object.assign({}, this.get(entity), changes);
            this.index.set(this.getKey(entity), state);
        }));
        this.next();
    }
    /**
     * Reversee an entity's state
     * @param {?} entity Entity
     * @param {?} keys State keys to reverse
     * @return {?}
     */
    reverse(entity, keys) {
        this.reverseMany([entity], keys);
    }
    /**
     * Reverse many entitie's state
     * @param {?} entities
     * @param {?} keys State keys to reverse
     * @return {?}
     */
    reverseMany(entities, keys) {
        entities.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        (entity) => {
            /** @type {?} */
            const currentState = this.get(entity);
            /** @type {?} */
            const changes = keys.reduce((/**
             * @param {?} acc
             * @param {?} key
             * @return {?}
             */
            (acc, key) => {
                acc[key] = currentState[key] || false;
                return acc;
            }), {});
            /** @type {?} */
            const reversedChanges = this.reverseChanges(changes);
            /** @type {?} */
            const state = Object.assign({}, currentState, reversedChanges);
            this.index.set(this.getKey(entity), state);
        }));
        this.next();
    }
    /**
     * Update state of all entities that already have a state. This is not
     * the same as updating the state of all the store's entities.
     * @param {?} changes State
     * @return {?}
     */
    updateAll(changes) {
        /** @type {?} */
        const allKeys = this.getAllKeys();
        Array.from(allKeys).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            /** @type {?} */
            const state = Object.assign({}, this.index.get(key), changes);
            this.index.set(key, state);
        }));
        this.next();
    }
    /**
     * When some state changes are flagged as 'exclusive', reverse
     * the state of all other entities. Changes are reversable when
     * they are boolean.
     * @private
     * @param {?} entities
     * @param {?} changes State changes
     * @return {?}
     */
    updateManyExclusive(entities, changes) {
        /** @type {?} */
        const reverseChanges = this.reverseChanges(changes);
        /** @type {?} */
        const keys = entities.map((/**
         * @param {?} entity
         * @return {?}
         */
        (entity) => this.getKey(entity)));
        /** @type {?} */
        const allKeys = new Set(keys.concat(Array.from(this.getAllKeys())));
        allKeys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            /** @type {?} */
            const state = this.index.get(key) || (/** @type {?} */ ({}));
            if (keys.indexOf(key) >= 0) {
                this.index.set(key, Object.assign({}, state, changes));
            }
            else {
                this.index.set(key, Object.assign({}, state, reverseChanges));
            }
        }));
        this.next();
    }
    /**
     * Compute a 'reversed' version of some state changes.
     * Changes are reversable when they are boolean.
     * @private
     * @param {?} changes State changes
     * @return {?} Reversed state changes
     */
    reverseChanges(changes) {
        return Object.entries(changes).reduce((/**
         * @param {?} reverseChanges
         * @param {?} bunch
         * @return {?}
         */
        (reverseChanges, bunch) => {
            const [changeKey, value] = bunch;
            if (typeof value === typeof true) {
                reverseChanges[changeKey] = !value;
            }
            return reverseChanges;
        }), {});
    }
    /**
     * Return all the keys in that state and in the store it's bound to, if any.
     * @private
     * @return {?} Set of keys
     */
    getAllKeys() {
        /** @type {?} */
        const storeKeys = this.store ? Array.from(this.store.index.keys()) : [];
        return new Set(Array.from(this.index.keys()).concat(storeKeys));
    }
    /**
     * Emit 'change' event
     * @private
     * @return {?}
     */
    next() {
        this.change$.next();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZW50aXR5L3NoYXJlZC9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdyQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBTTdDLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFtQjdCLFlBQVksVUFBcUMsRUFBRTs7OztRQWQxQyxVQUFLLEdBQUcsSUFBSSxHQUFHLEVBQWdCLENBQUM7Ozs7UUFLaEMsWUFBTyxHQUFHLElBQUksYUFBYSxDQUFPLENBQUMsQ0FBQyxDQUFDO1FBVTVDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU07WUFDMUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDOzs7OztJQUtELEtBQUs7UUFDSCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7Ozs7O0lBT0QsR0FBRyxDQUFDLE1BQVM7UUFDWCxPQUFPLG1CQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMs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LE9BQU8sSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7Ozs7O0lBS08sSUFBSTtRQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQztDQUVGOzs7Ozs7SUF0TUMsbUNBQXlDOzs7OztJQUt6QyxxQ0FBOEM7Ozs7O0lBSzlDLG9DQUFrQzs7Ozs7SUFFbEMsbUNBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5S2V5LCBFbnRpdHlTdGF0ZSwgRW50aXR5U3RhdGVNYW5hZ2VyT3B0aW9ucyB9IGZyb20gJy4vZW50aXR5LmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBnZXRFbnRpdHlJZCB9IGZyb20gJy4vZW50aXR5LnV0aWxzJztcclxuaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICcuL3N0b3JlJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gdHJhY2sgYSBzdG9yZSdzIGVudGl0aWVzIHN0YXRlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW50aXR5U3RhdGVNYW5hZ2VyPEUgZXh0ZW5kcyBvYmplY3QsIFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZSA9IEVudGl0eVN0YXRlPiB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXRlIGluZGV4XHJcbiAgICovXHJcbiAgcmVhZG9ubHkgaW5kZXggPSBuZXcgTWFwPEVudGl0eUtleSwgUz4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlIGVtaXR0ZXJcclxuICAgKi9cclxuICByZWFkb25seSBjaGFuZ2UkID0gbmV3IFJlcGxheVN1YmplY3Q8dm9pZD4oMSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byBnZXQgYW4gZW50aXR5J3MgaWRcclxuICAgKi9cclxuICByZWFkb25seSBnZXRLZXk6IChFKSA9PiBFbnRpdHlLZXk7XHJcblxyXG4gIHByaXZhdGUgc3RvcmU6IEVudGl0eVN0b3JlPG9iamVjdD4gfCB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEVudGl0eVN0YXRlTWFuYWdlck9wdGlvbnMgPSB7fSkge1xyXG4gICAgdGhpcy5zdG9yZSA9IG9wdGlvbnMuc3RvcmUgPyBvcHRpb25zLnN0b3JlIDogdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5nZXRLZXkgPSBvcHRpb25zLmdldEtleVxyXG4gICAgICA/IG9wdGlvbnMuZ2V0S2V5XHJcbiAgICAgIDogKHRoaXMuc3RvcmUgPyB0aGlzLnN0b3JlLmdldEtleSA6IGdldEVudGl0eUlkKTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgc3RhdGVcclxuICAgKi9cclxuICBjbGVhcigpIHtcclxuICAgIGlmICh0aGlzLmluZGV4LnNpemUgPiAwKSB7XHJcbiAgICAgIHRoaXMuaW5kZXguY2xlYXIoKTtcclxuICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYW4gZW50aXR5J3Mgc3RhdGVcclxuICAgKiBAcGFyYW0gZW50aXR5IEVudGl0eVxyXG4gICAqIEByZXR1cm5zIFN0YXRlXHJcbiAgICovXHJcbiAgZ2V0KGVudGl0eTogRSk6IFMge1xyXG4gICAgcmV0dXJuICh0aGlzLmluZGV4LmdldCh0aGlzLmdldEtleShlbnRpdHkpKSB8fCB7fSkgYXMgUztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBhbiBlbnRpdHkncyBzdGF0ZVxyXG4gICAqIEBwYXJhbSBlbnRpdHkgRW50aXR5XHJcbiAgICogQHBhcmFtIHN0YXRlIFN0YXRlXHJcbiAgICovXHJcbiAgc2V0KGVudGl0eTogRSwgc3RhdGU6IFMpIHtcclxuICAgIHRoaXMuc2V0TWFueShbZW50aXR5XSwgc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IG1hbnkgZW50aXRpZSdzIHN0YXRlXHJcbiAgICogQHBhcmFtIGVudGl0aWUgRW50aXRpZXNcclxuICAgKiBAcGFyYW0gc3RhdGUgU3RhdGVcclxuICAgKi9cclxuICBzZXRNYW55KGVudGl0aWVzOiBFW10sIHN0YXRlOiBTKSB7XHJcbiAgICBlbnRpdGllcy5mb3JFYWNoKChlbnRpdHk6IEUpID0+IHtcclxuICAgICAgdGhpcy5pbmRleC5zZXQodGhpcy5nZXRLZXkoZW50aXR5KSwgT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgc3RhdGUgb2YgYWxsIGVudGl0aWVzIHRoYXQgYWxyZWFkeSBoYXZlIGEgc3RhdGUuIFRoaXMgaXMgbm90XHJcbiAgICogdGhlIHNhbWUgYXMgc2V0dGluZyB0aGUgc3RhdGUgb2YgYWxsIHRoZSBzdG9yZSdzIGVudGl0aWVzLlxyXG4gICAqIEBwYXJhbSBzdGF0ZSBTdGF0ZVxyXG4gICAqL1xyXG4gIHNldEFsbChzdGF0ZTogUykge1xyXG4gICAgQXJyYXkuZnJvbSh0aGlzLmluZGV4LmtleXMoKSkuZm9yRWFjaCgoa2V5OiBFbnRpdHlLZXkpID0+IHtcclxuICAgICAgdGhpcy5pbmRleC5zZXQoa2V5LCBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSkpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBhbiBlbnRpdHkncyBzdGF0ZVxyXG4gICAqIEBwYXJhbSBlbnRpdHkgRW50aXR5XHJcbiAgICogQHBhcmFtIGNoYW5nZXMgU3RhdGUgY2hhbmdlc1xyXG4gICAqL1xyXG4gIHVwZGF0ZShlbnRpdHk6IEUsIGNoYW5nZXM6IFBhcnRpYWw8Uz4sIGV4Y2x1c2l2ZSA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnVwZGF0ZU1hbnkoW2VudGl0eV0sIGNoYW5nZXMsIGV4Y2x1c2l2ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgbWFueSBlbnRpdGllJ3Mgc3RhdGVcclxuICAgKiBAcGFyYW0gZW50aXRpZSBFbnRpdGllc1xyXG4gICAqIEBwYXJhbSBjaGFuZ2VzIFN0YXRlIGNoYW5nZXNcclxuICAgKi9cclxuICB1cGRhdGVNYW55KGVudGl0aWVzOiBFW10sIGNoYW5nZXM6IFBhcnRpYWw8Uz4sIGV4Y2x1c2l2ZSA9IGZhbHNlKSB7XHJcbiAgICBpZiAoZXhjbHVzaXZlID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZU1hbnlFeGNsdXNpdmUoZW50aXRpZXMsIGNoYW5nZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGVudGl0aWVzLmZvckVhY2goKGVudGl0eTogRSkgPT4ge1xyXG4gICAgICBjb25zdCBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2V0KGVudGl0eSksIGNoYW5nZXMpO1xyXG4gICAgICB0aGlzLmluZGV4LnNldCh0aGlzLmdldEtleShlbnRpdHkpLCBzdGF0ZSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV2ZXJzZWUgYW4gZW50aXR5J3Mgc3RhdGVcclxuICAgKiBAcGFyYW0gZW50aXR5IEVudGl0eVxyXG4gICAqIEBwYXJhbSBrZXlzIFN0YXRlIGtleXMgdG8gcmV2ZXJzZVxyXG4gICAqL1xyXG4gIHJldmVyc2UoZW50aXR5OiBFLCBrZXlzOiBzdHJpbmdbXSkge1xyXG4gICAgdGhpcy5yZXZlcnNlTWFueShbZW50aXR5XSwga2V5cyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXZlcnNlIG1hbnkgZW50aXRpZSdzIHN0YXRlXHJcbiAgICogQHBhcmFtIGVudGl0aWUgRW50aXRpZXNcclxuICAgKiBAcGFyYW0ga2V5cyBTdGF0ZSBrZXlzIHRvIHJldmVyc2VcclxuICAgKi9cclxuICByZXZlcnNlTWFueShlbnRpdGllczogRVtdLCBrZXlzOiBzdHJpbmdbXSkge1xyXG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5OiBFKSA9PiB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2V0KGVudGl0eSk7XHJcbiAgICAgIGNvbnN0IGNoYW5nZXMgPSBrZXlzLnJlZHVjZSgoYWNjOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0sIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgYWNjW2tleV0gPSBjdXJyZW50U3RhdGVba2V5XSB8fCBmYWxzZTtcclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICB9LCB7fSk7XHJcbiAgICAgIGNvbnN0IHJldmVyc2VkQ2hhbmdlcyA9IHRoaXMucmV2ZXJzZUNoYW5nZXMoY2hhbmdlcyk7XHJcbiAgICAgIGNvbnN0IHN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgY3VycmVudFN0YXRlLCByZXZlcnNlZENoYW5nZXMpO1xyXG4gICAgICB0aGlzLmluZGV4LnNldCh0aGlzLmdldEtleShlbnRpdHkpLCBzdGF0ZSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHN0YXRlIG9mIGFsbCBlbnRpdGllcyB0aGF0IGFscmVhZHkgaGF2ZSBhIHN0YXRlLiBUaGlzIGlzIG5vdFxyXG4gICAqIHRoZSBzYW1lIGFzIHVwZGF0aW5nIHRoZSBzdGF0ZSBvZiBhbGwgdGhlIHN0b3JlJ3MgZW50aXRpZXMuXHJcbiAgICogQHBhcmFtIGNoYW5nZXMgU3RhdGVcclxuICAgKi9cclxuICB1cGRhdGVBbGwoY2hhbmdlczogUGFydGlhbDxTPikge1xyXG4gICAgY29uc3QgYWxsS2V5cyA9IHRoaXMuZ2V0QWxsS2V5cygpO1xyXG4gICAgQXJyYXkuZnJvbShhbGxLZXlzKS5mb3JFYWNoKChrZXk6IEVudGl0eUtleSkgPT4ge1xyXG4gICAgICBjb25zdCBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaW5kZXguZ2V0KGtleSksIGNoYW5nZXMpO1xyXG4gICAgICB0aGlzLmluZGV4LnNldChrZXksIHN0YXRlKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHNvbWUgc3RhdGUgY2hhbmdlcyBhcmUgZmxhZ2dlZCBhcyAnZXhjbHVzaXZlJywgcmV2ZXJzZVxyXG4gICAqIHRoZSBzdGF0ZSBvZiBhbGwgb3RoZXIgZW50aXRpZXMuIENoYW5nZXMgYXJlIHJldmVyc2FibGUgd2hlblxyXG4gICAqIHRoZXkgYXJlIGJvb2xlYW4uXHJcbiAgICogQHBhcmFtIGVudGl0aWUgRW50aXRpZXNcclxuICAgKiBAcGFyYW0gY2hhbmdlcyBTdGF0ZSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVNYW55RXhjbHVzaXZlKGVudGl0aWVzOiBFW10sIGNoYW5nZXM6IFBhcnRpYWw8Uz4pIHtcclxuICAgIGNvbnN0IHJldmVyc2VDaGFuZ2VzID0gdGhpcy5yZXZlcnNlQ2hhbmdlcyhjaGFuZ2VzKTtcclxuXHJcbiAgICBjb25zdCBrZXlzID0gZW50aXRpZXMubWFwKChlbnRpdHk6IEUpID0+IHRoaXMuZ2V0S2V5KGVudGl0eSkpO1xyXG4gICAgY29uc3QgYWxsS2V5cyA9IG5ldyBTZXQoa2V5cy5jb25jYXQoQXJyYXkuZnJvbSh0aGlzLmdldEFsbEtleXMoKSkpKTtcclxuICAgIGFsbEtleXMuZm9yRWFjaCgoa2V5OiBFbnRpdHlLZXkpID0+IHtcclxuICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLmluZGV4LmdldChrZXkpIHx8IHt9IGFzIFM7XHJcbiAgICAgIGlmIChrZXlzLmluZGV4T2Yoa2V5KSA+PSAwKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleC5zZXQoa2V5LCBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgY2hhbmdlcykpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaW5kZXguc2V0KGtleSwgT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHJldmVyc2VDaGFuZ2VzKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZSBhICdyZXZlcnNlZCcgdmVyc2lvbiBvZiBzb21lIHN0YXRlIGNoYW5nZXMuXHJcbiAgICogQ2hhbmdlcyBhcmUgcmV2ZXJzYWJsZSB3aGVuIHRoZXkgYXJlIGJvb2xlYW4uXHJcbiAgICogQHBhcmFtIGNoYW5nZXMgU3RhdGUgY2hhbmdlc1xyXG4gICAqIEByZXR1cm5zIFJldmVyc2VkIHN0YXRlIGNoYW5nZXNcclxuICAgKi9cclxuICBwcml2YXRlIHJldmVyc2VDaGFuZ2VzKGNoYW5nZXM6IFBhcnRpYWw8Uz4pOiBQYXJ0aWFsPFM+IHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhjaGFuZ2VzKS5yZWR1Y2UoKHJldmVyc2VDaGFuZ2VzOiBQYXJ0aWFsPFM+LCBidW5jaDogW3N0cmluZywgYW55XSkgPT4ge1xyXG4gICAgICBjb25zdCBbY2hhbmdlS2V5LCB2YWx1ZV0gPSBidW5jaDtcclxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gdHlwZW9mIHRydWUpIHtcclxuICAgICAgICByZXZlcnNlQ2hhbmdlc1tjaGFuZ2VLZXldID0gIXZhbHVlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXZlcnNlQ2hhbmdlcztcclxuICAgIH0sIHt9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBhbGwgdGhlIGtleXMgaW4gdGhhdCBzdGF0ZSBhbmQgaW4gdGhlIHN0b3JlIGl0J3MgYm91bmQgdG8sIGlmIGFueS5cclxuICAgKiBAcmV0dXJucyBTZXQgb2Yga2V5c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0QWxsS2V5cygpOiBTZXQ8RW50aXR5S2V5PiB7XHJcbiAgICBjb25zdCBzdG9yZUtleXMgPSB0aGlzLnN0b3JlID8gQXJyYXkuZnJvbSh0aGlzLnN0b3JlLmluZGV4LmtleXMoKSkgOiBbXTtcclxuICAgIHJldHVybiBuZXcgU2V0KEFycmF5LmZyb20odGhpcy5pbmRleC5rZXlzKCkpLmNvbmNhdChzdG9yZUtleXMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXQgJ2NoYW5nZScgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG5leHQoKSB7XHJcbiAgICB0aGlzLmNoYW5nZSQubmV4dCgpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19