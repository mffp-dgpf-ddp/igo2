import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import { DomSanitizer } from '@angular/platform-browser';
import t from 'typy';
import { __decorate } from 'tslib';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IgoLanguageModule, MediaService, ActivityService } from '@igo2/core';
import { MatButtonModule, MatIconModule, MatTooltipModule, MatListModule, MatMenuModule, MatCardModule, MatDialogRef, MatDialog, MatDialogModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTableModule, MatSortModule, MatCheckboxModule, MatSidenav, MatProgressSpinnerModule, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DataSource, CdkTableModule } from '@angular/cdk/table';
import { ObjectUtils } from '@igo2/utils';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding, NgModule, Directive, ElementRef, HostListener, Pipe, Renderer2, Injectable, ViewContainerRef, ComponentFactoryResolver, Self, ViewChild, ContentChildren, defineInjectable, inject } from '@angular/core';
import { ReplaySubject, BehaviorSubject, combineLatest, of, fromEvent, Observable, merge, Subject } from 'rxjs';
import { debounceTime, map, skip, catchError, tap, filter, take, switchMap, distinctUntilChanged } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const EntityOperationType = {
    Insert: 'Insert',
    Update: 'Update',
    Delete: 'Delete',
};
/** @enum {string} */
const EntityTableColumnRenderer = {
    Default: 'Default',
    HTML: 'HTML',
    UnsanitizedHTML: 'UnsanitizedHTML',
    Icon: 'Icon',
    ButtonGroup: 'ButtonGroup',
};
/** @enum {string} */
const EntityTableScrollBehavior = {
    Auto: 'auto',
    Instant: 'instant',
    Smooth: 'smooth',
};
/** @enum {string} */
const EntityTableSelectionState = {
    None: 'None',
    All: 'All',
    Some: 'Some',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Get an entity's named property. Nested properties are supported
 * with the dotted notation. (i.e 'author.name')
 *
 * Note: this method is a 'best attempt' at getting an entity's property.
 * It fits the most common cases but you might need to explicitely define
 * a property getter when using an EntityStore, for example.
 * @param {?} entity Entity
 * @param {?} property Property name
 * @return {?} Property value
 */
function getEntityProperty(entity, property) {
    return t(entity, property).safeObject;
}
/**
 * Get an entity's id. An entity's id can be one of:
 * 'entity.meta.id', 'entity.meta.idProperty' or 'entity.id'.
 *
 * Note: See the note in the 'getEntityProperty' documentation.
 * @param {?} entity Entity
 * @return {?} Entity id
 */
function getEntityId(entity) {
    /** @type {?} */
    const meta = ((/** @type {?} */ (entity))).meta || {};
    return meta.id ? meta.id : getEntityProperty(entity, meta.idProperty || 'id');
}
/**
 * Get an entity's title. An entity's title can be one of:
 * 'entity.meta.title', 'entity.meta.titleProperty' or 'entity.title'.
 * @param {?} entity Entity
 * @return {?} Entity title
 */
function getEntityTitle(entity) {
    /** @type {?} */
    const meta = ((/** @type {?} */ (entity))).meta || {};
    return meta.title ? meta.title : getEntityProperty(entity, meta.titleProperty || 'title');
}
/**
 * Get an entity's HTML title. An entity's HTML title can be one of:
 * 'entity.meta.titleHtml', 'entity.meta.titleHtmlProperty' or 'entity.titleHtml'.
 * @param {?} entity Entity
 * @return {?} Entity HTML title
 */
function getEntityTitleHtml(entity) {
    /** @type {?} */
    const meta = ((/** @type {?} */ (entity))).meta || {};
    return meta.titleHtml ? meta.titleHtml : getEntityProperty(entity, meta.titleHtmlProperty || 'titleHtml');
}
/**
 * Get an entity's icon. An entity's icon can be one of:
 * 'entity.meta.icon', 'entity.meta.iconProperty' or 'entity.icon'.
 * @param {?} entity Entity
 * @return {?} Entity icon
 */
function getEntityIcon(entity) {
    /** @type {?} */
    const meta = ((/** @type {?} */ (entity))).meta || {};
    return meta.icon ? meta.icon : getEntityProperty(entity, meta.iconProperty || 'icon');
}
/**
 * Get an entity's revision.
 * @param {?} entity Entity
 * @return {?} Entity revision
 */
function getEntityRevision(entity) {
    /** @type {?} */
    const meta = ((/** @type {?} */ (entity))).meta || {};
    return meta.revision || 0;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class is used to track a store's entities state
 * @template E, S
 */
class EntityStateManager {
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
    set(entity, state$$1) {
        this.setMany([entity], state$$1);
    }
    /**
     * Set many entitie's state
     * @param {?} entities
     * @param {?} state State
     * @return {?}
     */
    setMany(entities, state$$1) {
        entities.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        (entity) => {
            this.index.set(this.getKey(entity), Object.assign({}, state$$1));
        }));
        this.next();
    }
    /**
     * Set state of all entities that already have a state. This is not
     * the same as setting the state of all the store's entities.
     * @param {?} state State
     * @return {?}
     */
    setAll(state$$1) {
        Array.from(this.index.keys()).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            this.index.set(key, Object.assign({}, state$$1));
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
            const state$$1 = Object.assign({}, this.get(entity), changes);
            this.index.set(this.getKey(entity), state$$1);
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
            const state$$1 = Object.assign({}, currentState, reversedChanges);
            this.index.set(this.getKey(entity), state$$1);
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
            const state$$1 = Object.assign({}, this.index.get(key), changes);
            this.index.set(key, state$$1);
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
            const state$$1 = this.index.get(key) || (/** @type {?} */ ({}));
            if (keys.indexOf(key) >= 0) {
                this.index.set(key, Object.assign({}, state$$1, changes));
            }
            else {
                this.index.set(key, Object.assign({}, state$$1, reverseChanges));
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An entity view streams entities from an observable source. These entities
 * can be filtered or sorted without affecting the source. A view can also
 * combine data from multiple sources, joined together.
 * @template E, V
 */
class EntityView {
    /**
     * @param {?} source$
     */
    constructor(source$) {
        this.source$ = source$;
        /**
         * Observable stream of values
         */
        this.values$ = new BehaviorSubject([]);
        /**
         * Whether this view has been lifted
         */
        this.lifted = false;
        /**
         * Join clauses
         */
        this.joins = [];
        /**
         * Observable of a filter clause
         */
        this.filter$ = new BehaviorSubject(undefined);
        /**
         * Observable of a sort clause
         */
        this.sort$ = new BehaviorSubject(undefined);
    }
    /**
     * Number of entities
     * @return {?}
     */
    get count() { return this.values$.value.length; }
    /**
     * Whether there are entities in the view
     * @return {?}
     */
    get empty() { return this.count === 0; }
    /**
     * Get all the values
     * @return {?} Array of values
     */
    all() {
        return this.values$.value;
    }
    /**
     * Observe all the values
     * @return {?} Observable of values
     */
    all$() {
        return this.values$;
    }
    /**
     * Get the first value that respects a criteria
     * @param {?} clause
     * @return {?} A value
     */
    firstBy(clause) {
        return this.values$.value.find(clause);
    }
    /**
     * Observe the first value that respects a criteria
     * @param {?} clause
     * @return {?} Observable of a value
     */
    firstBy$(clause) {
        return this.values$.pipe(map((/**
         * @param {?} values
         * @return {?}
         */
        (values) => values.find(clause))));
    }
    /**
     * Get all the values that respect a criteria
     * @param {?} clause
     * @return {?} Array of values
     */
    manyBy(clause) {
        return this.values$.value.filter(clause);
    }
    /**
     * Observe all the values that respect a criteria
     * @param {?} clause
     * @return {?} Observable of values
     */
    manyBy$(clause) {
        return this.values$.pipe(map((/**
         * @param {?} values
         * @return {?}
         */
        (values) => values.filter(clause))));
    }
    /**
     * Clear the filter and sort and unsubscribe from the source
     * @return {?}
     */
    clear() {
        this.filter(undefined);
        this.sort(undefined);
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this.values$$ !== undefined) {
            this.values$$.unsubscribe();
        }
        this.clear();
    }
    /**
     * Join another source to the stream (chainable)
     * @param {?} clause Join clause
     * @return {?} The view
     */
    join(clause) {
        if (this.lifted === true) {
            throw new Error('This view has already been lifted, therefore, no join is allowed.');
        }
        this.joins.push(clause);
        return this;
    }
    /**
     * Filter values (chainable)
     * @param {?} clause Filter clause
     * @return {?} The view
     */
    filter(clause) {
        this.filter$.next(clause);
        return this;
    }
    /**
     * Sort values (chainable)
     * @param {?} clause
     * @return {?} The view
     */
    sort(clause) {
        this.sort$.next(clause);
        return this;
    }
    /**
     * Create the final observable
     * @return {?} Observable
     */
    lift() {
        this.lifted = true;
        /** @type {?} */
        const source$ = this.joins.length > 0 ? this.liftJoinedSource() : this.liftSource();
        this.values$$ = combineLatest(source$, this.filter$, this.sort$)
            .pipe(skip(1), debounceTime(50))
            .subscribe((/**
         * @param {?} bunch
         * @return {?}
         */
        (bunch) => {
            const [values, filter$$1, sort] = bunch;
            this.values$.next(this.processValues(values, filter$$1, sort));
        }));
    }
    /**
     * Create the source observable when no joins are defined
     * @private
     * @return {?} Observable
     */
    liftSource() {
        return (/** @type {?} */ ((/** @type {?} */ (this.source$))));
    }
    /**
     * Create the source observable when joins are defined
     * @private
     * @return {?} Observable
     */
    liftJoinedSource() {
        /** @type {?} */
        const sources$ = [this.source$, combineLatest(...this.joins.map((/**
             * @param {?} join
             * @return {?}
             */
            (join) => join.source)))];
        return combineLatest(...sources$)
            .pipe(map((/**
         * @param {?} bunch
         * @return {?}
         */
        (bunch) => {
            const [entities, joinData] = bunch;
            return entities.reduce((/**
             * @param {?} values
             * @param {?} entity
             * @return {?}
             */
            (values, entity) => {
                /** @type {?} */
                const value = this.computeJoinedValue(entity, joinData);
                if (value !== undefined) {
                    values.push(value);
                }
                return values;
            }), []);
        })));
    }
    /**
     * Apply joins to a source's entity and return the final value
     * @private
     * @param {?} entity
     * @param {?} joinData
     * @return {?} Final value
     */
    computeJoinedValue(entity, joinData) {
        /** @type {?} */
        let value = (/** @type {?} */ (entity));
        /** @type {?} */
        let joinIndex = 0;
        while (value !== undefined && joinIndex < this.joins.length) {
            value = this.joins[joinIndex].reduce(value, joinData[joinIndex]);
            joinIndex += 1;
        }
        return (/** @type {?} */ (value));
    }
    /**
     * Filter and sort values before streaming them
     * @private
     * @param {?} values Values
     * @param {?} filter Filter clause
     * @param {?} sort Sort clause
     * @return {?} Filtered and sorted values
     */
    processValues(values, filter$$1, sort) {
        values = values.slice(0);
        values = this.filterValues(values, filter$$1);
        values = this.sortValues(values, sort);
        return values;
    }
    /**
     * Filter values
     * @private
     * @param {?} values Values
     * @param {?} clause
     * @return {?} Filtered values
     */
    filterValues(values, clause) {
        if (clause === undefined) {
            return values;
        }
        return values.filter((/**
         * @param {?} value
         * @return {?}
         */
        (value) => clause(value)));
    }
    /**
     * Sort values
     * @private
     * @param {?} values Values
     * @param {?} clause
     * @return {?} Sorted values
     */
    sortValues(values, clause) {
        if (clause === undefined) {
            return values;
        }
        return values.sort((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => {
            return ObjectUtils.naturalCompare(clause.valueAccessor(v1), clause.valueAccessor(v2), clause.direction);
        }));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An entity store class holds any number of entities
 * as well as their state. It can be observed, filtered and sorted and
 * provides methods to insert, update or delete entities.
 * @template E, S
 */
class EntityStore {
    /**
     * @param {?} entities
     * @param {?=} options
     */
    constructor(entities, options = {}) {
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
            (entity) => {
                return { entity, state: this.state.get(entity) };
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
    /**
     * @return {?}
     */
    get count() { return this.count$.value; }
    /**
     * @return {?}
     */
    get empty() { return this.empty$.value; }
    /**
     * Store index
     * @return {?}
     */
    get index() { return this._index; }
    /**
     * Store index
     * @return {?}
     */
    get pristine() { return this._pristine; }
    /**
     * Get an entity from the store by key
     * @param {?} key Key
     * @return {?} Entity
     */
    get(key) {
        return this.index.get(key);
    }
    /**
     * Get all entities in the store
     * @return {?} Array of entities
     */
    all() {
        return this.entities$.value;
    }
    /**
     * Set this store's entities
     * @param {?} entities Entities
     * @param {?=} pristine
     * @return {?}
     */
    load(entities, pristine = true) {
        this._index = this.generateIndex(entities);
        this._pristine = pristine;
        this.next();
    }
    /**
     * Clear the store's entities but keep the state and views intact.
     * Views won't return any data but future data will be subject to the
     * current views filter and sort
     * @return {?}
     */
    softClear() {
        if (this.index && this.index.size > 0) {
            this.index.clear();
            this._pristine = true;
            this.next();
        }
        else if (this.index) {
            this.updateCount();
        }
    }
    /**
     * Clear the store's entities, state and views
     * @return {?}
     */
    clear() {
        this.stateView.clear();
        this.view.clear();
        this.state.clear();
        this.softClear();
    }
    /**
     * @return {?}
     */
    destroy() {
        this.stateView.destroy();
        this.view.destroy();
        this.clear();
    }
    /**
     * Insert an entity into the store
     * @param {?} entity Entity
     * @return {?}
     */
    insert(entity) {
        this.insertMany([entity]);
    }
    /**
     * Insert many entities into the store
     * @param {?} entities Entities
     * @return {?}
     */
    insertMany(entities) {
        entities.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        (entity) => this.index.set(this.getKey(entity), entity)));
        this._pristine = false;
        this.next();
    }
    /**
     * Update or insert an entity into the store
     * @param {?} entity Entity
     * @return {?}
     */
    update(entity) {
        this.updateMany([entity]);
    }
    /**
     * Update or insert many entities into the store
     * @param {?} entities Entities
     * @return {?}
     */
    updateMany(entities) {
        entities.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        (entity) => this.index.set(this.getKey(entity), entity)));
        this._pristine = false;
        this.next();
    }
    /**
     * Delete an entity from the store
     * @param {?} entity Entity
     * @return {?}
     */
    delete(entity) {
        this.deleteMany([entity]);
    }
    /**
     * Delete many entities from the store
     * @param {?} entities Entities
     * @return {?}
     */
    deleteMany(entities) {
        entities.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        (entity) => this.index.delete(this.getKey(entity))));
        this._pristine = false;
        this.next();
    }
    /**
     * Generate a complete index of all the entities
     * @private
     * @param {?} entities Entities
     * @return {?} Index
     */
    generateIndex(entities) {
        /** @type {?} */
        const entries = entities.map((/**
         * @param {?} entity
         * @return {?}
         */
        (entity) => [this.getKey(entity), entity]));
        return new Map((/** @type {?} */ (entries)));
    }
    /**
     * Push the index's entities into the entities$ observable
     * @private
     * @return {?}
     */
    next() {
        this.entities$.next(Array.from(this.index.values()));
        this.updateCount();
    }
    /**
     * Update the store's count and empty
     * @private
     * @return {?}
     */
    updateCount() {
        /** @type {?} */
        const count = this.index.size;
        /** @type {?} */
        const empty = count === 0;
        this.count$.next(count);
        this.empty$.next(empty);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
class EntityStoreWatcher {
    /**
     * @param {?=} store
     * @param {?=} cdRef
     */
    constructor(store, cdRef) {
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
    destroy() {
        this.setChangeDetector(undefined);
        this.setStore(undefined);
    }
    /**
     * Bind this workspace to a store and start watching for changes
     * @param {?=} store Entity store
     * @return {?}
     */
    setStore(store) {
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
    }
    /**
     * Bind this workspace to a component's change detector
     * @param {?=} cdRef Change detector
     * @return {?}
     */
    setChangeDetector(cdRef) {
        this.cdRef = cdRef;
    }
    /**
     * Set up observers on a store's entities and their state
     * @private
     * @return {?}
     */
    setupObservers() {
        this.teardownObservers();
        this.entities$$ = this.store.entities$
            .subscribe((/**
         * @param {?} entities
         * @return {?}
         */
        (entities) => this.onEntitiesChange(entities)));
        this.state$$ = this.store.state.change$
            .pipe(skip(1))
            .subscribe((/**
         * @return {?}
         */
        () => this.onStateChange()));
    }
    /**
     * Teardown store observers
     * @private
     * @return {?}
     */
    teardownObservers() {
        if (this.entities$$ !== undefined) {
            this.entities$$.unsubscribe();
        }
        if (this.state$$ !== undefined) {
            this.state$$.unsubscribe();
        }
        this.entities$$ = undefined;
        this.state$$ = undefined;
    }
    /**
     * When the entities change, always trigger the changes detection
     * @private
     * @param {?} entities
     * @return {?}
     */
    onEntitiesChange(entities) {
        this.detectChanges();
    }
    /**
     * When the entities state change, trigger the change detection
     * only if the component has not handled these changes yet. For example,
     * the component might have initiated thoses changes itself.
     * @private
     * @return {?}
     */
    onStateChange() {
        /** @type {?} */
        let changesDetected = false;
        /** @type {?} */
        const storeIndex = this.store.state.index;
        /** @type {?} */
        const innerIndex = this.innerStateIndex;
        if (storeIndex.size !== innerIndex.size) {
            changesDetected = this.detectChanges();
        }
        /** @type {?} */
        const storeKeys = Array.from(storeIndex.keys());
        for (const key of storeKeys) {
            /** @type {?} */
            const storeValue = storeIndex.get(key);
            /** @type {?} */
            const innerValue = innerIndex.get(key);
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
    /**
     * Trigger the change detection of the workspace is bound to a change detector
     * @private
     * @return {?}
     */
    detectChanges() {
        if (this.cdRef !== undefined) {
            this.cdRef.detectChanges();
        }
        return true;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class holds a reference to the insert, update and delete
 * operations performed on a store. This is useful to commit
 * these operations in a single pass or to cancel them.
 */
class EntityTransaction {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EntitySelectorComponent {
    /**
     * @param {?} cdRef
     */
    constructor(cdRef) {
        this.cdRef = cdRef;
        /**
         * The selected entity
         * \@internal
         */
        this.selected$ = new BehaviorSubject(undefined);
        /**
         * Wheter selecting many entities is allowed
         */
        this.many = false;
        /**
         * Title accessor
         */
        this.titleAccessor = getEntityTitle;
        /**
         * Text to display when nothing is selected
         */
        this.emptyText = undefined;
        /**
         * Event emitted when the selection changes
         */
        this.selectedChange = new EventEmitter();
    }
    /**
     * Create a store watcher and subscribe to the selected entity
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
        this.selected$$ = this.store.stateView
            .manyBy$((/**
         * @param {?} record
         * @return {?}
         */
        (record) => record.state.selected === true))
            .subscribe((/**
         * @param {?} records
         * @return {?}
         */
        (records) => {
            /** @type {?} */
            const entities = records.map((/**
             * @param {?} record
             * @return {?}
             */
            (record) => record.entity));
            if (this.many === true) {
                this.selected$.next(entities);
            }
            else {
                /** @type {?} */
                const entity = entities.length > 0 ? entities[0] : undefined;
                this.selected$.next(entity);
            }
        }));
    }
    /**
     * Unsubscribe to the selected entity and destroy the store watcher
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.watcher.destroy();
        this.selected$$.unsubscribe();
    }
    /**
     * On selection change, update the store's state and emit an event
     * \@internal
     * @param {?} event
     * @return {?}
     */
    onSelectionChange(event) {
        /** @type {?} */
        const entities = event.value instanceof Array ? event.value : [event.value];
        if (entities.length === 0) {
            this.store.state.updateAll({ selected: false });
        }
        else {
            this.store.state.updateMany(entities, { selected: true }, true);
        }
        this.selectedChange.emit({ selected: true, value: event.value });
    }
}
EntitySelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-entity-selector',
                template: "<mat-form-field class=\"igo-entity-selector\">\r\n  <mat-select\r\n    [value]=\"selected$ | async\"\r\n    [multiple]=\"many\"\r\n    [placeholder]=\"placeholder\"\r\n    (selectionChange)=\"onSelectionChange($event)\">\r\n    <mat-option *ngIf=\"emptyText !== undefined\">{{emptyText}}</mat-option>\r\n    <ng-template ngFor let-entity [ngForOf]=\"store.view.all$() | async\">\r\n      <mat-option [value]=\"entity\">\r\n        {{titleAccessor(entity)}}\r\n      </mat-option>\r\n    </ng-template>\r\n  </mat-select>\r\n</mat-form-field>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["mat-form-field{width:100%}"]
            }] }
];
/** @nocollapse */
EntitySelectorComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
EntitySelectorComponent.propDecorators = {
    store: [{ type: Input }],
    many: [{ type: Input }],
    titleAccessor: [{ type: Input }],
    emptyText: [{ type: Input }],
    placeholder: [{ type: Input }],
    selectedChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EntityTableComponent {
    /**
     * @param {?} cdRef
     */
    constructor(cdRef) {
        this.cdRef = cdRef;
        /**
         * Reference to the column renderer types
         * \@internal
         */
        this.entityTableColumnRenderer = EntityTableColumnRenderer;
        /**
         * Reference to the selection states
         * \@internal
         */
        this.entityTableSelectionState = EntityTableSelectionState;
        /**
         * Observable of the selection,s state
         * \@internal
         */
        this.selectionState$ = new BehaviorSubject(undefined);
        /**
         * Scroll behavior on selection
         */
        this.scrollBehavior = EntityTableScrollBehavior.Auto;
        /**
         * Event emitted when an entity (row) is clicked
         */
        this.entityClick = new EventEmitter();
        /**
         * Event emitted when an entity (row) is selected
         */
        this.entitySelectChange = new EventEmitter();
    }
    /**
     * Table headers
     * \@internal
     * @return {?}
     */
    get headers() {
        /** @type {?} */
        let columns = this.template.columns
            .filter((/**
         * @param {?} column
         * @return {?}
         */
        (column) => column.visible !== false))
            .map((/**
         * @param {?} column
         * @return {?}
         */
        (column) => column.name));
        if (this.selectionCheckbox === true) {
            columns = ['selectionCheckbox'].concat(columns);
        }
        return columns;
    }
    /**
     * Data source consumable by the underlying material table
     * \@internal
     * @return {?}
     */
    get dataSource() { return this.store.view.all$(); }
    /**
     * Whether selection is supported
     * \@internal
     * @return {?}
     */
    get selection() { return this.template.selection || false; }
    /**
     * Whether a selection checkbox should be displayed
     * \@internal
     * @return {?}
     */
    get selectionCheckbox() { return this.template.selectionCheckbox || false; }
    /**
     * Whether selection many entities should eb supported
     * \@internal
     * @return {?}
     */
    get selectMany() { return this.template.selectMany || false; }
    /**
     * Whether selection many entities should eb supported
     * \@internal
     * @return {?}
     */
    get fixedHeader() { return this.template.fixedHeader === undefined ? true : this.template.fixedHeader; }
    /**
     * Track the selection state to properly display the selection checkboxes
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.selection$$ = this.store.stateView
            .manyBy$((/**
         * @param {?} record
         * @return {?}
         */
        (record) => record.state.selected === true))
            .subscribe((/**
         * @param {?} records
         * @return {?}
         */
        (records) => {
            this.selectionState$.next(this.computeSelectionState(records));
        }));
    }
    /**
     * When the store change, create a new watcher
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const store = changes.store;
        if (store && store.currentValue !== store.previousValue) {
            if (this.watcher !== undefined) {
                this.watcher.destroy();
            }
            this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
        }
    }
    /**
     * Unbind the store watcher
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        if (this.watcher !== undefined) {
            this.watcher.destroy();
        }
        this.selection$$.unsubscribe();
    }
    /**
     * Trigger a refresh of thre table. This can be useful when
     * the data source doesn't emit a new value but for some reason
     * the records need an update.
     * \@internal
     * @return {?}
     */
    refresh() {
        this.cdRef.detectChanges();
    }
    /**
     * On sort, sort the store
     * \@internal
     * @param {?} event Sort event
     * @return {?}
     */
    onSort(event) {
        /** @type {?} */
        const direction = event.direction;
        /** @type {?} */
        const column = this.template.columns
            .find((/**
         * @param {?} c
         * @return {?}
         */
        (c) => c.name === event.active));
        if (direction === 'asc' || direction === 'desc') {
            this.store.view.sort({
                valueAccessor: (/**
                 * @param {?} entity
                 * @return {?}
                 */
                (entity) => this.getValue(entity, column)),
                direction
            });
        }
        else {
            this.store.view.sort(undefined);
        }
    }
    /**
     * When an entity is clicked, emit an event
     * \@internal
     * @param {?} entity Entity
     * @return {?}
     */
    onRowClick(entity) {
        this.entityClick.emit(entity);
    }
    /**
     * When an entity is selected, select it in the store and emit an event. Even if
     * "many" is set to true, this method always select a single, exclusive row. Selecting
     * multiple rows should be achieved by using the checkboxes.
     * \@internal
     * @param {?} entity Entity
     * @return {?}
     */
    onRowSelect(entity) {
        if (this.selection === false) {
            return;
        }
        // Selecting a
        this.store.state.update(entity, { selected: true }, true);
        this.entitySelectChange.emit({ added: [entity] });
    }
    /**
     * Select or unselect all rows at once. On select, emit an event.
     * \@internal
     * @param {?} toggle Select or unselect
     * @return {?}
     */
    onToggleRows(toggle) {
        if (this.selection === false) {
            return;
        }
        this.store.state.updateAll({ selected: toggle });
        if (toggle === true) {
            this.entitySelectChange.emit({ added: [this.store.view.all()] });
        }
    }
    /**
     * When an entity is toggled, select or unselect it in the store. On select,
     * emit an event.
     * \@internal
     * @param {?} toggle Select or unselect
     * @param {?} entity Entity
     * @return {?}
     */
    onToggleRow(toggle, entity) {
        if (this.selection === false) {
            return;
        }
        /** @type {?} */
        const exclusive = toggle === true && !this.selectMany;
        this.store.state.update(entity, { selected: toggle }, exclusive);
        if (toggle === true) {
            this.entitySelectChange.emit({ added: [entity] });
        }
    }
    /**
     * Compute the selection state
     * \@internal
     * @private
     * @param {?} selectedRecords
     * @return {?} Whether all, some or no rows are selected
     */
    computeSelectionState(selectedRecords) {
        /** @type {?} */
        const states = EntityTableSelectionState;
        /** @type {?} */
        const selectionCount = selectedRecords.length;
        return selectionCount === 0 ?
            states.None :
            (selectionCount === this.store.view.count ? states.All : states.Some);
    }
    /**
     * Whether a column is sortable
     * \@internal
     * @param {?} column Column
     * @return {?} True if a column is sortable
     */
    columnIsSortable(column) {
        /** @type {?} */
        let sortable = column.sort;
        if (sortable === undefined) {
            sortable = this.template.sort === undefined ? false : this.template.sort;
        }
        return sortable;
    }
    /**
     * Whether a row is should be selected based on the underlying entity state
     * \@internal
     * @param {?} entity Entity
     * @return {?} True if a row should be selected
     */
    rowIsSelected(entity) {
        /** @type {?} */
        const state$$1 = this.store.state.get(entity);
        return state$$1.selected ? state$$1.selected : false;
    }
    /**
     * Method to access an entity's values
     * \@internal
     * @param {?} entity Entity
     * @param {?} column Column
     * @return {?} Any value
     */
    getValue(entity, column) {
        if (column.valueAccessor !== undefined) {
            return column.valueAccessor(entity);
        }
        if (this.template.valueAccessor !== undefined) {
            return this.template.valueAccessor(entity, column.name);
        }
        return this.store.getProperty(entity, column.name);
    }
    /**
     * Return the type of renderer of a column
     * \@internal
     * @param {?} column Column
     * @return {?} Renderer type
     */
    getColumnRenderer(column) {
        if (column.renderer !== undefined) {
            return column.renderer;
        }
        return EntityTableColumnRenderer.Default;
    }
    /**
     * Return the table ngClass
     * \@internal
     * @return {?} ngClass
     */
    getTableClass() {
        return {
            'igo-entity-table-with-selection': this.selection
        };
    }
    /**
     * Return a header ngClass
     * \@internal
     * @return {?} ngClass
     */
    getHeaderClass() {
        /** @type {?} */
        const func = this.template.headerClassFunc;
        if (func instanceof Function) {
            return func();
        }
        return {};
    }
    /**
     * Return a row ngClass
     * \@internal
     * @param {?} entity Entity
     * @return {?} ngClass
     */
    getRowClass(entity) {
        /** @type {?} */
        const func = this.template.rowClassFunc;
        if (func instanceof Function) {
            return func(entity);
        }
        return {};
    }
    /**
     * Return a row ngClass
     * \@internal
     * @param {?} entity Entity
     * @param {?} column Column
     * @return {?} ngClass
     */
    getCellClass(entity, column) {
        /** @type {?} */
        const cls = {};
        /** @type {?} */
        const tableFunc = this.template.cellClassFunc;
        if (tableFunc instanceof Function) {
            Object.assign(cls, tableFunc(entity, column));
        }
        /** @type {?} */
        const columnFunc = column.cellClassFunc;
        if (columnFunc instanceof Function) {
            Object.assign(cls, columnFunc(entity));
        }
        return cls;
    }
    /**
     * When a button is clicked
     * \@internal
     * @param {?} clickFunc
     * @param {?} entity Entity
     * @return {?}
     */
    onButtonClick(clickFunc, entity) {
        if (typeof clickFunc === 'function') {
            clickFunc(entity);
        }
    }
}
EntityTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-entity-table',
                template: "<div class=\"table-container\">\r\n  <table\r\n    mat-table\r\n    matSort\r\n    [ngClass]=\"getTableClass()\"\r\n    [dataSource]=\"dataSource\"\r\n    (matSortChange)=\"onSort($event)\">\r\n\r\n    <ng-container matColumnDef=\"selectionCheckbox\" class=\"mat-cell-checkbox\">\r\n      <th mat-header-cell *matHeaderCellDef>\r\n        <ng-container *ngIf=\"selectMany\">\r\n          <ng-container *ngIf=\"selectionState$ | async as selectionState\">\r\n            <mat-checkbox (change)=\"onToggleRows($event.checked)\"\r\n                          [checked]=\"selectionState === entityTableSelectionState.All\"\r\n                          [indeterminate]=\"selectionState === entityTableSelectionState.Some\">\r\n            </mat-checkbox>\r\n          </ng-container>\r\n        </ng-container>\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let entity\">\r\n        <mat-checkbox (click)=\"$event.stopPropagation()\"\r\n                      (change)=\"onToggleRow($event.checked, entity)\"\r\n                      [checked]=\"rowIsSelected(entity)\">\r\n        </mat-checkbox>\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container [matColumnDef]=\"column.name\" *ngFor=\"let column of template.columns\">\r\n      <ng-container *ngIf=\"columnIsSortable(column)\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n          {{column.title}}\r\n        </th>\r\n      </ng-container>\r\n\r\n      <ng-container *ngIf=\"!columnIsSortable(column)\">\r\n        <th mat-header-cell *matHeaderCellDef>\r\n          {{column.title}}\r\n        </th>\r\n      </ng-container>\r\n\r\n      <ng-container *ngIf=\"getColumnRenderer(column) as columnRenderer\">\r\n        <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.Default\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\">\r\n              {{getValue(entity, column)}}\r\n            </td>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.HTML\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\"\r\n              [innerHTML]=\"getValue(entity, column)\">\r\n            </td>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.UnsanitizedHTML\">\r\n              <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n                [ngClass]=\"getCellClass(entity, column)\"\r\n                [innerHTML]=\"getValue(entity, column) | sanitizeHtml\">\r\n              </td>\r\n            </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.Icon\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\">\r\n              <mat-icon svgIcon=\"{{getValue(entity, column)}}\"></mat-icon>\r\n            </td>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.ButtonGroup\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\">\r\n              <button *ngFor=\"let button of getValue(entity, column)\"\r\n                mat-mini-fab\r\n                igoStopPropagation\r\n                [color]=\"button.color\"\r\n                (click)=\"onButtonClick(button.click, entity)\">\r\n                <mat-icon svgIcon=\"{{button.icon}}\"></mat-icon>\r\n              </button>\r\n            </td>\r\n          </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n\r\n    <tr\r\n      mat-header-row\r\n      *matHeaderRowDef=\"headers; sticky: fixedHeader;\"\r\n      [ngClass]=\"getHeaderClass()\">\r\n    </tr>\r\n    <tr\r\n      mat-row\r\n      igoEntityTableRow\r\n      *matRowDef=\"let entity; columns: headers;\"\r\n      [scrollBehavior]=\"scrollBehavior\"\r\n      [ngClass]=\"getRowClass(entity)\"\r\n      [selection]=\"selection\"\r\n      [selected]=\"rowIsSelected(entity)\"\r\n      (select)=\"onRowSelect(entity)\"\r\n      (click)=\"onRowClick(entity)\">\r\n    </tr>\r\n\r\n  </table>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{width:100%;height:100%;display:block}:host.table-compact ::ng-deep .mat-checkbox .mat-checkbox-ripple,:host.table-compact tr.mat-header-row{height:36px}:host.table-compact ::ng-deep .mat-checkbox .mat-checkbox-ripple,:host.table-compact tr.mat-row{height:28px}.table-container{display:flex;flex-direction:column;height:100%;overflow:auto;flex:1 1 auto}.mat-cell-text{overflow:hidden;word-wrap:break-word}entity-table table.igo-entity-table-with-selection tr:hover{-o-box-shadow:2px 0 2px 0 #ddd;box-shadow:2px 0 2px 0 #ddd;cursor:pointer}table button{margin:7px}"]
            }] }
];
/** @nocollapse */
EntityTableComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
EntityTableComponent.propDecorators = {
    store: [{ type: Input }],
    template: [{ type: Input }],
    scrollBehavior: [{ type: Input }],
    entityClick: [{ type: Output }],
    entitySelectChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const ActionbarMode = {
    Dock: 'dock',
    Overlay: 'overlay',
    Context: 'context',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The class is a specialized version of an EntityStore that stores
 * actions.
 */
class ActionStore extends EntityStore {
    /**
     * Update actions availability. That means disabling or enabling some
     * actions based on the conditions they define.
     * @return {?}
     */
    updateActionsAvailability() {
        /** @type {?} */
        const availables = [];
        /** @type {?} */
        const unavailables = [];
        this.entities$.value.forEach((/**
         * @param {?} action
         * @return {?}
         */
        (action) => {
            /** @type {?} */
            const conditions = action.conditions || [];
            /** @type {?} */
            const args = action.conditionArgs || [];
            /** @type {?} */
            const available = conditions.every((/**
             * @param {?} condition
             * @return {?}
             */
            (condition) => {
                return condition(...args);
            }));
            available ? availables.push(action) : unavailables.push(action);
        }));
        if (unavailables.length > 0) {
            this.state.updateMany(unavailables, {
                disabled: true,
                active: false
            });
        }
        if (availables.length > 0) {
            this.state.updateMany(availables, {
                disabled: false
            });
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A list of action buttons.
 * This component can be displayed in one of two way: 'dock' or 'overlay'
 */
class ActionbarComponent {
    /**
     * @param {?} cdRef
     * @param {?} overlay
     */
    constructor(cdRef, overlay) {
        this.cdRef = cdRef;
        this.overlay = overlay;
        /**
         * Reference to the ActionbarMode enum for use in the template
         * \@internal
         */
        this.actionbarMode = ActionbarMode;
        /**
         * Whether the actionbar is collapsed (Dock mode)
         * \@internal
         */
        this.collapsed = false;
        /**
         * Toggle collapse action (Dock)
         * \@internal
         */
        this.toggleCollapseAction = {
            id: 'actionbar_toggle',
            icon: 'dots-vertical',
            handler: (/**
             * @return {?}
             */
            () => {
                this.collapsed = !this.collapsed;
            })
        };
        /**
         * Actionbar mode
         */
        this.mode = ActionbarMode.Dock;
        /**
         * Whether a toggle button should be displayed (Dock mode)
         */
        this.withToggleButton = false;
        /**
         * Whether a the actionbar should display buttons horizontally
         */
        this.horizontal = false;
        /**
         * Color
         */
        this.color = 'default';
        /**
         * Whether action titles are displayed
         */
        this.withTitle = true;
        /**
         * Whether action icons are displayed
         */
        this.withIcon = true;
        /**
         * Overlay X position
         */
        this.xPosition = 'before';
        /**
         * Overlay X position
         */
        this.yPosition = 'above';
        this._overlayClass = '';
        /**
         * Function to add class to item actionbar
         */
        this.itemClassFunc = ActionbarComponent.defaultItemClassFunc;
    }
    /**
     * Class to add to the actionbar overlay
     * @param {?} value
     * @return {?}
     */
    set overlayClass(value) {
        this._overlayClass = value;
    }
    /**
     * @return {?}
     */
    get overlayClass() {
        return [this._overlayClass, 'igo-actionbar-overlay'].join(' ');
    }
    /**
     * @ignore
     * @return {?}
     */
    get withTitleClass() {
        return this.withTitle;
    }
    /**
     * @ignore
     * @return {?}
     */
    get withIconClass() {
        return this.withIcon;
    }
    /**
     * @ignore
     * @return {?}
     */
    get horizontalClass() {
        return this.horizontal;
    }
    /**
     * @param {?} action
     * @return {?}
     */
    static defaultItemClassFunc(action) {
        return {};
    }
    /**
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const store = changes.store;
        if (store && store.currentValue !== store.previousValue) {
            if (this.watcher !== undefined) {
                this.watcher.destroy();
            }
            this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
        }
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.watcher.destroy();
    }
    /**
     * Invoke the action handler
     * \@internal
     * @param {?} action
     * @return {?}
     */
    onTriggerAction(action) {
        /** @type {?} */
        const args = action.args || [];
        action.handler(...args);
    }
}
ActionbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-actionbar',
                template: "<mat-list *ngIf=\"mode === actionbarMode.Dock\">\r\n\r\n  <igo-actionbar-item\r\n    *ngIf=\"withToggleButton\"\r\n    color=\"accent\"\r\n    [withTitle]=\"false\"\r\n    [withIcon]=\"true\"\r\n    [color]=\"color\"\r\n    [disabled]=\"store.view.empty\"\r\n    [action]=\"toggleCollapseAction\"\r\n    (trigger)=\"onTriggerAction(toggleCollapseAction)\">\r\n  </igo-actionbar-item>\r\n\r\n  <ng-template *ngIf=\"!collapsed\" ngFor let-action [ngForOf]=\"store.view.all$() | async\">\r\n    <igo-actionbar-item\r\n      [ngClass]=\"itemClassFunc(action)\"\r\n      color=\"accent\"\r\n      [withTitle]=\"withTitle\"\r\n      [withIcon]=\"withIcon\"\r\n      [color]=\"color\"\r\n      [disabled]=\"store.state.get(action).disabled\"\r\n      [action]=\"action\"\r\n      (trigger)=\"onTriggerAction(action)\">\r\n    </igo-actionbar-item>\r\n  </ng-template>\r\n</mat-list>\r\n\r\n<div *ngIf=\"mode === actionbarMode.Overlay\">\r\n  <button\r\n    mat-icon-button\r\n    [matMenuTriggerFor]=\"actionbarMenu\"\r\n    [disabled]=\"store.view.empty\">\r\n    <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n  </button>\r\n\r\n  <mat-menu\r\n    #actionbarMenu=\"matMenu\"\r\n    class=\"igo-compact-menu igo-no-min-width-menu\"\r\n    overlapTrigger=\"true\"\r\n    [xPosition]=\"xPosition\"\r\n    [yPosition]=\"yPosition\"\r\n    [class]=\"overlayClass\">\r\n\r\n    <mat-list>\r\n      <ng-template ngFor let-action [ngForOf]=\"store.view.all$() | async\">\r\n        <igo-actionbar-item\r\n          color=\"accent\"\r\n          [withTitle]=\"withTitle\"\r\n          [withIcon]=\"withIcon\"\r\n          [color]=\"color\"\r\n          [disabled]=\"store.state.get(action).disabled\"\r\n          [action]=\"action\"\r\n          (trigger)=\"onTriggerAction(action)\">\r\n        </igo-actionbar-item>\r\n      </ng-template>\r\n    </mat-list>\r\n  </mat-menu>\r\n</div>\r\n<mat-card *ngIf=\"mode === actionbarMode.Context\" class=\"context-menu-card mat-elevation-z4\">\r\n  <mat-list>\r\n      <ng-template ngFor let-action [ngForOf]=\"store.view.all$() | async\">\r\n          <igo-actionbar-item\r\n            color=\"accent\"\r\n            [withTitle]=\"withTitle\"\r\n            [withIcon]=\"withIcon\"\r\n            [color]=\"color\"\r\n            [disabled]=\"store.state.get(action).disabled\"\r\n            [action]=\"action\"\r\n            (trigger)=\"onTriggerAction(action)\">\r\n          </igo-actionbar-item>\r\n        <br/>\r\n      </ng-template>\r\n  </mat-list>\r\n</mat-card>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;height:100%;overflow:auto;position:relative}button{margin:4px}mat-list{padding-top:0}:host.horizontal{max-width:100%;overflow:hidden}:host.horizontal mat-list{width:auto;white-space:nowrap}:host.horizontal igo-actionbar-item{display:inline-block}:host ::ng-deep .mat-list .mat-list-item .mat-list-text>*{white-space:normal;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;max-height:36px;line-height:18px;-webkit-line-clamp:2}:host ::ng-deep .mat-list-base .mat-list-item.mat-list-item-with-avatar{height:46px}:host ::ng-deep .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content{display:-webkit-flex;height:46px;padding:3px}:host ::ng-deep .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content>mat-icon{padding:8px}igo-actionbar-item ::ng-deep mat-list-item [mat-list-avatar]{height:auto;width:40px}igo-actionbar-item ::ng-deep mat-list-item:hover{cursor:pointer}.context-menu-card{padding:8px 3px;margin:10px}"]
            }] }
];
/** @nocollapse */
ActionbarComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Overlay }
];
ActionbarComponent.propDecorators = {
    store: [{ type: Input }],
    mode: [{ type: Input }],
    withToggleButton: [{ type: Input }],
    horizontal: [{ type: Input }],
    color: [{ type: Input }],
    withTitle: [{ type: Input }],
    withIcon: [{ type: Input }],
    xPosition: [{ type: Input }],
    yPosition: [{ type: Input }],
    overlayClass: [{ type: Input }],
    itemClassFunc: [{ type: Input }],
    withTitleClass: [{ type: HostBinding, args: ['class.with-title',] }],
    withIconClass: [{ type: HostBinding, args: ['class.with-icon',] }],
    horizontalClass: [{ type: HostBinding, args: ['class.horizontal',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An action button
 */
class ActionbarItemComponent {
    constructor() {
        /**
         * Color
         */
        this.color = 'default';
        /**
         * Whether the action title is displayed
         */
        this.withTitle = true;
        /**
         * Whether the action icon is displayed
         */
        this.withIcon = true;
        /**
         * Whether the action is disabled
         */
        this.disabled = false;
        /**
         * Event emitted when the action button is clicked
         */
        this.trigger = new EventEmitter();
    }
    /**
     * \@internal
     * @return {?}
     */
    get title() { return this.action.title; }
    /**
     * \@internal
     * @return {?}
     */
    get tooltip() { return this.action.tooltip || this.title; }
    /**
     * \@internal
     * @return {?}
     */
    get icon() { return this.action.icon; }
    /**
     * When the action button is clicked, emit the 'trigger' event but don't
     * invoke the action handler. This is handled by the parent component.
     * \@internal
     * @return {?}
     */
    onClick() {
        if (this.disabled === true) {
            return;
        }
        this.trigger.emit(this.action);
    }
}
ActionbarItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-actionbar-item',
                template: "<mat-list-item\r\n  matTooltipClass=\"actionbarItemTooltip\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"tooltip | translate\"\r\n  [ngClass]=\"{'igo-actionbar-item-disabled': disabled}\"\r\n  (click)=\"onClick()\">\r\n  <button *ngIf=\"withIcon\"\r\n    mat-list-avatar\r\n    mat-icon-button\r\n    [color]=\"color\"\r\n    [disabled]=\"disabled\">\r\n    <mat-icon *ngIf=\"withIcon\" svgIcon=\"{{icon}}\"></mat-icon>\r\n  </button>\r\n  <h4 *ngIf=\"withTitle\" matLine>{{title | translate}}</h4>\r\n</mat-list-item>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["mat-list-item.igo-actionbar-item-disabled{color:rgba(0,0,0,.26);cursor:default!important}"]
            }] }
];
/** @nocollapse */
ActionbarItemComponent.ctorParameters = () => [];
ActionbarItemComponent.propDecorators = {
    action: [{ type: Input }],
    color: [{ type: Input }],
    withTitle: [{ type: Input }],
    withIcon: [{ type: Input }],
    disabled: [{ type: Input }],
    trigger: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoActionbarModule {
}
IgoActionbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoLanguageModule,
                    MatButtonModule,
                    MatIconModule,
                    MatTooltipModule,
                    MatMenuModule,
                    MatListModule,
                    MatCardModule
                ],
                exports: [ActionbarComponent],
                declarations: [ActionbarComponent, ActionbarItemComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoActionModule {
}
IgoActionModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoActionbarModule
                ],
                exports: [
                    IgoActionbarModule
                ],
                declarations: [],
                providers: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BackdropComponent {
    constructor() { }
    /**
     * @return {?}
     */
    get shown() {
        return this._shown;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set shown(value) {
        this._shown = value;
    }
}
BackdropComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-backdrop',
                template: "<div [ngClass]=\"{'igo-backdrop-shown': shown}\"></div>\r\n",
                styles: [":host>div{position:absolute;top:0;bottom:0;left:0;right:0;background-color:rgba(100,100,100,.5);z-index:2;display:none}:host>div.igo-backdrop-shown{display:block}"]
            }] }
];
/** @nocollapse */
BackdropComponent.ctorParameters = () => [];
BackdropComponent.propDecorators = {
    shown: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoBackdropModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoBackdropModule,
            providers: []
        };
    }
}
IgoBackdropModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [BackdropComponent],
                exports: [BackdropComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClickoutDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.clickout = new EventEmitter();
    }
    /**
     * @param {?} event
     * @param {?} target
     * @return {?}
     */
    handleMouseClick(event, target) {
        if (!target) {
            return;
        }
        if (!this.el.nativeElement.contains(target)) {
            this.clickout.emit(event);
        }
    }
}
ClickoutDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoClickout]'
            },] }
];
/** @nocollapse */
ClickoutDirective.ctorParameters = () => [
    { type: ElementRef }
];
ClickoutDirective.propDecorators = {
    clickout: [{ type: Output }],
    handleMouseClick: [{ type: HostListener, args: ['document:click', ['$event', '$event.target'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoClickoutModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoClickoutModule,
            providers: []
        };
    }
}
IgoClickoutModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [ClickoutDirective],
                exports: [ClickoutDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClonePipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        if (value === undefined) {
            return value;
        }
        if (value instanceof Array) {
            return value.map((/**
             * @param {?} obj
             * @return {?}
             */
            obj => Object.assign(Object.create(obj), obj)));
        }
        else {
            return Object.assign(Object.create(value), value);
        }
    }
}
ClonePipe.decorators = [
    { type: Pipe, args: [{
                name: 'clone'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoCloneModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoCloneModule,
            providers: []
        };
    }
}
IgoCloneModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [ClonePipe],
                exports: [ClonePipe]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CollapseDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this._collapsed = false;
        this.toggle = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get target() {
        return this._target;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set target(value) {
        this._target = value;
    }
    /**
     * @return {?}
     */
    get collapsed() {
        return this._collapsed;
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
    set collapsed(collapsed) {
        collapsed ? this.collapseTarget() : this.expandTarget();
        this._collapsed = collapsed;
        this.toggle.emit(collapsed);
    }
    /**
     * @return {?}
     */
    click() {
        this.collapsed = !this.collapsed;
    }
    /**
     * @private
     * @return {?}
     */
    collapseTarget() {
        this.renderer.addClass(this.target, 'igo-collapsed');
        this.renderer.addClass(this.el.nativeElement, 'collapsed');
    }
    /**
     * @private
     * @return {?}
     */
    expandTarget() {
        this.renderer.removeClass(this.target, 'igo-collapsed');
        this.renderer.removeClass(this.el.nativeElement, 'collapsed');
    }
}
CollapseDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoCollapse]'
            },] }
];
/** @nocollapse */
CollapseDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
CollapseDirective.propDecorators = {
    target: [{ type: Input }],
    collapsed: [{ type: Input }],
    toggle: [{ type: Output }],
    click: [{ type: HostListener, args: ['click',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CollapsibleComponent {
    constructor() {
        this._title = '';
        this._collapsed = false;
    }
    /**
     * @return {?}
     */
    get title() {
        return this._title;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set title(value) {
        this._title = value;
    }
    /**
     * @return {?}
     */
    get collapsed() {
        return this._collapsed;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsed(value) {
        this._collapsed = value;
    }
}
CollapsibleComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-collapsible',
                template: "<mat-list-item>\r\n  <mat-icon\r\n    svgIcon=\"chevron-up\" \r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse\r\n    [target]=\"content\"\r\n    [collapsed]=\"collapsed\">\r\n  </mat-icon>\r\n  <h4 matLine>{{title}}</h4>\r\n</mat-list-item>\r\n\r\n<div #content>\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                styles: [":host>>>.mat-list .mat-list-item.mat-list-avatar{height:auto;width:auto;padding:0}mat-list-item{overflow:hidden}"]
            }] }
];
/** @nocollapse */
CollapsibleComponent.ctorParameters = () => [];
CollapsibleComponent.propDecorators = {
    title: [{ type: Input }],
    collapsed: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoCollapsibleModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoCollapsibleModule,
            providers: []
        };
    }
}
IgoCollapsibleModule.decorators = [
    { type: NgModule, args: [{
                imports: [MatIconModule, MatListModule],
                declarations: [CollapsibleComponent, CollapseDirective],
                exports: [CollapsibleComponent, CollapseDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ConfirmDialogComponent {
    /**
     * @param {?} dialogRef
     */
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
}
ConfirmDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-confirm-dialog',
                template: "<h2 mat-dialog-title>{{'igo.common.confirmDialog.title' |\u00A0translate}}</h2>\r\n<div mat-dialog-content>{{confirmMessage}}</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\" (click)=\"dialogRef.close(true)\">{{'igo.common.confirmDialog.confirmBtn' | translate}}</button>\r\n  <button mat-button (click)=\"dialogRef.close(false)\">{{'igo.common.confirmDialog.cancelBtn' |\u00A0translate}}</button>\r\n</div>\r\n",
                styles: ["h2{margin:5px 0 10px}div[mat-dialog-content]{max-width:200px}div[mat-dialog-actions]{margin:10px 0 0}"]
            }] }
];
/** @nocollapse */
ConfirmDialogComponent.ctorParameters = () => [
    { type: MatDialogRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ConfirmDialogService {
    /**
     * @param {?} dialog
     */
    constructor(dialog) {
        this.dialog = dialog;
    }
    /**
     * @param {?} message
     * @return {?}
     */
    open(message) {
        /** @type {?} */
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: false
        });
        dialogRef.componentInstance.confirmMessage = message;
        return dialogRef.afterClosed();
    }
}
ConfirmDialogService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ConfirmDialogService.ctorParameters = () => [
    { type: MatDialog }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoConfirmDialogModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoConfirmDialogModule,
            providers: []
        };
    }
}
IgoConfirmDialogModule.decorators = [
    { type: NgModule, args: [{
                imports: [MatButtonModule, MatDialogModule, IgoLanguageModule],
                declarations: [ConfirmDialogComponent],
                exports: [ConfirmDialogComponent],
                providers: [ConfirmDialogService],
                entryComponents: [ConfirmDialogComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextMenuDirective {
    /**
     * @param {?} overlay
     * @param {?} viewContainerRef
     * @param {?} elementRef
     */
    constructor(overlay, viewContainerRef, elementRef) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.elementRef = elementRef;
        this.menuPosition = new EventEmitter();
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onContextMenu({ x, y }) {
        this.close();
        event.preventDefault();
        this.menuPosition.emit({ x, y });
        this.overlayRef = null;
        /** @type {?} */
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo({ x, y })
            .withPositions([
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            }
        ]);
        this.overlayRef = this.overlay.create({
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.close()
        });
        this.overlayRef.attach(new TemplatePortal(this.menuContext, this.viewContainerRef, {
            $implicit: undefined
        }));
        this.sub = fromEvent(document, 'click')
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const clickTarget = (/** @type {?} */ (event.target));
            this.close();
            return (!!this.overlayRef &&
                !this.overlayRef.overlayElement.contains(clickTarget));
        })), take(1))
            .subscribe((/**
         * @return {?}
         */
        () => this.close()));
        this.sub = fromEvent(document, 'contextmenu')
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const clickTarget = (/** @type {?} */ (event.target));
            if (clickTarget &&
                !this.elementRef.nativeElement.contains(clickTarget) &&
                !this.overlayRef.overlayElement.contains(clickTarget)) {
                return true;
            }
            else {
                event.preventDefault();
            }
        })), take(1))
            .subscribe((/**
         * @return {?}
         */
        () => this.close()));
    }
    /**
     * @return {?}
     */
    close() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
}
ContextMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoContextMenu]'
            },] }
];
/** @nocollapse */
ContextMenuDirective.ctorParameters = () => [
    { type: Overlay },
    { type: ViewContainerRef },
    { type: ElementRef }
];
ContextMenuDirective.propDecorators = {
    menuContext: [{ type: Input, args: ['igoContextMenu',] }],
    menuPosition: [{ type: Output }],
    onContextMenu: [{ type: HostListener, args: ['contextmenu', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoContextMenuModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoContextMenuModule,
            providers: []
        };
    }
}
IgoContextMenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [ContextMenuDirective],
                exports: [ContextMenuDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CustomHtmlComponent {
    constructor() {
        this._html = '';
    }
    /**
     * @return {?}
     */
    get html() {
        return this._html;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set html(value) {
        this._html = value;
    }
}
CustomHtmlComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-custom-html',
                template: "<div class=\"custom-html\" [innerHTML]=\"html | sanitizeHtml \"></div>\r\n",
                styles: [".custom-html{padding:20px}"]
            }] }
];
/** @nocollapse */
CustomHtmlComponent.ctorParameters = () => [];
CustomHtmlComponent.propDecorators = {
    html: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SanitizeHtmlPipe {
    /**
     * @param {?} _sanitizer
     */
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    transform(v) {
        return this._sanitizer.bypassSecurityTrustHtml(v);
    }
}
SanitizeHtmlPipe.decorators = [
    { type: Pipe, args: [{ name: 'sanitizeHtml' },] }
];
/** @nocollapse */
SanitizeHtmlPipe.ctorParameters = () => [
    { type: DomSanitizer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoCustomHtmlModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoCustomHtmlModule
        };
    }
}
IgoCustomHtmlModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatIconModule,
                    MatTooltipModule,
                    MatInputModule,
                    MatButtonModule,
                    IgoLanguageModule
                ],
                exports: [SanitizeHtmlPipe, CustomHtmlComponent],
                declarations: [SanitizeHtmlPipe, CustomHtmlComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DragAndDropDirective {
    constructor() {
        this.allowedExtensions = [];
        this.filesDropped = new EventEmitter();
        this.filesInvalid = new EventEmitter();
        this.background = 'inherit';
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#999';
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = 'inherit';
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = 'inherit';
        /** @type {?} */
        const filesObj = this.validExtensions(evt);
        if (filesObj.valid.length) {
            this.filesDropped.emit(filesObj.valid);
        }
        if (filesObj.invalid.length) {
            this.filesInvalid.emit(filesObj.invalid);
        }
    }
    /**
     * @private
     * @param {?} evt
     * @return {?}
     */
    validExtensions(evt) {
        /** @type {?} */
        const files = evt.dataTransfer.files;
        /** @type {?} */
        const filesObj = {
            valid: [],
            invalid: []
        };
        if (files.length > 0) {
            for (const file of files) {
                /** @type {?} */
                const ext = file.name.split('.')[file.name.split('.').length - 1];
                if (this.allowedExtensions.length === 0 ||
                    (this.allowedExtensions.lastIndexOf(ext) !== -1 &&
                        file.size !== 0)) {
                    filesObj.valid.push(file);
                }
                else {
                    filesObj.invalid.push(file);
                }
            }
        }
        return filesObj;
    }
}
DragAndDropDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoDragAndDrop]'
            },] }
];
DragAndDropDirective.propDecorators = {
    allowedExtensions: [{ type: Input }],
    filesDropped: [{ type: Output }],
    filesInvalid: [{ type: Output }],
    background: [{ type: HostBinding, args: ['style.background',] }],
    onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
    onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoDrapDropModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoDrapDropModule,
            providers: []
        };
    }
}
IgoDrapDropModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [DragAndDropDirective],
                exports: [DragAndDropDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class is used in the DynamicComponentOutlet component. It holds
 * a reference to a component factory and can render that component
 * in a target element on demand. It's also possible to set inputs
 * and to subscribe to outputs.
 * @template C
 */
class DynamicComponent {
    /**
     * @param {?} componentFactory
     */
    constructor(componentFactory) {
        this.componentFactory = componentFactory;
        /**
         * Subscriptions to the component's outputs. Those need
         * to be unsubscribed when the component is destroyed.
         */
        this.subscriptions = [];
        /**
         * Component inputs
         */
        this.inputs = {};
        /**
         * Subscribers to the component's outputs
         */
        this.subscribers = {};
    }
    /**
     * Render the component to a target element.
     * Set it's inputs and subscribe to it's outputs.
     * @param {?} target Target element
     * @return {?}
     */
    setTarget(target) {
        this.target = target;
        this.componentRef = target.createComponent(this.componentFactory);
        this.updateInputs(this.inputs);
        this.updateSubscribers(this.subscribers);
    }
    /**
     * Destroy this component. That means, removing from it's target
     * element and unsubscribing to it's outputs.
     * @return {?}
     */
    destroy() {
        if (this.target !== undefined) {
            this.target.clear();
        }
        if (this.componentRef !== undefined) {
            this.componentRef.destroy();
            this.componentRef = undefined;
        }
        this.unsubscribeAll();
    }
    /**
     * Update the component inputs. This is an update so any
     * key not defined won't be overwritten.
     * @param {?} inputs
     * @return {?}
     */
    updateInputs(inputs) {
        this.inputs = inputs;
        if (this.componentRef === undefined) {
            return;
        }
        /** @type {?} */
        const instance = this.componentRef.instance;
        /** @type {?} */
        const allowedInputs = this.componentFactory.inputs;
        allowedInputs.forEach((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            /** @type {?} */
            const key = value.propName;
            if (inputs.hasOwnProperty(key)) {
                instance[key] = inputs[key];
            }
        }));
        if (typeof ((/** @type {?} */ (instance))).onUpdateInputs === 'function') {
            ((/** @type {?} */ (instance))).onUpdateInputs();
        }
    }
    /**
     * Update the component subscribers. This is an update so any
     * key not defined won't be overwritten.
     * @param {?} subscribers
     * @return {?}
     */
    updateSubscribers(subscribers) {
        this.subscribers = subscribers;
        if (this.componentRef === undefined) {
            return;
        }
        /** @type {?} */
        const instance = this.componentRef.instance;
        /** @type {?} */
        const allowedSubscribers = this.componentFactory.outputs;
        allowedSubscribers.forEach((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            /** @type {?} */
            const key = value.propName;
            if (subscribers.hasOwnProperty(key)) {
                /** @type {?} */
                const emitter = instance[key];
                /** @type {?} */
                const subscriber = subscribers[key];
                if (Array.isArray(subscriber)) {
                    subscriber.forEach((/**
                     * @param {?} _subscriber
                     * @return {?}
                     */
                    (_subscriber) => {
                        this.subscriptions.push(emitter.subscribe(_subscriber));
                    }));
                }
                else {
                    this.subscriptions.push(emitter.subscribe(subscriber));
                }
            }
        }));
    }
    /**
     * Unsubscribe to all outputs.
     * @private
     * @return {?}
     */
    unsubscribeAll() {
        this.subscriptions.forEach((/**
         * @param {?} s
         * @return {?}
         */
        (s) => s.unsubscribe()));
        this.subscriptions = [];
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service to creates DynamicComponent instances from base component classes
 */
class DynamicComponentService {
    /**
     * @param {?} resolver
     */
    constructor(resolver) {
        this.resolver = resolver;
    }
    /**
     * Creates a DynamicComponent instance from a base component class
     * @param {?} componentCls The component class
     * @return {?} DynamicComponent instance
     */
    create(componentCls) {
        /** @type {?} */
        const factory = this.resolver.resolveComponentFactory((/** @type {?} */ (componentCls)));
        return new DynamicComponent(factory);
    }
}
DynamicComponentService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DynamicComponentService.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];
/** @nocollapse */ DynamicComponentService.ngInjectableDef = defineInjectable({ factory: function DynamicComponentService_Factory() { return new DynamicComponentService(inject(ComponentFactoryResolver)); }, token: DynamicComponentService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DynamicOutletComponent {
    /**
     * @param {?} dynamicComponentService
     * @param {?} cdRef
     */
    constructor(dynamicComponentService, cdRef) {
        this.dynamicComponentService = dynamicComponentService;
        this.cdRef = cdRef;
        /**
         * The dynamic component inputs
         */
        this.inputs = {};
        /**
         * The subscribers to the dynamic component outputs
         */
        this.subscribers = {};
    }
    /**
     * If the dynamic component changes, create it.
     * If the inputs or subscribers change, update the current component's
     * inputs or subscribers.
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const component = changes.component;
        /** @type {?} */
        const inputs = changes.inputs;
        /** @type {?} */
        const subscribers = changes.subscribers;
        /** @type {?} */
        const eq = ObjectUtils.objectsAreEquivalent;
        if (component && component.currentValue !== component.previousValue) {
            this.createComponent(component.currentValue);
        }
        else {
            /** @type {?} */
            const inputsAreEquivalents = inputs && eq(inputs.currentValue || {}, inputs.previousValue || {});
            /** @type {?} */
            const subscribersAreEquivalents = subscribers &&
                eq(subscribers.currentValue || {}, subscribers.previousValue || {});
            if (inputsAreEquivalents === false) {
                this.updateInputs();
            }
            if (subscribersAreEquivalents === false) {
                this.updateSubscribers();
            }
        }
        this.cdRef.detectChanges();
    }
    /**
     * Destroy the dynamic component and all it's subscribers
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        if (this.dynamicComponent) {
            this.dynamicComponent.destroy();
        }
    }
    /**
     * Create a  DynamicComponent out of the component class and render it.
     * \@internal
     * @private
     * @param {?} component
     * @return {?}
     */
    createComponent(component) {
        if (this.dynamicComponent !== undefined) {
            this.dynamicComponent.destroy();
        }
        this.dynamicComponent =
            component instanceof DynamicComponent
                ? component
                : this.dynamicComponentService.create(component);
        this.renderComponent();
    }
    /**
     * Create and render the dynamic component. Set it's inputs and subscribers
     * \@internal
     * @private
     * @return {?}
     */
    renderComponent() {
        this.updateInputs();
        this.updateSubscribers();
        this.dynamicComponent.setTarget(this.target);
    }
    /**
     * Update the dynamic component inputs. This is an update so any
     * key not defined won't be overwritten.
     * \@internal
     * @private
     * @return {?}
     */
    updateInputs() {
        this.dynamicComponent.updateInputs(this.inputs);
    }
    /**
     * Update the dynamic component subscribers. This is an update so any
     * key not defined won't be overwritten.
     * \@internal
     * @private
     * @return {?}
     */
    updateSubscribers() {
        this.dynamicComponent.updateSubscribers(this.subscribers);
    }
}
DynamicOutletComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-dynamic-outlet',
                template: "<ng-template #target></ng-template>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;width:100%;height:100%}"]
            }] }
];
/** @nocollapse */
DynamicOutletComponent.ctorParameters = () => [
    { type: DynamicComponentService },
    { type: ChangeDetectorRef }
];
DynamicOutletComponent.propDecorators = {
    component: [{ type: Input }],
    inputs: [{ type: Input }],
    subscribers: [{ type: Input }],
    target: [{ type: ViewChild, args: ['target', { read: ViewContainerRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoDynamicOutletModule {
}
IgoDynamicOutletModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    DynamicOutletComponent
                ],
                declarations: [
                    DynamicOutletComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoDynamicComponentModule {
}
IgoDynamicComponentModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoDynamicOutletModule
                ],
                exports: [
                    IgoDynamicOutletModule
                ],
                providers: [
                    DynamicComponentService
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FlexibleComponent {
    /**
     * @param {?} el
     * @param {?} mediaService
     */
    constructor(el, mediaService) {
        this.el = el;
        this.mediaService = mediaService;
        this._initial = '0';
        this._collapsed = '0';
        this._expanded = '100%';
        this._initialMobile = this.expanded;
        this._collapsedMobile = this.collapsed;
        this._expandedMobile = this.expanded;
        this._direction = 'column';
        this._state = 'initial';
    }
    /**
     * @return {?}
     */
    get initial() {
        return this._initial;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set initial(value) {
        this._initial = value;
    }
    /**
     * @return {?}
     */
    get collapsed() {
        return this._collapsed;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsed(value) {
        this._collapsed = value;
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        this._expanded = value;
    }
    /**
     * @return {?}
     */
    get initialMobile() {
        return this._initialMobile;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set initialMobile(value) {
        this._initialMobile = value;
    }
    /**
     * @return {?}
     */
    get collapsedMobile() {
        return this._collapsedMobile;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsedMobile(value) {
        this._collapsedMobile = value;
    }
    /**
     * @return {?}
     */
    get expandedMobile() {
        return this._expandedMobile;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expandedMobile(value) {
        this._expandedMobile = value;
    }
    /**
     * @return {?}
     */
    get direction() {
        return this._direction;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set direction(value) {
        this._direction = value;
    }
    /**
     * @return {?}
     */
    get state() {
        return this._state;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set state(value) {
        /** @type {?} */
        const sizes = {
            initial: this.initial,
            collapsed: this.collapsed,
            expanded: this.expanded
        };
        /** @type {?} */
        const media = this.mediaService.media$.value;
        if (media === 'mobile') {
            Object.assign(sizes, {
                initial: this.initialMobile,
                collapsed: this.collapsedMobile,
                expanded: this.expandedMobile
            });
        }
        /** @type {?} */
        const size = sizes[value];
        if (size !== undefined) {
            this.setSize(size);
            setTimeout((/**
             * @return {?}
             */
            () => {
                this._state = value;
            }), FlexibleComponent.transitionTime);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.el.nativeElement.className += this.direction;
        // Since this component supports different sizes
        // on mobile, force a redraw when the media changes
        this.mediaService.media$.subscribe((/**
         * @param {?} media
         * @return {?}
         */
        (media) => (this.state = this.state)));
    }
    /**
     * @private
     * @param {?} size
     * @return {?}
     */
    setSize(size) {
        this._state = 'transition';
        if (this.direction === 'column') {
            this.main.nativeElement.style.height = size;
        }
        else if (this.direction === 'row') {
            this.main.nativeElement.style.width = size;
        }
    }
}
FlexibleComponent.transitionTime = 250;
FlexibleComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-flexible',
                template: "<div #flexibleMain class=\"igo-flexible-main {{state}} {{direction}}\">\r\n  <div class=\"igo-container\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n</div>\r\n<div class=\"igo-flexible-fill\">\r\n  <div>\r\n  \t<div class=\"igo-container\">\r\n      <ng-content select=\"[igoFlexibleFill]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                styles: [":host{display:flex;height:100%;width:100%}:host.column{flex-direction:column}:host.row{flex-direction:row}.igo-flexible-main{flex:0 0 auto;overflow:hidden}.igo-flexible-main.column{transition:height .25s ease-in}.igo-flexible-main.row{transition:width .25s ease-in}.igo-flexible-fill>div{position:absolute;top:0;bottom:0;left:0;right:0}.igo-container{width:calc(100% - 2 * 5px);height:100%;padding:5px 0;margin:0 5px;overflow:hidden;position:relative}::ng-deep .igo-flexible-fill{flex:1 1 auto;overflow:hidden;position:relative}::ng-deep .igo-content{height:100%;width:100%;overflow:auto}::ng-deep igo-panel{height:100%}"]
            }] }
];
/** @nocollapse */
FlexibleComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: MediaService }
];
FlexibleComponent.propDecorators = {
    main: [{ type: ViewChild, args: ['flexibleMain',] }],
    initial: [{ type: Input }],
    collapsed: [{ type: Input }],
    expanded: [{ type: Input }],
    initialMobile: [{ type: Input }],
    collapsedMobile: [{ type: Input }],
    expandedMobile: [{ type: Input }],
    direction: [{ type: Input }],
    state: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoFlexibleModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoFlexibleModule,
            providers: []
        };
    }
}
IgoFlexibleModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [FlexibleComponent],
                exports: [FlexibleComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} control
 * @return {?}
 */
function formControlIsRequired(control) {
    if (control.validator) {
        /** @type {?} */
        const validator = control.validator((/** @type {?} */ ({})));
        if (validator && validator.required) {
            return true;
        }
    }
    if (((/** @type {?} */ (control))).controls) {
        /** @type {?} */
        const requiredControl = Object.keys(((/** @type {?} */ (control))).controls).find((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            return formControlIsRequired(((/** @type {?} */ (control))).controls[key]);
        }));
        return requiredControl !== undefined;
    }
    return false;
}
/**
 * @return {?}
 */
function getDefaultErrorMessages() {
    return {
        required: 'igo.common.form.errors.required'
    };
}
/**
 * @param {?} control
 * @param {?} messages
 * @return {?}
 */
function getControlErrorMessage(control, messages) {
    /** @type {?} */
    const errors = control.errors || {};
    /** @type {?} */
    const errorKeys = Object.keys(errors);
    /** @type {?} */
    const errorMessages = errorKeys
        .map((/**
     * @param {?} key
     * @return {?}
     */
    (key) => messages[key]))
        .filter((/**
     * @param {?} message
     * @return {?}
     */
    (message) => message !== undefined));
    return errorMessages.length > 0 ? errorMessages[0] : '';
}
/**
 * @param {?} form
 * @return {?}
 */
function getAllFormFields(form) {
    return form.groups.reduce((/**
     * @param {?} acc
     * @param {?} group
     * @return {?}
     */
    (acc, group) => {
        return acc.concat(group.fields);
    }), [].concat(form.fields));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configurable form
 */
class FormComponent {
    constructor() {
        /**
         * Event emitted when the form is submitted
         */
        this.submitForm = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get hasButtons() {
        return this.buttons.nativeElement.children.length !== 0;
    }
    /**
     * Is the entity or the template change, recreate the form or repopulate it.
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const formData = changes.formData;
        if (formData && formData.currentValue !== formData.previousValue) {
            if (formData.currentValue === undefined) {
                this.clear();
            }
            else {
                this.setData(formData.currentValue);
            }
        }
    }
    /**
     * Transform the form data to a feature and emit an event
     * \@internal
     * @return {?}
     */
    onSubmit() {
        this.submitForm.emit(this.getData());
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    setData(data) {
        this.form.fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        (field) => {
            field.control.setValue(t(data, field.name).safeObject);
        }));
        this.form.groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            group.fields.forEach((/**
             * @param {?} field
             * @return {?}
             */
            (field) => {
                field.control.setValue(t(data, field.name).safeObject);
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    getData() {
        /** @type {?} */
        const data = {};
        getAllFormFields(this.form).forEach((/**
         * @param {?} field
         * @return {?}
         */
        (field) => {
            this.updateDataWithFormField(data, field);
        }));
        return data;
    }
    /**
     * @private
     * @param {?} data
     * @param {?} field
     * @return {?}
     */
    updateDataWithFormField(data, field) {
        /** @type {?} */
        const control = field.control;
        if (!control.disabled) {
            data[field.name] = control.value;
        }
    }
    /**
     * Clear form
     * @private
     * @return {?}
     */
    clear() {
        this.form.control.reset();
    }
}
FormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-form',
                template: "\r\n<form\r\n  [formGroup]=\"form.control\"\r\n  (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"igo-form-body\" [ngClass]=\"{'igo-form-body-with-buttons': hasButtons}\">\r\n    <div class=\"igo-form-content\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n    <div #buttons class=\"igo-form-buttons\">\r\n      <ng-content select=\"[formButtons]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</form>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}form{width:100%;height:100%}.igo-form-body,.igo-form-content{height:100%}.igo-form-body-with-buttons .igo-form-content{height:calc(100% - 56px)}.igo-form-content{display:flex}"]
            }] }
];
/** @nocollapse */
FormComponent.ctorParameters = () => [];
FormComponent.propDecorators = {
    form: [{ type: Input }],
    formData: [{ type: Input }],
    submitForm: [{ type: Output }],
    buttons: [{ type: ViewChild, args: ['buttons',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoFormFormModule {
}
IgoFormFormModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule
                ],
                exports: [
                    FormComponent,
                    FormsModule,
                    ReactiveFormsModule
                ],
                declarations: [
                    FormComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service where all available form fields are registered.
 */
class FormFieldService {
    constructor() { }
    /**
     * @param {?} type
     * @param {?} component
     * @return {?}
     */
    static register(type, component) {
        FormFieldService.fields[type] = component;
    }
    /**
     * Return field component by type
     * @param {?} type Field type
     * @return {?} Field component
     */
    getFieldByType(type) {
        return FormFieldService.fields[type];
    }
}
FormFieldService.fields = {};
FormFieldService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
FormFieldService.ctorParameters = () => [];
/** @nocollapse */ FormFieldService.ngInjectableDef = defineInjectable({ factory: function FormFieldService_Factory() { return new FormFieldService(); }, token: FormFieldService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormService {
    /**
     * @param {?} formBuilder
     */
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
    }
    /**
     * @param {?} fields
     * @param {?} groups
     * @return {?}
     */
    form(fields, groups) {
        /** @type {?} */
        const control = this.formBuilder.group({});
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        (field) => {
            control.addControl(field.name, field.control);
        }));
        groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            control.addControl(group.name, group.control);
        }));
        return { fields, groups, control };
    }
    /**
     * @param {?} config
     * @param {?} fields
     * @return {?}
     */
    group(config, fields) {
        /** @type {?} */
        const options = config.options || {};
        /** @type {?} */
        const control = this.formBuilder.group({});
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        (field) => {
            control.addControl(field.name, field.control);
        }));
        control.setValidators(options.validator);
        return (/** @type {?} */ (Object.assign({}, config, { fields, control })));
    }
    /**
     * @param {?} config
     * @return {?}
     */
    field(config) {
        /** @type {?} */
        const options = config.options || {};
        /** @type {?} */
        const state$$1 = Object.assign({ value: '' }, {
            disabled: options.disabled
        });
        /** @type {?} */
        const control = this.formBuilder.control(state$$1);
        control.setValidators(options.validator);
        return (/** @type {?} */ (Object.assign({ type: 'text' }, config, { control })));
    }
    /**
     * @param {?} config
     * @param {?} partial
     * @return {?}
     */
    extendFieldConfig(config, partial) {
        /** @type {?} */
        const options = Object.assign({}, config.options || {}, partial.options || {});
        /** @type {?} */
        const inputs = Object.assign({}, config.inputs || {}, partial.inputs || {});
        /** @type {?} */
        const subscribers = Object.assign({}, config.subscribers || {}, partial.subscribers || {});
        return Object.assign({}, config, { options, inputs, subscribers });
    }
}
FormService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
FormService.ctorParameters = () => [
    { type: FormBuilder }
];
/** @nocollapse */ FormService.ngInjectableDef = defineInjectable({ factory: function FormService_Factory() { return new FormService(inject(FormBuilder)); }, token: FormService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} type
 * @return {?}
 */
function FormFieldComponent(type) {
    return (/**
     * @param {?} compType
     * @return {?}
     */
    (compType) => {
        FormFieldService.register(type, compType);
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This component renders the proper form input based on
 * the field configuration it receives.
 */
class FormFieldComponent$1 {
    /**
     * @param {?} formFieldService
     */
    constructor(formFieldService) {
        this.formFieldService = formFieldService;
    }
    /**
     * @return {?}
     */
    getFieldComponent() {
        return this.formFieldService.getFieldByType(this.field.type || 'text');
    }
    /**
     * @return {?}
     */
    getFieldInputs() {
        /** @type {?} */
        const errors = this.field.options.errors || {};
        return Object.assign({
            placeholder: this.field.title,
            disableSwitch: this.field.options.disableSwitch || false
        }, Object.assign({}, this.field.inputs || {}), {
            formControl: this.field.control,
            errors: Object.assign({}, getDefaultErrorMessages(), errors)
        });
    }
    /**
     * @return {?}
     */
    getFieldSubscribers() {
        return Object.assign({}, this.field.subscribers || {});
    }
}
FormFieldComponent$1.decorators = [
    { type: Component, args: [{
                selector: 'igo-form-field',
                template: "\r\n\r\n<ng-container *ngIf=\"field !== undefined\">\r\n  <igo-dynamic-outlet\r\n    [component]=\"getFieldComponent()\"\r\n    [inputs]=\"getFieldInputs()\"\r\n    [subscribers]=\"getFieldSubscribers()\">\r\n  </igo-dynamic-outlet>\r\n</ng-container>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["::ng-deep mat-form-field{width:100%}::ng-deep .igo-form-disable-switch{margin-right:8px}"]
            }] }
];
/** @nocollapse */
FormFieldComponent$1.ctorParameters = () => [
    { type: FormFieldService }
];
FormFieldComponent$1.propDecorators = {
    field: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This component renders a select field
 */
let FormFieldSelectComponent = /**
 * This component renders a select field
 */
class FormFieldSelectComponent {
    constructor() {
        this.disabled$ = new BehaviorSubject(false);
        /**
         * Wheter a disable switch should be available
         */
        this.disableSwitch = false;
    }
    /**
     * Select input choices
     * @param {?} value
     * @return {?}
     */
    set choices(value) {
        if (value instanceof Observable) {
            this.choices$ = value;
        }
        else {
            this.choices$ = of(value);
        }
    }
    /**
     * Whether the field is required
     * @return {?}
     */
    get required() {
        return formControlIsRequired(this.formControl);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.disabled$.next(this.formControl.disabled);
    }
    /**
     * Get error message
     * @return {?}
     */
    getErrorMessage() {
        return getControlErrorMessage(this.formControl, this.errors);
    }
    /**
     * @return {?}
     */
    onDisableSwitchClick() {
        this.toggleDisabled();
    }
    /**
     * @private
     * @return {?}
     */
    toggleDisabled() {
        /** @type {?} */
        const disabled = !this.disabled$.value;
        if (disabled === true) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
        this.disabled$.next(disabled);
    }
};
FormFieldSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-form-field-select',
                template: "<mat-form-field>\r\n  <mat-select\r\n    [required]=\"required\"\r\n    [placeholder]=\"placeholder\"\r\n    [formControl]=\"formControl\">\r\n    <mat-option *ngFor=\"let choice of choices$ | async\" [value]=\"choice.value\">\r\n      {{choice.title}}\r\n    </mat-option>\r\n  </mat-select>\r\n  <mat-icon\r\n    *ngIf=\"disableSwitch === true\"\r\n    class=\"igo-form-disable-switch\"\r\n    [svgIcon]=\"(disabled$ | async) === true ? 'checkbox-blank-outline' : 'checkbox-marked-outline'\"\r\n    (click)=\"onDisableSwitchClick()\"\r\n    matPrefix>\r\n  </mat-icon>\r\n  <mat-error *ngIf=\"formControl.errors\">{{getErrorMessage() | translate}}</mat-error>\r\n</mat-form-field>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
FormFieldSelectComponent.propDecorators = {
    formControl: [{ type: Input }],
    placeholder: [{ type: Input }],
    choices: [{ type: Input }],
    errors: [{ type: Input }],
    disableSwitch: [{ type: Input }]
};
/**
 * This component renders a select field
 */
FormFieldSelectComponent = __decorate([
    FormFieldComponent('select')
], FormFieldSelectComponent);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This component renders a text field
 */
let FormFieldTextComponent = /**
 * This component renders a text field
 */
class FormFieldTextComponent {
    constructor() {
        this.disabled$ = new BehaviorSubject(false);
        /**
         * Wheter a disable switch should be available
         */
        this.disableSwitch = false;
    }
    /**
     * Whether the field is required
     * @return {?}
     */
    get required() {
        return formControlIsRequired(this.formControl);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.disabled$.next(this.formControl.disabled);
    }
    /**
     * Get error message
     * @return {?}
     */
    getErrorMessage() {
        return getControlErrorMessage(this.formControl, this.errors);
    }
    /**
     * @return {?}
     */
    onDisableSwitchClick() {
        this.toggleDisabled();
    }
    /**
     * @private
     * @return {?}
     */
    toggleDisabled() {
        /** @type {?} */
        const disabled = !this.disabled$.value;
        if (disabled === true) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
        this.disabled$.next(disabled);
    }
};
FormFieldTextComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-form-field-text',
                template: "<mat-form-field>\r\n  <input\r\n    matInput\r\n    [required]=\"required\"\r\n    [placeholder]=\"placeholder\"\r\n    [formControl]=\"formControl\">\r\n  <mat-icon\r\n    *ngIf=\"disableSwitch === true\"\r\n    class=\"igo-form-disable-switch\"\r\n    [svgIcon]=\"(disabled$ | async) === true ? 'checkbox-blank-outline' : 'checkbox-marked-outline'\"\r\n    (click)=\"onDisableSwitchClick()\"\r\n    matPrefix>\r\n  </mat-icon>\r\n  <mat-error *ngIf=\"formControl.errors\">{{getErrorMessage() | translate}}</mat-error>\r\n</mat-form-field>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
FormFieldTextComponent.propDecorators = {
    formControl: [{ type: Input }],
    placeholder: [{ type: Input }],
    errors: [{ type: Input }],
    disableSwitch: [{ type: Input }]
};
/**
 * This component renders a text field
 */
FormFieldTextComponent = __decorate([
    FormFieldComponent('text')
], FormFieldTextComponent);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This component renders a textarea field
 */
let FormFieldTextareaComponent = /**
 * This component renders a textarea field
 */
class FormFieldTextareaComponent {
    constructor() {
        this.disabled$ = new BehaviorSubject(false);
        /**
         * Wheter a disable switch should be available
         */
        this.disableSwitch = false;
    }
    /**
     * Whether the field is required
     * @return {?}
     */
    get required() {
        return formControlIsRequired(this.formControl);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.disabled$.next(this.formControl.disabled);
    }
    /**
     * Get error message
     * @return {?}
     */
    getErrorMessage() {
        return getControlErrorMessage(this.formControl, this.errors);
    }
    /**
     * @return {?}
     */
    onDisableSwitchClick() {
        this.toggleDisabled();
    }
    /**
     * @private
     * @return {?}
     */
    toggleDisabled() {
        /** @type {?} */
        const disabled = !this.disabled$.value;
        if (disabled === true) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
        this.disabled$.next(disabled);
    }
};
FormFieldTextareaComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-form-field-textarea',
                template: "<mat-form-field>\r\n  <textarea\r\n    matInput\r\n    [required]=\"required\"\r\n    [placeholder]=\"placeholder\"\r\n    [formControl]=\"formControl\">\r\n  </textarea>\r\n  <mat-icon\r\n    *ngIf=\"disableSwitch === true\"\r\n    class=\"igo-form-disable-switch\"\r\n    [svgIcon]=\"(disabled$ | async) === true ? 'checkbox-blank-outline' : 'checkbox-marked-outline'\"\r\n    (click)=\"onDisableSwitchClick()\"\r\n    matPrefix>\r\n  </mat-icon>\r\n  <mat-error *ngIf=\"formControl.errors\">{{getErrorMessage() | translate}}</mat-error>\r\n</mat-form-field>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
FormFieldTextareaComponent.propDecorators = {
    formControl: [{ type: Input }],
    placeholder: [{ type: Input }],
    errors: [{ type: Input }],
    disableSwitch: [{ type: Input }]
};
/**
 * This component renders a textarea field
 */
FormFieldTextareaComponent = __decorate([
    FormFieldComponent('textarea')
], FormFieldTextareaComponent);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoFormFieldModule {
}
IgoFormFieldModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatIconModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatSelectModule,
                    IgoLanguageModule,
                    IgoDynamicOutletModule
                ],
                exports: [
                    FormFieldComponent$1,
                    FormFieldSelectComponent,
                    FormFieldTextComponent,
                    FormFieldTextareaComponent
                ],
                declarations: [
                    FormFieldComponent$1,
                    FormFieldSelectComponent,
                    FormFieldTextComponent,
                    FormFieldTextareaComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configurable form, optionnally bound to an entity
 * (for example in case of un update). Submitting that form
 * emits an event with the form data but no other operation is performed.
 */
class FormGroupComponent {
    constructor() { }
    /**
     * Form group control
     * @return {?}
     */
    get formControl() { return this.group.control; }
    /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * \@internal
     * @param {?} field Field
     * @return {?} Number of columns
     */
    getFieldColSpan(field) {
        /** @type {?} */
        let colSpan = 2;
        /** @type {?} */
        const options = field.options || {};
        if (options.cols && options.cols > 0) {
            colSpan = Math.min(options.cols, 2);
        }
        return colSpan;
    }
    /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * \@internal
     * @param {?} field Field
     * @return {?} Number of columns
     */
    getFieldNgClass(field) {
        /** @type {?} */
        const colspan = this.getFieldColSpan(field);
        return { [`igo-form-field-colspan-${colspan}`]: true };
    }
    /**
     * Get error message
     * @return {?}
     */
    getErrorMessage() {
        /** @type {?} */
        const options = this.group.options || {};
        return getControlErrorMessage(this.formControl, options.errors || {});
    }
}
FormGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-form-group',
                template: "<div\r\n  *ngIf=\"group && group.fields.length > 0\"\r\n  class=\"igo-form-group-fields\">\r\n  <div\r\n    *ngFor=\"let field of group.fields\"\r\n    class=\"igo-form-field-wrapper\"\r\n    [ngClass]=\"getFieldNgClass(field)\">\r\n    <igo-form-field [field]=\"field\"></igo-form-field>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"igo-form-group-extra-content\">\r\n  <ng-content></ng-content>\r\n</div>\r\n\r\n<mat-error *ngIf=\"formControl.errors\">{{getErrorMessage() | translate}}</mat-error>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{width:100%;height:100%;display:block;overflow:auto;padding:10px 5px}.igo-form-field-wrapper{display:inline-block;padding:0 5px}.igo-form-field-colspan-2{width:100%}.igo-form-field-colspan-1{width:50%}"]
            }] }
];
/** @nocollapse */
FormGroupComponent.ctorParameters = () => [];
FormGroupComponent.propDecorators = {
    group: [{ type: Input }],
    errors: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoFormGroupModule {
}
IgoFormGroupModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatFormFieldModule,
                    IgoLanguageModule,
                    IgoFormFieldModule
                ],
                exports: [
                    FormGroupComponent
                ],
                declarations: [
                    FormGroupComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoFormModule {
}
IgoFormModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoFormGroupModule,
                    IgoFormFieldModule
                ],
                exports: [
                    IgoFormFormModule,
                    IgoFormGroupModule,
                    IgoFormFieldModule
                ],
                declarations: [],
                providers: [
                    FormService,
                    FormFieldService
                ],
                entryComponents: [
                    FormFieldSelectComponent,
                    FormFieldTextComponent,
                    FormFieldTextareaComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoEntitySelectorModule {
}
IgoEntitySelectorModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    MatSelectModule
                ],
                exports: [EntitySelectorComponent],
                declarations: [EntitySelectorComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StopDropPropagationDirective {
    /**
     * @param {?} event
     * @return {?}
     */
    onDrop(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
StopDropPropagationDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoStopDropPropagation]'
            },] }
];
StopDropPropagationDirective.propDecorators = {
    onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StopPropagationDirective {
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        event.stopPropagation();
    }
}
StopPropagationDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoStopPropagation]'
            },] }
];
StopPropagationDirective.propDecorators = {
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoStopPropagationModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoStopPropagationModule,
            providers: []
        };
    }
}
IgoStopPropagationModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [StopDropPropagationDirective, StopPropagationDirective],
                exports: [StopDropPropagationDirective, StopPropagationDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive that handles an entity table row click and selection.
 */
class EntityTableRowDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        /**
         * Whether a row supports selection
         */
        this.selection = false;
        /**
         * Whether clicking a row should select it (if selection is true)
         */
        this.selectOnClick = true;
        /**
         * Whether the selected row should be highlighted
         */
        this.highlightSelection = true;
        this._selected = false;
        /**
         * Scroll behavior on selection
         */
        this.scrollBehavior = EntityTableScrollBehavior.Auto;
        /**
         * Event emitted when a row is selected
         */
        this.select = new EventEmitter();
    }
    /**
     * Whether a row is selected
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        if (this.selection === false) {
            return;
        }
        if (value === this._selected) {
            return;
        }
        this.toggleSelected(value);
        this.scroll();
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * When a row is clicked, select it if it's supported
     * @ignore
     * @return {?}
     */
    onClick() {
        if (this.selection === false || this.selectOnClick === false) {
            return;
        }
        this.toggleSelected(true);
        this.select.emit(this);
    }
    /**
     * Select a row and add or remove the selected class from it
     * @private
     * @param {?} selected Whether the row should be selected
     * @return {?}
     */
    toggleSelected(selected) {
        this._selected = selected;
        if (selected === true) {
            this.addCls(EntityTableRowDirective.selectedCls);
            if (this.highlightSelection === true) {
                this.addCls(EntityTableRowDirective.highlightedCls);
            }
        }
        else {
            this.removeCls(EntityTableRowDirective.selectedCls);
            this.removeCls(EntityTableRowDirective.highlightedCls);
        }
    }
    /**
     * Scroll to the selected row
     * @private
     * @return {?}
     */
    scroll() {
        if (this._selected === true) {
            this.el.nativeElement.scrollIntoView({
                behavior: this.scrollBehavior,
                block: 'center',
                inline: 'center'
            });
        }
    }
    /**
     * Add the selected CSS class
     * @private
     * @param {?} cls
     * @return {?}
     */
    addCls(cls) {
        this.renderer.addClass(this.el.nativeElement, cls);
    }
    /**
     * Remove the selected CSS class
     * @private
     * @param {?} cls
     * @return {?}
     */
    removeCls(cls) {
        this.renderer.removeClass(this.el.nativeElement, cls);
    }
}
/**
 * Class added to a selected row
 */
