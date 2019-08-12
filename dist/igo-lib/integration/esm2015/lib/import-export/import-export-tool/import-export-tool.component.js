/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ToolComponent } from '@igo2/common';
import { MapState } from '../../map/map.state';
let ImportExportToolComponent = class ImportExportToolComponent {
    /**
     * @param {?} mapState
     */
    constructor(mapState) {
        this.mapState = mapState;
    }
    /**
     * Map to measure on
     * \@internal
     * @return {?}
     */
    get map() { return this.mapState.map; }
};
ImportExportToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-import-export-tool',
                template: "<igo-import-export [map]=\"map\"></igo-import-export>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
ImportExportToolComponent.ctorParameters = () => [
    { type: MapState }
];
ImportExportToolComponent = tslib_1.__decorate([
    ToolComponent({
        name: 'importExport',
        title: 'igo.integration.tools.importExport',
        icon: 'file-move'
    }),
    tslib_1.__metadata("design:paramtypes", [MapState])
], ImportExportToolComponent);
export { ImportExportToolComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ImportExportToolComponent.prototype.mapState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC10b29sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL2ltcG9ydC1leHBvcnQvaW1wb3J0LWV4cG9ydC10b29sL2ltcG9ydC1leHBvcnQtdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0lBWWxDLHlCQUF5QixTQUF6Qix5QkFBeUI7Ozs7SUFPcEMsWUFDVSxRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ3pCLENBQUM7Ozs7OztJQUpKLElBQUksR0FBRyxLQUFhLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBTWhELENBQUE7O1lBaEJBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxxRUFBa0Q7Z0JBQ2xELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBWFEsUUFBUTs7QUFZSix5QkFBeUI7SUFWckMsYUFBYSxDQUFDO1FBQ2IsSUFBSSxFQUFFLGNBQWM7UUFDcEIsS0FBSyxFQUFFLG9DQUFvQztRQUMzQyxJQUFJLEVBQUUsV0FBVztLQUNsQixDQUFDOzZDQWNvQixRQUFRO0dBUmpCLHlCQUF5QixDQVdyQztTQVhZLHlCQUF5Qjs7Ozs7O0lBUWxDLDZDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFRvb2xDb21wb25lbnQgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgTWFwU3RhdGUgfSBmcm9tICcuLi8uLi9tYXAvbWFwLnN0YXRlJztcclxuXHJcbkBUb29sQ29tcG9uZW50KHtcclxuICBuYW1lOiAnaW1wb3J0RXhwb3J0JyxcclxuICB0aXRsZTogJ2lnby5pbnRlZ3JhdGlvbi50b29scy5pbXBvcnRFeHBvcnQnLFxyXG4gIGljb246ICdmaWxlLW1vdmUnXHJcbn0pXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWltcG9ydC1leHBvcnQtdG9vbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ltcG9ydC1leHBvcnQtdG9vbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEltcG9ydEV4cG9ydFRvb2xDb21wb25lbnQge1xyXG4gIC8qKlxyXG4gICAqIE1hcCB0byBtZWFzdXJlIG9uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAgeyByZXR1cm4gdGhpcy5tYXBTdGF0ZS5tYXA7IH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1hcFN0YXRlOiBNYXBTdGF0ZVxyXG4gICkge31cclxuXHJcbn1cclxuIl19