/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { forkJoin, of, Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CapabilitiesService } from './capabilities.service';
import { OptionsService } from './options/options.service';
import { WFSService } from './datasources/wfs.service';
import { OSMDataSource, FeatureDataSource, XYZDataSource, WFSDataSource, WMTSDataSource, WMSDataSource, CartoDataSource, ArcGISRestDataSource, TileArcGISRestDataSource, WebSocketDataSource, MVTDataSource, ClusterDataSource } from './datasources';
import { ObjectUtils } from '@igo2/utils';
import { LanguageService, MessageService } from '@igo2/core';
import { ProjectionService } from '../../map/shared/projection.service';
import * as i0 from "@angular/core";
import * as i1 from "./capabilities.service";
import * as i2 from "./options/options.service";
import * as i3 from "./datasources/wfs.service";
import * as i4 from "@igo2/core";
import * as i5 from "../../map/shared/projection.service";
var DataSourceService = /** @class */ (function () {
    function DataSourceService(capabilitiesService, optionsService, wfsDataSourceService, languageService, messageService, projectionService) {
        this.capabilitiesService = capabilitiesService;
        this.optionsService = optionsService;
        this.wfsDataSourceService = wfsDataSourceService;
        this.languageService = languageService;
        this.messageService = messageService;
        this.projectionService = projectionService;
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
        /** @type {?} */
        var observables = [];
        if (context.optionsFromCapabilities) {
            observables.push(this.capabilitiesService.getWMSOptions(context).pipe(catchError((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                /** @type {?} */
                var title = _this.languageService.translate.instant('igo.geo.dataSource.unavailableTitle');
                /** @type {?} */
                var message = _this.languageService.translate.instant('igo.geo.dataSource.unavailable', { value: context.params.LAYERS });
                _this.messageService.error(message, title);
                throw e;
            }))));
        }
        if (this.optionsService && context.optionsFromApi === true) {
            observables.push(this.optionsService.getWMSOptions(context).pipe(catchError((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                e.error.toDisplay = true;
                e.error.title = _this.languageService.translate.instant('igo.geo.dataSource.unavailableTitle');
                e.error.message = _this.languageService.translate.instant('igo.geo.dataSource.optionsApiUnavailable');
                return of({});
            }))));
        }
        observables.push(of(context));
        return forkJoin(observables).pipe(map((/**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            /** @type {?} */
            var optionsMerged = options.reduce((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) {
                return ObjectUtils.mergeDeep(a, b);
            }));
            return new WMSDataSource(optionsMerged, _this.wfsDataSourceService);
        })), catchError((/**
         * @return {?}
         */
        function () {
            return of(undefined);
        })));
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
            return this.capabilitiesService.getWMTSOptions(context).pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            function (options) {
                return options ? new WMTSDataSource(options) : undefined;
            })), catchError((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var title = _this.languageService.translate.instant('igo.geo.dataSource.unavailableTitle');
                /** @type {?} */
                var message = _this.languageService.translate.instant('igo.geo.dataSource.unavailable', { value: context.layer });
                _this.messageService.error(message, title);
                return of(undefined);
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
        { type: OptionsService, decorators: [{ type: Optional }] },
        { type: WFSService },
        { type: LanguageService },
        { type: MessageService },
        { type: ProjectionService }
    ]; };
    /** @nocollapse */ DataSourceService.ngInjectableDef = i0.defineInjectable({ factory: function DataSourceService_Factory() { return new DataSourceService(i0.inject(i1.CapabilitiesService), i0.inject(i2.OptionsService, 8), i0.inject(i3.WFSService), i0.inject(i4.LanguageService), i0.inject(i4.MessageService), i0.inject(i5.ProjectionService)); }, token: DataSourceService, providedIn: "root" });
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
    DataSourceService.prototype.optionsService;
    /**
     * @type {?}
     * @private
     */
    DataSourceService.prototype.wfsDataSourceService;
    /**
     * @type {?}
     * @private
     */
    DataSourceService.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    DataSourceService.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    DataSourceService.prototype.projectionService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdkQsT0FBTyxFQUVMLGFBQWEsRUFFYixpQkFBaUIsRUFFakIsYUFBYSxFQUViLGFBQWEsRUFFYixjQUFjLEVBRWQsYUFBYSxFQUViLGVBQWUsRUFFZixvQkFBb0IsRUFFcEIsd0JBQXdCLEVBRXhCLG1CQUFtQixFQUVuQixhQUFhLEVBRWIsaUJBQWlCLEVBRWxCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7Ozs7QUFFeEU7SUFNRSwyQkFDVSxtQkFBd0MsRUFDNUIsY0FBOEIsRUFDMUMsb0JBQWdDLEVBQ2hDLGVBQWdDLEVBQ2hDLGNBQThCLEVBQzlCLGlCQUFvQztRQUxwQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQzVCLG1C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LDhDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZvcmtKb2luLCBvZiwgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IENhcGFiaWxpdGllc1NlcnZpY2UgfSBmcm9tICcuL2NhcGFiaWxpdGllcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT3B0aW9uc1NlcnZpY2UgfSBmcm9tICcuL29wdGlvbnMvb3B0aW9ucy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgV0ZTU2VydmljZSB9IGZyb20gJy4vZGF0YXNvdXJjZXMvd2ZzLnNlcnZpY2UnO1xyXG5pbXBvcnQge1xyXG4gIERhdGFTb3VyY2UsXHJcbiAgT1NNRGF0YVNvdXJjZSxcclxuICBPU01EYXRhU291cmNlT3B0aW9ucyxcclxuICBGZWF0dXJlRGF0YVNvdXJjZSxcclxuICBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgWFlaRGF0YVNvdXJjZSxcclxuICBYWVpEYXRhU291cmNlT3B0aW9ucyxcclxuICBXRlNEYXRhU291cmNlLFxyXG4gIFdGU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdNVFNEYXRhU291cmNlLFxyXG4gIFdNVFNEYXRhU291cmNlT3B0aW9ucyxcclxuICBXTVNEYXRhU291cmNlLFxyXG4gIFdNU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIENhcnRvRGF0YVNvdXJjZSxcclxuICBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIEFyY0dJU1Jlc3REYXRhU291cmNlLFxyXG4gIEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyxcclxuICBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UsXHJcbiAgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyxcclxuICBXZWJTb2NrZXREYXRhU291cmNlLFxyXG4gIEFueURhdGFTb3VyY2VPcHRpb25zLFxyXG4gIE1WVERhdGFTb3VyY2UsXHJcbiAgTVZURGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgQ2x1c3RlckRhdGFTb3VyY2UsXHJcbiAgQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zXHJcbn0gZnJvbSAnLi9kYXRhc291cmNlcyc7XHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UsIE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IFByb2plY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9wcm9qZWN0aW9uLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YVNvdXJjZVNlcnZpY2Uge1xyXG4gIHB1YmxpYyBkYXRhc291cmNlcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGFTb3VyY2VbXT4oW10pO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2FwYWJpbGl0aWVzU2VydmljZTogQ2FwYWJpbGl0aWVzU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgb3B0aW9uc1NlcnZpY2U6IE9wdGlvbnNTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB3ZnNEYXRhU291cmNlU2VydmljZTogV0ZTU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgcHJvamVjdGlvblNlcnZpY2U6IFByb2plY3Rpb25TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBjcmVhdGVBc3luY0RhdGFTb3VyY2UoY29udGV4dDogQW55RGF0YVNvdXJjZU9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGFTb3VyY2U+IHtcclxuICAgIGlmICghY29udGV4dC50eXBlKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoY29udGV4dCk7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YXNvdXJjZSBuZWVkcyBhIHR5cGUnKTtcclxuICAgIH1cclxuICAgIGxldCBkYXRhU291cmNlO1xyXG4gICAgc3dpdGNoIChjb250ZXh0LnR5cGUudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICBjYXNlICdvc20nOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZU9TTURhdGFTb3VyY2UoY29udGV4dCBhcyBPU01EYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3ZlY3Rvcic6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlRmVhdHVyZURhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIEZlYXR1cmVEYXRhU291cmNlT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dmcyc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlV0ZTRGF0YVNvdXJjZShjb250ZXh0IGFzIFdGU0RhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd21zJzpcclxuICAgICAgICBjb25zdCB3bXNDb250ZXh0ID0gY29udGV4dCBhcyBXTVNEYXRhU291cmNlT3B0aW9ucztcclxuICAgICAgICBPYmplY3RVdGlscy5yZW1vdmVEdXBsaWNhdGVDYXNlSW5zZW5zaXRpdmUod21zQ29udGV4dC5wYXJhbXMpO1xyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZVdNU0RhdGFTb3VyY2Uod21zQ29udGV4dCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dtdHMnOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZVdNVFNEYXRhU291cmNlKFxyXG4gICAgICAgICAgY29udGV4dCBhcyBXTVRTRGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd4eXonOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZVhZWkRhdGFTb3VyY2UoY29udGV4dCBhcyBYWVpEYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NhcnRvJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVDYXJ0b0RhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIENhcnRvRGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdhcmNnaXNyZXN0JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVBcmNHSVNSZXN0RGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd2Vic29ja2V0JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVXZWJTb2NrZXREYXRhU291cmNlKFxyXG4gICAgICAgICAgY29udGV4dCBhcyBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdtdnQnOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZU1WVERhdGFTb3VyY2UoY29udGV4dCBhcyBNVlREYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3RpbGVhcmNnaXNyZXN0JzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjbHVzdGVyJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVDbHVzdGVyRGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmVycm9yKGNvbnRleHQpO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkYXRhc291cmNlIHR5cGUnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRhdGFzb3VyY2VzJC5uZXh0KHRoaXMuZGF0YXNvdXJjZXMkLnZhbHVlLmNvbmNhdChbZGF0YVNvdXJjZV0pKTtcclxuXHJcbiAgICByZXR1cm4gZGF0YVNvdXJjZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlT1NNRGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IE9TTURhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxPU01EYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IE9TTURhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlRmVhdHVyZURhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPEZlYXR1cmVEYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IEZlYXR1cmVEYXRhU291cmNlKGNvbnRleHQpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVdlYlNvY2tldERhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdlYlNvY2tldERhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgV2ViU29ja2V0RGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVXRlNEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogV0ZTRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdGU0RhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+XHJcbiAgICAgIGQubmV4dChuZXcgV0ZTRGF0YVNvdXJjZShjb250ZXh0LCB0aGlzLndmc0RhdGFTb3VyY2VTZXJ2aWNlKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVdNU0RhdGFTb3VyY2UoY29udGV4dDogV01TRGF0YVNvdXJjZU9wdGlvbnMpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3Qgb2JzZXJ2YWJsZXMgPSBbXTtcclxuICAgIGlmIChjb250ZXh0Lm9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzKSB7XHJcbiAgICAgIG9ic2VydmFibGVzLnB1c2goXHJcbiAgICAgICAgdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlLmdldFdNU09wdGlvbnMoY29udGV4dCkucGlwZShcclxuICAgICAgICAgIGNhdGNoRXJyb3IoZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgJ2lnby5nZW8uZGF0YVNvdXJjZS51bmF2YWlsYWJsZVRpdGxlJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgJ2lnby5nZW8uZGF0YVNvdXJjZS51bmF2YWlsYWJsZScsXHJcbiAgICAgICAgICAgICAgeyB2YWx1ZTogY29udGV4dC5wYXJhbXMuTEFZRVJTIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9uc1NlcnZpY2UgJiYgY29udGV4dC5vcHRpb25zRnJvbUFwaSA9PT0gdHJ1ZSkge1xyXG4gICAgICBvYnNlcnZhYmxlcy5wdXNoKFxyXG4gICAgICAgIHRoaXMub3B0aW9uc1NlcnZpY2UuZ2V0V01TT3B0aW9ucyhjb250ZXh0KS5waXBlKFxyXG4gICAgICAgICAgY2F0Y2hFcnJvcihlID0+IHtcclxuICAgICAgICAgICAgZS5lcnJvci50b0Rpc3BsYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICBlLmVycm9yLnRpdGxlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgJ2lnby5nZW8uZGF0YVNvdXJjZS51bmF2YWlsYWJsZVRpdGxlJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBlLmVycm9yLm1lc3NhZ2UgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAnaWdvLmdlby5kYXRhU291cmNlLm9wdGlvbnNBcGlVbmF2YWlsYWJsZSdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKHt9KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIG9ic2VydmFibGVzLnB1c2gob2YoY29udGV4dCkpO1xyXG5cclxuICAgIHJldHVybiBmb3JrSm9pbihvYnNlcnZhYmxlcykucGlwZShcclxuICAgICAgbWFwKChvcHRpb25zOiBXTVNEYXRhU291cmNlT3B0aW9uc1tdKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uc01lcmdlZCA9IG9wdGlvbnMucmVkdWNlKChhLCBiKSA9PlxyXG4gICAgICAgICAgT2JqZWN0VXRpbHMubWVyZ2VEZWVwKGEsIGIpXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gbmV3IFdNU0RhdGFTb3VyY2Uob3B0aW9uc01lcmdlZCwgdGhpcy53ZnNEYXRhU291cmNlU2VydmljZSk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBjYXRjaEVycm9yKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVdNVFNEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogV01UU0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxXTVRTRGF0YVNvdXJjZT4ge1xyXG4gICAgaWYgKGNvbnRleHQub3B0aW9uc0Zyb21DYXBhYmlsaXRpZXMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZS5nZXRXTVRTT3B0aW9ucyhjb250ZXh0KS5waXBlKFxyXG4gICAgICAgIG1hcCgob3B0aW9uczogV01UU0RhdGFTb3VyY2VPcHRpb25zKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucyA/IG5ldyBXTVRTRGF0YVNvdXJjZShvcHRpb25zKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICB9KSxcclxuICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICdpZ28uZ2VvLmRhdGFTb3VyY2UudW5hdmFpbGFibGVUaXRsZSdcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICdpZ28uZ2VvLmRhdGFTb3VyY2UudW5hdmFpbGFibGUnLFxyXG4gICAgICAgICAgICB7IHZhbHVlOiBjb250ZXh0LmxheWVyIH1cclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgV01UU0RhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlWFlaRGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IFhZWkRhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxYWVpEYXRhU291cmNlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IFhZWkRhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlQ2FydG9EYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogQ2FydG9EYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8Q2FydG9EYXRhU291cmNlPiB7XHJcbiAgICBpZiAoY29udGV4dC5tYXBJZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlXHJcbiAgICAgICAgLmdldENhcnRvT3B0aW9ucyhjb250ZXh0KVxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgbWFwKChvcHRpb25zOiBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zKSA9PiBuZXcgQ2FydG9EYXRhU291cmNlKG9wdGlvbnMpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQobmV3IENhcnRvRGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVBcmNHSVNSZXN0RGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8QXJjR0lTUmVzdERhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2VcclxuICAgICAgLmdldEFyY2dpc09wdGlvbnMoY29udGV4dClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKFxyXG4gICAgICAgICAgKG9wdGlvbnM6IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucykgPT5cclxuICAgICAgICAgICAgbmV3IEFyY0dJU1Jlc3REYXRhU291cmNlKG9wdGlvbnMpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2VcclxuICAgICAgLmdldFRpbGVBcmNnaXNPcHRpb25zKGNvbnRleHQpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChcclxuICAgICAgICAgIChvcHRpb25zOiBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zKSA9PlxyXG4gICAgICAgICAgICBuZXcgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlKG9wdGlvbnMpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVNVlREYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogTVZURGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPE1WVERhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgTVZURGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVDbHVzdGVyRGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IENsdXN0ZXJEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8Q2x1c3RlckRhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgQ2x1c3RlckRhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcbn1cclxuIl19