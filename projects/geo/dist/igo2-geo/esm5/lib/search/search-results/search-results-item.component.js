/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import olFormatGeoJSON from 'ol/format/GeoJSON';
import { getEntityTitle, getEntityTitleHtml, getEntityIcon } from '@igo2/common';
import { FeatureMotion, moveToOlFeatures } from '../../feature';
import { IgoMap } from '../../map';
/**
 * Search results list item
 */
var SearchResultsItemComponent = /** @class */ (function () {
    function SearchResultsItemComponent() {
        /**
         * Whether there should be a zoom button
         */
        this.withZoomButton = false;
        this.zoomEvent = new EventEmitter();
        this.format = new olFormatGeoJSON();
    }
    Object.defineProperty(SearchResultsItemComponent.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () {
            return getEntityTitle(this.result);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResultsItemComponent.prototype, "titleHtml", {
        /**
         * Search result HTML title
         * @internal
         */
        get: /**
         * Search result HTML title
         * \@internal
         * @return {?}
         */
        function () {
            return getEntityTitleHtml(this.result);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResultsItemComponent.prototype, "tooltipHtml", {
        /**
         * Search result tooltip
         * @internal
         */
        get: /**
         * Search result tooltip
         * \@internal
         * @return {?}
         */
        function () {
            return this.titleHtml
                .replace(/<small?[^>]+(>|$)/g, '\n')
                .replace(/<\/?[^>]+(>|$)/g, '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResultsItemComponent.prototype, "icon", {
        /**
         * Search result icon
         * @internal
         */
        get: /**
         * Search result icon
         * \@internal
         * @return {?}
         */
        function () {
            return getEntityIcon(this.result);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SearchResultsItemComponent.prototype.onZoomHandler = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var olFeature = this.format.readFeature(this.result.data, {
            dataProjection: this.result.data.projection,
            featureProjection: this.map.projection
        });
        moveToOlFeatures(this.map, [olFeature], FeatureMotion.Default);
    };
    SearchResultsItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-search-results-item',
                    template: "<mat-list-item>\r\n  <mat-icon *ngIf=\"icon\" mat-list-avatar svgIcon=\"{{showIcons ? icon : 'blank'}}\"></mat-icon>\r\n\r\n  <h4 matLine *ngIf=\"titleHtml\" [innerHtml]=\"titleHtml\" matTooltipShowDelay=\"500\" [matTooltip]=\"tooltipHtml\" matTooltipClass=\"search-result-tooltip\"></h4>\r\n  <h4 matLine *ngIf=\"!titleHtml\" matTooltipShowDelay=\"500\" [matTooltip]=\"title\">{{title}}</h4>\r\n\r\n  <button *ngIf=\"withZoomButton\"\r\n    igoStopPropagation\r\n    mat-icon-button\r\n    (click)=\"onZoomHandler()\">\r\n    <mat-icon svgIcon=\"magnify\"></mat-icon>\r\n  </button>\r\n\r\n  <ng-content\r\n    select=[igoSearchItemToolbar]>\r\n  </ng-content>\r\n\r\n</mat-list-item>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host ::ng-deep small{color:#8c8c8c}::ng-deep .search-result-tooltip{white-space:pre-line}"]
                }] }
    ];
    /** @nocollapse */
    SearchResultsItemComponent.ctorParameters = function () { return []; };
    SearchResultsItemComponent.propDecorators = {
        result: [{ type: Input }],
        map: [{ type: Input }],
        showIcons: [{ type: Input }],
        withZoomButton: [{ type: Input }],
        zoomEvent: [{ type: Output }]
    };
    return SearchResultsItemComponent;
}());
export { SearchResultsItemComponent };
if (false) {
    /**
     * Search result item
     * @type {?}
     */
    SearchResultsItemComponent.prototype.result;
    /** @type {?} */
    SearchResultsItemComponent.prototype.map;
    /**
     * to show hide results icons
     * @type {?}
     */
    SearchResultsItemComponent.prototype.showIcons;
    /**
     * Whether there should be a zoom button
     * @type {?}
     */
    SearchResultsItemComponent.prototype.withZoomButton;
    /** @type {?} */
    SearchResultsItemComponent.prototype.zoomEvent;
    /**
     * @type {?}
     * @private
     */
    SearchResultsItemComponent.prototype.format;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sZUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBRWhELE9BQU8sRUFDTCxjQUFjLEVBQ2Qsa0JBQWtCLEVBQ2xCLGFBQWEsRUFDZCxNQUFNLGNBQWMsQ0FBQztBQUd0QixPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7QUFLbkM7SUErREU7Ozs7UUFwQ1MsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFdEIsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFFMUMsV0FBTSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7SUFnQ3hCLENBQUM7SUE5QmhCLHNCQUFJLDZDQUFLOzs7O1FBQVQ7WUFDRSxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFNRCxzQkFBSSxpREFBUztRQUpiOzs7V0FHRzs7Ozs7O1FBQ0g7WUFDRSxPQUFPLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQU1ELHNCQUFJLG1EQUFXO1FBSmY7OztXQUdHOzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVM7aUJBQ2xCLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUM7aUJBQ25DLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTtJQU1ELHNCQUFJLDRDQUFJO1FBSlI7OztXQUdHOzs7Ozs7UUFDSDtZQUNFLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTs7OztJQUlELGtEQUFhOzs7SUFBYjs7WUFDUSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDMUQsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVU7WUFDM0MsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVO1NBQ3ZDLENBQUM7UUFDRixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7O2dCQXZFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsNnJCQUFtRDtvQkFFbkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7Ozs7eUJBS0UsS0FBSztzQkFFTCxLQUFLOzRCQVVMLEtBQUs7aUNBS0wsS0FBSzs0QkFFTCxNQUFNOztJQTJDVCxpQ0FBQztDQUFBLEFBeEVELElBd0VDO1NBbEVZLDBCQUEwQjs7Ozs7O0lBSXJDLDRDQUE4Qjs7SUFFOUIseUNBQXFCOzs7OztJQVVyQiwrQ0FBNEI7Ozs7O0lBSzVCLG9EQUFnQzs7SUFFaEMsK0NBQWtEOzs7OztJQUVsRCw0Q0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IG9sRm9ybWF0R2VvSlNPTiBmcm9tICdvbC9mb3JtYXQvR2VvSlNPTic7XHJcblxyXG5pbXBvcnQge1xyXG4gIGdldEVudGl0eVRpdGxlLFxyXG4gIGdldEVudGl0eVRpdGxlSHRtbCxcclxuICBnZXRFbnRpdHlJY29uXHJcbn0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZlYXR1cmVNb3Rpb24sIG1vdmVUb09sRmVhdHVyZXMgfSBmcm9tICcuLi8uLi9mZWF0dXJlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbi8qKlxyXG4gKiBTZWFyY2ggcmVzdWx0cyBsaXN0IGl0ZW1cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNlYXJjaC1yZXN1bHRzLWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtcmVzdWx0cy1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtcmVzdWx0cy1pdGVtLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaFJlc3VsdHNJdGVtQ29tcG9uZW50IHtcclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0IGl0ZW1cclxuICAgKi9cclxuICBASW5wdXQoKSByZXN1bHQ6IFNlYXJjaFJlc3VsdDtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHQgdGl0bGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuXHJcbiAgLyoqXHJcbiAgICogdG8gc2hvdyBoaWRlIHJlc3VsdHMgaWNvbnNcclxuICAgKi9cclxuICBASW5wdXQoKSBzaG93SWNvbnM6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlcmUgc2hvdWxkIGJlIGEgem9vbSBidXR0b25cclxuICAgKi9cclxuICBASW5wdXQoKSB3aXRoWm9vbUJ1dHRvbiA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KCkgem9vbUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBwcml2YXRlIGZvcm1hdCA9IG5ldyBvbEZvcm1hdEdlb0pTT04oKTtcclxuXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5VGl0bGUodGhpcy5yZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdCBIVE1MIHRpdGxlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlSHRtbCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGdldEVudGl0eVRpdGxlSHRtbCh0aGlzLnJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0IHRvb2x0aXBcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgdG9vbHRpcEh0bWwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnRpdGxlSHRtbFxyXG4gICAgICAucmVwbGFjZSgvPHNtYWxsP1tePl0rKD58JCkvZywgJ1xcbicpXHJcbiAgICAgIC5yZXBsYWNlKC88XFwvP1tePl0rKD58JCkvZywgJycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdCBpY29uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IGljb24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRFbnRpdHlJY29uKHRoaXMucmVzdWx0KTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgb25ab29tSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IG9sRmVhdHVyZSA9IHRoaXMuZm9ybWF0LnJlYWRGZWF0dXJlKHRoaXMucmVzdWx0LmRhdGEsIHtcclxuICAgICAgZGF0YVByb2plY3Rpb246IHRoaXMucmVzdWx0LmRhdGEucHJvamVjdGlvbixcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHRoaXMubWFwLnByb2plY3Rpb25cclxuICAgIH0pO1xyXG4gICAgbW92ZVRvT2xGZWF0dXJlcyh0aGlzLm1hcCwgW29sRmVhdHVyZV0sIEZlYXR1cmVNb3Rpb24uRGVmYXVsdCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==