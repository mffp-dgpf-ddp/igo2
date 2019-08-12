/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityStore, EntityStoreWatcher, EntityTableColumnRenderer, EntityTableSelectionState, EntityTableScrollBehavior } from '../shared';
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
        var state = this.store.state.get(entity);
        return state.selected ? state.selected : false;
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
                    template: "<div class=\"table-container\">\r\n  <table\r\n    mat-table\r\n    matSort\r\n    [ngClass]=\"getTableClass()\"\r\n    [dataSource]=\"dataSource\"\r\n    (matSortChange)=\"onSort($event)\">\r\n\r\n    <ng-container matColumnDef=\"selectionCheckbox\" class=\"mat-cell-checkbox\">\r\n      <th mat-header-cell *matHeaderCellDef>\r\n        <ng-container *ngIf=\"selectMany\">\r\n          <ng-container *ngIf=\"selectionState$ | async as selectionState\">\r\n            <mat-checkbox (change)=\"onToggleRows($event.checked)\"\r\n                          [checked]=\"selectionState === entityTableSelectionState.All\"\r\n                          [indeterminate]=\"selectionState === entityTableSelectionState.Some\">\r\n            </mat-checkbox>\r\n          </ng-container>\r\n        </ng-container>\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let entity\">\r\n        <mat-checkbox (click)=\"$event.stopPropagation()\"\r\n                      (change)=\"onToggleRow($event.checked, entity)\"\r\n                      [checked]=\"rowIsSelected(entity)\">\r\n        </mat-checkbox>\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container [matColumnDef]=\"column.name\" *ngFor=\"let column of template.columns\">\r\n      <ng-container *ngIf=\"columnIsSortable(column)\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n          {{column.title}}\r\n        </th>\r\n      </ng-container>\r\n\r\n      <ng-container *ngIf=\"!columnIsSortable(column)\">\r\n        <th mat-header-cell *matHeaderCellDef>\r\n          {{column.title}}\r\n        </th>\r\n      </ng-container>\r\n\r\n      <ng-container *ngIf=\"getColumnRenderer(column) as columnRenderer\">\r\n        <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.Default\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\">\r\n              {{getValue(entity, column)}}\r\n            </td>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.HTML\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\"\r\n              [innerHTML]=\"getValue(entity, column)\">\r\n            </td>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.UnsanitizedHTML\">\r\n              <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n                [ngClass]=\"getCellClass(entity, column)\"\r\n                [innerHTML]=\"getValue(entity, column) | sanitizeHtml\">\r\n              </td>\r\n            </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.Icon\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\">\r\n              <mat-icon svgIcon=\"{{getValue(entity, column)}}\"></mat-icon>\r\n            </td>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.ButtonGroup\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\">\r\n              <button *ngFor=\"let button of getValue(entity, column)\"\r\n                mat-mini-fab\r\n                igoStopPropagation\r\n                [color]=\"button.color\"\r\n                (click)=\"onButtonClick(button.click, entity)\">\r\n                <mat-icon svgIcon=\"{{button.icon}}\"></mat-icon>\r\n              </button>\r\n            </td>\r\n          </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n\r\n    <tr\r\n      mat-header-row\r\n      *matHeaderRowDef=\"headers; sticky: fixedHeader;\"\r\n      [ngClass]=\"getHeaderClass()\">\r\n    </tr>\r\n    <tr\r\n      mat-row\r\n      igoEntityTableRow\r\n      *matRowDef=\"let entity; columns: headers;\"\r\n      [scrollBehavior]=\"scrollBehavior\"\r\n      [ngClass]=\"getRowClass(entity)\"\r\n      [selection]=\"selection\"\r\n      [selected]=\"rowIsSelected(entity)\"\r\n      (select)=\"onRowSelect(entity)\"\r\n      (click)=\"onRowClick(entity)\">\r\n    </tr>\r\n\r\n  </table>\r\n</div>\r\n",
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
export { EntityTableComponent };
if (false) {
    /**
     * Reference to the column renderer types
     * \@internal
     * @type {?}
     */
    EntityTableComponent.prototype.entityTableColumnRenderer;
    /**
     * Reference to the selection states
     * \@internal
     * @type {?}
     */
    EntityTableComponent.prototype.entityTableSelectionState;
    /**
     * Observable of the selection,s state
     * \@internal
     * @type {?}
     */
    EntityTableComponent.prototype.selectionState$;
    /**
     * Entity store watcher
     * @type {?}
     * @private
     */
    EntityTableComponent.prototype.watcher;
    /**
     * Subscription to the store's selection
     * @type {?}
     * @private
     */
    EntityTableComponent.prototype.selection$$;
    /**
     * Entity store
     * @type {?}
     */
    EntityTableComponent.prototype.store;
    /**
     * Table template
     * @type {?}
     */
    EntityTableComponent.prototype.template;
    /**
     * Scroll behavior on selection
     * @type {?}
     */
    EntityTableComponent.prototype.scrollBehavior;
    /**
     * Event emitted when an entity (row) is clicked
     * @type {?}
     */
    EntityTableComponent.prototype.entityClick;
    /**
     * Event emitted when an entity (row) is selected
     * @type {?}
     */
    EntityTableComponent.prototype.entitySelectChange;
    /**
     * @type {?}
     * @private
     */
    EntityTableComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9lbnRpdHkvZW50aXR5LXRhYmxlL2VudGl0eS10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUtsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVyRCxPQUFPLEVBRUwsV0FBVyxFQUNYLGtCQUFrQixFQUdsQix5QkFBeUIsRUFDekIseUJBQXlCLEVBQ3pCLHlCQUF5QixFQUMxQixNQUFNLFdBQVcsQ0FBQztBQUVuQjtJQThHRSw4QkFBb0IsS0FBd0I7UUFBeEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7Ozs7O1FBbEc1Qyw4QkFBeUIsR0FBRyx5QkFBeUIsQ0FBQzs7Ozs7UUFNdEQsOEJBQXlCLEdBQUcseUJBQXlCLENBQUM7Ozs7O1FBTXRELG9CQUFlLEdBQStDLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O1FBMEI3RixtQkFBYyxHQUE4Qix5QkFBeUIsQ0FBQyxJQUFJLENBQUM7Ozs7UUFLakUsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDOzs7O1FBS3pDLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUUzQyxDQUFDO0lBZ0QwQyxDQUFDO0lBMUNoRCxzQkFBSSx5Q0FBTztRQUpYOzs7V0FHRzs7Ozs7O1FBQ0g7O2dCQUNNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU87aUJBQ2hDLE1BQU07Ozs7WUFBQyxVQUFDLE1BQXlCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBeEIsQ0FBd0IsRUFBQztpQkFDL0QsR0FBRzs7OztZQUFD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XG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgRW50aXR5UmVjb3JkLFxyXG4gIEVudGl0eVN0b3JlLFxyXG4gIEVudGl0eVN0b3JlV2F0Y2hlcixcclxuICBFbnRpdHlUYWJsZVRlbXBsYXRlLFxyXG4gIEVudGl0eVRhYmxlQ29sdW1uLFxyXG4gIEVudGl0eVRhYmxlQ29sdW1uUmVuZGVyZXIsXHJcbiAgRW50aXR5VGFibGVTZWxlY3Rpb25TdGF0ZSxcclxuICBFbnRpdHlUYWJsZVNjcm9sbEJlaGF2aW9yXHJcbn0gZnJvbSAnLi4vc2hhcmVkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWVudGl0eS10YWJsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2VudGl0eS10YWJsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZW50aXR5LXRhYmxlLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEVudGl0eVRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyAge1xyXG5cclxuICAvKipcclxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGNvbHVtbiByZW5kZXJlciB0eXBlc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGVudGl0eVRhYmxlQ29sdW1uUmVuZGVyZXIgPSBFbnRpdHlUYWJsZUNvbHVtblJlbmRlcmVyO1xyXG5cclxuICAvKipcclxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIHNlbGVjdGlvbiBzdGF0ZXNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBlbnRpdHlUYWJsZVNlbGVjdGlvblN0YXRlID0gRW50aXR5VGFibGVTZWxlY3Rpb25TdGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgc2VsZWN0aW9uLHMgc3RhdGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzZWxlY3Rpb25TdGF0ZSQ6IEJlaGF2aW9yU3ViamVjdDxFbnRpdHlUYWJsZVNlbGVjdGlvblN0YXRlPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW50aXR5IHN0b3JlIHdhdGNoZXJcclxuICAgKi9cclxuICBwcml2YXRlIHdhdGNoZXI6IEVudGl0eVN0b3JlV2F0Y2hlcjxvYmplY3Q+O1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHN0b3JlJ3Mgc2VsZWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZWxlY3Rpb24kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBFbnRpdHkgc3RvcmVcclxuICAgKi9cclxuICBASW5wdXQoKSBzdG9yZTogRW50aXR5U3RvcmU8b2JqZWN0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGFibGUgdGVtcGxhdGVcclxuICAgKi9cclxuICBASW5wdXQoKSB0ZW1wbGF0ZTogRW50aXR5VGFibGVUZW1wbGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2Nyb2xsIGJlaGF2aW9yIG9uIHNlbGVjdGlvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2Nyb2xsQmVoYXZpb3I6IEVudGl0eVRhYmxlU2Nyb2xsQmVoYXZpb3IgPSBFbnRpdHlUYWJsZVNjcm9sbEJlaGF2aW9yLkF1dG87XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhbiBlbnRpdHkgKHJvdykgaXMgY2xpY2tlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBlbnRpdHlDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYW4gZW50aXR5IChyb3cpIGlzIHNlbGVjdGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGVudGl0eVNlbGVjdENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgYWRkZWQ6IG9iamVjdFtdO1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRhYmxlIGhlYWRlcnNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgaGVhZGVycygpOiBzdHJpbmdbXSB7XHJcbiAgICBsZXQgY29sdW1ucyA9IHRoaXMudGVtcGxhdGUuY29sdW1uc1xyXG4gICAgICAuZmlsdGVyKChjb2x1bW46IEVudGl0eVRhYmxlQ29sdW1uKSA9PiBjb2x1bW4udmlzaWJsZSAhPT0gZmFsc2UpXHJcbiAgICAgIC5tYXAoKGNvbHVtbjogRW50aXR5VGFibGVDb2x1bW4pID0+IGNvbHVtbi5uYW1lKTtcclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3Rpb25DaGVja2JveCA9PT0gdHJ1ZSkge1xyXG4gICAgICBjb2x1bW5zID0gWydzZWxlY3Rpb25DaGVja2JveCddLmNvbmNhdChjb2x1bW5zKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29sdW1ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEgc291cmNlIGNvbnN1bWFibGUgYnkgdGhlIHVuZGVybHlpbmcgbWF0ZXJpYWwgdGFibGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgZGF0YVNvdXJjZSgpOiBCZWhhdmlvclN1YmplY3Q8b2JqZWN0W10+IHsgcmV0dXJuIHRoaXMuc3RvcmUudmlldy5hbGwkKCk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBzZWxlY3Rpb24gaXMgc3VwcG9ydGVkXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHNlbGVjdGlvbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMudGVtcGxhdGUuc2VsZWN0aW9uIHx8IGZhbHNlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYSBzZWxlY3Rpb24gY2hlY2tib3ggc2hvdWxkIGJlIGRpc3BsYXllZFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBzZWxlY3Rpb25DaGVja2JveCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMudGVtcGxhdGUuc2VsZWN0aW9uQ2hlY2tib3ggfHwgZmFsc2U7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBzZWxlY3Rpb24gbWFueSBlbnRpdGllcyBzaG91bGQgZWIgc3VwcG9ydGVkXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHNlbGVjdE1hbnkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnRlbXBsYXRlLnNlbGVjdE1hbnkgfHwgZmFsc2U7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBzZWxlY3Rpb24gbWFueSBlbnRpdGllcyBzaG91bGQgZWIgc3VwcG9ydGVkXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IGZpeGVkSGVhZGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy50ZW1wbGF0ZS5maXhlZEhlYWRlciA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHRoaXMudGVtcGxhdGUuZml4ZWRIZWFkZXI7IH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYWNrIHRoZSBzZWxlY3Rpb24gc3RhdGUgdG8gcHJvcGVybHkgZGlzcGxheSB0aGUgc2VsZWN0aW9uIGNoZWNrYm94ZXNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc2VsZWN0aW9uJCQgPSB0aGlzLnN0b3JlLnN0YXRlVmlld1xyXG4gICAgICAubWFueUJ5JCgocmVjb3JkOiBFbnRpdHlSZWNvcmQ8b2JqZWN0PikgPT4gcmVjb3JkLnN0YXRlLnNlbGVjdGVkID09PSB0cnVlKVxyXG4gICAgICAuc3Vic2NyaWJlKChyZWNvcmRzOiBFbnRpdHlSZWNvcmQ8b2JqZWN0PltdKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGF0ZSQubmV4dCh0aGlzLmNvbXB1dGVTZWxlY3Rpb25TdGF0ZShyZWNvcmRzKSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgc3RvcmUgY2hhbmdlLCBjcmVhdGUgYSBuZXcgd2F0Y2hlclxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGNvbnN0IHN0b3JlID0gY2hhbmdlcy5zdG9yZTtcclxuICAgIGlmIChzdG9yZSAmJiBzdG9yZS5jdXJyZW50VmFsdWUgIT09IHN0b3JlLnByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgaWYgKHRoaXMud2F0Y2hlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy53YXRjaGVyLmRlc3Ryb3koKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLndhdGNoZXIgPSBuZXcgRW50aXR5U3RvcmVXYXRjaGVyKHRoaXMuc3RvcmUsIHRoaXMuY2RSZWYpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5iaW5kIHRoZSBzdG9yZSB3YXRjaGVyXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy53YXRjaGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy53YXRjaGVyLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2VsZWN0aW9uJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyaWdnZXIgYSByZWZyZXNoIG9mIHRocmUgdGFibGUuIFRoaXMgY2FuIGJlIHVzZWZ1bCB3aGVuXHJcbiAgICogdGhlIGRhdGEgc291cmNlIGRvZXNuJ3QgZW1pdCBhIG5ldyB2YWx1ZSBidXQgZm9yIHNvbWUgcmVhc29uXHJcbiAgICogdGhlIHJlY29yZHMgbmVlZCBhbiB1cGRhdGUuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcmVmcmVzaCgpIHtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gc29ydCwgc29ydCB0aGUgc3RvcmVcclxuICAgKiBAcGFyYW0gZXZlbnQgU29ydCBldmVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uU29ydChldmVudDoge2FjdGl2ZTogc3RyaW5nLCBkaXJlY3Rpb246IHN0cmluZ30pIHtcclxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGV2ZW50LmRpcmVjdGlvbjtcclxuICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMudGVtcGxhdGUuY29sdW1uc1xyXG4gICAgICAuZmluZCgoYzogRW50aXR5VGFibGVDb2x1bW4pID0+IGMubmFtZSA9PT0gZXZlbnQuYWN0aXZlKTtcclxuXHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnYXNjJyB8fCBkaXJlY3Rpb24gPT09ICdkZXNjJykge1xyXG4gICAgICB0aGlzLnN0b3JlLnZpZXcuc29ydCh7XHJcbiAgICAgICAgdmFsdWVBY2Nlc3NvcjogKGVudGl0eTogb2JqZWN0KSA9PiB0aGlzLmdldFZhbHVlKGVudGl0eSwgY29sdW1uKSxcclxuICAgICAgICBkaXJlY3Rpb25cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN0b3JlLnZpZXcuc29ydCh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhbiBlbnRpdHkgaXMgY2xpY2tlZCwgZW1pdCBhbiBldmVudFxyXG4gICAqIEBwYXJhbSBlbnRpdHkgRW50aXR5XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25Sb3dDbGljayhlbnRpdHk6IG9iamVjdCkge1xyXG4gICAgdGhpcy5lbnRpdHlDbGljay5lbWl0KGVudGl0eSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGFuIGVudGl0eSBpcyBzZWxlY3RlZCwgc2VsZWN0IGl0IGluIHRoZSBzdG9yZSBhbmQgZW1pdCBhbiBldmVudC4gRXZlbiBpZlxyXG4gICAqIFwibWFueVwiIGlzIHNldCB0byB0cnVlLCB0aGlzIG1ldGhvZCBhbHdheXMgc2VsZWN0IGEgc2luZ2xlLCBleGNsdXNpdmUgcm93LiBTZWxlY3RpbmdcclxuICAgKiBtdWx0aXBsZSByb3dzIHNob3VsZCBiZSBhY2hpZXZlZCBieSB1c2luZyB0aGUgY2hlY2tib3hlcy5cclxuICAgKiBAcGFyYW0gZW50aXR5IEVudGl0eVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uUm93U2VsZWN0KGVudGl0eTogb2JqZWN0KSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3Rpb24gPT09IGZhbHNlKSB7IHJldHVybjsgfVxyXG5cclxuICAgIC8vIFNlbGVjdGluZyBhXHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShlbnRpdHksIHtzZWxlY3RlZDogdHJ1ZX0sIHRydWUpO1xyXG4gICAgdGhpcy5lbnRpdHlTZWxlY3RDaGFuZ2UuZW1pdCh7YWRkZWQ6IFtlbnRpdHldfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWxlY3Qgb3IgdW5zZWxlY3QgYWxsIHJvd3MgYXQgb25jZS4gT24gc2VsZWN0LCBlbWl0IGFuIGV2ZW50LlxyXG4gICAqIEBwYXJhbSB0b2dnbGUgU2VsZWN0IG9yIHVuc2VsZWN0XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25Ub2dnbGVSb3dzKHRvZ2dsZTogYm9vbGVhbikge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uID09PSBmYWxzZSkgeyByZXR1cm47IH1cclxuXHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZUFsbCh7c2VsZWN0ZWQ6IHRvZ2dsZX0pO1xyXG4gICAgaWYgKHRvZ2dsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmVudGl0eVNlbGVjdENoYW5nZS5lbWl0KHthZGRlZDogW3RoaXMuc3RvcmUudmlldy5hbGwoKV19KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYW4gZW50aXR5IGlzIHRvZ2dsZWQsIHNlbGVjdCBvciB1bnNlbGVjdCBpdCBpbiB0aGUgc3RvcmUuIE9uIHNlbGVjdCxcclxuICAgKiBlbWl0IGFuIGV2ZW50LlxyXG4gICAqIEBwYXJhbSB0b2dnbGUgU2VsZWN0IG9yIHVuc2VsZWN0XHJcbiAgICogQHBhcmFtIGVudGl0eSBFbnRpdHlcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblRvZ2dsZVJvdyh0b2dnbGU6IGJvb2xlYW4sIGVudGl0eTogb2JqZWN0KSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3Rpb24gPT09IGZhbHNlKSB7IHJldHVybjsgfVxyXG5cclxuICAgIGNvbnN0IGV4Y2x1c2l2ZSA9IHRvZ2dsZSA9PT0gdHJ1ZSAmJiAhdGhpcy5zZWxlY3RNYW55O1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUoZW50aXR5LCB7c2VsZWN0ZWQ6IHRvZ2dsZX0sIGV4Y2x1c2l2ZSk7XHJcbiAgICBpZiAodG9nZ2xlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZW50aXR5U2VsZWN0Q2hhbmdlLmVtaXQoe2FkZGVkOiBbZW50aXR5XX0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZSB0aGUgc2VsZWN0aW9uIHN0YXRlXHJcbiAgICogQHJldHVybnMgV2hldGhlciBhbGwsIHNvbWUgb3Igbm8gcm93cyBhcmUgc2VsZWN0ZWRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcml2YXRlIGNvbXB1dGVTZWxlY3Rpb25TdGF0ZShzZWxlY3RlZFJlY29yZHM6IEVudGl0eVJlY29yZDxvYmplY3Q+W10pOiBFbnRpdHlUYWJsZVNlbGVjdGlvblN0YXRlIHtcclxuICAgIGNvbnN0IHN0YXRlcyA9IEVudGl0eVRhYmxlU2VsZWN0aW9uU3RhdGU7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25Db3VudCA9IHNlbGVjdGVkUmVjb3Jkcy5sZW5ndGg7XHJcbiAgICByZXR1cm4gc2VsZWN0aW9uQ291bnQgPT09IDAgP1xyXG4gICAgICBzdGF0ZXMuTm9uZSA6XHJcbiAgICAgIChzZWxlY3Rpb25Db3VudCA9PT0gdGhpcy5zdG9yZS52aWV3LmNvdW50ID8gc3RhdGVzLkFsbCA6IHN0YXRlcy5Tb21lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYSBjb2x1bW4gaXMgc29ydGFibGVcclxuICAgKiBAcGFyYW0gY29sdW1uIENvbHVtblxyXG4gICAqIEByZXR1cm5zIFRydWUgaWYgYSBjb2x1bW4gaXMgc29ydGFibGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBjb2x1bW5Jc1NvcnRhYmxlKGNvbHVtbjogRW50aXR5VGFibGVDb2x1bW4pOiBib29sZWFuIHtcclxuICAgIGxldCBzb3J0YWJsZSA9IGNvbHVtbi5zb3J0O1xyXG4gICAgaWYgKHNvcnRhYmxlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgc29ydGFibGUgPSB0aGlzLnRlbXBsYXRlLnNvcnQgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogdGhpcy50ZW1wbGF0ZS5zb3J0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNvcnRhYmxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIHJvdyBpcyBzaG91bGQgYmUgc2VsZWN0ZWQgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgZW50aXR5IHN0YXRlXHJcbiAgICogQHBhcmFtIGVudGl0eSBFbnRpdHlcclxuICAgKiBAcmV0dXJucyBUcnVlIGlmIGEgcm93IHNob3VsZCBiZSBzZWxlY3RlZFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHJvd0lzU2VsZWN0ZWQoZW50aXR5OiBvYmplY3QpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdG9yZS5zdGF0ZS5nZXQoZW50aXR5KTtcclxuICAgIHJldHVybiBzdGF0ZS5zZWxlY3RlZCA/IHN0YXRlLnNlbGVjdGVkIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gYWNjZXNzIGFuIGVudGl0eSdzIHZhbHVlc1xyXG4gICAqIEBwYXJhbSBlbnRpdHkgRW50aXR5XHJcbiAgICogQHBhcmFtIGNvbHVtbiBDb2x1bW5cclxuICAgKiBAcmV0dXJucyBBbnkgdmFsdWVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXRWYWx1ZShlbnRpdHk6IG9iamVjdCwgY29sdW1uOiBFbnRpdHlUYWJsZUNvbHVtbik6IGFueSB7XHJcbiAgICBpZiAoY29sdW1uLnZhbHVlQWNjZXNzb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gY29sdW1uLnZhbHVlQWNjZXNzb3IoZW50aXR5KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnRlbXBsYXRlLnZhbHVlQWNjZXNzb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZS52YWx1ZUFjY2Vzc29yKGVudGl0eSwgY29sdW1uLm5hbWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0UHJvcGVydHkoZW50aXR5LCBjb2x1bW4ubmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGhlIHR5cGUgb2YgcmVuZGVyZXIgb2YgYSBjb2x1bW5cclxuICAgKiBAcGFyYW0gY29sdW1uIENvbHVtblxyXG4gICAqIEByZXR1cm5zIFJlbmRlcmVyIHR5cGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXRDb2x1bW5SZW5kZXJlcihjb2x1bW46IEVudGl0eVRhYmxlQ29sdW1uKTogRW50aXR5VGFibGVDb2x1bW5SZW5kZXJlciB7XHJcbiAgICBpZiAoY29sdW1uLnJlbmRlcmVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIGNvbHVtbi5yZW5kZXJlcjtcclxuICAgIH1cclxuICAgIHJldHVybiBFbnRpdHlUYWJsZUNvbHVtblJlbmRlcmVyLkRlZmF1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGhlIHRhYmxlIG5nQ2xhc3NcclxuICAgKiBAcmV0dXJucyBuZ0NsYXNzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0VGFibGVDbGFzcygpOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJ2lnby1lbnRpdHktdGFibGUtd2l0aC1zZWxlY3Rpb24nOiB0aGlzLnNlbGVjdGlvblxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBhIGhlYWRlciBuZ0NsYXNzXHJcbiAgICogQHJldHVybnMgbmdDbGFzc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldEhlYWRlckNsYXNzKCk6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSB7XHJcbiAgICBjb25zdCBmdW5jID0gdGhpcy50ZW1wbGF0ZS5oZWFkZXJDbGFzc0Z1bmM7XHJcbiAgICBpZiAoZnVuYyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIHJldHVybiBmdW5jKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gYSByb3cgbmdDbGFzc1xyXG4gICAqIEBwYXJhbSBlbnRpdHkgRW50aXR5XHJcbiAgICogQHJldHVybnMgbmdDbGFzc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldFJvd0NsYXNzKGVudGl0eTogb2JqZWN0KToge1trZXk6IHN0cmluZ106IGJvb2xlYW59IHtcclxuICAgIGNvbnN0IGZ1bmMgPSB0aGlzLnRlbXBsYXRlLnJvd0NsYXNzRnVuYztcclxuICAgIGlmIChmdW5jIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgcmV0dXJuIGZ1bmMoZW50aXR5KTtcclxuICAgIH1cclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBhIHJvdyBuZ0NsYXNzXHJcbiAgICogQHBhcmFtIGVudGl0eSBFbnRpdHlcclxuICAgKiBAcGFyYW0gY29sdW1uIENvbHVtblxyXG4gICAqIEByZXR1cm5zIG5nQ2xhc3NcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXRDZWxsQ2xhc3MoZW50aXR5OiBvYmplY3QsIGNvbHVtbjogRW50aXR5VGFibGVDb2x1bW4pOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0ge1xyXG4gICAgY29uc3QgY2xzID0ge307XHJcblxyXG4gICAgY29uc3QgdGFibGVGdW5jID0gdGhpcy50ZW1wbGF0ZS5jZWxsQ2xhc3NGdW5jO1xyXG4gICAgaWYgKHRhYmxlRnVuYyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24oY2xzLCB0YWJsZUZ1bmMoZW50aXR5LCBjb2x1bW4pKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb2x1bW5GdW5jID0gY29sdW1uLmNlbGxDbGFzc0Z1bmM7XHJcbiAgICBpZiAoY29sdW1uRnVuYyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24oY2xzLCBjb2x1bW5GdW5jKGVudGl0eSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjbHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgYnV0dG9uIGlzIGNsaWNrZWRcclxuICAgKiBAcGFyYW0gZnVuYyBGdW5jdGlvblxyXG4gICAqIEBwYXJhbSBlbnRpdHkgRW50aXR5XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25CdXR0b25DbGljayhjbGlja0Z1bmM6IChlbnRpdHk6IG9iamVjdCkgPT4gdm9pZCwgZW50aXR5OiBvYmplY3QpIHtcclxuICAgIGlmICh0eXBlb2YgY2xpY2tGdW5jID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIGNsaWNrRnVuYyhlbnRpdHkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19