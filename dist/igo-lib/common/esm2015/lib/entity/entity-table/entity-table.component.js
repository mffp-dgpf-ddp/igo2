/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityStore, EntityStoreWatcher, EntityTableColumnRenderer, EntityTableSelectionState, EntityTableScrollBehavior } from '../shared';
export class EntityTableComponent {
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
        const state = this.store.state.get(entity);
        return state.selected ? state.selected : false;
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
                template: "<div class=\"table-container\">\r\n  <table\r\n    mat-table\r\n    matSort\r\n    [ngClass]=\"getTableClass()\"\r\n    [dataSource]=\"dataSource\"\r\n    (matSortChange)=\"onSort($event)\">\r\n\r\n    <ng-container matColumnDef=\"selectionCheckbox\" class=\"mat-cell-checkbox\">\r\n      <th mat-header-cell *matHeaderCellDef>\r\n        <ng-container *ngIf=\"selectMany\">\r\n          <ng-container *ngIf=\"selectionState$ | async as selectionState\">\r\n            <mat-checkbox (change)=\"onToggleRows($event.checked)\"\r\n                          [checked]=\"selectionState === entityTableSelectionState.All\"\r\n                          [indeterminate]=\"selectionState === entityTableSelectionState.Some\">\r\n            </mat-checkbox>\r\n          </ng-container>\r\n        </ng-container>\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let entity\">\r\n        <mat-checkbox (click)=\"$event.stopPropagation()\"\r\n                      (change)=\"onToggleRow($event.checked, entity)\"\r\n                      [checked]=\"rowIsSelected(entity)\">\r\n        </mat-checkbox>\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container [matColumnDef]=\"column.name\" *ngFor=\"let column of template.columns\">\r\n      <ng-container *ngIf=\"columnIsSortable(column)\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n          {{column.title}}\r\n        </th>\r\n      </ng-container>\r\n\r\n      <ng-container *ngIf=\"!columnIsSortable(column)\">\r\n        <th mat-header-cell *matHeaderCellDef>\r\n          {{column.title}}\r\n        </th>\r\n      </ng-container>\r\n\r\n      <ng-container *ngIf=\"getColumnRenderer(column) as columnRenderer\">\r\n        <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.Default\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\">\r\n              {{getValue(entity, column)}}\r\n            </td>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.HTML\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\"\r\n              [innerHTML]=\"getValue(entity, column)\">\r\n            </td>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.UnsanitizedHTML\">\r\n              <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n                [ngClass]=\"getCellClass(entity, column)\"\r\n                [innerHTML]=\"getValue(entity, column) | sanitizeHtml\">\r\n              </td>\r\n            </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.Icon\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\">\r\n              <mat-icon svgIcon=\"{{getValue(entity, column)}}\"></mat-icon>\r\n            </td>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"columnRenderer === entityTableColumnRenderer.ButtonGroup\">\r\n            <td mat-cell *matCellDef=\"let entity\" class=\"mat-cell-text\"\r\n              [ngClass]=\"getCellClass(entity, column)\">\r\n              <span *ngFor=\"let button of getValue(entity, column)\">\r\n                <button *ngIf=\"button.style === 'mat-icon-button'\"\r\n                  igoStopPropagation\r\n                  mat-icon-button\r\n                  [color]=\"button.color\"\r\n                  (click)=\"onButtonClick(button.click, entity)\">\r\n                  <mat-icon svgIcon=\"{{button.icon}}\"></mat-icon>\r\n                </button>\r\n                <button *ngIf=\"button.style !== 'mat-icon-button'\"\r\n                  igoStopPropagation\r\n                  mat-mini-fab\r\n                  [color]=\"button.color\"\r\n                  (click)=\"onButtonClick(button.click, entity)\">\r\n                  <mat-icon svgIcon=\"{{button.icon}}\"></mat-icon>\r\n                </button>\r\n              </span>\r\n            </td>\r\n          </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n\r\n    <tr\r\n      mat-header-row\r\n      *matHeaderRowDef=\"headers; sticky: fixedHeader;\"\r\n      [ngClass]=\"getHeaderClass()\">\r\n    </tr>\r\n    <tr\r\n      mat-row\r\n      igoEntityTableRow\r\n      *matRowDef=\"let entity; columns: headers;\"\r\n      [scrollBehavior]=\"scrollBehavior\"\r\n      [ngClass]=\"getRowClass(entity)\"\r\n      [selection]=\"selection\"\r\n      [selected]=\"rowIsSelected(entity)\"\r\n      (select)=\"onRowSelect(entity)\"\r\n      (click)=\"onRowClick(entity)\">\r\n    </tr>\r\n\r\n  </table>\r\n</div>\r\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9lbnRpdHkvZW50aXR5LXRhYmxlL2VudGl0eS10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUtsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVyRCxPQUFPLEVBRUwsV0FBVyxFQUNYLGtCQUFrQixFQUdsQix5QkFBeUIsRUFDekIseUJBQXlCLEVBQ3pCLHlCQUF5QixFQUMxQixNQUFNLFdBQVcsQ0FBQztBQVFuQixNQUFNLE9BQU8sb0JBQW9COzs7O0lBd0cvQixZQUFvQixLQUF3QjtRQUF4QixVQUFLLEdBQUwsS0FBSyxDQUFtQjs7Ozs7UUFsRzVDLDhCQUF5QixHQUFHLHlCQUF5QixDQUFDOzs7OztRQU10RCw4QkFBeUIsR0FBRyx5QkFBeUIsQ0FBQzs7Ozs7UUFNdEQsb0JBQWUsR0FBK0MsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7UUEwQjdGLG1CQUFjLEdBQThCLHlCQUF5QixDQUFDLElBQUksQ0FBQzs7OztRQUtqRSxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7Ozs7UUFLekMsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBRTNDLENBQUM7SUFnRDBDLENBQUM7Ozs7OztJQTFDaEQsSUFBSSxPQUFPOztZQUNMLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU87YUFDaEMsTUFBTTs7OztRQUFDLENBQUMsTUFBeUIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUM7YUFDL0QsR0FBRzs7OztRQUFDLENBQUMsTUFB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QTZGOzs7Ozs7SUFLN0YsdUNBQTRDOzs7Ozs7SUFLNUMsMkNBQWtDOzs7OztJQUtsQyxxQ0FBb0M7Ozs7O0lBS3BDLHdDQUF1Qzs7Ozs7SUFLdkMsOENBQzJFOzs7OztJQUszRSwyQ0FBbUQ7Ozs7O0lBS25ELGtEQUVLOzs7OztJQWdETyxxQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIEVudGl0eVJlY29yZCxcclxuICBFbnRpdHlTdG9yZSxcclxuICBFbnRpdHlTdG9yZVdhdGNoZXIsXHJcbiAgRW50aXR5VGFibGVUZW1wbGF0ZSxcclxuICBFbnRpdHlUYWJsZUNvbHVtbixcclxuICBFbnRpdHlUYWJsZUNvbHVtblJlbmRlcmVyLFxyXG4gIEVudGl0eVRhYmxlU2VsZWN0aW9uU3RhdGUsXHJcbiAgRW50aXR5VGFibGVTY3JvbGxCZWhhdmlvclxyXG59IGZyb20gJy4uL3NoYXJlZCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1lbnRpdHktdGFibGUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9lbnRpdHktdGFibGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2VudGl0eS10YWJsZS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFbnRpdHlUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMgIHtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBjb2x1bW4gcmVuZGVyZXIgdHlwZXNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBlbnRpdHlUYWJsZUNvbHVtblJlbmRlcmVyID0gRW50aXR5VGFibGVDb2x1bW5SZW5kZXJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBzZWxlY3Rpb24gc3RhdGVzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZW50aXR5VGFibGVTZWxlY3Rpb25TdGF0ZSA9IEVudGl0eVRhYmxlU2VsZWN0aW9uU3RhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIHNlbGVjdGlvbixzIHN0YXRlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgc2VsZWN0aW9uU3RhdGUkOiBCZWhhdmlvclN1YmplY3Q8RW50aXR5VGFibGVTZWxlY3Rpb25TdGF0ZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVudGl0eSBzdG9yZSB3YXRjaGVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaGVyOiBFbnRpdHlTdG9yZVdhdGNoZXI8b2JqZWN0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBzdG9yZSdzIHNlbGVjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2VsZWN0aW9uJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogRW50aXR5IHN0b3JlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RvcmU6IEVudGl0eVN0b3JlPG9iamVjdD47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRhYmxlIHRlbXBsYXRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgdGVtcGxhdGU6IEVudGl0eVRhYmxlVGVtcGxhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNjcm9sbCBiZWhhdmlvciBvbiBzZWxlY3Rpb25cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNjcm9sbEJlaGF2aW9yOiBFbnRpdHlUYWJsZVNjcm9sbEJlaGF2aW9yID0gRW50aXR5VGFibGVTY3JvbGxCZWhhdmlvci5BdXRvO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYW4gZW50aXR5IChyb3cpIGlzIGNsaWNrZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgZW50aXR5Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGFuIGVudGl0eSAocm93KSBpcyBzZWxlY3RlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBlbnRpdHlTZWxlY3RDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGFkZGVkOiBvYmplY3RbXTtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUYWJsZSBoZWFkZXJzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IGhlYWRlcnMoKTogc3RyaW5nW10ge1xyXG4gICAgbGV0IGNvbHVtbnMgPSB0aGlzLnRlbXBsYXRlLmNvbHVtbnNcclxuICAgICAgLmZpbHRlcigoY29sdW1uOiBFbnRpdHlUYWJsZUNvbHVtbikgPT4gY29sdW1uLnZpc2libGUgIT09IGZhbHNlKVxyXG4gICAgICAubWFwKChjb2x1bW46IEVudGl0eVRhYmxlQ29sdW1uKSA9PiBjb2x1bW4ubmFtZSk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uQ2hlY2tib3ggPT09IHRydWUpIHtcclxuICAgICAgY29sdW1ucyA9IFsnc2VsZWN0aW9uQ2hlY2tib3gnXS5jb25jYXQoY29sdW1ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbHVtbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEYXRhIHNvdXJjZSBjb25zdW1hYmxlIGJ5IHRoZSB1bmRlcmx5aW5nIG1hdGVyaWFsIHRhYmxlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IGRhdGFTb3VyY2UoKTogQmVoYXZpb3JTdWJqZWN0PG9iamVjdFtdPiB7IHJldHVybiB0aGlzLnN0b3JlLnZpZXcuYWxsJCgpOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgc2VsZWN0aW9uIGlzIHN1cHBvcnRlZFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBzZWxlY3Rpb24oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnRlbXBsYXRlLnNlbGVjdGlvbiB8fCBmYWxzZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgc2VsZWN0aW9uIGNoZWNrYm94IHNob3VsZCBiZSBkaXNwbGF5ZWRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgc2VsZWN0aW9uQ2hlY2tib3goKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnRlbXBsYXRlLnNlbGVjdGlvbkNoZWNrYm94IHx8IGZhbHNlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgc2VsZWN0aW9uIG1hbnkgZW50aXRpZXMgc2hvdWxkIGViIHN1cHBvcnRlZFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBzZWxlY3RNYW55KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy50ZW1wbGF0ZS5zZWxlY3RNYW55IHx8IGZhbHNlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgc2VsZWN0aW9uIG1hbnkgZW50aXRpZXMgc2hvdWxkIGViIHN1cHBvcnRlZFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBmaXhlZEhlYWRlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMudGVtcGxhdGUuZml4ZWRIZWFkZXIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB0aGlzLnRlbXBsYXRlLmZpeGVkSGVhZGVyOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBUcmFjayB0aGUgc2VsZWN0aW9uIHN0YXRlIHRvIHByb3Blcmx5IGRpc3BsYXkgdGhlIHNlbGVjdGlvbiBjaGVja2JveGVzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNlbGVjdGlvbiQkID0gdGhpcy5zdG9yZS5zdGF0ZVZpZXdcclxuICAgICAgLm1hbnlCeSQoKHJlY29yZDogRW50aXR5UmVjb3JkPG9iamVjdD4pID0+IHJlY29yZC5zdGF0ZS5zZWxlY3RlZCA9PT0gdHJ1ZSlcclxuICAgICAgLnN1YnNjcmliZSgocmVjb3JkczogRW50aXR5UmVjb3JkPG9iamVjdD5bXSkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhdGUkLm5leHQodGhpcy5jb21wdXRlU2VsZWN0aW9uU3RhdGUocmVjb3JkcykpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIHN0b3JlIGNoYW5nZSwgY3JlYXRlIGEgbmV3IHdhdGNoZXJcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBjb25zdCBzdG9yZSA9IGNoYW5nZXMuc3RvcmU7XHJcbiAgICBpZiAoc3RvcmUgJiYgc3RvcmUuY3VycmVudFZhbHVlICE9PSBzdG9yZS5wcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgIGlmICh0aGlzLndhdGNoZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMud2F0Y2hlci5kZXN0cm95KCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy53YXRjaGVyID0gbmV3IEVudGl0eVN0b3JlV2F0Y2hlcih0aGlzLnN0b3JlLCB0aGlzLmNkUmVmKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuYmluZCB0aGUgc3RvcmUgd2F0Y2hlclxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMud2F0Y2hlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMud2F0Y2hlci5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGlvbiQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmlnZ2VyIGEgcmVmcmVzaCBvZiB0aHJlIHRhYmxlLiBUaGlzIGNhbiBiZSB1c2VmdWwgd2hlblxyXG4gICAqIHRoZSBkYXRhIHNvdXJjZSBkb2Vzbid0IGVtaXQgYSBuZXcgdmFsdWUgYnV0IGZvciBzb21lIHJlYXNvblxyXG4gICAqIHRoZSByZWNvcmRzIG5lZWQgYW4gdXBkYXRlLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHJlZnJlc2goKSB7XHJcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHNvcnQsIHNvcnQgdGhlIHN0b3JlXHJcbiAgICogQHBhcmFtIGV2ZW50IFNvcnQgZXZlbnRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblNvcnQoZXZlbnQ6IHthY3RpdmU6IHN0cmluZywgZGlyZWN0aW9uOiBzdHJpbmd9KSB7XHJcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBldmVudC5kaXJlY3Rpb247XHJcbiAgICBjb25zdCBjb2x1bW4gPSB0aGlzLnRlbXBsYXRlLmNvbHVtbnNcclxuICAgICAgLmZpbmQoKGM6IEVudGl0eVRhYmxlQ29sdW1uKSA9PiBjLm5hbWUgPT09IGV2ZW50LmFjdGl2ZSk7XHJcblxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2FzYycgfHwgZGlyZWN0aW9uID09PSAnZGVzYycpIHtcclxuICAgICAgdGhpcy5zdG9yZS52aWV3LnNvcnQoe1xyXG4gICAgICAgIHZhbHVlQWNjZXNzb3I6IChlbnRpdHk6IG9iamVjdCkgPT4gdGhpcy5nZXRWYWx1ZShlbnRpdHksIGNvbHVtbiksXHJcbiAgICAgICAgZGlyZWN0aW9uXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zdG9yZS52aWV3LnNvcnQodW5kZWZpbmVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYW4gZW50aXR5IGlzIGNsaWNrZWQsIGVtaXQgYW4gZXZlbnRcclxuICAgKiBAcGFyYW0gZW50aXR5IEVudGl0eVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uUm93Q2xpY2soZW50aXR5OiBvYmplY3QpIHtcclxuICAgIHRoaXMuZW50aXR5Q2xpY2suZW1pdChlbnRpdHkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhbiBlbnRpdHkgaXMgc2VsZWN0ZWQsIHNlbGVjdCBpdCBpbiB0aGUgc3RvcmUgYW5kIGVtaXQgYW4gZXZlbnQuIEV2ZW4gaWZcclxuICAgKiBcIm1hbnlcIiBpcyBzZXQgdG8gdHJ1ZSwgdGhpcyBtZXRob2QgYWx3YXlzIHNlbGVjdCBhIHNpbmdsZSwgZXhjbHVzaXZlIHJvdy4gU2VsZWN0aW5nXHJcbiAgICogbXVsdGlwbGUgcm93cyBzaG91bGQgYmUgYWNoaWV2ZWQgYnkgdXNpbmcgdGhlIGNoZWNrYm94ZXMuXHJcbiAgICogQHBhcmFtIGVudGl0eSBFbnRpdHlcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblJvd1NlbGVjdChlbnRpdHk6IG9iamVjdCkge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uID09PSBmYWxzZSkgeyByZXR1cm47IH1cclxuXHJcbiAgICAvLyBTZWxlY3RpbmcgYVxyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUoZW50aXR5LCB7c2VsZWN0ZWQ6IHRydWV9LCB0cnVlKTtcclxuICAgIHRoaXMuZW50aXR5U2VsZWN0Q2hhbmdlLmVtaXQoe2FkZGVkOiBbZW50aXR5XX0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0IG9yIHVuc2VsZWN0IGFsbCByb3dzIGF0IG9uY2UuIE9uIHNlbGVjdCwgZW1pdCBhbiBldmVudC5cclxuICAgKiBAcGFyYW0gdG9nZ2xlIFNlbGVjdCBvciB1bnNlbGVjdFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uVG9nZ2xlUm93cyh0b2dnbGU6IGJvb2xlYW4pIHtcclxuICAgIGlmICh0aGlzLnNlbGVjdGlvbiA9PT0gZmFsc2UpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGVBbGwoe3NlbGVjdGVkOiB0b2dnbGV9KTtcclxuICAgIGlmICh0b2dnbGUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5lbnRpdHlTZWxlY3RDaGFuZ2UuZW1pdCh7YWRkZWQ6IFt0aGlzLnN0b3JlLnZpZXcuYWxsKCldfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGFuIGVudGl0eSBpcyB0b2dnbGVkLCBzZWxlY3Qgb3IgdW5zZWxlY3QgaXQgaW4gdGhlIHN0b3JlLiBPbiBzZWxlY3QsXHJcbiAgICogZW1pdCBhbiBldmVudC5cclxuICAgKiBAcGFyYW0gdG9nZ2xlIFNlbGVjdCBvciB1bnNlbGVjdFxyXG4gICAqIEBwYXJhbSBlbnRpdHkgRW50aXR5XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25Ub2dnbGVSb3codG9nZ2xlOiBib29sZWFuLCBlbnRpdHk6IG9iamVjdCkge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uID09PSBmYWxzZSkgeyByZXR1cm47IH1cclxuXHJcbiAgICBjb25zdCBleGNsdXNpdmUgPSB0b2dnbGUgPT09IHRydWUgJiYgIXRoaXMuc2VsZWN0TWFueTtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlKGVudGl0eSwge3NlbGVjdGVkOiB0b2dnbGV9LCBleGNsdXNpdmUpO1xyXG4gICAgaWYgKHRvZ2dsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmVudGl0eVNlbGVjdENoYW5nZS5lbWl0KHthZGRlZDogW2VudGl0eV19KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIHNlbGVjdGlvbiBzdGF0ZVxyXG4gICAqIEByZXR1cm5zIFdoZXRoZXIgYWxsLCBzb21lIG9yIG5vIHJvd3MgYXJlIHNlbGVjdGVkXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21wdXRlU2VsZWN0aW9uU3RhdGUoc2VsZWN0ZWRSZWNvcmRzOiBFbnRpdHlSZWNvcmQ8b2JqZWN0PltdKTogRW50aXR5VGFibGVTZWxlY3Rpb25TdGF0ZSB7XHJcbiAgICBjb25zdCBzdGF0ZXMgPSBFbnRpdHlUYWJsZVNlbGVjdGlvblN0YXRlO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uQ291bnQgPSBzZWxlY3RlZFJlY29yZHMubGVuZ3RoO1xyXG4gICAgcmV0dXJuIHNlbGVjdGlvbkNvdW50ID09PSAwID9cclxuICAgICAgc3RhdGVzLk5vbmUgOlxyXG4gICAgICAoc2VsZWN0aW9uQ291bnQgPT09IHRoaXMuc3RvcmUudmlldy5jb3VudCA/IHN0YXRlcy5BbGwgOiBzdGF0ZXMuU29tZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgY29sdW1uIGlzIHNvcnRhYmxlXHJcbiAgICogQHBhcmFtIGNvbHVtbiBDb2x1bW5cclxuICAgKiBAcmV0dXJucyBUcnVlIGlmIGEgY29sdW1uIGlzIHNvcnRhYmxlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgY29sdW1uSXNTb3J0YWJsZShjb2x1bW46IEVudGl0eVRhYmxlQ29sdW1uKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgc29ydGFibGUgPSBjb2x1bW4uc29ydDtcclxuICAgIGlmIChzb3J0YWJsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHNvcnRhYmxlID0gdGhpcy50ZW1wbGF0ZS5zb3J0ID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IHRoaXMudGVtcGxhdGUuc29ydDtcclxuICAgIH1cclxuICAgIHJldHVybiBzb3J0YWJsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYSByb3cgaXMgc2hvdWxkIGJlIHNlbGVjdGVkIGJhc2VkIG9uIHRoZSB1bmRlcmx5aW5nIGVudGl0eSBzdGF0ZVxyXG4gICAqIEBwYXJhbSBlbnRpdHkgRW50aXR5XHJcbiAgICogQHJldHVybnMgVHJ1ZSBpZiBhIHJvdyBzaG91bGQgYmUgc2VsZWN0ZWRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICByb3dJc1NlbGVjdGVkKGVudGl0eTogb2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RvcmUuc3RhdGUuZ2V0KGVudGl0eSk7XHJcbiAgICByZXR1cm4gc3RhdGUuc2VsZWN0ZWQgPyBzdGF0ZS5zZWxlY3RlZCA6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIGFjY2VzcyBhbiBlbnRpdHkncyB2YWx1ZXNcclxuICAgKiBAcGFyYW0gZW50aXR5IEVudGl0eVxyXG4gICAqIEBwYXJhbSBjb2x1bW4gQ29sdW1uXHJcbiAgICogQHJldHVybnMgQW55IHZhbHVlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0VmFsdWUoZW50aXR5OiBvYmplY3QsIGNvbHVtbjogRW50aXR5VGFibGVDb2x1bW4pOiBhbnkge1xyXG4gICAgaWYgKGNvbHVtbi52YWx1ZUFjY2Vzc29yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIGNvbHVtbi52YWx1ZUFjY2Vzc29yKGVudGl0eSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy50ZW1wbGF0ZS52YWx1ZUFjY2Vzc29yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGUudmFsdWVBY2Nlc3NvcihlbnRpdHksIGNvbHVtbi5uYW1lKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFByb3BlcnR5KGVudGl0eSwgY29sdW1uLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSB0eXBlIG9mIHJlbmRlcmVyIG9mIGEgY29sdW1uXHJcbiAgICogQHBhcmFtIGNvbHVtbiBDb2x1bW5cclxuICAgKiBAcmV0dXJucyBSZW5kZXJlciB0eXBlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0Q29sdW1uUmVuZGVyZXIoY29sdW1uOiBFbnRpdHlUYWJsZUNvbHVtbik6IEVudGl0eVRhYmxlQ29sdW1uUmVuZGVyZXIge1xyXG4gICAgaWYgKGNvbHVtbi5yZW5kZXJlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBjb2x1bW4ucmVuZGVyZXI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW50aXR5VGFibGVDb2x1bW5SZW5kZXJlci5EZWZhdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSB0YWJsZSBuZ0NsYXNzXHJcbiAgICogQHJldHVybnMgbmdDbGFzc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldFRhYmxlQ2xhc3MoKToge1trZXk6IHN0cmluZ106IGJvb2xlYW59IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICdpZ28tZW50aXR5LXRhYmxlLXdpdGgtc2VsZWN0aW9uJzogdGhpcy5zZWxlY3Rpb25cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gYSBoZWFkZXIgbmdDbGFzc1xyXG4gICAqIEByZXR1cm5zIG5nQ2xhc3NcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXRIZWFkZXJDbGFzcygpOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0ge1xyXG4gICAgY29uc3QgZnVuYyA9IHRoaXMudGVtcGxhdGUuaGVhZGVyQ2xhc3NGdW5jO1xyXG4gICAgaWYgKGZ1bmMgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICByZXR1cm4gZnVuYygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGEgcm93IG5nQ2xhc3NcclxuICAgKiBAcGFyYW0gZW50aXR5IEVudGl0eVxyXG4gICAqIEByZXR1cm5zIG5nQ2xhc3NcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXRSb3dDbGFzcyhlbnRpdHk6IG9iamVjdCk6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSB7XHJcbiAgICBjb25zdCBmdW5jID0gdGhpcy50ZW1wbGF0ZS5yb3dDbGFzc0Z1bmM7XHJcbiAgICBpZiAoZnVuYyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIHJldHVybiBmdW5jKGVudGl0eSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gYSByb3cgbmdDbGFzc1xyXG4gICAqIEBwYXJhbSBlbnRpdHkgRW50aXR5XHJcbiAgICogQHBhcmFtIGNvbHVtbiBDb2x1bW5cclxuICAgKiBAcmV0dXJucyBuZ0NsYXNzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0Q2VsbENsYXNzKGVudGl0eTogb2JqZWN0LCBjb2x1bW46IEVudGl0eVRhYmxlQ29sdW1uKToge1trZXk6IHN0cmluZ106IGJvb2xlYW59IHtcclxuICAgIGNvbnN0IGNscyA9IHt9O1xyXG5cclxuICAgIGNvbnN0IHRhYmxlRnVuYyA9IHRoaXMudGVtcGxhdGUuY2VsbENsYXNzRnVuYztcclxuICAgIGlmICh0YWJsZUZ1bmMgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICBPYmplY3QuYXNzaWduKGNscywgdGFibGVGdW5jKGVudGl0eSwgY29sdW1uKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29sdW1uRnVuYyA9IGNvbHVtbi5jZWxsQ2xhc3NGdW5jO1xyXG4gICAgaWYgKGNvbHVtbkZ1bmMgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICBPYmplY3QuYXNzaWduKGNscywgY29sdW1uRnVuYyhlbnRpdHkpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2xzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgICogQHBhcmFtIGZ1bmMgRnVuY3Rpb25cclxuICAgKiBAcGFyYW0gZW50aXR5IEVudGl0eVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uQnV0dG9uQ2xpY2soY2xpY2tGdW5jOiAoZW50aXR5OiBvYmplY3QpID0+IHZvaWQsIGVudGl0eTogb2JqZWN0KSB7XHJcbiAgICBpZiAodHlwZW9mIGNsaWNrRnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBjbGlja0Z1bmMoZW50aXR5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiJdfQ==