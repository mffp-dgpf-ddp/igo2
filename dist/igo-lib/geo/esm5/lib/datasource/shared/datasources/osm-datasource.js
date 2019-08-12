/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olSourceOSM from 'ol/source/OSM';
import { DataSource } from './datasource';
var OSMDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(OSMDataSource, _super);
    function OSMDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @protected
     * @return {?}
     */
    OSMDataSource.prototype.createOlSource = /**
     * @protected
     * @return {?}
     */
    function () {
        this.options.url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
        return new olSourceOSM(this.options);
    };
    return OSMDataSource;
}(DataSource));
export { OSMDataSource };
if (false) {
    /** @type {?} */
    OSMDataSource.prototype.options;
    /** @type {?} */
    OSMDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NtLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvb3NtLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUcxQztJQUFtQyx5Q0FBVTtJQUE3Qzs7SUFRQSxDQUFDOzs7OztJQUpXLHNDQUFjOzs7O0lBQXhCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsZ0RBQWdELENBQUM7UUFDcEUsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQVJELENBQW1DLFVBQVUsR0FRNUM7Ozs7SUFQQyxnQ0FBcUM7O0lBQ3JDLDJCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBPU01EYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vb3NtLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBPU01EYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcbiAgcHVibGljIG9wdGlvbnM6IE9TTURhdGFTb3VyY2VPcHRpb25zO1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VPU007XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZU9TTSB7XHJcbiAgICB0aGlzLm9wdGlvbnMudXJsID0gJ2h0dHBzOi8vdGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnO1xyXG4gICAgcmV0dXJuIG5ldyBvbFNvdXJjZU9TTSh0aGlzLm9wdGlvbnMpO1xyXG4gIH1cclxufVxyXG4iXX0=