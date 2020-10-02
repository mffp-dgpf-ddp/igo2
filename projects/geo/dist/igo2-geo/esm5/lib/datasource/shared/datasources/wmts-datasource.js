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
    function WMTSDataSource(options) {
        return _super.call(this, options) || this;
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
    /**
     * @return {?}
     */
    WMTSDataSource.prototype.onUnwatch = /**
     * @return {?}
     */
    function () { };
    return WMTSDataSource;
}(DataSource));
export { WMTSDataSource };
if (false) {
    /** @type {?} */
    WMTSDataSource.prototype.options;
    /** @type {?} */
    WMTSDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid210cy1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dtdHMtZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHMUM7SUFBb0MsMENBQVU7SUFJNUMsd0JBQVksT0FBOEI7ZUFDeEMsa0JBQU0sT0FBTyxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRVMsdUNBQWM7Ozs7SUFBeEI7O1lBQ1EsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQ2pDO1lBQ0UsUUFBUSxFQUFFLHFCQUFxQixDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFVLENBQUM7U0FDbkUsRUFDRCxJQUFJLENBQUMsT0FBTyxDQUNiO1FBRUQsT0FBTyxJQUFJLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7O0lBRU0sa0NBQVM7OztJQUFoQixjQUFvQixDQUFDO0lBRXZCLHFCQUFDO0FBQUQsQ0FBQyxBQXJCRCxDQUFvQyxVQUFVLEdBcUI3Qzs7OztJQXBCQyxpQ0FBc0M7O0lBQ3RDLDRCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZVdNVFMgZnJvbSAnb2wvc291cmNlL1dNVFMnO1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlRGVmYXVsdFRpbGVHcmlkIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGlsZWdyaWQnO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgV01UU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93bXRzLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBXTVRTRGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvcHRpb25zOiBXTVRTRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZVdNVFM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VXTVRTIHtcclxuICAgIGNvbnN0IHNvdXJjZU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7XHJcbiAgICAgICAgdGlsZUdyaWQ6IGNyZWF0ZURlZmF1bHRUaWxlR3JpZCh0aGlzLm9wdGlvbnMucHJvamVjdGlvbiBhcyBzdHJpbmcpXHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMub3B0aW9uc1xyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IG9sU291cmNlV01UUyhzb3VyY2VPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblVud2F0Y2goKSB7fVxyXG5cclxufVxyXG4iXX0=