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
    /**
     * @return {?}
     */
    FeatureDataSource.prototype.onUnwatch = /**
     * @return {?}
     */
    function () { };
    return FeatureDataSource;
}(DataSource));
export { FeatureDataSource };
if (false) {
    /** @type {?} */
    FeatureDataSource.prototype.options;
    /** @type {?} */
    FeatureDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2ZlYXR1cmUtZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBRXRDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHMUM7SUFBdUMsNkNBQVU7SUFBakQ7O0lBc0NBLENBQUM7Ozs7O0lBbkNXLDBDQUFjOzs7O0lBQXhCOztZQUNRLGFBQWEsR0FBRztZQUNwQixNQUFNLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDdEQ7UUFFRCxPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Ozs7OztJQUVTLHNEQUEwQjs7Ozs7SUFBcEMsVUFBcUMsT0FBaUM7UUFDcEUsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2xCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUN2Qjs7WUFDRyxXQUFXOztZQUNULFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVTtRQUNyQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7U0FDaEM7YUFBTTtZQUNMLFdBQVcsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO2dCQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7YUFDaEU7U0FDRjs7WUFFSyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWE7O1lBQ3ZDLE1BQU07UUFDVixJQUFJLGFBQWEsRUFBRTtZQUNqQixNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNMLE1BQU0sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1NBQzVCO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7OztJQUVNLHFDQUFTOzs7SUFBaEIsY0FBb0IsQ0FBQztJQUN2Qix3QkFBQztBQUFELENBQUMsQUF0Q0QsQ0FBdUMsVUFBVSxHQXNDaEQ7Ozs7SUFyQ0Msb0NBQXlDOztJQUN6QywrQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCAqIGFzIG9sZm9ybWF0IGZyb20gJ29sL2Zvcm1hdCc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi9mZWF0dXJlLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGZWF0dXJlRGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvcHRpb25zOiBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZVZlY3RvcjtcclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VWZWN0b3Ige1xyXG4gICAgY29uc3Qgc291cmNlT3B0aW9ucyA9IHtcclxuICAgICAgZm9ybWF0OiB0aGlzLmdldFNvdXJjZUZvcm1hdEZyb21PcHRpb25zKHRoaXMub3B0aW9ucylcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbFNvdXJjZVZlY3RvcihPYmplY3QuYXNzaWduKHNvdXJjZU9wdGlvbnMsIHRoaXMub3B0aW9ucykpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldFNvdXJjZUZvcm1hdEZyb21PcHRpb25zKG9wdGlvbnM6IEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMuZm9ybWF0KSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLmZvcm1hdDtcclxuICAgIH1cclxuICAgIGxldCBvbEZvcm1hdENscztcclxuICAgIGNvbnN0IGZvcm1hdFR5cGUgPSBvcHRpb25zLmZvcm1hdFR5cGU7XHJcbiAgICBpZiAoIWZvcm1hdFR5cGUpIHtcclxuICAgICAgb2xGb3JtYXRDbHMgPSBvbGZvcm1hdC5HZW9KU09OO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb2xGb3JtYXRDbHMgPSBvbGZvcm1hdFtmb3JtYXRUeXBlXTtcclxuICAgICAgaWYgKG9sRm9ybWF0Q2xzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmVjdG9yIHNvdXJjZSBmb3JtYXQgJHtmb3JtYXRUeXBlfS4nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZvcm1hdE9wdGlvbnMgPSBvcHRpb25zLmZvcm1hdE9wdGlvbnM7XHJcbiAgICBsZXQgZm9ybWF0O1xyXG4gICAgaWYgKGZvcm1hdE9wdGlvbnMpIHtcclxuICAgICAgZm9ybWF0ID0gbmV3IG9sRm9ybWF0Q2xzKGZvcm1hdE9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9ybWF0ID0gbmV3IG9sRm9ybWF0Q2xzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvcm1hdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblVud2F0Y2goKSB7fVxyXG59XHJcbiJdfQ==