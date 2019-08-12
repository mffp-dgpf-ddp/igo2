/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ToolComponent } from '@igo2/common';
import { CatalogService } from '@igo2/geo';
import { ToolState } from '../../tool/tool.state';
import { CatalogState } from '../catalog.state';
/**
 * Tool to browse the list of available catalogs.
 */
let CatalogLibraryToolComponent = /**
 * Tool to browse the list of available catalogs.
 */
class CatalogLibraryToolComponent {
    /**
     * @param {?} catalogService
     * @param {?} catalogState
     * @param {?} toolState
     */
    constructor(catalogService, catalogState, toolState) {
        this.catalogService = catalogService;
        this.catalogState = catalogState;
        this.toolState = toolState;
    }
    /**
     * Store that contains the catalogs
     * \@internal
     * @return {?}
     */
    get store() {
        return this.catalogState.catalogStore;
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        if (this.store.entities$.value.length === 0) {
            this.loadCatalogs();
        }
    }
    /**
     * When the selected catalog changes, toggle the the CatalogBrowser tool.
     * \@internal
     * @param {?} event Select event
     * @return {?}
     */
    onCatalogSelectChange(event) {
        if (event.selected === false) {
            return;
        }
        this.toolState.toolbox.activateTool('catalogBrowser');
    }
    /**
     * Get all the available catalogs from the CatalogService and
     * load them into the store.
     * @private
     * @return {?}
     */
    loadCatalogs() {
        this.catalogService.loadCatalogs().subscribe((/**
         * @param {?} catalogs
         * @return {?}
         */
        (catalogs) => {
            this.store.clear();
            this.store.load(catalogs);
        }));
    }
};
CatalogLibraryToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-catalog-library-tool',
                template: "<igo-catalog-library\r\n  [store]=\"store\"\r\n  (catalogSelectChange)=\"onCatalogSelectChange($event)\">\r\n</igo-catalog-library>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
CatalogLibraryToolComponent.ctorParameters = () => [
    { type: CatalogService },
    { type: CatalogState },
    { type: ToolState }
];
/**
 * Tool to browse the list of available catalogs.
 */
CatalogLibraryToolComponent = tslib_1.__decorate([
    ToolComponent({
        name: 'catalog',
        title: 'igo.integration.tools.catalog',
        icon: 'layers-plus'
    }),
    tslib_1.__metadata("design:paramtypes", [CatalogService,
        CatalogState,
        ToolState])
], CatalogLibraryToolComponent);
export { CatalogLibraryToolComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CatalogLibraryToolComponent.prototype.catalogService;
    /**
     * @type {?}
     * @private
     */
    CatalogLibraryToolComponent.prototype.catalogState;
    /**
     * @type {?}
     * @private
     */
    CatalogLibraryToolComponent.prototype.toolState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1saWJyYXJ5LXRvb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvaW50ZWdyYXRpb24vIiwic291cmNlcyI6WyJsaWIvY2F0YWxvZy9jYXRhbG9nLWxpYnJhcnktdG9vbC9jYXRhbG9nLWxpYnJhcnktdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHN0MsT0FBTyxFQUFXLGNBQWMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0lBZW5DLDJCQUEyQjs7O01BQTNCLDJCQUEyQjs7Ozs7O0lBU3RDLFlBQ1UsY0FBOEIsRUFDOUIsWUFBMEIsRUFDMUIsU0FBb0I7UUFGcEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDM0IsQ0FBQzs7Ozs7O0lBUkosSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztJQUN4QyxDQUFDOzs7OztJQVdELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7Ozs7Ozs7SUFPRCxxQkFBcUIsQ0FBQyxLQUE4QztRQUNsRSxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO1lBQzVCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Ozs7Ozs7SUFNTyxZQUFZO1FBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUzs7OztRQUFDLENBQUMsUUFBbUIsRUFBRSxFQUFFO1lBQ25FLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTs7WUFuREEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLG1KQUFvRDtnQkFDcEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFqQmlCLGNBQWM7WUFHdkIsWUFBWTtZQURaLFNBQVM7Ozs7O0FBZ0JMLDJCQUEyQjtJQVZ2QyxhQUFhLENBQUM7UUFDYixJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSwrQkFBK0I7UUFDdEMsSUFBSSxFQUFFLGFBQWE7S0FDcEIsQ0FBQzs2Q0FnQjBCLGNBQWM7UUFDaEIsWUFBWTtRQUNmLFNBQVM7R0FabkIsMkJBQTJCLENBOEN2QztTQTlDWSwyQkFBMkI7Ozs7OztJQVVwQyxxREFBc0M7Ozs7O0lBQ3RDLG1EQUFrQzs7Ozs7SUFDbEMsZ0RBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUb29sQ29tcG9uZW50IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEVudGl0eVN0b3JlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgQ2F0YWxvZywgQ2F0YWxvZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgVG9vbFN0YXRlIH0gZnJvbSAnLi4vLi4vdG9vbC90b29sLnN0YXRlJztcclxuaW1wb3J0IHsgQ2F0YWxvZ1N0YXRlIH0gZnJvbSAnLi4vY2F0YWxvZy5zdGF0ZSc7XHJcblxyXG4vKipcclxuICogVG9vbCB0byBicm93c2UgdGhlIGxpc3Qgb2YgYXZhaWxhYmxlIGNhdGFsb2dzLlxyXG4gKi9cclxuQFRvb2xDb21wb25lbnQoe1xyXG4gIG5hbWU6ICdjYXRhbG9nJyxcclxuICB0aXRsZTogJ2lnby5pbnRlZ3JhdGlvbi50b29scy5jYXRhbG9nJyxcclxuICBpY29uOiAnbGF5ZXJzLXBsdXMnXHJcbn0pXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNhdGFsb2ctbGlicmFyeS10b29sJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2F0YWxvZy1saWJyYXJ5LXRvb2wuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXRhbG9nTGlicmFyeVRvb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIC8qKlxyXG4gICAqIFN0b3JlIHRoYXQgY29udGFpbnMgdGhlIGNhdGFsb2dzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHN0b3JlKCk6IEVudGl0eVN0b3JlPENhdGFsb2c+IHtcclxuICAgIHJldHVybiB0aGlzLmNhdGFsb2dTdGF0ZS5jYXRhbG9nU3RvcmU7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2F0YWxvZ1NlcnZpY2U6IENhdGFsb2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjYXRhbG9nU3RhdGU6IENhdGFsb2dTdGF0ZSxcclxuICAgIHByaXZhdGUgdG9vbFN0YXRlOiBUb29sU3RhdGVcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuc3RvcmUuZW50aXRpZXMkLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLmxvYWRDYXRhbG9ncygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgc2VsZWN0ZWQgY2F0YWxvZyBjaGFuZ2VzLCB0b2dnbGUgdGhlIHRoZSBDYXRhbG9nQnJvd3NlciB0b29sLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqIEBwYXJhbSBldmVudCBTZWxlY3QgZXZlbnRcclxuICAgKi9cclxuICBvbkNhdGFsb2dTZWxlY3RDaGFuZ2UoZXZlbnQ6IHsgc2VsZWN0ZWQ6IGJvb2xlYW47IGNhdGFsb2c6IENhdGFsb2cgfSkge1xyXG4gICAgaWYgKGV2ZW50LnNlbGVjdGVkID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnRvb2xTdGF0ZS50b29sYm94LmFjdGl2YXRlVG9vbCgnY2F0YWxvZ0Jyb3dzZXInKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhbGwgdGhlIGF2YWlsYWJsZSBjYXRhbG9ncyBmcm9tIHRoZSBDYXRhbG9nU2VydmljZSBhbmRcclxuICAgKiBsb2FkIHRoZW0gaW50byB0aGUgc3RvcmUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsb2FkQ2F0YWxvZ3MoKSB7XHJcbiAgICB0aGlzLmNhdGFsb2dTZXJ2aWNlLmxvYWRDYXRhbG9ncygpLnN1YnNjcmliZSgoY2F0YWxvZ3M6IENhdGFsb2dbXSkgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlLmNsZWFyKCk7XHJcbiAgICAgIHRoaXMuc3RvcmUubG9hZChjYXRhbG9ncyk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19