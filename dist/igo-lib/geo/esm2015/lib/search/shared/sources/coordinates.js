/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { of } from 'rxjs';
import { FEATURE } from '../../../feature';
import { SearchSource } from './source';
import { LanguageService } from '@igo2/core';
import { GoogleLinks } from '../../../utils/googleLinks';
export class CoordinatesSearchResultFormatter {
    /**
     * @param {?} languageService
     */
    constructor(languageService) {
        this.languageService = languageService;
    }
    /**
     * @param {?} result
     * @return {?}
     */
    formatResult(result) {
        return result;
    }
}
CoordinatesSearchResultFormatter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CoordinatesSearchResultFormatter.ctorParameters = () => [
    { type: LanguageService }
];
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
export class CoordinatesReverseSearchSource extends SearchSource {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
    }
    /**
     * @return {?}
     */
    getId() {
        return CoordinatesReverseSearchSource.id;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'Coordinates'
        };
    }
    /**
     * Search a location by coordinates
     * @param {?} lonLat Location coordinates
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    reverseSearch(lonLat, options) {
        return of([this.dataToResult(lonLat)]);
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    dataToResult(data) {
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
    }
}
CoordinatesReverseSearchSource.id = 'coordinatesreverse';
CoordinatesReverseSearchSource.type = FEATURE;
CoordinatesReverseSearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CoordinatesReverseSearchSource.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
];
if (false) {
    /** @type {?} */
    CoordinatesReverseSearchSource.id;
    /** @type {?} */
    CoordinatesReverseSearchSource.type;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vcmRpbmF0ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zb3VyY2VzL2Nvb3JkaW5hdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXRDLE9BQU8sRUFBRSxPQUFPLEVBQVcsTUFBTSxrQkFBa0IsQ0FBQztBQUdwRCxPQUFPLEVBQUUsWUFBWSxFQUFpQixNQUFNLFVBQVUsQ0FBQztBQUd2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUd6RCxNQUFNLE9BQU8sZ0NBQWdDOzs7O0lBQzNDLFlBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUFHLENBQUM7Ozs7O0lBRXhELFlBQVksQ0FBQyxNQUE2QjtRQUN4QyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7WUFORixVQUFVOzs7O1lBSEYsZUFBZTs7Ozs7OztJQUtWLDJEQUF3Qzs7Ozs7QUFVdEQsTUFBTSxPQUFPLDhCQUErQixTQUFRLFlBQVk7Ozs7SUFLOUQsWUFBK0IsT0FBNEI7UUFDekQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0gsT0FBTyw4QkFBOEIsQ0FBQyxFQUFFLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFFUyxpQkFBaUI7UUFDekIsT0FBTztZQUNMLEtBQUssRUFBRSxhQUFhO1NBQ3JCLENBQUM7SUFDSixDQUFDOzs7Ozs7O0lBUUQsYUFBYSxDQUNYLE1BQXdCLEVBQ3hCLE9BQTJCO1FBRTNCLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQzs7Ozs7O0lBRU8sWUFBWSxDQUFDLElBQXNCO1FBQ3pDLE9BQU87WUFDTCxNQUFNLEVBQUUsSUFBSTtZQUNaLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsT0FBTztnQkFDYixVQUFVLEVBQUUsV0FBVztnQkFDdkIsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxPQUFPO29CQUNiLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDO2dCQUNELE1BQU0sRUFBRSxTQUFTO2dCQUNqQixVQUFVLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLE9BQU87b0JBQ2IsV0FBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckQsTUFBTSxFQUFFLGlCQUFpQjtvQkFDekIsa0JBQWtCLEVBQUUsT0FBTztvQkFDM0IsVUFBVSxFQUFFLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzRCxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsdUJBQXVCLENBQ25ELElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1I7aUJBQ0Y7YUFDRjtZQUNELElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsT0FBTztnQkFDakIsRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxFQUFFLFlBQVk7YUFDbkI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7QUE1RE0saUNBQUUsR0FBRyxvQkFBb0IsQ0FBQztBQUMxQixtQ0FBSSxHQUFHLE9BQU8sQ0FBQzs7WUFKdkIsVUFBVTs7Ozs0Q0FNSSxNQUFNLFNBQUMsU0FBUzs7OztJQUg3QixrQ0FBaUM7O0lBQ2pDLG9DQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEZFQVRVUkUsIEZlYXR1cmUgfSBmcm9tICcuLi8uLi8uLi9mZWF0dXJlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlLCBSZXZlcnNlU2VhcmNoIH0gZnJvbSAnLi9zb3VyY2UnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2VPcHRpb25zLCBUZXh0U2VhcmNoT3B0aW9ucyB9IGZyb20gJy4vc291cmNlLmludGVyZmFjZXMnO1xyXG5cclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IEdvb2dsZUxpbmtzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZ29vZ2xlTGlua3MnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29vcmRpbmF0ZXNTZWFyY2hSZXN1bHRGb3JtYXR0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UpIHt9XHJcblxyXG4gIGZvcm1hdFJlc3VsdChyZXN1bHQ6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPik6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPiB7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG4vKipcclxuICogQ29vcmRpbmF0ZXNSZXZlcnNlIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvb3JkaW5hdGVzUmV2ZXJzZVNlYXJjaFNvdXJjZSBleHRlbmRzIFNlYXJjaFNvdXJjZVxyXG4gIGltcGxlbWVudHMgUmV2ZXJzZVNlYXJjaCB7XHJcbiAgc3RhdGljIGlkID0gJ2Nvb3JkaW5hdGVzcmV2ZXJzZSc7XHJcbiAgc3RhdGljIHR5cGUgPSBGRUFUVVJFO1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KCdvcHRpb25zJykgb3B0aW9uczogU2VhcmNoU291cmNlT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBnZXRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIENvb3JkaW5hdGVzUmV2ZXJzZVNlYXJjaFNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnQ29vcmRpbmF0ZXMnXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbG9jYXRpb24gYnkgY29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gbG9uTGF0IExvY2F0aW9uIGNvb3JkaW5hdGVzXHJcbiAgICogQHBhcmFtIGRpc3RhbmNlIFNlYXJjaCByYWlkdXMgYXJvdW5kIGxvbkxhdFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdXHJcbiAgICovXHJcbiAgcmV2ZXJzZVNlYXJjaChcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM/OiBUZXh0U2VhcmNoT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W10+IHtcclxuICAgIHJldHVybiBvZihbdGhpcy5kYXRhVG9SZXN1bHQobG9uTGF0KV0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkYXRhVG9SZXN1bHQoZGF0YTogW251bWJlciwgbnVtYmVyXSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIHByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxyXG4gICAgICAgIGdlb21ldHJ5OiB7XHJcbiAgICAgICAgICB0eXBlOiAnUG9pbnQnLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IFtkYXRhWzBdLCBkYXRhWzFdXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXh0ZW50OiB1bmRlZmluZWQsXHJcbiAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgdHlwZTogJ3BvaW50JyxcclxuICAgICAgICAgIGNvb3Jkb25uZWVzOiBTdHJpbmcoZGF0YVswXSkgKyAnLCAnICsgU3RyaW5nKGRhdGFbMV0pLFxyXG4gICAgICAgICAgZm9ybWF0OiAnZGVncsOpcyBkZWNpbWF1eCcsXHJcbiAgICAgICAgICBzeXN0ZW1lQ29vcmRvbm5lZXM6ICdXR1M4NCcsXHJcbiAgICAgICAgICBHb29nbGVNYXBzOiBHb29nbGVMaW5rcy5nZXRHb29nbGVNYXBzTGluayhkYXRhWzBdLCBkYXRhWzFdKSxcclxuICAgICAgICAgIEdvb2dsZVN0cmVldFZpZXc6IEdvb2dsZUxpbmtzLmdldEdvb2dsZVN0cmVldFZpZXdMaW5rKFxyXG4gICAgICAgICAgICBkYXRhWzBdLFxyXG4gICAgICAgICAgICBkYXRhWzFdXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgaWQ6ICcxJyxcclxuICAgICAgICB0aXRsZTogU3RyaW5nKGRhdGFbMF0pICsgJywgJyArIFN0cmluZyhkYXRhWzFdKSxcclxuICAgICAgICBpY29uOiAnbWFwLW1hcmtlcidcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19