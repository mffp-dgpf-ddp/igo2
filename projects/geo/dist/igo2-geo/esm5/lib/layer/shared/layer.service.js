/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import stylefunction from 'ol-mapbox-style/stylefunction';
import { AuthInterceptor } from '@igo2/auth';
import { ObjectUtils } from '@igo2/utils';
import { OSMDataSource, FeatureDataSource, XYZDataSource, WFSDataSource, WMTSDataSource, WMSDataSource, CartoDataSource, ArcGISRestDataSource, TileArcGISRestDataSource, WebSocketDataSource, MVTDataSource, ClusterDataSource } from '../../datasource';
import { DataSourceService } from '../../datasource/shared/datasource.service';
import { ImageLayer, TileLayer, VectorLayer, VectorTileLayer } from './layers';
import { StyleService } from './style.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./style.service";
import * as i3 from "../../datasource/shared/datasource.service";
import * as i4 from "@igo2/auth";
var LayerService = /** @class */ (function () {
    function LayerService(http, styleService, dataSourceService, authInterceptor) {
        this.http = http;
        this.styleService = styleService;
        this.dataSourceService = dataSourceService;
        this.authInterceptor = authInterceptor;
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
            layerOptions = ObjectUtils.mergeDeep(((/** @type {?} */ (layerOptions.source.options)))._layerOptionsFromCapabilities ||
                {}, layerOptions || {});
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
            if (source === undefined) {
                return undefined;
            }
            return _this.createLayer(Object.assign(layerOptions, { source: source }));
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
        return new ImageLayer(layerOptions, this.authInterceptor);
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
        /** @type {?} */
        var olLayer;
        if (layerOptions.style !== undefined) {
            style = this.styleService.createStyle(layerOptions.style);
        }
        if (layerOptions.source instanceof ArcGISRestDataSource) {
            /** @type {?} */
            var source = (/** @type {?} */ (layerOptions.source));
            style = source.options.params.style;
        }
        else if (layerOptions.styleByAttribute) {
            /** @type {?} */
            var serviceStyle_1 = this.styleService;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            function (feature) {
                return serviceStyle_1.createStyleByAttribute(feature, layerOptions.styleByAttribute);
            });
            olLayer = new VectorLayer(layerOptions);
        }
        if (layerOptions.source instanceof ClusterDataSource) {
            /** @type {?} */
            var serviceStyle_2 = this.styleService;
            /** @type {?} */
            var baseStyle_1 = layerOptions.style;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            function (feature) {
                return serviceStyle_2.createClusterStyle(feature, layerOptions.clusterParam, baseStyle_1);
            });
            olLayer = new VectorLayer(layerOptions);
        }
        /** @type {?} */
        var layerOptionsOl = Object.assign({}, layerOptions, {
            style: style
        });
        if (!olLayer) {
            olLayer = new VectorLayer(layerOptionsOl);
        }
        this.applyMapboxStyle(olLayer, layerOptionsOl);
        return olLayer;
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
        /** @type {?} */
        var olLayer;
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
            olLayer = new VectorTileLayer(layerOptions);
        }
        /** @type {?} */
        var layerOptionsOl = Object.assign({}, layerOptions, {
            style: style
        });
        if (!olLayer) {
            olLayer = new VectorTileLayer(layerOptionsOl);
        }
        this.applyMapboxStyle(olLayer, layerOptionsOl);
        return olLayer;
    };
    /**
     * @private
     * @param {?} layer
     * @param {?} layerOptions
     * @return {?}
     */
    LayerService.prototype.applyMapboxStyle = /**
     * @private
     * @param {?} layer
     * @param {?} layerOptions
     * @return {?}
     */
    function (layer, layerOptions) {
        if (layerOptions.mapboxStyle) {
            this.getMapboxGlStyle(layerOptions.mapboxStyle.url).subscribe((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                stylefunction(layer.ol, res, layerOptions.mapboxStyle.source);
            }));
        }
    };
    /**
     * @param {?} url
     * @return {?}
     */
    LayerService.prototype.getMapboxGlStyle = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this.http.get(url).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })), catchError((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            console.log('No style was found');
            return of(err);
        })));
    };
    LayerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    LayerService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: StyleService },
        { type: DataSourceService },
        { type: AuthInterceptor, decorators: [{ type: Optional }] }
    ]; };
    /** @nocollapse */ LayerService.ngInjectableDef = i0.defineInjectable({ factory: function LayerService_Factory() { return new LayerService(i0.inject(i1.HttpClient), i0.inject(i2.StyleService), i0.inject(i3.DataSourceService), i0.inject(i4.AuthInterceptor, 8)); }, token: LayerService, providedIn: "root" });
    return LayerService;
}());
export { LayerService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LayerService.prototype.http;
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
    LayerService.prototype.authInterceptor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvbGF5ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sK0JBQStCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTFDLE9BQU8sRUFDTCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixhQUFhLEVBQ2IsY0FBYyxFQUNkLGFBQWEsRUFDYixlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3BCLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLGlCQUFpQixFQUNsQixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRS9FLE9BQU8sRUFFTCxVQUFVLEVBRVYsU0FBUyxFQUVULFdBQVcsRUFHWCxlQUFlLEVBRWhCLE1BQU0sVUFBVSxDQUFDO0FBRWxCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7O0FBRS9DO0lBSUUsc0JBQ1UsSUFBZ0IsRUFDaEIsWUFBMEIsRUFDMUIsaUJBQW9DLEVBQ3hCLGVBQWdDO1FBSDVDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUN4QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDbkQsQ0FBQzs7Ozs7SUFFSixrQ0FBVzs7OztJQUFYLFVBQVksWUFBNkI7UUFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDeEIsT0FBTztTQUNSO1FBRUQsSUFDRSxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU87WUFDM0IsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQ25EO1lBQ0EsWUFBWSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQ2xDLENBQUMsbUJBQUEsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLDZCQUE2QjtnQkFDaEUsRUFBRSxFQUNKLFlBQVksSUFBSSxFQUFFLENBQ25CLENBQUM7U0FDSDs7WUFFRyxLQUFLO1FBQ1QsUUFBUSxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtZQUN2QyxLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFLLGNBQWMsQ0FBQztZQUNwQixLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFLLGVBQWUsQ0FBQztZQUNyQixLQUFLLHdCQUF3QjtnQkFDM0IsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQUEsWUFBWSxFQUFvQixDQUFDLENBQUM7Z0JBQy9ELE1BQU07WUFDUixLQUFLLGlCQUFpQixDQUFDO1lBQ3ZCLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssb0JBQW9CLENBQUM7WUFDMUIsS0FBSyxtQkFBbUIsQ0FBQztZQUN6QixLQUFLLGlCQUFpQjtnQkFDcEIsS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBQSxZQUFZLEVBQXNCLENBQUMsQ0FBQztnQkFDbkUsTUFBTTtZQUNSLEtBQUssYUFBYTtnQkFDaEIsS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBQSxZQUFZLEVBQXFCLENBQUMsQ0FBQztnQkFDakUsTUFBTTtZQUNSLEtBQUssYUFBYTtnQkFDaEIsS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FDaEMsbUJBQUEsWUFBWSxFQUEwQixDQUN2QyxDQUFDO2dCQUNGLE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7O0lBRUQsdUNBQWdCOzs7O0lBQWhCLFVBQWlCLFlBQTZCO1FBQTlDLGlCQWVDO1FBZEMsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLE9BQU8sSUFBSSxVQUFVOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBdEMsQ0FBc0MsRUFBQyxDQUFDO1NBQ3BFO1FBRUQsT0FBTyxJQUFJLENBQUMsaUJBQWlCO2FBQzFCLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7YUFDakQsSUFBSSxDQUNILEdBQUc7Ozs7UUFBQyxVQUFBLE1BQU07WUFDUixJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQ3hCLE9BQU8sU0FBUyxDQUFDO2FBQ2xCO1lBQ0QsT0FBTyxLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkUsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7Ozs7OztJQUVPLHVDQUFnQjs7Ozs7SUFBeEIsVUFBeUIsWUFBK0I7UUFDdEQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzVELENBQUM7Ozs7OztJQUVPLHNDQUFlOzs7OztJQUF2QixVQUF3QixZQUE4QjtRQUNwRCxPQUFPLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7OztJQUVPLHdDQUFpQjs7Ozs7SUFBekIsVUFBMEIsWUFBZ0M7O1lBQ3BELEtBQUs7O1lBQ0wsT0FBTztRQUNYLElBQUksWUFBWSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDcEMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzRDtRQUVELElBQUksWUFBWSxDQUFDLE1BQU0sWUFBWSxvQkFBb0IsRUFBRTs7Z0JBQ2pELE1BQU0sR0FBRyxtQkFBQSxZQUFZLENBQUMsTUFBTSxFQUF3QjtZQUMxRCxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ3JDO2FBQU0sSUFBSSxZQUFZLENBQUMsZ0JBQWdCLEVBQUU7O2dCQUNsQyxjQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVk7WUFDdEMsWUFBWSxDQUFDLEtBQUs7Ozs7WUFBRyxVQUFBLE9BQU87Z0JBQzFCLE9BQU8sY0FBWSxDQUFDLHNCQUFzQixDQUN4QyxPQUFPLEVBQ1AsWUFBWSxDQUFDLGdCQUFnQixDQUM5QixDQUFDO1lBQ0osQ0FBQyxDQUFBLENBQUM7WUFDRixPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDekM7UUFFRCxJQUFJLFlBQVksQ0FBQyxNQUFNLFlBQVksaUJBQWlCLEVBQUU7O2dCQUM5QyxjQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVk7O2dCQUNoQyxXQUFTLEdBQUcsWUFBWSxDQUFDLEtBQUs7WUFDcEMsWUFBWSxDQUFDLEtBQUs7Ozs7WUFBRyxVQUFBLE9BQU87Z0JBQzFCLE9BQU8sY0FBWSxDQUFDLGtCQUFrQixDQUNwQyxPQUFPLEVBQ1AsWUFBWSxDQUFDLFlBQVksRUFDekIsV0FBUyxDQUNWLENBQUM7WUFDSixDQUFDLENBQUEsQ0FBQztZQUNGLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN6Qzs7WUFFSyxjQUFjLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFO1lBQ3JELEtBQUssT0FBQTtTQUNOLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzNDO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztRQUUvQyxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFTyw0Q0FBcUI7Ozs7O0lBQTdCLFVBQ0UsWUFBb0M7O1lBRWhDLEtBQUs7O1lBQ0wsT0FBTztRQUVYLElBQUksWUFBWSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDcEMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzRDtRQUVELElBQUksWUFBWSxDQUFDLGdCQUFnQixFQUFFOztnQkFDM0IsY0FBWSxHQUFHLElBQUksQ0FBQyxZQUFZO1lBQ3RDLFlBQVksQ0FBQyxLQUFLOzs7O1lBQUcsVUFBQSxPQUFPO2dCQUMxQixPQUFPLGNBQVksQ0FBQyxzQkFBc0IsQ0FDeEMsT0FBTyxFQUNQLFlBQVksQ0FBQyxnQkFBZ0IsQ0FDOUIsQ0FBQztZQUNKLENBQUMsQ0FBQSxDQUFDO1lBQ0YsT0FBTyxHQUFHLElBQUksZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzdDOztZQUVLLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUU7WUFDckQsS0FBSyxPQUFBO1NBQ04sQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDL0M7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7SUFFTyx1Q0FBZ0I7Ozs7OztJQUF4QixVQUF5QixLQUFZLEVBQUUsWUFBb0M7UUFDekUsSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFO1lBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLEdBQUc7Z0JBQy9ELGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hFLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7OztJQUVNLHVDQUFnQjs7OztJQUF2QixVQUF3QixHQUFXO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUM1QixHQUFHOzs7O1FBQUMsVUFBQyxHQUFRLElBQUssT0FBQSxHQUFHLEVBQUgsQ0FBRyxFQUFDLEVBQ3RCLFVBQVU7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDbEMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7O2dCQW5MRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQXpDUSxVQUFVO2dCQXFDVixZQUFZO2dCQWZaLGlCQUFpQjtnQkFsQmpCLGVBQWUsdUJBMkNuQixRQUFROzs7dUJBaERiO0NBNE5DLEFBcExELElBb0xDO1NBakxZLFlBQVk7Ozs7OztJQUVyQiw0QkFBd0I7Ozs7O0lBQ3hCLG9DQUFrQzs7Ozs7SUFDbEMseUNBQTRDOzs7OztJQUM1Qyx1Q0FBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgc3R5bGVmdW5jdGlvbiBmcm9tICdvbC1tYXBib3gtc3R5bGUvc3R5bGVmdW5jdGlvbic7XHJcbmltcG9ydCB7IEF1dGhJbnRlcmNlcHRvciB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgT1NNRGF0YVNvdXJjZSxcclxuICBGZWF0dXJlRGF0YVNvdXJjZSxcclxuICBYWVpEYXRhU291cmNlLFxyXG4gIFdGU0RhdGFTb3VyY2UsXHJcbiAgV01UU0RhdGFTb3VyY2UsXHJcbiAgV01TRGF0YVNvdXJjZSxcclxuICBDYXJ0b0RhdGFTb3VyY2UsXHJcbiAgQXJjR0lTUmVzdERhdGFTb3VyY2UsXHJcbiAgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlLFxyXG4gIFdlYlNvY2tldERhdGFTb3VyY2UsXHJcbiAgTVZURGF0YVNvdXJjZSxcclxuICBDbHVzdGVyRGF0YVNvdXJjZVxyXG59IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHtcclxuICBMYXllcixcclxuICBJbWFnZUxheWVyLFxyXG4gIEltYWdlTGF5ZXJPcHRpb25zLFxyXG4gIFRpbGVMYXllcixcclxuICBUaWxlTGF5ZXJPcHRpb25zLFxyXG4gIFZlY3RvckxheWVyLFxyXG4gIFZlY3RvckxheWVyT3B0aW9ucyxcclxuICBBbnlMYXllck9wdGlvbnMsXHJcbiAgVmVjdG9yVGlsZUxheWVyLFxyXG4gIFZlY3RvclRpbGVMYXllck9wdGlvbnNcclxufSBmcm9tICcuL2xheWVycyc7XHJcblxyXG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuL3N0eWxlLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5ZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGRhdGFTb3VyY2VTZXJ2aWNlOiBEYXRhU291cmNlU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgYXV0aEludGVyY2VwdG9yOiBBdXRoSW50ZXJjZXB0b3JcclxuICApIHt9XHJcblxyXG4gIGNyZWF0ZUxheWVyKGxheWVyT3B0aW9uczogQW55TGF5ZXJPcHRpb25zKTogTGF5ZXIge1xyXG4gICAgaWYgKCFsYXllck9wdGlvbnMuc291cmNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIGxheWVyT3B0aW9ucy5zb3VyY2Uub3B0aW9ucyAmJlxyXG4gICAgICBsYXllck9wdGlvbnMuc291cmNlLm9wdGlvbnMub3B0aW9uc0Zyb21DYXBhYmlsaXRpZXNcclxuICAgICkge1xyXG4gICAgICBsYXllck9wdGlvbnMgPSBPYmplY3RVdGlscy5tZXJnZURlZXAoXHJcbiAgICAgICAgKGxheWVyT3B0aW9ucy5zb3VyY2Uub3B0aW9ucyBhcyBhbnkpLl9sYXllck9wdGlvbnNGcm9tQ2FwYWJpbGl0aWVzIHx8XHJcbiAgICAgICAgICB7fSxcclxuICAgICAgICBsYXllck9wdGlvbnMgfHwge31cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbGF5ZXI7XHJcbiAgICBzd2l0Y2ggKGxheWVyT3B0aW9ucy5zb3VyY2UuY29uc3RydWN0b3IpIHtcclxuICAgICAgY2FzZSBPU01EYXRhU291cmNlOlxyXG4gICAgICBjYXNlIFdNVFNEYXRhU291cmNlOlxyXG4gICAgICBjYXNlIFhZWkRhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgQ2FydG9EYXRhU291cmNlOlxyXG4gICAgICBjYXNlIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZTpcclxuICAgICAgICBsYXllciA9IHRoaXMuY3JlYXRlVGlsZUxheWVyKGxheWVyT3B0aW9ucyBhcyBUaWxlTGF5ZXJPcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBGZWF0dXJlRGF0YVNvdXJjZTpcclxuICAgICAgY2FzZSBXRlNEYXRhU291cmNlOlxyXG4gICAgICBjYXNlIEFyY0dJU1Jlc3REYXRhU291cmNlOlxyXG4gICAgICBjYXNlIFdlYlNvY2tldERhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgQ2x1c3RlckRhdGFTb3VyY2U6XHJcbiAgICAgICAgbGF5ZXIgPSB0aGlzLmNyZWF0ZVZlY3RvckxheWVyKGxheWVyT3B0aW9ucyBhcyBWZWN0b3JMYXllck9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFdNU0RhdGFTb3VyY2U6XHJcbiAgICAgICAgbGF5ZXIgPSB0aGlzLmNyZWF0ZUltYWdlTGF5ZXIobGF5ZXJPcHRpb25zIGFzIEltYWdlTGF5ZXJPcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBNVlREYXRhU291cmNlOlxyXG4gICAgICAgIGxheWVyID0gdGhpcy5jcmVhdGVWZWN0b3JUaWxlTGF5ZXIoXHJcbiAgICAgICAgICBsYXllck9wdGlvbnMgYXMgVmVjdG9yVGlsZUxheWVyT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxheWVyO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlQXN5bmNMYXllcihsYXllck9wdGlvbnM6IEFueUxheWVyT3B0aW9ucyk6IE9ic2VydmFibGU8TGF5ZXI+IHtcclxuICAgIGlmIChsYXllck9wdGlvbnMuc291cmNlKSB7XHJcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IGQubmV4dCh0aGlzLmNyZWF0ZUxheWVyKGxheWVyT3B0aW9ucykpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5kYXRhU291cmNlU2VydmljZVxyXG4gICAgICAuY3JlYXRlQXN5bmNEYXRhU291cmNlKGxheWVyT3B0aW9ucy5zb3VyY2VPcHRpb25zKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoc291cmNlID0+IHtcclxuICAgICAgICAgIGlmIChzb3VyY2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTGF5ZXIoT2JqZWN0LmFzc2lnbihsYXllck9wdGlvbnMsIHsgc291cmNlIH0pKTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVJbWFnZUxheWVyKGxheWVyT3B0aW9uczogSW1hZ2VMYXllck9wdGlvbnMpOiBJbWFnZUxheWVyIHtcclxuICAgIHJldHVybiBuZXcgSW1hZ2VMYXllcihsYXllck9wdGlvbnMsIHRoaXMuYXV0aEludGVyY2VwdG9yKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlVGlsZUxheWVyKGxheWVyT3B0aW9uczogVGlsZUxheWVyT3B0aW9ucyk6IFRpbGVMYXllciB7XHJcbiAgICByZXR1cm4gbmV3IFRpbGVMYXllcihsYXllck9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVWZWN0b3JMYXllcihsYXllck9wdGlvbnM6IFZlY3RvckxheWVyT3B0aW9ucyk6IFZlY3RvckxheWVyIHtcclxuICAgIGxldCBzdHlsZTtcclxuICAgIGxldCBvbExheWVyO1xyXG4gICAgaWYgKGxheWVyT3B0aW9ucy5zdHlsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN0eWxlID0gdGhpcy5zdHlsZVNlcnZpY2UuY3JlYXRlU3R5bGUobGF5ZXJPcHRpb25zLnN0eWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGF5ZXJPcHRpb25zLnNvdXJjZSBpbnN0YW5jZW9mIEFyY0dJU1Jlc3REYXRhU291cmNlKSB7XHJcbiAgICAgIGNvbnN0IHNvdXJjZSA9IGxheWVyT3B0aW9ucy5zb3VyY2UgYXMgQXJjR0lTUmVzdERhdGFTb3VyY2U7XHJcbiAgICAgIHN0eWxlID0gc291cmNlLm9wdGlvbnMucGFyYW1zLnN0eWxlO1xyXG4gICAgfSBlbHNlIGlmIChsYXllck9wdGlvbnMuc3R5bGVCeUF0dHJpYnV0ZSkge1xyXG4gICAgICBjb25zdCBzZXJ2aWNlU3R5bGUgPSB0aGlzLnN0eWxlU2VydmljZTtcclxuICAgICAgbGF5ZXJPcHRpb25zLnN0eWxlID0gZmVhdHVyZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VTdHlsZS5jcmVhdGVTdHlsZUJ5QXR0cmlidXRlKFxyXG4gICAgICAgICAgZmVhdHVyZSxcclxuICAgICAgICAgIGxheWVyT3B0aW9ucy5zdHlsZUJ5QXR0cmlidXRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfTtcclxuICAgICAgb2xMYXllciA9IG5ldyBWZWN0b3JMYXllcihsYXllck9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXllck9wdGlvbnMuc291cmNlIGluc3RhbmNlb2YgQ2x1c3RlckRhdGFTb3VyY2UpIHtcclxuICAgICAgY29uc3Qgc2VydmljZVN0eWxlID0gdGhpcy5zdHlsZVNlcnZpY2U7XHJcbiAgICAgIGNvbnN0IGJhc2VTdHlsZSA9IGxheWVyT3B0aW9ucy5zdHlsZTtcclxuICAgICAgbGF5ZXJPcHRpb25zLnN0eWxlID0gZmVhdHVyZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VTdHlsZS5jcmVhdGVDbHVzdGVyU3R5bGUoXHJcbiAgICAgICAgICBmZWF0dXJlLFxyXG4gICAgICAgICAgbGF5ZXJPcHRpb25zLmNsdXN0ZXJQYXJhbSxcclxuICAgICAgICAgIGJhc2VTdHlsZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH07XHJcbiAgICAgIG9sTGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIobGF5ZXJPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsYXllck9wdGlvbnNPbCA9IE9iamVjdC5hc3NpZ24oe30sIGxheWVyT3B0aW9ucywge1xyXG4gICAgICBzdHlsZVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFvbExheWVyKSB7XHJcbiAgICAgIG9sTGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIobGF5ZXJPcHRpb25zT2wpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXBwbHlNYXBib3hTdHlsZShvbExheWVyLCBsYXllck9wdGlvbnNPbCk7XHJcblxyXG4gICAgcmV0dXJuIG9sTGF5ZXI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVZlY3RvclRpbGVMYXllcihcclxuICAgIGxheWVyT3B0aW9uczogVmVjdG9yVGlsZUxheWVyT3B0aW9uc1xyXG4gICk6IFZlY3RvclRpbGVMYXllciB7XHJcbiAgICBsZXQgc3R5bGU7XHJcbiAgICBsZXQgb2xMYXllcjtcclxuXHJcbiAgICBpZiAobGF5ZXJPcHRpb25zLnN0eWxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3R5bGUgPSB0aGlzLnN0eWxlU2VydmljZS5jcmVhdGVTdHlsZShsYXllck9wdGlvbnMuc3R5bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXllck9wdGlvbnMuc3R5bGVCeUF0dHJpYnV0ZSkge1xyXG4gICAgICBjb25zdCBzZXJ2aWNlU3R5bGUgPSB0aGlzLnN0eWxlU2VydmljZTtcclxuICAgICAgbGF5ZXJPcHRpb25zLnN0eWxlID0gZmVhdHVyZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VTdHlsZS5jcmVhdGVTdHlsZUJ5QXR0cmlidXRlKFxyXG4gICAgICAgICAgZmVhdHVyZSxcclxuICAgICAgICAgIGxheWVyT3B0aW9ucy5zdHlsZUJ5QXR0cmlidXRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfTtcclxuICAgICAgb2xMYXllciA9IG5ldyBWZWN0b3JUaWxlTGF5ZXIobGF5ZXJPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsYXllck9wdGlvbnNPbCA9IE9iamVjdC5hc3NpZ24oe30sIGxheWVyT3B0aW9ucywge1xyXG4gICAgICBzdHlsZVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFvbExheWVyKSB7XHJcbiAgICAgIG9sTGF5ZXIgPSBuZXcgVmVjdG9yVGlsZUxheWVyKGxheWVyT3B0aW9uc09sKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFwcGx5TWFwYm94U3R5bGUob2xMYXllciwgbGF5ZXJPcHRpb25zT2wpO1xyXG4gICAgcmV0dXJuIG9sTGF5ZXI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5TWFwYm94U3R5bGUobGF5ZXI6IExheWVyLCBsYXllck9wdGlvbnM6IFZlY3RvclRpbGVMYXllck9wdGlvbnMpIHtcclxuICAgIGlmIChsYXllck9wdGlvbnMubWFwYm94U3R5bGUpIHtcclxuICAgICAgdGhpcy5nZXRNYXBib3hHbFN0eWxlKGxheWVyT3B0aW9ucy5tYXBib3hTdHlsZS51cmwpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgIHN0eWxlZnVuY3Rpb24obGF5ZXIub2wsIHJlcywgbGF5ZXJPcHRpb25zLm1hcGJveFN0eWxlLnNvdXJjZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE1hcGJveEdsU3R5bGUodXJsOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCkucGlwZShcclxuICAgICAgbWFwKChyZXM6IGFueSkgPT4gcmVzKSxcclxuICAgICAgY2F0Y2hFcnJvcihlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdObyBzdHlsZSB3YXMgZm91bmQnKTtcclxuICAgICAgICByZXR1cm4gb2YoZXJyKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==