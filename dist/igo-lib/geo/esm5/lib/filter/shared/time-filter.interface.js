/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function TimeFilterOptions() { }
if (false) {
    /** @type {?|undefined} */
    TimeFilterOptions.prototype.min;
    /** @type {?|undefined} */
    TimeFilterOptions.prototype.max;
    /** @type {?|undefined} */
    TimeFilterOptions.prototype.range;
    /** @type {?|undefined} */
    TimeFilterOptions.prototype.value;
    /** @type {?|undefined} */
    TimeFilterOptions.prototype.values;
    /** @type {?|undefined} */
    TimeFilterOptions.prototype.type;
    /** @type {?|undefined} */
    TimeFilterOptions.prototype.format;
    /** @type {?|undefined} */
    TimeFilterOptions.prototype.style;
    /** @type {?|undefined} */
    TimeFilterOptions.prototype.step;
    /** @type {?|undefined} */
    TimeFilterOptions.prototype.timeInterval;
    /** @type {?|undefined} */
    TimeFilterOptions.prototype.current;
}
/**
 * @record
 */
export function TimeFilterableDataSourceOptions() { }
if (false) {
    /** @type {?|undefined} */
    TimeFilterableDataSourceOptions.prototype.timeFilterable;
    /** @type {?|undefined} */
    TimeFilterableDataSourceOptions.prototype.timeFilter;
}
/**
 * @record
 */
export function TimeFilterableDataSource() { }
if (false) {
    /** @type {?} */
    TimeFilterableDataSource.prototype.options;
    /**
     * @param {?} date
     * @return {?}
     */
    TimeFilterableDataSource.prototype.filterByDate = function (date) { };
    /**
     * @param {?} year
     * @return {?}
     */
    TimeFilterableDataSource.prototype.filterByYear = function (year) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXIuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlci9zaGFyZWQvdGltZS1maWx0ZXIuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSx1Q0FZQzs7O0lBWEMsZ0NBQWE7O0lBQ2IsZ0NBQWE7O0lBQ2Isa0NBQWdCOztJQUNoQixrQ0FBZTs7SUFDZixtQ0FBMEI7O0lBQzFCLGlDQUFvQzs7SUFDcEMsbUNBQWdCOztJQUNoQixrQ0FBOEI7O0lBQzlCLGlDQUFjOztJQUNkLHlDQUFzQjs7SUFDdEIsb0NBQWtCOzs7OztBQUdwQixxREFHQzs7O0lBRkMseURBQXlCOztJQUN6QixxREFBK0I7Ozs7O0FBR2pDLDhDQUlDOzs7SUFIQywyQ0FBeUM7Ozs7O0lBQ3pDLHNFQUF3Qzs7Ozs7SUFDeEMsc0VBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV01TRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dtcy1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgV01TRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93bXMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUaW1lRmlsdGVyT3B0aW9ucyB7XHJcbiAgbWluPzogc3RyaW5nO1xyXG4gIG1heD86IHN0cmluZztcclxuICByYW5nZT86IGJvb2xlYW47XHJcbiAgdmFsdWU/OiBzdHJpbmc7XHJcbiAgdmFsdWVzPzogW3N0cmluZywgc3RyaW5nXTtcclxuICB0eXBlPzogJ2RhdGUnIHwgJ3RpbWUnIHwgJ2RhdGV0aW1lJztcclxuICBmb3JtYXQ/OiBzdHJpbmc7XHJcbiAgc3R5bGU/OiAnY2FsZW5kYXInIHwgJ3NsaWRlcic7XHJcbiAgc3RlcD86IG51bWJlcjtcclxuICB0aW1lSW50ZXJ2YWw/OiBudW1iZXI7XHJcbiAgY3VycmVudD86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGltZUZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucyBleHRlbmRzIFdNU0RhdGFTb3VyY2VPcHRpb25zIHtcclxuICB0aW1lRmlsdGVyYWJsZT86IGJvb2xlYW47XHJcbiAgdGltZUZpbHRlcj86IFRpbWVGaWx0ZXJPcHRpb25zO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRpbWVGaWx0ZXJhYmxlRGF0YVNvdXJjZSBleHRlbmRzIFdNU0RhdGFTb3VyY2Uge1xyXG4gIG9wdGlvbnM6IFRpbWVGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgZmlsdGVyQnlEYXRlKGRhdGU6IERhdGUgfCBbRGF0ZSwgRGF0ZV0pO1xyXG4gIGZpbHRlckJ5WWVhcih5ZWFyOiBzdHJpbmcgfCBbc3RyaW5nLCBzdHJpbmddKTtcclxufVxyXG4iXX0=