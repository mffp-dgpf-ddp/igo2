/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olSourceVector from 'ol/source/Vector';
import * as olformat from 'ol/format';
import { DataSource } from './datasource';
export class FeatureDataSource extends DataSource {
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        /** @type {?} */
        const sourceOptions = {
            format: this.getSourceFormatFromOptions(this.options)
        };
        return new olSourceVector(Object.assign(sourceOptions, this.options));
    }
    /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    getSourceFormatFromOptions(options) {
        if (options.format) {
            return options.format;
        }
        /** @type {?} */
        let olFormatCls;
        /** @type {?} */
        const formatType = options.formatType;
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
        const formatOptions = options.formatOptions;
        /** @type {?} */
        let format;
        if (formatOptions) {
            format = new olFormatCls(formatOptions);
        }
        else {
            format = new olFormatCls();
        }
        return format;
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}
if (false) {
    /** @type {?} */
    FeatureDataSource.prototype.options;
    /** @type {?} */
    FeatureDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2ZlYXR1cmUtZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFFdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUcxQyxNQUFNLE9BQU8saUJBQWtCLFNBQVEsVUFBVTs7Ozs7SUFHckMsY0FBYzs7Y0FDaEIsYUFBYSxHQUFHO1lBQ3BCLE1BQU0sRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUN0RDtRQUVELE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7Ozs7O0lBRVMsMEJBQTBCLENBQUMsT0FBaUM7UUFDcEUsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2xCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUN2Qjs7WUFDRyxXQUFXOztjQUNULFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVTtRQUNyQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7U0FDaEM7YUFBTTtZQUNMLFdBQVcsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO2dCQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7YUFDaEU7U0FDRjs7Y0FFSyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWE7O1lBQ3ZDLE1BQU07UUFDVixJQUFJLGFBQWEsRUFBRTtZQUNqQixNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNMLE1BQU0sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1NBQzVCO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7OztJQUVNLFNBQVMsS0FBSSxDQUFDO0NBQ3RCOzs7SUFyQ0Msb0NBQXlDOztJQUN6QywrQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCAqIGFzIG9sZm9ybWF0IGZyb20gJ29sL2Zvcm1hdCc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi9mZWF0dXJlLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGZWF0dXJlRGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvcHRpb25zOiBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZVZlY3RvcjtcclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VWZWN0b3Ige1xyXG4gICAgY29uc3Qgc291cmNlT3B0aW9ucyA9IHtcclxuICAgICAgZm9ybWF0OiB0aGlzLmdldFNvdXJjZUZvcm1hdEZyb21PcHRpb25zKHRoaXMub3B0aW9ucylcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbFNvdXJjZVZlY3RvcihPYmplY3QuYXNzaWduKHNvdXJjZU9wdGlvbnMsIHRoaXMub3B0aW9ucykpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldFNvdXJjZUZvcm1hdEZyb21PcHRpb25zKG9wdGlvbnM6IEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMuZm9ybWF0KSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLmZvcm1hdDtcclxuICAgIH1cclxuICAgIGxldCBvbEZvcm1hdENscztcclxuICAgIGNvbnN0IGZvcm1hdFR5cGUgPSBvcHRpb25zLmZvcm1hdFR5cGU7XHJcbiAgICBpZiAoIWZvcm1hdFR5cGUpIHtcclxuICAgICAgb2xGb3JtYXRDbHMgPSBvbGZvcm1hdC5HZW9KU09OO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb2xGb3JtYXRDbHMgPSBvbGZvcm1hdFtmb3JtYXRUeXBlXTtcclxuICAgICAgaWYgKG9sRm9ybWF0Q2xzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmVjdG9yIHNvdXJjZSBmb3JtYXQgJHtmb3JtYXRUeXBlfS4nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZvcm1hdE9wdGlvbnMgPSBvcHRpb25zLmZvcm1hdE9wdGlvbnM7XHJcbiAgICBsZXQgZm9ybWF0O1xyXG4gICAgaWYgKGZvcm1hdE9wdGlvbnMpIHtcclxuICAgICAgZm9ybWF0ID0gbmV3IG9sRm9ybWF0Q2xzKGZvcm1hdE9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9ybWF0ID0gbmV3IG9sRm9ybWF0Q2xzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvcm1hdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblVud2F0Y2goKSB7fVxyXG59XHJcbiJdfQ==