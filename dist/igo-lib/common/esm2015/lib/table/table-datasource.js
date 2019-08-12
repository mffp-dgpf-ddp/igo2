/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObjectUtils } from '@igo2/utils';
export class TableDataSource extends DataSource {
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
    set filter(filter) {
        this._filterChange.next(filter);
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    TableDataSource.prototype._filterChange;
    /**
     * @type {?}
     * @private
     */
    TableDataSource.prototype._database;
    /**
     * @type {?}
     * @private
     */
    TableDataSource.prototype._model;
    /**
     * @type {?}
     * @private
     */
    TableDataSource.prototype._sort;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS90YWJsZS1kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHaEQsT0FBTyxFQUFjLGVBQWUsRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFJMUMsTUFBTSxPQUFPLGVBQWdCLFNBQVEsVUFBZTs7Ozs7O0lBU2xELFlBQ1UsU0FBd0IsRUFDeEIsTUFBa0IsRUFDbEIsS0FBYztRQUV0QixLQUFLLEVBQUUsQ0FBQztRQUpBLGNBQVMsR0FBVCxTQUFTLENBQWU7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFTO1FBTGhCLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7SUFRaEQsQ0FBQzs7OztJQWRELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFjO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7OztJQWFELE9BQU87UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsQjs7Y0FDSyxrQkFBa0IsR0FBRztZQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVU7WUFDekIsSUFBSSxDQUFDLGFBQWE7WUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO1NBQ3RCO1FBRUQsT0FBTyxLQUFLLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FDdEMsR0FBRzs7O1FBQUMsR0FBRyxFQUFFO1lBQ1AsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxFQUFDLEVBQ0YsR0FBRzs7OztRQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7O0lBRUQsVUFBVSxLQUFJLENBQUM7Ozs7O0lBRWYsZUFBZSxDQUFDLElBQUk7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU07Ozs7UUFBQyxDQUFDLElBQVMsRUFBRSxFQUFFOztrQkFDakMsU0FBUyxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztpQkFDMUMsTUFBTTs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBQztpQkFDekIsR0FBRzs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDO2lCQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNULFdBQVcsRUFBRTtZQUVoQixPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsSUFBSTtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssRUFBRSxFQUFFO1lBQ3JELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJOzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztrQkFDbEIsU0FBUyxHQUFvQixXQUFXLENBQUMsT0FBTyxDQUNwRCxDQUFDLEVBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQ2xCOztrQkFDSyxTQUFTLEdBQW9CLFdBQVcsQ0FBQyxPQUFPLENBQ3BELENBQUMsRUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDbEI7WUFFRCxPQUFPLFdBQVcsQ0FBQyxjQUFjLENBQy9CLFNBQVMsRUFDVCxTQUFTLEVBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQ3JCLENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjs7Ozs7O0lBdkVDLHdDQUFnRDs7Ozs7SUFHOUMsb0NBQWdDOzs7OztJQUNoQyxpQ0FBMEI7Ozs7O0lBQzFCLGdDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xyXG5pbXBvcnQgeyBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IFRhYmxlRGF0YWJhc2UsIFRhYmxlTW9kZWwgfSBmcm9tICcuL2luZGV4JztcclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZURhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlPGFueT4ge1xyXG4gIGdldCBmaWx0ZXIoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9maWx0ZXJDaGFuZ2UudmFsdWU7XHJcbiAgfVxyXG4gIHNldCBmaWx0ZXIoZmlsdGVyOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2ZpbHRlckNoYW5nZS5uZXh0KGZpbHRlcik7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2ZpbHRlckNoYW5nZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoJycpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2RhdGFiYXNlOiBUYWJsZURhdGFiYXNlLFxyXG4gICAgcHJpdmF0ZSBfbW9kZWw6IFRhYmxlTW9kZWwsXHJcbiAgICBwcml2YXRlIF9zb3J0OiBNYXRTb3J0XHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ29ubmVjdCBmdW5jdGlvbiBjYWxsZWQgYnkgdGhlIHRhYmxlIHRvIHJldHJpZXZlIG9uZSBzdHJlYW0gY29udGFpbmluZ1xyXG4gIC8vIHRoZSBkYXRhIHRvIHJlbmRlci5cclxuICBjb25uZWN0KCk6IE9ic2VydmFibGU8YW55W10+IHtcclxuICAgIGlmICghdGhpcy5fZGF0YWJhc2UpIHtcclxuICAgICAgcmV0dXJuIG1lcmdlKFtdKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGRpc3BsYXlEYXRhQ2hhbmdlcyA9IFtcclxuICAgICAgdGhpcy5fZGF0YWJhc2UuZGF0YUNoYW5nZSxcclxuICAgICAgdGhpcy5fZmlsdGVyQ2hhbmdlLFxyXG4gICAgICB0aGlzLl9zb3J0LnNvcnRDaGFuZ2VcclxuICAgIF07XHJcblxyXG4gICAgcmV0dXJuIG1lcmdlKC4uLmRpc3BsYXlEYXRhQ2hhbmdlcykucGlwZShcclxuICAgICAgbWFwKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWx0ZXJlZERhdGEodGhpcy5fZGF0YWJhc2UuZGF0YSk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBtYXAoZGF0YSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U29ydGVkRGF0YShkYXRhKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBkaXNjb25uZWN0KCkge31cclxuXHJcbiAgZ2V0RmlsdGVyZWREYXRhKGRhdGEpOiBhbnlbXSB7XHJcbiAgICBpZiAoIXRoaXMuZmlsdGVyKSB7XHJcbiAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGEuc2xpY2UoKS5maWx0ZXIoKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBzZWFyY2hTdHI6IHN0cmluZyA9IHRoaXMuX21vZGVsLmNvbHVtbnNcclxuICAgICAgICAuZmlsdGVyKGMgPT4gYy5maWx0ZXJhYmxlKVxyXG4gICAgICAgIC5tYXAoYyA9PiBPYmplY3RVdGlscy5yZXNvbHZlKGl0ZW0sIGMubmFtZSkpXHJcbiAgICAgICAgLmpvaW4oJyAnKVxyXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgcmV0dXJuIHNlYXJjaFN0ci5pbmRleE9mKHRoaXMuZmlsdGVyLnRvTG93ZXJDYXNlKCkpICE9PSAtMTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U29ydGVkRGF0YShkYXRhKTogYW55W10ge1xyXG4gICAgaWYgKCF0aGlzLl9zb3J0LmFjdGl2ZSB8fCB0aGlzLl9zb3J0LmRpcmVjdGlvbiA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGEuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBjb25zdCBwcm9wZXJ0eUE6IG51bWJlciB8IHN0cmluZyA9IE9iamVjdFV0aWxzLnJlc29sdmUoXHJcbiAgICAgICAgYSxcclxuICAgICAgICB0aGlzLl9zb3J0LmFjdGl2ZVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBwcm9wZXJ0eUI6IG51bWJlciB8IHN0cmluZyA9IE9iamVjdFV0aWxzLnJlc29sdmUoXHJcbiAgICAgICAgYixcclxuICAgICAgICB0aGlzLl9zb3J0LmFjdGl2ZVxyXG4gICAgICApO1xyXG5cclxuICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLm5hdHVyYWxDb21wYXJlKFxyXG4gICAgICAgIHByb3BlcnR5QixcclxuICAgICAgICBwcm9wZXJ0eUEsXHJcbiAgICAgICAgdGhpcy5fc29ydC5kaXJlY3Rpb25cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=