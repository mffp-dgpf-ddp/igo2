import { ReplaySubject } from 'rxjs';
import { EntityKey, EntityState, EntityStateManagerOptions } from './entity.interfaces';
/**
 * This class is used to track a store's entities state
 */
export declare class EntityStateManager<E extends object, S extends EntityState = EntityState> {
    /**
     * State index
     */
    readonly index: Map<string | number, S>;
    /**
     * Change emitter
     */
    readonly change$: ReplaySubject<void>;
    /**
     * Method to get an entity's id
     */
    readonly getKey: (E: any) => EntityKey;
    private store;
    constructor(options?: EntityStateManagerOptions);
    /**
     * Clear state
     */
    clear(): void;
    /**
     * Get an entity's state
     * @param entity Entity
     * @returns State
     */
    get(entity: E): S;
    /**
     * Set an entity's state
     * @param entity Entity
     * @param state State
     */
    set(entity: E, state: S): void;
    /**
     * Set many entitie's state
     * @param entitie Entities
     * @param state State
     */
    setMany(entities: E[], state: S): void;
    /**
     * Set state of all entities that already have a state. This is not
     * the same as setting the state of all the store's entities.
     * @param state State
     */
    setAll(state: S): void;
    /**
     * Update an entity's state
     * @param entity Entity
     * @param changes State changes
     */
    update(entity: E, changes: Partial<S>, exclusive?: boolean): void;
    /**
     * Update many entitie's state
     * @param entitie Entities
     * @param changes State changes
     */
    updateMany(entities: E[], changes: Partial<S>, exclusive?: boolean): void;
    /**
     * Reversee an entity's state
     * @param entity Entity
     * @param keys State keys to reverse
     */
    reverse(entity: E, keys: string[]): void;
    /**
     * Reverse many entitie's state
     * @param entitie Entities
     * @param keys State keys to reverse
     */
    reverseMany(entities: E[], keys: string[]): void;
    /**
     * Update state of all entities that already have a state. This is not
     * the same as updating the state of all the store's entities.
     * @param changes State
     */
    updateAll(changes: Partial<S>): void;
    /**
     * When some state changes are flagged as 'exclusive', reverse
     * the state of all other entities. Changes are reversable when
     * they are boolean.
     * @param entitie Entities
     * @param changes State changes
     */
    private updateManyExclusive;
    /**
     * Compute a 'reversed' version of some state changes.
     * Changes are reversable when they are boolean.
     * @param changes State changes
     * @returns Reversed state changes
     */
    private reverseChanges;
    /**
     * Return all the keys in that state and in the store it's bound to, if any.
     * @returns Set of keys
     */
    private getAllKeys;
    /**
     * Emit 'change' event
     */
    private next;
}
