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
        var mvtFormat;
        if (this.options.featureClass === 'feature') {
            mvtFormat = new olFormatMVT({ featureClass: feature });
        }
        else if (this.options.featureClass === undefined) {
            mvtFormat = new olFormatMVT();
        }
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
     * @return {?}
     */
    MVTDataSource.prototype.onUnwatch = /**
     * @return {?}
     */
    function () { };
    return MVTDataSource;
}(DataSource));
export { MVTDataSource };
if (false) {
    /** @type {?} */
    MVTDataSource.prototype.options;
    /** @type {?} */
    MVTDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXZ0LWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvbXZ0LWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzdCLE9BQU8sT0FBTyxNQUFNLFlBQVksQ0FBQztBQUNqQyxPQUFPLGtCQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUV4QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRW5DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHMUM7SUFBbUMseUNBQVU7SUFBN0M7O0lBd0JBLENBQUM7Ozs7O0lBcEJXLHNDQUFjOzs7O0lBQXhCOztZQUNNLFNBQVM7UUFDYixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtZQUMzQyxTQUFTLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBQyxZQUFZLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztTQUN0RDthQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQ2xELFNBQVMsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Ozs7SUFFUyxrQ0FBVTs7OztJQUFwQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNuQixPQUFPLElBQUksRUFBRSxDQUFDO1NBQ2pCOztZQUNLLEtBQUssR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO1FBQ3RDLE9BQU8sbUJBQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBVSxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFTSxpQ0FBUzs7O0lBQWhCLGNBQW9CLENBQUM7SUFDdkIsb0JBQUM7QUFBRCxDQUFDLEFBeEJELENBQW1DLFVBQVUsR0F3QjVDOzs7O0lBdkJDLGdDQUFxQzs7SUFDckMsMkJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWQ1IH0gZnJvbSAndHMtbWQ1JztcclxuaW1wb3J0IGZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBvbFNvdXJjZVZlY3RvclRpbGUgZnJvbSAnb2wvc291cmNlL1ZlY3RvclRpbGUnO1xyXG5pbXBvcnQgb2xGb3JtYXRNVlQgZnJvbSAnb2wvZm9ybWF0L01WVCc7XHJcblxyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IE1WVERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi9tdnQtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1WVERhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuICBwdWJsaWMgb3B0aW9uczogTVZURGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZVZlY3RvclRpbGU7XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZVZlY3RvclRpbGUge1xyXG4gICAgbGV0IG12dEZvcm1hdDtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZmVhdHVyZUNsYXNzID09PSAnZmVhdHVyZScpIHtcclxuICAgICAgbXZ0Rm9ybWF0ID0gbmV3IG9sRm9ybWF0TVZUKHtmZWF0dXJlQ2xhc3M6IGZlYXR1cmV9KTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmZlYXR1cmVDbGFzcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG12dEZvcm1hdCA9IG5ldyBvbEZvcm1hdE1WVCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vcHRpb25zLmZvcm1hdCA9IG12dEZvcm1hdDtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VWZWN0b3JUaWxlKHRoaXMub3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2VuZXJhdGVJZCgpIHtcclxuICAgIGlmICghdGhpcy5vcHRpb25zLnVybCkge1xyXG4gICAgICAgIHJldHVybiB1dWlkKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBjaGFpbiA9ICdtdnQnICsgdGhpcy5vcHRpb25zLnVybDtcclxuICAgIHJldHVybiBNZDUuaGFzaFN0cihjaGFpbikgYXMgc3RyaW5nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHt9XHJcbn1cclxuIl19