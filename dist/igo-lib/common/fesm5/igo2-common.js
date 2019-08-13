import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import { DomSanitizer } from '@angular/platform-browser';
import t from 'typy';
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
import { __values, __decorate, __spread, __extends, __read } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var EntityOperationType = {
    Insert: 'Insert',
    Update: 'Update',
    Delete: 'Delete',
};
/** @enum {string} */
var EntityTableColumnRenderer = {
    Default: 'Default',
    HTML: 'HTML',
    UnsanitizedHTML: 'UnsanitizedHTML',
    Icon: 'Icon',
    ButtonGroup: 'ButtonGroup',
};
/** @enum {string} */
var EntityTableScrollBehavior = {
    Auto: 'auto',
    Instant: 'instant',
    Smooth: 'smooth',
};
/** @enum {string} */
var EntityTableSelectionState = {
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
    var meta = ((/** @type {?} */ (entity))).meta || {};
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
    var meta = ((/** @type {?} */ (entity))).meta || {};
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
    var meta = ((/** @type {?} */ (entity))).meta || {};
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
    var meta = ((/** @type {?} */ (entity))).meta || {};
    return meta.icon ? meta.icon : getEntityProperty(entity, meta.iconProperty || 'icon');
}
/**
 * Get an entity's revision.
 * @param {?} entity Entity
 * @return {?} Entity revision
 */
