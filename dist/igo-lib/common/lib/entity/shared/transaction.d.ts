import { Observable } from 'rxjs';
import { EntityKey, EntityTransactionOptions, EntityOperation, EntityOperationState } from './entity.interfaces';
import { EntityStore } from './store';
export declare type EntityTransactionCommitHandler = (transaction: EntityTransaction, operations: EntityOperation[]) => Observable<any>;
/**
 * This class holds a reference to the insert, update and delete
 * operations performed on a store. This is useful to commit
 * these operations in a single pass or to cancel them.
 */
export declare class EntityTransaction {
    /**
     * Store holding the operations on another store
     */
    readonly operations: EntityStore<EntityOperation, EntityOperationState>;
    /**
     * Method to get an entity's id
     */
    readonly getKey: (E: any) => EntityKey;
    /**
     * Whether there are pending operations
     */
    readonly empty: boolean;
    /**
     * Whether thise store is in commit phase
     */
    readonly inCommitPhase: boolean;
    private _inCommitPhase;
    constructor(options?: EntityTransactionOptions);
    destroy(): void;
    /**
     * Insert an entity into a store. If no store is specified, an insert
     * operation is still created but the transaction won't add the new
     * entity to the store.
     * @param current The entity to insert
     * @param store Optional: The store to insert the entity into
     * @param meta Optional: Any metadata on the operation
     */
    insert(current: object, store?: EntityStore<object>, meta?: {
        [key: string]: any;
    }): void;
    /**
     * Update an entity in a store. If no store is specified, an update
     * operation is still created but the transaction won't update the
     * entity into the store.
     * @param previous The entity before update
     * @param current The entity after update
     * @param store Optional: The store to update the entity into
     * @param meta Optional: Any metadata on the operation
     */
    update(previous: object, current: object, store?: EntityStore<object>, meta?: {
        [key: string]: any;
    }): void;
    /**
     * Delete an entity from a store. If no store is specified, a delete
     * operation is still created but the transaction won't remove the
     * entity from the store.
     * @param previous The entity before delete
     * @param store Optional: The store to delete the entity from
     * @param meta Optional: Any metadata on the operation
     */
    delete(previous: object, store?: EntityStore<object>, meta?: {
        [key: string]: any;
    }): void;
    /**
     * Commit operations the transaction. This method doesn't do much
     * in itself. The handler it receives does the hard work and it's
     * implementation is left to the caller. This method simply wraps
     * the handler into an error catching mechanism to update
     * the transaction afterward. The caller needs to subscribe to this
     * method's output (observable) for the commit to be performed.
     * @param operations Operations to commit
     * @param handler Function that handles the commit operation
     * @returns The handler output (observable)
     */
    commit(operations: EntityOperation[], handler: EntityTransactionCommitHandler): Observable<any>;
    /**
     * Commit all the operations of the transaction.
     * @param handler Function that handles the commit operation
     * @returns The handler output (observable)
     */
    commitAll(handler: EntityTransactionCommitHandler): Observable<any>;
    /**
     * Rollback this transaction
     */
    rollback(): void;
    /**
     * Rollback specific operations
     */
    rollbackOperations(operations: EntityOperation[]): void;
    /**
     * Clear this transaction
     * @todo Raise event and synchronize stores?
     */
    clear(): void;
    /**
     * Merge another transaction in this one
     * @param transaction Another transaction
     */
    mergeTransaction(transaction: EntityTransaction): void;
    /**
     * Create an insert operation and add an entity to the store
     * @param current The entity to insert
     * @param store Optional: The store to insert the entity into
     * @param meta Optional: Any metadata on the operation
     */
    private doInsert;
    /**
     * Create an update operation and update an entity into the store
     * @param previous The entity before update
     * @param current The entity after update
     * @param store Optional: The store to update the entity into
     * @param meta Optional: Any metadata on the operation
     */
    private doUpdate;
    /**
     * Create a delete operation and delete an entity from the store
     * @param previous The entity before delete
     * @param store Optional: The store to delete the entity from
     * @param meta Optional: Any metadata on the operation
     */
    private doDelete;
    /**
     * Remove committed operations from store
     * @param operations Commited operations
     * @todo Raise event and synchronize stores?
     */
    private resolveOperations;
    /**
     * On commit success, resolve commited operations and exit commit phase
     * @param operations Commited operations
     */
    private onCommitSuccess;
    /**
     * On commit error, abort transaction
     * @param operations Commited operations
     */
    private onCommitError;
    /**
     * Add an operation to the operations store
     * @param operation Operation to add
     */
    private addOperation;
    /**
     * Remove an operation from the operations store
     * @param operation Operation to remove
     */
    private removeOperation;
    /**
     * Get the any existing operation an entity
     * @param entity Entity
     * @returns Either an insert, update or delete operation
     */
    private getOperationByEntity;
    /**
     * Get all the operations to commit
     * @returns Operations to commit
     */
    private getOperationsInCommit;
    /**
     * Check if the transaction is in the commit phase and throw an error if it is
     */
    private checkInCommitPhase;
}
