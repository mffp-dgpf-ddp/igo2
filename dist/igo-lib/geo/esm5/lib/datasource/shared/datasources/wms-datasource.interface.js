/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function WMSDataSourceOptions() { }
if (false) {
    /** @type {?|undefined} */
    WMSDataSourceOptions.prototype.optionsFromCapabilities;
    /** @type {?|undefined} */
    WMSDataSourceOptions.prototype.paramsWFS;
    /** @type {?|undefined} */
    WMSDataSourceOptions.prototype.urlWfs;
    /** @type {?} */
    WMSDataSourceOptions.prototype.url;
    /** @type {?} */
    WMSDataSourceOptions.prototype.params;
    /** @type {?|undefined} */
    WMSDataSourceOptions.prototype.projection;
    /** @type {?|undefined} */
    WMSDataSourceOptions.prototype.resolutions;
    /** @type {?|undefined} */
    WMSDataSourceOptions.prototype.serverType;
    /** @type {?|undefined} */
    WMSDataSourceOptions.prototype.ratio;
    /** @type {?|undefined} */
    WMSDataSourceOptions.prototype.ol;
    /** @type {?|undefined} */
    WMSDataSourceOptions.prototype.refreshIntervalSec;
    /** @type {?|undefined} */
    WMSDataSourceOptions.prototype._layerOptionsFromCapabilities;
}
/**
 * @record
 */
export function WMSDataSourceOptionsParams() { }
if (false) {
    /** @type {?} */
    WMSDataSourceOptionsParams.prototype.layers;
    /** @type {?|undefined} */
    WMSDataSourceOptionsParams.prototype.version;
    /** @type {?|undefined} */
    WMSDataSourceOptionsParams.prototype.time;
}
/**
 * @record
 */
export function WMSLayerOptionsFromCapabilities() { }
if (false) {
    /** @type {?|undefined} */
    WMSLayerOptionsFromCapabilities.prototype.title;
    /** @type {?|undefined} */
    WMSLayerOptionsFromCapabilities.prototype.minResolution;
    /** @type {?|undefined} */
    WMSLayerOptionsFromCapabilities.prototype.maxResolution;
    /** @type {?|undefined} */
    WMSLayerOptionsFromCapabilities.prototype.metadata;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLWRhdGFzb3VyY2UuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dtcy1kYXRhc291cmNlLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBTUEsMENBY0M7OztJQVpDLHVEQUFrQzs7SUFDbEMseUNBQXVDOztJQUN2QyxzQ0FBZ0I7O0lBQ2hCLG1DQUFZOztJQUNaLHNDQUFtQzs7SUFDbkMsMENBQW9COztJQUNwQiwyQ0FBdUI7O0lBQ3ZCLDBDQUFvQjs7SUFDcEIscUNBQWU7O0lBQ2Ysa0NBQXNCOztJQUN0QixrREFBNEI7O0lBQzVCLDZEQUFnRTs7Ozs7QUFHbEUsZ0RBSUM7OztJQUhDLDRDQUFlOztJQUNmLDZDQUFpQjs7SUFDakIsMENBQWM7Ozs7O0FBR2hCLHFEQUtDOzs7SUFKQyxnREFBZTs7SUFDZix3REFBdUI7O0lBQ3ZCLHdEQUF1Qjs7SUFDdkIsbURBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlSW1hZ2VXTVMgZnJvbSAnb2wvc291cmNlL0ltYWdlV01TJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFdGU0RhdGFTb3VyY2VPcHRpb25zUGFyYW1zIH0gZnJvbSAnLi93ZnMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBNZXRhZGF0YU9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9tZXRhZGF0YS9zaGFyZWQvbWV0YWRhdGEuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV01TRGF0YVNvdXJjZU9wdGlvbnMgZXh0ZW5kcyBEYXRhU291cmNlT3B0aW9ucyB7XHJcbiAgLy8gdHlwZT86ICd3bXMnO1xyXG4gIG9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzPzogYm9vbGVhbjtcclxuICBwYXJhbXNXRlM/OiBXRlNEYXRhU291cmNlT3B0aW9uc1BhcmFtczsgLy8gZm9yIHdtcyBsaW5rZWQgd2l0aCB3ZnNcclxuICB1cmxXZnM/OiBzdHJpbmc7IC8vIGlmIHVybCBmb3IgbGlua2VkIHdmcyBkaWZmZXIgZnJvbSB0aGUgdXJsIGZvciB3bXMuXHJcbiAgdXJsOiBzdHJpbmc7XHJcbiAgcGFyYW1zOiBXTVNEYXRhU291cmNlT3B0aW9uc1BhcmFtcztcclxuICBwcm9qZWN0aW9uPzogc3RyaW5nO1xyXG4gIHJlc29sdXRpb25zPzogbnVtYmVyW107XHJcbiAgc2VydmVyVHlwZT86IHN0cmluZztcclxuICByYXRpbz86IG51bWJlcjtcclxuICBvbD86IG9sU291cmNlSW1hZ2VXTVM7XHJcbiAgcmVmcmVzaEludGVydmFsU2VjPzogbnVtYmVyO1xyXG4gIF9sYXllck9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzPzogV01TTGF5ZXJPcHRpb25zRnJvbUNhcGFiaWxpdGllcztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXTVNEYXRhU291cmNlT3B0aW9uc1BhcmFtcyB7XHJcbiAgbGF5ZXJzOiBzdHJpbmc7XHJcbiAgdmVyc2lvbj86IHN0cmluZztcclxuICB0aW1lPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdNU0xheWVyT3B0aW9uc0Zyb21DYXBhYmlsaXRpZXMge1xyXG4gIHRpdGxlPzogc3RyaW5nO1xyXG4gIG1pblJlc29sdXRpb24/OiBudW1iZXI7XHJcbiAgbWF4UmVzb2x1dGlvbj86IHN0cmluZztcclxuICBtZXRhZGF0YT86IE1ldGFkYXRhT3B0aW9ucztcclxufVxyXG4iXX0=