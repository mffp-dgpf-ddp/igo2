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
export function handleFileExportSuccess(messageService, languageService) {
    /** @type {?} */
    var translate = languageService.translate;
    /** @type {?} */
    var title = translate.instant('igo.geo.export.success.title');
    /** @type {?} */
    var message = translate.instant('igo.geo.export.success.text');
    messageService.success(message, title);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ltcG9ydC1leHBvcnQvc2hhcmVkL2V4cG9ydC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUVqQix5QkFBeUIsRUFDMUIsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUU5QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7OztBQUU3RCxNQUFNLFVBQVUscUJBQXFCLENBQ25DLEtBQVksRUFDWixjQUE4QixFQUM5QixlQUFnQztJQUVoQyxJQUFJLEtBQUssWUFBWSwwQkFBMEIsRUFBRTtRQUMvQywwQkFBMEIsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDNUQsT0FBTztLQUNSOztRQUNLLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7UUFDckMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUM7O1FBQ3hELE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDO0lBQy9ELGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSx1QkFBdUIsQ0FDckMsY0FBOEIsRUFDOUIsZUFBZ0M7O1FBRTFCLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7UUFDckMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7O1FBQ3pELE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDO0lBQ2hFLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3pDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSwwQkFBMEIsQ0FDeEMsY0FBOEIsRUFDOUIsZUFBZ0M7O1FBRTFCLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7UUFDckMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7O1FBQ3pELE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDO0lBQ2hFLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7Ozs7Ozs7OztBQVFELE1BQU0sVUFBVSxXQUFXLENBQUMsSUFBYSxFQUFFLFFBQWdCLEVBQUUsU0FBdUI7SUFBdkIsMEJBQUEsRUFBQSxlQUF1Qjs7UUFDNUUsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHOzs7OztJQUFDLFVBQUMsR0FBWSxFQUFFLEtBQWEsSUFBSyxPQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQW5CLENBQW1CLEVBQUM7O1FBQ3RFLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQyxlQUFlLENBQUMsVUFBVSxFQUFFLHdCQUF3QixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xFLENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLFFBQWtCLEVBQUUsT0FBNEI7SUFDaEYsT0FBTyxRQUFRLENBQUMsR0FBRzs7OztJQUFDLFVBQUMsTUFBYztRQUNqQyxPQUFPLE9BQU8sQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxNQUF5Qjs7Z0JBQ3ZDLGFBQWE7WUFDakIsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLHlCQUF5QixDQUFDLE9BQU8sRUFBRTtnQkFDMUYsYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7YUFDdEM7WUFDRCxhQUFhLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQ2xFLE9BQU8sYUFBYSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDLEVBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIGdldEVudGl0eVByb3BlcnR5LFxyXG4gIEVudGl0eVRhYmxlQ29sdW1uLFxyXG4gIEVudGl0eVRhYmxlQ29sdW1uUmVuZGVyZXJcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IGRvd25sb2FkQ29udGVudCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IEV4cG9ydE5vdGhpbmdUb0V4cG9ydEVycm9yIH0gZnJvbSAnLi9leHBvcnQuZXJyb3JzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVGaWxlRXhwb3J0RXJyb3IoXHJcbiAgZXJyb3I6IEVycm9yLFxyXG4gIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4pIHtcclxuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFeHBvcnROb3RoaW5nVG9FeHBvcnRFcnJvcikge1xyXG4gICAgaGFuZGxlTm90aGluZ1RvRXhwb3J0RXJyb3IobWVzc2FnZVNlcnZpY2UsIGxhbmd1YWdlU2VydmljZSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5leHBvcnQuZmFpbGVkLnRpdGxlJyk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmV4cG9ydC5mYWlsZWQudGV4dCcpO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUZpbGVFeHBvcnRTdWNjZXNzKFxyXG4gIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4pIHtcclxuICBjb25zdCB0cmFuc2xhdGUgPSBsYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZXhwb3J0LnN1Y2Nlc3MudGl0bGUnKTtcclxuICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZXhwb3J0LnN1Y2Nlc3MudGV4dCcpO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobWVzc2FnZSwgdGl0bGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlTm90aGluZ1RvRXhwb3J0RXJyb3IoXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5leHBvcnQubm90aGluZy50aXRsZScpO1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5leHBvcnQubm90aGluZy50ZXh0Jyk7XHJcbiAgbWVzc2FnZVNlcnZpY2UuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG59XHJcblxyXG4vKipcclxuICogRXhwb3J0IGFycmF5IHRvIENTVlxyXG4gKlxyXG4gKiBAcGFyYW0gcm93cyBBcnJheSBvZiBhcnJheXMgdG8gZXhwb3J0IGFzIENTVlxyXG4gKiBAcGFyYW0gc2VwYXJhdG9yIENlbGwgc2VwYXJhdG9yXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXhwb3J0VG9DU1Yocm93czogYW55W11bXSwgZmlsZU5hbWU6IHN0cmluZywgc2VwYXJhdG9yOiBzdHJpbmcgPSAnOycpIHtcclxuICBjb25zdCBsaW5lcyA9IHJvd3MubWFwKChyb3c6IGFueVtdW10sIGluZGV4OiBudW1iZXIpID0+IHJvdy5qb2luKHNlcGFyYXRvcikpO1xyXG4gIGNvbnN0IGNzdkNvbnRlbnQgPSBsaW5lcy5qb2luKCdcXG4nKTtcclxuICBkb3dubG9hZENvbnRlbnQoY3N2Q29udGVudCwgJ3RleHQvY3N2O2NoYXJzZXQ9dXRmLTgnLCBmaWxlTmFtZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gYXJyYXkgb2YgZW50aXRpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSBlbnRpdGllcyBBcnJheSBvZiBlbnRpdGllc1xyXG4gKiBAcGFyYW0gc2NvbHVtbnMgQ29sdW1ucyBkZWZpbml0aW9uIG9mIHRoZSBvdXRwdXQgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGVudGl0aWVzVG9Sb3dEYXRhKGVudGl0aWVzOiBvYmplY3RbXSwgY29sdW1uczogRW50aXR5VGFibGVDb2x1bW5bXSkge1xyXG4gIHJldHVybiBlbnRpdGllcy5tYXAoKGVudGl0eTogb2JqZWN0KSA9PiB7XHJcbiAgICByZXR1cm4gY29sdW1ucy5tYXAoKGNvbHVtbjogRW50aXR5VGFibGVDb2x1bW4pID0+IHtcclxuICAgICAgbGV0IHZhbHVlQWNjZXNzb3I7XHJcbiAgICAgIGlmIChjb2x1bW4ucmVuZGVyZXIgPT09IHVuZGVmaW5lZCB8fCBjb2x1bW4ucmVuZGVyZXIgPT09IEVudGl0eVRhYmxlQ29sdW1uUmVuZGVyZXIuRGVmYXVsdCkge1xyXG4gICAgICAgIHZhbHVlQWNjZXNzb3IgPSBjb2x1bW4udmFsdWVBY2Nlc3NvcjtcclxuICAgICAgfVxyXG4gICAgICB2YWx1ZUFjY2Vzc29yID0gdmFsdWVBY2Nlc3NvciA/IHZhbHVlQWNjZXNzb3IgOiBnZXRFbnRpdHlQcm9wZXJ0eTtcclxuICAgICAgcmV0dXJuIHZhbHVlQWNjZXNzb3IoZW50aXR5LCBjb2x1bW4ubmFtZSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG4iXX0=