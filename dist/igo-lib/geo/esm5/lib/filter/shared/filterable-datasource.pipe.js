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
        if (dataSource.options.ogcFilters &&
            dataSource.options.ogcFilters.enabled) {
            return true;
        }
        return false;
    };
    FilterableDataSourcePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'filterableDataSource'
                },] }
    ];
    return FilterableDataSourcePipe;
}());
export { FilterableDataSourcePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyYWJsZS1kYXRhc291cmNlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3NoYXJlZC9maWx0ZXJhYmxlLWRhdGFzb3VyY2UucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFRcEQ7SUFBQTtJQTBDQSxDQUFDOzs7Ozs7SUF0Q0MsNENBQVM7Ozs7O0lBQVQsVUFBVSxLQUFjLEVBQUUsR0FBVztRQUFyQyxpQkFvQkM7O1lBbkJLLE1BQU07UUFFVixJQUFJLEdBQUcsS0FBSyxNQUFNLEVBQUU7WUFDbEIsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQyxLQUFZOztvQkFDM0IsVUFBVSxHQUFHLG1CQUFBLEtBQUssQ0FBQyxVQUFVLEVBQTRCO2dCQUMvRCxPQUFPLENBQ0wsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztvQkFDakMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUztvQkFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FDbEQsQ0FBQztZQUNKLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLEdBQUcsS0FBSyxLQUFLLEVBQUU7WUFDakIsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQyxLQUFZOztvQkFDM0IsVUFBVSxHQUFHLG1CQUFBLEtBQUssQ0FBQyxVQUFVLEVBQTJCO2dCQUM5RCxPQUFPLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Ozs7OztJQUVPLG1EQUFnQjs7Ozs7SUFBeEIsVUFBeUIsVUFBb0M7UUFDM0QsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDckMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBRU8sa0RBQWU7Ozs7O0lBQXZCLFVBQXdCLFVBQW1DO1FBQ3pELElBQ0UsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVO1lBQzdCLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFDckM7WUFDQSxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOztnQkF6Q0YsSUFBSSxTQUFDO29CQUNKLElBQUksRUFBRSxzQkFBc0I7aUJBQzdCOztJQXdDRCwrQkFBQztDQUFBLEFBMUNELElBMENDO1NBdkNZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9kYXRhc291cmNlJztcclxuXHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlIH0gZnJvbSAnLi9vZ2MtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJhYmxlRGF0YVNvdXJjZSB9IGZyb20gJy4vdGltZS1maWx0ZXIuaW50ZXJmYWNlJztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnZmlsdGVyYWJsZURhdGFTb3VyY2UnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXJhYmxlRGF0YVNvdXJjZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odmFsdWU6IExheWVyW10sIGFyZzogc3RyaW5nKTogTGF5ZXJbXSB7XHJcbiAgICBsZXQgbGF5ZXJzO1xyXG5cclxuICAgIGlmIChhcmcgPT09ICd0aW1lJykge1xyXG4gICAgICBsYXllcnMgPSB2YWx1ZS5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFzb3VyY2UgPSBsYXllci5kYXRhU291cmNlIGFzIFRpbWVGaWx0ZXJhYmxlRGF0YVNvdXJjZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgdGhpcy5pc1RpbWVGaWx0ZXJhYmxlKGRhdGFzb3VyY2UpICYmXHJcbiAgICAgICAgICBkYXRhc291cmNlLm9wdGlvbnMudGltZUZpbHRlciAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhc291cmNlLm9wdGlvbnMudGltZUZpbHRlcikubGVuZ3RoXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoYXJnID09PSAnb2djJykge1xyXG4gICAgICBsYXllcnMgPSB2YWx1ZS5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFzb3VyY2UgPSBsYXllci5kYXRhU291cmNlIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzT2djRmlsdGVyYWJsZShkYXRhc291cmNlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGF5ZXJzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc1RpbWVGaWx0ZXJhYmxlKGRhdGFTb3VyY2U6IFRpbWVGaWx0ZXJhYmxlRGF0YVNvdXJjZSkge1xyXG4gICAgaWYgKGRhdGFTb3VyY2Uub3B0aW9ucy50eXBlICE9PSAnd21zJykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YVNvdXJjZS5vcHRpb25zLnRpbWVGaWx0ZXJhYmxlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc09nY0ZpbHRlcmFibGUoZGF0YVNvdXJjZTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2UpIHtcclxuICAgIGlmIChcclxuICAgICAgZGF0YVNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMgJiZcclxuICAgICAgZGF0YVNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuZW5hYmxlZFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=