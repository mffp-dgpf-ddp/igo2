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
export class TableComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3RhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBSU4sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFakMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUcxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBTzdELE1BQU0sT0FBTyxjQUFjO0lBTDNCO1FBK0JVLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBSXhCLGNBQVMsR0FBRyxJQUFJLGNBQWMsQ0FBTSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFHckQsV0FBTSxHQUFHLElBQUksWUFBWSxFQUlyQixDQUFDO0lBNkVQLENBQUM7Ozs7SUFqSEMsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBb0I7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7OztJQUdELElBQ0ksS0FB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QUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNO1FBQ3pDLE9BQU8sV0FBVyxLQUFLLE9BQU8sQ0FBQztJQUNqQyxDQUFDOzs7OztJQUdELFlBQVk7UUFDVixJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTtZQUN4QixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTzs7OztZQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQztJQUNwRSxDQUFDOzs7Ozs7O0lBRUQsaUJBQWlCLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHO1FBQ2xDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7OztZQXRIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLHMvRkFBcUM7O2FBRXRDOzs7dUJBRUUsS0FBSztvQkFTTCxLQUFLOzZCQVNMLEtBQUs7cUJBYUwsTUFBTTtxQkFPTixTQUFTLFNBQUMsUUFBUTttQkFDbEIsU0FBUyxTQUFDLE9BQU87Ozs7Ozs7SUFoQ2xCLG1DQUFpQzs7Ozs7SUFTakMsZ0NBQTJCOzs7OztJQVMzQix5Q0FBK0I7O0lBRS9CLDBDQUF3Qjs7SUFDeEIsb0NBQTBDOztJQUMxQyxtQ0FBcUQ7O0lBRXJELGdDQUtLOztJQUVMLGdDQUF3Qzs7SUFDeEMsOEJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0U29ydCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IFRhYmxlTW9kZWwgfSBmcm9tICcuL3RhYmxlLW1vZGVsLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRhYmxlRGF0YWJhc2UgfSBmcm9tICcuL3RhYmxlLWRhdGFiYXNlJztcclxuaW1wb3J0IHsgVGFibGVEYXRhU291cmNlIH0gZnJvbSAnLi90YWJsZS1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgVGFibGVBY3Rpb25Db2xvciB9IGZyb20gJy4vdGFibGUtYWN0aW9uLWNvbG9yLmVudW0nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tdGFibGUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgZGF0YWJhc2UoKTogVGFibGVEYXRhYmFzZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YWJhc2U7XHJcbiAgfVxyXG4gIHNldCBkYXRhYmFzZSh2YWx1ZTogVGFibGVEYXRhYmFzZSkge1xyXG4gICAgdGhpcy5fZGF0YWJhc2UgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGF0YWJhc2U6IFRhYmxlRGF0YWJhc2U7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1vZGVsKCk6IFRhYmxlTW9kZWwge1xyXG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xyXG4gIH1cclxuICBzZXQgbW9kZWwodmFsdWU6IFRhYmxlTW9kZWwpIHtcclxuICAgIHRoaXMuX21vZGVsID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21vZGVsOiBUYWJsZU1vZGVsO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBoYXNGaWx0ZXJJbnB1dCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9oYXNGSWx0ZXJJbnB1dDtcclxuICB9XHJcbiAgc2V0IGhhc0ZpbHRlcklucHV0KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9oYXNGSWx0ZXJJbnB1dCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9oYXNGSWx0ZXJJbnB1dCA9IHRydWU7XHJcblxyXG4gIHB1YmxpYyBkaXNwbGF5ZWRDb2x1bW5zO1xyXG4gIHB1YmxpYyBkYXRhU291cmNlOiBUYWJsZURhdGFTb3VyY2UgfCBudWxsO1xyXG4gIHB1YmxpYyBzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uTW9kZWw8YW55Pih0cnVlLCBbXSk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgYWRkZWQ6IGFueVtdO1xyXG4gICAgcmVtb3ZlZDogYW55W107XHJcbiAgICBzb3VyY2U6IFNlbGVjdGlvbk1vZGVsPGFueT47XHJcbiAgfT4oKTtcclxuXHJcbiAgQFZpZXdDaGlsZCgnZmlsdGVyJykgZmlsdGVyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydDogTWF0U29ydDtcclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmRhdGFTb3VyY2UgPSBuZXcgVGFibGVEYXRhU291cmNlKHRoaXMuZGF0YWJhc2UsIHRoaXMubW9kZWwsIHRoaXMuc29ydCk7XHJcblxyXG4gICAgaWYgKHRoaXMubW9kZWwpIHtcclxuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zID0gdGhpcy5tb2RlbC5jb2x1bW5zXHJcbiAgICAgICAgLmZpbHRlcihjID0+IGMuZGlzcGxheWVkICE9PSBmYWxzZSlcclxuICAgICAgICAubWFwKGMgPT4gYy5uYW1lKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLm1vZGVsLnNlbGVjdGlvbkNoZWNrYm94KSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLnVuc2hpZnQoJ3NlbGVjdGlvbkNoZWNrYm94Jyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMubW9kZWwuYWN0aW9ucyAmJiB0aGlzLm1vZGVsLmFjdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLnB1c2goJ2FjdGlvbicpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWxlY3Rpb24uY2hhbmdlZC5zdWJzY3JpYmUoZSA9PiB0aGlzLnNlbGVjdC5lbWl0KGUpKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmZpbHRlcikge1xyXG4gICAgICBmcm9tRXZlbnQodGhpcy5maWx0ZXIubmF0aXZlRWxlbWVudCwgJ2tleXVwJylcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIGRlYm91bmNlVGltZSgxNTApLFxyXG4gICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxyXG4gICAgICAgIClcclxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIGlmICghdGhpcy5kYXRhU291cmNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5maWx0ZXIgPSB0aGlzLmZpbHRlci5uYXRpdmVFbGVtZW50LnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlKSB7XHJcbiAgICBpZiAoY2hhbmdlLmRhdGFiYXNlKSB7XHJcbiAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBUYWJsZURhdGFTb3VyY2UoXHJcbiAgICAgICAgdGhpcy5kYXRhYmFzZSxcclxuICAgICAgICB0aGlzLm1vZGVsLFxyXG4gICAgICAgIHRoaXMuc29ydFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0QWN0aW9uQ29sb3IoY29sb3JJZDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBUYWJsZUFjdGlvbkNvbG9yW2NvbG9ySWRdO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmFsdWUocm93LCBrZXkpIHtcclxuICAgIHJldHVybiBPYmplY3RVdGlscy5yZXNvbHZlKHJvdywga2V5KTtcclxuICB9XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBudW1iZXIgb2Ygc2VsZWN0ZWQgZWxlbWVudHMgbWF0Y2hlcyB0aGUgdG90YWwgbnVtYmVyIG9mIHJvd3MuICovXHJcbiAgaXNBbGxTZWxlY3RlZCgpIHtcclxuICAgIGNvbnN0IG51bVNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoO1xyXG4gICAgY29uc3QgbnVtUm93cyA9IHRoaXMuZGF0YWJhc2UuZGF0YS5sZW5ndGg7XHJcbiAgICByZXR1cm4gbnVtU2VsZWN0ZWQgPT09IG51bVJvd3M7XHJcbiAgfVxyXG5cclxuICAvKiogU2VsZWN0cyBhbGwgcm93cyBpZiB0aGV5IGFyZSBub3QgYWxsIHNlbGVjdGVkOyBvdGhlcndpc2UgY2xlYXIgc2VsZWN0aW9uLiAqL1xyXG4gIG1hc3RlclRvZ2dsZSgpIHtcclxuICAgIHRoaXMuaXNBbGxTZWxlY3RlZCgpXHJcbiAgICAgID8gdGhpcy5zZWxlY3Rpb24uY2xlYXIoKVxyXG4gICAgICA6IHRoaXMuZGF0YWJhc2UuZGF0YS5mb3JFYWNoKHJvdyA9PiB0aGlzLnNlbGVjdGlvbi5zZWxlY3Qocm93KSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVDbGlja0FjdGlvbihldmVudCwgYWN0aW9uLCByb3cpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgYWN0aW9uLmNsaWNrKHJvdyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==