EntityTableRowDirective.selectedCls = 'igo-entity-table-row-selected';
/**
 * Class added to a highlighted row
 */
EntityTableRowDirective.highlightedCls = 'igo-entity-table-row-highlighted';
EntityTableRowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoEntityTableRow]'
            },] }
];
/** @nocollapse */
EntityTableRowDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
EntityTableRowDirective.propDecorators = {
    selection: [{ type: Input }],
    selectOnClick: [{ type: Input }],
    highlightSelection: [{ type: Input }],
    selected: [{ type: Input }],
    scrollBehavior: [{ type: Input }],
    select: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoEntityTableModule {
}
IgoEntityTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatTableModule,
                    MatSortModule,
                    MatIconModule,
                    MatButtonModule,
                    MatCheckboxModule,
                    IgoStopPropagationModule,
                    IgoCustomHtmlModule
                ],
                exports: [
                    EntityTableComponent
                ],
                declarations: [
                    EntityTableComponent,
                    EntityTableRowDirective
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoEntityModule {
}
IgoEntityModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    IgoEntitySelectorModule,
                    IgoEntityTableModule
                ],
                declarations: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SecureImagePipe {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    transform(url) {
        return this.http
            .get(url, {
            headers: {
                activityInterceptor: 'false'
            },
            responseType: 'blob'
        })
            .pipe(switchMap((/**
         * @param {?} blob
         * @return {?}
         */
        blob => {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            observer => {
                /** @type {?} */
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = (/**
                 * @return {?}
                 */
                () => {
                    observer.next(reader.result);
                });
            }));
        })));
    }
}
SecureImagePipe.decorators = [
    { type: Pipe, args: [{
                name: 'secureImage'
            },] }
];
/** @nocollapse */
SecureImagePipe.ctorParameters = () => [
    { type: HttpClient }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoImageModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoImageModule,
            providers: []
        };
    }
}
IgoImageModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [SecureImagePipe],
                exports: [SecureImagePipe]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class KeyValuePipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        /** @type {?} */
        const keyValues = [];
        Object.getOwnPropertyNames(value).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => keyValues.push({ key, value: value[key] })));
        return keyValues;
    }
}
KeyValuePipe.decorators = [
    { type: Pipe, args: [{
                name: 'keyvalue'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoKeyValueModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoKeyValueModule,
            providers: []
        };
    }
}
IgoKeyValueModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [KeyValuePipe],
                exports: [KeyValuePipe]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class JsonDialogComponent {
    /**
     * @param {?} dialogRef
     */
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    isObject(val) {
        return typeof val === 'object' && !Array.isArray(val);
    }
    /**
     * @param {?} baseKey
     * @param {?} key
     * @return {?}
     */
    getKey(baseKey, key) {
        return (baseKey ? baseKey + '.' : '') + key;
    }
}
JsonDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-json-dialog',
                template: "<h1 mat-dialog-title>{{ title }}</h1>\r\n\r\n<div mat-dialog-content>\r\n  <ng-container *ngTemplateOutlet=\"loopObject;context:{ obj: data }\"></ng-container>\r\n\r\n  <ng-template #loopObject let-obj='obj' let-baseKey='baseKey'>\r\n    <ng-container *ngFor=\"let property of obj | keyvalue\">\r\n      <ng-container *ngIf=\"ignoreKeys.indexOf(getKey(baseKey, property.key)) === -1\">\r\n\r\n        <ng-container *ngIf=\"isObject(property.value); else notObject\">\r\n          <ng-container *ngTemplateOutlet=\"loopObject;context:{ obj: property.value, baseKey: getKey(baseKey, property.key) }\"></ng-container>\r\n        </ng-container>\r\n\r\n        <ng-template #notObject>\r\n          <p><span><b>{{getKey(baseKey, property.key)}}</b> : </span><span class=\"propertyValue\" [innerHtml]=\"property.value\"></span></p>\r\n        </ng-template>\r\n\r\n      </ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n</div>\r\n\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\"\r\n          (click)=\"dialogRef.close(false)\">\r\n    OK\r\n  </button>\r\n</div>\r\n"
            }] }
];
/** @nocollapse */
JsonDialogComponent.ctorParameters = () => [
    { type: MatDialogRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class JsonDialogService {
    /**
     * @param {?} dialog
     */
    constructor(dialog) {
        this.dialog = dialog;
    }
    /**
     * @param {?} title
     * @param {?} data
     * @param {?=} ignoreKeys
     * @return {?}
     */
    open(title, data, ignoreKeys) {
        /** @type {?} */
        const dialogRef = this.dialog.open(JsonDialogComponent, {
            disableClose: false
        });
        dialogRef.componentInstance.data = data;
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.ignoreKeys = ignoreKeys;
        return dialogRef.afterClosed();
    }
}
JsonDialogService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
JsonDialogService.ctorParameters = () => [
    { type: MatDialog }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoJsonDialogModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoJsonDialogModule
        };
    }
}
IgoJsonDialogModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MatButtonModule, MatDialogModule, IgoKeyValueModule],
                exports: [JsonDialogComponent],
                declarations: [JsonDialogComponent],
                entryComponents: [JsonDialogComponent],
                providers: [JsonDialogService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ListItemDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this._color = 'primary';
        this._focused = false;
        this._selected = false;
        this._disabled = false;
        this.beforeSelect = new EventEmitter();
        this.beforeFocus = new EventEmitter();
        this.beforeUnselect = new EventEmitter();
        this.beforeUnfocus = new EventEmitter();
        this.beforeDisable = new EventEmitter();
        this.beforeEnable = new EventEmitter();
        this.focus = new EventEmitter();
        this.unfocus = new EventEmitter();
        this.select = new EventEmitter();
        this.unselect = new EventEmitter();
        this.disable = new EventEmitter();
        this.enable = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get color() {
        return this._color;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._color = value;
    }
    /**
     * @return {?}
     */
    get focused() {
        return this._focused;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set focused(value) {
        if (value === this._focused) {
            return;
        }
        if (this.disabled) {
            return;
        }
        value ? this.beforeFocus.emit(this) : this.beforeUnfocus.emit(this);
        this._focused = value;
        this.toggleSelectedClass();
        value ? this.focus.emit(this) : this.unfocus.emit(this);
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        if (value === this._selected) {
            return;
        }
        if (this.disabled) {
            return;
        }
        value ? this.beforeSelect.emit(this) : this.beforeUnselect.emit(this);
        this._selected = value;
        this._focused = value;
        this.toggleSelectedClass();
        value ? this.select.emit(this) : this.unselect.emit(this);
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        if (value === this._disabled) {
            return;
        }
        if (value === true) {
            this.selected = false;
        }
        value ? this.beforeDisable.emit(this) : this.beforeEnable.emit(this);
        this._disabled = value;
        this.toggleDisabledClass();
        value ? this.disable.emit(this) : this.enable.emit(this);
    }
    /**
     * @return {?}
     */
    onClick() {
        this.selected = true;
    }
    /**
     * @return {?}
     */
    getOffsetTop() {
        /** @type {?} */
        const padding = 5;
        return this.el.nativeElement.offsetTop - padding;
    }
    /**
     * @private
     * @return {?}
     */
    toggleSelectedClass() {
        if (this.focused || this.selected) {
            this.addCls(ListItemDirective.selectedCls);
        }
        else {
            this.removeCls(ListItemDirective.selectedCls);
        }
    }
    /**
     * @private
     * @return {?}
     */
    toggleDisabledClass() {
        if (this.disabled) {
            this.addCls(ListItemDirective.disabledCls);
        }
        else {
            this.removeCls(ListItemDirective.disabledCls);
        }
    }
    /**
     * @private
     * @param {?} cls
     * @return {?}
     */
    addCls(cls) {
        this.renderer.addClass(this.el.nativeElement, cls);
    }
    /**
     * @private
     * @param {?} cls
     * @return {?}
     */
    removeCls(cls) {
        this.renderer.removeClass(this.el.nativeElement, cls);
    }
}
ListItemDirective.selectedCls = 'igo-list-item-selected';
ListItemDirective.disabledCls = 'igo-list-item-disabled';
ListItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoListItem]'
            },] }
];
/** @nocollapse */
ListItemDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
ListItemDirective.propDecorators = {
    color: [{ type: Input }],
    focused: [{ type: Input }],
    selected: [{ type: Input }],
    disabled: [{ type: Input }],
    beforeSelect: [{ type: Output }],
    beforeFocus: [{ type: Output }],
    beforeUnselect: [{ type: Output }],
    beforeUnfocus: [{ type: Output }],
    beforeDisable: [{ type: Output }],
    beforeEnable: [{ type: Output }],
    focus: [{ type: Output }],
    unfocus: [{ type: Output }],
    select: [{ type: Output }],
    unselect: [{ type: Output }],
    disable: [{ type: Output }],
    enable: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ListComponent {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this._navigation = true;
        this._selection = true;
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    get navigation() {
        return this._navigation;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set navigation(value) {
        this._navigation = value;
    }
    /**
     * @return {?}
     */
    get selection() {
        return this._selection;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selection(value) {
        this._selection = value;
    }
    /**
     * @return {?}
     */
    get selectedItem() {
        return this._selectedItem;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectedItem(value) {
        this.focusedItem = value;
        this._selectedItem = value;
    }
    /**
     * @return {?}
     */
    get focusedItem() {
        return this._focusedItem;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set focusedItem(value) {
        this._focusedItem = value;
        if (value !== undefined) {
            this.scrollToItem(value);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeyboardEvent(event) {
        // It would be nice to be able to unsubscribe to the event
        // completely but until ES7 this won't be possible because
        // document events are not observables
        if (this.navigationEnabled) {
            if (event.keyCode === 38 || event.keyCode === 40) {
                event.preventDefault();
                this.navigate(event.keyCode);
            }
            else if (event.keyCode === 13) {
                this.select(this.focusedItem);
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.enableNavigation();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.listItems.length) {
            this.init();
        }
        this.listItems$$ = this.listItems.changes.subscribe((/**
         * @param {?} items
         * @return {?}
         */
        (items) => this.init()));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.listItems$$.unsubscribe();
    }
    /**
     * @param {?=} item
     * @return {?}
     */
    focus(item) {
        if (!this.selection) {
            return;
        }
        this.unfocus();
        // We need to make this check because dynamic
        // lists such as in the search results list may fail
        if (item !== undefined) {
            item.focused = true;
        }
    }
    /**
     * @return {?}
     */
    unfocus() {
        if (this.focusedItem !== undefined) {
            this.focusedItem.focused = false;
        }
        this.focusedItem = undefined;
    }
    /**
     * @return {?}
     */
    focusNext() {
        /** @type {?} */
        const items = this.listItems.toArray();
        /** @type {?} */
        let item;
        /** @type {?} */
        let disabled = true;
        /** @type {?} */
        let index = this.getFocusedIndex();
        if (index === undefined) {
            index = -1;
        }
        while (disabled && index < items.length - 1) {
            index += 1;
            item = items[index];
            disabled = item.disabled;
        }
        if (item !== undefined) {
            this.focus(item);
        }
    }
    /**
     * @return {?}
     */
    focusPrevious() {
        /** @type {?} */
        const items = this.listItems.toArray();
        /** @type {?} */
        let item;
        /** @type {?} */
        let disabled = true;
        /** @type {?} */
        let index = this.getFocusedIndex();
        while (disabled && index > 0) {
            index -= 1;
            item = items[index];
            disabled = item.disabled;
        }
        if (item !== undefined) {
            this.focus(item);
        }
    }
    /**
     * @param {?=} item
     * @return {?}
     */
    select(item) {
        if (!this.selection) {
            return;
        }
        this.unselect();
        if (item !== undefined) {
            item.selected = true;
        }
    }
    /**
     * @return {?}
     */
    unselect() {
        this.unfocus();
        if (this.selectedItem !== undefined) {
            this.selectedItem.selected = false;
        }
        this.selectedItem = undefined;
    }
    /**
     * @return {?}
     */
    enableNavigation() {
        if (this.navigation) {
            this.navigationEnabled = true;
        }
    }
    /**
     * @return {?}
     */
    disableNavigation() {
        this.navigationEnabled = false;
    }
    /**
     * @private
     * @return {?}
     */
    init() {
        this.subscribe();
        this.selectedItem = this.findSelectedItem();
        this.focusedItem = this.findFocusedItem();
        this.enableNavigation();
    }
    /**
     * @private
     * @return {?}
     */
    subscribe() {
        this.unsubscribe();
        this.listItems.toArray().forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            this.subscriptions.push(item.beforeSelect.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            (item2) => this.handleItemBeforeSelect(item2))));
            this.subscriptions.push(item.select.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            (item2) => this.handleItemSelect(item2))));
            this.subscriptions.push(item.beforeFocus.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            (item2) => this.handleItemBeforeFocus(item2))));
            this.subscriptions.push(item.focus.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            (item2) => this.handleItemFocus(item2))));
        }), this);
    }
    /**
     * @private
     * @return {?}
     */
    unsubscribe() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
        this.subscriptions = [];
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    handleItemBeforeFocus(item) {
        if (item !== this.focusedItem) {
            this.unselect();
        }
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    handleItemFocus(item) {
        this.focusedItem = item;
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    handleItemBeforeSelect(item) {
        if (item !== this.focusedItem) {
            this.unselect();
        }
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    handleItemSelect(item) {
        this.selectedItem = item;
    }
    /**
     * @private
     * @return {?}
     */
    findSelectedItem() {
        return this.listItems.toArray().find((/**
         * @param {?} item
         * @return {?}
         */
        item => item.selected));
    }
    /**
     * @private
     * @return {?}
     */
    findFocusedItem() {
        return this.listItems.toArray().find((/**
         * @param {?} item
         * @return {?}
         */
        item => item.focused));
    }
    /**
     * @private
     * @return {?}
     */
    getFocusedIndex() {
        return this.listItems
            .toArray()
            .findIndex((/**
         * @param {?} item
         * @return {?}
         */
        item => item === this.focusedItem));
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    navigate(key) {
        switch (key) {
            case 38:
                this.focusPrevious();
                break;
            case 40:
                this.focusNext();
                break;
            default:
                break;
        }
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    scrollToItem(item) {
        this.el.nativeElement.scrollTop = item.getOffsetTop();
    }
}
ListComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-list',
                template: "<mat-list\r\n  igoClickout\r\n  [ngClass]=\"{'selectable': selection}\"\r\n  (clickout)=\"disableNavigation()\"\r\n  (click)=\"enableNavigation()\">\r\n  <ng-content></ng-content>\r\n</mat-list>\r\n",
                styles: [":host{display:block;height:100%;overflow:auto;position:static}mat-list{padding-top:0}:host>>>.mat-list .mat-list-item .mat-list-text>*{white-space:normal;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;max-height:36px;line-height:18px;-webkit-line-clamp:2}:host>>>.mat-list .mat-list-item.mat-list-item-avatar .mat-list-item-content{display:-webkit-flex;height:46px;padding:3px}:host>>>.mat-list .mat-list-item.mat-list-item-avatar{height:46px}:host>>>.mat-list .mat-list-item.mat-list-item-avatar .mat-list-item-content>mat-icon{padding:8px}:host>>>[igolistitem] mat-list-item [mat-list-avatar]{height:auto;width:40px}:host mat-list.selectable>>>[igolistitem]:not(.igo-list-item-disabled) mat-list-item:hover{cursor:pointer}:host>>>[igolistitem]:focus{outline:0}"]
            }] }
];
/** @nocollapse */
ListComponent.ctorParameters = () => [
    { type: ElementRef }
];
ListComponent.propDecorators = {
    navigation: [{ type: Input }],
    selection: [{ type: Input }],
    listItems: [{ type: ContentChildren, args: [ListItemDirective, { descendants: true },] }],
    handleKeyboardEvent: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoListModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoListModule,
            providers: []
        };
    }
}
IgoListModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MatIconModule, MatListModule, IgoClickoutModule],
                declarations: [ListItemDirective, ListComponent],
                exports: [ListItemDirective, ListComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PanelComponent {
    constructor() {
        this._withHeader = true;
    }
    /**
     * @return {?}
     */
    get title() {
        return this._title;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set title(value) {
        this._title = value;
    }
    /**
     * @return {?}
     */
    get withHeader() {
        return this._withHeader;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set withHeader(value) {
        this._withHeader = value;
    }
}
PanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-panel',
                template: "<div *ngIf=\"withHeader\" class=\"igo-panel-header\" title=\"\">\r\n  <h3>\r\n    <ng-content select=\"[panelLeftButton]\"></ng-content>\r\n    <div class=\"igo-panel-title\">\r\n      {{title}}\r\n      <ng-content select=\"[panelHeader]\"></ng-content>\r\n    </div>\r\n    <ng-content select=\"[panelRightButton]\"></ng-content>\r\n  </h3>\r\n</div>\r\n<div class=\"igo-panel-content\" title=\"\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}.igo-panel-header{height:46px;padding:3px;text-align:center}.igo-panel-header h3{margin:0;height:40px}.igo-panel-header>>>[panelleftbutton]{float:left;margin-right:-40px}.igo-panel-header>>>[panelrightbutton]{float:right}.igo-panel-content{overflow:auto}:host.igo-panel-with-header .igo-panel-content{height:calc(100% - 46px)}:host:not(.igo-panel-with-header) .igo-panel-content{height:100%}.igo-panel-title{display:block;width:calc(100% - 80px);margin-left:40px;height:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;line-height:40px;float:left}"]
            }] }
];
/** @nocollapse */
PanelComponent.ctorParameters = () => [];
PanelComponent.propDecorators = {
    title: [{ type: Input }],
    withHeader: [{ type: Input }, { type: HostBinding, args: ['class.igo-panel-with-header',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoPanelModule {
}
IgoPanelModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    PanelComponent
                ],
                declarations: [
                    PanelComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * <igoSidenavShim> directive.
 *
 * This directive prevents a material sidenav with mode="side"
 * from focusing an element after it's closed
 */
class SidenavShimDirective {
    /**
     * @param {?} component
     * @param {?} renderer
     */
    constructor(component, renderer) {
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    onOpen() {
        this.focusedElement = (/** @type {?} */ (document.activeElement));
    }
    /**
     * @return {?}
     */
    onCloseStart() {
        /** @type {?} */
        const focusedElement = (/** @type {?} */ (document.activeElement));
        if (focusedElement !== this.focusedElement) {
            this.blurElement = this.focusedElement;
        }
        else {
            this.blurElement = undefined;
        }
    }
    /**
     * @return {?}
     */
    onClose() {
        if (this.blurElement) {
            this.renderer.selectRootElement(this.blurElement).blur();
        }
        this.blurElement = undefined;
        this.focusedElement = undefined;
    }
}
SidenavShimDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoSidenavShim]'
            },] }
];
/** @nocollapse */
SidenavShimDirective.ctorParameters = () => [
    { type: MatSidenav, decorators: [{ type: Self }] },
    { type: Renderer2 }
];
SidenavShimDirective.propDecorators = {
    onOpen: [{ type: HostListener, args: ['open', ['$event'],] }],
    onCloseStart: [{ type: HostListener, args: ['close-start', ['$event'],] }],
    onClose: [{ type: HostListener, args: ['close', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoSidenavModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoSidenavModule,
            providers: []
        };
    }
}
IgoSidenavModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [SidenavShimDirective],
                exports: [SidenavShimDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SpinnerComponent {
    constructor() {
        this.shown$ = new BehaviorSubject(false);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set shown(value) { this.shown$.next(value); }
    /**
     * @return {?}
     */
    get shown() { return this.shown$.value; }
    /**
     * @return {?}
     */
    show() {
        this.shown = true;
    }
    /**
     * @return {?}
     */
    hide() {
        this.shown = false;
    }
}
SpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-spinner',
                template: "<div\r\n  [ngClass]=\"{'igo-spinner-container': true, 'igo-spinner-shown': (shown$ | async)}\">\r\n  <div class=\"igo-spinner-background\"></div>\r\n  <mat-progress-spinner diameter=\"40\" mode=\"indeterminate\"></mat-progress-spinner>\r\n</div>\r\n",
                styles: [".igo-spinner-container{display:none;pointer-events:none}.igo-spinner-container.igo-spinner-shown{display:block}mat-progress-spinner{height:40px;width:40px;border-radius:50%}.igo-spinner-background{height:36px;width:36px;border-radius:50%;border:4px solid #fff;position:absolute;top:2px;left:2px}"]
            }] }
];
/** @nocollapse */
SpinnerComponent.ctorParameters = () => [];
SpinnerComponent.propDecorators = {
    shown: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A directive to bind a SpinnerComponent to the activity service.
 * The activity service tracks any HTTP request and this directive
 * will display the spinner it's attached to when the activity counter
 * is greater than 0.
 */
class SpinnerActivityDirective {
    /**
     * @param {?} spinner
     * @param {?} activityService
     */
    constructor(spinner, activityService) {
        this.spinner = spinner;
        this.activityService = activityService;
    }
    /**
     * Subscribe to the activity service counter and display the spinner
     * when it's is greater than 0.
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.counter$$ = this.activityService.counter$
            .pipe(debounceTime(50))
            .subscribe((/**
         * @param {?} count
         * @return {?}
         */
        (count) => {
            count > 0 ? this.spinner.show() : this.spinner.hide();
        }));
    }
    /**
     * Unsubcribe to the activity service counter.
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.counter$$.unsubscribe();
    }
}
SpinnerActivityDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoSpinnerActivity]',
                providers: [SpinnerComponent]
            },] }
];
/** @nocollapse */
SpinnerActivityDirective.ctorParameters = () => [
    { type: SpinnerComponent, decorators: [{ type: Self }] },
    { type: ActivityService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoSpinnerModule {
}
IgoSpinnerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MatProgressSpinnerModule],
                declarations: [SpinnerActivityDirective, SpinnerComponent],
                exports: [SpinnerActivityDirective, SpinnerComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TableDatabase {
    /**
     * @param {?=} data
     */
    constructor(data) {
        /**
         * Stream that emits whenever the data has been modified.
         */
        this.dataChange = new BehaviorSubject([]);
        if (data) {
            this.dataChange.next(data);
        }
    }
    /**
     * @return {?}
     */
    get data() {
        return this.dataChange.value;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    set(data) {
        this.dataChange.next(data);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    add(item) {
        /** @type {?} */
        const copiedData = this.data.slice();
        copiedData.push(item);
        this.set(copiedData);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        /** @type {?} */
        const copiedData = this.data.slice();
        /** @type {?} */
        const index = copiedData.indexOf(item);
        copiedData.splice(index, 1);
        this.set(copiedData);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TableDataSource extends DataSource {
    /**
     * @param {?} _database
     * @param {?} _model
     * @param {?} _sort
     */
    constructor(_database, _model, _sort) {
        super();
        this._database = _database;
        this._model = _model;
        this._sort = _sort;
        this._filterChange = new BehaviorSubject('');
    }
    /**
     * @return {?}
     */
    get filter() {
        return this._filterChange.value;
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    set filter(filter$$1) {
        this._filterChange.next(filter$$1);
    }
    // Connect function called by the table to retrieve one stream containing
    // the data to render.
    /**
     * @return {?}
     */
    connect() {
        if (!this._database) {
            return merge([]);
        }
        /** @type {?} */
        const displayDataChanges = [
            this._database.dataChange,
            this._filterChange,
            this._sort.sortChange
        ];
        return merge(...displayDataChanges).pipe(map((/**
         * @return {?}
         */
        () => {
            return this.getFilteredData(this._database.data);
        })), map((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            return this.getSortedData(data);
        })));
    }
    /**
     * @return {?}
     */
    disconnect() { }
    /**
     * @param {?} data
     * @return {?}
     */
    getFilteredData(data) {
        if (!this.filter) {
            return data;
        }
        return data.slice().filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            const searchStr = this._model.columns
                .filter((/**
             * @param {?} c
             * @return {?}
             */
            c => c.filterable))
                .map((/**
             * @param {?} c
             * @return {?}
             */
            c => ObjectUtils.resolve(item, c.name)))
                .join(' ')
                .toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        }));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    getSortedData(data) {
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }
        return data.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => {
            /** @type {?} */
            const propertyA = ObjectUtils.resolve(a, this._sort.active);
            /** @type {?} */
            const propertyB = ObjectUtils.resolve(b, this._sort.active);
            return ObjectUtils.naturalCompare(propertyB, propertyA, this._sort.direction);
        }));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const TableActionColor = {
    primary: 0,
    accent: 1,
    warn: 2,
};
TableActionColor[TableActionColor.primary] = 'primary';
TableActionColor[TableActionColor.accent] = 'accent';
TableActionColor[TableActionColor.warn] = 'warn';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TableComponent {
    constructor() {
        this._hasFIlterInput = true;
        this.selection = new SelectionModel(true, []);
        this.select = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get database() {
        return this._database;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set database(value) {
        this._database = value;
    }
    /**
     * @return {?}
     */
    get model() {
        return this._model;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set model(value) {
        this._model = value;
    }
    /**
     * @return {?}
     */
    get hasFilterInput() {
        return this._hasFIlterInput;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasFilterInput(value) {
        this._hasFIlterInput = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.dataSource = new TableDataSource(this.database, this.model, this.sort);
        if (this.model) {
            this.displayedColumns = this.model.columns
                .filter((/**
             * @param {?} c
             * @return {?}
             */
            c => c.displayed !== false))
                .map((/**
             * @param {?} c
             * @return {?}
             */
            c => c.name));
            if (this.model.selectionCheckbox) {
                this.displayedColumns.unshift('selectionCheckbox');
            }
            if (this.model.actions && this.model.actions.length) {
                this.displayedColumns.push('action');
            }
        }
        this.selection.changed.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => this.select.emit(e)));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.filter) {
            fromEvent(this.filter.nativeElement, 'keyup')
                .pipe(debounceTime(150), distinctUntilChanged())
                .subscribe((/**
             * @return {?}
             */
            () => {
                if (!this.dataSource) {
                    return;
                }
                this.dataSource.filter = this.filter.nativeElement.value;
            }));
        }
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        if (change.database) {
            this.dataSource = new TableDataSource(this.database, this.model, this.sort);
            this.selection.clear();
        }
    }
    /**
     * @param {?} colorId
     * @return {?}
     */
    getActionColor(colorId) {
        return TableActionColor[colorId];
    }
    /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    getValue(row, key) {
        return ObjectUtils.resolve(row, key);
    }
    /**
     * Whether the number of selected elements matches the total number of rows.
     * @return {?}
     */
    isAllSelected() {
        /** @type {?} */
        const numSelected = this.selection.selected.length;
        /** @type {?} */
        const numRows = this.database.data.length;
        return numSelected === numRows;
    }
    /**
     * Selects all rows if they are not all selected; otherwise clear selection.
     * @return {?}
     */
    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.database.data.forEach((/**
             * @param {?} row
             * @return {?}
             */
            row => this.selection.select(row)));
    }
    /**
     * @param {?} event
     * @param {?} action
     * @param {?} row
     * @return {?}
     */
    handleClickAction(event, action, row) {
        event.stopPropagation();
        action.click(row);
    }
}
TableComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-table',
                template: "<div class='table-box'>\r\n  <div class='table-header' *ngIf=\"hasFilterInput\">\r\n    <mat-form-field floatPlaceholder='never'>\r\n      <input matInput #filter [placeholder]=\"'igo.common.table.filter' | translate\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class='table-container'>\r\n    <table mat-table #table [dataSource]='dataSource' matSort>\r\n\r\n      <!-- Checkbox Column -->\r\n      <ng-container matColumnDef=\"selectionCheckbox\">\r\n        <th mat-header-cell *matHeaderCellDef>\r\n          <mat-checkbox (change)=\"$event ? masterToggle() : null\"\r\n                        [checked]=\"selection.hasValue() && isAllSelected()\"\r\n                        [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\r\n          </mat-checkbox>\r\n        </th>\r\n        <td mat-cell *matCellDef=\"let row\">\r\n          <mat-checkbox (click)=\"$event.stopPropagation()\"\r\n                        (change)=\"$event ? selection.toggle(row) : null\"\r\n                        [checked]=\"selection.isSelected(row)\">\r\n          </mat-checkbox>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container [matColumnDef]='column.name' *ngFor='let column of model.columns'>\r\n        <ng-container *ngIf='column.sortable'>\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.title}} </th>\r\n        </ng-container>\r\n\r\n        <ng-container *ngIf='!column.sortable'>\r\n          <th mat-header-cell *matHeaderCellDef> {{column.title}} </th>\r\n        </ng-container>\r\n\r\n        <ng-container *ngIf=\"!column.html; else cellHTML\">\r\n          <td mat-cell *matCellDef='let row' class=\"mat-cell-text\"\r\n            [ngClass]=\"model.cellClassFunc ? model.cellClassFunc(row, column) : {}\">\r\n            {{getValue(row, column.name)}}\r\n          </td>\r\n        </ng-container>\r\n\r\n        <ng-template #cellHTML>\r\n          <td mat-cell *matCellDef='let row' class=\"mat-cell-text\"\r\n            [ngClass]=\"model.cellClassFunc ? model.cellClassFunc(row, column) : {}\"\r\n            [innerHTML]=\"getValue(row, column.name)\">\r\n          </td>\r\n        </ng-template>\r\n      </ng-container>\r\n\r\n      <!-- Action Column -->\r\n      <ng-container matColumnDef='action'>\r\n        <th mat-header-cell *matHeaderCellDef></th>\r\n        <td mat-cell *matCellDef='let row'>\r\n          <button *ngFor='let action of model.actions'\r\n          mat-mini-fab\r\n          [color]='getActionColor(action.color)'\r\n          (click)='handleClickAction($event, action, row)'>\r\n            <mat-icon svgIcon=\"{{action.icon}}\"></mat-icon>\r\n          </button>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef='displayedColumns;'></tr>\r\n      <tr mat-row\r\n        *matRowDef='let row; columns: displayedColumns;'\r\n        [ngClass]=\"model.rowClassFunc ? model.rowClassFunc(row) : {}\"\r\n        (click)=\"selection.toggle(row)\">\r\n      </tr>\r\n\r\n    </table>\r\n  </div>\r\n\r\n</div>\r\n",
                styles: [":host{width:100%;height:100%;display:block}.table-container{display:flex;flex-direction:column;height:100%;overflow:auto;flex:1 1 auto}.table-box{height:100%;display:flex;flex-direction:column}.table-header{min-height:64px;max-width:500px;display:flex;flex:0 1 auto;align-items:baseline;padding:8px 24px 0;font-size:20px;justify-content:space-between}tr[mat-header-row],tr[mat-row]{height:60px}.mat-cell-text{overflow:hidden;word-wrap:break-word}td[mat-cell]{padding-right:15px}th.mat-header-cell{padding-right:5px}button{margin-right:10px}"]
            }] }
];
TableComponent.propDecorators = {
    database: [{ type: Input }],
    model: [{ type: Input }],
    hasFilterInput: [{ type: Input }],
    select: [{ type: Output }],
    filter: [{ type: ViewChild, args: ['filter',] }],
    sort: [{ type: ViewChild, args: [MatSort,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoTableModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoTableModule,
            providers: []
        };
    }
}
IgoTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    CdkTableModule,
                    MatIconModule,
                    MatButtonModule,
                    MatTableModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatSortModule,
                    MatCheckboxModule,
                    IgoLanguageModule
                ],
                declarations: [TableComponent],
                exports: [TableComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service where runtime tool configurations are registered
 */
class ToolService {
    constructor() { }
    /**
     * @param {?} tool
     * @return {?}
     */
    static register(tool) {
        ToolService.tools[tool.name] = tool;
    }
    /**
     * Return a tool
     * @param {?} name Tool name
     * @return {?} tool Tool
     */
    getTool(name) {
        return ToolService.tools[name];
    }
    /**
     * Return all tools
     * @return {?} tTols
     */
    getTools() {
        return Object.values(ToolService.tools);
    }
}
ToolService.tools = {};
ToolService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ToolService.ctorParameters = () => [];
/** @nocollapse */ ToolService.ngInjectableDef = defineInjectable({ factory: function ToolService_Factory() { return new ToolService(); }, token: ToolService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service where all available tools and their component are registered.
 */
class Toolbox {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        this.options = options;
        /**
         * Observable of the active tool
         */
        this.activeTool$ = new BehaviorSubject(undefined);
        /**
         * Ordered list of tool names to display in a toolbar
         */
        this.toolbar$ = new BehaviorSubject([]);
        /**
         * Active tool history. Useful for activating the previous tool.
         */
        this.activeToolHistory = [];
        /**
         * Tool store
         */
        this.store = new EntityStore([], {
            getKey: (/**
             * @param {?} tool
             * @return {?}
             */
            (tool) => tool.name)
        });
        this.setToolbar(options.toolbar);
        this.initStore();
    }
    /**
     * @return {?}
     */
    get tools$() {
        return this.store.entities$;
    }
    /**
     * Destroy the toolbox
     * @return {?}
     */
    destroy() {
        this.activeTool$$.unsubscribe();
        this.store.destroy();
    }
    /**
     * Return a tool
     * @param {?} name Tool name
     * @return {?} tool Tool
     */
    getTool(name) {
        return this.store.get(name);
    }
    /**
     * Return all tools
     * @return {?} Array of tools
     */
    getTools() {
        return this.store.all();
    }
    /**
     * Set tool configurations
     * @param {?} tools Tools
     * @return {?}
     */
    setTools(tools) {
        this.store.load(tools);
    }
    /**
     * Set toolbar
     * @param {?} toolbar A list of tool names
     * @return {?}
     */
    setToolbar(toolbar) {
        this.toolbar$.next(toolbar || []);
    }
    /**
     * Activate a tool (and deactivate other tools)
     * @param {?} name Tool name
     * @param {?=} options Tool options
     * @return {?}
     */
    activateTool(name, options = {}) {
        /** @type {?} */
        const tool = this.getTool(name);
        if (tool === undefined) {
            return;
        }
        this.store.state.update(tool, { active: true, options }, true);
    }
    /**
     * Activate the previous tool, if any
     * @return {?}
     */
    activatePreviousTool() {
        if (this.activeToolHistory.length <= 1) {
            this.deactivateTool();
            return;
        }
        const [previous, current] = this.activeToolHistory.splice(-2, 2);
        this.activateTool(previous);
    }
    /**
     * Deactivate the active tool
     * @return {?}
     */
    deactivateTool() {
        this.clearActiveToolHistory();
        this.store.state.updateAll({ active: false });
    }
    /**
     * Initialize the tool store and start observing the active tool
     * @private
     * @return {?}
     */
    initStore() {
        this.store = new EntityStore([], {
            getKey: (/**
             * @param {?} entity
             * @return {?}
             */
            (entity) => entity.name)
        });
        this.activeTool$$ = this.store.stateView
            .firstBy$((/**
         * @param {?} record
         * @return {?}
         */
        (record) => record.state.active === true))
            .subscribe((/**
         * @param {?} record
         * @return {?}
         */
        (record) => {
            if (record === undefined) {
                this.setActiveTool(undefined);
                return;
            }
            /** @type {?} */
            const tool = record.entity;
            /** @type {?} */
            const options = Object.assign({}, tool.options || {}, record.state.options || {});
            this.setActiveTool(Object.assign({}, tool, { options }));
        }));
    }
    /**
     * Set the active tool and update the tool history
     * @private
     * @param {?} tool Tool
     * @return {?}
     */
    setActiveTool(tool) {
        this.activeTool$.next(tool);
        if (tool === undefined) {
            this.clearActiveToolHistory();
        }
        else {
            this.activeToolHistory = this.activeToolHistory
                .filter((/**
             * @param {?} name
             * @return {?}
             */
            (name) => name !== tool.name))
                .concat([tool.name]);
        }
    }
    /**
     * Clear the tool history
     * @private
     * @return {?}
     */
    clearActiveToolHistory() {
        this.activeToolHistory = [];
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} speed
 * @param {?=} type
 * @return {?}
 */
function toolSlideInOut(speed = '300ms', type = 'ease-in-out') {
    return trigger('toolSlideInOut', [
        state('enter', style({
            transform: 'translate3d(0, 0, 0)'
        })),
        transition('void => enter', animate(speed + ' ' + type))
    ]);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ToolboxComponent {
    constructor() {
        /**
         * Observable of the active tool
         */
        this.activeTool$ = new BehaviorSubject(undefined);
        /**
         * Store of actions that toggle tools
         */
        this.actionStore = new ActionStore([]);
        /**
         * Observable of he anmation state
         */
        this.animation$ = new BehaviorSubject('none');
        /**
         * Observable of the toolbar
         */
        this.toolbar$ = new BehaviorSubject([]);
        /**
         * Observable of the ongoing animation. This is useful when
         * multiple animations are triggered at once i.e. when the user clicks
         * too fast on different actions
         */
        this.animating$ = new BehaviorSubject(false);
        /**
         * Whether the toolbox should animate the first tool entering
         */
        this.animate = false;
    }
    /**
     * Whether the Toolbar should display actions' titles
     * @return {?}
     */
    get toolbarWithTitle() {
        return this.activeTool$.value === undefined;
    }
    /**
     * Initialize the toolbar and subscribe to the active tool
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.toolbar$$ = this.toolbox.toolbar$.subscribe((/**
         * @param {?} toolbar
         * @return {?}
         */
        (toolbar) => this.onToolbarChange(toolbar)));
        this.activeTool$$ = this.toolbox.activeTool$.subscribe((/**
         * @param {?} tool
         * @return {?}
         */
        (tool) => this.onActiveToolChange(tool)));
    }
    /**
     * Unsubscribe to the active tool and destroy the action store
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.toolbar$$.unsubscribe();
        this.activeTool$$.unsubscribe();
        this.actionStore.destroy();
    }
    /**
     * Track the starting animation
     * \@internal
     * @return {?}
     */
    onAnimationStart() {
        this.animating$.next(true);
    }
    /**
     * Untrack the completed animation
     * \@internal
     * @return {?}
     */
    onAnimationComplete() {
        this.animating$.next(false);
    }
    /**
     * Return a tool's inputs
     * \@internal
     * @param {?} tool Tool
     * @return {?} Tool inputs
     */
    getToolInputs(tool) {
        return tool.options || {};
    }
    /**
     * Get Action bar item class function
     * \@internal
     * @return {?}
     */
    get actionBarItemClassFunc() {
        return (/**
         * @param {?} tool
         * @return {?}
         */
        (tool) => {
            if (!this.toolbox.activeTool$.value) {
                return;
            }
            return { 'tool-actived': tool.id === this.toolbox.activeTool$.value.name };
        });
    }
    /**
     * Initialize an action store
     * @private
     * @param {?} toolbar Toolbar
     * @return {?}
     */
    onToolbarChange(toolbar) {
        this.setToolbar(toolbar);
    }
    /**
     * Activate a tool and trigger an animation or not
     * @private
     * @param {?} tool Tool to activate
     * @return {?}
     */
    onActiveToolChange(tool) {
        if (!this.animate) {
            this.setActiveTool(tool);
            return;
        }
        this.onAnimate((/**
         * @return {?}
         */
        () => this.setActiveTool(tool)));
    }
    /**
     * Set the active tool
     * @private
     * @param {?} tool Tool to activate
     * @return {?}
     */
    setActiveTool(tool) {
        if (tool === undefined) {
            this.actionStore.state.updateAll({ active: false });
        }
        else {
            /** @type {?} */
            const action = this.actionStore.get(tool.name);
            if (action !== undefined) {
                this.actionStore.state.update(action, { active: true }, true);
            }
        }
        this.activeTool$.next(tool);
        if (this.animate) {
            this.animation$.next('enter');
        }
    }
    /**
     * Initialize the toolbar
     * @private
     * @param {?} toolbar
     * @return {?}
     */
    setToolbar(toolbar) {
        /** @type {?} */
        const actions = toolbar.reduce((/**
         * @param {?} acc
         * @param {?} toolName
         * @return {?}
         */
        (acc, toolName) => {
            /** @type {?} */
            const tool = this.toolbox.getTool(toolName);
            if (tool === undefined) {
                return acc;
            }
            acc.push({
                id: tool.name,
                title: tool.title,
                icon: tool.icon,
                // iconImage: tool.iconImage,
                tooltip: tool.tooltip,
                args: [tool, this.toolbox],
                handler: (/**
                 * @param {?} _tool
                 * @param {?} _toolbox
                 * @return {?}
                 */
                (_tool, _toolbox) => {
                    _toolbox.activateTool(_tool.name);
                })
            });
            return acc;
        }), []);
        this.actionStore.load(actions);
        this.toolbar$.next(toolbar);
    }
    /**
     * Observe the ongoing animation and ignore any incoming animation
     * while one is still ongoing.
     * @private
     * @param {?} callback Callback to execute when the animation completes
     * @return {?}
     */
    onAnimate(callback) {
        this.unAnimate();
        this.animating$$ = this.animating$.subscribe((/**
         * @param {?} animation
         * @return {?}
         */
        (animation) => {
            if (!animation) {
                callback.call(this);
                this.unAnimate();
            }
        }));
    }
    /**
     * Stop observing an animation when it's complete
     * @private
     * @return {?}
     */
    unAnimate() {
        if (this.animating$$) {
            this.animating$$.unsubscribe();
        }
    }
}
ToolboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-toolbox',
                template: "<igo-actionbar\r\n  *ngIf=\"(toolbar$ | async).length > 0\"\r\n  [store]=\"actionStore\"\r\n  [withIcon]=\"true\"\r\n  [withTitle]=\"toolbarWithTitle\"\r\n  [horizontal]=\"false\"\r\n  [itemClassFunc]=\"actionBarItemClassFunc\">\r\n</igo-actionbar>\r\n\r\n<div\r\n  *ngIf=\"activeTool$ | async as tool\"\r\n  class=\"igo-tool-container\"\r\n  [ngClass]=\"{'igo-tool-container-with-toolbar': !actionStore.empty, 'igo-tool-container-with-animation': animate}\"\r\n  [@toolSlideInOut]=\"animation$ | async\"\r\n  (@toolSlideInOut.start)=\"onAnimationStart()\"\r\n  (@toolSlideInOut.done)=\"onAnimationComplete()\">\r\n\r\n  <igo-dynamic-outlet\r\n    [component]=\"tool.component\"\r\n    [inputs]=\"getToolInputs(tool)\">\r\n  </igo-dynamic-outlet>\r\n\r\n</div>\r\n",
                animations: [toolSlideInOut()],
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;position:relative;overflow:hidden;width:100%;height:100%}.igo-tool-container{position:absolute;top:0;bottom:0;left:0;right:0}.igo-tool-container-with-animation{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.igo-tool-container-with-toolbar{left:51px}igo-actionbar{height:100%}igo-actionbar.with-title{width:100%;overflow:auto}igo-actionbar:not(.with-title){width:48px;overflow:hidden;-o-box-shadow:2px 0 2px 0 #ddd;box-shadow:2px 0 2px 0 #ddd}igo-actionbar ::ng-deep igo-actionbar-item.tool-actived ::ng-deep mat-list-item{background-color:#e0e0e0}igo-dynamic-outlet{overflow:auto}"]
            }] }
];
ToolboxComponent.propDecorators = {
    toolbox: [{ type: Input }],
    animate: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoToolboxModule {
}
IgoToolboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoActionModule,
                    IgoDynamicComponentModule
                ],
                exports: [
                    ToolboxComponent
                ],
                declarations: [
                    ToolboxComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoToolModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoToolModule,
            providers: [
                ToolService
            ]
        };
    }
}
IgoToolModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    IgoToolboxModule
                ],
                declarations: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This component dynamically renders a widget. It also subscribes
 * to the widget's 'cancel' and 'complete' events and destroys it
 * when any of those event is emitted.
 */
