/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
export class FilterableDataSourcePipe {
    /**
     * @param {?} value
     * @param {?} arg
     * @return {?}
     */
    transform(value, arg) {
        /** @type {?} */
        let layers;
        if (arg === 'time') {
            layers = value.filter((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => {
                /** @type {?} */
                const datasource = (/** @type {?} */ (layer.dataSource));
                return (this.isTimeFilterable(datasource) &&
                    datasource.options.timeFilter !== undefined &&
                    Object.keys(datasource.options.timeFilter).length);
            }));
        }
        if (arg === 'ogc') {
            layers = value.filter((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => {
                /** @type {?} */
                const datasource = (/** @type {?} */ (layer.dataSource));
                return this.isOgcFilterable(datasource);
            }));
        }
        return layers;
    }
    /**
     * @private
     * @param {?} dataSource
     * @return {?}
     */
    isTimeFilterable(dataSource) {
        if (dataSource.options.type !== 'wms') {
            return false;
        }
        return dataSource.options.timeFilterable;
    }
    /**
     * @private
     * @param {?} dataSource
     * @return {?}
     */
    isOgcFilterable(dataSource) {
        /** @type {?} */
        let isOgcFilterable = false;
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
    }
}
FilterableDataSourcePipe.decorators = [
    { type: Pipe, args: [{
                name: 'filterableDataSource'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyYWJsZS1kYXRhc291cmNlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3NoYXJlZC9maWx0ZXJhYmxlLWRhdGFzb3VyY2UucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFXcEQsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7O0lBQ25DLFNBQVMsQ0FBQyxLQUFjLEVBQUUsR0FBVzs7WUFDL0IsTUFBTTtRQUVWLElBQUksR0FBRyxLQUFLLE1BQU0sRUFBRTtZQUNsQixNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU07Ozs7WUFBQyxDQUFDLEtBQVksRUFBRSxFQUFFOztzQkFDL0IsVUFBVSxHQUFHLG1CQUFBLEtBQUssQ0FBQyxVQUFVLEVBQTRCO2dCQUMvRCxPQUFPLENBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztvQkFDakMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUztvQkFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FDbEQsQ0FBQztZQUNKLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLEdBQUcsS0FBSyxLQUFLLEVBQUU7WUFDakIsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNOzs7O1lBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTs7c0JBQy9CLFVBQVUsR0FBRyxtQkFBQSxLQUFLLENBQUMsVUFBVSxFQUEyQjtnQkFDOUQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFDLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7Ozs7SUFFTyxnQkFBZ0IsQ0FBQyxVQUFvQztRQUMzRCxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtZQUNyQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztJQUMzQyxDQUFDOzs7Ozs7SUFFTyxlQUFlLENBQUMsVUFBbUM7O1lBQ3JELGVBQWUsR0FBRyxLQUFLO1FBQzNCLElBQ0UsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVO1lBQzdCLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU87WUFDckMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUN0QztZQUNBLGVBQWUsR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFDRCxJQUNFLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVTtZQUM3QixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPO1lBQ3JDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUN6QyxlQUFlLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQzs7O1lBakRGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsc0JBQXNCO2FBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2RhdGFzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZURhdGFTb3VyY2UgfSBmcm9tICcuL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGltZUZpbHRlcmFibGVEYXRhU291cmNlIH0gZnJvbSAnLi90aW1lLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdmaWx0ZXJhYmxlRGF0YVNvdXJjZSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZpbHRlcmFibGVEYXRhU291cmNlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybSh2YWx1ZTogTGF5ZXJbXSwgYXJnOiBzdHJpbmcpOiBMYXllcltdIHtcclxuICAgIGxldCBsYXllcnM7XHJcblxyXG4gICAgaWYgKGFyZyA9PT0gJ3RpbWUnKSB7XHJcbiAgICAgIGxheWVycyA9IHZhbHVlLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YXNvdXJjZSA9IGxheWVyLmRhdGFTb3VyY2UgYXMgVGltZUZpbHRlcmFibGVEYXRhU291cmNlO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICB0aGlzLmlzVGltZUZpbHRlcmFibGUoZGF0YXNvdXJjZSkgJiZcclxuICAgICAgICAgIGRhdGFzb3VyY2Uub3B0aW9ucy50aW1lRmlsdGVyICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgIE9iamVjdC5rZXlzKGRhdGFzb3VyY2Uub3B0aW9ucy50aW1lRmlsdGVyKS5sZW5ndGhcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChhcmcgPT09ICdvZ2MnKSB7XHJcbiAgICAgIGxheWVycyA9IHZhbHVlLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YXNvdXJjZSA9IGxheWVyLmRhdGFTb3VyY2UgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2U7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNPZ2NGaWx0ZXJhYmxlKGRhdGFzb3VyY2UpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBsYXllcnM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzVGltZUZpbHRlcmFibGUoZGF0YVNvdXJjZTogVGltZUZpbHRlcmFibGVEYXRhU291cmNlKSB7XHJcbiAgICBpZiAoZGF0YVNvdXJjZS5vcHRpb25zLnR5cGUgIT09ICd3bXMnKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBkYXRhU291cmNlLm9wdGlvbnMudGltZUZpbHRlcmFibGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzT2djRmlsdGVyYWJsZShkYXRhU291cmNlOiBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGlzT2djRmlsdGVyYWJsZSA9IGZhbHNlO1xyXG4gICAgaWYgKFxyXG4gICAgICBkYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycyAmJlxyXG4gICAgICBkYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycy5lbmFibGVkICYmXHJcbiAgICAgIGRhdGFTb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmVkaXRhYmxlXHJcbiAgICApIHtcclxuICAgICAgaXNPZ2NGaWx0ZXJhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgZGF0YVNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMgJiZcclxuICAgICAgZGF0YVNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuZW5hYmxlZCAmJlxyXG4gICAgICBkYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycy5wdXNoQnV0dG9ucykge1xyXG4gICAgICAgIGlzT2djRmlsdGVyYWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNPZ2NGaWx0ZXJhYmxlO1xyXG4gIH1cclxufVxyXG4iXX0=