/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CapabilitiesService } from './capabilities.service';
import { WFSService } from './datasources/wfs.service';
import { NetworkService } from '@igo2/core';
import { OSMDataSource, FeatureDataSource, XYZDataSource, WFSDataSource, WMTSDataSource, WMSDataSource, CartoDataSource, ArcGISRestDataSource, TileArcGISRestDataSource, WebSocketDataSource, MVTDataSource, ClusterDataSource } from './datasources';
import * as i0 from "@angular/core";
import * as i1 from "./capabilities.service";
import * as i2 from "./datasources/wfs.service";
import * as i3 from "@igo2/core";
var DataSourceService = /** @class */ (function () {
    function DataSourceService(capabilitiesService, wfsDataSourceService, networkService) {
        this.capabilitiesService = capabilitiesService;
        this.wfsDataSourceService = wfsDataSourceService;
        this.networkService = networkService;
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
        var _this = this;
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new OSMDataSource(context, _this.networkService)); }));
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
        var _this = this;
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new FeatureDataSource(context, _this.networkService)); }));
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
        var _this = this;
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new WebSocketDataSource(context, _this.networkService)); }));
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
            return d.next(new WFSDataSource(context, _this.networkService, _this.wfsDataSourceService));
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
                return new WMSDataSource(context, _this.networkService, _this.wfsDataSourceService);
            })));
        }
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.next(new WMSDataSource(context, _this.networkService, _this.wfsDataSourceService));
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
        var _this = this;
        if (context.optionsFromCapabilities) {
            return this.capabilitiesService
                .getWMTSOptions(context)
                .pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            function (options) { return new WMTSDataSource(options, _this.networkService); })));
        }
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new WMTSDataSource(context, _this.networkService)); }));
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
        var _this = this;
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new XYZDataSource(context, _this.networkService)); }));
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
        var _this = this;
        if (context.mapId) {
            return this.capabilitiesService
                .getCartoOptions(context)
                .pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            function (options) { return new CartoDataSource(options, _this.networkService); })));
        }
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new CartoDataSource(context, _this.networkService)); }));
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
        var _this = this;
        return this.capabilitiesService
            .getArcgisOptions(context)
            .pipe(map((/**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            return new ArcGISRestDataSource(options, _this.networkService);
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
        var _this = this;
        return this.capabilitiesService
            .getTileArcgisOptions(context)
            .pipe(map((/**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            return new TileArcGISRestDataSource(options, _this.networkService);
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
        var _this = this;
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new MVTDataSource(context, _this.networkService)); }));
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
        var _this = this;
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.next(new ClusterDataSource(context, _this.networkService)); }));
    };
    DataSourceService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DataSourceService.ctorParameters = function () { return [
        { type: CapabilitiesService },
        { type: WFSService },
        { type: NetworkService }
    ]; };
    /** @nocollapse */ DataSourceService.ngInjectableDef = i0.defineInjectable({ factory: function DataSourceService_Factory() { return new DataSourceService(i0.inject(i1.CapabilitiesService), i0.inject(i2.WFSService), i0.inject(i3.NetworkService)); }, token: DataSourceService, providedIn: "root" });
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
    /** @type {?} */
    DataSourceService.prototype.networkService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDNUMsT0FBTyxFQUVMLGFBQWEsRUFFYixpQkFBaUIsRUFFakIsYUFBYSxFQUViLGFBQWEsRUFFYixjQUFjLEVBRWQsYUFBYSxFQUViLGVBQWUsRUFFZixvQkFBb0IsRUFFcEIsd0JBQXdCLEVBRXhCLG1CQUFtQixFQUVuQixhQUFhLEVBRWIsaUJBQWlCLEVBRWxCLE1BQU0sZUFBZSxDQUFDOzs7OztBQUV2QjtJQU1FLDJCQUNVLG1CQUF3QyxFQUN4QyxvQkFBZ0MsRUFDakMsY0FBOEI7UUFGN0Isd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQVk7UUFDakMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTGhDLGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQWUsRUFBRSxDQUFDLENBQUM7SUFNekQsQ0FBQzs7Ozs7SUFFSixpREFBcUI7Ozs7SUFBckIsVUFBc0IsT0FBNkI7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMs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Q0UsT0FBaUM7UUFEbkMsaUJBSUM7UUFEQyxPQUFPLElBQUksVUFBVTs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBM0QsQ0FBMkQsRUFBQyxDQUFDO0lBQzFGLENBQUM7O2dCQWxNRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWpDUSxtQkFBbUI7Z0JBQ25CLFVBQVU7Z0JBQ1YsY0FBYzs7OzRCQU52QjtDQXNPQyxBQW5NRCxJQW1NQztTQWhNWSxpQkFBaUI7OztJQUM1Qix5Q0FBNEQ7Ozs7O0lBRzFELGdEQUFnRDs7Ozs7SUFDaEQsaURBQXdDOztJQUN4QywyQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBDYXBhYmlsaXRpZXNTZXJ2aWNlIH0gZnJvbSAnLi9jYXBhYmlsaXRpZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IFdGU1NlcnZpY2UgfSBmcm9tICcuL2RhdGFzb3VyY2VzL3dmcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmV0d29ya1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHtcclxuICBEYXRhU291cmNlLFxyXG4gIE9TTURhdGFTb3VyY2UsXHJcbiAgT1NNRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgRmVhdHVyZURhdGFTb3VyY2UsXHJcbiAgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFhZWkRhdGFTb3VyY2UsXHJcbiAgWFlaRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgV0ZTRGF0YVNvdXJjZSxcclxuICBXRlNEYXRhU291cmNlT3B0aW9ucyxcclxuICBXTVRTRGF0YVNvdXJjZSxcclxuICBXTVRTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgV01TRGF0YVNvdXJjZSxcclxuICBXTVNEYXRhU291cmNlT3B0aW9ucyxcclxuICBDYXJ0b0RhdGFTb3VyY2UsXHJcbiAgQ2FydG9EYXRhU291cmNlT3B0aW9ucyxcclxuICBBcmNHSVNSZXN0RGF0YVNvdXJjZSxcclxuICBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlLFxyXG4gIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgV2ViU29ja2V0RGF0YVNvdXJjZSxcclxuICBBbnlEYXRhU291cmNlT3B0aW9ucyxcclxuICBNVlREYXRhU291cmNlLFxyXG4gIE1WVERhdGFTb3VyY2VPcHRpb25zLFxyXG4gIENsdXN0ZXJEYXRhU291cmNlLFxyXG4gIENsdXN0ZXJEYXRhU291cmNlT3B0aW9uc1xyXG59IGZyb20gJy4vZGF0YXNvdXJjZXMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YVNvdXJjZVNlcnZpY2Uge1xyXG4gIHB1YmxpYyBkYXRhc291cmNlcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGFTb3VyY2VbXT4oW10pO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2FwYWJpbGl0aWVzU2VydmljZTogQ2FwYWJpbGl0aWVzU2VydmljZSxcclxuICAgIHByaXZhdGUgd2ZzRGF0YVNvdXJjZVNlcnZpY2U6IFdGU1NlcnZpY2UsXHJcbiAgICBwdWJsaWMgbmV0d29ya1NlcnZpY2U6IE5ldHdvcmtTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBjcmVhdGVBc3luY0RhdGFTb3VyY2UoY29udGV4dDogQW55RGF0YVNvdXJjZU9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGFTb3VyY2U+IHtcclxuICAgIGlmICghY29udGV4dC50eXBlKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoY29udGV4dCk7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YXNvdXJjZSBuZWVkcyBhIHR5cGUnKTtcclxuICAgIH1cclxuICAgIGxldCBkYXRhU291cmNlO1xyXG4gICAgc3dpdGNoIChjb250ZXh0LnR5cGUudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICBjYXNlICdvc20nOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZU9TTURhdGFTb3VyY2UoY29udGV4dCBhcyBPU01EYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3ZlY3Rvcic6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlRmVhdHVyZURhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIEZlYXR1cmVEYXRhU291cmNlT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dmcyc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlV0ZTRGF0YVNvdXJjZShjb250ZXh0IGFzIFdGU0RhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd21zJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVXTVNEYXRhU291cmNlKGNvbnRleHQgYXMgV01TRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd3bXRzJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVXTVRTRGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgV01UU0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAneHl6JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVYWVpEYXRhU291cmNlKGNvbnRleHQgYXMgWFlaRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjYXJ0byc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlQ2FydG9EYXRhU291cmNlKFxyXG4gICAgICAgICAgY29udGV4dCBhcyBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYXJjZ2lzcmVzdCc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlQXJjR0lTUmVzdERhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dlYnNvY2tldCc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlV2ViU29ja2V0RGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbXZ0JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVNVlREYXRhU291cmNlKFxyXG4gICAgICAgICAgY29udGV4dCBhcyBNVlREYXRhU291cmNlT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3RpbGVhcmNnaXNyZXN0JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjbHVzdGVyJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVDbHVzdGVyRGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmVycm9yKGNvbnRleHQpO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkYXRhc291cmNlIHR5cGUnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRhdGFzb3VyY2VzJC5uZXh0KHRoaXMuZGF0YXNvdXJjZXMkLnZhbHVlLmNvbmNhdChbZGF0YVNvdXJjZV0pKTtcclxuXHJcbiAgICByZXR1cm4gZGF0YVNvdXJjZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlT1NNRGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IE9TTURhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxPU01EYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IE9TTURhdGFTb3VyY2UoY29udGV4dCwgdGhpcy5uZXR3b3JrU2VydmljZSkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlRmVhdHVyZURhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPEZlYXR1cmVEYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IEZlYXR1cmVEYXRhU291cmNlKGNvbnRleHQsIHRoaXMubmV0d29ya1NlcnZpY2UpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVdlYlNvY2tldERhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdlYlNvY2tldERhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgV2ViU29ja2V0RGF0YVNvdXJjZShjb250ZXh0LCB0aGlzLm5ldHdvcmtTZXJ2aWNlKSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVXRlNEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogV0ZTRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdGU0RhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+XHJcbiAgICAgIGQubmV4dChuZXcgV0ZTRGF0YVNvdXJjZShjb250ZXh0LCB0aGlzLm5ldHdvcmtTZXJ2aWNlLCB0aGlzLndmc0RhdGFTb3VyY2VTZXJ2aWNlKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVdNU0RhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBXTVNEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8V01TRGF0YVNvdXJjZT4ge1xyXG4gICAgaWYgKGNvbnRleHQub3B0aW9uc0Zyb21DYXBhYmlsaXRpZXMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZVxyXG4gICAgICAgIC5nZXRXTVNPcHRpb25zKGNvbnRleHQpXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAoXHJcbiAgICAgICAgICAgIChvcHRpb25zOiBXTVNEYXRhU291cmNlT3B0aW9ucykgPT5cclxuICAgICAgICAgICAgICBuZXcgV01TRGF0YVNvdXJjZShjb250ZXh0LCB0aGlzLm5ldHdvcmtTZXJ2aWNlLCB0aGlzLndmc0RhdGFTb3VyY2VTZXJ2aWNlKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT5cclxuICAgICAgZC5uZXh0KG5ldyBXTVNEYXRhU291cmNlKGNvbnRleHQsIHRoaXMubmV0d29ya1NlcnZpY2UsIHRoaXMud2ZzRGF0YVNvdXJjZVNlcnZpY2UpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlV01UU0RhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBXTVRTRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdNVFNEYXRhU291cmNlPiB7XHJcbiAgICBpZiAoY29udGV4dC5vcHRpb25zRnJvbUNhcGFiaWxpdGllcykge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlXHJcbiAgICAgICAgLmdldFdNVFNPcHRpb25zKGNvbnRleHQpXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAoKG9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucykgPT4gbmV3IFdNVFNEYXRhU291cmNlKG9wdGlvbnMsIHRoaXMubmV0d29ya1NlcnZpY2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KG5ldyBXTVRTRGF0YVNvdXJjZShjb250ZXh0LCB0aGlzLm5ldHdvcmtTZXJ2aWNlKSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVYWVpEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogWFlaRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFhZWkRhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgWFlaRGF0YVNvdXJjZShjb250ZXh0LCB0aGlzLm5ldHdvcmtTZXJ2aWNlKSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVDYXJ0b0RhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxDYXJ0b0RhdGFTb3VyY2U+IHtcclxuICAgIGlmIChjb250ZXh0Lm1hcElkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2VcclxuICAgICAgICAuZ2V0Q2FydG9PcHRpb25zKGNvbnRleHQpXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAoKG9wdGlvbnM6IENhcnRvRGF0YVNvdXJjZU9wdGlvbnMpID0+IG5ldyBDYXJ0b0RhdGFTb3VyY2Uob3B0aW9ucywgdGhpcy5uZXR3b3JrU2VydmljZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgQ2FydG9EYXRhU291cmNlKGNvbnRleHQsIHRoaXMubmV0d29ya1NlcnZpY2UpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUFyY0dJU1Jlc3REYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxBcmNHSVNSZXN0RGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZVxyXG4gICAgICAuZ2V0QXJjZ2lzT3B0aW9ucyhjb250ZXh0KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoXHJcbiAgICAgICAgICAob3B0aW9uczogQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zKSA9PlxyXG4gICAgICAgICAgICBuZXcgQXJjR0lTUmVzdERhdGFTb3VyY2Uob3B0aW9ucywgdGhpcy5uZXR3b3JrU2VydmljZSlcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZVxyXG4gICAgICAuZ2V0VGlsZUFyY2dpc09wdGlvbnMoY29udGV4dClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKFxyXG4gICAgICAgICAgKG9wdGlvbnM6IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMpID0+XHJcbiAgICAgICAgICAgIG5ldyBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2Uob3B0aW9ucywgdGhpcy5uZXR3b3JrU2VydmljZSlcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG4gIHByaXZhdGUgY3JlYXRlTVZURGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IE1WVERhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxNVlREYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IE1WVERhdGFTb3VyY2UoY29udGV4dCwgdGhpcy5uZXR3b3JrU2VydmljZSkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlQ2x1c3RlckRhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBDbHVzdGVyRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPENsdXN0ZXJEYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IENsdXN0ZXJEYXRhU291cmNlKGNvbnRleHQsIHRoaXMubmV0d29ya1NlcnZpY2UpKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==