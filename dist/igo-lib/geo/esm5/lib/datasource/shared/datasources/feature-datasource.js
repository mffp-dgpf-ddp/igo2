/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olSourceVector from 'ol/source/Vector';
import * as olformat from 'ol/format';
import { DataSource } from './datasource';
var FeatureDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(FeatureDataSource, _super);
    function FeatureDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @protected
     * @return {?}
     */
    FeatureDataSource.prototype.createOlSource = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sourceOptions = {
            format: this.getSourceFormatFromOptions(this.options)
        };
        return new olSourceVector(Object.assign(sourceOptions, this.options));
    };
    /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    FeatureDataSource.prototype.getSourceFormatFromOptions = /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    function (options) {
        if (options.format) {
            return options.format;
        }
        /** @type {?} */
        var olFormatCls;
        /** @type {?} */
        var formatType = options.formatType;
        if (!formatType) {
            olFormatCls = olformat.GeoJSON;
        }
        else {
            olFormatCls = olformat[formatType];
            if (olFormatCls === undefined) {
                throw new Error('Invalid vector source format ${formatType}.');
            }
        }
        /** @type {?} */
        var formatOptions = options.formatOptions;
        /** @type {?} */
        var format;
        if (formatOptions) {
            format = new olFormatCls(formatOptions);
        }
        else {
            format = new olFormatCls();
        }
        return format;
    };
    return FeatureDataSource;
}(DataSource));
export { FeatureDataSource };
if (false) {
    /** @type {?} */
    FeatureDataSource.prototype.options;
    /** @type {?} */
    FeatureDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2ZlYXR1cmUtZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBRXRDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHMUM7SUFBdUMsNkNBQVU7SUFBakQ7O0lBb0NBLENBQUM7Ozs7O0lBakNXLDBDQUFjOzs7O0lBQXhCOztZQUNRLGFBQWEsR0FBRztZQUNwQixNQUFNLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDdEQ7UUFFRCxPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Ozs7OztJQUVTLHNEQUEwQjs7Ozs7SUFBcEMsVUFBcUMsT0FBaUM7UUFDcEUsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2xCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUN2Qjs7WUFDRyxXQUFXOztZQUNULFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVTtRQUNyQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7U0FDaEM7YUFBTTtZQUNMLFdBQVcsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO2dCQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7YUFDaEU7U0FDRjs7WUFFSyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWE7O1lBQ3ZDLE1BQU07UUFDVixJQUFJLGFBQWEsRUFBRTtZQUNqQixNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNMLE1BQU0sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1NBQzVCO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQXBDRCxDQUF1QyxVQUFVLEdBb0NoRDs7OztJQW5DQyxvQ0FBeUM7O0lBQ3pDLCtCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0ICogYXMgb2xmb3JtYXQgZnJvbSAnb2wvZm9ybWF0JztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL2ZlYXR1cmUtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVEYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcbiAgcHVibGljIG9wdGlvbnM6IEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucztcclxuICBwdWJsaWMgb2w6IG9sU291cmNlVmVjdG9yO1xyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZVZlY3RvciB7XHJcbiAgICBjb25zdCBzb3VyY2VPcHRpb25zID0ge1xyXG4gICAgICBmb3JtYXQ6IHRoaXMuZ2V0U291cmNlRm9ybWF0RnJvbU9wdGlvbnModGhpcy5vcHRpb25zKVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbmV3IG9sU291cmNlVmVjdG9yKE9iamVjdC5hc3NpZ24oc291cmNlT3B0aW9ucywgdGhpcy5vcHRpb25zKSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0U291cmNlRm9ybWF0RnJvbU9wdGlvbnMob3B0aW9uczogRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucy5mb3JtYXQpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuZm9ybWF0O1xyXG4gICAgfVxyXG4gICAgbGV0IG9sRm9ybWF0Q2xzO1xyXG4gICAgY29uc3QgZm9ybWF0VHlwZSA9IG9wdGlvbnMuZm9ybWF0VHlwZTtcclxuICAgIGlmICghZm9ybWF0VHlwZSkge1xyXG4gICAgICBvbEZvcm1hdENscyA9IG9sZm9ybWF0Lkdlb0pTT047XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvbEZvcm1hdENscyA9IG9sZm9ybWF0W2Zvcm1hdFR5cGVdO1xyXG4gICAgICBpZiAob2xGb3JtYXRDbHMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2ZWN0b3Igc291cmNlIGZvcm1hdCAke2Zvcm1hdFR5cGV9LicpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZm9ybWF0T3B0aW9ucyA9IG9wdGlvbnMuZm9ybWF0T3B0aW9ucztcclxuICAgIGxldCBmb3JtYXQ7XHJcbiAgICBpZiAoZm9ybWF0T3B0aW9ucykge1xyXG4gICAgICBmb3JtYXQgPSBuZXcgb2xGb3JtYXRDbHMoZm9ybWF0T3B0aW9ucyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3JtYXQgPSBuZXcgb2xGb3JtYXRDbHMoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ybWF0O1xyXG4gIH1cclxufVxyXG4iXX0=