function getEntityRevision(entity) {
    /** @type {?} */
    var meta = ((/** @type {?} */ (entity))).meta || {};
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
var  /**
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
    function (entity, state$$1) {
        this.setMany([entity], state$$1);
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
    function (entities, state$$1) {
        var _this = this;
        entities.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        function (entity) {
            _this.index.set(_this.getKey(entity), Object.assign({}, state$$1));
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
    function (state$$1) {
        var _this = this;
        Array.from(this.index.keys()).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            _this.index.set(key, Object.assign({}, state$$1));
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
            var state$$1 = Object.assign({}, _this.get(entity), changes);
            _this.index.set(_this.getKey(entity), state$$1);
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
            var state$$1 = Object.assign({}, currentState, reversedChanges);
            _this.index.set(_this.getKey(entity), state$$1);
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
            var state$$1 = Object.assign({}, _this.index.get(key), changes);
            _this.index.set(key, state$$1);
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
            var state$$1 = _this.index.get(key) || (/** @type {?} */ ({}));
            if (keys.indexOf(key) >= 0) {
                _this.index.set(key, Object.assign({}, state$$1, changes));
            }
            else {
                _this.index.set(key, Object.assign({}, state$$1, reverseChanges));
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
            var _a = __read(bunch, 2), changeKey = _a[0], value = _a[1];
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An entity view streams entities from an observable source. These entities
 * can be filtered or sorted without affecting the source. A view can also
 * combine data from multiple sources, joined together.
 * @template E, V
 */
var  /**
 * An entity view streams entities from an observable source. These entities
 * can be filtered or sorted without affecting the source. A view can also
 * combine data from multiple sources, joined together.
 * @template E, V
 */
EntityView = /** @class */ (function () {
    function EntityView(source$) {
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
        /**
         * Number of entities
         */
        this.count$ = new BehaviorSubject(0);
        /**
         * Whether the store is empty
         */
        this.empty$ = new BehaviorSubject(true);
    }
    Object.defineProperty(EntityView.prototype, "count", {
        get: /**
         * @return {?}
         */
        function () { return this.count$.value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityView.prototype, "empty", {
        get: /**
         * @return {?}
         */
        function () { return this.empty$.value; },
        enumerable: true,
        configurable: true
    });
    /**
     * Get all the values
     * @returns Array of values
     */
    /**
     * Get all the values
     * @return {?} Array of values
     */
    EntityView.prototype.all = /**
     * Get all the values
     * @return {?} Array of values
     */
    function () {
        return this.values$.value;
    };
    /**
     * Observe all the values
     * @returns Observable of values
     */
    /**
     * Observe all the values
     * @return {?} Observable of values
     */
    EntityView.prototype.all$ = /**
     * Observe all the values
     * @return {?} Observable of values
     */
    function () {
        return this.values$;
    };
    /**
     * Get the first value that respects a criteria
     * @returns A value
     */
    /**
     * Get the first value that respects a criteria
     * @param {?} clause
     * @return {?} A value
     */
    EntityView.prototype.firstBy = /**
     * Get the first value that respects a criteria
     * @param {?} clause
     * @return {?} A value
     */
    function (clause) {
        return this.values$.value.find(clause);
    };
    /**
     * Observe the first value that respects a criteria
     * @returns Observable of a value
     */
    /**
     * Observe the first value that respects a criteria
     * @param {?} clause
     * @return {?} Observable of a value
     */
    EntityView.prototype.firstBy$ = /**
     * Observe the first value that respects a criteria
     * @param {?} clause
     * @return {?} Observable of a value
     */
    function (clause) {
        return this.values$.pipe(map((/**
         * @param {?} values
         * @return {?}
         */
        function (values) { return values.find(clause); })));
    };
    /**
     * Get all the values that respect a criteria
     * @returns Array of values
     */
    /**
     * Get all the values that respect a criteria
     * @param {?} clause
     * @return {?} Array of values
     */
    EntityView.prototype.manyBy = /**
     * Get all the values that respect a criteria
     * @param {?} clause
     * @return {?} Array of values
     */
    function (clause) {
        return this.values$.value.filter(clause);
    };
    /**
     * Observe all the values that respect a criteria
     * @returns Observable of values
     */
    /**
     * Observe all the values that respect a criteria
     * @param {?} clause
     * @return {?} Observable of values
     */
    EntityView.prototype.manyBy$ = /**
     * Observe all the values that respect a criteria
     * @param {?} clause
     * @return {?} Observable of values
     */
    function (clause) {
        return this.values$.pipe(map((/**
         * @param {?} values
         * @return {?}
         */
        function (values) { return values.filter(clause); })));
    };
    /**
     * Clear the filter and sort and unsubscribe from the source
     */
    /**
     * Clear the filter and sort and unsubscribe from the source
     * @return {?}
     */
    EntityView.prototype.clear = /**
     * Clear the filter and sort and unsubscribe from the source
     * @return {?}
     */
    function () {
        this.filter(undefined);
        this.sort(undefined);
    };
    /**
     * @return {?}
     */
    EntityView.prototype.destroy = /**
     * @return {?}
     */
    function () {
        if (this.values$$ !== undefined) {
            this.values$$.unsubscribe();
        }
        this.clear();
    };
    /**
     * Join another source to the stream (chainable)
     * @param clause Join clause
     * @returns The view
     */
    /**
     * Join another source to the stream (chainable)
     * @param {?} clause Join clause
     * @return {?} The view
     */
    EntityView.prototype.join = /**
     * Join another source to the stream (chainable)
     * @param {?} clause Join clause
     * @return {?} The view
     */
    function (clause) {
        if (this.lifted === true) {
            throw new Error('This view has already been lifted, therefore, no join is allowed.');
        }
        this.joins.push(clause);
        return this;
    };
    /**
     * Filter values (chainable)
     * @param clause Filter clause
     * @returns The view
     */
    /**
     * Filter values (chainable)
     * @param {?} clause Filter clause
     * @return {?} The view
     */
    EntityView.prototype.filter = /**
     * Filter values (chainable)
     * @param {?} clause Filter clause
     * @return {?} The view
     */
    function (clause) {
        this.filter$.next(clause);
        return this;
    };
    /**
     * Sort values (chainable)
     * @param clauseSort clause
     * @returns The view
     */
    /**
     * Sort values (chainable)
     * @param {?} clause
     * @return {?} The view
     */
    EntityView.prototype.sort = /**
     * Sort values (chainable)
     * @param {?} clause
     * @return {?} The view
     */
    function (clause) {
        this.sort$.next(clause);
        return this;
    };
    /**
     * Create the final observable
     * @returns Observable
     */
    /**
     * Create the final observable
     * @return {?} Observable
     */
    EntityView.prototype.lift = /**
     * Create the final observable
     * @return {?} Observable
     */
    function () {
        var _this = this;
        this.lifted = true;
        /** @type {?} */
        var source$ = this.joins.length > 0 ? this.liftJoinedSource() : this.liftSource();
        this.values$$ = combineLatest(source$, this.filter$, this.sort$)
            .pipe(skip(1), debounceTime(25))
            .subscribe((/**
         * @param {?} bunch
         * @return {?}
         */
        function (bunch) {
            var _a = __read(bunch, 3), _values = _a[0], filter$$1 = _a[1], sort = _a[2];
            /** @type {?} */
            var values = _this.processValues(_values, filter$$1, sort);
            _this.setValues(values);
        }));
    };
    /**
     * Create the source observable when no joins are defined
     * @returns Observable
     */
    /**
     * Create the source observable when no joins are defined
     * @private
     * @return {?} Observable
     */
    EntityView.prototype.liftSource = /**
     * Create the source observable when no joins are defined
     * @private
     * @return {?} Observable
     */
    function () {
        return (/** @type {?} */ ((/** @type {?} */ (this.source$))));
    };
    /**
     * Create the source observable when joins are defined
     * @returns Observable
     */
    /**
     * Create the source observable when joins are defined
     * @private
     * @return {?} Observable
     */
    EntityView.prototype.liftJoinedSource = /**
     * Create the source observable when joins are defined
     * @private
     * @return {?} Observable
     */
    function () {
        var _this = this;
        /** @type {?} */
        var sources$ = [this.source$, combineLatest.apply(void 0, __spread(this.joins.map((/**
             * @param {?} join
             * @return {?}
             */
            function (join) { return join.source; }))))];
        return combineLatest.apply(void 0, __spread(sources$)).pipe(map((/**
         * @param {?} bunch
         * @return {?}
         */
        function (bunch) {
            var _a = __read(bunch, 2), entities = _a[0], joinData = _a[1];
            return entities.reduce((/**
             * @param {?} values
             * @param {?} entity
             * @return {?}
             */
            function (values, entity) {
                /** @type {?} */
                var value = _this.computeJoinedValue(entity, joinData);
                if (value !== undefined) {
                    values.push(value);
                }
                return values;
            }), []);
        })));
    };
    /**
     * Apply joins to a source's entity and return the final value
     * @returns Final value
     */
    /**
     * Apply joins to a source's entity and return the final value
     * @private
     * @param {?} entity
     * @param {?} joinData
     * @return {?} Final value
     */
    EntityView.prototype.computeJoinedValue = /**
     * Apply joins to a source's entity and return the final value
     * @private
     * @param {?} entity
     * @param {?} joinData
     * @return {?} Final value
     */
    function (entity, joinData) {
        /** @type {?} */
        var value = (/** @type {?} */ (entity));
        /** @type {?} */
        var joinIndex = 0;
        while (value !== undefined && joinIndex < this.joins.length) {
            value = this.joins[joinIndex].reduce(value, joinData[joinIndex]);
            joinIndex += 1;
        }
        return (/** @type {?} */ (value));
    };
    /**
     * Filter and sort values before streaming them
     * @param values Values
     * @param filter Filter clause
     * @param sort Sort clause
     * @returns Filtered and sorted values
     */
    /**
     * Filter and sort values before streaming them
     * @private
     * @param {?} values Values
     * @param {?} filter Filter clause
     * @param {?} sort Sort clause
     * @return {?} Filtered and sorted values
     */
    EntityView.prototype.processValues = /**
     * Filter and sort values before streaming them
     * @private
     * @param {?} values Values
     * @param {?} filter Filter clause
     * @param {?} sort Sort clause
     * @return {?} Filtered and sorted values
     */
    function (values, filter$$1, sort) {
        values = values.slice(0);
        values = this.filterValues(values, filter$$1);
        values = this.sortValues(values, sort);
        return values;
    };
    /**
     * Filter values
     * @param values Values
     * @param filter Filter clause
     * @returns Filtered values
     */
    /**
     * Filter values
     * @private
     * @param {?} values Values
     * @param {?} clause
     * @return {?} Filtered values
     */
    EntityView.prototype.filterValues = /**
     * Filter values
     * @private
     * @param {?} values Values
     * @param {?} clause
     * @return {?} Filtered values
     */
    function (values, clause) {
        if (clause === undefined) {
            return values;
        }
        return values.filter((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return clause(value); }));
    };
    /**
     * Sort values
     * @param values Values
     * @param sort Sort clause
     * @returns Sorted values
     */
    /**
     * Sort values
     * @private
     * @param {?} values Values
     * @param {?} clause
     * @return {?} Sorted values
     */
    EntityView.prototype.sortValues = /**
     * Sort values
     * @private
     * @param {?} values Values
     * @param {?} clause
     * @return {?} Sorted values
     */
    function (values, clause) {
        if (clause === undefined) {
            return values;
        }
        return values.sort((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) {
            return ObjectUtils.naturalCompare(clause.valueAccessor(v1), clause.valueAccessor(v2), clause.direction);
        }));
    };
    /**
     * @private
     * @param {?} values
     * @return {?}
     */
    EntityView.prototype.setValues = /**
     * @private
     * @param {?} values
     * @return {?}
     */
    function (values) {
        this.values$.next(values);
        /** @type {?} */
        var count = values.length;
        /** @type {?} */
        var empty = count === 0;
        this.count$.next(count);
        this.empty$.next(empty);
    };
    return EntityView;
}());

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
var  /**
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
var  /**
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
EntityStoreWatcher = /** @class */ (function () {
    function EntityStoreWatcher(store, cdRef) {
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
    EntityStoreWatcher.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.setChangeDetector(undefined);
        this.setStore(undefined);
    };
    /**
     * Bind this workspace to a store and start watching for changes
     * @param store Entity store
     */
    /**
     * Bind this workspace to a store and start watching for changes
     * @param {?=} store Entity store
     * @return {?}
     */
    EntityStoreWatcher.prototype.setStore = /**
     * Bind this workspace to a store and start watching for changes
     * @param {?=} store Entity store
     * @return {?}
     */
    function (store) {
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
    };
    /**
     * Bind this workspace to a component's change detector
     * @param cdRef Change detector
     */
    /**
     * Bind this workspace to a component's change detector
     * @param {?=} cdRef Change detector
     * @return {?}
     */
    EntityStoreWatcher.prototype.setChangeDetector = /**
     * Bind this workspace to a component's change detector
     * @param {?=} cdRef Change detector
     * @return {?}
     */
    function (cdRef) {
        this.cdRef = cdRef;
    };
    /**
     * Set up observers on a store's entities and their state
     * @param store Entity store
     */
    /**
     * Set up observers on a store's entities and their state
     * @private
     * @return {?}
     */
    EntityStoreWatcher.prototype.setupObservers = /**
     * Set up observers on a store's entities and their state
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.teardownObservers();
        this.entities$$ = this.store.entities$
            .subscribe((/**
         * @param {?} entities
         * @return {?}
         */
        function (entities) { return _this.onEntitiesChange(entities); }));
        this.state$$ = this.store.state.change$
            .pipe(skip(1))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.onStateChange(); }));
    };
    /**
     * Teardown store observers
     */
    /**
     * Teardown store observers
     * @private
     * @return {?}
     */
    EntityStoreWatcher.prototype.teardownObservers = /**
     * Teardown store observers
     * @private
     * @return {?}
     */
    function () {
        if (this.entities$$ !== undefined) {
            this.entities$$.unsubscribe();
        }
        if (this.state$$ !== undefined) {
            this.state$$.unsubscribe();
        }
        this.entities$$ = undefined;
        this.state$$ = undefined;
    };
    /**
     * When the entities change, always trigger the changes detection
     */
    /**
     * When the entities change, always trigger the changes detection
     * @private
     * @param {?} entities
     * @return {?}
     */
    EntityStoreWatcher.prototype.onEntitiesChange = /**
     * When the entities change, always trigger the changes detection
     * @private
     * @param {?} entities
     * @return {?}
     */
    function (entities) {
        this.detectChanges();
    };
    /**
     * When the entities state change, trigger the change detection
     * only if the component has not handled these changes yet. For example,
     * the component might have initiated thoses changes itself.
     */
    /**
     * When the entities state change, trigger the change detection
     * only if the component has not handled these changes yet. For example,
     * the component might have initiated thoses changes itself.
     * @private
     * @return {?}
     */
    EntityStoreWatcher.prototype.onStateChange = /**
     * When the entities state change, trigger the change detection
     * only if the component has not handled these changes yet. For example,
     * the component might have initiated thoses changes itself.
     * @private
     * @return {?}
     */
    function () {
        var e_1, _a;
        /** @type {?} */
        var changesDetected = false;
        /** @type {?} */
        var storeIndex = this.store.state.index;
        /** @type {?} */
        var innerIndex = this.innerStateIndex;
        if (storeIndex.size !== innerIndex.size) {
            changesDetected = this.detectChanges();
        }
        /** @type {?} */
        var storeKeys = Array.from(storeIndex.keys());
        try {
            for (var storeKeys_1 = __values(storeKeys), storeKeys_1_1 = storeKeys_1.next(); !storeKeys_1_1.done; storeKeys_1_1 = storeKeys_1.next()) {
                var key = storeKeys_1_1.value;
                /** @type {?} */
                var storeValue = storeIndex.get(key);
                /** @type {?} */
                var innerValue = innerIndex.get(key);
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
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (storeKeys_1_1 && !storeKeys_1_1.done && (_a = storeKeys_1.return)) _a.call(storeKeys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Trigger the change detection of the workspace is bound to a change detector
     */
    /**
     * Trigger the change detection of the workspace is bound to a change detector
     * @private
     * @return {?}
     */
    EntityStoreWatcher.prototype.detectChanges = /**
     * Trigger the change detection of the workspace is bound to a change detector
     * @private
     * @return {?}
     */
    function () {
        if (this.cdRef !== undefined) {
            this.cdRef.detectChanges();
        }
        return true;
    };
    return EntityStoreWatcher;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class holds a reference to the insert, update and delete
 * operations performed on a store. This is useful to commit
 * these operations in a single pass or to cancel them.
 */
var  /**
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
            for (var operations_1 = __values(operations), operations_1_1 = operations_1.next(); !operations_1_1.done; operations_1_1 = operations_1.next()) {
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var EntitySelectorComponent = /** @class */ (function () {
    function EntitySelectorComponent(cdRef) {
        this.cdRef = cdRef;
        /**
         * The selected entity
         * \@internal
         */
        this.selected$ = new BehaviorSubject(undefined);
        /**
         * The current multi select option text
         * \@internal
         */
        this.multiText$ = new BehaviorSubject(undefined);
        this.multiSelectValue = { id: 'IGO_MULTI_SELECT' };
        /**
         * Title accessor
         */
        this.titleAccessor = getEntityTitle;
        /**
         * Text to display when nothing is selected
         */
        this.emptyText = undefined;
        /**
         * Wheter selecting many entities is allowed
         */
        this.multi = false;
        /**
         * Text to display for the select all option
         */
        this.multiAllText = 'All';
        /**
         * Text to display for the select none option
         */
        this.multiNoneText = 'None';
        /**
         * Event emitted when the selection changes
         */
        this.selectedChange = new EventEmitter();
    }
    /**
     * Create a store watcher and subscribe to the selected entity
     * @internal
     */
    /**
     * Create a store watcher and subscribe to the selected entity
     * \@internal
     * @return {?}
     */
    EntitySelectorComponent.prototype.ngOnInit = /**
     * Create a store watcher and subscribe to the selected entity
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
        this.selected$$ = this.store.stateView
            .manyBy$((/**
         * @param {?} record
         * @return {?}
         */
        function (record) { return record.state.selected === true; }))
            .subscribe((/**
         * @param {?} records
         * @return {?}
         */
        function (records) {
            /** @type {?} */
            var entities = records.map((/**
             * @param {?} record
             * @return {?}
             */
            function (record) { return record.entity; }));
            _this.onSelectFromStore(entities);
        }));
    };
    /**
     * Unsubscribe to the selected entity and destroy the store watcher
     * @internal
     */
    /**
     * Unsubscribe to the selected entity and destroy the store watcher
     * \@internal
     * @return {?}
     */
    EntitySelectorComponent.prototype.ngOnDestroy = /**
     * Unsubscribe to the selected entity and destroy the store watcher
     * \@internal
     * @return {?}
     */
    function () {
        this.watcher.destroy();
        this.selected$$.unsubscribe();
    };
    /**
     * On selection change, update the store's state and emit an event
     * @internal
     */
    /**
     * On selection change, update the store's state and emit an event
     * \@internal
     * @param {?} event
     * @return {?}
     */
    EntitySelectorComponent.prototype.onSelectionChange = /**
     * On selection change, update the store's state and emit an event
     * \@internal
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var values = event.value instanceof Array ? event.value : [event.value];
        /** @type {?} */
        var multiSelect = values.find((/**
         * @param {?} _value
         * @return {?}
         */
        function (_value) { return _value === _this.multiSelectValue; }));
        /** @type {?} */
        var entities = values.filter((/**
         * @param {?} _value
         * @return {?}
         */
        function (_value) { return _value !== _this.multiSelectValue; }));
        if (multiSelect !== undefined) {
            if (entities.length === this.store.count) {
                entities = [];
            }
            else if (entities.length < this.store.count) {
                entities = this.store.all();
            }
        }
        if (entities.length === 0) {
            this.store.state.updateAll({ selected: false });
        }
        else {
            this.store.state.updateMany(entities, { selected: true }, true);
        }
        /** @type {?} */
        var value = this.multi ? entities : event.value;
        this.selectedChange.emit({ selected: true, value: value });
    };
    /**
     * @private
     * @param {?} entities
     * @return {?}
     */
    EntitySelectorComponent.prototype.onSelectFromStore = /**
     * @private
     * @param {?} entities
     * @return {?}
     */
    function (entities) {
        if (this.multi === true) {
            this.selected$.next(entities);
        }
        else {
            /** @type {?} */
            var entity = entities.length > 0 ? entities[0] : undefined;
            this.selected$.next(entity);
        }
        this.updateMultiToggleWithEntities(entities);
    };
    /**
     * @private
     * @param {?} entities
     * @return {?}
     */
    EntitySelectorComponent.prototype.updateMultiToggleWithEntities = /**
     * @private
     * @param {?} entities
     * @return {?}
     */
    function (entities) {
        if (entities.length === this.store.count && this.multiText$.value !== this.multiNoneText) {
            this.multiText$.next(this.multiNoneText);
        }
        else if (entities.length < this.store.count && this.multiText$.value !== this.multiAllText) {
            this.multiText$.next(this.multiAllText);
        }
    };
    EntitySelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-entity-selector',
                    template: "<mat-form-field class=\"igo-entity-selector\">\r\n  <mat-select\r\n    [value]=\"selected$ | async\"\r\n    [multiple]=\"multi\"\r\n    [placeholder]=\"placeholder\"\r\n    (selectionChange)=\"onSelectionChange($event)\">\r\n    <mat-option *ngIf=\"emptyText !== undefined\">{{emptyText}}</mat-option>\r\n    <mat-option *ngIf=\"multi === true\" [value]=\"multiSelectValue\">{{multiText$ | async}}</mat-option>\r\n    <ng-template ngFor let-entity [ngForOf]=\"store.view.all$() | async\">\r\n      <mat-option [value]=\"entity\">\r\n        {{titleAccessor(entity)}}\r\n      </mat-option>\r\n    </ng-template>\r\n  </mat-select>\r\n</mat-form-field>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["mat-form-field{width:100%}"]
                }] }
    ];
    /** @nocollapse */
    EntitySelectorComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    EntitySelectorComponent.propDecorators = {
        store: [{ type: Input }],
        titleAccessor: [{ type: Input }],
        emptyText: [{ type: Input }],
        multi: [{ type: Input }],
        multiAllText: [{ type: Input }],
        multiNoneText: [{ type: Input }],
        placeholder: [{ type: Input }],
        selectedChange: [{ type: Output }]
    };
    return EntitySelectorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var EntityTableComponent = /** @class */ (function () {
    function EntityTableComponent(cdRef) {
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
    Object.defineProperty(EntityTableComponent.prototype, "headers", {
        /**
         * Table headers
         * @internal
         */
        get: /**
         * Table headers
         * \@internal
         * @return {?}
         */
        function () {
            /** @type {?} */
            var columns = this.template.columns
                .filter((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return column.visible !== false; }))
                .map((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return column.name; }));
            if (this.selectionCheckbox === true) {
                columns = ['selectionCheckbox'].concat(columns);
            }
            return columns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityTableComponent.prototype, "dataSource", {
        /**
         * Data source consumable by the underlying material table
         * @internal
         */
        get: /**
         * Data source consumable by the underlying material table
         * \@internal
         * @return {?}
         */
        function () { return this.store.view.all$(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityTableComponent.prototype, "selection", {
        /**
         * Whether selection is supported
         * @internal
         */
        get: /**
         * Whether selection is supported
         * \@internal
         * @return {?}
         */
        function () { return this.template.selection || false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityTableComponent.prototype, "selectionCheckbox", {
        /**
         * Whether a selection checkbox should be displayed
         * @internal
         */
        get: /**
         * Whether a selection checkbox should be displayed
         * \@internal
         * @return {?}
         */
        function () { return this.template.selectionCheckbox || false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityTableComponent.prototype, "selectMany", {
        /**
         * Whether selection many entities should eb supported
         * @internal
         */
        get: /**
         * Whether selection many entities should eb supported
         * \@internal
         * @return {?}
         */
        function () { return this.template.selectMany || false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityTableComponent.prototype, "fixedHeader", {
        /**
         * Whether selection many entities should eb supported
         * @internal
         */
        get: /**
         * Whether selection many entities should eb supported
         * \@internal
         * @return {?}
         */
        function () { return this.template.fixedHeader === undefined ? true : this.template.fixedHeader; },
        enumerable: true,
        configurable: true
    });
    /**
     * Track the selection state to properly display the selection checkboxes
     * @internal
     */
    /**
     * Track the selection state to properly display the selection checkboxes
     * \@internal
     * @return {?}
     */
    EntityTableComponent.prototype.ngOnInit = /**
     * Track the selection state to properly display the selection checkboxes
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this.selection$$ = this.store.stateView
            .manyBy$((/**
         * @param {?} record
         * @return {?}
         */
        function (record) { return record.state.selected === true; }))
            .subscribe((/**
         * @param {?} records
         * @return {?}
         */
        function (records) {
            _this.selectionState$.next(_this.computeSelectionState(records));
        }));
    };
    /**
     * When the store change, create a new watcher
     * @internal
     */
    /**
     * When the store change, create a new watcher
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    EntityTableComponent.prototype.ngOnChanges = /**
     * When the store change, create a new watcher
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var store = changes.store;
        if (store && store.currentValue !== store.previousValue) {
            if (this.watcher !== undefined) {
                this.watcher.destroy();
            }
            this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
        }
    };
    /**
     * Unbind the store watcher
     * @internal
     */
    /**
     * Unbind the store watcher
     * \@internal
     * @return {?}
     */
    EntityTableComponent.prototype.ngOnDestroy = /**
     * Unbind the store watcher
     * \@internal
     * @return {?}
     */
    function () {
        if (this.watcher !== undefined) {
            this.watcher.destroy();
        }
        this.selection$$.unsubscribe();
    };
    /**
     * Trigger a refresh of thre table. This can be useful when
     * the data source doesn't emit a new value but for some reason
     * the records need an update.
     * @internal
     */
    /**
     * Trigger a refresh of thre table. This can be useful when
     * the data source doesn't emit a new value but for some reason
     * the records need an update.
     * \@internal
     * @return {?}
     */
    EntityTableComponent.prototype.refresh = /**
     * Trigger a refresh of thre table. This can be useful when
     * the data source doesn't emit a new value but for some reason
     * the records need an update.
     * \@internal
     * @return {?}
     */
    function () {
        this.cdRef.detectChanges();
    };
    /**
     * On sort, sort the store
     * @param event Sort event
     * @internal
     */
    /**
     * On sort, sort the store
     * \@internal
     * @param {?} event Sort event
     * @return {?}
     */
    EntityTableComponent.prototype.onSort = /**
     * On sort, sort the store
     * \@internal
     * @param {?} event Sort event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var direction = event.direction;
        /** @type {?} */
        var column = this.template.columns
            .find((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.name === event.active; }));
        if (direction === 'asc' || direction === 'desc') {
            this.store.view.sort({
                valueAccessor: (/**
                 * @param {?} entity
                 * @return {?}
                 */
                function (entity) { return _this.getValue(entity, column); }),
                direction: direction
            });
        }
        else {
            this.store.view.sort(undefined);
        }
    };
    /**
     * When an entity is clicked, emit an event
     * @param entity Entity
     * @internal
     */
    /**
     * When an entity is clicked, emit an event
     * \@internal
     * @param {?} entity Entity
     * @return {?}
     */
    EntityTableComponent.prototype.onRowClick = /**
     * When an entity is clicked, emit an event
     * \@internal
     * @param {?} entity Entity
     * @return {?}
     */
    function (entity) {
        this.entityClick.emit(entity);
    };
    /**
     * When an entity is selected, select it in the store and emit an event. Even if
     * "many" is set to true, this method always select a single, exclusive row. Selecting
     * multiple rows should be achieved by using the checkboxes.
     * @param entity Entity
     * @internal
     */
    /**
     * When an entity is selected, select it in the store and emit an event. Even if
     * "many" is set to true, this method always select a single, exclusive row. Selecting
     * multiple rows should be achieved by using the checkboxes.
     * \@internal
     * @param {?} entity Entity
     * @return {?}
     */
    EntityTableComponent.prototype.onRowSelect = /**
     * When an entity is selected, select it in the store and emit an event. Even if
     * "many" is set to true, this method always select a single, exclusive row. Selecting
     * multiple rows should be achieved by using the checkboxes.
     * \@internal
     * @param {?} entity Entity
     * @return {?}
     */
    function (entity) {
        if (this.selection === false) {
            return;
        }
        // Selecting a
        this.store.state.update(entity, { selected: true }, true);
        this.entitySelectChange.emit({ added: [entity] });
    };
    /**
     * Select or unselect all rows at once. On select, emit an event.
     * @param toggle Select or unselect
     * @internal
     */
    /**
     * Select or unselect all rows at once. On select, emit an event.
     * \@internal
     * @param {?} toggle Select or unselect
     * @return {?}
     */
    EntityTableComponent.prototype.onToggleRows = /**
     * Select or unselect all rows at once. On select, emit an event.
     * \@internal
     * @param {?} toggle Select or unselect
     * @return {?}
     */
    function (toggle) {
        if (this.selection === false) {
            return;
        }
        this.store.state.updateAll({ selected: toggle });
        if (toggle === true) {
            this.entitySelectChange.emit({ added: [this.store.view.all()] });
        }
    };
    /**
     * When an entity is toggled, select or unselect it in the store. On select,
     * emit an event.
     * @param toggle Select or unselect
     * @param entity Entity
     * @internal
     */
    /**
     * When an entity is toggled, select or unselect it in the store. On select,
     * emit an event.
     * \@internal
     * @param {?} toggle Select or unselect
     * @param {?} entity Entity
     * @return {?}
     */
    EntityTableComponent.prototype.onToggleRow = /**
     * When an entity is toggled, select or unselect it in the store. On select,
     * emit an event.
     * \@internal
     * @param {?} toggle Select or unselect
     * @param {?} entity Entity
     * @return {?}
     */
    function (toggle, entity) {
        if (this.selection === false) {
            return;
        }
        /** @type {?} */
        var exclusive = toggle === true && !this.selectMany;
        this.store.state.update(entity, { selected: toggle }, exclusive);
        if (toggle === true) {
            this.entitySelectChange.emit({ added: [entity] });
        }
    };
    /**
     * Compute the selection state
     * @returns Whether all, some or no rows are selected
     * @internal
     */
    /**
     * Compute the selection state
     * \@internal
     * @private
     * @param {?} selectedRecords
     * @return {?} Whether all, some or no rows are selected
     */
    EntityTableComponent.prototype.computeSelectionState = /**
     * Compute the selection state
     * \@internal
     * @private
     * @param {?} selectedRecords
     * @return {?} Whether all, some or no rows are selected
     */
    function (selectedRecords) {
        /** @type {?} */
        var states = EntityTableSelectionState;
        /** @type {?} */
        var selectionCount = selectedRecords.length;
        return selectionCount === 0 ?
            states.None :
            (selectionCount === this.store.view.count ? states.All : states.Some);
    };
    /**
     * Whether a column is sortable
     * @param column Column
     * @returns True if a column is sortable
     * @internal
     */
    /**
     * Whether a column is sortable
     * \@internal
     * @param {?} column Column
     * @return {?} True if a column is sortable
     */
    EntityTableComponent.prototype.columnIsSortable = /**
     * Whether a column is sortable
     * \@internal
     * @param {?} column Column
     * @return {?} True if a column is sortable
     */
    function (column) {
        /** @type {?} */
        var sortable = column.sort;
        if (sortable === undefined) {
            sortable = this.template.sort === undefined ? false : this.template.sort;
        }
        return sortable;
    };
    /**
     * Whether a row is should be selected based on the underlying entity state
     * @param entity Entity
     * @returns True if a row should be selected
     * @internal
     */
    /**
     * Whether a row is should be selected based on the underlying entity state
     * \@internal
     * @param {?} entity Entity
     * @return {?} True if a row should be selected
     */
    EntityTableComponent.prototype.rowIsSelected = /**
     * Whether a row is should be selected based on the underlying entity state
     * \@internal
     * @param {?} entity Entity
     * @return {?} True if a row should be selected
     */
    function (entity) {
        /** @type {?} */
        var state$$1 = this.store.state.get(entity);
        return state$$1.selected ? state$$1.selected : false;
    };
    /**
     * Method to access an entity's values
     * @param entity Entity
     * @param column Column
     * @returns Any value
     * @internal
     */
    /**
     * Method to access an entity's values
     * \@internal
     * @param {?} entity Entity
     * @param {?} column Column
     * @return {?} Any value
     */
    EntityTableComponent.prototype.getValue = /**
     * Method to access an entity's values
     * \@internal
     * @param {?} entity Entity
     * @param {?} column Column
     * @return {?} Any value
     */
    function (entity, column) {
        if (column.valueAccessor !== undefined) {
            return column.valueAccessor(entity);
        }
        if (this.template.valueAccessor !== undefined) {
            return this.template.valueAccessor(entity, column.name);
        }
        return this.store.getProperty(entity, column.name);
    };
    /**
     * Return the type of renderer of a column
     * @param column Column
     * @returns Renderer type
     * @internal
     */
    /**
     * Return the type of renderer of a column
     * \@internal
     * @param {?} column Column
     * @return {?} Renderer type
     */
    EntityTableComponent.prototype.getColumnRenderer = /**
     * Return the type of renderer of a column
     * \@internal
     * @param {?} column Column
     * @return {?} Renderer type
     */
    function (column) {
        if (column.renderer !== undefined) {
            return column.renderer;
        }
        return EntityTableColumnRenderer.Default;
    };
    /**
     * Return the table ngClass
     * @returns ngClass
     * @internal
     */
    /**
     * Return the table ngClass
     * \@internal
     * @return {?} ngClass
     */
    EntityTableComponent.prototype.getTableClass = /**
     * Return the table ngClass
     * \@internal
     * @return {?} ngClass
     */
    function () {
        return {
            'igo-entity-table-with-selection': this.selection
        };
    };
    /**
     * Return a header ngClass
     * @returns ngClass
     * @internal
     */
    /**
     * Return a header ngClass
     * \@internal
     * @return {?} ngClass
     */
    EntityTableComponent.prototype.getHeaderClass = /**
     * Return a header ngClass
     * \@internal
     * @return {?} ngClass
     */
    function () {
        /** @type {?} */
        var func = this.template.headerClassFunc;
        if (func instanceof Function) {
            return func();
        }
        return {};
    };
    /**
     * Return a row ngClass
     * @param entity Entity
     * @returns ngClass
     * @internal
     */
    /**
     * Return a row ngClass
     * \@internal
     * @param {?} entity Entity
     * @return {?} ngClass
     */
    EntityTableComponent.prototype.getRowClass = /**
     * Return a row ngClass
     * \@internal
     * @param {?} entity Entity
     * @return {?} ngClass
     */
    function (entity) {
        /** @type {?} */
        var func = this.template.rowClassFunc;
        if (func instanceof Function) {
            return func(entity);
        }
        return {};
    };
    /**
     * Return a row ngClass
     * @param entity Entity
     * @param column Column
     * @returns ngClass
     * @internal
     */
    /**
     * Return a row ngClass
     * \@internal
     * @param {?} entity Entity
     * @param {?} column Column
     * @return {?} ngClass
     */
    EntityTableComponent.prototype.getCellClass = /**
     * Return a row ngClass
     * \@internal
     * @param {?} entity Entity
     * @param {?} column Column
     * @return {?} ngClass
     */
    function (entity, column) {
        /** @type {?} */
        var cls = {};
        /** @type {?} */
        var tableFunc = this.template.cellClassFunc;
        if (tableFunc instanceof Function) {
            Object.assign(cls, tableFunc(entity, column));
        }
        /** @type {?} */
        var columnFunc = column.cellClassFunc;
        if (columnFunc instanceof Function) {
            Object.assign(cls, columnFunc(entity));
        }
        return cls;
    };
    /**
     * When a button is clicked
     * @param func Function
     * @param entity Entity
     * @internal
     */
    /**
     * When a button is clicked
     * \@internal
     * @param {?} clickFunc
     * @param {?} entity Entity
     * @return {?}
     */
    EntityTableComponent.prototype.onButtonClick = /**
     * When a button is clicked
     * \@internal
     * @param {?} clickFunc
     * @param {?} entity Entity
     * @return {?}
     */
    function (clickFunc, entity) {
        if (typeof clickFunc === 'function') {
            clickFunc(entity);
        }
    };
    EntityTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-entity-table',
                    template: "<div class=\"table-container\">\r\n  <table\r\n    mat-table\r\n    matSort\r\n    [ngClass]=\"getTableClass()\"\r\n    [dataSource]=\"dataSource\"\r\n    (matSortChange)=\"onSort($event)\">\r\n\r\n    <ng-container matColumnDef=\"selectionCheckbox\" class=\"mat-cell-checkbox\">\r\n      <th mat-header-cell *matHeaderCellDef>\r\n        <ng-container *ngIf=\"selectMany\">\r\n          <ng-container *ngIf=\"selectionState$ | async as selectionState\">\r\n            <mat-checkbox (change)=\"onToggleRows($event.checked)\"\r\n                          [checked]=\"selectionState === entityTableSelectionState.All\"\r\n                          [indeterminate]=\"selectionState === entityTableSelectionState.Some\">\r\n            </mat-checkbox>\r\n          </ng-container>\r\n        </ng-container>\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let entity\">\r\n        <mat-checkbox (click)=\"$event.stopPropagation()\"\r\n                      (change)=\"onToggleRow($event.checked, entity)\"\r\n                      [checked]=\"rowIsSelected(entity)\">\r\n        </mat-checkbox>\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container [matColumnDef]=\"column.name\" *ngFor=\"let column of template.columns\">\r\n      <ng-container *ngIf=\"columnIsSortable(column)\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n          {{column.title}}\r\n        </th>\r\n      </ng-container>\r\n\r\n      <ng-container *ngIf=\"!columnIsSortable(column)\">\r\n        <th mat-header-cell *matHeaderCellDef>\r\n          {{column.title}}\r\n        </th>\r\n      </ng-container>\r\n\r\n      <ng-container *ngIf=\"getColumnRenderer(column) as columnRenderer\">\r\n        <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.Default\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\">\r\n              {{getValue(entity, column)}}\r\n            </td>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.HTML\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\"\r\n              [innerHTML]=\"getValue(entity, column)\">\r\n            </td>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.UnsanitizedHTML\">\r\n              <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n                [ngClass]=\"getCellClass(entity, column)\"\r\n                [innerHTML]=\"getValue(entity, column) | sanitizeHtml\">\r\n              </td>\r\n            </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.Icon\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\">\r\n              <mat-icon svgIcon=\"{{getValue(entity, column)}}\"></mat-icon>\r\n            </td>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.ButtonGroup\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\">\r\n              <span *ngFor=\"let button of getValue(entity, column)\">\r\n                <button *ngIf=\"button.style === 'mat-icon-button'\"\r\n                  igoStopPropagation\r\n                  mat-icon-button\r\n                  [color]=\"button.color\"\r\n                  (click)=\"onButtonClick(button.click, entity)\">\r\n                  <mat-icon svgIcon=\"{{button.icon}}\"></mat-icon>\r\n                </button>\r\n                <button *ngIf=\"button.style !== 'mat-icon-button'\"\r\n                  igoStopPropagation\r\n                  mat-mini-fab\r\n                  [color]=\"button.color\"\r\n                  (click)=\"onButtonClick(button.click, entity)\">\r\n                  <mat-icon svgIcon=\"{{button.icon}}\"></mat-icon>\r\n                </button>\r\n              </span>\r\n            </td>\r\n          </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n\r\n    <tr\r\n      mat-header-row\r\n      *matHeaderRowDef=\"headers; sticky: fixedHeader;\"\r\n      [ngClass]=\"getHeaderClass()\">\r\n    </tr>\r\n    <tr\r\n      mat-row\r\n      igoEntityTableRow\r\n      *matRowDef=\"let entity; columns: headers;\"\r\n      [scrollBehavior]=\"scrollBehavior\"\r\n      [ngClass]=\"getRowClass(entity)\"\r\n      [selection]=\"selection\"\r\n      [selected]=\"rowIsSelected(entity)\"\r\n      (select)=\"onRowSelect(entity)\"\r\n      (click)=\"onRowClick(entity)\">\r\n    </tr>\r\n\r\n  </table>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{width:100%;height:100%;display:block}:host.table-compact ::ng-deep .mat-checkbox .mat-checkbox-ripple,:host.table-compact tr.mat-header-row{height:36px}:host.table-compact ::ng-deep .mat-checkbox .mat-checkbox-ripple,:host.table-compact tr.mat-row{height:28px}.table-container{display:flex;flex-direction:column;height:100%;overflow:auto;flex:1 1 auto}.mat-cell-text{overflow:hidden;word-wrap:break-word}entity-table table.igo-entity-table-with-selection tr:hover{-o-box-shadow:2px 0 2px 0 #ddd;box-shadow:2px 0 2px 0 #ddd;cursor:pointer}table button{margin:7px}"]
                }] }
    ];
    /** @nocollapse */
    EntityTableComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    EntityTableComponent.propDecorators = {
        store: [{ type: Input }],
        template: [{ type: Input }],
        scrollBehavior: [{ type: Input }],
        entityClick: [{ type: Output }],
        entitySelectChange: [{ type: Output }]
    };
    return EntityTableComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var ActionbarMode = {
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
var  /**
 * The class is a specialized version of an EntityStore that stores
 * actions.
 */
ActionStore = /** @class */ (function (_super) {
    __extends(ActionStore, _super);
    function ActionStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Update actions availability. That means disabling or enabling some
     * actions based on the conditions they define.
     */
    /**
     * Update actions availability. That means disabling or enabling some
     * actions based on the conditions they define.
     * @return {?}
     */
    ActionStore.prototype.updateActionsAvailability = /**
     * Update actions availability. That means disabling or enabling some
     * actions based on the conditions they define.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var availables = [];
        /** @type {?} */
        var unavailables = [];
        this.entities$.value.forEach((/**
         * @param {?} action
         * @return {?}
         */
        function (action) {
            /** @type {?} */
            var conditions = action.conditions || [];
            /** @type {?} */
            var args = action.conditionArgs || [];
            /** @type {?} */
            var available = conditions.every((/**
             * @param {?} condition
             * @return {?}
             */
            function (condition) {
                return condition.apply(void 0, __spread(args));
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
    };
    return ActionStore;
}(EntityStore));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A list of action buttons.
 * This component can be displayed in one of two way: 'dock' or 'overlay'
 */
var ActionbarComponent = /** @class */ (function () {
    function ActionbarComponent(cdRef, overlay) {
        var _this = this;
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
            function () {
                _this.collapsed = !_this.collapsed;
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
    Object.defineProperty(ActionbarComponent.prototype, "overlayClass", {
        get: /**
         * @return {?}
         */
        function () {
            return [this._overlayClass, 'igo-actionbar-overlay'].join(' ');
        },
        /**
         * Class to add to the actionbar overlay
         */
        set: /**
         * Class to add to the actionbar overlay
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._overlayClass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionbarComponent.prototype, "withTitleClass", {
        /**
         * @ignore
         */
        get: /**
         * @ignore
         * @return {?}
         */
        function () {
            return this.withTitle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionbarComponent.prototype, "withIconClass", {
        /**
         * @ignore
         */
        get: /**
         * @ignore
         * @return {?}
         */
        function () {
            return this.withIcon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionbarComponent.prototype, "horizontalClass", {
        /**
         * @ignore
         */
        get: /**
         * @ignore
         * @return {?}
         */
        function () {
            return this.horizontal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} action
     * @return {?}
     */
    ActionbarComponent.defaultItemClassFunc = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        return {};
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    ActionbarComponent.prototype.ngOnChanges = /**
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var store = changes.store;
        if (store && store.currentValue !== store.previousValue) {
            if (this.watcher !== undefined) {
                this.watcher.destroy();
            }
            this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
        }
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @return {?}
     */
    ActionbarComponent.prototype.ngOnDestroy = /**
     * \@internal
     * @return {?}
     */
    function () {
        this.watcher.destroy();
    };
    /**
     * Invoke the action handler
     * @internal
     */
    /**
     * Invoke the action handler
     * \@internal
     * @param {?} action
     * @return {?}
     */
    ActionbarComponent.prototype.onTriggerAction = /**
     * Invoke the action handler
     * \@internal
     * @param {?} action
     * @return {?}
     */
    function (action) {
        /** @type {?} */
        var args = action.args || [];
        action.handler.apply(action, __spread(args));
    };
    ActionbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-actionbar',
                    template: "<mat-list *ngIf=\"mode === actionbarMode.Dock\">\r\n\r\n  <igo-actionbar-item\r\n    *ngIf=\"withToggleButton\"\r\n    color=\"accent\"\r\n    [withTitle]=\"false\"\r\n    [withIcon]=\"true\"\r\n    [color]=\"color\"\r\n    [disabled]=\"store.view.empty\"\r\n    [action]=\"toggleCollapseAction\"\r\n    (trigger)=\"onTriggerAction(toggleCollapseAction)\">\r\n  </igo-actionbar-item>\r\n\r\n  <ng-template *ngIf=\"!collapsed\" ngFor let-action [ngForOf]=\"store.view.all$() | async\">\r\n    <igo-actionbar-item\r\n      [ngClass]=\"itemClassFunc(action)\"\r\n      color=\"accent\"\r\n      [withTitle]=\"withTitle\"\r\n      [withIcon]=\"withIcon\"\r\n      [color]=\"color\"\r\n      [disabled]=\"store.state.get(action).disabled\"\r\n      [action]=\"action\"\r\n      (trigger)=\"onTriggerAction(action)\">\r\n    </igo-actionbar-item>\r\n  </ng-template>\r\n</mat-list>\r\n\r\n<div *ngIf=\"mode === actionbarMode.Overlay\">\r\n  <button\r\n    mat-icon-button\r\n    [matMenuTriggerFor]=\"actionbarMenu\"\r\n    [disabled]=\"store.view.empty\">\r\n    <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n  </button>\r\n\r\n  <mat-menu\r\n    #actionbarMenu=\"matMenu\"\r\n    class=\"igo-compact-menu igo-no-min-width-menu\"\r\n    overlapTrigger=\"true\"\r\n    [xPosition]=\"xPosition\"\r\n    [yPosition]=\"yPosition\"\r\n    [class]=\"overlayClass\">\r\n\r\n    <mat-list>\r\n      <ng-template ngFor let-action [ngForOf]=\"store.view.all$() | async\">\r\n        <igo-actionbar-item\r\n          color=\"accent\"\r\n          [withTitle]=\"withTitle\"\r\n          [withIcon]=\"withIcon\"\r\n          [color]=\"color\"\r\n          [disabled]=\"store.state.get(action).disabled\"\r\n          [action]=\"action\"\r\n          (trigger)=\"onTriggerAction(action)\">\r\n        </igo-actionbar-item>\r\n      </ng-template>\r\n    </mat-list>\r\n  </mat-menu>\r\n</div>\r\n<mat-card *ngIf=\"mode === actionbarMode.Context\" class=\"context-menu-card mat-elevation-z4\">\r\n  <mat-list>\r\n      <ng-template ngFor let-action [ngForOf]=\"store.view.all$() | async\">\r\n          <igo-actionbar-item\r\n            color=\"accent\"\r\n            [withTitle]=\"withTitle\"\r\n            [withIcon]=\"withIcon\"\r\n            [color]=\"color\"\r\n            [disabled]=\"store.state.get(action).disabled\"\r\n            [action]=\"action\"\r\n            (trigger)=\"onTriggerAction(action)\">\r\n          </igo-actionbar-item>\r\n        <br/>\r\n      </ng-template>\r\n  </mat-list>\r\n</mat-card>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;height:100%;overflow:auto;position:relative}button{margin:4px}mat-list{padding-top:0}:host.horizontal{max-width:100%;overflow:hidden}:host.horizontal mat-list{width:auto;white-space:nowrap}:host.horizontal igo-actionbar-item{display:inline-block}:host ::ng-deep .mat-list .mat-list-item .mat-list-text>*{white-space:normal;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;max-height:36px;line-height:18px;-webkit-line-clamp:2}:host ::ng-deep .mat-list-base .mat-list-item.mat-list-item-with-avatar{height:46px}:host ::ng-deep .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content{display:-webkit-flex;height:46px;padding:3px}:host ::ng-deep .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content>mat-icon{padding:8px}igo-actionbar-item ::ng-deep mat-list-item [mat-list-avatar]{height:auto;width:40px}igo-actionbar-item ::ng-deep mat-list-item:hover{cursor:pointer}.context-menu-card{padding:8px 3px;margin:10px}"]
                }] }
    ];
    /** @nocollapse */
    ActionbarComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: Overlay }
    ]; };
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
    return ActionbarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An action button
 */
var ActionbarItemComponent = /** @class */ (function () {
    function ActionbarItemComponent() {
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
    Object.defineProperty(ActionbarItemComponent.prototype, "title", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () { return this.action.title; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionbarItemComponent.prototype, "tooltip", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () { return this.action.tooltip || this.title; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionbarItemComponent.prototype, "icon", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () { return this.action.icon; },
        enumerable: true,
        configurable: true
    });
    /**
     * When the action button is clicked, emit the 'trigger' event but don't
     * invoke the action handler. This is handled by the parent component.
     * @internal
     */
    /**
     * When the action button is clicked, emit the 'trigger' event but don't
     * invoke the action handler. This is handled by the parent component.
     * \@internal
     * @return {?}
     */
    ActionbarItemComponent.prototype.onClick = /**
     * When the action button is clicked, emit the 'trigger' event but don't
     * invoke the action handler. This is handled by the parent component.
     * \@internal
     * @return {?}
     */
    function () {
        if (this.disabled === true) {
            return;
        }
        this.trigger.emit(this.action);
    };
    ActionbarItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-actionbar-item',
                    template: "<mat-list-item\r\n  matTooltipClass=\"actionbarItemTooltip\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"tooltip | translate\"\r\n  [ngClass]=\"{'igo-actionbar-item-disabled': disabled}\"\r\n  (click)=\"onClick()\">\r\n  <button *ngIf=\"withIcon\"\r\n    mat-list-avatar\r\n    mat-icon-button\r\n    [color]=\"color\"\r\n    [disabled]=\"disabled\">\r\n    <mat-icon *ngIf=\"withIcon\" svgIcon=\"{{icon}}\"></mat-icon>\r\n  </button>\r\n  <h4 *ngIf=\"withTitle\" matLine>{{title | translate}}</h4>\r\n</mat-list-item>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["mat-list-item.igo-actionbar-item-disabled{color:rgba(0,0,0,.26);cursor:default!important}"]
                }] }
    ];
    /** @nocollapse */
    ActionbarItemComponent.ctorParameters = function () { return []; };
    ActionbarItemComponent.propDecorators = {
        action: [{ type: Input }],
        color: [{ type: Input }],
        withTitle: [{ type: Input }],
        withIcon: [{ type: Input }],
        disabled: [{ type: Input }],
        trigger: [{ type: Output }]
    };
    return ActionbarItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
var IgoActionbarModule = /** @class */ (function () {
    function IgoActionbarModule() {
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
    return IgoActionbarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoActionModule = /** @class */ (function () {
    function IgoActionModule() {
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
    return IgoActionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BackdropComponent = /** @class */ (function () {
    function BackdropComponent() {
    }
    Object.defineProperty(BackdropComponent.prototype, "shown", {
        get: /**
         * @return {?}
         */
        function () {
            return this._shown;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._shown = value;
        },
        enumerable: true,
        configurable: true
    });
    BackdropComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-backdrop',
                    template: "<div [ngClass]=\"{'igo-backdrop-shown': shown}\"></div>\r\n",
                    styles: [":host>div{position:absolute;top:0;bottom:0;left:0;right:0;background-color:rgba(100,100,100,.5);z-index:2;display:none}:host>div.igo-backdrop-shown{display:block}"]
                }] }
    ];
    /** @nocollapse */
    BackdropComponent.ctorParameters = function () { return []; };
    BackdropComponent.propDecorators = {
        shown: [{ type: Input }]
    };
    return BackdropComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoBackdropModule = /** @class */ (function () {
    function IgoBackdropModule() {
    }
    /**
     * @return {?}
     */
    IgoBackdropModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoBackdropModule,
            providers: []
        };
    };
    IgoBackdropModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [BackdropComponent],
                    exports: [BackdropComponent]
                },] }
    ];
    return IgoBackdropModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClickoutDirective = /** @class */ (function () {
    function ClickoutDirective(el) {
        this.el = el;
        this.clickout = new EventEmitter();
    }
    /**
     * @param {?} event
     * @param {?} target
     * @return {?}
     */
    ClickoutDirective.prototype.handleMouseClick = /**
     * @param {?} event
     * @param {?} target
     * @return {?}
     */
    function (event, target) {
        if (!target) {
            return;
        }
        if (!this.el.nativeElement.contains(target)) {
            this.clickout.emit(event);
        }
    };
    ClickoutDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoClickout]'
                },] }
    ];
    /** @nocollapse */
    ClickoutDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ClickoutDirective.propDecorators = {
        clickout: [{ type: Output }],
        handleMouseClick: [{ type: HostListener, args: ['document:click', ['$event', '$event.target'],] }]
    };
    return ClickoutDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoClickoutModule = /** @class */ (function () {
    function IgoClickoutModule() {
    }
    /**
     * @return {?}
     */
    IgoClickoutModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoClickoutModule,
            providers: []
        };
    };
    IgoClickoutModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [ClickoutDirective],
                    exports: [ClickoutDirective]
                },] }
    ];
    return IgoClickoutModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClonePipe = /** @class */ (function () {
    function ClonePipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    ClonePipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function (value, args) {
        if (value === undefined) {
            return value;
        }
        if (value instanceof Array) {
            return value.map((/**
             * @param {?} obj
             * @return {?}
             */
            function (obj) { return Object.assign(Object.create(obj), obj); }));
        }
        else {
            return Object.assign(Object.create(value), value);
        }
    };
    ClonePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'clone'
                },] }
    ];
    return ClonePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoCloneModule = /** @class */ (function () {
    function IgoCloneModule() {
    }
    /**
     * @return {?}
     */
    IgoCloneModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoCloneModule,
            providers: []
        };
    };
    IgoCloneModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [ClonePipe],
                    exports: [ClonePipe]
                },] }
    ];
    return IgoCloneModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CollapseDirective = /** @class */ (function () {
    function CollapseDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this._collapsed = false;
        this.toggle = new EventEmitter();
    }
    Object.defineProperty(CollapseDirective.prototype, "target", {
        get: /**
         * @return {?}
         */
        function () {
            return this._target;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._target = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollapseDirective.prototype, "collapsed", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsed;
        },
        set: /**
         * @param {?} collapsed
         * @return {?}
         */
        function (collapsed) {
            collapsed ? this.collapseTarget() : this.expandTarget();
            this._collapsed = collapsed;
            this.toggle.emit(collapsed);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CollapseDirective.prototype.click = /**
     * @return {?}
     */
    function () {
        this.collapsed = !this.collapsed;
    };
    /**
     * @private
     * @return {?}
     */
    CollapseDirective.prototype.collapseTarget = /**
     * @private
     * @return {?}
     */
    function () {
        this.renderer.addClass(this.target, 'igo-collapsed');
        this.renderer.addClass(this.el.nativeElement, 'collapsed');
    };
    /**
     * @private
     * @return {?}
     */
    CollapseDirective.prototype.expandTarget = /**
     * @private
     * @return {?}
     */
    function () {
        this.renderer.removeClass(this.target, 'igo-collapsed');
        this.renderer.removeClass(this.el.nativeElement, 'collapsed');
    };
    CollapseDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoCollapse]'
                },] }
    ];
    /** @nocollapse */
    CollapseDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    CollapseDirective.propDecorators = {
        target: [{ type: Input }],
        collapsed: [{ type: Input }],
        toggle: [{ type: Output }],
        click: [{ type: HostListener, args: ['click',] }]
    };
    return CollapseDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CollapsibleComponent = /** @class */ (function () {
    function CollapsibleComponent() {
        this._title = '';
        this._collapsed = false;
    }
    Object.defineProperty(CollapsibleComponent.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () {
            return this._title;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollapsibleComponent.prototype, "collapsed", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsed;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._collapsed = value;
        },
        enumerable: true,
        configurable: true
    });
    CollapsibleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-collapsible',
                    template: "<mat-list-item>\r\n  <mat-icon\r\n    svgIcon=\"chevron-up\" \r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse\r\n    [target]=\"content\"\r\n    [collapsed]=\"collapsed\">\r\n  </mat-icon>\r\n  <h4 matLine>{{title}}</h4>\r\n</mat-list-item>\r\n\r\n<div #content>\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                    styles: [":host>>>.mat-list .mat-list-item.mat-list-avatar{height:auto;width:auto;padding:0}mat-list-item{overflow:hidden}"]
                }] }
    ];
    /** @nocollapse */
    CollapsibleComponent.ctorParameters = function () { return []; };
    CollapsibleComponent.propDecorators = {
        title: [{ type: Input }],
        collapsed: [{ type: Input }]
    };
    return CollapsibleComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoCollapsibleModule = /** @class */ (function () {
    function IgoCollapsibleModule() {
    }
    /**
     * @return {?}
     */
    IgoCollapsibleModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoCollapsibleModule,
            providers: []
        };
    };
    IgoCollapsibleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatIconModule, MatListModule],
                    declarations: [CollapsibleComponent, CollapseDirective],
                    exports: [CollapsibleComponent, CollapseDirective]
                },] }
    ];
    return IgoCollapsibleModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ConfirmDialogComponent = /** @class */ (function () {
    function ConfirmDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    ConfirmDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-confirm-dialog',
                    template: "<h2 mat-dialog-title>{{'igo.common.confirmDialog.title' |\u00A0translate}}</h2>\r\n<div mat-dialog-content>{{confirmMessage}}</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\" (click)=\"dialogRef.close(true)\">{{'igo.common.confirmDialog.confirmBtn' | translate}}</button>\r\n  <button mat-button (click)=\"dialogRef.close(false)\">{{'igo.common.confirmDialog.cancelBtn' |\u00A0translate}}</button>\r\n</div>\r\n",
                    styles: ["h2{margin:5px 0 10px}div[mat-dialog-content]{max-width:200px}div[mat-dialog-actions]{margin:10px 0 0}"]
                }] }
    ];
    /** @nocollapse */
    ConfirmDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef }
    ]; };
    return ConfirmDialogComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ConfirmDialogService = /** @class */ (function () {
    function ConfirmDialogService(dialog) {
        this.dialog = dialog;
    }
    /**
     * @param {?} message
     * @return {?}
     */
    ConfirmDialogService.prototype.open = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var dialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: false
        });
        dialogRef.componentInstance.confirmMessage = message;
        return dialogRef.afterClosed();
    };
    ConfirmDialogService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ConfirmDialogService.ctorParameters = function () { return [
        { type: MatDialog }
    ]; };
    return ConfirmDialogService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoConfirmDialogModule = /** @class */ (function () {
    function IgoConfirmDialogModule() {
    }
    /**
     * @return {?}
     */
    IgoConfirmDialogModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoConfirmDialogModule,
            providers: []
        };
    };
    IgoConfirmDialogModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatButtonModule, MatDialogModule, IgoLanguageModule],
                    declarations: [ConfirmDialogComponent],
                    exports: [ConfirmDialogComponent],
                    providers: [ConfirmDialogService],
                    entryComponents: [ConfirmDialogComponent]
                },] }
    ];
    return IgoConfirmDialogModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ContextMenuDirective = /** @class */ (function () {
    function ContextMenuDirective(overlay, viewContainerRef, elementRef) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.elementRef = elementRef;
        this.menuPosition = new EventEmitter();
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    ContextMenuDirective.prototype.onContextMenu = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var _this = this;
        var x = _a.x, y = _a.y;
        this.close();
        event.preventDefault();
        this.menuPosition.emit({ x: x, y: y });
        this.overlayRef = null;
        /** @type {?} */
        var positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo({ x: x, y: y })
            .withPositions([
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            }
        ]);
        this.overlayRef = this.overlay.create({
            positionStrategy: positionStrategy,
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
        function (event) {
            /** @type {?} */
            var clickTarget = (/** @type {?} */ (event.target));
            _this.close();
            return (!!_this.overlayRef &&
                !_this.overlayRef.overlayElement.contains(clickTarget));
        })), take(1))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
        this.sub = fromEvent(document, 'contextmenu')
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var clickTarget = (/** @type {?} */ (event.target));
            if (clickTarget &&
                !_this.elementRef.nativeElement.contains(clickTarget) &&
                !_this.overlayRef.overlayElement.contains(clickTarget)) {
                return true;
            }
            else {
                event.preventDefault();
            }
        })), take(1))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
    };
    /**
     * @return {?}
     */
    ContextMenuDirective.prototype.close = /**
     * @return {?}
     */
    function () {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    };
    ContextMenuDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoContextMenu]'
                },] }
    ];
    /** @nocollapse */
    ContextMenuDirective.ctorParameters = function () { return [
        { type: Overlay },
        { type: ViewContainerRef },
        { type: ElementRef }
    ]; };
    ContextMenuDirective.propDecorators = {
        menuContext: [{ type: Input, args: ['igoContextMenu',] }],
        menuPosition: [{ type: Output }],
        onContextMenu: [{ type: HostListener, args: ['contextmenu', ['$event'],] }]
    };
    return ContextMenuDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoContextMenuModule = /** @class */ (function () {
    function IgoContextMenuModule() {
    }
    /**
     * @return {?}
     */
    IgoContextMenuModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoContextMenuModule,
            providers: []
        };
    };
    IgoContextMenuModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [ContextMenuDirective],
                    exports: [ContextMenuDirective]
                },] }
    ];
    return IgoContextMenuModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CustomHtmlComponent = /** @class */ (function () {
    function CustomHtmlComponent() {
        this._html = '';
    }
    Object.defineProperty(CustomHtmlComponent.prototype, "html", {
        get: /**
         * @return {?}
         */
        function () {
            return this._html;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._html = value;
        },
        enumerable: true,
        configurable: true
    });
    CustomHtmlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-custom-html',
                    template: "<div class=\"custom-html\" [innerHTML]=\"html | sanitizeHtml \"></div>\r\n",
                    styles: [".custom-html{padding:20px}"]
                }] }
    ];
    /** @nocollapse */
    CustomHtmlComponent.ctorParameters = function () { return []; };
    CustomHtmlComponent.propDecorators = {
        html: [{ type: Input }]
    };
    return CustomHtmlComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SanitizeHtmlPipe = /** @class */ (function () {
    function SanitizeHtmlPipe(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    SanitizeHtmlPipe.prototype.transform = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        return this._sanitizer.bypassSecurityTrustHtml(v);
    };
    SanitizeHtmlPipe.decorators = [
        { type: Pipe, args: [{ name: 'sanitizeHtml' },] }
    ];
    /** @nocollapse */
    SanitizeHtmlPipe.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    return SanitizeHtmlPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoCustomHtmlModule = /** @class */ (function () {
    function IgoCustomHtmlModule() {
    }
    /**
     * @return {?}
     */
    IgoCustomHtmlModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoCustomHtmlModule
        };
    };
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
    return IgoCustomHtmlModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DragAndDropDirective = /** @class */ (function () {
    function DragAndDropDirective() {
        this.allowedExtensions = [];
        this.filesDropped = new EventEmitter();
        this.filesInvalid = new EventEmitter();
        this.background = 'inherit';
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    DragAndDropDirective.prototype.onDragOver = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#999';
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    DragAndDropDirective.prototype.onDragLeave = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = 'inherit';
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    DragAndDropDirective.prototype.onDrop = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = 'inherit';
        /** @type {?} */
        var filesObj = this.validExtensions(evt);
        if (filesObj.valid.length) {
            this.filesDropped.emit(filesObj.valid);
        }
        if (filesObj.invalid.length) {
            this.filesInvalid.emit(filesObj.invalid);
        }
    };
    /**
     * @private
     * @param {?} evt
     * @return {?}
     */
    DragAndDropDirective.prototype.validExtensions = /**
     * @private
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        var e_1, _a;
        /** @type {?} */
        var files = evt.dataTransfer.files;
        /** @type {?} */
        var filesObj = {
            valid: [],
            invalid: []
        };
        if (files.length > 0) {
            try {
                for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                    var file = files_1_1.value;
                    /** @type {?} */
                    var ext = file.name.split('.')[file.name.split('.').length - 1];
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
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return filesObj;
    };
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
    return DragAndDropDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoDrapDropModule = /** @class */ (function () {
    function IgoDrapDropModule() {
    }
    /**
     * @return {?}
     */
    IgoDrapDropModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoDrapDropModule,
            providers: []
        };
    };
    IgoDrapDropModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [DragAndDropDirective],
                    exports: [DragAndDropDirective]
                },] }
    ];
    return IgoDrapDropModule;
}());

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
var  /**
 * This class is used in the DynamicComponentOutlet component. It holds
 * a reference to a component factory and can render that component
 * in a target element on demand. It's also possible to set inputs
 * and to subscribe to outputs.
 * @template C
 */
