/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import olProjection from 'ol/proj/Projection';
import { MessageService, LanguageService } from '@igo2/core';
import { OgcFilterWriter } from '../../filter/shared';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
export class DownloadService {
    /**
     * @param {?} messageService
     * @param {?} languageService
     */
    constructor(messageService, languageService) {
        this.messageService = messageService;
        this.languageService = languageService;
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    open(layer) {
        /** @type {?} */
        const translate = this.languageService.translate;
        /** @type {?} */
        const title = translate.instant('igo.geo.download.title');
        this.messageService.success(translate.instant('igo.geo.download.start'), title);
        /** @type {?} */
        const DSOptions = layer.dataSource.options;
        if (Object.keys(DSOptions.download).length > 0) {
            if (DSOptions.download.dynamicUrl &&
                DSOptions.download.url === undefined) {
                /** @type {?} */
                let wfsOptions;
                if (((/** @type {?} */ (layer.dataSource.options))).paramsWFS &&
                    Object.keys(((/** @type {?} */ (layer.dataSource.options))).paramsWFS).length > 0) {
                    wfsOptions = ((/** @type {?} */ (layer.dataSource.options))).paramsWFS;
                }
                else {
                    wfsOptions = ((/** @type {?} */ (layer.dataSource.options))).params;
                }
                /** @type {?} */
                const outputFormatDownload = wfsOptions.outputFormatDownload === undefined
                    ? 'outputformat=' + wfsOptions.outputFormat
                    : 'outputformat=' + wfsOptions.outputFormatDownload;
                /** @type {?} */
                const baseurl = DSOptions.download.dynamicUrl
                    .replace(/&?outputformat=[^&]*/gi, '')
                    .replace(/&?filter=[^&]*/gi, '')
                    .replace(/&?bbox=[^&]*/gi, '');
                /** @type {?} */
                const ogcFilters = ((/** @type {?} */ (layer.dataSource.options))).ogcFilters;
                /** @type {?} */
                let filterQueryString;
                filterQueryString = new OgcFilterWriter()
                    .handleOgcFiltersAppliedValue(layer.dataSource.options, ogcFilters.geometryName, layer.map.viewController.getExtent(), new olProjection({ code: layer.map.projection }));
                if (!filterQueryString) {
                    // Prevent getting all the features for empty filter
                    filterQueryString = new OgcFilterWriter().buildFilter(undefined, layer.map.viewController.getExtent(), new olProjection({ code: layer.map.projection }), ogcFilters.geometryName);
                }
                else {
                    filterQueryString = 'filter=' + encodeURIComponent(filterQueryString);
                }
                window.open(`${baseurl}&${filterQueryString}&${outputFormatDownload}`, '_blank');
            }
            else if (DSOptions.download) {
                window.open(DSOptions.download.url, '_blank');
            }
        }
    }
}
DownloadService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DownloadService.ctorParameters = () => [
    { type: MessageService },
    { type: LanguageService }
];
/** @nocollapse */ DownloadService.ngInjectableDef = i0.defineInjectable({ factory: function DownloadService_Factory() { return new DownloadService(i0.inject(i1.MessageService), i0.inject(i1.LanguageService)); }, token: DownloadService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    DownloadService.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    DownloadService.prototype.languageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kb3dubG9hZC9zaGFyZWQvZG93bmxvYWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUc3RCxPQUFPLEVBQUUsZUFBZSxFQUFrQyxNQUFNLHFCQUFxQixDQUFDOzs7QUFPdEYsTUFBTSxPQUFPLGVBQWU7Ozs7O0lBRTFCLFlBQ1UsY0FBOEIsRUFDOUIsZUFBZ0M7UUFEaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUN2QyxDQUFDOzs7OztJQUVKLElBQUksQ0FBQyxLQUFZOztjQUNULFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVM7O2NBQzFDLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUN6QixTQUFTLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLEVBQzNDLEtBQUssQ0FDTixDQUFDOztjQUVJLFNBQVMsR0FBc0IsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPO1FBQzdELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM5QyxJQUNFLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVTtnQkFDN0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUNwQzs7b0JBQ0ksVUFBVTtnQkFDZCxJQUNFLENBQUMsbUJBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFNBQVM7b0JBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQkFBQSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDbkU7b0JBQ0EsVUFBVSxHQUFHLENBQUMsbUJBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFDMUQ7cUJBQU07b0JBQ0wsVUFBVSxHQUFHLENBQUMsbUJBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztpQkFDdkQ7O3NCQUVLLG9CQUFvQixHQUN4QixVQUFVLENBQUMsb0JBQW9CLEtBQUssU0FBUztvQkFDM0MsQ0FBQyxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsWUFBWTtvQkFDM0MsQ0FBQyxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsb0JBQW9COztzQkFFakQsT0FBTyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVTtxQkFDMUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQztxQkFDckMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQztxQkFDL0IsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQzs7c0JBRTFCLFVBQVUsR0FBRyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFrQyxDQUFDLENBQUMsVUFBVTs7b0JBRXRGLGlCQUFpQjtnQkFDckIsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLEVBQUU7cUJBQ3hDLDRCQUE0QixDQUMzQixLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFDeEIsVUFBVSxDQUFDLFlBQVksRUFDdkIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLEVBQ3BDLElBQUksWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsaUJBQWlCLEVBQUU7b0JBQ3RCLG9EQUFvRDtvQkFDbEQsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQyxXQUFXLENBQ3JELFNBQVMsRUFDVCxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsRUFDcEMsSUFBSSxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUNoRCxVQUFVLENBQUMsWUFBWSxDQUN4QixDQUFDO2lCQUNIO3FCQUFNO29CQUNMLGlCQUFpQixHQUFHLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUN2RTtnQkFDRCxNQUFNLENBQUMsSUFBSSxDQUNULEdBQUcsT0FBTyxJQUFJLGlCQUFpQixJQUFJLG9CQUFvQixFQUFFLEVBQ3pELFFBQVEsQ0FDVCxDQUFDO2FBQ0g7aUJBQU0sSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFO2dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQy9DO1NBQ0Y7SUFDSCxDQUFDOzs7WUF4RUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBVFEsY0FBYztZQUFFLGVBQWU7Ozs7Ozs7O0lBYXBDLHlDQUFzQzs7Ozs7SUFDdEMsMENBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IG9sUHJvamVjdGlvbiBmcm9tICdvbC9wcm9qL1Byb2plY3Rpb24nO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIsIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ZpbHRlci9zaGFyZWQnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEb3dubG9hZFNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgb3BlbihsYXllcjogTGF5ZXIpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZG93bmxvYWQudGl0bGUnKTtcclxuICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhcclxuICAgICAgdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZG93bmxvYWQuc3RhcnQnKSxcclxuICAgICAgdGl0bGVcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgRFNPcHRpb25zOiBEYXRhU291cmNlT3B0aW9ucyA9IGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucztcclxuICAgIGlmIChPYmplY3Qua2V5cyhEU09wdGlvbnMuZG93bmxvYWQpLmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIERTT3B0aW9ucy5kb3dubG9hZC5keW5hbWljVXJsICYmXHJcbiAgICAgICAgRFNPcHRpb25zLmRvd25sb2FkLnVybCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICkge1xyXG4gICAgICAgIGxldCB3ZnNPcHRpb25zO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIChsYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55KS5wYXJhbXNXRlMgJiZcclxuICAgICAgICAgIE9iamVjdC5rZXlzKChsYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55KS5wYXJhbXNXRlMpLmxlbmd0aCA+IDBcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHdmc09wdGlvbnMgPSAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3ZnNPcHRpb25zID0gKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnBhcmFtcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG91dHB1dEZvcm1hdERvd25sb2FkID1cclxuICAgICAgICAgIHdmc09wdGlvbnMub3V0cHV0Rm9ybWF0RG93bmxvYWQgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA/ICdvdXRwdXRmb3JtYXQ9JyArIHdmc09wdGlvbnMub3V0cHV0Rm9ybWF0XHJcbiAgICAgICAgICAgIDogJ291dHB1dGZvcm1hdD0nICsgd2ZzT3B0aW9ucy5vdXRwdXRGb3JtYXREb3dubG9hZDtcclxuXHJcbiAgICAgICAgY29uc3QgYmFzZXVybCA9IERTT3B0aW9ucy5kb3dubG9hZC5keW5hbWljVXJsXHJcbiAgICAgICAgICAucmVwbGFjZSgvJj9vdXRwdXRmb3JtYXQ9W14mXSovZ2ksICcnKVxyXG4gICAgICAgICAgLnJlcGxhY2UoLyY/ZmlsdGVyPVteJl0qL2dpLCAnJylcclxuICAgICAgICAgIC5yZXBsYWNlKC8mP2Jib3g9W14mXSovZ2ksICcnKTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2djRmlsdGVycyA9IChsYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzO1xyXG5cclxuICAgICAgICBsZXQgZmlsdGVyUXVlcnlTdHJpbmc7XHJcbiAgICAgICAgZmlsdGVyUXVlcnlTdHJpbmcgPSBuZXcgT2djRmlsdGVyV3JpdGVyKClcclxuICAgICAgICAuaGFuZGxlT2djRmlsdGVyc0FwcGxpZWRWYWx1ZShcclxuICAgICAgICAgIGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyxcclxuICAgICAgICAgIG9nY0ZpbHRlcnMuZ2VvbWV0cnlOYW1lLFxyXG4gICAgICAgICAgbGF5ZXIubWFwLnZpZXdDb250cm9sbGVyLmdldEV4dGVudCgpLFxyXG4gICAgICAgICAgbmV3IG9sUHJvamVjdGlvbih7IGNvZGU6IGxheWVyLm1hcC5wcm9qZWN0aW9uIH0pKTtcclxuICAgICAgICBpZiAoIWZpbHRlclF1ZXJ5U3RyaW5nKSB7XHJcbiAgICAgICAgICAvLyBQcmV2ZW50IGdldHRpbmcgYWxsIHRoZSBmZWF0dXJlcyBmb3IgZW1wdHkgZmlsdGVyXHJcbiAgICAgICAgICAgIGZpbHRlclF1ZXJ5U3RyaW5nID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpLmJ1aWxkRmlsdGVyKFxyXG4gICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGxheWVyLm1hcC52aWV3Q29udHJvbGxlci5nZXRFeHRlbnQoKSxcclxuICAgICAgICAgICAgbmV3IG9sUHJvamVjdGlvbih7IGNvZGU6IGxheWVyLm1hcC5wcm9qZWN0aW9uIH0pLFxyXG4gICAgICAgICAgICBvZ2NGaWx0ZXJzLmdlb21ldHJ5TmFtZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZmlsdGVyUXVlcnlTdHJpbmcgPSAnZmlsdGVyPScgKyBlbmNvZGVVUklDb21wb25lbnQoZmlsdGVyUXVlcnlTdHJpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cub3BlbihcclxuICAgICAgICAgIGAke2Jhc2V1cmx9JiR7ZmlsdGVyUXVlcnlTdHJpbmd9JiR7b3V0cHV0Rm9ybWF0RG93bmxvYWR9YCxcclxuICAgICAgICAgICdfYmxhbmsnXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIGlmIChEU09wdGlvbnMuZG93bmxvYWQpIHtcclxuICAgICAgICB3aW5kb3cub3BlbihEU09wdGlvbnMuZG93bmxvYWQudXJsLCAnX2JsYW5rJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19