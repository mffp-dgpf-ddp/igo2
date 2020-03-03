/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { FEATURE } from '../../../feature';
import { SearchSource } from './source';
import { LanguageService } from '@igo2/core';
import { GoogleLinks } from '../../../utils/googleLinks';
import { lonLatConversion, roundCoordTo } from '../../../map/shared/map.utils';
import { OsmLinks } from '../../../utils';
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
    function CoordinatesReverseSearchSource(options, languageService, projections) {
        var _this = _super.call(this, options) || this;
        _this.languageService = languageService;
        _this.title$ = new BehaviorSubject('');
        _this.projections = projections;
        _this.languageService.translate
            .get(_this.options.title)
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        function (title) { return _this.title$.next(title); }));
        return _this;
    }
    Object.defineProperty(CoordinatesReverseSearchSource.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () {
            return this.title$.getValue();
        },
        enumerable: true,
        configurable: true
    });
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
     * @return {?}
     */
    CoordinatesReverseSearchSource.prototype.getType = /**
     * @return {?}
     */
    function () {
        return CoordinatesReverseSearchSource.type;
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
            title: 'igo.geo.search.coordinates.name',
            order: 1,
            showInSettings: false
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
        /** @type {?} */
        var convertedCoord = lonLatConversion(data, this.projections);
        /** @type {?} */
        var coords = convertedCoord.reduce((/**
         * @param {?} obj
         * @param {?} item
         * @return {?}
         */
        function (obj, item) { return (obj[item.alias] = item.igo2CoordFormat, obj); }), {});
        /** @type {?} */
        var roundedCoordString = roundCoordTo(data, 6).join(', ');
        /** @type {?} */
        var coordKey = this.languageService.translate.instant('igo.geo.search.coordinates.coord');
        /** @type {?} */
        var coordLonLat = {};
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
    };
    CoordinatesReverseSearchSource.id = 'coordinatesreverse';
    CoordinatesReverseSearchSource.type = FEATURE;
    CoordinatesReverseSearchSource.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CoordinatesReverseSearchSource.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['options',] }] },
        { type: LanguageService },
        { type: Array, decorators: [{ type: Inject, args: ['projections',] }] }
    ]; };
    return CoordinatesReverseSearchSource;
}(SearchSource));
export { CoordinatesReverseSearchSource };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vcmRpbmF0ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NoYXJlZC9zb3VyY2VzL2Nvb3JkaW5hdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFjLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFdkQsT0FBTyxFQUFFLE9BQU8sRUFBVyxNQUFNLGtCQUFrQixDQUFDO0FBR3BELE9BQU8sRUFBRSxZQUFZLEVBQWlCLE1BQU0sVUFBVSxDQUFDO0FBR3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXpELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUM7SUFFRSwwQ0FBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQUcsQ0FBQzs7Ozs7SUFFeEQsdURBQVk7Ozs7SUFBWixVQUFhLE1BQTZCO1FBQ3hDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O2dCQU5GLFVBQVU7Ozs7Z0JBTkYsZUFBZTs7SUFheEIsdUNBQUM7Q0FBQSxBQVBELElBT0M7U0FOWSxnQ0FBZ0M7Ozs7OztJQUMvQiwyREFBd0M7Ozs7O0FBU3REO0lBQ29ELDBEQUFZO0lBYTlELHdDQUNxQixPQUE0QixFQUN2QyxlQUFnQyxFQUNqQixXQUF5QjtRQUhsRCxZQUtFLGtCQUFNLE9BQU8sQ0FBQyxTQUtmO1FBUlMscUJBQWUsR0FBZixlQUFlLENBQWlCO1FBUjFDLFlBQU0sR0FBNEIsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENB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SSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO29CQUNqRCxLQUFLLEVBQUUsa0JBQWtCO2lCQUMxQjthQUNGO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO2dCQUNqRCxLQUFLLEVBQUUsa0JBQWtCO2dCQUN6QixJQUFJLEVBQUUsWUFBWTthQUNuQjtTQUNGLENBQUM7SUFDSixDQUFDO0lBaEdNLGlDQUFFLEdBQUcsb0JBQW9CLENBQUM7SUFDMUIsbUNBQUksR0FBRyxPQUFPLENBQUM7O2dCQUp2QixVQUFVOzs7O2dEQWVOLE1BQU0sU0FBQyxTQUFTO2dCQWhDWixlQUFlOzRDQWtDbkIsTUFBTSxTQUFDLGFBQWE7O0lBbUZ6QixxQ0FBQztDQUFBLEFBcEdELENBQ29ELFlBQVksR0FtRy9EO1NBbkdZLDhCQUE4Qjs7O0lBRXpDLGtDQUFpQzs7SUFDakMsb0NBQXNCOzs7OztJQUV0QixxREFBb0I7O0lBRXBCLGdEQUFrRTs7Ozs7SUFRaEUseURBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIG9mIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBGRUFUVVJFLCBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vLi4vZmVhdHVyZSc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSwgUmV2ZXJzZVNlYXJjaCB9IGZyb20gJy4vc291cmNlJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlT3B0aW9ucywgVGV4dFNlYXJjaE9wdGlvbnMgfSBmcm9tICcuL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuXHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBHb29nbGVMaW5rcyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2dvb2dsZUxpbmtzJztcclxuaW1wb3J0IHsgUHJvamVjdGlvbiB9IGZyb20gJy4uLy4uLy4uL21hcC9zaGFyZWQvcHJvamVjdGlvbi5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgbG9uTGF0Q29udmVyc2lvbiwgcm91bmRDb29yZFRvIH0gZnJvbSAnLi4vLi4vLi4vbWFwL3NoYXJlZC9tYXAudXRpbHMnO1xyXG5pbXBvcnQgeyBPc21MaW5rcyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvb3JkaW5hdGVzU2VhcmNoUmVzdWx0Rm9ybWF0dGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlKSB7fVxyXG5cclxuICBmb3JtYXRSZXN1bHQocmVzdWx0OiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4pOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuLyoqXHJcbiAqIENvb3JkaW5hdGVzUmV2ZXJzZSBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb29yZGluYXRlc1JldmVyc2VTZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2VcclxuICBpbXBsZW1lbnRzIFJldmVyc2VTZWFyY2gge1xyXG4gIHN0YXRpYyBpZCA9ICdjb29yZGluYXRlc3JldmVyc2UnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuXHJcbiAgcHJpdmF0ZSBwcm9qZWN0aW9ucztcclxuXHJcbiAgdGl0bGUkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XHJcblxyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudGl0bGUkLmdldFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIEBJbmplY3QoJ3Byb2plY3Rpb25zJykgcHJvamVjdGlvbnM6IFByb2plY3Rpb25bXSxcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5wcm9qZWN0aW9ucyA9IHByb2plY3Rpb25zO1xyXG4gICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlXHJcbiAgICAgIC5nZXQodGhpcy5vcHRpb25zLnRpdGxlKVxyXG4gICAgICAuc3Vic2NyaWJlKHRpdGxlID0+IHRoaXMudGl0bGUkLm5leHQodGl0bGUpKTtcclxuICB9XHJcblxyXG4gIGdldElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gQ29vcmRpbmF0ZXNSZXZlcnNlU2VhcmNoU291cmNlLmlkO1xyXG4gIH1cclxuXHJcbiAgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIENvb3JkaW5hdGVzUmV2ZXJzZVNlYXJjaFNvdXJjZS50eXBlO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdpZ28uZ2VvLnNlYXJjaC5jb29yZGluYXRlcy5uYW1lJyxcclxuICAgICAgb3JkZXI6IDEsXHJcbiAgICAgIHNob3dJblNldHRpbmdzOiBmYWxzZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBhIGxvY2F0aW9uIGJ5IGNvb3JkaW5hdGVzXHJcbiAgICogQHBhcmFtIGxvbkxhdCBMb2NhdGlvbiBjb29yZGluYXRlc1xyXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBTZWFyY2ggcmFpZHVzIGFyb3VuZCBsb25MYXRcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIDxTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXVxyXG4gICAqL1xyXG4gIHJldmVyc2VTZWFyY2goXHJcbiAgICBsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0sXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdPiB7XHJcbiAgICByZXR1cm4gb2YoW3RoaXMuZGF0YVRvUmVzdWx0KGxvbkxhdCldKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KGRhdGE6IFtudW1iZXIsIG51bWJlcl0pOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgY29uc3QgY29udmVydGVkQ29vcmQgPSBsb25MYXRDb252ZXJzaW9uKGRhdGEsIHRoaXMucHJvamVjdGlvbnMpO1xyXG4gICAgY29uc3QgY29vcmRzID0gY29udmVydGVkQ29vcmQucmVkdWNlKChvYmosIGl0ZW0pID0+IChcclxuICAgICAgb2JqW2l0ZW0uYWxpYXNdID0gaXRlbS5pZ28yQ29vcmRGb3JtYXQsIG9iaiksIHt9KTtcclxuXHJcbiAgICBjb25zdCByb3VuZGVkQ29vcmRTdHJpbmcgPSByb3VuZENvb3JkVG8oZGF0YSwgNikuam9pbignLCAnKTtcclxuXHJcbiAgICBjb25zdCBjb29yZEtleSA9ICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5zZWFyY2guY29vcmRpbmF0ZXMuY29vcmQnKTtcclxuICAgIGNvbnN0IGNvb3JkTG9uTGF0ID0ge307XHJcbiAgICBjb29yZExvbkxhdFtjb29yZEtleV0gPSByb3VuZGVkQ29vcmRTdHJpbmc7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICBnZW9tZXRyeToge1xyXG4gICAgICAgICAgdHlwZTogJ1BvaW50JyxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBbZGF0YVswXSwgZGF0YVsxXV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGV4dGVudDogdW5kZWZpbmVkLFxyXG4gICAgICAgIHByb3BlcnRpZXM6IE9iamVjdC5hc3NpZ24oe30sXHJcbiAgICAgICAgICBjb29yZExvbkxhdCxcclxuICAgICAgICAgIGNvb3JkcyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgR29vZ2xlTWFwczogR29vZ2xlTGlua3MuZ2V0R29vZ2xlTWFwc0xpbmsoZGF0YVswXSwgZGF0YVsxXSksXHJcbiAgICAgICAgICAgIEdvb2dsZVN0cmVldFZpZXc6IEdvb2dsZUxpbmtzLmdldEdvb2dsZVN0cmVldFZpZXdMaW5rKFxyXG4gICAgICAgICAgICAgIGRhdGFbMF0sXHJcbiAgICAgICAgICAgICAgZGF0YVsxXVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBPcGVuU3RyZWV0TWFwOiBPc21MaW5rcy5nZXRPcGVuU3RyZWV0TWFwTGluayhkYXRhWzBdLCBkYXRhWzFdLCAxNClcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIGlkOiBkYXRhWzBdLnRvU3RyaW5nKCkgKyAnLCcgKyBkYXRhWzFdLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICB0aXRsZTogcm91bmRlZENvb3JkU3RyaW5nXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgaWQ6IGRhdGFbMF0udG9TdHJpbmcoKSArICcsJyArIGRhdGFbMV0udG9TdHJpbmcoKSxcclxuICAgICAgICB0aXRsZTogcm91bmRlZENvb3JkU3RyaW5nLFxyXG4gICAgICAgIGljb246ICdtYXAtbWFya2VyJ1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=