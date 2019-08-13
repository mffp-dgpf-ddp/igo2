/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObjectUtils } from '@igo2/utils';
import { ConfigService } from '@igo2/core';
import { OSMDataSource, FeatureDataSource, XYZDataSource, WFSDataSource, WMTSDataSource, WMSDataSource, CartoDataSource, ArcGISRestDataSource, TileArcGISRestDataSource, WebSocketDataSource, MVTDataSource, ClusterDataSource } from '../../datasource';
import { DataSourceService } from '../../datasource/shared/datasource.service';
import { ImageLayer, TileLayer, VectorLayer, VectorTileLayer } from './layers';
import { StyleService } from './style.service';
import * as i0 from "@angular/core";
import * as i1 from "./style.service";
import * as i2 from "../../datasource/shared/datasource.service";
import * as i3 from "@igo2/core";
export class LayerService {
    /**
     * @param {?} styleService
     * @param {?} dataSourceService
     * @param {?} config
     */
    constructor(styleService, dataSourceService, config) {
        this.styleService = styleService;
        this.dataSourceService = dataSourceService;
        this.config = config;
        if (this.config) {
            this.tokenKey = this.config.getConfig('auth.tokenKey');
        }
    }
    /**
     * @param {?} layerOptions
     * @return {?}
     */
    createLayer(layerOptions) {
        if (!layerOptions.source) {
            return;
        }
        if (layerOptions.source.options &&
            layerOptions.source.options.optionsFromCapabilities) {
            layerOptions = ObjectUtils.mergeDeep(((/** @type {?} */ (layerOptions.source.options)))._layerOptionsFromCapabilities ||
                {}, layerOptions || {});
        }
        /** @type {?} */
        let layer;
        switch (layerOptions.source.constructor) {
            case OSMDataSource:
            case WMTSDataSource:
            case XYZDataSource:
            case CartoDataSource:
            case TileArcGISRestDataSource:
                layer = this.createTileLayer((/** @type {?} */ (layerOptions)));
                break;
            case FeatureDataSource:
            case WFSDataSource:
            case ArcGISRestDataSource:
            case WebSocketDataSource:
            case ClusterDataSource:
                layer = this.createVectorLayer((/** @type {?} */ (layerOptions)));
                break;
            case WMSDataSource:
                layer = this.createImageLayer((/** @type {?} */ (layerOptions)));
                break;
            case MVTDataSource:
                layer = this.createVectorTileLayer((/** @type {?} */ (layerOptions)));
                break;
            default:
                break;
        }
        return layer;
    }
    /**
     * @param {?} layerOptions
     * @return {?}
     */
    createAsyncLayer(layerOptions) {
        if (layerOptions.source) {
            return new Observable((/**
             * @param {?} d
             * @return {?}
             */
            d => d.next(this.createLayer(layerOptions))));
        }
        return this.dataSourceService
            .createAsyncDataSource(layerOptions.sourceOptions)
            .pipe(map((/**
         * @param {?} source
         * @return {?}
         */
        source => {
            layerOptions.source = source;
            return this.createLayer(layerOptions);
        })));
    }
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    createImageLayer(layerOptions) {
        if (this.tokenKey) {
            layerOptions.token = localStorage.getItem(this.tokenKey);
        }
        return new ImageLayer(layerOptions);
    }
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    createTileLayer(layerOptions) {
        return new TileLayer(layerOptions);
    }
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    createVectorLayer(layerOptions) {
        /** @type {?} */
        let style;
        if (layerOptions.style !== undefined) {
            style = this.styleService.createStyle(layerOptions.style);
        }
        if (layerOptions.source instanceof ArcGISRestDataSource) {
            /** @type {?} */
            const source = (/** @type {?} */ (layerOptions.source));
            style = source.options.params.style;
        }
        else if (layerOptions.styleByAttribute) {
            /** @type {?} */
            const serviceStyle = this.styleService;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            feature => {
                return serviceStyle.createStyleByAttribute(feature, layerOptions.styleByAttribute);
            });
            return new VectorLayer(layerOptions);
        }
        if (layerOptions.source instanceof ClusterDataSource) {
            /** @type {?} */
            const serviceStyle = this.styleService;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            feature => {
                return serviceStyle.createClusterStyle(feature, layerOptions.clusterParam);
            });
            return new VectorLayer(layerOptions);
        }
        /** @type {?} */
        const layerOptionsOl = Object.assign({}, layerOptions, {
            style
        });
        return new VectorLayer(layerOptionsOl);
    }
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    createVectorTileLayer(layerOptions) {
        /** @type {?} */
        let style;
        if (layerOptions.style !== undefined) {
            style = this.styleService.createStyle(layerOptions.style);
        }
        if (layerOptions.styleByAttribute) {
            /** @type {?} */
            const serviceStyle = this.styleService;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            feature => {
                return serviceStyle.createStyleByAttribute(feature, layerOptions.styleByAttribute);
            });
            return new VectorTileLayer(layerOptions);
        }
        /** @type {?} */
        const layerOptionsOl = Object.assign({}, layerOptions, {
            style
        });
        return new VectorTileLayer(layerOptionsOl);
    }
}
LayerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LayerService.ctorParameters = () => [
    { type: StyleService },
    { type: DataSourceService },
    { type: ConfigService, decorators: [{ type: Optional }] }
];
/** @nocollapse */ LayerService.ngInjectableDef = i0.defineInjectable({ factory: function LayerService_Factory() { return new LayerService(i0.inject(i1.StyleService), i0.inject(i2.DataSourceService), i0.inject(i3.ConfigService, 8)); }, token: LayerService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    LayerService.prototype.tokenKey;
    /**
     * @type {?}
     * @private
     */
    LayerService.prototype.styleService;
    /**
     * @type {?}
     * @private
     */
    LayerService.prototype.dataSourceService;
    /**
     * @type {?}
     * @private
     */
    LayerService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvbGF5ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixhQUFhLEVBQ2IsY0FBYyxFQUNkLGFBQWEsRUFDYixlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3BCLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLGlCQUFpQixFQUNsQixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRS9FLE9BQU8sRUFFTCxVQUFVLEVBRVYsU0FBUyxFQUVULFdBQVcsRUFHWCxlQUFlLEVBRWhCLE1BQU0sVUFBVSxDQUFDO0FBRWxCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFLL0MsTUFBTSxPQUFPLFlBQVk7Ozs7OztJQUd2QixZQUNVLFlBQTBCLEVBQzFCLGlCQUFvQyxFQUN4QixNQUFxQjtRQUZqQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFFekMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsR0FB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LEVBQUU7WUFDcEMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzRDtRQUVELElBQUksWUFBWSxDQUFDLGdCQUFnQixFQUFFOztrQkFDM0IsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZO1lBQ3RDLFlBQVksQ0FBQyxLQUFLOzs7O1lBQUcsT0FBTyxDQUFDLEVBQUU7Z0JBQzdCLE9BQU8sWUFBWSxDQUFDLHNCQUFzQixDQUN4QyxPQUFPLEVBQ1AsWUFBWSxDQUFDLGdCQUFnQixDQUM5QixDQUFDO1lBQ0osQ0FBQyxDQUFBLENBQUM7WUFDRixPQUFPLElBQUksZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzFDOztjQUVLLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUU7WUFDckQsS0FBSztTQUNOLENBQUM7UUFDRixPQUFPLElBQUksZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7OztZQXZKRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFKUSxZQUFZO1lBZlosaUJBQWlCO1lBakJqQixhQUFhLHVCQTJDakIsUUFBUTs7Ozs7Ozs7SUFMWCxnQ0FBeUI7Ozs7O0lBR3ZCLG9DQUFrQzs7Ozs7SUFDbEMseUNBQTRDOzs7OztJQUM1Qyw4QkFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE9TTURhdGFTb3VyY2UsXHJcbiAgRmVhdHVyZURhdGFTb3VyY2UsXHJcbiAgWFlaRGF0YVNvdXJjZSxcclxuICBXRlNEYXRhU291cmNlLFxyXG4gIFdNVFNEYXRhU291cmNlLFxyXG4gIFdNU0RhdGFTb3VyY2UsXHJcbiAgQ2FydG9EYXRhU291cmNlLFxyXG4gIEFyY0dJU1Jlc3REYXRhU291cmNlLFxyXG4gIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZSxcclxuICBXZWJTb2NrZXREYXRhU291cmNlLFxyXG4gIE1WVERhdGFTb3VyY2UsXHJcbiAgQ2x1c3RlckRhdGFTb3VyY2VcclxufSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTGF5ZXIsXHJcbiAgSW1hZ2VMYXllcixcclxuICBJbWFnZUxheWVyT3B0aW9ucyxcclxuICBUaWxlTGF5ZXIsXHJcbiAgVGlsZUxheWVyT3B0aW9ucyxcclxuICBWZWN0b3JMYXllcixcclxuICBWZWN0b3JMYXllck9wdGlvbnMsXHJcbiAgQW55TGF5ZXJPcHRpb25zLFxyXG4gIFZlY3RvclRpbGVMYXllcixcclxuICBWZWN0b3JUaWxlTGF5ZXJPcHRpb25zXHJcbn0gZnJvbSAnLi9sYXllcnMnO1xyXG5cclxuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi9zdHlsZS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIExheWVyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSB0b2tlbktleTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGRhdGFTb3VyY2VTZXJ2aWNlOiBEYXRhU291cmNlU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBpZiAodGhpcy5jb25maWcpIHtcclxuICAgICAgdGhpcy50b2tlbktleSA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnYXV0aC50b2tlbktleScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlTGF5ZXIobGF5ZXJPcHRpb25zOiBBbnlMYXllck9wdGlvbnMpOiBMYXllciB7XHJcbiAgICBpZiAoIWxheWVyT3B0aW9ucy5zb3VyY2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgbGF5ZXJPcHRpb25zLnNvdXJjZS5vcHRpb25zICYmXHJcbiAgICAgIGxheWVyT3B0aW9ucy5zb3VyY2Uub3B0aW9ucy5vcHRpb25zRnJvbUNhcGFiaWxpdGllc1xyXG4gICAgKSB7XHJcbiAgICAgIGxheWVyT3B0aW9ucyA9IE9iamVjdFV0aWxzLm1lcmdlRGVlcChcclxuICAgICAgICAobGF5ZXJPcHRpb25zLnNvdXJjZS5vcHRpb25zIGFzIGFueSkuX2xheWVyT3B0aW9uc0Zyb21DYXBhYmlsaXRpZXMgfHxcclxuICAgICAgICAgIHt9LFxyXG4gICAgICAgIGxheWVyT3B0aW9ucyB8fCB7fVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBsYXllcjtcclxuICAgIHN3aXRjaCAobGF5ZXJPcHRpb25zLnNvdXJjZS5jb25zdHJ1Y3Rvcikge1xyXG4gICAgICBjYXNlIE9TTURhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgV01UU0RhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgWFlaRGF0YVNvdXJjZTpcclxuICAgICAgY2FzZSBDYXJ0b0RhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlOlxyXG4gICAgICAgIGxheWVyID0gdGhpcy5jcmVhdGVUaWxlTGF5ZXIobGF5ZXJPcHRpb25zIGFzIFRpbGVMYXllck9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEZlYXR1cmVEYXRhU291cmNlOlxyXG4gICAgICBjYXNlIFdGU0RhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgQXJjR0lTUmVzdERhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgV2ViU29ja2V0RGF0YVNvdXJjZTpcclxuICAgICAgY2FzZSBDbHVzdGVyRGF0YVNvdXJjZTpcclxuICAgICAgICBsYXllciA9IHRoaXMuY3JlYXRlVmVjdG9yTGF5ZXIobGF5ZXJPcHRpb25zIGFzIFZlY3RvckxheWVyT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgV01TRGF0YVNvdXJjZTpcclxuICAgICAgICBsYXllciA9IHRoaXMuY3JlYXRlSW1hZ2VMYXllcihsYXllck9wdGlvbnMgYXMgSW1hZ2VMYXllck9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIE1WVERhdGFTb3VyY2U6XHJcbiAgICAgICAgbGF5ZXIgPSB0aGlzLmNyZWF0ZVZlY3RvclRpbGVMYXllcihcclxuICAgICAgICAgIGxheWVyT3B0aW9ucyBhcyBWZWN0b3JUaWxlTGF5ZXJPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGF5ZXI7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVBc3luY0xheWVyKGxheWVyT3B0aW9uczogQW55TGF5ZXJPcHRpb25zKTogT2JzZXJ2YWJsZTxMYXllcj4ge1xyXG4gICAgaWYgKGxheWVyT3B0aW9ucy5zb3VyY2UpIHtcclxuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KHRoaXMuY3JlYXRlTGF5ZXIobGF5ZXJPcHRpb25zKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmRhdGFTb3VyY2VTZXJ2aWNlXHJcbiAgICAgIC5jcmVhdGVBc3luY0RhdGFTb3VyY2UobGF5ZXJPcHRpb25zLnNvdXJjZU9wdGlvbnMpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChzb3VyY2UgPT4ge1xyXG4gICAgICAgICAgbGF5ZXJPcHRpb25zLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUxheWVyKGxheWVyT3B0aW9ucyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlSW1hZ2VMYXllcihsYXllck9wdGlvbnM6IEltYWdlTGF5ZXJPcHRpb25zKTogSW1hZ2VMYXllciB7XHJcbiAgICBpZiAodGhpcy50b2tlbktleSkge1xyXG4gICAgICBsYXllck9wdGlvbnMudG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnRva2VuS2V5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEltYWdlTGF5ZXIobGF5ZXJPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlVGlsZUxheWVyKGxheWVyT3B0aW9uczogVGlsZUxheWVyT3B0aW9ucyk6IFRpbGVMYXllciB7XHJcbiAgICByZXR1cm4gbmV3IFRpbGVMYXllcihsYXllck9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVWZWN0b3JMYXllcihsYXllck9wdGlvbnM6IFZlY3RvckxheWVyT3B0aW9ucyk6IFZlY3RvckxheWVyIHtcclxuICAgIGxldCBzdHlsZTtcclxuICAgIGlmIChsYXllck9wdGlvbnMuc3R5bGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzdHlsZSA9IHRoaXMuc3R5bGVTZXJ2aWNlLmNyZWF0ZVN0eWxlKGxheWVyT3B0aW9ucy5zdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxheWVyT3B0aW9ucy5zb3VyY2UgaW5zdGFuY2VvZiBBcmNHSVNSZXN0RGF0YVNvdXJjZSkge1xyXG4gICAgICBjb25zdCBzb3VyY2UgPSBsYXllck9wdGlvbnMuc291cmNlIGFzIEFyY0dJU1Jlc3REYXRhU291cmNlO1xyXG4gICAgICBzdHlsZSA9IHNvdXJjZS5vcHRpb25zLnBhcmFtcy5zdHlsZTtcclxuICAgIH0gZWxzZSBpZiAobGF5ZXJPcHRpb25zLnN0eWxlQnlBdHRyaWJ1dGUpIHtcclxuICAgICAgY29uc3Qgc2VydmljZVN0eWxlID0gdGhpcy5zdHlsZVNlcnZpY2U7XHJcbiAgICAgIGxheWVyT3B0aW9ucy5zdHlsZSA9IGZlYXR1cmUgPT4ge1xyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlU3R5bGUuY3JlYXRlU3R5bGVCeUF0dHJpYnV0ZShcclxuICAgICAgICAgIGZlYXR1cmUsXHJcbiAgICAgICAgICBsYXllck9wdGlvbnMuc3R5bGVCeUF0dHJpYnV0ZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiBuZXcgVmVjdG9yTGF5ZXIobGF5ZXJPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGF5ZXJPcHRpb25zLnNvdXJjZSBpbnN0YW5jZW9mIENsdXN0ZXJEYXRhU291cmNlKSB7XHJcbiAgICAgIGNvbnN0IHNlcnZpY2VTdHlsZSA9IHRoaXMuc3R5bGVTZXJ2aWNlO1xyXG4gICAgICBsYXllck9wdGlvbnMuc3R5bGUgPSBmZWF0dXJlID0+IHtcclxuICAgICAgICByZXR1cm4gc2VydmljZVN0eWxlLmNyZWF0ZUNsdXN0ZXJTdHlsZShcclxuICAgICAgICAgIGZlYXR1cmUsXHJcbiAgICAgICAgICBsYXllck9wdGlvbnMuY2x1c3RlclBhcmFtXHJcbiAgICAgICAgKTtcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIG5ldyBWZWN0b3JMYXllcihsYXllck9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxheWVyT3B0aW9uc09sID0gT2JqZWN0LmFzc2lnbih7fSwgbGF5ZXJPcHRpb25zLCB7XHJcbiAgICAgIHN0eWxlXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvckxheWVyKGxheWVyT3B0aW9uc09sKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlVmVjdG9yVGlsZUxheWVyKFxyXG4gICAgbGF5ZXJPcHRpb25zOiBWZWN0b3JUaWxlTGF5ZXJPcHRpb25zXHJcbiAgKTogVmVjdG9yVGlsZUxheWVyIHtcclxuICAgIGxldCBzdHlsZTtcclxuICAgIGlmIChsYXllck9wdGlvbnMuc3R5bGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzdHlsZSA9IHRoaXMuc3R5bGVTZXJ2aWNlLmNyZWF0ZVN0eWxlKGxheWVyT3B0aW9ucy5zdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxheWVyT3B0aW9ucy5zdHlsZUJ5QXR0cmlidXRlKSB7XHJcbiAgICAgIGNvbnN0IHNlcnZpY2VTdHlsZSA9IHRoaXMuc3R5bGVTZXJ2aWNlO1xyXG4gICAgICBsYXllck9wdGlvbnMuc3R5bGUgPSBmZWF0dXJlID0+IHtcclxuICAgICAgICByZXR1cm4gc2VydmljZVN0eWxlLmNyZWF0ZVN0eWxlQnlBdHRyaWJ1dGUoXHJcbiAgICAgICAgICBmZWF0dXJlLFxyXG4gICAgICAgICAgbGF5ZXJPcHRpb25zLnN0eWxlQnlBdHRyaWJ1dGVcclxuICAgICAgICApO1xyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gbmV3IFZlY3RvclRpbGVMYXllcihsYXllck9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxheWVyT3B0aW9uc09sID0gT2JqZWN0LmFzc2lnbih7fSwgbGF5ZXJPcHRpb25zLCB7XHJcbiAgICAgIHN0eWxlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yVGlsZUxheWVyKGxheWVyT3B0aW9uc09sKTtcclxuICB9XHJcbn1cclxuIl19