DynamicComponent = /** @class */ (function () {
    function DynamicComponent(componentFactory) {
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
     * @param target Target element
     */
    /**
     * Render the component to a target element.
     * Set it's inputs and subscribe to it's outputs.
     * @param {?} target Target element
     * @return {?}
     */
    DynamicComponent.prototype.setTarget = /**
     * Render the component to a target element.
     * Set it's inputs and subscribe to it's outputs.
     * @param {?} target Target element
     * @return {?}
     */
    function (target) {
        this.target = target;
        this.componentRef = target.createComponent(this.componentFactory);
        this.updateInputs(this.inputs);
        this.updateSubscribers(this.subscribers);
    };
    /**
     * Destroy this component. That means, removing from it's target
     * element and unsubscribing to it's outputs.
     */
    /**
     * Destroy this component. That means, removing from it's target
     * element and unsubscribing to it's outputs.
     * @return {?}
     */
    DynamicComponent.prototype.destroy = /**
     * Destroy this component. That means, removing from it's target
     * element and unsubscribing to it's outputs.
     * @return {?}
     */
    function () {
        if (this.target !== undefined) {
            this.target.clear();
        }
        if (this.componentRef !== undefined) {
            this.componentRef.destroy();
            this.componentRef = undefined;
        }
        this.unsubscribeAll();
    };
    /**
     * Update the component inputs. This is an update so any
     * key not defined won't be overwritten.
     */
    /**
     * Update the component inputs. This is an update so any
     * key not defined won't be overwritten.
     * @param {?} inputs
     * @return {?}
     */
    DynamicComponent.prototype.updateInputs = /**
     * Update the component inputs. This is an update so any
     * key not defined won't be overwritten.
     * @param {?} inputs
     * @return {?}
     */
    function (inputs) {
        this.inputs = inputs;
        if (this.componentRef === undefined) {
            return;
        }
        /** @type {?} */
        var instance = this.componentRef.instance;
        /** @type {?} */
        var allowedInputs = this.componentFactory.inputs;
        allowedInputs.forEach((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var key = value.propName;
            if (inputs.hasOwnProperty(key)) {
                instance[key] = inputs[key];
            }
        }));
        if (typeof ((/** @type {?} */ (instance))).onUpdateInputs === 'function') {
            ((/** @type {?} */ (instance))).onUpdateInputs();
        }
    };
    /**
     * Update the component subscribers. This is an update so any
     * key not defined won't be overwritten.
     */
    /**
     * Update the component subscribers. This is an update so any
     * key not defined won't be overwritten.
     * @param {?} subscribers
     * @return {?}
     */
    DynamicComponent.prototype.updateSubscribers = /**
     * Update the component subscribers. This is an update so any
     * key not defined won't be overwritten.
     * @param {?} subscribers
     * @return {?}
     */
    function (subscribers) {
        var _this = this;
        this.subscribers = subscribers;
        if (this.componentRef === undefined) {
            return;
        }
        /** @type {?} */
        var instance = this.componentRef.instance;
        /** @type {?} */
        var allowedSubscribers = this.componentFactory.outputs;
        allowedSubscribers.forEach((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var key = value.propName;
            if (subscribers.hasOwnProperty(key)) {
                /** @type {?} */
                var emitter_1 = instance[key];
                /** @type {?} */
                var subscriber = subscribers[key];
                if (Array.isArray(subscriber)) {
                    subscriber.forEach((/**
                     * @param {?} _subscriber
                     * @return {?}
                     */
                    function (_subscriber) {
                        _this.subscriptions.push(emitter_1.subscribe(_subscriber));
                    }));
                }
                else {
                    _this.subscriptions.push(emitter_1.subscribe(subscriber));
                }
            }
        }));
    };
    /**
     * Unsubscribe to all outputs.
     */
    /**
     * Unsubscribe to all outputs.
     * @private
     * @return {?}
     */
    DynamicComponent.prototype.unsubscribeAll = /**
     * Unsubscribe to all outputs.
     * @private
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.unsubscribe(); }));
        this.subscriptions = [];
    };
    return DynamicComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service to creates DynamicComponent instances from base component classes
 */
var DynamicComponentService = /** @class */ (function () {
    function DynamicComponentService(resolver) {
        this.resolver = resolver;
    }
    /**
     * Creates a DynamicComponent instance from a base component class
     * @param componentCls The component class
     * @returns DynamicComponent instance
     */
    /**
     * Creates a DynamicComponent instance from a base component class
     * @param {?} componentCls The component class
     * @return {?} DynamicComponent instance
     */
    DynamicComponentService.prototype.create = /**
     * Creates a DynamicComponent instance from a base component class
     * @param {?} componentCls The component class
     * @return {?} DynamicComponent instance
     */
    function (componentCls) {
        /** @type {?} */
        var factory = this.resolver.resolveComponentFactory((/** @type {?} */ (componentCls)));
        return new DynamicComponent(factory);
    };
    DynamicComponentService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DynamicComponentService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver }
    ]; };
    /** @nocollapse */ DynamicComponentService.ngInjectableDef = defineInjectable({ factory: function DynamicComponentService_Factory() { return new DynamicComponentService(inject(ComponentFactoryResolver)); }, token: DynamicComponentService, providedIn: "root" });
    return DynamicComponentService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DynamicOutletComponent = /** @class */ (function () {
    function DynamicOutletComponent(dynamicComponentService, cdRef) {
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
     * @internal
     */
    /**
     * If the dynamic component changes, create it.
     * If the inputs or subscribers change, update the current component's
     * inputs or subscribers.
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    DynamicOutletComponent.prototype.ngOnChanges = /**
     * If the dynamic component changes, create it.
     * If the inputs or subscribers change, update the current component's
     * inputs or subscribers.
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var component = changes.component;
        /** @type {?} */
        var inputs = changes.inputs;
        /** @type {?} */
        var subscribers = changes.subscribers;
        /** @type {?} */
        var eq = ObjectUtils.objectsAreEquivalent;
        if (component && component.currentValue !== component.previousValue) {
            this.createComponent(component.currentValue);
        }
        else {
            /** @type {?} */
            var inputsAreEquivalents = inputs && eq(inputs.currentValue || {}, inputs.previousValue || {});
            /** @type {?} */
            var subscribersAreEquivalents = subscribers &&
                eq(subscribers.currentValue || {}, subscribers.previousValue || {});
            if (inputsAreEquivalents === false) {
                this.updateInputs();
            }
            if (subscribersAreEquivalents === false) {
                this.updateSubscribers();
            }
        }
        this.cdRef.detectChanges();
    };
    /**
     * Destroy the dynamic component and all it's subscribers
     * @internal
     */
    /**
     * Destroy the dynamic component and all it's subscribers
     * \@internal
     * @return {?}
     */
    DynamicOutletComponent.prototype.ngOnDestroy = /**
     * Destroy the dynamic component and all it's subscribers
     * \@internal
     * @return {?}
     */
    function () {
        if (this.dynamicComponent) {
            this.dynamicComponent.destroy();
        }
    };
    /**
     * Create a  DynamicComponent out of the component class and render it.
     * @internal
     */
    /**
     * Create a  DynamicComponent out of the component class and render it.
     * \@internal
     * @private
     * @param {?} component
     * @return {?}
     */
    DynamicOutletComponent.prototype.createComponent = /**
     * Create a  DynamicComponent out of the component class and render it.
     * \@internal
     * @private
     * @param {?} component
     * @return {?}
     */
    function (component) {
        if (this.dynamicComponent !== undefined) {
            this.dynamicComponent.destroy();
        }
        this.dynamicComponent =
            component instanceof DynamicComponent
                ? component
                : this.dynamicComponentService.create(component);
        this.renderComponent();
    };
    /**
     * Create and render the dynamic component. Set it's inputs and subscribers
     * @internal
     */
    /**
     * Create and render the dynamic component. Set it's inputs and subscribers
     * \@internal
     * @private
     * @return {?}
     */
    DynamicOutletComponent.prototype.renderComponent = /**
     * Create and render the dynamic component. Set it's inputs and subscribers
     * \@internal
     * @private
     * @return {?}
     */
    function () {
        this.updateInputs();
        this.updateSubscribers();
        this.dynamicComponent.setTarget(this.target);
    };
    /**
     * Update the dynamic component inputs. This is an update so any
     * key not defined won't be overwritten.
     * @internal
     */
    /**
     * Update the dynamic component inputs. This is an update so any
     * key not defined won't be overwritten.
     * \@internal
     * @private
     * @return {?}
     */
    DynamicOutletComponent.prototype.updateInputs = /**
     * Update the dynamic component inputs. This is an update so any
     * key not defined won't be overwritten.
     * \@internal
     * @private
     * @return {?}
     */
    function () {
        this.dynamicComponent.updateInputs(this.inputs);
    };
    /**
     * Update the dynamic component subscribers. This is an update so any
     * key not defined won't be overwritten.
     * @internal
     */
    /**
     * Update the dynamic component subscribers. This is an update so any
     * key not defined won't be overwritten.
     * \@internal
     * @private
     * @return {?}
     */
    DynamicOutletComponent.prototype.updateSubscribers = /**
     * Update the dynamic component subscribers. This is an update so any
     * key not defined won't be overwritten.
     * \@internal
     * @private
     * @return {?}
     */
    function () {
        this.dynamicComponent.updateSubscribers(this.subscribers);
    };
    DynamicOutletComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-dynamic-outlet',
                    template: "<ng-template #target></ng-template>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;width:100%;height:100%}"]
                }] }
    ];
    /** @nocollapse */
    DynamicOutletComponent.ctorParameters = function () { return [
        { type: DynamicComponentService },
        { type: ChangeDetectorRef }
    ]; };
    DynamicOutletComponent.propDecorators = {
        component: [{ type: Input }],
        inputs: [{ type: Input }],
        subscribers: [{ type: Input }],
        target: [{ type: ViewChild, args: ['target', { read: ViewContainerRef },] }]
    };
    return DynamicOutletComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
