/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olSourceWMTS from 'ol/source/WMTS';
import { createDefaultTileGrid } from '../../utils/tilegrid';
import { DataSource } from './datasource';
var WMTSDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(WMTSDataSource, _super);
    function WMTSDataSource(options, networkService) {
        return _super.call(this, options, networkService) || this;
    }
    /**
     * @protected
     * @return {?}
     */
    WMTSDataSource.prototype.createOlSource = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sourceOptions = Object.assign({
            tileGrid: createDefaultTileGrid((/** @type {?} */ (this.options.projection)))
        }, this.options);
        return new olSourceWMTS(sourceOptions);
    };
    return WMTSDataSource;
}(DataSource));
export { WMTSDataSource };
if (false) {
    /** @type {?} */
    WMTSDataSource.prototype.options;
    /** @type {?} */
    WMTSDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid210cy1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dtdHMtZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFLMUM7SUFBb0MsMENBQVU7SUFJNUMsd0JBQ0UsT0FBOEIsRUFDOUIsY0FBOEI7ZUFFOUIsa0JBQU0sT0FBTyxFQUFFLGNBQWMsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVTLHVDQUFjOzs7O0lBQXhCOztZQUNRLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNqQztZQUNFLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBVSxDQUFDO1NBQ25FLEVBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FDYjtRQUVELE9BQU8sSUFBSSxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVILHFCQUFDO0FBQUQsQ0FBQyxBQXRCRCxDQUFvQyxVQUFVLEdBc0I3Qzs7OztJQXJCQyxpQ0FBc0M7O0lBQ3RDLDRCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZVdNVFMgZnJvbSAnb2wvc291cmNlL1dNVFMnO1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlRGVmYXVsdFRpbGVHcmlkIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGlsZWdyaWQnO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgV01UU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93bXRzLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmltcG9ydCB7IE5ldHdvcmtTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZS9pZ28yLWNvcmUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdNVFNEYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcbiAgcHVibGljIG9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucztcclxuICBwdWJsaWMgb2w6IG9sU291cmNlV01UUztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBvcHRpb25zOiBXTVRTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBuZXR3b3JrU2VydmljZTogTmV0d29ya1NlcnZpY2VcclxuICAgICkge1xyXG4gICAgc3VwZXIob3B0aW9ucywgbmV0d29ya1NlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlV01UUyB7XHJcbiAgICBjb25zdCBzb3VyY2VPcHRpb25zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge1xyXG4gICAgICAgIHRpbGVHcmlkOiBjcmVhdGVEZWZhdWx0VGlsZUdyaWQodGhpcy5vcHRpb25zLnByb2plY3Rpb24gYXMgc3RyaW5nKVxyXG4gICAgICB9LFxyXG4gICAgICB0aGlzLm9wdGlvbnNcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbFNvdXJjZVdNVFMoc291cmNlT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=