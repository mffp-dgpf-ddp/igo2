/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { IgoMap } from '../../map';
var OgcFilterableFormComponent = /** @class */ (function () {
    function OgcFilterableFormComponent() {
        this.color = 'primary';
    }
    Object.defineProperty(OgcFilterableFormComponent.prototype, "refreshFunc", {
        get: /**
         * @return {?}
         */
        function () {
            return this.refreshFilters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterableFormComponent.prototype, "advancedOgcFilters", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.datasource.options.ogcFilters) {
                return this.datasource.options.ogcFilters.advancedOgcFilters;
            }
            return;
        },
        enumerable: true,
        configurable: true
    });
    OgcFilterableFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-ogc-filterable-form',
                    template: "<igo-list *ngIf=\"!advancedOgcFilters\" [navigation]=\"false\" [selection]=\"true\">\r\n  <igo-ogc-filter-toggle-button igoListItem [datasource]=\"datasource\" [map]=\"map\" [refreshFilters]=\"refreshFunc\">\r\n  </igo-ogc-filter-toggle-button>\r\n</igo-list>\r\n\r\n<igo-list *ngIf=\"advancedOgcFilters && datasource.options.ogcFilters.editable \" [navigation]=\"false\" [selection]=\"true\">\r\n  <ng-template ngFor let-currentFilter [ngForOf]=\"datasource.options.ogcFilters.interfaceOgcFilters\">\r\n    <igo-ogc-filter-form igoListItem [color]=\"color\" [currentFilter]=\"currentFilter\" [datasource]=\"datasource\"\r\n      [map]=\"map\" [refreshFilters]=\"refreshFunc\">\r\n    </igo-ogc-filter-form>\r\n  </ng-template>\r\n</igo-list>\r\n"
                }] }
    ];
    /** @nocollapse */
    OgcFilterableFormComponent.ctorParameters = function () { return []; };
    OgcFilterableFormComponent.propDecorators = {
        datasource: [{ type: Input }],
        map: [{ type: Input }],
        refreshFilters: [{ type: Input }]
    };
    return OgcFilterableFormComponent;
}());
export { OgcFilterableFormComponent };
if (false) {
    /** @type {?} */
    OgcFilterableFormComponent.prototype.datasource;
    /** @type {?} */
    OgcFilterableFormComponent.prototype.map;
    /** @type {?} */
    OgcFilterableFormComponent.prototype.refreshFilters;
    /** @type {?} */
    OgcFilterableFormComponent.prototype.color;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlcmFibGUtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL29nYy1maWx0ZXJhYmxlLWZvcm0vb2djLWZpbHRlcmFibGUtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkM7SUF5QkU7UUFGTyxVQUFLLEdBQUcsU0FBUyxDQUFDO0lBRVYsQ0FBQztJQWJoQixzQkFBSSxtREFBVzs7OztRQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMERBQWtCOzs7O1FBQXRCO1lBQ0UsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDO2FBQzlEO1lBQ0QsT0FBTztRQUNULENBQUM7OztPQUFBOztnQkFyQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLHN2QkFBbUQ7aUJBQ3BEOzs7Ozs2QkFHRSxLQUFLO3NCQUVMLEtBQUs7aUNBRUwsS0FBSzs7SUFnQlIsaUNBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQXRCWSwwQkFBMEI7OztJQUVyQyxnREFBNkM7O0lBRTdDLHlDQUFxQjs7SUFFckIsb0RBQW9DOztJQWFwQywyQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlIH0gZnJvbSAnLi4vc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW9nYy1maWx0ZXJhYmxlLWZvcm0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vZ2MtZmlsdGVyYWJsZS1mb3JtLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgT2djRmlsdGVyYWJsZUZvcm1Db21wb25lbnQge1xyXG5cclxuICBASW5wdXQoKSBkYXRhc291cmNlOiBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZTtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpIHJlZnJlc2hGaWx0ZXJzOiAoKSA9PiB2b2lkO1xyXG5cclxuICBnZXQgcmVmcmVzaEZ1bmMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWZyZXNoRmlsdGVycztcclxuICB9XHJcblxyXG4gIGdldCBhZHZhbmNlZE9nY0ZpbHRlcnMoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycykge1xyXG4gICAgICByZXR1cm4gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5hZHZhbmNlZE9nY0ZpbHRlcnM7XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29sb3IgPSAncHJpbWFyeSc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iXX0=