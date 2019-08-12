/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Md5 } from 'ts-md5';
import feature from 'ol/Feature';
import olSourceVectorTile from 'ol/source/VectorTile';
import olFormatMVT from 'ol/format/MVT';
import { uuid } from '@igo2/utils';
import { DataSource } from './datasource';
var MVTDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(MVTDataSource, _super);
    function MVTDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @protected
     * @return {?}
     */
    MVTDataSource.prototype.createOlSource = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var mvtFormat = new olFormatMVT({ featureClass: feature });
        this.options.format = mvtFormat;
        return new olSourceVectorTile(this.options);
    };
    /**
     * @protected
     * @return {?}
     */
    MVTDataSource.prototype.generateId = /**
     * @protected
     * @return {?}
     */
    function () {
        if (!this.options.url) {
            return uuid();
        }
        /** @type {?} */
        var chain = 'mvt' + this.options.url;
        return (/** @type {?} */ (Md5.hashStr(chain)));
    };
    /**
     * @param {?} status
     * @return {?}
     */
    MVTDataSource.prototype.onLayerStatusChange = /**
     * @param {?} status
     * @return {?}
     */
    function (status) { };
    return MVTDataSource;
}(DataSource));
export { MVTDataSource };
if (false) {
    /** @type {?} */
    MVTDataSource.prototype.ol;
    /** @type {?} */
    MVTDataSource.prototype.options;
    /** @type {?} */
    MVTDataSource.prototype.status;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXZ0LWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvbXZ0LWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzdCLE9BQU8sT0FBTyxNQUFNLFlBQVksQ0FBQztBQUNqQyxPQUFPLGtCQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUV4QyxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGFBQWEsQ0FBQztBQUVsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRzFDO0lBQW1DLHlDQUFVO0lBQTdDOztJQW1CQSxDQUFDOzs7OztJQWRXLHNDQUFjOzs7O0lBQXhCOztZQUNRLFNBQVMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFDLFlBQVksRUFBRSxPQUFPLEVBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDaEMsT0FBTyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7OztJQUVTLGtDQUFVOzs7O0lBQXBCO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ25CLE9BQU8sSUFBSSxFQUFFLENBQUM7U0FDakI7O1lBQ0ssS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7UUFDdEMsT0FBTyxtQkFBQSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFVLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFDRCwyQ0FBbUI7Ozs7SUFBbkIsVUFBb0IsTUFBcUIsSUFBUyxDQUFDO0lBQ3JELG9CQUFDO0FBQUQsQ0FBQyxBQW5CRCxDQUFtQyxVQUFVLEdBbUI1Qzs7OztJQWxCQywyQkFBOEI7O0lBQzlCLGdDQUFxQzs7SUFDckMsK0JBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWQ1IH0gZnJvbSAndHMtbWQ1JztcclxuaW1wb3J0IGZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBvbFNvdXJjZVZlY3RvclRpbGUgZnJvbSAnb2wvc291cmNlL1ZlY3RvclRpbGUnO1xyXG5pbXBvcnQgb2xGb3JtYXRNVlQgZnJvbSAnb2wvZm9ybWF0L01WVCc7XHJcblxyXG5pbXBvcnQgeyB1dWlkLCBTdWJqZWN0U3RhdHVzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IE1WVERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi9tdnQtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1WVERhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuICBwdWJsaWMgb2w6IG9sU291cmNlVmVjdG9yVGlsZTtcclxuICBwdWJsaWMgb3B0aW9uczogTVZURGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgcHVibGljIHN0YXR1czogYm9vbGVhbjtcclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlVmVjdG9yVGlsZSB7XHJcbiAgICBjb25zdCBtdnRGb3JtYXQgPSBuZXcgb2xGb3JtYXRNVlQoe2ZlYXR1cmVDbGFzczogZmVhdHVyZX0pO1xyXG4gICAgdGhpcy5vcHRpb25zLmZvcm1hdCA9IG12dEZvcm1hdDtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VWZWN0b3JUaWxlKHRoaXMub3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2VuZXJhdGVJZCgpIHtcclxuICAgIGlmICghdGhpcy5vcHRpb25zLnVybCkge1xyXG4gICAgICAgIHJldHVybiB1dWlkKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBjaGFpbiA9ICdtdnQnICsgdGhpcy5vcHRpb25zLnVybDtcclxuICAgIHJldHVybiBNZDUuaGFzaFN0cihjaGFpbikgYXMgc3RyaW5nO1xyXG4gIH1cclxuICBvbkxheWVyU3RhdHVzQ2hhbmdlKHN0YXR1czogU3ViamVjdFN0YXR1cyk6IHZvaWQge31cclxufVxyXG4iXX0=