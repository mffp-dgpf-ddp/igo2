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
var DownloadService = /** @class */ (function () {
    function DownloadService(messageService, languageService) {
        this.messageService = messageService;
        this.languageService = languageService;
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    DownloadService.prototype.open = /**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var translate = this.languageService.translate;
        /** @type {?} */
        var title = translate.instant('igo.geo.download.title');
        this.messageService.success(translate.instant('igo.geo.download.start'), title);
        /** @type {?} */
        var DSOptions = layer.dataSource.options;
        if (Object.keys(DSOptions.download).length > 0) {
            if (DSOptions.download.dynamicUrl &&
                DSOptions.download.url === undefined) {
                /** @type {?} */
                var wfsOptions = void 0;
                if (((/** @type {?} */ (layer.dataSource.options))).paramsWFS &&
                    Object.keys(((/** @type {?} */ (layer.dataSource.options))).paramsWFS).length > 0) {
                    wfsOptions = ((/** @type {?} */ (layer.dataSource.options))).paramsWFS;
                }
                else {
                    wfsOptions = ((/** @type {?} */ (layer.dataSource.options))).params;
                }
                /** @type {?} */
                var outputFormatDownload = wfsOptions.outputFormatDownload === undefined
                    ? 'outputformat=' + wfsOptions.outputFormat
                    : 'outputformat=' + wfsOptions.outputFormatDownload;
                /** @type {?} */
                var baseurl = DSOptions.download.dynamicUrl
                    .replace(/&?outputformat=[^&]*/gi, '')
                    .replace(/&?filter=[^&]*/gi, '')
                    .replace(/&?bbox=[^&]*/gi, '');
                /** @type {?} */
                var ogcFilters = ((/** @type {?} */ (layer.dataSource.options))).ogcFilters;
                /** @type {?} */
                var filterQueryString = void 0;
                filterQueryString = new OgcFilterWriter()
                    .handleOgcFiltersAppliedValue(layer.dataSource.options, ogcFilters.geometryName);
                if (!filterQueryString) {
                    // Prevent getting all the features for empty filter
                    filterQueryString = new OgcFilterWriter().buildFilter(undefined, layer.map.getExtent(), new olProjection({ code: layer.map.projection }), ogcFilters.geometryName);
                }
                else {
                    filterQueryString = 'filter=' + filterQueryString;
                }
                window.open(baseurl + "&" + filterQueryString + "&" + outputFormatDownload, '_blank');
            }
            else if (DSOptions.download) {
                window.open(DSOptions.download.url, '_blank');
            }
        }
    };
    DownloadService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DownloadService.ctorParameters = function () { return [
        { type: MessageService },
        { type: LanguageService }
    ]; };
    /** @nocollapse */ DownloadService.ngInjectableDef = i0.defineInjectable({ factory: function DownloadService_Factory() { return new DownloadService(i0.inject(i1.MessageService), i0.inject(i1.LanguageService)); }, token: DownloadService, providedIn: "root" });
    return DownloadService;
}());
export { DownloadService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kb3dubG9hZC9zaGFyZWQvZG93bmxvYWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUc3RCxPQUFPLEVBQUUsZUFBZSxFQUFrQyxNQUFNLHFCQUFxQixDQUFDOzs7QUFJdEY7SUFLRSx5QkFDVSxjQUE4QixFQUM5QixlQUFnQztRQURoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ3ZDLENBQUM7Ozs7O0lBRUosOEJBQUk7Ozs7SUFBSixVQUFLLEtBQVk7O1lBQ1QsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUzs7WUFDMUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQ3pCLFNBQVMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsRUFDM0MsS0FBSyxDQUNOLENBQUM7O1lBRUksU0FBUyxHQUFzQixLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU87UUFDN0QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlDLElBQ0UsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVO2dCQUM3QixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQ3BDOztvQkFDSSxVQUFVLFNBQUE7Z0JBQ2QsSUFDRSxDQUFDLG1CQUFBLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxTQUFTO29CQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsbUJBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ25FO29CQUNBLFVBQVUsR0FBRyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7aUJBQzFEO3FCQUFNO29CQUNMLFVBQVUsR0FBRyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7aUJBQ3ZEOztvQkFFSyxvQkFBb0IsR0FDeEIsVUFBVSxDQUFDLG9CQUFvQixLQUFLLFNBQVM7b0JBQzNDLENBQUMsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLFlBQVk7b0JBQzNDLENBQUMsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLG9CQUFvQjs7b0JBRWpELE9BQU8sR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVU7cUJBQzFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLENBQUM7cUJBQ3JDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUM7cUJBQy9CLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUM7O29CQUUxQixVQUFVLEdBQUcsQ0FBQyxtQkFBQSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBa0MsQ0FBQyxDQUFDLFVBQVU7O29CQUV0RixpQkFBaUIsU0FBQTtnQkFDckIsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLEVBQUU7cUJBQ3hDLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDakYsSUFBSSxDQUFDLGlCQUFpQixFQUFFO29CQUN0QixvREFBb0Q7b0JBQ2xELGlCQUFpQixHQUFHLElBQUksZUFBZSxFQUFFLENBQUMsV0FBVyxDQUNyRCxTQUFTLEVBQ1QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFDckIsSUFBSSxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUNoRCxVQUFVLENBQUMsWUFBWSxDQUN4QixDQUFDO2lCQUNIO3FCQUFNO29CQUNMLGlCQUFpQixHQUFHLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztpQkFDbkQ7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FDTixPQUFPLFNBQUksaUJBQWlCLFNBQUksb0JBQXNCLEVBQ3pELFFBQVEsQ0FDVCxDQUFDO2FBQ0g7aUJBQU0sSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFO2dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQy9DO1NBQ0Y7SUFDSCxDQUFDOztnQkFwRUYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFUUSxjQUFjO2dCQUFFLGVBQWU7OzswQkFKeEM7Q0FnRkMsQUFyRUQsSUFxRUM7U0FsRVksZUFBZTs7Ozs7O0lBR3hCLHlDQUFzQzs7Ozs7SUFDdEMsMENBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IG9sUHJvamVjdGlvbiBmcm9tICdvbC9wcm9qL1Byb2plY3Rpb24nO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIsIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ZpbHRlci9zaGFyZWQnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEb3dubG9hZFNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgb3BlbihsYXllcjogTGF5ZXIpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZG93bmxvYWQudGl0bGUnKTtcclxuICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhcclxuICAgICAgdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZG93bmxvYWQuc3RhcnQnKSxcclxuICAgICAgdGl0bGVcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgRFNPcHRpb25zOiBEYXRhU291cmNlT3B0aW9ucyA9IGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucztcclxuICAgIGlmIChPYmplY3Qua2V5cyhEU09wdGlvbnMuZG93bmxvYWQpLmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIERTT3B0aW9ucy5kb3dubG9hZC5keW5hbWljVXJsICYmXHJcbiAgICAgICAgRFNPcHRpb25zLmRvd25sb2FkLnVybCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICkge1xyXG4gICAgICAgIGxldCB3ZnNPcHRpb25zO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIChsYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55KS5wYXJhbXNXRlMgJiZcclxuICAgICAgICAgIE9iamVjdC5rZXlzKChsYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55KS5wYXJhbXNXRlMpLmxlbmd0aCA+IDBcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHdmc09wdGlvbnMgPSAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3ZnNPcHRpb25zID0gKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnBhcmFtcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG91dHB1dEZvcm1hdERvd25sb2FkID1cclxuICAgICAgICAgIHdmc09wdGlvbnMub3V0cHV0Rm9ybWF0RG93bmxvYWQgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA/ICdvdXRwdXRmb3JtYXQ9JyArIHdmc09wdGlvbnMub3V0cHV0Rm9ybWF0XHJcbiAgICAgICAgICAgIDogJ291dHB1dGZvcm1hdD0nICsgd2ZzT3B0aW9ucy5vdXRwdXRGb3JtYXREb3dubG9hZDtcclxuXHJcbiAgICAgICAgY29uc3QgYmFzZXVybCA9IERTT3B0aW9ucy5kb3dubG9hZC5keW5hbWljVXJsXHJcbiAgICAgICAgICAucmVwbGFjZSgvJj9vdXRwdXRmb3JtYXQ9W14mXSovZ2ksICcnKVxyXG4gICAgICAgICAgLnJlcGxhY2UoLyY/ZmlsdGVyPVteJl0qL2dpLCAnJylcclxuICAgICAgICAgIC5yZXBsYWNlKC8mP2Jib3g9W14mXSovZ2ksICcnKTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2djRmlsdGVycyA9IChsYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzO1xyXG5cclxuICAgICAgICBsZXQgZmlsdGVyUXVlcnlTdHJpbmc7XHJcbiAgICAgICAgZmlsdGVyUXVlcnlTdHJpbmcgPSBuZXcgT2djRmlsdGVyV3JpdGVyKClcclxuICAgICAgICAuaGFuZGxlT2djRmlsdGVyc0FwcGxpZWRWYWx1ZShsYXllci5kYXRhU291cmNlLm9wdGlvbnMsIG9nY0ZpbHRlcnMuZ2VvbWV0cnlOYW1lKTtcclxuICAgICAgICBpZiAoIWZpbHRlclF1ZXJ5U3RyaW5nKSB7XHJcbiAgICAgICAgICAvLyBQcmV2ZW50IGdldHRpbmcgYWxsIHRoZSBmZWF0dXJlcyBmb3IgZW1wdHkgZmlsdGVyXHJcbiAgICAgICAgICAgIGZpbHRlclF1ZXJ5U3RyaW5nID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpLmJ1aWxkRmlsdGVyKFxyXG4gICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGxheWVyLm1hcC5nZXRFeHRlbnQoKSxcclxuICAgICAgICAgICAgbmV3IG9sUHJvamVjdGlvbih7IGNvZGU6IGxheWVyLm1hcC5wcm9qZWN0aW9uIH0pLFxyXG4gICAgICAgICAgICBvZ2NGaWx0ZXJzLmdlb21ldHJ5TmFtZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZmlsdGVyUXVlcnlTdHJpbmcgPSAnZmlsdGVyPScgKyBmaWx0ZXJRdWVyeVN0cmluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93Lm9wZW4oXHJcbiAgICAgICAgICBgJHtiYXNldXJsfSYke2ZpbHRlclF1ZXJ5U3RyaW5nfSYke291dHB1dEZvcm1hdERvd25sb2FkfWAsXHJcbiAgICAgICAgICAnX2JsYW5rJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSBpZiAoRFNPcHRpb25zLmRvd25sb2FkKSB7XHJcbiAgICAgICAgd2luZG93Lm9wZW4oRFNPcHRpb25zLmRvd25sb2FkLnVybCwgJ19ibGFuaycpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==