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
    /**
     * @return {?}
     */
    OSMDataSource.prototype.onUnwatch = /**
     * @return {?}
     */
    function () { };
    return OSMDataSource;
}(DataSource));
export { OSMDataSource };
if (false) {
    /** @type {?} */
    OSMDataSource.prototype.options;
    /** @type {?} */
    OSMDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NtLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvb3NtLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUcxQztJQUFtQyx5Q0FBVTtJQUE3Qzs7SUFVQSxDQUFDOzs7OztJQU5XLHNDQUFjOzs7O0lBQXhCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsZ0RBQWdELENBQUM7UUFDcEUsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVNLGlDQUFTOzs7SUFBaEIsY0FBb0IsQ0FBQztJQUN2QixvQkFBQztBQUFELENBQUMsQUFWRCxDQUFtQyxVQUFVLEdBVTVDOzs7O0lBVEMsZ0NBQXFDOztJQUNyQywyQkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTSc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgT1NNRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL29zbS1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgT1NNRGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvcHRpb25zOiBPU01EYXRhU291cmNlT3B0aW9ucztcclxuICBwdWJsaWMgb2w6IG9sU291cmNlT1NNO1xyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VPU00ge1xyXG4gICAgdGhpcy5vcHRpb25zLnVybCA9ICdodHRwczovL3RpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJztcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VPU00odGhpcy5vcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblVud2F0Y2goKSB7fVxyXG59XHJcbiJdfQ==