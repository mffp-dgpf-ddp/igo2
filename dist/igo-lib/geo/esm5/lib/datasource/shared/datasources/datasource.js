/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { generateIdFromSourceOptions } from '../../utils/id-generator';
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
        this.id = this.generateId();
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
     * @param {?=} scale
     * @return {?}
     */
    DataSource.prototype.getLegend = /**
     * @param {?=} scale
     * @return {?}
     */
    function (scale) {
        return this.options.legend ? [this.options.legend] : [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7OztBQUV2RTs7OztJQUtFLG9CQUNTLE9BQStCLEVBQzVCLFdBQXlCO1FBRDVCLHdCQUFBLEVBQUEsWUFBK0I7UUFBL0IsWUFBTyxHQUFQLE9BQU8sQ0FBd0I7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFFbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFJUywrQkFBVTs7OztJQUFwQjtRQUNFLE9BQU8sMkJBQTJCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7O0lBRUQsOEJBQVM7Ozs7SUFBVCxVQUFVLEtBQWM7UUFDdEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVILGlCQUFDO0FBQUQsQ0FBQyxBQXhCRCxJQXdCQzs7Ozs7OztJQXRCQyx3QkFBa0I7O0lBQ2xCLHdCQUFvQjs7SUFHbEIsNkJBQXNDOzs7OztJQUN0QyxpQ0FBbUM7Ozs7OztJQU9yQyxzREFBOEM7Ozs7OztJQVM5QyxpREFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2UgZnJvbSAnb2wvc291cmNlL1NvdXJjZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIERhdGFTb3VyY2VPcHRpb25zLFxyXG4gIERhdGFTb3VyY2VMZWdlbmRPcHRpb25zXHJcbn0gZnJvbSAnLi9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4vZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vdXRpbHMvaWQtZ2VuZXJhdG9yJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRhU291cmNlIHtcclxuXHJcbiAgcHVibGljIGlkOiBzdHJpbmc7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgb3B0aW9uczogRGF0YVNvdXJjZU9wdGlvbnMgPSB7fSxcclxuICAgIHByb3RlY3RlZCBkYXRhU2VydmljZT86IERhdGFTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgdGhpcy5pZCA9IHRoaXMuZ2VuZXJhdGVJZCgpO1xyXG4gICAgdGhpcy5vbCA9IHRoaXMuY3JlYXRlT2xTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZTtcclxuXHJcbiAgcHJvdGVjdGVkIGdlbmVyYXRlSWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZW5lcmF0ZUlkRnJvbVNvdXJjZU9wdGlvbnModGhpcy5vcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGdldExlZ2VuZChzY2FsZT86IG51bWJlcik6IERhdGFTb3VyY2VMZWdlbmRPcHRpb25zW10ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5sZWdlbmQgPyBbdGhpcy5vcHRpb25zLmxlZ2VuZF0gOiBbXTtcclxuICB9XHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IG9uVW53YXRjaCgpO1xyXG59XHJcbiJdfQ==