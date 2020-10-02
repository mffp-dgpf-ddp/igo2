/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { generateIdFromSourceOptions } from '../../../utils/id-generator';
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
     * @param {?=} style
     * @param {?=} scale
     * @return {?}
     */
    getLegend(style, scale) {
        return this.legend ? this.legend : [];
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setLegend(options) {
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7OztBQUcxRSxNQUFNLE9BQWdCLFVBQVU7Ozs7O0lBTTlCLFlBQ1MsVUFBNkIsRUFBRSxFQUM1QixXQUF5QjtRQUQ1QixZQUFPLEdBQVAsT0FBTyxDQUF3QjtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUVuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUlTLFVBQVU7UUFDbEIsT0FBTywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Ozs7O0lBRU0sU0FBUyxDQUFDLEtBQWMsRUFBRSxLQUFjO1FBQzdDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3hDLENBQUM7Ozs7O0lBRU0sU0FBUyxDQUFDLE9BQXNCO1FBQ3JDLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFDLENBQUUsQ0FBQztTQUN0QzthQUFNLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBQyxDQUFFLENBQUM7U0FDeEM7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Q0FHRjs7O0lBcENDLHdCQUFrQjs7SUFDbEIsd0JBQW9COzs7OztJQUNwQiw0QkFBeUI7O0lBR3ZCLDZCQUFzQzs7Ozs7SUFDdEMsaUNBQW1DOzs7Ozs7SUFPckMsc0RBQThDOzs7Ozs7SUFzQjlDLGlEQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZSBmcm9tICdvbC9zb3VyY2UvU291cmNlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgTGVnZW5kXHJcbn0gZnJvbSAnLi9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4vZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaWQtZ2VuZXJhdG9yJztcclxuaW1wb3J0IHsgTGVnZW5kT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL2xheWVyJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRhU291cmNlIHtcclxuXHJcbiAgcHVibGljIGlkOiBzdHJpbmc7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZTtcclxuICBwcml2YXRlIGxlZ2VuZDogTGVnZW5kW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIG9wdGlvbnM6IERhdGFTb3VyY2VPcHRpb25zID0ge30sXHJcbiAgICBwcm90ZWN0ZWQgZGF0YVNlcnZpY2U/OiBEYXRhU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgIHRoaXMuaWQgPSB0aGlzLm9wdGlvbnMuaWQgfHzCoHRoaXMuZ2VuZXJhdGVJZCgpO1xyXG4gICAgdGhpcy5vbCA9IHRoaXMuY3JlYXRlT2xTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZTtcclxuXHJcbiAgcHJvdGVjdGVkIGdlbmVyYXRlSWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZW5lcmF0ZUlkRnJvbVNvdXJjZU9wdGlvbnModGhpcy5vcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMZWdlbmQoc3R5bGU/OiBzdHJpbmcsIHNjYWxlPzogbnVtYmVyKTogTGVnZW5kW10ge1xyXG4gICAgcmV0dXJuIHRoaXMubGVnZW5kID8gdGhpcy5sZWdlbmQgOiBbXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRMZWdlbmQob3B0aW9uczogTGVnZW5kT3B0aW9ucyk6IExlZ2VuZFtdIHtcclxuICAgIGlmIChvcHRpb25zLnVybCkge1xyXG4gICAgICB0aGlzLmxlZ2VuZCA9IFt7IHVybDogb3B0aW9ucy51cmx9IF07XHJcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuaHRtbCkge1xyXG4gICAgICB0aGlzLmxlZ2VuZCA9IFt7IGh0bWw6IG9wdGlvbnMuaHRtbH0gXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubGVnZW5kID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubGVnZW5kO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IG9uVW53YXRjaCgpO1xyXG59XHJcbiJdfQ==