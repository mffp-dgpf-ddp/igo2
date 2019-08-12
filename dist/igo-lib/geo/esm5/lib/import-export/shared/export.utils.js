/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getEntityProperty, EntityTableColumnRenderer } from '@igo2/common';
import { ExportNothingToExportError } from './export.errors';
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
/**
 * Trigger download of a file
 *
 * @param {?} content File content
 * @param {?} mimeType File mime type
 * @param {?} fileName File name
 * @return {?}
 */
export function downloadContent(content, mimeType, fileName) {
    /** @type {?} */
    var element = document.createElement('a');
    element.setAttribute('href', "data:" + mimeType + "," + encodeURIComponent(content));
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ltcG9ydC1leHBvcnQvc2hhcmVkL2V4cG9ydC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUNMLGlCQUFpQixFQUVqQix5QkFBeUIsRUFDMUIsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7OztBQVE3RCxNQUFNLFVBQVUsV0FBVyxDQUFDLElBQWEsRUFBRSxRQUFnQixFQUFFLFNBQXVCO0lBQXZCLDBCQUFBLEVBQUEsZUFBdUI7O1FBQzVFLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRzs7Ozs7SUFBQyxVQUFDLEdBQVksRUFBRSxLQUFhLElBQUssT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFuQixDQUFtQixFQUFDOztRQUN0RSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkMsZUFBZSxDQUFDLFVBQVUsRUFBRSx3QkFBd0IsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsRSxDQUFDOzs7Ozs7OztBQVFELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxRQUFrQixFQUFFLE9BQTRCO0lBQ2hGLE9BQU8sUUFBUSxDQUFDLEdBQUc7Ozs7SUFBQyxVQUFDLE1BQWM7UUFDakMsT0FBTyxPQUFPLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsTUFBeUI7O2dCQUN2QyxhQUFhO1lBQ2pCLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyx5QkFBeUIsQ0FBQyxPQUFPLEVBQUU7Z0JBQzFGLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO2FBQ3RDO1lBQ0QsYUFBYSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztZQUNsRSxPQUFPLGFBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7Ozs7QUFTRCxNQUFNLFVBQVUsZUFBZSxDQUFDLE9BQWUsRUFBRSxRQUFnQixFQUFFLFFBQWdCOztRQUMzRSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7SUFDM0MsT0FBTyxDQUFDLFlBQVksQ0FDbEIsTUFBTSxFQUNOLFVBQVEsUUFBUSxTQUFJLGtCQUFrQixDQUFDLE9BQU8sQ0FBRyxDQUNsRCxDQUFDO0lBQ0YsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQy9CLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRW5DLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVoQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQyxDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxLQUFZLEVBQ1osY0FBOEIsRUFDOUIsZUFBZ0M7SUFFaEMsSUFBSSxLQUFLLFlBQVksMEJBQTBCLEVBQUU7UUFDL0MsMEJBQTBCLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzVELE9BQU87S0FDUjs7UUFDSyxTQUFTLEdBQUcsZUFBZSxDQUFDLFNBQVM7O1FBQ3JDLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDOztRQUN4RCxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQztJQUMvRCxjQUFjLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN2QyxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsMEJBQTBCLENBQ3hDLGNBQThCLEVBQzlCLGVBQWdDOztRQUUxQixTQUFTLEdBQUcsZUFBZSxDQUFDLFNBQVM7O1FBQ3JDLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDOztRQUN6RCxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQztJQUNoRSxjQUFjLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN2QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBnZXRFbnRpdHlQcm9wZXJ0eSxcclxuICBFbnRpdHlUYWJsZUNvbHVtbixcclxuICBFbnRpdHlUYWJsZUNvbHVtblJlbmRlcmVyXHJcbn0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEV4cG9ydE5vdGhpbmdUb0V4cG9ydEVycm9yIH0gZnJvbSAnLi9leHBvcnQuZXJyb3JzJztcclxuXHJcbi8qKlxyXG4gKiBFeHBvcnQgYXJyYXkgdG8gQ1NWXHJcbiAqXHJcbiAqIEBwYXJhbSByb3dzIEFycmF5IG9mIGFycmF5cyB0byBleHBvcnQgYXMgQ1NWXHJcbiAqIEBwYXJhbSBzZXBhcmF0b3IgQ2VsbCBzZXBhcmF0b3JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRUb0NTVihyb3dzOiBhbnlbXVtdLCBmaWxlTmFtZTogc3RyaW5nLCBzZXBhcmF0b3I6IHN0cmluZyA9ICc7Jykge1xyXG4gIGNvbnN0IGxpbmVzID0gcm93cy5tYXAoKHJvdzogYW55W11bXSwgaW5kZXg6IG51bWJlcikgPT4gcm93LmpvaW4oc2VwYXJhdG9yKSk7XHJcbiAgY29uc3QgY3N2Q29udGVudCA9IGxpbmVzLmpvaW4oJ1xcbicpO1xyXG4gIGRvd25sb2FkQ29udGVudChjc3ZDb250ZW50LCAndGV4dC9jc3Y7Y2hhcnNldD11dGYtOCcsIGZpbGVOYW1lKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBhcnJheSBvZiBlbnRpdGllcy5cclxuICpcclxuICogQHBhcmFtIGVudGl0aWVzIEFycmF5IG9mIGVudGl0aWVzXHJcbiAqIEBwYXJhbSBzY29sdW1ucyBDb2x1bW5zIGRlZmluaXRpb24gb2YgdGhlIG91dHB1dCBkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZW50aXRpZXNUb1Jvd0RhdGEoZW50aXRpZXM6IG9iamVjdFtdLCBjb2x1bW5zOiBFbnRpdHlUYWJsZUNvbHVtbltdKSB7XHJcbiAgcmV0dXJuIGVudGl0aWVzLm1hcCgoZW50aXR5OiBvYmplY3QpID0+IHtcclxuICAgIHJldHVybiBjb2x1bW5zLm1hcCgoY29sdW1uOiBFbnRpdHlUYWJsZUNvbHVtbikgPT4ge1xyXG4gICAgICBsZXQgdmFsdWVBY2Nlc3NvcjtcclxuICAgICAgaWYgKGNvbHVtbi5yZW5kZXJlciA9PT0gdW5kZWZpbmVkIHx8IGNvbHVtbi5yZW5kZXJlciA9PT0gRW50aXR5VGFibGVDb2x1bW5SZW5kZXJlci5EZWZhdWx0KSB7XHJcbiAgICAgICAgdmFsdWVBY2Nlc3NvciA9IGNvbHVtbi52YWx1ZUFjY2Vzc29yO1xyXG4gICAgICB9XHJcbiAgICAgIHZhbHVlQWNjZXNzb3IgPSB2YWx1ZUFjY2Vzc29yID8gdmFsdWVBY2Nlc3NvciA6IGdldEVudGl0eVByb3BlcnR5O1xyXG4gICAgICByZXR1cm4gdmFsdWVBY2Nlc3NvcihlbnRpdHksIGNvbHVtbi5uYW1lKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogVHJpZ2dlciBkb3dubG9hZCBvZiBhIGZpbGVcclxuICpcclxuICogQHBhcmFtIGNvbnRlbnQgRmlsZSBjb250ZW50XHJcbiAqIEBwYXJhbSBtaW1lVHlwZSBGaWxlIG1pbWUgdHlwZVxyXG4gKiBAcGFyYW0gZmlsZU5hbWUgRmlsZSBuYW1lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWRDb250ZW50KGNvbnRlbnQ6IHN0cmluZywgbWltZVR5cGU6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZykge1xyXG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAnaHJlZicsXHJcbiAgICBgZGF0YToke21pbWVUeXBlfSwke2VuY29kZVVSSUNvbXBvbmVudChjb250ZW50KX1gXHJcbiAgKTtcclxuICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlTmFtZSk7XHJcbiAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcblxyXG4gIGVsZW1lbnQuY2xpY2soKTtcclxuXHJcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUZpbGVFeHBvcnRFcnJvcihcclxuICBlcnJvcjogRXJyb3IsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGlmIChlcnJvciBpbnN0YW5jZW9mIEV4cG9ydE5vdGhpbmdUb0V4cG9ydEVycm9yKSB7XHJcbiAgICBoYW5kbGVOb3RoaW5nVG9FeHBvcnRFcnJvcihtZXNzYWdlU2VydmljZSwgbGFuZ3VhZ2VTZXJ2aWNlKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgY29uc3QgdHJhbnNsYXRlID0gbGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmV4cG9ydC5mYWlsZWQudGl0bGUnKTtcclxuICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZXhwb3J0LmZhaWxlZC50ZXh0Jyk7XHJcbiAgbWVzc2FnZVNlcnZpY2UuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlTm90aGluZ1RvRXhwb3J0RXJyb3IoXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5leHBvcnQubm90aGluZy50aXRsZScpO1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5leHBvcnQubm90aGluZy50ZXh0Jyk7XHJcbiAgbWVzc2FnZVNlcnZpY2UuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG59XHJcbiJdfQ==