var IgoDynamicOutletModule = /** @class */ (function () {
    function IgoDynamicOutletModule() {
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
    return IgoDynamicOutletModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoDynamicComponentModule = /** @class */ (function () {
    function IgoDynamicComponentModule() {
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
    return IgoDynamicComponentModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FlexibleComponent = /** @class */ (function () {
    function FlexibleComponent(el, mediaService) {
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
    Object.defineProperty(FlexibleComponent.prototype, "initial", {
        get: /**
         * @return {?}
         */
        function () {
            return this._initial;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._initial = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexibleComponent.prototype, "collapsed", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsed;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._collapsed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexibleComponent.prototype, "expanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expanded;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._expanded = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexibleComponent.prototype, "initialMobile", {
        get: /**
         * @return {?}
         */
        function () {
            return this._initialMobile;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._initialMobile = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexibleComponent.prototype, "collapsedMobile", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsedMobile;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._collapsedMobile = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexibleComponent.prototype, "expandedMobile", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expandedMobile;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._expandedMobile = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexibleComponent.prototype, "direction", {
        get: /**
         * @return {?}
         */
        function () {
            return this._direction;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._direction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexibleComponent.prototype, "state", {
        get: /**
         * @return {?}
         */
        function () {
            return this._state;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            /** @type {?} */
            var sizes = {
                initial: this.initial,
                collapsed: this.collapsed,
                expanded: this.expanded
            };
            /** @type {?} */
            var media = this.mediaService.media$.value;
            if (media === 'mobile') {
                Object.assign(sizes, {
                    initial: this.initialMobile,
                    collapsed: this.collapsedMobile,
                    expanded: this.expandedMobile
                });
            }
            /** @type {?} */
            var size = sizes[value];
            if (size !== undefined) {
                this.setSize(size);
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this._state = value;
                }), FlexibleComponent.transitionTime);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FlexibleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.el.nativeElement.className += this.direction;
        // Since this component supports different sizes
        // on mobile, force a redraw when the media changes
        this.mediaService.media$.subscribe((/**
         * @param {?} media
         * @return {?}
         */
        function (media) { return (_this.state = _this.state); }));
    };
    /**
     * @private
     * @param {?} size
     * @return {?}
     */
    FlexibleComponent.prototype.setSize = /**
     * @private
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this._state = 'transition';
        if (this.direction === 'column') {
            this.main.nativeElement.style.height = size;
        }
        else if (this.direction === 'row') {
            this.main.nativeElement.style.width = size;
        }
    };
    FlexibleComponent.transitionTime = 250;
    FlexibleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-flexible',
                    template: "<div #flexibleMain class=\"igo-flexible-main {{state}} {{direction}}\">\r\n  <div class=\"igo-container\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n</div>\r\n<div class=\"igo-flexible-fill\">\r\n  <div>\r\n  \t<div class=\"igo-container\">\r\n      <ng-content select=\"[igoFlexibleFill]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                    styles: [":host{display:flex;height:100%;width:100%}:host.column{flex-direction:column}:host.row{flex-direction:row}.igo-flexible-main{flex:0 0 auto;overflow:hidden}.igo-flexible-main.column{transition:height .25s ease-in}.igo-flexible-main.row{transition:width .25s ease-in}.igo-flexible-fill>div{position:absolute;top:0;bottom:0;left:0;right:0}.igo-container{width:calc(100% - 2 * 5px);height:100%;padding:5px 0;margin:0 5px;overflow:hidden;position:relative}::ng-deep .igo-flexible-fill{flex:1 1 auto;overflow:hidden;position:relative}::ng-deep .igo-content{height:100%;width:100%;overflow:auto}::ng-deep igo-panel{height:100%}"]
                }] }
    ];
    /** @nocollapse */
    FlexibleComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: MediaService }
    ]; };
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
    return FlexibleComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoFlexibleModule = /** @class */ (function () {
    function IgoFlexibleModule() {
    }
    /**
     * @return {?}
     */
    IgoFlexibleModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoFlexibleModule,
            providers: []
        };
    };
    IgoFlexibleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [FlexibleComponent],
                    exports: [FlexibleComponent]
                },] }
    ];
    return IgoFlexibleModule;
}());

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
        var validator = control.validator((/** @type {?} */ ({})));
        if (validator && validator.required) {
            return true;
        }
    }
    if (((/** @type {?} */ (control))).controls) {
        /** @type {?} */
        var requiredControl = Object.keys(((/** @type {?} */ (control))).controls).find((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
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
    var errors = control.errors || {};
    /** @type {?} */
    var errorKeys = Object.keys(errors);
    /** @type {?} */
    var errorMessages = errorKeys
        .map((/**
     * @param {?} key
     * @return {?}
     */
    function (key) { return messages[key]; }))
        .filter((/**
     * @param {?} message
     * @return {?}
     */
    function (message) { return message !== undefined; }));
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
    function (acc, group) {
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
var FormComponent = /** @class */ (function () {
    function FormComponent() {
        /**
         * Event emitted when the form is submitted
         */
        this.submitForm = new EventEmitter();
    }
    Object.defineProperty(FormComponent.prototype, "hasButtons", {
        get: /**
         * @return {?}
         */
        function () {
            return this.buttons.nativeElement.children.length !== 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Is the entity or the template change, recreate the form or repopulate it.
     * @internal
     */
    /**
     * Is the entity or the template change, recreate the form or repopulate it.
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    FormComponent.prototype.ngOnChanges = /**
     * Is the entity or the template change, recreate the form or repopulate it.
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var formData = changes.formData;
        if (formData && formData.currentValue !== formData.previousValue) {
            if (formData.currentValue === undefined) {
                this.clear();
            }
            else {
                this.setData(formData.currentValue);
            }
        }
    };
    /**
     * Transform the form data to a feature and emit an event
     * @param event Form submit event
     * @internal
     */
    /**
     * Transform the form data to a feature and emit an event
     * \@internal
     * @return {?}
     */
    FormComponent.prototype.onSubmit = /**
     * Transform the form data to a feature and emit an event
     * \@internal
     * @return {?}
     */
    function () {
        this.submitForm.emit(this.getData());
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    FormComponent.prototype.setData = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.form.fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            field.control.setValue(t(data, field.name).safeObject);
        }));
        this.form.groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            group.fields.forEach((/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                field.control.setValue(t(data, field.name).safeObject);
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    FormComponent.prototype.getData = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var data = {};
        getAllFormFields(this.form).forEach((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            _this.updateDataWithFormField(data, field);
        }));
        return data;
    };
    /**
     * @private
     * @param {?} data
     * @param {?} field
     * @return {?}
     */
    FormComponent.prototype.updateDataWithFormField = /**
     * @private
     * @param {?} data
     * @param {?} field
     * @return {?}
     */
    function (data, field) {
        /** @type {?} */
        var control = field.control;
        if (!control.disabled) {
            data[field.name] = control.value;
        }
    };
    /**
     * Clear form
     */
    /**
     * Clear form
     * @private
     * @return {?}
     */
    FormComponent.prototype.clear = /**
     * Clear form
     * @private
     * @return {?}
     */
    function () {
        this.form.control.reset();
    };
    FormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-form',
                    template: "\r\n<form\r\n  [formGroup]=\"form.control\"\r\n  (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"igo-form-body\" [ngClass]=\"{'igo-form-body-with-buttons': hasButtons}\">\r\n    <div class=\"igo-form-content\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n    <div #buttons class=\"igo-form-buttons\">\r\n      <ng-content select=\"[formButtons]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</form>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block}form{width:100%;height:100%}.igo-form-body,.igo-form-content{height:100%}.igo-form-body-with-buttons .igo-form-content{height:calc(100% - 56px)}.igo-form-content{display:flex}"]
                }] }
    ];
    /** @nocollapse */
    FormComponent.ctorParameters = function () { return []; };
    FormComponent.propDecorators = {
        form: [{ type: Input }],
        formData: [{ type: Input }],
        submitForm: [{ type: Output }],
        buttons: [{ type: ViewChild, args: ['buttons',] }]
    };
    return FormComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
var IgoFormFormModule = /** @class */ (function () {
    function IgoFormFormModule() {
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
    return IgoFormFormModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service where all available form fields are registered.
 */
var FormFieldService = /** @class */ (function () {
    function FormFieldService() {
    }
    /**
     * @param {?} type
     * @param {?} component
     * @return {?}
     */
    FormFieldService.register = /**
     * @param {?} type
     * @param {?} component
     * @return {?}
     */
    function (type, component) {
        FormFieldService.fields[type] = component;
    };
    /**
     * Return field component by type
     * @param type Field type
     * @returns Field component
     */
    /**
     * Return field component by type
     * @param {?} type Field type
     * @return {?} Field component
     */
    FormFieldService.prototype.getFieldByType = /**
     * Return field component by type
     * @param {?} type Field type
     * @return {?} Field component
     */
    function (type) {
        return FormFieldService.fields[type];
    };
    FormFieldService.fields = {};
    FormFieldService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FormFieldService.ctorParameters = function () { return []; };
    /** @nocollapse */ FormFieldService.ngInjectableDef = defineInjectable({ factory: function FormFieldService_Factory() { return new FormFieldService(); }, token: FormFieldService, providedIn: "root" });
    return FormFieldService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FormService = /** @class */ (function () {
    function FormService(formBuilder) {
        this.formBuilder = formBuilder;
    }
    /**
     * @param {?} fields
     * @param {?} groups
     * @return {?}
     */
    FormService.prototype.form = /**
     * @param {?} fields
     * @param {?} groups
     * @return {?}
     */
    function (fields, groups) {
        /** @type {?} */
        var control = this.formBuilder.group({});
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            control.addControl(field.name, field.control);
        }));
        groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            control.addControl(group.name, group.control);
        }));
        return { fields: fields, groups: groups, control: control };
    };
    /**
     * @param {?} config
     * @param {?} fields
     * @return {?}
     */
    FormService.prototype.group = /**
     * @param {?} config
     * @param {?} fields
     * @return {?}
     */
    function (config, fields) {
        /** @type {?} */
        var options = config.options || {};
        /** @type {?} */
        var control = this.formBuilder.group({});
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            control.addControl(field.name, field.control);
        }));
        control.setValidators(options.validator);
        return (/** @type {?} */ (Object.assign({}, config, { fields: fields, control: control })));
    };
    /**
     * @param {?} config
     * @return {?}
     */
    FormService.prototype.field = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        /** @type {?} */
        var options = config.options || {};
        /** @type {?} */
        var state$$1 = Object.assign({ value: '' }, {
            disabled: options.disabled
        });
        /** @type {?} */
        var control = this.formBuilder.control(state$$1);
        control.setValidators(options.validator);
        return (/** @type {?} */ (Object.assign({ type: 'text' }, config, { control: control })));
    };
    /**
     * @param {?} config
     * @param {?} partial
     * @return {?}
     */
    FormService.prototype.extendFieldConfig = /**
     * @param {?} config
     * @param {?} partial
     * @return {?}
     */
    function (config, partial) {
        /** @type {?} */
        var options = Object.assign({}, config.options || {}, partial.options || {});
        /** @type {?} */
        var inputs = Object.assign({}, config.inputs || {}, partial.inputs || {});
        /** @type {?} */
        var subscribers = Object.assign({}, config.subscribers || {}, partial.subscribers || {});
        return Object.assign({}, config, { options: options, inputs: inputs, subscribers: subscribers });
    };
    FormService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FormService.ctorParameters = function () { return [
        { type: FormBuilder }
    ]; };
    /** @nocollapse */ FormService.ngInjectableDef = defineInjectable({ factory: function FormService_Factory() { return new FormService(inject(FormBuilder)); }, token: FormService, providedIn: "root" });
    return FormService;
}());

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
    function (compType) {
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
var FormFieldComponent$1 = /** @class */ (function () {
    function FormFieldComponent$$1(formFieldService) {
        this.formFieldService = formFieldService;
    }
    Object.defineProperty(FormFieldComponent$$1.prototype, "fieldOptions", {
        get: /**
         * @return {?}
         */
        function () {
            return this.field.options || {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormFieldComponent$$1.prototype.getFieldComponent = /**
     * @return {?}
     */
    function () {
        return this.formFieldService.getFieldByType(this.field.type || 'text');
    };
    /**
     * @return {?}
     */
    FormFieldComponent$$1.prototype.getFieldInputs = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var errors = this.fieldOptions.errors || {};
        return Object.assign({
            placeholder: this.field.title,
            disableSwitch: this.fieldOptions.disableSwitch || false
        }, Object.assign({}, this.field.inputs || {}), {
            formControl: this.field.control,
            errors: Object.assign({}, getDefaultErrorMessages(), errors)
        });
    };
    /**
     * @return {?}
     */
    FormFieldComponent$$1.prototype.getFieldSubscribers = /**
     * @return {?}
     */
    function () {
        return Object.assign({}, this.field.subscribers || {});
    };
    FormFieldComponent$$1.decorators = [
        { type: Component, args: [{
                    selector: 'igo-form-field',
                    template: "\r\n\r\n<ng-container *ngIf=\"field !== undefined\">\r\n  <igo-dynamic-outlet\r\n    [component]=\"getFieldComponent()\"\r\n    [inputs]=\"getFieldInputs()\"\r\n    [subscribers]=\"getFieldSubscribers()\">\r\n  </igo-dynamic-outlet>\r\n</ng-container>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["::ng-deep mat-form-field{width:100%}::ng-deep .igo-form-disable-switch{margin-right:8px}"]
                }] }
    ];
    /** @nocollapse */
    FormFieldComponent$$1.ctorParameters = function () { return [
        { type: FormFieldService }
    ]; };
    FormFieldComponent$$1.propDecorators = {
        field: [{ type: Input }]
    };
    return FormFieldComponent$$1;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This component renders a select field
 */
var FormFieldSelectComponent = /** @class */ (function () {
    function FormFieldSelectComponent() {
        this.disabled$ = new BehaviorSubject(false);
        /**
         * Wheter a disable switch should be available
         */
        this.disableSwitch = false;
    }
    Object.defineProperty(FormFieldSelectComponent.prototype, "choices", {
        /**
         * Select input choices
         */
        set: /**
         * Select input choices
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value instanceof Observable) {
                this.choices$ = value;
            }
            else {
                this.choices$ = of(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormFieldSelectComponent.prototype, "required", {
        /**
         * Whether the field is required
         */
        get: /**
         * Whether the field is required
         * @return {?}
         */
        function () {
            return formControlIsRequired(this.formControl);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormFieldSelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.disabled$.next(this.formControl.disabled);
    };
    /**
     * Get error message
     */
    /**
     * Get error message
     * @return {?}
     */
    FormFieldSelectComponent.prototype.getErrorMessage = /**
     * Get error message
     * @return {?}
     */
    function () {
        return getControlErrorMessage(this.formControl, this.errors);
    };
    /**
     * @return {?}
     */
    FormFieldSelectComponent.prototype.onDisableSwitchClick = /**
     * @return {?}
     */
    function () {
        this.toggleDisabled();
    };
    /**
     * @private
     * @return {?}
     */
    FormFieldSelectComponent.prototype.toggleDisabled = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var disabled = !this.disabled$.value;
        if (disabled === true) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
        this.disabled$.next(disabled);
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
    return FormFieldSelectComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This component renders a text field
 */
var FormFieldTextComponent = /** @class */ (function () {
    function FormFieldTextComponent() {
        this.disabled$ = new BehaviorSubject(false);
        /**
         * Wheter a disable switch should be available
         */
        this.disableSwitch = false;
    }
    Object.defineProperty(FormFieldTextComponent.prototype, "required", {
        /**
         * Whether the field is required
         */
        get: /**
         * Whether the field is required
         * @return {?}
         */
        function () {
            return formControlIsRequired(this.formControl);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormFieldTextComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.disabled$.next(this.formControl.disabled);
    };
    /**
     * Get error message
     */
    /**
     * Get error message
     * @return {?}
     */
    FormFieldTextComponent.prototype.getErrorMessage = /**
     * Get error message
     * @return {?}
     */
    function () {
        return getControlErrorMessage(this.formControl, this.errors);
    };
    /**
     * @return {?}
     */
    FormFieldTextComponent.prototype.onDisableSwitchClick = /**
     * @return {?}
     */
    function () {
        this.toggleDisabled();
    };
    /**
     * @private
     * @return {?}
     */
    FormFieldTextComponent.prototype.toggleDisabled = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var disabled = !this.disabled$.value;
        if (disabled === true) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
        this.disabled$.next(disabled);
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
    return FormFieldTextComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This component renders a textarea field
 */
var FormFieldTextareaComponent = /** @class */ (function () {
    function FormFieldTextareaComponent() {
        this.disabled$ = new BehaviorSubject(false);
        /**
         * Wheter a disable switch should be available
         */
        this.disableSwitch = false;
    }
    Object.defineProperty(FormFieldTextareaComponent.prototype, "required", {
        /**
         * Whether the field is required
         */
        get: /**
         * Whether the field is required
         * @return {?}
         */
        function () {
            return formControlIsRequired(this.formControl);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormFieldTextareaComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.disabled$.next(this.formControl.disabled);
    };
    /**
     * Get error message
     */
    /**
     * Get error message
     * @return {?}
     */
    FormFieldTextareaComponent.prototype.getErrorMessage = /**
     * Get error message
     * @return {?}
     */
    function () {
        return getControlErrorMessage(this.formControl, this.errors);
    };
    /**
     * @return {?}
     */
    FormFieldTextareaComponent.prototype.onDisableSwitchClick = /**
     * @return {?}
     */
    function () {
        this.toggleDisabled();
    };
    /**
     * @private
     * @return {?}
     */
    FormFieldTextareaComponent.prototype.toggleDisabled = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var disabled = !this.disabled$.value;
        if (disabled === true) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
        this.disabled$.next(disabled);
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
    return FormFieldTextareaComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
var IgoFormFieldModule = /** @class */ (function () {
    function IgoFormFieldModule() {
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
    return IgoFormFieldModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configurable form, optionnally bound to an entity
 * (for example in case of un update). Submitting that form
 * emits an event with the form data but no other operation is performed.
 */
var FormGroupComponent = /** @class */ (function () {
    function FormGroupComponent() {
    }
    Object.defineProperty(FormGroupComponent.prototype, "formControl", {
        /**
         * Form group control
         */
        get: /**
         * Form group control
         * @return {?}
         */
        function () { return this.group.control; },
        enumerable: true,
        configurable: true
    });
    /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * @param field Field
     * @returns Number of columns
     * @internal
     */
    /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * \@internal
     * @param {?} field Field
     * @return {?} Number of columns
     */
    FormGroupComponent.prototype.getFieldColSpan = /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * \@internal
     * @param {?} field Field
     * @return {?} Number of columns
     */
    function (field) {
        /** @type {?} */
        var colSpan = 2;
        /** @type {?} */
        var options = field.options || {};
        if (options.cols && options.cols > 0) {
            colSpan = Math.min(options.cols, 2);
        }
        return colSpan;
    };
    /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * @param field Field
     * @returns Number of columns
     * @internal
     */
    /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * \@internal
     * @param {?} field Field
     * @return {?} Number of columns
     */
    FormGroupComponent.prototype.getFieldNgClass = /**
     * Return the number of columns a field should occupy.
     * The maximum allowed is 2, even if the field config says more.
     * \@internal
     * @param {?} field Field
     * @return {?} Number of columns
     */
    function (field) {
        var _a;
        /** @type {?} */
        var colspan = this.getFieldColSpan(field);
        return _a = {}, _a["igo-form-field-colspan-" + colspan] = true, _a;
    };
    /**
     * Get error message
     */
    /**
     * Get error message
     * @return {?}
     */
    FormGroupComponent.prototype.getErrorMessage = /**
     * Get error message
     * @return {?}
     */
    function () {
        /** @type {?} */
        var options = this.group.options || {};
        return getControlErrorMessage(this.formControl, options.errors || {});
    };
    FormGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-form-group',
                    template: "<div\r\n  *ngIf=\"group && group.fields.length > 0\"\r\n  class=\"igo-form-group-fields\">\r\n  <div\r\n    *ngFor=\"let field of group.fields\"\r\n    class=\"igo-form-field-wrapper\"\r\n    [ngClass]=\"getFieldNgClass(field)\">\r\n    <igo-form-field [field]=\"field\"></igo-form-field>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"igo-form-group-extra-content\">\r\n  <ng-content></ng-content>\r\n</div>\r\n\r\n<mat-error *ngIf=\"formControl.errors\">{{getErrorMessage() | translate}}</mat-error>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{width:100%;height:100%;display:block;overflow:auto;padding:10px 5px}.igo-form-field-wrapper{display:inline-block;padding:0 5px}.igo-form-field-colspan-2{width:100%}.igo-form-field-colspan-1{width:50%}"]
                }] }
    ];
    /** @nocollapse */
    FormGroupComponent.ctorParameters = function () { return []; };
    FormGroupComponent.propDecorators = {
        group: [{ type: Input }],
        errors: [{ type: Input }]
    };
    return FormGroupComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
var IgoFormGroupModule = /** @class */ (function () {
    function IgoFormGroupModule() {
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
    return IgoFormGroupModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
var IgoFormModule = /** @class */ (function () {
    function IgoFormModule() {
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
    return IgoFormModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
var IgoEntitySelectorModule = /** @class */ (function () {
    function IgoEntitySelectorModule() {
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
    return IgoEntitySelectorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var StopDropPropagationDirective = /** @class */ (function () {
    function StopDropPropagationDirective() {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    StopDropPropagationDirective.prototype.onDrop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    StopDropPropagationDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoStopDropPropagation]'
                },] }
    ];
    StopDropPropagationDirective.propDecorators = {
        onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
    };
    return StopDropPropagationDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var StopPropagationDirective = /** @class */ (function () {
    function StopPropagationDirective() {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    StopPropagationDirective.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
    };
    StopPropagationDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoStopPropagation]'
                },] }
    ];
    StopPropagationDirective.propDecorators = {
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return StopPropagationDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoStopPropagationModule = /** @class */ (function () {
    function IgoStopPropagationModule() {
    }
    /**
     * @return {?}
     */
    IgoStopPropagationModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoStopPropagationModule,
            providers: []
        };
    };
    IgoStopPropagationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [StopDropPropagationDirective, StopPropagationDirective],
                    exports: [StopDropPropagationDirective, StopPropagationDirective]
                },] }
    ];
    return IgoStopPropagationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive that handles an entity table row click and selection.
 */
var EntityTableRowDirective = /** @class */ (function () {
    function EntityTableRowDirective(renderer, el) {
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
    Object.defineProperty(EntityTableRowDirective.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        /**
         * Whether a row is selected
         */
        set: /**
         * Whether a row is selected
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.selection === false) {
                return;
            }
            if (value === this._selected) {
                return;
            }
            this.toggleSelected(value);
            this.scroll();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * When a row is clicked, select it if it's supported
     * @ignore
     */
    /**
     * When a row is clicked, select it if it's supported
     * @ignore
     * @return {?}
     */
    EntityTableRowDirective.prototype.onClick = /**
     * When a row is clicked, select it if it's supported
     * @ignore
     * @return {?}
     */
    function () {
        if (this.selection === false || this.selectOnClick === false) {
            return;
        }
        this.toggleSelected(true);
        this.select.emit(this);
    };
    /**
     * Select a row and add or remove the selected class from it
     * @param selected Whether the row should be selected
     */
    /**
     * Select a row and add or remove the selected class from it
     * @private
     * @param {?} selected Whether the row should be selected
     * @return {?}
     */
    EntityTableRowDirective.prototype.toggleSelected = /**
     * Select a row and add or remove the selected class from it
     * @private
     * @param {?} selected Whether the row should be selected
     * @return {?}
     */
    function (selected) {
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
    };
    /**
     * Scroll to the selected row
     */
    /**
     * Scroll to the selected row
     * @private
     * @return {?}
     */
    EntityTableRowDirective.prototype.scroll = /**
     * Scroll to the selected row
     * @private
     * @return {?}
     */
    function () {
        if (this._selected === true) {
            this.el.nativeElement.scrollIntoView({
                behavior: this.scrollBehavior,
                block: 'center',
                inline: 'center'
            });
        }
    };
    /**
     * Add the selected CSS class
     */
    /**
     * Add the selected CSS class
     * @private
     * @param {?} cls
     * @return {?}
     */
    EntityTableRowDirective.prototype.addCls = /**
     * Add the selected CSS class
     * @private
     * @param {?} cls
     * @return {?}
     */
    function (cls) {
        this.renderer.addClass(this.el.nativeElement, cls);
    };
    /**
     * Remove the selected CSS class
     */
    /**
     * Remove the selected CSS class
     * @private
     * @param {?} cls
     * @return {?}
     */
    EntityTableRowDirective.prototype.removeCls = /**
     * Remove the selected CSS class
     * @private
     * @param {?} cls
     * @return {?}
     */
    function (cls) {
        this.renderer.removeClass(this.el.nativeElement, cls);
    };
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
    EntityTableRowDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    EntityTableRowDirective.propDecorators = {
        selection: [{ type: Input }],
        selectOnClick: [{ type: Input }],
        highlightSelection: [{ type: Input }],
        selected: [{ type: Input }],
        scrollBehavior: [{ type: Input }],
        select: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return EntityTableRowDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
var IgoEntityTableModule = /** @class */ (function () {
    function IgoEntityTableModule() {
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
    return IgoEntityTableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoEntityModule = /** @class */ (function () {
    function IgoEntityModule() {
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
    return IgoEntityModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SecureImagePipe = /** @class */ (function () {
    function SecureImagePipe(http) {
        this.http = http;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    SecureImagePipe.prototype.transform = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
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
        function (blob) {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                /** @type {?} */
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = (/**
                 * @return {?}
                 */
                function () {
                    observer.next(reader.result);
                });
            }));
        })));
    };
    SecureImagePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'secureImage'
                },] }
    ];
    /** @nocollapse */
    SecureImagePipe.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return SecureImagePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoImageModule = /** @class */ (function () {
    function IgoImageModule() {
    }
    /**
     * @return {?}
     */
    IgoImageModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoImageModule,
            providers: []
        };
    };
    IgoImageModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [SecureImagePipe],
                    exports: [SecureImagePipe]
                },] }
    ];
    return IgoImageModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var KeyValuePipe = /** @class */ (function () {
    function KeyValuePipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    KeyValuePipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function (value, args) {
        /** @type {?} */
        var keyValues = [];
        Object.getOwnPropertyNames(value).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            return keyValues.push({ key: key, value: value[key] });
        }));
        return keyValues;
    };
    KeyValuePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'keyvalue'
                },] }
    ];
    return KeyValuePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoKeyValueModule = /** @class */ (function () {
    function IgoKeyValueModule() {
    }
    /**
     * @return {?}
     */
    IgoKeyValueModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoKeyValueModule,
            providers: []
        };
    };
    IgoKeyValueModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [KeyValuePipe],
                    exports: [KeyValuePipe]
                },] }
    ];
    return IgoKeyValueModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var JsonDialogComponent = /** @class */ (function () {
    function JsonDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    JsonDialogComponent.prototype.isObject = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return typeof val === 'object' && !Array.isArray(val);
    };
    /**
     * @param {?} baseKey
     * @param {?} key
     * @return {?}
     */
    JsonDialogComponent.prototype.getKey = /**
     * @param {?} baseKey
     * @param {?} key
     * @return {?}
     */
    function (baseKey, key) {
        return (baseKey ? baseKey + '.' : '') + key;
    };
    JsonDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-json-dialog',
                    template: "<h1 mat-dialog-title>{{ title }}</h1>\r\n\r\n<div mat-dialog-content>\r\n  <ng-container *ngTemplateOutlet=\"loopObject;context:{ obj: data }\"></ng-container>\r\n\r\n  <ng-template #loopObject let-obj='obj' let-baseKey='baseKey'>\r\n    <ng-container *ngFor=\"let property of obj | keyvalue\">\r\n      <ng-container *ngIf=\"ignoreKeys.indexOf(getKey(baseKey, property.key)) === -1\">\r\n\r\n        <ng-container *ngIf=\"isObject(property.value); else notObject\">\r\n          <ng-container *ngTemplateOutlet=\"loopObject;context:{ obj: property.value, baseKey: getKey(baseKey, property.key) }\"></ng-container>\r\n        </ng-container>\r\n\r\n        <ng-template #notObject>\r\n          <p><span><b>{{getKey(baseKey, property.key)}}</b> : </span><span class=\"propertyValue\" [innerHtml]=\"property.value\"></span></p>\r\n        </ng-template>\r\n\r\n      </ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n</div>\r\n\r\n<div mat-dialog-actions>\r\n  <button mat-button color=\"primary\"\r\n          (click)=\"dialogRef.close(false)\">\r\n    OK\r\n  </button>\r\n</div>\r\n"
                }] }
    ];
    /** @nocollapse */
    JsonDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef }
    ]; };
    return JsonDialogComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var JsonDialogService = /** @class */ (function () {
    function JsonDialogService(dialog) {
        this.dialog = dialog;
    }
    /**
     * @param {?} title
     * @param {?} data
     * @param {?=} ignoreKeys
     * @return {?}
     */
    JsonDialogService.prototype.open = /**
     * @param {?} title
     * @param {?} data
     * @param {?=} ignoreKeys
     * @return {?}
     */
    function (title, data, ignoreKeys) {
        /** @type {?} */
        var dialogRef = this.dialog.open(JsonDialogComponent, {
            disableClose: false
        });
        dialogRef.componentInstance.data = data;
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.ignoreKeys = ignoreKeys;
        return dialogRef.afterClosed();
    };
    JsonDialogService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    JsonDialogService.ctorParameters = function () { return [
        { type: MatDialog }
    ]; };
    return JsonDialogService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoJsonDialogModule = /** @class */ (function () {
    function IgoJsonDialogModule() {
    }
    /**
     * @return {?}
     */
    IgoJsonDialogModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoJsonDialogModule
        };
    };
    IgoJsonDialogModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatButtonModule, MatDialogModule, IgoKeyValueModule],
                    exports: [JsonDialogComponent],
                    declarations: [JsonDialogComponent],
                    entryComponents: [JsonDialogComponent],
                    providers: [JsonDialogService]
                },] }
    ];
    return IgoJsonDialogModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ListItemDirective = /** @class */ (function () {
    function ListItemDirective(renderer, el) {
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
    Object.defineProperty(ListItemDirective.prototype, "color", {
        get: /**
         * @return {?}
         */
        function () {
            return this._color;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListItemDirective.prototype, "focused", {
        get: /**
         * @return {?}
         */
        function () {
            return this._focused;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListItemDirective.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListItemDirective.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ListItemDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        this.selected = true;
    };
    /**
     * @return {?}
     */
    ListItemDirective.prototype.getOffsetTop = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var padding = 5;
        return this.el.nativeElement.offsetTop - padding;
    };
    /**
     * @private
     * @return {?}
     */
    ListItemDirective.prototype.toggleSelectedClass = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.focused || this.selected) {
            this.addCls(ListItemDirective.selectedCls);
        }
        else {
            this.removeCls(ListItemDirective.selectedCls);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ListItemDirective.prototype.toggleDisabledClass = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.disabled) {
            this.addCls(ListItemDirective.disabledCls);
        }
        else {
            this.removeCls(ListItemDirective.disabledCls);
        }
    };
    /**
     * @private
     * @param {?} cls
     * @return {?}
     */
    ListItemDirective.prototype.addCls = /**
     * @private
     * @param {?} cls
     * @return {?}
     */
    function (cls) {
        this.renderer.addClass(this.el.nativeElement, cls);
    };
    /**
     * @private
     * @param {?} cls
     * @return {?}
     */
    ListItemDirective.prototype.removeCls = /**
     * @private
     * @param {?} cls
     * @return {?}
     */
    function (cls) {
        this.renderer.removeClass(this.el.nativeElement, cls);
    };
    ListItemDirective.selectedCls = 'igo-list-item-selected';
    ListItemDirective.disabledCls = 'igo-list-item-disabled';
    ListItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoListItem]'
                },] }
    ];
    /** @nocollapse */
    ListItemDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
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
    return ListItemDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ListComponent = /** @class */ (function () {
    function ListComponent(el) {
        this.el = el;
        this._navigation = true;
        this._selection = true;
        this.subscriptions = [];
    }
    Object.defineProperty(ListComponent.prototype, "navigation", {
        get: /**
         * @return {?}
         */
        function () {
            return this._navigation;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._navigation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "selection", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selection;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selection = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "selectedItem", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectedItem;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.focusedItem = value;
            this._selectedItem = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "focusedItem", {
        get: /**
         * @return {?}
         */
        function () {
            return this._focusedItem;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._focusedItem = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    ListComponent.prototype.handleKeyboardEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.enableNavigation();
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.listItems.length) {
            this.init();
        }
        this.listItems$$ = this.listItems.changes.subscribe((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return _this.init(); }));
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.listItems$$.unsubscribe();
    };
    /**
     * @param {?=} item
     * @return {?}
     */
    ListComponent.prototype.focus = /**
     * @param {?=} item
     * @return {?}
     */
    function (item) {
        if (!this.selection) {
            return;
        }
        this.unfocus();
        // We need to make this check because dynamic
        // lists such as in the search results list may fail
        if (item !== undefined) {
            item.focused = true;
        }
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.unfocus = /**
     * @return {?}
     */
    function () {
        if (this.focusedItem !== undefined) {
            this.focusedItem.focused = false;
        }
        this.focusedItem = undefined;
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.focusNext = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var items = this.listItems.toArray();
        /** @type {?} */
        var item;
        /** @type {?} */
        var disabled = true;
        /** @type {?} */
        var index = this.getFocusedIndex();
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
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.focusPrevious = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var items = this.listItems.toArray();
        /** @type {?} */
        var item;
        /** @type {?} */
        var disabled = true;
        /** @type {?} */
        var index = this.getFocusedIndex();
        while (disabled && index > 0) {
            index -= 1;
            item = items[index];
            disabled = item.disabled;
        }
        if (item !== undefined) {
            this.focus(item);
        }
    };
    /**
     * @param {?=} item
     * @return {?}
     */
    ListComponent.prototype.select = /**
     * @param {?=} item
     * @return {?}
     */
    function (item) {
        if (!this.selection) {
            return;
        }
        this.unselect();
        if (item !== undefined) {
            item.selected = true;
        }
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.unselect = /**
     * @return {?}
     */
    function () {
        this.unfocus();
        if (this.selectedItem !== undefined) {
            this.selectedItem.selected = false;
        }
        this.selectedItem = undefined;
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.enableNavigation = /**
     * @return {?}
     */
    function () {
        if (this.navigation) {
            this.navigationEnabled = true;
        }
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.disableNavigation = /**
     * @return {?}
     */
    function () {
        this.navigationEnabled = false;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ListComponent.prototype.scrollToItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.el.nativeElement.scrollTop = item.getOffsetTop();
    };
    /**
     * @private
     * @return {?}
     */
    ListComponent.prototype.init = /**
     * @private
     * @return {?}
     */
    function () {
        this.subscribe();
        this.selectedItem = this.findSelectedItem();
        this.focusedItem = this.findFocusedItem();
        this.enableNavigation();
    };
    /**
     * @private
     * @return {?}
     */
    ListComponent.prototype.subscribe = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.unsubscribe();
        this.listItems.toArray().forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            _this.subscriptions.push(item.beforeSelect.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            function (item2) {
                return _this.handleItemBeforeSelect(item2);
            })));
            _this.subscriptions.push(item.select.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            function (item2) {
                return _this.handleItemSelect(item2);
            })));
            _this.subscriptions.push(item.beforeFocus.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            function (item2) {
                return _this.handleItemBeforeFocus(item2);
            })));
            _this.subscriptions.push(item.focus.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            function (item2) {
                return _this.handleItemFocus(item2);
            })));
        }), this);
    };
    /**
     * @private
     * @return {?}
     */
    ListComponent.prototype.unsubscribe = /**
     * @private
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
        this.subscriptions = [];
    };
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    ListComponent.prototype.handleItemBeforeFocus = /**
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (item !== this.focusedItem) {
            this.unselect();
        }
    };
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    ListComponent.prototype.handleItemFocus = /**
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.focusedItem = item;
    };
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    ListComponent.prototype.handleItemBeforeSelect = /**
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (item !== this.focusedItem) {
            this.unselect();
        }
    };
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    ListComponent.prototype.handleItemSelect = /**
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.selectedItem = item;
    };
    /**
     * @private
     * @return {?}
     */
    ListComponent.prototype.findSelectedItem = /**
     * @private
     * @return {?}
     */
    function () {
        return this.listItems.toArray().find((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.selected; }));
    };
    /**
     * @private
     * @return {?}
     */
    ListComponent.prototype.findFocusedItem = /**
     * @private
     * @return {?}
     */
    function () {
        return this.listItems.toArray().find((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.focused; }));
    };
    /**
     * @private
     * @return {?}
     */
    ListComponent.prototype.getFocusedIndex = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.listItems
            .toArray()
            .findIndex((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item === _this.focusedItem; }));
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    ListComponent.prototype.navigate = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
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
    };
    ListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-list',
                    template: "<mat-list\r\n  igoClickout\r\n  [ngClass]=\"{'selectable': selection}\"\r\n  (clickout)=\"disableNavigation()\"\r\n  (click)=\"enableNavigation()\">\r\n  <ng-content></ng-content>\r\n</mat-list>\r\n",
                    styles: [":host{display:block;height:100%;overflow:auto;position:static}mat-list{padding-top:0}:host>>>.mat-list .mat-list-item .mat-list-text>*{white-space:normal;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;max-height:36px;line-height:18px;-webkit-line-clamp:2}:host>>>.mat-list .mat-list-item.mat-list-item-avatar .mat-list-item-content{display:-webkit-flex;height:46px;padding:3px}:host>>>.mat-list .mat-list-item.mat-list-item-avatar{height:46px}:host>>>.mat-list .mat-list-item.mat-list-item-avatar .mat-list-item-content>mat-icon{padding:8px}:host>>>[igolistitem] mat-list-item [mat-list-avatar]{height:auto;width:40px}:host mat-list.selectable>>>[igolistitem]:not(.igo-list-item-disabled) mat-list-item:hover{cursor:pointer}:host>>>[igolistitem]:focus{outline:0}"]
                }] }
    ];
    /** @nocollapse */
    ListComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ListComponent.propDecorators = {
        navigation: [{ type: Input }],
        selection: [{ type: Input }],
        listItems: [{ type: ContentChildren, args: [ListItemDirective, { descendants: true },] }],
        handleKeyboardEvent: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
    };
    return ListComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoListModule = /** @class */ (function () {
    function IgoListModule() {
    }
    /**
     * @return {?}
     */
    IgoListModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoListModule,
            providers: []
        };
    };
    IgoListModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatIconModule, MatListModule, IgoClickoutModule],
                    declarations: [ListItemDirective, ListComponent],
                    exports: [ListItemDirective, ListComponent]
                },] }
    ];
    return IgoListModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PanelComponent = /** @class */ (function () {
    function PanelComponent() {
        this._withHeader = true;
    }
    Object.defineProperty(PanelComponent.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () {
            return this._title;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelComponent.prototype, "withHeader", {
        get: /**
         * @return {?}
         */
        function () {
            return this._withHeader;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._withHeader = value;
        },
        enumerable: true,
        configurable: true
    });
    PanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-panel',
                    template: "<div *ngIf=\"withHeader\" class=\"igo-panel-header\" title=\"\">\r\n  <h3>\r\n    <ng-content select=\"[panelLeftButton]\"></ng-content>\r\n    <div class=\"igo-panel-title\">\r\n      {{title}}\r\n      <ng-content select=\"[panelHeader]\"></ng-content>\r\n    </div>\r\n    <ng-content select=\"[panelRightButton]\"></ng-content>\r\n  </h3>\r\n</div>\r\n<div class=\"igo-panel-content\" title=\"\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block}.igo-panel-header{height:46px;padding:3px;text-align:center}.igo-panel-header h3{margin:0;height:40px}.igo-panel-header>>>[panelleftbutton]{float:left;margin-right:-40px}.igo-panel-header>>>[panelrightbutton]{float:right}.igo-panel-content{overflow:auto}:host.igo-panel-with-header .igo-panel-content{height:calc(100% - 46px)}:host:not(.igo-panel-with-header) .igo-panel-content{height:100%}.igo-panel-title{display:block;width:calc(100% - 80px);margin-left:40px;height:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;line-height:40px;float:left}"]
                }] }
    ];
    /** @nocollapse */
    PanelComponent.ctorParameters = function () { return []; };
    PanelComponent.propDecorators = {
        title: [{ type: Input }],
        withHeader: [{ type: Input }, { type: HostBinding, args: ['class.igo-panel-with-header',] }]
    };
    return PanelComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoPanelModule = /** @class */ (function () {
    function IgoPanelModule() {
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
    return IgoPanelModule;
}());

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
var SidenavShimDirective = /** @class */ (function () {
    function SidenavShimDirective(component, renderer) {
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    SidenavShimDirective.prototype.onOpen = /**
     * @return {?}
     */
    function () {
        this.focusedElement = (/** @type {?} */ (document.activeElement));
    };
    /**
     * @return {?}
     */
    SidenavShimDirective.prototype.onCloseStart = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var focusedElement = (/** @type {?} */ (document.activeElement));
        if (focusedElement !== this.focusedElement) {
            this.blurElement = this.focusedElement;
        }
        else {
            this.blurElement = undefined;
        }
    };
    /**
     * @return {?}
     */
    SidenavShimDirective.prototype.onClose = /**
     * @return {?}
     */
    function () {
        if (this.blurElement) {
            this.renderer.selectRootElement(this.blurElement).blur();
        }
        this.blurElement = undefined;
        this.focusedElement = undefined;
    };
    SidenavShimDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoSidenavShim]'
                },] }
    ];
    /** @nocollapse */
    SidenavShimDirective.ctorParameters = function () { return [
        { type: MatSidenav, decorators: [{ type: Self }] },
        { type: Renderer2 }
    ]; };
    SidenavShimDirective.propDecorators = {
        onOpen: [{ type: HostListener, args: ['open', ['$event'],] }],
        onCloseStart: [{ type: HostListener, args: ['close-start', ['$event'],] }],
        onClose: [{ type: HostListener, args: ['close', ['$event'],] }]
    };
    return SidenavShimDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoSidenavModule = /** @class */ (function () {
    function IgoSidenavModule() {
    }
    /**
     * @return {?}
     */
    IgoSidenavModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoSidenavModule,
            providers: []
        };
    };
    IgoSidenavModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [SidenavShimDirective],
                    exports: [SidenavShimDirective]
                },] }
    ];
    return IgoSidenavModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SpinnerComponent = /** @class */ (function () {
    function SpinnerComponent() {
        this.shown$ = new BehaviorSubject(false);
    }
    Object.defineProperty(SpinnerComponent.prototype, "shown", {
        get: /**
         * @return {?}
         */
        function () { return this.shown$.value; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.shown$.next(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SpinnerComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        this.shown = true;
    };
    /**
     * @return {?}
     */
    SpinnerComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.shown = false;
    };
    SpinnerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-spinner',
                    template: "<div\r\n  [ngClass]=\"{'igo-spinner-container': true, 'igo-spinner-shown': (shown$ | async)}\">\r\n  <div class=\"igo-spinner-background\"></div>\r\n  <mat-progress-spinner diameter=\"40\" mode=\"indeterminate\"></mat-progress-spinner>\r\n</div>\r\n",
                    styles: [".igo-spinner-container{display:none;pointer-events:none}.igo-spinner-container.igo-spinner-shown{display:block}mat-progress-spinner{height:40px;width:40px;border-radius:50%}.igo-spinner-background{height:36px;width:36px;border-radius:50%;border:4px solid #fff;position:absolute;top:2px;left:2px}"]
                }] }
    ];
    /** @nocollapse */
    SpinnerComponent.ctorParameters = function () { return []; };
    SpinnerComponent.propDecorators = {
        shown: [{ type: Input }]
    };
    return SpinnerComponent;
}());

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
var SpinnerActivityDirective = /** @class */ (function () {
    function SpinnerActivityDirective(spinner, activityService) {
        this.spinner = spinner;
        this.activityService = activityService;
    }
    /**
     * Subscribe to the activity service counter and display the spinner
     * when it's is greater than 0.
     * @internal
     */
    /**
     * Subscribe to the activity service counter and display the spinner
     * when it's is greater than 0.
     * \@internal
     * @return {?}
     */
    SpinnerActivityDirective.prototype.ngOnInit = /**
     * Subscribe to the activity service counter and display the spinner
     * when it's is greater than 0.
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this.counter$$ = this.activityService.counter$
            .pipe(debounceTime(50))
            .subscribe((/**
         * @param {?} count
         * @return {?}
         */
        function (count) {
            count > 0 ? _this.spinner.show() : _this.spinner.hide();
        }));
    };
    /**
     * Unsubcribe to the activity service counter.
     * @internal
     */
    /**
     * Unsubcribe to the activity service counter.
     * \@internal
     * @return {?}
     */
    SpinnerActivityDirective.prototype.ngOnDestroy = /**
     * Unsubcribe to the activity service counter.
     * \@internal
     * @return {?}
     */
    function () {
        this.counter$$.unsubscribe();
    };
    SpinnerActivityDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoSpinnerActivity]',
                    providers: [SpinnerComponent]
                },] }
    ];
    /** @nocollapse */
    SpinnerActivityDirective.ctorParameters = function () { return [
        { type: SpinnerComponent, decorators: [{ type: Self }] },
        { type: ActivityService }
    ]; };
    return SpinnerActivityDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoSpinnerModule = /** @class */ (function () {
    function IgoSpinnerModule() {
    }
    IgoSpinnerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatProgressSpinnerModule],
                    declarations: [SpinnerActivityDirective, SpinnerComponent],
                    exports: [SpinnerActivityDirective, SpinnerComponent]
                },] }
    ];
    return IgoSpinnerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TableDatabase = /** @class */ (function () {
    function TableDatabase(data) {
        /**
         * Stream that emits whenever the data has been modified.
         */
        this.dataChange = new BehaviorSubject([]);
        if (data) {
            this.dataChange.next(data);
        }
    }
    Object.defineProperty(TableDatabase.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dataChange.value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} data
     * @return {?}
     */
    TableDatabase.prototype.set = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.dataChange.next(data);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TableDatabase.prototype.add = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var copiedData = this.data.slice();
        copiedData.push(item);
        this.set(copiedData);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TableDatabase.prototype.remove = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var copiedData = this.data.slice();
        /** @type {?} */
        var index = copiedData.indexOf(item);
        copiedData.splice(index, 1);
        this.set(copiedData);
    };
    return TableDatabase;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TableDataSource = /** @class */ (function (_super) {
    __extends(TableDataSource, _super);
    function TableDataSource(_database, _model, _sort) {
        var _this = _super.call(this) || this;
        _this._database = _database;
        _this._model = _model;
        _this._sort = _sort;
        _this._filterChange = new BehaviorSubject('');
        return _this;
    }
    Object.defineProperty(TableDataSource.prototype, "filter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._filterChange.value;
        },
        set: /**
         * @param {?} filter
         * @return {?}
         */
        function (filter$$1) {
            this._filterChange.next(filter$$1);
        },
        enumerable: true,
        configurable: true
    });
    // Connect function called by the table to retrieve one stream containing
    // the data to render.
    // Connect function called by the table to retrieve one stream containing
    // the data to render.
    /**
     * @return {?}
     */
    TableDataSource.prototype.connect = 
    // Connect function called by the table to retrieve one stream containing
    // the data to render.
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._database) {
            return merge([]);
        }
        /** @type {?} */
        var displayDataChanges = [
            this._database.dataChange,
            this._filterChange,
            this._sort.sortChange
        ];
        return merge.apply(void 0, __spread(displayDataChanges)).pipe(map((/**
         * @return {?}
         */
        function () {
            return _this.getFilteredData(_this._database.data);
        })), map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            return _this.getSortedData(data);
        })));
    };
    /**
     * @return {?}
     */
    TableDataSource.prototype.disconnect = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} data
     * @return {?}
     */
    TableDataSource.prototype.getFilteredData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (!this.filter) {
            return data;
        }
        return data.slice().filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var searchStr = _this._model.columns
                .filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.filterable; }))
                .map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return ObjectUtils.resolve(item, c.name); }))
                .join(' ')
                .toLowerCase();
            return searchStr.indexOf(_this.filter.toLowerCase()) !== -1;
        }));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    TableDataSource.prototype.getSortedData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }
        return data.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) {
            /** @type {?} */
            var propertyA = ObjectUtils.resolve(a, _this._sort.active);
            /** @type {?} */
            var propertyB = ObjectUtils.resolve(b, _this._sort.active);
            return ObjectUtils.naturalCompare(propertyB, propertyA, _this._sort.direction);
        }));
    };
    return TableDataSource;
}(DataSource));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var TableActionColor = {
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
var TableComponent = /** @class */ (function () {
    function TableComponent() {
        this._hasFIlterInput = true;
        this.selection = new SelectionModel(true, []);
        this.select = new EventEmitter();
    }
    Object.defineProperty(TableComponent.prototype, "database", {
        get: /**
         * @return {?}
         */
        function () {
            return this._database;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._database = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "model", {
        get: /**
         * @return {?}
         */
        function () {
            return this._model;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._model = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "hasFilterInput", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hasFIlterInput;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hasFIlterInput = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TableComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dataSource = new TableDataSource(this.database, this.model, this.sort);
        if (this.model) {
            this.displayedColumns = this.model.columns
                .filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.displayed !== false; }))
                .map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.name; }));
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
        function (e) { return _this.select.emit(e); }));
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.filter) {
            fromEvent(this.filter.nativeElement, 'keyup')
                .pipe(debounceTime(150), distinctUntilChanged())
                .subscribe((/**
             * @return {?}
             */
            function () {
                if (!_this.dataSource) {
                    return;
                }
                _this.dataSource.filter = _this.filter.nativeElement.value;
            }));
        }
    };
    /**
     * @param {?} change
     * @return {?}
     */
    TableComponent.prototype.ngOnChanges = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        if (change.database) {
            this.dataSource = new TableDataSource(this.database, this.model, this.sort);
            this.selection.clear();
        }
    };
    /**
     * @param {?} colorId
     * @return {?}
     */
    TableComponent.prototype.getActionColor = /**
     * @param {?} colorId
     * @return {?}
     */
    function (colorId) {
        return TableActionColor[colorId];
    };
    /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    TableComponent.prototype.getValue = /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    function (row, key) {
        return ObjectUtils.resolve(row, key);
    };
    /** Whether the number of selected elements matches the total number of rows. */
    /**
     * Whether the number of selected elements matches the total number of rows.
     * @return {?}
     */
    TableComponent.prototype.isAllSelected = /**
     * Whether the number of selected elements matches the total number of rows.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var numSelected = this.selection.selected.length;
        /** @type {?} */
        var numRows = this.database.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    /**
     * Selects all rows if they are not all selected; otherwise clear selection.
     * @return {?}
     */
    TableComponent.prototype.masterToggle = /**
     * Selects all rows if they are not all selected; otherwise clear selection.
     * @return {?}
     */
    function () {
        var _this = this;
        this.isAllSelected()
            ? this.selection.clear()
            : this.database.data.forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return _this.selection.select(row); }));
    };
    /**
     * @param {?} event
     * @param {?} action
     * @param {?} row
     * @return {?}
     */
    TableComponent.prototype.handleClickAction = /**
     * @param {?} event
     * @param {?} action
     * @param {?} row
     * @return {?}
     */
    function (event, action, row) {
        event.stopPropagation();
        action.click(row);
    };
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
    return TableComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoTableModule = /** @class */ (function () {
    function IgoTableModule() {
    }
    /**
     * @return {?}
     */
    IgoTableModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoTableModule,
            providers: []
        };
    };
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
    return IgoTableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service where runtime tool configurations are registered
 */
var ToolService = /** @class */ (function () {
    function ToolService() {
    }
    /**
     * @param {?} tool
     * @return {?}
     */
    ToolService.register = /**
     * @param {?} tool
     * @return {?}
     */
    function (tool) {
        ToolService.tools[tool.name] = tool;
    };
    /**
     * Return a tool
     * @param name Tool name
     * @returns tool Tool
     */
    /**
     * Return a tool
     * @param {?} name Tool name
     * @return {?} tool Tool
     */
    ToolService.prototype.getTool = /**
     * Return a tool
     * @param {?} name Tool name
     * @return {?} tool Tool
     */
    function (name) {
        return ToolService.tools[name];
    };
    /**
     * Return all tools
     * @returns tTols
     */
    /**
     * Return all tools
     * @return {?} tTols
     */
    ToolService.prototype.getTools = /**
     * Return all tools
     * @return {?} tTols
     */
    function () {
        return Object.values(ToolService.tools);
    };
    ToolService.tools = {};
    ToolService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ToolService.ctorParameters = function () { return []; };
    /** @nocollapse */ ToolService.ngInjectableDef = defineInjectable({ factory: function ToolService_Factory() { return new ToolService(); }, token: ToolService, providedIn: "root" });
    return ToolService;
}());

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
var  /**
 * Service where all available tools and their component are registered.
 */
