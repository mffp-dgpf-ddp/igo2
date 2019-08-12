/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { of } from 'rxjs';
import { FEATURE } from '../../../feature';
import { SearchSource } from './source';
import { LanguageService } from '@igo2/core';
import { GoogleLinks } from '../../../utils/googleLinks';
var CoordinatesSearchResultFormatter = /** @class */ (function () {
    function CoordinatesSearchResultFormatter(languageService) {
        this.languageService = languageService;
    }
    /**
     * @param {?} result
     * @return {?}
     */
    CoordinatesSearchResultFormatter.prototype.formatResult = /**
     * @param {?} result
     * @return {?}
     */
    function (result) {
        return result;
    };
    CoordinatesSearchResultFormatter.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CoordinatesSearchResultFormatter.ctorParameters = function () { return [
        { type: LanguageService }
    ]; };
    return CoordinatesSearchResultFormatter;
}());
export { CoordinatesSearchResultFormatter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CoordinatesSearchResultFormatter.prototype.languageService;
}
/**
 * CoordinatesReverse search source
 */
var CoordinatesReverseSearchSource = /** @class */ (function (_super) {
    tslib_1.__extends(CoordinatesReverseSearchSource, _super);
    function CoordinatesReverseSearchSource(options) {
        return _super.call(this, options) || this;
    }
    /**
     * @return {?}
     */
    CoordinatesReverseSearchSource.prototype.getId = /**
     * @return {?}
     */
    function () {
        return CoordinatesReverseSearchSource.id;
    };
    /**
     * @protected
     * @return {?}
     */
    CoordinatesReverseSearchSource.prototype.getDefaultOptions = /**
     * @protected
     * @return {?}
     */
    function () {
        return {
            title: 'Coordinates'
        };
    };
    /**
     * Search a location by coordinates
     * @param lonLat Location coordinates
     * @param distance Search raidus around lonLat
     * @returns Observable of <SearchResult<Feature>[]
     */
    /**
     * Search a location by coordinates
     * @param {?} lonLat Location coordinates
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    CoordinatesReverseSearchSource.prototype.reverseSearch = /**
     * Search a location by coordinates
     * @param {?} lonLat Location coordinates
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    function (lonLat, options) {
        return of([this.dataToResult(lonLat)]);
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    CoordinatesReverseSearchSource.prototype.dataToResult = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: {
                    type: 'Point',
                    coordinates: [data[0], data[1]]
                },
                extent: undefined,
                properties: {
                    type: 'point',
                    coordonnees: String(data[0]) + ', ' + String(data[1]),
                    format: 'degrés decimaux',
                    systemeCoordonnees: 'WGS84',
                    GoogleMaps: GoogleLinks.getGoogleMapsLink(data[0], data[1]),
                    GoogleStreetView: GoogleLinks.getGoogleStreetViewLink(data[0], data[1])
                }
            },
            meta: {
                dataType: FEATURE,
                id: '1',
                title: String(data[0]) + ', ' + String(data[1]),
                icon: 'map-marker'
            }
        };
    };
    CoordinatesReverseSearchSource.id = 'coordinatesreverse';
    CoordinatesReverseSearchSource.type = FEATURE;
    CoordinatesReverseSearchSource.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CoordinatesReverseSearchSource.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
    ]; };
    return CoordinatesReverseSearchSource;
}(SearchSource));
export { CoordinatesReverseSearchSource };
if (false) {
    /** @type {?} */
    CoordinatesReverseSearchSource.id;
    /** @type {?} */
    CoordinatesReverseSearchSource.type;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vcmRpbmF0ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zb3VyY2VzL2Nvb3JkaW5hdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV0QyxPQUFPLEVBQUUsT0FBTyxFQUFXLE1BQU0sa0JBQWtCLENBQUM7QUFHcEQsT0FBTyxFQUFFLFlBQVksRUFBaUIsTUFBTSxVQUFVLENBQUM7QUFHdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFekQ7SUFFRSwwQ0FBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQUcsQ0FBQzs7Ozs7SUFFeEQsdURBQVk7Ozs7SUFBWixVQUFhLE1BQTZCO1FBQ3hDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O2dCQU5GLFVBQVU7Ozs7Z0JBSEYsZUFBZTs7SUFVeEIsdUNBQUM7Q0FBQSxBQVBELElBT0M7U0FOWSxnQ0FBZ0M7Ozs7OztJQUMvQiwyREFBd0M7Ozs7O0FBU3REO0lBQ29ELDBEQUFZO0lBSzlELHdDQUErQixPQUE0QjtlQUN6RCxrQkFBTSxPQUFPLENBQUM7SUFDaEIsQ0FBQzs7OztJQUVELDhDQUFLOzs7SUFBTDtRQUNFLE9BQU8sOEJBQThCLENBQUMsRUFBRSxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRVMsMERBQWlCOzs7O0lBQTNCO1FBQ0UsT0FBTztZQUNMLEtBQUssRUFBRSxhQUFhO1NBQ3JCLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7SUFDSCxzREFBYTs7Ozs7O0lBQWIsVUFDRSxNQUF3QixFQUN4QixPQUEyQjtRQUUzQixPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7OztJQUVPLHFEQUFZOzs7OztJQUFwQixVQUFxQixJQUFzQjtRQUN6QyxPQUFPO1lBQ0wsTUFBTSxFQUFFLElBQUk7WUFDWixJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLE9BQU87Z0JBQ2IsVUFBVSxFQUFFLFdBQVc7Z0JBQ3ZCLFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsT0FBTztvQkFDYixXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNoQztnQkFDRCxNQUFNLEVBQUUsU0FBUztnQkFDakIsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxPQUFPO29CQUNiLFdBQVcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JELE1BQU0sRUFBRSxpQkFBaUI7b0JBQ3pCLGtCQUFrQixFQUFFLE9BQU87b0JBQzNCLFVBQVUsRUFBRSxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0QsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLHVCQUF1QixDQUNuRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSO2lCQUNGO2FBQ0Y7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLEVBQUUsRUFBRSxHQUFHO2dCQUNQLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksRUFBRSxZQUFZO2FBQ25CO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUE1RE0saUNBQUUsR0FBRyxvQkFBb0IsQ0FBQztJQUMxQixtQ0FBSSxHQUFHLE9BQU8sQ0FBQzs7Z0JBSnZCLFVBQVU7Ozs7Z0RBTUksTUFBTSxTQUFDLFNBQVM7O0lBMEQvQixxQ0FBQztDQUFBLEFBaEVELENBQ29ELFlBQVksR0ErRC9EO1NBL0RZLDhCQUE4Qjs7O0lBRXpDLGtDQUFpQzs7SUFDakMsb0NBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRkVBVFVSRSwgRmVhdHVyZSB9IGZyb20gJy4uLy4uLy4uL2ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UsIFJldmVyc2VTZWFyY2ggfSBmcm9tICcuL3NvdXJjZSc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZU9wdGlvbnMsIFRleHRTZWFyY2hPcHRpb25zIH0gZnJvbSAnLi9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcblxyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgR29vZ2xlTGlua3MgfSBmcm9tICcuLi8uLi8uLi91dGlscy9nb29nbGVMaW5rcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb29yZGluYXRlc1NlYXJjaFJlc3VsdEZvcm1hdHRlciB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSkge31cclxuXHJcbiAgZm9ybWF0UmVzdWx0KHJlc3VsdDogU2VhcmNoUmVzdWx0PEZlYXR1cmU+KTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG59XHJcbi8qKlxyXG4gKiBDb29yZGluYXRlc1JldmVyc2Ugc2VhcmNoIHNvdXJjZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29vcmRpbmF0ZXNSZXZlcnNlU2VhcmNoU291cmNlIGV4dGVuZHMgU2VhcmNoU291cmNlXHJcbiAgaW1wbGVtZW50cyBSZXZlcnNlU2VhcmNoIHtcclxuICBzdGF0aWMgaWQgPSAnY29vcmRpbmF0ZXNyZXZlcnNlJztcclxuICBzdGF0aWMgdHlwZSA9IEZFQVRVUkU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGdldElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gQ29vcmRpbmF0ZXNSZXZlcnNlU2VhcmNoU291cmNlLmlkO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdDb29yZGluYXRlcydcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggYSBsb2NhdGlvbiBieSBjb29yZGluYXRlc1xyXG4gICAqIEBwYXJhbSBsb25MYXQgTG9jYXRpb24gY29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gZGlzdGFuY2UgU2VhcmNoIHJhaWR1cyBhcm91bmQgbG9uTGF0XHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICByZXZlcnNlU2VhcmNoKFxyXG4gICAgbG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgb3B0aW9ucz86IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXT4ge1xyXG4gICAgcmV0dXJuIG9mKFt0aGlzLmRhdGFUb1Jlc3VsdChsb25MYXQpXSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRhdGFUb1Jlc3VsdChkYXRhOiBbbnVtYmVyLCBudW1iZXJdKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgcHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgICAgZ2VvbWV0cnk6IHtcclxuICAgICAgICAgIHR5cGU6ICdQb2ludCcsXHJcbiAgICAgICAgICBjb29yZGluYXRlczogW2RhdGFbMF0sIGRhdGFbMV1dXHJcbiAgICAgICAgfSxcclxuICAgICAgICBleHRlbnQ6IHVuZGVmaW5lZCxcclxuICAgICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgICB0eXBlOiAncG9pbnQnLFxyXG4gICAgICAgICAgY29vcmRvbm5lZXM6IFN0cmluZyhkYXRhWzBdKSArICcsICcgKyBTdHJpbmcoZGF0YVsxXSksXHJcbiAgICAgICAgICBmb3JtYXQ6ICdkZWdyw6lzIGRlY2ltYXV4JyxcclxuICAgICAgICAgIHN5c3RlbWVDb29yZG9ubmVlczogJ1dHUzg0JyxcclxuICAgICAgICAgIEdvb2dsZU1hcHM6IEdvb2dsZUxpbmtzLmdldEdvb2dsZU1hcHNMaW5rKGRhdGFbMF0sIGRhdGFbMV0pLFxyXG4gICAgICAgICAgR29vZ2xlU3RyZWV0VmlldzogR29vZ2xlTGlua3MuZ2V0R29vZ2xlU3RyZWV0Vmlld0xpbmsoXHJcbiAgICAgICAgICAgIGRhdGFbMF0sXHJcbiAgICAgICAgICAgIGRhdGFbMV1cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkYXRhVHlwZTogRkVBVFVSRSxcclxuICAgICAgICBpZDogJzEnLFxyXG4gICAgICAgIHRpdGxlOiBTdHJpbmcoZGF0YVswXSkgKyAnLCAnICsgU3RyaW5nKGRhdGFbMV0pLFxyXG4gICAgICAgIGljb246ICdtYXAtbWFya2VyJ1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=