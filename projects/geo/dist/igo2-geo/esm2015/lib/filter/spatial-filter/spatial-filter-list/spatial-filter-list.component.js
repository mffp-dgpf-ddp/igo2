/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EntityStore } from '@igo2/common';
import { SpatialFilterService } from './../../shared/spatial-filter.service';
import { SpatialFilterQueryType } from './../../shared/spatial-filter.enum';
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
export class SpatialFilterListComponent {
    /**
     * @param {?} spatialFilterService
     */
    constructor(spatialFilterService) {
        this.spatialFilterService = spatialFilterService;
        this.formControl = new FormControl();
        this.zoneChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get store() {
        return this._store;
    }
    /**
     * @param {?} store
     * @return {?}
     */
    set store(store) {
        this._store = store;
    }
    /**
     * @return {?}
     */
    get queryType() {
        return this._queryType;
    }
    /**
     * @param {?} queryType
     * @return {?}
     */
    set queryType(queryType) {
        this.formControl.setValue('');
        this._queryType = queryType;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.formValueChanges$$ = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            if (value.length) {
                this.store.view.filter((/**
                 * @param {?} feature
                 * @return {?}
                 */
                (feature) => {
                    /** @type {?} */
                    const filterNormalized = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    const featureNameNormalized = feature.properties.nom.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return featureNameNormalized.includes(filterNormalized);
                }));
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.formValueChanges$$.unsubscribe();
    }
    /**
     * @param {?=} feature
     * @return {?}
     */
    displayFn(feature) {
        return feature ? feature.properties.nom : undefined;
    }
    /**
     * @param {?} feature
     * @return {?}
     */
    onZoneChange(feature) {
        if (feature && this.queryType) {
            this.spatialFilterService.loadItemById(feature, this.queryType)
                .subscribe((/**
             * @param {?} featureGeom
             * @return {?}
             */
            (featureGeom) => {
                this.selectedZone = featureGeom;
                this.zoneChange.emit(featureGeom);
            }));
        }
    }
}
SpatialFilterListComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-spatial-filter-list',
                template: "<form class=\"form-list\">\r\n    <mat-form-field>\r\n        <input #input type=\"text\" placeholder=\"{{'igo.geo.spatialFilter.listLabel' |\u00A0translate}}\" matInput\r\n        [formControl]=\"formControl\" [matAutocomplete]=\"auto\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\" (optionSelected)=\"onZoneChange($event.option.value)\"\r\n        [displayWith]=\"displayFn\">\r\n            <mat-option *ngFor=\"let entities of this.store.view.all$() | async\" [value]=\"entities\">\r\n                {{entities.properties.nom}}\r\n            </mat-option>\r\n        </mat-autocomplete>\r\n    </mat-form-field>\r\n<form>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mat-form-field{padding:5px;width:95%;margin-left:2px}"]
            }] }
];
/** @nocollapse */
SpatialFilterListComponent.ctorParameters = () => [
    { type: SpatialFilterService }
];
SpatialFilterListComponent.propDecorators = {
    store: [{ type: Input }],
    queryType: [{ type: Input }],
    selectedZone: [{ type: Input }],
    zoneChange: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    SpatialFilterListComponent.prototype._store;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterListComponent.prototype._queryType;
    /** @type {?} */
    SpatialFilterListComponent.prototype.selectedZone;
    /** @type {?} */
    SpatialFilterListComponent.prototype.formControl;
    /** @type {?} */
    SpatialFilterListComponent.prototype.zoneChange;
    /** @type {?} */
    SpatialFilterListComponent.prototype.formValueChanges$$;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterListComponent.prototype.spatialFilterService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhdGlhbC1maWx0ZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3NwYXRpYWwtZmlsdGVyL3NwYXRpYWwtZmlsdGVyLWxpc3Qvc3BhdGlhbC1maWx0ZXItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDNUUsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDTixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUzdDLE1BQU0sT0FBTywwQkFBMEI7Ozs7SUFpRHJDLFlBQW9CLG9CQUEwQztRQUExQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBMUJ2RCxnQkFBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFFN0IsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUF3QmMsQ0FBQzs7OztJQS9DbEUsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBMkI7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7OztJQUdELElBQ0ksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDOzs7OztJQUNELElBQUksU0FBUyxDQUFDLFNBQWlDO1FBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQzlCLENBQUM7Ozs7SUFXRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzFFLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztnQkFBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOzswQkFDM0IsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDOzswQkFDdkYscUJBQXFCLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUM7b0JBQ25ILE9BQU8scUJBQXFCLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQzFELENBQUMsRUFBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLE9BQWlCO1FBQ3pCLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3RELENBQUM7Ozs7O0lBSUQsWUFBWSxDQUFDLE9BQU87UUFDbEIsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM3QixJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2lCQUM5RCxTQUFTOzs7O1lBQUMsQ0FBQyxXQUFvQixFQUFFLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwQyxDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7O1lBakVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyw2b0JBQW1EO2dCQUVuRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFwQlEsb0JBQW9COzs7b0JBdUIxQixLQUFLO3dCQVNMLEtBQUs7MkJBVUwsS0FBSzt5QkFJTCxNQUFNOzs7Ozs7O0lBaEJQLDRDQUFxQzs7Ozs7SUFVckMsZ0RBQTJDOztJQUUzQyxrREFBK0I7O0lBRS9CLGlEQUF1Qzs7SUFFdkMsZ0RBQW1EOztJQUVuRCx3REFBaUM7Ozs7O0lBc0JyQiwwREFBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlTdG9yZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IFNwYXRpYWxGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zaGFyZWQvc3BhdGlhbC1maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNwYXRpYWxGaWx0ZXJRdWVyeVR5cGUgfSBmcm9tICcuLy4uLy4uL3NoYXJlZC9zcGF0aWFsLWZpbHRlci5lbnVtJztcclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uLy4uL2ZlYXR1cmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc3BhdGlhbC1maWx0ZXItbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NwYXRpYWwtZmlsdGVyLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NwYXRpYWwtZmlsdGVyLWxpc3QuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3BhdGlhbEZpbHRlckxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHN0b3JlKCk6IEVudGl0eVN0b3JlPEZlYXR1cmU+IHtcclxuICAgIHJldHVybiB0aGlzLl9zdG9yZTtcclxuICB9XHJcbiAgc2V0IHN0b3JlKHN0b3JlOiBFbnRpdHlTdG9yZTxGZWF0dXJlPikge1xyXG4gICAgdGhpcy5fc3RvcmUgPSBzdG9yZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfc3RvcmU6IEVudGl0eVN0b3JlPEZlYXR1cmU+O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBxdWVyeVR5cGUoKTogU3BhdGlhbEZpbHRlclF1ZXJ5VHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcXVlcnlUeXBlO1xyXG4gIH1cclxuICBzZXQgcXVlcnlUeXBlKHF1ZXJ5VHlwZTogU3BhdGlhbEZpbHRlclF1ZXJ5VHlwZSkge1xyXG4gICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSgnJyk7XHJcbiAgICB0aGlzLl9xdWVyeVR5cGUgPSBxdWVyeVR5cGU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3F1ZXJ5VHlwZTogU3BhdGlhbEZpbHRlclF1ZXJ5VHlwZTtcclxuXHJcbiAgQElucHV0KCkgc2VsZWN0ZWRab25lOiBGZWF0dXJlO1xyXG5cclxuICBwdWJsaWMgZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcclxuXHJcbiAgQE91dHB1dCgpIHpvbmVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEZlYXR1cmU+KCk7XHJcblxyXG4gIGZvcm1WYWx1ZUNoYW5nZXMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZm9ybVZhbHVlQ2hhbmdlcyQkID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICBpZiAodmFsdWUubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZS52aWV3LmZpbHRlcigoZmVhdHVyZSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmlsdGVyTm9ybWFsaXplZCA9IHZhbHVlLnRvTG93ZXJDYXNlKCkubm9ybWFsaXplKCdORkQnKS5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XHJcbiAgICAgICAgICBjb25zdCBmZWF0dXJlTmFtZU5vcm1hbGl6ZWQgPSBmZWF0dXJlLnByb3BlcnRpZXMubm9tLnRvTG93ZXJDYXNlKCkubm9ybWFsaXplKCdORkQnKS5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XHJcbiAgICAgICAgICByZXR1cm4gZmVhdHVyZU5hbWVOb3JtYWxpemVkLmluY2x1ZGVzKGZpbHRlck5vcm1hbGl6ZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5mb3JtVmFsdWVDaGFuZ2VzJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlGbihmZWF0dXJlPzogRmVhdHVyZSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gZmVhdHVyZSA/IGZlYXR1cmUucHJvcGVydGllcy5ub20gOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNwYXRpYWxGaWx0ZXJTZXJ2aWNlOiBTcGF0aWFsRmlsdGVyU2VydmljZSkge31cclxuXHJcbiAgb25ab25lQ2hhbmdlKGZlYXR1cmUpIHtcclxuICAgIGlmIChmZWF0dXJlICYmIHRoaXMucXVlcnlUeXBlKSB7XHJcbiAgICAgIHRoaXMuc3BhdGlhbEZpbHRlclNlcnZpY2UubG9hZEl0ZW1CeUlkKGZlYXR1cmUsIHRoaXMucXVlcnlUeXBlKVxyXG4gICAgICAuc3Vic2NyaWJlKChmZWF0dXJlR2VvbTogRmVhdHVyZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRab25lID0gZmVhdHVyZUdlb207XHJcbiAgICAgICAgdGhpcy56b25lQ2hhbmdlLmVtaXQoZmVhdHVyZUdlb20pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19