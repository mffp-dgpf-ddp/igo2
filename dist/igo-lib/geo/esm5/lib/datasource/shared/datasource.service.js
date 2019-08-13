/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CapabilitiesService } from './capabilities.service';
import { WFSService } from './datasources/wfs.service';
import { OSMDataSource, FeatureDataSource, XYZDataSource, WFSDataSource, WMTSDataSource, WMSDataSource, CartoDataSource, ArcGISRestDataSource, TileArcGISRestDataSource, WebSocketDataSource, MVTDataSource, ClusterDataSource } from './datasources';
import * as i0 from "@angular/core";
import * as i1 from "./capabilities.service";
import * as i2 from "./datasources/wfs.service";
var DataSourceService = /** @class */ (function () {
    function DataSourceService(capabilitiesService, wfsDataSourceService) {
        this.capabilitiesService = capabilitiesService;
        this.wfsDataSourceService = wfsDataSourceService;
        this.datasources$ = new BehaviorSubject([]);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    DataSourceService.prototype.createAsyncDataSource = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (!context.type) {
            console.error(context);
            throw new Error('Datasource needs a type');
        }
        /** @type {?} */
        var dataSource;
        switch (context.type.toLowerCase()) {
            case 'osm':
                dataSource = this.createOSMDataSource((/** @type {?} */ (context)));
                break;
            case 'vector':
                dataSource = this.createFeatureDataSource((/** @type {?} */ (context)));
                break;
            case 'wfs':
                dataSource = this.createWFSDataSource((/** @type {?} */ (context)));
                break;
            case 'wms':
                dataSource = this.createWMSDataSource((/** @type {?} */ (context)));
                break;
            case 'wmts':
                dataSource = this.createWMTSDataSource((/** @type {?} */ (context)));
                break;
            case 'xyz':
                dataSource = this.createXYZDataSource((/** @type {?} */ (context)));
                break;
            case 'carto':
                dataSource = this.createCartoDataSource((/** @type {?} */ (context)));
                break;
            case 'arcgisrest':
                dataSource = this.createArcGISRestDataSource((/** @type {?} */ (context)));
                break;
            case 'websocket':
                dataSource = this.createWebSocketDataSource((/** @type {?} */ (context)));
                break;
            case 'mvt':
                dataSource = this.createMVTDataSource((/** @type {?} */ (context)));
                break;
            case 'tilearcgisrest':
                dataSource = this.createTileArcGISRestDataSource((/** @type {?} */ (context)));
                break;
            case 'cluster':
                dataSource = this.createClusterDataSource((/** @type {?} */ (context)));
                break;
            default:
                console.error(context);
                throw new Error('Invalid datasource type');
        }
        this.datasources$.next(this.datasources$.value.concat([dataSource]));
        return dataSource;
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    DataSourceService.prototype.createOSMDataSource = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new OSMDataSource(context)); }));
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    DataSourceService.prototype.createFeatureDataSource = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new FeatureDataSource(context)); }));
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    DataSourceService.prototype.createWebSocketDataSource = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new WebSocketDataSource(context)); }));
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    DataSourceService.prototype.createWFSDataSource = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.next(new WFSDataSource(context, _this.wfsDataSourceService));
        }));
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    DataSourceService.prototype.createWMSDataSource = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        if (context.optionsFromCapabilities) {
            return this.capabilitiesService
                .getWMSOptions(context)
                .pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            function (options) {
                return new WMSDataSource(options, _this.wfsDataSourceService);
            })));
        }
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.next(new WMSDataSource(context, _this.wfsDataSourceService));
        }));
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    DataSourceService.prototype.createWMTSDataSource = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (context.optionsFromCapabilities) {
            return this.capabilitiesService
                .getWMTSOptions(context)
                .pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            function (options) { return new WMTSDataSource(options); })));
        }
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new WMTSDataSource(context)); }));
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    DataSourceService.prototype.createXYZDataSource = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new XYZDataSource(context)); }));
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    DataSourceService.prototype.createCartoDataSource = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (context.mapId) {
            return this.capabilitiesService
                .getCartoOptions(context)
                .pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            function (options) { return new CartoDataSource(options); })));
        }
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new CartoDataSource(context)); }));
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    DataSourceService.prototype.createArcGISRestDataSource = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return this.capabilitiesService
            .getArcgisOptions(context)
            .pipe(map((/**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            return new ArcGISRestDataSource(options);
        })));
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    DataSourceService.prototype.createTileArcGISRestDataSource = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return this.capabilitiesService
            .getTileArcgisOptions(context)
            .pipe(map((/**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            return new TileArcGISRestDataSource(options);
        })));
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    DataSourceService.prototype.createMVTDataSource = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new MVTDataSource(context)); }));
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    DataSourceService.prototype.createClusterDataSource = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new ClusterDataSource(context)); }));
    };
    DataSourceService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DataSourceService.ctorParameters = function () { return [
        { type: CapabilitiesService },
        { type: WFSService }
    ]; };
    /** @nocollapse */ DataSourceService.ngInjectableDef = i0.defineInjectable({ factory: function DataSourceService_Factory() { return new DataSourceService(i0.inject(i1.CapabilitiesService), i0.inject(i2.WFSService)); }, token: DataSourceService, providedIn: "root" });
    return DataSourceService;
}());
export { DataSourceService };
if (false) {
    /** @type {?} */
    DataSourceService.prototype.datasources$;
    /**
     * @type {?}
     * @private
     */
    DataSourceService.prototype.capabilitiesService;
    /**
     * @type {?}
     * @private
     */
    DataSourceService.prototype.wfsDataSourceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFFTCxhQUFhLEVBRWIsaUJBQWlCLEVBRWpCLGFBQWEsRUFFYixhQUFhLEVBRWIsY0FBYyxFQUVkLGFBQWEsRUFFYixlQUFlLEVBRWYsb0JBQW9CLEVBRXBCLHdCQUF3QixFQUV4QixtQkFBbUIsRUFFbkIsYUFBYSxFQUViLGlCQUFpQixFQUVsQixNQUFNLGVBQWUsQ0FBQzs7OztBQUV2QjtJQU1FLDJCQUNVLG1CQUF3QyxFQUN4QyxvQkFBZ0M7UUFEaEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQVk7UUFKbkMsaUJBQVksR0FBRyxJQUFJLGVBQWUsQ0FBZSxFQUFFLENBQUMsQ0FBQztJQUt6RCxDQUFDOzs7OztJQUVKLGlEQUFxQjs7OztJQUFyQixVQUFzQixPQUE2QjtRQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUM1Qzs7WUFDRyxVQUFVO1FBQ2QsUUFBUSxPQUFPLENB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aUMsRUFDcEMsQ0FDRixDQUFDO0lBQ04sQ0FBQzs7Ozs7O0lBRU8sMERBQThCOzs7OztJQUF0QyxVQUNFLE9BQXdDO1FBRXhDLE9BQU8sSUFBSSxDQUFDLG1CQUFtQjthQUM1QixvQkFBb0IsQ0FBQyxPQUFPLENBQUM7YUFDN0IsSUFBSSxDQUNILEdBQUc7Ozs7UUFDRCxVQUFDLE9BQXdDO1lBQ3ZDLE9BQUEsSUFBSSx3QkFBd0IsQ0FBQyxPQUFPLENBQUM7UUFBckMsQ0FBcUMsRUFDeEMsQ0FDRixDQUFDO0lBQ04sQ0FBQzs7Ozs7O0lBRU8sK0NBQW1COzs7OztJQUEzQixVQUNFLE9BQTZCO1FBRTdCLE9BQU8sSUFBSSxVQUFVOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQWxDLENBQWtDLEVBQUMsQ0FBQztJQUNqRSxDQUFDOzs7Ozs7SUFFTyxtREFBdUI7Ozs7O0lBQS9CLFVBQ0UsT0FBaUM7UUFFakMsT0FBTyxJQUFJLFVBQVU7Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUF0QyxDQUFzQyxFQUFDLENBQUM7SUFDckUsQ0FBQzs7Z0JBaE1GLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBaENRLG1CQUFtQjtnQkFDbkIsVUFBVTs7OzRCQUxuQjtDQW1PQyxBQWpNRCxJQWlNQztTQTlMWSxpQkFBaUI7OztJQUM1Qix5Q0FBNEQ7Ozs7O0lBRzFELGdEQUFnRDs7Ozs7SUFDaEQsaURBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgQ2FwYWJpbGl0aWVzU2VydmljZSB9IGZyb20gJy4vY2FwYWJpbGl0aWVzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBXRlNTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhc291cmNlcy93ZnMuc2VydmljZSc7XHJcbmltcG9ydCB7XHJcbiAgRGF0YVNvdXJjZSxcclxuICBPU01EYXRhU291cmNlLFxyXG4gIE9TTURhdGFTb3VyY2VPcHRpb25zLFxyXG4gIEZlYXR1cmVEYXRhU291cmNlLFxyXG4gIEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyxcclxuICBYWVpEYXRhU291cmNlLFxyXG4gIFhZWkRhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdGU0RhdGFTb3VyY2UsXHJcbiAgV0ZTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgV01UU0RhdGFTb3VyY2UsXHJcbiAgV01UU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdNU0RhdGFTb3VyY2UsXHJcbiAgV01TRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgQ2FydG9EYXRhU291cmNlLFxyXG4gIENhcnRvRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgQXJjR0lTUmVzdERhdGFTb3VyY2UsXHJcbiAgQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZSxcclxuICBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdlYlNvY2tldERhdGFTb3VyY2UsXHJcbiAgQW55RGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgTVZURGF0YVNvdXJjZSxcclxuICBNVlREYXRhU291cmNlT3B0aW9ucyxcclxuICBDbHVzdGVyRGF0YVNvdXJjZSxcclxuICBDbHVzdGVyRGF0YVNvdXJjZU9wdGlvbnNcclxufSBmcm9tICcuL2RhdGFzb3VyY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFTb3VyY2VTZXJ2aWNlIHtcclxuICBwdWJsaWMgZGF0YXNvdXJjZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXRhU291cmNlW10+KFtdKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNhcGFiaWxpdGllc1NlcnZpY2U6IENhcGFiaWxpdGllc1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHdmc0RhdGFTb3VyY2VTZXJ2aWNlOiBXRlNTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBjcmVhdGVBc3luY0RhdGFTb3VyY2UoY29udGV4dDogQW55RGF0YVNvdXJjZU9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGFTb3VyY2U+IHtcclxuICAgIGlmICghY29udGV4dC50eXBlKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoY29udGV4dCk7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YXNvdXJjZSBuZWVkcyBhIHR5cGUnKTtcclxuICAgIH1cclxuICAgIGxldCBkYXRhU291cmNlO1xyXG4gICAgc3dpdGNoIChjb250ZXh0LnR5cGUudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICBjYXNlICdvc20nOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZU9TTURhdGFTb3VyY2UoY29udGV4dCBhcyBPU01EYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3ZlY3Rvcic6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlRmVhdHVyZURhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIEZlYXR1cmVEYXRhU291cmNlT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dmcyc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlV0ZTRGF0YVNvdXJjZShjb250ZXh0IGFzIFdGU0RhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd21zJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVXTVNEYXRhU291cmNlKGNvbnRleHQgYXMgV01TRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd3bXRzJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVXTVRTRGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgV01UU0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAneHl6JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVYWVpEYXRhU291cmNlKGNvbnRleHQgYXMgWFlaRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjYXJ0byc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlQ2FydG9EYXRhU291cmNlKFxyXG4gICAgICAgICAgY29udGV4dCBhcyBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYXJjZ2lzcmVzdCc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlQXJjR0lTUmVzdERhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dlYnNvY2tldCc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlV2ViU29ja2V0RGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbXZ0JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVNVlREYXRhU291cmNlKGNvbnRleHQgYXMgTVZURGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0aWxlYXJjZ2lzcmVzdCc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlKFxyXG4gICAgICAgICAgY29udGV4dCBhcyBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY2x1c3Rlcic6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlQ2x1c3RlckRhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIENsdXN0ZXJEYXRhU291cmNlT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihjb250ZXh0KTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZGF0YXNvdXJjZSB0eXBlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kYXRhc291cmNlcyQubmV4dCh0aGlzLmRhdGFzb3VyY2VzJC52YWx1ZS5jb25jYXQoW2RhdGFTb3VyY2VdKSk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGFTb3VyY2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZU9TTURhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBPU01EYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8T1NNRGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KG5ldyBPU01EYXRhU291cmNlKGNvbnRleHQpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUZlYXR1cmVEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxGZWF0dXJlRGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KG5ldyBGZWF0dXJlRGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVXZWJTb2NrZXREYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxXZWJTb2NrZXREYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IFdlYlNvY2tldERhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlV0ZTRGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IFdGU0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxXRlNEYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PlxyXG4gICAgICBkLm5leHQobmV3IFdGU0RhdGFTb3VyY2UoY29udGV4dCwgdGhpcy53ZnNEYXRhU291cmNlU2VydmljZSkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVXTVNEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogV01TRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdNU0RhdGFTb3VyY2U+IHtcclxuICAgIGlmIChjb250ZXh0Lm9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2VcclxuICAgICAgICAuZ2V0V01TT3B0aW9ucyhjb250ZXh0KVxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgbWFwKFxyXG4gICAgICAgICAgICAob3B0aW9uczogV01TRGF0YVNvdXJjZU9wdGlvbnMpID0+XHJcbiAgICAgICAgICAgICAgbmV3IFdNU0RhdGFTb3VyY2Uob3B0aW9ucywgdGhpcy53ZnNEYXRhU291cmNlU2VydmljZSlcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+XHJcbiAgICAgIGQubmV4dChuZXcgV01TRGF0YVNvdXJjZShjb250ZXh0LCB0aGlzLndmc0RhdGFTb3VyY2VTZXJ2aWNlKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVdNVFNEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogV01UU0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxXTVRTRGF0YVNvdXJjZT4ge1xyXG4gICAgaWYgKGNvbnRleHQub3B0aW9uc0Zyb21DYXBhYmlsaXRpZXMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZVxyXG4gICAgICAgIC5nZXRXTVRTT3B0aW9ucyhjb250ZXh0KVxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgbWFwKChvcHRpb25zOiBXTVRTRGF0YVNvdXJjZU9wdGlvbnMpID0+IG5ldyBXTVRTRGF0YVNvdXJjZShvcHRpb25zKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgV01UU0RhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlWFlaRGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IFhZWkRhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxYWVpEYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IFhZWkRhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlQ2FydG9EYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogQ2FydG9EYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8Q2FydG9EYXRhU291cmNlPiB7XHJcbiAgICBpZiAoY29udGV4dC5tYXBJZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlXHJcbiAgICAgICAgLmdldENhcnRvT3B0aW9ucyhjb250ZXh0KVxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgbWFwKChvcHRpb25zOiBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zKSA9PiBuZXcgQ2FydG9EYXRhU291cmNlKG9wdGlvbnMpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IENhcnRvRGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVBcmNHSVNSZXN0RGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8QXJjR0lTUmVzdERhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2VcclxuICAgICAgLmdldEFyY2dpc09wdGlvbnMoY29udGV4dClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKFxyXG4gICAgICAgICAgKG9wdGlvbnM6IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucykgPT5cclxuICAgICAgICAgICAgbmV3IEFyY0dJU1Jlc3REYXRhU291cmNlKG9wdGlvbnMpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2VcclxuICAgICAgLmdldFRpbGVBcmNnaXNPcHRpb25zKGNvbnRleHQpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChcclxuICAgICAgICAgIChvcHRpb25zOiBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zKSA9PlxyXG4gICAgICAgICAgICBuZXcgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlKG9wdGlvbnMpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVNVlREYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogTVZURGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPE1WVERhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgTVZURGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVDbHVzdGVyRGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IENsdXN0ZXJEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8Q2x1c3RlckRhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgQ2x1c3RlckRhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcbn1cclxuIl19