class WidgetOutletComponent {
    constructor() {
        /**
         * Widget subscribers to 'cancel' and 'complete'
         * \@internal
         */
        this.baseSubscribers = {
            cancel: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => this.onCancel(event)),
            complete: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => this.onComplete(event))
        };
        /**
         * Widget subscribers
         */
        this.subscribers = {};
        /**
         * Event emitted when the widget emits 'complete'
         */
        this.complete = new EventEmitter();
        /**
         * Event emitted when the widget emits 'cancel'
         */
        this.cancel = new EventEmitter();
    }
    /**
     * Destroy the current widget and all it's inner subscriptions
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyWidget();
    }
    /**
     * Get the effective subscribers. That means a combination of the base
     * subscribers and any subscriber given as input.
     * \@internal
     * @return {?} Combined subscribers
     */
    getEffectiveSubscribers() {
        /** @type {?} */
        const subscribers = Object.assign({}, this.subscribers);
        // Base subscribers
        Object.keys(this.baseSubscribers).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            /** @type {?} */
            const subscriber = subscribers[key];
            /** @type {?} */
            const baseSubscriber = this.baseSubscribers[key];
            if (subscriber !== undefined) {
                subscribers[key] = (/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    subscriber(event);
                    baseSubscriber(event);
                });
            }
            else {
                subscribers[key] = baseSubscriber;
            }
        }));
        return subscribers;
    }
    /**
     * When the widget emits 'cancel', propagate that event and destroy
     * the widget
     * @private
     * @param {?} event
     * @return {?}
     */
    onCancel(event) {
        this.cancel.emit(event);
        this.destroyWidget();
    }
    /**
     * When the widget emits 'complete', propagate that event and destroy
     * the widget
     * @private
     * @param {?} event
     * @return {?}
     */
    onComplete(event) {
        this.complete.emit(event);
        this.destroyWidget();
    }
    /**
     * Destroy the current widget
     * @private
     * @return {?}
     */
    destroyWidget() {
        if (this.widget !== undefined) {
            this.widget.destroy();
        }
        this.widget = undefined;
    }
}
WidgetOutletComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-widget-outlet',
                template: "<igo-dynamic-outlet\r\n  *ngIf=\"widget\"\r\n  [component]=\"widget\"\r\n  [inputs]=\"inputs\"\r\n  [subscribers]=\"getEffectiveSubscribers()\">\r\n</igo-dynamic-outlet>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["igo-dynamic-outlet{height:100%}"]
            }] }
];
/** @nocollapse */
WidgetOutletComponent.ctorParameters = () => [];
WidgetOutletComponent.propDecorators = {
    widget: [{ type: Input }],
    inputs: [{ type: Input }],
    subscribers: [{ type: Input }],
    complete: [{ type: Output }],
    cancel: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoWidgetOutletModule {
}
IgoWidgetOutletModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoDynamicComponentModule
                ],
                exports: [
                    WidgetOutletComponent
                ],
                declarations: [
                    WidgetOutletComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WidgetService {
    /**
     * @param {?} dynamicComponentService
     */
    constructor(dynamicComponentService) {
        this.dynamicComponentService = dynamicComponentService;
    }
    /**
     * @param {?} widgetCls
     * @return {?}
     */
    create(widgetCls) {
        return this.dynamicComponentService.create((/** @type {?} */ (widgetCls)));
    }
}
WidgetService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WidgetService.ctorParameters = () => [
    { type: DynamicComponentService }
];
/** @nocollapse */ WidgetService.ngInjectableDef = defineInjectable({ factory: function WidgetService_Factory() { return new WidgetService(inject(DynamicComponentService)); }, token: WidgetService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoWidgetModule {
}
IgoWidgetModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoWidgetOutletModule
                ],
                exports: [
                    IgoWidgetOutletModule
                ],
                declarations: [],
                providers: [
                    WidgetService
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The class is a specialized version of an EntityStore that stores
 * workspaces.
 */
class WorkspaceStore extends EntityStore {
    constructor() {
        super(...arguments);
        this.activeWorkspace$ = new BehaviorSubject(undefined);
    }
    /**
     * Activate the an workspace workspace and deactivate the one currently active
     * @param {?} workspace Workspace
     * @return {?}
     */
    activateWorkspace(workspace) {
        /** @type {?} */
        const active = this.activeWorkspace$.value;
        if (active !== undefined) {
            active.deactivate();
        }
        this.deactivateWorkspace();
        if (workspace !== undefined) {
            this.state.update(workspace, { active: true, selected: true }, true);
            this.activeWorkspace$.next(workspace);
            workspace.activate();
        }
    }
    /**
     * Deactivate the current workspace
     * @return {?}
     */
    deactivateWorkspace() {
        /** @type {?} */
        const active = this.activeWorkspace$.value;
        if (active !== undefined) {
            active.deactivate();
            this.activeWorkspace$.next(undefined);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Drop list that activates the selected workspace emit an event.
 */
class WorkspaceSelectorComponent {
    constructor() {
        /**
         * Event emitted when an workspace is selected or unselected
         */
        this.selectedChange = new EventEmitter();
    }
    /**
     * \@internal
     * @param {?} workspace
     * @return {?}
     */
    getWorkspaceTitle(workspace) {
        return getEntityTitle(workspace);
    }
    /**
     * When an workspace is manually selected, select it into the
     * store and emit an event.
     * \@internal
     * @param {?} event The selection change event
     * @return {?}
     */
    onSelectedChange(event) {
        /** @type {?} */
        const workspace = event.value;
        this.store.activateWorkspace(workspace);
        this.selectedChange.emit({ selected: true, value: workspace });
    }
}
WorkspaceSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-workspace-selector',
                template: "<igo-entity-selector\r\n  [store]=\"store\"\r\n  [many]=\"false\"\r\n  [titleAccessor]=\"getWorkspaceTitle\"\r\n  (selectedChange)=\"onSelectedChange($event)\">\r\n</igo-entity-selector>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["igo-entity-selector ::ng-deep mat-form-field .mat-form-field-infix{padding:0}igo-entity-selector ::ng-deep mat-form-field .mat-form-field-wrapper{padding-bottom:1.75em}"]
            }] }
];
WorkspaceSelectorComponent.propDecorators = {
    store: [{ type: Input }],
    selectedChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoWorkspaceSelectorModule {
}
IgoWorkspaceSelectorModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoEntitySelectorModule
                ],
                exports: [
                    WorkspaceSelectorComponent
                ],
                declarations: [
                    WorkspaceSelectorComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class is responsible of managing the relations between
 * entities and the actions that consume them. It also defines an
 * entity table template that may be used by an entity table component.
 * @template E
 */
class Workspace {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = options;
        /**
         * Observable of the selected entity
         */
        this.entity$ = new BehaviorSubject(undefined);
        /**
         * Observable of the selected widget
         */
        this.widget$ = new BehaviorSubject(undefined);
        /**
         * Observable of the selected widget's inputs
         */
        this.widgetInputs$ = new BehaviorSubject({});
        /**
         * Observable of the selected widget's subscribers
         */
        this.widgetSubscribers$ = new BehaviorSubject({});
        /**
         * Whether this workspace is active
         */
        this.active = false;
        /**
         * State change that trigger an update of the actions availability
         */
        this.changes$ = new Subject();
    }
    /**
     * Workspace id
     * @return {?}
     */
    get id() { return this.options.id; }
    /**
     * Workspace title
     * @return {?}
     */
    get title() { return this.options.title; }
    /**
     * Workspace title
     * @return {?}
     */
    get meta() { return this.options.meta || {}; }
    /**
     * Entities store
     * @return {?}
     */
    get entityStore() { return (/** @type {?} */ (this.options.entityStore)); }
    /**
     * Actions store (some actions activate a widget)
     * @return {?}
     */
    get actionStore() { return this.options.actionStore; }
    /**
     * Selected entity
     * @return {?}
     */
    get entity() { return this.entity$.value; }
    /**
     * Selected widget
     * @return {?}
     */
    get widget() { return this.widget$.value; }
    /**
     * Whether a widget is selected
     * @return {?}
     */
    get hasWidget() { return this.widget !== undefined; }
    /**
     * Whether this workspace is active
     * @return {?}
     */
    isActive() { return this.active; }
    /**
     * Activate the workspace. By doing that, the workspace will observe
     * the selected entity (from the store) and update the actions availability.
     * For example, some actions require an entity to be selected.
     * @return {?}
     */
    activate() {
        if (this.active === true) {
            this.deactivate();
        }
        this.active = true;
        if (this.entityStore !== undefined) {
            this.entities$$ = this.entityStore.stateView
                .manyBy$((/**
             * @param {?} record
             * @return {?}
             */
            (record) => record.state.selected === true))
                .subscribe((/**
             * @param {?} records
             * @return {?}
             */
            (records) => {
                // If more than one entity is selected, consider that no entity at all is selected.
                /** @type {?} */
                const entity = (records.length === 0 || records.length > 1) ? undefined : records[0].entity;
                this.onSelectEntity(entity);
            }));
        }
        if (this.actionStore !== undefined) {
            this.changes$$ = this.changes$
                .pipe(debounceTime(50))
                .subscribe((/**
             * @return {?}
             */
            () => this.actionStore.updateActionsAvailability()));
        }
        this.changes$.next();
    }
    /**
     * Deactivate the workspace. Unsubcribe to the selected entity.
     * @return {?}
     */
    deactivate() {
        this.active = false;
        this.deactivateWidget();
        if (this.entities$$ !== undefined) {
            this.entities$$.unsubscribe();
        }
        if (this.changes$$ !== undefined) {
            this.changes$$.unsubscribe();
        }
    }
    /**
     * Activate a widget. In itself, activating a widget doesn't render it but,
     * if an WorkspaceWidgetOutlet component is bound to this workspace, the widget will
     * show up.
     * @param {?} widget Widget
     * @param {?=} inputs Inputs the widget will receive
     * @param {?=} subscribers
     * @return {?}
     */
    activateWidget(widget, inputs = {}, subscribers = {}) {
        this.widget$.next(widget);
        this.widgetInputs$.next(inputs);
        this.widgetSubscribers$.next(subscribers);
    }
    /**
     * Deactivate a widget.
     * @return {?}
     */
    deactivateWidget() {
        this.widget$.next(undefined);
        this.changes$.next();
    }
    /**
     * When an entity is selected, keep a reference to that
     * entity and update the actions availability.
     * @private
     * @param {?} entity Entity
     * @return {?}
     */
    onSelectEntity(entity) {
        if (entity === this.entity$.value) {
            return;
        }
        this.entity$.next(entity);
        this.changes$.next();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This component dynamically render an Workspace's active widget.
 * It also deactivate that widget whenever the widget's component
 * emit the 'cancel' or 'complete' event.
 */
class WorkspaceWidgetOutletComponent {
    constructor() {
        /**
         * Event emitted when a widget is deactivate which happens
         * when the widget's component emits the 'cancel' or 'complete' event.
         */
        this.deactivateWidget = new EventEmitter();
    }
    /**
     * Observable of the workspace's active widget
     * \@internal
     * @return {?}
     */
    get widget$() { return this.workspace.widget$; }
    /**
     * Observable of the workspace's widget inputs
     * \@internal
     * @return {?}
     */
    get widgetInputs$() {
        return this.workspace.widgetInputs$;
    }
    /**
     * Observable of the workspace's widget inputs
     * \@internal
     * @return {?}
     */
    get widgetSubscribers$() {
        return this.workspace.widgetSubscribers$;
    }
    /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * \@internal
     * @param {?} widget Widget
     * @return {?}
     */
    onWidgetCancel(widget) {
        this.workspace.deactivateWidget();
        this.deactivateWidget.emit(widget);
    }
    /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * \@internal
     * @param {?} widget Widget
     * @return {?}
     */
    onWidgetComplete(widget) {
        this.workspace.deactivateWidget();
        this.deactivateWidget.emit(widget);
    }
}
WorkspaceWidgetOutletComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-workspace-widget-outlet',
                template: "<ng-container *ngIf=\"widget$ | async as widget\">\r\n  <igo-widget-outlet\r\n    [widget]=\"widget\"\r\n    [inputs]=\"widgetInputs$ | async\"\r\n    [subscribers]=\"widgetSubscribers$ | async\"\r\n    (cancel)=\"onWidgetCancel(widget)\"\r\n    (complete)=\"onWidgetComplete(widget)\">\r\n  </igo-widget-outlet>\r\n</ng-container>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["igo-widget-outlet{height:100%}"]
            }] }
];
/** @nocollapse */
WorkspaceWidgetOutletComponent.ctorParameters = () => [];
WorkspaceWidgetOutletComponent.propDecorators = {
    workspace: [{ type: Input }],
    deactivateWidget: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoWorkspaceWidgetOutletModule {
}
IgoWorkspaceWidgetOutletModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoWidgetOutletModule
                ],
                exports: [
                    WorkspaceWidgetOutletComponent
                ],
                declarations: [
                    WorkspaceWidgetOutletComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoWorkspaceModule {
}
IgoWorkspaceModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    IgoWorkspaceSelectorModule,
                    IgoWorkspaceWidgetOutletModule
                ],
                declarations: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} tool
 * @return {?}
 */
