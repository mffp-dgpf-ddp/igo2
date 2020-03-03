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
import { ObjectUtils } from '@igo2/utils';
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
                /** @type {?} */
                var wmsContext = (/** @type {?} */ (context));
                ObjectUtils.removeDuplicateCaseInsensitive(wmsContext.params);
                dataSource = this.createWMSDataSource(wmsContext);
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
            return this.capabilitiesService.getWMSOptions(context).pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            function (options) {
                return options
                    ? new WMSDataSource(options, _this.wfsDataSourceService)
                    : undefined;
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
            return this.capabilitiesService.getWMTSOptions(context).pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            function (options) {
                return options ? new WMTSDataSource(options) : undefined;
            })));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFFTCxhQUFhLEVBRWIsaUJBQWlCLEVBRWpCLGFBQWEsRUFFYixhQUFhLEVBRWIsY0FBYyxFQUVkLGFBQWEsRUFFYixlQUFlLEVBRWYsb0JBQW9CLEVBRXBCLHdCQUF3QixFQUV4QixtQkFBbUIsRUFFbkIsYUFBYSxFQUViLGlCQUFpQixFQUVsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7O0FBRTFDO0lBTUUsMkJBQ1UsbUJBQXdDLEVBQ3hDLG9CQUFnQztRQURoQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBWTtRQUpuQyxpQkFBWSxHQUFHLElBQUksZUFBZSxDQUFlLEVBQUUsQ0FBQyxDQUFDO0lBS3pELENBQUM7Ozs7O0lBRUosaURBQXFCOzs7O0lBQXJCLFVBQXNCLE9BQTZCO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FB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O0lBQzVCLHlDQUE0RDs7Ozs7SUFHMUQsZ0RBQWdEOzs7OztJQUNoRCxpREFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBDYXBhYmlsaXRpZXNTZXJ2aWNlIH0gZnJvbSAnLi9jYXBhYmlsaXRpZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IFdGU1NlcnZpY2UgfSBmcm9tICcuL2RhdGFzb3VyY2VzL3dmcy5zZXJ2aWNlJztcclxuaW1wb3J0IHtcclxuICBEYXRhU291cmNlLFxyXG4gIE9TTURhdGFTb3VyY2UsXHJcbiAgT1NNRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgRmVhdHVyZURhdGFTb3VyY2UsXHJcbiAgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFhZWkRhdGFTb3VyY2UsXHJcbiAgWFlaRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgV0ZTRGF0YVNvdXJjZSxcclxuICBXRlNEYXRhU291cmNlT3B0aW9ucyxcclxuICBXTVRTRGF0YVNvdXJjZSxcclxuICBXTVRTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgV01TRGF0YVNvdXJjZSxcclxuICBXTVNEYXRhU291cmNlT3B0aW9ucyxcclxuICBDYXJ0b0RhdGFTb3VyY2UsXHJcbiAgQ2FydG9EYXRhU291cmNlT3B0aW9ucyxcclxuICBBcmNHSVNSZXN0RGF0YVNvdXJjZSxcclxuICBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlLFxyXG4gIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgV2ViU29ja2V0RGF0YVNvdXJjZSxcclxuICBBbnlEYXRhU291cmNlT3B0aW9ucyxcclxuICBNVlREYXRhU291cmNlLFxyXG4gIE1WVERhdGFTb3VyY2VPcHRpb25zLFxyXG4gIENsdXN0ZXJEYXRhU291cmNlLFxyXG4gIENsdXN0ZXJEYXRhU291cmNlT3B0aW9uc1xyXG59IGZyb20gJy4vZGF0YXNvdXJjZXMnO1xyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFTb3VyY2VTZXJ2aWNlIHtcclxuICBwdWJsaWMgZGF0YXNvdXJjZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXRhU291cmNlW10+KFtdKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNhcGFiaWxpdGllc1NlcnZpY2U6IENhcGFiaWxpdGllc1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHdmc0RhdGFTb3VyY2VTZXJ2aWNlOiBXRlNTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBjcmVhdGVBc3luY0RhdGFTb3VyY2UoY29udGV4dDogQW55RGF0YVNvdXJjZU9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGFTb3VyY2U+IHtcclxuICAgIGlmICghY29udGV4dC50eXBlKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoY29udGV4dCk7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YXNvdXJjZSBuZWVkcyBhIHR5cGUnKTtcclxuICAgIH1cclxuICAgIGxldCBkYXRhU291cmNlO1xyXG4gICAgc3dpdGNoIChjb250ZXh0LnR5cGUudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICBjYXNlICdvc20nOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZU9TTURhdGFTb3VyY2UoY29udGV4dCBhcyBPU01EYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3ZlY3Rvcic6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlRmVhdHVyZURhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIEZlYXR1cmVEYXRhU291cmNlT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dmcyc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlV0ZTRGF0YVNvdXJjZShjb250ZXh0IGFzIFdGU0RhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd21zJzpcclxuICAgICAgICBjb25zdCB3bXNDb250ZXh0ID0gY29udGV4dCBhcyBXTVNEYXRhU291cmNlT3B0aW9ucztcclxuICAgICAgICBPYmplY3RVdGlscy5yZW1vdmVEdXBsaWNhdGVDYXNlSW5zZW5zaXRpdmUod21zQ29udGV4dC5wYXJhbXMpO1xyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZVdNU0RhdGFTb3VyY2Uod21zQ29udGV4dCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dtdHMnOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZVdNVFNEYXRhU291cmNlKFxyXG4gICAgICAgICAgY29udGV4dCBhcyBXTVRTRGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd4eXonOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZVhZWkRhdGFTb3VyY2UoY29udGV4dCBhcyBYWVpEYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NhcnRvJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVDYXJ0b0RhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIENhcnRvRGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdhcmNnaXNyZXN0JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVBcmNHSVNSZXN0RGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd2Vic29ja2V0JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVXZWJTb2NrZXREYXRhU291cmNlKFxyXG4gICAgICAgICAgY29udGV4dCBhcyBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdtdnQnOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZU1WVERhdGFTb3VyY2UoY29udGV4dCBhcyBNVlREYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3RpbGVhcmNnaXNyZXN0JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjbHVzdGVyJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVDbHVzdGVyRGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmVycm9yKGNvbnRleHQpO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkYXRhc291cmNlIHR5cGUnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRhdGFzb3VyY2VzJC5uZXh0KHRoaXMuZGF0YXNvdXJjZXMkLnZhbHVlLmNvbmNhdChbZGF0YVNvdXJjZV0pKTtcclxuXHJcbiAgICByZXR1cm4gZGF0YVNvdXJjZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlT1NNRGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IE9TTURhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxPU01EYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IE9TTURhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlRmVhdHVyZURhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPEZlYXR1cmVEYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IEZlYXR1cmVEYXRhU291cmNlKGNvbnRleHQpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVdlYlNvY2tldERhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdlYlNvY2tldERhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgV2ViU29ja2V0RGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVXRlNEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogV0ZTRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdGU0RhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+XHJcbiAgICAgIGQubmV4dChuZXcgV0ZTRGF0YVNvdXJjZShjb250ZXh0LCB0aGlzLndmc0RhdGFTb3VyY2VTZXJ2aWNlKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVdNU0RhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBXTVNEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8V01TRGF0YVNvdXJjZT4ge1xyXG4gICAgaWYgKGNvbnRleHQub3B0aW9uc0Zyb21DYXBhYmlsaXRpZXMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZS5nZXRXTVNPcHRpb25zKGNvbnRleHQpLnBpcGUoXHJcbiAgICAgICAgbWFwKChvcHRpb25zOiBXTVNEYXRhU291cmNlT3B0aW9ucykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnNcclxuICAgICAgICAgICAgPyBuZXcgV01TRGF0YVNvdXJjZShvcHRpb25zLCB0aGlzLndmc0RhdGFTb3VyY2VTZXJ2aWNlKVxyXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+XHJcbiAgICAgIGQubmV4dChuZXcgV01TRGF0YVNvdXJjZShjb250ZXh0LCB0aGlzLndmc0RhdGFTb3VyY2VTZXJ2aWNlKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVdNVFNEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogV01UU0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxXTVRTRGF0YVNvdXJjZT4ge1xyXG4gICAgaWYgKGNvbnRleHQub3B0aW9uc0Zyb21DYXBhYmlsaXRpZXMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZS5nZXRXTVRTT3B0aW9ucyhjb250ZXh0KS5waXBlKFxyXG4gICAgICAgIG1hcCgob3B0aW9uczogV01UU0RhdGFTb3VyY2VPcHRpb25zKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucyA/IG5ldyBXTVRTRGF0YVNvdXJjZShvcHRpb25zKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgV01UU0RhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlWFlaRGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IFhZWkRhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxYWVpEYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IFhZWkRhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlQ2FydG9EYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogQ2FydG9EYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8Q2FydG9EYXRhU291cmNlPiB7XHJcbiAgICBpZiAoY29udGV4dC5tYXBJZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlXHJcbiAgICAgICAgLmdldENhcnRvT3B0aW9ucyhjb250ZXh0KVxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgbWFwKChvcHRpb25zOiBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zKSA9PiBuZXcgQ2FydG9EYXRhU291cmNlKG9wdGlvbnMpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IENhcnRvRGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVBcmNHSVNSZXN0RGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8QXJjR0lTUmVzdERhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2VcclxuICAgICAgLmdldEFyY2dpc09wdGlvbnMoY29udGV4dClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKFxyXG4gICAgICAgICAgKG9wdGlvbnM6IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucykgPT5cclxuICAgICAgICAgICAgbmV3IEFyY0dJU1Jlc3REYXRhU291cmNlKG9wdGlvbnMpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2VcclxuICAgICAgLmdldFRpbGVBcmNnaXNPcHRpb25zKGNvbnRleHQpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChcclxuICAgICAgICAgIChvcHRpb25zOiBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zKSA9PlxyXG4gICAgICAgICAgICBuZXcgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlKG9wdGlvbnMpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVNVlREYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogTVZURGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPE1WVERhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgTVZURGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVDbHVzdGVyRGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IENsdXN0ZXJEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8Q2x1c3RlckRhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgQ2x1c3RlckRhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcbn1cclxuIl19