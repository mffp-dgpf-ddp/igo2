/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olSourceImageWMS from 'ol/source/ImageWMS';
import { DataSource } from './datasource';
import { OgcFilterWriter } from '../../../filter/shared/ogc-filter';
import { QueryHtmlTarget } from '../../../query/shared/query.enums';
export class WMSDataSource extends DataSource {
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
        // Important: To use wms versions smaller than 1.3.0, SRS
        // needs to be supplied in the source "params"
        // We need to do this to override the default version
        // of openlayers which is uppercase
        /** @type {?} */
        const sourceParams = options.params;
        if (sourceParams && sourceParams.version) {
            sourceParams.VERSION = sourceParams.version;
        }
        if (sourceParams && sourceParams.VERSION) {
            if (sourceParams.version !== '1.3.0') {
                if (!sourceParams.SRS && !sourceParams.srs) {
                    throw new Error(`You must set a SRS (or srs) param for your WMS
           (layer =  ` + sourceParams.layers + `) because your want to use a WMS version under 1.3.0
        Ex: "srs": "EPSG:3857" `);
                }
            }
        }
        if (sourceParams && sourceParams.INFO_FORMAT) {
            sourceParams.info_format = sourceParams.INFO_FORMAT;
        }
        if (options.refreshIntervalSec && options.refreshIntervalSec > 0) {
            setInterval((/**
             * @return {?}
             */
            () => {
                this.refresh();
            }), options.refreshIntervalSec * 1000); // Convert seconds to MS
        }
        // ####   START if paramsWFS
        if (options.paramsWFS) {
            /** @type {?} */
            const wfsCheckup = this.wfsService.checkWfsOptions(options);
            options.paramsWFS.version = wfsCheckup.paramsWFS.version;
            options.paramsWFS.wfsCapabilities = wfsCheckup.params.wfsCapabilities;
            this.wfsService.getSourceFieldsFromWFS(options);
            this.options.download = Object.assign({}, this.options.download, {
                dynamicUrl: this.buildDynamicDownloadUrlFromParamsWFS(this.options)
            });
        } //  ####   END  if paramsWFS
        this.ogcFilterWriter = new OgcFilterWriter();
        if (!options.sourceFields || options.sourceFields.length === 0) {
            options.sourceFields = [];
        }
        /** @type {?} */
        const initOgcFilters = ((/** @type {?} */ (this.options))).ogcFilters;
        if (sourceParams.layers.split(',').length > 1 && this.options && initOgcFilters && initOgcFilters.enabled) {
            console.log('*******************************');
            console.log('BE CAREFULL, YOUR WMS LAYERS (' + sourceParams.layers
                + ') MUST SHARE THE SAME FIELDS TO ALLOW ogcFilters TO WORK !! ');
            console.log('*******************************');
        }
        if (this.options && initOgcFilters && initOgcFilters.enabled && initOgcFilters.filters) {
            /** @type {?} */
            const filters = initOgcFilters.filters;
            /** @type {?} */
            const rebuildFilter = this.ogcFilterWriter.buildFilter(filters);
            /** @type {?} */
            const appliedFilter = this.formatProcessedOgcFilter(rebuildFilter, sourceParams.layers);
            /** @type {?} */
            const wmsFilterValue = appliedFilter.length > 0
                ? appliedFilter.replace('filter=', '')
                : undefined;
            this.ol.updateParams({ filter: wmsFilterValue });
        }
    }
    /**
     * @return {?}
     */
    get params() {
        return (/** @type {?} */ (this.options.params));
    }
    /**
     * @return {?}
     */
    get queryTitle() {
        return ((/** @type {?} */ (this.options))).queryTitle
            ? ((/** @type {?} */ (this.options))).queryTitle
            : 'title';
    }
    /**
     * @return {?}
     */
    get queryHtmlTarget() {
        return ((/** @type {?} */ (this.options))).queryHtmlTarget
            ? ((/** @type {?} */ (this.options))).queryHtmlTarget
            : QueryHtmlTarget.BLANK;
    }
    /**
     * @return {?}
     */
    refresh() {
        this.ol.updateParams({ igoRefresh: Math.random() });
    }
    /**
     * @param {?} processedFilter
     * @param {?} layers
     * @return {?}
     */
    formatProcessedOgcFilter(processedFilter, layers) {
        /** @type {?} */
        let appliedFilter = '';
        if (processedFilter.length === 0 && layers.indexOf(',') === -1) {
            appliedFilter = processedFilter;
        }
        else {
            layers.split(',').forEach((/**
             * @param {?} layerName
             * @return {?}
             */
            layerName => {
                appliedFilter = `${appliedFilter}(${processedFilter.replace('filter=', '')})`;
            }));
        }
        return `filter=${appliedFilter}`;
    }
    /**
     * @private
     * @param {?} asWFSDataSourceOptions
     * @return {?}
     */
    buildDynamicDownloadUrlFromParamsWFS(asWFSDataSourceOptions) {
        /** @type {?} */
        const outputFormat = asWFSDataSourceOptions.paramsWFS.outputFormat !== undefined
            ? 'outputFormat=' + asWFSDataSourceOptions.paramsWFS.outputFormat
            : '';
        /** @type {?} */
        let paramMaxFeatures = 'maxFeatures';
        if (asWFSDataSourceOptions.paramsWFS.version === '2.0.0' ||
            !asWFSDataSourceOptions.paramsWFS.version) {
            paramMaxFeatures = 'count';
        }
        /** @type {?} */
        const maxFeatures = asWFSDataSourceOptions.paramsWFS.maxFeatures
            ? paramMaxFeatures + '=' + asWFSDataSourceOptions.paramsWFS.maxFeatures
            : paramMaxFeatures + '=5000';
        /** @type {?} */
        const srsname = asWFSDataSourceOptions.paramsWFS.srsName
            ? 'srsname=' + asWFSDataSourceOptions.paramsWFS.srsName
            : 'srsname=EPSG:3857';
        /** @type {?} */
        const baseWfsQuery = this.wfsService.buildBaseWfsUrl(asWFSDataSourceOptions, 'GetFeature');
        return `${baseWfsQuery}&${outputFormat}&${srsname}&${maxFeatures}`;
    }
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        if (this.options.paramsWFS) {
            this.options.urlWfs = this.options.urlWfs
                ? this.options.urlWfs
                : this.options.url;
            this.options.paramsWFS.version = this.options.paramsWFS.version
                ? this.options.paramsWFS.version
                : '2.0.0';
        }
        /** @type {?} */
        let initOgcFilters = ((/** @type {?} */ (this.options))).ogcFilters;
        /** @type {?} */
        const ogcFiltersDefaultValue = false;
        initOgcFilters = initOgcFilters === undefined ? {} : initOgcFilters;
        initOgcFilters.enabled = initOgcFilters.enabled === undefined ? ogcFiltersDefaultValue : initOgcFilters.enabled;
        initOgcFilters.editable = initOgcFilters.editable === undefined ? ogcFiltersDefaultValue : initOgcFilters.editable;
        return new olSourceImageWMS(this.options);
    }
    /**
     * @param {?=} scale
     * @return {?}
     */
    getLegend(scale) {
        /** @type {?} */
        let legend = super.getLegend();
        if (legend.length > 0) {
            return legend;
        }
        /** @type {?} */
        const sourceParams = this.params;
        /** @type {?} */
        let layers = [];
        if (sourceParams.layers !== undefined) {
            layers = sourceParams.layers.split(',');
        }
        /** @type {?} */
        const baseUrl = this.options.url.replace(/\?$/, '');
        /** @type {?} */
        const params = [
            'REQUEST=GetLegendGraphic',
            'SERVICE=wms',
            'FORMAT=image/png',
            'LEGEND_OPTIONS=forceLabels:on',
            'SLD_VERSION=1.1.0',
            `VERSION=${sourceParams.version || '1.3.0'}`
        ];
        if (scale !== undefined) {
            params.push(`SCALE=${scale}`);
        }
        legend = layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            return {
                url: `${baseUrl}?${params.join('&')}&LAYER=${layer}`,
                title: layers.length > 1 ? layer : undefined
            };
        }));
        return legend;
    }
}
if (false) {
    /** @type {?} */
    WMSDataSource.prototype.ol;
    /** @type {?} */
    WMSDataSource.prototype.ogcFilterWriter;
    /** @type {?} */
    WMSDataSource.prototype.options;
    /** @type {?} */
    WMSDataSource.prototype.networkService;
    /**
     * @type {?}
     * @protected
     */
    WMSDataSource.prototype.wfsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUsxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFcEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBSXBFLE1BQU0sT0FBTyxhQUFjLFNBQVEsVUFBVTs7Ozs7O0lBb0IzQyxZQUNTLE9BQTZCLEVBQzdCLGNBQThCLEVBQzNCLFVBQXNCO1FBRWhDLEtBQUssQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFKeEIsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFDN0IsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzNCLGVBQVUsR0FBVixVQUFVLENBQVk7Ozs7OztjQVExQixZQUFZLEdBQVEsT0FBTyxDQUFDLE1BQU07UUFDeEMsSUFBSSxZQUFZLElBQUksWUFBWSxDQUFDLE9BQU8sRUFBRTtZQUN4QyxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7U0FDN0M7UUFFRCxJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsT0FBTyxFQUFFO1lBQ3hDLElBQUksWUFBWSxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTtvQkFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQztzQkFDSixHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUc7Z0NBQ2YsQ0FBQyxDQUFDO2lCQUN6QjthQUNGO1NBQ0Y7UUFFRCxJQUFJLFlB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Q0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOztjQUM3QyxNQUFNLEdBQUc7WUFDYiwwQkFBMEI7WUFDMUIsYUFBYTtZQUNiLGtCQUFrQjtZQUNsQiwrQkFBK0I7WUFDL0IsbUJBQW1CO1lBQ25CLFdBQVcsWUFBWSxDQUFDLE9BQU8sSUFBSSxPQUFPLEVBQUU7U0FDN0M7UUFDRCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDL0I7UUFFRCxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLEtBQWEsRUFBRSxFQUFFO1lBQ3BDLE9BQU87Z0JBQ0wsR0FBRyxFQUFFLEdBQUcsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxFQUFFO2dCQUNwRCxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUzthQUM3QyxDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0Y7OztJQXpMQywyQkFBNEI7O0lBQzVCLHdDQUF3Qzs7SUFtQnRDLGdDQUFvQzs7SUFDcEMsdUNBQXFDOzs7OztJQUNyQyxtQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VJbWFnZVdNUyBmcm9tICdvbC9zb3VyY2UvSW1hZ2VXTVMnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2VMZWdlbmRPcHRpb25zIH0gZnJvbSAnLi9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFdNU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93bXMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBXRlNTZXJ2aWNlIH0gZnJvbSAnLi93ZnMuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIgfSBmcm9tICcuLi8uLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXInO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgUXVlcnlIdG1sVGFyZ2V0IH0gZnJvbSAnLi4vLi4vLi4vcXVlcnkvc2hhcmVkL3F1ZXJ5LmVudW1zJztcclxuXHJcbmltcG9ydCB7IE5ldHdvcmtTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgV01TRGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VJbWFnZVdNUztcclxuICBwdWJsaWMgb2djRmlsdGVyV3JpdGVyOiBPZ2NGaWx0ZXJXcml0ZXI7XHJcblxyXG4gIGdldCBwYXJhbXMoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucGFyYW1zIGFzIGFueTtcclxuICB9XHJcblxyXG4gIGdldCBxdWVyeVRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5VGl0bGVcclxuICAgICAgPyAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlUaXRsZVxyXG4gICAgICA6ICd0aXRsZSc7XHJcbiAgfVxyXG5cclxuICBnZXQgcXVlcnlIdG1sVGFyZ2V0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5SHRtbFRhcmdldFxyXG4gICAgICA/ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeUh0bWxUYXJnZXRcclxuICAgICAgOiBRdWVyeUh0bWxUYXJnZXQuQkxBTks7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBvcHRpb25zOiBXTVNEYXRhU291cmNlT3B0aW9ucyxcclxuICAgIHB1YmxpYyBuZXR3b3JrU2VydmljZTogTmV0d29ya1NlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgd2ZzU2VydmljZTogV0ZTU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucywgbmV0d29ya1NlcnZpY2UpO1xyXG4gICAgLy8gSW1wb3J0YW50OiBUbyB1c2Ugd21zIHZlcnNpb25zIHNtYWxsZXIgdGhhbiAxLjMuMCwgU1JTXHJcbiAgICAvLyBuZWVkcyB0byBiZSBzdXBwbGllZCBpbiB0aGUgc291cmNlIFwicGFyYW1zXCJcclxuXHJcbiAgICAvLyBXZSBuZWVkIHRvIGRvIHRoaXMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgdmVyc2lvblxyXG4gICAgLy8gb2Ygb3BlbmxheWVycyB3aGljaCBpcyB1cHBlcmNhc2VcclxuICAgIGNvbnN0IHNvdXJjZVBhcmFtczogYW55ID0gb3B0aW9ucy5wYXJhbXM7XHJcbiAgICBpZiAoc291cmNlUGFyYW1zICYmIHNvdXJjZVBhcmFtcy52ZXJzaW9uKSB7XHJcbiAgICAgIHNvdXJjZVBhcmFtcy5WRVJTSU9OID0gc291cmNlUGFyYW1zLnZlcnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNvdXJjZVBhcmFtcyAmJiBzb3VyY2VQYXJhbXMuVkVSU0lPTikge1xyXG4gICAgICBpZiAoc291cmNlUGFyYW1zLnZlcnNpb24gIT09ICcxLjMuMCcpIHtcclxuICAgICAgICBpZiAoIXNvdXJjZVBhcmFtcy5TUlMgJiYgIXNvdXJjZVBhcmFtcy5zcnMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgWW91IG11c3Qgc2V0IGEgU1JTIChvciBzcnMpIHBhcmFtIGZvciB5b3VyIFdNU1xyXG4gICAgICAgICAgIChsYXllciA9ICBgICsgc291cmNlUGFyYW1zLmxheWVycyArIGApIGJlY2F1c2UgeW91ciB3YW50IHRvIHVzZSBhIFdNUyB2ZXJzaW9uIHVuZGVyIDEuMy4wXHJcbiAgICAgICAgRXg6IFwic3JzXCI6IFwiRVBTRzozODU3XCIgYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNvdXJjZVBhcmFtcyAmJiBzb3VyY2VQYXJhbXMuSU5GT19GT1JNQVQpIHtcclxuICAgICAgc291cmNlUGFyYW1zLmluZm9fZm9ybWF0ID0gc291cmNlUGFyYW1zLklORk9fRk9STUFUO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLnJlZnJlc2hJbnRlcnZhbFNlYyAmJiBvcHRpb25zLnJlZnJlc2hJbnRlcnZhbFNlYyA+IDApIHtcclxuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICB9LCBvcHRpb25zLnJlZnJlc2hJbnRlcnZhbFNlYyAqIDEwMDApOyAvLyBDb252ZXJ0IHNlY29uZHMgdG8gTVNcclxuICAgIH1cclxuXHJcbiAgICAvLyAjIyMjICAgU1RBUlQgaWYgcGFyYW1zV0ZTXHJcbiAgICBpZiAob3B0aW9ucy5wYXJhbXNXRlMpIHtcclxuICAgICAgY29uc3Qgd2ZzQ2hlY2t1cCA9IHRoaXMud2ZzU2VydmljZS5jaGVja1dmc09wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgIG9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb24gPSB3ZnNDaGVja3VwLnBhcmFtc1dGUy52ZXJzaW9uO1xyXG4gICAgICBvcHRpb25zLnBhcmFtc1dGUy53ZnNDYXBhYmlsaXRpZXMgPSB3ZnNDaGVja3VwLnBhcmFtcy53ZnNDYXBhYmlsaXRpZXM7XHJcblxyXG4gICAgICB0aGlzLndmc1NlcnZpY2UuZ2V0U291cmNlRmllbGRzRnJvbVdGUyhvcHRpb25zKTtcclxuXHJcbiAgICAgIHRoaXMub3B0aW9ucy5kb3dubG9hZCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucy5kb3dubG9hZCwge1xyXG4gICAgICAgIGR5bmFtaWNVcmw6IHRoaXMuYnVpbGREeW5hbWljRG93bmxvYWRVcmxGcm9tUGFyYW1zV0ZTKHRoaXMub3B0aW9ucylcclxuICAgICAgfSk7XHJcbiAgICB9IC8vICAjIyMjICAgRU5EICBpZiBwYXJhbXNXRlNcclxuICAgIHRoaXMub2djRmlsdGVyV3JpdGVyID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpO1xyXG4gICAgaWYgKCFvcHRpb25zLnNvdXJjZUZpZWxkcyB8fCBvcHRpb25zLnNvdXJjZUZpZWxkcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgb3B0aW9ucy5zb3VyY2VGaWVsZHMgPSBbXTtcclxuICAgIH1cclxuICAgIGNvbnN0IGluaXRPZ2NGaWx0ZXJzID0gKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnM7XHJcbiAgICBpZiAoc291cmNlUGFyYW1zLmxheWVycy5zcGxpdCgnLCcpLmxlbmd0aCA+IDEgJiYgdGhpcy5vcHRpb25zICYmIGluaXRPZ2NGaWx0ZXJzICYmIGluaXRPZ2NGaWx0ZXJzLmVuYWJsZWQpIHtcclxuICAgICAgY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKionKTtcclxuICAgICAgY29uc29sZS5sb2coJ0JFIENBUkVGVUxMLCBZT1VSIFdNUyBMQVlFUlMgKCcgKyBzb3VyY2VQYXJhbXMubGF5ZXJzXHJcbiAgICAgICsgJykgTVVTVCBTSEFSRSBUSEUgU0FNRSBGSUVMRFMgVE8gQUxMT1cgb2djRmlsdGVycyBUTyBXT1JLICEhICcpO1xyXG4gICAgICBjb25zb2xlLmxvZygnKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKicpO1xyXG4gIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIGluaXRPZ2NGaWx0ZXJzICYmIGluaXRPZ2NGaWx0ZXJzLmVuYWJsZWQgJiYgaW5pdE9nY0ZpbHRlcnMuZmlsdGVycykge1xyXG4gICAgICAgIGNvbnN0IGZpbHRlcnMgPSBpbml0T2djRmlsdGVycy5maWx0ZXJzO1xyXG4gICAgICAgIGNvbnN0IHJlYnVpbGRGaWx0ZXIgPSB0aGlzLm9nY0ZpbHRlcldyaXRlci5idWlsZEZpbHRlcihmaWx0ZXJzKTtcclxuICAgICAgICBjb25zdCBhcHBsaWVkRmlsdGVyID0gdGhpcy5mb3JtYXRQcm9jZXNzZWRPZ2NGaWx0ZXIocmVidWlsZEZpbHRlciwgc291cmNlUGFyYW1zLmxheWVycyk7XHJcbiAgICAgICAgY29uc3Qgd21zRmlsdGVyVmFsdWUgPSBhcHBsaWVkRmlsdGVyLmxlbmd0aCA+IDBcclxuICAgICAgICA/IGFwcGxpZWRGaWx0ZXIucmVwbGFjZSgnZmlsdGVyPScsICcnKVxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMub2wudXBkYXRlUGFyYW1zKHsgZmlsdGVyOiB3bXNGaWx0ZXJWYWx1ZSB9KTtcclxuICAgICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHJlZnJlc2goKSB7XHJcbiAgICB0aGlzLm9sLnVwZGF0ZVBhcmFtcyh7IGlnb1JlZnJlc2g6IE1hdGgucmFuZG9tKCkgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZm9ybWF0UHJvY2Vzc2VkT2djRmlsdGVyKHByb2Nlc3NlZEZpbHRlciwgbGF5ZXJzKTogc3RyaW5nIHtcclxuICAgIGxldCBhcHBsaWVkRmlsdGVyID0gJyc7XHJcbiAgICBpZiAocHJvY2Vzc2VkRmlsdGVyLmxlbmd0aCA9PT0gMCAmJiBsYXllcnMuaW5kZXhPZignLCcpID09PSAtMSkge1xyXG4gICAgICBhcHBsaWVkRmlsdGVyID0gcHJvY2Vzc2VkRmlsdGVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGF5ZXJzLnNwbGl0KCcsJykuZm9yRWFjaChsYXllck5hbWUgPT4ge1xyXG4gICAgICAgIGFwcGxpZWRGaWx0ZXIgPSBgJHthcHBsaWVkRmlsdGVyfSgke3Byb2Nlc3NlZEZpbHRlci5yZXBsYWNlKCdmaWx0ZXI9JywgJycpfSlgO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBgZmlsdGVyPSR7YXBwbGllZEZpbHRlcn1gO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZER5bmFtaWNEb3dubG9hZFVybEZyb21QYXJhbXNXRlMoYXNXRlNEYXRhU291cmNlT3B0aW9ucykge1xyXG4gICAgY29uc3Qgb3V0cHV0Rm9ybWF0ID1cclxuICAgICAgYXNXRlNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMub3V0cHV0Rm9ybWF0ICE9PSB1bmRlZmluZWRcclxuICAgICAgICA/ICdvdXRwdXRGb3JtYXQ9JyArIGFzV0ZTRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm91dHB1dEZvcm1hdFxyXG4gICAgICAgIDogJyc7XHJcblxyXG4gICAgbGV0IHBhcmFtTWF4RmVhdHVyZXMgPSAnbWF4RmVhdHVyZXMnO1xyXG4gICAgaWYgKFxyXG4gICAgICBhc1dGU0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uID09PSAnMi4wLjAnIHx8XHJcbiAgICAgICFhc1dGU0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uXHJcbiAgICApIHtcclxuICAgICAgcGFyYW1NYXhGZWF0dXJlcyA9ICdjb3VudCc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtYXhGZWF0dXJlcyA9IGFzV0ZTRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm1heEZlYXR1cmVzXHJcbiAgICAgID8gcGFyYW1NYXhGZWF0dXJlcyArICc9JyArIGFzV0ZTRGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm1heEZlYXR1cmVzXHJcbiAgICAgIDogcGFyYW1NYXhGZWF0dXJlcyArICc9NTAwMCc7XHJcbiAgICBjb25zdCBzcnNuYW1lID0gYXNXRlNEYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMuc3JzTmFtZVxyXG4gICAgICA/ICdzcnNuYW1lPScgKyBhc1dGU0RhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy5zcnNOYW1lXHJcbiAgICAgIDogJ3Nyc25hbWU9RVBTRzozODU3JztcclxuICAgIGNvbnN0IGJhc2VXZnNRdWVyeSA9IHRoaXMud2ZzU2VydmljZS5idWlsZEJhc2VXZnNVcmwoXHJcbiAgICAgIGFzV0ZTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICAgICdHZXRGZWF0dXJlJ1xyXG4gICAgKTtcclxuICAgIHJldHVybiBgJHtiYXNlV2ZzUXVlcnl9JiR7b3V0cHV0Rm9ybWF0fSYke3Nyc25hbWV9JiR7bWF4RmVhdHVyZXN9YDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZUltYWdlV01TIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMucGFyYW1zV0ZTKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucy51cmxXZnMgPSB0aGlzLm9wdGlvbnMudXJsV2ZzXHJcbiAgICAgICAgPyB0aGlzLm9wdGlvbnMudXJsV2ZzXHJcbiAgICAgICAgOiB0aGlzLm9wdGlvbnMudXJsO1xyXG4gICAgICB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb24gPSB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLnZlcnNpb25cclxuICAgICAgICA/IHRoaXMub3B0aW9ucy5wYXJhbXNXRlMudmVyc2lvblxyXG4gICAgICAgIDogJzIuMC4wJztcclxuICAgIH1cclxuICAgIGxldCBpbml0T2djRmlsdGVycyA9ICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzO1xyXG4gICAgY29uc3Qgb2djRmlsdGVyc0RlZmF1bHRWYWx1ZSA9IGZhbHNlOyAvLyBkZWZhdWx0IHZhbHVlcyBmb3Igd21zLlxyXG4gICAgaW5pdE9nY0ZpbHRlcnMgPSBpbml0T2djRmlsdGVycyA9PT0gdW5kZWZpbmVkID8ge30gOiBpbml0T2djRmlsdGVycztcclxuICAgIGluaXRPZ2NGaWx0ZXJzLmVuYWJsZWQgPSBpbml0T2djRmlsdGVycy5lbmFibGVkID09PSB1bmRlZmluZWQgPyBvZ2NGaWx0ZXJzRGVmYXVsdFZhbHVlIDogaW5pdE9nY0ZpbHRlcnMuZW5hYmxlZDtcclxuICAgIGluaXRPZ2NGaWx0ZXJzLmVkaXRhYmxlID0gaW5pdE9nY0ZpbHRlcnMuZWRpdGFibGUgPT09IHVuZGVmaW5lZCA/IG9nY0ZpbHRlcnNEZWZhdWx0VmFsdWUgOiBpbml0T2djRmlsdGVycy5lZGl0YWJsZTtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VJbWFnZVdNUyh0aGlzLm9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kKHNjYWxlPzogbnVtYmVyKTogRGF0YVNvdXJjZUxlZ2VuZE9wdGlvbnNbXSB7XHJcbiAgICBsZXQgbGVnZW5kID0gc3VwZXIuZ2V0TGVnZW5kKCk7XHJcbiAgICBpZiAobGVnZW5kLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIGxlZ2VuZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzb3VyY2VQYXJhbXMgPSB0aGlzLnBhcmFtcztcclxuXHJcbiAgICBsZXQgbGF5ZXJzID0gW107XHJcbiAgICBpZiAoc291cmNlUGFyYW1zLmxheWVycyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGxheWVycyA9IHNvdXJjZVBhcmFtcy5sYXllcnMuc3BsaXQoJywnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBiYXNlVXJsID0gdGhpcy5vcHRpb25zLnVybC5yZXBsYWNlKC9cXD8kLywgJycpO1xyXG4gICAgY29uc3QgcGFyYW1zID0gW1xyXG4gICAgICAnUkVRVUVTVD1HZXRMZWdlbmRHcmFwaGljJyxcclxuICAgICAgJ1NFUlZJQ0U9d21zJyxcclxuICAgICAgJ0ZPUk1BVD1pbWFnZS9wbmcnLFxyXG4gICAgICAnTEVHRU5EX09QVElPTlM9Zm9yY2VMYWJlbHM6b24nLFxyXG4gICAgICAnU0xEX1ZFUlNJT049MS4xLjAnLFxyXG4gICAgICBgVkVSU0lPTj0ke3NvdXJjZVBhcmFtcy52ZXJzaW9uIHx8ICcxLjMuMCd9YFxyXG4gICAgXTtcclxuICAgIGlmIChzY2FsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHBhcmFtcy5wdXNoKGBTQ0FMRT0ke3NjYWxlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGxlZ2VuZCA9IGxheWVycy5tYXAoKGxheWVyOiBzdHJpbmcpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB1cmw6IGAke2Jhc2VVcmx9PyR7cGFyYW1zLmpvaW4oJyYnKX0mTEFZRVI9JHtsYXllcn1gLFxyXG4gICAgICAgIHRpdGxlOiBsYXllcnMubGVuZ3RoID4gMSA/IGxheWVyIDogdW5kZWZpbmVkXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbGVnZW5kO1xyXG4gIH1cclxufVxyXG4iXX0=