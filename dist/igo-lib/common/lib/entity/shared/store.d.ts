import { BehaviorSubject } from 'rxjs';
import { EntityStateManager } from './state';
import { EntityView } from './view';
import { EntityKey, EntityState, EntityRecord, EntityStoreOptions } from './entity.interfaces';
/**
 * An entity store class holds any number of entities
 * as well as their state. It can be observed, filtered and sorted and
 * provides methods to insert, update or delete entities.
 */
export declare class EntityStore<E extends object, S extends EntityState = EntityState> {
    /**
     * Observable of the raw entities
     */
    readonly entities$: BehaviorSubject<E[]>;
    /**
     * Number of entities
     */
    readonly count$: BehaviorSubject<number>;
    readonly count: number;
    /**
     * Whether the store is empty
     */
    readonly empty$: BehaviorSubject<boolean>;
    readonly empty: boolean;
    /**
     * Entity store state
     */
    readonly state: EntityStateManager<E, S>;
    /**
     * View of all the entities
     */
    readonly view: EntityView<E>;
    /**
     * View of all the entities and their state
     */
    readonly stateView: EntityView<E, EntityRecord<E, S>>;
    /**
     * Method to get an entity's id
     */
    readonly getKey: (E: any) => EntityKey;
    /**
     * Method to get an entity's named property
     */
    readonly getProperty: (E: any, prop: string) => any;
    /**
     * Store index
     */
    readonly index: Map<EntityKey, E>;
    private _index;
    /**
     * Store index
     */
    readonly pristine: boolean;
    private _pristine;
    constructor(entities: E[], options?: EntityStoreOptions);
    /**
     * Get an entity from the store by key
     * @param key Key
     * @returns Entity
     */
    get(key: EntityKey): E;
    /**
     * Get all entities in the store
     * @returns Array of entities
     */
    all(): E[];
    /**
     * Set this store's entities
     * @param entities Entities
     */
    load(entities: E[], pristine?: boolean): void;
    /**
     * Clear the store's entities but keep the state and views intact.
     * Views won't return any data but future data will be subject to the
     * current views filter and sort
     */
    softClear(): void;
    /**
     * Clear the store's entities, state and views
     */
    clear(): void;
    destroy(): void;
    /**
     * Insert an entity into the store
     * @param entity Entity
     */
    insert(entity: E): void;
    /**
     * Insert many entities into the store
     * @param entities Entities
     */
    insertMany(entities: E[]): void;
    /**
     * Update or insert an entity into the store
     * @param entity Entity
     */
    update(entity: E): void;
    /**
     * Update or insert many entities into the store
     * @param entities Entities
     */
    updateMany(entities: E[]): void;
    /**
     * Delete an entity from the store
     * @param entity Entity
     */
    delete(entity: E): void;
    /**
     * Delete many entities from the store
     * @param entities Entities
     */
    deleteMany(entities: E[]): void;
    /**
     * Generate a complete index of all the entities
     * @param entities Entities
     * @returns Index
     */
    private generateIndex;
    /**
     * Push the index's entities into the entities$ observable
     */
    private next;
    /**
     * Update the store's count and empty
     */
    private updateCount;
}
