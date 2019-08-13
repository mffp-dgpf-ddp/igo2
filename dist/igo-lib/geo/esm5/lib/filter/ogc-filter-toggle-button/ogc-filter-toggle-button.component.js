/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { OgcFilterWriter } from '../../filter/shared/ogc-filter';
import { IgoMap } from '../../map';
import { OGCFilterService } from '../shared/ogc-filter.service';
var OgcFilterToggleButtonComponent = /** @class */ (function () {
    function OgcFilterToggleButtonComponent(ogcFilterService) {
        this.ogcFilterService = ogcFilterService;
        this.color = 'primary';
        this.pushButtonBundle = [];
        this.ogcFilterWriter = new OgcFilterWriter();
    }
    /**
     * @return {?}
     */
    OgcFilterToggleButtonComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.datasource.options.ogcFilters &&
            this.datasource.options.ogcFilters.pushButtons) {
            this.pushButtonBundle = (/** @type {?} */ (this.datasource.options.ogcFilters.pushButtons));
        }
        this.applyFilters();
    };
    /**
     * @param {?} pb
     * @return {?}
     */
    OgcFilterToggleButtonComponent.prototype.getToolTip = /**
     * @param {?} pb
     * @return {?}
     */
    function (pb) {
        /** @type {?} */
        var tt;
        if (pb.tooltip) {
            tt = pb.tooltip;
        }
        return tt || '';
    };
    /**
     * @param {?} pb
     * @return {?}
     */
    OgcFilterToggleButtonComponent.prototype.getButtonColor = /**
     * @param {?} pb
     * @return {?}
     */
    function (pb) {
        /** @type {?} */
        var styles;
        if (pb.color) {
            styles = {
                'background-color': pb.enabled ? "rgba(" + pb.color + ")" : "rgba(255,255,255,0)",
            };
        }
        return styles;
    };
    /**
     * @param {?} bundle
     * @return {?}
     */
    OgcFilterToggleButtonComponent.prototype.bundleIsVertical = /**
     * @param {?} bundle
     * @return {?}
     */
    function (bundle) {
        return bundle.vertical ? bundle.vertical : false;
    };
    /**
     * @param {?=} currentOgcPushButton
     * @return {?}
     */
    OgcFilterToggleButtonComponent.prototype.applyFilters = /**
     * @param {?=} currentOgcPushButton
     * @return {?}
     */
    function (currentOgcPushButton) {
        if (currentOgcPushButton) {
            currentOgcPushButton.enabled = !currentOgcPushButton.enabled;
        }
        /** @type {?} */
        var filterQueryString = '';
        /** @type {?} */
        var conditions = [];
        this.pushButtonBundle.map((/**
         * @param {?} buttonBundle
         * @return {?}
         */
        function (buttonBundle) {
            /** @type {?} */
            var bundleCondition = [];
            buttonBundle.ogcPushButtons
                .filter((/**
             * @param {?} ogcpb
             * @return {?}
             */
            function (ogcpb) { return ogcpb.enabled === true; }))
                .forEach((/**
             * @param {?} enabledPb
             * @return {?}
             */
            function (enabledPb) { return bundleCondition.push(enabledPb.filters); }));
            if (bundleCondition.length >= 1) {
                if (bundleCondition.length === 1) {
                    conditions.push(bundleCondition[0]);
                }
                else {
                    conditions.push({ logical: buttonBundle.logical, filters: bundleCondition });
                }
            }
        }));
        if (conditions.length >= 1) {
            filterQueryString = this.ogcFilterWriter
                .buildFilter(conditions.length === 1 ?
                conditions[0] : (/** @type {?} */ ({ logical: 'And', filters: conditions })));
        }
        if (this.datasource.options.type === 'wms') {
            this.ogcFilterService.filterByOgc((/** @type {?} */ (this.datasource)), filterQueryString);
        }
        if (this.datasource.options.type === 'wfs') {
            // TODO: Check how to prevent wfs to refresh when filter icon is pushed...
            this.datasource.ol.clear();
        }
    };
    OgcFilterToggleButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-ogc-filter-toggle-button',
                    template: "<ng-container *ngFor=\"let bundle of pushButtonBundle\">\r\n        <mat-button-toggle-group appearance=\"legacy\" vertical={{bundleIsVertical(bundle)}} multiple=\"true\">\r\n            <mat-button-toggle [ngStyle]=\"getButtonColor(ogcPushButton)\" [checked]=\"ogcPushButton.enabled\"\r\n                (change)=\"applyFilters(ogcPushButton)\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n                [matTooltip]=\"getToolTip(ogcPushButton)\" *ngFor=\"let ogcPushButton of bundle.ogcPushButtons\"\r\n                [value]=\"ogcPushButton\">{{ogcPushButton.title}}\r\n            </mat-button-toggle>\r\n        </mat-button-toggle-group>\r\n</ng-container>\r\n",
                    styles: [".mat-button-toggle-checked{font-weight:700}.mat-button-toggle-group{margin:5px;flex-wrap:wrap}"]
                }] }
    ];
    /** @nocollapse */
    OgcFilterToggleButtonComponent.ctorParameters = function () { return [
        { type: OGCFilterService }
    ]; };
    OgcFilterToggleButtonComponent.propDecorators = {
        refreshFilters: [{ type: Input }],
        datasource: [{ type: Input }],
        map: [{ type: Input }]
    };
    return OgcFilterToggleButtonComponent;
}());
export { OgcFilterToggleButtonComponent };
if (false) {
    /** @type {?} */
    OgcFilterToggleButtonComponent.prototype.refreshFilters;
    /** @type {?} */
    OgcFilterToggleButtonComponent.prototype.datasource;
    /** @type {?} */
    OgcFilterToggleButtonComponent.prototype.map;
    /**
     * @type {?}
     * @private
     */
    OgcFilterToggleButtonComponent.prototype.ogcFilterWriter;
    /** @type {?} */
    OgcFilterToggleButtonComponent.prototype.color;
    /** @type {?} */
    OgcFilterToggleButtonComponent.prototype.pushButtonBundle;
    /**
     * @type {?}
     * @private
     */
    OgcFilterToggleButtonComponent.prototype.ogcFilterService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci10b2dnbGUtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvb2djLWZpbHRlci10b2dnbGUtYnV0dG9uL29nYy1maWx0ZXItdG9nZ2xlLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVOLE1BQU0sZUFBZSxDQUFDO0FBU3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBR2hFO0lBaUJFLHdDQUNVLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBSnJDLFVBQUssR0FBRyxTQUFTLENBQUM7UUFDbEIscUJBQWdCLEdBQTBCLEVBQUUsQ0FBQztRQUtsRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7SUFDL0MsQ0FBQzs7OztJQUVELGlEQUFROzs7SUFBUjtRQUVFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVTtZQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO1lBQzlDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxtQkFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUF5QixDQUFDO1NBQ25HO1FBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRXRCLENBQUM7Ozs7O0lBRUQsbURBQVU7Ozs7SUFBVixVQUFXLEVBQWlCOztZQUN0QixFQUFFO1FBQ04sSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO1lBQ2QsRUFBRSxH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OztJQThFUixxQ0FBQztDQUFBLEFBekZELElBeUZDO1NBcEZZLDhCQUE4Qjs7O0lBRXpDLHdEQUFvQzs7SUFFcEMsb0RBQTZDOztJQUU3Qyw2Q0FBcUI7Ozs7O0lBRXJCLHlEQUF5Qzs7SUFDekMsK0NBQXlCOztJQUN6QiwwREFBb0Q7Ozs7O0lBR2xELDBEQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSxcclxuICBJZ29PZ2NGaWx0ZXJPYmplY3QsXHJcbiAgT2djUHVzaEJ1dHRvbixcclxuICBPZ2NQdXNoQnV0dG9uQnVuZGxlXHJcblxyXG59IGZyb20gJy4uLy4uL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIgfSBmcm9tICcuLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBPR0NGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL29nYy1maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFdNU0RhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93bXMtZGF0YXNvdXJjZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1vZ2MtZmlsdGVyLXRvZ2dsZS1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vZ2MtZmlsdGVyLXRvZ2dsZS1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL29nYy1maWx0ZXItdG9nZ2xlLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZ2NGaWx0ZXJUb2dnbGVCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSByZWZyZXNoRmlsdGVyczogKCkgPT4gdm9pZDtcclxuXHJcbiAgQElucHV0KCkgZGF0YXNvdXJjZTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2U7XHJcblxyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICBwcml2YXRlIG9nY0ZpbHRlcldyaXRlcjogT2djRmlsdGVyV3JpdGVyO1xyXG4gIHB1YmxpYyBjb2xvciA9ICdwcmltYXJ5JztcclxuICBwdWJsaWMgcHVzaEJ1dHRvbkJ1bmRsZTogT2djUHVzaEJ1dHRvbkJ1bmRsZVtdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBvZ2NGaWx0ZXJTZXJ2aWNlOiBPR0NGaWx0ZXJTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLm9nY0ZpbHRlcldyaXRlciA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG5cclxuICAgIGlmICh0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzICYmXHJcbiAgICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMucHVzaEJ1dHRvbnMpIHtcclxuICAgICAgICB0aGlzLnB1c2hCdXR0b25CdW5kbGUgPSB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLnB1c2hCdXR0b25zIGFzIE9nY1B1c2hCdXR0b25CdW5kbGVbXTtcclxuICAgIH1cclxuICAgIHRoaXMuYXBwbHlGaWx0ZXJzKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgZ2V0VG9vbFRpcChwYjogT2djUHVzaEJ1dHRvbik6IHN0cmluZyAge1xyXG4gICAgbGV0IHR0O1xyXG4gICAgaWYgKHBiLnRvb2x0aXApIHtcclxuICAgICAgdHQgPSBwYi50b29sdGlwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHR0IHx8ICcnO1xyXG4gIH1cclxuXHJcbiAgZ2V0QnV0dG9uQ29sb3IocGI6IE9nY1B1c2hCdXR0b24pOiB7fSB7XHJcblxyXG4gICAgbGV0IHN0eWxlcztcclxuICAgIGlmIChwYi5jb2xvcikge1xyXG4gICAgICBzdHlsZXMgPSB7XHJcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBwYi5lbmFibGVkID8gYHJnYmEoJHtwYi5jb2xvcn0pYCA6IGByZ2JhKDI1NSwyNTUsMjU1LDApYCxcclxuXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3R5bGVzO1xyXG4gIH1cclxuXHJcbiAgYnVuZGxlSXNWZXJ0aWNhbChidW5kbGU6IE9nY1B1c2hCdXR0b25CdW5kbGUpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBidW5kbGUudmVydGljYWwgPyBidW5kbGUudmVydGljYWwgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGFwcGx5RmlsdGVycyhjdXJyZW50T2djUHVzaEJ1dHRvbj86IE9nY1B1c2hCdXR0b24pIHtcclxuICAgIGlmIChjdXJyZW50T2djUHVzaEJ1dHRvbikge1xyXG4gICAgICBjdXJyZW50T2djUHVzaEJ1dHRvbi5lbmFibGVkID0gIWN1cnJlbnRPZ2NQdXNoQnV0dG9uLmVuYWJsZWQ7XHJcbiAgICB9XHJcbiAgICBsZXQgZmlsdGVyUXVlcnlTdHJpbmcgPSAnJztcclxuICAgIGNvbnN0IGNvbmRpdGlvbnMgPSBbXTtcclxuICAgIHRoaXMucHVzaEJ1dHRvbkJ1bmRsZS5tYXAoYnV0dG9uQnVuZGxlID0+IHtcclxuICAgICAgY29uc3QgYnVuZGxlQ29uZGl0aW9uID0gW107XHJcbiAgICAgIGJ1dHRvbkJ1bmRsZS5vZ2NQdXNoQnV0dG9uc1xyXG4gICAgICAuZmlsdGVyKG9nY3BiID0+IG9nY3BiLmVuYWJsZWQgPT09IHRydWUpXHJcbiAgICAgIC5mb3JFYWNoKGVuYWJsZWRQYiA9PiBidW5kbGVDb25kaXRpb24ucHVzaChlbmFibGVkUGIuZmlsdGVycykpO1xyXG4gICAgICBpZiAoYnVuZGxlQ29uZGl0aW9uLmxlbmd0aCA+PSAxICkge1xyXG4gICAgICAgIGlmIChidW5kbGVDb25kaXRpb24ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICBjb25kaXRpb25zLnB1c2goYnVuZGxlQ29uZGl0aW9uWzBdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uZGl0aW9ucy5wdXNoKHtsb2dpY2FsOiBidXR0b25CdW5kbGUubG9naWNhbCwgZmlsdGVyczogYnVuZGxlQ29uZGl0aW9ufSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChjb25kaXRpb25zLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgIGZpbHRlclF1ZXJ5U3RyaW5nID0gdGhpcy5vZ2NGaWx0ZXJXcml0ZXJcclxuICAgICAgICAuYnVpbGRGaWx0ZXIoY29uZGl0aW9ucy5sZW5ndGggPT09IDEgP1xyXG4gICAgICAgICAgY29uZGl0aW9uc1swXSA6IHtsb2dpY2FsOiAnQW5kJywgZmlsdGVyczogY29uZGl0aW9ucyB9IGFzIElnb09nY0ZpbHRlck9iamVjdCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMudHlwZSA9PT0gJ3dtcycpIHtcclxuICAgICAgdGhpcy5vZ2NGaWx0ZXJTZXJ2aWNlLmZpbHRlckJ5T2djKHRoaXMuZGF0YXNvdXJjZSBhcyBXTVNEYXRhU291cmNlLCBmaWx0ZXJRdWVyeVN0cmluZyApO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnR5cGUgPT09ICd3ZnMnKSB7XHJcbiAgICAgIC8vIFRPRE86IENoZWNrIGhvdyB0byBwcmV2ZW50IHdmcyB0byByZWZyZXNoIHdoZW4gZmlsdGVyIGljb24gaXMgcHVzaGVkLi4uXHJcbiAgICAgIHRoaXMuZGF0YXNvdXJjZS5vbC5jbGVhcigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=