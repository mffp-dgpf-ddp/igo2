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
                /** @type {?} */
                const wmsContext = (/** @type {?} */ (context));
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
            return this.capabilitiesService.getWMSOptions(context).pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            (options) => {
                return options
                    ? new WMSDataSource(options, this.wfsDataSourceService)
                    : undefined;
            })));
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
            return this.capabilitiesService.getWMTSOptions(context).pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            (options) => {
                return options ? new WMTSDataSource(options) : undefined;
            })));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFFTCxhQUFhLEVBRWIsaUJBQWlCLEVBRWpCLGFBQWEsRUFFYixhQUFhLEVBRWIsY0FBYyxFQUVkLGFBQWEsRUFFYixlQUFlLEVBRWYsb0JBQW9CLEVBRXBCLHdCQUF3QixFQUV4QixtQkFBbUIsRUFFbkIsYUFBYSxFQUViLGlCQUFpQixFQUVsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7O0FBSzFDLE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBRzVCLFlBQ1UsbUJBQXdDLEVBQ3hDLG9CQUFnQztRQURoQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBWTtRQUpuQyxpQkFBWSxHQUFHLElBQUksZUFBZSxDQUFlLEVBQUUsQ0FBQyxDQUFDO0lBS3pELENBQUM7Ozs7O0lBRUoscUJBQXFCLENBQUMsT0FBNkI7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QixNQUFNLElBQUksS0FBSyxDQUFD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LG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxFQUNwQyxDQUNGLENBQUM7SUFDTixDQUFDOzs7Ozs7SUFFTyw4QkFBOEIsQ0FDcEMsT0FBd0M7UUFFeEMsT0FBTyxJQUFJLENBQUMsbUJBQW1CO2FBQzVCLG9CQUFvQixDQUFDLE9BQU8sQ0FBQzthQUM3QixJQUFJLENBQ0gsR0FBRzs7OztRQUNELENBQUMsT0FBd0MsRUFBRSxFQUFFLENBQzNDLElBQUksd0JBQXdCLENBQUMsT0FBTyxDQUFDLEVBQ3hDLENBQ0YsQ0FBQztJQUNOLENBQUM7Ozs7OztJQUVPLG1CQUFtQixDQUN6QixPQUE2QjtRQUU3QixPQUFPLElBQUksVUFBVTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLENBQUM7SUFDakUsQ0FBQzs7Ozs7O0lBRU8sdUJBQXVCLENBQzdCLE9BQWlDO1FBRWpDLE9BQU8sSUFBSSxVQUFVOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDO0lBQ3JFLENBQUM7OztZQWpNRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFqQ1EsbUJBQW1CO1lBQ25CLFVBQVU7Ozs7O0lBa0NqQix5Q0FBNEQ7Ozs7O0lBRzFELGdEQUFnRDs7Ozs7SUFDaEQsaURBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgQ2FwYWJpbGl0aWVzU2VydmljZSB9IGZyb20gJy4vY2FwYWJpbGl0aWVzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBXRlNTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhc291cmNlcy93ZnMuc2VydmljZSc7XHJcbmltcG9ydCB7XHJcbiAgRGF0YVNvdXJjZSxcclxuICBPU01EYXRhU291cmNlLFxyXG4gIE9TTURhdGFTb3VyY2VPcHRpb25zLFxyXG4gIEZlYXR1cmVEYXRhU291cmNlLFxyXG4gIEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyxcclxuICBYWVpEYXRhU291cmNlLFxyXG4gIFhZWkRhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdGU0RhdGFTb3VyY2UsXHJcbiAgV0ZTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgV01UU0RhdGFTb3VyY2UsXHJcbiAgV01UU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdNU0RhdGFTb3VyY2UsXHJcbiAgV01TRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgQ2FydG9EYXRhU291cmNlLFxyXG4gIENhcnRvRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgQXJjR0lTUmVzdERhdGFTb3VyY2UsXHJcbiAgQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZSxcclxuICBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdlYlNvY2tldERhdGFTb3VyY2UsXHJcbiAgQW55RGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgTVZURGF0YVNvdXJjZSxcclxuICBNVlREYXRhU291cmNlT3B0aW9ucyxcclxuICBDbHVzdGVyRGF0YVNvdXJjZSxcclxuICBDbHVzdGVyRGF0YVNvdXJjZU9wdGlvbnNcclxufSBmcm9tICcuL2RhdGFzb3VyY2VzJztcclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhU291cmNlU2VydmljZSB7XHJcbiAgcHVibGljIGRhdGFzb3VyY2VzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF0YVNvdXJjZVtdPihbXSk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjYXBhYmlsaXRpZXNTZXJ2aWNlOiBDYXBhYmlsaXRpZXNTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB3ZnNEYXRhU291cmNlU2VydmljZTogV0ZTU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgY3JlYXRlQXN5bmNEYXRhU291cmNlKGNvbnRleHQ6IEFueURhdGFTb3VyY2VPcHRpb25zKTogT2JzZXJ2YWJsZTxEYXRhU291cmNlPiB7XHJcbiAgICBpZiAoIWNvbnRleHQudHlwZSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGNvbnRleHQpO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGFzb3VyY2UgbmVlZHMgYSB0eXBlJyk7XHJcbiAgICB9XHJcbiAgICBsZXQgZGF0YVNvdXJjZTtcclxuICAgIHN3aXRjaCAoY29udGV4dC50eXBlLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgY2FzZSAnb3NtJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVPU01EYXRhU291cmNlKGNvbnRleHQgYXMgT1NNRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd2ZWN0b3InOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZUZlYXR1cmVEYXRhU291cmNlKFxyXG4gICAgICAgICAgY29udGV4dCBhcyBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd3ZnMnOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZVdGU0RhdGFTb3VyY2UoY29udGV4dCBhcyBXRlNEYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dtcyc6XHJcbiAgICAgICAgY29uc3Qgd21zQ29udGV4dCA9IGNvbnRleHQgYXMgV01TRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgICAgICAgT2JqZWN0VXRpbHMucmVtb3ZlRHVwbGljYXRlQ2FzZUluc2Vuc2l0aXZlKHdtc0NvbnRleHQucGFyYW1zKTtcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVXTVNEYXRhU291cmNlKHdtc0NvbnRleHQpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd3bXRzJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVXTVRTRGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgV01UU0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAneHl6JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVYWVpEYXRhU291cmNlKGNvbnRleHQgYXMgWFlaRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjYXJ0byc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlQ2FydG9EYXRhU291cmNlKFxyXG4gICAgICAgICAgY29udGV4dCBhcyBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYXJjZ2lzcmVzdCc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlQXJjR0lTUmVzdERhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dlYnNvY2tldCc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlV2ViU29ja2V0RGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbXZ0JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVNVlREYXRhU291cmNlKGNvbnRleHQgYXMgTVZURGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0aWxlYXJjZ2lzcmVzdCc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlKFxyXG4gICAgICAgICAgY29udGV4dCBhcyBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY2x1c3Rlcic6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlQ2x1c3RlckRhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIENsdXN0ZXJEYXRhU291cmNlT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihjb250ZXh0KTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZGF0YXNvdXJjZSB0eXBlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kYXRhc291cmNlcyQubmV4dCh0aGlzLmRhdGFzb3VyY2VzJC52YWx1ZS5jb25jYXQoW2RhdGFTb3VyY2VdKSk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGFTb3VyY2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZU9TTURhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBPU01EYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8T1NNRGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KG5ldyBPU01EYXRhU291cmNlKGNvbnRleHQpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUZlYXR1cmVEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxGZWF0dXJlRGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KG5ldyBGZWF0dXJlRGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVXZWJTb2NrZXREYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxXZWJTb2NrZXREYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IFdlYlNvY2tldERhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlV0ZTRGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IFdGU0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxXRlNEYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PlxyXG4gICAgICBkLm5leHQobmV3IFdGU0RhdGFTb3VyY2UoY29udGV4dCwgdGhpcy53ZnNEYXRhU291cmNlU2VydmljZSkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVXTVNEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogV01TRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdNU0RhdGFTb3VyY2U+IHtcclxuICAgIGlmIChjb250ZXh0Lm9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2UuZ2V0V01TT3B0aW9ucyhjb250ZXh0KS5waXBlKFxyXG4gICAgICAgIG1hcCgob3B0aW9uczogV01TRGF0YVNvdXJjZU9wdGlvbnMpID0+IHtcclxuICAgICAgICAgIHJldHVybiBvcHRpb25zXHJcbiAgICAgICAgICAgID8gbmV3IFdNU0RhdGFTb3VyY2Uob3B0aW9ucywgdGhpcy53ZnNEYXRhU291cmNlU2VydmljZSlcclxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PlxyXG4gICAgICBkLm5leHQobmV3IFdNU0RhdGFTb3VyY2UoY29udGV4dCwgdGhpcy53ZnNEYXRhU291cmNlU2VydmljZSkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVXTVRTRGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IFdNVFNEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8V01UU0RhdGFTb3VyY2U+IHtcclxuICAgIGlmIChjb250ZXh0Lm9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2UuZ2V0V01UU09wdGlvbnMoY29udGV4dCkucGlwZShcclxuICAgICAgICBtYXAoKG9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMgPyBuZXcgV01UU0RhdGFTb3VyY2Uob3B0aW9ucykgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IFdNVFNEYXRhU291cmNlKGNvbnRleHQpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVhZWkRhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBYWVpEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8WFlaRGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KG5ldyBYWVpEYXRhU291cmNlKGNvbnRleHQpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUNhcnRvRGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IENhcnRvRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPENhcnRvRGF0YVNvdXJjZT4ge1xyXG4gICAgaWYgKGNvbnRleHQubWFwSWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZVxyXG4gICAgICAgIC5nZXRDYXJ0b09wdGlvbnMoY29udGV4dClcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIG1hcCgob3B0aW9uczogQ2FydG9EYXRhU291cmNlT3B0aW9ucykgPT4gbmV3IENhcnRvRGF0YVNvdXJjZShvcHRpb25zKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KG5ldyBDYXJ0b0RhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlQXJjR0lTUmVzdERhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPEFyY0dJU1Jlc3REYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlXHJcbiAgICAgIC5nZXRBcmNnaXNPcHRpb25zKGNvbnRleHQpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChcclxuICAgICAgICAgIChvcHRpb25zOiBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMpID0+XHJcbiAgICAgICAgICAgIG5ldyBBcmNHSVNSZXN0RGF0YVNvdXJjZShvcHRpb25zKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8VGlsZUFyY0dJU1Jlc3REYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlXHJcbiAgICAgIC5nZXRUaWxlQXJjZ2lzT3B0aW9ucyhjb250ZXh0KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoXHJcbiAgICAgICAgICAob3B0aW9uczogVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucykgPT5cclxuICAgICAgICAgICAgbmV3IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZShvcHRpb25zKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlTVZURGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IE1WVERhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxNVlREYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IE1WVERhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlQ2x1c3RlckRhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBDbHVzdGVyRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPENsdXN0ZXJEYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IENsdXN0ZXJEYXRhU291cmNlKGNvbnRleHQpKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==