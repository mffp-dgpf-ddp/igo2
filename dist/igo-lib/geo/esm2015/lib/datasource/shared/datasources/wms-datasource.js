/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olSourceImageWMS from 'ol/source/ImageWMS';
import { DataSource } from './datasource';
import { OgcFilterWriter } from '../../../filter/shared/ogc-filter';
import { QueryHtmlTarget } from '../../../query/shared/query.enums';
import { formatWFSQueryString, checkWfsParams, defaultFieldNameGeometry } from './wms-wfs.utils';
import { ObjectUtils } from '@igo2/utils';
export class WMSDataSource extends DataSource {
    /**
     * @param {?} options
     * @param {?} wfsService
     */
    constructor(options, wfsService) {
        super(options);
        this.options = options;
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
        /** @type {?} */
        let fieldNameGeometry = defaultFieldNameGeometry;
        // ####   START if paramsWFS
        if (options.paramsWFS) {
            /** @type {?} */
            const wfsCheckup = checkWfsParams(options, 'wms');
            ObjectUtils.mergeDeep(options.paramsWFS, wfsCheckup.paramsWFS);
            fieldNameGeometry = options.paramsWFS.fieldNameGeometry || fieldNameGeometry;
            options.download = Object.assign({}, options.download, {
                dynamicUrl: this.buildDynamicDownloadUrlFromParamsWFS(options)
            });
        } //  ####   END  if paramsWFS
        if (!options.sourceFields || options.sourceFields.length === 0) {
            options.sourceFields = [];
        }
        else {
            options.sourceFields.forEach((/**
             * @param {?} sourceField
             * @return {?}
             */
            sourceField => {
                sourceField.alias = sourceField.alias ? sourceField.alias : sourceField.name;
                // to allow only a list of sourcefield with names
            }));
        }
        /** @type {?} */
        const initOgcFilters = ((/** @type {?} */ (options))).ogcFilters;
        /** @type {?} */
        const ogcFilterWriter = new OgcFilterWriter();
        if (!initOgcFilters) {
            ((/** @type {?} */ (options))).ogcFilters =
                ogcFilterWriter.defineOgcFiltersDefaultOptions(initOgcFilters, fieldNameGeometry, 'wms');
        }
        else {
            initOgcFilters.advancedOgcFilters = initOgcFilters.pushButtons ? false : true;
        }
        if (sourceParams.layers.split(',').length > 1 && options && initOgcFilters.enabled) {
            console.log('*******************************');
            console.log('BE CAREFULL, YOUR WMS LAYERS (' + sourceParams.layers
                + ') MUST SHARE THE SAME FIELDS TO ALLOW ogcFilters TO WORK !! ');
            console.log('*******************************');
        }
        if (options.paramsWFS && initOgcFilters.enabled) {
            this.wfsService.getSourceFieldsFromWFS(options);
        }
        /** @type {?} */
        const filterQueryString = ogcFilterWriter.handleOgcFiltersAppliedValue(options, fieldNameGeometry);
        this.ol.updateParams({ filter: filterQueryString });
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
     * @private
     * @param {?} asWFSDataSourceOptions
     * @return {?}
     */
    buildDynamicDownloadUrlFromParamsWFS(asWFSDataSourceOptions) {
        /** @type {?} */
        const queryStringValues = formatWFSQueryString(asWFSDataSourceOptions);
        /** @type {?} */
        const downloadUrl = queryStringValues.find((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name === 'getfeature')).value;
        return downloadUrl;
    }
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
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
    /**
     * @return {?}
     */
    onUnwatch() { }
}
if (false) {
    /** @type {?} */
    WMSDataSource.prototype.ol;
    /** @type {?} */
    WMSDataSource.prototype.options;
    /**
     * @type {?}
     * @protected
     */
    WMSDataSource.prototype.wfsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUsxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFcEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBcUIsY0FBYyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEgsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUxQyxNQUFNLE9BQU8sYUFBYyxTQUFRLFVBQVU7Ozs7O0lBbUIzQyxZQUNTLE9BQTZCLEVBQzFCLFVBQXNCO1FBRWhDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUhSLFlBQU8sR0FBUCxPQUFPLENBQXNCO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQVk7Ozs7OztjQVExQixZQUFZLEdBQVEsT0FBTyxDQUFDLE1BQU07UUFDeEMsSUFBSSxZQUFZLElBQUksWUFBWSxDQUFDLE9BQU8sRUFBRTtZQUN4QyxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7U0FDN0M7UUFFRCxJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsT0FBTyxFQUFFO1lBQ3hDLElBQUksWUFBWSxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTtvQkFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQztzQkFDSixHQUFHLFlBQVksQ0FB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SUFFTSxTQUFTLEtBQUksQ0FBQztDQUN0Qjs7O0lBcEpDLDJCQUE0Qjs7SUFtQjFCLGdDQUFvQzs7Ozs7SUFDcEMsbUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlSW1hZ2VXTVMgZnJvbSAnb2wvc291cmNlL0ltYWdlV01TJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlTGVnZW5kT3B0aW9ucyB9IGZyb20gJy4vZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vd21zLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgV0ZTU2VydmljZSB9IGZyb20gJy4vd2ZzLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgT2djRmlsdGVyV3JpdGVyIH0gZnJvbSAnLi4vLi4vLi4vZmlsdGVyL3NoYXJlZC9vZ2MtZmlsdGVyJztcclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vZmlsdGVyL3NoYXJlZC9vZ2MtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFF1ZXJ5SHRtbFRhcmdldCB9IGZyb20gJy4uLy4uLy4uL3F1ZXJ5L3NoYXJlZC9xdWVyeS5lbnVtcyc7XHJcbmltcG9ydCB7IGZvcm1hdFdGU1F1ZXJ5U3RyaW5nLCBkZWZhdWx0V2ZzVmVyc2lvbiwgY2hlY2tXZnNQYXJhbXMsIGRlZmF1bHRGaWVsZE5hbWVHZW9tZXRyeSB9IGZyb20gJy4vd21zLXdmcy51dGlscyc7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBXTVNEYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZUltYWdlV01TO1xyXG5cclxuICBnZXQgcGFyYW1zKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnBhcmFtcyBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBnZXQgcXVlcnlUaXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeVRpdGxlXHJcbiAgICAgID8gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5VGl0bGVcclxuICAgICAgOiAndGl0bGUnO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHF1ZXJ5SHRtbFRhcmdldCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeUh0bWxUYXJnZXRcclxuICAgICAgPyAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlIdG1sVGFyZ2V0XHJcbiAgICAgIDogUXVlcnlIdG1sVGFyZ2V0LkJMQU5LO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgb3B0aW9uczogV01TRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgICBwcm90ZWN0ZWQgd2ZzU2VydmljZTogV0ZTU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICAvLyBJbXBvcnRhbnQ6IFRvIHVzZSB3bXMgdmVyc2lvbnMgc21hbGxlciB0aGFuIDEuMy4wLCBTUlNcclxuICAgIC8vIG5lZWRzIHRvIGJlIHN1cHBsaWVkIGluIHRoZSBzb3VyY2UgXCJwYXJhbXNcIlxyXG5cclxuICAgIC8vIFdlIG5lZWQgdG8gZG8gdGhpcyB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCB2ZXJzaW9uXHJcbiAgICAvLyBvZiBvcGVubGF5ZXJzIHdoaWNoIGlzIHVwcGVyY2FzZVxyXG4gICAgY29uc3Qgc291cmNlUGFyYW1zOiBhbnkgPSBvcHRpb25zLnBhcmFtcztcclxuICAgIGlmIChzb3VyY2VQYXJhbXMgJiYgc291cmNlUGFyYW1zLnZlcnNpb24pIHtcclxuICAgICAgc291cmNlUGFyYW1zLlZFUlNJT04gPSBzb3VyY2VQYXJhbXMudmVyc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc291cmNlUGFyYW1zICYmIHNvdXJjZVBhcmFtcy5WRVJTSU9OKSB7XHJcbiAgICAgIGlmIChzb3VyY2VQYXJhbXMudmVyc2lvbiAhPT0gJzEuMy4wJykge1xyXG4gICAgICAgIGlmICghc291cmNlUGFyYW1zLlNSUyAmJiAhc291cmNlUGFyYW1zLnNycykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBZb3UgbXVzdCBzZXQgYSBTUlMgKG9yIHNycykgcGFyYW0gZm9yIHlvdXIgV01TXHJcbiAgICAgICAgICAgKGxheWVyID0gIGAgKyBzb3VyY2VQYXJhbXMubGF5ZXJzICsgYCkgYmVjYXVzZSB5b3VyIHdhbnQgdG8gdXNlIGEgV01TIHZlcnNpb24gdW5kZXIgMS4zLjBcclxuICAgICAgICBFeDogXCJzcnNcIjogXCJFUFNHOjM4NTdcIiBgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoc291cmNlUGFyYW1zICYmIHNvdXJjZVBhcmFtcy5JTkZPX0ZPUk1BVCkge1xyXG4gICAgICBzb3VyY2VQYXJhbXMuaW5mb19mb3JtYXQgPSBzb3VyY2VQYXJhbXMuSU5GT19GT1JNQVQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnMucmVmcmVzaEludGVydmFsU2VjICYmIG9wdGlvbnMucmVmcmVzaEludGVydmFsU2VjID4gMCkge1xyXG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgIH0sIG9wdGlvbnMucmVmcmVzaEludGVydmFsU2VjICogMTAwMCk7IC8vIENvbnZlcnQgc2Vjb25kcyB0byBNU1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBmaWVsZE5hbWVHZW9tZXRyeSA9IGRlZmF1bHRGaWVsZE5hbWVHZW9tZXRyeTtcclxuXHJcbiAgICAvLyAjIyMjICAgU1RBUlQgaWYgcGFyYW1zV0ZTXHJcbiAgICBpZiAob3B0aW9ucy5wYXJhbXNXRlMpIHtcclxuICAgICAgY29uc3Qgd2ZzQ2hlY2t1cCA9IGNoZWNrV2ZzUGFyYW1zKG9wdGlvbnMsICd3bXMnKTtcclxuICAgICAgT2JqZWN0VXRpbHMubWVyZ2VEZWVwKG9wdGlvbnMucGFyYW1zV0ZTLCB3ZnNDaGVja3VwLnBhcmFtc1dGUyk7XHJcblxyXG4gICAgICBmaWVsZE5hbWVHZW9tZXRyeSA9IG9wdGlvbnMucGFyYW1zV0ZTLmZpZWxkTmFtZUdlb21ldHJ5IHx8IGZpZWxkTmFtZUdlb21ldHJ5O1xyXG5cclxuICAgICAgb3B0aW9ucy5kb3dubG9hZCA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMuZG93bmxvYWQsIHtcclxuICAgICAgICBkeW5hbWljVXJsOiB0aGlzLmJ1aWxkRHluYW1pY0Rvd25sb2FkVXJsRnJvbVBhcmFtc1dGUyhvcHRpb25zKVxyXG4gICAgICB9KTtcclxuICAgIH0gLy8gICMjIyMgICBFTkQgIGlmIHBhcmFtc1dGU1xyXG4gICAgaWYgKCFvcHRpb25zLnNvdXJjZUZpZWxkcyB8fCBvcHRpb25zLnNvdXJjZUZpZWxkcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgb3B0aW9ucy5zb3VyY2VGaWVsZHMgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9wdGlvbnMuc291cmNlRmllbGRzLmZvckVhY2goc291cmNlRmllbGQgPT4ge1xyXG4gICAgICAgIHNvdXJjZUZpZWxkLmFsaWFzID0gc291cmNlRmllbGQuYWxpYXMgPyBzb3VyY2VGaWVsZC5hbGlhcyA6IHNvdXJjZUZpZWxkLm5hbWU7XHJcbiAgICAgICAgLy8gdG8gYWxsb3cgb25seSBhIGxpc3Qgb2Ygc291cmNlZmllbGQgd2l0aCBuYW1lc1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0IGluaXRPZ2NGaWx0ZXJzID0gKG9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzO1xyXG4gICAgY29uc3Qgb2djRmlsdGVyV3JpdGVyID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpO1xyXG5cclxuICAgIGlmICghaW5pdE9nY0ZpbHRlcnMpIHtcclxuICAgICAgKG9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzID1cclxuICAgICAgICBvZ2NGaWx0ZXJXcml0ZXIuZGVmaW5lT2djRmlsdGVyc0RlZmF1bHRPcHRpb25zKGluaXRPZ2NGaWx0ZXJzLCBmaWVsZE5hbWVHZW9tZXRyeSwgJ3dtcycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5pdE9nY0ZpbHRlcnMuYWR2YW5jZWRPZ2NGaWx0ZXJzID0gaW5pdE9nY0ZpbHRlcnMucHVzaEJ1dHRvbnMgPyBmYWxzZSA6IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoc291cmNlUGFyYW1zLmxheWVycy5zcGxpdCgnLCcpLmxlbmd0aCA+IDEgJiYgb3B0aW9ucyAmJiBpbml0T2djRmlsdGVycy5lbmFibGVkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCcqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdCRSBDQVJFRlVMTCwgWU9VUiBXTVMgTEFZRVJTICgnICsgc291cmNlUGFyYW1zLmxheWVyc1xyXG4gICAgICArICcpIE1VU1QgU0hBUkUgVEhFIFNBTUUgRklFTERTIFRPIEFMTE9XIG9nY0ZpbHRlcnMgVE8gV09SSyAhISAnKTtcclxuICAgICAgY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKionKTtcclxuICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnMucGFyYW1zV0ZTICYmIGluaXRPZ2NGaWx0ZXJzLmVuYWJsZWQpIHtcclxuICAgICAgdGhpcy53ZnNTZXJ2aWNlLmdldFNvdXJjZUZpZWxkc0Zyb21XRlMob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmlsdGVyUXVlcnlTdHJpbmcgPSBvZ2NGaWx0ZXJXcml0ZXIuaGFuZGxlT2djRmlsdGVyc0FwcGxpZWRWYWx1ZShvcHRpb25zLCBmaWVsZE5hbWVHZW9tZXRyeSk7XHJcbiAgICB0aGlzLm9sLnVwZGF0ZVBhcmFtcyh7IGZpbHRlcjogZmlsdGVyUXVlcnlTdHJpbmcgfSk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoKCkge1xyXG4gICAgdGhpcy5vbC51cGRhdGVQYXJhbXMoeyBpZ29SZWZyZXNoOiBNYXRoLnJhbmRvbSgpIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZER5bmFtaWNEb3dubG9hZFVybEZyb21QYXJhbXNXRlMoYXNXRlNEYXRhU291cmNlT3B0aW9ucykge1xyXG4gICAgY29uc3QgcXVlcnlTdHJpbmdWYWx1ZXMgPSBmb3JtYXRXRlNRdWVyeVN0cmluZyhhc1dGU0RhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgIGNvbnN0IGRvd25sb2FkVXJsID0gcXVlcnlTdHJpbmdWYWx1ZXMuZmluZChmID0+IGYubmFtZSA9PT0gJ2dldGZlYXR1cmUnKS52YWx1ZTtcclxuICAgIHJldHVybiBkb3dubG9hZFVybDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZUltYWdlV01TIHtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VJbWFnZVdNUyh0aGlzLm9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kKHNjYWxlPzogbnVtYmVyKTogRGF0YVNvdXJjZUxlZ2VuZE9wdGlvbnNbXSB7XHJcbiAgICBsZXQgbGVnZW5kID0gc3VwZXIuZ2V0TGVnZW5kKCk7XHJcbiAgICBpZiAobGVnZW5kLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIGxlZ2VuZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzb3VyY2VQYXJhbXMgPSB0aGlzLnBhcmFtcztcclxuXHJcbiAgICBsZXQgbGF5ZXJzID0gW107XHJcbiAgICBpZiAoc291cmNlUGFyYW1zLmxheWVycyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGxheWVycyA9IHNvdXJjZVBhcmFtcy5sYXllcnMuc3BsaXQoJywnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBiYXNlVXJsID0gdGhpcy5vcHRpb25zLnVybC5yZXBsYWNlKC9cXD8kLywgJycpO1xyXG4gICAgY29uc3QgcGFyYW1zID0gW1xyXG4gICAgICAnUkVRVUVTVD1HZXRMZWdlbmRHcmFwaGljJyxcclxuICAgICAgJ1NFUlZJQ0U9d21zJyxcclxuICAgICAgJ0ZPUk1BVD1pbWFnZS9wbmcnLFxyXG4gICAgICAnU0xEX1ZFUlNJT049MS4xLjAnLFxyXG4gICAgICBgVkVSU0lPTj0ke3NvdXJjZVBhcmFtcy52ZXJzaW9uIHx8ICcxLjMuMCd9YFxyXG4gICAgXTtcclxuICAgIGlmIChzY2FsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHBhcmFtcy5wdXNoKGBTQ0FMRT0ke3NjYWxlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGxlZ2VuZCA9IGxheWVycy5tYXAoKGxheWVyOiBzdHJpbmcpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB1cmw6IGAke2Jhc2VVcmx9PyR7cGFyYW1zLmpvaW4oJyYnKX0mTEFZRVI9JHtsYXllcn1gLFxyXG4gICAgICAgIHRpdGxlOiBsYXllcnMubGVuZ3RoID4gMSA/IGxheWVyIDogdW5kZWZpbmVkXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbGVnZW5kO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHt9XHJcbn1cclxuIl19