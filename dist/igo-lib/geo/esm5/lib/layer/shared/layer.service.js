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
var LayerService = /** @class */ (function () {
    function LayerService(styleService, dataSourceService, config) {
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
    LayerService.prototype.createLayer = /**
     * @param {?} layerOptions
     * @return {?}
     */
    function (layerOptions) {
        if (!layerOptions.source) {
            return;
        }
        if (layerOptions.source.options &&
            layerOptions.source.options.optionsFromCapabilities) {
            layerOptions = ObjectUtils.mergeDeep(((/** @type {?} */ (layerOptions.source.options)))._layerOptionsFromCapabilities || {}, layerOptions || {});
        }
        /** @type {?} */
        var layer;
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
    };
    /**
     * @param {?} layerOptions
     * @return {?}
     */
    LayerService.prototype.createAsyncLayer = /**
     * @param {?} layerOptions
     * @return {?}
     */
    function (layerOptions) {
        var _this = this;
        if (layerOptions.source) {
            return new Observable((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.next(_this.createLayer(layerOptions)); }));
        }
        return this.dataSourceService
            .createAsyncDataSource(layerOptions.sourceOptions)
            .pipe(map((/**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            layerOptions.source = source;
            return _this.createLayer(layerOptions);
        })));
    };
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    LayerService.prototype.createImageLayer = /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    function (layerOptions) {
        if (this.tokenKey) {
            layerOptions.token = localStorage.getItem(this.tokenKey);
        }
        return new ImageLayer(layerOptions);
    };
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    LayerService.prototype.createTileLayer = /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    function (layerOptions) {
        return new TileLayer(layerOptions);
    };
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    LayerService.prototype.createVectorLayer = /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    function (layerOptions) {
        /** @type {?} */
        var style;
        if (layerOptions.style !== undefined) {
            style = this.styleService.createStyle(layerOptions.style);
        }
        if (layerOptions.source instanceof ArcGISRestDataSource) {
            /** @type {?} */
            var source = (/** @type {?} */ (layerOptions.source));
            style = source.options.params.style;
        }
        if (layerOptions.source instanceof ClusterDataSource) {
            /** @type {?} */
            var serviceStyle_1 = this.styleService;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            function (feature) {
                return serviceStyle_1.createClusterStyle(feature, layerOptions.clusterParam);
            });
            return new VectorLayer(layerOptions);
        }
        if (layerOptions.styleByAttribute) {
            /** @type {?} */
            var serviceStyle_2 = this.styleService;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            function (feature) {
                return serviceStyle_2.createStyleByAttribute(feature, layerOptions.styleByAttribute);
            });
            return new VectorLayer(layerOptions);
        }
        /** @type {?} */
        var layerOptionsOl = Object.assign({}, layerOptions, {
            style: style
        });
        return new VectorLayer(layerOptionsOl);
    };
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    LayerService.prototype.createVectorTileLayer = /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    function (layerOptions) {
        /** @type {?} */
        var style;
        if (layerOptions.style !== undefined) {
            style = this.styleService.createStyle(layerOptions.style);
        }
        if (layerOptions.styleByAttribute) {
            /** @type {?} */
            var serviceStyle_3 = this.styleService;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            function (feature) {
                return serviceStyle_3.createStyleByAttribute(feature, layerOptions.styleByAttribute);
            });
            return new VectorTileLayer(layerOptions);
        }
        /** @type {?} */
        var layerOptionsOl = Object.assign({}, layerOptions, {
            style: style
        });
        return new VectorTileLayer(layerOptionsOl);
    };
    LayerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    LayerService.ctorParameters = function () { return [
        { type: StyleService },
        { type: DataSourceService },
        { type: ConfigService, decorators: [{ type: Optional }] }
    ]; };
    /** @nocollapse */ LayerService.ngInjectableDef = i0.defineInjectable({ factory: function LayerService_Factory() { return new LayerService(i0.inject(i1.StyleService), i0.inject(i2.DataSourceService), i0.inject(i3.ConfigService, 8)); }, token: LayerService, providedIn: "root" });
    return LayerService;
}());
export { LayerService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvbGF5ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixhQUFhLEVBQ2IsY0FBYyxFQUNkLGFBQWEsRUFDYixlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3BCLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLGlCQUFpQixFQUNsQixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRS9FLE9BQU8sRUFFTCxVQUFVLEVBRVYsU0FBUyxFQUVULFdBQVcsRUFHWCxlQUFlLEVBRWhCLE1BQU0sVUFBVSxDQUFDO0FBRWxCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFFL0M7SUFNRSxzQkFDVSxZQUEwQixFQUMxQixpQkFBb0MsRUFDeEIsTUFBcUI7UUFGakMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBRXpDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FB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WUFBb0M7O1lBQzVELEtBQUs7UUFDVCxJQUFJLFlBQVksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3BDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0Q7UUFFRCxJQUFJLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRTs7Z0JBQzNCLGNBQVksR0FBRyxJQUFJLENBQUMsWUFBWTtZQUN0QyxZQUFZLENBQUMsS0FBSzs7OztZQUFHLFVBQUMsT0FBTztnQkFDM0IsT0FBTyxjQUFZLENBQUMsc0JBQXNCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JGLENBQUMsQ0FBQSxDQUFDO1lBQ0YsT0FBTyxJQUFJLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMxQzs7WUFFSyxjQUFjLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFO1lBQ3JELEtBQUssT0FBQTtTQUNOLENBQUM7UUFDRixPQUFPLElBQUksZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7O2dCQTNJRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQUpRLFlBQVk7Z0JBZlosaUJBQWlCO2dCQWpCakIsYUFBYSx1QkEyQ2pCLFFBQVE7Ozt1QkFoRGI7Q0FtTEMsQUE1SUQsSUE0SUM7U0F6SVksWUFBWTs7Ozs7O0lBQ3ZCLGdDQUF5Qjs7Ozs7SUFHdkIsb0NBQWtDOzs7OztJQUNsQyx5Q0FBNEM7Ozs7O0lBQzVDLDhCQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgT1NNRGF0YVNvdXJjZSxcclxuICBGZWF0dXJlRGF0YVNvdXJjZSxcclxuICBYWVpEYXRhU291cmNlLFxyXG4gIFdGU0RhdGFTb3VyY2UsXHJcbiAgV01UU0RhdGFTb3VyY2UsXHJcbiAgV01TRGF0YVNvdXJjZSxcclxuICBDYXJ0b0RhdGFTb3VyY2UsXHJcbiAgQXJjR0lTUmVzdERhdGFTb3VyY2UsXHJcbiAgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlLFxyXG4gIFdlYlNvY2tldERhdGFTb3VyY2UsXHJcbiAgTVZURGF0YVNvdXJjZSxcclxuICBDbHVzdGVyRGF0YVNvdXJjZVxyXG59IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHtcclxuICBMYXllcixcclxuICBJbWFnZUxheWVyLFxyXG4gIEltYWdlTGF5ZXJPcHRpb25zLFxyXG4gIFRpbGVMYXllcixcclxuICBUaWxlTGF5ZXJPcHRpb25zLFxyXG4gIFZlY3RvckxheWVyLFxyXG4gIFZlY3RvckxheWVyT3B0aW9ucyxcclxuICBBbnlMYXllck9wdGlvbnMsXHJcbiAgVmVjdG9yVGlsZUxheWVyLFxyXG4gIFZlY3RvclRpbGVMYXllck9wdGlvbnNcclxufSBmcm9tICcuL2xheWVycyc7XHJcblxyXG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuL3N0eWxlLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5ZXJTZXJ2aWNlIHtcclxuICBwcml2YXRlIHRva2VuS2V5OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcclxuICAgIHByaXZhdGUgZGF0YVNvdXJjZVNlcnZpY2U6IERhdGFTb3VyY2VTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2VcclxuICApIHtcclxuICAgIGlmICh0aGlzLmNvbmZpZykge1xyXG4gICAgICB0aGlzLnRva2VuS2V5ID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdhdXRoLnRva2VuS2V5Jyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVMYXllcihsYXllck9wdGlvbnM6IEFueUxheWVyT3B0aW9ucyk6IExheWVyIHtcclxuICAgIGlmICghbGF5ZXJPcHRpb25zLnNvdXJjZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBsYXllck9wdGlvbnMuc291cmNlLm9wdGlvbnMgJiZcclxuICAgICAgbGF5ZXJPcHRpb25zLnNvdXJjZS5vcHRpb25zLm9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzXHJcbiAgICApIHtcclxuICAgICAgbGF5ZXJPcHRpb25zID0gT2JqZWN0VXRpbHMubWVyZ2VEZWVwKFxyXG4gICAgICAgIChsYXllck9wdGlvbnMuc291cmNlLm9wdGlvbnMgYXMgYW55KS5fbGF5ZXJPcHRpb25zRnJvbUNhcGFiaWxpdGllcyB8fCB7fSxcclxuICAgICAgICBsYXllck9wdGlvbnMgfHwge31cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbGF5ZXI7XHJcbiAgICBzd2l0Y2ggKGxheWVyT3B0aW9ucy5zb3VyY2UuY29uc3RydWN0b3IpIHtcclxuICAgICAgY2FzZSBPU01EYXRhU291cmNlOlxyXG4gICAgICBjYXNlIFdNVFNEYXRhU291cmNlOlxyXG4gICAgICBjYXNlIFhZWkRhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgQ2FydG9EYXRhU291cmNlOlxyXG4gICAgICBjYXNlIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZTpcclxuICAgICAgICBsYXllciA9IHRoaXMuY3JlYXRlVGlsZUxheWVyKGxheWVyT3B0aW9ucyBhcyBUaWxlTGF5ZXJPcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBGZWF0dXJlRGF0YVNvdXJjZTpcclxuICAgICAgY2FzZSBXRlNEYXRhU291cmNlOlxyXG4gICAgICBjYXNlIEFyY0dJU1Jlc3REYXRhU291cmNlOlxyXG4gICAgICBjYXNlIFdlYlNvY2tldERhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgQ2x1c3RlckRhdGFTb3VyY2U6XHJcbiAgICAgICAgbGF5ZXIgPSB0aGlzLmNyZWF0ZVZlY3RvckxheWVyKGxheWVyT3B0aW9ucyBhcyBWZWN0b3JMYXllck9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFdNU0RhdGFTb3VyY2U6XHJcbiAgICAgICAgbGF5ZXIgPSB0aGlzLmNyZWF0ZUltYWdlTGF5ZXIobGF5ZXJPcHRpb25zIGFzIEltYWdlTGF5ZXJPcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBNVlREYXRhU291cmNlOlxyXG4gICAgICAgIGxheWVyID0gdGhpcy5jcmVhdGVWZWN0b3JUaWxlTGF5ZXIobGF5ZXJPcHRpb25zIGFzIFZlY3RvclRpbGVMYXllck9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYXllcjtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUFzeW5jTGF5ZXIobGF5ZXJPcHRpb25zOiBBbnlMYXllck9wdGlvbnMpOiBPYnNlcnZhYmxlPExheWVyPiB7XHJcbiAgICBpZiAobGF5ZXJPcHRpb25zLnNvdXJjZSkge1xyXG4gICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQodGhpcy5jcmVhdGVMYXllcihsYXllck9wdGlvbnMpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZGF0YVNvdXJjZVNlcnZpY2VcclxuICAgICAgLmNyZWF0ZUFzeW5jRGF0YVNvdXJjZShsYXllck9wdGlvbnMuc291cmNlT3B0aW9ucylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKHNvdXJjZSA9PiB7XHJcbiAgICAgICAgICBsYXllck9wdGlvbnMuc291cmNlID0gc291cmNlO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTGF5ZXIobGF5ZXJPcHRpb25zKTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVJbWFnZUxheWVyKGxheWVyT3B0aW9uczogSW1hZ2VMYXllck9wdGlvbnMpOiBJbWFnZUxheWVyIHtcclxuICAgIGlmICh0aGlzLnRva2VuS2V5KSB7XHJcbiAgICAgIGxheWVyT3B0aW9ucy50b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMudG9rZW5LZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgSW1hZ2VMYXllcihsYXllck9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVUaWxlTGF5ZXIobGF5ZXJPcHRpb25zOiBUaWxlTGF5ZXJPcHRpb25zKTogVGlsZUxheWVyIHtcclxuICAgIHJldHVybiBuZXcgVGlsZUxheWVyKGxheWVyT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVZlY3RvckxheWVyKGxheWVyT3B0aW9uczogVmVjdG9yTGF5ZXJPcHRpb25zKTogVmVjdG9yTGF5ZXIge1xyXG4gICAgbGV0IHN0eWxlO1xyXG4gICAgaWYgKGxheWVyT3B0aW9ucy5zdHlsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN0eWxlID0gdGhpcy5zdHlsZVNlcnZpY2UuY3JlYXRlU3R5bGUobGF5ZXJPcHRpb25zLnN0eWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGF5ZXJPcHRpb25zLnNvdXJjZSBpbnN0YW5jZW9mIEFyY0dJU1Jlc3REYXRhU291cmNlKSB7XHJcbiAgICAgIGNvbnN0IHNvdXJjZSA9IGxheWVyT3B0aW9ucy5zb3VyY2UgYXMgQXJjR0lTUmVzdERhdGFTb3VyY2U7XHJcbiAgICAgIHN0eWxlID0gc291cmNlLm9wdGlvbnMucGFyYW1zLnN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXllck9wdGlvbnMuc291cmNlIGluc3RhbmNlb2YgQ2x1c3RlckRhdGFTb3VyY2UpIHtcclxuICAgICAgY29uc3Qgc2VydmljZVN0eWxlID0gdGhpcy5zdHlsZVNlcnZpY2U7XHJcbiAgICAgIGxheWVyT3B0aW9ucy5zdHlsZSA9IChmZWF0dXJlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VTdHlsZS5jcmVhdGVDbHVzdGVyU3R5bGUoZmVhdHVyZSwgbGF5ZXJPcHRpb25zLmNsdXN0ZXJQYXJhbSk7XHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiBuZXcgVmVjdG9yTGF5ZXIobGF5ZXJPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGF5ZXJPcHRpb25zLnN0eWxlQnlBdHRyaWJ1dGUpIHtcclxuICAgICAgY29uc3Qgc2VydmljZVN0eWxlID0gdGhpcy5zdHlsZVNlcnZpY2U7XHJcbiAgICAgIGxheWVyT3B0aW9ucy5zdHlsZSA9IChmZWF0dXJlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VTdHlsZS5jcmVhdGVTdHlsZUJ5QXR0cmlidXRlKGZlYXR1cmUsIGxheWVyT3B0aW9ucy5zdHlsZUJ5QXR0cmlidXRlKTtcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIG5ldyBWZWN0b3JMYXllcihsYXllck9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxheWVyT3B0aW9uc09sID0gT2JqZWN0LmFzc2lnbih7fSwgbGF5ZXJPcHRpb25zLCB7XHJcbiAgICAgIHN0eWxlXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvckxheWVyKGxheWVyT3B0aW9uc09sKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlVmVjdG9yVGlsZUxheWVyKGxheWVyT3B0aW9uczogVmVjdG9yVGlsZUxheWVyT3B0aW9ucyk6IFZlY3RvclRpbGVMYXllciB7XHJcbiAgICBsZXQgc3R5bGU7XHJcbiAgICBpZiAobGF5ZXJPcHRpb25zLnN0eWxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3R5bGUgPSB0aGlzLnN0eWxlU2VydmljZS5jcmVhdGVTdHlsZShsYXllck9wdGlvbnMuc3R5bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXllck9wdGlvbnMuc3R5bGVCeUF0dHJpYnV0ZSkge1xyXG4gICAgICBjb25zdCBzZXJ2aWNlU3R5bGUgPSB0aGlzLnN0eWxlU2VydmljZTtcclxuICAgICAgbGF5ZXJPcHRpb25zLnN0eWxlID0gKGZlYXR1cmUpID0+IHtcclxuICAgICAgICByZXR1cm4gc2VydmljZVN0eWxlLmNyZWF0ZVN0eWxlQnlBdHRyaWJ1dGUoZmVhdHVyZSwgbGF5ZXJPcHRpb25zLnN0eWxlQnlBdHRyaWJ1dGUpO1xyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gbmV3IFZlY3RvclRpbGVMYXllcihsYXllck9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxheWVyT3B0aW9uc09sID0gT2JqZWN0LmFzc2lnbih7fSwgbGF5ZXJPcHRpb25zLCB7XHJcbiAgICAgIHN0eWxlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yVGlsZUxheWVyKGxheWVyT3B0aW9uc09sKTtcclxuICB9XHJcbn1cclxuIl19