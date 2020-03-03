/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { TypeCatalog } from './catalog.enum';
/**
 * @abstract
 */
var /**
 * @abstract
 */
Catalog = /** @class */ (function () {
    function Catalog(options, service) {
        Object.assign(this, options);
        this.catalogService = service;
    }
    return Catalog;
}());
/**
 * @abstract
 */
export { Catalog };
if (false) {
    /** @type {?} */
    Catalog.prototype.id;
    /** @type {?} */
    Catalog.prototype.title;
    /** @type {?} */
    Catalog.prototype.url;
    /** @type {?} */
    Catalog.prototype.items;
    /** @type {?} */
    Catalog.prototype.type;
    /** @type {?} */
    Catalog.prototype.version;
    /** @type {?} */
    Catalog.prototype.matrixSet;
    /** @type {?} */
    Catalog.prototype.requestEncoding;
    /** @type {?} */
    Catalog.prototype.regFilters;
    /** @type {?} */
    Catalog.prototype.groupImpose;
    /** @type {?} */
    Catalog.prototype.timeFilter;
    /** @type {?} */
    Catalog.prototype.queryFormat;
    /** @type {?} */
    Catalog.prototype.queryHtmlTarget;
    /** @type {?} */
    Catalog.prototype.queryParams;
    /** @type {?} */
    Catalog.prototype.sourceOptions;
    /** @type {?} */
    Catalog.prototype.count;
    /** @type {?} */
    Catalog.prototype.tooltipType;
    /** @type {?} */
    Catalog.prototype.sortDirection;
    /** @type {?} */
    Catalog.prototype.setCrossOriginAnonymous;
    /** @type {?} */
    Catalog.prototype.showLegend;
    /**
     * @type {?}
     * @protected
     */
    Catalog.prototype.catalogService;
    /**
     * @abstract
     * @return {?}
     */
    Catalog.prototype.collectCatalogItems = function () { };
}
var WMSCatalog = /** @class */ (function (_super) {
    tslib_1.__extends(WMSCatalog, _super);
    function WMSCatalog(options, service) {
        var _this = _super.call(this, options, service) || this;
        /** @type {?} */
        var sType = TypeCatalog[TypeCatalog.wms];
        _this.type = TypeCatalog[sType];
        return _this;
    }
    /**
     * @return {?}
     */
    WMSCatalog.prototype.collectCatalogItems = /**
     * @return {?}
     */
    function () {
        return this.catalogService.loadCatalogWMSLayerItems(this);
    };
    return WMSCatalog;
}(Catalog));
var WMTSCatalog = /** @class */ (function (_super) {
    tslib_1.__extends(WMTSCatalog, _super);
    function WMTSCatalog(options, service) {
        var _this = _super.call(this, options, service) || this;
        /** @type {?} */
        var sType = TypeCatalog[TypeCatalog.wmts];
        _this.type = TypeCatalog[sType];
        return _this;
    }
    /**
     * @return {?}
     */
    WMTSCatalog.prototype.collectCatalogItems = /**
     * @return {?}
     */
    function () {
        return this.catalogService.loadCatalogWMTSLayerItems(this);
    };
    return WMTSCatalog;
}(Catalog));
var BaselayersCatalog = /** @class */ (function (_super) {
    tslib_1.__extends(BaselayersCatalog, _super);
    function BaselayersCatalog(options, service) {
        var _this = _super.call(this, options, service) || this;
        /** @type {?} */
        var sType = TypeCatalog[TypeCatalog.baselayers];
        _this.type = TypeCatalog[sType];
        return _this;
    }
    /**
     * @return {?}
     */
    BaselayersCatalog.prototype.collectCatalogItems = /**
     * @return {?}
     */
    function () {
        return this.catalogService.loadCatalogBaseLayerItems(this);
    };
    return BaselayersCatalog;
}(Catalog));
var CompositeCatalog = /** @class */ (function (_super) {
    tslib_1.__extends(CompositeCatalog, _super);
    function CompositeCatalog(options, service) {
        var _this = _super.call(this, options, service) || this;
        /** @type {?} */
        var sType = TypeCatalog[TypeCatalog.composite];
        _this.type = TypeCatalog[sType];
        _this.url = null;
        return _this;
    }
    /**
     * @return {?}
     */
    CompositeCatalog.prototype.collectCatalogItems = /**
     * @return {?}
     */
    function () {
        return this.catalogService.loadCatalogCompositeLayerItems(this);
    };
    return CompositeCatalog;
}(Catalog));
export { CompositeCatalog };
if (false) {
    /** @type {?} */
    CompositeCatalog.prototype.composite;
}
var CatalogFactory = /** @class */ (function () {
    function CatalogFactory() {
    }
    /**
     * @param {?} options
     * @param {?} service
     * @return {?}
     */
    CatalogFactory.createInstanceCatalog = /**
     * @param {?} options
     * @param {?} service
     * @return {?}
     */
    function (options, service) {
        /** @type {?} */
        var catalog;
        if (options.hasOwnProperty('composite')) {
            catalog = new CompositeCatalog(options, service);
        }
        else if (options.type === TypeCatalog[TypeCatalog.baselayers]) {
            catalog = new BaselayersCatalog(options, service);
        }
        else if (options.type === TypeCatalog[TypeCatalog.wmts]) {
            catalog = new WMTSCatalog(options, service);
        }
        else {
            catalog = new WMSCatalog(options, service);
        }
        return catalog;
    };
    return CatalogFactory;
}());
export { CatalogFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5hYnN0cmFjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL3NoYXJlZC9jYXRhbG9nLmFic3RyYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsT0FBTyxFQUFFLFdBQVcsRUFBc0IsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUVqRTs7OztJQTJCSSxpQkFBWSxPQUFnQixFQUFFLE9BQXVCO1FBQ2pELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO0lBQ2xDLENBQUM7SUFHTCxjQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQzs7Ozs7OztJQTlCRyxxQkFBVzs7SUFDWCx3QkFBYzs7SUFDZCxzQkFBWTs7SUFDWix3QkFBc0I7O0lBQ3RCLHVCQUEwQjs7SUFDMUIsMEJBQWlCOztJQUNqQiw0QkFBbUI7O0lBQ25CLGtDQUF5Qjs7SUFDekIsNkJBQXNCOztJQUN0Qiw4QkFBK0I7O0lBQy9CLDZCQUErQjs7SUFDL0IsOEJBQTBCOztJQUMxQixrQ0FBa0M7O0lBQ2xDLDhCQUF5Qzs7SUFDekMsZ0NBQXdDOztJQUN4Qyx3QkFBZTs7SUFDZiw4QkFBdUQ7O0lBQ3ZELGdDQUErQjs7SUFDL0IsMENBQWtDOztJQUNsQyw2QkFBcUI7Ozs7O0lBR3JCLGlDQUF5Qzs7Ozs7SUFPekMsd0RBQWlFOztBQUdyRTtJQUF5QixzQ0FBTztJQUM1QixvQkFBWSxPQUFnQixFQUFFLE9BQXVCO1FBQXJELFlBQ0ksa0JBQU0sT0FBTyxFQUFFLE9BQU8sQ0FBQyxTQUcxQjs7WUFGUyxLQUFLLEdBQVcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDbEQsS0FBSSxDQUFDLElBQUksR0FBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7O0lBQ3BDLENBQUM7Ozs7SUFFTSx3Q0FBbUI7OztJQUEx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blxyXG5pbXBvcnQgeyBUb29sdGlwVHlwZSB9IGZyb20gJy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgVGltZUZpbHRlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9maWx0ZXInO1xyXG5pbXBvcnQgeyBRdWVyeUZvcm1hdCwgUXVlcnlIdG1sVGFyZ2V0ICB9IGZyb20gJy4uLy4uL3F1ZXJ5JztcclxuXHJcbmltcG9ydCB7IElDYXRhbG9nLCBJQ29tcG9zaXRlQ2F0YWxvZyAsIENhdGFsb2dJdGVtLCBDYXRhbG9nSXRlbUdyb3VwIH0gZnJvbSAnLi9jYXRhbG9nLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IENhdGFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9jYXRhbG9nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUeXBlQ2F0YWxvZywgVHlwZUNhdGFsb2dTdHJpbmdzIH0gZnJvbSAnLi9jYXRhbG9nLmVudW0nO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENhdGFsb2cgaW1wbGVtZW50cyBJQ2F0YWxvZyB7XHJcblxyXG4gICAgLy8gSUNhdGFsb2cgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgdXJsOiBzdHJpbmc7XHJcbiAgICBpdGVtcz86IENhdGFsb2dJdGVtW107XHJcbiAgICB0eXBlPzogVHlwZUNhdGFsb2dTdHJpbmdzO1xyXG4gICAgdmVyc2lvbj86IHN0cmluZztcclxuICAgIG1hdHJpeFNldD86IHN0cmluZztcclxuICAgIHJlcXVlc3RFbmNvZGluZz86IHN0cmluZztcclxuICAgIHJlZ0ZpbHRlcnM/OiBzdHJpbmdbXTtcclxuICAgIGdyb3VwSW1wb3NlPzogQ2F0YWxvZ0l0ZW1Hcm91cDtcclxuICAgIHRpbWVGaWx0ZXI/OiBUaW1lRmlsdGVyT3B0aW9ucztcclxuICAgIHF1ZXJ5Rm9ybWF0PzogUXVlcnlGb3JtYXQ7XHJcbiAgICBxdWVyeUh0bWxUYXJnZXQ/OiBRdWVyeUh0bWxUYXJnZXQ7XHJcbiAgICBxdWVyeVBhcmFtcz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nOyB9O1xyXG4gICAgc291cmNlT3B0aW9ucz86IHsgW2tleTogc3RyaW5nXTogYW55OyB9O1xyXG4gICAgY291bnQ/OiBudW1iZXI7XHJcbiAgICB0b29sdGlwVHlwZT86IFRvb2x0aXBUeXBlLkFCU1RSQUNUIHwgVG9vbHRpcFR5cGUuVElUTEU7XHJcbiAgICBzb3J0RGlyZWN0aW9uPzogJ2FzYycgfCAnZGVzYyc7XHJcbiAgICBzZXRDcm9zc09yaWdpbkFub255bW91cz86IGJvb2xlYW47XHJcbiAgICBzaG93TGVnZW5kPzogYm9vbGVhbjtcclxuICAgIC8vIElDYXRhbG9nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgcHJvdGVjdGVkIGNhdGFsb2dTZXJ2aWNlOiBDYXRhbG9nU2VydmljZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBDYXRhbG9nLCBzZXJ2aWNlOiBDYXRhbG9nU2VydmljZSkge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5jYXRhbG9nU2VydmljZSA9IHNlcnZpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGNvbGxlY3RDYXRhbG9nSXRlbXMoKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbVtdPjtcclxufVxyXG5cclxuY2xhc3MgV01TQ2F0YWxvZyBleHRlbmRzIENhdGFsb2cge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQ2F0YWxvZywgc2VydmljZTogQ2F0YWxvZ1NlcnZpY2UpIHtcclxuICAgICAgICBzdXBlcihvcHRpb25zLCBzZXJ2aWNlKTtcclxuICAgICAgICBjb25zdCBzVHlwZTogc3RyaW5nID0gVHlwZUNhdGFsb2dbVHlwZUNhdGFsb2cud21zXTtcclxuICAgICAgICB0aGlzLnR5cGUgPSAgVHlwZUNhdGFsb2dbc1R5cGVdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb2xsZWN0Q2F0YWxvZ0l0ZW1zKCk6IE9ic2VydmFibGU8Q2F0YWxvZ0l0ZW1bXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhdGFsb2dTZXJ2aWNlLmxvYWRDYXRhbG9nV01TTGF5ZXJJdGVtcyh0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgV01UU0NhdGFsb2cgZXh0ZW5kcyBDYXRhbG9nIHtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IENhdGFsb2csIHNlcnZpY2U6IENhdGFsb2dTZXJ2aWNlKSB7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucywgc2VydmljZSk7XHJcbiAgICAgICAgY29uc3Qgc1R5cGU6IHN0cmluZyA9IFR5cGVDYXRhbG9nW1R5cGVDYXRhbG9nLndtdHNdO1xyXG4gICAgICAgIHRoaXMudHlwZSA9ICBUeXBlQ2F0YWxvZ1tzVHlwZV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbGxlY3RDYXRhbG9nSXRlbXMoKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbVtdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2F0YWxvZ1NlcnZpY2UubG9hZENhdGFsb2dXTVRTTGF5ZXJJdGVtcyh0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQmFzZWxheWVyc0NhdGFsb2cgZXh0ZW5kcyBDYXRhbG9nIHtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IENhdGFsb2csIHNlcnZpY2U6IENhdGFsb2dTZXJ2aWNlKSB7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucywgc2VydmljZSk7XHJcbiAgICAgICAgY29uc3Qgc1R5cGU6IHN0cmluZyA9IFR5cGVDYXRhbG9nW1R5cGVDYXRhbG9nLmJhc2VsYXllcnNdO1xyXG4gICAgICAgIHRoaXMudHlwZSA9ICBUeXBlQ2F0YWxvZ1tzVHlwZV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbGxlY3RDYXRhbG9nSXRlbXMoKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbUdyb3VwW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYXRhbG9nU2VydmljZS5sb2FkQ2F0YWxvZ0Jhc2VMYXllckl0ZW1zKHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9zaXRlQ2F0YWxvZyBleHRlbmRzIENhdGFsb2cgaW1wbGVtZW50cyBJQ29tcG9zaXRlQ2F0YWxvZyB7XHJcbiAgICBjb21wb3NpdGU6IElDYXRhbG9nW107XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQ2F0YWxvZywgc2VydmljZTogQ2F0YWxvZ1NlcnZpY2UpIHtcclxuICAgICAgICBzdXBlcihvcHRpb25zLCBzZXJ2aWNlKTtcclxuICAgICAgICBjb25zdCBzVHlwZTogc3RyaW5nID0gVHlwZUNhdGFsb2dbVHlwZUNhdGFsb2cuY29tcG9zaXRlXTtcclxuICAgICAgICB0aGlzLnR5cGUgPSAgVHlwZUNhdGFsb2dbc1R5cGVdO1xyXG4gICAgICAgIHRoaXMudXJsID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29sbGVjdENhdGFsb2dJdGVtcygpOiBPYnNlcnZhYmxlPENhdGFsb2dJdGVtW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYXRhbG9nU2VydmljZS5sb2FkQ2F0YWxvZ0NvbXBvc2l0ZUxheWVySXRlbXModGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYXRhbG9nRmFjdG9yeSB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVJbnN0YW5jZUNhdGFsb2cob3B0aW9uczogQ2F0YWxvZywgc2VydmljZTogQ2F0YWxvZ1NlcnZpY2UpOiBDYXRhbG9nIHtcclxuXHJcbiAgICAgICAgbGV0IGNhdGFsb2c6IENhdGFsb2c7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2NvbXBvc2l0ZScpKSB7XHJcbiAgICAgICAgICAgIGNhdGFsb2cgPSBuZXcgQ29tcG9zaXRlQ2F0YWxvZyhvcHRpb25zLCBzZXJ2aWNlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMudHlwZSA9PT0gVHlwZUNhdGFsb2dbVHlwZUNhdGFsb2cuYmFzZWxheWVyc10pIHtcclxuICAgICAgICAgICAgY2F0YWxvZyA9IG5ldyBCYXNlbGF5ZXJzQ2F0YWxvZyhvcHRpb25zLCBzZXJ2aWNlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMudHlwZSA9PT0gVHlwZUNhdGFsb2dbVHlwZUNhdGFsb2cud210c10pIHtcclxuICAgICAgICAgICAgY2F0YWxvZyA9IG5ldyBXTVRTQ2F0YWxvZyhvcHRpb25zLCBzZXJ2aWNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYXRhbG9nID0gbmV3IFdNU0NhdGFsb2cob3B0aW9ucywgc2VydmljZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2F0YWxvZztcclxuICAgIH1cclxufVxyXG4iXX0=