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
export class DataSourceService {
    /**
     * @param {?} capabilitiesService
     * @param {?} wfsDataSourceService
     */
    constructor(capabilitiesService, wfsDataSourceService) {
        this.capabilitiesService = capabilitiesService;
        this.wfsDataSourceService = wfsDataSourceService;
        this.datasources$ = new BehaviorSubject([]);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    createAsyncDataSource(context) {
        if (!context.type) {
            console.error(context);
            throw new Error('Datasource needs a type');
        }
        /** @type {?} */
        let dataSource;
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
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createOSMDataSource(context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new OSMDataSource(context))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createFeatureDataSource(context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new FeatureDataSource(context))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createWebSocketDataSource(context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new WebSocketDataSource(context))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createWFSDataSource(context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new WFSDataSource(context, this.wfsDataSourceService))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createWMSDataSource(context) {
        if (context.optionsFromCapabilities) {
            return this.capabilitiesService
                .getWMSOptions(context)
                .pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            (options) => new WMSDataSource(options, this.wfsDataSourceService))));
        }
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new WMSDataSource(context, this.wfsDataSourceService))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createWMTSDataSource(context) {
        if (context.optionsFromCapabilities) {
            return this.capabilitiesService
                .getWMTSOptions(context)
                .pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            (options) => new WMTSDataSource(options))));
        }
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new WMTSDataSource(context))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createXYZDataSource(context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new XYZDataSource(context))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createCartoDataSource(context) {
        if (context.mapId) {
            return this.capabilitiesService
                .getCartoOptions(context)
                .pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            (options) => new CartoDataSource(options))));
        }
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new CartoDataSource(context))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createArcGISRestDataSource(context) {
        return this.capabilitiesService
            .getArcgisOptions(context)
            .pipe(map((/**
         * @param {?} options
         * @return {?}
         */
        (options) => new ArcGISRestDataSource(options))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createTileArcGISRestDataSource(context) {
        return this.capabilitiesService
            .getTileArcgisOptions(context)
            .pipe(map((/**
         * @param {?} options
         * @return {?}
         */
        (options) => new TileArcGISRestDataSource(options))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createMVTDataSource(context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new MVTDataSource(context))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createClusterDataSource(context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new ClusterDataSource(context))));
    }
}
DataSourceService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DataSourceService.ctorParameters = () => [
    { type: CapabilitiesService },
    { type: WFSService }
];
/** @nocollapse */ DataSourceService.ngInjectableDef = i0.defineInjectable({ factory: function DataSourceService_Factory() { return new DataSourceService(i0.inject(i1.CapabilitiesService), i0.inject(i2.WFSService)); }, token: DataSourceService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFFTCxhQUFhLEVBRWIsaUJBQWlCLEVBRWpCLGFBQWEsRUFFYixhQUFhLEVBRWIsY0FBYyxFQUVkLGFBQWEsRUFFYixlQUFlLEVBRWYsb0JBQW9CLEVBRXBCLHdCQUF3QixFQUV4QixtQkFBbUIsRUFFbkIsYUFBYSxFQUViLGlCQUFpQixFQUVsQixNQUFNLGVBQWUsQ0FBQzs7OztBQUt2QixNQUFNLE9BQU8saUJBQWlCOzs7OztJQUc1QixZQUNVLG1CQUF3QyxFQUN4QyxvQkFBZ0M7UUFEaEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQVk7UUFKbkMsaUJBQVksR0FBRyxJQUFJLGVBQWUsQ0FBZSxFQUFFLENBQUMsQ0FBQztJQUt6RCxDQUFDOzs7OztJQUVKLHFCQUFxQixDQUFDLE9BQTZCO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQzVDOztZQUNHLFVBQVU7UUFDZCxR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Q0FBQzs7Ozs7O0lBRU8sbUJBQW1CLENBQ3pCLE9BQTZCO1FBRTdCLE9BQU8sSUFBSSxVQUFVOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQztJQUNqRSxDQUFDOzs7Ozs7SUFFTyx1QkFBdUIsQ0FDN0IsT0FBaUM7UUFFakMsT0FBTyxJQUFJLFVBQVU7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLENBQUM7SUFDckUsQ0FBQzs7O1lBaE1GLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQWhDUSxtQkFBbUI7WUFDbkIsVUFBVTs7Ozs7SUFpQ2pCLHlDQUE0RDs7Ozs7SUFHMUQsZ0RBQWdEOzs7OztJQUNoRCxpREFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBDYXBhYmlsaXRpZXNTZXJ2aWNlIH0gZnJvbSAnLi9jYXBhYmlsaXRpZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IFdGU1NlcnZpY2UgfSBmcm9tICcuL2RhdGFzb3VyY2VzL3dmcy5zZXJ2aWNlJztcclxuaW1wb3J0IHtcclxuICBEYXRhU291cmNlLFxyXG4gIE9TTURhdGFTb3VyY2UsXHJcbiAgT1NNRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgRmVhdHVyZURhdGFTb3VyY2UsXHJcbiAgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFhZWkRhdGFTb3VyY2UsXHJcbiAgWFlaRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgV0ZTRGF0YVNvdXJjZSxcclxuICBXRlNEYXRhU291cmNlT3B0aW9ucyxcclxuICBXTVRTRGF0YVNvdXJjZSxcclxuICBXTVRTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgV01TRGF0YVNvdXJjZSxcclxuICBXTVNEYXRhU291cmNlT3B0aW9ucyxcclxuICBDYXJ0b0RhdGFTb3VyY2UsXHJcbiAgQ2FydG9EYXRhU291cmNlT3B0aW9ucyxcclxuICBBcmNHSVNSZXN0RGF0YVNvdXJjZSxcclxuICBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlLFxyXG4gIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgV2ViU29ja2V0RGF0YVNvdXJjZSxcclxuICBBbnlEYXRhU291cmNlT3B0aW9ucyxcclxuICBNVlREYXRhU291cmNlLFxyXG4gIE1WVERhdGFTb3VyY2VPcHRpb25zLFxyXG4gIENsdXN0ZXJEYXRhU291cmNlLFxyXG4gIENsdXN0ZXJEYXRhU291cmNlT3B0aW9uc1xyXG59IGZyb20gJy4vZGF0YXNvdXJjZXMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YVNvdXJjZVNlcnZpY2Uge1xyXG4gIHB1YmxpYyBkYXRhc291cmNlcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGFTb3VyY2VbXT4oW10pO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2FwYWJpbGl0aWVzU2VydmljZTogQ2FwYWJpbGl0aWVzU2VydmljZSxcclxuICAgIHByaXZhdGUgd2ZzRGF0YVNvdXJjZVNlcnZpY2U6IFdGU1NlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGNyZWF0ZUFzeW5jRGF0YVNvdXJjZShjb250ZXh0OiBBbnlEYXRhU291cmNlT3B0aW9ucyk6IE9ic2VydmFibGU8RGF0YVNvdXJjZT4ge1xyXG4gICAgaWYgKCFjb250ZXh0LnR5cGUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihjb250ZXh0KTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhc291cmNlIG5lZWRzIGEgdHlwZScpO1xyXG4gICAgfVxyXG4gICAgbGV0IGRhdGFTb3VyY2U7XHJcbiAgICBzd2l0Y2ggKGNvbnRleHQudHlwZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgIGNhc2UgJ29zbSc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlT1NNRGF0YVNvdXJjZShjb250ZXh0IGFzIE9TTURhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndmVjdG9yJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVGZWF0dXJlRGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd2ZzJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVXRlNEYXRhU291cmNlKGNvbnRleHQgYXMgV0ZTRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd3bXMnOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZVdNU0RhdGFTb3VyY2UoY29udGV4dCBhcyBXTVNEYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dtdHMnOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZVdNVFNEYXRhU291cmNlKFxyXG4gICAgICAgICAgY29udGV4dCBhcyBXTVRTRGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd4eXonOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZVhZWkRhdGFTb3VyY2UoY29udGV4dCBhcyBYWVpEYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NhcnRvJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVDYXJ0b0RhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIENhcnRvRGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdhcmNnaXNyZXN0JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVBcmNHSVNSZXN0RGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd2Vic29ja2V0JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVXZWJTb2NrZXREYXRhU291cmNlKFxyXG4gICAgICAgICAgY29udGV4dCBhcyBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdtdnQnOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZU1WVERhdGFTb3VyY2UoY29udGV4dCBhcyBNVlREYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3RpbGVhcmNnaXNyZXN0JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjbHVzdGVyJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVDbHVzdGVyRGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmVycm9yKGNvbnRleHQpO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkYXRhc291cmNlIHR5cGUnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRhdGFzb3VyY2VzJC5uZXh0KHRoaXMuZGF0YXNvdXJjZXMkLnZhbHVlLmNvbmNhdChbZGF0YVNvdXJjZV0pKTtcclxuXHJcbiAgICByZXR1cm4gZGF0YVNvdXJjZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlT1NNRGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IE9TTURhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxPU01EYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IE9TTURhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlRmVhdHVyZURhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPEZlYXR1cmVEYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IEZlYXR1cmVEYXRhU291cmNlKGNvbnRleHQpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVdlYlNvY2tldERhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdlYlNvY2tldERhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgV2ViU29ja2V0RGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVXRlNEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogV0ZTRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdGU0RhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+XHJcbiAgICAgIGQubmV4dChuZXcgV0ZTRGF0YVNvdXJjZShjb250ZXh0LCB0aGlzLndmc0RhdGFTb3VyY2VTZXJ2aWNlKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVdNU0RhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBXTVNEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8V01TRGF0YVNvdXJjZT4ge1xyXG4gICAgaWYgKGNvbnRleHQub3B0aW9uc0Zyb21DYXBhYmlsaXRpZXMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZVxyXG4gICAgICAgIC5nZXRXTVNPcHRpb25zKGNvbnRleHQpXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAoXHJcbiAgICAgICAgICAgIChvcHRpb25zOiBXTVNEYXRhU291cmNlT3B0aW9ucykgPT5cclxuICAgICAgICAgICAgICBuZXcgV01TRGF0YVNvdXJjZShvcHRpb25zLCB0aGlzLndmc0RhdGFTb3VyY2VTZXJ2aWNlKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT5cclxuICAgICAgZC5uZXh0KG5ldyBXTVNEYXRhU291cmNlKGNvbnRleHQsIHRoaXMud2ZzRGF0YVNvdXJjZVNlcnZpY2UpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlV01UU0RhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBXTVRTRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdNVFNEYXRhU291cmNlPiB7XHJcbiAgICBpZiAoY29udGV4dC5vcHRpb25zRnJvbUNhcGFiaWxpdGllcykge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlXHJcbiAgICAgICAgLmdldFdNVFNPcHRpb25zKGNvbnRleHQpXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAoKG9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucykgPT4gbmV3IFdNVFNEYXRhU291cmNlKG9wdGlvbnMpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KG5ldyBXTVRTRGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVYWVpEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogWFlaRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFhZWkRhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgWFlaRGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVDYXJ0b0RhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxDYXJ0b0RhdGFTb3VyY2U+IHtcclxuICAgIGlmIChjb250ZXh0Lm1hcElkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2VcclxuICAgICAgICAuZ2V0Q2FydG9PcHRpb25zKGNvbnRleHQpXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAoKG9wdGlvbnM6IENhcnRvRGF0YVNvdXJjZU9wdGlvbnMpID0+IG5ldyBDYXJ0b0RhdGFTb3VyY2Uob3B0aW9ucykpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgQ2FydG9EYXRhU291cmNlKGNvbnRleHQpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUFyY0dJU1Jlc3REYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxBcmNHSVNSZXN0RGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZVxyXG4gICAgICAuZ2V0QXJjZ2lzT3B0aW9ucyhjb250ZXh0KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoXHJcbiAgICAgICAgICAob3B0aW9uczogQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zKSA9PlxyXG4gICAgICAgICAgICBuZXcgQXJjR0lTUmVzdERhdGFTb3VyY2Uob3B0aW9ucylcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZVxyXG4gICAgICAuZ2V0VGlsZUFyY2dpc09wdGlvbnMoY29udGV4dClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKFxyXG4gICAgICAgICAgKG9wdGlvbnM6IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMpID0+XHJcbiAgICAgICAgICAgIG5ldyBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2Uob3B0aW9ucylcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZU1WVERhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBNVlREYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8TVZURGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KG5ldyBNVlREYXRhU291cmNlKGNvbnRleHQpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUNsdXN0ZXJEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxDbHVzdGVyRGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KG5ldyBDbHVzdGVyRGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxufVxyXG4iXX0=