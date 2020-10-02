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
export class DataSourceService {
    /**
     * @param {?} capabilitiesService
     * @param {?} optionsService
     * @param {?} wfsDataSourceService
     * @param {?} languageService
     * @param {?} messageService
     * @param {?} projectionService
     */
    constructor(capabilitiesService, optionsService, wfsDataSourceService, languageService, messageService, projectionService) {
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
        /** @type {?} */
        const observables = [];
        if (context.optionsFromCapabilities) {
            observables.push(this.capabilitiesService.getWMSOptions(context).pipe(catchError((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                /** @type {?} */
                const title = this.languageService.translate.instant('igo.geo.dataSource.unavailableTitle');
                /** @type {?} */
                const message = this.languageService.translate.instant('igo.geo.dataSource.unavailable', { value: context.params.LAYERS });
                this.messageService.error(message, title);
                throw e;
            }))));
        }
        if (this.optionsService && context.optionsFromApi === true) {
            observables.push(this.optionsService.getWMSOptions(context).pipe(catchError((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                e.error.toDisplay = true;
                e.error.title = this.languageService.translate.instant('igo.geo.dataSource.unavailableTitle');
                e.error.message = this.languageService.translate.instant('igo.geo.dataSource.optionsApiUnavailable');
                return of({});
            }))));
        }
        observables.push(of(context));
        return forkJoin(observables).pipe(map((/**
         * @param {?} options
         * @return {?}
         */
        (options) => {
            /** @type {?} */
            const optionsMerged = options.reduce((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => ObjectUtils.mergeDeep(a, b)));
            return new WMSDataSource(optionsMerged, this.wfsDataSourceService);
        })), catchError((/**
         * @return {?}
         */
        () => {
            return of(undefined);
        })));
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
            })), catchError((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const title = this.languageService.translate.instant('igo.geo.dataSource.unavailableTitle');
                /** @type {?} */
                const message = this.languageService.translate.instant('igo.geo.dataSource.unavailable', { value: context.layer });
                this.messageService.error(message, title);
                return of(undefined);
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
    { type: OptionsService, decorators: [{ type: Optional }] },
    { type: WFSService },
    { type: LanguageService },
    { type: MessageService },
    { type: ProjectionService }
];
/** @nocollapse */ DataSourceService.ngInjectableDef = i0.defineInjectable({ factory: function DataSourceService_Factory() { return new DataSourceService(i0.inject(i1.CapabilitiesService), i0.inject(i2.OptionsService, 8), i0.inject(i3.WFSService), i0.inject(i4.LanguageService), i0.inject(i4.MessageService), i0.inject(i5.ProjectionService)); }, token: DataSourceService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdkQsT0FBTyxFQUVMLGFBQWEsRUFFYixpQkFBaUIsRUFFakIsYUFBYSxFQUViLGFBQWEsRUFFYixjQUFjLEVBRWQsYUFBYSxFQUViLGVBQWUsRUFFZixvQkFBb0IsRUFFcEIsd0JBQXdCLEVBRXhCLG1CQUFtQixFQUVuQixhQUFhLEVBRWIsaUJBQWlCLEVBRWxCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7Ozs7QUFLeEUsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7Ozs7O0lBRzVCLFlBQ1UsbUJBQXdDLEVBQzVCLGNBQThCLEVBQzFDLG9CQUFnQyxFQUNoQyxlQUFnQyxFQUNoQyxjQUE4QixFQUM5QixpQkFBb0M7UUFMcEMsd0JBQW1CLEdB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LEdBQUc7Ozs7UUFDRCxDQUFDLE9BQXdDLEVBQUUsRUFBRSxDQUMzQyxJQUFJLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxFQUN4QyxDQUNGLENBQUM7SUFDTixDQUFDOzs7Ozs7SUFFTyxtQkFBbUIsQ0FDekIsT0FBNkI7UUFFN0IsT0FBTyxJQUFJLFVBQVU7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDO0lBQ2pFLENBQUM7Ozs7OztJQUVPLHVCQUF1QixDQUM3QixPQUFpQztRQUVqQyxPQUFPLElBQUksVUFBVTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQztJQUNyRSxDQUFDOzs7WUFwUEYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBcENRLG1CQUFtQjtZQUNuQixjQUFjLHVCQXlDbEIsUUFBUTtZQXhDSixVQUFVO1lBNkJWLGVBQWU7WUFBRSxjQUFjO1lBQy9CLGlCQUFpQjs7Ozs7SUFNeEIseUNBQTREOzs7OztJQUcxRCxnREFBZ0Q7Ozs7O0lBQ2hELDJDQUFrRDs7Ozs7SUFDbEQsaURBQXdDOzs7OztJQUN4Qyw0Q0FBd0M7Ozs7O0lBQ3hDLDJDQUFzQzs7Ozs7SUFDdEMsOENBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZm9ya0pvaW4sIG9mLCBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgQ2FwYWJpbGl0aWVzU2VydmljZSB9IGZyb20gJy4vY2FwYWJpbGl0aWVzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPcHRpb25zU2VydmljZSB9IGZyb20gJy4vb3B0aW9ucy9vcHRpb25zLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBXRlNTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhc291cmNlcy93ZnMuc2VydmljZSc7XHJcbmltcG9ydCB7XHJcbiAgRGF0YVNvdXJjZSxcclxuICBPU01EYXRhU291cmNlLFxyXG4gIE9TTURhdGFTb3VyY2VPcHRpb25zLFxyXG4gIEZlYXR1cmVEYXRhU291cmNlLFxyXG4gIEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyxcclxuICBYWVpEYXRhU291cmNlLFxyXG4gIFhZWkRhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdGU0RhdGFTb3VyY2UsXHJcbiAgV0ZTRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgV01UU0RhdGFTb3VyY2UsXHJcbiAgV01UU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdNU0RhdGFTb3VyY2UsXHJcbiAgV01TRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgQ2FydG9EYXRhU291cmNlLFxyXG4gIENhcnRvRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgQXJjR0lTUmVzdERhdGFTb3VyY2UsXHJcbiAgQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZSxcclxuICBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zLFxyXG4gIFdlYlNvY2tldERhdGFTb3VyY2UsXHJcbiAgQW55RGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgTVZURGF0YVNvdXJjZSxcclxuICBNVlREYXRhU291cmNlT3B0aW9ucyxcclxuICBDbHVzdGVyRGF0YVNvdXJjZSxcclxuICBDbHVzdGVyRGF0YVNvdXJjZU9wdGlvbnNcclxufSBmcm9tICcuL2RhdGFzb3VyY2VzJztcclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSwgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgUHJvamVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL3Byb2plY3Rpb24uc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhU291cmNlU2VydmljZSB7XHJcbiAgcHVibGljIGRhdGFzb3VyY2VzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF0YVNvdXJjZVtdPihbXSk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjYXBhYmlsaXRpZXNTZXJ2aWNlOiBDYXBhYmlsaXRpZXNTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBvcHRpb25zU2VydmljZTogT3B0aW9uc1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHdmc0RhdGFTb3VyY2VTZXJ2aWNlOiBXRlNTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBwcm9qZWN0aW9uU2VydmljZTogUHJvamVjdGlvblNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGNyZWF0ZUFzeW5jRGF0YVNvdXJjZShjb250ZXh0OiBBbnlEYXRhU291cmNlT3B0aW9ucyk6IE9ic2VydmFibGU8RGF0YVNvdXJjZT4ge1xyXG4gICAgaWYgKCFjb250ZXh0LnR5cGUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihjb250ZXh0KTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhc291cmNlIG5lZWRzIGEgdHlwZScpO1xyXG4gICAgfVxyXG4gICAgbGV0IGRhdGFTb3VyY2U7XHJcbiAgICBzd2l0Y2ggKGNvbnRleHQudHlwZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgIGNhc2UgJ29zbSc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlT1NNRGF0YVNvdXJjZShjb250ZXh0IGFzIE9TTURhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndmVjdG9yJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVGZWF0dXJlRGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd2ZzJzpcclxuICAgICAgICBkYXRhU291cmNlID0gdGhpcy5jcmVhdGVXRlNEYXRhU291cmNlKGNvbnRleHQgYXMgV0ZTRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd3bXMnOlxyXG4gICAgICAgIGNvbnN0IHdtc0NvbnRleHQgPSBjb250ZXh0IGFzIFdNU0RhdGFTb3VyY2VPcHRpb25zO1xyXG4gICAgICAgIE9iamVjdFV0aWxzLnJlbW92ZUR1cGxpY2F0ZUNhc2VJbnNlbnNpdGl2ZSh3bXNDb250ZXh0LnBhcmFtcyk7XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlV01TRGF0YVNvdXJjZSh3bXNDb250ZXh0KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd210cyc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlV01UU0RhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIFdNVFNEYXRhU291cmNlT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3h5eic6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlWFlaRGF0YVNvdXJjZShjb250ZXh0IGFzIFhZWkRhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY2FydG8nOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZUNhcnRvRGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgQ2FydG9EYXRhU291cmNlT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2FyY2dpc3Jlc3QnOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZUFyY0dJU1Jlc3REYXRhU291cmNlKFxyXG4gICAgICAgICAgY29udGV4dCBhcyBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd3ZWJzb2NrZXQnOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZVdlYlNvY2tldERhdGFTb3VyY2UoXHJcbiAgICAgICAgICBjb250ZXh0IGFzIEZlYXR1cmVEYXRhU291cmNlT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ212dCc6XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IHRoaXMuY3JlYXRlTVZURGF0YVNvdXJjZShjb250ZXh0IGFzIE1WVERhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndGlsZWFyY2dpc3Jlc3QnOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZVRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZShcclxuICAgICAgICAgIGNvbnRleHQgYXMgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NsdXN0ZXInOlxyXG4gICAgICAgIGRhdGFTb3VyY2UgPSB0aGlzLmNyZWF0ZUNsdXN0ZXJEYXRhU291cmNlKFxyXG4gICAgICAgICAgY29udGV4dCBhcyBDbHVzdGVyRGF0YVNvdXJjZU9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoY29udGV4dCk7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGRhdGFzb3VyY2UgdHlwZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZGF0YXNvdXJjZXMkLm5leHQodGhpcy5kYXRhc291cmNlcyQudmFsdWUuY29uY2F0KFtkYXRhU291cmNlXSkpO1xyXG5cclxuICAgIHJldHVybiBkYXRhU291cmNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVPU01EYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogT1NNRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPE9TTURhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgT1NNRGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVGZWF0dXJlRGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IEZlYXR1cmVEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8RmVhdHVyZURhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgRmVhdHVyZURhdGFTb3VyY2UoY29udGV4dCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlV2ViU29ja2V0RGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IEZlYXR1cmVEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8V2ViU29ja2V0RGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KG5ldyBXZWJTb2NrZXREYXRhU291cmNlKGNvbnRleHQpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVdGU0RhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBXRlNEYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8V0ZTRGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT5cclxuICAgICAgZC5uZXh0KG5ldyBXRlNEYXRhU291cmNlKGNvbnRleHQsIHRoaXMud2ZzRGF0YVNvdXJjZVNlcnZpY2UpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlV01TRGF0YVNvdXJjZShjb250ZXh0OiBXTVNEYXRhU291cmNlT3B0aW9ucyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCBvYnNlcnZhYmxlcyA9IFtdO1xyXG4gICAgaWYgKGNvbnRleHQub3B0aW9uc0Zyb21DYXBhYmlsaXRpZXMpIHtcclxuICAgICAgb2JzZXJ2YWJsZXMucHVzaChcclxuICAgICAgICB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2UuZ2V0V01TT3B0aW9ucyhjb250ZXh0KS5waXBlKFxyXG4gICAgICAgICAgY2F0Y2hFcnJvcihlID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAnaWdvLmdlby5kYXRhU291cmNlLnVuYXZhaWxhYmxlVGl0bGUnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAnaWdvLmdlby5kYXRhU291cmNlLnVuYXZhaWxhYmxlJyxcclxuICAgICAgICAgICAgICB7IHZhbHVlOiBjb250ZXh0LnBhcmFtcy5MQVlFUlMgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zU2VydmljZSAmJiBjb250ZXh0Lm9wdGlvbnNGcm9tQXBpID09PSB0cnVlKSB7XHJcbiAgICAgIG9ic2VydmFibGVzLnB1c2goXHJcbiAgICAgICAgdGhpcy5vcHRpb25zU2VydmljZS5nZXRXTVNPcHRpb25zKGNvbnRleHQpLnBpcGUoXHJcbiAgICAgICAgICBjYXRjaEVycm9yKGUgPT4ge1xyXG4gICAgICAgICAgICBlLmVycm9yLnRvRGlzcGxheSA9IHRydWU7XHJcbiAgICAgICAgICAgIGUuZXJyb3IudGl0bGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAnaWdvLmdlby5kYXRhU291cmNlLnVuYXZhaWxhYmxlVGl0bGUnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGUuZXJyb3IubWVzc2FnZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICdpZ28uZ2VvLmRhdGFTb3VyY2Uub3B0aW9uc0FwaVVuYXZhaWxhYmxlJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm4gb2Yoe30pO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgb2JzZXJ2YWJsZXMucHVzaChvZihjb250ZXh0KSk7XHJcblxyXG4gICAgcmV0dXJuIGZvcmtKb2luKG9ic2VydmFibGVzKS5waXBlKFxyXG4gICAgICBtYXAoKG9wdGlvbnM6IFdNU0RhdGFTb3VyY2VPcHRpb25zW10pID0+IHtcclxuICAgICAgICBjb25zdCBvcHRpb25zTWVyZ2VkID0gb3B0aW9ucy5yZWR1Y2UoKGEsIGIpID0+XHJcbiAgICAgICAgICBPYmplY3RVdGlscy5tZXJnZURlZXAoYSwgYilcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBuZXcgV01TRGF0YVNvdXJjZShvcHRpb25zTWVyZ2VkLCB0aGlzLndmc0RhdGFTb3VyY2VTZXJ2aWNlKTtcclxuICAgICAgfSksXHJcbiAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlV01UU0RhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBXTVRTRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdNVFNEYXRhU291cmNlPiB7XHJcbiAgICBpZiAoY29udGV4dC5vcHRpb25zRnJvbUNhcGFiaWxpdGllcykge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlLmdldFdNVFNPcHRpb25zKGNvbnRleHQpLnBpcGUoXHJcbiAgICAgICAgbWFwKChvcHRpb25zOiBXTVRTRGF0YVNvdXJjZU9wdGlvbnMpID0+IHtcclxuICAgICAgICAgIHJldHVybiBvcHRpb25zID8gbmV3IFdNVFNEYXRhU291cmNlKG9wdGlvbnMpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgJ2lnby5nZW8uZGF0YVNvdXJjZS51bmF2YWlsYWJsZVRpdGxlJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgJ2lnby5nZW8uZGF0YVNvdXJjZS51bmF2YWlsYWJsZScsXHJcbiAgICAgICAgICAgIHsgdmFsdWU6IGNvbnRleHQubGF5ZXIgfVxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KG5ldyBXTVRTRGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVYWVpEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogWFlaRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFhZWkRhdGFTb3VyY2U+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgWFlaRGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVDYXJ0b0RhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxDYXJ0b0RhdGFTb3VyY2U+IHtcclxuICAgIGlmIChjb250ZXh0Lm1hcElkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdGllc1NlcnZpY2VcclxuICAgICAgICAuZ2V0Q2FydG9PcHRpb25zKGNvbnRleHQpXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAoKG9wdGlvbnM6IENhcnRvRGF0YVNvdXJjZU9wdGlvbnMpID0+IG5ldyBDYXJ0b0RhdGFTb3VyY2Uob3B0aW9ucykpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dChuZXcgQ2FydG9EYXRhU291cmNlKGNvbnRleHQpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUFyY0dJU1Jlc3REYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxBcmNHSVNSZXN0RGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZVxyXG4gICAgICAuZ2V0QXJjZ2lzT3B0aW9ucyhjb250ZXh0KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoXHJcbiAgICAgICAgICAob3B0aW9uczogQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zKSA9PlxyXG4gICAgICAgICAgICBuZXcgQXJjR0lTUmVzdERhdGFTb3VyY2Uob3B0aW9ucylcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZShcclxuICAgIGNvbnRleHQ6IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZVxyXG4gICAgICAuZ2V0VGlsZUFyY2dpc09wdGlvbnMoY29udGV4dClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKFxyXG4gICAgICAgICAgKG9wdGlvbnM6IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMpID0+XHJcbiAgICAgICAgICAgIG5ldyBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2Uob3B0aW9ucylcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZU1WVERhdGFTb3VyY2UoXHJcbiAgICBjb250ZXh0OiBNVlREYXRhU291cmNlT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8TVZURGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KG5ldyBNVlREYXRhU291cmNlKGNvbnRleHQpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUNsdXN0ZXJEYXRhU291cmNlKFxyXG4gICAgY29udGV4dDogQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxDbHVzdGVyRGF0YVNvdXJjZT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KG5ldyBDbHVzdGVyRGF0YVNvdXJjZShjb250ZXh0KSkpO1xyXG4gIH1cclxufVxyXG4iXX0=