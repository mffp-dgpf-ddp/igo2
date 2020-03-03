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
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.geo.export.failed.title');
    /** @type {?} */
    const message = translate.instant('igo.geo.export.failed.text');
    messageService.error(message, title);
}
/**
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
export function handleNothingToExportError(messageService, languageService) {
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.geo.export.nothing.title');
    /** @type {?} */
    const message = translate.instant('igo.geo.export.nothing.text');
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
export function exportToCSV(rows, fileName, separator = ';') {
    /** @type {?} */
    const lines = rows.map((/**
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    (row, index) => row.join(separator)));
    /** @type {?} */
    const csvContent = lines.join('\n');
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
    (entity) => {
        return columns.map((/**
         * @param {?} column
         * @return {?}
         */
        (column) => {
            /** @type {?} */
            let valueAccessor;
            if (column.renderer === undefined || column.renderer === EntityTableColumnRenderer.Default) {
                valueAccessor = column.valueAccessor;
            }
            valueAccessor = valueAccessor ? valueAccessor : getEntityProperty;
            return valueAccessor(entity, column.name);
        }));
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ltcG9ydC1leHBvcnQvc2hhcmVkL2V4cG9ydC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUVqQix5QkFBeUIsRUFDMUIsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUU5QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7OztBQUU3RCxNQUFNLFVBQVUscUJBQXFCLENBQ25DLEtBQVksRUFDWixjQUE4QixFQUM5QixlQUFnQztJQUVoQyxJQUFJLEtBQUssWUFBWSwwQkFBMEIsRUFBRTtRQUMvQywwQkFBMEIsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDNUQsT0FBTztLQUNSOztVQUNLLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7VUFDckMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUM7O1VBQ3hELE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDO0lBQy9ELGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSwwQkFBMEIsQ0FDeEMsY0FBOEIsRUFDOUIsZUFBZ0M7O1VBRTFCLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7VUFDckMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7O1VBQ3pELE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDO0lBQ2hFLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7Ozs7Ozs7OztBQVFELE1BQU0sVUFBVSxXQUFXLENBQUMsSUFBYSxFQUFFLFFBQWdCLEVBQUUsWUFBb0IsR0FBRzs7VUFDNUUsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHOzs7OztJQUFDLENBQUMsR0FBWSxFQUFFLEtBQWEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQzs7VUFDdEUsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25DLGVBQWUsQ0FBQyxVQUFVLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbEUsQ0FBQzs7Ozs7Ozs7QUFRRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsUUFBa0IsRUFBRSxPQUE0QjtJQUNoRixPQUFPLFFBQVEsQ0FBQyxHQUFHOzs7O0lBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRTtRQUNyQyxPQUFPLE9BQU8sQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxNQUF5QixFQUFFLEVBQUU7O2dCQUMzQyxhQUFhO1lBQ2pCLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyx5QkFBeUIsQ0FBQyxPQUFPLEVBQUU7Z0JBQzFGLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO2FBQ3RDO1lBQ0QsYUFBYSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztZQUNsRSxPQUFPLGFBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBnZXRFbnRpdHlQcm9wZXJ0eSxcclxuICBFbnRpdHlUYWJsZUNvbHVtbixcclxuICBFbnRpdHlUYWJsZUNvbHVtblJlbmRlcmVyXHJcbn0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBkb3dubG9hZENvbnRlbnQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBFeHBvcnROb3RoaW5nVG9FeHBvcnRFcnJvciB9IGZyb20gJy4vZXhwb3J0LmVycm9ycyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRmlsZUV4cG9ydEVycm9yKFxyXG4gIGVycm9yOiBFcnJvcixcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuKSB7XHJcbiAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXhwb3J0Tm90aGluZ1RvRXhwb3J0RXJyb3IpIHtcclxuICAgIGhhbmRsZU5vdGhpbmdUb0V4cG9ydEVycm9yKG1lc3NhZ2VTZXJ2aWNlLCBsYW5ndWFnZVNlcnZpY2UpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBjb25zdCB0cmFuc2xhdGUgPSBsYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZXhwb3J0LmZhaWxlZC50aXRsZScpO1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5leHBvcnQuZmFpbGVkLnRleHQnKTtcclxuICBtZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVOb3RoaW5nVG9FeHBvcnRFcnJvcihcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuKSB7XHJcbiAgY29uc3QgdHJhbnNsYXRlID0gbGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmV4cG9ydC5ub3RoaW5nLnRpdGxlJyk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmV4cG9ydC5ub3RoaW5nLnRleHQnKTtcclxuICBtZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHBvcnQgYXJyYXkgdG8gQ1NWXHJcbiAqXHJcbiAqIEBwYXJhbSByb3dzIEFycmF5IG9mIGFycmF5cyB0byBleHBvcnQgYXMgQ1NWXHJcbiAqIEBwYXJhbSBzZXBhcmF0b3IgQ2VsbCBzZXBhcmF0b3JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRUb0NTVihyb3dzOiBhbnlbXVtdLCBmaWxlTmFtZTogc3RyaW5nLCBzZXBhcmF0b3I6IHN0cmluZyA9ICc7Jykge1xyXG4gIGNvbnN0IGxpbmVzID0gcm93cy5tYXAoKHJvdzogYW55W11bXSwgaW5kZXg6IG51bWJlcikgPT4gcm93LmpvaW4oc2VwYXJhdG9yKSk7XHJcbiAgY29uc3QgY3N2Q29udGVudCA9IGxpbmVzLmpvaW4oJ1xcbicpO1xyXG4gIGRvd25sb2FkQ29udGVudChjc3ZDb250ZW50LCAndGV4dC9jc3Y7Y2hhcnNldD11dGYtOCcsIGZpbGVOYW1lKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBhcnJheSBvZiBlbnRpdGllcy5cclxuICpcclxuICogQHBhcmFtIGVudGl0aWVzIEFycmF5IG9mIGVudGl0aWVzXHJcbiAqIEBwYXJhbSBzY29sdW1ucyBDb2x1bW5zIGRlZmluaXRpb24gb2YgdGhlIG91dHB1dCBkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZW50aXRpZXNUb1Jvd0RhdGEoZW50aXRpZXM6IG9iamVjdFtdLCBjb2x1bW5zOiBFbnRpdHlUYWJsZUNvbHVtbltdKSB7XHJcbiAgcmV0dXJuIGVudGl0aWVzLm1hcCgoZW50aXR5OiBvYmplY3QpID0+IHtcclxuICAgIHJldHVybiBjb2x1bW5zLm1hcCgoY29sdW1uOiBFbnRpdHlUYWJsZUNvbHVtbikgPT4ge1xyXG4gICAgICBsZXQgdmFsdWVBY2Nlc3NvcjtcclxuICAgICAgaWYgKGNvbHVtbi5yZW5kZXJlciA9PT0gdW5kZWZpbmVkIHx8IGNvbHVtbi5yZW5kZXJlciA9PT0gRW50aXR5VGFibGVDb2x1bW5SZW5kZXJlci5EZWZhdWx0KSB7XHJcbiAgICAgICAgdmFsdWVBY2Nlc3NvciA9IGNvbHVtbi52YWx1ZUFjY2Vzc29yO1xyXG4gICAgICB9XHJcbiAgICAgIHZhbHVlQWNjZXNzb3IgPSB2YWx1ZUFjY2Vzc29yID8gdmFsdWVBY2Nlc3NvciA6IGdldEVudGl0eVByb3BlcnR5O1xyXG4gICAgICByZXR1cm4gdmFsdWVBY2Nlc3NvcihlbnRpdHksIGNvbHVtbi5uYW1lKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcbiJdfQ==