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
    /**
     * @return {?}
     */
    XYZDataSource.prototype.onUnwatch = /**
     * @return {?}
     */
    function () { };
    return XYZDataSource;
}(DataSource));
export { XYZDataSource };
if (false) {
    /** @type {?} */
    XYZDataSource.prototype.options;
    /** @type {?} */
    XYZDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHl6LWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMveHl6LWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUcxQztJQUFtQyx5Q0FBVTtJQUE3Qzs7SUFVQSxDQUFDOzs7OztJQU5XLHNDQUFjOzs7O0lBQXhCO1FBQ0UsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVNLGlDQUFTOzs7SUFBaEIsY0FBb0IsQ0FBQztJQUV2QixvQkFBQztBQUFELENBQUMsQUFWRCxDQUFtQyxVQUFVLEdBVTVDOzs7O0lBVEMsZ0NBQXFDOztJQUNyQywyQkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VYWVogZnJvbSAnb2wvc291cmNlL1hZWic7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgWFlaRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL3h5ei1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgWFlaRGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvcHRpb25zOiBYWVpEYXRhU291cmNlT3B0aW9ucztcclxuICBwdWJsaWMgb2w6IG9sU291cmNlWFlaO1xyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VYWVoge1xyXG4gICAgcmV0dXJuIG5ldyBvbFNvdXJjZVhZWih0aGlzLm9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHt9XHJcblxyXG59XHJcbiJdfQ==