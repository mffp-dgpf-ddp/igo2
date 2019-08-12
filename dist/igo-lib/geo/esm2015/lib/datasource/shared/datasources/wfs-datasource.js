/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olSourceVector from 'ol/source/Vector';
import * as OlLoadingStrategy from 'ol/loadingstrategy';
import * as OlFormat from 'ol/format';
import { DataSource } from './datasource';
import { OgcFilterWriter } from '../../../filter/shared/ogc-filter';
export class WFSDataSource extends DataSource {
    /**
     * @param {?} options
     * @param {?} networkService
     * @param {?} wfsService
     */
    constructor(options, networkService, wfsService) {
        super(options, networkService);
        this.options = options;
        this.networkService = networkService;
        this.wfsService = wfsService;
        this.options = this.wfsService.checkWfsOptions(options);
        this.ogcFilterWriter = new OgcFilterWriter();
        this.wfsService.getSourceFieldsFromWFS(this.options);
    }
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        // reassignation of params to paramsWFS and url to urlWFS to have a common interface with wms-wfs datasources
        this.options.paramsWFS = this.options.params;
        this.options.urlWfs = this.options.url;
        // default wfs version
        this.options.paramsWFS.version = this.options.paramsWFS.version
            ? this.options.paramsWFS.version
            : '2.0.0';
        /** @type {?} */
        const ogcFiltersDefaultValue = true;
        ((/** @type {?} */ (this.options))).ogcFilters =
            ((/** @type {?} */ (this.options))).ogcFilters === undefined
                ? {}
                : ((/** @type {?} */ (this.options))).ogcFilters;
        ((/** @type {?} */ (this.options))).ogcFilters.enabled =
            ((/** @type {?} */ (this.options))).ogcFilters.enabled ===
                undefined
                ? ogcFiltersDefaultValue
                : ((/** @type {?} */ (this.options))).ogcFilters.enabled;
        ((/** @type {?} */ (this.options))).ogcFilters.editable =
            ((/** @type {?} */ (this.options))).ogcFilters.editable ===
                undefined
                ? ogcFiltersDefaultValue
                : ((/** @type {?} */ (this.options))).ogcFilters.editable;
        /** @type {?} */
        const baseWfsQuery = 'service=WFS&request=GetFeature';
        // Mandatory
        /** @type {?} */
        const url = this.options.urlWfs;
        // Optional
        /** @type {?} */
        const outputFormat = this.options.paramsWFS.outputFormat
            ? 'outputFormat=' + this.options.paramsWFS.outputFormat
            : '';
        /** @type {?} */
        const wfsVersion = this.options.paramsWFS.version
            ? 'version=' + this.options.paramsWFS.version
            : 'version=' + '2.0.0';
        /** @type {?} */
        let paramTypename = 'typename';
        /** @type {?} */
        let paramMaxFeatures = 'maxFeatures';
        if (this.options.paramsWFS.version === '2.0.0' ||
            !this.options.paramsWFS.version) {
            paramTypename = 'typenames';
            paramMaxFeatures = 'count';
        }
        /** @type {?} */
        const featureTypes = paramTypename + '=' + this.options.paramsWFS.featureTypes;
        /** @type {?} */
        const maxFeatures = this.options.paramsWFS.maxFeatures
            ? paramMaxFeatures + '=' + this.options.paramsWFS.maxFeatures
            : paramMaxFeatures + '=5000';
        /** @type {?} */
        let downloadBaseUrl = `${url}?${baseWfsQuery}&${wfsVersion}&${featureTypes}&`;
        downloadBaseUrl += `${outputFormat}&${maxFeatures}`;
        this.options.download = Object.assign({}, this.options.download, {
            dynamicUrl: downloadBaseUrl
        });
        return new olSourceVector({
            format: this.getFormatFromOptions(),
            overlaps: false,
            url: (/**
             * @param {?} extent
             * @param {?} resolution
             * @param {?} proj
             * @return {?}
             */
            (extent, resolution, proj) => {
                /** @type {?} */
                const srsname = this.options.paramsWFS.srsName
                    ? 'srsname=' + this.options.paramsWFS.srsName
                    : 'srsname=' + proj.getCode();
                /** @type {?} */
                let filters;
                if (((/** @type {?} */ (this.options))).ogcFilters &&
                    ((/** @type {?} */ (this.options))).ogcFilters.enabled) {
                    filters = ((/** @type {?} */ (this.options))).ogcFilters.filters;
                }
                this.options.paramsWFS.xmlFilter = this.ogcFilterWriter.buildFilter(filters, extent, proj, this.options.paramsWFS.fieldNameGeometry);
                /** @type {?} */
                let baseUrl = `${url}?${baseWfsQuery}&${wfsVersion}&${featureTypes}&`;
                baseUrl += `${outputFormat}&${srsname}&${maxFeatures}`;
                /** @type {?} */
                const patternFilter = /(filter|bbox)=.*/gi;
                if (patternFilter.test(this.options.paramsWFS.xmlFilter)) {
                    baseUrl += `&${this.options.paramsWFS.xmlFilter}`;
                }
                this.options.download = Object.assign({}, this.options.download, {
                    dynamicUrl: baseUrl
                });
                return baseUrl;
            }),
            strategy: OlLoadingStrategy.bbox
        });
    }
    /**
     * @private
     * @return {?}
     */
    getFormatFromOptions() {
        /** @type {?} */
        let olFormatCls;
        /** @type {?} */
        const outputFormat = this.options.paramsWFS.outputFormat.toLowerCase();
        /** @type {?} */
        const patternGml3 = new RegExp('.*?gml.*?');
        /** @type {?} */
        const patternGeojson = new RegExp('.*?json.*?');
        if (patternGeojson.test(outputFormat)) {
            olFormatCls = OlFormat.GeoJSON;
        }
        if (patternGml3.test(outputFormat)) {
            olFormatCls = OlFormat.WFS;
        }
        return new olFormatCls();
    }
}
if (false) {
    /** @type {?} */
    WFSDataSource.prototype.ol;
    /** @type {?} */
    WFSDataSource.prototype.ogcFilterWriter;
    /** @type {?} */
    WFSDataSource.prototype.options;
    /** @type {?} */
    WFSDataSource.prototype.networkService;
    /**
     * @type {?}
     * @protected
     */
    WFSDataSource.prototype.wfsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sS0FBSyxpQkFBaUIsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUl0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBSTFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUtwRSxNQUFNLE9BQU8sYUFBYyxTQUFRLFVBQVU7Ozs7OztJQUkzQyxZQUNTLE9BQTZCLEVBQzdCLGNBQThCLEVBQzNCLFVBQXNCO1FBRWhDLEtBQUssQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFKeEIsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFDN0IsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzNCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFHaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Ozs7SUFFUyxjQUFjO1FBQ3RCLDZHQUE2RztRQUM3RyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN2QyxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU87WUFDN0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU87WUFDaEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzs7Y0FDTixzQkFBc0IsR0FBRyxJQUFJO1FBQ25DLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBa0MsQ0FBQyxDQUFDLFVBQVU7WUFDekQsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFrQyxDQUFDLENBQUMsVUFBVSxLQUFLLFNBQVM7Z0JBQ3ZFLENBQUMsQ0FBQyxFQUFFO2dCQUNKLENBQUMsQ0FBQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQWtDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDbEUsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFrQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU87WUFDakUsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFrQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU87Z0JBQ25FLFNBQVM7Z0JBQ1AsQ0FBQyxDQUFDLHNCQUFzQjtnQkFDeEIsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBa0MsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDMUUsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFrQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVE7WUFDbEUsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFrQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVE7Z0JBQ3BFLFNBQVM7Z0JBQ1AsQ0FBQyxDQUFDLHNCQUFzQjtnQkFDeEIsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBa0MsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7O2NBRXJFLFlBQVksR0FBRyxnQ0FBZ0M7OztjQUUvQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNOzs7Y0FFekIsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVk7WUFDdEQsQ0FBQyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZO1lBQ3ZELENBQUMsQ0FBQyxFQUFFOztjQUNBLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPO1lBQy9DLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTztZQUM3QyxDQUFDLENBQUMsVUFBVSxHQUFHLE9BQU87O1lBRXBCLGFBQWEsR0FBRyxVQUFVOztZQUMxQixnQkFBZ0IsR0FBRyxhQUFhO1FBQ3BDLElBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxLQUFLLE9BQU87WUFDMUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQy9CO1lBQ0EsYUFBYSxHQUFHLFdBQVcsQ0FBQztZQUM1QixnQkFBZ0IsR0FBRyxPQUFPLENBQUM7U0FDNUI7O2NBRUssWUFBWSxHQUNoQixhQUFhLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVk7O2NBRXJELFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXO1lBQ3BELENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVztZQUM3RCxDQUFDLENBQUMsZ0JBQWdCLEdBQUcsT0FBTzs7WUFFMUIsZUFBZSxHQUFHLEdBQUcsR0FBRyxJQUFJLFlBQVksSUFBSSxVQUFVLElBQUksWUFBWSxHQUFHO1FBQzdFLGVBQWUsSUFBSSxHQUFHLFlBQVksSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUVwRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUMvRCxVQUFVLEVBQUUsZUFBZTtTQUM1QixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksY0FBYyxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDbkMsUUFBUSxFQUFFLEtBQUs7WUFDZixHQUFHOzs7Ozs7WUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUU7O3NCQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTztvQkFDNUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPO29CQUM3QyxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUU7O29CQUUzQixPQUFPO2dCQUNYLElBQ0UsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFrQyxDQUFDLENBQUMsVUFBVTtvQkFDM0QsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFrQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFDbkU7b0JBQ0EsT0FBTyxHQUFHLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBa0MsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7aUJBQy9FO2dCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FDakUsT0FBTyxFQUNQLE1BQU0sRUFDTixJQUFJLEVBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQ3pDLENBQUM7O29CQUVFLE9BQU8sR0FBRyxHQUFHLEdBQUcsSUFBSSxZQUFZLElBQUksVUFBVSxJQUFJLFlBQVksR0FBRztnQkFDckUsT0FBTyxJQUFJLEdBQUcsWUFBWSxJQUFJLE9BQU8sSUFBSSxXQUFXLEVBQUUsQ0FBQzs7c0JBRWpELGFBQWEsR0FBRyxvQkFBb0I7Z0JBQzFDLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDeEQsT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7aUJBQ25EO2dCQUVELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO29CQUMvRCxVQUFVLEVBQUUsT0FBTztpQkFDcEIsQ0FBQyxDQUFDO2dCQUVILE9BQU8sT0FBTyxDQUFDO1lBQ2pCLENBQUMsQ0FBQTtZQUNELFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1NBQ2pDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRU8sb0JBQW9COztZQUN0QixXQUFXOztjQUVULFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFOztjQUNoRSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDOztjQUNyQyxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDO1FBRS9DLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNyQyxXQUFXLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztTQUNoQztRQUNELElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNsQyxXQUFXLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztTQUM1QjtRQUVELE9BQU8sSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUMzQixDQUFDO0NBQ0Y7OztJQWpJQywyQkFBMEI7O0lBQzFCLHdDQUF3Qzs7SUFHdEMsZ0NBQW9DOztJQUNwQyx1Q0FBcUM7Ozs7O0lBQ3JDLG1DQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0ICogYXMgT2xMb2FkaW5nU3RyYXRlZ3kgZnJvbSAnb2wvbG9hZGluZ3N0cmF0ZWd5JztcclxuaW1wb3J0ICogYXMgT2xGb3JtYXQgZnJvbSAnb2wvZm9ybWF0JztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgV0ZTRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL3dmcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFdGU1NlcnZpY2UgfSBmcm9tICcuL3dmcy5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IE9nY0ZpbHRlcldyaXRlciB9IGZyb20gJy4uLy4uLy4uL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlcic7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5cclxuaW1wb3J0IHsgTmV0d29ya1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBXRlNEYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZVZlY3RvcjtcclxuICBwdWJsaWMgb2djRmlsdGVyV3JpdGVyOiBPZ2NGaWx0ZXJXcml0ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIG9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgcHVibGljIG5ldHdvcmtTZXJ2aWNlOiBOZXR3b3JrU2VydmljZSxcclxuICAgIHByb3RlY3RlZCB3ZnNTZXJ2aWNlOiBXRlNTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zLCBuZXR3b3JrU2VydmljZSk7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLndmc1NlcnZpY2UuY2hlY2tXZnNPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5vZ2NGaWx0ZXJXcml0ZXIgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCk7XHJcbiAgICB0aGlzLndmc1NlcnZpY2UuZ2V0U291cmNlRmllbGRzRnJvbVdGUyh0aGlzLm9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlVmVjdG9yIHtcclxuICAgIC8vIHJlYXNzaWduYXRpb24gb2YgcGFyYW1zIHRvIHBhcmFtc1dGUyBhbmQgdXJsIHRvIHVybFdGUyB0byBoYXZlIGEgY29tbW9uIGludGVyZmFjZSB3aXRoIHdtcy13ZnMgZGF0YXNvdXJjZXNcclxuICAgIHRoaXMub3B0aW9ucy5wYXJhbXNXRlMgPSB0aGlzLm9wdGlvbnMucGFyYW1zO1xyXG4gICAgdGhpcy5vcHRpb25zLnVybFdmcyA9IHRoaXMub3B0aW9ucy51cmw7XHJcbiAgICAvLyBkZWZhdWx0IHdmcyB2ZXJzaW9uXHJcbiAgICB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb24gPSB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb25cclxuICAgICAgPyB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb25cclxuICAgICAgOiAnMi4wLjAnO1xyXG4gICAgY29uc3Qgb2djRmlsdGVyc0RlZmF1bHRWYWx1ZSA9IHRydWU7IC8vIGRlZmF1bHQgdmFsdWVzIGZvciB3ZnMuXHJcbiAgICAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycyA9XHJcbiAgICAgICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzID09PSB1bmRlZmluZWRcclxuICAgICAgICA/IHt9XHJcbiAgICAgICAgOiAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycztcclxuICAgICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzLmVuYWJsZWQgPVxyXG4gICAgICAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycy5lbmFibGVkID09PVxyXG4gICAgICB1bmRlZmluZWRcclxuICAgICAgICA/IG9nY0ZpbHRlcnNEZWZhdWx0VmFsdWVcclxuICAgICAgICA6ICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzLmVuYWJsZWQ7XHJcbiAgICAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycy5lZGl0YWJsZSA9XHJcbiAgICAgICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzLmVkaXRhYmxlID09PVxyXG4gICAgICB1bmRlZmluZWRcclxuICAgICAgICA/IG9nY0ZpbHRlcnNEZWZhdWx0VmFsdWVcclxuICAgICAgICA6ICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzLmVkaXRhYmxlO1xyXG5cclxuICAgIGNvbnN0IGJhc2VXZnNRdWVyeSA9ICdzZXJ2aWNlPVdGUyZyZXF1ZXN0PUdldEZlYXR1cmUnO1xyXG4gICAgLy8gTWFuZGF0b3J5XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLm9wdGlvbnMudXJsV2ZzO1xyXG4gICAgLy8gT3B0aW9uYWxcclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IHRoaXMub3B0aW9ucy5wYXJhbXNXRlMub3V0cHV0Rm9ybWF0XHJcbiAgICAgID8gJ291dHB1dEZvcm1hdD0nICsgdGhpcy5vcHRpb25zLnBhcmFtc1dGUy5vdXRwdXRGb3JtYXRcclxuICAgICAgOiAnJztcclxuICAgIGNvbnN0IHdmc1ZlcnNpb24gPSB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb25cclxuICAgICAgPyAndmVyc2lvbj0nICsgdGhpcy5vcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uXHJcbiAgICAgIDogJ3ZlcnNpb249JyArICcyLjAuMCc7XHJcblxyXG4gICAgbGV0IHBhcmFtVHlwZW5hbWUgPSAndHlwZW5hbWUnO1xyXG4gICAgbGV0IHBhcmFtTWF4RmVhdHVyZXMgPSAnbWF4RmVhdHVyZXMnO1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb24gPT09ICcyLjAuMCcgfHxcclxuICAgICAgIXRoaXMub3B0aW9ucy5wYXJhbXNXRlMudmVyc2lvblxyXG4gICAgKSB7XHJcbiAgICAgIHBhcmFtVHlwZW5hbWUgPSAndHlwZW5hbWVzJztcclxuICAgICAgcGFyYW1NYXhGZWF0dXJlcyA9ICdjb3VudCc7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmVhdHVyZVR5cGVzID1cclxuICAgICAgcGFyYW1UeXBlbmFtZSArICc9JyArIHRoaXMub3B0aW9ucy5wYXJhbXNXRlMuZmVhdHVyZVR5cGVzO1xyXG5cclxuICAgIGNvbnN0IG1heEZlYXR1cmVzID0gdGhpcy5vcHRpb25zLnBhcmFtc1dGUy5tYXhGZWF0dXJlc1xyXG4gICAgICA/IHBhcmFtTWF4RmVhdHVyZXMgKyAnPScgKyB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLm1heEZlYXR1cmVzXHJcbiAgICAgIDogcGFyYW1NYXhGZWF0dXJlcyArICc9NTAwMCc7XHJcblxyXG4gICAgbGV0IGRvd25sb2FkQmFzZVVybCA9IGAke3VybH0/JHtiYXNlV2ZzUXVlcnl9JiR7d2ZzVmVyc2lvbn0mJHtmZWF0dXJlVHlwZXN9JmA7XHJcbiAgICBkb3dubG9hZEJhc2VVcmwgKz0gYCR7b3V0cHV0Rm9ybWF0fSYke21heEZlYXR1cmVzfWA7XHJcblxyXG4gICAgdGhpcy5vcHRpb25zLmRvd25sb2FkID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRpb25zLmRvd25sb2FkLCB7XHJcbiAgICAgIGR5bmFtaWNVcmw6IGRvd25sb2FkQmFzZVVybFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbFNvdXJjZVZlY3Rvcih7XHJcbiAgICAgIGZvcm1hdDogdGhpcy5nZXRGb3JtYXRGcm9tT3B0aW9ucygpLFxyXG4gICAgICBvdmVybGFwczogZmFsc2UsXHJcbiAgICAgIHVybDogKGV4dGVudCwgcmVzb2x1dGlvbiwgcHJvaikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNyc25hbWUgPSB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLnNyc05hbWVcclxuICAgICAgICAgID8gJ3Nyc25hbWU9JyArIHRoaXMub3B0aW9ucy5wYXJhbXNXRlMuc3JzTmFtZVxyXG4gICAgICAgICAgOiAnc3JzbmFtZT0nICsgcHJvai5nZXRDb2RlKCk7XHJcblxyXG4gICAgICAgIGxldCBmaWx0ZXJzO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzICYmXHJcbiAgICAgICAgICAodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycy5lbmFibGVkXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBmaWx0ZXJzID0gKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnMuZmlsdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnBhcmFtc1dGUy54bWxGaWx0ZXIgPSB0aGlzLm9nY0ZpbHRlcldyaXRlci5idWlsZEZpbHRlcihcclxuICAgICAgICAgIGZpbHRlcnMsXHJcbiAgICAgICAgICBleHRlbnQsXHJcbiAgICAgICAgICBwcm9qLFxyXG4gICAgICAgICAgdGhpcy5vcHRpb25zLnBhcmFtc1dGUy5maWVsZE5hbWVHZW9tZXRyeVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGxldCBiYXNlVXJsID0gYCR7dXJsfT8ke2Jhc2VXZnNRdWVyeX0mJHt3ZnNWZXJzaW9ufSYke2ZlYXR1cmVUeXBlc30mYDtcclxuICAgICAgICBiYXNlVXJsICs9IGAke291dHB1dEZvcm1hdH0mJHtzcnNuYW1lfSYke21heEZlYXR1cmVzfWA7XHJcblxyXG4gICAgICAgIGNvbnN0IHBhdHRlcm5GaWx0ZXIgPSAvKGZpbHRlcnxiYm94KT0uKi9naTtcclxuICAgICAgICBpZiAocGF0dGVybkZpbHRlci50ZXN0KHRoaXMub3B0aW9ucy5wYXJhbXNXRlMueG1sRmlsdGVyKSkge1xyXG4gICAgICAgICAgYmFzZVVybCArPSBgJiR7dGhpcy5vcHRpb25zLnBhcmFtc1dGUy54bWxGaWx0ZXJ9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5kb3dubG9hZCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucy5kb3dubG9hZCwge1xyXG4gICAgICAgICAgZHluYW1pY1VybDogYmFzZVVybFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gYmFzZVVybDtcclxuICAgICAgfSxcclxuICAgICAgc3RyYXRlZ3k6IE9sTG9hZGluZ1N0cmF0ZWd5LmJib3hcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRGb3JtYXRGcm9tT3B0aW9ucygpIHtcclxuICAgIGxldCBvbEZvcm1hdENscztcclxuXHJcbiAgICBjb25zdCBvdXRwdXRGb3JtYXQgPSB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLm91dHB1dEZvcm1hdC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3QgcGF0dGVybkdtbDMgPSBuZXcgUmVnRXhwKCcuKj9nbWwuKj8nKTtcclxuICAgIGNvbnN0IHBhdHRlcm5HZW9qc29uID0gbmV3IFJlZ0V4cCgnLio/anNvbi4qPycpO1xyXG5cclxuICAgIGlmIChwYXR0ZXJuR2VvanNvbi50ZXN0KG91dHB1dEZvcm1hdCkpIHtcclxuICAgICAgb2xGb3JtYXRDbHMgPSBPbEZvcm1hdC5HZW9KU09OO1xyXG4gICAgfVxyXG4gICAgaWYgKHBhdHRlcm5HbWwzLnRlc3Qob3V0cHV0Rm9ybWF0KSkge1xyXG4gICAgICBvbEZvcm1hdENscyA9IE9sRm9ybWF0LldGUztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IG9sRm9ybWF0Q2xzKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==