/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var /**
 * This class holds a reference to the insert, update and delete
 * operations performed on a store. This is useful to commit
 * these operations in a single pass or to cancel them.
 */
EntityTransaction = /** @class */ (function () {
    function EntityTransaction(options) {
        if (options === void 0) { options = {}; }
        this._inCommitPhase = false;
        this.getKey = options.getKey ? options.getKey : getEntityId;
        this.operations = new EntityStore([], {
            getKey: (/**
             * @param {?} operation
             * @return {?}
             */
            function (operation) { return operation.key; })
        });
    }
    Object.defineProperty(EntityTransaction.prototype, "empty", {
        /**
         * Whether there are pending operations
         */
        get: /**
         * Whether there are pending operations
         * @return {?}
         */
        function () { return this.operations.entities$.value.length === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityTransaction.prototype, "inCommitPhase", {
        /**
         * Whether thise store is in commit phase
         */
        get: /**
         * Whether thise store is in commit phase
         * @return {?}
         */
        function () { return this._inCommitPhase; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    EntityTransaction.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.operations.destroy();
    };
    /**
     * Insert an entity into a store. If no store is specified, an insert
     * operation is still created but the transaction won't add the new
     * entity to the store.
     * @param current The entity to insert
     * @param store Optional: The store to insert the entity into
     * @param meta Optional: Any metadata on the operation
     */
    /**
     * Insert an entity into a store. If no store is specified, an insert
     * operation is still created but the transaction won't add the new
     * entity to the store.
     * @param {?} current The entity to insert
     * @param {?=} store Optional: The store to insert the entity into
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    EntityTransaction.prototype.insert = /**
     * Insert an entity into a store. If no store is specified, an insert
     * operation is still created but the transaction won't add the new
     * entity to the store.
     * @param {?} current The entity to insert
     * @param {?=} store Optional: The store to insert the entity into
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    function (current, store, meta) {
        /** @type {?} */
        var existingOperation = this.getOperationByEntity(current);
        if (existingOperation !== undefined) {
            this.removeOperation(existingOperation);
        }
        this.doInsert(current, store, meta);
    };
    /**
     * Update an entity in a store. If no store is specified, an update
     * operation is still created but the transaction won't update the
     * entity into the store.
     * @param previous The entity before update
     * @param current The entity after update
     * @param store Optional: The store to update the entity into
     * @param meta Optional: Any metadata on the operation
     */
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
    EntityTransaction.prototype.update = /**
     * Update an entity in a store. If no store is specified, an update
     * operation is still created but the transaction won't update the
     * entity into the store.
     * @param {?} previous The entity before update
     * @param {?} current The entity after update
     * @param {?=} store Optional: The store to update the entity into
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    function (previous, current, store, meta) {
        /** @type {?} */
        var existingOperation = this.getOperationByEntity(current);
        if (existingOperation !== undefined) {
            this.removeOperation(existingOperation);
            if (existingOperation.type === EntityOperationType.Insert) {
                this.doInsert(current, store, meta);
                return;
            }
        }
        this.doUpdate(previous, current, store, meta);
    };
    /**
     * Delete an entity from a store. If no store is specified, a delete
     * operation is still created but the transaction won't remove the
     * entity from the store.
     * @param previous The entity before delete
     * @param store Optional: The store to delete the entity from
     * @param meta Optional: Any metadata on the operation
     */
    /**
     * Delete an entity from a store. If no store is specified, a delete
     * operation is still created but the transaction won't remove the
     * entity from the store.
     * @param {?} previous The entity before delete
     * @param {?=} store Optional: The store to delete the entity from
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    EntityTransaction.prototype.delete = /**
     * Delete an entity from a store. If no store is specified, a delete
     * operation is still created but the transaction won't remove the
     * entity from the store.
     * @param {?} previous The entity before delete
     * @param {?=} store Optional: The store to delete the entity from
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    function (previous, store, meta) {
        /** @type {?} */
        var existingOperation = this.getOperationByEntity(previous);
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
    };
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
    EntityTransaction.prototype.commit = /**
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
    function (operations, handler) {
        var _this = this;
        this._inCommitPhase = true;
        return handler(this, operations)
            .pipe(catchError((/**
         * @return {?}
         */
        function () { return of(new Error()); })), tap((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            if (result instanceof Error) {
                _this.onCommitError(operations);
            }
            else {
                _this.onCommitSuccess(operations);
            }
        })));
    };
    /**
     * Commit all the operations of the transaction.
     * @param handler Function that handles the commit operation
     * @returns The handler output (observable)
     */
    /**
     * Commit all the operations of the transaction.
     * @param {?} handler Function that handles the commit operation
     * @return {?} The handler output (observable)
     */
    EntityTransaction.prototype.commitAll = /**
     * Commit all the operations of the transaction.
     * @param {?} handler Function that handles the commit operation
     * @return {?} The handler output (observable)
     */
    function (handler) {
        /** @type {?} */
        var operations = this.getOperationsInCommit();
        return this.commit(operations, handler);
    };
    /**
     * Rollback this transaction
     */
    /**
     * Rollback this transaction
     * @return {?}
     */
    EntityTransaction.prototype.rollback = /**
     * Rollback this transaction
     * @return {?}
     */
    function () {
        this.rollbackOperations(this.operations.all());
    };
    /**
     * Rollback specific operations
     */
    /**
     * Rollback specific operations
     * @param {?} operations
     * @return {?}
     */
    EntityTransaction.prototype.rollbackOperations = /**
     * Rollback specific operations
     * @param {?} operations
     * @return {?}
     */
    function (operations) {
        var e_1, _a;
        this.checkInCommitPhase();
        /** @type {?} */
        var operationsFactory = (/**
         * @return {?}
         */
        function () { return new Map([
            [EntityOperationType.Delete, []],
            [EntityOperationType.Update, []],
            [EntityOperationType.Insert, []]
        ]); });
        /** @type {?} */
        var storesOperations = new Map();
        try {
            // Group operations by store and by operation type.
            // Grouping operations allows us to revert them in bacth, thus, triggering
            // observables only one per operation type.
            for (var operations_1 = tslib_1.__values(operations), operations_1_1 = operations_1.next(); !operations_1_1.done; operations_1_1 = operations_1.next()) {
                var operation = operations_1_1.value;
                /** @type {?} */
                var store = operation.store;
                if (operation.store === undefined) {
                    continue;
                }
                /** @type {?} */
                var storeOperations = storesOperations.get(store);
                if (storeOperations === undefined) {
                    storeOperations = operationsFactory();
                    storesOperations.set(store, storeOperations);
                }
                storeOperations.get(operation.type).push(operation);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (operations_1_1 && !operations_1_1.done && (_a = operations_1.return)) _a.call(operations_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        Array.from(storesOperations.keys()).forEach((/**
         * @param {?} store
         * @return {?}
         */
        function (store) {
            /** @type {?} */
            var storeOperations = storesOperations.get(store);
            /** @type {?} */
            var deletes = storeOperations.get(EntityOperationType.Delete);
            store.insertMany(deletes.map((/**
             * @param {?} _delete
             * @return {?}
             */
            function (_delete) { return _delete.previous; })));
            /** @type {?} */
            var updates = storeOperations.get(EntityOperationType.Update);
            store.updateMany(updates.map((/**
             * @param {?} _update
             * @return {?}
             */
            function (_update) { return _update.previous; })));
            /** @type {?} */
            var inserts = storeOperations.get(EntityOperationType.Insert);
            store.deleteMany(inserts.map((/**
             * @param {?} _insert
             * @return {?}
             */
            function (_insert) { return _insert.current; })));
        }));
        this.operations.deleteMany(operations);
        this._inCommitPhase = false;
    };
    /**
     * Clear this transaction
     * @todo Raise event and synchronize stores?
     */
    /**
     * Clear this transaction
     * \@todo Raise event and synchronize stores?
     * @return {?}
     */
    EntityTransaction.prototype.clear = /**
     * Clear this transaction
     * \@todo Raise event and synchronize stores?
     * @return {?}
     */
    function () {
        this.operations.clear();
        this._inCommitPhase = false;
    };
    /**
     * Merge another transaction in this one
     * @param transaction Another transaction
     */
    /**
     * Merge another transaction in this one
     * @param {?} transaction Another transaction
     * @return {?}
     */
    EntityTransaction.prototype.mergeTransaction = /**
     * Merge another transaction in this one
     * @param {?} transaction Another transaction
     * @return {?}
     */
    function (transaction) {
        var _this = this;
        this.checkInCommitPhase();
        /** @type {?} */
        var operations = transaction.operations.all();
        operations.forEach((/**
         * @param {?} operation
         * @return {?}
         */
        function (operation) {
            _this.addOperation(operation);
        }));
    };
    /**
     * Create an insert operation and add an entity to the store
     * @param current The entity to insert
     * @param store Optional: The store to insert the entity into
     * @param meta Optional: Any metadata on the operation
     */
    /**
     * Create an insert operation and add an entity to the store
     * @private
     * @param {?} current The entity to insert
     * @param {?=} store Optional: The store to insert the entity into
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    EntityTransaction.prototype.doInsert = /**
     * Create an insert operation and add an entity to the store
     * @private
     * @param {?} current The entity to insert
     * @param {?=} store Optional: The store to insert the entity into
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    function (current, store, meta) {
        this.addOperation({
            key: this.getKey(current),
            type: EntityOperationType.Insert,
            previous: undefined,
            current: current,
            store: store,
            meta: meta
        });
        if (store !== undefined) {
            store.insert(current);
        }
    };
    /**
     * Create an update operation and update an entity into the store
     * @param previous The entity before update
     * @param current The entity after update
     * @param store Optional: The store to update the entity into
     * @param meta Optional: Any metadata on the operation
     */
    /**
     * Create an update operation and update an entity into the store
     * @private
     * @param {?} previous The entity before update
     * @param {?} current The entity after update
     * @param {?=} store Optional: The store to update the entity into
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    EntityTransaction.prototype.doUpdate = /**
     * Create an update operation and update an entity into the store
     * @private
     * @param {?} previous The entity before update
     * @param {?} current The entity after update
     * @param {?=} store Optional: The store to update the entity into
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    function (previous, current, store, meta) {
        this.addOperation({
            key: this.getKey(current),
            type: EntityOperationType.Update,
            previous: previous,
            current: current,
            store: store,
            meta: meta
        });
        if (store !== undefined) {
            store.update(current);
        }
    };
    /**
     * Create a delete operation and delete an entity from the store
     * @param previous The entity before delete
     * @param store Optional: The store to delete the entity from
     * @param meta Optional: Any metadata on the operation
     */
    /**
     * Create a delete operation and delete an entity from the store
     * @private
     * @param {?} previous The entity before delete
     * @param {?=} store Optional: The store to delete the entity from
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    EntityTransaction.prototype.doDelete = /**
     * Create a delete operation and delete an entity from the store
     * @private
     * @param {?} previous The entity before delete
     * @param {?=} store Optional: The store to delete the entity from
     * @param {?=} meta Optional: Any metadata on the operation
     * @return {?}
     */
    function (previous, store, meta) {
        this.addOperation({
            key: this.getKey(previous),
            type: EntityOperationType.Delete,
            previous: previous,
            current: undefined,
            store: store,
            meta: meta
        });
        if (store !== undefined) {
            store.delete(previous);
        }
    };
    /**
     * Remove committed operations from store
     * @param operations Commited operations
     * @todo Raise event and synchronize stores?
     */
    /**
     * Remove committed operations from store
     * \@todo Raise event and synchronize stores?
     * @private
     * @param {?} operations Commited operations
     * @return {?}
     */
    EntityTransaction.prototype.resolveOperations = /**
     * Remove committed operations from store
     * \@todo Raise event and synchronize stores?
     * @private
     * @param {?} operations Commited operations
     * @return {?}
     */
    function (operations) {
        this.operations.deleteMany(operations);
    };
    /**
     * On commit success, resolve commited operations and exit commit phase
     * @param operations Commited operations
     */
    /**
     * On commit success, resolve commited operations and exit commit phase
     * @private
     * @param {?} operations Commited operations
     * @return {?}
     */
    EntityTransaction.prototype.onCommitSuccess = /**
     * On commit success, resolve commited operations and exit commit phase
     * @private
     * @param {?} operations Commited operations
     * @return {?}
     */
    function (operations) {
        this.resolveOperations(operations);
        this._inCommitPhase = false;
    };
    /**
     * On commit error, abort transaction
     * @param operations Commited operations
     */
    /**
     * On commit error, abort transaction
     * @private
     * @param {?} operations Commited operations
     * @return {?}
     */
    EntityTransaction.prototype.onCommitError = /**
     * On commit error, abort transaction
     * @private
     * @param {?} operations Commited operations
     * @return {?}
     */
    function (operations) {
        this._inCommitPhase = false;
    };
    /**
     * Add an operation to the operations store
     * @param operation Operation to add
     */
    /**
     * Add an operation to the operations store
     * @private
     * @param {?} operation Operation to add
     * @return {?}
     */
    EntityTransaction.prototype.addOperation = /**
     * Add an operation to the operations store
     * @private
     * @param {?} operation Operation to add
     * @return {?}
     */
    function (operation) {
        this.checkInCommitPhase();
        this.operations.insert(operation);
        this.operations.state.update(operation, { added: true });
    };
    /**
     * Remove an operation from the operations store
     * @param operation Operation to remove
     */
    /**
     * Remove an operation from the operations store
     * @private
     * @param {?} operation Operation to remove
     * @return {?}
     */
    EntityTransaction.prototype.removeOperation = /**
     * Remove an operation from the operations store
     * @private
     * @param {?} operation Operation to remove
     * @return {?}
     */
    function (operation) {
        this.checkInCommitPhase();
        this.operations.delete(operation);
        this.operations.state.update(operation, { added: false });
    };
    /**
     * Get the any existing operation an entity
     * @param entity Entity
     * @returns Either an insert, update or delete operation
     */
    /**
     * Get the any existing operation an entity
     * @private
     * @param {?} entity Entity
     * @return {?} Either an insert, update or delete operation
     */
    EntityTransaction.prototype.getOperationByEntity = /**
     * Get the any existing operation an entity
     * @private
     * @param {?} entity Entity
     * @return {?} Either an insert, update or delete operation
     */
    function (entity) {
        return this.operations.get(this.getKey(entity));
    };
    /**
     * Get all the operations to commit
     * @returns Operations to commit
     */
    /**
     * Get all the operations to commit
     * @private
     * @return {?} Operations to commit
     */
    EntityTransaction.prototype.getOperationsInCommit = /**
     * Get all the operations to commit
     * @private
     * @return {?} Operations to commit
     */
    function () {
        return this.operations.stateView
            .manyBy((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return value.state.added === true;
        }))
            .map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value.entity; }));
    };
    /**
     * Check if the transaction is in the commit phase and throw an error if it is
     */
    /**
     * Check if the transaction is in the commit phase and throw an error if it is
     * @private
     * @return {?}
     */
    EntityTransaction.prototype.checkInCommitPhase = /**
     * Check if the transaction is in the commit phase and throw an error if it is
     * @private
     * @return {?}
     */
    function () {
        if (this.inCommitPhase === true) {
            throw new Error('This transaction is in the commit phase. Cannot complete this operation.');
        }
    };
    return EntityTransaction;
}());
/**
 * This class holds a reference to the insert, update and delete
 * operations performed on a store. This is useful to commit
 * these operations in a single pass or to cancel them.
 */
