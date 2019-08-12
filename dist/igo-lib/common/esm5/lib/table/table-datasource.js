/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObjectUtils } from '@igo2/utils';
var TableDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(TableDataSource, _super);
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
        function (filter) {
            this._filterChange.next(filter);
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
        return merge.apply(void 0, tslib_1.__spread(displayDataChanges)).pipe(map((/**
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
export { TableDataSource };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS90YWJsZS1kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR2hELE9BQU8sRUFBYyxlQUFlLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSTFDO0lBQXFDLDJDQUFlO0lBU2xELHlCQUNVLFNBQXdCLEVBQ3hCLE1BQWtCLEVBQ2xCLEtBQWM7UUFIeEIsWUFLRSxpQkFBTyxTQUNSO1FBTFMsZUFBUyxHQUFULFNBQVMsQ0FBZTtRQUN4QixZQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLFdBQUssR0FBTCxLQUFLLENBQVM7UUFMaEIsbUJBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7SUFRaEQsQ0FBQztJQWRELHNCQUFJLG1DQUFNOzs7O1FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ2xDLENBQUM7Ozs7O1FBQ0QsVUFBVyxNQUFjO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLENBQUM7OztPQUhBO0lBY0QseUVBQXlFO0lBQ3pFLHNCQUFzQjs7Ozs7O0lBQ3RCLGlDQUFPOzs7Ozs7SUFBUDtRQUFBLGlCQWtCQztRQWpCQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsQjs7WUFDSyxrQkFBa0IsR0FBRztZQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVU7WUFDekIsSUFBSSxDQUFDLGFBQWE7WUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO1NBQ3RCO1FBRUQsT0FBTyxLQUFLLGdDQUFJLGtCQUFrQixHQUFFLElBQUksQ0FDdEMsR0FBRzs7O1FBQUM7WUFDRixPQUFPLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDLEVBQUMsRUFDRixHQUFHOzs7O1FBQUMsVUFBQSxJQUFJO1lBQ04sT0FBTyxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7O0lBRUQsb0NBQVU7OztJQUFWLGNBQWMsQ0FBQzs7Ozs7SUFFZix5Q0FBZTs7OztJQUFmLFVBQWdCLElBQUk7UUFBcEIsaUJBYUM7UUFaQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTTs7OztRQUFDLFVBQUMsSUFBUzs7Z0JBQzdCLFNBQVMsR0FBVyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87aUJBQzFDLE1BQU07Ozs7WUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxVQUFVLEVBQVosQ0FBWSxFQUFDO2lCQUN6QixHQUFHOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQWpDLENBQWlDLEVBQUM7aUJBQzNDLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ1QsV0FBVyxFQUFFO1lBRWhCLE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELHVDQUFhOzs7O0lBQWIsVUFBYyxJQUFJO1FBQWxCLGlCQXFCQztRQXBCQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssRUFBRSxFQUFFO1lBQ3JELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJOzs7OztRQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7O2dCQUNkLFNBQVMsR0FBb0IsV0FBVyxDQUFDLE9BQU8sQ0FDcEQsQ0FBQyxFQUNELEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUNsQjs7Z0JBQ0ssU0FBUyxHQUFvQixXQUFXLENBQUMsT0FBTyxDQUNwRCxDQUFDLEVBQ0QsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQ2xCO1lBRUQsT0FBTyxXQUFXLENBQUMsY0FBYyxDQUMvQixTQUFTLEVBQ1QsU0FBUyxFQUNULEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUNyQixDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBOUVELENBQXFDLFVBQVUsR0E4RTlDOzs7Ozs7O0lBdkVDLHdDQUFnRDs7Ozs7SUFHOUMsb0NBQWdDOzs7OztJQUNoQyxpQ0FBMEI7Ozs7O0lBQzFCLGdDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xyXG5pbXBvcnQgeyBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IFRhYmxlRGF0YWJhc2UsIFRhYmxlTW9kZWwgfSBmcm9tICcuL2luZGV4JztcclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZURhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlPGFueT4ge1xyXG4gIGdldCBmaWx0ZXIoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9maWx0ZXJDaGFuZ2UudmFsdWU7XHJcbiAgfVxyXG4gIHNldCBmaWx0ZXIoZmlsdGVyOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2ZpbHRlckNoYW5nZS5uZXh0KGZpbHRlcik7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2ZpbHRlckNoYW5nZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoJycpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2RhdGFiYXNlOiBUYWJsZURhdGFiYXNlLFxyXG4gICAgcHJpdmF0ZSBfbW9kZWw6IFRhYmxlTW9kZWwsXHJcbiAgICBwcml2YXRlIF9zb3J0OiBNYXRTb3J0XHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ29ubmVjdCBmdW5jdGlvbiBjYWxsZWQgYnkgdGhlIHRhYmxlIHRvIHJldHJpZXZlIG9uZSBzdHJlYW0gY29udGFpbmluZ1xyXG4gIC8vIHRoZSBkYXRhIHRvIHJlbmRlci5cclxuICBjb25uZWN0KCk6IE9ic2VydmFibGU8YW55W10+IHtcclxuICAgIGlmICghdGhpcy5fZGF0YWJhc2UpIHtcclxuICAgICAgcmV0dXJuIG1lcmdlKFtdKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGRpc3BsYXlEYXRhQ2hhbmdlcyA9IFtcclxuICAgICAgdGhpcy5fZGF0YWJhc2UuZGF0YUNoYW5nZSxcclxuICAgICAgdGhpcy5fZmlsdGVyQ2hhbmdlLFxyXG4gICAgICB0aGlzLl9zb3J0LnNvcnRDaGFuZ2VcclxuICAgIF07XHJcblxyXG4gICAgcmV0dXJuIG1lcmdlKC4uLmRpc3BsYXlEYXRhQ2hhbmdlcykucGlwZShcclxuICAgICAgbWFwKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWx0ZXJlZERhdGEodGhpcy5fZGF0YWJhc2UuZGF0YSk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBtYXAoZGF0YSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U29ydGVkRGF0YShkYXRhKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBkaXNjb25uZWN0KCkge31cclxuXHJcbiAgZ2V0RmlsdGVyZWREYXRhKGRhdGEpOiBhbnlbXSB7XHJcbiAgICBpZiAoIXRoaXMuZmlsdGVyKSB7XHJcbiAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGEuc2xpY2UoKS5maWx0ZXIoKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBzZWFyY2hTdHI6IHN0cmluZyA9IHRoaXMuX21vZGVsLmNvbHVtbnNcclxuICAgICAgICAuZmlsdGVyKGMgPT4gYy5maWx0ZXJhYmxlKVxyXG4gICAgICAgIC5tYXAoYyA9PiBPYmplY3RVdGlscy5yZXNvbHZlKGl0ZW0sIGMubmFtZSkpXHJcbiAgICAgICAgLmpvaW4oJyAnKVxyXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgcmV0dXJuIHNlYXJjaFN0ci5pbmRleE9mKHRoaXMuZmlsdGVyLnRvTG93ZXJDYXNlKCkpICE9PSAtMTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U29ydGVkRGF0YShkYXRhKTogYW55W10ge1xyXG4gICAgaWYgKCF0aGlzLl9zb3J0LmFjdGl2ZSB8fCB0aGlzLl9zb3J0LmRpcmVjdGlvbiA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGEuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBjb25zdCBwcm9wZXJ0eUE6IG51bWJlciB8IHN0cmluZyA9IE9iamVjdFV0aWxzLnJlc29sdmUoXHJcbiAgICAgICAgYSxcclxuICAgICAgICB0aGlzLl9zb3J0LmFjdGl2ZVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBwcm9wZXJ0eUI6IG51bWJlciB8IHN0cmluZyA9IE9iamVjdFV0aWxzLnJlc29sdmUoXHJcbiAgICAgICAgYixcclxuICAgICAgICB0aGlzLl9zb3J0LmFjdGl2ZVxyXG4gICAgICApO1xyXG5cclxuICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLm5hdHVyYWxDb21wYXJlKFxyXG4gICAgICAgIHByb3BlcnR5QixcclxuICAgICAgICBwcm9wZXJ0eUEsXHJcbiAgICAgICAgdGhpcy5fc29ydC5kaXJlY3Rpb25cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=