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
    /**
     * @return {?}
     */
    get queryTitle() {
        return ((/** @type {?} */ (this.options))).queryTitle
            ? ((/** @type {?} */ (this.options))).queryTitle
            : 'title';
    }
}
if (false) {
    /** @type {?} */
    FeatureDataSource.prototype.options;
    /** @type {?} */
    FeatureDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2ZlYXR1cmUtZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFFdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUcxQyxNQUFNLE9BQU8saUJBQWtCLFNBQVEsVUFBVTs7Ozs7SUFHckMsY0FBYzs7Y0FDaEIsYUFBYSxHQUFHO1lBQ3BCLE1BQU0sRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUN0RDtRQUVELE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7Ozs7O0lBRVMsMEJBQTBCLENBQUMsT0FBaUM7UUFDcEUsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2xCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUN2Qjs7WUFDRyxXQUFXOztjQUNULFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVTtRQUNyQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7U0FDaEM7YUFBTTtZQUNMLFdBQVcsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO2dCQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7YUFDaEU7U0FDRjs7Y0FFSyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWE7O1lBQ3ZDLE1BQU07UUFDVixJQUFJLGFBQWEsRUFBRTtZQUNqQixNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNMLE1BQU0sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1NBQzVCO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7OztJQUVNLFNBQVMsS0FBSSxDQUFDOzs7O0lBRXJCLElBQUksVUFBVTtRQUNaLE9BQU8sQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxVQUFVO1lBQ3JDLENBQUMsQ0FBQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFVBQVU7WUFDbEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNkLENBQUM7Q0FDRjs7O0lBM0NDLG9DQUF5Qzs7SUFDekMsK0JBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlVmVjdG9yIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vZmVhdHVyZS1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgRmVhdHVyZURhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuICBwdWJsaWMgb3B0aW9uczogRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zO1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VWZWN0b3I7XHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlVmVjdG9yIHtcclxuICAgIGNvbnN0IHNvdXJjZU9wdGlvbnMgPSB7XHJcbiAgICAgIGZvcm1hdDogdGhpcy5nZXRTb3VyY2VGb3JtYXRGcm9tT3B0aW9ucyh0aGlzLm9wdGlvbnMpXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VWZWN0b3IoT2JqZWN0LmFzc2lnbihzb3VyY2VPcHRpb25zLCB0aGlzLm9wdGlvbnMpKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRTb3VyY2VGb3JtYXRGcm9tT3B0aW9ucyhvcHRpb25zOiBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zLmZvcm1hdCkge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucy5mb3JtYXQ7XHJcbiAgICB9XHJcbiAgICBsZXQgb2xGb3JtYXRDbHM7XHJcbiAgICBjb25zdCBmb3JtYXRUeXBlID0gb3B0aW9ucy5mb3JtYXRUeXBlO1xyXG4gICAgaWYgKCFmb3JtYXRUeXBlKSB7XHJcbiAgICAgIG9sRm9ybWF0Q2xzID0gb2xmb3JtYXQuR2VvSlNPTjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9sRm9ybWF0Q2xzID0gb2xmb3JtYXRbZm9ybWF0VHlwZV07XHJcbiAgICAgIGlmIChvbEZvcm1hdENscyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZlY3RvciBzb3VyY2UgZm9ybWF0ICR7Zm9ybWF0VHlwZX0uJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmb3JtYXRPcHRpb25zID0gb3B0aW9ucy5mb3JtYXRPcHRpb25zO1xyXG4gICAgbGV0IGZvcm1hdDtcclxuICAgIGlmIChmb3JtYXRPcHRpb25zKSB7XHJcbiAgICAgIGZvcm1hdCA9IG5ldyBvbEZvcm1hdENscyhmb3JtYXRPcHRpb25zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvcm1hdCA9IG5ldyBvbEZvcm1hdENscygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25VbndhdGNoKCkge31cclxuXHJcbiAgZ2V0IHF1ZXJ5VGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlUaXRsZVxyXG4gICAgICA/ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeVRpdGxlXHJcbiAgICAgIDogJ3RpdGxlJztcclxuICB9XHJcbn1cclxuIl19