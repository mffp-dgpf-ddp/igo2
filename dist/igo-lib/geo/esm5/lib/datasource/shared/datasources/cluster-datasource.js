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
    return ClusterDataSource;
}(FeatureDataSource));
export { ClusterDataSource };
if (false) {
    /** @type {?} */
    ClusterDataSource.prototype.options;
    /** @type {?} */
    ClusterDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2NsdXN0ZXItZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBRWhELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHekQ7SUFBdUMsNkNBQWlCO0lBQXhEOztJQWFBLENBQUM7Ozs7O0lBVFcsMENBQWM7Ozs7SUFBeEI7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1FBQzdDLE9BQU8sSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRVMsc0NBQVU7Ozs7SUFBcEI7UUFDRSxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFiRCxDQUF1QyxpQkFBaUIsR0FhdkQ7Ozs7SUFaQyxvQ0FBeUM7O0lBQ3pDLCtCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZUNsdXN0ZXIgZnJvbSAnb2wvc291cmNlL0NsdXN0ZXInO1xyXG5cclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBDbHVzdGVyRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL2NsdXN0ZXItZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENsdXN0ZXJEYXRhU291cmNlIGV4dGVuZHMgRmVhdHVyZURhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvcHRpb25zOiBDbHVzdGVyRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZUNsdXN0ZXI7XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZUNsdXN0ZXIge1xyXG4gICAgdGhpcy5vcHRpb25zLmZvcm1hdCA9IHRoaXMuZ2V0U291cmNlRm9ybWF0RnJvbU9wdGlvbnModGhpcy5vcHRpb25zKTtcclxuICAgIHRoaXMub3B0aW9ucy5zb3VyY2UgPSBzdXBlci5jcmVhdGVPbFNvdXJjZSgpO1xyXG4gICAgcmV0dXJuIG5ldyBvbFNvdXJjZUNsdXN0ZXIodGhpcy5vcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZW5lcmF0ZUlkKCkge1xyXG4gICAgcmV0dXJuIHV1aWQoKTtcclxuICB9XHJcbn1cclxuIl19