/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EntityStore } from './store';
import { EntityOperationType } from './entity.enums';
import { getEntityId } from './entity.utils';
/**
 * This class holds a reference to the insert, update and delete
 * operations performed on a store. This is useful to commit
 * these operations in a single pass or to cancel them.
 */
export class EntityTransaction {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        this._inCommitPhase = false;
        this.getKey = options.getKey ? options.getKey : getEntityId;
        this.operations = new EntityStore([], {
            getKey: (/**
             * @param {?} operation
             * @return {?}
             */
            (operation) => operation.key)
        });
    }
    /**
     * Whether there are pending operations
     * @return {?}
     */
    get empty() { return this.operations.entities$.value.length === 0; }
    /**
     * Whether thise store is in commit phase
     * @return {?}
     */
    get inCommitPhase() { return this._inCommitPhase; }
    /**
     * @return {?}
     */
    destroy() {
        this.operations.destroy();
    }
    /**
     * Insert an entity into a store. If no store is specified, an insert
     * operation is still created but the transaction won't add the new
     * entity to the store.
     * @param {?} current The entity to insert
     * @param {?=} store Optional: The store to insert the entity into
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    insert(current, store, meta) {
        /** @type {?} */
        const existingOperation = this.getOperationByEntity(current);
        if (existingOperation !== undefined) {
            this.removeOperation(existingOperation);
        }
        this.doInsert(current, store, meta);
    }
    /**
     * Update an entity in a store. If no store is specified, an update
     * operation is still created but the transaction won't update the
     * entity into the store.
     * @param {?} previous The entity before update
     * @param {?} current The entity after update
     * @param {?=} store Optional: The store to update the entity into
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    update(previous, current, store, meta) {
        /** @type {?} */
        const existingOperation = this.getOperationByEntity(current);
        if (existingOperation !== undefined) {
            this.removeOperation(existingOperation);
            if (existingOperation.type === EntityOperationType.Insert) {
                this.doInsert(current, store, meta);
                return;
            }
        }
        this.doUpdate(previous, current, store, meta);
    }
    /**
     * Delete an entity from a store. If no store is specified, a delete
     * operation is still created but the transaction won't remove the
     * entity from the store.
     * @param {?} previous The entity before delete
     * @param {?=} store Optional: The store to delete the entity from
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    delete(previous, store, meta) {
        /** @type {?} */
        const existingOperation = this.getOperationByEntity(previous);
        if (existingOperation !== undefined) {
            this.removeOperation(existingOperation);
            if (existingOperation.type === EntityOperationType.Insert) {
                if (store !== undefined) {
                    store.delete(previous);
                }
                return;
            }
        }
        this.doDelete(previous, store, meta);
    }
    /**
     * Commit operations the transaction. This method doesn't do much
     * in itself. The handler it receives does the hard work and it's
     * implementation is left to the caller. This method simply wraps
     * the handler into an error catching mechanism to update
     * the transaction afterward. The caller needs to subscribe to this
     * method's output (observable) for the commit to be performed.
     * @param {?} operations Operations to commit
     * @param {?} handler Function that handles the commit operation
     * @return {?} The handler output (observable)
     */
    commit(operations, handler) {
        this._inCommitPhase = true;
        return handler(this, operations)
            .pipe(catchError((/**
         * @return {?}
         */
        () => of(new Error()))), tap((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            if (result instanceof Error) {
                this.onCommitError(operations);
            }
            else {
                this.onCommitSuccess(operations);
            }
        })));
    }
    /**
     * Commit all the operations of the transaction.
     * @param {?} handler Function that handles the commit operation
     * @return {?} The handler output (observable)
     */
    commitAll(handler) {
        /** @type {?} */
        const operations = this.getOperationsInCommit();
        return this.commit(operations, handler);
    }
    /**
     * Rollback this transaction
     * @return {?}
     */
    rollback() {
        this.rollbackOperations(this.operations.all());
    }
    /**
     * Rollback specific operations
     * @param {?} operations
     * @return {?}
     */
    rollbackOperations(operations) {
        this.checkInCommitPhase();
        /** @type {?} */
        const operationsFactory = (/**
         * @return {?}
         */
        () => new Map([
            [EntityOperationType.Delete, []],
            [EntityOperationType.Update, []],
            [EntityOperationType.Insert, []]
        ]));
        /** @type {?} */
        const storesOperations = new Map();
        // Group operations by store and by operation type.
        // Grouping operations allows us to revert them in bacth, thus, triggering
        // observables only one per operation type.
        for (const operation of operations) {
            /** @type {?} */
            const store = operation.store;
            if (operation.store === undefined) {
                continue;
            }
            /** @type {?} */
            let storeOperations = storesOperations.get(store);
            if (storeOperations === undefined) {
                storeOperations = operationsFactory();
                storesOperations.set(store, storeOperations);
            }
            storeOperations.get(operation.type).push(operation);
        }
        Array.from(storesOperations.keys()).forEach((/**
         * @param {?} store
         * @return {?}
         */
        (store) => {
            /** @type {?} */
            const storeOperations = storesOperations.get(store);
            /** @type {?} */
            const deletes = storeOperations.get(EntityOperationType.Delete);
            store.insertMany(deletes.map((/**
             * @param {?} _delete
             * @return {?}
             */
            (_delete) => _delete.previous)));
            /** @type {?} */
            const updates = storeOperations.get(EntityOperationType.Update);
            store.updateMany(updates.map((/**
             * @param {?} _update
             * @return {?}
             */
            (_update) => _update.previous)));
            /** @type {?} */
            const inserts = storeOperations.get(EntityOperationType.Insert);
            store.deleteMany(inserts.map((/**
             * @param {?} _insert
             * @return {?}
             */
            (_insert) => _insert.current)));
        }));
        this.operations.deleteMany(operations);
        this._inCommitPhase = false;
    }
    /**
     * Clear this transaction
     * \@todo Raise event and synchronize stores?
     * @return {?}
     */
    clear() {
        this.operations.clear();
        this._inCommitPhase = false;
    }
    /**
     * Merge another transaction in this one
     * @param {?} transaction Another transaction
     * @return {?}
     */
    mergeTransaction(transaction) {
        this.checkInCommitPhase();
        /** @type {?} */
        const operations = transaction.operations.all();
        operations.forEach((/**
         * @param {?} operation
         * @return {?}
         */
        (operation) => {
            this.addOperation(operation);
        }));
    }
    /**
     * Create an insert operation and add an entity to the store
     * @private
     * @param {?} current The entity to insert
     * @param {?=} store Optional: The store to insert the entity into
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    doInsert(current, store, meta) {
        this.addOperation({
            key: this.getKey(current),
            type: EntityOperationType.Insert,
            previous: undefined,
            current,
            store,
            meta
        });
        if (store !== undefined) {
            store.insert(current);
        }
    }
    /**
     * Create an update operation and update an entity into the store
     * @private
     * @param {?} previous The entity before update
     * @param {?} current The entity after update
     * @param {?=} store Optional: The store to update the entity into
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    doUpdate(previous, current, store, meta) {
        this.addOperation({
            key: this.getKey(current),
            type: EntityOperationType.Update,
            previous,
            current,
            store,
            meta
        });
        if (store !== undefined) {
            store.update(current);
        }
    }
    /**
     * Create a delete operation and delete an entity from the store
     * @private
     * @param {?} previous The entity before delete
     * @param {?=} store Optional: The store to delete the entity from
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    doDelete(previous, store, meta) {
        this.addOperation({
            key: this.getKey(previous),
            type: EntityOperationType.Delete,
            previous,
            current: undefined,
            store,
            meta
        });
        if (store !== undefined) {
            store.delete(previous);
        }
    }
    /**
     * Remove committed operations from store
     * \@todo Raise event and synchronize stores?
     * @private
     * @param {?} operations Commited operations
     * @return {?}
     */
    resolveOperations(operations) {
        this.operations.deleteMany(operations);
    }
    /**
     * On commit success, resolve commited operations and exit commit phase
     * @private
     * @param {?} operations Commited operations
     * @return {?}
     */
    onCommitSuccess(operations) {
        this.resolveOperations(operations);
        this._inCommitPhase = false;
    }
    /**
     * On commit error, abort transaction
     * @private
     * @param {?} operations Commited operations
     * @return {?}
     */
    onCommitError(operations) {
        this._inCommitPhase = false;
    }
    /**
     * Add an operation to the operations store
     * @private
     * @param {?} operation Operation to add
     * @return {?}
     */
    addOperation(operation) {
        this.checkInCommitPhase();
        this.operations.insert(operation);
        this.operations.state.update(operation, { added: true });
    }
    /**
     * Remove an operation from the operations store
     * @private
     * @param {?} operation Operation to remove
     * @return {?}
     */
    removeOperation(operation) {
        this.checkInCommitPhase();
        this.operations.delete(operation);
        this.operations.state.update(operation, { added: false });
    }
    /**
     * Get the any existing operation an entity
     * @private
     * @param {?} entity Entity
     * @return {?} Either an insert, update or delete operation
     */
    getOperationByEntity(entity) {
        return this.operations.get(this.getKey(entity));
    }
    /**
     * Get all the operations to commit
     * @private
     * @return {?} Operations to commit
     */
    getOperationsInCommit() {
        return this.operations.stateView
            .manyBy((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            return value.state.added === true;
        }))
            .map((/**
         * @param {?} value
         * @return {?}
         */
        (value) => value.entity));
    }
    /**
     * Check if the transaction is in the commit phase and throw an error if it is
     * @private
     * @return {?}
     */
    checkInCommitPhase() {
        if (this.inCommitPhase === true) {
            throw new Error('This transaction is in the commit phase. Cannot complete this operation.');
        }
    }
}
if (false) {
    /**
     * Store holding the operations on another store
     * @type {?}
     */
    EntityTransaction.prototype.operations;
    /**
     * Method to get an entity's id
     * @type {?}
     */
    EntityTransaction.prototype.getKey;
    /**
     * @type {?}
     * @private
     */
    EntityTransaction.prototype._inCommitPhase;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZW50aXR5L3NoYXJlZC90cmFuc2FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUWpELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDdEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFZN0MsTUFBTSxPQUFPLGlCQUFpQjs7OztJQXVCNUIsWUFBWSxVQUFvQyxFQUFFO1FBRjFDLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQzVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxXQUFXLENBQXdDLEVBQUUsRUFBRTtZQUMzRSxNQUFNOzs7O1lBQUUsQ0FBQyxTQUEwQixFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFBO1NBQ3RELENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBYkQsSUFBSSxLQUFLLEtBQWMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBSzdFLElBQUksYUFBYSxLQUFjLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFVNUQsT0FBTztRQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Ozs7Ozs7OztJQVVELE1BQU0sQ0FBQyxPQUFlLEVBQUUsS0FBMkIsRUFBRSxJQUEyQjs7Y0FDeEUsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQztRQUM1RCxJQUFJLGlCQUFpQixLQUFLLFNBQVMsRUFBRTtZQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDekM7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7Ozs7Ozs7SUFXRCxNQUFNLENBQUMsUUFBZ0IsRUFBRSxPQUFlLEVBQUUsS0FBMkIsRUFBRSxJQUEyQjs7Y0FDMUYsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQztRQUM1RCxJQUFJLGlCQUFpQixLQUFLLFNBQVMsRUFBRTtZQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDeEMsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEtBQUssbUJBQW1CLENBQUMsTUFBTSxFQUFFO2dCQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3BDLE9BQU87YUFDUjtTQUNGO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7Ozs7Ozs7O0lBVUQsTUFBTSxDQUFDLFFBQWdCLEVBQUUsS0FBMkIsRUFBRSxJQUEyQjs7Y0FDekUsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztRQUM3RCxJQUFJLGlCQUFpQixLQUFLLFNBQVMsRUFBRTtZQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDeEMsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEtBQUssbUJBQW1CLENBQUMsTUFBTSxFQUFFO2dCQUN6RCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQ3ZCLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3hCO2dCQUNELE9BQU87YUFDUjtTQUNGO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7Ozs7Ozs7OztJQWFELE1BQU0sQ0FBQyxVQUE2QixFQUFFLE9BQXVDO1FBQzNFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBRTNCLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7YUFDN0IsSUFBSSxDQUNILFVBQVU7OztRQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLEVBQUMsRUFDakMsR0FBRzs7OztRQUFDLENBQUMsTUFBVyxFQUFFLEVBQUU7WUFDbEIsSUFBSSxNQUFNLFlBQVksS0FBSyxFQUFFO2dCQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbEM7UUFDSCxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQzs7Ozs7O0lBT0QsU0FBUyxDQUFDLE9BQXVDOztjQUN6QyxVQUFVLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1FBQy9DLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFLRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7Ozs7SUFLRCxrQkFBa0IsQ0FBQyxVQUE2QjtRQUM5QyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs7Y0FFcEIsaUJBQWlCOzs7UUFBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUN0QyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7WUFDaEMsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1lBQ2hDLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztTQUNqQyxDQUFDLENBQUE7O2NBQ0ksZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQUU7UUFFbEMsbURBQW1EO1FBQ25ELDBFQUEwRTtRQUMxRSwyQ0FBMkM7UUFDM0MsS0FBSyxNQUFNLFNBQVMsSUFBSSxVQUFVLEVBQUU7O2tCQUM1QixLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUs7WUFDN0IsSUFBSSxTQUFTLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFBRSxTQUFTO2FBQUU7O2dCQUU1QyxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNqRCxJQUFJLGVBQWUsS0FBSyxTQUFTLEVBQUU7Z0JBQ2pDLGVBQWUsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN0QyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2FBQzlDO1lBQ0QsZUFBZSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLEtBQTBCLEVBQUUsRUFBRTs7a0JBQ25FLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDOztrQkFFN0MsT0FBTyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDO1lBQy9ELEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUc7Ozs7WUFBQyxDQUFDLE9BQXdCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDOztrQkFFeEUsT0FBTyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDO1lBQy9ELEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUc7Ozs7WUFBQyxDQUFDLE9BQXdCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDOztrQkFFeEUsT0FBTyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDO1lBQy9ELEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUc7Ozs7WUFBQyxDQUFDLE9BQXdCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQy9FLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQzs7Ozs7O0lBTUQsS0FBSztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQzs7Ozs7O0lBTUQsZ0JBQWdCLENBQUMsV0FBOEI7UUFDN0MsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7O2NBRXBCLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUMvQyxVQUFVLENBQUMsT0FBTzs7OztRQUFDLENBQUMsU0FBMEIsRUFBRSxFQUFFO1lBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7Ozs7SUFRTyxRQUFRLENBQUMsT0FBZSxFQUFFLEtBQTJCLEVBQUUsSUFBMkI7UUFDeEYsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNoQixHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDekIsSUFBSSxFQUFFLG1CQUFtQixDQUFDLE1BQU07WUFDaEMsUUFBUSxFQUFFLFNBQVM7WUFDbkIsT0FBTztZQUNQLEtBQUs7WUFDTCxJQUFJO1NBQ0wsQ0FBQyxDQUFDO1FBRUgsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7Ozs7Ozs7O0lBU08sUUFBUSxDQUFDLFFBQWdCLEVBQUUsT0FBZSxFQUFFLEtBQTJCLEVBQUUsSUFBMkI7UUFDMUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNoQixHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDekIsSUFBSSxFQUFFLG1CQUFtQixDQUFDLE1BQU07WUFDaEMsUUFBUTtZQUNSLE9BQU87WUFDUCxLQUFLO1lBQ0wsSUFBSTtTQUNMLENBQUMsQ0FBQztRQUVILElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUN2QixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzs7Ozs7Ozs7O0lBUU8sUUFBUSxDQUFDLFFBQWdCLEVBQUUsS0FBMkIsRUFBRSxJQUEyQjtRQUN6RixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2hCLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUMxQixJQUFJLEVBQUUsbUJBQW1CLENBQUMsTUFBTTtZQUNoQyxRQUFRO1lBQ1IsT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSztZQUNMLElBQUk7U0FDTCxDQUFDLENBQUM7UUFFSCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7Ozs7Ozs7O0lBT08saUJBQWlCLENBQUMsVUFBNkI7UUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekMsQ0FBQzs7Ozs7OztJQU1PLGVBQWUsQ0FBQyxVQUE2QjtRQUNuRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQzs7Ozs7OztJQU1PLGFBQWEsQ0FBQyxVQUE2QjtRQUNqRCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDOzs7Ozs7O0lBTU8sWUFBWSxDQUFDLFNBQTBCO1FBQzdDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTFCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDOzs7Ozs7O0lBTU8sZUFBZSxDQUFDLFNBQTBCO1FBQ2hELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTFCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDOzs7Ozs7O0lBT08sb0JBQW9CLENBQUMsTUFBYztRQUN6QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7Ozs7SUFNTyxxQkFBcUI7UUFDM0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVM7YUFDN0IsTUFBTTs7OztRQUFDLENBQUMsS0FBNkQsRUFBRSxFQUFFO1lBQ3hFLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDO1FBQ3BDLENBQUMsRUFBQzthQUNELEdBQUc7Ozs7UUFBQyxDQUFDLEtBQTZELEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsQ0FBQztJQUMxRixDQUFDOzs7Ozs7SUFLTyxrQkFBa0I7UUFDeEIsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksRUFBRTtZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLDBFQUEwRSxDQUFDLENBQUM7U0FDN0Y7SUFDSCxDQUFDO0NBQ0Y7Ozs7OztJQXZWQyx1Q0FBd0U7Ozs7O0lBS3hFLG1DQUFrQzs7Ozs7SUFXbEMsMkNBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBFbnRpdHlLZXksXHJcbiAgRW50aXR5VHJhbnNhY3Rpb25PcHRpb25zLFxyXG4gIEVudGl0eU9wZXJhdGlvbixcclxuICBFbnRpdHlPcGVyYXRpb25TdGF0ZVxyXG59IGZyb20gJy4vZW50aXR5LmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xyXG5pbXBvcnQgeyBFbnRpdHlPcGVyYXRpb25UeXBlIH0gZnJvbSAnLi9lbnRpdHkuZW51bXMnO1xyXG5pbXBvcnQgeyBnZXRFbnRpdHlJZCB9IGZyb20gJy4vZW50aXR5LnV0aWxzJztcclxuXHJcbmV4cG9ydCB0eXBlIEVudGl0eVRyYW5zYWN0aW9uQ29tbWl0SGFuZGxlciA9IChcclxuICB0cmFuc2FjdGlvbjogRW50aXR5VHJhbnNhY3Rpb24sXHJcbiAgb3BlcmF0aW9uczogRW50aXR5T3BlcmF0aW9uW11cclxuKSA9PiBPYnNlcnZhYmxlPGFueT47XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBob2xkcyBhIHJlZmVyZW5jZSB0byB0aGUgaW5zZXJ0LCB1cGRhdGUgYW5kIGRlbGV0ZVxyXG4gKiBvcGVyYXRpb25zIHBlcmZvcm1lZCBvbiBhIHN0b3JlLiBUaGlzIGlzIHVzZWZ1bCB0byBjb21taXRcclxuICogdGhlc2Ugb3BlcmF0aW9ucyBpbiBhIHNpbmdsZSBwYXNzIG9yIHRvIGNhbmNlbCB0aGVtLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVudGl0eVRyYW5zYWN0aW9uIHtcclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcmUgaG9sZGluZyB0aGUgb3BlcmF0aW9ucyBvbiBhbm90aGVyIHN0b3JlXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgb3BlcmF0aW9uczogRW50aXR5U3RvcmU8RW50aXR5T3BlcmF0aW9uLCBFbnRpdHlPcGVyYXRpb25TdGF0ZT47XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byBnZXQgYW4gZW50aXR5J3MgaWRcclxuICAgKi9cclxuICByZWFkb25seSBnZXRLZXk6IChFKSA9PiBFbnRpdHlLZXk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlcmUgYXJlIHBlbmRpbmcgb3BlcmF0aW9uc1xyXG4gICAqL1xyXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMub3BlcmF0aW9ucy5lbnRpdGllcyQudmFsdWUubGVuZ3RoID09PSAwOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhpc2Ugc3RvcmUgaXMgaW4gY29tbWl0IHBoYXNlXHJcbiAgICovXHJcbiAgZ2V0IGluQ29tbWl0UGhhc2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pbkNvbW1pdFBoYXNlOyB9XHJcbiAgcHJpdmF0ZSBfaW5Db21taXRQaGFzZSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBFbnRpdHlUcmFuc2FjdGlvbk9wdGlvbnMgPSB7fSkge1xyXG4gICAgdGhpcy5nZXRLZXkgPSBvcHRpb25zLmdldEtleSA/IG9wdGlvbnMuZ2V0S2V5IDogZ2V0RW50aXR5SWQ7XHJcbiAgICB0aGlzLm9wZXJhdGlvbnMgPSBuZXcgRW50aXR5U3RvcmU8RW50aXR5T3BlcmF0aW9uLCBFbnRpdHlPcGVyYXRpb25TdGF0ZT4oW10sIHtcclxuICAgICAgZ2V0S2V5OiAob3BlcmF0aW9uOiBFbnRpdHlPcGVyYXRpb24pID0+IG9wZXJhdGlvbi5rZXlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMub3BlcmF0aW9ucy5kZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnNlcnQgYW4gZW50aXR5IGludG8gYSBzdG9yZS4gSWYgbm8gc3RvcmUgaXMgc3BlY2lmaWVkLCBhbiBpbnNlcnRcclxuICAgKiBvcGVyYXRpb24gaXMgc3RpbGwgY3JlYXRlZCBidXQgdGhlIHRyYW5zYWN0aW9uIHdvbid0IGFkZCB0aGUgbmV3XHJcbiAgICogZW50aXR5IHRvIHRoZSBzdG9yZS5cclxuICAgKiBAcGFyYW0gY3VycmVudCBUaGUgZW50aXR5IHRvIGluc2VydFxyXG4gICAqIEBwYXJhbSBzdG9yZSBPcHRpb25hbDogVGhlIHN0b3JlIHRvIGluc2VydCB0aGUgZW50aXR5IGludG9cclxuICAgKiBAcGFyYW0gbWV0YSBPcHRpb25hbDogQW55IG1ldGFkYXRhIG9uIHRoZSBvcGVyYXRpb25cclxuICAgKi9cclxuICBpbnNlcnQoY3VycmVudDogb2JqZWN0LCBzdG9yZT86IEVudGl0eVN0b3JlPG9iamVjdD4sIG1ldGE/OiB7W2tleTogc3RyaW5nXTogYW55fSkge1xyXG4gICAgY29uc3QgZXhpc3RpbmdPcGVyYXRpb24gPSB0aGlzLmdldE9wZXJhdGlvbkJ5RW50aXR5KGN1cnJlbnQpO1xyXG4gICAgaWYgKGV4aXN0aW5nT3BlcmF0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5yZW1vdmVPcGVyYXRpb24oZXhpc3RpbmdPcGVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZG9JbnNlcnQoY3VycmVudCwgc3RvcmUsIG1ldGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIGFuIGVudGl0eSBpbiBhIHN0b3JlLiBJZiBubyBzdG9yZSBpcyBzcGVjaWZpZWQsIGFuIHVwZGF0ZVxyXG4gICAqIG9wZXJhdGlvbiBpcyBzdGlsbCBjcmVhdGVkIGJ1dCB0aGUgdHJhbnNhY3Rpb24gd29uJ3QgdXBkYXRlIHRoZVxyXG4gICAqIGVudGl0eSBpbnRvIHRoZSBzdG9yZS5cclxuICAgKiBAcGFyYW0gcHJldmlvdXMgVGhlIGVudGl0eSBiZWZvcmUgdXBkYXRlXHJcbiAgICogQHBhcmFtIGN1cnJlbnQgVGhlIGVudGl0eSBhZnRlciB1cGRhdGVcclxuICAgKiBAcGFyYW0gc3RvcmUgT3B0aW9uYWw6IFRoZSBzdG9yZSB0byB1cGRhdGUgdGhlIGVudGl0eSBpbnRvXHJcbiAgICogQHBhcmFtIG1ldGEgT3B0aW9uYWw6IEFueSBtZXRhZGF0YSBvbiB0aGUgb3BlcmF0aW9uXHJcbiAgICovXHJcbiAgdXBkYXRlKHByZXZpb3VzOiBvYmplY3QsIGN1cnJlbnQ6IG9iamVjdCwgc3RvcmU/OiBFbnRpdHlTdG9yZTxvYmplY3Q+LCBtZXRhPzoge1trZXk6IHN0cmluZ106IGFueX0pIHtcclxuICAgIGNvbnN0IGV4aXN0aW5nT3BlcmF0aW9uID0gdGhpcy5nZXRPcGVyYXRpb25CeUVudGl0eShjdXJyZW50KTtcclxuICAgIGlmIChleGlzdGluZ09wZXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlT3BlcmF0aW9uKGV4aXN0aW5nT3BlcmF0aW9uKTtcclxuICAgICAgaWYgKGV4aXN0aW5nT3BlcmF0aW9uLnR5cGUgPT09IEVudGl0eU9wZXJhdGlvblR5cGUuSW5zZXJ0KSB7XHJcbiAgICAgICAgdGhpcy5kb0luc2VydChjdXJyZW50LCBzdG9yZSwgbWV0YSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kb1VwZGF0ZShwcmV2aW91cywgY3VycmVudCwgc3RvcmUsIG1ldGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVsZXRlIGFuIGVudGl0eSBmcm9tIGEgc3RvcmUuIElmIG5vIHN0b3JlIGlzIHNwZWNpZmllZCwgYSBkZWxldGVcclxuICAgKiBvcGVyYXRpb24gaXMgc3RpbGwgY3JlYXRlZCBidXQgdGhlIHRyYW5zYWN0aW9uIHdvbid0IHJlbW92ZSB0aGVcclxuICAgKiBlbnRpdHkgZnJvbSB0aGUgc3RvcmUuXHJcbiAgICogQHBhcmFtIHByZXZpb3VzIFRoZSBlbnRpdHkgYmVmb3JlIGRlbGV0ZVxyXG4gICAqIEBwYXJhbSBzdG9yZSBPcHRpb25hbDogVGhlIHN0b3JlIHRvIGRlbGV0ZSB0aGUgZW50aXR5IGZyb21cclxuICAgKiBAcGFyYW0gbWV0YSBPcHRpb25hbDogQW55IG1ldGFkYXRhIG9uIHRoZSBvcGVyYXRpb25cclxuICAgKi9cclxuICBkZWxldGUocHJldmlvdXM6IG9iamVjdCwgc3RvcmU/OiBFbnRpdHlTdG9yZTxvYmplY3Q+LCBtZXRhPzoge1trZXk6IHN0cmluZ106IGFueX0pIHtcclxuICAgIGNvbnN0IGV4aXN0aW5nT3BlcmF0aW9uID0gdGhpcy5nZXRPcGVyYXRpb25CeUVudGl0eShwcmV2aW91cyk7XHJcbiAgICBpZiAoZXhpc3RpbmdPcGVyYXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnJlbW92ZU9wZXJhdGlvbihleGlzdGluZ09wZXJhdGlvbik7XHJcbiAgICAgIGlmIChleGlzdGluZ09wZXJhdGlvbi50eXBlID09PSBFbnRpdHlPcGVyYXRpb25UeXBlLkluc2VydCkge1xyXG4gICAgICAgIGlmIChzdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBzdG9yZS5kZWxldGUocHJldmlvdXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRvRGVsZXRlKHByZXZpb3VzLCBzdG9yZSwgbWV0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21taXQgb3BlcmF0aW9ucyB0aGUgdHJhbnNhY3Rpb24uIFRoaXMgbWV0aG9kIGRvZXNuJ3QgZG8gbXVjaFxyXG4gICAqIGluIGl0c2VsZi4gVGhlIGhhbmRsZXIgaXQgcmVjZWl2ZXMgZG9lcyB0aGUgaGFyZCB3b3JrIGFuZCBpdCdzXHJcbiAgICogaW1wbGVtZW50YXRpb24gaXMgbGVmdCB0byB0aGUgY2FsbGVyLiBUaGlzIG1ldGhvZCBzaW1wbHkgd3JhcHNcclxuICAgKiB0aGUgaGFuZGxlciBpbnRvIGFuIGVycm9yIGNhdGNoaW5nIG1lY2hhbmlzbSB0byB1cGRhdGVcclxuICAgKiB0aGUgdHJhbnNhY3Rpb24gYWZ0ZXJ3YXJkLiBUaGUgY2FsbGVyIG5lZWRzIHRvIHN1YnNjcmliZSB0byB0aGlzXHJcbiAgICogbWV0aG9kJ3Mgb3V0cHV0IChvYnNlcnZhYmxlKSBmb3IgdGhlIGNvbW1pdCB0byBiZSBwZXJmb3JtZWQuXHJcbiAgICogQHBhcmFtIG9wZXJhdGlvbnMgT3BlcmF0aW9ucyB0byBjb21taXRcclxuICAgKiBAcGFyYW0gaGFuZGxlciBGdW5jdGlvbiB0aGF0IGhhbmRsZXMgdGhlIGNvbW1pdCBvcGVyYXRpb25cclxuICAgKiBAcmV0dXJucyBUaGUgaGFuZGxlciBvdXRwdXQgKG9ic2VydmFibGUpXHJcbiAgICovXHJcbiAgY29tbWl0KG9wZXJhdGlvbnM6IEVudGl0eU9wZXJhdGlvbltdLCBoYW5kbGVyOiBFbnRpdHlUcmFuc2FjdGlvbkNvbW1pdEhhbmRsZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgdGhpcy5faW5Db21taXRQaGFzZSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGhhbmRsZXIodGhpcywgb3BlcmF0aW9ucylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvZihuZXcgRXJyb3IoKSkpLFxyXG4gICAgICAgIHRhcCgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ29tbWl0RXJyb3Iob3BlcmF0aW9ucyk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ29tbWl0U3VjY2VzcyhvcGVyYXRpb25zKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tbWl0IGFsbCB0aGUgb3BlcmF0aW9ucyBvZiB0aGUgdHJhbnNhY3Rpb24uXHJcbiAgICogQHBhcmFtIGhhbmRsZXIgRnVuY3Rpb24gdGhhdCBoYW5kbGVzIHRoZSBjb21taXQgb3BlcmF0aW9uXHJcbiAgICogQHJldHVybnMgVGhlIGhhbmRsZXIgb3V0cHV0IChvYnNlcnZhYmxlKVxyXG4gICAqL1xyXG4gIGNvbW1pdEFsbChoYW5kbGVyOiBFbnRpdHlUcmFuc2FjdGlvbkNvbW1pdEhhbmRsZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3Qgb3BlcmF0aW9ucyA9IHRoaXMuZ2V0T3BlcmF0aW9uc0luQ29tbWl0KCk7XHJcbiAgICByZXR1cm4gdGhpcy5jb21taXQob3BlcmF0aW9ucywgaGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb2xsYmFjayB0aGlzIHRyYW5zYWN0aW9uXHJcbiAgICovXHJcbiAgcm9sbGJhY2soKSB7XHJcbiAgICB0aGlzLnJvbGxiYWNrT3BlcmF0aW9ucyh0aGlzLm9wZXJhdGlvbnMuYWxsKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm9sbGJhY2sgc3BlY2lmaWMgb3BlcmF0aW9uc1xyXG4gICAqL1xyXG4gIHJvbGxiYWNrT3BlcmF0aW9ucyhvcGVyYXRpb25zOiBFbnRpdHlPcGVyYXRpb25bXSkge1xyXG4gICAgdGhpcy5jaGVja0luQ29tbWl0UGhhc2UoKTtcclxuXHJcbiAgICBjb25zdCBvcGVyYXRpb25zRmFjdG9yeSA9ICgpID0+IG5ldyBNYXAoW1xyXG4gICAgICBbRW50aXR5T3BlcmF0aW9uVHlwZS5EZWxldGUsIFtdXSxcclxuICAgICAgW0VudGl0eU9wZXJhdGlvblR5cGUuVXBkYXRlLCBbXV0sXHJcbiAgICAgIFtFbnRpdHlPcGVyYXRpb25UeXBlLkluc2VydCwgW11dXHJcbiAgICBdKTtcclxuICAgIGNvbnN0IHN0b3Jlc09wZXJhdGlvbnMgPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgLy8gR3JvdXAgb3BlcmF0aW9ucyBieSBzdG9yZSBhbmQgYnkgb3BlcmF0aW9uIHR5cGUuXHJcbiAgICAvLyBHcm91cGluZyBvcGVyYXRpb25zIGFsbG93cyB1cyB0byByZXZlcnQgdGhlbSBpbiBiYWN0aCwgdGh1cywgdHJpZ2dlcmluZ1xyXG4gICAgLy8gb2JzZXJ2YWJsZXMgb25seSBvbmUgcGVyIG9wZXJhdGlvbiB0eXBlLlxyXG4gICAgZm9yIChjb25zdCBvcGVyYXRpb24gb2Ygb3BlcmF0aW9ucykge1xyXG4gICAgICBjb25zdCBzdG9yZSA9IG9wZXJhdGlvbi5zdG9yZTtcclxuICAgICAgaWYgKG9wZXJhdGlvbi5zdG9yZSA9PT0gdW5kZWZpbmVkKSB7IGNvbnRpbnVlOyB9XHJcblxyXG4gICAgICBsZXQgc3RvcmVPcGVyYXRpb25zID0gc3RvcmVzT3BlcmF0aW9ucy5nZXQoc3RvcmUpO1xyXG4gICAgICBpZiAoc3RvcmVPcGVyYXRpb25zID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzdG9yZU9wZXJhdGlvbnMgPSBvcGVyYXRpb25zRmFjdG9yeSgpO1xyXG4gICAgICAgIHN0b3Jlc09wZXJhdGlvbnMuc2V0KHN0b3JlLCBzdG9yZU9wZXJhdGlvbnMpO1xyXG4gICAgICB9XHJcbiAgICAgIHN0b3JlT3BlcmF0aW9ucy5nZXQob3BlcmF0aW9uLnR5cGUpLnB1c2gob3BlcmF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBBcnJheS5mcm9tKHN0b3Jlc09wZXJhdGlvbnMua2V5cygpKS5mb3JFYWNoKChzdG9yZTogRW50aXR5U3RvcmU8b2JqZWN0PikgPT4ge1xyXG4gICAgICBjb25zdCBzdG9yZU9wZXJhdGlvbnMgPSBzdG9yZXNPcGVyYXRpb25zLmdldChzdG9yZSk7XHJcblxyXG4gICAgICBjb25zdCBkZWxldGVzID0gc3RvcmVPcGVyYXRpb25zLmdldChFbnRpdHlPcGVyYXRpb25UeXBlLkRlbGV0ZSk7XHJcbiAgICAgIHN0b3JlLmluc2VydE1hbnkoZGVsZXRlcy5tYXAoKF9kZWxldGU6IEVudGl0eU9wZXJhdGlvbikgPT4gX2RlbGV0ZS5wcmV2aW91cykpO1xyXG5cclxuICAgICAgY29uc3QgdXBkYXRlcyA9IHN0b3JlT3BlcmF0aW9ucy5nZXQoRW50aXR5T3BlcmF0aW9uVHlwZS5VcGRhdGUpO1xyXG4gICAgICBzdG9yZS51cGRhdGVNYW55KHVwZGF0ZXMubWFwKChfdXBkYXRlOiBFbnRpdHlPcGVyYXRpb24pID0+IF91cGRhdGUucHJldmlvdXMpKTtcclxuXHJcbiAgICAgIGNvbnN0IGluc2VydHMgPSBzdG9yZU9wZXJhdGlvbnMuZ2V0KEVudGl0eU9wZXJhdGlvblR5cGUuSW5zZXJ0KTtcclxuICAgICAgc3RvcmUuZGVsZXRlTWFueShpbnNlcnRzLm1hcCgoX2luc2VydDogRW50aXR5T3BlcmF0aW9uKSA9PiBfaW5zZXJ0LmN1cnJlbnQpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub3BlcmF0aW9ucy5kZWxldGVNYW55KG9wZXJhdGlvbnMpO1xyXG4gICAgdGhpcy5faW5Db21taXRQaGFzZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhpcyB0cmFuc2FjdGlvblxyXG4gICAqIEB0b2RvIFJhaXNlIGV2ZW50IGFuZCBzeW5jaHJvbml6ZSBzdG9yZXM/XHJcbiAgICovXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLm9wZXJhdGlvbnMuY2xlYXIoKTtcclxuICAgIHRoaXMuX2luQ29tbWl0UGhhc2UgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1lcmdlIGFub3RoZXIgdHJhbnNhY3Rpb24gaW4gdGhpcyBvbmVcclxuICAgKiBAcGFyYW0gdHJhbnNhY3Rpb24gQW5vdGhlciB0cmFuc2FjdGlvblxyXG4gICAqL1xyXG4gIG1lcmdlVHJhbnNhY3Rpb24odHJhbnNhY3Rpb246IEVudGl0eVRyYW5zYWN0aW9uKSB7XHJcbiAgICB0aGlzLmNoZWNrSW5Db21taXRQaGFzZSgpO1xyXG5cclxuICAgIGNvbnN0IG9wZXJhdGlvbnMgPSB0cmFuc2FjdGlvbi5vcGVyYXRpb25zLmFsbCgpO1xyXG4gICAgb3BlcmF0aW9ucy5mb3JFYWNoKChvcGVyYXRpb246IEVudGl0eU9wZXJhdGlvbikgPT4ge1xyXG4gICAgICB0aGlzLmFkZE9wZXJhdGlvbihvcGVyYXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYW4gaW5zZXJ0IG9wZXJhdGlvbiBhbmQgYWRkIGFuIGVudGl0eSB0byB0aGUgc3RvcmVcclxuICAgKiBAcGFyYW0gY3VycmVudCBUaGUgZW50aXR5IHRvIGluc2VydFxyXG4gICAqIEBwYXJhbSBzdG9yZSBPcHRpb25hbDogVGhlIHN0b3JlIHRvIGluc2VydCB0aGUgZW50aXR5IGludG9cclxuICAgKiBAcGFyYW0gbWV0YSBPcHRpb25hbDogQW55IG1ldGFkYXRhIG9uIHRoZSBvcGVyYXRpb25cclxuICAgKi9cclxuICBwcml2YXRlIGRvSW5zZXJ0KGN1cnJlbnQ6IG9iamVjdCwgc3RvcmU/OiBFbnRpdHlTdG9yZTxvYmplY3Q+LCBtZXRhPzoge1trZXk6IHN0cmluZ106IGFueX0pIHtcclxuICAgIHRoaXMuYWRkT3BlcmF0aW9uKHtcclxuICAgICAga2V5OiB0aGlzLmdldEtleShjdXJyZW50KSxcclxuICAgICAgdHlwZTogRW50aXR5T3BlcmF0aW9uVHlwZS5JbnNlcnQsXHJcbiAgICAgIHByZXZpb3VzOiB1bmRlZmluZWQsXHJcbiAgICAgIGN1cnJlbnQsXHJcbiAgICAgIHN0b3JlLFxyXG4gICAgICBtZXRhXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoc3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzdG9yZS5pbnNlcnQoY3VycmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYW4gdXBkYXRlIG9wZXJhdGlvbiBhbmQgdXBkYXRlIGFuIGVudGl0eSBpbnRvIHRoZSBzdG9yZVxyXG4gICAqIEBwYXJhbSBwcmV2aW91cyBUaGUgZW50aXR5IGJlZm9yZSB1cGRhdGVcclxuICAgKiBAcGFyYW0gY3VycmVudCBUaGUgZW50aXR5IGFmdGVyIHVwZGF0ZVxyXG4gICAqIEBwYXJhbSBzdG9yZSBPcHRpb25hbDogVGhlIHN0b3JlIHRvIHVwZGF0ZSB0aGUgZW50aXR5IGludG9cclxuICAgKiBAcGFyYW0gbWV0YSBPcHRpb25hbDogQW55IG1ldGFkYXRhIG9uIHRoZSBvcGVyYXRpb25cclxuICAgKi9cclxuICBwcml2YXRlIGRvVXBkYXRlKHByZXZpb3VzOiBvYmplY3QsIGN1cnJlbnQ6IG9iamVjdCwgc3RvcmU/OiBFbnRpdHlTdG9yZTxvYmplY3Q+LCBtZXRhPzoge1trZXk6IHN0cmluZ106IGFueX0pIHtcclxuICAgIHRoaXMuYWRkT3BlcmF0aW9uKHtcclxuICAgICAga2V5OiB0aGlzLmdldEtleShjdXJyZW50KSxcclxuICAgICAgdHlwZTogRW50aXR5T3BlcmF0aW9uVHlwZS5VcGRhdGUsXHJcbiAgICAgIHByZXZpb3VzLFxyXG4gICAgICBjdXJyZW50LFxyXG4gICAgICBzdG9yZSxcclxuICAgICAgbWV0YVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHN0b3JlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3RvcmUudXBkYXRlKGN1cnJlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgZGVsZXRlIG9wZXJhdGlvbiBhbmQgZGVsZXRlIGFuIGVudGl0eSBmcm9tIHRoZSBzdG9yZVxyXG4gICAqIEBwYXJhbSBwcmV2aW91cyBUaGUgZW50aXR5IGJlZm9yZSBkZWxldGVcclxuICAgKiBAcGFyYW0gc3RvcmUgT3B0aW9uYWw6IFRoZSBzdG9yZSB0byBkZWxldGUgdGhlIGVudGl0eSBmcm9tXHJcbiAgICogQHBhcmFtIG1ldGEgT3B0aW9uYWw6IEFueSBtZXRhZGF0YSBvbiB0aGUgb3BlcmF0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkb0RlbGV0ZShwcmV2aW91czogb2JqZWN0LCBzdG9yZT86IEVudGl0eVN0b3JlPG9iamVjdD4sIG1ldGE/OiB7W2tleTogc3RyaW5nXTogYW55fSkge1xyXG4gICAgdGhpcy5hZGRPcGVyYXRpb24oe1xyXG4gICAgICBrZXk6IHRoaXMuZ2V0S2V5KHByZXZpb3VzKSxcclxuICAgICAgdHlwZTogRW50aXR5T3BlcmF0aW9uVHlwZS5EZWxldGUsXHJcbiAgICAgIHByZXZpb3VzLFxyXG4gICAgICBjdXJyZW50OiB1bmRlZmluZWQsXHJcbiAgICAgIHN0b3JlLFxyXG4gICAgICBtZXRhXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoc3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzdG9yZS5kZWxldGUocHJldmlvdXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGNvbW1pdHRlZCBvcGVyYXRpb25zIGZyb20gc3RvcmVcclxuICAgKiBAcGFyYW0gb3BlcmF0aW9ucyBDb21taXRlZCBvcGVyYXRpb25zXHJcbiAgICogQHRvZG8gUmFpc2UgZXZlbnQgYW5kIHN5bmNocm9uaXplIHN0b3Jlcz9cclxuICAgKi9cclxuICBwcml2YXRlIHJlc29sdmVPcGVyYXRpb25zKG9wZXJhdGlvbnM6IEVudGl0eU9wZXJhdGlvbltdKSB7XHJcbiAgICB0aGlzLm9wZXJhdGlvbnMuZGVsZXRlTWFueShvcGVyYXRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIGNvbW1pdCBzdWNjZXNzLCByZXNvbHZlIGNvbW1pdGVkIG9wZXJhdGlvbnMgYW5kIGV4aXQgY29tbWl0IHBoYXNlXHJcbiAgICogQHBhcmFtIG9wZXJhdGlvbnMgQ29tbWl0ZWQgb3BlcmF0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Db21taXRTdWNjZXNzKG9wZXJhdGlvbnM6IEVudGl0eU9wZXJhdGlvbltdKSB7XHJcbiAgICB0aGlzLnJlc29sdmVPcGVyYXRpb25zKG9wZXJhdGlvbnMpO1xyXG4gICAgdGhpcy5faW5Db21taXRQaGFzZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gY29tbWl0IGVycm9yLCBhYm9ydCB0cmFuc2FjdGlvblxyXG4gICAqIEBwYXJhbSBvcGVyYXRpb25zIENvbW1pdGVkIG9wZXJhdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIG9uQ29tbWl0RXJyb3Iob3BlcmF0aW9uczogRW50aXR5T3BlcmF0aW9uW10pIHtcclxuICAgIHRoaXMuX2luQ29tbWl0UGhhc2UgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhbiBvcGVyYXRpb24gdG8gdGhlIG9wZXJhdGlvbnMgc3RvcmVcclxuICAgKiBAcGFyYW0gb3BlcmF0aW9uIE9wZXJhdGlvbiB0byBhZGRcclxuICAgKi9cclxuICBwcml2YXRlIGFkZE9wZXJhdGlvbihvcGVyYXRpb246IEVudGl0eU9wZXJhdGlvbikge1xyXG4gICAgdGhpcy5jaGVja0luQ29tbWl0UGhhc2UoKTtcclxuXHJcbiAgICB0aGlzLm9wZXJhdGlvbnMuaW5zZXJ0KG9wZXJhdGlvbik7XHJcbiAgICB0aGlzLm9wZXJhdGlvbnMuc3RhdGUudXBkYXRlKG9wZXJhdGlvbiwge2FkZGVkOiB0cnVlfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYW4gb3BlcmF0aW9uIGZyb20gdGhlIG9wZXJhdGlvbnMgc3RvcmVcclxuICAgKiBAcGFyYW0gb3BlcmF0aW9uIE9wZXJhdGlvbiB0byByZW1vdmVcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZU9wZXJhdGlvbihvcGVyYXRpb246IEVudGl0eU9wZXJhdGlvbikge1xyXG4gICAgdGhpcy5jaGVja0luQ29tbWl0UGhhc2UoKTtcclxuXHJcbiAgICB0aGlzLm9wZXJhdGlvbnMuZGVsZXRlKG9wZXJhdGlvbik7XHJcbiAgICB0aGlzLm9wZXJhdGlvbnMuc3RhdGUudXBkYXRlKG9wZXJhdGlvbiwge2FkZGVkOiBmYWxzZX0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBhbnkgZXhpc3Rpbmcgb3BlcmF0aW9uIGFuIGVudGl0eVxyXG4gICAqIEBwYXJhbSBlbnRpdHkgRW50aXR5XHJcbiAgICogQHJldHVybnMgRWl0aGVyIGFuIGluc2VydCwgdXBkYXRlIG9yIGRlbGV0ZSBvcGVyYXRpb25cclxuICAgKi9cclxuICBwcml2YXRlIGdldE9wZXJhdGlvbkJ5RW50aXR5KGVudGl0eTogb2JqZWN0KTogRW50aXR5T3BlcmF0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbnMuZ2V0KHRoaXMuZ2V0S2V5KGVudGl0eSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFsbCB0aGUgb3BlcmF0aW9ucyB0byBjb21taXRcclxuICAgKiBAcmV0dXJucyBPcGVyYXRpb25zIHRvIGNvbW1pdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0T3BlcmF0aW9uc0luQ29tbWl0KCk6IEVudGl0eU9wZXJhdGlvbltdIHtcclxuICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbnMuc3RhdGVWaWV3XHJcbiAgICAgIC5tYW55QnkoKHZhbHVlOiB7ZW50aXR5OiBFbnRpdHlPcGVyYXRpb24sIHN0YXRlOiBFbnRpdHlPcGVyYXRpb25TdGF0ZX0pID0+IHtcclxuICAgICAgICByZXR1cm4gdmFsdWUuc3RhdGUuYWRkZWQgPT09IHRydWU7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5tYXAoKHZhbHVlOiB7ZW50aXR5OiBFbnRpdHlPcGVyYXRpb24sIHN0YXRlOiBFbnRpdHlPcGVyYXRpb25TdGF0ZX0pID0+IHZhbHVlLmVudGl0eSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiB0aGUgdHJhbnNhY3Rpb24gaXMgaW4gdGhlIGNvbW1pdCBwaGFzZSBhbmQgdGhyb3cgYW4gZXJyb3IgaWYgaXQgaXNcclxuICAgKi9cclxuICBwcml2YXRlIGNoZWNrSW5Db21taXRQaGFzZSgpIHtcclxuICAgIGlmICh0aGlzLmluQ29tbWl0UGhhc2UgPT09IHRydWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHRyYW5zYWN0aW9uIGlzIGluIHRoZSBjb21taXQgcGhhc2UuIENhbm5vdCBjb21wbGV0ZSB0aGlzIG9wZXJhdGlvbi4nKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19