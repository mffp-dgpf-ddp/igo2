/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { generateIdFromSourceOptions } from '../../utils/id-generator';
/**
 * @abstract
 */
export class DataSource {
    /**
     * @param {?=} options
     * @param {?=} dataService
     */
    constructor(options = {}, dataService) {
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
    generateId() {
        return generateIdFromSourceOptions(this.options);
    }
    /**
     * @param {?=} scale
     * @return {?}
     */
    getLegend(scale) {
        return this.options.legend ? [this.options.legend] : [];
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7OztBQUV2RSxNQUFNLE9BQWdCLFVBQVU7Ozs7O0lBSzlCLFlBQ1MsVUFBNkIsRUFBRSxFQUM1QixXQUF5QjtRQUQ1QixZQUFPLEdBQVAsT0FBTyxDQUF3QjtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUVuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUlTLFVBQVU7UUFDbEIsT0FBTywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsS0FBYztRQUN0QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0NBR0Y7OztJQXZCQyx3QkFBa0I7O0lBQ2xCLHdCQUFvQjs7SUFHbEIsNkJBQXNDOzs7OztJQUN0QyxpQ0FBbUM7Ozs7OztJQU9yQyxzREFBOEM7Ozs7OztJQVU5QyxpREFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2UgZnJvbSAnb2wvc291cmNlL1NvdXJjZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIERhdGFTb3VyY2VPcHRpb25zLFxyXG4gIERhdGFTb3VyY2VMZWdlbmRPcHRpb25zXHJcbn0gZnJvbSAnLi9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4vZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vdXRpbHMvaWQtZ2VuZXJhdG9yJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRhU291cmNlIHtcclxuXHJcbiAgcHVibGljIGlkOiBzdHJpbmc7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgb3B0aW9uczogRGF0YVNvdXJjZU9wdGlvbnMgPSB7fSxcclxuICAgIHByb3RlY3RlZCBkYXRhU2VydmljZT86IERhdGFTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgdGhpcy5pZCA9IHRoaXMub3B0aW9ucy5pZCB8fMKgdGhpcy5nZW5lcmF0ZUlkKCk7XHJcbiAgICB0aGlzLm9sID0gdGhpcy5jcmVhdGVPbFNvdXJjZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlO1xyXG5cclxuICBwcm90ZWN0ZWQgZ2VuZXJhdGVJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kKHNjYWxlPzogbnVtYmVyKTogRGF0YVNvdXJjZUxlZ2VuZE9wdGlvbnNbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmxlZ2VuZCA/IFt0aGlzLm9wdGlvbnMubGVnZW5kXSA6IFtdO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IG9uVW53YXRjaCgpO1xyXG59XHJcbiJdfQ==