export { EntityTransaction };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZW50aXR5L3NoYXJlZC90cmFuc2FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVFqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBWTdDOzs7Ozs7SUF1QkUsMkJBQVksT0FBc0M7UUFBdEMsd0JBQUEsRUFBQSxZQUFzQztRQUYxQyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUc3QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUM1RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksV0FBVyxDQUF3QyxFQUFFLEVBQUU7WUFDM0UsTUFBTTs7OztZQUFFLFVBQUMsU0FBMEIsSUFBSyxPQUFBLFNBQVMsQ0FBQyxHQUFHLEVBQWIsQ0FBYSxDQUFBO1NBQ3RELENBQUMsQ0FBQztJQUNMLENBQUM7SUFiRCxzQkFBSSxvQ0FBSztRQUhUOztXQUVHOzs7OztRQUNILGNBQXVCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUs3RSxzQkFBSSw0Q0FBYTtRQUhqQjs7V0FFRzs7Ozs7UUFDSCxjQUErQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFD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MEUsQ0FBQyxDQUFDO1NBQzdGO0lBQ0gsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQTVWRCxJQTRWQzs7Ozs7Ozs7Ozs7O0lBdlZDLHVDQUF3RTs7Ozs7SUFLeEUsbUNBQWtDOzs7OztJQVdsQywyQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIEVudGl0eUtleSxcclxuICBFbnRpdHlUcmFuc2FjdGlvbk9wdGlvbnMsXHJcbiAgRW50aXR5T3BlcmF0aW9uLFxyXG4gIEVudGl0eU9wZXJhdGlvblN0YXRlXHJcbn0gZnJvbSAnLi9lbnRpdHkuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEVudGl0eVN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCB7IEVudGl0eU9wZXJhdGlvblR5cGUgfSBmcm9tICcuL2VudGl0eS5lbnVtcyc7XHJcbmltcG9ydCB7IGdldEVudGl0eUlkIH0gZnJvbSAnLi9lbnRpdHkudXRpbHMnO1xyXG5cclxuZXhwb3J0IHR5cGUgRW50aXR5VHJhbnNhY3Rpb25Db21taXRIYW5kbGVyID0gKFxyXG4gIHRyYW5zYWN0aW9uOiBFbnRpdHlUcmFuc2FjdGlvbixcclxuICBvcGVyYXRpb25zOiBFbnRpdHlPcGVyYXRpb25bXVxyXG4pID0+IE9ic2VydmFibGU8YW55PjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGhvbGRzIGEgcmVmZXJlbmNlIHRvIHRoZSBpbnNlcnQsIHVwZGF0ZSBhbmQgZGVsZXRlXHJcbiAqIG9wZXJhdGlvbnMgcGVyZm9ybWVkIG9uIGEgc3RvcmUuIFRoaXMgaXMgdXNlZnVsIHRvIGNvbW1pdFxyXG4gKiB0aGVzZSBvcGVyYXRpb25zIGluIGEgc2luZ2xlIHBhc3Mgb3IgdG8gY2FuY2VsIHRoZW0uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW50aXR5VHJhbnNhY3Rpb24ge1xyXG5cclxuICAvKipcclxuICAgKiBTdG9yZSBob2xkaW5nIHRoZSBvcGVyYXRpb25zIG9uIGFub3RoZXIgc3RvcmVcclxuICAgKi9cclxuICByZWFkb25seSBvcGVyYXRpb25zOiBFbnRpdHlTdG9yZTxFbnRpdHlPcGVyYXRpb24sIEVudGl0eU9wZXJhdGlvblN0YXRlPjtcclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIGdldCBhbiBlbnRpdHkncyBpZFxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGdldEtleTogKEUpID0+IEVudGl0eUtleTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGVyZSBhcmUgcGVuZGluZyBvcGVyYXRpb25zXHJcbiAgICovXHJcbiAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5vcGVyYXRpb25zLmVudGl0aWVzJC52YWx1ZS5sZW5ndGggPT09IDA7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGlzZSBzdG9yZSBpcyBpbiBjb21taXQgcGhhc2VcclxuICAgKi9cclxuICBnZXQgaW5Db21taXRQaGFzZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2luQ29tbWl0UGhhc2U7IH1cclxuICBwcml2YXRlIF9pbkNvbW1pdFBoYXNlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEVudGl0eVRyYW5zYWN0aW9uT3B0aW9ucyA9IHt9KSB7XHJcbiAgICB0aGlzLmdldEtleSA9IG9wdGlvbnMuZ2V0S2V5ID8gb3B0aW9ucy5nZXRLZXkgOiBnZXRFbnRpdHlJZDtcclxuICAgIHRoaXMub3BlcmF0aW9ucyA9IG5ldyBFbnRpdHlTdG9yZTxFbnRpdHlPcGVyYXRpb24sIEVudGl0eU9wZXJhdGlvblN0YXRlPihbXSwge1xyXG4gICAgICBnZXRLZXk6IChvcGVyYXRpb246IEVudGl0eU9wZXJhdGlvbikgPT4gb3BlcmF0aW9uLmtleVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5vcGVyYXRpb25zLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluc2VydCBhbiBlbnRpdHkgaW50byBhIHN0b3JlLiBJZiBubyBzdG9yZSBpcyBzcGVjaWZpZWQsIGFuIGluc2VydFxyXG4gICAqIG9wZXJhdGlvbiBpcyBzdGlsbCBjcmVhdGVkIGJ1dCB0aGUgdHJhbnNhY3Rpb24gd29uJ3QgYWRkIHRoZSBuZXdcclxuICAgKiBlbnRpdHkgdG8gdGhlIHN0b3JlLlxyXG4gICAqIEBwYXJhbSBjdXJyZW50IFRoZSBlbnRpdHkgdG8gaW5zZXJ0XHJcbiAgICogQHBhcmFtIHN0b3JlIE9wdGlvbmFsOiBUaGUgc3RvcmUgdG8gaW5zZXJ0IHRoZSBlbnRpdHkgaW50b1xyXG4gICAqIEBwYXJhbSBtZXRhIE9wdGlvbmFsOiBBbnkgbWV0YWRhdGEgb24gdGhlIG9wZXJhdGlvblxyXG4gICAqL1xyXG4gIGluc2VydChjdXJyZW50OiBvYmplY3QsIHN0b3JlPzogRW50aXR5U3RvcmU8b2JqZWN0PiwgbWV0YT86IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XHJcbiAgICBjb25zdCBleGlzdGluZ09wZXJhdGlvbiA9IHRoaXMuZ2V0T3BlcmF0aW9uQnlFbnRpdHkoY3VycmVudCk7XHJcbiAgICBpZiAoZXhpc3RpbmdPcGVyYXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnJlbW92ZU9wZXJhdGlvbihleGlzdGluZ09wZXJhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kb0luc2VydChjdXJyZW50LCBzdG9yZSwgbWV0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgYW4gZW50aXR5IGluIGEgc3RvcmUuIElmIG5vIHN0b3JlIGlzIHNwZWNpZmllZCwgYW4gdXBkYXRlXHJcbiAgICogb3BlcmF0aW9uIGlzIHN0aWxsIGNyZWF0ZWQgYnV0IHRoZSB0cmFuc2FjdGlvbiB3b24ndCB1cGRhdGUgdGhlXHJcbiAgICogZW50aXR5IGludG8gdGhlIHN0b3JlLlxyXG4gICAqIEBwYXJhbSBwcmV2aW91cyBUaGUgZW50aXR5IGJlZm9yZSB1cGRhdGVcclxuICAgKiBAcGFyYW0gY3VycmVudCBUaGUgZW50aXR5IGFmdGVyIHVwZGF0ZVxyXG4gICAqIEBwYXJhbSBzdG9yZSBPcHRpb25hbDogVGhlIHN0b3JlIHRvIHVwZGF0ZSB0aGUgZW50aXR5IGludG9cclxuICAgKiBAcGFyYW0gbWV0YSBPcHRpb25hbDogQW55IG1ldGFkYXRhIG9uIHRoZSBvcGVyYXRpb25cclxuICAgKi9cclxuICB1cGRhdGUocHJldmlvdXM6IG9iamVjdCwgY3VycmVudDogb2JqZWN0LCBzdG9yZT86IEVudGl0eVN0b3JlPG9iamVjdD4sIG1ldGE/OiB7W2tleTogc3RyaW5nXTogYW55fSkge1xyXG4gICAgY29uc3QgZXhpc3RpbmdPcGVyYXRpb24gPSB0aGlzLmdldE9wZXJhdGlvbkJ5RW50aXR5KGN1cnJlbnQpO1xyXG4gICAgaWYgKGV4aXN0aW5nT3BlcmF0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5yZW1vdmVPcGVyYXRpb24oZXhpc3RpbmdPcGVyYXRpb24pO1xyXG4gICAgICBpZiAoZXhpc3RpbmdPcGVyYXRpb24udHlwZSA9PT0gRW50aXR5T3BlcmF0aW9uVHlwZS5JbnNlcnQpIHtcclxuICAgICAgICB0aGlzLmRvSW5zZXJ0KGN1cnJlbnQsIHN0b3JlLCBtZXRhKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRvVXBkYXRlKHByZXZpb3VzLCBjdXJyZW50LCBzdG9yZSwgbWV0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWxldGUgYW4gZW50aXR5IGZyb20gYSBzdG9yZS4gSWYgbm8gc3RvcmUgaXMgc3BlY2lmaWVkLCBhIGRlbGV0ZVxyXG4gICAqIG9wZXJhdGlvbiBpcyBzdGlsbCBjcmVhdGVkIGJ1dCB0aGUgdHJhbnNhY3Rpb24gd29uJ3QgcmVtb3ZlIHRoZVxyXG4gICAqIGVudGl0eSBmcm9tIHRoZSBzdG9yZS5cclxuICAgKiBAcGFyYW0gcHJldmlvdXMgVGhlIGVudGl0eSBiZWZvcmUgZGVsZXRlXHJcbiAgICogQHBhcmFtIHN0b3JlIE9wdGlvbmFsOiBUaGUgc3RvcmUgdG8gZGVsZXRlIHRoZSBlbnRpdHkgZnJvbVxyXG4gICAqIEBwYXJhbSBtZXRhIE9wdGlvbmFsOiBBbnkgbWV0YWRhdGEgb24gdGhlIG9wZXJhdGlvblxyXG4gICAqL1xyXG4gIGRlbGV0ZShwcmV2aW91czogb2JqZWN0LCBzdG9yZT86IEVudGl0eVN0b3JlPG9iamVjdD4sIG1ldGE/OiB7W2tleTogc3RyaW5nXTogYW55fSkge1xyXG4gICAgY29uc3QgZXhpc3RpbmdPcGVyYXRpb24gPSB0aGlzLmdldE9wZXJhdGlvbkJ5RW50aXR5KHByZXZpb3VzKTtcclxuICAgIGlmIChleGlzdGluZ09wZXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlT3BlcmF0aW9uKGV4aXN0aW5nT3BlcmF0aW9uKTtcclxuICAgICAgaWYgKGV4aXN0aW5nT3BlcmF0aW9uLnR5cGUgPT09IEVudGl0eU9wZXJhdGlvblR5cGUuSW5zZXJ0KSB7XHJcbiAgICAgICAgaWYgKHN0b3JlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHN0b3JlLmRlbGV0ZShwcmV2aW91cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZG9EZWxldGUocHJldmlvdXMsIHN0b3JlLCBtZXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbW1pdCBvcGVyYXRpb25zIHRoZSB0cmFuc2FjdGlvbi4gVGhpcyBtZXRob2QgZG9lc24ndCBkbyBtdWNoXHJcbiAgICogaW4gaXRzZWxmLiBUaGUgaGFuZGxlciBpdCByZWNlaXZlcyBkb2VzIHRoZSBoYXJkIHdvcmsgYW5kIGl0J3NcclxuICAgKiBpbXBsZW1lbnRhdGlvbiBpcyBsZWZ0IHRvIHRoZSBjYWxsZXIuIFRoaXMgbWV0aG9kIHNpbXBseSB3cmFwc1xyXG4gICAqIHRoZSBoYW5kbGVyIGludG8gYW4gZXJyb3IgY2F0Y2hpbmcgbWVjaGFuaXNtIHRvIHVwZGF0ZVxyXG4gICAqIHRoZSB0cmFuc2FjdGlvbiBhZnRlcndhcmQuIFRoZSBjYWxsZXIgbmVlZHMgdG8gc3Vic2NyaWJlIHRvIHRoaXNcclxuICAgKiBtZXRob2QncyBvdXRwdXQgKG9ic2VydmFibGUpIGZvciB0aGUgY29tbWl0IHRvIGJlIHBlcmZvcm1lZC5cclxuICAgKiBAcGFyYW0gb3BlcmF0aW9ucyBPcGVyYXRpb25zIHRvIGNvbW1pdFxyXG4gICAqIEBwYXJhbSBoYW5kbGVyIEZ1bmN0aW9uIHRoYXQgaGFuZGxlcyB0aGUgY29tbWl0IG9wZXJhdGlvblxyXG4gICAqIEByZXR1cm5zIFRoZSBoYW5kbGVyIG91dHB1dCAob2JzZXJ2YWJsZSlcclxuICAgKi9cclxuICBjb21taXQob3BlcmF0aW9uczogRW50aXR5T3BlcmF0aW9uW10sIGhhbmRsZXI6IEVudGl0eVRyYW5zYWN0aW9uQ29tbWl0SGFuZGxlcik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICB0aGlzLl9pbkNvbW1pdFBoYXNlID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gaGFuZGxlcih0aGlzLCBvcGVyYXRpb25zKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBjYXRjaEVycm9yKCgpID0+IG9mKG5ldyBFcnJvcigpKSksXHJcbiAgICAgICAgdGFwKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Db21taXRFcnJvcihvcGVyYXRpb25zKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Db21taXRTdWNjZXNzKG9wZXJhdGlvbnMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21taXQgYWxsIHRoZSBvcGVyYXRpb25zIG9mIHRoZSB0cmFuc2FjdGlvbi5cclxuICAgKiBAcGFyYW0gaGFuZGxlciBGdW5jdGlvbiB0aGF0IGhhbmRsZXMgdGhlIGNvbW1pdCBvcGVyYXRpb25cclxuICAgKiBAcmV0dXJucyBUaGUgaGFuZGxlciBvdXRwdXQgKG9ic2VydmFibGUpXHJcbiAgICovXHJcbiAgY29tbWl0QWxsKGhhbmRsZXI6IEVudGl0eVRyYW5zYWN0aW9uQ29tbWl0SGFuZGxlcik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCBvcGVyYXRpb25zID0gdGhpcy5nZXRPcGVyYXRpb25zSW5Db21taXQoKTtcclxuICAgIHJldHVybiB0aGlzLmNvbW1pdChvcGVyYXRpb25zLCBoYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvbGxiYWNrIHRoaXMgdHJhbnNhY3Rpb25cclxuICAgKi9cclxuICByb2xsYmFjaygpIHtcclxuICAgIHRoaXMucm9sbGJhY2tPcGVyYXRpb25zKHRoaXMub3BlcmF0aW9ucy5hbGwoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb2xsYmFjayBzcGVjaWZpYyBvcGVyYXRpb25zXHJcbiAgICovXHJcbiAgcm9sbGJhY2tPcGVyYXRpb25zKG9wZXJhdGlvbnM6IEVudGl0eU9wZXJhdGlvbltdKSB7XHJcbiAgICB0aGlzLmNoZWNrSW5Db21taXRQaGFzZSgpO1xyXG5cclxuICAgIGNvbnN0IG9wZXJhdGlvbnNGYWN0b3J5ID0gKCkgPT4gbmV3IE1hcChbXHJcbiAgICAgIFtFbnRpdHlPcGVyYXRpb25UeXBlLkRlbGV0ZSwgW11dLFxyXG4gICAgICBbRW50aXR5T3BlcmF0aW9uVHlwZS5VcGRhdGUsIFtdXSxcclxuICAgICAgW0VudGl0eU9wZXJhdGlvblR5cGUuSW5zZXJ0LCBbXV1cclxuICAgIF0pO1xyXG4gICAgY29uc3Qgc3RvcmVzT3BlcmF0aW9ucyA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAvLyBHcm91cCBvcGVyYXRpb25zIGJ5IHN0b3JlIGFuZCBieSBvcGVyYXRpb24gdHlwZS5cclxuICAgIC8vIEdyb3VwaW5nIG9wZXJhdGlvbnMgYWxsb3dzIHVzIHRvIHJldmVydCB0aGVtIGluIGJhY3RoLCB0aHVzLCB0cmlnZ2VyaW5nXHJcbiAgICAvLyBvYnNlcnZhYmxlcyBvbmx5IG9uZSBwZXIgb3BlcmF0aW9uIHR5cGUuXHJcbiAgICBmb3IgKGNvbnN0IG9wZXJhdGlvbiBvZiBvcGVyYXRpb25zKSB7XHJcbiAgICAgIGNvbnN0IHN0b3JlID0gb3BlcmF0aW9uLnN0b3JlO1xyXG4gICAgICBpZiAob3BlcmF0aW9uLnN0b3JlID09PSB1bmRlZmluZWQpIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgIGxldCBzdG9yZU9wZXJhdGlvbnMgPSBzdG9yZXNPcGVyYXRpb25zLmdldChzdG9yZSk7XHJcbiAgICAgIGlmIChzdG9yZU9wZXJhdGlvbnMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHN0b3JlT3BlcmF0aW9ucyA9IG9wZXJhdGlvbnNGYWN0b3J5KCk7XHJcbiAgICAgICAgc3RvcmVzT3BlcmF0aW9ucy5zZXQoc3RvcmUsIHN0b3JlT3BlcmF0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgICAgc3RvcmVPcGVyYXRpb25zLmdldChvcGVyYXRpb24udHlwZSkucHVzaChvcGVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIEFycmF5LmZyb20oc3RvcmVzT3BlcmF0aW9ucy5rZXlzKCkpLmZvckVhY2goKHN0b3JlOiBFbnRpdHlTdG9yZTxvYmplY3Q+KSA9PiB7XHJcbiAgICAgIGNvbnN0IHN0b3JlT3BlcmF0aW9ucyA9IHN0b3Jlc09wZXJhdGlvbnMuZ2V0KHN0b3JlKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlbGV0ZXMgPSBzdG9yZU9wZXJhdGlvbnMuZ2V0KEVudGl0eU9wZXJhdGlvblR5cGUuRGVsZXRlKTtcclxuICAgICAgc3RvcmUuaW5zZXJ0TWFueShkZWxldGVzLm1hcCgoX2RlbGV0ZTogRW50aXR5T3BlcmF0aW9uKSA9PiBfZGVsZXRlLnByZXZpb3VzKSk7XHJcblxyXG4gICAgICBjb25zdCB1cGRhdGVzID0gc3RvcmVPcGVyYXRpb25zLmdldChFbnRpdHlPcGVyYXRpb25UeXBlLlVwZGF0ZSk7XHJcbiAgICAgIHN0b3JlLnVwZGF0ZU1hbnkodXBkYXRlcy5tYXAoKF91cGRhdGU6IEVudGl0eU9wZXJhdGlvbikgPT4gX3VwZGF0ZS5wcmV2aW91cykpO1xyXG5cclxuICAgICAgY29uc3QgaW5zZXJ0cyA9IHN0b3JlT3BlcmF0aW9ucy5nZXQoRW50aXR5T3BlcmF0aW9uVHlwZS5JbnNlcnQpO1xyXG4gICAgICBzdG9yZS5kZWxldGVNYW55KGluc2VydHMubWFwKChfaW5zZXJ0OiBFbnRpdHlPcGVyYXRpb24pID0+IF9pbnNlcnQuY3VycmVudCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vcGVyYXRpb25zLmRlbGV0ZU1hbnkob3BlcmF0aW9ucyk7XHJcbiAgICB0aGlzLl9pbkNvbW1pdFBoYXNlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGlzIHRyYW5zYWN0aW9uXHJcbiAgICogQHRvZG8gUmFpc2UgZXZlbnQgYW5kIHN5bmNocm9uaXplIHN0b3Jlcz9cclxuICAgKi9cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMub3BlcmF0aW9ucy5jbGVhcigpO1xyXG4gICAgdGhpcy5faW5Db21taXRQaGFzZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWVyZ2UgYW5vdGhlciB0cmFuc2FjdGlvbiBpbiB0aGlzIG9uZVxyXG4gICAqIEBwYXJhbSB0cmFuc2FjdGlvbiBBbm90aGVyIHRyYW5zYWN0aW9uXHJcbiAgICovXHJcbiAgbWVyZ2VUcmFuc2FjdGlvbih0cmFuc2FjdGlvbjogRW50aXR5VHJhbnNhY3Rpb24pIHtcclxuICAgIHRoaXMuY2hlY2tJbkNvbW1pdFBoYXNlKCk7XHJcblxyXG4gICAgY29uc3Qgb3BlcmF0aW9ucyA9IHRyYW5zYWN0aW9uLm9wZXJhdGlvbnMuYWxsKCk7XHJcbiAgICBvcGVyYXRpb25zLmZvckVhY2goKG9wZXJhdGlvbjogRW50aXR5T3BlcmF0aW9uKSA9PiB7XHJcbiAgICAgIHRoaXMuYWRkT3BlcmF0aW9uKG9wZXJhdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBpbnNlcnQgb3BlcmF0aW9uIGFuZCBhZGQgYW4gZW50aXR5IHRvIHRoZSBzdG9yZVxyXG4gICAqIEBwYXJhbSBjdXJyZW50IFRoZSBlbnRpdHkgdG8gaW5zZXJ0XHJcbiAgICogQHBhcmFtIHN0b3JlIE9wdGlvbmFsOiBUaGUgc3RvcmUgdG8gaW5zZXJ0IHRoZSBlbnRpdHkgaW50b1xyXG4gICAqIEBwYXJhbSBtZXRhIE9wdGlvbmFsOiBBbnkgbWV0YWRhdGEgb24gdGhlIG9wZXJhdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9JbnNlcnQoY3VycmVudDogb2JqZWN0LCBzdG9yZT86IEVudGl0eVN0b3JlPG9iamVjdD4sIG1ldGE/OiB7W2tleTogc3RyaW5nXTogYW55fSkge1xyXG4gICAgdGhpcy5hZGRPcGVyYXRpb24oe1xyXG4gICAgICBrZXk6IHRoaXMuZ2V0S2V5KGN1cnJlbnQpLFxyXG4gICAgICB0eXBlOiBFbnRpdHlPcGVyYXRpb25UeXBlLkluc2VydCxcclxuICAgICAgcHJldmlvdXM6IHVuZGVmaW5lZCxcclxuICAgICAgY3VycmVudCxcclxuICAgICAgc3RvcmUsXHJcbiAgICAgIG1ldGFcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChzdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN0b3JlLmluc2VydChjdXJyZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiB1cGRhdGUgb3BlcmF0aW9uIGFuZCB1cGRhdGUgYW4gZW50aXR5IGludG8gdGhlIHN0b3JlXHJcbiAgICogQHBhcmFtIHByZXZpb3VzIFRoZSBlbnRpdHkgYmVmb3JlIHVwZGF0ZVxyXG4gICAqIEBwYXJhbSBjdXJyZW50IFRoZSBlbnRpdHkgYWZ0ZXIgdXBkYXRlXHJcbiAgICogQHBhcmFtIHN0b3JlIE9wdGlvbmFsOiBUaGUgc3RvcmUgdG8gdXBkYXRlIHRoZSBlbnRpdHkgaW50b1xyXG4gICAqIEBwYXJhbSBtZXRhIE9wdGlvbmFsOiBBbnkgbWV0YWRhdGEgb24gdGhlIG9wZXJhdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG9VcGRhdGUocHJldmlvdXM6IG9iamVjdCwgY3VycmVudDogb2JqZWN0LCBzdG9yZT86IEVudGl0eVN0b3JlPG9iamVjdD4sIG1ldGE/OiB7W2tleTogc3RyaW5nXTogYW55fSkge1xyXG4gICAgdGhpcy5hZGRPcGVyYXRpb24oe1xyXG4gICAgICBrZXk6IHRoaXMuZ2V0S2V5KGN1cnJlbnQpLFxyXG4gICAgICB0eXBlOiBFbnRpdHlPcGVyYXRpb25UeXBlLlVwZGF0ZSxcclxuICAgICAgcHJldmlvdXMsXHJcbiAgICAgIGN1cnJlbnQsXHJcbiAgICAgIHN0b3JlLFxyXG4gICAgICBtZXRhXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoc3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzdG9yZS51cGRhdGUoY3VycmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBkZWxldGUgb3BlcmF0aW9uIGFuZCBkZWxldGUgYW4gZW50aXR5IGZyb20gdGhlIHN0b3JlXHJcbiAgICogQHBhcmFtIHByZXZpb3VzIFRoZSBlbnRpdHkgYmVmb3JlIGRlbGV0ZVxyXG4gICAqIEBwYXJhbSBzdG9yZSBPcHRpb25hbDogVGhlIHN0b3JlIHRvIGRlbGV0ZSB0aGUgZW50aXR5IGZyb21cclxuICAgKiBAcGFyYW0gbWV0YSBPcHRpb25hbDogQW55IG1ldGFkYXRhIG9uIHRoZSBvcGVyYXRpb25cclxuICAgKi9cclxuICBwcml2YXRlIGRvRGVsZXRlKHByZXZpb3VzOiBvYmplY3QsIHN0b3JlPzogRW50aXR5U3RvcmU8b2JqZWN0PiwgbWV0YT86IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XHJcbiAgICB0aGlzLmFkZE9wZXJhdGlvbih7XHJcbiAgICAgIGtleTogdGhpcy5nZXRLZXkocHJldmlvdXMpLFxyXG4gICAgICB0eXBlOiBFbnRpdHlPcGVyYXRpb25UeXBlLkRlbGV0ZSxcclxuICAgICAgcHJldmlvdXMsXHJcbiAgICAgIGN1cnJlbnQ6IHVuZGVmaW5lZCxcclxuICAgICAgc3RvcmUsXHJcbiAgICAgIG1ldGFcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChzdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN0b3JlLmRlbGV0ZShwcmV2aW91cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgY29tbWl0dGVkIG9wZXJhdGlvbnMgZnJvbSBzdG9yZVxyXG4gICAqIEBwYXJhbSBvcGVyYXRpb25zIENvbW1pdGVkIG9wZXJhdGlvbnNcclxuICAgKiBAdG9kbyBSYWlzZSBldmVudCBhbmQgc3luY2hyb25pemUgc3RvcmVzP1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVzb2x2ZU9wZXJhdGlvbnMob3BlcmF0aW9uczogRW50aXR5T3BlcmF0aW9uW10pIHtcclxuICAgIHRoaXMub3BlcmF0aW9ucy5kZWxldGVNYW55KG9wZXJhdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gY29tbWl0IHN1Y2Nlc3MsIHJlc29sdmUgY29tbWl0ZWQgb3BlcmF0aW9ucyBhbmQgZXhpdCBjb21taXQgcGhhc2VcclxuICAgKiBAcGFyYW0gb3BlcmF0aW9ucyBDb21taXRlZCBvcGVyYXRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkNvbW1pdFN1Y2Nlc3Mob3BlcmF0aW9uczogRW50aXR5T3BlcmF0aW9uW10pIHtcclxuICAgIHRoaXMucmVzb2x2ZU9wZXJhdGlvbnMob3BlcmF0aW9ucyk7XHJcbiAgICB0aGlzLl9pbkNvbW1pdFBoYXNlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBjb21taXQgZXJyb3IsIGFib3J0IHRyYW5zYWN0aW9uXHJcbiAgICogQHBhcmFtIG9wZXJhdGlvbnMgQ29tbWl0ZWQgb3BlcmF0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Db21taXRFcnJvcihvcGVyYXRpb25zOiBFbnRpdHlPcGVyYXRpb25bXSkge1xyXG4gICAgdGhpcy5faW5Db21taXRQaGFzZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGFuIG9wZXJhdGlvbiB0byB0aGUgb3BlcmF0aW9ucyBzdG9yZVxyXG4gICAqIEBwYXJhbSBvcGVyYXRpb24gT3BlcmF0aW9uIHRvIGFkZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkT3BlcmF0aW9uKG9wZXJhdGlvbjogRW50aXR5T3BlcmF0aW9uKSB7XHJcbiAgICB0aGlzLmNoZWNrSW5Db21taXRQaGFzZSgpO1xyXG5cclxuICAgIHRoaXMub3BlcmF0aW9ucy5pbnNlcnQob3BlcmF0aW9uKTtcclxuICAgIHRoaXMub3BlcmF0aW9ucy5zdGF0ZS51cGRhdGUob3BlcmF0aW9uLCB7YWRkZWQ6IHRydWV9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhbiBvcGVyYXRpb24gZnJvbSB0aGUgb3BlcmF0aW9ucyBzdG9yZVxyXG4gICAqIEBwYXJhbSBvcGVyYXRpb24gT3BlcmF0aW9uIHRvIHJlbW92ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlT3BlcmF0aW9uKG9wZXJhdGlvbjogRW50aXR5T3BlcmF0aW9uKSB7XHJcbiAgICB0aGlzLmNoZWNrSW5Db21taXRQaGFzZSgpO1xyXG5cclxuICAgIHRoaXMub3BlcmF0aW9ucy5kZWxldGUob3BlcmF0aW9uKTtcclxuICAgIHRoaXMub3BlcmF0aW9ucy5zdGF0ZS51cGRhdGUob3BlcmF0aW9uLCB7YWRkZWQ6IGZhbHNlfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGFueSBleGlzdGluZyBvcGVyYXRpb24gYW4gZW50aXR5XHJcbiAgICogQHBhcmFtIGVudGl0eSBFbnRpdHlcclxuICAgKiBAcmV0dXJucyBFaXRoZXIgYW4gaW5zZXJ0LCB1cGRhdGUgb3IgZGVsZXRlIG9wZXJhdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0T3BlcmF0aW9uQnlFbnRpdHkoZW50aXR5OiBvYmplY3QpOiBFbnRpdHlPcGVyYXRpb24ge1xyXG4gICAgcmV0dXJuIHRoaXMub3BlcmF0aW9ucy5nZXQodGhpcy5nZXRLZXkoZW50aXR5KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYWxsIHRoZSBvcGVyYXRpb25zIHRvIGNvbW1pdFxyXG4gICAqIEByZXR1cm5zIE9wZXJhdGlvbnMgdG8gY29tbWl0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRPcGVyYXRpb25zSW5Db21taXQoKTogRW50aXR5T3BlcmF0aW9uW10ge1xyXG4gICAgcmV0dXJuIHRoaXMub3BlcmF0aW9ucy5zdGF0ZVZpZXdcclxuICAgICAgLm1hbnlCeSgodmFsdWU6IHtlbnRpdHk6IEVudGl0eU9wZXJhdGlvbiwgc3RhdGU6IEVudGl0eU9wZXJhdGlvblN0YXRlfSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5zdGF0ZS5hZGRlZCA9PT0gdHJ1ZTtcclxuICAgICAgfSlcclxuICAgICAgLm1hcCgodmFsdWU6IHtlbnRpdHk6IEVudGl0eU9wZXJhdGlvbiwgc3RhdGU6IEVudGl0eU9wZXJhdGlvblN0YXRlfSkgPT4gdmFsdWUuZW50aXR5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIHRoZSB0cmFuc2FjdGlvbiBpcyBpbiB0aGUgY29tbWl0IHBoYXNlIGFuZCB0aHJvdyBhbiBlcnJvciBpZiBpdCBpc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY2hlY2tJbkNvbW1pdFBoYXNlKCkge1xyXG4gICAgaWYgKHRoaXMuaW5Db21taXRQaGFzZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgdHJhbnNhY3Rpb24gaXMgaW4gdGhlIGNvbW1pdCBwaGFzZS4gQ2Fubm90IGNvbXBsZXRlIHRoaXMgb3BlcmF0aW9uLicpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=