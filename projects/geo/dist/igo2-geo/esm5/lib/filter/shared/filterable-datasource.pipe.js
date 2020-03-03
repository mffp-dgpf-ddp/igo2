/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var FilterableDataSourcePipe = /** @class */ (function () {
    function FilterableDataSourcePipe() {
    }
    /**
     * @param {?} value
     * @param {?} arg
     * @return {?}
     */
    FilterableDataSourcePipe.prototype.transform = /**
     * @param {?} value
     * @param {?} arg
     * @return {?}
     */
    function (value, arg) {
        var _this = this;
        /** @type {?} */
        var layers;
        if (arg === 'time') {
            layers = value.filter((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) {
                /** @type {?} */
                var datasource = (/** @type {?} */ (layer.dataSource));
                return (_this.isTimeFilterable(datasource) &&
                    datasource.options.timeFilter !== undefined &&
                    Object.keys(datasource.options.timeFilter).length);
            }));
        }
        if (arg === 'ogc') {
            layers = value.filter((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) {
                /** @type {?} */
                var datasource = (/** @type {?} */ (layer.dataSource));
                return _this.isOgcFilterable(datasource);
            }));
        }
        return layers;
    };
    /**
     * @private
     * @param {?} dataSource
     * @return {?}
     */
    FilterableDataSourcePipe.prototype.isTimeFilterable = /**
     * @private
     * @param {?} dataSource
     * @return {?}
     */
    function (dataSource) {
        if (dataSource.options.type !== 'wms') {
            return false;
        }
        return dataSource.options.timeFilterable;
    };
    /**
     * @private
     * @param {?} dataSource
     * @return {?}
     */
    FilterableDataSourcePipe.prototype.isOgcFilterable = /**
     * @private
     * @param {?} dataSource
     * @return {?}
     */
    function (dataSource) {
        /** @type {?} */
        var isOgcFilterable = false;
        if (dataSource.options.ogcFilters &&
            dataSource.options.ogcFilters.enabled &&
            dataSource.options.ogcFilters.editable) {
            isOgcFilterable = true;
        }
        if (dataSource.options.ogcFilters &&
            dataSource.options.ogcFilters.enabled &&
            dataSource.options.ogcFilters.pushButtons) {
            isOgcFilterable = true;
        }
        return isOgcFilterable;
    };
    FilterableDataSourcePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'filterableDataSource'
                },] }
    ];
    return FilterableDataSourcePipe;
}());
export { FilterableDataSourcePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyYWJsZS1kYXRhc291cmNlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3NoYXJlZC9maWx0ZXJhYmxlLWRhdGFzb3VyY2UucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFRcEQ7SUFBQTtJQWtEQSxDQUFDOzs7Ozs7SUE5Q0MsNENBQVM7Ozs7O0lBQVQsVUFBVSxLQUFjLEVBQUUsR0FBVztRQUFyQyxpQkFvQkM7O1lBbkJLLE1BQU07UUFFVixJQUFJLEdBQUcsS0FBSyxNQUFNLEVBQUU7WUFDbEIsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQyxLQUFZOztvQkFDM0IsVUFBVSxHQUFHLG1CQUFBLEtBQUssQ0FBQyxVQUFVLEVBQTRCO2dCQUMvRCxPQUFPLENBQ0wsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztvQkFDakMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUztvQkFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FDbEQsQ0FBQztZQUNKLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLEdBQUcsS0FBSyxLQUFLLEVBQUU7WUFDakIsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQyxLQUFZOztvQkFDM0IsVUFBVSxHQUFHLG1CQUFBLEtBQUssQ0FBQyxVQUFVLEVBQTJCO2dCQUM5RCxPQUFPLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Ozs7OztJQUVPLG1EQUFnQjs7Ozs7SUFBeEIsVUFBeUIsVUFBb0M7UUFDM0QsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDckMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBRU8sa0RBQWU7Ozs7O0lBQXZCLFVBQXdCLFVBQW1DOztZQUNyRCxlQUFlLEdBQUcsS0FBSztRQUMzQixJQUNFLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVTtZQUM3QixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPO1lBQ3JDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFDdEM7WUFDQSxlQUFlLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO1FBQ0QsSUFDRSxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVU7WUFDN0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTztZQUNyQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDekMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUMxQjtRQUNELE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7O2dCQWpERixJQUFJLFNBQUM7b0JBQ0osSUFBSSxFQUFFLHNCQUFzQjtpQkFDN0I7O0lBZ0RELCtCQUFDO0NBQUEsQUFsREQsSUFrREM7U0EvQ1ksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2RhdGFzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZURhdGFTb3VyY2UgfSBmcm9tICcuL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGltZUZpbHRlcmFibGVEYXRhU291cmNlIH0gZnJvbSAnLi90aW1lLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdmaWx0ZXJhYmxlRGF0YVNvdXJjZSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZpbHRlcmFibGVEYXRhU291cmNlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybSh2YWx1ZTogTGF5ZXJbXSwgYXJnOiBzdHJpbmcpOiBMYXllcltdIHtcclxuICAgIGxldCBsYXllcnM7XHJcblxyXG4gICAgaWYgKGFyZyA9PT0gJ3RpbWUnKSB7XHJcbiAgICAgIGxheWVycyA9IHZhbHVlLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YXNvdXJjZSA9IGxheWVyLmRhdGFTb3VyY2UgYXMgVGltZUZpbHRlcmFibGVEYXRhU291cmNlO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICB0aGlzLmlzVGltZUZpbHRlcmFibGUoZGF0YXNvdXJjZSkgJiZcclxuICAgICAgICAgIGRhdGFzb3VyY2Uub3B0aW9ucy50aW1lRmlsdGVyICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgIE9iamVjdC5rZXlzKGRhdGFzb3VyY2Uub3B0aW9ucy50aW1lRmlsdGVyKS5sZW5ndGhcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChhcmcgPT09ICdvZ2MnKSB7XHJcbiAgICAgIGxheWVycyA9IHZhbHVlLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YXNvdXJjZSA9IGxheWVyLmRhdGFTb3VyY2UgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2U7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNPZ2NGaWx0ZXJhYmxlKGRhdGFzb3VyY2UpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBsYXllcnM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzVGltZUZpbHRlcmFibGUoZGF0YVNvdXJjZTogVGltZUZpbHRlcmFibGVEYXRhU291cmNlKSB7XHJcbiAgICBpZiAoZGF0YVNvdXJjZS5vcHRpb25zLnR5cGUgIT09ICd3bXMnKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBkYXRhU291cmNlLm9wdGlvbnMudGltZUZpbHRlcmFibGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzT2djRmlsdGVyYWJsZShkYXRhU291cmNlOiBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGlzT2djRmlsdGVyYWJsZSA9IGZhbHNlO1xyXG4gICAgaWYgKFxyXG4gICAgICBkYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycyAmJlxyXG4gICAgICBkYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycy5lbmFibGVkICYmXHJcbiAgICAgIGRhdGFTb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmVkaXRhYmxlXHJcbiAgICApIHtcclxuICAgICAgaXNPZ2NGaWx0ZXJhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgZGF0YVNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMgJiZcclxuICAgICAgZGF0YVNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuZW5hYmxlZCAmJlxyXG4gICAgICBkYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycy5wdXNoQnV0dG9ucykge1xyXG4gICAgICAgIGlzT2djRmlsdGVyYWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNPZ2NGaWx0ZXJhYmxlO1xyXG4gIH1cclxufVxyXG4iXX0=