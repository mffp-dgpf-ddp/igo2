/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olSourceCluster from 'ol/source/Cluster';
import { uuid } from '@igo2/utils';
import { FeatureDataSource } from './feature-datasource';
var ClusterDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(ClusterDataSource, _super);
    function ClusterDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @protected
     * @return {?}
     */
    ClusterDataSource.prototype.createOlSource = /**
     * @protected
     * @return {?}
     */
    function () {
        this.options.format = this.getSourceFormatFromOptions(this.options);
        this.options.source = _super.prototype.createOlSource.call(this);
        return new olSourceCluster(this.options);
    };
    /**
     * @protected
     * @return {?}
     */
    ClusterDataSource.prototype.generateId = /**
     * @protected
     * @return {?}
     */
    function () {
        return uuid();
    };
    /**
     * @return {?}
     */
    ClusterDataSource.prototype.onUnwatch = /**
     * @return {?}
     */
    function () { };
    return ClusterDataSource;
}(FeatureDataSource));
export { ClusterDataSource };
if (false) {
    /** @type {?} */
    ClusterDataSource.prototype.options;
    /** @type {?} */
    ClusterDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2NsdXN0ZXItZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBRWhELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHekQ7SUFBdUMsNkNBQWlCO0lBQXhEOztJQWVBLENBQUM7Ozs7O0lBWFcsMENBQWM7Ozs7SUFBeEI7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1FBQzdDLE9BQU8sSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRVMsc0NBQVU7Ozs7SUFBcEI7UUFDRSxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7Ozs7SUFFTSxxQ0FBUzs7O0lBQWhCLGNBQW9CLENBQUM7SUFDdkIsd0JBQUM7QUFBRCxDQUFDLEFBZkQsQ0FBdUMsaUJBQWlCLEdBZXZEOzs7O0lBZEMsb0NBQXlDOztJQUN6QywrQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VDbHVzdGVyIGZyb20gJ29sL3NvdXJjZS9DbHVzdGVyJztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4vZmVhdHVyZS1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi9jbHVzdGVyLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDbHVzdGVyRGF0YVNvdXJjZSBleHRlbmRzIEZlYXR1cmVEYXRhU291cmNlIHtcclxuICBwdWJsaWMgb3B0aW9uczogQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zO1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VDbHVzdGVyO1xyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VDbHVzdGVyIHtcclxuICAgIHRoaXMub3B0aW9ucy5mb3JtYXQgPSB0aGlzLmdldFNvdXJjZUZvcm1hdEZyb21PcHRpb25zKHRoaXMub3B0aW9ucyk7XHJcbiAgICB0aGlzLm9wdGlvbnMuc291cmNlID0gc3VwZXIuY3JlYXRlT2xTb3VyY2UoKTtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VDbHVzdGVyKHRoaXMub3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2VuZXJhdGVJZCgpIHtcclxuICAgIHJldHVybiB1dWlkKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25VbndhdGNoKCkge31cclxufVxyXG4iXX0=