/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { generateIdFromSourceOptions } from '../../../utils/id-generator';
/**
 * @abstract
 */
var /**
 * @abstract
 */
DataSource = /** @class */ (function () {
    function DataSource(options, dataService) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.dataService = dataService;
        this.options = options;
        this.id = this.options.id || this.generateId();
        this.ol = this.createOlSource();
    }
    /**
     * @protected
     * @return {?}
     */
    DataSource.prototype.generateId = /**
     * @protected
     * @return {?}
     */
    function () {
        return generateIdFromSourceOptions(this.options);
    };
    /**
     * @param {?=} style
     * @param {?=} scale
     * @return {?}
     */
    DataSource.prototype.getLegend = /**
     * @param {?=} style
     * @param {?=} scale
     * @return {?}
     */
    function (style, scale) {
        return this.legend ? this.legend : [];
    };
    /**
     * @param {?} options
     * @return {?}
     */
    DataSource.prototype.setLegend = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        if (options.url) {
            this.legend = [{ url: options.url }];
        }
        else if (options.html) {
            this.legend = [{ html: options.html }];
        }
        else {
            this.legend = [];
        }
        return this.legend;
    };
    return DataSource;
}());
/**
 * @abstract
 */
export { DataSource };
if (false) {
    /** @type {?} */
    DataSource.prototype.id;
    /** @type {?} */
    DataSource.prototype.ol;
    /**
     * @type {?}
     * @private
     */
    DataSource.prototype.legend;
    /** @type {?} */
    DataSource.prototype.options;
    /**
     * @type {?}
     * @protected
     */
    DataSource.prototype.dataService;
    /**
     * @abstract
     * @protected
     * @return {?}
     */
    DataSource.prototype.createOlSource = function () { };
    /**
     * @abstract
     * @protected
     * @return {?}
     */
    DataSource.prototype.onUnwatch = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7OztBQUcxRTs7OztJQU1FLG9CQUNTLE9BQStCLEVBQzVCLFdBQXlCO1FBRDVCLHdCQUFBLEVBQUEsWUFBK0I7UUFBL0IsWUFBTyxHQUFQLE9BQU8sQ0FBd0I7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFFbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFJUywrQkFBVTs7OztJQUFwQjtRQUNFLE9BQU8sMkJBQTJCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7OztJQUVNLDhCQUFTOzs7OztJQUFoQixVQUFpQixLQUFjLEVBQUUsS0FBYztRQUM3QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN4QyxDQUFDOzs7OztJQUVNLDhCQUFTOzs7O0lBQWhCLFVBQWlCLE9BQXNCO1FBQ3JDLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFDLENBQUUsQ0FBQztTQUN0QzthQUFNLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBQyxDQUFFLENBQUM7U0FDeEM7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFHSCxpQkFBQztBQUFELENBQUMsQUF0Q0QsSUFzQ0M7Ozs7Ozs7SUFwQ0Msd0JBQWtCOztJQUNsQix3QkFBb0I7Ozs7O0lBQ3BCLDRCQUF5Qjs7SUFHdkIsNkJBQXNDOzs7OztJQUN0QyxpQ0FBbUM7Ozs7OztJQU9yQyxzREFBOEM7Ozs7OztJQXNCOUMsaURBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlIGZyb20gJ29sL3NvdXJjZS9Tb3VyY2UnO1xyXG5cclxuaW1wb3J0IHtcclxuICBEYXRhU291cmNlT3B0aW9ucyxcclxuICBMZWdlbmRcclxufSBmcm9tICcuL2RhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBnZW5lcmF0ZUlkRnJvbVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pZC1nZW5lcmF0b3InO1xyXG5pbXBvcnQgeyBMZWdlbmRPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vbGF5ZXInO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGFTb3VyY2Uge1xyXG5cclxuICBwdWJsaWMgaWQ6IHN0cmluZztcclxuICBwdWJsaWMgb2w6IG9sU291cmNlO1xyXG4gIHByaXZhdGUgbGVnZW5kOiBMZWdlbmRbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgb3B0aW9uczogRGF0YVNvdXJjZU9wdGlvbnMgPSB7fSxcclxuICAgIHByb3RlY3RlZCBkYXRhU2VydmljZT86IERhdGFTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgdGhpcy5pZCA9IHRoaXMub3B0aW9ucy5pZCB8fMKgdGhpcy5nZW5lcmF0ZUlkKCk7XHJcbiAgICB0aGlzLm9sID0gdGhpcy5jcmVhdGVPbFNvdXJjZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlO1xyXG5cclxuICBwcm90ZWN0ZWQgZ2VuZXJhdGVJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldExlZ2VuZChzdHlsZT86IHN0cmluZywgc2NhbGU/OiBudW1iZXIpOiBMZWdlbmRbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5sZWdlbmQgPyB0aGlzLmxlZ2VuZCA6IFtdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldExlZ2VuZChvcHRpb25zOiBMZWdlbmRPcHRpb25zKTogTGVnZW5kW10ge1xyXG4gICAgaWYgKG9wdGlvbnMudXJsKSB7XHJcbiAgICAgIHRoaXMubGVnZW5kID0gW3sgdXJsOiBvcHRpb25zLnVybH0gXTtcclxuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5odG1sKSB7XHJcbiAgICAgIHRoaXMubGVnZW5kID0gW3sgaHRtbDogb3B0aW9ucy5odG1sfSBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sZWdlbmQgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5sZWdlbmQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYWJzdHJhY3Qgb25VbndhdGNoKCk7XHJcbn1cclxuIl19