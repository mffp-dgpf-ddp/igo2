/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { FEATURE } from '../../../feature';
import { SearchSource } from './source';
import { LanguageService } from '@igo2/core';
import { GoogleLinks } from '../../../utils/googleLinks';
import { lonLatConversion, roundCoordTo } from '../../../map/shared/map.utils';
import { OsmLinks } from '../../../utils';
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
     * @param {?} languageService
     * @param {?} projections
     */
    constructor(options, languageService, projections) {
        super(options);
        this.languageService = languageService;
        this.title$ = new BehaviorSubject('');
        this.projections = projections;
        this.languageService.translate
            .get(this.options.title)
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        title => this.title$.next(title)));
    }
    /**
     * @return {?}
     */
    get title() {
        return this.title$.getValue();
    }
    /**
     * @return {?}
     */
    getId() {
        return CoordinatesReverseSearchSource.id;
    }
    /**
     * @return {?}
     */
    getType() {
        return CoordinatesReverseSearchSource.type;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'igo.geo.search.coordinates.name',
            order: 1,
            showInSettings: false
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
        /** @type {?} */
        const convertedCoord = lonLatConversion(data, this.projections);
        /** @type {?} */
        const coords = convertedCoord.reduce((/**
         * @param {?} obj
         * @param {?} item
         * @return {?}
         */
        (obj, item) => (obj[item.alias] = item.igo2CoordFormat, obj)), {});
        /** @type {?} */
        const roundedCoordString = roundCoordTo(data, 6).join(', ');
        /** @type {?} */
        const coordKey = this.languageService.translate.instant('igo.geo.search.coordinates.coord');
        /** @type {?} */
        const coordLonLat = {};
        coordLonLat[coordKey] = roundedCoordString;
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
                properties: Object.assign({}, coordLonLat, coords, {
                    GoogleMaps: GoogleLinks.getGoogleMapsLink(data[0], data[1]),
                    GoogleStreetView: GoogleLinks.getGoogleStreetViewLink(data[0], data[1]),
                    OpenStreetMap: OsmLinks.getOpenStreetMapLink(data[0], data[1], 14)
                }),
                meta: {
                    id: data[0].toString() + ',' + data[1].toString(),
                    title: roundedCoordString
                }
            },
            meta: {
                dataType: FEATURE,
                id: data[0].toString() + ',' + data[1].toString(),
                title: roundedCoordString,
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
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] },
    { type: LanguageService },
    { type: Array, decorators: [{ type: Inject, args: ['projections',] }] }
];
if (false) {
    /** @type {?} */
    CoordinatesReverseSearchSource.id;
    /** @type {?} */
    CoordinatesReverseSearchSource.type;
    /**
     * @type {?}
     * @private
     */
    CoordinatesReverseSearchSource.prototype.projections;
    /** @type {?} */
    CoordinatesReverseSearchSource.prototype.title$;
    /**
     * @type {?}
     * @private
     */
    CoordinatesReverseSearchSource.prototype.languageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vcmRpbmF0ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zb3VyY2VzL2Nvb3JkaW5hdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQWMsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2RCxPQUFPLEVBQUUsT0FBTyxFQUFXLE1BQU0sa0JBQWtCLENBQUM7QUFHcEQsT0FBTyxFQUFFLFlBQVksRUFBaUIsTUFBTSxVQUFVLENBQUM7QUFHdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUcxQyxNQUFNLE9BQU8sZ0NBQWdDOzs7O0lBQzNDLFlBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUFHLENBQUM7Ozs7O0lBRXhELFlBQVksQ0FBQyxNQUE2QjtRQUN4QyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7WUFORixVQUFVOzs7O1lBTkYsZUFBZTs7Ozs7OztJQVFWLDJEQUF3Qzs7Ozs7QUFVdEQsTUFBTSxPQUFPLDhCQUErQixTQUFRLFlBQVk7Ozs7OztJQWE5RCxZQUNxQixPQUE0QixFQUN2QyxlQUFnQyxFQUNqQixXQUF5QjtRQUVoRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFIUCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFSMUMsV0FBTSxHQUE0QixJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztRQVloRSxJQUFJ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aUJBQzFCO2FBQ0Y7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pELEtBQUssRUFBRSxrQkFBa0I7Z0JBQ3pCLElBQUksRUFBRSxZQUFZO2FBQ25CO1NBQ0YsQ0FBQztJQUNKLENBQUM7O0FBaEdNLGlDQUFFLEdBQUcsb0JBQW9CLENBQUM7QUFDMUIsbUNBQUksR0FBRyxPQUFPLENBQUM7O1lBSnZCLFVBQVU7Ozs7NENBZU4sTUFBTSxTQUFDLFNBQVM7WUFoQ1osZUFBZTt3Q0FrQ25CLE1BQU0sU0FBQyxhQUFhOzs7O0lBZHZCLGtDQUFpQzs7SUFDakMsb0NBQXNCOzs7OztJQUV0QixxREFBb0I7O0lBRXBCLGdEQUFrRTs7Ozs7SUFRaEUseURBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIG9mIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBGRUFUVVJFLCBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vLi4vZmVhdHVyZSc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSwgUmV2ZXJzZVNlYXJjaCB9IGZyb20gJy4vc291cmNlJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlT3B0aW9ucywgVGV4dFNlYXJjaE9wdGlvbnMgfSBmcm9tICcuL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuXHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBHb29nbGVMaW5rcyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2dvb2dsZUxpbmtzJztcclxuaW1wb3J0IHsgUHJvamVjdGlvbiB9IGZyb20gJy4uLy4uLy4uL21hcC9zaGFyZWQvcHJvamVjdGlvbi5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgbG9uTGF0Q29udmVyc2lvbiwgcm91bmRDb29yZFRvIH0gZnJvbSAnLi4vLi4vLi4vbWFwL3NoYXJlZC9tYXAudXRpbHMnO1xyXG5pbXBvcnQgeyBPc21MaW5rcyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvb3JkaW5hdGVzU2VhcmNoUmVzdWx0Rm9ybWF0dGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlKSB7fVxyXG5cclxuICBmb3JtYXRSZXN1bHQocmVzdWx0OiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4pOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuLyoqXHJcbiAqIENvb3JkaW5hdGVzUmV2ZXJzZSBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb29yZGluYXRlc1JldmVyc2VTZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2VcclxuICBpbXBsZW1lbnRzIFJldmVyc2VTZWFyY2gge1xyXG4gIHN0YXRpYyBpZCA9ICdjb29yZGluYXRlc3JldmVyc2UnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuXHJcbiAgcHJpdmF0ZSBwcm9qZWN0aW9ucztcclxuXHJcbiAgdGl0bGUkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XHJcblxyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudGl0bGUkLmdldFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIEBJbmplY3QoJ3Byb2plY3Rpb25zJykgcHJvamVjdGlvbnM6IFByb2plY3Rpb25bXSxcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5wcm9qZWN0aW9ucyA9IHByb2plY3Rpb25zO1xyXG4gICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlXHJcbiAgICAgIC5nZXQodGhpcy5vcHRpb25zLnRpdGxlKVxyXG4gICAgICAuc3Vic2NyaWJlKHRpdGxlID0+IHRoaXMudGl0bGUkLm5leHQodGl0bGUpKTtcclxuICB9XHJcblxyXG4gIGdldElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gQ29vcmRpbmF0ZXNSZXZlcnNlU2VhcmNoU291cmNlLmlkO1xyXG4gIH1cclxuXHJcbiAgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIENvb3JkaW5hdGVzUmV2ZXJzZVNlYXJjaFNvdXJjZS50eXBlO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5jb29yZGluYXRlcy5uYW1lJyxcclxuICAgICAgb3JkZXI6IDEsXHJcbiAgICAgIHNob3dJblNldHRpbmdzOiBmYWxzZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBhIGxvY2F0aW9uIGJ5IGNvb3JkaW5hdGVzXHJcbiAgICogQHBhcmFtIGxvbkxhdCBMb2NhdGlvbiBjb29yZGluYXRlc1xyXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBTZWFyY2ggcmFpZHVzIGFyb3VuZCBsb25MYXRcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIDxTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXVxyXG4gICAqL1xyXG4gIHJldmVyc2VTZWFyY2goXHJcbiAgICBsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0sXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdPiB7XHJcbiAgICByZXR1cm4gb2YoW3RoaXMuZGF0YVRvUmVzdWx0KGxvbkxhdCldKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KGRhdGE6IFtudW1iZXIsIG51bWJlcl0pOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgY29uc3QgY29udmVydGVkQ29vcmQgPSBsb25MYXRDb252ZXJzaW9uKGRhdGEsIHRoaXMucHJvamVjdGlvbnMpO1xyXG4gICAgY29uc3QgY29vcmRzID0gY29udmVydGVkQ29vcmQucmVkdWNlKChvYmosIGl0ZW0pID0+IChcclxuICAgICAgb2JqW2l0ZW0uYWxpYXNdID0gaXRlbS5pZ28yQ29vcmRGb3JtYXQsIG9iaiksIHt9KTtcclxuXHJcbiAgICBjb25zdCByb3VuZGVkQ29vcmRTdHJpbmcgPSByb3VuZENvb3JkVG8oZGF0YSwgNikuam9pbignLCAnKTtcclxuXHJcbiAgICBjb25zdCBjb29yZEtleSA9ICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5zZWFyY2guY29vcmRpbmF0ZXMuY29vcmQnKTtcclxuICAgIGNvbnN0IGNvb3JkTG9uTGF0ID0ge307XHJcbiAgICBjb29yZExvbkxhdFtjb29yZEtleV0gPSByb3VuZGVkQ29vcmRTdHJpbmc7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICBnZW9tZXRyeToge1xyXG4gICAgICAgICAgdHlwZTogJ1BvaW50JyxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBbZGF0YVswXSwgZGF0YVsxXV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGV4dGVudDogdW5kZWZpbmVkLFxyXG4gICAgICAgIHByb3BlcnRpZXM6IE9iamVjdC5hc3NpZ24oe30sXHJcbiAgICAgICAgICBjb29yZExvbkxhdCxcclxuICAgICAgICAgIGNvb3JkcyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgR29vZ2xlTWFwczogR29vZ2xlTGlua3MuZ2V0R29vZ2xlTWFwc0xpbmsoZGF0YVswXSwgZGF0YVsxXSksXHJcbiAgICAgICAgICAgIEdvb2dsZVN0cmVldFZpZXc6IEdvb2dsZUxpbmtzLmdldEdvb2dsZVN0cmVldFZpZXdMaW5rKFxyXG4gICAgICAgICAgICAgIGRhdGFbMF0sXHJcbiAgICAgICAgICAgICAgZGF0YVsxXVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBPcGVuU3RyZWV0TWFwOiBPc21MaW5rcy5nZXRPcGVuU3RyZWV0TWFwTGluayhkYXRhWzBdLCBkYXRhWzFdLCAxNClcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIGlkOiBkYXRhWzBdLnRvU3RyaW5nKCkgKyAnLCcgKyBkYXRhWzFdLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICB0aXRsZTogcm91bmRlZENvb3JkU3RyaW5nXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgaWQ6IGRhdGFbMF0udG9TdHJpbmcoKSArICcsJyArIGRhdGFbMV0udG9TdHJpbmcoKSxcclxuICAgICAgICB0aXRsZTogcm91bmRlZENvb3JkU3RyaW5nLFxyXG4gICAgICAgIGljb246ICdtYXAtbWFya2VyJ1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=