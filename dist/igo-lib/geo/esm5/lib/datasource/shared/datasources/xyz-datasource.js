/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olSourceXYZ from 'ol/source/XYZ';
import { DataSource } from './datasource';
var XYZDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(XYZDataSource, _super);
    function XYZDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @protected
     * @return {?}
     */
    XYZDataSource.prototype.createOlSource = /**
     * @protected
     * @return {?}
     */
    function () {
        return new olSourceXYZ(this.options);
    };
    return XYZDataSource;
}(DataSource));
export { XYZDataSource };
if (false) {
    /** @type {?} */
    XYZDataSource.prototype.options;
    /** @type {?} */
    XYZDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHl6LWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMveHl6LWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUcxQztJQUFtQyx5Q0FBVTtJQUE3Qzs7SUFRQSxDQUFDOzs7OztJQUpXLHNDQUFjOzs7O0lBQXhCO1FBQ0UsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVILG9CQUFDO0FBQUQsQ0FBQyxBQVJELENBQW1DLFVBQVUsR0FRNUM7Ozs7SUFQQyxnQ0FBcUM7O0lBQ3JDLDJCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZVhZWiBmcm9tICdvbC9zb3VyY2UvWFlaJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBYWVpEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4veHl6LWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBYWVpEYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcbiAgcHVibGljIG9wdGlvbnM6IFhZWkRhdGFTb3VyY2VPcHRpb25zO1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VYWVo7XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZVhZWiB7XHJcbiAgICByZXR1cm4gbmV3IG9sU291cmNlWFlaKHRoaXMub3B0aW9ucyk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=