Toolbox = /** @class */ (function () {
    function Toolbox(options) {
        if (options === void 0) { options = {}; }
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
            function (tool) { return tool.name; })
        });
        this.setToolbar(options.toolbar);
        this.initStore();
    }
    Object.defineProperty(Toolbox.prototype, "tools$", {
        get: /**
         * @return {?}
         */
        function () {
            return this.store.entities$;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Destroy the toolbox
     */
    /**
     * Destroy the toolbox
     * @return {?}
     */
    Toolbox.prototype.destroy = /**
     * Destroy the toolbox
     * @return {?}
     */
    function () {
        this.activeTool$$.unsubscribe();
        this.store.destroy();
    };
    /**
     * Return a tool
     * @param name Tool name
     * @returns tool Tool
     */
    /**
     * Return a tool
     * @param {?} name Tool name
     * @return {?} tool Tool
     */
    Toolbox.prototype.getTool = /**
     * Return a tool
     * @param {?} name Tool name
     * @return {?} tool Tool
     */
    function (name) {
        return this.store.get(name);
    };
    /**
     * Return all tools
     * @returns Array of tools
     */
    /**
     * Return all tools
     * @return {?} Array of tools
     */
    Toolbox.prototype.getTools = /**
     * Return all tools
     * @return {?} Array of tools
     */
    function () {
        return this.store.all();
    };
    /**
     * Set tool configurations
     * @param tools Tools
     */
    /**
     * Set tool configurations
     * @param {?} tools Tools
     * @return {?}
     */
    Toolbox.prototype.setTools = /**
     * Set tool configurations
     * @param {?} tools Tools
     * @return {?}
     */
    function (tools) {
        this.store.load(tools);
    };
    /**
     * Set toolbar
     * @param toolbar A list of tool names
     */
    /**
     * Set toolbar
     * @param {?} toolbar A list of tool names
     * @return {?}
     */
    Toolbox.prototype.setToolbar = /**
     * Set toolbar
     * @param {?} toolbar A list of tool names
     * @return {?}
     */
    function (toolbar) {
        this.toolbar$.next(toolbar || []);
    };
    /**
     * Activate a tool (and deactivate other tools)
     * @param name Tool name
     * @param options Tool options
     */
    /**
     * Activate a tool (and deactivate other tools)
     * @param {?} name Tool name
     * @param {?=} options Tool options
     * @return {?}
     */
    Toolbox.prototype.activateTool = /**
     * Activate a tool (and deactivate other tools)
     * @param {?} name Tool name
     * @param {?=} options Tool options
     * @return {?}
     */
    function (name, options) {
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var tool = this.getTool(name);
        if (tool === undefined) {
            return;
        }
        this.store.state.update(tool, { active: true, options: options }, true);
    };
    /**
     * Activate the previous tool, if any
     */
    /**
     * Activate the previous tool, if any
     * @return {?}
     */
    Toolbox.prototype.activatePreviousTool = /**
     * Activate the previous tool, if any
     * @return {?}
     */
    function () {
        if (this.activeToolHistory.length <= 1) {
            this.deactivateTool();
            return;
        }
        var _a = __read(this.activeToolHistory.splice(-2, 2), 2), previous = _a[0], current = _a[1];
        this.activateTool(previous);
    };
    /**
     * Deactivate the active tool
     */
    /**
     * Deactivate the active tool
     * @return {?}
     */
    Toolbox.prototype.deactivateTool = /**
     * Deactivate the active tool
     * @return {?}
     */
    function () {
        this.clearActiveToolHistory();
        this.store.state.updateAll({ active: false });
    };
    /**
     * Initialize the tool store and start observing the active tool
     */
    /**
     * Initialize the tool store and start observing the active tool
     * @private
     * @return {?}
     */
    Toolbox.prototype.initStore = /**
     * Initialize the tool store and start observing the active tool
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.store = new EntityStore([], {
            getKey: (/**
             * @param {?} entity
             * @return {?}
             */
            function (entity) { return entity.name; })
        });
        this.activeTool$$ = this.store.stateView
            .firstBy$((/**
         * @param {?} record
         * @return {?}
         */
        function (record) { return record.state.active === true; }))
            .subscribe((/**
         * @param {?} record
         * @return {?}
         */
        function (record) {
            if (record === undefined) {
                _this.setActiveTool(undefined);
                return;
            }
            /** @type {?} */
            var tool = record.entity;
            /** @type {?} */
            var options = Object.assign({}, tool.options || {}, record.state.options || {});
            _this.setActiveTool(Object.assign({}, tool, { options: options }));
        }));
    };
    /**
     * Set the active tool and update the tool history
     * @param tool Tool
     */
    /**
     * Set the active tool and update the tool history
     * @private
     * @param {?} tool Tool
     * @return {?}
     */
    Toolbox.prototype.setActiveTool = /**
     * Set the active tool and update the tool history
     * @private
     * @param {?} tool Tool
     * @return {?}
     */
    function (tool) {
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
            function (name) { return name !== tool.name; }))
                .concat([tool.name]);
        }
    };
    /**
     * Clear the tool history
     */
    /**
     * Clear the tool history
     * @private
     * @return {?}
     */
    Toolbox.prototype.clearActiveToolHistory = /**
     * Clear the tool history
     * @private
     * @return {?}
     */
    function () {
        this.activeToolHistory = [];
    };
    return Toolbox;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} speed
 * @param {?=} type
 * @return {?}
 */
