/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Md5 } from 'ts-md5';
import feature from 'ol/Feature';
import olSourceVectorTile from 'ol/source/VectorTile';
import olFormatMVT from 'ol/format/MVT';
import { uuid } from '@igo2/utils';
import { DataSource } from './datasource';
export class MVTDataSource extends DataSource {
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        /** @type {?} */
        const mvtFormat = new olFormatMVT({ featureClass: feature });
        this.options.format = mvtFormat;
        return new olSourceVectorTile(this.options);
    }
    /**
     * @protected
     * @return {?}
     */
    generateId() {
        if (!this.options.url) {
            return uuid();
        }
        /** @type {?} */
        const chain = 'mvt' + this.options.url;
        return (/** @type {?} */ (Md5.hashStr(chain)));
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}
if (false) {
    /** @type {?} */
    MVTDataSource.prototype.options;
    /** @type {?} */
    MVTDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXZ0LWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvbXZ0LWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDN0IsT0FBTyxPQUFPLE1BQU0sWUFBWSxDQUFDO0FBQ2pDLE9BQU8sa0JBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbkMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUcxQyxNQUFNLE9BQU8sYUFBYyxTQUFRLFVBQVU7Ozs7O0lBSWpDLGNBQWM7O2NBQ2hCLFNBQVMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFDLFlBQVksRUFBRSxPQUFPLEVBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDaEMsT0FBTyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7OztJQUVTLFVBQVU7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ25CLE9BQU8sSUFBSSxFQUFFLENBQUM7U0FDakI7O2NBQ0ssS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7UUFDdEMsT0FBTyxtQkFBQSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFVLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVNLFNBQVMsS0FBSSxDQUFDO0NBQ3RCOzs7SUFsQkMsZ0NBQXFDOztJQUNyQywyQkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZDUgfSBmcm9tICd0cy1tZDUnO1xyXG5pbXBvcnQgZmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IG9sU291cmNlVmVjdG9yVGlsZSBmcm9tICdvbC9zb3VyY2UvVmVjdG9yVGlsZSc7XHJcbmltcG9ydCBvbEZvcm1hdE1WVCBmcm9tICdvbC9mb3JtYXQvTVZUJztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgTVZURGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL212dC1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTVZURGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvcHRpb25zOiBNVlREYXRhU291cmNlT3B0aW9ucztcclxuICBwdWJsaWMgb2w6IG9sU291cmNlVmVjdG9yVGlsZTtcclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlVmVjdG9yVGlsZSB7XHJcbiAgICBjb25zdCBtdnRGb3JtYXQgPSBuZXcgb2xGb3JtYXRNVlQoe2ZlYXR1cmVDbGFzczogZmVhdHVyZX0pO1xyXG4gICAgdGhpcy5vcHRpb25zLmZvcm1hdCA9IG12dEZvcm1hdDtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VWZWN0b3JUaWxlKHRoaXMub3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2VuZXJhdGVJZCgpIHtcclxuICAgIGlmICghdGhpcy5vcHRpb25zLnVybCkge1xyXG4gICAgICAgIHJldHVybiB1dWlkKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBjaGFpbiA9ICdtdnQnICsgdGhpcy5vcHRpb25zLnVybDtcclxuICAgIHJldHVybiBNZDUuaGFzaFN0cihjaGFpbikgYXMgc3RyaW5nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHt9XHJcbn1cclxuIl19