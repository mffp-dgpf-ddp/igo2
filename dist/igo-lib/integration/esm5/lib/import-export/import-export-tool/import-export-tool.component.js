/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ToolComponent } from '@igo2/common';
import { MapState } from '../../map/map.state';
var ImportExportToolComponent = /** @class */ (function () {
    function ImportExportToolComponent(mapState) {
        this.mapState = mapState;
    }
    Object.defineProperty(ImportExportToolComponent.prototype, "map", {
        /**
         * Map to measure on
         * @internal
         */
        get: /**
         * Map to measure on
         * \@internal
         * @return {?}
         */
        function () { return this.mapState.map; },
        enumerable: true,
        configurable: true
    });
    ImportExportToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-import-export-tool',
                    template: "<igo-import-export [map]=\"map\"></igo-import-export>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    ImportExportToolComponent.ctorParameters = function () { return [
        { type: MapState }
    ]; };
    ImportExportToolComponent = tslib_1.__decorate([
        ToolComponent({
            name: 'importExport',
            title: 'igo.integration.tools.importExport',
            icon: 'file-move'
        }),
        tslib_1.__metadata("design:paramtypes", [MapState])
    ], ImportExportToolComponent);
    return ImportExportToolComponent;
}());
export { ImportExportToolComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ImportExportToolComponent.prototype.mapState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC10b29sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL2ltcG9ydC1leHBvcnQvaW1wb3J0LWV4cG9ydC10b29sL2ltcG9ydC1leHBvcnQtdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQW1CN0MsbUNBQ1UsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUN6QixDQUFDO0lBSkosc0JBQUksMENBQUc7UUFKUDs7O1dBR0c7Ozs7OztRQUNILGNBQW9CLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTs7Z0JBVmhELFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxxRUFBa0Q7b0JBQ2xELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFYUSxRQUFROztJQVlKLHlCQUF5QjtRQVZyQyxhQUFhLENBQUM7WUFDYixJQUFJLEVBQUUsY0FBYztZQUNwQixLQUFLLEVBQUUsb0NBQW9DO1lBQzNDLElBQUksRUFBRSxXQUFXO1NBQ2xCLENBQUM7aURBY29CLFFBQVE7T0FSakIseUJBQXlCLENBV3JDO0lBQUQsZ0NBQUM7Q0FBQSxJQUFBO1NBWFkseUJBQXlCOzs7Ozs7SUFRbEMsNkNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgVG9vbENvbXBvbmVudCB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgeyBNYXBTdGF0ZSB9IGZyb20gJy4uLy4uL21hcC9tYXAuc3RhdGUnO1xyXG5cclxuQFRvb2xDb21wb25lbnQoe1xyXG4gIG5hbWU6ICdpbXBvcnRFeHBvcnQnLFxyXG4gIHRpdGxlOiAnaWdvLmludGVncmF0aW9uLnRvb2xzLmltcG9ydEV4cG9ydCcsXHJcbiAgaWNvbjogJ2ZpbGUtbW92ZSdcclxufSlcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28taW1wb3J0LWV4cG9ydC10b29sJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vaW1wb3J0LWV4cG9ydC10b29sLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW1wb3J0RXhwb3J0VG9vbENvbXBvbmVudCB7XHJcbiAgLyoqXHJcbiAgICogTWFwIHRvIG1lYXN1cmUgb25cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgbWFwKCk6IElnb01hcCB7IHJldHVybiB0aGlzLm1hcFN0YXRlLm1hcDsgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWFwU3RhdGU6IE1hcFN0YXRlXHJcbiAgKSB7fVxyXG5cclxufVxyXG4iXX0=