function ToolComponent(tool) {
    return (/**
     * @param {?} compType
     * @return {?}
     */
    (compType) => {
        ToolService.register(Object.assign({}, tool, (/** @type {?} */ ({
            component: compType
        }))));
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Widget extends DynamicComponent {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { IgoActionModule, IgoActionbarModule, IgoBackdropModule, IgoClickoutModule, IgoCloneModule, IgoCollapsibleModule, IgoConfirmDialogModule, IgoContextMenuModule, IgoCustomHtmlModule, IgoDrapDropModule, IgoDynamicComponentModule, IgoDynamicOutletModule, IgoFlexibleModule, IgoFormModule, IgoFormFormModule, IgoFormFieldModule, IgoFormGroupModule, IgoEntityModule, IgoEntitySelectorModule, IgoEntityTableModule, IgoImageModule, IgoJsonDialogModule, IgoKeyValueModule, IgoListModule, IgoPanelModule, IgoSidenavModule, IgoSpinnerModule, IgoStopPropagationModule, IgoTableModule, IgoToolModule, IgoToolboxModule, IgoWidgetModule, IgoWidgetOutletModule, IgoWorkspaceModule, IgoWorkspaceSelectorModule, IgoWorkspaceWidgetOutletModule, ActionbarMode, ActionStore, BackdropComponent, ClickoutDirective, ClonePipe, CollapsibleComponent, CollapseDirective, ConfirmDialogComponent, ConfirmDialogService, ContextMenuDirective, CustomHtmlComponent, SanitizeHtmlPipe, DragAndDropDirective, DynamicComponent, DynamicComponentService, formControlIsRequired, getDefaultErrorMessages, getControlErrorMessage, getAllFormFields, FormService, FormFieldService, FormFieldComponent, EntityOperationType, EntityTableColumnRenderer, EntityTableScrollBehavior, EntityTableSelectionState, getEntityProperty, getEntityId, getEntityTitle, getEntityTitleHtml, getEntityIcon, getEntityRevision, EntityStore, EntityStateManager, EntityStoreWatcher, EntityTransaction, EntityView, EntitySelectorComponent, EntityTableComponent, FlexibleComponent, SecureImagePipe, JsonDialogComponent, JsonDialogService, KeyValuePipe, ListComponent, ListItemDirective, PanelComponent, SidenavShimDirective, SpinnerComponent, SpinnerActivityDirective, StopPropagationDirective, StopDropPropagationDirective, TableComponent, TableDatabase, TableDataSource, TableActionColor, ToolService, ToolComponent, Toolbox, Widget, WidgetService, WorkspaceStore, Workspace, WorkspaceSelectorComponent, ActionbarItemComponent as ɵb, ActionbarComponent as ɵa, BackdropComponent as ɵc, ClickoutDirective as ɵd, ClonePipe as ɵe, CollapseDirective as ɵg, CollapsibleComponent as ɵf, ConfirmDialogComponent as ɵh, ConfirmDialogService as ɵi, ContextMenuDirective as ɵj, CustomHtmlComponent as ɵl, SanitizeHtmlPipe as ɵk, DragAndDropDirective as ɵm, DynamicOutletComponent as ɵn, DynamicComponentService as ɵo, EntitySelectorComponent as ɵz, EntityTableRowDirective as ɵbd, EntityTableComponent as ɵbc, FlexibleComponent as ɵp, FormFieldSelectComponent as ɵs, FormFieldTextComponent as ɵu, FormFieldTextareaComponent as ɵv, FormFieldComponent$1 as ɵq, FormGroupComponent as ɵw, FormComponent as ɵx, FormFieldComponent as ɵt, FormFieldService as ɵr, FormService as ɵy, SecureImagePipe as ɵbe, JsonDialogComponent as ɵbg, JsonDialogService as ɵbh, KeyValuePipe as ɵbf, ListItemDirective as ɵbi, ListComponent as ɵbj, PanelComponent as ɵbk, SidenavShimDirective as ɵbl, SpinnerActivityDirective as ɵbm, SpinnerComponent as ɵbn, StopDropPropagationDirective as ɵba, StopPropagationDirective as ɵbb, TableComponent as ɵbo, ToolService as ɵbr, toolSlideInOut as ɵbq, ToolboxComponent as ɵbp, WidgetService as ɵbt, WidgetOutletComponent as ɵbs, WorkspaceWidgetOutletComponent as ɵbu };

//# sourceMappingURL=igo2-common.js.map