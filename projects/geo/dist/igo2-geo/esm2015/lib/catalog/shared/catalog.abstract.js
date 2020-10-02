/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { TypeCatalog } from './catalog.enum';
/**
 * @abstract
 */
export class Catalog {
    /**
     * @param {?} options
     * @param {?} service
     */
    constructor(options, service) {
        Object.assign(this, options);
        this.catalogService = service;
    }
}
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
class WMSCatalog extends Catalog {
    /**
     * @param {?} options
     * @param {?} service
     */
    constructor(options, service) {
        super(options, service);
        /** @type {?} */
        const sType = TypeCatalog[TypeCatalog.wms];
        this.type = TypeCatalog[sType];
    }
    /**
     * @return {?}
     */
    collectCatalogItems() {
        return this.catalogService.loadCatalogWMSLayerItems(this);
    }
}
class WMTSCatalog extends Catalog {
    /**
     * @param {?} options
     * @param {?} service
     */
    constructor(options, service) {
        super(options, service);
        /** @type {?} */
        const sType = TypeCatalog[TypeCatalog.wmts];
        this.type = TypeCatalog[sType];
    }
    /**
     * @return {?}
     */
    collectCatalogItems() {
        return this.catalogService.loadCatalogWMTSLayerItems(this);
    }
}
class BaselayersCatalog extends Catalog {
    /**
     * @param {?} options
     * @param {?} service
     */
    constructor(options, service) {
        super(options, service);
        /** @type {?} */
        const sType = TypeCatalog[TypeCatalog.baselayers];
        this.type = TypeCatalog[sType];
    }
    /**
     * @return {?}
     */
    collectCatalogItems() {
        return this.catalogService.loadCatalogBaseLayerItems(this);
    }
}
export class CompositeCatalog extends Catalog {
    /**
     * @param {?} options
     * @param {?} service
     */
    constructor(options, service) {
        super(options, service);
        /** @type {?} */
        const sType = TypeCatalog[TypeCatalog.composite];
        this.type = TypeCatalog[sType];
        this.url = null;
    }
    /**
     * @return {?}
     */
    collectCatalogItems() {
        return this.catalogService.loadCatalogCompositeLayerItems(this);
    }
}
if (false) {
    /** @type {?} */
    CompositeCatalog.prototype.composite;
}
export class CatalogFactory {
    /**
     * @param {?} options
     * @param {?} service
     * @return {?}
     */
    static createInstanceCatalog(options, service) {
        /** @type {?} */
        let catalog;
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5hYnN0cmFjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL3NoYXJlZC9jYXRhbG9nLmFic3RyYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQUUsV0FBVyxFQUFzQixNQUFNLGdCQUFnQixDQUFDOzs7O0FBRWpFLE1BQU0sT0FBZ0IsT0FBTzs7Ozs7SUEyQnpCLFlBQVksT0FBZ0IsRUFBRSxPQUF1QjtRQUNqRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztJQUNsQyxDQUFDO0NBR0o7OztJQTlCRyxxQkFBVzs7SUFDWCx3QkFBYzs7SUFDZCxzQkFBWTs7SUFDWix3QkFBc0I7O0lBQ3RCLHVCQUEwQjs7SUFDMUIsMEJBQWlCOztJQUNqQiw0QkFBbUI7O0lBQ25CLGtDQUF5Qjs7SUFDekIsNkJBQXNCOztJQUN0Qiw4QkFBK0I7O0lBQy9CLDZCQUErQjs7SUFDL0IsOEJBQTBCOztJQUMxQixrQ0FBa0M7O0lBQ2xDLDhCQUF5Qzs7SUFDekMsZ0NBQXdDOztJQUN4Qyx3QkFBZTs7SUFDZiw4QkFBdUQ7O0lBQ3ZELGdDQUErQjs7SUFDL0IsMENBQWtDOztJQUNsQyw2QkFBcUI7Ozs7O0lBR3JCLGlDQUF5Qzs7Ozs7SUFPekMsd0RBQWlFOztBQUdyRSxNQUFNLFVBQVcsU0FBUSxPQUFPOzs7OztJQUM1QixZQUFZLE9BQWdCLEVBQUUsT0FBdUI7UUFDakQsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzs7Y0FDbEIsS0FBSyxHQUFXLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1FBQ2xELElBQUksQ0FBQyxJQUFJLEdBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFTSxtQkFBbUI7UUFDdEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDSjtBQUVELE1BQU0sV0FBWSxTQUFRLE9BQU87Ozs7O0lBQzdCLFlBQVksT0FBZ0IsRUFBRSxPQUF1QjtRQUNqRCxLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDOztjQUNsQixLQUFLLEdBQVcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksR0FBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVNLG1CQUFtQjtRQUN0QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNKO0FBRUQsTUFBTSxpQkFBa0IsU0FBUSxPQUFPOzs7OztJQUNuQyxZQUFZLE9BQWdCLEVBQUUsT0FBdUI7UUFDakQsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzs7Y0FDbEIsS0FBSyxHQUFXLFdBQVcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1FBQ3pELElBQUksQ0FBQyxJQUFJLEdBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFTSxtQkFBbUI7UUFDdEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDSjtBQUVELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxPQUFPOzs7OztJQUd6QyxZQUFZLE9BQWdCLEVBQUUsT0FBdUI7UUFDakQsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzs7Y0FDbEIsS0FBSyxHQUFXLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3hELElBQUksQ0FBQyxJQUFJLEdBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFFTSxtQkFBbUI7UUFDdEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Q0FDSjs7O0lBWkcscUNBQXNCOztBQWMxQixNQUFNLE9BQU8sY0FBYzs7Ozs7O0lBRWhCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxPQUFnQixFQUFFLE9BQXVCOztZQUVyRSxPQUFnQjtRQUNwQixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDckMsT0FBTyxHQUFHLElBQUksZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3BEO2FBQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDN0QsT0FBTyxHQUFHLElBQUksaUJBQWlCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO2FBQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkQsT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUMvQzthQUFNO1lBQ0gsT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUM5QztRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFRvb2x0aXBUeXBlIH0gZnJvbSAnLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBUaW1lRmlsdGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ZpbHRlcic7XHJcbmltcG9ydCB7IFF1ZXJ5Rm9ybWF0LCBRdWVyeUh0bWxUYXJnZXQgIH0gZnJvbSAnLi4vLi4vcXVlcnknO1xyXG5cclxuaW1wb3J0IHsgSUNhdGFsb2csIElDb21wb3NpdGVDYXRhbG9nICwgQ2F0YWxvZ0l0ZW0sIENhdGFsb2dJdGVtR3JvdXAgfSBmcm9tICcuL2NhdGFsb2cuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ2F0YWxvZ1NlcnZpY2UgfSBmcm9tICcuL2NhdGFsb2cuc2VydmljZSc7XHJcbmltcG9ydCB7IFR5cGVDYXRhbG9nLCBUeXBlQ2F0YWxvZ1N0cmluZ3MgfSBmcm9tICcuL2NhdGFsb2cuZW51bSc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2F0YWxvZyBpbXBsZW1lbnRzIElDYXRhbG9nIHtcclxuXHJcbiAgICAvLyBJQ2F0YWxvZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICB1cmw6IHN0cmluZztcclxuICAgIGl0ZW1zPzogQ2F0YWxvZ0l0ZW1bXTtcclxuICAgIHR5cGU/OiBUeXBlQ2F0YWxvZ1N0cmluZ3M7XHJcbiAgICB2ZXJzaW9uPzogc3RyaW5nO1xyXG4gICAgbWF0cml4U2V0Pzogc3RyaW5nO1xyXG4gICAgcmVxdWVzdEVuY29kaW5nPzogc3RyaW5nO1xyXG4gICAgcmVnRmlsdGVycz86IHN0cmluZ1tdO1xyXG4gICAgZ3JvdXBJbXBvc2U/OiBDYXRhbG9nSXRlbUdyb3VwO1xyXG4gICAgdGltZUZpbHRlcj86IFRpbWVGaWx0ZXJPcHRpb25zO1xyXG4gICAgcXVlcnlGb3JtYXQ/OiBRdWVyeUZvcm1hdDtcclxuICAgIHF1ZXJ5SHRtbFRhcmdldD86IFF1ZXJ5SHRtbFRhcmdldDtcclxuICAgIHF1ZXJ5UGFyYW1zPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmc7IH07XHJcbiAgICBzb3VyY2VPcHRpb25zPzogeyBba2V5OiBzdHJpbmddOiBhbnk7IH07XHJcbiAgICBjb3VudD86IG51bWJlcjtcclxuICAgIHRvb2x0aXBUeXBlPzogVG9vbHRpcFR5cGUuQUJTVFJBQ1QgfCBUb29sdGlwVHlwZS5USVRMRTtcclxuICAgIHNvcnREaXJlY3Rpb24/OiAnYXNjJyB8ICdkZXNjJztcclxuICAgIHNldENyb3NzT3JpZ2luQW5vbnltb3VzPzogYm9vbGVhbjtcclxuICAgIHNob3dMZWdlbmQ/OiBib29sZWFuO1xyXG4gICAgLy8gSUNhdGFsb2cgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY2F0YWxvZ1NlcnZpY2U6IENhdGFsb2dTZXJ2aWNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IENhdGFsb2csIHNlcnZpY2U6IENhdGFsb2dTZXJ2aWNlKSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLmNhdGFsb2dTZXJ2aWNlID0gc2VydmljZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY29sbGVjdENhdGFsb2dJdGVtcygpOiBPYnNlcnZhYmxlPENhdGFsb2dJdGVtW10+O1xyXG59XHJcblxyXG5jbGFzcyBXTVNDYXRhbG9nIGV4dGVuZHMgQ2F0YWxvZyB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBDYXRhbG9nLCBzZXJ2aWNlOiBDYXRhbG9nU2VydmljZSkge1xyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMsIHNlcnZpY2UpO1xyXG4gICAgICAgIGNvbnN0IHNUeXBlOiBzdHJpbmcgPSBUeXBlQ2F0YWxvZ1tUeXBlQ2F0YWxvZy53bXNdO1xyXG4gICAgICAgIHRoaXMudHlwZSA9ICBUeXBlQ2F0YWxvZ1tzVHlwZV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbGxlY3RDYXRhbG9nSXRlbXMoKTogT2JzZXJ2YWJsZTxDYXRhbG9nSXRlbVtdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2F0YWxvZ1NlcnZpY2UubG9hZENhdGFsb2dXTVNMYXllckl0ZW1zKHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBXTVRTQ2F0YWxvZyBleHRlbmRzIENhdGFsb2cge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQ2F0YWxvZywgc2VydmljZTogQ2F0YWxvZ1NlcnZpY2UpIHtcclxuICAgICAgICBzdXBlcihvcHRpb25zLCBzZXJ2aWNlKTtcclxuICAgICAgICBjb25zdCBzVHlwZTogc3RyaW5nID0gVHlwZUNhdGFsb2dbVHlwZUNhdGFsb2cud210c107XHJcbiAgICAgICAgdGhpcy50eXBlID0gIFR5cGVDYXRhbG9nW3NUeXBlXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29sbGVjdENhdGFsb2dJdGVtcygpOiBPYnNlcnZhYmxlPENhdGFsb2dJdGVtW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYXRhbG9nU2VydmljZS5sb2FkQ2F0YWxvZ1dNVFNMYXllckl0ZW1zKHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCYXNlbGF5ZXJzQ2F0YWxvZyBleHRlbmRzIENhdGFsb2cge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQ2F0YWxvZywgc2VydmljZTogQ2F0YWxvZ1NlcnZpY2UpIHtcclxuICAgICAgICBzdXBlcihvcHRpb25zLCBzZXJ2aWNlKTtcclxuICAgICAgICBjb25zdCBzVHlwZTogc3RyaW5nID0gVHlwZUNhdGFsb2dbVHlwZUNhdGFsb2cuYmFzZWxheWVyc107XHJcbiAgICAgICAgdGhpcy50eXBlID0gIFR5cGVDYXRhbG9nW3NUeXBlXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29sbGVjdENhdGFsb2dJdGVtcygpOiBPYnNlcnZhYmxlPENhdGFsb2dJdGVtR3JvdXBbXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhdGFsb2dTZXJ2aWNlLmxvYWRDYXRhbG9nQmFzZUxheWVySXRlbXModGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb3NpdGVDYXRhbG9nIGV4dGVuZHMgQ2F0YWxvZyBpbXBsZW1lbnRzIElDb21wb3NpdGVDYXRhbG9nIHtcclxuICAgIGNvbXBvc2l0ZTogSUNhdGFsb2dbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBDYXRhbG9nLCBzZXJ2aWNlOiBDYXRhbG9nU2VydmljZSkge1xyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMsIHNlcnZpY2UpO1xyXG4gICAgICAgIGNvbnN0IHNUeXBlOiBzdHJpbmcgPSBUeXBlQ2F0YWxvZ1tUeXBlQ2F0YWxvZy5jb21wb3NpdGVdO1xyXG4gICAgICAgIHRoaXMudHlwZSA9ICBUeXBlQ2F0YWxvZ1tzVHlwZV07XHJcbiAgICAgICAgdGhpcy51cmwgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb2xsZWN0Q2F0YWxvZ0l0ZW1zKCk6IE9ic2VydmFibGU8Q2F0YWxvZ0l0ZW1bXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhdGFsb2dTZXJ2aWNlLmxvYWRDYXRhbG9nQ29tcG9zaXRlTGF5ZXJJdGVtcyh0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENhdGFsb2dGYWN0b3J5IHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUluc3RhbmNlQ2F0YWxvZyhvcHRpb25zOiBDYXRhbG9nLCBzZXJ2aWNlOiBDYXRhbG9nU2VydmljZSk6IENhdGFsb2cge1xyXG5cclxuICAgICAgICBsZXQgY2F0YWxvZzogQ2F0YWxvZztcclxuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnY29tcG9zaXRlJykpIHtcclxuICAgICAgICAgICAgY2F0YWxvZyA9IG5ldyBDb21wb3NpdGVDYXRhbG9nKG9wdGlvbnMsIHNlcnZpY2UpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy50eXBlID09PSBUeXBlQ2F0YWxvZ1tUeXBlQ2F0YWxvZy5iYXNlbGF5ZXJzXSkge1xyXG4gICAgICAgICAgICBjYXRhbG9nID0gbmV3IEJhc2VsYXllcnNDYXRhbG9nKG9wdGlvbnMsIHNlcnZpY2UpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy50eXBlID09PSBUeXBlQ2F0YWxvZ1tUeXBlQ2F0YWxvZy53bXRzXSkge1xyXG4gICAgICAgICAgICBjYXRhbG9nID0gbmV3IFdNVFNDYXRhbG9nKG9wdGlvbnMsIHNlcnZpY2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhdGFsb2cgPSBuZXcgV01TQ2F0YWxvZyhvcHRpb25zLCBzZXJ2aWNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjYXRhbG9nO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==