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
    function DataSource(options, networkService, dataService) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.networkService = networkService;
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
    /**
     * @param {?} status
     * @return {?}
     */
    DataSource.prototype.onLayerStatusChange = /**
     * @param {?} status
     * @return {?}
     */
    function (status) { };
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
    DataSource.prototype.networkService;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFTQSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7OztBQU12RTs7OztJQU1FLG9CQUNTLE9BQStCLEVBQzVCLGNBQStCLEVBQy9CLFdBQXlCO1FBRjVCLHdCQUFBLEVBQUEsWUFBK0I7UUFBL0IsWUFBTyxHQUFQLE9BQU8sQ0FBd0I7UUFDNUIsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBQy9CLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1FBRW5DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBSVMsK0JBQVU7Ozs7SUFBcEI7UUFDRSxPQUFPLDJCQUEyQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7OztJQUVELDhCQUFTOzs7O0lBQVQsVUFBVSxLQUFjO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzFELENBQUM7Ozs7O0lBRUQsd0NBQW1COzs7O0lBQW5CLFVBQW9CLE1BQXFCLElBQVMsQ0FBQztJQUNyRCxpQkFBQztBQUFELENBQUMsQUEzQkQsSUEyQkM7Ozs7Ozs7SUF4QkMsd0JBQWtCOztJQUNsQix3QkFBb0I7O0lBR2xCLDZCQUFzQzs7Ozs7SUFDdEMsb0NBQXlDOzs7OztJQUN6QyxpQ0FBbUM7Ozs7OztJQU9yQyxzREFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2UgZnJvbSAnb2wvc291cmNlL1NvdXJjZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJqZWN0U3RhdHVzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQge1xyXG4gIERhdGFTb3VyY2VPcHRpb25zLFxyXG4gIERhdGFTb3VyY2VMZWdlbmRPcHRpb25zXHJcbn0gZnJvbSAnLi9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4vZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZ2VuZXJhdGVJZEZyb21Tb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vdXRpbHMvaWQtZ2VuZXJhdG9yJztcclxuXHJcbmltcG9ydCB7IE5ldHdvcmtTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IE1WVERhdGFTb3VyY2UgfSBmcm9tICcuL212dC1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0YVNvdXJjZSB7XHJcbiAgLy8gQFZpZXdDaGlsZChNVlREYXRhU291cmNlKSBjaGlsZDogTVZURGF0YVNvdXJjZTtcclxuXHJcbiAgcHVibGljIGlkOiBzdHJpbmc7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgb3B0aW9uczogRGF0YVNvdXJjZU9wdGlvbnMgPSB7fSxcclxuICAgIHByb3RlY3RlZCBuZXR3b3JrU2VydmljZT86IE5ldHdvcmtTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIGRhdGFTZXJ2aWNlPzogRGF0YVNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB0aGlzLmlkID0gdGhpcy5nZW5lcmF0ZUlkKCk7XHJcbiAgICB0aGlzLm9sID0gdGhpcy5jcmVhdGVPbFNvdXJjZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlO1xyXG5cclxuICBwcm90ZWN0ZWQgZ2VuZXJhdGVJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kKHNjYWxlPzogbnVtYmVyKTogRGF0YVNvdXJjZUxlZ2VuZE9wdGlvbnNbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmxlZ2VuZCA/IFt0aGlzLm9wdGlvbnMubGVnZW5kXSA6IFtdO1xyXG4gIH1cclxuXHJcbiAgb25MYXllclN0YXR1c0NoYW5nZShzdGF0dXM6IFN1YmplY3RTdGF0dXMpOiB2b2lkIHt9XHJcbn1cclxuIl19