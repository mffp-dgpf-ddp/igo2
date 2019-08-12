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
        if (dataSource.options.ogcFilters &&
            dataSource.options.ogcFilters.enabled) {
            return true;
        }
        return false;
    }
}
FilterableDataSourcePipe.decorators = [
    { type: Pipe, args: [{
                name: 'filterableDataSource'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyYWJsZS1kYXRhc291cmNlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3NoYXJlZC9maWx0ZXJhYmxlLWRhdGFzb3VyY2UucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFXcEQsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7O0lBQ25DLFNBQVMsQ0FBQyxLQUFjLEVBQUUsR0FBVzs7WUFDL0IsTUFBTTtRQUVWLElBQUksR0FBRyxLQUFLLE1BQU0sRUFBRTtZQUNsQixNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU07Ozs7WUFBQyxDQUFDLEtBQVksRUFBRSxFQUFFOztzQkFDL0IsVUFBVSxHQUFHLG1CQUFBLEtBQUssQ0FBQyxVQUFVLEVBQTRCO2dCQUMvRCxPQUFPLENBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztvQkFDakMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUztvQkFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FDbEQsQ0FBQztZQUNKLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLEdBQUcsS0FBSyxLQUFLLEVBQUU7WUFDakIsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNOzs7O1lBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTs7c0JBQy9CLFVBQVUsR0FBRyxtQkFBQSxLQUFLLENBQUMsVUFBVSxFQUEyQjtnQkFDOUQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFDLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7Ozs7SUFFTyxnQkFBZ0IsQ0FBQyxVQUFvQztRQUMzRCxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtZQUNyQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztJQUMzQyxDQUFDOzs7Ozs7SUFFTyxlQUFlLENBQUMsVUFBbUM7UUFDekQsSUFDRSxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVU7WUFDN0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUNyQztZQUNBLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OztZQXpDRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLHNCQUFzQjthQUM3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9kYXRhc291cmNlJztcclxuXHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlIH0gZnJvbSAnLi9vZ2MtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJhYmxlRGF0YVNvdXJjZSB9IGZyb20gJy4vdGltZS1maWx0ZXIuaW50ZXJmYWNlJztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnZmlsdGVyYWJsZURhdGFTb3VyY2UnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXJhYmxlRGF0YVNvdXJjZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odmFsdWU6IExheWVyW10sIGFyZzogc3RyaW5nKTogTGF5ZXJbXSB7XHJcbiAgICBsZXQgbGF5ZXJzO1xyXG5cclxuICAgIGlmIChhcmcgPT09ICd0aW1lJykge1xyXG4gICAgICBsYXllcnMgPSB2YWx1ZS5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFzb3VyY2UgPSBsYXllci5kYXRhU291cmNlIGFzIFRpbWVGaWx0ZXJhYmxlRGF0YVNvdXJjZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgdGhpcy5pc1RpbWVGaWx0ZXJhYmxlKGRhdGFzb3VyY2UpICYmXHJcbiAgICAgICAgICBkYXRhc291cmNlLm9wdGlvbnMudGltZUZpbHRlciAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhc291cmNlLm9wdGlvbnMudGltZUZpbHRlcikubGVuZ3RoXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoYXJnID09PSAnb2djJykge1xyXG4gICAgICBsYXllcnMgPSB2YWx1ZS5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFzb3VyY2UgPSBsYXllci5kYXRhU291cmNlIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzT2djRmlsdGVyYWJsZShkYXRhc291cmNlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGF5ZXJzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc1RpbWVGaWx0ZXJhYmxlKGRhdGFTb3VyY2U6IFRpbWVGaWx0ZXJhYmxlRGF0YVNvdXJjZSkge1xyXG4gICAgaWYgKGRhdGFTb3VyY2Uub3B0aW9ucy50eXBlICE9PSAnd21zJykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YVNvdXJjZS5vcHRpb25zLnRpbWVGaWx0ZXJhYmxlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc09nY0ZpbHRlcmFibGUoZGF0YVNvdXJjZTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2UpIHtcclxuICAgIGlmIChcclxuICAgICAgZGF0YVNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMgJiZcclxuICAgICAgZGF0YVNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuZW5hYmxlZFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=