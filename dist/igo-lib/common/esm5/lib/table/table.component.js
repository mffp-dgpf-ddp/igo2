/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ObjectUtils } from '@igo2/utils';
import { TableDatabase } from './table-database';
import { TableDataSource } from './table-datasource';
import { TableActionColor } from './table-action-color.enum';
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
export { TableComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TableComponent.prototype._database;
    /**
     * @type {?}
     * @private
     */
    TableComponent.prototype._model;
    /**
     * @type {?}
     * @private
     */
    TableComponent.prototype._hasFIlterInput;
    /** @type {?} */
    TableComponent.prototype.displayedColumns;
    /** @type {?} */
    TableComponent.prototype.dataSource;
    /** @type {?} */
    TableComponent.prototype.selection;
    /** @type {?} */
    TableComponent.prototype.select;
    /** @type {?} */
    TableComponent.prototype.filter;
    /** @type {?} */
    TableComponent.prototype.sort;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3RhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBSU4sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFakMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUcxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTdEO0lBQUE7UUErQlUsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFJeEIsY0FBUyxHQUFHLElBQUksY0FBYyxDQUFNLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUdyRCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBSXJCLENBQUM7SUE2RVAsQ0FBQztJQWpIQyxzQkFDSSxvQ0FBUTs7OztRQURaO1lBRUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7Ozs7O1FBQ0QsVUFBYSxLQUFvQjtZQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDOzs7T0FIQTtJQU1ELHNCQUNJLGlDQUFLOzs7O1FBRFQ7WUFF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O0lBRUwsZ0NBQXdDOztJQUN4Qyw4QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIFZpZXdDaGlsZCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uSW5pdCxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XHJcblxyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgVGFibGVNb2RlbCB9IGZyb20gJy4vdGFibGUtbW9kZWwuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGFibGVEYXRhYmFzZSB9IGZyb20gJy4vdGFibGUtZGF0YWJhc2UnO1xyXG5pbXBvcnQgeyBUYWJsZURhdGFTb3VyY2UgfSBmcm9tICcuL3RhYmxlLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBUYWJsZUFjdGlvbkNvbG9yIH0gZnJvbSAnLi90YWJsZS1hY3Rpb24tY29sb3IuZW51bSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby10YWJsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90YWJsZS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBkYXRhYmFzZSgpOiBUYWJsZURhdGFiYXNlIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhYmFzZTtcclxuICB9XHJcbiAgc2V0IGRhdGFiYXNlKHZhbHVlOiBUYWJsZURhdGFiYXNlKSB7XHJcbiAgICB0aGlzLl9kYXRhYmFzZSA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9kYXRhYmFzZTogVGFibGVEYXRhYmFzZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgbW9kZWwoKTogVGFibGVNb2RlbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbW9kZWw7XHJcbiAgfVxyXG4gIHNldCBtb2RlbCh2YWx1ZTogVGFibGVNb2RlbCkge1xyXG4gICAgdGhpcy5fbW9kZWwgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbW9kZWw6IFRhYmxlTW9kZWw7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGhhc0ZpbHRlcklucHV0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hhc0ZJbHRlcklucHV0O1xyXG4gIH1cclxuICBzZXQgaGFzRmlsdGVySW5wdXQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2hhc0ZJbHRlcklucHV0ID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2hhc0ZJbHRlcklucHV0ID0gdHJ1ZTtcclxuXHJcbiAgcHVibGljIGRpc3BsYXllZENvbHVtbnM7XHJcbiAgcHVibGljIGRhdGFTb3VyY2U6IFRhYmxlRGF0YVNvdXJjZSB8IG51bGw7XHJcbiAgcHVibGljIHNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxhbnk+KHRydWUsIFtdKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBhZGRlZDogYW55W107XHJcbiAgICByZW1vdmVkOiBhbnlbXTtcclxuICAgIHNvdXJjZTogU2VsZWN0aW9uTW9kZWw8YW55PjtcclxuICB9PigpO1xyXG5cclxuICBAVmlld0NoaWxkKCdmaWx0ZXInKSBmaWx0ZXI6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0OiBNYXRTb3J0O1xyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBUYWJsZURhdGFTb3VyY2UodGhpcy5kYXRhYmFzZSwgdGhpcy5tb2RlbCwgdGhpcy5zb3J0KTtcclxuXHJcbiAgICBpZiAodGhpcy5tb2RlbCkge1xyXG4gICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMgPSB0aGlzLm1vZGVsLmNvbHVtbnNcclxuICAgICAgICAuZmlsdGVyKGMgPT4gYy5kaXNwbGF5ZWQgIT09IGZhbHNlKVxyXG4gICAgICAgIC5tYXAoYyA9PiBjLm5hbWUpO1xyXG5cclxuICAgICAgaWYgKHRoaXMubW9kZWwuc2VsZWN0aW9uQ2hlY2tib3gpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMudW5zaGlmdCgnc2VsZWN0aW9uQ2hlY2tib3gnKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5tb2RlbC5hY3Rpb25zICYmIHRoaXMubW9kZWwuYWN0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMucHVzaCgnYWN0aW9uJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlbGVjdGlvbi5jaGFuZ2VkLnN1YnNjcmliZShlID0+IHRoaXMuc2VsZWN0LmVtaXQoZSkpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XHJcbiAgICAgIGZyb21FdmVudCh0aGlzLmZpbHRlci5uYXRpdmVFbGVtZW50LCAna2V5dXAnKVxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgZGVib3VuY2VUaW1lKDE1MCksXHJcbiAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKCF0aGlzLmRhdGFTb3VyY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5kYXRhU291cmNlLmZpbHRlciA9IHRoaXMuZmlsdGVyLm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2UpIHtcclxuICAgIGlmIChjaGFuZ2UuZGF0YWJhc2UpIHtcclxuICAgICAgdGhpcy5kYXRhU291cmNlID0gbmV3IFRhYmxlRGF0YVNvdXJjZShcclxuICAgICAgICB0aGlzLmRhdGFiYXNlLFxyXG4gICAgICAgIHRoaXMubW9kZWwsXHJcbiAgICAgICAgdGhpcy5zb3J0XHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRBY3Rpb25Db2xvcihjb2xvcklkOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFRhYmxlQWN0aW9uQ29sb3JbY29sb3JJZF07XHJcbiAgfVxyXG5cclxuICBnZXRWYWx1ZShyb3csIGtleSkge1xyXG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLnJlc29sdmUocm93LCBrZXkpO1xyXG4gIH1cclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIG51bWJlciBvZiBzZWxlY3RlZCBlbGVtZW50cyBtYXRjaGVzIHRoZSB0b3RhbCBudW1iZXIgb2Ygcm93cy4gKi9cclxuICBpc0FsbFNlbGVjdGVkKCkge1xyXG4gICAgY29uc3QgbnVtU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGg7XHJcbiAgICBjb25zdCBudW1Sb3dzID0gdGhpcy5kYXRhYmFzZS5kYXRhLmxlbmd0aDtcclxuICAgIHJldHVybiBudW1TZWxlY3RlZCA9PT0gbnVtUm93cztcclxuICB9XHJcblxyXG4gIC8qKiBTZWxlY3RzIGFsbCByb3dzIGlmIHRoZXkgYXJlIG5vdCBhbGwgc2VsZWN0ZWQ7IG90aGVyd2lzZSBjbGVhciBzZWxlY3Rpb24uICovXHJcbiAgbWFzdGVyVG9nZ2xlKCkge1xyXG4gICAgdGhpcy5pc0FsbFNlbGVjdGVkKClcclxuICAgICAgPyB0aGlzLnNlbGVjdGlvbi5jbGVhcigpXHJcbiAgICAgIDogdGhpcy5kYXRhYmFzZS5kYXRhLmZvckVhY2gocm93ID0+IHRoaXMuc2VsZWN0aW9uLnNlbGVjdChyb3cpKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUNsaWNrQWN0aW9uKGV2ZW50LCBhY3Rpb24sIHJvdykge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBhY3Rpb24uY2xpY2socm93KTtcclxuICB9XHJcbn1cclxuIl19