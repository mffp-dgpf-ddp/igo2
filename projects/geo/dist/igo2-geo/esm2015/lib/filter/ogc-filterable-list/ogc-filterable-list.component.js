/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IgoMap } from '../../map';
export class OgcFilterableListComponent {
    constructor() { }
}
OgcFilterableListComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filterable-list',
                template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <ng-template ngFor let-layer [ngForOf]=\"layers | filterableDataSource: 'ogc'\">\r\n    <igo-ogc-filterable-item igoListItem [header]=\"true\" [layer]=\"layer\" \r\n    [map]=\"layer.map\" ></igo-ogc-filterable-item>\r\n  </ng-template>\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
OgcFilterableListComponent.ctorParameters = () => [];
OgcFilterableListComponent.propDecorators = {
    layers: [{ type: Input }],
    map: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    OgcFilterableListComponent.prototype.layers;
    /** @type {?} */
    OgcFilterableListComponent.prototype.map;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlcmFibGUtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL29nYy1maWx0ZXJhYmxlLWxpc3Qvb2djLWZpbHRlcmFibGUtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBT25DLE1BQU0sT0FBTywwQkFBMEI7SUFNckMsZ0JBQWUsQ0FBQzs7O1lBWGpCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyx3VUFBbUQ7Z0JBQ25ELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7OztxQkFHRSxLQUFLO2tCQUVMLEtBQUs7Ozs7SUFGTiw0Q0FBeUI7O0lBRXpCLHlDQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tb2djLWZpbHRlcmFibGUtbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL29nYy1maWx0ZXJhYmxlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZ2NGaWx0ZXJhYmxlTGlzdENvbXBvbmVudCB7XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyczogTGF5ZXJbXTtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iXX0=