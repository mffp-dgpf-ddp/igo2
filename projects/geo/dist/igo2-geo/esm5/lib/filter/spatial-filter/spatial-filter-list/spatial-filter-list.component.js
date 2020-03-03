/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EntityStore } from '@igo2/common';
import { SpatialFilterService } from './../../shared/spatial-filter.service';
import { SpatialFilterQueryType } from './../../shared/spatial-filter.enum';
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
var SpatialFilterListComponent = /** @class */ (function () {
    function SpatialFilterListComponent(spatialFilterService) {
        this.spatialFilterService = spatialFilterService;
        this.formControl = new FormControl();
        this.zoneChange = new EventEmitter();
    }
    Object.defineProperty(SpatialFilterListComponent.prototype, "store", {
        get: /**
         * @return {?}
         */
        function () {
            return this._store;
        },
        set: /**
         * @param {?} store
         * @return {?}
         */
        function (store) {
            this._store = store;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpatialFilterListComponent.prototype, "queryType", {
        get: /**
         * @return {?}
         */
        function () {
            return this._queryType;
        },
        set: /**
         * @param {?} queryType
         * @return {?}
         */
        function (queryType) {
            this.formControl.setValue('');
            this._queryType = queryType;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SpatialFilterListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.formValueChanges$$ = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value.length) {
                _this.store.view.filter((/**
                 * @param {?} feature
                 * @return {?}
                 */
                function (feature) {
                    /** @type {?} */
                    var filterNormalized = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    /** @type {?} */
                    var featureNameNormalized = feature.properties.nom.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return featureNameNormalized.includes(filterNormalized);
                }));
            }
        }));
    };
    /**
     * @return {?}
     */
    SpatialFilterListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.formValueChanges$$.unsubscribe();
    };
    /**
     * @param {?=} feature
     * @return {?}
     */
    SpatialFilterListComponent.prototype.displayFn = /**
     * @param {?=} feature
     * @return {?}
     */
    function (feature) {
        return feature ? feature.properties.nom : undefined;
    };
    /**
     * @param {?} feature
     * @return {?}
     */
    SpatialFilterListComponent.prototype.onZoneChange = /**
     * @param {?} feature
     * @return {?}
     */
    function (feature) {
        var _this = this;
        if (feature && this.queryType) {
            this.spatialFilterService.loadItemById(feature, this.queryType)
                .subscribe((/**
             * @param {?} featureGeom
             * @return {?}
             */
            function (featureGeom) {
                _this.selectedZone = featureGeom;
                _this.zoneChange.emit(featureGeom);
            }));
        }
    };
    SpatialFilterListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-spatial-filter-list',
                    template: "<form class=\"form-list\">\r\n    <mat-form-field>\r\n        <input #input type=\"text\" placeholder=\"{{'igo.geo.spatialFilter.listLabel' |\u00A0translate}}\" matInput\r\n        [formControl]=\"formControl\" [matAutocomplete]=\"auto\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\" (optionSelected)=\"onZoneChange($event.option.value)\"\r\n        [displayWith]=\"displayFn\">\r\n            <mat-option *ngFor=\"let entities of this.store.view.all$() | async\" [value]=\"entities\">\r\n                {{entities.properties.nom}}\r\n            </mat-option>\r\n        </mat-autocomplete>\r\n    </mat-form-field>\r\n<form>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mat-form-field{padding:5px;width:95%;margin-left:2px}"]
                }] }
    ];
    /** @nocollapse */
    SpatialFilterListComponent.ctorParameters = function () { return [
        { type: SpatialFilterService }
    ]; };
    SpatialFilterListComponent.propDecorators = {
        store: [{ type: Input }],
        queryType: [{ type: Input }],
        selectedZone: [{ type: Input }],
        zoneChange: [{ type: Output }]
    };
    return SpatialFilterListComponent;
}());
export { SpatialFilterListComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhdGlhbC1maWx0ZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3NwYXRpYWwtZmlsdGVyL3NwYXRpYWwtZmlsdGVyLWxpc3Qvc3BhdGlhbC1maWx0ZXItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDNUUsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDTixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzdDO0lBdURFLG9DQUFvQixvQkFBMEM7UUFBMUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQTFCdkQsZ0JBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRTdCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBd0JjLENBQUM7SUEvQ2xFLHNCQUNJLDZDQUFLOzs7O1FBRFQ7WUFFRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7Ozs7UUFDRCxVQUFVLEtBQTJCO1lBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUhBO0lBTUQsc0JBQ0ksaURBQVM7Ozs7UUFEYjtZQUVFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDOzs7OztRQUNELFVBQWMsU0FBaUM7WUFDN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDOUIsQ0FBQzs7O09BSkE7Ozs7SUFlRCw2Q0FBUTs7O0lBQVI7UUFBQSxpQkFVQztRQVRDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxLQUFLO1lBQ3RFLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztnQkFBQyxVQUFDLE9BQU87O3dCQUN2QixnQkFBZ0IsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUM7O3dCQUN2RixxQkFBcUIsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQztvQkFDbkgsT0FBTyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDMUQsQ0FBQyxFQUFDLENBQUM7YUFDSjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELGdEQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDOzs7OztJQUVELDhDQUFTOzs7O0lBQVQsVUFBVSxPQUFpQjtRQUN6QixPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN0RCxDQUFDOzs7OztJQUlELGlEQUFZOzs7O0lBQVosVUFBYSxPQUFPO1FBQXBCLGlCQVFDO1FBUEMsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM3QixJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2lCQUM5RCxTQUFTOzs7O1lBQUMsVUFBQyxXQUFvQjtnQkFDOUIsS0FBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7Z0JBQ2hDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztnQkFqRUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLDZvQkFBbUQ7b0JBRW5ELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBcEJRLG9CQUFvQjs7O3dCQXVCMUIsS0FBSzs0QkFTTCxLQUFLOytCQVVMLEtBQUs7NkJBSUwsTUFBTTs7SUFtQ1QsaUNBQUM7Q0FBQSxBQWxFRCxJQWtFQztTQTVEWSwwQkFBMEI7Ozs7OztJQVNyQyw0Q0FBcUM7Ozs7O0lBVXJDLGdEQUEyQzs7SUFFM0Msa0RBQStCOztJQUUvQixpREFBdUM7O0lBRXZDLGdEQUFtRDs7SUFFbkQsd0RBQWlDOzs7OztJQXNCckIsMERBQWtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBTcGF0aWFsRmlsdGVyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2hhcmVkL3NwYXRpYWwtZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTcGF0aWFsRmlsdGVyUXVlcnlUeXBlIH0gZnJvbSAnLi8uLi8uLi9zaGFyZWQvc3BhdGlhbC1maWx0ZXIuZW51bSc7XHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi8uLi9mZWF0dXJlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNwYXRpYWwtZmlsdGVyLWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zcGF0aWFsLWZpbHRlci1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zcGF0aWFsLWZpbHRlci1saXN0LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNwYXRpYWxGaWx0ZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBzdG9yZSgpOiBFbnRpdHlTdG9yZTxGZWF0dXJlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RvcmU7XHJcbiAgfVxyXG4gIHNldCBzdG9yZShzdG9yZTogRW50aXR5U3RvcmU8RmVhdHVyZT4pIHtcclxuICAgIHRoaXMuX3N0b3JlID0gc3RvcmU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3N0b3JlOiBFbnRpdHlTdG9yZTxGZWF0dXJlPjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgcXVlcnlUeXBlKCk6IFNwYXRpYWxGaWx0ZXJRdWVyeVR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3F1ZXJ5VHlwZTtcclxuICB9XHJcbiAgc2V0IHF1ZXJ5VHlwZShxdWVyeVR5cGU6IFNwYXRpYWxGaWx0ZXJRdWVyeVR5cGUpIHtcclxuICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUoJycpO1xyXG4gICAgdGhpcy5fcXVlcnlUeXBlID0gcXVlcnlUeXBlO1xyXG4gIH1cclxuICBwcml2YXRlIF9xdWVyeVR5cGU6IFNwYXRpYWxGaWx0ZXJRdWVyeVR5cGU7XHJcblxyXG4gIEBJbnB1dCgpIHNlbGVjdGVkWm9uZTogRmVhdHVyZTtcclxuXHJcbiAgcHVibGljIGZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XHJcblxyXG4gIEBPdXRwdXQoKSB6b25lQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxGZWF0dXJlPigpO1xyXG5cclxuICBmb3JtVmFsdWVDaGFuZ2VzJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmZvcm1WYWx1ZUNoYW5nZXMkJCA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWUpID0+IHtcclxuICAgICAgaWYgKHZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmUudmlldy5maWx0ZXIoKGZlYXR1cmUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbHRlck5vcm1hbGl6ZWQgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpLm5vcm1hbGl6ZSgnTkZEJykucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICAgICAgY29uc3QgZmVhdHVyZU5hbWVOb3JtYWxpemVkID0gZmVhdHVyZS5wcm9wZXJ0aWVzLm5vbS50b0xvd2VyQ2FzZSgpLm5vcm1hbGl6ZSgnTkZEJykucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICAgICAgcmV0dXJuIGZlYXR1cmVOYW1lTm9ybWFsaXplZC5pbmNsdWRlcyhmaWx0ZXJOb3JtYWxpemVkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZm9ybVZhbHVlQ2hhbmdlcyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5Rm4oZmVhdHVyZT86IEZlYXR1cmUpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIGZlYXR1cmUgPyBmZWF0dXJlLnByb3BlcnRpZXMubm9tIDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzcGF0aWFsRmlsdGVyU2VydmljZTogU3BhdGlhbEZpbHRlclNlcnZpY2UpIHt9XHJcblxyXG4gIG9uWm9uZUNoYW5nZShmZWF0dXJlKSB7XHJcbiAgICBpZiAoZmVhdHVyZSAmJiB0aGlzLnF1ZXJ5VHlwZSkge1xyXG4gICAgICB0aGlzLnNwYXRpYWxGaWx0ZXJTZXJ2aWNlLmxvYWRJdGVtQnlJZChmZWF0dXJlLCB0aGlzLnF1ZXJ5VHlwZSlcclxuICAgICAgLnN1YnNjcmliZSgoZmVhdHVyZUdlb206IEZlYXR1cmUpID0+IHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkWm9uZSA9IGZlYXR1cmVHZW9tO1xyXG4gICAgICAgIHRoaXMuem9uZUNoYW5nZS5lbWl0KGZlYXR1cmVHZW9tKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==