function toolSlideInOut(speed, type) {
    if (speed === void 0) { speed = '300ms'; }
    if (type === void 0) { type = 'ease-in-out'; }
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
var ToolboxComponent = /** @class */ (function () {
    function ToolboxComponent() {
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
    Object.defineProperty(ToolboxComponent.prototype, "toolbarWithTitle", {
        /**
         * Whether the Toolbar should display actions' titles
         */
        get: /**
         * Whether the Toolbar should display actions' titles
         * @return {?}
         */
        function () {
            return this.activeTool$.value === undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize the toolbar and subscribe to the active tool
     * @internal
     */
    /**
     * Initialize the toolbar and subscribe to the active tool
     * \@internal
     * @return {?}
     */
    ToolboxComponent.prototype.ngOnInit = /**
     * Initialize the toolbar and subscribe to the active tool
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this.toolbar$$ = this.toolbox.toolbar$.subscribe((/**
         * @param {?} toolbar
         * @return {?}
         */
        function (toolbar) {
            return _this.onToolbarChange(toolbar);
        }));
        this.activeTool$$ = this.toolbox.activeTool$.subscribe((/**
         * @param {?} tool
         * @return {?}
         */
        function (tool) {
            return _this.onActiveToolChange(tool);
        }));
    };
    /**
     * Unsubscribe to the active tool and destroy the action store
     * @internal
     */
    /**
     * Unsubscribe to the active tool and destroy the action store
     * \@internal
     * @return {?}
     */
    ToolboxComponent.prototype.ngOnDestroy = /**
     * Unsubscribe to the active tool and destroy the action store
     * \@internal
     * @return {?}
     */
    function () {
        this.toolbar$$.unsubscribe();
        this.activeTool$$.unsubscribe();
        this.actionStore.destroy();
    };
    /**
     * Track the starting animation
     * @internal
     */
    /**
     * Track the starting animation
     * \@internal
     * @return {?}
     */
    ToolboxComponent.prototype.onAnimationStart = /**
     * Track the starting animation
     * \@internal
     * @return {?}
     */
    function () {
        this.animating$.next(true);
    };
    /**
     * Untrack the completed animation
     * @internal
     */
    /**
     * Untrack the completed animation
     * \@internal
     * @return {?}
     */
    ToolboxComponent.prototype.onAnimationComplete = /**
     * Untrack the completed animation
     * \@internal
     * @return {?}
     */
    function () {
        this.animating$.next(false);
    };
    /**
     * Return a tool's inputs
     * @param tool Tool
     * @returns Tool inputs
     * @internal
     */
    /**
     * Return a tool's inputs
     * \@internal
     * @param {?} tool Tool
     * @return {?} Tool inputs
     */
    ToolboxComponent.prototype.getToolInputs = /**
     * Return a tool's inputs
     * \@internal
     * @param {?} tool Tool
     * @return {?} Tool inputs
     */
    function (tool) {
        return tool.options || {};
    };
    Object.defineProperty(ToolboxComponent.prototype, "actionBarItemClassFunc", {
        /**
         * Get Action bar item class function
         * @internal
         */
        get: /**
         * Get Action bar item class function
         * \@internal
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} tool
             * @return {?}
             */
            function (tool) {
                if (!_this.toolbox.activeTool$.value) {
                    return;
                }
                return { 'tool-actived': tool.id === _this.toolbox.activeTool$.value.name };
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize an action store
     * @param toolbar Toolbar
     */
    /**
     * Initialize an action store
     * @private
     * @param {?} toolbar Toolbar
     * @return {?}
     */
    ToolboxComponent.prototype.onToolbarChange = /**
     * Initialize an action store
     * @private
     * @param {?} toolbar Toolbar
     * @return {?}
     */
    function (toolbar) {
        this.setToolbar(toolbar);
    };
    /**
     * Activate a tool and trigger an animation or not
     * @param tool Tool to activate
     */
    /**
     * Activate a tool and trigger an animation or not
     * @private
     * @param {?} tool Tool to activate
     * @return {?}
     */
    ToolboxComponent.prototype.onActiveToolChange = /**
     * Activate a tool and trigger an animation or not
     * @private
     * @param {?} tool Tool to activate
     * @return {?}
     */
    function (tool) {
        var _this = this;
        if (!this.animate) {
            this.setActiveTool(tool);
            return;
        }
        this.onAnimate((/**
         * @return {?}
         */
        function () { return _this.setActiveTool(tool); }));
    };
    /**
     * Set the active tool
     * @param tool Tool to activate
     */
    /**
     * Set the active tool
     * @private
     * @param {?} tool Tool to activate
     * @return {?}
     */
    ToolboxComponent.prototype.setActiveTool = /**
     * Set the active tool
     * @private
     * @param {?} tool Tool to activate
     * @return {?}
     */
    function (tool) {
        if (tool === undefined) {
            this.actionStore.state.updateAll({ active: false });
        }
        else {
            /** @type {?} */
            var action = this.actionStore.get(tool.name);
            if (action !== undefined) {
                this.actionStore.state.update(action, { active: true }, true);
            }
        }
        this.activeTool$.next(tool);
        if (this.animate) {
            this.animation$.next('enter');
        }
    };
    /**
     * Initialize the toolbar
     */
    /**
     * Initialize the toolbar
     * @private
     * @param {?} toolbar
     * @return {?}
     */
    ToolboxComponent.prototype.setToolbar = /**
     * Initialize the toolbar
     * @private
     * @param {?} toolbar
     * @return {?}
     */
    function (toolbar) {
        var _this = this;
        /** @type {?} */
        var actions = toolbar.reduce((/**
         * @param {?} acc
         * @param {?} toolName
         * @return {?}
         */
        function (acc, toolName) {
            /** @type {?} */
            var tool = _this.toolbox.getTool(toolName);
            if (tool === undefined) {
                return acc;
            }
            acc.push({
                id: tool.name,
                title: tool.title,
                icon: tool.icon,
                // iconImage: tool.iconImage,
                tooltip: tool.tooltip,
                args: [tool, _this.toolbox],
                handler: (/**
                 * @param {?} _tool
                 * @param {?} _toolbox
                 * @return {?}
                 */
                function (_tool, _toolbox) {
                    _toolbox.activateTool(_tool.name);
                })
            });
            return acc;
        }), []);
        this.actionStore.load(actions);
        this.toolbar$.next(toolbar);
    };
    /**
     * Observe the ongoing animation and ignore any incoming animation
     * while one is still ongoing.
     * @param callback Callback to execute when the animation completes
     */
    /**
     * Observe the ongoing animation and ignore any incoming animation
     * while one is still ongoing.
     * @private
     * @param {?} callback Callback to execute when the animation completes
     * @return {?}
     */
    ToolboxComponent.prototype.onAnimate = /**
     * Observe the ongoing animation and ignore any incoming animation
     * while one is still ongoing.
     * @private
     * @param {?} callback Callback to execute when the animation completes
     * @return {?}
     */
    function (callback) {
        var _this = this;
        this.unAnimate();
        this.animating$$ = this.animating$.subscribe((/**
         * @param {?} animation
         * @return {?}
         */
        function (animation) {
            if (!animation) {
                callback.call(_this);
                _this.unAnimate();
            }
        }));
    };
    /**
     * Stop observing an animation when it's complete
     */
    /**
     * Stop observing an animation when it's complete
     * @private
     * @return {?}
     */
    ToolboxComponent.prototype.unAnimate = /**
     * Stop observing an animation when it's complete
     * @private
     * @return {?}
     */
    function () {
        if (this.animating$$) {
            this.animating$$.unsubscribe();
        }
    };
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
    return ToolboxComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
var IgoToolboxModule = /** @class */ (function () {
    function IgoToolboxModule() {
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
    return IgoToolboxModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoToolModule = /** @class */ (function () {
    function IgoToolModule() {
    }
    /**
     * @return {?}
     */
    IgoToolModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoToolModule,
            providers: [
                ToolService
            ]
        };
    };
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
    return IgoToolModule;
}());

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
var WidgetOutletComponent = /** @class */ (function () {
    function WidgetOutletComponent() {
        var _this = this;
        /**
         * Widget subscribers to 'cancel' and 'complete'
         * \@internal
         */
        this.baseSubscribers = {
            cancel: (/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.onCancel(event); }),
            complete: (/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.onComplete(event); })
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
     * @internal
     */
    /**
     * Destroy the current widget and all it's inner subscriptions
     * \@internal
     * @return {?}
     */
    WidgetOutletComponent.prototype.ngOnDestroy = /**
     * Destroy the current widget and all it's inner subscriptions
     * \@internal
     * @return {?}
     */
    function () {
        this.destroyWidget();
    };
    /**
     * Get the effective subscribers. That means a combination of the base
     * subscribers and any subscriber given as input.
     * @returns Combined subscribers
     * @internal
     */
    /**
     * Get the effective subscribers. That means a combination of the base
     * subscribers and any subscriber given as input.
     * \@internal
     * @return {?} Combined subscribers
     */
    WidgetOutletComponent.prototype.getEffectiveSubscribers = /**
     * Get the effective subscribers. That means a combination of the base
     * subscribers and any subscriber given as input.
     * \@internal
     * @return {?} Combined subscribers
     */
    function () {
        var _this = this;
        /** @type {?} */
        var subscribers = Object.assign({}, this.subscribers);
        // Base subscribers
        Object.keys(this.baseSubscribers).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            /** @type {?} */
            var subscriber = subscribers[key];
            /** @type {?} */
            var baseSubscriber = _this.baseSubscribers[key];
            if (subscriber !== undefined) {
                subscribers[key] = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    subscriber(event);
                    baseSubscriber(event);
                });
            }
            else {
                subscribers[key] = baseSubscriber;
            }
        }));
        return subscribers;
    };
    /**
     * When the widget emits 'cancel', propagate that event and destroy
     * the widget
     */
    /**
     * When the widget emits 'cancel', propagate that event and destroy
     * the widget
     * @private
     * @param {?} event
     * @return {?}
     */
    WidgetOutletComponent.prototype.onCancel = /**
     * When the widget emits 'cancel', propagate that event and destroy
     * the widget
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.cancel.emit(event);
        this.destroyWidget();
    };
    /**
     * When the widget emits 'complete', propagate that event and destroy
     * the widget
     */
    /**
     * When the widget emits 'complete', propagate that event and destroy
     * the widget
     * @private
     * @param {?} event
     * @return {?}
     */
    WidgetOutletComponent.prototype.onComplete = /**
     * When the widget emits 'complete', propagate that event and destroy
     * the widget
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.complete.emit(event);
        this.destroyWidget();
    };
    /**
     * Destroy the current widget
     */
    /**
     * Destroy the current widget
     * @private
     * @return {?}
     */
    WidgetOutletComponent.prototype.destroyWidget = /**
     * Destroy the current widget
     * @private
     * @return {?}
     */
    function () {
        if (this.widget !== undefined) {
            this.widget.destroy();
        }
        this.widget = undefined;
    };
    WidgetOutletComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-widget-outlet',
                    template: "<igo-dynamic-outlet\r\n  *ngIf=\"widget\"\r\n  [component]=\"widget\"\r\n  [inputs]=\"inputs\"\r\n  [subscribers]=\"getEffectiveSubscribers()\">\r\n</igo-dynamic-outlet>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["igo-dynamic-outlet{height:100%}"]
                }] }
    ];
    /** @nocollapse */
    WidgetOutletComponent.ctorParameters = function () { return []; };
    WidgetOutletComponent.propDecorators = {
        widget: [{ type: Input }],
        inputs: [{ type: Input }],
        subscribers: [{ type: Input }],
        complete: [{ type: Output }],
        cancel: [{ type: Output }]
    };
    return WidgetOutletComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
var IgoWidgetOutletModule = /** @class */ (function () {
    function IgoWidgetOutletModule() {
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
    return IgoWidgetOutletModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WidgetService = /** @class */ (function () {
    function WidgetService(dynamicComponentService) {
        this.dynamicComponentService = dynamicComponentService;
    }
    /**
     * @param {?} widgetCls
     * @return {?}
     */
    WidgetService.prototype.create = /**
     * @param {?} widgetCls
     * @return {?}
     */
    function (widgetCls) {
        return this.dynamicComponentService.create((/** @type {?} */ (widgetCls)));
    };
    WidgetService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WidgetService.ctorParameters = function () { return [
        { type: DynamicComponentService }
    ]; };
    /** @nocollapse */ WidgetService.ngInjectableDef = defineInjectable({ factory: function WidgetService_Factory() { return new WidgetService(inject(DynamicComponentService)); }, token: WidgetService, providedIn: "root" });
    return WidgetService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoWidgetModule = /** @class */ (function () {
    function IgoWidgetModule() {
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
    return IgoWidgetModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The class is a specialized version of an EntityStore that stores
 * workspaces.
 */
var  /**
 * The class is a specialized version of an EntityStore that stores
 * workspaces.
 */
WorkspaceStore = /** @class */ (function (_super) {
    __extends(WorkspaceStore, _super);
    function WorkspaceStore() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeWorkspace$ = new BehaviorSubject(undefined);
        return _this;
    }
    /**
     * Activate the an workspace workspace and deactivate the one currently active
     * @param workspace Workspace
     */
    /**
     * Activate the an workspace workspace and deactivate the one currently active
     * @param {?} workspace Workspace
     * @return {?}
     */
    WorkspaceStore.prototype.activateWorkspace = /**
     * Activate the an workspace workspace and deactivate the one currently active
     * @param {?} workspace Workspace
     * @return {?}
     */
    function (workspace) {
        /** @type {?} */
        var active = this.activeWorkspace$.value;
        if (active !== undefined) {
            active.deactivate();
        }
        this.deactivateWorkspace();
        if (workspace !== undefined) {
            this.state.update(workspace, { active: true, selected: true }, true);
            this.activeWorkspace$.next(workspace);
            workspace.activate();
        }
    };
    /**
     * Deactivate the current workspace
     * @param workspace Workspace
     */
    /**
     * Deactivate the current workspace
     * @return {?}
     */
    WorkspaceStore.prototype.deactivateWorkspace = /**
     * Deactivate the current workspace
     * @return {?}
     */
    function () {
        /** @type {?} */
        var active = this.activeWorkspace$.value;
        if (active !== undefined) {
            active.deactivate();
            this.activeWorkspace$.next(undefined);
        }
    };
    return WorkspaceStore;
}(EntityStore));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Drop list that activates the selected workspace emit an event.
 */
var WorkspaceSelectorComponent = /** @class */ (function () {
    function WorkspaceSelectorComponent() {
        /**
         * Event emitted when an workspace is selected or unselected
         */
        this.selectedChange = new EventEmitter();
    }
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} workspace
     * @return {?}
     */
    WorkspaceSelectorComponent.prototype.getWorkspaceTitle = /**
     * \@internal
     * @param {?} workspace
     * @return {?}
     */
    function (workspace) {
        return getEntityTitle(workspace);
    };
    /**
     * When an workspace is manually selected, select it into the
     * store and emit an event.
     * @internal
     * @param event The selection change event
     */
    /**
     * When an workspace is manually selected, select it into the
     * store and emit an event.
     * \@internal
     * @param {?} event The selection change event
     * @return {?}
     */
    WorkspaceSelectorComponent.prototype.onSelectedChange = /**
     * When an workspace is manually selected, select it into the
     * store and emit an event.
     * \@internal
     * @param {?} event The selection change event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var workspace = event.value;
        this.store.activateWorkspace(workspace);
        this.selectedChange.emit({ selected: true, value: workspace });
    };
    WorkspaceSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-workspace-selector',
                    template: "<igo-entity-selector\r\n  [store]=\"store\"\r\n  [multi]=\"false\"\r\n  [titleAccessor]=\"getWorkspaceTitle\"\r\n  (selectedChange)=\"onSelectedChange($event)\">\r\n</igo-entity-selector>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["igo-entity-selector ::ng-deep mat-form-field .mat-form-field-infix{padding:0}igo-entity-selector ::ng-deep mat-form-field .mat-form-field-wrapper{padding-bottom:1.75em}"]
                }] }
    ];
    WorkspaceSelectorComponent.propDecorators = {
        store: [{ type: Input }],
        selectedChange: [{ type: Output }]
    };
    return WorkspaceSelectorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
var IgoWorkspaceSelectorModule = /** @class */ (function () {
    function IgoWorkspaceSelectorModule() {
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
    return IgoWorkspaceSelectorModule;
}());

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
var  /**
 * This class is responsible of managing the relations between
 * entities and the actions that consume them. It also defines an
 * entity table template that may be used by an entity table component.
 * @template E
 */
Workspace = /** @class */ (function () {
    function Workspace(options) {
        this.options = options;
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
        this.change = new Subject();
    }
    Object.defineProperty(Workspace.prototype, "id", {
        /**
         * Workspace id
         */
        get: /**
         * Workspace id
         * @return {?}
         */
        function () { return this.options.id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "title", {
        /**
         * Workspace title
         */
        get: /**
         * Workspace title
         * @return {?}
         */
        function () { return this.options.title; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "meta", {
        /**
         * Workspace title
         */
        get: /**
         * Workspace title
         * @return {?}
         */
        function () { return this.options.meta || {}; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "entityStore", {
        /**
         * Entities store
         */
        get: /**
         * Entities store
         * @return {?}
         */
        function () { return (/** @type {?} */ (this.options.entityStore)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "actionStore", {
        /**
         * Actions store (some actions activate a widget)
         */
        get: /**
         * Actions store (some actions activate a widget)
         * @return {?}
         */
        function () { return this.options.actionStore; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "widget", {
        /**
         * Selected widget
         */
        get: /**
         * Selected widget
         * @return {?}
         */
        function () { return this.widget$.value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "hasWidget", {
        /**
         * Whether a widget is selected
         */
        get: /**
         * Whether a widget is selected
         * @return {?}
         */
        function () { return this.widget !== undefined; },
        enumerable: true,
        configurable: true
    });
    /**
     * Whether this workspace is active
     */
    /**
     * Whether this workspace is active
     * @return {?}
     */
    Workspace.prototype.isActive = /**
     * Whether this workspace is active
     * @return {?}
     */
    function () { return this.active; };
    /**
     * Activate the workspace. By doing that, the workspace will observe
     * the selected entity (from the store) and update the actions availability.
     * For example, some actions require an entity to be selected.
     */
    /**
     * Activate the workspace. By doing that, the workspace will observe
     * the selected entity (from the store) and update the actions availability.
     * For example, some actions require an entity to be selected.
     * @return {?}
     */
    Workspace.prototype.activate = /**
     * Activate the workspace. By doing that, the workspace will observe
     * the selected entity (from the store) and update the actions availability.
     * For example, some actions require an entity to be selected.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.active === true) {
            this.deactivate();
        }
        this.active = true;
        if (this.entityStore !== undefined) {
            this.entities$$ = this.entityStore.stateView.all$()
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.onStateChange(); }));
        }
        if (this.actionStore !== undefined) {
            this.change$ = this.change
                .pipe(debounceTime(35))
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.actionStore.updateActionsAvailability(); }));
        }
        this.change.next();
    };
    /**
     * Deactivate the workspace. Unsubcribe to the selected entity.
     */
    /**
     * Deactivate the workspace. Unsubcribe to the selected entity.
     * @return {?}
     */
    Workspace.prototype.deactivate = /**
     * Deactivate the workspace. Unsubcribe to the selected entity.
     * @return {?}
     */
    function () {
        this.active = false;
        this.deactivateWidget();
        if (this.entities$$ !== undefined) {
            this.entities$$.unsubscribe();
        }
        if (this.change$ !== undefined) {
            this.change$.unsubscribe();
        }
    };
    /**
     * Activate a widget. In itself, activating a widget doesn't render it but,
     * if an WorkspaceWidgetOutlet component is bound to this workspace, the widget will
     * show up.
     * @param widget Widget
     * @param inputs Inputs the widget will receive
     */
    /**
     * Activate a widget. In itself, activating a widget doesn't render it but,
     * if an WorkspaceWidgetOutlet component is bound to this workspace, the widget will
     * show up.
     * @param {?} widget Widget
     * @param {?=} inputs Inputs the widget will receive
     * @param {?=} subscribers
     * @return {?}
     */
    Workspace.prototype.activateWidget = /**
     * Activate a widget. In itself, activating a widget doesn't render it but,
     * if an WorkspaceWidgetOutlet component is bound to this workspace, the widget will
     * show up.
     * @param {?} widget Widget
     * @param {?=} inputs Inputs the widget will receive
     * @param {?=} subscribers
     * @return {?}
     */
    function (widget, inputs, subscribers) {
        if (inputs === void 0) { inputs = {}; }
        if (subscribers === void 0) { subscribers = {}; }
        this.widget$.next(widget);
        this.widgetInputs$.next(inputs);
        this.widgetSubscribers$.next(subscribers);
        this.change.next();
    };
    /**
     * Deactivate a widget.
     */
    /**
     * Deactivate a widget.
     * @return {?}
     */
    Workspace.prototype.deactivateWidget = /**
     * Deactivate a widget.
     * @return {?}
     */
    function () {
        this.widget$.next(undefined);
        this.change.next();
    };
    /**
     * When the state changes, update the actions availability.
     */
    /**
     * When the state changes, update the actions availability.
     * @private
     * @return {?}
     */
    Workspace.prototype.onStateChange = /**
     * When the state changes, update the actions availability.
     * @private
     * @return {?}
     */
    function () {
        this.change.next();
    };
    return Workspace;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This component dynamically render an Workspace's active widget.
 * It also deactivate that widget whenever the widget's component
 * emit the 'cancel' or 'complete' event.
 */
var WorkspaceWidgetOutletComponent = /** @class */ (function () {
    function WorkspaceWidgetOutletComponent() {
        /**
         * Event emitted when a widget is deactivate which happens
         * when the widget's component emits the 'cancel' or 'complete' event.
         */
        this.deactivateWidget = new EventEmitter();
    }
    Object.defineProperty(WorkspaceWidgetOutletComponent.prototype, "widget$", {
        /**
         * Observable of the workspace's active widget
         * @internal
         */
        get: /**
         * Observable of the workspace's active widget
         * \@internal
         * @return {?}
         */
        function () { return this.workspace.widget$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkspaceWidgetOutletComponent.prototype, "widgetInputs$", {
        /**
         * Observable of the workspace's widget inputs
         * @internal
         */
        get: /**
         * Observable of the workspace's widget inputs
         * \@internal
         * @return {?}
         */
        function () {
            return this.workspace.widgetInputs$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkspaceWidgetOutletComponent.prototype, "widgetSubscribers$", {
        /**
         * Observable of the workspace's widget inputs
         * @internal
         */
        get: /**
         * Observable of the workspace's widget inputs
         * \@internal
         * @return {?}
         */
        function () {
            return this.workspace.widgetSubscribers$;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * @param widget Widget
     * @internal
     */
    /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * \@internal
     * @param {?} widget Widget
     * @return {?}
     */
    WorkspaceWidgetOutletComponent.prototype.onWidgetCancel = /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * \@internal
     * @param {?} widget Widget
     * @return {?}
     */
    function (widget) {
        this.workspace.deactivateWidget();
        this.deactivateWidget.emit(widget);
    };
    /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * @param widget Widget
     * @internal
     */
    /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * \@internal
     * @param {?} widget Widget
     * @return {?}
     */
    WorkspaceWidgetOutletComponent.prototype.onWidgetComplete = /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * \@internal
     * @param {?} widget Widget
     * @return {?}
     */
    function (widget) {
        this.workspace.deactivateWidget();
        this.deactivateWidget.emit(widget);
    };
    WorkspaceWidgetOutletComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-workspace-widget-outlet',
                    template: "<ng-container *ngIf=\"widget$ | async as widget\">\r\n  <igo-widget-outlet\r\n    [widget]=\"widget\"\r\n    [inputs]=\"widgetInputs$ | async\"\r\n    [subscribers]=\"widgetSubscribers$ | async\"\r\n    (cancel)=\"onWidgetCancel(widget)\"\r\n    (complete)=\"onWidgetComplete(widget)\">\r\n  </igo-widget-outlet>\r\n</ng-container>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["igo-widget-outlet{height:100%}"]
                }] }
    ];
    /** @nocollapse */
    WorkspaceWidgetOutletComponent.ctorParameters = function () { return []; };
    WorkspaceWidgetOutletComponent.propDecorators = {
        workspace: [{ type: Input }],
        deactivateWidget: [{ type: Output }]
    };
    return WorkspaceWidgetOutletComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
var IgoWorkspaceWidgetOutletModule = /** @class */ (function () {
    function IgoWorkspaceWidgetOutletModule() {
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
    return IgoWorkspaceWidgetOutletModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoWorkspaceModule = /** @class */ (function () {
    function IgoWorkspaceModule() {
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
    return IgoWorkspaceModule;
}());

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
    function (compType) {
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
var Widget = /** @class */ (function (_super) {
    __extends(Widget, _super);
    function Widget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Widget;
}(DynamicComponent));

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