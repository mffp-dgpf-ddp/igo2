/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getEntityProperty, EntityTableColumnRenderer } from '@igo2/common';
import { downloadContent } from '@igo2/utils';
import { ExportNothingToExportError } from './export.errors';
/**
 * @param {?} error
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
export function handleFileExportError(error, messageService, languageService) {
    if (error instanceof ExportNothingToExportError) {
        handleNothingToExportError(messageService, languageService);
        return;
    }
    /** @type {?} */
    var translate = languageService.translate;
    /** @type {?} */
    var title = translate.instant('igo.geo.export.failed.title');
    /** @type {?} */
    var message = translate.instant('igo.geo.export.failed.text');
    messageService.error(message, title);
}
/**
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
export function handleNothingToExportError(messageService, languageService) {
    /** @type {?} */
    var translate = languageService.translate;
    /** @type {?} */
    var title = translate.instant('igo.geo.export.nothing.title');
    /** @type {?} */
    var message = translate.instant('igo.geo.export.nothing.text');
    messageService.error(message, title);
}
/**
 * Export array to CSV
 *
 * @param {?} rows Array of arrays to export as CSV
 * @param {?} fileName
 * @param {?=} separator Cell separator
 * @return {?}
 */
export function exportToCSV(rows, fileName, separator) {
    if (separator === void 0) { separator = ';'; }
    /** @type {?} */
    var lines = rows.map((/**
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    function (row, index) { return row.join(separator); }));
    /** @type {?} */
    var csvContent = lines.join('\n');
    downloadContent(csvContent, 'text/csv;charset=utf-8', fileName);
}
/**
 * Return an array of values from an array of entities.
 *
 * @param {?} entities Array of entities
 * @param {?} columns
 * @return {?}
 */
export function entitiesToRowData(entities, columns) {
    return entities.map((/**
     * @param {?} entity
     * @return {?}
     */
    function (entity) {
        return columns.map((/**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            /** @type {?} */
            var valueAccessor;
            if (column.renderer === undefined || column.renderer === EntityTableColumnRenderer.Default) {
                valueAccessor = column.valueAccessor;
            }
            valueAccessor = valueAccessor ? valueAccessor : getEntityProperty;
            return valueAccessor(entity, column.name);
        }));
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ltcG9ydC1leHBvcnQvc2hhcmVkL2V4cG9ydC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUVqQix5QkFBeUIsRUFDMUIsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUU5QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7OztBQUU3RCxNQUFNLFVBQVUscUJBQXFCLENBQ25DLEtBQVksRUFDWixjQUE4QixFQUM5QixlQUFnQztJQUVoQyxJQUFJLEtBQUssWUFBWSwwQkFBMEIsRUFBRTtRQUMvQywwQkFBMEIsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDNUQsT0FBTztLQUNSOztRQUNLLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7UUFDckMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUM7O1FBQ3hELE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDO0lBQy9ELGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSwwQkFBMEIsQ0FDeEMsY0FBOEIsRUFDOUIsZUFBZ0M7O1FBRTFCLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7UUFDckMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7O1FBQ3pELE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDO0lBQ2hFLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7Ozs7Ozs7OztBQVFELE1BQU0sVUFBVSxXQUFXLENBQUMsSUFBYSxFQUFFLFFBQWdCLEVBQUUsU0FBdUI7SUFBdkIsMEJBQUEsRUFBQSxlQUF1Qjs7UUFDNUUsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHOzs7OztJQUFDLFVBQUMsR0FBWSxFQUFFLEtBQWEsSUFBSyxPQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQW5CLENBQW1CLEVBQUM7O1FBQ3RFLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQyxlQUFlLENBQUMsVUFBVSxFQUFFLHdCQUF3QixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xFLENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLFFBQWtCLEVBQUUsT0FBNEI7SUFDaEYsT0FBTyxRQUFRLENBQUMsR0FBRzs7OztJQUFDLFVBQUMsTUFBYztRQUNqQyxPQUFPLE9BQU8sQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxNQUF5Qjs7Z0JBQ3ZDLGFBQWE7WUFDakIsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLHlCQUF5QixDQUFDLE9BQU8sRUFBRTtnQkFDMUYsYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7YUFDdEM7WUFDRCxhQUFhLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQ2xFLE9BQU8sYUFBYSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDLEVBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIGdldEVudGl0eVByb3BlcnR5LFxyXG4gIEVudGl0eVRhYmxlQ29sdW1uLFxyXG4gIEVudGl0eVRhYmxlQ29sdW1uUmVuZGVyZXJcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IGRvd25sb2FkQ29udGVudCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IEV4cG9ydE5vdGhpbmdUb0V4cG9ydEVycm9yIH0gZnJvbSAnLi9leHBvcnQuZXJyb3JzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVGaWxlRXhwb3J0RXJyb3IoXHJcbiAgZXJyb3I6IEVycm9yLFxyXG4gIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4pIHtcclxuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFeHBvcnROb3RoaW5nVG9FeHBvcnRFcnJvcikge1xyXG4gICAgaGFuZGxlTm90aGluZ1RvRXhwb3J0RXJyb3IobWVzc2FnZVNlcnZpY2UsIGxhbmd1YWdlU2VydmljZSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5leHBvcnQuZmFpbGVkLnRpdGxlJyk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmV4cG9ydC5mYWlsZWQudGV4dCcpO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZU5vdGhpbmdUb0V4cG9ydEVycm9yKFxyXG4gIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4pIHtcclxuICBjb25zdCB0cmFuc2xhdGUgPSBsYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZXhwb3J0Lm5vdGhpbmcudGl0bGUnKTtcclxuICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZXhwb3J0Lm5vdGhpbmcudGV4dCcpO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEV4cG9ydCBhcnJheSB0byBDU1ZcclxuICpcclxuICogQHBhcmFtIHJvd3MgQXJyYXkgb2YgYXJyYXlzIHRvIGV4cG9ydCBhcyBDU1ZcclxuICogQHBhcmFtIHNlcGFyYXRvciBDZWxsIHNlcGFyYXRvclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydFRvQ1NWKHJvd3M6IGFueVtdW10sIGZpbGVOYW1lOiBzdHJpbmcsIHNlcGFyYXRvcjogc3RyaW5nID0gJzsnKSB7XHJcbiAgY29uc3QgbGluZXMgPSByb3dzLm1hcCgocm93OiBhbnlbXVtdLCBpbmRleDogbnVtYmVyKSA9PiByb3cuam9pbihzZXBhcmF0b3IpKTtcclxuICBjb25zdCBjc3ZDb250ZW50ID0gbGluZXMuam9pbignXFxuJyk7XHJcbiAgZG93bmxvYWRDb250ZW50KGNzdkNvbnRlbnQsICd0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04JywgZmlsZU5hbWUpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIGFycmF5IG9mIGVudGl0aWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0gZW50aXRpZXMgQXJyYXkgb2YgZW50aXRpZXNcclxuICogQHBhcmFtIHNjb2x1bW5zIENvbHVtbnMgZGVmaW5pdGlvbiBvZiB0aGUgb3V0cHV0IGRhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbnRpdGllc1RvUm93RGF0YShlbnRpdGllczogb2JqZWN0W10sIGNvbHVtbnM6IEVudGl0eVRhYmxlQ29sdW1uW10pIHtcclxuICByZXR1cm4gZW50aXRpZXMubWFwKChlbnRpdHk6IG9iamVjdCkgPT4ge1xyXG4gICAgcmV0dXJuIGNvbHVtbnMubWFwKChjb2x1bW46IEVudGl0eVRhYmxlQ29sdW1uKSA9PiB7XHJcbiAgICAgIGxldCB2YWx1ZUFjY2Vzc29yO1xyXG4gICAgICBpZiAoY29sdW1uLnJlbmRlcmVyID09PSB1bmRlZmluZWQgfHwgY29sdW1uLnJlbmRlcmVyID09PSBFbnRpdHlUYWJsZUNvbHVtblJlbmRlcmVyLkRlZmF1bHQpIHtcclxuICAgICAgICB2YWx1ZUFjY2Vzc29yID0gY29sdW1uLnZhbHVlQWNjZXNzb3I7XHJcbiAgICAgIH1cclxuICAgICAgdmFsdWVBY2Nlc3NvciA9IHZhbHVlQWNjZXNzb3IgPyB2YWx1ZUFjY2Vzc29yIDogZ2V0RW50aXR5UHJvcGVydHk7XHJcbiAgICAgIHJldHVybiB2YWx1ZUFjY2Vzc29yKGVudGl0eSwgY29sdW1uLm5hbWUpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuIl19