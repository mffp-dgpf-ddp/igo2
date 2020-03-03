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
                    .handleOgcFiltersAppliedValue(layer.dataSource.options, ogcFilters.geometryName, layer.map.viewController.getExtent(), new olProjection({ code: layer.map.projection }));
                if (!filterQueryString) {
                    // Prevent getting all the features for empty filter
                    filterQueryString = new OgcFilterWriter().buildFilter(undefined, layer.map.viewController.getExtent(), new olProjection({ code: layer.map.projection }), ogcFilters.geometryName);
                }
                else {
                    filterQueryString = 'filter=' + encodeURIComponent(filterQueryString);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kb3dubG9hZC9zaGFyZWQvZG93bmxvYWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUc3RCxPQUFPLEVBQUUsZUFBZSxFQUFrQyxNQUFNLHFCQUFxQixDQUFDOzs7QUFJdEY7SUFLRSx5QkFDVSxjQUE4QixFQUM5QixlQUFnQztRQURoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ3ZDLENBQUM7Ozs7O0lBRUosOEJBQUk7Ozs7SUFBSixVQUFLLEtBQVk7O1lBQ1QsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUzs7WUFDMUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQ3pCLFNBQVMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsRUFDM0MsS0FBSyxDQUNOLENBQUM7O1lBRUksU0FBUyxHQUFzQixLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU87UUFDN0QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlDLElBQ0UsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVO2dCQUM3QixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQ3BDOztvQkFDSSxVQUFVLFNBQUE7Z0JBQ2QsSUFDRSxDQUFDLG1CQUFBLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxTQUFTO29CQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsbUJBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ25FO29CQUNBLFVBQVUsR0FBRyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7aUJBQzFEO3FCQUFNO29CQUNMLFVBQVUsR0FBRyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7aUJBQ3ZEOztvQkFFSyxvQkFBb0IsR0FDeEIsVUFBVSxDQUFDLG9CQUFvQixLQUFLLFNBQVM7b0JBQzNDLENBQUMsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLFlBQVk7b0JBQzNDLENBQUMsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLG9CQUFvQjs7b0JBRWpELE9BQU8sR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVU7cUJBQzFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLENBQUM7cUJBQ3JDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUM7cUJBQy9CLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUM7O29CQUUxQixVQUFVLEdBQUcsQ0FBQyxtQkFBQSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBa0MsQ0FBQyxDQUFDLFVBQVU7O29CQUV0RixpQkFBaUIsU0FBQTtnQkFDckIsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLEVBQUU7cUJBQ3hDLDRCQUE0QixDQUMzQixLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFDeEIsVUFBVSxDQUFDLFlBQVksRUFDdkIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLEVBQ3BDLElBQUksWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsaUJBQWlCLEVBQUU7b0JBQ3RCLG9EQUFvRDtvQkFDbEQsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQyxXQUFXLENBQ3JELFNBQVMsRUFDVCxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsRUFDcEMsSUFBSSxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUNoRCxVQUFVLENBQUMsWUFBWSxDQUN4QixDQUFDO2lCQUNIO3FCQUFNO29CQUNMLGlCQUFpQixHQUFHLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUN2RTtnQkFDRCxNQUFNLENBQUMsSUFBSSxDQUNOLE9BQU8sU0FBSSxpQkFBaUIsU0FBSSxvQkFBc0IsRUFDekQsUUFBUSxDQUNULENBQUM7YUFDSDtpQkFBTSxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDL0M7U0FDRjtJQUNILENBQUM7O2dCQXhFRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVRRLGNBQWM7Z0JBQUUsZUFBZTs7OzBCQUp4QztDQW9GQyxBQXpFRCxJQXlFQztTQXRFWSxlQUFlOzs7Ozs7SUFHeEIseUNBQXNDOzs7OztJQUN0QywwQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgb2xQcm9qZWN0aW9uIGZyb20gJ29sL3Byb2ovUHJvamVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZCc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcldyaXRlciwgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZmlsdGVyL3NoYXJlZCc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2RhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERvd25sb2FkU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBvcGVuKGxheWVyOiBMYXllcikge1xyXG4gICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kb3dubG9hZC50aXRsZScpO1xyXG4gICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKFxyXG4gICAgICB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kb3dubG9hZC5zdGFydCcpLFxyXG4gICAgICB0aXRsZVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBEU09wdGlvbnM6IERhdGFTb3VyY2VPcHRpb25zID0gbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zO1xyXG4gICAgaWYgKE9iamVjdC5rZXlzKERTT3B0aW9ucy5kb3dubG9hZCkubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgRFNPcHRpb25zLmRvd25sb2FkLmR5bmFtaWNVcmwgJiZcclxuICAgICAgICBEU09wdGlvbnMuZG93bmxvYWQudXJsID09PSB1bmRlZmluZWRcclxuICAgICAgKSB7XHJcbiAgICAgICAgbGV0IHdmc09wdGlvbnM7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnBhcmFtc1dGUyAmJlxyXG4gICAgICAgICAgT2JqZWN0LmtleXMoKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnBhcmFtc1dGUykubGVuZ3RoID4gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgd2ZzT3B0aW9ucyA9IChsYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55KS5wYXJhbXNXRlM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHdmc09wdGlvbnMgPSAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgb3V0cHV0Rm9ybWF0RG93bmxvYWQgPVxyXG4gICAgICAgICAgd2ZzT3B0aW9ucy5vdXRwdXRGb3JtYXREb3dubG9hZCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gJ291dHB1dGZvcm1hdD0nICsgd2ZzT3B0aW9ucy5vdXRwdXRGb3JtYXRcclxuICAgICAgICAgICAgOiAnb3V0cHV0Zm9ybWF0PScgKyB3ZnNPcHRpb25zLm91dHB1dEZvcm1hdERvd25sb2FkO1xyXG5cclxuICAgICAgICBjb25zdCBiYXNldXJsID0gRFNPcHRpb25zLmRvd25sb2FkLmR5bmFtaWNVcmxcclxuICAgICAgICAgIC5yZXBsYWNlKC8mP291dHB1dGZvcm1hdD1bXiZdKi9naSwgJycpXHJcbiAgICAgICAgICAucmVwbGFjZSgvJj9maWx0ZXI9W14mXSovZ2ksICcnKVxyXG4gICAgICAgICAgLnJlcGxhY2UoLyY/YmJveD1bXiZdKi9naSwgJycpO1xyXG5cclxuICAgICAgICBjb25zdCBvZ2NGaWx0ZXJzID0gKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnM7XHJcblxyXG4gICAgICAgIGxldCBmaWx0ZXJRdWVyeVN0cmluZztcclxuICAgICAgICBmaWx0ZXJRdWVyeVN0cmluZyA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKVxyXG4gICAgICAgIC5oYW5kbGVPZ2NGaWx0ZXJzQXBwbGllZFZhbHVlKFxyXG4gICAgICAgICAgbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLFxyXG4gICAgICAgICAgb2djRmlsdGVycy5nZW9tZXRyeU5hbWUsXHJcbiAgICAgICAgICBsYXllci5tYXAudmlld0NvbnRyb2xsZXIuZ2V0RXh0ZW50KCksXHJcbiAgICAgICAgICBuZXcgb2xQcm9qZWN0aW9uKHsgY29kZTogbGF5ZXIubWFwLnByb2plY3Rpb24gfSkpO1xyXG4gICAgICAgIGlmICghZmlsdGVyUXVlcnlTdHJpbmcpIHtcclxuICAgICAgICAgIC8vIFByZXZlbnQgZ2V0dGluZyBhbGwgdGhlIGZlYXR1cmVzIGZvciBlbXB0eSBmaWx0ZXJcclxuICAgICAgICAgICAgZmlsdGVyUXVlcnlTdHJpbmcgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCkuYnVpbGRGaWx0ZXIoXHJcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgbGF5ZXIubWFwLnZpZXdDb250cm9sbGVyLmdldEV4dGVudCgpLFxyXG4gICAgICAgICAgICBuZXcgb2xQcm9qZWN0aW9uKHsgY29kZTogbGF5ZXIubWFwLnByb2plY3Rpb24gfSksXHJcbiAgICAgICAgICAgIG9nY0ZpbHRlcnMuZ2VvbWV0cnlOYW1lXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmaWx0ZXJRdWVyeVN0cmluZyA9ICdmaWx0ZXI9JyArIGVuY29kZVVSSUNvbXBvbmVudChmaWx0ZXJRdWVyeVN0cmluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5vcGVuKFxyXG4gICAgICAgICAgYCR7YmFzZXVybH0mJHtmaWx0ZXJRdWVyeVN0cmluZ30mJHtvdXRwdXRGb3JtYXREb3dubG9hZH1gLFxyXG4gICAgICAgICAgJ19ibGFuaydcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2UgaWYgKERTT3B0aW9ucy5kb3dubG9hZCkge1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKERTT3B0aW9ucy5kb3dubG9hZC51cmwsICdfYmxhbmsnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=