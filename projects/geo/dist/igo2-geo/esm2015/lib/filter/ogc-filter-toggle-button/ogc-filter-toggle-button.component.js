/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { OgcFilterWriter } from '../../filter/shared/ogc-filter';
import { IgoMap } from '../../map';
import { OGCFilterService } from '../shared/ogc-filter.service';
export class OgcFilterToggleButtonComponent {
    /**
     * @param {?} ogcFilterService
     */
    constructor(ogcFilterService) {
        this.ogcFilterService = ogcFilterService;
        this.color = 'primary';
        this.ogcFilterWriter = new OgcFilterWriter();
    }
    /**
     * @return {?}
     */
    getPushButtonsGroups() {
        return this.datasource.options.ogcFilters.pushButtons.groups;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.datasource.options.ogcFilters &&
            this.datasource.options.ogcFilters.pushButtons) {
            this.currentPushButtonGroup =
                this.datasource.options.ogcFilters.pushButtons.groups.find((/**
                 * @param {?} g
                 * @return {?}
                 */
                g => g.enabled)) ||
                    this.datasource.options.ogcFilters.pushButtons.groups[0];
        }
        this.applyFilters();
    }
    /**
     * @param {?} pb
     * @return {?}
     */
    getToolTip(pb) {
        /** @type {?} */
        let tt;
        if (pb.tooltip) {
            if (Array.isArray(pb.tooltip)) {
                tt = pb.tooltip.join('\n');
            }
            else {
                tt = pb.tooltip;
            }
        }
        return tt || '';
    }
    /**
     * @param {?} pb
     * @return {?}
     */
    getButtonColor(pb) {
        /** @type {?} */
        let styles;
        if (pb.color) {
            styles = {
                'background-color': pb.enabled ? `rgba(${pb.color})` : `rgba(255,255,255,0)`,
            };
        }
        return styles;
    }
    /**
     * @param {?} bundle
     * @return {?}
     */
    bundleIsVertical(bundle) {
        return bundle.vertical ? bundle.vertical : false;
    }
    /**
     * @return {?}
     */
    onChangeGroup() {
        this.getPushButtonsGroups().map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.enabled = false));
        this.getPushButtonsGroups().find((/**
         * @param {?} g
         * @return {?}
         */
        g => g === this.currentPushButtonGroup)).enabled = true;
        this.applyFilters();
    }
    /**
     * @param {?=} currentOgcPushButton
     * @return {?}
     */
    applyFilters(currentOgcPushButton) {
        if (currentOgcPushButton) {
            currentOgcPushButton.enabled = !currentOgcPushButton.enabled;
        }
        /** @type {?} */
        let filterQueryString = '';
        /** @type {?} */
        const conditions = [];
        this.currentPushButtonGroup.computedButtons.map((/**
         * @param {?} buttonBundle
         * @return {?}
         */
        buttonBundle => {
            /** @type {?} */
            const bundleCondition = [];
            buttonBundle.buttons
                .filter((/**
             * @param {?} ogcpb
             * @return {?}
             */
            ogcpb => ogcpb.enabled === true))
                .forEach((/**
             * @param {?} enabledPb
             * @return {?}
             */
            enabledPb => bundleCondition.push(enabledPb.filters)));
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
    }
}
OgcFilterToggleButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filter-toggle-button',
                template: "<div *ngIf=\"getPushButtonsGroups().length > 1\">\r\n    <mat-form-field>\r\n      <mat-select tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.legend.selectStyle' | translate\" [(ngModel)]=\"currentPushButtonGroup\"\r\n        (selectionChange)=\"onChangeGroup()\">\r\n        <mat-option *ngFor=\"let pbg of getPushButtonsGroups()\" [value]=\"pbg\">{{pbg.title}}</mat-option>\r\n      </mat-select>\r\n  </mat-form-field>\r\n</div>\r\n<ng-container *ngFor=\"let bundle of currentPushButtonGroup.computedButtons\">\r\n        <mat-button-toggle-group \r\n        class=\"mat-typography\"\r\n        appearance=\"legacy\" vertical={{bundleIsVertical(bundle)}} multiple=\"true\">\r\n            <mat-button-toggle [ngStyle]=\"getButtonColor(ogcPushButton)\" [checked]=\"ogcPushButton.enabled\"\r\n                (change)=\"applyFilters(ogcPushButton)\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n                [matTooltip]=\"getToolTip(ogcPushButton)\" matTooltipClass=\"material-tooltip\" \r\n                *ngFor=\"let ogcPushButton of bundle.buttons\" [value]=\"ogcPushButton\">{{ogcPushButton.title}}\r\n            </mat-button-toggle>\r\n        </mat-button-toggle-group>\r\n</ng-container>\r\n",
                styles: [".mat-button-toggle-group{margin:5px;flex-wrap:wrap}.mat-button-toggle{display:-webkit-inline-box;display:inline-flex}::ng-deep .material-tooltip{white-space:pre-line}"]
            }] }
];
/** @nocollapse */
OgcFilterToggleButtonComponent.ctorParameters = () => [
    { type: OGCFilterService }
];
OgcFilterToggleButtonComponent.propDecorators = {
    refreshFilters: [{ type: Input }],
    datasource: [{ type: Input }],
    map: [{ type: Input }]
};
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
    OgcFilterToggleButtonComponent.prototype.currentPushButtonGroup;
    /**
     * @type {?}
     * @private
     */
    OgcFilterToggleButtonComponent.prototype.ogcFilterService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci10b2dnbGUtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvb2djLWZpbHRlci10b2dnbGUtYnV0dG9uL29nYy1maWx0ZXItdG9nZ2xlLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVOLE1BQU0sZUFBZSxDQUFDO0FBVXZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBUWhFLE1BQU0sT0FBTyw4QkFBOEI7Ozs7SUFZekMsWUFDVSxnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUpyQyxVQUFLLEdBQUcsU0FBUyxDQUFDO1FBTXZCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztJQUMvQyxDQUFDOzs7O0lBRUQsb0JBQW9CO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDL0QsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVU7WUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUNoRCxJQUFJLENBQUMsc0JBQXNCO2dCQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJOzs7O2dCQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBQztvQkFDMUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsRUFBaUI7O1lBQ3RCLEVBQUU7UUFDTixJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM3QixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0wsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDakI7U0FDRjtRQUNELE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxFQUFpQjs7WUFFMUIsTUFBTTtRQUNWLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRTtZQUNaLE1BQU0sR0FBRztnQkFDUCxrQkFBa0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMscUJBQXFCO2FBRTdFLENBQUM7U0FDSDtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsTUFBMkI7UUFDMUMsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbkQsQ0FBQzs7OztJQUVELGFBQWE7UUFFWCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLElBQUk7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsc0JBQXNCLEVBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3hGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxvQkFBb0M7UUFDL0MsSUFBSSxvQkFBb0IsRUFBRTtZQUN4QixvQkFBb0IsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUM7U0FDOUQ7O1lBQ0csaUJBQWlCLEdBQUcsRUFBRTs7Y0FDcEIsVUFBVSxHQUFHLEVBQUU7UUFDckIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxHQUFHOzs7O1FBQUMsWUFBWSxDQUFDLEVBQUU7O2tCQUN2RCxlQUFlLEdBQUcsRUFBRTtZQUMxQixZQUFZLENBQUMsT0FBTztpQkFDbkIsTUFBTTs7OztZQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUM7aUJBQ3ZDLE9BQU87Ozs7WUFBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUM7WUFDL0QsSUFBSSxlQUFlLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRztnQkFDaEMsSUFBSSxlQUFlLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDaEMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDckM7cUJBQU07b0JBQ0wsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUMsQ0FBQyxDQUFDO2lCQUM1RTthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQzFCLGlCQUFpQixHQUFHLElBQUksQ0FBQyxlQUFlO2lCQUNyQyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFzQixDQUFDLENBQUM7U0FDbkY7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxtQkFBQSxJQUFJLENBQUMsVUFBVSxFQUFpQixFQUFFLGlCQUFpQixDQUFFLENBQUM7U0FDekY7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDMUMsMEVBQTBFO1lBQzFFLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7O1lBdkdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsOEJBQThCO2dCQUN4QywrdkNBQXdEOzthQUV6RDs7OztZQVBRLGdCQUFnQjs7OzZCQVV0QixLQUFLO3lCQUVMLEtBQUs7a0JBRUwsS0FBSzs7OztJQUpOLHdEQUFvQzs7SUFFcEMsb0RBQTZDOztJQUU3Qyw2Q0FBcUI7Ozs7O0lBRXJCLHlEQUF5Qzs7SUFDekMsK0NBQXlCOztJQUN6QixnRUFBOEI7Ozs7O0lBRzVCLDBEQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSxcclxuICBJZ29PZ2NGaWx0ZXJPYmplY3QsXHJcbiAgT2djUHVzaEJ1dHRvbixcclxuICBPZ2NQdXNoQnV0dG9uQnVuZGxlLFxyXG4gIFB1c2hCdXR0b25Hcm91cFxyXG5cclxufSBmcm9tICcuLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgT2djRmlsdGVyV3JpdGVyIH0gZnJvbSAnLi4vLi4vZmlsdGVyL3NoYXJlZC9vZ2MtZmlsdGVyJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgT0dDRmlsdGVyU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9vZ2MtZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tb2djLWZpbHRlci10b2dnbGUtYnV0dG9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2djLWZpbHRlci10b2dnbGUtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9vZ2MtZmlsdGVyLXRvZ2dsZS1idXR0b24uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgT2djRmlsdGVyVG9nZ2xlQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQElucHV0KCkgcmVmcmVzaEZpbHRlcnM6ICgpID0+IHZvaWQ7XHJcblxyXG4gIEBJbnB1dCgpIGRhdGFzb3VyY2U6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgcHJpdmF0ZSBvZ2NGaWx0ZXJXcml0ZXI6IE9nY0ZpbHRlcldyaXRlcjtcclxuICBwdWJsaWMgY29sb3IgPSAncHJpbWFyeSc7XHJcbiAgcHVibGljIGN1cnJlbnRQdXNoQnV0dG9uR3JvdXA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBvZ2NGaWx0ZXJTZXJ2aWNlOiBPR0NGaWx0ZXJTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLm9nY0ZpbHRlcldyaXRlciA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKTtcclxuICB9XHJcblxyXG4gIGdldFB1c2hCdXR0b25zR3JvdXBzKCk6IFB1c2hCdXR0b25Hcm91cFtdIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLnB1c2hCdXR0b25zLmdyb3VwcztcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMgJiZcclxuICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5wdXNoQnV0dG9ucykge1xyXG4gICAgICB0aGlzLmN1cnJlbnRQdXNoQnV0dG9uR3JvdXAgPVxyXG4gICAgICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMucHVzaEJ1dHRvbnMuZ3JvdXBzLmZpbmQoZyA9PiBnLmVuYWJsZWQpIHx8XHJcbiAgICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5wdXNoQnV0dG9ucy5ncm91cHNbMF07XHJcbiAgICB9XHJcbiAgICB0aGlzLmFwcGx5RmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG9vbFRpcChwYjogT2djUHVzaEJ1dHRvbik6IHN0cmluZyAge1xyXG4gICAgbGV0IHR0O1xyXG4gICAgaWYgKHBiLnRvb2x0aXApIHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGIudG9vbHRpcCkpIHtcclxuICAgICAgICB0dCA9IHBiLnRvb2x0aXAuam9pbignXFxuJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdHQgPSBwYi50b29sdGlwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHQgfHwgJyc7XHJcbiAgfVxyXG5cclxuICBnZXRCdXR0b25Db2xvcihwYjogT2djUHVzaEJ1dHRvbik6IHt9IHtcclxuXHJcbiAgICBsZXQgc3R5bGVzO1xyXG4gICAgaWYgKHBiLmNvbG9yKSB7XHJcbiAgICAgIHN0eWxlcyA9IHtcclxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHBiLmVuYWJsZWQgPyBgcmdiYSgke3BiLmNvbG9yfSlgIDogYHJnYmEoMjU1LDI1NSwyNTUsMClgLFxyXG5cclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHlsZXM7XHJcbiAgfVxyXG5cclxuICBidW5kbGVJc1ZlcnRpY2FsKGJ1bmRsZTogT2djUHVzaEJ1dHRvbkJ1bmRsZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGJ1bmRsZS52ZXJ0aWNhbCA/IGJ1bmRsZS52ZXJ0aWNhbCA6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2VHcm91cCgpIHtcclxuXHJcbiAgICB0aGlzLmdldFB1c2hCdXR0b25zR3JvdXBzKCkubWFwKGcgPT4gZy5lbmFibGVkID0gZmFsc2UpO1xyXG4gICAgdGhpcy5nZXRQdXNoQnV0dG9uc0dyb3VwcygpLmZpbmQoZyA9PiBnID09PSB0aGlzLmN1cnJlbnRQdXNoQnV0dG9uR3JvdXApLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5hcHBseUZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIGFwcGx5RmlsdGVycyhjdXJyZW50T2djUHVzaEJ1dHRvbj86IE9nY1B1c2hCdXR0b24pIHtcclxuICAgIGlmIChjdXJyZW50T2djUHVzaEJ1dHRvbikge1xyXG4gICAgICBjdXJyZW50T2djUHVzaEJ1dHRvbi5lbmFibGVkID0gIWN1cnJlbnRPZ2NQdXNoQnV0dG9uLmVuYWJsZWQ7XHJcbiAgICB9XHJcbiAgICBsZXQgZmlsdGVyUXVlcnlTdHJpbmcgPSAnJztcclxuICAgIGNvbnN0IGNvbmRpdGlvbnMgPSBbXTtcclxuICAgIHRoaXMuY3VycmVudFB1c2hCdXR0b25Hcm91cC5jb21wdXRlZEJ1dHRvbnMubWFwKGJ1dHRvbkJ1bmRsZSA9PiB7XHJcbiAgICAgIGNvbnN0IGJ1bmRsZUNvbmRpdGlvbiA9IFtdO1xyXG4gICAgICBidXR0b25CdW5kbGUuYnV0dG9uc1xyXG4gICAgICAuZmlsdGVyKG9nY3BiID0+IG9nY3BiLmVuYWJsZWQgPT09IHRydWUpXHJcbiAgICAgIC5mb3JFYWNoKGVuYWJsZWRQYiA9PiBidW5kbGVDb25kaXRpb24ucHVzaChlbmFibGVkUGIuZmlsdGVycykpO1xyXG4gICAgICBpZiAoYnVuZGxlQ29uZGl0aW9uLmxlbmd0aCA+PSAxICkge1xyXG4gICAgICAgIGlmIChidW5kbGVDb25kaXRpb24ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICBjb25kaXRpb25zLnB1c2goYnVuZGxlQ29uZGl0aW9uWzBdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uZGl0aW9ucy5wdXNoKHtsb2dpY2FsOiBidXR0b25CdW5kbGUubG9naWNhbCwgZmlsdGVyczogYnVuZGxlQ29uZGl0aW9ufSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChjb25kaXRpb25zLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgIGZpbHRlclF1ZXJ5U3RyaW5nID0gdGhpcy5vZ2NGaWx0ZXJXcml0ZXJcclxuICAgICAgICAuYnVpbGRGaWx0ZXIoY29uZGl0aW9ucy5sZW5ndGggPT09IDEgP1xyXG4gICAgICAgICAgY29uZGl0aW9uc1swXSA6IHtsb2dpY2FsOiAnQW5kJywgZmlsdGVyczogY29uZGl0aW9ucyB9IGFzIElnb09nY0ZpbHRlck9iamVjdCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMudHlwZSA9PT0gJ3dtcycpIHtcclxuICAgICAgdGhpcy5vZ2NGaWx0ZXJTZXJ2aWNlLmZpbHRlckJ5T2djKHRoaXMuZGF0YXNvdXJjZSBhcyBXTVNEYXRhU291cmNlLCBmaWx0ZXJRdWVyeVN0cmluZyApO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnR5cGUgPT09ICd3ZnMnKSB7XHJcbiAgICAgIC8vIFRPRE86IENoZWNrIGhvdyB0byBwcmV2ZW50IHdmcyB0byByZWZyZXNoIHdoZW4gZmlsdGVyIGljb24gaXMgcHVzaGVkLi4uXHJcbiAgICAgIHRoaXMuZGF0YXNvdXJjZS5vbC5jbGVhcigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=