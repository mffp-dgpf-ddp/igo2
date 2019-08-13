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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXZ0LWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvbXZ0LWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzdCLE9BQU8sT0FBTyxNQUFNLFlBQVksQ0FBQztBQUNqQyxPQUFPLGtCQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUV4QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRW5DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHMUM7SUFBbUMseUNBQVU7SUFBN0M7O0lBbUJBLENBQUM7Ozs7O0lBZlcsc0NBQWM7Ozs7SUFBeEI7O1lBQ1EsU0FBUyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUMsWUFBWSxFQUFFLE9BQU8sRUFBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUNoQyxPQUFPLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7O0lBRVMsa0NBQVU7Ozs7SUFBcEI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDbkIsT0FBTyxJQUFJLEVBQUUsQ0FBQztTQUNqQjs7WUFDSyxLQUFLLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztRQUN0QyxPQUFPLG1CQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQVUsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRU0saUNBQVM7OztJQUFoQixjQUFvQixDQUFDO0lBQ3ZCLG9CQUFDO0FBQUQsQ0FBQyxBQW5CRCxDQUFtQyxVQUFVLEdBbUI1Qzs7OztJQWxCQyxnQ0FBcUM7O0lBQ3JDLDJCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1kNSB9IGZyb20gJ3RzLW1kNSc7XHJcbmltcG9ydCBmZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgb2xTb3VyY2VWZWN0b3JUaWxlIGZyb20gJ29sL3NvdXJjZS9WZWN0b3JUaWxlJztcclxuaW1wb3J0IG9sRm9ybWF0TVZUIGZyb20gJ29sL2Zvcm1hdC9NVlQnO1xyXG5cclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBNVlREYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vbXZ0LWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNVlREYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcbiAgcHVibGljIG9wdGlvbnM6IE1WVERhdGFTb3VyY2VPcHRpb25zO1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VWZWN0b3JUaWxlO1xyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VWZWN0b3JUaWxlIHtcclxuICAgIGNvbnN0IG12dEZvcm1hdCA9IG5ldyBvbEZvcm1hdE1WVCh7ZmVhdHVyZUNsYXNzOiBmZWF0dXJlfSk7XHJcbiAgICB0aGlzLm9wdGlvbnMuZm9ybWF0ID0gbXZ0Rm9ybWF0O1xyXG4gICAgcmV0dXJuIG5ldyBvbFNvdXJjZVZlY3RvclRpbGUodGhpcy5vcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZW5lcmF0ZUlkKCkge1xyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMudXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHV1aWQoKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGNoYWluID0gJ212dCcgKyB0aGlzLm9wdGlvbnMudXJsO1xyXG4gICAgcmV0dXJuIE1kNS5oYXNoU3RyKGNoYWluKSBhcyBzdHJpbmc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25VbndhdGNoKCkge31cclxufVxyXG4iXX0=