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
export class SearchResultsItemComponent {
    constructor() {
        /**
         * Whether there should be a zoom button
         */
        this.withZoomButton = false;
        this.zoomEvent = new EventEmitter();
        this.format = new olFormatGeoJSON();
    }
    /**
     * @return {?}
     */
    get title() {
        return getEntityTitle(this.result);
    }
    /**
     * Search result HTML title
     * \@internal
     * @return {?}
     */
    get titleHtml() {
        return getEntityTitleHtml(this.result);
    }
    /**
     * Search result tooltip
     * \@internal
     * @return {?}
     */
    get tooltipHtml() {
        return this.titleHtml
            .replace(/<small?[^>]+(>|$)/g, '\n')
            .replace(/<\/?[^>]+(>|$)/g, '');
    }
    /**
     * Search result icon
     * \@internal
     * @return {?}
     */
    get icon() {
        return getEntityIcon(this.result);
    }
    /**
     * @return {?}
     */
    onZoomHandler() {
        /** @type {?} */
        const olFeature = this.format.readFeature(this.result.data, {
            dataProjection: this.result.data.projection,
            featureProjection: this.map.projection
        });
        moveToOlFeatures(this.map, [olFeature], FeatureMotion.Default);
    }
}
SearchResultsItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-results-item',
                template: "<mat-list-item>\r\n  <mat-icon *ngIf=\"icon\" mat-list-avatar svgIcon=\"{{showIcons ? icon : 'blank'}}\"></mat-icon>\r\n\r\n  <h4 matLine *ngIf=\"titleHtml\" [innerHtml]=\"titleHtml\" matTooltipShowDelay=\"500\" [matTooltip]=\"tooltipHtml\" matTooltipClass=\"search-result-tooltip\"></h4>\r\n  <h4 matLine *ngIf=\"!titleHtml\" matTooltipShowDelay=\"500\" [matTooltip]=\"title\">{{title}}</h4>\r\n\r\n  <button *ngIf=\"withZoomButton\"\r\n    igoStopPropagation\r\n    mat-icon-button\r\n    (click)=\"onZoomHandler()\">\r\n    <mat-icon svgIcon=\"magnify\"></mat-icon>\r\n  </button>\r\n\r\n  <ng-content\r\n    select=[igoSearchItemToolbar]>\r\n  </ng-content>\r\n\r\n</mat-list-item>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host ::ng-deep small{color:#8c8c8c}::ng-deep .search-result-tooltip{white-space:pre-line}"]
            }] }
];
/** @nocollapse */
SearchResultsItemComponent.ctorParameters = () => [];
SearchResultsItemComponent.propDecorators = {
    result: [{ type: Input }],
    map: [{ type: Input }],
    showIcons: [{ type: Input }],
    withZoomButton: [{ type: Input }],
    zoomEvent: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sZUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBRWhELE9BQU8sRUFDTCxjQUFjLEVBQ2Qsa0JBQWtCLEVBQ2xCLGFBQWEsRUFDZCxNQUFNLGNBQWMsQ0FBQztBQUd0QixPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7QUFXbkMsTUFBTSxPQUFPLDBCQUEwQjtJQXlEckM7Ozs7UUFwQ1MsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFdEIsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFFMUMsV0FBTSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7SUFnQ3hCLENBQUM7Ozs7SUE5QmhCLElBQUksS0FBSztRQUNQLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7SUFNRCxJQUFJLFNBQVM7UUFDWCxPQUFPLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7Ozs7SUFNRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxTQUFTO2FBQ2xCLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUM7YUFDbkMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQU1ELElBQUksSUFBSTtRQUNOLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7O0lBSUQsYUFBYTs7Y0FDTCxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDMUQsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVU7WUFDM0MsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVO1NBQ3ZDLENBQUM7UUFDRixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7OztZQXZFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsNnJCQUFtRDtnQkFFbkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7OztxQkFLRSxLQUFLO2tCQUVMLEtBQUs7d0JBVUwsS0FBSzs2QkFLTCxLQUFLO3dCQUVMLE1BQU07Ozs7Ozs7SUFuQlAsNENBQThCOztJQUU5Qix5Q0FBcUI7Ozs7O0lBVXJCLCtDQUE0Qjs7Ozs7SUFLNUIsb0RBQWdDOztJQUVoQywrQ0FBa0Q7Ozs7O0lBRWxELDRDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgb2xGb3JtYXRHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcclxuXHJcbmltcG9ydCB7XHJcbiAgZ2V0RW50aXR5VGl0bGUsXHJcbiAgZ2V0RW50aXR5VGl0bGVIdG1sLFxyXG4gIGdldEVudGl0eUljb25cclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRmVhdHVyZU1vdGlvbiwgbW92ZVRvT2xGZWF0dXJlcyB9IGZyb20gJy4uLy4uL2ZlYXR1cmUnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5cclxuLyoqXHJcbiAqIFNlYXJjaCByZXN1bHRzIGxpc3QgaXRlbVxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc2VhcmNoLXJlc3VsdHMtaXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1yZXN1bHRzLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaC1yZXN1bHRzLWl0ZW0uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0c0l0ZW1Db21wb25lbnQge1xyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHQgaXRlbVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJlc3VsdDogU2VhcmNoUmVzdWx0O1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdCB0aXRsZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiB0byBzaG93IGhpZGUgcmVzdWx0cyBpY29uc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dJY29uczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGVyZSBzaG91bGQgYmUgYSB6b29tIGJ1dHRvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdpdGhab29tQnV0dG9uID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoKSB6b29tRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIHByaXZhdGUgZm9ybWF0ID0gbmV3IG9sRm9ybWF0R2VvSlNPTigpO1xyXG5cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRFbnRpdHlUaXRsZSh0aGlzLnJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0IEhUTUwgdGl0bGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgdGl0bGVIdG1sKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5VGl0bGVIdG1sKHRoaXMucmVzdWx0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCByZXN1bHQgdG9vbHRpcFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCB0b29sdGlwSHRtbCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudGl0bGVIdG1sXHJcbiAgICAgIC5yZXBsYWNlKC88c21hbGw/W14+XSsoPnwkKS9nLCAnXFxuJylcclxuICAgICAgLnJlcGxhY2UoLzxcXC8/W14+XSsoPnwkKS9nLCAnJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggcmVzdWx0IGljb25cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgaWNvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGdldEVudGl0eUljb24odGhpcy5yZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBvblpvb21IYW5kbGVyKCkge1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlID0gdGhpcy5mb3JtYXQucmVhZEZlYXR1cmUodGhpcy5yZXN1bHQuZGF0YSwge1xyXG4gICAgICBkYXRhUHJvamVjdGlvbjogdGhpcy5yZXN1bHQuZGF0YS5wcm9qZWN0aW9uLFxyXG4gICAgICBmZWF0dXJlUHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvblxyXG4gICAgfSk7XHJcbiAgICBtb3ZlVG9PbEZlYXR1cmVzKHRoaXMubWFwLCBbb2xGZWF0dXJlXSwgRmVhdHVyZU1vdGlvbi5EZWZhdWx0KTtcclxuICB9XHJcbn1cclxuIl19