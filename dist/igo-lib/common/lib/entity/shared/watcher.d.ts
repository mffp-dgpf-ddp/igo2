import { ChangeDetectorRef } from '@angular/core';
import { EntityStore } from './store';
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
 */
export declare class EntityStoreWatcher<E extends object> {
    /**
     * Component change detector
     */
    private cdRef;
    /**
     * Entity store
     */
    private store;
    /**
     * Component inner state
     */
    private innerStateIndex;
    /**
     * Subscription to the store's entities
     */
    private entities$$;
    /**
     * Subscription to the store's state
     */
    private state$$;
    constructor(store?: EntityStore<E>, cdRef?: ChangeDetectorRef);
    destroy(): void;
    /**
     * Bind this workspace to a store and start watching for changes
     * @param store Entity store
     */
    setStore(store?: EntityStore<E>): void;
    /**
     * Bind this workspace to a component's change detector
     * @param cdRef Change detector
     */
    setChangeDetector(cdRef?: ChangeDetectorRef): void;
    /**
     * Set up observers on a store's entities and their state
     * @param store Entity store
     */
    private setupObservers;
    /**
     * Teardown store observers
     */
    private teardownObservers;
    /**
     * When the entities change, always trigger the changes detection
     */
    private onEntitiesChange;
    /**
     * When the entities state change, trigger the change detection
     * only if the component has not handled these changes yet. For example,
     * the component might have initiated thoses changes itself.
     */
    private onStateChange;
    /**
     * Trigger the change detection of the workspace is bound to a change detector
     */
    private detectChanges;
}
